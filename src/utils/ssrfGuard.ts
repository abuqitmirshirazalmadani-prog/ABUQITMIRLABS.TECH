import dns from 'dns';
import net from 'net';
import {
  validatePublicAuditUrl,
  isPrivateOrReservedIPv4,
  isPrivateOrReservedIPv6
} from './urlValidator.js';

export class SsrfBlockedError extends Error {
  public readonly statusCode = 403;
  constructor(message: string) {
    super(message);
    this.name = 'SsrfBlockedError';
  }
}

export const DEFAULT_FETCH_TIMEOUT_MS = 8000;
export const MAX_HTML_RESPONSE_BYTES = 1_500_000; // 1.5 MB response-size limit
export const MAX_REDIRECT_HOPS = 5;

/**
 * Resolves the hostname via DNS and verifies that every resolved IPv4/IPv6 record
 * points to a public routable address (blocking localhost, RFC1918 private IPs,
 * link-local, cloud metadata 169.254.169.254, and CGNAT).
 */
export async function assertSafeExternalUrlWithDns(rawUrl: string): Promise<{
  normalizedUrl: string;
  hostname: string;
  resolvedIps: string[];
}> {
  const check = validatePublicAuditUrl(rawUrl);
  if (!check.valid) {
    throw new SsrfBlockedError(check.error || 'Blocked unsafe or invalid URL.');
  }

  const { normalizedUrl, hostname } = check;
  const cleanHost = hostname.replace(/^\[|\]$/g, '');

  // If literal IP, double-check directly
  const ipVersion = net.isIP(cleanHost);
  if (ipVersion === 4) {
    if (isPrivateOrReservedIPv4(cleanHost)) {
      throw new SsrfBlockedError(
        `SSRF Protection: Target IPv4 address (${cleanHost}) is in a private, loopback, or cloud metadata range.`
      );
    }
    return { normalizedUrl, hostname, resolvedIps: [cleanHost] };
  }
  if (ipVersion === 6) {
    if (isPrivateOrReservedIPv6(cleanHost)) {
      throw new SsrfBlockedError(
        `SSRF Protection: Target IPv6 address (${cleanHost}) is in a private, loopback, or link-local range.`
      );
    }
    return { normalizedUrl, hostname, resolvedIps: [cleanHost] };
  }

  // Perform DNS lookup with timeout
  let records: dns.LookupAddress[] = [];
  try {
    const lookupPromise = dns.promises.lookup(cleanHost, { all: true, verbatim: true });
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('DNS lookup timed out')), 4000)
    );
    records = await Promise.race([lookupPromise, timeoutPromise]);
  } catch (err: any) {
    // If DNS cannot resolve the domain at all, throw a clear error
    throw new Error(`Unable to resolve domain "${cleanHost}" (${err?.message || 'DNS lookup failed'}).`);
  }

  if (!records || records.length === 0) {
    throw new Error(`No DNS records found for domain "${cleanHost}".`);
  }

  const resolvedIps: string[] = [];
  for (const rec of records) {
    const addr = rec.address;
    resolvedIps.push(addr);
    if (rec.family === 4 && isPrivateOrReservedIPv4(addr)) {
      throw new SsrfBlockedError(
        `SSRF Protection: Domain "${cleanHost}" resolves to a restricted internal/private IPv4 address (${addr}).`
      );
    }
    if (rec.family === 6 && isPrivateOrReservedIPv6(addr)) {
      throw new SsrfBlockedError(
        `SSRF Protection: Domain "${cleanHost}" resolves to a restricted internal/private IPv6 address (${addr}).`
      );
    }
  }

  return { normalizedUrl, hostname, resolvedIps };
}

export interface SafeFetchResult {
  finalUrl: string;
  redirectCount: number;
  statusCode: number;
  headers: Record<string, string>;
  bodyText: string;
  byteLength: number;
  truncated: boolean;
  responseTimeMs: number;
}

/**
 * Streams a fetch Response body up to `maxBytes` so large responses or infinite streams
 * cannot exhaust server memory.
 */
async function readResponseStreamWithLimit(
  res: Response,
  maxBytes: number = MAX_HTML_RESPONSE_BYTES
): Promise<{ text: string; byteLength: number; truncated: boolean }> {
  const contentLengthHeader = res.headers.get('content-length');
  if (contentLengthHeader) {
    const declaredBytes = parseInt(contentLengthHeader, 10);
    if (!Number.isNaN(declaredBytes) && declaredBytes > maxBytes * 2) {
      // Still read up to maxBytes if HTML, or abort if binary
    }
  }

  if (!res.body) {
    const text = await res.text();
    const bytes = Buffer.byteLength(text, 'utf8');
    if (bytes > maxBytes) {
      return {
        text: text.slice(0, maxBytes),
        byteLength: maxBytes,
        truncated: true
      };
    }
    return { text, byteLength: bytes, truncated: false };
  }

  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  let truncated = false;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        if (totalBytes + value.byteLength > maxBytes) {
          const allowedSlice = value.subarray(0, Math.max(0, maxBytes - totalBytes));
          if (allowedSlice.byteLength > 0) {
            chunks.push(allowedSlice);
            totalBytes += allowedSlice.byteLength;
          }
          truncated = true;
          await reader.cancel().catch(() => {});
          break;
        } else {
          chunks.push(value);
          totalBytes += value.byteLength;
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  const combined = Buffer.concat(chunks.map((c) => Buffer.from(c)));
  return {
    text: combined.toString('utf-8'),
    byteLength: totalBytes,
    truncated
  };
}

/**
 * Fetches a public URL while validating every redirect hop against SSRF rules
 * (blocking redirects to localhost, 127.0.0.1, 10.x, 172.16-31.x, 192.168.x, 169.254.169.254)
 * and enforcing strict per-request timeouts and response-size limits.
 */
export async function safeFetchWithRedirects(
  initialUrl: string,
  options: {
    userAgent?: string;
    timeoutMs?: number;
    maxBytes?: number;
    maxRedirects?: number;
  } = {}
): Promise<SafeFetchResult> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_FETCH_TIMEOUT_MS;
  const maxBytes = options.maxBytes ?? MAX_HTML_RESPONSE_BYTES;
  const maxRedirects = options.maxRedirects ?? MAX_REDIRECT_HOPS;
  const userAgent =
    options.userAgent ??
    'Mozilla/5.0 (compatible; AbuQitmirLabs-GrowthAudit/3.0; +https://www.abuqitmirlabs.tech/tools/website-audit)';

  let currentUrl = initialUrl;
  let redirectCount = 0;
  const t0 = Date.now();

  while (redirectCount <= maxRedirects) {
    // 1. Validate URL + DNS before every hop
    const validated = await assertSafeExternalUrlWithDns(currentUrl);
    currentUrl = validated.normalizedUrl;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    let res: Response;
    try {
      res = await fetch(currentUrl, {
        method: 'GET',
        headers: {
          'User-Agent': userAgent,
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9'
        },
        redirect: 'manual',
        signal: controller.signal
      });
    } finally {
      clearTimeout(timer);
    }

    // 2. Check if response is a redirect (301, 302, 303, 307, 308)
    if ([301, 302, 303, 307, 308].includes(res.status)) {
      const locationHeader = res.headers.get('location');
      if (!locationHeader) {
        break;
      }
      redirectCount++;
      if (redirectCount > maxRedirects) {
        throw new Error(`Exceeded maximum redirect limit (${maxRedirects} redirects).`);
      }

      let nextUrl: string;
      try {
        nextUrl = new URL(locationHeader, currentUrl).toString();
      } catch {
        throw new SsrfBlockedError(`Invalid redirect Location header: "${locationHeader}".`);
      }

      // Validate the redirect target BEFORE following it
      await assertSafeExternalUrlWithDns(nextUrl);
      currentUrl = nextUrl;
      continue;
    }

    const responseTimeMs = Date.now() - t0;
    const headers: Record<string, string> = {};
    res.headers.forEach((val, key) => {
      headers[key.toLowerCase()] = val;
    });

    const { text, byteLength, truncated } = await readResponseStreamWithLimit(res, maxBytes);

    return {
      finalUrl: currentUrl,
      redirectCount,
      statusCode: res.status,
      headers,
      bodyText: text,
      byteLength,
      truncated,
      responseTimeMs
    };
  }

  throw new Error('Unable to complete HTTP request within redirect limits.');
}

// ==========================================
// ANONYMOUS RATE LIMITER (Sliding Window)
// ==========================================
interface RateBucket {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateBucket>();
const RATE_WINDOW_MS = 60_000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 12; // 12 audits per minute per anonymous IP

export interface RateLimitDecision {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
}

export function checkAnonymousRateLimit(clientKey: string): RateLimitDecision {
  const now = Date.now();
  const key = (clientKey || 'anonymous').trim().slice(0, 128);
  const existing = rateLimitStore.get(key) || { timestamps: [] };

  // Filter out timestamps older than RATE_WINDOW_MS
  const activeTimestamps = existing.timestamps.filter((ts) => now - ts < RATE_WINDOW_MS);

  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldest = activeTimestamps[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((RATE_WINDOW_MS - (now - oldest)) / 1000));
    rateLimitStore.set(key, { timestamps: activeTimestamps });
    return {
      allowed: false,
      limit: MAX_REQUESTS_PER_WINDOW,
      remaining: 0,
      retryAfterSeconds
    };
  }

  activeTimestamps.push(now);
  rateLimitStore.set(key, { timestamps: activeTimestamps });

  // Periodic cleanup to prevent unbounded map growth
  if (rateLimitStore.size > 2000) {
    for (const [k, v] of rateLimitStore.entries()) {
      if (v.timestamps.every((ts) => now - ts >= RATE_WINDOW_MS)) {
        rateLimitStore.delete(k);
      }
    }
  }

  return {
    allowed: true,
    limit: MAX_REQUESTS_PER_WINDOW,
    remaining: Math.max(0, MAX_REQUESTS_PER_WINDOW - activeTimestamps.length),
    retryAfterSeconds: 0
  };
}

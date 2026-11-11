export interface UrlValidationResult {
  valid: boolean;
  normalizedUrl: string;
  hostname: string;
  error?: string;
}

const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  'localhost.localdomain',
  'ip6-localhost',
  'ip6-loopback',
  'metadata',
  'metadata.google.internal',
  'metadata.goog',
  'instance-data',
  '169.254.169.254',
  '100.100.100.200',
  '0.0.0.0',
  '127.0.0.1',
  '::1',
  '[::1]',
  '[fd00:ec2::254]'
]);

const BLOCKED_SUFFIXES = [
  '.localhost',
  '.local',
  '.internal',
  '.intranet',
  '.corp',
  '.home.arpa',
  '.localdomain',
  '.lan'
];

/**
 * Checks whether an IPv4 string belongs to a private, loopback, link-local,
 * cloud metadata, CGNAT, or reserved non-public address block.
 */
export function isPrivateOrReservedIPv4(ip: string): boolean {
  const parts = ip.trim().split('.');
  if (parts.length !== 4) return false;
  const nums = parts.map((p) => Number(p));
  if (nums.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) {
    return true;
  }

  const [a, b, c] = nums;

  // 0.0.0.0/8 (Current network)
  if (a === 0) return true;
  // 10.0.0.0/8 (Private network RFC 1918)
  if (a === 10) return true;
  // 100.64.0.0/10 (Shared CGNAT RFC 6598 & Alibaba Cloud metadata 100.100.100.200)
  if (a === 100 && b >= 64 && b <= 127) return true;
  // 127.0.0.0/8 (Loopback)
  if (a === 127) return true;
  // 169.254.0.0/16 (Link-local & AWS/GCP/Azure Cloud Metadata 169.254.169.254)
  if (a === 169 && b === 254) return true;
  // 172.16.0.0/12 (Private network RFC 1918)
  if (a === 172 && b >= 16 && b <= 31) return true;
  // 192.0.0.0/24 (IETF Protocol Assignments)
  if (a === 192 && b === 0 && c === 0) return true;
  // 192.0.2.0/24 (TEST-NET-1)
  if (a === 192 && b === 0 && c === 2) return true;
  // 192.168.0.0/16 (Private network RFC 1918)
  if (a === 192 && b === 168) return true;
  // 198.18.0.0/15 (Benchmarking)
  if (a === 198 && (b === 18 || b === 19)) return true;
  // 198.51.100.0/24 (TEST-NET-2)
  if (a === 198 && b === 51 && c === 100) return true;
  // 203.0.113.0/24 (TEST-NET-3)
  if (a === 203 && b === 0 && c === 113) return true;
  // 224.0.0.0/4 (Multicast) & 240.0.0.0/4 (Reserved/Broadcast)
  if (a >= 224) return true;

  return false;
}

/**
 * Checks whether an IPv6 address belongs to loopback, unspecified, link-local,
 * unique local (fc00::/7), cloud metadata (fd00:ec2::254), or IPv4-mapped private space.
 */
export function isPrivateOrReservedIPv6(rawIp: string): boolean {
  const ip = rawIp.trim().replace(/^\[|\]$/g, '').toLowerCase();
  if (!ip) return true;

  if (ip === '::1' || ip === '::' || ip === '0:0:0:0:0:0:0:1' || ip === '0:0:0:0:0:0:0:0') {
    return true;
  }

  // IPv4-mapped IPv6 e.g. ::ffff:127.0.0.1 or ::ffff:169.254.169.254
  if (ip.startsWith('::ffff:')) {
    const mapped = ip.slice('::ffff:'.length);
    if (mapped.includes('.')) {
      return isPrivateOrReservedIPv4(mapped);
    }
    return true;
  }

  // Unique Local Addresses fc00::/7 (starts with fc or fd, including AWS metadata fd00:ec2::254)
  if (ip.startsWith('fc') || ip.startsWith('fd')) return true;

  // Link-local fe80::/10 (fe8, fe9, fea, feb)
  if (ip.startsWith('fe8') || ip.startsWith('fe9') || ip.startsWith('fea') || ip.startsWith('feb')) {
    return true;
  }

  // Multicast ff00::/8
  if (ip.startsWith('ff')) return true;

  return false;
}

/**
 * Validates that a user-submitted URL is a well-formed public HTTP/HTTPS URL
 * and does not target localhost, private IPs, or cloud metadata services.
 */
export function validatePublicAuditUrl(rawInput: string): UrlValidationResult {
  const trimmed = (rawInput || '').trim();
  if (!trimmed) {
    return {
      valid: false,
      normalizedUrl: '',
      hostname: '',
      error: 'Please enter a website URL to audit (for example: https://example.com).'
    };
  }

  if (trimmed.length > 2048) {
    return {
      valid: false,
      normalizedUrl: '',
      hostname: '',
      error: 'URL exceeds the maximum allowed length of 2,048 characters.'
    };
  }

  // Reject non-HTTP schemes explicitly before normalizing
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed) && !/^https?:\/\//i.test(trimmed)) {
    return {
      valid: false,
      normalizedUrl: '',
      hostname: '',
      error: 'Only public http:// and https:// URLs are supported.'
    };
  }

  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    return {
      valid: false,
      normalizedUrl: '',
      hostname: '',
      error: 'Invalid URL format. Please enter a complete domain such as https://example.com.'
    };
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return {
      valid: false,
      normalizedUrl: '',
      hostname: '',
      error: 'Only public HTTP and HTTPS URLs are permitted.'
    };
  }

  if (parsed.username || parsed.password) {
    return {
      valid: false,
      normalizedUrl: '',
      hostname: '',
      error: 'URLs containing embedded credentials are blocked for security.'
    };
  }

  if (parsed.port && parsed.port !== '80' && parsed.port !== '443') {
    return {
      valid: false,
      normalizedUrl: '',
      hostname: '',
      error: 'Non-standard ports are blocked. Only standard public web ports (80 and 443) are allowed.'
    };
  }

  const hostname = parsed.hostname.toLowerCase().replace(/\.$/, '');
  if (!hostname) {
    return {
      valid: false,
      normalizedUrl: '',
      hostname: '',
      error: 'Please provide a valid domain name.'
    };
  }

  if (BLOCKED_HOSTNAMES.has(hostname)) {
    return {
      valid: false,
      normalizedUrl: '',
      hostname,
      error: 'Auditing localhost, loopback addresses, or cloud metadata endpoints is blocked (SSRF protection).'
    };
  }

  if (BLOCKED_SUFFIXES.some((suffix) => hostname.endsWith(suffix))) {
    return {
      valid: false,
      normalizedUrl: '',
      hostname,
      error: 'Internal or local network hostnames (.local, .internal, .localhost) are blocked (SSRF protection).'
    };
  }

  // Check if hostname is an IPv4 literal (including octal/hex/integer IP obfuscation)
  if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    if (isPrivateOrReservedIPv4(hostname)) {
      return {
        valid: false,
        normalizedUrl: '',
        hostname,
        error: 'Private, loopback, link-local, and cloud metadata IP addresses are blocked (SSRF protection).'
      };
    }
  } else if (/^(0x[0-9a-f]+|\d+)$/i.test(hostname)) {
    return {
      valid: false,
      normalizedUrl: '',
      hostname,
      error: 'Numeric or hex-encoded IP hostnames are blocked for security.'
    };
  }

  // Check IPv6 literal
  if (hostname.includes(':') || hostname.startsWith('[')) {
    if (isPrivateOrReservedIPv6(hostname)) {
      return {
        valid: false,
        normalizedUrl: '',
        hostname,
        error: 'Private, loopback, or link-local IPv6 addresses are blocked (SSRF protection).'
      };
    }
  }

  // Must have a valid TLD if not an IP
  if (!hostname.includes('.') && !hostname.includes(':')) {
    return {
      valid: false,
      normalizedUrl: '',
      hostname,
      error: 'Please enter a full public domain name with a valid TLD (e.g., example.com).'
    };
  }

  const tld = hostname.split('.').pop() || '';
  if (tld.length < 2) {
    return {
      valid: false,
      normalizedUrl: '',
      hostname,
      error: 'Please enter a valid domain name with a complete top-level domain.'
    };
  }

  return {
    valid: true,
    normalizedUrl: parsed.toString(),
    hostname
  };
}

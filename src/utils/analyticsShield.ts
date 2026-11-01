/**
 * AbuQitmirLabs — GA4 & Meta Pixel Traffic Shield
 * Protects Google Analytics 4 (G-EJH1V89EP0) and Meta Pixel from:
 * 1. Unwanted / Spam Referrals (m.facebook.com 0s bots, ghastlypages.com, etc.)
 * 2. Testing & Diagnostic Traffic (tagassistant.google.com, gtm_debug, localhost, preview URLs)
 * 3. Internal Team & Admin Traffic (/admin routes, team IP addresses, and flagged team browsers)
 */

export const GA_MEASUREMENT_ID = 'G-EJH1V89EP0';

export const STORAGE_KEYS = {
  INTERNAL_TRAFFIC: 'aql_internal_traffic',
  TEAM_IPS: 'aql_team_internal_ips',
  UNWANTED_REFERRALS: 'aql_unwanted_referrals',
  BLOCKED_COUNT: 'aql_shield_blocked_events',
} as const;

export const DEFAULT_UNWANTED_REFERRALS: string[] = [
  'm.facebook.com',
  'l.facebook.com',
  'lm.facebook.com',
  'ghastlypages.com',
  'tagassistant.google.com',
  'googletagmanager.com',
  'semalt.com',
  'buttons-for-website.com',
  'darodar.com',
  'ilovevitaly.com',
  'free-social-buttons.com',
  'floating-share-buttons.com',
  'get-free-traffic-now.com',
];

export const HARD_BLOCKED_SPAM_REFERRERS: string[] = [
  'ghastlypages.com',
  'tagassistant.google.com',
  'semalt.com',
  'buttons-for-website.com',
  'darodar.com',
  'ilovevitaly.com',
  'free-social-buttons.com',
  'floating-share-buttons.com',
  'get-free-traffic-now.com',
];

export interface AnalyticsShieldStatus {
  isInternalDevice: boolean;
  isTeamIpMatched: boolean;
  detectedClientIp: string | null;
  teamIps: string[];
  unwantedReferrals: string[];
  gaDisabled: boolean;
  blockReason: string | null;
}

export function getConfiguredTeamIps(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.TEAM_IPS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((ip) => String(ip).trim()).filter(Boolean)
      : [];
  } catch {
    return [];
  }
}

export function saveConfiguredTeamIps(ips: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    const clean = Array.from(new Set(ips.map((ip) => String(ip).trim()).filter(Boolean)));
    window.localStorage.setItem(STORAGE_KEYS.TEAM_IPS, JSON.stringify(clean));
  } catch {}
}

export function getConfiguredUnwantedReferrals(): string[] {
  if (typeof window === 'undefined') return DEFAULT_UNWANTED_REFERRALS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.UNWANTED_REFERRALS);
    if (!raw) return DEFAULT_UNWANTED_REFERRALS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return Array.from(
        new Set([
          ...DEFAULT_UNWANTED_REFERRALS,
          ...parsed.map((d) => String(d).trim().toLowerCase()).filter(Boolean),
        ])
      );
    }
    return DEFAULT_UNWANTED_REFERRALS;
  } catch {
    return DEFAULT_UNWANTED_REFERRALS;
  }
}

export function saveConfiguredUnwantedReferrals(referrals: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    const clean = Array.from(
      new Set([
        ...DEFAULT_UNWANTED_REFERRALS,
        ...referrals.map((r) => String(r).trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '')).filter(Boolean),
      ])
    );
    window.localStorage.setItem(STORAGE_KEYS.UNWANTED_REFERRALS, JSON.stringify(clean));
  } catch {}
}

export function isAdminOrInternalPath(pathname: string): boolean {
  const clean = (pathname || '').toLowerCase().trim();
  return (
    clean === '/admin' ||
    clean.startsWith('/admin/') ||
    clean === '/login' ||
    clean.startsWith('/login/')
  );
}

export function markBrowserAsInternalTraffic(enabled: boolean = true): void {
  if (typeof window === 'undefined') return;
  try {
    if (enabled) {
      window.localStorage.setItem(STORAGE_KEYS.INTERNAL_TRAFFIC, 'true');
      document.cookie = `${STORAGE_KEYS.INTERNAL_TRAFFIC}=1; path=/; max-age=31536000; SameSite=Lax`;
      (window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
    } else {
      window.localStorage.removeItem(STORAGE_KEYS.INTERNAL_TRAFFIC);
      document.cookie = `${STORAGE_KEYS.INTERNAL_TRAFFIC}=; path=/; max-age=0; SameSite=Lax`;
      (window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
    }
  } catch {}
}

export function isBrowserMarkedInternal(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (window.localStorage.getItem(STORAGE_KEYS.INTERNAL_TRAFFIC) === 'true') {
      return true;
    }
    if (typeof document !== 'undefined' && document.cookie.includes(`${STORAGE_KEYS.INTERNAL_TRAFFIC}=1`)) {
      return true;
    }
  } catch {}
  return false;
}

export function isAutomatedBotOrHeadless(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return true;
  const ua = (navigator.userAgent || '').toLowerCase();
  if (navigator.webdriver) return true;
  if (
    /headlesschrome|phantomjs|slimerjs|puppeteer|playwright|lighthouse|ptst|pagespeed|gtmetrix|pingdom|facebookexternalhit|facebot|meta-externalagent|adsbot|bingbot|googlebot|yandexbot|ahrefsbot|semrushbot|mj12bot|dotbot|petalbot|bytespider/i.test(
      ua
    )
  ) {
    return true;
  }
  if (window.outerWidth === 0 && window.outerHeight === 0) return true;
  return false;
}

export function isTagAssistantOrPreviewTraffic(): boolean {
  if (typeof window === 'undefined') return false;
  const host = (window.location.hostname || '').toLowerCase();
  const search = (window.location.search || '').toLowerCase();
  const ref = (document.referrer || '').toLowerCase();

  // Exclude localhost, Cloud Run preview containers, and Vercel preview URLs from production GA4
  if (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host.endsWith('.run.app') ||
    host.endsWith('.vercel.app')
  ) {
    return true;
  }

  // Exclude Google Tag Assistant & debug parameters
  if (
    ref.includes('tagassistant.google.com') ||
    ref.includes('googletagmanager.com') ||
    search.includes('gtm_debug') ||
    search.includes('tagassistant') ||
    search.includes('ga_debug') ||
    Boolean((window as any).__TAG_ASSISTANT_API) ||
    Boolean((window as any).google_tag_manager_debug)
  ) {
    return true;
  }

  return false;
}

export function getReferrerHostname(): string {
  if (typeof document === 'undefined' || !document.referrer) return '';
  try {
    return new URL(document.referrer).hostname.toLowerCase();
  } catch {
    return document.referrer.toLowerCase();
  }
}

export function isHardBlockedSpamReferrer(): boolean {
  const refHost = getReferrerHostname();
  if (!refHost) return false;
  return HARD_BLOCKED_SPAM_REFERRERS.some(
    (domain) => refHost === domain || refHost.endsWith(`.${domain}`) || refHost.includes(domain)
  );
}

export function isUnwantedReferral(): boolean {
  const refHost = getReferrerHostname();
  if (!refHost) return false;
  const list = getConfiguredUnwantedReferrals();
  return list.some(
    (domain) => refHost === domain || refHost.endsWith(`.${domain}`)
  );
}

export function isSuspiciousFacebookBotReferral(): boolean {
  const refHost = getReferrerHostname();
  const search = typeof window !== 'undefined' ? window.location.search.toLowerCase() : '';
  return (
    refHost === 'm.facebook.com' ||
    refHost === 'l.facebook.com' ||
    refHost === 'lm.facebook.com' ||
    refHost === 'facebook.com' ||
    refHost === 'www.facebook.com' ||
    search.includes('fbclid=')
  );
}

/**
 * Waits for genuine human interaction + minimum foreground dwell time before firing analytics
 * when traffic arrives from m.facebook.com / facebook.com (blocks 0-second bounce bots).
 */
export function waitForVerifiedHumanEngagement(timeoutMs: number = 15000): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      resolve(false);
      return;
    }

    if (isAutomatedBotOrHeadless()) {
      resolve(false);
      return;
    }

    let interacted = false;
    let dwellPassed = false;
    let resolved = false;

    const cleanup = () => {
      window.removeEventListener('scroll', onInteract, { capture: true } as any);
      window.removeEventListener('pointermove', onInteract, { capture: true } as any);
      window.removeEventListener('touchstart', onInteract, { capture: true } as any);
      window.removeEventListener('keydown', onInteract, { capture: true } as any);
      window.removeEventListener('click', onInteract, { capture: true } as any);
    };

    const tryComplete = () => {
      if (resolved) return;
      if (interacted && dwellPassed && document.visibilityState === 'visible') {
        resolved = true;
        cleanup();
        resolve(true);
      }
    };

    const onInteract = () => {
      interacted = true;
      tryComplete();
    };

    window.addEventListener('scroll', onInteract, { passive: true, capture: true });
    window.addEventListener('pointermove', onInteract, { passive: true, capture: true });
    window.addEventListener('touchstart', onInteract, { passive: true, capture: true });
    window.addEventListener('keydown', onInteract, { passive: true, capture: true });
    window.addEventListener('click', onInteract, { passive: true, capture: true });

    // Require at least 2.2 seconds on site (eliminates all 0s m.facebook.com bots)
    setTimeout(() => {
      dwellPassed = true;
      tryComplete();
    }, 2200);

    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        cleanup();
        resolve(false);
      }
    }, timeoutMs);
  });
}

let cachedClientIp: string | null = null;
let ipCheckPromise: Promise<string | null> | null = null;

export async function detectClientIpAndVerifyTeamFilter(): Promise<{
  ip: string | null;
  isTeamIp: boolean;
}> {
  if (typeof window === 'undefined') return { ip: null, isTeamIp: false };

  if (!ipCheckPromise) {
    ipCheckPromise = fetch('/api/client-ip', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
      .then(async (res) => {
        if (!res.ok) return null;
        const data = await res.json();
        cachedClientIp = data?.ip ? String(data.ip).trim() : null;
        if (Array.isArray(data?.teamIps) && data.teamIps.length > 0) {
          const merged = Array.from(new Set([...getConfiguredTeamIps(), ...data.teamIps]));
          saveConfiguredTeamIps(merged);
        }
        if (Array.isArray(data?.unwantedReferrals) && data.unwantedReferrals.length > 0) {
          saveConfiguredUnwantedReferrals(data.unwantedReferrals);
        }
        if (data?.isTeamIp && cachedClientIp) {
          markBrowserAsInternalTraffic(true);
        }
        return cachedClientIp;
      })
      .catch(() => null);
  }

  const ip = await ipCheckPromise;
  const teamIps = getConfiguredTeamIps();
  const isTeamIp = Boolean(ip && teamIps.includes(ip));
  if (isTeamIp) {
    markBrowserAsInternalTraffic(true);
  }
  return { ip, isTeamIp };
}

/**
 * Evaluates whether GA4 & Pixel tracking should be blocked for the current page/session.
 */
export function evaluateAnalyticsBlockReason(pathname: string): string | null {
  if (typeof window === 'undefined') return 'ssr';

  // 1. Check URL query flag (?internal=1 or ?internal_traffic=1)
  const search = window.location.search.toLowerCase();
  if (search.includes('internal=1') || search.includes('internal_traffic=1') || search.includes('traffic_type=internal')) {
    markBrowserAsInternalTraffic(true);
    return 'internal_query_flag';
  }

  // 2. Admin / Login routes automatically mark browser as internal team member
  if (isAdminOrInternalPath(pathname)) {
    markBrowserAsInternalTraffic(true);
    return 'admin_route';
  }

  // 3. Previously flagged internal team browser
  if (isBrowserMarkedInternal()) {
    return 'internal_team_device';
  }

  // 4. Tag Assistant, GTM Debug, or Preview/Localhost environment
  if (isTagAssistantOrPreviewTraffic()) {
    return 'tag_assistant_or_preview';
  }

  // 5. Hard-blocked referral spam (ghastlypages.com, semalt.com, etc.)
  if (isHardBlockedSpamReferrer()) {
    return `blocked_spam_referrer:${getReferrerHostname()}`;
  }

  // 6. Automated headless crawlers / bots
  if (isAutomatedBotOrHeadless()) {
    return 'automated_bot';
  }

  // 7. Team IP match
  if (cachedClientIp && getConfiguredTeamIps().includes(cachedClientIp)) {
    return `team_ip:${cachedClientIp}`;
  }

  return null;
}

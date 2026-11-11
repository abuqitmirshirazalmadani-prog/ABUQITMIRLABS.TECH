import {
  AuditResult,
  AiRecommendation,
  CoreWebVitals,
  InspectedMetrics,
  DeviceStrategy,
  DeviceSelection,
  AuditMode,
  AuditObjective,
  AuditAdvancedOptions,
  FieldDataSummary,
  LabDataSummary,
  MiniSiteAuditSummary,
  SampledInternalPage
} from '../types/audit.js';
import {
  calculateGrade,
  stripHtml,
  buildDeterministicChecks,
  computeSixTransparentScores,
  computeChecksSummary
} from './auditEngine.js';
import {
  assertSafeExternalUrlWithDns,
  safeFetchWithRedirects,
  SsrfBlockedError
} from './ssrfGuard.js';

export interface PerformAuditOptions {
  mode?: AuditMode;
  objective?: AuditObjective;
  deviceSelection?: DeviceSelection;
  advanced?: AuditAdvancedOptions;
  categories?: string[];
}

function parsePsiFieldData(psiJson: any): FieldDataSummary {
  const exp = psiJson?.loadingExperience || psiJson?.originLoadingExperience;
  const metrics = exp?.metrics;
  if (!exp || !metrics || Object.keys(metrics).length === 0) {
    return {
      available: false,
      sourceLabel: 'Chrome User Experience Report (CrUX 28-Day Field Data)',
      overallCategory: 'UNAVAILABLE',
      lcpSeconds: null,
      clsScore: null,
      inpMs: null,
      fcpSeconds: null,
      ttfbMs: null,
      note: 'Origin or URL does not have sufficient 28-day real-user Chrome traffic in the public CrUX dataset.'
    };
  }

  const lcpMs = metrics.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? null;
  const clsRaw = metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile ?? null;
  const inpMs = metrics.INTERACTION_TO_NEXT_PAINT?.percentile ?? null;
  const fcpMs = metrics.FIRST_CONTENTFUL_PAINT_MS?.percentile ?? null;
  const ttfbMs = metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE?.percentile ?? null;

  return {
    available: true,
    sourceLabel: exp === psiJson?.loadingExperience ? 'CrUX Page-Level Field Data' : 'CrUX Origin-Level Field Data',
    overallCategory: (exp.overall_category as 'FAST' | 'AVERAGE' | 'SLOW') || 'AVERAGE',
    lcpSeconds: lcpMs !== null ? Number((lcpMs / 1000).toFixed(2)) : null,
    clsScore: clsRaw !== null ? Number((clsRaw / 100).toFixed(3)) : null,
    inpMs: inpMs !== null ? Math.round(inpMs) : null,
    fcpSeconds: fcpMs !== null ? Number((fcpMs / 1000).toFixed(2)) : null,
    ttfbMs: ttfbMs !== null ? Math.round(ttfbMs) : null,
    note: '75th percentile (P75) real-user Chrome telemetry over the past 28 days.'
  };
}

function parsePsiLabCwv(psiJson: any, fallbackTtfb: number): CoreWebVitals | null {
  const audits = psiJson?.lighthouseResult?.audits;
  if (!audits) return null;

  const lcpVal = audits['largest-contentful-paint']?.numericValue;
  const clsVal = audits['cumulative-layout-shift']?.numericValue;
  const inpVal =
    audits['interaction-to-next-paint']?.numericValue ??
    audits['max-potential-fid']?.numericValue ??
    audits['total-blocking-time']?.numericValue;
  const fcpVal = audits['first-contentful-paint']?.numericValue;
  const ttfbVal = audits['server-response-time']?.numericValue;
  const siVal = audits['speed-index']?.numericValue;

  return {
    lcp: typeof lcpVal === 'number' ? Number((lcpVal / 1000).toFixed(2)) : null,
    cls: typeof clsVal === 'number' ? Number(clsVal.toFixed(3)) : null,
    inp: typeof inpVal === 'number' ? Math.round(inpVal) : null,
    fcp: typeof fcpVal === 'number' ? Number((fcpVal / 1000).toFixed(2)) : null,
    ttfb: typeof ttfbVal === 'number' ? Math.round(ttfbVal) : fallbackTtfb,
    speedIndex: typeof siVal === 'number' ? Number((siVal / 1000).toFixed(2)) : null
  };
}

async function fetchPsiForStrategy(targetUrl: string, strategy: 'mobile' | 'desktop'): Promise<any | null> {
  try {
    const psiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
    psiUrl.searchParams.set('url', targetUrl);
    psiUrl.searchParams.set('strategy', strategy);
    if (process.env.PAGESPEED_API_KEY) {
      psiUrl.searchParams.set('key', process.env.PAGESPEED_API_KEY);
    }
    ['performance', 'seo', 'accessibility', 'best-practices'].forEach((c) =>
      psiUrl.searchParams.append('category', c)
    );

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9500);
    const res = await fetch(psiUrl.toString(), { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Gracefully return null when PSI times out or is rate-limited
  }
  return null;
}

export function extractHtmlAndDomMetrics(
  finalUrl: string,
  redirectCount: number,
  statusCode: number,
  responseTimeMs: number,
  html: string,
  htmlBytes: number,
  truncatedBySizeLimit: boolean,
  responseHeaders: Record<string, string>
): { metrics: InspectedMetrics; internalLinkUrls: string[] } {
  let parsedOrigin = '';
  let parsedHostname = '';
  let hasHttps = finalUrl.startsWith('https://');
  try {
    const u = new URL(finalUrl);
    parsedOrigin = u.origin;
    parsedHostname = u.hostname.toLowerCase();
    hasHttps = u.protocol === 'https:';
  } catch {
    // fallback
  }

  const hstsValue = responseHeaders['strict-transport-security'] || null;
  const cspValue = responseHeaders['content-security-policy'] || null;
  const xFrameValue = responseHeaders['x-frame-options'] || null;
  const referrerPolicyValue = responseHeaders['referrer-policy'] || null;
  const xRobotsTag = responseHeaders['x-robots-tag'] || null;
  const contentEncoding = (responseHeaders['content-encoding'] || '').toLowerCase();
  const isCompressed =
    contentEncoding.includes('br') ||
    contentEncoding.includes('gzip') ||
    contentEncoding.includes('deflate');

  // Extract <title>
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const metaTitle = titleMatch ? stripHtml(titleMatch[1]).replace(/\s+/g, ' ').trim() : null;

  // Extract <meta> tags
  let metaDescription: string | null = null;
  let robotsMeta: string | null = null;
  let hasViewport = false;
  let viewportContent: string | null = null;
  let disablesZoom = false;
  let hasOgTitle = false;
  let hasOgDescription = false;
  let hasOgImage = false;
  let hasTwitterCard = false;

  const allMetaTags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of allMetaTags) {
    const contentMatch = tag.match(/\bcontent=["']([^"']*)["']/i);
    const contentVal = contentMatch ? contentMatch[1].trim() : '';

    if (/\bname=["']description["']/i.test(tag) && !metaDescription) {
      metaDescription = stripHtml(contentVal);
    }
    if (/\bname=["']robots["']/i.test(tag) && !robotsMeta) {
      robotsMeta = contentVal;
    }
    if (/\bname=["']viewport["']/i.test(tag)) {
      hasViewport = true;
      viewportContent = contentVal;
      if (/user-scalable\s*=\s*(no|0)/i.test(contentVal) || /maximum-scale\s*=\s*1(\.0)?\b/i.test(contentVal)) {
        disablesZoom = true;
      }
    }
    if (/\bproperty=["']og:title["']/i.test(tag) && contentVal) hasOgTitle = true;
    if (/\bproperty=["']og:description["']/i.test(tag) && contentVal) hasOgDescription = true;
    if (/\bproperty=["']og:image["']/i.test(tag) && contentVal) hasOgImage = true;
    if (/\b(name|property)=["']twitter:card["']/i.test(tag) && contentVal) hasTwitterCard = true;
  }

  // Canonical link
  let canonicalUrl: string | null = null;
  const allLinkTags = html.match(/<link\b[^>]*>/gi) || [];
  for (const tag of allLinkTags) {
    if (/\brel=["']canonical["']/i.test(tag)) {
      const hrefMatch = tag.match(/\bhref=["']([^"']*)["']/i);
      if (hrefMatch) {
        canonicalUrl = hrefMatch[1].trim();
        break;
      }
    }
  }

  // Headings
  const h1Matches = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || [];
  const h1Count = h1Matches.length;
  const h1Texts = h1Matches
    .map((m) => stripHtml(m).replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .slice(0, 5);
  const h2Count = (html.match(/<h2\b[^>]*>/gi) || []).length;
  const h3Count = (html.match(/<h3\b[^>]*>/gi) || []).length;

  // Images
  const images = html.match(/<img\b[^>]*>/gi) || [];
  const imagesCount = images.length;
  let imagesMissingAlt = 0;
  let imagesMissingDimensions = 0;
  let legacyFormatImagesCount = 0;

  for (const img of images) {
    if (!/\balt\s*=\s*["'][^"']*["']/i.test(img)) {
      imagesMissingAlt++;
    }
    const hasWidth = /\bwidth\s*=\s*["']?\d+/i.test(img);
    const hasHeight = /\bheight\s*=\s*["']?\d+/i.test(img);
    const hasAspectStyle = /aspect-ratio/i.test(img);
    if ((!hasWidth || !hasHeight) && !hasAspectStyle) {
      imagesMissingDimensions++;
    }
    const srcMatch = img.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    if (srcMatch) {
      const cleanSrc = srcMatch[1].split('?')[0].toLowerCase();
      if (cleanSrc.endsWith('.png') || cleanSrc.endsWith('.jpg') || cleanSrc.endsWith('.jpeg')) {
        legacyFormatImagesCount++;
      }
    }
  }

  // Scripts & JSON-LD
  const allScriptBlocks = html.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) || [];
  const jsonLdBlocks = allScriptBlocks.filter((tag) =>
    /type\s*=\s*["']application\/ld\+json["']/i.test(tag)
  );
  const jsonLdTypesSet = new Set<string>();
  for (const block of jsonLdBlocks) {
    const inner = block.replace(/^<script\b[^>]*>/i, '').replace(/<\/script>$/i, '').trim();
    try {
      const parsed = JSON.parse(inner);
      const collectTypes = (node: any) => {
        if (!node || typeof node !== 'object') return;
        if (typeof node['@type'] === 'string') jsonLdTypesSet.add(node['@type']);
        if (Array.isArray(node['@type'])) node['@type'].forEach((t: string) => jsonLdTypesSet.add(t));
        if (Array.isArray(node['@graph'])) node['@graph'].forEach(collectTypes);
      };
      if (Array.isArray(parsed)) parsed.forEach(collectTypes);
      else collectTypes(parsed);
    } catch {
      // ignore malformed JSON-LD
    }
  }

  const executableScripts = allScriptBlocks.filter(
    (tag) => !/type\s*=\s*["']application\/ld\+json["']/i.test(tag)
  );
  const scriptsCount = executableScripts.length;

  const headMatch = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  const headHtml = headMatch ? headMatch[1] : '';
  const headScripts = headHtml.match(/<script\b[^>]*>/gi) || [];
  const renderBlockingScripts = headScripts.filter((tag) => {
    if (/type\s*=\s*["']application\/ld\+json["']/i.test(tag)) return false;
    if (!/\bsrc\s*=\s*["'][^"']+["']/i.test(tag)) return false;
    if (/\basync\b/i.test(tag) || /\bdefer\b/i.test(tag) || /type\s*=\s*["']module["']/i.test(tag)) {
      return false;
    }
    return true;
  });

  const stylesheetsCount = allLinkTags.filter((tag) =>
    /\brel\s*=\s*["']stylesheet["']/i.test(tag)
  ).length;

  const langMatch = html.match(/<html\b[^>]*\blang\s*=\s*["']([^"']+)["']/i);
  const langAttribute = langMatch ? langMatch[1].trim() : null;

  // Links, Mixed Content, Direct Contact Channels, CTAs
  const anchorBlocks = html.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) || [];
  let internalLinksCount = 0;
  let externalLinksCount = 0;
  let unsafeBlankLinksCount = 0;
  const internalLinkSet = new Set<string>();
  const contactMethodsSet = new Set<string>();
  const ctaSamples: string[] = [];

  const CTA_REGEX =
    /\b(book|schedule|contact|quote|audit|start|get started|request|consultation|buy|order|subscribe|demo|talk to|hire|estimate|try free|sign up)\b/i;

  for (const aBlock of anchorBlocks) {
    const openTagMatch = aBlock.match(/^<a\b[^>]*>/i);
    const openTag = openTagMatch ? openTagMatch[0] : '';
    const hrefMatch = openTag.match(/\bhref\s*=\s*["']([^"']+)["']/i);
    const href = hrefMatch ? hrefMatch[1].trim() : '';
    const anchorText = stripHtml(aBlock).replace(/\s+/g, ' ').trim();

    if (anchorText && anchorText.length <= 45 && CTA_REGEX.test(anchorText)) {
      if (!ctaSamples.includes(anchorText)) {
        ctaSamples.push(anchorText);
      }
    }

    if (!href || href.startsWith('#') || href.toLowerCase().startsWith('javascript:')) {
      continue;
    }

    const lowerHref = href.toLowerCase();
    if (lowerHref.startsWith('tel:')) {
      contactMethodsSet.add('Phone (tel:)');
      continue;
    }
    if (lowerHref.startsWith('mailto:')) {
      contactMethodsSet.add('Email (mailto:)');
      continue;
    }
    if (lowerHref.includes('wa.me') || lowerHref.includes('whatsapp.com')) {
      contactMethodsSet.add('WhatsApp');
    }
    if (lowerHref.includes('/contact') || lowerHref.includes('contact-us')) {
      contactMethodsSet.add('/contact page');
    }

    try {
      const resolved = new URL(href, finalUrl);
      if (resolved.hostname.toLowerCase() === parsedHostname) {
        internalLinksCount++;
        if (
          resolved.pathname !== '/' &&
          !resolved.pathname.match(/\.(pdf|jpg|png|webp|svg|xml|zip)$/i) &&
          internalLinkSet.size < 5
        ) {
          internalLinkSet.add(resolved.origin + resolved.pathname);
        }
      } else if (resolved.protocol === 'http:' || resolved.protocol === 'https:') {
        externalLinksCount++;
        if (/\btarget\s*=\s*["']_blank["']/i.test(openTag) && !/\brel\s*=\s*["'][^"']*noopener/i.test(openTag)) {
          unsafeBlankLinksCount++;
        }
      }
    } catch {
      // ignore malformed href
    }
  }

  // Also scan <button> tags for CTAs and accessibility labels
  const buttonBlocks = html.match(/<button\b[^>]*>[\s\S]*?<\/button>/gi) || [];
  let unlabeledButtonsCount = 0;
  for (const btn of buttonBlocks) {
    const openMatch = btn.match(/^<button\b[^>]*>/i);
    const openTag = openMatch ? openMatch[0] : '';
    const text = stripHtml(btn).replace(/\s+/g, ' ').trim();
    const hasAria = /\baria-label(ledby)?\s*=\s*["'][^"']+["']/i.test(openTag) || /\btitle\s*=\s*["'][^"']+["']/i.test(openTag);
    if (!text && !hasAria) {
      unlabeledButtonsCount++;
    }
    if (text && text.length <= 45 && CTA_REGEX.test(text) && !ctaSamples.includes(text)) {
      ctaSamples.push(text);
    }
  }

  // Mixed content check on HTTPS pages
  let mixedContentCount = 0;
  if (hasHttps) {
    const httpSubresources =
      html.match(/\b(src|href)\s*=\s*["']http:\/\/[^"']+["']/gi) || [];
    for (const attr of httpSubresources) {
      // Ignore standard<a> navigation links, only count subresources in img/script/link/iframe
      if (!/<a\b/i.test(attr)) {
        mixedContentCount++;
      }
    }
    // More accurate check on img/script/iframe/audio/video tags specifically
    const resourceTags = html.match(/<(img|script|iframe|audio|video|source)\b[^>]*\bsrc\s*=\s*["']http:\/\/[^"']+["']/gi) || [];
    mixedContentCount = resourceTags.length;
  }

  // Semantic Landmarks
  const landmarks = {
    main: /<main\b[^>]*>|role\s*=\s*["']main["']/i.test(html),
    nav: /<nav\b[^>]*>|role\s*=\s*["']navigation["']/i.test(html),
    header: /<header\b[^>]*>|role\s*=\s*["']banner["']/i.test(html),
    footer: /<footer\b[^>]*>|role\s*=\s*["']contentinfo["']/i.test(html)
  };

  // Forms & Inputs
  const formBlocks = html.match(/<form\b[^>]*>[\s\S]*?<\/form>/gi) || [];
  const formsCount = formBlocks.length;
  let maxFormInputsCount = 0;
  for (const fBlock of formBlocks) {
    const visibleInputs = (
      fBlock.match(/<(input|select|textarea)\b[^>]*>/gi) || []
    ).filter((inp) => !/\btype\s*=\s*["'](hidden|submit|button|reset)["']/i.test(inp));
    if (visibleInputs.length > maxFormInputsCount) {
      maxFormInputsCount = visibleInputs.length;
    }
  }

  const allInputs = (html.match(/<(input|select|textarea)\b[^>]*>/gi) || []).filter(
    (inp) => !/\btype\s*=\s*["'](hidden|submit|button|reset)["']/i.test(inp)
  );
  let unlabeledInputsCount = 0;
  for (const inp of allInputs) {
    const hasAria =
      /\baria-label(ledby)?\s*=\s*["'][^"']+["']/i.test(inp) ||
      /\bplaceholder\s*=\s*["'][^"']+["']/i.test(inp);
    const idMatch = inp.match(/\bid\s*=\s*["']([^"']+)["']/i);
    const hasMatchingFor =
      idMatch && new RegExp(`<label\\b[^>]*\\bfor\\s*=\\s*["']${idMatch[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i').test(html);
    if (!hasAria && !hasMatchingFor) {
      unlabeledInputsCount++;
    }
  }

  // Trust Signals Detection
  const trustSignalsDetected: string[] = [];
  if (/case-stud(y|ies)|portfolio|our-work/i.test(html)) {
    trustSignalsDetected.push('Case Studies / Portfolio');
  }
  if (/testimonial|client review|clutch|goodfirms|trustpilot|rated\s+4\.|rated\s+5/i.test(html)) {
    trustSignalsDetected.push('Client Reviews / Testimonials');
  }
  if (/\/privacy|privacy-policy|privacy policy/i.test(html)) {
    trustSignalsDetected.push('Privacy Policy');
  }
  if (/\/terms|terms-of-service|editorial-policy/i.test(html)) {
    trustSignalsDetected.push('Terms / Editorial Policy');
  }
  if (/\/about|our-team|founded in|years experience/i.test(html)) {
    trustSignalsDetected.push('About / Team Credentials');
  }

  const metrics: InspectedMetrics = {
    finalUrl,
    redirectCount,
    statusCode,
    responseTimeMs,
    htmlBytes,
    truncatedBySizeLimit,
    isCompressed,
    compressionType: contentEncoding || null,
    hasHttps,
    hasHsts: Boolean(hstsValue),
    hstsValue,
    hasCsp: Boolean(cspValue),
    cspValue,
    hasXFrame: Boolean(xFrameValue),
    xFrameValue,
    hasContentTypeOptions: Boolean(responseHeaders['x-content-type-options']),
    hasReferrerPolicy: Boolean(referrerPolicyValue),
    referrerPolicyValue,
    robotsMeta,
    xRobotsTag,
    metaTitle,
    metaDescription,
    canonicalUrl,
    hasViewport,
    viewportContent,
    disablesZoom,
    h1Count,
    h1Texts,
    h2Count,
    h3Count,
    imagesCount,
    imagesMissingAlt,
    imagesMissingDimensions,
    legacyFormatImagesCount,
    scriptsCount,
    renderBlockingScriptsCount: renderBlockingScripts.length,
    stylesheetsCount,
    langAttribute,
    jsonLdCount: jsonLdBlocks.length,
    jsonLdTypes: Array.from(jsonLdTypesSet),
    hasOgTitle,
    hasOgDescription,
    hasOgImage,
    hasTwitterCard,
    internalLinksCount,
    externalLinksCount,
    unsafeBlankLinksCount,
    mixedContentCount,
    landmarks,
    formsCount,
    maxFormInputsCount,
    unlabeledInputsCount,
    unlabeledButtonsCount,
    ctaElementsCount: ctaSamples.length,
    detectedCtaSamples: ctaSamples.slice(0, 6),
    hasDirectContactLink: contactMethodsSet.size > 0,
    contactMethodsDetected: Array.from(contactMethodsSet),
    trustSignalsDetected
  };

  return {
    metrics,
    internalLinkUrls: Array.from(internalLinkSet)
  };
}

async function runMiniSiteCrawl(
  originUrl: string,
  candidateInternalUrls: string[],
  shouldSampleInternalPages: boolean
): Promise<MiniSiteAuditSummary> {
  let origin = originUrl;
  try {
    origin = new URL(originUrl).origin;
  } catch {
    // fallback
  }

  const robotsTxtUrl = `${origin}/robots.txt`;
  let robotsTxtStatus: number | null = null;
  let robotsTxtAllowsCrawl: boolean | null = null;
  let robotsTxtHasSitemapDirective = false;
  let discoveredSitemapUrl = `${origin}/sitemap.xml`;

  try {
    const rRes = await safeFetchWithRedirects(robotsTxtUrl, {
      timeoutMs: 4500,
      maxBytes: 150_000,
      maxRedirects: 3
    });
    robotsTxtStatus = rRes.statusCode;
    if (rRes.statusCode === 200) {
      const txt = rRes.bodyText || '';
      robotsTxtHasSitemapDirective = /^sitemap:\s*https?:\/\//im.test(txt);
      const smMatch = txt.match(/^sitemap:\s*(https?:\/\/\S+)/im);
      if (smMatch && smMatch[1]) {
        try {
          const smUrl = new URL(smMatch[1].trim());
          if (smUrl.hostname === new URL(origin).hostname) {
            discoveredSitemapUrl = smUrl.toString();
          }
        } catch {
          // keep default /sitemap.xml
        }
      }
      // Check if User-agent: * has exact Disallow: /
      const blocksAll = /user-agent:\s*\*[\s\S]*?^disallow:\s*\/\s*$/im.test(txt);
      robotsTxtAllowsCrawl = !blocksAll;
    }
  } catch {
    robotsTxtStatus = null;
  }

  let sitemapXmlStatus: number | null = null;
  let sitemapUrlCount: number | null = null;
  try {
    const sRes = await safeFetchWithRedirects(discoveredSitemapUrl, {
      timeoutMs: 5000,
      maxBytes: 800_000,
      maxRedirects: 3
    });
    sitemapXmlStatus = sRes.statusCode;
    if (sRes.statusCode === 200 && sRes.bodyText) {
      const locMatches = sRes.bodyText.match(/<loc>/gi);
      sitemapUrlCount = locMatches ? locMatches.length : 0;
    }
  } catch {
    sitemapXmlStatus = null;
  }

  const sampledInternalPages: SampledInternalPage[] = [];
  if (shouldSampleInternalPages && candidateInternalUrls.length > 0) {
    const toSample = candidateInternalUrls.slice(0, 2);
    const sampleResults = await Promise.all(
      toSample.map(async (pageUrl): Promise<SampledInternalPage | null> => {
        try {
          const pRes = await safeFetchWithRedirects(pageUrl, {
            timeoutMs: 4500,
            maxBytes: 400_000,
            maxRedirects: 3
          });
          const tMatch = pRes.bodyText.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
          const h1s = (pRes.bodyText.match(/<h1\b[^>]*>/gi) || []).length;
          const hasCanon = /<link\b[^>]*\brel\s*=\s*["']canonical["']/i.test(pRes.bodyText);
          return {
            url: pageUrl,
            statusCode: pRes.statusCode,
            responseTimeMs: pRes.responseTimeMs,
            title: tMatch ? stripHtml(tMatch[1]).replace(/\s+/g, ' ').trim() : null,
            h1Count: h1s,
            hasCanonical: hasCanon
          };
        } catch {
          return null;
        }
      })
    );
    for (const item of sampleResults) {
      if (item) sampledInternalPages.push(item);
    }
  }

  return {
    robotsTxtChecked: true,
    robotsTxtUrl,
    robotsTxtStatus,
    robotsTxtAllowsCrawl,
    robotsTxtHasSitemapDirective,
    sitemapXmlChecked: true,
    sitemapXmlUrl: discoveredSitemapUrl,
    sitemapXmlStatus,
    sitemapUrlCount,
    sampledInternalPages
  };
}

export async function performWebsiteAudit(
  rawUrl: string,
  device: DeviceStrategy = 'mobile',
  categories: string[] = ['performance', 'seo', 'accessibility', 'bestPractices', 'security'],
  geminiClient: any = null,
  onAiFailure?: (err: any) => void,
  options: PerformAuditOptions = {}
): Promise<AuditResult> {
  const mode: AuditMode = options.mode || 'complete';
  const objective: AuditObjective = options.objective || 'complete';
  const deviceSelection: DeviceSelection = options.deviceSelection || device || 'mobile';
  const primaryDevice: DeviceStrategy = deviceSelection === 'desktop' ? 'desktop' : 'mobile';
  const advanced: AuditAdvancedOptions = options.advanced || {
    industry: 'General Business',
    businessGoal: 'Generate Qualified Leads & Conversions',
    targetMarket: 'Global / International',
    reportLanguage: 'en'
  };

  // 1. Validate URL & Enforce SSRF DNS Protection
  const validated = await assertSafeExternalUrlWithDns(rawUrl);
  const targetUrl = validated.normalizedUrl;

  // 2. Run Live HTTP + DOM Inspection and (optionally) Google PageSpeed Insights in parallel
  const userAgent =
    primaryDevice === 'mobile'
      ? 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36 AbuQitmirLabs-Audit/3.0'
      : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 AbuQitmirLabs-Audit/3.0';

  const fetchHtmlPromise = safeFetchWithRedirects(targetUrl, {
    userAgent,
    timeoutMs: 8000,
    maxBytes: 1_500_000,
    maxRedirects: 5
  }).catch((err) => {
    if (err instanceof SsrfBlockedError) {
      throw err;
    }
    return null;
  });

  const psiMobilePromise =
    deviceSelection === 'mobile' || deviceSelection === 'both'
      ? fetchPsiForStrategy(targetUrl, 'mobile')
      : Promise.resolve(null);

  const psiDesktopPromise =
    deviceSelection === 'desktop' || deviceSelection === 'both'
      ? fetchPsiForStrategy(targetUrl, 'desktop')
      : Promise.resolve(null);

  const [httpFetchResult, psiMobileJson, psiDesktopJson] = await Promise.all([
    fetchHtmlPromise,
    psiMobilePromise,
    psiDesktopPromise
  ]);

  const finalUrl = httpFetchResult?.finalUrl || targetUrl;
  const redirectCount = httpFetchResult?.redirectCount ?? 0;
  const statusCode = httpFetchResult?.statusCode ?? 0;
  const responseTimeMs = httpFetchResult?.responseTimeMs ?? 0;
  const html = httpFetchResult?.bodyText ?? '';
  const htmlBytes = httpFetchResult?.byteLength ?? 0;
  const truncated = httpFetchResult?.truncated ?? false;
  const responseHeaders = httpFetchResult?.headers ?? {};

  const { metrics: inspectedMetrics, internalLinkUrls } = extractHtmlAndDomMetrics(
    finalUrl,
    redirectCount,
    statusCode,
    responseTimeMs,
    html,
    htmlBytes,
    truncated,
    responseHeaders
  );

  // 3. Run Mini-Site Crawl (/robots.txt, /sitemap.xml, and internal page sampling) when mode is 'mini-site' or 'complete',
  // or always check robots.txt & sitemap.xml so crawlability checks have real data!
  const miniSiteSummary = await runMiniSiteCrawl(
    finalUrl,
    internalLinkUrls,
    mode === 'mini-site' || mode === 'complete'
  );

  // 4. Separate Real-User Field Data vs Lighthouse Lab Data
  const primaryPsi = primaryDevice === 'desktop' ? psiDesktopJson || psiMobileJson : psiMobileJson || psiDesktopJson;
  const fieldData = parsePsiFieldData(primaryPsi);

  const mobileLabCwv = parsePsiLabCwv(psiMobileJson, responseTimeMs || 250);
  const desktopLabCwv = parsePsiLabCwv(psiDesktopJson, responseTimeMs || 200);
  const hasLab = Boolean(mobileLabCwv || desktopLabCwv);

  const labData: LabDataSummary = {
    available: hasLab,
    sourceLabel: hasLab
      ? `Google PageSpeed Insights Lighthouse (${deviceSelection.toUpperCase()})`
      : 'Lighthouse Lab Data Unavailable (Static HTTP/DOM Inspection Active)',
    mobile: mobileLabCwv,
    desktop: desktopLabCwv,
    note: hasLab
      ? 'Synthetic Lighthouse run under simulated throttling.'
      : 'Google PageSpeed API did not return a synthetic lab run within the timeout window; static HTTP & DOM checks were used without fabricating lab scores.'
  };

  const activeCwv: CoreWebVitals =
    (primaryDevice === 'desktop' ? desktopLabCwv || mobileLabCwv : mobileLabCwv || desktopLabCwv) || {
      lcp: fieldData.lcpSeconds,
      cls: fieldData.clsScore,
      inp: fieldData.inpMs,
      fcp: fieldData.fcpSeconds,
      ttfb: responseTimeMs > 0 ? responseTimeMs : fieldData.ttfbMs,
      speedIndex: null
    };

  // 5. Execute all 38 Deterministic, Heuristic & Manual Review Checks
  const allChecks = buildDeterministicChecks(
    targetUrl,
    inspectedMetrics,
    fieldData,
    labData,
    miniSiteSummary,
    mode
  );

  const { scores, scoreDetails } = computeSixTransparentScores(allChecks);
  const checksSummary = computeChecksSummary(allChecks);

  const failingIssues = allChecks.filter(
    (c) => !c.passed && c.confidence !== 'Data unavailable'
  );

  // Sort failing issues by severity
  const priorityOrder: Record<string, number> = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3,
    passed: 4
  };
  failingIssues.sort((a, b) => (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3));

  const overallScore = Math.round(
    (scores.crawlability +
      scores.seo +
      scores.performance +
      scores.accessibility +
      scores.securityAndTrust +
      scores.conversionReadiness) /
      6
  );
  const grade = calculateGrade(overallScore);

  // 6. Build deterministic recommendations strictly grounded in failing checks
  const recommendations: AiRecommendation[] = failingIssues
    .filter((i) => i.confidence === 'Confirmed' || i.confidence === 'Likely')
    .slice(0, 5)
    .map((iss) => ({
      title: iss.title,
      description: iss.suggestedFix,
      scoreGain: iss.priority === 'critical' ? 12 : iss.priority === 'high' ? 8 : 5,
      timeToFix: iss.effort,
      difficulty: iss.priority === 'critical' ? 'Moderate' : 'Easy',
      category: iss.category,
      basedOnCheckIds: [iss.checkId]
    }));

  // 7. Optional AI Explanation of Confirmed Deterministic Evidence ONLY (Never invents findings)
  let aiExecutiveSummary = `Executed ${checksSummary.totalExecuted} deterministic checks on ${finalUrl}: ${checksSummary.confirmedPassed} passed, ${checksSummary.confirmedOrLikelyIssues} issues identified, ${checksSummary.manualReviewRequired} manual review items, and ${checksSummary.dataUnavailable} checks where external telemetry was unavailable.`;
  let aiExecutiveSummaryUr = `${finalUrl} پر کل ${checksSummary.totalExecuted} تکنیکی چیکس مکمل کیے گئے: ${checksSummary.confirmedPassed} کامیاب رہے، ${checksSummary.confirmedOrLikelyIssues} مسائل کی نشاندہی ہوئی، اور ${checksSummary.manualReviewRequired} نکات دستی جانچ کے لیے تجویز کیے گئے ہیں۔`;

  if (geminiClient && failingIssues.length > 0) {
    try {
      const confirmedEvidenceList = failingIssues
        .filter((i) => i.confidence === 'Confirmed' || i.confidence === 'Likely')
        .slice(0, 6)
        .map(
          (i) =>
            `- [${i.checkId} | ${i.category} | ${i.priority.toUpperCase()}] ${i.title} | Evidence: ${i.evidence} | Fix: ${i.suggestedFix}`
        )
        .join('\n');

      if (confirmedEvidenceList) {
        const prompt = `You are a Principal Web Growth & Technical SEO Architect.
STRICT CONSTRAINT: You must ONLY summarize the deterministic findings listed below. NEVER invent a finding, metric, or issue that is not explicitly present in the deterministic evidence list. Do not promise guaranteed Google rankings.

AUDITED URL: ${finalUrl}
INDUSTRY: ${advanced.industry}
BUSINESS GOAL: ${advanced.businessGoal}
TARGET MARKET: ${advanced.targetMarket}
SCORES: Crawlability ${scores.crawlability}/100, SEO ${scores.seo}/100, Performance ${scores.performance}/100, Accessibility ${scores.accessibility}/100, Security ${scores.securityAndTrust}/100, Conversion Readiness ${scores.conversionReadiness}/100

CONFIRMED DETERMINISTIC FINDINGS:
${confirmedEvidenceList}

Return ONLY valid JSON with two keys:
{
  "summaryEn": "2-3 concise sentences explaining the top confirmed bottlenecks from the list above and their impact on ${advanced.businessGoal}.",
  "summaryUr": "2-3 concise sentences in natural Urdu explaining the exact same confirmed findings."
}`;

        const aiRes = await geminiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json', temperature: 0.1 }
        });
        const rawText = aiRes.text || '';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.summaryEn && typeof parsed.summaryEn === 'string') {
            aiExecutiveSummary = parsed.summaryEn;
          }
          if (parsed.summaryUr && typeof parsed.summaryUr === 'string') {
            aiExecutiveSummaryUr = parsed.summaryUr;
          }
        }
      }
    } catch (aiErr) {
      if (onAiFailure) onAiFailure(aiErr);
    }
  }

  return {
    url: targetUrl,
    finalUrl,
    mode,
    objective,
    device: primaryDevice,
    deviceSelection,
    advanced,
    overallScore,
    grade,
    categoryCount: 6,
    issueCount: failingIssues.length,
    scores,
    scoreDetails,
    performance: scores.performance,
    seo: scores.seo,
    accessibility: scores.accessibility,
    bestPractices: scores.crawlability,
    security: scores.securityAndTrust,
    checksSummary,
    fieldData,
    labData,
    cwv: activeCwv,
    miniSiteSummary,
    issues: failingIssues,
    allChecks,
    recommendations,
    aiExecutiveSummary,
    aiExecutiveSummaryUr,
    inspectedMetrics,
    analyzedAt: new Date().toISOString(),
    engine: hasLab
      ? 'Google Lighthouse (PSI) + Deterministic DOM/HTTP Inspector'
      : 'Deterministic HTTP, DOM & Conversion Inspector'
  };
}

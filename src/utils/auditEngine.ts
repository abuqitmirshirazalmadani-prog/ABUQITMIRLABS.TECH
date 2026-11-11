import {
  AuditResult,
  AuditIssue,
  CoreWebVitals,
  InspectedMetrics,
  FieldDataSummary,
  LabDataSummary,
  MiniSiteAuditSummary,
  SixTransparentScores,
  ScoreDimensionDetail,
  ChecksCountSummary,
  DataSourceType,
  AuditMode,
  AuditObjective,
  DeviceSelection,
  AuditAdvancedOptions
} from '../types/audit.js';

export const UNAVAILABLE_EVIDENCE_TEXT =
  'Not enough data to confirm this issue. Manual review recommended.';

export function calculateGrade(score: number): 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

export function getScoreColor(score: number): string {
  if (score >= 90) return '#22c55e';
  if (score >= 75) return '#ccff00';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
}

export function getCwvStatus(
  metric: keyof CoreWebVitals,
  value: number | null | undefined
): 'good' | 'needs-improvement' | 'poor' | 'unavailable' {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return 'unavailable';
  }
  switch (metric) {
    case 'lcp':
      if (value <= 2.5) return 'good';
      if (value <= 4.0) return 'needs-improvement';
      return 'poor';
    case 'cls':
      if (value <= 0.1) return 'good';
      if (value <= 0.25) return 'needs-improvement';
      return 'poor';
    case 'inp':
      if (value <= 200) return 'good';
      if (value <= 500) return 'needs-improvement';
      return 'poor';
    case 'fcp':
      if (value <= 1.8) return 'good';
      if (value <= 3.0) return 'needs-improvement';
      return 'poor';
    case 'ttfb':
      if (value <= 800) return 'good';
      if (value <= 1800) return 'needs-improvement';
      return 'poor';
    case 'speedIndex':
      if (value <= 3.4) return 'good';
      if (value <= 5.8) return 'needs-improvement';
      return 'poor';
    default:
      return 'good';
  }
}

export function getCwvLabel(
  metric: keyof CoreWebVitals,
  value: number | null | undefined
): string {
  const status = getCwvStatus(metric, value);
  if (status === 'unavailable') return 'Data Unavailable';
  if (status === 'good') return 'Good';
  if (status === 'needs-improvement') return 'Needs Work';
  return 'Poor';
}

export function stripHtml(str: string): string {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '').replace(/\[.*?\]/g, '').trim();
}

/**
 * Evaluates 38 deterministic, heuristic, and manual-review checks from extracted
 * HTTP/DOM/PSI evidence. Never invents findings; uses UNAVAILABLE_EVIDENCE_TEXT
 * whenever a data source or DOM sample is unavailable.
 */
export function buildDeterministicChecks(
  targetUrl: string,
  metrics: InspectedMetrics,
  fieldData: FieldDataSummary,
  labData: LabDataSummary,
  miniSite: MiniSiteAuditSummary | undefined,
  mode: AuditMode
): AuditIssue[] {
  const checks: AuditIssue[] = [];
  const htmlAvailable = metrics.htmlBytes > 0 && metrics.statusCode >= 200 && metrics.statusCode < 400;

  // ============================================================================
  // CATEGORY 1: CRAWLABILITY (6 Checks)
  // ============================================================================

  // 1. CHK-CRW-01: HTTP Status & Redirect Chain
  const statusOk = metrics.statusCode >= 200 && metrics.statusCode < 300 && metrics.redirectCount <= 2;
  checks.push({
    id: 'chk-crw-01',
    checkId: 'CHK-CRW-01',
    title: statusOk
      ? `HTTP ${metrics.statusCode} OK (${metrics.redirectCount} redirect hops)`
      : metrics.statusCode >= 400
      ? `HTTP ${metrics.statusCode} Error Response Blocks Crawling`
      : `Redirect Chain Detected (${metrics.redirectCount} hops to final URL)`,
    titleUr: statusOk
      ? `ایچ ٹی ٹی پی ${metrics.statusCode} درست رسپانس (${metrics.redirectCount} ری ڈائریکٹ)`
      : `ایچ ٹی ٹی پی اسٹیٹس یا طویل ری ڈائریکٹ چین کا مسئلہ`,
    description: statusOk
      ? 'The target URL resolved cleanly with an HTTP 2xx status and minimal redirect hops.'
      : 'Non-200 status codes or multi-hop redirect chains waste crawl budget and add latency before HTML parsing begins.',
    category: 'Crawlability',
    priority: statusOk ? 'passed' : metrics.statusCode >= 400 ? 'critical' : 'medium',
    passed: statusOk,
    impact: statusOk ? 'Low' : 'High',
    effort: '30 mins',
    suggestedFix:
      'Ensure the canonical URL returns HTTP 200 directly and consolidate multi-hop redirects into a single 301 redirect.',
    evidence:
      metrics.statusCode > 0
        ? `HTTP Status: ${metrics.statusCode} | Redirect Hops: ${metrics.redirectCount} | Final URL: ${metrics.finalUrl}`
        : UNAVAILABLE_EVIDENCE_TEXT,
    affectedTarget: targetUrl,
    whyItMatters:
      'Search engine crawlers and users abandon URLs that fail to resolve or chain through multiple intermediate redirects.',
    businessImpact:
      'Prevents indexing failures and eliminates 100–400ms of wasted redirect round-trip latency on first visit.',
    fixOwner: 'Backend / DevOps',
    confidence: metrics.statusCode > 0 ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Run `curl -I -L <url>` and confirm a direct HTTP 200 response or at most one 301 hop.',
    dataType: 'HTML/static checks',
    actionHorizon: statusOk ? 'Monitor' : metrics.statusCode >= 400 ? 'Fix Today' : 'Fix This Week'
  });

  // 2. CHK-CRW-02: Meta Robots & X-Robots-Tag Indexability
  const robotsCombined = `${metrics.robotsMeta || ''} ${metrics.xRobotsTag || ''}`.toLowerCase();
  const hasNoindex = robotsCombined.includes('noindex');
  checks.push({
    id: 'chk-crw-02',
    checkId: 'CHK-CRW-02',
    title: !htmlAvailable
      ? 'Meta Robots & X-Robots-Tag Directive Check'
      : hasNoindex
      ? 'Page Blocks Indexing via `noindex` Directive'
      : 'Page Allows Search Engine Indexing',
    titleUr: hasNoindex
      ? 'پیج پر noindex لگا ہوا ہے جو گوگل انڈیکسنگ روکتا ہے'
      : 'سرچ انجن انڈیکسنگ کی اجازت موجود ہے',
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : hasNoindex
      ? 'A `noindex` directive was detected in `<meta name="robots">` or the `X-Robots-Tag` HTTP header.'
      : 'No `noindex` directives detected in `<meta name="robots">` or HTTP headers.',
    category: 'Crawlability',
    priority: !htmlAvailable ? 'low' : hasNoindex ? 'critical' : 'passed',
    passed: htmlAvailable && !hasNoindex,
    impact: 'High',
    effort: '15 mins',
    suggestedFix:
      'Remove `noindex` from `<meta name="robots" content="index, follow">` and verify no `X-Robots-Tag: noindex` header is sent in production.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `meta[name="robots"]: "${metrics.robotsMeta || 'not set (defaults to index, follow)'}" | X-Robots-Tag header: "${metrics.xRobotsTag || 'none'}"`,
    affectedTarget: '<head> meta[name="robots"] & HTTP X-Robots-Tag',
    whyItMatters:
      'An accidental `noindex` tag completely removes the page from Google Search results regardless of content quality.',
    businessImpact: 'Restores eligibility for organic search impressions and discovery.',
    fixOwner: 'SEO Specialist',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep:
      'Inspect the page source for `<meta name="robots">` and check response headers in DevTools Network tab.',
    dataType: 'HTML/static checks',
    actionHorizon: !htmlAvailable ? 'Monitor' : hasNoindex ? 'Fix Today' : 'Monitor'
  });

  // 3. CHK-CRW-03: Canonical Link Tag
  const hasValidCanonical = Boolean(
    metrics.canonicalUrl && /^https?:\/\//i.test(metrics.canonicalUrl)
  );
  checks.push({
    id: 'chk-crw-03',
    checkId: 'CHK-CRW-03',
    title: !htmlAvailable
      ? 'Canonical Link Tag (`rel="canonical"`) Verification'
      : hasValidCanonical
      ? 'Valid Absolute Canonical URL Declared'
      : 'Missing or Relative Canonical Link Tag (`rel="canonical"`)',
    titleUr: hasValidCanonical
      ? 'مکمل کینونیکل یو آر ایل موجود ہے'
      : 'کینونیکل ٹیگ غائب یا نامکمل ہے',
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : hasValidCanonical
      ? 'A valid absolute `<link rel="canonical">` tag consolidates ranking signals.'
      : 'The page lacks an explicit absolute `<link rel="canonical" href="https://...">` element.',
    category: 'Crawlability',
    priority: !htmlAvailable ? 'low' : hasValidCanonical ? 'passed' : 'high',
    passed: htmlAvailable && hasValidCanonical,
    impact: 'High',
    effort: '20 mins',
    suggestedFix: `Add \`<link rel="canonical" href="${metrics.finalUrl || targetUrl}" />\` inside the document \`<head>\`.`,
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : metrics.canonicalUrl
      ? `Found <link rel="canonical" href="${metrics.canonicalUrl}">`
      : 'No <link rel="canonical"> element found in extracted <head> HTML.',
    affectedTarget: '<head> > link[rel="canonical"]',
    whyItMatters:
      'Canonical tags prevent duplicate content dilution caused by UTM parameters, trailing slashes, or HTTP/HTTPS variants.',
    businessImpact: 'Consolidates link equity and prevents split indexing in Google Search Console.',
    fixOwner: 'SEO Specialist',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'View page source (`Ctrl+U`) and confirm a single absolute `<link rel="canonical">` tag in `<head>`.',
    dataType: 'HTML/static checks',
    actionHorizon: !htmlAvailable ? 'Monitor' : hasValidCanonical ? 'Monitor' : 'Fix Today'
  });

  // 4. CHK-CRW-04: robots.txt Availability & Rules
  const robotsChecked = Boolean(miniSite?.robotsTxtChecked && miniSite.robotsTxtStatus !== null);
  const robotsOk = Boolean(
    robotsChecked &&
      miniSite?.robotsTxtStatus === 200 &&
      miniSite?.robotsTxtAllowsCrawl !== false
  );
  checks.push({
    id: 'chk-crw-04',
    checkId: 'CHK-CRW-04',
    title: !robotsChecked
      ? 'robots.txt Crawl Directive Verification'
      : robotsOk
      ? 'robots.txt Reachable and Permits Crawling'
      : miniSite?.robotsTxtAllowsCrawl === false
      ? 'robots.txt Blocks Root Crawling (`Disallow: /`)'
      : `robots.txt Returned HTTP ${miniSite?.robotsTxtStatus}`,
    titleUr: robotsOk
      ? 'robots.txt فائل موجود اور درست ہے'
      : 'robots.txt فائل کی جانچ یا رسائی کا مسئلہ',
    description: !robotsChecked
      ? `${UNAVAILABLE_EVIDENCE_TEXT} (Select Mini Site Audit or Complete Growth Audit to inspect /robots.txt.)`
      : robotsOk
      ? '`/robots.txt` responded with HTTP 200 and does not block root crawler access.'
      : '`/robots.txt` is missing, unreachable, or contains a restrictive `Disallow: /` rule for `User-agent: *`.',
    category: 'Crawlability',
    priority: !robotsChecked
      ? 'low'
      : robotsOk
      ? 'passed'
      : miniSite?.robotsTxtAllowsCrawl === false
      ? 'critical'
      : 'medium',
    passed: robotsOk,
    impact: miniSite?.robotsTxtAllowsCrawl === false ? 'High' : 'Medium',
    effort: '20 mins',
    suggestedFix:
      'Publish a valid `/robots.txt` at the domain root allowing public pages (`Allow: /`) and referencing `Sitemap: https://yourdomain.com/sitemap.xml`.',
    evidence: !robotsChecked
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `URL: ${miniSite?.robotsTxtUrl} | Status: ${miniSite?.robotsTxtStatus} | Allows Crawl: ${miniSite?.robotsTxtAllowsCrawl} | Sitemap Directive: ${miniSite?.robotsTxtHasSitemapDirective ? 'Yes' : 'No'}`,
    affectedTarget: miniSite?.robotsTxtUrl || '/robots.txt',
    whyItMatters:
      'Search engine bots check `/robots.txt` before crawling any page on your domain to understand crawl permissions and locate your XML sitemap.',
    businessImpact: 'Prevents accidental site-wide de-indexing and improves crawler efficiency.',
    fixOwner: 'SEO Specialist',
    confidence: robotsChecked ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Open `/robots.txt` in a browser and test rules in Google Search Console robots.txt tester.',
    dataType: 'HTML/static checks',
    actionHorizon: !robotsChecked ? 'Monitor' : robotsOk ? 'Monitor' : 'Fix Today'
  });

  // 5. CHK-CRW-05: XML Sitemap Discovery
  const sitemapChecked = Boolean(miniSite?.sitemapXmlChecked && miniSite.sitemapXmlStatus !== null);
  const sitemapOk = Boolean(
    sitemapChecked &&
      miniSite?.sitemapXmlStatus === 200 &&
      (miniSite?.sitemapUrlCount ?? 0) > 0
  );
  checks.push({
    id: 'chk-crw-05',
    checkId: 'CHK-CRW-05',
    title: !sitemapChecked
      ? 'XML Sitemap (`/sitemap.xml`) Discovery Check'
      : sitemapOk
      ? `XML Sitemap Verified (${miniSite?.sitemapUrlCount} URLs indexed)`
      : 'XML Sitemap Missing, Empty, or Unreachable',
    titleUr: sitemapOk
      ? 'سائٹ میپ (sitemap.xml) درست اور فعال ہے'
      : 'سائٹ میپ (sitemap.xml) غائب یا ناقابل رسائی ہے',
    description: !sitemapChecked
      ? `${UNAVAILABLE_EVIDENCE_TEXT} (Run Mini Site Audit or Complete Growth Audit to fetch and parse /sitemap.xml.)`
      : sitemapOk
      ? 'A valid XML sitemap was discovered and contains `<loc>` entries.'
      : 'Could not verify a valid `/sitemap.xml` containing canonical `<loc>` entries.',
    category: 'Crawlability',
    priority: !sitemapChecked ? 'low' : sitemapOk ? 'passed' : 'medium',
    passed: sitemapOk,
    impact: 'Medium',
    effort: '1 hour',
    suggestedFix:
      'Generate a dynamic or build-time `/sitemap.xml` listing 100% canonical URLs with accurate `<lastmod>` dates and submit it in Google Search Console.',
    evidence: !sitemapChecked
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `Sitemap URL: ${miniSite?.sitemapXmlUrl} | HTTP Status: ${miniSite?.sitemapXmlStatus} | <loc> Count: ${miniSite?.sitemapUrlCount ?? 0}`,
    affectedTarget: miniSite?.sitemapXmlUrl || '/sitemap.xml',
    whyItMatters:
      'XML sitemaps accelerate URL discovery for new or updated pages and help search engines understand canonical site structure.',
    businessImpact: 'Faster indexing of new landing pages, product pages, and articles.',
    fixOwner: 'SEO Specialist',
    confidence: sitemapChecked ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Visit `/sitemap.xml` and verify valid XML structure with `<urlset>` and `<loc>` tags.',
    dataType: 'HTML/static checks',
    actionHorizon: !sitemapChecked ? 'Monitor' : sitemapOk ? 'Monitor' : 'Fix This Week'
  });

  // 6. CHK-CRW-06: Internal Link Crawl Architecture
  const hasHealthyInternalLinks = htmlAvailable && metrics.internalLinksCount >= 3;
  checks.push({
    id: 'chk-crw-06',
    checkId: 'CHK-CRW-06',
    title: !htmlAvailable
      ? 'Internal Link Crawl Architecture Check'
      : hasHealthyInternalLinks
      ? `Crawlable Internal Link Architecture (${metrics.internalLinksCount} internal links)`
      : `Low Internal Link Connectivity (${metrics.internalLinksCount} internal links found)`,
    titleUr: hasHealthyInternalLinks
      ? 'انٹرنل لنکنگ کا ڈھانچہ مضبوط ہے'
      : 'صفحے پر انٹرنل لنکس کی تعداد بہت کم ہے',
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : hasHealthyInternalLinks
      ? 'Page contains crawlable `<a href="...">` internal links connecting to core site architecture.'
      : 'Very few crawlable `<a href>` internal links were found in the initial HTML response.',
    category: 'Crawlability',
    priority: !htmlAvailable ? 'low' : hasHealthyInternalLinks ? 'passed' : 'medium',
    passed: hasHealthyInternalLinks,
    impact: 'Medium',
    effort: '1–2 hours',
    suggestedFix:
      'Add descriptive `<a href="/...">` links to priority service pages, category hubs, and conversion pages instead of relying on JS-only click handlers.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `Internal <a href> links: ${metrics.internalLinksCount} | External <a href> links: ${metrics.externalLinksCount}`,
    affectedTarget: 'Document <body> <a href> elements',
    whyItMatters:
      'Search engines discover deeper pages and distribute topical authority primarily through standard HTML `<a href>` anchor links.',
    businessImpact: 'Improves organic discovery of deep service and product pages.',
    fixOwner: 'SEO Specialist',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Inspect navigation and body links to ensure standard `<a href>` attributes are rendered in initial HTML.',
    dataType: 'HTML/static checks',
    actionHorizon: !htmlAvailable ? 'Monitor' : hasHealthyInternalLinks ? 'Monitor' : 'Fix This Week'
  });

  // ============================================================================
  // CATEGORY 2: SEO & GOOGLE VISIBILITY (8 Checks)
  // ============================================================================

  // 7. CHK-SEO-01: HTML <title> Tag Presence & Length
  const titleLen = metrics.metaTitle ? metrics.metaTitle.length : 0;
  const titleOptimal = htmlAvailable && titleLen >= 30 && titleLen <= 60;
  const titlePresent = htmlAvailable && titleLen > 0;
  checks.push({
    id: 'chk-seo-01',
    checkId: 'CHK-SEO-01',
    title: !htmlAvailable
      ? 'HTML <title> Tag Presence & Length Check'
      : !titlePresent
      ? 'Missing HTML `<title>` Tag'
      : titleOptimal
      ? `Optimized HTML <title> Length (${titleLen} chars)`
      : `Unoptimized HTML <title> Length (${titleLen} chars; target 30–60)`,
    titleUr: titleOptimal
      ? `ایچ ٹی ایم ایل ٹائٹل کی لمبائی بہترین ہے (${titleLen} حروف)`
      : 'ایچ ٹی ایم ایل ٹائٹل غائب ہے یا لمبائی 30 تا 60 حروف کے درمیان نہیں ہے',
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : !titlePresent
      ? 'No `<title>` element was found in the HTML `<head>`.'
      : titleOptimal
      ? 'The `<title>` tag is present and within the ideal 30–60 character SERP display window.'
      : 'Titles shorter than 30 characters under-utilize keyword intent, while titles over 60 characters risk truncation in Google SERPs.',
    category: 'SEO',
    priority: !htmlAvailable ? 'low' : !titlePresent ? 'critical' : titleOptimal ? 'passed' : 'medium',
    passed: titleOptimal,
    impact: !titlePresent ? 'High' : 'Medium',
    effort: '15 mins',
    suggestedFix:
      'Write a unique, intent-aligned `<title>` between 30 and 60 characters: `Primary Topic or Service | Brand Name`.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : titlePresent
      ? `<title>${metrics.metaTitle}</title> (${titleLen} characters)`
      : 'No <title> tag found in extracted HTML.',
    affectedTarget: '<head> > <title>',
    whyItMatters:
      'The HTML `<title>` is one of the strongest on-page relevance signals and forms the clickable headline in search results.',
    businessImpact: 'Improves organic click-through rate (CTR) and prevents SERP headline truncation.',
    fixOwner: 'SEO Specialist',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Check `<title>` character count (30–60 chars) in page source.',
    dataType: 'HTML/static checks',
    actionHorizon: !htmlAvailable
      ? 'Monitor'
      : !titlePresent
      ? 'Fix Today'
      : titleOptimal
      ? 'Monitor'
      : 'Fix This Week'
  });

  // 8. CHK-SEO-02: Meta Description Presence & Length
  const descLen = metrics.metaDescription ? metrics.metaDescription.length : 0;
  const descOptimal = htmlAvailable && descLen >= 110 && descLen <= 165;
  const descPresent = htmlAvailable && descLen > 0;
  checks.push({
    id: 'chk-seo-02',
    checkId: 'CHK-SEO-02',
    title: !htmlAvailable
      ? 'Meta Description Presence & Length Check'
      : !descPresent
      ? 'Missing `<meta name="description">` Tag'
      : descOptimal
      ? `Optimized Meta Description (${descLen} chars)`
      : `Meta Description Length Outside Target Range (${descLen} chars; target 120–160)`,
    titleUr: descOptimal
      ? `میٹا ڈسکرپشن بہترین ہے (${descLen} حروف)`
      : 'میٹا ڈسکرپشن غائب ہے یا لمبائی موزوں نہیں ہے',
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : !descPresent
      ? 'The page has no `<meta name="description">`, forcing search engines to scrape arbitrary page text.'
      : descOptimal
      ? 'Meta description is present and well-sized for desktop and mobile search snippets.'
      : 'Meta description is either too brief (<110 chars) or too long (>165 chars) for clean SERP rendering.',
    category: 'SEO',
    priority: !htmlAvailable ? 'low' : !descPresent ? 'high' : descOptimal ? 'passed' : 'low',
    passed: descOptimal,
    impact: !descPresent ? 'High' : 'Low',
    effort: '20 mins',
    suggestedFix:
      'Provide a compelling 120–160 character `<meta name="description" content="...">` summarizing value proposition and primary proof.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : descPresent
      ? `<meta name="description" content="${metrics.metaDescription}"> (${descLen} characters)`
      : 'No <meta name="description"> tag found in <head>.',
    affectedTarget: '<head> > meta[name="description"]',
    whyItMatters:
      'While not a direct ranking factor, a clear meta description improves search snippet quality and organic click-through rate.',
    businessImpact: 'Increases qualified organic clicks from search engine results pages.',
    fixOwner: 'SEO Specialist',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Inspect `<meta name="description">` in `<head>` and verify length is 120–160 characters.',
    dataType: 'HTML/static checks',
    actionHorizon: !htmlAvailable
      ? 'Monitor'
      : !descPresent
      ? 'Fix Today'
      : descOptimal
      ? 'Monitor'
      : 'Fix This Week'
  });

  // 9. CHK-SEO-03: Primary <h1> Heading Uniqueness
  const singleH1 = htmlAvailable && metrics.h1Count === 1;
  checks.push({
    id: 'chk-seo-03',
    checkId: 'CHK-SEO-03',
    title: !htmlAvailable
      ? 'Primary `<h1>` Heading Uniqueness Check'
      : metrics.h1Count === 0
      ? 'Missing Primary `<h1>` Heading'
      : singleH1
      ? 'Single Semantic `<h1>` Heading Verified'
      : `Multiple \`<h1>\` Headings Detected (${metrics.h1Count} found)`,
    titleUr: singleH1
      ? 'صفحے پر ایک واضح H1 ہیڈنگ موجود ہے'
      : 'H1 ہیڈنگ غائب ہے یا ایک سے زیادہ مرتبہ استعمال ہوئی ہے',
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : metrics.h1Count === 0
      ? 'No `<h1>` heading was found in the extracted HTML document.'
      : singleH1
      ? 'The document contains exactly one primary `<h1>` heading aligned with page topic.'
      : 'Multiple `<h1>` headings dilute primary topic hierarchy for search crawlers and screen reader users.',
    category: 'SEO',
    priority: !htmlAvailable
      ? 'low'
      : metrics.h1Count === 0
      ? 'high'
      : singleH1
      ? 'passed'
      : 'medium',
    passed: singleH1,
    impact: metrics.h1Count === 0 ? 'High' : 'Medium',
    effort: '20 mins',
    suggestedFix:
      'Ensure the page renders exactly one visible `<h1>` containing the primary page topic, and demote secondary headings to `<h2>` or `<h3>`.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `h1 count: ${metrics.h1Count}${metrics.h1Texts && metrics.h1Texts.length > 0 ? ` | Sample: "${metrics.h1Texts.slice(0, 2).join('", "')}"` : ''}`,
    affectedTarget: 'Document <body> <h1> elements',
    whyItMatters:
      'A single clear `<h1>` anchors the semantic outline of the page for both search engines and assistive technologies.',
    businessImpact: 'Strengthens topical relevance and improves above-the-fold message clarity.',
    fixOwner: 'Frontend Engineer',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Run `document.querySelectorAll("h1").length` in browser DevTools console and verify it equals `1`.',
    dataType: 'HTML/static checks',
    actionHorizon: !htmlAvailable
      ? 'Monitor'
      : metrics.h1Count === 0
      ? 'Fix Today'
      : singleH1
      ? 'Monitor'
      : 'Fix This Week'
  });

  // 10. CHK-SEO-04: Subheading Hierarchy (<h2> / <h3>)
  const hasStructuredSubheadings = htmlAvailable && metrics.h2Count >= 2;
  checks.push({
    id: 'chk-seo-04',
    checkId: 'CHK-SEO-04',
    title: !htmlAvailable
      ? 'Section Subheading Hierarchy (`<h2>` / `<h3>`) Check'
      : hasStructuredSubheadings
      ? `Structured Section Hierarchy (${metrics.h2Count} <h2>, ${metrics.h3Count} <h3>)`
      : `Thin Subheading Structure (${metrics.h2Count} <h2>, ${metrics.h3Count} <h3>)`,
    titleUr: hasStructuredSubheadings
      ? 'ذیلی ہیڈنگز (H2 / H3) کا ڈھانچہ منظم ہے'
      : 'صفحے پر H2 اور H3 ہیڈنگز کی کمی ہے',
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : hasStructuredSubheadings
      ? 'Page organizes content into scannable `<h2>` and `<h3>` sections.'
      : 'Page has fewer than 2 `<h2>` headings, making it harder for users and search engines to scan key subtopics.',
    category: 'SEO',
    priority: !htmlAvailable ? 'low' : hasStructuredSubheadings ? 'passed' : 'medium',
    passed: hasStructuredSubheadings,
    impact: 'Medium',
    effort: '45 mins',
    suggestedFix:
      'Break long copy into logical `<h2>` and `<h3>` sub-sections that answer specific buyer and search questions.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `<h1>: ${metrics.h1Count} | <h2>: ${metrics.h2Count} | <h3>: ${metrics.h3Count}`,
    affectedTarget: 'Document <body> <h2> and <h3> elements',
    whyItMatters:
      'Clear `<h2>` and `<h3>` headings help search engines extract passage-level answers and help readers scan complex pages.',
    businessImpact: 'Improves passage indexing, AI Overview citations, and reader engagement.',
    fixOwner: 'Content / Legal',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Verify all major content blocks are introduced by descriptive `<h2>` and `<h3>` tags.',
    dataType: 'HTML/static checks',
    actionHorizon: !htmlAvailable ? 'Monitor' : hasStructuredSubheadings ? 'Monitor' : 'Fix This Week'
  });

  // 11. CHK-SEO-05: Schema.org JSON-LD Structured Data
  const hasJsonLd = htmlAvailable && metrics.jsonLdCount > 0;
  checks.push({
    id: 'chk-seo-05',
    checkId: 'CHK-SEO-05',
    title: !htmlAvailable
      ? 'Schema.org JSON-LD Structured Data Check'
      : hasJsonLd
      ? `JSON-LD Structured Data Active (${metrics.jsonLdTypes.join(', ') || `${metrics.jsonLdCount} block`})`
      : 'No Schema.org JSON-LD (`application/ld+json`) Found',
    titleUr: hasJsonLd
      ? 'اسکیما JSON-LD اسٹرکچرڈ ڈیٹا موجود ہے'
      : 'صفحے پر Schema.org JSON-LD ڈیٹا موجود نہیں ہے',
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : hasJsonLd
      ? 'Valid `<script type="application/ld+json">` structured data was detected in the HTML.'
      : 'No `<script type="application/ld+json">` schema markup was found on the page.',
    category: 'SEO',
    priority: !htmlAvailable ? 'low' : hasJsonLd ? 'passed' : 'medium',
    passed: hasJsonLd,
    impact: 'Medium',
    effort: '1–2 hours',
    suggestedFix:
      'Add a unified `@graph` `<script type="application/ld+json">` block declaring `Organization`, `WebSite`, `WebPage`, and `BreadcrumbList` (plus `Service`, `Product`, or `Article` where applicable).',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : hasJsonLd
      ? `JSON-LD Blocks: ${metrics.jsonLdCount} | Detected @type entities: ${metrics.jsonLdTypes.join(', ') || 'Valid JSON-LD'}`
      : '0 <script type="application/ld+json"> elements found.',
    affectedTarget: '<head> > script[type="application/ld+json"]',
    whyItMatters:
      'Structured data disambiguates your organization, services, breadcrumbs, and FAQs for Google Search and generative AI engines.',
    businessImpact: 'Enables rich result eligibility and clearer entity disambiguation in search.',
    fixOwner: 'SEO Specialist',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Validate the URL in the official Schema Markup Validator (validator.schema.org).',
    dataType: 'HTML/static checks',
    actionHorizon: !htmlAvailable ? 'Monitor' : hasJsonLd ? 'Monitor' : 'Fix This Week'
  });

  // 12. CHK-SEO-06: OpenGraph Social Metadata
  const ogComplete = htmlAvailable && metrics.hasOgTitle && metrics.hasOgDescription && metrics.hasOgImage;
  checks.push({
    id: 'chk-seo-06',
    checkId: 'CHK-SEO-06',
    title: !htmlAvailable
      ? 'OpenGraph Protocol Metadata (`og:title`, `og:description`, `og:image`)'
      : ogComplete
      ? 'Complete OpenGraph Social Metadata Verified'
      : 'Incomplete OpenGraph Metadata (`og:title`, `og:description`, or `og:image`)',
    titleUr: ogComplete
      ? 'اوپن گراف (OpenGraph) سوشل ٹیگز مکمل ہیں'
      : 'اوپن گراف (OpenGraph) میٹا ٹیگز نامکمل ہیں',
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : ogComplete
      ? 'All core OpenGraph properties (`og:title`, `og:description`, `og:image`) are present.'
      : 'One or more OpenGraph tags are missing, causing broken or unstyled link previews on LinkedIn, WhatsApp, and Facebook.',
    category: 'SEO',
    priority: !htmlAvailable ? 'low' : ogComplete ? 'passed' : 'low',
    passed: ogComplete,
    impact: 'Low',
    effort: '20 mins',
    suggestedFix:
      'Add `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:image">`, and `<meta property="og:url">` in `<head>`.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `og:title: ${metrics.hasOgTitle ? 'Present' : 'Missing'} | og:description: ${metrics.hasOgDescription ? 'Present' : 'Missing'} | og:image: ${metrics.hasOgImage ? 'Present' : 'Missing'}`,
    affectedTarget: '<head> > meta[property^="og:"]',
    whyItMatters:
      'B2B buyers frequently share links on WhatsApp, Slack, and LinkedIn; complete OpenGraph metadata ensures high-trust visual previews.',
    businessImpact: 'Improves click-through rates when links are shared across social and messaging apps.',
    fixOwner: 'Frontend Engineer',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Inspect `<meta property="og:*">` tags in `<head>`.',
    dataType: 'HTML/static checks',
    actionHorizon: 'Monitor'
  });

  // 13. CHK-SEO-07: Twitter / X Card Metadata
  const twitterOk = htmlAvailable && metrics.hasTwitterCard;
  checks.push({
    id: 'chk-seo-07',
    checkId: 'CHK-SEO-07',
    title: !htmlAvailable
      ? 'Twitter Card (`twitter:card`) Metadata Check'
      : twitterOk
      ? 'Twitter Card (`twitter:card`) Tag Present'
      : 'Missing `twitter:card` Meta Tag',
    titleUr: twitterOk ? 'ٹوئٹر کارڈ میٹا ٹیگ موجود ہے' : 'ٹوئٹر کارڈ میٹا ٹیگ غائب ہے',
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : twitterOk
      ? '`meta[name="twitter:card"]` is declared for large summary card previews.'
      : 'No `meta[name="twitter:card"]` tag was detected.',
    category: 'SEO',
    priority: 'passed',
    passed: twitterOk,
    impact: 'Low',
    effort: '10 mins',
    suggestedFix: 'Add `<meta name="twitter:card" content="summary_large_image" />` to `<head>`.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `meta[name="twitter:card"]: ${metrics.hasTwitterCard ? 'Present' : 'Missing'}`,
    affectedTarget: '<head> > meta[name="twitter:card"]',
    whyItMatters: 'Controls how shared URLs display on X (Twitter) and Discord embeds.',
    businessImpact: 'Enhances visual presentation on social channels.',
    fixOwner: 'Frontend Engineer',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Verify `<meta name="twitter:card" content="summary_large_image">` in `<head>`.',
    dataType: 'HTML/static checks',
    actionHorizon: 'Monitor'
  });

  // ============================================================================
  // CATEGORY 3: PERFORMANCE & CORE WEB VITALS (7 Checks)
  // ============================================================================

  // 14. CHK-PRF-01: Real-User Field Data (Chrome UX Report / CrUX)
  const fieldPass =
    fieldData.available &&
    fieldData.overallCategory === 'FAST' &&
    (fieldData.lcpSeconds === null || fieldData.lcpSeconds <= 2.5) &&
    (fieldData.inpMs === null || fieldData.inpMs <= 200) &&
    (fieldData.clsScore === null || fieldData.clsScore <= 0.1);

  checks.push({
    id: 'chk-prf-01',
    checkId: 'CHK-PRF-01',
    title: !fieldData.available
      ? 'Real-User Field Data (Chrome UX Report / CrUX 28-Day P75)'
      : fieldPass
      ? 'Real-User Field Data Passes Core Web Vitals Thresholds'
      : `Real-User Field Data Indicates ${fieldData.overallCategory} Experience`,
    titleUr: !fieldData.available
      ? 'حقیقی صارفین کا فیلڈ ڈیٹا (CrUX) دستیاب نہیں ہے'
      : fieldPass
      ? 'حقیقی صارفین کا کور ویب وائٹلز ڈیٹا بہترین ہے'
      : 'حقیقی صارفین کے فیلڈ ڈیٹا میں بہتری کی ضرورت ہے',
    description: !fieldData.available
      ? UNAVAILABLE_EVIDENCE_TEXT
      : 'Core Web Vitals are important user-experience signals used by Google’s ranking systems. They are not a ranking guarantee.',
    category: 'Performance',
    priority: !fieldData.available ? 'low' : fieldPass ? 'passed' : 'high',
    passed: fieldPass,
    impact: 'High',
    effort: '1–3 days',
    suggestedFix:
      'Monitor real-user 75th-percentile LCP (≤2.5s), INP (≤200ms), and CLS (≤0.10) in Google Search Console Core Web Vitals report.',
    evidence: !fieldData.available
      ? `${UNAVAILABLE_EVIDENCE_TEXT} (${fieldData.note})`
      : `CrUX Category: ${fieldData.overallCategory} | P75 LCP: ${fieldData.lcpSeconds ?? 'N/A'}s | P75 INP: ${fieldData.inpMs ?? 'N/A'}ms | P75 CLS: ${fieldData.clsScore ?? 'N/A'}`,
    affectedTarget: targetUrl,
    whyItMatters:
      'Core Web Vitals are important user-experience signals used by Google’s ranking systems. They are not a ranking guarantee.',
    businessImpact:
      'Faster real-user loading and interaction responsiveness reduce bounce rates and improve conversion completion.',
    fixOwner: 'Frontend Engineer',
    confidence: fieldData.available ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Check the Core Web Vitals report in Google Search Console or PageSpeed Insights Field Data tab.',
    dataType: 'Real-user field data',
    actionHorizon: !fieldData.available ? 'Monitor' : fieldPass ? 'Monitor' : 'Fix This Week'
  });

  // 15. CHK-PRF-02: Lighthouse Synthetic Lab Core Web Vitals
  const activeLabCwv = labData.mobile || labData.desktop;
  const labLcp = activeLabCwv?.lcp ?? null;
  const labCls = activeLabCwv?.cls ?? null;
  const labPass = Boolean(
    labData.available &&
      labLcp !== null &&
      labLcp <= 2.5 &&
      (labCls === null || labCls <= 0.1)
  );
  checks.push({
    id: 'chk-prf-02',
    checkId: 'CHK-PRF-02',
    title: !labData.available
      ? 'Lighthouse Lab Core Web Vitals (Synthetic Simulation)'
      : labPass
      ? `Lighthouse Lab LCP (${labLcp}s) & CLS (${labCls}) Within Target`
      : `Lighthouse Lab Metrics Need Optimization (LCP: ${labLcp ?? 'N/A'}s, CLS: ${labCls ?? 'N/A'})`,
    titleUr: !labData.available
      ? 'لائٹ ہاؤس لیب ڈیٹا دستیاب نہیں ہے'
      : labPass
      ? 'لائٹ ہاؤس لیب کور ویب وائٹلز درست ہیں'
      : 'لائٹ ہاؤس لیب اسپیڈ میٹرکس میں بہتری کی ضرورت ہے',
    description: !labData.available
      ? UNAVAILABLE_EVIDENCE_TEXT
      : 'Synthetic Lighthouse lab test under controlled throttling. Core Web Vitals are important user-experience signals used by Google’s ranking systems. They are not a ranking guarantee.',
    category: 'Performance',
    priority: !labData.available
      ? 'low'
      : labPass
      ? 'passed'
      : labLcp && labLcp > 4.0
      ? 'critical'
      : 'high',
    passed: labPass,
    impact: 'High',
    effort: '1–2 days',
    suggestedFix:
      'Preload the hero LCP image (`<link rel="preload" as="image" fetchpriority="high">`), inline critical CSS, and reserve explicit aspect-ratio containers to prevent layout shifts.',
    evidence: !labData.available
      ? `${UNAVAILABLE_EVIDENCE_TEXT} (${labData.note})`
      : `Lab Source: ${labData.sourceLabel} | LCP: ${activeLabCwv?.lcp ?? 'N/A'}s | CLS: ${activeLabCwv?.cls ?? 'N/A'} | FCP: ${activeLabCwv?.fcp ?? 'N/A'}s | SI: ${activeLabCwv?.speedIndex ?? 'N/A'}s`,
    affectedTarget: 'Primary viewport above-the-fold elements',
    whyItMatters:
      'Lab data provides reproducible diagnostic timings before deploying changes to real users.',
    businessImpact: 'Reduces perceived wait time and visual jitter during initial page load.',
    fixOwner: 'Frontend Engineer',
    confidence: labData.available ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Run Chrome DevTools Lighthouse panel in Incognito mode and verify LCP ≤ 2.5s and CLS ≤ 0.10.',
    dataType: 'Lighthouse lab data',
    actionHorizon: !labData.available ? 'Monitor' : labPass ? 'Monitor' : 'Fix Today'
  });

  // 16. CHK-PRF-03: Server Time to First Byte (TTFB)
  const ttfbKnown = metrics.statusCode > 0 && metrics.responseTimeMs > 0;
  const ttfbPass = ttfbKnown && metrics.responseTimeMs <= 800;
  checks.push({
    id: 'chk-prf-03',
    checkId: 'CHK-PRF-03',
    title: !ttfbKnown
      ? 'Server Time to First Byte (TTFB) Latency Check'
      : ttfbPass
      ? `Fast Server Response Time (TTFB: ${metrics.responseTimeMs}ms)`
      : `Elevated Server Response Latency (TTFB: ${metrics.responseTimeMs}ms; target ≤ 800ms)`,
    titleUr: ttfbPass
      ? `سرور رسپانس ٹائم تیز ہے (${metrics.responseTimeMs}ms)`
      : `سرور رسپانس ٹائم سست ہے (${metrics.responseTimeMs}ms)`,
    description: !ttfbKnown
      ? UNAVAILABLE_EVIDENCE_TEXT
      : ttfbPass
      ? 'Initial HTML response arrived within the 800ms Good threshold.'
      : 'High server response time delays every subsequent step of CSS, font, and image loading.',
    category: 'Performance',
    priority: !ttfbKnown
      ? 'low'
      : ttfbPass
      ? 'passed'
      : metrics.responseTimeMs > 1800
      ? 'critical'
      : 'medium',
    passed: ttfbPass,
    impact: metrics.responseTimeMs > 1500 ? 'High' : 'Medium',
    effort: '2–4 hours',
    suggestedFix:
      'Serve public pages from a global Edge CDN (Cloudflare, Vercel Edge, or CloudFront) with `Cache-Control: s-maxage=3600, stale-while-revalidate` and optimize backend database queries.',
    evidence: !ttfbKnown
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `Measured HTTP GET response time: ${metrics.responseTimeMs}ms | Status: ${metrics.statusCode}`,
    affectedTarget: targetUrl,
    whyItMatters:
      'A slow TTFB directly pushes back First Contentful Paint (FCP) and Largest Contentful Paint (LCP).',
    businessImpact: 'Improves initial page responsiveness across mobile and international networks.',
    fixOwner: 'Backend / DevOps',
    confidence: ttfbKnown ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Check "Waiting for server response" timing in Chrome DevTools Network tab (< 800ms).',
    dataType: 'HTML/static checks',
    actionHorizon: !ttfbKnown
      ? 'Monitor'
      : ttfbPass
      ? 'Monitor'
      : metrics.responseTimeMs > 1800
      ? 'Fix Today'
      : 'Fix This Week'
  });

  // 17. CHK-PRF-04: HTTP Text Compression (Brotli / Gzip) & HTML Payload Size
  const kbSize = Math.round(metrics.htmlBytes / 1024);
  const compressionPass = htmlAvailable && (Boolean(metrics.isCompressed) || metrics.htmlBytes < 35_000);
  checks.push({
    id: 'chk-prf-04',
    checkId: 'CHK-PRF-04',
    title: !htmlAvailable
      ? 'HTTP Text Compression (`br` / `gzip`) & HTML Payload Size'
      : compressionPass
      ? `HTML Payload Optimized (${kbSize} KB${metrics.compressionType ? `, ${metrics.compressionType}` : ''})`
      : `Uncompressed or Heavy HTML Transfer (${kbSize} KB)`,
    titleUr: compressionPass
      ? `ایچ ٹی ایم ایل کمپریشن فعال ہے (${kbSize} KB)`
      : `ایچ ٹی ایم ایل کمپریشن غیر فعال یا فائل سائز بڑا ہے (${kbSize} KB)`,
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : compressionPass
      ? 'HTML payload size and transfer encoding are efficient.'
      : 'HTML response exceeded 35 KB without verified Brotli/Gzip compression header.',
    category: 'Performance',
    priority: !htmlAvailable ? 'low' : compressionPass ? 'passed' : 'medium',
    passed: compressionPass,
    impact: 'Medium',
    effort: '1 hour',
    suggestedFix:
      'Enable Brotli (`br`) and Gzip (`gzip`) text compression on your origin server or CDN proxy.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `HTML Size: ${kbSize} KB (${metrics.htmlBytes} bytes)${metrics.truncatedBySizeLimit ? ' [Truncated at 1.5MB safety limit]' : ''} | Content-Encoding: ${metrics.compressionType || 'none detected'}`,
    affectedTarget: 'HTTP Response Header: Content-Encoding',
    whyItMatters:
      'Text compression reduces HTML, CSS, and JS wire transfer size by 65–80% over mobile cellular connections.',
    businessImpact: 'Lowers bandwidth usage and speeds up document download time.',
    fixOwner: 'Backend / DevOps',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Verify `Content-Encoding: br` or `gzip` in HTTP response headers.',
    dataType: 'HTML/static checks',
    actionHorizon: !htmlAvailable ? 'Monitor' : compressionPass ? 'Monitor' : 'Fix This Week'
  });

  // 18. CHK-PRF-05: Render-Blocking <head> Scripts
  const noRenderBlockingScripts = htmlAvailable && metrics.renderBlockingScriptsCount === 0;
  checks.push({
    id: 'chk-prf-05',
    checkId: 'CHK-PRF-05',
    title: !htmlAvailable
      ? 'Render-Blocking `<head>` Scripts Check'
      : noRenderBlockingScripts
      ? 'Zero Synchronous Render-Blocking Scripts in `<head>`'
      : `${metrics.renderBlockingScriptsCount} Synchronous Render-Blocking Script(s) in \`<head>\``,
    titleUr: noRenderBlockingScripts
      ? 'ہیڈ میں کوئی رینڈر بلاکنگ اسکرپٹ نہیں ملا'
      : `ہیڈ میں ${metrics.renderBlockingScriptsCount} رینڈر بلاکنگ اسکرپٹس موجود ہیں`,
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : noRenderBlockingScripts
      ? 'All external `<script>` tags in `<head>` use `defer`, `async`, or `type="module"`.'
      : 'External `<script src="...">` tags in `<head>` without `defer` or `async` halt HTML parsing until downloaded and executed.',
    category: 'Performance',
    priority: !htmlAvailable ? 'low' : noRenderBlockingScripts ? 'passed' : 'high',
    passed: noRenderBlockingScripts,
    impact: 'High',
    effort: '1–2 hours',
    suggestedFix:
      'Add `defer` or `async` attributes to external `<script src="...">` tags in `<head>`, or relocate non-critical third-party trackers to load after hydration.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `Total executable <script> tags: ${metrics.scriptsCount} | Render-blocking <head> scripts: ${metrics.renderBlockingScriptsCount}`,
    affectedTarget: '<head> > script[src]:not([defer]):not([async]):not([type="module"])',
    whyItMatters:
      'Synchronous `<head>` scripts pause the browser HTML parser and delay First Contentful Paint.',
    businessImpact: 'Speeds up initial visual rendering and reduces main-thread blocking.',
    fixOwner: 'Frontend Engineer',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Inspect `<head>` and confirm every `<script src>` includes `defer`, `async`, or `type="module"`.',
    dataType: 'HTML/static checks',
    actionHorizon: !htmlAvailable ? 'Monitor' : noRenderBlockingScripts ? 'Monitor' : 'Fix Today'
  });

  // 19. CHK-PRF-06: Modern Image Formats (WebP / AVIF)
  const modernImagesPass = htmlAvailable && metrics.legacyFormatImagesCount === 0;
  checks.push({
    id: 'chk-prf-06',
    checkId: 'CHK-PRF-06',
    title: !htmlAvailable
      ? 'Next-Gen Image Format (`WebP` / `AVIF`) Check'
      : modernImagesPass
      ? `All Inspected Images Use Modern Formats (${metrics.imagesCount} images)`
      : `${metrics.legacyFormatImagesCount} Image(s) Served in Legacy PNG/JPEG Format`,
    titleUr: modernImagesPass
      ? 'تمام تصاویر جدید فارمیٹ (WebP/AVIF/SVG) میں ہیں'
      : `${metrics.legacyFormatImagesCount} تصاویر پرانے PNG/JPG فارمیٹ میں ہیں`,
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : modernImagesPass
      ? 'No unoptimized `.png` or `.jpg`/`.jpeg` `<img>` sources were detected in the HTML.'
      : 'Legacy PNG/JPEG images are significantly heavier than equivalent WebP or AVIF assets.',
    category: 'Performance',
    priority: !htmlAvailable
      ? 'low'
      : modernImagesPass
      ? 'passed'
      : metrics.legacyFormatImagesCount > 4
      ? 'medium'
      : 'low',
    passed: modernImagesPass,
    impact: 'Medium',
    effort: '1–2 hours',
    suggestedFix:
      'Convert raster `.png` and `.jpg` images to `.webp` or `.avif` and add `loading="lazy"` to below-the-fold images.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `Total <img> elements: ${metrics.imagesCount} | Legacy .png/.jpg/.jpeg sources: ${metrics.legacyFormatImagesCount}`,
    affectedTarget: 'Document <img> elements',
    whyItMatters:
      'WebP and AVIF reduce image file weight by 30–60% without noticeable quality loss.',
    businessImpact: 'Accelerates LCP and reduces mobile data consumption.',
    fixOwner: 'Frontend Engineer',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Inspect `<img>` URLs in DevTools Network (Img filter) to confirm `image/webp` or `image/avif` MIME types.',
    dataType: 'HTML/static checks',
    actionHorizon: !htmlAvailable ? 'Monitor' : modernImagesPass ? 'Monitor' : 'Fix This Week'
  });

  // 20. CHK-PRF-07: Explicit Image Dimensions (CLS Prevention)
  const imageDimsPass = htmlAvailable && metrics.imagesMissingDimensions === 0;
  checks.push({
    id: 'chk-prf-07',
    checkId: 'CHK-PRF-07',
    title: !htmlAvailable
      ? 'Image `width` and `height` Attributes Check (CLS Prevention)'
      : imageDimsPass
      ? 'All `<img>` Elements Declare Explicit Dimensions'
      : `${metrics.imagesMissingDimensions} of ${metrics.imagesCount} \`<img>\` Element(s) Missing Explicit \`width\` / \`height\``,
    titleUr: imageDimsPass
      ? 'تمام تصاویر میں چوڑائی اور اونچائی واضح ہے'
      : `${metrics.imagesMissingDimensions} تصاویر میں width اور height ایٹریبیوٹ موجود نہیں ہیں`,
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : imageDimsPass
      ? 'Every inspected `<img>` tag includes explicit `width` and `height` attributes.'
      : 'Images without `width` and `height` attributes (or CSS `aspect-ratio`) can cause layout shifts as they load.',
    category: 'Performance',
    priority: !htmlAvailable ? 'low' : imageDimsPass ? 'passed' : 'medium',
    passed: imageDimsPass,
    impact: 'Medium',
    effort: '1 hour',
    suggestedFix:
      'Add explicit `width` and `height` HTML attributes or CSS `aspect-ratio` containers to all `<img>` tags.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `Total <img> tags: ${metrics.imagesCount} | Missing width/height attributes: ${metrics.imagesMissingDimensions}`,
    affectedTarget: 'Document <img> elements',
    whyItMatters:
      'Browsers use `width` and `height` attributes to calculate aspect ratio and reserve space before the image downloads.',
    businessImpact: 'Prevents unexpected Cumulative Layout Shift (CLS) jumps while users read or tap buttons.',
    fixOwner: 'Frontend Engineer',
    confidence: htmlAvailable ? 'Likely' : 'Data unavailable',
    verificationStep: 'Check `<img>` elements in HTML to confirm `width` and `height` attributes are present.',
    dataType: 'HTML/static checks',
    actionHorizon: !htmlAvailable ? 'Monitor' : imageDimsPass ? 'Monitor' : 'Fix This Week'
  });

  // ============================================================================
  // CATEGORY 4: ACCESSIBILITY (6 Checks)
  // ============================================================================

  // 21. CHK-A11Y-01: Image Alt Attributes
  const altPass = htmlAvailable && metrics.imagesMissingAlt === 0;
  checks.push({
    id: 'chk-a11y-01',
    checkId: 'CHK-A11Y-01',
    title: !htmlAvailable
      ? 'Image Alternative Text (`alt` Attribute) Check'
      : altPass
      ? `All ${metrics.imagesCount} Image(s) Include \`alt\` Attributes`
      : `${metrics.imagesMissingAlt} of ${metrics.imagesCount} Image(s) Missing \`alt\` Attributes`,
    titleUr: altPass
      ? 'تمام تصاویر میں alt ٹیکسٹ موجود ہے'
      : `${metrics.imagesMissingAlt} تصاویر میں alt ٹیکسٹ موجود نہیں ہے`,
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : altPass
      ? 'Every `<img>` element in the extracted HTML has an `alt` attribute.'
      : 'Screen readers cannot interpret images lacking `alt` attributes, reading raw filenames instead. Automated accessibility checks identify potential barriers but do not replace manual testing or legal advice.',
    category: 'Accessibility',
    priority: !htmlAvailable
      ? 'low'
      : altPass
      ? 'passed'
      : metrics.imagesMissingAlt > 3
      ? 'high'
      : 'medium',
    passed: altPass,
    impact: 'Medium',
    effort: '45 mins',
    suggestedFix:
      'Add descriptive `alt="..."` attributes to informative images and `alt=""` (empty string) to purely decorative images.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `Total <img> elements: ${metrics.imagesCount} | Missing alt attribute: ${metrics.imagesMissingAlt}`,
    affectedTarget: 'Document <img> elements without [alt]',
    whyItMatters:
      'WCAG 2.1 Success Criterion 1.1.1 requires non-text content to provide a text alternative for screen reader users.',
    businessImpact: 'Improves assistive usability and Google Images contextual understanding.',
    fixOwner: 'Frontend Engineer',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Run `document.querySelectorAll("img:not([alt])")` in DevTools console and confirm `0` matches.',
    dataType: 'HTML/static checks',
    actionHorizon: !htmlAvailable ? 'Monitor' : altPass ? 'Monitor' : 'Fix Today'
  });

  // 22. CHK-A11Y-02: Document Language (<html lang>)
  const langPass = htmlAvailable && Boolean(metrics.langAttribute && metrics.langAttribute.trim().length >= 2);
  checks.push({
    id: 'chk-a11y-02',
    checkId: 'CHK-A11Y-02',
    title: !htmlAvailable
      ? 'Document `<html lang>` Attribute Check'
      : langPass
      ? `Valid \`<html lang="${metrics.langAttribute}">\` Declared`
      : 'Missing `lang` Attribute on `<html>` Element',
    titleUr: langPass
      ? `ایچ ٹی ایم ایل زبان کا ایٹریبیوٹ (${metrics.langAttribute}) موجود ہے`
      : 'ایچ ٹی ایم ایل ٹیگ میں lang ایٹریبیوٹ موجود نہیں ہے',
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : langPass
      ? 'The root `<html>` tag specifies a valid primary language code.'
      : 'Screen readers require a `lang` attribute on `<html>` to select the correct voice pronunciation profile.',
    category: 'Accessibility',
    priority: !htmlAvailable ? 'low' : langPass ? 'passed' : 'high',
    passed: langPass,
    impact: 'Medium',
    effort: '5 mins',
    suggestedFix: 'Add `lang="en"` (or `lang="ur"` for Urdu pages) to the root `<html>` tag.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : metrics.langAttribute
      ? `<html lang="${metrics.langAttribute}">`
      : 'No lang attribute found on <html> tag.',
    affectedTarget: '<html> root element',
    whyItMatters:
      'WCAG 2.1 Success Criterion 3.1.1 requires the default human language of each web page to be programmatically determined.',
    businessImpact: 'Ensures accurate screen-reader pronunciation and browser translation handling.',
    fixOwner: 'Frontend Engineer',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Inspect the opening `<html lang="...">` tag in page source.',
    dataType: 'HTML/static checks',
    actionHorizon: !htmlAvailable ? 'Monitor' : langPass ? 'Monitor' : 'Fix Today'
  });

  // 23. CHK-A11Y-03: Mobile Viewport & Pinch-to-Zoom Accessibility
  const viewportPass = htmlAvailable && metrics.hasViewport && !metrics.disablesZoom;
  checks.push({
    id: 'chk-a11y-03',
    checkId: 'CHK-A11Y-03',
    title: !htmlAvailable
      ? 'Mobile Viewport & Text Zoom Scaling Check'
      : !metrics.hasViewport
      ? 'Missing `<meta name="viewport">` Tag'
      : metrics.disablesZoom
      ? 'Viewport Meta Tag Blocks Pinch-to-Zoom (`user-scalable=no` or `maximum-scale=1`)'
      : 'Responsive Viewport Allows Pinch-to-Zoom Scaling',
    titleUr: viewportPass
      ? 'موبائل ویوپورٹ اور زوم کی سہولت درست ہے'
      : 'موبائل ویوپورٹ غائب ہے یا زوم کرنے پر پابندی لگی ہوئی ہے',
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : viewportPass
      ? 'Responsive viewport is configured without restricting user zoom.'
      : 'Missing viewport or disabling user zoom prevents low-vision users from magnifying text up to 200%.',
    category: 'Accessibility',
    priority: !htmlAvailable
      ? 'low'
      : !metrics.hasViewport
      ? 'critical'
      : metrics.disablesZoom
      ? 'high'
      : 'passed',
    passed: viewportPass,
    impact: 'High',
    effort: '10 mins',
    suggestedFix:
      'Use `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` and remove `user-scalable=no` or `maximum-scale=1`.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : metrics.hasViewport
      ? `<meta name="viewport" content="${metrics.viewportContent || 'width=device-width, initial-scale=1'}"> | Blocks Zoom: ${metrics.disablesZoom ? 'Yes' : 'No'}`
      : 'No <meta name="viewport"> tag found.',
    affectedTarget: '<head> > meta[name="viewport"]',
    whyItMatters:
      'WCAG 2.1 Success Criterion 1.4.4 (Resize Text) requires pages to allow at least 200% zoom without assistive technology.',
    businessImpact: 'Prevents mobile layout breakage and supports low-vision users.',
    fixOwner: 'Frontend Engineer',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Confirm `<meta name="viewport">` does not contain `user-scalable=no` or `maximum-scale=1`.',
    dataType: 'HTML/static checks',
    actionHorizon: !htmlAvailable ? 'Monitor' : viewportPass ? 'Monitor' : 'Fix Today'
  });

  // 24. CHK-A11Y-04: Semantic HTML5 Landmark Regions
  const landmarksOk =
    htmlAvailable && metrics.landmarks.main && (metrics.landmarks.nav || metrics.landmarks.header);
  checks.push({
    id: 'chk-a11y-04',
    checkId: 'CHK-A11Y-04',
    title: !htmlAvailable
      ? 'Semantic HTML5 Landmarks (`<main>`, `<nav>`, `<header>`, `<footer>`)'
      : landmarksOk
      ? 'Semantic HTML5 Landmark Regions Present'
      : 'Missing Primary Semantic Landmarks (`<main>` or `<nav>`)',
    titleUr: landmarksOk
      ? 'سیمینٹک ایچ ٹی ایم ایل لینڈ مارکس موجود ہیں'
      : 'صفحے میں <main> یا <nav> لینڈ مارکس کی کمی ہے',
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : landmarksOk
      ? 'Document includes semantic landmark regions for screen reader rotor navigation.'
      : 'Screen reader users rely on `<main>`, `<header>`, `<nav>`, and `<footer>` landmarks to jump directly to primary content.',
    category: 'Accessibility',
    priority: !htmlAvailable ? 'low' : landmarksOk ? 'passed' : 'medium',
    passed: landmarksOk,
    impact: 'Medium',
    effort: '30 mins',
    suggestedFix:
      'Wrap primary page content in a single `<main id="main-content">` element and navigation links in `<nav aria-label="Main">`.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `<main>: ${metrics.landmarks.main ? 'Yes' : 'No'} | <nav>: ${metrics.landmarks.nav ? 'Yes' : 'No'} | <header>: ${metrics.landmarks.header ? 'Yes' : 'No'} | <footer>: ${metrics.landmarks.footer ? 'Yes' : 'No'}`,
    affectedTarget: 'Document <body> semantic landmarks',
    whyItMatters:
      'Landmarks allow keyboard and screen reader users to bypass repetitive navigation blocks.',
    businessImpact: 'Improves assistive navigation speed and semantic structure.',
    fixOwner: 'Frontend Engineer',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Verify `<main>`, `<header>`, `<nav>`, and `<footer>` tags exist in rendered DOM.',
    dataType: 'HTML/static checks',
    actionHorizon: !htmlAvailable ? 'Monitor' : landmarksOk ? 'Monitor' : 'Fix This Week'
  });

  // 25. CHK-A11Y-05: Accessible Form Controls & Buttons
  const controlsPass =
    htmlAvailable && metrics.unlabeledInputsCount === 0 && metrics.unlabeledButtonsCount === 0;
  checks.push({
    id: 'chk-a11y-05',
    checkId: 'CHK-A11Y-05',
    title: !htmlAvailable
      ? 'Form Controls & Interactive Button Labels Check'
      : controlsPass
      ? 'All Inspected Inputs and Buttons Have Accessible Labels'
      : `${metrics.unlabeledInputsCount} Input(s) and ${metrics.unlabeledButtonsCount} Button(s) Lack Explicit Labels`,
    titleUr: controlsPass
      ? 'تمام فارم ان پٹ اور بٹنوں کے لیبل موجود ہیں'
      : 'کچھ بٹنوں یا فارم ان پٹ میں واضح لیبل (aria-label) موجود نہیں ہیں',
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : controlsPass
      ? 'No unlabeled icon-only buttons or orphaned form inputs were detected in static HTML.'
      : 'Icon-only buttons without `aria-label` or inputs without `<label>`/`aria-label` are announced as "unlabelled button" by screen readers.',
    category: 'Accessibility',
    priority: !htmlAvailable ? 'low' : controlsPass ? 'passed' : 'high',
    passed: controlsPass,
    impact: 'Medium',
    effort: '45 mins',
    suggestedFix:
      'Add explicit `<label for="...">` or `aria-label="..."` attributes to every form input and icon-only button.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `Unlabeled form inputs: ${metrics.unlabeledInputsCount} | Unlabeled buttons: ${metrics.unlabeledButtonsCount}`,
    affectedTarget: 'Document <input>, <select>, <textarea>, and <button> elements',
    whyItMatters:
      'WCAG 2.1 Success Criterion 4.1.2 (Name, Role, Value) requires all interactive UI components to have a programmatically determinable name.',
    businessImpact: 'Prevents form completion barriers for keyboard and assistive-tech users.',
    fixOwner: 'Frontend Engineer',
    confidence: htmlAvailable ? 'Likely' : 'Data unavailable',
    verificationStep: 'Inspect all `<button>` and `<input>` elements in Chrome Accessibility Tree panel.',
    dataType: 'HTML/static checks',
    actionHorizon: !htmlAvailable ? 'Monitor' : controlsPass ? 'Monitor' : 'Fix This Week'
  });

  // 26. CHK-A11Y-06: Manual Keyboard Navigation & Screen Reader Audit
  checks.push({
    id: 'chk-a11y-06',
    checkId: 'CHK-A11Y-06',
    title: 'Interactive Keyboard Focus Order, Modals & Screen Reader Walkthrough',
    titleUr: 'کی بورڈ فوکس آرڈر اور اسکرین ریڈر کی دستی جانچ',
    description:
      'Automated accessibility checks identify potential barriers but do not replace manual testing or legal advice. Interactive focus traps, modal dialogs, and dynamic ARIA states require live human verification.',
    category: 'Accessibility',
    priority: 'low',
    passed: false,
    impact: 'Medium',
    effort: '30 mins',
    suggestedFix:
      'Press `Tab` and `Shift+Tab` through the entire page to verify visible `:focus-visible` rings, no keyboard traps in modals/dropdowns, and logical reading order with NVDA or VoiceOver.',
    evidence:
      'Automated static HTML inspection covers ~35% of WCAG criteria. Live keyboard focus rings, dynamic ARIA live regions, and screen-reader announcements require manual walkthrough.',
    affectedTarget: 'Interactive navigation, modals, accordions, and forms',
    whyItMatters:
      'Automated accessibility checks identify potential barriers but do not replace manual testing or legal advice.',
    businessImpact: 'Ensures keyboard-only and assistive technology users can complete core conversion journeys.',
    fixOwner: 'Frontend Engineer',
    confidence: 'Manual review required',
    verificationStep: 'Navigate from the address bar to the primary CTA and form submit button using only `Tab`, `Enter`, and `Escape`.',
    dataType: 'Manual review items',
    actionHorizon: 'Monitor'
  });

  // ============================================================================
  // CATEGORY 5: SECURITY AND TRUST (6 Checks)
  // ============================================================================

  // 27. CHK-SEC-01: HTTPS Transport Encryption
  checks.push({
    id: 'chk-sec-01',
    checkId: 'CHK-SEC-01',
    title: metrics.hasHttps
      ? 'HTTPS / TLS Encrypted Transport Active'
      : 'Insecure HTTP Protocol (Unencrypted Connection)',
    titleUr: metrics.hasHttps
      ? 'ایچ ٹی ٹی پی ایس (HTTPS) محفوظ کنکشن فعال ہے'
      : 'غیر محفوظ HTTP کنکشن استعمال ہو رہا ہے',
    description: metrics.hasHttps
      ? 'Connection is served over encrypted HTTPS.'
      : 'Page is served over unencrypted HTTP, triggering browser "Not Secure" warnings and exposing form submissions.',
    category: 'Security',
    priority: metrics.hasHttps ? 'passed' : 'critical',
    passed: metrics.hasHttps,
    impact: 'High',
    effort: '1 hour',
    suggestedFix:
      'Provision a TLS 1.3 certificate and enforce a permanent HTTP 301 redirect from `http://` to `https://`.',
    evidence: `Final URL Protocol: ${metrics.hasHttps ? 'https:' : 'http:'} (${metrics.finalUrl || targetUrl})`,
    affectedTarget: metrics.finalUrl || targetUrl,
    whyItMatters:
      'HTTPS is a confirmed Google ranking signal and mandatory for browser trust and payment/form security.',
    businessImpact: 'Eliminates browser "Not Secure" warnings that cause immediate visitor drop-off.',
    fixOwner: 'Backend / DevOps',
    confidence: 'Confirmed',
    verificationStep: 'Request `http://` version of the domain and verify it 301 redirects to `https://`.',
    dataType: 'HTML/static checks',
    actionHorizon: metrics.hasHttps ? 'Monitor' : 'Fix Today'
  });

  // 28. CHK-SEC-02: HTTP Strict-Transport-Security (HSTS)
  const hstsUnknown = metrics.statusCode === 0;
  checks.push({
    id: 'chk-sec-02',
    checkId: 'CHK-SEC-02',
    title: hstsUnknown
      ? 'Strict-Transport-Security (HSTS) Header Check'
      : metrics.hasHsts
      ? 'Strict-Transport-Security (HSTS) Header Enabled'
      : 'Missing `Strict-Transport-Security` (HSTS) Header',
    titleUr: metrics.hasHsts
      ? 'ایچ ایس ٹی ایس (HSTS) سیکیورٹی ہیڈر فعال ہے'
      : 'Strict-Transport-Security (HSTS) ہیڈر غائب ہے',
    description: hstsUnknown
      ? UNAVAILABLE_EVIDENCE_TEXT
      : metrics.hasHsts
      ? 'Server sends `Strict-Transport-Security` to enforce HTTPS connections.'
      : 'Without HSTS, browsers on untrusted Wi-Fi networks can be downgraded to HTTP on the first request.',
    category: 'Security',
    priority: hstsUnknown ? 'low' : metrics.hasHsts ? 'passed' : 'medium',
    passed: !hstsUnknown && metrics.hasHsts,
    impact: 'Medium',
    effort: '15 mins',
    suggestedFix:
      'Add response header: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`.',
    evidence: hstsUnknown
      ? UNAVAILABLE_EVIDENCE_TEXT
      : metrics.hasHsts
      ? `Strict-Transport-Security: ${metrics.hstsValue || 'present'}`
      : 'Header "strict-transport-security" was not present in HTTP response.',
    affectedTarget: 'HTTP Response Header: Strict-Transport-Security',
    whyItMatters:
      'HSTS instructs browsers to only connect via HTTPS, preventing SSL-stripping attacks.',
    businessImpact: 'Hardens transport security and enterprise security posture.',
    fixOwner: 'Backend / DevOps',
    confidence: hstsUnknown ? 'Data unavailable' : 'Confirmed',
    verificationStep: 'Run `curl -I https://yourdomain.com` and verify `strict-transport-security` header.',
    dataType: 'HTML/static checks',
    actionHorizon: hstsUnknown ? 'Monitor' : metrics.hasHsts ? 'Monitor' : 'Fix This Week'
  });

  // 29. CHK-SEC-03: Content-Security-Policy (CSP)
  checks.push({
    id: 'chk-sec-03',
    checkId: 'CHK-SEC-03',
    title: hstsUnknown
      ? 'Content-Security-Policy (CSP) Header Check'
      : metrics.hasCsp
      ? 'Content-Security-Policy (CSP) Header Present'
      : 'Missing `Content-Security-Policy` (CSP) Header',
    titleUr: metrics.hasCsp
      ? 'Content-Security-Policy (CSP) ہیڈر موجود ہے'
      : 'Content-Security-Policy (CSP) ہیڈر غائب ہے',
    description: hstsUnknown
      ? UNAVAILABLE_EVIDENCE_TEXT
      : metrics.hasCsp
      ? 'A `Content-Security-Policy` response header restricts unauthorized script execution.'
      : 'No `Content-Security-Policy` HTTP header was detected, increasing exposure to Cross-Site Scripting (XSS) and third-party script skimming.',
    category: 'Security',
    priority: hstsUnknown ? 'low' : metrics.hasCsp ? 'passed' : 'high',
    passed: !hstsUnknown && metrics.hasCsp,
    impact: 'High',
    effort: '2 hours',
    suggestedFix:
      "Configure a `Content-Security-Policy` header whitelisting trusted script, style, image, and connect origins (`default-src 'self'; object-src 'none'; base-uri 'self'`).",
    evidence: hstsUnknown
      ? UNAVAILABLE_EVIDENCE_TEXT
      : metrics.hasCsp
      ? `Content-Security-Policy: ${(metrics.cspValue || 'present').slice(0, 140)}${(metrics.cspValue || '').length > 140 ? '...' : ''}`
      : 'Header "content-security-policy" was not present in HTTP response.',
    affectedTarget: 'HTTP Response Header: Content-Security-Policy',
    whyItMatters:
      'CSP is the primary browser defense against Cross-Site Scripting (XSS) and malicious script injection.',
    businessImpact: 'Protects customer forms and passes enterprise B2B vendor security questionnaires.',
    fixOwner: 'Backend / DevOps',
    confidence: hstsUnknown ? 'Data unavailable' : 'Confirmed',
    verificationStep: 'Check response headers in DevTools Network tab for `content-security-policy`.',
    dataType: 'HTML/static checks',
    actionHorizon: hstsUnknown ? 'Monitor' : metrics.hasCsp ? 'Monitor' : 'Fix This Week'
  });

  // 30. CHK-SEC-04: Clickjacking Protection (X-Frame-Options / frame-ancestors)
  const hasFrameProtection =
    !hstsUnknown &&
    (metrics.hasXFrame || Boolean(metrics.cspValue && metrics.cspValue.includes('frame-ancestors')));
  checks.push({
    id: 'chk-sec-04',
    checkId: 'CHK-SEC-04',
    title: hstsUnknown
      ? 'Clickjacking Defense (`X-Frame-Options` / `frame-ancestors`)'
      : hasFrameProtection
      ? 'Clickjacking Protection Active (`X-Frame-Options` / CSP `frame-ancestors`)'
      : 'Missing Clickjacking Defense (`X-Frame-Options` Header)',
    titleUr: hasFrameProtection
      ? 'کلک جیکنگ سیکیورٹی ہیڈر فعال ہے'
      : 'X-Frame-Options کلک جیکنگ ہیڈر غائب ہے',
    description: hstsUnknown
      ? UNAVAILABLE_EVIDENCE_TEXT
      : hasFrameProtection
      ? 'Page prevents unauthorized third-party iframe embedding.'
      : 'Without `X-Frame-Options: SAMEORIGIN` or CSP `frame-ancestors`, malicious sites can embed your page in an invisible iframe.',
    category: 'Security',
    priority: hstsUnknown ? 'low' : hasFrameProtection ? 'passed' : 'medium',
    passed: hasFrameProtection,
    impact: 'Medium',
    effort: '15 mins',
    suggestedFix:
      'Add `X-Frame-Options: SAMEORIGIN` (or `DENY`) and include `frame-ancestors \'self\'` in your Content-Security-Policy.',
    evidence: hstsUnknown
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `X-Frame-Options: ${metrics.xFrameValue || 'none'} | CSP frame-ancestors: ${metrics.cspValue?.includes('frame-ancestors') ? 'present' : 'none'}`,
    affectedTarget: 'HTTP Response Header: X-Frame-Options',
    whyItMatters: 'Prevents UI redressing and clickjacking attacks against interactive buttons and forms.',
    businessImpact: 'Protects user sessions and strengthens security audit scores.',
    fixOwner: 'Backend / DevOps',
    confidence: hstsUnknown ? 'Data unavailable' : 'Confirmed',
    verificationStep: 'Verify `X-Frame-Options: SAMEORIGIN` in HTTP response headers.',
    dataType: 'HTML/static checks',
    actionHorizon: hstsUnknown ? 'Monitor' : hasFrameProtection ? 'Monitor' : 'Fix This Week'
  });

  // 31. CHK-SEC-05: MIME-Sniffing & Referrer Policy Headers
  const mimeAndReferrerPass = !hstsUnknown && metrics.hasContentTypeOptions && metrics.hasReferrerPolicy;
  checks.push({
    id: 'chk-sec-05',
    checkId: 'CHK-SEC-05',
    title: hstsUnknown
      ? 'MIME-Sniffing (`X-Content-Type-Options`) & `Referrer-Policy` Check'
      : mimeAndReferrerPass
      ? '`X-Content-Type-Options: nosniff` & `Referrer-Policy` Verified'
      : 'Missing `X-Content-Type-Options` or `Referrer-Policy` Header',
    titleUr: mimeAndReferrerPass
      ? 'X-Content-Type-Options اور Referrer-Policy ہیڈرز درست ہیں'
      : 'X-Content-Type-Options یا Referrer-Policy ہیڈر غائب ہے',
    description: hstsUnknown
      ? UNAVAILABLE_EVIDENCE_TEXT
      : mimeAndReferrerPass
      ? 'Both `X-Content-Type-Options` and `Referrer-Policy` headers are configured.'
      : 'Missing baseline hardening headers for MIME-sniffing prevention and outbound referrer privacy.',
    category: 'Security',
    priority: hstsUnknown ? 'low' : mimeAndReferrerPass ? 'passed' : 'low',
    passed: mimeAndReferrerPass,
    impact: 'Low',
    effort: '15 mins',
    suggestedFix:
      'Set `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin` on all responses.',
    evidence: hstsUnknown
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `X-Content-Type-Options: ${metrics.hasContentTypeOptions ? 'nosniff' : 'missing'} | Referrer-Policy: ${metrics.referrerPolicyValue || 'missing'}`,
    affectedTarget: 'HTTP Response Headers',
    whyItMatters:
      'Prevents browsers from executing disguised uploads as scripts and protects sensitive URL query parameters from leaking to external sites.',
    businessImpact: 'Completes baseline security header hygiene.',
    fixOwner: 'Backend / DevOps',
    confidence: hstsUnknown ? 'Data unavailable' : 'Confirmed',
    verificationStep: 'Inspect HTTP headers for `x-content-type-options` and `referrer-policy`.',
    dataType: 'HTML/static checks',
    actionHorizon: 'Monitor'
  });

  // 32. CHK-SEC-06: Mixed Content & Unsafe External Links
  const cleanSubresources =
    htmlAvailable && metrics.mixedContentCount === 0 && metrics.unsafeBlankLinksCount === 0;
  checks.push({
    id: 'chk-sec-06',
    checkId: 'CHK-SEC-06',
    title: !htmlAvailable
      ? 'Mixed HTTP Subresources & External Link Safety Check'
      : cleanSubresources
      ? 'Zero Mixed-Content Assets or Unsafe `target="_blank"` Links'
      : `${metrics.mixedContentCount} Mixed HTTP Asset(s) & ${metrics.unsafeBlankLinksCount} Link(s) Missing \`rel="noopener"\``,
    titleUr: cleanSubresources
      ? 'کوئی مکسڈ کنٹینٹ یا غیر محفوظ ایکسٹرنل لنک نہیں ملا'
      : 'مکسڈ HTTP اثاثے یا غیر محفوظ target="_blank" لنکس موجود ہیں',
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : cleanSubresources
      ? 'No insecure `http://` subresources or unsafe `target="_blank"` links were found.'
      : 'Loading `http://` images/scripts on an HTTPS page triggers mixed-content blocking, and external `target="_blank"` links should include `rel="noopener noreferrer"`.',
    category: 'Security',
    priority: !htmlAvailable
      ? 'low'
      : cleanSubresources
      ? 'passed'
      : metrics.mixedContentCount > 0
      ? 'high'
      : 'low',
    passed: cleanSubresources,
    impact: metrics.mixedContentCount > 0 ? 'High' : 'Low',
    effort: '30 mins',
    suggestedFix:
      'Update all `http://` asset URLs to `https://` and add `rel="noopener noreferrer"` to external `target="_blank"` links.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `Insecure http:// subresources: ${metrics.mixedContentCount} | External target="_blank" without rel="noopener": ${metrics.unsafeBlankLinksCount}`,
    affectedTarget: 'Document <img>, <script>, <link>, and <a target="_blank"> elements',
    whyItMatters:
      'Browsers block mixed active content and degrade the HTTPS padlock when insecure subresources are embedded.',
    businessImpact: 'Prevents broken assets and reverse-tabnabbing vulnerabilities.',
    fixOwner: 'Frontend Engineer',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Search page source for `src="http://"` and `target="_blank"`.',
    dataType: 'HTML/static checks',
    actionHorizon: !htmlAvailable
      ? 'Monitor'
      : cleanSubresources
      ? 'Monitor'
      : metrics.mixedContentCount > 0
      ? 'Fix Today'
      : 'Monitor'
  });

  // ============================================================================
  // CATEGORY 6: CONVERSION READINESS (6 Checks)
  // ============================================================================

  // 33. CHK-CNV-01: Primary Call-to-Action (CTA) Presence & Action Clarity
  const ctaPass = htmlAvailable && metrics.ctaElementsCount >= 1;
  checks.push({
    id: 'chk-cnv-01',
    checkId: 'CHK-CNV-01',
    title: !htmlAvailable
      ? 'Primary Call-to-Action (CTA) Presence & Clarity Check'
      : ctaPass
      ? `Clear Action-Oriented CTAs Detected (${metrics.ctaElementsCount} found)`
      : 'No Clear Action-Oriented Call-to-Action (CTA) Detected in HTML',
    titleUr: ctaPass
      ? `واضح کال ٹو ایکشن (CTA) بٹن موجود ہیں (${metrics.ctaElementsCount})`
      : 'صفحے پر واضح کال ٹو ایکشن (CTA) بٹن نظر نہیں آیا',
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : ctaPass
      ? 'Action-oriented CTA buttons or links were found in the document.'
      : 'Visitors landing on the page have no obvious next step (e.g., Book a Call, Get a Quote, Start Trial, Contact Us).',
    category: 'Conversion',
    priority: !htmlAvailable ? 'low' : ctaPass ? 'passed' : 'critical',
    passed: ctaPass,
    impact: 'High',
    effort: '1–2 hours',
    suggestedFix:
      'Add a high-contrast, specific primary CTA above the fold and at the bottom of the page (e.g., "Request a Free Audit", "Book a 15-Min Discovery Call", or "Get Instant Quote").',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : ctaPass
      ? `CTA elements matched: ${metrics.ctaElementsCount} | Samples: "${metrics.detectedCtaSamples.slice(0, 4).join('", "')}"`
      : '0 buttons or links matched high-intent conversion verbs in extracted HTML.',
    affectedTarget: 'Above-the-fold hero & primary CTA buttons',
    whyItMatters:
      'Every high-converting landing page guides the visitor toward one unambiguous primary action.',
    businessImpact: 'Directly increases visitor-to-lead conversion rate.',
    fixOwner: 'CRO / Product Designer',
    confidence: htmlAvailable ? 'Likely' : 'Data unavailable',
    verificationStep: 'Open the page on mobile and desktop and verify the primary CTA is immediately visible without scrolling.',
    dataType: 'Heuristic conversion checks',
    actionHorizon: !htmlAvailable ? 'Monitor' : ctaPass ? 'Monitor' : 'Fix Today'
  });

  // 34. CHK-CNV-02: Direct Contact & Frictionless Reachability
  const contactPass = htmlAvailable && metrics.hasDirectContactLink;
  checks.push({
    id: 'chk-cnv-02',
    checkId: 'CHK-CNV-02',
    title: !htmlAvailable
      ? 'Direct Contact & Reachability Channels (`tel:`, `mailto:`, WhatsApp, `/contact`)'
      : contactPass
      ? `Frictionless Contact Channels Available (${metrics.contactMethodsDetected.join(', ')})`
      : 'No Clickable Contact Link (`tel:`, `mailto:`, WhatsApp, or `/contact`) Detected',
    titleUr: contactPass
      ? `فوری رابطے کے ذرائع موجود ہیں (${metrics.contactMethodsDetected.join(', ')})`
      : 'فوری رابطے کا کوئی کلک ایبل لنک (فون، ای میل، واٹس ایپ، یا رابطہ پیج) نہیں ملا',
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : contactPass
      ? 'Visitors have direct one-click channels to reach your team.'
      : 'High-intent buyers who prefer immediate phone, email, or WhatsApp contact have no clickable path on this page.',
    category: 'Conversion',
    priority: !htmlAvailable ? 'low' : contactPass ? 'passed' : 'high',
    passed: contactPass,
    impact: 'High',
    effort: '30 mins',
    suggestedFix:
      'Include a visible `/contact` link in the header/footer and clickable `tel:`, `mailto:`, or WhatsApp links for mobile visitors.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : contactPass
      ? `Detected contact channels: ${metrics.contactMethodsDetected.join(', ')}`
      : 'No href="tel:", href="mailto:", wa.me, or /contact links found in HTML.',
    affectedTarget: 'Header, Footer & Contact CTA links',
    whyItMatters:
      'B2B and service buyers evaluate responsiveness and legitimacy by how easily they can contact a real human.',
    businessImpact: 'Captures high-intent mobile leads who prefer calling or messaging directly.',
    fixOwner: 'CRO / Product Designer',
    confidence: htmlAvailable ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Click phone, email, and contact links on a mobile device to verify they open the native dialer/mail/contact form.',
    dataType: 'Heuristic conversion checks',
    actionHorizon: !htmlAvailable ? 'Monitor' : contactPass ? 'Monitor' : 'Fix Today'
  });

  // 35. CHK-CNV-03: Lead Capture Form Friction & Field Count
  const formFrictionHigh = htmlAvailable && metrics.maxFormInputsCount > 6;
  const formPass = htmlAvailable && !formFrictionHigh;
  checks.push({
    id: 'chk-cnv-03',
    checkId: 'CHK-CNV-03',
    title: !htmlAvailable
      ? 'Lead Form Friction & Input Field Count Check'
      : formFrictionHigh
      ? `High Form Friction (${metrics.maxFormInputsCount} inputs in a single form; target ≤ 5)`
      : metrics.formsCount > 0
      ? `Low-Friction Form Architecture (${metrics.formsCount} form(s), max ${metrics.maxFormInputsCount} inputs)`
      : 'No Overloaded Multi-Field Forms Detected on This URL',
    titleUr: formPass
      ? 'لیڈ فارم سادہ اور کم فیلڈز پر مشتمل ہے'
      : `فارم میں فیلڈز کی تعداد زیادہ ہے (${metrics.maxFormInputsCount} فیلڈز)`,
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : formFrictionHigh
      ? 'Forms with more than 6 visible fields on initial view suffer significantly higher abandonment on mobile devices.'
      : 'Forms on this page avoid excessive upfront input friction.',
    category: 'Conversion',
    priority: !htmlAvailable ? 'low' : formPass ? 'passed' : 'medium',
    passed: formPass,
    impact: 'Medium',
    effort: '1–2 hours',
    suggestedFix:
      'Reduce initial lead capture forms to 3–4 essential fields (Name, Work Email/WhatsApp, Project Goal) or use progressive 2-step disclosure.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `Total <form> elements: ${metrics.formsCount} | Maximum visible inputs in a single form: ${metrics.maxFormInputsCount}`,
    affectedTarget: 'Document <form> elements',
    whyItMatters:
      'Every unnecessary required field increases cognitive load and form abandonment on mobile keyboards.',
    businessImpact: 'Increases form completion rates without sacrificing lead qualification.',
    fixOwner: 'CRO / Product Designer',
    confidence: htmlAvailable ? 'Likely' : 'Data unavailable',
    verificationStep: 'Count required fields on your primary lead form and test completion in under 30 seconds on mobile.',
    dataType: 'Heuristic conversion checks',
    actionHorizon: !htmlAvailable ? 'Monitor' : formPass ? 'Monitor' : 'Fix This Week'
  });

  // 36. CHK-CNV-04: Trust, Proof & Policy Architecture
  const trustPass = htmlAvailable && metrics.trustSignalsDetected.length >= 2;
  checks.push({
    id: 'chk-cnv-04',
    checkId: 'CHK-CNV-04',
    title: !htmlAvailable
      ? 'Trust Signals, Case Studies & Privacy Policy Presence'
      : trustPass
      ? `Verifiable Trust Architecture Present (${metrics.trustSignalsDetected.join(', ')})`
      : `Limited On-Page Trust Signals Detected (${metrics.trustSignalsDetected.length} found; target ≥ 2)`,
    titleUr: trustPass
      ? `اعتماد اور ثبوت کے عناصر موجود ہیں (${metrics.trustSignalsDetected.join(', ')})`
      : 'صفحے پر اعتماد سازی (Case Studies / Testimonials / Privacy Policy) کے عناصر کم ہیں',
    description: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : trustPass
      ? 'Page includes multiple trust indicators (e.g., case studies, testimonials/reviews, privacy/terms links, or about/team proof).'
      : 'First-time visitors look for verifiable proof (case studies, client outcomes, team credentials, and privacy policy) before submitting inquiries.',
    category: 'Conversion',
    priority: !htmlAvailable ? 'low' : trustPass ? 'passed' : 'medium',
    passed: trustPass,
    impact: 'High',
    effort: '2–3 hours',
    suggestedFix:
      'Place verifiable proof (named case studies, concrete before/after outcomes, team credentials, and privacy policy links) adjacent to your primary CTA.',
    evidence: !htmlAvailable
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `Detected trust markers (${metrics.trustSignalsDetected.length}): ${metrics.trustSignalsDetected.join(', ') || 'none detected'}`,
    affectedTarget: 'Page proof sections & footer links',
    whyItMatters:
      'High-ticket B2B and e-commerce buyers require risk-reversal and real-world evidence before converting.',
    businessImpact: 'Reduces buyer hesitation and improves lead quality.',
    fixOwner: 'Content / Legal',
    confidence: htmlAvailable ? 'Likely' : 'Data unavailable',
    verificationStep: 'Verify that a named case study, testimonial, or credential block appears within one scroll of the primary CTA.',
    dataType: 'Heuristic conversion checks',
    actionHorizon: !htmlAvailable ? 'Monitor' : trustPass ? 'Monitor' : 'Fix This Week'
  });

  // 37. CHK-CNV-05: Conversion Speed Friction (TTFB + Render-Blocking Impact on Drop-off)
  const speedConversionPass =
    ttfbKnown && metrics.responseTimeMs <= 1000 && metrics.renderBlockingScriptsCount <= 1;
  checks.push({
    id: 'chk-cnv-05',
    checkId: 'CHK-CNV-05',
    title: !ttfbKnown
      ? 'First-Impression Loading Friction Check'
      : speedConversionPass
      ? 'Low First-Impression Loading Friction for Paid & Organic Traffic'
      : 'Initial Load Latency Creates Paid & Organic Click Drop-Off Risk',
    titleUr: speedConversionPass
      ? 'صفحہ تیزی سے کھلتا ہے جس سے باؤنس ریٹ کم رہتا ہے'
      : 'صفحہ کھلنے میں تاخیر سے اشتہارات اور سرچ ٹریفک ضائع ہونے کا خدشہ ہے',
    description: !ttfbKnown
      ? UNAVAILABLE_EVIDENCE_TEXT
      : speedConversionPass
      ? 'Server response time and script loading allow fast above-the-fold rendering.'
      : 'Slow server response (>1000ms) or multiple blocking scripts cause visitors from Google Search and Meta Ads to bounce before the hero CTA renders.',
    category: 'Conversion',
    priority: !ttfbKnown ? 'low' : speedConversionPass ? 'passed' : 'high',
    passed: speedConversionPass,
    impact: 'High',
    effort: '2–4 hours',
    suggestedFix:
      'Eliminate render-blocking `<head>` scripts and cache landing pages at the CDN edge so ad and search clicks render in under 1.5 seconds.',
    evidence: !ttfbKnown
      ? UNAVAILABLE_EVIDENCE_TEXT
      : `TTFB: ${metrics.responseTimeMs}ms | Render-blocking <head> scripts: ${metrics.renderBlockingScriptsCount}`,
    affectedTarget: 'Landing page initial load pipeline',
    whyItMatters:
      'Every second of blank screen between ad/search click and hero render increases visitor abandonment.',
    businessImpact: 'Protects ROAS on paid campaigns and lowers organic bounce rate.',
    fixOwner: 'Frontend Engineer',
    confidence: ttfbKnown ? 'Confirmed' : 'Data unavailable',
    verificationStep: 'Test landing page load on 4G mobile throttling and confirm hero headline + CTA appear within 1.5s.',
    dataType: 'Heuristic conversion checks',
    actionHorizon: !ttfbKnown ? 'Monitor' : speedConversionPass ? 'Monitor' : 'Fix Today'
  });

  // 38. CHK-CNV-06: Manual End-to-End Conversion Funnel & Mobile Tap-Target Review
  checks.push({
    id: 'chk-cnv-06',
    checkId: 'CHK-CNV-06',
    title: 'Manual Mobile Form Submission, Validation & Thank-You Tracking Walkthrough',
    titleUr: 'موبائل فارم جمع کرانے اور کنورژن ٹریکنگ کی دستی جانچ',
    description:
      'Automated heuristics verify CTA and form markup, but cannot submit live test leads or verify CRM/GA4 conversion event firing without human confirmation.',
    category: 'Conversion',
    priority: 'low',
    passed: false,
    impact: 'High',
    effort: '20 mins',
    suggestedFix:
      'Submit a real test inquiry on a mobile phone (375px width) to confirm inline validation errors are clear, sticky headers do not cover the submit button, and the thank-you event fires.',
    evidence:
      'Live form submission and CRM webhook delivery require safe manual testing by the site owner (`Manual review required`).',
    affectedTarget: 'Primary lead form / checkout flow',
    whyItMatters:
      'Broken form handlers, silent validation errors, or overlapping sticky chat widgets silently block ready-to-buy leads.',
    businessImpact: 'Prevents 100% loss of bottom-of-funnel leads caused by broken form submissions.',
    fixOwner: 'CRO / Product Designer',
    confidence: 'Manual review required',
    verificationStep: 'Submit a test lead on mobile and verify receipt in your inbox/CRM and GA4 Realtime events.',
    dataType: 'Manual review items',
    actionHorizon: 'Monitor'
  });

  return checks;
}

/**
 * Computes the six transparent category scores (0-100) from the executed checks.
 * Checks with confidence === 'Data unavailable' or 'Manual review required' are excluded
 * from the score denominator so unavailable external telemetry never fabricates a penalty.
 */
export function computeSixTransparentScores(allChecks: AuditIssue[]): {
  scores: SixTransparentScores;
  scoreDetails: ScoreDimensionDetail[];
} {
  const dimensions: Array<{
    id: keyof SixTransparentScores;
    category: AuditIssue['category'];
    label: string;
    labelUr: string;
    summary: string;
    weightFormula: string;
  }> = [
    {
      id: 'crawlability',
      category: 'Crawlability',
      label: 'Crawlability',
      labelUr: 'کرول ایبلٹی (Crawlability)',
      summary: 'HTTP status, indexability, canonicals, robots.txt, XML sitemap & internal links',
      weightFormula: 'Weighted pass rate of confirmed Crawlability checks (Critical=3x, High=2x, Medium/Low=1x)'
    },
    {
      id: 'seo',
      category: 'SEO',
      label: 'SEO',
      labelUr: 'ایس ای او (SEO)',
      summary: 'Title, meta description, H1/H2 structure, JSON-LD schema & social metadata',
      weightFormula: 'Weighted pass rate of confirmed On-Page SEO checks (Critical=3x, High=2x, Medium/Low=1x)'
    },
    {
      id: 'performance',
      category: 'Performance',
      label: 'Performance',
      labelUr: 'کارکردگی اور اسپیڈ (Performance)',
      summary: 'Field/Lab Core Web Vitals, TTFB, compression, render-blocking scripts & images',
      weightFormula: 'Weighted pass rate of available Performance checks (excludes unavailable API sources)'
    },
    {
      id: 'accessibility',
      category: 'Accessibility',
      label: 'Accessibility',
      labelUr: 'رسائی (Accessibility)',
      summary: 'Image alt text, document lang, viewport zoom, HTML5 landmarks & form labels',
      weightFormula: 'Weighted pass rate of automated DOM Accessibility checks (manual review listed separately)'
    },
    {
      id: 'securityAndTrust',
      category: 'Security',
      label: 'Security and Trust',
      labelUr: 'سیکیورٹی اور اعتماد (Security & Trust)',
      summary: 'HTTPS encryption, HSTS, CSP, X-Frame-Options, nosniff & mixed-content checks',
      weightFormula: 'Weighted pass rate of confirmed HTTP Security Header & TLS checks'
    },
    {
      id: 'conversionReadiness',
      category: 'Conversion',
      label: 'Conversion Readiness',
      labelUr: 'کنورژن کی تیاری (Conversion Readiness)',
      summary: 'Primary CTA clarity, direct contact links, form friction, trust proof & load speed',
      weightFormula: 'Weighted pass rate of heuristic Conversion Architecture checks'
    }
  ];

  const scores: SixTransparentScores = {
    crawlability: 0,
    seo: 0,
    performance: 0,
    accessibility: 0,
    securityAndTrust: 0,
    conversionReadiness: 0
  };

  const scoreDetails: ScoreDimensionDetail[] = dimensions.map((dim) => {
    const catChecks = allChecks.filter((c) => c.category === dim.category);
    const evaluable = catChecks.filter(
      (c) => c.confidence === 'Confirmed' || c.confidence === 'Likely'
    );
    const passedChecks = evaluable.filter((c) => c.passed).length;
    const failedChecks = evaluable.filter((c) => !c.passed).length;
    const manualOrUnavailableChecks = catChecks.length - evaluable.length;

    let earnedWeight = 0;
    let totalWeight = 0;

    for (const chk of evaluable) {
      const weight =
        chk.priority === 'critical'
          ? 3
          : chk.priority === 'high'
          ? 2
          : 1.5;
      totalWeight += weight;
      if (chk.passed) {
        earnedWeight += weight;
      }
    }

    const computedScore =
      totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 75;

    scores[dim.id] = computedScore;

    return {
      id: dim.id,
      label: dim.label,
      labelUr: dim.labelUr,
      score: computedScore,
      passedChecks,
      failedChecks,
      manualOrUnavailableChecks,
      totalChecks: catChecks.length,
      summary: dim.summary,
      weightFormula: dim.weightFormula
    };
  });

  return { scores, scoreDetails };
}

export function computeChecksSummary(allChecks: AuditIssue[]): ChecksCountSummary {
  const byDataType: Record<DataSourceType, number> = {
    'Real-user field data': 0,
    'Lighthouse lab data': 0,
    'HTML/static checks': 0,
    'Heuristic conversion checks': 0,
    'Manual review items': 0
  };

  let confirmedPassed = 0;
  let confirmedOrLikelyIssues = 0;
  let manualReviewRequired = 0;
  let dataUnavailable = 0;

  for (const chk of allChecks) {
    byDataType[chk.dataType] = (byDataType[chk.dataType] || 0) + 1;
    if (chk.confidence === 'Manual review required') {
      manualReviewRequired++;
    } else if (chk.confidence === 'Data unavailable') {
      dataUnavailable++;
    } else if (chk.passed) {
      confirmedPassed++;
    } else {
      confirmedOrLikelyIssues++;
    }
  }

  return {
    totalExecuted: allChecks.length,
    confirmedPassed,
    confirmedOrLikelyIssues,
    manualReviewRequired,
    dataUnavailable,
    byDataType
  };
}

/**
 * Exports all executed audit checks and evidence into a clean, RFC-4180 compliant CSV string.
 */
export function generateAuditCsvContent(result: AuditResult): string {
  const headers = [
    'Check ID',
    'Category',
    'Title',
    'Status / Severity',
    'Confidence Level',
    'Data Type',
    'Action Plan Bucket',
    'Affected URL or Element',
    'Evidence',
    'Why It Matters',
    'Business Impact',
    'Recommended Fix',
    'Fix Owner',
    'Estimated Effort',
    'Verification Step'
  ];

  const escapeCsv = (val: string | number | boolean | undefined | null): string => {
    const str = String(val ?? '').replace(/\r?\n/g, ' ');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const list = result.allChecks && result.allChecks.length > 0 ? result.allChecks : result.issues;
  const rows = list.map((item) => [
    item.checkId,
    item.category,
    item.title,
    item.passed ? 'Passed' : item.priority.toUpperCase(),
    item.confidence,
    item.dataType,
    item.actionHorizon,
    item.affectedTarget,
    item.evidence,
    item.whyItMatters,
    item.businessImpact,
    item.suggestedFix,
    item.fixOwner,
    item.effort,
    item.verificationStep
  ]);

  return [headers.map(escapeCsv).join(','), ...rows.map((r) => r.map(escapeCsv).join(','))].join('\n');
}

// ============================================================================
// SAMPLE AUDITS (Built through the exact same 38-check deterministic pipeline)
// ============================================================================
function createSampleAuditResult(type: 'abuqitmirlabs' | 'ecommerce'): AuditResult {
  const isAbq = type === 'abuqitmirlabs';
  const url = isAbq ? 'https://www.abuqitmirlabs.tech' : 'https://example-store-audit-demo.com';

  const inspectedMetrics: InspectedMetrics = isAbq
    ? {
        finalUrl: 'https://www.abuqitmirlabs.tech/',
        redirectCount: 0,
        statusCode: 200,
        responseTimeMs: 145,
        htmlBytes: 46750,
        isCompressed: true,
        compressionType: 'br',
        hasHttps: true,
        hasHsts: true,
        hstsValue: 'max-age=31536000; includeSubDomains; preload',
        hasCsp: true,
        cspValue: "default-src 'self'; frame-ancestors 'self'",
        hasXFrame: true,
        xFrameValue: 'SAMEORIGIN',
        hasContentTypeOptions: true,
        hasReferrerPolicy: true,
        referrerPolicyValue: 'strict-origin-when-cross-origin',
        robotsMeta: 'index, follow',
        xRobotsTag: null,
        metaTitle: 'Growth Engineering Firm | Custom Software & AI | AbuQitmirLabs',
        metaDescription:
          'Growth engineering firm for B2B companies. Custom software, AI automation & technical SEO engineered as one revenue system.',
        canonicalUrl: 'https://www.abuqitmirlabs.tech/',
        hasViewport: true,
        viewportContent: 'width=device-width, initial-scale=1.0',
        disablesZoom: false,
        h1Count: 1,
        h1Texts: ['Engineering Revenue Systems for Modern B2B Growth'],
        h2Count: 10,
        h3Count: 16,
        imagesCount: 14,
        imagesMissingAlt: 0,
        imagesMissingDimensions: 0,
        legacyFormatImagesCount: 0,
        scriptsCount: 3,
        renderBlockingScriptsCount: 0,
        stylesheetsCount: 2,
        langAttribute: 'en',
        jsonLdCount: 1,
        jsonLdTypes: ['Organization', 'WebSite', 'WebPage', 'BreadcrumbList'],
        hasOgTitle: true,
        hasOgDescription: true,
        hasOgImage: true,
        hasTwitterCard: true,
        internalLinksCount: 28,
        externalLinksCount: 5,
        unsafeBlankLinksCount: 0,
        mixedContentCount: 0,
        landmarks: { main: true, nav: true, header: true, footer: true },
        formsCount: 1,
        maxFormInputsCount: 4,
        unlabeledInputsCount: 0,
        unlabeledButtonsCount: 0,
        ctaElementsCount: 5,
        detectedCtaSamples: ['Book Strategy Call', 'Contact Now', 'Run Free Website Audit'],
        hasDirectContactLink: true,
        contactMethodsDetected: ['/contact page', 'WhatsApp direct', 'Email (mailto:)'],
        trustSignalsDetected: ['Case Studies (/case-studies)', 'Editorial Policy', 'Privacy Policy', 'Named Engineering Team']
      }
    : {
        finalUrl: 'http://example-store-audit-demo.com/',
        redirectCount: 3,
        statusCode: 200,
        responseTimeMs: 1480,
        htmlBytes: 185000,
        isCompressed: false,
        compressionType: null,
        hasHttps: false,
        hasHsts: false,
        hstsValue: null,
        hasCsp: false,
        cspValue: null,
        hasXFrame: false,
        xFrameValue: null,
        hasContentTypeOptions: false,
        hasReferrerPolicy: false,
        referrerPolicyValue: null,
        robotsMeta: null,
        xRobotsTag: null,
        metaTitle: 'Home',
        metaDescription: null,
        canonicalUrl: null,
        hasViewport: true,
        viewportContent: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
        disablesZoom: true,
        h1Count: 3,
        h1Texts: ['Summer Sale', 'Featured Products', 'New Arrivals'],
        h2Count: 1,
        h3Count: 0,
        imagesCount: 24,
        imagesMissingAlt: 9,
        imagesMissingDimensions: 14,
        legacyFormatImagesCount: 18,
        scriptsCount: 19,
        renderBlockingScriptsCount: 4,
        stylesheetsCount: 7,
        langAttribute: null,
        jsonLdCount: 0,
        jsonLdTypes: [],
        hasOgTitle: false,
        hasOgDescription: false,
        hasOgImage: false,
        hasTwitterCard: false,
        internalLinksCount: 2,
        externalLinksCount: 8,
        unsafeBlankLinksCount: 4,
        mixedContentCount: 3,
        landmarks: { main: false, nav: true, header: false, footer: true },
        formsCount: 1,
        maxFormInputsCount: 9,
        unlabeledInputsCount: 3,
        unlabeledButtonsCount: 2,
        ctaElementsCount: 0,
        detectedCtaSamples: [],
        hasDirectContactLink: false,
        contactMethodsDetected: [],
        trustSignalsDetected: []
      };

  const fieldData: FieldDataSummary = {
    available: false,
    sourceLabel: 'Chrome UX Report (CrUX)',
    overallCategory: 'UNAVAILABLE',
    lcpSeconds: null,
    clsScore: null,
    inpMs: null,
    fcpSeconds: null,
    ttfbMs: null,
    note: 'Sample preview mode — run a live audit to query Chrome UX Report field telemetry.'
  };

  const cwv: CoreWebVitals = isAbq
    ? { lcp: 1.4, cls: 0.02, inp: 72, fcp: 0.9, ttfb: 145, speedIndex: 1.8 }
    : { lcp: 4.6, cls: 0.28, inp: 390, fcp: 2.8, ttfb: 1480, speedIndex: 5.2 };

  const labData: LabDataSummary = {
    available: true,
    sourceLabel: 'Sample Benchmark Simulation',
    mobile: cwv,
    desktop: isAbq
      ? { lcp: 0.8, cls: 0.01, inp: 45, fcp: 0.6, ttfb: 110, speedIndex: 1.1 }
      : { lcp: 3.1, cls: 0.19, inp: 240, fcp: 1.9, ttfb: 1120, speedIndex: 3.8 },
    note: 'Sample lab benchmark metrics.'
  };

  const miniSite: MiniSiteAuditSummary = isAbq
    ? {
        robotsTxtChecked: true,
        robotsTxtUrl: 'https://www.abuqitmirlabs.tech/robots.txt',
        robotsTxtStatus: 200,
        robotsTxtAllowsCrawl: true,
        robotsTxtHasSitemapDirective: true,
        sitemapXmlChecked: true,
        sitemapXmlUrl: 'https://www.abuqitmirlabs.tech/sitemap.xml',
        sitemapXmlStatus: 200,
        sitemapUrlCount: 211,
        sampledInternalPages: [
          {
            url: 'https://www.abuqitmirlabs.tech/custom-software',
            statusCode: 200,
            responseTimeMs: 132,
            title: 'Custom Software Development Services | AbuQitmirLabs',
            h1Count: 1,
            hasCanonical: true
          },
          {
            url: 'https://www.abuqitmirlabs.tech/seo-mastery',
            statusCode: 200,
            responseTimeMs: 128,
            title: 'SEO & GEO Mastery Services | AbuQitmirLabs',
            h1Count: 1,
            hasCanonical: true
          }
        ]
      }
    : {
        robotsTxtChecked: true,
        robotsTxtUrl: 'http://example-store-audit-demo.com/robots.txt',
        robotsTxtStatus: 404,
        robotsTxtAllowsCrawl: true,
        robotsTxtHasSitemapDirective: false,
        sitemapXmlChecked: true,
        sitemapXmlUrl: 'http://example-store-audit-demo.com/sitemap.xml',
        sitemapXmlStatus: 404,
        sitemapUrlCount: 0,
        sampledInternalPages: []
      };

  const allChecks = buildDeterministicChecks(
    url,
    inspectedMetrics,
    fieldData,
    labData,
    miniSite,
    'complete'
  );
  const { scores, scoreDetails } = computeSixTransparentScores(allChecks);
  const checksSummary = computeChecksSummary(allChecks);
  const failingIssues = allChecks.filter((c) => !c.passed && c.confidence !== 'Data unavailable');

  const overallScore = Math.round(
    (scores.crawlability +
      scores.seo +
      scores.performance +
      scores.accessibility +
      scores.securityAndTrust +
      scores.conversionReadiness) /
      6
  );

  return {
    url,
    finalUrl: inspectedMetrics.finalUrl,
    mode: 'complete',
    objective: 'complete',
    device: 'mobile',
    deviceSelection: 'both',
    advanced: {
      industry: isAbq ? 'B2B SaaS & Software' : 'E-Commerce & Retail',
      businessGoal: isAbq ? 'Generate Qualified B2B Leads' : 'Increase Online Sales & Checkout Conversion',
      targetMarket: 'Global / International',
      reportLanguage: 'en'
    },
    overallScore,
    grade: calculateGrade(overallScore),
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
    cwv,
    miniSiteSummary: miniSite,
    issues: failingIssues,
    allChecks,
    recommendations: failingIssues.slice(0, 5).map((iss) => ({
      title: iss.title,
      description: iss.suggestedFix,
      scoreGain: iss.priority === 'critical' ? 12 : iss.priority === 'high' ? 8 : 4,
      timeToFix: iss.effort,
      difficulty: iss.priority === 'critical' ? 'Moderate' : 'Easy',
      category: iss.category,
      basedOnCheckIds: [iss.checkId]
    })),
    aiExecutiveSummary: isAbq
      ? 'Deterministic audit executed 38 checks across Crawlability, SEO, Performance, Accessibility, Security, and Conversion Readiness. All 35 static, heuristic, and lab checks passed; 2 items are listed for standard human manual walkthrough.'
      : 'Deterministic audit executed 38 checks and identified critical blockers in HTTPS transport, missing canonicals, render-blocking head scripts, missing image alt attributes, and absent conversion CTAs.',
    inspectedMetrics,
    analyzedAt: new Date().toISOString(),
    engine: 'Deterministic HTTP, DOM & Conversion Inspector'
  };
}

export const SAMPLE_AUDITS: Record<'abuqitmirlabs' | 'ecommerce', AuditResult> = {
  abuqitmirlabs: createSampleAuditResult('abuqitmirlabs'),
  ecommerce: createSampleAuditResult('ecommerce')
};

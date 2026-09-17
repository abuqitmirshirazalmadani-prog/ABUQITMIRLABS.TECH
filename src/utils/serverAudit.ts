import { AuditResult, AuditIssue, AiRecommendation, CoreWebVitals, InspectedMetrics, DeviceStrategy } from '../types/audit.js';
import { calculateGrade, stripHtml } from './auditEngine.js';

export async function performWebsiteAudit(
  rawUrl: string,
  device: DeviceStrategy = 'mobile',
  categories: string[] = ['performance', 'seo', 'accessibility', 'bestPractices', 'security'],
  geminiClient: any = null
): Promise<AuditResult> {
  // Normalize URL
  let targetUrl = rawUrl.trim();
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'https://' + targetUrl;
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    throw new Error('Invalid URL format. Please provide a valid web address like https://example.com');
  }

  // Attempt Google PageSpeed Insights if possible
  let psiData: any = null;
  try {
    const psiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
    psiUrl.searchParams.set('url', targetUrl);
    psiUrl.searchParams.set('strategy', device);
    if (process.env.PAGESPEED_API_KEY) {
      psiUrl.searchParams.set('key', process.env.PAGESPEED_API_KEY);
    }
    categories.forEach(cat => {
      const psiCat = cat === 'bestPractices' ? 'best-practices' : cat;
      psiUrl.searchParams.append('category', psiCat);
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);
    const psiRes = await fetch(psiUrl.toString(), { signal: controller.signal });
    clearTimeout(timeoutId);

    if (psiRes.ok) {
      psiData = await psiRes.json();
    }
  } catch (e) {
    // Graceful fallback to real-time live network/DOM inspection
  }

  // Live Technical Inspection via direct HTTP fetch
  const t0 = Date.now();
  let statusCode = 200;
  let html = '';
  let responseHeaders: Record<string, string> = {};
  let ttfb = 250;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const liveRes = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': device === 'mobile'
          ? 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36 AbuQitmirLabs-Audit/2.0'
          : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 AbuQitmirLabs-Audit/2.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      signal: controller.signal,
      redirect: 'follow'
    });
    clearTimeout(timeoutId);

    ttfb = Date.now() - t0;
    statusCode = liveRes.status;
    html = await liveRes.text();
    liveRes.headers.forEach((val, key) => {
      responseHeaders[key.toLowerCase()] = val;
    });
  } catch (err: any) {
    // If target site rejects bot, use fallback response time
    ttfb = Math.max(Date.now() - t0, 320);
    html = '';
  }

  // Inspect HTML characteristics
  const hasHttps = parsedUrl.protocol === 'https:';
  const hasHsts = Boolean(responseHeaders['strict-transport-security']);
  const hasCsp = Boolean(responseHeaders['content-security-policy']);
  const hasXFrame = Boolean(responseHeaders['x-frame-options']);
  const hasContentTypeOptions = Boolean(responseHeaders['x-content-type-options']);
  const hasReferrerPolicy = Boolean(responseHeaders['referrer-policy']);
  const contentEncoding = (responseHeaders['content-encoding'] || '').toLowerCase();
  const isCompressed = contentEncoding.includes('gzip') || contentEncoding.includes('br') || contentEncoding.includes('deflate');

  // Extract meta tags with robust attribute ordering & data-attribute handling
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const metaTitle = titleMatch ? stripHtml(titleMatch[1]).trim() : null;

  let metaDescription: string | null = null;
  const allMetaTags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of allMetaTags) {
    if (/\bname=["']description["']/i.test(tag)) {
      const contentMatch = tag.match(/\bcontent=["']([^"']*)["']/i);
      if (contentMatch) {
        metaDescription = stripHtml(contentMatch[1]).trim();
        break;
      }
    }
  }

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

  const hasViewport = allMetaTags.some(tag => /\bname=["']viewport["']/i.test(tag));
  const h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
  const h2Count = (html.match(/<h2[^>]*>/gi) || []).length;

  const images = html.match(/<img[^>]*>/gi) || [];
  const imagesCount = images.length;
  let imagesMissingAlt = 0;
  images.forEach(img => {
    if (!/alt=["'][^"']*["']/i.test(img)) {
      imagesMissingAlt++;
    }
  });

  // Separate JSON-LD structured data from executable script tags
  const allScriptTags = html.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) || html.match(/<script\b[^>]*>/gi) || [];
  const executableScripts = allScriptTags.filter(tag => !/type=["']application\/ld\+json["']/i.test(tag));
  const scriptsCount = executableScripts.length;

  // Check for actual render-blocking scripts in <head>
  const headMatch = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  const headHtml = headMatch ? headMatch[1] : '';
  const headScripts = headHtml.match(/<script\b[^>]*>/gi) || [];
  const renderBlockingScripts = headScripts.filter(tag => {
    if (/type=["']application\/ld\+json["']/i.test(tag)) return false;
    // Only external scripts with a src attribute block the network parser
    if (!/src=["'][^"']+["']/i.test(tag)) return false;
    if (/\basync\b/i.test(tag) || /\bdefer\b/i.test(tag) || /type=["']module["']/i.test(tag)) return false;
    return true;
  });
  const hasRenderBlockingScripts = renderBlockingScripts.length > 0;

  const stylesheetsCount = (html.match(/<link[^>]+rel=["']stylesheet["']/gi) || []).length;
  const langMatch = html.match(/<html[^>]+lang=["']([^"']+)["']/i);
  const langAttribute = langMatch ? langMatch[1] : null;

  const inspectedMetrics: InspectedMetrics = {
    statusCode,
    responseTimeMs: ttfb,
    htmlBytes: Buffer.byteLength(html, 'utf8'),
    isCompressed,
    hasHttps,
    hasHsts,
    hasCsp,
    hasXFrame,
    hasContentTypeOptions,
    hasReferrerPolicy,
    metaTitle,
    metaDescription,
    canonicalUrl,
    hasViewport,
    h1Count,
    h2Count,
    imagesCount,
    imagesMissingAlt,
    scriptsCount,
    stylesheetsCount,
    langAttribute
  };

  const issues: AuditIssue[] = [];

  // Core Web Vitals extraction or simulation from real metrics
  let cwv: CoreWebVitals;
  let performanceScore = 80;
  let seoScore = 85;
  let a11yScore = 85;
  let bestPracticesScore = 85;
  let securityScore = 85;

  if (psiData?.lighthouseResult) {
    const lh = psiData.lighthouseResult;
    const cats = lh.categories || {};
    const audits = lh.audits || {};

    performanceScore = Math.round((cats.performance?.score || 0.8) * 100);
    seoScore = Math.round((cats.seo?.score || 0.85) * 100);
    a11yScore = Math.round((cats.accessibility?.score || 0.85) * 100);
    bestPracticesScore = Math.round((cats['best-practices']?.score || 0.85) * 100);

    const lcpSec = Number((audits['largest-contentful-paint']?.numericValue / 1000 || 2.2).toFixed(2));
    const clsVal = Number((audits['cumulative-layout-shift']?.numericValue || 0.05).toFixed(3));
    const inpMs = Math.round(audits['interaction-to-next-paint']?.numericValue || 120);
    const fcpSec = Number((audits['first-contentful-paint']?.numericValue / 1000 || 1.4).toFixed(2));
    const sTimeMs = Math.round(audits['server-response-time']?.numericValue || ttfb);
    const siSec = Number((audits['speed-index']?.numericValue / 1000 || 2.5).toFixed(2));

    cwv = {
      lcp: lcpSec,
      cls: clsVal,
      inp: inpMs,
      fcp: fcpSec,
      ttfb: sTimeMs,
      speedIndex: siSec
    };

    // Extract issues from PSI audits
    Object.values(audits).forEach((audit: any) => {
      if (audit.score !== null && audit.score < 0.9 && audit.title && audit.description) {
        let cat = 'Best Practices';
        const id = (audit.id || '').toLowerCase();
        if (id.includes('image') || id.includes('render') || id.includes('paint') || id.includes('lcp') || id.includes('speed') || id.includes('byte')) cat = 'Performance';
        else if (id.includes('meta') || id.includes('crawl') || id.includes('link') || id.includes('canonical') || id.includes('title')) cat = 'SEO';
        else if (id.includes('aria') || id.includes('contrast') || id.includes('label') || id.includes('alt')) cat = 'Accessibility';
        else if (id.includes('https') || id.includes('vulnerab') || id.includes('security')) cat = 'Security';

        const priority = audit.score < 0.4 ? 'critical' : audit.score < 0.7 ? 'high' : audit.score < 0.85 ? 'medium' : 'low';
        const impact = audit.score < 0.5 ? 'High' : audit.score < 0.8 ? 'Medium' : 'Low';

        issues.push({
          title: audit.title,
          description: stripHtml(audit.description).slice(0, 240),
          category: cat,
          priority,
          impact,
          effort: audit.score < 0.5 ? '1-2 days' : 'Quick fix'
        });
      }
    });
  } else {
    // Algorithmic deep inspection scoring
    // 1. Performance calculation
    let perfPenalties = 0;
    if (ttfb > 1200) {
      perfPenalties += 25;
      issues.push({
        title: `Slow Time to First Byte (${ttfb}ms)`,
        description: 'Server initial response exceeds Google recommendation of 800ms. Consider CDN caching or database query optimization.',
        category: 'Performance',
        priority: 'critical',
        impact: 'High',
        effort: '1 day',
        suggestedFix: 'Implement Cloudflare edge caching or upgrade origin server resources.'
      });
    } else if (ttfb > 600) {
      perfPenalties += 10;
      issues.push({
        title: `Moderate Server Response Latency (${ttfb}ms)`,
        description: 'TTFB is above 600ms. Edge caching can improve global delivery speeds.',
        category: 'Performance',
        priority: 'medium',
        impact: 'Medium',
        effort: '2-4 hours'
      });
    }

    if (hasRenderBlockingScripts) {
      perfPenalties += 10;
      issues.push({
        title: `Render-Blocking Scripts in <head> (${renderBlockingScripts.length} script${renderBlockingScripts.length > 1 ? 's' : ''})`,
        description: 'Scripts loaded synchronously in the document <head> block the browser parser and delay Largest Contentful Paint.',
        category: 'Performance',
        priority: 'high',
        impact: 'High',
        effort: '1-2 hours',
        suggestedFix: 'Add async or defer to non-critical scripts, or move initialization after window load.'
      });
    } else if (scriptsCount > 25) {
      perfPenalties += 10;
      issues.push({
        title: `Excessive Script Dependencies (${scriptsCount} <script> tags)`,
        description: 'High number of external and inline scripts can increase main-thread execution time and delay interactivity.',
        category: 'Performance',
        priority: 'medium',
        impact: 'Medium',
        effort: '1-2 days',
        suggestedFix: 'Consolidate script bundles and defer non-critical third-party analytics.'
      });
    }

    if (stylesheetsCount > 6) {
      perfPenalties += 10;
      issues.push({
        title: `Multiple Render-Blocking Stylesheets (${stylesheetsCount} CSS files)`,
        description: 'Consolidate multiple stylesheet requests into an optimized single CSS delivery or use critical CSS inlining.',
        category: 'Performance',
        priority: 'medium',
        impact: 'Medium',
        effort: '3-4 hours'
      });
    }

    const rawHtmlBytes = inspectedMetrics.htmlBytes;
    if (!isCompressed && rawHtmlBytes > 100000) {
      perfPenalties += 12;
      issues.push({
        title: `Uncompressed HTML Transfer (${Math.round(rawHtmlBytes / 1024)} KB)`,
        description: 'Server response is not compressed with Gzip or Brotli. Enabling text compression reduces transfer payload by up to 80% on mobile networks.',
        category: 'Performance',
        priority: 'high',
        impact: 'High',
        effort: '1-2 hours',
        suggestedFix: 'Enable Gzip or Brotli compression on your web server or CDN (e.g., Cloudflare, Nginx, or Vercel).'
      });
    } else if (rawHtmlBytes > 1200000) {
      perfPenalties += 10;
      issues.push({
        title: `Excessive DOM Tree Size (${Math.round(rawHtmlBytes / 1024)} KB)`,
        description: 'Very large initial HTML payload (>1.2MB uncompressed) can delay DOM parsing and main-thread responsiveness on low-end mobile devices.',
        category: 'Performance',
        priority: 'medium',
        impact: 'Medium',
        effort: '2-3 hours',
        suggestedFix: 'Lazy-load below-the-fold components and paginate lengthy data tables or feeds.'
      });
    }

    performanceScore = Math.max(30, Math.min(98, 100 - perfPenalties));

    // 2. SEO calculation
    let seoPenalties = 0;
    if (!metaTitle) {
      seoPenalties += 25;
      issues.push({
        title: 'Missing <title> Element',
        description: 'The page has no HTML title tag. Google search engine results require a title for snippet generation.',
        category: 'SEO',
        priority: 'critical',
        impact: 'High',
        effort: '15 mins',
        suggestedFix: 'Add a concise 50-60 character <title> tag matching your core keywords.'
      });
    } else if (metaTitle.length < 20 || metaTitle.length > 70) {
      seoPenalties += 8;
      issues.push({
        title: `Unoptimized Title Length (${metaTitle.length} characters)`,
        description: 'Search engines prefer titles between 30 and 60 characters to avoid truncation in SERPs.',
        category: 'SEO',
        priority: 'low',
        impact: 'Low',
        effort: '15 mins'
      });
    }

    if (!metaDescription) {
      seoPenalties += 20;
      issues.push({
        title: 'Missing Meta Description',
        description: 'No meta description found. Search engines may display arbitrary body text instead of a tailored summary.',
        category: 'SEO',
        priority: 'high',
        impact: 'High',
        effort: '30 mins',
        suggestedFix: 'Add <meta name="description" content="..."> between 130 and 160 characters.'
      });
    }

    if (!canonicalUrl) {
      seoPenalties += 10;
      issues.push({
        title: 'Missing Canonical Link Tag',
        description: 'Without a rel="canonical" link, search engines might treat URL variations (?ref=, www vs non-www) as duplicate content.',
        category: 'SEO',
        priority: 'medium',
        impact: 'Medium',
        effort: '30 mins'
      });
    }

    if (h1Count === 0) {
      seoPenalties += 15;
      issues.push({
        title: 'No <h1> Heading Found',
        description: 'Pages should contain exactly one main <h1> heading to establish semantic content hierarchy.',
        category: 'SEO',
        priority: 'high',
        impact: 'High',
        effort: '20 mins'
      });
    } else if (h1Count > 1) {
      seoPenalties += 5;
      issues.push({
        title: `Multiple <h1> Headings Found (${h1Count})`,
        description: 'Best practice recommends a single primary <h1> per URL for optimal topic clarity.',
        category: 'SEO',
        priority: 'low',
        impact: 'Low',
        effort: '20 mins'
      });
    }

    if (!hasViewport) {
      seoPenalties += 25;
      issues.push({
        title: 'Missing Mobile Viewport Meta Tag',
        description: 'The page lacks <meta name="viewport" content="width=device-width, initial-scale=1">, breaking mobile indexing.',
        category: 'SEO',
        priority: 'critical',
        impact: 'High',
        effort: '10 mins'
      });
    }

    seoScore = Math.max(35, Math.min(100, 100 - seoPenalties));

    // 3. Accessibility calculation
    let a11yPenalties = 0;
    if (!langAttribute) {
      a11yPenalties += 15;
      issues.push({
        title: 'Missing <html> lang Attribute',
        description: 'Screen readers need a declared language (e.g. lang="en") to pronounce text correctly.',
        category: 'Accessibility',
        priority: 'high',
        impact: 'Medium',
        effort: '5 mins'
      });
    }

    if (imagesMissingAlt > 0) {
      const p = imagesMissingAlt > 5 ? 25 : 12;
      a11yPenalties += p;
      issues.push({
        title: `${imagesMissingAlt} Images Missing alt Attributes`,
        description: 'Assistive technologies cannot describe images without alternative text descriptions.',
        category: 'Accessibility',
        priority: imagesMissingAlt > 5 ? 'high' : 'medium',
        impact: 'Medium',
        effort: '1-2 hours',
        suggestedFix: 'Add descriptive alt text to all meaningful images; use alt="" only for decorative icons.'
      });
    }

    a11yScore = Math.max(40, Math.min(98, 100 - a11yPenalties));

    // 4. Security calculation
    let secPenalties = 0;
    if (!hasHttps) {
      secPenalties += 40;
      issues.push({
        title: 'Insecure HTTP Connection (No SSL/TLS)',
        description: 'Data transmitted to and from this site is not encrypted, triggering browser security warnings.',
        category: 'Security',
        priority: 'critical',
        impact: 'High',
        effort: '1 hour',
        suggestedFix: 'Install a valid SSL certificate (Let\'s Encrypt / Cloudflare) and enforce 301 HTTPS redirects.'
      });
    }

    if (!hasHsts) {
      secPenalties += 12;
      issues.push({
        title: 'Missing Strict-Transport-Security (HSTS) Header',
        description: 'Without HSTS, initial connections can be vulnerable to SSL stripping man-in-the-middle attacks.',
        category: 'Security',
        priority: 'medium',
        impact: 'Medium',
        effort: '20 mins'
      });
    }

    if (!hasXFrame) {
      secPenalties += 10;
      issues.push({
        title: 'Missing X-Frame-Options Header',
        description: 'Protects the website from clickjacking attacks by controlling whether it can be embedded in iframes.',
        category: 'Security',
        priority: 'medium',
        impact: 'Medium',
        effort: '20 mins'
      });
    }

    if (!hasCsp) {
      secPenalties += 15;
      issues.push({
        title: 'Missing Content-Security-Policy (CSP)',
        description: 'A robust CSP prevents Cross-Site Scripting (XSS) and unauthorized script injection.',
        category: 'Security',
        priority: 'high',
        impact: 'High',
        effort: '2-4 hours'
      });
    }

    if (!hasContentTypeOptions) {
      secPenalties += 8;
      issues.push({
        title: 'Missing X-Content-Type-Options Header',
        description: 'Setting "nosniff" prevents MIME-type sniffing vulnerabilities.',
        category: 'Security',
        priority: 'low',
        impact: 'Low',
        effort: '10 mins'
      });
    }

    securityScore = Math.max(25, Math.min(100, 100 - secPenalties));

    // 5. Best practices calculation
    bestPracticesScore = Math.round((performanceScore * 0.4) + (securityScore * 0.4) + (a11yScore * 0.2));

    // Simulated realistic Core Web Vitals based on observed metrics
    const estLcp = Number((Math.max(1.1, (ttfb / 1000) * 1.6 + (scriptsCount * 0.08))).toFixed(2));
    const estFcp = Number((Math.max(0.8, (ttfb / 1000) * 1.1)).toFixed(2));
    const estCls = imagesMissingAlt > 3 ? 0.18 : 0.04;
    const estInp = Math.min(480, Math.round(75 + scriptsCount * 12));
    const estSi = Number((estLcp * 1.25).toFixed(2));

    cwv = {
      lcp: estLcp,
      cls: estCls,
      inp: estInp,
      fcp: estFcp,
      ttfb,
      speedIndex: estSi
    };
  }

  // Calculate overall score (weighted)
  const overallScore = Math.round(
    (performanceScore * 0.35) +
    (seoScore * 0.25) +
    (accessibilityScoreAdjustment(a11yScore) * 0.15) +
    (bestPracticesScore * 0.10) +
    (securityScore * 0.15)
  );

  function accessibilityScoreAdjustment(s: number) {
    return Math.max(30, Math.min(100, s));
  }

  const grade = calculateGrade(overallScore);

  // Sort issues by priority order
  const priorityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
  issues.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  // AI-Powered Recommendations
  let recommendations: AiRecommendation[] = [];

  if (geminiClient) {
    try {
      const aiPrompt = `
You are a Principal Web Architect & Core Web Vitals Specialist at AbuQitmirLabs (https://www.abuqitmirlabs.tech).
Analyze this technical audit report for website: ${targetUrl} (Tested Device: ${device}).

METRICS:
- Overall Score: ${overallScore}/100 (Grade: ${grade})
- Performance: ${performanceScore}/100 | SEO: ${seoScore}/100 | Accessibility: ${a11yScore}/100 | Best Practices: ${bestPracticesScore}/100 | Security: ${securityScore}/100
- Core Web Vitals: LCP: ${cwv.lcp}s | CLS: ${cwv.cls} | INP: ${cwv.inp}ms | FCP: ${cwv.fcp}s | TTFB: ${cwv.ttfb}ms | Speed Index: ${cwv.speedIndex}s
- Issues Detected (${issues.length}):
${issues.slice(0, 8).map((iss, i) => `${i + 1}. [${iss.category}] ${iss.title}: ${iss.description}`).join('\n')}

Generate the TOP 5 most impactful, precise, engineering-grade fixes that will yield the biggest score improvements.
Return ONLY a valid JSON object matching this schema:
{
  "recommendations": [
    {
      "title": "Actionable Title (e.g. Optimize Hero Banner LCP)",
      "description": "Concrete technical explanation of what to implement...",
      "scoreGain": 12,
      "timeToFix": "2-4 hours",
      "difficulty": "Easy",
      "category": "Performance"
    }
  ]
}
Do not wrap in markdown quotes if possible, or return pure JSON. Provide exactly 5 recommendations.
`;

      const response = await geminiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: aiPrompt
      });

      const responseText = response.text || '';
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0) {
          recommendations = parsed.recommendations.slice(0, 5);
        }
      }
    } catch (aiErr) {
      console.warn('Gemini recommendation generation error in audit:', aiErr);
    }
  }

  // Fallback AI Recommendations if Gemini was unavailable or returned empty
  if (recommendations.length === 0) {
    if (cwv.lcp > 2.5) {
      recommendations.push({
        title: 'Optimize Largest Contentful Paint (LCP)',
        description: 'Convert largest visual banners into modern WebP/AVIF formats, apply fetchpriority="high", and preload above-the-fold assets.',
        scoreGain: 15,
        timeToFix: '2-4 hours',
        difficulty: 'Easy',
        category: 'Performance'
      });
    }

    if (cwv.ttfb > 600) {
      recommendations.push({
        title: 'Deploy Edge CDN Caching (Cloudflare / Fastly)',
        description: 'Cache static pages and dynamic responses at geographic edges to reduce server response time under 200ms.',
        scoreGain: 12,
        timeToFix: '3-5 hours',
        difficulty: 'Moderate',
        category: 'Performance'
      });
    }

    if (!hasCsp || !hasHsts) {
      recommendations.push({
        title: 'Enforce Enterprise Security Headers (HSTS & CSP)',
        description: 'Add Strict-Transport-Security (max-age=31536000; preload) and Content-Security-Policy to protect users from XSS and clickjacking.',
        scoreGain: 10,
        timeToFix: '1-2 hours',
        difficulty: 'Easy',
        category: 'Security'
      });
    }

    if (imagesMissingAlt > 0) {
      recommendations.push({
        title: 'Ensure 100% Image Accessibility (WCAG 2.1 AA)',
        description: `Add descriptive alt attributes across all ${imagesMissingAlt} unlabelled images to ensure ADA legal compliance and image SEO rankings.`,
        scoreGain: 8,
        timeToFix: '2-3 hours',
        difficulty: 'Easy',
        category: 'Accessibility'
      });
    }

    if (!metaTitle || !metaDescription || !canonicalUrl) {
      recommendations.push({
        title: 'Fix Missing Critical SEO Metadata & Canonical Tags',
        description: 'Provide unique descriptive title tags, meta descriptions, and canonical references to prevent duplicate content penalties in Google.',
        scoreGain: 9,
        timeToFix: '1-2 hours',
        difficulty: 'Easy',
        category: 'SEO'
      });
    }

    if (!isCompressed && inspectedMetrics.htmlBytes > 100000) {
      recommendations.push({
        title: 'Enable Modern Brotli & Gzip Compression',
        description: 'Server HTML is delivered uncompressed. Enabling Brotli/Gzip reduces payload by up to 80%, speeding up mobile data transfers.',
        scoreGain: 10,
        timeToFix: '1-2 hours',
        difficulty: 'Easy',
        category: 'Performance'
      });
    }

    if (hasRenderBlockingScripts) {
      recommendations.push({
        title: 'Eliminate Render-Blocking Scripts with Defer/Async',
        description: 'Add async, defer, or type="module" to scripts in <head> or defer their initialization after window load event.',
        scoreGain: 7,
        timeToFix: '1-2 hours',
        difficulty: 'Easy',
        category: 'Performance'
      });
    } else if (recommendations.length < 5) {
      recommendations.push({
        title: 'Continuous Core Web Vitals Monitoring & Edge Caching',
        description: 'Maintain high performance benchmarks across regional edges with real-user metrics (RUM) tracking.',
        scoreGain: 5,
        timeToFix: '1-2 hours',
        difficulty: 'Easy',
        category: 'Performance'
      });
    }
  }

  return {
    url: targetUrl,
    device,
    overallScore,
    grade,
    categoryCount: 5,
    issueCount: issues.length,
    performance: performanceScore,
    seo: seoScore,
    accessibility: a11yScore,
    bestPractices: bestPracticesScore,
    security: securityScore,
    cwv,
    issues,
    recommendations: recommendations.slice(0, 5),
    inspectedMetrics,
    analyzedAt: new Date().toISOString(),
    engine: psiData ? 'Google Lighthouse (PSI)' : 'AbuQitmirLabs Deep DOM & Network Inspector'
  };
}

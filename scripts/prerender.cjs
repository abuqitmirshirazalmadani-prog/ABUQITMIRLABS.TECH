const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log('🚀 [AbuQitmirLabs SSG] Starting high-fidelity React SSR Pre-rendering...');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const ssrBundlePath = path.join(distDir, 'ssr-bundle.cjs');

// 1. Compile SSR entry point to CommonJS bundle with alias support
try {
  esbuild.buildSync({
    entryPoints: [path.join(rootDir, 'src/ssr-entry.tsx')],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    packages: 'external',
    alias: {
      '@': path.join(rootDir, 'src')
    },
    outfile: ssrBundlePath
  });
  console.log('✓ [AbuQitmirLabs SSG] Compiled SSR bundle successfully');
} catch (err) {
  console.error('❌ [AbuQitmirLabs SSG] Failed to compile SSR bundle:', err);
  process.exit(1);
}

// 2. Load bundled React SSR renderer
let renderFullApp;
let SEO_ROUTES_METADATA = {};
let STATIC_BLOG_POSTS = {};
let getCanonicalSlug = (s) => s;
try {
  const ssrModule = require(ssrBundlePath);
  renderFullApp = ssrModule.renderFullApp;
  SEO_ROUTES_METADATA = ssrModule.SEO_ROUTES_METADATA || {};
  STATIC_BLOG_POSTS = ssrModule.STATIC_BLOG_POSTS || {};
  if (typeof ssrModule.getCanonicalSlug === 'function') {
    getCanonicalSlug = ssrModule.getCanonicalSlug;
  }
  if (!renderFullApp) {
    throw new Error('renderFullApp function not found in SSR bundle');
  }
} catch (err) {
  console.error('❌ [AbuQitmirLabs SSG] Failed to load SSR module:', err);
  process.exit(1);
}

// 3. Read template dist/index.html
const indexHtmlTemplatePath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexHtmlTemplatePath)) {
  console.error('❌ [AbuQitmirLabs SSG] dist/index.html not found! Run vite build first.');
  process.exit(1);
}

// Read clean source index.html to ensure no residual pre-rendered content from previous build steps
const rawSourceIndex = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const distIndex = fs.readFileSync(indexHtmlTemplatePath, 'utf8');

// Extract site-wide Organization & WebSite schemas strictly from source index.html
const siteWideSchemasMatches = rawSourceIndex.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gis) || [];
const siteWideSchemasHtml = siteWideSchemasMatches.join('\n  ');

// Helper to cleanly replace #root inner contents without leaving residual DOM elements
const replaceRootElement = (htmlSource, newInnerHtml, renderedRouteAttr) => {
  const startMatch = htmlSource.match(/<div\s+id=["']root["'][^>]*>/i);
  if (!startMatch || startMatch.index === undefined) {
    return htmlSource;
  }
  const startIdx = startMatch.index;
  const scriptOrBodyMatch = htmlSource.slice(startIdx).match(/(<script\b|<\/body>)/i);
  if (scriptOrBodyMatch && scriptOrBodyMatch.index !== undefined) {
    const segment = htmlSource.slice(startIdx, startIdx + scriptOrBodyMatch.index);
    const lastCloseDivIdx = segment.lastIndexOf('</div>');
    if (lastCloseDivIdx !== -1) {
      const endIdx = startIdx + lastCloseDivIdx + '</div>'.length;
      const attrStr = renderedRouteAttr ? ` data-rendered-route="${renderedRouteAttr}"` : '';
      const newRoot = `<div id="root"${attrStr}>${newInnerHtml}</div>`;
      return htmlSource.slice(0, startIdx) + newRoot + htmlSource.slice(endIdx);
    }
  }
  const attrStr = renderedRouteAttr ? ` data-rendered-route="${renderedRouteAttr}"` : '';
  return htmlSource.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root"${attrStr}>${newInnerHtml}</div>`);
};

// Helper to strip any existing canonical tags to prevent hardcoded homepage leakage
const stripCanonicalTags = (htmlSource) => {
  if (!htmlSource) return htmlSource;
  return htmlSource
    .replace(/<link\b[^>]*\brel=["']?canonical["']?[^>]*\/?>/gis, '')
    .replace(/<link\b[^>]*\bhref=[^>]*\brel=["']?canonical["']?[^>]*\/?>/gis, '')
    .replace(/<link\b[^>]*\brel=["']?canonical["']?[^>]*>[\s\S]*?<\/link>/gis, '');
};

// Base template with clean empty #root and stripped default tags to prevent any metadata leakage
let baseTemplate = distIndex;
baseTemplate = replaceRootElement(baseTemplate, '', '');
baseTemplate = stripCanonicalTags(baseTemplate);
baseTemplate = baseTemplate.replace(/<link\b[^>]*rel=["']alternate["'][^>]*hreflang=["'][^"']+["'][^>]*\/?>/gis, '');
baseTemplate = baseTemplate.replace(/<script\b[^>]*>[\s\S]*?dedupeHead[\s\S]*?<\/script>/gis, '');
baseTemplate = baseTemplate.replace(/<title\b[^>]*>[^<]*<\/title>/gi, '');
baseTemplate = baseTemplate.replace(/<meta\b[^>]*name=["']description["'][^>]*\/?>/gis, '');
baseTemplate = baseTemplate.replace(/<meta\b[^>]*property=["']og:[^"']+["'][^>]*\/?>/gis, '');
baseTemplate = baseTemplate.replace(/<meta\b[^>]*name=["']twitter:[^"']+["'][^>]*\/?>/gis, '');
baseTemplate = baseTemplate.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gis, '');
baseTemplate = baseTemplate.replace(/<meta\b[^>]*property=["']article:[^"']+["'][^>]*\/?>/gis, '');
baseTemplate = baseTemplate.replace(/<meta\b[^>]*name=["']keywords["'][^>]*\/?>/gis, '');
baseTemplate = baseTemplate.replace(/<meta\b[^>]*name=["']robots["'][^>]*\/?>/gis, '');

// Preserve a clean, unpopulated SPA shell with site-wide schemas for dynamic client-side routes (e.g. /admin)
const spaShellPath = path.join(distDir, 'spa-shell.html');
const spaShellDir = path.join(distDir, 'spa-shell');
const spaShellContent = siteWideSchemasHtml 
  ? baseTemplate.replace('</head>', `  ${siteWideSchemasHtml}\n</head>`)
  : baseTemplate;
fs.writeFileSync(spaShellPath, spaShellContent, 'utf8');
if (!fs.existsSync(spaShellDir)) {
  fs.mkdirSync(spaShellDir, { recursive: true });
}
fs.writeFileSync(path.join(spaShellDir, 'index.html'), spaShellContent, 'utf8');

// Pre-render rich custom 404.html with search, top services, contact CTA, homepage link, and noindex robots tag
try {
  const notFoundRender = renderFullApp('/404');
  let notFoundHtml = replaceRootElement(baseTemplate, notFoundRender.bodyHtml || '', '/404');
  notFoundHtml = stripCanonicalTags(notFoundHtml);
  const notFoundHead = [
    '  <title>404 Page Not Found | AbuQitmirLabs</title>',
    '  <meta name="description" content="The page you requested could not be found. Search AbuQitmirLabs services, engineering guides, or book a technical discovery call." />',
    '  <meta name="robots" content="noindex, follow" />',
    '  <meta property="og:title" content="404 Page Not Found | AbuQitmirLabs" />',
    '  <meta property="og:description" content="The page you requested could not be found. Explore AbuQitmirLabs custom software, AI automation, and SEO services." />',
    '  <meta property="og:type" content="website" />'
  ].join('\n');
  notFoundHtml = notFoundHtml.replace('</head>', `${notFoundHead}\n</head>`);
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf8');
  fs.writeFileSync(path.join(rootDir, 'public', '404.html'), notFoundHtml, 'utf8');
  console.log('✓ [SSG Rendered] /404 -> dist/404.html (Custom 404 with noindex, follow)');
} catch (err404) {
  console.warn('⚠️ [SSG Warning] Fallback 404 generation warning:', err404);
  fs.writeFileSync(path.join(distDir, '404.html'), spaShellContent, 'utf8');
}

const TITLE_OVERRIDES = {
  '/': 'Growth Engineering Firm | Custom Software, AI & SEO | AbuQitmirLabs',
  '/blog/ai-integration-with-legacy-systems-the-complete-2026-guide':
    'AI in Enterprise Software: 2026 Guide | AbuQitmirLabs',
  '/blog/flutter-vs-react-native-choosing-mobile-app-stack-2026':
    'Flutter vs React Native: Which Is Better in 2026?',
  '/blog/offshore-software-development-saudi-arabia':
    'Offshore Software Development Saudi Arabia: Save 40–60%',
  '/case-studies/tajweedpage':
    'TajweedPage Case Study: AI EdTech & SEO | AbuQitmirLabs',
  '/contact': 'Contact & Book a Discovery Call | AbuQitmirLabs',
  '/privacy': 'Privacy Policy & Data Protection | AbuQitmirLabs',
  '/terms': 'Terms of Service & IP Ownership | AbuQitmirLabs',
  '/about/our-process': 'Our 5-Step Software Delivery Process | AbuQitmirLabs',
  '/web-development': 'Custom Web Application Development | AbuQitmirLabs',
  '/blog/offshore-ai-agent-development-partner-uae':
    'Offshore AI Agent Development Partner UAE | AbuQitmirLabs',
  '/blog/brand-refresh-vs-rebrand':
    'Brand Refresh vs Rebrand Pakistan | AbuQitmirLabs',
  '/local-seo-for-small-business': 'Local SEO Services for Small Business | AbuQitmirLabs',
};

function formatConciseTitle(rawTitle, pathname) {
  const normPath = pathname
    ? pathname.endsWith('/') && pathname !== '/'
      ? pathname.slice(0, -1)
      : pathname
    : '';
  if (normPath && TITLE_OVERRIDES[normPath]) {
    return TITLE_OVERRIDES[normPath];
  }
  const cleaned = String(rawTitle || '')
    .trim()
    .replace(/^(?:&quot;|["'“”`])+|(?:&quot;|["'“”`])+$/gi, '')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return 'Growth Engineering Firm | Custom Software, AI & SEO | AbuQitmirLabs';
  if (cleaned.length <= 60) return cleaned;

  const core = cleaned
    .replace(/\s*[|–—-]\s*Abu\s*Qitmir\s*Labs(?:\s*\.?\s*TECH)?.*$/i, '')
    .trim();

  const withBrand = `${core} | AbuQitmirLabs`;
  if (withBrand.length <= 60) return withBrand;

  const colonParts = core.split(/\s*[:—–]\s*/);
  if (colonParts.length > 1 && colonParts[0].trim().length >= 16) {
    const firstPart = colonParts[0].trim();
    const firstWithBrand = `${firstPart} | AbuQitmirLabs`;
    if (firstWithBrand.length <= 60) return firstWithBrand;
    if (firstPart.length <= 60 && firstPart.length >= 30) return firstPart;
  }

  if (core.length <= 60) return core;

  const maxCoreWithBrand = 44;
  const words = core.split(' ');
  let acc = '';
  for (const w of words) {
    const next = acc ? `${acc} ${w}` : w;
    if (next.length <= maxCoreWithBrand) {
      acc = next;
    } else {
      break;
    }
  }
  acc = acc.replace(/[,;:\-–—&]+$/, '').trim();
  if (acc.length >= 22) {
    return `${acc} | AbuQitmirLabs`;
  }

  let standalone = '';
  for (const w of words) {
    const next = standalone ? `${standalone} ${w}` : w;
    if (next.length <= 58) {
      standalone = next;
    } else {
      break;
    }
  }
  return standalone.replace(/[,;:\-–—&]+$/, '').trim() || core.slice(0, 57).trim();
}

const routes = [
  '/',
  '/growth-engineering',
  '/about',
  '/about/our-company',
  '/about/our-team',
  '/about/our-process',
  '/about/careers',
  '/solutions/fintech',
  '/solutions/healthcare',
  '/solutions/ai-automation',
  '/solutions/e-commerce',
  '/solutions/edtech',
  '/solutions/fintech/web-development',
  '/solutions/healthcare/mobile-app-development',
  '/solutions/ecommerce/custom-software',
  '/solutions/ai-automation/enterprise-engineering',
  '/news/all',
  '/news/latest',
  '/news/press-releases',
  '/news/industry-insights',
  '/news/article/google-ai-dogfooding-enterprise-results',
  '/news/article/ai-rag-framework-launch',
  '/news/article/us-uk-expansion-q3',
  '/news/article/generative-engine-optimization-geo-strategy',
  '/news/article/hipaa-cloud-certification',
  '/news/article/sub-200ms-rag-pipelines',
  '/custom-software',
  '/mobile-app-development',
  '/web-development',
  '/ai-agent-development',
  '/ai-video-creation',
  '/seo-mastery',
  '/digital-marketing',
  '/local-seo-for-small-business',
  '/local-seo-citation-building',
  '/white-label-local-seo',
  '/local-seo-audit',
  '/guest-post-service',
  '/graphics-design',
  '/content-writing',
  '/contact',
  '/us-market',
  '/saudi-arabia-market',
  '/uae-market',
  '/qatar-market',
  '/kuwait-market',
  '/uk-market',
  '/pakistan-market',
  '/canada-market',
  '/poland-market',
  '/australia-market',
  '/terms',
  '/privacy',
  '/blog',
  '/case-studies',
  '/case-studies/tajweedpage',
  '/website-contract',
  '/brand-assets',
  '/brand-building',
  '/skills-academy',
  '/luxury-brand-experience',
  '/tools',
  '/tools/project-cost-estimator',
  '/tools/website-audit',
  '/tools/seo-checklist',
  '/tools/ai-readiness-score',
  '/tools/tech-stack-recommender',
  '/tools/website-authority-analyzer',
  '/editorial-policy',
  '/news/industry-insights/google-ai-dogfooding-enterprise-results',
  '/blog/ai-is-quietly-stealing-your-ability-to-think',
  '/blog/brand-identity-vs-logo-design',
  '/blog/rag-ai-integration-for-startups',
  '/blog/agentic-ai-production-failures',
  '/blog/custom-web-development-company',
  '/blog/custom-web-development-vs-website-templates-2026-guide',
  '/blog/custom-ai-solutions-for-corporate-events-2026-guide',
  '/blog/local-business-visibility-2026-seo-geo-aio-aeo-sxo',
  '/blog/what-seo-services-actually-mean-in-2026-abuqitmirlabs',
  '/blog/how-to-choose-a-mobile-app-development-company-2026',
  '/blog/custom-ai-solutions-for-fintech-2026-fraud-detection-underwriting',
  '/blog/what-are-healthcare-ai-agents-complete-guide-2026',
  '/blog/the-go-to-guide-ai-agent-development-agency-vs-in-house',
  '/blog/generative-ai-chatbot-development-what-it-actually-costs-in-2026',
  '/blog/semantic-seo-strategy-the-complete-2026-framework-abuqitmirlabs',
  '/blog/fintech-software-development-compliance-first-architecture',
  '/blog/offshore-software-development-usa-due-diligence-checklist',
  '/blog/healthcare-software-development-hipaa-ready-from-day-one',
  '/blog/healthcare-software-development-solutions-2026-custom-ehr-clinical-software',
  '/blog/bespoke-saas-development-build-vs-buy-decision-guide',
  '/blog/local-seo-citation-building-the-15-directory-checklist',
  '/blog/ecommerce-platform-development',
  '/blog/enterprise-software-engineering-what-changes-at-scale',
  '/blog/edtech-software-development',
  '/blog/flutter-vs-react-native-choosing-mobile-app-stack-2026',
  '/blog/app-development-agency-uk-what-to-ask-before-you-sign-2026',
  '/blog/high-performance-web-applications-12-engineering-decisions',
  '/blog/native-mobile-app-development-ios-vs-android-cost',
  '/blog/tailor-made-software-solutions-when-off-the-shelf-fails',
  '/blog/what-a-local-seo-audit-actually-checks-2026-complete-guide',
  '/blog/programmatic-seo-how-we-scaled-tajweedpage',
  '/blog/ai-overviews-traffic-recovery-what-40-companies-did-next',
  '/blog/the-pakistan-advantage-why-us-startups-are-moving-dev-teams-offshore-2026',
  '/blog/saas-pricing-page-optimization-7-structural-decisions',
  '/blog/flutter-vs-native-mobile-app-development-2026',
  '/blog/ai-agent-development-agency-vs-in-house',
  '/blog/ai-agents-cost-benefit-analysis',
  '/blog/when-to-invest-in-ai-agent',
  '/blog/the-2026-static-site-comeback-why-jamstack-won-after-all',
  '/blog/fix-url-fragmentation-in-headless-spas-abuqitmirlabs',
  '/blog/the-hidden-cost-of-cheap-hosting-performance-seo-revenue-impact',
  '/blog/5-minute-technical-audit-for-founders',
  '/blog/mvp-to-scale-a-non-technical-founders-roadmap-for-version-20-2026',
  '/blog/the-non-technical-founders-guide-to-software-ownership-ip-2026',
  '/blog/performance-marketing-vs-brand-marketing-a-budget-allocation-framework-for-startups',
  '/blog/digital-marketing-stack-2026',
  '/blog/guest-posting-in-2026-what-works-abuqitmirlabs',
  '/blog/measure-marketing-roi-without-tracking',
  '/blog/ui-ux-design-conversion',
  '/blog/how-to-brief-graphic-designer',
  '/blog/seo-content-vs-thought-leadership',
  '/blog/content-brief-template',
  '/blog/small-business-branding-mistakes-pakistan',
  '/blog/content-calendar-strategy',
  '/blog/brand-strategy-vs-logo-design-pakistan-sme',
  '/blog/ai-content-vs-human-content',
  '/blog/brand-refresh-vs-rebrand',
  '/blog/custom-software-development-qatar'
];

const stripOuterQuotes = (str) =>
  String(str || '')
    .trim()
    .replace(/^(?:&quot;|["'“”])+|(?:&quot;|["'“”])+$/gi, '')
    .trim();

// Dynamically discover all articles from content/blog/*.md so new posts are always prerendered with full H1/H2 SSR
const contentBlogDir = path.join(rootDir, 'content', 'blog');
const blogMarkdownRoutes = [];
if (fs.existsSync(contentBlogDir)) {
  const mdFiles = fs.readdirSync(contentBlogDir).filter(f => f.endsWith('.md'));
  for (const file of mdFiles) {
    try {
      const fileContent = fs.readFileSync(path.join(contentBlogDir, file), 'utf8');
      const slugMatch = fileContent.match(/["']slug["']\s*:\s*["']([^"']+)["']/);
      const articleSlug = slugMatch && slugMatch[1] ? slugMatch[1] : file.replace(/\.md$/, '');
      const canonicalSlug = getCanonicalSlug(articleSlug.trim());
      const blogRoute = `/blog/${canonicalSlug}`;
      if (!routes.includes(blogRoute)) {
        blogMarkdownRoutes.push(blogRoute);
      }

      // Ensure STATIC_BLOG_POSTS has this markdown post so BlogPostPage renders full H1/H2 SSR instead of loading skeleton
      if (STATIC_BLOG_POSTS && !STATIC_BLOG_POSTS[canonicalSlug]) {
        const fmMatch = fileContent.match(/^---\s*\r?\n(\{[\s\S]*?\})\r?\n---\s*\r?\n([\s\S]*)$/);
        if (fmMatch) {
          const parsedMeta = JSON.parse(fmMatch[1]);
          const mdBody = fmMatch[2].trim();
          STATIC_BLOG_POSTS[canonicalSlug] = {
            id: `static-${canonicalSlug}`,
            title: parsedMeta.title || canonicalSlug,
            slug: canonicalSlug,
            metaDescription: stripOuterQuotes(parsedMeta.metaDescription || parsedMeta.excerpt || ''),
            excerpt: stripOuterQuotes(parsedMeta.excerpt || parsedMeta.metaDescription || ''),
            content: mdBody,
            author: parsedMeta.author || 'Abu Qitmir Mohammad Shiraz Al-Madani',
            category: canonicalSlug === 'ai-content-vs-human-content' ? 'Content Writing' : (parsedMeta.category || 'Content Writing'),
            published: parsedMeta.published !== false,
            coverImage: parsedMeta.coverImage || 'https://www.abuqitmirlabs.tech/logo.png',
            coverImageAlt: parsedMeta.coverImageAlt || parsedMeta.title || '',
            tags: Array.isArray(parsedMeta.tags) ? parsedMeta.tags : [],
            createdAt: parsedMeta.publishedAt ? `${parsedMeta.publishedAt}T10:00:00.000Z` : new Date().toISOString()
          };
        }
      }
    } catch (e) {}
  }
}

// Discover routes from public/sitemap.xml so 100% of sitemap URLs are prerendered
const sitemapRoutes = [];
try {
  const pubSitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
  if (fs.existsSync(pubSitemapPath)) {
    const smRaw = fs.readFileSync(pubSitemapPath, 'utf8');
    const locMatches = smRaw.matchAll(/<loc>\s*https?:\/\/[^/<]+(\/[^<]*?)\s*<\/loc>/gi);
    for (const m of locMatches) {
      const p = (m[1] || '/').trim();
      const normP = p.endsWith('/') && p !== '/' ? p.slice(0, -1) : p;
      if (normP && normP !== '/local-seo/small-business' && normP !== '/local-seo-small-business' && normP !== '/local-seo-services') {
        sitemapRoutes.push(normP);
      }
    }
  }
} catch (e) {}

// Also discover all canonical blog posts from STATIC_BLOG_POSTS
const staticBlogRoutes = Object.keys(STATIC_BLOG_POSTS || {})
  .map(slug => getCanonicalSlug(slug.trim()))
  .filter(Boolean)
  .map(slug => `/blog/${slug}`);

const REDIRECT_ALIAS_PATHS = new Set([
  '/admin',
  '/brand-kit',
  '/careers',
  '/our-company',
  '/our-process',
  '/our-team',
  '/custom-software-development',
  '/custom-ai-solutions-for-corporate-events-2026-guide',
  '/custom-web-development-vs-website-templates-2026-guide',
  '/local-seo/small-business',
  '/local-seo-small-business',
  '/local-seo-services'
]);

// Ensure no stale prerendered 404 files exist for /admin or alias routes
for (const aliasRoute of REDIRECT_ALIAS_PATHS) {
  const cleanAlias = aliasRoute.replace(/^\//, '');
  const aliasDir = path.join(distDir, cleanAlias);
  const aliasHtml = path.join(distDir, `${cleanAlias}.html`);
  if (fs.existsSync(aliasDir)) {
    fs.rmSync(aliasDir, { recursive: true, force: true });
  }
  if (fs.existsSync(aliasHtml)) {
    fs.rmSync(aliasHtml, { force: true });
  }
}

// Merge explicitly defined routes with markdown routes, STATIC_BLOG_POSTS, sitemap routes, and SEO_ROUTES_METADATA
const allRoutes = Array.from(new Set([
  ...routes,
  ...blogMarkdownRoutes,
  ...staticBlogRoutes,
  ...sitemapRoutes,
  ...Object.keys(SEO_ROUTES_METADATA || {}).filter(k => typeof k === 'string' && k.startsWith('/'))
])).filter(r => {
  const norm = r.endsWith('/') && r !== '/' ? r.slice(0, -1) : r;
  if (REDIRECT_ALIAS_PATHS.has(norm) || norm.startsWith('/admin/')) return false;
  if (norm.startsWith('/blog/')) {
    const s = norm.slice(6);
    return getCanonicalSlug(s) === s;
  }
  return true;
});

let successCount = 0;

for (const routeUrl of allRoutes) {
  try {
    const { bodyHtml, headTags, jsonLdScripts, helmet } = renderFullApp(routeUrl);
    if (
      !/<h1\b[^>]*>/i.test(bodyHtml || '') ||
      (bodyHtml && (bodyHtml.includes('HTTP 404 — Resource Not Found') || bodyHtml.includes('>Page Not Found<')))
    ) {
      console.warn(`⚠️ [SSG Guard] Skipping overwrite for ${routeUrl} because SSR output lacked valid <h1> or rendered 404 NotFoundPage.`);
      continue;
    }
    
    let html = baseTemplate;

    // 1. Inject pure, clean React SSR DOM tree inside #root with explicit route identifier
    html = replaceRootElement(html, bodyHtml, routeUrl);

    // 2. Unconditionally strip ANY pre-existing <title>, <meta description>, canonical, og, and twitter tags from template
    html = html.replace(/<title\b[^>]*>[^<]*<\/title>/gi, '');
    html = html.replace(/<meta\b[^>]*name=["']description["'][^>]*\/?>/gis, '');
    html = html.replace(/<meta\b[^>]*name=["']robots["'][^>]*\/?>/gis, '');
    html = html.replace(/<meta\b[^>]*property=["']og:[^"']+["'][^>]*\/?>/gis, '');
    html = html.replace(/<meta\b[^>]*name=["']twitter:[^"']+["'][^>]*\/?>/gis, '');
    html = stripCanonicalTags(html);

    // 3. Inject hoisted head tags directly from SSR
    if (headTags && headTags.trim().length > 0) {
      const formattedHeadTags = headTags.replace(/\s+data-rh=["'][^"']*["']/gi, '');
      html = html.replace('</head>', `  ${formattedHeadTags}\n</head>`);
    }

    // 4. Resolve fallback metadata for routes
    const normalizedRoute = routeUrl.endsWith('/') && routeUrl !== '/' ? routeUrl.slice(0, -1) : routeUrl;
    let seo = (SEO_ROUTES_METADATA && (
      SEO_ROUTES_METADATA[routeUrl] ||
      SEO_ROUTES_METADATA[normalizedRoute] ||
      SEO_ROUTES_METADATA[`${normalizedRoute}/`]
    )) || (
      SEO_ROUTES_METADATA && Object.entries(SEO_ROUTES_METADATA).find(([k]) => {
        const normK = k.endsWith('/') && k !== '/' ? k.slice(0, -1) : k;
        return normK === normalizedRoute;
      })?.[1]
    );

    // If blog route is not in SEO_ROUTES_METADATA, automatically pull clean metadata from content/blog/*.md
    if (!seo && routeUrl.startsWith('/blog/')) {
      const blogSlug = routeUrl.replace(/^\/blog\//, '').replace(/\/$/, '');
      const mdFile = path.join(contentBlogDir, `${blogSlug}.md`);
      if (fs.existsSync(mdFile)) {
        try {
          const rawMd = fs.readFileSync(mdFile, 'utf8');
          const m = rawMd.match(/---[\s\S]*?\{([\s\S]*?)\}[\s\S]*?---/);
          if (m) {
            const parsedMeta = JSON.parse(`{${m[1]}}`);
            let postDesc = stripOuterQuotes(parsedMeta.metaDescription || parsedMeta.excerpt || '');
            if (postDesc.length > 165) {
              const cut = postDesc.slice(0, 160);
              const lastSp = cut.lastIndexOf(' ');
              postDesc = (lastSp > 110 ? cut.slice(0, lastSp) : cut).trim() + '...';
            }
            seo = {
              title: parsedMeta.title ? (parsedMeta.title.includes('AbuQitmirLabs') ? parsedMeta.title : `${parsedMeta.title} | AbuQitmirLabs`) : 'AbuQitmirLabs Journal',
              description: postDesc,
              canonical: `https://www.abuqitmirlabs.tech/blog/${blogSlug}`,
              ogTitle: parsedMeta.title,
              ogDescription: postDesc,
              ogImage: parsedMeta.coverImage || 'https://www.abuqitmirlabs.tech/logo.png',
              ogType: 'article'
            };
          }
        } catch (e) {}
      }
    }

    // Compute canonical URL: Every route MUST have its own URL as canonical
    const cleanPath = routeUrl === '/' ? '/' : (routeUrl.startsWith('/') ? routeUrl : `/${routeUrl}`);
    let canonicalUrl;
    if (cleanPath === '/') {
      canonicalUrl = 'https://www.abuqitmirlabs.tech/';
    } else {
      if (seo && seo.canonical && seo.canonical !== 'https://www.abuqitmirlabs.tech/' && seo.canonical !== 'https://www.abuqitmirlabs.tech') {
        canonicalUrl = seo.canonical;
      } else {
        canonicalUrl = `https://www.abuqitmirlabs.tech${cleanPath}`;
      }
    }

    const rawTitleToUse = (seo && seo.title) || 'Growth Engineering Firm | Custom Software, AI & SEO | AbuQitmirLabs';
    const titleToUse = formatConciseTitle(rawTitleToUse, routeUrl);

    // Always enforce concise <title> tag
    const escapedTitle = titleToUse.replace(/&/g, '&amp;');
    if (!/<title\b/i.test(html)) {
      html = html.replace('</head>', `  <title>${escapedTitle}</title>\n</head>`);
    } else {
      html = html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, `<title>${escapedTitle}</title>`);
    }

    // If meta description was not already injected, inject it now
    if (!/<meta\b[^>]*name=["']description["']/i.test(html) && seo && seo.description) {
      const escapedDesc = stripOuterQuotes(seo.description).replace(/"/g, '&quot;');
      html = html.replace('</head>', `  <meta name="description" content="${escapedDesc}" />\n</head>`);
    }

    // If meta robots was not already injected, inject it now
    if (!/<meta\b[^>]*name=["']robots["']/i.test(html)) {
      const robotsContent = (seo && seo.robots) || "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
      html = html.replace('</head>', `  <meta name="robots" content="${robotsContent}" />\n</head>`);
    }

    // If canonical was not already injected, inject it now
    if (!/<link\b[^>]*\brel=["']?canonical["']?/i.test(html)) {
      html = html.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
    }

    // Deduplicate any hreflang alternate links so each hreflang appears at most once
    const seenHreflangs = new Set();
    html = html.replace(/<link\b[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*\/?>/gis, (tag, lang) => {
      const lower = lang.toLowerCase();
      if (seenHreflangs.has(lower)) return '';
      seenHreflangs.add(lower);
      return tag;
    });

    // If OpenGraph tags were not already injected, inject them
    if (!/<meta\b[^>]*property=["']og:title["']/i.test(html)) {
      const ogTitle = (seo && (seo.ogTitle || seo.title)) || titleToUse;
      const escapedOgTitle = ogTitle.replace(/"/g, '&quot;');
      html = html.replace('</head>', `  <meta property="og:title" content="${escapedOgTitle}" />\n</head>`);
    }
    if (!/<meta\b[^>]*property=["']og:description["']/i.test(html) && seo && (seo.ogDescription || seo.description)) {
      const ogDesc = stripOuterQuotes(seo.ogDescription || seo.description);
      const escapedOgDesc = ogDesc.replace(/"/g, '&quot;');
      html = html.replace('</head>', `  <meta property="og:description" content="${escapedOgDesc}" />\n</head>`);
    }
    if (!/<meta\b[^>]*property=["']og:url["']/i.test(html)) {
      html = html.replace('</head>', `  <meta property="og:url" content="${canonicalUrl}" />\n</head>`);
    }
    if (!/<meta\b[^>]*property=["']og:type["']/i.test(html)) {
      html = html.replace('</head>', `  <meta property="og:type" content="${(seo && seo.ogType) || 'website'}" />\n</head>`);
    }
    if (!/<meta\b[^>]*property=["']og:image["']/i.test(html) && seo && seo.ogImage) {
      const altText = seo.ogImageAlt || "AbuQitmirLabs Custom Software & AI Development Studio";
      html = html.replace('</head>', `  <meta property="og:image" content="${seo.ogImage}" />\n  <meta property="og:image:alt" content="${altText.replace(/"/g, '&quot;')}" />\n</head>`);
    }

    // If Twitter tags were not already injected, inject them
    if (!/<meta\b[^>]*name=["']twitter:card["']/i.test(html)) {
      const twTitle = (seo && (seo.twitterTitle || seo.title)) || titleToUse;
      const twDesc = stripOuterQuotes((seo && (seo.twitterDescription || seo.description)) || '');
      const twImage = (seo && seo.ogImage) || 'https://www.abuqitmirlabs.tech/logo.png';
      html = html.replace('</head>', `  <meta name="twitter:card" content="summary_large_image" />\n  <meta name="twitter:title" content="${(twTitle || '').replace(/"/g, '&quot;')}" />\n  <meta name="twitter:description" content="${(twDesc || '').replace(/"/g, '&quot;')}" />\n  <meta name="twitter:image" content="${twImage}" />\n</head>`);
    }

    // 5. Inject Schema.org JSON-LD into <head> (strictly one unified @graph block when available)
    html = html.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gis, '');

    const schemasToInject = [];

    // A. Prefer React SSR jsonLdScripts when it has a comprehensive @graph (e.g. HomePage with FAQPage, Services, VideoObjects)
    if (Array.isArray(jsonLdScripts) && jsonLdScripts.length > 0) {
      for (const scriptTag of jsonLdScripts) {
        const formattedTag = scriptTag.trim().replace(/\s+data-rh=["'][^"']*["']/gi, '');
        schemasToInject.push(formattedTag);
      }
    }

    // B. Fallback to schemaJsonLd from SEO_ROUTES_METADATA if SSR did not emit one
    if (schemasToInject.length === 0 && seo && seo.schemaJsonLd) {
      schemasToInject.push(`<script id="canonical-schema-graph" type="application/ld+json">\n${JSON.stringify(seo.schemaJsonLd, null, 2)}\n  </script>`);
    }

    // C. Include helmet.script if no schema was captured yet
    if (schemasToInject.length === 0 && helmet && helmet.script) {
      const helmetScripts = helmet.script.toString();
      if (helmetScripts && helmetScripts.includes('application/ld+json')) {
        const hMatches = helmetScripts.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gis) || [];
        for (const hTag of hMatches) {
          const formattedTag = hTag.trim().replace(/\s+data-rh=["'][^"']*["']/gi, '');
          schemasToInject.push(formattedTag);
        }
      }
    }

    // D. Fallback to site-wide Organization & WebSite schemas only if no route schema exists
    if (schemasToInject.length === 0 && siteWideSchemasHtml) {
      schemasToInject.push(siteWideSchemasHtml.replace(/\s+data-rh=["'][^"']*["']/gi, ''));
    }

    // Deduplicate schemas: if any schema has @graph, keep strictly that single unified @graph script
    let uniqueSchemas = Array.from(new Set(schemasToInject.map(s => s.trim()))).filter(Boolean);
    if (uniqueSchemas.length > 1) {
      const graphSchema = uniqueSchemas.find(s => s.includes('"@graph"'));
      if (graphSchema) {
        uniqueSchemas = [graphSchema];
      }
    }
    if (uniqueSchemas.length > 0) {
      html = html.replace('</head>', `  ${uniqueSchemas.join('\n  ')}\n</head>`);
    }

    // 6. STRICT SINGLE-PASS DEDUPLICATION GUARANTEE
    // A. Title: strictly ONE <title>
    const titleMatches = html.match(/<title\b[^>]*>[^<]*<\/title>/gis) || [];
    if (titleMatches.length > 1) {
      let keepIndex = 0;
      const targetIdx = titleMatches.findIndex(t => t.includes(titleToUse));
      if (targetIdx !== -1) keepIndex = targetIdx;
      let curTitleIdx = 0;
      html = html.replace(/<title\b[^>]*>[^<]*<\/title>/gis, (tag) => {
        const keep = curTitleIdx === keepIndex;
        curTitleIdx++;
        return keep ? tag.replace(/\s+data-rh=["'][^"']*["']/gi, '') : '';
      });
    }

    // B. Meta Description: strictly ONE <meta name="description"> and strip any literal surrounding quotes (&quot;)
    const metaDescMatches = html.match(/<meta\b[^>]*name=["']description["'][^>]*\/?>/gis) || [];
    if (metaDescMatches.length > 1) {
      let keepIndex = 0;
      let currentIndex = 0;
      html = html.replace(/<meta\b[^>]*name=["']description["'][^>]*\/?>/gis, (tag) => {
        const keep = currentIndex === keepIndex;
        currentIndex++;
        return keep ? tag.replace(/\s+data-rh=["'][^"']*["']/gi, '') : '';
      });
    }
    html = html.replace(
      /(<meta\b[^>]*name=["'](?:description|twitter:description)["'][^>]*content=["'])(?:&quot;|["'“”])+([\s\S]*?)(?:&quot;|["'“”])+(["'][^>]*\/?>)/gis,
      '$1$2$3'
    );
    html = html.replace(
      /(<meta\b[^>]*property=["']og:description["'][^>]*content=["'])(?:&quot;|["'“”])+([\s\S]*?)(?:&quot;|["'“”])+(["'][^>]*\/?>)/gis,
      '$1$2$3'
    );

    // C. Meta Robots: strictly ONE <meta name="robots">
    const robotsMatches = html.match(/<meta\b[^>]*name=["']robots["'][^>]*\/?>/gis) || [];
    if (robotsMatches.length > 1) {
      let keepIndex = 0;
      let curRobotsIdx = 0;
      html = html.replace(/<meta\b[^>]*name=["']robots["'][^>]*\/?>/gis, (tag) => {
        const keep = curRobotsIdx === keepIndex;
        curRobotsIdx++;
        return keep ? tag.replace(/\s+data-rh=["'][^"']*["']/gi, '') : '';
      });
    }

    // D. Canonical Link: strictly ONE <link rel="canonical">
    const canonMatches = html.match(/<link\b[^>]*\brel=["']?canonical["']?[^>]*\/?>/gis) || [];
    if (canonMatches.length > 1) {
      let keepIndex = 0;
      const exactTargetIdx = canonMatches.findIndex(c => c.includes(canonicalUrl));
      if (exactTargetIdx !== -1) keepIndex = exactTargetIdx;
      let curCanonIdx = 0;
      html = html.replace(/<link\b[^>]*\brel=["']?canonical["']?[^>]*\/?>/gis, (tag) => {
        const keep = curCanonIdx === keepIndex;
        curCanonIdx++;
        return keep ? tag.replace(/\s+data-rh=["'][^"']*["']/gi, '') : '';
      });
    }

    // E. OpenGraph tags: strictly ONE of each property (og:title, og:description, og:url, og:image, etc.)
    const seenOgProps = new Set();
    html = html.replace(/<meta\b[^>]*property=["'](og:[^"']+)["'][^>]*\/?>/gis, (tag, prop) => {
      const lower = prop.toLowerCase();
      if (seenOgProps.has(lower)) {
        return '';
      }
      seenOgProps.add(lower);
      return tag.replace(/\s+data-rh=["'][^"']*["']/gi, '');
    });

    // F. Twitter tags: strictly ONE of each name (twitter:card, twitter:title, twitter:description, twitter:image, etc.)
    const seenTwNames = new Set();
    html = html.replace(/<meta\b[^>]*name=["'](twitter:[^"']+)["'][^>]*\/?>/gis, (tag, name) => {
      const lower = name.toLowerCase();
      if (seenTwNames.has(lower)) {
        return '';
      }
      seenTwNames.add(lower);
      return tag.replace(/\s+data-rh=["'][^"']*["']/gi, '');
    });

    // G. Article meta tags: strictly ONE of each property (article:published_time, article:author, etc.)
    const seenArtProps = new Set();
    html = html.replace(/<meta\b[^>]*property=["'](article:[^"']+)["'][^>]*\/?>/gis, (tag, prop) => {
      const lower = prop.toLowerCase();
      if (seenArtProps.has(lower)) {
        return '';
      }
      seenArtProps.add(lower);
      return tag.replace(/\s+data-rh=["'][^"']*["']/gi, '');
    });

    // Strip any remaining data-rh="true" attributes
    html = html.replace(/\s+data-rh=["'][^"']*["']/gi, '');

    // Verify that Vite's compiled CSS and JS bundle tags are intact before writing
    if (!/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']\/assets\//i.test(html) || !/<script\b[^>]*src=["']\/assets\//i.test(html)) {
      throw new Error(`Critical asset tags (<link rel="stylesheet"> or <script src="/assets/...">) missing in generated HTML for ${routeUrl}`);
    }

    // Write to target destination
    if (routeUrl === '/') {
      fs.writeFileSync(indexHtmlTemplatePath, html, 'utf8');
    } else {
      const cleanRoute = routeUrl.replace(/^\//, '');
      const targetDir = path.join(distDir, cleanRoute);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');

      // Mirror blog prerendered HTML into public/blog/<slug>/index.html for static edge serving
      if (cleanRoute.startsWith('blog/')) {
        const publicTargetDir = path.join(rootDir, 'public', cleanRoute);
        if (!fs.existsSync(publicTargetDir)) {
          fs.mkdirSync(publicTargetDir, { recursive: true });
        }
        fs.writeFileSync(path.join(publicTargetDir, 'index.html'), html, 'utf8');
      }

      // Also write cleanRoute.html for Vercel cleanUrls: true direct static match
      const htmlFilePath = path.join(distDir, `${cleanRoute}.html`);
      const htmlFileParent = path.dirname(htmlFilePath);
      if (!fs.existsSync(htmlFileParent)) {
        fs.mkdirSync(htmlFileParent, { recursive: true });
      }
      fs.writeFileSync(htmlFilePath, html, 'utf8');
    }

    successCount++;
    console.log(`✓ [SSG Rendered] ${routeUrl} -> Canonical: ${canonicalUrl}`);
  } catch (err) {
    console.error(`⚠️ [SSG Warning] Failed to render route ${routeUrl}:`, err);
  }
}

// 4. Cleanup temporary ssr-bundle
try {
  if (fs.existsSync(ssrBundlePath)) {
    fs.unlinkSync(ssrBundlePath);
  }
} catch (e) {
  // ignore
}

console.log(`✨ [AbuQitmirLabs SSG] Successfully pre-rendered ${successCount} routes with 100% React hydration fidelity!`);

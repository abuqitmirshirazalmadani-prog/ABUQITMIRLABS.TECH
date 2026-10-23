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
try {
  const ssrModule = require(ssrBundlePath);
  renderFullApp = ssrModule.renderFullApp;
  SEO_ROUTES_METADATA = ssrModule.SEO_ROUTES_METADATA || {};
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

// Extract built script/css tags from dist/index.html and merge with clean template
const scriptMatches = distIndex.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) || [];
const linkCssMatches = distIndex.match(/<link\b[^>]*rel=["']stylesheet["'][^>]*\/?>/gi) || [];

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
baseTemplate = baseTemplate.replace(/<script\b[^>]*>[\s\S]*?dedupeHead[\s\S]*?<\/script>/gis, '');
baseTemplate = baseTemplate.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
baseTemplate = baseTemplate.replace(/<meta\b[^>]*name=["']description["'][^>]*\/?>/gis, '');
baseTemplate = baseTemplate.replace(/<meta\b[^>]*property=["']og:[^"']+["'][^>]*\/?>/gis, '');
baseTemplate = baseTemplate.replace(/<meta\b[^>]*name=["']twitter:[^"']+["'][^>]*\/?>/gis, '');
baseTemplate = baseTemplate.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gis, '');
baseTemplate = baseTemplate.replace(/<meta\b[^>]*property=["']article:[^"']+["'][^>]*\/?>/gis, '');
baseTemplate = baseTemplate.replace(/<meta\b[^>]*name=["']keywords["'][^>]*\/?>/gis, '');
baseTemplate = baseTemplate.replace(/<meta\b[^>]*name=["']robots["'][^>]*\/?>/gis, '');

// Preserve a clean, unpopulated SPA shell with site-wide schemas for dynamic client-side routes
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

const routes = [
  '/',
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
  '/blog/e-commerce-platform-development-custom-build-vs-shopify-plus-2026',
  '/blog/enterprise-software-engineering-what-changes-at-scale',
  '/blog/edtech-software-development-lms-features-every-platform-needs',
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
  '/blog/generative-ai-chatbot-development-what-it-actually-costs-in-2026',
  '/blog/healthcare-software-development-solutions-2026-custom-ehr-clinical-software',
  '/blog/ai-agents-cost-benefit-analysis',
  '/blog/when-to-invest-in-an-ai-agent-in-2026-a-realistic-cost-benefit-analysis-for-founders',
  
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
  '/blog/content-brief-template'
];

// Dynamically discover all articles from content/blog/*.md so new posts are always prerendered
const contentBlogDir = path.join(rootDir, 'content', 'blog');
const blogMarkdownRoutes = [];
if (fs.existsSync(contentBlogDir)) {
  const mdFiles = fs.readdirSync(contentBlogDir).filter(f => f.endsWith('.md'));
  for (const file of mdFiles) {
    try {
      const fileContent = fs.readFileSync(path.join(contentBlogDir, file), 'utf8');
      const slugMatch = fileContent.match(/["']slug["']\s*:\s*["']([^"']+)["']/);
      const articleSlug = slugMatch && slugMatch[1] ? slugMatch[1] : file.replace(/\.md$/, '');
      const blogRoute = `/blog/${articleSlug.trim()}`;
      if (!routes.includes(blogRoute)) {
        blogMarkdownRoutes.push(blogRoute);
      }
    } catch (e) {}
  }
}

// Merge explicitly defined routes with markdown routes and SEO_ROUTES_METADATA
const allRoutes = Array.from(new Set([
  ...routes,
  ...blogMarkdownRoutes,
  ...Object.keys(SEO_ROUTES_METADATA || {}).filter(k => typeof k === 'string' && k.startsWith('/'))
]));

let successCount = 0;

for (const routeUrl of allRoutes) {
  try {
    const { bodyHtml, headTags, jsonLdScripts, helmet } = renderFullApp(routeUrl);
    
    let html = baseTemplate;

    // 1. Inject pure, clean React SSR DOM tree inside #root with explicit route identifier
    html = replaceRootElement(html, bodyHtml, routeUrl);

    // 2. Unconditionally strip ANY pre-existing <title>, <meta description>, canonical, og, and twitter tags from template
    html = html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
    html = html.replace(/<meta\b[^>]*name=["']description["'][^>]*\/?>/gis, '');
    html = html.replace(/<meta\b[^>]*name=["']robots["'][^>]*\/?>/gis, '');
    html = html.replace(/<meta\b[^>]*property=["']og:[^"']+["'][^>]*\/?>/gis, '');
    html = html.replace(/<meta\b[^>]*name=["']twitter:[^"']+["'][^>]*\/?>/gis, '');
    html = stripCanonicalTags(html);

    // 3. Inject hoisted head tags directly from React Helmet SSR
    // Ensure every element has data-rh="true" so client-side React Helmet updates them in-place during hydration
    if (headTags && headTags.trim().length > 0) {
      let formattedHeadTags = headTags;
      formattedHeadTags = formattedHeadTags.replace(/<(title|meta|link)\b([^>]*?)>/gis, (fullTag, tagName, attrs) => {
        if (attrs.includes('data-rh=')) return fullTag;
        return `<${tagName} data-rh="true"${attrs}>`;
      });
      html = html.replace('</head>', `  ${formattedHeadTags}\n</head>`);
    }

    // 4. Resolve fallback metadata for routes without Helmet
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
            let postDesc = parsedMeta.metaDescription || parsedMeta.excerpt || '';
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

    const titleToUse = (seo && seo.title) || 'AbuQitmirLabs | Custom Software, AI Agents & Mobile Development';

    // If title was not already injected via Helmet/headTags, inject it now with data-rh="true"
    if (!/<title\b/i.test(html)) {
      html = html.replace('</head>', `  <title data-rh="true">${titleToUse}</title>\n</head>`);
    }

    // If meta description was not already injected, inject it now with data-rh="true"
    if (!/<meta\b[^>]*name=["']description["']/i.test(html) && seo && seo.description) {
      const escapedDesc = seo.description.replace(/"/g, '&quot;');
      html = html.replace('</head>', `  <meta data-rh="true" name="description" content="${escapedDesc}" />\n</head>`);
    }

    // If meta robots was not already injected, inject it now with data-rh="true"
    if (!/<meta\b[^>]*name=["']robots["']/i.test(html)) {
      const robotsContent = (seo && seo.robots) || "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
      html = html.replace('</head>', `  <meta data-rh="true" name="robots" content="${robotsContent}" />\n</head>`);
    }

    // If canonical was not already injected, inject it now with data-rh="true"
    if (!/<link\b[^>]*\brel=["']?canonical["']?/i.test(html)) {
      html = html.replace('</head>', `  <link rel="canonical" data-rh="true" href="${canonicalUrl}" />\n</head>`);
    }

    // If OpenGraph tags were not already injected via Helmet, inject them with data-rh="true"
    if (!/<meta\b[^>]*property=["']og:title["']/i.test(html)) {
      const ogTitle = (seo && (seo.ogTitle || seo.title)) || titleToUse;
      const escapedOgTitle = ogTitle.replace(/"/g, '&quot;');
      html = html.replace('</head>', `  <meta data-rh="true" property="og:title" content="${escapedOgTitle}" />\n</head>`);
    }
    if (!/<meta\b[^>]*property=["']og:description["']/i.test(html) && seo && (seo.ogDescription || seo.description)) {
      const ogDesc = seo.ogDescription || seo.description;
      const escapedOgDesc = ogDesc.replace(/"/g, '&quot;');
      html = html.replace('</head>', `  <meta data-rh="true" property="og:description" content="${escapedOgDesc}" />\n</head>`);
    }
    if (!/<meta\b[^>]*property=["']og:url["']/i.test(html)) {
      html = html.replace('</head>', `  <meta data-rh="true" property="og:url" content="${canonicalUrl}" />\n</head>`);
    }
    if (!/<meta\b[^>]*property=["']og:type["']/i.test(html)) {
      html = html.replace('</head>', `  <meta data-rh="true" property="og:type" content="${(seo && seo.ogType) || 'website'}" />\n</head>`);
    }
    if (!/<meta\b[^>]*property=["']og:image["']/i.test(html) && seo && seo.ogImage) {
      const altText = seo.ogImageAlt || "AbuQitmirLabs Custom Software & AI Development Studio";
      html = html.replace('</head>', `  <meta data-rh="true" property="og:image" content="${seo.ogImage}" />\n  <meta data-rh="true" property="og:image:alt" content="${altText.replace(/"/g, '&quot;')}" />\n</head>`);
    }

    // If Twitter tags were not already injected via Helmet, inject them with data-rh="true"
    if (!/<meta\b[^>]*name=["']twitter:card["']/i.test(html)) {
      const twTitle = (seo && (seo.twitterTitle || seo.title)) || titleToUse;
      const twDesc = (seo && (seo.twitterDescription || seo.description)) || '';
      const twImage = (seo && seo.ogImage) || 'https://www.abuqitmirlabs.tech/logo.png';
      html = html.replace('</head>', `  <meta data-rh="true" name="twitter:card" content="summary_large_image" />\n  <meta data-rh="true" name="twitter:title" content="${(twTitle || '').replace(/"/g, '&quot;')}" />\n  <meta data-rh="true" name="twitter:description" content="${(twDesc || '').replace(/"/g, '&quot;')}" />\n  <meta data-rh="true" name="twitter:image" content="${twImage}" />\n</head>`);
    }

    // 5. Inject Schema.org JSON-LD into <head> (Site-wide Organization + WebSite, plus route-specific schemas)
    html = html.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gis, '');

    const schemasToInject = [];

    // A. Include site-wide Organization & WebSite schemas
    if (siteWideSchemasHtml) {
      schemasToInject.push(siteWideSchemasHtml);
    }

    // B. Include all route/page-specific schemas extracted from React component SSR
    if (Array.isArray(jsonLdScripts) && jsonLdScripts.length > 0) {
      for (const scriptTag of jsonLdScripts) {
        let formattedTag = scriptTag.trim();
        if (!formattedTag.includes('data-rh=')) {
          formattedTag = formattedTag.replace('<script', '<script data-rh="true"');
        }
        schemasToInject.push(formattedTag);
      }
    }

    // C. Include schemaJsonLd from SEO_ROUTES_METADATA if not already included
    if (seo && seo.schemaJsonLd) {
      const seoSchemaString = JSON.stringify(seo.schemaJsonLd);
      const alreadyPresent = schemasToInject.some(s => s.includes(seoSchemaString) || (seo.schemaJsonLd['@id'] && s.includes(seo.schemaJsonLd['@id'])));
      if (!alreadyPresent) {
        schemasToInject.push(`<script type="application/ld+json" data-rh="true">\n${JSON.stringify(seo.schemaJsonLd, null, 2)}\n  </script>`);
      }
    }

    // D. Include helmet.script if helmet captured any additional JSON-LD scripts
    if (helmet && helmet.script) {
      const helmetScripts = helmet.script.toString();
      if (helmetScripts && helmetScripts.includes('application/ld+json')) {
        const hMatches = helmetScripts.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gis) || [];
        for (const hTag of hMatches) {
          if (!schemasToInject.some(s => s.includes(hTag) || hTag.includes(s))) {
            schemasToInject.push(hTag.trim());
          }
        }
      }
    }

    // Deduplicate schemas if any identical script tags exist
    const uniqueSchemas = Array.from(new Set(schemasToInject.map(s => s.trim()))).filter(Boolean);
    if (uniqueSchemas.length > 0) {
      html = html.replace('</head>', `  ${uniqueSchemas.join('\n  ')}\n</head>`);
    }

    // 6. STRICT SINGLE-PASS DEDUPLICATION GUARANTEE
    // A. Title: strictly ONE <title>
    const titleMatches = html.match(/<title\b[^>]*>[\s\S]*?<\/title>/gis) || [];
    if (titleMatches.length > 1) {
      let keepIndex = 0;
      const targetIdx = titleMatches.findIndex(t => t.includes(titleToUse));
      if (targetIdx !== -1) keepIndex = targetIdx;
      let curTitleIdx = 0;
      html = html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gis, (tag) => {
        const keep = curTitleIdx === keepIndex;
        curTitleIdx++;
        return keep ? (tag.includes('data-rh=') ? tag : tag.replace('<title', '<title data-rh="true"')) : '';
      });
    }

    // B. Meta Description: strictly ONE <meta name="description">
    const metaDescMatches = html.match(/<meta\b[^>]*name=["']description["'][^>]*\/?>/gis) || [];
    if (metaDescMatches.length > 1) {
      let keepIndex = 0;
      let currentIndex = 0;
      html = html.replace(/<meta\b[^>]*name=["']description["'][^>]*\/?>/gis, (tag) => {
        const keep = currentIndex === keepIndex;
        currentIndex++;
        return keep ? (tag.includes('data-rh=') ? tag : tag.replace('<meta', '<meta data-rh="true"')) : '';
      });
    }

    // C. Meta Robots: strictly ONE <meta name="robots">
    const robotsMatches = html.match(/<meta\b[^>]*name=["']robots["'][^>]*\/?>/gis) || [];
    if (robotsMatches.length > 1) {
      let keepIndex = 0;
      let curRobotsIdx = 0;
      html = html.replace(/<meta\b[^>]*name=["']robots["'][^>]*\/?>/gis, (tag) => {
        const keep = curRobotsIdx === keepIndex;
        curRobotsIdx++;
        return keep ? (tag.includes('data-rh=') ? tag : tag.replace('<meta', '<meta data-rh="true"')) : '';
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
        return keep ? (tag.includes('data-rh=') ? tag : tag.replace('<link', '<link data-rh="true"')) : '';
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
      return tag.includes('data-rh=') ? tag : tag.replace('<meta', '<meta data-rh="true"');
    });

    // F. Twitter tags: strictly ONE of each name (twitter:card, twitter:title, twitter:description, twitter:image, etc.)
    const seenTwNames = new Set();
    html = html.replace(/<meta\b[^>]*name=["'](twitter:[^"']+)["'][^>]*\/?>/gis, (tag, name) => {
      const lower = name.toLowerCase();
      if (seenTwNames.has(lower)) {
        return '';
      }
      seenTwNames.add(lower);
      return tag.includes('data-rh=') ? tag : tag.replace('<meta', '<meta data-rh="true"');
    });

    // G. Article meta tags: strictly ONE of each property (article:published_time, article:author, etc.)
    const seenArtProps = new Set();
    html = html.replace(/<meta\b[^>]*property=["'](article:[^"']+)["'][^>]*\/?>/gis, (tag, prop) => {
      const lower = prop.toLowerCase();
      if (seenArtProps.has(lower)) {
        return '';
      }
      seenArtProps.add(lower);
      return tag.includes('data-rh=') ? tag : tag.replace('<meta', '<meta data-rh="true"');
    });

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

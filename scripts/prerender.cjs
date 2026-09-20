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

// Base template with clean empty #root and stripped default canonical & description
let baseTemplate = distIndex;
baseTemplate = replaceRootElement(baseTemplate, '', '');
baseTemplate = stripCanonicalTags(baseTemplate);
baseTemplate = baseTemplate.replace(/<meta\b[^>]*name=["']description["'][^>]*\/?>/gis, '');

// Preserve a clean, unpopulated SPA shell for dynamic client-side routes (e.g. dynamic blog posts, admin dashboard)
const spaShellPath = path.join(distDir, 'spa-shell.html');
fs.writeFileSync(spaShellPath, baseTemplate, 'utf8');

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
  '/seo-mastery',
  '/local-seo-for-small-business',
  '/local-seo-citation-building',
  '/white-label-local-seo',
  '/local-seo-audit',
  '/graphics-design',
  '/content-writing',
  '/contact',
  '/us-market',
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
  '/tools/project-cost-estimator',
  '/tools/website-audit',
  '/tools/seo-checklist',
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
  '/blog/edtech-software-development-lms-features-every-platform-needs'
];

// Merge explicitly defined routes with any routes declared in SEO_ROUTES_METADATA
const allRoutes = Array.from(new Set([
  ...routes,
  ...Object.keys(SEO_ROUTES_METADATA || {}).filter(k => typeof k === 'string' && k.startsWith('/'))
]));

let successCount = 0;

for (const routeUrl of allRoutes) {
  try {
    const { bodyHtml, headTags, helmet } = renderFullApp(routeUrl);
    
    let html = baseTemplate;

    // 1. Inject pure, clean React SSR DOM tree inside #root with explicit route identifier
    html = replaceRootElement(html, bodyHtml, routeUrl);

    // 2. Unconditionally strip ANY existing <title> tags from baseTemplate and headTags
    html = html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');

    // 3. Inject hoisted head tags (preloads, metadata) into <head> (excluding title tags, canonicals, and description)
    if (headTags && headTags.trim().length > 0) {
      const cleanHeadTags = stripCanonicalTags(
        headTags
          .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
          .replace(/<meta\b[^>]*name=["']description["'][^>]*\/?>/gis, '')
      );
      if (cleanHeadTags.trim().length > 0) {
        html = html.replace('</head>', `  ${cleanHeadTags}\n</head>`);
      }
    }

    // 4. Inject unique Dynamic Title, Description & Open Graph tags for each route from SEO_ROUTES_METADATA
    const normalizedRoute = routeUrl.endsWith('/') && routeUrl !== '/' ? routeUrl.slice(0, -1) : routeUrl;
    const seo = (SEO_ROUTES_METADATA && (
      SEO_ROUTES_METADATA[routeUrl] ||
      SEO_ROUTES_METADATA[normalizedRoute] ||
      SEO_ROUTES_METADATA[`${normalizedRoute}/`]
    )) || (
      SEO_ROUTES_METADATA && Object.entries(SEO_ROUTES_METADATA).find(([k]) => {
        const normK = k.endsWith('/') && k !== '/' ? k.slice(0, -1) : k;
        return normK === normalizedRoute;
      })?.[1]
    );

    // Compute canonical URL: Every route MUST have its own URL as canonical, NEVER homepage (unless route is literally '/')
    const cleanPath = routeUrl === '/' ? '/' : (routeUrl.startsWith('/') ? routeUrl : `/${routeUrl}`);
    let canonicalUrl;
    if (cleanPath === '/') {
      canonicalUrl = 'https://www.abuqitmirlabs.tech/';
    } else {
      // If explicitly declared in SEO metadata and NOT pointing to homepage, use it; otherwise use exact route URL
      if (seo && seo.canonical && seo.canonical !== 'https://www.abuqitmirlabs.tech/' && seo.canonical !== 'https://www.abuqitmirlabs.tech') {
        canonicalUrl = seo.canonical;
      } else {
        canonicalUrl = `https://www.abuqitmirlabs.tech${cleanPath}`;
      }
    }

    const titleToUse = (seo && seo.title) || 'AbuQitmirLabs | Custom Software, AI Agents & Mobile Development';
    html = html.replace('</head>', `  <title data-rh="true">${titleToUse}</title>\n</head>`);

    // Clean any pre-existing description, OpenGraph, and Twitter tags before injecting unique route tags
    html = html.replace(/<meta\b[^>]*name=["']description["'][^>]*\/?>/gis, '');
    html = html.replace(/<meta\b[^>]*property=["']og:[^"']+["'][^>]*\/?>/gis, '');
    html = html.replace(/<meta\b[^>]*name=["']twitter:[^"']+["'][^>]*\/?>/gis, '');

    if (seo) {
      // Unique <meta name="description">
      if (seo.description) {
        const escapedDesc = seo.description.replace(/"/g, '&quot;');
        html = html.replace('</head>', `  <meta data-rh="true" name="description" content="${escapedDesc}" />\n</head>`);
      }

      // Unique og:title
      const ogTitle = seo.ogTitle || seo.title;
      if (ogTitle) {
        const escapedOgTitle = ogTitle.replace(/"/g, '&quot;');
        html = html.replace('</head>', `  <meta property="og:title" content="${escapedOgTitle}" />\n</head>`);
      }

      // Unique og:description
      const ogDesc = seo.ogDescription || seo.description;
      if (ogDesc) {
        const escapedOgDesc = ogDesc.replace(/"/g, '&quot;');
        html = html.replace('</head>', `  <meta property="og:description" content="${escapedOgDesc}" />\n</head>`);
      }

      // Unique og:url & og:type
      html = html.replace('</head>', `  <meta property="og:url" content="${canonicalUrl}" />\n  <meta property="og:type" content="${seo.ogType || 'website'}" />\n</head>`);

      // Unique og:image
      if (seo.ogImage) {
        html = html.replace('</head>', `  <meta property="og:image" content="${seo.ogImage}" />\n  <meta property="og:image:alt" content="AbuQitmirLabs Custom Software &amp; AI Development Studio" />\n</head>`);
      }

      // Unique twitter:card, twitter:title, twitter:description, twitter:image
      const twTitle = seo.twitterTitle || seo.title;
      const twDesc = seo.twitterDescription || seo.description;
      const twImage = seo.ogImage || 'https://www.abuqitmirlabs.tech/logo.png';
      html = html.replace('</head>', `  <meta name="twitter:card" content="summary_large_image" />\n  <meta name="twitter:title" content="${(twTitle || '').replace(/"/g, '&quot;')}" />\n  <meta name="twitter:description" content="${(twDesc || '').replace(/"/g, '&quot;')}" />\n  <meta name="twitter:image" content="${twImage}" />\n</head>`);
    } else {
      // Fallback og:url for routes without explicit SEO metadata
      html = html.replace('</head>', `  <meta property="og:url" content="${canonicalUrl}" />\n  <meta property="og:type" content="website" />\n</head>`);
    }

    // 5. Update canonical link (strip any remaining canonical tags, then inject the route-specific canonical)
    html = stripCanonicalTags(html);
    html = html.replace('</head>', `  <link rel="canonical" data-rh="true" href="${canonicalUrl}" />\n</head>`);

    // 6. Inject Schema.org JSON-LD if explicitly declared in SEO metadata
    if (seo && seo.schemaJsonLd) {
      const routeId = (seo.schemaJsonLd['@graph'] && seo.schemaJsonLd['@graph'][3] && seo.schemaJsonLd['@graph'][3]['@id']) || canonicalUrl;
      if (!html.includes(routeId)) {
        const schemaSnippet = `<script type="application/ld+json" data-rh="true">\n${JSON.stringify(seo.schemaJsonLd, null, 2)}\n  </script>`;
        html = html.replace('</head>', `  ${schemaSnippet}\n</head>`);
      }
    }

    // 7. Strict deduplication verification: Guarantee strictly ONE <meta name="description"> in the generated HTML
    const metaDescMatches = html.match(/<meta\b[^>]*name=["']description["'][^>]*\/?>/gis) || [];
    if (metaDescMatches.length > 1) {
      let keepIndex = metaDescMatches.length - 1;
      let currentIndex = 0;
      html = html.replace(/<meta\b[^>]*name=["']description["'][^>]*\/?>/gis, (tag) => {
        const keep = currentIndex === keepIndex;
        currentIndex++;
        return keep ? tag : '';
      });
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

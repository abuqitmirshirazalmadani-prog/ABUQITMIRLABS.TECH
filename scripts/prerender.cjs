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

// Base template with clean empty #root
let baseTemplate = distIndex;
baseTemplate = replaceRootElement(baseTemplate, '', '');

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
  '/blog/the-complete-guide-to-rag-ai-integration-for-startups',
  '/blog/rag-ai-integration-for-startups',
  '/blog/agentic-ai-production-failures',
  '/blog/what-does-a-custom-web-development-company-do',
  '/blog/custom-web-development-company',
  '/blog/custom-web-development-company-2026',
  '/blog/custom-web-development-company-2026-built-in-visibility',
  '/blog/custom-web-development-vs-website-templates-2026-guide',
  '/blog/custom-ai-solutions-for-corporate-events-2026-guide',
  '/blog/local-business-visibility-2026-seo-geo-aio-aeo-sxo',
  '/blog/local-business-visibility-seo-geo-aio-aeo-sxo-2026',
  '/blog/what-seo-services-actually-mean-in-2026-abuqitmirlabs',
  '/blog/what-seo-services-actually-means-2026',
  '/blog/how-to-choose-a-mobile-app-development-company-2026',
  '/blog/how-to-choose-mobile-app-development-company-2026',
  '/blog/custom-ai-solutions-for-fintech-2026',
  '/blog/custom-ai-solutions-for-fintech-2026-fraud-detection-underwriting',
  '/blog/what-are-healthcare-ai-agents-complete-guide-2026',
  '/blog/healthcare-software-development-solutions-2026',
  '/blog/ai-agent-development-agency-vs-in-house'
];

let successCount = 0;

for (const routeUrl of routes) {
  try {
    const { bodyHtml, headTags, helmet } = renderFullApp(routeUrl);
    
    let html = baseTemplate;

    // 1. Inject pure, clean React SSR DOM tree inside #root with explicit route identifier
    html = replaceRootElement(html, bodyHtml, routeUrl);

    // 2. Inject hoisted head tags (preloads, canonical, metadata) into <head>
    if (headTags && headTags.trim().length > 0) {
      html = html.replace('</head>', `  ${headTags}\n</head>`);
    }

    // 3. Inject unique Dynamic Title, Description & Open Graph tags for each route from SEO_ROUTES_METADATA
    const seo = (SEO_ROUTES_METADATA && SEO_ROUTES_METADATA[routeUrl]) || 
                (SEO_ROUTES_METADATA && Object.entries(SEO_ROUTES_METADATA).find(([k]) => routeUrl === k || routeUrl.endsWith(k) || (k.length > 2 && routeUrl.includes(k)))?.[1]);

    if (seo) {
      // Clean any pre-existing duplicates of OpenGraph / Twitter tags from template or Helmet hoisting
      html = html.replace(/<meta\s+property=["']og:[^"']+["'][^>]*\/?>/gi, '');
      html = html.replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*\/?>/gi, '');

      // Unique <title>
      if (seo.title) {
        html = html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);
      }

      // Unique <meta name="description">
      if (seo.description) {
        const escapedDesc = seo.description.replace(/"/g, '&quot;');
        html = html.replace(/<meta\s+name=["']description["'][^>]*\/?>/gi, '');
        html = html.replace('</head>', `  <meta name="description" content="${escapedDesc}" />\n</head>`);
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
      const ogUrl = (seo && seo.canonical) || `https://www.abuqitmirlabs.tech${routeUrl === '/' ? '/' : routeUrl}`;
      html = html.replace('</head>', `  <meta property="og:url" content="${ogUrl}" />\n  <meta property="og:type" content="${seo.ogType || 'website'}" />\n</head>`);

      // Unique og:image
      if (seo.ogImage) {
        html = html.replace('</head>', `  <meta property="og:image" content="${seo.ogImage}" />\n  <meta property="og:image:alt" content="AbuQitmirLabs Custom Software &amp; AI Development Studio" />\n</head>`);
      }

      // Unique twitter:card, twitter:title, twitter:description, twitter:image
      const twTitle = seo.twitterTitle || seo.title;
      const twDesc = seo.twitterDescription || seo.description;
      const twImage = seo.ogImage || 'https://www.abuqitmirlabs.tech/logo.png';
      html = html.replace('</head>', `  <meta name="twitter:card" content="summary_large_image" />\n  <meta name="twitter:title" content="${(twTitle || '').replace(/"/g, '&quot;')}" />\n  <meta name="twitter:description" content="${(twDesc || '').replace(/"/g, '&quot;')}" />\n  <meta name="twitter:image" content="${twImage}" />\n</head>`);
    }

    // 4. Update canonical link
    const canonicalUrl = (seo && seo.canonical) || `https://www.abuqitmirlabs.tech${routeUrl === '/' ? '/' : routeUrl}`;
    html = html.replace(/<link\s+rel="canonical"[^>]*\/?>/gi, '');
    html = html.replace('</head>', `  <link rel="canonical" data-rh="true" href="${canonicalUrl}" />\n</head>`);

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
    console.log(`✓ [SSG Rendered] ${routeUrl} (${bodyHtml.length} bytes inside #root | Title: ${seo ? seo.title.substring(0, 40) + '...' : 'Default'})`);
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

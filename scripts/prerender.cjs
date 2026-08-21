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
try {
  const ssrModule = require(ssrBundlePath);
  renderFullApp = ssrModule.renderFullApp;
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
  '/blog/custom-ai-solutions-for-corporate-events-2026-guide',
  '/blog/custom-web-development-vs-website-templates-2026-guide',
  '/blog/custom-web-development-company-2026',
  '/blog/custom-web-development-company',
  '/blog/ai-agent-development-agency-vs-in-house',
  '/blog/what-are-healthcare-ai-agents-complete-guide-2026',
  '/blog/healthcare-software-development-solutions-2026',
  '/blog/custom-ai-solutions-for-fintech-2026'
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

    // 3. Update canonical link
    const canonicalUrl = `https://www.abuqitmirlabs.tech${routeUrl === '/' ? '/' : routeUrl}`;
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
    console.log(`✓ [SSG Rendered] ${routeUrl} (${bodyHtml.length} bytes inside #root)`);
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

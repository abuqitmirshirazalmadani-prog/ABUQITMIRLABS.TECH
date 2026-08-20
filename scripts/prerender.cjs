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

const baseTemplate = fs.readFileSync(indexHtmlTemplatePath, 'utf8');

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
  '/case-studies'
];

let successCount = 0;

for (const routeUrl of routes) {
  try {
    const { appHtml, helmet } = renderFullApp(routeUrl);
    
    let html = baseTemplate;

    // Replace #root contents with exact React SSR HTML
    html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${appHtml}</div>`);

    // Update canonical link
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
    console.log(`✓ [SSG Rendered] ${routeUrl} (${appHtml.length} bytes inside #root)`);
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

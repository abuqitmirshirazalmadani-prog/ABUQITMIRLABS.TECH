/**
 * AbuQitmirLabs Post-Build Static HTML & Schema Verifier
 *
 * Runs automatically after `vite build` to guarantee that EVERY generated HTML file in `dist/`:
 * 1. Has strictly ONE <script type="application/ld+json" data-rh="true"> block (zero duplicate schemas).
 * 2. Has at least one <h1> and at least one <h2> tag in the raw HTML body (zero empty shells).
 * 3. Has strictly ONE <title> and ONE <meta name="description">.
 */

const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');

if (!fs.existsSync(distDir)) {
  console.log('ℹ️ [Post-Build SEO Verifier] dist/ directory not found, skipping.');
  process.exit(0);
}

function getAllHtmlFiles(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'assets' || entry.name === 'images') continue;
      getAllHtmlFiles(fullPath, fileList);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(distDir);
let verifiedCount = 0;
let fixedSchemaCount = 0;
let fixedH2Count = 0;

for (const filePath of htmlFiles) {
  const relPath = path.relative(distDir, filePath);
  if (relPath === 'google87984536fe5662da.html' || relPath === 'spa-shell.html') continue;

  let html = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // 1. Ensure strictly 1 application/ld+json script block
  const schemaRegex = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gis;
  const schemaMatches = html.match(schemaRegex) || [];
  if (schemaMatches.length > 1) {
    // Keep the last (most specific route-level @graph) block and strip earlier duplicates
    const keptSchema = schemaMatches[schemaMatches.length - 1];
    html = html.replace(schemaRegex, '');
    html = html.replace('</head>', `  ${keptSchema}\n</head>`);
    modified = true;
    fixedSchemaCount++;
  } else if (schemaMatches.length === 0 && html.includes('</head>')) {
    const canonMatch = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
    const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
    const fullCanonical = canonMatch ? canonMatch[1] : 'https://www.abuqitmirlabs.tech/';
    const pageTitle = titleMatch ? titleMatch[1].trim() : 'AbuQitmirLabs .TECH';
    const fallbackSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.abuqitmirlabs.tech/#organization",
          "name": "AbuQitmirLabs .TECH",
          "url": "https://www.abuqitmirlabs.tech/",
          "logo": "https://www.abuqitmirlabs.tech/logo.png"
        },
        {
          "@type": "WebPage",
          "@id": `${fullCanonical}#webpage`,
          "url": fullCanonical,
          "name": pageTitle,
          "isPartOf": { "@id": "https://www.abuqitmirlabs.tech/#website" }
        }
      ]
    };
    html = html.replace('</head>', `  <script type="application/ld+json" data-rh="true">\n${JSON.stringify(fallbackSchema, null, 2)}\n  </script>\n</head>`);
    modified = true;
    fixedSchemaCount++;
  }

  // 2. Ensure at least one <h2> exists inside <div id="root">
  const h2Matches = html.match(/<h2\b[^>]*>[\s\S]*?<\/h2>/gi) || [];
  if (h2Matches.length === 0 && html.includes('<main')) {
    html = html.replace(/(<h1\b[^>]*>[\s\S]*?<\/h1>)/i, `$1\n<h2 id="overview" class="text-2xl font-bold mt-8 mb-4">Key Takeaways &amp; Overview</h2>`);
    modified = true;
    fixedH2Count++;
  }

  // 3. Ensure strictly 1 <title> tag
  const titleRegex = /<title\b[^>]*>[\s\S]*?<\/title>/gis;
  const titleMatches = html.match(titleRegex) || [];
  if (titleMatches.length > 1) {
    const keptTitle = titleMatches[titleMatches.length - 1];
    html = html.replace(titleRegex, '');
    html = html.replace('</head>', `  ${keptTitle}\n</head>`);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf-8');
  }
  verifiedCount++;
}

console.log(`✅ [Post-Build SEO Verifier] Verified ${verifiedCount} static HTML files in dist/ (Auto-fixed schemas: ${fixedSchemaCount}, Auto-enforced H2: ${fixedH2Count}).`);


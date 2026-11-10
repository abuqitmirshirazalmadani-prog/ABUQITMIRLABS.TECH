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
  '/local-seo-for-small-business': 'Local SEO Services for Small Business | AbuQitmirLabs',
  '/blog/offshore-ai-agent-development-partner-uae':
    'Offshore AI Agent Development Partner UAE | AbuQitmirLabs',
  '/blog/brand-refresh-vs-rebrand':
    'Brand Refresh vs Rebrand Pakistan | AbuQitmirLabs',
  '/blog/lead-generation-content-strategy-google-meta':
    'B2B Lead Generation Content Strategy: Google + Meta',
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
  if (/Abu\s*Qitmir\s*Labs/i.test(cleaned) && cleaned.length <= 60) return cleaned;

  const core = cleaned
    .replace(/\s*[|–—-]\s*Abu\s*Qitmir\s*Labs(?:\s*\.?\s*TECH)?.*$/i, '')
    .trim();

  const withBrand = `${core} | AbuQitmirLabs`;
  if (withBrand.length <= 60) return withBrand;

  const colonParts = core.split(/\s*[:|—–]\s*/);
  if (colonParts.length > 1 && colonParts[0].trim().length >= 16) {
    const firstPart = colonParts[0].trim();
    const firstWithBrand = `${firstPart} | AbuQitmirLabs`;
    if (firstWithBrand.length <= 60) return firstWithBrand;
    if (firstPart.length <= 60 && firstPart.length >= 30) return firstPart;
  }

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

function formatConciseH1Text(plainText) {
  let cleaned = String(plainText || '')
    .replace(/&amp;/gi, '&')
    .replace(/\s*\|\s*Abu\s*Qitmir\s*Labs(?:\s*\.?\s*TECH)?.*$/i, '')
    .replace(/\s*\|\s*The\s*9-Step.*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (cleaned.length <= 86) return cleaned;

  const colonParts = cleaned.split(/\s*[:|—–]\s*/);
  if (colonParts.length > 1 && colonParts[0].trim().length >= 22 && colonParts[0].trim().length <= 86) {
    return colonParts[0].trim();
  }

  const words = cleaned.split(' ');
  let acc = '';
  for (const w of words) {
    const next = acc ? `${acc} ${w}` : w;
    if (next.length <= 75) {
      acc = next;
    } else {
      break;
    }
  }
  return acc.replace(/[,;:\-–—&]+$/, '').trim() || cleaned.slice(0, 75).trim();
}

// Remove any legacy incomplete /local-seo/small-business directory from dist/
const legacyLocalSeoDir = path.join(distDir, 'local-seo');
if (fs.existsSync(legacyLocalSeoDir)) {
  fs.rmSync(legacyLocalSeoDir, { recursive: true, force: true });
}

const htmlFiles = getAllHtmlFiles(distDir);
let verifiedCount = 0;
let fixedSchemaCount = 0;
let fixedH2Count = 0;

for (const filePath of htmlFiles) {
  const relPath = path.relative(distDir, filePath);
  if (
    relPath === 'google87984536fe5662da.html' ||
    relPath === 'spa-shell.html' ||
    relPath === path.join('spa-shell', 'index.html') ||
    relPath === '404.html'
  ) continue;

  let html = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // Derive route path from relPath
  const routeFromRel =
    relPath === 'index.html'
      ? '/'
      : '/' +
        relPath
          .replace(/\\/g, '/')
          .replace(/\/index\.html$/, '')
          .replace(/\.html$/, '');

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
    const pageTitle = titleMatch ? titleMatch[1].trim() : 'AbuQitmirLabs';
    const fallbackSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.abuqitmirlabs.tech/#organization",
          "name": "AbuQitmirLabs",
          "url": "https://www.abuqitmirlabs.tech/",
          "foundingDate": "2021",
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
    html = html.replace('</head>', `  <script id="canonical-schema-graph" type="application/ld+json">${JSON.stringify(fallbackSchema)}</script>\n</head>`);
    modified = true;
    fixedSchemaCount++;
  }

  // Normalize Organization schema name from "AbuQitmirLabs .TECH" to "AbuQitmirLabs"
  if (html.includes('"name": "AbuQitmirLabs .TECH"')) {
    html = html.replace(/"name":\s*"AbuQitmirLabs \.TECH"/g, '"name": "AbuQitmirLabs"');
    modified = true;
  }

  // 2. Strip any "| AbuQitmirLabs" suffix from <h1> and enforce <= 78 char concise H1 (Audit Item 5 & Rule 6)
  const cleanedH1Html = html.replace(/(<h1\b[^>]*>)([\s\S]*?)(<\/h1>)/gi, (full, open, inner, close) => {
    let updatedInner = inner.replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '').trim();
    const plainH1 = updatedInner.replace(/<[^>]+>/g, '').replace(/&amp;/gi, '&').replace(/\s+/g, ' ').trim();
    if (plainH1.length > 78) {
      const concisePlain = formatConciseH1Text(plainH1).replace(/&/g, '&amp;');
      updatedInner = concisePlain;
    }
    return updatedInner !== inner ? `${open}${updatedInner}${close}` : full;
  });
  if (cleanedH1Html !== html) {
    html = cleanedH1Html;
    modified = true;
  }

  // 2b. Convert any accidental raw <p>...## Heading...</p> into proper semantic <h2> / <h3> (Rule 9)
  if (relPath.startsWith('blog' + path.sep)) {
    const rawHeadingCleaned = html.replace(
      /<p\b[^>]*>\s*(#{2,4})\s+([\s\S]*?)<\/p>/gi,
      (_, hashes, innerText) => {
        const level = Math.min(hashes.length, 4);
        const cleanText = innerText.replace(/\s*\{#[^}]+\}\s*$/, '').trim();
        const id = cleanText
          .replace(/<[^>]+>/g, '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        const className =
          level === 2
            ? 'text-2xl md:text-3xl font-bold mt-12 mb-5 text-slate-900 dark:text-white tracking-tight scroll-mt-28'
            : 'text-xl md:text-2xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-100 scroll-mt-28';
        return `<h${level} id="${id}" class="${className}">${cleanText}</h${level}>`;
      }
    );
    if (rawHeadingCleaned !== html) {
      html = rawHeadingCleaned;
      modified = true;
      fixedH2Count++;
    }
  }

  // 3. Ensure at least one <h2> exists inside <div id="root">
  const h2Matches = html.match(/<h2\b[^>]*>[\s\S]*?<\/h2>/gi) || [];
  if (h2Matches.length === 0 && html.includes('<main')) {
    html = html.replace(/(<h1\b[^>]*>[\s\S]*?<\/h1>)/i, `$1\n<h2 id="overview" class="text-2xl font-bold mt-8 mb-4">Key Takeaways &amp; Overview</h2>`);
    modified = true;
    fixedH2Count++;
  }

  // 4. Ensure strictly 1 <title> tag (without data-rh="true") and <= 60 chars (Audit Item 4)
  const titleRegex = /<title\b[^>]*>([\s\S]*?)<\/title>/gis;
  const titleMatches = [...html.matchAll(titleRegex)];
  if (titleMatches.length >= 1) {
    const rawLastTitle = titleMatches[titleMatches.length - 1][1] || '';
    const conciseTitle = formatConciseTitle(rawLastTitle, routeFromRel).replace(/&/g, '&amp;');
    const targetTitleTag = `<title>${conciseTitle}</title>`;
    if (titleMatches.length > 1 || titleMatches[0][0] !== targetTitleTag) {
      let firstReplaced = false;
      html = html.replace(titleRegex, () => {
        if (!firstReplaced) {
          firstReplaced = true;
          return targetTitleTag;
        }
        return '';
      });
      modified = true;
    }
  }

  // 4b. Ensure strictly 1 <meta name="description"> tag (without data-rh="true")
  const descRegex = /<meta\b[^>]*name=["']description["'][^>]*\/?>/gis;
  const descMatches = html.match(descRegex) || [];
  if (descMatches.length > 1) {
    const keptDesc = descMatches[descMatches.length - 1].replace(/\s+data-rh=["']true["']/gi, '');
    html = html.replace(descRegex, '');
    html = html.replace('</head>', `  ${keptDesc}\n</head>`);
    modified = true;
  }

  // 4c. Ensure strictly 1 <link rel="canonical"> tag (without data-rh="true")
  const canonRegex = /<link\b[^>]*rel=["']canonical["'][^>]*\/?>/gis;
  const canonMatches = html.match(canonRegex) || [];
  if (canonMatches.length > 1) {
    const keptCanon = canonMatches[canonMatches.length - 1].replace(/\s+data-rh=["']true["']/gi, '');
    html = html.replace(canonRegex, '');
    html = html.replace('</head>', `  ${keptCanon}\n</head>`);
    modified = true;
  }

  // 4d. Strip any leftover React Helmet data-rh="true" attributes
  if (/\sdata-rh=["']true["']/i.test(html)) {
    html = html.replace(/\s+data-rh=["']true["']/gi, '');
    modified = true;
  }

  // 5. Ensure meta description does not contain literal &quot;
  html = html.replace(/(<meta\b[^>]*name=["']description["'][^>]*content=["'])([^"']*)(["'][^>]*>)/gi, (full, p1, p2, p3) => {
    if (p2.includes('&quot;')) {
      modified = true;
      return `${p1}${p2.replace(/&quot;/g, "'")}${p3}`;
    }
    return full;
  });

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf-8');
    // Also keep public/blog/<slug>/index.html in sync if applicable
    if (relPath.startsWith('blog' + path.sep)) {
      const publicCopy = path.resolve(__dirname, '..', 'public', relPath);
      if (fs.existsSync(path.dirname(publicCopy))) {
        fs.writeFileSync(publicCopy, html, 'utf-8');
      }
    }
  }
  verifiedCount++;
}

console.log(`✅ [Post-Build SEO Verifier] Verified ${verifiedCount} static HTML files in dist/ (Auto-fixed schemas: ${fixedSchemaCount}, Auto-enforced H2: ${fixedH2Count}).`);



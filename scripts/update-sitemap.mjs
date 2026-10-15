// scripts/update-sitemap.mjs
// Safely adds missing blog URLs to sitemap.xml without removing existing entries

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
const blogPostsPath = path.join(rootDir, 'src', 'data', 'staticBlogPosts.ts');
const blogContentDir = path.join(rootDir, 'content', 'blog');
const redirectsPath = path.join(rootDir, 'src', 'data', 'canonicalRedirects.ts');

// 1. Existing sitemap read karein
if (!fs.existsSync(sitemapPath)) {
  console.error('❌ sitemap.xml not found');
  process.exit(1);
}

let sitemap = fs.readFileSync(sitemapPath, 'utf-8');

// Known canonical redirects map (prevents alias slugs from entering sitemap)
const redirects = {};
if (fs.existsSync(redirectsPath)) {
  const rContent = fs.readFileSync(redirectsPath, 'utf-8');
  const redirectMatches = rContent.matchAll(/['"]([^'"]+)['"]\s*:\s*['"]([^'"]+)['"]/g);
  for (const m of redirectMatches) {
    redirects[m[1]] = m[2];
  }
}

// 2. staticBlogPosts.ts aur content/blog/*.md se slugs nikalein
const slugsSet = new Set();

if (fs.existsSync(blogPostsPath)) {
  const postsContent = fs.readFileSync(blogPostsPath, 'utf-8');
  const slugRegex = /["']slug["']\s*:\s*["']([^"']+)["']/g;
  let match;
  while ((match = slugRegex.exec(postsContent)) !== null) {
    slugsSet.add(match[1]);
  }
}

// Also check content/blog/*.md frontmatter
if (fs.existsSync(blogContentDir)) {
  const mdFiles = fs.readdirSync(blogContentDir).filter(f => f.endsWith('.md'));
  for (const file of mdFiles) {
    try {
      const content = fs.readFileSync(path.join(blogContentDir, file), 'utf-8');
      const m = content.match(/["']slug["']\s*:\s*["']([^"']+)["']/);
      if (m && m[1]) {
        slugsSet.add(m[1]);
      } else {
        slugsSet.add(file.replace(/\.md$/, ''));
      }
    } catch {
      // ignore read error
    }
  }
}

const slugs = Array.from(slugsSet);
console.log(`📄 Found ${slugs.length} blog posts in staticBlogPosts.ts & content/blog`);

// 3. Har slug ke liye URL check karein, agar missing ho to add karein
const baseUrl = 'https://www.abuqitmirlabs.tech';
const today = new Date().toISOString().split('T')[0];
let added = 0;

for (const rawSlug of slugs) {
  const cleanSlug = rawSlug.trim().replace(/^\/+/, '').replace(/^blog\//, '').replace(/\/+$/, '');
  // Canonical check: do not add redirect aliases
  if (redirects[cleanSlug]) {
    continue;
  }

  const fullUrl = `${baseUrl}/blog/${cleanSlug}`;
  if (!sitemap.includes(fullUrl)) {
    const newEntry = `  <url><loc>${fullUrl}</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${today}</lastmod></url>\n`;
    sitemap = sitemap.replace('</urlset>', `${newEntry}</urlset>`);
    added++;
    console.log(`✅ Added blog URL: ${cleanSlug}`);
  }
}

// 3b. Har static/service page check karein from seoRoutesMetadata.ts
const seoRoutesPath = path.join(rootDir, 'src', 'data', 'seoRoutesMetadata.ts');
if (fs.existsSync(seoRoutesPath)) {
  const seoContent = fs.readFileSync(seoRoutesPath, 'utf-8');
  const routeBlockRegex = /['"](\/[a-zA-Z0-9_\-\/]+)['"]\s*:\s*\{([\s\S]*?)\n\s*\},/g;
  let rMatch;
  while ((rMatch = routeBlockRegex.exec(seoContent)) !== null) {
    const routePath = rMatch[1];
    const blockContent = rMatch[2];
    const canonMatch = blockContent.match(/canonical:\s*['"]([^'"]+)['"]/);
    const canonical = canonMatch ? canonMatch[1] : `${baseUrl}${routePath}`;

    // Skip if canonical points elsewhere (alias / redirect)
    if (canonical !== `${baseUrl}${routePath}`) {
      continue;
    }

    // Skip aliases, redirects, or dynamic blog placeholders
    if (redirects[routePath.replace(/^\//, '')] || redirects[routePath] || routePath.startsWith('/blog/')) {
      continue;
    }
    const fullServiceUrl = `${baseUrl}${routePath}`;
    if (!sitemap.includes(fullServiceUrl)) {
      const serviceEntry = `  <url><loc>${fullServiceUrl}</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${today}</lastmod></url>\n`;
      sitemap = sitemap.replace('</urlset>', `${serviceEntry}</urlset>`);
      added++;
      console.log(`✅ Added service route: ${routePath}`);
    }
  }
}

// 4. Save karein (public/sitemap.xml and root sitemap.xml)
fs.writeFileSync(sitemapPath, sitemap);
const rootSitemapPath = path.join(rootDir, 'sitemap.xml');
fs.writeFileSync(rootSitemapPath, sitemap);

if (added > 0) {
  console.log(`\n🎉 Added ${added} new URLs to sitemap.xml`);
} else {
  console.log(`\n✨ Sitemap already up to date`);
}

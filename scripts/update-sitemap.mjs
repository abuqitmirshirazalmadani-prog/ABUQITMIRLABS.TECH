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

const baseUrl = 'https://www.abuqitmirlabs.tech';
const today = '2026-10-23';

// Also check content/blog/*.md frontmatter and Firestore posts, and auto-sync missing posts into staticBlogPosts.ts
let staticPostsSource = fs.existsSync(blogPostsPath) ? fs.readFileSync(blogPostsPath, 'utf-8') : '';
let staticModified = false;

if (fs.existsSync(blogContentDir) && staticPostsSource) {
  const mdFiles = fs.readdirSync(blogContentDir).filter(f => f.endsWith('.md'));
  
  for (const file of mdFiles) {
    try {
      const rawContent = fs.readFileSync(path.join(blogContentDir, file), 'utf-8');
      const fmMatch = rawContent.match(/^---[\s\n]*\{([\s\S]*?)\}[\s\n]*---/);
      let articleSlug = file.replace(/\.md$/, '');
      let parsedMeta = null;
      let body = rawContent;
      
      if (fmMatch) {
        parsedMeta = JSON.parse('{' + fmMatch[1] + '}');
        body = rawContent.replace(/^---[\s\S]*?---[\s\n]*/, '');
        if (parsedMeta.slug) {
          articleSlug = parsedMeta.slug.trim();
        }
      }
      
      slugsSet.add(articleSlug);
      
      // Auto-append to staticBlogPosts.ts if missing
      if (!staticPostsSource.includes(`STATIC_BLOG_POSTS["${articleSlug}"]`) && !staticPostsSource.includes(`'${articleSlug}'`)) {
        const postObj = {
          canonical: `https://www.abuqitmirlabs.tech/blog/${articleSlug}`,
          title: parsedMeta?.title || articleSlug,
          heroSubtitle: parsedMeta?.heroSubtitle || undefined,
          content: body,
          excerpt: parsedMeta?.excerpt || '',
          metaDescription: parsedMeta?.metaDescription || parsedMeta?.excerpt || '',
          coverImage: parsedMeta?.coverImage || 'https://www.abuqitmirlabs.tech/logo.png',
          coverImageAlt: parsedMeta?.coverImageAlt || (parsedMeta?.title ? `${parsedMeta.title} by AbuQitmirLabs` : 'AbuQitmirLabs Journal'),
          category: parsedMeta?.category || 'Development',
          createdAt: parsedMeta?.publishedAt || today,
          author: parsedMeta?.author || 'Abu Qitmir Mohammad Shiraz Al-Madani',
          tags: parsedMeta?.tags || []
        };
        staticPostsSource += `\nSTATIC_BLOG_POSTS["${articleSlug}"] = ${JSON.stringify(postObj, null, 2)};\n`;
        staticModified = true;
        console.log(`📦 Auto-synced markdown blog post into staticBlogPosts.ts: ${articleSlug}`);
      }
    } catch (e) {
      // ignore read error
    }
  }
}

// 2b. Fetch published posts from Firestore so Admin Dashboard posts are automatically included in SSG & Sitemaps
try {
  let projectId = 'angular-oxide-tcf5x';
  let databaseId = 'ai-studio-675d15b3-f001-4d2e-a88b-bbcb33443014';
  let apiKey = '';
  const cfgPath = path.join(rootDir, 'firebase-applet-config.json');
  if (fs.existsSync(cfgPath)) {
    const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf-8'));
    if (cfg.projectId) projectId = cfg.projectId;
    if (cfg.firestoreDatabaseId) databaseId = cfg.firestoreDatabaseId;
    if (cfg.apiKey) apiKey = cfg.apiKey;
  }
  const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents/posts?pageSize=200${apiKey ? `&key=${apiKey}` : ''}`;
  const res = await fetch(firestoreUrl);
  if (res.ok) {
    const data = await res.json();
    const docs = data?.documents || [];
    const cleanQuote = (val) => (val || '').trim().replace(/^(?:&quot;|["'“”])+|(?:&quot;|["'“”])+$/gi, '').trim();
    for (const doc of docs) {
      const f = doc.fields || {};
      const published = f.published?.booleanValue ?? true;
      const rawSlug = (f.slug?.stringValue || '').trim().replace(/^\/+/, '').replace(/^blog\//, '').replace(/\/+$/, '');
      if (!published || !rawSlug) continue;
      const canonicalSlug = redirects[rawSlug] || rawSlug;
      slugsSet.add(canonicalSlug);

      const rawTitle = (f.title?.stringValue || canonicalSlug).trim();
      const postTitle = rawTitle.replace(/\s*\|\s*AbuQitmirLabs.*$/i, '').trim();
      const postContent = f.content?.stringValue || '';
      const postExcerpt = cleanQuote(f.excerpt?.stringValue || '');
      const postMetaDesc = cleanQuote(f.metaDescription?.stringValue || postExcerpt);
      const postCover = f.coverImage?.stringValue || 'https://www.abuqitmirlabs.tech/logo.png';
      const postCoverAlt = f.coverImageAlt?.stringValue || `${postTitle} by AbuQitmirLabs`;
      const postCategory = f.category?.stringValue || 'Development';
      const postAuthor = f.author?.stringValue || 'Abu Qitmir Mohammad Shiraz Al-Madani';
      const postTags = (f.tags?.arrayValue?.values || []).map(v => v.stringValue).filter(Boolean);

      if (postContent && staticPostsSource && !staticPostsSource.includes(`STATIC_BLOG_POSTS["${canonicalSlug}"]`) && !staticPostsSource.includes(`'${canonicalSlug}':`)) {
        const postObj = {
          slug: canonicalSlug,
          canonical: `https://www.abuqitmirlabs.tech/blog/${canonicalSlug}`,
          title: postTitle,
          content: postContent,
          excerpt: postExcerpt,
          metaDescription: postMetaDesc,
          coverImage: postCover,
          coverImageAlt: postCoverAlt,
          category: postCategory,
          createdAt: today,
          author: postAuthor,
          tags: postTags
        };
        const entryStr = `\nSTATIC_BLOG_POSTS["${canonicalSlug}"] = ${JSON.stringify(postObj, null, 2)};\n`;
        const insertBefore = 'export interface BlogPostSummary';
        if (staticPostsSource.includes(insertBefore)) {
          staticPostsSource = staticPostsSource.replace(insertBefore, entryStr + '\n' + insertBefore);
        } else {
          staticPostsSource += entryStr;
        }
        staticModified = true;
        console.log(`🔥 Auto-synced Firestore Admin post into staticBlogPosts.ts: ${canonicalSlug}`);
      }
    }
  }
} catch (fsErr) {
  // continue offline gracefully
}

if (staticModified && blogPostsPath) {
  fs.writeFileSync(blogPostsPath, staticPostsSource, 'utf-8');
}

const slugs = Array.from(slugsSet);
console.log(`📄 Found ${slugs.length} blog posts in staticBlogPosts.ts, content/blog & Firestore`);

// 3. Har slug ke liye URL check karein, agar missing ho to add karein
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

// Remove any disallowed routes (such as /admin) if present in existing sitemap
sitemap = sitemap.replace(/^\s*<url><loc>https:\/\/www\.abuqitmirlabs\.tech\/(admin|google87984536fe5662da|404|spa-shell|login)<\/loc>[\s\S]*?<\/url>\n?/gm, '');

// 3b. Har static/service page check karein from seoRoutesMetadata.ts
const disallowedRoutes = new Set(['/admin', '/google87984536fe5662da', '/404', '/spa-shell', '/login']);
const seoRoutesPath = path.join(rootDir, 'src', 'data', 'seoRoutesMetadata.ts');
if (fs.existsSync(seoRoutesPath)) {
  const seoContent = fs.readFileSync(seoRoutesPath, 'utf-8');
  const routeBlockRegex = /['"](\/[a-zA-Z0-9_\-\/]+)['"]\s*:\s*\{([\s\S]*?)\n\s*\},/g;
  let rMatch;
  while ((rMatch = routeBlockRegex.exec(seoContent)) !== null) {
    const routePath = rMatch[1];
    if (disallowedRoutes.has(routePath) || routePath.startsWith('/admin/') || routePath.startsWith('/api/')) {
      continue;
    }
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
      const serviceEntry = `<url><loc>${fullServiceUrl}</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${today}</lastmod></url>\n`;
      sitemap = sitemap.replace('</urlset>', `${serviceEntry}</urlset>`);
      added++;
      console.log(`✅ Added service route: ${routePath}`);
    }
  }
}

// 3c. Programmatic SEO money pages from src/data/programmatic-seo.ts
const pseoPath = path.join(rootDir, 'src', 'data', 'programmatic-seo.ts');
if (fs.existsSync(pseoPath)) {
  const pseoContent = fs.readFileSync(pseoPath, 'utf-8');
  const slugMatches = pseoContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
  for (const match of slugMatches) {
    const pSlug = match[1].trim();
    const fullPseoUrl = `${baseUrl}/solutions/${pSlug}`;
    if (!sitemap.includes(fullPseoUrl)) {
      const pseoEntry = `  <url><loc>${fullPseoUrl}</loc><changefreq>weekly</changefreq><priority>0.85</priority><lastmod>${today}</lastmod></url>\n`;
      sitemap = sitemap.replace('</urlset>', `${pseoEntry}</urlset>`);
      added++;
      console.log(`✅ Added pSEO money page: /solutions/${pSlug}`);
    }
  }
}

// 4. Save karein (public/sitemap.xml, root sitemap.xml, public/pages-sitemap.xml)
fs.writeFileSync(sitemapPath, sitemap);
const rootSitemapPath = path.join(rootDir, 'sitemap.xml');
fs.writeFileSync(rootSitemapPath, sitemap);
const pagesSitemapPath = path.join(rootDir, 'public', 'pages-sitemap.xml');
fs.writeFileSync(pagesSitemapPath, sitemap);
const rootPagesSitemapPath = path.join(rootDir, 'pages-sitemap.xml');
fs.writeFileSync(rootPagesSitemapPath, sitemap);

if (added > 0) {
  console.log(`\n🎉 Added ${added} new URLs to sitemap.xml`);
} else {
  console.log(`\n✨ Sitemap already up to date`);
}

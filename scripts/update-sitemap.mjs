// scripts/update-sitemap.mjs
// Safely syncs Firestore & Markdown blog posts into content/blog/*.md, staticBlogPosts.ts, and sitemaps

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

const cleanQuote = (val) =>
  (val || '').trim().replace(/^(?:&quot;|["'“”`])+|(?:&quot;|["'“”`])+$/gi, '').trim();

const normalizeMarkdownContent = (rawMd, titleStr) => {
  let md = (rawMd || '').trim();
  const cleanTitle = (titleStr || '').replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '').trim();
  const normTitle = cleanTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
  const titleWords = cleanTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 2);
  const lines = md.split(/\r?\n/);
  while (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    const headerMatch = firstLine.match(/^#{1,3}\s+(.+)$/);
    if (headerMatch) {
      const headerTextNorm = headerMatch[1].toLowerCase().replace(/[^a-z0-9]/g, '');
      const headerWords = new Set(
        headerMatch[1]
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, ' ')
          .split(/\s+/)
          .filter(w => w.length >= 2)
      );
      const matchedTitleWords = titleWords.filter(w => headerWords.has(w)).length;
      const wordOverlapRatio = titleWords.length >= 4 ? matchedTitleWords / titleWords.length : 0;
      const prefixNorm = normTitle.slice(0, 20);
      if (
        headerTextNorm === normTitle ||
        (normTitle && (headerTextNorm.includes(normTitle) || normTitle.includes(headerTextNorm))) ||
        (prefixNorm.length >= 10 && (headerTextNorm.startsWith(prefixNorm) || headerTextNorm.includes(prefixNorm))) ||
        wordOverlapRatio >= 0.8 ||
        firstLine.startsWith('# ')
      ) {
        lines.shift();
        while (
          lines.length > 0 &&
          (lines[0].trim() === '' ||
            lines[0].trim() === '---' ||
            /^(?:\*\*)?by\s+abu\s*qitmir/i.test(lines[0].trim()))
        ) {
          lines.shift();
        }
        md = lines.join('\n');
      }
    }
    while (
      lines.length > 0 &&
      (lines[0].trim() === '' ||
        lines[0].trim() === '---' ||
        /^(?:\*\*)?by\s+abu\s*qitmir/i.test(lines[0].trim()))
    ) {
      lines.shift();
      md = lines.join('\n');
    }
  }
  const checkLines = md.split(/\r?\n/);
  let h2BeforeFaq = 0;
  let h3BeforeFaq = 0;
  let inCode = false;
  let reachedFaq = false;
  for (const l of checkLines) {
    const t = l.trim();
    if (t.startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    if (/^#{2,3}\s+(?:frequently asked questions|faq\b)/i.test(t)) {
      reachedFaq = true;
      continue;
    }
    if (!reachedFaq) {
      if (/^##\s+/.test(t)) h2BeforeFaq++;
      else if (/^###\s+/.test(t)) h3BeforeFaq++;
    }
  }
  const shouldPromoteBodyH3 = h2BeforeFaq <= 1 && h3BeforeFaq >= 3;
  let inCodeNorm = false;
  let inFaqNorm = false;
  md = checkLines
    .map(line => {
      const t = line.trim();
      if (t.startsWith('```')) {
        inCodeNorm = !inCodeNorm;
        return line;
      }
      if (inCodeNorm) return line;
      if (/^#{2,3}\s+(?:frequently asked questions|faq\b)/i.test(t)) {
        inFaqNorm = true;
        return line.replace(/^###\s+/, '## ');
      }
      if (inFaqNorm && /^##\s+/.test(t) && !/^##\s+(?:frequently asked questions|faq\b)/i.test(t)) {
        inFaqNorm = false;
      }
      if (shouldPromoteBodyH3 && !inFaqNorm && /^###\s+/.test(t)) {
        return line.replace(/^(\s*)###\s+/, '$1## ');
      }
      if (inFaqNorm && /^\*\*[^*]+\?\*\*\s*$/.test(t)) {
        return `### ${t.replace(/^\*\*|\*\*\s*$/g, '').trim()}`;
      }
      return line;
    })
    .join('\n');
  return md;
};

// 2. staticBlogPosts.ts aur content/blog/*.md se slugs nikalein
const slugsSet = new Set();

if (fs.existsSync(blogPostsPath)) {
  const postsContent = fs.readFileSync(blogPostsPath, 'utf-8');
  const slugRegex = /["']slug["']\s*:\s*["']([^"']+)["']/g;
  let match;
  while ((match = slugRegex.exec(postsContent)) !== null) {
    const s = match[1].trim();
    slugsSet.add(redirects[s] || s);
  }
}

const baseUrl = 'https://www.abuqitmirlabs.tech';
const today = '2026-10-30';

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
      const canonicalSlug = redirects[articleSlug] || articleSlug;
      slugsSet.add(canonicalSlug);
      
      const cleanTitle = (parsedMeta?.title || canonicalSlug).replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '').trim();
      const normBody = normalizeMarkdownContent(body, cleanTitle);

      // Auto-append to staticBlogPosts.ts if missing
      if (!staticPostsSource.includes(`STATIC_BLOG_POSTS["${canonicalSlug}"]`) && !staticPostsSource.includes(`'${canonicalSlug}':`)) {
        const postObj = {
          slug: canonicalSlug,
          canonical: `https://www.abuqitmirlabs.tech/blog/${canonicalSlug}`,
          title: cleanTitle,
          heroSubtitle: parsedMeta?.heroSubtitle || undefined,
          content: normBody,
          excerpt: cleanQuote(parsedMeta?.excerpt || ''),
          metaDescription: cleanQuote(parsedMeta?.metaDescription || parsedMeta?.excerpt || ''),
          coverImage: parsedMeta?.coverImage || 'https://www.abuqitmirlabs.tech/logo.png',
          coverImageAlt: parsedMeta?.coverImageAlt || (cleanTitle ? `${cleanTitle} by AbuQitmirLabs` : 'AbuQitmirLabs Journal'),
          category: parsedMeta?.category || 'Development',
          createdAt: parsedMeta?.publishedAt || today,
          author: parsedMeta?.author || 'Abu Qitmir Mohammad Shiraz Al-Madani',
          tags: parsedMeta?.tags || []
        };
        const entryStr = `\nSTATIC_BLOG_POSTS["${canonicalSlug}"] = ${JSON.stringify(postObj, null, 2)};\n`;
        const insertBefore = 'export interface BlogPostSummary';
        if (staticPostsSource.includes(insertBefore)) {
          staticPostsSource = staticPostsSource.replace(insertBefore, entryStr + '\n' + insertBefore);
        } else {
          staticPostsSource += entryStr;
        }
        staticModified = true;
        console.log(`📦 Auto-synced markdown blog post into staticBlogPosts.ts: ${canonicalSlug}`);
      }
    } catch (e) {
      // ignore read error
    }
  }
}

// 2b. Fetch published posts from Firestore using Firebase JS SDK so Admin Dashboard posts are automatically synced into content/blog/*.md, staticBlogPosts.ts & Sitemaps
try {
  const cfgPath = path.join(rootDir, 'firebase-applet-config.json');
  if (fs.existsSync(cfgPath)) {
    const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf-8'));
    const app = initializeApp(cfg);
    const db = getFirestore(app, cfg.firestoreDatabaseId);
    const snap = await Promise.race([
      getDocs(collection(db, 'posts')),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 12000))
    ]);
    if (snap && snap.docs) {
      for (const docSnap of snap.docs) {
        const data = docSnap.data() || {};
        if (data.published === false) continue;
        const rawSlug = String(data.slug || '').trim().replace(/^\/+/, '').replace(/^blog\//, '').replace(/\/+$/, '');
        if (!rawSlug) continue;
        const canonicalSlug = redirects[rawSlug] || rawSlug;
        slugsSet.add(canonicalSlug);

        const rawTitle = String(data.title || canonicalSlug).trim();
        const postTitle = cleanQuote(rawTitle).replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '').trim();
        const rawContent = String(data.content || '');
        if (!rawContent) continue;
        const postContent = normalizeMarkdownContent(rawContent, postTitle);
        const postExcerpt = cleanQuote(String(data.excerpt || ''));
        const postMetaDesc = cleanQuote(String(data.metaDescription || postExcerpt));
        const postCover = String(data.coverImage || 'https://www.abuqitmirlabs.tech/logo.png').trim();
        const postCoverAlt = String(data.coverImageAlt || `${postTitle} by AbuQitmirLabs`).trim();
        const postCategory = String(data.category || 'Development').trim();
        const postAuthor = String(data.author || 'Abu Qitmir Mohammad Shiraz Al-Madani').trim();
        const postTags = Array.isArray(data.tags) ? data.tags.map(t => String(t).trim()).filter(Boolean) : [];

        // Ensure content/blog/<canonicalSlug>.md exists for build-time prerender & image optimization
        if (fs.existsSync(blogContentDir)) {
          const mdFilePath = path.join(blogContentDir, `${canonicalSlug}.md`);
          if (!fs.existsSync(mdFilePath)) {
            const fmObj = {
              title: postTitle,
              slug: canonicalSlug,
              excerpt: postExcerpt,
              metaDescription: postMetaDesc,
              coverImage: postCover,
              coverImageAlt: postCoverAlt,
              category: postCategory,
              author: postAuthor,
              publishedAt: today,
              tags: postTags
            };
            const mdFileContent = `---\n${JSON.stringify(fmObj, null, 2)}\n---\n\n${postContent}\n`;
            fs.writeFileSync(mdFilePath, mdFileContent, 'utf-8');
            console.log(`📝 Auto-created content/blog/${canonicalSlug}.md from Firestore`);
          }
        }

        if (staticPostsSource && !staticPostsSource.includes(`STATIC_BLOG_POSTS["${canonicalSlug}"]`) && !staticPostsSource.includes(`'${canonicalSlug}':`)) {
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
  }
} catch (fsErr) {
  // continue offline gracefully
}

if (staticModified && blogPostsPath) {
  fs.writeFileSync(blogPostsPath, staticPostsSource, 'utf-8');
}

const slugs = Array.from(slugsSet);
console.log(`📄 Found ${slugs.length} blog posts in staticBlogPosts.ts, content/blog & Firestore`);

// 3. First remove any redirected alias blog URLs from existing sitemap so sitemaps stay 100% canonical
for (const aliasSlug of Object.keys(redirects)) {
  const aliasUrl = `${baseUrl}/blog/${aliasSlug}`;
  if (sitemap.includes(`<loc>${aliasUrl}</loc>`)) {
    const escapedUrl = aliasUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const urlBlockRegex = new RegExp(`\\s*<url>\\s*<loc>${escapedUrl}<\\/loc>[\\s\\S]*?<\\/url>\\n?`, 'g');
    sitemap = sitemap.replace(urlBlockRegex, '\n');
    console.log(`🧹 Removed non-canonical redirect alias from sitemap: ${aliasSlug}`);
  }
}

// Har canonical slug ke liye URL check karein, agar missing ho to add karein
let added = 0;

for (const rawSlug of slugs) {
  const cleanSlug = rawSlug.trim().replace(/^\/+/, '').replace(/^blog\//, '').replace(/\/+$/, '');
  // Canonical check: do not add redirect aliases
  if (redirects[cleanSlug]) {
    continue;
  }

  const fullUrl = `${baseUrl}/blog/${cleanSlug}`;
  if (!sitemap.includes(`<loc>${fullUrl}</loc>`)) {
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
    if (!sitemap.includes(`<loc>${fullServiceUrl}</loc>`)) {
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
    if (!sitemap.includes(`<loc>${fullPseoUrl}</loc>`)) {
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
process.exit(0);

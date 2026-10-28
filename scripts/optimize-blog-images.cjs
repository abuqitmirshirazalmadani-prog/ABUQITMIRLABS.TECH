const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
let sharp = null;
try {
  sharp = require('sharp');
} catch {
  // Fallback gracefully if sharp is not installed in a remote CI environment
}

const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'public', 'images', 'blog-covers');
const blogContentDir = path.join(rootDir, 'content', 'blog');
const staticPostsPath = path.join(rootDir, 'src', 'data', 'staticBlogPosts.ts');
const seoMetaPath = path.join(rootDir, 'src', 'data', 'seoRoutesMetadata.ts');
const mapOutPath = path.join(rootDir, 'src', 'data', 'localCoverImageMap.ts');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. First, ensure all markdown files in content/blog/*.md are synced into staticBlogPosts.ts and seoRoutesMetadata.ts
function syncMarkdownPosts() {
  if (!fs.existsSync(blogContentDir) || !fs.existsSync(staticPostsPath)) return;
  let staticSource = fs.readFileSync(staticPostsPath, 'utf8');
  let seoSource = fs.existsSync(seoMetaPath) ? fs.readFileSync(seoMetaPath, 'utf8') : '';
  let staticChanged = false;
  let seoChanged = false;

  const mdFiles = fs.readdirSync(blogContentDir).filter(f => f.endsWith('.md'));
  for (const file of mdFiles) {
    try {
      const raw = fs.readFileSync(path.join(blogContentDir, file), 'utf8');
      const fmMatch = raw.match(/^---[\s\n]*\{([\s\S]*?)\}[\s\n]*---/);
      if (!fmMatch) continue;
      const meta = JSON.parse('{' + fmMatch[1] + '}');
      const body = raw.replace(/^---[\s\S]*?---[\s\n]*/, '');
      const slug = (meta.slug || file.replace(/\.md$/, '')).trim();
      if (!slug) continue;

      if (!staticSource.includes(`STATIC_BLOG_POSTS["${slug}"]`)) {
        const postObj = {
          canonical: `https://www.abuqitmirlabs.tech/blog/${slug}`,
          title: meta.title || slug,
          content: body,
          excerpt: meta.excerpt || '',
          metaDescription: meta.metaDescription || meta.excerpt || '',
          coverImage: meta.coverImage || 'https://www.abuqitmirlabs.tech/logo.png',
          coverImageAlt: meta.coverImageAlt || `${meta.title || slug} | AbuQitmirLabs`,
          category: meta.category || 'Development',
          createdAt: meta.publishedAt || '2026-10-28',
          author: meta.author || 'Abu Qitmir Mohammad Shiraz Al-Madani',
          tags: meta.tags || []
        };
        const insertBefore = 'export interface BlogPostSummary';
        const entryStr = `\nSTATIC_BLOG_POSTS["${slug}"] = ${JSON.stringify(postObj, null, 2)};\n\n`;
        if (staticSource.includes(insertBefore)) {
          staticSource = staticSource.replace(insertBefore, entryStr + insertBefore);
        } else {
          staticSource += entryStr;
        }
        staticChanged = true;
        console.log(`✅ Synced new markdown post into staticBlogPosts.ts: ${slug}`);
      }

      const routeKey = `'/blog/${slug}'`;
      if (seoSource && !seoSource.includes(routeKey)) {
        const cleanTitle = (meta.title || slug).includes('AbuQitmirLabs')
          ? meta.title
          : `${meta.title || slug} | AbuQitmirLabs`;
        const cleanDesc = (meta.metaDescription || meta.excerpt || '').slice(0, 152).trim();
        const cover = meta.coverImage || 'https://www.abuqitmirlabs.tech/logo.png';
        const pubDate = (meta.publishedAt || '2026-10-28') + 'T00:00:00+00:00';
        const seoEntry = `  '/blog/${slug}': {
    title: ${JSON.stringify(cleanTitle)},
    description: ${JSON.stringify(cleanDesc)},
    canonical: 'https://www.abuqitmirlabs.tech/blog/${slug}',
    ogTitle: ${JSON.stringify(cleanTitle)},
    ogDescription: ${JSON.stringify(cleanDesc)},
    ogImage: ${JSON.stringify(cover)},
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterTitle: ${JSON.stringify(cleanTitle)},
    twitterDescription: ${JSON.stringify(cleanDesc)},
    twitterImage: ${JSON.stringify(cover)},
    schemaJsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://www.abuqitmirlabs.tech/#organization',
          name: 'AbuQitmirLabs .TECH',
          url: 'https://www.abuqitmirlabs.tech/',
          logo: 'https://www.abuqitmirlabs.tech/logo.png'
        },
        {
          '@type': 'WebSite',
          '@id': 'https://www.abuqitmirlabs.tech/#website',
          url: 'https://www.abuqitmirlabs.tech/',
          name: 'AbuQitmirLabs .TECH',
          publisher: { '@id': 'https://www.abuqitmirlabs.tech/#organization' }
        },
        {
          '@type': 'WebPage',
          '@id': 'https://www.abuqitmirlabs.tech/blog/${slug}#webpage',
          url: 'https://www.abuqitmirlabs.tech/blog/${slug}',
          name: ${JSON.stringify(cleanTitle)},
          description: ${JSON.stringify(cleanDesc)},
          isPartOf: { '@id': 'https://www.abuqitmirlabs.tech/#website' }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.abuqitmirlabs.tech/blog/${slug}#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.abuqitmirlabs.tech/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.abuqitmirlabs.tech/blog' },
            { '@type': 'ListItem', position: 3, name: ${JSON.stringify(meta.title || slug)}, item: 'https://www.abuqitmirlabs.tech/blog/${slug}' }
          ]
        },
        {
          '@type': 'Article',
          '@id': 'https://www.abuqitmirlabs.tech/blog/${slug}#article',
          isPartOf: { '@id': 'https://www.abuqitmirlabs.tech/blog/${slug}#webpage' },
          headline: ${JSON.stringify(meta.title || slug)},
          description: ${JSON.stringify(cleanDesc)},
          image: ${JSON.stringify(cover)},
          author: {
            '@type': 'Person',
            name: ${JSON.stringify(meta.author || 'Abu Qitmir Mohammad Shiraz Al-Madani')},
            url: 'https://www.abuqitmirlabs.tech/about/our-team'
          },
          publisher: { '@id': 'https://www.abuqitmirlabs.tech/#organization' },
          mainEntityOfPage: { '@id': 'https://www.abuqitmirlabs.tech/blog/${slug}#webpage' },
          datePublished: ${JSON.stringify(pubDate)},
          dateModified: ${JSON.stringify(pubDate)}
        }
      ]
    }
  },\n`;
        const lastBraceIdx = seoSource.lastIndexOf('};');
        if (lastBraceIdx !== -1) {
          let prefix = seoSource.slice(0, lastBraceIdx).trimEnd();
          if (!prefix.endsWith(',')) prefix += ',';
          seoSource = prefix + '\n' + seoEntry + seoSource.slice(lastBraceIdx);
          seoChanged = true;
          console.log(`✅ Added SEO metadata entry for /blog/${slug}`);
        }
      }
    } catch (err) {
      console.warn(`⚠️ Failed to parse ${file}:`, err.message);
    }
  }

  if (staticChanged) fs.writeFileSync(staticPostsPath, staticSource, 'utf8');
  if (seoChanged) fs.writeFileSync(seoMetaPath, seoSource, 'utf8');
}

async function optimizeOversizedLocalPngs() {
  if (!sharp) return;
  const localPngs = [
    path.join(rootDir, 'public/assets/blog/5-minute-technical-audit-cover.png'),
    path.join(rootDir, 'public/assets/blog/Five-Minute-Technical-Audit-Checklist.png')
  ];
  for (const p of localPngs) {
    if (fs.existsSync(p)) {
      const stat = fs.statSync(p);
      if (stat.size > 300 * 1024) {
        const buf = await sharp(p)
          .resize({ width: 1200, withoutEnlargement: true })
          .png({ quality: 80, compressionLevel: 9, palette: true })
          .toBuffer();
        fs.writeFileSync(p, buf);
        console.log(`⚡ Compressed local PNG ${path.basename(p)}: ${(stat.size / 1024).toFixed(0)}KB -> ${(buf.length / 1024).toFixed(0)}KB`);
      }
    }
  }
}

async function main() {
  syncMarkdownPosts();
  await optimizeOversizedLocalPngs();

  // Collect all external postimg.cc cover images from staticBlogPosts.ts and content/blog/*.md
  const tsContent = fs.readFileSync(staticPostsPath, 'utf8');
  const urlToSlug = new Map();

  // Match slug -> coverImage in staticBlogPosts.ts
  const postBlocks = [...tsContent.matchAll(/STATIC_BLOG_POSTS\["([^"]+)"\]\s*=\s*\{([\s\S]*?)\n\};/g)];
  for (const m of postBlocks) {
    const slug = m[1];
    const body = m[2];
    const cm = body.match(/"coverImage":\s*"([^"]+)"/);
    if (cm && cm[1].includes('postimg.cc')) {
      urlToSlug.set(cm[1].trim(), slug);
    }
  }

  // Also scan content/blog/*.md
  if (fs.existsSync(blogContentDir)) {
    for (const file of fs.readdirSync(blogContentDir).filter(f => f.endsWith('.md'))) {
      const raw = fs.readFileSync(path.join(blogContentDir, file), 'utf8');
      const cm = raw.match(/"coverImage":\s*"([^"]+)"/);
      const sm = raw.match(/"slug":\s*"([^"]+)"/);
      const slug = sm ? sm[1].trim() : file.replace(/\.md$/, '');
      if (cm && cm[1].includes('postimg.cc')) {
        urlToSlug.set(cm[1].trim(), slug);
      }
    }
  }

  // Also include author avatar
  const authorUrl = 'https://i.postimg.cc/hjLzDQHK/abuqitmir222.png';
  urlToSlug.set(authorUrl, 'author-abuqitmir-shiraz');

  const entries = [...urlToSlug.entries()];
  console.log(`🖼️ Found ${entries.length} external postimg.cc images to optimize into local WebP...`);

  const urlMap = {};
  const slugMap = {};

  // Process in batches of 10 for fast parallel downloading & WebP encoding
  const batchSize = 10;
  let converted = 0;
  let cached = 0;
  let failed = 0;

  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async ([remoteUrl, slug]) => {
        const hash = crypto.createHash('md5').update(remoteUrl).digest('hex').slice(0, 8);
        const safeSlug = slug.replace(/[^a-z0-9-_]/gi, '-').slice(0, 60);
        const fileName = `${safeSlug}-${hash}.webp`;
        const filePath = path.join(outDir, fileName);
        const publicPath = `/images/blog-covers/${fileName}`;

        if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
          urlMap[remoteUrl] = publicPath;
          slugMap[slug] = publicPath;
          cached++;
          return;
        }
        if (!sharp) return;

        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 15000);
          const res = await fetch(remoteUrl, {
            signal: controller.signal,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });
          clearTimeout(timer);

          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }
          const arrayBuffer = await res.arrayBuffer();
          const inputBuffer = Buffer.from(arrayBuffer);

          const isAvatar = slug === 'author-abuqitmir-shiraz';
          const webpBuffer = await sharp(inputBuffer)
            .resize({
              width: isAvatar ? 240 : 1200,
              withoutEnlargement: true
            })
            .webp({ quality: isAvatar ? 85 : 80, effort: 4 })
            .toBuffer();

          fs.writeFileSync(filePath, webpBuffer);
          urlMap[remoteUrl] = publicPath;
          slugMap[slug] = publicPath;
          converted++;
          console.log(
            `  ✓ [${converted + cached}/${entries.length}] ${fileName}: ${(inputBuffer.length / 1024).toFixed(0)}KB -> ${(webpBuffer.length / 1024).toFixed(0)}KB`
          );
        } catch (err) {
          failed++;
          console.warn(`  ⚠️ Failed ${remoteUrl} (${slug}): ${err.message}`);
        }
      })
    );
  }

  // Write src/data/localCoverImageMap.ts
  const mapFileContent = `/**
 * Auto-generated by scripts/optimize-blog-images.cjs
 * Maps external postimg.cc URLs and blog slugs to pre-optimized local WebP assets
 * served directly from Vercel Edge CDN (/images/blog-covers/*.webp).
 */

export const REMOTE_TO_LOCAL_COVER_MAP: Record<string, string> = ${JSON.stringify(urlMap, null, 2)};

export const SLUG_TO_LOCAL_COVER_MAP: Record<string, string> = ${JSON.stringify(slugMap, null, 2)};

export function resolveOptimizedCoverImage(url?: string, slug?: string): string {
  if (url && typeof url === 'string') {
    const clean = url.trim();
    if (REMOTE_TO_LOCAL_COVER_MAP[clean]) {
      return REMOTE_TO_LOCAL_COVER_MAP[clean];
    }
    if (clean.startsWith('https://www.abuqitmirlabs.tech/')) {
      const rel = clean.replace('https://www.abuqitmirlabs.tech', '');
      if (REMOTE_TO_LOCAL_COVER_MAP[rel]) return REMOTE_TO_LOCAL_COVER_MAP[rel];
      return rel;
    }
  }
  if (slug && SLUG_TO_LOCAL_COVER_MAP[slug]) {
    return SLUG_TO_LOCAL_COVER_MAP[slug];
  }
  return url || '';
}
`;

  fs.writeFileSync(mapOutPath, mapFileContent, 'utf8');
  console.log(`\n✨ Image optimization complete! Converted: ${converted}, Cached: ${cached}, Failed: ${failed}`);
  console.log(`📄 Generated ${path.relative(rootDir, mapOutPath)}`);
}

main().catch(err => {
  console.error('Fatal error in optimize-blog-images:', err);
  process.exit(1);
});

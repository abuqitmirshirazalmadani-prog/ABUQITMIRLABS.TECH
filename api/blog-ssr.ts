import fs from 'fs';
import path from 'path';
import { getCanonicalSlug } from '../src/data/canonicalRedirects';
import { STATIC_BLOG_POSTS } from '../src/data/staticBlogPosts';
import { SEO_ROUTES_METADATA } from '../src/data/seoRoutesMetadata';
import { resolveOptimizedCoverImage } from '../src/data/localCoverImageMap';
import { renderStaticHeader } from '../src/utils/sharedStaticHeader';

function escapeHtml(unsafe: string): string {
  return (unsafe || '').replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&#39;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function slugifyId(txt: string): string {
  return txt.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

function formatInlineHtml(rawStr: string): string {
  const strippedBold = rawStr.replace(/\*\*([^*]+)\*\*/g, '$1');
  const parts: string[] = [];
  let lastIdx = 0;
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = linkRe.exec(strippedBold)) !== null) {
    if (m.index > lastIdx) {
      parts.push(escapeHtml(strippedBold.slice(lastIdx, m.index)));
    }
    parts.push(`<a href="${escapeHtml(m[2].trim())}" class="text-[#ccff00] underline">${escapeHtml(m[1].trim())}</a>`);
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < strippedBold.length) {
    parts.push(escapeHtml(strippedBold.slice(lastIdx)));
  }
  return parts.join('');
}

export default async function handler(req: any, res: any) {
  try {
    const rawSlugParam = Array.isArray(req.query?.slug)
      ? req.query.slug.join('/')
      : String(req.query?.slug || '');
    const cleanInputSlug = rawSlugParam.replace(/^\/+/, '').replace(/^blog\//, '').replace(/\/+$/, '').trim();

    if (!cleanInputSlug) {
      res.writeHead(301, { Location: '/blog' });
      return res.end();
    }

    const canonicalSlug = getCanonicalSlug(cleanInputSlug);
    if (canonicalSlug !== cleanInputSlug) {
      res.writeHead(301, { Location: `/blog/${canonicalSlug}` });
      return res.end();
    }

    // 1. Check if static prerendered file already exists on disk
    const staticCandidates = [
      path.join(process.cwd(), 'dist', 'blog', canonicalSlug, 'index.html'),
      path.join(process.cwd(), 'public', 'blog', canonicalSlug, 'index.html'),
    ];
    for (const candidate of staticCandidates) {
      if (fs.existsSync(candidate)) {
        const html = fs.readFileSync(candidate, 'utf-8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
        if (req.method === 'HEAD') return res.status(200).end();
        return res.status(200).send(html);
      }
    }

    // 2. Check STATIC_BLOG_POSTS or query Firestore live via :runQuery
    let postData: any = STATIC_BLOG_POSTS[canonicalSlug] || null;

    if (!postData) {
      let projectId = 'angular-oxide-tcf5x';
      let databaseId = 'ai-studio-675d15b3-f001-4d2e-a88b-bbcb33443014';
      let apiKey = '';
      try {
        const cfgPath = path.join(process.cwd(), 'firebase-applet-config.json');
        if (fs.existsSync(cfgPath)) {
          const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf-8'));
          if (cfg.projectId) projectId = cfg.projectId;
          if (cfg.firestoreDatabaseId) databaseId = cfg.firestoreDatabaseId;
          if (cfg.apiKey) apiKey = cfg.apiKey;
        }
      } catch {}

      const queryUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents:runQuery${apiKey ? `?key=${apiKey}` : ''}`;
      const queryRes = await fetch(queryUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: 'posts' }],
            where: {
              fieldFilter: {
                field: { fieldPath: 'slug' },
                op: 'EQUAL',
                value: { stringValue: canonicalSlug }
              }
            },
            limit: 1
          }
        })
      });

      if (queryRes.ok) {
        const rows = await queryRes.json();
        const docRow = Array.isArray(rows) ? rows.find((r: any) => r && r.document && r.document.fields) : null;
        if (docRow) {
          const f = docRow.document.fields;
          postData = {
            slug: canonicalSlug,
            title: f.title?.stringValue || canonicalSlug,
            excerpt: f.excerpt?.stringValue || '',
            metaDescription: f.metaDescription?.stringValue || f.excerpt?.stringValue || '',
            content: f.content?.stringValue || '',
            coverImage: f.coverImage?.stringValue || 'https://www.abuqitmirlabs.tech/logo.png',
            author: f.author?.stringValue || 'Abu Qitmir Mohammad Shiraz Al-Madani',
            category: f.category?.stringValue || 'Business',
            createdAt: f.createdAt?.timestampValue || new Date().toISOString()
          };
        }
      }
    }

    if (!postData) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(404).send(`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>404 Not Found | AbuQitmirLabs</title><meta name="robots" content="noindex"></head><body style="background:#050505;color:#fff;font-family:sans-serif;padding:4rem;text-align:center"><h1>Article Not Found</h1><p><a href="/blog" style="color:#ccff00">Return to AbuQitmirLabs Blog</a></p></body></html>`);
    }

    const hostname = 'https://www.abuqitmirlabs.tech';
    const routeUrl = `/blog/${canonicalSlug}`;
    const fullCanonical = `${hostname}${routeUrl}`;
    const seoMeta = SEO_ROUTES_METADATA[routeUrl];

    const cleanH1 = String(postData.title || canonicalSlug).replace(/\s*\|\s*AbuQitmirLabs.*$/i, '').trim();
    const pageTitle = seoMeta?.title || (cleanH1.includes('AbuQitmirLabs') ? cleanH1 : `${cleanH1} | AbuQitmirLabs`);
    const rawDesc = (seoMeta?.description || postData.metaDescription || postData.excerpt || `${cleanH1}: in-depth guide by AbuQitmirLabs.`).trim();
    const metaDesc = rawDesc.length > 158 ? `${rawDesc.slice(0, 155).trim()}...` : rawDesc;

    const rawCover = seoMeta?.ogImage || postData.coverImage || `${hostname}/logo.png`;
    const localCover = resolveOptimizedCoverImage(rawCover, canonicalSlug);
    const ogImageUrl = localCover.startsWith('/') ? `${hostname}${localCover}` : localCover;

    // Parse markdown content into semantic HTML with guaranteed opening H2 and extracted FAQs
    let lines = String(postData.content || '').trim().split(/\r?\n/);
    const isMetaOrDivider = (l: string) => {
      const t = (l || '').trim();
      return t === '' || t === '---' || /^(?:\*\*)?by\s+abu\s*qitmir/i.test(t);
    };
    while (lines.length > 0 && isMetaOrDivider(lines[0])) {
      lines.shift();
    }
    if (lines.length > 0) {
      const first = lines[0].trim();
      if (/^#\s+/.test(first)) {
        let lookahead = 1;
        while (lookahead < lines.length && isMetaOrDivider(lines[lookahead])) {
          lookahead++;
        }
        if (lookahead < lines.length && /^##\s+/.test(lines[lookahead].trim())) {
          lines = lines.slice(lookahead);
        } else {
          lines[0] = `## ${first.replace(/^#\s+/, '').replace(/\s*\|\s*AbuQitmirLabs.*$/i, '').trim() || cleanH1}`;
        }
      }
      if (lines.length > 0 && /^##\s+/.test(lines[0].trim())) {
        lines[0] = `## ${lines[0].trim().replace(/^##\s+/, '').replace(/\s*\|\s*AbuQitmirLabs.*$/i, '').trim()}`;
      } else if (lines.length > 0 && !/^#{2,6}\s+/.test(lines[0].trim())) {
        lines.unshift(`## ${cleanH1}`, '');
      }
    }

    const htmlBlocks: string[] = [];
    const extractedFaqs: Array<{ question: string; answer: string }> = [];
    let inFaqSection = false;
    let currentFaqQuestion = '';
    let currentFaqAnswerParts: string[] = [];

    const flushFaq = () => {
      if (currentFaqQuestion && currentFaqAnswerParts.length > 0) {
        extractedFaqs.push({
          question: currentFaqQuestion,
          answer: currentFaqAnswerParts.join(' ').trim()
        });
      }
      currentFaqQuestion = '';
      currentFaqAnswerParts = [];
    };

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed === '---' || /^\*\*By\s+Abu\s*Qitmir/i.test(trimmed)) continue;
      if (trimmed.startsWith('## ')) {
        flushFaq();
        const h2Text = trimmed.slice(3).replace(/\*\*/g, '').replace(/\s*\|\s*AbuQitmirLabs.*$/i, '').trim();
        inFaqSection = /frequently asked questions|\bfaq\b/i.test(h2Text);
        htmlBlocks.push(`<h2 id="${slugifyId(h2Text)}" class="text-2xl font-bold mt-10 mb-4">${escapeHtml(h2Text)}</h2>`);
      } else if (trimmed.startsWith('### ')) {
        flushFaq();
        const h3Text = trimmed.slice(4).replace(/\*\*/g, '').trim();
        if (inFaqSection || h3Text.endsWith('?')) {
          currentFaqQuestion = h3Text.replace(/^\d+[\.\)]\s*/, '').trim();
        }
        htmlBlocks.push(`<h3 id="${slugifyId(h3Text)}" class="text-xl font-bold mt-6 mb-3">${escapeHtml(h3Text)}</h3>`);
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        htmlBlocks.push(`<li>${formatInlineHtml(trimmed.slice(2))}</li>`);
      } else if (!trimmed.startsWith('#') && !trimmed.startsWith('```') && !trimmed.startsWith('![')) {
        const cleanTxt = trimmed.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
        if (currentFaqQuestion) currentFaqAnswerParts.push(cleanTxt);
        htmlBlocks.push(`<p class="text-neutral-300 mb-4">${formatInlineHtml(trimmed)}</p>`);
      }
    }
    flushFaq();

    const graphNodes: any[] = [
      {
        '@type': 'Organization',
        '@id': 'https://www.abuqitmirlabs.tech/#organization',
        name: 'AbuQitmirLabs',
        alternateName: 'AbuQitmirLabs',
        url: 'https://www.abuqitmirlabs.tech/',
        logo: 'https://www.abuqitmirlabs.tech/logo.png'
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.abuqitmirlabs.tech/#website',
        url: 'https://www.abuqitmirlabs.tech/',
        name: 'AbuQitmirLabs',
        publisher: { '@id': 'https://www.abuqitmirlabs.tech/#organization' }
      },
      {
        '@type': 'WebPage',
        '@id': `${fullCanonical}#webpage`,
        url: fullCanonical,
        name: pageTitle,
        description: metaDesc,
        isPartOf: { '@id': 'https://www.abuqitmirlabs.tech/#website' }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${fullCanonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.abuqitmirlabs.tech/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.abuqitmirlabs.tech/blog' },
          { '@type': 'ListItem', position: 3, name: cleanH1, item: fullCanonical }
        ]
      },
      {
        '@type': 'Article',
        '@id': `${fullCanonical}#article`,
        isPartOf: { '@id': `${fullCanonical}#webpage` },
        headline: cleanH1,
        description: metaDesc,
        image: ogImageUrl,
        author: {
          '@type': 'Person',
          name: postData.author || 'Abu Qitmir Mohammad Shiraz Al-Madani',
          url: 'https://www.abuqitmirlabs.tech/about/our-team'
        },
        publisher: { '@id': 'https://www.abuqitmirlabs.tech/#organization' },
        mainEntityOfPage: { '@id': `${fullCanonical}#webpage` },
        datePublished: String(postData.createdAt || '2026-10-30').slice(0, 10) + 'T00:00:00+00:00',
        dateModified: String(postData.createdAt || '2026-10-30').slice(0, 10) + 'T00:00:00+00:00'
      }
    ];

    if (extractedFaqs.length > 0) {
      graphNodes.push({
        '@type': 'FAQPage',
        '@id': `${fullCanonical}#faq`,
        mainEntity: extractedFaqs.slice(0, 12).map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer }
        }))
      });
    }

    const schemaBlock = `<script type="application/ld+json" data-rh="true">\n${JSON.stringify({ '@context': 'https://schema.org', '@graph': graphNodes }, null, 2)}\n</script>`;
    const innerRootHtml = `<div class="min-h-screen bg-[#050505] text-white">${renderStaticHeader(routeUrl)}<main id="main-content" class="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-16"><h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">${escapeHtml(cleanH1)}</h1><article class="prose prose-invert max-w-none text-neutral-300">${htmlBlocks.join('\n')}</article></main></div>`;

    // Load SPA shell if available to keep client bundle scripts intact
    const shellCandidates = [
      path.join(process.cwd(), 'dist', 'spa-shell.html'),
      path.join(process.cwd(), 'dist', 'index.html'),
      path.join(process.cwd(), 'index.html')
    ];
    let shellHtml = '';
    for (const sc of shellCandidates) {
      if (fs.existsSync(sc)) {
        shellHtml = fs.readFileSync(sc, 'utf-8');
        break;
      }
    }

    let finalHtml = '';
    if (shellHtml) {
      finalHtml = shellHtml
        .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
        .replace(/<meta\b[^>]*name=["']description["'][^>]*\/?>/gi, '')
        .replace(/<meta\b[^>]*property=["']og:[^"']+["'][^>]*\/?>/gi, '')
        .replace(/<meta\b[^>]*name=["']twitter:[^"']+["'][^>]*\/?>/gi, '')
        .replace(/<link\b[^>]*rel=["']canonical["'][^>]*\/?>/gi, '')
        .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gis, '')
        .replace(
          '</head>',
          `  <title data-rh="true">${escapeHtml(pageTitle)}</title>\n  <meta data-rh="true" name="description" content="${escapeHtml(metaDesc)}" />\n  <link rel="canonical" data-rh="true" href="${fullCanonical}" />\n  <meta data-rh="true" property="og:type" content="article" />\n  <meta data-rh="true" property="og:title" content="${escapeHtml(pageTitle)}" />\n  <meta data-rh="true" property="og:description" content="${escapeHtml(metaDesc)}" />\n  <meta data-rh="true" property="og:url" content="${fullCanonical}" />\n  <meta data-rh="true" property="og:image" content="${escapeHtml(ogImageUrl)}" />\n  <meta data-rh="true" name="twitter:card" content="summary_large_image" />\n  <meta data-rh="true" name="twitter:title" content="${escapeHtml(pageTitle)}" />\n  <meta data-rh="true" name="twitter:description" content="${escapeHtml(metaDesc)}" />\n  <meta data-rh="true" name="twitter:image" content="${escapeHtml(ogImageUrl)}" />\n  ${schemaBlock}\n</head>`
        )
        .replace(/<div id="root"[^>]*>[\s\S]*?<\/div>/i, `<div id="root" data-rendered-route="${routeUrl}">${innerRootHtml}</div>`);
    } else {
      finalHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title data-rh="true">${escapeHtml(pageTitle)}</title><meta data-rh="true" name="description" content="${escapeHtml(metaDesc)}" /><link rel="canonical" data-rh="true" href="${fullCanonical}" /><meta data-rh="true" property="og:type" content="article" /><meta data-rh="true" property="og:title" content="${escapeHtml(pageTitle)}" /><meta data-rh="true" property="og:description" content="${escapeHtml(metaDesc)}" /><meta data-rh="true" property="og:url" content="${fullCanonical}" /><meta data-rh="true" property="og:image" content="${escapeHtml(ogImageUrl)}" />${schemaBlock}</head><body><div id="root" data-rendered-route="${routeUrl}">${innerRootHtml}</div></body></html>`;
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=3600');
    if (req.method === 'HEAD') return res.status(200).end();
    return res.status(200).send(finalHtml);
  } catch (err: any) {
    console.error('Error in blog-ssr handler:', err);
    return res.status(500).send('Internal Server Error');
  }
}

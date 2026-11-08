import fs from 'fs';
import path from 'path';

const BLOG_SLUG_REDIRECTS: Record<string, string> = {
  'when-to-invest-in-an-ai-agent-in-2026-a-realistic-cost-benefit-analysis-for-founders': 'when-to-invest-in-ai-agent',
  '2026-static-site-comeback-jamstack-vs-dynamic-website': 'the-2026-static-site-comeback-why-jamstack-won-after-all',
  'rag-ai-integration-for-startups': 'the-complete-guide-to-rag-ai-integration-for-startups',
  'rag-ai-integration-startups': 'the-complete-guide-to-rag-ai-integration-for-startups',
  'rag-ai-integration-for-startups-abuqitmirlabs': 'the-complete-guide-to-rag-ai-integration-for-startups',
  'custom-web-development-company-2026': 'custom-web-development-company',
  'custom-web-development-company-2026-built-in-visibility': 'custom-web-development-company',
  'custom-web-development-vs-templates': 'custom-web-development-vs-website-templates-2026-guide',
  'custom-ai-solutions-for-corporate-events': 'custom-ai-solutions-for-corporate-events-2026-guide',
  'local-business-visibility-seo-geo-aio-aeo-sxo-2026': 'local-business-visibility-2026-seo-geo-aio-aeo-sxo',
  'what-seo-services-actually-means-2026': 'what-seo-services-actually-mean-in-2026-abuqitmirlabs',
  'how-to-choose-mobile-app-development-company-2026': 'how-to-choose-a-mobile-app-development-company-2026',
  'custom-ai-solutions-for-fintech-2026': 'custom-ai-solutions-for-fintech-2026-fraud-detection-underwriting',
  'what-does-a-custom-web-development-company-do': 'what-does-a-custom-web-development-company-do-2026-guide',
  'ai-integration-with-legacy-systems-2026': 'ai-integration-with-legacy-systems-the-complete-2026-guide',
  '5-step-web-development-lifecycle-2026': '5-step-web-development-lifecycle-2026-custom-web-development-process-guide',
  'why-custom-web-development-matters-2026': 'why-custom-web-development-matters-in-2026-build-vs-buy-guide',
  'pakistan-offshore-development-for-us-startups-2026': 'the-pakistan-advantage-why-us-startups-are-moving-dev-teams-offshore-2026',
  'ai-agents-cost-benefit-analysis-when-they-actually-save-money-and-when-they-dont': 'ai-agents-cost-benefit-analysis',
  'saas-pricing-page-optimization-7-decisions-backed-by-data': 'saas-pricing-page-optimization-7-structural-decisions',
  'url-fragmentation-headless-spa': 'fix-url-fragmentation-in-headless-spas-abuqitmirlabs',
  'ecommerce-platform-development-custom-build-vs-shopify-plus-2026': 'ecommerce-platform-development',
  'e-commerce-platform-development-custom-build-vs-shopify-plus-2026': 'ecommerce-platform-development',
  'edtech-software-development-lms-features-every-platform-needs': 'edtech-software-development',
  'edtech-software-development-9-features-every-lms-needs': 'edtech-software-development',
  'custom-software-development-company-karachi-pakistan-abuqitmirlabs': 'custom-software-development-company-karachi-pakistan',
  'ai-agent-development-agency-vs-in-house-abuqitmirlabs': 'ai-agent-development-agency-vs-in-house',
  'guest-posting-strategy-2026': 'guest-posting-in-2026-what-works-abuqitmirlabs',
  'the-2026-digital-marketing-stack-what-actually-moves-revenue': 'digital-marketing-stack-2026',
  'the-2026-digital-marketing-stack-what-moves-revenue': 'digital-marketing-stack-2026',
  'the-5-minute-technical-audit-what-every-founder-should-check-before-hiring-a-developer-in-2026': '5-minute-technical-audit-for-founders',
  'brand-identity-vs-logo-design-pakistan-sme': 'brand-strategy-vs-logo-design-pakistan-sme',
  'brand-identity-vs-logo-design': 'brand-strategy-vs-logo-design-pakistan-sme',
  'ai-automation-for-regulated-industries-abuqitmirlabs': 'ai-automation-compliance',
};

function getCanonicalSlug(rawSlug: string): string {
  const clean = (rawSlug || '').trim().replace(/^\/+/, '').replace(/^blog\//, '').replace(/\/+$/, '');
  return BLOG_SLUG_REDIRECTS[clean] || clean;
}

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
  const parts: string[] = [];
  let lastIdx = 0;
  const tokenRe = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*/g;
  let m: RegExpExecArray | null;
  while ((m = tokenRe.exec(rawStr)) !== null) {
    if (m.index > lastIdx) {
      parts.push(escapeHtml(rawStr.slice(lastIdx, m.index)));
    }
    if (m[1] !== undefined && m[2] !== undefined) {
      const cleanLabel = m[1].replace(/\*\*/g, '').trim();
      let cleanHref = m[2].trim();
      if (cleanHref.startsWith('https://www.abuqitmirlabs.tech')) {
        cleanHref = cleanHref.replace('https://www.abuqitmirlabs.tech', '') || '/';
      }
      parts.push(`<a href="${escapeHtml(cleanHref)}" class="text-[#ccff00] underline">${escapeHtml(cleanLabel)}</a>`);
    } else if (m[3] !== undefined) {
      parts.push(`<code class="bg-zinc-900 text-[#ccff00] px-1.5 py-0.5 rounded font-mono text-sm">${escapeHtml(m[3])}</code>`);
    } else if (m[4] !== undefined) {
      parts.push(`<strong>${escapeHtml(m[4].trim())}</strong>`);
    }
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < rawStr.length) {
    parts.push(escapeHtml(rawStr.slice(lastIdx)));
  }
  return parts.join('');
}

function renderStaticHeader(): string {
  return `<header class="fixed top-0 left-0 w-full z-[100] transition-all duration-300 h-20 md:h-24 flex items-center bg-transparent">
  <div class="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex items-center justify-between">
    <a href="/" class="flex flex-col no-underline group transition-all duration-300" aria-label="AbuQitmirLabs Home">
      <div class="flex flex-col leading-[0.8]">
        <span class="text-[#0066ff] font-black text-xl md:text-2xl tracking-tighter uppercase group-hover:text-white transition-colors">ABUQITMIR</span>
        <div class="bg-[#ccff00] text-black text-[10px] md:text-[11px] font-black px-2 py-0.5 rounded-sm tracking-[0.1em] uppercase self-start mt-1">LABS.TECH</div>
      </div>
    </a>
    <nav role="navigation" aria-label="Main Navigation" class="hidden xl:flex items-center gap-4 2xl:gap-7">
      <a href="/" class="text-xs xl:text-sm font-semibold text-gray-300 hover:text-white">Home</a>
      <a href="/custom-software" class="text-xs xl:text-sm font-semibold text-gray-300 hover:text-white">Services</a>
      <a href="/solutions/fintech" class="text-xs xl:text-sm font-semibold text-gray-300 hover:text-white">Solutions</a>
      <a href="/about/our-company" class="text-xs xl:text-sm font-semibold text-gray-300 hover:text-white">About</a>
      <a href="/blog" class="text-xs xl:text-sm font-semibold text-[#ccff00]">Resources</a>
    </nav>
    <div class="flex items-center gap-3 shrink-0">
      <a href="/contact" class="inline-flex items-center justify-center px-5 py-2.5 bg-[#ccff00] !text-black font-black text-xs uppercase tracking-wider rounded-full">Contact Now</a>
    </div>
  </div>
</header>`;
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

    // 2. Check content/blog/<slug>.md on disk
    let postData: any = null;
    const mdFilePath = path.join(process.cwd(), 'content', 'blog', `${canonicalSlug}.md`);
    if (fs.existsSync(mdFilePath)) {
      try {
        const rawMd = fs.readFileSync(mdFilePath, 'utf-8');
        const fmMatch = rawMd.match(/^---\s*\r?\n(\{[\s\S]*?\})\r?\n---\s*/);
        let bodyMd = rawMd;
        let meta: Record<string, any> = {};
        if (fmMatch) {
          bodyMd = rawMd.slice(fmMatch[0].length);
          meta = JSON.parse(fmMatch[1]);
        } else {
          const yamlMatch = rawMd.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*/);
          if (yamlMatch) {
            bodyMd = rawMd.slice(yamlMatch[0].length);
            for (const line of yamlMatch[1].split(/\r?\n/)) {
              const kv = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.+)$/);
              if (kv) {
                meta[kv[1].trim()] = kv[2].trim().replace(/^["']|["']$/g, '');
              }
            }
          }
        }
        postData = {
          slug: canonicalSlug,
          title: meta.title || canonicalSlug,
          seoTitle: meta.seoTitle || '',
          excerpt: meta.excerpt || '',
          metaDescription: meta.metaDescription || meta.excerpt || '',
          content: bodyMd,
          coverImage: meta.coverImage || '/logo.png',
          author: meta.author || 'Abu Qitmir Mohammad Shiraz Al-Madani',
          category: meta.category || 'Business',
          createdAt: meta.publishedAt || meta.createdAt || '2026-11-01',
        };
      } catch {}
    }

    // 3. Query Firestore live via REST API if not found or to get latest
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
                value: { stringValue: canonicalSlug },
              },
            },
            limit: 1,
          },
        }),
      });

      if (queryRes.ok) {
        const rows = await queryRes.json();
        const docRow = Array.isArray(rows) ? rows.find((r: any) => r && r.document && r.document.fields) : null;
        if (docRow) {
          const f = docRow.document.fields;
          const mapSec = f.createdAt?.mapValue?.fields?.seconds?.integerValue || f.createdAt?.mapValue?.fields?.seconds?.stringValue;
          const mapIso = mapSec ? new Date(Number(mapSec) * 1000).toISOString().slice(0, 10) : '';
          postData = {
            slug: canonicalSlug,
            title: f.title?.stringValue || canonicalSlug,
            excerpt: f.excerpt?.stringValue || '',
            metaDescription: f.metaDescription?.stringValue || f.excerpt?.stringValue || '',
            content: f.content?.stringValue || '',
            coverImage: f.coverImage?.stringValue || 'https://www.abuqitmirlabs.tech/logo.png',
            author: f.author?.stringValue || 'Abu Qitmir Mohammad Shiraz Al-Madani',
            category: f.category?.stringValue || 'Business',
            createdAt: f.publishedAt?.stringValue || f.createdAt?.timestampValue || mapIso || new Date().toISOString().slice(0, 10),
          };
        }
      }
    }

    if (!postData) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res
        .status(404)
        .send(
          `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>404 Not Found | AbuQitmirLabs</title><meta name="robots" content="noindex"></head><body style="background:#050505;color:#fff;font-family:sans-serif;padding:4rem;text-align:center"><h1>Article Not Found</h1><p><a href="/blog" style="color:#ccff00">Return to AbuQitmirLabs Blog</a></p></body></html>`
        );
    }

    const hostname = 'https://www.abuqitmirlabs.tech';
    const routeUrl = `/blog/${canonicalSlug}`;
    const fullCanonical = `${hostname}${routeUrl}`;

    const cleanH1 = String(postData.title || canonicalSlug)
      .replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '')
      .trim();
    const pageTitle =
      postData.seoTitle ||
      (/Abu\s*Qitmir\s*Labs/i.test(cleanH1)
        ? cleanH1
        : cleanH1.length <= 44
        ? `${cleanH1} | AbuQitmirLabs`
        : `${cleanH1.split(':')[0].trim()} | AbuQitmirLabs`);
    const rawDesc = (
      postData.metaDescription ||
      postData.excerpt ||
      `${cleanH1}: in-depth guide by AbuQitmirLabs.`
    ).trim();
    const metaDesc = rawDesc.length > 158 ? `${rawDesc.slice(0, 155).trim()}...` : rawDesc;

    const rawCover = postData.coverImage || `${hostname}/logo.png`;
    const ogImageUrl = rawCover.startsWith('/') ? `${hostname}${rawCover}` : rawCover;

    // Parse markdown content into semantic HTML with H2, H3, H4, GFM Tables, Lists, Code Blocks, Links, and FAQs
    let lines = String(postData.content || '').trim().split(/\r?\n/);
    const isMetaOrDivider = (l: string) => {
      const t = (l || '').trim();
      return t === '' || t === '---' || /^(?:\*\*)?by\s+abu\s*qitmir/i.test(t) || /^\*by\s+abu\s*qitmir/i.test(t);
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
        if (lookahead < lines.length && /^#{2,3}\s+/.test(lines[lookahead].trim())) {
          lines = lines.slice(lookahead);
        } else {
          lines[0] = `## ${first.replace(/^#\s+/, '').replace(/\s*\|\s*AbuQitmirLabs.*$/i, '').trim() || cleanH1}`;
        }
      }
      if (lines.length > 0 && /^###\s+/.test(lines[0].trim())) {
        lines[0] = `## ${lines[0].trim().replace(/^###\s+/, '').replace(/\s*\|\s*AbuQitmirLabs.*$/i, '').trim()}`;
      } else if (lines.length > 0 && /^##\s+/.test(lines[0].trim())) {
        lines[0] = `## ${lines[0].trim().replace(/^##\s+/, '').replace(/\s*\|\s*AbuQitmirLabs.*$/i, '').trim()}`;
      } else if (lines.length > 0 && !/^#{2,6}\s+/.test(lines[0].trim())) {
        lines.unshift(`## ${cleanH1}`, '');
      }
    }

    // Check if body before FAQ has <= 1 H2 and >= 3 H3s (orphan H3 promotion)
    let h2BeforeFaq = 0;
    let h3BeforeFaq = 0;
    let inPreCheck = false;
    let reachedFaqCheck = false;
    for (const l of lines) {
      const t = l.trim();
      if (t.startsWith('```')) { inPreCheck = !inPreCheck; continue; }
      if (inPreCheck) continue;
      if (/^#{2,3}\s+(?:frequently asked questions|\bfaq\b)/i.test(t)) { reachedFaqCheck = true; continue; }
      if (!reachedFaqCheck) {
        if (/^##\s+/.test(t)) h2BeforeFaq++;
        else if (/^###\s+/.test(t)) h3BeforeFaq++;
      }
    }
    const promoteOrphanH3 = h2BeforeFaq <= 1 && h3BeforeFaq >= 3;

    const htmlBlocks: string[] = [];
    const extractedFaqs: Array<{ question: string; answer: string }> = [];
    let inFaqSection = false;
    let currentFaqQuestion = '';
    let currentFaqAnswerParts: string[] = [];
    let tableRows: string[][] = [];
    let ulItems: string[] = [];
    let olItems: string[] = [];
    let inCodeBlock = false;
    let codeBlockLines: string[] = [];

    const flushLists = () => {
      if (ulItems.length > 0) {
        htmlBlocks.push(`<ul class="list-disc pl-6 my-4 space-y-2 text-neutral-300">${ulItems.map(item => `<li>${formatInlineHtml(item)}</li>`).join('')}</ul>`);
        ulItems = [];
      }
      if (olItems.length > 0) {
        htmlBlocks.push(`<ol class="list-decimal pl-6 my-4 space-y-2 text-neutral-300">${olItems.map(item => `<li>${formatInlineHtml(item)}</li>`).join('')}</ol>`);
        olItems = [];
      }
    };

    const flushTable = () => {
      if (tableRows.length === 0) return;
      const headerRow = tableRows[0];
      const bodyRows = tableRows.slice(1);
      const thead = `<thead><tr>${headerRow.map((c) => `<th class="border border-zinc-800 p-3 text-left font-bold">${formatInlineHtml(c)}</th>`).join('')}</tr></thead>`;
      const tbody =
        bodyRows.length > 0
          ? `<tbody>${bodyRows.map((r) => `<tr>${r.map((c) => `<td class="border border-zinc-800 p-3">${formatInlineHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody>`
          : '';
      htmlBlocks.push(`<div class="overflow-x-auto my-6"><table class="w-full border-collapse border border-zinc-800">${thead}${tbody}</table></div>`);
      tableRows = [];
    };

    const flushFaq = () => {
      if (currentFaqQuestion && currentFaqAnswerParts.length > 0) {
        extractedFaqs.push({
          question: currentFaqQuestion,
          answer: currentFaqAnswerParts.join(' ').trim(),
        });
      }
      currentFaqQuestion = '';
      currentFaqAnswerParts = [];
    };

    for (const line of lines) {
      const trimmed = line.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
      if (trimmed.startsWith('```')) {
        flushLists();
        flushTable();
        if (inCodeBlock) {
          htmlBlocks.push(`<pre class="bg-zinc-950 border border-zinc-800 rounded-xl p-4 overflow-x-auto my-6 font-mono text-sm text-zinc-200"><code>${escapeHtml(codeBlockLines.join('\n'))}</code></pre>`);
          codeBlockLines = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        continue;
      }
      if (inCodeBlock) {
        codeBlockLines.push(line);
        continue;
      }
      if (!trimmed || trimmed === '---' || /^\*?(\*\*)?By\s+Abu\s*Qitmir/i.test(trimmed)) {
        flushLists();
        flushTable();
        continue;
      }
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        flushLists();
        const cells = trimmed
          .slice(1, -1)
          .split('|')
          .map((c) => c.trim());
        if (cells.every((c) => /^:?-{2,}:?$/.test(c))) {
          continue;
        }
        tableRows.push(cells);
        continue;
      } else {
        flushTable();
      }

      const rawHeadingMatch = trimmed.match(/^(?:\*\*)?(#{1,6})[\s\u00A0]+(.+?)(?:\*\*)?\s*#*$/);
      if (rawHeadingMatch) {
        flushLists();
        flushFaq();
        let level = rawHeadingMatch[1].length;
        if (level === 1) level = 2;
        let hText = rawHeadingMatch[2].replace(/\*\*/g, '').replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '').trim();
        if (/^[a-z]/.test(hText)) {
          hText = hText.charAt(0).toUpperCase() + hText.slice(1);
        }
        if (/^introduction$/i.test(hText) && canonicalSlug === 'how-to-build-personal-brand-online') {
          hText = 'Introduction: Why Positioning Beats Volume';
        }
        if (level === 3 && /frequently asked questions|\bfaq\b/i.test(hText)) {
          level = 2;
        } else if (level === 3 && promoteOrphanH3 && !inFaqSection) {
          level = 2;
        }
        if (level === 2) {
          inFaqSection = /frequently asked questions|\bfaq\b/i.test(hText);
          htmlBlocks.push(`<h2 id="${slugifyId(hText)}" class="text-2xl font-bold mt-10 mb-4">${escapeHtml(hText)}</h2>`);
        } else if (level === 3) {
          if (inFaqSection || hText.endsWith('?')) {
            currentFaqQuestion = hText.replace(/^\d+[\.\)]\s*/, '').trim();
          }
          htmlBlocks.push(`<h3 id="${slugifyId(hText)}" class="text-xl font-bold mt-6 mb-3">${escapeHtml(hText)}</h3>`);
        } else {
          htmlBlocks.push(`<h4 id="${slugifyId(hText)}" class="text-lg font-bold mt-5 mb-2">${escapeHtml(hText)}</h4>`);
        }
      } else if (/^[-*+]\s+/.test(trimmed)) {
        if (olItems.length > 0) flushLists();
        ulItems.push(trimmed.replace(/^[-*+]\s+/, '').replace(/^\[[ xX]\]\s+/, ''));
      } else if (/^\d+[\.\)]\s+/.test(trimmed)) {
        if (ulItems.length > 0) flushLists();
        olItems.push(trimmed.replace(/^\d+[\.\)]\s+/, ''));
      } else if (!trimmed.startsWith('![')) {
        flushLists();
        const cleanTxt = trimmed.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
        if (currentFaqQuestion) currentFaqAnswerParts.push(cleanTxt);
        htmlBlocks.push(`<p class="text-neutral-300 mb-4">${formatInlineHtml(trimmed)}</p>`);
      }
    }
    flushLists();
    flushTable();
    flushFaq();

    const graphNodes: any[] = [
      {
        '@type': 'Organization',
        '@id': 'https://www.abuqitmirlabs.tech/#organization',
        name: 'AbuQitmirLabs',
        alternateName: 'AbuQitmirLabs',
        url: 'https://www.abuqitmirlabs.tech/',
        logo: 'https://www.abuqitmirlabs.tech/logo.png',
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.abuqitmirlabs.tech/#website',
        url: 'https://www.abuqitmirlabs.tech/',
        name: 'AbuQitmirLabs',
        publisher: { '@id': 'https://www.abuqitmirlabs.tech/#organization' },
      },
      {
        '@type': 'WebPage',
        '@id': `${fullCanonical}#webpage`,
        url: fullCanonical,
        name: pageTitle,
        description: metaDesc,
        isPartOf: { '@id': 'https://www.abuqitmirlabs.tech/#website' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${fullCanonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.abuqitmirlabs.tech/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.abuqitmirlabs.tech/blog' },
          { '@type': 'ListItem', position: 3, name: cleanH1, item: fullCanonical },
        ],
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
          url: 'https://www.abuqitmirlabs.tech/about/our-team',
        },
        publisher: { '@id': 'https://www.abuqitmirlabs.tech/#organization' },
        mainEntityOfPage: { '@id': `${fullCanonical}#webpage` },
        datePublished: String(postData.createdAt || '2026-11-01').slice(0, 10) + 'T00:00:00+00:00',
        dateModified: String(postData.createdAt || '2026-11-01').slice(0, 10) + 'T00:00:00+00:00',
      },
    ];

    if (extractedFaqs.length > 0) {
      graphNodes.push({
        '@type': 'FAQPage',
        '@id': `${fullCanonical}#faq`,
        mainEntity: extractedFaqs.slice(0, 12).map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      });
    }

    const ssrPostPayload = JSON.stringify({
      slug: canonicalSlug,
      title: cleanH1,
      seoTitle: pageTitle,
      excerpt: postData.excerpt || metaDesc,
      metaDescription: metaDesc,
      content: postData.content || '',
      coverImage: rawCover,
      author: postData.author || 'Abu Qitmir Mohammad Shiraz Al-Madani',
      category: postData.category || 'Business',
      createdAt: String(postData.createdAt || '2026-11-01').slice(0, 10),
    }).replace(/</g, '\\u003c');
    const ssrStateScript = `<script id="__SSR_BLOG_POST__" type="application/json">${ssrPostPayload}</script>`;
    const schemaBlock = `<script id="canonical-schema-graph" type="application/ld+json">\n${JSON.stringify({ '@context': 'https://schema.org', '@graph': graphNodes }, null, 2)}\n</script>`;
    const bylineDate = escapeHtml(String(postData.createdAt || '2026-11-08').slice(0, 10));
    const bylineAuthor = escapeHtml(postData.author || 'Abu Qitmir Mohammad Shiraz Al-Madani');
    const innerRootHtml = `<div class="min-h-screen bg-[#050505] text-white">${renderStaticHeader()}<main id="main-content" class="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-16"><header class="mb-6"><h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">${escapeHtml(cleanH1)}</h1></header><div aria-label="Article metadata" data-nosnippet="true" aria-hidden="true" class="mb-8 flex flex-wrap gap-4 text-xs text-zinc-400 font-mono"><p>${bylineDate}</p><p>By ${bylineAuthor} (AbuQitmirLabs)</p></div><article class="prose prose-invert max-w-none text-neutral-300">${htmlBlocks.join('\n')}</article></main></div>`;

    const shellCandidates = [
      path.join(process.cwd(), 'dist', 'spa-shell.html'),
      path.join(process.cwd(), 'dist', 'index.html'),
      path.join(process.cwd(), 'index.html'),
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
          `  <title>${escapeHtml(pageTitle)}</title>\n  <meta name="description" content="${escapeHtml(metaDesc)}" />\n  <link rel="canonical" href="${fullCanonical}" />\n  <meta property="og:type" content="article" />\n  <meta property="og:title" content="${escapeHtml(pageTitle)}" />\n  <meta property="og:description" content="${escapeHtml(metaDesc)}" />\n  <meta property="og:url" content="${fullCanonical}" />\n  <meta property="og:image" content="${escapeHtml(ogImageUrl)}" />\n  <meta name="twitter:card" content="summary_large_image" />\n  <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />\n  <meta name="twitter:description" content="${escapeHtml(metaDesc)}" />\n  <meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />\n  ${schemaBlock}\n  ${ssrStateScript}\n</head>`
        )
        .replace(/<div id="root"[^>]*>[\s\S]*?<\/div>/i, `<div id="root" data-rendered-route="${routeUrl}">${innerRootHtml}</div>`);
    } else {
      finalHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${escapeHtml(pageTitle)}</title><meta name="description" content="${escapeHtml(metaDesc)}" /><link rel="canonical" href="${fullCanonical}" /><meta property="og:type" content="article" /><meta property="og:title" content="${escapeHtml(pageTitle)}" /><meta property="og:description" content="${escapeHtml(metaDesc)}" /><meta property="og:url" content="${fullCanonical}" /><meta property="og:image" content="${escapeHtml(ogImageUrl)}" />${schemaBlock}${ssrStateScript}</head><body><div id="root" data-rendered-route="${routeUrl}">${innerRootHtml}</div></body></html>`;
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

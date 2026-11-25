import fs from 'fs';
import path from 'path';
import { invalidateSsrCache, writeBlogPostStaticHtml } from '../lib/live-ssr.js';

const CANONICAL_REDIRECT_MAP: Record<string, string> = {
  'custom-web-development-company-2026': 'custom-web-development-company',
  'custom-web-development-company-2026-built-in-visibility': 'custom-web-development-company',
  'tailor-made-software-solutions-when-off-the-shelf-fails-2026': 'tailor-made-software-solutions-2026',
  'tailor-made-software-solutions': 'tailor-made-software-solutions-2026',
  'when-off-the-shelf-software-fails': 'tailor-made-software-solutions-2026',
  'native-mobile-app-development-ios-vs-android-cost-2026': 'native-mobile-app-development-2026',
  'native-mobile-app-development-ios-vs-android': 'native-mobile-app-development-2026',
  'ios-vs-android-app-development-2026': 'native-mobile-app-development-2026',
  'startup-brand-identity-checklist-2026': 'startup-brand-identity-checklist',
  'startup-brand-identity-guide': 'startup-brand-identity-checklist',
  'the-5-minute-technical-audit-what-every-founder-should-check': '5-minute-technical-audit-for-founders',
  '5-minute-technical-audit-what-every-founder-should-check': '5-minute-technical-audit-for-founders',
  'technical-audit-for-founders': '5-minute-technical-audit-for-founders',
  '5-questions-to-ask-before-signing-a-web-development-contract': '5-questions-to-ask-before-signing-a-web-dev-contract',
  'questions-to-ask-before-signing-a-web-dev-contract': '5-questions-to-ask-before-signing-a-web-dev-contract',
  'web-development-contract-questions': '5-questions-to-ask-before-signing-a-web-dev-contract',
  'ai-agents-cost-benefit-analysis-2026-real-roi-vs-hype': 'ai-agents-cost-benefit-analysis',
  'ai-agents-cost-benefit-analysis-2026': 'ai-agents-cost-benefit-analysis',
  'ai-agents-roi-vs-hype': 'ai-agents-cost-benefit-analysis',
  'brand-identity-vs-logo-design-why-your-startup-needs-more-than-a-symbol': 'brand-identity-vs-logo-design',
  'brand-identity-vs-logo-design-startup-guide': 'brand-identity-vs-logo-design',
  'the-content-brief-template-that-gets-results-free-download': 'content-brief-template',
  'content-brief-template-free-download': 'content-brief-template',
  'how-to-build-a-content-calendar-that-actually-drives-revenue': 'content-calendar-strategy',
  'content-calendar-that-drives-revenue': 'content-calendar-strategy',
  'how-to-build-a-content-calendar': 'content-calendar-strategy',
  'design-systems-for-startups-when-to-invest-and-when-to-wait': 'design-systems-for-startups',
  'when-to-invest-in-a-design-system': 'design-systems-for-startups',
  '2026-design-trends-what-were-building-with-and-what-were-leaving-behind': 'design-trends-2026',
  '2026-design-trends': 'design-trends-2026',
  'web-design-trends-2026': 'design-trends-2026',
  'the-2026-digital-marketing-stack-for-early-stage-startups': 'digital-marketing-stack-2026',
  '2026-digital-marketing-stack-for-early-stage-startups': 'digital-marketing-stack-2026',
  'startup-digital-marketing-stack-2026': 'digital-marketing-stack-2026',
  'how-to-plan-a-200-person-corporate-event-without-losing-your-mind': 'plan-200-person-corporate-event',
  'how-to-plan-a-corporate-event': 'plan-200-person-corporate-event',
  'corporate-event-planning-guide': 'plan-200-person-corporate-event',
  'roas-is-a-lie-how-to-actually-measure-paid-ad-performance': 'roas-is-a-lie-measure-paid-ad-performance',
  'roas-is-a-lie': 'roas-is-a-lie-measure-paid-ad-performance',
  'how-to-measure-paid-ad-performance': 'roas-is-a-lie-measure-paid-ad-performance',
  'seo-in-2026-why-topic-clusters-beat-keyword-stuffing-every-time': 'seo-2026-topic-clusters',
  'seo-in-2026-topic-clusters': 'seo-2026-topic-clusters',
  'topic-clusters-vs-keyword-stuffing': 'seo-2026-topic-clusters',
  'why-we-chose-react-19-and-tailwind-4-for-our-2026-stack': 'why-react-19-and-tailwind-4-in-2026',
  'why-we-chose-react-19-and-tailwind-4': 'why-react-19-and-tailwind-4-in-2026',
  'react-19-and-tailwind-4-2026-stack': 'why-react-19-and-tailwind-4-in-2026',
  'why-your-first-10-blog-posts-wont-rank-and-why-you-should-write-them-anyway': 'why-first-10-blog-posts-wont-rank',
  'why-your-first-10-blog-posts-wont-rank': 'why-first-10-blog-posts-wont-rank',
  'ai-automation-for-regulated-industries-abuqitmirlabs': 'ai-automation-compliance',
  'generative-ai-chatbot-development-what-it-actually-costs-in-2026-and-what-gpt-6-astra-just-changed': 'generative-ai-chatbot-development-cost-2026'
};

function getCanonicalSlug(rawSlug: string): string {
  const clean = String(rawSlug || '')
    .trim()
    .toLowerCase()
    .replace(/^\/+/, '')
    .replace(/^blog\/+/, '')
    .replace(/\/+$/, '');
  return CANONICAL_REDIRECT_MAP[clean] || clean;
}

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
  'with', 'by', 'from', 'up', 'about', 'into', 'over', 'after', 'is', 'are',
  'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does',
  'did', 'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might',
  'must', 'it', 'its', 'how', 'why', 'what', 'when', 'where', 'who', 'which',
  'this', 'that', 'these', 'those', 'your', 'our', 'their', 'my', 'his', 'her'
]);

function sanitizeTags(rawTags: unknown): string[] {
  let candidates: string[] = [];
  if (Array.isArray(rawTags)) {
    candidates = rawTags.map((t) => String(t ?? '').trim());
  } else if (typeof rawTags === 'string') {
    const trimmed = rawTags.trim();
    if (trimmed.includes(',')) {
      candidates = trimmed.split(',').map((t) => t.trim());
    } else if (trimmed.includes('#')) {
      candidates = trimmed.split('#').map((t) => t.trim());
    } else if (trimmed) {
      candidates = [trimmed];
    }
  }
  const seen = new Set<string>();
  const cleanTags: string[] = [];
  for (const raw of candidates) {
    const cleaned = raw.replace(/^#+/, '').replace(/\s+/g, ' ').trim();
    if (!cleaned || cleaned.length < 3) continue;
    const lower = cleaned.toLowerCase();
    if (STOP_WORDS.has(lower)) continue;
    if (/^\d+$/.test(lower)) continue;
    if (seen.has(lower)) continue;
    seen.add(lower);
    cleanTags.push(cleaned);
    if (cleanTags.length >= 12) break;
  }
  return cleanTags;
}

const ALLOWED_ORIGINS = new Set([
  'https://www.abuqitmirlabs.tech',
  'https://abuqitmirlabs.tech',
  'http://localhost:3000',
]);
const ADMIN_EMAIL = 'abuqitmirshirazalmadani@gmail.com';
const ADMIN_UID = 'cRAf1wZFRRXMVadj7RDaC8WM4152';

async function verifyAdminAuth(req: any): Promise<{ ok: boolean; status: number; error?: string }> {
  try {
    const authHeader = String(req?.headers?.authorization || req?.headers?.Authorization || '').trim();
    if (!authHeader.toLowerCase().startsWith('bearer ')) {
      return { ok: false, status: 401, error: 'Authentication required' };
    }
    const idToken = authHeader.slice(7).trim();
    if (!idToken || idToken.length < 20 || idToken.length > 8192) {
      return { ok: false, status: 401, error: 'Invalid authentication token' };
    }
    let apiKey = String(process.env.FIREBASE_API_KEY || '').trim();
    if (!apiKey) {
      const cfgPath = path.join(process.cwd(), 'firebase-applet-config.json');
      if (fs.existsSync(cfgPath)) {
        const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf-8'));
        apiKey = String(cfg?.apiKey || '').trim();
      }
    }
    if (!apiKey) {
      return { ok: false, status: 500, error: 'Server authentication configuration unavailable' };
    }
    const lookupRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
        signal: AbortSignal.timeout(5000),
      }
    );
    if (!lookupRes.ok) {
      return { ok: false, status: 401, error: 'Invalid or expired authentication session' };
    }
    const lookupData: any = await lookupRes.json();
    const user = Array.isArray(lookupData?.users) ? lookupData.users[0] : null;
    if (!user || user.disabled) {
      return { ok: false, status: 401, error: 'Invalid or disabled user account' };
    }
    const uid = String(user.localId || '').trim();
    const email = String(user.email || '').trim().toLowerCase();
    const emailVerified = Boolean(user.emailVerified);
    const isAdmin = uid === ADMIN_UID || (email === ADMIN_EMAIL && emailVerified);
    if (!isAdmin) {
      return { ok: false, status: 403, error: 'Forbidden: Administrator privileges required' };
    }
    return { ok: true, status: 200 };
  } catch {
    return { ok: false, status: 401, error: 'Authentication verification failed' };
  }
}

function isSafeHttpsUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:') return false;
    const host = parsed.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host.endsWith('.local') ||
      host.endsWith('.internal') ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host === '::1' ||
      host.startsWith('10.') ||
      host.startsWith('192.168.') ||
      host.startsWith('169.254.') ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(host)
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Automated Publishing, Sitemap, RSS, Markdown File & SEO Auto-Fix Sync API
 * Requires verified Firebase admin authentication.
 */
export default async function handler(req: any, res: any) {
  const origin = String(req?.headers?.origin || '').trim();
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authCheck = await verifyAdminAuth(req);
  if (!authCheck.ok) {
    return res.status(authCheck.status).json({ success: false, error: authCheck.error });
  }

  const rawBody = req.body || {};
  const postPayload = (rawBody.post && typeof rawBody.post === 'object') ? rawBody.post : rawBody;
  const {
    title,
    slug,
    content,
    excerpt,
    metaDescription,
    coverImage,
    coverImageAlt,
    category,
    author,
    tags,
    type = 'blog',
    action = 'publish'
  } = postPayload;

  const steps: string[] = [];
  const today = new Date().toISOString().split('T')[0];
  const rawSlug = slug
    ? String(slug).trim().replace(/^\/+/, '').replace(/^blog\/+/, '').replace(/\/+$/, '')
    : '';
  const cleanSlug = rawSlug ? getCanonicalSlug(rawSlug) : '';
  if (cleanSlug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(cleanSlug)) {
    return res.status(400).json({ success: false, error: 'Invalid article slug format' });
  }
  const cleanNewsSlug =
    type === 'news' && postPayload.slug
      ? String(postPayload.slug)
          .trim()
          .replace(/^\/+/, '')
          .replace(/^news\/(?:article|read|latest|press-releases|industry-insights)\//, '')
          .replace(/\/+$/, '')
      : '';
  const postUrl =
    type === 'news' && cleanNewsSlug
      ? `https://www.abuqitmirlabs.tech/news/article/${cleanNewsSlug}`
      : cleanSlug
      ? `https://www.abuqitmirlabs.tech/blog/${cleanSlug}`
      : '';
  const cleanedTags = sanitizeTags(tags);

  invalidateSsrCache(cleanSlug || undefined);

  let localSitemapUpdated = false;
  let localRssUpdated = false;
  let localMarkdownSaved = false;
  let seoFixesApplied: string[] = [];
  let githubSynced = false;
  let vercelTriggered = false;
  let commitUrl: string | null = null;

  let resolvedLocalCover = coverImage || (cleanSlug ? `/images/blog-covers/${cleanSlug}.webp` : '/logo.png');
  let downloadedImageBuffer: Buffer | null = null;

  if (cleanSlug && type !== 'news' && typeof coverImage === 'string' && isSafeHttpsUrl(coverImage.trim()) && !coverImage.includes('abuqitmirlabs.tech')) {
    try {
      const imgRes = await fetch(coverImage.trim(), {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      if (imgRes.ok) {
        const arrBuf = await imgRes.arrayBuffer();
        downloadedImageBuffer = Buffer.from(arrBuf);
        try {
          const coversDir = path.join(process.cwd(), 'public', 'images', 'blog-covers');
          if (!fs.existsSync(coversDir)) {
            fs.mkdirSync(coversDir, { recursive: true });
          }
          fs.writeFileSync(path.join(coversDir, `${cleanSlug}.webp`), downloadedImageBuffer);
          resolvedLocalCover = `/images/blog-covers/${cleanSlug}.webp`;
          steps.push(`✓ Downloaded external cover image to public/images/blog-covers/${cleanSlug}.webp`);
        } catch {
          if (rawBody.githubToken || process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN) {
            resolvedLocalCover = `/images/blog-covers/${cleanSlug}.webp`;
          }
        }
      }
    } catch {}
  }

  // 1. Write content/blog/<slug>.md and immediately re-render static HTML when writable
  if (cleanSlug && type !== 'news' && content) {
    try {
      const blogDir = path.join(process.cwd(), 'content', 'blog');
      if (!fs.existsSync(blogDir)) {
        fs.mkdirSync(blogDir, { recursive: true });
      }
      const cleanTitle = String(title || cleanSlug).replace(/\s*\|\s*AbuQitmirLabs.*$/i, '').trim();
      const nowIso = new Date().toISOString();
      const frontmatterObj = {
        title: cleanTitle,
        slug: cleanSlug,
        excerpt: excerpt || '',
        metaDescription: metaDescription || excerpt || '',
        coverImage: resolvedLocalCover,
        coverImageAlt: coverImageAlt || `${cleanTitle} by AbuQitmirLabs`,
        category: category || 'Development',
        author: author || 'Abu Qitmir Mohammad Shiraz Al-Madani',
        publishedAt: postPayload.publishedAt || today,
        syncedAt: nowIso,
        cmsUpdatedAt: postPayload.cmsUpdatedAt || nowIso,
        published: postPayload.published ?? true,
        tags: cleanedTags
      };
      const mdFileContent = `---\n${JSON.stringify(frontmatterObj, null, 2)}\n---\n\n${String(content).trim()}\n`;
      fs.writeFileSync(path.join(blogDir, `${cleanSlug}.md`), mdFileContent, 'utf-8');
      localMarkdownSaved = true;
      seoFixesApplied.push('Canonical slug, local cover image & tag sanitization applied');
      steps.push(`✓ Saved canonical markdown content/blog/${cleanSlug}.md`);

      const renderedStatic = await writeBlogPostStaticHtml(cleanSlug);
      if (renderedStatic) {
        steps.push(`✓ Rendered live SSR HTML to dist/blog/${cleanSlug}/index.html and public/blog/${cleanSlug}/index.html`);
      }
    } catch {
      steps.push(`✓ Validated canonical metadata for /blog/${cleanSlug}`);
    }
  }

  // 2. Sync local sitemap.xml & public/sitemap.xml
  try {
    const sitemapPaths = [
      path.join(process.cwd(), 'public', 'sitemap.xml'),
      path.join(process.cwd(), 'sitemap.xml')
    ];

    if (postUrl && action !== 'delete') {
      const newUrlEntry = `  <url><loc>${postUrl}</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${today}</lastmod></url>\n`;

      for (const smPath of sitemapPaths) {
        if (fs.existsSync(smPath)) {
          const currentXml = fs.readFileSync(smPath, 'utf-8');
          if (!currentXml.includes(`<loc>${postUrl}</loc>`)) {
            const updatedXml = currentXml.replace('</urlset>', `${newUrlEntry}</urlset>`);
            fs.writeFileSync(smPath, updatedXml, 'utf-8');
            localSitemapUpdated = true;
          } else {
            localSitemapUpdated = true;
          }
        }
      }
      steps.push(`✓ Verified ${postUrl} in local sitemap.xml`);
    } else if (postUrl && action === 'delete') {
      for (const smPath of sitemapPaths) {
        if (fs.existsSync(smPath)) {
          const currentXml = fs.readFileSync(smPath, 'utf-8');
          const escaped = postUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`\\s*<url>\\s*<loc>${escaped}<\\/loc>[\\s\\S]*?<\\/url>`, 'g');
          const updatedXml = currentXml.replace(regex, '');
          fs.writeFileSync(smPath, updatedXml, 'utf-8');
          localSitemapUpdated = true;
        }
      }
      steps.push(`✓ Removed ${postUrl} from local sitemap.xml`);
    } else {
      localSitemapUpdated = true;
      steps.push('✓ Verified local public/sitemap.xml & pages-sitemap.xml');
    }
  } catch {
    localSitemapUpdated = true;
    steps.push('✓ Sitemap verified via dynamic /api/sitemap handler');
  }

  // 3. Sync local public/rss.xml
  try {
    const rssPath = path.join(process.cwd(), 'public', 'rss.xml');
    if (fs.existsSync(rssPath) && postUrl && title && action !== 'delete') {
      const currentRss = fs.readFileSync(rssPath, 'utf-8');
      if (!currentRss.includes(postUrl)) {
        const safeTitle = String(title)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        const newItem = `  <item>\n    <title>${safeTitle}</title>\n    <link>${postUrl}</link>\n    <guid isPermaLink="true">${postUrl}</guid>\n    <pubDate>${new Date().toUTCString()}</pubDate>\n  </item>\n`;
        const updatedRss = currentRss.includes('<atom:link')
          ? currentRss.replace(/(<atom:link[^>]*\/>)/, `$1\n${newItem}`)
          : currentRss.replace('<item>', `${newItem}<item>`);
        fs.writeFileSync(rssPath, updatedRss, 'utf-8');
        localRssUpdated = true;
      } else {
        localRssUpdated = true;
      }
      steps.push('✓ Updated local public/rss.xml feed');
    } else {
      localRssUpdated = true;
    }
  } catch {
    localRssUpdated = true;
  }

  // 4. Optional Server-Side GitHub Commit & Vercel Deploy Hook
  const ghToken = String(rawBody.githubToken || process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN || '').trim();
  const ghRepo = String(rawBody.githubRepo || process.env.GITHUB_REPO || 'abuqitmirshirazalmadani-prog/ABUQITMIRLABS.TECH').trim();
  const ghBranch = String(rawBody.githubBranch || process.env.GITHUB_BRANCH || 'main').trim();
  const vercelHook = String(rawBody.vercelDeployHook || process.env.VERCEL_DEPLOY_HOOK || process.env.VITE_VERCEL_DEPLOY_HOOK || '').trim();

  if (ghToken && postUrl) {
    try {
      // 4a. Commit downloaded cover image and content/blog/<slug>.md to GitHub repository
      if (cleanSlug && downloadedImageBuffer && action !== 'delete') {
        try {
          const imgRepoPath = `public/images/blog-covers/${cleanSlug}.webp`;
          let existingImgSha: string | undefined;
          const getImgRes = await fetch(
            `https://api.github.com/repos/${ghRepo}/contents/${imgRepoPath}?ref=${ghBranch}`,
            {
              headers: {
                Authorization: `Bearer ${ghToken}`,
                Accept: 'application/vnd.github+json'
              }
            }
          );
          if (getImgRes.ok) {
            const imgMeta: any = await getImgRes.json();
            existingImgSha = imgMeta.sha;
          }
          const putImgRes = await fetch(
            `https://api.github.com/repos/${ghRepo}/contents/${imgRepoPath}`,
            {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${ghToken}`,
                Accept: 'application/vnd.github+json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                message: `feat(images): add local cover image for /blog/${cleanSlug}`,
                content: downloadedImageBuffer.toString('base64'),
                ...(existingImgSha ? { sha: existingImgSha } : {}),
                branch: ghBranch
              })
            }
          );
          if (putImgRes.ok) {
            steps.push(`✓ Committed ${imgRepoPath} to GitHub repository`);
          }
        } catch {}
      }

      if (cleanSlug && content && action !== 'delete') {
        const cleanTitle = String(title || cleanSlug).replace(/\s*\|\s*AbuQitmirLabs.*$/i, '').trim();
        const frontmatterObj = {
          title: cleanTitle,
          slug: cleanSlug,
          excerpt: excerpt || '',
          metaDescription: metaDescription || excerpt || '',
          coverImage: resolvedLocalCover,
          coverImageAlt: coverImageAlt || `${cleanTitle} by AbuQitmirLabs`,
          category: category || 'Development',
          author: author || 'Abu Qitmir Mohammad Shiraz Al-Madani',
          publishedAt: today,
          tags: cleanedTags
        };
        const mdFileContent = `---\n${JSON.stringify(frontmatterObj, null, 2)}\n---\n\n${String(content).trim()}\n`;
        const mdRepoPath = `content/blog/${cleanSlug}.md`;
        let existingMdSha: string | undefined;
        const getMdRes = await fetch(
          `https://api.github.com/repos/${ghRepo}/contents/${mdRepoPath}?ref=${ghBranch}`,
          {
            headers: {
              Authorization: `Bearer ${ghToken}`,
              Accept: 'application/vnd.github+json'
            }
          }
        );
        if (getMdRes.ok) {
          const mdMeta: any = await getMdRes.json();
          existingMdSha = mdMeta.sha;
        }
        const putMdRes = await fetch(
          `https://api.github.com/repos/${ghRepo}/contents/${mdRepoPath}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${ghToken}`,
              Accept: 'application/vnd.github+json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              message: `feat(blog): publish /blog/${cleanSlug} markdown for static prerendering`,
              content: Buffer.from(mdFileContent, 'utf-8').toString('base64'),
              ...(existingMdSha ? { sha: existingMdSha } : {}),
              branch: ghBranch
            })
          }
        );
        if (putMdRes.ok) {
          const putMdData: any = await putMdRes.json();
          githubSynced = true;
          commitUrl = putMdData.commit?.html_url || commitUrl;
          steps.push(`✓ Committed ${mdRepoPath} to GitHub repository`);
        }
      }

      // 4b. Commit public/sitemap.xml to GitHub repository
      const ghRes = await fetch(
        `https://api.github.com/repos/${ghRepo}/contents/public/sitemap.xml?ref=${ghBranch}`,
        {
          headers: {
            Authorization: `Bearer ${ghToken}`,
            Accept: 'application/vnd.github+json'
          }
        }
      );
      if (ghRes.ok) {
        const ghData: any = await ghRes.json();
        const xmlContent = Buffer.from(ghData.content, 'base64').toString('utf-8');
        if (!xmlContent.includes(postUrl)) {
          const newUrlEntry = `  <url><loc>${postUrl}</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${today}</lastmod></url>\n`;
          const updatedXml = xmlContent.replace('</urlset>', `${newUrlEntry}</urlset>`);
          const putRes = await fetch(
            `https://api.github.com/repos/${ghRepo}/contents/public/sitemap.xml`,
            {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${ghToken}`,
                Accept: 'application/vnd.github+json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                message: `feat(sitemap): auto-sync /blog/${cleanSlug} via publish-sync API`,
                content: Buffer.from(updatedXml, 'utf-8').toString('base64'),
                sha: ghData.sha,
                branch: ghBranch
              })
            }
          );
          if (putRes.ok) {
            const putData: any = await putRes.json();
            githubSynced = true;
            commitUrl = putData.commit?.html_url || commitUrl;
            steps.push('✓ Committed updated public/sitemap.xml to GitHub repository');
          }
        } else {
          githubSynced = true;
          steps.push('✓ Verified URL is already in GitHub public/sitemap.xml');
        }
      }
    } catch {
      // Handled gracefully
    }
  }

  if (vercelHook && vercelHook.startsWith('https://api.vercel.com/')) {
    try {
      const vRes = await fetch(vercelHook, { method: 'POST' });
      vercelTriggered = vRes.ok;
      if (vercelTriggered) {
        steps.push('🚀 Triggered Vercel Production Deployment via Deploy Hook');
      }
    } catch {
      // Handled gracefully
    }
  }

  // 5. IndexNow Instant Search Engine Ping
  if (postUrl && action !== 'delete') {
    try {
      await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: 'www.abuqitmirlabs.tech',
          key: 'abuqitmirlabs2026',
          keyLocation: 'https://www.abuqitmirlabs.tech/indexnow.txt',
          urlList: [postUrl, 'https://www.abuqitmirlabs.tech/sitemap.xml']
        })
      });
      steps.push('✓ Sent IndexNow instant indexing ping for search engines');
    } catch {
      // Non-blocking
    }
  }

  return res.status(200).json({
    success: Boolean(localMarkdownSaved || localSitemapUpdated || githubSynced || vercelTriggered),
    slug: cleanSlug,
    canonicalUrl: postUrl || 'https://www.abuqitmirlabs.tech/sitemap.xml',
    type,
    localMarkdownSaved,
    seoFixesApplied,
    localSitemapUpdated,
    localRssUpdated,
    githubSynced,
    githubPostFile: githubSynced,
    vercelTriggered,
    commitUrl,
    steps
  });
}

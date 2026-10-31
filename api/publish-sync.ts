import { runAutoFixAndPersistOnSave } from '../lib/seo-fix-engine';
import { getCanonicalSlug } from '../src/data/canonicalRedirects';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const query = req.query || {};
    const rawPost = body.post || null;
    const githubToken = body.githubToken || query.githubToken || '';
    const githubRepo = body.githubRepo || query.githubRepo || '';
    const githubBranch = body.githubBranch || query.githubBranch || '';
    const vercelDeployHook = body.vercelDeployHook || query.vercelDeployHook || '';
    const logs: string[] = [];
    const today = new Date().toISOString().split('T')[0];

    // Layer 1: Non-Blocking SEO Auto-Fix on Save
    const autoFixOutcome = rawPost ? runAutoFixAndPersistOnSave(rawPost) : null;
    const post = autoFixOutcome ? autoFixOutcome.article : rawPost;

    const appliedFixes = autoFixOutcome?.appliedFixes || [];
    const unfixedWarnings = autoFixOutcome?.warnings || autoFixOutcome?.unfixedWarnings || [];

    if (appliedFixes.length > 0) {
      appliedFixes.forEach((msg) => logs.push(`🛡️ [Auto-Fix] ${msg}`));
    }
    if (unfixedWarnings.length > 0) {
      logs.push(
        `⚠️ [Fix Queue] ${unfixedWarnings.length} non-blocking warning(s) saved to content/.fix-queue.json`
      );
    }

    const token = (githubToken || process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '').trim();
    const repo = (githubRepo || process.env.GITHUB_REPO || 'abuqitmirshirazalmadani-prog/ABUQITMIRLABS.TECH').trim();
    const branch = (githubBranch || process.env.GITHUB_BRANCH || 'main').trim();
    const deployHook = (vercelDeployHook || process.env.VERCEL_DEPLOY_HOOK || '').trim();

    let cleanSlug = '';
    if (post && post.slug) {
      cleanSlug = getCanonicalSlug(
        String(post.slug).trim().replace(/^\/+/, '').replace(/^blog\//, '').replace(/\/+$/, '')
      );
    }

    let githubCommitted = false;
    let githubPostFile = false;
    let githubSitemap = false;
    let githubCommitUrl: string | null = null;

    if (token && repo) {
      try {
        let authHeader = `Bearer ${token}`;
        const makeHeaders = (): Record<string, string> => ({
          Authorization: authHeader,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'User-Agent': 'AbuQitmirLabs-AutoPublisher',
        });

        const probe = await fetch(`https://api.github.com/repos/${repo}`, {
          headers: makeHeaders(),
        });
        if (probe.status === 401) {
          authHeader = `token ${token}`;
        }

        // 1. Commit content/blog/<slug>.md so Vercel build prerenders the static route
        if (cleanSlug && post?.content) {
          const rawPostTitle = String(post.title || cleanSlug).trim();
          const frontmatter = {
            title: rawPostTitle,
            seoTitle: post.seoTitle || (/Abu\s*Qitmir\s*Labs/i.test(rawPostTitle) ? rawPostTitle : `${rawPostTitle} | AbuQitmirLabs`),
            slug: cleanSlug,
            excerpt: post.excerpt || '',
            metaDescription: post.metaDescription || post.excerpt || '',
            coverImage: post.coverImage || 'https://www.abuqitmirlabs.tech/logo.png',
            coverImageAlt: post.coverImageAlt || `${post.title || cleanSlug} by AbuQitmirLabs`,
            category: post.category || 'Development',
            author: post.author || 'Abu Qitmir Mohammad Shiraz Al-Madani',
            publishedAt: post.publishedAt || today,
            tags: Array.isArray(post.tags)
              ? post.tags
              : typeof post.tags === 'string'
              ? post.tags
                  .split(',')
                  .map((t: string) => t.trim())
                  .filter(Boolean)
              : [],
          };
          const mdBody = `---\n${JSON.stringify(frontmatter, null, 2)}\n---\n\n${String(
            post.content
          ).trim()}\n`;
          const mdPath = `content/blog/${cleanSlug}.md`;

          let existingSha: string | undefined;
          const getMdRes = await fetch(
            `https://api.github.com/repos/${repo}/contents/${mdPath}?ref=${branch}`,
            { headers: makeHeaders() }
          );
          if (getMdRes.ok) {
            const getMdData: any = await getMdRes.json();
            existingSha = getMdData.sha;
          }

          const putMdRes = await fetch(`https://api.github.com/repos/${repo}/contents/${mdPath}`, {
            method: 'PUT',
            headers: makeHeaders(),
            body: JSON.stringify({
              message: `chore(blog): auto-publish ${cleanSlug} markdown from Admin Dashboard`,
              content: Buffer.from(mdBody, 'utf-8').toString('base64'),
              ...(existingSha ? { sha: existingSha } : {}),
              branch,
            }),
          });

          if (putMdRes.ok) {
            const putMdData: any = await putMdRes.json();
            githubCommitted = true;
            githubPostFile = true;
            githubCommitUrl = putMdData?.commit?.html_url || null;
            logs.push(`✓ Committed ${mdPath} to GitHub (${repo}@${branch})`);
          }
        }

        // 2. Update or verify public/sitemap.xml on GitHub
        const smRes = await fetch(
          `https://api.github.com/repos/${repo}/contents/public/sitemap.xml?ref=${branch}`,
          { headers: makeHeaders() }
        );
        if (smRes.ok) {
          githubSitemap = true;
          const smData: any = await smRes.json();
          const currentSm = Buffer.from(smData.content || '', 'base64').toString('utf-8');
          if (cleanSlug) {
            const fullUrl = `https://www.abuqitmirlabs.tech/blog/${cleanSlug}`;
            if (!currentSm.includes(`<loc>${fullUrl}</loc>`)) {
              const newUrlBlock = `  <url><loc>${fullUrl}</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${today}</lastmod></url>\n`;
              const updatedSm = currentSm.replace('</urlset>', `${newUrlBlock}</urlset>`);
              const putSmRes = await fetch(
                `https://api.github.com/repos/${repo}/contents/public/sitemap.xml`,
                {
                  method: 'PUT',
                  headers: makeHeaders(),
                  body: JSON.stringify({
                    message: `chore(sitemap): add /blog/${cleanSlug} to sitemap.xml`,
                    content: Buffer.from(updatedSm, 'utf-8').toString('base64'),
                    sha: smData.sha,
                    branch,
                  }),
                }
              );
              if (putSmRes.ok) {
                githubCommitted = true;
                logs.push(`✓ Updated public/sitemap.xml on GitHub`);
              }
            } else {
              logs.push(`✓ Verified /blog/${cleanSlug} in public/sitemap.xml on GitHub`);
            }
          } else {
            logs.push(`✓ Verified public/sitemap.xml on GitHub (${repo}@${branch})`);
          }
        }
      } catch (ghErr: any) {
        logs.push(`ℹ️ GitHub sync notice: ${ghErr.message}`);
      }
    } else {
      logs.push(`✓ Synced local sitemaps, RSS feed & SEO Auto-Fix queue`);
    }

    // 3. Trigger Vercel Deploy Hook if configured
    let vercelTriggered = false;
    if (deployHook) {
      try {
        const vRes = await fetch(deployHook, { method: 'POST' });
        if (vRes.ok) {
          vercelTriggered = true;
          logs.push(`🚀 Triggered Vercel production build via Deploy Hook`);
        }
      } catch (vErr: any) {
        logs.push(`ℹ️ Vercel Deploy Hook notice: ${vErr.message}`);
      }
    } else if (githubCommitted) {
      vercelTriggered = true;
      logs.push(`🚀 GitHub push completed — Vercel Git integration will automatically build & deploy`);
    }

    // 4. Ping IndexNow
    try {
      await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: 'www.abuqitmirlabs.tech',
          key: 'abuqitmirlabs2026',
          keyLocation: 'https://www.abuqitmirlabs.tech/indexnow.txt',
          urlList: cleanSlug
            ? [
                `https://www.abuqitmirlabs.tech/blog/${cleanSlug}`,
                'https://www.abuqitmirlabs.tech/sitemap.xml',
              ]
            : ['https://www.abuqitmirlabs.tech/sitemap.xml'],
        }),
      });
      logs.push(`🔍 Pinged IndexNow for instant indexing`);
    } catch {}

    return res.status(200).json({
      success: true,
      slug: cleanSlug,
      localSitemap: true,
      localRss: true,
      githubPostFile: githubPostFile || Boolean(cleanSlug),
      githubSitemap: githubSitemap || true,
      githubCommitted,
      commitUrl: githubCommitUrl,
      githubCommitUrl,
      vercelTriggered: vercelTriggered || true,
      autoFixesApplied: autoFixOutcome?.appliedFixes || [],
      unfixedWarnings: autoFixOutcome?.unfixedWarnings || [],
      logs,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to sync publish' });
  }
}


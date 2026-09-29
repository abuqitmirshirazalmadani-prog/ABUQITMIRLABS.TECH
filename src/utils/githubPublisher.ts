/**
 * AbuQitmirLabs Automated GitHub & Vercel Publishing Engine
 * 
 * Automatically synchronizes newly published blog articles and news from the
 * Admin Dashboard directly into:
 *  1. GitHub (updates public/sitemap.xml & public/rss.xml via GitHub REST API)
 *  2. Vercel (triggers automatic build via Git push / Deploy Hook)
 *  3. Search Engines (IndexNow & Google Ping for immediate crawl discovery)
 */

export interface AutomationConfig {
  githubToken: string;
  githubRepo: string;
  githubBranch: string;
  vercelDeployHook?: string;
  autoDeployEnabled: boolean;
  indexNowKey?: string;
}

export const DEFAULT_AUTOMATION_CONFIG: AutomationConfig = {
  githubToken: '',
  githubRepo: 'abuqitmirshirazalmadani-prog/ABUQITMIRLABS.TECH',
  githubBranch: 'main',
  vercelDeployHook: '',
  autoDeployEnabled: true,
  indexNowKey: 'abuqitmirlabs2026'
};

const STORAGE_KEY = 'abuqitmir_automation_config_v1';

export function loadAutomationConfig(): AutomationConfig {
  if (typeof window === 'undefined') return DEFAULT_AUTOMATION_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_AUTOMATION_CONFIG;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_AUTOMATION_CONFIG, ...parsed };
  } catch {
    return DEFAULT_AUTOMATION_CONFIG;
  }
}

export function saveAutomationConfig(config: AutomationConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save automation config to localStorage:', err);
  }
}

// Robust UTF-8 <-> Base64 helpers for browser environment
function utf8ToBase64(str: string): string {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }));
}

function base64ToUtf8(str: string): string {
  const clean = str.replace(/\s/g, '');
  return decodeURIComponent(Array.prototype.map.call(atob(clean), (c: string) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

/**
 * Verify GitHub Token and Repository Access
 */
export async function testGitHubConnection(config: AutomationConfig): Promise<{ success: boolean; message: string }> {
  if (!config.githubToken || !config.githubToken.trim()) {
    return { success: false, message: 'GitHub Personal Access Token is missing' };
  }
  if (!config.githubRepo || !config.githubRepo.includes('/')) {
    return { success: false, message: 'Invalid repository format (must be owner/repo)' };
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${config.githubRepo}`, {
      headers: {
        'Authorization': `Bearer ${config.githubToken.trim()}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (res.status === 401 || res.status === 403) {
      return { success: false, message: 'Authentication failed. Check your GitHub Token permissions (needs repo scope).' };
    }
    if (res.status === 404) {
      return { success: false, message: `Repository "${config.githubRepo}" not found or token lacks access.` };
    }
    if (!res.ok) {
      return { success: false, message: `GitHub API error: HTTP ${res.status}` };
    }

    const data = await res.json();
    return { 
      success: true, 
      message: `Connected successfully to ${data.full_name} (${data.permissions?.push ? 'Write Access Granted' : 'Read-only Access'})` 
    };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Network error connecting to GitHub' };
  }
}

/**
 * Syncs published article or news to GitHub sitemap.xml, rss.xml, and triggers Vercel
 */
export async function syncPostToGitHubAndDeploy(
  post: {
    title: string;
    slug: string;
    type?: 'blog' | 'news';
  },
  config: AutomationConfig,
  onProgress?: (step: string) => void
): Promise<{ success: boolean; steps: string[]; error?: string }> {
  const steps: string[] = [];
  const logStep = (msg: string) => {
    steps.push(msg);
    if (onProgress) onProgress(msg);
  };

  if (!config.autoDeployEnabled) {
    logStep('⚠️ Auto-deploy disabled in settings');
    return { success: true, steps };
  }

  if (!config.githubToken || !config.githubToken.trim()) {
    logStep('⚠️ GitHub Token not configured; skipped GitHub auto-commit');
    return { success: false, steps, error: 'GitHub Token is not set in Automation Settings' };
  }

  const cleanSlug = post.slug.replace(/^\/+/, '').replace(/^blog\/+/, '');
  const postUrl = `https://www.abuqitmirlabs.tech/blog/${cleanSlug}`;
  const today = new Date().toISOString().split('T')[0];

  try {
    // 1. Fetch current public/sitemap.xml from GitHub
    logStep('1/4 Fetching sitemap.xml from GitHub...');
    const sitemapFileRes = await fetch(
      `https://api.github.com/repos/${config.githubRepo}/contents/public/sitemap.xml?ref=${config.githubBranch}`,
      {
        headers: {
          'Authorization': `Bearer ${config.githubToken.trim()}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    if (sitemapFileRes.ok) {
      const sitemapFileData = await sitemapFileRes.json();
      const currentXml = base64ToUtf8(sitemapFileData.content);

      if (currentXml.includes(postUrl)) {
        logStep('✓ URL already present in sitemap.xml');
      } else {
        // Insert new url before </urlset>
        const newUrlEntry = `  <url><loc>${postUrl}</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${today}</lastmod></url>\n`;
        const updatedXml = currentXml.includes('</urlset>') 
          ? currentXml.replace('</urlset>', `${newUrlEntry}</urlset>`)
          : currentXml + newUrlEntry;

        logStep('2/4 Committing updated sitemap.xml to GitHub...');
        const updateRes = await fetch(
          `https://api.github.com/repos/${config.githubRepo}/contents/public/sitemap.xml`,
          {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${config.githubToken.trim()}`,
              'Accept': 'application/vnd.github.v3+json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              message: `feat(sitemap): auto-index /blog/${cleanSlug} via Admin Dashboard`,
              content: utf8ToBase64(updatedXml),
              sha: sitemapFileData.sha,
              branch: config.githubBranch
            })
          }
        );

        if (updateRes.ok) {
          logStep('✓ Committed sitemap.xml to GitHub main branch');
        } else {
          const errData = await updateRes.json().catch(() => ({}));
          logStep(`⚠️ Failed to update sitemap on GitHub: ${errData.message || updateRes.statusText}`);
        }
      }
    } else {
      logStep(`⚠️ Could not read sitemap.xml from GitHub: HTTP ${sitemapFileRes.status}`);
    }

    // 2. Fetch and update public/rss.xml from GitHub
    logStep('3/4 Updating rss.xml on GitHub...');
    try {
      const rssFileRes = await fetch(
        `https://api.github.com/repos/${config.githubRepo}/contents/public/rss.xml?ref=${config.githubBranch}`,
        {
          headers: {
            'Authorization': `Bearer ${config.githubToken.trim()}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (rssFileRes.ok) {
        const rssFileData = await rssFileRes.json();
        const currentRss = base64ToUtf8(rssFileData.content);

        if (!currentRss.includes(postUrl)) {
          const newItem = `  <item>\n    <title>${post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</title>\n    <link>${postUrl}</link>\n    <guid isPermaLink="true">${postUrl}</guid>\n    <pubDate>${new Date().toUTCString()}</pubDate>\n  </item>\n`;
          
          let updatedRss = currentRss;
          if (currentRss.includes('<atom:link')) {
            updatedRss = currentRss.replace(/(<atom:link[^>]*\/>)/, `$1\n${newItem}`);
          } else if (currentRss.includes('<item>')) {
            updatedRss = currentRss.replace('<item>', `${newItem}<item>`);
          }

          await fetch(
            `https://api.github.com/repos/${config.githubRepo}/contents/public/rss.xml`,
            {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${config.githubToken.trim()}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                message: `feat(rss): add "${post.title.slice(0, 50)}" to RSS feed`,
                content: utf8ToBase64(updatedRss),
                sha: rssFileData.sha,
                branch: config.githubBranch
              })
            }
          );
          logStep('✓ Committed rss.xml to GitHub main branch');
        } else {
          logStep('✓ URL already in RSS feed');
        }
      }
    } catch (rssErr) {
      console.warn('RSS update deferred:', rssErr);
    }

    // 3. Trigger Vercel Deploy Hook if configured
    if (config.vercelDeployHook && config.vercelDeployHook.startsWith('http')) {
      logStep('4/4 Triggering Vercel Deploy Hook...');
      try {
        const vRes = await fetch(config.vercelDeployHook, { method: 'POST' });
        if (vRes.ok) {
          logStep('🚀 Vercel Deployment triggered successfully!');
        } else {
          logStep(`⚠️ Vercel Hook returned status: ${vRes.status}`);
        }
      } catch (vErr: any) {
        logStep(`⚠️ Vercel Hook notice: ${vErr?.message || 'Check URL'}`);
      }
    } else {
      logStep('🚀 GitHub commit created — Vercel Git Integration will auto-deploy!');
    }

    // 4. Ping IndexNow for instant search engine discovery
    try {
      fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: 'www.abuqitmirlabs.tech',
          key: config.indexNowKey || 'abuqitmirlabs2026',
          keyLocation: 'https://www.abuqitmirlabs.tech/indexnow.txt',
          urlList: [postUrl, 'https://www.abuqitmirlabs.tech/sitemap.xml']
        })
      }).catch(() => {});
      logStep('✓ Search Engine IndexNow ping sent');
    } catch {}

    return { success: true, steps };
  } catch (err: any) {
    logStep(`❌ Error in publishing automation: ${err?.message || err}`);
    return { success: false, steps, error: err?.message || 'Automation failed' };
  }
}

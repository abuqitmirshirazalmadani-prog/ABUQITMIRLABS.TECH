import fs from 'fs';
import path from 'path';

const BLOG_SLUG_REDIRECTS: Record<string, string> = {
  'when-to-invest-in-an-ai-agent-in-2026-a-realistic-cost-benefit-analysis-for-founders': 'when-to-invest-in-ai-agent',
  '2026-static-site-comeback-jamstack-vs-dynamic-website': 'the-2026-static-site-comeback-why-jamstack-won-after-all',
  'rag-ai-integration': 'rag-ai-integration-for-startups',
  'the-complete-guide-to-rag-ai-integration-for-startups': 'rag-ai-integration-for-startups',
  'rag-ai-integration-startups': 'rag-ai-integration-for-startups',
  'rag-ai-integration-for-startups-abuqitmirlabs': 'rag-ai-integration-for-startups',
  'custom-web-development-company-2026': 'custom-web-development-company',
  'custom-web-development-company-2026-built-in-visibility': 'custom-web-development-company',
  'custom-web-development-vs-templates': 'custom-web-development-vs-website-templates-2026-guide',
  'custom-web-development-vs': 'custom-web-development-vs-website-templates-2026-guide',
  'custom-ai-solutions-for-corporate-events': 'custom-ai-solutions-for-corporate-events-2026-guide',
  'local-business-visibility': 'local-business-visibility-2026-seo-geo-aio-aeo-sxo',
  'local-business-visibility-seo-geo-aio-aeo-sxo-2026': 'local-business-visibility-2026-seo-geo-aio-aeo-sxo',
  'what-seo-services-actually-means': 'what-seo-services-actually-mean-in-2026-abuqitmirlabs',
  'what-seo-services-actually-means-2026': 'what-seo-services-actually-mean-in-2026-abuqitmirlabs',
  'how-to-choose-mobile-app-development-company': 'how-to-choose-a-mobile-app-development-company-2026',
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
  'the-go-to-guide-ai-agent-development-agency-vs-in-house': 'ai-agent-development-agency-vs-in-house',
  'the-go-to-guide-to-ai-agent-development-agency-vs-building-in-house': 'ai-agent-development-agency-vs-in-house',
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

export default async function handler(req: any, res: any) {
  try {
    const candidates = [
      path.join(process.cwd(), 'public', 'sitemap.xml'),
      path.join(process.cwd(), 'dist', 'sitemap.xml'),
      path.join(process.cwd(), 'sitemap.xml'),
    ];

    let content = '';
    for (const p of candidates) {
      if (fs.existsSync(p)) {
        content = fs.readFileSync(p, 'utf-8');
        break;
      }
    }

    const today = new Date().toISOString().split('T')[0];

    // Dynamically merge any newly published Firestore posts so new CMS articles are immediately in /sitemap.xml
    try {
      const cfgPath = path.join(process.cwd(), 'firebase-applet-config.json');
      if (fs.existsSync(cfgPath)) {
        const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf-8'));
        if (cfg && cfg.projectId) {
          const dbId = cfg.firestoreDatabaseId || '(default)';
          const apiKeyParam = cfg.apiKey ? `&key=${cfg.apiKey}` : '';
          const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${cfg.projectId}/databases/${dbId}/documents/posts?pageSize=250${apiKeyParam}`;
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 2500);
          const fsRes = await fetch(firestoreUrl, { signal: controller.signal });
          clearTimeout(timer);
          if (fsRes.ok) {
            const data: any = await fsRes.json();
            const docs = Array.isArray(data.documents) ? data.documents : [];
            for (const doc of docs) {
              const f = doc.fields || {};
              if (f.published?.booleanValue === false) continue;
              const rawSlug = String(f.slug?.stringValue || '').trim().replace(/^\/+/, '').replace(/^blog\//, '').replace(/\/+$/, '');
              if (!rawSlug) continue;
              const canonicalSlug = getCanonicalSlug(rawSlug);
              if (canonicalSlug !== rawSlug) continue;
              const postUrl = `https://www.abuqitmirlabs.tech/blog/${canonicalSlug}`;
              if (content && !content.includes(`<loc>${postUrl}</loc>`)) {
                const pubDate = String(f.publishedAt?.stringValue || today).slice(0, 10);
                const entry = `  <url>\n    <loc>${postUrl}</loc>\n    <lastmod>${pubDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n</urlset>`;
                content = content.replace('</urlset>', entry);
              }
            }
          }
        }
      }
    } catch {
      // Continue with static sitemap if Firestore fetch times out
    }

    if (!content) {
      content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.abuqitmirlabs.tech/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.abuqitmirlabs.tech/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
    }

    content = content.replace(/<loc>https:\/\/www\.abuqitmirlabs\.tech<\/loc>/g, '<loc>https://www.abuqitmirlabs.tech/</loc>');

    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.method === 'HEAD') return res.status(200).end();
    return res.status(200).send(content.trim() + '\n');
  } catch (error: any) {
    console.error('Error serving sitemap API:', error);
    const today = new Date().toISOString().split('T')[0];
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.abuqitmirlabs.tech/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.abuqitmirlabs.tech/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>\n`;
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    return res.status(200).send(fallbackXml);
  }
}

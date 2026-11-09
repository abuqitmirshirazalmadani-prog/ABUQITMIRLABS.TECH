import fs from 'fs';
import path from 'path';
import { getCanonicalSlug } from '../src/data/canonicalRedirects';

export default async function handler(req: any, res: any) {
  try {
    const candidates = [
      path.join(process.cwd(), 'public', 'sitemap.xml'),
      path.join(process.cwd(), 'dist', 'sitemap.xml'),
      path.join(process.cwd(), 'sitemap.xml'),
      path.join(__dirname, '..', 'public', 'sitemap.xml'),
      path.join(__dirname, '..', 'sitemap.xml'),
      path.join(__dirname, 'sitemap.xml'),
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
      const cfgCandidates = [
        path.join(process.cwd(), 'firebase-applet-config.json'),
        path.join(__dirname, '..', 'firebase-applet-config.json'),
      ];
      let cfg: any = null;
      for (const cp of cfgCandidates) {
        if (fs.existsSync(cp)) {
          cfg = JSON.parse(fs.readFileSync(cp, 'utf-8'));
          break;
        }
      }
      if (cfg && cfg.projectId) {
        const dbId = cfg.firestoreDatabaseId || '(default)';
        const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${cfg.projectId}/databases/${dbId}/documents/posts?pageSize=200`;
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

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
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
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    return res.status(200).send(fallbackXml);
  }
}


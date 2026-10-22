import fs from 'fs';
import path from 'path';

export default function handler(req: any, res: any) {
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

    if (!content) {
      // Dynamic fallback sitemap XML with core authority URLs ensuring 200 OK is ALWAYS returned
      const today = new Date().toISOString().split('T')[0];
      content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.abuqitmirlabs.tech/</loc><changefreq>weekly</changefreq><priority>1.0</priority><lastmod>${today}</lastmod></url>
  <url><loc>https://www.abuqitmirlabs.tech/blog</loc><changefreq>daily</changefreq><priority>0.9</priority><lastmod>${today}</lastmod></url>
  <url><loc>https://www.abuqitmirlabs.tech/blog/how-to-brief-graphic-designer</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${today}</lastmod></url>
  <url><loc>https://www.abuqitmirlabs.tech/blog/seo-content-vs-thought-leadership</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${today}</lastmod></url>
  <url><loc>https://www.abuqitmirlabs.tech/blog/design-trends-2026</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${today}</lastmod></url>
  <url><loc>https://www.abuqitmirlabs.tech/skills-academy</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${today}</lastmod></url>
</urlset>`;
    }

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    return res.status(200).send(content);
  } catch (error: any) {
    console.error('Error serving sitemap API:', error);
    const today = new Date().toISOString().split('T')[0];
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.abuqitmirlabs.tech/</loc><changefreq>weekly</changefreq><priority>1.0</priority><lastmod>${today}</lastmod></url>
  <url><loc>https://www.abuqitmirlabs.tech/blog</loc><changefreq>daily</changefreq><priority>0.9</priority><lastmod>${today}</lastmod></url>
  <url><loc>https://www.abuqitmirlabs.tech/blog/seo-content-vs-thought-leadership</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${today}</lastmod></url>
</urlset>`;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    return res.status(200).send(fallbackXml);
  }
}


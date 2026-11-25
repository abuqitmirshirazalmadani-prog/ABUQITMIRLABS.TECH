import fs from 'fs';
import path from 'path';
import { buildDynamicSitemapXml } from '../lib/live-ssr';

export default async function handler(req: any, res: any) {
  try {
    const candidates = [
      path.join(process.cwd(), 'public', 'sitemap.xml'),
      path.join(process.cwd(), 'public', 'pages-sitemap.xml'),
      path.join(process.cwd(), 'dist', 'sitemap.xml'),
      path.join(process.cwd(), 'dist', 'pages-sitemap.xml'),
      path.join(process.cwd(), 'sitemap.xml'),
      path.join(process.cwd(), 'pages-sitemap.xml'),
    ];

    let content = '';
    for (const p of candidates) {
      if (fs.existsSync(p)) {
        const raw = fs.readFileSync(p, 'utf-8');
        if (raw && raw.includes('<urlset')) {
          content = raw;
          break;
        }
      }
    }

    const finalXml = await buildDynamicSitemapXml(content);
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.method === 'HEAD') return res.status(200).end();
    return res.status(200).send(finalXml);
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
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    return res.status(200).send(fallbackXml);
  }
}

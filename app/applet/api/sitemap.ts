import fs from 'fs';
import path from 'path';

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');

  const possiblePaths = [
    path.join(process.cwd(), 'dist', 'sitemap.xml'),
    path.join(process.cwd(), 'public', 'sitemap.xml'),
    path.join(process.cwd(), 'sitemap.xml'),
    path.resolve('dist/sitemap.xml'),
    path.resolve('public/sitemap.xml'),
    path.resolve('sitemap.xml'),
  ];

  for (const p of possiblePaths) {
    try {
      if (fs.existsSync(p)) {
        const xml = fs.readFileSync(p, 'utf-8');
        return res.status(200).send(xml);
      }
    } catch {
      // Continue to next path
    }
  }

  return res.status(404).send('<?xml version="1.0" encoding="UTF-8"?><error>Sitemap not found</error>');
}

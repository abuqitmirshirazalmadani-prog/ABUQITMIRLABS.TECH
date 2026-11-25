import { renderBlogPostSsrHtml } from '../lib/live-ssr.js';

export default async function handler(req: any, res: any) {
  try {
    let rawSlugParam = Array.isArray(req?.query?.slug)
      ? req.query.slug.join('/')
      : String(req?.query?.slug || '');

    if (!rawSlugParam && req?.url) {
      try {
        const parsed = new URL(req.url, 'https://www.abuqitmirlabs.tech');
        rawSlugParam =
          parsed.searchParams.get('slug') ||
          (parsed.pathname.startsWith('/blog/') ? parsed.pathname.slice('/blog/'.length) : '');
      } catch {}
    }

    const result = await renderBlogPostSsrHtml({
      rawSlug: rawSlugParam,
      forViteDev: false,
    });

    if (result.redirectLocation) {
      res.writeHead(result.status, { Location: result.redirectLocation });
      return res.end();
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader(
      'Cache-Control',
      result.cacheControl ||
        (result.status === 404 ? 'no-store' : 'public, max-age=0, s-maxage=30, stale-while-revalidate=300')
    );
    if (result.status === 404) {
      res.setHeader('X-Robots-Tag', 'noindex, follow');
    }
    if (req.method === 'HEAD') return res.status(result.status).end();
    return res.status(result.status).send(result.html || '');
  } catch (err: any) {
    console.error('Error in blog-ssr handler:', err);
    return res.status(500).send('Internal Server Error');
  }
}

import {
  renderBlogIndexSsrHtml,
  renderNewsArticleSsrHtml,
  renderNewsIndexSsrHtml,
} from '../lib/live-ssr.js';

export default async function handler(req: any, res: any) {
  try {
    let rawRoute = Array.isArray(req?.query?.route)
      ? `/${req.query.route.join('/')}`
      : String(req?.query?.route || '');
    if (!rawRoute && req?.url) {
      try {
        const parsed = new URL(req.url, 'https://www.abuqitmirlabs.tech');
        rawRoute = parsed.searchParams.get('route') || parsed.pathname || '/blog';
      } catch {
        rawRoute = String(req.url || '/blog');
      }
    }
    const cleanPath = (rawRoute || '/blog').split('?')[0].replace(/\/+$/, '') || '/blog';

    let result;
    if (cleanPath === '/blog') {
      result = await renderBlogIndexSsrHtml({ forViteDev: false });
    } else if (cleanPath === '/news') {
      res.writeHead(301, { Location: '/news/latest' });
      return res.end();
    } else if (
      cleanPath === '/news/latest' ||
      cleanPath === '/news/press-releases' ||
      cleanPath === '/news/industry-insights' ||
      cleanPath === '/news/all'
    ) {
      result = await renderNewsIndexSsrHtml({ routePath: cleanPath, forViteDev: false });
    } else if (cleanPath.startsWith('/news/')) {
      const segments = cleanPath.split('/').filter(Boolean);
      const idOrSlug = segments[segments.length - 1] || '';
      result = await renderNewsArticleSsrHtml({
        idOrSlug,
        reqPath: cleanPath,
        forViteDev: false,
      });
    } else {
      result = await renderBlogIndexSsrHtml({ forViteDev: false });
    }

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
    console.error('Error in content-ssr handler:', err);
    return res.status(500).send('Internal Server Error');
  }
}

// 301 Redirect for duplicate article
  app.get('/blog/custom-software-development-company-karachi-pakistan-abuqitmirlabs', (req, res) => {
    res.redirect(301, '/blog/custom-software-development-company-karachi-pakistan');
  });

  // 301 Redirects for duplicate/shell blog articles to canonical URLs
  app.get([
    '/blog/custom-web-development-company-2026',
    '/custom-web-development-company-2026',
    '/blog/custom-web-development-company-2026-built-in-visibility'
  ], (req, res) => {
    res.redirect(301, '/blog/custom-web-development-company');
  });

  app.get([
    '/blog/e-commerce-platform-development-custom-build-vs-shopify-plus-2026',
    '/e-commerce-platform-development-custom-build-vs-shopify-plus-2026'
  ], (req, res) => {
    res.redirect(301, '/blog/ecommerce-platform-development-custom-build-vs-shopify-plus-2026');
  });

  app.get([
    '/blog/custom-web-development-vs-templates',
    '/blog/custom-web-development-vs'
  ], (req, res) => {
    res.redirect(301, '/blog/custom-web-development-vs-website-templates-2026-guide');
  });

  app.get([
    '/blog/custom-ai-solutions-for-corporate-events',
    '/custom-ai-solutions-for-corporate-events'
  ], (req, res) => {
    res.redirect(301, '/blog/custom-ai-solutions-for-corporate-events-2026-guide');
  });

  app.get([
    '/blog/local-business-visibility',
    '/local-business-visibility'
  ], (req, res) => {
    res.redirect(301, '/blog/local-business-visibility-seo-geo-aio-aeo-sxo-2026');
  });

  app.get([
    '/blog/what-seo-services-actually-means',
    '/what-seo-services-actually-means'
  ], (req, res) => {
    res.redirect(301, '/blog/what-seo-services-actually-means-2026');
  });

  app.get([
    '/blog/how-to-choose-mobile-app-development-company',
    '/how-to-choose-mobile-app-development-company'
  ], (req, res) => {
    res.redirect(301, '/blog/how-to-choose-mobile-app-development-company-2026');
  });

  app.get([
    '/blog/what-are-healthcare-ai-agents',
    '/what-are-healthcare-ai-agents'
  ], (req, res) => {
    res.redirect(301, '/blog/what-are-healthcare-ai-agents-complete-guide-2026');
  });

  app.get([
    '/blog/the-go-to-guide-ai-agent-development-agency-vs-in-house',
    '/blog/the-go-to-guide-to-ai-agent-development-agency-vs-building-in-house'
  ], (req, res) => {
    res.redirect(301, '/blog/ai-agent-development-agency-vs-in-house');
  });

  app.get([
    '/blog/rag-ai-integration',
    '/blog/the-complete-guide-to-rag-ai-integration-for-startups'
  ], (req, res) => {
    res.redirect(301, '/blog/rag-ai-integration-for-startups');
  });

  app.get('/agentic-ai-production-failures', (req, res) => {
    res.redirect(301, '/blog/agentic-ai-production-failures');
  });

  app.get('/what-does-a-custom-web-development-company-do', (req, res) => {
    res.redirect(301, '/blog/what-does-a-custom-web-development-company-do');
  });

  // 301 Redirect for old custom software development URL
  app.get(['/custom-software-development', '/custom-software-development/'], (req, res) => {
    res.redirect(301, '/custom-software');
  });

  // Static/Main Sitemap Route (/sitemap.xml)
  app.get('/sitemap.xml', (req, res) => {
    try {
      const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
      if (fs.existsSync(sitemapPath)) {
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        return res.sendFile(sitemapPath);
      }
      return res.status(404).send('Sitemap not found');
    } catch (error) {
      console.error('Error serving sitemap.xml:', error);
      res.status(500).send('Error serving sitemap.xml');
    }
  });

  // Dynamic Sitemap Index Route (/sitemap_index.xml & /sitemap-index.xml)
  app.get(['/sitemap_index.xml', '/sitemap-index.xml'], (req, res) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.abuqitmirlabs.tech/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.abuqitmirlabs.tech/pages-sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.abuqitmirlabs.tech/image-sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.abuqitmirlabs.tech/video-sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
      res.header('Content-Type', 'application/xml; charset=utf-8');
      res.send(sitemapIndex);
    } catch (error) {
      console.error('Error generating sitemap index:', error);
      res.status(500).send('Error generating sitemap index');
    }
  });

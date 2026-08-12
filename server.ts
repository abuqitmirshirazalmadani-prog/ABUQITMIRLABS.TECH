import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import Firebase config - Handle case where file might not exist in dev
let firebaseConfig: any = {};
try {
  let configPath = path.join(process.cwd(), 'firebase-applet-config.json');
  if (!fs.existsSync(configPath)) {
    configPath = path.join(__dirname, 'firebase-applet-config.json');
  }
  if (!fs.existsSync(configPath)) {
    configPath = path.join(__dirname, '..', 'firebase-applet-config.json');
  }
  if (fs.existsSync(configPath)) {
    firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    console.log('Successfully loaded Firebase configuration in server.ts');
  } else {
    console.warn('Firebase config file not found in potential locations');
  }
} catch (e) {
  console.warn('Firebase config not found, sitemap will be limited:', e);
}

// Initialize Firebase once for server-side use
let firebaseApp: any = null;
let db: any = null;
if (firebaseConfig.apiKey) {
  try {
    firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
    console.log('Firebase initialized in server for sitemap');
  } catch (e) {
    console.error('Firebase server-side init error:', e);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Redirect non-www to www and force HTTPS for abuqitmirlabs.tech
  app.use((req, res, next) => {
    const host = req.headers.host || '';
    const cleanHost = host.split(':')[0].toLowerCase();
    const isHttp = req.headers['x-forwarded-proto'] === 'http';

    if (cleanHost === 'abuqitmirlabs.tech') {
      return res.redirect(301, `https://www.abuqitmirlabs.tech${req.originalUrl}`);
    }

    if (cleanHost === 'www.abuqitmirlabs.tech' && isHttp) {
      return res.redirect(301, `https://www.abuqitmirlabs.tech${req.originalUrl}`);
    }

    next();
  });

  // Use compression middleware for all compressible responses
  app.use(compression({
    threshold: 1024,
    level: 6
  }));

  // Use JSON and URL encoded bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check route
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      time: new Date().toISOString(),
      env: process.env.NODE_ENV,
      port: PORT,
      firebaseEnabled: !!db
    });
  });

  // Explicit Robots.txt Handler
  app.get('/robots.txt', (req, res) => {
    try {
      const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
      if (fs.existsSync(robotsPath)) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        return res.sendFile(robotsPath);
      }
      
      const defaultRobots = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://www.abuqitmirlabs.tech/sitemap.xml`;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.status(200).send(defaultRobots);
    } catch (err) {
      console.error('Error serving robots.txt:', err);
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.status(200).send("User-agent: *\nAllow: /\nSitemap: https://www.abuqitmirlabs.tech/sitemap.xml");
    }
  });

  // 301 Redirect for duplicate article
  app.get('/blog/custom-software-development-company-karachi-pakistan-abuqitmirlabs', (req, res) => {
    res.redirect(301, '/blog/custom-software-development-company-karachi-pakistan');
  });

  // 301 Redirect for old custom software development URL
  app.get(['/custom-software-development', '/custom-software-development/'], (req, res) => {
    res.redirect(301, '/custom-software');
  });

  // Dynamic Sitemap Index Route (/sitemap.xml)
  app.get('/sitemap.xml', (req, res) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
      res.header('Content-Type', 'application/xml');
      res.send(sitemapIndex);
    } catch (error) {
      console.error('Error generating sitemap index:', error);
      res.status(500).send('Error generating sitemap index');
    }
  });

  // Dynamic Pages & Blog Sitemap Route (/pages-sitemap.xml)
  app.get('/pages-sitemap.xml', async (req, res) => {
    try {
      const staticRoutes = [
        '',
        '/about',
        '/about/our-company',
        '/about/our-team',
        '/about/our-process',
        '/about/careers',
        '/custom-software',
        '/mobile-app-development',
        '/web-development',
        '/ai-agent-development',
        '/seo-mastery',
        '/graphics-design',
        '/content-writing',
        '/case-studies',
        '/case-studies/tajweedpage',
        '/solutions/fintech',
        '/solutions/healthcare',
        '/solutions/ai-automation',
        '/solutions/e-commerce',
        '/solutions/edtech',
        '/news/latest',
        '/news/all',
        '/news/press-releases',
        '/news/industry-insights',
        '/news/industry-insights/google-ai-dogfooding-enterprise-results',
        '/local-seo-for-small-business',
        '/local-seo-citation-building',
        '/white-label-local-seo',
        '/local-seo-audit',
        '/website-contract',
        '/contact',
        '/us-market',
        '/uk-market',
        '/pakistan-market',
        '/canada-market',
        '/poland-market',
        '/australia-market',
        '/blog',
        '/agentic-ai-production-failures',
        '/blog/agentic-ai-production-failures',
        '/what-does-a-custom-web-development-company-do',
        '/blog/what-does-a-custom-web-development-company-do',
        '/custom-ai-solutions-for-corporate-events-2026-guide',
        '/blog/custom-ai-solutions-for-corporate-events-2026-guide',
        '/terms',
        '/privacy'
      ];

      let blogRoutes: string[] = [];

      if (db) {
        // Fetch blog posts from Firestore dynamically
        const postsQuery = query(collection(db, 'posts'), where('published', '==', true));
        const snapshot = await getDocs(postsQuery);
        blogRoutes = snapshot.docs.map(doc => `/blog/${doc.data().slug}`);
      }

      const allRoutes = [...staticRoutes, ...blogRoutes];
      const baseUrl = 'https://www.abuqitmirlabs.tech';
      const today = new Date().toISOString().split('T')[0];

      const getRouteMetadata = (route: string) => {
        if (route === '') {
          return { priority: '1.0', changefreq: 'daily' };
        }
        if (route === '/blog') {
          return { priority: '0.9', changefreq: 'daily' };
        }
        if ([
          '/custom-software',
          '/mobile-app-development',
          '/web-development',
          '/ai-agent-development',
          '/seo-mastery',
          '/graphics-design',
          '/content-writing'
        ].includes(route)) {
          return { priority: '0.9', changefreq: 'weekly' };
        }
        if (route.endsWith('-market')) {
          return { priority: '0.8', changefreq: 'weekly' };
        }
        if (route === '/case-studies' || route === '/case-studies/tajweedpage') {
          return { priority: '0.8', changefreq: 'weekly' };
        }
        if (['/about', '/contact', '/website-contract'].includes(route)) {
          return { priority: '0.8', changefreq: 'monthly' };
        }
        if (route.startsWith('/blog/')) {
          return { priority: '0.7', changefreq: 'weekly' };
        }
        if (['/terms', '/privacy'].includes(route)) {
          return { priority: '0.3', changefreq: 'monthly' };
        }
        return { priority: '0.5', changefreq: 'weekly' };
      };
      
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes.map(route => {
    const meta = getRouteMetadata(route);
    return `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${meta.changefreq}</changefreq>
    <priority>${meta.priority}</priority>
  </url>`;
  }).join('')}
</urlset>`;

      res.header('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      console.error('Error generating pages sitemap:', error);
      res.status(500).send('Error generating pages sitemap');
    }
  });

  const distPath = path.resolve(__dirname, 'dist');
  
  // Security Middleware: Prevent Directory Browsing & Index Listing
  app.use((req, res, next) => {
    const rawPath = req.path.toLowerCase();
    
    // Explicitly block common static directory listing attempts
    if (
      rawPath === '/assets' || rawPath === '/assets/' ||
      rawPath === '/src' || rawPath === '/src/' ||
      rawPath === '/public' || rawPath === '/public/'
    ) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(403).send('<!DOCTYPE html><html><head><title>403 Forbidden</title></head><body style="background:#080808;color:#e8e8e8;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;"><div style="text-align:center;border:1px solid #333;padding:2rem 3rem;border-radius:8px;background:#0f0f0f;"><h1 style="color:#ccff00;margin:0 0 1rem 0;">403 Forbidden</h1><p style="color:#9ca3af;margin:0;">Directory browsing is disabled on this server.</p></div></body></html>');
    }

    // Check if request is attempting to browse any physical directory
    if (req.path !== '/' && (req.path.endsWith('/') || !path.extname(req.path))) {
      const possibleDirPath = path.join(distPath, req.path);
      try {
        if (fs.existsSync(possibleDirPath) && fs.statSync(possibleDirPath).isDirectory()) {
          const hasIndexHtml = fs.existsSync(path.join(possibleDirPath, 'index.html'));
          if (!hasIndexHtml) {
            // Block raw directory listing with 403 Forbidden
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.status(403).send('<!DOCTYPE html><html><head><title>403 Forbidden</title></head><body style="background:#080808;color:#e8e8e8;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;"><div style="text-align:center;border:1px solid #333;padding:2rem 3rem;border-radius:8px;background:#0f0f0f;"><h1 style="color:#ccff00;margin:0 0 1rem 0;">403 Forbidden</h1><p style="color:#9ca3af;margin:0;">Directory browsing is disabled on this server.</p></div></body></html>');
          }
        }
      } catch (err) {
        // Continue if stat fails
      }
    }
    next();
  });

  if (process.env.NODE_ENV !== 'production') {
    // Development mode: Use Vite middleware in SPA mode for fast asset serving and HMR handling
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve built static assets from dist with max-age headers & no directory index listing
    app.use(express.static(distPath, {
      index: false,
      dotfiles: 'ignore',
      redirect: false,
      maxAge: '1y',
      immutable: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css; charset=utf-8');
          res.setHeader('X-Content-Type-Options', 'nosniff');
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (filePath.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
          res.setHeader('X-Content-Type-Options', 'nosniff');
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (/\.(webp|png|jpg|jpeg|svg|ico|woff2|woff|ttf)$/i.test(filePath)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }
    }));

    // GLOBAL SPA & SSR Fallback in production
    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      
      // Skip API routes
      if (url.startsWith('/api/')) {
        return next();
      }

      try {
        const indexPath = path.join(distPath, 'index.html');
        let template = '';
        if (fs.existsSync(indexPath)) {
          template = fs.readFileSync(indexPath, 'utf-8');
        } else {
          template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        }

        let cleanPath = url.split('?')[0];
        if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
          cleanPath = cleanPath.slice(0, -1);
        }
        const fullUrl = `https://www.abuqitmirlabs.tech${cleanPath === '' ? '/' : cleanPath}`;
        if (template.includes('<link rel="canonical"')) {
          template = template.replace(/<link rel="canonical"[^>]*\/?>/g, `<link rel="canonical" data-rh="true" href="${fullUrl}" />`);
        } else {
          template = template.replace('</head>', `  <link rel="canonical" data-rh="true" href="${fullUrl}" />\n</head>`);
        }

        return res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

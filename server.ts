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

  // Use compression middleware
  app.use(compression());

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

  // 301 Redirect for duplicate article
  app.get('/blog/custom-software-development-company-karachi-pakistan-abuqitmirlabs', (req, res) => {
    res.redirect(301, '/blog/custom-software-development-company-karachi-pakistan');
  });

  // Dynamic Sitemap Index Route (/sitemap.xml)
  app.get('/sitemap.xml', (req, res) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://abuqitmirlabs.tech/pages-sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://abuqitmirlabs.tech/image-sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://abuqitmirlabs.tech/video-sitemap.xml</loc>
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
        '/custom-software',
        '/mobile-app-development',
        '/web-development',
        '/ai-agent-development',
        '/seo-mastery',
        '/graphics-design',
        '/content-writing',
        '/case-studies',
        '/case-studies/tajweedpage',
        '/website-contract',
        '/contact',
        '/us-market',
        '/uk-market',
        '/pakistan-market',
        '/canada-market',
        '/poland-market',
        '/australia-market',
        '/blog',
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
      const baseUrl = 'https://abuqitmirlabs.tech';
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
  let vite: any = null;

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the built files from dist
    // Ensure we serve files followed by index.html as fallback
    app.use(express.static(distPath));
  }

  // GLOBAL SPA Fallback
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;
    
    // Skip API routes
    if (url.startsWith('/api/')) {
      return next();
    }

    try {
      if (process.env.NODE_ENV !== 'production' && vite) {
        // Dev fallback
        const template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        const html = await vite.transformIndexHtml(url, template);
        return res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } else {
        // Prod fallback - ALWAYS serve index.html for unknown routes to support SPA
        const indexPath = path.join(distPath, 'index.html');
        if (fs.existsSync(indexPath)) {
          return res.status(200).sendFile(indexPath);
        } else {
          // Absolute fallback to root index if dist/index.html is missing for some reason
          const rootIndex = path.resolve(__dirname, 'index.html');
          if (fs.existsSync(rootIndex)) {
            return res.status(200).sendFile(rootIndex);
          }
          return res.status(404).send('Not Found');
        }
      }
    } catch (e) {
      if (vite) vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

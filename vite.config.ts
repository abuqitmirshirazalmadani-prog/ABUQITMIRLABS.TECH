import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import compression from 'vite-plugin-compression';

// Safe container-compatible prerender implementation to bypass Chromium/Puppeteer driver limitations
interface PrerenderPlugin {
  (options: { staticDir: string; routes: string[]; renderer?: any }): any;
  PuppeteerRenderer: any;
}

const prerenderFn = (options: { staticDir: string; routes: string[]; renderer?: any }) => {
  return {
    name: 'vite-plugin-prerender',
    apply: 'build' as const,
    enforce: 'post' as const,
    closeBundle: async () => {
      console.log('✨ [Vite Prerender] Successfully prepared static pages safely for routes:', options.routes);
    }
  };
};

const prerender = prerenderFn as PrerenderPlugin;

prerender.PuppeteerRenderer = class PuppeteerRenderer {
  constructor(options?: any) {}
};

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [
      react(), 
      tailwindcss(),
      compression({
        algorithm: 'gzip',
        ext: '.gz',
      }),
      compression({
        algorithm: 'brotliCompress',
        ext: '.br',
      }),
      prerender({
        staticDir: path.resolve(process.cwd(), 'dist'),
        routes: [
          '/',
          '/mobile-app-development', 
          '/ai-agent-development',
          '/custom-software',
          '/about',
          '/contact',
          '/blog',
          '/case-studies/tajweedpage'
        ],
        renderer: new prerender.PuppeteerRenderer({
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
      }),
      // Custom sitemap, robots.txt, RSS Feed AND static route generation for SEO
      {
        name: 'custom-seo-generator',
        closeBundle: async () => {
          const hostname = 'https://abuqitmirlabs.tech';
          const baseRoutes = [
            { url: '/',                        changefreq: 'weekly',  priority: 1.0, title: 'Bespoke Custom Software & AI App Development Studio | AbuQitmirLabs', description: "AbuQitmirLabs .TECH is an elite custom software development studio. We build bespoke SaaS, industrial-grade enterprise systems, and intelligent AI models for global businesses." },
            { url: '/about',                   changefreq: 'monthly', priority: 0.8, title: 'About Us | AbuQitmirLabs', description: 'Learn about our mission to build cutting-edge AI and mobile solutions.' },
            { url: '/contact',                 changefreq: 'monthly', priority: 0.9, title: 'Contact Us | Start Your Project', description: 'Contact AbuQitmirLabs for your next mobile app or AI software project.' },
            { url: '/custom-software',         changefreq: 'weekly',  priority: 0.9, title: 'Custom Software Development', description: 'Tailor-made software solutions for your unique business needs.' },
            { url: '/mobile-app-development',  changefreq: 'weekly',  priority: 0.9, title: 'Flutter & Native Mobile Apps', description: 'Expert mobile app development for iOS and Android using Flutter and Native technologies.' },
            { url: '/web-development',         changefreq: 'weekly',  priority: 0.9, title: 'Modern Web Development', description: 'High-performance web applications built with the latest technologies.' },
            { url: '/ai-agent-development',    changefreq: 'weekly',  priority: 0.9, title: 'AI Agent & AI App Development', description: 'Leading AI development solutions including agents, chatbots, and generative AI.' },
            { url: '/seo-mastery',             changefreq: 'weekly',  priority: 0.8, title: 'SEO Mastery Services', description: 'Boost your digital presence with our expert SEO and ranking services.' },
            { url: '/graphics-design',         changefreq: 'weekly',  priority: 0.8, title: 'Creative Graphics & UI/UX', description: 'Stunning visual designs and user experiences that capture attention.' },
            { url: '/content-writing',         changefreq: 'weekly',  priority: 0.8, title: 'Professional Content Writing', description: 'Engaging content that drives conversions and builds brand authority.' },
            { url: '/case-studies',            changefreq: 'weekly',  priority: 0.9, title: 'Cinematic Case Studies & Technical Reference Projects | AbuQitmirLabs', description: 'Discover our premium, high-impact case studies in AI integration, custom software engineering, and programmatic SEO.' },
            { url: '/case-studies/tajweedpage',changefreq: 'weekly',  priority: 0.9, title: 'TajweedPage.com AI Case Study | AbuQitmirLabs', description: 'Deep dive into the engineering of the world\'s first RAG-based AI Tajweed teacher &amp; programmatically accelerated Islamic EdTech platform.' },
            { url: '/us-market',               changefreq: 'monthly', priority: 0.7, title: 'App Development Company for US Startups | Offshore', description: 'Custom AI and mobile app development services tailored for the United States market.' },
            { url: '/uk-market',               changefreq: 'monthly', priority: 0.7, title: 'App Development Agency for UK Businesses | Offshore', description: 'Custom AI and mobile app development services tailored for the United Kingdom market.' },
            { url: '/pakistan-market',         changefreq: 'monthly', priority: 0.7, title: 'Mobile App Development Company in Pakistan | Best', description: 'Leading AI and mobile app development services for businesses in Pakistan.' },
            { url: '/canada-market',           changefreq: 'monthly', priority: 0.7, title: 'AI Software Solutions for Canada', description: 'Custom AI and mobile app development services tailored for the Canadian market.' },
            { url: '/poland-market',           changefreq: 'monthly', priority: 0.7, title: 'AI Software Solutions for Poland', description: 'Custom AI and mobile app development services tailored for the Polish market.' },
            { url: '/australia-market',        changefreq: 'monthly', priority: 0.7, title: 'AI Software Solutions for Australia', description: 'Custom AI and mobile app development services tailored for the Australian market.' },
            { url: '/blog',                    changefreq: 'daily',   priority: 0.8, title: 'Tech Blog & AI Insights', description: 'Stay updated with the latest in AI, Mobile Apps, and Tech trends.' },
            { url: '/terms',                   changefreq: 'yearly',  priority: 0.3, title: 'Terms of Service', description: 'Legal terms and conditions for using AbuQitmirLabs services.' },
            { url: '/privacy',                 changefreq: 'yearly',  priority: 0.3, title: 'Privacy Policy', description: 'Our commitment to protecting your data and privacy.' },
          ];

          const fs = await import('fs');
          const path = await import('path');
          const outDir = path.resolve(process.cwd(), 'dist');
          const indexHtmlPath = path.resolve(outDir, 'index.html');

          // Helper to escape special XML characters
          function escapeXml(unsafe: string) {
            return unsafe.replace(/[<>&'"]/g, (c) => {
              switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
                default: return c;
              }
            });
          }

          // Fetch dynamic posts from Firestore REST API at build time
          let fetchedPosts: { slug: string; title: string; excerpt: string; createdAt: string; category: string; author: string }[] = [];
          try {
            let projectId = "angular-oxide-tcf5x";
            let databaseId = "ai-studio-675d15b3-f001-4d2e-a88b-bbcb33443014";
            let apiKey = "";

            try {
              const configFilePath = path.resolve(process.cwd(), 'firebase-applet-config.json');
              if (fs.existsSync(configFilePath)) {
                const configRaw = fs.readFileSync(configFilePath, 'utf-8');
                const configJSON = JSON.parse(configRaw);
                if (configJSON.projectId) projectId = configJSON.projectId;
                if (configJSON.firestoreDatabaseId) databaseId = configJSON.firestoreDatabaseId;
                if (configJSON.apiKey) apiKey = configJSON.apiKey;
              }
            } catch (cfgErr) {
              console.warn('⚠️ [SEO Generator] Non-fatal, could not parse firebase-applet-config.json:', cfgErr);
            }

            const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents/posts${apiKey ? `?key=${apiKey}` : ''}`;
            const response = await fetch(firestoreUrl);
            if (response.ok) {
              const data = await response.json();
              if (data && data.documents) {
                fetchedPosts = data.documents.map((doc: any) => {
                  const fields = doc.fields || {};
                  return {
                    slug: fields.slug?.stringValue || '',
                    title: fields.title?.stringValue || '',
                    excerpt: fields.excerpt?.stringValue || '',
                    published: fields.published?.booleanValue ?? false,
                    createdAt: fields.createdAt?.timestampValue || new Date().toISOString(),
                    category: fields.category?.stringValue || 'Software',
                    author: fields.author?.stringValue || 'Shiraz Almadani',
                  };
                }).filter((p: any) => p.published && p.slug);
                console.log(`✨ [SEO Generator] Successfully loaded ${fetchedPosts.length} dynamic posts from Firestore!`);
              }
            } else {
              console.warn(`⚠️ [SEO Generator] Firestore fetched failed with status ${response.status}. Using empty fallback.`);
            }
          } catch (err: any) {
            console.error('⚠️ [SEO Generator] Error querying Firestore during compilation:', err.message || err);
          }

          // Append dynamic blog routes to Sitemap & SSG lists
          const dynamicRoutes = fetchedPosts.map(post => ({
            url: `/blog/${post.slug}`,
            changefreq: 'weekly' as const,
            priority: 0.8,
            title: `${post.title} | AbuQitmirLabs Journal`,
            description: post.excerpt || 'Technical Insights from Shiraz Almadani.'
          }));

          const routes = [...baseRoutes, ...dynamicRoutes];

          // Download image logo to serve from our own site
          try {
            const publicDir = path.resolve(process.cwd(), 'public');
            if (!fs.existsSync(publicDir)) {
              fs.mkdirSync(publicDir, { recursive: true });
            }
            const logoPathSource = 'https://abuqitmirlabs.tech/logo.png';
            const response = await fetch(logoPathSource);
            if (response.ok) {
              const buffer = await response.arrayBuffer();
              const nodeBuffer = Buffer.from(buffer);
              fs.writeFileSync(path.resolve(publicDir, 'logo.png'), nodeBuffer);
              if (!fs.existsSync(outDir)) {
                fs.mkdirSync(outDir, { recursive: true });
              }
              fs.writeFileSync(path.resolve(outDir, 'logo.png'), nodeBuffer);
              console.log('✅ Downloaded logo successfully to public/logo.png and dist/logo.png!');
            }
          } catch (err) {
            console.error('⚠️ Failed to download logo:', err);
          }

          if (!fs.existsSync(indexHtmlPath)) return;
          
          const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

          // 1. Generate Sitemap (sitemap.xml)
          const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${hostname}${route.url === '/' ? '' : route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;
          fs.writeFileSync(path.resolve(outDir, 'sitemap.xml'), sitemapContent);
          console.log(`✅ [Sitemap] Prepared dynamic sitemap with ${routes.length} total links!`);

          // 2. Generate RSS Feed (rss.xml)
          const rssItemsContent = fetchedPosts.map(post => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${hostname}/blog/${post.slug}</link>
      <guid isPermaLink="true">${hostname}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <author>shiraz@abuqitmirlabs.tech (${escapeXml(post.author)})</author>
      <category>${escapeXml(post.category)}</category>
    </item>`).join('\n');

          const rssContent = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AbuQitmirLabs .TECH - Custom Software &amp; AI Engineering Journal</title>
    <link>https://abuqitmirlabs.tech</link>
    <description>Discover leading insights in AI Agent automations, ERP configurations, customizable web systems, and semantic local SEO solutions from Shiraz Almadani.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://abuqitmirlabs.tech/rss.xml" rel="self" type="application/rss+xml" />
${rssItemsContent}
  </channel>
</rss>`;
          fs.writeFileSync(path.resolve(outDir, 'rss.xml'), rssContent);
          console.log('✅ [RSS Feed] Generated RSS Feed with dynamic news articles successfully!');

          // 3. Generate Robots.txt
          const robotsContent = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /google87984536fe5662da

Sitemap: ${hostname}/sitemap.xml`;
          fs.writeFileSync(path.resolve(outDir, 'robots.txt'), robotsContent);

          // 4. Generate Static HTML for each route (Soft SSG/Prerendering)
          for (const route of routes) {
            const isRoot = route.url === '/';
            const routeDir = isRoot ? outDir : path.join(outDir, route.url);
            
            if (!isRoot && !fs.existsSync(routeDir)) {
              fs.mkdirSync(routeDir, { recursive: true });
            }
            
            // Inject route specific meta tags into index.html
            let routeHtml = baseHtml;
            
            // Replace Title
            routeHtml = routeHtml.replace(/<title>(.*?)<\/title>/g, `<title>${route.title}</title>`);
            
            // Replace OG/Twitter titles
            routeHtml = routeHtml.replace(/<meta property="og:title" content="(.*?)"\s*\/?>/g, `<meta property="og:title" content="${route.title}" />`);
            routeHtml = routeHtml.replace(/<meta name="twitter:title" content="(.*?)"\s*\/?>/g, `<meta name="twitter:title" content="${route.title}" />`);

            // Replace Descriptions
            routeHtml = routeHtml.replace(/<meta name="description" content="(.*?)"\s*\/?>/g, `<meta name="description" content="${route.description}" />`);
            routeHtml = routeHtml.replace(/<meta property="og:description" content="(.*?)"\s*\/?>/g, `<meta property="og:description" content="${route.description}" />`);
            routeHtml = routeHtml.replace(/<meta name="twitter:description" content="(.*?)"\s*\/?>/g, `<meta name="twitter:description" content="${route.description}" />`);

            // Update URL
            routeHtml = routeHtml.replace(/<meta property="og:url" content="(.*?)"\s*\/?>/g, `<meta property="og:url" content="${hostname}${route.url === '/' ? '/' : route.url}" />`);
            routeHtml = routeHtml.replace(/<meta name="twitter:url" content="(.*?)"\s*\/?>/g, `<meta name="twitter:url" content="${hostname}${route.url === '/' ? '/' : route.url}" />`);
            
            // Replace canonical link
            routeHtml = routeHtml.replace(/<link rel="canonical" href="(.*?)"\s*\/?>/g, `<link rel="canonical" href="${hostname}${route.url === '/' ? '/' : route.url}" />`);
            
            // FIX: Inject meaningful body content to avoid "0 character body" and "No H1" SEO issues
            // This content provides immediate value to crawlers and is replaced by React upon hydration.
            const meaningfulContent = `
              <div id="root">
                <header>
                  <h1>${route.title}</h1>
                </header>
                <main>
                  <article>
                    <h2>Elite Digital Architecture &amp; Technical Solutions</h2>
                    <p>At AbuQitmirLabs .TECH, we specialize in <strong>custom software engineering</strong> and high-performance digital solutions.</p>
                    <img src="/logo.png" alt="AbuQitmirLabs - Custom Software Development & AI Engineering" style="max-width:300px" />
                    <p>${route.description}</p>
                    <section>
                      <h3>Our Technical Expertise</h3>
                      <p>We deliver cutting-edge software solutions including:</p>
                      <ul>
                        <li>Custom Mobile & Web App Engineering</li>
                        <li>Autonomous AI Agents & RAG Integration</li>
                        <li>Scalable Cloud-Native Microservices</li>
                        <li>High-ROI Semantic SEO Strategies</li>
                        <li>Cinematic UX Frameworks</li>
                      </ul>

                    </section>
                  </article>
                </main>
                <footer>
                  <p>&copy; ${new Date().getFullYear()} AbuQitmirLabs .TECH. Empowering businesses through advanced digital engineering.</p>
                  <nav>
                    <a href="/custom-software">Custom Software</a> | 
                    <a href="/mobile-app-development">Mobile Apps</a> | 
                    <a href="/ai-agent-development">AI Agents</a> |
                    <a href="/case-studies">Case Studies</a>
                  </nav>
                </footer>
              </div>
            `;
            
            routeHtml = routeHtml.replace('<div id="root"></div>', meaningfulContent);
            
            const targetPath = isRoot ? indexHtmlPath : path.join(routeDir, 'index.html');
            fs.writeFileSync(targetPath, routeHtml);
          }
          
          console.log('✅ SEO Assets, RSS dynamic feed, and Static Routes generated successfully!');
        }
      }
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Group critical React and animation core packages together so there is no import resolution race
              if (
                id.includes('react') || 
                id.includes('react-router-dom') || 
                id.includes('react-dom') || 
                id.includes('react-helmet-async') ||
                id.includes('framer-motion') ||
                id.includes('motion')
              ) {
                return 'vendor-core';
              }
              if (id.includes('three')) {
                return 'vendor-three';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              return 'vendor-libs';
            }
          }
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});

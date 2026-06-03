import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import compression from 'vite-plugin-compression';

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
      // Custom sitemap, robots.txt AND static route generation for SEO
      {
        name: 'custom-seo-generator',
        closeBundle: async () => {
          const hostname = 'https://abuqitmirlabs.tech';
          const routes = [
            { url: '/',                        changefreq: 'weekly',  priority: 1.0, title: 'Affordable App Development Company | AbuQitmirLabs', description: "AbuQitmirLabs .TECH is a leading app development company. We build SaaS, Flutter apps, and AI solutions for global businesses." },
            { url: '/about',                   changefreq: 'monthly', priority: 0.8, title: 'About Us | AbuQitmirLabs', description: 'Learn about our mission to build cutting-edge AI and mobile solutions.' },
            { url: '/contact',                 changefreq: 'monthly', priority: 0.9, title: 'Contact Us | Start Your Project', description: 'Contact AbuQitmirLabs for your next mobile app or AI software project.' },
            { url: '/custom-software',         changefreq: 'weekly',  priority: 0.9, title: 'Custom Software Development', description: 'Tailor-made software solutions for your unique business needs.' },
            { url: '/mobile-app-development',  changefreq: 'weekly',  priority: 0.9, title: 'Flutter & Native Mobile Apps', description: 'Expert mobile app development for iOS and Android using Flutter and Native technologies.' },
            { url: '/web-development',         changefreq: 'weekly',  priority: 0.9, title: 'Modern Web Development', description: 'High-performance web applications built with the latest technologies.' },
            { url: '/ai-agent-development',    changefreq: 'weekly',  priority: 0.9, title: 'AI Agent & AI App Development', description: 'Leading AI development solutions including agents, chatbots, and generative AI.' },
            { url: '/seo-mastery',             changefreq: 'weekly',  priority: 0.8, title: 'SEO Mastery Services', description: 'Boost your digital presence with our expert SEO and ranking services.' },
            { url: '/graphics-design',         changefreq: 'weekly',  priority: 0.8, title: 'Creative Graphics & UI/UX', description: 'Stunning visual designs and user experiences that capture attention.' },
            { url: '/content-writing',         changefreq: 'weekly',  priority: 0.8, title: 'Professional Content Writing', description: 'Engaging content that drives conversions and builds brand authority.' },
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
          
          if (!fs.existsSync(indexHtmlPath)) return;
          
          const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

          // 1. Generate Sitemap
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

          // 2. Generate Robots.txt
          const robotsContent = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /google87984536fe5662da

Sitemap: ${hostname}/sitemap.xml`;
          fs.writeFileSync(path.resolve(outDir, 'robots.txt'), robotsContent);

          // 3. Generate Static HTML for each route (Soft SSG/Prerendering)
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
            
            // FIX: Inject meaningful body content to avoid "0 character body" and "No H1" SEO issues
            // This content provides immediate value to crawlers and is replaced by React upon hydration.
            const meaningfulContent = `
              <div id="root">
                <header>
                  <h1>${route.title}</h1>
                </header>
                <main>
                  <article>
                    <h2>Expert ${route.title}</h2>
                    <p>At AbuQitmirLabs .TECH, we specialize in <strong>affordable app development</strong> and high-performance digital engineering.</p>
                    <img src="https://i.postimg.cc/hjLzDQHK/abuqitmir222.png" alt="AbuQitmirLabs - Custom Software Development & AI Engineering" style="max-width:300px" />
                    <p>${route.description}</p>
                    <section>
                      <h3>Our Technical Expertise</h3>
                      <p>We deliver cutting-edge software solutions including:</p>
                      <ul>
                        <li>Custom Mobile & Web App Engineering</li>
                        <li>Autonomous AI Agents & RAG Integration</li>
                        <li>Scalable Cloud-Native Microservices</li>
                        <li>High-ROI Semantic SEO Strategies</li>
                      </ul>

                    </section>
                  </article>
                </main>
                <footer>
                  <p>&copy; ${new Date().getFullYear()} AbuQitmirLabs .TECH. Empowering businesses through advanced digital engineering.</p>
                  <nav>
                    <a href="/custom-software">Custom Software</a> | 
                    <a href="/mobile-app-development">Mobile Apps</a> | 
                    <a href="/ai-agent-development">AI Agents</a>
                  </nav>
                </footer>
              </div>
            `;
            
            routeHtml = routeHtml.replace('<div id="root"></div>', meaningfulContent);
            
            const targetPath = isRoot ? indexHtmlPath : path.join(routeDir, 'index.html');
            fs.writeFileSync(targetPath, routeHtml);
          }
          
          console.log('✅ SEO Assets and Static Routes generated successfully!');
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

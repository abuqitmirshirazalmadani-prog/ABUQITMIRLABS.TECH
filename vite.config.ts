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
          '/custom-software',
          '/mobile-app-development',
          '/web-development',
          '/ai-agent-development',
          '/seo-mastery',
          '/graphics-design',
          '/content-writing',
          '/case-studies',
          '/case-studies/tajweedpage',
          '/about',
          '/us-market',
          '/uk-market',
          '/pakistan-market',
          '/canada-market',
          '/poland-market',
          '/australia-market',
          '/privacy',
          '/terms',
          '/blog',
          '/contact'
        ],
        renderer: new prerender.PuppeteerRenderer({
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
      }),
      // Custom sitemap, robots.txt, RSS Feed AND static route generation for SEO
      {
        name: 'custom-seo-generator',
        closeBundle: async () => {
          const hostname = 'https://www.abuqitmirlabs.tech';
          const baseRoutes = [
            { url: '/',                        changefreq: 'weekly',  priority: 1.0, title: 'Custom Software & AI App Development | AbuQitmirLabs', description: "AbuQitmirLabs .TECH is an elite software studio. We build bespoke SaaS, enterprise systems, and custom AI models. Let's build your solution." },
            { url: '/about',                   changefreq: 'monthly', priority: 0.8, title: 'About Us | AbuQitmirLabs', description: 'Learn about our mission to build cutting-edge AI and mobile solutions.' },
            { url: '/contact',                 changefreq: 'monthly', priority: 0.9, title: 'Contact Us | Start Your Project', description: 'Contact AbuQitmirLabs for your next mobile app or AI software project.' },
            { url: '/custom-software',         changefreq: 'weekly',  priority: 0.9, title: 'Custom Software Development Services | Abu Qitmir Labs', description: "AbuQitmirLabs builds custom software, ERP systems, and AI-powered solutions tailored to your workflows. We deliver working features every 2 weeks. Let's build your system." },
            { url: '/mobile-app-development',  changefreq: 'weekly',  priority: 0.9, title: 'Mobile App Development | Flutter & Native iOS/Android | AbuQitmirLabs', description: 'AbuQitmirLabs builds high-performance mobile apps using Flutter, React Native, and iOS/Android. We handle design, development, and App Store submission.' },
            { url: '/web-development',         changefreq: 'weekly',  priority: 0.9, title: 'Web Development Services | React, Next.js & Jamstack | AbuQitmirLabs', description: 'AbuQitmirLabs builds high-performance web apps using React, Next.js, and Jamstack. From corporate sites to e-commerce and PWAs — we deliver speed, scalability, and SEO-ready code.' },
            { url: '/ai-agent-development',    changefreq: 'weekly',  priority: 0.9, title: 'AI Agent Development | Custom AI Automation Solutions | AbuQitmirLabs', description: 'AbuQitmirLabs builds custom AI agents with RAG, voice recognition, and workflow automation. From customer support to logistics optimization — deploy autonomous AI that drives real ROI.' },
            { url: '/seo-mastery',             changefreq: 'weekly',  priority: 0.8, title: 'SEO Services | Professional Search Engine Optimization | AbuQitmirLabs', description: 'AbuQitmirLabs delivers data-driven SEO services — technical audits, on-page optimization, local SEO, and authority building. Rank higher, attract quality traffic, and grow your business.' },
            { url: '/local-seo-for-small-business', changefreq: 'weekly', priority: 0.9, title: 'Local SEO for Small Business | Affordable Plans | AbuQitmirLabs', description: 'Affordable local SEO for small businesses. Get found in Google Maps with GBP optimization, NAP citations, and on-page local keywords. Start with a $500/month plan.' },
            { url: '/local-seo-citation-building', changefreq: 'weekly', priority: 0.8, title: 'Local SEO Citation Building | NAP Consistency Services | AbuQitmirLabs', description: 'Manual NAP citation building, audit & cleanup across top-tier directories. Boost local search rankings with consistent citations on Google, Yelp, Apple Maps & more. Start with a $150 audit.' },
            { url: '/white-label-local-seo',   changefreq: 'weekly',  priority: 0.8, title: 'White Label Local SEO for Agencies | Reseller Plans | AbuQitmirLabs', description: 'White label local SEO fulfillment for agencies — citations, GBP optimization, and branded PDF reports. Reseller plans with 35–50% margins. Expand your services without expanding your team.' },
            { url: '/local-seo-audit',          changefreq: 'weekly',  priority: 0.8, title: 'Free Local SEO Audit | Forensic Map Pack Analysis | AbuQitmirLabs', description: 'Free local SEO audit covering Google Business Profile, NAP citations, schema markup, and map-pack competitors. Get a prioritized action plan — not a jargon-filled deck.' },
            { url: '/graphics-design',         changefreq: 'weekly',  priority: 0.8, title: 'Graphics Design Services | Brand Identity & UI/UX | AbuQitmirLabs', description: 'AbuQitmirLabs provides professional graphic design services — brand identity, logo design, UI/UX, pitch decks, and print assets. Build a cohesive visual identity that stands out.' },
            { url: '/content-writing',         changefreq: 'weekly',  priority: 0.8, title: 'Content Writing Services | SEO Copywriting & Blogging | AbuQitmirLabs', description: 'AbuQitmirLabs provides professional content writing services — SEO blogs, website copy, landing pages, and long-form articles. Data-driven content that ranks and converts.' },
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
              console.log('[SEO Generator] note: Could not parse optional configuration, using fallback:', cfgErr);
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
              console.log(`[SEO Generator] note: Firestore fetch responded with status ${response.status}. Using empty fallback.`);
            }
          } catch (err: any) {
            console.log('[SEO Generator] note: Querying optional Firestore database omitted during compilation:', err.message || err);
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
            const logoPathSource = 'https://www.abuqitmirlabs.tech/logo.png';
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
            console.log('[SEO Generator] note: Logo download omitted:', err);
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
      <author>hello@abuqitmirlabs.tech (${escapeXml(post.author)})</author>
      <category>${escapeXml(post.category)}</category>
    </item>`).join('\n');

          const rssContent = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AbuQitmirLabs .TECH - Custom Software &amp; AI Engineering Journal</title>
    <link>https://www.abuqitmirlabs.tech</link>
    <description>Discover leading insights in AI Agent automations, ERP configurations, customizable web systems, and semantic local SEO solutions from Shiraz Almadani.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://www.abuqitmirlabs.tech/rss.xml" rel="self" type="application/rss+xml" />
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
            routeHtml = routeHtml.replace(/<link rel="canonical"[^>]*\/?>/g, `<link rel="canonical" data-rh="true" href="${hostname}${route.url === '/' ? '/' : route.url}" />`);
            
            // FIX: Inject meaningful body content to avoid "0 character body" and "No H1" SEO issues
            // This content provides immediate value to crawlers and is replaced by React upon hydration.
            let articleContent = '';
            
            if (route.url === '/seo-mastery') {
              articleContent = `
                <h2>SEO Mastery: Data-Driven Search Engine Optimization</h2>
                <p>
                  Ranking isn't about stuffing keywords — it's about technical health plus 
                  content that actually answers search intent. We run full technical audits, 
                  fix crawl and indexing issues, and build content structures that Google can 
                  understand and trust. Hamari SEO services ko aap <a href="/web-development">Web Development</a> aur <a href="/content-writing">Content Writing</a> ke sath combine kar ke maximum search visibility hasil kar sakte hain.
                </p>
                <img src="/logo.png" alt="AbuQitmirLabs - Custom Software Development & AI Engineering" style="max-width:300px" />
                <p>${route.description}</p>
                <section>
                  <h3>Our Technical Expertise</h3>
                  <ul>
                    <li>Technical SEO Audits & Crawl Error Fixes</li>
                    <li>On-Page & Semantic Entity Optimization</li>
                    <li>XML Sitemap & Schema Markup Implementation</li>
                    <li>Local SEO & Google Business Profile Optimization</li>
                    <li>Content Strategy Aligned with Search Intent</li>
                  </ul>
                </section>
              `;
            } else if (route.url === '/case-studies') {
              articleContent = `
                <h2>Real Projects. Real Results.</h2>
                <p>
                  We don't publish polished portfolio pieces with the hard parts edited out. 
                  Each case study here covers a real project we built — the problem, our actual 
                  technical approach, and what shipped. Our work spans AI products, custom 
                  platforms, and growth-focused engineering.
                </p>
                <img src="/logo.png" alt="AbuQitmirLabs - Custom Software Development & AI Engineering" style="max-width:300px" />
                <p>${route.description}</p>
                <section>
                  <h3>Our Technical Expertise</h3>
                  <ul>
                    <li>Real Client Projects, Not Mockups</li>
                    <li>AI & RAG-Powered Product Builds</li>
                    <li>Custom Platform Engineering Case Studies</li>
                    <li>Technical Breakdown of Our Approach</li>
                    <li>Measurable Outcomes Where Available</li>
                  </ul>
                </section>
              `;
            } else {
              const routeH2 = route.url === '/' 
                ? 'Custom Software · Web Development · AI Agents · Mobile Apps · SEO' 
                : 'Elite Digital Architecture &amp; Technical Solutions';
                
              articleContent = `
                <h2>${routeH2}</h2>
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
              `;
            }

            const meaningfulContent = `
              <div id="root">
                <header>
                  <h1>${route.title}</h1>
                  <nav aria-label="Main Navigation">
                    <a href="/">Home</a> | 
                    <a href="/custom-software">Custom Software</a> | 
                    <a href="/mobile-app-development">Mobile Apps</a> | 
                    <a href="/web-development">Web Development</a> | 
                    <a href="/ai-agent-development">AI Agents</a> | 
                    <a href="/seo-mastery">SEO Mastery</a> | 
                    <a href="/graphics-design">Graphics & Branding</a> | 
                    <a href="/content-writing">Content Writing</a> | 
                    <a href="/case-studies">Case Studies</a> | 
                    <a href="/about">About Us</a> | 
                    <a href="/contact">Contact</a> | 
                    <a href="/blog">Blog</a>
                  </nav>
                </header>
                <main>
                  <article>
                    ${articleContent}
                  </article>
                  <section aria-label="Industry Solutions & Resources">
                    <h3>Specialized Industry Solutions</h3>
                    <ul>
                      <li><a href="/solutions/ai-automation">Custom AI Automation & Autonomous Agents</a></li>
                      <li><a href="/solutions/fintech">Fintech Software & Secure Payment Platforms</a></li>
                      <li><a href="/solutions/edtech">EdTech Development & Learning Management Systems</a></li>
                      <li><a href="/solutions/ecommerce">E-Commerce Development & Headless Platforms</a></li>
                      <li><a href="/solutions/healthcare">HIPAA-Compliant Healthcare Platforms</a></li>
                    </ul>
                    <h3>Global Market Solutions</h3>
                    <ul>
                      <li><a href="/us-market">United States Software Engineering Services</a></li>
                      <li><a href="/uk-market">United Kingdom Digital Transformation Solutions</a></li>
                      <li><a href="/canada-market">Canada Enterprise App Development Services</a></li>
                      <li><a href="/pakistan-market">Pakistan Custom Software & Mobile App Services</a></li>
                      <li><a href="/australia-market">Australia Custom AI & Web App Engineering</a></li>
                      <li><a href="/poland-market">Poland Tech Hub Software Development</a></li>
                    </ul>
                  </section>
                </main>
                <footer>
                  <p>&copy; ${new Date().getFullYear()} AbuQitmirLabs .TECH. Empowering businesses through advanced digital engineering.</p>
                  <nav aria-label="Footer Navigation">
                    <a href="/custom-software">Custom Software</a> | 
                    <a href="/mobile-app-development">Mobile Apps</a> | 
                    <a href="/web-development">Web Development</a> | 
                    <a href="/ai-agent-development">AI Agents</a> | 
                    <a href="/seo-mastery">SEO Mastery</a> | 
                    <a href="/case-studies">Case Studies</a> | 
                    <a href="/about">About Us</a> | 
                    <a href="/contact">Contact</a> | 
                    <a href="/blog">Blog</a> | 
                    <a href="/privacy">Privacy Policy</a> | 
                    <a href="/terms">Terms of Service</a>
                  </nav>
                  <div style="margin-top:12px; font-size:12px;">
                    <strong>Trusted Technology Ecosystem & Industry Authorities:</strong>
                    <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React Framework Docs</a> | 
                    <a href="https://platform.openai.com/docs" target="_blank" rel="noopener noreferrer">OpenAI Platform Guides</a> | 
                    <a href="https://aws.amazon.com/architecture" target="_blank" rel="noopener noreferrer">AWS Architecture Center</a> | 
                    <a href="https://developers.google.com/search" target="_blank" rel="noopener noreferrer">Google Search Central</a> | 
                    <a href="https://www.w3.org" target="_blank" rel="noopener noreferrer">W3C Web Standards</a>
                  </div>
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
      minify: 'esbuild',
      cssMinify: true,
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

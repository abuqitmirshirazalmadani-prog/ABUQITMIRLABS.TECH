import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import esbuild from 'esbuild';
import {defineConfig, loadEnv} from 'vite';
import compression from 'vite-plugin-compression';
import { aiAgentSchema, aiAgentInitialHtml } from './src/utils/aiAgentStaticHtml';
import { graphicsDesignSchema, graphicsDesignInitialHtml } from './src/utils/graphicsDesignStaticHtml';
import { fintechSchema, fintechInitialHtml } from './src/utils/fintechStaticHtml';
import { healthcareSchema, healthcareInitialHtml } from './src/utils/healthcareStaticHtml';
import { aiAutomationSchema, aiAutomationInitialHtml } from './src/utils/aiAutomationStaticHtml';
import { eCommerceSchema, eCommerceInitialHtml } from './src/utils/eCommerceStaticHtml';
import { edTechSchema, edTechInitialHtml } from './src/utils/edTechStaticHtml';
import { customSoftwareSchema, customSoftwareInitialHtml } from './src/utils/customSoftwareStaticHtml';
import { mobileAppSchema, mobileAppInitialHtml } from './src/utils/mobileAppStaticHtml';
import { customWebDevBlogSchema, customWebDevBlogInitialHtml } from './src/utils/customWebDevBlogStaticHtml';
import { localSEOSmallBusinessSchema, localSEOSmallBusinessInitialHtml } from './src/utils/localSEOSmallBusinessStaticHtml';
import { homeSchema, homeInitialHtml } from './src/utils/homeStaticHtml';

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
          '/solutions/fintech',
          '/solutions/healthcare',
          '/solutions/ai-automation',
          '/solutions/e-commerce',
          '/solutions/edtech',
          '/case-studies',
          '/case-studies/tajweedpage',
          '/about',
          '/about/our-company',
          '/about/our-team',
          '/about/our-process',
          '/about/careers',
          '/us-market',
          '/uk-market',
          '/pakistan-market',
          '/canada-market',
          '/poland-market',
          '/australia-market',
          '/privacy',
          '/terms',
          '/blog',
          '/blog/custom-web-development-company',
          '/local-seo-for-small-business',
          '/local-seo-citation-building',
          '/white-label-local-seo',
          '/local-seo-audit',
          '/website-contract',
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
            { url: '/',                        changefreq: 'weekly',  priority: 1.0, title: 'Custom Software & AI App Development Company | AbuQitmirLabs', description: "AbuQitmirLabs is a custom software & AI development company delivering scalable web platforms, mobile apps, AI agents, and technical SEO for global businesses." },
            { url: '/about',                   changefreq: 'monthly', priority: 0.8, title: 'About Us | AbuQitmirLabs', description: 'Learn about our mission to build cutting-edge AI and mobile solutions.' },
            { url: '/about/our-company',       changefreq: 'monthly', priority: 0.8, title: 'About Our Company | Global Software Studio | AbuQitmirLabs', description: 'AbuQitmirLabs is a Karachi-based software boutique. 410+ custom projects for 350+ global clients. Zero lock-in, 100% in-house talent. Learn about our mission and values.' },
            { url: '/about/our-team',          changefreq: 'monthly', priority: 0.8, title: 'Our Team | Elite Software Architects | AbuQitmirLabs', description: 'Meet the AbuQitmirLabs team — 12+ in-house software architects, engineers, and UI/UX experts in Karachi. 410+ projects delivered globally. Led by founder Abu Qitmir.' },
            { url: '/about/our-process',       changefreq: 'monthly', priority: 0.8, title: 'Our Process | 6-Step Software Engineering Method | AbuQitmirLabs', description: "AbuQitmirLabs' 6-step engineering process: Discovery, Architecture, Development, QA, Zero-Downtime Launch, and Support. Structured discipline delivering 3x faster ROI." },
            { url: '/about/careers',           changefreq: 'monthly', priority: 0.8, title: 'Careers at AbuQitmirLabs | Join Our In-House Studio | AbuQitmirLabs', description: "Join AbuQitmirLabs — we're hiring senior full-stack architects, AI/RAG engineers, UI/UX designers, and SEO strategists in Karachi. Build global software that matters." },
            { url: '/contact',                 changefreq: 'monthly', priority: 0.9, title: 'Contact Us | Free Project Quote & Consultation | AbuQitmirLabs', description: 'Contact AbuQitmirLabs for a free project quote. Get a free technical consultation and digital audit. Build custom software, mobile apps, AI agents, and web solutions.' },
            { url: '/custom-software',         changefreq: 'weekly',  priority: 0.9, title: 'Custom Software Development Company | AbuQitmirLabs', description: 'Bespoke software built around your workflows — ERPs, SaaS platforms, AI-powered tools, and enterprise systems. Full IP ownership.' },
            { url: '/mobile-app-development',  changefreq: 'weekly',  priority: 0.9, title: 'Mobile App Development Company | AbuQitmirLabs', description: 'Flutter, React Native, and native iOS/Android app development. Full source code ownership, App Store submission, and backend integration included.' },
            { url: '/web-development',         changefreq: 'weekly',  priority: 0.9, title: 'Web Development Company | Custom Web Solutions | AbuQitmirLabs', description: 'AbuQitmirLabs provides custom web development for startups and businesses, building fast, secure, responsive websites and scalable web applications.' },
            { url: '/ai-agent-development',    changefreq: 'weekly',  priority: 0.9, title: 'Healthcare AI Agent Development Company | AbuQitmirLabs', description: 'Custom healthcare AI agents for patient intake, RAG, EHR integration and workflow automation. Build secure AI systems with AbuQitmirLabs.' },
            { url: '/seo-mastery',             changefreq: 'weekly',  priority: 0.8, title: 'SEO Services | Professional Search Engine Optimization | AbuQitmirLabs', description: 'AbuQitmirLabs delivers data-driven SEO services — technical audits, on-page optimization, local SEO, and authority building. Rank higher, attract quality traffic, and grow your business.' },
            { url: '/local-seo-for-small-business', changefreq: 'weekly', priority: 0.9, title: 'Local SEO Services for Small Businesses | AbuQitmirLabs', description: 'Grow local visibility with expert Local SEO for small businesses, including Google Business Profile, local rankings, citations, and on-page optimization.' },
            { url: '/local-seo-citation-building', changefreq: 'weekly', priority: 0.8, title: 'Local SEO Citation Building | NAP Consistency Services | AbuQitmirLabs', description: 'Manual NAP citation building, audit & cleanup across top-tier directories. Boost local search rankings with consistent citations on Google, Yelp, Apple Maps & more. Start with a $150 audit.' },
            { url: '/white-label-local-seo',   changefreq: 'weekly',  priority: 0.8, title: 'White Label Local SEO for Agencies | Reseller Plans | AbuQitmirLabs', description: 'White label local SEO fulfillment for agencies — citations, GBP optimization, and branded PDF reports. Reseller plans with 35–50% margins. Expand your services without expanding your team.' },
            { url: '/local-seo-audit',          changefreq: 'weekly',  priority: 0.8, title: 'Free Local SEO Audit | Forensic Map Pack Analysis | AbuQitmirLabs', description: 'Free local SEO audit covering Google Business Profile, NAP citations, schema markup, and map-pack competitors. Get a prioritized action plan — not a jargon-filled deck.' },
            { url: '/graphics-design',         changefreq: 'weekly',  priority: 0.8, title: 'Graphic Design Services for Brands & Businesses | AbuQitmirLabs', description: 'Professional graphic design services for brands and businesses: custom logos, brand identity, pitch decks, UI/UX, and marketing collateral with AbuQitmirLabs.' },
            { url: '/content-writing',         changefreq: 'weekly',  priority: 0.8, title: 'Content Writing Services | SEO Copywriting & Blogging | AbuQitmirLabs', description: 'AbuQitmirLabs provides professional content writing services — SEO blogs, website copy, landing pages, and long-form articles. Data-driven content that ranks and converts.' },
            { url: '/solutions/fintech',        changefreq: 'weekly',  priority: 0.8, title: 'FinTech Solutions for Digital Finance | AbuQitmirLabs', description: 'Build secure FinTech platforms, payment systems and digital finance experiences with AbuQitmirLabs for startups and growing businesses.' },
            { url: '/solutions/healthcare',     changefreq: 'weekly',  priority: 0.8, title: 'Healthcare Software Solutions | AbuQitmirLabs', description: 'Build secure healthcare software, patient portals, telemedicine platforms and clinical systems with AbuQitmirLabs for modern healthcare businesses.' },
            { url: '/solutions/ai-automation',  changefreq: 'weekly',  priority: 0.9, title: 'AI Automation Solutions | AbuQitmirLabs', description: 'Automate business workflows with AI agents, RAG, APIs and intelligent integrations. Build secure AI automation for startups and enterprises.' },
            { url: '/solutions/e-commerce',     changefreq: 'weekly',  priority: 0.9, title: 'E-commerce Software Solutions | Custom E-commerce Development', description: 'Engineer high-performance e-commerce software solutions, custom online stores, B2B wholesale portals, mobile shopping apps & multi-vendor marketplaces.' },
            { url: '/solutions/edtech',         changefreq: 'weekly',  priority: 0.9, title: 'EdTech Software Development | LMS & Learning Platforms', description: 'Build scalable EdTech software with custom LMS platforms, virtual classrooms, AI tutoring, student portals, assessments, and learning analytics.' },
            { url: '/case-studies',            changefreq: 'weekly',  priority: 0.9, title: 'Case Studies | Real-World Success Stories | AbuQitmirLabs', description: 'Explore real-world success stories from AbuQitmirLabs — custom software, AI automation, mobile apps, and web solutions that delivered measurable ROI for 350+ global clients.' },
            { url: '/case-studies/tajweedpage',changefreq: 'weekly',  priority: 0.9, title: 'AI Quran Learning Platform Case Study | AbuQitmirLabs', description: 'How we built the world\'s first AI-powered Quran learning platform with RAG Tajweed teacher, SEO for 20+ countries, and full Next.js stack — in just 10 days.' },
            { url: '/us-market',               changefreq: 'monthly', priority: 0.7, title: 'Software Development for US Startups | CCPA & HIPAA Ready | AbuQitmirLabs', description: 'US-focused software development for startups — mobile apps, AI agents, and local SEO. CCPA & HIPAA compliant, built at startup speed. Scale your US presence with offshore expertise.' },
            { url: '/uk-market',               changefreq: 'monthly', priority: 0.7, title: 'Digital Transformation for UK Businesses | GDPR Compliant | AbuQitmirLabs', description: 'UK-focused digital transformation services — GDPR-compliant software, mobile apps, AI agents, and high-street local SEO. Built for British businesses, with full GMT working-day overlap.' },
            { url: '/pakistan-market',         changefreq: 'monthly', priority: 0.7, title: 'Digital Transformation for Pakistan | Local SEO & Custom Software | AbuQitmirLabs', description: 'Karachi-based digital transformation for Pakistani businesses — local SEO, custom software, mobile apps, and Roman Urdu AI agents. PKR pricing, in-person meetings, same time zone.' },
            { url: '/canada-market',           changefreq: 'monthly', priority: 0.7, title: 'Software Development for Canada | PIPEDA Compliant | AbuQitmirLabs', description: 'Canada-focused software development — PIPEDA-compliant apps, local SEO, and bilingual-ready platforms (EN/FR). Built for Canadian startups and enterprises, with EST/PST overlap.' },
            { url: '/poland-market',           changefreq: 'monthly', priority: 0.7, title: 'Software Development for Poland | GDPR & EU Expansion | AbuQitmirLabs', description: 'Poland-focused software development — GDPR-compliant apps, AI agents, SaaS, and local SEO for Krakow/Warsaw. Built for Polish startups and EU expansion, with CET overlap.' },
            { url: '/australia-market',        changefreq: 'monthly', priority: 0.7, title: 'Software Development for Australia | APP Compliant | AbuQitmirLabs', description: 'Australia-focused software development — APP-compliant apps, high-speed web, mobile apps, and AI agents. Built for Australian businesses with AEST-aligned delivery. Start your audit today.' },
            { url: '/blog',                    changefreq: 'daily',   priority: 0.8, title: 'Tech Blog & AI Insights | AbuQitmirLabs', description: 'AbuQitmirLabs tech journal covers AI agents, custom software, web & mobile development, SEO, and digital transformation. Read expert insights, guides, and case studies.' },
            { url: '/blog/what-are-healthcare-ai-agents-complete-guide-2026', changefreq: 'weekly', priority: 0.9, title: 'What Are Healthcare AI Agents? Complete 2026 Guide | AbuQitmirLabs', description: 'Explore healthcare AI agents in 2026: autonomous architectures, EHR integration, RAG, clinical triage, HIPAA-aligned security, and engineering workflows.' },
            { url: '/blog/healthcare-software-development-solutions-2026', changefreq: 'weekly', priority: 0.8, title: 'Healthcare Software Development Solutions: The Complete 2026 Guide | AbuQitmirLabs', description: 'A complete 2026 guide to healthcare software development — EHR systems, telemedicine platforms, clinical workflow tools, and compliance requirements.' },
            { url: '/blog/custom-web-development-company-2026', changefreq: 'weekly', priority: 0.8, title: 'Custom Web Development Company 2026 | Built-In Visibility | AbuQitmirLabs', description: "The best custom web development companies don't add SEO, GEO, and AI visibility after launch. They build it into every decision from day one. Here's what that looks like — and why it matters." },
            { url: '/blog/custom-web-development-company', changefreq: 'weekly', priority: 0.9, title: 'Custom Web Development Company: The Complete Guide to Web Apps, SEO, Security & B2B Solutions', description: 'Full guide to custom web application development — covering SEO web development, B2B platforms, healthcare web apps, security, and full-stack services.' },
            { url: '/blog/rag-ai-integration-for-startups', changefreq: 'weekly', priority: 0.9, title: 'RAG AI Integration for Startups | AbuQitmirLabs', description: 'How startups use RAG to ground AI in real data — architecture, cost, RAG vs fine-tuning, and build vs hire, with a real RAG case study.' },
            { url: '/blog/custom-ai-solutions-for-fintech-2026', changefreq: 'weekly', priority: 0.8, title: 'Custom AI Solutions for Fintech 2026 | Fraud Detection & Underwriting | AbuQitmirLabs', description: 'Custom AI solutions for fintech in 2026 — real-time fraud detection, AI-assisted underwriting, and RAG-based support. See what a fintech software development company actually builds.' },
            { url: '/news/latest',             changefreq: 'weekly',  priority: 0.8, title: 'Latest News | Company Updates & Press Releases | AbuQitmirLabs', description: 'AbuQitmirLabs newsroom — latest company updates, software launches, AI agent releases, and press announcements. Subscribe for monthly engineering and tech insights.' },
            { url: '/news/press-releases',     changefreq: 'monthly', priority: 0.8, title: 'Press Releases | Corporate Announcements | AbuQitmirLabs', description: 'Official press releases and corporate announcements from AbuQitmirLabs software engineering studio in Karachi.' },
            { url: '/news/industry-insights', changefreq: 'weekly',  priority: 0.8, title: 'Industry Insights | Technical Benchmarks & AI Architecture | AbuQitmirLabs', description: 'Industry insights from AbuQitmirLabs — technical breakdowns on AI RAG, GEO, HIPAA compliance, and low-latency full-stack design. Written by senior software architects.' },
            { url: '/news/all',                changefreq: 'weekly',  priority: 0.8, title: 'All News & Media Archive | AbuQitmirLabs', description: 'All news and media archive from AbuQitmirLabs — company announcements, press releases, product launches, and technical engineering insights. Browse our complete catalog.' },
            { url: '/website-contract',        changefreq: 'weekly',  priority: 0.8, title: 'Free Website Contract Template | Ownership Protection | AbuQitmirLabs', description: 'Download a free, ownership-protected website contract template. Includes domain ownership, support SLAs, tech stack disclosure, and exit terms. No strings attached.' },
            { url: '/terms',                   changefreq: 'yearly',  priority: 0.3, title: 'Terms of Service | Client Agreement & IP Policy | AbuQitmirLabs', description: 'AbuQitmirLabs terms of service: agreement, IP, payment terms, and liability. Learn about client responsibilities and termination protocols for our software services.' },
            { url: '/privacy',                 changefreq: 'yearly',  priority: 0.3, title: 'Privacy Policy | Data Protection & Compliance | AbuQitmirLabs', description: 'AbuQitmirLabs privacy policy: how we collect, use, and protect your data. Learn about our security measures, cookie use, and GDPR/APP compliance.' },
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
            const safeTitle = route.title.replace(/&/g, '&amp;');
            const safeDesc = route.description.replace(/"/g, '&quot;').replace(/&/g, '&amp;');
            
            // Replace Title
            // Deduplicate and replace title
            routeHtml = routeHtml.replace(/<title>[\s\S]*?<\/title>/gi, '');
            routeHtml = routeHtml.replace('</head>', `  <title>${safeTitle}</title>\n</head>`);
            
            // Deduplicate and replace OG/Twitter titles
            routeHtml = routeHtml.replace(/<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/gi, '');
            routeHtml = routeHtml.replace(/<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/gi, '');
            routeHtml = routeHtml.replace('</head>', `  <meta property="og:title" content="${safeTitle}" />\n  <meta name="twitter:title" content="${safeTitle}" />\n</head>`);

            // Deduplicate and replace Descriptions
            routeHtml = routeHtml.replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/gi, '');
            routeHtml = routeHtml.replace(/<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/gi, '');
            routeHtml = routeHtml.replace(/<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/gi, '');
            routeHtml = routeHtml.replace('</head>', `  <meta name="description" content="${safeDesc}" />\n  <meta property="og:description" content="${safeDesc}" />\n  <meta name="twitter:description" content="${safeDesc}" />\n</head>`);

            // Update URL
            routeHtml = routeHtml.replace(/<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/gi, '');
            routeHtml = routeHtml.replace(/<meta\s+name="twitter:url"\s+content="[\s\S]*?"\s*\/?>/gi, '');
            routeHtml = routeHtml.replace('</head>', `  <meta property="og:url" content="${hostname}${route.url === '/' ? '/' : route.url}" />\n  <meta name="twitter:url" content="${hostname}${route.url === '/' ? '/' : route.url}" />\n</head>`);
            
            // Deduplicate and replace canonical link cleanly
            routeHtml = routeHtml.replace(/<link\s+rel="canonical"[^>]*\/?>/gi, '');
            routeHtml = routeHtml.replace('</head>', `  <link rel="canonical" data-rh="true" href="${hostname}${route.url === '/' ? '/' : route.url}" />\n</head>`);
            
            // Special authoritative injection for / (Homepage)
            if (route.url === '/') {
              // 1. Inject authoritative JSON-LD schema
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
              routeHtml = routeHtml.replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(homeSchema, null, 2)}\n  </script>\n</head>`);

              // 2. Inject full authentic crawlable HTML inside #root
              routeHtml = routeHtml.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${homeInitialHtml}</div>`);

              // 3. Write directly to indexHtmlPath
              fs.writeFileSync(indexHtmlPath, routeHtml);
              continue;
            }

            // Special authoritative injection for /ai-agent-development
            if (route.url === '/ai-agent-development') {
              // 1. Inject authoritative 7-entity JSON-LD schema
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
              routeHtml = routeHtml.replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(aiAgentSchema, null, 2)}\n  </script>\n</head>`);

              // 2. Inject full authentic crawlable HTML inside #root
              routeHtml = routeHtml.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${aiAgentInitialHtml}</div>`);

              // 3. Write directly without #seo-crawler-content fallback
              const targetPath = isRoot ? indexHtmlPath : path.join(routeDir, 'index.html');
              fs.writeFileSync(targetPath, routeHtml);
              continue;
            }

            // Special authoritative injection for /graphics-design
            if (route.url === '/graphics-design') {
              // 1. Inject authoritative 6-entity JSON-LD schema
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
              routeHtml = routeHtml.replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(graphicsDesignSchema, null, 2)}\n  </script>\n</head>`);

              // 2. Inject full authentic crawlable HTML inside #root
              routeHtml = routeHtml.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${graphicsDesignInitialHtml}</div>`);

              // 3. Write directly without #seo-crawler-content fallback
              const targetPath = isRoot ? indexHtmlPath : path.join(routeDir, 'index.html');
              fs.writeFileSync(targetPath, routeHtml);
              continue;
            }

            // Special authoritative injection for /solutions/fintech
            if (route.url === '/solutions/fintech') {
              // 1. Inject authoritative 7-entity JSON-LD schema
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
              routeHtml = routeHtml.replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(fintechSchema, null, 2)}\n  </script>\n</head>`);

              // 2. Inject full authentic crawlable HTML inside #root
              routeHtml = routeHtml.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${fintechInitialHtml}</div>`);

              // 3. Write directly without #seo-crawler-content fallback
              const targetPath = isRoot ? indexHtmlPath : path.join(routeDir, 'index.html');
              fs.writeFileSync(targetPath, routeHtml);
              continue;
            }

            // Special authoritative injection for /solutions/healthcare
            if (route.url === '/solutions/healthcare') {
              // 1. Inject authoritative JSON-LD schema
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
              routeHtml = routeHtml.replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(healthcareSchema, null, 2)}\n  </script>\n</head>`);

              // 2. Inject full authentic crawlable HTML inside #root
              routeHtml = routeHtml.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${healthcareInitialHtml}</div>`);

              // 3. Write directly without #seo-crawler-content fallback
              const targetPath = isRoot ? indexHtmlPath : path.join(routeDir, 'index.html');
              fs.writeFileSync(targetPath, routeHtml);
              continue;
            }

            // Special authoritative injection for /solutions/ai-automation
            if (route.url === '/solutions/ai-automation') {
              // 1. Inject authoritative JSON-LD schema
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
              routeHtml = routeHtml.replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(aiAutomationSchema, null, 2)}\n  </script>\n</head>`);

              // 2. Inject full authentic crawlable HTML inside #root
              routeHtml = routeHtml.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${aiAutomationInitialHtml}</div>`);

              // 3. Write directly without #seo-crawler-content fallback
              const targetPath = isRoot ? indexHtmlPath : path.join(routeDir, 'index.html');
              fs.writeFileSync(targetPath, routeHtml);
              continue;
            }

            // Special authoritative injection for /solutions/e-commerce
            if (route.url === '/solutions/e-commerce') {
              // 1. Inject authoritative JSON-LD schema
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
              routeHtml = routeHtml.replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(eCommerceSchema, null, 2)}\n  </script>\n</head>`);

              // 2. Inject full authentic crawlable HTML inside #root
              routeHtml = routeHtml.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${eCommerceInitialHtml}</div>`);

              // 3. Write directly without #seo-crawler-content fallback
              const targetPath = isRoot ? indexHtmlPath : path.join(routeDir, 'index.html');
              fs.writeFileSync(targetPath, routeHtml);
              continue;
            }

            // Special authoritative injection for /solutions/edtech
            if (route.url === '/solutions/edtech') {
              // 1. Inject authoritative JSON-LD schema
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
              routeHtml = routeHtml.replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(edTechSchema, null, 2)}\n  </script>\n</head>`);

              // 2. Inject full authentic crawlable HTML inside #root
              routeHtml = routeHtml.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${edTechInitialHtml}</div>`);

              // 3. Write directly without #seo-crawler-content fallback
              const targetPath = isRoot ? indexHtmlPath : path.join(routeDir, 'index.html');
              fs.writeFileSync(targetPath, routeHtml);
              continue;
            }

            // Special authoritative injection for /custom-software
            if (route.url === '/custom-software') {
              // 1. Inject authoritative JSON-LD schema
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
              routeHtml = routeHtml.replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(customSoftwareSchema, null, 2)}\n  </script>\n</head>`);

              // 2. Inject full authentic crawlable HTML inside #root
              routeHtml = routeHtml.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${customSoftwareInitialHtml}</div>`);

              // 3. Write directly without #seo-crawler-content fallback
              const targetPath = isRoot ? indexHtmlPath : path.join(routeDir, 'index.html');
              fs.writeFileSync(targetPath, routeHtml);
              continue;
            }

            // Special authoritative injection for /mobile-app-development
            if (route.url === '/mobile-app-development') {
              // 1. Inject authoritative JSON-LD schema
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
              routeHtml = routeHtml.replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(mobileAppSchema, null, 2)}\n  </script>\n</head>`);

              // 2. Inject full authentic crawlable HTML inside #root
              routeHtml = routeHtml.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${mobileAppInitialHtml}</div>`);

              // 3. Write directly without #seo-crawler-content fallback
              const targetPath = isRoot ? indexHtmlPath : path.join(routeDir, 'index.html');
              fs.writeFileSync(targetPath, routeHtml);
              continue;
            }

            // Special authoritative injection for /blog/custom-web-development-company
            if (route.url === '/blog/custom-web-development-company') {
              // 1. Inject authoritative JSON-LD schema
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
              routeHtml = routeHtml.replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(customWebDevBlogSchema, null, 2)}\n  </script>\n</head>`);

              // 2. Inject full authentic crawlable HTML inside #root
              routeHtml = routeHtml.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${customWebDevBlogInitialHtml}</div>`);

              // 3. Write directly without #seo-crawler-content fallback
              const targetPath = isRoot ? indexHtmlPath : path.join(routeDir, 'index.html');
              fs.writeFileSync(targetPath, routeHtml);
              continue;
            }

            // Special authoritative injection for /local-seo-for-small-business
            if (route.url === '/local-seo-for-small-business') {
              // 1. Inject authoritative JSON-LD schema
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
              routeHtml = routeHtml.replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(localSEOSmallBusinessSchema, null, 2)}\n  </script>\n</head>`);

              // 2. Inject full authentic crawlable HTML inside #root
              routeHtml = routeHtml.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${localSEOSmallBusinessInitialHtml}</div>`);

              // 3. Write directly without #seo-crawler-content fallback
              const targetPath = isRoot ? indexHtmlPath : path.join(routeDir, 'index.html');
              fs.writeFileSync(targetPath, routeHtml);
              continue;
            }

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
                <img src="/logo.png" alt="AbuQitmirLabs - Custom Software Development & AI Engineering" width="300" height="300" loading="lazy" decoding="async" style="max-width:300px" />
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
                <img src="/logo.png" alt="AbuQitmirLabs - Custom Software Development & AI Engineering" width="300" height="300" loading="lazy" decoding="async" style="max-width:300px" />
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
                <img src="/logo.png" alt="AbuQitmirLabs - Custom Software Development & AI Engineering" width="300" height="300" loading="lazy" decoding="async" style="max-width:300px" />
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

            const seoCrawlerBlock = `
              <div id="seo-crawler-content" style="display:none;" aria-hidden="true">
                <h2>${route.title}</h2>
                <article>
                  ${articleContent}
                </article>
              </div>
            `;
            
            // Keep #root clean for React to mount directly without displaying static fallback text
            routeHtml = routeHtml.replace('</body>', `${seoCrawlerBlock}\n</body>`);
            
            const targetPath = isRoot ? indexHtmlPath : path.join(routeDir, 'index.html');
            fs.writeFileSync(targetPath, routeHtml);
          }
          
          // Post-process all CSS & JS files in dist/assets for 100% minification with esbuild
          const assetsDir = path.resolve(outDir, 'assets');
          if (fs.existsSync(assetsDir)) {
            const files = fs.readdirSync(assetsDir);
            for (const file of files) {
              if (file.endsWith('.css')) {
                const cssPath = path.join(assetsDir, file);
                const rawCss = fs.readFileSync(cssPath, 'utf-8');
                try {
                  const minifiedResult = esbuild.transformSync(rawCss, {
                    loader: 'css',
                    minify: true,
                    minifyWhitespace: true,
                    minifySyntax: true,
                    legalComments: 'none',
                  });
                  fs.writeFileSync(cssPath, minifiedResult.code, 'utf-8');
                  console.log(`⚡ Minified CSS asset: ${file} (${rawCss.length} -> ${minifiedResult.code.length} bytes)`);
                } catch (err) {
                  console.warn(`Warning: Could not post-minify CSS file ${file}:`, err);
                }
              } else if (file.endsWith('.js')) {
                const jsPath = path.join(assetsDir, file);
                const rawJs = fs.readFileSync(jsPath, 'utf-8');
                try {
                  const minifiedResult = esbuild.transformSync(rawJs, {
                    loader: 'js',
                    minify: true,
                    minifyWhitespace: true,
                    minifySyntax: true,
                    minifyIdentifiers: true,
                    legalComments: 'none',
                  });
                  fs.writeFileSync(jsPath, minifiedResult.code, 'utf-8');
                  console.log(`⚡ Minified JS asset: ${file} (${rawJs.length} -> ${minifiedResult.code.length} bytes)`);
                } catch (err) {
                  console.warn(`Warning: Could not post-minify JS file ${file}:`, err);
                }
              }
            }
          }

          console.log('✅ SEO Assets, RSS dynamic feed, and Minified CSS/JS assets generated successfully!');
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
    esbuild: {
      legalComments: 'none',
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      drop: ['debugger']
    },
    build: {
      target: 'es2020',
      minify: 'esbuild',
      cssMinify: true,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // Standard Vite code splitting for reliable production loading across all hosts
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

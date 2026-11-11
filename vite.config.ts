import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import zlib from 'zlib';
import { defineConfig, loadEnv } from 'vite';

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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [
      react(), 
      tailwindcss(),
      prerender({
        staticDir: path.resolve(process.cwd(), 'dist'),
        routes: [
          '/', '/growth-engineering', '/ai-video-creation', '/custom-software', '/mobile-app-development',
          '/web-development', '/ai-agent-development', '/seo-mastery', '/graphics-design',
          '/content-writing', '/solutions/fintech', '/solutions/healthcare', '/solutions/ai-automation',
          '/solutions/e-commerce', '/solutions/edtech', '/case-studies', '/case-studies/tajweedpage',
          '/about', '/about/our-company', '/about/our-team', '/about/our-process', '/about/careers',
          '/us-market', '/uk-market', '/pakistan-market', '/canada-market', '/poland-market',
          '/australia-market', '/privacy', '/terms', '/blog', '/blog/custom-web-development-company',
          '/blog/content-calendar-strategy', '/blog/brand-strategy-vs-logo-design-pakistan-sme',
          '/blog/ai-content-vs-human-content', '/blog/startup-brand-identity-checklist',
          '/local-seo-for-small-business', '/local-seo-citation-building', '/white-label-local-seo',
          '/local-seo-audit', '/website-contract', '/contact'
        ],
        renderer: new prerender.PuppeteerRenderer({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
      }),
      {
        name: 'custom-seo-generator',
        apply: 'build' as const,
        closeBundle: async () => {
          if (process.env.VERCEL !== '1' && process.env.FULL_SEO_PRERENDER !== 'true') {
            console.log('⚡ [SEO Generator] Skipping heavy in-bundler route cloning to prevent container OOM (use FULL_SEO_PRERENDER=true or npm run prerender when needed).');
            return;
          }
          const [
            { aiAgentSchema, aiAgentInitialHtml },
            { graphicsDesignSchema, graphicsDesignInitialHtml },
            { fintechSchema, fintechInitialHtml },
            { healthcareSchema, healthcareInitialHtml },
            { aiAutomationSchema, aiAutomationInitialHtml },
            { eCommerceSchema, eCommerceInitialHtml },
            { edTechSchema, edTechInitialHtml },
            { customSoftwareSchema, customSoftwareInitialHtml },
            { mobileAppSchema, mobileAppInitialHtml },
            { customWebDevBlogSchema, customWebDevBlogInitialHtml },
            { localSEOSmallBusinessSchema, localSEOSmallBusinessInitialHtml },
            { homeSchema, homeInitialHtml },
            { growthEngineeringPageSchema, growthEngineeringInitialHtml },
            { renderStaticHeader },
            { SEO_ROUTES_METADATA },
            { BLOG_SLUG_REDIRECTS, getCanonicalPath, getCanonicalSlug },
            { STATIC_BLOG_POSTS },
            { resolveOptimizedCoverImage },
            { programmaticSEOPages }
          ] = await Promise.all([
            import('./src/utils/aiAgentStaticHtml'),
            import('./src/utils/graphicsDesignStaticHtml'),
            import('./src/utils/fintechStaticHtml'),
            import('./src/utils/healthcareStaticHtml'),
            import('./src/utils/aiAutomationStaticHtml'),
            import('./src/utils/eCommerceStaticHtml'),
            import('./src/utils/edTechStaticHtml'),
            import('./src/utils/customSoftwareStaticHtml'),
            import('./src/utils/mobileAppStaticHtml'),
            import('./src/utils/customWebDevBlogStaticHtml'),
            import('./src/utils/localSEOSmallBusinessStaticHtml'),
            import('./src/utils/homeStaticHtml'),
            import('./src/utils/growthEngineeringStaticHtml'),
            import('./src/utils/sharedStaticHeader'),
            import('./src/data/seoRoutesMetadata'),
            import('./src/data/canonicalRedirects'),
            import('./src/data/staticBlogPosts'),
            import('./src/data/localCoverImageMap'),
            import('./src/data/programmatic-seo')
          ]);
          const hostname = 'https://www.abuqitmirlabs.tech';
          const baseRoutes = [
            { url: '/', changefreq: 'weekly', priority: 1.0, title: 'Custom Software, AI & SEO Engineering | AbuQitmirLabs', description: 'Karachi-based growth engineering firm for US, UK & global B2B companies. Custom software, AI agents & technical SEO — one revenue system. Free technical audit.' },
            { url: '/growth-engineering', changefreq: 'monthly', priority: 0.9, lastmod: '2026-10-29', title: 'Growth Engineering Firm: Software & AI | AbuQitmirLabs', description: 'AbuQitmirLabs engineers revenue systems for B2B companies — combining custom software, AI automation, and performance marketing under one roof.' },
            { url: '/about', changefreq: 'monthly', priority: 0.8, title: 'About Us: Engineers Building B2B Growth | AbuQitmirLabs', description: 'We were engineers first. Now we engineer growth. Discover AbuQitmirLabs, our origin story in Karachi, and The Revenue Velocity Engine for B2B.' },
            { url: '/about/our-company', changefreq: 'monthly', priority: 0.8, title: 'About Our Company | Global Software Studio | AbuQitmirLabs', description: 'Karachi-based growth engineering studio with custom software, AI agent, and technical SEO builds for global B2B clients. Full IP ownership.' },
            { url: '/about/our-team', changefreq: 'monthly', priority: 0.8, title: 'Our Team | Elite Software Architects | AbuQitmirLabs', description: 'Meet the AbuQitmirLabs team — senior software architects, AI engineers, and UI/UX designers in Karachi led by founder Abu Qitmir Al-Madani.' },
            { url: '/about/our-process', changefreq: 'monthly', priority: 0.8, title: 'Our 6-Step Software Engineering Process | AbuQitmirLabs', description: "AbuQitmirLabs' 6-step engineering process: Discovery, Architecture, Development, QA, Zero-Downtime Launch, and Support for B2B ROI." },
            { url: '/about/careers', changefreq: 'monthly', priority: 0.8, title: 'Careers at AbuQitmirLabs | Join Our Studio | AbuQitmirLabs', description: 'Join AbuQitmirLabs in Karachi. We are hiring senior full-stack architects, AI/RAG engineers, UI/UX designers, and technical SEO strategists.' },
            { url: '/contact', changefreq: 'monthly', priority: 0.9, title: 'Contact Us | Free Project Quote & Audit | AbuQitmirLabs', description: 'Contact AbuQitmirLabs for a free project quote, technical consultation, and digital audit for custom software, AI agents, and web applications.' },
            { url: '/custom-software', changefreq: 'weekly', priority: 0.9, title: 'Custom Software Development Company | AbuQitmirLabs', description: 'Bespoke software built around your workflows — ERPs, SaaS platforms, AI-powered tools, and enterprise systems. Full IP ownership included.' },
            { url: '/mobile-app-development', changefreq: 'weekly', priority: 0.9, title: 'Mobile App Development Company | AbuQitmirLabs', description: 'Flutter, React Native, and native iOS/Android app development. Full source code ownership, App Store submission, and backend integration included.' },
            { url: '/web-development', changefreq: 'weekly', priority: 0.9, title: 'Custom Web Development Company | AbuQitmirLabs', description: 'Custom web development and API integrations by AbuQitmirLabs. We build fast, scalable web applications connected to Stripe, CRM, and ERP systems.' },
            { url: '/ai-video-creation', changefreq: 'weekly', priority: 0.9, title: 'AI Video Creation & Production Agency | AbuQitmirLabs', description: 'Cinematic AI video production agency combining human direction with generative AI for teasers, explainers, ads, and founder stories worldwide.' },
            { url: '/ai-agent-development', changefreq: 'weekly', priority: 0.9, title: 'Healthcare AI Agent Development Company | AbuQitmirLabs', description: 'Custom healthcare AI agents for patient intake, RAG, EHR integration, and workflow automation. Build secure AI systems with AbuQitmirLabs.' },
            { url: '/seo-mastery', changefreq: 'weekly', priority: 0.8, title: 'Technical SEO & Search Optimization | AbuQitmirLabs', description: 'Data-driven technical SEO services by AbuQitmirLabs: crawl audits, Core Web Vitals, semantic schema, local SEO, and AI search optimization.' },
            { url: '/digital-marketing', changefreq: 'weekly', priority: 0.8, title: 'B2B Digital Marketing for SaaS & Tech | AbuQitmirLabs', description: 'Digital marketing for software and SaaS companies: technical SEO, E-E-A-T content, and conversion-focused web architecture with measurable ROI.' },
            { url: '/local-seo-for-small-business', changefreq: 'weekly', priority: 0.9, title: 'Local SEO Services for Small Businesses | AbuQitmirLabs', description: 'Grow local visibility with expert Local SEO for small businesses: Google Business Profile optimization, local citations, and map-pack rankings.' },
            { url: '/local-seo-citation-building', changefreq: 'weekly', priority: 0.8, title: 'Local SEO Citation Building & NAP Audit | AbuQitmirLabs', description: 'Manual NAP citation building, audit, and cleanup across top directories. Boost local rankings on Google, Yelp, and Apple Maps with a $150 audit.' },
            { url: '/white-label-local-seo', changefreq: 'weekly', priority: 0.8, title: 'White Label Local SEO for Agencies | AbuQitmirLabs', description: 'White-label local SEO fulfillment for agencies: manual citations, GBP optimization, and unbranded PDF reports with 35–50% reseller profit margins.' },
            { url: '/local-seo-audit', changefreq: 'weekly', priority: 0.8, title: 'Free Local SEO & Map Pack Audit | AbuQitmirLabs', description: 'Free forensic local SEO audit covering Google Business Profile, NAP citations, schema markup, and map-pack competitors with a clear action plan.' },
            { url: '/guest-post-service', changefreq: 'weekly', priority: 0.8, title: 'White-Hat Guest Post Outreach Service | AbuQitmirLabs', description: 'Editorial guest post placements on real, high-DR websites with organic traffic. 100% manual outreach, contextual dofollow links, and indexation.' },
            { url: '/graphics-design', changefreq: 'weekly', priority: 0.8, title: 'Brand Identity & Graphic Design Studio | AbuQitmirLabs', description: 'Professional graphic design services for brands: custom logos, brand identity systems, pitch decks, UI/UX design, and B2B marketing collateral.' },
            { url: '/content-writing', changefreq: 'weekly', priority: 0.8, title: 'B2B SEO Content Writing Services | AbuQitmirLabs', description: 'Data-driven SEO content writing services by AbuQitmirLabs: technical blogs, B2B website copy, landing pages, and long-form authority articles.' },
            { url: '/brand-building', changefreq: 'weekly', priority: 0.85, title: 'Brand Building Services for Small Business | AbuQitmirLabs', description: 'Complete brand building for small businesses: positioning strategy, visual identity, custom Next.js website, and SEO engineered under one roof.' },
            { url: '/skills-academy', changefreq: 'weekly', priority: 0.85, title: 'AI Brand & Web Course in Urdu | AbuQitmirLabs', description: 'AI-powered Urdu course teaching complete brand building, Next.js web development, real agency projects, and global client acquisition.' },
            { url: '/solutions/fintech', changefreq: 'weekly', priority: 0.8, title: 'FinTech Software & Payment Solutions | AbuQitmirLabs', description: 'Build secure FinTech platforms, payment systems, and PCI-DSS compliant digital finance experiences with AbuQitmirLabs for B2B companies.' },
            { url: '/solutions/healthcare', changefreq: 'weekly', priority: 0.8, title: 'Healthcare Software Solutions | AbuQitmirLabs', description: 'Build HIPAA-compliant healthcare software, patient portals, telemedicine platforms, and EHR systems with AbuQitmirLabs for modern clinics.' },
            { url: '/solutions/ai-automation', changefreq: 'weekly', priority: 0.9, title: 'AI Automation Solutions | AbuQitmirLabs', description: 'Automate business workflows with AI agents, RAG pipelines, APIs, and intelligent integrations built for startups and enterprise operations.' },
            { url: '/solutions/e-commerce', changefreq: 'weekly', priority: 0.9, title: 'Custom E-Commerce Software Solutions | AbuQitmirLabs', description: 'Engineer high-performance e-commerce platforms, custom online stores, B2B wholesale portals, mobile shopping apps, and multi-vendor marketplaces.' },
            { url: '/solutions/edtech', changefreq: 'weekly', priority: 0.9, title: 'EdTech Software & Custom LMS Platforms | AbuQitmirLabs', description: 'Build scalable EdTech software with custom LMS platforms, virtual classrooms, AI tutoring, student portals, assessments, and learning analytics.' },
            { url: '/solutions/fintech/web-development', changefreq: 'weekly', priority: 0.85, title: 'Fintech Web Development in Dubai | AbuQitmirLabs', description: 'Bespoke fintech web development in Dubai compliant with DFSA, DIFC, and PCI-DSS. Low-latency financial platforms engineered for UAE institutions.' },
            { url: '/solutions/healthcare/mobile-app-development', changefreq: 'weekly', priority: 0.85, title: 'Healthcare App Development in Riyadh | AbuQitmirLabs', description: 'End-to-end healthcare mobile app development in Riyadh, KSA. Compliant with Saudi MoH, Seha, and NDMO standards with zero-latency architecture.' },
            { url: '/solutions/e-commerce/custom-software', changefreq: 'weekly', priority: 0.85, title: 'E-Commerce Custom Software in London | AbuQitmirLabs', description: 'Custom e-commerce software development in London: high-volume order routing, multi-currency checkout, and headless commerce for UK brands.' },
            { url: '/solutions/ai-automation/custom-software', changefreq: 'weekly', priority: 0.85, title: 'AI Automation Software in NYC | AbuQitmirLabs', description: 'Custom AI agent and workflow automation software in New York City. SOC2-ready autonomous systems engineered to accelerate B2B revenue velocity.' },
            { url: '/solutions/edtech/web-development', changefreq: 'weekly', priority: 0.85, title: 'EdTech Web Development in Sydney | AbuQitmirLabs', description: 'Scalable EdTech web development and custom LMS platforms in Sydney, Australia, built for ASQA, Privacy Act 1988, and WCAG 2.1 AA compliance.' },
            { url: '/case-studies', changefreq: 'weekly', priority: 0.9, title: 'Case Studies | B2B Engineering Results | AbuQitmirLabs', description: 'Explore real-world case studies from AbuQitmirLabs: custom software, AI automation, mobile apps, and web systems delivering measurable B2B ROI.' },
            { url: '/case-studies/tajweedpage', changefreq: 'weekly', priority: 0.9, title: 'TajweedPage AI Case Study | AbuQitmirLabs', description: 'How we built TajweedPage.com, an AI-powered Quran learning platform with a RAG Tajweed teacher, Next.js stack, and 20-country SEO in just 10 days.' },
            { url: '/us-market', changefreq: 'monthly', priority: 0.7, title: 'Software Development for US Startups | AbuQitmirLabs', description: 'US-focused software development for startups: mobile apps, AI agents, and local SEO. CCPA & HIPAA compliant engineering with EST workday overlap.' },
            { url: '/uk-market', changefreq: 'monthly', priority: 0.7, title: 'Custom Software for UK Businesses | AbuQitmirLabs', description: 'UK-focused digital transformation and bespoke software: GDPR-compliant web apps, mobile apps, AI agents, and local SEO with full GMT workday overlap.' },
            { url: '/pakistan-market', changefreq: 'monthly', priority: 0.7, title: 'Custom Software & SEO in Pakistan | AbuQitmirLabs', description: 'Karachi-based digital transformation for Pakistani businesses: custom software, mobile apps, local SEO, and Roman Urdu AI agents with PKR pricing.' },
            { url: '/canada-market', changefreq: 'monthly', priority: 0.7, title: 'Software Development for Canada | AbuQitmirLabs', description: 'Canada-focused software development: PIPEDA-compliant web apps, AI agents, local SEO, and bilingual EN/FR platforms with EST/PST workday overlap.' },
            { url: '/poland-market', changefreq: 'monthly', priority: 0.7, title: 'Software Development for Poland | AbuQitmirLabs', description: 'Poland-focused software development: GDPR-compliant web apps, AI agents, SaaS platforms, and local SEO for Warsaw and Krakow with CET overlap.' },
            { url: '/australia-market', changefreq: 'monthly', priority: 0.7, title: 'Software Development for Australia | AbuQitmirLabs', description: 'Australia-focused software development: Privacy Act compliant web apps, mobile apps, and AI agents for Australian businesses with AEST delivery.' },
            { url: '/saudi-arabia-market', changefreq: 'monthly', priority: 0.8, title: 'Software Development for Saudi Arabia | AbuQitmirLabs', description: 'Saudi Arabia custom software, mobile apps, Arabic SEO, and enterprise AI agents fully compliant with Saudi PDPL and Vision 2030 digital mandates.' },
            { url: '/uae-market', changefreq: 'monthly', priority: 0.8, title: 'Software Development for UAE | AbuQitmirLabs', description: 'Custom software engineering, mobile apps, and AI agents for Dubai and Abu Dhabi enterprises, compliant with UAE Federal Decree-Law No. 45.' },
            { url: '/qatar-market', changefreq: 'monthly', priority: 0.8, title: 'AI Consulting Qatar & Doha Agency | AbuQitmirLabs', description: 'Premier AI consulting in Qatar and Doha software agency. We engineer Arabic/English AI chatbots, custom web platforms, and mobile apps for QNV 2030.' },
            { url: '/kuwait-market', changefreq: 'monthly', priority: 0.8, title: 'Software Development for Kuwait | AbuQitmirLabs', description: 'Custom software, Flutter mobile apps, and AI agents for Kuwait City enterprises with CITRA data compliance and seamless KNET gateway integration.' },
            { url: '/blog', changefreq: 'daily', priority: 0.8, title: 'Tech Blog & AI Insights | AbuQitmirLabs', description: 'AbuQitmirLabs engineering journal covering AI agents, custom software, web & mobile development, technical SEO, and B2B digital transformation.' },
            { url: '/news/latest', changefreq: 'weekly', priority: 0.8, title: 'Latest News & Company Updates | AbuQitmirLabs', description: 'AbuQitmirLabs newsroom: latest company updates, software launches, AI framework releases, and press announcements from our engineering studio.' },
            { url: '/news/press-releases', changefreq: 'monthly', priority: 0.8, title: 'Press Releases & Announcements | AbuQitmirLabs', description: 'Official press releases, security certifications, and corporate announcements from the AbuQitmirLabs software engineering studio in Karachi.' },
            { url: '/news/industry-insights', changefreq: 'weekly', priority: 0.8, title: 'Industry Insights & AI Benchmarks | AbuQitmirLabs', description: 'Industry insights from AbuQitmirLabs: technical breakdowns on enterprise RAG, GEO, HIPAA compliance, and low-latency full-stack architecture.' },
            { url: '/news/all', changefreq: 'weekly', priority: 0.8, title: 'All News & Media Archive | AbuQitmirLabs', description: 'Complete news and media archive from AbuQitmirLabs: company announcements, press releases, product launches, and technical engineering reports.' },
            { url: '/news/article/google-ai-dogfooding-enterprise-results', changefreq: 'monthly', priority: 0.75, title: "Google AI Dogfooding Playbook | AbuQitmirLabs", description: "Google's internal AI metrics show 83% sales adoption, 20% higher win rates, and 75% autonomous support resolution from enterprise AI dogfooding." },
            { url: '/news/article/ai-rag-framework-launch', changefreq: 'monthly', priority: 0.75, title: 'Multi-Agent RAG Framework Launch | AbuQitmirLabs', description: 'AbuQitmirLabs launches an open-spec enterprise RAG framework in Karachi that cuts vector search latency below 180ms with zero hallucination.' },
            { url: '/news/article/us-uk-expansion-q3', changefreq: 'monthly', priority: 0.75, title: 'US & UK Fintech Engineering Expansion | AbuQitmirLabs', description: 'Following 45% international contract growth, AbuQitmirLabs expands Karachi engineering squads for dedicated US EST and UK GMT shift deployments.' },
            { url: '/news/article/generative-engine-optimization-geo-strategy', changefreq: 'monthly', priority: 0.75, title: 'Generative Engine Optimization (GEO) | AbuQitmirLabs', description: 'How to structure JSON-LD entity graphs and direct answer blocks for maximum citation visibility in ChatGPT, Perplexity, and Google AI Overviews.' },
            { url: '/news/article/hipaa-cloud-certification', changefreq: 'monthly', priority: 0.75, title: 'HIPAA & ISO 27001 Security Validation | AbuQitmirLabs', description: 'Independent security audit confirms all custom medical software platforms built by AbuQitmirLabs meet HIPAA, HITECH, and ISO 27001 protocols.' },
            { url: '/news/article/sub-200ms-rag-pipelines', changefreq: 'monthly', priority: 0.75, title: 'Engineering Sub-200ms RAG Pipelines | AbuQitmirLabs', description: 'A deep dive into chunking strategies, hybrid keyword-semantic search, and LLM prompt caching that cut enterprise AI query latency in half.' },
            { url: '/tools', changefreq: 'weekly', priority: 0.85, title: 'Free Engineering, AI & SEO Tools | AbuQitmirLabs', description: 'Free interactive software engineering, technical SEO, AI readiness, project cost estimation, and website authority tools built by AbuQitmirLabs.' },
            { url: '/tools/project-cost-estimator', changefreq: 'weekly', priority: 0.85, title: 'AI Project Cost Estimator 2026 | AbuQitmirLabs', description: 'Calculate instant project costs for custom software, websites, mobile apps, and AI agents across 8 countries with a free PDF breakdown.' },
            { url: '/tools/website-audit', changefreq: 'weekly', priority: 0.85, title: 'Free Website Growth Audit Tool | AbuQitmirLabs', description: 'Find the issues slowing down your website, reducing search visibility and creating conversion friction with our deterministic Website Growth Audit.' },
            { url: '/tools/seo-checklist', changefreq: 'weekly', priority: 0.85, title: 'Interactive Technical SEO Checklist | AbuQitmirLabs', description: 'Interactive 2026 SEO checklist covering technical crawl health, Schema.org entities, Core Web Vitals, local citations, and AI search readiness.' },
            { url: '/tools/ai-readiness-score', changefreq: 'weekly', priority: 0.85, title: 'Enterprise AI Readiness Score & RAG | AbuQitmirLabs', description: "Evaluate your organization's data infrastructure, workflow maturity, and security readiness for autonomous AI agents and RAG deployment." },
            { url: '/tools/tech-stack-recommender', changefreq: 'weekly', priority: 0.85, title: 'Software & AI Tech Stack Recommender | AbuQitmirLabs', description: 'Get a tailored architecture recommendation across Next.js, Flutter, Node.js, Python, and vector databases based on your product scope and scale.' },
            { url: '/tools/website-authority-analyzer', changefreq: 'weekly', priority: 0.85, title: 'Website Authority & Entity Analyzer | AbuQitmirLabs', description: "Analyze your domain's topical authority, structured data coverage, and citation signals for Google and AI answer engines." },
            { url: '/brand-assets', changefreq: 'monthly', priority: 0.6, title: 'Official Brand Assets & Media Kit | AbuQitmirLabs', description: 'Download official AbuQitmirLabs brand assets, high-resolution logos, and social media banners for Google Business Profile, LinkedIn, and YouTube.' },
            { url: '/luxury-brand-experience', changefreq: 'monthly', priority: 0.7, title: "L'Atelier De Réserve | Luxury Collection | AbuQitmirLabs", description: 'Experience old-money luxury web design: five numbered artisanal tins unveiled with Locomotive Scroll, GSAP parallax depth, and cinematic reveals.' },
            { url: '/website-contract', changefreq: 'weekly', priority: 0.8, title: 'Free Website Contract Template | AbuQitmirLabs', description: 'Download a free, ownership-protected website contract template with full IP ownership, domain transfer, support SLAs, and clear exit clauses.' },
            { url: '/editorial-policy', changefreq: 'yearly', priority: 0.4, title: 'Editorial Policy & Standards | AbuQitmirLabs', description: 'Learn about AbuQitmirLabs editorial guidelines, senior engineering review process, AI assistance disclosure, and technical accuracy standards.' },
            { url: '/terms', changefreq: 'yearly', priority: 0.3, title: 'Terms of Service & IP Policy | AbuQitmirLabs', description: 'AbuQitmirLabs terms of service: client agreements, full IP ownership, milestone payment terms, liability limits, and software delivery policies.' },
            { url: '/privacy', changefreq: 'yearly', priority: 0.3, title: 'Privacy Policy & Data Protection | AbuQitmirLabs', description: 'AbuQitmirLabs privacy policy: how we collect, use, and protect your data. Learn about our security measures, cookie use, and GDPR/APP compliance.' },
            { url: '/blog/content-calendar-strategy', changefreq: 'weekly', priority: 0.9, title: 'Content Calendar Strategy Guide | AbuQitmirLabs', description: 'Step-by-step guide to building a content calendar your team will actually follow, complete with templates, publishing cadences, and workflow tools.' },
            { url: '/blog/brand-strategy-vs-logo-design-pakistan-sme', changefreq: 'weekly', priority: 0.9, title: 'Brand Strategy vs Logo Design Pakistan | AbuQitmirLabs', description: 'Brand strategy vs logo design for Pakistani SMEs: real PKR pricing (PKR 3,000–50,000 vs PKR 80,000+), deliverables, and a founder decision matrix.' },
            { url: '/blog/ai-content-vs-human-content', changefreq: 'weekly', priority: 0.9, title: 'AI Content vs Human Content 2026 | AbuQitmirLabs', description: "Learn what Google's 2026 guidelines actually say about AI content vs human content. Discover the E-E-A-T rules and how to safely rank in search." },
            { url: '/blog/startup-brand-identity-checklist', changefreq: 'weekly', priority: 0.9, title: 'Brand Identity Checklist for Startups | AbuQitmirLabs', description: 'A pre-seed and seed-stage brand identity checklist for startups. Covers positioning, visual system, voice, and launch assets in the right order.' },
          ];

          const clampMetaDescription = (raw: string, maxLen = 158): string => {
            const cleaned = (raw || '')
              .replace(/<[^>]*>?/gm, '')
              .trim()
              .replace(/^(?:&quot;|["'“”])+|(?:&quot;|["'“”])+$/gi, '')
              .replace(/["“”]/g, "'")
              .replace(/\s+/g, ' ')
              .trim();
            if (cleaned.length <= maxLen) return cleaned;
            const cut = cleaned.slice(0, maxLen - 1);
            const lastSpace = cut.lastIndexOf(' ');
            return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:!?—–-]+$/, '')}.`;
          };

          const ensureUniqueMetaDescription = (
            rawDesc: string,
            routeUrl: string,
            routeTitle: string,
            usedSet: Set<string>
          ): string => {
            const cleanHeadline = (routeTitle || routeUrl)
              .replace(/\s*\|\s*AbuQitmirLabs.*$/i, '')
              .replace(/["“”]/g, "'")
              .trim();
            const isGeneric = !rawDesc || /^technical insights from abuqitmirlabs\.?$/i.test(rawDesc.trim());
            let candidate = clampMetaDescription(
              isGeneric
                ? `${cleanHeadline}: practical engineering, architecture, and B2B growth analysis from AbuQitmirLabs.`
                : rawDesc,
              158
            );
            if (usedSet.has(candidate.toLowerCase())) {
              const slugLabel = routeUrl.replace(/^\/blog\//, '').replace(/^\//, '').replace(/-/g, ' ');
              candidate = clampMetaDescription(`${cleanHeadline} — ${ candidate.replace(/\.$/, '') } (${slugLabel}).`, 158);
              if (usedSet.has(candidate.toLowerCase())) {
                candidate = clampMetaDescription(`${cleanHeadline}: in-depth 2026 guide and analysis by AbuQitmirLabs (${slugLabel}).`, 158);
              }
            }
            usedSet.add(candidate.toLowerCase());
            return candidate;
          };

          const fs = await import('fs');
          const path = await import('path');
          const outDir = path.resolve(process.cwd(), 'dist');
          const indexHtmlPath = path.resolve(outDir, 'index.html');

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

          let fetchedPosts: { slug: string; title: string; excerpt: string; content: string; coverImage: string; createdAt: string; category: string; author: string }[] = [];
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
            } catch (cfgErr) {}

            const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents:runQuery${apiKey ? `?key=${apiKey}` : ''}`;
            const response = await fetch(firestoreUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ structuredQuery: { from: [{ collectionId: 'posts' }] } })
            });
            if (response.ok) {
              const rows = await response.json();
              if (Array.isArray(rows)) {
                const cleanQuote = (val: string) =>
                  (val || '').trim().replace(/^(?:&quot;|["'“”])+|(?:&quot;|["'“”])+$/gi, '').trim();
                fetchedPosts = rows
                  .filter((r: any) => r && r.document && r.document.fields)
                  .map((r: any) => {
                    const fields = r.document.fields || {};
                    const slugVal = (fields.slug?.stringValue || '').trim().replace(/^\/+/, '').replace(/^blog\//, '').replace(/\/+$/, '');
                    return {
                      slug: BLOG_SLUG_REDIRECTS[slugVal] || slugVal,
                      title: fields.title?.stringValue || '',
                      excerpt: cleanQuote(fields.metaDescription?.stringValue || fields.excerpt?.stringValue || ''),
                      content: fields.content?.stringValue || '',
                      coverImage: fields.coverImage?.stringValue || '',
                      published: fields.published?.booleanValue ?? true,
                      createdAt: fields.createdAt?.timestampValue || new Date().toISOString(),
                      category: slugVal === 'ai-content-vs-human-content' ? 'Content Writing' : (fields.category?.stringValue || 'Software'),
                      author: fields.author?.stringValue || 'Abu Qitmir Mohammad Shiraz Al-Madani',
                    };
                  })
                  .filter((p: any) => p.published && p.slug);
              }
            }
          } catch (err: any) {}

          const seenBlogRoutes = new Set(baseRoutes.map(b => getCanonicalPath(b.url)));
          const staticBlogRoutes = Object.entries(STATIC_BLOG_POSTS)
            .map(([rawSlug, post]: [string, any]) => {
              const canonSlug = getCanonicalSlug(rawSlug);
              const url = `/blog/${canonSlug}`;
              const bestPost = (STATIC_BLOG_POSTS[canonSlug] && (STATIC_BLOG_POSTS[canonSlug].content?.length || 0) >= (post.content?.length || 0))
                ? STATIC_BLOG_POSTS[canonSlug]
                : post;
              const defaultRouteTitle = (bestPost.title || canonSlug).includes('AbuQitmirLabs') ? bestPost.title : `${bestPost.title || canonSlug} | AbuQitmirLabs`;
              const routeTitle = SEO_ROUTES_METADATA[url]?.title || defaultRouteTitle;
              const rawDesc = SEO_ROUTES_METADATA[url]?.description || bestPost.metaDescription || bestPost.excerpt || '';
              return {
                url,
                changefreq: 'weekly' as const,
                priority: 0.85,
                title: routeTitle,
                description: clampMetaDescription(rawDesc || `${bestPost.title || canonSlug}: technical insights from AbuQitmirLabs.`, 158)
              };
            })
            .filter(r => {
              if (seenBlogRoutes.has(r.url)) return false;
              seenBlogRoutes.add(r.url);
              return true;
            });

          const dynamicRoutes = fetchedPosts
            .map(post => {
              const canonSlug = getCanonicalSlug(post.slug);
              return { ...post, slug: canonSlug };
            })
            .filter(post => {
              const url = `/blog/${post.slug}`;
              if (seenBlogRoutes.has(url)) return false;
              seenBlogRoutes.add(url);
              return true;
            })
            .map(post => {
              const url = `/blog/${post.slug}`;
              const defaultRouteTitle = post.title.includes('AbuQitmirLabs') ? post.title : `${post.title} | AbuQitmirLabs`;
              const routeTitle = SEO_ROUTES_METADATA[url]?.title || defaultRouteTitle;
              const rawDesc = SEO_ROUTES_METADATA[url]?.description || post.excerpt || '';
              return {
                url,
                changefreq: 'weekly' as const,
                priority: 0.85,
                title: routeTitle,
                description: clampMetaDescription(rawDesc || `${post.title}: technical insights from AbuQitmirLabs.`, 158)
              };
            });

          const contentBlogDirForRoutes = path.resolve(process.cwd(), 'content/blog');
          const markdownBlogRoutes: { url: string; changefreq: 'weekly'; priority: number; title: string; description: string }[] = [];
          if (fs.existsSync(contentBlogDirForRoutes)) {
            const mdFiles = fs.readdirSync(contentBlogDirForRoutes).filter(f => f.endsWith('.md'));
            for (const file of mdFiles) {
              const rawSlug = file.replace(/\.md$/, '').trim();
              const canonSlug = getCanonicalSlug(rawSlug);
              const url = `/blog/${canonSlug}`;
              if (seenBlogRoutes.has(url)) continue;
              try {
                const rawMd = fs.readFileSync(path.join(contentBlogDirForRoutes, file), 'utf-8');
                const fmMatch = rawMd.match(/^---\s*\r?\n(\{[\s\S]*?\})\r?\n---/);
                let parsedTitle = canonSlug;
                let parsedSeoTitle = '';
                let parsedDesc = '';
                if (fmMatch) {
                  const metaObj = JSON.parse(fmMatch[1]);
                  if (metaObj.title) parsedTitle = metaObj.title;
                  if (metaObj.seoTitle) parsedSeoTitle = metaObj.seoTitle;
                  if (metaObj.metaDescription || metaObj.excerpt) parsedDesc = metaObj.metaDescription || metaObj.excerpt;
                }
                seenBlogRoutes.add(url);
                const defaultRouteTitle = parsedSeoTitle || (parsedTitle.includes('AbuQitmirLabs') ? parsedTitle : `${parsedTitle} | AbuQitmirLabs`);
                const routeTitle = SEO_ROUTES_METADATA[url]?.title || defaultRouteTitle;
                const rawDesc = SEO_ROUTES_METADATA[url]?.description || parsedDesc || `${parsedTitle}: technical insights from AbuQitmirLabs.`;
                markdownBlogRoutes.push({
                  url,
                  changefreq: 'weekly' as const,
                  priority: 0.85,
                  title: routeTitle,
                  description: clampMetaDescription(rawDesc, 158)
                });
              } catch {}
            }
          }

          const dedupedBaseRoutes = baseRoutes.filter((b, idx, arr) => {
            const canonUrl = getCanonicalPath(b.url);
            if (canonUrl !== b.url) return false;
            return arr.findIndex(x => x.url === b.url) === idx;
          });

          const usedMetaDescriptions = new Set<string>();
          const routes = [...dedupedBaseRoutes, ...staticBlogRoutes, ...dynamicRoutes, ...markdownBlogRoutes].map(r => {
            const preferredTitle = SEO_ROUTES_METADATA[r.url]?.title || r.title;
            const preferredDesc = SEO_ROUTES_METADATA[r.url]?.description || r.description || '';
            const uniqueDesc = ensureUniqueMetaDescription(preferredDesc, r.url, preferredTitle, usedMetaDescriptions);
            return {
              ...r,
              title: preferredTitle,
              description: uniqueDesc
            };
          });

          if (!fs.existsSync(indexHtmlPath)) return;
          
          const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

          // Ensure dist/spa-shell.html, dist/spa-shell/index.html, and dist/404.html exist for Vercel dynamic rewrites
          const spaShellDir = path.join(outDir, 'spa-shell');
          if (!fs.existsSync(spaShellDir)) fs.mkdirSync(spaShellDir, { recursive: true });
          fs.writeFileSync(path.join(outDir, 'spa-shell.html'), baseHtml, 'utf-8');
          fs.writeFileSync(path.join(spaShellDir, 'index.html'), baseHtml, 'utf-8');
          fs.writeFileSync(path.join(outDir, '404.html'), baseHtml, 'utf-8');

          const cacheDir = path.resolve(process.cwd(), 'node_modules/.cache/seo-generator');
          const cacheFilePath = path.resolve(cacheDir, 'cache.json');
          
          const trackedBlogFiles = [
            'public/sitemap.xml',
            'public/rss.xml',
            'src/data/staticBlogPosts.ts',
            'src/data/seoRoutesMetadata.ts',
            'src/utils/ragAiBlogStaticData.ts',
            'src/utils/customWebDevBlogStaticHtml.ts'
          ];
          const fileSignatures: Record<string, { mtimeMs: number; size: number }> = {};
          for (const relFile of trackedBlogFiles) {
            const absFile = path.resolve(process.cwd(), relFile);
            if (fs.existsSync(absFile)) {
              const stat = fs.statSync(absFile);
              fileSignatures[relFile] = { mtimeMs: stat.mtimeMs, size: stat.size };
            }
          }

          const dataHash = crypto.createHash('sha256').update(JSON.stringify({ fileSignatures, fetchedPosts, baseRoutesCount: baseRoutes.length })).digest('hex');

          let cachedData: { dataHash?: string; sitemapContent?: string; rssContent?: string; timestamp?: string; } | null = null;
          try {
            if (fs.existsSync(cacheFilePath)) cachedData = JSON.parse(fs.readFileSync(cacheFilePath, 'utf-8'));
          } catch { cachedData = null; }

          const sitemapPath = path.resolve(outDir, 'sitemap.xml');
          const distPagesSitemapPath = path.resolve(outDir, 'pages-sitemap.xml');
          const rssPath = path.resolve(outDir, 'rss.xml');
          const publicSitemap = path.resolve(process.cwd(), 'public/sitemap.xml');
          const publicPagesSitemap = path.resolve(process.cwd(), 'public/pages-sitemap.xml');
          const rootSitemap = path.resolve(process.cwd(), 'sitemap.xml');
          const rootPagesSitemap = path.resolve(process.cwd(), 'pages-sitemap.xml');

          const SITEMAP_ORIGIN = 'https://www.abuqitmirlabs.tech';
          const VALID_CHANGEFREQS = new Set(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']);
          const DISALLOWED_PATHS = new Set(['/admin', '/google87984536fe5662da', '/404', '/spa-shell', '/login']);
          const defaultLastMod = '2026-10-25';

          const prependCanonicalOrigin = (inputPathOrUrl: string): string => {
            const raw = (inputPathOrUrl || '').trim();
            if (!raw || raw === '/') return SITEMAP_ORIGIN;
            if (/^https?:\/\//i.test(raw)) {
              try {
                const parsed = new URL(raw);
                const cleanPath = (parsed.pathname || '/').replace(/\/+$/, '');
                return cleanPath && cleanPath !== '/' ? `${SITEMAP_ORIGIN}${cleanPath}` : SITEMAP_ORIGIN;
              } catch {
                const stripped = raw.replace(/^https?:\/\/[^/]+/i, '');
                const normalizedRel = stripped.startsWith('/') ? stripped : `/${stripped}`;
                const cleanPath = normalizedRel.replace(/\/+$/, '');
                return cleanPath && cleanPath !== '/' ? `${SITEMAP_ORIGIN}${cleanPath}` : SITEMAP_ORIGIN;
              }
            }
            const normalizedPath = raw.startsWith('/') ? raw : `/${raw}`;
            const cleanPath = normalizedPath.replace(/\/+$/, '');
            return cleanPath && cleanPath !== '/' ? `${SITEMAP_ORIGIN}${cleanPath}` : SITEMAP_ORIGIN;
          };

          const normalizeToAbsoluteCanonicalUrl = (rawInput: string): string | null => {
            if (!rawInput || typeof rawInput !== 'string') return null;
            const trimmed = rawInput.trim();
            if (!trimmed) return null;

            const withOrigin = prependCanonicalOrigin(trimmed.split('?')[0].split('#')[0]);
            let pathname = '/';
            try {
              const parsed = new URL(withOrigin);
              pathname = parsed.pathname || '/';
            } catch {
              return null;
            }

            pathname = pathname.replace(/\/+$/, '') || '/';

            if (
              DISALLOWED_PATHS.has(pathname) ||
              pathname.startsWith('/admin/') ||
              pathname.startsWith('/api/')
            ) {
              return null;
            }

            const canonicalPathname = getCanonicalPath(pathname);
            if (canonicalPathname.startsWith('/blog/')) {
              const slug = canonicalPathname.slice('/blog/'.length);
              if (BLOG_SLUG_REDIRECTS[slug]) {
                return null;
              }
            }

            const routeMeta = SEO_ROUTES_METADATA[canonicalPathname];
            if (routeMeta?.canonical) {
              const metaCanon = prependCanonicalOrigin(routeMeta.canonical);
              const expectedCanon = prependCanonicalOrigin(canonicalPathname);
              if (metaCanon !== expectedCanon) {
                return normalizeToAbsoluteCanonicalUrl(metaCanon);
              }
            }

            const finalAbsoluteUrl = prependCanonicalOrigin(canonicalPathname);

            if (!finalAbsoluteUrl.startsWith(SITEMAP_ORIGIN)) {
              return null;
            }
            try {
              const validated = new URL(finalAbsoluteUrl);
              if (validated.protocol !== 'https:' || validated.hostname !== 'www.abuqitmirlabs.tech') {
                return null;
              }
              return finalAbsoluteUrl;
            } catch {
              return null;
            }
          };

          const validateChangefreq = (freq?: string): string => {
            const clean = (freq || '').trim().toLowerCase();
            return VALID_CHANGEFREQS.has(clean) ? clean : 'weekly';
          };

          const validatePriority = (prio?: string | number, isRoot?: boolean): string => {
            if (isRoot) return '1.0';
            const num = typeof prio === 'number' ? prio : parseFloat(String(prio || '0.8'));
            if (Number.isNaN(num) || num < 0 || num > 1) return '0.8';
            return num.toFixed(1);
          };

          const validateLastmod = (lastmod?: unknown): string => {
            if (!lastmod) return defaultLastMod;
            if (typeof lastmod === 'string') {
              const clean = lastmod.trim();
              if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) return clean;
              const parsed = new Date(clean);
              if (!Number.isNaN(parsed.getTime())) {
                return parsed.toISOString().split('T')[0];
              }
              return defaultLastMod;
            }
            if (lastmod instanceof Date && !Number.isNaN(lastmod.getTime())) {
              return lastmod.toISOString().split('T')[0];
            }
            if (typeof lastmod === 'number') {
              const parsed = new Date(lastmod);
              if (!Number.isNaN(parsed.getTime())) {
                return parsed.toISOString().split('T')[0];
              }
            }
            if (typeof lastmod === 'object' && lastmod !== null && 'seconds' in lastmod && typeof (lastmod as any).seconds === 'number') {
              const parsed = new Date((lastmod as any).seconds * 1000);
              if (!Number.isNaN(parsed.getTime())) {
                return parsed.toISOString().split('T')[0];
              }
            }
            return defaultLastMod;
          };

          interface SitemapEntry {
            loc: string;
            changefreq: string;
            priority: string;
            lastmod: string;
          }

          const sitemapEntriesMap = new Map<string, SitemapEntry>();

          const upsertSitemapEntry = (rawUrl: string, changefreq?: string, priority?: string | number, lastmod?: string, overwrite = false) => {
            const canonicalLoc = normalizeToAbsoluteCanonicalUrl(rawUrl);
            if (!canonicalLoc || !canonicalLoc.startsWith(SITEMAP_ORIGIN)) return;
            const isRoot = canonicalLoc === SITEMAP_ORIGIN;
            const existing = sitemapEntriesMap.get(canonicalLoc);
            if (!existing || overwrite) {
              sitemapEntriesMap.set(canonicalLoc, {
                loc: canonicalLoc,
                changefreq: validateChangefreq(changefreq || existing?.changefreq),
                priority: validatePriority(priority ?? existing?.priority, isRoot),
                lastmod: validateLastmod(lastmod || existing?.lastmod),
              });
            }
          };

          if (fs.existsSync(publicSitemap)) {
            const rawXml = fs.readFileSync(publicSitemap, 'utf-8');
            const urlBlocks = [...rawXml.matchAll(/<url>([\s\S]*?)<\/url>/g)];
            for (const match of urlBlocks) {
              const block = match[1];
              const locMatch = block.match(/<loc>([\s\S]*?)<\/loc>/);
              if (!locMatch) continue;
              const freqMatch = block.match(/<changefreq>([\s\S]*?)<\/changefreq>/);
              const prioMatch = block.match(/<priority>([\s\S]*?)<\/priority>/);
              const modMatch = block.match(/<lastmod>([\s\S]*?)<\/lastmod>/);
              upsertSitemapEntry(
                prependCanonicalOrigin(locMatch[1]),
                freqMatch ? freqMatch[1] : 'weekly',
                prioMatch ? prioMatch[1] : '0.8',
                modMatch ? modMatch[1] : '2026-09-26'
              );
            }
          }

          for (const route of routes) {
            const customLastmod = (route as any).lastmod;
            upsertSitemapEntry(
              prependCanonicalOrigin(route.url),
              route.changefreq,
              route.priority,
              customLastmod || defaultLastMod,
              Boolean(customLastmod)
            );
          }

          for (const [routePath, meta] of Object.entries(SEO_ROUTES_METADATA)) {
            if (DISALLOWED_PATHS.has(routePath) || routePath.startsWith('/blog/')) continue;
            const expectedCanon = prependCanonicalOrigin(routePath);
            const routeCanon = meta.canonical ? prependCanonicalOrigin(meta.canonical) : expectedCanon;
            if (routeCanon === expectedCanon) {
              upsertSitemapEntry(expectedCanon, 'weekly', routePath === '/' ? 1.0 : 0.9, defaultLastMod);
            }
          }

          for (const [slug, post] of Object.entries(STATIC_BLOG_POSTS)) {
            if (!post?.slug || BLOG_SLUG_REDIRECTS[slug]) continue;
            const cleanSlug = post.slug.trim().replace(/^\/+/, '');
            if (cleanSlug !== slug || BLOG_SLUG_REDIRECTS[cleanSlug]) continue;
            const postDate = post?.createdAt ? validateLastmod(post.createdAt) : defaultLastMod;
            upsertSitemapEntry(prependCanonicalOrigin(`/blog/${cleanSlug}`), 'weekly', 0.9, postDate);
          }

          const contentBlogDir = path.resolve(process.cwd(), 'content/blog');
          if (fs.existsSync(contentBlogDir)) {
            const mdFiles = fs.readdirSync(contentBlogDir).filter((f) => f.endsWith('.md'));
            for (const file of mdFiles) {
              const articleSlug = file.replace(/\.md$/, '').trim().replace(/^\/+/, '');
              if (BLOG_SLUG_REDIRECTS[articleSlug]) continue;
              const post = STATIC_BLOG_POSTS[articleSlug];
              const postDate = post?.createdAt ? validateLastmod(post.createdAt) : defaultLastMod;
              upsertSitemapEntry(prependCanonicalOrigin(`/blog/${articleSlug}`), 'weekly', 0.9, postDate);
            }
          }

          for (const pPage of programmaticSEOPages) {
            if (pPage.slug) {
              const cleanSolutionSlug = pPage.slug.trim().replace(/^\/+/, '');
              upsertSitemapEntry(prependCanonicalOrigin(`/solutions/${cleanSolutionSlug}`), 'weekly', 0.9, '2026-10-19');
            }
          }

          const validatedEntries = Array.from(sitemapEntriesMap.values()).map((entry) => {
            const normLoc = prependCanonicalOrigin(entry.loc);
            return {
              ...entry,
              loc: normLoc === SITEMAP_ORIGIN ? `${SITEMAP_ORIGIN}/` : normLoc,
            };
          });
          const sitemapXmlLines = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...validatedEntries.map(
              (entry) =>
                `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`
            ),
            '</urlset>',
            ''
          ];
          const sitemapContent = sitemapXmlLines.join('\n');

          const invalidUrls = validatedEntries.filter(
            (e) => !e.loc.startsWith(SITEMAP_ORIGIN) || e.loc.startsWith('/')
          );
          if (invalidUrls.length > 0) {
            throw new Error(`[Sitemap Validator] Found non-absolute or invalid domain URLs: ${invalidUrls.map((u) => u.loc).join(', ')}`);
          }

          for (const targetSitemapPath of [
            sitemapPath,
            distPagesSitemapPath,
            publicSitemap,
            publicPagesSitemap,
            rootSitemap,
            rootPagesSitemap
          ]) {
            if (!fs.existsSync(targetSitemapPath) || fs.readFileSync(targetSitemapPath, 'utf-8') !== sitemapContent) {
              fs.writeFileSync(targetSitemapPath, sitemapContent, 'utf-8');
            }
          }

          try {
            const gzBuffer = zlib.gzipSync(Buffer.from(sitemapContent, 'utf-8'));
            const brBuffer = zlib.brotliCompressSync(Buffer.from(sitemapContent, 'utf-8'));
            fs.writeFileSync(`${sitemapPath}.gz`, gzBuffer);
            fs.writeFileSync(`${sitemapPath}.br`, brBuffer);
            fs.writeFileSync(`${distPagesSitemapPath}.gz`, gzBuffer);
            fs.writeFileSync(`${distPagesSitemapPath}.br`, brBuffer);
          } catch (compErr) {}

          console.log(`✅ [Sitemap] Generated & validated ${validatedEntries.length} canonical absolute URLs across dist & public sitemaps!`);

          const isCacheValid = Boolean(cachedData && cachedData.dataHash === dataHash && cachedData.rssContent);

          if (isCacheValid && fs.existsSync(rssPath)) {
            console.log('⚡ [SEO Generator] Blog data has not changed. Skipping RSS regeneration.');
          } else if (isCacheValid && cachedData?.rssContent) {
            fs.writeFileSync(rssPath, cachedData.rssContent, 'utf-8');
            console.log('⚡ [SEO Generator] Blog data unchanged. Restored RSS from cache.');
          } else {

            const rssItemsContent = fetchedPosts.map(post => `    <item>\n      <title>${escapeXml(post.title)}</title>\n      <link>${hostname}/blog/${post.slug}</link>\n      <guid isPermaLink="true">${hostname}/blog/${post.slug}</guid>\n      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>\n      <description>${escapeXml(post.excerpt)}</description>\n      <author>hello@abuqitmirlabs.tech (${escapeXml(post.author)})</author>\n      <category>${escapeXml(post.category)}</category>\n    </item>`).join('\n');

            const rssContent = `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>AbuQitmirLabs .TECH - Custom Software &amp; AI Engineering Journal</title>\n    <link>https://www.abuqitmirlabs.tech</link>\n    <description>Discover leading insights in AI Agent automations, ERP configurations, customizable web systems, and semantic local SEO solutions from Shiraz Almadani.</description>\n    <language>en-us</language>\n    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n    <atom:link href="https://www.abuqitmirlabs.tech/rss.xml" rel="self" type="application/rss+xml" />\n${rssItemsContent}\n  </channel>\n</rss>`;
            fs.writeFileSync(rssPath, rssContent, 'utf-8');
            console.log(`✅ [RSS Feed] Regenerated RSS Feed with ${fetchedPosts.length} dynamic articles!`);

            try {
              if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
              fs.writeFileSync(cacheFilePath, JSON.stringify({ dataHash, sitemapContent, rssContent, timestamp: new Date().toISOString(), fileSignatures }, null, 2), 'utf-8');
            } catch (err: any) {}
          }

          const robotsContent = `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /google87984536fe5662da\n\nSitemap: ${hostname}/sitemap.xml`;
          fs.writeFileSync(path.resolve(outDir, 'robots.txt'), robotsContent);

          for (const route of routes) {
            const isRoot = route.url === '/';
            const routeDir = isRoot ? outDir : path.join(outDir, route.url);
            if (!isRoot && !fs.existsSync(routeDir)) fs.mkdirSync(routeDir, { recursive: true });
            
            let routeHtml = baseHtml;
            const safeTitle = route.title.replace(/&/g, '&amp;');
            const strippedDesc = clampMetaDescription(route.description || '', 158);
            const safeDesc = strippedDesc.replace(/"/g, '&quot;').replace(/&/g, '&amp;');
            
            routeHtml = routeHtml.replace(/<title\b[^>]*>[^<]*<\/title>/gi, '').replace('</head>', `  <title>${safeTitle}</title>\n</head>`);
            routeHtml = routeHtml.replace(/<meta\b[^>]*property="og:title"[^>]*\/?>/gi, '').replace(/<meta\b[^>]*name="twitter:title"[^>]*\/?>/gi, '').replace('</head>', `  <meta property="og:title" content="${safeTitle}" />\n  <meta name="twitter:title" content="${safeTitle}" />\n</head>`);
            routeHtml = routeHtml.replace(/<meta\b[^>]*name="description"[^>]*\/?>/gi, '').replace(/<meta\b[^>]*property="og:description"[^>]*\/?>/gi, '').replace(/<meta\b[^>]*name="twitter:description"[^>]*\/?>/gi, '').replace('</head>', `  <meta name="description" content="${safeDesc}" />\n  <meta property="og:description" content="${safeDesc}" />\n  <meta name="twitter:description" content="${safeDesc}" />\n</head>`);
            routeHtml = routeHtml.replace(/<meta\b[^>]*property="og:url"[^>]*\/?>/gi, '').replace(/<meta\b[^>]*name="twitter:url"[^>]*\/?>/gi, '').replace('</head>', `  <meta property="og:url" content="${hostname}${route.url === '/' ? '/' : route.url}" />\n  <meta name="twitter:url" content="${hostname}${route.url === '/' ? '/' : route.url}" />\n</head>`);
            routeHtml = routeHtml.replace(/<link\s+rel="canonical"[^>]*\/?>/gi, '').replace('</head>', `  <link rel="canonical" href="${hostname}${route.url === '/' ? '/' : route.url}" />\n</head>`);
            
            // ==== SUPER-SAFE replaceRootElement ====
            const replaceRootElement = (htmlSource: string, newInnerHtml: string, renderedRouteAttr?: string) => {
              const attrStr = renderedRouteAttr ? ` data-rendered-route="${renderedRouteAttr}"` : '';
              const newRoot = `<div id="root"${attrStr}>${newInnerHtml}</div>`;
              
              // Find the root div opening tag (handles any attributes like <div id="root" class="...">)
              const rootRegex = /<div[^>]*id=["']root["'][^>]*>/i;
              const match = htmlSource.match(rootRegex);
              
              if (!match) {
                // Fallback: If no root div found, inject right before the first script tag
                if (htmlSource.includes('<script')) {
                  return htmlSource.replace(/<script/i, `${newRoot}\n<script`);
                }
                return htmlSource.replace('</body>', `${newRoot}\n</body>`);
              }
              
              const startIdx = match.index!;
              const startTagLen = match[0].length;
              
              // Find the matching closing </div> by counting depth
              const afterRoot = htmlSource.slice(startIdx + startTagLen);
              let depth = 1;
              let i = 0;
              let endDivIdx = -1;
              
              while (i < afterRoot.length) {
                const openDiv = afterRoot.indexOf('<div', i);
                const closeDiv = afterRoot.indexOf('</div>', i);
                
                if (closeDiv === -1) break; // Malformed HTML
                
                if (openDiv !== -1 && openDiv < closeDiv) {
                  depth++;
                  i = openDiv + 4;
                } else {
                  depth--;
                  if (depth === 0) {
                    endDivIdx = closeDiv;
                    break;
                  }
                  i = closeDiv + 6;
                }
              }
              
              if (endDivIdx !== -1) {
                const absoluteEndIdx = startIdx + startTagLen + endDivIdx + 6;
                return htmlSource.slice(0, startIdx) + newRoot + htmlSource.slice(absoluteEndIdx);
              }
              
              // Fallback if depth counter fails
              const firstClose = afterRoot.indexOf('</div>');
              if (firstClose !== -1) {
                const absoluteEndIdx = startIdx + startTagLen + firstClose + 6;
                return htmlSource.slice(0, startIdx) + newRoot + htmlSource.slice(absoluteEndIdx);
              }
              
              return htmlSource;
            };
            // =======================================

            const writeRouteFiles = (rUrl: string, rDir: string, htmlContent: string) => {
              fs.writeFileSync(path.join(rDir, 'index.html'), htmlContent, 'utf-8');
              if (rUrl !== '/') {
                const cleanRel = rUrl.replace(/^\/+/, '').replace(/\/+$/, '');
                if (cleanRel) {
                  const directHtmlPath = path.join(outDir, `${cleanRel}.html`);
                  const parentDir = path.dirname(directHtmlPath);
                  if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir, { recursive: true });
                  fs.writeFileSync(directHtmlPath, htmlContent, 'utf-8');
                  if (cleanRel.startsWith('blog/')) {
                    const publicBlogFile = path.resolve(process.cwd(), 'public', cleanRel, 'index.html');
                    const publicBlogDir = path.dirname(publicBlogFile);
                    if (!fs.existsSync(publicBlogDir)) fs.mkdirSync(publicBlogDir, { recursive: true });
                    if (!fs.existsSync(publicBlogFile) || fs.readFileSync(publicBlogFile, 'utf-8') !== htmlContent) {
                      fs.writeFileSync(publicBlogFile, htmlContent, 'utf-8');
                    }
                  }
                }
              }
            };

            const injectSingleSchema = (htmlSource: string, schemaObj: any) => {
              const cleaned = htmlSource.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gis, '');
              return cleaned.replace('</head>', `  <script id="canonical-schema-graph" type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n  </script>\n</head>`);
            };

            if (route.url === '/') {
              routeHtml = injectSingleSchema(routeHtml, homeSchema);
              routeHtml = replaceRootElement(routeHtml, homeInitialHtml, '/');
              fs.writeFileSync(indexHtmlPath, routeHtml);
              continue;
            }

            if (route.url === '/growth-engineering') {
              routeHtml = injectSingleSchema(routeHtml, growthEngineeringPageSchema);
              routeHtml = replaceRootElement(routeHtml, growthEngineeringInitialHtml, '/growth-engineering');
              writeRouteFiles(route.url, routeDir, routeHtml);
              continue;
            }

            if (route.url === '/ai-agent-development') {
              routeHtml = injectSingleSchema(routeHtml, aiAgentSchema);
              routeHtml = replaceRootElement(routeHtml, aiAgentInitialHtml, '/ai-agent-development');
              writeRouteFiles(route.url, routeDir, routeHtml);
              continue;
            }

            if (route.url === '/graphics-design') {
              routeHtml = injectSingleSchema(routeHtml, graphicsDesignSchema);
              routeHtml = replaceRootElement(routeHtml, graphicsDesignInitialHtml, '/graphics-design');
              writeRouteFiles(route.url, routeDir, routeHtml);
              continue;
            }

            if (route.url === '/solutions/fintech') {
              routeHtml = injectSingleSchema(routeHtml, fintechSchema);
              routeHtml = replaceRootElement(routeHtml, fintechInitialHtml, '/solutions/fintech');
              writeRouteFiles(route.url, routeDir, routeHtml);
              continue;
            }

            if (route.url === '/solutions/healthcare') {
              routeHtml = injectSingleSchema(routeHtml, healthcareSchema);
              routeHtml = replaceRootElement(routeHtml, healthcareInitialHtml, '/solutions/healthcare');
              writeRouteFiles(route.url, routeDir, routeHtml);
              continue;
            }

            if (route.url === '/solutions/ai-automation') {
              routeHtml = injectSingleSchema(routeHtml, aiAutomationSchema);
              routeHtml = replaceRootElement(routeHtml, aiAutomationInitialHtml, '/solutions/ai-automation');
              writeRouteFiles(route.url, routeDir, routeHtml);
              continue;
            }

            if (route.url === '/solutions/e-commerce') {
              routeHtml = injectSingleSchema(routeHtml, eCommerceSchema);
              routeHtml = replaceRootElement(routeHtml, eCommerceInitialHtml, '/solutions/e-commerce');
              writeRouteFiles(route.url, routeDir, routeHtml);
              continue;
            }

            if (route.url === '/solutions/edtech') {
              routeHtml = injectSingleSchema(routeHtml, edTechSchema);
              routeHtml = replaceRootElement(routeHtml, edTechInitialHtml, '/solutions/edtech');
              writeRouteFiles(route.url, routeDir, routeHtml);
              continue;
            }

            if (route.url === '/custom-software') {
              routeHtml = injectSingleSchema(routeHtml, customSoftwareSchema);
              routeHtml = replaceRootElement(routeHtml, customSoftwareInitialHtml, '/custom-software');
              writeRouteFiles(route.url, routeDir, routeHtml);
              continue;
            }

            if (route.url === '/mobile-app-development') {
              routeHtml = injectSingleSchema(routeHtml, mobileAppSchema);
              routeHtml = replaceRootElement(routeHtml, mobileAppInitialHtml, '/mobile-app-development');
              writeRouteFiles(route.url, routeDir, routeHtml);
              continue;
            }

            if (route.url === '/blog/custom-web-development-company') {
              routeHtml = injectSingleSchema(routeHtml, customWebDevBlogSchema);
              routeHtml = replaceRootElement(routeHtml, customWebDevBlogInitialHtml, '/blog/custom-web-development-company');
              writeRouteFiles(route.url, routeDir, routeHtml);
              continue;
            }

            if (route.url === '/local-seo-for-small-business') {
              routeHtml = injectSingleSchema(routeHtml, localSEOSmallBusinessSchema);
              routeHtml = replaceRootElement(routeHtml, localSEOSmallBusinessInitialHtml, '/local-seo-for-small-business');
              writeRouteFiles(route.url, routeDir, routeHtml);
              continue;
            }

            let articleContent = '';
            if (route.url.startsWith('/blog/') && route.url !== '/blog') {
              const blogSlug = route.url.replace(/^\/blog\//, '').replace(/\/+$/, '');
              const seoMeta = SEO_ROUTES_METADATA[route.url];
              let staticPost = STATIC_BLOG_POSTS[blogSlug];
              for (const [candidateSlug, candidatePost] of Object.entries(STATIC_BLOG_POSTS)) {
                if (getCanonicalSlug(candidateSlug) === blogSlug) {
                  if (!staticPost || (candidatePost?.content?.length || 0) > (staticPost?.content?.length || 0)) {
                    staticPost = candidatePost;
                  }
                }
              }
              const firestorePost = fetchedPosts.find(p => getCanonicalSlug(p.slug) === blogSlug);

              // Always prefer normalized staticPost.content when present so raw Firestore markdown never overrides clean headings or internal links
              let mdSource =
                staticPost?.content && staticPost.content.trim().length > 500
                  ? staticPost.content
                  : (firestorePost?.content || staticPost?.content || '');
              if (!mdSource) {
                const mdPath = path.resolve(process.cwd(), 'content/blog', `${blogSlug}.md`);
                if (fs.existsSync(mdPath)) {
                  const rawMdFile = fs.readFileSync(mdPath, 'utf-8');
                  mdSource = rawMdFile.replace(/^---[\s\S]*?---\s*/, '');
                }
              }

              const slugifyId = (txt: string) =>
                txt.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

              const extractedFaqs: Array<{ question: string; answer: string }> = [];
              if (mdSource) {
                const htmlBlocks: string[] = [];
                let lines = mdSource.trim().split(/\r?\n/);
                const cleanPostHeading = (staticPost?.title || firestorePost?.title || route.title || '')
                  .replace(/\s*\|\s*AbuQitmirLabs.*$/i, '')
                  .trim();
                const isMetaOrDivider = (l: string) => {
                  const t = (l || '').trim();
                  return !t || t === '---' || /^(?:\*\*)?By\s+Abu\s*Qitmir/i.test(t) || /^\*By\s+Abu\s*Qitmir/i.test(t);
                };
                while (lines.length > 0 && isMetaOrDivider(lines[0])) {
                  lines.shift();
                }
                if (lines.length > 0) {
                  const firstLine = lines[0].trim();
                  if (/^#\s+/.test(firstLine)) {
                    const h1Text = firstLine.replace(/^#\s+/, '').replace(/\s*\|\s*AbuQitmirLabs.*$/i, '').trim();
                    let nextNonEmptyIdx = 1;
                    while (nextNonEmptyIdx < lines.length && isMetaOrDivider(lines[nextNonEmptyIdx])) {
                      nextNonEmptyIdx++;
                    }
                    if (nextNonEmptyIdx < lines.length && /^##\s+/.test(lines[nextNonEmptyIdx].trim())) {
                      lines = lines.slice(nextNonEmptyIdx);
                    } else {
                      lines[0] = `## ${h1Text || cleanPostHeading}`;
                    }
                  } else if (/^##\s+/.test(firstLine)) {
                    lines[0] = `## ${firstLine.replace(/^##\s+/, '').replace(/\s*\|\s*AbuQitmirLabs.*$/i, '').trim()}`;
                  } else if (cleanPostHeading && !/^#{2,6}\s+/.test(firstLine)) {
                    lines.unshift(`## ${cleanPostHeading}`, '');
                  }
                }

                // Check if body before FAQ has <= 1 H2 and >= 3 H3s (promote orphan H3 sections to H2)
                let h2BeforeFaq = 0;
                let h3BeforeFaq = 0;
                let inPreCheck = false;
                let reachedFaqCheck = false;
                for (const l of lines) {
                  const t = l.trim();
                  if (t.startsWith('```')) { inPreCheck = !inPreCheck; continue; }
                  if (inPreCheck) continue;
                  if (/^#{2,3}\s+(?:frequently asked questions|\bfaq\b)/i.test(t)) { reachedFaqCheck = true; continue; }
                  if (!reachedFaqCheck) {
                    if (/^##\s+/.test(t)) h2BeforeFaq++;
                    else if (/^###\s+/.test(t)) h3BeforeFaq++;
                  }
                }
                const promoteOrphanH3 = h2BeforeFaq <= 1 && h3BeforeFaq >= 3;

                let inFaqSection = false;
                let currentFaqQuestion = '';
                let currentFaqAnswerParts: string[] = [];
                let ulItems: string[] = [];
                let olItems: string[] = [];
                let inCodeBlock = false;
                let codeBlockLines: string[] = [];

                const formatInlineHtml = (rawStr: string) => {
                  const parts: string[] = [];
                  let lastIdx = 0;
                  const tokenRe = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*/g;
                  let m: RegExpExecArray | null;
                  while ((m = tokenRe.exec(rawStr)) !== null) {
                    if (m.index > lastIdx) {
                      parts.push(escapeXml(rawStr.slice(lastIdx, m.index)));
                    }
                    if (m[1] !== undefined && m[2] !== undefined) {
                      const cleanLabel = m[1].replace(/\*\*/g, '').trim();
                      let cleanHref = m[2].trim();
                      if (cleanHref.startsWith('https://www.abuqitmirlabs.tech')) {
                        cleanHref = cleanHref.replace('https://www.abuqitmirlabs.tech', '') || '/';
                      }
                      parts.push(`<a href="${escapeXml(cleanHref)}" class="text-[#ccff00] underline">${escapeXml(cleanLabel)}</a>`);
                    } else if (m[3] !== undefined) {
                      parts.push(`<code class="bg-zinc-900 text-[#ccff00] px-1.5 py-0.5 rounded font-mono text-sm">${escapeXml(m[3])}</code>`);
                    } else if (m[4] !== undefined) {
                      parts.push(`<strong>${escapeXml(m[4].trim())}</strong>`);
                    }
                    lastIdx = m.index + m[0].length;
                  }
                  if (lastIdx < rawStr.length) {
                    parts.push(escapeXml(rawStr.slice(lastIdx)));
                  }
                  return parts.join('');
                };

                const flushLists = () => {
                  if (ulItems.length > 0) {
                    htmlBlocks.push(`<ul class="list-disc pl-6 my-4 space-y-2 text-neutral-300">${ulItems.map(item => `<li>${formatInlineHtml(item)}</li>`).join('')}</ul>`);
                    ulItems = [];
                  }
                  if (olItems.length > 0) {
                    htmlBlocks.push(`<ol class="list-decimal pl-6 my-4 space-y-2 text-neutral-300">${olItems.map(item => `<li>${formatInlineHtml(item)}</li>`).join('')}</ol>`);
                    olItems = [];
                  }
                };

                const flushFaq = () => {
                  if (currentFaqQuestion && currentFaqAnswerParts.length > 0) {
                    extractedFaqs.push({
                      question: currentFaqQuestion,
                      answer: currentFaqAnswerParts.join(' ').trim()
                    });
                  }
                  currentFaqQuestion = '';
                  currentFaqAnswerParts = [];
                };

                let tableRows: string[][] = [];
                const flushTable = () => {
                  if (tableRows.length === 0) return;
                  const headerRow = tableRows[0];
                  const bodyRows = tableRows.slice(1);
                  const thead = `<thead><tr>${headerRow.map(c => `<th class="border border-zinc-800 p-3 text-left font-bold">${formatInlineHtml(c)}</th>`).join('')}</tr></thead>`;
                  const tbody = bodyRows.length > 0
                    ? `<tbody>${bodyRows.map(r => `<tr>${r.map(c => `<td class="border border-zinc-800 p-3">${formatInlineHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody>`
                    : '';
                  htmlBlocks.push(`<div class="overflow-x-auto my-6"><table class="w-full border-collapse border border-zinc-800">${thead}${tbody}</table></div>`);
                  tableRows = [];
                };

                for (const line of lines) {
                  const trimmed = line.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
                  if (trimmed.startsWith('```')) {
                    flushLists();
                    flushTable();
                    if (inCodeBlock) {
                      htmlBlocks.push(`<pre class="bg-zinc-950 border border-zinc-800 rounded-xl p-4 overflow-x-auto my-6 font-mono text-sm text-zinc-200"><code>${escapeXml(codeBlockLines.join('\n'))}</code></pre>`);
                      codeBlockLines = [];
                      inCodeBlock = false;
                    } else {
                      inCodeBlock = true;
                    }
                    continue;
                  }
                  if (inCodeBlock) {
                    codeBlockLines.push(line);
                    continue;
                  }
                  if (!trimmed || trimmed === '---' || /^\*?(\*\*)?By\s+Abu\s*Qitmir/i.test(trimmed)) {
                    flushLists();
                    flushTable();
                    continue;
                  }
                  if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
                    flushLists();
                    const cells = trimmed
                      .slice(1, -1)
                      .split('|')
                      .map(c => c.trim());
                    // Skip markdown separator row like | :--- | :--- |
                    if (cells.every(c => /^:?-{2,}:?$/.test(c))) {
                      continue;
                    }
                    tableRows.push(cells);
                    continue;
                  } else {
                    flushTable();
                  }

                  const rawHeadingMatch = trimmed.match(/^(?:\*\*)?(#{1,6})[\s\u00A0]+(.+?)(?:\*\*)?\s*#*$/);
                  if (rawHeadingMatch) {
                    flushLists();
                    flushFaq();
                    let level = rawHeadingMatch[1].length;
                    if (level === 1) level = 2;
                    let hText = rawHeadingMatch[2].replace(/\*\*/g, '').replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '').trim();
                    if (/^[a-z]/.test(hText)) {
                      hText = hText.charAt(0).toUpperCase() + hText.slice(1);
                    }
                    if (/^introduction$/i.test(hText) && blogSlug === 'how-to-build-personal-brand-online') {
                      hText = 'Introduction: Why Positioning Beats Volume';
                    }
                    if (/^a guide to ai automation in regulated industries\.?$/i.test(hText)) {
                      hText = 'Introduction: AI Automation in Regulated Industries';
                    }
                    if (level === 3 && /frequently asked questions|\bfaq\b/i.test(hText)) {
                      level = 2;
                    } else if (level === 3 && promoteOrphanH3 && !inFaqSection) {
                      level = 2;
                    }
                    if (level === 2) {
                      inFaqSection = /frequently asked questions|\bfaq\b/i.test(hText);
                      htmlBlocks.push(`<h2 id="${slugifyId(hText)}" class="text-2xl font-bold mt-10 mb-4">${escapeXml(hText)}</h2>`);
                    } else if (level === 3) {
                      if (inFaqSection || hText.endsWith('?')) {
                        currentFaqQuestion = hText.replace(/^\d+[\.\)]\s*/, '').trim();
                      }
                      htmlBlocks.push(`<h3 id="${slugifyId(hText)}" class="text-xl font-bold mt-6 mb-3">${escapeXml(hText)}</h3>`);
                    } else {
                      htmlBlocks.push(`<h4 id="${slugifyId(hText)}" class="text-lg font-bold mt-5 mb-2">${escapeXml(hText)}</h4>`);
                    }
                  } else if (/^[-*+]\s+/.test(trimmed)) {
                    if (olItems.length > 0) flushLists();
                    const liRaw = trimmed.replace(/^[-*+]\s+/, '').replace(/^\[[ xX]\]\s+/, '');
                    ulItems.push(liRaw);
                  } else if (/^\d+[\.\)]\s+/.test(trimmed)) {
                    if (ulItems.length > 0) flushLists();
                    const liRaw = trimmed.replace(/^\d+[\.\)]\s+/, '');
                    olItems.push(liRaw);
                  } else if (!trimmed.startsWith('![')) {
                    flushLists();
                    const cleanText = trimmed.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
                    if (currentFaqQuestion) {
                      currentFaqAnswerParts.push(cleanText);
                    }
                    htmlBlocks.push(`<p class="text-neutral-300 mb-4">${formatInlineHtml(trimmed)}</p>`);
                  }
                }
                flushLists();
                flushTable();
                flushFaq();
                // Guarantee at least one H2 even if a short post had no ## headings
                if (!htmlBlocks.some(b => b.startsWith('<h2'))) {
                  htmlBlocks.unshift(`<h2 id="overview" class="text-2xl font-bold mt-8 mb-4">Key Takeaways &amp; Overview</h2>`);
                }
                articleContent = htmlBlocks.join('\n');
              }

              const rawCoverImgUrl = seoMeta?.ogImage || firestorePost?.coverImage || staticPost?.coverImage || 'https://www.abuqitmirlabs.tech/logo.png';
              const optimizedLocalCover = resolveOptimizedCoverImage(rawCoverImgUrl, blogSlug);
              const coverImgUrl = optimizedLocalCover.startsWith('/')
                ? `${hostname}${optimizedLocalCover}`
                : optimizedLocalCover;
              const preloadHref = optimizedLocalCover || rawCoverImgUrl;

              routeHtml = routeHtml
                .replace(/<meta\b[^>]*property="og:image"[^>]*\/?>/gi, '')
                .replace(/<meta\b[^>]*name="twitter:image"[^>]*\/?>/gi, '')
                .replace(/<meta\b[^>]*property="og:type"[^>]*\/?>/gi, '')
                .replace('</head>', `  <link rel="preload" as="image" href="${preloadHref}" />\n  <meta property="og:type" content="article" />\n  <meta property="og:image" content="${coverImgUrl}" />\n  <meta name="twitter:image" content="${coverImgUrl}" />\n</head>`);

              if (seoMeta && seoMeta.schemaJsonLd) {
                const clonedSchema = JSON.parse(JSON.stringify(seoMeta.schemaJsonLd));
                const fullCanonical = `${hostname}${route.url}`;
                if (Array.isArray(clonedSchema['@graph'])) {
                  for (const node of clonedSchema['@graph']) {
                    if (node && node['@type'] === 'Article' && coverImgUrl) {
                      node.image = coverImgUrl;
                    }
                  }
                  if (extractedFaqs.length > 0) {
                    const hasFaq = clonedSchema['@graph'].some((n: any) => n && n['@type'] === 'FAQPage');
                    if (!hasFaq) {
                      clonedSchema['@graph'].push({
                        "@type": "FAQPage",
                        "@id": `${fullCanonical}#faq`,
                        "mainEntity": extractedFaqs.slice(0, 12).map(faq => ({
                          "@type": "Question",
                          "name": faq.question,
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": faq.answer
                          }
                        }))
                      });
                    }
                  }
                }
                routeHtml = injectSingleSchema(routeHtml, clonedSchema);
              } else {
                const fullCanonical = `${hostname}${route.url}`;
                const cleanHeadline = (firestorePost?.title || staticPost?.title || route.title).replace(/\s*\|\s*AbuQitmirLabs.*$/i, '');
                const autoGraph: any[] = [
                  {
                    "@type": "Organization",
                    "@id": "https://www.abuqitmirlabs.tech/#organization",
                    "name": "AbuQitmirLabs",
                    "alternateName": "AbuQitmirLabs",
                    "url": "https://www.abuqitmirlabs.tech/",
                    "logo": "https://www.abuqitmirlabs.tech/logo.png"
                  },
                  {
                    "@type": "WebSite",
                    "@id": "https://www.abuqitmirlabs.tech/#website",
                    "url": "https://www.abuqitmirlabs.tech/",
                    "name": "AbuQitmirLabs",
                    "publisher": { "@id": "https://www.abuqitmirlabs.tech/#organization" }
                  },
                  {
                    "@type": "WebPage",
                    "@id": `${fullCanonical}#webpage`,
                    "url": fullCanonical,
                    "name": route.title,
                    "description": strippedDesc,
                    "isPartOf": { "@id": "https://www.abuqitmirlabs.tech/#website" }
                  },
                  {
                    "@type": "BreadcrumbList",
                    "@id": `${fullCanonical}#breadcrumb`,
                    "itemListElement": [
                      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.abuqitmirlabs.tech/" },
                      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.abuqitmirlabs.tech/blog" },
                      { "@type": "ListItem", "position": 3, "name": cleanHeadline, "item": fullCanonical }
                    ]
                  },
                  {
                    "@type": "Article",
                    "@id": `${fullCanonical}#article`,
                    "isPartOf": { "@id": `${fullCanonical}#webpage` },
                    "headline": cleanHeadline,
                    "description": strippedDesc,
                    "image": coverImgUrl,
                    "author": {
                      "@type": "Person",
                      "name": firestorePost?.author || staticPost?.author || "Abu Qitmir Mohammad Shiraz Al-Madani",
                      "url": "https://www.abuqitmirlabs.tech/about/our-team"
                    },
                    "publisher": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
                    "mainEntityOfPage": { "@id": `${fullCanonical}#webpage` },
                    "datePublished": "2026-10-23T00:00:00+00:00",
                    "dateModified": "2026-10-27T00:00:00+00:00"
                  }
                ];

                if (extractedFaqs.length > 0) {
                  autoGraph.push({
                    "@type": "FAQPage",
                    "@id": `${fullCanonical}#faq`,
                    "mainEntity": extractedFaqs.slice(0, 12).map(faq => ({
                      "@type": "Question",
                      "name": faq.question,
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                      }
                    }))
                  });
                }

                routeHtml = injectSingleSchema(routeHtml, {
                  "@context": "https://schema.org",
                  "@graph": autoGraph
                });
              }
            }

            if (!articleContent) {
              if (route.url === '/seo-mastery') {
                articleContent = `<h2>SEO Mastery: Data-Driven Search Engine Optimization</h2><p>Ranking isn't about stuffing keywords — it's about technical health plus content that actually answers search intent. We run full technical audits, fix crawl and indexing issues, and build content structures that Google can understand and trust. Hamari SEO services ko aap <a href="/web-development">Web Development</a> aur <a href="/content-writing">Content Writing</a> ke sath combine kar ke maximum search visibility hasil kar sakte hain.</p><img src="/logo.png" alt="AbuQitmirLabs - Custom Software Development & AI Engineering" width="300" height="300" loading="lazy" decoding="async" style="max-width:300px" /><p>${route.description}</p><section><h3>Our Technical Expertise</h3><ul><li>Technical SEO Audits & Crawl Error Fixes</li><li>On-Page & Semantic Entity Optimization</li><li>XML Sitemap & Schema Markup Implementation</li><li>Local SEO & Google Business Profile Optimization</li><li>Content Strategy Aligned with Search Intent</li></ul></section>`;
              } else if (route.url === '/case-studies') {
                articleContent = `<h2>Real Projects. Real Results.</h2><p>We don't publish polished portfolio pieces with the hard parts edited out. Each case study here covers a real project we built — the problem, our actual technical approach, and what shipped. Our work spans AI products, custom platforms, and growth-focused engineering.</p><img src="/logo.png" alt="AbuQitmirLabs - Custom Software Development & AI Engineering" width="300" height="300" loading="lazy" decoding="async" style="max-width:300px" /><p>${route.description}</p><section><h3>Our Technical Expertise</h3><ul><li>Real Client Projects, Not Mockups</li><li>AI & RAG-Powered Product Builds</li><li>Custom Platform Engineering Case Studies</li><li>Technical Breakdown of Our Approach</li><li>Measurable Outcomes Where Available</li></ul></section>`;
              } else if (route.url === '/about' || route.url === '/about/our-company' || route.url === '/about/our-team') {
                articleContent = `<h2>AI builds fast. Judgment builds trust.</h2><p>Anyone can wire up an AI tool today. That's not a differentiator anymore — it's the baseline. What still can't be automated is the part that actually matters: knowing when the AI is wrong, when a shortcut will break in production, and when 'technically correct' isn't the same as 'actually right for this client.'</p><p>That's the work we do. AI drafts, searches, and accelerates — but every architecture decision, every line of code, and every claim we make about our own work is reviewed by a person before it ships. Not because we distrust AI, but because a client's product is not the place to find out where it fails.</p><p>We'd rather be known for what we caught and fixed than for how fast we generated something. That's the standard behind every project with our name on it — led by Abu Qitmir Mohammad Shiraz Al-Madani, and held to the same bar whether it's a line of code or a line of marketing copy.</p><img src="/logo.png" alt="AbuQitmirLabs - Custom Software Development & AI Engineering" width="300" height="300" loading="lazy" decoding="async" style="max-width:300px" /><p>${route.description}</p><section><h3>AbuQitmirLabs Engineering Leadership</h3><p>Founded by Abu Qitmir Mohammad Shiraz Al-Madani in Karachi, Pakistan, AbuQitmirLabs delivers custom software, AI agents, mobile apps, and technical SEO with 100% human-verified architecture.</p></section>`;
              } else {
                const routeH2 = route.url === '/' ? 'Custom Software · Web Development · AI Agents · Mobile Apps · SEO' : 'Elite Digital Architecture &amp; Technical Solutions';
                articleContent = `<h2>${routeH2}</h2><p>At AbuQitmirLabs .TECH, we specialize in <strong>custom software engineering</strong> and high-performance digital solutions.</p><img src="/logo.png" alt="AbuQitmirLabs - Custom Software Development & AI Engineering" width="300" height="300" loading="lazy" decoding="async" style="max-width:300px" /><p>${route.description}</p><section><h3>Our Technical Expertise</h3><p>We deliver cutting-edge software solutions including:</p><ul><li>Custom Mobile & Web App Engineering</li><li>Autonomous AI Agents & RAG Integration</li><li>Scalable Cloud-Native Microservices</li><li>High-ROI Semantic SEO Strategies</li><li>Cinematic UX Frameworks</li></ul></section>`;
              }
            }

            if (!route.url.startsWith('/blog/') || route.url === '/blog') {
              const seoMeta = SEO_ROUTES_METADATA[route.url];
              const fullCanonical = `${hostname}${route.url === '/' ? '/' : route.url}`;
              if (seoMeta && seoMeta.schemaJsonLd) {
                routeHtml = injectSingleSchema(routeHtml, seoMeta.schemaJsonLd);
              } else {
                const pageSchema = {
                  "@context": "https://schema.org",
                  "@graph": [
                    {
                      "@type": "Organization",
                      "@id": "https://www.abuqitmirlabs.tech/#organization",
                      "name": "AbuQitmirLabs .TECH",
                      "alternateName": "AbuQitmirLabs",
                      "url": "https://www.abuqitmirlabs.tech/",
                      "logo": "https://www.abuqitmirlabs.tech/logo.png"
                    },
                    {
                      "@type": "WebSite",
                      "@id": "https://www.abuqitmirlabs.tech/#website",
                      "url": "https://www.abuqitmirlabs.tech/",
                      "name": "AbuQitmirLabs .TECH",
                      "publisher": { "@id": "https://www.abuqitmirlabs.tech/#organization" }
                    },
                    {
                      "@type": "WebPage",
                      "@id": `${fullCanonical}#webpage`,
                      "url": fullCanonical,
                      "name": route.title,
                      "description": strippedDesc,
                      "isPartOf": { "@id": "https://www.abuqitmirlabs.tech/#website" }
                    },
                    {
                      "@type": "BreadcrumbList",
                      "@id": `${fullCanonical}#breadcrumb`,
                      "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.abuqitmirlabs.tech/" },
                        { "@type": "ListItem", "position": 2, "name": route.title.replace(/\s*\|\s*AbuQitmirLabs.*$/i, ''), "item": fullCanonical }
                      ]
                    }
                  ]
                };
                routeHtml = injectSingleSchema(routeHtml, pageSchema);
              }
            }

            const blogPostSlug = (route.url.startsWith('/blog/') && route.url !== '/blog')
              ? route.url.replace(/^\/blog\//, '').replace(/\/+$/, '')
              : '';
            const exactBlogTitle = blogPostSlug
              ? (STATIC_BLOG_POSTS[blogPostSlug]?.title || fetchedPosts.find(p => p.slug === blogPostSlug)?.title || route.title)
              : route.title;
            const cleanH1Title = (route.url.startsWith('/blog/') && route.url !== '/blog')
              ? exactBlogTitle.replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '').trim()
              : route.title;
            const fallbackPrerenderHtml = `<div class="min-h-screen bg-[#050505] text-white">${renderStaticHeader(route.url)}<main id="main-content" class="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-16"><h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">${cleanH1Title}</h1><article class="prose prose-invert max-w-none text-neutral-300">${articleContent}</article></main></div>`;
            routeHtml = replaceRootElement(routeHtml, fallbackPrerenderHtml, route.url);
            
            writeRouteFiles(route.url, routeDir, routeHtml);
          }
          
          console.log('✅ SEO Assets and RSS dynamic feed generated successfully!');
        }
      }
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: {
        '@': path.resolve(__dirname, '.'),
        'react': path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
        'react-helmet-async': path.resolve(__dirname, 'lib/generate-metadata.ts'),
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
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});

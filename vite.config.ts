import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import zlib from 'zlib';
import { defineConfig, loadEnv } from 'vite';
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
import { renderStaticHeader } from './src/utils/sharedStaticHeader';
import { SEO_ROUTES_METADATA } from './src/data/seoRoutesMetadata';
import { BLOG_SLUG_REDIRECTS, getCanonicalPath } from './src/data/canonicalRedirects';
import { STATIC_BLOG_POSTS } from './src/data/staticBlogPosts';
import { programmaticSEOPages } from './src/data/programmatic-seo';

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
      compression({ algorithm: 'gzip', ext: '.gz' }),
      compression({ algorithm: 'brotliCompress', ext: '.br' }),
      prerender({
        staticDir: path.resolve(process.cwd(), 'dist'),
        routes: [
          '/', '/ai-video-creation', '/custom-software', '/mobile-app-development',
          '/web-development', '/ai-agent-development', '/seo-mastery', '/graphics-design',
          '/content-writing', '/solutions/fintech', '/solutions/healthcare', '/solutions/ai-automation',
          '/solutions/e-commerce', '/solutions/edtech', '/case-studies', '/case-studies/tajweedpage',
          '/about', '/about/our-company', '/about/our-team', '/about/our-process', '/about/careers',
          '/us-market', '/uk-market', '/pakistan-market', '/canada-market', '/poland-market',
          '/australia-market', '/privacy', '/terms', '/blog', '/blog/custom-web-development-company',
          '/blog/content-calendar-strategy', '/blog/brand-strategy-vs-logo-design-pakistan-sme',
          '/local-seo-for-small-business', '/local-seo-citation-building', '/white-label-local-seo',
          '/local-seo-audit', '/website-contract', '/contact'
        ],
        renderer: new prerender.PuppeteerRenderer({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
      }),
      {
        name: 'custom-seo-generator',
        closeBundle: async () => {
          const hostname = 'https://www.abuqitmirlabs.tech';
          const baseRoutes = [
            { url: '/', changefreq: 'weekly', priority: 1.0, title: 'Custom Software & AI App Development Company | AbuQitmirLabs', description: "AbuQitmirLabs engineers custom software, AI agents, mobile apps, and web solutions. Top-rated development company in Karachi serving global clients." },
            { url: '/about', changefreq: 'monthly', priority: 0.8, title: 'About Us | AbuQitmirLabs', description: 'Learn about our mission to build cutting-edge AI and mobile solutions.' },
            { url: '/about/our-company', changefreq: 'monthly', priority: 0.8, title: 'About Our Company | Global Software Studio | AbuQitmirLabs', description: 'AbuQitmirLabs is a Karachi-based software boutique. 410+ custom projects for 350+ global clients. Zero lock-in, 100% in-house talent. Learn about our mission and values.' },
            { url: '/about/our-team', changefreq: 'monthly', priority: 0.8, title: 'Our Team | Elite Software Architects | AbuQitmirLabs', description: 'Meet the AbuQitmirLabs team — 12+ in-house software architects, engineers, and UI/UX experts in Karachi. 410+ projects delivered globally. Led by founder Abu Qitmir.' },
            { url: '/about/our-process', changefreq: 'monthly', priority: 0.8, title: 'Our Process | 6-Step Software Engineering Method | AbuQitmirLabs', description: "AbuQitmirLabs' 6-step engineering process: Discovery, Architecture, Development, QA, Zero-Downtime Launch, and Support. Structured discipline delivering 3x faster ROI." },
            { url: '/about/careers', changefreq: 'monthly', priority: 0.8, title: 'Careers at AbuQitmirLabs | Join Our In-House Studio | AbuQitmirLabs', description: "Join AbuQitmirLabs — we're hiring senior full-stack architects, AI/RAG engineers, UI/UX designers, and SEO strategists in Karachi. Build global software that matters." },
            { url: '/contact', changefreq: 'monthly', priority: 0.9, title: 'Contact Us | Free Project Quote & Consultation | AbuQitmirLabs', description: 'Contact AbuQitmirLabs for a free project quote. Get a free technical consultation and digital audit. Build custom software, mobile apps, AI agents, and web solutions.' },
            { url: '/custom-software', changefreq: 'weekly', priority: 0.9, title: 'Custom Software Development Company | AbuQitmirLabs', description: 'Bespoke software built around your workflows — ERPs, SaaS platforms, AI-powered tools, and enterprise systems. Full IP ownership.' },
            { url: '/mobile-app-development', changefreq: 'weekly', priority: 0.9, title: 'Mobile App Development Company | AbuQitmirLabs', description: 'Flutter, React Native, and native iOS/Android app development. Full source code ownership, App Store submission, and backend integration included.' },
            { url: '/web-development', changefreq: 'weekly', priority: 0.9, title: 'Web Development Company | Custom Web Solutions | AbuQitmirLabs', description: 'AbuQitmirLabs provides custom web development for startups and businesses, building fast, secure, responsive websites and scalable web applications.' },
            { url: '/ai-video-creation', changefreq: 'weekly', priority: 0.9, title: 'AI Video Creation Services | Cinematic AI Production Agency | AbuQitmirLabs', description: 'Cinematic AI video production agency combining human direction with generative AI. Teasers, explainers, ads & founder stories for US, UK & global brands.' },
            { url: '/ai-agent-development', changefreq: 'weekly', priority: 0.9, title: 'Healthcare AI Agent Development Company | AbuQitmirLabs', description: 'Custom healthcare AI agents for patient intake, RAG, EHR integration and workflow automation. Build secure AI systems with AbuQitmirLabs.' },
            { url: '/seo-mastery', changefreq: 'weekly', priority: 0.8, title: 'SEO Services | Professional Search Engine Optimization | AbuQitmirLabs', description: 'AbuQitmirLabs delivers data-driven SEO services — technical audits, on-page optimization, local SEO, and authority building. Rank higher, attract quality traffic, and grow your business.' },
            { url: '/local-seo-for-small-business', changefreq: 'weekly', priority: 0.9, title: 'Local SEO Services for Small Businesses | AbuQitmirLabs', description: 'Grow local visibility with expert Local SEO for small businesses, including Google Business Profile, local rankings, citations, and on-page optimization.' },
            { url: '/local-seo-citation-building', changefreq: 'weekly', priority: 0.8, title: 'Local SEO Citation Building | NAP Consistency Services | AbuQitmirLabs', description: 'Manual NAP citation building, audit & cleanup across top-tier directories. Boost local search rankings with consistent citations on Google, Yelp, Apple Maps & more. Start with a $150 audit.' },
            { url: '/white-label-local-seo', changefreq: 'weekly', priority: 0.8, title: 'White Label Local SEO for Agencies | Reseller Plans | AbuQitmirLabs', description: 'White label local SEO fulfillment for agencies — citations, GBP optimization, and branded PDF reports. Reseller plans with 35–50% margins. Expand your services without expanding your team.' },
            { url: '/local-seo-audit', changefreq: 'weekly', priority: 0.8, title: 'Free Local SEO Audit | Forensic Map Pack Analysis | AbuQitmirLabs', description: 'Free local SEO audit covering Google Business Profile, NAP citations, schema markup, and map-pack competitors. Get a prioritized action plan — not a jargon-filled deck.' },
            { url: '/guest-post-service', changefreq: 'weekly', priority: 0.8, title: 'Guest Post Service | High-Authority White-Hat Placements | AbuQitmirLabs', description: 'Editorial guest post placements on real, high-DR websites with organic search traffic. 100% manual outreach, in-content dofollow links, permanent indexation.' },
            { url: '/graphics-design', changefreq: 'weekly', priority: 0.8, title: 'Graphic Design Services for Brands & Businesses | AbuQitmirLabs', description: 'Professional graphic design services for brands and businesses: custom logos, brand identity, pitch decks, UI/UX, and marketing collateral with AbuQitmirLabs.' },
            { url: '/content-writing', changefreq: 'weekly', priority: 0.8, title: 'Content Writing Services | SEO Copywriting & Blogging | AbuQitmirLabs', description: 'AbuQitmirLabs provides professional content writing services — SEO blogs, website copy, landing pages, and long-form articles. Data-driven content that ranks and converts.' },
            { url: '/solutions/fintech', changefreq: 'weekly', priority: 0.8, title: 'FinTech Solutions for Digital Finance | AbuQitmirLabs', description: 'Build secure FinTech platforms, payment systems and digital finance experiences with AbuQitmirLabs for startups and growing businesses.' },
            { url: '/solutions/healthcare', changefreq: 'weekly', priority: 0.8, title: 'Healthcare Software Solutions | AbuQitmirLabs', description: 'Build secure healthcare software, patient portals, telemedicine platforms and clinical systems with AbuQitmirLabs for modern healthcare businesses.' },
            { url: '/solutions/ai-automation', changefreq: 'weekly', priority: 0.9, title: 'AI Automation Solutions | AbuQitmirLabs', description: 'Automate business workflows with AI agents, RAG, APIs and intelligent integrations. Build secure AI automation for startups and enterprises.' },
            { url: '/solutions/e-commerce', changefreq: 'weekly', priority: 0.9, title: 'E-commerce Software Solutions | Custom E-commerce Development', description: 'Engineer high-performance e-commerce software solutions, custom online stores, B2B wholesale portals, mobile shopping apps & multi-vendor marketplaces.' },
            { url: '/solutions/edtech', changefreq: 'weekly', priority: 0.9, title: 'EdTech Software Development | LMS & Learning Platforms', description: 'Build scalable EdTech software with custom LMS platforms, virtual classrooms, AI tutoring, student portals, assessments, and learning analytics.' },
            { url: '/case-studies', changefreq: 'weekly', priority: 0.9, title: 'Case Studies | Real-World Success Stories | AbuQitmirLabs', description: 'Explore real-world success stories from AbuQitmirLabs — custom software, AI automation, mobile apps, and web solutions that delivered measurable ROI for 350+ global clients.' },
            { url: '/case-studies/tajweedpage', changefreq: 'weekly', priority: 0.9, title: 'AI Quran Learning Platform Case Study | AbuQitmirLabs', description: 'How we built the world\'s first AI-powered Quran learning platform with RAG Tajweed teacher, SEO for 20+ countries, and full Next.js stack — in just 10 days.' },
            { url: '/us-market', changefreq: 'monthly', priority: 0.7, title: 'Software Development for US Startups | CCPA & HIPAA Ready | AbuQitmirLabs', description: 'US-focused software development for startups — mobile apps, AI agents, and local SEO. CCPA & HIPAA compliant, built at startup speed. Scale your US presence with offshore expertise.' },
            { url: '/uk-market', changefreq: 'monthly', priority: 0.7, title: 'Digital Transformation for UK Businesses | GDPR Compliant | AbuQitmirLabs', description: 'UK-focused digital transformation services — GDPR-compliant software, mobile apps, AI agents, and high-street local SEO. Built for British businesses, with full GMT working-day overlap.' },
            { url: '/pakistan-market', changefreq: 'monthly', priority: 0.7, title: 'Digital Transformation for Pakistan | Local SEO & Custom Software | AbuQitmirLabs', description: 'Karachi-based digital transformation for Pakistani businesses — local SEO, custom software, mobile apps, and Roman Urdu AI agents. PKR pricing, in-person meetings, same time zone.' },
            { url: '/canada-market', changefreq: 'monthly', priority: 0.7, title: 'Software Development for Canada | PIPEDA Compliant | AbuQitmirLabs', description: 'Canada-focused software development — PIPEDA-compliant apps, local SEO, and bilingual-ready platforms (EN/FR). Built for Canadian startups and enterprises, with EST/PST overlap.' },
            { url: '/poland-market', changefreq: 'monthly', priority: 0.7, title: 'Software Development for Poland | GDPR & EU Expansion | AbuQitmirLabs', description: 'Poland-focused software development — GDPR-compliant apps, AI agents, SaaS, and local SEO for Krakow/Warsaw. Built for Polish startups and EU expansion, with CET overlap.' },
            { url: '/australia-market', changefreq: 'monthly', priority: 0.7, title: 'Software Development for Australia | APP Compliant | AbuQitmirLabs', description: 'Australia-focused software development — APP-compliant apps, high-speed web, mobile apps, and AI agents. Built for Australian businesses with AEST-aligned delivery. Start your audit today.' },
            { url: '/blog', changefreq: 'daily', priority: 0.8, title: 'Tech Blog & AI Insights | AbuQitmirLabs', description: 'AbuQitmirLabs tech journal covers AI agents, custom software, web & mobile development, SEO, and digital transformation. Read expert insights, guides, and case studies.' },
            { url: '/news/latest', changefreq: 'weekly', priority: 0.8, title: 'Latest News | Company Updates & Press Releases | AbuQitmirLabs', description: 'AbuQitmirLabs newsroom — latest company updates, software launches, AI agent releases, and press announcements. Subscribe for monthly engineering and tech insights.' },
            { url: '/news/press-releases', changefreq: 'monthly', priority: 0.8, title: 'Press Releases | Corporate Announcements | AbuQitmirLabs', description: 'Official press releases and corporate announcements from AbuQitmirLabs software engineering studio in Karachi.' },
            { url: '/news/industry-insights', changefreq: 'weekly', priority: 0.8, title: 'Industry Insights | Technical Benchmarks & AI Architecture | AbuQitmirLabs', description: 'Industry insights from AbuQitmirLabs — technical breakdowns on AI RAG, GEO, HIPAA compliance, and low-latency full-stack design. Written by senior software architects.' },
            { url: '/news/all', changefreq: 'weekly', priority: 0.8, title: 'All News & Media Archive | AbuQitmirLabs', description: 'All news and media archive from AbuQitmirLabs — company announcements, press releases, product launches, and technical engineering insights. Browse our complete catalog.' },
            { url: '/website-contract', changefreq: 'weekly', priority: 0.8, title: 'Free Website Contract Template | Ownership Protection | AbuQitmirLabs', description: 'Download a free, ownership-protected website contract template. Includes domain ownership, support SLAs, tech stack disclosure, and exit terms. No strings attached.' },
            { url: '/terms', changefreq: 'yearly', priority: 0.3, title: 'Terms of Service | Client Agreement & IP Policy | AbuQitmirLabs', description: 'AbuQitmirLabs terms of service: agreement, IP, payment terms, and liability. Learn about client responsibilities and termination protocols for our software services.' },
            { url: '/privacy', changefreq: 'yearly', priority: 0.3, title: 'Privacy Policy | Data Protection & Compliance | AbuQitmirLabs', description: 'AbuQitmirLabs privacy policy: how we collect, use, and protect your data. Learn about our security measures, cookie use, and GDPR/APP compliance.' },
            { url: '/blog/content-calendar-strategy', changefreq: 'weekly', priority: 0.9, title: 'How to Build a Content Calendar That Gets Followed | AbuQitmirLabs', description: 'Content Calendar: A step-by-step guide to building a content calendar your team will actually follow. Includes templates, cadence recommendations, and tools.' },
            { url: '/blog/brand-strategy-vs-logo-design-pakistan-sme', changefreq: 'weekly', priority: 0.9, title: 'Brand Strategy vs Logo Design Pakistan | AbuQitmirLabs', description: 'Brand strategy vs logo design for Pakistani SMEs: real PKR pricing (PKR 3,000–50,000 vs PKR 80,000+), deliverables, and a founder decision matrix.' },
          ];

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
            } catch (cfgErr) {}

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
              }
            }
          } catch (err: any) {}

          const dynamicRoutes = fetchedPosts.map(post => ({
            url: `/blog/${post.slug}`,
            changefreq: 'weekly' as const,
            priority: 0.8,
            title: `${post.title} | AbuQitmirLabs Journal`,
            description: post.excerpt || 'Technical Insights from Shiraz Almadani.'
          }));

          const routes = [...baseRoutes, ...dynamicRoutes];

          if (!fs.existsSync(indexHtmlPath)) return;
          
          const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

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

          // Sitemap 0.9 & Google Search Console Standards Validator & Generator
          const VALID_CHANGEFREQS = new Set(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']);
          const DISALLOWED_PATHS = new Set(['/admin', '/google87984536fe5662da', '/404', '/spa-shell', '/login']);
          const defaultLastMod = '2026-10-25';

          const normalizeToAbsoluteCanonicalUrl = (rawInput: string): string | null => {
            if (!rawInput || typeof rawInput !== 'string') return null;
            let trimmed = rawInput.trim();
            if (!trimmed) return null;

            // Convert relative URLs or non-canonical domains to https://www.abuqitmirlabs.tech
            let pathname = '/';
            try {
              if (/^https?:\/\//i.test(trimmed)) {
                const parsed = new URL(trimmed);
                pathname = parsed.pathname || '/';
              } else {
                pathname = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
              }
            } catch {
              pathname = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
            }

            // Strip query strings, hashes, and trailing slashes (except root '/')
            pathname = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';

            // Reject disallowed or non-indexable paths (must match robots.txt Disallow rules)
            if (
              DISALLOWED_PATHS.has(pathname) ||
              pathname.startsWith('/admin/') ||
              pathname.startsWith('/api/')
            ) {
              return null;
            }

            // Resolve legacy aliases/redirects via canonicalRedirects
            const canonicalPathname = getCanonicalPath(pathname);
            if (canonicalPathname.startsWith('/blog/')) {
              const slug = canonicalPathname.slice('/blog/'.length);
              if (BLOG_SLUG_REDIRECTS[slug]) {
                return null;
              }
            }

            // Verify against SEO_ROUTES_METADATA canonical if defined
            const routeMeta = SEO_ROUTES_METADATA[canonicalPathname];
            if (routeMeta?.canonical) {
              const metaCanon = routeMeta.canonical.trim().replace(/\/+$/, '');
              const expectedCanon = `${hostname}${canonicalPathname === '/' ? '' : canonicalPathname}`;
              if (metaCanon !== expectedCanon) {
                // This route is an alias pointing to another primary canonical URL
                return normalizeToAbsoluteCanonicalUrl(metaCanon);
              }
            }

            const finalAbsoluteUrl = `${hostname}${canonicalPathname === '/' ? '' : canonicalPathname}`;

            // Final RFC-3986 / Sitemap 0.9 URL validation
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
            if (!canonicalLoc) return;
            const isRoot = canonicalLoc === hostname;
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

          // 1. Seed from existing public/sitemap.xml to preserve historical lastmod dates
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
                locMatch[1],
                freqMatch ? freqMatch[1] : 'weekly',
                prioMatch ? prioMatch[1] : '0.8',
                modMatch ? modMatch[1] : '2026-09-26'
              );
            }
          }

          // 2. Ensure all baseRoutes and dynamicRoutes are present with absolute URLs
          for (const route of routes) {
            upsertSitemapEntry(
              `${hostname}${route.url === '/' ? '' : route.url}`,
              route.changefreq,
              route.priority,
              defaultLastMod
            );
          }

          // 3. Ensure all canonical non-blog service routes from SEO_ROUTES_METADATA are present
          for (const [routePath, meta] of Object.entries(SEO_ROUTES_METADATA)) {
            if (DISALLOWED_PATHS.has(routePath) || routePath.startsWith('/blog/')) continue;
            const expectedCanon = `${hostname}${routePath === '/' ? '' : routePath}`;
            const routeCanon = (meta.canonical || expectedCanon).replace(/\/+$/, '');
            if (routeCanon === expectedCanon) {
              upsertSitemapEntry(expectedCanon, 'weekly', routePath === '/' ? 1.0 : 0.9, defaultLastMod);
            }
          }

          // 4. Ensure all primary canonical static blog posts from content/blog/*.md and STATIC_BLOG_POSTS with explicit slug are present
          for (const [slug, post] of Object.entries(STATIC_BLOG_POSTS)) {
            if (!post?.slug || BLOG_SLUG_REDIRECTS[slug]) continue;
            const cleanSlug = post.slug.trim();
            if (cleanSlug !== slug || BLOG_SLUG_REDIRECTS[cleanSlug]) continue;
            const postDate = post?.createdAt ? validateLastmod(post.createdAt) : defaultLastMod;
            upsertSitemapEntry(`${hostname}/blog/${cleanSlug}`, 'weekly', 0.9, postDate);
          }

          const contentBlogDir = path.resolve(process.cwd(), 'content/blog');
          if (fs.existsSync(contentBlogDir)) {
            const mdFiles = fs.readdirSync(contentBlogDir).filter((f) => f.endsWith('.md'));
            for (const file of mdFiles) {
              const articleSlug = file.replace(/\.md$/, '').trim();
              if (BLOG_SLUG_REDIRECTS[articleSlug]) continue;
              const post = STATIC_BLOG_POSTS[articleSlug];
              const postDate = post?.createdAt ? validateLastmod(post.createdAt) : defaultLastMod;
              upsertSitemapEntry(`${hostname}/blog/${articleSlug}`, 'weekly', 0.9, postDate);
            }
          }

          // 5. Ensure all programmatic SEO solution routes are present
          for (const pPage of programmaticSEOPages) {
            if (pPage.slug) {
              upsertSitemapEntry(`${hostname}/solutions/${pPage.slug}`, 'weekly', 0.9, '2026-10-19');
            }
          }

          // Build and validate final XML output against Sitemap 0.9 standards
          const validatedEntries = Array.from(sitemapEntriesMap.values());
          const sitemapXmlLines = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...validatedEntries.map(
              (entry) =>
                `<url><loc>${escapeXml(entry.loc)}</loc><changefreq>${entry.changefreq}</changefreq><priority>${entry.priority}</priority><lastmod>${entry.lastmod}</lastmod></url>`
            ),
            '</urlset>',
            ''
          ];
          const sitemapContent = sitemapXmlLines.join('\n');

          // Standards verification check before writing
          const invalidUrls = validatedEntries.filter((e) => !e.loc.startsWith('https://www.abuqitmirlabs.tech'));
          if (invalidUrls.length > 0) {
            throw new Error(`[Sitemap Validator] Found non-absolute or invalid domain URLs: ${invalidUrls.map((u) => u.loc).join(', ')}`);
          }

          // Write validated sitemap to dist, public, and root directories
          for (const targetSitemapPath of [
            sitemapPath,
            distPagesSitemapPath,
            publicSitemap,
            publicPagesSitemap,
            rootSitemap,
            rootPagesSitemap
          ]) {
            fs.writeFileSync(targetSitemapPath, sitemapContent, 'utf-8');
          }

          // Also refresh pre-compressed .gz and .br sitemap files in dist so CDNs never serve stale compressed sitemaps
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
            const safeDesc = route.description.replace(/"/g, '&quot;').replace(/&/g, '&amp;');
            
            routeHtml = routeHtml.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '').replace('</head>', `  <title data-rh="true">${safeTitle}</title>\n</head>`);
            routeHtml = routeHtml.replace(/<meta\b[^>]*property="og:title"[^>]*\/?>/gi, '').replace(/<meta\b[^>]*name="twitter:title"[^>]*\/?>/gi, '').replace('</head>', `  <meta data-rh="true" property="og:title" content="${safeTitle}" />\n  <meta data-rh="true" name="twitter:title" content="${safeTitle}" />\n</head>`);
            routeHtml = routeHtml.replace(/<meta\b[^>]*name="description"[^>]*\/?>/gi, '').replace(/<meta\b[^>]*property="og:description"[^>]*\/?>/gi, '').replace(/<meta\b[^>]*name="twitter:description"[^>]*\/?>/gi, '').replace('</head>', `  <meta data-rh="true" name="description" content="${safeDesc}" />\n  <meta data-rh="true" property="og:description" content="${safeDesc}" />\n  <meta data-rh="true" name="twitter:description" content="${safeDesc}" />\n</head>`);
            routeHtml = routeHtml.replace(/<meta\b[^>]*property="og:url"[^>]*\/?>/gi, '').replace(/<meta\b[^>]*name="twitter:url"[^>]*\/?>/gi, '').replace('</head>', `  <meta data-rh="true" property="og:url" content="${hostname}${route.url === '/' ? '/' : route.url}" />\n  <meta data-rh="true" name="twitter:url" content="${hostname}${route.url === '/' ? '/' : route.url}" />\n</head>`);
            routeHtml = routeHtml.replace(/<link\s+rel="canonical"[^>]*\/?>/gi, '').replace('</head>', `  <link rel="canonical" data-rh="true" href="${hostname}${route.url === '/' ? '/' : route.url}" />\n</head>`);
            
            const replaceRootElement = (htmlSource: string, newInnerHtml: string, renderedRouteAttr?: string) => {
              const startMatch = htmlSource.match(/<div\s+id=["']root["'][^>]*>/i);
              if (!startMatch || startMatch.index === undefined) return htmlSource;
              const startIdx = startMatch.index;
              const scriptOrBodyMatch = htmlSource.slice(startIdx).match(/(<script\b|<\/body>)/i);
              if (scriptOrBodyMatch && scriptOrBodyMatch.index !== undefined) {
                const segment = htmlSource.slice(startIdx, startIdx + scriptOrBodyMatch.index);
                const lastCloseDivIdx = segment.lastIndexOf('</div>');
                if (lastCloseDivIdx !== -1) {
                  const endIdx = startIdx + lastCloseDivIdx + '</div>'.length;
                  const attrStr = renderedRouteAttr ? ` data-rendered-route="${renderedRouteAttr}"` : '';
                  const newRoot = `<div id="root"${attrStr}>${newInnerHtml}</div>`;
                  return htmlSource.slice(0, startIdx) + newRoot + htmlSource.slice(endIdx);
                }
              }
              const attrStr = renderedRouteAttr ? ` data-rendered-route="${renderedRouteAttr}"` : '';
              return htmlSource.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root"${attrStr}>${newInnerHtml}</div>`);
            };

            if (route.url === '/') {
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '').replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(homeSchema, null, 2)}\n  </script>\n</head>`);
              routeHtml = replaceRootElement(routeHtml, homeInitialHtml, '/');
              fs.writeFileSync(indexHtmlPath, routeHtml);
              continue;
            }

            if (route.url === '/ai-agent-development') {
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '').replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(aiAgentSchema, null, 2)}\n  </script>\n</head>`);
              routeHtml = replaceRootElement(routeHtml, aiAgentInitialHtml, '/ai-agent-development');
              fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
              continue;
            }

            if (route.url === '/graphics-design') {
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '').replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(graphicsDesignSchema, null, 2)}\n  </script>\n</head>`);
              routeHtml = replaceRootElement(routeHtml, graphicsDesignInitialHtml, '/graphics-design');
              fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
              continue;
            }

            if (route.url === '/solutions/fintech') {
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '').replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(fintechSchema, null, 2)}\n  </script>\n</head>`);
              routeHtml = replaceRootElement(routeHtml, fintechInitialHtml, '/solutions/fintech');
              fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
              continue;
            }

            if (route.url === '/solutions/healthcare') {
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '').replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(healthcareSchema, null, 2)}\n  </script>\n</head>`);
              routeHtml = replaceRootElement(routeHtml, healthcareInitialHtml, '/solutions/healthcare');
              fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
              continue;
            }

            if (route.url === '/solutions/ai-automation') {
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '').replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(aiAutomationSchema, null, 2)}\n  </script>\n</head>`);
              routeHtml = replaceRootElement(routeHtml, aiAutomationInitialHtml, '/solutions/ai-automation');
              fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
              continue;
            }

            if (route.url === '/solutions/e-commerce') {
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '').replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(eCommerceSchema, null, 2)}\n  </script>\n</head>`);
              routeHtml = replaceRootElement(routeHtml, eCommerceInitialHtml, '/solutions/e-commerce');
              fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
              continue;
            }

            if (route.url === '/solutions/edtech') {
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '').replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(edTechSchema, null, 2)}\n  </script>\n</head>`);
              routeHtml = replaceRootElement(routeHtml, edTechInitialHtml, '/solutions/edtech');
              fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
              continue;
            }

            if (route.url === '/custom-software') {
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '').replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(customSoftwareSchema, null, 2)}\n  </script>\n</head>`);
              routeHtml = replaceRootElement(routeHtml, customSoftwareInitialHtml, '/custom-software');
              fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
              continue;
            }

            if (route.url === '/mobile-app-development') {
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '').replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(mobileAppSchema, null, 2)}\n  </script>\n</head>`);
              routeHtml = replaceRootElement(routeHtml, mobileAppInitialHtml, '/mobile-app-development');
              fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
              continue;
            }

            if (route.url === '/blog/custom-web-development-company') {
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '').replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(customWebDevBlogSchema, null, 2)}\n  </script>\n</head>`);
              routeHtml = replaceRootElement(routeHtml, customWebDevBlogInitialHtml, '/blog/custom-web-development-company');
              fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
              continue;
            }

            if (route.url === '/blog/content-calendar-strategy') {
              const seoMeta = SEO_ROUTES_METADATA['/blog/content-calendar-strategy'];
              if (seoMeta && seoMeta.schemaJsonLd) {
                routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '').replace('</head>', `  <script type="application/ld+json" data-rh="true">\n${JSON.stringify(seoMeta.schemaJsonLd, null, 2)}\n  </script>\n</head>`);
              }
              if (seoMeta && seoMeta.ogImage) {
                routeHtml = routeHtml
                  .replace(/<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/?>/gi, '')
                  .replace(/<meta\s+name="twitter:image"\s+content="[\s\S]*?"\s*\/?>/gi, '')
                  .replace(/<meta\s+property="og:type"\s+content="[\s\S]*?"\s*\/?>/gi, '')
                  .replace('</head>', `  <meta property="og:type" content="article" />\n  <meta property="og:image" content="${seoMeta.ogImage}" />\n  <meta name="twitter:image" content="${seoMeta.ogImage}" />\n</head>`);
              }
              const contentCalendarHtml = `<div class="min-h-screen bg-[#050505] text-white">${renderStaticHeader('/blog/content-calendar-strategy')}<main id="main-content" class="max-w-4xl mx-auto px-6 pt-36 pb-20"><h1 class="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-8 font-serif">How to Build a Content Calendar That Gets Followed</h1><article class="prose prose-invert max-w-none text-zinc-300"><h2>Quick Takeaways</h2><ul><li>Most content calendars fail because they are built on unrealistic expectations and lack of clear ownership, not because of a lack of tools.</li><li>A successful calendar requires a system: defining content pillars, setting a realistic cadence, and assigning clear owners.</li><li>You do not need expensive software. A shared Google Sheet or a simple Notion board is usually sufficient.</li><li>Build a content backlog to prevent last-minute scrambling and quality drops.</li></ul><h2>Why Most Content Calendars Fail</h2><p>Most content calendars fail because they are disconnected from actual production capacity. A calendar must account for the entire production cycle: ideation, research, drafting, editing, design, and publishing.</p><h2>The 6-Step Content Calendar Strategy</h2><h3>Step 1: Define Your Content Pillars</h3><h3>Step 2: Set a Realistic Publishing Cadence</h3><h3>Step 3: Assign Clear Ownership</h3><h3>Step 4: Build a Content Backlog</h3><h3>Step 5: Schedule and Integrate with SEO</h3><h3>Step 6: Review, Iterate, and Repurpose</h3><h2>The Content Calendar Template</h2><h2>Common Mistakes Founders Make with Content Calendars</h2><h2>Frequently Asked Questions</h2><h3>What is a content calendar strategy?</h3><p>A content calendar strategy is a systematic plan for creating, scheduling, and publishing content. It defines the topics, the target audience, the publishing frequency, and the team responsible for execution.</p><h3>How far in advance should I plan content?</h3><p>Plan your core themes and backlogs 3 months in advance. However, finalize specific publishing dates and drafts on a rolling 4-week basis to remain flexible to market changes.</p><h3>What tools are best for content calendars?</h3><p>Google Sheets, Notion, or Airtable are usually sufficient for small to mid-sized teams. For enterprise teams, tools like CoSchedule or Asana can help manage complex workflows.</p></article></main></div>`;
              routeHtml = replaceRootElement(routeHtml, contentCalendarHtml, '/blog/content-calendar-strategy');
              fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
              continue;
            }

            if (route.url === '/blog/brand-strategy-vs-logo-design-pakistan-sme') {
              const seoMeta = SEO_ROUTES_METADATA['/blog/brand-strategy-vs-logo-design-pakistan-sme'];
              if (seoMeta && seoMeta.schemaJsonLd) {
                routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '').replace('</head>', `  <script type="application/ld+json" data-rh="true">\n${JSON.stringify(seoMeta.schemaJsonLd, null, 2)}\n  </script>\n</head>`);
              }
              if (seoMeta && seoMeta.ogImage) {
                routeHtml = routeHtml
                  .replace(/<meta\b[^>]*property="og:image"[^>]*\/?>/gi, '')
                  .replace(/<meta\b[^>]*name="twitter:image"[^>]*\/?>/gi, '')
                  .replace(/<meta\b[^>]*property="og:type"[^>]*\/?>/gi, '')
                  .replace('</head>', `  <meta data-rh="true" property="og:type" content="article" />\n  <meta data-rh="true" property="og:image" content="${seoMeta.ogImage}" />\n  <meta data-rh="true" name="twitter:image" content="${seoMeta.ogImage}" />\n</head>`);
              }
              const brandStrategyHtml = `<div class="min-h-screen bg-[#050505] text-white">${renderStaticHeader('/blog/brand-strategy-vs-logo-design-pakistan-sme')}<main id="main-content" class="max-w-4xl mx-auto px-6 pt-36 pb-20"><h1 class="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-8 font-serif">Brand Strategy vs Logo Design Pakistan | AbuQitmirLabs</h1><article class="prose prose-invert max-w-none text-zinc-300"><h2>Introduction</h2><p>Most Pakistani SMEs treat branding as a one-time transaction. They hire a freelancer, pay PKR 10,000 for a visual mark, slap it on a website, and wonder why they cannot command premium prices or attract serious clients.</p><h2>Quick Verdict: The Difference in 50 Words</h2><p>A logo is a single visual mark that gives you a PNG and SVG. Brand strategy is the comprehensive system of positioning, typography, color palettes, and guidelines that tells you how to use that logo. In Pakistan, a logo costs PKR 3,000 to 50,000, while a full brand strategy starts at PKR 80,000.</p><h2>The Problem: Why SMEs Get This Wrong</h2><h2>What Is a Logo? (And What It Is Not)</h2><h2>What Is a Brand Strategy?</h2><h2 id="cost-comparison-pkr-pricing-for-pakistani-smes">Cost Comparison: PKR Pricing for Pakistani SMEs</h2><h2>The Decision Matrix: Logo or Strategy First?</h2><h2>Why Cheap Logos Hurt Your Business Long-Term</h2><h2>Frequently Asked Questions</h2><h3>What is the difference between a logo and brand strategy?</h3><p>A logo is a single visual mark. Brand strategy is the comprehensive plan that defines your positioning, target audience, brand voice, and visual identity system.</p><h3>How much does a logo cost in Pakistan?</h3><p>In Pakistan, a freelance logo design can range from PKR 3,000 to PKR 15,000. A professional design agency might charge between PKR 20,000 and PKR 50,000 for a comprehensive logo suite.</p><h3>How much does brand strategy cost in Pakistan?</h3><p>A full brand strategy and identity system for an SME in Pakistan typically starts around PKR 80,000 and can exceed PKR 250,000 depending on the agency's expertise, the depth of research, and the deliverables.</p><h2>Conclusion</h2></article></main></div>`;
              routeHtml = replaceRootElement(routeHtml, brandStrategyHtml, '/blog/brand-strategy-vs-logo-design-pakistan-sme');
              fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
              continue;
            }

            if (route.url === '/local-seo-for-small-business') {
              routeHtml = routeHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '').replace('</head>', `  <script type="application/ld+json">\n${JSON.stringify(localSEOSmallBusinessSchema, null, 2)}\n  </script>\n</head>`);
              routeHtml = replaceRootElement(routeHtml, localSEOSmallBusinessInitialHtml, '/local-seo-for-small-business');
              fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
              continue;
            }

            let articleContent = '';
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

            const fallbackPrerenderHtml = `<div class="min-h-screen bg-[#050505] text-white">${renderStaticHeader(route.url)}<main id="main-content" class="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-16"><h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">${route.title}</h1><article class="prose prose-invert max-w-none text-neutral-300">${articleContent}</article></main></div>`;
            routeHtml = replaceRootElement(routeHtml, fallbackPrerenderHtml, route.url);
            
            fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
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

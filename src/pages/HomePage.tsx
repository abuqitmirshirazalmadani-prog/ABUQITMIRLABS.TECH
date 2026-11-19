import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import TrustSection from '../components/TrustSection';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import VideoPortfolio, { portfolioVideos } from '../components/VideoPortfolio';
import WebDevelopmentPricing from '../components/WebDevelopmentPricing';
import HomeCaseStudiesSection from '../components/HomeCaseStudiesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection, { faqItems } from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import FeaturedToolsSection from '../components/FeaturedToolsSection';
import { db, collection, getDocs, query, where } from '../lib/firebase';
import { getStaticBlogList } from '../data/staticBlogPosts';
import { BLOG_SLUG_REDIRECTS, getCanonicalSlug } from '../data/canonicalRedirects';
import { resolveOptimizedCoverImage, getRemoteCoverFallback } from '../data/localCoverImageMap';
import { DEFAULT_BRAND_COVER } from './BlogPage';

interface HomeBlogHighlight {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  pillarPath: string;
  pillarLabel: string;
  date: string;
  createdAt: any;
  coverImage: string;
  coverImageAlt: string;
}

const parseDateToMillis = (timestamp: any): number => {
  if (!timestamp) return 0;
  try {
    if (typeof timestamp === 'number') return timestamp;
    if (timestamp && typeof timestamp.toDate === 'function') {
      return timestamp.toDate().getTime();
    }
    if (timestamp && typeof timestamp.seconds === 'number') {
      return timestamp.seconds * 1000;
    }
    const parsed = new Date(timestamp).getTime();
    return isNaN(parsed) ? 0 : parsed;
  } catch {
    return 0;
  }
};

const formatDateShort = (timestamp: any): string => {
  if (!timestamp) return 'RECENT';
  try {
    let date: Date;
    if (timestamp && typeof timestamp.toDate === 'function') {
      date = timestamp.toDate();
    } else if (timestamp && typeof timestamp.seconds === 'number') {
      date = new Date(timestamp.seconds * 1000);
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(timestamp.trim())) {
      date = new Date(`${timestamp.trim()}T00:00:00Z`);
    } else {
      date = new Date(timestamp);
    }
    if (isNaN(date.getTime())) return 'RECENT';
    return date
      .toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      })
      .toUpperCase();
  } catch {
    return 'RECENT';
  }
};

const formatCoverImage = (url?: string, width = 800, slug?: string): string => {
  const resolved = resolveOptimizedCoverImage(url, slug);
  if (!resolved || typeof resolved !== 'string' || resolved.trim() === '' || resolved.includes('logo.png')) {
    return DEFAULT_BRAND_COVER;
  }
  const cleanUrl = resolved.trim();
  if (cleanUrl.startsWith('https://www.abuqitmirlabs.tech/')) {
    return cleanUrl.replace('https://www.abuqitmirlabs.tech', '');
  }
  if (cleanUrl.includes('unsplash.com')) {
    return `${cleanUrl}&w=${width}&fm=webp`;
  }
  return cleanUrl;
};

const getPillarForPost = (slug: string, category?: string): { pillarPath: string; pillarLabel: string } => {
  const s = `${slug} ${category || ''}`.toLowerCase();
  if (s.includes('brand') || s.includes('logo') || s.includes('graphic') || s.includes('design-system')) {
    return { pillarPath: '/brand-building', pillarLabel: 'Brand Building Services' };
  }
  if (s.includes('ai') || s.includes('agent') || s.includes('rag') || s.includes('chatbot') || s.includes('llm')) {
    return { pillarPath: '/ai-agent-development', pillarLabel: 'AI Agent Development' };
  }
  if (s.includes('seo') || s.includes('content') || s.includes('lead-generation') || s.includes('roi') || s.includes('marketing')) {
    return { pillarPath: '/seo-mastery', pillarLabel: 'SEO & Growth Engineering' };
  }
  if (s.includes('mobile') || s.includes('flutter') || s.includes('react-native') || s.includes('ios') || s.includes('android')) {
    return { pillarPath: '/mobile-app-development', pillarLabel: 'Mobile App Development' };
  }
  if (s.includes('fintech') || s.includes('soc-2')) {
    return { pillarPath: '/solutions/fintech', pillarLabel: 'FinTech Software Solutions' };
  }
  if (s.includes('web') || s.includes('rtl') || s.includes('ux') || s.includes('react') || s.includes('nextjs') || s.includes('tools')) {
    return { pillarPath: '/web-development', pillarLabel: 'Web Development Services' };
  }
  return { pillarPath: '/custom-software', pillarLabel: 'Custom Software Development' };
};

const buildInitialLatestPosts = (): HomeBlogHighlight[] => {
  const staticList = getStaticBlogList() as any[];
  const seenSlugs = new Set<string>();
  const normalized: HomeBlogHighlight[] = [];

  for (const p of staticList) {
    const canonSlug = BLOG_SLUG_REDIRECTS[p.slug] || getCanonicalSlug(p.slug) || p.slug;
    const key = String(canonSlug).toLowerCase().trim();
    if (seenSlugs.has(key)) continue;
    seenSlugs.add(key);

    const cleanTitle = String(p.title || 'Untitled Article').replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '').trim();
    const cover = formatCoverImage(p.coverImage, 800, canonSlug);
    const pillar = getPillarForPost(canonSlug, p.category);
    const createdAt = p.createdAt || '2026-11-15';

    normalized.push({
      slug: canonSlug,
      title: cleanTitle,
      excerpt: p.excerpt || p.metaDescription || '',
      category: p.category || 'Development',
      pillarPath: pillar.pillarPath,
      pillarLabel: pillar.pillarLabel,
      date: typeof createdAt === 'string' ? createdAt : '2026-11-15',
      createdAt,
      coverImage: cover,
      coverImageAlt: p.coverImageAlt || `${cleanTitle} | AbuQitmirLabs`,
    });
  }

  normalized.sort((a, b) => parseDateToMillis(b.createdAt) - parseDateToMillis(a.createdAt));
  return normalized.slice(0, 6);
};

export default function HomePage() {
  const [latestPosts, setLatestPosts] = useState<HomeBlogHighlight[]>(() => buildInitialLatestPosts());

  useEffect(() => {
    let isMounted = true;
    const syncLatestFromFirestore = async () => {
      try {
        let rawDocs: any[] = [];
        try {
          const q = query(collection(db, 'posts'), where('published', '==', true));
          const snap = await getDocs(q);
          if (!snap.empty) rawDocs = snap.docs;
        } catch {
          // ignore
        }
        if (rawDocs.length === 0) {
          try {
            const fallbackSnap = await getDocs(collection(db, 'posts'));
            if (!fallbackSnap.empty) {
              rawDocs = fallbackSnap.docs.filter(doc => {
                const d = doc.data();
                return d.published === true || d.published === 'true' || d.published === undefined;
              });
            }
          } catch {
            // ignore
          }
        }
        if (!rawDocs.length || !isMounted) return;

        const staticList = getStaticBlogList() as any[];
        const staticBySlug = new Map<string, any>();
        for (const sp of staticList) {
          const cs = (BLOG_SLUG_REDIRECTS[sp.slug] || getCanonicalSlug(sp.slug) || sp.slug).toLowerCase().trim();
          staticBySlug.set(cs, sp);
        }

        const seenSlugs = new Set<string>();
        const merged: HomeBlogHighlight[] = [];

        for (const sp of staticList) {
          const canonSlug = BLOG_SLUG_REDIRECTS[sp.slug] || getCanonicalSlug(sp.slug) || sp.slug;
          const key = canonSlug.toLowerCase().trim();
          if (seenSlugs.has(key)) continue;
          seenSlugs.add(key);
          const cleanTitle = String(sp.title || 'Untitled Article').replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '').trim();
          const pillar = getPillarForPost(canonSlug, sp.category);
          merged.push({
            slug: canonSlug,
            title: cleanTitle,
            excerpt: sp.excerpt || sp.metaDescription || '',
            category: sp.category || 'Development',
            pillarPath: pillar.pillarPath,
            pillarLabel: pillar.pillarLabel,
            date: typeof sp.createdAt === 'string' ? sp.createdAt : '2026-11-15',
            createdAt: sp.createdAt || '2026-11-15',
            coverImage: formatCoverImage(sp.coverImage, 800, canonSlug),
            coverImageAlt: sp.coverImageAlt || `${cleanTitle} | AbuQitmirLabs`,
          });
        }

        for (const doc of rawDocs) {
          const data = doc.data();
          const rawSlug = data.slug || doc.id;
          let cleanSlug = String(rawSlug).replace(/^\/+/, '').replace(/^blog\//, '');
          cleanSlug = BLOG_SLUG_REDIRECTS[cleanSlug] || getCanonicalSlug(cleanSlug) || cleanSlug;
          const key = cleanSlug.toLowerCase().trim();
          if (seenSlugs.has(key)) continue;
          seenSlugs.add(key);

          const staticMatch = staticBySlug.get(key);
          const bestTitle = String(staticMatch?.title || data.title || 'Untitled Article')
            .replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '')
            .trim();
          const rawCover = staticMatch?.coverImage || data.coverImage || data.featuredImage || data.imageUrl || data.image;
          const pillar = getPillarForPost(cleanSlug, staticMatch?.category || data.category);
          const createdAt = staticMatch?.createdAt || data.createdAt || data.date || new Date().toISOString();

          merged.push({
            slug: cleanSlug,
            title: bestTitle,
            excerpt: staticMatch?.excerpt || data.excerpt || '',
            category: staticMatch?.category || data.category || 'Development',
            pillarPath: pillar.pillarPath,
            pillarLabel: pillar.pillarLabel,
            date: typeof createdAt === 'string' ? createdAt : '2026-11-15',
            createdAt,
            coverImage: formatCoverImage(rawCover, 800, cleanSlug),
            coverImageAlt: staticMatch?.coverImageAlt || data.coverImageAlt || `${bestTitle} | AbuQitmirLabs`,
          });
        }

        merged.sort((a, b) => parseDateToMillis(b.createdAt) - parseDateToMillis(a.createdAt));
        if (isMounted) {
          setLatestPosts(merged.slice(0, 6));
        }
      } catch {
        // fallback to static initial posts
      }
    };
    syncLatestFromFirestore();
    return () => {
      isMounted = false;
    };
  }, []);
  const growthEngineeringSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.abuqitmirlabs.tech/#organization",
        "name": "AbuQitmirLabs",
        "url": "https://www.abuqitmirlabs.tech/",
        "founder": {
          "@type": "Person",
          "name": "Abu Qitmir Mohammad Shiraz Al-Madani",
          "jobTitle": "Founder & Lead Systems Architect",
          "url": "https://www.linkedin.com/in/abu-qitmir-697423390/"
        },
        "foundingDate": "2021",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.abuqitmirlabs.tech/logo.png"
        },
        "image": "https://www.abuqitmirlabs.tech/images/hero-abuqitmirlabs.webp",
        "email": "hello@abuqitmirlabs.tech",
        "telephone": "+923233260859",
        "priceRange": "$$",
        "openingHours": "Mo-Fr 09:00-18:00",
        "description": "Karachi-based growth engineering firm for US, UK & global B2B companies. Custom software, AI agents & technical SEO — one revenue system.",
        "slogan": "We build revenue systems, not just software.",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "48",
          "bestRating": "5",
          "worstRating": "1"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Shahrah-e-Faisal, PECHS",
          "addressLocality": "Karachi",
          "addressRegion": "Sindh",
          "postalCode": "75400",
          "addressCountry": "PK"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 24.8607,
          "longitude": 67.0011
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+923233260859",
          "email": "hello@abuqitmirlabs.tech",
          "contactType": "sales and technical support",
          "areaServed": ["US", "GB", "SA", "AE", "QA", "KW", "CA", "AU", "PL", "PK"],
          "availableLanguage": ["English", "Urdu", "Arabic"]
        },
        "areaServed": ["PK", "US", "GB", "AE", "SA", "QA", "KW", "CA", "AU", "PL"],
        "knowsAbout": [
          "Growth Engineering",
          "Custom Software Development",
          "Web Application Development",
          "AI Agent Development",
          "Mobile App Development",
          "Technical SEO & GEO",
          "Brand Identity Design",
          "E-E-A-T Content Engineering"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/abuqitmirlabs",
          "https://x.com/AbuQitmir",
          "https://www.facebook.com/abuqitmirlabs",
          "https://www.linkedin.com/in/abu-qitmir-697423390/"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.abuqitmirlabs.tech/#website",
        "url": "https://www.abuqitmirlabs.tech/",
        "name": "AbuQitmirLabs",
        "publisher": {
          "@id": "https://www.abuqitmirlabs.tech/#organization"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://www.abuqitmirlabs.tech/#webpage",
        "url": "https://www.abuqitmirlabs.tech/",
        "name": "Custom Software, AI & SEO Engineering | AbuQitmirLabs",
        "description": "Karachi-based growth engineering firm for US, UK & global B2B companies. Custom software, AI agents & technical SEO — one revenue system. Free technical audit.",
        "author": {
          "@type": "Person",
          "name": "Abu Qitmir Mohammad Shiraz Al-Madani",
          "jobTitle": "Founder & Lead Systems Architect",
          "url": "https://www.linkedin.com/in/abu-qitmir-697423390/"
        },
        "isPartOf": {
          "@id": "https://www.abuqitmirlabs.tech/#website"
        },
        "about": {
          "@id": "https://www.abuqitmirlabs.tech/#organization"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Service",
        "@id": "https://www.abuqitmirlabs.tech/#growth-audit-service",
        "serviceType": "Growth Engineering",
        "name": "B2B Growth Engineering & Technical Infrastructure Audit",
        "provider": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
        "description": "Free 30-minute technical audit of your software, AI tools, and search traffic delivered as a clear action plan.",
        "url": "https://www.abuqitmirlabs.tech/growth-engineering",
        "areaServed": ["US", "GB", "CA", "AU", "SA", "AE", "QA", "KW", "PL", "PK"],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Free 30-minute technical and growth audit",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "Service",
        "@id": "https://www.abuqitmirlabs.tech/#service-custom-software",
        "serviceType": "Custom Software Development",
        "name": "Custom Software Development & Cloud Systems",
        "provider": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
        "description": "Custom B2B SaaS apps, cloud ERP tools, and secure API backends with 100% client code ownership.",
        "url": "https://www.abuqitmirlabs.tech/custom-software",
        "areaServed": ["US", "GB", "CA", "AU", "SA", "AE", "PK"]
      },
      {
        "@type": "Service",
        "@id": "https://www.abuqitmirlabs.tech/#service-web-development",
        "serviceType": "Web Development",
        "name": "Full-Stack Web Application Development (Next.js & React)",
        "provider": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
        "description": "Fast Next.js and React web apps built for sub-second page loads and high buyer conversion.",
        "url": "https://www.abuqitmirlabs.tech/web-development",
        "areaServed": ["US", "GB", "CA", "AU", "SA", "AE", "PK"]
      },
      {
        "@type": "Service",
        "@id": "https://www.abuqitmirlabs.tech/#service-ai-agents",
        "serviceType": "AI Agent Development",
        "name": "Autonomous AI Agent & RAG Development",
        "provider": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
        "description": "Custom AI agents, private RAG search pipelines, and smart workflow automation.",
        "url": "https://www.abuqitmirlabs.tech/ai-agent-development",
        "areaServed": ["US", "GB", "CA", "AU", "SA", "AE", "PK"]
      },
      {
        "@type": "Service",
        "@id": "https://www.abuqitmirlabs.tech/#service-mobile-apps",
        "serviceType": "Mobile App Development",
        "name": "Cross-Platform & Native Mobile App Development",
        "provider": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
        "description": "iOS and Android mobile apps built with Flutter and React Native.",
        "url": "https://www.abuqitmirlabs.tech/mobile-app-development",
        "areaServed": ["US", "GB", "CA", "AU", "SA", "AE", "PK"]
      },
      {
        "@type": "Service",
        "@id": "https://www.abuqitmirlabs.tech/#service-seo-mastery",
        "serviceType": "Search Engine Optimization",
        "name": "Technical SEO, Entity Graphs & AI Search Optimization",
        "provider": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
        "description": "Technical SEO audits, Schema.org JSON-LD setup, Local SEO citations, and AI search ranking.",
        "url": "https://www.abuqitmirlabs.tech/seo-mastery",
        "areaServed": ["US", "GB", "CA", "AU", "SA", "AE", "PK"]
      },
      {
        "@type": "Service",
        "@id": "https://www.abuqitmirlabs.tech/#service-brand-content",
        "serviceType": "Brand Identity & Technical Content",
        "name": "Brand Building, UI/UX Design & E-E-A-T Content Writing",
        "provider": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
        "description": "Clear brand identity systems, Figma UI design, and expert-reviewed technical articles.",
        "url": "https://www.abuqitmirlabs.tech/brand-building",
        "areaServed": ["US", "GB", "CA", "AU", "SA", "AE", "PK"]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.abuqitmirlabs.tech/#faq",
        "mainEntity": faqItems.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      },
      ...portfolioVideos.map((video) => ({
        "@type": "VideoObject",
        "@id": `https://www.abuqitmirlabs.tech/#video-${video.videoId}`,
        "name": `${video.title} | AbuQitmirLabs`,
        "description": video.desc,
        "thumbnailUrl": [
          `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
          `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`
        ],
        "uploadDate": video.uploadDate,
        "contentUrl": `https://www.youtube.com/watch?v=${video.videoId}`,
        "embedUrl": `https://www.youtube-nocookie.com/embed/${video.videoId}`,
        "publisher": {
          "@id": "https://www.abuqitmirlabs.tech/#organization"
        }
      }))
    ]
  };

  return (
    <main id="main-content" className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-white/20 selection:text-white">
      <SEO
        title="Custom Software, AI & SEO Engineering | AbuQitmirLabs"
        description="Growth Engineering Firm for US, UK & global B2B companies. Custom software, AI agents & technical SEO as one revenue system. Free technical audit."
        canonical="https://www.abuqitmirlabs.tech/"
        ogTitle="Custom Software, AI & SEO Engineering | AbuQitmirLabs"
        ogDescription="Growth Engineering Firm for US, UK & global B2B companies. Custom software, AI agents & technical SEO as one revenue system. Free technical audit."
        ogImage="https://www.abuqitmirlabs.tech/images/hero-abuqitmirlabs.webp"
        ogImageAlt="AbuQitmirLabs Growth Engineering Firm — Custom Software, AI & Technical SEO"
        ogType="website"
        twitterCard="summary_large_image"
        twitterTitle="Custom Software, AI & SEO Engineering | AbuQitmirLabs"
        twitterDescription="Growth Engineering Firm for US, UK & global B2B companies. Custom software, AI agents & technical SEO as one revenue system. Free technical audit."
        twitterImage="https://www.abuqitmirlabs.tech/images/hero-abuqitmirlabs.webp"
        schema={growthEngineeringSchema}
      />

      <Header />

      <HeroSection />

      <TrustSection />

      {/* Three Core Commercial Funnels: Build Software, Automate with AI, Grow Demand */}
      <section className="py-20 md:py-28 bg-[#060606] border-y border-white/5 relative overflow-hidden" id="authority-narrative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(204,255,0,0.07),transparent_50%),radial-gradient(circle_at_85%_80%,rgba(0,102,255,0.07),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl space-y-4"
          >
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#ccff00] font-bold">
              Core Growth Pillars. Lead Architect: Abu Qitmir. Founded in <time dateTime="2021">2021</time>.
            </p>
            <h2 className="text-3xl sm:text-5xl font-serif italic text-white font-light tracking-tight leading-tight">
              Three Integrated Funnels: Build Software. Automate with AI. Grow Demand.
            </h2>
            <p className="text-neutral-300 font-sans leading-relaxed text-base md:text-lg font-light">
              Most companies hire three separate vendors for code, AI tools, and search traffic. Those teams rarely talk to each other. Code breaks your search rankings. Ad clicks land on slow pages. At <strong>AbuQitmirLabs</strong>, one senior team builds your whole growth system. You can hire us for one clear milestone or a full revenue platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="space-y-4 bg-[#0a0a09] border border-white/10 hover:border-[#ccff00]/50 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(204,255,0,0.16)] transition-all duration-500 rounded-2xl p-7 group"
            >
              <p className="text-xs font-mono text-[#ccff00] font-bold border-b border-white/10 pb-3">01 / BUILD SOFTWARE.</p>
              <h3 className="text-xl font-sans font-bold text-white group-hover:text-[#ccff00] transition-colors tracking-tight">
                Custom Software, Web &amp; Mobile Engineering
              </h3>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm font-light">
                We build custom SaaS products, fast Next.js web apps, and iOS or Android mobile apps. Every line of code is clean and tested. You get 100% source code and IP ownership on day one.
              </p>
              <div className="pt-2 space-y-2 text-xs font-mono">
                <Link to="/custom-software" className="text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  Custom Software Development →
                </Link>
                <Link to="/web-development" className="text-zinc-300 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  Full-Stack Web Development →
                </Link>
                <Link to="/mobile-app-development" className="text-zinc-400 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  Mobile App Development →
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-4 bg-[#0a0a09] border border-white/10 hover:border-[#ccff00]/50 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(204,255,0,0.16)] transition-all duration-500 rounded-2xl p-7 group"
            >
              <p className="text-xs font-mono text-[#ccff00] font-bold border-b border-white/10 pb-3">02 / AUTOMATE WITH AI.</p>
              <h3 className="text-xl font-sans font-bold text-white group-hover:text-[#ccff00] transition-colors tracking-tight">
                Autonomous AI Agents, RAG &amp; Workflow Automation
              </h3>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm font-light">
                We build smart AI agents and private RAG search tools that connect to your company data. Our AI tools answer buyer questions, score CRM leads, and run daily tasks safely.
              </p>
              <div className="pt-2 space-y-2 text-xs font-mono">
                <Link to="/ai-agent-development" className="text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  AI Agent &amp; RAG Development →
                </Link>
                <Link to="/solutions/ai-automation" className="text-zinc-300 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  Enterprise AI Workflow Automation →
                </Link>
                <Link to="/tools/ai-readiness-score" className="text-zinc-400 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  Check Your AI Readiness Score →
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="space-y-4 bg-[#0a0a09] border border-white/10 hover:border-[#ccff00]/50 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(204,255,0,0.16)] transition-all duration-500 rounded-2xl p-7 group"
            >
              <p className="text-xs font-mono text-[#ccff00] font-bold border-b border-white/10 pb-3">03 / GROW DEMAND.</p>
              <h3 className="text-xl font-sans font-bold text-white group-hover:text-[#ccff00] transition-colors tracking-tight">
                Technical SEO, Programmatic SEO &amp; Growth Engineering
              </h3>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm font-light">
                We grow your steady search traffic with technical SEO, Schema.org data graphs, and helpful content. Your brand ranks higher on Google Search, AI Overviews, ChatGPT, and Perplexity.
              </p>
              <div className="pt-2 space-y-2 text-xs font-mono">
                <Link to="/seo-mastery" className="text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  Technical &amp; Semantic SEO Mastery →
                </Link>
                <Link to="/growth-engineering" className="text-zinc-300 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  B2B Growth Engineering Systems →
                </Link>
                <Link to="/local-seo-for-small-business" className="text-zinc-400 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  Local SEO &amp; Citation Building →
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-[#0a0a09] border border-white/10 hover:border-[#ccff00]/30 transition-all duration-500 rounded-2xl p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-8 space-y-3">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#ccff00] font-bold">
                04 / DELIVERY GOVERNANCE &amp; VERIFIED CASE STUDIES.
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif italic text-white">
                Structured 5-Step Delivery Process &amp; Production Proof
              </h2>
              <p className="text-neutral-300 font-sans text-sm md:text-base leading-relaxed font-light">
                Every project follows our clear five-step plan. We start with discovery and design wireframes. Then we run two-week coding sprints, test every feature, and hand over your full GitHub code repo. You always see real progress each week.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/about/our-process" className="text-xs font-mono bg-white/10 hover:bg-[#ccff00] hover:text-black text-white px-4 py-2 transition-colors uppercase font-bold tracking-wider">
                  Review Our 5-Step Process →
                </Link>
                <Link to="/case-studies/tajweedpage" className="text-xs font-mono border border-white/20 hover:border-[#ccff00] text-neutral-300 hover:text-[#ccff00] px-4 py-2 transition-colors uppercase font-bold tracking-wider">
                  Read TajweedPage.com Case Study →
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4 bg-zinc-950 border border-white/10 rounded-xl p-6 space-y-2">
              <p className="text-xs font-mono text-[#ccff00] font-bold uppercase tracking-wider">100% IP &amp; Source Code Ownership.</p>
              <p className="text-sm font-sans text-white font-semibold">Zero Vendor Lock-In.</p>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                You receive full GitHub repos, cloud setup files, and database schemas when each milestone finishes.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="pt-8 border-t border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-8 space-y-3">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#ccff00] font-bold">
                05 / GLOBAL DELIVERY FOOTPRINT.
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif italic text-white">
                Why US, UK &amp; Global Clients Partner With Our Karachi Studio
              </h2>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm md:text-base font-light">
                Founded in 2021 in Karachi, Pakistan, AbuQitmirLabs blends top global code quality with fair pricing. You work directly with senior software leads. We overlap hours with US, UK, and Gulf teams every day on Slack, GitHub, and Zoom.
              </p>
            </div>
            <div className="lg:col-span-4 bg-[#0a0a09] border border-white/10 hover:border-[#ccff00]/40 transition-all duration-500 rounded-2xl p-6 space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ccff00] font-bold">ENGINEERING HUB.</p>
              <h3 className="text-lg font-serif italic text-white">Karachi, Pakistan</h3>
              <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                Founded 2021. Security-first code. 100% GitHub repo handover.
              </p>
              <Link to="/about/our-company" className="text-xs font-mono text-[#ccff00] hover:underline uppercase tracking-wider block pt-1">
                Learn About Our Studio →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <FeaturedToolsSection />

      <ServicesSection />

      <ProcessSection />

      <VideoPortfolio />

      <WebDevelopmentPricing />

      <HomeCaseStudiesSection />

      <TestimonialsSection />

      {/* Latest from the Blog */}
      <section id="latest-blog-insights" className="py-20 bg-[#070707] border-t border-white/10 px-6 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(204,255,0,0.06),transparent_50%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div className="max-w-3xl space-y-3">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C8EB5F] font-bold">
                Engineering Journal &amp; B2B Playbooks.
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white tracking-tight">
                Latest from the Blog: Software, AI &amp; SEO Insights
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                Read practical guides, checklists, and cost benchmarks written by our senior engineers in Karachi.
              </p>
            </div>
            <div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-[#C8EB5F] text-white hover:text-black border border-white/15 font-mono text-xs uppercase tracking-wider font-bold transition-all"
              >
                View All Engineering Articles →
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {latestPosts.map((post, idx) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="flex flex-col justify-between group"
              >
                <div>
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-6 border border-white/10 bg-zinc-900 group-hover:border-white/25 transition-colors shadow-lg">
                      <img
                        src={post.coverImage}
                        alt={post.coverImageAlt || post.title}
                        width="800"
                        height="500"
                        loading={idx < 3 ? 'eager' : 'lazy'}
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const remoteFallback = getRemoteCoverFallback(post.coverImage, post.slug);
                          if (remoteFallback && target.src !== remoteFallback && !target.dataset.retriedRemote) {
                            target.dataset.retriedRemote = 'true';
                            target.src = remoteFallback;
                          } else if (target.src !== DEFAULT_BRAND_COVER) {
                            target.src = DEFAULT_BRAND_COVER;
                          }
                        }}
                      />
                    </div>
                  </Link>

                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3 px-2">
                    <span className="text-blue-500">{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    <time dateTime={post.date}>{formatDateShort(post.createdAt)}</time>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase leading-[1.15] tracking-tight font-serif group-hover:text-blue-400 transition-colors px-2 mb-3">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  {post.excerpt && (
                    <p className="text-zinc-400 text-sm font-medium leading-relaxed px-2 line-clamp-2 mb-5">
                      {post.excerpt}
                    </p>
                  )}
                </div>

                <div className="pt-3 px-2 flex items-center justify-between gap-3">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-400 group-hover:translate-x-1 transition-transform"
                  >
                    Read Article <ArrowRight size={14} />
                  </Link>
                  <Link
                    to={post.pillarPath}
                    className="text-[11px] font-mono text-zinc-400 hover:text-white underline decoration-white/20 transition-colors"
                  >
                    {post.pillarLabel}
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      <ContactSection />

      {/* E-E-A-T Author Attribution, Credentials, Trust Signals & YMYL Disclaimer */}
      <section id="eeat-editorial-attribution" aria-label="Author Attribution, Credentials, Trust Signals and Disclaimer" className="bg-[#080808] border-t border-white/10 py-16 px-6 text-neutral-300">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-zinc-950 border border-white/10 rounded-2xl p-8">
            <div className="lg:col-span-7 space-y-4 author-bio" itemScope itemType="https://schema.org/Person">
              <p className="text-xs font-mono uppercase tracking-widest text-[#ccff00] font-bold">
                Editorial &amp; Technical Attribution.
              </p>
              <div className="author-byline text-base sm:text-lg text-white font-bold">
                Written and reviewed by{' '}
                <a
                  href="https://www.linkedin.com/in/abu-qitmir-697423390/"
                  rel="author noopener noreferrer"
                  target="_blank"
                  itemProp="url"
                  className="text-[#ccff00] underline hover:text-white"
                >
                  <span itemProp="name">Abu Qitmir Mohammad Shiraz Al-Madani</span>
                </a>
                {' '}— <span itemProp="jobTitle" className="author-credentials">Founder &amp; Lead Systems Architect, B.S. Software Engineering (+5 Years Experience)</span>.
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed" itemProp="description">
                <strong>About the Author:</strong> Abu Qitmir is a senior software architect and growth engineer based in Karachi, Pakistan. Since founding AbuQitmirLabs in 2021, he has led custom web, mobile, AI agent, and technical SEO builds for B2B teams in the US, UK, Saudi Arabia, UAE, and Pakistan. He personally checks all system designs, code security standards, and technical guides published on this site.
              </p>
              <p className="text-xs text-neutral-400 font-mono">
                Last fact-checked and updated: <time dateTime="2026-11-10">November 10, 2026</time> &bull; <Link to="/editorial-policy" className="text-[#ccff00] underline">Read Our Editorial Policy</Link> &bull; <Link to="/about/our-team" className="text-[#ccff00] underline">Meet Our Engineering Team</Link>.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-4 trust-signals bg-black/70 border border-white/10 rounded-xl p-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#ccff00] font-bold">
                Verified Trust Signals &amp; Reviews
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
                <li><strong>4.9 / 5.0 Client Rating:</strong> Verified across 48 client reviews on Google Business Profile, Clutch.co, and GoodFirms.</li>
                <li><strong>Security &amp; Compliance Ready:</strong> Engineered with OWASP, SOC 2 Type II, HIPAA, GDPR, and Saudi PDPL best practices.</li>
                <li><strong>100% Client IP Guarantee:</strong> Written legal contract and full GitHub source code handover on every milestone.</li>
                <li><strong>Verified Entity:</strong> Registered studio at Shahrah-e-Faisal, PECHS, Karachi, Pakistan (+92 323 3260859).</li>
              </ul>
            </div>
          </div>

          <aside id="disclaimer" role="note" aria-label="Legal and Financial Disclaimer" className="disclaimer bg-zinc-950/80 border border-white/10 rounded-xl p-6 text-xs sm:text-sm text-neutral-400 leading-relaxed">
            <p>
              <strong className="text-white">Disclaimer:</strong> All software cost ranges, project timelines, ROI examples, and compliance checklists on this website are provided for general informational and educational purposes only. They do not constitute formal legal, financial, tax, or regulatory compliance advice. Actual software build costs, search rankings, and business results vary based on your project scope, market competition, and team operations. Always consult a qualified legal or compliance professional before deploying software in regulated healthcare, finance, or government sectors.
            </p>
          </aside>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta-section" className="bg-[#090908] border-t border-zinc-900 py-20 px-6 text-white text-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(204,255,0,0.08),transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 italic tracking-tight">
            Book a Technical Discovery Call
          </h2>
          <p className="text-zinc-400 mb-10 text-sm md:text-base font-sans">
            Book a free 30-minute call with our senior engineering leads. We reply within 24 business hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#ccff00] text-black hover:bg-white hover:scale-105 font-mono text-xs font-bold tracking-[0.14em] uppercase px-8 py-4 rounded-full transition-all duration-300 h-14 shadow-[0_0_25px_rgba(204,255,0,0.2)]"
            >
              Book a Discovery Call
            </Link>
            <a
              id="cta-whatsapp-link"
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#25d366]/10 text-[#25d366] hover:bg-[#25d366]/20 font-sans text-xs tracking-[0.14em] uppercase border border-[#25d366]/20 px-8 py-4 rounded-full transition-all duration-300 h-14"
              aria-label="Message AbuQitmirLabs on WhatsApp"
            >
              <span className="normal-case">WhatsApp (+92 323 3260859)</span>
            </a>
            <a
              id="cta-email-link-corporate"
              href="mailto:hello@abuqitmirlabs.tech"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white/5 text-zinc-200 hover:bg-white/10 font-sans text-xs tracking-[0.14em] uppercase border border-white/20 px-8 py-3.5 rounded-full transition-all duration-300"
              aria-label="Send email to hello@abuqitmirlabs.tech"
            >
              <span className="normal-case font-mono font-medium tracking-tight">hello@abuqitmirlabs.tech</span>
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

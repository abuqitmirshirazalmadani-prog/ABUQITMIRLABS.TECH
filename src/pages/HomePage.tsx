import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Star, ShieldCheck, ArrowRight, CheckCircle2, Code2, Cpu, Globe2, Layers, Search, Sparkles, Terminal, Smartphone } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import TrustSection from '../components/TrustSection';
import ApproachSection from '../components/ApproachSection';
import DifferentiatorsSection from '../components/DifferentiatorsSection';
import ImpactSection from '../components/ImpactSection';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import CountryMarquee from '../components/CountryMarquee';
import TechStackSection from '../components/TechStackSection';
import VideoPortfolio, { portfolioVideos } from '../components/VideoPortfolio';
import InteractivePortfolio from '../components/InteractivePortfolio';
import WebDevelopmentPricing from '../components/WebDevelopmentPricing';
import HomeCaseStudiesSection from '../components/HomeCaseStudiesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection, { faqItems } from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import FeaturedToolsSection from '../components/FeaturedToolsSection';

const latestBlogHighlights = [
  {
    slug: 'brand-audit-checklist-pakistan',
    title: 'Brand Audit Checklist for Pakistani Businesses: 35-Point Diagnostic (2026)',
    excerpt: 'Score your brand positioning, visual identity, website conversion, and social presence across 35 weighted checkpoints in under 60 minutes.',
    category: 'Brand Building',
    pillarPath: '/brand-building',
    pillarLabel: 'Brand Building Services',
    date: '2026-04-20',
    readTime: '18 min read',
  },
  {
    slug: 'offshore-software-development-saudi-arabia',
    title: 'Offshore Software Development for Saudi Arabia: Save 40–60% (2026 Guide)',
    excerpt: 'Compare Riyadh/Jeddah local hiring vs. Karachi offshore engineering squads, Saudi PDPL compliance, Arabic RTL architecture, and SAR cost models.',
    category: 'Custom Software',
    pillarPath: '/custom-software',
    pillarLabel: 'Custom Software Development',
    date: '2026-04-18',
    readTime: '16 min read',
  },
  {
    slug: 'soc-2-fintech-startups',
    title: 'SOC 2 for Fintech Startups: The Engineering Architecture Checklist (2026)',
    excerpt: 'How seed and Series A fintech founders implement SOC 2 Type II controls, RBAC, immutable audit logs, and zero-trust CI/CD pipelines from day one.',
    category: 'FinTech Engineering',
    pillarPath: '/solutions/fintech',
    pillarLabel: 'FinTech Software Solutions',
    date: '2026-04-16',
    readTime: '15 min read',
  },
  {
    slug: 'build-brand-on-social-media',
    title: 'How to Build a Brand on Social Media: 17 Proven B2B & Consumer Strategies',
    excerpt: 'A tactical blueprint for turning fragmented social media posts into a compounding brand authority and inbound demand engine.',
    category: 'Digital Growth',
    pillarPath: '/digital-marketing',
    pillarLabel: 'Digital Marketing Services',
    date: '2026-04-17',
    readTime: '19 min read',
  },
  {
    slug: 'ai-integration-with-legacy-systems-the-complete-2026-guide',
    title: 'AI Integration with Legacy Systems: The Complete Enterprise 2026 Guide',
    excerpt: 'Connect autonomous LLM and RAG agents to existing SQL databases, ERPs, and mainframes using secure middleware without downtime.',
    category: 'AI Engineering',
    pillarPath: '/ai-agent-development',
    pillarLabel: 'AI Agent Development',
    date: '2026-03-14',
    readTime: '14 min read',
  },
  {
    slug: 'flutter-vs-react-native-choosing-mobile-app-stack-2026',
    title: 'Flutter vs React Native in 2026: Choosing the Right Mobile App Stack',
    excerpt: 'Architectural comparison of rendering engines, 120fps performance, native bridges, and total cost of ownership for iOS and Android apps.',
    category: 'Mobile Engineering',
    pillarPath: '/mobile-app-development',
    pillarLabel: 'Mobile App Development',
    date: '2026-03-10',
    readTime: '13 min read',
  },
];

export default function HomePage() {

  const growthEngineeringSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // NODE 1: Organization & LocalBusiness (Unified Entity)
      {
        "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
        "@id": "https://www.abuqitmirlabs.tech/#organization",
        "name": "AbuQitmirLabs",
        "url": "https://www.abuqitmirlabs.tech/",
        "founder": {
          "@type": "Person",
          "name": "Abu Qitmir Mohammad Shiraz Al-Madani",
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
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "description": "Karachi-based growth engineering firm for US, UK & global B2B companies. Custom software, AI agents & technical SEO — one revenue system.",
        "slogan": "We build revenue systems, not just software.",
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

      // NODE 2: WebSite
      {
        "@type": "WebSite",
        "@id": "https://www.abuqitmirlabs.tech/#website",
        "url": "https://www.abuqitmirlabs.tech/",
        "name": "AbuQitmirLabs",
        "publisher": {
          "@id": "https://www.abuqitmirlabs.tech/#organization"
        }
      },

      // NODE 3: WebPage
      {
        "@type": "WebPage",
        "@id": "https://www.abuqitmirlabs.tech/#webpage",
        "url": "https://www.abuqitmirlabs.tech/",
        "name": "Growth Engineering Firm | Custom Software, AI & SEO | AbuQitmirLabs",
        "description": "Karachi-based growth engineering firm for US, UK & global B2B companies. Custom software, AI agents & technical SEO — one revenue system. Free technical audit.",
        "isPartOf": {
          "@id": "https://www.abuqitmirlabs.tech/#website"
        },
        "about": {
          "@id": "https://www.abuqitmirlabs.tech/#organization"
        },
        "inLanguage": "en-US"
      },

      // NODE 4: Service 1 — Growth Infrastructure Audit & Growth Engineering
      {
        "@type": "Service",
        "@id": "https://www.abuqitmirlabs.tech/#growth-audit-service",
        "serviceType": "Growth Engineering",
        "name": "B2B Growth Engineering & Technical Infrastructure Audit",
        "provider": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
        "description": "Complimentary technical audit of your software architecture, AI automation readiness, and search attribution stack delivered as an actionable B2B revenue roadmap.",
        "url": "https://www.abuqitmirlabs.tech/growth-engineering",
        "areaServed": ["US", "GB", "CA", "AU", "SA", "AE", "QA", "KW", "PL", "PK"],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Complimentary initial 30-minute technical & growth infrastructure audit",
          "availability": "https://schema.org/InStock"
        }
      },

      // NODE 5: Service 2 — Custom Software Development
      {
        "@type": "Service",
        "@id": "https://www.abuqitmirlabs.tech/#service-custom-software",
        "serviceType": "Custom Software Development",
        "name": "Custom Software Development & Enterprise Architecture",
        "provider": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
        "description": "Bespoke B2B SaaS platforms, multi-tenant cloud ERPs, HIPAA/SOC2-ready portals, and API middleware with 100% client IP ownership.",
        "url": "https://www.abuqitmirlabs.tech/custom-software",
        "areaServed": ["US", "GB", "CA", "AU", "SA", "AE", "PK"]
      },

      // NODE 6: Service 3 — Web Application Development
      {
        "@type": "Service",
        "@id": "https://www.abuqitmirlabs.tech/#service-web-development",
        "serviceType": "Web Development",
        "name": "Full-Stack Web Application Development (Next.js & React)",
        "provider": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
        "description": "High-speed Jamstack, headless CMS, and full-stack Next.js web applications engineered for sub-second Core Web Vitals and conversion.",
        "url": "https://www.abuqitmirlabs.tech/web-development",
        "areaServed": ["US", "GB", "CA", "AU", "SA", "AE", "PK"]
      },

      // NODE 7: Service 4 — AI Agent & RAG Development
      {
        "@type": "Service",
        "@id": "https://www.abuqitmirlabs.tech/#service-ai-agents",
        "serviceType": "AI Agent Development",
        "name": "Autonomous AI Agent & Enterprise RAG Development",
        "provider": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
        "description": "Custom LLM agents, private Retrieval-Augmented Generation (RAG) pipelines, and autonomous multi-step workflow automation.",
        "url": "https://www.abuqitmirlabs.tech/ai-agent-development",
        "areaServed": ["US", "GB", "CA", "AU", "SA", "AE", "PK"]
      },

      // NODE 8: Service 5 — Mobile App Development
      {
        "@type": "Service",
        "@id": "https://www.abuqitmirlabs.tech/#service-mobile-apps",
        "serviceType": "Mobile App Development",
        "name": "Cross-Platform & Native Mobile App Development (Flutter & React Native)",
        "provider": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
        "description": "iOS and Android mobile applications engineered with Flutter, React Native, Swift, and Kotlin with full App Store and Google Play deployment.",
        "url": "https://www.abuqitmirlabs.tech/mobile-app-development",
        "areaServed": ["US", "GB", "CA", "AU", "SA", "AE", "PK"]
      },

      // NODE 9: Service 6 — Technical SEO & GEO Mastery
      {
        "@type": "Service",
        "@id": "https://www.abuqitmirlabs.tech/#service-seo-mastery",
        "serviceType": "Search Engine Optimization",
        "name": "Technical SEO, Semantic Entity Graphs & Generative Engine Optimization (GEO)",
        "provider": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
        "description": "Forensic technical SEO audits, Schema.org JSON-LD entity engineering, Local SEO citation building, and AI search optimization.",
        "url": "https://www.abuqitmirlabs.tech/seo-mastery",
        "areaServed": ["US", "GB", "CA", "AU", "SA", "AE", "PK"]
      },

      // NODE 10: Service 7 — Brand Identity, UI/UX & E-E-A-T Content
      {
        "@type": "Service",
        "@id": "https://www.abuqitmirlabs.tech/#service-brand-content",
        "serviceType": "Brand Identity & Technical Content Engineering",
        "name": "Brand Building, UI/UX Design & E-E-A-T Technical Content Writing",
        "provider": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
        "description": "Conversion-engineered brand identity systems, Figma design systems, and senior-reviewed E-E-A-T technical content clusters.",
        "url": "https://www.abuqitmirlabs.tech/brand-building",
        "areaServed": ["US", "GB", "CA", "AU", "SA", "AE", "PK"]
      },

      // NODE 11: FAQPage (10 Conversational AEO Questions & 40-60 Word Answers)
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

      // NODES 12–17: 6 VideoObject Nodes for Homepage YouTube Portfolio
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
        title="Growth Engineering Firm | Custom Software, AI & SEO | AbuQitmirLabs"
        description="Growth Engineering Firm for US, UK & global B2B companies. Custom software, AI agents & technical SEO as one revenue system. Free technical audit."
        canonical="https://www.abuqitmirlabs.tech/"
        ogTitle="Growth Engineering Firm | Custom Software, AI & SEO | AbuQitmirLabs"
        ogDescription="Growth Engineering Firm for US, UK & global B2B companies. Custom software, AI agents & technical SEO as one revenue system. Free technical audit."
        ogImage="https://www.abuqitmirlabs.tech/images/hero-abuqitmirlabs.webp"
        ogImageAlt="AbuQitmirLabs Growth Engineering Firm — Custom Software, AI & Technical SEO"
        ogType="website"
        twitterCard="summary_large_image"
        twitterTitle="Growth Engineering Firm | Custom Software, AI & SEO | AbuQitmirLabs"
        twitterDescription="Growth Engineering Firm for US, UK & global B2B companies. Custom software, AI agents & technical SEO as one revenue system. Free technical audit."
        twitterImage="https://www.abuqitmirlabs.tech/images/hero-abuqitmirlabs.webp"
        schema={growthEngineeringSchema}
      />

      <Header />
      
      <HeroSection />
      
      {/* Dynamic Animated Marquee Ribbon */}
      <div className="relative w-full overflow-hidden py-3 bg-black animate-enter">
        <div className="overflow-hidden bg-[#B9FF66] w-full border-y-2 border-black py-4 relative">
          <div className="flex whitespace-nowrap w-max animate-marquee">
            <div className="flex gap-10 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase items-center text-black px-8">
              <span>Build Software</span> <Star className="fill-current" size={24} />
              <span>Automate with AI</span> <Star className="fill-current" size={24} />
              <span>Grow Organic Demand</span> <Star className="fill-current" size={24} />
              <span>100% IP &amp; Code Ownership</span> <Star className="fill-current" size={24} />
              <span>Senior-Led Engineering</span> <Star className="fill-current" size={24} />
              <span>5-Step Delivery Process</span> <Star className="fill-current" size={24} />
              <span>Global Remote Delivery</span> <Star className="fill-current" size={24} />
            </div>
            <div aria-hidden="true" className="flex gap-10 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase items-center text-black px-8">
              <span>Build Software</span> <Star className="fill-current" size={24} />
              <span>Automate with AI</span> <Star className="fill-current" size={24} />
              <span>Grow Organic Demand</span> <Star className="fill-current" size={24} />
              <span>100% IP &amp; Code Ownership</span> <Star className="fill-current" size={24} />
              <span>Senior-Led Engineering</span> <Star className="fill-current" size={24} />
              <span>5-Step Delivery Process</span> <Star className="fill-current" size={24} />
              <span>Global Remote Delivery</span> <Star className="fill-current" size={24} />
            </div>
          </div>
        </div>
      </div>

      <TrustSection />
      
      {/* Three Core Commercial Funnels: Build Software, Automate with AI, Grow Demand */}
      <section className="py-24 md:py-32 bg-[#060606] border-y border-white/5 relative overflow-hidden" id="authority-narrative">
        <div className="absolute inset-0 bg-[#ccff00]/[0.01] blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">
          
          {/* Main Section Header */}
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
                Core Commercial Funnels &amp; Technical Architecture
              </span>
              <span className="text-zinc-600 text-xs font-mono">|</span>
              <span className="text-zinc-400 text-xs font-mono">
                Lead Architect: <span className="text-white font-semibold">Abu Qitmir</span> &bull; Founded in <time dateTime="2021" className="text-[#ccff00]">2021</time>
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic text-white font-light tracking-tight leading-tight">
              Three Integrated Funnels: <br />
              <span className="text-neutral-400 font-sans not-italic font-extralight tracking-tighter">
                Build Software. Automate with AI. Grow Demand.
              </span>
            </h2>
            <p className="text-neutral-300 font-sans leading-relaxed text-base md:text-lg font-light mt-6 text-justify">
              <strong>AbuQitmirLabs</strong> focuses its senior engineering and growth practice around three focused commercial pillars so buyers can engage us for a single technical milestone or a complete B2B revenue system.
            </p>
          </div>

          {/* Three Funnel Pillar Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Funnel 1: Build Software */}
            <div className="space-y-6 bg-[#0a0a09] border border-white/10 rounded-2xl p-8">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-[#ccff00] font-bold">01 / BUILD SOFTWARE</span>
              </div>
              <h3 className="text-xl font-sans font-bold text-white tracking-tight">
                Custom Software, Web &amp; Mobile Engineering
              </h3>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm font-light text-justify">
                We architect bespoke SaaS products, enterprise cloud backends, Next.js web applications, and cross-platform iOS/Android mobile apps with 100% source code and IP transfer.
              </p>
              <div className="pt-2 space-y-3">
                <Link to="/custom-software" className="inline-flex items-center gap-2 text-xs font-mono text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>Custom Software Development</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
                <Link to="/web-development" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>Full-Stack Web Development</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
                <Link to="/mobile-app-development" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>Mobile App Development (Flutter &amp; React Native)</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
              </div>
            </div>

            {/* Funnel 2: Automate with AI */}
            <div className="space-y-6 bg-[#0a0a09] border border-white/10 rounded-2xl p-8">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-[#ccff00] font-bold">02 / AUTOMATE WITH AI</span>
              </div>
              <h3 className="text-xl font-sans font-bold text-white tracking-tight">
                Autonomous AI Agents, RAG &amp; Workflow Automation
              </h3>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm font-light text-justify">
                We engineer production AI agents, private Retrieval-Augmented Generation (RAG) knowledge pipelines, and legacy-system integrations with role-based access controls and audit logging.
              </p>
              <div className="pt-2 space-y-3">
                <Link to="/ai-agent-development" className="inline-flex items-center gap-2 text-xs font-mono text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>AI Agent &amp; RAG Development</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
                <Link to="/solutions/ai-automation" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>Enterprise AI Workflow Automation</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
                <Link to="/tools/ai-readiness-score" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>Assess Your AI Readiness Score</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
              </div>
            </div>

            {/* Funnel 3: Grow Demand */}
            <div className="space-y-6 bg-[#0a0a09] border border-white/10 rounded-2xl p-8">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-[#ccff00] font-bold">03 / GROW DEMAND</span>
              </div>
              <h3 className="text-xl font-sans font-bold text-white tracking-tight">
                Technical SEO, Programmatic SEO &amp; Growth Engineering
              </h3>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm font-light text-justify">
                We compound organic customer acquisition through technical SEO, Schema.org entity graphs, AEO/GEO content systems, and conversion-engineered landing architectures.
              </p>
              <div className="pt-2 space-y-3">
                <Link to="/seo-mastery" className="inline-flex items-center gap-2 text-xs font-mono text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>Technical &amp; Semantic SEO Mastery</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
                <Link to="/growth-engineering" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>B2B Growth Engineering Systems</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
                <Link to="/local-seo-for-small-business" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>Local SEO &amp; Citation Engineering</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
              </div>
            </div>

          </div>

          {/* Core Section: Structured 5-Step Delivery Process & Case Studies */}
          <div className="bg-[#0a0a09] border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
                  04 / DELIVERY GOVERNANCE &amp; VERIFIED CASE STUDIES
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white">
                  Structured 5-Step Delivery Process &amp; Production Proof
                </h2>
                <p className="text-neutral-300 font-sans text-sm md:text-base leading-relaxed font-light text-justify">
                  Every project is scoped and delivered through our documented 5-stage engineering lifecycle—covering architectural discovery, interactive prototyping, test-driven sprints, security/performance QA, and full source-code handover.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/about/our-process" className="inline-flex items-center gap-2 text-xs font-mono bg-white/10 hover:bg-[#ccff00] hover:text-black text-white px-4 py-2 rounded-none transition-colors uppercase font-bold tracking-wider">
                    Review Our 5-Step Delivery Process →
                  </Link>
                  <Link to="/case-studies/tajweedpage" className="inline-flex items-center gap-2 text-xs font-mono border border-white/20 hover:border-[#ccff00] text-neutral-300 hover:text-[#ccff00] px-4 py-2 rounded-none transition-colors uppercase font-bold tracking-wider">
                    Read TajweedPage.com Case Study →
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-4 bg-zinc-950 border border-white/10 rounded-xl p-6 space-y-3">
                <div className="text-xs font-mono text-[#ccff00] font-bold uppercase tracking-wider">100% IP &amp; Source Code Ownership</div>
                <div className="text-sm font-sans text-white font-semibold">Zero Vendor Lock-In</div>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  Clients receive complete GitHub repositories, deployment pipelines, and database schemas upon milestone completion.
                </p>
              </div>
            </div>
          </div>

          {/* Local Geographic Authority & Trust Banner */}
          <div className="pt-12 border-t border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
                05 / GLOBAL DELIVERY FOOTPRINT
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif italic text-white">
                Why US, UK &amp; Global Clients Partner With Our Karachi Studio
              </h2>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm md:text-base font-light text-justify">
                Founded in 2021 and headquartered in Karachi, Pakistan, AbuQitmirLabs combines international software engineering standards with capital efficiency. Partnering with our team gives you direct access to senior software architects, structured milestone governance, and 100% intellectual property ownership.
              </p>
            </div>
            <div className="lg:col-span-4 bg-[#0a0a09] border border-white/10 rounded-2xl p-6 text-center lg:text-left space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ccff00] font-bold block">ENGINEERING HUB</span>
              <h3 className="text-lg font-serif italic text-white">Karachi, Pakistan</h3>
              <p className="text-xs text-neutral-400 font-mono leading-relaxed uppercase">
                FOUNDED 2021 &bull; SECURITY-FIRST ARCHITECTURE &bull; 100% SOURCE REPO HANDOVER
              </p>
              <div className="pt-2">
                <Link to="/about/our-company" className="text-xs font-mono text-[#ccff00] hover:underline uppercase tracking-wider block">
                  Learn About Our Studio →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
      
      {/* Featured Free Tools Section */}
      <FeaturedToolsSection />
      
      <ApproachSection />
      
      <DifferentiatorsSection />
      
      <ImpactSection />

      <ServicesSection />
      
      <CountryMarquee />
      
      <ProcessSection />

      <TechStackSection />
      
      <VideoPortfolio />
      <InteractivePortfolio />

      <WebDevelopmentPricing />
      
      <HomeCaseStudiesSection />

      <TestimonialsSection />

      {/* Latest from the Blog — Engineering & Growth Insights (Freshness & Topical Authority) */}
      <section id="latest-blog-insights" className="py-24 bg-[#070707] border-t border-white/10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-3xl space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C8EB5F] font-bold block">
                Engineering Journal &amp; B2B Playbooks
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white tracking-tight">
                Latest from the Blog: Software, AI &amp; SEO Insights
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                Deep-dive technical guides, compliance checklists, and regional software benchmarks authored and reviewed by our senior engineering architects in Karachi.
              </p>
            </div>
            <div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-[#C8EB5F] text-white hover:text-black border border-white/15 font-mono text-xs uppercase tracking-wider font-bold transition-all"
              >
                <span>View All Engineering Articles</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestBlogHighlights.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col justify-between bg-zinc-950/90 border border-white/10 hover:border-[#C8EB5F]/50 rounded-2xl p-6 sm:p-7 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-[#C8EB5F] uppercase tracking-wider font-bold">
                      {post.category}
                    </span>
                    <span className="text-zinc-500">
                      <time dateTime={post.date}>{post.date}</time> &bull; {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#C8EB5F] transition-colors leading-snug">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3 text-xs font-mono">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-white group-hover:text-[#C8EB5F] font-bold uppercase tracking-wider"
                  >
                    <span>Read Guide</span>
                    <ArrowRight size={13} />
                  </Link>
                  <Link
                    to={post.pillarPath}
                    className="text-zinc-400 hover:text-white underline decoration-white/20"
                  >
                    {post.pillarLabel}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      <ContactSection />

      {/* CTA Section */}
      <section id="cta-section" className="bg-[#090908] border-t border-zinc-900 py-24 px-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(204,255,0,0.03)_0%,_transparent_65%)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 italic tracking-tight">
            Book a Technical Discovery Call
          </h2>
          <p className="text-zinc-400 mb-12 text-sm md:text-base font-sans tracking-wide">
            Schedule a 30-minute architectural consultation with our senior engineering leads. Response within 24 business hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ccff00] text-black hover:bg-white font-mono text-xs font-bold tracking-[0.14em] uppercase px-8 py-4 rounded-full transition-all duration-300 h-14"
            >
              Book a Discovery Call
            </Link>
            <a
              id="cta-whatsapp-link"
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25d366]/10 text-[#25d366] hover:bg-[#25d366]/20 font-sans text-xs tracking-[0.14em] uppercase border border-[#25d366]/20 px-8 py-4 rounded-full transition-all duration-300 h-14"
              aria-label="Message AbuQitmirLabs on WhatsApp"
            >
              <span className="normal-case">WhatsApp (+92 323 3260859)</span>
            </a>
            <div className="flex flex-col gap-2">
              <a
                id="cta-email-link-corporate"
                href="mailto:hello@abuqitmirlabs.tech"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 text-zinc-200 hover:bg-white/10 font-sans text-xs tracking-[0.14em] uppercase border border-white/20 px-8 py-3.5 rounded-full transition-all duration-300"
                aria-label="Send email to hello@abuqitmirlabs.tech"
              >
                <span className="normal-case font-mono font-medium tracking-tight">hello@abuqitmirlabs.tech</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

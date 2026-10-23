import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Palette, 
  Globe, 
  Search, 
  PenTool, 
  Share2, 
  CheckCircle2, 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Layers, 
  ChevronDown, 
  HelpCircle, 
  Zap, 
  Check, 
  X, 
  Award, 
  Users, 
  ExternalLink,
  Laptop,
  Flame,
  FileCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import ServiceToolCtaBanner from '../components/ServiceToolCtaBanner';

const BrandBuildingPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activePillar, setActivePillar] = useState<number>(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const pillars = [
    {
      id: 'strategy',
      num: '01',
      title: 'Brand Strategy',
      subtitle: 'Positioning & Audience',
      desc: 'Your mission, target audience, competitive positioning, and unique value proposition. We define what makes your business distinct before any visual design or line of code begins.',
      deliverables: [
        'Comprehensive Brand Positioning Matrix',
        'Customer Persona & Pain-Point Profiles',
        'Competitor Differentiation Analysis',
        'Core Mission, Vision & Value Statements'
      ],
      icon: <Compass className="w-7 h-7 text-[#ccff00]" />,
      accent: '#ccff00'
    },
    {
      id: 'identity',
      num: '02',
      title: 'Visual Identity',
      subtitle: 'Logo & Design Systems',
      desc: 'Vector logos, color palette, typography scales, and brand style guides engineered for absolute consistency across web, social media, print collateral, and packaging touchpoints.',
      deliverables: [
        'Scalable Vector Master Logos (SVG, AI, EPS, PDF)',
        'Dark & Light Mode Palette with WCAG Ratios',
        'Cormorant Garamond & Modern Type Hierarchy',
        'Exhaustive Brand Identity Manual'
      ],
      icon: <Palette className="w-7 h-7 text-[#f59e0b]" />,
      accent: '#f59e0b'
    },
    {
      id: 'website',
      num: '03',
      title: 'Next.js Custom Website',
      subtitle: 'Speed & Architecture',
      desc: 'Ultra-fast, mobile-responsive, and SEO-engineered web application built on Next.js / React. Every page is tailored specifically to your brand strategy — never adapted from cheap templates.',
      deliverables: [
        'Custom Tailored Next.js / React Web Architecture',
        'Sub-Second Page Loads & 95+ Core Web Vitals',
        'Interactive Motion & Cinematic Micro-interactions',
        'High-Converting Funnels & Lead Generation Forms'
      ],
      icon: <Globe className="w-7 h-7 text-[#3b82f6]" />,
      accent: '#3b82f6'
    },
    {
      id: 'seo',
      num: '04',
      title: 'SEO Foundation',
      subtitle: 'Search Authority',
      desc: 'High-intent keyword research, technical SEO audits, semantic schema graphs, and Google Search Console integration so your brand is discovered by qualified buyers right when they search.',
      deliverables: [
        'Commercial Keyword Mapping & Intent Silos',
        'Full Technical On-Page & Schema Markup',
        'Google Search Console & GA4 Setup',
        'Local SEO & Directory Citation Foundation'
      ],
      icon: <Search className="w-7 h-7 text-[#10b981]" />,
      accent: '#10b981'
    },
    {
      id: 'content',
      num: '05',
      title: 'Content Writing',
      subtitle: 'Voice & Conversion',
      desc: 'Compelling brand messaging, homepage narratives, about story, and high-conversion service copy that establishes authority, speaks directly to your ideal client, and drives action.',
      deliverables: [
        'Strategic Brand Voice & Tone Guidelines',
        'Compelling Homepage & Value Proposition Copy',
        'Persuasive Service Pages & Case Study Narratives',
        'Conversion-Focused Microcopy & Call-to-Actions'
      ],
      icon: <PenTool className="w-7 h-7 text-[#ec4899]" />,
      accent: '#ec4899'
    },
    {
      id: 'social',
      num: '06',
      title: 'Social Media Setup',
      subtitle: 'Omnichannel Presence',
      desc: 'Polished profiles across LinkedIn, Instagram, Facebook, and X with synchronized brand visuals, strategic bio copy, and ready-to-publish asset kits tailored for your audience.',
      deliverables: [
        'High-Resolution Profile Avatars & Channel Banners',
        'Conversion-Engineered Bios & Link Stacks',
        'Branded Figma & Canva Post Templates',
        'Content Pillars & Kickoff Posting Strategy'
      ],
      icon: <Share2 className="w-7 h-7 text-[#8b5cf6]" />,
      accent: '#8b5cf6'
    }
  ];

  const markets = [
    {
      country: 'Pakistan',
      region: 'Karachi, Lahore & Islamabad',
      desc: 'Startups, small business owners, and exporting agencies building an authoritative brand that dominates local Google search and appeals to overseas buyers.',
      link: '/pakistan-market',
      tag: 'Local & Export Focus'
    },
    {
      country: 'United States',
      region: 'North America & US Diaspora',
      desc: 'US small businesses and diaspora founders seeking agency-grade brand strategy, Next.js engineering, and organic search ranking at accessible rates.',
      link: '/us-market',
      tag: 'High ROI & Velocity'
    },
    {
      country: 'United Kingdom',
      region: 'London, Manchester & UK Hubs',
      desc: 'UK-based SMEs and innovative startups demanding an end-to-end brand identity and high-performance digital presence without enterprise agency markups.',
      link: '/uk-market',
      tag: 'Bespoke Quality'
    },
    {
      country: 'UAE',
      region: 'Dubai & Abu Dhabi',
      desc: 'Forward-thinking enterprises in Dubai and Abu Dhabi entering competitive GCC markets with premium visual identity and multilingual digital experiences.',
      link: '/uae-market',
      tag: 'GCC Prestige'
    },
    {
      country: 'Saudi Arabia',
      region: 'Riyadh & Jeddah (Vision 2030)',
      desc: 'Companies launching or scaling in KSA that need an authoritative brand architecture aligned with regional business culture and NDMO standards.',
      link: '/saudi-arabia-market',
      tag: 'Vision 2030 Ready'
    },
    {
      country: 'Canada',
      region: 'Toronto, Vancouver & Montreal',
      desc: 'Canadian small businesses and immigrant entrepreneurs creating their first holistic brand ecosystem with built-in organic search authority.',
      link: '/canada-market',
      tag: 'Cross-Border Impact'
    },
    {
      country: 'Australia',
      region: 'Sydney, Melbourne & Brisbane',
      desc: 'Australian founders and service enterprises looking for bespoke visual branding and custom web engineering delivered on agile timeframes.',
      link: '/australia-market',
      tag: 'Agile Delivery'
    },
    {
      country: 'Qatar',
      region: 'Doha Commercial Center',
      desc: 'Doha-based enterprises building world-class corporate identities and bespoke digital platforms to win institutional and consumer confidence.',
      link: '/qatar-market',
      tag: 'Institutional Trust'
    },
    {
      country: 'Kuwait',
      region: 'Kuwait City & Regional Markets',
      desc: 'Kuwaiti ventures and retail brands expanding their digital footprint with cohesive visual identity, Next.js e-commerce, and organic search.',
      link: '/kuwait-market',
      tag: 'Retail & Commerce'
    },
    {
      country: 'Poland & Europe',
      region: 'Warsaw & European Single Market',
      desc: 'European businesses and Warsaw tech ventures requiring English-language brand building, international positioning, and global web authority.',
      link: '/poland-market',
      tag: 'Pan-European Reach'
    }
  ];

  const industries = [
    {
      name: 'Fintech Solutions',
      desc: 'Payment platforms, neo-banks, and investment tools need an identity that conveys institutional trust, data security, and instant financial credibility.',
      link: '/solutions/fintech',
      stat: 'Zero Trust Security Standards'
    },
    {
      name: 'Healthcare & Telehealth',
      desc: 'Clinics, digital health platforms, and diagnostic services need a brand voice that is empathetic, transparent, HIPAA/NDMO compliant, and reassuring.',
      link: '/solutions/healthcare',
      stat: 'Empathetic & Compliant'
    },
    {
      name: 'E-Commerce & DTC Brands',
      desc: 'Online stores need more than a generic storefront. They require an unforgettable brand story and high-speed checkout that transforms visitors into loyal repeat buyers.',
      link: '/solutions/e-commerce',
      stat: 'Sub-Second Conversion'
    },
    {
      name: 'EdTech & Learning',
      desc: 'Online learning academies and certification platforms must earn parent and student trust before a single enrollment or course subscription is booked.',
      link: '/solutions/edtech',
      stat: 'Verified Student Trust'
    },
    {
      name: 'AI Automation & SaaS',
      desc: 'Artificial intelligence products and automated service platforms require a distinct brand that demystifies complex workflows and highlights tangible business ROI.',
      link: '/solutions/ai-automation',
      stat: 'Clear Value Propositions'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Strategic Positioning',
      desc: 'We immerse ourselves into your business model, customer psychology, competitive landscape, and distinct moat. Everything is codified into a written strategic document before a single pixel is placed.',
      linkText: 'Explore Our Complete Process',
      linkUrl: '/about/our-process'
    },
    {
      step: '02',
      title: 'Visual Identity & System Design',
      desc: 'We engineer your visual language: primary vector mark, responsive sub-marks, Cormorant Garamond typography scales, contrast-verified color palettes, and comprehensive usage rules.',
      linkText: 'View Graphic Design Work',
      linkUrl: '/graphics-design'
    },
    {
      step: '03',
      title: 'Custom Next.js Web Development',
      desc: 'We build your digital home from scratch on Next.js and React. Clean code, sub-second latency, responsive layouts, and interactive animations that reflect your prestige.',
      linkText: 'Our Web Development Services',
      linkUrl: '/web-development'
    },
    {
      step: '04',
      title: 'Search Authority & SEO Foundation',
      desc: 'High-intent keyword mapping, on-page optimization, JSON-LD structured schemas, and Google Search Console indexing so qualified buyers discover you automatically.',
      linkText: 'Explore SEO Mastery',
      linkUrl: '/seo-mastery'
    },
    {
      step: '05',
      title: 'Brand Voice & Conversion Copywriting',
      desc: 'We author every headline, value prop, and call-to-action in your bespoke brand voice. No generic fluff — only persuasive language that turns casual visitors into booked clients.',
      linkText: 'View Content Writing Services',
      linkUrl: '/content-writing'
    },
    {
      step: '06',
      title: 'Omnichannel Social Media Setup',
      desc: 'We calibrate your professional presence on LinkedIn, Instagram, X, and Facebook with brand-aligned banner assets, optimized profile bios, and reusable graphic templates.',
      linkText: 'Our Digital Marketing Stack',
      linkUrl: '/digital-marketing'
    },
    {
      step: '07',
      title: 'Launch & 30-Day Dedicated Support',
      desc: 'We conduct rigorous cross-browser testing, verify DNS and SSL security, push your platform live, and provide 30 days of post-launch technical and operational support.',
      linkText: 'Book Your Consultation',
      linkUrl: '/contact'
    }
  ];

  const agencyComparison = [
    {
      aspect: 'Strategic Foundation',
      others: 'Design only; superficial logos with zero underlying strategy',
      abuqitmir: 'Every visual and technical decision is driven by documented strategy'
    },
    {
      aspect: 'Cost Structure',
      others: 'Excessive agency overheads, inflated billings, and hidden change fees',
      abuqitmir: 'Pakistan-based engineering core delivering world-class output at fair rates'
    },
    {
      aspect: 'Post-Delivery Relationship',
      others: 'Disappear immediately upon delivery or charge exorbitant support fees',
      abuqitmir: 'Comprehensive 30-day post-launch warranty and active technical support included'
    },
    {
      aspect: 'Design & Code Craft',
      others: 'Pre-made bloated WordPress themes or cookie-cutter templates',
      abuqitmir: 'Bespoke Next.js / React engineering crafted specifically for your brand'
    },
    {
      aspect: 'Client Communication',
      others: 'Black-box process with silence for weeks between milestone reviews',
      abuqitmir: 'Structured milestone updates, direct developer access, and shared staging environments'
    },
    {
      aspect: 'Global Market Understanding',
      others: 'Limited single-country experience with little international perspective',
      abuqitmir: 'Active client footprints across 10 countries and 4 continents since 2021'
    }
  ];

  const mistakes = [
    {
      num: '01',
      title: 'Starting with a logo instead of a strategy',
      desc: 'A logo without positioning is mere decoration. Sustainable brand building starts with understanding your customer’s urgent problems and defining your exact competitive advantage.'
    },
    {
      num: '02',
      title: 'Using separate fragmented vendors for each piece',
      desc: 'When an isolated designer, freelance developer, and separate SEO consultant work without shared governance, nothing connects. Inconsistency dilutes brand authority.'
    },
    {
      num: '03',
      title: 'Treating search engine optimization as an afterthought',
      desc: 'A gorgeous website that Google cannot discover is an invisible expense. Technical architecture, semantic schemas, and keyword intent must be baked in from line one.',
      link: '/local-seo-citation-building',
      linkText: 'Explore Local Citation Building'
    },
    {
      num: '04',
      title: 'Authoring website copy without a cohesive brand voice',
      desc: 'Messaging that attempts to please everyone speaks to no one. Every headline and paragraph must speak directly to your target buyer with undeniable clarity.'
    },
    {
      num: '05',
      title: 'Deploying live without rigorous cross-device testing',
      desc: 'Broken layouts, lagging mobile speeds, and unverified contact forms shatter customer trust in seconds. A luxury brand leaves zero room for careless glitches.'
    }
  ];

  const faqData = [
    {
      q: 'How long does a complete brand build take from start to finish?',
      a: 'A complete brand build typically takes 2 to 4 weeks depending on the exact project scope and custom requirements. During our free 15-minute discovery call, we outline an exact milestone timeline with guaranteed delivery dates.'
    },
    {
      q: 'Can I commission just a logo without the complete package?',
      a: 'Yes, we offer standalone identity design via our Graphics Design service. However, a logo in isolation cannot produce inbound leads or ranking authority. We happily advise on what phase makes the most financial sense for your current business stage.'
    },
    {
      q: 'How does remote collaboration work with international clients?',
      a: 'All international engagements are handled seamlessly through Zoom, Google Drive, Figma workspaces, and async updates. We coordinate meetings across US, UK, UAE, Canadian, and Australian time zones with absolute precision.'
    },
    {
      q: 'Do you offer ongoing SEO and growth management after website launch?',
      a: 'Yes. Beyond our 30-day post-launch support, we offer ongoing monthly search engine optimization, technical maintenance, citation building, and authority backlinks to ensure your brand consistently climbs Google rankings.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'For clients in Pakistan: direct bank wire transfer, JazzCash, and EasyPaisa. For international clients in the US, UK, UAE, and Europe: Wise, direct SWIFT wire transfer, Stripe, and PayPal.'
    },
    {
      q: 'Do I need technical or coding knowledge to work with AbuQitmirLabs?',
      a: 'None whatsoever. You share your business vision, industry domain knowledge, and goals — our team handles every aspect of the strategy, visual design, Next.js architecture, and SEO setup.'
    },
    {
      q: 'Can you work with a business that already possesses an existing logo?',
      a: 'Absolutely. We perform a brand audit on your existing assets, retain your established brand equity, and engineer the remaining pillars — from modern web infrastructure to conversion copy and search visibility — around your core identity.'
    },
    {
      q: 'Do you provide white-label brand building partnerships for digital agencies?',
      a: 'Yes. We partner with digital marketing, PR, and advertising agencies across the UK, US, and Middle East who need reliable high-end design, web engineering, and local SEO execution delivered invisibly under their banner.'
    },
    {
      q: 'Where can I inspect your past brand building work and client outcomes?',
      a: 'You can explore our verified case studies — including our full-spectrum build for TajweedPage — or download our official brand assets to see our design standards and craftsmanship in action.'
    }
  ];

  const brandBuildingSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://www.abuqitmirlabs.tech/brand-building#service",
        "name": "Brand Building Services for Small Businesses",
        "serviceType": "Brand Strategy, Visual Identity, Web Development & SEO",
        "description": "Comprehensive brand building services for small businesses and startups. Brand strategy, custom visual identity, Next.js web development, and search engine optimization under one roof.",
        "provider": {
          "@type": "Organization",
          "name": "AbuQitmirLabs",
          "url": "https://www.abuqitmirlabs.tech",
          "logo": "https://www.abuqitmirlabs.tech/logo.png"
        },
        "areaServed": [
          "Pakistan",
          "United States",
          "United Kingdom",
          "United Arab Emirates",
          "Saudi Arabia",
          "Canada",
          "Australia",
          "Qatar",
          "Kuwait",
          "Poland"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "6 Pillars of Brand Architecture",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand Strategy & Positioning" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Visual Identity & Logo Design" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Next.js Custom Website Development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Search Engine Optimization Foundation" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand Voice & Conversion Copywriting" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Presence Setup" } }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.abuqitmirlabs.tech/brand-building#faq",
        "mainEntity": faqData.map(item => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.abuqitmirlabs.tech/brand-building#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.abuqitmirlabs.tech/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Brand Building Services",
            "item": "https://www.abuqitmirlabs.tech/brand-building"
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-[#050505] text-neutral-300 font-sans antialiased overflow-x-hidden min-h-screen relative selection:bg-[#ccff00] selection:text-black">
      <Helmet>
        <title>Brand Building Services for Small Businesses | AbuQitmirLabs</title>
        <meta name="description" content="Strategy. Design. Website. SEO. All Under One Roof. AbuQitmirLabs builds complete brands from scratch for small businesses in Pakistan, the US, UK, UAE, and beyond." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/brand-building" />

        {/* Open Graph */}
        <meta property="og:title" content="Brand Building Services for Small Businesses | AbuQitmirLabs" />
        <meta property="og:description" content="Strategy. Design. Website. SEO. All Under One Roof. AbuQitmirLabs builds complete brands from scratch for small businesses in Pakistan, the US, UK, UAE, and beyond." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/brand-building" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AbuQitmirLabs" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AbuQitmir" />
        <meta name="twitter:title" content="Brand Building Services for Small Businesses | AbuQitmirLabs" />
        <meta name="twitter:description" content="Strategy. Design. Website. SEO. All Under One Roof. AbuQitmirLabs builds complete brands from scratch for small businesses in Pakistan, the US, UK, UAE, and beyond." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Structured Data Graph */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(brandBuildingSchema)
          }}
        />
      </Helmet>

      <Header />
      <Breadcrumbs disableSchema={true} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] w-full flex items-center pt-28 md:pt-36 pb-20 overflow-hidden border-b border-white/5">
        {/* Ambient Luxury Lighting & Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#ccff00]/5 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[350px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Live Status Pill */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse"></span>
              <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-neutral-300">
                Strategic Brand Architecture
              </span>
            </motion.div>

            {/* H1 Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-white leading-[1.08] mb-8"
            >
              Brand Building Services for <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                Small Businesses
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl sm:text-2xl font-light text-[#ccff00] font-mono tracking-wide mb-6 uppercase"
            >
              Strategy. Design. Website. SEO. All Under One Roof.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl font-light text-neutral-400 max-w-3xl mx-auto leading-relaxed mb-10"
            >
              Your business deserves to be found, trusted, and chosen. AbuQitmirLabs builds complete, cohesive brands from scratch for ambitious small businesses in Pakistan, the US, the UK, the UAE, and worldwide.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
            >
              <Link 
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#ccff00] text-black font-semibold tracking-wide text-sm uppercase transition-all duration-300 hover:bg-[#b8e600] hover:shadow-[0_0_30px_rgba(204,255,0,0.3)] flex items-center justify-center gap-2"
              >
                Get a Free Brand Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/case-studies"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.04] text-white border border-white/10 font-semibold tracking-wide text-sm uppercase transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 flex items-center justify-center gap-2"
              >
                See Our Work
                <ArrowUpRight className="w-4 h-4 text-neutral-400" />
              </Link>
            </motion.div>

            {/* Trust Highlights */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center p-3">
                <span className="text-xl sm:text-2xl font-bold text-white font-mono">6 Pillars</span>
                <span className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Holistic System</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3">
                <span className="text-xl sm:text-2xl font-bold text-[#ccff00] font-mono">2-4 Weeks</span>
                <span className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Rapid Delivery</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3">
                <span className="text-xl sm:text-2xl font-bold text-white font-mono">30 Days</span>
                <span className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Post-Launch Support</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3">
                <span className="text-xl sm:text-2xl font-bold text-white font-mono">100% IP</span>
                <span className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Master Vector Ownership</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Trust Bar */}
      <section className="py-12 bg-[#080808] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 shrink-0">
              <Globe className="w-5 h-5 text-[#ccff00]" />
              <span className="text-xs uppercase font-mono font-bold tracking-[0.2em] text-neutral-400">
                Serving Businesses Across Global Hubs
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5">
              {[
                { name: 'Pakistan', path: '/pakistan-market' },
                { name: 'United States', path: '/us-market' },
                { name: 'United Kingdom', path: '/uk-market' },
                { name: 'UAE', path: '/uae-market' },
                { name: 'Saudi Arabia', path: '/saudi-arabia-market' },
                { name: 'Canada', path: '/canada-market' },
                { name: 'Australia', path: '/australia-market' },
                { name: 'Qatar', path: '/qatar-market' },
                { name: 'Kuwait', path: '/kuwait-market' },
                { name: 'Poland', path: '/poland-market' }
              ].map((m, idx) => (
                <Link
                  key={idx}
                  to={m.path}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-neutral-300 bg-white/[0.03] border border-white/5 hover:border-[#ccff00]/40 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                >
                  {m.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section: Most Small Businesses Skip Brand Building */}
      <section className="py-24 md:py-32 relative border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
                The Hard Truth for Founders
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight leading-tight mb-8">
                Most Small Businesses Skip Brand Building — And Pay for It Later
              </h2>
              <div className="space-y-5 text-neutral-400 text-base md:text-lg leading-relaxed">
                <p>
                  You launched with a standalone logo and a basic web template. But customer inquiries aren't flowing, Google search isn't finding you, and each piece of your marketing feels disjointed.
                </p>
                <p>
                  The problem is not your underlying product or service.
                </p>
                <p className="text-white font-medium text-xl">
                  The issue is that your brand was never engineered as an interconnected system.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-8 sm:p-10 rounded-3xl bg-neutral-950 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/5 blur-2xl rounded-full pointer-events-none" />

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <X className="w-5 h-5 text-red-400 shrink-0" />
                    <span className="text-neutral-300 font-mono text-sm sm:text-base">A logo alone is not a brand.</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <X className="w-5 h-5 text-red-400 shrink-0" />
                    <span className="text-neutral-300 font-mono text-sm sm:text-base">A website in isolation is not a brand.</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <X className="w-5 h-5 text-red-400 shrink-0" />
                    <span className="text-neutral-300 font-mono text-sm sm:text-base">A social media page is not a brand.</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/30 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-5 h-5 text-[#ccff00]" />
                    <span className="text-xs uppercase font-mono font-bold tracking-wider text-[#ccff00]">
                      The AbuQitmirLabs Rule
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl font-medium text-white leading-snug">
                    A brand is all six pillars working in unison — orchestrated from one strategic blueprint.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 6 Pillars Section: Interactive Cinematic Matrix */}
      <section className="py-24 md:py-32 relative border-b border-white/5 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
              The Blueprint
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-6">
              What a Complete Brand Actually Looks Like
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              When all six pillars align, your business operates as a cohesive authority engine rather than fragmented pieces.
            </p>
          </div>

          {/* Desktop/Tablet Tab Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {pillars.map((pillar, idx) => (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(idx)}
                className={`p-4 rounded-xl text-left border transition-all duration-300 cursor-pointer ${
                  activePillar === idx
                    ? 'bg-white/[0.08] border-[#ccff00] shadow-[0_0_20px_rgba(204,255,0,0.15)]'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-neutral-500">{pillar.num}</span>
                  {activePillar === idx && <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />}
                </div>
                <div className="font-medium text-sm text-white truncate">{pillar.title}</div>
                <div className="text-xs text-neutral-400 truncate mt-0.5">{pillar.subtitle}</div>
              </button>
            ))}
          </div>

          {/* Active Pillar Featured Display */}
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-white/10 relative overflow-hidden">
            <div 
              className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-20"
              style={{ backgroundColor: pillars[activePillar].accent }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10">
                    {pillars[activePillar].icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase">
                      Pillar {pillars[activePillar].num} of 06
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium">
                      {pillars[activePillar].title}
                    </h3>
                  </div>
                </div>

                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-8">
                  {pillars[activePillar].desc}
                </p>

                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Included Core Deliverables:
                  </div>
                  {pillars[activePillar].deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-[#ccff00] shrink-0" />
                      <span className="text-sm sm:text-base text-neutral-200">{item}</span>
                    </div>
                  ))}
                </div>

                {pillars[activePillar].id === 'website' && (
                  <div className="mt-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs text-neutral-300">
                      Looking specifically for standalone custom web engineering, REST API development, or payment integrations?
                    </div>
                    <Link
                      to="/web-development"
                      className="shrink-0 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      API Development & Integration Services in Karachi &rarr;
                    </Link>
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#ccff00] mb-3">
                    System Synergy
                  </div>
                  <div className="text-lg font-serif text-white mb-4">
                    Orchestrated for Seamless Conversion
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                    Every element feeds directly into the next. Your brand strategy shapes visual design, your design powers high-performance Next.js pages, and technical SEO delivers high-intent search traffic.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <Link
                    to="/about/our-process"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ccff00] hover:text-white transition-colors"
                  >
                    See How We Build It
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <span className="text-xs font-mono text-neutral-500">AbuQitmirLabs Core</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Markets Section: Brand Building for Your Market */}
      <section className="py-24 md:py-32 relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
                Global Footprint
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight">
                Brand Building Tailored for Your Market
              </h2>
            </div>
            <p className="text-neutral-400 max-w-md text-sm sm:text-base mt-4 md:mt-0">
              Local search rankings, regional consumer trust, and cultural positioning engineered specifically for your target economy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.map((market, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-2xl bg-neutral-950 border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/20">
                      {market.tag}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">0{idx + 1}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-white mb-2 group-hover:text-[#ccff00] transition-colors">
                    {market.country}
                  </h3>
                  <div className="text-xs font-mono text-neutral-400 mb-4">{market.region}</div>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                    {market.desc}
                  </p>
                </div>

                <Link
                  to={market.link}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-300 group-hover:text-[#ccff00] transition-colors"
                >
                  Explore {market.country} Market
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 md:py-32 relative border-b border-white/5 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
              Specialized Verticals
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-6">
              Brand Architecture Across Five High-Growth Industries
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              Generic marketing cannot bridge high-stakes buyer hesitation. We engineer sector-specific branding calibrated for customer trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#ccff00]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-[#ccff00] uppercase tracking-wider mb-3">
                    {ind.stat}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-white mb-3">
                    {ind.name}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                    {ind.desc}
                  </p>
                </div>
                <Link
                  to={ind.link}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-[#ccff00] transition-colors"
                >
                  View {ind.name}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            ))}

            {/* Sixth Callout Box */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#ccff00]/10 via-white/[0.02] to-transparent border border-[#ccff00]/30 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-[#ccff00] uppercase tracking-wider mb-3">
                  Custom Industry Scopes
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-white mb-3">
                  Operating in Another Niche?
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                  We engineer strategic brand frameworks for specialized professional services, manufacturing, consumer goods, and B2B consultancies.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black bg-[#ccff00] px-4 py-2.5 rounded-lg hover:bg-[#b8e600] transition-colors w-fit"
              >
                Discuss Your Niche
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7-Step Process: How We Build Your Brand */}
      <section className="py-24 md:py-32 relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
              Step-by-Step Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-6">
              How We Build Your Brand — 7 Steps
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              From the initial strategic discovery session to 30 days of post-launch stabilization, every phase is engineered with transparent milestones.
            </p>
          </div>

          <div className="space-y-4">
            {processSteps.map((stepItem, idx) => (
              <div 
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start sm:items-center gap-6">
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-[#ccff00] shrink-0">
                    {stepItem.step}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif text-white font-medium mb-1">
                      {stepItem.title}
                    </h3>
                    <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
                      {stepItem.desc}
                    </p>
                  </div>
                </div>

                <Link
                  to={stepItem.linkUrl}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-[#ccff00] shrink-0 self-start md:self-center transition-colors"
                >
                  {stepItem.linkText}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#ccff00] text-black font-semibold tracking-wide text-sm uppercase hover:bg-[#b8e600] transition-colors"
            >
              Start the Process — Book a Free Discovery Call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What Is Included: Matrix Table */}
      <section className="py-24 md:py-32 relative border-b border-white/5 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
              Deliverables Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-4">
              Everything Your Brand Needs — In One Complete Package
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              No hidden fees, no separate vendors to coordinate. A full-stack brand identity built custom from your strategy.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 overflow-hidden bg-neutral-950">
            <div className="grid grid-cols-12 p-4 sm:p-5 bg-white/[0.04] border-b border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
              <div className="col-span-8 sm:col-span-7">What Is Included</div>
              <div className="col-span-4 sm:col-span-3 text-center sm:text-left">Coverage</div>
              <div className="hidden sm:block sm:col-span-2 text-right">Service Link</div>
            </div>

            {[
              { item: 'Brand Strategy & Positioning Blueprint', status: 'Included', link: '/about/our-process', label: 'Our Process' },
              { item: 'Scalable Logo & Complete Visual Identity System', status: 'Included', link: '/graphics-design', label: 'Graphics Design' },
              { item: 'Custom Next.js Responsive Web Architecture', status: 'Included', link: '/web-development', label: 'Web Development' },
              { item: 'On-Page, Technical & Structured Schema SEO', status: 'Included', link: '/seo-mastery', label: 'SEO Services' },
              { item: 'All Core Page Brand Copywriting & Voice Guidelines', status: 'Included', link: '/content-writing', label: 'Content Writing' },
              { item: 'Social Media Profiles & Branded Asset Kits', status: 'Included', link: '/digital-marketing', label: 'Digital Marketing' },
              { item: 'Google Search Console, GA4 & Sitemap Indexing', status: 'Included', link: '/seo-mastery', label: 'SEO Mastery' },
              { item: '30-Day Dedicated Post-Launch Support & Warranty', status: 'Included', link: '/contact', label: 'Contact Team' }
            ].map((row, idx) => (
              <div 
                key={idx}
                className="grid grid-cols-12 p-4 sm:p-5 border-b border-white/5 items-center hover:bg-white/[0.02] transition-colors"
              >
                <div className="col-span-8 sm:col-span-7 flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#ccff00] shrink-0" />
                  <span className="text-sm sm:text-base text-white font-medium">{row.item}</span>
                </div>
                <div className="col-span-4 sm:col-span-3 text-center sm:text-left">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold text-[#ccff00] bg-[#ccff00]/10">
                    <CheckCircle2 className="w-3 h-3" />
                    {row.status}
                  </span>
                </div>
                <div className="hidden sm:block sm:col-span-2 text-right">
                  <Link
                    to={row.link}
                    className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
                  >
                    {row.label} &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agency Comparison: Why Businesses Choose AbuQitmirLabs */}
      <section className="py-24 md:py-32 relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
              The Agency Contrast
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-6">
              Why Businesses Choose AbuQitmirLabs
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              We have been building high-performance brands for startups and small businesses since 2021 — from Karachi to California, from local service providers to venture-backed ventures.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 overflow-hidden bg-neutral-950 mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <div className="grid grid-cols-1 md:grid-cols-12 p-6 bg-white/[0.04] border-b border-white/10 font-mono text-xs uppercase tracking-wider">
              <div className="md:col-span-4 text-neutral-400">Decision Parameter</div>
              <div className="md:col-span-4 text-neutral-500 mt-2 md:mt-0">Conventional Agencies</div>
              <div className="md:col-span-4 text-[#ccff00] font-bold mt-2 md:mt-0">AbuQitmirLabs Approach</div>
            </div>

            {agencyComparison.map((row, idx) => (
              <div 
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-6 border-b border-white/5 items-center gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="md:col-span-4 font-serif text-white text-base sm:text-lg font-medium">
                  {row.aspect}
                </div>
                <div className="md:col-span-4 text-neutral-400 text-sm flex items-start gap-2.5">
                  <X className="w-4 h-4 text-red-400/80 shrink-0 mt-0.5" />
                  <span>{row.others}</span>
                </div>
                <div className="md:col-span-4 text-neutral-200 text-sm flex items-start gap-2.5 bg-[#ccff00]/[0.03] p-3 rounded-xl border border-[#ccff00]/10">
                  <Check className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                  <span className="font-medium text-white">{row.abuqitmir}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase tracking-wider text-neutral-400">
            <Link to="/about/our-company" className="hover:text-[#ccff00] transition-colors">
              About AbuQitmirLabs &rarr;
            </Link>
            <span className="text-neutral-700">·</span>
            <Link to="/about/our-team" className="hover:text-[#ccff00] transition-colors">
              Meet Our Team &rarr;
            </Link>
            <span className="text-neutral-700">·</span>
            <Link to="/about/careers" className="hover:text-[#ccff00] transition-colors">
              See Open Roles &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Service vs Course: Build It Yourself — Or Let Us Do It */}
      <section className="py-24 md:py-32 relative border-b border-white/5 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
              Flexible Engagement
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-6">
              Build It Yourself — Or Let Us Do It
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              Not every founder wishes to delegate their brand building to an agency. If you prefer mastering the process yourself, we teach our entire methodology in an AI-powered 12-week curriculum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Service Column */}
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-950 border border-white/10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/5 blur-2xl rounded-full pointer-events-none" />
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#ccff00] bg-[#ccff00]/10 mb-4 inline-block">
                  Agency Execution
                </span>
                <h3 className="text-2xl font-serif text-white mb-2">
                  Brand Building Service
                </h3>
                <p className="text-sm text-neutral-400 mb-8">
                  Our dedicated engineering and design team executes your strategy, website, and SEO from start to finish.
                </p>

                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-neutral-400">Who does the work:</span>
                    <span className="text-white font-medium">We do</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-neutral-400">Timeline:</span>
                    <span className="text-white font-medium">2 to 4 weeks</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-neutral-400">What you get:</span>
                    <span className="text-white font-medium">A professionally built brand</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-neutral-400">Investment:</span>
                    <span className="text-[#ccff00] font-mono font-bold">Custom Quote</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-neutral-400">Best for:</span>
                    <span className="text-white font-medium">Busy business owners</span>
                  </div>
                </div>
              </div>

              <Link
                to="/contact"
                className="w-full py-4 rounded-xl bg-[#ccff00] text-black font-semibold text-center text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
              >
                Book Brand Consultation
              </Link>
            </div>

            {/* Course Column */}
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-950 border border-[#8b5cf6]/30 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8b5cf6]/10 blur-2xl rounded-full pointer-events-none" />
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#a78bfa] bg-[#8b5cf6]/20 mb-4 inline-block">
                  Academy Training
                </span>
                <h3 className="text-2xl font-serif text-white mb-2">
                  Brand Banao Business Chalao Course
                </h3>
                <p className="text-sm text-neutral-400 mb-8">
                  Master the exact step-by-step framework to engineer brands for your own business or client roster.
                </p>

                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-neutral-400">Who does the work:</span>
                    <span className="text-white font-medium">You do</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-neutral-400">Timeline:</span>
                    <span className="text-white font-medium">12 weeks curriculum</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-neutral-400">What you get:</span>
                    <span className="text-white font-medium">The skill to build brands yourself</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-neutral-400">Investment:</span>
                    <span className="text-[#a78bfa] font-mono font-bold">Rs. 18,000</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-neutral-400">Best for:</span>
                    <span className="text-white font-medium">Those who want to learn & earn</span>
                  </div>
                </div>
              </div>

              <Link
                to="/skills-academy"
                className="w-full py-4 rounded-xl bg-white/[0.05] text-white border border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/20 font-semibold text-center text-xs uppercase tracking-wider transition-colors"
              >
                Explore the Course & Curriculum
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section: TajweedPage */}
      <section className="py-24 md:py-32 relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-8 sm:p-14 rounded-3xl bg-neutral-950 border border-white/10 relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-[#ccff00]/5 blur-3xl rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-3 block">
                  Proven Case Study
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif text-white font-medium mb-6">
                  A Real-World Brand Built From Scratch: TajweedPage
                </h2>
                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-6">
                  We engineered the complete online presence for TajweedPage — from core brand positioning and visual identity design to Next.js development and structured SEO setup. The result was a fully optimized, consistently branded educational platform ready to attract and convert students from day one.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00]" /> Strategy & Identity
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00]" /> Next.js Architecture
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00]" /> Search Indexing
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
                <Link
                  to="/case-studies/tajweedpage"
                  className="px-6 py-4 rounded-xl bg-[#ccff00] text-black font-semibold text-center text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
                >
                  Read TajweedPage Case Study
                </Link>
                <Link
                  to="/case-studies"
                  className="px-6 py-4 rounded-xl bg-white/[0.04] text-white border border-white/10 text-center text-xs uppercase tracking-wider hover:bg-white/[0.08] transition-colors"
                >
                  View All Case Studies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Brand Building Mistakes Section */}
      <section className="py-24 md:py-32 relative border-b border-white/5 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
              Pitfalls to Avoid
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-6">
              5 Brand Building Mistakes That Cost Small Businesses Clients
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              Recognizing these five common traps will save you months of stalled revenue and expensive redesigns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mistakes.map((mistake, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-2xl bg-neutral-950 border border-white/5 hover:border-red-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-red-400">MISTAKE {mistake.num}</span>
                    <span className="w-2 h-2 rounded-full bg-red-500/50" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif text-white font-medium mb-3">
                    {mistake.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                    {mistake.desc}
                  </p>
                </div>
                {mistake.link && (
                  <Link
                    to={mistake.link}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#ccff00] hover:underline"
                  >
                    {mistake.linkText} &rarr;
                  </Link>
                )}
              </div>
            ))}

            {/* Sixth Advisory Box */}
            <div className="p-8 rounded-2xl bg-[#ccff00]/[0.02] border border-[#ccff00]/20 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#ccff00] mb-4 block">THE PREVENTATIVE AUDIT</span>
                <h3 className="text-lg sm:text-xl font-serif text-white font-medium mb-3">
                  Unsure Where Your Brand Has Leaks?
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                  Book a quick 15-minute diagnostic call. We review your current visual identity, website latency, and search footprint with zero sales pressure.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black bg-[#ccff00] px-4 py-2.5 rounded-lg hover:bg-[#b8e600] transition-colors w-fit"
              >
                Request Free Brand Review
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-24 md:py-32 relative border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
              Clear Answers
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-4">
              Frequently Asked Questions About Brand Building
            </h2>
            <p className="text-neutral-400 text-base">
              Everything you need to know about our scope, timelines, international workflows, and post-launch guarantees.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="rounded-2xl border border-white/10 bg-neutral-950/60 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                >
                  <span className="font-serif text-base sm:text-lg text-white font-medium">
                    {faq.q}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-300 ${
                      activeFaq === index ? 'rotate-180 text-[#ccff00]' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm sm:text-base text-neutral-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-xs font-mono text-neutral-500">
            Have a custom question?{' '}
            <Link to="/contact" className="text-[#ccff00] hover:underline font-bold">
              Reach out directly to our engineering lead &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-24 md:py-36 relative overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 bg-radial-gradient from-[#ccff00]/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
            Begin Your Transformation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-tight mb-8">
            Ready to Build a Brand That Gets Found and Chosen?
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-light text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-10">
            One free 15-minute consultation. Zero sales pressure, no awkward sales pitch. Just an honest conversation about where your business stands and what a complete brand architecture can unlock for your revenue.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link 
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#ccff00] text-black font-semibold tracking-wide text-sm uppercase hover:bg-[#b8e600] transition-all duration-300 hover:shadow-[0_0_30px_rgba(204,255,0,0.3)] flex items-center justify-center gap-2"
            >
              Get Your Free Brand Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/skills-academy"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.04] text-white border border-white/10 font-semibold tracking-wide text-sm uppercase hover:bg-white/[0.08] transition-colors flex items-center justify-center gap-2"
            >
              Explore Brand Banao Course
              <ArrowUpRight className="w-4 h-4 text-neutral-400" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-500 uppercase tracking-wider">
            <span>Fast 2-4 Week Delivery</span>
            <span>·</span>
            <span>30-Day Post-Launch Support</span>
            <span>·</span>
            <span>100% Vector IP Transfer</span>
          </div>
        </div>
      </section>

      <ServiceToolCtaBanner toolKeys={['project-cost-estimator', 'website-audit']} />
      <Footer />
    </div>
  );
};

export default BrandBuildingPage;

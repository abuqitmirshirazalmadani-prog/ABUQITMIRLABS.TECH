"use client";

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  BarChart3, 
  SearchCode, 
  Workflow, 
  Target, 
  ShieldCheck, 
  ArrowUpRight,
  Plus,
  Monitor,
  LayoutGrid,
  FileSearch,
  Globe,
  Star,
  Zap,
  TrendingUp,
  Code2,
  Smartphone,
  Cpu,
  Settings,
  HelpCircle,
  Clock,
  CheckCircle2,
  Sliders,
  Database,
  Heart,
  Scale,
  Home,
  HeartPulse,
  Activity,
  Wrench,
  Shield,
  Palette,
  PenTool,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import HeroText from '../components/ui/hero-shutter-text';
import SEOPricing from '../components/SEOPricing';

const SEOPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      q: "What is search engine optimization (SEO), and why is it important?",
      a: "Search engine optimization is the practice of improving your website's visibility in organic (non-paid) search results. When users search for products or services you offer, you want your website to appear at the top. Professional SEO services ensure your website is optimized to rank for relevant search terms, driving targeted traffic and generating leads."
    },
    {
      q: "How long does SEO take to show results?",
      a: "SEO is a long-term strategy. While you may see some improvements within 1–3 months, meaningful results typically take 4–6 months. Sustainable rankings and authority often develop over 6–12 months of consistent effort. We provide regular progress updates and manage expectations throughout the process."
    },
    {
      q: "How much do professional SEO services cost?",
      a: "Our professional SEO services start at $250/month for local SEO and $1,000+/month for comprehensive organic growth. We provide transparent pricing with clear deliverables and no hidden fees."
    },
    {
      q: "Do you guarantee #1 rankings?",
      a: "No legitimate SEO company can guarantee #1 rankings. Search engines use complex algorithms that are constantly evolving. We guarantee transparent work, data-driven strategies, and continuous improvement—but we cannot guarantee specific rankings due to external market factors."
    },
    {
      q: "How do you measure SEO success?",
      a: "We measure success through a combination of: organic traffic growth, keyword ranking improvements, lead and conversion increases, revenue attribution from organic search, and competitive positioning improvements."
    },
    {
      q: "Can you help a small business with SEO?",
      a: "Yes! We have specific strategies and packages designed for small businesses and startups. Our SEO services scale to meet any budget and business size, with a focus on delivering maximum ROI from your investment."
    }
  ];

  const techStack = [
    { category: "Keyword Research", tools: "SEMrush, Ahrefs, Google Keyword Planner, AnswerThePublic", purpose: "Discover and analyze target keywords" },
    { category: "Technical SEO", tools: "Screaming Frog, Google Search Console, Sitebulb", purpose: "Crawl and audit website infrastructure" },
    { category: "Rank Tracking", tools: "SEMrush Position Tracking, AccuRanker, Ahrefs Rank Tracker", purpose: "Monitor keyword rankings" },
    { category: "Backlink Analysis", tools: "Ahrefs, Majestic, Moz Link Explorer", purpose: "Analyze and build link authority" },
    { category: "Content Optimization", tools: "Surfer SEO, Clearscope, Frase", purpose: "Optimize content for relevance and SEO" },
    { category: "Analytics", tools: "Google Analytics 4, Google Tag Manager, Hotjar", purpose: "Track user behavior and conversions" },
    { category: "Schema Markup", tools: "Google Structured Data Testing Tool, Schema Markup Generator", purpose: "Implement and validate schema" },
    { category: "Monitoring", tools: "Google Search Console, Bing Webmaster Tools", purpose: "Track crawling, indexing, and performance" }
  ];

  return (
    <div className="bg-[#000000] text-slate-100 font-sans antialiased overflow-x-hidden min-h-screen relative selection:bg-[#ccff00]/30 selection:text-white">
      <Helmet>
        <title>SEO Services | Professional Search Engine Optimization | AbuQitmirLabs</title>
        <meta name="description" content="AbuQitmirLabs delivers data-driven SEO services — technical audits, on-page optimization, local SEO, and authority building. Rank higher, attract quality traffic, and grow your business." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/seo-mastery" />
        
        {/* Open Graph */}
        <meta property="og:title" content="SEO Services | Professional Search Engine Optimization | AbuQitmirLabs" />
        <meta property="og:description" content="AbuQitmirLabs delivers data-driven SEO services — technical audits, on-page optimization, local SEO, and authority building. Rank higher, attract quality traffic, and grow your business." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/seo-mastery" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SEO Services | Professional Search Engine Optimization | AbuQitmirLabs" />
        <meta name="twitter:description" content="AbuQitmirLabs delivers data-driven SEO services — technical audits, on-page optimization, local SEO, and authority building. Rank higher, attract quality traffic, and grow your business." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Schema Markup with BreadcrumbList, Service, FAQPage, and HowTo */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.abuqitmirlabs.tech"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "SEO Mastery",
                    "item": "https://www.abuqitmirlabs.tech/seo-mastery"
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "name": "AbuQitmirLabs",
                "url": "https://www.abuqitmirlabs.tech",
                "logo": "https://www.abuqitmirlabs.tech/logo.png",
                "image": "https://www.abuqitmirlabs.tech/logo.png",
                "telephone": "+923233260859",
                "priceRange": "$$$",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "8/15, 37/A 3, Area Shah Khalid Colony Sector 37 A Landhi Town",
                  "addressLocality": "Karachi",
                  "addressRegion": "Sindh",
                  "postalCode": "75160",
                  "addressCountry": "PK"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "24.842691448838718",
                  "longitude": "67.1862014846566"
                },
                "sameAs": [
                  "https://wa.me/923233260859",
                  "https://github.com/abuqitmir"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Professional SEO Services",
                "serviceType": "Search Engine Optimization",
                "provider": {
                  "@type": "LocalBusiness",
                  "name": "AbuQitmirLabs",
                  "url": "https://www.abuqitmirlabs.tech",
                  "logo": "https://www.abuqitmirlabs.tech/logo.png",
                  "image": "https://www.abuqitmirlabs.tech/logo.png",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Karachi",
                    "addressCountry": "PK"
                  }
                },
                "description": "At AbuQitmirLabs, we build SEO strategies that deliver sustainable organic growth—not quick fixes that vanish with the next algorithm update. We run full technical audits, fix crawl/indexing issues, and build content structures that search engines understand.",
                "areaServed": ["US", "UK", "CA", "AU", "PL", "PK"],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Professional SEO Solutions",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "SEO Services for Non-Profit Organizations",
                        "description": "Non-profits need search visibility that amplifies their mission without draining limited resources. Our SEO solutions optimize donation pages, volunteer recruitment, and impact stories to attract supporters."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "SEO Services for Small Law Firms",
                        "description": "Small law firms need to appear when potential clients search for legal help in their area. Our SEO strategies target practice-area-specific keywords, build local citations, and optimize Google Business Profiles."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Local SEO for Real Estate",
                        "description": "Real estate is inherently local. Our local SEO optimizes listings for neighborhood-specific terms, manages Google Business Profile map pack rankings, and builds local citations to capture high-intent buyers and sellers."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Local SEO for Non-Profit Organizations",
                        "description": "Local visibility helps non-profits connect with local community members, volunteers, and donors who care about their cause. We build geographic local signals and optimize listings to foster community presence."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Local SEO for Small Law Firms",
                        "description": "For small law firms, local search visibility is essential to attract clients in your service area. We optimize maps, coordinate geo-targeted citations, and build local trust indicators."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Healthcare & Clinic Local Search Optimization",
                        "description": "Healthcare providers need to appear when patients search for medical services nearby. Our Google Business Profile optimization ensures your practice appears with accurate listings and robust patient trust signals."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Dental Practice Local Optimization",
                        "description": "Dentists rely heavily on local search to attract new patients. Our Google Business Profile optimization ensures your practice appears prominently in local queries with review management."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Contractor & Trade Local SEO",
                        "description": "Home service contractors depend on local visibility to generate leads. We optimize profiles for contractors like roofers, plumbers, and electricians to rank high in their specific service areas."
                      }
                    }
                  ]
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
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
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "Our Search Engine Optimization Framework",
                "description": "A proven, highly rigorous 5-step methodology combining technical SEO audits, semantic content maps, and sustainable off-page authority builds.",
                "step": [
                  {
                    "@type": "HowToStep",
                    "name": "Discovery & Audit",
                    "text": "Comprehensive analysis of website technical architecture, mobile usability, speed diagnostics, and deep competitor search footprint benchmarking."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Keyword Strategy & Content Optimization",
                    "text": "Developing geographic semantic entity maps, keyword alignment sheets, on-page schema tag integrations, and strategic internal link hierarchies."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Technical SEO Implementation",
                    "text": "Remediating indexing faults, fixing rendering obstacles, improving crawl efficiency, and optimizing Core Web Vitals to solid green values."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Off-Page SEO & Authority Building",
                    "text": "Securing sustainable, high-relevance editorial backlink connections and building localized digital citations across authoritative registries."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Performance Monitoring & Continuous Optimization",
                    "text": "Configuring rigorous tracking for search entity rankings, organic click-through trends, and mapping traffic patterns directly to business conversions."
                  }
                ]
              }
            ])
          }}
        ></script>
      </Helmet>

      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-24 md:pt-32 pb-20 px-6 z-10">
        <motion.div 
          initial={{ opacity: 0, rotate: -2 }}
          animate={{ opacity: 1, rotate: -2 }}
          className="inline-block bg-white border-4 border-black px-6 py-2 rounded-full font-black mb-8 brutalist-shadow lowercase text-xl"
        >
          We build digital empires
        </motion.div>

        <div className="mb-4">
          <HeroText text="MASTERY" />
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-black text-center mb-10 leading-[0.95] max-w-6xl uppercase"
        >
          SEO Mastery: <br />
          <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Data-Driven Search</span> <br />
          <span className="text-[#ccff00]">| Engine Optimization</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-zinc-800 text-center max-w-4xl mb-12 leading-relaxed font-bold font-sans"
        >
          Ranking isn't about stuffing keywords — it's about technical health plus content that answers search intent. Starting from our <Link to="/" className="text-black underline font-extrabold hover:text-[#ff0099]">home page</Link>, we build scalable search architectures. Explore our specialized <Link to="/local-seo-for-small-business" className="text-black underline font-extrabold hover:text-[#ff0099]">Local SEO for Small Businesses</Link>, <Link to="/local-seo-citation-building" className="text-black underline font-extrabold hover:text-[#ff0099]">Citation Building</Link>, <Link to="/white-label-local-seo" className="text-black underline font-extrabold hover:text-[#ff0099]">White Label Local SEO</Link>, and <Link to="/local-seo-audit" className="text-black underline font-extrabold hover:text-[#ff0099]">Local SEO Audits</Link>. Pair SEO with <Link to="/custom-software" className="text-black underline font-extrabold hover:text-[#ff0099]">Custom Software</Link>, <Link to="/web-development" className="text-black underline font-extrabold hover:text-[#ff0099]">Web Development</Link>, <Link to="/mobile-app-development" className="text-black underline font-extrabold hover:text-[#ff0099]">Mobile Apps</Link>, <Link to="/ai-agent-development" className="text-black underline font-extrabold hover:text-[#ff0099]">AI Agents</Link>, or <Link to="/content-writing" className="text-black underline font-extrabold hover:text-[#ff0099]">Content Writing</Link>. Review our <Link to="/case-studies" className="text-black underline font-extrabold hover:text-[#ff0099]">Case Studies</Link> &amp; <Link to="/blog" className="text-black underline font-extrabold hover:text-[#ff0099]">Blog</Link>, learn more <Link to="/about" className="text-black underline font-extrabold hover:text-[#ff0099]">about us</Link>, or <Link to="/contact" className="text-black underline font-extrabold hover:text-[#ff0099]">get in touch</Link>.
        </motion.p>

        {/* Core Capabilities Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mx-auto mb-12 max-w-4xl border-y border-black/10 py-8 px-6 bg-white/50 backdrop-blur-sm rounded-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-left">
            {[
              "Technical SEO Audits & Crawl Error Fixes",
              "On-Page & Semantic Entity Optimization",
              "XML Sitemap & Schema Markup Implementation",
              "Local SEO & Google Business Profile Optimization",
              "Content Strategy Aligned with Search Intent"
            ].map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-3 group">
                <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0 group-hover:bg-[#ff0099] transition-colors duration-300" />
                <span className="text-sm font-sans font-bold text-zinc-800 tracking-tight leading-relaxed group-hover:text-black transition-colors duration-300">{bullet}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a 
            href="https://wa.me/923233260859"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-8 bg-black text-[#ccff00] text-xl font-black border-4 border-black rounded-3xl brutalist-shadow hover:scale-105 transition-transform flex flex-col items-center justify-center gap-2 uppercase"
          >
            <Zap size={24} />
            Request a Free SEO Audit
          </a>
          <button 
            onClick={() => {
              const el = document.getElementById('seo-pricing');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-12 py-8 bg-white text-black text-xl font-black border-4 border-black rounded-3xl brutalist-shadow hover:scale-105 transition-transform flex flex-col items-center justify-center gap-2 uppercase"
            style={{ color: '#000000' }}
          >
            <Star size={24} className="text-black" style={{ color: '#000000' }} />
            <span className="text-black font-black" style={{ color: '#000000' }}>See SEO Pricing &amp; Packages</span>
          </button>
        </motion.div>
      </section>

      {/* Section 2: The Problem / Opportunity */}
      <section className="py-32 border-b-[8px] border-black bg-white relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-16">
            <div>
              <div className="inline-block bg-[#ff0099] text-white font-black px-6 py-2 border-4 border-black rounded-lg mb-8 transform -rotate-3 brutalist-shadow uppercase text-xl">
                The Dilemma
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter leading-[0.9] uppercase mb-4">
                Is your website invisible to your ideal customers?
              </h2>
            </div>
            
            <div className="bg-[#ccff00]/10 border-4 border-black p-10 rounded-[40px] brutalist-shadow">
              <h3 className="text-2xl font-black text-black uppercase mb-4">The Art of SEO: Mastering Search Engine Optimization</h3>
              <p className="text-lg md:text-xl font-bold leading-relaxed text-black font-sans mb-4">
                Ranking on the first page of Google isn't luck, and it isn't a single trick — it's the compounding result of technical precision, genuine content authority, and consistent execution over time.
              </p>
              <p className="text-base leading-relaxed text-zinc-800 font-bold font-sans">
                At AbuQitmirLabs, our approach to <strong>search engine optimization (SEO)</strong> treats ranking as an engineering discipline as much as a marketing one, because in 2026, that's exactly what it has become.
              </p>
            </div>
          </div>

          <div className="border-t-4 border-black pt-16">
            <h3 className="text-2xl md:text-3xl font-black text-black uppercase mb-10 tracking-tight">
              The AbuQitmirLabs Difference:
            </h3>
            <p className="text-lg text-zinc-700 font-medium mb-10 max-w-4xl">
              Our <strong className="text-black font-extrabold">technical SEO services</strong> start with a comprehensive audit that uncovers every opportunity for improvement. We analyze:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "On-page factors", desc: "Content quality, keyword targeting, and meta-optimization strategies" },
                { title: "Technical infrastructure", desc: "Site speed optimization, mobile responsiveness, and crawlability diagnostics" },
                { title: "Backlink profile", desc: "Authority evaluation, topical relevance, and premium brand growth opportunities" },
                { title: "User experience", desc: "Engagement metrics, bounce rates, and high-converting pathway optimization" }
              ].map((factor, i) => (
                <div key={i} className="bg-[#f4f4f5] border-4 border-black p-8 rounded-2xl brutalist-shadow">
                  <span className="text-xs font-mono text-[#ff0099] font-bold block mb-2">// 0{i+1}</span>
                  <h4 className="text-lg font-black text-black uppercase tracking-tight mb-2">{factor.title}</h4>
                  <p className="text-sm font-bold leading-relaxed text-zinc-700">{factor.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-black text-[#ccff00] p-8 border-4 border-black rounded-3xl brutalist-shadow text-center max-w-3xl mx-auto">
              <p className="text-lg font-bold">
                Our <strong className="text-white font-extrabold">SEO audit services</strong> provide a clear roadmap for improvement, prioritizing actions that deliver the highest ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Our SEO Services Cover */}
      <section className="py-32 border-b-[8px] border-black bg-[#f4f4f5] relative z-10 px-6" id="seo-services-cover">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center max-w-4xl mx-auto">
            <span className="text-xs font-mono text-[#ff0099] mb-4 uppercase tracking-[0.4em] font-bold block">[ SERVICE_SCOPE ]</span>
            <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter leading-none mb-6 uppercase">
              What Our SEO <br />
              <span className="text-[#ccff00] bg-black px-4 inline-block transform rotate-1 border-4 border-black">Services Cover</span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-800 font-bold leading-relaxed font-sans">
              As a full-service <strong>SEO agency</strong>, we work across every layer that determines whether a website actually ranks — not just the parts that are easy to sell:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Technical SEO",
                icon: <SearchCode className="w-8 h-8 text-black" />,
                desc: "Site architecture, crawlability, page speed, structured data, and the underlying infrastructure that determines whether Google can even properly index and understand your site in the first place."
              },
              {
                title: "On-Page & Content SEO",
                icon: <Target className="w-8 h-8 text-[#ff0099]" />,
                desc: "Keyword research grounded in real search intent, content structured for both readability and search relevance, and internal linking strategies that distribute authority across a site rather than concentrating it on a single page."
              },
              {
                title: "Local SEO & Google Business Profile Optimization",
                icon: <MapPin className="w-8 h-8 text-black" />,
                desc: "For businesses that depend on regional foot traffic and local discovery, we manage complete Google Business Profile optimization — from forensic listing audits and category calibration to structured review acquisition and local citation consistency. A well-optimized profile often drives more direct customer inquiries than any other local channel, which is why we treat it as a foundational organic discipline."
              },
              {
                title: "Off-Page SEO & Authority Building",
                icon: <BarChart3 className="w-8 h-8 text-[#ff0099]" />,
                desc: "Earning legitimate backlinks and citations that build real domain authority — not shortcuts that put a site at risk of penalties down the line."
              }
            ].map((srv, idx) => (
              <div key={idx} className="bg-white border-4 border-black p-10 rounded-3xl brutalist-shadow hover:bg-[#ccff00]/10 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#ccff00] border-4 border-black rounded-xl flex items-center justify-center text-black shrink-0">
                    {srv.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">{srv.title}</h3>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-zinc-700 font-bold font-sans">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Effective SEO Techniques for 2026 */}
      <section className="py-32 border-b-[8px] border-black bg-white relative z-10 px-6" id="seo-techniques-2026">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="inline-block bg-[#ccff00] text-black font-black px-6 py-2 border-4 border-black rounded-lg mb-8 transform -rotate-2 brutalist-shadow uppercase text-xl">
                The 2026 Playbook
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter leading-[0.95] uppercase mb-6">
                Effective SEO <br />
                Techniques <br />
                <span className="text-[#ff0099]">for 2026</span>
              </h2>
              <p className="text-lg text-zinc-800 font-bold leading-relaxed font-sans">
                Search engine optimization strategies that worked five years ago don't necessarily hold up today. The algorithm is evolving rapidly, and our techniques have evolved alongside it to protect and grow your traffic.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {[
                {
                  title: "Search intent has overtaken keyword density.",
                  desc: "Google's Helpful Content System reads for whether content genuinely answers the searcher's question, not whether a phrase appears a fixed number of times."
                },
                {
                  title: "E-E-A-T signals matter more with every update.",
                  desc: "Demonstrated experience, expertise, authoritativeness, and trustworthiness increasingly separate ranking pages from unranked ones, especially in competitive niches."
                },
                {
                  title: "AI-driven search reads for context, not keyword matching.",
                  desc: "Engines like Gemini, ChatGPT Search, and Perplexity trace a page's actual topical depth through semantic understanding rather than counting exact-match phrases — which means thin, keyword-stuffed pages tend to get passed over entirely rather than ranked lower."
                },
                {
                  title: "On-page formatting still carries weight.",
                  desc: "This includes sensible use of bolding for key terms and clear heading structure — but as a readability aid for both users and crawlers, not as a way to inflate keyword density."
                }
              ].map((tech, i) => (
                <div key={i} className="bg-[#f4f4f5] border-4 border-black p-8 rounded-2xl brutalist-shadow flex gap-6">
                  <div className="text-xl font-mono text-[#ff0099] font-black shrink-0">// 0{i+1}</div>
                  <div>
                    <h3 className="text-lg md:text-xl font-black uppercase mb-2 text-black leading-tight">{tech.title}</h3>
                    <p className="text-sm md:text-base text-zinc-700 font-bold leading-relaxed font-sans">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO for Every Kind of Business */}
      <section className="py-32 border-b-[8px] border-black bg-[#f4f4f5] relative z-10 px-6" id="local-seo-businesses">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-[#ccff00]/10 border-4 border-black p-10 md:p-14 rounded-[40px] brutalist-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-3xl pointer-events-none" />
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-4 font-black">// LOCALIZATION PROTOCOLS</span>
              <h3 className="text-2xl md:text-4xl font-black text-black uppercase mb-6 leading-tight">
                Local SEO for <br />Every Kind of Business
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-zinc-800 font-bold font-sans mb-6">
                Local search strategies vary significantly depending on customer intent. A dental clinic or emergency contractor requires immediate map visibility built around local proximity and urgent booking needs, while a B2B consultancy requires multi-regional entity authority and specialized service citations.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-zinc-700 font-bold font-sans">
                We develop customized local search roadmaps tailored to your commercial market dynamics, customer search intent, and geographic coverage area.
              </p>
            </div>

            <div className="bg-white border-4 border-black p-10 md:p-14 rounded-[40px] brutalist-shadow space-y-8">
              <div className="inline-block bg-[#ff0099] text-white font-mono text-xs uppercase tracking-widest px-4 py-2 border-2 border-black rounded-lg">
                Agency &amp; Enterprise Support
              </div>
              <h3 className="text-xl md:text-3xl font-black text-black uppercase leading-tight">
                White-Label Local SEO <br />for Agencies &amp; Partners
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-zinc-700 font-bold font-sans">
                For digital agencies and enterprise marketing departments managing multi-location accounts, we deliver white-label local SEO fulfilment — providing brandable technical audits, citation management, and performance reporting under your agency banner.
              </p>
              <div className="flex gap-4 items-center border-t-2 border-black pt-6">
                <ShieldCheck className="w-8 h-8 text-[#ff0099] shrink-0" />
                <span className="text-xs font-mono font-black text-black uppercase">Strict confidentiality &amp; elite service delivery guaranteed.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO & Local SEO — Industry-Focused Solutions for Every Sector */}
      <section className="py-32 border-b-[8px] border-black bg-[#f4f4f5] relative z-10 px-6" id="seo-industry-solutions">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center max-w-4xl mx-auto">
            <span className="text-xs font-mono text-[#ff0099] mb-4 uppercase tracking-[0.4em] font-bold block">[ ORGANIC_DOMINANCE_BY_SECTOR ]</span>
            <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter leading-none mb-6 uppercase">
              SEO &amp; Local SEO — <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Industry-Focused Solutions</span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-800 font-bold leading-relaxed font-sans">
              At AbuQitmirLabs, we build SEO strategies that deliver sustainable organic growth—not quick fixes that vanish with the next algorithm update. Our approach begins with understanding your industry's unique competitive landscape, customer behavior, and local market dynamics before we optimize a single page. Whether you need national visibility, local dominance, or Google Business Profile mastery, we build strategies that fit your business, not the other way around.
            </p>
          </div>

          {/* Grid of 8 Sectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                id: "ind-solution-nonprofit-seo",
                title: "SEO for Non-Profits",
                icon: <Heart className="w-8 h-8 text-[#ff0099]" />,
                tagline: "Donor & Volunteer Discovery",
                description: "Charitable foundations and advocacy groups require search visibility that turns passive cause-awareness into verified donations and volunteer sign-ups. We structure grant-friendly content hierarchies, optimize donor landing funnels, and target high-intent non-profit keywords to maximize community reach on sustainable budgets."
              },
              {
                id: "ind-solution-law-seo",
                title: "SEO for Law Firms",
                icon: <Scale className="w-8 h-8 text-black" />,
                tagline: "High-Value Case Acquisition",
                description: "Litigation practices and boutique firms face fierce competition in organic search. We focus on granular practice-area content hubs—such as commercial dispute, personal injury, and corporate compliance pages—engineered with authoritative E-E-A-T credentials that turn informational searches into qualified consultations."
              },
              {
                id: "ind-solution-realestate-seo",
                title: "Local SEO for Real Estate",
                icon: <Home className="w-8 h-8 text-[#ff0099]" />,
                tagline: "Hyper-Local Property Search",
                description: "Property transactions hinge on micro-location search intent. We optimize agency listings around specific school districts, transit corridors, and neighborhood developments, pairing structured real estate schema with verified map positioning to capture motivated buyers and sellers in active regional markets."
              },
              {
                id: "ind-solution-nonprofit-local",
                title: "Local Outreach for Non-Profits",
                icon: <MapPin className="w-8 h-8 text-black" />,
                tagline: "Civic & Regional Engagement",
                description: "Regional charities and community centers thrive on local civic engagement. We optimize local directory citations, manage regional event schema, and calibrate map visibility so nearby residents, local municipal partners, and community volunteers find your regional headquarters without friction."
              },
              {
                id: "ind-solution-law-local",
                title: "Local Search for Legal Practices",
                icon: <Shield className="w-8 h-8 text-[#ff0099]" />,
                tagline: "Regional Map Pack Authority",
                description: "When individuals face urgent legal matters, proximity and immediate credibility dictate their choice of counsel. We engineer localized citation networks and optimize geographical service boundaries to ensure your partners rank in competitive local map packs when clients search for nearby legal representation."
              },
              {
                id: "ind-solution-healthcare-gmb",
                title: "Healthcare & Clinic Optimization",
                icon: <HeartPulse className="w-8 h-8 text-black" />,
                tagline: "Patient Trust & Discovery",
                description: "Medical practices and specialized clinics must project clinical competence before a patient schedules their first consultation. We implement secure medical schema, optimize provider credential profiles, and establish verified local entity signals that build patient confidence and streamline appointment requests."
              },
              {
                id: "ind-solution-dentists-gmb",
                title: "SEO for Dental Practices",
                icon: <Activity className="w-8 h-8 text-[#ff0099]" />,
                tagline: "Appointment-Driven Search",
                description: "Dental clinics need consistent visibility for high-intent emergency and cosmetic search terms like 'emergency dentist near me' or 'Invisalign provider'. We optimize localized procedure pages, curate authentic patient review signals, and ensure real-time office hours and booking links remain accurate across search engines."
              },
              {
                id: "ind-solution-contractors-gmb",
                title: "Contractor & Trade Search",
                icon: <Wrench className="w-8 h-8 text-black" />,
                tagline: "Emergency & Service Calls",
                description: "Roofers, electricians, and HVAC contractors win jobs through rapid emergency discovery and verified local credibility. We configure precise service-radius parameters, optimize high-demand trade service pages, and build photo-rich project verification signals that keep your dispatch lines busy year-round."
              }
            ].map((sector, idx) => (
              <div
                key={idx}
                id={sector.id}
                className="bg-white border-4 border-black p-8 rounded-2xl brutalist-shadow hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-6 w-14 h-14 bg-[#ccff00]/20 border-4 border-black rounded-xl flex items-center justify-center">
                    {sector.icon}
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">{sector.title}</h3>
                  <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-4 font-bold">
                    {sector.tagline}
                  </span>
                  <p className="text-xs leading-relaxed text-zinc-700 font-bold font-sans">{sector.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Our SEO Framework */}
      <section className="py-32 bg-[#ccff00] relative z-10 px-6 border-b-[8px] border-black shadow-[inset_0_20px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block bg-black text-[#ccff00] font-black px-6 py-2 border-4 border-black rounded-lg mb-8 transform rotate-2 brutalist-shadow uppercase text-xl">
            Our SEO Framework
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-8 uppercase leading-[0.95]">
            We follow a proven methodology <br />
            <span className="text-white">combining technical rigor with strategy.</span>
          </h2>

          <div className="grid grid-cols-1 gap-8 mt-16 text-black">
            {[
              {
                step: "01",
                icon: <Search className="w-10 h-10" />,
                title: "🔍 Discovery & Audit",
                quote: "Understand before you act.",
                desc: "We begin with a comprehensive analysis of your website, competitors, and market landscape. This phase includes:",
                items: [
                  "Technical SEO audit: Crawlability, indexing, site speed, mobile usability, and Core Web Vitals",
                  "Content analysis: Assessing quality, relevance, keyword coverage, and gap identification",
                  "Competitor benchmarking: Analyzing your competition's SEO strengths and weaknesses",
                  "Backlink analysis: Evaluating your current authority and link building opportunities",
                  "Conversion pathway analysis: Understanding how users interact with your site"
                ],
                deliverable: "Detailed SEO audit report with prioritized recommendations."
              },
              {
                step: "02",
                icon: <Target className="w-10 h-10" />,
                title: "🎯 Keyword Strategy & Content Optimization",
                quote: "The right words for the right audience.",
                desc: "We develop a comprehensive keyword strategy that aligns with your business goals and audience intent:",
                items: [
                  "Keyword mapping: Assigning target keywords to specific pages",
                  "Content optimization: Enhancing existing content for relevance and rankings",
                  "Content gap analysis: Identifying opportunities for new content creation",
                  "On-page optimization: Title tags, meta descriptions, headers, alt text, and internal linking",
                  "Schema markup: Implementing structured data for enhanced search results"
                ],
                deliverable: "Keyword strategy document and optimized content briefs."
              },
              {
                step: "03",
                icon: <Code2 className="w-10 h-10" />,
                title: "⚙️ Technical SEO Implementation",
                quote: "The foundation of visibility.",
                desc: "We optimize the technical architecture of your website to ensure search engines can crawl, index, and rank your content effectively:",
                items: [
                  "Core Web Vitals optimization: Improving loading speed, interactivity, and visual stability",
                  "Mobile optimization: Ensuring seamless mobile experience",
                  "Site architecture: Improving structure and navigation for better crawling",
                  "XML sitemaps & robots.txt: Ensuring proper indexing",
                  "Security enhancements: HTTPS migration and security best practices"
                ],
                deliverable: "Fully optimized technical infrastructure."
              },
              {
                step: "04",
                icon: <Workflow className="w-10 h-10" />,
                title: "🧠 Off-Page SEO & Authority Building",
                quote: "Building trust through quality connections.",
                desc: "We build your authority through strategic link acquisition and brand visibility:",
                items: [
                  "Link acquisition strategy: Earning high-quality backlinks from authoritative sources",
                  "Digital PR: Securing media coverage and mentions",
                  "Content distribution: Syndicating content across relevant platforms",
                  "Directory submissions: Building citations and local signals",
                  "Social signals: Leveraging social media for brand visibility"
                ],
                deliverable: "Monthly link acquisition reports and authority growth tracking."
              },
              {
                step: "05",
                icon: <BarChart3 className="w-10 h-10" />,
                title: "📊 Performance Monitoring & Optimization",
                quote: "Measure, refine, repeat.",
                desc: "We continuously monitor performance and refine our approach to maximize results:",
                items: [
                  "Rank tracking: Monitoring keyword positions across search engines",
                  "Traffic analytics: Analyzing user behavior and engagement",
                  "Conversion tracking: Measuring leads, sales, and revenue impact",
                  "Competitor monitoring: Tracking competitive landscape and market share",
                  "Algorithm updates: Staying ahead of search engine changes"
                ],
                deliverable: "Monthly performance reports with actionable insights."
              }
            ].map((p, idx) => (
              <div key={idx} className="bg-white border-4 border-black p-10 rounded-3xl brutalist-shadow">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-4 mb-6">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] tracking-widest bg-black text-white px-3 py-1.5 rounded uppercase font-bold">PHASE {p.step}</span>
                    <h3 className="text-xl md:text-2xl font-black">{p.title}</h3>
                  </div>
                  <em className="text-zinc-500 font-serif font-black">"{p.quote}"</em>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5">
                    <p className="text-base font-bold text-zinc-800 font-sans mb-4 leading-relaxed">{p.desc}</p>
                    <div className="p-4 bg-zinc-100 border-2 border-black rounded-xl">
                      <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#ff0099] block mb-1">Deliverable Output //</span>
                      <p className="text-xs font-mono font-extrabold text-black uppercase">{p.deliverable}</p>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <ul className="space-y-2">
                      {p.items.map((item, i) => (
                        <li key={i} className="flex gap-3 text-xs md:text-sm font-bold text-black font-sans leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Technology & Tools */}
      <section className="py-32 bg-white relative z-10 px-6 border-b-[8px] border-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-mono text-zinc-500 block mb-2 font-black">// SECTION 4: SEO TOOLING</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-black uppercase mb-4">
              Technology &amp; Tools We Command
            </h2>
            <p className="text-base md:text-lg text-zinc-700 max-w-2xl font-bold font-sans lead-relaxed">
              We leverage the most sophisticated tools in the industry to optimize, analyze, and measure your SEO performance.
            </p>
          </div>

          <div className="border-4 border-black rounded-3xl overflow-hidden brutalist-shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white font-mono text-xs uppercase tracking-widest border-b-4 border-black">
                    <th className="p-6">Category</th>
                    <th className="p-6">Tools</th>
                    <th className="p-6">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black text-xs md:text-sm font-bold text-zinc-800">
                  {techStack.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#ccff00]/10 transition-colors bg-white">
                      <td className="p-6 bg-zinc-100/50 font-mono text-xs uppercase tracking-wider text-black font-black border-r-2 border-black">{row.category}</td>
                      <td className="p-6 border-r-2 border-black font-sans font-black text-black">{row.tools}</td>
                      <td className="p-6 font-sans font-medium text-zinc-600">{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Authoritative External Links */}
          <div className="mt-8 pt-6 border-t-4 border-black flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-800">
            <span className="text-black uppercase tracking-widest font-black">Authoritative SEO Resources:</span>
            <a href="https://developers.google.com/search" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-black hover:text-[#ff0099] transition-colors">
              Google Search Central <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-black font-black">•</span>
            <a href="https://ahrefs.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-black hover:text-[#ff0099] transition-colors">
              Ahrefs Index <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-black font-black">•</span>
            <a href="https://moz.com/blog" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-black hover:text-[#ff0099] transition-colors">
              Moz SEO Blog <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-black font-black">•</span>
            <a href="https://www.searchenginejournal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-black hover:text-[#ff0099] transition-colors">
              Search Engine Journal <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Section 5: SEO Across Global Markets */}
      <section className="py-32 bg-white relative z-10 px-6 border-b-[8px] border-black" id="seo-global-markets">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-6">
              <span className="text-xs font-mono text-[#ff0099] mb-4 uppercase tracking-[0.4em] font-bold block">[ GLOBAL_ORGANIC_FOOTPRINT ]</span>
              <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter leading-none mb-6 uppercase">
                SEO Across <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Global Markets</span>
              </h2>
              <div className="mb-8">
                <h3 className="text-xl font-black text-black uppercase tracking-tight mb-3">Where We Work</h3>
                <p className="text-sm md:text-base text-zinc-800 font-bold leading-relaxed font-sans">
                  AbuQitmirLabs is based in <strong>Karachi, Pakistan</strong>, and our local search optimization practice is grounded in hands-on experience navigating regional and international ranking factors. Alongside our domestic work, we support <strong>SEO engagements for international clients</strong>, including businesses across the United States, the United Kingdom, Canada, Australia, and Europe, adapting our approach to the specific search behavior and competitive landscape of each target market:
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    market: "United States",
                    text: "SEO services in the United States for businesses that need to compete in one of the world's most competitive digital landscapes. From local SEO for small businesses to enterprise-level organic strategies, we help US clients achieve sustainable visibility."
                  },
                  {
                    market: "United Kingdom",
                    text: "SEO services in the United Kingdom aligned with UK search behavior and local ranking factors, ensuring your brand resonates with British audiences."
                  },
                  {
                    market: "Canada",
                    text: "Local SEO in Canada that reflects the country's bilingual and multicultural landscape, with compliance to Canadian accessibility and data protection standards."
                  },
                  {
                    market: "Australia",
                    text: "Local search and Google Business Profile optimization for Australian businesses, ensuring accurate directory citations, positive review momentum, and top local map rankings across major metropolitan centers."
                  },
                  {
                    market: "Poland",
                    text: "SEO services in Poland that bridge the gap between global standards and local market needs, helping Polish businesses expand their digital footprint."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border-l-4 border-black pl-6 py-2 bg-[#f4f4f5]/30 rounded-r-xl border-y border-r border-black/5 pr-4">
                    <h3 className="text-sm font-black text-black uppercase tracking-wider mb-2">{item.market}</h3>
                    <p className="text-xs text-zinc-700 leading-relaxed font-bold font-sans">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#ccff00] border-4 border-black p-8 md:p-12 rounded-[30px] brutalist-shadow relative overflow-hidden">
              <span className="text-xs font-mono text-black mb-4 uppercase tracking-[0.3em] font-bold block">// WHY_CHOOSE_US</span>
              <h3 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tight mb-6">
                Why Choose Us <br />Over Other SEO Companies?
              </h3>
              <p className="text-sm md:text-base text-zinc-900 leading-relaxed font-bold mb-8 font-sans">
                Among <strong>SEO companies</strong>, the ones that deliver lasting results tend to share one trait: they treat SEO as an ongoing discipline, not a one-time setup. Rankings built on genuine technical foundations and real content authority hold up through algorithm updates. Rankings built on shortcuts don't. As an <strong>organic SEO company</strong>, our work is built entirely on the former — sustainable visibility that doesn't disappear with the next Google update.
              </p>
              
              <div className="flex gap-4 items-center bg-white border-4 border-black p-6 rounded-2xl brutalist-shadow">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6 text-[#ccff00]" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-black uppercase font-sans">Let's build your visibility advantage.</h4>
                  <p className="text-xs text-zinc-700 font-bold font-sans">Sovereign organic authority engineered from Karachi to the globe.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Pricing & Packages */}
      <div id="seo-pricing">
        <SEOPricing />
      </div>

      {/* Which Package Is Right For You - requested content in Section 6 */}
      <section className="py-24 bg-black text-white relative z-10 px-6 border-b-[8px] border-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-black block mb-4">// SELECT YOUR BLUEPRINT</span>
            <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight uppercase">Which Package Is Right for You?</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Choose Local SEO Starter if:",
                items: [
                  "You're a small business or startup",
                  "You need to establish local visibility",
                  "You want to verify and optimize your Google Business Profile",
                  "Your budget is under $500/month"
                ],
                customStyle: "border-l-4 border-cyan-400 pl-6"
              },
              {
                title: "Choose Healthy Small Biz if:",
                items: [
                  "You're a growing business with existing local presence",
                  "You want to dominate local search results",
                  "You need ongoing review management and citation building",
                  "Your budget is $1,000–$2,000/month"
                ],
                customStyle: "border-l-4 border-purple-400 pl-6"
              },
              {
                title: "Choose Enterprise Agency if:",
                items: [
                  "You're an established brand in a competitive market",
                  "You need full-scale technical SEO and authority building",
                  "You require advanced schema markup and PR backlinks",
                  "Your budget is $1,500+/month"
                ],
                customStyle: "border-l-4 border-fuchsia-400 pl-6"
              },
              {
                title: "Choose DIY if:",
                items: [
                  "You have internal SEO resources",
                  "You prefer to manage tools and platforms yourself",
                  "You have a limited budget but technical capability"
                ],
                customStyle: "border-l-4 border-zinc-500 pl-6"
              }
            ].map((choice, i) => (
              <div key={i} className={`bg-zinc-900 border border-white/5 p-8 rounded-2xl ${choice.customStyle}`}>
                <h4 className="text-lg font-black text-white mb-4 uppercase tracking-tight">{choice.title}</h4>
                <ul className="space-y-2">
                  {choice.items.map((it, idx) => (
                    <li key={idx} className="flex gap-2.5 text-xs md:text-sm text-neutral-350 font-sans font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shrink-0 mt-2" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Country Marquee Component */}
      <CountryMarquee />

      {/* Section 7: Frequently Asked Questions */}
      <section className="py-32 bg-[#f4f4f5] border-b-[8px] border-black relative z-10 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-[#ff0099] mb-4 uppercase tracking-[0.5em] font-bold block">// SECTION 7: FAQ</span>
            <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter uppercase leading-none">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, idx) => (
              <details key={idx} className="group bg-white border-4 border-black rounded-2xl brutalist-shadow open:bg-white transition-all duration-300">
                <summary className="flex justify-between items-center p-6 md:p-8 cursor-pointer select-none group-open:bg-gray-100 rounded-t-xl transition-colors">
                  <span className="text-base md:text-xl font-bold font-display uppercase tracking-tighter">{faq.q}</span>
                  <div className="w-10 h-10 border-4 border-black rounded-full flex items-center justify-center transition-transform duration-300 group-open:rotate-45 bg-[#ccff00]">
                    <Plus className="w-6 h-6" />
                  </div>
                </summary>
                <div className="p-6 md:p-8 pt-0 border-t-4 border-black mt-4 font-sans font-bold">
                  <p className="text-sm md:text-base leading-relaxed pt-6 text-zinc-700">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Call to Action */}
      <section className="bg-[#ccff00] py-40 relative z-10 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-mono text-black block mb-4 font-black uppercase tracking-[0.3em]">// SECTION 8: LAUNCH PROJECT</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-black tracking-tighter mb-8 lowercase leading-[0.85] uppercase">
            Ready to <span className="text-transparent" style={{ WebkitTextStroke: '3px black' }}>Actually Rank?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-zinc-900 font-bold max-w-2xl mx-auto mb-16 leading-relaxed">
            If your site is indexed but invisible in search results, the underlying cause is almost always fixable — usually a combination of thin content, weak internal linking, or a Google Business Profile that isn't being actively managed. Our team can audit exactly where the gaps are before recommending a strategy.
          </p>

          <div className="bg-white border-4 border-black p-8 md:p-10 rounded-3xl brutalist-shadow max-w-2xl mx-auto mb-16 text-left">
            <h3 className="text-xl md:text-2xl font-black uppercase text-black mb-2">Request a Free SEO Audit</h3>
            <p className="text-sm text-zinc-700 font-bold mb-6 font-sans">
              Our team will analyze your website's current performance and provide a comprehensive assessment of opportunities for improvement—at no cost.
            </p>
            <div className="flex border-t-2 border-black pt-4 justify-between items-center text-xs font-mono text-black font-extrabold tracking-widest uppercase">
              <span>Avg. Discovery Phase: 2 Weeks</span>
              <span>·</span>
              <span>Current Lead Time: 4 Weeks</span>
            </div>
          </div>

          <p className="text-base text-zinc-800 font-bold max-w-xl mx-auto mb-10 leading-relaxed">
            Let's discuss your SEO strategy. Our initial technical consultation and SEO audit are completely free.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-xl mx-auto">
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-black text-[#ccff00] text-xl font-black px-12 py-6 border-4 border-black rounded-full brutalist-shadow hover:scale-105 transition-transform duration-300 uppercase shrink-0"
            >
              Request an SEO Strategy Plan
            </a>
            
            <div className="text-black font-black text-xs uppercase tracking-widest max-w-[200px] text-left border-l-4 border-black pl-6 pt-2 pb-2">
               ESTABLISHED COGNITIVE SYSTEMS CO.
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Services / Internal Siloing */}
      <section className="py-24 bg-[#f4f4f5] border-t-8 border-black relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h3 className="text-xs font-mono text-black/40 mb-2 uppercase tracking-[0.4em] font-bold">[ RELATED_SYSTEMS ]</h3>
            <p className="text-sm font-bold text-zinc-700 font-sans">
              Explore our related services: <Link to="/custom-software" className="text-black underline hover:text-[#ff0099]">Custom Software Development</Link> · <Link to="/web-development" className="text-black underline hover:text-[#ff0099]">Web Development</Link> · <Link to="/content-writing" className="text-black underline hover:text-[#ff0099]">Content Writing</Link>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Custom Software", path: "/custom-software", icon: <Code2 className="w-5 h-5" /> },
              { title: "Web Development", path: "/web-development", icon: <Globe className="w-5 h-5" /> },
              { title: "Mobile Apps", path: "/mobile-app-development", icon: <Smartphone className="w-5 h-5" /> },
              { title: "AI Agents", path: "/ai-agent-development", icon: <Cpu className="w-5 h-5" /> },
              { title: "Creative Graphics", path: "/graphics-design", icon: <Palette className="w-5 h-5" /> },
              { title: "Content Writing", path: "/content-writing", icon: <PenTool className="w-5 h-5" /> }
            ].map((link, i) => (
              <Link 
                key={i} 
                to={link.path} 
                className="group flex items-center justify-between p-8 bg-white border-4 border-black rounded-2xl brutalist-shadow transition-all hover:-translate-y-1 hover:bg-[#ccff00]"
              >
                <div className="flex items-center gap-4">
                  <div className="text-black bg-[#f4f4f5] border-2 border-black p-3 rounded-lg group-hover:bg-black group-hover:text-white transition-all">
                    {link.icon}
                  </div>
                  <span className="font-bold uppercase tracking-tight text-black">{link.title}</span>
                </div>
                <ArrowUpRight className="text-black/30 group-hover:text-black transition-colors" size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SEOPage;

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Globe, 
  Zap, 
  Plus, 
  Cpu, 
  Search,
  Smartphone,
  ShieldCheck,
  Code,
  Layout,
  MessageSquare,
  Globe2,
  Lock
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import HeroText from '../components/ui/hero-shutter-text';
import { AnimatedShinyText } from '../components/ui/animated-shiny-text';
import { AnimatedBreathingText } from '../components/ui/animated-breathing-text';
import { MagicText } from '../components/ui/magic-text';

const PolandMarketPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      q: "Are your digital solutions compliant with EU GDPR?",
      a: "Strictly yes. We implement privacy-by-design in all our custom software, ensuring secure data encryption, explicit consent flows, and full compliance with the European Union's GDPR."
    },
    {
      q: "Can you help a Polish company rank in English-speaking markets?",
      a: "Absolutely. Our native-level, E-E-A-T compliant English content writing and international SEO strategies are specifically designed to help Polish businesses rank in the US, UK, and global search results."
    },
    {
      q: "What is the advantage of Jamstack for a Polish tech company?",
      a: "Polish tech companies need to project cutting-edge expertise. Jamstack provides sub-second load times, unbreakable security, and modern headless architectures that instantly prove your technical superiority."
    },
    {
      q: "How do you handle local SEO for Polish cities like Warsaw or Poznan?",
      a: "We optimize your Google Business Profile, build localized Polish directory citations, and write semantic content targeting specific regional search queries to capture local market share."
    },
    {
      q: "Can your AI agents handle multi-lingual European support?",
      a: "Yes. We build custom LLM agents capable of understanding and responding fluently in Polish, English, German, and other European languages, centralizing your continental customer support."
    },
    {
      q: "Do you build mobile apps for the European market?",
      a: "Yes. We use cross-platform frameworks like Flutter to build fast, intuitive native apps for iOS and Android, ensuring your Polish brand delivers a premium mobile experience across the EU."
    },
    {
      q: "How do we communicate effectively across the EU time zones?",
      a: "Our agile workflows are perfectly suited for the CET (Central European Time) zone. We utilize tools like Slack, Jira, and Zoom for seamless, daily syncs and transparent project management."
    }
  ];

  return (
    <div className="bg-[#090909] text-[#d3c8b8] min-h-screen font-sans selection:bg-[#ff5b36] selection:text-white">
      <Helmet>
        <title>Software Engineering for Polish Tech Hub | EU GDPR | AbuQitmirLabs</title>
        <meta name="description" content="Bridging the gap between Polish tech excellence and global standards. Specialized software engineering and EU-targeted growth strategies for the Polish market." />
        <meta property="og:title" content="Software Engineering for Polish Tech Hub | AbuQitmirLabs" />
        <meta property="og:description" content="Polish tech excellence meets global standards. Specialized software engineering and EU-targeted growth strategies." />
        <meta property="og:url" content="https://abuqitmirlabs.tech/poland-market" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Software Development Services Poland | AbuQitmirLabs" />
        <meta name="twitter:description" content="Polish tech excellence meets global standards by AbuQitmirLabs. Specialized software engineering and EU-targeted SEO." />
        <link rel="canonical" href="https://abuqitmirlabs.tech/poland-market" />
        
        {/* Schema Markup */}
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
                    "item": "https://abuqitmirlabs.tech"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Poland Market",
                    "item": "https://abuqitmirlabs.tech/poland-market"
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Software Engineering for Polish Tech Hub",
                "description": "Bespoke software architecture and EU-targeted Semantic SEO for innovative Polish startups, ensuring full EU GDPR compliance.",
                "provider": {
                  "@type": "Organization",
                  "name": "AbuQitmirLabs",
                  "url": "https://abuqitmirlabs.tech"
                },
                "areaServed": "PL"
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
              }
            ])
          }}
        ></script>
      </Helmet>

      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 pt-32 md:pt-40 md:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_34%)] pointer-events-none"></div>
        
        <div className="relative mx-auto max-w-7xl w-full">
          <div className="flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.3em] text-[#7d766c]"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[#ff5b36]"></span>
              EU Digital Hub — Polish Market Solutions
            </motion.div>

            <div className="mb-8">
              <HeroText text="POLAND TECH" />
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white uppercase mb-8"
            >
              Software Engineering <br />
              <span className="text-[#ff5b36]">for The Polish Hub</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-4xl text-lg md:text-xl text-[#9f978a] leading-relaxed font-sans font-light"
            >
              Poland's growing tech ecosystem needs development partners who match EU compliance standards while keeping costs competitive. We build with GDPR alignment and CET-overlap scheduling, supporting Polish startups scaling into broader EU markets.
            </motion.p>

            {/* Core Capabilities Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="max-w-4xl border-y border-white/5 py-8 px-6 bg-white/[0.01] backdrop-blur-sm rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-left">
                {[
                  "CET Time Zone Overlap",
                  "GDPR-Compliant Architecture for EU Market",
                  "Cost-Competitive Pricing vs Local EU Agencies",
                  "Support for EU-Wide Market Expansion",
                  "English-Fluent Direct Communication"
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5b36] mt-2 shrink-0 group-hover:bg-[#ccff00] transition-colors duration-300" />
                    <span className="text-sm font-sans font-light text-slate-300 tracking-tight leading-relaxed group-hover:text-white transition-colors duration-300">{bullet}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 mt-8 md:mt-12"
            >
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ff5b36] text-white px-12 py-10 rounded-3xl font-black text-xl hover:scale-105 transition-transform flex flex-col items-center justify-center gap-2 uppercase tracking-tighter"
              >
                <ArrowUpRight size={28} />
                Talk to Our Tech Experts
              </a>
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/20 text-[#d3c8b8] px-12 py-10 rounded-3xl font-black text-xl hover:bg-white/5 transition-all flex flex-col items-center justify-center gap-2 uppercase tracking-tighter"
              >
                <Smartphone size={28} className="text-[#ff5b36]" />
                Explore EU Digital Solutions
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Challenge Section */}
      <section className="py-32 px-6 md:px-10 border-y border-white/5 bg-[#0b0b0b] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Poland Specific GDPR & EU Standards Section */}
          <div className="mb-24 p-12 border border-blue-500/20 bg-blue-500/5 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Lock size={120} className="text-blue-500" />
            </div>
            <div className="relative z-10 max-w-3xl text-left">
              <h2 className="text-sm font-mono text-blue-500 mb-6 uppercase tracking-[0.4em] font-bold">[ EU_DIGITAL_PROTOCOL ]</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-8 leading-tight">GDPR Compliant <br />European Tech Standards</h3>
              <p className="text-xl text-[#d3c8b8] leading-relaxed mb-8">
                Operating in the heart of Europe means zero compromise on security. We engineer all Polish projects with <span className="text-white font-bold italic">Privacy-By-Design</span> as per <span className="text-white font-bold italic">EU GDPR standards</span>. From secure data encryption to right-to-be-forgotten protocols, we protect your brand’s legal integrity and user trust.
              </p>
              <div className="flex flex-wrap gap-4">
                {["EU Data Residency", "GDPR Audited Code", "Multi-Currency Ready", "ISO 27001 Methodology"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#bfb4a3] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#ff5b36] mb-8 block">The IT Frontier</span>
              <AnimatedShinyText 
                text="Europe's Glistening IT Boom." 
                textClassName="text-5xl md:text-8xl"
              />
            </div>
            <div className="space-y-10">
              <p className="text-2xl text-[#d3c8b8] font-light leading-relaxed">
                Poland has rapidly become the crown jewel of Europe’s IT and tech startup scene. 
              </p>
              <p className="text-xl text-[#7d766c] leading-relaxed">
                Because the local talent pool is heavily focused on backend engineering, many Polish businesses lack the holistic digital marketing and frontend conversion strategies needed to sell their products globally. Companies with slow legacy websites are being outranked by digitally agile competitors across the EU.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The AbuQitmirLabs Edge */}
      <section className="py-32 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,rgba(255,91,54,0.03),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-24">
            <AnimatedShinyText 
              text="Holistic Software Engineering & Growth." 
              textClassName="text-5xl md:text-[8rem]"
            />
            <MagicText 
              text="We bridge the gap between world-class code and global visibility. For Polish companies looking to dominate locally or expand across the European Union, we offer the complete package."
              className="max-w-3xl text-xl text-[#8d8579]"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Jamstack Platforms",
                desc: "We build ultra-fast Jamstack web platforms that project cutting-edge expertise and security to global clients.",
                icon: <Zap size={32} />
              },
              {
                title: "Cross-Platform Apps",
                desc: "Modern mobile apps built with React Native/Flutter for premium experiences across iOS and Android.",
                icon: <Smartphone size={32} />
              },
              {
                title: "Entity-Based SEO",
                desc: "Aggressive Semantic SEO and E-E-A-T content strategies that push your brand to the top of Google EU wide.",
                icon: <Search size={32} />
              }
            ].map((item, i) => (
              <div key={i} className="group p-10 border border-white/5 bg-[#0d0d0d] hover:border-[#ff5b36]/30 transition-all flex flex-col items-center text-center">
                <div className="text-[#ff5b36] mb-8 group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <AnimatedBreathingText text={item.title} className="text-2xl font-bold uppercase mb-6 tracking-tight" />
                <MagicText text={item.desc} className="text-[#7d766c]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CountryMarquee />

      {/* Core Services Section & Cinematic Reveals */}
      <section className="py-32 px-6 md:px-10 border-t border-white/5 bg-[#090909] relative overflow-hidden">
        {/* Ambient background grids and glowing elements */}
        <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
        <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-blue-500/[0.01] blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-[#ff5b36]/[0.01] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="mb-32 text-center">
            <span className="text-xs font-mono text-[#ff5b36] uppercase tracking-[0.4em] block mb-6">// POLAND & EU CRITERIA</span>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-white uppercase tracking-tight leading-none">
              Services Built For <br />
              <span className="italic text-[#9f978a] font-light">The European Horizon</span>
            </h2>
          </div>

          <div className="space-y-40">
            {/* Cinematic Section 1: Custom AI Agents & SaaS Development */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
            >
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-blue-500 uppercase tracking-widest">
                  <span className="h-px w-8 bg-blue-500" />
                  AI &amp; SAAS CO-DEVELOPMENT
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Custom AI Agents &amp; <br />
                  <span className="italic text-[#9f978a]">SaaS Development</span>
                </h3>
                <div className="font-sans font-light text-[#9f978a] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    We help Polish startups build intelligent, scalable SaaS products. By integrating custom LLMs and RAG architectures, we elevate your software offerings, making them highly competitive in the broader European market.
                  </p>
                  <p>
                    This work runs through our dedicated <strong className="text-white font-medium">AI agent development company</strong> practice — the same team behind agents deployed across our other markets, adapted here to EU data-handling expectations rather than a generic global template. For Polish SaaS founders comparing providers, our <strong className="text-white font-medium">AI agent development services</strong> cover the full build: use-case discovery, RAG-based knowledge retrieval, and integration into the SaaS product itself, not a bolted-on chatbot widget sitting outside the core application.
                  </p>
                </div>
              </div>

              {/* Visual Panel for AI SaaS */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#7d766c]">
                      <span>EU_RAG_COMPLIANCE</span>
                      <span className="text-blue-500 flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        GDPR ENFORCED
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "Vector Embeddings Secure", value: "ENCRYPTED" },
                        { title: "Context Isolation (RAG)", value: "COMPLIANT" },
                        { title: "Polish / English Multi-LLM", value: "ACTIVE" },
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 border border-white/5 rounded-xl bg-white/[0.01] flex justify-between items-center">
                          <span className="text-xs text-[#9f978a] font-sans font-light">{item.title}</span>
                          <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-bold uppercase">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-white/5 pt-6 text-xs font-mono text-[#7d766c]">
                    <div className="flex justify-between">
                      <span>DEPLOYED PROTOCOL:</span>
                      <span className="text-white">CO-DEVELOPED SAAS</span>
                    </div>
                    <div className="flex justify-between">
                      <span>INTEGRATION TYPE:</span>
                      <span className="text-blue-400 font-bold">ENTERPRISE SCALING PROTOCOL</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cinematic Section 2: Global & Local SEO for Polish Enterprises */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-white/5 pt-40"
            >
              <div className="lg:col-span-7 lg:order-2 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#ff5b36] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#ff5b36]" />
                  SEMANTIC ENTITY DOMINANCE
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Global &amp; Local SEO <br />
                  <span className="italic text-[#9f978a]">for Polish Enterprises</span>
                </h3>
                <div className="font-sans font-light text-[#9f978a] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    Whether you are targeting local B2B clients in Krakow or launching globally, our Entity-Based SEO and technical content writing establish your brand's international authority.
                  </p>
                  <p>
                    <strong className="text-white font-medium">The Art of SEO: Mastering Search Engine Optimization</strong> in the Polish and broader EU context means something specific — a Krakow-based B2B company competing for domestic attention needs a different strategy than one launching <strong className="text-white font-medium">search engine optimization SEO services</strong> across the wider European Union. Our approach as an <strong className="text-white font-medium">organic SEO company</strong> treats these as related but distinct problems: local semantic relevance for Polish search behavior, layered with <strong className="text-white font-medium">search engine optimization SEO services in the European Union</strong> more broadly for companies expanding cross-border.
                  </p>
                  <p>
                    Among <strong className="text-white font-medium">SEO companies</strong> and <strong className="text-white font-medium">SEO agencies</strong> operating in this region, <strong className="text-white font-medium">effective SEO techniques for 2026</strong> increasingly hinge on search intent and E-E-A-T signals rather than keyword density — a shift that matters especially for Polish tech companies whose content is often written by excellent engineers with limited SEO background. On-page technique still carries some weight here too: sensible <strong className="text-white font-medium">bolding of keywords</strong> for readability and crawler clarity, used sparingly rather than as a density trick.
                  </p>
                  <p>
                    For Polish businesses with a physical presence — offices, showrooms, service locations — <strong className="text-white font-medium">local SEO GMB</strong> work rounds out the picture. A proper <strong className="text-white font-medium">GMB audit for local SEO</strong> identifies where a Krakow or Warsaw business is losing visibility in Google Maps results, and ongoing <strong className="text-white font-medium">GMB SEO services</strong> — reviews, posts, citation consistency — tend to matter more for local B2B lead generation than most Polish companies currently invest in. For businesses asking <strong className="text-white font-medium">what is GMB in SEO</strong>: it's often the fastest win available for a company that has technical SEO handled but has never touched its Google Business Profile.
                  </p>
                </div>
              </div>

              {/* Visual Panel for SEO */}
              <div className="lg:col-span-5 lg:order-1 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5b36]/5 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#7d766c]">
                      <span>GEO_ENTITY_MATRIX</span>
                      <span className="text-[#ccff00] flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#ccff00] animate-pulse" />
                        EU MAPS REACH
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "Krakow Core Lead Gen", value: "TOP 3 PACK" },
                        { title: "Warsaw B2B Local Semantic", value: "RANK #1" },
                        { title: "Cross-EU Organic Footprint", value: "SCALED" },
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 border border-white/5 rounded-xl bg-white/[0.01] flex justify-between items-center">
                          <span className="text-xs text-[#9f978a] font-sans font-light">{item.title}</span>
                          <span className="text-[10px] font-mono bg-[#ccff00]/10 text-[#ccff00] px-2 py-0.5 rounded font-bold uppercase">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-white/5 pt-6 text-xs font-mono text-[#7d766c]">
                    <div className="flex justify-between">
                      <span>ORGANIC E-E-A-T INDEX:</span>
                      <span className="text-white">OPTIMIZED (2026)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CRAWLER STANDARDS:</span>
                      <span className="text-[#ff5b36] font-bold">EU VISIBILITY DOMINANCE</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cinematic Section 3: Sector Depth Note (Software Development) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-white/5 pt-40"
            >
              <div className="lg:col-span-12 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-white/50 uppercase tracking-widest">
                  <span className="h-px w-8 bg-white/20" />
                  BESPOKE COMPLIANT SOFTWARE ARCHITECTURE
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Bespoke Sector Solutions <br />
                  <span className="italic text-[#9f978a]">&amp; Co-Development models</span>
                </h3>
                <div className="font-sans font-light text-[#9f978a] leading-relaxed text-base md:text-lg max-w-5xl space-y-6">
                  <p>
                    Beyond AI-powered SaaS, our broader <strong className="text-white font-medium">custom software development</strong> practice for Polish and EU clients spans the same sector range we support internationally, each built around <strong className="text-white font-medium">custom software development best practices</strong> and GDPR-first architecture:
                  </p>
                  
                  <ul className="space-y-4 my-8 pl-4 border-l border-white/10">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff5b36] mt-2.5 shrink-0" />
                      <p>
                        <strong className="text-white font-medium">Custom healthcare software development services</strong> — delivered as a genuine <strong className="text-white font-medium">healthcare software development company</strong>, not a generalist shop layering health features onto standard CRUD architecture.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff5b36] mt-2.5 shrink-0" />
                      <p>
                        <strong className="text-white font-medium">Custom financial software development</strong> and <strong className="text-white font-medium">custom fintech software development</strong> for Poland's active fintech sector, built around both GDPR and EU financial services compliance.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff5b36] mt-2.5 shrink-0" />
                      <p>
                        <strong className="text-white font-medium">Custom logistics software development</strong> for companies managing supply chains across EU borders.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff5b36] mt-2.5 shrink-0" />
                      <p>
                        <strong className="text-white font-medium">Custom manufacturing software development</strong> and <strong className="text-white font-medium">custom retail software development</strong> for Poland's strong industrial and e-commerce base.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff5b36] mt-2.5 shrink-0" />
                      <p>
                        <strong className="text-white font-medium">Custom enterprise software development</strong> for larger Polish organizations managing data across multiple EU jurisdictions.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff5b36] mt-2.5 shrink-0" />
                      <p>
                        <strong className="text-white font-medium">Software development for startups</strong> — leaner scope and EU-transparent pricing for early-stage Polish companies, distinct from our enterprise engagement model.
                      </p>
                    </li>
                  </ul>

                  <p>
                    Whichever sector, engagements run through the same model: a <strong className="text-white font-medium">custom software development agency</strong> relationship for defined projects, or an ongoing <strong className="text-white font-medium">custom software development firm</strong> partnership for companies that need continuous iteration. We also support <strong className="text-white font-medium">co-development software</strong> arrangements, embedding into an existing Polish in-house team rather than replacing it — a common preference among the country's strong backend engineering talent pool, where the gap is usually on the frontend, marketing, and SEO side rather than core software development itself.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 md:px-10 bg-[#0b0b0b]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-24 text-center">
            <span className="text-[#7d766c] font-mono text-[10px] uppercase tracking-[0.5em] block mb-6">POLAND MARKET FAQ</span>
            <AnimatedShinyText 
              text="Local Focus. Global Reach." 
              textClassName="text-5xl md:text-8xl"
            />
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div 
                key={idx} 
                className="group border-b border-white/10 p-8 cursor-pointer hover:bg-white/[0.01] transition-all"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold uppercase tracking-tight pr-6">{faq.q}</span>
                  <div className={`transition-transform duration-500 ${activeFaq === idx ? 'rotate-[135deg] text-[#ff5b36]' : 'text-[#7d766c]'}`}>
                    <Plus size={28} />
                  </div>
                </div>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-10 text-xl text-[#8d8579] font-light leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-48 relative border-t border-white/5 overflow-hidden text-center bg-black">
        <div className="absolute inset-0 bg-[#ff5b36]/5 blur-[200px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10 px-6">
          <AnimatedShinyText 
            text="architect EU Potential." 
            textClassName="text-7xl md:text-[9rem] text-white"
          />
          
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black text-2xl font-bold px-16 py-8 rounded-full hover:bg-[#ff5b36] hover:text-white transition-all transform hover:scale-105 uppercase tracking-tighter"
            >
               Initiate Polish Tech Audit
            </a>
            <div className="text-[#7d766c] font-mono text-[10px] uppercase tracking-[0.4em] max-w-[300px] text-left border-l-2 border-white/10 pl-8 leading-relaxed h-16 flex items-center">
               GDPR COMPLIANT ARCHITECTURE // CET ZONE COLLABORATION // AGILE SCRUM
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PolandMarketPage;

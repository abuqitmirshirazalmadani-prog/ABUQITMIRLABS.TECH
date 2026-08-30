import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Plus, 
  Search,
  Smartphone,
  ShieldCheck,
  Code,
  Layout,
  MessageSquare,
  Globe2,
  Lock,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  Coins
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import HeroText from '../components/ui/hero-shutter-text';
import { AnimatedShinyText } from '../components/ui/animated-shiny-text';
import { AnimatedBreathingText } from '../components/ui/animated-breathing-text';
import { MagicText } from '../components/ui/magic-text';

const UKMarketPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      q: "Are your digital products compliant with UK GDPR & Data Protection Act 2018?",
      a: "Strictly yes. We implement privacy-by-design, ensuring robust user data rights management, cookie consent compliance, and complete legal alignment with the UK GDPR and the Data Protection Act 2018."
    },
    {
      q: "How do you handle local SEO for UK high-street businesses and London firms?",
      a: "We deploy aggressive Semantic SEO, optimize your Google Business Profile, and build hyper-localized UK citations (such as Yell, Scoot, and Thomson Local) to guarantee map-pack dominance and search intent capture."
    },
    {
      q: "Can you automate our customer service with UK-specific AI agents?",
      a: "Yes. Our bespoke AI agents are trained to understand British idioms, business etiquette, and operational workflows, ensuring seamless, 24/7 customer engagement without the robotic feel."
    },
    {
      q: "Do you build native and cross-platform apps for UK consumers?",
      a: "We engineer high-performance mobile apps using Flutter and native technologies, optimized for the UK market with Apple Pay, Google Pay, and localized payment gateways like Stripe UK."
    },
    {
      q: "How do we coordinate with time zone differences?",
      a: "Our core working hours align directly with the UK GMT/BST business day. We maintain seamless communication via Slack, Microsoft Teams, Jira, and weekly Zoom strategy sprints."
    },
    {
      q: "Why choose AbuQitmirLabs over an overpriced London digital agency?",
      a: "We offer elite, silicon-valley caliber technical architecture and bespoke Jamstack web performance at direct, transparent pricing—delivering up to 4x greater engineering output without bloated agency overheads."
    }
  ];

  return (
    <div className="bg-[#090909] text-[#d3c8b8] min-h-screen font-sans selection:bg-[#ff5b36] selection:text-white">
      <Helmet>
        <title>UK Software Development & Local SEO | GDPR Compliant | AbuQitmirLabs</title>
        <meta name="description" content="UK-focused software development and local SEO for British businesses and London startups. GDPR-compliant Jamstack web apps, mobile apps, and AI agents with GMT overlap." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/uk-market" />
        
        {/* Open Graph */}
        <meta property="og:title" content="UK Software Development & Local SEO | GDPR Compliant | AbuQitmirLabs" />
        <meta property="og:description" content="UK-focused software development and local SEO for British businesses and London startups. GDPR-compliant Jamstack web apps, mobile apps, and AI agents with GMT overlap." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/uk-market" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="UK Software Development & Local SEO | GDPR Compliant | AbuQitmirLabs" />
        <meta name="twitter:description" content="UK-focused software development and local SEO for British businesses and London startups. GDPR-compliant Jamstack web apps, mobile apps, and AI agents with GMT overlap." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />
        
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
                    "item": "https://www.abuqitmirlabs.tech"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "UK Market",
                    "item": "https://www.abuqitmirlabs.tech/uk-market"
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "UK Digital Engineering & High-Street SEO",
                "description": "Bespoke software architecture, UK GDPR compliance, and hyper-localized semantic SEO tailored for London firms, British scale-ups, and regional businesses.",
                "provider": {
                  "@type": "Organization",
                  "name": "AbuQitmirLabs",
                  "url": "https://www.abuqitmirlabs.tech"
                },
                "areaServed": "GB"
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
              British Commerce &amp; Tech Hub — Tailored UK Solutions
            </motion.div>

            <div className="mb-8">
              <HeroText text="UNITED KINGDOM" />
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white uppercase mb-8"
            >
              Digital Engineering <br />
              <span className="text-[#ff5b36]">for The British Market</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-4xl text-lg md:text-xl text-[#9f978a] leading-relaxed font-sans font-light"
            >
              British businesses face tight compliance requirements and high domestic agency fees. We provide UK GDPR-compliant development, local SEO, and AI agents with GMT overlap and predictable pricing.
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
                  "GMT/BST Time Zone Overlap",
                  "UK GDPR & Data Protection Act 2018 Compliant",
                  "GBP Transparent Pricing (No Currency Headaches)",
                  "London & Regional UK Local SEO Experience",
                  "Direct Developer Communication via Slack/Teams"
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
                Speak with a UK Tech Consultant
              </a>
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/20 text-[#d3c8b8] px-12 py-10 rounded-3xl font-black text-xl hover:bg-white/5 transition-all flex flex-col items-center justify-center gap-2 uppercase tracking-tighter"
              >
                <Smartphone size={28} className="text-[#ff5b36]" />
                Explore UK Engineering Suite
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Challenge Section */}
      <section className="py-32 px-6 md:px-10 border-y border-white/5 bg-[#0b0b0b] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* UK Specific Compliance and Reality Section */}
          <div className="mb-24 p-12 border border-[#ff5b36]/20 bg-[#ff5b36]/5 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Lock size={120} className="text-[#ff5b36]" />
            </div>
            <div className="relative z-10 max-w-3xl text-left">
              <h2 className="text-sm font-mono text-[#ff5b36] mb-6 uppercase tracking-[0.4em] font-bold">[ UK_REGULATORY_FRAMEWORK ]</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-8 leading-tight">Data Protection Act 2018 <br />&amp; UK GDPR Protocol</h3>
              <p className="text-xl text-[#d3c8b8] leading-relaxed mb-8">
                Operating in the UK requires strict privacy handling. We build all applications following <span className="text-white font-bold italic">UK GDPR</span> and <span className="text-white font-bold italic">Data Protection Act 2018</span> guidelines, with clear cookie controls and secure data residency options to keep your operations compliant.
              </p>
              <div className="flex flex-wrap gap-4">
                {["UK Data Residency", "ICO Aligned Architecture", "Cookie Consent Management", "Zero Third-Party Leaks"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#bfb4a3] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#ff5b36] mb-8 block">The UK Digital Gap</span>
              <AnimatedShinyText 
                text="Legacy Overhead vs Modern Velocity." 
                textClassName="text-5xl md:text-8xl"
              />
            </div>
            <div className="space-y-10">
              <p className="text-2xl text-[#d3c8b8] font-light leading-relaxed">
                Traditional British businesses are finding their legacy systems too slow and their outdated websites penalized by Google. Furthermore, strict data privacy laws make integrating new technology intimidating, leaving many UK companies trailing behind their international competitors in AI adoption and organic search visibility.
              </p>
              <p className="text-lg leading-relaxed">
                We bridge this gap with dedicated engineering partnerships tailored specifically to the regulatory, technological, and competitive demands of British commerce. Our engineers build secure, high-speed digital infrastructure with zero licensing lock-in and transparent milestones.
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
              text="Engineered for British Standards." 
              textClassName="text-5xl md:text-[8rem]"
            />
            <MagicText 
              text="From London's Tech City to regional manufacturing hubs, we deliver cutting-edge software solutions designed to give UK businesses a dominant edge."
              className="max-w-3xl text-xl text-[#8d8579]"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "UK GDPR Architecture",
                desc: "Every system is built privacy-first, fully aligned with UK Data Protection Act 2018 standards and cookie regulations.",
                icon: <ShieldCheck size={32} />
              },
              {
                title: "Jamstack Velocity",
                desc: "Blazing-fast websites and portals with near-zero load times, guaranteed to pass Core Web Vitals with flying colors.",
                icon: <Code size={32} />
              },
              {
                title: "High-Street Local SEO",
                desc: "Semantic SEO and Google Business Profile optimization to dominate local high-street and regional search results.",
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

      {/* Cinematic Showcase Section */}
      <section className="py-32 px-6 md:px-10 border-y border-white/5 bg-[#0b0b0b] relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          {/* Cinematic Reveal 1: UK GDPR & Enterprise Compliance */}
          <div className="p-12 border border-blue-500/20 bg-blue-500/5 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Lock size={120} className="text-blue-500" />
            </div>
            <div className="relative z-10 max-w-3xl text-left">
              <h2 className="text-sm font-mono text-blue-500 mb-6 uppercase tracking-[0.4em] font-bold">[ UK_GDPR_STANDARDS ]</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-8 leading-tight">UK GDPR &amp; Data Protection Protocol</h3>
              <div className="text-lg text-[#9f978a] leading-relaxed mb-10 space-y-6 font-sans font-light">
                <p>
                  Navigating the UK's strict data landscape requires more than just a privacy policy. We architect all British projects with <span className="text-white font-medium italic">UK GDPR compliance</span> at the core. From secure data residency options to granular consent management, we ensure your digital assets are legally resilient.
                </p>
                <p>
                  Our engineering workflows incorporate strict data protection controls across every sector we serve in the UK — including FCA-aligned audit logging for financial service platforms and NHS-adjacent data privacy standards for healthcare and clinical management systems.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                {["UK Data Residency Options", "Granular Cookie Consent", "Audit-Ready Infrastructure", "Sub-Second LCP Performance"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#bfb4a3] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cinematic Reveal 2: Bespoke Engineering & Startup Velocity */}
          <div className="border-t border-white/5 pt-20">
            <span className="text-xs font-mono text-[#ff5b36] uppercase tracking-[0.4em] block mb-6">// SCALABLE ARCHITECTURE</span>
            <AnimatedShinyText 
              text="Engineered For British Enterprises & Scale-Ups." 
              textClassName="text-4xl md:text-7xl mb-12"
            />
            <div className="max-w-4xl text-lg md:text-xl text-[#9f978a] font-sans font-light leading-relaxed space-y-6">
              <p>
                We build digital resilience for the British market. Our bespoke web applications, mobile platforms, and enterprise portals are engineered with strict adherence to Data Protection Act 2018 standards and UK server residency requirements.
              </p>
              <p>
                For early-stage ventures and scale-ups, we deliver lean, investor-ready MVPs that balance speed to market with clean, extensible architecture — backed by fixed GBP pricing, milestone-based deliverables, and dedicated GMT overlap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-6 md:px-10 border-t border-white/5 bg-[#090909]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <span className="text-[#7d766c] font-mono text-xs uppercase tracking-[0.5em] block mb-6">SERVICES FOR THE UK</span>
            <AnimatedShinyText 
              text="Precision Engineered Solutions." 
              textClassName="text-5xl md:text-8xl"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -8 }}
              className="p-12 border border-white/5 bg-[#0d0d0d] rounded-2xl flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-[#ff5b36] mb-4 block">01 / FAST &amp; COMPLIANT</span>
                <h3 className="text-3xl font-bold uppercase tracking-tight text-white mb-6">Jamstack Web Platforms</h3>
                <p className="text-[#8d8579] font-light leading-relaxed mb-8">
                  Static-first, serverless architecture that guarantees extreme page speeds, impenetrable security, and effortless scaling for UK enterprises.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#ff5b36]">
                <span>NEXT.JS // TAILWIND // EDGE APIS</span>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              className="p-12 border border-white/5 bg-[#0d0d0d] rounded-2xl flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-[#ff5b36] mb-4 block">02 / SMART AUTOMATION</span>
                <h3 className="text-3xl font-bold uppercase tracking-tight text-white mb-6">Autonomous AI Agents</h3>
                <p className="text-[#8d8579] font-light leading-relaxed mb-8">
                  Custom LLM-powered customer service and internal operations agents that streamline British workflows with localized tone and context.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#ff5b36]">
                <span>LLM WORKFLOWS // RAG PIPELINES</span>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              className="p-12 border border-white/5 bg-[#0d0d0d] rounded-2xl flex flex-col justify-between md:col-span-2"
            >
              <div>
                <span className="text-xs font-mono text-[#ff5b36] mb-4 block">03 / SEARCH VISIBILITY</span>
                <h3 className="text-3xl font-bold uppercase tracking-tight text-white mb-6">UK Semantic Search &amp; Regional Authority</h3>
                <div className="text-sm font-sans font-light text-[#9f978a] leading-relaxed space-y-4">
                  <p>
                    Organic visibility across the British market requires structured technical clarity rather than outdated keyword tactics. We align semantic entity architecture with Core Web Vitals performance so that Google indexes your service authority across England, Scotland, Wales, and Northern Ireland.
                  </p>
                  <p>
                    From high-street discovery on Google Maps to comprehensive knowledge graph positioning, our search campaigns build sustainable domain credibility that converts into qualified inbound inquiries.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#ff5b36] mt-8">
                <span>ENTITY GRAPH // MAP PACK VISIBILITY // CITATION ACCURACY</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Services Section & Cinematic Reveals */}
      <section className="py-32 px-6 md:px-10 border-t border-white/5 bg-[#090909] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
        <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-[#ff5b36]/[0.01] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="mb-32 text-center">
            <span className="text-xs font-mono text-[#ff5b36] uppercase tracking-[0.4em] block mb-6">// UK SECTOR PRACTICES</span>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-white uppercase tracking-tight leading-none">
              Services Tailored For <br />
              <span className="italic text-[#9f978a] font-light">The British Ecosystem</span>
            </h2>
          </div>

          <div className="space-y-40">
            {/* Cinematic Section 1: UK GDPR Compliant Custom Software */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
            >
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#ff5b36] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#ff5b36]" />
                  PRIVACY-FIRST ARCHITECTURE
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  UK GDPR Compliant <br />
                  <span className="italic text-[#9f978a]">Software Systems</span>
                </h3>
                <div className="font-sans font-light text-[#9f978a] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    We build high-performance Jamstack websites, client portals, and CRM architectures with privacy-by-design principles, ensuring customer data is stored securely and in full alignment with UK regulations.
                  </p>
                  <p>
                    From granular cookie management and secure authentication flows to dedicated UK cloud deployments, our web platforms safeguard your business reputation while providing seamless end-user experiences.
                  </p>
                </div>
              </div>

              {/* Visual Panel for UK GDPR */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5b36]/5 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#7d766c]">
                      <span>DATA_RESIDENCY_LOCK</span>
                      <span className="text-[#ccff00] flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#ccff00] animate-pulse" />
                        ICO ALIGNED
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "Consent Architecture Layer", value: "ENFORCED" },
                        { title: "Right to Erasure API Integration", value: "ACTIVE" },
                        { title: "London Node Edge Serving", value: "0.2S LATENCY" },
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
                      <span>COMPLIANCE INDEX:</span>
                      <span className="text-white">DPA 2018 // UK GDPR</span>
                    </div>
                    <div className="flex justify-between">
                      <span>AUDIT READINESS:</span>
                      <span className="text-[#ff5b36] font-bold">100% VERIFIED</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cinematic Section 2: Hyper-Local SEO for British High Streets */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-white/5 pt-40"
            >
              <div className="lg:col-span-7 lg:order-2 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#ccff00] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#ccff00]" />
                  LOCAL ENTITY OPTIMIZATION
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Hyper-Local SEO <br />
                  <span className="italic text-[#9f978a]">for British High Streets</span>
                </h3>
                <div className="font-sans font-light text-[#9f978a] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    We optimize your local search presence across the UK. Through structured Google Business Profile management, local citation consistency, and review acquisition workflows, we drive foot traffic and high-intent local customer inquiries.
                  </p>
                  <p>
                    Whether competing in dense urban hubs like Central London and Manchester or serving regional client bases across the Midlands and Scotland, our localized search strategy is customized to local competition density and commercial search patterns.
                  </p>
                </div>
              </div>

              {/* Visual Panel for UK SEO */}
              <div className="lg:col-span-5 lg:order-1 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/5 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#7d766c]">
                      <span>UK_GEO_PACK_DOMINANCE</span>
                      <span className="text-[#ccff00] flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#ccff00] animate-pulse" />
                        LOCAL CITATIONS
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "Yell / Scoot / Thomson Citations", value: "100% SYNCED" },
                        { title: "London / Metro Search Grid", value: "TOP 3 PACK" },
                        { title: "NAP Consistency Rating", value: "PERFECT" },
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
                      <span>GEOGRAPHIC FOOTPRINT:</span>
                      <span className="text-white">ENGLAND, SCOTLAND, WALES</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SEARCH CONVERSION:</span>
                      <span className="text-[#ccff00] font-bold">OPTIMIZED (2026)</span>
                    </div>
                  </div>
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
            <span className="text-[#7d766c] font-mono text-xs uppercase tracking-[0.5em] block mb-6">FREQUENTLY ASKED QUESTIONS</span>
            <AnimatedShinyText 
              text="Clear Answers for UK Clients." 
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

          {/* Related UK Digital Engineering Capabilities & Case Studies */}
          <div className="mt-20 pt-12 border-t border-white/5 space-y-8 text-left">
            <div>
              <h4 className="text-xs font-mono text-[#ff5b36] uppercase tracking-[0.3em] font-bold mb-4">// UK DIGITAL SERVICES & CASE STUDIES</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <Link to="/custom-software" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#ff5b36] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Custom Software</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
                <Link to="/web-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#ff5b36] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Web Development</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
                <Link to="/mobile-app-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#ff5b36] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Mobile Apps</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
                <Link to="/ai-agent-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#ff5b36] transition-colors border border-white/5 flex items-center justify-between">
                  <span>AI Agent Systems</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
                <Link to="/seo-mastery" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#ff5b36] transition-colors border border-white/5 flex items-center justify-between">
                  <span>SEO Mastery</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
                <Link to="/local-seo-for-small-business" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#ff5b36] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Local SEO</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
                <Link to="/case-studies" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#ff5b36] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Case Studies</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
                <Link to="/contact" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#ff5b36] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Book Consultation</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
              </div>
            </div>

            {/* External Regulatory & Standards Links */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#7d766c]">
              <span className="uppercase tracking-widest text-[11px] font-bold text-zinc-400">UK Industry &amp; Regulatory References:</span>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5b36] transition-colors inline-flex items-center gap-1">
                  Information Commissioner's Office (ICO) <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://www.legislation.gov.uk/ukpga/2018/12/contents" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5b36] transition-colors inline-flex items-center gap-1">
                  Data Protection Act 2018 <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5b36] transition-colors inline-flex items-center gap-1">
                  Google SEO Guide <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-48 relative border-t border-white/5 overflow-hidden text-center bg-black">
        <div className="absolute inset-0 bg-[#ff5b36]/5 blur-[200px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10 px-6">
          <AnimatedShinyText 
            text="Accelerate Your UK Brand." 
            textClassName="text-7xl md:text-[9rem] text-white"
          />
          
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black text-2xl font-bold px-16 py-8 rounded-full hover:bg-[#ff5b36] hover:text-white transition-all transform hover:scale-105 uppercase tracking-tighter"
            >
              Schedule a Technical Call
            </a>
            <div className="text-[#7d766c] font-mono text-[10px] uppercase tracking-[0.4em] max-w-[300px] text-left border-l-2 border-white/10 pl-8 leading-relaxed h-16 flex items-center">
              UK GDPR COMPLIANCE // GMT COLLABORATION // FIXED GBP PRICING
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UKMarketPage;

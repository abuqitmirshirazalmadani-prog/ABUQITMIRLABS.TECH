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
  Lock,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import HeroText from '../components/ui/hero-shutter-text';
import { AnimatedShinyText } from '../components/ui/animated-shiny-text';
import { AnimatedBreathingText } from '../components/ui/animated-breathing-text';
import { MagicText } from '../components/ui/magic-text';

const CanadaMarketPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      q: "Are your digital products compliant with Canadian PIPEDA and provincial laws?",
      a: "Yes, strictly. We engineer custom software with privacy-by-design, adhering to PIPEDA at the federal level as well as provincial privacy acts (such as Quebec's Law 25, Alberta's PIPA, and BC's PIPA)."
    },
    {
      q: "Can you host data on Canadian soil for data residency compliance?",
      a: "Absolutely. We configure our cloud infrastructures on AWS (ca-central-1 in Montreal/Calgary), Google Cloud (northamerica-northeast1/2), or Microsoft Azure Canada Central to ensure strict data residency compliance."
    },
    {
      q: "How do you handle bilingual (English & French) Canadian SEO?",
      a: "We deploy internationalized Semantic SEO, multi-lingual schema markup (hreflang tags), and culturally localized French/English content writing to ensure top visibility across both Quebec and the rest of Canada."
    },
    {
      q: "Do your working hours overlap with Canadian time zones?",
      a: "Yes. Our engineering teams provide dedicated overlap with EST (Toronto/Montreal) and PST (Vancouver), ensuring seamless real-time communication via Slack, Jira, and Zoom."
    },
    {
      q: "Can you build AI agents for Canadian customer service?",
      a: "Yes. We create bilingual AI agents trained to handle customer inquiries in both Canadian English and French, tailored with regional nuances and integrated with local Canadian payment and CRM tools."
    },
    {
      q: "Why choose AbuQitmirLabs over a local Toronto or Vancouver agency?",
      a: "You receive elite software engineering and modern Jamstack architecture at direct, transparent pricing in CAD/USD—saving up to 60% compared to bloated agency retainers without sacrificing quality or speed."
    }
  ];

  return (
    <div className="bg-[#090909] text-[#d3c8b8] min-h-screen font-sans selection:bg-[#ff5b36] selection:text-white">
      <Helmet>
        <title>Software Development for Canada | PIPEDA Compliant & Local SEO | AbuQitmirLabs</title>
        <meta name="description" content="Canada-focused software development — PIPEDA-compliant web apps, mobile apps, bilingual AI agents, and local SEO for Toronto, Vancouver, and Montreal. Built with EST/PST overlap." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/canada-market" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Software Development for Canada | PIPEDA Compliant & Local SEO | AbuQitmirLabs" />
        <meta property="og:description" content="Canada-focused software development — PIPEDA-compliant web apps, mobile apps, bilingual AI agents, and local SEO for Toronto, Vancouver, and Montreal. Built with EST/PST overlap." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/canada-market" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Software Development for Canada | PIPEDA Compliant & Local SEO | AbuQitmirLabs" />
        <meta name="twitter:description" content="Canada-focused software development — PIPEDA-compliant web apps, mobile apps, bilingual AI agents, and local SEO for Toronto, Vancouver, and Montreal. Built with EST/PST overlap." />
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
                    "name": "Canada Market",
                    "item": "https://www.abuqitmirlabs.tech/canada-market"
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Canadian Digital Engineering & Provincial SEO",
                "description": "PIPEDA-compliant custom software, bilingual AI customer agents, and hyper-localized Semantic SEO tailored for businesses across Toronto, Vancouver, Montreal, and Calgary.",
                "provider": {
                  "@type": "Organization",
                  "name": "AbuQitmirLabs",
                  "url": "https://www.abuqitmirlabs.tech"
                },
                "areaServed": "CA"
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
              Canadian Tech &amp; Commerce — Coast-to-Coast Digital Solutions
            </motion.div>

            <div className="mb-8">
              <HeroText text="CANADA TECH" />
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white uppercase mb-8"
            >
              Digital Engineering <br />
              <span className="text-[#ff5b36]">for The Great White North</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-4xl text-lg md:text-xl text-[#9f978a] leading-relaxed font-sans font-light"
            >
              Canadian businesses get a development partner that understands both US-adjacent business standards and Canadian data residency considerations. We align with EST/PST overlap and build scalable systems ready for cross-border growth.
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
                  "EST & PST Time Zone Overlap",
                  "PIPEDA & Law 25 Compliant Architecture",
                  "Canadian Cloud Data Residency Options",
                  "Bilingual English & French Support Ready",
                  "CAD Transparent Billing & Fixed-Price Sprints"
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
                Connect with a Canadian Tech Strategist
              </a>
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/20 text-[#d3c8b8] px-12 py-10 rounded-3xl font-black text-xl hover:bg-white/5 transition-all flex flex-col items-center justify-center gap-2 uppercase tracking-tighter"
              >
                <Smartphone size={28} className="text-[#ff5b36]" />
                Explore Canadian Solutions Suite
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Challenge Section */}
      <section className="py-32 px-6 md:px-10 border-y border-white/5 bg-[#0b0b0b] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Canada Specific PIPEDA & Provincial Laws Section */}
          <div className="mb-24 p-12 border border-[#ff5b36]/20 bg-[#ff5b36]/5 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Lock size={120} className="text-[#ff5b36]" />
            </div>
            <div className="relative z-10 max-w-3xl text-left">
              <h2 className="text-sm font-mono text-[#ff5b36] mb-6 uppercase tracking-[0.4em] font-bold">[ CANADA_DATA_PROTOCOL ]</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-8 leading-tight">PIPEDA &amp; Provincial Privacy Standards</h3>
              <p className="text-xl text-[#d3c8b8] leading-relaxed mb-8">
                Operating in Canada requires strict data governance. We build software aligned with <span className="text-white font-bold italic">PIPEDA</span> and provincial statutes like <span className="text-white font-bold italic">Quebec's Law 25</span>. With dedicated data residency configurations on Canadian cloud regions, your user data stays secure and legally compliant.
              </p>
              <div className="flex flex-wrap gap-4">
                {["PIPEDA Architecture", "Quebec Law 25 Ready", "Canadian Data Hosting", "Bilingual UX Flows"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#bfb4a3] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#ff5b36] mb-8 block">The Canadian Landscape</span>
              <AnimatedShinyText 
                text="Vast Markets, Localized Search." 
                textClassName="text-5xl md:text-8xl"
              />
            </div>
            <div className="space-y-10">
              <p className="text-2xl text-[#d3c8b8] font-light leading-relaxed">
                Canadian businesses face a unique challenge: scaling across a massive country with regional economic hubs while competing against US giants. 
              </p>
              <p className="text-lg leading-relaxed">
                We bridge this gap with dedicated engineering partnerships tailored specifically to the regulatory, technological, and competitive demands of Canadian commerce. Our engineers build secure, high-speed digital infrastructure with zero licensing lock-in and transparent milestones.
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
              text="Engineered for Canadian Growth." 
              textClassName="text-5xl md:text-[8rem]"
            />
            <MagicText 
              text="From Toronto's financial district to Vancouver's tech hub and Montreal's creative core, we build digital infrastructure that drives measurable growth."
              className="max-w-3xl text-xl text-[#8d8579]"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "PIPEDA Compliance",
                desc: "Data-resilient architectures respecting Canadian federal and provincial privacy mandates, including Quebec Law 25.",
                icon: <ShieldCheck size={32} />
              },
              {
                title: "Bilingual AI & Portals",
                desc: "Full English & French localization for seamless customer engagement across all Canadian provinces.",
                icon: <Globe size={32} />
              },
              {
                title: "Provincial SEO Mastery",
                desc: "Hyper-targeted Google Maps and local SEO dominance across Toronto, Vancouver, Montreal, and Calgary.",
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

      {/* Marquee Stripe */}
      <div className="overflow-hidden border-y border-white/5 py-8 bg-[#0b0b0b]">
        <div className="flex animate-marquee whitespace-nowrap gap-16 text-5xl md:text-8xl font-semibold uppercase tracking-tight opacity-90 italic">
          <span className="text-white">Toronto</span>
          <span className="text-[#ff5b36]">Vancouver</span>
          <span className="text-white">Montreal</span>
          <span className="text-[#ff5b36]">Calgary</span>
          <span className="text-white">Ottawa</span>
          <span className="text-[#ff5b36]">Edmonton</span>
          <span className="text-white">Quebec City</span>
        </div>
      </div>

      {/* Cinematic Showcase Section */}
      <section className="py-32 px-6 md:px-10 border-y border-white/5 bg-[#0b0b0b] relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          {/* Cinematic Reveal 1: PIPEDA & Enterprise Compliance */}
          <div className="p-12 border border-blue-500/20 bg-blue-500/5 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Lock size={120} className="text-blue-500" />
            </div>
            <div className="relative z-10 max-w-3xl text-left">
              <h2 className="text-sm font-mono text-blue-500 mb-6 uppercase tracking-[0.4em] font-bold">[ CANADIAN_PRIVACY_PROTOCOL ]</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-8 leading-tight">PIPEDA &amp; Provincial Data Protection</h3>
              <div className="text-lg text-[#9f978a] leading-relaxed mb-10 space-y-6 font-sans font-light">
                <p>
                  Operating in Canada means adhering to <span className="text-white font-medium italic">PIPEDA</span>. We engineer all Canadian applications with comprehensive data privacy safeguards and offer hosting solutions on Canadian soil to ensure your business remains legally sound and your users' data stays protected.
                </p>
                <p>
                  This compliance discipline runs through our sector-specific engineering work for Canadian clients. From clinical workflows and health-tech platforms architected around PIPEDA's health data provisions to secure fintech systems handling Canadian banking integrations and inter-provincial compliance, our solutions are built for security, auditability, and operational resilience.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                {["Canadian Cloud Hosting", "Bilingual Language Routing", "Quebec Law 25 Compatible", "Sub-Second LCP Performance"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#bfb4a3] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cinematic Reveal 2: Startup & Scale-Up Engineering */}
          <div className="border-t border-white/5 pt-20">
            <span className="text-xs font-mono text-[#ff5b36] uppercase tracking-[0.4em] block mb-6">// ENTERPRISE VELOCITY</span>
            <AnimatedShinyText 
              text="Engineered for Canadian Tech Ecosystems." 
              textClassName="text-4xl md:text-7xl mb-12"
            />
            <div className="max-w-4xl text-lg md:text-xl text-[#9f978a] font-sans font-light leading-relaxed space-y-6">
              <p>
                We build scalable web portals, mobile products, and AI workflow integrations designed for Canadian enterprise networks. Whether you are expanding an established platform or shipping an investor-ready MVP, our solutions combine clean architecture with direct CAD pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-6 md:px-10 border-t border-white/5 bg-[#090909]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <span className="text-[#7d766c] font-mono text-xs uppercase tracking-[0.5em] block mb-6">SERVICES FOR CANADA</span>
            <AnimatedShinyText 
              text="Precision Built for Canada." 
              textClassName="text-5xl md:text-8xl"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -8 }}
              className="p-12 border border-white/5 bg-[#0d0d0d] rounded-2xl flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-[#ff5b36] mb-4 block">01 / SPEED &amp; SCALE</span>
                <h3 className="text-3xl font-bold uppercase tracking-tight text-white mb-6">Jamstack &amp; Cloud Platforms</h3>
                <div className="text-sm font-sans font-light text-[#9f978a] leading-relaxed space-y-4">
                  <p>
                    We engineer distributed cloud platforms optimized for low-latency performance across Canada's geographical expanse.
                  </p>
                  <p>
                    From multi-region failover between Central and Western Canadian data centers to optimized edge caching, our cloud architecture ensures consistent responsiveness whether accessed in Toronto, Calgary, or Montreal.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#ff5b36] mt-8">
                <span>AWS CA-CENTRAL // NEXT.JS // EDGE HOSTING</span>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              className="p-12 border border-white/5 bg-[#0d0d0d] rounded-2xl flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-[#ff5b36] mb-4 block">02 / AUTOMATION</span>
                <h3 className="text-3xl font-bold uppercase tracking-tight text-white mb-6">Bilingual AI Agents</h3>
                <p className="text-[#8d8579] font-light leading-relaxed mb-8">
                  Intelligent conversational agents trained in Canadian English and French, automating customer support and operational workflows 24/7.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#ff5b36]">
                <span>EN/FR LOCALIZATION // CRM INTEGRATION</span>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              className="p-12 border border-white/5 bg-[#0d0d0d] rounded-2xl flex flex-col justify-between md:col-span-2"
            >
              <div>
                <span className="text-xs font-mono text-[#ff5b36] mb-4 block">03 / PROVINCIAL DOMINANCE</span>
                <h3 className="text-3xl font-bold uppercase tracking-tight text-white mb-6">Provincial Semantic SEO</h3>
                <div className="text-sm font-sans font-light text-[#9f978a] leading-relaxed space-y-4">
                  <p>
                    Our semantic search strategies map out your brand's digital entity, capturing high-intent organic traffic across key metropolitan markets. We integrate JSON-LD schema, local entity signals, and citation profiles to establish verifiable search authority across targeted Canadian provinces.
                  </p>
                  <p>
                    For businesses with physical locations or regional client bases, we optimize Google Business profiles and local search assets to build verified visibility, ensuring your operations stand out in city-level map packs and provincial discovery.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#ff5b36] mt-8">
                <span>GOOGLE MAPS // HREFLANG SCHEMA // REGIONAL PACKS</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CountryMarquee />

      {/* Core Services Section & Cinematic Reveals */}
      <section className="py-32 px-6 md:px-10 border-t border-white/5 bg-[#090909] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
        <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-[#ff5b36]/[0.01] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="mb-32 text-center">
            <span className="text-xs font-mono text-[#ff5b36] uppercase tracking-[0.4em] block mb-6">// CANADA CRITERIA</span>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-white uppercase tracking-tight leading-none">
              Services Built For <br />
              <span className="italic text-[#9f978a] font-light">The Canadian Market</span>
            </h2>
          </div>

          <div className="space-y-40">
            {/* Cinematic Section 1: Bilingual AI Agents & Portals */}
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
                  BILINGUAL CUSTOMER AUTOMATION
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Bilingual AI Agents <br />
                  <span className="italic text-[#9f978a]">&amp; Digital Portals</span>
                </h3>
                <div className="font-sans font-light text-[#9f978a] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    Serving Canada effectively means delivering seamless experiences in both official languages. We build intelligent AI agents capable of switching effortlessly between Canadian English and French, respecting cultural nuances and regional terminology.
                  </p>
                  <p>
                    From automated customer support triage to intelligent internal knowledge bases, our solutions integrate directly into your CRM, ticketing systems, and databases to deliver 24/7 autonomous engagement with zero translation lag.
                  </p>
                </div>
              </div>

              {/* Visual Panel for AI Agents */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5b36]/5 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#7d766c]">
                      <span>CANADIAN_AI_ROUTER</span>
                      <span className="text-[#ccff00] flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#ccff00] animate-pulse" />
                        EN/FR ACTIVE
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "English / French Dynamic Switch", value: "ZERO LATENCY" },
                        { title: "Quebec Law 25 Compliance", value: "ENFORCED" },
                        { title: "PIPEDA Data Safeguards", value: "COMPLIANT" },
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
                      <span>TIMEZONE OVERLAP:</span>
                      <span className="text-white">EST (TORONTO) // PST (VANCOUVER)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DATA RESIDENCY:</span>
                      <span className="text-[#ff5b36] font-bold">AWS CA-CENTRAL</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cinematic Section 2: Province-Specific Semantic SEO */}
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
                  REGIONAL ENTITY VISIBILITY
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Province-Specific <br />
                  <span className="italic text-[#9f978a]">Semantic SEO</span>
                </h3>
                <div className="font-sans font-light text-[#9f978a] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    Canada spans six time zones and distinct regional economic hubs. We implement location-specific technical SEO and topical authority architecture to ensure your business dominates Google search results across your target provinces.
                  </p>
                  <p>
                    From bilingual English and French indexation for Quebec and Ottawa markets to regional schema structured for Ontario, British Columbia, and Alberta audiences, we align technical site performance with search intent signals that drive genuine qualified inquiries.
                  </p>
                </div>
              </div>

              {/* Visual Panel for SEO */}
              <div className="lg:col-span-5 lg:order-1 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/5 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#7d766c]">
                      <span>GEO_ENTITY_MATRIX</span>
                      <span className="text-[#ccff00] flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#ccff00] animate-pulse" />
                        PROVINCIAL PACKS
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "Greater Toronto Area (GTA)", value: "TOP 3 PACK" },
                        { title: "Greater Vancouver Area (GVA)", value: "TOP 3 PACK" },
                        { title: "Montreal Bilingual Entity", value: "RANK #1" },
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
                      <span>SCHEMA STANDARDS:</span>
                      <span className="text-white">HREFLANG // JSON-LD ENTITY</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ORGANIC GROWTH:</span>
                      <span className="text-[#ccff00] font-bold">MEASURABLE ROI</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cinematic Section 3: Bespoke Sector Solutions */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-white/5 pt-40"
            >
              <div className="lg:col-span-12 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#ff5b36] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#ff5b36]" />
                  CROSS-SECTOR CANADIAN EXPERTISE
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Bespoke Sector Solutions <br />
                  <span className="italic text-[#9f978a]">Across Canada</span>
                </h3>
                <div className="font-sans font-light text-[#9f978a] leading-relaxed text-base md:text-lg max-w-5xl space-y-6">
                  <p>
                    Beyond startup MVP builds, our Canadian engineering practice delivers tailored solutions for key national industries: supply chain logistics platforms for cross-provincial freight, scalable e-commerce infrastructure with multi-currency checkout, industrial workflow systems, and secure health-tech applications compliant with PIPEDA guidelines.
                  </p>
                  <p>
                    We offer flexible delivery engagements, including co-development partnerships where our specialized senior engineers embed directly into existing Canadian product teams to accelerate release cycles, modernize technical debt, and ensure robust architectural governance.
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
            <span className="text-[#7d766c] font-mono text-xs uppercase tracking-[0.5em] block mb-6">CANADIAN MARKET FAQ</span>
            <AnimatedShinyText 
              text="Clear Answers for Canadian Brands." 
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

          {/* Related Canadian Digital Engineering Capabilities & Case Studies */}
          <div className="mt-20 pt-12 border-t border-white/5 space-y-8 text-left">
            <div>
              <h4 className="text-xs font-mono text-[#ff5b36] uppercase tracking-[0.3em] font-bold mb-4">// CANADA DIGITAL SERVICES & CASE STUDIES</h4>
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
                  <span>Book Strategy Call</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
              </div>
            </div>

            {/* External Regulatory & Standards Links */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#7d766c]">
              <span className="uppercase tracking-widest text-[11px] font-bold text-zinc-400">Canadian Regulatory &amp; Technical References:</span>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://www.priv.gc.ca/en/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5b36] transition-colors inline-flex items-center gap-1">
                  Office of the Privacy Commissioner of Canada (OPC) <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://www.cai.gouv.qc.ca/english/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5b36] transition-colors inline-flex items-center gap-1">
                  Commission d'accès à l'information du Québec (Law 25) <ExternalLink className="w-3 h-3" />
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
            text="Scale Across Canada." 
            textClassName="text-7xl md:text-[9rem] text-white"
          />
          
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black text-2xl font-bold px-16 py-8 rounded-full hover:bg-[#ff5b36] hover:text-white transition-all transform hover:scale-105 uppercase tracking-tighter"
            >
              Initiate Canadian Discovery Sprint
            </a>
            <div className="text-[#7d766c] font-mono text-[10px] uppercase tracking-[0.4em] max-w-[300px] text-left border-l-2 border-white/10 pl-8 leading-relaxed h-16 flex items-center">
              PIPEDA COMPLIANT ARCHITECTURE // EST/PST COLLABORATION // FIXED CAD PRICING
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CanadaMarketPage;

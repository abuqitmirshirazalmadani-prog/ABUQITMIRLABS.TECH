import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Users, 
  Plus, 
  Star, 
  Layout, 
  Cpu, 
  Search,
  Code,
  LineChart,
  Database,
  BarChart,
  Smartphone,
  Globe2
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

import CountryMarquee from '../components/CountryMarquee';
import HeroText from '../components/ui/hero-shutter-text';
import { AnimatedShinyText } from '../components/ui/animated-shiny-text';
import { AnimatedBreathingText } from '../components/ui/animated-breathing-text';
import { MagicText } from '../components/ui/magic-text';

const USMarketPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      q: "Can you handle time zone differences for US clients?",
      a: "Absolutely. We utilize overlap hours for live meetings and maintain asynchronous agile project management tools, ensuring seamless communication across EST, CST, MST, and PST zones."
    },
    {
      q: "Do your custom software builds comply with US data regulations?",
      a: "Yes. We architect software with compliance in mind, ensuring your databases and AI integrations align with state-specific regulations like the CCPA (California) and federal standards like HIPAA for healthcare."
    },
    {
      q: "Why should a US company hire AbuQitmirLabs over a local agency?",
      a: "We provide Silicon Valley-caliber engineering and elite semantic SEO strategies at a highly optimized ROI, combining global tech talent with a deep understanding of the American consumer market."
    },
    {
      q: "How do you approach SEO for nationwide US companies?",
      a: "For national reach, we focus on programmatic SEO, building topical authority through E-E-A-T compliant content silos that target state, city, and industry-specific semantic entities."
    },
    {
      q: "Can your AI agents handle US-specific customer service nuances?",
      a: "Yes. Our LLM agents are trained on your proprietary data and can be fine-tuned to understand American cultural nuances, regional slang, and specific US customer service expectations."
    },
    {
      q: "What payment gateways do you integrate for US e-commerce?",
      a: "We seamlessly integrate secure, high-conversion US gateways including Stripe, PayPal, Apple Pay, Google Pay, and Square into your web and mobile applications."
    },
    {
      q: "How fast can you deploy a scalable MVP for a US startup?",
      a: "Depending on complexity, we can architect and deploy a robust, investor-ready Minimum Viable Product within 8 to 12 weeks, allowing you to secure funding faster."
    }
  ];

  return (
    <div className="bg-[#090909] text-[#d3c8b8] min-h-screen font-sans selection:bg-[#ff5b36] selection:text-white">
      <Helmet>
        <title>Software Development for US Startups & NY Businesses | AbuQitmirLabs</title>
        <meta name="description" content="Custom software engineering and AI solutions for the US market. CCPA compliant development and strategic SEO for startups in Silicon Valley, Austin, and NYC." />
        <link rel="canonical" href="https://abuqitmirlabs.tech/us-market" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Software Development for US Startups & NY Businesses | AbuQitmirLabs" />
        <meta property="og:description" content="Custom software engineering and AI solutions for the US market. CCPA compliant development for American startups." />
        <meta property="og:url" content="https://abuqitmirlabs.tech/us-market" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Software Development for US Startups | AbuQitmirLabs" />
        
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
                    "name": "US Market",
                    "item": "https://abuqitmirlabs.tech/us-market"
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Software Development for US Startups",
                "description": "Custom software engineering and AI solutions specifically for the American market, ensuring CCPA and HIPAA compliance.",
                "provider": {
                  "@type": "Organization",
                  "name": "AbuQitmirLabs",
                  "url": "https://abuqitmirlabs.tech"
                },
                "areaServed": "US"
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
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 md:pt-40 md:px-10 overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_18%,transparent_82%,rgba(255,255,255,0.02))] pointer-events-none"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#ff5b36]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full"></div>

        <div className="relative mx-auto max-w-7xl w-full">
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.3em] text-[#7d766c]"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[#ff5b36]"></span>
              Coast-to-Coast Digital Excellence — USA Market
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white uppercase mb-12"
            >
              Software Development <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5b36] to-[#ff9d85]">for US Startups | OffShore</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-4xl text-lg md:text-xl text-[#9f978a] leading-relaxed font-sans font-light"
            >
              US startups need offshore development partners who move at startup speed, not agency speed. We work across EST/PST overlap hours, communicate in clear async updates, and build with the compliance and scalability standards US investors expect — at a fraction of Silicon Valley dev costs.
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
                  "Overlap Hours with EST/PST Time Zones",
                  "Startup-Speed Sprints (2-Week Delivery Cycles)",
                  "SOC 2 & Data Privacy-Aware Development Practices",
                  "Fixed-Price MVP Builds for Funded Startups",
                  "Direct Slack/Async Communication, No Agency Layers"
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
              className="flex flex-col sm:flex-row gap-6 mt-8"
            >
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ff5b36] text-white px-12 py-8 rounded-3xl font-bold text-lg hover:scale-105 transition-transform flex flex-col items-center justify-center gap-2"
              >
                <ArrowUpRight size={24} />
                Partner with Us in the US
              </a>
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/10 text-[#d3c8b8] px-12 py-8 rounded-3xl font-bold text-lg hover:bg-white/5 transition-all flex flex-col items-center justify-center gap-2"
              >
                <Smartphone size={24} className="text-[#ff5b36]" />
                Get a Free US Market Audit
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Branding */}
      <section className="overflow-hidden border-y border-white/5 bg-[#0b0b0b] py-16 md:py-24">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-5xl md:text-8xl font-semibold uppercase tracking-tight opacity-90 italic">
          <span>Silicon Valley Standards</span> <span className="text-[#ff5b36]">·</span>
          <span>East Coast Execution</span> <span className="text-[#ff5b36]">·</span>
          <span>Enterprise Scaling</span> <span className="text-[#ff5b36]">·</span>
          <span>Semantic SEO Dominance</span> <span className="text-[#ff5b36]">·</span>
          <span>Autonomous AI Agents</span> <span className="text-[#ff5b36]">·</span>
          {/* Repeat for continuous effect */}
          <span>Silicon Valley Standards</span> <span className="text-[#ff5b36]">·</span>
          <span>East Coast Execution</span> <span className="text-[#ff5b36]">·</span>
          <span>Enterprise Scaling</span> <span className="text-[#ff5b36]">·</span>
          <span>Semantic SEO Dominance</span> <span className="text-[#ff5b36]">·</span>
          <span>Autonomous AI Agents</span> <span className="text-[#ff5b36]">·</span>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-32 px-6 md:px-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#bfb4a3] mb-8 block">The Challenge</span>
              <AnimatedShinyText 
                text="Standing Out in the US Hyper-Competitive Market." 
                textClassName="text-4xl md:text-7xl"
              />
            </div>
            <div className="text-xl text-[#8d8579] leading-relaxed space-y-6">
              <p>
                The United States is the epicenter of global technological innovation. Whether you are operating out of New York, Texas, or California, the digital noise is deafening.
              </p>
              <p>
                Relying on generic WordPress templates or basic search marketing is no longer enough to capture the American consumer. US businesses are bleeding capital on inefficient manual workflows and losing local market share to competitors who have already adopted AI automation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-32 px-6 md:px-10 bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto">
          {/* US Specific Compliance Section */}
          <div className="mb-24 p-12 border border-[#ff5b36]/20 bg-[#ff5b36]/5 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={120} className="text-[#ff5b36]" />
            </div>
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-sm font-mono text-[#ff5b36] mb-6 uppercase tracking-[0.4em] font-bold">[ US_REGULATORY_PROTOCOL ]</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-8 leading-tight">CCPA & HIPAA Compliant <br />Engineering Standards</h3>
              <p className="text-xl text-[#8d8579] leading-relaxed mb-8">
                We understand that US businesses face unique data privacy challenges. Our development cycle for the American market includes mandatory security audits to ensure compliance with the <span className="text-white font-bold italic">California Consumer Privacy Act (CCPA)</span> and <span className="text-white font-bold italic">HIPAA standards</span> for health-related digital assets.
              </p>
              <div className="flex flex-wrap gap-4">
                {["Secure US Data Hosting", "Encrypted LLM Integrations", "SOC2 Readiness", "ADA Accessibility Compliance"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#bfb4a3] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-20">
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#bfb4a3] mb-8 block">The AbuQitmirLabs Edge</span>
            <AnimatedShinyText 
              text="Silicon Valley Standards, Global Scalability." 
              textClassName="text-4xl md:text-7xl"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Jamstack Engineering",
                desc: "We build high-performance JAMstack websites that pass rigorous Core Web Vitals, ensuring you capture impatient US web traffic.",
                icon: <Zap className="text-[#ff5b36]" size={32} />
              },
              {
                title: "Custom LLM Agents",
                desc: "By integrating Custom LLM Agents into your workflows, we help you mitigate high domestic labor costs through 24/7 automation.",
                icon: <Cpu className="text-[#ff5b36]" size={32} />
              },
              {
                title: "Semantic Entity SEO",
                desc: "Designed to outrank massive US corporations by targeting high-intent, hyper-local, and long-tail market gaps with authority.",
                icon: <Search className="text-[#ff5b36]" size={32} />
              }
            ].map((feature, i) => (
              <div key={i} className="p-10 bg-white/5 border border-white/5 hover:border-[#ff5b36]/30 transition-all group flex flex-col items-center text-center">
                <div className="mb-6">{feature.icon}</div>
                <AnimatedBreathingText text={feature.title} className="text-2xl font-bold uppercase tracking-tight mb-4 group-hover:text-white" />
                <MagicText text={feature.desc} className="text-[#8d8579]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CountryMarquee />

      {/* Core Services Section */}
      <section className="py-32 px-6 md:px-10 border-y border-white/5 bg-[#070707] relative overflow-hidden">
        {/* Background grids and shapes */}
        <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
        <div className="absolute -top-40 right-10 w-[600px] h-[600px] bg-blue-500/[0.01] blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 left-10 w-[600px] h-[600px] bg-[#ff5b36]/[0.01] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="mb-32 text-center">
            <span className="text-xs font-mono text-[#ff5b36] uppercase tracking-[0.4em] block mb-6">// PREMIUM US EXPANSION SERVICES</span>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-white uppercase tracking-tight leading-none">
              Core Services <br />
              <span className="italic text-[#9f978a] font-light">Tailored for the US Market</span>
            </h2>
          </div>

          <div className="space-y-40">
            {/* Cinematic Section 1: Local SEO */}
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
                  LOCAL SEO PROTOCOL
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Coast-to-Coast <br />
                  <span className="italic text-[#9f978a]">Local SEO & Map Dominance</span>
                </h3>
                <div className="font-sans font-light text-[#9f978a] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    Whether you're a law firm in Chicago or a real estate agency in Miami, ranking in the map pack matters more than ranking on page one of organic results — most &quot;near me&quot; searches never scroll past the top three pins. Our approach to <strong className="text-white font-medium">GMB SEO</strong> starts with a full <strong className="text-white font-medium">GMB audit for local SEO</strong>: categories, service areas, photos, and review velocity, all checked against what's actually working for competitors currently occupying those top three spots.
                  </p>
                  <p>
                    From there, <strong className="text-white font-medium">local SEO GMB optimization</strong> becomes an ongoing discipline rather than a one-time setup. We handle everything <strong className="text-white font-medium">seo and gmb</strong> touches — post scheduling, Q&A management, review response strategy, and the citation consistency that Google quietly uses to verify a business is real and active. For businesses asking <strong className="text-white font-medium">what is GMB in SEO</strong> and why it seems to matter more every year: Google increasingly treats a well-maintained Business Profile as a trust signal that traditional on-page SEO alone can't replace, especially for location-based searches.
                  </p>
                  <p>
                    Our <strong className="text-white font-medium">GMB SEO services</strong> are built around the specific business type, not a generic template. A <strong className="text-white font-medium">GMB local SEO for dentists</strong> strategy — built around appointment urgency and &quot;near me&quot; intent — looks nothing like the map strategy for a multi-location retail chain, which is why category-specific playbooks outperform one-size-fits-all local SEO packages. For agencies managing multiple client accounts across the US, we also offer <strong className="text-white font-medium">white label GMB SEO</strong> support — full GMB audits, optimization, and monthly reporting delivered under your brand.
                  </p>
                  <p>
                    <strong className="text-white font-medium">GMB SEO United States</strong> work carries its own regional nuance: competitive density in map results varies enormously between a mid-sized Midwest city and a saturated metro like Los Angeles or New York, and our strategy adjusts accordingly rather than applying the same intensity of link-building and citation work everywhere. The goal in every case is the same — capture the 'near me' searches that drive immediate US revenue, not just impressions that never convert.
                  </p>
                </div>
              </div>

              {/* Parallax / Visual Card for Local SEO */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ff5b36]/5 blur-3xl rounded-full" />
                  
                  {/* Decorative Map Grid Mockup */}
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#7d766c]">
                      <span>MAP_PACK_SIMULATOR</span>
                      <span className="text-[#ff5b36] flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#ff5b36] animate-pulse" />
                        LIVE METRICS
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { name: "AbuQitmirLabs US Client", rating: "5.0 ★★★★★", status: "Position #1" },
                        { name: "Competitor A", rating: "4.5 ★★★★☆", status: "Position #2" },
                        { name: "Competitor B", rating: "4.2 ★★★★☆", status: "Position #3" },
                      ].map((loc, i) => (
                        <div key={i} className={`p-4 border rounded-xl flex justify-between items-center ${i === 0 ? 'border-[#ff5b36]/30 bg-[#ff5b36]/5' : 'border-white/5 bg-white/[0.01]'}`}>
                          <div>
                            <span className="text-sm font-bold text-white block uppercase tracking-tight">{loc.name}</span>
                            <span className="text-xs text-[#9f978a]">{loc.rating}</span>
                          </div>
                          <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded ${i === 0 ? 'bg-[#ff5b36]/20 text-white font-bold' : 'bg-zinc-900 text-[#7d766c]'}`}>{loc.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-white/5 pt-6 text-xs font-mono text-[#7d766c]">
                    <div className="flex justify-between">
                      <span>AUDIT ROADMAPS:</span>
                      <span className="text-white">COMPLETED</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GEO-TARGET DEPTH:</span>
                      <span className="text-white">50 STATES</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cinematic Section 2: Mobile App Dev */}
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
                  ENTERPRISE ARCHITECTURE
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Scalable Enterprise SaaS &amp; <br />
                  <span className="italic text-[#9f978a]">Mobile App Development</span>
                </h3>
                <div className="font-sans font-light text-[#9f978a] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    We build cross-platform mobile apps — React Native and Flutter — alongside scalable cloud-native software (AWS) designed to handle the traffic spikes and data security requirements of the American consumer market. As a <strong className="text-white font-medium">mobile app development company</strong> serving US clients, our engineering decisions are shaped by what US-based investors and enterprise buyers expect: documented architecture, security audits, and a codebase a future in-house team could actually take over.
                  </p>
                  <p>
                    <strong className="text-white font-medium">Cross-platform mobile app development</strong> — built primarily on Flutter, with React Native available where a team's existing web stack makes it the better fit — lets startups ship to both iOS and Android from a single, well-architected codebase, avoiding the cost of maintaining two entirely separate native teams. For companies asking about <strong className="text-white font-medium">mobile app development cost</strong> before committing to a build: cross-platform architecture typically brings that number down substantially compared to fully native iOS and Android builds, without meaningfully compromising performance for most product categories.
                  </p>
                  <p>
                    We work as both a <strong className="text-white font-medium">mobile app development firm</strong> for one-off product builds and as an ongoing <strong className="text-white font-medium">enterprise mobile app development company</strong> for larger organizations that need continuous iteration rather than a single ship-and-done engagement. <strong className="text-white font-medium">Healthcare mobile app development</strong> for the US market carries its own weight here too — HIPAA-aware data handling isn't optional when patient information touches a mobile app, and it shapes architecture decisions from day one rather than getting bolted on before launch.
                  </p>
                  <p>
                    For teams comparing us against other <strong className="text-white font-medium">top mobile app development companies</strong> serving the US, the honest differentiator isn't a longer feature list — it's whether the team building your app understands US compliance expectations (CCPA, HIPAA, SOC 2 readiness) natively, rather than treating them as an unfamiliar afterthought for an offshore team more used to building for other markets.
                  </p>
                </div>
              </div>

              {/* Parallax / Visual Card for App Dev */}
              <div className="lg:col-span-5 lg:order-1 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5b36]/5 blur-3xl rounded-full" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
                  
                  {/* Decorative App Frame Mockup */}
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#7d766c]">
                      <span>BUILD_MANIFEST_INFO</span>
                      <span className="text-[#ccff00] flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#ccff00] animate-pulse" />
                        STABLE DEPLOY
                      </span>
                    </div>
                    
                    <div className="space-y-3 font-mono text-[11px] text-zinc-400">
                      <div><span className="text-zinc-600">const</span> SDK_ENGINE = <span className="text-[#ff5b36]">&quot;Flutter/React Native&quot;</span>;</div>
                      <div><span className="text-zinc-600">const</span> DATA_REGISTRY = <span className="text-[#ff5b36]">&quot;HIPAA_COMPLIANT&quot;</span>;</div>
                      <div><span className="text-zinc-600">const</span> SEC_STANDARDS = <span className="text-[#ff5b36]">&quot;SOC2_READY&quot;</span>;</div>
                      <div className="border-t border-white/5 pt-3 mt-3 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                        <span>iOS: Active</span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] ml-4" />
                        <span>Android: Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-white/5 pt-6 text-xs font-mono text-[#7d766c]">
                    <div className="flex justify-between">
                      <span>COMPLIANCE RATING:</span>
                      <span className="text-[#ccff00] font-bold">100% SECURE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>AVERAGE SPRINT TACT:</span>
                      <span className="text-white">2 WEEKS</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20 text-center">
            <span className="text-[#ff5b36] font-mono text-xs uppercase tracking-[0.5em] block mb-6">FAQ</span>
            <AnimatedShinyText 
              text="Frequently Asked Questions." 
              textClassName="text-4xl md:text-7xl italic leading-[0.85]"
            />
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-[#0b0b0b] border border-white/5 p-8 cursor-pointer hover:border-[#ff5b36]/30 transition-all"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#d3c8b8] uppercase tracking-tight pr-6">{faq.q}</span>
                  <div className={`transition-transform duration-500 ${activeFaq === idx ? 'rotate-[135deg] text-[#ff5b36]' : 'text-[#7d766c]'}`}>
                    <Plus size={24} />
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
                      <p className="pt-8 text-[#8d8579] font-light leading-relaxed border-t border-white/5 mt-8">
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
        <div className="absolute inset-x-0 top-0 h-full bg-[#ff5b36]/5 blur-[150px] pointer-events-none z-0"></div>
        <div className="max-w-6xl mx-auto relative z-10 px-6">
          <AnimatedShinyText 
            text="architect US Advantage." 
            textClassName="text-6xl md:text-[8rem] text-white italic"
          />
          
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ff5b36] text-white text-xl font-bold px-16 py-8 rounded-full hover:bg-white transition-all transform hover:scale-105 uppercase tracking-tighter shadow-[0_0_50px_rgba(255,91,54,0.3)]"
            >
               Initiate US Audit Protocol
            </a>
            <div className="text-[#7d766c] font-mono text-[10px] uppercase tracking-[0.3em] max-w-[300px] text-left border-l-2 border-white/10 pl-8 leading-relaxed h-16 flex items-center">
               EST. MARKET PENETRATION: 90 DAYS // US PROJECT CAPACITY: 4 SPOTS LEFT
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default USMarketPage;

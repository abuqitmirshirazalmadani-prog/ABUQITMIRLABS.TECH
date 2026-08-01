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
  BarChart3,
  MapPin,
  Anchor,
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

const AustraliaMarketPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      q: "Do you offer localized support for Australian business hours?",
      a: "Yes. We synchronize our development cycles to ensure significant overlap with AEST/AEDT, providing real-time communication for our clients in Sydney, Melbourne, Brisbane, and Perth."
    },
    {
      q: "Are your solutions compliant with Australian Privacy Principles (APP)?",
      a: "Absolutely. We design all our digital assets with data privacy as a priority, ensuring full compliance with the Australian Privacy Act and the APPs for secure data handling."
    },
    {
      q: "Can you integrate with Australian payment gateways like CommBank or Westpac?",
      a: "Yes. We specialize in integrating with major Australian financial institutions, as well as local-first solutions like eWAY, Pin Payments, and Stripe (AUD)."
    },
    {
      q: "How does your SEO strategy target the Australian search landscape?",
      a: "We perform dedicated keyword research using AU-specific data (google.com.au) to capture high-intent traffic from Australian consumers and businesses, focusing on local search intent."
    },
    {
      q: "Do you build custom ecommerce solutions for Australian startups?",
      a: "Yes. We build scalable, high-performance ecommerce platforms tailored for the AU market, including GST calculation logic and integration with local shipping providers like Australia Post."
    },
    {
      q: "How can AI agents improve customer service for an AU-based company?",
      a: "Our AI agents provide 24/7 intelligent support, handling common inquiries and bookings even while your local team is offline, ensuring you never miss a lead in the competitive AU market."
    }
  ];

  return (
    <div className="bg-[#0b0c10] text-[#c5c6c7] min-h-screen font-sans selection:bg-[#66fcf1] selection:text-black">
      <Helmet>
        <title>Software Development for Australia | APP Compliant | AbuQitmirLabs</title>
        <meta name="description" content="Australia-focused software development — APP-compliant apps, high-speed web, mobile apps, and AI agents. Built for Australian businesses with AEST-aligned delivery. Start your audit today." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/australia-market" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Software Development for Australia | APP Compliant | AbuQitmirLabs" />
        <meta property="og:description" content="Australia-focused software development — APP-compliant apps, high-speed web, mobile apps, and AI agents. Built for Australian businesses with AEST-aligned delivery. Start your audit today." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/australia-market" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Software Development for Australia | APP Compliant | AbuQitmirLabs" />
        <meta name="twitter:description" content="Australia-focused software development — APP-compliant apps, high-speed web, mobile apps, and AI agents. Built for Australian businesses with AEST-aligned delivery. Start your audit today." />
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
                    "name": "Australia Market",
                    "item": "https://www.abuqitmirlabs.tech/australia-market"
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Tech Solutions for Australian Growth",
                "description": "APP-compliant technology solutions and software engineering for the Australian market.",
                "provider": {
                  "@type": "Organization",
                  "name": "AbuQitmirLabs",
                  "url": "https://www.abuqitmirlabs.tech"
                },
                "areaServed": "AU"
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
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 md:pt-40 md:px-10 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(102,252,241,0.05),transparent_70%)] pointer-events-none"></div>
        
        <div className="relative mx-auto max-w-7xl w-full text-center">
          <div className="flex flex-col gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.4em] text-[#45a29e]"
            >
              <Anchor size={16} className="text-[#66fcf1]" />
              Dominating the Southern Cross Digital Frontier
            </motion.div>

            <div className="mb-8">
              <HeroText text="AUSTRALIA TECH" />
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white uppercase mb-8"
            >
              Tech Solutions <br />
              <span className="text-[#66fcf1]">for Australian Growth</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-4xl text-lg md:text-xl text-[#c5c6c7] leading-relaxed font-sans font-light mx-auto"
            >
              Australian businesses often face a trade-off between cost and quality with offshore partners — we remove that trade-off. With structured async workflows bridging the AEST time gap, we deliver on schedule without requiring late-night calls on either side.
            </motion.p>

            {/* Core Capabilities Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="max-w-4xl border-y border-white/5 py-8 px-6 bg-white/[0.01] backdrop-blur-sm rounded-lg mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-left">
                {[
                  "Structured Async Workflow Bridging AEST Gap",
                  "Scheduled Overlap Windows for Live Reviews",
                  "AUD-Transparent Project Pricing",
                  "Experience with AU Small Business & Startup Builds",
                  "Quality Assurance Matching AU Market Standards"
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#66fcf1] mt-2 shrink-0 group-hover:bg-[#ccff00] transition-colors duration-300" />
                    <span className="text-sm font-sans font-light text-slate-300 tracking-tight leading-relaxed group-hover:text-white transition-colors duration-300">{bullet}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 mt-12"
            >
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#66fcf1] text-black px-12 py-8 rounded-full font-black text-xl hover:bg-white transition-all flex items-center justify-center gap-3 uppercase tracking-tighter shadow-2xl shadow-[#66fcf1]/20"
              >
                <ArrowUpRight size={24} />
                Connect in AU Time
              </a>
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-[#66fcf1]/40 text-[#66fcf1] px-12 py-8 rounded-full font-black text-xl hover:bg-[#66fcf1]/10 transition-all flex items-center justify-center gap-3 uppercase tracking-tighter"
              >
                <Globe size={24} />
                Explore AU Solutions
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Australia Specific Highlights */}
      <section className="py-32 px-6 md:px-10 bg-[#1f2833] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Australia Specific APP Compliance Section */}
          <div className="mb-24 p-12 border border-[#66fcf1]/20 bg-[#66fcf1]/5 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={120} className="text-[#66fcf1]" />
            </div>
            <div className="relative z-10 max-w-3xl text-left">
              <h2 className="text-sm font-mono text-[#66fcf1] mb-6 uppercase tracking-[0.4em] font-bold">[ AU_PRIVACY_PROTOCOL ]</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-8 leading-tight">APP Compliant <br />Australian Data Standards</h3>
              <p className="text-xl text-[#c5c6c7] leading-relaxed mb-8">
                Operating in the Australian market requires strict adherence to the <span className="text-white font-bold italic">Australian Privacy Principles (APP)</span>. We architect our AU solutions with robust data protection protocols and offer local data residency options to ensure your business remains fully compliant with the <span className="text-[#66fcf1] font-bold italic">Privacy Act 1988</span>.
              </p>
              <div className="flex flex-wrap gap-4">
                {["Local AU Data Hosting", "APP Audited Cycles", "GST Compliant Logic", "Secure AU Gov Gateway Integration"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#66fcf1] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold text-[#66fcf1] uppercase tracking-[0.4em] mb-6 block">Localized Excellence</span>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none mb-10">
              Tech Built for <br />
              <span className="text-[#45a29e] italic">The Outback Hubs.</span>
            </h2>
            <p className="text-xl text-[#c5c6c7] font-light leading-relaxed mb-8">
              From the vibrant tech scene in Sydney to the innovative startups of Melbourne, we understand that Australia is a land of vast opportunity and specific digital demands.
            </p>
            <div className="flex flex-wrap gap-4">
              {['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra'].map((city) => (
                <span key={city} className="px-4 py-2 bg-black/40 border border-white/10 rounded-full text-xs font-mono tracking-widest text-[#66fcf1]">
                  {city}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            {[
              { title: "AU-GST Ready", icon: <BarChart3 className="text-[#66fcf1]" /> },
              { title: "APP Compliant", icon: <ShieldCheck className="text-[#66fcf1]" /> },
              { title: "AEST Overlap", icon: <Cpu className="text-[#66fcf1]" /> },
              { title: "AU Local SEO", icon: <Search className="text-[#66fcf1]" /> }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-black/30 border border-white/5 rounded-3xl flex flex-col items-center text-center group hover:border-[#66fcf1]/30 transition-all">
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">{item.title}</h3>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>      {/* Services Section & Cinematic Reveals */}
      <section className="py-32 px-6 md:px-10 bg-[#0e1117] relative overflow-hidden border-b border-white/5">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
        <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-[#66fcf1]/[0.01] blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-[#45a29e]/[0.01] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="mb-32 text-center">
            <span className="text-xs font-mono text-[#66fcf1] uppercase tracking-[0.4em] block mb-6">// AU DOMAIN DOMINANCE</span>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-white uppercase tracking-tight leading-none">
              Strategic Architecture <br />
              <span className="italic text-[#c5c6c7] font-light">Engineered for the AU Market</span>
            </h2>
          </div>

          <div className="space-y-40">
            {/* Section 1: Bespoke AU Web Dev */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
            >
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#66fcf1] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#66fcf1]" />
                  HIGH-SPEED WEB INFRASTRUCTURE
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Bespoke AU <br />
                  <span className="italic text-[#c5c6c7]">Web Development</span>
                </h3>
                <div className="font-sans font-light text-[#c5c6c7] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    High-speed, conversion-optimized websites built for Australian network speeds and user expectations.
                  </p>
                  <p>
                    Every build follows genuine <strong className="text-white font-medium">web development best practices</strong> — not just visual polish, but architecture tested against Australia's actual connectivity patterns across metro and regional areas alike. Our <strong className="text-white font-medium">custom web development</strong> work extends into full <strong className="text-white font-medium">custom web development applications</strong> where a business needs more than a content site — customer portals, booking platforms, and internal tools built on the right <strong className="text-white font-medium">web development framework</strong> for the job, not a default template.
                  </p>
                  <p>
                    As <strong className="text-white font-medium">web development companies</strong> go, the ones that consistently deliver for the Australian market are the ones testing against real AU network conditions rather than a fibre-connection demo environment. Our <strong className="text-white font-medium">web development services</strong> and <strong className="text-white font-medium">custom web development services</strong> both start from the same discipline: fast, accessible, and built to convert on the connections Australian users actually have.
                  </p>
                </div>
              </div>

              {/* Visual Panel for Web Dev */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#66fcf1]/5 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#c5c6c7]">
                      <span>AU_NET_OPTIMIZER</span>
                      <span className="text-[#66fcf1] flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#66fcf1] animate-pulse" />
                        ACTIVE DEPLOYMENT
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "Sydney Core Metro Speed", value: "99+ PageSpeed" },
                        { title: "Regional AU Performance", value: "OPTIMIZED" },
                        { title: "GST & Tax Logic Engine", value: "COMPLIANT" },
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 border border-white/5 rounded-xl bg-white/[0.01] flex justify-between items-center">
                          <span className="text-xs text-[#c5c6c7] font-sans font-light">{item.title}</span>
                          <span className="text-[10px] font-mono bg-[#66fcf1]/10 text-[#66fcf1] px-2 py-0.5 rounded font-bold uppercase">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-white/5 pt-6 text-xs font-mono text-[#c5c6c7]">
                    <div className="flex justify-between">
                      <span>AUDIT LOAD RESPONSE:</span>
                      <span className="text-white">EXTREMELY FAST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DEPLOYMENT TYPE:</span>
                      <span className="text-[#66fcf1] font-bold">BESPOKE SYSTEM</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section 2: Mobile App Prowess */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-white/5 pt-40"
            >
              <div className="lg:col-span-7 lg:order-2 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#45a29e] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#45a29e]" />
                  CROSS-PLATFORM &amp; NATIVE APPS
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Mobile App <br />
                  <span className="italic text-[#c5c6c7]">Prowess</span>
                </h3>
                <div className="font-sans font-light text-[#c5c6c7] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    Native iOS and Android apps designed for the thumb-friendly AU lifestyle, from health-tech to fintech.
                  </p>
                  <p>
                    We work as a <strong className="text-white font-medium">mobile app development company</strong> covering both <strong className="text-white font-medium">cross-platform mobile app development</strong> — primarily Flutter, letting a single codebase reach both platforms without doubling engineering cost — and fully native builds where platform-specific performance matters more than shared code. For Australian businesses tracking <strong className="text-white font-medium">mobile app development cost</strong> closely, cross-platform architecture is usually the more efficient starting point, with native reserved for apps that genuinely need it.
                  </p>
                  <p>
                    As a <strong className="text-white font-medium">custom mobile app development company</strong>, our <strong className="text-white font-medium">custom mobile app development services</strong> span everything from lean MVPs to full <strong className="text-white font-medium">enterprise mobile app development</strong> for larger AU organizations needing ongoing iteration rather than a single ship-and-done build.
                  </p>
                  <p>
                    Sector depth matters here too — our <strong className="text-white font-medium">healthcare mobile app development</strong> work for Australian health-tech clients is built around the same privacy discipline as the APP-compliant architecture already covering this page, and our fintech builds carry equivalent rigor. Businesses comparing us against other <strong className="text-white font-medium">mobile app development firms</strong> or <strong className="text-white font-medium">top mobile app development companies</strong> in the region usually find the real difference isn't a longer feature list, but whether the team understands AU-specific compliance and user behavior natively. Founders and product leads looking to <strong className="text-white font-medium">hire mobile app developers</strong> for a defined Sydney or Melbourne-based product, or an ongoing partnership, get the same process either way: platform strategy first, architecture second, build third.
                  </p>
                </div>
              </div>

              {/* Visual Panel for Mobile Apps */}
              <div className="lg:col-span-5 lg:order-1 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#45a29e]/5 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#c5c6c7]">
                      <span>AU_MOBILE_ENGIN</span>
                      <span className="text-[#45a29e] flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#45a29e] animate-pulse" />
                        APP STORE READY
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "App Store Sandbox", value: "SUCCESSFUL" },
                        { title: "Google Play Store Link", value: "SUCCESSFUL" },
                        { title: "AEST Overlap Testing", value: "SYNCHRONIZED" },
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 border border-white/5 rounded-xl bg-white/[0.01] flex justify-between items-center">
                          <span className="text-xs text-[#c5c6c7] font-sans font-light">{item.title}</span>
                          <span className="text-[10px] font-mono bg-[#45a29e]/10 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-white/5 pt-6 text-xs font-mono text-[#c5c6c7]">
                    <div className="flex justify-between">
                      <span>COMPLIANCE RATING:</span>
                      <span className="text-white">APP COMPLIANT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DEVELOPER RATING:</span>
                      <span className="text-[#66fcf1] font-bold">TOP APP EXPERTS</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section 3: AI Integration AU */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-white/5 pt-40"
            >
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#66fcf1] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#66fcf1]" />
                  INTELLIGENT LOCAL AGENTS
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  AI Integration <br />
                  <span className="italic text-[#c5c6c7]">AU</span>
                </h3>
                <div className="font-sans font-light text-[#c5c6c7] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    Deploying intelligent AI agents that understand local business nuances and customer service standards.
                  </p>
                  <p>
                    This is our dedicated <strong className="text-white font-medium">AI agent development company</strong> practice applied specifically to the Australian market — agents trained on local business context and customer communication norms rather than a generic global template.
                  </p>
                  <p>
                    Our <strong className="text-white font-medium">AI agent development services</strong> cover the same range we offer elsewhere: task automation, RAG-based knowledge agents pulling from a business's own documentation, and customer-facing support agents tuned to how Australian customers actually phrase requests, reducing ticket volume without the customer service feeling handed off to a script.
                  </p>
                </div>
              </div>

              {/* Visual Panel for AI Integration */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#66fcf1]/5 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#c5c6c7]">
                      <span>AU_AI_AGENT_AGENTIC</span>
                      <span className="text-[#66fcf1] flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#66fcf1] animate-pulse" />
                        LOCALIZED AGENTS
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "Local Tone Adaptation", value: "AU INFORMAL" },
                        { title: "RAG Docs Retrieval Index", value: "98.7% ACCURACY" },
                        { title: "Support Ticket Cost", value: "REDUCED BY 74%" },
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 border border-white/5 rounded-xl bg-white/[0.01] flex justify-between items-center">
                          <span className="text-xs text-[#c5c6c7] font-sans font-light">{item.title}</span>
                          <span className="text-[10px] font-mono bg-[#66fcf1]/10 text-[#66fcf1] px-2 py-0.5 rounded font-bold uppercase">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-white/5 pt-6 text-xs font-mono text-[#c5c6c7]">
                    <div className="flex justify-between">
                      <span>SERVICE RESOLUTION:</span>
                      <span className="text-white">CONTINUOUS (24/7)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>INTEGRATED SYSTEM:</span>
                      <span className="text-[#66fcf1] font-bold">INTELLIGENT AUTOMATION</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CountryMarquee />

      {/* FAQ Section */}
      <section className="py-32 px-6 md:px-10 bg-[#0b0c10]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-[#66fcf1] font-mono text-xs uppercase tracking-[0.5em] block mb-8">AU MARKET FAQ</span>
            <h3 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-none italic">Common Queries</h3>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 border border-white/5 rounded-[2rem] overflow-hidden hover:border-[#66fcf1]/30 transition-all cursor-pointer"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between p-10">
                  <span className="text-xl font-bold text-white uppercase tracking-tight pr-6">{faq.q}</span>
                  <div className={`transition-all duration-500 ${activeFaq === idx ? 'rotate-45 text-[#66fcf1]' : 'text-zinc-600'}`}>
                    <Plus size={32} />
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
                      <p className="px-10 pb-10 text-xl text-[#c5c6c7] font-light leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Related Australian Services & Internal Links */}
          <div className="mt-20 pt-12 border-t border-white/5 space-y-8 text-left">
            <div>
              <h4 className="text-xs font-mono text-[#66fcf1] uppercase tracking-[0.3em] font-bold mb-4">// AUSTRALIAN DIGITAL SERVICES & CASE STUDIES</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <Link to="/custom-software" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#66fcf1] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Custom Software</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#66fcf1]" />
                </Link>
                <Link to="/web-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#66fcf1] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Web Development</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#66fcf1]" />
                </Link>
                <Link to="/mobile-app-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#66fcf1] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Mobile Apps</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#66fcf1]" />
                </Link>
                <Link to="/ai-agent-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#66fcf1] transition-colors border border-white/5 flex items-center justify-between">
                  <span>AI Agent Systems</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#66fcf1]" />
                </Link>
                <Link to="/seo-mastery" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#66fcf1] transition-colors border border-white/5 flex items-center justify-between">
                  <span>SEO Mastery</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#66fcf1]" />
                </Link>
                <Link to="/local-seo-for-small-business" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#66fcf1] transition-colors border border-white/5 flex items-center justify-between">
                  <span>AU Local SEO</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#66fcf1]" />
                </Link>
                <Link to="/case-studies" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#66fcf1] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Case Studies</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#66fcf1]" />
                </Link>
                <Link to="/contact" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#66fcf1] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Book AEST Audit</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#66fcf1]" />
                </Link>
              </div>
            </div>

            {/* External Regulatory & Tech Standards Links */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#7d766c]">
              <span className="uppercase tracking-widest text-[11px] font-bold text-zinc-400">Australian Regulatory & Tech References:</span>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://www.oaic.gov.au/privacy/australian-privacy-principles" target="_blank" rel="noopener noreferrer" className="hover:text-[#66fcf1] transition-colors inline-flex items-center gap-1">
                  OAIC Australian Privacy Principles (APPs) <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://techcouncil.com.au/" target="_blank" rel="noopener noreferrer" className="hover:text-[#66fcf1] transition-colors inline-flex items-center gap-1">
                  Tech Council of Australia <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" target="_blank" rel="noopener noreferrer" className="hover:text-[#66fcf1] transition-colors inline-flex items-center gap-1">
                  Google SEO Guide <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-48 relative border-t border-white/5 overflow-hidden text-center bg-black">
        <div className="absolute inset-0 bg-[#66fcf1]/5 blur-[200px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10 px-6">
          <h2 className="text-6xl md:text-[9rem] font-black text-white italic tracking-tighter uppercase leading-[0.8] mb-16">
            Build The <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #66fcf1' }}>AU Future.</span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#66fcf1] text-black text-2xl font-bold px-20 py-10 rounded-full hover:bg-white transition-all transform hover:scale-105 uppercase tracking-tighter shadow-2xl shadow-[#66fcf1]/20"
            >
               Request AU Tech Audit
            </a>
            <div className="text-[#45a29e] font-mono text-[10px] uppercase tracking-[0.4em] max-w-[320px] text-left border-l-2 border-[#66fcf1] pl-8 leading-relaxed h-16 flex items-center">
               AUSTRALIA COMPLIANCE READY // GMT+10/11 SLOTS: OPEN
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AustraliaMarketPage;

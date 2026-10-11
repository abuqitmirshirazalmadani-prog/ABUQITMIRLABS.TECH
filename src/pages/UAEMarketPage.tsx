import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Plus, 
  Cpu, 
  Search,
  Code,
  Smartphone,
  ChevronRight,
  ExternalLink,
  Building,
  CreditCard,
  Lock,
  Database,
  BarChart3,
  CheckCircle2,
  Sparkles,
  Server,
  Layers
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import HeroText from '../components/ui/hero-shutter-text';
import { AnimatedShinyText } from '../components/ui/animated-shiny-text';
import { AnimatedBreathingText } from '../components/ui/animated-breathing-text';
import { MagicText } from '../components/ui/magic-text';

const UAEMarketPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      q: "How much does mobile app development cost in Dubai?",
      a: "Mobile app development in Dubai typically ranges from AED 80,000 to AED 400,000 at local agency rates, depending on complexity, platform (iOS, Android, or both), and backend requirements. At AbuQitmirLabs, offshore engineering rates for a comparable scope typically range from $20,000 to $80,000 USD. The difference reflects the cost structure of offshore delivery, not a reduction in quality or capability."
    },
    {
      q: "Do you build Arabic-first apps with RTL support?",
      a: "Yes. Every mobile and web application we build for the UAE market is designed with Arabic as a primary language. This includes RTL layout for all UI components, Arabic typography, and localized content that reflects how UAE users actually communicate. We do not build English-first apps and translate them later."
    },
    {
      q: "What is NESA compliance and why does it matter for UAE software?",
      a: "NESA (National Electronic Security Authority) is the UAE's cybersecurity framework, now overseen by the Signals Intelligence Agency. It defines security controls that organizations in the UAE — particularly those in critical sectors — must implement to protect digital assets. For software projects, NESA compliance affects architecture decisions, access controls, encryption standards, and audit logging. We build every UAE project with NESA-aligned security as a baseline."
    },
    {
      q: "Can you integrate with UAE payment gateways and government services?",
      a: "Yes. We integrate Careem Pay, Telr, Network International, Stripe UAE, Tabby, Tamara, and other UAE payment gateways into web and mobile applications. Where applicable, we also integrate with UAE digital government service APIs for identity verification, document submission, and regulatory reporting."
    },
    {
      q: "Do you have experience with UAE fintech regulations?",
      a: "Our engineering team has built financial technology platforms with security architectures suitable for DFSA and ADGM regulatory environments. This includes transaction monitoring, KYC/AML workflows, audit trail generation, and regulatory reporting infrastructure."
    }
  ];

  return (
    <div className="bg-[#05080c] text-[#d6e0ea] min-h-screen font-sans selection:bg-[#38bdf8] selection:text-black">
      <Helmet>
        <title>Software Development UAE | Arabic Apps & AI Agents | AbuQitmirLabs</title>
        <meta name="description" content="Custom software, AI agents & local SEO for UAE businesses. Arabic-first, NESA-compliant, Dubai & Abu Dhabi coverage. Get a free consultation." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/uae-market" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Software Development UAE | Arabic Apps & AI Agents | AbuQitmirLabs" />
        <meta property="og:description" content="Custom software, AI agents & local SEO for UAE businesses. Arabic-first, NESA-compliant, Dubai & Abu Dhabi coverage. Get a free consultation." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/uae-market" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Software Development UAE | Arabic Apps & AI Agents | AbuQitmirLabs" />
        <meta name="twitter:description" content="Custom software, AI agents & local SEO for UAE businesses. Arabic-first, NESA-compliant, Dubai & Abu Dhabi coverage. Get a free consultation." />
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
                    "name": "UAE Market",
                    "item": "https://www.abuqitmirlabs.tech/uae-market"
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "AbuQitmirLabs - UAE Tech Solutions",
                "description": "NESA-compliant software development, Arabic-first mobile applications, AI agents, and bilingual local SEO for Dubai and Abu Dhabi.",
                "url": "https://www.abuqitmirlabs.tech/uae-market",
                "telephone": "+923233260859",
                "priceRange": "$$$$",
                "image": "https://www.abuqitmirlabs.tech/logo.png",
                "areaServed": ["AE", "Dubai", "Abu Dhabi", "Sharjah"],
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Dubai",
                  "addressCountry": "AE"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Software Development for UAE",
                "description": "Elite software engineering, mobile apps, and AI agents for UAE enterprises and startups across Dubai and Abu Dhabi.",
                "provider": {
                  "@type": "Organization",
                  "name": "AbuQitmirLabs",
                  "url": "https://www.abuqitmirlabs.tech"
                },
                "areaServed": "AE"
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_40%),linear-gradient(to_bottom,rgba(56,189,248,0.02),transparent_25%,transparent_80%,rgba(56,189,248,0.03))] pointer-events-none" />
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#38bdf8]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-700/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative mx-auto max-w-7xl w-full">
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.35em] text-[#38bdf8]"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[#38bdf8] animate-pulse" />
              United Arab Emirates // Dubai &amp; Abu Dhabi Digital Engineering
            </motion.div>

            <div className="mb-4">
              <HeroText text="UAE TECH HUB" />
            </div>

            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white uppercase mb-8"
            >
              Software Development <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#93c5fd]">for UAE | Arabic-First Apps</span>
            </motion.h1>

            {/* Quick Takeaways Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="max-w-4xl p-8 rounded-2xl bg-gradient-to-br from-sky-950/30 to-black border border-[#38bdf8]/30 backdrop-blur-md shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#38bdf8] uppercase tracking-widest mb-4">
                <Sparkles size={16} />
                Quick Takeaways
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-sans text-gray-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#38bdf8] shrink-0" />
                  <span>74,150 monthly buyer intent signals in UAE app dev (low 14.6 competition)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#38bdf8] shrink-0" />
                  <span>Arabic-first mobile apps see 40-60% higher engagement</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#38bdf8] shrink-0" />
                  <span>NESA &amp; UAE IA compliant engineering standards</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#38bdf8] shrink-0" />
                  <span>Serving Dubai, Abu Dhabi, Sharjah, and all Emirates</span>
                </div>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-4xl text-lg md:text-xl text-[#9ca3af] leading-relaxed font-sans font-light"
            >
              The UAE mobile application development segment commands 74,150 monthly buyer intent signals, yet competitive intensity averages a remarkably low 14.6, the lowest in the GCC region. This gap between demand and supply represents a rare opportunity. AbuQitmirLabs builds custom software, AI agents, and mobile applications for UAE businesses across fintech, real estate, hospitality, healthcare, and e-commerce with Arabic-first UX, NESA-aligned security, and full ecosystem integration.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 mt-6"
            >
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#38bdf8] text-black px-12 py-7 rounded-2xl font-bold text-lg hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[#38bdf8]/30 uppercase tracking-tight"
              >
                <ArrowUpRight size={22} />
                Partner with Us in UAE
              </a>
              <Link 
                to="/contact"
                className="border border-white/10 text-[#d1d5db] px-12 py-7 rounded-2xl font-bold text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-3 uppercase tracking-tight"
              >
                <Smartphone size={22} className="text-[#38bdf8]" />
                Get a Free UAE Market Audit
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Branding */}
      <section className="overflow-hidden border-y border-white/5 bg-[#070b10] py-14">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-4xl md:text-7xl font-semibold uppercase tracking-tight opacity-90 italic">
          <span>High Demand · Low Competition</span> <span className="text-[#38bdf8]">·</span>
          <span>40-60% Higher Arabic Engagement</span> <span className="text-[#38bdf8]">·</span>
          <span>NESA &amp; UAE IA Compliant</span> <span className="text-[#38bdf8]">·</span>
          <span>DIFC &amp; ADGM Fintech Standards</span> <span className="text-[#38bdf8]">·</span>
          <span>Dubai · Abu Dhabi · Sharjah</span> <span className="text-[#38bdf8]">·</span>
          <span>High Demand · Low Competition</span> <span className="text-[#38bdf8]">·</span>
          <span>40-60% Higher Arabic Engagement</span> <span className="text-[#38bdf8]">·</span>
        </div>
      </section>

      {/* The UAE Digital Market Opportunity */}
      <section className="py-32 px-6 md:px-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#38bdf8] mb-6 block">// MARKET INTELLIGENCE</span>
              <AnimatedShinyText 
                text="The UAE Digital Market: High Demand, Low Competition" 
                textClassName="text-4xl md:text-6xl text-white font-bold leading-tight"
              />
              <p className="mt-8 text-xl text-[#38bdf8] font-medium">
                Why UAE App Development Has the Lowest Competitive Intensity in the GCC
              </p>
            </div>
            <div className="text-lg text-[#9ca3af] leading-relaxed space-y-6 font-light">
              <p>
                The UAE leads the GCC in mobile sophistication and spending. Smartphone penetration is 96.2%, and users spend an average of 3.2 hours per day on apps. Unlike most emerging markets where Android dominates overwhelmingly, the UAE's high iOS adoption rate means iOS-first strategies are viable. This creates opportunities for businesses that build premium, design-forward applications.
              </p>
              <p>
                The competitive gap is most pronounced in Arabic-first development. Apps launched with native Arabic support from day one see 40-60% higher engagement than English-only apps retrofitted with translation. Retrofitting costs 3-5x more than building bilingual from the start. Yet most UAE agencies still build English-first products, leaving a significant portion of the market unreached.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Protocol Section */}
      <section className="py-32 px-6 md:px-10 bg-[#060a0f]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 p-12 border border-[#38bdf8]/25 bg-gradient-to-br from-[#38bdf8]/10 via-black to-black rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={140} className="text-[#38bdf8]" />
            </div>
            <div className="relative z-10 max-w-4xl">
              <span className="text-xs font-mono text-[#38bdf8] mb-6 uppercase tracking-[0.4em] font-bold block">[ UAE_DATA_PROTOCOL ]</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-8 leading-tight">
                NESA &amp; UAE IA Compliant Engineering Standards
              </h2>
              <p className="text-lg md:text-xl text-[#d1d5db] leading-relaxed mb-8 font-light">
                Operating in the UAE requires adherence to the UAE Information Assurance (IA) Standards, developed by the Signals Intelligence Agency, and the NESA (National Electronic Security Authority) framework. We architect all UAE projects with enterprise security controls, access management, encryption standards, and UAE in-country data residency options.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8 text-sm">
                <div className="p-6 rounded-2xl bg-black/60 border border-white/5">
                  <h3 className="font-bold text-white uppercase text-base mb-2 flex items-center gap-2">
                    <Database size={18} className="text-[#38bdf8]" />
                    What UAE Information Assurance Means
                  </h3>
                  <p className="text-[#9ca3af] font-light">
                    Granular role-based access management, encrypted transit and rest layers, and comprehensive audit trails compliant with Signals Intelligence Agency criteria.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-black/60 border border-white/5">
                  <h3 className="font-bold text-white uppercase text-base mb-2 flex items-center gap-2">
                    <Server size={18} className="text-[#38bdf8]" />
                    Data Residency Options for UAE Businesses
                  </h3>
                  <p className="text-[#9ca3af] font-light">
                    Direct hosting configurations in UAE local cloud availability zones (AWS UAE Region, Azure UAE Central/North) for regulated sectors.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {["NESA Aligned Controls", "UAE IA Standard", "DFSA & ADGM Ready", "UAE In-Country Cloud", "PCI-DSS Level 1"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#38bdf8] mb-6 block">// THE ABUQITMIRLABS EDGE</span>
            <AnimatedShinyText 
              text="Silicon-Grade Velocity for Dubai and Abu Dhabi." 
              textClassName="text-4xl md:text-7xl font-bold text-white"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Arabic-First Native Apps",
                desc: "Engineered for 40-60% higher engagement with fluid RTL ergonomics, Arabic micro-typography, and seamless Apple Pay checkouts.",
                icon: <Smartphone className="text-[#38bdf8]" size={32} />
              },
              {
                title: "Fintech & SaaS Platforms",
                desc: "High-throughput cloud architectures built for DFSA and ADGM regulatory compliance with automated KYC and transaction auditing.",
                icon: <Zap className="text-[#38bdf8]" size={32} />
              },
              {
                title: "Bilingual Dubai SEO",
                desc: "Commanding Google.ae local and map-pack visibility across Dubai, DIFC, Downtown, and Abu Dhabi with structured semantic entity mapping.",
                icon: <Search className="text-[#38bdf8]" size={32} />
              }
            ].map((feature, i) => (
              <div key={i} className="p-10 bg-white/[0.02] border border-white/5 hover:border-[#38bdf8]/40 rounded-3xl transition-all group flex flex-col items-start">
                <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">{feature.icon}</div>
                <AnimatedBreathingText text={feature.title} className="text-2xl font-bold uppercase tracking-tight mb-4 group-hover:text-white" />
                <MagicText text={feature.desc} className="text-[#9ca3af] leading-relaxed font-light" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CountryMarquee />

      {/* Cinematic Reveal Sections: Core Services */}
      <section className="py-32 px-6 md:px-10 border-y border-white/5 bg-[#040609] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-32 text-center">
            <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-[0.4em] block mb-6">// CORE SERVICES FOR THE UAE MARKET</span>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-white uppercase tracking-tight leading-none">
              Engineering Built for <br />
              <span className="italic text-[#9ca3af] font-light">the UAE Digital Infrastructure</span>
            </h2>
          </div>

          <div className="space-y-40">
            {/* Service 1: Arabic-First Mobile App Development */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
            >
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#38bdf8] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#38bdf8]" />
                  PREMIUM MOBILE ARCHITECTURE
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Arabic-First Mobile <br />
                  <span className="italic text-[#9ca3af]">App Development (iOS, Android, Flutter)</span>
                </h3>
                <div className="font-sans font-light text-[#9ca3af] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    We build native iOS (Swift) and Android (Kotlin) applications, as well as cross-platform apps in Flutter and React Native, designed specifically for UAE users. Every mobile build includes Arabic-first UX with proper RTL layout, local payment gateway integration (Careem Pay, Telr, Network International, Stripe UAE), and utility service integrations similar to Salik, DEWA, and RTA.
                  </p>
                  <p>
                    The 40-60% engagement differential between Arabic-first and English-only apps is not theoretical. It reflects the reality that UAE consumers, whether Emirati nationals or expatriates from Arab countries, interact with digital products in their preferred language. Building for that preference from the start produces measurably better retention and conversion.
                  </p>
                </div>
              </div>

              {/* Parallax Card 1 */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/80 border border-[#38bdf8]/20 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#38bdf8]/10 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/60 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#9ca3af]">
                      <span>UAE_MOBILE_TELEMETRY</span>
                      <span className="text-[#38bdf8] flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#38bdf8] animate-pulse" />
                        ENGAGEMENT +54%
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { name: "Smartphone Penetration", stat: "96.2% iOS/Android", status: "TIER 1" },
                        { name: "Daily App Consumption", stat: "3.2 Hours / User", status: "OPTIMIZED" },
                        { name: "Payment Integrations", stat: "Apple Pay, Telr, Tabby", status: "INTEGRATED" },
                      ].map((item, i) => (
                        <div key={i} className="p-4 border border-white/5 rounded-xl flex justify-between items-center bg-white/[0.02]">
                          <div>
                            <span className="text-sm font-bold text-white block uppercase">{item.name}</span>
                            <span className="text-xs text-[#9ca3af]">{item.stat}</span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#38bdf8]/20 text-[#38bdf8] font-bold">{item.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-white/5 pt-6 text-xs font-mono text-[#9ca3af]">
                    <div className="flex justify-between">
                      <span>COMPETITIVE INTENSITY:</span>
                      <span className="text-[#38bdf8] font-bold">14.6 (LOWEST IN GCC)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TIME ZONE OVERLAP:</span>
                      <span className="text-white">FULL GST (UTC+4)</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service 2: Custom Software & Web Applications */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-white/5 pt-40"
            >
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#38bdf8] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#38bdf8]" />
                  ENTERPRISE WEB PLATFORMS
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Custom Software &amp; <br />
                  <span className="italic text-[#9ca3af]">Enterprise Web Platforms</span>
                </h3>
                <div className="font-sans font-light text-[#9ca3af] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    We engineer bespoke web applications and SaaS platforms for UAE enterprises using Next.js, React, Node.js, and Laravel. Common builds include multi-tenant SaaS products for the UAE market, real estate and hospitality portals, fintech dashboards, and enterprise B2B platforms.
                  </p>
                  <p>
                    Every build is architected for the UAE's digital infrastructure: high-performance edge hosting, CDN delivery optimized for UAE network topology, and bilingual Arabic/English interfaces.
                  </p>
                </div>
              </div>

              {/* Parallax Card 2 */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/80 border border-[#38bdf8]/20 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/60 relative">
                    <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-widest block mb-4">Enterprise Capabilities</span>
                    <div className="space-y-3 text-xs font-mono">
                      <div className="p-3 rounded-lg bg-white/5 text-gray-200">✓ Multi-Tenant SaaS Architecture</div>
                      <div className="p-3 rounded-lg bg-white/5 text-gray-200">✓ DFSA &amp; ADGM Regulatory Tech</div>
                      <div className="p-3 rounded-lg bg-white/5 text-gray-200">✓ Real Estate &amp; Hospitality Portals</div>
                      <div className="p-3 rounded-lg bg-white/5 text-gray-200">✓ Sub-Second Edge CDN Deployment</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service 3: AI Agents & Dubai Local SEO */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-white/5 pt-40"
            >
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#38bdf8] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#38bdf8]" />
                  AI &amp; LOCAL SEARCH GROWTH
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  AI Agents &amp; <br />
                  <span className="italic text-[#9ca3af]">Local SEO for Dubai, Abu Dhabi &amp; Sharjah</span>
                </h3>
                <div className="font-sans font-light text-[#9ca3af] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    UAE businesses are adopting AI agents across customer service, document processing, and operational workflows. We build custom AI agents with Arabic-capable LLM integration, RAG pipelines grounded in organizational knowledge, and integration with existing CRM, ERP, and EHR systems.
                  </p>
                  <p>
                    For local search discovery, we manage complete Google Business Profile optimization with bilingual Arabic/English keyword strategy, district-level landing pages, and review generation workflows across Dubai (including DIFC, Business Bay, JLT, Downtown), Abu Dhabi (ADGM, Al Maryah Island), and Sharjah.
                  </p>
                </div>
              </div>

              {/* Parallax Card 3 */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/80 border border-[#38bdf8]/20 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
                  <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-widest block mb-4">Key Municipal Districts</span>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["DIFC", "Business Bay", "Downtown Dubai", "Dubai Marina", "ADGM Abu Dhabi", "Sharjah Hub", "JLT"].map(dist => (
                      <span key={dist} className="px-3 py-1.5 rounded-lg bg-black border border-white/10 text-xs font-mono text-gray-300">
                        {dist}
                      </span>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-[#9ca3af] leading-relaxed">
                    Bilingual Google.ae entity graph mapping guarantees map-pack positioning across high-competition hospitality, commercial real estate, and financial verticals.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offshore Advantages Section */}
      <section className="py-32 px-6 md:px-10 bg-[#070b10] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-[0.35em] block mb-4">// COMMERCIAL EFFICIENCY</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight leading-tight">
                Why UAE Businesses Choose Offshore Engineering Partners
              </h2>
              <p className="mt-6 text-xl text-[#38bdf8] font-medium">
                Cost Advantage vs Local Dubai Agencies + GST Time Zone Overlap
              </p>
            </div>
            <div className="text-lg text-[#9ca3af] leading-relaxed space-y-6 font-light">
              <p>
                Dubai agency rates for custom software and mobile app development rank among the highest in the region. Offshore engineering partners offer cost advantages without sacrificing technical quality, provided they understand the UAE market's specific requirements.
              </p>
              <p>
                AbuQitmirLabs operates in a time zone (PKT, GST+1) that overlaps with UAE business hours. You get direct Slack or Teams communication with the engineering team, fixed-price milestones, and full source code ownership. No account manager layers, no hidden markups, and no licensing lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-32 px-6 md:px-10 bg-[#040609]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-[0.3em] block mb-4">// FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight">
              UAE Tech Questions Answered
            </h2>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="border border-white/5 bg-black/60 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#38bdf8]/30"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-8 text-left flex justify-between items-center gap-6"
                  aria-expanded={activeFaq === index}
                >
                  <span className="text-xl md:text-2xl font-bold text-white tracking-tight">{faq.q}</span>
                  <span className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform ${activeFaq === index ? 'rotate-45 text-[#38bdf8]' : 'text-gray-400'}`}>
                    <Plus size={18} />
                  </span>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-8 pb-8 text-lg text-[#9ca3af] font-light leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Internal Links Matrix */}
          <div className="mt-20 pt-12 border-t border-white/5 space-y-8 text-left">
            <div>
              <h4 className="text-xs font-mono text-[#38bdf8] uppercase tracking-[0.3em] font-bold mb-4">// RELATED SERVICES &amp; TECHNICAL DEEP DIVES</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <Link to="/mobile-app-development" className="p-3 bg-[#080d14] hover:bg-white/5 rounded-lg text-[#8d9ba8] hover:text-[#38bdf8] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Mobile App Dev</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                </Link>
                <Link to="/ai-agent-development" className="p-3 bg-[#080d14] hover:bg-white/5 rounded-lg text-[#8d9ba8] hover:text-[#38bdf8] transition-colors border border-white/5 flex items-center justify-between">
                  <span>AI Agent Systems</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                </Link>
                <Link to="/custom-software" className="p-3 bg-[#080d14] hover:bg-white/5 rounded-lg text-[#8d9ba8] hover:text-[#38bdf8] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Custom Software</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                </Link>
                <Link to="/local-seo-for-small-business" className="p-3 bg-[#080d14] hover:bg-white/5 rounded-lg text-[#8d9ba8] hover:text-[#38bdf8] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Local SEO Services</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                </Link>
                <Link to="/web-development" className="p-3 bg-[#080d14] hover:bg-white/5 rounded-lg text-[#8d9ba8] hover:text-[#38bdf8] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Web Development</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                </Link>
                <Link to="/seo-mastery" className="p-3 bg-[#080d14] hover:bg-white/5 rounded-lg text-[#8d9ba8] hover:text-[#38bdf8] transition-colors border border-white/5 flex items-center justify-between">
                  <span>SEO Mastery</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                </Link>
                <Link to="/saudi-arabia-market" className="p-3 bg-[#080d14] hover:bg-white/5 rounded-lg text-[#8d9ba8] hover:text-[#38bdf8] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Saudi Arabia Market</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                </Link>
                <Link to="/contact" className="p-3 bg-[#080d14] hover:bg-white/5 rounded-lg text-[#8d9ba8] hover:text-[#38bdf8] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Book Consultation</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                </Link>
              </div>
            </div>

            {/* External Regulatory References */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#7d8894]">
              <span className="uppercase tracking-widest text-[11px] font-bold text-zinc-400">UAE Regulatory References:</span>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://tdra.gov.ae" target="_blank" rel="noopener noreferrer" className="hover:text-[#38bdf8] transition-colors inline-flex items-center gap-1">
                  TDRA UAE Information Assurance <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://www.difc.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#38bdf8] transition-colors inline-flex items-center gap-1">
                  DIFC Data Protection Standards <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://www.adgm.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#38bdf8] transition-colors inline-flex items-center gap-1">
                  ADGM Cyber Regulations <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Cinematic Call to Action */}
      <section className="py-44 relative border-t border-white/5 overflow-hidden text-center bg-black">
        <div className="absolute inset-0 bg-[#38bdf8]/10 blur-[200px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 px-6">
          <h2 className="text-6xl md:text-[8rem] font-black text-white italic tracking-tighter uppercase leading-[0.85] mb-14">
            Build for <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #38bdf8' }}>The UAE Hub.</span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <Link 
              to="/contact"
              className="bg-[#38bdf8] text-black text-2xl font-bold px-16 py-8 rounded-full hover:bg-white transition-all transform hover:scale-105 uppercase tracking-tighter shadow-2xl shadow-[#38bdf8]/30"
            >
              Book a Free Consultation
            </Link>
            <div className="text-[#38bdf8] font-mono text-xs uppercase tracking-[0.4em] max-w-[320px] text-left border-l-2 border-[#38bdf8] pl-8 leading-relaxed h-16 flex items-center">
              DUBAI &amp; ABU DHABI TIME // GST (UTC+4) READY
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UAEMarketPage;

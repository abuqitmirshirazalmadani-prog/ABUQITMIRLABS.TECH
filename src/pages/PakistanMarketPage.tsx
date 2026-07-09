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
  Smartphone,
  CheckCircle2,
  Lock,
  MessagesSquare,
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

const PakistanMarketPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      q: "Do you provide services across all cities in Pakistan?",
      a: "Yes. While we are based in Karachi, our digital solutions, custom software, and SEO services empower businesses in Lahore, Islamabad, Faisalabad, and nationwide."
    },
    {
      q: "Can you integrate local Pakistani payment gateways?",
      a: "Absolutely. We securely integrate local gateways such as PayFast, Safepay, JazzCash, EasyPaisa, and direct bank APIs into your custom web and mobile applications."
    },
    {
      q: "How does Local SEO help my business in Pakistan?",
      a: "Local SEO ensures your business appears at the top of Google Maps and local search results. When someone in your city searches for your service, your verified business, phone number, and directions appear first."
    },
    {
      q: "Is custom software a viable investment for a Pakistani SME?",
      a: "Yes. We offer strategically scalable solutions. We can start by building a core MVP (Minimum Viable Product) to digitize your most critical workflow, and then expand the system as your operations grow."
    },
    {
      q: "Can your AI agents understand Roman Urdu or local context?",
      a: "We can fine-tune LLM AI agents to understand contextual queries, Roman Urdu, and English, allowing them to provide natural, intelligent customer support to the local demographic."
    },
    {
      q: "Why should I invest in a Jamstack website instead of WordPress?",
      a: "Jamstack sites load instantly, which is crucial in areas with fluctuating mobile internet speeds (3G/4G). They are also virtually un-hackable, protecting your business from local and global cyber threats."
    },
    {
      q: "Do you offer continuous support for local clients?",
      a: "Yes. We are your local tech partners. We provide ongoing server maintenance, SEO monitoring, software updates, and direct WhatsApp support for all our Pakistani clients."
    }
  ];

  return (
    <div className="bg-[#090909] text-[#d3c8b8] min-h-screen font-sans selection:bg-[#ff5b36] selection:text-white overflow-x-hidden">
      <Helmet>
        <title>Custom Software & Local SEO in Pakistan | AbuQitmirLabs</title>
        <meta name="description" content="Driving digital innovation in Pakistan. AbuQitmirLabs provides top-tier custom software engineering, AI agent implementation, and hyper-local SEO for Karachi, Lahore, and Islamabad." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/pakistan-market" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Custom Software & Local SEO in Pakistan | AbuQitmirLabs" />
        <meta property="og:description" content="Expert custom software engineering and hyper-local SEO optimization for the Pakistani market." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/pakistan-market" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mobile App Development Company in Pakistan | Best" />
        <meta name="twitter:description" content="Driving digital innovation in Pakistan. AbuQitmirLabs provides top-tier custom software, AI agent integration, and hyper-local SEO." />
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
                    "name": "Pakistan Market",
                    "item": "https://www.abuqitmirlabs.tech/pakistan-market"
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Digital Transformation in Pakistan",
                "description": "Hyper-local SEO and custom software engineering for Karachi, Lahore, and Islamabad.",
                "provider": {
                  "@type": "Organization",
                  "name": "AbuQitmirLabs",
                  "url": "https://www.abuqitmirlabs.tech"
                },
                "areaServed": "PK"
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

        {/* Soft Glow Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_18%,transparent_82%,rgba(255,255,255,0.02))] pointer-events-none"></div>

        <div className="relative mx-auto max-w-7xl w-full">
          <div className="flex flex-col gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.3em] text-[#7d766c]"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[#ff5b36]"></span>
              Karachi to Islamabad — Pakistan's Premier Tech Agency
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white uppercase mb-12"
            >
              Digital Transformation <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5b36] to-[#ff9d85]">for Pakistan's Boom</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-4xl text-lg md:text-xl text-[#9f978a] leading-relaxed font-sans font-light"
            >
              As a Karachi-based team, we understand the local market directly — no translation layer, no cultural gap. We work with Pakistani SMEs and startups on practical budgets, with in-person meetings available and payments in PKR.
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
                  "In-Person Meetings Available (Karachi-Based)",
                  "PKR Pricing, No Currency Conversion Hassle",
                  "Local Market & Consumer Behavior Understanding",
                  "Budget-Friendly Packages for SMEs & Startups",
                  "Same Time-Zone, Zero Communication Delay"
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
                className="bg-[#ff5b36] hover:bg-white text-white hover:text-black px-12 py-10 rounded-3xl font-black text-xl transition-all transform hover:scale-105 flex flex-col items-center justify-center gap-2 uppercase tracking-tighter brutalist-shadow"
              >
                <ArrowUpRight size={28} />
                Get a Free Consultation
              </a>
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/20 text-[#d3c8b8] px-12 py-10 rounded-3xl font-black text-xl hover:bg-white/5 transition-all uppercase tracking-tighter flex flex-col items-center justify-center gap-2"
              >
                <Smartphone size={28} className="text-[#ff5b36]" />
                Transform Your Business
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Branding Section */}
      <section className="overflow-hidden border-y border-white/5 bg-[#0b0b0b] py-16 md:py-24 text-[#d3c8b8]">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-6xl md:text-9xl font-semibold uppercase tracking-tight opacity-90 italic">
          <span>Digital Pakistan</span> <span className="text-[#ff5b36]">·</span>
          <span>Karachi Excellence</span> <span className="text-[#ff5b36]">·</span>
          <span>Lahore Growth</span> <span className="text-[#ff5b36]">·</span>
          <span>Islamabad Innovation</span> <span className="text-[#ff5b36]">·</span>
          <span>SME Empowerment</span> <span className="text-[#ff5b36]">·</span>
          {/* Repeating for loop */}
          <span>Digital Pakistan</span> <span className="text-[#ff5b36]">·</span>
          <span>Karachi Excellence</span> <span className="text-[#ff5b36]">·</span>
          <span>Lahore Growth</span> <span className="text-[#ff5b36]">·</span>
          <span>Islamabad Innovation</span> <span className="text-[#ff5b36]">·</span>
          <span>SME Empowerment</span> <span className="text-[#ff5b36]">·</span>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-32 px-6 md:px-10 bg-[#090909]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div className="sticky top-32">
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#ff5b36] mb-8 block">The Digital Gap</span>
              <AnimatedShinyText 
                text="Pakistan's Expanding Market." 
                textClassName="text-5xl md:text-8xl"
              />
            </div>
            <div className="space-y-10">
              <p className="text-2xl text-[#d3c8b8] font-light leading-relaxed">
                Pakistan’s digital ecosystem is exploding, but many local businesses are missing out. Relying on WhatsApp groups and Facebook pages is no longer a sustainable strategy for growth.
              </p>
              <div className="space-y-6 text-xl text-[#7d766c] leading-relaxed">
                <p>Local companies suffer from slow, unoptimized websites, a lack of custom software, and poor visibility on Google Maps.</p>
                <div className="h-px w-full bg-white/10 my-8"></div>
                <p>As international competitors enter the market, traditional Pakistani businesses risk becoming obsolete if they do not aggressively digitize and optimize.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-32 px-6 md:px-10 bg-[#0b0b0b] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(255,91,54,0.03),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-24">
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#ff5b36] mb-8 block">AbuQitmirLabs Solution</span>
            <AnimatedShinyText 
              text="Driving Digital Pakistan Forward." 
              textClassName="text-5xl md:text-9xl"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Card 1: Karachi Pulse */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group p-10 border border-white/5 hover:border-[#ff5b36]/30 transition-all bg-[#0d0d0d] flex flex-col items-start text-left rounded-3xl"
            >
              <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mb-8 text-[#ff5b36] group-hover:bg-[#ff5b36]/10 transition-colors">
                <MapPin size={32} />
              </div>
              <h3 className="text-2xl font-serif font-light text-white uppercase mb-6 tracking-tight">
                Karachi Pulse
              </h3>
              <div className="text-sm font-sans font-light text-[#9f978a] leading-relaxed">
                <p>
                  We understand the local market pulse better than anyone, bringing global tech standards to your doorstep.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Process Automation */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group p-10 border border-white/5 hover:border-[#ff5b36]/30 transition-all bg-[#0d0d0d] flex flex-col items-start text-left rounded-3xl"
            >
              <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mb-8 text-[#ff5b36] group-hover:bg-[#ff5b36]/10 transition-colors">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-serif font-light text-white uppercase mb-6 tracking-tight">
                Process Automation
              </h3>
              <div className="text-sm font-sans font-light text-[#9f978a] leading-relaxed space-y-4">
                <p>
                  Replace manual, paper-based workflows with scalable custom software and mobile apps built for how Pakistani businesses actually operate day to day.
                </p>
                <p>
                  This is where our <strong className="text-white font-medium">custom mobile app development services</strong> and broader <strong className="text-white font-medium">custom software development</strong> practice meet directly — automating the WhatsApp-and-spreadsheet workflows most SMEs have outgrown, without forcing a rebuild of the entire business around imported enterprise software never designed for the local context.
                </p>
              </div>
            </motion.div>

            {/* Card 3: 24/7 AI Support */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group p-10 border border-white/5 hover:border-[#ff5b36]/30 transition-all bg-[#0d0d0d] flex flex-col items-start text-left rounded-3xl"
            >
              <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mb-8 text-[#ff5b36] group-hover:bg-[#ff5b36]/10 transition-colors">
                <MessagesSquare size={32} />
              </div>
              <h3 className="text-2xl font-serif font-light text-white uppercase mb-6 tracking-tight">
                24/7 AI Support
              </h3>
              <div className="text-sm font-sans font-light text-[#9f978a] leading-relaxed">
                <p>
                  Deploy AI agents trained in Roman Urdu and local contexts to handle customer inquiries round the clock — built as part of our broader AI agent development practice, adapted specifically for how Pakistani customers actually communicate rather than a generic English-only chatbot template.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CountryMarquee />

      {/* Core Services Section */}
      <section className="py-32 px-6 md:px-10 bg-[#090909] relative overflow-hidden">
        {/* Background grids and shapes */}
        <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
        <div className="absolute -top-40 right-10 w-[600px] h-[600px] bg-blue-500/[0.01] blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 left-10 w-[600px] h-[600px] bg-[#ff5b36]/[0.01] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="mb-32 text-center">
            <span className="text-xs font-mono text-[#ff5b36] uppercase tracking-[0.4em] block mb-6">// PAKISTAN MARKET SPECIFIC CRITERIA</span>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-white uppercase tracking-tight leading-none">
              Core Services <br />
              <span className="italic text-[#9f978a] font-light">Engineered for Pakistan</span>
            </h2>
          </div>

          <div className="space-y-40">
            {/* Cinematic Section 1: Local SEO & Google Maps Dominance */}
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
                  LOCAL SEARCH DISCOVERY
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Local SEO & <br />
                  <span className="italic text-[#9f978a]">Google Maps Dominance</span>
                </h3>
                <div className="font-sans font-light text-[#9f978a] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    From Karachi tech startups to Lahore retail brands, we help you capture maximum local traffic. We optimize your GBP, secure local citations, and build semantic relevance to outrank your competitors.
                  </p>
                  <p>
                    This work sits under our broader <strong className="text-white font-medium">GMB SEO services</strong> practice — starting with a full <strong className="text-white font-medium">GMB audit for local SEO</strong> that identifies exactly where a Karachi or Lahore business is losing map-pack visibility to competitors. From there, ongoing <strong className="text-white font-medium">local SEO GMB optimization</strong> covers review management, post scheduling, and the citation consistency Google uses to judge whether a business listing is trustworthy. For businesses asking <strong className="text-white font-medium">what is GMB in SEO</strong> and why it keeps mattering more: in a market where mobile search dominates discovery, a well-managed Google Business Profile is often the single highest-leverage local SEO investment a Pakistani SME can make.
                  </p>
                  <p>
                    Our <strong className="text-white font-medium">GMB &amp; local SEO services</strong> for Karachi city specifically account for the density of the local market — competition in DHA or Clifton looks nothing like a suburban commercial area, and our strategy adjusts accordingly. For appointment-driven businesses, we also run category-specific playbooks — the same discipline behind <strong className="text-white font-medium">GMB local SEO for dentists</strong> internationally applies just as directly to clinics, salons, and service businesses across Karachi and Lahore. Agencies managing multiple local clients can also engage us for <strong className="text-white font-medium">white label GMB SEO</strong> support, handling audits and reporting under their own brand.
                  </p>
                </div>
              </div>

              {/* Visual Card for SEO */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5b36]/5 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#7d766c]">
                      <span>GBP_RANK_STATUS</span>
                      <span className="text-[#ccff00] flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#ccff00] animate-pulse" />
                        LIVE TRACKING
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "DHA Karachi Cluster", value: "#1 Position" },
                        { title: "Gulberg Lahore Cluster", value: "#1 Position" },
                        { title: "Blue Area Islamabad", value: "#1 Position" },
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
                      <span>AUDIT REVENUE GAIN:</span>
                      <span className="text-white">+182% MAP Discovery</span>
                    </div>
                    <div className="flex justify-between">
                      <span>NATIONAL STANDARDS:</span>
                      <span className="text-[#ff5b36] font-bold">RANK #1 NATIONALLY</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cinematic Section 2: Digital Transformation for SMEs */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-white/5 pt-40"
            >
              <div className="lg:col-span-7 lg:order-2 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-blue-500 uppercase tracking-widest">
                  <span className="h-px w-8 bg-blue-500" />
                  RESPONSIVE CUSTOM APPS
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Digital Transformation <br />
                  <span className="italic text-[#9f978a]">for SMEs</span>
                </h3>
                <div className="font-sans font-light text-[#9f978a] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    High-performance Web &amp; Mobile Apps tailored to the budgets and operational needs of Pakistani SMEs, ensuring maximum ROI and operational efficiency in 3G/4G environments.
                  </p>
                  <p>
                    On the web side, this means building with genuine <strong className="text-white font-medium">web development best practices</strong> from the start — not just visually polished sites, but ones engineered for Pakistan's variable connectivity realities. Every <strong className="text-white font-medium">custom web development</strong> engagement follows the same discipline: lightweight, fast-loading architecture using the right <strong className="text-white font-medium">web development framework</strong> for the job, whether that's a lean marketing site or a full <strong className="text-white font-medium">web application development</strong> build with custom business logic behind it. As <strong className="text-white font-medium">web development companies</strong> go, the ones that actually deliver for the Pakistani SME market are the ones who design for 3G/4G from day one, not as an afterthought once a beautifully heavy site fails to load on a mid-range Android phone.
                  </p>
                  <p>
                    On the mobile side, we work as a <strong className="text-white font-medium">custom mobile app development company</strong> building for exactly this constraint — apps that stay fast and functional on the mobile networks Pakistani users actually have, not the fibre connections a demo environment assumes. <strong className="text-white font-medium">Cross-platform mobile app development</strong>, primarily through Flutter, lets an SME reach both iOS and Android users from a single codebase without doubling the development cost — a meaningful difference for a business watching <strong className="text-white font-medium">mobile app development cost</strong> closely. We're proud to be recognized among the <strong className="text-white font-medium">best mobile app development companies in Pakistan</strong>, and for SMEs comparing us against other <strong className="text-white font-medium">mobile app development firms</strong>, the practical difference usually comes down to whether the team has actually shipped apps that perform well on the connectivity most Pakistani users have, rather than just the connectivity a portfolio demo was tested on.
                  </p>
                </div>
              </div>

              {/* Visual Card for SME Apps */}
              <div className="lg:col-span-5 lg:order-1 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#7d766c]">
                      <span>APP_OPTIMIZER_v3</span>
                      <span className="text-blue-500 flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        OPTIMIZED FOR 3G/4G
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "Initial Asset Footprint", value: "< 1.8MB" },
                        { title: "Average Load on 3G Speed", value: "1.2s" },
                        { title: "Offline Capabilities", value: "ENABLED" },
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
                      <span>NETWORK EFFICIENCY:</span>
                      <span className="text-white">EXTREME</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PERFORMANCE CLASS:</span>
                      <span className="text-blue-400 font-bold">OPTIMIZED FOR LOCAL SPEEDS</span>
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
            <span className="text-[#ff5b36] font-mono text-xs uppercase tracking-[0.5em] block mb-8">NATIONWIDE FAQ</span>
            <AnimatedShinyText 
              text="Local Insights. Global Answers." 
              textClassName="text-5xl md:text-8xl"
            />
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-white/5 bg-[#090909] p-8 cursor-pointer hover:border-[#ff5b36]/20 transition-all"
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
                      <p className="pt-8 text-xl text-[#8d8579] font-light leading-relaxed border-t border-white/5 mt-8">
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

      {/* Final CTA Section */}
      <section className="py-48 relative border-t border-white/5 overflow-hidden text-center bg-black">
        <div className="absolute inset-0 bg-[#ff5b36]/5 blur-[200px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10 px-6">
          <AnimatedShinyText 
            text="Scale Digital Pakistan." 
            textClassName="text-7xl md:text-[10rem] text-white"
          />
          
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black text-2xl font-bold px-16 py-8 rounded-full hover:bg-[#ff5b36] hover:text-white transition-all transform hover:scale-105 uppercase tracking-tighter shadow-2xl"
            >
               Start Local Audit
            </a>
            <div className="text-[#7d766c] font-mono text-[10px] uppercase tracking-[0.4em] max-w-[300px] text-left border-l-2 border-white/10 pl-8 leading-relaxed h-16 flex items-center">
               WHATSAPP SUPPORT INCLUDED // ZERO-HACK JAMSTACK ARCHITECTURE
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PakistanMarketPage;

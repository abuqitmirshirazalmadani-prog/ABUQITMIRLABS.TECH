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
  ShieldAlert,
  BarChart3,
  Lock,
  Globe2,
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

const UKMarketPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      q: "Are your digital solutions compliant with UK GDPR?",
      a: "Yes. Data privacy is foundational to our architecture. We ensure all custom software, AI agent data-handling, and web forms strictly comply with the UK General Data Protection Regulation."
    },
    {
      q: "Do you understand the UK digital market and search intent?",
      a: "Absolutely. We conduct localized keyword and entity research specifically using UK search data to ensure our SEO and content writing resonate with British consumer behavior."
    },
    {
      q: "Can you integrate with UK-specific payment and banking APIs?",
      a: "Yes. We regularly integrate with Open Banking APIs, Stripe, GoCardless (for Direct Debits), and other major UK financial gateways for seamless e-commerce and SaaS billing."
    },
    {
      q: "How do we collaborate given the UK time zone?",
      a: "We schedule overlap working hours tailored to GMT/BST, ensuring you have direct, real-time access to our developers and project managers via WhatsApp and video calls."
    },
    {
      q: "Do you build apps for both iOS and Android in the UK?",
      a: "Yes. We use cross-platform frameworks like Flutter and React Native to deliver flawless native experiences to both Apple and Android users across the UK simultaneously."
    },
    {
      q: "How can AI agents benefit a traditional UK business?",
      a: "AI agents can automate routine admin tasks, provide 24/7 intelligent customer support (even on bank holidays), and analyze large datasets to help traditional retail or B2B sectors cut overhead costs."
    },
    {
      q: "What is your approach to E-E-A-T in the UK market?",
      a: "We build topical authority by creating highly technical, researched content that establishes your brand as a trusted British entity, passing Google's strict quality rater guidelines."
    }
  ];

  return (
    <div className="bg-[#090909] text-[#d3c8b8] min-h-screen font-sans selection:bg-[#ff5b36] selection:text-white">
      <Helmet>
        <title>Digital Transformation for UK Businesses | GDPR Compliant | AbuQitmirLabs</title>
        <meta name="description" content="UK-focused digital transformation services — GDPR-compliant software, mobile apps, AI agents, and high-street local SEO. Built for British businesses, with full GMT working-day overlap." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/uk-market" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Digital Transformation for UK Businesses | GDPR Compliant | AbuQitmirLabs" />
        <meta property="og:description" content="UK-focused digital transformation services — GDPR-compliant software, mobile apps, AI agents, and high-street local SEO. Built for British businesses, with full GMT working-day overlap." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/uk-market" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Digital Transformation for UK Businesses | GDPR Compliant | AbuQitmirLabs" />
        <meta name="twitter:description" content="UK-focused digital transformation services — GDPR-compliant software, mobile apps, AI agents, and high-street local SEO. Built for British businesses, with full GMT working-day overlap." />
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
                "name": "Digital Transformation for UK Businesses",
                "description": "UK-focused digital transformation services — GDPR-compliant software, mobile apps, AI agents, and high-street local SEO. Built for British businesses, with full GMT working-day overlap.",
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
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 md:pt-40 md:px-10 overflow-hidden text-center">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_18%,transparent_82%,rgba(255,255,255,0.02))] pointer-events-none"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#ff5b36]/5 blur-[120px] rounded-full"></div>

        <div className="relative mx-auto max-w-7xl w-full text-center">
          <div className="flex flex-col gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.3em] text-[#7d766c]"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[#ff5b36]"></span>
              British Digital Transformation — UK Market
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white uppercase mb-12"
            >
              Digital Transformation <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5b36] to-[#ff9d85]">for UK Businesses | GDPR Ready</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-4xl text-lg md:text-xl text-[#9f978a] leading-relaxed font-sans font-light mx-auto"
            >
              UK businesses get the benefit of full working-day overlap with our team — real-time collaboration, not next-morning replies. We build with GDPR compliance in mind from day one and align with UK business hours for live calls and demos.
            </motion.p>

            {/* Core Capabilities Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="max-w-4xl border-y border-white/5 py-10 px-8 bg-white/[0.01] backdrop-blur-sm rounded-lg mx-auto space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-left">
                {[
                  "Full GMT Working-Day Overlap",
                  "GDPR-Compliant Data Handling by Design",
                  "Live Demo Calls During UK Business Hours",
                  "Transparent Pricing in GBP",
                  "Experience with UK SME & Startup Engagement Models"
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5b36] mt-2 shrink-0 group-hover:bg-[#ccff00] transition-colors duration-300" />
                    <span className="text-sm font-sans font-light text-slate-300 tracking-tight leading-relaxed group-hover:text-white transition-colors duration-300">{bullet}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/5 pt-6 text-left">
                <p className="text-sm font-sans font-light text-[#9f978a] leading-relaxed">
                  <strong className="text-white font-medium">Software development services</strong> for UK SMEs and funded startups both fall under this same working model — whether the engagement is a single fixed-price build or an ongoing <strong className="text-white font-medium">software development firm</strong> relationship, UK clients get the same GMT-hours collaboration and GBP-denominated transparency.
                </p>
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
                className="bg-white text-black px-12 py-10 rounded-3xl font-black text-xl hover:bg-[#ff5b36] hover:text-white transition-all flex flex-col items-center justify-center gap-2 uppercase tracking-tighter"
              >
                <ArrowUpRight size={28} />
                Book a UK Strategy Call
              </a>
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/20 text-[#d3c8b8] px-12 py-10 rounded-3xl font-black text-xl hover:bg-white/5 transition-all flex flex-col items-center justify-center gap-2 uppercase tracking-tighter"
              >
                <Smartphone size={28} className="text-[#ff5b36]" />
                Explore UK Tech Solutions
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-32 px-6 md:px-10 border-y border-white/5 bg-[#090909]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#ff5b36] mb-8 block">The Market Reality</span>
              <AnimatedShinyText 
                text="Agile Tech In A Shifting Economy." 
                textClassName="text-5xl md:text-8xl"
              />
            </div>
            <div className="space-y-8 text-[#9f978a] font-sans font-light">
              <p className="text-2xl text-[#d3c8b8] leading-relaxed">
                The UK market, from the financial hubs of London to the booming tech sectors of Manchester and Edinburgh, demands agility. 
              </p>
              <p className="text-lg leading-relaxed">
                Traditional British businesses are finding their legacy systems too slow and their outdated websites penalized by Google. Furthermore, strict data privacy laws make integrating new technology intimidating, leaving many UK companies trailing behind their international competitors in AI adoption and organic search visibility.
              </p>
              <p className="text-lg leading-relaxed">
                We bridge this gap with dedicated engineering partnerships tailored specifically to the regulatory, technological, and competitive demands of British commerce. Our engineers build secure, high-speed digital infrastructure with zero licensing lock-in and transparent milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-32 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(255,91,54,0.03),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* UK Specific GDPR Section */}
          <div className="mb-24 p-12 border border-blue-500/20 bg-blue-500/5 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Lock size={120} className="text-blue-500" />
            </div>
            <div className="relative z-10 max-w-4xl">
              <h2 className="text-sm font-mono text-blue-500 mb-6 uppercase tracking-[0.4em] font-bold">[ UK_GDPR_PROTOCOL ]</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-8 leading-tight">Privacy-By-Design <br />British Market Standards</h3>
              <div className="text-lg text-[#9f978a] leading-relaxed mb-10 space-y-6 font-sans font-light">
                <p>
                  Navigating the UK's strict data landscape requires more than just a privacy policy. We architect all British projects with <span className="text-white font-medium italic">UK GDPR compliance</span> at the core. From secure data residency options to granular consent management, we ensure your digital assets are legally resilient.
                </p>
                <p>
                  Our engineering workflows incorporate strict data protection controls across every sector we serve in the UK — including FCA-aligned audit logging for financial service platforms and NHS-adjacent data privacy standards for healthcare and clinical management systems.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                {["UK Data Residency", "DPA 2018 Compliant", "Granular Cookie Control", "Secure British Banking APIs"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#bfb4a3] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-24 space-y-8">
            <AnimatedShinyText 
              text="Secure & Compliant Yield." 
              textClassName="text-5xl md:text-9xl"
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Card 1: Legacy Modernization */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group p-10 border border-white/5 hover:border-[#ff5b36]/30 transition-all bg-[#0d0d0d] flex flex-col items-start text-left rounded-3xl"
            >
              <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mb-8 text-[#ff5b36] group-hover:bg-[#ff5b36]/10 transition-colors">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-serif font-light text-white uppercase mb-6 tracking-tight">
                Legacy Modernization
              </h3>
              <div className="text-sm font-sans font-light text-[#9f978a] leading-relaxed space-y-4">
                <p>
                  We modernize your outdated legacy systems to cut operational costs and improve performance, ensuring you don't get left behind. This work sits within our broader <strong className="text-white font-medium">web development framework</strong> — choosing the right architecture, whether a full rebuild or an incremental migration, based on what the existing UK system actually needs rather than a default &quot;rip and replace&quot; instinct.
                </p>
                <p>
                  Where the modernization requires a genuine application layer rather than a content platform, our team moves into full <strong className="text-white font-medium">web application development</strong>, building the custom logic a legacy CMS was never designed to handle.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Custom AI Agents */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group p-10 border border-white/5 hover:border-[#ff5b36]/30 transition-all bg-[#0d0d0d] flex flex-col items-start text-left rounded-3xl"
            >
              <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mb-8 text-[#ff5b36] group-hover:bg-[#ff5b36]/10 transition-colors">
                <Cpu size={32} />
              </div>
              <h3 className="text-2xl font-serif font-light text-white uppercase mb-6 tracking-tight">
                Custom AI Agents
              </h3>
              <div className="text-sm font-sans font-light text-[#9f978a] leading-relaxed space-y-4">
                <p>
                  We implement custom AI agents that automate administrative burdens, providing 24/7 intelligent support tailored to UK culture — an extension of our wider AI agent development practice, adapted to British communication norms and data-handling expectations rather than a generic global agent template.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Localized SEO */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group p-10 border border-white/5 hover:border-[#ff5b36]/30 transition-all bg-[#0d0d0d] flex flex-col items-start text-left rounded-3xl lg:col-span-1"
            >
              <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mb-8 text-[#ff5b36] group-hover:bg-[#ff5b36]/10 transition-colors">
                <Search size={32} />
              </div>
              <h3 className="text-2xl font-serif font-light text-white uppercase mb-6 tracking-tight">
                Localized SEO
              </h3>
              <div className="text-sm font-sans font-light text-[#9f978a] leading-relaxed space-y-4">
                <p>
                  Semantic search strategies ensure your brand captures high-intent traffic across England, Scotland, Wales, and Northern Ireland. We pair technical web engineering with clean semantic structure so that Core Web Vitals, site crawlability, and schema markup directly strengthen your search rankings.
                </p>
                <p>
                  Whether delivering a national organic campaign or a multi-region rollout, our search specialists build for sustainable visibility and measurable commercial inquiries.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

        {/* Services Section */}
      <section className="py-32 px-6 md:px-10 border-t border-white/5 bg-[#070707] relative overflow-hidden">
        {/* Background grids and shapes */}
        <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
        <div className="absolute -top-40 right-10 w-[600px] h-[600px] bg-blue-500/[0.01] blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 left-10 w-[600px] h-[600px] bg-[#ff5b36]/[0.01] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="mb-32 text-center">
            <span className="text-xs font-mono text-[#ff5b36] uppercase tracking-[0.4em] block mb-6">// SPECIFIC UK DIGITAL STRATEGY</span>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-white uppercase tracking-tight leading-none">
              Core Services <br />
              <span className="italic text-[#9f978a] font-light">Tailored for the UK Market</span>
            </h2>
          </div>

          <div className="space-y-40">
            {/* Cinematic Section 1: UK GDPR Compliant Software */}
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
                  PRIVACY-BY-DESIGN COMPLIANCE
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  UK GDPR-Compliant <br />
                  <span className="italic text-[#9f978a]">Web &amp; Software</span>
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

              {/* Parallax / Visual Card for GDPR Web & Software */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ff5b36]/5 blur-3xl rounded-full" />
                  
                  {/* Decorative Security Checklist Mockup */}
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#7d766c]">
                      <span>ICO_REGISTER_CHECK</span>
                      <span className="text-blue-500 flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        SECURE HOSTING
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "UK Data Residency Check", value: "PASSED" },
                        { title: "DPA 2018 Policy Match", value: "PASSED" },
                        { title: "Granular Consent Controls", value: "VERIFIED" },
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
                      <span>AUDIT ROADMAPS:</span>
                      <span className="text-white">COMPLETED</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DATA SHIELD STATUS:</span>
                      <span className="text-[#ff5b36] font-bold">DATA RESILIENCE CERTIFIED</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cinematic Section 2: Local SEO */}
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
                  UK MAP DOMINANCE
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

              {/* Parallax / Visual Card for Local SEO */}
              <div className="lg:col-span-5 lg:order-1 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5b36]/5 blur-3xl rounded-full" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
                  
                  {/* Decorative Map Frame Mockup */}
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#7d766c]">
                      <span>UK_MAP_TRACKER</span>
                      <span className="text-[#ccff00] flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#ccff00] animate-pulse" />
                        TOP PINS
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { district: "Greater London Area", rank: "#1 Pin" },
                        { district: "Manchester / Salford", rank: "#1 Pin" },
                        { district: "Edinburgh City Centre", rank: "#1 Pin" },
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 border border-white/5 rounded-xl bg-white/[0.01] flex justify-between items-center">
                          <span className="text-xs text-[#9f978a] font-sans font-light">{item.district}</span>
                          <span className="text-[10px] font-mono bg-[#ccff00]/10 text-[#ccff00] px-2 py-0.5 rounded font-bold uppercase">{item.rank}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-white/5 pt-6 text-xs font-mono text-[#7d766c]">
                    <div className="flex justify-between">
                      <span>GBP OPTIMIZATION:</span>
                      <span className="text-white">ACTIVE DAILY</span>
                    </div>
                    <div className="flex justify-between">
                      <span>MAP POSITIONING:</span>
                      <span className="text-blue-500 font-bold">HIGH STREET DOMINANCE</span>
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
            <span className="text-[#ff5b36] font-mono text-xs uppercase tracking-[0.5em] block mb-6 px-4 py-2 border border-[#ff5b36]/20 inline-block rounded-full">UK MARKET FAQ</span>
            <AnimatedShinyText 
              text="Frequently Asked Questions." 
              textClassName="text-5xl md:text-8xl italic leading-[0.85]"
            />
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div 
                key={idx} 
                className="group border-b border-white/10 p-8 cursor-pointer hover:bg-white/[0.02] transition-all"
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
                      <p className="pt-8 text-xl text-[#8d8579] font-light leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Related UK Digital Engineering Capabilities & Case Studies */}
          <div className="mt-20 pt-12 border-t border-white/5 space-y-8">
            <div>
              <h4 className="text-xs font-mono text-[#ff5b36] uppercase tracking-[0.3em] font-bold mb-4">// RELATED UK MARKET CAPABILITIES</h4>
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
                  <span>UK High-Street SEO</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
                <Link to="/case-studies" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#ff5b36] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Case Studies</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
                <Link to="/contact" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#ff5b36] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Book GMT Audit</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
              </div>
            </div>

            {/* External Regulatory & Tech Standards Links */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#7d766c]">
              <span className="uppercase tracking-widest text-[11px] font-bold text-zinc-400">UK Regulatory & Industry References:</span>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5b36] transition-colors inline-flex items-center gap-1">
                  ICO UK GDPR Guidelines <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://www.gov.uk/data-protection" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5b36] transition-colors inline-flex items-center gap-1">
                  UK Data Protection Act <ExternalLink className="w-3 h-3" />
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
            text="Rule the Digital Kingdom." 
            textClassName="text-7xl md:text-[8rem] text-white"
          />
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black text-2xl font-bold px-20 py-10 rounded-full hover:bg-[#ff5b36] hover:text-white transition-all transform hover:scale-105 uppercase tracking-tighter shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
               Initiate UK Strategy Audit
            </a>
            <div className="text-[#7d766c] font-mono text-xs uppercase tracking-[0.4em] max-w-[300px] text-left border-l-2 border-[#ff5b36] pl-8 leading-relaxed">
               UK COMPLIANCE READY // GMT COLLABORATION SLOTS: OPEN
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UKMarketPage;

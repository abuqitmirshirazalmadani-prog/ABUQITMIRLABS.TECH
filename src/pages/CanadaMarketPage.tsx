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
  Languages,
  Database,
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

const CanadaMarketPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      q: "Can your SEO strategies target multiple Canadian cities simultaneously?",
      a: "Yes. We utilize programmatic SEO and semantic content siloing to build dedicated, high-ranking landing pages for specific locations like Toronto, Montreal, Calgary, and Vancouver."
    },
    {
      q: "Do you ensure compliance with Canadian data privacy laws?",
      a: "Absolutely. Our custom software and AI databases are architected to be fully compliant with PIPEDA (Personal Information Protection and Electronic Documents Act) to secure Canadian user data."
    },
    {
      q: "Can you build bilingual (English/French) digital platforms?",
      a: "Yes. We develop seamless multi-language architectures for web and mobile apps, and our content team can structure your SEO to rank for both English and Canadian French search queries."
    },
    {
      q: "How do you manage communications across Canadian time zones?",
      a: "We are highly flexible. We coordinate overlap hours via Zoom/Google Meet to align with EST, CST, or PST, ensuring smooth agile development sprints and real-time reporting."
    },
    {
      q: "What tech stack do you use for Canadian enterprise software?",
      a: "We utilize modern, scalable stacks including Node.js, Python, React, Next.js, and host on robust cloud infrastructures like AWS or Google Cloud, which have dedicated Canadian data centers."
    },
    {
      q: "How can AI agents help a Canadian e-commerce business?",
      a: "Custom AI agents can automate bilingual customer support, intelligently manage inventory queries, and provide personalized product recommendations 24/7, vastly improving the customer experience."
    },
    {
      q: "Why partner with AbuQitmirLabs for the Canadian market?",
      a: "We offer a rare combination of elite technical engineering and deep semantic SEO expertise by AbuQitmirLabs. We deliver North American-level quality and innovation with a highly optimized investment ROI."
    }
  ];

  return (
    <div className="bg-[#090909] text-[#d3c8b8] min-h-screen font-sans selection:bg-[#ff5b36] selection:text-white">
      <Helmet>
        <title>Software Development for Canada | PIPEDA Compliant | AbuQitmirLabs</title>
        <meta name="description" content="Canada-focused software development — PIPEDA-compliant apps, local SEO, and bilingual-ready platforms (EN/FR). Built for Canadian startups and enterprises, with EST/PST overlap." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/canada-market" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Software Development for Canada | PIPEDA Compliant | AbuQitmirLabs" />
        <meta property="og:description" content="Canada-focused software development — PIPEDA-compliant apps, local SEO, and bilingual-ready platforms (EN/FR). Built for Canadian startups and enterprises, with EST/PST overlap." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/canada-market" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Software Development for Canada | PIPEDA Compliant | AbuQitmirLabs" />
        <meta name="twitter:description" content="Canada-focused software development — PIPEDA-compliant apps, local SEO, and bilingual-ready platforms (EN/FR). Built for Canadian startups and enterprises, with EST/PST overlap." />
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
                "name": "Software Development Services Canada",
                "description": "Canada-focused software development — PIPEDA-compliant apps, local SEO, and bilingual-ready platforms (EN/FR).",
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
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 md:pt-40 md:px-10 overflow-hidden text-center">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_18%,transparent_82%,rgba(255,255,255,0.02))] pointer-events-none"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-red-600/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-white/5 blur-[150px] rounded-full"></div>

        <div className="relative mx-auto max-w-7xl w-full">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.3em] text-[#7d766c] mb-10"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-[#ff5b36]"></span>
                Coast-to-Coast Innovation — Canadian Market
              </motion.div>

              <div className="mb-12">
                <HeroText text="CANADA TECH" />
              </div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-8"
              >
                Software Engineering <br />
                <span className="text-[#ff5b36]">for Canadian Growth</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="max-w-4xl text-lg md:text-xl text-[#9f978a] leading-relaxed font-sans font-light text-left space-y-4"
              >
                <span>
                  Canadian businesses get a development partner that understands both US-adjacent business standards and Canadian data residency considerations. We align with EST/PST overlap and build scalable systems ready for cross-border growth.
                </span>
                <span className="block text-base md:text-lg mt-4 text-[#7d766c]">
                  This work sits under our broader <strong className="text-white font-medium">custom software development</strong> practice, built around a consistent <strong className="text-white font-medium">custom software development best practice</strong>: architecture reviewed against PIPEDA and Canadian data residency requirements before a single feature ships. Whether the engagement runs through a fixed-scope project or an ongoing <strong className="text-white font-medium">custom software development agency</strong> relationship, Canadian clients get the same disciplined process — requirements first, architecture second, code third.
                </span>
              </motion.p>

              {/* Core Capabilities Specifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="max-w-4xl border-y border-white/5 py-8 px-6 bg-white/[0.01] backdrop-blur-sm rounded-lg my-10 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-left">
                  {[
                    "EST/PST Time Zone Overlap for Canadian Teams",
                    "Data Residency & PIPEDA-Aware Development",
                    "Bilingual-Ready Web & App Builds (EN/FR)",
                    "Scalable Architecture for Cross-Border Expansion",
                    "Transparent CAD Pricing"
                  ].map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff5b36] mt-2 shrink-0 group-hover:bg-[#ccff00] transition-colors duration-300" />
                      <span className="text-sm font-sans font-light text-slate-300 tracking-tight leading-relaxed group-hover:text-white transition-colors duration-300">{bullet}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/5 pt-6 text-left">
                  <p className="text-sm font-sans font-light text-[#9f978a] leading-relaxed">
                    As <strong className="text-white font-medium">AbuQitmirLabs.tech software development services</strong>, this working model extends across every sector we build for in Canada — a <strong className="text-white font-medium">custom software development firm</strong> relationship for an ongoing SaaS product looks different in cadence from a single <strong className="text-white font-medium">custom software development services</strong> engagement, but both run on the same GMT-adjacent overlap and CAD-transparent pricing.
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
                  className="bg-[#ff5b36] text-white px-12 py-10 rounded-3xl font-black text-xl hover:scale-105 transition-transform flex flex-col items-center justify-center gap-2 uppercase tracking-tighter"
                >
                  <ArrowUpRight size={28} />
                  Request a Canadian Market Audit
                </a>
                <a 
                  href="https://wa.me/923233260859"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white/20 text-[#d3c8b8] px-12 py-10 rounded-3xl font-black text-xl hover:bg-white/5 transition-all flex flex-col items-center justify-center gap-2 uppercase tracking-tighter"
                >
                  <Smartphone size={28} className="text-[#ff5b36]" />
                  View Enterprise Solutions
                </a>
              </motion.div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
               <div className="relative aspect-square border border-white/5 bg-[#0d0d0d] rounded-3xl flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,91,54,0.1),transparent_70%)]"></div>
                  <Database size={120} className="text-[#ff5b36] opacity-20" />
                  <div className="absolute top-10 left-10 text-xs font-mono text-[#7d766c] uppercase tracking-widest">[ SECTOR_NORTH ]</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Stripe */}
      <section className="overflow-hidden border-y border-white/5 bg-[#0b0b0b] py-16 md:py-24">
        <div className="flex animate-marquee whitespace-nowrap gap-16 text-5xl md:text-8xl font-semibold uppercase tracking-tight opacity-90 italic">
          <span>Toronto Innovation</span> <span className="text-[#ff5b36]">·</span>
          <span>Vancouver Scaling</span> <span className="text-[#ff5b36]">·</span>
          <span>Montreal Multi-Language</span> <span className="text-[#ff5b36]">·</span>
          <span>Waterloo Tech Hub</span> <span className="text-[#ff5b36]">·</span>
          <span>PIPEDA Compliant</span> <span className="text-[#ff5b36]">·</span>
          {/* Repeating */}
          <span>Toronto Innovation</span> <span className="text-[#ff5b36]">·</span>
          <span>Vancouver Scaling</span> <span className="text-[#ff5b36]">·</span>
          <span>Montreal Multi-Language</span> <span className="text-[#ff5b36]">·</span>
          <span>Waterloo Tech Hub</span> <span className="text-[#ff5b36]">·</span>
          <span>PIPEDA Compliant</span> <span className="text-[#ff5b36]">·</span>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-32 px-6 md:px-10 border-b border-white/5 bg-[#090909]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#ff5b36] mb-8 block">The Market Challenge</span>
              <AnimatedShinyText 
                text="Diverse Tech Ecosystem." 
                className="mb-12" 
                textClassName="text-5xl md:text-8xl"
              />
            </div>
            <div className="space-y-10">
              <p className="text-2xl text-[#d3c8b8] font-light leading-relaxed">
                Canada boasts a massive, tech-savvy consumer base spread across vast regions. However, businesses often struggle with high domestic costs and diverse local markets.
              </p>
              <p className="text-xl text-[#7d766c] leading-relaxed">
                Outdated software architectures prevent seamless scaling, while generic SEO strategies fail to capture the nuanced, localized search intent of Canadian consumers from Ontario to British Columbia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The AbuQitmirLabs Edge */}
      <section className="py-32 px-6 md:px-10 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,rgba(255,91,54,0.03),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Canada Specific PIPEDA Section */}
          <div className="mb-24 p-12 border border-red-600/20 bg-red-600/5 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={120} className="text-red-600" />
            </div>
            <div className="relative z-10 max-w-4xl text-left">
              <h2 className="text-sm font-mono text-red-600 mb-6 uppercase tracking-[0.4em] font-bold">[ CAN_SECURITY_PROTOCOL ]</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-8 leading-tight">PIPEDA Compliant <br />North American Infrastructure</h3>
              <div className="text-lg text-[#9f978a] leading-relaxed mb-10 space-y-6 font-sans font-light">
                <p>
                  Operating in Canada means adhering to <span className="text-white font-medium italic">PIPEDA</span>. We engineer all Canadian applications with comprehensive data privacy safeguards and offer hosting solutions on Canadian soil to ensure your business remains legally sound and your users' data stays protected.
                </p>
                <p>
                  This compliance discipline runs through our sector-specific work for Canadian clients. Our <strong className="text-white font-medium">custom healthcare software development services</strong> — delivered as a genuine <strong className="text-white font-medium">healthcare software development company</strong> rather than a generalist shop — build patient systems around PIPEDA's health-information provisions rather than treating them as a generic afterthought. The same rigor carries into <strong className="text-white font-medium">custom financial software development</strong> and <strong className="text-white font-medium">custom fintech software development</strong> for Canadian financial services firms navigating both PIPEDA and provincial financial regulation, and into <strong className="text-white font-medium">custom enterprise software development</strong> for larger Canadian organizations managing data residency across multiple provinces.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                {["Canadian Data Residency", "PIPEDA Audited", "Bilingual UI/UX", "Secure Public Sector Integration"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#bfb4a3] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <AnimatedShinyText 
              text="Cross-Border Excellence." 
              textClassName="text-5xl md:text-9xl"
            />
            <MagicText 
              text="We provide Canadian companies with the technical firepower needed to dominate their provinces and expand globally."
              className="max-w-md text-xl text-[#8d8579] border-l-2 border-white/10 pl-8"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Card 1: Cloud-Native Build */}
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
                Cloud-Native Build
              </h3>
              <div className="text-sm font-sans font-light text-[#9f978a] leading-relaxed space-y-4">
                <p>
                  We build cloud-native custom software that delivers flawless performance from coast to coast with zero latency.
                </p>
                <p>
                  This is our broader <strong className="text-white font-medium">custom software development solutions</strong> practice applied to Canada's geography specifically — architecture that performs the same in Vancouver as it does in Halifax, rather than optimized for a single region and degraded everywhere else.
                </p>
              </div>
            </motion.div>

            {/* Card 2: AI Cost Reduction */}
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
                AI Cost Reduction
              </h3>
              <div className="text-sm font-sans font-light text-[#9f978a] leading-relaxed">
                <p>
                  By integrating custom LLM agents, we help you reduce high domestic overhead costs through intelligent automation — extending our AI agent development practice into the operational cost pressures Canadian businesses face against a strong domestic labor market.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Entity-Based SEO */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group p-10 border border-white/5 hover:border-[#ff5b36]/30 transition-all bg-[#0d0d0d] flex flex-col items-start text-left rounded-3xl"
            >
              <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mb-8 text-[#ff5b36] group-hover:bg-[#ff5b36]/10 transition-colors">
                <Search size={32} />
              </div>
              <h3 className="text-2xl font-serif font-light text-white uppercase mb-6 tracking-tight">
                Entity-Based SEO
              </h3>
              <div className="text-sm font-sans font-light text-[#9f978a] leading-relaxed space-y-4">
                <p>
                  Our strategies map out your digital entity, ensuring you capture high-value organic traffic in specific cities. This is where our <strong className="text-white font-medium">local SEO GMB optimization</strong> work becomes central — a full <strong className="text-white font-medium">GMB audit for local SEO</strong> identifying gaps city by city, followed by ongoing <strong className="text-white font-medium">GMB SEO services</strong> tailored to how competitive a given Canadian market actually is.
                </p>
                <p>
                  For businesses asking <strong className="text-white font-medium">what is GMB in SEO</strong>: in a country this geographically spread out, a well-managed Google Business Profile is often what separates a business that dominates its own city from one invisible outside a five-block radius.
                </p>
                <p>
                  Our <strong className="text-white font-medium">GMB SEO tools</strong> and reporting process cover everything <strong className="text-white font-medium">SEO and GMB</strong> touches — categories, citations, review velocity — and for agencies managing several Canadian client accounts, we also offer <strong className="text-white font-medium">white label GMB SEO</strong> support delivered under your own brand.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CountryMarquee />

      {/* Services Grid & Cinematic Reveals */}
      <section className="py-32 px-6 md:px-10 bg-[#090909] relative overflow-hidden border-b border-white/5">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
        <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-blue-500/[0.01] blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-[#ff5b36]/[0.01] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="mb-32 text-center">
            <span className="text-xs font-mono text-[#ff5b36] uppercase tracking-[0.4em] block mb-6">// CANADIAN DOMESTIC DOMINANCE</span>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-white uppercase tracking-tight leading-none">
              Strategic Growth <br />
              <span className="italic text-[#9f978a] font-light">From Coast to Coast</span>
            </h2>
          </div>

          <div className="space-y-40">
            {/* Cinematic Section 1: Scalable Architectures for Startups */}
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
                  STARTUP DEVELOPMENT HUB
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Scalable Architectures <br />
                  <span className="italic text-[#9f978a]">for Startups</span>
                </h3>
                <div className="font-sans font-light text-[#9f978a] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    Empowering tech hubs in Toronto, Waterloo, and Vancouver with robust MVP development and cross-platform apps that help you secure funding and scale rapidly.
                  </p>
                  <p>
                    This is <strong className="text-white font-medium">software development for startups</strong> built around Canadian fundraising realities specifically — investor-ready architecture without the enterprise overhead a pre-seed company doesn't yet need. For founders comparing options, the difference between us and a generic <strong className="text-white font-medium">software development firm</strong> is usually whether the team has actually shipped MVPs that survived a real due-diligence process, not just a portfolio demo.
                  </p>
                </div>
              </div>

              {/* Visual Panel for Startups */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#7d766c]">
                      <span>MVP_AUDIT_LOGS</span>
                      <span className="text-blue-500 flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        INVESTOR READY
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "Toronto Tech Sandbox", value: "SCALE READY" },
                        { title: "Waterloo Incubation Check", value: "COMPLETED" },
                        { title: "Vancouver VC Alignment", value: "COMPLIANT" },
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
                      <span>DUE DILIGENCE TEST:</span>
                      <span className="text-white">PASSED (100%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>MVP STATUS:</span>
                      <span className="text-blue-400 font-bold">READY FOR SERIES A</span>
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
                <div className="flex items-center gap-4 text-xs font-mono text-[#ff5b36] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#ff5b36]" />
                  PROVINCIAL MARKET SEEDING
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Province-Specific <br />
                  <span className="italic text-[#9f978a]">Semantic SEO</span>
                </h3>
                <div className="font-sans font-light text-[#9f978a] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    Canada is vast. We implement hyper-localized Semantic SEO and E-E-A-T strategies to ensure your business dominates Google in your specific target provinces.
                  </p>
                  <p>
                    Underneath this sits the same <strong className="text-white font-medium">GMB local SEO</strong> discipline that powers our broader local search work — <strong className="text-white font-medium">GMB SEO service</strong> delivery adjusted per province rather than a single national strategy stretched thin across a country five time zones wide.
                  </p>
                </div>
              </div>

              {/* Visual Panel for SEO */}
              <div className="lg:col-span-5 lg:order-1 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5b36]/5 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#7d766c]">
                      <span>GEO_AUDIT_MAPS</span>
                      <span className="text-[#ccff00] flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#ccff00] animate-pulse" />
                        PROVINCE-LEVEL PINS
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "Ontario Regional Reach", value: "TOP 3 PACK" },
                        { title: "British Columbia Pack", value: "RANK #1" },
                        { title: "Quebec Bilingual Maps", value: "TOP 3 PACK" },
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
                      <span>AUDIT TARGET RANGE:</span>
                      <span className="text-white">COAST TO COAST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SEARCH CLASS:</span>
                      <span className="text-[#ff5b36] font-bold">HYPER-LOCAL POWER</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cinematic Section 3: Sector Depth & Co-Development */}
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
                  SECTOR SPECIFIC &amp; EMBEDDED CO-DEVELOPMENT
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Bespoke Sector Solutions <br />
                  <span className="italic text-[#9f978a]">&amp; Co-Development models</span>
                </h3>
                <div className="font-sans font-light text-[#9f978a] leading-relaxed text-base md:text-lg max-w-5xl space-y-6">
                  <p>
                    Beyond startups, our Canadian engagements span the same sector range we support internationally: <strong className="text-white font-medium">custom logistics software development</strong> for cross-provincial supply chain operators, <strong className="text-white font-medium">custom retail software development</strong> for Canadian e-commerce and multi-location retail brands, <strong className="text-white font-medium">custom manufacturing software development</strong> for the country's industrial base, and <strong className="text-white font-medium">custom medical software development</strong> for clinics and health-tech companies building around PIPEDA rather than a foreign compliance framework.
                  </p>
                  <p>
                    Whichever sector, the model stays the same — a <strong className="text-white font-medium">custom software developer</strong> team that treats compliance and geography as inputs to the architecture, not constraints bolted on after launch. We also support <strong className="text-white font-medium">co-development software</strong> arrangements for Canadian companies with existing in-house teams, embedding specialized expertise rather than replacing what already works.
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
            <span className="text-[#ff5b36] font-mono text-xs uppercase tracking-[0.5em] block mb-8">CANADIAN MARKET FAQ</span>
            <AnimatedShinyText 
              text="Localized Intelligence." 
              textClassName="text-5xl md:text-8xl"
            />
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-[#090909] border border-white/5 p-8 md:p-10 cursor-pointer hover:border-[#ff5b36]/20 transition-all"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold uppercase tracking-tight pr-6">{faq.q}</span>
                  <div className={`transition-transform duration-500 ${activeFaq === idx ? 'rotate-[135deg] text-[#ff5b36]' : 'text-[#7d766c]'}`}>
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
                      <div className="pt-10 mt-10 border-t border-white/5">
                        <p className="text-xl text-[#8d8579] font-light leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Related Canadian Services & Internal Links */}
          <div className="mt-20 pt-12 border-t border-white/5 space-y-8 text-left">
            <div>
              <h4 className="text-xs font-mono text-[#ff5b36] uppercase tracking-[0.3em] font-bold mb-4">// CANADIAN DIGITAL SERVICES & CASE STUDIES</h4>
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
                  <span>Canadian Local SEO</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
                <Link to="/case-studies" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#ff5b36] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Case Studies</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
                <Link to="/contact" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#ff5b36] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Book Audit</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
              </div>
            </div>

            {/* External Regulatory & Tech Standards Links */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#7d766c]">
              <span className="uppercase tracking-widest text-[11px] font-bold text-zinc-400">Canadian Regulatory & Tech References:</span>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5b36] transition-colors inline-flex items-center gap-1">
                  OPC Canada PIPEDA Guidelines <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5b36] transition-colors inline-flex items-center gap-1">
                  WCAG Accessibility Standard <ExternalLink className="w-3 h-3" />
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

      {/* Special Feature Strip */}
      <section className="py-24 bg-white text-black overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="flex-1">
               <div className="flex gap-4 mb-6">
                  <Languages size={24} className="text-red-600" />
                  <span className="font-bold uppercase tracking-widest text-sm">Bilingual Advantage</span>
               </div>
               <AnimatedBreathingText text="Native Multi-Language Support." className="text-5xl font-bold tracking-tighter uppercase mb-6 leading-tight text-black" />
               <MagicText 
                text="We develop seamless multi-language architectures and rank for both English and Canadian French search queries across Quebec and the rest of Canada."
                className="text-xl font-medium opacity-60 max-w-xl text-black"
               />
            </div>
            <div className="shrink-0">
               <div className="w-64 h-64 border-8 border-black rounded-full flex items-center justify-center text-8xl font-black italic">
                  EN/FR
               </div>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/5"></div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-48 relative border-t border-white/5 overflow-hidden text-center bg-black">
        <div className="absolute inset-0 bg-[#ff5b36]/5 blur-[200px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10 px-6">
          <AnimatedShinyText 
            text="Architect Canadian Advantage." 
            textClassName="text-7xl md:text-[8rem] text-white"
          />
          
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black text-2xl font-bold px-20 py-10 rounded-full hover:bg-[#ff5b36] hover:text-white transition-all transform hover:scale-105 uppercase tracking-tighter shadow-2xl"
            >
               Initiate Market Audit
            </a>
            <div className="text-[#7d766c] font-mono text-[10px] uppercase tracking-[0.4em] max-w-[300px] text-left border-l-2 border-white/10 pl-8 leading-relaxed h-16 flex items-center">
               PIPEDA COMPLIANT // STABLE NORTH AMERICAN INFRASTRUCTURE // GMT-5/8
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CanadaMarketPage;

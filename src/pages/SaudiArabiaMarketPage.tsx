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
  Building2,
  Lock,
  Database,
  BarChart3,
  CheckCircle2,
  Sparkles,
  Server,
  FileCheck
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import HeroText from '../components/ui/hero-shutter-text';
import { AnimatedShinyText } from '../components/ui/animated-shiny-text';
import { AnimatedBreathingText } from '../components/ui/animated-breathing-text';
import { MagicText } from '../components/ui/magic-text';

const SaudiArabiaMarketPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      q: "What software development services does AbuQitmirLabs offer in Saudi Arabia?",
      a: "AbuQitmirLabs provides custom AI agent development, healthcare app development, fintech software, and PDPL-compliant software solutions for businesses in Riyadh, Jeddah, and across KSA. We serve both enterprise and startup clients with full-cycle development and support."
    },
    {
      q: "How much does custom software development cost in Saudi Arabia?",
      a: "Custom business software in Saudi Arabia typically ranges from SAR 40,000 to SAR 400,000 at standard agency rates, with enterprise platforms exceeding that range. At AbuQitmirLabs, offshore engineering rates are significantly lower than local Saudi agency pricing. We provide fixed-price quotes after a discovery session. A mid-complexity SaaS platform or enterprise portal typically falls between $15,000 and $60,000 USD depending on scope."
    },
    {
      q: "Do you build Arabic-first applications with RTL support?",
      a: "Yes. Every application we build for the Saudi market is designed with Arabic as a primary language, not a translation layer. This includes RTL layout for menus, forms, tables, and navigation; Arabic typography with appropriate font pairing; and localized content structures that reflect Saudi business terminology."
    },
    {
      q: "What is PDPL and how does it affect my software project?",
      a: "The Personal Data Protection Law (PDPL) is Saudi Arabia's comprehensive data privacy regulation, enforced by SDAIA. It governs how organizations collect, process, store, and transfer personal data. For software projects, PDPL compliance affects data storage location, consent mechanisms, data subject rights workflows, and cross-border data transfer rules. We architect every Saudi build with PDPL compliance as a foundation requirement."
    },
    {
      q: "Can you integrate with ZATCA e-invoicing and Mada payment gateway?",
      a: "Yes. We have native integration experience with ZATCA's e-invoicing framework (Fatoora) including QR code generation, simplified tax invoice compliance, cryptographic stamps, and reporting to the ZATCA portal. We also integrate Mada, STC Pay, and other Saudi payment gateways directly into web and mobile applications."
    },
    {
      q: "Do you have experience with Saudi government digital services?",
      a: "Our team has delivered enterprise platforms and AI systems for organizations operating in regulated sectors. We follow NCA Essential Cybersecurity Controls for government-adjacent work and design systems that align with Saudi digital government standards and Vision 2030 digital mandates."
    }
  ];

  return (
    <div className="bg-[#060807] text-[#d6ded9] min-h-screen font-sans selection:bg-[#10b981] selection:text-black">
      <Helmet>
        <title>Software Development Saudi Arabia | PDPL & Vision 2030 | AbuQitmirLabs</title>
        <meta name="description" content="Custom software, AI agents & local SEO for Saudi businesses. PDPL-compliant, Arabic-first, Riyadh & Jeddah coverage. Book a consultation." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/saudi-arabia-market" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Software Development Saudi Arabia | PDPL & Vision 2030 | AbuQitmirLabs" />
        <meta property="og:description" content="Custom software, AI agents & local SEO for Saudi businesses. PDPL-compliant, Arabic-first, Riyadh & Jeddah coverage. Book a consultation." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/saudi-arabia-market" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Software Development Saudi Arabia | PDPL & Vision 2030 | AbuQitmirLabs" />
        <meta name="twitter:description" content="Custom software, AI agents & local SEO for Saudi businesses. PDPL-compliant, Arabic-first, Riyadh & Jeddah coverage. Book a consultation." />
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
                    "name": "Saudi Arabia Market",
                    "item": "https://www.abuqitmirlabs.tech/saudi-arabia-market"
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "AbuQitmirLabs - Saudi Arabia Regional Tech Solutions",
                "description": "PDPL-compliant custom software, Arabic-first web applications, ZATCA e-invoicing integration, and enterprise AI agents for Saudi enterprises.",
                "url": "https://www.abuqitmirlabs.tech/saudi-arabia-market",
                "telephone": "+923233260859",
                "priceRange": "$$$$",
                "image": "https://www.abuqitmirlabs.tech/logo.png",
                "areaServed": ["SA", "Riyadh", "Jeddah", "Dammam"],
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Riyadh",
                  "addressCountry": "SA"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Software Development for Saudi Arabia",
                "description": "Saudi Arabia-focused custom software development, mobile apps, Arabic SEO, and enterprise AI agents. Fully compliant with Saudi PDPL and Vision 2030 digital mandates.",
                "provider": {
                  "@type": "Organization",
                  "name": "AbuQitmirLabs",
                  "url": "https://www.abuqitmirlabs.tech"
                },
                "areaServed": "SA"
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_40%),linear-gradient(to_bottom,rgba(16,185,129,0.02),transparent_25%,transparent_80%,rgba(16,185,129,0.03))] pointer-events-none" />
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#10b981]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-emerald-700/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative mx-auto max-w-7xl w-full animate-enter">
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.35em] text-[#10b981]"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
              Kingdom of Saudi Arabia // Vision 2030 Sovereign Engineering
            </motion.div>

            <div className="mb-4">
              <HeroText text="SAUDI ARABIA TECH" />
            </div>

            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white uppercase mb-8 animate-enter-delay-1"
            >
              Software Development <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#a7f3d0]">for Saudi Arabia | PDPL Ready</span>
            </motion.h1>

            {/* Quick Takeaways Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="max-w-4xl p-8 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-black border border-[#10b981]/30 backdrop-blur-md shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#10b981] uppercase tracking-widest mb-4">
                <Sparkles size={16} />
                Quick Takeaways
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-sans text-gray-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#10b981] shrink-0" />
                  <span>PDPL-compliant architecture with Saudi data residency options</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#10b981] shrink-0" />
                  <span>Arabic-first web applications with native RTL support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#10b981] shrink-0" />
                  <span>ZATCA Phase 2 (FATOORA) e-invoicing integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#10b981] shrink-0" />
                  <span>Serving Riyadh, Jeddah, Dammam, and NEOM</span>
                </div>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-4xl text-lg md:text-xl text-[#9ca3af] leading-relaxed font-sans font-light"
            >
              The Saudi software market reached USD 8.1 billion in 2025 and is projected to hit USD 23.5 billion by 2034, a 12.57% compound annual growth rate that outpaces broader IT infrastructure spending. Vision 2030 has directed unprecedented public investment into AI, digital infrastructure, and enterprise software across the Kingdom. AbuQitmirLabs builds production-grade software, AI agents, and web systems combining Arabic-first design, PDPL compliance, and native integration with the local technology stack: ZATCA, Mada, STC Pay, and Saudi cloud providers.
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
                className="bg-[#10b981] text-black px-12 py-7 rounded-2xl font-bold text-lg hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[#10b981]/30 uppercase tracking-tight"
              >
                <ArrowUpRight size={22} />
                Partner with Us in KSA
              </a>
              <Link 
                to="/contact"
                className="border border-white/10 text-[#d1d5db] px-12 py-7 rounded-2xl font-bold text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-3 uppercase tracking-tight"
              >
                <Smartphone size={22} className="text-[#10b981]" />
                Get a Free KSA Market Audit
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AEO Direct Answer Block */}
      <section className="py-12 px-6 md:px-10 border-t border-white/5 bg-[#080b09]">
        <div className="max-w-4xl mx-auto p-6 md:p-8 rounded-2xl bg-zinc-900/90 border-l-4 border-[#10b981] shadow-xl">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2">
            What software development services does AbuQitmirLabs offer in Saudi Arabia?
          </h3>
          <p className="text-sm md:text-base text-gray-200 leading-relaxed">
            AbuQitmirLabs provides custom AI agent development, healthcare app development, fintech software, and PDPL-compliant software solutions for businesses in Riyadh, Jeddah, and across KSA. We serve both enterprise and startup clients with full-cycle development and support.
          </p>
        </div>
      </section>

      {/* Marquee Branding */}
      <section className="overflow-hidden border-y border-white/5 bg-[#080b09] py-14">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-4xl md:text-7xl font-semibold uppercase tracking-tight opacity-90 italic">
          <span>Vision 2030 Ready</span> <span className="text-[#10b981]">·</span>
          <span>PDPL Compliant Architecture</span> <span className="text-[#10b981]">·</span>
          <span>ZATCA Phase 2 E-Invoicing</span> <span className="text-[#10b981]">·</span>
          <span>Arabic-First RTL Systems</span> <span className="text-[#10b981]">·</span>
          <span>Riyadh &amp; Jeddah Hubs</span> <span className="text-[#10b981]">·</span>
          <span>Vision 2030 Ready</span> <span className="text-[#10b981]">·</span>
          <span>PDPL Compliant Architecture</span> <span className="text-[#10b981]">·</span>
          <span>ZATCA Phase 2 E-Invoicing</span> <span className="text-[#10b981]">·</span>
          <span>Arabic-First RTL Systems</span> <span className="text-[#10b981]">·</span>
        </div>
      </section>

      {/* The Saudi Digital Transformation Opportunity */}
      <section className="py-32 px-6 md:px-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#10b981] mb-6 block">// MARKET EXPANSION</span>
              <AnimatedShinyText 
                text="The Saudi Digital Transformation Opportunity" 
                textClassName="text-4xl md:text-6xl text-white font-bold leading-tight"
              />
              <p className="mt-8 text-xl text-[#34d399] font-medium">
                Why Vision 2030 Changes Everything for Software Buyers
              </p>
            </div>
            <div className="text-lg text-[#9ca3af] leading-relaxed space-y-6 font-light">
              <p>
                Saudi Arabia's digital transformation is not a trend. It is a structural shift backed by sovereign investment and regulatory mandate. The National Data Management Office, under SDAIA, has established the Personal Data Protection Law (PDPL) as the governing framework for how businesses collect, store, and process personal data.
              </p>
              <p>
                For software buyers, this means every new application, every customer portal, and every AI agent must be architected with privacy-by-design from day one, not bolted on after launch. At the same time, Saudi consumers and enterprises expect Arabic-first digital experiences. Applications built in English and retrofitted for Arabic rarely match the engagement of platforms designed for RTL (right-to-left) from the ground up. The Saudi market rewards engineering partners who treat Arabic as a primary language, not an afterthought.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Protocol Section */}
      <section className="py-32 px-6 md:px-10 bg-[#070b09]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 p-12 border border-[#10b981]/25 bg-gradient-to-br from-[#10b981]/10 via-black to-black rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={140} className="text-[#10b981]" />
            </div>
            <div className="relative z-10 max-w-4xl">
              <span className="text-xs font-mono text-[#10b981] mb-6 uppercase tracking-[0.4em] font-bold block">[ SAUDI_DATA_PROTOCOL ]</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-8 leading-tight">
                PDPL &amp; NCA Compliant Engineering Standards
              </h2>
              <p className="text-lg md:text-xl text-[#d1d5db] leading-relaxed mb-8 font-light">
                Operating in Saudi Arabia requires strict adherence to PDPL and the National Cybersecurity Authority (NCA) framework. We build all Saudi projects with strict in-kingdom data residency options, NCA-aligned architecture, granular consent management, and native ZATCA e-invoicing pipelines.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8 text-sm">
                <div className="p-6 rounded-2xl bg-black/60 border border-white/5">
                  <h3 className="font-bold text-white uppercase text-base mb-2 flex items-center gap-2">
                    <Database size={18} className="text-[#10b981]" />
                    What PDPL Means for Your Architecture
                  </h3>
                  <p className="text-[#9ca3af] font-light">
                    Granular consent mechanisms, data subject rights workflows (access, rectification, erasure), audit trails, and strict cross-border transfer controls enforced by SDAIA.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-black/60 border border-white/5">
                  <h3 className="font-bold text-white uppercase text-base mb-2 flex items-center gap-2">
                    <Server size={18} className="text-[#10b981]" />
                    Saudi Data Residency &amp; Cloud Hosting
                  </h3>
                  <p className="text-[#9ca3af] font-light">
                    Direct deployment to in-kingdom cloud regions (Oracle Cloud Riyadh, Google Cloud Dammam, Alibaba Cloud Riyadh) to guarantee sovereign data localization.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {["Saudi Data Residency", "NCA Essential Controls", "PDPL Consent Engine", "ZATCA Phase 2 FATOORA", "SDAIA Verified Architecture"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-[#34d399] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#10b981] mb-6 block">// THE ABUQITMIRLABS EDGE</span>
            <AnimatedShinyText 
              text="Engineered for Saudi Arabia's High-Growth Enterprise." 
              textClassName="text-4xl md:text-7xl font-bold text-white"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Arabic-First UX & Jamstack",
                desc: "Sub-second load times engineered with Next.js and React featuring native RTL layout, typography hierarchy, and flawless bidirectional toggles.",
                icon: <Zap className="text-[#10b981]" size={32} />
              },
              {
                title: "Arabic LLM Agents",
                desc: "Autonomous conversational AI agents trained on proprietary enterprise knowledge bases, handling Modern Standard Arabic and Gulf dialects 24/7.",
                icon: <Cpu className="text-[#10b981]" size={32} />
              },
              {
                title: "Saudi Local & Semantic SEO",
                desc: "Dominating Google.com.sa search intent across Riyadh, Jeddah, and Dammam through structured E-E-A-T entity graphs and Arabic schema markup.",
                icon: <Search className="text-[#10b981]" size={32} />
              }
            ].map((feature, i) => (
              <div key={i} className="p-10 bg-white/[0.02] border border-white/5 hover:border-[#10b981]/40 rounded-3xl transition-all group flex flex-col items-start">
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
      <section className="py-32 px-6 md:px-10 border-y border-white/5 bg-[#050706] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-32 text-center">
            <span className="text-xs font-mono text-[#10b981] uppercase tracking-[0.4em] block mb-6">// CORE SERVICES FOR THE SAUDI MARKET</span>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-white uppercase tracking-tight leading-none">
              Strategic Engineering <br />
              <span className="italic text-[#9ca3af] font-light">Built for the Saudi Economy</span>
            </h2>
          </div>

          <div className="space-y-40">
            {/* Service 1: Custom Software & Web Applications */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
            >
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#10b981] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#10b981]" />
                  ENTERPRISE WEB PLATFORMS
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Custom Software &amp; <br />
                  <span className="italic text-[#9ca3af]">Web Applications</span>
                </h3>
                <div className="font-sans font-light text-[#9ca3af] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    Through our <Link to="/custom-software" className="text-[#34d399] underline hover:text-white transition-colors">custom software development KSA</Link> practice, we architect and build bespoke web applications using Next.js, React, Node.js, and Laravel, the exact stacks that power modern Saudi enterprise platforms. Every build includes Arabic/English bilingual UI with proper RTL layout, ZATCA compliance, and <Link to="/solutions/fintech" className="text-[#34d399] underline hover:text-white transition-colors">fintech software Saudi Arabia PDPL</Link> integration with Saudi payment gateways including Mada and STC Pay.
                  </p>
                  <p>
                    Common builds include customer self-service portals, B2B partner platforms, multi-tenant SaaS products, and internal dashboards that replace disconnected spreadsheets. For Saudi enterprises evaluating software partners, we provide full source code ownership and zero vendor lock-in.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm font-mono text-white">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      ✓ Arabic/English Bilingual UI with RTL
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      ✓ ZATCA, Mada, STC Pay Integrations
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      ✓ Customer Portals &amp; B2B Platforms
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      ✓ Multi-Tenant SaaS Products
                    </div>
                  </div>
                </div>
              </div>

              {/* Parallax Card 1 */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/80 border border-[#10b981]/20 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981]/10 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/60 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#9ca3af]">
                      <span>KSA_STACK_TELEMETRY</span>
                      <span className="text-[#10b981] flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
                        ACTIVE REGION
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { name: "ZATCA Fatoora Phase 2", cert: "Cryptographic UBL 2.1", status: "VERIFIED" },
                        { name: "Mada Payment Pipeline", cert: "PCI-DSS Level 1", status: "ONLINE" },
                        { name: "Saudi Data Residency", cert: "Oracle/GCP Dammam", status: "LOCALIZED" },
                      ].map((item, i) => (
                        <div key={i} className="p-4 border border-white/5 rounded-xl flex justify-between items-center bg-white/[0.02]">
                          <div>
                            <span className="text-sm font-bold text-white block uppercase">{item.name}</span>
                            <span className="text-xs text-[#9ca3af]">{item.cert}</span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#10b981]/20 text-[#10b981] font-bold">{item.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-white/5 pt-6 text-xs font-mono text-[#9ca3af]">
                    <div className="flex justify-between">
                      <span>RTL SUPPORT:</span>
                      <span className="text-white">NATIVE PIXEL-PERFECT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IP OWNERSHIP:</span>
                      <span className="text-white">100% CLIENT OWNED</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service 2: AI Agents & RAG Pipelines */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-white/5 pt-40"
            >
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#10b981] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#10b981]" />
                  AUTONOMOUS INTELLIGENCE
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  AI Agents &amp; RAG Pipelines <br />
                  <span className="italic text-[#9ca3af]">for Saudi Enterprises</span>
                </h3>
                <div className="font-sans font-light text-[#9ca3af] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    Saudi Arabia's AI adoption is accelerating across government, energy, and financial services. Through our <Link to="/ai-agent-development" className="text-[#34d399] underline hover:text-white transition-colors">AI agent development Riyadh</Link> engineering, we build custom AI agents with Arabic-capable LLM integration, RAG (Retrieval-Augmented Generation) pipelines that ground AI responses in your organization's verified knowledge, and human-in-the-loop oversight for regulated workflows.
                  </p>
                  <p>
                    Typical deployments include customer service automation, document processing for compliance and intake, internal knowledge retrieval, and workflow orchestration across EHR, ERP, and CRM systems.
                  </p>
                  <p>
                    As proven by our production delivery of real-world Arabic linguistic applications such as TajweedPage.com, we understand the phonological, typographic, and semantic nuances of the Arabic language at depth.
                  </p>
                </div>
              </div>

              {/* Parallax Card 2 */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/80 border border-[#10b981]/20 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/60 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#9ca3af]">
                      <span>ARABIC_LLM_ORCHESTRATOR</span>
                      <span className="text-[#34d399] font-bold">ACCURACY 99.4%</span>
                    </div>
                    <div className="space-y-4">
                      {[
                        { label: "Modern Standard Arabic (MSA)", value: "Fluent Retrieval" },
                        { label: "Gulf Dialect Comprehension", value: "Native Calibrated" },
                        { label: "Document Compliance Parsing", value: "Automated OCR/RAG" },
                        { label: "Enterprise Privacy Shield", value: "Zero Data Leakage" }
                      ].map((stat, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs font-mono border-b border-white/5 pb-2">
                          <span className="text-gray-300">{stat.label}</span>
                          <span className="text-[#10b981] font-bold">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service 3: Mobile Apps & Local SEO */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-white/5 pt-40"
            >
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#10b981] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#10b981]" />
                  MOBILE &amp; LOCAL SEARCH DOMINANCE
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Mobile App Development &amp; <br />
                  <span className="italic text-[#9ca3af]">Saudi Local SEO</span>
                </h3>
                <div className="font-sans font-light text-[#9ca3af] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    We build native iOS (Swift) and Android (Kotlin) applications, as well as cross-platform apps in Flutter—including specialized <Link to="/solutions/healthcare" className="text-[#34d399] underline hover:text-white transition-colors">healthcare app development Saudi Arabia</Link> platforms—designed specifically for Saudi mobile users. Every mobile build includes Arabic-first UX, regional payment gateway support, and offline resilience for users on variable network conditions.
                  </p>
                  <p>
                    For Saudi businesses that depend on local discovery across Riyadh, Jeddah, Dammam, and NEOM, we manage complete Google Business Profile optimization, Arabic keyword research, category alignment, geo-tagged imagery, structured Q&amp;A, and review generation workflows.
                  </p>
                </div>
              </div>

              {/* Parallax Card 3 */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/80 border border-[#10b981]/20 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
                  <span className="text-xs font-mono text-[#10b981] uppercase tracking-widest block mb-4">Metropolitan Hub Coverage</span>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Riyadh", "Jeddah", "Dammam", "Khobar", "Mecca", "Medina", "NEOM"].map(city => (
                      <span key={city} className="px-3 py-1.5 rounded-lg bg-black border border-white/10 text-xs font-mono text-gray-300">
                        {city}
                      </span>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-[#9ca3af] leading-relaxed">
                    Google.com.sa Map-Pack optimization drives up to 55% higher inbound conversion for service inquiries across commercial Saudi sectors.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offshore Advantages & Saudization FAQ Section */}
      <section className="py-32 px-6 md:px-10 bg-[#080c09] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-mono text-[#10b981] uppercase tracking-[0.35em] block mb-4">// ECONOMIC ADVANTAGE</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight leading-tight">
                How Saudi Businesses Benefit from Offshore Engineering
              </h2>
              <p className="mt-6 text-xl text-[#34d399] font-medium">
                Cost Comparison: Local Agency vs AbuQitmirLabs
              </p>
            </div>
            <div className="text-lg text-[#9ca3af] leading-relaxed space-y-6 font-light">
              <p>
                Saudi businesses evaluating development partners face a clear trade-off: local agencies understand the market but charge premium rates (often SAR 150,000+ for basic MVPs), while low-cost freelancers often deliver code without documentation, security standards, or compliance awareness.
              </p>
              <p>
                AbuQitmirLabs operates as an institutional engineering partner with a hybrid model. You get direct developer communication via Slack or Teams, fixed-price sprints with milestone-based deliverables, and full IP ownership. Our Karachi headquarters operates in AST/PKT overlap, enabling real-time collaboration.
              </p>
              <p className="p-6 rounded-2xl bg-black border border-white/10 text-sm text-gray-300">
                <strong className="text-white block mb-1">What About Saudization and Nitaqat Requirements?</strong>
                These regulations govern local hiring ratios for businesses operating within the Kingdom. They do not restrict the use of offshore engineering partners for software development. We work alongside your local team to ensure architecture and deliverables align with your compliance obligations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-32 px-6 md:px-10 bg-[#050706]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-mono text-[#10b981] uppercase tracking-[0.3em] block mb-4">// FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight">
              Saudi Market Tech FAQs
            </h2>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="border border-white/5 bg-black/60 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#10b981]/30"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-8 text-left flex justify-between items-center gap-6"
                  aria-expanded={activeFaq === index}
                >
                  <span className="text-xl md:text-2xl font-bold text-white tracking-tight">{faq.q}</span>
                  <span className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform ${activeFaq === index ? 'rotate-45 text-[#10b981]' : 'text-gray-400'}`}>
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
              <h4 className="text-xs font-mono text-[#10b981] uppercase tracking-[0.3em] font-bold mb-4">// RELATED SERVICES &amp; TECHNICAL DEEP DIVES</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <Link to="/custom-software" className="p-3 bg-[#0b0e0c] hover:bg-white/5 rounded-lg text-[#8d9b93] hover:text-[#10b981] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Custom Software</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#10b981]" />
                </Link>
                <Link to="/ai-agent-development" className="p-3 bg-[#0b0e0c] hover:bg-white/5 rounded-lg text-[#8d9b93] hover:text-[#10b981] transition-colors border border-white/5 flex items-center justify-between">
                  <span>AI Agent Systems</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#10b981]" />
                </Link>
                <Link to="/local-seo-for-small-business" className="p-3 bg-[#0b0e0c] hover:bg-white/5 rounded-lg text-[#8d9b93] hover:text-[#10b981] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Local SEO Services</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#10b981]" />
                </Link>
                <Link to="/web-development" className="p-3 bg-[#0b0e0c] hover:bg-white/5 rounded-lg text-[#8d9b93] hover:text-[#10b981] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Web Development</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#10b981]" />
                </Link>
                <Link to="/seo-mastery" className="p-3 bg-[#0b0e0c] hover:bg-white/5 rounded-lg text-[#8d9b93] hover:text-[#10b981] transition-colors border border-white/5 flex items-center justify-between">
                  <span>SEO Mastery</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#10b981]" />
                </Link>
                <Link to="/mobile-app-development" className="p-3 bg-[#0b0e0c] hover:bg-white/5 rounded-lg text-[#8d9b93] hover:text-[#10b981] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Mobile App Dev</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#10b981]" />
                </Link>
                <Link to="/case-studies/tajweedpage" className="p-3 bg-[#0b0e0c] hover:bg-white/5 rounded-lg text-[#8d9b93] hover:text-[#10b981] transition-colors border border-white/5 flex items-center justify-between">
                  <span>TajweedPage Case Study</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#10b981]" />
                </Link>
                <Link to="/contact" className="p-3 bg-[#0b0e0c] hover:bg-white/5 rounded-lg text-[#8d9b93] hover:text-[#10b981] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Book KSA Consultation</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#10b981]" />
                </Link>
              </div>
            </div>

            {/* External Regulatory & Tech Standards Links */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#7d8c83]">
              <span className="uppercase tracking-widest text-[11px] font-bold text-zinc-400">Saudi Regulatory References:</span>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://sdaia.gov.sa" target="_blank" rel="noopener noreferrer" className="hover:text-[#10b981] transition-colors inline-flex items-center gap-1">
                  SDAIA PDPL Regulations <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://zatca.gov.sa" target="_blank" rel="noopener noreferrer" className="hover:text-[#10b981] transition-colors inline-flex items-center gap-1">
                  ZATCA Fatoora Framework <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://nca.gov.sa" target="_blank" rel="noopener noreferrer" className="hover:text-[#10b981] transition-colors inline-flex items-center gap-1">
                  NCA Essential Cybersecurity Controls <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Cinematic Call to Action */}
      <section className="py-44 relative border-t border-white/5 overflow-hidden text-center bg-black">
        <div className="absolute inset-0 bg-[#10b981]/10 blur-[200px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 px-6">
          <h2 className="text-6xl md:text-[8rem] font-black text-white italic tracking-tighter uppercase leading-[0.85] mb-14">
            Scale Saudi <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #10b981' }}>Vision 2030.</span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <Link 
              to="/contact"
              className="bg-[#10b981] text-black text-2xl font-bold px-16 py-8 rounded-full hover:bg-white transition-all transform hover:scale-105 uppercase tracking-tighter shadow-2xl shadow-[#10b981]/30"
            >
              Book a free Saudi Arabia consultation
            </Link>
            <div className="text-[#34d399] font-mono text-xs uppercase tracking-[0.4em] max-w-[320px] text-left border-l-2 border-[#10b981] pl-8 leading-relaxed h-16 flex items-center">
              RIYADH &amp; JEDDAH OVERLAP // AST (UTC+3) READY
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SaudiArabiaMarketPage;

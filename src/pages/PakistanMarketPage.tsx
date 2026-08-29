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
  Globe2,
  ChevronRight,
  ExternalLink,
  CreditCard,
  Building2,
  FileText,
  BadgeDollarSign
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import { AnimatedShinyText } from '../components/ui/animated-shiny-text';
import { AnimatedBreathingText } from '../components/ui/animated-breathing-text';
import { MagicText } from '../components/ui/magic-text';

const PakistanMarketPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const pricingTiers = [
    {
      name: "SME Digital Launch / MVP",
      pkrPrice: "PKR 450,000",
      usdPrice: "~$1,600 USD",
      timeline: "3–4 Weeks",
      target: "Early-stage Pakistani startups & local retail/service businesses",
      deliverables: [
        "High-Speed Jamstack Web Application (React / Vite)",
        "Mobile-first responsive UX optimized for 3G/4G bandwidth",
        "Local Payment Gateway Integration (JazzCash / EasyPaisa / Safepay)",
        "On-page Technical SEO & Google Business Profile setup",
        "Source Code handover & 30 days direct WhatsApp support"
      ]
    },
    {
      name: "Enterprise Web & Mobile Solution",
      pkrPrice: "PKR 1,250,000",
      usdPrice: "~$4,500 USD",
      timeline: "6–8 Weeks",
      target: "Established companies, B2B distributors, and scaling logistics",
      deliverables: [
        "Custom Cross-Platform Mobile App (Flutter / React Native)",
        "Multi-role Admin Dashboard & Real-time Inventory Management",
        "Raast P2M / 1LINK PayFast automated billing integration",
        "Urdu / Roman Urdu Customer Support AI Chatbot assistant",
        "FBR & SRB compliant digital invoicing export features"
      ],
      featured: true
    },
    {
      name: "Autonomous AI & Custom Software",
      pkrPrice: "PKR 2,400,000+",
      usdPrice: "~$8,500+ USD",
      timeline: "8–12 Weeks",
      target: "Fintech, EdTech, Healthcare, and high-volume operations",
      deliverables: [
        "Bespoke Microservices Backend (Node.js / Python / Cloud SQL)",
        "Enterprise LLM & RAG Pipeline with localized business knowledge",
        "SECP data residency & cryptographic security audit readiness",
        "High-availability Cloud deployment on AWS UAE/Bahrain low-latency nodes",
        "Dedicated SLA, in-person sprint reviews in Karachi & ongoing maintenance"
      ]
    }
  ];

  const faqData = [
    {
      q: "How does invoicing and tax compliance (FBR, SRB, PRA) work for local Pakistani clients?",
      a: "We provide official NTN-registered business invoices compliant with the Federal Board of Revenue (FBR) and provincial revenue authorities like Sindh Revenue Board (SRB) and Punjab Revenue Authority (PRA). You can deduct applicable withholding taxes as per current tax laws, and all payments are settled directly in Pakistani Rupees (PKR) through local bank transfer (IBFT/Raast) without international credit card surcharges or foreign exchange conversion fees."
    },
    {
      q: "Can you integrate local Pakistani payment gateways like Raast, JazzCash, Easypaisa, and Safepay?",
      a: "Yes. We have direct, end-to-end integration experience with Pakistan's digital payment ecosystem. We implement instant Raast P2M QR/IBAN payments, JazzCash and Easypaisa mobile wallet APIs, Safepay card processing, and 1LINK PayFast / direct bank integrations. All transactions are protected by end-to-end webhook authentication and idempotent callback handlers to prevent transaction drop-offs."
    },
    {
      q: "What are the regulatory considerations for SECP compliance and data security in Pakistan?",
      a: "For fintech, health, and corporate clients regulated by the Securities and Exchange Commission of Pakistan (SECP) or the State Bank of Pakistan (SBP), we architect systems with strict data protection principles. We implement role-based access control (RBAC), end-to-end encryption at rest and in transit, complete audit logging, and configurable data residency using regional low-latency cloud infrastructure (such as AWS Middle East Bahrain/UAE nodes or verified local hosting)."
    },
    {
      q: "Why should we choose AbuQitmirLabs over low-cost freelancers or generic template agencies in Pakistan?",
      a: "Most local agencies sell bloated, pre-made WordPress templates that load sluggishly on local 3G/4G networks and break during high traffic sales (like 11.11 or Ramadan campaigns). AbuQitmirLabs is a specialized software engineering studio. We build lean, compiled Jamstack architectures and native-speed Flutter applications with clean codebases, test-driven pipelines, zero licensing lock-in, and 100% intellectual property ownership from day one."
    },
    {
      q: "Can we schedule in-person architecture discovery and sprint meetings?",
      a: "Yes. Our core engineering and architecture leadership is headquartered in Karachi. We regularly host in-person technical discovery workshops, UI/UX prototyping reviews, and milestone sprint demos with executive teams in Karachi, as well as on-site client visits across Lahore and Islamabad."
    },
    {
      q: "How do your AI agents handle bilingual communication in Roman Urdu and English?",
      a: "Our conversational AI systems and customer support agents are fine-tuned with customized prompt engineering, retrieval-augmented generation (RAG), and localized dictionaries. They seamlessly understand Roman Urdu, colloquial phrasing, and industry-specific terminology, ensuring your Pakistani customers receive natural, 24/7 automated assistance without awkward machine translations."
    }
  ];

  return (
    <div className="bg-[#090909] text-[#d3c8b8] min-h-screen font-sans selection:bg-[#ff5b36] selection:text-white overflow-x-hidden">
      <Helmet>
        <title>Software Development & Local SEO Agency in Pakistan | AbuQitmirLabs</title>
        <meta name="description" content="Karachi-based engineering studio delivering custom software, mobile apps, local SEO, and AI agents for Pakistani enterprises and SMEs. Transparent PKR pricing & local payment gateway expertise." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/pakistan-market" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Software Development & Local SEO Agency in Pakistan | AbuQitmirLabs" />
        <meta property="og:description" content="Karachi-based engineering studio delivering custom software, mobile apps, local SEO, and AI agents for Pakistani enterprises and SMEs. Transparent PKR pricing & local payment gateway expertise." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/pakistan-market" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Software Development & Local SEO Agency in Pakistan | AbuQitmirLabs" />
        <meta name="twitter:description" content="Karachi-based engineering studio delivering custom software, mobile apps, local SEO, and AI agents for Pakistani enterprises and SMEs. Transparent PKR pricing & local payment gateway expertise." />
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
                "name": "Custom Software & Digital Engineering for Pakistan",
                "description": "Karachi-based engineering studio delivering custom software, mobile apps, local SEO, and AI agents for Pakistani enterprises and SMEs.",
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,91,54,0.06),transparent_40%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_18%,transparent_82%,rgba(255,255,255,0.02))] pointer-events-none"></div>

        <div className="relative mx-auto max-w-7xl w-full">
          <div className="flex flex-col gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.3em] text-[#7d766c]"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[#ff5b36]"></span>
              Karachi • Lahore • Islamabad — Local Engineering Precision
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white uppercase mb-6"
            >
              Software Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5b36] to-[#ff9d85]">For Pakistan's Digital Economy</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-4xl text-lg md:text-xl text-[#9f978a] leading-relaxed font-sans font-light"
            >
              Scaling a business in Pakistan requires more than offshore templates or disconnected freelance code. We provide dedicated software development, high-converting local SEO, and bilingual AI customer automation with direct PKR billing, zero foreign exchange hurdles, and in-person executive collaboration right here in Karachi.
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
                  "Official NTN & PKR Bank Invoicing (No FX Fees)",
                  "Seamless Raast, JazzCash & EasyPaisa Integrations",
                  "In-Person Strategy Meetings (Karachi Headquarters)",
                  "Engineered for Local 3G/4G Mobile Bandwidth",
                  "Roman Urdu & English Conversational AI Support",
                  "SECP & Data Privacy-Conscious Architecture"
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
              className="flex flex-col sm:flex-row gap-6 mt-4"
            >
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ff5b36] hover:bg-white text-white hover:text-black px-12 py-8 rounded-3xl font-black text-lg transition-all transform hover:scale-105 flex flex-col items-center justify-center gap-2 uppercase tracking-tighter shadow-xl"
              >
                <ArrowUpRight size={24} />
                Discuss Your Project (WhatsApp)
              </a>
              <Link 
                to="/case-studies"
                className="border-2 border-white/20 text-[#d3c8b8] px-12 py-8 rounded-3xl font-black text-lg hover:bg-white/5 transition-all uppercase tracking-tighter flex flex-col items-center justify-center gap-2"
              >
                <Smartphone size={24} className="text-[#ff5b36]" />
                Explore Proven Client Work
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Branding Section */}
      <section className="overflow-hidden border-y border-white/5 bg-[#0b0b0b] py-16 md:py-24 text-[#d3c8b8]">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-6xl md:text-9xl font-semibold uppercase tracking-tight opacity-90 italic">
          <span>Digital Pakistan</span> <span className="text-[#ff5b36]">·</span>
          <span>Karachi Engineering</span> <span className="text-[#ff5b36]">·</span>
          <span>Lahore Commerce</span> <span className="text-[#ff5b36]">·</span>
          <span>Islamabad Enterprise</span> <span className="text-[#ff5b36]">·</span>
          <span>Fintech &amp; Raast Ready</span> <span className="text-[#ff5b36]">·</span>
          <span>Bilingual AI Agents</span> <span className="text-[#ff5b36]">·</span>
        </div>
      </section>

      {/* The Local Challenge vs Advantage Section */}
      <section className="py-32 px-6 md:px-10 bg-[#090909] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="sticky top-32">
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#ff5b36] mb-8 block">The Local Advantage</span>
              <AnimatedShinyText 
                text="Why Work with a Karachi-Based Dedicated Studio?" 
                textClassName="text-4xl md:text-7xl"
              />
            </div>
            <div className="space-y-8 text-lg text-[#9f978a] font-light leading-relaxed">
              <p>
                Many expanding Pakistani enterprises find themselves trapped between two problematic extremes: overseas development agencies whose dollar pricing has become prohibitive due to currency depreciation, or low-cost domestic freelancers who disappear halfway through delivery without source documentation or security standards.
              </p>
              <p>
                AbuQitmirLabs operates as an institutional engineering partner. By partnering with a local engineering team, your leadership team gains distinct strategic benefits:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                  <div className="flex items-center gap-3 text-white font-semibold text-base">
                    <BadgeDollarSign className="text-[#ff5b36] w-5 h-5" />
                    Predictable PKR Budgeting
                  </div>
                  <p className="text-sm text-[#7d766c]">
                    Lock in contracts in Pakistani Rupees. Avoid inflation shocks, international credit card transaction markups, and foreign remittance tax complications.
                  </p>
                </div>

                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                  <div className="flex items-center gap-3 text-white font-semibold text-base">
                    <Clock className="text-[#ff5b36] w-5 h-5" />
                    Zero Time Zone Lag
                  </div>
                  <p className="text-sm text-[#7d766c]">
                    Collaborate synchronously during regular Pakistan Standard Time (PKT) hours. Direct phone calls, active WhatsApp channels, and same-day issue resolution.
                  </p>
                </div>

                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                  <div className="flex items-center gap-3 text-white font-semibold text-base">
                    <CreditCard className="text-[#ff5b36] w-5 h-5" />
                    Local Gateway Expertise
                  </div>
                  <p className="text-sm text-[#7d766c]">
                    Native implementations for JazzCash, EasyPaisa, Safepay, PayFast, and instant Raast P2M integrations that minimize cart abandonment.
                  </p>
                </div>

                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                  <div className="flex items-center gap-3 text-white font-semibold text-base">
                    <Users className="text-[#ff5b36] w-5 h-5" />
                    In-Person Strategic Sync
                  </div>
                  <p className="text-sm text-[#7d766c]">
                    Meet face-to-face in Karachi or schedule on-site workshops in Lahore and Islamabad to review architecture diagrams, compliance needs, and product roadmaps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-32 px-6 md:px-10 bg-[#070707] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-32 text-center">
            <span className="text-xs font-mono text-[#ff5b36] uppercase tracking-[0.4em] block mb-6">// LOCAL CAPABILITY SUITE</span>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-white uppercase tracking-tight leading-none">
              Core Engineering Services <br />
              <span className="italic text-[#9f978a] font-light">Custom Built for Pakistani Business Realities</span>
            </h2>
          </div>

          <div className="space-y-40">
            {/* Service 1: Local SEO & Google Maps Visibility */}
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
                  Google Maps Dominance &amp; <br />
                  <span className="italic text-[#9f978a]">High-Intent Local SEO</span>
                </h3>
                <div className="font-sans font-light text-[#9f978a] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    In cities like Karachi, Lahore, and Islamabad, consumer buying journeys begin on Google Maps and localized mobile searches. Whether you run a private healthcare clinic in Clifton, an interior design showroom in Gulberg, or an industrial supply firm in SITE, ranking in the top 3 Google Business Profile map pack generates direct phone calls and qualified walk-in customers.
                  </p>
                  <p>
                    Our localized search campaign covers full profile audit, category alignment, neighborhood-level citation building, review acquisition workflows, and high-performance landing page optimization. By targeting geo-modified keywords and building verified Pakistani business directory citations, we help you capture real local demand instead of wasting marketing spend on untargeted social media boosts.
                  </p>
                  <p>
                    We also support marketing agencies across Pakistan through structured white-label delivery, providing comprehensive monthly ranking verification, citation audit logs, and technical optimization reports under your own agency branding.
                  </p>
                </div>
              </div>

              {/* Visual Card for SEO */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5b36]/10 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#7d766c]">
                      <span>REGIONAL_MAP_PACK_TRACKER</span>
                      <span className="text-[#ccff00] flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#ccff00] animate-pulse" />
                        LIVE STATUS
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "DHA & Clifton (Karachi)", rank: "#1 Rank" },
                        { title: "Gulberg & MM Alam (Lahore)", rank: "#1 Rank" },
                        { title: "Blue Area & F-7 (Islamabad)", rank: "#1 Rank" },
                        { title: "D-Ground (Faisalabad)", rank: "#1 Rank" }
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 border border-white/5 rounded-xl bg-white/[0.01] flex justify-between items-center">
                          <span className="text-xs text-[#9f978a] font-sans font-light">{item.title}</span>
                          <span className="text-[10px] font-mono bg-[#ccff00]/10 text-[#ccff00] px-2.5 py-1 rounded font-bold uppercase">{item.rank}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-white/5 pt-6 text-xs font-mono text-[#7d766c]">
                    <div className="flex justify-between">
                      <span>ORGANIC CALL CONVERSIONS:</span>
                      <span className="text-white font-bold">+240% Inbound Calls</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SCHEMA.ORG GEOGRAPHIC GRAPH:</span>
                      <span className="text-[#ff5b36] font-bold">ACTIVE &amp; VERIFIED</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service 2: Lightweight Custom Web & Mobile Apps */}
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
                  HIGH-SPEED APPLICATION STACK
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Custom Software &amp; Mobile Apps <br />
                  <span className="italic text-[#9f978a]">Engineered for Local Connectivity</span>
                </h3>
                <div className="font-sans font-light text-[#9f978a] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    A slow website or heavy mobile app directly destroys conversions on Pakistani mobile connections. When an e-commerce store or B2B portal takes more than 3 seconds to load on a 4G mobile device, over 50% of visitors abandon the session.
                  </p>
                  <p>
                    We engineer compiled React, Next.js, and Jamstack web applications with static pre-rendering, edge CDN caching, and compressed asset pipelines. On mobile, we develop unified Flutter and React Native codebases that deliver 60fps performance on budget Android smartphones as smoothly as on flagship iPhones.
                  </p>
                  <p>
                    Whether building a custom ERP for textile manufacturing, a real-time booking portal for private clinics, or a multi-vendor marketplace with automated Raast and JazzCash payouts, our software is engineered for high concurrency, rock-solid security, and simple maintenance.
                  </p>
                </div>
              </div>

              {/* Visual Card for SME Apps */}
              <div className="lg:col-span-5 lg:order-1 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/40 border border-white/5 backdrop-blur-md overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/40 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#7d766c]">
                      <span>SYSTEM_PERFORMANCE_AUDIT</span>
                      <span className="text-blue-400 flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                        SUB-SECOND LCP
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "Mobile Bundle Size", value: "< 1.4 MB" },
                        { title: "Core Web Vitals Pass Rate", value: "100% Score" },
                        { title: "Local Gateway Latency", value: "< 240ms" },
                        { title: "Offline Data Synchronization", value: "ENABLED" }
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 border border-white/5 rounded-xl bg-white/[0.01] flex justify-between items-center">
                          <span className="text-xs text-[#9f978a] font-sans font-light">{item.title}</span>
                          <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-bold uppercase">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-white/5 pt-6 text-xs font-mono text-[#7d766c]">
                    <div className="flex justify-between">
                      <span>INFRASTRUCTURE TIERS:</span>
                      <span className="text-white">AWS Bahrain / UAE Low-Latency Nodes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>INTELLECTUAL PROPERTY:</span>
                      <span className="text-[#ff5b36] font-bold">100% Client Codebase Ownership</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Transparency Section (PKR + USD) */}
      <section className="py-32 px-6 md:px-10 bg-[#0b0b0b] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <span className="text-xs font-mono text-[#ff5b36] uppercase tracking-[0.4em] block mb-4">// TRANSPARENT PKR &amp; USD RATES</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-white uppercase tracking-tight">
              Honest Engineering Investment Tiers
            </h2>
            <p className="text-[#8d8579] text-base md:text-lg max-w-3xl mx-auto mt-4 font-light">
              Clear scope, fixed-milestone pricing in Pakistani Rupees, and zero surprise hourly billing. All packages include official NTN invoices and complete source code handover.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, idx) => (
              <div 
                key={idx}
                className={`p-10 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                  tier.featured 
                    ? 'border-[#ff5b36] bg-[#ff5b36]/[0.03] shadow-[0_0_50px_rgba(255,91,54,0.1)] relative' 
                    : 'border-white/10 bg-[#0d0d0d] hover:border-white/20'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ff5b36] text-white text-[10px] font-mono font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                    Most Popular for Growing Businesses
                  </div>
                )}
                <div>
                  <div className="text-xs font-mono text-[#7d766c] uppercase tracking-widest mb-2">{tier.timeline} Delivery</div>
                  <h3 className="text-2xl font-serif text-white uppercase tracking-tight mb-4">{tier.name}</h3>
                  <p className="text-xs text-[#8d8579] font-light leading-relaxed mb-6">{tier.target}</p>
                  
                  <div className="border-y border-white/5 py-6 mb-8">
                    <div className="text-3xl md:text-4xl font-bold text-white font-mono">{tier.pkrPrice}</div>
                    <div className="text-xs font-mono text-[#ff5b36] mt-1">{tier.usdPrice} equivalent for overseas settlement</div>
                  </div>

                  <div className="space-y-3 mb-10">
                    <div className="text-xs font-mono uppercase text-zinc-400 font-bold tracking-wider mb-2">Included Deliverables:</div>
                    {tier.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#9f978a] font-light leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#ff5b36] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a 
                  href="https://wa.me/923233260859" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 ${
                    tier.featured 
                      ? 'bg-[#ff5b36] text-white hover:bg-white hover:text-black' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <ArrowUpRight size={16} />
                  Request Scope &amp; Proposal
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 md:px-10 bg-[#090909]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20 text-center">
            <span className="text-[#ff5b36] font-mono text-xs uppercase tracking-[0.5em] block mb-4">PAKISTAN REGULATORY &amp; TECHNICAL FAQ</span>
            <AnimatedShinyText 
              text="Clear Answers for Pakistani Founders &amp; Executives." 
              textClassName="text-3xl md:text-6xl"
            />
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-white/5 bg-[#0b0b0b] p-8 cursor-pointer hover:border-[#ff5b36]/20 transition-all rounded-2xl"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg md:text-xl font-bold text-white uppercase tracking-tight pr-6">{faq.q}</span>
                  <div className={`transition-transform duration-500 shrink-0 ${activeFaq === idx ? 'rotate-[135deg] text-[#ff5b36]' : 'text-[#7d766c]'}`}>
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
                      <p className="pt-6 text-base md:text-lg text-[#8d8579] font-light leading-relaxed border-t border-white/5 mt-6">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Quick Hub Navigation & Regulatory Links */}
          <div className="mt-20 pt-12 border-t border-white/5 space-y-8 text-left">
            <div>
              <h4 className="text-xs font-mono text-[#ff5b36] uppercase tracking-[0.3em] font-bold mb-4">// PAKISTAN SERVICE EXPLORER</h4>
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
                  <span>Urdu AI Agents</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
                <Link to="/seo-mastery" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#ff5b36] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Technical SEO</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
                <Link to="/local-seo-for-small-business" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#ff5b36] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Local SEO Maps</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
                <Link to="/case-studies" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#ff5b36] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Case Studies</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
                <Link to="/contact" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#ff5b36] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Book Local Consultation</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ff5b36]" />
                </Link>
              </div>
            </div>

            {/* External Regulatory & Tech Standards Links */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#7d766c]">
              <span className="uppercase tracking-widest text-[11px] font-bold text-zinc-400">Pakistan Regulatory Frameworks:</span>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://www.fbr.gov.pk/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5b36] transition-colors inline-flex items-center gap-1">
                  Federal Board of Revenue (FBR) <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://www.secp.gov.pk/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5b36] transition-colors inline-flex items-center gap-1">
                  SECP Corporate Compliance <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://www.sbp.org.pk/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff5b36] transition-colors inline-flex items-center gap-1">
                  State Bank of Pakistan (SBP Raast) <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-48 relative border-t border-white/5 overflow-hidden text-center bg-black">
        <div className="absolute inset-0 bg-[#ff5b36]/5 blur-[200px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10 px-6">
          <AnimatedShinyText 
            text="Elevate Your Digital Infrastructure." 
            textClassName="text-6xl md:text-[8rem] text-white"
          />
          
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center mt-12">
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black text-xl font-bold px-14 py-7 rounded-full hover:bg-[#ff5b36] hover:text-white transition-all transform hover:scale-105 uppercase tracking-tighter shadow-2xl"
            >
               Connect on WhatsApp
            </a>
            <div className="text-[#7d766c] font-mono text-[11px] uppercase tracking-[0.3em] max-w-[320px] text-left border-l-2 border-white/10 pl-8 leading-relaxed">
               KARACHI HEADQUARTERS // ZERO FX SURCHARGES // OFFICIAL TAX INVOICES
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PakistanMarketPage;

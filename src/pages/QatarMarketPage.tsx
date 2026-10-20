import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Plus, 
  Cpu, 
  Search,
  Code,
  Smartphone,
  ChevronRight,
  ExternalLink,
  Landmark,
  CreditCard,
  Lock,
  Database,
  BarChart3,
  CheckCircle2,
  Sparkles,
  Bot,
  Layers,
  Building2,
  Stethoscope,
  ShoppingBag,
  Calculator,
  Gauge
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import HeroText from '../components/ui/hero-shutter-text';
import { AnimatedShinyText } from '../components/ui/animated-shiny-text';
import { AnimatedBreathingText } from '../components/ui/animated-breathing-text';
import { MagicText } from '../components/ui/magic-text';

const QatarMarketPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqData = [
    {
      q: "What makes an AI consulting company in Qatar compliant with local data laws?",
      a: "An enterprise AI consulting company in Qatar must adhere strictly to the National Cyber Security Agency (NCSA) frameworks and Qatar PDPPL Law No. 13 on personal data protection. At AbuQitmirLabs, we design private cloud topologies, on-premise vector embeddings, and zero-data-retention pipelines ensuring proprietary Doha corporate data and government records remain within sovereign Qatari boundaries."
    },
    {
      q: "How does conversational AI and chatbot development handle Gulf Arabic dialects in Doha?",
      a: "Our conversational AI consultancy in Doha builds custom linguistic models fine-tuned on Qatari and Khaleeji (Gulf Arabic) vernacular as well as Modern Standard Arabic (MSA) and English. These chatbots support multi-turn conversational memory, intelligent code-switching between Arabic and English, and seamless fallback to human concierge agents across WhatsApp and web portals."
    },
    {
      q: "What is the typical timeline and cost for custom software and web development in Qatar?",
      a: "A focused enterprise MVP or custom web application typically deploys within 8 to 12 weeks. High-throughput platforms, multi-agent orchestration systems, or QFC-grade fintech pipelines range between $20,000 to $90,000 USD. You can calculate precise architectural estimates instantly using our Project Cost Estimator Tool."
    },
    {
      q: "Can AbuQitmirLabs integrate QFC-compliant fintech rails and Qatari payment gateways?",
      a: "Yes. We engineer compliant financial technology integrating regional gateways such as QPAY, SkipCash, and Dibsy, paired with automated AML/KYC workflows, transaction monitoring, and immutable audit logs that comply with Qatar Financial Centre (QFC) Regulatory Authority and Qatar Central Bank (QCB) standards."
    },
    {
      q: "How does bilingual local SEO help businesses in West Bay and Lusail dominate search?",
      a: "Doha consumers and B2B buyers search in both Arabic and English with high intent. By building dual-language technical architecture, localized Schema.org markup, and geo-targeted landing pages for districts like West Bay, The Pearl, and Lusail City, businesses capture low-competition Arabic SERPs and high-converting English keywords simultaneously."
    }
  ];

  return (
    <div className="bg-[#070609] text-[#ded8e2] min-h-screen font-sans selection:bg-[#f43f5e] selection:text-white">
      <Helmet>
        <title>AI Consulting Qatar & AI Agency Doha | AbuQitmirLabs</title>
        <meta name="description" content="Premier AI consulting in Qatar & AI agency Doha. We engineer conversational chatbots, custom web development & mobile apps for QNV 2030." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/qatar-market" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Consulting Qatar & AI Agency Doha | AbuQitmirLabs" />
        <meta property="og:description" content="Premier AI consulting in Qatar & AI agency Doha. We engineer conversational chatbots, custom web development & mobile apps for QNV 2030." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/qatar-market" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Consulting Qatar & AI Agency Doha | AbuQitmirLabs" />
        <meta name="twitter:description" content="Premier AI consulting in Qatar & AI agency Doha. We engineer conversational chatbots, custom web development & mobile apps for QNV 2030." />
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
                    "name": "Qatar Market",
                    "item": "https://www.abuqitmirlabs.tech/qatar-market"
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "AbuQitmirLabs - AI Consulting & Software Engineering Qatar",
                "description": "Leading AI agency and software engineering firm in Doha, delivering conversational AI chatbots, custom web development, and mobile app engineering aligned with Qatar National Vision 2030 and TASMU.",
                "url": "https://www.abuqitmirlabs.tech/qatar-market",
                "telephone": "+923233260859",
                "priceRange": "$$$$",
                "image": "https://www.abuqitmirlabs.tech/logo.png",
                "areaServed": ["QA", "Doha", "Lusail", "Al Rayyan", "West Bay"],
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Doha",
                  "addressCountry": "QA"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "AI Consulting & Custom Software Engineering Qatar",
                "description": "Bespoke AI consulting, conversational chatbot development, custom web development, and mobile applications for enterprises across Doha, Lusail, and Qatar.",
                "provider": {
                  "@type": "Organization",
                  "name": "AbuQitmirLabs",
                  "url": "https://www.abuqitmirlabs.tech"
                },
                "areaServed": "QA"
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.08),transparent_40%),linear-gradient(to_bottom,rgba(244,63,94,0.02),transparent_25%,transparent_80%,rgba(244,63,94,0.03))] pointer-events-none" />
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#f43f5e]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-rose-900/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative mx-auto max-w-7xl w-full">
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.35em] text-[#f43f5e]"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[#f43f5e] animate-pulse" />
              State of Qatar // QNV 2030 &amp; TASMU Smart Country Framework
            </motion.div>

            <div className="mb-4">
              <HeroText text="QATAR TECH HUB" />
            </div>

            {/* H1 Title as strictly requested */}
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] text-white uppercase mb-8"
            >
              AI Consulting Qatar &amp; AI Agency Doha | <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f43f5e] via-[#fb7185] to-[#fecdd3]">
                Custom Web &amp; Mobile App Development
              </span>
            </motion.h1>

            {/* Quick Takeaways / GEO Direct Answer Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="max-w-4xl p-8 rounded-2xl bg-gradient-to-br from-rose-950/30 to-black border border-[#f43f5e]/30 backdrop-blur-md shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#f43f5e] uppercase tracking-widest mb-4">
                <Sparkles size={16} />
                Executive Summary // Direct Answer for AI Overviews
              </div>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal mb-4">
                AbuQitmirLabs is a specialized technology consultancy delivering high-tier <strong>AI consulting in Qatar</strong> and serving as an elite <strong>AI agency in Doha</strong>. We architect sovereign, NCSA-compliant <Link to="/ai-agent-development" className="text-[#fb7185] underline hover:text-white transition-colors">Custom AI Agents</Link>, bilingual Khaleeji chatbots, institutional <Link to="/custom-software" className="text-[#fb7185] underline hover:text-white transition-colors">Custom Software</Link>, and scalable <Link to="/web-development" className="text-[#fb7185] underline hover:text-white transition-colors">Custom Web Development</Link> and <Link to="/mobile-app-development" className="text-[#fb7185] underline hover:text-white transition-colors">Mobile App Development</Link> tailored for the Qatar National Vision 2030 (QNV 2030) and TASMU Smart Qatar ecosystem.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono text-gray-300 border-t border-white/10 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#f43f5e] shrink-0" />
                  <span>Sovereign NCSA &amp; PDPPL Data Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#f43f5e] shrink-0" />
                  <span>Bilingual Gulf Arabic &amp; English LLM Fine-Tuning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#f43f5e] shrink-0" />
                  <span>QFC Regulatory &amp; QCB Sandbox Readiness</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#f43f5e] shrink-0" />
                  <span>Doha, Lusail City &amp; West Bay Municipal Coverage</span>
                </div>
              </div>
            </motion.div>

            {/* Authoritative Opening Hook */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-4xl text-lg md:text-xl text-[#9ca3af] leading-relaxed font-sans font-light"
            >
              As the State of Qatar transitions from monumental FIFA World Cup infrastructure investments to an advanced knowledge-based digital economy under the <strong>Qatar National Vision 2030 (QNV 2030)</strong> and the Ministry of Communications and Information Technology’s <strong>TASMU Smart Qatar</strong> initiative, institutional demand for specialized <strong>ai consulting companies in Qatar</strong> has reached unprecedented velocity. As an established <strong>conversational ai consultancy in Doha</strong> and high-performance digital engineering studio, AbuQitmirLabs builds the digital engines driving Qatar’s premier financial institutions, healthcare operators, logistics enterprises, and government contractors.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-5 mt-4"
            >
              <Link 
                to="/tools/ai-readiness-score"
                className="bg-[#f43f5e] text-white px-8 py-5 rounded-2xl font-bold text-base hover:bg-white hover:text-black hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[#f43f5e]/30 uppercase tracking-tight"
              >
                <Gauge size={20} />
                Get a Free AI Readiness Assessment
              </Link>
              <Link 
                to="/tools/project-cost-estimator"
                className="border border-white/10 text-[#d1d5db] px-8 py-5 rounded-2xl font-bold text-base hover:bg-white/5 transition-all flex items-center justify-center gap-3 uppercase tracking-tight"
              >
                <Calculator size={20} className="text-[#f43f5e]" />
                Project Cost Estimator Tool
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Branding */}
      <section className="overflow-hidden border-y border-white/5 bg-[#09070c] py-14">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-4xl md:text-7xl font-semibold uppercase tracking-tight opacity-90 italic">
          <span>AI Consulting Qatar</span> <span className="text-[#f43f5e]">·</span>
          <span>Conversational AI Doha</span> <span className="text-[#f43f5e]">·</span>
          <span>Chatbot Development Qatar</span> <span className="text-[#f43f5e]">·</span>
          <span>Custom Web Development</span> <span className="text-[#f43f5e]">·</span>
          <span>Mobile App Development Doha</span> <span className="text-[#f43f5e]">·</span>
          <span>QNV 2030 &amp; TASMU Aligned</span> <span className="text-[#f43f5e]">·</span>
        </div>
      </section>

      {/* Why Choose Us Comparison Table Section */}
      <section className="py-28 px-6 md:px-10 border-b border-white/5 bg-[#050407]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#f43f5e] mb-4 block">// STRATEGIC COMPARISON</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
              Why Choose Us: Enterprise Tech Delivery in Qatar
            </h2>
            <p className="mt-4 text-[#9ca3af] text-sm md:text-base font-light">
              How our specialized engineering and advisory practices compare against generic agencies across the Gulf.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/60 shadow-2xl">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-xs font-mono text-[#fb7185] uppercase tracking-wider">
                  <th className="p-5 md:p-6">Engineering Service</th>
                  <th className="p-5 md:p-6">Standard Agency Approach</th>
                  <th className="p-5 md:p-6 text-white font-bold bg-[#f43f5e]/10">AbuQitmirLabs Qatar Delivery</th>
                  <th className="p-5 md:p-6">Qatar Enterprise Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-light text-[#ded8e2]">
                <tr className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-5 md:p-6 font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <Cpu size={18} className="text-[#f43f5e] shrink-0" />
                      <span>AI Consulting &amp; Automation</span>
                    </div>
                    <span className="text-xs text-[#9ca3af] block font-mono mt-1">ai consulting qatar</span>
                  </td>
                  <td className="p-5 md:p-6 text-[#9ca3af]">Generic wrappers around public APIs without data residency.</td>
                  <td className="p-5 md:p-6 bg-[#f43f5e]/5 font-normal text-white">
                    Sovereign private cloud architectures, enterprise vector databases, and NCSA security control alignment.
                  </td>
                  <td className="p-5 md:p-6 text-[#fb7185] font-mono text-xs">
                    Automates up to 80% of institutional audit workflows with zero data leaks.
                  </td>
                </tr>

                <tr className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-5 md:p-6 font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <Bot size={18} className="text-[#f43f5e] shrink-0" />
                      <span>Chatbot Development Qatar</span>
                    </div>
                    <span className="text-xs text-[#9ca3af] block font-mono mt-1">conversational ai consultant doha</span>
                  </td>
                  <td className="p-5 md:p-6 text-[#9ca3af]">Rigid, rule-based if/else scripts incapable of Arabic nuance.</td>
                  <td className="p-5 md:p-6 bg-[#f43f5e]/5 font-normal text-white">
                    Bilingual Khaleeji/Modern Standard Arabic (MSA) conversational AI with multi-turn memory and ERP/CRM sync.
                  </td>
                  <td className="p-5 md:p-6 text-[#fb7185] font-mono text-xs">
                    24/7 customer engagement in native Qatari dialects across WhatsApp and portals.
                  </td>
                </tr>

                <tr className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-5 md:p-6 font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <Code size={18} className="text-[#f43f5e] shrink-0" />
                      <span>Custom Software Engineering</span>
                    </div>
                    <span className="text-xs text-[#9ca3af] block font-mono mt-1">custom software doha</span>
                  </td>
                  <td className="p-5 md:p-6 text-[#9ca3af]">Bloated off-the-shelf templates with recurring license overhead.</td>
                  <td className="p-5 md:p-6 bg-[#f43f5e]/5 font-normal text-white">
                    Bespoke microservices, QFC-grade compliance engines, and event-driven architectures you own completely.
                  </td>
                  <td className="p-5 md:p-6 text-[#fb7185] font-mono text-xs">
                    Sub-second response times, zero vendor lock-in, and 100% intellectual property ownership.
                  </td>
                </tr>

                <tr className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-5 md:p-6 font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <Smartphone size={18} className="text-[#f43f5e] shrink-0" />
                      <span>Custom Web &amp; Mobile App Dev</span>
                    </div>
                    <span className="text-xs text-[#9ca3af] block font-mono mt-1">mobile app development qatar</span>
                  </td>
                  <td className="p-5 md:p-6 text-[#9ca3af]">Cookie-cutter hybrid apps prone to lag and broken RTL layouts.</td>
                  <td className="p-5 md:p-6 bg-[#f43f5e]/5 font-normal text-white">
                    High-performance React/Next.js and Flutter platforms with native QAR payment rails (SkipCash, QPAY).
                  </td>
                  <td className="p-5 md:p-6 text-[#fb7185] font-mono text-xs">
                    Sub-100ms Core Web Vitals, 99.99% uptime, and frictionless mobile checkouts.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Core Services Section (H2) */}
      <section className="py-32 px-6 md:px-10 border-b border-white/5 bg-[#08060b]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <span className="text-xs font-mono text-[#f43f5e] uppercase tracking-[0.4em] block mb-4">// CORE CAPABILITIES</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-white uppercase tracking-tight">
              Enterprise Engineering Services in Qatar
            </h2>
            <p className="mt-4 text-[#9ca3af] max-w-2xl mx-auto text-base font-light">
              Engineered by our senior technical strategists to meet the stringent demands of Doha’s most forward-thinking enterprises.
            </p>
          </div>

          <div className="space-y-32">
            {/* Core Service 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3 text-xs font-mono text-[#f43f5e] uppercase tracking-widest">
                  <span className="w-8 h-px bg-[#f43f5e]" />
                  <span>PILLAR 01 // ADVISORY &amp; AUTOMATION</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">
                  1. AI Consulting &amp; Automation (AI Agency Qatar)
                </h2>
                <div className="text-[#9ca3af] space-y-4 font-light text-base md:text-lg leading-relaxed">
                  <p>
                    As a recognized <strong>ai agency in Qatar</strong>, AbuQitmirLabs guides executive leadership teams, family offices, and sovereign-backed enterprises through the complete artificial intelligence lifecycle. Our <strong>ai consultants in Qatar</strong> cut through industry hyperbole, developing deterministic roadmaps that link advanced machine intelligence directly to EBITDA expansion and labor productivity.
                  </p>
                  <p>
                    Through our deep expertise in <Link to="/ai-agent-development" className="text-[#fb7185] underline font-medium hover:text-white transition-colors">Custom AI Agents</Link>, we build autonomous multi-agent pipelines that orchestrate complex business logic. From automated document analysis in compliance departments to predictive telemetry for maritime and energy operators, our <strong>ai automation tools in Qatar</strong> function with mathematical precision while respecting sovereign data privacy mandates under NCSA guidelines.
                  </p>
                  <p>
                    Whether engaging our <strong>ai consultant in Doha</strong> for enterprise architecture reviews or hiring our full development pod, we ensure that every model deployment aligns with your technical governance standards.
                  </p>
                </div>
                <div className="pt-4 flex flex-wrap gap-3">
                  <Link 
                    to="/tools/ai-readiness-score" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#f43f5e]/40 text-xs font-mono text-white transition-colors"
                  >
                    <span>Assess Organization AI Score</span>
                    <ChevronRight size={14} className="text-[#f43f5e]" />
                  </Link>
                  <Link 
                    to="/solutions/fintech" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#f43f5e]/40 text-xs font-mono text-white transition-colors"
                  >
                    <span>Fintech Automation Systems</span>
                    <ChevronRight size={14} className="text-[#f43f5e]" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 rounded-3xl bg-zinc-950/80 border border-[#f43f5e]/20 shadow-2xl relative">
                <div className="text-xs font-mono text-[#fb7185] uppercase tracking-wider mb-6 flex justify-between items-center border-b border-white/10 pb-4">
                  <span>AI_CONSULTANCY_SPECIFICATION</span>
                  <span className="flex items-center gap-1 text-[#f43f5e]">
                    <span className="w-2 h-2 rounded-full bg-[#f43f5e] animate-ping" />
                    DOHA_ONLINE
                  </span>
                </div>
                <ul className="space-y-4 text-xs font-mono text-gray-300">
                  <li className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#f43f5e] shrink-0 mt-0.5" />
                    <span><strong>Sovereign RAG Engineering:</strong> Enterprise retrieval-augmented generation anchored strictly in Qatari private clouds.</span>
                  </li>
                  <li className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#f43f5e] shrink-0 mt-0.5" />
                    <span><strong>Agentic Workflow Automation:</strong> Deterministic LangChain and LlamaIndex agents replacing manual verification tasks.</span>
                  </li>
                  <li className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#f43f5e] shrink-0 mt-0.5" />
                    <span><strong>Executive AI Roadmapping:</strong> Rigorous feasibility and ROI modeling conducted by an experienced <strong>ai consultant in Doha</strong>.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Core Service 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-white/5 pt-28">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3 text-xs font-mono text-[#f43f5e] uppercase tracking-widest">
                  <span className="w-8 h-px bg-[#f43f5e]" />
                  <span>PILLAR 02 // CONVERSATIONAL SYSTEMS</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">
                  2. Conversational AI &amp; Chatbot Development Qatar
                </h2>
                <div className="text-[#9ca3af] space-y-4 font-light text-base md:text-lg leading-relaxed">
                  <p>
                    Modern consumers in Doha, Lusail, and West Bay demand immediate, intelligent, and context-aware interaction. Legacy rule-based bots that fail at the first misspelled Arabic query frustrate high-net-worth users. As a leading <strong>conversational ai consultancy in Doha</strong>, AbuQitmirLabs specializes in state-of-the-art <strong>chatbot development in Qatar</strong>.
                  </p>
                  <p>
                    Our linguistic engineering accounts for the rich nuances of Gulf Arabic, colloquial Qatari phrasing, and fluid switching between Arabic and English within a single chat session. Operating as an authoritative <strong>conversational ai consultant in Qatar</strong>, we embed conversational agents directly into WhatsApp Business API, bespoke mobile apps, and institutional web portals.
                  </p>
                  <p>
                    These intelligent agents are not just chat widgets; they connect bidirectionally to enterprise ERP, CRM, and banking core ledgers to process bookings, issue statements, verify KYC documentation, and execute transactions securely.
                  </p>
                </div>
                <div className="pt-4 flex flex-wrap gap-3">
                  <Link 
                    to="/local-seo-for-small-business" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#f43f5e]/40 text-xs font-mono text-white transition-colors"
                  >
                    <span>Local SEO for Small Business</span>
                    <ChevronRight size={14} className="text-[#f43f5e]" />
                  </Link>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#f43f5e]/40 text-xs font-mono text-white transition-colors"
                  >
                    <span>Book Conversational AI Demo</span>
                    <ChevronRight size={14} className="text-[#f43f5e]" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 rounded-3xl bg-zinc-950/80 border border-[#f43f5e]/20 shadow-2xl relative">
                <div className="text-xs font-mono text-[#fb7185] uppercase tracking-wider mb-6 flex justify-between items-center border-b border-white/10 pb-4">
                  <span>LINGUISTIC_MATRIX_ARABIC</span>
                  <span className="text-white font-bold">KHALEEJI + MSA</span>
                </div>
                <div className="space-y-3 text-xs font-mono text-gray-300">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[#fb7185] block font-bold mb-1">WhatsApp Business Cloud API:</span>
                    <span>Direct integration enabling Doha consumers to purchase, book, and query directly from WhatsApp.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[#fb7185] block font-bold mb-1">Human-in-the-Loop Handover:</span>
                    <span>Smooth conversational escalation to human concierge or VIP relationship managers when intent thresholds trigger.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[#fb7185] block font-bold mb-1">Autonomous Transaction Actions:</span>
                    <span>Live integration with PostgreSQL, SAP, Salesforce, and banking ledger protocols.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Service 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-white/5 pt-28">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3 text-xs font-mono text-[#f43f5e] uppercase tracking-widest">
                  <span className="w-8 h-px bg-[#f43f5e]" />
                  <span>PILLAR 03 // FULL-STACK DIGITAL PLATFORMS</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">
                  3. Custom Web &amp; Mobile App Development Qatar
                </h2>
                <div className="text-[#9ca3af] space-y-4 font-light text-base md:text-lg leading-relaxed">
                  <p>
                    Pre-packaged templates, slow WordPress instances, and brittle hybrid app wrappers fail when tested against the high expectations of Qatari digital consumers. AbuQitmirLabs engineers high-performance <Link to="/web-development" className="text-[#fb7185] underline font-medium hover:text-white transition-colors">Custom Web Development</Link> solutions built with modern React, Next.js, and TypeScript, delivering sub-second load times and native Right-to-Left (RTL) Arabic typography.
                  </p>
                  <p>
                    In the mobile realm, our studio delivers production-grade <Link to="/mobile-app-development" className="text-[#fb7185] underline font-medium hover:text-white transition-colors">Mobile App Development</Link> in Flutter and native iOS/Android. Every mobile application built for the Qatar territory features seamless integration with local QAR payment rails—including SkipCash, QPAY, and Sadad—alongside biometric authentication, real-time push notification telemetry, and offline-first data caching.
                  </p>
                  <p>
                    For organizations transitioning legacy infrastructure into the cloud, our <Link to="/custom-software" className="text-[#fb7185] underline font-medium hover:text-white transition-colors">Custom Software</Link> engineers construct scalable SaaS platforms, patient management systems, and enterprise portals that comply with Qatari data residency mandates.
                  </p>
                </div>
                <div className="pt-4 flex flex-wrap gap-3">
                  <Link 
                    to="/tools/project-cost-estimator" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#f43f5e]/40 text-xs font-mono text-white transition-colors"
                  >
                    <span>Calculate Custom Build Estimate</span>
                    <ChevronRight size={14} className="text-[#f43f5e]" />
                  </Link>
                  <Link 
                    to="/web-development" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#f43f5e]/40 text-xs font-mono text-white transition-colors"
                  >
                    <span>Explore Web Engineering</span>
                    <ChevronRight size={14} className="text-[#f43f5e]" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 rounded-3xl bg-zinc-950/80 border border-[#f43f5e]/20 shadow-2xl relative">
                <div className="text-xs font-mono text-[#fb7185] uppercase tracking-wider mb-6 flex justify-between items-center border-b border-white/10 pb-4">
                  <span>PRODUCTION_STACK</span>
                  <span className="text-[#f43f5e] font-bold">NEXT.JS + FLUTTER</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono text-gray-300">
                  <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
                    <span className="text-white block font-bold mb-1">Architecture:</span>
                    <span className="text-[#9ca3af]">Headless &amp; Microservices</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
                    <span className="text-white block font-bold mb-1">Speed:</span>
                    <span className="text-[#9ca3af]">Sub-100ms TTFB</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
                    <span className="text-white block font-bold mb-1">Payment:</span>
                    <span className="text-[#9ca3af]">SkipCash &amp; QPAY</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
                    <span className="text-white block font-bold mb-1">Bilingual:</span>
                    <span className="text-[#9ca3af]">Pixel-Perfect Arabic RTL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions (H2) */}
      <section className="py-28 px-6 md:px-10 border-b border-white/5 bg-[#050407]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#f43f5e] mb-4 block">// INDUSTRY SECTOR PLAYBOOKS</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
              Industry Solutions: Tailored for Qatar’s Strategic Sectors
            </h2>
            <p className="mt-4 text-[#9ca3af] text-base font-light">
              Purpose-built software and AI architectures aligned with the specific regulatory and commercial frameworks of Doha.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sector 1: Fintech */}
            <div className="p-8 rounded-3xl bg-zinc-950/60 border border-white/5 hover:border-[#f43f5e]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#f43f5e]/10 border border-[#f43f5e]/20 flex items-center justify-center text-[#f43f5e] mb-6">
                  <Landmark size={24} />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-4">
                  Fintech &amp; QFC-Regulated Entities
                </h3>
                <p className="text-sm text-[#9ca3af] font-light leading-relaxed mb-6">
                  For financial institutions, wealth managers, and payment facilitators governed by the Qatar Financial Centre (QFC) and Qatar Central Bank (QCB). We implement deterministic ledgers, automated KYC/AML onboarding, and real-time transaction surveillance through our dedicated <Link to="/solutions/fintech" className="text-[#fb7185] underline font-medium hover:text-white transition-colors">Industry Solutions (Fintech)</Link> architecture.
                </p>
              </div>
              <ul className="text-xs font-mono text-gray-300 space-y-2 border-t border-white/5 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#f43f5e]" />
                  <span>QFC Regulatory Sandbox Compliance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#f43f5e]" />
                  <span>Automated SAR &amp; STR Audit Reporting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#f43f5e]" />
                  <span>Sub-second Settlement Interfaces</span>
                </li>
              </ul>
            </div>

            {/* Sector 2: Healthcare & Smart Cities */}
            <div className="p-8 rounded-3xl bg-zinc-950/60 border border-white/5 hover:border-[#f43f5e]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#f43f5e]/10 border border-[#f43f5e]/20 flex items-center justify-center text-[#f43f5e] mb-6">
                  <Stethoscope size={24} />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-4">
                  Healthcare &amp; Smart Cities (TASMU)
                </h3>
                <p className="text-sm text-[#9ca3af] font-light leading-relaxed mb-6">
                  Aligned with the Ministry of Communications and Information Technology’s TASMU Smart Qatar initiatives and Ministry of Public Health (MoPH) standards. We engineer HIPAA/MoPH-aligned patient intake chatbots, IoT sensor telemetry platforms for smart districts like Lusail, and clinical appointment scheduling systems.
                </p>
              </div>
              <ul className="text-xs font-mono text-gray-300 space-y-2 border-t border-white/5 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#f43f5e]" />
                  <span>TASMU Smart Country Standards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#f43f5e]" />
                  <span>MoPH Patient Data Sovereignty</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#f43f5e]" />
                  <span>Bilingual Medical Triage Intake</span>
                </li>
              </ul>
            </div>

            {/* Sector 3: E-commerce & Retail */}
            <div className="p-8 rounded-3xl bg-zinc-950/60 border border-white/5 hover:border-[#f43f5e]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#f43f5e]/10 border border-[#f43f5e]/20 flex items-center justify-center text-[#f43f5e] mb-6">
                  <ShoppingBag size={24} />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-4">
                  E-commerce &amp; High-End Retail
                </h3>
                <p className="text-sm text-[#9ca3af] font-light leading-relaxed mb-6">
                  Tailored for luxury retailers, hospitality brands, and marketplace operators in Doha and The Pearl. We build headless commerce experiences that integrate dynamic QAR currency checkout, ERP inventory synchronization, and conversational WhatsApp shopping assistants that drive VIP customer retention.
                </p>
              </div>
              <ul className="text-xs font-mono text-gray-300 space-y-2 border-t border-white/5 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#f43f5e]" />
                  <span>Instant SkipCash &amp; Apple Pay Checkout</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#f43f5e]" />
                  <span>Microsecond ERP Inventory Sync</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#f43f5e]" />
                  <span>Conversational AI Cart Recovery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Standalone FAQ (H2) */}
      <section className="py-32 px-6 md:px-10 bg-[#070609]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-mono text-[#f43f5e] uppercase tracking-[0.3em] block mb-4">// FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight">
              Qatar Market Technology &amp; AI FAQs
            </h2>
            <p className="mt-4 text-[#9ca3af] text-sm md:text-base font-light">
              Direct, concise answers to the most critical technical questions facing Doha founders and enterprise directors.
            </p>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="border border-white/5 bg-black/60 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#f43f5e]/30"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-8 text-left flex justify-between items-center gap-6"
                  aria-expanded={activeFaq === index}
                >
                  <span className="text-lg md:text-xl font-bold text-white tracking-tight">{faq.q}</span>
                  <span className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform ${activeFaq === index ? 'rotate-45 text-[#f43f5e]' : 'text-gray-400'}`}>
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
                      <p className="px-8 pb-8 text-base text-[#9ca3af] font-light leading-relaxed border-t border-white/5 pt-4">
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
              <h4 className="text-xs font-mono text-[#f43f5e] uppercase tracking-[0.3em] font-bold mb-4">// RELATED CAPABILITIES &amp; FREE TOOLS</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <Link to="/ai-agent-development" className="p-3 bg-[#0d0a11] hover:bg-white/5 rounded-lg text-[#9c93a3] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Custom AI Agents</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/custom-software" className="p-3 bg-[#0d0a11] hover:bg-white/5 rounded-lg text-[#9c93a3] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Custom Software</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/web-development" className="p-3 bg-[#0d0a11] hover:bg-white/5 rounded-lg text-[#9c93a3] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Custom Web Dev</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/mobile-app-development" className="p-3 bg-[#0d0a11] hover:bg-white/5 rounded-lg text-[#9c93a3] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Mobile App Dev</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/solutions/fintech" className="p-3 bg-[#0d0a11] hover:bg-white/5 rounded-lg text-[#9c93a3] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Fintech Solutions</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/local-seo-for-small-business" className="p-3 bg-[#0d0a11] hover:bg-white/5 rounded-lg text-[#9c93a3] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Local SEO Services</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/tools/project-cost-estimator" className="p-3 bg-[#0d0a11] hover:bg-white/5 rounded-lg text-[#9c93a3] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Cost Estimator</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/tools/ai-readiness-score" className="p-3 bg-[#0d0a11] hover:bg-white/5 rounded-lg text-[#9c93a3] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>AI Readiness Tool</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
              </div>
            </div>

            {/* External Regulatory References */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#8c8294]">
              <span className="uppercase tracking-widest text-[11px] font-bold text-zinc-400">Qatar Regulatory Ecosystem:</span>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://ncsa.gov.qa" target="_blank" rel="noopener noreferrer" className="hover:text-[#f43f5e] transition-colors inline-flex items-center gap-1">
                  National Cyber Security Agency (NCSA) <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://www.qfc.qa" target="_blank" rel="noopener noreferrer" className="hover:text-[#f43f5e] transition-colors inline-flex items-center gap-1">
                  Qatar Financial Centre (QFC) <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://www.mcit.gov.qa" target="_blank" rel="noopener noreferrer" className="hover:text-[#f43f5e] transition-colors inline-flex items-center gap-1">
                  TASMU Smart Qatar Program <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) */}
      <section className="py-40 relative border-t border-white/5 overflow-hidden text-center bg-black">
        <div className="absolute inset-0 bg-[#f43f5e]/10 blur-[200px] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10 px-6">
          <span className="text-xs font-mono uppercase tracking-[0.4em] text-[#f43f5e] mb-6 block">// STRATEGIC PARTNERSHIP</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white italic tracking-tighter uppercase leading-[0.9] mb-10">
            Accelerate for <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #f43f5e' }}>Qatar Vision 2030.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-[#9ca3af] text-base md:text-lg font-light leading-relaxed mb-12">
            Connect directly with an elite <strong>ai consultant in Doha</strong>. Whether you require sovereign <strong>chatbot development in Qatar</strong>, complex <strong>ai consulting in Qatar</strong>, or bespoke <strong>custom web and mobile app development</strong>, our senior engineering pods are prepared to deploy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/contact"
              className="w-full sm:w-auto bg-[#f43f5e] text-white text-lg font-bold px-12 py-6 rounded-2xl hover:bg-white hover:text-black transition-all transform hover:scale-105 uppercase tracking-tight shadow-2xl shadow-[#f43f5e]/30 flex items-center justify-center gap-3"
            >
              <span>Schedule Doha Advisory Session</span>
              <ArrowUpRight size={20} />
            </Link>
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-white/10 text-white text-lg font-bold px-12 py-6 rounded-2xl hover:bg-white/5 transition-all flex items-center justify-center gap-3 uppercase tracking-tight"
            >
              <span>Direct WhatsApp Concierge</span>
            </a>
          </div>

          <div className="mt-12 text-[#fb7185] font-mono text-xs uppercase tracking-[0.35em]">
            DOHA · LUSAIL CITY · WEST BAY // AST (UTC+3) DEPLOYED
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QatarMarketPage;

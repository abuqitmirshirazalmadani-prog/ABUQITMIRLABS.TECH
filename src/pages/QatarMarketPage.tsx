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
  Landmark,
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

const QatarMarketPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      q: "How much does AI agent development cost in Qatar?",
      a: "AI agent development costs vary by complexity. A focused customer service agent with RAG capability and CRM integration typically ranges from $15,000 to $40,000 USD. Multi-agent orchestration systems with complex workflow automation and compliance requirements range from $40,000 to $120,000 USD. We provide fixed-price quotes after a discovery session."
    },
    {
      q: "Do you build Arabic-capable AI agents for Qatari businesses?",
      a: "Yes. Our AI agents for the Qatari market are designed with Arabic and English conversational capability from the start. This includes Arabic natural language understanding, dialect awareness for Gulf Arabic, and the ability to switch between Arabic and English within the same conversation based on user preference."
    },
    {
      q: "What is NCSA compliance and how does it affect software projects?",
      a: "The National Cyber Security Agency (NCSA) is Qatar's national cybersecurity authority. NCSA compliance involves implementing security controls across access management, encryption, network security, and incident response. For software projects, NCSA alignment affects architecture decisions, data handling procedures, and audit capabilities. We build every Qatari project with NCSA-aligned security as a baseline requirement."
    },
    {
      q: "Can you build QFC-compliant fintech platforms?",
      a: "Yes. We have experience building financial platforms with the regulatory reporting, transaction monitoring, KYC/AML workflows, and audit trail infrastructure required for QFC-registered entities. Our fintech architecture follows the security and compliance patterns expected by QFC regulators."
    },
    {
      q: "Do you offer bilingual Arabic/English SEO for Doha businesses?",
      a: "Yes. We manage bilingual SEO campaigns that target both Arabic and English search terms with separate keyword research, content strategy, and landing page optimization for each language. This is essential for Qatari businesses serving both Qatari nationals and expatriate communities."
    }
  ];

  return (
    <div className="bg-[#070609] text-[#ded8e2] min-h-screen font-sans selection:bg-[#f43f5e] selection:text-white">
      <Helmet>
        <title>Software Development Qatar | AI Agents & Local SEO | AbuQitmirLabs</title>
        <meta name="description" content="Custom software, AI agents & bilingual SEO for Qatar businesses. Arabic-first, NCSA-compliant, Doha & Lusail coverage. Book a consultation." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/qatar-market" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Software Development Qatar | AI Agents & Local SEO | AbuQitmirLabs" />
        <meta property="og:description" content="Custom software, AI agents & bilingual SEO for Qatar businesses. Arabic-first, NCSA-compliant, Doha & Lusail coverage. Book a consultation." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/qatar-market" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Software Development Qatar | AI Agents & Local SEO | AbuQitmirLabs" />
        <meta name="twitter:description" content="Custom software, AI agents & bilingual SEO for Qatar businesses. Arabic-first, NCSA-compliant, Doha & Lusail coverage. Book a consultation." />
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
                "name": "AbuQitmirLabs - Qatar Tech Engineering",
                "description": "NCSA-compliant software engineering, QFC fintech infrastructure, TASMU-aligned AI agents, and bilingual local SEO for Doha and Lusail.",
                "url": "https://www.abuqitmirlabs.tech/qatar-market",
                "telephone": "+923233260859",
                "priceRange": "$$$$",
                "image": "https://www.abuqitmirlabs.tech/logo.png",
                "areaServed": ["QA", "Doha", "Lusail", "Al Rayyan"],
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Doha",
                  "addressCountry": "QA"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Software Development for Qatar",
                "description": "Enterprise software development, Jamstack web platforms, mobile apps, and localized AI systems for Doha and Lusail businesses.",
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
              State of Qatar // Qatar National Vision 2030 &amp; TASMU
            </motion.div>

            <div className="mb-4">
              <HeroText text="QATAR TECH HUB" />
            </div>

            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white uppercase mb-8"
            >
              Software Development <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f43f5e] via-[#fb7185] to-[#fecdd3]">for Qatar | Arabic AI Agents</span>
            </motion.h1>

            {/* Quick Takeaways Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="max-w-4xl p-8 rounded-2xl bg-gradient-to-br from-rose-950/30 to-black border border-[#f43f5e]/30 backdrop-blur-md shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#f43f5e] uppercase tracking-widest mb-4">
                <Sparkles size={16} />
                Quick Takeaways
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-sans text-gray-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#f43f5e] shrink-0" />
                  <span>Arabic-first AI agents for Qatar enterprises</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#f43f5e] shrink-0" />
                  <span>QFC-compliant fintech infrastructure</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#f43f5e] shrink-0" />
                  <span>TASMU Smart Qatar aligned digital solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#f43f5e] shrink-0" />
                  <span>Doha, Lusail, Al Rayyan, and Al Wakrah coverage</span>
                </div>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-4xl text-lg md:text-xl text-[#9ca3af] leading-relaxed font-sans font-light"
            >
              Qatar's digital infrastructure, built for the 2022 FIFA World Cup, now serves as a foundation for enterprise AI, smart city systems, and cloud-native applications across the country. The Qatar National Vision 2030 and TASMU Smart Qatar initiative have directed sovereign investment into technology that positions Qatar as one of the most well-capitalized AI markets in the region. AbuQitmirLabs builds custom software, AI agents, and web applications combining Arabic-capable AI engineering, QFC-aligned fintech architecture, and bilingual SEO that captures Qatar's unique search behavior.
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
                className="bg-[#f43f5e] text-white px-12 py-7 rounded-2xl font-bold text-lg hover:bg-white hover:text-black hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[#f43f5e]/30 uppercase tracking-tight"
              >
                <ArrowUpRight size={22} />
                Partner with Us in Qatar
              </a>
              <Link 
                to="/contact"
                className="border border-white/10 text-[#d1d5db] px-12 py-7 rounded-2xl font-bold text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-3 uppercase tracking-tight"
              >
                <Smartphone size={22} className="text-[#f43f5e]" />
                Get a Free Qatar Market Audit
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Branding */}
      <section className="overflow-hidden border-y border-white/5 bg-[#09070c] py-14">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-4xl md:text-7xl font-semibold uppercase tracking-tight opacity-90 italic">
          <span>QNV 2030 Aligned</span> <span className="text-[#f43f5e]">·</span>
          <span>TASMU Smart Country Infrastructure</span> <span className="text-[#f43f5e]">·</span>
          <span>QFC Compliant Fintech</span> <span className="text-[#f43f5e]">·</span>
          <span>Doha · Lusail · West Bay</span> <span className="text-[#f43f5e]">·</span>
          <span>NCSA Security Architecture</span> <span className="text-[#f43f5e]">·</span>
          <span>QNV 2030 Aligned</span> <span className="text-[#f43f5e]">·</span>
          <span>TASMU Smart Country Infrastructure</span> <span className="text-[#f43f5e]">·</span>
        </div>
      </section>

      {/* Qatar's Digital Transformation */}
      <section className="py-32 px-6 md:px-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#f43f5e] mb-6 block">// VISION 2030 &amp; TASMU</span>
              <AnimatedShinyText 
                text="Qatar's Digital Transformation: Vision 2030 and TASMU" 
                textClassName="text-4xl md:text-6xl text-white font-bold leading-tight"
              />
              <p className="mt-8 text-xl text-[#fb7185] font-medium">
                Why Qatar's AI Market Is One of the Most Well-Capitalized in the GCC
              </p>
            </div>
            <div className="text-lg text-[#9ca3af] leading-relaxed space-y-6 font-light">
              <p>
                Qatar's approach to digital transformation is distinctive. The country's population is concentrated in Doha and nearby municipalities: Al Rayyan, Al Wakrah, Al Daayen, and the rapidly growing Lusail smart city. Most residents are expatriates from South Asia, the Arab world, the Philippines, and Europe, while Qatari citizens represent a smaller but exceptionally high-value audience.
              </p>
              <p>
                Arabic searches in Qatar frequently come from Qatari nationals and Arab expatriates with high spending power. English searches dominate among other international communities. A digital strategy that addresses only one language captures only part of the market. Our engineering and SEO practice in Qatar is built around bilingual delivery from the ground up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Protocol Section */}
      <section className="py-32 px-6 md:px-10 bg-[#08060b]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 p-12 border border-[#f43f5e]/25 bg-gradient-to-br from-[#f43f5e]/10 via-black to-black rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={140} className="text-[#f43f5e]" />
            </div>
            <div className="relative z-10 max-w-4xl">
              <span className="text-xs font-mono text-[#f43f5e] mb-6 uppercase tracking-[0.4em] font-bold block">[ QATAR_DATA_PROTOCOL ]</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-8 leading-tight">
                NCSA &amp; QFC Compliant Engineering Standards
              </h2>
              <p className="text-lg md:text-xl text-[#d1d5db] leading-relaxed mb-8 font-light">
                Operating in Qatar requires adherence to the National Cyber Security Agency (NCSA) framework and, for financial services, the Qatar Financial Centre (QFC) regulatory requirements. We build all Qatari projects with bank-grade access management, encryption, and sovereign audit logging.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8 text-sm">
                <div className="p-6 rounded-2xl bg-black/60 border border-white/5">
                  <h3 className="font-bold text-white uppercase text-base mb-2 flex items-center gap-2">
                    <Database size={18} className="text-[#f43f5e]" />
                    What NCSA Compliance Means for Software
                  </h3>
                  <p className="text-[#9ca3af] font-light">
                    Implementation of national cybersecurity controls across network segmentation, cryptographic key rotation, incident monitoring, and PDPPL Law No. 13 data sovereignty.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-black/60 border border-white/5">
                  <h3 className="font-bold text-white uppercase text-base mb-2 flex items-center gap-2">
                    <Landmark size={18} className="text-[#f43f5e]" />
                    QFC Regulatory Framework for Fintech
                  </h3>
                  <p className="text-[#9ca3af] font-light">
                    Built-in regulatory reporting, automated transaction surveillance, customer KYC/AML onboarding, and immutable audit trails for 800+ QFC registered entities.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {["NCSA Aligned Controls", "QFC Fintech Architecture", "TASMU Smart Standards", "Qatar Data Residency", "QPAY & QAR Ready"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-[#fb7185] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#f43f5e] mb-6 block">// THE ABUQITMIRLABS EDGE</span>
            <AnimatedShinyText 
              text="Precision Engineering for Doha's Digital Elite." 
              textClassName="text-4xl md:text-7xl font-bold text-white"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Arabic AI Agent Factories",
                desc: "Autonomous LLM agents trained on enterprise knowledge bases, handling Arabic dialogue, English queries, and complex corporate intake workflows.",
                icon: <Cpu className="text-[#f43f5e]" size={32} />
              },
              {
                title: "QFC-Grade SaaS Platforms",
                desc: "Multi-tenant cloud architectures built for Qatar energy, logistics, healthcare, and finance sectors with full data isolation.",
                icon: <Zap className="text-[#f43f5e]" size={32} />
              },
              {
                title: "Bilingual Doha SEO",
                desc: "Capturing low-competition Arabic search volume and high-intent English queries across West Bay, Lusail, and The Pearl.",
                icon: <Search className="text-[#f43f5e]" size={32} />
              }
            ].map((feature, i) => (
              <div key={i} className="p-10 bg-white/[0.02] border border-white/5 hover:border-[#f43f5e]/40 rounded-3xl transition-all group flex flex-col items-start">
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
      <section className="py-32 px-6 md:px-10 border-y border-white/5 bg-[#050407] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-32 text-center">
            <span className="text-xs font-mono text-[#f43f5e] uppercase tracking-[0.4em] block mb-6">// CORE SERVICES FOR THE QATARI MARKET</span>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-white uppercase tracking-tight leading-none">
              Strategic Solutions for <br />
              <span className="italic text-[#9ca3af] font-light">Qatar's Enterprise Sector</span>
            </h2>
          </div>

          <div className="space-y-40">
            {/* Service 1: AI Agents & RAG Pipelines */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
            >
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#f43f5e] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#f43f5e]" />
                  INTELLIGENT AGENTIC SYSTEMS
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  AI Agents &amp; RAG Pipelines <br />
                  <span className="italic text-[#9ca3af]">for Qatar Enterprises</span>
                </h3>
                <div className="font-sans font-light text-[#9ca3af] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    Qatar's AI adoption is accelerating across government, finance, healthcare, and energy. The Ministry of Commerce and Industry has launched an AI Agent Factory in collaboration with Microsoft to deploy intelligent agents across government services. AI course enrollments in Qatar have increased 70% year over year, with agentic workflow enrollment growing 187%.
                  </p>
                  <p>
                    We engineer custom AI agents with Arabic and English conversational capability, RAG pipelines that ground responses in organizational knowledge, and integration with existing enterprise systems. Typical deployments include customer service automation for Qatari banks, patient intake for healthcare providers, logistics workflow automation, and government process automation.
                  </p>
                </div>
              </div>

              {/* Parallax Card 1 */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/80 border border-[#f43f5e]/20 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#f43f5e]/10 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/60 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#9ca3af]">
                      <span>QATAR_AI_ADOPTION_METRICS</span>
                      <span className="text-[#f43f5e] flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#f43f5e] animate-pulse" />
                        SURGE +187%
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { metric: "AI Course Enrollments", stat: "+70% YoY Growth", badge: "ACCELERATING" },
                        { metric: "Agentic Workflow Growth", stat: "+187% Surge", badge: "EXPONENTIAL" },
                        { metric: "Sovereign AI Backing", stat: "TASMU Smart Country", badge: "SUPPORTED" },
                      ].map((item, i) => (
                        <div key={i} className="p-4 border border-white/5 rounded-xl flex justify-between items-center bg-white/[0.02]">
                          <div>
                            <span className="text-sm font-bold text-white block uppercase">{item.metric}</span>
                            <span className="text-xs text-[#9ca3af]">{item.stat}</span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#f43f5e]/20 text-[#f43f5e] font-bold">{item.badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-white/5 pt-6 text-xs font-mono text-[#9ca3af]">
                    <div className="flex justify-between">
                      <span>LINGUISTIC CAPABILITY:</span>
                      <span className="text-white">ARABIC + ENGLISH FLUENT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>FINTECH REGULATORY:</span>
                      <span className="text-[#fb7185] font-bold">QFC COMPLIANT</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service 2: Custom Software & SaaS Platforms */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-white/5 pt-40"
            >
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#f43f5e] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#f43f5e]" />
                  ENTERPRISE APPLICATION ENGINEERING
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Custom Software &amp; <br />
                  <span className="italic text-[#9ca3af]">SaaS Platforms</span>
                </h3>
                <div className="font-sans font-light text-[#9ca3af] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    We build bespoke web applications and SaaS products for Qatari businesses using Next.js, React, Node.js, and Laravel. Common builds include multi-tenant SaaS platforms, energy sector process management systems, healthcare portals, and enterprise internal tools. Every build includes bilingual Arabic/English interfaces with proper RTL support.
                  </p>
                  <p>
                    We also engineer native and cross-platform mobile applications designed for Qatari users. This includes Arabic-first UX, QAR payment gateway integration (SkipCash, QPAY), and offline resilience for high-reliability mobile usage.
                  </p>
                </div>
              </div>

              {/* Parallax Card 2 */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/80 border border-[#f43f5e]/20 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
                  <span className="text-xs font-mono text-[#f43f5e] uppercase tracking-widest block mb-4">Enterprise Capabilities</span>
                  <div className="space-y-3 text-xs font-mono">
                    <div className="p-3 rounded-lg bg-white/5 text-gray-200">✓ Multi-Tenant SaaS Architecture</div>
                    <div className="p-3 rounded-lg bg-white/5 text-gray-200">✓ Energy Sector Process Automation</div>
                    <div className="p-3 rounded-lg bg-white/5 text-gray-200">✓ QPAY &amp; SkipCash QAR Gateways</div>
                    <div className="p-3 rounded-lg bg-white/5 text-gray-200">✓ Hospitality &amp; Tourism Portals</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service 3: Bilingual Local SEO for Doha */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-white/5 pt-40"
            >
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#f43f5e] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#f43f5e]" />
                  LOCAL SEARCH AUTHORITY
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Bilingual Local SEO <br />
                  <span className="italic text-[#9ca3af]">for Doha &amp; Qatar</span>
                </h3>
                <div className="font-sans font-light text-[#9ca3af] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    Qatar does not use postcodes in everyday life. People search by area name: West Bay, The Pearl-Qatar, Lusail, Msheireb, Al Sadd, Al Waab, Al Wakrah, and landmarks. Location-specific landing pages and Google Business Profile optimization drive disproportionate results.
                  </p>
                  <p>
                    Arabic SEO competition in Qatar remains significantly lower than English across most service categories. Businesses that invest in proper bilingual SEO capture page-one visibility at half the keyword difficulty of comparable English terms.
                  </p>
                </div>
              </div>

              {/* Parallax Card 3 */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/80 border border-[#f43f5e]/20 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
                  <span className="text-xs font-mono text-[#f43f5e] uppercase tracking-widest block mb-4">Key Municipalities &amp; Zones</span>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["West Bay", "The Pearl", "Lusail City", "Msheireb", "Al Sadd", "Al Wakrah", "Al Rayyan"].map(dist => (
                      <span key={dist} className="px-3 py-1.5 rounded-lg bg-black border border-white/10 text-xs font-mono text-gray-300">
                        {dist}
                      </span>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-[#9ca3af] leading-relaxed">
                    Page-one Google.com.qa rankings in Arabic can be established within months, securing permanent digital territory before competition intensifies.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-32 px-6 md:px-10 bg-[#050407]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-mono text-[#f43f5e] uppercase tracking-[0.3em] block mb-4">// FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight">
              Qatar Market Tech FAQs
            </h2>
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
                  <span className="text-xl md:text-2xl font-bold text-white tracking-tight">{faq.q}</span>
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
              <h4 className="text-xs font-mono text-[#f43f5e] uppercase tracking-[0.3em] font-bold mb-4">// RELATED SERVICES &amp; TECHNICAL DEEP DIVES</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <Link to="/ai-agent-development" className="p-3 bg-[#0d0a11] hover:bg-white/5 rounded-lg text-[#9c93a3] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>AI Agent Systems</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/custom-software" className="p-3 bg-[#0d0a11] hover:bg-white/5 rounded-lg text-[#9c93a3] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Custom Software</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/local-seo-for-small-business" className="p-3 bg-[#0d0a11] hover:bg-white/5 rounded-lg text-[#9c93a3] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Local SEO Services</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/mobile-app-development" className="p-3 bg-[#0d0a11] hover:bg-white/5 rounded-lg text-[#9c93a3] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Mobile App Dev</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/web-development" className="p-3 bg-[#0d0a11] hover:bg-white/5 rounded-lg text-[#9c93a3] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Web Development</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/seo-mastery" className="p-3 bg-[#0d0a11] hover:bg-white/5 rounded-lg text-[#9c93a3] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Bilingual SEO</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/uae-market" className="p-3 bg-[#0d0a11] hover:bg-white/5 rounded-lg text-[#9c93a3] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>UAE Market</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/contact" className="p-3 bg-[#0d0a11] hover:bg-white/5 rounded-lg text-[#9c93a3] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Book Consultation</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
              </div>
            </div>

            {/* External Regulatory References */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#8c8294]">
              <span className="uppercase tracking-widest text-[11px] font-bold text-zinc-400">Qatar Regulatory References:</span>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://ncsa.gov.qa" target="_blank" rel="noopener noreferrer" className="hover:text-[#f43f5e] transition-colors inline-flex items-center gap-1">
                  NCSA National Cyber Security Agency <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://www.qfc.qa" target="_blank" rel="noopener noreferrer" className="hover:text-[#f43f5e] transition-colors inline-flex items-center gap-1">
                  Qatar Financial Centre (QFC) <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://www.mcit.gov.qa" target="_blank" rel="noopener noreferrer" className="hover:text-[#f43f5e] transition-colors inline-flex items-center gap-1">
                  TASMU Smart Qatar Initiative <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Cinematic Call to Action */}
      <section className="py-44 relative border-t border-white/5 overflow-hidden text-center bg-black">
        <div className="absolute inset-0 bg-[#f43f5e]/10 blur-[200px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 px-6">
          <h2 className="text-6xl md:text-[8rem] font-black text-white italic tracking-tighter uppercase leading-[0.85] mb-14">
            Build for <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #f43f5e' }}>Qatar 2030.</span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <Link 
              to="/contact"
              className="bg-[#f43f5e] text-white text-2xl font-bold px-16 py-8 rounded-full hover:bg-white hover:text-black transition-all transform hover:scale-105 uppercase tracking-tighter shadow-2xl shadow-[#f43f5e]/30"
            >
              Get Free Qatar Consultation
            </Link>
            <div className="text-[#fb7185] font-mono text-xs uppercase tracking-[0.4em] max-w-[320px] text-left border-l-2 border-[#f43f5e] pl-8 leading-relaxed h-16 flex items-center">
              DOHA &amp; LUSAIL // AST (UTC+3) READY
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QatarMarketPage;

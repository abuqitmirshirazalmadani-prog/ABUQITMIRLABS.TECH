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
  ChevronRight, 
  ExternalLink,
  Landmark,
  Database,
  Lock
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import HeroText from '../components/ui/hero-shutter-text';

const QatarMarketPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      q: "Are your digital platforms compliant with Qatar's PDPPL (Law No. 13 of 2016)?",
      a: "Yes. We build all web applications and databases in compliance with Qatar's Personal Data Privacy Protection Law (Law No. 13 of 2016) overseen by the Compliance and Data Protection (CDP) department."
    },
    {
      q: "Do you integrate local Qatari payment gateways like QPAY, SkipCash, and CBQ?",
      a: "Yes. We integrate local Qatari payment infrastructure including QPAY National Payment Gateway, SkipCash, Dibsy, and direct merchant APIs from QNB and Commercial Bank of Qatar (CBQ) with native QAR processing."
    },
    {
      q: "How do your software development squads coordinate with Doha business hours?",
      a: "Qatar is on Arabia Standard Time (AST, UTC+3). Our squads share identical working hours with Doha and Lusail, ensuring real-time agile standups, instant sprint messaging, and live deployment support."
    },
    {
      q: "How do your solutions align with Qatar National Vision 2030 (QNV 2030)?",
      a: "Our software engineering directly drives Qatar National Vision 2030’s digital economy pillar, delivering high-speed Jamstack web architectures, smart government integrations, and AI-driven automation."
    },
    {
      q: "Can you build Arabic-first and bilingual portals for Qatari institutions?",
      a: "Yes. We design high-prestige bilingual (Arabic RTL and English LTR) digital experiences with fluid typography, responsive layout symmetry, and localized semantic SEO for google.com.qa."
    },
    {
      q: "Can you architect custom AI agents for Qatari customer service and operations?",
      a: "Yes. We build secure, isolated LLM AI agents fine-tuned on Qatari enterprise data, supporting both Modern Standard Arabic and Gulf Arabic nuances for automated concierge and customer success."
    }
  ];

  return (
    <div className="bg-[#0a080c] text-[#d1d5db] min-h-screen font-sans selection:bg-[#991b1b] selection:text-white">
      <Helmet>
        <title>Software Development for Qatar | Qatar National Vision 2030 | AbuQitmirLabs</title>
        <meta name="description" content="Enterprise software development, Jamstack web platforms, mobile apps, and localized AI systems for Doha and Lusail businesses. Compliant with Qatar PDPPL Law No. 13." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/qatar-market" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Software Development for Qatar | Qatar National Vision 2030 | AbuQitmirLabs" />
        <meta property="og:description" content="Enterprise software development, Jamstack web platforms, mobile apps, and localized AI systems for Doha and Lusail businesses. Compliant with Qatar PDPPL Law No. 13." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/qatar-market" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Software Development for Qatar | Qatar National Vision 2030 | AbuQitmirLabs" />
        <meta name="twitter:description" content="Enterprise software development, Jamstack web platforms, mobile apps, and localized AI systems for Doha and Lusail businesses. Compliant with Qatar PDPPL Law No. 13." />
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
                "@type": "Service",
                "name": "Enterprise Software Engineering for Qatar",
                "description": "PDPPL-compliant software development, mobile apps, Arabic digital systems, and AI automation for Doha enterprises.",
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
        />
      </Helmet>

      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 pt-32 md:pt-40 md:px-10 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.06),transparent_70%)] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl w-full text-center">
          <div className="flex flex-col gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.4em] text-[#f43f5e]"
            >
              <Landmark size={16} className="text-[#f43f5e]" />
              State of Qatar // Qatar National Vision 2030 Digital Frontier
            </motion.div>

            <div className="mb-8">
              <HeroText text="QATAR TECH" />
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white uppercase mb-8"
            >
              Digital Prestige <br />
              <span className="text-[#f43f5e]">for Qatari Leaders</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-4xl text-lg md:text-xl text-[#9ca3af] leading-relaxed font-sans font-light mx-auto"
            >
              Powering enterprises and high-growth ventures across Doha, Lusail, and West Bay. We deliver sovereign-grade web applications, Flutter mobile apps, and custom LLM AI architectures aligned with Qatar’s National Vision 2030 and PDPPL privacy regulations.
            </motion.p>

            {/* Core Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="max-w-4xl border-y border-white/5 py-8 px-6 bg-white/[0.01] backdrop-blur-sm rounded-lg mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-left">
                {[
                  "Qatar PDPPL (Law No. 13 of 2016) Compliance",
                  "QPAY, SkipCash & QNB Gateway Integration",
                  "Native QAR Multi-Currency Settlement",
                  "Bilingual Arabic RTL & English Portals",
                  "Synchronous AST (UTC+3) Doha Overlap",
                  "High-End Jamstack Web Performance"
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e] mt-2 shrink-0 group-hover:bg-[#fb7185] transition-colors duration-300" />
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
                className="bg-[#f43f5e] text-white px-12 py-8 rounded-full font-black text-xl hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 uppercase tracking-tighter shadow-2xl shadow-[#f43f5e]/20"
              >
                <ArrowUpRight size={24} />
                Connect in Doha Time
              </a>
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-[#f43f5e]/40 text-[#f43f5e] px-12 py-8 rounded-full font-black text-xl hover:bg-[#f43f5e]/10 transition-all flex items-center justify-center gap-3 uppercase tracking-tighter"
              >
                <Globe size={24} />
                Explore Qatar Solutions
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights & PDPPL Compliance */}
      <section className="py-32 px-6 md:px-10 bg-[#0f0c13] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 p-12 border border-[#f43f5e]/20 bg-[#f43f5e]/5 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={120} className="text-[#f43f5e]" />
            </div>
            <div className="relative z-10 max-w-3xl text-left">
              <h2 className="text-sm font-mono text-[#f43f5e] mb-6 uppercase tracking-[0.4em] font-bold">[ QATAR_PDPPL_PROTOCOL ]</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-8 leading-tight">
                PDPPL Law No. 13 <br />
                Sovereign Data Standards
              </h3>
              <p className="text-xl text-[#9ca3af] leading-relaxed mb-8">
                Operating in Qatar requires full compliance with the <span className="text-white font-bold italic">Personal Data Privacy Protection Law (PDPPL)</span>. We design digital systems with enterprise data encryption, verifiable consent pipelines, and Qatari localized server deployment options.
              </p>
              <div className="flex flex-wrap gap-4">
                {["PDPPL Law No. 13 Audited", "QPAY Payment Integration", "QNV 2030 Tech Standards", "Arabic RTL Localization", "High-Security Cloud Clusters"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#f43f5e] rounded-full">
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
              <span className="text-sm font-bold text-[#f43f5e] uppercase tracking-[0.4em] mb-6 block">Municipal Dominance</span>
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none mb-10">
                Engineering for <br />
                <span className="text-[#fb7185] italic">Qatari Innovation.</span>
              </h2>
              <p className="text-xl text-[#9ca3af] font-light leading-relaxed mb-8">
                From luxury commercial towers in West Bay and smart city initiatives in Lusail to academic hubs in Education City, we power Qatar’s digital transformation.
              </p>
              <div className="flex flex-wrap gap-4">
                {['Doha', 'Lusail', 'West Bay', 'Education City', 'Al Rayyan', 'Al Wakrah'].map((city) => (
                  <span key={city} className="px-4 py-2 bg-black/40 border border-white/10 rounded-full text-xs font-mono tracking-widest text-[#f43f5e]">
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
                { title: "QPAY & QAR Ready", icon: <BarChart3 className="text-[#f43f5e]" /> },
                { title: "PDPPL Compliant", icon: <ShieldCheck className="text-[#f43f5e]" /> },
                { title: "AST Doha Overlap", icon: <Cpu className="text-[#f43f5e]" /> },
                { title: "google.com.qa SEO", icon: <Search className="text-[#f43f5e]" /> }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-black/30 border border-white/5 rounded-3xl flex flex-col items-center text-center group hover:border-[#f43f5e]/30 transition-all">
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">{item.title}</h3>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Solutions Grid */}
      <section className="py-32 px-6 md:px-10 bg-[#070509] relative overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <span className="text-xs font-mono text-[#f43f5e] uppercase tracking-[0.4em] block mb-6">// QNV 2030 ARCHITECTURE</span>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-white uppercase tracking-tight leading-none">
              Strategic Solutions for <br />
              <span className="italic text-[#9ca3af]">Qatar’s Enterprise Sector</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-3xl bg-zinc-950/60 border border-white/5 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-[#f43f5e]/10 flex items-center justify-center text-[#f43f5e]">
                <Globe size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Bilingual Jamstack Portals</h3>
              <p className="text-[#9ca3af] leading-relaxed font-light text-sm">
                Next.js and Vite platforms engineered for sub-second page loads across Ooredoo and Vodafone Qatar networks with complete Arabic RTL support.
              </p>
            </div>

            <div className="p-10 rounded-3xl bg-zinc-950/60 border border-white/5 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-[#f43f5e]/10 flex items-center justify-center text-[#f43f5e]">
                <Smartphone size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Fintech & Retail Mobile Apps</h3>
              <p className="text-[#9ca3af] leading-relaxed font-light text-sm">
                Smooth Flutter iOS and Android applications with QPAY, Apple Pay, biometric security, and localized push messaging engineered for high-net-worth Qatari users.
              </p>
            </div>

            <div className="p-10 rounded-3xl bg-zinc-950/60 border border-white/5 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-[#f43f5e]/10 flex items-center justify-center text-[#f43f5e]">
                <Cpu size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Enterprise AI Knowledge Bases</h3>
              <p className="text-[#9ca3af] leading-relaxed font-light text-sm">
                Private retrieval-augmented generation (RAG) agents that parse institutional manuals, corporate records, and Arabic legal documents with full privacy preservation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Country Marquee */}
      <CountryMarquee />

      {/* FAQ Section */}
      <section className="py-32 px-6 md:px-10 bg-[#0f0c13] border-t border-white/5">
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
                className="border border-white/5 bg-black/40 rounded-2xl overflow-hidden transition-all duration-300"
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

          {/* Internal Links */}
          <div className="mt-20 pt-12 border-t border-white/5 space-y-8 text-left">
            <div>
              <h4 className="text-xs font-mono text-[#f43f5e] uppercase tracking-[0.3em] font-bold mb-4">// GCC SERVICES & REGIONAL AUDITS</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <Link to="/custom-software" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Custom Software</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/web-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Web Development</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/mobile-app-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Mobile Apps</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/ai-agent-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>AI Agent Systems</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/saudi-arabia-market" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Saudi Arabia</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/uae-market" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>UAE Market</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/case-studies" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Case Studies</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
                <Link to="/contact" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#f43f5e] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Book Qatar Audit</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f43f5e]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-44 relative border-t border-white/5 overflow-hidden text-center bg-black">
        <div className="absolute inset-0 bg-[#f43f5e]/5 blur-[200px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 px-6">
          <h2 className="text-6xl md:text-[8rem] font-black text-white italic tracking-tighter uppercase leading-[0.85] mb-14">
            Build for <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #f43f5e' }}>Qatar 2030.</span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f43f5e] text-white text-2xl font-bold px-16 py-8 rounded-full hover:bg-white hover:text-black transition-all transform hover:scale-105 uppercase tracking-tighter shadow-2xl shadow-[#f43f5e]/20"
            >
              Request Qatar Tech Audit
            </a>
            <div className="text-[#fb7185] font-mono text-[10px] uppercase tracking-[0.4em] max-w-[320px] text-left border-l-2 border-[#f43f5e] pl-8 leading-relaxed h-16 flex items-center">
              DOHA & LUSAIL // AST (UTC+3) SLOTS OPEN
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QatarMarketPage;

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
  Castle,
  CreditCard,
  Lock
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import HeroText from '../components/ui/hero-shutter-text';

const KuwaitMarketPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      q: "Are your platforms aligned with CITRA data protection regulations and CBK standards?",
      a: "Yes. All software architectures comply with CITRA (Communication and Information Technology Regulatory Authority) standards and the Central Bank of Kuwait (CBK) cybersecurity framework for financial transactions."
    },
    {
      q: "Can you integrate local Kuwaiti payment infrastructure like KNET and MyFatoorah?",
      a: "Absolutely. We engineer direct integrations with KNET, MyFatoorah, Tap Payments, and Hesabe with native Kuwaiti Dinar (KWD) checkout flows, Apple Pay, and automated invoicing."
    },
    {
      q: "How does your engineering team collaborate with businesses in Kuwait City?",
      a: "Kuwait operates on Arabia Standard Time (AST, UTC+3). We share complete synchronous daily working hours with Kuwait City, enabling live daily standups, instant sprint iteration, and immediate incident support."
    },
    {
      q: "How do your software solutions support the 'New Kuwait' Vision 2035 initiatives?",
      a: "We develop high-performance enterprise portals, e-commerce platforms, and autonomous AI agents designed to modernize commercial infrastructure and accelerate Kuwait’s digital transition."
    },
    {
      q: "Do you engineer bilingual Arabic RTL and English web and mobile applications?",
      a: "Yes. We specialize in high-end Arabic Right-to-Left (RTL) design with elegant typography, seamless language toggle, and dedicated Kuwait-focused SEO targeting google.com.kw."
    },
    {
      q: "Can you build customized AI agents and automated support for Kuwaiti enterprises?",
      a: "Yes. Our AI models and autonomous agents are trained on proprietary corporate databases and tuned to understand Gulf Arabic dialogue, assisting customers 24/7 across web portals and WhatsApp."
    }
  ];

  return (
    <div className="bg-[#080a0c] text-[#d1d5db] min-h-screen font-sans selection:bg-[#0ea5e9] selection:text-white">
      <Helmet>
        <title>Software Development for Kuwait | Kuwait Vision 2035 & KNET Ready | AbuQitmirLabs</title>
        <meta name="description" content="Custom software engineering, Flutter mobile apps, high-speed web apps, and AI agents for Kuwait City enterprises. Compliant with CITRA data regulations and seamless KNET gateway integration." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/kuwait-market" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Software Development for Kuwait | Kuwait Vision 2035 & KNET Ready | AbuQitmirLabs" />
        <meta property="og:description" content="Custom software engineering, Flutter mobile apps, high-speed web apps, and AI agents for Kuwait City enterprises. Compliant with CITRA data regulations and seamless KNET gateway integration." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/kuwait-market" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Software Development for Kuwait | Kuwait Vision 2035 & KNET Ready | AbuQitmirLabs" />
        <meta name="twitter:description" content="Custom software engineering, Flutter mobile apps, high-speed web apps, and AI agents for Kuwait City enterprises. Compliant with CITRA data regulations and seamless KNET gateway integration." />
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
                    "name": "Kuwait Market",
                    "item": "https://www.abuqitmirlabs.tech/kuwait-market"
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Software Engineering for Kuwait",
                "description": "CITRA-compliant custom software, mobile apps, Arabic digital platforms, and KNET payment integrations for Kuwait enterprises.",
                "provider": {
                  "@type": "Organization",
                  "name": "AbuQitmirLabs",
                  "url": "https://www.abuqitmirlabs.tech"
                },
                "areaServed": "KW"
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.06),transparent_70%)] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl w-full text-center">
          <div className="flex flex-col gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.4em] text-[#0ea5e9]"
            >
              <Castle size={16} className="text-[#0ea5e9]" />
              State of Kuwait // Vision 2035 Digital Advancement
            </motion.div>

            <div className="mb-8">
              <HeroText text="KUWAIT TECH" />
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white uppercase mb-8"
            >
              Custom Software <br />
              <span className="text-[#0ea5e9]">for Kuwait Enterprises</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-4xl text-lg md:text-xl text-[#9ca3af] leading-relaxed font-sans font-light mx-auto"
            >
              Accelerate your digital operations across Kuwait City, Hawally, and Salmiya. We engineer bank-grade web platforms, Flutter mobile apps, and custom AI agents compliant with CITRA regulations and equipped with seamless KNET payment integration.
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
                  "CITRA & CBK Security Framework Compliance",
                  "Direct KNET, Tap & MyFatoorah Integration",
                  "Native KWD Multi-Currency Architecture",
                  "Bilingual Arabic RTL & English UI Systems",
                  "Full Synchronous AST (UTC+3) Kuwait Time Overlap",
                  "Sub-Second Jamstack Web Architecture"
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] mt-2 shrink-0 group-hover:bg-[#38bdf8] transition-colors duration-300" />
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
                className="bg-[#0ea5e9] text-black px-12 py-8 rounded-full font-black text-xl hover:bg-white transition-all flex items-center justify-center gap-3 uppercase tracking-tighter shadow-2xl shadow-[#0ea5e9]/20"
              >
                <ArrowUpRight size={24} />
                Connect in Kuwait Time
              </a>
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-[#0ea5e9]/40 text-[#0ea5e9] px-12 py-8 rounded-full font-black text-xl hover:bg-[#0ea5e9]/10 transition-all flex items-center justify-center gap-3 uppercase tracking-tighter"
              >
                <Globe size={24} />
                Explore Kuwait Solutions
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights & CITRA Compliance */}
      <section className="py-32 px-6 md:px-10 bg-[#0d1015] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 p-12 border border-[#0ea5e9]/20 bg-[#0ea5e9]/5 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={120} className="text-[#0ea5e9]" />
            </div>
            <div className="relative z-10 max-w-3xl text-left">
              <h2 className="text-sm font-mono text-[#0ea5e9] mb-6 uppercase tracking-[0.4em] font-bold">[ KUWAIT_CITRA_PROTOCOL ]</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-8 leading-tight">
                CITRA & Central Bank <br />
                Financial Grade Security
              </h3>
              <p className="text-xl text-[#9ca3af] leading-relaxed mb-8">
                We engineer software to satisfy <span className="text-white font-bold italic">CITRA regulations</span> and the Central Bank of Kuwait cybersecurity framework. Your customer records, transactions, and proprietary workflows remain protected under enterprise encryption standards.
              </p>
              <div className="flex flex-wrap gap-4">
                {["CITRA Privacy Architecture", "KNET Payment Compliance", "CBK Cybersecurity Alignment", "KWD Native Invoicing", "Fast GCC Cloud Nodes"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#0ea5e9] rounded-full">
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
              <span className="text-sm font-bold text-[#0ea5e9] uppercase tracking-[0.4em] mb-6 block">Kuwaiti Coverage</span>
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none mb-10">
                Digital Presence in <br />
                <span className="text-[#38bdf8] italic">Kuwait’s Prime Hubs.</span>
              </h2>
              <p className="text-xl text-[#9ca3af] font-light leading-relaxed mb-8">
                From corporate institutions in Sharq and Kuwait City to fast-growing retail centers in Salmiya and industrial firms in Al Ahmadi, we supply elite engineering.
              </p>
              <div className="flex flex-wrap gap-4">
                {['Kuwait City', 'Sharq', 'Salmiya', 'Hawally', 'Al Ahmadi', 'Farwaniya', 'Jahra'].map((city) => (
                  <span key={city} className="px-4 py-2 bg-black/40 border border-white/10 rounded-full text-xs font-mono tracking-widest text-[#0ea5e9]">
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
                { title: "KNET & KWD Ready", icon: <CreditCard className="text-[#0ea5e9]" /> },
                { title: "CITRA Compliant", icon: <ShieldCheck className="text-[#0ea5e9]" /> },
                { title: "AST Time Overlap", icon: <Cpu className="text-[#0ea5e9]" /> },
                { title: "google.com.kw SEO", icon: <Search className="text-[#0ea5e9]" /> }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-black/30 border border-white/5 rounded-3xl flex flex-col items-center text-center group hover:border-[#0ea5e9]/30 transition-all">
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">{item.title}</h3>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-6 md:px-10 bg-[#06080a] relative overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <span className="text-xs font-mono text-[#0ea5e9] uppercase tracking-[0.4em] block mb-6">// VISION 2035 CAPABILITIES</span>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-white uppercase tracking-tight leading-none">
              High-Value Solutions for <br />
              <span className="italic text-[#9ca3af]">the Kuwaiti Enterprise Market</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-3xl bg-zinc-950/60 border border-white/5 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/10 flex items-center justify-center text-[#0ea5e9]">
                <Globe size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">KNET E-Commerce Stores</h3>
              <p className="text-[#9ca3af] leading-relaxed font-light text-sm">
                Custom headless e-commerce builds with fast KNET checkouts, automated inventory syncing, bilingual checkout flows, and sub-second catalog navigation.
              </p>
            </div>

            <div className="p-10 rounded-3xl bg-zinc-950/60 border border-white/5 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/10 flex items-center justify-center text-[#0ea5e9]">
                <Smartphone size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Flutter Mobile Applications</h3>
              <p className="text-[#9ca3af] leading-relaxed font-light text-sm">
                Pixel-perfect iOS and Android apps with biometric login, localized push marketing, Arabic RTL interfaces, and frictionless Kuwaiti payment checkout integrations.
              </p>
            </div>

            <div className="p-10 rounded-3xl bg-zinc-950/60 border border-white/5 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/10 flex items-center justify-center text-[#0ea5e9]">
                <Cpu size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Enterprise AI & Automation</h3>
              <p className="text-[#9ca3af] leading-relaxed font-light text-sm">
                Specialized AI chatbots and autonomous agents trained on your customer data to automate bookings, inquiries, and internal workflows 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Country Marquee */}
      <CountryMarquee />

      {/* FAQ Section */}
      <section className="py-32 px-6 md:px-10 bg-[#0d1015] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-mono text-[#0ea5e9] uppercase tracking-[0.3em] block mb-4">// FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight">
              Kuwait Market Tech FAQs
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
                  <span className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform ${activeFaq === index ? 'rotate-45 text-[#0ea5e9]' : 'text-gray-400'}`}>
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
              <h4 className="text-xs font-mono text-[#0ea5e9] uppercase tracking-[0.3em] font-bold mb-4">// REGIONAL SERVICES & TECH AUDITS</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <Link to="/custom-software" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#0ea5e9] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Custom Software</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0ea5e9]" />
                </Link>
                <Link to="/web-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#0ea5e9] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Web Development</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0ea5e9]" />
                </Link>
                <Link to="/mobile-app-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#0ea5e9] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Mobile Apps</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0ea5e9]" />
                </Link>
                <Link to="/ai-agent-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#0ea5e9] transition-colors border border-white/5 flex items-center justify-between">
                  <span>AI Agent Systems</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0ea5e9]" />
                </Link>
                <Link to="/saudi-arabia-market" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#0ea5e9] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Saudi Market</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0ea5e9]" />
                </Link>
                <Link to="/qatar-market" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#0ea5e9] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Qatar Market</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0ea5e9]" />
                </Link>
                <Link to="/case-studies" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#0ea5e9] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Case Studies</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0ea5e9]" />
                </Link>
                <Link to="/contact" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#0ea5e9] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Book Kuwait Audit</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0ea5e9]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-44 relative border-t border-white/5 overflow-hidden text-center bg-black">
        <div className="absolute inset-0 bg-[#0ea5e9]/5 blur-[200px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 px-6">
          <h2 className="text-6xl md:text-[8rem] font-black text-white italic tracking-tighter uppercase leading-[0.85] mb-14">
            Build for <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #0ea5e9' }}>Kuwait 2035.</span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0ea5e9] text-black text-2xl font-bold px-16 py-8 rounded-full hover:bg-white transition-all transform hover:scale-105 uppercase tracking-tighter shadow-2xl shadow-[#0ea5e9]/20"
            >
              Request Kuwait Tech Audit
            </a>
            <div className="text-[#38bdf8] font-mono text-[10px] uppercase tracking-[0.4em] max-w-[320px] text-left border-l-2 border-[#0ea5e9] pl-8 leading-relaxed h-16 flex items-center">
              KUWAIT CITY // AST (UTC+3) SLOTS OPEN
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KuwaitMarketPage;

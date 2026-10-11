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
  Building,
  CreditCard,
  Lock
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import HeroText from '../components/ui/hero-shutter-text';

const UAEMarketPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      q: "Are your platforms compliant with the UAE Data Protection Law (Federal Decree-Law No. 45)?",
      a: "Yes. All our digital platforms, enterprise backends, and AI pipelines adhere to the UAE Data Protection Law and DIFC/ADGM data protection standards, including user consent mechanisms and end-to-end encryption."
    },
    {
      q: "Can you integrate UAE payment processors and multi-currency AED billing?",
      a: "Absolutely. We integrate leading UAE and regional payment gateways including Stripe UAE, Network International, Telr, PayCaps, and Tabby/Tamara for Buy Now Pay Later (BNPL) checkouts."
    },
    {
      q: "How do your working hours coordinate with Dubai and Abu Dhabi businesses?",
      a: "The UAE operates on Gulf Standard Time (GST, UTC+4). Our software squads operate with full synchronous overlap during your standard 9 AM to 6 PM working hours, ensuring instant communication on Slack and Microsoft Teams."
    },
    {
      q: "Do you specialize in fintech and web3 solutions for DIFC and ADGM entities?",
      a: "Yes. We design high-throughput microservices, algorithmic trading dashboards, PCI-DSS compliant customer portals, and regulatory-ready fintech architectures tailored to UAE financial centers."
    },
    {
      q: "Can you provide dual-language Arabic and English interfaces for UAE consumers?",
      a: "Yes. We build responsive bilingual web and mobile experiences with fluid LTR/RTL switching, localized typographic hierarchy, and semantic SEO optimized for google.ae."
    },
    {
      q: "How fast can you deliver an MVP for a Dubai-based startup?",
      a: "Depending on system scope, our senior development squads can architect, build, test, and deploy an investor-ready MVP in 6 to 10 weeks."
    }
  ];

  return (
    <div className="bg-[#090a0f] text-[#d1d5db] min-h-screen font-sans selection:bg-[#38bdf8] selection:text-black">
      <Helmet>
        <title>Software Development for UAE | Dubai & Abu Dhabi Tech Squads | AbuQitmirLabs</title>
        <meta name="description" content="Elite software engineering, mobile apps, and AI agents for UAE enterprises and startups across Dubai and Abu Dhabi. Fully compliant with UAE Federal Decree-Law No. 45." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/uae-market" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Software Development for UAE | Dubai & Abu Dhabi Tech Squads | AbuQitmirLabs" />
        <meta property="og:description" content="Elite software engineering, mobile apps, and AI agents for UAE enterprises and startups across Dubai and Abu Dhabi. Fully compliant with UAE Federal Decree-Law No. 45." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/uae-market" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Software Development for UAE | Dubai & Abu Dhabi Tech Squads | AbuQitmirLabs" />
        <meta name="twitter:description" content="Elite software engineering, mobile apps, and AI agents for UAE enterprises and startups across Dubai and Abu Dhabi. Fully compliant with UAE Federal Decree-Law No. 45." />
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
                "@type": "Service",
                "name": "Enterprise Software Engineering for UAE",
                "description": "Custom software development, mobile apps, and AI automation for Dubai, Abu Dhabi, and UAE businesses.",
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
        />
      </Helmet>

      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 pt-32 md:pt-40 md:px-10 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06),transparent_70%)] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl w-full text-center">
          <div className="flex flex-col gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.4em] text-[#38bdf8]"
            >
              <Building size={16} className="text-[#38bdf8]" />
              United Arab Emirates // Dubai & Abu Dhabi Tech Engineering
            </motion.div>

            <div className="mb-8">
              <HeroText text="UAE TECH HUB" />
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white uppercase mb-8"
            >
              Engineering Scale <br />
              <span className="text-[#38bdf8]">for UAE Enterprises</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-4xl text-lg md:text-xl text-[#9ca3af] leading-relaxed font-sans font-light mx-auto"
            >
              From ambitious startups in Dubai Internet City to established conglomerates in Abu Dhabi and financial pioneers in DIFC and ADGM, we build bank-grade software, high-conversion web apps, and intelligent AI agents.
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
                  "UAE Data Protection Decree-Law No. 45 Compliance",
                  "DIFC & ADGM Regulatory Tech Alignment",
                  "AED Payment Gateways: Network Intl, Telr, Stripe",
                  "Tabby & Tamara BNPL Checkout Integration",
                  "Full Synchronous GST (UTC+4) Working Hours",
                  "Localized Bilingual Arabic & English UX Systems"
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-2 shrink-0 group-hover:bg-[#7dd3fc] transition-colors duration-300" />
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
                className="bg-[#38bdf8] text-black px-12 py-8 rounded-full font-black text-xl hover:bg-white transition-all flex items-center justify-center gap-3 uppercase tracking-tighter shadow-2xl shadow-[#38bdf8]/20"
              >
                <ArrowUpRight size={24} />
                Connect in UAE Time
              </a>
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-[#38bdf8]/40 text-[#38bdf8] px-12 py-8 rounded-full font-black text-xl hover:bg-[#38bdf8]/10 transition-all flex items-center justify-center gap-3 uppercase tracking-tighter"
              >
                <Globe size={24} />
                Explore UAE Solutions
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* UAE Highlights */}
      <section className="py-32 px-6 md:px-10 bg-[#0c1017] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 p-12 border border-[#38bdf8]/20 bg-[#38bdf8]/5 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={120} className="text-[#38bdf8]" />
            </div>
            <div className="relative z-10 max-w-3xl text-left">
              <h2 className="text-sm font-mono text-[#38bdf8] mb-6 uppercase tracking-[0.4em] font-bold">[ UAE_REGULATORY_PROTOCOL ]</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-8 leading-tight">
                UAE Data Protection & <br />
                Financial Hub Compliance
              </h3>
              <p className="text-xl text-[#9ca3af] leading-relaxed mb-8">
                Operating in the UAE demands adherence to <span className="text-white font-bold italic">Federal Decree-Law No. 45</span> and stringent DIFC/ADGM cybersecurity guidelines. We build cloud architectures with automated audit trails, strict consent tracking, and localized Middle East cloud failover.
              </p>
              <div className="flex flex-wrap gap-4">
                {["UAE Federal Decree-Law No. 45", "DIFC Data Protection Act", "ADGM Cyber Regulations", "PCI-DSS Level 1 Ready", "VAT Compliant Logic"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#38bdf8] rounded-full">
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
              <span className="text-sm font-bold text-[#38bdf8] uppercase tracking-[0.4em] mb-6 block">Emirate Reach</span>
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none mb-10">
                Powering Digital in <br />
                <span className="text-[#0284c7] italic">The GCC Powerhouse.</span>
              </h2>
              <p className="text-xl text-[#9ca3af] font-light leading-relaxed mb-8">
                From luxury retail apps in Downtown Dubai to enterprise platforms in Abu Dhabi Global Market and logistics in Sharjah, we deliver precision engineering.
              </p>
              <div className="flex flex-wrap gap-4">
                {['Dubai', 'Abu Dhabi', 'Sharjah', 'DIFC', 'ADGM', 'Ajman', 'Ras Al Khaimah'].map((city) => (
                  <span key={city} className="px-4 py-2 bg-black/40 border border-white/10 rounded-full text-xs font-mono tracking-widest text-[#38bdf8]">
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
                { title: "AED Currency Ready", icon: <CreditCard className="text-[#38bdf8]" /> },
                { title: "Decree No. 45 Ready", icon: <ShieldCheck className="text-[#38bdf8]" /> },
                { title: "GST 100% Overlap", icon: <Cpu className="text-[#38bdf8]" /> },
                { title: "google.ae Mastery", icon: <Search className="text-[#38bdf8]" /> }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-black/30 border border-white/5 rounded-3xl flex flex-col items-center text-center group hover:border-[#38bdf8]/30 transition-all">
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">{item.title}</h3>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-6 md:px-10 bg-[#07090e] relative overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-[0.4em] block mb-6">// UAE INDUSTRY FOCUS</span>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-white uppercase tracking-tight leading-none">
              Modern Solutions for <br />
              <span className="italic text-[#9ca3af]">High-Velocity UAE Markets</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-3xl bg-zinc-950/60 border border-white/5 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]">
                <Globe size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">E-Commerce & BNPL Platforms</h3>
              <p className="text-[#9ca3af] leading-relaxed font-light text-sm">
                High-converting headless e-commerce builds integrated with Tabby, Tamara, Apple Pay, and automated UAE VAT invoicing for seamless online transactions.
              </p>
            </div>

            <div className="p-10 rounded-3xl bg-zinc-950/60 border border-white/5 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]">
                <Smartphone size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Luxury & Corporate Mobile Apps</h3>
              <p className="text-[#9ca3af] leading-relaxed font-light text-sm">
                Smooth 120fps cross-platform mobile apps built with Flutter. Engineered for UAE lifestyle, luxury concierge, real estate portals, and corporate services.
              </p>
            </div>

            <div className="p-10 rounded-3xl bg-zinc-950/60 border border-white/5 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]">
                <Cpu size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">AI Agents & Workflow Bots</h3>
              <p className="text-[#9ca3af] leading-relaxed font-light text-sm">
                Custom conversational AI agents built on your business knowledge bases, providing 24/7 client support across WhatsApp, web chat, and internal ERP systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Country Marquee */}
      <CountryMarquee />

      {/* FAQ Section */}
      <section className="py-32 px-6 md:px-10 bg-[#0c1017] border-t border-white/5">
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
                className="border border-white/5 bg-black/40 rounded-2xl overflow-hidden transition-all duration-300"
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

          {/* Internal Links */}
          <div className="mt-20 pt-12 border-t border-white/5 space-y-8 text-left">
            <div>
              <h4 className="text-xs font-mono text-[#38bdf8] uppercase tracking-[0.3em] font-bold mb-4">// UAE DIGITAL SERVICES & AUDITS</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <Link to="/custom-software" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#38bdf8] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Custom Software</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                </Link>
                <Link to="/web-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#38bdf8] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Web Development</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                </Link>
                <Link to="/mobile-app-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#38bdf8] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Mobile Apps</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                </Link>
                <Link to="/ai-agent-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#38bdf8] transition-colors border border-white/5 flex items-center justify-between">
                  <span>AI Agent Systems</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                </Link>
                <Link to="/seo-mastery" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#38bdf8] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Dubai SEO</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                </Link>
                <Link to="/saudi-arabia-market" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#38bdf8] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Saudi Market</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                </Link>
                <Link to="/case-studies" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#38bdf8] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Case Studies</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                </Link>
                <Link to="/contact" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#38bdf8] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Book UAE Audit</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#38bdf8]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-44 relative border-t border-white/5 overflow-hidden text-center bg-black">
        <div className="absolute inset-0 bg-[#38bdf8]/5 blur-[200px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 px-6">
          <h2 className="text-6xl md:text-[8rem] font-black text-white italic tracking-tighter uppercase leading-[0.85] mb-14">
            Build for <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #38bdf8' }}>The UAE Hub.</span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#38bdf8] text-black text-2xl font-bold px-16 py-8 rounded-full hover:bg-white transition-all transform hover:scale-105 uppercase tracking-tighter shadow-2xl shadow-[#38bdf8]/20"
            >
              Request UAE Tech Audit
            </a>
            <div className="text-[#38bdf8] font-mono text-[10px] uppercase tracking-[0.4em] max-w-[320px] text-left border-l-2 border-[#38bdf8] pl-8 leading-relaxed h-16 flex items-center">
              DUBAI & ABU DHABI TIME // GST (UTC+4) READY
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UAEMarketPage;

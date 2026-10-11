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
  MapPin, 
  ChevronRight, 
  ExternalLink,
  Building2,
  Lock,
  Layers,
  Database
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import HeroText from '../components/ui/hero-shutter-text';

const SaudiArabiaMarketPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      q: "Are your software solutions compliant with the Saudi Personal Data Protection Law (PDPL)?",
      a: "Yes. All software architecture is engineered to adhere strictly to SDAIA and Saudi PDPL guidelines, including in-kingdom data residency options, encrypted data pipelines, and role-based access management."
    },
    {
      q: "Can you integrate ZATCA Phase 2 compliant e-invoicing into custom platforms?",
      a: "Absolutely. We engineer compliant ZATCA (FATOORA) Phase 2 e-invoicing pipelines with cryptographic stamp generation, XML/UBL 2.1 formatting, and direct API clearance integration for Saudi B2B and B2C operations."
    },
    {
      q: "Do you integrate local Saudi payment gateways like Mada and Apple Pay?",
      a: "Yes. We support native Saudi payment processing via Mada, Apple Pay, STC Pay, and leading regional aggregators including Tap Payments, PayTabs, and HyperPay."
    },
    {
      q: "How does your engineering team handle timezone collaboration with Riyadh and Jeddah?",
      a: "Saudi Arabia (AST, UTC+3) shares near-identical working hours with our regional delivery hubs. We offer 100% real-time daily operational overlap for sprint standups, planning, and live deployment support."
    },
    {
      q: "Do you build bilingual (Arabic and English) high-performance web and mobile apps?",
      a: "Yes. We engineer first-class RTL (right-to-left) Arabic user experiences with seamless language switching, culturally adapted UX, and semantic Arabic SEO tailored to Google Saudi Arabia (google.com.sa)."
    },
    {
      q: "How do your solutions align with the Kingdom's Vision 2030 digital economy initiatives?",
      a: "We empower Saudi enterprises, giga-project contractors, and tech startups with modern Jamstack web platforms, Flutter mobile apps, and custom LLM AI agents built for digital transformation at scale."
    }
  ];

  return (
    <div className="bg-[#08090a] text-[#d1d5db] min-h-screen font-sans selection:bg-[#10b981] selection:text-black">
      <Helmet>
        <title>Software Development for Saudi Arabia | Vision 2030 & PDPL Compliant | AbuQitmirLabs</title>
        <meta name="description" content="Saudi Arabia-focused custom software development, mobile apps, Arabic SEO, and enterprise AI agents. Fully compliant with Saudi PDPL and Vision 2030 digital mandates." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/saudi-arabia-market" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Software Development for Saudi Arabia | Vision 2030 & PDPL Compliant | AbuQitmirLabs" />
        <meta property="og:description" content="Saudi Arabia-focused custom software development, mobile apps, Arabic SEO, and enterprise AI agents. Fully compliant with Saudi PDPL and Vision 2030 digital mandates." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/saudi-arabia-market" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Software Development for Saudi Arabia | Vision 2030 & PDPL Compliant | AbuQitmirLabs" />
        <meta name="twitter:description" content="Saudi Arabia-focused custom software development, mobile apps, Arabic SEO, and enterprise AI agents. Fully compliant with Saudi PDPL and Vision 2030 digital mandates." />
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
                "@type": "Service",
                "name": "Enterprise Software & AI for Saudi Arabia",
                "description": "PDPL-compliant software engineering, mobile development, Arabic localization, and Vision 2030 tech solutions.",
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
        />
      </Helmet>

      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 pt-32 md:pt-40 md:px-10 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06),transparent_70%)] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl w-full text-center">
          <div className="flex flex-col gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.4em] text-[#10b981]"
            >
              <Building2 size={16} className="text-[#10b981]" />
              Kingdom of Saudi Arabia // Vision 2030 Digital Engineering
            </motion.div>

            <div className="mb-8">
              <HeroText text="SAUDI ARABIA TECH" />
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white uppercase mb-8"
            >
              Software Engineering <br />
              <span className="text-[#10b981]">for Saudi Enterprises</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-4xl text-lg md:text-xl text-[#9ca3af] leading-relaxed font-sans font-light mx-auto"
            >
              Accelerate your digital transformation in Riyadh, Jeddah, and across the Kingdom. We architect bank-grade software, RTL Arabic mobile apps, and custom AI automation aligned with Saudi Arabia’s Vision 2030 and PDPL data privacy laws.
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
                  "SDAIA & Saudi PDPL Compliance Architecture",
                  "ZATCA Phase 2 E-Invoicing (FATOORA) Integration",
                  "Mada, STC Pay & Apple Pay Checkout Systems",
                  "Bilingual RTL & LTR Native & Flutter Apps",
                  "Synchronous AST (UTC+3) Daily Overlap",
                  "High-Speed Saudi Local Cloud Infrastructure"
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] mt-2 shrink-0 group-hover:bg-[#34d399] transition-colors duration-300" />
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
                className="bg-[#10b981] text-black px-12 py-8 rounded-full font-black text-xl hover:bg-white transition-all flex items-center justify-center gap-3 uppercase tracking-tighter shadow-2xl shadow-[#10b981]/20"
              >
                <ArrowUpRight size={24} />
                Connect in KSA Time
              </a>
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-[#10b981]/40 text-[#10b981] px-12 py-8 rounded-full font-black text-xl hover:bg-[#10b981]/10 transition-all flex items-center justify-center gap-3 uppercase tracking-tighter"
              >
                <Globe size={24} />
                Explore Saudi Solutions
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Saudi Specific Highlights & PDPL Compliance */}
      <section className="py-32 px-6 md:px-10 bg-[#0d1117] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 p-12 border border-[#10b981]/20 bg-[#10b981]/5 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={120} className="text-[#10b981]" />
            </div>
            <div className="relative z-10 max-w-3xl text-left">
              <h2 className="text-sm font-mono text-[#10b981] mb-6 uppercase tracking-[0.4em] font-bold">[ KSA_COMPLIANCE_PROTOCOL ]</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-8 leading-tight">
                PDPL & SDAIA Compliant <br />
                Saudi Data Sovereign Systems
              </h3>
              <p className="text-xl text-[#9ca3af] leading-relaxed mb-8">
                Operating in the Saudi market requires strict adherence to the <span className="text-white font-bold italic">Personal Data Protection Law (PDPL)</span> overseen by SDAIA. We engineer software with zero-trust security, strict data sovereignty options in local Saudi cloud zones, and verified ZATCA electronic billing compatibility.
              </p>
              <div className="flex flex-wrap gap-4">
                {["In-Kingdom Data Residency", "PDPL Privacy by Design", "ZATCA Phase 2 FATOORA", "Mada Payment SDKs", "NCA Cybersecurity Alignment"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#10b981] rounded-full">
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
              <span className="text-sm font-bold text-[#10b981] uppercase tracking-[0.4em] mb-6 block">Metropolitan Coverage</span>
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none mb-10">
                Digital Power Across <br />
                <span className="text-[#34d399] italic">Saudi Commercial Hubs.</span>
              </h2>
              <p className="text-xl text-[#9ca3af] font-light leading-relaxed mb-8">
                From tech headquarters in Riyadh to international commerce in Jeddah and industrial powerhouses in Dammam and Khobar, we deliver high-velocity engineering for the Kingdom’s most ambitious ventures.
              </p>
              <div className="flex flex-wrap gap-4">
                {['Riyadh', 'Jeddah', 'Dammam', 'Khobar', 'Mecca', 'Medina', 'NEOM & Red Sea'].map((city) => (
                  <span key={city} className="px-4 py-2 bg-black/40 border border-white/10 rounded-full text-xs font-mono tracking-widest text-[#10b981]">
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
                { title: "ZATCA Ready", icon: <BarChart3 className="text-[#10b981]" /> },
                { title: "PDPL Compliant", icon: <ShieldCheck className="text-[#10b981]" /> },
                { title: "Full AST Overlap", icon: <Cpu className="text-[#10b981]" /> },
                { title: "Arabic RTL SEO", icon: <Search className="text-[#10b981]" /> }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-black/30 border border-white/5 rounded-3xl flex flex-col items-center text-center group hover:border-[#10b981]/30 transition-all">
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">{item.title}</h3>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Architecture Section */}
      <section className="py-32 px-6 md:px-10 bg-[#06080a] relative overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <span className="text-xs font-mono text-[#10b981] uppercase tracking-[0.4em] block mb-6">// VISION 2030 CAPABILITIES</span>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-white uppercase tracking-tight leading-none">
              Engineering Built for <br />
              <span className="italic text-[#9ca3af]">the Saudi Economy</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-3xl bg-zinc-950/60 border border-white/5 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
                <Globe size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">RTL Arabic Web Systems</h3>
              <p className="text-[#9ca3af] leading-relaxed font-light text-sm">
                Fast, responsive web apps built with Next.js and Vite featuring pixel-perfect Arabic typography, Right-to-Left UX layout transitions, and high-speed delivery over Saudi CDNs.
              </p>
            </div>

            <div className="p-10 rounded-3xl bg-zinc-950/60 border border-white/5 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
                <Smartphone size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Cross-Platform Mobile Apps</h3>
              <p className="text-[#9ca3af] leading-relaxed font-light text-sm">
                Native-grade iOS and Android applications written in Flutter and React Native. Integrated with Mada, Apple Pay, biometric auth, and push notification services tailored to GCC mobile consumers.
              </p>
            </div>

            <div className="p-10 rounded-3xl bg-zinc-950/60 border border-white/5 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
                <Cpu size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Enterprise AI & Automation</h3>
              <p className="text-[#9ca3af] leading-relaxed font-light text-sm">
                Custom LLM agents fluent in Modern Standard Arabic and Gulf dialects. Designed for automated customer assistance, document intelligence, and enterprise internal knowledge retrieval.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Country Marquee */}
      <CountryMarquee />

      {/* FAQ Section */}
      <section className="py-32 px-6 md:px-10 bg-[#0d1117] border-t border-white/5">
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
                className="border border-white/5 bg-black/40 rounded-2xl overflow-hidden transition-all duration-300"
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

          {/* Internal Links */}
          <div className="mt-20 pt-12 border-t border-white/5 space-y-8 text-left">
            <div>
              <h4 className="text-xs font-mono text-[#10b981] uppercase tracking-[0.3em] font-bold mb-4">// MIDDLE EAST REGIONAL SERVICES & AUDITS</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <Link to="/custom-software" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#10b981] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Custom Software</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#10b981]" />
                </Link>
                <Link to="/web-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#10b981] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Web Development</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#10b981]" />
                </Link>
                <Link to="/mobile-app-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#10b981] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Mobile Apps</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#10b981]" />
                </Link>
                <Link to="/ai-agent-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#10b981] transition-colors border border-white/5 flex items-center justify-between">
                  <span>AI Agent Systems</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#10b981]" />
                </Link>
                <Link to="/seo-mastery" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#10b981] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Arabic SEO</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#10b981]" />
                </Link>
                <Link to="/uae-market" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#10b981] transition-colors border border-white/5 flex items-center justify-between">
                  <span>UAE Market</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#10b981]" />
                </Link>
                <Link to="/case-studies" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#10b981] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Case Studies</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#10b981]" />
                </Link>
                <Link to="/contact" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-[#8d8579] hover:text-[#10b981] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Book KSA Audit</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#10b981]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-44 relative border-t border-white/5 overflow-hidden text-center bg-black">
        <div className="absolute inset-0 bg-[#10b981]/5 blur-[200px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 px-6">
          <h2 className="text-6xl md:text-[8rem] font-black text-white italic tracking-tighter uppercase leading-[0.85] mb-14">
            Build Saudi <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #10b981' }}>Vision 2030.</span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#10b981] text-black text-2xl font-bold px-16 py-8 rounded-full hover:bg-white transition-all transform hover:scale-105 uppercase tracking-tighter shadow-2xl shadow-[#10b981]/20"
            >
              Request KSA Tech Audit
            </a>
            <div className="text-[#34d399] font-mono text-[10px] uppercase tracking-[0.4em] max-w-[320px] text-left border-l-2 border-[#10b981] pl-8 leading-relaxed h-16 flex items-center">
              SAUDI PDPL READY // AST (UTC+3) SLOTS OPEN
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SaudiArabiaMarketPage;

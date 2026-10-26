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
  Castle,
  CreditCard,
  Lock,
  Database,
  BarChart3,
  CheckCircle2,
  Sparkles,
  Server,
  Layers,
  MapPin
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import HeroText from '../components/ui/hero-shutter-text';
import { AnimatedShinyText } from '../components/ui/animated-shiny-text';
import { AnimatedBreathingText } from '../components/ui/animated-breathing-text';
import { MagicText } from '../components/ui/magic-text';

const KuwaitMarketPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      q: "How much does SEO cost in Kuwait?",
      a: "SEO services in Kuwait vary by scope and competition. A focused local SEO campaign for a single-location business typically ranges from KD 150 to KD 400 per month for ongoing optimization. Bilingual campaigns targeting both Arabic and English keywords range from KD 250 to KD 600 per month. We provide customized quotes after an initial audit of your current search visibility."
    },
    {
      q: "Do you offer Arabic and English SEO for Kuwait businesses?",
      a: "Yes. Bilingual Arabic/English SEO is our core service for the Kuwaiti market. We conduct separate keyword research for each language — Arabic search terms often have different intent and phrasing than English equivalents. We optimize Google Business Profile, website content, and citations in both languages to capture the full range of local search demand."
    },
    {
      q: "What is CITRA compliance and why does it matter?",
      a: "CITRA (Communication and Information Technology Regulatory Authority) is Kuwait's telecommunications and IT regulator. CITRA compliance affects data handling, cybersecurity standards, and cloud hosting requirements for businesses operating in Kuwait. For software projects, this means implementing appropriate data protection controls, audit logging, and in-country data residency where required. We build every Kuwaiti project with CITRA-aligned data handling as a baseline."
    },
    {
      q: "Can you build Arabic-first websites for Kuwait?",
      a: "Yes. Every website and application we build for the Kuwaiti market is designed with Arabic as a primary language, not a translation layer. This includes RTL layout for all UI components, Arabic typography, and localized content that reflects how Kuwaiti users actually search and communicate."
    },
    {
      q: "How long does it take to rank in Kuwait's Google Maps?",
      a: "For most service categories in Kuwait, proper Google Business Profile optimization plus district-level landing pages can produce top-3 map pack rankings within 3-4 months. Arabic keyword rankings often come faster — within 2-3 months — because competition for Arabic search terms remains significantly lower than English. Results depend on your category, competition density, and current profile status."
    }
  ];

  return (
    <div className="bg-[#05070a] text-[#d6e0ea] min-h-screen font-sans selection:bg-[#0ea5e9] selection:text-white">
      <Helmet>
        <title>Software Development Kuwait | Arabic SEO & Custom Apps | AbuQitmirLabs</title>
        <meta name="description" content="Bilingual Arabic/English SEO, custom software & AI agents for Kuwait businesses. CITRA-compliant, Salmiya & Kuwait City coverage. Get a quote." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/kuwait-market" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Software Development Kuwait | Arabic SEO & Custom Apps | AbuQitmirLabs" />
        <meta property="og:description" content="Bilingual Arabic/English SEO, custom software & AI agents for Kuwait businesses. CITRA-compliant, Salmiya & Kuwait City coverage. Get a quote." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/kuwait-market" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Software Development Kuwait | Arabic SEO & Custom Apps | AbuQitmirLabs" />
        <meta name="twitter:description" content="Bilingual Arabic/English SEO, custom software & AI agents for Kuwait businesses. CITRA-compliant, Salmiya & Kuwait City coverage. Get a quote." />
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
                "@type": "LocalBusiness",
                "name": "AbuQitmirLabs - Kuwait Tech & SEO Engineering",
                "description": "CITRA-compliant software development, KNET payment integrations, bilingual Arabic/English SEO, and autonomous AI agents for Kuwait.",
                "url": "https://www.abuqitmirlabs.tech/kuwait-market",
                "telephone": "+923233260859",
                "priceRange": "$$$$",
                "image": "https://www.abuqitmirlabs.tech/logo.png",
                "areaServed": ["KW", "Kuwait City", "Salmiya", "Hawally", "Al Ahmadi"],
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Kuwait City",
                  "addressCountry": "KW"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Software Development for Kuwait",
                "description": "Custom software engineering, Flutter mobile apps, high-speed web apps, and AI agents for Kuwait City enterprises. Compliant with CITRA data regulations and seamless KNET gateway integration.",
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
        ></script>
      </Helmet>

      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 md:pt-40 md:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_40%),linear-gradient(to_bottom,rgba(14,165,233,0.02),transparent_25%,transparent_80%,rgba(14,165,233,0.03))] pointer-events-none" />
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#0ea5e9]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-cyan-700/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative mx-auto max-w-7xl w-full">
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.35em] text-[#0ea5e9]"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[#0ea5e9] animate-pulse" />
              State of Kuwait // New Kuwait Vision 2035 Digital Engineering
            </motion.div>

            <div className="mb-4">
              <HeroText text="KUWAIT TECH HUB" />
            </div>

            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white uppercase mb-8"
            >
              Software Development <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] via-[#38bdf8] to-[#7dd3fc]">for Kuwait | Arabic SEO &amp; Apps</span>
            </motion.h1>

            {/* Quick Takeaways Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="max-w-4xl p-8 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-black border border-[#0ea5e9]/30 backdrop-blur-md shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#0ea5e9] uppercase tracking-widest mb-4">
                <Sparkles size={16} />
                Quick Takeaways
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-sans text-gray-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#0ea5e9] shrink-0" />
                  <span>Arabic SEO in Kuwait ranks in 6-8 weeks vs 6 months for English</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#0ea5e9] shrink-0" />
                  <span>Kuwait local pack captures 40-60% of clicks for local searches</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#0ea5e9] shrink-0" />
                  <span>CITRA-compliant data handling &amp; bilingual GBP optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#0ea5e9] shrink-0" />
                  <span>Serving Salmiya, Hawalli, Kuwait City, Fahaheel, and Jabriya</span>
                </div>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-4xl text-lg md:text-xl text-[#9ca3af] leading-relaxed font-sans font-light"
            >
              Kuwait's commercial activity is concentrated in high-density districts: Salmiya, Hawalli, Kuwait City, Fahaheel, Jabriya, and Mishref, where consumers rely heavily on Google Maps and "near me" searches. A business ranking in the top three of the local 3-pack captures 40-60% of search clicks. Competition for Arabic search terms remains significantly lower than English, enabling page-one rankings in 6-8 weeks. AbuQitmirLabs provides custom software, AI agents, and bilingual SEO combining Arabic-first engineering, CITRA-compliant data handling, and KNET payment integration.
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
                className="bg-[#0ea5e9] text-black px-12 py-7 rounded-2xl font-bold text-lg hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[#0ea5e9]/30 uppercase tracking-tight"
              >
                <ArrowUpRight size={22} />
                Partner with Us in Kuwait
              </a>
              <Link 
                to="/contact"
                className="border border-white/10 text-[#d1d5db] px-12 py-7 rounded-2xl font-bold text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-3 uppercase tracking-tight"
              >
                <Smartphone size={22} className="text-[#0ea5e9]" />
                Get a Free Kuwait Market Audit
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Branding */}
      <section className="overflow-hidden border-y border-white/5 bg-[#07090d] py-14">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-4xl md:text-7xl font-semibold uppercase tracking-tight opacity-90 italic">
          <span>Arabic SEO 6-8 Weeks</span> <span className="text-[#0ea5e9]">·</span>
          <span>CITRA Compliant Architecture</span> <span className="text-[#0ea5e9]">·</span>
          <span>40-60% Map Pack Click Dominance</span> <span className="text-[#0ea5e9]">·</span>
          <span>KNET &amp; KWD Payment Ready</span> <span className="text-[#0ea5e9]">·</span>
          <span>Salmiya · Hawalli · Kuwait City</span> <span className="text-[#0ea5e9]">·</span>
          <span>Arabic SEO 6-8 Weeks</span> <span className="text-[#0ea5e9]">·</span>
          <span>CITRA Compliant Architecture</span> <span className="text-[#0ea5e9]">·</span>
        </div>
      </section>

      {/* Kuwait's Digital Market Dynamics */}
      <section className="py-32 px-6 md:px-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#0ea5e9] mb-6 block">// LOCAL INTENT DYNAMICS</span>
              <AnimatedShinyText 
                text="Kuwait's Digital Market: Compact Geography, High Local Intent" 
                textClassName="text-4xl md:text-6xl text-white font-bold leading-tight"
              />
              <p className="mt-8 text-xl text-[#38bdf8] font-medium">
                Why Arabic SEO in Kuwait Is Significantly Less Competitive
              </p>
            </div>
            <div className="text-lg text-[#9ca3af] leading-relaxed space-y-6 font-light">
              <p>
                Kuwait's population is concentrated in a tight geographic area, with distinct commercial districts that shape consumer behavior. Salmiya and Hawalli are the primary retail and service hubs. Kuwait City hosts the financial and government sectors. Fahaheel serves the southern residential areas. Jabriya and Mishref are major residential districts with high local service demand.
              </p>
              <p>
                This concentration creates a specific dynamic for local SEO: ranking for district-level queries ("dentist in Salmiya," "restaurant in Hawalli," "car service Jabriya") drives both map pack visibility and organic results. Businesses that create location-specific pages and optimize their Google Business Profile for district-level keywords capture qualified local demand that generic national-level content misses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Protocol Section */}
      <section className="py-32 px-6 md:px-10 bg-[#06080c]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 p-12 border border-[#0ea5e9]/25 bg-gradient-to-br from-[#0ea5e9]/10 via-black to-black rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={140} className="text-[#0ea5e9]" />
            </div>
            <div className="relative z-10 max-w-4xl">
              <span className="text-xs font-mono text-[#0ea5e9] mb-6 uppercase tracking-[0.4em] font-bold block">[ KUWAIT_DATA_PROTOCOL ]</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-8 leading-tight">
                CITRA &amp; Data Privacy Compliant Engineering Standards
              </h2>
              <p className="text-lg md:text-xl text-[#d1d5db] leading-relaxed mb-8 font-light">
                Operating in Kuwait requires adherence to the Communication and Information Technology Regulatory Authority (CITRA) framework for data handling and cybersecurity. We build all Kuwaiti projects with strict data handling procedures, GCC-region data residency options, KNET-compatible payment gateways, and bilingual data architecture.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8 text-sm">
                <div className="p-6 rounded-2xl bg-black/60 border border-white/5">
                  <h3 className="font-bold text-white uppercase text-base mb-2 flex items-center gap-2">
                    <Database size={18} className="text-[#0ea5e9]" />
                    What CITRA Compliance Means for Businesses
                  </h3>
                  <p className="text-[#9ca3af] font-light">
                    Implementation of structured data retention, encrypted customer records, multi-factor authentication, and compliance with the Central Bank of Kuwait cybersecurity framework.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-black/60 border border-white/5">
                  <h3 className="font-bold text-white uppercase text-base mb-2 flex items-center gap-2">
                    <CreditCard size={18} className="text-[#0ea5e9]" />
                    KNET Integration &amp; Data Sovereignty
                  </h3>
                  <p className="text-[#9ca3af] font-light">
                    Direct integration with KNET, MyFatoorah, Tap, and Hesabe with native Kuwaiti Dinar (KWD) checkout flows, Apple Pay, and local hosting configurations.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {["CITRA Aligned Controls", "CBK Cybersecurity Standards", "KNET Native Integration", "KWD Multi-Currency", "Kuwait Data Residency"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#0ea5e9] mb-6 block">// THE ABUQITMIRLABS EDGE</span>
            <AnimatedShinyText 
              text="Dominating Kuwait's Local Search & Digital Landscape." 
              textClassName="text-4xl md:text-7xl font-bold text-white"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Bilingual Kuwait Local SEO",
                desc: "Capturing 40-60% of clicks across Salmiya, Hawalli, and Kuwait City with Google Business Profile optimization in Arabic and English.",
                icon: <Search className="text-[#0ea5e9]" size={32} />
              },
              {
                title: "KNET E-Commerce & Apps",
                desc: "High-speed Jamstack web platforms and Flutter mobile apps with seamless KNET payment checkout and bilingual Arabic RTL ergonomics.",
                icon: <Zap className="text-[#0ea5e9]" size={32} />
              },
              {
                title: "WhatsApp AI Agents",
                desc: "Autonomous conversational AI agents fluent in Gulf Arabic, handling customer inquiries and bookings 24/7 over WhatsApp and web portals.",
                icon: <Cpu className="text-[#0ea5e9]" size={32} />
              }
            ].map((feature, i) => (
              <div key={i} className="p-10 bg-white/[0.02] border border-white/5 hover:border-[#0ea5e9]/40 rounded-3xl transition-all group flex flex-col items-start">
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
      <section className="py-32 px-6 md:px-10 border-y border-white/5 bg-[#040508] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-32 text-center">
            <span className="text-xs font-mono text-[#0ea5e9] uppercase tracking-[0.4em] block mb-6">// CORE SERVICES FOR THE KUWAITI MARKET</span>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-white uppercase tracking-tight leading-none">
              High-Impact Services <br />
              <span className="italic text-[#9ca3af] font-light">Calibrated for Kuwait</span>
            </h2>
          </div>

          <div className="space-y-40">
            {/* Service 1: Bilingual Arabic/English Local SEO */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
            >
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#0ea5e9] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#0ea5e9]" />
                  LOCAL SEARCH AUTHORITY
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Bilingual Arabic/English <br />
                  <span className="italic text-[#9ca3af]">Local SEO &amp; Map Dominance</span>
                </h3>
                <div className="font-sans font-light text-[#9ca3af] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    This is our highest-impact service for Kuwaiti businesses. We manage complete Google Business Profile optimization in both Arabic and English, including Arabic business name and description, district-level service areas, category alignment, and weekly content updates.
                  </p>
                  <p>
                    Our local SEO practice for Kuwait includes district-level landing pages ("Dental Clinic in Salmiya," "Car Service in Hawalli," "Legal Consultant in Kuwait City"), Arabic citation building on Kuwait Yellow Pages and local portals, and WhatsApp-based review generation workflows.
                  </p>
                  <p>
                    The Arabic SEO advantage in Kuwait is real and measurable. Because Arabic content competition remains low across most service categories, businesses that execute proper Arabic SEO frequently achieve page-one visibility within 6 to 8 weeks.
                  </p>
                </div>
              </div>

              {/* Parallax Card 1 */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/80 border border-[#0ea5e9]/20 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ea5e9]/10 blur-3xl rounded-full" />
                  
                  <div className="mb-8 border border-white/10 rounded-2xl p-6 bg-black/60 relative">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-[#9ca3af]">
                      <span>KUWAIT_SEO_METRICS</span>
                      <span className="text-[#0ea5e9] flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#0ea5e9] animate-pulse" />
                        6-8 WEEKS RANK
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { metric: "Local Pack Click Share", stat: "40-60% of Clicks", badge: "HIGH CONVERSION" },
                        { metric: "Arabic SEO Ranking Speed", stat: "6-8 Weeks Window", badge: "LOW DIFFICULTY" },
                        { metric: "District Targeting", stat: "Salmiya, Hawalli, Jabriya", badge: "DOMINANT" },
                      ].map((item, i) => (
                        <div key={i} className="p-4 border border-white/5 rounded-xl flex justify-between items-center bg-white/[0.02]">
                          <div>
                            <span className="text-sm font-bold text-white block uppercase">{item.metric}</span>
                            <span className="text-xs text-[#9ca3af]">{item.stat}</span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#0ea5e9]/20 text-[#0ea5e9] font-bold">{item.badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-white/5 pt-6 text-xs font-mono text-[#9ca3af]">
                    <div className="flex justify-between">
                      <span>GBP OPTIMIZATION:</span>
                      <span className="text-white">BILINGUAL ARABIC + EN</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TIME TO RANK:</span>
                      <span className="text-[#38bdf8] font-bold">2-3 MONTHS MAP PACK</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service 2: Custom Software & E-Commerce */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-white/5 pt-40"
            >
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#0ea5e9] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#0ea5e9]" />
                  WEB &amp; MOBILE DEVELOPMENT
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  Custom Software &amp; <br />
                  <span className="italic text-[#9ca3af]">KNET E-Commerce Stores</span>
                </h3>
                <div className="font-sans font-light text-[#9ca3af] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    We build bespoke web applications and SaaS platforms through our <Link to="/custom-software" className="text-[#38bdf8] underline hover:text-white transition-colors">custom software development Kuwait</Link> practice using Next.js, React, Node.js, and Laravel. Common builds include e-commerce platforms with native KNET integration, B2B portals, internal dashboards, and customer self-service systems.
                  </p>
                  <p>
                    Every build includes Arabic/English bilingual UI with proper RTL layout, Kuwait-compatible payment gateway integration, and performance optimization for Kuwait's mobile network conditions. We also deliver native and cross-platform <Link to="/mobile-app-development" className="text-[#38bdf8] underline hover:text-white transition-colors">mobile app development Kuwait</Link> solutions in Flutter with biometric authentication and KNET checkouts.
                  </p>
                </div>
              </div>

              {/* Parallax Card 2 */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/80 border border-[#0ea5e9]/20 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
                  <span className="text-xs font-mono text-[#0ea5e9] uppercase tracking-widest block mb-4">Kuwait Tech Capabilities</span>
                  <div className="space-y-3 text-xs font-mono">
                    <div className="p-3 rounded-lg bg-white/5 text-gray-200">✓ KNET &amp; MyFatoorah Gateways</div>
                    <div className="p-3 rounded-lg bg-white/5 text-gray-200">✓ Flutter iOS &amp; Android Apps</div>
                    <div className="p-3 rounded-lg bg-white/5 text-gray-200">✓ Arabic/English RTL Dashboards</div>
                    <div className="p-3 rounded-lg bg-white/5 text-gray-200">✓ CITRA Security Architecture</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service 3: AI Agents & WhatsApp Automation */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-white/5 pt-40"
            >
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono text-[#0ea5e9] uppercase tracking-widest">
                  <span className="h-px w-8 bg-[#0ea5e9]" />
                  CONVERSATIONAL AUTOMATION
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight uppercase">
                  AI Agents &amp; <br />
                  <span className="italic text-[#9ca3af]">WhatsApp Customer Automation</span>
                </h3>
                <div className="font-sans font-light text-[#9ca3af] leading-relaxed text-base md:text-lg space-y-6">
                  <p>
                    Through our specialized <Link to="/ai-agent-development" className="text-[#38bdf8] underline hover:text-white transition-colors">AI agent development Kuwait</Link> engineering, we build custom AI agents with Arabic conversational capability for Kuwaiti businesses. Typical deployments include WhatsApp-based customer support automation, appointment booking agents, and document processing for intake and compliance workflows.
                  </p>
                  <p>
                    Our agents are designed to handle Gulf Arabic dialects and switch effortlessly between Arabic and English based on customer preference.
                  </p>
                </div>
              </div>

              {/* Parallax Card 3 */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0">
                <div className="relative group p-8 rounded-3xl bg-zinc-950/80 border border-[#0ea5e9]/20 backdrop-blur-md overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
                  <span className="text-xs font-mono text-[#0ea5e9] uppercase tracking-widest block mb-4">Commercial Districts Covered</span>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Salmiya", "Hawalli", "Kuwait City", "Fahaheel", "Jabriya", "Mishref", "Farwaniya"].map(dist => (
                      <span key={dist} className="px-3 py-1.5 rounded-lg bg-black border border-white/10 text-xs font-mono text-gray-300">
                        {dist}
                      </span>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-[#9ca3af] leading-relaxed">
                    District-level landing pages paired with Google Maps optimization capture the 40-60% of search clicks currently going to competitors in your sector.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-32 px-6 md:px-10 bg-[#040508]">
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
                className="border border-white/5 bg-black/60 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#0ea5e9]/30"
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

          {/* Internal Links Matrix */}
          <div className="mt-20 pt-12 border-t border-white/5 space-y-8 text-left">
            <div>
              <h4 className="text-xs font-mono text-[#0ea5e9] uppercase tracking-[0.3em] font-bold mb-4">// RELATED SERVICES &amp; TECHNICAL DEEP DIVES</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <Link to="/local-seo-for-small-business" className="p-3 bg-[#080d14] hover:bg-white/5 rounded-lg text-[#8d9ba8] hover:text-[#0ea5e9] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Local SEO Services</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0ea5e9]" />
                </Link>
                <Link to="/local-seo-citation-building" className="p-3 bg-[#080d14] hover:bg-white/5 rounded-lg text-[#8d9ba8] hover:text-[#0ea5e9] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Citation Building</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0ea5e9]" />
                </Link>
                <Link to="/local-seo-audit" className="p-3 bg-[#080d14] hover:bg-white/5 rounded-lg text-[#8d9ba8] hover:text-[#0ea5e9] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Local SEO Audit</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0ea5e9]" />
                </Link>
                <Link to="/custom-software" className="p-3 bg-[#080d14] hover:bg-white/5 rounded-lg text-[#8d9ba8] hover:text-[#0ea5e9] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Custom Software</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0ea5e9]" />
                </Link>
                <Link to="/ai-agent-development" className="p-3 bg-[#080d14] hover:bg-white/5 rounded-lg text-[#8d9ba8] hover:text-[#0ea5e9] transition-colors border border-white/5 flex items-center justify-between">
                  <span>AI Agent Systems</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0ea5e9]" />
                </Link>
                <Link to="/web-development" className="p-3 bg-[#080d14] hover:bg-white/5 rounded-lg text-[#8d9ba8] hover:text-[#0ea5e9] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Web Development</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0ea5e9]" />
                </Link>
                <Link to="/saudi-arabia-market" className="p-3 bg-[#080d14] hover:bg-white/5 rounded-lg text-[#8d9ba8] hover:text-[#0ea5e9] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Saudi Arabia Market</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0ea5e9]" />
                </Link>
                <Link to="/contact" className="p-3 bg-[#080d14] hover:bg-white/5 rounded-lg text-[#8d9ba8] hover:text-[#0ea5e9] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Book Free SEO Audit</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0ea5e9]" />
                </Link>
              </div>
            </div>

            {/* External Regulatory References */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#7d8894]">
              <span className="uppercase tracking-widest text-[11px] font-bold text-zinc-400">Kuwait Regulatory References:</span>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://citra.gov.kw" target="_blank" rel="noopener noreferrer" className="hover:text-[#0ea5e9] transition-colors inline-flex items-center gap-1">
                  CITRA Data Protection Regulations <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://www.cbk.gov.kw" target="_blank" rel="noopener noreferrer" className="hover:text-[#0ea5e9] transition-colors inline-flex items-center gap-1">
                  Central Bank of Kuwait (CBK) <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://knet.com.kw" target="_blank" rel="noopener noreferrer" className="hover:text-[#0ea5e9] transition-colors inline-flex items-center gap-1">
                  KNET Payment Network <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Cinematic Call to Action */}
      <section className="py-44 relative border-t border-white/5 overflow-hidden text-center bg-black">
        <div className="absolute inset-0 bg-[#0ea5e9]/10 blur-[200px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 px-6">
          <h2 className="text-6xl md:text-[8rem] font-black text-white italic tracking-tighter uppercase leading-[0.85] mb-14">
            Build for <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #0ea5e9' }}>Kuwait 2035.</span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <Link 
              to="/contact"
              className="bg-[#0ea5e9] text-black text-2xl font-bold px-16 py-8 rounded-full hover:bg-white transition-all transform hover:scale-105 uppercase tracking-tighter shadow-2xl shadow-[#0ea5e9]/30"
            >
              Get a free Kuwait consultation
            </Link>
            <div className="text-[#38bdf8] font-mono text-xs uppercase tracking-[0.4em] max-w-[320px] text-left border-l-2 border-[#0ea5e9] pl-8 leading-relaxed h-16 flex items-center">
              SALMIYA &amp; KUWAIT CITY // AST (UTC+3) READY
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KuwaitMarketPage;

import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, ChevronRight, Globe, Layers, CheckCircle, 
  BookOpen, Compass, Shield, Zap, Sparkles, Phone, Mail, 
  MapPin, Clock, Star, ExternalLink, MessageCircle
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function CaseStudyTajweedPage() {
  const customBreadcrumbItems = [
    { name: 'Home', to: '/' },
    { name: 'Case Studies', to: '/case-studies' },
    { name: 'TajweedPage.com' }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#ccff00] selection:text-black">
      <Helmet>
        <title>Case Study: TajweedPage.com — AI EdTech Platform | AbuQitmirLabs</title>
        <meta name="description" content="How AbuQitmirLabs built the world's first AI-powered Quran learning platform with RAG technology, Next.js, and semantic SEO — delivered in 10 days." />
        <link rel="canonical" href="https://abuqitmirlabs.tech/case-studies/tajweedpage" />
        
        <meta property="og:title" content="Case Study: TajweedPage.com — AI EdTech Platform | AbuQitmirLabs" />
        <meta property="og:description" content="How AbuQitmirLabs built the world's first AI-powered Quran learning platform with RAG technology, Next.js, and semantic SEO — delivered in 10 days." />
        <meta property="og:url" content="https://abuqitmirlabs.tech/case-studies/tajweedpage" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://abuqitmirlabs.tech/logo.png" />
      </Helmet>

      <Header />

      {/* Breadcrumbs spacer and render */}
      <div className="relative pt-24 bg-black">
        <Breadcrumbs customItems={customBreadcrumbItems} />
      </div>

      {/* === SECTION 1: HERO === */}
      <section className="relative bg-black text-white pt-20 pb-32 overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-8">
          
          {/* Badges row */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 text-xs text-[#ccff00] uppercase tracking-widest font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse"></span>
              Live at tajweedpage.com
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-950/40 bg-emerald-950/20 text-xs text-emerald-400 uppercase tracking-widest font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              AI Center Active
            </span>
          </div>

          {/* Big heading with Cormorant Garamond */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif italic font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight max-w-5xl mx-auto tracking-tight"
          >
            How We Built the World's First AI-Powered Quran Learning Platform
          </motion.h1>

          {/* Subtext */}
          <p className="text-zinc-400 text-base md:text-lg lg:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Full-stack EdTech website, RAG-based AI Tajweed Teacher, and international SEO architecture — delivered in 10 days for TajweedPage Online Academy.
          </p>

          <div className="h-8"></div>

          {/* Metric Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-zinc-850 pt-12">
            {[
              { value: "10", label: "Days to Launch" },
              { value: "7+", label: "Course Pages Built" },
              { value: "20+", label: "Countries Targeted" },
              { value: "1st", label: "AI Tajweed Teacher Globally" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <span className="block font-mono text-4xl sm:text-5xl font-bold text-[#ccff00]">{stat.value}</span>
                <span className="block text-[10px] sm:text-xs uppercase tracking-widest text-zinc-400 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* === SECTION 2: THE CHALLENGE === */}
      <section className="py-24 md:py-32 bg-zinc-950 text-zinc-100 relative border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            <span className="block text-[10px] font-mono tracking-widest text-[#ccff00] uppercase font-bold">
              01 — The Challenge
            </span>
            <h2 className="font-serif italic font-light text-4xl sm:text-5xl leading-tight text-white tracking-tight">
              A Traditional Academy Entering a Competitive Global Market
            </h2>
            
            <div className="text-zinc-400 text-sm md:text-base leading-relaxed space-y-4 font-light">
              <p>
                TajweedPage Online Academy had certified scholars, authentic teaching methodology, and a growing student base — but zero digital presence. Their challenge was not just a website, but building a complete digital ecosystem capable of competing globally against well-funded EdTech platforms targeting Muslims in the USA, UK, Canada, and Australia.
              </p>
              <p>
                They needed to rank on Google for high-competition keywords like 'Online Quran Classes USA' and 'Female Quran Teacher Online', convert international visitors into paying students, and deploy something no Islamic EdTech platform had ever offered — an AI assistant trained on authentic Tajweed knowledge.
              </p>
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Globe className="text-[#ccff00]" size={24} />,
                  title: "Global Competition",
                  desc: "Competing against established platforms with large SEO budgets targeting English-speaking Muslim families worldwide."
                },
                {
                  icon: <Sparkles className="text-[#ccff00]" size={24} />,
                  title: "AI Integration Required",
                  desc: "Client wanted an AI Tajweed Teacher — a feature that had never been built in the online Quran learning space before."
                },
                {
                  icon: <Clock className="text-[#ccff00]" size={24} />,
                  title: "10-Day Deadline",
                  desc: "Full platform — website, AI, SEO, content architecture — needed to be live within 10 days for an upcoming enrollment campaign."
                },
                {
                  icon: <Shield className="text-[#ccff00]" size={24} />,
                  title: "Deep Domain Knowledge",
                  desc: "Building accurate AI responses about Islamic Tajweed rules required authentic scholarly sources — not generic LLM outputs."
                }
              ].map((card, idx) => (
                <div key={idx} className="p-8 rounded-3xl border border-zinc-850 bg-zinc-900/40 space-y-4 hover:shadow-lg transition-transform hover:-translate-y-1 duration-300 hover:border-zinc-800">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900/80 flex items-center justify-center shadow-sm border border-zinc-800">
                    {card.icon}
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white">{card.title}</h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* === SECTION 3: OUR SOLUTION === */}
      <section className="py-24 md:py-32 bg-black text-white border-b border-zinc-900 relative">
        <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="text-left space-y-4">
            <span className="block text-[10px] font-mono tracking-widest text-[#ccff00] uppercase font-bold">
              02 — Our Solution
            </span>
            <h2 className="font-serif italic font-light text-4xl sm:text-5xl leading-tight text-white tracking-tight">
              A Full-Stack EdTech Platform with Embedded AI
            </h2>
          </div>

          <div className="space-y-12">
            {[
              {
                num: "Item 01",
                tag: "NEXT.JS + REACT",
                tagColor: "bg-zinc-900 text-[#ccff00] border-zinc-800",
                title: "High-Performance Educational Website",
                desc: "Built a complete Next.js platform with server-side rendering for maximum SEO. Includes: homepage, 7 dedicated course pages (Tajweed Master Series, Hifz Program, Noorani Qaida, Female Quran Teacher, Quran Reading, Islamic Studies for Kids, Beginner Classes), blog/journal system, pricing page with 3 subscription tiers ($49/$89/$149), teacher profiles, free trial booking flow, admin dashboard, privacy policy and terms pages."
              },
              {
                num: "Item 02",
                tag: "RAG ARCHITECTURE",
                tagColor: "bg-emerald-950/40 text-emerald-400 border-emerald-900",
                title: "World's First AI Tajweed Teacher",
                desc: "Engineered a Retrieval-Augmented Generation (RAG) system at tajweedpage.com/ai — trained exclusively on TajweedPage's proprietary course content, Noorani Qaida lessons, Tajweed rules database, and verified FAQ library. The AI answers authentic questions about Noon Sakinah, Qalqalah, Madd rules, and Makharij — grounded strictly in Islamic scholarly sources with zero hallucinations. Includes: AI chat interface, suggested topics, voice recitation analyzer, learning path tracker, homework evaluator, and saved lessons system."
              },
              {
                num: "Item 03",
                tag: "SEMANTIC SEO",
                tagColor: "bg-blue-950/40 text-blue-400 border-blue-900",
                title: "International SEO Architecture for 20+ Countries",
                desc: "Deployed a complete semantic SEO strategy: dedicated geo-landing pages for USA, UK, Canada, Australia, Europe, UAE, Saudi Arabia. Full Schema markup (FAQPage, Course, Organization, BreadcrumbList). Canonical tags, OG/Twitter cards, Google Tag Manager, Google Analytics 4, Google Search Console verification, and keyword-optimized meta architecture targeting: 'Online Quran Classes USA', 'Female Quran Teacher Online', 'Quran Classes for Kids', 'Online Tajweed Course'."
              },
              {
                num: "Item 04",
                tag: "UX / DESIGN",
                tagColor: "bg-purple-950/40 text-purple-400 border-purple-900",
                title: "Conversion-Focused Design System",
                desc: "Designed a premium visual identity with cinematic hero sections, animated testimonial carousels with real family reviews, scroll-triggered pricing tables, trust signals (1000+ classes conducted, 20+ countries, certified tutors with Ijazah chains), and prominent conversion CTAs — Free Trial booking flow and WhatsApp direct contact — all optimized for international family enrollment."
              },
              {
                num: "Item 05",
                tag: "AI FEATURES",
                tagColor: "bg-amber-950/40 text-amber-400 border-amber-900",
                title: "Complete AI Learning Center Dashboard",
                desc: "Built a full interactive AI Center at /ai featuring: RAG chat interface with 8 suggested Tajweed topic buttons, voice recitation analyzer with diagnostic feedback, visual learning path (Noorani Qaida → Basic Tajweed → Tajweed Mastery), homework evaluator, saved lessons with local persistence, student profile card, and a human scholar escalation pathway — combining AI efficiency with authentic Islamic scholarship."
              }
            ].map((sol, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-10 p-8 rounded-3xl bg-zinc-950 border border-zinc-850 hover:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300">
                
                {/* Number & Tag column */}
                <div className="md:w-1/4 space-y-4">
                  <span className="block font-mono text-zinc-500 text-xs uppercase tracking-widest">{sol.num}</span>
                  <span className={`inline-block py-1 px-3 text-[9px] font-black uppercase tracking-widest rounded-full border ${sol.tagColor}`}>
                    {sol.tag}
                  </span>
                </div>

                {/* Text explanation */}
                <div className="md:w-3/4 space-y-3">
                  <h3 className="font-sans font-bold text-xl text-white tracking-tight">{sol.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-light">{sol.desc}</p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* === SECTION 4: TECH STACK === */}
      <section className="py-24 md:py-32 bg-zinc-950 text-white relative border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="block text-[10px] font-mono tracking-widest text-[#ccff00] uppercase font-bold">
              03 — Technology Stack
            </span>
            <h2 className="font-serif italic font-light text-4xl sm:text-5xl text-white tracking-tight text-center">
              Built With Industrial-Grade Technology
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">
              Every technology choice was deliberate — optimized for performance, SEO, and scalability in the competitive EdTech market.
            </p>
          </div>

          {/* Tech pills line wrapper */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto py-6 border-y border-zinc-855">
            {[
              "Next.js 14", "React", "TypeScript", "RAG Architecture", "LLM Integration", "Tailwind CSS", 
              "Framer Motion", "Google Tag Manager", "Schema Markup", "Vercel Edge Network", "Firebase", 
              "Vector Database", "Google Analytics 4", "Semantic SEO"
            ].map((tech, i) => (
              <span key={i} className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-semibold text-zinc-300 tracking-wide">
                {tech}
              </span>
            ))}
          </div>

          {/* Grid of 6 features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Zero Hallucination AI",
                desc: "RAG grounds all answers in verified TajweedPage course content — no fabricated Islamic rulings ever output to students."
              },
              {
                title: "Sub-2s Load Time",
                desc: "Vercel Edge Network + Next.js SSR ensures fast loading for students in USA, UK, Australia, and globally."
              },
              {
                title: "20+ Country Pages",
                desc: "Dedicated geo-landing pages for every major English-speaking Muslim market with localized content."
              },
              {
                title: "Full Analytics Stack",
                desc: "GA4 + GTM + Search Console — complete funnel tracking from landing to free trial booking."
              },
              {
                title: "Mobile-First Design",
                desc: "Fully responsive across all devices — critical for families accessing from smartphones globally."
              },
              {
                title: "Conversion Architecture",
                desc: "Every page ends with Free Trial CTA + WhatsApp link — engineered to convert visitors into enrolled students."
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl border border-zinc-850 bg-zinc-900/20 space-y-3">
                <span className="block font-mono text-zinc-500 text-xs">0{i+1} // SPEC</span>
                <h4 className="font-sans font-bold text-lg text-white">{item.title}</h4>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* === SECTION 5: RESULTS === */}
      <section className="bg-black text-white py-24 md:py-32 relative overflow-hidden border-b border-zinc-900">
        {/* Subtle geometric grid or light glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-20">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="block text-[10px] font-mono tracking-widest text-[#ccff00] uppercase font-bold">
              04 — Results
            </span>
            <h2 className="font-serif italic font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              A Complete Digital Transformation — In 10 Days
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-light">
              From zero digital presence to a fully operational AI-powered EdTech platform — live, optimized, and enrolling students from 20+ countries.
            </p>
          </div>

          {/* Grid of 6 result cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                head: "10 Days",
                title: "Full Launch Timeline",
                detail: "Homepage, AI Center, 7 course pages, SEO — all live and indexed"
              },
              {
                head: "7+",
                title: "Course Pages Built",
                detail: "Each with full Schema markup, canonical tags, and conversion CTAs"
              },
              {
                head: "20+",
                title: "Countries Targeted",
                detail: "USA, UK, Canada, Australia, UAE, Saudi Arabia, Europe and more"
              },
              {
                head: "1st",
                title: "AI Tajweed Teacher",
                detail: "World's first RAG-powered Islamic Tajweed AI — unique competitive advantage"
              },
              {
                head: "400+",
                title: "Families Enrolled",
                detail: "Active students from global markets using the platform"
              },
              {
                head: "0",
                title: "AI Hallucinations",
                detail: "RAG architecture ensures every answer is grounded in verified Islamic sources"
              }
            ].map((res, i) => (
              <div key={i} className="p-8 rounded-3xl border border-zinc-800 bg-zinc-950 flex flex-col justify-between group hover:border-[#ccff00]/20 transition-all duration-300">
                <div className="space-y-4">
                  <span className="block font-mono text-3xl sm:text-4xl text-[#ccff00] font-bold">{res.head}</span>
                  <h4 className="font-sans font-bold text-lg text-white">{res.title}</h4>
                </div>
                <p className="text-zinc-400 text-xs sm:text-sm mt-4 font-light leading-relaxed">{res.detail}</p>
              </div>
            ))}
          </div>

          {/* Testimonial block */}
          <div className="max-w-4xl mx-auto bg-zinc-950 border border-zinc-800 p-8 md:p-12 rounded-[2rem] space-y-6 text-center">
            <div className="flex justify-center gap-1 text-[#ccff00]">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} size={16} fill="currentColor" />
              ))}
            </div>
            
            <p className="font-serif italic font-light text-xl sm:text-2xl lg:text-3xl text-zinc-100 leading-relaxed max-w-3xl mx-auto">
              "AbuQitmirLabs transformed our vision into reality faster than we thought possible. The AI Tajweed teacher is unlike anything in the market — it genuinely understands Tajweed rules and guides students with authentic Islamic knowledge. Our international enrollment has grown significantly since launch."
            </p>

            <span className="block text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">
              — TajweedPage Online Academy, Karachi, Pakistan
            </span>
          </div>

        </div>
      </section>

      {/* === SECTION 6: DELIVERABLES + CTA === */}
      <section className="py-24 md:py-32 bg-zinc-950 text-white border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="block text-[10px] font-mono tracking-widest text-[#ccff00] uppercase font-bold">
                05 — Full Deliverables
              </span>
              <h2 className="font-serif italic font-light text-4xl sm:text-5xl leading-tight text-white tracking-tight">
                Everything Delivered — End to End
              </h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">
                This was not a template project. Every element was custom-engineered for the Islamic EdTech market.
              </p>
            </div>

            <div className="lg:col-span-1"></div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Full Next.js website with 15+ pages",
                  "RAG AI Tajweed Teacher (/ai)",
                  "7 dedicated course landing pages",
                  "Geo-landing pages for 20+ countries",
                  "Complete Schema markup (FAQ, Course, Organization)",
                  "Google Analytics 4 + GTM setup",
                  "Google Search Console integration",
                  "WhatsApp lead capture system",
                  "Free Trial booking flow",
                  "Pricing page with 3 subscription tiers",
                  "Teacher profiles page",
                  "Blog/Journal CMS system",
                  "Admin dashboard",
                  "Privacy Policy + Terms pages",
                  "Mobile-first responsive design",
                  "Vercel deployment + domain configuration"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                    <span className="text-xs sm:text-sm text-zinc-300 leading-tight font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <hr className="border-zinc-850" />

          {/* Final Call To Action section */}
          <div className="max-w-4xl mx-auto text-center space-y-8 pt-8">
            <h3 className="font-serif italic font-light text-4xl sm:text-5xl text-white">
              Ready to Build Something Like This?
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto font-light">
              Whether you need a full EdTech platform, AI integration, or SEO architecture — AbuQitmirLabs delivers world-class results, fast.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-extrabold uppercase text-xs tracking-widest px-8 py-4.5 rounded-full hover:bg-white hover:text-black transition-all transform active:scale-95 shadow-md animate-pulse"
              >
                <MessageCircle size={14} /> Start on WhatsApp
              </a>
              <a
                href="mailto:shiraz@abuqitmirlabs.tech"
                className="inline-flex items-center gap-2 bg-white text-black font-extrabold uppercase text-xs tracking-widest px-8 py-4.5 rounded-full hover:bg-zinc-200 transition-all transform active:scale-95 shadow-md"
              >
                <Mail size={14} /> Email Us
              </a>
            </div>

            <p className="text-zinc-500 text-xs tracking-wide">
              Free consultation • No commitment • Response within 2 hours
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

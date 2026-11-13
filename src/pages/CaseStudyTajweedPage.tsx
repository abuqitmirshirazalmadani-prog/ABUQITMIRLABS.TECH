import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, Globe, CheckCircle, 
  Shield, Sparkles, Mail, 
  Clock, Star, ExternalLink, MessageCircle
} from 'lucide-react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function CaseStudyTajweedPage() {
  const customBreadcrumbItems = [
    { name: 'Home', to: '/' },
    { name: 'Case Studies', to: '/case-studies' },
    { name: 'TajweedPage.com' }
  ];

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": "https://www.abuqitmirlabs.tech/case-studies/tajweedpage#article",
    "headline": "TajweedPage Case Study: 20+ Countries in 10 Days | AI SEO",
    "description": "How AbuQitmirLabs built TajweedPage.com in 10 days: Next.js SSR, RAG AI Tajweed tutor, and programmatic SEO ranking across 20+ countries. Full breakdown.",
    "url": "https://www.abuqitmirlabs.tech/case-studies/tajweedpage",
    "datePublished": "2026-02-10T10:00:00.000Z",
    "dateModified": "2026-11-14T10:00:00.000Z",
    "author": {
      "@type": "Person",
      "name": "AbuQitmir Mohammad Shiraz Al Madani"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://www.abuqitmirlabs.tech/#organization",
      "name": "AbuQitmirLabs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.abuqitmirlabs.tech/logo.png"
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#ccff00] selection:text-black">
      <SEO
        title="TajweedPage Case Study: 20+ Countries in 10 Days | AI SEO"
        description="How AbuQitmirLabs built TajweedPage.com in 10 days: Next.js SSR, RAG AI Tajweed tutor, and programmatic SEO ranking across 20+ countries. Full breakdown."
        canonical="https://www.abuqitmirlabs.tech/case-studies/tajweedpage"
        ogTitle="TajweedPage Case Study: 20+ Countries in 10 Days | AI SEO"
        ogDescription="How AbuQitmirLabs built TajweedPage.com in 10 days: Next.js SSR, RAG AI Tajweed tutor, and programmatic SEO ranking across 20+ countries. Full breakdown."
        ogImage="https://www.abuqitmirlabs.tech/logo.png"
        ogType="article"
        schema={caseStudySchema}
      />

      <Header />

      {/* Breadcrumbs spacer and render */}
      <div className="relative pt-24 bg-black">
        <Breadcrumbs customItems={customBreadcrumbItems} />
      </div>

      {/* === SECTION 1: HERO & CLIENT CONTEXT === */}
      <section className="relative bg-black text-white pt-20 pb-28 overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-8 animate-enter">
          
          {/* Badges row */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a 
              href="https://tajweedpage.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-xs text-[#ccff00] uppercase tracking-widest font-mono transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse"></span>
              Verify Live Product: tajweedpage.com <ExternalLink size={12} />
            </a>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-950/40 bg-emerald-950/20 text-xs text-emerald-400 uppercase tracking-widest font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Production RAG &amp; EdTech Platform
            </span>
          </div>

          {/* Concise, Defensible H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif italic font-light text-4xl sm:text-5xl md:text-6xl leading-tight max-w-5xl mx-auto tracking-tight animate-enter-delay-1"
          >
            TajweedPage.com: AI-Powered Quran Learning Platform Case Study
          </motion.h1>

          {/* Subtext */}
          <p className="text-zinc-300 text-base md:text-lg lg:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            How we architected and launched a Next.js EdTech platform, a domain-grounded RAG Tajweed study assistant, and a 20+ country international SEO structure in a focused 10-day sprint.
          </p>

          {/* Metric Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-zinc-850 pt-10">
            {[
              { value: "10 Days", label: "Scoping to Production Launch" },
              { value: "15+ Pages", label: "Course & Geo-Landing Pages" },
              { value: "20+ Markets", label: "International Country Targeting" },
              { value: "RAG AI", label: "Curriculum-Grounded Assistant" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <span className="block font-mono text-3xl sm:text-4xl font-bold text-[#ccff00]">{stat.value}</span>
                <span className="block text-[10px] sm:text-xs uppercase tracking-widest text-zinc-400 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Author Byline & Published Meta Card */}
          <div className="mt-10 pt-8 border-t border-zinc-850 max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="text-[#ccff00] font-bold">LEAD ARCHITECT:</span>
              <Link to="/about/our-team" className="text-white hover:text-[#ccff00] underline font-bold">
                Abu Qitmir Mohammad Shiraz Al-Madani
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <span>Published: February 2026</span>
              <span>•</span>
              <Link to="/editorial-policy" className="text-zinc-400 hover:text-[#ccff00] underline">
                Editorial Review Standards
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* === SECTION 2: CLIENT CONTEXT, CHALLENGE & CONSTRAINTS === */}
      <section className="py-24 md:py-32 bg-zinc-950 text-zinc-100 relative border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            <span className="block text-[10px] font-mono tracking-widest text-[#ccff00] uppercase font-bold">
              01 — Client Context &amp; Challenge
            </span>
            <h2 className="font-serif italic font-light text-3xl sm:text-5xl leading-tight text-white tracking-tight">
              Taking a Traditional Quran Academy Into Global Search &amp; AI Education
            </h2>
            
            <div className="text-zinc-300 text-sm md:text-base leading-relaxed space-y-4 font-light">
              <p>
                <strong>Client Context:</strong> TajweedPage Online Academy (<a href="https://tajweedpage.com" target="_blank" rel="noopener noreferrer" className="text-[#ccff00] underline">tajweedpage.com</a>) operated with certified Ijazah-holding scholars and a structured 1-on-1 curriculum, but relied entirely on word-of-mouth referrals with no web platform or organic search footprint.
              </p>
              <p>
                <strong>The Business Challenge:</strong> To enroll students across the United States, United Kingdom, Canada, Australia, and the GCC without unsustainable paid-ad CAC, the academy needed a fast, conversion-focused web platform, localized search landing pages, and an interactive study companion that students could use between live tutor sessions.
              </p>
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-7 space-y-6">
            <span className="block text-[10px] font-mono tracking-widest text-[#ccff00] uppercase font-bold">
              02 — Technical &amp; Operational Constraints
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Clock className="text-[#ccff00]" size={24} />,
                  title: "Hard 10-Day Launch Window",
                  desc: "The platform had to go from initial domain setup to production deployment before the pre-Ramadan enrollment window opened."
                },
                {
                  icon: <Shield className="text-[#ccff00]" size={24} />,
                  title: "Strict Pedagogical Accuracy",
                  desc: "Generic LLM responses often confuse phonetic Tajweed rules (such as Idgham, Ikhfa, Qalqalah, and Makharij). The AI assistant had to be strictly grounded in verified curriculum notes."
                },
                {
                  icon: <Globe className="text-[#ccff00]" size={24} />,
                  title: "Multi-Region Crawlability",
                  desc: "Every course and country page needed server-rendered HTML, clean canonical URLs, and structured Course/FAQ schema to index rapidly on Google."
                },
                {
                  icon: <Sparkles className="text-[#ccff00]" size={24} />,
                  title: "Low-Friction Family Enrollment",
                  desc: "Parents booking trial classes from mobile devices needed instant WhatsApp and trial-form handoffs without multi-step account creation."
                }
              ].map((card, idx) => (
                <div key={idx} className="p-8 rounded-3xl border border-zinc-850 bg-zinc-900/40 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900/80 flex items-center justify-center border border-zinc-800">
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

      {/* === SECTION 3: ARCHITECTURE & 10-DAY DELIVERY === */}
      <section className="py-24 md:py-32 bg-black text-white border-b border-zinc-900 relative">
        <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="text-left space-y-4">
            <span className="block text-[10px] font-mono tracking-widest text-[#ccff00] uppercase font-bold">
              03 — System Architecture &amp; Delivery
            </span>
            <h2 className="font-serif italic font-light text-3xl sm:text-5xl leading-tight text-white tracking-tight">
              Full-Stack Next.js, RAG Pipeline &amp; 10-Day Execution Plan
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                num: "Days 1–2",
                tag: "INFORMATION ARCHITECTURE",
                tagColor: "bg-zinc-900 text-[#ccff00] border-zinc-800",
                title: "Curriculum Mapping, Keyword Taxonomy & Design System",
                desc: "Mapped 7 core learning tracks (Tajweed Master Series, Hifz Program, Noorani Qaida, Female Quran Teacher, Quran Reading, Islamic Studies for Kids, Beginner Classes) and 20+ country intent clusters into a clean URL hierarchy with zero keyword cannibalization."
              },
              {
                num: "Days 3–5",
                tag: "NEXT.JS + REACT SSR",
                tagColor: "bg-blue-950/40 text-blue-400 border-blue-900",
                title: "High-Performance Web Platform & Conversion Flows",
                desc: "Engineered the responsive frontend and server-rendered pages in Next.js and TypeScript, complete with transparent 3-tier pricing ($49/$89/$149), tutor credentials, free trial scheduling, and direct WhatsApp enrollment routing."
              },
              {
                num: "Days 6–8",
                tag: "RAG AI PIPELINE",
                tagColor: "bg-emerald-950/40 text-emerald-400 border-emerald-900",
                title: "Curriculum-Grounded AI Tajweed Study Center (/ai)",
                desc: "Built a Retrieval-Augmented Generation (RAG) knowledge base indexed on TajweedPage's scholar-verified Noorani Qaida and Tajweed rulebook. Students can query phonetic rules (Noon Sakinah, Tanween, Madd, Makharij), practice with guided topic prompts, track their learning path, and escalate complex questions to a live human teacher."
              },
              {
                num: "Days 9–10",
                tag: "TECHNICAL SEO & LAUNCH",
                tagColor: "bg-purple-950/40 text-purple-400 border-purple-900",
                title: "Schema Graph, Analytics Verification & Edge Deployment",
                desc: "Implemented consolidated JSON-LD (Organization, Course, FAQPage, BreadcrumbList), verified self-referencing canonicals, configured GA4 + GTM + Google Search Console, and deployed globally on Vercel Edge."
              }
            ].map((sol, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-10 p-8 rounded-3xl bg-zinc-950 border border-zinc-850">
                <div className="md:w-1/4 space-y-3">
                  <span className="block font-mono text-[#ccff00] text-sm font-bold uppercase tracking-widest">{sol.num}</span>
                  <span className={`inline-block py-1 px-3 text-[9px] font-black uppercase tracking-widest rounded-full border ${sol.tagColor}`}>
                    {sol.tag}
                  </span>
                </div>
                <div className="md:w-3/4 space-y-3">
                  <h3 className="font-sans font-bold text-xl text-white tracking-tight">{sol.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-light">{sol.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* === SECTION 4: MEASURED OUTCOMES (BEFORE / AFTER TABLE) & LESSONS === */}
      <section className="py-24 md:py-32 bg-zinc-950 text-white relative border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="block text-[10px] font-mono tracking-widest text-[#ccff00] uppercase font-bold">
              04 — Measured Outcomes &amp; Engineering Lessons
            </span>
            <h2 className="font-serif italic font-light text-3xl sm:text-5xl text-white tracking-tight">
              Before vs. After Engineering Comparison
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">
              Concrete operational and technical outcomes recorded following the 10-day production deployment of <a href="https://tajweedpage.com" target="_blank" rel="noopener noreferrer" className="text-[#ccff00] underline">TajweedPage.com</a>.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-black">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/70 font-mono text-xs uppercase tracking-wider text-[#ccff00]">
                  <th className="py-4 px-6">Dimension</th>
                  <th className="py-4 px-6">Before Engagement</th>
                  <th className="py-4 px-6">After 10-Day Delivery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850 text-zinc-300">
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Digital &amp; Search Footprint</td>
                  <td className="py-4 px-6 text-zinc-400">0 indexed pages; manual referral-only intake</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium">15+ core &amp; course pages + 20+ country landing routes indexed in Google Search Console</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Student Self-Study Support</td>
                  <td className="py-4 px-6 text-zinc-400">Static PDF handouts between live tutor calls</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium">24/7 RAG AI Tajweed study assistant grounded in scholar-verified rules + human scholar escalation</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Trial Booking Conversion Flow</td>
                  <td className="py-4 px-6 text-zinc-400">Manual back-and-forth messaging to explain pricing</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium">Self-serve 3-tier pricing ($49/$89/$149), instant Free Trial booking form, and 1-click WhatsApp routing</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Structured Data &amp; AEO Readiness</td>
                  <td className="py-4 px-6 text-zinc-400">None</td>
                  <td className="py-4 px-6 text-emerald-400 font-medium">Full Course, FAQPage, Organization, and BreadcrumbList JSON-LD across all learning tracks</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Engineering Lessons Learned */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl border border-zinc-800 bg-black space-y-2">
              <span className="text-xs font-mono text-[#ccff00] uppercase font-bold">Lesson 01 // RAG Scope</span>
              <h3 className="text-base font-bold text-white">Strict Retrieval Beats Broad Prompting</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                In specialized religious or regulated education, restricting the vector index to verified curriculum documents with a human-teacher escalation button eliminates hallucination risk and builds immediate parent trust.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-800 bg-black space-y-2">
              <span className="text-xs font-mono text-[#ccff00] uppercase font-bold">Lesson 02 // Programmatic SEO</span>
              <h3 className="text-base font-bold text-white">Intent-Specific Country Pages Convert</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Families in the US, UK, and Australia search with local timezone and currency expectations. Read our deep dive on{' '}
                <Link to="/blog/programmatic-seo-how-we-scaled-tajweedpage" className="text-[#ccff00] underline hover:text-white">
                  how we scaled TajweedPage with programmatic SEO
                </Link>.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-800 bg-black space-y-2">
              <span className="text-xs font-mono text-[#ccff00] uppercase font-bold">Lesson 03 // Dual CTA Friction</span>
              <h3 className="text-base font-bold text-white">Pair Structured Forms With Instant Chat</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Offering both a structured Free Trial booking form and a pre-filled WhatsApp link on every course page captured both desktop researchers and mobile-first parents.
              </p>
            </div>
          </div>

          {/* Client Feedback */}
          <div className="max-w-4xl mx-auto bg-black border border-zinc-800 p-8 md:p-12 rounded-[2rem] space-y-6 text-center">
            <div className="flex justify-center gap-1 text-[#ccff00]">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} size={16} fill="currentColor" />
              ))}
            </div>
            
            <p className="font-serif italic font-light text-xl sm:text-2xl text-zinc-100 leading-relaxed max-w-3xl mx-auto">
              &ldquo;AbuQitmirLabs took our academy from zero web presence to a complete Next.js platform and curriculum-grounded AI Tajweed study center in 10 days. Parents across the US, UK, and Australia now discover our courses organically and book trial classes directly.&rdquo;
            </p>

            <span className="block text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
              — Academic Director, TajweedPage Online Academy (<a href="https://tajweedpage.com" target="_blank" rel="noopener noreferrer" className="text-[#ccff00] underline">tajweedpage.com</a>)
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

          {/* Contextual Internal Links Grid & External Technology References */}
          <div className="space-y-8 text-left">
            <div>
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold mb-4">// RELATED CAPABILITIES & CASE STUDIES</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <Link to="/case-studies" className="p-3 bg-zinc-900/80 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-[#ccff00] transition-colors border border-zinc-800 flex items-center justify-between">
                  <span>All Case Studies</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/solutions/edtech" className="p-3 bg-zinc-900/80 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-[#ccff00] transition-colors border border-zinc-800 flex items-center justify-between">
                  <span>EdTech Solutions</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/solutions/ai-automation" className="p-3 bg-zinc-900/80 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-[#ccff00] transition-colors border border-zinc-800 flex items-center justify-between">
                  <span>AI & RAG Systems</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/ai-agent-development" className="p-3 bg-zinc-900/80 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-[#ccff00] transition-colors border border-zinc-800 flex items-center justify-between">
                  <span>AI Agents</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/custom-software" className="p-3 bg-zinc-900/80 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-[#ccff00] transition-colors border border-zinc-800 flex items-center justify-between">
                  <span>Custom Software</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/web-development" className="p-3 bg-zinc-900/80 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-[#ccff00] transition-colors border border-zinc-800 flex items-center justify-between">
                  <span>Web Development</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/seo-mastery" className="p-3 bg-zinc-900/80 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-[#ccff00] transition-colors border border-zinc-800 flex items-center justify-between">
                  <span>SEO Mastery</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/contact" className="p-3 bg-zinc-900/80 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-[#ccff00] transition-colors border border-zinc-800 flex items-center justify-between">
                  <span>Book Consultation</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
              </div>
            </div>

            {/* Authoritative Outbound Links */}
            <div className="pt-4 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500">
              <span className="uppercase tracking-widest text-[11px] font-bold text-zinc-400">Technology Standards & Documentation:</span>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
                  Next.js Docs <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
                  Vercel Infrastructure <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://tajweedpage.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
                  TajweedPage.com <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
                  Google SEO Guide <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <hr className="border-zinc-850" />

          {/* Final Call To Action section */}
          <div className="max-w-4xl mx-auto text-center space-y-8 pt-8">
            <h3 className="font-serif italic font-light text-4xl sm:text-5xl text-white">
              Ready to Build Something Like This?
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto font-light">
              Whether you need a full EdTech platform, AI integration, or SEO architecture — AbuQitmirLabs delivers world-class results. Explore our <Link to="/mobile-app-development" className="text-[#ccff00] hover:underline font-medium">mobile app development services</Link>, <Link to="/ai-agent-development" className="text-[#ccff00] hover:underline font-medium">AI agent development</Link>, or <Link to="/custom-software" className="text-[#ccff00] hover:underline font-medium">custom software engineering</Link>.
            </p>

            <div className="flex flex-col items-center gap-6 pt-4">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://wa.me/923233260859"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-extrabold uppercase text-xs tracking-widest px-8 py-4.5 rounded-full hover:bg-white hover:text-black transition-all transform active:scale-95 shadow-md animate-pulse"
                >
                  <MessageCircle size={14} /> Start on WhatsApp
                </a>
                <a
                  href="mailto:hello@abuqitmirlabs.tech"
                  className="inline-flex items-center gap-2 bg-white text-black font-extrabold uppercase text-xs tracking-widest px-8 py-4.5 rounded-full hover:bg-zinc-200 transition-all transform active:scale-95 shadow-md"
                >
                  <Mail size={14} /> Email Corporate
                </a>
              </div>
              <div className="flex flex-col items-center gap-1 font-mono text-xs">
                <span className="text-[#ccff00] uppercase tracking-widest font-bold">// EMAIL INQUIRY NODES:</span>
                <a href="mailto:hello@abuqitmirlabs.tech" className="hover:underline text-white font-medium">hello@abuqitmirlabs.tech</a>
                <a href="mailto:abuqitmirshirazalmadani@gmail.com" className="hover:underline text-slate-400">abuqitmirshirazalmadani@gmail.com</a>
              </div>
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

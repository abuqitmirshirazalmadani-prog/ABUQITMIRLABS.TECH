"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  PenTool, 
  Search, 
  Target, 
  FileText, 
  Mail, 
  Plus,
  BarChart3,
  BookOpen,
  Quote,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MousePointer2,
  Layers,
  Globe,
  Check,
  ChevronRight,
  Clock,
  Layout,
  FileSpreadsheet,
  ShieldCheck,
  Award,
  Sparkle
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CountryMarquee from '../components/CountryMarquee';
import Breadcrumbs from '../components/Breadcrumbs';
import ContentWritingPricing from '../components/ContentWritingPricing';

// Custom interactive 3D Editorial Tin component representing high-value physical-like creative formulas
const EditorialTin = ({ 
  formula, 
  title, 
  tag, 
  color, 
  volume = "NET WT. 1000 WD", 
  purity = "99.8% EEAT" 
}: { 
  formula: string, 
  title: string, 
  tag: string, 
  color: 'emerald' | 'amber' | 'purple' | 'platinum',
  volume?: string,
  purity?: string
}) => {
  const colorMap = {
    emerald: {
      bg: "from-emerald-500/10 via-emerald-950/20 to-neutral-950",
      glow: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      accent: "text-emerald-400",
      solidAccent: "#10b981",
    },
    amber: {
      bg: "from-amber-500/10 via-amber-950/20 to-neutral-950",
      glow: "bg-amber-500/10",
      border: "border-amber-500/20",
      accent: "text-amber-400",
      solidAccent: "#f59e0b",
    },
    purple: {
      bg: "from-purple-500/10 via-purple-950/20 to-neutral-950",
      glow: "bg-purple-500/10",
      border: "border-purple-500/20",
      accent: "text-purple-400",
      solidAccent: "#a855f7",
    },
    platinum: {
      bg: "from-zinc-400/10 via-zinc-900/20 to-neutral-950",
      glow: "bg-zinc-400/5",
      border: "border-zinc-500/20",
      accent: "text-zinc-300",
      solidAccent: "#d4d4d8",
    }
  };

  const selected = colorMap[color];

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      animate={{
        y: [-8, 8, -8],
      }}
      transition={{
        y: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      className="relative w-64 h-[22rem] mx-auto flex items-center justify-center pointer-events-auto z-10"
    >
      {/* Glow Backing */}
      <div className={`absolute -inset-6 rounded-[3rem] ${selected.glow} filter blur-[60px] opacity-60 animate-pulse`} />
      
      {/* Outer physical container */}
      <div className={`relative w-60 h-80 rounded-[3rem] bg-gradient-to-b ${selected.bg} border ${selected.border} backdrop-blur-xl flex flex-col justify-between p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden`}>
        {/* Shiny Refractive Sheen line */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-[marquee_15s_linear_infinite]" />
        
        {/* Metal Top Lid */}
        <div className="w-full h-5 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center shadow-inner relative">
          <div className="w-11/12 h-3 rounded-full bg-zinc-950/80 border-b border-white/5 flex items-center justify-center">
            <div className="w-8 h-1 bg-zinc-800 rounded-full" />
          </div>
        </div>

        {/* High-End Apothecary Minimal Label */}
        <div className="flex-1 my-3 border border-white/5 rounded-2xl bg-black/50 p-4 flex flex-col justify-between items-center text-center relative">
          <div className="flex items-center gap-1">
            <Sparkle size={6} className={selected.accent} />
            <span className="text-[8px] font-mono tracking-[0.3em] text-neutral-500 uppercase font-black">ABUQITMIR LABS</span>
          </div>

          <div className="my-auto space-y-1">
            <span className={`text-[10px] font-mono font-black tracking-widest uppercase ${selected.accent}`}>{formula}</span>
            <h4 className="font-serif italic text-2xl text-white font-light leading-none tracking-wide">{title}</h4>
            <div className="h-[1px] w-8 bg-white/10 mx-auto my-2" />
            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block">{tag}</span>
          </div>

          <div className="w-full border-t border-white/15 pt-2.5 flex justify-between text-[7.5px] font-mono text-neutral-500 font-bold uppercase">
            <span>{volume}</span>
            <span>{purity}</span>
          </div>
        </div>

        {/* Metal Base Lid */}
        <div className="w-full h-5 rounded-full bg-neutral-900 border border-white/10 shadow-md flex items-center justify-center">
          <div className="w-11/12 h-2 bg-zinc-950 border-t border-white/5 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
};

const ContentWritingPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const services = [
    {
      id: "01",
      formula: "FORMULA B-100",
      tag: "Organic Growth Catalyst",
      color: "emerald" as const,
      title: "📝 Blog & Article Writing",
      quote: "Content that ranks and engages.",
      desc: "We create compelling, SEO-optimized blog posts and articles that drive organic traffic and establish your authority. This includes:",
      items: [
        "SEO Blog Posts: Keyword-rich, value-driven articles that rank on search engines",
        "Thought Leadership Articles: In-depth pieces that position you as an industry expert",
        "Guest Posts: High-quality content for external publications",
        "Listicles & How-To Guides: Engaging, actionable content that resonates with readers"
      ],
      deliverable: "SEO-optimized, publish-ready articles."
    },
    {
      id: "02",
      formula: "FORMULA C-200",
      tag: "Psychological Copy Craft",
      color: "amber" as const,
      title: "🖥️ Website Copywriting",
      quote: "Words that convert.",
      desc: "We craft persuasive, user-focused copy for your website that communicates your value proposition and drives conversions:",
      items: [
        "Homepage Copy: Compelling introductions that capture attention",
        "Service Page Copy: Clear, benefit-focused descriptions",
        "About Us Page: Brand storytelling that builds connection",
        "Landing Page Copy: Conversion-optimized content for specific campaigns"
      ],
      deliverable: "Strategically written, conversion-focused website copy."
    },
    {
      id: "03",
      formula: "FORMULA M-300",
      tag: "Attention Architecture",
      color: "purple" as const,
      title: "📊 Marketing & Collateral Content",
      quote: "Content that tells your story.",
      desc: "We create compelling marketing materials that communicate your brand's value across multiple channels:",
      items: [
        "Email Newsletters: Engaging content that builds relationships",
        "Social Media Posts: Bite-sized, shareable content for all platforms",
        "Brochures & Flyers: Print and digital collateral",
        "Case Studies: Success stories that build trust and credibility"
      ],
      deliverable: "Ready-to-use marketing content assets."
    },
    {
      id: "04",
      formula: "FORMULA T-400",
      tag: "Scientific System Logic",
      color: "platinum" as const,
      title: "🧠 Technical & Industry Content",
      quote: "Content for the experts.",
      desc: "We specialize in creating high-quality, technically accurate content for complex industries:",
      items: [
        "Whitepapers: In-depth research and analysis",
        "Technical Articles: Detailed explanations of complex topics",
        "Industry Reports: Data-driven insights and trends",
        "Product Documentation: Clear, user-friendly guides"
      ],
      deliverable: "Research-backed, technically accurate content."
    }
  ];

  const contentProcess = [
    {
      step: "01",
      title: "🔍 Discovery & Research",
      quote: "Understand before you write.",
      desc: "We begin by understanding your business goals, target audience, brand voice, and competitive landscape. This phase includes:",
      items: [
        "Brand Voice Audit: Analyzing your current content and tone",
        "Audience Research: Understanding your readers' needs and pain points",
        "Keyword Research: Identifying high-value, relevant keywords",
        "Competitor Analysis: Understanding the content landscape in your industry"
      ],
      deliverable: "Content strategy brief and keyword list."
    },
    {
      step: "02",
      title: "📝 Content Creation",
      quote: "Creativity meets strategy.",
      desc: "Our writers craft compelling, SEO-optimized content that aligns with your brand and business goals:",
      items: [
        "Drafting: Creating the first draft with strategic integration of keywords",
        "SEO Optimization: Incorporating target keywords naturally and effectively",
        "Visual Integration: Suggesting images, infographics, or videos for enhancement",
        "Feedback Loop: Iterative refinement based on your input"
      ],
      deliverable: "First draft of content."
    },
    {
      step: "03",
      title: "🔎 Review & Refinement",
      quote: "Perfection through revision.",
      desc: "We refine the content to ensure accuracy, clarity, and impact:",
      items: [
        "Editing: Checking for grammar, flow, and readability",
        "Fact-Checking: Ensuring accuracy of all claims and data",
        "SEO Check: Verifying keyword usage and meta-optimization",
        "Plagiarism Check: Ensuring originality"
      ],
      deliverable: "Polished, publish-ready content."
    },
    {
      step: "04",
      title: "📤 Delivery & Implementation",
      quote: "From draft to distribution.",
      desc: "We deliver ready-to-use content and support implementation:",
      items: [
        "Content Delivery: Providing content in your preferred format",
        "CMS Integration: Uploading content to your CMS (if needed)",
        "Performance Tracking: Setting up analytics to measure content performance",
        "Continuous Optimization: Refining content based on performance data"
      ],
      deliverable: "Published and tracked content."
    }
  ];

  const tools = [
    { category: "Semantic SEO Tools", items: ["SurferSEO", "Clearscope", "Ahrefs"], icon: <BarChart3 /> },
    { category: "Grammar & Readability", items: ["Grammarly Premium", "Hemingway App"], icon: <PenTool /> },
    { category: "Plagiarism & AI Checks", items: ["Copyscape", "Originality.ai"], icon: <CheckCircle2 /> },
    { category: "Content Management", items: ["Google Docs", "Notion", "WordPress"], icon: <BookOpen /> }
  ];

  const faqData = [
    {
      q: "What is content writing, and why is it important for my business?",
      a: "Content writing is the art of creating valuable, relevant content that attracts, engages, and converts your target audience. It helps your brand build authority, improve SEO, and communicate effectively with potential customers. Our content writing services ensure your brand's message is heard loud and clear."
    },
    {
      q: "What content writing services do you offer?",
      a: "We offer a comprehensive range of professional content writing services including: Blog and article writing, Website copywriting, Marketing and collateral content, Technical and industry content, Whitepapers and case studies."
    },
    {
      q: "How much does professional content writing cost?",
      a: "Costs vary based on scope and complexity. For example, a 500-word blog post starts at $50–$150, while a 1,000-word article with research ranges from $100–$250. Our SEO content writing pricing is transparent with clear deliverables at every tier."
    },
    {
      q: "How do you ensure content is SEO-optimized?",
      a: "We conduct thorough keyword research and strategically incorporate target keywords naturally throughout the content. Our SEO content writing approach includes meta-optimization, internal linking, and readability enhancements."
    },
    {
      q: "How long does a typical project take?",
      a: "Timelines vary based on scope. A blog post typically takes 1–2 weeks, while a comprehensive whitepaper may take 3–4 weeks. Our discovery phase helps determine accurate timelines."
    },
    {
      q: "Do you work with international clients?",
      a: "Absolutely. We serve clients across the United States, United Kingdom, and Europe. Our content team is experienced in working with international brands and understanding diverse market preferences."
    }
  ];

  return (
    <div className="bg-[#030303] text-neutral-200 font-sans antialiased overflow-x-hidden min-h-screen relative selection:bg-[#ccff00] selection:text-black">
      <Helmet>
        <title>Content Writing Services | Professional Content Writing Company | AbuQitmirLabs</title>
        <meta name="description" content="AbuQitmirLabs offers professional content writing services, including SEO content writing, blog writing services, and copywriting services in the USA, UK, and Europe." />
        <link rel="canonical" href="https://abuqitmirlabs.tech/content-writing" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Content Writing Services | Professional Content Writing Company | AbuQitmirLabs" />
        <meta property="og:description" content="AbuQitmirLabs offers professional content writing services, including SEO content writing, blog writing services, and copywriting services." />
        <meta property="og:url" content="https://abuqitmirlabs.tech/content-writing" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Content Writing Services | Professional Content Writing Company | AbuQitmirLabs" />
        <meta name="twitter:description" content="AbuQitmirLabs offers professional content writing services, including SEO content writing, blog writing services, and copywriting services." />
        <meta name="twitter:image" content="https://abuqitmirlabs.tech/logo.png" />

        {/* Schema Markup */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Professional Content Writing Services",
                "description": "We craft E-E-A-T focused, meticulously researched content writing that satisfies complex search engine algorithms and builds genuine trust.",
                "provider": {
                  "@type": "Organization",
                  "name": "AbuQitmirLabs",
                  "url": "https://abuqitmirlabs.tech"
                },
                "serviceType": "Content Strategy",
                "areaServed": ["US", "UK", "Europe", "Global"]
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

      {/* Luxury Film Grain Texture Overlay */}
      <div className="noise-overlay" />

      <Header />
      
      <div className="pt-24 bg-[#030303]">
        <Breadcrumbs />
      </div>

      {/* Floating Aesthetic Background Element */}
      <div className="fixed right-1/4 top-48 pointer-events-none z-0 opacity-[0.02] hidden lg:block">
        <PenTool size={650} strokeWidth={0.5} className="text-white" />
      </div>

      {/* SECTION 1: HERO / INTRODUCTION */}
      <section className="relative min-h-[95vh] flex items-center pt-20 pb-32 overflow-hidden bg-gradient-to-b from-[#030303] via-[#070707] to-[#030303]">
        {/* Soft atmospheric radial backing */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#ccff00]/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full relative z-10 text-center">
            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-neutral-900/60 border border-white/5 backdrop-blur-md"
            >
                <Sparkles size={12} className="text-[#ccff00]" />
                <span className="text-[9px] font-mono font-bold tracking-[0.25em] uppercase text-neutral-400">ABUQITMIR LABS // EDITORIAL SUITE</span>
            </motion.div>

            <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.9 }}
                className="text-4xl md:text-6xl lg:text-8xl font-serif leading-[1.05] tracking-tight text-white mb-10"
            >
                Content Writing: <br />
                <span className="text-neutral-400 italic font-light">Words That Drive Engagement &amp; Authority</span>
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="max-w-4xl mx-auto text-neutral-300 font-light leading-relaxed mb-12"
            >
              <p className="text-base md:text-lg text-neutral-400 max-w-3xl mx-auto font-sans">
                Content that ranks and content that converts aren't always the same thing — we write for both. Our writers research your industry deeply enough to write specifics, not filler, whether it's technical documentation or marketing copy.
              </p>
            </motion.div>

            {/* Core Capabilities Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mx-auto mb-16 max-w-4xl border-y border-white/5 py-8 px-6 bg-white/[0.01] backdrop-blur-sm rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-left">
                {[
                  "SEO-Optimized Blog & Article Writing",
                  "Website & Landing Page Copywriting",
                  "Technical Documentation & Case Studies",
                  "Email & Marketing Sequence Writing",
                  "Social Media Content Calendars"
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 group-hover:bg-[#ccff00] transition-colors duration-300" />
                    <span className="text-sm font-sans font-light text-slate-300 tracking-tight leading-relaxed group-hover:text-white transition-colors duration-300">{bullet}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3, duration: 0.8 }}
               className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
                <a 
                  href="https://wa.me/923233260859"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-[#ccff00] text-black font-mono font-bold uppercase tracking-widest text-[11px] rounded-full hover:bg-white hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-[0_15px_30px_rgba(204,255,0,0.15)] cursor-pointer"
                >
                    Order High-Quality Content
                    <ArrowRight size={14} />
                </a>
                <button 
                  onClick={() => {
                    const el = document.getElementById('content-pricing');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-10 py-5 bg-transparent text-white border border-white/10 font-mono font-bold uppercase tracking-widest text-[11px] rounded-full hover:bg-white/5 hover:border-white/35 transition-all duration-300 cursor-pointer"
                >
                    Read Our Content Packages
                </button>
            </motion.div>
        </div>
      </section>

      {/* Cinematic Marquee Section */}
      <div className="bg-black py-10 w-full overflow-hidden border-y border-white/5">
        <div className="flex whitespace-nowrap w-max animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-20 items-center px-10">
              <span className="text-2xl md:text-4xl font-serif tracking-tight text-white uppercase opacity-20 italic">seo-optimized technical writing</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00]/40" />
              <span className="text-2xl md:text-4xl font-serif tracking-tight text-white uppercase opacity-60">strategic b2b blog posts</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00]/40" />
              <span className="text-2xl md:text-4xl font-serif tracking-tight text-transparent uppercase italic" style={{ WebkitTextStroke: '0.8px rgba(255,255,255,0.4)' }}>conversion copywriting</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00]/40" />
              <span className="text-2xl md:text-4xl font-serif tracking-tight text-white uppercase opacity-20 italic">eeat-compliant content</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00]/40" />
              <span className="text-2xl md:text-4xl font-serif tracking-tight text-white uppercase opacity-60">data-driven articles</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00]/40" />
              <span className="text-2xl md:text-4xl font-serif tracking-tight text-transparent uppercase italic" style={{ WebkitTextStroke: '0.8px rgba(255,255,255,0.4)' }}>niche marketing strategy</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00]/40" />
              <span className="text-2xl md:text-4xl font-serif tracking-tight text-white uppercase opacity-20 italic">guest post writing service</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: THE PROBLEM / OPPORTUNITY */}
      <section className="py-24 md:py-40 px-6 bg-[#060606] relative overflow-hidden">
        {/* Neon accent grid element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00]/3 blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-6 space-y-6"
            >
                <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.4em] mb-4">// EDITORIAL DISSONANCE</div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-[1.1] uppercase">
                   Is your content invisible, <br />
                   <span className="text-neutral-500 italic font-light">or worse, ineffective?</span>
                </h2>
                <div className="w-20 h-[1px] bg-[#ccff00]/40" />
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="lg:col-span-6 bg-neutral-900/40 border border-white/5 p-8 md:p-12 rounded-[2.5rem] relative backdrop-blur-md"
            >
                <Quote className="absolute -top-4 -left-4 text-white/5 w-12 h-12" />
                <p className="text-base md:text-lg font-light text-neutral-300 leading-relaxed italic">
                   Many businesses struggle with content that fails to engage, rank, or convert. Generic, poorly researched articles and sales-heavy copy do more harm than good—they waste your budget, dilute your brand authority, and fail to connect with your audience.
                </p>
            </motion.div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 border-t border-white/5 pt-20">
          <h3 className="text-xl md:text-2xl font-serif text-white tracking-wide uppercase mb-12">
            The AbuQitmirLabs Difference:
          </h3>
          <p className="text-base text-neutral-400 max-w-4xl mb-12 leading-relaxed">
            Our <strong className="text-[#ccff00] font-bold">blog writing services</strong> and <strong className="text-[#ccff00] font-bold">copywriting services</strong> are built on a foundation of deep research, strategic planning, and creative excellence. We deliver:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Audience-Centric Content", desc: "Writing that speaks directly to your target audience with precise intent." },
              { title: "SEO-Optimized Copy", desc: "Content structurally tuned to rank high and capture qualified organic traffic." },
              { title: "Brand-Aligned Voice", desc: "Consistent brand tone that meticulously reflects your corporate personality." },
              { title: "Actionable Results", desc: "High-persuasion copywriting designed to seamlessly convert readers into active customers." }
            ].map((diff, i) => (
              <div key={i} className="bg-neutral-950 border border-white/5 p-8 rounded-2xl hover:border-white/15 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-300">
                <span className="text-[9px] font-mono text-[#ccff00]/60 block mb-3">// 0{i+1} difference</span>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">{diff.title}</h4>
                <p className="text-xs font-light leading-relaxed text-neutral-400">{diff.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-neutral-950 via-neutral-900/50 to-neutral-950 border border-white/5 p-8 md:p-10 rounded-[2.5rem] text-center max-w-4xl mx-auto shadow-2xl">
            <p className="text-base md:text-lg font-light text-neutral-300 leading-relaxed">
              Our <strong className="text-[#ccff00] font-bold">article writing services</strong> ensure your brand's message is not just heard but remembered.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR CONTENT SERVICES (Reimagined as One Product Per Scroll Section) */}
      <section className="py-24 bg-[#030303] text-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.5em] block mb-4">[ SECTION 3: EDITORIAL PORTFOLIO ]</span>
          <h2 className="text-4xl md:text-7xl font-serif font-light text-white tracking-tight uppercase leading-[0.9] mb-6">
            OUR CONTENT SERVICES
          </h2>
          <p className="text-neutral-400 max-w-2xl text-base md:text-lg font-light">
            We offer a comprehensive range of content writing services that cover every aspect of your content marketing strategy. Each formula is crafted as an independent masterpiece.
          </p>
          <div className="w-full h-[1px] bg-white/5 mt-12" />
        </div>

        {/* 1 Product / Service per Widescreen Section */}
        <div className="space-y-40">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className="relative py-20 bg-gradient-to-b from-[#030303] to-[#070707] border-y border-white/[0.02]"
            >
              {/* Parallax ambient backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
              
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                {/* Visual Editorial Tin Model Column */}
                <div className="lg:col-span-5 order-last lg:order-first">
                  <EditorialTin 
                    formula={service.formula}
                    title={service.title.split(" ").slice(1).join(" ")}
                    tag={service.tag}
                    color={service.color}
                  />
                </div>

                {/* Content Copy Column */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#ccff00] bg-[#ccff00]/10 px-3 py-1 rounded-full border border-[#ccff00]/20">0{idx + 1}</span>
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">{service.formula} // ARCHIVE</span>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-white uppercase">
                    {service.title}
                  </h3>

                  <em className="text-[#ccff00] font-serif text-lg md:text-xl block italic font-light">
                    "{service.quote}"
                  </em>

                  <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed">
                    {service.desc}
                  </p>

                  <ul className="space-y-4 pt-2">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3.5 text-xs md:text-sm text-neutral-400 font-light leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shrink-0 mt-2 shadow-[0_0_8px_#ccff00]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="py-2.5 px-4 bg-white/[0.02] border border-white/5 rounded-xl">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">Guaranteed Deliverable</span>
                      <p className="text-xs font-mono text-[#ccff00] font-bold uppercase">{service.deliverable}</p>
                    </div>

                    <a 
                      href={`https://wa.me/923233260859?text=Hello,%20I'm%20interested%20in%20your%20${encodeURIComponent(service.title)}%20(${service.formula}).%20Let's%20discuss%20further.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono text-white hover:text-[#ccff00] transition-colors uppercase tracking-wider group"
                    >
                      <span>Acquire Service</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: OUR CONTENT PROCESS */}
      <section className="py-24 md:py-40 px-6 bg-[#060606] border-y border-white/5 relative z-10">
         <div className="max-w-7xl mx-auto">
           <div className="mb-20 text-center">
             <span className="text-xs font-mono text-neutral-500 uppercase tracking-[0.5em] block mb-4">[ SECTION 4: EDITORIAL WORKFLOW ]</span>
             <h2 className="text-4xl md:text-6xl font-serif font-light text-white uppercase tracking-tight">
               Our Content Process
             </h2>
             <p className="text-neutral-400 text-sm md:text-base font-light mt-4 max-w-2xl mx-auto">
               We follow a proven methodology that combines strategic thinking with creative excellence. Complete control from discovery to indexing.
             </p>
           </div>

           {/* High-contrast responsive process grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {contentProcess.map((p, idx) => (
               <div 
                 key={idx} 
                 className="bg-neutral-950 border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between hover:border-white/20 hover:scale-[1.01] transition-all duration-300 relative shadow-2xl"
               >
                 <span className="text-[#ccff00] font-mono text-[10px] font-bold absolute top-6 right-6 tracking-widest">PHASE {p.step}</span>
                 
                 <div className="space-y-6">
                   <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00] border border-[#ccff00]/20">
                     {idx === 0 && <Search className="w-5 h-5" />}
                     {idx === 1 && <PenTool className="w-5 h-5" />}
                     {idx === 2 && <ShieldCheck className="w-5 h-5" />}
                     {idx === 3 && <Globe className="w-5 h-5" />}
                   </div>

                   <div className="space-y-2">
                     <h3 className="text-base font-bold uppercase tracking-wider text-white">{p.title}</h3>
                     <em className="text-xs text-[#ccff00] font-serif block italic">"{p.quote}"</em>
                   </div>

                   <p className="text-xs text-neutral-400 font-light leading-relaxed">{p.desc}</p>
                   
                   <ul className="space-y-2 pt-2 border-t border-white/5">
                     {p.items.map((it, i) => (
                       <li key={i} className="text-[11px] text-neutral-300 font-light leading-relaxed flex items-start gap-2">
                         <span className="w-1 h-1 rounded-full bg-neutral-600 shrink-0 mt-1.5" />
                         <span>{it}</span>
                       </li>
                     ))}
                   </ul>
                 </div>

                 <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl mt-6">
                   <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">Phase Output</span>
                   <span className="text-[10px] font-mono text-white font-semibold block">{p.deliverable}</span>
                 </div>
               </div>
             ))}
           </div>
         </div>
      </section>

      {/* SECTION 5: WHY ABUQITMIRLABS */}
      <section className="py-24 md:py-40 px-6 bg-[#030303] relative">
         <div className="max-w-7xl mx-auto">
           <div className="mb-20 text-center">
             <span className="text-xs font-mono text-neutral-500 mb-4 uppercase tracking-[0.4em] font-bold block">[ SECTION 5: WHY AbuQitmirLabs ]</span>
             <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white font-light tracking-tight uppercase">
               Our Institutional Strengths
             </h2>
             <p className="max-w-3xl mx-auto text-sm md:text-base text-neutral-400 font-light leading-relaxed mt-4">
               As a premier software development company headquartered in Karachi, Pakistan, AbuQitmirLabs brings a unique perspective to content writing—one that combines technical expertise with creative excellence.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
             {[
               {
                 title: "Developer-Writer Synergy",
                 desc: "Unlike pure-play content agencies, our writers work alongside developers and SEO specialists. This ensures that content is not just well-written but also technically optimized for search engines."
               },
               {
                 title: "Full-Service Capability",
                 desc: "From SEO content writing to complete software development, we offer end-to-end solutions. Your content and digital infrastructure are built to work together seamlessly."
               },
               {
                 title: "Industry-Specific Expertise",
                 desc: "We have written content for fintech, healthcare, retail, logistics, and software development companies, understanding the nuances of each industry."
               },
               {
                 title: "Global Perspective, Local Understanding",
                 desc: "We serve clients across the United States, United Kingdom, and Europe while maintaining a deep understanding of local market nuances."
               }
             ].map((strength, idx) => (
               <div key={idx} className="bg-neutral-950 border border-white/5 p-10 rounded-[2rem] hover:border-[#ccff00]/30 transition-all duration-300 relative overflow-hidden">
                 <span className="text-[#ccff00] font-mono text-[9px] block mb-4 font-bold tracking-widest">// STRENGTH 0{idx + 1}</span>
                 <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-3">
                   {strength.title}
                 </h3>
                 <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed">{strength.desc}</p>
               </div>
             ))}
           </div>
         </div>
      </section>

      {/* Editorial Research Tools Section */}
      <section className="py-24 px-6 bg-[#060606] border-t border-white/5 relative overflow-hidden z-10">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-24">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-[0.5em] block mb-4">[ COGNITIVE_INTELLIGENCE ]</span>
                <h2 className="text-4xl md:text-6xl font-serif font-light text-white uppercase">Our Research <span className="text-neutral-500 italic">Protocol.</span></h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {tools.map((stack, i) => (
                    <div key={i} className="p-8 border border-white/5 bg-neutral-950 rounded-[2rem] hover:border-white/15 transition-all flex flex-col items-center text-center shadow-xl">
                        <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 text-[#ccff00] flex items-center justify-center mb-6 border border-[#ccff00]/15">
                            {React.cloneElement(stack.icon as React.ReactElement<any>, { size: 18 })}
                        </div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-6 border-b border-white/5 pb-3 w-full">{stack.category}</h4>
                        <ul className="space-y-3">
                            {stack.items.map((item, j) => (
                                <li key={j} className="text-xs text-neutral-400 font-light flex items-center gap-2.5 justify-center">
                                    <div className="w-1 h-1 bg-[#ccff00]/60 rounded-full" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
              </div>
          </div>
      </section>

      {/* SECTION 6: PRICING & PACKAGES (Includes existing Custom Pricing Component) */}
      <div id="content-pricing" className="bg-[#030303]">
         <ContentWritingPricing />
      </div>

      {/* Which Package Is Right For You (Requested copy layout) */}
      <section className="py-24 bg-[#060606] text-white relative z-10 px-6 border-y border-white/5">
         <div className="max-w-4xl mx-auto">
           <div className="text-center mb-16">
             <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.3em] font-bold block mb-4">// CHOOSE YOUR PATH</span>
             <h2 className="text-3xl md:text-5xl font-serif text-white uppercase font-light leading-none">Which Package Is Right for You?</h2>
           </div>

           <div className="space-y-6">
             {[
               {
                 title: "Choose Small / MVP Build if:",
                 items: [
                   "You need a quick, cost-effective content solution",
                   "You're a startup or small business with a limited budget",
                   "You need a blog post, newsletter, or basic web copy",
                   "Your budget is under $150"
                 ],
                 customStyle: "border-l-2 border-[#ccff00] pl-6 bg-neutral-950/80"
               },
               {
                 title: "Choose Mid-Range Strategy if:",
                 items: [
                   "You need regular, SEO-optimized blog content",
                   "You're a growing business establishing content authority",
                   "You require keyword research and optimization",
                   "Your budget is $100 – $150+ per project"
                 ],
                 customStyle: "border-l-2 border-purple-500 pl-6 bg-neutral-950/80"
               },
               {
                 title: "Choose Enterprise Solutions if:",
                 items: [
                   "You're an established brand in a competitive market",
                   "You need specialized, high-authority content",
                   "You require whitepapers or complex case studies",
                   "Your budget is $150 – $250+ per project"
                 ],
                 customStyle: "border-l-2 border-zinc-400 pl-6 bg-neutral-950/80"
               }
             ].map((choice, i) => (
               <div key={i} className={`border border-white/5 p-8 rounded-2xl ${choice.customStyle} transition-all duration-300 hover:scale-[1.005]`}>
                 <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">{choice.title}</h4>
                 <ul className="space-y-2.5">
                   {choice.items.map((it, idx) => (
                     <li key={idx} className="flex gap-2.5 text-xs md:text-sm text-neutral-300 font-light">
                       <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]/80 shrink-0 mt-2 shadow-[0_0_4px_#ccff00]" />
                       <span>{it}</span>
                     </li>
                   ))}
                 </ul>
               </div>
             ))}
           </div>
         </div>
      </section>

      <CountryMarquee />

      {/* SECTION 7: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 md:py-40 px-6 bg-[#030303] border-b border-white/5 relative z-10">
          <div className="max-w-4xl mx-auto text-left">
              <div className="text-center mb-20">
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-[0.5em] block mb-4">FAQ</span>
                  <h3 className="text-4xl md:text-6xl font-serif font-light text-white uppercase tracking-tight">Frequently Asked Questions</h3>
              </div>

              <div className="space-y-4">
                  {faqData.map((faq, idx) => (
                      <div 
                        key={idx} 
                        className="bg-neutral-950 border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300"
                      >
                          <button 
                            className="flex items-center justify-between w-full p-8 md:p-9 text-left cursor-pointer focus:outline-none"
                            onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                          >
                              <span className="text-base md:text-lg font-bold text-white uppercase tracking-wider pr-6">{faq.q}</span>
                              <div className={`shrink-0 transition-transform duration-500 ${activeFaq === idx ? 'rotate-45 text-[#ccff00]' : 'text-neutral-500'}`}>
                                <Plus size={24} />
                              </div>
                          </button>
                          <AnimatePresence>
                              {activeFaq === idx && (
                                  <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden"
                                  >
                                      <p className="p-8 pt-0 text-sm md:text-base font-light text-neutral-400 leading-relaxed border-t border-white/[0.03]">
                                          {faq.a}
                                      </p>
                                  </motion.div>
                              )}
                          </AnimatePresence>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* SECTION 8: CALL TO ACTION */}
      <section className="py-32 md:py-48 bg-[#060606] relative overflow-hidden text-center">
            {/* Ambient neon radial backing */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ccff00]/3 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="max-w-[1000px] mx-auto px-6 relative z-10">
                <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] block mb-6">// READY TO LAUNCH //</span>
                <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif font-light text-white tracking-tight mb-8 uppercase leading-[1.05]">
                    Ready to Elevate Your <br />
                    <span className="italic text-neutral-400 font-light">Content Strategy?</span>
                </h2>

                <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                  Stop settling for generic content that fails to engage, rank, or convert. Partner with AbuQitmirLabs to create professional content writing that captivates, communicates, and converts.
                </p>

                {/* Glassmorphic Consultation Card */}
                <div className="bg-neutral-950 border border-white/5 p-8 md:p-12 rounded-[2.5rem] max-w-2xl mx-auto mb-16 text-left relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/5 blur-3xl rounded-full" />
                  <h3 className="text-lg md:text-xl font-bold uppercase text-white tracking-wide mb-3">Request a Free Content Consultation</h3>
                  <p className="text-xs md:text-sm text-neutral-400 font-light mb-8 leading-relaxed">
                    Our team will analyze your current content strategy and provide a comprehensive assessment of opportunities for improvement—at no cost.
                  </p>
                  <div className="flex flex-col sm:flex-row border-t border-white/5 pt-6 justify-between items-start sm:items-center text-[9px] font-mono text-neutral-500 tracking-widest uppercase gap-4 font-bold">
                    <span>Avg. Discovery Phase: 1–2 Weeks</span>
                    <span className="hidden sm:inline">·</span>
                    <span>Current Lead Time: 2–3 Weeks</span>
                  </div>
                </div>

                <p className="text-sm text-neutral-500 max-w-xl mx-auto mb-10 font-light">
                  Let's discuss your content project. Our initial consultation and content audit are completely free.
                </p>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                    <a 
                      href="https://wa.me/923233260859"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-10 py-5 bg-[#ccff00] text-black font-mono font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-[0_15px_30px_rgba(204,255,0,0.15)] cursor-pointer"
                    >
                        Request a Free Content Consultation
                    </a>
                    <div className="text-neutral-500 font-mono text-[9px] uppercase tracking-[0.25em] max-w-[280px] text-left border-l border-white/10 pl-8 leading-relaxed flex items-center h-16 font-bold">
                        AVG turnaround: 5-7 days // current capacity: 92%
                    </div>
                </div>
            </div>
       </section>

      <Footer />
    </div>
  );
};

export default ContentWritingPage;

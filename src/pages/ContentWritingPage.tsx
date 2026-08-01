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
  Sparkle,
  Heart,
  Home,
  HeartPulse,
  Scale,
  Calendar,
  ArrowUpRight,
  Cpu,
  Code2,
  Smartphone,
  Palette,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
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
      formula: "FORMULA W-100",
      tag: "Conversion-Oriented Core",
      color: "emerald" as const,
      title: "🖥️ Website Content Writing Services",
      quote: "Words that establish trust and convert visitors into buyers.",
      desc: "Core site pages — homepages, service pages, about pages — written to convert visitors while giving each page the on-page SEO foundation it needs to be found in the first place.",
      items: [
        "Homepage Copy: Captivating intros and clear value propositions",
        "Service Pages: Benefits-driven layout communicating direct solutions",
        "About Us Pages: Compelling, trust-building brand narrative storytelling",
        "Landing Pages: High-conversion layouts for your paid or organic campaigns"
      ],
      deliverable: "On-page optimized, publish-ready website copy."
    },
    {
      id: "02",
      formula: "FORMULA S-200",
      tag: "Topical Authority Blueprint",
      color: "amber" as const,
      title: "🔍 SEO Content Writing Services",
      quote: "Long-form content engineered to rank and survive algorithm updates.",
      desc: "Long-form articles, guides, and pillar content built around genuine keyword research and search intent analysis, designed to rank and to hold that ranking through algorithm updates rather than chasing short-term spikes.",
      items: [
        "Pillar Content: In-depth cornerstone guides establishing complete authority",
        "Topic Clusters: Connected articles that build topical context for crawlers",
        "Search Intent Mapping: Writing optimized for specific user search behavior",
        "On-Page Schema: Structured signals (headings, links) ready for indexing"
      ],
      deliverable: "High-ranking, schema-ready long-form articles."
    },
    {
      id: "03",
      formula: "FORMULA B-300",
      tag: "Strategic Organic Catalyst",
      color: "purple" as const,
      title: "📝 Blog Content Writing Services",
      quote: "Consistent, topically connected blogs that power your sales funnel.",
      desc: "Consistent, topically connected blog content that builds toward a clear content strategy — supporting cluster and pillar structures rather than a random assortment of disconnected posts.",
      items: [
        "Cluster Blogs: Supporting articles with internal siloing protocols",
        "Informational Posts: Answering high-intent questions clearly",
        "Industry Updates: Timely, authoritative articles keeping your site fresh",
        "Funnel Content: Middle-of-funnel posts nudging readers toward action"
      ],
      deliverable: "Publish-ready, strategized monthly blog packages."
    },
    {
      id: "04",
      formula: "FORMULA SA-400",
      tag: "Product-Led Growth Architecture",
      color: "platinum" as const,
      title: "💡 SaaS Content Writing",
      quote: "Explainers, comparisons, and feature stories that sell software.",
      desc: "Product-led content for software companies — feature explainers, comparison guides, and technical content written by people who understand how SaaS products are actually evaluated and purchased.",
      items: [
        "Product-Led Content: Blog posts that naturally weave in your software features",
        "Comparison Guides: Detailed, objective versus-posts that win decision-makers",
        "Feature Explainers: High-clarity breakdowns of complex platform capabilities",
        "Interactive Use-Cases: Concrete stories showing how your SaaS solves issues"
      ],
      deliverable: "Technically precise, product-led SaaS articles."
    },
    {
      id: "05",
      formula: "FORMULA B2B-500",
      tag: "High-Value Decision Pipeline",
      color: "emerald" as const,
      title: "📊 B2B Content Writing Services",
      quote: "Content engineered for longer, more considered buying cycles.",
      desc: "Content built for longer, more considered buying cycles — case studies, whitepapers, and decision-stage content that speaks to procurement teams and stakeholders, not just a single impulse buyer.",
      items: [
        "Case Studies: Performance data and real-world success narratives",
        "In-depth Whitepapers: Original research, insights, and industry analysis",
        "Procurement Assets: Decision-stage resources for corporate stakeholders",
        "Executive Briefs: High-level summaries speaking directly to decision-makers"
      ],
      deliverable: "Authority-building whitepapers and case studies."
    },
    {
      id: "06",
      formula: "FORMULA L-600",
      tag: "Authoritative Compliance Protocol",
      color: "amber" as const,
      title: "⚖️ Law Firm Website Content Writing",
      quote: "Precise, compliant legal writing paired with local SEO.",
      desc: "Content for legal practices requires a particular balance: authoritative and precise, without straying into content that could be read as specific legal advice. We write for law firms with that balance in mind, alongside proper local SEO structure for practice-area pages.",
      items: [
        "Practice-Area Pages: Authoritative overviews showcasing expertise",
        "Legal Blog Writing: Informative posts addressing common legal concerns",
        "Client Guides: Helpful resources walking readers through processes",
        "Local SEO Silos: Geo-targeted content capturing localized legal searches"
      ],
      deliverable: "Compliant, authoritative legal service content."
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
        <title>Content Writing Services | SEO Copywriting & Blogging | AbuQitmirLabs</title>
        <meta name="description" content="AbuQitmirLabs provides professional content writing services — SEO blogs, website copy, landing pages, and long-form articles. Data-driven content that ranks and converts." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/content-writing" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Content Writing Services | SEO Copywriting & Blogging | AbuQitmirLabs" />
        <meta property="og:description" content="AbuQitmirLabs provides professional content writing services — SEO blogs, website copy, landing pages, and long-form articles. Data-driven content that ranks and converts." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/content-writing" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Content Writing Services | SEO Copywriting & Blogging | AbuQitmirLabs" />
        <meta name="twitter:description" content="AbuQitmirLabs provides professional content writing services — SEO blogs, website copy, landing pages, and long-form articles. Data-driven content that ranks and converts." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Schema Markup with Breadcrumbs, ProfessionalService, Service with OfferCatalog, FAQPage, and HowTo */}
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
                    "name": "Content Writing",
                    "item": "https://www.abuqitmirlabs.tech/content-writing"
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "name": "AbuQitmirLabs",
                "url": "https://www.abuqitmirlabs.tech",
                "logo": "https://www.abuqitmirlabs.tech/logo.png",
                "image": "https://www.abuqitmirlabs.tech/logo.png",
                "telephone": "+923233260859",
                "priceRange": "$$$",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "8/15, 3 37A Rd, Shah Khalid Colony",
                  "addressLocality": "Landhi Town, Karachi",
                  "addressRegion": "Sindh",
                  "postalCode": "75160",
                  "addressCountry": "PK"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "24.842691448838718",
                  "longitude": "67.1862014846566"
                },
                "sameAs": [
                  "https://wa.me/923233260859",
                  "https://github.com/abuqitmir"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Content Writing Services | SEO Copywriting & Blogging | AbuQitmirLabs",
                "description": "AbuQitmirLabs provides professional content writing services — SEO blogs, website copy, landing pages, and long-form articles. Data-driven content that ranks and converts.",
                "provider": {
                  "@type": "LocalBusiness",
                  "name": "AbuQitmirLabs",
                  "url": "https://www.abuqitmirlabs.tech"
                },
                "serviceType": "Content Strategy",
                "areaServed": ["US", "UK", "CA", "AU", "PL", "PK"],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Content Writing Sector Solutions",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Content Writing for Non-Profit Organizations",
                        "description": "Create compelling donation campaigns, grant proposals, impact reports, and volunteer recruitment materials."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Content Writing for Real Estate",
                        "description": "Craft stunning property descriptions, neighborhood guides, market reports, and blog posts for real estate."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Content Writing for Healthcare",
                        "description": "Provide patient education materials, clear blog posts, and reassurance-driven medical service descriptions."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Content Writing for Small Law Firms",
                        "description": "Write authoritative blog posts, detailed practice area pages, and helpful legal guides for small law firms."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Content Writing for Corporate Events",
                        "description": "Develop high-conversion event copy, engaging speaker bios, and session promotional materials."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Content Writing for Educational Institutions",
                        "description": "Design professional course descriptions, student recruitment packages, and engaging academic blogs."
                      }
                    }
                  ]
                }
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
              },
              {
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "Our Strategic Content Writing Process",
                "description": "A meticulous, high-E-E-A-T writing process combining technical keyword alignment, brand audits, creative drafting, and continuous performance loops.",
                "step": [
                  {
                    "@type": "HowToStep",
                    "name": "Discovery & Research",
                    "text": "Deep research into the brand tone, audience profiles, keyword opportunity analysis, and competitor audits."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Content Creation",
                    "text": "Writing the initial high-value copy with natural keyword integration, readability optimization, and visual planning."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Review & Refinement",
                    "text": "Rigorous grammatical checks, accurate fact-checking, absolute plagiarism screening, and SEO validation."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Delivery & Implementation",
                    "text": "Formatting, strategic CMS uploads, analytics integration, and scheduling for optimal distribution."
                  }
                ]
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
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            {/* What is Content Writing, Really? */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-neutral-900/30 border border-white/5 p-10 md:p-14 rounded-[2.5rem] relative backdrop-blur-md flex flex-col justify-between"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/2 blur-3xl rounded-full" />
                <div>
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.4em] mb-6">// THE DEFINITIVE LAYER</div>
                  <h2 className="text-3xl md:text-4xl font-serif font-light text-white tracking-tight uppercase leading-[1.2] mb-8">
                     What Is Content Writing, <span className="italic text-neutral-400">Really?</span>
                  </h2>
                  <p className="text-base md:text-lg font-light text-neutral-300 leading-relaxed font-sans mb-6">
                     Content writing is often reduced to "words on a page," but done properly, it's closer to infrastructure — the layer that determines whether a website earns trust, ranks in search, and actually converts a visitor into a customer.
                  </p>
                  <p className="text-sm md:text-base font-light text-[#ccff00] leading-relaxed font-sans">
                     At AbuQitmirLabs, we treat content writing as a discipline that sits at the intersection of clear communication, search visibility, and business strategy.
                  </p>
                </div>
            </motion.div>
            
            {/* SEO Content Writing: Where Writing Meets Search */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="bg-neutral-900/30 border border-white/5 p-10 md:p-14 rounded-[2.5rem] relative backdrop-blur-md flex flex-col justify-between"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/2 blur-3xl rounded-full" />
                <div>
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.4em] mb-6">// SEARCH METRICS & INTENT</div>
                  <h2 className="text-3xl md:text-4xl font-serif font-light text-white tracking-tight uppercase leading-[1.2] mb-8">
                     SEO Content Writing: <span className="italic text-neutral-400">Where Writing Meets Search</span>
                  </h2>
                  <p className="text-sm md:text-base font-light text-neutral-300 leading-relaxed font-sans mb-6">
                     <strong>SEO content writing</strong> is the practice of creating content that genuinely serves the reader while also being structured in a way search engines can understand and reward. This isn't the same as <strong>writing SEO content</strong> through outdated keyword-density formulas — modern <strong>search engine optimization content writing</strong> is built around search intent first, with technical SEO structure applied around genuinely useful writing, not the other way around.
                  </p>
                  <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 block mb-2">A useful way to think about what is SEO content writing:</span>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed font-sans">
                      It's the practice of answering the exact question a searcher typed, as clearly and completely as competing pages, while giving Google's crawlers the structural signals (headings, semantic HTML, internal links) needed to recognize that relevance.
                    </p>
                  </div>
                </div>
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

      {/* SECTION: INDUSTRY-FOCUSED SOLUTIONS */}
      <section className="py-32 md:py-48 bg-black border-b border-white/5 relative z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00]/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20">
            <span className="text-xs font-bold text-[#ccff00] uppercase tracking-[0.4em] block mb-4">// SECTOR SOLUTIONS</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tighter leading-none mb-8">
              Content Writing — <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Industry-Focused Solutions for Every Sector</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-4xl leading-relaxed font-light mb-6">
              At AbuQitmirLabs, we create content that ranks, engages, and converts. From our <Link to="/" className="text-[#ccff00] hover:underline font-medium">home page</Link> to deep technical documentation, we build customized strategies that seamlessly integrate with our holistic <Link to="/seo-mastery" className="text-[#ccff00] hover:underline font-medium">SEO Mastery</Link>, localized <Link to="/local-seo-for-small-business" className="text-[#ccff00] hover:underline font-medium">Local SEO for Small Businesses</Link>, forensic <Link to="/local-seo-audit" className="text-[#ccff00] hover:underline font-medium">Local SEO Audits</Link>, and bespoke <Link to="/graphics-design" className="text-[#ccff00] hover:underline font-medium">Graphics &amp; UI/UX Design</Link>. Explore client results in our <Link to="/case-studies" className="text-white hover:underline font-medium">Case Studies</Link> and <Link to="/blog" className="text-white hover:underline font-medium">Blog</Link>, read more <Link to="/about" className="text-white hover:underline font-medium">about us</Link>, or <Link to="/contact" className="text-white hover:underline font-medium">contact us</Link> today.
            </p>

            {/* Authoritative Content External Resources */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
              <span className="text-zinc-500 uppercase tracking-widest font-bold">Authoritative Content Standards:</span>
              <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#ccff00] transition-colors">
                Google Search Central <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-zinc-700">•</span>
              <a href="https://blog.hubspot.com/marketing/content-marketing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#ccff00] transition-colors">
                HubSpot Content Marketing <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-zinc-700">•</span>
              <a href="https://www.searchenginejournal.com/category/content-marketing/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#ccff00] transition-colors">
                Search Engine Journal <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-zinc-700">•</span>
              <a href="https://www.grammarly.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#ccff00] transition-colors">
                Grammarly Editorial <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-zinc-700">•</span>
              <a href="https://ahrefs.com/blog/content-marketing-strategy/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#ccff00] transition-colors">
                Ahrefs Strategy <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
            {[
              {
                title: "Content Writing for Non-Profit Organizations",
                desc: "Non-profits need content that tells their story, inspires action, and builds donor trust. Our content writing for non-profit organizations creates compelling donation campaigns, grant proposals, impact reports, and volunteer recruitment materials that connect emotionally with supporters.",
                icon: <Heart className="w-8 h-8 text-[#ccff00]" />
              },
              {
                title: "Content Writing for Real Estate",
                desc: "Real estate marketing demands content that showcases properties and attracts qualified buyers. Our content writing for real estate creates property descriptions, neighborhood guides, market reports, and blog posts that help agents stand out in competitive markets.",
                icon: <Home className="w-8 h-8 text-[#ccff00]" />
              },
              {
                title: "Content Writing for Healthcare",
                desc: "Healthcare organizations need accurate, accessible content that builds patient trust. Our content writing for healthcare creates patient education materials, blog posts, and service descriptions that make complex medical information clear and reassuring.",
                icon: <HeartPulse className="w-8 h-8 text-[#ccff00]" />
              },
              {
                title: "Content Writing for Small Law Firms",
                desc: "Small law firms need content that builds credibility and attracts clients. Our content writing for small law firms creates authoritative blog posts, practice area pages, and client guides that position you as the trusted expert in your field.",
                icon: <Scale className="w-8 h-8 text-[#ccff00]" />
              },
              {
                title: "Content Writing for Corporate Events",
                desc: "Corporate events demand content that drives attendance and engagement. Our content writing for corporate events creates event copy, speaker bios, session descriptions, and promotional materials that make your event unforgettable.",
                icon: <Calendar className="w-8 h-8 text-[#ccff00]" />
              },
              {
                title: "Content Writing for Educational Institutions",
                desc: "Educational institutions need content that attracts students and engages parents. Our content writing for educational institutions creates course descriptions, recruitment materials, and blog content that reflects your academic excellence.",
                icon: <BookOpen className="w-8 h-8 text-[#ccff00]" />
              }
            ].map((sector, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-zinc-950 border border-white/5 p-8 rounded-[2rem] hover:border-[#ccff00]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between animate-none"
              >
                <div>
                  <div className="mb-6 w-14 h-14 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center">
                    {sector.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 tracking-tight uppercase leading-snug">{sector.title}</h3>
                  <p className="text-sm font-light text-zinc-400 leading-relaxed mb-6">{sector.desc}</p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#ccff00]">
                  <span>Sector Solutions</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
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

      {/* SECTION 5: GLOBAL MARKETS & WHY PARTNER WITH US */}
      <section className="py-32 md:py-48 bg-[#050505] border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column: Global Markets */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div>
                <span className="text-xs font-mono text-[#ccff00] mb-4 uppercase tracking-[0.4em] font-bold block">[ GLOBAL REACH ]</span>
                <h2 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-tighter leading-none mb-6">
                  Content Writing Across Global Markets
                </h2>
                <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
                  While our headquarters is in Karachi, Pakistan, our content solutions are built for a global stage. We understand the unique demands of different markets and adapt our approach accordingly:
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    country: "United States",
                    code: "US",
                    text: "Content writing in the United States for businesses that need high-impact, SEO-optimized content to compete in one of the world's most competitive digital landscapes."
                  },
                  {
                    country: "United Kingdom",
                    code: "UK",
                    text: "Content writing in the United Kingdom aligned with UK search behavior and professional standards, ensuring your brand resonates with British audiences."
                  },
                  {
                    country: "Canada",
                    code: "CA",
                    text: "Content writing in Canada that reflects the country's bilingual and multicultural landscape."
                  },
                  {
                    country: "Australia",
                    code: "AU",
                    text: "Content writing in Australia for businesses ready to dominate the Australian market with fresh, engaging content."
                  },
                  {
                    country: "Poland",
                    code: "PL",
                    text: "Content writing in Poland that bridges the gap between global standards and local market needs."
                  }
                ].map((m, idx) => (
                  <div key={idx} className="p-6 bg-zinc-950 border border-white/5 rounded-2xl hover:border-zinc-800 transition-colors group flex gap-5 items-start">
                    <span className="text-xs font-mono text-zinc-600 group-hover:text-[#ccff00] border border-zinc-800 group-hover:border-[#ccff00]/40 px-2.5 py-1 rounded shrink-0 font-bold">{m.code}</span>
                    <div>
                      <h4 className="text-base font-bold text-white uppercase tracking-tight mb-2">{m.country}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Why Partner with AbuQitmirLabs */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-between space-y-12"
            >
              <div className="space-y-8">
                <span className="text-xs font-mono text-[#ccff00] mb-4 uppercase tracking-[0.4em] font-bold block">[ WHY PARTNER WITH US ]</span>
                <h2 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-tighter leading-none mb-6">
                  Why Partner with AbuQitmirLabs?
                </h2>
                <p className="text-zinc-300 text-base md:text-lg font-light leading-relaxed border-l-2 border-[#ccff00] pl-6 italic">
                  Our team in Karachi, Pakistan, combines global-grade content expertise with cost-effective delivery. We serve clients across the United States, United Kingdom, Canada, Poland, and Australia—building content strategies that deliver measurable ROI. Whether you need blog posts, website copy, or technical documentation, we deliver content that drives real business results.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  <div className="p-6 bg-zinc-950 border border-white/5 rounded-2xl">
                    <span className="text-xs font-mono text-[#ccff00] font-bold block mb-2">// 100% MANUAL CRAFT</span>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">Every piece of content is researched, drafted, and refined manually with E-E-A-T and real human insight.</p>
                  </div>
                  <div className="p-6 bg-zinc-950 border border-white/5 rounded-2xl">
                    <span className="text-xs font-mono text-[#ccff00] font-bold block mb-2">// DATA-DRIVEN STRATEGY</span>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">We align every keyword and page structure with search intent to capture real buyer demand.</p>
                  </div>
                </div>
              </div>

              {/* Big Creative Callout */}
              <div className="bg-zinc-900 border border-[#ccff00]/30 p-10 rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/5 blur-3xl rounded-full" />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-4">// EDITORIAL ADVANTAGE LAUNCHPAD //</span>
                <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase leading-none mb-6">
                  Let's build your <span className="text-[#ccff00]">content advantage.</span>
                </p>
                <a 
                  href="https://wa.me/923233260859"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black bg-[#ccff00] hover:bg-white px-6 py-4 rounded-xl transition-colors"
                >
                  Get Started <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION: STRATEGIC PERSPECTIVES & SYSTEM PROTOCOLS */}
      <section className="py-24 md:py-40 bg-[#030303] border-b border-white/5 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-xs font-bold text-[#ccff00] uppercase tracking-[0.4em] block mb-4">// DEEP PERSPECTIVES</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tighter leading-none mb-6">
              Strategic Perspectives <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>&amp; Editorial Decisions</span>
            </h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-2xl font-light leading-relaxed">
              Before embarking on a content initiative, successful brands align their technical, operational, and semantic choices with clear strategic priorities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Copywriting vs. Content Writing Card */}
            <div className="lg:col-span-7 bg-zinc-950 border border-white/5 p-10 rounded-[2.5rem] flex flex-col justify-between hover:border-zinc-800 transition-all">
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-[#ccff00] uppercase tracking-widest">// COGNITIVE DIVISION</span>
                <h3 className="text-2xl font-serif text-white uppercase tracking-tight">Copywriting vs. Content Writing</h3>
                <p className="text-sm font-light text-zinc-400 leading-relaxed font-sans">
                  These two terms get used interchangeably, but they serve different goals. Most businesses need both: copywriting for landing pages and ads, content writing for the blog, resource pages, and long-form material that builds search visibility over time.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl">
                    <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-2 font-black">Copywriting</h4>
                    <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                      Built to prompt an immediate action — a click, a purchase, a signup — and is typically short, punchy, and persuasion-first.
                    </p>
                  </div>
                  <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl">
                    <h4 className="text-xs font-mono text-[#ccff00] uppercase tracking-wider mb-2 font-black">Content Writing</h4>
                    <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                      Built to inform, educate, or build authority over a longer arc, and tends to prioritize depth and usefulness over a hard sell.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 text-xs font-serif italic text-zinc-300">
                "Understanding copywriting vs content writing as complementary rather than interchangeable tends to produce better results from both."
              </div>
            </div>

            {/* Content Writing Agency vs. Freelance Card */}
            <div className="lg:col-span-5 bg-zinc-950 border border-white/5 p-10 rounded-[2.5rem] flex flex-col justify-between hover:border-zinc-800 transition-all">
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">// OPERATIONAL CONSISTENCY</span>
                <h3 className="text-2xl font-serif text-white uppercase tracking-tight">Agency vs. Freelance</h3>
                <p className="text-xs sm:text-sm font-light text-zinc-400 leading-relaxed font-sans">
                  Businesses evaluating a <strong>content writing agency</strong> versus individual freelancers are really deciding between consistency and flexibility.
                </p>
                <p className="text-xs sm:text-sm font-light text-zinc-400 leading-relaxed font-sans">
                  As a <strong>content writing company</strong>, we offer what a single freelancer typically can't: a documented content strategy, SEO research built into every brief, and a team structure that doesn't disappear if one writer becomes unavailable.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 text-xs text-purple-400 font-mono uppercase tracking-wider">
                For ongoing content needs — especially SEO-driven programs — a proper <strong>SEO content writing agency</strong> tends to outperform ad hoc freelance work simply through consistency of process.
              </div>
            </div>

            {/* Keywords for Content Writing Card */}
            <div className="lg:col-span-12 bg-gradient-to-r from-zinc-950 to-neutral-900 border border-white/5 p-10 md:p-12 rounded-[2.5rem] flex flex-col justify-between hover:border-zinc-800 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/2 blur-3xl rounded-full" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-[10px] font-mono text-[#ccff00] uppercase tracking-widest block">// STRATEGIC TAXONOMY</span>
                  <h3 className="text-2xl md:text-3xl font-serif text-white uppercase tracking-tight">Keywords for Content Writing: <br /><span className="italic text-zinc-400 font-light">Getting the Foundation Right</span></h3>
                </div>
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-sm font-light text-zinc-300 leading-relaxed font-sans">
                    Choosing the right <strong>keywords for content writing</strong> starts with matching actual search intent rather than simply targeting high-volume terms. A page written around the wrong intent — informational content targeting a transactional keyword, for example — tends to underperform regardless of how well it's written.
                  </p>
                  <p className="text-sm font-light text-zinc-400 leading-relaxed font-sans border-l border-[#ccff00]/40 pl-4 italic">
                    Every content piece we produce starts with intent-mapped keyword research, not a list of terms handed to a writer with no context.
                  </p>
                </div>
              </div>
            </div>
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

      {/* SECTION: CONTENT WRITING TIPS WE ACTUALLY FOLLOW */}
      <section className="py-24 md:py-32 bg-black px-6 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-[#ccff00] uppercase tracking-[0.4em] block mb-4">// THE EDITORIAL CODE</span>
              <h2 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-tight leading-[1.1]">
                Content Writing <br />
                Tips We <br />
                <span className="text-transparent italic" style={{ WebkitTextStroke: '1px white' }}>Actually Follow.</span>
              </h2>
              <div className="w-20 h-[1px] bg-[#ccff00]/40" />
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                Consistency doesn't happen by accident. We adhere to clear, non-negotiable editorial protocols that separate content that dominates search results from content that gets ignored.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-zinc-950 border border-white/5 rounded-[2rem] hover:border-zinc-800 transition-all">
                <span className="text-[10px] font-mono text-[#ccff00] uppercase tracking-widest block mb-4">// PROTOCOL 01</span>
                <h4 className="text-base font-bold text-white uppercase tracking-wider mb-3">Hyper-Targeted Intent</h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed font-sans">
                  Write for the specific person searching, not a generic audience. By defining the exact user profile behind a query, we eliminate useless preamble and deliver immediate value.
                </p>
              </div>

              <div className="p-8 bg-zinc-950 border border-white/5 rounded-[2rem] hover:border-zinc-800 transition-all">
                <span className="text-[10px] font-mono text-[#ccff00] uppercase tracking-widest block mb-4">// PROTOCOL 02</span>
                <h4 className="text-base font-bold text-white uppercase tracking-wider mb-3">Front-Loaded Answers</h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed font-sans">
                  Structure content so the answer to the core question appears early, not buried after three paragraphs of preamble. Capture attention instantly and keep the bounce rate low.
                </p>
              </div>

              <div className="p-8 bg-zinc-950 border border-white/5 rounded-[2rem] hover:border-zinc-800 transition-all">
                <span className="text-[10px] font-mono text-[#ccff00] uppercase tracking-widest block mb-4">// PROTOCOL 03</span>
                <h4 className="text-base font-bold text-white uppercase tracking-wider mb-3">Holistic Strategy</h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed font-sans">
                  Treat every piece as part of a broader content strategy rather than a standalone asset. Internal link equity and clear semantic paths build sustainable domain power.
                </p>
              </div>

              <div className="p-8 bg-zinc-900/60 border border-[#ccff00]/20 rounded-[2rem] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#ccff00] uppercase tracking-widest block mb-4">// THE INTEGRITY STANDARD</span>
                  <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-3 font-bold">Human Editorial Judgment</h4>
                  <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                    Even where AI-assisted drafting tools are used in the process, human editorial judgment — around accuracy, tone, and genuine usefulness — remains the deciding factor in whether content actually performs.
                  </p>
                </div>
              </div>
            </div>
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
                <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] block mb-6">// READY TO INTENTIONALIZE //</span>
                <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif font-light text-white tracking-tight mb-8 uppercase leading-[1.05]">
                    Ready to Fix <br />
                    <span className="italic text-neutral-400 font-light">Your Content?</span>
                </h2>

                <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                  If your site has pages that are indexed but not ranking, thin or duplicate content is one of the most common — and most fixable — causes. Our team can audit your existing pages and rebuild them around genuine search intent and topical authority.
                </p>

                {/* Glassmorphic Consultation Card */}
                <div className="bg-neutral-950 border border-white/5 p-8 md:p-12 rounded-[2.5rem] max-w-2xl mx-auto mb-16 text-left relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/5 blur-3xl rounded-full" />
                  <h3 className="text-lg md:text-xl font-bold uppercase text-white tracking-wide mb-3">Request a Free Content Consultation &amp; Audit</h3>
                  <p className="text-xs md:text-sm text-neutral-400 font-light mb-8 leading-relaxed">
                    Stop settling for generic copy that fails to engage, rank, or convert. Our team will analyze your current pages, find duplicate index items, and provide a comprehensive roadmap completely free.
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

       {/* Related Services / Internal Siloing */}
       <section className="py-24 bg-black border-t border-white/10 relative z-10 px-6">
         <div className="max-w-7xl mx-auto">
           <h3 className="text-xs font-mono text-slate-500 mb-4 uppercase tracking-[0.4em] font-bold block">[ RELATED_SYSTEMS &amp; INTERNAL NAVIGATION ]</h3>
           <p className="text-zinc-400 text-sm font-light mb-12 max-w-2xl leading-relaxed">
             Explore our core engineering verticals, localized search solutions, and industry blueprints:
           </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Custom Software", path: "/custom-software", icon: <Code2 className="w-5 h-5" /> },
              { title: "Web Development", path: "/web-development", icon: <Globe className="w-5 h-5" /> },
              { title: "Mobile Apps", path: "/mobile-app-development", icon: <Smartphone className="w-5 h-5" /> },
              { title: "AI Agents", path: "/ai-agent-development", icon: <Cpu className="w-5 h-5" /> },
              { title: "SEO Mastery", path: "/seo-mastery", icon: <TrendingUp className="w-5 h-5" /> },
              { title: "Creative Graphics", path: "/graphics-design", icon: <Palette className="w-5 h-5" /> }
            ].map((link, i) => (
              <Link 
                key={i} 
                to={link.path} 
                className="group flex items-center justify-between p-8 bg-white/[0.01] border border-white/5 rounded-2xl transition-all hover:-translate-y-1 hover:bg-white/[0.04] hover:border-[#ccff00]/40"
              >
                <div className="flex items-center gap-4">
                  <div className="text-[#ccff00] bg-white/5 border border-white/10 p-3 rounded-lg group-hover:bg-[#ccff00] group-hover:text-black transition-all">
                    {link.icon}
                  </div>
                  <span className="font-bold uppercase tracking-tight text-white">{link.title}</span>
                </div>
                <ArrowUpRight className="text-slate-500 group-hover:text-[#ccff00] transition-colors" size={20} />
              </Link>
            ))}
          </div>

          {/* Granular Silo Matrix */}
          <div className="pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-mono text-zinc-400">
            <div>
              <span className="text-white font-bold uppercase tracking-wider block mb-4">Local SEO Solutions</span>
              <ul className="space-y-2">
                <li><Link to="/local-seo-for-small-business" className="hover:text-[#ccff00] transition-colors">Small Business Local SEO</Link></li>
                <li><Link to="/local-seo-citation-building" className="hover:text-[#ccff00] transition-colors">NAP Citation Building</Link></li>
                <li><Link to="/white-label-local-seo" className="hover:text-[#ccff00] transition-colors">White Label Local SEO</Link></li>
                <li><Link to="/local-seo-audit" className="hover:text-[#ccff00] transition-colors">Free Local SEO Audit</Link></li>
              </ul>
            </div>
            <div>
              <span className="text-white font-bold uppercase tracking-wider block mb-4">Industry Solutions</span>
              <ul className="space-y-2">
                <li><Link to="/solutions/fintech" className="hover:text-[#ccff00] transition-colors">Fintech Platforms</Link></li>
                <li><Link to="/solutions/healthcare" className="hover:text-[#ccff00] transition-colors">Healthcare &amp; EHR</Link></li>
                <li><Link to="/solutions/ai-automation" className="hover:text-[#ccff00] transition-colors">AI &amp; RAG Automation</Link></li>
                <li><Link to="/solutions/e-commerce" className="hover:text-[#ccff00] transition-colors">E-Commerce Architecture</Link></li>
                <li><Link to="/solutions/edtech" className="hover:text-[#ccff00] transition-colors">EdTech &amp; LMS</Link></li>
              </ul>
            </div>
            <div>
              <span className="text-white font-bold uppercase tracking-wider block mb-4">Studio Media &amp; Trust</span>
              <ul className="space-y-2">
                <li><Link to="/blog" className="hover:text-[#ccff00] transition-colors">Engineering Journal</Link></li>
                <li><Link to="/case-studies" className="hover:text-[#ccff00] transition-colors">Case Studies</Link></li>
                <li><Link to="/news/all" className="hover:text-[#ccff00] transition-colors">All News &amp; Media</Link></li>
                <li><Link to="/website-contract" className="hover:text-[#ccff00] transition-colors">Website Contract Template</Link></li>
                <li><Link to="/privacy" className="hover:text-[#ccff00] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-[#ccff00] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContentWritingPage;

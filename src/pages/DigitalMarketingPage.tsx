"use client";

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import {
  Target,
  TrendingUp,
  Code2,
  Globe,
  Smartphone,
  Cpu,
  Palette,
  PenTool,
  Plus,
  Zap,
  Star,
  ArrowUpRight,
  SearchCode,
  BarChart3,
  Layers,
  Rocket,
  LineChart,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceToolCtaBanner from '../components/ServiceToolCtaBanner';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import HeroText from '../components/ui/hero-shutter-text';

const DigitalMarketingPage = () => {
  const faqData = [
    {
      q: "What does digital marketing for software and SaaS companies actually include?",
      a: "For a software or SaaS company, digital marketing means technical SEO, content built around real search intent, conversion-focused web architecture, and brand identity work that holds up under scrutiny from a technical buyer. It does not mean paid ads or social media posting volume for its own sake. We focus on the organic, compounding channels: search visibility, content authority, and a site that converts the traffic it earns."
    },
    {
      q: "Why not just hire a generic digital marketing agency?",
      a: "Most digital marketing agencies are built around paid media and social content calendars, which work differently for a $20/month self-serve SaaS tool than for a local retail business. A generic agency optimizing for engagement metrics will not understand why a pricing page's tier count matters, or why a technical buyer bounces off vague copy. We build the marketing around how software actually gets evaluated and bought."
    },
    {
      q: "How is this different from your SEO Mastery service?",
      a: "SEO Mastery covers technical and on-page search optimization in depth. Digital marketing for software companies is the wider layer around it: the content strategy, the site structure that turns search traffic into signups, and the brand presentation that makes a technical buyer trust you. Most engagements combine both, since neither works as well in isolation."
    },
    {
      q: "Do you run paid ads or manage ad budgets?",
      a: "No. We do not offer PPC or paid social management. Our digital marketing work is built entirely on owned and earned channels: organic search, content, site architecture, and brand. If paid acquisition is part of your plan, we are happy to coordinate with whoever runs that, but it is not a service we sell."
    },
    {
      q: "How long before a software company sees results?",
      a: "Site and content changes can improve conversion within weeks. Organic search visibility, the larger driver of compounding growth, typically takes 4 to 6 months to show meaningful movement and 6 to 12 months to mature, the same timeline as any legitimate SEO work. We do not promise faster, because anyone who does is usually describing a shortcut that stops working after the next algorithm update."
    },
    {
      q: "What size of software company is this built for?",
      a: "Early-stage SaaS products validating positioning, growth-stage software companies scaling organic acquisition, and engineering-led teams that need marketing presented with the same rigor as their product. If your buyer reads documentation before they read a sales deck, this is built for that buyer."
    }
  ];

  const stackItems = [
    { category: "Technical & Semantic SEO", tools: "Crawl audits, schema entity mapping, Core Web Vitals, internal link architecture", purpose: "Make the site discoverable and machine-readable" },
    { category: "E-E-A-T Content Strategy", tools: "Technical blog content, comparison pages, documentation-grade writing", purpose: "Build topical authority with technical buyers" },
    { category: "Conversion Architecture", tools: "Pricing page structure, signup flow review, Jamstack performance", purpose: "Turn earned traffic into trials and signups" },
    { category: "Brand & Visual Identity", tools: "UI/UX systems, design tokens, conversion-focused creative", purpose: "Build the trust a technical buyer checks for" },
    { category: "AI-Assisted Content Ops", tools: "LLM-assisted drafting with human technical review on every line", purpose: "Scale content without losing accuracy" },
    { category: "Analytics & Attribution", tools: "GA4, Search Console, event-level conversion tracking", purpose: "Tie organic work to signups, not just traffic" }
  ];

  return (
    <div className="bg-[#000000] text-slate-100 font-sans antialiased overflow-x-hidden min-h-screen relative selection:bg-[#ccff00]/30 selection:text-white">
      <Helmet>
        <title>Digital Marketing Services for Software & SaaS Companies | AbuQitmirLabs</title>
        <meta name="description" content="Digital marketing for software and SaaS companies: technical SEO, E-E-A-T content, and conversion-focused web architecture. No paid ads." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/digital-marketing" />

        <meta property="og:title" content="Digital Marketing Services for Software & SaaS Companies | AbuQitmirLabs" />
        <meta property="og:description" content="Digital marketing for software and SaaS companies: technical SEO, E-E-A-T content, and conversion-focused web architecture. No paid ads." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/digital-marketing" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Digital Marketing Services for Software & SaaS Companies | AbuQitmirLabs" />
        <meta name="twitter:description" content="Digital marketing for software and SaaS companies: technical SEO, E-E-A-T content, and conversion-focused web architecture. No paid ads." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.abuqitmirlabs.tech" },
                  { "@type": "ListItem", "position": 2, "name": "Digital Marketing", "item": "https://www.abuqitmirlabs.tech/digital-marketing" }
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
                  "streetAddress": "8/15, 37/A 3, Area Shah Khalid Colony Sector 37 A Landhi Town",
                  "addressLocality": "Karachi",
                  "addressRegion": "Sindh",
                  "postalCode": "75160",
                  "addressCountry": "PK"
                },
                "geo": { "@type": "GeoCoordinates", "latitude": "24.842691448838718", "longitude": "67.1862014846566" },
                "sameAs": ["https://wa.me/923233260859", "https://github.com/abuqitmir"]
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Digital Marketing Services for Software & SaaS Companies",
                "serviceType": "Digital Marketing",
                "provider": {
                  "@type": "LocalBusiness",
                  "name": "AbuQitmirLabs",
                  "url": "https://www.abuqitmirlabs.tech",
                  "logo": "https://www.abuqitmirlabs.tech/logo.png",
                  "image": "https://www.abuqitmirlabs.tech/logo.png",
                  "address": { "@type": "PostalAddress", "addressLocality": "Karachi", "addressCountry": "PK" }
                },
                "description": "Organic digital marketing for software and SaaS companies: technical SEO, E-E-A-T content strategy, and conversion-focused web architecture, built by the same team that engineers the product.",
                "areaServed": ["US", "UK", "CA", "AU", "PL", "PK"],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Digital Marketing Solutions for Software Companies",
                  "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing for Early-Stage SaaS", "description": "Positioning, technical SEO, and content built for a product still validating its market, so organic growth compounds from day one instead of being retrofitted later." } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing for Growth-Stage Software Companies", "description": "Scaling organic acquisition through content clusters, technical SEO, and conversion architecture for teams past product-market fit and ready to compound search traffic." } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing for Fintech & Healthcare SaaS", "description": "Content and search strategy for regulated software categories, where technical accuracy and compliance-aware messaging matter as much as search rankings." } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing for Developer Tools & API Products", "description": "Marketing built for a buyer who reads documentation before a sales deck: technical content, comparison pages, and a site structure that respects that evaluation process." } }
                  ]
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqData.map(item => ({
                  "@type": "Question",
                  "name": item.q,
                  "acceptedAnswer": { "@type": "Answer", "text": item.a }
                }))
              },
              {
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "Our Digital Marketing Framework for Software Companies",
                "description": "A 5-step approach combining technical SEO, content authority, and conversion architecture, built around how software is actually evaluated and bought.",
                "step": [
                  { "@type": "HowToStep", "name": "Positioning & Market Audit", "text": "Mapping how your product is actually searched for, compared, and evaluated by the buyer who will use it, not generic keyword volume." },
                  { "@type": "HowToStep", "name": "Technical SEO & Site Architecture", "text": "Fixing the crawl, speed, and schema foundation so the content work that follows has somewhere to compound." },
                  { "@type": "HowToStep", "name": "Content Built for Technical Buyers", "text": "Documentation-grade articles, comparison pages, and case studies that hold up under scrutiny from an engineer or technical founder." },
                  { "@type": "HowToStep", "name": "Conversion Architecture", "text": "Reviewing pricing pages, signup flows, and site performance so earned traffic actually converts instead of leaking out." },
                  { "@type": "HowToStep", "name": "Measurement Tied to Signups", "text": "Attribution built around trials and signups, not just sessions and impressions." }
                ]
              }
            ])
          }}
        ></script>
      </Helmet>

      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-24 md:pt-32 pb-20 px-6 z-10 bg-black overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#ccff00]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-950/20 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-zinc-900/90 border border-white/10 px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest text-[#ccff00] mb-8 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
          Marketing Built by the Team That Engineers the Product
        </motion.div>

        <div className="mb-4">
          <HeroText text="GROWTH" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white text-center mb-10 leading-[0.95] max-w-6xl uppercase"
        >
          Digital Marketing <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-zinc-400">for Software &amp;</span> <br />
          <span className="text-[#ccff00]">SaaS Companies</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-[#d3c8b8] text-center max-w-4xl mb-12 leading-relaxed font-sans font-light"
        >
          No paid ads, no vanity metrics. We build the organic layer that software companies actually need: <Link to="/seo-mastery" className="text-white underline font-semibold hover:text-[#ccff00] transition-colors">technical SEO</Link>, <Link to="/content-writing" className="text-white underline font-semibold hover:text-[#ccff00] transition-colors">E-E-A-T content</Link>, and <Link to="/web-development" className="text-white underline font-semibold hover:text-[#ccff00] transition-colors">conversion architecture</Link>, backed by <Link to="/custom-software" className="text-white underline font-semibold hover:text-[#ccff00] transition-colors">custom software</Link> and <Link to="/ai-agent-development" className="text-white underline font-semibold hover:text-[#ccff00] transition-colors">AI agent</Link> engineering. Review our <Link to="/case-studies" className="text-white underline font-semibold hover:text-[#ccff00] transition-colors">Case Studies</Link>, read the <Link to="/blog" className="text-white underline font-semibold hover:text-[#ccff00] transition-colors">blog</Link>, or <Link to="/contact" className="text-white underline font-semibold hover:text-[#ccff00] transition-colors">get in touch</Link>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mx-auto mb-12 max-w-4xl border border-white/10 py-8 px-6 bg-zinc-900/60 backdrop-blur-md rounded-2xl w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-left">
            {[
              "Technical SEO for Search-Driven Software Growth",
              "E-E-A-T Content for Technical Buyers",
              "Conversion-Focused Pricing & Signup Architecture",
              "Brand Identity That Reads as Trustworthy",
              "No Paid Ads, No Social Content Mills"
            ].map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-3 group">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] mt-2 shrink-0 group-hover:bg-white transition-colors duration-300" />
                <span className="text-sm font-sans font-light text-zinc-300 tracking-tight leading-relaxed group-hover:text-white transition-colors duration-300">{bullet}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 w-full max-w-xl justify-center"
        >
          <a
            href="https://wa.me/923233260859"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-6 bg-[#ccff00] text-black text-lg font-black rounded-2xl hover:scale-105 transition-all flex flex-col items-center justify-center gap-2 uppercase tracking-wider shadow-[0_0_30px_rgba(204,255,0,0.15)]"
          >
            <Zap size={22} className="text-black" />
            Get a Free Marketing Audit
          </a>
          <button
            onClick={() => {
              const el = document.getElementById('dm-pricing');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-10 py-6 bg-zinc-900/90 border border-white/15 text-white hover:border-[#ccff00] text-lg font-black rounded-2xl hover:scale-105 transition-all flex flex-col items-center justify-center gap-2 uppercase tracking-wider backdrop-blur-sm"
          >
            <Star size={22} className="text-[#ccff00]" />
            <span>See Engagement Options</span>
          </button>
        </motion.div>
      </section>

      {/* Section 2: The Problem / Opportunity */}
      <section className="py-32 border-t border-white/10 bg-[#090909] relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="inline-block bg-[#ff0099]/10 border border-[#ff0099]/30 text-[#ff0099] font-mono font-bold px-5 py-2 rounded-full mb-6 uppercase text-xs tracking-widest">
                The Mismatch
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.95] uppercase mb-4">
                Generic digital marketing was not built for how software gets bought
              </h2>
            </div>

            <div className="bg-zinc-900/80 border border-white/10 p-10 rounded-3xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#ccff00]/5 blur-3xl pointer-events-none" />
              <h3 className="text-xl md:text-2xl font-black text-white uppercase mb-4">Most Agencies Sell the Same Playbook to Everyone</h3>
              <p className="text-base md:text-lg font-medium leading-relaxed text-zinc-300 font-sans mb-4">
                A social content calendar and a paid ads budget work differently for a retail brand than for a self-serve SaaS tool with a 14-day trial. The buyer evaluates differently, searches differently, and converts on different signals entirely.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-zinc-400 font-sans">
                At AbuQitmirLabs, <strong className="text-white">digital marketing for software companies</strong> is treated as an engineering problem as much as a content problem, because the buyer reading your docs is evaluating you the same way they evaluate code.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-16">
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase mb-6 tracking-tight">
              What We Deliberately Leave Out
            </h3>
            <p className="text-base md:text-lg text-zinc-400 font-sans mb-10 max-w-4xl leading-relaxed">
              We do not sell <strong className="text-white font-semibold">paid ad management</strong> or <strong className="text-white font-semibold">social posting volume</strong>. Those are legitimate channels run well by specialists elsewhere. Our work covers the compounding, owned channels:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Technical SEO", desc: "Crawlability, schema, and site architecture that search engines can actually understand" },
                { title: "Content that reads as credible", desc: "Writing reviewed by people who understand the product, not just the keyword" },
                { title: "Conversion architecture", desc: "Pricing pages and signup flows reviewed the same way we review any production code" },
                { title: "Brand presentation", desc: "Visual identity that holds up next to the enterprise tools your buyer already trusts" }
              ].map((factor, i) => (
                <div key={i} className="bg-zinc-900/60 border border-white/10 p-8 rounded-2xl hover:border-[#ccff00]/40 transition-colors group">
                  <span className="text-xs font-mono text-[#ccff00] font-bold block mb-3">// 0{i + 1}</span>
                  <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2 group-hover:text-[#ccff00] transition-colors">{factor.title}</h4>
                  <p className="text-sm font-sans leading-relaxed text-zinc-400">{factor.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-zinc-900 border border-[#ccff00]/30 text-white p-8 rounded-2xl text-center max-w-3xl mx-auto shadow-[0_0_30px_rgba(204,255,0,0.05)]">
              <p className="text-base md:text-lg font-medium text-zinc-300 font-sans">
                Our <strong className="text-[#ccff00] font-bold">digital marketing audits</strong> show exactly where search, content, and conversion are leaking, before we recommend a single hour of work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Digital Marketing Services Cover */}
      <section className="py-32 border-t border-white/10 bg-[#0c0c0e] relative z-10 px-6" id="dm-services-cover">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center max-w-4xl mx-auto">
            <span className="text-xs font-mono text-[#ccff00] mb-4 uppercase tracking-[0.4em] font-bold block">[ SERVICE_SCOPE ]</span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6 uppercase">
              What Our Digital Marketing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-emerald-400">Services Cover</span>
            </h2>
            <p className="text-base md:text-lg text-zinc-300 font-sans leading-relaxed">
              For a <strong className="text-white">software or SaaS company</strong>, we work across the four layers that actually move signups, not the parts that are easy to sell as a retainer:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Technical & Semantic SEO",
                icon: <SearchCode className="w-7 h-7 text-[#ccff00]" />,
                desc: "Site architecture, crawlability, Core Web Vitals, and schema entity mapping so search engines can find and understand what your product actually does, not just what your homepage says."
              },
              {
                title: "E-E-A-T Content for Technical Buyers",
                icon: <Target className="w-7 h-7 text-[#ff0099]" />,
                desc: "Documentation-grade articles, honest comparison pages, and case studies reviewed for technical accuracy, built for a reader who will fact-check every claim before they sign up."
              },
              {
                title: "Conversion Architecture",
                icon: <Layers className="w-7 h-7 text-[#ccff00]" />,
                desc: "Pricing page structure, signup flow friction, and site performance reviewed the way we would review any production system, because earned traffic that does not convert is a wasted engineering effort."
              },
              {
                title: "Brand & Visual Identity",
                icon: <Palette className="w-7 h-7 text-[#ff0099]" />,
                desc: "Design systems, UI/UX consistency, and creative that read as trustworthy to a buyer already comparing you against the enterprise tools they currently use."
              }
            ].map((srv, idx) => (
              <div key={idx} className="bg-zinc-900/70 border border-white/10 p-8 md:p-10 rounded-3xl hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-zinc-800 border border-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    {srv.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">{srv.title}</h3>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-zinc-400 font-sans">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack / Methodology */}
      <section className="py-32 border-t border-white/10 bg-[#090909] relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-3xl">
            <span className="text-xs font-mono text-[#ccff00] mb-4 uppercase tracking-[0.4em] font-bold block">[ METHOD ]</span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none mb-6 uppercase">
              How the Work Breaks Down
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-xs font-mono uppercase tracking-widest text-[#ccff00]">Discipline</th>
                  <th className="text-left py-4 px-4 text-xs font-mono uppercase tracking-widest text-[#ccff00]">What It Involves</th>
                  <th className="text-left py-4 px-4 text-xs font-mono uppercase tracking-widest text-[#ccff00]">Why It Matters</th>
                </tr>
              </thead>
              <tbody>
                {stackItems.map((item, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-zinc-900/40 transition-colors">
                    <td className="py-5 px-4 text-sm font-bold text-white">{item.category}</td>
                    <td className="py-5 px-4 text-sm text-zinc-400 font-sans">{item.tools}</td>
                    <td className="py-5 px-4 text-sm text-zinc-400 font-sans">{item.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Regional Markets + Why Choose Us */}
      <section className="py-32 border-t border-white/10 bg-[#0c0c0e] relative z-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <span className="text-xs font-mono text-[#ccff00] mb-4 uppercase tracking-[0.3em] font-bold block">// MARKETS_SERVED</span>
            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-8">
              Software Companies We Work With
            </h3>
            <div className="space-y-4">
              {[
                { market: "United States", text: "Marketing for SaaS and software companies evaluated by technical buyers who read documentation before a sales call." },
                { market: "United Kingdom", text: "Content and search strategy for software companies competing in a crowded, well-established SaaS market." },
                { market: "Canada & Australia", text: "Organic growth built for distributed teams who need marketing output to match the rigor of the product itself." },
                { market: "Poland & Europe", text: "Technical SEO and content for software companies expanding into English-language and EU search markets." }
              ].map((item, idx) => (
                <div key={idx} className="border-l-2 border-[#ccff00] pl-6 py-3 bg-zinc-900/50 rounded-r-xl border-y border-r border-white/5 pr-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">{item.market}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#ccff00]/5 blur-3xl pointer-events-none" />
            <span className="text-xs font-mono text-[#ccff00] mb-4 uppercase tracking-[0.3em] font-bold block">// WHY_CHOOSE_US</span>
            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
              Why Choose Us <br />Over a Generic Marketing Agency?
            </h3>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-sans mb-8">
              We are <strong className="text-white">a software engineering studio first</strong>. The same team that builds <Link to="/custom-software" className="text-white underline hover:text-[#ccff00]">custom software</Link> and <Link to="/ai-agent-development" className="text-white underline hover:text-[#ccff00]">AI agents</Link> writes the content and reviews the conversion architecture, which means the marketing never drifts from what the product can actually deliver.
            </p>

            <div className="flex gap-4 items-center bg-zinc-950/80 border border-white/10 p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-[#ccff00]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase font-sans">Let's build your organic acquisition engine.</h4>
                <p className="text-xs text-zinc-400 font-sans">Marketing reviewed with the same rigor as the code.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Options */}
      <section id="dm-pricing" className="py-32 bg-black border-t border-white/10 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-black block mb-4">// SELECT YOUR ENGAGEMENT</span>
            <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight uppercase">Engagement Options</h2>
            <p className="text-sm md:text-base text-zinc-400 font-sans mt-4 leading-relaxed">
              Pricing depends on scope, content volume, and whether a site rebuild is involved. Request a free audit for a number tied to your actual situation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Foundation",
                icon: <Rocket className="w-6 h-6 text-cyan-400" />,
                items: [
                  "Technical SEO audit and fixes",
                  "Core Web Vitals and schema setup",
                  "Pricing page and signup flow review",
                  "Best for early-stage SaaS validating positioning"
                ],
                customStyle: "border-l-4 border-cyan-400 pl-6"
              },
              {
                title: "Growth",
                icon: <LineChart className="w-6 h-6 text-purple-400" />,
                items: [
                  "Everything in Foundation",
                  "Ongoing content strategy and publishing",
                  "Internal linking and topical authority building",
                  "Best for growth-stage teams scaling organic traffic"
                ],
                customStyle: "border-l-4 border-purple-400 pl-6"
              },
              {
                title: "Full Engineering Partner",
                icon: <ShieldCheck className="w-6 h-6 text-fuchsia-400" />,
                items: [
                  "Everything in Growth",
                  "Site rebuild or Jamstack migration",
                  "Brand identity and design system work",
                  "Best for established software companies rebuilding their digital presence"
                ],
                customStyle: "border-l-4 border-fuchsia-400 pl-6"
              }
            ].map((choice, i) => (
              <div key={i} className={`bg-zinc-900/80 border border-white/10 p-8 rounded-2xl ${choice.customStyle}`}>
                <div className="flex items-center gap-3 mb-4">
                  {choice.icon}
                  <h4 className="text-lg font-black text-white uppercase tracking-tight">{choice.title}</h4>
                </div>
                <ul className="space-y-2">
                  {choice.items.map((it, idx) => (
                    <li key={idx} className="flex gap-2.5 text-xs md:text-sm text-zinc-300 font-sans font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shrink-0 mt-2" />
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

      {/* FAQ */}
      <section className="py-32 bg-[#090909] border-t border-white/10 relative z-10 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-[#ccff00] mb-4 uppercase tracking-[0.5em] font-bold block">// FAQ</span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, idx) => (
              <details key={idx} className="group bg-zinc-900/70 border border-white/10 rounded-2xl open:bg-zinc-900/90 transition-all duration-300">
                <summary className="flex justify-between items-center p-6 md:p-8 cursor-pointer select-none group-open:border-b group-open:border-white/10 rounded-t-xl transition-colors">
                  <span className="text-base md:text-xl font-bold font-sans text-white uppercase tracking-tight">{faq.q}</span>
                  <div className="w-10 h-10 border border-white/15 rounded-full flex items-center justify-center transition-transform duration-300 group-open:rotate-45 bg-[#ccff00]/10 text-[#ccff00]">
                    <Plus className="w-5 h-5" />
                  </div>
                </summary>
                <div className="p-6 md:p-8 font-sans">
                  <p className="text-sm md:text-base leading-relaxed text-zinc-300 font-normal">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-[#090909] to-black py-40 relative z-10 px-6 text-center border-t border-white/10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#ccff00]/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs font-mono text-[#ccff00] block mb-4 font-bold uppercase tracking-[0.3em]">// LAUNCH YOUR MARKETING</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.85] uppercase">
            Ready to Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-emerald-400">Like an Engineer?</span>
          </h2>

          <p className="text-lg md:text-xl text-zinc-300 font-sans max-w-2xl mx-auto mb-16 leading-relaxed">
            If your software is good but your organic traffic does not reflect it, the cause is usually a specific, fixable gap, thin technical content, a pricing page that confuses buyers, or a site that search engines cannot properly read. We can show you exactly where.
          </p>

          <div className="bg-zinc-900/80 border border-white/10 p-8 md:p-10 rounded-3xl max-w-2xl mx-auto mb-16 text-left backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-black uppercase text-white mb-2">Get a Free Marketing Audit</h3>
            <p className="text-sm text-zinc-400 font-sans mb-6">
              We review your technical SEO, content, and conversion architecture, and tell you what is actually worth fixing first.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-xl mx-auto">
            <a
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#ccff00] text-black text-xl font-black px-12 py-6 rounded-2xl hover:scale-105 transition-all uppercase shrink-0 shadow-[0_0_30px_rgba(204,255,0,0.2)]"
            >
              Request a Marketing Plan
            </a>
            <div className="text-zinc-400 font-mono text-xs uppercase tracking-widest max-w-[200px] text-left border-l border-white/20 pl-6 py-2">
              ESTABLISHED COGNITIVE SYSTEMS CO.
            </div>
          </div>
        </div>
      </section>

      <ServiceToolCtaBanner
        toolKeys={['website-audit', 'seo-checklist', 'website-authority-analyzer']}
        headline="Audit Your Site's Technical SEO & Conversion Readiness"
        subheadline="Run an instant Core Web Vitals check, generate a 45-point launch checklist, and measure your domain authority before planning a marketing engagement."
      />

      {/* Related Services */}
      <section className="py-24 bg-[#0c0c0e] border-t border-white/10 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h3 className="text-xs font-mono text-[#ccff00] mb-2 uppercase tracking-[0.4em] font-bold">[ RELATED_SYSTEMS ]</h3>
            <p className="text-sm text-zinc-400 font-sans">
              Explore our related services: <Link to="/seo-mastery" className="text-white underline hover:text-[#ccff00]">SEO Mastery</Link> · <Link to="/content-writing" className="text-white underline hover:text-[#ccff00]">Content Writing</Link> · <Link to="/web-development" className="text-white underline hover:text-[#ccff00]">Web Development</Link>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "SEO Mastery", path: "/seo-mastery", icon: <SearchCode className="w-5 h-5" /> },
              { title: "Content Writing", path: "/content-writing", icon: <PenTool className="w-5 h-5" /> },
              { title: "Web Development", path: "/web-development", icon: <Globe className="w-5 h-5" /> },
              { title: "Custom Software", path: "/custom-software", icon: <Code2 className="w-5 h-5" /> },
              { title: "AI Agents", path: "/ai-agent-development", icon: <Cpu className="w-5 h-5" /> },
              { title: "Creative & Branding", path: "/graphics-design", icon: <Palette className="w-5 h-5" /> }
            ].map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className="group flex items-center justify-between p-6 md:p-8 bg-zinc-900/60 border border-white/10 rounded-2xl transition-all hover:border-[#ccff00]/40 hover:bg-zinc-900"
              >
                <div className="flex items-center gap-4">
                  <div className="text-[#ccff00] bg-zinc-800/80 border border-white/10 p-3 rounded-xl group-hover:bg-[#ccff00] group-hover:text-black transition-all">
                    {link.icon}
                  </div>
                  <span className="font-bold uppercase tracking-tight text-white">{link.title}</span>
                </div>
                <ArrowUpRight className="text-zinc-500 group-hover:text-[#ccff00] transition-colors" size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DigitalMarketingPage;

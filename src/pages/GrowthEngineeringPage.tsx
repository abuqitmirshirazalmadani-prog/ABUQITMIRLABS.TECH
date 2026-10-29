import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  TrendingUp,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import SEO from '../components/SEO';
import { growthEngineeringPageSchema } from '../utils/growthEngineeringStaticHtml';

const GrowthEngineeringPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const brokenVendorPoints = [
    {
      bold: 'The dev shop ships slow pages',
      rest: "that fail Core Web Vitals and can't rank in Google or AI search engines.",
      tag: 'ARCHITECTURE GAP',
    },
    {
      bold: 'The marketing agency drives traffic',
      rest: "to landing pages that don't connect to your CRM, product onboarding, or AI qualification flows.",
      tag: 'ATTRIBUTION LEAK',
    },
    {
      bold: 'The AI consultant builds isolated chatbots',
      rest: 'that have no context on search intent, pipeline data, or product usage.',
      tag: 'SILOED AUTOMATION',
    },
    {
      bold: 'Nobody owns the full revenue number',
      rest: '— each vendor blames the other two when pipeline stalls.',
      tag: 'ZERO ACCOUNTABILITY',
    },
  ];

  const faqItems = [
    {
      q: 'What is growth engineering?',
      a: 'Growth engineering is the practice of building software, AI systems, and marketing infrastructure as one connected revenue engine — rather than hiring separate vendors for development, automation, and customer acquisition.',
    },
    {
      q: 'How is a growth engineering firm different from a digital marketing agency?',
      a: 'A traditional marketing agency runs ads, writes content, and optimizes pages on top of whatever software you already have. A growth engineering firm builds the underlying product, AI workflows, data pipelines, and marketing infrastructure together so that acquisition, activation, and retention compound.',
    },
    {
      q: 'How is a growth engineering firm different from a software dev shop?',
      a: 'A dev shop ships features against a ticket backlog and hands off the code. A growth engineering firm architects software specifically around revenue outcomes — conversion paths, search visibility, AI-driven lead qualification, and retention loops.',
    },
    {
      q: 'Who is growth engineering built for?',
      a: 'Growth engineering is built for B2B companies, funded startups, and scaling SMEs that need custom software, AI automation, and organic/performance acquisition working as a single system rather than three disconnected agency retainers.',
    },
    {
      q: 'Can I hire AbuQitmirLabs for just software development or just SEO?',
      a: 'Yes. Each pillar — custom software, web and mobile apps, AI agents, technical SEO, and content — is available as a standalone engagement or as part of a full growth engineering system.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans antialiased overflow-x-hidden relative selection:bg-[#ccff00]/30 selection:text-white">
      <SEO
        title="Growth Engineering Firm | Software + AI + Marketing | AbuQitmirLabs"
        description="AbuQitmirLabs engineers revenue systems for B2B companies — combining custom software, AI automation, and performance marketing under one roof."
        canonical="https://www.abuqitmirlabs.tech/growth-engineering"
        schema={growthEngineeringPageSchema}
      />

      <Header />

      <main id="main-content" className="relative z-10 pt-28 md:pt-36">
        {/* Normal-flow Breadcrumbs with ample clearance below fixed Header */}
        <div className="max-w-7xl mx-auto px-6 mb-4 md:mb-6">
          <Breadcrumbs
            inline
            disableSchema
            items={[
              { label: 'HQ', path: '/' },
              { label: 'Growth Engineering', path: '/growth-engineering' },
            ]}
          />
        </div>

        {/* ===================================================== */}
        {/* SECTION 1 — HERO + DEFINITION                         */}
        {/* ===================================================== */}
        <section
          id="hero"
          className="relative pt-4 md:pt-8 pb-20 md:pb-28 overflow-hidden border-b border-white/10"
        >
          {/* Signature Brand Ambient Glows & Architectural Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(204,255,0,0.08),transparent_55%)] pointer-events-none" />
          <div className="absolute top-10 right-1/4 w-[520px] h-[520px] bg-[#ccff00]/[0.05] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] bg-blue-600/[0.06] rounded-full blur-[130px] pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '4rem 4rem',
            }}
          />

          <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/90 border border-[#ccff00]/30 backdrop-blur-md shadow-[0_0_25px_rgba(204,255,0,0.12)]"
            >
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              <p className="eyebrow text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold m-0">
                Growth Engineering Firm
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white leading-[1.08] tracking-tight max-w-5xl"
            >
              Growth Engineering: Software, AI &amp; Marketing Engineered as{' '}
              <span className="text-[#ccff00] italic font-normal">One Revenue System</span>
            </motion.h1>

            {/* Direct Definition Callout Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="relative p-6 md:p-8 rounded-r-2xl bg-zinc-900/80 border-l-4 border-[#ccff00] border-y border-r border-y-white/10 border-r-white/10 max-w-4xl backdrop-blur-xl shadow-2xl"
            >
              <p className="lead text-lg md:text-xl text-neutral-200 leading-relaxed font-light m-0">
                <strong className="text-white font-semibold">Growth engineering</strong> is the discipline of building custom software, AI automation, and performance marketing as a single connected system — so every line of code, every AI workflow, and every acquisition channel is engineered around measurable revenue outcomes.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-base md:text-lg text-neutral-300 max-w-4xl leading-relaxed font-light"
            >
              At <strong className="text-white font-semibold">AbuQitmirLabs</strong>, we don&apos;t separate &ldquo;the dev team&rdquo; from &ldquo;the growth team.&rdquo; Our software architects, AI engineers, and SEO/marketing strategists work inside one unified sprint cycle for B2B companies across the US, UK, UAE, Saudi Arabia, Canada, Australia, and Pakistan.
            </motion.p>

            {/* E-E-A-T Inline Trust Signal Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-300 py-3.5 px-5 bg-zinc-900/80 border border-[#ccff00]/30 rounded-xl max-w-3xl backdrop-blur-md"
            >
              <span className="text-[#ccff00] font-bold">⭐ TajweedPage.com &amp; GhastlyPages — Delivered</span>
              <span className="text-zinc-600">•</span>
              <span>🔒 100% IP &amp; Source Code Ownership</span>
              <span className="text-zinc-600">•</span>
              <span>⚡ Unified Software + AI + Growth</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="cta-row flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center gap-3 bg-[#ccff00] hover:bg-white text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                <span>Book a Growth Engineering Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/case-studies"
                className="btn-secondary inline-flex items-center gap-2 border border-white/20 bg-white/[0.03] hover:bg-white/[0.08] text-white hover:border-[#ccff00] hover:text-[#ccff00] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300"
              >
                <span>View Case Studies</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Global Delivery Marquee (Matches Site-Wide Service Pages) */}
        <CountryMarquee />

        {/* ===================================================== */}
        {/* SECTION 2 — THE BROKEN 3-VENDOR MODEL                 */}
        {/* ===================================================== */}
        <section id="problem" className="relative py-20 md:py-28 bg-zinc-950/60 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="max-w-3xl space-y-4"
            >
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
                01 / The Structural Bottleneck
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
                Why Hiring 3 Separate Agencies Breaks Your Growth
              </h2>
              <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed">
                Most growing B2B companies hire a software house to build the product, an AI freelancer to bolt on automation, and a marketing agency to drive traffic. Within six months, the cracks appear:
              </p>
            </motion.div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0 m-0">
              {brokenVendorPoints.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group relative overflow-hidden p-7 md:p-8 bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-[#ccff00]/40 rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(204,255,0,0.12)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ccff00]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff5b36] px-3 py-1 bg-[#ff5b36]/10 border border-[#ff5b36]/25 rounded-full">
                      {item.tag}
                    </span>
                    <AlertTriangle className="w-5 h-5 text-[#ff5b36] opacity-80 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed m-0">
                    <strong className="text-white font-semibold">{item.bold}</strong> {item.rest}
                  </p>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#ccff00]/10 via-zinc-900/90 to-zinc-900/90 border border-[#ccff00]/30 flex flex-col md:flex-row items-start md:items-center gap-4"
            >
              <Zap className="w-7 h-7 text-[#ccff00] shrink-0" />
              <p className="text-neutral-200 text-base md:text-lg font-light leading-relaxed m-0">
                Growth engineering eliminates the handoff gap by putting software architecture, AI automation, and demand generation under one engineering team and one accountability model.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* SECTION 3 — THE 3 PILLARS (INTERNAL LINK HUB)         */}
        {/* ===================================================== */}
        <section id="pillars" className="relative py-20 md:py-28 border-b border-white/10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#ccff00]/[0.04] rounded-full blur-[160px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-14">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="max-w-3xl space-y-4"
            >
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
                02 / Unified Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
                The 3 Pillars of Our Growth Engineering System
              </h2>
            </motion.div>

            <div className="pillar-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <motion.article
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="pillar-card group relative overflow-hidden p-8 bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-[#ccff00]/50 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(204,255,0,0.18)] flex flex-col justify-between space-y-6"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ccff00]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/25 rounded-full">
                      PILLAR 01 // BUILD
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Layers className="w-5 h-5 text-[#ccff00]" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif text-white group-hover:text-[#ccff00] transition-colors">
                    Pillar 1 — Product &amp; Platform Engineering
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed font-light">
                    High-speed, conversion-architected web applications, custom software, and mobile apps built from day one for search crawlability, sub-second load times, and clean analytics instrumentation.
                  </p>
                </div>

                <ul className="space-y-3 text-sm text-neutral-300 pt-4 border-t border-white/10 list-none p-0 m-0">
                  <li>
                    <Link to="/custom-software" className="text-[#ccff00] font-semibold hover:underline">
                      Custom Software Development
                    </Link>{' '}
                    — ERPs, SaaS platforms &amp; internal tools
                  </li>
                  <li>
                    <Link to="/web-development" className="text-[#ccff00] font-semibold hover:underline">
                      Web Development
                    </Link>{' '}
                    — Next.js, React &amp; high-conversion web platforms
                  </li>
                  <li>
                    <Link to="/mobile-app-development" className="text-[#ccff00] font-semibold hover:underline">
                      Mobile App Development
                    </Link>{' '}
                    — Flutter, React Native &amp; native iOS/Android
                  </li>
                </ul>
              </motion.article>

              {/* Pillar 2 */}
              <motion.article
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="pillar-card group relative overflow-hidden p-8 bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-[#ccff00]/50 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(204,255,0,0.18)] flex flex-col justify-between space-y-6"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ccff00]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/25 rounded-full">
                      PILLAR 02 // AUTOMATE
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Cpu className="w-5 h-5 text-[#ccff00]" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif text-white group-hover:text-[#ccff00] transition-colors">
                    Pillar 2 — AI Agents &amp; Workflow Automation
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed font-light">
                    Production-grade AI agents, RAG pipelines, and internal automations that qualify inbound leads in real time, compress operational overhead, and turn proprietary company data into a competitive moat.
                  </p>
                </div>

                <ul className="space-y-3 text-sm text-neutral-300 pt-4 border-t border-white/10 list-none p-0 m-0">
                  <li>
                    <Link to="/ai-agent-development" className="text-[#ccff00] font-semibold hover:underline">
                      AI Agent Development
                    </Link>{' '}
                    — Custom LLM agents, RAG &amp; tool-use workflows
                  </li>
                  <li>
                    <Link to="/solutions/ai-automation" className="text-[#ccff00] font-semibold hover:underline">
                      AI Automation Solutions
                    </Link>{' '}
                    — CRM, operations &amp; pipeline automation
                  </li>
                  <li>
                    <Link to="/ai-video-creation" className="text-[#ccff00] font-semibold hover:underline">
                      AI Video Creation
                    </Link>{' '}
                    — Cinematic AI production for acquisition &amp; brand
                  </li>
                </ul>
              </motion.article>

              {/* Pillar 3 */}
              <motion.article
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.25 }}
                className="pillar-card group relative overflow-hidden p-8 bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-[#ccff00]/50 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(204,255,0,0.18)] flex flex-col justify-between space-y-6"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ccff00]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/25 rounded-full">
                      PILLAR 03 // ACQUIRE
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-5 h-5 text-[#ccff00]" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif text-white group-hover:text-[#ccff00] transition-colors">
                    Pillar 3 — Organic &amp; Performance Acquisition
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed font-light">
                    Technical SEO, Generative Engine Optimization (GEO), brand positioning, and authority content engineered to capture high-intent buyers across Google, ChatGPT, Perplexity, and AI Overviews.
                  </p>
                </div>

                <ul className="space-y-3 text-sm text-neutral-300 pt-4 border-t border-white/10 list-none p-0 m-0">
                  <li>
                    <Link to="/seo-mastery" className="text-[#ccff00] font-semibold hover:underline">
                      SEO &amp; GEO Mastery
                    </Link>{' '}
                    — Technical SEO, entity architecture &amp; AI visibility
                  </li>
                  <li>
                    <Link to="/digital-marketing" className="text-[#ccff00] font-semibold hover:underline">
                      Digital Marketing
                    </Link>{' '}
                    — Full-funnel B2B &amp; SaaS acquisition
                  </li>
                  <li>
                    <Link to="/brand-building" className="text-[#ccff00] font-semibold hover:underline">
                      Brand Building
                    </Link>{' '}
                    — Positioning, visual identity &amp; design systems
                  </li>
                  <li>
                    <Link to="/content-writing" className="text-[#ccff00] font-semibold hover:underline">
                      Content Writing
                    </Link>{' '}
                    — Technical, SEO &amp; GEO-structured content
                  </li>
                </ul>
              </motion.article>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* SECTION 4 — COMPARISON TABLE (HIGH AI-CITATION VALUE) */}
        {/* ===================================================== */}
        <section id="comparison" className="relative py-20 md:py-28 bg-zinc-950/60 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="max-w-3xl space-y-4"
            >
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
                03 / Model Comparison
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
                Growth Engineering Firm vs Marketing Agency vs Dev Shop
              </h2>
              <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed">
                Here is how a unified growth engineering model compares to hiring a traditional marketing agency or a standalone software development shop:
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-x-auto rounded-2xl border border-white/15 bg-zinc-900/60 backdrop-blur-xl shadow-2xl"
            >
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-zinc-950/90 border-b border-white/15 text-white">
                    <th className="p-4 md:p-5 font-mono text-xs uppercase tracking-wider">Capability</th>
                    <th className="p-4 md:p-5 font-mono text-xs uppercase tracking-wider text-[#ccff00] bg-[#ccff00]/[0.05]">
                      Growth Engineering Firm (AbuQitmirLabs)
                    </th>
                    <th className="p-4 md:p-5 font-mono text-xs uppercase tracking-wider text-neutral-300">
                      Traditional Marketing Agency
                    </th>
                    <th className="p-4 md:p-5 font-mono text-xs uppercase tracking-wider text-neutral-300">
                      Software Dev Shop
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-neutral-300">
                  <tr className="hover:bg-white/[0.03] transition-colors">
                    <td className="p-4 md:p-5 font-semibold text-white">Primary Deliverable</td>
                    <td className="p-4 md:p-5 text-white font-medium bg-[#ccff00]/[0.03]">
                      End-to-end revenue system (product + AI + acquisition)
                    </td>
                    <td className="p-4 md:p-5">Campaigns, traffic &amp; monthly reports</td>
                    <td className="p-4 md:p-5">Shipped code against feature tickets</td>
                  </tr>
                  <tr className="hover:bg-white/[0.03] transition-colors">
                    <td className="p-4 md:p-5 font-semibold text-white">Custom Software &amp; Web Apps</td>
                    <td className="p-4 md:p-5 text-white font-medium bg-[#ccff00]/[0.03]">
                      Yes — in-house senior architects
                    </td>
                    <td className="p-4 md:p-5">No (WordPress/Webflow templates only)</td>
                    <td className="p-4 md:p-5">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.03] transition-colors">
                    <td className="p-4 md:p-5 font-semibold text-white">AI Agents &amp; RAG Pipelines</td>
                    <td className="p-4 md:p-5 text-white font-medium bg-[#ccff00]/[0.03]">
                      Yes — integrated into CRM &amp; product
                    </td>
                    <td className="p-4 md:p-5">No (basic prompt tools only)</td>
                    <td className="p-4 md:p-5">Sometimes (disconnected from marketing)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.03] transition-colors">
                    <td className="p-4 md:p-5 font-semibold text-white">Technical SEO &amp; GEO (AI Search)</td>
                    <td className="p-4 md:p-5 text-white font-medium bg-[#ccff00]/[0.03]">
                      Engineered into code &amp; schema at build time
                    </td>
                    <td className="p-4 md:p-5">Bolted on after launch via plugins</td>
                    <td className="p-4 md:p-5">Rarely included</td>
                  </tr>
                  <tr className="hover:bg-white/[0.03] transition-colors">
                    <td className="p-4 md:p-5 font-semibold text-white">Conversion &amp; Attribution Architecture</td>
                    <td className="p-4 md:p-5 text-white font-medium bg-[#ccff00]/[0.03]">
                      Unified across product, CRM &amp; content
                    </td>
                    <td className="p-4 md:p-5">Ad-platform level only</td>
                    <td className="p-4 md:p-5">Not in scope</td>
                  </tr>
                  <tr className="hover:bg-white/[0.03] transition-colors">
                    <td className="p-4 md:p-5 font-semibold text-white">Code &amp; IP Ownership</td>
                    <td className="p-4 md:p-5 text-white font-medium bg-[#ccff00]/[0.03]">
                      100% client-owned, zero lock-in
                    </td>
                    <td className="p-4 md:p-5">Agency-owned accounts/templates</td>
                    <td className="p-4 md:p-5">Varies by contract</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* SECTION 5 — WHEN TO CHOOSE GROWTH ENGINEERING         */}
        {/* ===================================================== */}
        <section id="when-to-choose" className="relative py-20 md:py-28 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="max-w-3xl space-y-4"
            >
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
                04 / Fit &amp; Qualification
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
                When to Choose a Growth Engineering Firm
              </h2>
            </motion.div>

            <div className="decision-grid grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="group relative overflow-hidden p-8 md:p-10 bg-zinc-900/70 backdrop-blur-xl border border-[#ccff00]/40 rounded-2xl space-y-6 shadow-[0_0_35px_rgba(204,255,0,0.08)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ccff00]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                <h3 className="text-2xl font-serif text-white flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#ccff00] shrink-0" />
                  <span>Choose Growth Engineering If:</span>
                </h3>
                <ul className="list-disc pl-6 space-y-3.5 text-neutral-200 text-sm md:text-base font-light leading-relaxed">
                  <li>
                    You are launching or rebuilding a B2B product, SaaS platform, or service platform and need acquisition built into the architecture from day one.
                  </li>
                  <li>
                    You are tired of managing separate retainers for developers, SEO consultants, and AI contractors who don&apos;t talk to each other.
                  </li>
                  <li>
                    You want your website, AI agents, CRM, and organic search strategy to share one data layer and one conversion goal.
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="p-8 md:p-10 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl space-y-6"
              >
                <h3 className="text-2xl font-serif text-white flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-zinc-400 shrink-0" />
                  <span>Choose a Traditional Agency or Dev Shop If:</span>
                </h3>
                <ul className="list-disc pl-6 space-y-3.5 text-neutral-300 text-sm md:text-base font-light leading-relaxed">
                  <li>
                    You already have a full in-house engineering and AI team and only need someone to manage paid ad spend.
                  </li>
                  <li>
                    You have a fixed, internal-only software spec with zero marketing, search, or customer acquisition requirements.
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* SECTION 6 — STANDALONE FLEXIBILITY                    */}
        {/* ===================================================== */}
        <section id="standalone" className="relative py-20 md:py-28 bg-zinc-950/60 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="relative overflow-hidden p-8 md:p-14 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-black border border-white/15 hover:border-[#ccff00]/40 rounded-3xl space-y-6 transition-all duration-500 shadow-2xl"
            >
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#ccff00]/10 rounded-full blur-[90px] pointer-events-none" />
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold">
                <Sparkles className="w-4 h-4" />
                <span>05 / Modular Engagement</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
                Need Only One Pillar? Every Service Works Standalone Too
              </h2>
              <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed max-w-4xl">
                You don&apos;t have to buy the full system on day one. Many clients start with a single engagement — such as{' '}
                <Link to="/custom-software" className="text-[#ccff00] underline hover:text-white transition-colors font-medium">
                  custom software development
                </Link>
                , a{' '}
                <Link to="/web-development" className="text-[#ccff00] underline hover:text-white transition-colors font-medium">
                  high-performance website
                </Link>
                , a{' '}
                <Link to="/ai-agent-development" className="text-[#ccff00] underline hover:text-white transition-colors font-medium">
                  custom AI agent
                </Link>
                , or a{' '}
                <Link to="/local-seo-audit" className="text-[#ccff00] underline hover:text-white transition-colors font-medium">
                  technical SEO audit
                </Link>{' '}
                — and expand into full growth engineering as results compound. Because the same senior team builds every layer, nothing ever needs to be rebuilt when you scale.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* SECTION 7 — FAQ (MATCHES FAQPAGE SCHEMA)              */}
        {/* ===================================================== */}
        <section id="faq" className="relative py-20 md:py-28 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="max-w-3xl space-y-4"
            >
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
                06 / Answers &amp; Clarity
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
                Frequently Asked Questions About Growth Engineering
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 max-w-5xl">
              {faqItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  className="faq-item group relative overflow-hidden p-6 md:p-8 bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-[#ccff00]/40 rounded-2xl space-y-3 transition-all duration-300"
                >
                  <div className="flex items-start gap-3.5">
                    <HelpCircle className="w-5 h-5 text-[#ccff00] shrink-0 mt-1" />
                    <div className="space-y-2.5">
                      <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-[#ccff00] transition-colors">
                        {item.q}
                      </h3>
                      <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed m-0">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* SECTION 8 — FINAL CTA                                 */}
        {/* ===================================================== */}
        <section id="final-cta" className="relative py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden p-10 md:p-16 bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black border border-[#ccff00]/35 rounded-3xl text-center space-y-6 shadow-[0_0_60px_rgba(204,255,0,0.08)]"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#ccff00]/10 rounded-full blur-[120px] pointer-events-none" />
              <h2 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight max-w-3xl mx-auto">
                Ready to Replace Disconnected Vendors With One Growth Engine?
              </h2>
              <p className="relative z-10 text-neutral-300 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
                Get a free technical and growth audit from our senior architects. We&apos;ll map your software, AI, and acquisition bottlenecks and hand you a clear execution roadmap.
              </p>
              <div className="relative z-10 pt-4">
                <Link
                  to="/contact"
                  className="btn-primary inline-flex items-center gap-3 bg-[#ccff00] hover:bg-white text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(204,255,0,0.3)]"
                >
                  <span>Get Your Free Growth Engineering Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GrowthEngineeringPage;

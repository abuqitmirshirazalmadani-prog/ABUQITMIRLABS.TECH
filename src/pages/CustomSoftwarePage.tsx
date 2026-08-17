"use client";

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import { customSoftwareSchema } from '../utils/customSoftwareStaticHtml';

const CustomSoftwarePage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const whatWeBuildItems = [
    {
      title: "Enterprise ERPs & Business Systems",
      tag: "Enterprise",
      desc: "We engineer enterprise resource planning systems that connect your operations — inventory, procurement, finance, HR — into a single, unified platform. Built for your processes, not the average company's.",
      iconId: "icon-database",
      link: "/contact",
      linkText: "Discuss ERP architecture"
    },
    {
      title: "SaaS Platforms & Web Applications",
      tag: "Cloud Product",
      desc: "From multi-tenant SaaS products to client-facing web platforms, we architect and ship full-stack web applications using modern cloud-native frameworks. Your platform scales from day one.",
      iconId: "icon-rocket",
      link: "/web-development",
      linkText: "Explore web platform engineering"
    },
    {
      title: "AI-Powered Custom Tools",
      tag: "AI & RAG",
      desc: "We integrate large language models, RAG pipelines, and autonomous AI agents directly into your custom software. If your business process involves data retrieval, classification, or decision support, we can automate it at the application layer.",
      iconId: "icon-brain-circuit",
      link: "/ai-agent-development",
      linkText: "Explore AI agent development"
    },
    {
      title: "Mobile-First Custom Software",
      tag: "Mobile",
      desc: "When your workflow lives in the field — on a device, not a desk — we build mobile-first custom software using Flutter and native iOS/Android. Cross-platform where it makes sense, native where performance demands it.",
      iconId: "icon-smartphone",
      link: "/mobile-app-development",
      linkText: "Explore mobile app engineering"
    },
    {
      title: "API Integrations & Middleware",
      tag: "Connectivity",
      desc: "We build the connective tissue between your systems — payment gateways, CRMs, third-party APIs, logistics providers — so your software stack operates as one cohesive system rather than a collection of disconnected tools.",
      iconId: "icon-cpu",
      link: "/contact",
      linkText: "Connect your infrastructure"
    },
    {
      title: "Legacy System Modernisation",
      tag: "Refactoring",
      desc: "We migrate aging codebases to modern architectures without disrupting live operations. The result: faster performance, reduced maintenance cost, and a system your team can actually extend.",
      iconId: "icon-refresh-cw",
      link: "/contact",
      linkText: "Modernize legacy codebase"
    }
  ];

  const processSteps = [
    {
      num: "01",
      title: "Discovery & Requirements Engineering",
      desc: "We map your business workflows, document functional requirements, and identify the integration points your system needs to connect. This stage prevents scope creep later."
    },
    {
      num: "02",
      title: "UX/UI Architecture",
      desc: "We design the user experience before writing a line of backend code. Wireframes, interaction flows, and design prototypes are reviewed and approved before development begins."
    },
    {
      num: "03",
      title: "Core Development",
      desc: "Our engineering team builds in structured sprints with regular demos. You see working software at each milestone — not a finished product six months later that doesn't match what you asked for."
    },
    {
      num: "04",
      title: "Integration, Security & QA",
      desc: "Every system goes through integration testing, security review, and quality assurance before it touches a production environment. We test edge cases, not just happy paths."
    },
    {
      num: "05",
      title: "Deployment & Ongoing Support",
      desc: "We deploy to your chosen infrastructure — cloud, on-premise, or hybrid — and provide structured post-launch support. Your team is never left holding an undocumented codebase."
    }
  ];

  const faqs = [
    {
      q: "What technologies do you use for custom software development?",
      a: "We use technologies selected for the problem, not the other way around. Common choices include React, Next.js, Node.js, Python, PostgreSQL, and cloud platforms (AWS, GCP, Azure). For AI-integrated systems we work with LangChain, vector databases, and RAG pipelines. We document the full stack in your project specification before development begins."
    },
    {
      q: "Do you work with startups or only established businesses?",
      a: "Both. We've worked with early-stage founders building their first product and with established businesses replacing legacy systems. The discovery process is the same either way — we scope to your requirements, not your company size."
    },
    {
      q: "Can you take over a project another development team started?",
      a: "Yes. We conduct a codebase audit first to assess what's worth preserving and what needs to be rebuilt. We don't inherit someone else's technical debt blindly — we tell you what we find before we agree to take it on."
    },
    {
      q: "What happens after the software is launched?",
      a: "We provide structured post-launch support covering bug resolution, minor enhancements, and monitoring. Longer-term maintenance and feature development can be scoped as a separate ongoing engagement."
    },
    {
      q: "Will I be able to modify the software myself after the project?",
      a: "If your team has developers, yes — the codebase is documented and fully yours. If not, we can provide a retainer for ongoing changes, or we can help you hire developers who can maintain it independently."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans antialiased">
      <Helmet>
        <title>Custom Software Development Company | AbuQitmirLabs</title>
        <meta name="description" content="Bespoke software built around your workflows — ERPs, SaaS platforms, AI-powered tools, and enterprise systems. Full IP ownership." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/custom-software" />

        {/* Open Graph */}
        <meta property="og:title" content="Custom Software Development Company | AbuQitmirLabs" />
        <meta property="og:description" content="Bespoke software built around your workflows — ERPs, SaaS platforms, AI-powered tools, and enterprise systems. Full IP ownership." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/custom-software" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Custom Software Development Company | AbuQitmirLabs" />
        <meta name="twitter:description" content="Bespoke software built around your workflows — ERPs, SaaS platforms, AI-powered tools, and enterprise systems. Full IP ownership." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Unified JSON-LD Schema */}
        <script type="application/ld+json">{JSON.stringify(customSoftwareSchema)}</script>
      </Helmet>

      {/* Accessible Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#ccff00] focus:text-black focus:font-bold focus:rounded-lg"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'Solutions', path: '/#services' },
            { label: 'Custom Software Development', path: '/custom-software' }
          ]} />
        </div>

        {/* Hero Section with EXACT Single H1 */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10" aria-labelledby="custom-software-hero-title">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(204,255,0,0.06),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-6">
              <svg className="w-4 h-4 text-[#ccff00]" aria-hidden="true"><use href="/sprite.svg#icon-code" /></svg>
              Bespoke Engineering Studio
            </div>

            <h1 id="custom-software-hero-title" className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl text-white">
              Custom Software Development Company
            </h1>

            {/* Direct Answer Block for AEO/GEO */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl max-w-4xl mb-8 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Direct Answer:</strong> Custom software development is the process of building software engineered specifically for your business — designed around your exact workflows, data requirements, and integrations rather than forcing you to adapt to a generic tool. AbuQitmirLabs builds bespoke software systems that you own outright, from enterprise ERPs to AI-powered SaaS platforms.
              </p>
            </div>

            {/* E-E-A-T Inline Trust Signal Bar */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-300 py-3 px-4 bg-zinc-900/80 border border-[#ccff00]/30 rounded-xl mb-8 max-w-3xl">
              <span className="text-[#ccff00] font-bold">⭐ TajweedPage.com — Delivered</span>
              <span className="text-zinc-600">•</span>
              <span>🔒 100% IP &amp; Source Code Ownership</span>
              <span className="text-zinc-600">•</span>
              <span>⚡ Zero Vendor Lock-In</span>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-10 font-light">
              Generic tools force your team into rigid workflows and ongoing subscription fees. We engineer resilient, custom software systems that solve your exact business bottlenecks and scale with your growth.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link 
                to="/contact" 
                aria-label="Talk to AbuQitmirLabs about your custom software project"
                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Talk to AbuQitmirLabs About Your Project
                <svg className="w-5 h-5" aria-hidden="true"><use href="/sprite.svg#icon-arrow-right" /></svg>
              </Link>
              <Link 
                to="/case-studies" 
                aria-label="View our completed engineering case studies"
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </section>

        <CountryMarquee />

        {/* Section 1: What Is Custom Software Development? */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="what-is-custom-software-h2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Strategic Foundation</span>
              <h2 id="what-is-custom-software-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
                What Is Custom Software Development?
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                Custom software development means building a system from the ground up to solve a specific business problem — one that no off-the-shelf product addresses cleanly.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                The global custom software development market is valued at $43.2 billion in 2024 and projected to reach $146.2 billion by 2030 — a compound annual growth rate above 22%. That growth reflects a straightforward reality: generic tools create compromises. Custom software eliminates them.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                At AbuQitmirLabs, every build starts with your workflows, not a template. You get full source code ownership, full IP ownership, and a system built to scale with your business — not against it.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: What We Build */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="what-we-build-h2">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Platform Capabilities</span>
            <h2 id="what-we-build-h2" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6 text-white">
              What We Build
            </h2>
            <p className="text-gray-400 text-base md:text-lg font-light">
              From enterprise operations to high-throughput SaaS platforms, we architect resilient digital assets built to your exact specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whatWeBuildItems.map((item, idx) => (
              <motion.article 
                key={idx} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-[#ccff00]/50 hover:shadow-[0_0_30px_rgba(204,255,0,0.2)] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ccff00]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full">
                      {item.tag}
                    </span>
                    <svg className="w-7 h-7 text-gray-400 group-hover:text-[#ccff00] group-hover:scale-110 transition-all duration-300" aria-hidden="true">
                      <use href={`/sprite.svg#${item.iconId}`} />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#ccff00] transition-colors">{item.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">{item.desc}</p>
                </div>
                <Link 
                  to={item.link} 
                  aria-label={`${item.linkText} - AbuQitmirLabs`}
                  className="text-xs font-mono uppercase text-[#ccff00] hover:text-white flex items-center gap-1 mt-4 transition-colors font-semibold"
                >
                  {item.linkText}
                  <svg className="w-3 h-3" aria-hidden="true"><use href="/sprite.svg#icon-chevron-right" /></svg>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Section 3: Our 5-Step Development Process */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="development-process-h2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Methodology</span>
              <h2 id="development-process-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
                Our 5-Step Development Process
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                Structured sprints, regular demos, and continuous QA ensure your system launches on schedule without scope drift.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {processSteps.map((step, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-[#ccff00]/40 transition-colors flex flex-col justify-between">
                  <div>
                    <span className="text-3xl font-extrabold text-[#ccff00] font-mono block mb-3">{step.num}</span>
                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-300 text-xs leading-relaxed font-light">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: What You Own */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="what-you-own-h2">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-12 rounded-3xl bg-zinc-900/80 border border-[#ccff00]/40 shadow-2xl backdrop-blur-md">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Intellectual Property Guarantee</span>
              <h2 id="what-you-own-h2" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-white">
                What You Own
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed mb-6 font-light">
                Every line of code we write belongs to you. AbuQitmirLabs transfers full intellectual property and source code ownership at project completion — no licensing fees, no vendor lock-in, no ongoing dependency on us to access your own system.
              </p>
              <p className="text-gray-300 text-base leading-relaxed font-light">
                This matters more than most buyers realise. Many development firms retain a license to the components they build, meaning you're renting your own software. We don't operate that way.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Custom Software vs Off-the-Shelf: When to Choose Custom */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="custom-vs-off-the-shelf-h2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Decision Framework</span>
              <h2 id="custom-vs-off-the-shelf-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
                Custom Software vs Off-the-Shelf: When to Choose Custom
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                Off-the-shelf software makes sense when your workflow is standard and a mature product already covers it well. Custom software is the right choice when:
              </p>
              <ul className="space-y-4 text-gray-200 text-base leading-relaxed mb-8 list-disc pl-6 font-light">
                <li>Your process has regulatory or compliance requirements a generic tool doesn't meet</li>
                <li>You need to integrate multiple systems that don't natively connect</li>
                <li>You're building a product to sell to other businesses (SaaS)</li>
                <li>A generic tool forces your team to change how they work rather than the other way around</li>
                <li>You've outgrown your current software and rebuilding from scratch is cheaper than patching</li>
              </ul>
              <p className="text-gray-300 text-base leading-relaxed font-light">
                The decision isn't always custom vs. off-the-shelf. Sometimes the answer is a custom layer built on top of an existing platform. We'll tell you which approach makes more sense for your situation before you commit to a build.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: How Much Does Custom Software Development Cost? */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="cost-analysis-h2">
          <div className="max-w-3xl mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Investment Scoping</span>
            <h2 id="cost-analysis-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
              How Much Does Custom Software Development Cost?
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Cost depends on scope, complexity, and the number of integrations involved. As a general reference point:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Simple Internal Tools</h3>
                <p className="text-[#ccff00] font-mono text-xs uppercase tracking-wider mb-4">Single workflow, no complex integrations</p>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  Lower four figures to mid-five figures. Built for focused internal operations, departmental workflows, or single-process automation.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/80 border border-[#ccff00]/40 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Mid-Complexity Platforms</h3>
                <p className="text-[#ccff00] font-mono text-xs uppercase tracking-wider mb-4">Multi-role, several integrations, custom reporting</p>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  Mid-to-upper five figures. Includes customer portals, ERP modules, multi-channel payment integrations, and centralized database logic.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Enterprise Systems or SaaS</h3>
                <p className="text-[#ccff00] font-mono text-xs uppercase tracking-wider mb-4">Multi-tenant, high concurrency, complex data architecture</p>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  Six figures and above. Engineered for global scale, high-frequency transactions, enterprise security, and multi-tier subscription billing.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/70 p-8 rounded-2xl border border-white/10 max-w-3xl">
            <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
              The most accurate way to scope cost is to start with a discovery engagement — a structured requirements session that produces a detailed specification. This gives you a fixed scope to price against, rather than an estimate that shifts as requirements become clearer.
            </p>
            <Link 
              to="/contact" 
              aria-label="Talk to AbuQitmirLabs about your custom software project"
              className="inline-flex items-center gap-2 text-sm font-mono uppercase text-[#ccff00] font-bold hover:underline"
            >
              Talk to AbuQitmirLabs about your project →
            </Link>
          </div>
        </section>

        {/* Section 7: How Long Does It Take? */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="timeline-h2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Project Timelines</span>
              <h2 id="timeline-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
                How Long Does It Take?
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                Timelines depend on scope. A focused single-workflow tool can be in production in six to ten weeks. A full SaaS platform with multiple user roles, billing integration, and custom reporting typically takes four to eight months. Enterprise systems with legacy migration components run longer.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                What we control is communication. You'll never be left wondering where the project stands.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: Why AbuQitmirLabs? */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="why-abuqitmirlabs-h2">
          <div className="max-w-4xl">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Proven Track Record</span>
            <h2 id="why-abuqitmirlabs-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
              Why AbuQitmirLabs?
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
              AbuQitmirLabs engineers systems where standard tools don't reach.
            </p>

            <div className="p-8 rounded-2xl bg-zinc-900/80 border border-[#ccff00]/40 mb-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-3">TajweedPage.com — Case Study In Custom Engineering</h3>
              <p className="text-gray-300 text-base leading-relaxed mb-4 font-light">
                Our most documented build is <Link to="/case-studies/tajweedpage" className="text-[#ccff00] hover:underline font-semibold" aria-label="Read TajweedPage custom AI case study">TajweedPage.com</Link> — the world's first RAG-based AI Tajweed teacher. We engineered the complete AI system: the retrieval-augmented generation pipeline, the programmatic content architecture, and the real-time Quranic recitation guidance layer. It's an EdTech platform that required a custom AI stack from scratch, because no off-the-shelf solution existed for what it needed to do.
              </p>
              <p className="text-[#ccff00] font-mono text-sm">
                That's the kind of problem we're built for.
              </p>
            </div>

            <p className="text-gray-300 text-base leading-relaxed font-light">
              We also bring a full-stack discipline to every engagement: custom <Link to="/web-development" className="text-[#ccff00] hover:underline font-medium" aria-label="Explore our custom web development services">web development</Link>, mobile, AI integration, and SEO — so the software we ship isn't isolated from your broader digital infrastructure.
            </p>
          </div>
        </section>

        {/* Section 9: Frequently Asked Questions (5 Q&As) */}
        <section className="py-20 md:py-28 bg-zinc-950/90 border-b border-white/10" aria-labelledby="faq-section-h2">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Direct Answers</span>
              <h2 id="faq-section-h2" className="text-3xl md:text-5xl font-extrabold mt-3 text-white">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-white/10 rounded-2xl bg-zinc-900/50 overflow-hidden">
                  <button 
                    className="w-full p-6 text-left font-bold text-lg flex items-center justify-between gap-4 hover:text-[#ccff00] transition-colors"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    aria-expanded={activeFaq === idx}
                    aria-controls={`custom-software-faq-answer-${idx}`}
                    id={`custom-software-faq-question-${idx}`}
                  >
                    <span>{faq.q}</span>
                    <svg 
                      className={`w-5 h-5 text-[#ccff00] shrink-0 transition-transform ${activeFaq === idx ? 'rotate-45' : ''}`}
                      aria-hidden="true"
                    >
                      <use href="/sprite.svg#icon-plus" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div 
                        id={`custom-software-faq-answer-${idx}`}
                        role="region"
                        aria-labelledby={`custom-software-faq-question-${idx}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-6 pt-0 text-gray-300 text-sm leading-relaxed border-t border-white/5 font-light"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 10: Start Your Custom Software Project (CTA) */}
        <section className="py-20 md:py-28 text-center bg-gradient-to-b from-zinc-900 to-black border-t border-white/10" aria-labelledby="cta-section-h2">
          <div className="max-w-4xl mx-auto px-6">
            <h2 id="cta-section-h2" className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
              Start Your Custom Software Project
            </h2>
            <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto font-light leading-relaxed">
              If you have a business process that generic software doesn't cover — or a product idea that needs a technical team to build it — start the conversation with AbuQitmirLabs.
            </p>
            <p className="text-gray-400 text-sm mb-10 max-w-xl mx-auto font-light">
              We scope projects honestly, build in structured sprints, and hand over full IP ownership at the end. No lock-in. No surprises.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link 
                to="/contact" 
                aria-label="Start the conversation with AbuQitmirLabs about your project"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(204,255,0,0.4)]"
              >
                Start the Conversation with AbuQitmirLabs
                <svg className="w-5 h-5" aria-hidden="true"><use href="/sprite.svg#icon-arrow-right" /></svg>
              </Link>
              <Link 
                to="/case-studies" 
                aria-label="View our engineering case studies"
                className="px-8 py-5 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider"
              >
                View Our Case Studies
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CustomSoftwarePage;

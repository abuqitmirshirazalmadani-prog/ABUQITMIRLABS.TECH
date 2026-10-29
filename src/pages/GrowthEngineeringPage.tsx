import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle2, Code2, Cpu, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { growthEngineeringPageSchema } from '../utils/growthEngineeringStaticHtml';

const GrowthEngineeringPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#ccff00]/30 selection:text-white">
      <Helmet>
        <title>Growth Engineering Firm | Software + AI + Marketing | AbuQitmirLabs</title>
        <meta
          name="description"
          content="AbuQitmirLabs engineers revenue systems for B2B companies — combining custom software, AI automation, and performance marketing under one roof."
        />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/growth-engineering" />
        <meta property="og:title" content="Growth Engineering Firm | Software + AI + Marketing | AbuQitmirLabs" />
        <meta
          property="og:description"
          content="AbuQitmirLabs engineers revenue systems for B2B companies — combining custom software, AI automation, and performance marketing under one roof."
        />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/growth-engineering" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Growth Engineering Firm | Software + AI + Marketing | AbuQitmirLabs" />
        <meta
          name="twitter:description"
          content="AbuQitmirLabs engineers revenue systems for B2B companies — combining custom software, AI automation, and performance marketing under one roof."
        />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(growthEngineeringPageSchema) }}
        />
      </Helmet>

      <Header />
      <Breadcrumbs />

      <main id="main-content" className="max-w-6xl mx-auto px-6 pt-20 pb-28 space-y-28">
        {/* SECTION 1: HERO + DIRECT DEFINITION (GEO/AEO Ready) */}
        <section id="hero" className="space-y-8 pt-6">
          <p className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold">
            Growth Engineering Firm
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white leading-[1.08] tracking-tight">
            Growth Engineering: Software, AI &amp; Marketing Engineered as One Revenue System
          </h1>
          <p className="lead text-lg md:text-xl text-neutral-200 max-w-4xl leading-relaxed font-light border-l-2 border-[#ccff00] pl-6 py-1">
            <strong>Growth engineering</strong> is the discipline of building custom software, AI automation, and performance marketing as a single connected system — so every line of code, every AI workflow, and every acquisition channel is engineered around measurable revenue outcomes.
          </p>
          <p className="text-base md:text-lg text-neutral-300 max-w-4xl leading-relaxed font-light">
            At <strong>AbuQitmirLabs</strong>, we don&apos;t separate &ldquo;the dev team&rdquo; from &ldquo;the growth team.&rdquo; Our software architects, AI engineers, and SEO/marketing strategists work inside one unified sprint cycle for B2B companies across the US, UK, UAE, Saudi Arabia, Canada, Australia, and Pakistan.
          </p>
          <div className="cta-row flex flex-wrap gap-4 pt-4">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center gap-3 bg-[#ccff00] hover:bg-white text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 transition-all shadow-[0_0_30px_rgba(204,255,0,0.2)]"
            >
              <span>Book a Growth Engineering Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/case-studies"
              className="btn-secondary inline-flex items-center gap-3 border border-white/20 hover:border-[#ccff00] text-white hover:text-[#ccff00] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 transition-colors"
            >
              <span>View Case Studies</span>
            </Link>
          </div>
        </section>

        {/* SECTION 2: THE PROBLEM WITH SILOED AGENCIES */}
        <section id="problem" className="space-y-8 border-t border-white/10 pt-20">
          <div className="max-w-4xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
              01 / The Disconnect
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
              Why Hiring 3 Separate Agencies Breaks Your Growth
            </h2>
            <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed">
              Most growing B2B companies hire a software house to build the product, an AI freelancer to bolt on automation, and a marketing agency to drive traffic. Within six months, the cracks appear:
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <li className="p-6 bg-zinc-950/90 border border-white/10 rounded-2xl text-neutral-300 leading-relaxed text-sm md:text-base">
              <strong className="text-white block mb-1">The dev shop ships slow pages</strong> that fail Core Web Vitals and can&apos;t rank in Google or AI search engines.
            </li>
            <li className="p-6 bg-zinc-950/90 border border-white/10 rounded-2xl text-neutral-300 leading-relaxed text-sm md:text-base">
              <strong className="text-white block mb-1">The marketing agency drives traffic</strong> to landing pages that don&apos;t connect to your CRM, product onboarding, or AI qualification flows.
            </li>
            <li className="p-6 bg-zinc-950/90 border border-white/10 rounded-2xl text-neutral-300 leading-relaxed text-sm md:text-base">
              <strong className="text-white block mb-1">The AI consultant builds isolated chatbots</strong> that have no context on search intent, pipeline data, or product usage.
            </li>
            <li className="p-6 bg-zinc-950/90 border border-white/10 rounded-2xl text-neutral-300 leading-relaxed text-sm md:text-base">
              <strong className="text-white block mb-1">Nobody owns the full revenue number</strong> — each vendor blames the other two when pipeline stalls.
            </li>
          </ul>

          <p className="text-neutral-200 text-base md:text-lg font-light leading-relaxed max-w-4xl bg-white/[0.02] border border-white/10 p-6 rounded-2xl">
            Growth engineering eliminates the handoff gap by putting software architecture, AI automation, and demand generation under one engineering team and one accountability model.
          </p>
        </section>

        {/* SECTION 3: THE 3 PILLARS OF GROWTH ENGINEERING (INTERNAL LINKS HUB) */}
        <section id="pillars" className="space-y-10 border-t border-white/10 pt-20">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
              02 / Unified Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
              The 3 Pillars of Our Growth Engineering System
            </h2>
          </div>

          <div className="pillar-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
            <article className="pillar-card p-8 bg-zinc-950 border border-white/10 rounded-2xl flex flex-col justify-between space-y-6 hover:border-[#ccff00]/40 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00]">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif text-white">Pillar 1 — Product &amp; Platform Engineering</h3>
                <p className="text-neutral-300 text-sm leading-relaxed font-light">
                  High-speed, conversion-architected web applications, custom software, and mobile apps built from day one for search crawlability, sub-second load times, and clean analytics instrumentation.
                </p>
              </div>
              <ul className="space-y-3 pt-4 border-t border-white/10 text-sm text-neutral-300">
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
            </article>

            <article className="pillar-card p-8 bg-zinc-950 border border-white/10 rounded-2xl flex flex-col justify-between space-y-6 hover:border-[#ccff00]/40 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00]">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif text-white">Pillar 2 — AI Agents &amp; Workflow Automation</h3>
                <p className="text-neutral-300 text-sm leading-relaxed font-light">
                  Production-grade AI agents, RAG pipelines, and internal automations that qualify inbound leads in real time, compress operational overhead, and turn proprietary company data into a competitive moat.
                </p>
              </div>
              <ul className="space-y-3 pt-4 border-t border-white/10 text-sm text-neutral-300">
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
            </article>

            <article className="pillar-card p-8 bg-zinc-950 border border-white/10 rounded-2xl flex flex-col justify-between space-y-6 hover:border-[#ccff00]/40 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00]">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif text-white">Pillar 3 — Organic &amp; Performance Acquisition</h3>
                <p className="text-neutral-300 text-sm leading-relaxed font-light">
                  Technical SEO, Generative Engine Optimization (GEO), brand positioning, and authority content engineered to capture high-intent buyers across Google, ChatGPT, Perplexity, and AI Overviews.
                </p>
              </div>
              <ul className="space-y-3 pt-4 border-t border-white/10 text-sm text-neutral-300">
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
            </article>
          </div>
        </section>

        {/* SECTION 4: COMPARISON TABLE (HIGH AI-CITATION VALUE) */}
        <section id="comparison" className="space-y-8 border-t border-white/10 pt-20">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
              03 / Model Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
              Growth Engineering Firm vs Marketing Agency vs Dev Shop
            </h2>
            <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed">
              Here is how a unified growth engineering model compares to hiring a traditional marketing agency or a standalone software development shop:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/15 bg-zinc-950">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-zinc-900/90 border-b border-white/15 text-white">
                  <th className="p-4 md:p-5 font-mono text-xs uppercase tracking-wider">Capability</th>
                  <th className="p-4 md:p-5 font-mono text-xs uppercase tracking-wider text-[#ccff00]">
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
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 md:p-5 font-semibold text-white">Primary Deliverable</td>
                  <td className="p-4 md:p-5 text-white font-medium">
                    End-to-end revenue system (product + AI + acquisition)
                  </td>
                  <td className="p-4 md:p-5">Campaigns, traffic &amp; monthly reports</td>
                  <td className="p-4 md:p-5">Shipped code against feature tickets</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 md:p-5 font-semibold text-white">Custom Software &amp; Web Apps</td>
                  <td className="p-4 md:p-5 text-white font-medium">Yes — in-house senior architects</td>
                  <td className="p-4 md:p-5">No (WordPress/Webflow templates only)</td>
                  <td className="p-4 md:p-5">Yes</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 md:p-5 font-semibold text-white">AI Agents &amp; RAG Pipelines</td>
                  <td className="p-4 md:p-5 text-white font-medium">Yes — integrated into CRM &amp; product</td>
                  <td className="p-4 md:p-5">No (basic prompt tools only)</td>
                  <td className="p-4 md:p-5">Sometimes (disconnected from marketing)</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 md:p-5 font-semibold text-white">Technical SEO &amp; GEO (AI Search)</td>
                  <td className="p-4 md:p-5 text-white font-medium">Engineered into code &amp; schema at build time</td>
                  <td className="p-4 md:p-5">Bolted on after launch via plugins</td>
                  <td className="p-4 md:p-5">Rarely included</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 md:p-5 font-semibold text-white">Conversion &amp; Attribution Architecture</td>
                  <td className="p-4 md:p-5 text-white font-medium">Unified across product, CRM &amp; content</td>
                  <td className="p-4 md:p-5">Ad-platform level only</td>
                  <td className="p-4 md:p-5">Not in scope</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 md:p-5 font-semibold text-white">Code &amp; IP Ownership</td>
                  <td className="p-4 md:p-5 text-white font-medium">100% client-owned, zero lock-in</td>
                  <td className="p-4 md:p-5">Agency-owned accounts/templates</td>
                  <td className="p-4 md:p-5">Varies by contract</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 5: WHEN TO CHOOSE GROWTH ENGINEERING */}
        <section id="when-to-choose" className="space-y-8 border-t border-white/10 pt-20">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
              04 / Fit &amp; Qualification
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
              When to Choose a Growth Engineering Firm
            </h2>
          </div>

          <div className="decision-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-zinc-950 border border-[#ccff00]/30 rounded-2xl space-y-5">
              <h3 className="text-2xl font-serif text-white flex items-center gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-[#ccff00] shrink-0" />
                <span>Choose Growth Engineering If:</span>
              </h3>
              <ul className="list-disc pl-6 space-y-3 text-neutral-300 text-sm md:text-base font-light leading-relaxed">
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
            </div>

            <div className="p-8 bg-zinc-950 border border-white/10 rounded-2xl space-y-5">
              <h3 className="text-2xl font-serif text-white">Choose a Traditional Agency or Dev Shop If:</h3>
              <ul className="list-disc pl-6 space-y-3 text-neutral-300 text-sm md:text-base font-light leading-relaxed">
                <li>
                  You already have a full in-house engineering and AI team and only need someone to manage paid ad spend.
                </li>
                <li>
                  You have a fixed, internal-only software spec with zero marketing, search, or customer acquisition requirements.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: STANDALONE FLEXIBILITY (PROTECTS EXISTING PAGES) */}
        <section id="standalone" className="space-y-6 border-t border-white/10 pt-20">
          <div className="p-8 md:p-12 bg-zinc-950 border border-white/10 rounded-3xl space-y-5">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
              05 / Modular Engagement
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-white tracking-tight">
              Need Only One Pillar? Every Service Works Standalone Too
            </h2>
            <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed max-w-4xl">
              You don&apos;t have to buy the full system on day one. Many clients start with a single engagement — such as{' '}
              <Link to="/custom-software" className="text-[#ccff00] underline hover:text-white transition-colors">
                custom software development
              </Link>
              , a{' '}
              <Link to="/web-development" className="text-[#ccff00] underline hover:text-white transition-colors">
                high-performance website
              </Link>
              , a{' '}
              <Link to="/ai-agent-development" className="text-[#ccff00] underline hover:text-white transition-colors">
                custom AI agent
              </Link>
              , or a{' '}
              <Link to="/local-seo-audit" className="text-[#ccff00] underline hover:text-white transition-colors">
                technical SEO audit
              </Link>{' '}
              — and expand into full growth engineering as results compound. Because the same senior team builds every layer, nothing ever needs to be rebuilt when you scale.
            </p>
          </div>
        </section>

        {/* SECTION 7: FAQ (MATCHES FAQPAGE SCHEMA) */}
        <section id="faq" className="space-y-8 border-t border-white/10 pt-20">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
              06 / Answers &amp; Clarity
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
              Frequently Asked Questions About Growth Engineering
            </h2>
          </div>

          <div className="space-y-5">
            <div className="faq-item p-6 md:p-8 bg-zinc-950 border border-white/10 rounded-2xl space-y-3">
              <h3 className="text-xl md:text-2xl font-serif text-white">What is growth engineering?</h3>
              <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed">
                Growth engineering is the practice of building software, AI systems, and marketing infrastructure as one connected revenue engine — rather than hiring separate vendors for development, automation, and customer acquisition.
              </p>
            </div>

            <div className="faq-item p-6 md:p-8 bg-zinc-950 border border-white/10 rounded-2xl space-y-3">
              <h3 className="text-xl md:text-2xl font-serif text-white">
                How is a growth engineering firm different from a digital marketing agency?
              </h3>
              <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed">
                A traditional marketing agency runs ads, writes content, and optimizes pages on top of whatever software you already have. A growth engineering firm builds the underlying product, AI workflows, data pipelines, and marketing infrastructure together so that acquisition, activation, and retention compound.
              </p>
            </div>

            <div className="faq-item p-6 md:p-8 bg-zinc-950 border border-white/10 rounded-2xl space-y-3">
              <h3 className="text-xl md:text-2xl font-serif text-white">
                How is a growth engineering firm different from a software dev shop?
              </h3>
              <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed">
                A dev shop ships features against a ticket backlog and hands off the code. A growth engineering firm architects software specifically around revenue outcomes — conversion paths, search visibility, AI-driven lead qualification, and retention loops.
              </p>
            </div>

            <div className="faq-item p-6 md:p-8 bg-zinc-950 border border-white/10 rounded-2xl space-y-3">
              <h3 className="text-xl md:text-2xl font-serif text-white">Who is growth engineering built for?</h3>
              <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed">
                Growth engineering is built for B2B companies, funded startups, and scaling SMEs that need custom software, AI automation, and organic/performance acquisition working as a single system rather than three disconnected agency retainers.
              </p>
            </div>

            <div className="faq-item p-6 md:p-8 bg-zinc-950 border border-white/10 rounded-2xl space-y-3">
              <h3 className="text-xl md:text-2xl font-serif text-white">
                Can I hire AbuQitmirLabs for just software development or just SEO?
              </h3>
              <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed">
                Yes. Each pillar — custom software, web and mobile apps, AI agents, technical SEO, and content — is available as a standalone engagement or as part of a full growth engineering system.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 8: FINAL CTA */}
        <section id="final-cta" className="border-t border-white/10 pt-20">
          <div className="p-10 md:p-16 bg-gradient-to-b from-zinc-950 to-black border border-[#ccff00]/30 rounded-3xl text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight max-w-3xl mx-auto">
              Ready to Replace Disconnected Vendors With One Growth Engine?
            </h2>
            <p className="text-neutral-300 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
              Get a free technical and growth audit from our senior architects. We&apos;ll map your software, AI, and acquisition bottlenecks and hand you a clear execution roadmap.
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center gap-3 bg-[#ccff00] hover:bg-white text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 transition-all shadow-[0_0_30px_rgba(204,255,0,0.25)]"
              >
                <span>Get Your Free Growth Engineering Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GrowthEngineeringPage;

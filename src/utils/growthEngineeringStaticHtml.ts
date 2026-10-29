import { renderStaticHeader } from './sharedStaticHeader';

export const growthEngineeringPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.abuqitmirlabs.tech/#organization",
      "name": "AbuQitmirLabs",
      "url": "https://www.abuqitmirlabs.tech",
      "description": "Growth engineering firm combining custom software, AI automation, and performance marketing for B2B companies.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Karachi",
        "addressCountry": "PK"
      },
      "sameAs": [
        "https://www.linkedin.com/company/abuqitmirlabs",
        "https://twitter.com/abuqitmirlabs",
        "https://www.facebook.com/abuqitmirlabs"
      ],
      "knowsAbout": [
        "Growth Engineering",
        "Custom Software Development",
        "AI Agent Development",
        "Performance Marketing",
        "SEO",
        "Brand Building"
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://www.abuqitmirlabs.tech/growth-engineering#webpage",
      "url": "https://www.abuqitmirlabs.tech/growth-engineering",
      "name": "Growth Engineering Firm | Software + AI + Marketing",
      "isPartOf": { "@id": "https://www.abuqitmirlabs.tech/#website" },
      "about": { "@id": "https://www.abuqitmirlabs.tech/#organization" }
    },
    {
      "@type": "Service",
      "name": "Growth Engineering",
      "provider": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
      "serviceType": "Growth Engineering, Custom Software Development, AI Automation, Performance Marketing",
      "areaServed": ["Pakistan", "United States", "United Kingdom", "UAE", "Saudi Arabia", "Canada", "Australia"]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.abuqitmirlabs.tech/" },
        { "@type": "ListItem", "position": 2, "name": "Growth Engineering", "item": "https://www.abuqitmirlabs.tech/growth-engineering" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is growth engineering?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Growth engineering is the practice of building software, AI systems, and marketing infrastructure as one connected revenue engine — rather than hiring separate vendors for development, automation, and customer acquisition."
          }
        },
        {
          "@type": "Question",
          "name": "How is a growth engineering firm different from a digital marketing agency?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A traditional marketing agency runs ads, writes content, and optimizes pages on top of whatever software you already have. A growth engineering firm builds the underlying product, AI workflows, data pipelines, and marketing infrastructure together so that acquisition, activation, and retention compound."
          }
        },
        {
          "@type": "Question",
          "name": "How is a growth engineering firm different from a software dev shop?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A dev shop ships features against a ticket backlog and hands off the code. A growth engineering firm architects software specifically around revenue outcomes — conversion paths, search visibility, AI-driven lead qualification, and retention loops."
          }
        },
        {
          "@type": "Question",
          "name": "Who is growth engineering built for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Growth engineering is built for B2B companies, funded startups, and scaling SMEs that need custom software, AI automation, and organic/performance acquisition working as a single system rather than three disconnected agency retainers."
          }
        },
        {
          "@type": "Question",
          "name": "Can I hire AbuQitmirLabs for just software development or just SEO?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Each pillar — custom software, web and mobile apps, AI agents, technical SEO, and content — is available as a standalone engagement or as part of a full growth engineering system."
          }
        }
      ]
    }
  ]
};

export const growthEngineeringInitialHtml = `
<div class="min-h-screen bg-[#000000] text-white font-sans antialiased overflow-x-hidden relative">
  ${renderStaticHeader('/growth-engineering')}
  <main id="main-content" class="relative z-10 pt-28 md:pt-36">
    <div class="max-w-7xl mx-auto px-6 mb-4 md:mb-6">
      <nav class="relative z-20 py-2" aria-label="Breadcrumb">
        <ol class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] list-none m-0 p-0 flex-wrap">
          <li class="flex items-center gap-2"><a href="/" class="text-zinc-600 hover:text-[#ff5b36] transition-colors">HQ</a></li>
          <li class="flex items-center gap-2"><span class="text-zinc-800">/</span><span class="text-[#ff5b36]" aria-current="page">Growth Engineering</span></li>
        </ol>
      </nav>
    </div>
    <section id="hero" class="relative pt-4 md:pt-8 pb-20 md:pb-28 overflow-hidden border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6 relative z-10 space-y-8 animate-enter">
        <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/90 border border-[#ccff00]/30">
          <span class="w-2 h-2 rounded-full bg-[#ccff00]"></span>
          <p class="eyebrow text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold m-0">Growth Engineering Firm</p>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white leading-[1.08] tracking-tight max-w-5xl animate-enter-delay-1">Growth Engineering: Software, AI &amp; Marketing Engineered as <span class="text-[#ccff00] italic font-normal">One Revenue System</span></h1>
        <div class="p-6 md:p-8 rounded-r-2xl bg-zinc-900/80 border-l-4 border-[#ccff00] border-y border-r border-y-white/10 border-r-white/10 max-w-4xl animate-enter-delay-2">
          <p class="lead text-lg md:text-xl text-neutral-200 leading-relaxed font-light m-0">
            <strong>Growth engineering</strong> is the discipline of building custom software, AI automation, and performance marketing as a single connected system — so every line of code, every AI workflow, and every acquisition channel is engineered around measurable revenue outcomes.
          </p>
        </div>
        <p class="text-base md:text-lg text-neutral-300 max-w-4xl leading-relaxed font-light">
          At <strong>AbuQitmirLabs</strong>, we don't separate "the dev team" from "the growth team." Our software architects, AI engineers, and SEO/marketing strategists work inside one unified sprint cycle for B2B companies across the US, UK, UAE, Saudi Arabia, Canada, Australia, and Pakistan.
        </p>
        <div class="cta-row flex flex-wrap items-center gap-4 pt-2">
          <a href="/contact" class="btn-primary bg-[#ccff00] text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-xl">Book a Growth Engineering Audit</a>
          <a href="/case-studies" class="btn-secondary border border-white/20 text-white hover:border-[#ccff00] hover:text-[#ccff00] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-xl">View Case Studies</a>
        </div>
      </div>
    </section>

    <section id="problem" class="space-y-6 border-t border-white/10 pt-16">
      <h2 class="text-3xl sm:text-4xl font-serif text-white">Why Hiring 3 Separate Agencies Breaks Your Growth</h2>
      <p class="text-neutral-300 leading-relaxed">
        Most growing B2B companies hire a software house to build the product, an AI freelancer to bolt on automation, and a marketing agency to drive traffic. Within six months, the cracks appear:
      </p>
      <ul class="list-disc pl-6 space-y-3 text-neutral-300">
        <li><strong>The dev shop ships slow pages</strong> that fail Core Web Vitals and can't rank in Google or AI search engines.</li>
        <li><strong>The marketing agency drives traffic</strong> to landing pages that don't connect to your CRM, product onboarding, or AI qualification flows.</li>
        <li><strong>The AI consultant builds isolated chatbots</strong> that have no context on search intent, pipeline data, or product usage.</li>
        <li><strong>Nobody owns the full revenue number</strong> — each vendor blames the other two when pipeline stalls.</li>
      </ul>
      <p class="text-neutral-300 leading-relaxed">
        Growth engineering eliminates the handoff gap by putting software architecture, AI automation, and demand generation under one engineering team and one accountability model.
      </p>
    </section>

    <section id="pillars" class="space-y-10 border-t border-white/10 pt-16">
      <h2 class="text-3xl sm:text-4xl font-serif text-white">The 3 Pillars of Our Growth Engineering System</h2>

      <div class="pillar-grid grid grid-cols-1 md:grid-cols-3 gap-8">
        <article class="pillar-card p-8 bg-zinc-950 border border-white/10 rounded-2xl space-y-4">
          <h3 class="text-2xl font-serif text-white">Pillar 1 — Product &amp; Platform Engineering</h3>
          <p class="text-neutral-300 text-sm leading-relaxed">
            High-speed, conversion-architected web applications, custom software, and mobile apps built from day one for search crawlability, sub-second load times, and clean analytics instrumentation.
          </p>
          <ul class="space-y-2 text-sm text-neutral-300">
            <li><a href="/custom-software" class="text-[#ccff00] hover:underline">Custom Software Development</a> — ERPs, SaaS platforms &amp; internal tools</li>
            <li><a href="/web-development" class="text-[#ccff00] hover:underline">Web Development</a> — Next.js, React &amp; high-conversion web platforms</li>
            <li><a href="/mobile-app-development" class="text-[#ccff00] hover:underline">Mobile App Development</a> — Flutter, React Native &amp; native iOS/Android</li>
          </ul>
        </article>

        <article class="pillar-card p-8 bg-zinc-950 border border-white/10 rounded-2xl space-y-4">
          <h3 class="text-2xl font-serif text-white">Pillar 2 — AI Agents &amp; Workflow Automation</h3>
          <p class="text-neutral-300 text-sm leading-relaxed">
            Production-grade AI agents, RAG pipelines, and internal automations that qualify inbound leads in real time, compress operational overhead, and turn proprietary company data into a competitive moat.
          </p>
          <ul class="space-y-2 text-sm text-neutral-300">
            <li><a href="/ai-agent-development" class="text-[#ccff00] hover:underline">AI Agent Development</a> — Custom LLM agents, RAG &amp; tool-use workflows</li>
            <li><a href="/solutions/ai-automation" class="text-[#ccff00] hover:underline">AI Automation Solutions</a> — CRM, operations &amp; pipeline automation</li>
            <li><a href="/ai-video-creation" class="text-[#ccff00] hover:underline">AI Video Creation</a> — Cinematic AI production for acquisition &amp; brand</li>
          </ul>
        </article>

        <article class="pillar-card p-8 bg-zinc-950 border border-white/10 rounded-2xl space-y-4">
          <h3 class="text-2xl font-serif text-white">Pillar 3 — Organic &amp; Performance Acquisition</h3>
          <p class="text-neutral-300 text-sm leading-relaxed">
            Technical SEO, Generative Engine Optimization (GEO), brand positioning, and authority content engineered to capture high-intent buyers across Google, ChatGPT, Perplexity, and AI Overviews.
          </p>
          <ul class="space-y-2 text-sm text-neutral-300">
            <li><a href="/seo-mastery" class="text-[#ccff00] hover:underline">SEO &amp; GEO Mastery</a> — Technical SEO, entity architecture &amp; AI visibility</li>
            <li><a href="/digital-marketing" class="text-[#ccff00] hover:underline">Digital Marketing</a> — Full-funnel B2B &amp; SaaS acquisition</li>
            <li><a href="/brand-building" class="text-[#ccff00] hover:underline">Brand Building</a> — Positioning, visual identity &amp; design systems</li>
            <li><a href="/content-writing" class="text-[#ccff00] hover:underline">Content Writing</a> — Technical, SEO &amp; GEO-structured content</li>
          </ul>
        </article>
      </div>
    </section>

    <section id="comparison" class="space-y-6 border-t border-white/10 pt-16">
      <h2 class="text-3xl sm:text-4xl font-serif text-white">Growth Engineering Firm vs Marketing Agency vs Dev Shop</h2>
      <p class="text-neutral-300 leading-relaxed">
        Here is how a unified growth engineering model compares to hiring a traditional marketing agency or a standalone software development shop:
      </p>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-white/15 text-left text-sm">
          <thead>
            <tr class="bg-zinc-900 text-white">
              <th class="border border-white/15 p-4 font-bold">Capability</th>
              <th class="border border-white/15 p-4 font-bold text-[#ccff00]">Growth Engineering Firm (AbuQitmirLabs)</th>
              <th class="border border-white/15 p-4 font-bold">Traditional Marketing Agency</th>
              <th class="border border-white/15 p-4 font-bold">Software Dev Shop</th>
            </tr>
          </thead>
          <tbody class="text-neutral-300">
            <tr>
              <td class="border border-white/15 p-4"><strong>Primary Deliverable</strong></td>
              <td class="border border-white/15 p-4">End-to-end revenue system (product + AI + acquisition)</td>
              <td class="border border-white/15 p-4">Campaigns, traffic &amp; monthly reports</td>
              <td class="border border-white/15 p-4">Shipped code against feature tickets</td>
            </tr>
            <tr>
              <td class="border border-white/15 p-4"><strong>Custom Software &amp; Web Apps</strong></td>
              <td class="border border-white/15 p-4">Yes — in-house senior architects</td>
              <td class="border border-white/15 p-4">No (WordPress/Webflow templates only)</td>
              <td class="border border-white/15 p-4">Yes</td>
            </tr>
            <tr>
              <td class="border border-white/15 p-4"><strong>AI Agents &amp; RAG Pipelines</strong></td>
              <td class="border border-white/15 p-4">Yes — integrated into CRM &amp; product</td>
              <td class="border border-white/15 p-4">No (basic prompt tools only)</td>
              <td class="border border-white/15 p-4">Sometimes (disconnected from marketing)</td>
            </tr>
            <tr>
              <td class="border border-white/15 p-4"><strong>Technical SEO &amp; GEO (AI Search)</strong></td>
              <td class="border border-white/15 p-4">Engineered into code &amp; schema at build time</td>
              <td class="border border-white/15 p-4">Bolted on after launch via plugins</td>
              <td class="border border-white/15 p-4">Rarely included</td>
            </tr>
            <tr>
              <td class="border border-white/15 p-4"><strong>Conversion &amp; Attribution Architecture</strong></td>
              <td class="border border-white/15 p-4">Unified across product, CRM &amp; content</td>
              <td class="border border-white/15 p-4">Ad-platform level only</td>
              <td class="border border-white/15 p-4">Not in scope</td>
            </tr>
            <tr>
              <td class="border border-white/15 p-4"><strong>Code &amp; IP Ownership</strong></td>
              <td class="border border-white/15 p-4">100% client-owned, zero lock-in</td>
              <td class="border border-white/15 p-4">Agency-owned accounts/templates</td>
              <td class="border border-white/15 p-4">Varies by contract</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section id="when-to-choose" class="space-y-6 border-t border-white/10 pt-16">
      <h2 class="text-3xl sm:text-4xl font-serif text-white">When to Choose a Growth Engineering Firm</h2>
      <div class="decision-grid grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="p-8 bg-zinc-950 border border-[#ccff00]/30 rounded-2xl space-y-4">
          <h3 class="text-2xl font-serif text-white">Choose Growth Engineering If:</h3>
          <ul class="list-disc pl-6 space-y-2 text-neutral-300 text-sm">
            <li>You are launching or rebuilding a B2B product, SaaS platform, or service platform and need acquisition built into the architecture from day one.</li>
            <li>You are tired of managing separate retainers for developers, SEO consultants, and AI contractors who don't talk to each other.</li>
            <li>You want your website, AI agents, CRM, and organic search strategy to share one data layer and one conversion goal.</li>
          </ul>
        </div>
        <div class="p-8 bg-zinc-950 border border-white/10 rounded-2xl space-y-4">
          <h3 class="text-2xl font-serif text-white">Choose a Traditional Agency or Dev Shop If:</h3>
          <ul class="list-disc pl-6 space-y-2 text-neutral-300 text-sm">
            <li>You already have a full in-house engineering and AI team and only need someone to manage paid ad spend.</li>
            <li>You have a fixed, internal-only software spec with zero marketing, search, or customer acquisition requirements.</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="standalone" class="space-y-6 border-t border-white/10 pt-16">
      <h2 class="text-3xl sm:text-4xl font-serif text-white">Need Only One Pillar? Every Service Works Standalone Too</h2>
      <p class="text-neutral-300 leading-relaxed">
        You don't have to buy the full system on day one. Many clients start with a single engagement — such as <a href="/custom-software" class="text-[#ccff00] hover:underline">custom software development</a>, a <a href="/web-development" class="text-[#ccff00] hover:underline">high-performance website</a>, a <a href="/ai-agent-development" class="text-[#ccff00] hover:underline">custom AI agent</a>, or a <a href="/local-seo-audit" class="text-[#ccff00] hover:underline">technical SEO audit</a> — and expand into full growth engineering as results compound. Because the same senior team builds every layer, nothing ever needs to be rebuilt when you scale.
      </p>
    </section>

    <section id="faq" class="space-y-6 border-t border-white/10 pt-16">
      <h2 class="text-3xl sm:text-4xl font-serif text-white">Frequently Asked Questions About Growth Engineering</h2>

      <div class="space-y-6">
        <div class="faq-item p-6 bg-zinc-950 border border-white/10 rounded-2xl space-y-2">
          <h3 class="text-xl font-serif text-white">What is growth engineering?</h3>
          <p class="text-neutral-300 text-sm leading-relaxed">Growth engineering is the practice of building software, AI systems, and marketing infrastructure as one connected revenue engine — rather than hiring separate vendors for development, automation, and customer acquisition.</p>
        </div>

        <div class="faq-item p-6 bg-zinc-950 border border-white/10 rounded-2xl space-y-2">
          <h3 class="text-xl font-serif text-white">How is a growth engineering firm different from a digital marketing agency?</h3>
          <p class="text-neutral-300 text-sm leading-relaxed">A traditional marketing agency runs ads, writes content, and optimizes pages on top of whatever software you already have. A growth engineering firm builds the underlying product, AI workflows, data pipelines, and marketing infrastructure together so that acquisition, activation, and retention compound.</p>
        </div>

        <div class="faq-item p-6 bg-zinc-950 border border-white/10 rounded-2xl space-y-2">
          <h3 class="text-xl font-serif text-white">How is a growth engineering firm different from a software dev shop?</h3>
          <p class="text-neutral-300 text-sm leading-relaxed">A dev shop ships features against a ticket backlog and hands off the code. A growth engineering firm architects software specifically around revenue outcomes — conversion paths, search visibility, AI-driven lead qualification, and retention loops.</p>
        </div>

        <div class="faq-item p-6 bg-zinc-950 border border-white/10 rounded-2xl space-y-2">
          <h3 class="text-xl font-serif text-white">Who is growth engineering built for?</h3>
          <p class="text-neutral-300 text-sm leading-relaxed">Growth engineering is built for B2B companies, funded startups, and scaling SMEs that need custom software, AI automation, and organic/performance acquisition working as a single system rather than three disconnected agency retainers.</p>
        </div>

        <div class="faq-item p-6 bg-zinc-950 border border-white/10 rounded-2xl space-y-2">
          <h3 class="text-xl font-serif text-white">Can I hire AbuQitmirLabs for just software development or just SEO?</h3>
          <p class="text-neutral-300 text-sm leading-relaxed">Yes. Each pillar — custom software, web and mobile apps, AI agents, technical SEO, and content — is available as a standalone engagement or as part of a full growth engineering system.</p>
        </div>
      </div>
    </section>

    <section id="final-cta" class="space-y-6 border-t border-white/10 pt-16 text-center">
      <h2 class="text-3xl sm:text-4xl font-serif text-white">Ready to Replace Disconnected Vendors With One Growth Engine?</h2>
      <p class="text-neutral-300 max-w-2xl mx-auto leading-relaxed">
        Get a free technical and growth audit from our senior architects. We'll map your software, AI, and acquisition bottlenecks and hand you a clear execution roadmap.
      </p>
      <div class="pt-4">
        <a href="/contact" class="btn-primary inline-block bg-[#ccff00] text-black font-mono text-sm font-bold uppercase tracking-wider px-8 py-4">Get Your Free Growth Engineering Audit</a>
      </div>
    </section>
  </main>
</div>
`.trim();

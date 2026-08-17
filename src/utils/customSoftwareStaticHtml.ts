/**
 * Static SEO content and JSON-LD schema for /custom-software
 * Used by build-time SSG generation to provide full crawlable semantic HTML
 * before React client-side hydration.
 */

export const customSoftwareSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.abuqitmirlabs.tech/#organization",
      "name": "AbuQitmirLabs",
      "url": "https://www.abuqitmirlabs.tech",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://www.abuqitmirlabs.tech/#logo",
        "url": "https://www.abuqitmirlabs.tech/logo.png",
        "caption": "AbuQitmirLabs Logo"
      },
      "telephone": "+923233260859",
      "email": "hello@abuqitmirlabs.tech",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "8/15, 3 37A Rd, Shah Khalid Colony, Sector 37A",
        "addressLocality": "Landhi Town, Karachi",
        "postalCode": "75160",
        "addressCountry": "PK"
      },
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61583768706452",
        "https://www.instagram.com/abuqitmirshirazalmadani/",
        "https://www.youtube.com/@AbuQitmir",
        "https://www.linkedin.com/in/abu-qitmir-697423390/",
        "https://x.com/AbuQitmir",
        "https://www.pinterest.com/abuqitmir",
        "https://www.quora.com/profile/Abu-Qitmir-Mohammad-Shiraz-Al-Madani",
        "https://www.goodfirms.co/company/abuqitmirlabs-tech",
        "https://clutch.co/profile/abuqitmirlabstech"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+923233260859",
        "contactType": "customer service",
        "email": "hello@abuqitmirlabs.tech",
        "availableLanguage": ["English", "Urdu"]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.abuqitmirlabs.tech/#website",
      "url": "https://www.abuqitmirlabs.tech",
      "name": "AbuQitmirLabs",
      "description": "Bespoke software studio building custom SaaS, mobile apps, enterprise ERPs, EdTech platforms, and AI automation solutions.",
      "publisher": {
        "@id": "https://www.abuqitmirlabs.tech/#organization"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.abuqitmirlabs.tech/custom-software#webpage",
      "url": "https://www.abuqitmirlabs.tech/custom-software",
      "name": "Custom Software Development Company | AbuQitmirLabs",
      "description": "Bespoke software built around your workflows — ERPs, SaaS platforms, AI-powered tools, and enterprise systems. Full IP ownership.",
      "isPartOf": { "@id": "https://www.abuqitmirlabs.tech/#website" },
      "about": { "@id": "https://www.abuqitmirlabs.tech/custom-software#service" },
      "breadcrumb": { "@id": "https://www.abuqitmirlabs.tech/custom-software#breadcrumb" },
      "inLanguage": "en",
      "dateModified": "2026-08-17"
    },
    {
      "@type": "Service",
      "@id": "https://www.abuqitmirlabs.tech/custom-software#service",
      "name": "Custom Software Development",
      "description": "Bespoke software engineered around your exact workflows, data requirements, and integrations. Full source code and IP ownership transferred at project completion.",
      "provider": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
      "serviceType": "Custom Software Development",
      "areaServed": ["US", "GB", "PK", "CA", "PL", "AU"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Custom Software Development Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Enterprise ERP Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SaaS Platform Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI-Powered Custom Software" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile-First Custom Software" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "API Integration & Middleware" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Legacy System Modernisation" } }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.abuqitmirlabs.tech/custom-software#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What technologies do you use for custom software development?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AbuQitmirLabs uses technologies selected for the problem — commonly React, Next.js, Node.js, Python, PostgreSQL, and cloud platforms including AWS, GCP, and Azure. For AI-integrated systems, the stack includes LangChain, vector databases, and RAG pipelines. The full stack is documented in your project specification before development begins."
          }
        },
        {
          "@type": "Question",
          "name": "Do you work with startups or only established businesses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Both. AbuQitmirLabs has worked with early-stage founders building their first product and with established businesses replacing legacy systems. The discovery and scoping process is the same either way."
          }
        },
        {
          "@type": "Question",
          "name": "Can you take over a project another development team started?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. AbuQitmirLabs conducts a codebase audit first to assess what is worth preserving and what needs to be rebuilt, and reports findings before agreeing to take on the project."
          }
        },
        {
          "@type": "Question",
          "name": "What happens after the software is launched?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AbuQitmirLabs provides structured post-launch support covering bug resolution, minor enhancements, and monitoring. Longer-term maintenance and feature development can be scoped as a separate ongoing engagement."
          }
        },
        {
          "@type": "Question",
          "name": "Do I own the code after the project is complete?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. AbuQitmirLabs transfers full intellectual property and source code ownership at project completion. No licensing fees, no vendor lock-in, and no ongoing dependency on AbuQitmirLabs to access your own system."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.abuqitmirlabs.tech/custom-software#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.abuqitmirlabs.tech/" },
        { "@type": "ListItem", "position": 2, "name": "Custom Software Development", "item": "https://www.abuqitmirlabs.tech/custom-software" }
      ]
    }
  ]
};

export const customSoftwareInitialHtml = `
<div class="min-h-screen bg-[#000000] text-slate-100 font-sans antialiased">
  <header class="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <a href="/" class="flex items-center gap-3 text-white font-bold text-xl tracking-wider" aria-label="AbuQitmirLabs Home">
        <img src="/logo.png" alt="AbuQitmirLabs - Custom Software Development Studio" width="40" height="40" class="rounded-lg" loading="eager" fetchpriority="high" />
        <span>ABUQITMIRLABS</span>
      </a>
      <nav class="hidden md:flex items-center gap-8 text-sm font-mono uppercase tracking-widest text-gray-300">
        <a href="/#services" class="hover:text-[#ccff00] transition-colors">Services</a>
        <a href="/solutions/edtech" class="hover:text-[#ccff00] transition-colors">Solutions</a>
        <a href="/case-studies" class="hover:text-[#ccff00] transition-colors">Case Studies</a>
        <a href="/blog" class="hover:text-[#ccff00] transition-colors">Insights</a>
        <a href="/about/our-company" class="hover:text-[#ccff00] transition-colors">About</a>
        <a href="/contact" class="px-5 py-2.5 rounded-lg bg-[#ccff00] text-black font-bold hover:bg-white transition-all">Start Project</a>
      </nav>
    </div>
  </header>

  <main id="main-content" class="pt-12 md:pt-16 pb-24">
    <!-- Breadcrumbs -->
    <div class="max-w-7xl mx-auto px-6 mb-8">
      <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-xs font-mono text-gray-400">
        <a href="/" class="hover:text-[#ccff00] transition-colors">Home</a>
        <span>/</span>
        <span class="text-white">Custom Software Development</span>
      </nav>
    </div>

    <!-- Hero Section with EXACT Single H1 -->
    <section class="max-w-7xl mx-auto px-6 pb-16 md:pb-24 border-b border-white/10" aria-labelledby="custom-software-hero-title">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-6">
        <span>Bespoke Engineering Studio</span>
      </div>

      <h1 id="custom-software-hero-title" class="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-8 max-w-5xl">
        Custom Software Development Company
      </h1>

      <!-- Direct Answer Block for AEO/GEO -->
      <div class="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl max-w-4xl mb-8 shadow-2xl">
        <p class="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
          <strong class="text-[#ccff00]">Direct Answer:</strong> Custom software development is the process of building software engineered specifically for your business — designed around your exact workflows, data requirements, and integrations rather than forcing you to adapt to a generic tool. AbuQitmirLabs builds bespoke software systems that you own outright, from enterprise ERPs to AI-powered SaaS platforms.
        </p>
      </div>

      <!-- E-E-A-T Trust Badges -->
      <div class="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-300 py-3 px-4 bg-zinc-900/80 border border-[#ccff00]/30 rounded-xl mb-10 max-w-3xl">
        <span class="text-[#ccff00] font-bold">⭐ TajweedPage.com — Delivered</span>
        <span class="text-zinc-600">•</span>
        <span>🔒 100% IP &amp; Source Code Ownership</span>
        <span class="text-zinc-600">•</span>
        <span>⚡ Zero Vendor Lock-In</span>
      </div>

      <div class="flex flex-wrap items-center gap-6">
        <a href="/contact" class="px-8 py-4 bg-[#ccff00] text-black font-extrabold rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(204,255,0,0.3)]">
          Talk to AbuQitmirLabs About Your Project
        </a>
        <a href="/case-studies" class="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider">
          View Case Studies
        </a>
      </div>
    </section>

    <!-- Section 1: What Is Custom Software Development? -->
    <section class="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="what-is-custom-software-h2">
      <div class="max-w-4xl">
        <span class="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Strategic Foundation</span>
        <h2 id="what-is-custom-software-h2" class="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
          What Is Custom Software Development?
        </h2>
        <p class="text-gray-300 text-lg leading-relaxed mb-6 font-light">
          Custom software development means building a system from the ground up to solve a specific business problem — one that no off-the-shelf product addresses cleanly.
        </p>
        <p class="text-gray-300 text-lg leading-relaxed mb-6 font-light">
          The global custom software development market is valued at $43.2 billion in 2024 and projected to reach $146.2 billion by 2030 — a compound annual growth rate above 22%. That growth reflects a straightforward reality: generic tools create compromises. Custom software eliminates them.
        </p>
        <p class="text-gray-300 text-lg leading-relaxed mb-6 font-light">
          At AbuQitmirLabs, every build starts with your workflows, not a template. You get full source code ownership, full IP ownership, and a system built to scale with your business — not against it.
        </p>
      </div>
    </section>

    <!-- Section 2: What We Build -->
    <section class="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="what-we-build-h2">
      <div class="max-w-7xl mx-auto px-6">
        <div class="max-w-3xl mb-16">
          <span class="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Core Engineering Disciplines</span>
          <h2 id="what-we-build-h2" class="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
            What We Build
          </h2>
          <p class="text-gray-400 text-lg font-light leading-relaxed">
            From complex operational backbones to revenue-generating SaaS platforms, we architect resilient digital assets built to your precise functional specifications.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article class="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00]/40 transition-all flex flex-col justify-between">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full inline-block mb-4">Operations</span>
              <h3 class="text-2xl font-bold mb-4 text-white">Enterprise ERPs &amp; Business Systems</h3>
              <p class="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                We engineer enterprise resource planning systems that connect your operations — inventory, procurement, finance, HR — into a single, unified platform. Built for your processes, not the average company's.
              </p>
            </div>
            <a href="/contact" class="text-xs font-mono uppercase text-[#ccff00] hover:underline font-semibold">Discuss ERP Scope →</a>
          </article>

          <article class="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00]/40 transition-all flex flex-col justify-between">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full inline-block mb-4">Product</span>
              <h3 class="text-2xl font-bold mb-4 text-white">SaaS Platforms &amp; Web Applications</h3>
              <p class="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                From multi-tenant SaaS products to client-facing web platforms, we architect and ship full-stack web applications using modern cloud-native frameworks. Your platform scales from day one.
              </p>
            </div>
            <a href="/web-development" class="text-xs font-mono uppercase text-[#ccff00] hover:underline font-semibold">Explore Web Platforms →</a>
          </article>

          <article class="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00]/40 transition-all flex flex-col justify-between">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full inline-block mb-4">Artificial Intelligence</span>
              <h3 class="text-2xl font-bold mb-4 text-white">AI-Powered Custom Tools</h3>
              <p class="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                We integrate large language models, RAG pipelines, and autonomous AI agents directly into your custom software. If your business process involves data retrieval, classification, or decision support, we can automate it at the application layer. See our <a href="/ai-agent-development" class="text-[#ccff00] hover:underline font-medium">AI Agent Development service</a> for the technical depth behind this capability.
              </p>
            </div>
            <a href="/ai-agent-development" class="text-xs font-mono uppercase text-[#ccff00] hover:underline font-semibold">Explore AI Agents →</a>
          </article>

          <article class="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00]/40 transition-all flex flex-col justify-between">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full inline-block mb-4">Mobile</span>
              <h3 class="text-2xl font-bold mb-4 text-white">Mobile-First Custom Software</h3>
              <p class="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                When your workflow lives in the field — on a device, not a desk — we build <a href="/mobile-app-development" class="text-[#ccff00] hover:underline font-medium">mobile-first custom software</a> using Flutter and native iOS/Android. Cross-platform where it makes sense, native where performance demands it.
              </p>
            </div>
            <a href="/mobile-app-development" class="text-xs font-mono uppercase text-[#ccff00] hover:underline font-semibold">Explore Mobile Apps →</a>
          </article>

          <article class="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00]/40 transition-all flex flex-col justify-between">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full inline-block mb-4">Connectivity</span>
              <h3 class="text-2xl font-bold mb-4 text-white">API Integrations &amp; Middleware</h3>
              <p class="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                We build the connective tissue between your systems — payment gateways, CRMs, third-party APIs, logistics providers — so your software stack operates as one cohesive system rather than a collection of disconnected tools.
              </p>
            </div>
            <a href="/contact" class="text-xs font-mono uppercase text-[#ccff00] hover:underline font-semibold">Connect Your Stack →</a>
          </article>

          <article class="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00]/40 transition-all flex flex-col justify-between">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full inline-block mb-4">Refactoring</span>
              <h3 class="text-2xl font-bold mb-4 text-white">Legacy System Modernisation</h3>
              <p class="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                We migrate aging codebases to modern architectures without disrupting live operations. The result: faster performance, reduced maintenance cost, and a system your team can actually extend.
              </p>
            </div>
            <a href="/contact" class="text-xs font-mono uppercase text-[#ccff00] hover:underline font-semibold">Modernize Architecture →</a>
          </article>
        </div>
      </div>
    </section>

    <!-- Section 3: Our 5-Step Development Process -->
    <section class="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="development-process-h2">
      <div class="max-w-3xl mb-16">
        <span class="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Methodology</span>
        <h2 id="development-process-h2" class="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
          Our 5-Step Development Process
        </h2>
        <p class="text-gray-400 text-lg font-light leading-relaxed">
          Predictable milestones, full technical transparency, and structured sprint cycles ensure your system launches on schedule without scope drift.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div class="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
          <span class="text-3xl font-extrabold text-[#ccff00] font-mono block mb-3">01</span>
          <h3 class="text-lg font-bold text-white mb-2">Discovery &amp; Requirements</h3>
          <p class="text-gray-300 text-xs leading-relaxed font-light">
            We map your business workflows, document functional requirements, and identify the integration points your system needs to connect. This stage prevents scope creep later.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
          <span class="text-3xl font-extrabold text-[#ccff00] font-mono block mb-3">02</span>
          <h3 class="text-lg font-bold text-white mb-2">UX/UI Architecture</h3>
          <p class="text-gray-300 text-xs leading-relaxed font-light">
            We design the user experience before writing a line of backend code. Wireframes, interaction flows, and design prototypes are reviewed and approved before development begins.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
          <span class="text-3xl font-extrabold text-[#ccff00] font-mono block mb-3">03</span>
          <h3 class="text-lg font-bold text-white mb-2">Core Development</h3>
          <p class="text-gray-300 text-xs leading-relaxed font-light">
            Our engineering team builds in structured sprints with regular demos. You see working software at each milestone — not a finished product six months later that doesn't match what you asked for.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
          <span class="text-3xl font-extrabold text-[#ccff00] font-mono block mb-3">04</span>
          <h3 class="text-lg font-bold text-white mb-2">Integration, Security &amp; QA</h3>
          <p class="text-gray-300 text-xs leading-relaxed font-light">
            Every system goes through integration testing, security review, and quality assurance before it touches a production environment. We test edge cases, not just happy paths.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
          <span class="text-3xl font-extrabold text-[#ccff00] font-mono block mb-3">05</span>
          <h3 class="text-lg font-bold text-white mb-2">Deployment &amp; Support</h3>
          <p class="text-gray-300 text-xs leading-relaxed font-light">
            We deploy to your chosen infrastructure — cloud, on-premise, or hybrid — and provide structured post-launch support. Your team is never left holding an undocumented codebase.
          </p>
        </div>
      </div>
    </section>

    <!-- Section 4: What You Own -->
    <section class="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="what-you-own-h2">
      <div class="max-w-4xl mx-auto px-6">
        <div class="p-8 md:p-12 rounded-3xl bg-zinc-900/90 border border-[#ccff00]/30 shadow-2xl">
          <span class="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Intellectual Property Guarantee</span>
          <h2 id="what-you-own-h2" class="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-white">
            What You Own
          </h2>
          <p class="text-gray-200 text-lg leading-relaxed mb-6 font-light">
            Every line of code we write belongs to you. AbuQitmirLabs transfers full intellectual property and source code ownership at project completion — no licensing fees, no vendor lock-in, no ongoing dependency on us to access your own system.
          </p>
          <p class="text-gray-300 text-base leading-relaxed font-light">
            This matters more than most buyers realise. Many development firms retain a license to the components they build, meaning you're renting your own software. We don't operate that way.
          </p>
        </div>
      </div>
    </section>

    <!-- Section 5: Custom Software vs Off-the-Shelf: When to Choose Custom -->
    <section class="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="custom-vs-off-the-shelf-h2">
      <div class="max-w-4xl">
        <span class="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Decision Framework</span>
        <h2 id="custom-vs-off-the-shelf-h2" class="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
          Custom Software vs Off-the-Shelf: When to Choose Custom
        </h2>
        <p class="text-gray-300 text-lg leading-relaxed mb-8 font-light">
          Off-the-shelf software makes sense when your workflow is standard and a mature product already covers it well. Custom software is the right choice when:
        </p>
        <ul class="space-y-4 text-gray-200 text-base leading-relaxed mb-8 list-disc pl-6 font-light">
          <li>Your process has regulatory or compliance requirements a generic tool doesn't meet</li>
          <li>You need to integrate multiple systems that don't natively connect</li>
          <li>You're building a product to sell to other businesses (SaaS)</li>
          <li>A generic tool forces your team to change how they work rather than the other way around</li>
          <li>You've outgrown your current software and rebuilding from scratch is cheaper than patching</li>
        </ul>
        <p class="text-gray-300 text-base leading-relaxed font-light">
          The decision isn't always custom vs. off-the-shelf. Sometimes the answer is a custom layer built on top of an existing platform. We'll tell you which approach makes more sense for your situation before you commit to a build.
        </p>
      </div>
    </section>

    <!-- Section 6: How Much Does Custom Software Development Cost? -->
    <section class="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="cost-analysis-h2">
      <div class="max-w-7xl mx-auto px-6">
        <div class="max-w-3xl mb-16">
          <span class="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Investment Scoping</span>
          <h2 id="cost-analysis-h2" class="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
            How Much Does Custom Software Development Cost?
          </h2>
          <p class="text-gray-400 text-lg font-light leading-relaxed">
            Cost depends on scope, complexity, and the number of integrations involved. As a general reference point:
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div class="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
            <h3 class="text-xl font-bold text-white mb-2">Simple Internal Tools</h3>
            <p class="text-[#ccff00] font-mono text-sm mb-4">Single workflow, no complex integrations</p>
            <p class="text-gray-300 text-sm leading-relaxed font-light">
              Typically ranges from lower four figures to mid-five figures. Ideal for focused automation, single department portals, and operational scripts.
            </p>
          </div>

          <div class="p-8 rounded-2xl bg-zinc-900/50 border border-[#ccff00]/40 bg-zinc-900/80">
            <h3 class="text-xl font-bold text-white mb-2">Mid-Complexity Platforms</h3>
            <p class="text-[#ccff00] font-mono text-sm mb-4">Multi-role, several integrations, custom reporting</p>
            <p class="text-gray-300 text-sm leading-relaxed font-light">
              Ranges from mid-to-upper five figures. Includes comprehensive CRM/ERP modules, customer portals, and unified database management.
            </p>
          </div>

          <div class="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
            <h3 class="text-xl font-bold text-white mb-2">Enterprise Systems or SaaS</h3>
            <p class="text-[#ccff00] font-mono text-sm mb-4">Multi-tenant, high concurrency, complex data architecture</p>
            <p class="text-gray-300 text-sm leading-relaxed font-light">
              Six figures and above. Built for global scalability, high-frequency transactions, mission-critical resilience, and automated multi-tier billing.
            </p>
          </div>
        </div>

        <div class="bg-zinc-900/70 p-8 rounded-2xl border border-white/10 max-w-3xl">
          <p class="text-gray-300 text-sm leading-relaxed mb-6 font-light">
            The most accurate way to scope cost is to start with a discovery engagement — a structured requirements session that produces a detailed specification. This gives you a fixed scope to price against, rather than an estimate that shifts as requirements become clearer.
          </p>
          <a href="/contact" class="inline-flex items-center gap-2 text-sm font-mono uppercase text-[#ccff00] font-bold hover:underline">
            Talk to AbuQitmirLabs about your project →
          </a>
        </div>
      </div>
    </section>

    <!-- Section 7: How Long Does It Take? -->
    <section class="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="timeline-h2">
      <div class="max-w-4xl">
        <span class="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Project Timelines</span>
        <h2 id="timeline-h2" class="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
          How Long Does It Take?
        </h2>
        <p class="text-gray-300 text-lg leading-relaxed mb-6 font-light">
          Timelines depend on scope. A focused single-workflow tool can be in production in six to ten weeks. A full SaaS platform with multiple user roles, billing integration, and custom reporting typically takes four to eight months. Enterprise systems with legacy migration components run longer.
        </p>
        <p class="text-gray-300 text-lg leading-relaxed font-light">
          What we control is communication. You'll never be left wondering where the project stands.
        </p>
      </div>
    </section>

    <!-- Section 8: Why AbuQitmirLabs? -->
    <section class="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="why-abuqitmirlabs-h2">
      <div class="max-w-7xl mx-auto px-6">
        <div class="max-w-4xl">
          <span class="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Proven Track Record</span>
          <h2 id="why-abuqitmirlabs-h2" class="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
            Why AbuQitmirLabs?
          </h2>
          <p class="text-gray-300 text-lg leading-relaxed mb-6 font-light">
            AbuQitmirLabs engineers systems where standard tools don't reach.
          </p>
          <div class="p-8 rounded-2xl bg-zinc-900/80 border border-[#ccff00]/40 mb-8">
            <h3 class="text-2xl font-bold text-white mb-3">TajweedPage.com — Case Study In Custom Engineering</h3>
            <p class="text-gray-300 text-base leading-relaxed mb-4 font-light">
              Our most documented build is <a href="/case-studies/tajweedpage" class="text-[#ccff00] hover:underline font-semibold">TajweedPage.com</a> — the world's first RAG-based AI Tajweed teacher. We engineered the complete AI system: the retrieval-augmented generation pipeline, the programmatic content architecture, and the real-time Quranic recitation guidance layer. It's an EdTech platform that required a custom AI stack from scratch, because no off-the-shelf solution existed for what it needed to do.
            </p>
            <p class="text-gray-300 text-sm font-mono text-[#ccff00]">
              That's the kind of problem we're built for.
            </p>
          </div>
          <p class="text-gray-300 text-base leading-relaxed font-light">
            We also bring a full-stack discipline to every engagement: custom <a href="/web-development" class="text-[#ccff00] hover:underline font-medium">web development</a>, mobile, AI integration, and SEO — so the software we ship isn't isolated from your broader digital infrastructure.
          </p>
        </div>
      </div>
    </section>

    <!-- Section 9: Frequently Asked Questions (5 Q&As) -->
    <section class="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="faq-h2">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <span class="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Direct Answers</span>
          <h2 id="faq-h2" class="text-3xl md:text-5xl font-extrabold mt-3 text-white">Frequently Asked Questions</h2>
        </div>

        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
            <h3 class="text-lg font-bold text-white mb-2">What technologies do you use for custom software development?</h3>
            <p class="text-gray-300 text-sm leading-relaxed font-light">
              We use technologies selected for the problem, not the other way around. Common choices include React, Next.js, Node.js, Python, PostgreSQL, and cloud platforms (AWS, GCP, Azure). For AI-integrated systems we work with LangChain, vector databases, and RAG pipelines. We document the full stack in your project specification before development begins.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
            <h3 class="text-lg font-bold text-white mb-2">Do you work with startups or only established businesses?</h3>
            <p class="text-gray-300 text-sm leading-relaxed font-light">
              Both. We've worked with early-stage founders building their first product and with established businesses replacing legacy systems. The discovery process is the same either way — we scope to your requirements, not your company size.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
            <h3 class="text-lg font-bold text-white mb-2">Can you take over a project another development team started?</h3>
            <p class="text-gray-300 text-sm leading-relaxed font-light">
              Yes. We conduct a codebase audit first to assess what's worth preserving and what needs to be rebuilt. We don't inherit someone else's technical debt blindly — we tell you what we find before we agree to take it on.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
            <h3 class="text-lg font-bold text-white mb-2">What happens after the software is launched?</h3>
            <p class="text-gray-300 text-sm leading-relaxed font-light">
              We provide structured post-launch support covering bug resolution, minor enhancements, and monitoring. Longer-term maintenance and feature development can be scoped as a separate ongoing engagement.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
            <h3 class="text-lg font-bold text-white mb-2">Will I be able to modify the software myself after the project?</h3>
            <p class="text-gray-300 text-sm leading-relaxed font-light">
              If your team has developers, yes — the codebase is documented and fully yours. If not, we can provide a retainer for ongoing changes, or we can help you hire developers who can maintain it independently.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 10: Start Your Custom Software Project (CTA) -->
    <section class="py-20 md:py-28 text-center bg-gradient-to-b from-zinc-900 to-black border-t border-white/10" aria-labelledby="cta-h2">
      <div class="max-w-4xl mx-auto px-6">
        <h2 id="cta-h2" class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
          Start Your Custom Software Project
        </h2>
        <p class="text-gray-400 text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
          If you have a business process that generic software doesn't cover — or a product idea that needs a technical team to build it — start the conversation with AbuQitmirLabs.
        </p>
        <p class="text-gray-400 text-sm mb-10 max-w-xl mx-auto font-light">
          We scope projects honestly, build in structured sprints, and hand over full IP ownership at the end. No lock-in. No surprises.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-6">
          <a href="/contact" class="px-10 py-5 bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(204,255,0,0.4)]">
            Start the Conversation with AbuQitmirLabs
          </a>
          <a href="/case-studies" class="px-8 py-5 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider">
            View Our Case Studies
          </a>
        </div>
      </div>
    </section>
  </main>

  <footer class="border-t border-white/10 bg-black py-16 text-gray-400 text-sm">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
      <div>
        <div class="flex items-center gap-3 text-white font-bold tracking-wider mb-4">
          <img src="/logo.png" alt="AbuQitmirLabs Logo" width="32" height="32" class="rounded-lg" loading="lazy" />
          <span>ABUQITMIRLABS</span>
        </div>
        <p class="text-xs text-gray-500 leading-relaxed">
          High-performance digital solutions architecting future-proof growth with AI-driven tech and bespoke software systems.
        </p>
      </div>
      <div>
        <h4 class="text-white font-mono text-xs uppercase tracking-widest mb-4">Core Services</h4>
        <ul class="space-y-2 text-xs font-light">
          <li><a href="/custom-software" class="hover:text-[#ccff00]">Custom Software Development</a></li>
          <li><a href="/mobile-app-development" class="hover:text-[#ccff00]">Mobile App Engineering</a></li>
          <li><a href="/web-development" class="hover:text-[#ccff00]">Web Applications</a></li>
          <li><a href="/ai-agent-development" class="hover:text-[#ccff00]">AI Agent Systems</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-mono text-xs uppercase tracking-widest mb-4">Industry Solutions</h4>
        <ul class="space-y-2 text-xs font-light">
          <li><a href="/solutions/edtech" class="hover:text-[#ccff00]">EdTech Platforms</a></li>
          <li><a href="/solutions/fintech" class="hover:text-[#ccff00]">FinTech Software</a></li>
          <li><a href="/solutions/healthcare" class="hover:text-[#ccff00]">Healthcare Solutions</a></li>
          <li><a href="/solutions/ai-automation" class="hover:text-[#ccff00]">AI Automation</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-mono text-xs uppercase tracking-widest mb-4">Company &amp; Legal</h4>
        <ul class="space-y-2 text-xs font-light">
          <li><a href="/about/our-company" class="hover:text-[#ccff00]">Our Company</a></li>
          <li><a href="/about/our-team" class="hover:text-[#ccff00]">Our Team</a></li>
          <li><a href="/contact" class="hover:text-[#ccff00]">Contact Us</a></li>
          <li><a href="/privacy" class="hover:text-[#ccff00]">Privacy Policy</a></li>
          <li><a href="/terms" class="hover:text-[#ccff00]">Terms &amp; Conditions</a></li>
        </ul>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-600">
      <p>© 2026 AbuQitmirLabs. All rights reserved. Full source code &amp; IP ownership transferred upon project completion.</p>
      <div class="flex items-center gap-4 text-gray-500">
        <a href="https://linkedin.com/in/abu-qitmir-697423390/" target="_blank" rel="noopener noreferrer" class="hover:text-[#ccff00]">LinkedIn</a>
        <a href="https://x.com/AbuQitmir" target="_blank" rel="noopener noreferrer" class="hover:text-[#ccff00]">X (Twitter)</a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="hover:text-[#ccff00]">GitHub</a>
      </div>
    </div>
  </footer>
</div>
`;

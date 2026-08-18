"use client";

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import { mobileAppSchema } from '../utils/mobileAppStaticHtml';

const MobileAppDevelopmentPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const mobileAppTypes = [
    {
      title: "Flutter Cross-Platform Apps",
      tag: "Cross-Platform",
      desc: "Flutter is our primary cross-platform framework. A single Flutter codebase deploys to iOS and Android simultaneously, with native-level performance and access to device hardware. This cuts build time and reduces long-term maintenance cost without compromising the user experience. We use Flutter for most commercial apps where the product needs to reach both platforms efficiently. It's the right call for most startups and product-stage businesses.",
      iconId: "icon-smartphone",
      link: "/contact",
      linkText: "Discuss Flutter Scope"
    },
    {
      title: "Native iOS App Development (Swift)",
      tag: "Apple Ecosystem",
      desc: "When performance, platform integration, or App Store-specific capabilities demand it, we build natively in Swift for iOS. Native development gives you full access to Apple's latest APIs, tighter integration with iOS system features, and the best possible performance ceiling. We recommend native iOS when your app's core functionality relies heavily on Apple-specific hardware or frameworks — ARKit, HealthKit, Core ML, or intensive real-time processing.",
      iconId: "icon-layers",
      link: "/contact",
      linkText: "Scope Native iOS"
    },
    {
      title: "Native Android App Development (Kotlin)",
      tag: "Android Ecosystem",
      desc: "Native Android development in Kotlin gives you full access to Google's API ecosystem — Google Maps integration, Google Pay, Android-specific notifications, and the full range of device hardware capabilities across the Android device landscape. We build native Android for enterprise deployments, hardware-integrated apps, and cases where cross-platform performance trade-offs are unacceptable.",
      iconId: "icon-cpu",
      link: "/contact",
      linkText: "Scope Native Android"
    },
    {
      title: "React Native Apps",
      tag: "JavaScript Framework",
      desc: "For teams with existing JavaScript/React codebases or products that need to share logic with a web application, React Native is a strong cross-platform option. We use it when there's an architectural reason — not as a default.",
      iconId: "icon-code",
      link: "/web-development",
      linkText: "Explore Web & React Stack"
    },
    {
      title: "Progressive Web Apps (PWA)",
      tag: "Web-Native App",
      desc: "A Progressive Web App runs in the browser but installs like a native app, supports offline usage, and sends push notifications. PWAs are a practical option when you need mobile-app-like functionality without the App Store overhead. We're honest about when a PWA is the right answer instead of a native build — if your use case fits, it's a faster and cheaper route to mobile.",
      iconId: "icon-database",
      link: "/custom-software",
      linkText: "Explore Web & Software"
    },
    {
      title: "AI-Powered Mobile Apps",
      tag: "Intelligence",
      desc: "We integrate large language models, on-device inference, and backend AI pipelines directly into mobile apps. If your app needs natural language input, personalisation, recommendation logic, or computer vision, we build the AI layer alongside the mobile layer — not as an afterthought.",
      iconId: "icon-brain-circuit",
      link: "/ai-agent-development",
      linkText: "Explore AI Agent Development"
    }
  ];

  const processSteps = [
    {
      num: "01",
      title: "Discovery & Requirements",
      desc: "We map your user journeys, define core feature scope, and choose the right platform and framework before a line of code is written. Scope decisions made here prevent expensive rebuilds later."
    },
    {
      num: "02",
      title: "UX/UI Design",
      desc: "We design mobile-native interfaces — not desktop layouts scaled down. Tap targets, navigation patterns, gesture interactions, and loading states are all designed for thumbs and small screens first."
    },
    {
      num: "03",
      title: "Development Sprints",
      desc: "We build in structured sprints with working builds at each milestone. You test the real app on a real device throughout development — not a prototype that behaves differently from the finished product."
    },
    {
      num: "04",
      title: "Backend & API Integration",
      desc: "Most apps need a backend: user authentication, databases, third-party APIs, payment gateways, push notifications. We build or connect the server-side infrastructure your app depends on."
    },
    {
      num: "05",
      title: "QA & Device Testing",
      desc: "We test across multiple devices and OS versions — not just a single emulator. Real-device testing on iOS and Android catches issues that emulators miss."
    },
    {
      num: "06",
      title: "App Store & Google Play Submission",
      desc: "We handle the full submission process for both stores: metadata, screenshots, compliance review preparation, and resubmissions if needed. App Store rejections are a predictable part of the process — we manage them."
    },
    {
      num: "07",
      title: "Post-Launch Support",
      desc: "After launch, apps need OS updates, performance monitoring, and bug resolution. We provide structured post-launch support, and longer-term maintenance can be scoped as a separate engagement."
    }
  ];

  const faqs = [
    {
      q: "Do you build for both iOS and Android?",
      a: "Yes. We build for both platforms — cross-platform using Flutter or React Native, or natively in Swift (iOS) and Kotlin (Android). We'll recommend the right approach based on your requirements during scoping."
    },
    {
      q: "Can you add AI features to an existing mobile app?",
      a: "Yes. We integrate LLM-based features, on-device inference, and backend AI pipelines into existing mobile apps. The scope depends on your app's current architecture."
    },
    {
      q: "Do you handle App Store and Google Play submission?",
      a: "Yes. We prepare metadata, screenshots, compliance documentation, and manage the submission process for both stores, including handling any rejection feedback from Apple or Google."
    },
    {
      q: "Can you take over a mobile app another developer built?",
      a: "Yes. We conduct a codebase review first to assess what can be extended and what needs to be rebuilt. We won't inherit technical debt without telling you what we find."
    },
    {
      q: "What happens if Apple or Google rejects the app?",
      a: "Rejections are a predictable part of the App Store process. We manage the response and resubmission — this is included in our delivery, not treated as an extra."
    },
    {
      q: "Do I need a backend for my mobile app?",
      a: "Most apps do. User accounts, data persistence, push notifications, and third-party integrations all require server-side infrastructure. We build or connect the backend your app needs as part of the same engagement."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans antialiased">
      <Helmet>
        <title>Mobile App Development Company | AbuQitmirLabs</title>
        <meta name="description" content="Flutter, React Native, and native iOS/Android app development. Full source code ownership, App Store submission, and backend integration included." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/mobile-app-development" />

        {/* Open Graph */}
        <meta property="og:title" content="Mobile App Development Company | AbuQitmirLabs" />
        <meta property="og:description" content="Flutter, React Native, and native iOS/Android app development. Full source code ownership, App Store submission, and backend integration included." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/mobile-app-development" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mobile App Development Company | AbuQitmirLabs" />
        <meta name="twitter:description" content="Flutter, React Native, and native iOS/Android app development. Full source code ownership, App Store submission, and backend integration included." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Unified JSON-LD Schema */}
        <script type="application/ld+json">{JSON.stringify(mobileAppSchema)}</script>
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
            { label: 'Mobile App Development', path: '/mobile-app-development' }
          ]} />
        </div>

        {/* Hero Section with EXACT Single H1 */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10" aria-labelledby="mobile-hero-title">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(204,255,0,0.06),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-6">
              <svg className="w-4 h-4 text-[#ccff00]" aria-hidden="true"><use href="/sprite.svg#icon-smartphone" /></svg>
              iOS, Android &amp; Cross-Platform Engineering
            </div>

            <h1 id="mobile-hero-title" className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl text-white">
              Mobile App Development Company | Flutter &amp; Native iOS/Android
            </h1>

            {/* Direct Answer Block for AEO/GEO */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl max-w-4xl mb-8 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Direct Answer:</strong> Mobile app development is the process of designing and building software applications that run on smartphones and tablets — either natively on iOS/Android or cross-platform using frameworks like Flutter or React Native. AbuQitmirLabs builds high-performance mobile apps for startups and growing businesses, handling everything from UX design and development through to App Store and Google Play submission.
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
              Transform your digital vision into a fast, fluid mobile product. We engineer resilient native and cross-platform apps built for sustained user retention and effortless scalability.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link 
                to="/contact" 
                aria-label="Talk to AbuQitmirLabs about your mobile app project"
                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Talk to AbuQitmirLabs About Your App
                <svg className="w-5 h-5" aria-hidden="true"><use href="/sprite.svg#icon-arrow-right" /></svg>
              </Link>
              <Link 
                to="/case-studies/tajweedpage" 
                aria-label="View our TajweedPage case study"
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider"
              >
                View Case Study
              </Link>
            </div>
          </div>
        </section>

        <CountryMarquee />

        {/* Section 1: What Is Mobile App Development? */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="what-is-mobile-app-h2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Foundation</span>
              <h2 id="what-is-mobile-app-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
                What Is Mobile App Development?
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                A mobile app is not a website that works on a phone. It's a purpose-built piece of software that uses the device's native hardware — camera, GPS, push notifications, biometrics — to deliver an experience a browser can't match.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                Over 60% of all web searches now happen on mobile devices, and user expectations for app performance have risen accordingly. A slow, poorly designed app loses users in the first session. A well-built app becomes the primary touchpoint between a business and its customers.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                At AbuQitmirLabs, we build apps that are engineered to perform — not just prototyped to demo. Every project comes with full source code ownership and no licensing dependency on us after handover.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Mobile Apps We Build */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="mobile-apps-we-build-h2">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Architectures &amp; Frameworks</span>
            <h2 id="mobile-apps-we-build-h2" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6 text-white">
              Mobile Apps We Build
            </h2>
            <p className="text-gray-400 text-base md:text-lg font-light">
              From unified multi-platform engines to hardware-accelerated native builds, we select and execute the optimal tech stack for your product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mobileAppTypes.map((item, idx) => (
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
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                    {item.desc}
                    {item.title.includes("AI-Powered") && (
                      <span> See our <Link to="/ai-agent-development" className="text-[#ccff00] hover:underline font-medium">AI Agent Development service</Link> for the engineering approach behind this.</span>
                    )}
                  </p>
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

        {/* Section 3: Our Mobile App Development Process */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="mobile-process-h2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Delivery Lifecycle</span>
              <h2 id="mobile-process-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
                Our Mobile App Development Process
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                A structured 7-step engineering methodology delivering robust, store-ready mobile applications without scope drift.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {processSteps.map((step, idx) => (
                <div key={idx} className={`p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-[#ccff00]/40 transition-colors flex flex-col justify-between ${idx === 6 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
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

        {/* Section 4: What You Own After the Project */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="what-you-own-mobile-h2">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-12 rounded-3xl bg-zinc-900/80 border border-[#ccff00]/40 shadow-2xl backdrop-blur-md">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Source Code &amp; IP Guarantee</span>
              <h2 id="what-you-own-mobile-h2" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-white">
                What You Own After the Project
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed mb-6 font-light">
                Full source code. Full IP ownership. No license fees. No dependency on AbuQitmirLabs to access or modify your own app.
              </p>
              <p className="text-gray-300 text-base leading-relaxed font-light">
                We hand over the complete project files, version control history, and documentation. Your in-house team or any other developer can pick it up and continue without us.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Flutter vs Native vs React Native — Which Is Right for You? */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="framework-comparison-h2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Architectural Comparison</span>
              <h2 id="framework-comparison-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
                Flutter vs Native vs React Native — Which Is Right for You?
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                The right choice depends on your app's requirements, not our framework preference.
              </p>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#ccff00]">●</span> Choose Flutter if:
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm list-disc pl-6 font-light">
                    <li>You need iOS and Android from day one</li>
                    <li>Budget and timeline matter</li>
                    <li>Your app's functionality doesn't rely on a platform-specific API or hardware</li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#ccff00]">●</span> Choose Native (Swift/Kotlin) if:
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm list-disc pl-6 font-light">
                    <li>Your app is deeply integrated with platform-specific hardware or APIs</li>
                    <li>You need maximum performance (real-time graphics, AR, camera processing)</li>
                    <li>You're building iOS-only or Android-only</li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#ccff00]">●</span> Choose React Native if:
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm list-disc pl-6 font-light">
                    <li>Your team has strong JavaScript/React expertise</li>
                    <li>You're sharing business logic with a web app</li>
                    <li>Speed of iteration matters more than raw performance ceiling</li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#ccff00]">●</span> Choose PWA if:
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm list-disc pl-6 font-light">
                    <li>You don't need App Store distribution</li>
                    <li>Your budget is limited and browser-based capabilities cover your core use case</li>
                    <li>You need offline support without native build complexity</li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-300 text-base leading-relaxed mt-8 font-light">
                We'll tell you which one fits your situation during scoping — not the one that's easiest for us to build.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: How Much Does Mobile App Development Cost? */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="mobile-cost-h2">
          <div className="max-w-3xl mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Investment Scoping</span>
            <h2 id="mobile-cost-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
              How Much Does Mobile App Development Cost?
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Cost depends on scope, complexity, platform choice, and backend requirements. As a general reference:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Simple Single-Workflow Apps</h3>
                <p className="text-[#ccff00] font-mono text-xs uppercase tracking-wider mb-4">Low-to-mid five figures</p>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  One core feature, clean UI, standard device permissions, and no complex custom backend.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/80 border border-[#ccff00]/40 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Mid-Complexity Apps</h3>
                <p className="text-[#ccff00] font-mono text-xs uppercase tracking-wider mb-4">Mid-to-upper five figures</p>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  Multiple screens, user accounts, API integrations, payment processing, push notifications, and both platforms.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Complex &amp; Enterprise Apps</h3>
                <p className="text-[#ccff00] font-mono text-xs uppercase tracking-wider mb-4">Six figures and above</p>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  Real-time features, AI integration, custom backend infrastructure, offline data sync, and enterprise security compliance.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/70 p-8 rounded-2xl border border-white/10 max-w-3xl">
            <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
              The most reliable cost comes from a scoped discovery engagement — a structured requirements session that produces a detailed specification. This gives you a fixed scope to price against.
            </p>
            <Link 
              to="/contact" 
              aria-label="Talk to AbuQitmirLabs about your mobile app project"
              className="inline-flex items-center gap-2 text-sm font-mono uppercase text-[#ccff00] font-bold hover:underline"
            >
              Talk to AbuQitmirLabs about your app →
            </Link>
          </div>
        </section>

        {/* Section 7: How Long Does Mobile App Development Take? */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="mobile-timelines-h2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Project Timelines</span>
              <h2 id="mobile-timelines-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
                How Long Does Mobile App Development Take?
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                A focused single-platform MVP takes around six to twelve weeks. A dual-platform app with a custom backend and multiple integrated features typically runs three to six months. Complex apps with AI integration, real-time functionality, or enterprise-scale requirements run longer.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                What we control is transparency. You'll always know where the project is and what's coming next.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: Why AbuQitmirLabs for Mobile App Development? */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="why-abuqitmirlabs-mobile-h2">
          <div className="max-w-4xl">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Engineering Advantage</span>
            <h2 id="why-abuqitmirlabs-mobile-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
              Why AbuQitmirLabs for Mobile App Development?
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
              We build the full stack — not just the front-end. When your app needs a backend, an AI layer, or deep API integration, we handle it within the same engagement rather than leaving you to coordinate multiple vendors.
            </p>
            <p className="text-gray-300 text-base leading-relaxed mb-6 font-light">
              Our engineering approach covers <Link to="/custom-software" className="text-[#ccff00] hover:underline font-medium" aria-label="Explore our custom software development">custom software</Link>, <Link to="/web-development" className="text-[#ccff00] hover:underline font-medium" aria-label="Explore our web development services">web development</Link>, and <Link to="/ai-agent-development" className="text-[#ccff00] hover:underline font-medium" aria-label="Explore our AI agent integration services">AI agent integration</Link> alongside mobile — which means the app we build for you fits into a coherent technical architecture, not a patchwork of disconnected tools.
            </p>
            <p className="text-gray-300 text-base leading-relaxed font-light">
              We also work across multiple markets. Whether you're building for an audience in the <Link to="/us-market" className="text-[#ccff00] hover:underline font-medium" aria-label="Learn about our US market capabilities">US</Link>, <Link to="/uk-market" className="text-[#ccff00] hover:underline font-medium" aria-label="Learn about our UK market capabilities">UK</Link>, or <Link to="/pakistan-market" className="text-[#ccff00] hover:underline font-medium" aria-label="Learn about our Pakistan market capabilities">Pakistan</Link>, we understand the platform expectations, payment integrations, and compliance requirements that differ by region.
            </p>
          </div>
        </section>

        {/* Section 9: Frequently Asked Questions */}
        <section className="py-20 md:py-28 bg-zinc-950/90 border-b border-white/10" aria-labelledby="mobile-faq-section-h2">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Direct Answers</span>
              <h2 id="mobile-faq-section-h2" className="text-3xl md:text-5xl font-extrabold mt-3 text-white">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-white/10 rounded-2xl bg-zinc-900/50 overflow-hidden">
                  <button 
                    className="w-full p-6 text-left font-bold text-lg flex items-center justify-between gap-4 hover:text-[#ccff00] transition-colors"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    aria-expanded={activeFaq === idx}
                    aria-controls={`mobile-faq-answer-${idx}`}
                    id={`mobile-faq-question-${idx}`}
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
                        id={`mobile-faq-answer-${idx}`}
                        role="region"
                        aria-labelledby={`mobile-faq-question-${idx}`}
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

        {/* Section 10: Start Your Mobile App Project (CTA) */}
        <section className="py-20 md:py-28 text-center bg-gradient-to-b from-zinc-900 to-black border-t border-white/10" aria-labelledby="mobile-cta-section-h2">
          <div className="max-w-4xl mx-auto px-6">
            <h2 id="mobile-cta-section-h2" className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
              Start Your Mobile App Project
            </h2>
            <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto font-light leading-relaxed">
              If you have an app idea, a workflow to mobilise, or an existing app that needs rebuilding — start the conversation with AbuQitmirLabs.
            </p>
            <p className="text-gray-400 text-sm mb-10 max-w-xl mx-auto font-light">
              We scope projects honestly, build in structured sprints, and hand over full IP ownership on completion.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link 
                to="/contact" 
                aria-label="Start the conversation with AbuQitmirLabs about your mobile app project"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(204,255,0,0.4)]"
              >
                Start the Conversation with AbuQitmirLabs
                <svg className="w-5 h-5" aria-hidden="true"><use href="/sprite.svg#icon-arrow-right" /></svg>
              </Link>
              <Link 
                to="/case-studies/tajweedpage" 
                aria-label="View our TajweedPage case study"
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

export default MobileAppDevelopmentPage;

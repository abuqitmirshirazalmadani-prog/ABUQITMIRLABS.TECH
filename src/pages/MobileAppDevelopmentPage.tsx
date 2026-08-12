"use client";

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { YouTubeFacade } from '../components/ui/youtube-facade';
import { 
  Smartphone, 
  Layers, 
  Cpu, 
  Database, 
  Sparkles, 
  Zap, 
  Star, 
  Plus, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  SearchCode, 
  ShieldCheck, 
  Code2, 
  Globe, 
  Eye,
  Terminal,
  Server,
  Heart,
  Truck,
  Home,
  HeartPulse,
  Scale,
  Calendar,
  GraduationCap,
  Activity,
  ExternalLink
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import HeroText from '../components/ui/hero-shutter-text';
import MobileAppCategoriesShowcase from '../components/MobileAppCategoriesShowcase';
import AppDevelopmentTeamRoles from '../components/AppDevelopmentTeamRoles';
import AppDevelopmentPricing from '../components/AppDevelopmentPricing';

const MobileAppDevelopmentPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const capabilities = [
    {
      id: "01",
      title: "Flutter Cross-Platform Apps",
      content: "Maximize market reach while keeping engineering budgets focused. We engineer high-performance cross-platform mobile apps using Flutter and Dart. By compiling a single, clean codebase directly to native ARM machine code for iOS and Android, we accelerate release timelines by up to 40% while maintaining 120 FPS UI rendering, custom Skia/Impeller graphics, and flawless native device interactions.",
      icon: <Smartphone />,
      accent: "blue"
    },
    {
      id: "02",
      title: "Native iOS Apps (Swift & SwiftUI)",
      content: "Deliver an ultra-refined, fluid experience built exclusively for the Apple ecosystem. We engineer custom native iOS applications using Swift 6, SwiftUI, and Combine reactive pipelines. Our iOS builds strictly adhere to Apple Human Interface Guidelines, optimizing battery lifecycle, Metal graphics rendering, and seamless integrations with Apple Pay, Face ID, and Apple HealthKit.",
      icon: <Layers />,
      accent: "indigo"
    },
    {
      id: "03",
      title: "Native Android Apps (Kotlin)",
      content: "Unleash robust Android processing power across the world's most diverse device landscape. We build native Android applications leveraging Kotlin, Jetpack Compose, and modern Android Architecture Components (MVI/MVVM). Our software is built to handle multi-threaded background processing, Room database caching, and hardware integrations like Bluetooth LE, NFC, and camera APIs.",
      icon: <Cpu />,
      accent: "sky"
    },
    {
      id: "04",
      title: "Offline-First Database Cache",
      content: "Ensure continuous mobile usability regardless of network reliability. We design offline-first local data architectures using SQLite, Realm, and Hive database caching layers. Your application loads instantly from local encrypted stores, queuing offline user actions, and executing background delta synchronization as soon as a cellular or Wi-Fi connection is restored.",
      icon: <Database />,
      accent: "violet"
    }
  ];

  const faqData = [
    {
      q: "What does a mobile app development company do?",
      a: "A mobile app development company designs, engineers, tests, and deploys applications for smartphones, tablets, and wearable devices. At AbuQitmirLabs, we manage the complete product lifecycle: technical discovery, UI/UX design, native (iOS/Android) or cross-platform (Flutter/React Native) development, secure backend API integration, automated QA testing, App Store and Google Play Store submission, and continuous post-launch maintenance."
    },
    {
      q: "How much does custom mobile app development cost?",
      a: "The cost of custom mobile app development depends on project scope, platform requirements, backend complexity, and feature sets. A streamlined cross-platform Minimum Viable Product (MVP) typically ranges from $8,000 to $15,000, while a feature-rich enterprise mobile app with custom APIs, real-time WebSockets, offline sync, and multi-role admin portals ranges from $20,000 to $50,000+. We provide itemized, fixed-scope proposals after technical discovery rather than rough estimates."
    },
    {
      q: "How long does it take to build a mobile app?",
      a: "Initial discovery, wireframing, and interactive UI/UX prototyping usually require 2 to 3 weeks. Full development for a Minimum Viable Product (MVP) using Flutter or React Native typically requires 6 to 10 weeks. Enterprise-grade mobile software involving complex backend integrations, custom security encryption, and multi-device QA testing generally takes 12 to 20 weeks from project kick-off to official store publication."
    },
    {
      q: "Should I build native or cross-platform?",
      a: "Choose cross-platform development (using Flutter or React Native) if you want to target both iOS and Android simultaneously with a single codebase, compressing initial development time and reducing long-term maintenance costs by up to 40%. Choose native development (Swift for iOS, Kotlin for Android) if your application requires heavy hardware integration, platform-exclusive APIs (like Apple HealthKit or ARKit), complex 3D graphics, or maximum CPU/GPU rendering efficiency."
    },
    {
      q: "Is Flutter good for mobile app development?",
      a: "Yes. Flutter is one of the most powerful cross-platform frameworks available today. Developed by Google, Flutter compiles directly to native ARM machine code for both iOS and Android, bypassing JavaScript bridges and delivering consistent 120 FPS UI performance. It enables near 100% code sharing between platforms, making it an ideal choice for startups and enterprises seeking rapid time-to-market without sacrificing visual polish or responsiveness."
    },
    {
      q: "Can you build both iOS and Android apps simultaneously?",
      a: "Yes. Using cross-platform technologies like Flutter or React Native, we build unified mobile applications that deploy simultaneously to both the Apple App Store and Google Play Store from a shared codebase. If your product demands separate native builds, our team develops dedicated iOS apps in Swift 6 and Android apps in Kotlin in parallel, ensuring full platform compliance for both ecosystems."
    },
    {
      q: "Can you integrate APIs and third-party services into mobile apps?",
      a: "Yes. We architect lightweight API abstraction layers connecting your mobile frontend to existing databases, ERPs, CRM systems, payment gateways (Stripe, PayPal, Apple Pay, Google Pay), OAuth2/JWT authentication providers, push notification hubs (Firebase FCM), analytics tools, and automated custom software backends or AI agent pipelines."
    },
    {
      q: "Will you help publish the app to the App Store and Google Play Store?",
      a: "Yes. We handle 100% of the submission and approval process for both Apple App Store and Google Play Store. This includes preparing store graphics and metadata, configuring developer accounts, setting up privacy labels and data safety declarations, managing TestFlight and Google Beta testing groups, and addressing any store reviewer feedback until your application is officially published."
    },
    {
      q: "Do you provide app maintenance and updates after launch?",
      a: "Yes. Apple and Google release major OS updates and updated SDK guidelines annually. We offer structured post-launch Service Level Agreements (SLAs) covering 24/7 crash monitoring via Firebase Crashlytics and Sentry, routine bug fixes, performance optimization, database maintenance, and feature enhancements to ensure your mobile application remains secure and fully functional across new device models."
    }
  ];

  return (
    <div className="bg-[#050505] text-neutral-300 font-body antialiased overflow-x-hidden min-h-screen relative selection:bg-blue-500/30 selection:text-white">
      <Helmet>
        <title>Mobile App Development Services | AbuQitmirLabs</title>
        <meta name="description" content="AbuQitmirLabs provides custom mobile app development for startups and businesses, building fast, scalable iOS, Android, Flutter, and cross-platform apps." />
        <meta name="keywords" content="mobile app development, mobile app development company, mobile app development services, custom mobile app development, iOS app development, Android app development, Flutter app development, React Native app development, mobile app developers" />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/mobile-app-development" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Mobile App Development Services | AbuQitmirLabs" />
        <meta property="og:description" content="AbuQitmirLabs provides custom mobile app development for startups and businesses, building fast, scalable iOS, Android, Flutter, and cross-platform apps." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/mobile-app-development" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mobile App Development Services | AbuQitmirLabs" />
        <meta name="twitter:description" content="AbuQitmirLabs provides custom mobile app development for startups and businesses, building fast, scalable iOS, Android, Flutter, and cross-platform apps." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Unified @graph Schema Markup */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.abuqitmirlabs.tech/#organization",
                  "name": "AbuQitmirLabs",
                  "url": "https://www.abuqitmirlabs.tech",
                  "logo": "https://www.abuqitmirlabs.tech/logo.png",
                  "image": "https://www.abuqitmirlabs.tech/logo.png",
                  "email": "hello@abuqitmirlabs.tech",
                  "telephone": "+923233260859",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "8/15, 3 37A Rd, Shah Khalid Colony",
                    "addressLocality": "Karachi",
                    "addressRegion": "Sindh",
                    "postalCode": "75160",
                    "addressCountry": "PK"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+92-323-3260859",
                    "contactType": "customer service",
                    "areaServed": ["US", "GB", "PK", "AU", "EU", "CA"],
                    "availableLanguage": ["English", "Urdu"]
                  },
                  "sameAs": [
                    "https://www.linkedin.com/company/abuqitmirlabs-tech-697423390",
                    "https://www.facebook.com/abuqitmirlabs",
                    "https://www.instagram.com/abuqitmirlabs",
                    "https://x.com/AbuQitmir",
                    "https://www.clutch.co/profile/abuqitmirlabs",
                    "https://themanifest.com/company/abuqitmirlabstech",
                    "https://www.goodfirms.co/company/abuqitmirlabs-tech",
                    "https://www.youtube.com/@AbuQitmirMohammadShirazAlMadani",
                    "https://github.com/AbuQitmirLabs"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.abuqitmirlabs.tech/#website",
                  "url": "https://www.abuqitmirlabs.tech",
                  "name": "AbuQitmirLabs",
                  "publisher": {
                    "@id": "https://www.abuqitmirlabs.tech/#organization"
                  }
                },
                {
                  "@type": "WebPage",
                  "@id": "https://www.abuqitmirlabs.tech/mobile-app-development#webpage",
                  "url": "https://www.abuqitmirlabs.tech/mobile-app-development",
                  "name": "Mobile App Development Services | AbuQitmirLabs",
                  "description": "AbuQitmirLabs provides custom mobile app development for startups and businesses, building fast, scalable iOS, Android, Flutter, and cross-platform apps.",
                  "isPartOf": {
                    "@id": "https://www.abuqitmirlabs.tech/#website"
                  },
                  "about": {
                    "@id": "https://www.abuqitmirlabs.tech/mobile-app-development#service"
                  },
                  "breadcrumb": {
                    "@id": "https://www.abuqitmirlabs.tech/mobile-app-development#breadcrumb"
                  },
                  "inLanguage": "en-US"
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.abuqitmirlabs.tech/mobile-app-development#breadcrumb",
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
                      "name": "Mobile App Development",
                      "item": "https://www.abuqitmirlabs.tech/mobile-app-development"
                    }
                  ]
                },
                {
                  "@type": "Service",
                  "@id": "https://www.abuqitmirlabs.tech/mobile-app-development#service",
                  "name": "Mobile App Development Services",
                  "serviceType": "Mobile Application Engineering",
                  "url": "https://www.abuqitmirlabs.tech/mobile-app-development",
                  "provider": {
                    "@id": "https://www.abuqitmirlabs.tech/#organization"
                  },
                  "areaServed": ["US", "UK", "CA", "AU", "PL", "PK"],
                  "description": "Custom mobile app development services covering cross-platform Flutter solutions, native iOS (Swift), native Android (Kotlin), offline-first data caching, and enterprise backend integrations.",
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Mobile App Development Catalog",
                    "itemListElement": capabilities.map(c => ({
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": c.title,
                        "description": c.content
                      }
                    }))
                  }
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://www.abuqitmirlabs.tech/mobile-app-development#faq",
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
                  "@type": "HowTo",
                  "@id": "https://www.abuqitmirlabs.tech/mobile-app-development#process",
                  "name": "Our Mobile App Development Lifecycle",
                  "step": [
                    {
                      "@type": "HowToStep",
                      "position": 1,
                      "name": "Product Discovery & Architecture",
                      "text": "Defining user requirements, performance benchmarks, and framework choices."
                    },
                    {
                      "@type": "HowToStep",
                      "position": 2,
                      "name": "Ergonomic Wireframing & Prototyping",
                      "text": "Designing touch-first mobile interfaces adhering to iOS and Material Design standards."
                    },
                    {
                      "@type": "HowToStep",
                      "position": 3,
                      "name": "Agile Development & Sprint Releases",
                      "text": "Building feature sets in 2-week iterations with continuous integration."
                    },
                    {
                      "@type": "HowToStep",
                      "position": 4,
                      "name": "Automated Testing & Device Lab Profiling",
                      "text": "Executing automated UI unit tests, battery/memory profiling, and security audits."
                    },
                    {
                      "@type": "HowToStep",
                      "position": 5,
                      "name": "App Store Publishing & IP Transfer",
                      "text": "Managing Apple App Store and Google Play deployments and delivering 100% source code."
                    }
                  ]
                }
              ]
            })
          }}
        ></script>
      </Helmet>

      <Header />
      <Breadcrumbs />

      <main id="main-content">
        {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-24 md:pt-32 pb-20 px-6 z-10 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-blue-600/10 rounded-[100%] blur-[130px] pointer-events-none" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-[100%] blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">
            Native Render Pipeline
          </span>
        </motion.div>

        <div className="mb-4">
          <HeroText text="CROSS_PLATFORM" />
        </div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight text-white text-center mb-4 leading-[1.1] max-w-6xl"
        >
          Mobile App Development <span className="font-serif italic text-blue-400 font-normal">Services</span>
        </motion.h1>
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl block mb-8 font-sans font-bold tracking-tight text-zinc-300 uppercase text-center max-w-6xl">
          For Growing Businesses
        </p>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base md:text-lg text-neutral-400 text-center max-w-4xl mb-12 leading-relaxed font-light font-sans"
        >
          We build native and cross-platform mobile apps that survive real-world usage, not just demo conditions. From idea to App Store/Play Store approval, our engineering team handles design, development, and post-launch support so your app performs seamlessly. You can pair our mobile builds with automated <Link to="/ai-agent-development" className="text-blue-400 hover:underline font-medium">AI agent development</Link>, integrate scalable <Link to="/custom-software" className="text-blue-400 hover:underline font-medium">custom software development</Link> backends, expand cross-platform presence with <Link to="/web-development" className="text-blue-400 hover:underline font-medium">web development services</Link>, or <Link to="/case-studies/tajweedpage" className="text-blue-400 hover:underline font-medium">view our mobile app case study</Link>. <Link to="/contact" className="text-blue-400 hover:underline font-medium">Discuss your mobile app project</Link> with our senior engineering team today.
        </motion.p>

        {/* Core Capabilities Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mx-auto mb-12 max-w-4xl border-y border-white/5 py-8 px-6 bg-white/[0.01] backdrop-blur-sm rounded-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-left">
            {[
              "Native iOS (Swift) & Android (Kotlin) Development",
              "Cross-Platform Builds with React Native & Flutter",
              "App Store & Google Play Submission Support",
              "Push Notifications, Payments & Offline-Mode Integration",
              "Post-Launch Maintenance & Version Updates"
            ].map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-3 group">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 group-hover:bg-[#ccff00] transition-colors duration-300" />
                <span className="text-sm font-sans font-light text-slate-300 tracking-tight leading-relaxed group-hover:text-white transition-colors duration-300">{bullet}</span>
              </div>
            ))}
          </div>

          {/* Official Technology Frameworks - Authoritative External Links */}
          <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <span className="text-zinc-500 uppercase tracking-widest font-bold">Trusted Ecosystems:</span>
            <a href="https://flutter.dev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors">
              Flutter Docs <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-zinc-700">•</span>
            <a href="https://reactnative.dev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors">
              React Native <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-zinc-700">•</span>
            <a href="https://developer.apple.com/swift/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors">
              Swift (iOS) <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-zinc-700">•</span>
            <a href="https://developer.android.com/kotlin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors">
              Kotlin (Android) <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 mb-24"
        >
          <a 
            href="https://wa.me/923233260859"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consult with us on WhatsApp"
            className="px-10 py-8 rounded-3xl text-sm font-bold transition-all transform hover:scale-105 flex flex-col items-center justify-center gap-2 group bg-white text-black hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
            💬 Whatsapp us to Consult
          </a>
          <button 
            onClick={() => {
              const el = document.getElementById('work-action');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Scroll to see Mobile Portfolio"
            className="px-10 py-8 rounded-3xl border-2 border-white/10 text-sm font-bold transition-all transform hover:scale-105 flex flex-col items-center justify-center gap-2 bg-white/5 text-white hover:bg-white/10 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Eye className="w-6 h-6 group-hover:scale-110 transition-transform text-[#ccff00]" aria-hidden="true" />
            See Mobile Portfolio
          </button>
        </motion.div>

        {/* Technical Terminal Dashboard Accent */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-5xl w-full mx-auto"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-25" />
          <div className="relative rounded-xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-none">Axiom // Mobile_Performance_Console</div>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4 border-r border-white/5 pr-4">
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Device Analysis</div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                  <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "99%" }}
                      transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse" }}
                      className="h-full bg-blue-500" 
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-blue-400">
                    <span>Frame Rendering (120FPS)</span>
                    <span>99.1%</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                  <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "93%" }}
                      transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse" }}
                      className="h-full bg-indigo-500" 
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-indigo-400">
                    <span>Memory Optimization</span>
                    <span>93.8%</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 p-6 rounded-lg bg-white/5 border border-white/5">
                <div className="flex justify-between items-start mb-6">
                   <div className="text-xs font-medium text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                     Live Xcode & Android SDK Profiler Running
                   </div>
                   <div className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded uppercase font-bold">Standard Build</div>
                </div>
                <p className="font-mono text-xs text-blue-300 leading-loose">
                  $ flutter test --machine<br />
                  <span className="text-neutral-500">Checking Cupertino-theme compliance... [OK]</span><br />
                  <span className="text-neutral-500">Building release APK & IPA payloads... [DONE]</span><br />
                  <span className="text-white font-bold ml-4">Startup: 0.9s | Payload size: 8.2MB | Native bridges synchronized</span><br />
                  <span className="text-green-400">$ Mobile binaries are validated for App Store & Play Store entry.</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Marquee */}
      <div className="z-20 border-y bg-black/30 w-full border-white/10 pt-6 pb-6 relative backdrop-blur-sm overflow-hidden">
        <div className="flex whitespace-nowrap w-max animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 items-center px-8">
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase opacity-40">flutter cross-platform</span>
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent uppercase" style={{ WebkitTextStroke: '1px rgba(59, 130, 246, 0.4)' }}>native ios swiftui devs</span>
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase opacity-40">native android kotlin app</span>
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent uppercase" style={{ WebkitTextStroke: '1px rgba(59, 130, 246, 0.4)' }}>offline realm database syncing</span>
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase opacity-40">secure mobile jwt checkout</span>
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent uppercase" style={{ WebkitTextStroke: '1px rgba(59, 130, 246, 0.4)' }}>pwa development specialists</span>
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase opacity-40 text-glow">subsecond mobile rendering</span>
            </div>
          ))}
        </div>
      </div>

      {/* Problem Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
           <div className="glass-panel p-12 md:p-20 rounded-[2.5rem] relative z-10 max-w-4xl mx-auto text-center border-l-4 border-l-blue-600 bg-white/[0.02]/30 backdrop-blur-xl border-white/10">
              <span className="text-xs font-mono text-blue-500 mb-6 uppercase tracking-[0.3em] font-bold block">[ SYSTEM HEALTH: USER_FIRST_METRICS ]</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight mb-8">
                Mobile App Development Built for <br />
                <span className="font-serif italic text-blue-400 font-normal">Real Users, Not Just App Store Screenshots</span>
              </h2>
              <p className="text-xl md:text-2xl text-neutral-200 font-sans font-light leading-relaxed tracking-tight mb-8 max-w-3xl mx-auto">
                A mobile app is often the most demanding digital product a business ever ships — users abandon slow, battery-draining, or clunky applications within seconds, and bad store reviews ruin acquisition loops permanently.
              </p>
              <div className="space-y-6 text-base md:text-lg text-neutral-400 font-sans font-light leading-relaxed max-w-3xl mx-auto text-left">
                <p>
                  As a specialized <strong>mobile app development company</strong>, AbuQitmirLabs builds mobile products engineered around actual real-world usage patterns: lightning-fast startup times, sub-15ms UI frame budgets, hardware-level encryption, and fault-tolerant offline storage.
                </p>
                <p>
                  Many off-the-shelf mobile builds suffer from hidden memory leaks, unhandled offline states, heavy battery consumption, and fragile API bindings that fail under poor cellular conditions. We solve these systemic flaws at the architectural level. Whether implementing cross-platform <strong>Flutter development</strong> or native <strong>iOS app development</strong> (Swift) and <strong>Android app development</strong> (Kotlin), our engineering team enforces strict reactive state management (Riverpod, Bloc, MVI), automated device profiling, and secure token-based backend communications.
                </p>
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 font-sans">Types of Applications We Architect & Build</h3>
                  <p className="mb-4 text-sm md:text-base">
                    Every custom application is designed around your specific workflows, users, and business requirements. Our engineering team regularly builds:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300 font-light">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>Customer-facing business & brand applications</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>E-commerce & mobile store platforms</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>SaaS companion mobile applications</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>Booking, scheduling & appointment tools</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>Two-sided marketplace platforms</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>Educational & e-learning applications</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>Healthcare & wellness platforms</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>Field-service & internal workforce dashboards</li>
                  </ul>
                </div>
                <p className="pt-2">
                  By treating every build as a long-term digital asset, we ensure your mobile app delivers exceptional 120 FPS visual fluidity, bulletproof security for authentication and payments, and smooth compatibility across all device form factors.
                </p>
              </div>
           </div>
        </div>
      </section>

      {/* Mobile Application Categories Hierarchy Showcase */}
      <MobileAppCategoriesShowcase />

      {/* Mobile Application Roles Matrix Breakdown */}
      <AppDevelopmentTeamRoles />

      {/* Mobile Application Financial Framework Pricing */}
      <AppDevelopmentPricing />

      {/* Our Mobile App Development Services */}
      <section className="py-32 border-t border-white/5 bg-black/40" id="mobile-development-services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center max-w-4xl mx-auto">
            <span className="text-xs font-mono text-blue-500 mb-6 uppercase tracking-[0.5em] font-bold block">[ SERVICE_MATRIX ]</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-white tracking-tight leading-tight mb-8">
              Our Mobile App <br />
              <span className="font-serif italic text-blue-400">Development Services</span>
            </h2>
            <p className="text-lg text-slate-300 font-light leading-relaxed font-sans">
              We provide end-to-end mobile engineering services configured for early-stage startups and expanding enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Cross-Platform Flutter Development",
                tagline: "cross-platform mobile app development",
                desc: "Our primary choice for multi-platform delivery is cross-platform mobile app development powered by Flutter. Flutter compiles directly to native ARM machine code, bypassing JavaScript bridges or web view wrappers. This delivers authentic 120 FPS UI performance, uniform pixel rendering across iOS and Android, and a single maintainable Dart codebase that reduces development and maintenance overhead by up to 40%."
              },
              {
                title: "Native iOS & Android Engineering",
                tagline: "native engineering protocols",
                desc: "When your product requires platform-exclusive features — such as Apple Swift 6 concurrency, SwiftUI custom animations, Android Jetpack Compose MVI architectures, or deep hardware access (Bluetooth LE, ARKit, Core ML, background push workers) — we build dedicated native applications that utilize 100% of the platform's native CPU and GPU capabilities."
              },
              {
                title: "React Native Mobile Solutions",
                tagline: "mobile app development with react native",
                desc: "For organizations with established React web engineering teams or shared JavaScript/TypeScript infrastructure, mobile app development with React Native provides seamless code reuse across web and mobile viewports. We build React Native apps with native C++ modules, Hermes engine optimizations, and strict static typing via TypeScript."
              },
              {
                title: "Product Discovery & Mobile UI/UX",
                tagline: "user-first mobile product strategy",
                desc: "Great mobile apps begin with thorough product planning. We conduct user research, create interactive Figma wireframes, map out touch ergonomics, and establish gesture-driven interface layouts adhering to Apple Human Interface Guidelines and Google Material Design 3."
              },
              {
                title: "Backend, API & Database Sync",
                tagline: "scalable serverless & cloud backends",
                desc: "We build secure RESTful JSON, GraphQL, and gRPC endpoints to power your mobile frontend. We implement OAuth2/JWT token authentication, SSL certificate pinning, push notification hubs (Firebase FCM), multi-currency payment gateways (Stripe/Apple Pay/Google Pay), and offline-first database synchronization."
              },
              {
                title: "App Store Publishing & Maintenance SLAs",
                tagline: "continuous app store lifecycle support",
                desc: "We handle 100% of the submission process for the Apple App Store and Google Play Store, managing metadata, TestFlight distribution, and privacy safety disclosures. Following launch, we provide ongoing SLAs for 24/7 crash monitoring, OS compatibility updates, and feature enhancements."
              }
            ].map((srv, idx) => (
              <div key={idx} className="bg-white/[0.01] border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/[0.03] hover:border-blue-500/20 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] pointer-events-none" />
                <div>
                  <div className="text-xs font-mono text-blue-500 uppercase tracking-widest mb-4">// 0{idx+1} {srv.tagline}</div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-4">{srv.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400 font-light font-sans">{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-32 border-t border-white/5" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-16">
            <Layers className="text-blue-500" width={24} />
            <span className="text-xs font-bold tracking-[0.3em] text-neutral-500 uppercase">Core Mobile Protocols // Custom Solutions</span>
          </div>

          <div className="flex flex-col lg:flex-row h-auto lg:h-[650px] gap-2">
            {capabilities.map((item) => (
              <div 
                key={item.id}
                className="group relative flex-accordion flex-1 hover:flex-[2.5] bg-neutral-900/50 border border-white/10 overflow-hidden cursor-pointer transition-all duration-700"
              >
                <div className={`absolute inset-0 bg-gradient-to-b from-${item.accent}-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Default State */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end transition-opacity duration-300 group-hover:opacity-0">
                  <span className="text-5xl font-black text-white/5 absolute top-8 right-8">{item.id}</span>
                  <div className="text-blue-500 mb-6">{React.cloneElement(item.icon as React.ReactElement<any>, { size: 32 })}</div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tighter rotate-0 lg:-rotate-90 lg:origin-bottom-left lg:translate-x-16 lg:translate-y-[-1rem] whitespace-nowrap transition-transform duration-500">
                    {item.title}
                  </h3>
                </div>

                {/* Expanded State */}
                <div className="absolute inset-0 p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex flex-col justify-center">
                  <div className="text-blue-400 mb-6">{React.cloneElement(item.icon as React.ReactElement<any>, { size: 48 })}</div>
                  <h3 className="text-3xl font-bold text-white uppercase tracking-tighter mb-6">{item.title}</h3>
                  <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                    {item.content}
                  </p>
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest group/btn border-b border-transparent hover:border-blue-500 w-fit transition-all pb-1">
                    Deploy Solution Protocol
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Development Industry-Focused Solutions for Every Sector */}
      <section className="py-32 lg:py-48 bg-black relative z-10 px-6 border-t border-b border-white/5" id="mobile-industry-solutions">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center max-w-4xl mx-auto animate-enter">
            <span className="text-xs font-mono text-blue-500 mb-6 uppercase tracking-[0.5em] font-bold block">[ MOBILE_VERTICALS ]</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-white tracking-tight leading-tight mb-8">
              Mobile App Development — <br />
              <span className="font-serif italic text-blue-400">Industry-Focused Solutions for Every Sector</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed font-sans">
              At AbuQitmirLabs, we build mobile applications that solve real business problems—not generic apps that look good in a demo but fail in production. Our process begins with understanding your industry's unique workflows, user expectations, and operational challenges before we write a single line of code. Whether you need a cross-platform Flutter solution or a native iOS/Android application, we design systems that fit your business, not the other way around.
            </p>
          </div>

          {/* Grid of Sectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Non-Profit Organizations",
                icon: <Heart className="w-8 h-8 text-rose-400" />,
                tagline: "Mobile App Development for Non-Profit Organizations",
                description: "Non-profits need mobile solutions that amplify their mission without draining their limited resources. We build apps that streamline donation processing, volunteer coordination, and impact tracking—all while maintaining the highest standards of security and accessibility. From one-touch giving to real-time program updates, our mobile app development for non-profit solutions help you connect with supporters wherever they are."
              },
              {
                title: "Logistics",
                icon: <Truck className="w-8 h-8 text-amber-400" />,
                tagline: "Mobile App Development for Logistics",
                description: "In logistics, mobile apps are the backbone of operations. From real-time shipment tracking to driver communication and route optimization, your mobile app needs to perform flawlessly in the field. Our mobile app development for logistics solutions provide offline-capable, GPS-integrated platforms that keep your supply chain moving. Whether you manage last-mile deliveries or international freight, we build mobile tools that keep your team connected and your customers informed."
              },
              {
                title: "Real Estate",
                icon: <Home className="w-8 h-8 text-sky-400" />,
                tagline: "Mobile App Development for Real Estate",
                description: "Real estate professionals need mobile apps that handle complex property searches, schedule viewings, and manage client relationships on the go. Our mobile app development for real estate solutions deliver immersive property browsing experiences with advanced search filters, interactive maps, and instant notifications—helping agents close deals from anywhere."
              },
              {
                title: "Healthcare",
                icon: <HeartPulse className="w-8 h-8 text-emerald-400" />,
                tagline: "Healthcare Mobile App Development",
                description: "Patient-facing apps, appointment scheduling, and clinical support tools built with the data handling discipline that healthcare mobile app development demands — designed alongside our broader custom software development practice for healthcare clients."
              },
              {
                title: "Small Law Firms",
                icon: <Scale className="w-8 h-8 text-indigo-400" />,
                tagline: "Mobile App Development for Small Law Firms",
                description: "Small law firms need mobile tools that help them manage cases, communicate with clients, and access documents securely from anywhere. Our mobile app development for small law firms solutions deliver secure client portals, document management, time tracking, and billing features that keep your practice running smoothly—wherever you are."
              },
              {
                title: "Corporate Events",
                icon: <Calendar className="w-8 h-8 text-purple-400" />,
                tagline: "Mobile App Development for Corporate Events",
                description: "Corporate events demand mobile apps that engage attendees, streamline logistics, and deliver real-time information. Our mobile app development for corporate events solutions provide interactive agendas, networking features, live polling, and push notifications that keep participants informed and connected throughout the event experience."
              },
              {
                title: "Educational Institutions",
                icon: <GraduationCap className="w-8 h-8 text-blue-400" />,
                tagline: "Mobile App Development for Educational Institutions",
                description: "Educational institutions need mobile platforms that connect students, teachers, and parents across multiple touchpoints. Our mobile app development for educational institutions solutions deliver learning management systems, attendance tracking, assignment submission, and communication tools that support both in-person and remote learning environments."
              },
              {
                title: "Enterprise Systems",
                icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
                tagline: "Enterprise Mobile App Development",
                description: "Internal tools, field service apps, and workforce management platforms built for organizations where reliability and security matter as much as user experience. As an enterprise mobile app development company, we design with device management, offline functionality, and integration into existing enterprise systems as core requirements, not add-ons."
              },
              {
                title: "Android Ecosystems",
                icon: <Smartphone className="w-8 h-8 text-amber-500" />,
                tagline: "Android-Specific Development",
                description: "For products where Android is the primary or exclusive target platform, our team also works as a dedicated Android mobile app development company, optimizing specifically for the fragmentation and hardware diversity of the Android ecosystem."
              }
            ].map((sector, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.01] border border-white/10 p-8 rounded-[2rem] hover:bg-white/[0.04] transition-all relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] pointer-events-none" />
                <div>
                  <div className="mb-6 w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                    {sector.icon}
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2">{sector.title}</h3>
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-4">
                    {sector.tagline}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-400 font-light font-sans">{sector.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Development Across Global Markets */}
      <section className="py-32 lg:py-48 bg-white/[0.01] border-b border-white/5 relative z-10 px-6" id="mobile-global-markets">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-mono text-blue-500 mb-6 uppercase tracking-[0.5em] font-bold block">[ GLOBAL_MOBILE_REACH ]</span>
              <h2 className="text-4xl md:text-6xl font-serif font-light text-white tracking-tight leading-tight mb-8">
                Mobile App Development <br />
                <span className="font-serif italic text-blue-400">Across Global Markets</span>
              </h2>
              <div className="mb-10">
                <h3 className="text-xl font-bold text-[#ccff00] uppercase mb-4 tracking-wider">Where We Work</h3>
                <p className="text-base text-slate-300 font-light leading-relaxed font-sans">
                  AbuQitmirLabs is proud to be recognized among the <strong>best mobile app development companies in Pakistan</strong>, with deep, first-hand experience building for the Pakistani market. Alongside this, we support <strong>mobile app development for international clients</strong>, including businesses across the United States, the United Kingdom, and Europe — adapting our approach to each market's specific user expectations and app store requirements.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    market: "United States",
                    text: "Mobile app development in the United States for businesses that require high-performance, high-security, and premium design to compete in one of the world's most competitive digital landscapes."
                  },
                  {
                    market: "United Kingdom",
                    text: "Mobile app development in the United Kingdom aligned with UK data protection standards and user expectations, ensuring your brand resonates with British audiences."
                  },
                  {
                    market: "Canada",
                    text: "Mobile app development in Canada that reflects the country's bilingual and multicultural landscape, with compliance to Canadian accessibility standards."
                  },
                  {
                    market: "Australia",
                    text: "Mobile app development in Australia for businesses ready to dominate the Australian market with fast, scalable, and user-friendly platforms."
                  },
                  {
                    market: "Poland",
                    text: "Mobile app development in Poland that bridges the gap between global standards and local market needs, helping Polish businesses expand their digital footprint."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border-l border-white/10 pl-6 py-2">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">{item.market}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-[3rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] pointer-events-none" />
              <span className="text-xs font-mono text-[#ccff00] mb-6 uppercase tracking-[0.5em] font-bold block">[ WHY_ABUQITMIRLABS ]</span>
              <h3 className="text-3xl font-serif font-light text-white leading-tight mb-6">
                Why Partner with <span className="font-serif italic text-blue-400">AbuQitmirLabs?</span>
              </h3>
              <p className="text-base text-slate-300 leading-relaxed font-light mb-8 font-sans">
                Our team in Karachi, Pakistan, combines global-grade technical expertise with cost-effective delivery. We serve clients across the United States, United Kingdom, Canada, Poland, and Australia—building mobile applications that are secure, scalable, and fully owned by you. Whether you need a cross-platform Flutter solution, a native iOS app in Swift, or a native Android app in Kotlin, we deliver high-performance mobile experiences that users love.
              </p>
              
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Activity className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-sans">Let's build your mobile advantage.</h4>
                  <p className="text-xs text-slate-400 font-sans">Bespoke engineering from Karachi, Pakistan to the global stores.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-32 border-t border-white/5 bg-black/20" id="tech-stack">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
             <span className="text-xs font-mono text-neutral-500 mb-4 uppercase tracking-[0.3em] font-bold block">[ MOBILE_ENGINEERING_STACK ]</span>
             <h2 className="text-3xl font-bold text-white uppercase tracking-tight mb-4">Mobile Application Engineering Stack & Toolset</h2>
             <p className="text-base text-slate-300 font-light leading-relaxed max-w-4xl font-sans">
               We select technologies based on your specific platform priorities and long-term scalability. Flutter provides an ideal single codebase solution for rapid multi-platform delivery, while React Native integrates seamlessly with existing React web ecosystems. Native Swift 6 and Kotlin deliver uncompromised hardware access for GPU-heavy or device-specific applications, backed by secure Node.js APIs and local SQLite/Realm cache layers.
             </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: "Frameworks & SDKs", items: ["Flutter Cross-Platform", "SwiftUI (iOS Native)", "Jetpack Compose (Android)"], icon: <Smartphone />, color: "blue" },
              { category: "State Management", items: ["Riverpod / Bloc", "Redux Toolkit", "Provider Architecture"], icon: <Zap />, color: "indigo" },
              { category: "Local Database", items: ["SQLite Storage", "Realm Cache Database", "Hive Key-Value"], icon: <Database />, color: "sky" },
              { category: "Backend & Gateway", items: ["Node.js API Middleware", "GraphQL Systems", "Stripe Checkout SDK"], icon: <Server />, color: "violet" }
            ].map((stack, idx) => (
              <div key={idx} className="group h-[380px] [perspective:1000px] cursor-pointer">
                <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 bg-neutral-900 border border-white/10 rounded-xl p-8 flex flex-col justify-between [backface-visibility:hidden]">
                    <div className={`text-${stack.color}-500 opacity-60`}>
                      {React.cloneElement(stack.icon as React.ReactElement<any>, { size: 40 })}
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Protocol 0{idx + 1}</div>
                      <h3 className="text-2xl font-bold text-white uppercase leading-tight">{stack.category}</h3>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 bg-black border border-blue-500/30 rounded-xl p-8 flex flex-col justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <ul className="space-y-4">
                      {stack.items.map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm text-neutral-200 font-bold uppercase tracking-tight">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Process / Lifecycle */}
      <section id="development-process" className="py-32 px-6 relative overflow-hidden bg-black/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-mono text-blue-500 mb-4 uppercase tracking-[0.3em] font-bold block">[ ENGINEERING_LIFECYCLE: MOBILE ]</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight mb-8">Our Mobile App Development Lifecycle</h2>
              <p className="max-w-3xl mx-auto text-lg text-neutral-400 font-light leading-relaxed">
                We bridge the gap between Figma designs and high-performance native code through a structured 5-step lifecycle pipeline designed for velocity and reliability.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative justify-center">
             {/* Background Line */}
             <div className="absolute top-12 left-0 right-0 h-[1px] bg-white/10 hidden md:block" />
             
             {[
               { title: "Discovery", desc: "Defining user personas, feature priorities, API dependencies, native vs cross-platform choices, and security compliance parameters.", icon: <SearchCode /> },
               { title: "Architecture", desc: "Selecting state management patterns, designing offline database sync layers, and establishing secure API communication protocols.", icon: <Layers /> },
               { title: "Design & Prototyping", desc: "Designing touch-first mobile interfaces, ergonomic gestures, and interactive prototypes following Apple and Material guidelines.", icon: <Terminal /> },
               { title: "Development & Testing", desc: "Building feature sets in 2-week sprints with CI/CD pipelines, unit testing, and memory leak profiling across real hardware.", icon: <Code2 /> },
               { title: "Launch & Post-Support", desc: "Managing Apple App Store and Google Play deployments, TestFlight distribution, live publication, and continuous SLA maintenance.", icon: <ShieldCheck /> }
             ].map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative z-10 p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col items-center text-center group hover:bg-blue-500/5 hover:border-blue-500/20 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                    {React.cloneElement(step.icon as React.ReactElement<any>, { size: 20 })}
                  </div>
                  <h3 className="text-white font-bold uppercase tracking-tight mb-3 italic">Step 0{idx + 1}: {step.title}</h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">{step.desc}</p>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Case Study Showcase */}
      <section id="work-action" className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-xs font-mono text-neutral-500 mb-4 uppercase tracking-[0.3em] font-bold block">[ PROJECT_SHOWCASE: SYSTEM_DEMOS ]</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight mb-8">
              See Our Technology in Action: <br />
              <span className="text-neutral-500">Real Work, Real Performance Metrics</span>
            </h2>
            <p className="max-w-3xl text-xl text-neutral-400 font-light leading-relaxed">
              We design and construct top-tier digital ecosystems. Watch our architectural sessions to understand our technical capabilities, or <Link to="/case-studies/tajweedpage" className="text-blue-400 hover:underline font-medium">view our mobile app case study</Link> to see how we engineered a zero-lag mobile rendering experience, or browse all <Link to="/case-studies" className="text-blue-400 hover:underline font-medium">Case Studies</Link>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Sub-Second Rendering Execution",
                desc: "Live rendering benchmarks of our highly optimized Flutter and native UI viewport layouts.",
                videoId: "X9xyYiT79Cc"
              },
              {
                title: "High-Fidelity Haptic Feedback Engineering",
                desc: "Designing extremely detailed response loops and native mobile micro-interactions.",
                videoId: "KowPMteJA-E"
              },
              {
                title: "Enterprise Cloud Database Sync",
                desc: "Architecting zero-data-loss offline storage engines with automated server replication.",
                videoId: "Sh9SqMCx9I4"
              },
              {
                title: "120 FPS Fluid Graphics & Animation Layouts",
                desc: "Continuous performance audits showcasing zero-lag interface transitions.",
                videoId: "cN8lzhA0m_Q"
              },
              {
                title: "Cross-Platform Thread Optimization Deep Dive",
                desc: "Leveraging platform-specific parallel background tasks for absolute client performance.",
                videoId: "qMoX-e4Qm0c"
              },
              {
                title: "High-Performance Mobile & Web Engineering Architecture",
                desc: "Detailed discussion on native compilation, memory maps, and API caching structures.",
                videoId: "B31EXmt5LrQ"
              }
            ].map((video, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col items-center text-center bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all p-4 shadow-2xl"
              >
                <div className="aspect-video relative w-full rounded-2xl overflow-hidden bg-black mb-6 border border-white/10">
                  <YouTubeFacade videoId={video.videoId} title={video.title} />
                </div>
                <div className="px-4 pb-2">
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{video.title}</h3>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed mb-4">{video.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 relative border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-[150px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-7xl md:text-[8rem] font-bold text-white tracking-tighter mb-12 uppercase leading-[0.85]">
            Ready to <span className="text-neutral-600">Architect</span> <br />
            Your Mobile App?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="h-16 px-12 rounded-full text-base font-bold bg-white text-black hover:bg-neutral-200 transition-transform hover:scale-105 flex items-center justify-center uppercase tracking-tight"
            >
               Request a Free App Audit
            </a>
            <div className="text-neutral-500 font-mono text-[11px] uppercase tracking-[0.2em] text-left border-l border-white/10 pl-6 h-12 flex items-center">
               Avg. Wireframing: 10 Days <br />
               Current Lead Time: 4 Weeks
            </div>
          </div>
        </div>
      </section>

      {/* Tips & Hiring Consultation */}
      <section className="py-32 border-t border-white/5 bg-black/40 relative overflow-hidden" id="mobile-tips-hiring">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            
            {/* Tips we actually follow */}
            <div className="bg-white/[0.01] border border-white/10 p-10 md:p-12 rounded-[2.5rem] brutalist-shadow relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl pointer-events-none" />
              <div>
                <span className="text-xs font-mono text-blue-500 uppercase tracking-widest block mb-4 font-black">// ENGINEERING INSIGHTS</span>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-white uppercase mb-6 leading-tight">
                  Mobile App Development <br />Tips We Actually Follow
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-slate-300 font-light font-sans mb-6">
                  A few <strong>mobile app development tips</strong> that consistently separate apps that succeed from apps that get abandoned: design for offline states from day one rather than assuming constant connectivity; keep onboarding under 30 seconds; and test on the oldest supported devices in your target market. Read our guide on <Link to="/blog/how-to-choose-mobile-app-development-company-2026" className="text-blue-400 hover:underline font-medium">how to choose a mobile app development company in 2026</Link> or browse our <Link to="/blog" className="text-blue-400 hover:underline font-medium">technical blog</Link> for deeper insights.
                </p>
                <p className="text-sm md:text-base leading-relaxed text-slate-400 font-light font-sans">
                  The right <strong>mobile app development tools</strong> — proper CI/CD pipelines, crash reporting, and analytics — matter just as much as the code itself for catching problems before users do. Ready to scope your app? <Link to="/contact" className="text-blue-400 hover:underline font-medium">Contact our engineering team</Link> today.
                </p>
              </div>
            </div>

            {/* Looking to hire developers */}
            <div className="bg-white/[0.01] border border-white/10 p-10 md:p-12 rounded-[2.5rem] brutalist-shadow flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#ccff00] uppercase tracking-widest block mb-4 font-black">// PARTNERSHIP INQUIRY</span>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-white uppercase mb-6 leading-tight">
                  Looking to Hire <br />Mobile App Developers?
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-slate-300 font-light font-sans mb-8">
                  Whether you need to <strong>hire mobile app developers</strong> for a single project or an ongoing product partnership, the right starting point is a clear conversation about your platform priorities, timeline, and budget — before any technology decisions get locked in.
                </p>
              </div>
              <div className="flex gap-4 items-center border-t border-white/10 pt-6">
                <a 
                  href="https://wa.me/923233260859?text=Hello,%20I'm%20looking%20to%20hire%20mobile%20app%20developers."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xs uppercase tracking-wider font-bold transition-colors"
                >
                  Hire Developers
                </a>
                <span className="text-xs font-mono text-zinc-500 uppercase">Consultation is 100% free of charge.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-neutral-500 mb-4 uppercase tracking-[0.3em] block">[ OPERATIONAL_INQUIRIES: MOBILE_LIFECYCLE ]</span>
            <h2 className="text-4xl font-bold text-white uppercase tracking-tight">Frequently Asked Questions About Mobile App Development</h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 border border-white/5 rounded-xl hover:border-blue-500/30 transition-colors"
              >
                <button 
                  id={`faq-btn-${idx}`}
                  className="flex items-center justify-between w-full p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  aria-expanded={activeFaq === idx}
                  aria-controls={`faq-panel-${idx}`}
                >
                  <h3 className="text-lg font-bold text-neutral-200 uppercase tracking-tight">{faq.q}</h3>
                  <div className={`transition-transform duration-500 ${activeFaq === idx ? 'rotate-45 text-blue-400' : 'text-neutral-500'}`} aria-hidden="true">
                    <Plus width={24} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      id={`faq-panel-${idx}`}
                      role="region"
                      aria-labelledby={`faq-btn-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="p-6 pt-0 text-neutral-400 text-lg font-light leading-relaxed">
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

      {/* Related Systems linking */}
      <section className="py-24 bg-[#050505] border-t border-white/5 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-mono text-neutral-500 mb-2 uppercase tracking-[0.4em] font-bold block">[ RELATED_SYSTEMS ]</span>
            <p className="text-sm font-sans font-light text-slate-400">
              Explore our related services: <Link to="/custom-software" className="text-white underline hover:text-blue-400">Custom Software Development</Link> · <Link to="/ai-agent-development" className="text-white underline hover:text-blue-400">AI Agent Development</Link> · <Link to="/web-development" className="text-white underline hover:text-blue-400">Web Development</Link>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Custom Software", path: "/custom-software", icon: <Code2 className="w-5 h-5" /> },
              { title: "Web Engineering", path: "/web-development", icon: <Globe className="w-5 h-5" /> },
              { title: "AI Agents", path: "/ai-agent-development", icon: <Cpu className="w-5 h-5" /> },
              { title: "SEO Strategy", path: "/seo-mastery", icon: <Star className="w-5 h-5" /> }
            ].map((link, i) => (
              <Link 
                key={i} 
                to={link.path} 
                className="group flex items-center justify-between p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="text-blue-500 bg-blue-500/10 p-3 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-all">
                    {link.icon}
                  </div>
                  <span className="font-bold uppercase tracking-tight text-white">{link.title}</span>
                </div>
                <ArrowUpRight className="text-neutral-600 group-hover:text-white transition-colors" size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default MobileAppDevelopmentPage;

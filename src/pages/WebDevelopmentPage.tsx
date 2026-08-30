"use client";

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { YouTubeFacade } from '../components/ui/youtube-facade';
import { 
  Globe, 
  Zap, 
  ShieldCheck, 
  ShoppingCart, 
  Briefcase, 
  Smartphone, 
  RefreshCw, 
  ArrowRight,
  ArrowUpRight,
  Plus,
  Monitor,
  Terminal,
  Database,
  Cloud,
  Layers,
  Rocket,
  Star,
  Cpu,
  Code2,
  Lock,
  Layout,
  MessageSquare,
  FileText,
  Check,
  Download,
  ExternalLink
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import WebDevelopmentPricing from '../components/WebDevelopmentPricing';
import WebUpsellsPricing from '../components/WebUpsellsPricing';
import WebHostingPricing from '../components/WebHostingPricing';
import WebMaintenancePricing from '../components/WebMaintenancePricing';
import CustomWebAppsPricing from '../components/CustomWebAppsPricing';
import WebCustomCTA from '../components/WebCustomCTA';
import { AnimatedDownload } from '../components/AnimatedDownload';

const WebDevelopmentPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Website Contract State variables
  const [contractFormData, setContractFormData] = useState({ name: '', email: '', phone: '' });
  const [contractSubmitted, setContractSubmitted] = useState(false);
  const [contractDownloading, setContractDownloading] = useState(false);
  const [contractCompleted, setContractCompleted] = useState(false);

  const handleContractInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContractFormData(prev => ({ ...prev, [name]: value }));
  };

  const triggerContractDownload = () => {
    const contractContent = `===========================================================
ABUQITMIR LABS — PROFESSIONAL WEB DEVELOPMENT AGREEMENT
===========================================================
[FREE TEMPLATE COPY — OWNERSHIP PROTECTED BLUEPRINT]

This agreement is entered into as of today, between the CLIENT and the DEVELOPER.

1. INTELLECTUAL PROPERTY & OWNERSHIP
-----------------------------------
Upon full payment of the project fees, all intellectual property, source files, asset keys, code modules, databases, search optimization indices, and systems developed for this project transfer 100% and completely to the CLIENT. 
The DEVELOPER retains NO passive claim, licensing barriers, or structural restrictions.

2. HOSTING & DOMAIN ROOT OWNERSHIP
----------------------------------
All registration accounts, including domains (DNS controls) and cloud runtime ecosystems (e.g. AWS, Vercel, Supabase, Cloudflare, GitHub repositories, or GCP), shall be registered strictly under the CLIENT'S legal name and credentials. 
The DEVELOPER shall act solely as authorized technical support, never as absolute proprietary gatekeepers.

3. POST-LAUNCH TECHNICAL WARRANTY
--------------------------------
The DEVELOPER warrants a structured 30-day "Intense Support Block" beginning immediately upon site launch, covering:
- Absolute package dependency stabilization
- Server runtime anomaly fixes
- Critical broken-link checks
- Content management interface adjustments

4. SPECIFIED PRODUCT STACK DISCLOSURE
-------------------------------------
The technology stack used to execute this digital platform consists of:
- Full-Stack React Engine [Vite / Next.js Framework]
- Styling Layout System: Tailwind CSS
- State-Engine & Interactive Animation: Framer Motion / GSAP
- Serverless Cloud Persistence Engine: Google Cloud Platform / Firebase

5. PROGRESS TERMINATION & EXIT TERMS
-----------------------------------
If for any reason the CLIENT wishes to cancel development progress, they may issue an unconditional exit order. All work-in-progress materials developed up to that milestone shall be compiled and delivered instantly, billed on a prorated basis matching the tier output.

===========================================================
AbuQitmirLabs.tech — We build platforms that command authority. 
Do not sign a website contract without these protective legal terms.
===========================================================`;

    const blob = new Blob([contractContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AbuQitmirLabs_Ownership_Protected_Contract_Template.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleContractSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractFormData.name || !contractFormData.email) return;
    setContractDownloading(true);
    setContractSubmitted(true);
  };

  const onContractDownloadFinished = () => {
    setContractDownloading(false);
    setContractCompleted(true);
    triggerContractDownload();
  };

  const capabilities = [
    {
      id: "01",
      title: "Headless E-Commerce Solutions",
      content: "Take total control of your customer’s shopping experience. We build headless commerce platforms that separate your frontend storefront from your backend inventory system (like Shopify or BigCommerce). This allows for lightning-fast product pages, ultra-customized checkout flows, and seamless omnichannel selling.",
      icon: <ShoppingCart />,
      accent: "blue"
    },
    {
      id: "02",
      title: "Corporate & B2B Web Portals",
      content: "Your website is your digital headquarters. We develop robust corporate websites that serve as powerful lead-generation engines. By integrating semantic SEO structures directly into the code and ensuring frictionless UI/UX, we position your brand as the undisputed authority in your industry.",
      icon: <Briefcase />,
      accent: "indigo"
    },
    {
      id: "03",
      title: "Progressive Web Apps (PWAs)",
      content: "Give your users an app-like experience directly in their browser. We build PWAs that offer offline capabilities, push notifications, and hardware integration without forcing the user to visit an app store. It is the perfect bridge between a website and a native mobile app.",
      icon: <Monitor />,
      accent: "sky"
    },
    {
      id: "04",
      title: "Seamless CMS Migration Services",
      content: "Trapped in an outdated CMS? We provide zero-downtime migration services. We seamlessly transfer your existing content, SEO metadata, and user databases to a modern Headless CMS (like Sanity or Contentful), empowering your marketing team to publish faster while keeping the frontend blazing fast.",
      icon: <RefreshCw />,
      accent: "violet"
    }
  ];

  const faqData = [
    {
      q: "What does a web development company do?",
      a: "A web development company designs, builds, tests, and maintains custom websites and web applications tailored to specific business goals. This encompasses frontend user interface engineering, backend API and database architecture, e-commerce systems, headless CMS integrations, security hardening, Core Web Vitals performance optimization, and ongoing technical maintenance."
    },
    {
      q: "How much does custom web development cost?",
      a: "The cost of custom web development depends on project scope, functional requirements, integrations, and performance standards. At AbuQitmirLabs, we provide transparent milestone-based pricing ranging from foundational custom business websites up to complex full-stack web applications and enterprise platforms."
    },
    {
      q: "How long does it take to build a website?",
      a: "A standard custom business website typically takes 3 to 5 weeks from discovery to launch. Complex full-stack web applications, headless e-commerce builds, custom portals, or platforms requiring deep third-party API integrations generally take 6 to 12 weeks depending on technical scope."
    },
    {
      q: "What is custom web development?",
      a: "Custom web development is the engineering of bespoke websites and web applications built specifically around your business logic, workflow requirements, and brand identity without relying on pre-built templates or bloated page builders. It delivers sub-second page loads, clean semantic HTML, custom security controls, and full source code ownership."
    },
    {
      q: "What is the difference between web design and web development?",
      a: "Web design focuses on visual aesthetics, UI layout, typography, branding, and user experience (UX) wireframes. Web development converts those visual concepts into functional, interactive, and secure software using modern frameworks like React, Next.js, TypeScript, backend APIs, and databases."
    },
    {
      q: "Is Next.js good for business websites?",
      a: "Yes, Next.js is one of the premier React frameworks for modern business websites and web applications. It delivers sub-second page loads through static site generation (SSG) and server-side rendering (SSR), superior Google SEO indexability, enhanced security, and seamless edge scalability."
    },
    {
      q: "Can you build custom web applications?",
      a: "Yes, AbuQitmirLabs specializes in custom web application development, including full-stack SaaS products, interactive client portals, custom booking engines, e-commerce platforms, and internal enterprise dashboards engineered specifically around your business operations."
    },
    {
      q: "Will my website be responsive on mobile devices?",
      a: "Yes, all web development projects at AbuQitmirLabs follow a mobile-first responsive design strategy, ensuring flawless visual layout, fast touch interactions, and optimal readability across smartphones, tablets, laptops, and desktop displays."
    }
  ];

  return (
    <div className="bg-[#050505] text-axiom-sub font-body antialiased overflow-x-hidden min-h-screen relative selection:bg-blue-500/30 selection:text-white">
      <Helmet>
        <title>Web Development Company | Custom Web Solutions | AbuQitmirLabs</title>
        <meta name="description" content="AbuQitmirLabs provides custom web development for startups and businesses, building fast, secure, responsive websites and scalable web applications." />
        <meta name="keywords" content="web development, web development company, web development services, custom web development, custom web development company, web application development, full-stack web development, React web development, Next.js development, custom website development, professional web development services" />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/web-development" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Web Development Company | Custom Web Solutions | AbuQitmirLabs" />
        <meta property="og:description" content="AbuQitmirLabs provides custom web development for startups and businesses, building fast, secure, responsive websites and scalable web applications." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/web-development" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Development Company | Custom Web Solutions | AbuQitmirLabs" />
        <meta name="twitter:description" content="AbuQitmirLabs provides custom web development for startups and businesses, building fast, secure, responsive websites and scalable web applications." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Unified JSON-LD Structured Data Schema (@graph) */}
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
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.abuqitmirlabs.tech/logo.png"
                  },
                  "image": "https://www.abuqitmirlabs.tech/logo.png",
                  "email": "hello@abuqitmirlabs.tech",
                  "telephone": "+923233260859",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Karachi",
                    "addressRegion": "Sindh",
                    "addressCountry": "PK"
                  }
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
                  "@id": "https://www.abuqitmirlabs.tech/web-development/#webpage",
                  "url": "https://www.abuqitmirlabs.tech/web-development",
                  "name": "Web Development Company | Custom Web Solutions | AbuQitmirLabs",
                  "description": "AbuQitmirLabs provides custom web development for startups and businesses, building fast, secure, responsive websites and scalable web applications.",
                  "isPartOf": {
                    "@id": "https://www.abuqitmirlabs.tech/#website"
                  },
                  "breadcrumb": {
                    "@id": "https://www.abuqitmirlabs.tech/web-development/#breadcrumb"
                  },
                  "inLanguage": "en-US"
                },
                {
                  "@type": "Service",
                  "@id": "https://www.abuqitmirlabs.tech/web-development/#service",
                  "serviceType": "Web Development",
                  "name": "Custom Web Development Services",
                  "provider": {
                    "@id": "https://www.abuqitmirlabs.tech/#organization"
                  },
                  "description": "AbuQitmirLabs provides custom web development for startups and businesses, building fast, secure, responsive websites and scalable web applications.",
                  "url": "https://www.abuqitmirlabs.tech/web-development",
                  "areaServed": ["US", "UK", "CA", "AU", "PL", "PK"],
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Web Development Capabilities",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Custom Website Development"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Web Application Development"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "React & Next.js Development"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Headless CMS & E-commerce"
                        }
                      }
                    ]
                  }
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://www.abuqitmirlabs.tech/web-development/#faq",
                  "isPartOf": {
                    "@id": "https://www.abuqitmirlabs.tech/web-development/#webpage"
                  },
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
                  "@id": "https://www.abuqitmirlabs.tech/web-development/#howto",
                  "name": "Our Web Development Process",
                  "description": "A 5-step engineering pipeline optimized for speed and SEO to build high-performance web platforms.",
                  "step": [
                    {
                      "@type": "HowToStep",
                      "name": "Audit & Specs",
                      "text": "Technical analysis of current assets and goal setting."
                    },
                    {
                      "@type": "HowToStep",
                      "name": "Page UX Architecture",
                      "text": "Mapping user flows for sub-second navigation."
                    },
                    {
                      "@type": "HowToStep",
                      "name": "Jamstack Build",
                      "text": "Engineering the frontend with Next.js and Tailwind."
                    },
                    {
                      "@type": "HowToStep",
                      "name": "CMS Sync",
                      "text": "Connecting secure headless content management."
                    },
                    {
                      "@type": "HowToStep",
                      "name": "Edge Deploy",
                      "text": "Global distribution via Vercel Edge networks."
                    }
                  ]
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.abuqitmirlabs.tech/web-development/#breadcrumb",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://www.abuqitmirlabs.tech/"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Web Development",
                      "item": "https://www.abuqitmirlabs.tech/web-development"
                    }
                  ]
                }
              ]
            })
          }}
        ></script>
      </Helmet>

      <Header />
      <Breadcrumbs customItems={[{ name: 'Home', to: '/' }, { name: 'Web Development', to: '/web-development' }]} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-24 md:pt-32 pb-20 px-6 z-10 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/10 rounded-[100%] blur-[120px] pointer-events-none" />
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
            Performance Engineering Protocol
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl lg:text-[6.5rem] font-medium tracking-tight text-white text-center mb-8 leading-[1.1] max-w-5xl"
        >
          Web Development Company <br />
          <span className="text-neutral-500">for Growing Businesses</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-neutral-400 text-center max-w-4xl mb-12 leading-relaxed font-light font-sans"
        >
          AbuQitmirLabs is a <strong>web development company</strong> providing <strong>custom web development</strong> and <strong>web development services</strong> for startups and growing businesses. From high-converting corporate sites to complex <strong>web application development</strong>, we build fast, responsive, and SEO-ready platforms using modern frontend and backend architectures (React, Next.js, TypeScript, APIs, and headless CMS). You can pair our web builds with modular <Link to="/custom-software" className="text-blue-400 hover:underline font-medium">Custom Software</Link> engines, expand into native <Link to="/mobile-app-development" className="text-blue-400 hover:underline font-medium">Mobile App Development</Link>, integrate autonomous <Link to="/ai-agent-development" className="text-blue-400 hover:underline font-medium">AI Agents</Link>, or maximize organic growth with our <Link to="/seo-mastery" className="text-blue-400 hover:underline font-medium">SEO Mastery</Link> and <Link to="/local-seo-for-small-business" className="text-blue-400 hover:underline font-medium">Local SEO</Link> strategies. Elevate messaging with targeted <Link to="/content-writing" className="text-blue-400 hover:underline font-medium">Content Writing</Link>, explore client <Link to="/case-studies" className="text-blue-400 hover:underline font-medium">Case Studies</Link> and <Link to="/blog" className="text-blue-400 hover:underline font-medium">Blog</Link>, learn more <Link to="/about" className="text-blue-400 hover:underline font-medium">about us</Link>, or <Link to="/contact" className="text-blue-400 hover:underline font-medium">contact us</Link> today.
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
              "Responsive Website Design & Development",
              "React, Next.js & Vue-Based Web Apps",
              "E-Commerce Builds (Shopify, Custom Storefronts)",
              "Headless CMS Integration",
              "Core Web Vitals & Performance Optimization"
            ].map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-3 group">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 group-hover:bg-[#ccff00] transition-colors duration-300" />
                <span className="text-sm font-sans font-light text-slate-300 tracking-tight leading-relaxed group-hover:text-white transition-colors duration-300">{bullet}</span>
              </div>
            ))}
          </div>

          {/* Official Web Technology Ecosystems - High Quality External Links */}
          <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <span className="text-zinc-500 uppercase tracking-widest font-bold">Authoritative Ecosystems:</span>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors">
              React Docs <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-zinc-700">•</span>
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors">
              Next.js Framework <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-zinc-700">•</span>
            <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors">
              Tailwind CSS <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-zinc-700">•</span>
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors">
              Vercel Edge Platform <ExternalLink className="w-3 h-3" />
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
            className="px-8 py-8 rounded-3xl text-sm font-bold transition-all transform hover:scale-105 flex flex-col items-center justify-center gap-2 group bg-white text-black hover:bg-neutral-200"
          >
            <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            Get a Free Website Audit
          </a>
          <button 
            onClick={() => {
              const el = document.getElementById('work-action');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-8 rounded-3xl border-2 border-white/10 text-sm font-bold transition-all transform hover:scale-105 flex flex-col items-center justify-center gap-2 bg-white/5 text-white hover:bg-white/10 group"
          >
            <Layout className="w-6 h-6 group-hover:scale-110 transition-transform text-[#ccff00]" />
            View Our Web Portfolio
          </button>
          <button 
            onClick={() => {
              const el = document.getElementById('contract-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-8 rounded-3xl border-2 border-[#ccff00]/20 text-sm font-bold transition-all transform hover:scale-105 flex flex-col items-center justify-center gap-2 bg-[#ccff00]/5 text-white hover:bg-[#ccff00]/10 group"
          >
            <FileText className="w-6 h-6 group-hover:scale-110 transition-transform text-[#ccff00]" />
            Free Contract Blueprint
          </button>
        </motion.div>

        {/* Visual Terminal/Dashboard Based on Snippet */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-5xl w-full mx-auto"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-20" />
          <div className="relative rounded-xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              <div className="flex-1 flex justify-center pr-12">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest leading-none">Axiom // Web_Vitals_Monitor</span>
              </div>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Site Analysis</div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                  <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "98%" }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      className="h-full bg-blue-500" 
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-blue-400">
                    <span>Performance</span>
                    <span>98%</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                  <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                      className="h-full bg-indigo-500" 
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-indigo-400">
                    <span>Best Practices</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 p-6 rounded-lg bg-white/5 border border-white/5 relative">
                <div className="flex justify-between items-start mb-6">
                   <div className="text-xs font-medium text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                     Live Engineering Session
                   </div>
                   <div className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded uppercase font-bold">Protocol Active</div>
                </div>
                <p className="font-mono text-xs text-blue-300 leading-loose">
                  $ npx axiom-audit --mode=performance<br />
                  <span className="text-neutral-500">Checking Core Web Vitals... [OK]</span><br />
                  <span className="text-neutral-500">Minifying bundle size... [DONE]</span><br />
                  <span className="text-white font-bold ml-4">LCP: 0.8s | CLS: 0.01 | INP: 24ms</span><br />
                  <span className="text-green-400">$ architecture synchronized with Vercel Edge.</span>
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
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase opacity-40">Next.js &amp; React Engineering</span>
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent uppercase" style={{ WebkitTextStroke: '1px rgba(59, 130, 246, 0.4)' }}>Headless CMS Architecture</span>
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase opacity-40">Edge-Cached Jamstack</span>
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent uppercase" style={{ WebkitTextStroke: '1px rgba(59, 130, 246, 0.4)' }}>Progressive Web Apps</span>
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase opacity-40">Core Web Vitals Precision</span>
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent uppercase" style={{ WebkitTextStroke: '1px rgba(59, 130, 246, 0.4)' }}>Scalable Full-Stack Cloud</span>
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase opacity-40">WCAG 2.1 AA Accessibility</span>
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent uppercase" style={{ WebkitTextStroke: '1px rgba(59, 130, 246, 0.4)' }}>Sub-Second LCP Performance</span>
            </div>
          ))}
        </div>
      </div>

      {/* The Problem Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
           <div className="glass-panel p-12 md:p-20 rounded-2xl relative z-10 max-w-4xl mx-auto text-center border-l-4 border-l-blue-600 bg-white/[0.02] border-white/10">
              <span className="text-xs font-mono text-blue-500 mb-8 uppercase tracking-[0.3em] block">[ SYSTEM_PROFILE: PERFORMANCE_DIAGNOSTICS ]</span>
              <h2 className="text-2xl md:text-4xl text-neutral-200 font-light leading-relaxed tracking-tight">
                Fast, Secure & Scalable Web Solutions
              </h2>
              <p className="text-2xl md:text-4xl text-neutral-200 font-light leading-relaxed tracking-tight">
                Traditional websites are <span className="text-white font-bold border-b border-blue-500">slowly killing your business</span>. 
                Bloated code and plugin-heavy builds results in sluggish mobile performance that causes Google to penalize your rankings.
              </p>
           </div>
        </div>
      </section>

      {/* Solution Approach (Accordion Style from snippet) */}
      <section className="py-32 border-t border-white/5" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-16">
            <Layers className="text-blue-500" width={24} />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase">Custom Web Development Services</h2>
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
                    Initialize Protocol
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack (3D Cards from snippet pattern) */}
      <section className="py-32 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
             <span className="text-xs font-mono text-neutral-500 mb-4 uppercase tracking-[0.3em] font-bold block">[ WEB_ENGINEERING_STACK ]</span>
             <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Web Development Technologies</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: "Frontend Frameworks", items: ["Next.js", "React.js", "Vue.js"], icon: <Monitor />, color: "blue" },
              { category: "Styling & UI", items: ["Tailwind CSS", "Framer Motion", "Animations"], icon: <Zap />, color: "indigo" },
              { category: "Headless CMS", items: ["Sanity", "Contentful", "Strapi"], icon: <Database />, color: "sky" },
              { category: "Cloud Delivery", items: ["Vercel", "AWS", "Cloudflare"], icon: <Cloud />, color: "violet" }
            ].map((stack, idx) => (
              <div key={idx} className="group h-[380px] [perspective:1000px] cursor-pointer">
                <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 bg-neutral-900 border border-white/10 rounded-xl p-8 flex flex-col justify-between [backface-visibility:hidden]">
                    <div className={`text-${stack.color}-500 opacity-60`}>
                      {React.cloneElement(stack.icon as React.ReactElement<any>, { size: 40 })}
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Protocol {idx + 1}</div>
                      <h4 className="text-2xl font-bold text-white uppercase leading-tight">{stack.category}</h4>
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

      <CountryMarquee />

      {/* Our Proven Step Development Process */}
      <section id="development-process" className="py-32 px-6 relative overflow-hidden bg-black/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-mono text-blue-500 mb-4 uppercase tracking-[0.3em] font-bold block">[ ENGINEERING_LIFECYCLE ]</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight mb-8">Our Web Development Process</h2>
              <p className="max-w-2xl mx-auto text-lg text-neutral-400 font-light leading-relaxed">
                We bridge the gap between design and high-performance code through a meticulous development pipeline optimized for speed and SEO.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
             {/* Background Connector line for desktop */}
             <div className="absolute top-12 left-0 right-0 h-[1px] bg-white/10 hidden md:block" />
             
             {[
               { title: "Discovery & Planning", desc: "We start by understanding your business goals, target audience, and technical requirements before writing a single line of code.", icon: <Terminal /> },
               { title: "Architecture & Design", desc: "We choose the right technology stack for your specific needs, whether that's a lightweight static site, a CMS-based platform, or a fully custom web application development build.", icon: <Layers /> },
               { title: "Development", desc: "Clean, well-documented code built with performance, security, and maintainability as core priorities — not afterthoughts.", icon: <Code2 /> },
               { title: "Testing & QA", desc: "Every build goes through cross-browser, cross-device, and performance testing before launch.", icon: <Database /> },
               { title: "Launch & Support", desc: "We don't disappear after deployment. Ongoing maintenance, updates, and performance monitoring keep your site running smoothly.", icon: <Rocket /> }
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
                  <h4 className="text-white font-bold uppercase tracking-tight mb-3 italic">Step 0{idx + 1}: {step.title}</h4>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">{step.desc}</p>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Modern Web Development Services Narrative Block */}
      <section id="modern-web-services" className="py-32 px-6 relative overflow-hidden bg-black border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/[0.02] rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-20 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full uppercase font-mono tracking-[0.25em] font-bold">
                Premium Narrative
              </span>
              <h2 className="text-4xl md:text-6xl font-serif italic text-white tracking-tight leading-tight">
                Modern Web Development Services
              </h2>
              <p className="text-xl md:text-2xl font-sans font-light text-neutral-400 tracking-wide uppercase max-w-2xl">
                Custom Web Applications Built for Speed, Scale, and Growth
              </p>
              
              <div className="h-[1px] w-20 bg-blue-500 my-8" />
              
              <div className="space-y-6 text-neutral-300 font-light leading-relaxed font-sans text-lg max-w-3xl">
                <p>
                  Your website is often the first interaction a potential customer has with your business — and in 2026, that first impression happens in milliseconds. At <strong className="text-white font-medium">AbuQitmirLabs</strong>, we follow <strong className="text-white font-medium">web development best practices</strong> to build modern, high-performance websites and applications engineered around your actual business goals, not generic templates.
                </p>
                <p>
                  Whether you need a corporate website, a customer-facing web application, or a complex internal platform, our approach to <strong className="text-white font-medium">custom web development</strong> combines clean architecture, the right web development framework for the job, and a relentless focus on speed and usability.
                </p>
              </div>
            </motion.div>
          </div>

          {/* What We Build Grid */}
          <div className="mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-[0.3em] font-bold mb-3 block">[ CAPABILITY_SPECTRUM ]</span>
              <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Web Application Development</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Business & Corporate Websites",
                  desc: "Fast, professional, conversion-focused websites that represent your brand accurately and load instantly on any device.",
                  icon: <Briefcase className="text-blue-400" size={24} />
                },
                {
                  title: "Custom Web Development Applications",
                  desc: "Full-stack web application development built to your exact business logic — customer portals, booking systems, internal dashboards, and SaaS products designed around how your operations actually work, not around a pre-built template.",
                  icon: <Code2 className="text-[#ccff00]" size={24} />
                },
                {
                  title: "E-Commerce Platforms",
                  desc: "Scalable online stores with secure payment integration, inventory management, and optimized checkout flows built to convert.",
                  icon: <ShoppingCart className="text-[#ccff00]" size={24} />
                },
                {
                  title: "API & Third-Party Integrations",
                  desc: "Seamless connections between your website and the tools you already use — CRMs, payment gateways, analytics platforms, and internal systems.",
                  icon: <Layers className="text-indigo-400" size={24} />
                },
                {
                  title: "Website Modernization & Migration",
                  desc: "Rebuilding legacy websites on a modern, maintainable web development framework without losing your existing SEO equity or content.",
                  icon: <RefreshCw className="text-violet-400" size={24} />
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#0A0A0A] border border-white/5 hover:border-blue-500/10 rounded-3xl p-8 transition-all hover:bg-white/[0.01] flex flex-col justify-between group"
                >
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h5 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h5>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Philosophy Bento Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
            {/* Frameworks Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#080808] border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col justify-between hover:border-blue-500/15 transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/[0.01] rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-blue-400 tracking-wider uppercase font-bold">[ FRAMEWORK_INTEGRITY ]</span>
                <h4 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
                  Frameworks & Technologies We Work With
                </h4>
                <p className="text-neutral-400 font-light leading-relaxed font-sans">
                  We choose our web development framework based on what your project actually needs — not what's trendy. As a team that works across modern JavaScript frameworks (React, Next.js), robust back-end systems (Node.js, .NET, PHP), and both custom-built and CMS-based solutions, we're able to give you an honest recommendation rather than a one-size-fits-all pitch. It's this range that sets a genuine web development company apart from a template shop.
                </p>
              </div>
            </motion.div>

            {/* SEO Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#080808] border border-[#ccff00]/5 rounded-3xl p-8 md:p-12 flex flex-col justify-between hover:border-[#ccff00]/15 transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/[0.01] rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-[#ccff00] tracking-wider uppercase font-bold">[ ORGANIC_DOMINANCE ]</span>
                <h4 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
                  Built by an SEO Web Developer, Not Just a Coder
                </h4>
                <p className="text-neutral-400 font-light leading-relaxed font-sans">
                  A site that looks polished but can't be found is a wasted investment. Every project we deliver is handled by a team that thinks like an <strong className="text-white font-medium">SEO web developer</strong> first — clean semantic HTML, optimized asset loading, and proper technical foundations baked in from day one, so page speed, mobile responsiveness, and crawlability are never an afterthought bolted on after launch.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Value Pitch & Who This Is For Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
            {/* Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col justify-between hover:border-blue-500/10 transition-colors"
            >
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-blue-400 tracking-wider uppercase font-bold">[ CLIENT_CENTERED_METRICS ]</span>
                <h4 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
                  Why Businesses Choose Our Web Development Services
                </h4>
                <p className="text-neutral-400 font-light leading-relaxed font-sans">
                  Among <strong className="text-white font-medium">web development companies</strong>, what tends to separate the ones clients stay with from the ones they leave is simple: whether the work is built around the client's business or around the agency's convenience. Our <strong className="text-white font-medium">custom web development services</strong> are built the former way — scoped to your goals, documented clearly, and handed over in a state your team can actually maintain.
                </p>
              </div>
            </motion.div>

            {/* Who This Is For */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col justify-between hover:border-blue-500/10 transition-colors"
            >
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-blue-400 tracking-wider uppercase font-bold">[ TARGET_AUDIENCE_SPEC ]</span>
                <h4 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
                  Who This Is For
                </h4>
                <ul className="space-y-4 not-italic font-sans text-neutral-400 font-light list-none pl-0">
                  {[
                    "Businesses replacing an outdated or underperforming website",
                    "Companies that need a custom web application beyond what off-the-shelf tools can offer",
                    "Enterprises modernizing legacy platforms without disrupting operations",
                    "Startups building their first product-facing web presence"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Ready to Build Narrative CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 to-[#0A0A0A] p-8 md:p-16 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/[0.03] rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-3xl space-y-8">
              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full uppercase font-mono tracking-[0.2em] font-bold">
                Direct Consultation
              </span>
              <h4 className="text-3xl md:text-5xl font-serif italic text-white tracking-tight leading-tight">
                Ready to Build Something That Actually Performs?
              </h4>
              <p className="text-neutral-400 text-lg leading-relaxed font-light font-sans">
                A modern web presence is more than a design refresh — it's infrastructure that supports how customers find you, trust you, and do business with you. If you're evaluating whether a custom build, a CMS platform, or a hybrid approach fits your goals, our <Link to="/custom-software" className="text-blue-400 hover:underline font-normal">custom software development</Link> team can help you think it through, expand into native <Link to="/mobile-app-development" className="text-blue-400 hover:underline font-normal">mobile app development</Link>, or deploy autonomous <Link to="/ai-agent-development" className="text-blue-400 hover:underline font-normal">AI agent development</Link> workflows.
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
                <Link
                  to="/custom-software"
                  className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-neutral-200 transition-all text-center inline-flex items-center justify-center gap-2 group"
                  style={{ color: '#000000' }}
                >
                  <span className="text-black font-extrabold" style={{ color: '#000000' }}>Custom Software</span>
                  <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" style={{ color: '#000000' }} />
                </Link>
                <Link
                  to="/mobile-app-development"
                  className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/10 text-white hover:bg-white/5 transition-all text-center inline-flex items-center justify-center gap-2 group"
                >
                  Mobile App Development
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/ai-agent-development"
                  className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/10 text-white hover:bg-white/5 transition-all text-center inline-flex items-center justify-center gap-2 group"
                >
                  AI Agent Development
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Industry-Focused Solutions Section */}
      <section className="py-32 px-6 relative overflow-hidden bg-black/60 border-t border-white/5">
        <div className="absolute inset-0 bg-blue-600/[0.01] filter blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full uppercase font-mono tracking-[0.2em] font-bold">
                Industry-Focused Solutions
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">
                Custom Website Development for Every Business
              </h2>
              <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed font-sans pt-2">
                At AbuQitmirLabs, we design websites that serve a clear purpose—not just for design's sake, but to solve real business problems. Our approach is rooted in understanding your industry, your audience, and your operational goals before a single line of code is written.
              </p>
            </motion.div>
          </div>

          {/* Industry Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {/* 1. Educational Institutions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-white/5 hover:border-blue-500/20 rounded-3xl p-8 transition-all hover:bg-white/[0.01] flex flex-col justify-between group"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Layers size={24} />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                  Educational Institutions
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed font-sans">
                  Schools, colleges, and universities need websites that do more than inform—they need to enroll, engage, and educate. Our custom website development for educational institutions builds platforms that streamline admissions, host virtual classrooms, and connect administrators, teachers, students, and parents in one unified digital environment. From curriculum pages to student dashboards, we create digital campuses that support your academic mission.
                </p>
              </div>
            </motion.div>

            {/* 2. Non-Profit Organizations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-white/5 hover:border-blue-500/20 rounded-3xl p-8 transition-all hover:bg-white/[0.01] flex flex-col justify-between group"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                  <Star size={24} />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-indigo-400 transition-colors">
                  Non-Profit Organizations
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed font-sans">
                  For non-profits, trust is everything. Every donor and volunteer must feel your mission before they read your mission statement. Our custom website development for non-profit organizations prioritizes storytelling, donation processing, and volunteer management—all presented with clarity and warmth. We understand the budget sensitivity of non-profits and deliver high-impact, cost-effective digital experiences that amplify your cause and build a community around your work.
                </p>
              </div>
            </motion.div>

            {/* 3. Real Estate Agencies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-white/5 hover:border-blue-500/20 rounded-3xl p-8 transition-all hover:bg-white/[0.01] flex flex-col justify-between group"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/5 border border-sky-500/10 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-sky-400 transition-colors">
                  Real Estate Agencies
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed font-sans">
                  A real estate website must handle complex property listings, high-quality imagery, and seamless user interaction. Our custom website development for real estate agencies creates dynamic platforms with advanced search filters, interactive maps, and instant property alerts—all optimized for conversion. Whether you're a boutique firm or a large brokerage, we build a digital storefront that helps you close deals faster.
                </p>
              </div>
            </motion.div>

            {/* 4. Healthcare Providers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-white/5 hover:border-blue-500/20 rounded-3xl p-8 transition-all hover:bg-white/[0.01] flex flex-col justify-between group"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/5 border border-violet-500/10 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-violet-400 transition-colors">
                  Healthcare Providers
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed font-sans">
                  Healthcare websites must be both accessible and secure. Our custom website development for healthcare providers ensures full HIPAA compliance, seamless appointment booking, patient portal integration, and clear communication of medical services. We understand the balance between maintaining a professional, trustworthy presence and handling sensitive patient data with the highest security standards.
                </p>
              </div>
            </motion.div>

            {/* 5. Small Law Firms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-white/5 hover:border-blue-500/20 rounded-3xl p-8 transition-all hover:bg-white/[0.01] flex flex-col justify-between group"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                  Small Law Firms
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed font-sans">
                  For small law firms, credibility and first impressions are everything. Our custom website development for small law firms focuses on clean, authoritative design, intuitive navigation, and clear calls to action. We create websites that position you as the trusted expert in your practice area—whether you're a sole practitioner or a boutique firm—helping you convert website visitors into reliable clients.
                </p>
              </div>
            </motion.div>

            {/* 6. Corporate Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-white/5 hover:border-blue-500/20 rounded-3xl p-8 transition-all hover:bg-white/[0.01] flex flex-col justify-between group"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                  <Rocket size={24} />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-indigo-400 transition-colors">
                  Corporate Events
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed font-sans">
                  Corporate events require more than just a registration page—they need a complete digital ecosystem. Our custom website development for corporate events creates dynamic platforms that handle everything from speaker management and agenda scheduling to real-time attendee engagement and post-event feedback. Whether you're organizing a conference, trade show, or private gala, we build the digital infrastructure that makes event logistics effortless and attendee experiences unforgettable.
                </p>
              </div>
            </motion.div>

            {/* 7. Membership Portal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-white/5 hover:border-blue-500/20 rounded-3xl p-8 transition-all hover:bg-white/[0.01] flex flex-col justify-between group"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-[#ccff00]/5 border border-[#ccff00]/10 flex items-center justify-center text-[#ccff00] group-hover:scale-110 transition-transform">
                  <Lock size={24} />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-[#ccff00] transition-colors">
                  Membership Portal Integration
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed font-sans">
                  To build a thriving online community or subscription-based business, a simple website is not enough. Our custom website development with membership portal solutions deliver secure, user-centric platforms that manage user accounts, subscriptions, content access, and community engagement—all while providing a seamless user experience. We ensure your members stay engaged and your content remains protected.
                </p>
              </div>
            </motion.div>

            {/* 8. Booking System */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-white/5 hover:border-blue-500/20 rounded-3xl p-8 transition-all hover:bg-white/[0.01] flex flex-col justify-between group"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/5 border border-sky-500/10 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                  <RefreshCw size={24} />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-sky-400 transition-colors">
                  Custom Booking Systems
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed font-sans">
                  For service-based businesses, a seamless booking experience is critical to capturing and retaining clients. Our custom website development with booking system creates intuitive scheduling tools that integrate with calendars, manage availability, and automate confirmations—reducing administrative overhead and improving customer satisfaction.
                </p>
              </div>
            </motion.div>

            {/* 9. AI Chatbot Integration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-white/5 hover:border-blue-500/20 rounded-3xl p-8 transition-all hover:bg-white/[0.01] flex flex-col justify-between group"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-[#ccff00]/5 border border-[#ccff00]/10 flex items-center justify-center text-[#ccff00] group-hover:scale-110 transition-transform">
                  <Cpu size={24} />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-[#ccff00] transition-colors">
                  AI Chatbot Integration
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed font-sans">
                  Modern users expect instant, personalized responses. Our custom website development with AI chatbot integration combines dynamic front-end design with intelligent, automated conversational agents. Whether for lead qualification, customer support, or product recommendations, our AI chatbots enhance user engagement, reduce response times, and help you scale your customer interaction without adding to your team's workload.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Global Markets Focus Section */}
          <div className="relative rounded-3xl border border-white/5 bg-[#070707] p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/[0.02] rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-4xl space-y-6">
              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full uppercase font-mono tracking-[0.2em] font-bold">
                Global Operations
              </span>
              <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
                Custom Website Development Across Global Markets
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed font-light font-sans">
                While our engineering headquarters is in Karachi, Pakistan, our digital solutions are built for a global stage. We understand the unique demands of different markets and adapt our approach accordingly:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                {/* USA */}
                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-blue-500/10 transition-colors">
                  <div className="text-xs font-mono text-blue-400 font-bold mb-3 uppercase tracking-wider">United States</div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                    Custom website development in the United States for businesses that require high-performance, high-security, and premium design to compete in one of the world's most competitive digital landscapes.
                  </p>
                </div>

                {/* UK */}
                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-blue-500/10 transition-colors">
                  <div className="text-xs font-mono text-blue-400 font-bold mb-3 uppercase tracking-wider">United Kingdom</div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                    Custom website development in the United Kingdom aligned with UK data protection standards and user expectations, ensuring your brand resonates with British audiences.
                  </p>
                </div>

                {/* Canada */}
                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-blue-500/10 transition-colors">
                  <div className="text-xs font-mono text-blue-400 font-bold mb-3 uppercase tracking-wider">Canada</div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                    Custom website development in Canada that reflects the country's bilingual and multicultural landscape, with compliance to Canadian accessibility standards.
                  </p>
                </div>

                {/* Australia */}
                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-blue-500/10 transition-colors">
                  <div className="text-xs font-mono text-blue-400 font-bold mb-3 uppercase tracking-wider">Australia</div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                    Custom website development in Australia for businesses ready to dominate the Australian market with fast, scalable, and user-friendly platforms.
                  </p>
                </div>

                {/* Poland */}
                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-blue-500/10 transition-colors">
                  <div className="text-xs font-mono text-blue-400 font-bold mb-3 uppercase tracking-wider">Poland</div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                    Custom website development in Poland that bridges the gap between global standards and local market needs, helping Polish businesses expand their digital footprint.
                  </p>
                </div>

                {/* Karachi Global Pitch */}
                <div className="p-6 rounded-2xl border border-blue-500/10 bg-blue-500/[0.02] flex flex-col justify-center">
                  <div className="text-xs font-mono text-blue-400 font-bold mb-2 uppercase tracking-wider">Universal Reach</div>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans font-medium">
                    Wherever your audience is, we build websites that adapt, perform, and grow with your business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Web Development Packages Pricing Framework */}
      <WebDevelopmentPricing />

      {/* Brand Web Development Upsells & Add-ons Pricing */}
      <WebUpsellsPricing />

      {/* High-Availability Hosting Plans Pricing Section */}
      <WebHostingPricing />

      {/* Ongoing Developer Maintenance Plans Section */}
      <WebMaintenancePricing />

      {/* Scalable Custom Web Applications Pricing Section */}
      <CustomWebAppsPricing />

      {/* Need something custom CTA session */}
      <WebCustomCTA />

      {/* See Our Work in Action */}
      <section id="work-action" className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-xs font-mono text-neutral-500 mb-4 uppercase tracking-[0.3em] font-bold block">[ PROJECT_SHOWCASE ]</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight mb-8">
              See Our Web Projects in Action: <br />
              <span className="text-neutral-500">Real Projects, Real Results</span>
            </h2>
            <p className="max-w-3xl text-xl text-neutral-400 font-light leading-relaxed">
              We believe that exceptional work speaks for itself. Explore our recent case studies and project breakdowns below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Enterprise Digital Architecture",
                desc: "Watch our lead architect at AbuQitmirLabs breakdown complex digital ecosystems.",
                videoId: "5Rq97Igd_uU"
              },
              {
                title: "Advanced Engineering Solutions",
                desc: "Deep dive into High-Performance Web Tech and scalable backend systems.",
                videoId: "Sh9SqMCx9I4"
              },
              {
                title: "AI-Driven Business Growth",
                desc: "How we implement autonomous LLM agents to automate business workflows.",
                videoId: "110zeH-eEEk"
              },
              {
                title: "Sub-Second Rendering & Performance Audits",
                desc: "Continuous performance showcasing zero-lag interface transitions.",
                videoId: "P0m__m_kOGs"
              },
              {
                title: "Modern Tech Explained",
                desc: "Quick insights into modern tech stacks and semantic search optimization.",
                videoId: "FgtXLw-GNKk"
              },
              {
                title: "Future of Digital Assets",
                desc: "A vision for secure, fast, and highly intelligent digital transformations.",
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
                  <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{video.title}</h4>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed mb-4">{video.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Website Contract Form Section - The Sovereignty Blueprint */}
      <section className="py-32 relative border-t border-white/5 bg-black" id="contract-section">
        <div className="absolute inset-0 bg-[#ccff00]/[0.02] filter blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Cinematic Text Reveal & Core Clauses */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] bg-[#ccff00]/10 text-[#ccff00] px-3 py-1 rounded-full uppercase font-mono tracking-[0.2em] font-bold">
                  Exclusive System Blueprint
                </span>
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic font-light tracking-tight text-white leading-tight">
                  Protect Your <br className="hidden md:inline" />
                  <span className="text-[#ccff00]">Digital Sovereignty</span>
                </h3>
              </div>
              
              <p className="text-neutral-400 text-lg leading-relaxed font-light">
                Do not sign a website agreement without these strict protection clauses. Access the complete, unredacted legal contract template we use at AbuQitmirLabs. Authenticate with your contact information below to secure your copy.
              </p>

              {/* Protective Clauses Cards with Old Money aesthetics */}
              <div className="space-y-6 pt-4">
                {[
                  {
                    title: "100% IP & Code Sovereignty",
                    desc: "Absolute source-code transfer with NO gatekeeping, passive claims, or recurring developer IP blocks."
                  },
                  {
                    title: "Direct Domain & Cloud Custody",
                    desc: "AWS, Vercel, and DNS properties are registered strictly in your name, never held hostage under developer accounts."
                  },
                  {
                    title: "30-Day Intense Hyper-Care",
                    desc: "An fully-guaranteed, pre-packaged support block covering critical package optimizations and launch surveillance."
                  }
                ].map((clause, idx) => (
                  <div key={idx} className="flex gap-4 items-start border-l-2 border-white/10 pl-6 hover:border-[#ccff00]/50 transition-colors">
                    <div className="text-xs font-mono text-[#ccff00]/60 mt-1 font-bold">0{idx + 1}_</div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">{clause.title}</h4>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">{clause.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Contract Request Card */}
            <div className="lg:col-span-6">
              <div className="bg-[#0b0b0b] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/[0.02] rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
                  <div className="p-3 bg-white/5 rounded-xl text-[#ccff00]">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">Contract Blueprint Form</h3>
                    <p className="text-xs text-neutral-500 font-light font-mono">AUTHORIZED SECURE DOWNLOAD</p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {!contractSubmitted ? (
                    <motion.form 
                      key="contract-form"
                      onSubmit={handleContractSubmit}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label htmlFor="dev-contract-name" className="block text-xs font-mono uppercase tracking-widest text-[#ccff00] font-bold">
                          Client Legal Name_ *
                        </label>
                        <input 
                          id="dev-contract-name"
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. John Doe / Organization"
                          value={contractFormData.name}
                          onChange={handleContractInputChange}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-[#ccff00] focus:outline-none transition-colors placeholder:text-neutral-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="dev-contract-email" className="block text-xs font-mono uppercase tracking-widest text-[#ccff00] font-bold">
                          Communication Relay / Email_ *
                        </label>
                        <input 
                          id="dev-contract-email"
                          type="email"
                          name="email"
                          required
                          placeholder="primary@organization.com"
                          value={contractFormData.email}
                          onChange={handleContractInputChange}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-[#ccff00] focus:outline-none transition-colors placeholder:text-neutral-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="dev-contract-phone" className="block text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
                          Phone Contact / (Optional)_
                        </label>
                        <input 
                          id="dev-contract-phone"
                          type="tel"
                          name="phone"
                          placeholder="+1 (555) 0192"
                          value={contractFormData.phone}
                          onChange={handleContractInputChange}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-white/30 focus:outline-none transition-colors placeholder:text-neutral-600"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#ccff00] text-black font-black uppercase text-xs tracking-widest hover:bg-[#b0d600] hover:text-black active:scale-[0.98] transition-all py-5 px-6 rounded-xl inline-flex items-center justify-center gap-3 cursor-pointer shadow-lg"
                        style={{ color: '#000000' }}
                      >
                        <span className="text-black font-black" style={{ color: '#000000' }}>Generate & Download Template</span>
                        <Download size={15} className="text-black" style={{ color: '#000000' }} />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="contract-progress"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-8 py-6 text-center"
                    >
                      {contractDownloading ? (
                        <div className="flex flex-col items-center space-y-6">
                          <AnimatedDownload 
                            isAnimating={contractDownloading}
                            onAnimationComplete={onContractDownloadFinished}
                          />
                          <p className="text-xs text-neutral-400 font-mono tracking-widest animate-pulse">
                            PREPARING SYSTEM SPECIFICATION DOCUMENTS...
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00] mx-auto animate-bounce">
                            <Check size={36} />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white uppercase tracking-tight">Transmission Complete!</h4>
                            <p className="text-xs font-mono text-neutral-500 mt-2">
                              Your legal protective blueprint has been compiled. Check your standard downloads folder.
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setContractSubmitted(false);
                              setContractCompleted(false);
                            }}
                            className="text-xs font-mono text-[#ccff00]/60 underline hover:text-[#ccff00] transition-colors"
                          >
                            Download another template copy
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-48 relative border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-[150px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-6xl md:text-[8rem] font-bold text-white tracking-tighter mb-12 uppercase leading-[0.85]">
            Ready to <span className="text-neutral-600">Architect</span> <br />
            Your Advantage?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="h-16 px-12 rounded-full text-base font-bold bg-white text-black hover:bg-neutral-200 transition-transform hover:scale-105 flex items-center justify-center uppercase tracking-tight"
              style={{ color: '#000000' }}
            >
               <span className="text-black font-black" style={{ color: '#000000' }}>Request a Technical Audit</span>
            </a>
            <div className="text-neutral-500 font-mono text-[11px] uppercase tracking-[0.2em] text-left border-l border-white/10 pl-6 h-12 flex items-center">
               Avg. Discovery Time: 14 Days <br />
               Current Lead Time: 4 Weeks
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (Glass style) */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-neutral-500 mb-4 uppercase tracking-[0.3em] block">[ OPERATIONAL_INQUIRIES ]</span>
            <h2 className="text-4xl font-bold text-white uppercase tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 border border-white/5 rounded-xl hover:border-blue-500/30 transition-colors"
              >
                <button 
                  className="flex items-center justify-between w-full p-6 text-left"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <span className="text-lg font-bold text-neutral-200 uppercase tracking-tight">{faq.q}</span>
                  <div className={`transition-transform duration-500 ${activeFaq === idx ? 'rotate-45 text-blue-400' : 'text-neutral-500'}`}>
                    <Plus width={24} />
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

      {/* Internal Linking / Related Services */}
      <section className="py-24 bg-[#050505] border-t border-white/5 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xs font-mono text-neutral-500 mb-12 uppercase tracking-[0.4em] font-bold">[ RELATED_SYSTEMS ]</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Custom Software", path: "/custom-software", icon: <Code2 className="w-5 h-5" /> },
              { title: "Mobile Apps", path: "/mobile-app-development", icon: <Smartphone className="w-5 h-5" /> },
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

      <Footer />
    </div>
  );
};

export default WebDevelopmentPage;

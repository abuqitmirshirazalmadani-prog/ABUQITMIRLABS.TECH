import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Star, ShieldCheck, ArrowRight, CheckCircle2, Code2, Cpu, Globe2, Layers, Search, Sparkles, Terminal, Smartphone } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import TrustSection from '../components/TrustSection';
import ApproachSection from '../components/ApproachSection';
import DifferentiatorsSection from '../components/DifferentiatorsSection';
import ImpactSection from '../components/ImpactSection';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import CountryMarquee from '../components/CountryMarquee';
import TechStackSection from '../components/TechStackSection';
import VideoPortfolio from '../components/VideoPortfolio';
import InteractivePortfolio from '../components/InteractivePortfolio';
import WebDevelopmentPricing from '../components/WebDevelopmentPricing';
import HomeCaseStudiesSection from '../components/HomeCaseStudiesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import FeaturedToolsSection from '../components/FeaturedToolsSection';
export default function HomePage() {

  const growthEngineeringSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // NODE 1: Organization (Updated)
      {
        "@type": "Organization",
        "@id": "https://www.abuqitmirlabs.tech/#organization",
        "name": "AbuQitmirLabs",
        "url": "https://www.abuqitmirlabs.tech",
        "founder": {
          "@type": "Person",
          "name": "AbuQitmir Mohammad Shiraz Al Madani"
        },
        "foundingDate": "2021",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.abuqitmirlabs.tech/logo.png"
        },
        "image": "https://www.abuqitmirlabs.tech/logo.png",
        "email": "hello@abuqitmirlabs.tech",
        "telephone": "+923233260859",
        "description": "Growth engineering firm combining custom software, AI automation, and performance marketing for B2B companies.",
        "slogan": "We build revenue systems, not just software.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Karachi",
          "addressRegion": "Sindh",
          "addressCountry": "PK"
        },
        "areaServed": ["PK", "US", "GB", "AE", "SA", "QA", "KW", "CA", "AU", "PL"],
        "knowsAbout": [
          "Growth Engineering",
          "Custom Software Development",
          "AI Agent Development",
          "Performance Marketing",
          "SEO",
          "Brand Building"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/abuqitmirlabs",
          "https://twitter.com/abuqitmirlabs",
          "https://www.facebook.com/abuqitmirlabs"
        ]
      },

      // NODE 2: WebSite (Existing — no change)
      {
        "@type": "WebSite",
        "@id": "https://www.abuqitmirlabs.tech/#website",
        "url": "https://www.abuqitmirlabs.tech",
        "name": "AbuQitmirLabs",
        "publisher": {
          "@id": "https://www.abuqitmirlabs.tech/#organization"
        }
      },

      // NODE 3: WebPage (Existing — no change)
      {
        "@type": "WebPage",
        "@id": "https://www.abuqitmirlabs.tech/#webpage",
        "url": "https://www.abuqitmirlabs.tech/",
        "name": "Growth Engineering Firm | Custom Software & AI | AbuQitmirLabs",
        "description": "Growth engineering firm for B2B companies. Custom software, AI automation & performance marketing engineered as one revenue system.",
        "isPartOf": {
          "@id": "https://www.abuqitmirlabs.tech/#website"
        },
        "inLanguage": "en-US"
      },

      // NODE 4: Service — Growth Infrastructure Audit (NEW)
      {
        "@type": "Service",
        "@id": "https://www.abuqitmirlabs.tech/#growth-audit-service",
        "serviceType": "Growth Engineering",
        "name": "Growth Infrastructure Audit",
        "provider": {
          "@id": "https://www.abuqitmirlabs.tech/#organization"
        },
        "description": "A complimentary audit of your marketing technology stack, attribution model, and data infrastructure. Delivered as a prioritized roadmap for building a measurable revenue engine.",
        "url": "https://www.abuqitmirlabs.tech/contact",
        "areaServed": [
          { "@type": "Country", "name": "United States" },
          { "@type": "Country", "name": "United Kingdom" },
          { "@type": "Country", "name": "Canada" },
          { "@type": "Country", "name": "Australia" },
          { "@type": "Country", "name": "Poland" },
          { "@type": "Country", "name": "Pakistan" },
          { "@type": "Country", "name": "United Arab Emirates" },
          { "@type": "Country", "name": "Saudi Arabia" },
          { "@type": "Country", "name": "Qatar" },
          { "@type": "Country", "name": "Kuwait" }
        ],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Complimentary initial growth infrastructure audit",
          "availability": "https://schema.org/InStock"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Growth Engineering Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Growth Infrastructure Audit"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Revenue Operations Setup"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Attribution Modeling"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Marketing Technology Integration"
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <main id="main-content" className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-white/20 selection:text-white">
      <SEO
        title="Custom Software, AI & Growth Engineering | AbuQitmirLabs"
        description="Growth engineering firm for B2B companies. Custom software, AI automation & performance marketing engineered as one revenue system."
        canonical="https://www.abuqitmirlabs.tech/"
        ogTitle="Custom Software, AI & Growth Engineering | AbuQitmirLabs"
        ogDescription="Growth engineering firm for B2B companies. Custom software, AI automation & performance marketing engineered as one revenue system."
        ogImage="https://www.abuqitmirlabs.tech/images/hero-abuqitmirlabs.webp"
        ogImageAlt="AbuQitmirLabs Custom Software Development"
        ogType="website"
        twitterCard="summary_large_image"
        twitterTitle="Custom Software, AI & Growth Engineering | AbuQitmirLabs"
        twitterDescription="Growth engineering firm for B2B companies. Custom software, AI automation & performance marketing engineered as one revenue system."
        twitterImage="https://www.abuqitmirlabs.tech/images/hero-abuqitmirlabs.webp"
        schema={growthEngineeringSchema}
      />

      <Header />
      
      <HeroSection />
      
      {/* Dynamic Animated Marquee Ribbon */}
      <div className="relative w-full overflow-hidden py-3 bg-black animate-enter">
        <div className="overflow-hidden bg-[#B9FF66] w-full border-y-2 border-black py-4 relative">
          <div className="flex whitespace-nowrap w-max animate-marquee">
            <div className="flex gap-10 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase items-center text-black px-8">
              <span>Build Software</span> <Star className="fill-current" size={24} />
              <span>Automate with AI</span> <Star className="fill-current" size={24} />
              <span>Grow Organic Demand</span> <Star className="fill-current" size={24} />
              <span>100% IP &amp; Code Ownership</span> <Star className="fill-current" size={24} />
              <span>Senior-Led Engineering</span> <Star className="fill-current" size={24} />
              <span>5-Step Delivery Process</span> <Star className="fill-current" size={24} />
              <span>Global Remote Delivery</span> <Star className="fill-current" size={24} />
            </div>
            <div aria-hidden="true" className="flex gap-10 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase items-center text-black px-8">
              <span>Build Software</span> <Star className="fill-current" size={24} />
              <span>Automate with AI</span> <Star className="fill-current" size={24} />
              <span>Grow Organic Demand</span> <Star className="fill-current" size={24} />
              <span>100% IP &amp; Code Ownership</span> <Star className="fill-current" size={24} />
              <span>Senior-Led Engineering</span> <Star className="fill-current" size={24} />
              <span>5-Step Delivery Process</span> <Star className="fill-current" size={24} />
              <span>Global Remote Delivery</span> <Star className="fill-current" size={24} />
            </div>
          </div>
        </div>
      </div>

      <TrustSection />
      
      {/* Three Core Commercial Funnels: Build Software, Automate with AI, Grow Demand */}
      <section className="py-24 md:py-32 bg-[#060606] border-y border-white/5 relative overflow-hidden" id="authority-narrative">
        <div className="absolute inset-0 bg-[#ccff00]/[0.01] blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">
          
          {/* Main Section Header */}
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
                Core Commercial Funnels &amp; Technical Architecture
              </span>
              <span className="text-zinc-600 text-xs font-mono">|</span>
              <span className="text-zinc-400 text-xs font-mono">
                Lead Architect: <span className="text-white font-semibold">Abu Qitmir</span> &bull; Founded in <time dateTime="2021" className="text-[#ccff00]">2021</time>
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic text-white font-light tracking-tight leading-tight">
              Three Integrated Funnels: <br />
              <span className="text-neutral-400 font-sans not-italic font-extralight tracking-tighter">
                Build Software. Automate with AI. Grow Demand.
              </span>
            </h2>
            <p className="text-neutral-300 font-sans leading-relaxed text-base md:text-lg font-light mt-6 text-justify">
              <strong>AbuQitmirLabs</strong> focuses its senior engineering and growth practice around three focused commercial pillars so buyers can engage us for a single technical milestone or a complete B2B revenue system.
            </p>
          </div>

          {/* Three Funnel Pillar Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Funnel 1: Build Software */}
            <div className="space-y-6 bg-[#0a0a09] border border-white/10 rounded-2xl p-8">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-[#ccff00] font-bold">01 / BUILD SOFTWARE</span>
              </div>
              <h3 className="text-xl font-sans font-bold text-white tracking-tight">
                Custom Software, Web &amp; Mobile Engineering
              </h3>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm font-light text-justify">
                We architect bespoke SaaS products, enterprise cloud backends, Next.js web applications, and cross-platform iOS/Android mobile apps with 100% source code and IP transfer.
              </p>
              <div className="pt-2 space-y-3">
                <Link to="/custom-software" className="inline-flex items-center gap-2 text-xs font-mono text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>Custom Software Development</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
                <Link to="/web-development" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>Full-Stack Web Development</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
                <Link to="/mobile-app-development" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>Mobile App Development (Flutter &amp; React Native)</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
              </div>
            </div>

            {/* Funnel 2: Automate with AI */}
            <div className="space-y-6 bg-[#0a0a09] border border-white/10 rounded-2xl p-8">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-[#ccff00] font-bold">02 / AUTOMATE WITH AI</span>
              </div>
              <h3 className="text-xl font-sans font-bold text-white tracking-tight">
                Autonomous AI Agents, RAG &amp; Workflow Automation
              </h3>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm font-light text-justify">
                We engineer production AI agents, private Retrieval-Augmented Generation (RAG) knowledge pipelines, and legacy-system integrations with role-based access controls and audit logging.
              </p>
              <div className="pt-2 space-y-3">
                <Link to="/ai-agent-development" className="inline-flex items-center gap-2 text-xs font-mono text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>AI Agent &amp; RAG Development</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
                <Link to="/solutions/ai-automation" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>Enterprise AI Workflow Automation</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
                <Link to="/tools/ai-readiness-score" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>Assess Your AI Readiness Score</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
              </div>
            </div>

            {/* Funnel 3: Grow Demand */}
            <div className="space-y-6 bg-[#0a0a09] border border-white/10 rounded-2xl p-8">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-[#ccff00] font-bold">03 / GROW DEMAND</span>
              </div>
              <h3 className="text-xl font-sans font-bold text-white tracking-tight">
                Technical SEO, Programmatic SEO &amp; Growth Engineering
              </h3>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm font-light text-justify">
                We compound organic customer acquisition through technical SEO, Schema.org entity graphs, AEO/GEO content systems, and conversion-engineered landing architectures.
              </p>
              <div className="pt-2 space-y-3">
                <Link to="/seo-mastery" className="inline-flex items-center gap-2 text-xs font-mono text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>Technical &amp; Semantic SEO Mastery</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
                <Link to="/growth-engineering" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>B2B Growth Engineering Systems</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
                <Link to="/local-seo-for-small-business" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>Local SEO &amp; Citation Engineering</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
              </div>
            </div>

          </div>

          {/* Core Section: Structured 5-Step Delivery Process & Case Studies */}
          <div className="bg-[#0a0a09] border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
                  04 / DELIVERY GOVERNANCE &amp; VERIFIED CASE STUDIES
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white">
                  Structured 5-Step Delivery Process &amp; Production Proof
                </h2>
                <p className="text-neutral-300 font-sans text-sm md:text-base leading-relaxed font-light text-justify">
                  Every project is scoped and delivered through our documented 5-stage engineering lifecycle—covering architectural discovery, interactive prototyping, test-driven sprints, security/performance QA, and full source-code handover.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/about/our-process" className="inline-flex items-center gap-2 text-xs font-mono bg-white/10 hover:bg-[#ccff00] hover:text-black text-white px-4 py-2 rounded-none transition-colors uppercase font-bold tracking-wider">
                    Review Our 5-Step Delivery Process →
                  </Link>
                  <Link to="/case-studies/tajweedpage" className="inline-flex items-center gap-2 text-xs font-mono border border-white/20 hover:border-[#ccff00] text-neutral-300 hover:text-[#ccff00] px-4 py-2 rounded-none transition-colors uppercase font-bold tracking-wider">
                    Read TajweedPage.com Case Study →
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-4 bg-zinc-950 border border-white/10 rounded-xl p-6 space-y-3">
                <div className="text-xs font-mono text-[#ccff00] font-bold uppercase tracking-wider">100% IP &amp; Source Code Ownership</div>
                <div className="text-sm font-sans text-white font-semibold">Zero Vendor Lock-In</div>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  Clients receive complete GitHub repositories, deployment pipelines, and database schemas upon milestone completion.
                </p>
              </div>
            </div>
          </div>

          {/* Local Geographic Authority & Trust Banner */}
          <div className="pt-12 border-t border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
                05 / GLOBAL DELIVERY FOOTPRINT
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif italic text-white">
                Why US, UK &amp; Global Clients Partner With Our Karachi Studio
              </h2>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm md:text-base font-light text-justify">
                Founded in 2021 and headquartered in Karachi, Pakistan, AbuQitmirLabs combines international software engineering standards with capital efficiency. Partnering with our team gives you direct access to senior software architects, structured milestone governance, and 100% intellectual property ownership.
              </p>
            </div>
            <div className="lg:col-span-4 bg-[#0a0a09] border border-white/10 rounded-2xl p-6 text-center lg:text-left space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ccff00] font-bold block">ENGINEERING HUB</span>
              <h3 className="text-lg font-serif italic text-white">Karachi, Pakistan</h3>
              <p className="text-xs text-neutral-400 font-mono leading-relaxed uppercase">
                FOUNDED 2021 &bull; SECURITY-FIRST ARCHITECTURE &bull; 100% SOURCE REPO HANDOVER
              </p>
              <div className="pt-2">
                <Link to="/about/our-company" className="text-xs font-mono text-[#ccff00] hover:underline uppercase tracking-wider block">
                  Learn About Our Studio →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
      
      {/* Featured Free Tools Section */}
      <FeaturedToolsSection />
      
      <ApproachSection />
      
      <DifferentiatorsSection />
      
      <ImpactSection />

      <ServicesSection />
      
      <CountryMarquee />
      
      <ProcessSection />

      <TechStackSection />
      
      <VideoPortfolio />
      <InteractivePortfolio />

      <WebDevelopmentPricing />
      
      <HomeCaseStudiesSection />

      <TestimonialsSection />

      <FAQSection />

      <ContactSection />

      {/* CTA Section */}
      <section id="cta-section" className="bg-[#090908] border-t border-zinc-900 py-24 px-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(204,255,0,0.03)_0%,_transparent_65%)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 italic tracking-tight">
            Book a Technical Discovery Call
          </h2>
          <p className="text-zinc-400 mb-12 text-sm md:text-base font-sans tracking-wide">
            Schedule a 30-minute architectural consultation with our senior engineering leads. Response within 24 business hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ccff00] text-black hover:bg-white font-mono text-xs font-bold tracking-[0.14em] uppercase px-8 py-4 rounded-full transition-all duration-300 h-14"
            >
              Book a Discovery Call
            </Link>
            <a
              id="cta-whatsapp-link"
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25d366]/10 text-[#25d366] hover:bg-[#25d366]/20 font-sans text-xs tracking-[0.14em] uppercase border border-[#25d366]/20 px-8 py-4 rounded-full transition-all duration-300 h-14"
              aria-label="Message AbuQitmirLabs on WhatsApp"
            >
              <span className="normal-case">WhatsApp (+92 323 3260859)</span>
            </a>
            <div className="flex flex-col gap-2">
              <a
                id="cta-email-link-corporate"
                href="mailto:hello@abuqitmirlabs.tech"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 text-zinc-200 hover:bg-white/10 font-sans text-xs tracking-[0.14em] uppercase border border-white/20 px-8 py-3.5 rounded-full transition-all duration-300"
                aria-label="Send email to hello@abuqitmirlabs.tech"
              >
                <span className="normal-case font-mono font-medium tracking-tight">hello@abuqitmirlabs.tech</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

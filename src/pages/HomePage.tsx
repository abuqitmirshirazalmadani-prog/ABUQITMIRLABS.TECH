import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
import { homeSchema } from '../utils/homeStaticHtml';

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-white/20 selection:text-white">
      <Helmet>
        <title>Custom Software &amp; AI App Development Company | AbuQitmirLabs</title>
        <meta name="description" content="AbuQitmirLabs engineers custom software, AI agents, mobile apps, and web solutions. Top-rated development company in Karachi serving global clients." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/" />
        <link rel="preload" as="image" href="https://i.postimg.cc/t4D5HtZr/abuqitmirlabs-tech.jpg" type="image/jpeg" fetchPriority="high" />
        
        <meta property="og:title" content="Custom Software &amp; AI App Development Company | AbuQitmirLabs" />
        <meta property="og:description" content="AbuQitmirLabs engineers custom software, AI agents, mobile apps, and web solutions. Top-rated development company in Karachi serving global clients." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.postimg.cc/t4D5HtZr/abuqitmirlabs-tech.jpg" />
        <meta property="og:image:alt" content="AbuQitmirLabs Custom Software &amp; AI Development Studio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Custom Software &amp; AI App Development Company | AbuQitmirLabs" />
        <meta name="twitter:description" content="AbuQitmirLabs engineers custom software, AI agents, mobile apps, and web solutions. Top-rated development company in Karachi serving global clients." />
        <meta name="twitter:image" content="https://i.postimg.cc/t4D5HtZr/abuqitmirlabs-tech.jpg" />
      </Helmet>

      <Header />
      
      <HeroSection />
      
      {/* Dynamic Animated Marquee Ribbon */}
      <div className="relative w-full overflow-hidden py-3 bg-black">
        <div className="overflow-hidden bg-[#B9FF66] w-full border-y-2 border-black py-4 relative">
          <div className="flex whitespace-nowrap w-max animate-marquee">
            <div className="flex gap-10 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase items-center text-black px-8">
              <span>Comprehensive digital strategy</span> <Star className="fill-current" size={24} />
              <span>End-to-end software engineering</span> <Star className="fill-current" size={24} />
              <span>Performance-focused web development</span> <Star className="fill-current" size={24} />
              <span>Strategic SEO and content growth</span> <Star className="fill-current" size={24} />
              <span>Custom AI-powered automation</span> <Star className="fill-current" size={24} />
              <span>Conversion-driven UI/UX design</span> <Star className="fill-current" size={24} />
              <span>Scalable mobile app solutions</span> <Star className="fill-current" size={24} />
            </div>
            <div aria-hidden="true" className="flex gap-10 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase items-center text-black px-8">
              <span>Comprehensive digital strategy</span> <Star className="fill-current" size={24} />
              <span>End-to-end software engineering</span> <Star className="fill-current" size={24} />
              <span>Performance-focused web development</span> <Star className="fill-current" size={24} />
              <span>Strategic SEO and content growth</span> <Star className="fill-current" size={24} />
              <span>Custom AI-powered automation</span> <Star className="fill-current" size={24} />
              <span>Conversion-driven UI/UX design</span> <Star className="fill-current" size={24} />
              <span>Scalable mobile app solutions</span> <Star className="fill-current" size={24} />
            </div>
          </div>
        </div>
      </div>

      <TrustSection />
      
      {/* Comprehensive Architectural Overview & Semantic Authority Section */}
      <section className="py-24 md:py-32 bg-[#060606] border-y border-white/5 relative overflow-hidden" id="authority-narrative">
        <div className="absolute inset-0 bg-[#ccff00]/[0.01] blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">
          
          {/* Main Section Header */}
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
                Scientific Engineering &amp; Technical Authority
              </span>
              <span className="text-zinc-600 text-xs font-mono">|</span>
              <span className="text-zinc-400 text-xs font-mono">
                Lead Architect: <span className="text-white font-semibold">Abu Qitmir</span> • Updated: <time dateTime="2026-08-28" className="text-[#ccff00]">August 2026</time>
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic text-white font-light tracking-tight leading-tight">
              Engineering Digital Resilience &amp; <br />
              <span className="text-neutral-400 font-sans not-italic font-extralight tracking-tighter">
                Institutional Software Craftsmanship.
              </span>
            </h2>
            <p className="text-neutral-300 font-sans leading-relaxed text-base md:text-lg font-light mt-6 text-justify">
              <strong>AbuQitmirLabs</strong> is an independent software studio and technical consulting practice. We architect modular, secure digital products for ambitious startups and global enterprises — moving beyond fragile off-the-shelf software to build owned digital assets that scale seamlessly across markets.
            </p>
          </div>

          {/* Three Pillar Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Column 1: Core Web & Enterprise Platforms */}
            <div className="space-y-6 bg-[#0a0a09] border border-white/10 rounded-2xl p-8">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-[#ccff00] font-bold">01 / WEB &amp; ENTERPRISE SYSTEMS</span>
              </div>
              <h3 className="text-xl font-sans font-bold text-white tracking-tight">
                Modern Web Platforms &amp; Core Systems
              </h3>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm font-light text-justify">
                We design resilient digital interfaces and decoupled cloud platforms with sub-second performance. For comprehensive architectural specifications, technical frameworks, and delivery roadmaps, explore our dedicated engineering practices:
              </p>
              <div className="pt-2 space-y-3">
                <Link to="/web-development" className="inline-flex items-center gap-2 text-xs font-mono text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>View Web Development Hub</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
                <Link to="/custom-software" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>View Custom Software Architecture</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
              </div>
            </div>

            {/* Column 2: Autonomous AI & Cognitive Automation */}
            <div className="space-y-6 bg-[#0a0a09] border border-white/10 rounded-2xl p-8">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-[#ccff00] font-bold">02 / AI &amp; COGNITIVE AUTOMATION</span>
              </div>
              <h3 className="text-xl font-sans font-bold text-white tracking-tight">
                Autonomous Agents &amp; RAG Pipelines
              </h3>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm font-light text-justify">
                We develop multi-agent intelligence systems, semantic retrieval engines, and localized LLM integrations to automate operational bottlenecks. For detailed case studies and deployment methodologies, visit our specialized division:
              </p>
              <div className="pt-2 space-y-3">
                <Link to="/ai-agent-development" className="inline-flex items-center gap-2 text-xs font-mono text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>View AI Agent Development</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
                <Link to="/solutions/ai-automation" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#ccff00] hover:underline uppercase tracking-wider font-semibold block">
                  <span>View Enterprise Automation</span>
                  <ArrowRight size={14} className="inline" />
                </Link>
              </div>
            </div>

            {/* Column 3: Cross-Platform Mobile Engineering */}
            <div className="space-y-6 bg-[#0a0a09] border border-white/10 rounded-2xl p-8">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-[#ccff00] font-bold">03 / MOBILE APPLICATIONS</span>
              </div>
              <h3 className="text-xl font-sans font-bold text-white tracking-tight">
                High-Performance Mobile Applications
              </h3>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm font-light text-justify">
                We build native-grade mobile products on Flutter and React Native with unified codebases, biometric hardware authentication, and offline synchronization. Explore our full mobile capability matrix and store launch process:
              </p>
              <div className="pt-2">
                <Link to="/mobile-app-development" className="inline-flex items-center gap-2 text-xs font-mono text-[#ccff00] hover:underline uppercase tracking-wider font-semibold">
                  <span>View Mobile App Practice</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>

          {/* Core Section: Technical & Semantic SEO Navigation */}
          <div className="bg-[#0a0a09] border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block">
                  04 / SEARCH ARCHITECTURE &amp; DISCOVERY
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white">
                  Technical Search Optimization &amp; Digital Footprint
                </h2>
                <p className="text-neutral-300 font-sans text-sm md:text-base leading-relaxed font-light text-justify">
                  Search discoverability is an engineering discipline requiring semantic Schema.org entity networks, Core Web Vitals optimization, and generative answer engine indexing (GEO/AEO). To review our specific organic search frameworks and localized map strategies:
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/seo-mastery" className="inline-flex items-center gap-2 text-xs font-mono bg-white/10 hover:bg-[#ccff00] hover:text-black text-white px-4 py-2 rounded-none transition-colors uppercase font-bold tracking-wider">
                    Enterprise Technical SEO Hub →
                  </Link>
                  <Link to="/local-seo-for-small-business" className="inline-flex items-center gap-2 text-xs font-mono border border-white/20 hover:border-[#ccff00] text-neutral-300 hover:text-[#ccff00] px-4 py-2 rounded-none transition-colors uppercase font-bold tracking-wider">
                    Local Maps &amp; Citation Strategy →
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-4 bg-zinc-950 border border-white/10 rounded-xl p-6 space-y-3">
                <div className="text-xs font-mono text-[#ccff00] font-bold uppercase tracking-wider">Knowledge Graph Entity Integration</div>
                <div className="text-sm font-sans text-white font-semibold">Specialized Practice Linking</div>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  Our homepage acts as an institutional knowledge hub, distributing contextual authority to dedicated technical practices across software, mobile engineering, AI agents, and search optimization.
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
                Why Global Businesses Choose AbuQitmirLabs
              </h2>
              <p className="text-neutral-300 font-sans leading-relaxed text-sm md:text-base font-light text-justify">
                Operating proudly as an elite software engineering studio based in Karachi, Pakistan, AbuQitmirLabs combines international delivery standards with optimal capital efficiency. When international leadership teams choose to work with us, they gain direct access to senior software architects, test-driven development methodologies, and 100% intellectual property ownership without administrative bureaucracy.
              </p>
              <p className="text-neutral-400 font-sans leading-relaxed text-sm font-light text-justify">
                Whether you are launching a new FinTech venture, scaling an e-commerce infrastructure, or automating enterprise operations with autonomous AI agents, AbuQitmirLabs stands ready to design, deploy, and support your computational assets.
              </p>
            </div>
            <div className="lg:col-span-4 bg-[#0a0a09] border border-white/10 rounded-2xl p-6 text-center lg:text-left space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ccff00] font-bold block">ENGINEERING HUB METRICS</span>
              <h3 className="text-lg font-serif italic text-white">Karachi, Pakistan</h3>
              <p className="text-xs text-neutral-400 font-mono leading-relaxed uppercase">
                ACTIVE LAB • ZERO-TRUST ARCHITECTURE • 100% SOURCE REPO HANDOVER
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
            Start your project today.
          </h2>
          <p className="text-zinc-400 mb-12 text-sm md:text-base font-sans tracking-wide">
            Complimentary technical consultation available with our senior engineering leads.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <a
              id="cta-whatsapp-link"
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25d366]/10 text-[#25d366] hover:bg-[#25d366]/20 font-sans text-xs tracking-[0.14em] uppercase border border-[#25d366]/20 px-8 py-4 rounded-full transition-all duration-300 h-14"
              aria-label="Message on WhatsApp"
            >
              💬 <span className="normal-case">Message on WhatsApp (+92 323 3260859)</span>
            </a>
            <div className="flex flex-col gap-2">
              <a
                id="cta-email-link-corporate"
                href="mailto:hello@abuqitmirlabs.tech"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 text-zinc-200 hover:bg-white/10 font-sans text-xs tracking-[0.14em] uppercase border border-white/20 px-8 py-3.5 rounded-full transition-all duration-300"
                aria-label="Send Email to hello@abuqitmirlabs.tech"
              >
                📧 <span className="normal-case font-mono font-medium tracking-tight">hello@abuqitmirlabs.tech</span>
              </a>
              <a
                id="cta-email-link-personal"
                href="mailto:abuqitmirshirazalmadani@gmail.com"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 text-zinc-400 hover:bg-white/10 font-sans text-[10px] tracking-[0.14em] uppercase border border-white/10 px-8 py-2 rounded-full transition-all duration-300"
                aria-label="Send Email to abuqitmirshirazalmadani@gmail.com"
              >
                📧 <span className="normal-case font-mono font-medium tracking-tight">abuqitmirshirazalmadani@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

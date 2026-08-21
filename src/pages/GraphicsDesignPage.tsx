"use client";

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Layers, 
  MousePointer2, 
  Share2, 
  FileText, 
  Plus,
  Monitor,
  Layout,
  Figma,
  PenTool,
  Image as ImageIcon,
  Video,
  ArrowRight,
  ArrowUpRight,
  Crosshair,
  Sparkles,
  Zap,
  Check,
  Search,
  CheckCircle2,
  TrendingUp,
  Globe,
  Settings,
  HelpCircle,
  Clock,
  BookOpen,
  Code2,
  Smartphone,
  Cpu,
  Package,
  Presentation,
  Megaphone,
  Briefcase,
  MapPin,
  Compass
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import GraphicsDesignPricing from '../components/GraphicsDesignPricing';
import { graphicsDesignSchema } from '../utils/graphicsDesignStaticHtml';

const GraphicsDesignPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const servicesList = [
    {
      num: "01",
      icon: <Palette className="w-8 h-8 text-[#ccff00]" />,
      title: "Logo Design",
      desc: "Distinctive, memorable logos that anchor your brand identity. We craft scalable vector logo lockups — primary marks, wordmarks, badges, and micro-favicons — engineered for cross-media clarity.",
      features: [
        "Primary Mark, Wordmark & Sub-Mark Variations",
        "Vector Master Files (SVG, AI, EPS, PDF)",
        "Monochrome & Dark Mode Color Inversions",
        "Iconography & Favicon Formatting"
      ]
    },
    {
      num: "02",
      icon: <Layers className="w-8 h-8 text-[#ccff00]" />,
      title: "Brand Identity Design",
      desc: "Comprehensive visual identity systems that translate strategic positioning into a cohesive design language. We create clear brand manuals, typography hierarchies, and color palettes.",
      features: [
        "Exhaustive Brand Guideline Manuals",
        "Typography Scales & Font Pairing Rules",
        "WCAG-Compliant Primary & Secondary Color Palettes",
        "Custom Brand Patterns & Graphic Accents"
      ]
    },
    {
      num: "03",
      icon: <Share2 className="w-8 h-8 text-[#ccff00]" />,
      title: "Social Media Graphic Design",
      desc: "High-engagement visual content tailored for modern feeds. We build editable templates, educational carousels, animated story layouts, and paid ad creative for major social platforms.",
      features: [
        "Editable Figma & Canva Post Templates",
        "Multi-Slide High-Engagement Carousels",
        "Profile Banners & Channel Art",
        "Paid Ad Creatives for Meta & LinkedIn"
      ]
    },
    {
      num: "04",
      icon: <Megaphone className="w-8 h-8 text-[#ccff00]" />,
      title: "Marketing & Advertising Design",
      desc: "Performance-driven advertising creative and digital marketing collateral designed to capture attention, communicate value propositions, and maximize click-through rates.",
      features: [
        "Google Display Network & Retargeting Banners",
        "Downloadable Whitepapers & Lead Magnets",
        "Email Newsletter Graphics & Templates",
        "Promotional Event Graphics & Hero Banners"
      ]
    },
    {
      num: "05",
      icon: <Presentation className="w-8 h-8 text-[#ccff00]" />,
      title: "Pitch Deck & Presentation Design",
      desc: "Investor-ready slide decks and corporate keynote presentations. We transform complex financial projections, architecture diagrams, and product roadmaps into compelling visual stories.",
      features: [
        "Venture Capital Pitch Decks (Seed / Series A)",
        "Enterprise Sales & Demo Presentations",
        "Custom Data Charts & Infographic Elements",
        "Interactive Keynotes in Figma & PowerPoint"
      ]
    },
    {
      num: "06",
      icon: <Layout className="w-8 h-8 text-[#ccff00]" />,
      title: "UI/UX Design",
      desc: "Intuitive, high-converting digital product interfaces for websites and web/mobile apps. We design user flows, wireframes, prototypes, and design systems in Figma.",
      features: [
        "Figma Wireframes & Interactive Prototypes",
        "Atomic Design Systems & Component Tokens",
        "Responsive Web & Mobile Application Screens",
        "Seamless Synergy with Frontend Engineering"
      ]
    },
    {
      num: "07",
      icon: <FileText className="w-8 h-8 text-[#ccff00]" />,
      title: "Print & Marketing Collateral",
      desc: "Tangible marketing assets engineered with exact print calibrations. We design brochures, business cards, letterheads, and trade show displays ready for offset and digital press.",
      features: [
        "Multi-Page Corporate Brochures & Catalogs",
        "Executive Business Cards & Stationery Suites",
        "Exhibition Booth Graphics & Roll-Up Banners",
        "Print-Ready 300 DPI CMYK PDFs with Bleed"
      ]
    },
    {
      num: "08",
      icon: <Package className="w-8 h-8 text-[#ccff00]" />,
      title: "Packaging Design",
      desc: "Custom packaging, box dielines, and product labels designed for retail shelf presence and delightful e-commerce unboxing experiences.",
      features: [
        "Custom Structural Dielines & Box Packaging",
        "Product Bottle & Pouch Labels",
        "Photorealistic 3D Product Mockups",
        "E-Commerce Branded Shipping Inserts"
      ]
    },
    {
      num: "09",
      icon: <Briefcase className="w-8 h-8 text-[#ccff00]" />,
      title: "Business & Corporate Graphics",
      desc: "Institutional graphics that convey stability and governance. We format corporate annual reports, executive one-sheeters, case studies, and internal compliance materials.",
      features: [
        "Corporate Annual & ESG Impact Reports",
        "Executive Summaries & Investment Memorandums",
        "Client Case Study Layouts & One-Pagers",
        "Internal Policy & Training Documentation"
      ]
    },
    {
      num: "10",
      icon: <PenTool className="w-8 h-8 text-[#ccff00]" />,
      title: "Custom Graphic Design",
      desc: "Bespoke creative solutions tailored for unique technical requirements. From custom vector illustration suites and iconography to environmental graphic design (branded office signage, wayfinding systems, and exhibition booth graphics) and dedicated monthly design retainers.",
      features: [
        "Custom Vector Illustration Suites",
        "Environmental Signage & Wayfinding Graphics",
        "Custom Icon Sets & Infographics",
        "Dedicated Monthly Design Retainers"
      ]
    }
  ];

  const processSteps = [
    {
      num: "01",
      name: "Discovery",
      desc: "We analyze your business goals, target audience, brand positioning, and project requirements in an initial discovery session."
    },
    {
      num: "02",
      name: "Research",
      desc: "We perform visual competitor audits, study industry aesthetic benchmarks, and research audience visual preferences."
    },
    {
      num: "03",
      name: "Creative Direction",
      desc: "We curate mood boards, typography options, and color palette directions to establish consensus before drafting."
    },
    {
      num: "04",
      name: "Concept Development",
      desc: "Our designers produce 2 to 3 distinct creative concepts with documented strategic rationale for each direction."
    },
    {
      num: "05",
      name: "Design Production",
      desc: "We translate approved concepts into full digital vector assets, UI layouts, collateral mockups, or print-ready layouts."
    },
    {
      num: "06",
      name: "Review & Refinement",
      desc: "We conduct structured feedback rounds, fine-tuning typography kerning, proportions, contrast, and alignment."
    },
    {
      num: "07",
      name: "Final Delivery",
      desc: "We export deliverables into all required formats: vector EPS/SVG/AI, high-res CMYK PDFs, and optimized PNG/WebP files."
    },
    {
      num: "08",
      name: "Brand Asset Handoff",
      desc: "We deliver organized cloud asset libraries and full brand guideline documentation, transferring 100% IP ownership."
    }
  ];

  const techStack = [
    { category: "Prototyping & UI/UX", items: ["Figma", "Adobe XD"], icon: <Monitor className="text-zinc-500" /> },
    { category: "Vector & Branding", items: ["Adobe Illustrator", "CorelDRAW"], icon: <PenTool className="text-zinc-500" /> },
    { category: "Photo Manipulation", items: ["Adobe Photoshop", "Lightroom"], icon: <ImageIcon className="text-zinc-500" /> },
    { category: "Motion & Video", items: ["After Effects", "Premiere Pro", "Canva Pro"], icon: <Video className="text-zinc-500" /> }
  ];

  const faqData = [
    {
      q: "What is graphic design and what services does AbuQitmirLabs provide?",
      a: "Graphic design is the discipline of visual communication, combining typography, color palettes, iconography, and structured layout systems to convey business messages and build brand recognition. AbuQitmirLabs provides commercial graphic design services including custom logo design, comprehensive brand identity systems, social media assets, investor pitch decks, marketing collateral, UI/UX interfaces in Figma, and print packaging."
    },
    {
      q: "What do graphic designers do for growing businesses?",
      a: "Professional graphic designers translate business positioning and marketing strategies into functional visual assets. They design scalable vector logos, establish typography and color guidelines, create high-converting ad creative and social media layouts, structure pitch decks, and build design systems that maintain consistency across all digital and physical touchpoints."
    },
    {
      q: "What is environmental graphic design?",
      a: "Environmental graphic design is the multidisciplinary practice of integrating visual communication, typography, iconography, and spatial branding into physical and architectural environments. It encompasses wayfinding systems, corporate office signage, exhibition booth displays, and retail graphics that unite physical spaces with digital brand systems."
    },
    {
      q: "How do I find a graphic designer near me and how does remote collaboration work?",
      a: "Businesses searching for a graphic designer near me or graphics design near me can collaborate with AbuQitmirLabs remotely. We deliver full-spectrum graphic design worldwide through shared Figma workspaces, structured milestone reviews, and async communication, delivering vector master files with 100% intellectual property ownership regardless of physical location."
    },
    {
      q: "What are the best SEO keywords for graphic designers and creative agencies?",
      a: "The best SEO keywords for graphic designers combine high-intent commercial terms (graphic design services, professional graphic design services, graphic design company), service-specific keywords (logo design services, brand identity design, pitch deck design), local search terms (graphic design near me), and informational queries (what is graphic design, environmental graphic design)."
    },
    {
      q: "What is graphic design for brand identity?",
      a: "Graphic design for brand identity is the creation of a unified visual ecosystem that defines how a company presents itself. Unlike standalone ad designs, brand identity design includes primary and secondary logos, brand guidelines, typographic hierarchies, WCAG-compliant color palettes, and custom graphic accents engineered for long-term recognition."
    },
    {
      q: "How much does professional graphic design cost?",
      a: "The cost of professional graphic design depends on project scope, strategic research depth, deliverable formats, and revision cycles. Focused deliverables like custom logo packages or pitch decks have distinct starter scopes, while enterprise brand identity systems and full UI/UX design systems require comprehensive planning. We provide transparent upfront quotes during discovery."
    },
    {
      q: "How long does a graphic design project take?",
      a: "Project timelines depend on complexity and iteration requirements. Focused creative assets such as standalone logo lockups or pitch decks typically take 1 to 2 weeks. Comprehensive brand identity systems, full design manuals, or multi-screen UI/UX design projects generally require 3 to 6 weeks from kickoff to final asset delivery."
    }
  ];

  return (
    <div className="bg-[#050505] text-neutral-300 font-sans antialiased overflow-x-hidden min-h-screen relative selection:bg-[#ccff00] selection:text-black">
      <Helmet>
        <title>Graphic Design Services for Brands &amp; Businesses | AbuQitmirLabs</title>
        <meta name="description" content="Professional graphic design services for brands and businesses: custom logos, brand identity, pitch decks, UI/UX, and marketing collateral with AbuQitmirLabs." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/graphics-design" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Graphic Design Services for Brands &amp; Businesses | AbuQitmirLabs" />
        <meta property="og:description" content="Professional graphic design services for brands and businesses: custom logos, brand identity, pitch decks, UI/UX, and marketing collateral with AbuQitmirLabs." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/graphics-design" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AbuQitmirLabs" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AbuQitmir" />
        <meta name="twitter:title" content="Graphic Design Services for Brands &amp; Businesses | AbuQitmirLabs" />
        <meta name="twitter:description" content="Professional graphic design services for brands and businesses: custom logos, brand identity, pitch decks, UI/UX, and marketing collateral with AbuQitmirLabs." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Structured Data Graph */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(graphicsDesignSchema)
          }}
        />
      </Helmet>
      
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] w-full flex items-center pt-24 md:pt-32 pb-16 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 md:left-[35%] z-0 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop&fm=webp" 
            alt="Abstract geometric brand identity and graphic design visualization" 
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity grayscale contrast-150"
            loading="eager"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            width="1600"
            height="900"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent"></div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse"></span>
              <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-neutral-400">AbuQitmirLabs Creative Engineering</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05] mb-8"
            >
              Professional Graphic Design Services for <br />
              <span className="text-[#ccff00]">Brands &amp; Businesses</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg md:text-xl font-light text-neutral-300 leading-relaxed mb-10"
            >
              Good design communicates authority before a single word is read. AbuQitmirLabs delivers strategic, custom graphic design services — from distinctive logo design and comprehensive brand identity systems to high-converting marketing collateral, investor pitch decks, and Figma UI/UX design. We help startups and established enterprises turn visual communication into a measurable competitive advantage.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10 p-6 bg-white/[0.02] border border-white/10 rounded-2xl"
            >
              {[
                "Brand Identity & Logo Systems",
                "Figma UI/UX & Design Systems",
                "Investor Pitch Decks & Collateral",
                "Social Media & Ad Creative",
                "Packaging & Print Assets",
                "100% Vector IP Ownership"
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#ccff00] shrink-0"></span>
                  <span className="text-xs md:text-sm font-medium text-white">{bullet}</span>
                </div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-5"
            >
              <Link 
                to="/contact" 
                className="px-8 py-4 rounded-xl bg-[#ccff00] text-black text-sm font-bold uppercase tracking-wider hover:bg-white transition-all transform hover:-translate-y-0.5"
              >
                Start a Graphic Design Project
              </Link>
              <a 
                href="#services" 
                className="px-8 py-4 rounded-xl border border-white/20 text-white text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-all"
              >
                Explore Design Capabilities
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Accent */}
      <div className="border-y border-white/5 bg-white/[0.02] py-8 backdrop-blur-3xl overflow-hidden relative z-20">
        <div className="flex whitespace-nowrap w-max animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-20 items-center px-10">
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase opacity-20">cohesive brand identity</span>
              <Sparkles className="text-[#ccff00] opacity-40" size={40} />
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent uppercase" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>user-centric UI/UX layout</span>
              <Sparkles className="text-[#ccff00] opacity-40" size={40} />
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase opacity-20">differentiated branding visuals</span>
              <Sparkles className="text-[#ccff00] opacity-40" size={40} />
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent uppercase" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>scalable design systems</span>
              <Sparkles className="text-[#ccff00] opacity-40" size={40} />
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase opacity-20">custom logo design services</span>
              <Sparkles className="text-[#ccff00] opacity-40" size={40} />
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent uppercase" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>premium marketing collateral</span>
              <Sparkles className="text-[#ccff00] opacity-40" size={40} />
            </div>
          ))}
        </div>
      </div>

      {/* SECTION: Graphic Design Services That Build Stronger Brands */}
      <section className="py-24 md:py-32 bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold text-[#ccff00] uppercase tracking-[0.3em] block mb-4">// BRAND ACCELERATION</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight mb-6">
              Graphic Design Services That Build Stronger Brands
            </h2>
            <p className="text-base md:text-lg font-light text-neutral-300 leading-relaxed">
              In competitive global markets, visual perception directly influences customer trust, pricing power, and conversion rates. Many organizations struggle with fractured visuals — an outdated logo, mismatched color palettes across digital channels, amateur slide presentations, or inconsistent social media graphics. This visual friction weakens credibility and dilutes marketing spend.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl hover:border-[#ccff00]/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#ccff00] mb-6">
                <Crosshair className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-3">Strategic Visual Hierarchy</h3>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">
                We design layouts rooted in cognitive ergonomics and optical balance. Every typography scale, contrast ratio, and whitespace margin guides your customer's eye toward key value propositions and conversion actions.
              </p>
            </div>

            <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl hover:border-[#ccff00]/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#ccff00] mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-3">Cross-Platform Cohesion</h3>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">
                From your corporate website and native mobile apps to your sales proposals and LinkedIn campaigns, our graphic design systems ensure consistent, premium recognition across every physical and digital touchpoint.
              </p>
            </div>

            <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl hover:border-[#ccff00]/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#ccff00] mb-6">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-3">Synergy with Engineering</h3>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">
                Unlike traditional design agencies that operate in isolation, our creative studio collaborates directly with our <Link to="/web-development" className="text-[#ccff00] hover:underline">web development</Link>, <Link to="/mobile-app-development" className="text-[#ccff00] hover:underline">mobile app</Link>, and <Link to="/custom-software" className="text-[#ccff00] hover:underline">custom software</Link> engineers to guarantee seamless implementation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Our Graphic Design Services (10 H3s) */}
      <section id="services" className="py-24 md:py-32 bg-[#050505] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <span className="text-xs font-mono font-bold text-[#ccff00] uppercase tracking-[0.3em] block mb-4">// CORE CAPABILITIES</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight mb-6">
              Our Graphic Design Services
            </h2>
            <p className="text-base md:text-lg font-light text-neutral-300 leading-relaxed">
              We provide full-lifecycle visual design capabilities tailored to businesses seeking distinctive, conversion-engineered creative assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesList.map((srv, idx) => (
              <div key={idx} className="p-8 bg-zinc-950 border border-white/5 rounded-3xl hover:border-[#ccff00]/30 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-[#ccff00] font-bold">// {srv.num}</span>
                    <div className="p-3 bg-zinc-900 border border-white/5 rounded-xl group-hover:border-[#ccff00]/30 transition-colors">
                      {srv.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">{srv.title}</h3>
                  <p className="text-sm font-light text-neutral-300 leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-white/5">
                  {srv.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2.5 text-xs text-neutral-400 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Graphic Design for Brand Identity */}
      <section className="py-24 md:py-32 bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold text-[#ccff00] uppercase tracking-[0.3em] block mb-4">// STRATEGIC FOUNDATIONS</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight mb-6">
              Graphic Design for Brand Identity
            </h2>
            <p className="text-base md:text-lg font-light text-neutral-300 leading-relaxed">
              Graphic design for brand identity is the disciplined process of translating a company's mission, market position, and emotional promise into an interconnected visual language. Rather than treating individual graphics as isolated tasks, identity engineering creates an organized system where every visual element reinforces corporate credibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl">
              <span className="text-xs font-mono text-[#ccff00] block mb-2">// 01</span>
              <h3 className="text-lg font-bold text-white uppercase mb-3">Strategic Logo Architecture</h3>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">
                Your logo is the core identifier of your business. We design primary marks, secondary wordmarks, and responsive micro-icons that maintain geometric clarity from 16px favicons to building signage.
              </p>
            </div>

            <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl">
              <span className="text-xs font-mono text-[#ccff00] block mb-2">// 02</span>
              <h3 className="text-lg font-bold text-white uppercase mb-3">Typographic Hierarchy</h3>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">
                Typography conveys brand tone and guides optical reading order. We select and pair distinctive display fonts with legible body typefaces, defining line heights, letter-spacing, and responsive scales.
              </p>
            </div>

            <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl">
              <span className="text-xs font-mono text-[#ccff00] block mb-2">// 03</span>
              <h3 className="text-lg font-bold text-white uppercase mb-3">Cohesive Color Systems</h3>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">
                Color evokes psychological associations and anchors memory. We construct primary, secondary, and accent palettes calibrated for digital screens (sRGB, P3) and offset printing (CMYK, Pantone).
              </p>
            </div>

            <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl">
              <span className="text-xs font-mono text-[#ccff00] block mb-2">// 04</span>
              <h3 className="text-lg font-bold text-white uppercase mb-3">Custom Graphic Language</h3>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">
                Supporting graphic assets — such as custom iconography, textured background patterns, grid lines, and decorative badges — give your marketing materials a proprietary, unmistakably branded feel.
              </p>
            </div>

            <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl">
              <span className="text-xs font-mono text-[#ccff00] block mb-2">// 05</span>
              <h3 className="text-lg font-bold text-white uppercase mb-3">Brand Consistency Rules</h3>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">
                A brand identity is only as effective as its execution. Our comprehensive brand manuals detail clear rules for minimum clearspace, incorrect usage prohibitions, co-branding lockups, and digital asset export standards.
              </p>
            </div>

            <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl">
              <span className="text-xs font-mono text-[#ccff00] block mb-2">// 06</span>
              <h3 className="text-lg font-bold text-white uppercase mb-3">Long-Term Asset Scalability</h3>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">
                We deliver organized asset directories containing vector masters and web-optimized formats, ensuring your in-house team, external contractors, and media partners apply your brand accurately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Graphic Design for Startups and Growing Businesses */}
      <section className="py-24 md:py-32 bg-[#050505] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold text-[#ccff00] uppercase tracking-[0.3em] block mb-4">// SECTOR ADAPTABILITY</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight mb-6">
              Graphic Design for Startups and Growing Businesses
            </h2>
            <p className="text-base md:text-lg font-light text-neutral-300 leading-relaxed">
              Different business models and industry sectors face unique visual communication challenges. We engineer targeted design solutions tailored to the operational realities of high-growth sectors:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-zinc-950 border border-white/5 rounded-2xl hover:border-zinc-800 transition-colors">
              <h3 className="text-lg font-bold text-white uppercase mb-3">Startups &amp; SaaS</h3>
              <p className="text-xs font-light text-neutral-400 leading-relaxed">
                We build modern tech branding, intuitive product UI mockups, and high-converting landing page graphics that help early-stage ventures validate product-market fit and secure investor capital.
              </p>
            </div>

            <div className="p-6 bg-zinc-950 border border-white/5 rounded-2xl hover:border-zinc-800 transition-colors">
              <h3 className="text-lg font-bold text-white uppercase mb-3">Fintech &amp; Banking</h3>
              <p className="text-xs font-light text-neutral-400 leading-relaxed">
                Financial applications require visual clarity and institutional trust. Explore our specialized <Link to="/solutions/fintech" className="text-[#ccff00] hover:underline">fintech software solutions</Link> designed with security-focused graphic styling.
              </p>
            </div>

            <div className="p-6 bg-zinc-950 border border-white/5 rounded-2xl hover:border-zinc-800 transition-colors">
              <h3 className="text-lg font-bold text-white uppercase mb-3">Healthcare &amp; Life Sciences</h3>
              <p className="text-xs font-light text-neutral-400 leading-relaxed">
                We design patient-friendly educational diagrams, clinic identity systems, and accessible digital portals in alignment with our <Link to="/solutions/healthcare" className="text-[#ccff00] hover:underline">healthcare platforms</Link>.
              </p>
            </div>

            <div className="p-6 bg-zinc-950 border border-white/5 rounded-2xl hover:border-zinc-800 transition-colors">
              <h3 className="text-lg font-bold text-white uppercase mb-3">E-Commerce &amp; DTC</h3>
              <p className="text-xs font-light text-neutral-400 leading-relaxed">
                High-converting product packaging, hero banner creatives, and social ad campaigns that drive direct-to-consumer sales and repeat brand loyalty across global retail channels.
              </p>
            </div>

            <div className="p-6 bg-zinc-950 border border-white/5 rounded-2xl hover:border-zinc-800 transition-colors">
              <h3 className="text-lg font-bold text-white uppercase mb-3">Professional Services</h3>
              <p className="text-xs font-light text-neutral-400 leading-relaxed">
                Law firms, consultancies, and accounting practices gain authoritative corporate stationery, polished whitepapers, and presentation decks that communicate high-tier expertise.
              </p>
            </div>

            <div className="p-6 bg-zinc-950 border border-white/5 rounded-2xl hover:border-zinc-800 transition-colors">
              <h3 className="text-lg font-bold text-white uppercase mb-3">EdTech &amp; Education</h3>
              <p className="text-xs font-light text-neutral-400 leading-relaxed">
                Engaging learning interface graphics, course completion certificates, and recruitment collateral that inspire students and establish academic excellence.
              </p>
            </div>

            <div className="p-6 bg-zinc-950 border border-white/5 rounded-2xl hover:border-zinc-800 transition-colors">
              <h3 className="text-lg font-bold text-white uppercase mb-3">AI &amp; Cognitive Tech</h3>
              <p className="text-xs font-light text-neutral-400 leading-relaxed">
                Visualizing complex neural workflows and multi-agent coordination. Discover how design reinforces our bespoke <Link to="/ai-agent-development" className="text-[#ccff00] hover:underline">AI agent development</Link>.
              </p>
            </div>

            <div className="p-6 bg-zinc-950 border border-white/5 rounded-2xl hover:border-zinc-800 transition-colors">
              <h3 className="text-lg font-bold text-white uppercase mb-3">Search Visibility Synergy</h3>
              <p className="text-xs font-light text-neutral-400 leading-relaxed">
                While researching SEO keywords for graphic design or the best keywords for graphic designers shapes digital marketing strategy, graphic design itself delivers the visual structure, layout clarity, and lightweight vector assets (SVG, WebP) that convert organic traffic. Explore how our visual systems integrate directly with our <Link to="/seo-mastery" className="text-[#ccff00] hover:underline">SEO services</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Our Graphic Design Process (8 Steps) */}
      <section className="py-24 md:py-32 bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold text-[#ccff00] uppercase tracking-[0.3em] block mb-4">// EXECUTION FRAMEWORK</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight mb-6">
              Our Graphic Design Process
            </h2>
            <p className="text-base md:text-lg font-light text-neutral-300 leading-relaxed">
              Great visual design is not accidental; it is the result of a disciplined, repeatable engineering workflow. Our 8-step process guarantees strategic alignment and high production quality:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((stp, idx) => (
              <div key={idx} className="p-6 bg-zinc-950 border border-white/5 rounded-2xl hover:border-[#ccff00]/30 transition-colors flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-[#ccff00] font-bold block mb-2">STEP {stp.num}</span>
                  <h3 className="text-lg font-bold text-white uppercase mb-2">{stp.name}</h3>
                  <p className="text-xs font-light text-neutral-400 leading-relaxed">{stp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Graphic Design vs Brand Identity */}
      <section className="py-24 md:py-32 bg-[#050505] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold text-[#ccff00] uppercase tracking-[0.3em] block mb-4">// CONCEPTUAL DEFINITION</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight mb-6">
              Graphic Design vs Brand Identity
            </h2>
            <p className="text-base md:text-lg font-light text-neutral-300 leading-relaxed">
              <strong>What is the difference between graphic design and brand identity?</strong> Graphic design is the broader craft of visual communication — creating individual visual assets such as flyers, social banners, and pitch decks. Brand identity is the comprehensive strategic system that defines how a company looks, feels, and communicates consistently across every customer interaction.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-white/10 bg-zinc-950 rounded-2xl overflow-hidden text-sm font-sans">
              <thead>
                <tr className="bg-zinc-900 border-b border-white/10 text-white font-mono text-xs uppercase tracking-wider">
                  <th className="p-6 border-r border-white/10">Dimension</th>
                  <th className="p-6 border-r border-white/10 text-[#ccff00]">Graphic Design</th>
                  <th className="p-6 text-white">Brand Identity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300 font-light">
                <tr>
                  <td className="p-6 font-mono text-xs text-white border-r border-white/10">Core Focus</td>
                  <td className="p-6 border-r border-white/10">Executing specific visual deliverables (e.g., ad banner, brochure, slide deck).</td>
                  <td className="p-6">Building the foundational visual and psychological system for the entire company.</td>
                </tr>
                <tr>
                  <td className="p-6 font-mono text-xs text-white border-r border-white/10">Scope</td>
                  <td className="p-6 border-r border-white/10">Project-based or campaign-specific visual assets.</td>
                  <td className="p-6">Holistic corporate ecosystem (logo, typography, colors, guidelines, tone).</td>
                </tr>
                <tr>
                  <td className="p-6 font-mono text-xs text-white border-r border-white/10">Longevity</td>
                  <td className="p-6 border-r border-white/10">Short to medium-term (often refreshed with seasonal marketing campaigns).</td>
                  <td className="p-6">Long-term (engineered to endure for 5 to 10+ years as the brand scales).</td>
                </tr>
                <tr>
                  <td className="p-6 font-mono text-xs text-white border-r border-white/10">Deliverable Output</td>
                  <td className="p-6 border-r border-white/10">Raster and vector files formatted for specific channel dimensions.</td>
                  <td className="p-6">Exhaustive brand style guide, logo lockup suite, design tokens, and master vector kits.</td>
                </tr>
                <tr>
                  <td className="p-6 font-mono text-xs text-white border-r border-white/10">Business Impact</td>
                  <td className="p-6 border-r border-white/10">Increases immediate click-through rates, presentation clarity, and campaign ROI.</td>
                  <td className="p-6">Establishes long-term brand equity, premium pricing power, and customer trust.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION: Strategic Design Decisions (Agencies vs Firms, Local/Remote, Environmental, SEO Keywords) */}
      <section className="py-24 md:py-32 bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <span className="text-xs font-bold text-[#ccff00] uppercase tracking-[0.4em] block mb-4">// DESIGN STRATEGY</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
              Strategic Design Decisions
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-base font-light leading-relaxed">
              Behind every line, color, and grid is a deliberate rationale built around your business goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-950 border border-white/5 p-8 md:p-10 rounded-3xl hover:border-[#ccff00]/30 transition-all duration-300">
              <div className="mb-6 w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#ccff00]">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4 text-white">
                Agencies vs. Firms: The Real Difference
              </h3>
              <p className="text-sm font-light text-zinc-400 leading-relaxed mb-4">
                Among <strong>graphic design companies</strong>, the difference between a strong partner and a weak one usually isn't raw creative talent — most <strong>graphic design firms</strong> can produce visually appealing work.
              </p>
              <p className="text-sm font-light text-zinc-400 leading-relaxed">
                The real difference is whether design decisions are grounded in a documented rationale (brand strategy, user research, business goals) or made on aesthetic instinct alone. As an <strong>agency for graphic design</strong> that works closely with our software, <Link to="/content-writing" className="text-[#ccff00] hover:underline">content writing</Link>, and engineering teams, our design output is built to function inside a broader digital strategy.
              </p>
            </div>

            <div id="local-remote-design" className="bg-zinc-950 border border-white/5 p-8 md:p-10 rounded-3xl hover:border-[#ccff00]/30 transition-all duration-300">
              <div className="mb-6 w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#ccff00]">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4 text-white">
                Looking for a Graphic Designer Near You?
              </h3>
              <p className="text-sm font-light text-zinc-400 leading-relaxed mb-4">
                When businesses search for a <strong>graphic designer near me</strong>, <strong>graphic design near me</strong>, or <strong>graphics design near me</strong>, the modern deciding factor is rarely physical geography—creative collaboration today is digital and asynchronous.
              </p>
              <p className="text-sm font-light text-zinc-400 leading-relaxed">
                AbuQitmirLabs delivers full-spectrum graphic design remotely for startups and growing enterprises globally (including logo design, brand identity, social media graphics, pitch decks, UI/UX design, packaging, and marketing collateral) through a seamless 5-stage remote workflow: <strong>Discovery &rarr; Figma Collaboration &rarr; Async Communication &rarr; Milestone Revisions &rarr; Final Production Vector Files</strong> with 100% IP ownership.
              </p>
            </div>

            <div id="environmental-graphic-design" className="bg-zinc-950 border border-white/5 p-8 md:p-10 rounded-3xl hover:border-[#ccff00]/30 transition-all duration-300">
              <div className="mb-6 w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#ccff00]">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4 text-white">
                Environmental Graphic Design &amp; Spatial Systems
              </h3>
              <p className="text-sm font-light text-zinc-400 leading-relaxed mb-4">
                <strong>Environmental graphic design</strong> (EGD) is the discipline of connecting people to places through visual communication. It unites wayfinding systems, architectural signage, spatial branding, exhibition graphics, and retail environments with a company's core visual identity.
              </p>
              <p className="text-sm font-light text-zinc-400 leading-relaxed">
                AbuQitmirLabs provides digital and print-ready visual-system development, architectural layout specifications, dimensional typography standards, and high-resolution vector artwork that ensure seamless aesthetic consistency across corporate headquarters, trade show booths, and retail touchpoints.
              </p>
            </div>

            <div id="seo-keywords-graphic-design" className="bg-zinc-950 border border-white/5 p-8 md:p-10 rounded-3xl hover:border-[#ccff00]/30 transition-all duration-300">
              <div className="mb-6 w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#ccff00]">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4 text-white">
                SEO Keywords &amp; Search Strategy for Graphic Designers
              </h3>
              <p className="text-sm font-light text-zinc-400 leading-relaxed mb-4">
                Understanding <strong>seo keywords for graphic design</strong> helps design businesses structure digital discovery. What are the <strong>best keywords for graphic designers</strong>? Effective keyword architecture separates search queries by intent:
              </p>
              <ul className="text-xs font-light text-zinc-400 space-y-1.5 list-disc list-inside">
                <li><strong className="text-zinc-200">Commercial:</strong> <em>graphic design services</em>, <em>professional graphic design services</em>, <em>graphic design company</em></li>
                <li><strong className="text-zinc-200">Service-Specific:</strong> <em>logo design services</em>, <em>brand identity design</em>, <em>pitch deck design</em>, <em>packaging design</em></li>
                <li><strong className="text-zinc-200">Local &amp; Conversational:</strong> <em>graphic design near me</em>, <em>graphics design near me</em>, <em>graphic designer near me</em></li>
                <li><strong className="text-zinc-200">Informational:</strong> <em>what is graphic design</em>, <em>what do graphic designers do</em>, <em>environmental graphic design</em></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 bg-[#0a0a0a] overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <span className="text-xs font-bold text-[#ccff00] uppercase tracking-[0.4em] block mb-4">[ TECHNOLOGY &amp; TOOLKIT ]</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight leading-none">
                Our Creative Stack
              </h2>
            </div>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest max-w-xs">Industrial-grade tools ensuring pixel-perfect vector scalability and motion fidelity.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((stack, i) => (
              <div key={i} className="group p-8 border border-white/5 bg-[#050505] rounded-2xl hover:border-[#ccff00]/30 transition-all duration-300 flex flex-col items-center text-center">
                <div className="mb-6 w-12 h-12 rounded-xl bg-black border border-white/5 flex items-center justify-center group-hover:bg-[#ccff00] group-hover:text-black transition-colors duration-300">
                  {React.cloneElement(stack.icon as React.ReactElement<any>, { size: 20 })}
                </div>
                <h4 className="text-lg font-bold text-white uppercase tracking-tight mb-4 pb-3 border-b border-white/5 leading-none w-full">{stack.category}</h4>
                <ul className="space-y-2">
                  {stack.items.map((item, j) => (
                    <li key={j} className="text-zinc-400 font-light text-xs flex items-center gap-2 group-hover:text-white transition-colors">
                      <div className="w-1 h-1 bg-zinc-700 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: How Much Does Graphic Design Cost? & Pricing */}
      <section id="design-pricing" className="py-24 md:py-32 bg-[#050505] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold text-[#ccff00] uppercase tracking-[0.3em] block mb-4">// COMMERCIAL TRANSPARENCY</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight mb-6">
              How Much Does Graphic Design Cost?
            </h2>
            <p className="text-base md:text-lg font-light text-neutral-300 leading-relaxed">
              The cost of professional graphic design varies based on project complexity, strategic scope, and technical deliverable requirements. Rather than relying on generic template pricing, custom design investment is calculated based on several key factors:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl">
              <h3 className="text-lg font-bold text-white uppercase mb-3">Project Scope &amp; Deliverables</h3>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">
                A standalone vector logo mark requires less production time than an end-to-end corporate identity package including pitch decks, stationery suites, and social media component libraries.
              </p>
            </div>

            <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl">
              <h3 className="text-lg font-bold text-white uppercase mb-3">Strategic Research Depth</h3>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">
                Projects requiring in-depth competitor auditing, market research, and multiple creative concept iterations involve senior art directors and brand strategists.
              </p>
            </div>

            <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl">
              <h3 className="text-lg font-bold text-white uppercase mb-3">Format Complexity &amp; Licensing</h3>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">
                Deliverables requiring complex physical dielines, 3D packaging rendering, interactive Figma prototypes, or commercial font licensing entail specialized technical engineering.
              </p>
            </div>
          </div>

          {/* Pricing Component */}
          <GraphicsDesignPricing />
        </div>
      </section>

      {/* SECTION: Why Choose AbuQitmirLabs for Graphic Design? */}
      <section className="py-24 md:py-32 bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold text-[#ccff00] uppercase tracking-[0.3em] block mb-4">// OUR ADVANTAGES</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight mb-6">
              Why Choose AbuQitmirLabs for Graphic Design?
            </h2>
            <p className="text-base md:text-lg font-light text-neutral-300 leading-relaxed">
              AbuQitmirLabs operates as a unified software engineering and digital creative studio. When you partner with us, your visual design is backed by genuine technical and business rigor:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#ccff00] mb-6">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-3">In-House Design &amp; Code Synergy</h3>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">
                We eliminate the disconnect between graphic designers and software engineers. Our Figma designs translate directly into production-ready CSS, React components, and responsive mobile interfaces without aesthetic compromise.
              </p>
            </div>

            <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#ccff00] mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-3">100% Intellectual Property Ownership</h3>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">
                You retain complete legal ownership of all vector master files, exported assets, typography palettes, and custom illustrations. We never lock clients into proprietary hosting or hidden licensing restrictions.
              </p>
            </div>

            <div className="p-8 bg-zinc-950 border border-white/5 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#ccff00] mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-3">Transparent Remote Collaboration</h3>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">
                Whether you are looking for an <strong>agency for graphic design</strong> or a dedicated remote creative team, learn more about <Link to="/about/our-company" className="text-[#ccff00] hover:underline">our company engineering philosophy</Link> and how we work seamlessly across US, UK, European, and Asian time zones via shared Figma boards and milestone tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CountryMarquee />

      {/* SECTION: Frequently Asked Questions (8 FAQs) */}
      <section className="py-24 md:py-32 bg-[#050505] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold text-[#ccff00] uppercase tracking-[0.3em] block mb-4">// ANSWERS &amp; INSIGHTS</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-zinc-950 border border-white/5 rounded-2xl hover:border-[#ccff00]/30 transition-colors overflow-hidden"
              >
                <button 
                  className="flex items-center justify-between w-full p-6 md:p-8 text-left"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  aria-expanded={activeFaq === idx}
                >
                  <span className="text-base md:text-lg font-bold text-zinc-200 uppercase tracking-tight pr-6">{faq.q}</span>
                  <div className={`shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-45 text-[#ccff00]' : 'text-zinc-500'}`}>
                    <Plus size={24} />
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
                      <p className="p-6 md:p-8 pt-0 text-zinc-400 text-sm md:text-base font-light leading-relaxed">
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

      {/* SECTION: Call to Action */}
      <section className="py-32 md:py-40 relative border-t border-white/5 overflow-hidden text-center bg-black">
        <div className="absolute inset-0 bg-[#ccff00]/5 blur-[200px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <span className="text-xs font-mono font-bold text-[#ccff00] uppercase tracking-[0.3em] block mb-6">// START YOUR PROJECT</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-8 uppercase leading-[0.95]">
            Ready to Elevate Your <br />
            <span className="text-[#ccff00]">Brand's Visual Identity?</span>
          </h2>

          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            Stop settling for generic designs that fail to communicate your brand's unique value. Partner with AbuQitmirLabs to create custom graphic design that captivates, communicates, and converts.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/contact"
              className="bg-[#ccff00] text-black text-sm font-bold uppercase tracking-wider px-10 py-5 rounded-full hover:bg-white transition-all transform hover:scale-105"
            >
              Request a Free Design Consultation
            </Link>
            <a 
              href="https://wa.me/923233260859" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-white/20 text-white text-sm font-bold uppercase tracking-wider px-10 py-5 rounded-full hover:bg-white/10 transition-all"
            >
              Discuss on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Related Services / Internal Siloing */}
      <section className="py-24 bg-[#050505] border-t border-white/10 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xs font-mono text-slate-500 mb-12 uppercase tracking-[0.4em] font-bold block">[ RELATED_SYSTEMS ]</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Custom Software", path: "/custom-software", icon: <Code2 className="w-5 h-5" /> },
              { title: "Healthcare Software", path: "/solutions/healthcare", icon: <Globe className="w-5 h-5" /> },
              { title: "Web Development", path: "/web-development", icon: <Globe className="w-5 h-5" /> },
              { title: "Mobile Apps", path: "/mobile-app-development", icon: <Smartphone className="w-5 h-5" /> },
              { title: "AI Agents", path: "/ai-agent-development", icon: <Cpu className="w-5 h-5" /> },
              { title: "SEO Mastery", path: "/seo-mastery", icon: <TrendingUp className="w-5 h-5" /> }
            ].map((link, i) => (
              <Link 
                key={i} 
                to={link.path} 
                className="group flex items-center justify-between p-8 bg-white/[0.01] border border-white/5 rounded-2xl transition-all hover:-translate-y-1 hover:bg-white/[0.04] hover:border-[#ccff00]/40"
              >
                <div className="flex items-center gap-4">
                  <div className="text-[#ccff00] bg-white/5 border border-white/10 p-3 rounded-lg group-hover:bg-[#ccff00] group-hover:text-black transition-all">
                    {link.icon}
                  </div>
                  <span className="font-bold uppercase tracking-tight text-white">{link.title}</span>
                </div>
                <ArrowUpRight className="text-slate-500 group-hover:text-[#ccff00] transition-colors" size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GraphicsDesignPage;

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
  ChevronRight, 
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
  FileSearch,
  LayoutGrid,
  TrendingUp,
  Globe,
  Settings,
  HelpCircle,
  Clock,
  Heart,
  Scale,
  Home,
  HeartPulse,
  BookOpen,
  Calendar,
  MapPin,
  Cpu,
  Code2,
  Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import GraphicsDesignPricing from '../components/GraphicsDesignPricing';

const GraphicsDesignPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const designServices = [
    {
      num: "01",
      icon: <Palette className="w-10 h-10 text-[#ccff00]" />,
      title: "🎨 Brand Identity Design",
      quote: "Coherent foundation for all design decisions.",
      desc: "Logos, color systems, typography, and the broader visual language that makes a brand instantly recognizable. Graphic design for brand identity is where most of our engagements start, since every other design decision — from a website to a pitch deck — flows from a coherent identity foundation.",
      items: [
        "Logo Design: Distinctive, memorable logos that represent your brand's essence",
        "Color Palette: Strategic color schemes that evoke the right emotions",
        "Typography: Font choices that enhance readability and brand personality",
        "Brand Guidelines: Comprehensive style guides for consistent application across all media"
      ],
      deliverable: "Complete brand identity package with guidelines."
    },
    {
      num: "02",
      icon: <Layout className="w-10 h-10 text-[#ccff00]" />,
      title: "🖥️ UI/UX Design",
      quote: "Built around how users actually navigate and decide.",
      desc: "Interface design for websites and applications, built around how users actually navigate and make decisions, not just how a screen looks in isolation. This work sits closely alongside our web development and mobile app development teams, since design that isn't grounded in technical feasibility rarely survives contact with real development.",
      items: [
        "User Research: Understanding your audience's needs, behaviors, and pain points",
        "Wireframing: Structural layouts that define functionality and user flow",
        "Prototyping: Interactive prototypes for usability testing",
        "Visual Design: High-fidelity designs with pixel-perfect precision"
      ],
      deliverable: "Interactive prototypes and design system components."
    },
    {
      num: "03",
      icon: <FileText className="w-10 h-10 text-[#ccff00]" />,
      title: "📊 Marketing & Digital Assets",
      quote: "Keeping your brand consistent across every channel.",
      desc: "Social media graphics, ad creative, presentation design, and the ongoing visual content that keeps a brand consistent across every channel it shows up in.",
      items: [
        "Brochures & Flyers: Professional print and digital collateral",
        "Social Media Graphics: Engaging visuals for all platforms",
        "Presentation Design: Impactful slide decks for pitches and proposals",
        "Infographics: Data visualizations that tell compelling stories"
      ],
      deliverable: "Print-ready and digital assets."
    },
    {
      num: "04",
      icon: <Globe className="w-10 h-10 text-[#ccff00]" />,
      title: "🏢 Environmental Graphic Design",
      quote: "Extending brand identity into the built environment.",
      desc: "For businesses with physical spaces — offices, retail locations, event spaces — environmental graphic design extends brand identity into the built environment: signage, wayfinding, and spatial branding that reinforces the same visual language customers see online.",
      items: [
        "Signage & Wayfinding: Intuitive directional navigation and branding",
        "Spatial Branding: Transforming physical rooms to tell your brand story",
        "Event Spaces: Branded exhibition booths and interactive installations",
        "Office Graphics: Inspiring interior murals and custom corporate decals"
      ],
      deliverable: "Production-ready vector blueprints and environmental design mockups."
    }
  ];

  const designProcess = [
    {
      step: "01",
      icon: <Search className="w-8 h-8 text-[#ccff00]" />,
      title: "🔍 Discovery & Research",
      quote: "Understand before you design.",
      desc: "We begin by understanding your business goals, target audience, brand values, and competitive landscape. This phase includes:",
      items: [
        "Brand Audit: Analyzing your current visual identity",
        "Competitor Analysis: Understanding the visual landscape in your industry",
        "User Research: Understanding your audience's preferences and pain points",
        "Stakeholder Interviews: Aligning on vision and expectations"
      ],
      deliverable: "Research summary and design brief."
    },
    {
      step: "02",
      icon: <Sparkles className="w-8 h-8 text-[#ccff00]" />,
      title: "💡 Concept Development",
      quote: "Creativity meets strategy.",
      desc: "We explore multiple design directions and develop initial concepts that align with your goals:",
      items: [
        "Mood Boards: Visual collections that define the look and feel",
        "Initial Concepts: 2-3 design directions for review",
        "Design Rationale: Explaining the thinking behind each concept",
        "Feedback Loop: Iterative refinement based on your input"
      ],
      deliverable: "2-3 initial design concepts."
    },
    {
      step: "03",
      icon: <Palette className="w-8 h-8 text-[#ccff00]" />,
      title: "🎨 Design & Refinement",
      quote: "Perfection through iteration.",
      desc: "We refine the selected concept into final designs with pixel-perfect precision:",
      items: [
        "Detailed Design: High-fidelity designs with attention to every element",
        "User Testing: Validating designs with real users",
        "Iterative Refinement: Adjusting based on feedback and testing results",
        "Design System: Creating reusable components for consistency"
      ],
      deliverable: "Final design files and assets."
    },
    {
      step: "04",
      icon: <Check className="w-8 h-8 text-[#ccff00]" />,
      title: "📤 Delivery & Implementation",
      quote: "From design to reality.",
      desc: "We deliver ready-to-use assets and support implementation:",
      items: [
        "Asset Delivery: Organized, print-ready, and digital files",
        "Developer Handoff: Design specifications for implementation",
        "Style Guide: Guidelines for consistent application",
        "Training: Briefing internal teams on brand guidelines"
      ],
      deliverable: "All final assets and guidelines."
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
      q: "What is graphic design, and why is it important for my business?",
      a: "Graphic design is the art of visual communication. It helps your brand convey its personality, values, and promises effectively. Good design creates a positive first impression, builds trust, and differentiates you from competitors. Our graphics design services ensure your brand communicates effectively at every touchpoint."
    },
    {
      q: "What services do you offer?",
      a: "We offer a comprehensive range of professional graphic design services including brand identity design, UI/UX design for digital products, marketing and collateral design, and web design and graphics."
    },
    {
      q: "How much does professional graphic design cost?",
      a: "Costs vary based on complexity and scope. For example, a logo package starts at $50–$150, while a full brand identity package ranges from $1,000–$3,000. Our custom graphics design pricing is transparent with clear deliverables at every tier."
    },
    {
      q: "Do you offer both print and digital design?",
      a: "Yes! We create designs for both print (brochures, packaging) and digital (websites, social media, apps) mediums, ensuring consistency across all channels."
    },
    {
      q: "How long does a typical project take?",
      a: "Timelines vary based on scope. A logo design typically takes 1–2 weeks, while a comprehensive UI/UX design for a website or app may take 3–6 weeks. Our discovery phase helps determine accurate timelines."
    },
    {
      q: "Do you work with international clients?",
      a: "Absolutely. We serve clients across the United States, United Kingdom, and Europe. Our design team is experienced in working with international brands and understanding diverse market preferences."
    }
  ];

  return (
    <div className="bg-[#050505] text-neutral-300 font-sans antialiased overflow-x-hidden min-h-screen relative selection:bg-[#ccff00] selection:text-black">
      <Helmet>
        <title>Graphics Design Services | Professional Graphic Design Company | AbuQitmirLabs</title>
        <meta name="description" content="AbuQitmirLabs is a professional graphic design studio providing brand identity design, custom logo design services, and UI/UX design." />
        <link rel="canonical" href="https://abuqitmirlabs.tech/graphics-design" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Graphics Design Services | Professional Graphic Design Company | AbuQitmirLabs" />
        <meta property="og:description" content="AbuQitmirLabs is a professional graphic design studio providing brand identity design, custom logo design services, and UI/UX design." />
        <meta property="og:url" content="https://abuqitmirlabs.tech/graphics-design" />
        <meta property="og:type" content="website" />

        {/* Schema Markup */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://abuqitmirlabs.tech"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Graphics Design",
                    "item": "https://abuqitmirlabs.tech/graphics-design"
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "name": "AbuQitmirLabs",
                "url": "https://abuqitmirlabs.tech",
                "logo": "https://abuqitmirlabs.tech/logo.png",
                "image": "https://abuqitmirlabs.tech/logo.png",
                "telephone": "+923233260859",
                "priceRange": "$$$",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "8/15, 3 37A Rd, Shah Khalid Colony",
                  "addressLocality": "Landhi Town, Karachi",
                  "addressRegion": "Sindh",
                  "postalCode": "75160",
                  "addressCountry": "PK"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "24.842691448838718",
                  "longitude": "67.1862014846566"
                },
                "sameAs": [
                  "https://wa.me/923233260859",
                  "https://github.com/abuqitmir"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Professional Graphics Design Services",
                "description": "At AbuQitmirLabs, we craft conversion-focused brand identities, intuitive UI/UX layouts, and compelling marketing graphics that communicate value and build authority.",
                "provider": {
                  "@type": "LocalBusiness",
                  "name": "AbuQitmirLabs",
                  "url": "https://abuqitmirlabs.tech"
                },
                "serviceType": "Graphics Design Services",
                "areaServed": ["US", "UK", "CA", "AU", "PL", "PK"],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Graphics Design Sector Solutions",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Graphics Design for Non-Profit Organizations",
                        "description": "Non-profits need visual communication that tells their story and inspires action. We create compelling donation campaigns, impact reports, and volunteer recruitment materials."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Graphics Design for Real Estate",
                        "description": "Stunning property brochures, virtual tour interfaces, and social media campaigns that help real estate agents showcase properties in their best light and close deals faster."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Graphics Design for Healthcare",
                        "description": "Patient-friendly educational materials, wayfinding signage, clinic branding, and digital assets that convey trust, professionalism, and care."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Graphics Design for Small Law Firms",
                        "description": "Authoritative websites, persuasive pitch decks, firm branding, and polished legal documents that build credibility and attract clients for small law firms."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Graphics Design for Corporate Events",
                        "description": "Cohesive branding systems, high-impact signage, and engaging presentation materials that enhance the corporate event attendee experience."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Graphics Design for Educational Institutions",
                        "description": "Compelling recruitment materials, interactive campus maps, and cohesive digital identities that reflect academic excellence and build community."
                      }
                    }
                  ]
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
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
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "Our Creative Design Process",
                "description": "A proven design methodology combining deep research, concept development, pixel-perfect refinement, and developer-friendly asset delivery.",
                "step": [
                  {
                    "@type": "HowToStep",
                    "name": "Discovery & Research",
                    "text": "Analyze business goals, competitive visuals, and target audiences to formulate a solid brand audit and design brief."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Concept Development",
                    "text": "Develop 2-3 strategic design directions, mood boards, and aesthetic concepts backed by detailed rationale."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Design & Refinement",
                    "text": "Refining the selected concept through detailed high-fidelity crafting, usability testing, and developing unified design systems."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Delivery & Implementation",
                    "text": "Organizing print-ready and digital assets, developer specifications, style guides, and training for in-house team handoff."
                  }
                ]
              }
            ])
          }}
        ></script>
      </Helmet>
      
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center pt-24 md:pt-32 pb-12 overflow-hidden">
        {/* Background Image Area */}
        <div className="absolute inset-0 md:left-[35%] z-0">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop&fm=webp" 
            alt="futuristic premium graphics design background texture" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity grayscale contrast-150"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent"></div>
        </div>

        <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
          <div className="md:w-3/4 lg:w-2/3">
            {/* Top Label */}
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-4 mb-8"
            >
              <div className="flex -space-x-2">
                <div className="w-5 h-5 rounded-full border border-zinc-700 bg-[#ccff00]"></div>
                <div className="w-5 h-5 rounded-full border border-zinc-700 bg-zinc-800"></div>
                <div className="w-5 h-5 rounded-full border border-zinc-700 bg-zinc-700"></div>
              </div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500">AbuQitmirLabs Creative Laboratory</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] font-bold tracking-tighter text-white uppercase mb-10">
                Graphics Design: <br />
                <span className="text-[#ccff00]">Visual Identity for Digital Excellence</span>
              </h1>
            </motion.div>

            {/* Sub-headlines - SECTION 1 */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg md:text-xl font-light text-zinc-300 max-w-3xl leading-relaxed mb-8 font-sans"
            >
              Good design communicates before a single word is read. We create visual identities and assets that match your brand's actual positioning not generic stock-template aesthetics across digital and print formats.
            </motion.p>

            {/* Core Capabilities Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-12 max-w-4xl border-y border-white/5 py-8 px-6 bg-white/[0.01] backdrop-blur-sm rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-left">
                {[
                  "Brand Identity & Logo Design",
                  "Social Media & Marketing Creative Assets",
                  "UI/UX Visual Design for Web & Apps",
                  "Pitch Deck & Presentation Design",
                  "Packaging & Print Design"
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 group-hover:bg-[#ccff00] transition-colors duration-300" />
                    <span className="text-sm font-sans font-light text-slate-300 tracking-tight leading-relaxed group-hover:text-white transition-colors duration-300">{bullet}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6"
            >
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ccff00] text-black text-xs font-bold tracking-widest uppercase px-10 py-6 flex flex-col items-center gap-2 hover:bg-white transition-all transform hover:scale-105 active:scale-95 group"
              >
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Request a Design Quote
              </a>
              <button 
                onClick={() => {
                  const el = document.getElementById('design-pricing');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-zinc-800 text-white text-xs font-bold tracking-widest uppercase px-10 py-6 flex flex-col items-center gap-2 hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] transition-all group"
              >
                <Layout className="w-5 h-5 group-hover:scale-110 transition-transform" />
                See Pricing &amp; Packages
              </button>
            </motion.div>
          </div>
        </div>

        {/* Floating Accent element */}
        <div className="absolute right-6 bottom-32 md:right-[20%] md:bottom-[15%] w-40 h-40 md:w-56 md:h-56 bg-[#ccff00] flex items-end justify-start p-6 shadow-2xl z-20 group cursor-pointer hover:bg-white transition-colors duration-500 rounded-2xl md:rounded-none">
          <Crosshair className="w-10 h-10 text-black group-hover:rotate-90 transition-transform duration-500" strokeWidth={1} />
        </div>
      </section>

      {/* Marquee Section */}
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
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent uppercase" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>premium web design graphics</span>
              <Sparkles className="text-[#ccff00] opacity-40" size={40} />
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: THE PROBLEM / OPPORTUNITY */}
      <section className="py-32 md:py-48 bg-black border-b border-white/5 relative overflow-hidden group">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-bold text-[#ccff00] uppercase tracking-[0.4em] block mb-8">[ SECTION_02: THE_PROBLEM ]</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-[0.9] mb-12">
              Is your brand invisible <br />
              <span className="text-zinc-600">in a sea of visual noise?</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-xl md:text-2xl font-light text-zinc-400 leading-relaxed italic border-l-2 border-[#ccff00] pl-8">
              Many businesses underestimate the power of professional design. Generic templates and amateur visuals fail to communicate your brand's value, leading to lost opportunities and diluted brand authority. Without a cohesive visual identity, even the best products and services struggle to gain recognition.
            </p>
          </motion.div>
        </div>

        {/* Double Column Editorial Block */}
        <div className="max-w-7xl mx-auto px-6 mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch border-t border-white/10 pt-24">
            {/* Design That Does More Than Look Good */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-zinc-900/30 border border-white/5 p-10 md:p-14 rounded-[2.5rem] relative backdrop-blur-md flex flex-col justify-between"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/2 blur-3xl rounded-full" />
                <div>
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.4em] mb-6">// THE CREATIVE PHILOSOPHY</div>
                  <h2 className="text-3xl md:text-4xl font-serif font-light text-white tracking-tight uppercase leading-[1.2] mb-8">
                     Design That Does More <span className="italic text-neutral-400">Than Look Good</span>
                  </h2>
                  <p className="text-base md:text-lg font-light text-zinc-300 leading-relaxed font-sans mb-6">
                     Good design is often invisible — it just makes a brand feel trustworthy, a product feel intuitive, and a customer feel like they're in the right place. At AbuQitmirLabs, our approach to <strong>graphic design</strong> starts from that principle: every visual decision should serve a purpose, not just fill space.
                  </p>
                  <p className="text-sm md:text-base font-light text-[#ccff00] leading-relaxed font-sans">
                     We'll admit it — <strong>graphic design is our passion</strong>, in the least clichéd sense we can manage: the kind of passion that shows up as obsessive attention to spacing, color theory, and typographic hierarchy rather than just a slogan on a homepage.
                  </p>
                </div>
            </motion.div>
            
            {/* SEO and Graphic Design: An Underrated Connection */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="bg-zinc-900/30 border border-white/5 p-10 md:p-14 rounded-[2.5rem] relative backdrop-blur-md flex flex-col justify-between"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/2 blur-3xl rounded-full" />
                <div>
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.4em] mb-6">// SEO &amp; GRAPHIC DESIGN</div>
                  <h2 className="text-3xl md:text-4xl font-serif font-light text-white tracking-tight uppercase leading-[1.2] mb-8">
                     SEO and Graphic Design: <span className="italic text-neutral-400">An Underrated Connection</span>
                  </h2>
                  <p className="text-sm md:text-base font-light text-neutral-300 leading-relaxed font-sans mb-6">
                     Most businesses don't think about <strong>SEO keywords for graphic design</strong>, but the discipline intersects with search visibility more than it seems. Descriptive, keyword-aware image alt text, properly compressed and named image files, and design that supports fast page load times all directly affect how well a page ranks.
                  </p>
                  <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#ccff00] block mb-2">Meaning for search performance:</span>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed font-sans">
                      A graphic designer who understands basic technical SEO produces measurably better results than one who treats visuals as separate from search performance entirely.
                    </p>
                  </div>
                </div>
            </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-20 border-t border-white/10 pt-20">
          <h3 className="text-2xl md:text-3xl font-bold text-white uppercase mb-12 tracking-tight">
            The AbuQitmirLabs Difference:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Cohesive Brand Identity", desc: "Consistent visual language across all touchpoints" },
              { title: "User-Centric Design", desc: "Interfaces that prioritize usability and engagement" },
              { title: "Differentiated Visuals", desc: "Designs that stand out in competitive markets" },
              { title: "Scalable Design Systems", desc: "Assets that grow with your business" }
            ].map((diff, i) => (
              <div key={i} className="bg-zinc-950 border border-white/10 p-8 rounded-2xl hover:border-[#ccff00]/50 transition-colors duration-300">
                <span className="text-xs font-mono text-[#ccff00] font-bold block mb-4">// DIFFERENCE 0{i+1}</span>
                <h4 className="text-lg font-bold text-white uppercase tracking-tight mb-2">{diff.title}</h4>
                <p className="text-sm font-light leading-relaxed text-zinc-400">{diff.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-zinc-900 border border-[#ccff00]/30 p-8 rounded-3xl max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl font-medium text-[#ccff00]">
              Our <strong className="text-white font-extrabold">logo design services</strong> and <strong className="text-white font-extrabold">web design graphics</strong> ensure your brand's visual identity is not just beautiful but purposeful.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR DESIGN SERVICES */}
      <section className="py-32 md:py-48 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <span className="text-xs font-bold text-[#ccff00] uppercase tracking-[0.4em] block mb-4">// SECTION 3: DESIGN EXPERTISE</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter leading-none">
              OUR DESIGN SERVICES
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl text-base md:text-lg">
              We offer a comprehensive range of design services that cover every aspect of your brand's visual journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-white">
            {designServices.map((service, idx) => (
              <div key={idx} className="bg-zinc-950 border border-white/10 p-10 rounded-3xl hover:border-[#ccff00]/40 transition-all duration-300 relative group">
                <div className="absolute top-0 right-0 p-8 text-4xl font-mono text-zinc-800 group-hover:text-[#ccff00]/10 transition-colors">{service.num}</div>
                <div className="flex items-center gap-4 border-b border-white/10 pb-6 mb-6">
                  {service.icon}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">{service.title}</h3>
                    <em className="text-zinc-500 font-serif text-sm block mt-1">"{service.quote}"</em>
                  </div>
                </div>
                
                <p className="text-sm font-light text-zinc-300 mb-6 leading-relaxed">{service.desc}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-4 bg-zinc-900 border border-white/5 rounded-xl">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#ccff00] block mb-1">Service Deliverable //</span>
                  <p className="text-xs font-mono text-white">{service.deliverable}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: INDUSTRY-FOCUSED SOLUTIONS */}
      <section className="py-32 md:py-48 bg-black border-b border-white/5 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00]/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20">
            <span className="text-xs font-bold text-[#ccff00] uppercase tracking-[0.4em] block mb-4">// SECTOR SOLUTIONS</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter leading-none mb-8">
              Graphics Design — <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Industry-Focused Solutions for Every Sector</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-3xl leading-relaxed font-light">
              At AbuQitmirLabs, we create visual identities that communicate before a single word is read. Our approach begins with understanding your industry's unique audience, competitive landscape, and brand positioning before we design a single pixel. Whether you need a complete brand identity, marketing collateral, or digital assets, we build designs that fit your business, not generic templates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
            {[
              {
                title: "Graphics Design for Non-Profit Organizations",
                desc: "Non-profits need visual communication that tells their story and inspires action. Our graphics design solutions for non-profit organizations create compelling donation campaigns, impact reports, and volunteer recruitment materials that connect emotionally with supporters. From social media graphics to annual reports, our graphics design for non-profit solutions help you communicate your mission with clarity and heart.",
                icon: <Heart className="w-8 h-8 text-[#ccff00]" />
              },
              {
                title: "Graphics Design for Real Estate",
                desc: "Real estate marketing demands visuals that showcase properties in their best light and attract qualified buyers. Our graphics design for real estate creates stunning property brochures, virtual tour interfaces, and social media campaigns that help agents stand out in competitive markets. From luxury listings to commercial properties, our graphics design for real estate solutions help you close deals faster.",
                icon: <Home className="w-8 h-8 text-[#ccff00]" />
              },
              {
                title: "Graphics Design for Healthcare",
                desc: "Healthcare organizations need designs that convey trust, professionalism, and care. Our graphics design for healthcare creates patient-friendly materials, wayfinding signage, and digital assets that make complex medical information accessible and reassuring. From clinic branding to patient education materials, our graphics design for healthcare solutions build confidence in your practice.",
                icon: <HeartPulse className="w-8 h-8 text-[#ccff00]" />
              },
              {
                title: "Graphics Design for Small Law Firms",
                desc: "Small law firms need professional visual communication that builds credibility and attracts clients. Our graphics design for small law firms creates authoritative websites, persuasive pitch decks, and polished legal documents that reflect your expertise. From firm branding to case presentation materials, our graphics design for small law firms helps you compete with larger practices.",
                icon: <Scale className="w-8 h-8 text-[#ccff00]" />
              },
              {
                title: "Graphics Design for Corporate Events",
                desc: "Corporate events demand sophisticated visual identities that set the tone and create memorable experiences. Our graphics design for corporate events creates cohesive branding systems, impactful signage, and engaging presentation materials that enhance attendee experience. From conference identities to gala branding, our graphics design for corporate events solutions make your event unforgettable.",
                icon: <Calendar className="w-8 h-8 text-[#ccff00]" />
              },
              {
                title: "Graphics Design for Educational Institutions",
                desc: "Educational institutions need visual communication that attracts students, engages parents, and builds community. Our graphics design for educational institutions creates compelling recruitment materials, interactive campus maps, and cohesive digital identities that reflect your academic excellence. From K-12 to higher education, our graphics design for educational institutions solutions help you tell your story.",
                icon: <BookOpen className="w-8 h-8 text-[#ccff00]" />
              }
            ].map((sector, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-zinc-950 border border-white/5 p-8 rounded-3xl hover:border-[#ccff00]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-6 w-14 h-14 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center">
                    {sector.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 tracking-tight uppercase leading-snug">{sector.title}</h3>
                  <p className="text-sm font-light text-zinc-400 leading-relaxed mb-6">{sector.desc}</p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#ccff00]">
                  <span>Sector Solutions</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR DESIGN PROCESS */}
      <section className="py-32 md:py-48 bg-[#0a0a0a] border-b border-white/5 relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#ccff00]/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-3 mb-20">
            <Sparkles className="text-[#ccff00]" size={24} />
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.4em]">Section 4: Creative Flow</span>
          </div>

          <div className="mb-24">
            <span className="text-xs font-bold text-[#ccff00] uppercase tracking-[0.4em] block mb-6">[ OUR_DESIGN_FLOW ]</span>
            <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-[0.9] mb-6">
              Our Design Process
            </h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-2xl">
              We follow a proven methodology that combines creativity with strategic thinking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {designProcess.map((p, idx) => (
              <div key={idx} className="group p-8 bg-[#0a0a0a] hover:bg-white/[0.02] transition-colors duration-500 relative flex flex-col justify-between overflow-hidden min-h-[420px]">
                <div className="absolute top-0 right-0 p-6 text-3xl font-mono text-zinc-800 group-hover:text-[#ccff00]/10 transition-colors">{p.step}</div>
                <div>
                  <div className="mb-8 text-zinc-600 group-hover:text-[#ccff00] transition-colors group-hover:scale-110 duration-500 flex origin-left items-center">
                    {p.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white uppercase tracking-tighter mb-4">{p.title}</h4>
                  <em className="text-xs text-zinc-500 font-serif block mb-4">"{p.quote}"</em>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">{p.desc}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {p.items.map((it, i) => (
                      <li key={i} className="text-[11px] text-zinc-500 font-light leading-snug flex items-start gap-1.5 group-hover:text-zinc-300 transition-colors">
                        <span className="w-1 h-1 rounded-full bg-zinc-700 shrink-0 mt-1.5" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="p-3 bg-zinc-950 border border-white/5 rounded-lg mb-4">
                    <span className="text-[8px] font-mono text-zinc-500 block">Deliverable</span>
                    <span className="text-[10px] font-mono text-[#ccff00] block">{p.deliverable}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ccff00] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: GLOBAL MARKETS & WHY PARTNER WITH US */}
      <section className="py-32 md:py-48 bg-[#050505] border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column: Global Markets */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div>
                <span className="text-xs font-mono text-[#ccff00] mb-4 uppercase tracking-[0.4em] font-bold block">[ GLOBAL REACH ]</span>
                <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter leading-none mb-6">
                  Graphics Design Across Global Markets
                </h2>
                <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
                  While our creative studio is headquartered in Karachi, Pakistan, our design solutions are built for a global stage. We understand the unique visual expectations of different markets and adapt our approach accordingly:
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    country: "United States",
                    code: "US",
                    text: "Graphics design in the United States for businesses that require premium, high-impact visual identities to compete in one of the world's most competitive markets."
                  },
                  {
                    country: "United Kingdom",
                    code: "UK",
                    text: "Graphics design in the United Kingdom aligned with British design sensibilities and professional expectations, ensuring your brand resonates with UK audiences."
                  },
                  {
                    country: "Canada",
                    code: "CA",
                    text: "Graphics design in Canada that reflects the country's bilingual and multicultural visual landscape, with compliance to Canadian accessibility standards."
                  },
                  {
                    country: "Australia",
                    code: "AU",
                    text: "Graphics design in Australia for businesses ready to dominate the Australian market with fresh, modern, and culturally relevant design."
                  },
                  {
                    country: "Poland",
                    code: "PL",
                    text: "Graphics design in Poland that bridges the gap between global design standards and local market aesthetics, helping Polish businesses stand out."
                  }
                ].map((m, idx) => (
                  <div key={idx} className="p-6 bg-zinc-950 border border-white/5 rounded-2xl hover:border-zinc-800 transition-colors group flex gap-5 items-start">
                    <span className="text-xs font-mono text-zinc-600 group-hover:text-[#ccff00] border border-zinc-800 group-hover:border-[#ccff00]/40 px-2.5 py-1 rounded shrink-0 font-bold">{m.code}</span>
                    <div>
                      <h4 className="text-base font-bold text-white uppercase tracking-tight mb-2">{m.country}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Why Partner with AbuQitmirLabs */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-between space-y-12"
            >
              <div className="space-y-8">
                <span className="text-xs font-mono text-[#ccff00] mb-4 uppercase tracking-[0.4em] font-bold block">[ WHY PARTNER WITH US ]</span>
                <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter leading-none mb-6">
                  Why Partner with AbuQitmirLabs?
                </h2>
                <p className="text-zinc-300 text-base md:text-lg font-light leading-relaxed border-l-2 border-[#ccff00] pl-6 italic">
                  Our team in Karachi, Pakistan, combines global-grade design expertise with cost-effective delivery. We serve clients across the United States, United Kingdom, Canada, Poland, and Australia—building visual identities that are memorable, professional, and fully owned by you. Whether you need a complete brand overhaul, marketing collateral, or digital assets, we deliver designs that communicate your value.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  <div className="p-6 bg-zinc-950 border border-white/5 rounded-2xl">
                    <span className="text-xs font-mono text-[#ccff00] font-bold block mb-2">// 100% OWNERSHIP</span>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">Every single custom graphic design and asset is fully transferred and legally owned by your business.</p>
                  </div>
                  <div className="p-6 bg-zinc-950 border border-white/5 rounded-2xl">
                    <span className="text-xs font-mono text-[#ccff00] font-bold block mb-2">// BRAND STRATEGY</span>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">We formulate deep brand guidelines ensuring your visual aesthetic scales correctly across all current and future channels.</p>
                  </div>
                </div>
              </div>

              {/* Big Creative Callout */}
              <div className="bg-zinc-900 border border-[#ccff00]/30 p-10 rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/5 blur-3xl rounded-full" />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-4">// BRAND IDENTITY LAUNCHPAD //</span>
                <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase leading-none mb-6">
                  Let's build your <span className="text-[#ccff00]">visual advantage.</span>
                </p>
                <a 
                  href="https://wa.me/923233260859"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black bg-[#ccff00] hover:bg-white px-6 py-4 rounded-xl transition-colors"
                >
                  Get Started <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION: STRATEGIC DESIGN & DECISIONS */}
      <section className="py-32 md:py-48 bg-[#030303] border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 text-center">
            <span className="text-xs font-bold text-[#ccff00] uppercase tracking-[0.4em] block mb-4">// DESIGN STRATEGY</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter leading-none">
              Strategic Design Decisions
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
              Behind every line, color, and grid is a deliberate rationale built around your business goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
            {/* Box 1: Agencies vs Firms */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-zinc-950 border border-white/5 p-10 rounded-3xl hover:border-[#ccff00]/30 transition-all duration-300 relative group"
            >
              <div className="mb-8 w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#ccff00]">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4 text-white">
                Agencies vs. Firms: The Real Difference
              </h3>
              <p className="text-sm font-light text-zinc-400 leading-relaxed mb-6">
                Among <strong>graphic design companies</strong>, the difference between a strong partner and a weak one usually isn't raw creative talent — most <strong>graphic design firms</strong> can produce visually appealing work.
              </p>
              <p className="text-sm font-light text-zinc-400 leading-relaxed">
                The real difference is whether design decisions are grounded in a documented rationale (brand strategy, user research, business goals) or made on aesthetic instinct alone. As an <strong>agency for graphic design</strong> that works closely with our software and content teams, our design output is built to function inside a broader digital strategy, not as a standalone deliverable disconnected from everything else a brand does.
              </p>
            </motion.div>

            {/* Box 2: Books That Shaped Us */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-zinc-950 border border-white/5 p-10 rounded-3xl hover:border-[#ccff00]/30 transition-all duration-300 relative group"
            >
              <div className="mb-8 w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#ccff00]">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4 text-white">
                Books That Shaped Our Craft
              </h3>
              <p className="text-sm font-light text-zinc-400 leading-relaxed mb-6">
                Our approach draws on established principles from the field's foundational thinking — grid systems, visual hierarchy, and the psychology of color and contrast — applied to modern digital contexts rather than treated as static rules from another era.
              </p>
              <p className="text-sm font-light text-zinc-400 leading-relaxed">
                Good design theory doesn't expire; it just needs translating to the platforms people actually use today. By studying the classic books and masterworks that defined visual order, we bring a level of spatial rigor and balance that temporary trends can never replicate.
              </p>
            </motion.div>

            {/* Box 3: Finding the Right Designer */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-zinc-950 border border-white/5 p-10 rounded-3xl hover:border-[#ccff00]/30 transition-all duration-300 relative group"
            >
              <div className="mb-8 w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#ccff00]">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4 text-white">
                Finding the Right Graphic Designer
              </h3>
              <p className="text-sm font-light text-zinc-400 leading-relaxed mb-6">
                If you've searched for a <strong>graphic designer near me</strong> or a broader team of <strong>graphic designers</strong>, the deciding factor usually isn't proximity — most design work today happens remotely and asynchronously.
              </p>
              <p className="text-sm font-light text-zinc-400 leading-relaxed">
                What matters more is whether the designer or team understands your industry, your brand goals, and how design connects to the rest of your digital presence. We bridge geography through transparent Figma workflows, structured async reviews, and tight engineering collaboration.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-32 bg-[#0a0a0a] overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
            <div>
              <span className="text-xs font-bold text-[#ccff00] uppercase tracking-[0.4em] block mb-6">[ TECHNOLOGY &amp; TOOLKIT ]</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter leading-none">
                Our Creative Stack
              </h2>
            </div>
            <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest max-w-xs">Using industrial-grade tools to ensure pixel-perfect vector scalability and motion fidelity.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((stack, i) => (
              <div key={i} className="group p-8 border border-white/5 bg-[#050505] rounded-2xl hover:border-[#ccff00]/30 transition-all duration-500 flex flex-col items-center text-center">
                <div className="mb-8 w-12 h-12 rounded-xl bg-black border border-white/5 flex items-center justify-center group-hover:bg-[#ccff00] group-hover:text-black transition-colors duration-500">
                  {React.cloneElement(stack.icon as React.ReactElement<any>, { size: 20 })}
                </div>
                <h4 className="text-xl font-bold text-white uppercase tracking-tight mb-6 pb-4 border-b border-white/5 leading-none">{stack.category}</h4>
                <ul className="space-y-3">
                  {stack.items.map((item, j) => (
                    <li key={j} className="text-zinc-400 font-light flex items-center gap-3 group-hover:text-white transition-colors">
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

      {/* SECTION 6: PRICING & PACKAGES */}
      <div id="design-pricing">
        <GraphicsDesignPricing />
      </div>

      {/* Which Package Is Right For You - requested content in Section 6 */}
      <section className="py-24 bg-black text-white relative z-10 px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-black block mb-4">// SELECT YOUR DESIGN BLUEPRINT</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">Which Package Is Right for You?</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Choose Small / MVP Build if:",
                items: [
                  "You need a quick, cost-effective design solution",
                  "You're a startup or small business with a limited budget",
                  "You need social media graphics, a basic logo, or business cards",
                  "Your budget is under $150"
                ],
                customStyle: "border-l-4 border-cyan-400 pl-6"
              },
              {
                title: "Choose Mid-Range System if:",
                items: [
                  "You need a comprehensive brand identity system",
                  "You're a growing business ready to establish professional branding",
                  "You require UI/UX wireframes and brand guidelines",
                  "Your budget is $100 – $150+ per hour"
                ],
                customStyle: "border-l-4 border-purple-400 pl-6"
              },
              {
                title: "Choose Enterprise Studio if:",
                items: [
                  "You're an established brand in a competitive market",
                  "You need multi-platform, multi-branch design systems",
                  "You require art-direction and corporate consultation",
                  "Your budget is $150 – $250+ per hour"
                ],
                customStyle: "border-l-4 border-fuchsia-400 pl-6"
              },
              {
                title: "Choose USA Sourced Options if:",
                items: [
                  "You prefer working with US-based freelancers or agencies",
                  "You have a specific budget tier in mind",
                  "You want to compare costs across different platforms"
                ],
                customStyle: "border-l-4 border-zinc-500 pl-6"
              }
            ].map((choice, i) => (
              <div key={i} className={`bg-zinc-900/50 border border-white/5 p-8 rounded-2xl ${choice.customStyle}`}>
                <h4 className="text-lg font-black text-white mb-4 uppercase tracking-tight">{choice.title}</h4>
                <ul className="space-y-2">
                  {choice.items.map((it, idx) => (
                    <li key={idx} className="flex gap-2.5 text-xs md:text-sm text-neutral-300 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shrink-0 mt-2" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CountryMarquee />

      {/* SECTION 7: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-32 bg-black border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-xs font-bold text-[#ccff00] uppercase tracking-[0.4em] block mb-8">FAQ</span>
            <h3 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 border border-white/5 rounded-2xl hover:border-[#ccff00]/30 transition-colors overflow-hidden"
              >
                <button 
                  className="flex items-center justify-between w-full p-8 text-left"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <span className="text-lg md:text-xl font-bold text-zinc-200 uppercase tracking-tight pr-6">{faq.q}</span>
                  <div className={`shrink-0 transition-transform duration-500 ${activeFaq === idx ? 'rotate-45 text-[#ccff00]' : 'text-zinc-500'}`}>
                    <Plus size={28} />
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
                      <p className="p-8 pt-0 text-zinc-400 text-lg font-light leading-relaxed">
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

      {/* SECTION 8: CALL TO ACTION */}
      <section className="py-48 relative border-t border-white/5 overflow-hidden text-center bg-[#050505]">
        <div className="absolute inset-0 bg-[#ccff00]/5 blur-[200px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <span className="text-xs font-bold text-[#ccff00] uppercase tracking-[0.3em] block mb-6">// CHOOSE YOUR DESTINY</span>
          <h2 className="text-4xl md:text-[5.5rem] font-bold text-white tracking-tighter mb-10 uppercase leading-[0.9] mix-blend-difference">
            Ready to Elevate Your <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Brand's Visual Identity?</span>
          </h2>

          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
            Stop settling for generic designs that fail to communicate your brand's unique value. Partner with AbuQitmirLabs to create custom graphics design that captivates, communicates, and converts.
          </p>

          <div className="bg-zinc-950 border border-[#ccff00]/20 p-8 md:p-12 rounded-[2.5rem] max-w-2xl mx-auto mb-16 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/5 blur-3xl rounded-full" />
            <h3 className="text-xl md:text-2xl font-bold uppercase text-[#ccff00] mb-4">Request a Free Design Consultation</h3>
            <p className="text-sm text-zinc-400 font-light mb-8 leading-relaxed">
              Our team will analyze your current visual identity and provide a comprehensive assessment of opportunities for improvement—at no cost.
            </p>
            <div className="flex flex-wrap border-t border-white/10 pt-6 justify-between items-center text-[10px] font-mono text-zinc-500 tracking-widest uppercase gap-4">
              <span>Avg. Discovery Phase: 1–2 Weeks</span>
              <span>·</span>
              <span>Current Lead Time: 3–4 Weeks</span>
            </div>
          </div>

          <p className="text-base text-zinc-400 max-w-xl mx-auto mb-10 font-light leading-relaxed">
            Let's discuss your design project. Our initial consultation and brand audit are completely free.
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ccff00] text-black text-xl font-bold px-16 py-8 rounded-full hover:bg-white transition-all transform hover:scale-105 flex items-center justify-center uppercase tracking-tighter"
            >
               Request a Free Design Consultation
            </a>
            <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] max-w-[280px] text-left border-l-2 border-white/10 pl-8 leading-relaxed h-16 flex items-center">
               Est. PROJECT LOAD: 3-4 Weeks // CAPACITY: 88%
            </div>
          </div>
        </div>
      </section>

      {/* Related Services / Internal Siloing */}
      <section className="py-24 bg-black border-t border-white/10 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xs font-mono text-slate-500 mb-12 uppercase tracking-[0.4em] font-bold block">[ RELATED_SYSTEMS ]</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Custom Software", path: "/custom-software", icon: <Code2 className="w-5 h-5" /> },
              { title: "Web Development", path: "/web-development", icon: <Globe className="w-5 h-5" /> },
              { title: "Mobile Apps", path: "/mobile-app-development", icon: <Smartphone className="w-5 h-5" /> },
              { title: "AI Agents", path: "/ai-agent-development", icon: <Cpu className="w-5 h-5" /> },
              { title: "SEO Mastery", path: "/seo-mastery", icon: <TrendingUp className="w-5 h-5" /> },
              { title: "Content Writing", path: "/content-writing", icon: <PenTool className="w-5 h-5" /> }
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

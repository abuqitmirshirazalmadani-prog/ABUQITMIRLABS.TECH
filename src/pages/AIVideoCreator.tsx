import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Clapperboard, 
  Film, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sliders, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Video, 
  Play, 
  ChevronDown, 
  HelpCircle, 
  Wand2, 
  Volume2, 
  MonitorPlay, 
  Share2, 
  ExternalLink, 
  BarChart3, 
  Scissors, 
  Palette, 
  Cpu, 
  MessageSquare,
  Award,
  Flame,
  Check,
  X,
  Building,
  Activity,
  Globe2
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import ServiceToolCtaBanner from '../components/ServiceToolCtaBanner';
import { YouTubeFacade } from '../components/ui/youtube-facade';
import { AnimatedBreathingText } from '../components/ui/animated-breathing-text';
import { MagicText } from '../components/ui/magic-text';

// 10 Authoritative FAQ Items with direct answers for search and AI engine citation
const faqData = [
  {
    q: "What is AI video creation and how does AbuQitmirLabs approach it?",
    a: "AI video creation at AbuQitmirLabs is a human-directed generative cinematography workflow. Rather than relying on generic one-click prompts, our team pairs veteran film directors and motion designers with state-of-the-art diffusion models (including Kling 1.5, Runway Gen-3 Alpha, Midjourney v6, and Flux Pro). We compose custom scripts, establish character and lighting consistency, simulate realistic physics, generate neural soundscapes via ElevenLabs, and perform final color grading and 4K upscaling inside DaVinci Resolve."
  },
  {
    q: "How much does custom AI video production cost compared to traditional agencies?",
    a: "Traditional live-action or 3D animation agencies typically charge $8,000 to $25,000+ per brand video due to studio rentals, camera crews, and lengthy revision cycles. AbuQitmirLabs provides broadcast-ready AI video production ranging from $650 for focused teaser assets to $3,800 for full monthly commercial suites. This reduces production overhead by 70% to 85% while delivering superior turnaround speed."
  },
  {
    q: "How long does it take to produce an enterprise AI video?",
    a: "A typical high-impact cinematic teaser or product explainer is delivered within 48 to 72 hours from script approval. Multi-asset campaigns and complex narrative sequences take approximately 5 to 7 business days, compared to the 4 to 8 weeks standard in conventional commercial video production."
  },
  {
    q: "Does AI video look fake, distorted, or uncanny?",
    a: "Uncanny valley artifacts occur when inexperienced operators feed raw prompts into automated tools without art direction. At AbuQitmirLabs, we eliminate distortions through multi-model orchestration, strict keyframing, LoRA character training, and DaVinci post-production cleanups. The resulting footage features photorealistic lighting, coherent physics, cinematic depth of field, and natural anatomical movement."
  },
  {
    q: "Which AI video models and production software do you use?",
    a: "We do not rely on a single vendor. Our multi-engine production pipeline utilizes Runway Gen-3 Alpha, Kling 1.5, Luma Dream Machine, Flux Pro, Midjourney v6, ElevenLabs for neural voiceover synthesis, Topaz Video AI for cinematic 4K detail enhancement, and Blackmagic DaVinci Resolve Studio for professional timeline assembly and color science."
  },
  {
    q: "Can AbuQitmirLabs AI videos be used for commercial broadcast and paid ads?",
    a: "Yes. All delivered video assets include 100% full commercial rights and royalty-free master licenses. Our files are engineered specifically for high-conversion paid ads on Meta (Instagram & Facebook), TikTok, YouTube Shorts, LinkedIn, and high-resolution website hero sections."
  },
  {
    q: "Do you write the scripts and handle voiceovers?",
    a: "Yes. Every production package includes end-to-end creative direction: positioning strategy, narrative scripting, scene-by-scene storyboard planning, neural or human voiceover production, Foley audio effects, and ambient cinematic scoring."
  },
  {
    q: "How do you maintain visual and character consistency across scenes?",
    a: "We resolve cross-scene drift using custom seed locking, LoRA fine-tuning, image-to-video reference conditioning, and multi-angle 3D camera mapping. This ensures that your brand protagonist, product packaging, color palette, and lighting environment remain identical throughout the entire video narrative."
  },
  {
    q: "Can you quickly produce different aspect ratios for various platforms?",
    a: "Yes. Every project includes native exports formatted for 16:9 widescreen (YouTube and desktop web), 9:16 vertical (TikTok, Instagram Reels, YouTube Shorts), and 1:1 or 4:5 square formats for Meta feeds, with typography and safe zones customized for each format."
  },
  {
    q: "Why hire AbuQitmirLabs instead of generating videos in-house with commercial AI apps?",
    a: "Generative video tools are instruments, not filmmakers. Without narrative structure, pacing rhythm, camera lens knowledge, acoustic sound design, and color grading mastery, internal teams spend dozens of hours producing jittery, disjointed clips that erode brand credibility. AbuQitmirLabs brings senior creative direction and enterprise rendering pipelines that convert viewers into paying clients."
  }
];

// 5 Core Video Deliverable Styles
const videoDeliverableStyles = [
  {
    id: "teaser",
    name: "Cinematic Teasers & Product Launches",
    badge: "Maximum Attention",
    duration: "15 to 45 Seconds",
    turnaround: "48 to 72 Hours",
    description: "Hollywood-grade cinematic vignettes engineered to build anticipation, ignite brand prestige, and captivate social audiences within the first 3 seconds.",
    idealFor: "SaaS launches, luxury products, horror literature (e.g. GhastlyPages), and brand reveal campaigns.",
    pipeline: ["Flux Pro & Midjourney v6 Concept Keyframing", "Runway Gen-3 Camera Motion Direction", "Cinematic Sub-bass & Sound Design", "Topaz 4K Upscale & Color Grading"],
    metrics: "3.4x organic reach increase observed with GhastlyPages.com horror trailers."
  },
  {
    id: "explainer",
    name: "B2B & Healthcare Animated Explainers",
    badge: "High Clarity",
    duration: "45 to 90 Seconds",
    turnaround: "3 to 5 Days",
    description: "Translate intricate technical architectures, HIPAA-compliant patient flows, or SaaS features into elegant, crystal-clear visual stories.",
    idealFor: "Healthcare clinics (e.g. ClinicOSH), enterprise fintech platforms, and technical B2B startups.",
    pipeline: ["Technical Script & Flowchart Synthesis", "Consistent 3D/Photoreal Asset Generation", "Clear Multi-track Neural Voiceover", "Kinetic Typography & Flow Animations"],
    metrics: "84% viewer completion rate achieved on ClinicOSH patient onboarding modules."
  },
  {
    id: "founder",
    name: "Founder Vision & Executive Brand Stories",
    badge: "Investor & Customer Trust",
    duration: "60 to 120 Seconds",
    turnaround: "4 to 6 Days",
    description: "High-conviction narrative films communicating founder ethos, proprietary breakthrough technology, and corporate mission with documentary gravitas.",
    idealFor: "Seed & Series A fundraising pitches (e.g. ProFit Command Center), LinkedIn authority, and keynotes.",
    pipeline: ["Executive Narrative Structuring", "Photorealistic Metaphorical Cinematography", "Orchestral Score Arrangement", "Custom Subtitles & Executive Framing"],
    metrics: "Accelerated venture investor conversations for tech platform founders."
  },
  {
    id: "social-ads",
    name: "High-CTR Performance Social Ad Creatives",
    badge: "Direct Conversion",
    duration: "10 to 30 Seconds (Multi-Hook)",
    turnaround: "48 Hours",
    description: "Fast-paced, pattern-interrupting creative variants designed to conquer TikTok, Instagram Reels, and YouTube Shorts algorithms and reduce customer acquisition costs.",
    idealFor: "Direct-to-consumer e-commerce, high-velocity app downloads, and webinar signups.",
    pipeline: ["3-Tier Hook Variation Scripting", "Rapid AI Dynamic Motion Generation", "Trending Audio Synthesis & Captions", "Split-Test Aspect Ratio Delivery (9:16 & 4:5)"],
    metrics: "Sub-2-second thumb-stop rates with up to 42% decrease in cost-per-click."
  },
  {
    id: "product-demo",
    name: "3D Product Motion & Feature Visualizations",
    badge: "Tangible Detail",
    duration: "30 to 60 Seconds",
    turnaround: "72 Hours",
    description: "Hyper-detailed macro cinematography and physics simulations showcasing product textures, internal mechanics, or digital software interfaces without physical prototypes.",
    idealFor: "Luxury jewelry & gold launches (e.g. Atta Gold), hardware hardware devices, and mobile apps.",
    pipeline: ["CAD/Macro AI Texture Synthesis", "Zero-Gravity Lighting Simulation", "Haptic Sound & Foley Engineering", "Seamless Infinite Loop Formatting"],
    metrics: "78% reduction in production cost vs physical studio shooting for Atta Gold."
  }
];

// 6 Authentic Production Video Case Studies matching Home Page style
const featuredVideoCaseStudies = [
  {
    id: "video-1",
    videoId: "RAn9IZAjjBo",
    title: "Cinematic Brand Story — GhastlyPages",
    category: "Horror Literature & Media",
    client: "GhastlyPages.com",
    clientUrl: "https://ghastlypages.com",
    badge: "Verified Client Work",
    techStack: "Runway Gen-3 • Midjourney v6 • ElevenLabs",
    desc: "Full library of atmospheric cinematic story teaser videos engineered with high-tension visual pacing, character consistency, and bespoke neural Foley acoustic design."
  },
  {
    id: "video-2",
    videoId: "FbkOoJ81utg",
    title: "AI Video Ads That Actually Convert",
    category: "Performance Video Creative",
    client: "Direct Response Growth",
    badge: "High-Converting Ad",
    techStack: "Kling 1.5 • Topaz 4K • DaVinci Resolve",
    desc: "Hook-optimized high-conversion commercial creative engineered for Meta, TikTok, and YouTube Shorts with rapid visual retention pacing and zero uncanny morphing."
  },
  {
    id: "video-3",
    videoId: "RplBYs9dkP8",
    title: "Atta Gold: From Wheat Fields to Your Table",
    category: "Luxury Product Launch",
    client: "Atta Gold Launch",
    badge: "Authentic Production",
    techStack: "Flux Pro • Runway Gen-3 • Neural Voice",
    desc: "Cinematic agricultural and heritage journey tracing organic golden wheat cultivation into premium artisanal flour with golden-hour volumetric illumination."
  },
  {
    id: "video-4",
    videoId: "C2I4yh0mkIQ",
    title: "The Flour That Brings Families Home",
    category: "Emotional Brand Narrative",
    client: "Atta Gold Campaign",
    badge: "Brand Film",
    techStack: "Midjourney v6 • Kling 1.5 • Spatial Audio",
    desc: "Heartwarming commercial film connecting generational family traditions with golden flour craft. Emotionally grounded pacing calibrated for broad audience trust."
  },
  {
    id: "video-5",
    videoId: "R8Oqwo8VDDc",
    title: "Pure Wheat. Pure Flour. Pure Atta Gold.",
    category: "Macro Product Cinema",
    client: "Atta Gold Showcase",
    badge: "Macro Simulation",
    techStack: "Particle Physics • Topaz 4K • Studio Grade",
    desc: "Hyper-realistic slow-motion grain dynamics, macro fluid physics, and luxury studio lighting delivered in lossless 4K resolution within a 72-hour turnaround."
  },
  {
    id: "video-6",
    videoId: "22goyybbytM",
    title: "AI Brand Film — Sample",
    category: "Enterprise Studio Showcase",
    client: "AbuQitmirLabs",
    badge: "Studio Showcase",
    techStack: "Multi-Engine Orchestration • 4K Master",
    desc: "Cinema-grade generative diffusion benchmark showing character continuity, photorealistic lighting, and seamless narrative transitions without uncanny artifacts."
  }
];

export default function AIVideoCreator() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedStyleIndex, setSelectedStyleIndex] = useState<number>(0);

  // Interactive ROI Calculator State
  const [videosPerMonth, setVideosPerMonth] = useState<number>(3);
  const [videoTierType, setVideoTierType] = useState<'teaser' | 'explainer' | 'social'>('teaser');

  const calculationData = useMemo(() => {
    const traditionalCostPerVideo = videoTierType === 'teaser' ? 6500 : videoTierType === 'explainer' ? 8500 : 4000;
    const traditionalTimelineDays = videoTierType === 'teaser' ? 24 : videoTierType === 'explainer' ? 30 : 18;

    const abuQitmirCostPerVideo = videoTierType === 'teaser' ? 650 : videoTierType === 'explainer' ? 950 : 500;
    const abuQitmirTimelineDays = videoTierType === 'teaser' ? 3 : videoTierType === 'explainer' ? 4 : 2;

    const annualTraditionalCost = traditionalCostPerVideo * videosPerMonth * 12;
    const annualAbuQitmirCost = abuQitmirCostPerVideo * videosPerMonth * 12;
    const annualSavings = annualTraditionalCost - annualAbuQitmirCost;
    const daysSavedPerVideo = traditionalTimelineDays - abuQitmirTimelineDays;

    return {
      traditionalCostPerVideo,
      abuQitmirCostPerVideo,
      annualTraditionalCost,
      annualAbuQitmirCost,
      annualSavings,
      daysSavedPerVideo,
      traditionalTimelineDays,
      abuQitmirTimelineDays
    };
  }, [videosPerMonth, videoTierType]);

  const pageTitle = "AI Video Creation Services | Cinematic AI Production Agency | AbuQitmirLabs";
  const pageDescription = "Cinematic AI video production agency combining human direction with generative AI. Teasers, explainers, ads & founder stories for US, UK & global brands.";
  const canonicalUrl = "https://www.abuqitmirlabs.tech/ai-video-creation";

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.abuqitmirlabs.tech/#organization",
        "name": "AbuQitmirLabs",
        "url": "https://www.abuqitmirlabs.tech",
        "logo": "https://www.abuqitmirlabs.tech/logo.png",
        "foundingDate": "2021",
        "founder": {
          "@type": "Person",
          "name": "Abu Qitmir Mohammad Shiraz Al-Madani"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Karachi",
          "addressCountry": "PK"
        },
        "sameAs": [
          "https://www.linkedin.com/in/abu-qitmir-697423390/",
          "https://x.com/AbuQitmir",
          "https://www.youtube.com/@AbuQitmir"
        ]
      },
      {
        "@type": "Service",
        "@id": "https://www.abuqitmirlabs.tech/ai-video-creation#service",
        "name": "Cinematic AI Video Creation & Production Services",
        "serviceType": "Generative AI Video Production & Creative Direction",
        "provider": {
          "@id": "https://www.abuqitmirlabs.tech/#organization"
        },
        "areaServed": [
          { "@type": "Country", "name": "United States" },
          { "@type": "Country", "name": "United Kingdom" },
          { "@type": "Country", "name": "United Arab Emirates" },
          { "@type": "Country", "name": "Saudi Arabia" },
          { "@type": "Country", "name": "Qatar" },
          { "@type": "Country", "name": "Kuwait" },
          { "@type": "Country", "name": "Canada" },
          { "@type": "Country", "name": "Australia" },
          { "@type": "Country", "name": "Poland" },
          { "@type": "Country", "name": "Pakistan" }
        ],
        "description": "High-end cinematic AI video creation blending experienced film direction, multi-model generative orchestration, sound design, and 4K color grading.",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "650",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "url": canonicalUrl
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.abuqitmirlabs.tech/ai-video-creation#breadcrumbs",
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
            "name": "Services",
            "item": "https://www.abuqitmirlabs.tech/#services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "AI Video Creation",
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.abuqitmirlabs.tech/ai-video-creation#faq",
        "mainEntity": faqData.map(item => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      }
    ]
  };

  const selectedDeliverable = videoDeliverableStyles[selectedStyleIndex];

  return (
    <div className="bg-[#050505] text-[#f4f4f5] min-h-screen selection:bg-[#ccff00] selection:text-black">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="AI video creation, cinematic AI video agency, generative AI video production, Runway Gen-3 production, Kling AI video, AI video studio, enterprise AI commercial production, AbuQitmirLabs" />
        <meta name="author" content="AbuQitmirLabs" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="language" content="English" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://i.postimg.cc/t4D5HtZr/abuqitmirlabs-tech.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="AbuQitmirLabs" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://i.postimg.cc/t4D5HtZr/abuqitmirlabs-tech.jpg" />
        <meta name="twitter:site" content="@AbuQitmir" />
        <meta name="twitter:creator" content="@AbuQitmir" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(schemaJsonLd)}
        </script>
      </Helmet>

      {/* Global Navigation Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden border-b border-white/5">
        {/* Ambient Glow & Grid Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#ccff00]/5 blur-[140px] rounded-full" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-6">
            <Breadcrumbs 
              items={[
                { name: 'Home', to: '/' },
                { name: 'Services', to: '/#services' },
                { name: 'AI Video Creation', to: '/ai-video-creation' }
              ]}
            />
          </div>

          <div className="max-w-4xl">
            {/* Cinematic Studio Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 text-[#ccff00] text-xs font-mono tracking-widest uppercase mb-8 backdrop-blur-md"
            >
              <Clapperboard className="w-3.5 h-3.5" />
              <span>Cinematic AI Video Studio • Broadcast Direction</span>
            </motion.div>

            {/* Main H1 Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-white leading-[1.08] mb-8"
            >
              Cinematic AI Video Production <br />
              <span className="text-[#ccff00] italic font-normal">Without the Uncanny Slop.</span>
            </motion.h1>

            {/* Subtitle / Core Value Proposition */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed mb-10 max-w-3xl"
            >
              We unite veteran film direction with cutting-edge generative diffusion. 
              Escape $15,000 legacy agency quotes and 6-week delays. We script, storyboard, 
              orchestrate multi-model AI renders, and deliver Hollywood-grade commercial video in 72 hours.
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a 
                href="https://wa.me/923233260859?text=Hello%20AbuQitmirLabs,%20I%20want%20to%20discuss%20an%20AI%20Video%20Creation%20project." 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#ccff00] hover:bg-[#b8e600] text-black font-semibold rounded-xl text-sm tracking-wide transition-all shadow-[0_0_30px_rgba(204,255,0,0.3)] hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                <span>Request Video Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a 
                href="#case-studies"
                className="px-8 py-4 bg-zinc-900/80 hover:bg-zinc-800 text-white font-medium rounded-xl text-sm border border-white/10 hover:border-white/20 transition-all flex items-center gap-2"
              >
                <Film className="w-4 h-4 text-[#ccff00]" />
                <span>Explore Client Work</span>
              </a>

              <a 
                href="#roi-calculator"
                className="px-6 py-4 text-zinc-400 hover:text-white text-sm font-mono transition-colors flex items-center gap-1.5"
              >
                <BarChart3 className="w-4 h-4 text-[#ccff00]" />
                <span>Calculate Cost Savings →</span>
              </a>
            </motion.div>
          </div>

          {/* Quick Metrics & Production Credentials Strip */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/10"
          >
            <div className="bg-zinc-950/60 border border-white/5 p-5 rounded-2xl">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-1">48–72 Hrs</div>
              <div className="text-xs text-zinc-400 font-sans uppercase tracking-wider">Average Turnaround</div>
            </div>
            <div className="bg-zinc-950/60 border border-white/5 p-5 rounded-2xl">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#ccff00] mb-1">78% Lower</div>
              <div className="text-xs text-zinc-400 font-sans uppercase tracking-wider">Production Cost vs Agencies</div>
            </div>
            <div className="bg-zinc-950/60 border border-white/5 p-5 rounded-2xl">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-1">4K Master</div>
              <div className="text-xs text-zinc-400 font-sans uppercase tracking-wider">DaVinci Color & Topaz Detail</div>
            </div>
            <div className="bg-zinc-950/60 border border-white/5 p-5 rounded-2xl">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#ccff00] mb-1">Zero Slop</div>
              <div className="text-xs text-zinc-400 font-sans uppercase tracking-wider">Guaranteed Scene Coherence</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 1: The Problem — The 4 Traps of Modern Video Production */}
      <section className="py-24 bg-[#080808] border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 border border-red-500/20 bg-red-500/10 px-3 py-1 rounded-full">
              The Reality Check
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mt-4 mb-6 leading-tight">
              Why 90% of Brands Get Stuck Between Absurd Agency Invoices and Uncanny AI Junk.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              Video is undisputed as the highest-converting medium on earth. Yet scaling it 
              without compromising dignity or draining runway has historically been impossible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-900/40 border border-red-500/20 p-8 rounded-3xl relative overflow-hidden group hover:border-red-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-6 font-mono text-sm font-bold">
                01
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">The "AI Slop" Credibility Trap</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Cheap AI video generators produce melting fingers, morphing backgrounds, robotic voices, and plastic skin. 
                Posting raw algorithmic output communicates to enterprise buyers that your product is amateur and untrustworthy.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden group hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 mb-6 font-mono text-sm font-bold">
                02
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">The $10,000+ Agency Extortion</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Traditional commercial production houses charge five-figure retainers for simple brand explainers. 
                Between location rentals, equipment leases, hair/makeup, and union crew minimums, 80% of your budget goes to overhead rather than narrative impact.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden group hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 mb-6 font-mono text-sm font-bold">
                03
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">In-House Production Burnout</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Social algorithms demand 15 to 30 video assets every single month. In-house marketing teams collapse under the pressure 
                of shooting, editing, syncing audio, and generating captions, leading to severe creative exhaustion and declining output velocity.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden group hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 mb-6 font-mono text-sm font-bold">
                04
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">The Generic Template Curse</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Canva and generic motion templates make every SaaS platform and consumer brand look indistinguishable. 
                When your competitors use the exact same motion graphic preset, your message fails to trigger emotional resonance or memorability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Why This Happens — The Technical Diagnosis */}
      <section className="py-24 bg-[#050505] border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] border border-[#ccff00]/20 bg-[#ccff00]/10 px-3 py-1 rounded-full">
                Behind The Curtain
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mt-4 mb-6 leading-tight">
                Generative Models Are Instruments, <br />
                <span className="text-zinc-400 italic font-normal">Not Film Directors.</span>
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed mb-6">
                Typing text into a model like Runway, Sora, or Midjourney does not make someone a filmmaker. 
                Raw AI generates pixels based on statistical likelihood; it knows nothing about three-act dramatic structure, 
                camera lens millimeter optics, volumetric lighting, or the psychology of viewer retention.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#ccff00]/20 flex items-center justify-center text-[#ccff00] shrink-0 mt-1">
                    <Check className="w-3 h-3" />
                  </div>
                  <p className="text-zinc-300 text-sm">
                    <strong className="text-white">Lacks Cinematic Composition:</strong> Raw models default to flat framing and awkward subject drift without precise focal-length guidance.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#ccff00]/20 flex items-center justify-center text-[#ccff00] shrink-0 mt-1">
                    <Check className="w-3 h-3" />
                  </div>
                  <p className="text-zinc-300 text-sm">
                    <strong className="text-white">No Acoustic Sound Design:</strong> Over 60% of emotional impact in video is sound. Raw tools output dead silence or flat synthesized monotone.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#ccff00]/20 flex items-center justify-center text-[#ccff00] shrink-0 mt-1">
                    <Check className="w-3 h-3" />
                  </div>
                  <p className="text-zinc-300 text-sm">
                    <strong className="text-white">Zero Continuity Understanding:</strong> Changing prompts causes clothing, faces, and lighting to glitch from shot to shot without proprietary seed locking.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 shadow-2xl relative">
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="text-xs font-mono text-zinc-500 ml-2">multi-model-orchestration-engine.log</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#ccff00] bg-[#ccff00]/10 px-2.5 py-0.5 rounded">STUDIO PIPELINE v4.2</span>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 flex items-start justify-between">
                    <div>
                      <span className="text-[#ccff00]">STEP 01: SCRIPT & PACING</span>
                      <p className="text-zinc-400 mt-1">Human narrative arc • 3-second hook • conversion messaging</p>
                    </div>
                    <span className="text-zinc-500 text-[10px]">DIRECTOR LED</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 flex items-start justify-between">
                    <div>
                      <span className="text-sky-400">STEP 02: MULTI-MODEL GENERATION</span>
                      <p className="text-zinc-400 mt-1">Flux Pro (Keyframing) + Kling 1.5 & Runway Gen-3 (Motion Physics)</p>
                    </div>
                    <span className="text-zinc-500 text-[10px]">PARALLEL RENDER</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 flex items-start justify-between">
                    <div>
                      <span className="text-purple-400">STEP 03: NEURAL AUDIO & FOLEY</span>
                      <p className="text-zinc-400 mt-1">ElevenLabs voice mastering • Sub-bass hits • Environmental Foley</p>
                    </div>
                    <span className="text-zinc-500 text-[10px]">ACOUSTIC SYNC</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 flex items-start justify-between">
                    <div>
                      <span className="text-emerald-400">STEP 04: DAVINCI RESOLVE & TOPAZ 4K</span>
                      <p className="text-zinc-400 mt-1">Timeline editorial assembly • Film grain • 4K AI upscaling</p>
                    </div>
                    <span className="text-zinc-500 text-[10px]">BROADCAST MASTER</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
                    <span>Commercial Licensing & Copyright Safeguarded</span>
                  </div>
                  <span className="text-white font-mono font-bold">100% Client Ownership</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: The AbuQitmirLabs Solutions — 5 Deliverable Styles */}
      <section className="py-24 bg-[#080808] border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] border border-[#ccff00]/20 bg-[#ccff00]/10 px-3 py-1 rounded-full">
              Full Spectrum Production
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mt-4 mb-6 leading-tight">
              Five Commercial Video Formats Engineered to Convert.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              From dark atmospheric horror teasers to crisp B2B clinical onboarding, explore how we 
              tailor generation pipelines to specific business objectives.
            </p>
          </div>

          {/* Interactive Style Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {videoDeliverableStyles.map((style, idx) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyleIndex(idx)}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedStyleIndex === idx
                    ? "bg-[#ccff00] text-black shadow-[0_0_20px_rgba(204,255,0,0.25)] font-semibold"
                    : "bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5"
                }`}
              >
                <span>{style.name.split("&")[0]}</span>
                {selectedStyleIndex === idx && <Sparkles className="w-3.5 h-3.5 text-black" />}
              </button>
            ))}
          </div>

          {/* Selected Deliverable Showcase Card */}
          <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/20 px-3 py-1 rounded-full">
                    {selectedDeliverable.badge}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-white/5 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#ccff00]" /> {selectedDeliverable.duration}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-white/5 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-[#ccff00]" /> {selectedDeliverable.turnaround}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-white mb-4">
                  {selectedDeliverable.name}
                </h3>

                <p className="text-zinc-300 text-base leading-relaxed mb-6 font-light">
                  {selectedDeliverable.description}
                </p>

                <div className="mb-6 p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                    Ideal Deployment:
                  </span>
                  <p className="text-sm text-zinc-200">
                    {selectedDeliverable.idealFor}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#ccff00]/5 border border-[#ccff00]/20 flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-[#ccff00] shrink-0" />
                  <p className="text-xs sm:text-sm text-zinc-200">
                    <strong className="text-[#ccff00]">Measured Impact:</strong> {selectedDeliverable.metrics}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Production Pipeline Stack</span>
                </h4>
                <div className="space-y-3">
                  {selectedDeliverable.pipeline.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/60 border border-white/5">
                      <div className="w-6 h-6 rounded-lg bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] text-xs font-mono font-bold shrink-0">
                        {sIdx + 1}
                      </div>
                      <span className="text-xs text-zinc-300 font-sans leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/5">
                  <a
                    href="https://wa.me/923233260859?text=Hello%20AbuQitmirLabs,%20I%20am%20interested%20in%20a%20video%20deliverable."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#ccff00] hover:bg-[#b8e600] text-black font-semibold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Commission This Style</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Real Evidence & Verified Client Case Studies */}
      <section id="case-studies" className="py-24 bg-[#050505] border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] border border-[#ccff00]/20 bg-[#ccff00]/10 px-3 py-1 rounded-full">
              Proven Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mt-4 mb-6 leading-tight">
              Real Client Work. Verifiable Results. Zero Hypotheticals.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              Every metric and client referenced below is an authentic production deployment engineered by 
              AbuQitmirLabs since our founding in Karachi in 2021.
            </p>
          </div>

          {/* 6 Video Cards matching Home Page Case Studies Style */}
          <div className="mb-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ccff00] font-bold flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
                  FEATURED VIDEO CASE STUDIES
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
                  Production Video Showcase: <span className="text-[#ccff00]">6 Commercial Deployments</span>
                </h3>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Click any thumbnail to stream in 4K resolution
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredVideoCaseStudies.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex flex-col bg-zinc-950/80 border border-white/10 rounded-3xl overflow-hidden hover:border-[#ccff00]/40 transition-all shadow-xl backdrop-blur-sm hover:shadow-[0_0_35px_rgba(204,255,0,0.1)]"
                >
                  {/* Video Container with Facade */}
                  <div className="aspect-video relative overflow-hidden bg-black/60">
                    <YouTubeFacade videoId={item.videoId} title={item.title} />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/20 px-2.5 py-0.5 rounded-full font-bold">
                          {item.badge}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400 truncate">
                          {item.client}
                        </span>
                      </div>

                      <div className="mb-2">
                        <AnimatedBreathingText
                          text={item.title}
                          className="text-lg font-bold text-white tracking-tight group-hover:text-[#ccff00] transition-colors line-clamp-2 block"
                        />
                      </div>

                      <div className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mb-4">
                        <MagicText text={item.desc} className="text-xs sm:text-sm text-zinc-400 font-light" />
                      </div>
                    </div>

                    <div>
                      {/* Tech stack badge */}
                      <div className="pt-3 border-t border-white/5 mb-3 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                        <span className="truncate">{item.techStack}</span>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#ccff00] font-mono">
                          CASE STUDY
                        </span>
                        {item.clientUrl ? (
                          <a
                            href={item.clientUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors font-mono"
                          >
                            <span>Client Site</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <a
                            href={`https://www.youtube.com/watch?v=${item.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#ccff00] transition-colors font-mono"
                          >
                            <span>YouTube</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case Study 1: GhastlyPages */}
            <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 hover:border-[#ccff00]/40 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-[#ccff00] bg-[#ccff00]/10 px-3 py-1 rounded-full border border-[#ccff00]/20">
                    Horror Literature & Media
                  </span>
                  <a 
                    href="https://ghastlypages.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    GhastlyPages.com <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <h3 className="text-2xl font-serif text-white mb-3">
                  GhastlyPages: 40+ Cinematic Teaser Library
                </h3>

                <p className="text-zinc-300 text-sm font-light leading-relaxed mb-6">
                  Delivered an expansive library of dark atmospheric video teasers for classic horror stories 
                  and original fiction. Orchestrated Midjourney v6 lighting keyframes with Runway Gen-3 camera movement 
                  and deep acoustic Foley sounds.
                </p>

                <div className="space-y-2 mb-6 text-xs text-zinc-400">
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>Delivered Assets:</span>
                    <strong className="text-white font-mono">40+ Cinematic Video Trailers</strong>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>Reach Acceleration:</span>
                    <strong className="text-[#ccff00] font-mono">3.4x Higher Organic Reach on TikTok</strong>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>Visual Fidelity:</span>
                    <strong className="text-white font-mono">Zero Morphing / Zero Glitches</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>STACK: FLUX PRO • RUNWAY GEN-3 • ELEVENLABS</span>
                <span className="text-[#ccff00]">VERIFIED DEPLOYMENT</span>
              </div>
            </div>

            {/* Case Study 2: Atta Gold */}
            <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 hover:border-[#ccff00]/40 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-[#ccff00] bg-[#ccff00]/10 px-3 py-1 rounded-full border border-[#ccff00]/20">
                    Luxury Commodity & E-Commerce
                  </span>
                  <span className="text-xs font-mono text-zinc-400">Atta Gold Product Launch</span>
                </div>

                <h3 className="text-2xl font-serif text-white mb-3">
                  Atta Gold: 72-Hour Luxury Launch Teaser
                </h3>

                <p className="text-zinc-300 text-sm font-light leading-relaxed mb-6">
                  Engineered hyper-realistic liquid gold physics, macro reflections, and high-fashion lighting 
                  for a premier gold product launch without requiring physical studio rentals or high-risk jewelry transportation.
                </p>

                <div className="space-y-2 mb-6 text-xs text-zinc-400">
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>Production Timeline:</span>
                    <strong className="text-white font-mono">72 Hours (vs 4-Week Agency SLA)</strong>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>Budget Efficiency:</span>
                    <strong className="text-[#ccff00] font-mono">78% Production Cost Reduction</strong>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>Asset Delivery:</span>
                    <strong className="text-white font-mono">16:9 Master + 9:16 Reels Variant</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>STACK: KLING 1.5 • LUMA • TOPAZ 4K • DAVINCI</span>
                <span className="text-[#ccff00]">VERIFIED DEPLOYMENT</span>
              </div>
            </div>

            {/* Case Study 3: ClinicOSH */}
            <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 hover:border-[#ccff00]/40 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-[#ccff00] bg-[#ccff00]/10 px-3 py-1 rounded-full border border-[#ccff00]/20">
                    Healthtech & Clinical Workflows
                  </span>
                  <span className="text-xs font-mono text-zinc-400">ClinicOSH Healthcare Platform</span>
                </div>

                <h3 className="text-2xl font-serif text-white mb-3">
                  ClinicOSH: HIPAA-Conscious Video Explainers
                </h3>

                <p className="text-zinc-300 text-sm font-light leading-relaxed mb-6">
                  Synthesized complex EHR interoperability, patient intake triage, and HIPAA-compliant data security 
                  into a series of 60-second animated clinical explainers and paid social video advertisements.
                </p>

                <div className="space-y-2 mb-6 text-xs text-zinc-400">
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>Audience Retention:</span>
                    <strong className="text-[#ccff00] font-mono">84% Full Video Completion Rate</strong>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>Conversion Lift:</span>
                    <strong className="text-white font-mono">+36% Clinical Demo Bookings</strong>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>Compliance:</span>
                    <strong className="text-white font-mono">100% Medically Vetted Scripting</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>STACK: MIDJOURNEY V6 • RUNWAY • ELEVENLABS PRO</span>
                <span className="text-[#ccff00]">VERIFIED DEPLOYMENT</span>
              </div>
            </div>

            {/* Case Study 4: ProFit Command Center */}
            <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 hover:border-[#ccff00]/40 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-[#ccff00] bg-[#ccff00]/10 px-3 py-1 rounded-full border border-[#ccff00]/20">
                    B2B SaaS & Venture Capital
                  </span>
                  <span className="text-xs font-mono text-zinc-400">ProFit Command Center</span>
                </div>

                <h3 className="text-2xl font-serif text-white mb-3">
                  ProFit: High-Impact Founder Vision Film
                </h3>

                <p className="text-zinc-300 text-sm font-light leading-relaxed mb-6">
                  Produced a cinema-grade founder introduction film setting the stage for executive investor meetings. 
                  Blended metaphorical visual effects with razor-sharp business positioning and an orchestral score.
                </p>

                <div className="space-y-2 mb-6 text-xs text-zinc-400">
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>Investment Outcome:</span>
                    <strong className="text-[#ccff00] font-mono">Accelerated Seed Round Conversations</strong>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>Production Speed:</span>
                    <strong className="text-white font-mono">5 Business Days End-to-End</strong>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>Format Flexibility:</span>
                    <strong className="text-white font-mono">Keynote Master + Pitch Deck Cuts</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>STACK: FLUX • KLING • DAVINCI FAIRLIGHT</span>
                <span className="text-[#ccff00]">VERIFIED DEPLOYMENT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Interactive ROI & Timeline Calculator */}
      <section id="roi-calculator" className="py-24 bg-[#080808] border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] border border-[#ccff00]/20 bg-[#ccff00]/10 px-3 py-1 rounded-full">
              Transparent Math
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mt-4 mb-6 leading-tight">
              Compare Traditional Agency Invoices <br />
              <span className="text-zinc-400 italic font-normal">Against AbuQitmirLabs Studio Efficiency.</span>
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              Adjust your monthly volume and deliverable type to see immediate capital and schedule savings.
            </p>
          </div>

          <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 pb-10 border-b border-white/10">
              {/* Selector 1: Video Tier */}
              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-3">
                  Select Deliverable Archetype:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setVideoTierType('social')}
                    className={`p-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      videoTierType === 'social'
                        ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold'
                        : 'bg-zinc-900 text-zinc-400 border-white/5 hover:border-white/15'
                    }`}
                  >
                    Social Ads (15s)
                  </button>
                  <button
                    onClick={() => setVideoTierType('teaser')}
                    className={`p-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      videoTierType === 'teaser'
                        ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold'
                        : 'bg-zinc-900 text-zinc-400 border-white/5 hover:border-white/15'
                    }`}
                  >
                    Teasers (30s)
                  </button>
                  <button
                    onClick={() => setVideoTierType('explainer')}
                    className={`p-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      videoTierType === 'explainer'
                        ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold'
                        : 'bg-zinc-900 text-zinc-400 border-white/5 hover:border-white/15'
                    }`}
                  >
                    Explainers (60s)
                  </button>
                </div>
              </div>

              {/* Selector 2: Monthly Volume */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Videos Commissioned Per Month:
                  </label>
                  <span className="text-sm font-mono font-bold text-[#ccff00]">
                    {videosPerMonth} {videosPerMonth === 1 ? 'Video' : 'Videos'} / Month
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={videosPerMonth}
                  onChange={(e) => setVideosPerMonth(parseInt(e.target.value, 10))}
                  className="w-full accent-[#ccff00] bg-zinc-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-2">
                  <span>1 / Mo</span>
                  <span>4 / Mo</span>
                  <span>8 / Mo</span>
                  <span>12 / Mo</span>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                  Traditional Agency (Annual)
                </span>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-red-400">
                  ${calculationData.annualTraditionalCost.toLocaleString()}
                </div>
                <span className="text-[10px] text-zinc-500 font-mono mt-1 block">
                  ~${calculationData.traditionalCostPerVideo.toLocaleString()} per asset + delays
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-[#ccff00]/20">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#ccff00] block mb-2">
                  AbuQitmirLabs Studio (Annual)
                </span>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#ccff00]">
                  ${calculationData.annualAbuQitmirCost.toLocaleString()}
                </div>
                <span className="text-[10px] text-zinc-400 font-mono mt-1 block">
                  ~${calculationData.abuQitmirCostPerVideo.toLocaleString()} per asset
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/30">
                <span className="text-[11px] font-mono uppercase tracking-wider text-white font-bold block mb-2">
                  Estimated Capital Saved
                </span>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white">
                  ${calculationData.annualSavings.toLocaleString()}
                </div>
                <span className="text-[10px] text-[#ccff00] font-mono mt-1 block">
                  + {calculationData.daysSavedPerVideo} days saved per asset
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-zinc-400">
                ⚡ <strong className="text-zinc-200">Production Turnaround:</strong> {calculationData.abuQitmirTimelineDays} days with AbuQitmirLabs vs {calculationData.traditionalTimelineDays} days traditional studio SLA.
              </div>
              <a
                href="https://wa.me/923233260859?text=Hello%20AbuQitmirLabs,%20I%20used%20your%20ROI%20calculator%20and%20want%20to%20commission%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-[#ccff00] hover:bg-[#b8e600] text-black font-semibold rounded-lg text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
              >
                <span>Lock In This Pricing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Decision Framework — Comparison Matrix */}
      <section className="py-24 bg-[#050505] border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] border border-[#ccff00]/20 bg-[#ccff00]/10 px-3 py-1 rounded-full">
              Decision Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mt-4 mb-6 leading-tight">
              Traditional Production vs DIY AI Apps vs AbuQitmirLabs.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              Choose the right production model based on your budget, required visual pedigree, and turnaround speed.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-6 text-xs font-mono uppercase text-zinc-400">Production Dimension</th>
                  <th className="py-4 px-6 text-xs font-mono uppercase text-red-400">Traditional Film Agency</th>
                  <th className="py-4 px-6 text-xs font-mono uppercase text-zinc-400">Self-Service AI Apps (DIY)</th>
                  <th className="py-4 px-6 text-xs font-mono uppercase text-[#ccff00] bg-[#ccff00]/5">AbuQitmirLabs Studio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Cost Per Asset</td>
                  <td className="py-4 px-6 text-zinc-400">$6,000 to $25,000+</td>
                  <td className="py-4 px-6 text-zinc-400">$30/mo subscription + 40 hrs staff time</td>
                  <td className="py-4 px-6 text-[#ccff00] font-semibold bg-[#ccff00]/5">$500 to $1,800 flat</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Turnaround SLA</td>
                  <td className="py-4 px-6 text-zinc-400">4 to 8 Weeks</td>
                  <td className="py-4 px-6 text-zinc-400">Immediate, but unusable output</td>
                  <td className="py-4 px-6 text-[#ccff00] font-semibold bg-[#ccff00]/5">48 to 72 Hours</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Visual Coherence</td>
                  <td className="py-4 px-6 text-emerald-400">High (Live camera)</td>
                  <td className="py-4 px-6 text-red-400">Very Poor (Melting, morphing faces)</td>
                  <td className="py-4 px-6 text-[#ccff00] font-semibold bg-[#ccff00]/5">Broadcast Grade (Seed-locked)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Sound & Voiceover</td>
                  <td className="py-4 px-6 text-zinc-400">Studio audio engineer + talent fee</td>
                  <td className="py-4 px-6 text-red-400">Silent or robotic stock audio</td>
                  <td className="py-4 px-6 text-[#ccff00] font-semibold bg-[#ccff00]/5">ElevenLabs Neural + Foley Master</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Post-Production & 4K</td>
                  <td className="py-4 px-6 text-zinc-400">Included (Slow)</td>
                  <td className="py-4 px-6 text-red-400">None (Low 720p/1080p compression)</td>
                  <td className="py-4 px-6 text-[#ccff00] font-semibold bg-[#ccff00]/5">DaVinci Resolve + Topaz 4K</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Commercial Rights</td>
                  <td className="py-4 px-6 text-zinc-400">Restricted by talent contracts</td>
                  <td className="py-4 px-6 text-zinc-400">Vague platform terms</td>
                  <td className="py-4 px-6 text-[#ccff00] font-semibold bg-[#ccff00]/5">100% Perpetual Ownership</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 7: Transparent Pricing Tiers */}
      <section className="py-24 bg-[#080808] border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] border border-[#ccff00]/20 bg-[#ccff00]/10 px-3 py-1 rounded-full">
              Transparent Investment
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mt-4 mb-6 leading-tight">
              Enterprise Quality Without Hidden Studio Markups.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              Every package includes scriptwriting, multi-model generation, neural voiceover, sound effects, 
              color grading, and full commercial copyright transfer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-2">Starter Vignette</span>
                <h3 className="text-2xl font-serif text-white mb-2">Cinematic Teaser</h3>
                <p className="text-zinc-400 text-xs mb-6 font-light">Ideal for new product unveils, book trailers, and event reveals.</p>
                <div className="text-4xl font-mono font-bold text-white mb-1">$650</div>
                <span className="text-xs font-mono text-zinc-500 block mb-6">Per Single Asset • 48-Hour SLA</span>

                <ul className="space-y-3 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <span>Up to 30 Seconds High-Impact Duration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <span>Runway Gen-3 + Flux Pro Architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <span>Neural Voiceover + Cinematic Sound FX</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <span>Native 16:9 & 9:16 Vertical Export</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <span>Topaz AI 4K Resolution Master</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href="https://wa.me/923233260859?text=Hello%20AbuQitmirLabs,%20I%20want%20to%20order%20the%20$650%20Cinematic%20Teaser%20package."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-medium rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/10"
                >
                  <span>Select Teaser Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Tier 2: Featured */}
            <div className="bg-zinc-950 border-2 border-[#ccff00] rounded-3xl p-8 flex flex-col justify-between relative shadow-[0_0_40px_rgba(204,255,0,0.15)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ccff00] text-black text-[10px] font-mono font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                Most Popular for B2B & Growth
              </div>

              <div>
                <span className="text-xs font-mono text-[#ccff00] uppercase tracking-widest block mb-2">Campaign Suite</span>
                <h3 className="text-2xl font-serif text-white mb-2">Commercial Explainer</h3>
                <p className="text-zinc-400 text-xs mb-6 font-light">Engineered for tech explainers, medical onboarding, and high-CTR ad campaigns.</p>
                <div className="text-4xl font-mono font-bold text-[#ccff00] mb-1">$1,650</div>
                <span className="text-xs font-mono text-zinc-400 block mb-6">3 Multi-Angle Variants • 72-Hour SLA</span>

                <ul className="space-y-3 text-xs text-zinc-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <span>Up to 90 Seconds Main Explainer + 2 Short Cuts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <span>Kling 1.5 + Runway + LoRA Character Lock</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <span>Professional Scriptwriting & Narrative Storyboard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <span>Custom Kinematics & Subtitle Typography</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <span>DaVinci Studio Color Grade & 4K Masters</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href="https://wa.me/923233260859?text=Hello%20AbuQitmirLabs,%20I%20want%20to%20order%20the%20$1,650%20Commercial%20Explainer%20suite."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Commission Explainer Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-2">Monthly Engine</span>
                <h3 className="text-2xl font-serif text-white mb-2">Enterprise Video Retainer</h3>
                <p className="text-zinc-400 text-xs mb-6 font-light">Dedicated monthly production for scaling brands and venture-backed startups.</p>
                <div className="text-4xl font-mono font-bold text-white mb-1">$3,800</div>
                <span className="text-xs font-mono text-zinc-500 block mb-6">8 Delivered Master Assets / Month</span>

                <ul className="space-y-3 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <span>8 Broadcast-Quality Videos (Explainers, Reels, Ads)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <span>Dedicated Film Director & Sound Designer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <span>Unlimited Aspect Ratio Variations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <span>Same-Week Revisions & Urgent Turnarounds</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <span>Full Brand Asset Library Archive</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href="https://wa.me/923233260859?text=Hello%20AbuQitmirLabs,%20I%20want%20to%20discuss%20the%20$3,800%20Enterprise%20Video%20Retainer."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-medium rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/10"
                >
                  <span>Inquire for Retainer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Markets Marquee */}
      <section className="py-12 bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center justify-center gap-2">
            <Globe2 className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>Serving Clients Worldwide Across Global Commercial Hubs</span>
          </span>
        </div>
        <CountryMarquee />
      </section>

      {/* Section 8: FAQ Section (Rank in AI Overviews & Featured Snippets) */}
      <section className="py-24 bg-[#050505] border-b border-white/5 relative">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] border border-[#ccff00]/20 bg-[#ccff00]/10 px-3 py-1 rounded-full">
              Answers & Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mt-4 mb-6 leading-tight">
              Frequently Asked Questions on AI Video Production.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              Clear, definitive answers to common inquiries from CMOs, founders, and creative directors.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((item, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className={`border rounded-2xl transition-all overflow-hidden ${
                    isOpen ? 'border-[#ccff00]/40 bg-zinc-950' : 'border-white/5 bg-zinc-900/30 hover:border-white/10'
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4"
                  >
                    <span className="text-base sm:text-lg font-serif font-medium text-white">
                      {item.q}
                    </span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-[#ccff00] text-black' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 sm:px-8 text-sm text-zinc-300 font-light leading-relaxed border-t border-white/5 pt-4">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Conversion CTA Section */}
      <section className="py-24 bg-[#080808] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ccff00]/10 blur-[140px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready in 72 Hours</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
            Stop Burning Runway on Slow Agencies. <br />
            <span className="text-[#ccff00] italic font-normal">Commission Your AI Video Today.</span>
          </h2>

          <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 font-light">
            Share your product link, pitch deck, or script outline. We will analyze your narrative 
            and deliver a broadcast-quality test preview within 48 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/923233260859?text=Hello%20AbuQitmirLabs,%20I%20am%20ready%20to%20commission%20a%20cinematic%20AI%20video."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold rounded-xl text-sm tracking-wide transition-all shadow-[0_0_30px_rgba(204,255,0,0.35)] hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            >
              <span>Start on WhatsApp Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              to="/contact"
              className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-medium rounded-xl text-sm border border-white/10 hover:border-white/20 transition-all flex items-center gap-2"
            >
              <span>Submit Project Brief</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Free Service Tools Banner */}
      <ServiceToolCtaBanner
        toolKeys={['project-cost-estimator', 'ai-readiness-score']}
        headline="Plan Video Production Costs & AI Readiness"
        subheadline="Estimate your digital production budget and benchmark organizational readiness for generative AI deployment — completely free."
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

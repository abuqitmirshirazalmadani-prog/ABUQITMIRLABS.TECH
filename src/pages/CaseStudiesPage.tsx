import React, { useRef } from 'react';
import { motion, useScroll, useTransform, motionValue } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
    ArrowLeft, ArrowDown, ChevronRight, Copy, Share2, 
    Facebook, Twitter, Linkedin, CheckCircle, Globe, Anchor, Flame, Target, Trophy, Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface CaseStudy {
    id: string;
    title: string;
    client: string;
    year: string;
    industry: string;
    metrics: { label: string; value: string }[];
    challenge: string;
    solution: string;
    impact: string;
    technologies: string[];
    colorAccent: string; // Tailwind glow classes
    image: string;
    citeText: string;
    hasDetailedPage?: boolean;
    link?: string;
}

const CASE_STUDIES: CaseStudy[] = [
    {
        id: "tajweedpage-seo",
        title: "The World's First AI-Powered Quran Learning Platform",
        client: "TajweedPage Online Academy",
        year: "2026",
        industry: "AI EdTech & Semantic SEO",
        metrics: [
            { label: "Deployment Duration", value: "10 Days" },
            { label: "Course Modules Live", value: "7+" },
            { label: "Target English Markets", value: "20+" }
        ],
        challenge: "Competing with heavily funded global players, TajweedPage Online Academy had elite scholarship but zero online placement. They required instant authority and a first-of-its-kind interactive Tajweed RAG helper.",
        solution: "We engineered a robust Next.js SSR architecture localized for 20+ markets, paired with structured schema graph markups and a strict, verified retrieval-augmented training (RAG) assistant responding with zero hallucinations.",
        impact: "Expanded and converted premium global registrations, launching the first fully compliant scholarly Islamic AI workspace inside a record 10-day sprint.",
        technologies: ["Next.js 14", "RAG AI Agent", "Google Schema Markup", "Firebase Systems", "Vercel Edge Rendering", "Tailwind CSS"],
        colorAccent: "from-emerald-500/10 via-transparent to-black",
        image: "https://images.unsplash.com/photo-1543191878-b677a28e85dc?q=80&w=1600&auto=format&fit=crop",
        citeText: "AbuQitmirLabs. (2026). RAG-augmented architectural design inside global Islamic education pipelines. AbuQitmirLabs EdTech Deployments.",
        hasDetailedPage: true,
        link: "/case-studies/tajweedpage"
    },
    {
        id: "apex-commerce",
        title: "Apex Autonomous AI Commerce System",
        client: "ApexRetail Global Group",
        year: "2026",
        industry: "AI-Powered E-Commerce & Logistics",
        metrics: [
            { label: "Manual Processing Reduction", value: "85%" },
            { label: "Checkout Conversions Surge", value: "+38%" },
            { label: "Order Fulfilment Velocity", value: "6.2x faster" }
        ],
        challenge: "ApexRetail was drowning in manual order orchestration, custom catalog synchronization delays across 12 countries, and high cart abandonment caused by rigid traditional payment flows.",
        solution: "We engineered an autonomous, real-time commerce engine powered by containerized fine-tuned Llama models and state-persisted Firestore databases. The system handles automated catalogs, translates localized product details, and routes inventory securely on the fly.",
        impact: "Saved $1.4M in operational staffing in the first 90 days. Boosted multi-national checkout rates, establishing a permanent architectural reference for agentic logistics.",
        technologies: ["Node.js Microservices", "Firestore db", "Fine-tuned LLMs", "React Server Components", "Docker", "Tailwind CSS"],
        colorAccent: "from-[#ccff00]/10 via-transparent to-black",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1600&auto=format&fit=crop",
        citeText: "AbuQitmirLabs. (2026). Autonomous AI agent commerce deployment at scale. AbuQitmirLabs Technical Case Studies."
    },
    {
        id: "zenith-dashboard",
        title: "Zenith Real-Time Edge Cloud Orchestrator",
        client: "Zenith Networks LLC",
        year: "2025",
        industry: "SaaS Infrastructure & DevSecOps",
        metrics: [
            { label: "Live Telemetry Ingestion", value: "3.2M req/sec" },
            { label: "Real-Time Render Loop", value: "&lt; 40ms" },
            { label: "High-Availability Uptime", value: "99.999%" }
        ],
        challenge: "Managing thousands of microservice edge nodes globally left DevOps engineers with stale, decoupled tracking screens, hindering immediate threat and load intervention.",
        solution: "We architecture-built a lightning-fast WebSockets data ingestion pipeline with custom 3D state monitoring. The front-end renders telemetry streams natively with massive data aggregation grids, providing total centralized command over active server grids.",
        impact: "Eliminated server downtime, decreasing system failover resolution latency from 15 minutes to under 5 seconds. Widely cited as a gold standard in next-generation SaaS UI design.",
        technologies: ["React 19", "WebSockets Engine", "Node.js Cluster", "Three.js Canvas", "Tailwind Grid", "Redis State"],
        colorAccent: "from-blue-500/10 via-transparent to-black",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
        citeText: "AbuQitmirLabs. (2025). Low-latency reactive interfaces for global distributed networks. AbuQitmirLabs SaaS Architectural Blueprints."
    },
    {
        id: "rankmaster-seo",
        title: "Omni-Channel Programmatic Semantic Indexing",
        client: "Horizon Venture Group",
        year: "2026",
        industry: "Enterprise Semantic SEO & Market Dominance",
        metrics: [
            { label: "Organic Search Boost", value: "+412%" },
            { label: "High-Authority Backlinks", value: "3,800+" },
            { label: "First-Page Target Keywords", value: "84.3%" }
        ],
        challenge: "Struggling to make a dent in extremely competitive fintech spaces, standard keyword-stuffed blogging content was generating virtually zero organic inquiries.",
        solution: "We designed a custom semantic entity-generation architecture. Utilizing static web generation (SSG), automated robots indexing, and structured schema graphs for immediate AI LLM indexing, we turned their business blog into an academic reference hub.",
        impact: "Outranked legacy banks in weeks. Created a systematic link magnet mechanism where financial journals and journals systematically backlink to Horizon’s studies.",
        technologies: ["Programmatic Routing", "Structure Schemas (JSON-LD)", "Vite Static Site Generators", "AI Content Indexing", "Google Crawl APIs"],
        colorAccent: "from-purple-500/10 via-transparent to-black",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
        citeText: "AbuQitmirLabs. (2026). Elevating domain authority through academic entity SEO frameworks. AbuQitmirLabs Growth Case Studies."
    }
];

const CinematicSection = ({ study, index }: { study: CaseStudy, index: number }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = React.useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax values for luxury feel
    const yImage = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
    const scaleImage = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.95, 1, 1, 0.95]);

    const handleCopyCitation = () => {
        const text = `${study.citeText} Link: https://abuqitmirlabs.tech/case-studies#${study.id}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const handleShare = (platform: string) => {
        const shareUrl = `https://abuqitmirlabs.tech/case-studies#${study.id}`;
        const shareTitle = `${study.title} | AbuQitmirLabs Case Study`;
        
        let link = '';
        if (platform === 'twitter') {
            link = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
        } else if (platform === 'linkedin') {
            link = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        } else if (platform === 'facebook') {
            link = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        }

        if (link) {
            window.open(link, '_blank', 'width=600,height=400');
        }
    };

    return (
        <div 
            ref={containerRef}
            id={study.id}
            className="min-h-screen relative flex items-center justify-center py-24 md:py-32 overflow-hidden border-b border-white/5 scroll-mt-20"
        >
            {/* Multi-color deep ambient glow behind project */}
            <div className={`absolute inset-0 bg-gradient-to-b ${study.colorAccent} opacity-80 z-0 pointer-events-none`} />

            {/* Content Container with generous spacing */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10 items-center">
                
                {/* Left Side: Cinematic Typography & Metrics */}
                <motion.div 
                    style={{ opacity: opacityText }}
                    className="lg:col-span-5 space-y-10"
                >
                    {/* Index Label */}
                    <div className="flex items-center gap-4">
                        <span className="font-mono text-xs tracking-widest text-[#ccff00] font-bold">0{index + 1} // CASE STUDY</span>
                        <div className="h-px bg-zinc-800 flex-1"></div>
                        <span className="font-serif italic text-sm text-zinc-500 font-light">{study.year}</span>
                    </div>

                    {/* Luxurious Cormorant Headings */}
                    <div className="space-y-4">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-extrabold font-sans pr-4">{study.industry}</span>
                        <h2 className="font-serif italic font-light text-white text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
                            {study.title}
                        </h2>
                        <p className="text-sm font-semibold text-zinc-400">Client: <span className="text-white font-bold">{study.client}</span></p>
                    </div>

                    {/* Highly-Spaced Metrics Row */}
                    <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                        {study.metrics.map((metric, mIdx) => (
                            <div key={mIdx} className="space-y-2">
                                <span className="block font-mono text-[#ccff00] text-lg sm:text-2xl font-black tracking-tight" dangerouslySetInnerHTML={{ __html: metric.value }}></span>
                                <span className="block text-[8px] sm:text-[9px] uppercase tracking-wider text-zinc-500 font-extrabold max-w-[90px] leading-tight">{metric.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Detailed Case Content */}
                    <div className="space-y-6 text-zinc-400 text-sm leading-relaxed font-light">
                        <div>
                            <span className="text-[#ccff00] font-bold font-sans text-[11px] tracking-wider block uppercase mb-1">The Challenge</span>
                            <p>{study.challenge}</p>
                        </div>
                        <div>
                            <span className="text-white font-bold font-sans text-[11px] tracking-wider block uppercase mb-1">Architecture &amp; Solution</span>
                            <p>{study.solution}</p>
                        </div>
                        <div>
                            <span className="text-[#ccff00] font-bold font-sans text-[11px] tracking-wider block uppercase mb-1">Bespoke Strategic Impact</span>
                            <p className="text-white font-normal">{study.impact}</p>
                        </div>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {study.technologies.map((tech, tIdx) => (
                            <span key={tIdx} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white font-mono text-[9px] uppercase tracking-widest">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {study.hasDetailedPage && study.link && (
                        <div className="pt-2">
                            <Link 
                                to={study.link}
                                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#ccff00] text-black font-extrabold uppercase text-xs tracking-widest rounded-full hover:bg-white hover:text-black transition-all transform active:scale-95 shadow-md"
                            >
                                View Full Interactive Case Study <ChevronRight size={14} />
                            </Link>
                        </div>
                    )}

                    {/* Citation & Backlink Block (For Reference Building) */}
                    <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-3 relative overflow-hidden backdrop-blur-md">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5">
                                <Anchor size={10} className="text-[#ccff00]" /> Reference Citation Academic Standard
                            </span>
                            <button 
                                onClick={handleCopyCitation}
                                className="text-zinc-400 hover:text-white transition-colors text-[9px] font-bold uppercase tracking-widest flex items-center gap-1"
                            >
                                {copied ? (
                                    <>
                                        <CheckCircle size={10} className="text-[#ccff00]" /> Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy size={10} /> Cite Project
                                    </>
                                )}
                            </button>
                        </div>
                        <p className="text-[10px] font-mono text-zinc-400 leading-relaxed bg-black/40 p-3 rounded-lg border border-white/5">
                            {study.citeText}
                        </p>
                        <p className="text-[9px] text-zinc-600 font-sans italic">
                            Help boost authority. Copy and link this study from your blog, article, or GitHub repository as a benchmark reference.
                        </p>
                        
                        {/* Share Actions inside Study */}
                        <div className="flex items-center gap-3 pt-2">
                            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Share reference:</span>
                            <button onClick={() => handleShare('twitter')} className="text-zinc-500 hover:text-white transition-colors" aria-label="Share case study on Twitter"><Twitter size={11}/></button>
                            <button onClick={() => handleShare('linkedin')} className="text-zinc-500 hover:text-[#ccff00] transition-colors" aria-label="Share case study on LinkedIn"><Linkedin size={11}/></button>
                            <button onClick={() => handleShare('facebook')} className="text-zinc-500 hover:text-white transition-colors" aria-label="Share case study on Facebook"><Facebook size={11}/></button>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Luxurious Photography with Parallax Zoom Reveal */}
                <div className="lg:col-span-7 h-[400px] sm:h-[500px] lg:h-[650px] relative rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl bg-[#030303] group">
                    
                    {/* Perspective Image Parallax */}
                    <motion.div 
                        style={{ y: yImage, scale: scaleImage }}
                        className="w-full h-[120%] absolute top-[-10%]"
                    >
                        <img 
                            src={study.image} 
                            alt={`Cinematic illustration for ${study.title}`}
                            className="w-full h-full object-cover opacity-60 filter grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out"
                        />
                    </motion.div>

                    {/* Gradient Inner Shading */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none hidden lg:block" />

                    {/* Top Right Luxury Badge */}
                    <div className="absolute top-6 right-6">
                        <span className="px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase tracking-widest">
                            CONFIDENTIAL // ACTIVE STATUS
                        </span>
                    </div>

                    {/* Bottom Info Ribbon */}
                    <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
                        <div className="max-w-xs">
                            <h3 className="font-serif italic text-white text-xl sm:text-2xl mb-1">{study.client}</h3>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black font-sans">{study.industry}</p>
                        </div>
                        <a 
                            href={`#${study.id}`} 
                            onClick={handleCopyCitation}
                            className="w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white scale-100 hover:scale-105 active:scale-95 hover:border-white transition-all shadow-xl shadow-black/40 cursor-pointer"
                            title="Copy link to this case study"
                        >
                            <Copy size={16} />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default function CaseStudiesPage() {
    return (
        <div className="min-h-screen bg-[#000000] text-white selection:bg-[#ccff00] selection:text-black font-sans">
            <Helmet>
                <title>Cinematic Case Studies &amp; Architectural Reference Projects | AbuQitmirLabs</title>
                <meta name="description" content="Discover our elite portfolio of reference custom software, intelligent AI agent ecosystems, and low-latency SaaS dashboards. Copy educational citations and reference backlinks." />
                <link rel="canonical" href="https://abuqitmirlabs.tech/case-studies" />
                
                <meta property="og:title" content="Cinematic Case Studies &amp; Reference Projects | AbuQitmirLabs" />
                <meta property="og:description" content="Explore multi-million transaction workflows, low-latency React streaming engines, and dynamic programmatic SEO case studies from AbuQitmirLabs." />
                <meta property="og:url" content="https://abuqitmirlabs.tech/case-studies" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://abuqitmirlabs.tech/logo.png" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Cinematic Case Studies &amp; Reference Projects | AbuQitmirLabs" />
                <meta name="twitter:description" content="Explore leading software architecture studies with Academic citation structures." />
                <meta name="twitter:image" content="https://abuqitmirlabs.tech/logo.png" />
            </Helmet>

            <Header />

            {/* Cinematic Hero Landing Header for Case Studies */}
            <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-black pt-28">
                {/* Visual accents */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-[120px] pointer-events-none" />
                
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full text-center space-y-12 relative z-10 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] text-zinc-400 font-extrabold uppercase tracking-[0.2em] shadow-lg"
                    >
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse"></span>
                        Architectural Reference Benchmark Archive
                    </motion.div>

                    {/* Elite Old-money Typo Header */}
                    <div className="space-y-6 max-w-5xl mx-auto">
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-serif italic font-light text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tighter leading-none"
                        >
                            The Science of <br />
                            <span className="text-[#ccff00]">Absolute Performance</span>
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-zinc-500 text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto leading-relaxed"
                        >
                            Explore three core technical breakthroughs. True software craftsmanship doesn’t require loud shouting — we let complete transparent architectures and radical white space prove our elite tier.
                        </motion.p>
                    </div>

                    {/* Scroll suggestion */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 0.4, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
                        className="flex flex-col items-center justify-center gap-2 text-zinc-600 text-[10px] uppercase font-black tracking-[0.25em]"
                    >
                        <span>Scroll to inspect credentials</span>
                        <ArrowDown size={14} className="text-[#ccff00]" />
                    </motion.div>
                </div>
            </section>

            {/* Cinematic Scroll Sections (One per scroll block) */}
            <section className="bg-black relative z-10">
                {CASE_STUDIES.map((study, idx) => (
                    <CinematicSection key={study.id} study={study} index={idx} />
                ))}
            </section>

            {/* Call to action section: Highly customized white-space focused */}
            <section className="bg-black py-40 border-b border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-black pointer-events-none" />
                <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
                    <span className="font-serif italic text-zinc-500 text-2xl font-light">Collaborate with AbuQitmirLabs</span>
                    <h3 className="font-serif italic text-white text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none">
                        Let’s Engineer Your <br />
                        <span className="text-[#ccff00]">Absolute Reference Masterpiece</span>
                    </h3>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-light">
                        We accept a maximum of three premium engineering partners each quarter. If you seek uncompromised digital architecture designed to command your industry, contact us today.
                    </p>
                    <div className="pt-6">
                        <Link 
                            to="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-[#ccff00] text-black font-extrabold uppercase text-xs tracking-widest rounded-full hover:bg-white transition-all transform active:scale-95"
                        >
                            Initiate Briefing <ChevronRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

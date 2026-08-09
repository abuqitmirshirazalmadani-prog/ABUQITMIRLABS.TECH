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
    bullets?: string[];
}

const CASE_STUDIES: CaseStudy[] = [
    {
        id: "tajweedpage-seo",
        title: "TajweedPage — AI-Powered Quran Recitation Platform",
        client: "TajweedPage",
        year: "2026",
        industry: "AI Islamic EdTech",
        metrics: [
            { label: "Feedback Delay", value: "Instant" },
            { label: "Teaching Capacity", value: "Extended" },
            { label: "Accuracy", value: "Verified" }
        ],
        challenge: "Live-only teaching models can't give students feedback between sessions. Scaling personalized pronunciation correction to hundreds of students isn't possible with human teachers alone.",
        solution: "We engineered TajweedPage AI, combining real-time speech diagnostics with structured learning paths:",
        bullets: [
            "AI Tajweed Teacher Chat — a RAG-grounded chatbot trained on the platform's own course content, answering Tajweed rule questions (Qalqalah, Noon Sakinah, Madd) with source-grounded accuracy",
            "Voice Recitation Analyzer — automatic detection of pronunciation errors across Makharij (articulation), Madd (elongation), and Ghunnah (nasalization)",
            "Personalized Learning Path — adaptive progress tracking by skill level",
            "Homework Evaluator — automated review layer supporting live Sheikh feedback sessions",
            "Hybrid AI + Human Model — AI reinforces daily practice while certified scholars with Ijazah chains give final recitation authorization"
        ],
        impact: "Students now get instant feedback between live sessions instead of waiting a full week — extending the academy's teaching capacity without diluting quality.",
        technologies: ["RAG Pipeline", "Speech & Voice Analysis", "Session-state Persistence", "Next.js", "Firebase", "Tailwind CSS"],
        colorAccent: "from-emerald-500/10 via-transparent to-black",
        image: "https://i.postimg.cc/VkCrrNtc/Gemini-Generated-Image-t1ptnbt1ptnbt1pt.png",
        citeText: "AbuQitmirLabs. (2026). RAG-augmented speech diagnostics & hybrid AI tutor ecosystems for Quranic recitation. AbuQitmirLabs AI EdTech Deployments.",
        hasDetailedPage: true,
        link: "/case-studies/tajweedpage"
    },
    {
        id: "ghastlypages-cinema",
        title: "GhastlyPages — Cinematic Horror Fiction & Audio Storytelling Platform",
        client: "GhastlyPages",
        year: "2026",
        industry: "Cinematic Horror & Audio Storytelling",
        metrics: [
            { label: "Story Pages", value: "Hundreds" },
            { label: "Hero Loading Speed", value: "Instant" },
            { label: "Media Load Penalty", value: "0%" }
        ],
        challenge: "The horror-fiction space is dominated by legacy forums with dated UX and generic blog templates. GhastlyPages needed an immersive, atmospheric platform that felt genuinely cinematic rather than a standard dark layout.",
        solution: "We designed a dark visual experience with scroll-driven frame transitions, parallax showcases, and background-loaded media streams:",
        bullets: [
            "Scroll-Driven Storyteller — GSAP and ScrollTrigger-powered immersive frame transitions and character reveals that turn stories into dynamic experiences",
            "Ambient Audio Layer — An optional, atmospheric horror soundtrack using on-demand loading policies to keep page interactive times ultra-fast",
            "Original Character Dossiers — Interactive, parallax-shifted survival pages for unique creepypasta entities (The Smiling Man, Whisper Man, Morpheus)",
            "Optimized Frame-Sequence Hero — Eliminated over 50 parallel image requests on page load by eagerly serving the first frame while caching the rest in the background"
        ],
        impact: "Delivered a breathtaking, cinematic web application with excellent performance, enabling readers to engage with immersive stories without any media loading latency.",
        technologies: ["GSAP Animation", "ScrollTrigger", "Vite 7", "React 19", "Audio Object API", "Tailwind CSS"],
        colorAccent: "from-red-950/20 via-transparent to-black",
        image: "https://i.postimg.cc/YCcWrnqM/Screenshot-2026-07-20-145734.png",
        citeText: "AbuQitmirLabs. (2026). High-fidelity cinematic storytelling engines and optimized frame-sequence media loading. AbuQitmirLabs Creative Deployments."
    },
    {
        id: "ghastlypages-seo",
        title: "GhastlyPages — Programmatic SEO & Secure Publishing Backend",
        client: "GhastlyPages",
        year: "2026",
        industry: "Enterprise SEO & Custom CMS",
        metrics: [
            { label: "Core Pages Group", value: "24 Pages" },
            { label: "SEO Indexing Ready", value: "100%" },
            { label: "Access Control Layer", value: "RLS Secured" }
        ],
        challenge: "Niche publishing sites struggle to rank under generic models, suffering from indexing penalties caused by teaser duplications, complex manual workflows, and high administrative risks.",
        solution: "We engineered a robust Supabase-backed database paired with a programmatic semantic SEO pipeline and automated indexing infrastructure:",
        bullets: [
            "Supabase Publishing Backend — Custom role table architecture with row-level security policies (RLS) preventing privilege escalation during story creation",
            "Structured Schema Engine — Automated, site-wide schema generation (Article, FAQPage, BreadcrumbList, AudioObject) enabling rich snippets in Search Engines",
            "Programmatic Canonical Routing — Automated canonical-link mapper resolved duplication warnings between teaser blog cards and full stories",
            "Edge-Cached Sitemap — Dynamic sitemap.xml generated at the edge and cached (s-maxage=3600) to keep crawl speeds consistently fast",
            "Roman-Urdu AdSense Compliance — Implemented a systemic localization mapping layer to align with strict AdSense language requirements before submission"
        ],
        impact: "Empowered a non-technical editorial team to safely publish stories, blogs, and audio narrations with built-in search dominance and instant monetization readiness.",
        technologies: ["Supabase Database", "Row-Level Security", "TanStack Start v1", "Google Search Console API", "JSON-LD Schemas", "Edge Workers"],
        colorAccent: "from-zinc-850/20 via-transparent to-black",
        image: "https://i.postimg.cc/6pLy9Bmf/Screenshot-2026-07-20-150051.png",
        citeText: "AbuQitmirLabs. (2026). Programmatic SEO architectures and secure distributed content management engines. AbuQitmirLabs Technical Publications."
    },
    {
        id: "cloudhealth-portal",
        title: "CloudHealth Portal — A Modern Multi-Platform Healthcare Ecosystem",
        client: "Confidential HealthTech Startup",
        year: "2026",
        industry: "Healthcare, Telemedicine, AI-Powered Health Monitoring",
        metrics: [
            { label: "Zoneless Engine", value: "Angular 21" },
            { label: "Base64 Size Limit", value: "&lt; 500KB" },
            { label: "Cross-Platform Ecosystem", value: "Web/Desk/Mob" }
        ],
        challenge: "Building a cross-platform healthcare application presents unique challenges: working flawlessly across web browsers, desktop (Windows/macOS), and mobile (iOS/Android); keeping patient data highly secure and isolated; protecting Gemini API keys from client-side exposure; and optimizing medical document uploads to prevent database size violations.",
        solution: "We engineered a high-performance zoneless Angular portal powered securely by the @google/genai SDK on the backend, storing structured patient vitals and documents in a securely isolated Cloud Firestore database:",
        bullets: [
            "Smart AI Health Assistant — Powered by the modern @google/genai SDK, protected server-side to prevent client-side key exposure and connection breakdowns",
            "Live Vitals & Metrics Engine — Tracks heart rate, steps, blood pressure, and sleep cycle metrics with responsive warning alerts",
            "Doctor Appointment Planner — Interactive scheduler supporting consultation details, scheduling times, and active telemedicine layouts",
            "Prescription & Medication Ledger — Comprehensive medication inventory tracking name, precise dosage, frequency, and active status toggles",
            "Optimized Base64 Document Vault — Seamlessly converts file uploads into Base64 strings with a strict 500KB safety guard to keep Firestore storage fast and optimized",
            "Offline Path Resolution — Configured hash-based routing (withHashLocation) inside app.config.ts to ensure Electron local file:// protocol works flawlessly"
        ],
        impact: "Delivered a production-ready, highly secure healthcare ecosystem with zero strict compiler errors, absolute user data isolation, and a premium Emerald aesthetic.",
        technologies: ["Angular 21", "Vite 7", "Tailwind CSS", "Firebase Auth", "Cloud Firestore", "Google Gemini AI SDK", "Electron", "Capacitor"],
        colorAccent: "from-emerald-950/20 via-transparent to-black",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop",
        citeText: "AbuQitmirLabs. (2026). Cross-platform server-isolated AI healthcare ecosystems and performance-optimized state management. AbuQitmirLabs Technical Publications."
    },
    {
        id: "clinicos-pro",
        title: "ClinicOS Pro — Premium Clinical ERP & EHR System",
        client: "Confidential Healthcare Practice",
        year: "2026",
        industry: "Clinical ERP, EHR, Practice Management",
        metrics: [
            { label: "Unified ERP Console", value: "11 Screens" },
            { label: "Patient Check-in Time", value: "&lt; 5 mins" },
            { label: "Complete Digitization", value: "Zero Paper" }
        ],
        challenge: "Modern healthcare clinics face immense operational friction: paper patient charts are slow and difficult to search, billing records are scattered, pharmacy stocks are tracked reactively, and no single source of truth exists.",
        solution: "We built ClinicOS Pro, a high-density, offline-resilient Clinical ERP consolidating 11 distinct operational screens into a single high-performance dashboard:",
        bullets: [
            "Biometric Smart Gateway — Fingerprint and NFC check-in simulator reduces patient check-in times to under 5 minutes",
            "OPD Physician Workstation — consulting screen featuring clinical notes, digital vitals entries, and a Live Canvas-based ECG Waveform Monitor",
            "Claims & Copay Billing — automated copay trackers, insurance receivables, and multi-line custom invoice templates",
            "Pharmacy Inventory Manager — Monitors drug batches, expiration cycles, and unit pricing with automatic low-stock alerts",
            "Inpatient Ward Map (IPD) — A visual interactive grid of clinic beds (ICU, Cardiac, Wards) for instant patient bookings and stay logs",
            "Patient Companion App (Consumer HUD) — Simulates a patient mobile screen with medication QR codes and assigned bed locations"
        ],
        impact: "Eliminated paper trails, digitized practice operations, automated drug stock notifications, and established a trusted high-end corporate image.",
        technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Cormorant Garamond", "Urbanist Font", "HTML5 Canvas", "RequestAnimationFrame"],
        colorAccent: "from-indigo-950/20 via-transparent to-black",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1600&auto=format&fit=crop",
        citeText: "AbuQitmirLabs. (2026). ClinicOS Pro: Unified workflow automation and offline-resilient high-density medical ERP systems. AbuQitmirLabs Clinical Operations."
    },
    {
        id: "profit-command-center",
        title: "ProFit Command Center — Elite Trainer CRM & Scheduling Hub",
        client: "Confidential Fitness Startup",
        year: "2025",
        industry: "CRM, Scheduling, Fitness Tech",
        metrics: [
            { label: "Weekly Admin Saved", value: "76%" },
            { label: "Package Billing Leakage", value: "0%" },
            { label: "Client Churn Reduction", value: "20%" }
        ],
        challenge: "Independent trainers act as micro-businesses, suffering from severe administrative burnout. Juggling WhatsApp messages, Google Calendars, and spreadsheets leads to package tracking leaks and client churn.",
        solution: "We engineered ProFit Command Center, a premium CRM and scheduling hub designed with proactive retention alerts and media syncing under a gorgeous glassmorphic dark theme:",
        bullets: [
            "Command Center Alerts — A reactive notification panel for expiring client packages (3 or fewer remaining) with direct 'Upsell' actions",
            "Interactive Client CRM — Profiles with editable session balances to easily increment or decrement pre-paid classes on the fly",
            "Dynamic Media Integration — Base64 trainer uploads instantly propagate custom client photos across all calendar and dashboard components",
            "Zoneless Signals Architecture — Leverages Angular 21 with Signals for zero-latency change detection and memory-efficient updates",
            "Glassmorphic Visuals — High-contrast dark palette with white-opacity borders and deep glass filters for a luxury fitness brand"
        ],
        impact: "Transformed fitness administration, reduced trainer business overhead, and unlocked massive lifetime value (LTV) gains by preventing package disengagement.",
        technologies: ["Angular 21", "Vite 7", "Tailwind CSS", "Angular Signals", "FileReader API", "Base64 Serialization"],
        colorAccent: "from-emerald-950/10 via-transparent to-black",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop",
        citeText: "AbuQitmirLabs. (2025). Low-latency client relationship management and proactive package monitoring for fitness platforms. AbuQitmirLabs Growth Case Studies."
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
        const text = `${study.citeText} Link: https://www.abuqitmirlabs.tech/case-studies#${study.id}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const handleShare = (platform: string) => {
        const shareUrl = `https://www.abuqitmirlabs.tech/case-studies#${study.id}`;
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
                            <p className="mb-4">{study.solution}</p>
                            {study.bullets && study.bullets.length > 0 && (
                                <ul className="space-y-3.5 pl-2 border-l border-zinc-850 mt-4">
                                    {study.bullets.map((bullet, bIdx) => {
                                        const parts = bullet.split(" — ");
                                        if (parts.length > 1) {
                                            return (
                                                <li key={bIdx} className="text-xs text-zinc-400 leading-relaxed group">
                                                    <span className="text-[#ccff00] font-sans font-semibold tracking-wide block sm:inline mr-1">{parts[0]}</span>
                                                    <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200">— {parts[1]}</span>
                                                </li>
                                            );
                                        }
                                        return (
                                            <li key={bIdx} className="text-xs text-zinc-400 leading-relaxed">
                                                {bullet}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
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
                                style={{ color: '#000000' }}
                            >
                                <span className="text-black font-extrabold" style={{ color: '#000000' }}>View Full Interactive Case Study</span> <ChevronRight size={14} className="text-black" style={{ color: '#000000' }} />
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
                <title>Case Studies | Real-World Success Stories | AbuQitmirLabs</title>
                <meta name="description" content="Explore real-world success stories from AbuQitmirLabs — custom software, AI automation, mobile apps, and web solutions that delivered measurable ROI for 350+ global clients." />
                <link rel="canonical" href="https://www.abuqitmirlabs.tech/case-studies" />
                
                <meta property="og:title" content="Case Studies | Real-World Success Stories | AbuQitmirLabs" />
                <meta property="og:description" content="Explore real-world success stories from AbuQitmirLabs — custom software, AI automation, mobile apps, and web solutions that delivered measurable ROI for 350+ global clients." />
                <meta property="og:url" content="https://www.abuqitmirlabs.tech/case-studies" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Case Studies | Real-World Success Stories | AbuQitmirLabs" />
                <meta name="twitter:description" content="Explore real-world success stories from AbuQitmirLabs — custom software, AI automation, mobile apps, and web solutions that delivered measurable ROI for 350+ global clients." />
                <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />
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
                            className="text-zinc-400 text-lg md:text-xl font-light tracking-wide max-w-3xl mx-auto leading-relaxed font-sans"
                        >
                            We don't publish polished portfolio pieces with the hard parts edited out. Each case study here covers a real project we built the problem, our actual technical approach, and what shipped. Our work spans AI products, custom platforms, and growth-focused engineering.
                        </motion.p>
                    </div>

                    {/* Core Case Study Criteria Specifications */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="mx-auto max-w-4xl border-y border-white/5 py-8 px-6 bg-white/[0.01] backdrop-blur-sm rounded-lg"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-left">
                            {[
                                "Real Client Projects, Not Mockups",
                                "AI & RAG-Powered Product Builds",
                                "Custom Platform Engineering Case Studies",
                                "Technical Breakdown of Our Approach",
                                "Measurable Outcomes Where Available"
                            ].map((bullet, idx) => (
                                <div key={idx} className="flex items-start gap-3 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 group-hover:bg-[#ccff00] transition-colors duration-300" />
                                    <span className="text-sm font-sans font-light text-slate-300 tracking-tight leading-relaxed group-hover:text-white transition-colors duration-300">{bullet}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

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
                            style={{ color: '#000000' }}
                        >
                            <span className="text-black font-extrabold" style={{ color: '#000000' }}>Initiate Briefing</span> <ChevronRight size={16} className="text-black" style={{ color: '#000000' }} />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

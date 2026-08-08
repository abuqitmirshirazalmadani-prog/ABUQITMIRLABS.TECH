import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, MessageCircle, Sparkles } from 'lucide-react';
import { YouTubeFacade } from './ui/youtube-facade';

const InteractivePortfolio = () => {
    return (
        <section id="interactive-portfolio" className="bg-[#080808] text-[#f5f5f5] py-28 px-6 overflow-hidden border-t border-white/5 relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-[60%] right-[-10%] w-[400px] h-[400px] bg-emerald-950/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[5%] left-[20%] w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto">
                
                {/* SECTION HEADER */}
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#888888] block mb-4">
                            AbuQitmirLabs.Tech — Selected Work
                        </span>
                    </motion.div>
                                       <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] text-white"
                        id="portfolio-headline"
                    >
                        Featured Project.<br/>
                        <span className="text-[#ccff00] italic">Real Results.</span>
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-zinc-500 font-medium text-sm md:text-base mt-6 tracking-wide"
                    >
                        EdTech — Built from scratch with advanced AI & SEO.
                    </motion.p>
                </div>

                {/* Grid of cinematic project reveals */}
                <div className="space-y-24 md:space-y-36">

                    {/* ======= CARD 1: TAJWEEDPAGE.COM ======= */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#0a0014] via-[#130028] to-[#0a0014] border border-[#7000ff]/30 shadow-2xl group min-h-[520px]"
                        id="portfolio-tajweed-card"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            {/* LEFT DETAIL PANEL */}
                            <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-between z-10">
                                <div>
                                    {/* Badges */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        <span className="text-[10px] font-black uppercase tracking-wider px-3-5 py-1.5 rounded-full bg-[#7000ff]/20 text-[#c084fc] border border-[#7000ff]/30 text-[9px]">
                                            EdTech Platform
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-wider px-3-5 py-1.5 rounded-full bg-[rgba(0,229,255,0.1)] text-[#67e8f9] border border-[rgba(0,229,255,0.25)] text-[9px]">
                                            AI / RAG
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-wider px-3-5 py-1.5 rounded-full bg-[rgba(245,200,66,0.15)] text-[#fcd34d] border border-[rgba(245,200,66,0.2)] text-[9px]">
                                            Next.js
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-wider px-3-5 py-1.5 rounded-full bg-[rgba(0,200,150,0.1)] text-[#6ee7b7] border border-[rgba(0,200,150,0.2)] text-[9px]">
                                            SEO Architecture
                                        </span>
                                    </div>

                                    {/* Brand & Subtitle */}
                                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-none">
                                        TajweedPage.com<br/>
                                        <span className="text-[#c084fc] text-xl md:text-2xl font-bold font-serif italic block mt-2">AI Quran Learning Platform</span>
                                    </h3>

                                    {/* Description */}
                                    <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed mb-8 max-w-xl">
                                        Full-stack Next.js educational platform for an online Quran academy. Built with the world's first RAG-powered AI Tajweed Teacher, international SEO targeting 20+ countries, pricing tiers, teacher profiles, and a complete student enrollment system.
                                    </p>
                                </div>

                                <div>
                                    {/* Key Performance Metrics */}
                                    <div className="grid grid-cols-4 gap-4 py-6 border-y border-white/5 mb-8">
                                        <div className="text-center md:text-left">
                                            <span className="text-xl md:text-2xl lg:text-3xl font-black text-[#ccff00] block">10</span>
                                            <span className="text-[8px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mt-1">Days Built</span>
                                        </div>
                                        <div className="text-center md:text-left">
                                            <span className="text-xl md:text-2xl lg:text-3xl font-black text-[#ccff00] block">15+</span>
                                            <span className="text-[8px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mt-1">Pages</span>
                                        </div>
                                        <div className="text-center md:text-left">
                                            <span className="text-xl md:text-2xl lg:text-3xl font-black text-[#ccff00] block">20+</span>
                                            <span className="text-[8px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mt-1">Countries</span>
                                        </div>
                                        <div className="text-center md:text-left">
                                            <span className="text-xl md:text-2xl lg:text-3xl font-black text-[#ccff00] block">400+</span>
                                            <span className="text-[8px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mt-1">Students</span>
                                        </div>
                                    </div>

                                    {/* Tech Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-8 max-w-xl">
                                        {['Next.js 14', 'React', 'TypeScript', 'RAG Architecture', 'LLM Integration', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'Schema Markup-Structured Data', 'GTM + GA4'].map((tech) => (
                                            <span key={tech} className="text-[9px] font-semibold bg-white/5 text-zinc-400 border border-white/10 px-2.5 py-1 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Direct CTA */}
                                    <a 
                                        href="https://www.tajweedpage.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest border border-[#ccff00] text-[#ccff00] bg-transparent py-4 px-8 rounded-full transition-all duration-300 hover:bg-[#ccff00] hover:text-[#080808]"
                                        id="visit-live-tajweed"
                                    >
                                        Visit Live Site <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>

                            {/* RIGHT VISUAL/MOCKUP PANEL */}
                            <div className="relative min-h-[350px] lg:min-h-full bg-gradient-to-br from-[#1a0040] to-[#0d0020] border-t lg:border-t-0 lg:border-l border-white/5 overflow-hidden flex items-center justify-center p-6 md:p-12">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(112,0,255,0.25),transparent_60%)] pointer-events-none"></div>
                                
                                {/* Realistic mockup framework */}
                                <motion.div 
                                    whileHover={{ y: -5 }} 
                                    transition={{ duration: 0.5 }}
                                    className="w-full max-w-[480px] bg-[#0a0018] rounded-2xl border border-[#7000ff]/30 shadow-2xl overflow-hidden aspect-video flex flex-col relative z-10"
                                >
                                    {/* Fake Browser Toolbar */}
                                    <div className="bg-[#12002e] px-4 py-2.5 flex items-center justify-between border-b border-[#7000ff]/20">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
                                            <span className="text-[8px] font-black text-[#ccff00] tracking-widest ml-4 font-mono">TAJWEEDPAGE</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-[6px] text-zinc-500">Courses</span>
                                            <span className="text-[6px] text-zinc-500">AI Center</span>
                                            <span className="text-[6px] text-zinc-500">Pricing</span>
                                        </div>
                                    </div>

                                    {/* Mockup Body Content */}
                                    <div className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#12002e] to-[#0a0018]">
                                        <div>
                                            <div className="text-[6px] font-bold text-[#7000ff] uppercase tracking-wider mb-1 flex items-center gap-1">
                                                <Sparkles size={8} /> ✦ World's First AI-Powered Quran Platform ✦
                                            </div>
                                            <h4 className="text-xs md:text-sm font-black text-white leading-tight mb-1">
                                                Learn Quran Online<br/>
                                                With Proper <span className="text-[#ccff00] italic">Tajweed</span>
                                            </h4>
                                            <p className="text-[6px] text-zinc-400 leading-normal max-w-[80%]">
                                                Live one-on-one classes with certified scholars. Dynamic scheduling tailored beautifully for USA, UK, Canada & Australia.
                                            </p>
                                            <div className="flex gap-1.5 mt-2">
                                                <span className="bg-[#7000ff] text-white font-extrabold text-[5px] px-2 py-1 rounded-full uppercase tracking-wider">Start Free Trial</span>
                                                <span className="border border-white/20 text-zinc-400 font-extrabold text-[5px] px-2 py-1 rounded-full uppercase tracking-wider">Book Demo</span>
                                            </div>
                                        </div>

                                        {/* Mockup Footer Analytics row */}
                                        <div className="border-t border-white/5 pt-2 mt-2 flex justify-between items-center bg-[#070012]/80 px-2 rounded-lg">
                                            <div className="text-center">
                                                <span className="text-[8px] font-black text-[#ccff00] block leading-none">1000+</span>
                                                <span className="text-[5px] text-zinc-500 uppercase tracking-widest block">Classes</span>
                                            </div>
                                            <div className="text-center">
                                                <span className="text-[8px] font-black text-[#ccff00] block leading-none">20+</span>
                                                <span className="text-[5px] text-zinc-500 uppercase tracking-widest block">Countries</span>
                                            </div>
                                            <div className="text-center">
                                                <span className="text-[8px] font-black text-[#ccff00] block leading-none">$49</span>
                                                <span className="text-[5px] text-zinc-500 uppercase tracking-widest block">From/mo</span>
                                            </div>
                                            <div className="text-center">
                                                <span className="text-[8px] font-black text-[#ccff00] block leading-none">24/7</span>
                                                <span className="text-[5px] text-zinc-500 uppercase tracking-widest block">Support</span>
                                            </div>
                                        </div>

                                        {/* RAG Pulsing Active System bar */}
                                        <div className="mt-2 text-[5px] text-[#00e5ff] bg-[#00e5ff]/5 border border-[#00e5ff]/10 rounded-md p-1.5 flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-ping"></span>
                                                <span>AI Tajweed RAG Engine Live</span>
                                            </div>
                                            <span className="opacity-60 text-[4px] font-mono">[ COGNITIVE_TEACHER_OK ]</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* ADDITIONAL SHORT CASE STUDIES */}
                <div className="mt-32 pt-20 border-t border-white/5" id="more-case-studies">
                    <div className="mb-16 text-center md:text-left">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#ccff00] block mb-3">
                            Strategic Engineering & Growth
                        </span>
                        <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                            Selected <span className="text-[#ccff00] italic font-serif">Case Studies.</span>
                        </h3>
                        <p className="text-zinc-500 text-sm font-light mt-3 max-w-xl">
                            A curated selection of high-performance digital systems, custom-designed to drive engagement, conversions, and operational excellence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {/* CASE STUDY 1: GHASTLYPAGES */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="bg-[#0b0303] border border-red-950/40 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between hover:border-red-600/30 transition-all duration-300 relative group overflow-hidden"
                        >
                            {/* Glow ornament */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/5 rounded-full blur-3xl group-hover:bg-red-600/10 transition-all duration-500 pointer-events-none"></div>

                            <div>
                                <span className="text-[9px] font-bold tracking-[0.2em] text-red-500/80 uppercase block mb-2 font-mono">Case Study 1</span>
                                <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">GhastlyPages</h4>
                                <p className="text-zinc-400 text-xs font-semibold tracking-wide uppercase mb-6 font-serif italic">Horror Fiction Platform — Stories That Haunt You</p>
                                <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8">
                                    Full-stack horror content platform for original creepypasta and audio storytelling. Built with cinematic design, scroll-driven animation, and a fully custom publishing backend. SEO architecture designed to meet AdSense standards from launch — not retrofitted after.
                                </p>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-2 gap-4 py-5 border-y border-white/5 mb-8">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">🚀</span>
                                        <div>
                                            <span className="text-[10px] font-black text-[#ccff00] block leading-none tracking-wider">10 DAYS BUILT</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">📄</span>
                                        <div>
                                            <span className="text-[10px] font-black text-[#ccff00] block leading-none tracking-wider">24+ PAGES</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">🎯</span>
                                        <div>
                                            <span className="text-[10px] font-black text-[#ccff00] block leading-none tracking-wider">4 ORIGINAL CHARACTERS</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">📊</span>
                                        <div>
                                            <span className="text-[10px] font-black text-[#ccff00] block leading-none tracking-wider">100+ STORIES SCALABLE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {/* Video Showcase */}
                                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/60 border border-red-950/50 hover:border-red-500/30 transition-all mb-8 group/video relative">
                                    <YouTubeFacade videoId="eAhSoYYEwnI" title="GhastlyPages Video Showcase" />
                                </div>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-8">
                                    {['React 19', 'TanStack Start', 'TypeScript', 'Supabase', 'GSAP', 'Tailwind CSS', 'Cloudflare Workers', 'Schema Markup', 'GA4 + GSC'].map((tech) => (
                                        <span key={tech} className="text-[9px] font-semibold bg-white/5 text-zinc-400 border border-white/10 px-2.5 py-0.5 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <a 
                                    href="#" 
                                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-500 hover:text-white transition-colors duration-300"
                                >
                                    🔗 VISIT LIVE SITE →
                                </a>
                            </div>
                        </motion.div>

                        {/* CASE STUDY 2: CLOUDHEALTH PORTAL */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-[#030b06] border border-emerald-950/40 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between hover:border-emerald-600/30 transition-all duration-300 relative group overflow-hidden"
                        >
                            {/* Glow ornament */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-600/5 rounded-full blur-3xl group-hover:bg-emerald-600/10 transition-all duration-500 pointer-events-none"></div>

                            <div>
                                <span className="text-[9px] font-bold tracking-[0.2em] text-emerald-500/80 uppercase block mb-2 font-mono">Case Study 2</span>
                                <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">CloudHealth Portal</h4>
                                <p className="text-zinc-400 text-xs font-semibold tracking-wide uppercase mb-6 font-serif italic">Multi-Platform Healthcare Ecosystem</p>
                                <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8">
                                    Advanced end-to-end patient care platform running on Web, Desktop (Electron), and Mobile (Capacitor). Features Gemini AI-powered health assistant, live vitals tracking, appointment scheduling, prescription logs, and secure medical record vault.
                                </p>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-2 gap-4 py-5 border-y border-white/5 mb-8">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">🚀</span>
                                        <div>
                                            <span className="text-[10px] font-black text-[#ccff00] block leading-none tracking-wider">3 PLATFORMS</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">🤖</span>
                                        <div>
                                            <span className="text-[10px] font-black text-[#ccff00] block leading-none tracking-wider">GEMINI AI INTEGRATION</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">📊</span>
                                        <div>
                                            <span className="text-[10px] font-black text-[#ccff00] block leading-none tracking-wider">500KB OPTIMIZED UPLOADS</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">🔒</span>
                                        <div>
                                            <span className="text-[10px] font-black text-[#ccff00] block leading-none tracking-wider">ZERO-COMPROMISE SECURITY</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {/* Video Showcase */}
                                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/60 border border-emerald-950/50 hover:border-emerald-500/30 transition-all mb-8 group/video relative">
                                    <YouTubeFacade videoId="fdvaOWt32EQ" title="CloudHealth Portal Video Showcase" />
                                </div>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-8">
                                    {['Angular 21', 'Vite 7', 'TypeScript', 'Firebase', 'Gemini AI SDK', 'Electron', 'Capacitor', 'Tailwind CSS', 'GA4'].map((tech) => (
                                        <span key={tech} className="text-[9px] font-semibold bg-white/5 text-zinc-400 border border-white/10 px-2.5 py-0.5 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <a 
                                    href="/case-studies#cloudhealth-portal" 
                                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-500 hover:text-white transition-colors duration-300"
                                >
                                    🔗 VIEW PROJECT →
                                </a>
                            </div>
                        </motion.div>

                        {/* CASE STUDY 3: CLINICOS PRO */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="bg-[#03040b] border border-indigo-950/40 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between hover:border-indigo-600/30 transition-all duration-300 relative group overflow-hidden"
                        >
                            {/* Glow ornament */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/5 rounded-full blur-3xl group-hover:bg-indigo-600/10 transition-all duration-500 pointer-events-none"></div>

                            <div>
                                <span className="text-[9px] font-bold tracking-[0.2em] text-indigo-500/80 uppercase block mb-2 font-mono">Case Study 3</span>
                                <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">ClinicOS Pro</h4>
                                <p className="text-zinc-400 text-xs font-semibold tracking-wide uppercase mb-6 font-serif italic">Clinical ERP & Electronic Health Record System</p>
                                <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8">
                                    Premium, high-density, offline-resilient Clinical ERP and EHR application for healthcare centers, private practices, and outpatient clinics. 11 operational screens consolidated into a single, unified dashboard — eliminating paper trails, reducing waiting times, and delivering a professional corporate image.
                                </p>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-2 gap-4 py-5 border-y border-white/5 mb-8">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">🚀</span>
                                        <div>
                                            <span className="text-[10px] font-black text-[#ccff00] block leading-none tracking-wider">11 OPERATIONAL SCREENS</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">💊</span>
                                        <div>
                                            <span className="text-[10px] font-black text-[#ccff00] block leading-none tracking-wider">AUTO-STOCK ALERTS</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">📊</span>
                                        <div>
                                            <span className="text-[10px] font-black text-[#ccff00] block leading-none tracking-wider">0 PAPER TRAILS</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">𫫓</span>
                                        <div>
                                            <span className="text-[10px] font-black text-[#ccff00] block leading-none tracking-wider">LIVE ECG VISUALIZATION</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {/* Video Showcase */}
                                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/60 border border-indigo-950/50 hover:border-indigo-500/30 transition-all mb-8 group/video relative">
                                    <YouTubeFacade videoId="DqspV6DCo3I" title="ClinicOS Pro Video Showcase" />
                                </div>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-8">
                                    {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Cormorant Garamond', 'Urbanist', 'Canvas API', 'Lucide React'].map((tech) => (
                                        <span key={tech} className="text-[9px] font-semibold bg-white/5 text-zinc-400 border border-white/10 px-2.5 py-0.5 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <a 
                                    href="/case-studies#clinicos-pro" 
                                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-500 hover:text-white transition-colors duration-300"
                                >
                                    🔗 VIEW PROJECT →
                                </a>
                            </div>
                        </motion.div>

                        {/* CASE STUDY 4: PROFIT COMMAND CENTER */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-[#0b0b03] border border-lime-950/40 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between hover:border-lime-600/30 transition-all duration-300 relative group overflow-hidden"
                        >
                            {/* Glow ornament */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-lime-600/5 rounded-full blur-3xl group-hover:bg-lime-600/10 transition-all duration-500 pointer-events-none"></div>

                            <div>
                                <span className="text-[9px] font-bold tracking-[0.2em] text-lime-500/80 uppercase block mb-2 font-mono">Case Study 4</span>
                                <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">ProFit Command Center</h4>
                                <p className="text-zinc-400 text-xs font-semibold tracking-wide uppercase mb-6 font-serif italic">High-End CRM for Personal Trainers</p>
                                <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8">
                                    Bespoke, premium client-relationship management and scheduling dashboard designed specifically for elite independent personal trainers. Features real-time session tracking, proactive retention alerts, dynamic client profiles, and premium cinematic design.
                                </p>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-2 gap-4 py-5 border-y border-white/5 mb-8">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">🚀</span>
                                        <div>
                                            <span className="text-[10px] font-black text-[#ccff00] block leading-none tracking-wider">76% TIME SAVED</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">🏆</span>
                                        <div>
                                            <span className="text-[10px] font-black text-[#ccff00] block leading-none tracking-wider">0% BILLING LEAKAGE</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">📊</span>
                                        <div>
                                            <span className="text-[10px] font-black text-[#ccff00] block leading-none tracking-wider">20% CHURN REDUCTION</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">💎</span>
                                        <div>
                                            <span className="text-[10px] font-black text-[#ccff00] block leading-none tracking-wider">PREMIUM BRAND IMAGE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {/* Video Showcase */}
                                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/60 border border-lime-950/50 hover:border-lime-500/30 transition-all mb-8 group/video relative">
                                    <YouTubeFacade videoId="KAhcBqKN_ks" title="ProFit Command Center Video Showcase" />
                                </div>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-8">
                                    {['Angular 21', 'Signals', 'TypeScript', 'Vite', 'Tailwind CSS', 'FileReader API', 'Lucide React', 'Custom Luxury Theme'].map((tech) => (
                                        <span key={tech} className="text-[9px] font-semibold bg-white/5 text-zinc-400 border border-white/10 px-2.5 py-0.5 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <a 
                                    href="/case-studies#profit-command-center" 
                                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-lime-500 hover:text-white transition-colors duration-300"
                                >
                                    🔗 VIEW PROJECT →
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* BOTTOM LUXURY CTA - "Your project could be next" */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-28 md:mt-36 p-8 md:p-16 border border-white/5 rounded-[2.5rem] bg-gradient-to-b from-white/[0.02] to-transparent text-center relative overflow-hidden"
                    id="portfolio-cta-container"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,255,0,0.015)_0%,transparent_65%)] pointer-events-none"></div>
                    <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
                        Your project could be <span className="text-[#ccff00] italic">next.</span>
                    </h3>
                    <p className="text-zinc-500 max-w-xl mx-auto text-sm md:text-base font-light mb-10 leading-relaxed">
                        From idea conceptualization to ultra-optimized live implementation — we build fast, modern, and high-conversion assets.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a 
                            href="https://wa.me/923233260859" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-[#ccff00] text-black font-black uppercase text-xs tracking-wider py-4 px-8 rounded-full flex items-center gap-2 hover:bg-white transition-all"
                            id="portfolio-whatsapp-cta"
                        >
                            <MessageCircle size={14} className="fill-current" /> Start on WhatsApp
                        </a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default InteractivePortfolio;

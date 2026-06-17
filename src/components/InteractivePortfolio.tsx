import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, MessageCircle, Sparkles } from 'lucide-react';

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
                        Three Projects.<br/>
                        <span className="text-[#ccff00] italic">Real Results.</span>
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-zinc-500 font-medium text-sm md:text-base mt-6 tracking-wide"
                    >
                        EdTech • Travel & Hajj Services • E-Commerce — Each built from scratch.
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
                                        <span className="text-[10px] font-black uppercase tracking-wider px-3-5 py-1.5 rounded-full bg-[rgba(0,229,255,0.1)] text-[#67e8f9] border border-[rgba(0,229,255,0.2)] text-[9px]">
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


                    {/* ======= CARD 2: SAFINA-E-RAZA ======= */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#0d1409] via-[#1a2410] to-[#0d1409] border border-[rgba(0,200,150,0.2)] shadow-2xl group min-h-[520px]"
                        id="portfolio-safina-card"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            
                            {/* LEFT VISUAL/MOCKUP PANEL (ON DESKTOP FLIPPED TO LEFT OUTLAY) */}
                            <div className="relative min-h-[350px] lg:min-h-full bg-gradient-to-br from-[#0a1f0a] to-[#162510] order-2 lg:order-1 border-t lg:border-t-0 lg:border-r border-white/5 overflow-hidden flex items-center justify-center p-6 md:p-12">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(0,200,150,0.15),transparent_60%)] pointer-events-none"></div>
                                
                                <motion.div 
                                    whileHover={{ y: -5 }} 
                                    transition={{ duration: 0.5 }}
                                    className="w-full max-w-[480px] bg-[#071209] rounded-2xl border border-[rgba(0,200,150,0.2)] shadow-2xl overflow-hidden aspect-video flex flex-col relative z-10"
                                >
                                    {/* Browser bar */}
                                    <div className="bg-[#0d1f10] px-4 py-2.5 flex items-center justify-between border-b border-[rgba(0,200,150,0.15)]">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
                                            <span className="text-[8px] font-black text-[#f5c842] tracking-wider ml-4 font-mono">☪ KARWAN SAFINA-E-RAZA</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-[6px] text-zinc-500">Packages</span>
                                            <span className="text-[6px] text-zinc-500">Book Now</span>
                                        </div>
                                    </div>

                                    {/* Body screen */}
                                    <div className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#0d2410] to-[#071209]">
                                        <div>
                                            <div className="text-[6px] font-bold text-[#f5c842] uppercase tracking-wider mb-1">
                                                Premium Umrah & Hajj Services — Pakistan
                                            </div>
                                            <h4 className="text-xs md:text-sm font-black text-white leading-tight mb-1">
                                                Journey to the <span className="text-[#00c896] italic">Sacred Land</span> with Full Support
                                            </h4>
                                            <p className="text-[6px] text-zinc-400 max-w-[85%] leading-normal">
                                                Complete Umrah & Hajj packages from Karachi. Group and premium private tours with certified scholars and experienced guides.
                                            </p>
                                        </div>

                                        {/* Packaged details grid */}
                                        <div className="grid grid-cols-4 gap-2 my-2">
                                            <div className="bg-[#0d1f10] p-1.5 rounded-lg border border-[rgba(0,200,150,0.15)] text-center">
                                                <span className="text-xs block leading-none mb-0.5">🕋</span>
                                                <span className="text-[5px] text-emerald-100 font-bold block">Umrah PKG</span>
                                                <span className="text-[4px] text-zinc-500 block leading-tight">All-Inclusive VIP</span>
                                            </div>
                                            <div className="bg-[#0d1f10] p-1.5 rounded-lg border border-[rgba(0,200,150,0.15)] text-center">
                                                <span className="text-xs block leading-none mb-0.5">🛫</span>
                                                <span className="text-[5px] text-emerald-100 font-bold block">Hajj 2026</span>
                                                <span className="text-[4px] text-zinc-500 block leading-tight">Strict Space Cap</span>
                                            </div>
                                            <div className="bg-[#0d1f10] p-1.5 rounded-lg border border-[rgba(0,200,150,0.15)] text-center">
                                                <span className="text-xs block leading-none mb-0.5">🏨</span>
                                                <span className="text-[5px] text-emerald-100 font-bold block">Accommodations</span>
                                                <span className="text-[4px] text-zinc-500 block leading-tight">Closest Proximity</span>
                                            </div>
                                            <div className="bg-[#0d1f10] p-1.5 rounded-lg border border-[rgba(0,200,150,0.15)] text-center">
                                                <span className="text-xs block leading-none mb-0.5">📜</span>
                                                <span className="text-[5px] text-emerald-100 font-bold block">Visas</span>
                                                <span className="text-[4px] text-zinc-500 block leading-tight">Swift Backings</span>
                                            </div>
                                        </div>

                                        <span className="bg-[#00c896] text-[#071209] font-black text-[5px] py-1 px-2.5 rounded-full uppercase tracking-wider self-start">
                                            View Active Packages →
                                        </span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* RIGHT DETAIL PANEL */}
                            <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-between order-1 lg:order-2 z-10">
                                <div>
                                    {/* Badges */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        <span className="text-[10px] font-black uppercase tracking-wider px-3-5 py-1.5 rounded-full bg-[rgba(0,200,150,0.1)] text-[#6ee7b7] border border-[rgba(0,200,150,0.2)] text-[9px]">
                                            Travel & Tourism
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-wider px-3-5 py-1.5 rounded-full bg-[rgba(245,200,66,0.15)] text-[#fcd34d] border border-[rgba(245,200,66,0.25)] text-[9px]">
                                            Hajj & Umrah
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-wider px-3-5 py-1.5 rounded-full bg-[rgba(0,229,255,0.1)] text-[#67e8f9] border border-[rgba(0,229,255,0.25)] text-[9px]">
                                            Next.js
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-wider px-3-5 py-1.5 rounded-full bg-[#7000ff]/20 text-[#c084fc] border border-[#7000ff]/30 text-[9px]">
                                            Full Stack
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-none">
                                        Karwan Safina-e-Raza<br/>
                                        <span className="text-[#00c896] text-xl md:text-2xl font-bold font-serif italic block mt-2 font-serif">Hajj & Umrah Platform</span>
                                    </h3>

                                    {/* Description */}
                                    <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed mb-8 max-w-xl">
                                        Premium Umrah & Hajj travel agency website built for a Karachi-based tour operator. Includes package listings, booking systems, visa services section, hotel accommodations cataloging, group & private tour structural management, and instant WhatsApp inquiry integration.
                                    </p>
                                </div>

                                <div>
                                    {/* Metrics */}
                                    <div className="grid grid-cols-4 gap-4 py-6 border-y border-white/5 mb-8">
                                        <div className="text-center md:text-left">
                                            <span className="text-xl md:text-2xl lg:text-3xl font-black text-[#ccff00] block">7</span>
                                            <span className="text-[8px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mt-1">Days Built</span>
                                        </div>
                                        <div className="text-center md:text-left">
                                            <span className="text-xl md:text-2xl lg:text-3xl font-black text-[#ccff00] block">10+</span>
                                            <span className="text-[8px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mt-1">Pages</span>
                                        </div>
                                        <div className="text-center md:text-left">
                                            <span className="text-xl md:text-2xl lg:text-3xl font-black text-[#ccff00] block">3</span>
                                            <span className="text-[8px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mt-1">Pkg Tiers</span>
                                        </div>
                                        <div className="text-center md:text-left">
                                            <span className="text-xl md:text-2xl lg:text-3xl font-black text-[#ccff00] block">Live</span>
                                            <span className="text-[8px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mt-1">Status</span>
                                        </div>
                                    </div>

                                    {/* Tech Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-8 max-w-xl">
                                        {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel Engine', 'WhatsApp API Ecosystem', 'Heavy Structured Schema', 'Full-Page SEO Tuned'].map((tech) => (
                                            <span key={tech} className="text-[9px] font-semibold bg-white/5 text-zinc-400 border border-white/10 px-2.5 py-1 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Direct CTA Link */}
                                    <a 
                                        href="https://safina-e-raza.vercel.app/" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest border border-[#00c896] text-[#00c896] bg-transparent py-4 px-8 rounded-full transition-all duration-300 hover:bg-[#00c896] hover:text-[#080808]"
                                        id="visit-live-safina"
                                    >
                                        Visit Live Site <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </motion.div>


                    {/* ======= CARD 3: PERFUMEKHANA ======= */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#120808] via-[#1f0d10] to-[#120808] border border-red-500/15 shadow-2xl group min-h-[520px]"
                        id="portfolio-perfume-card"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            
                            {/* LEFT DETAIL PANEL */}
                            <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-between z-10">
                                <div>
                                    {/* Badges */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        <span className="text-[10px] font-black uppercase tracking-wider px-3-5 py-1.5 rounded-full bg-red-400/10 text-[#fca5a5] border border-red-500/20 text-[9px]">
                                            E-Commerce
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-wider px-3-5 py-1.5 rounded-full bg-[rgba(242,160,54,0.1)] text-[#fdba74] border border-[rgba(242,160,54,0.15)] text-[9px]">
                                            Custom Fragrances
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-wider px-3-5 py-1.5 rounded-full bg-[#7000ff]/20 text-[#c084fc] border border-[#7000ff]/30 text-[9px]">
                                            React Realized
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-wider px-3-5 py-1.5 rounded-full bg-[rgba(0,195,120,0.1)] text-[#6ee7b7] border border-[rgba(0,195,120,0.15)] text-[9px]">
                                            Performance Hub
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-none">
                                        PerfumeKhana<br/>
                                        <span className="text-[#fca5a5] text-xl md:text-2xl font-bold font-serif italic block mt-2">Custom Fragrance Store</span>
                                    </h3>

                                    {/* Description */}
                                    <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed mb-8 max-w-xl">
                                        A bespoke, high-conversion e-commerce platform for a custom perfume craft house. Features a slick premium product catalog, custom fragrance builder interfaces, themed collections, responsive shopping carts, and a luxury tactile visual design.
                                    </p>
                                </div>

                                <div>
                                    {/* Metrics */}
                                    <div className="grid grid-cols-4 gap-4 py-6 border-y border-white/5 mb-8">
                                        <div className="text-center md:text-left">
                                            <span className="text-xl md:text-2xl lg:text-3xl font-black text-[#ccff00] block">5</span>
                                            <span className="text-[8px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mt-1">Days Built</span>
                                        </div>
                                        <div className="text-center md:text-left">
                                            <span className="text-xl md:text-2xl lg:text-3xl font-black text-[#ccff00] block">Custom</span>
                                            <span className="text-[8px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mt-1">Builder</span>
                                        </div>
                                        <div className="text-center md:text-left">
                                            <span className="text-xl md:text-2xl lg:text-3xl font-black text-[#ccff00] block font-sans">Premium</span>
                                            <span className="text-[8px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mt-1">Feel</span>
                                        </div>
                                        <div className="text-center md:text-left">
                                            <span className="text-xl md:text-2xl lg:text-3xl font-black text-[#ccff00] block">Live</span>
                                            <span className="text-[8px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-widest block mt-1">Status</span>
                                        </div>
                                    </div>

                                    {/* Tech Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-8 max-w-xl">
                                        {['React', 'TypeScript', 'Tailwind CSS', 'Lovable Engine', 'Framer Motion', 'Intuitive E-Commerce Flows', 'Ultra-Fast Page Speeds'].map((tech) => (
                                            <span key={tech} className="text-[9px] font-semibold bg-white/5 text-zinc-400 border border-white/10 px-2.5 py-1 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* CTA Link */}
                                    <a 
                                        href="https://perfumekhana.lovable.app/" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest border border-[#ff6b6b] text-[#ff6b6b] bg-transparent py-4 px-8 rounded-full transition-all duration-300 hover:bg-[#ff6b6b] hover:text-[#080808]"
                                        id="visit-live-perfume"
                                    >
                                        Visit Live Site <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>

                            {/* RIGHT VISUAL/MOCKUP PANEL */}
                            <div className="relative min-h-[350px] lg:min-h-full bg-gradient-to-br from-[#1f0a0d] to-[#120508] border-t lg:border-t-0 lg:border-l border-white/5 overflow-hidden flex items-center justify-center p-6 md:p-12">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,107,107,0.12),transparent_55%)] pointer-events-none"></div>
                                
                                <motion.div 
                                    whileHover={{ y: -5 }} 
                                    transition={{ duration: 0.5 }}
                                    className="w-full max-w-[480px] bg-[#0d0408] rounded-2xl border border-[rgba(255,107,107,0.2)] shadow-2xl overflow-hidden aspect-video flex flex-col relative z-10"
                                >
                                    {/* Browser bar */}
                                    <div className="bg-[#1a0709] px-4 py-2.5 flex items-center justify-between border-b border-[rgba(255,107,107,0.15)]">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
                                            <span className="text-[8px] font-black text-[#f5c842] tracking-wider ml-4 font-mono">✦ PERFUME KHANA</span>
                                        </div>
                                        <span className="text-[6px] text-zinc-300 font-bold">🛒 Cart (3)</span>
                                    </div>

                                    {/* Body content */}
                                    <div className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#1f0a0d] to-[#0d0408] text-center">
                                        <div className="mx-auto max-w-[90%]">
                                            <div className="text-[5px] font-black text-[#ff6b6b] uppercase tracking-widest mb-1">
                                                Custom Fragrances — Crafted For You
                                            </div>
                                            <h4 className="text-[10px] md:text-xs font-black text-white leading-tight mb-1 uppercase tracking-tight">
                                                Your Signature <span className="text-[#f5c842] italic">Scent. Personalized.</span>
                                            </h4>
                                            <p className="text-[5px] text-zinc-500 leading-normal max-w-[90%] mx-auto mb-1">
                                                Bespoke perfumes hand-crafted using ultra-premium sourced ingredients.
                                            </p>
                                            <span className="inline-block bg-[#ff6b6b] text-white text-[5px] font-extrabold px-2.5 py-0.5 rounded-full">
                                                From Rs. 2,500 →
                                            </span>
                                        </div>

                                        {/* Packaged elements */}
                                        <div className="grid grid-cols-3 gap-2 mt-2 px-1">
                                            <div className="bg-[#1a0709] border border-red-500/10 p-1.5 rounded-lg text-center">
                                                <span className="text-xs block leading-none">🌹</span>
                                                <span className="text-[4px] text-red-200 block font-bold mt-1">Rose Oud</span>
                                                <span className="text-[4px] text-[#f5c842] block">Rs. 3,200</span>
                                            </div>
                                            <div className="bg-[#1a0709] border border-red-500/10 p-1.5 rounded-lg text-center">
                                                <span className="text-xs block leading-none">🌿</span>
                                                <span className="text-[4px] text-red-200 block font-bold mt-1">Fresh Musk</span>
                                                <span className="text-[4px] text-[#f5c842] block">Rs. 2,800</span>
                                            </div>
                                            <div className="bg-[#1a0709] border border-red-500/10 p-1.5 rounded-lg text-center">
                                                <span className="text-xs block leading-none">🌙</span>
                                                <span className="text-[4px] text-red-200 block font-bold mt-1">Arabian Oud</span>
                                                <span className="text-[4px] text-[#f5c842] block">Rs. 4,500</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                        </div>
                    </motion.div>

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

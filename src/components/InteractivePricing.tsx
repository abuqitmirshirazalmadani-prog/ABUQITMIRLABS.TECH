import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquare, Check, HelpCircle } from 'lucide-react';

type ViewMode = 'tiers' | 'hourly';

const InteractivePricing = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('tiers');

    return (
        <section id="pricing-section" className="bg-[#0A0A0C] text-[#f5f5f5] py-28 px-6 overflow-hidden border-t border-white/5 relative">
            
            {/* Tech-inspired background grids / overlays */}
            <div className="absolute inset-0 bg-[#0A0A0C] opacity-95"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
            
            {/* Ambient Halos */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-4"
                    >
                        <span className="text-[10px] md:text-xs font-mono font-black uppercase tracking-[0.25em] text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full px-4 py-1.5 inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(204,255,0,0.1)]">
                            <Sparkles size={10} /> [ PRICING_AND_ENGAGEMENT_MODELS ]
                        </span>
                    </motion.div>

                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif leading-[1.1] text-white tracking-tight"
                    >
                        Elite Tech. <span className="font-sans font-black text-[#ccff00] block mt-1">Transparent Rates.</span>
                    </motion.h2>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-zinc-500 text-xs md:text-sm max-w-xl mx-auto mt-4 leading-relaxed font-light"
                    >
                        Flexible engagements designed around your business scale. No surprise rates, purely value-locked execution.
                    </motion.p>
                </div>

                {/* INTERACTIVE TOGGLE */}
                <div className="flex justify-center mb-16">
                    <div className="bg-[#111114] border border-white/10 rounded-full p-1.5 flex items-center relative shadow-2xl">
                        <button
                            id="toggle-project-tiers"
                            onClick={() => setViewMode('tiers')}
                            className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 z-10 relative flex items-center gap-2 ${
                                viewMode === 'tiers' ? 'text-black' : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Project Scope Tiers
                        </button>
                        <button
                            id="toggle-hourly-rates"
                            onClick={() => setViewMode('hourly')}
                            className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 z-10 relative flex items-center gap-2 ${
                                viewMode === 'hourly' ? 'text-black' : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Hourly Rate Cards
                        </button>
                        
                        {/* Slide animation background */}
                        <motion.div
                            layout
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                            className="absolute inset-y-1.5 rounded-full bg-[#ccff00]"
                            style={{
                                left: viewMode === 'tiers' ? '6px' : 'calc(50% + 2px)',
                                width: 'calc(50% - 8px)',
                            }}
                        />
                    </div>
                </div>

                {/* GRID CONTENT CONTAINER with AnimatePresence */}
                <div className="min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {viewMode === 'tiers' ? (
                            <motion.div
                                key="tiers-view"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
                            >
                                {/* Card 1: MVP */}
                                <div className="rounded-[2rem] bg-[#111113] border border-white/5 p-8 flex flex-col justify-between hover:border-white/10 transition-all group relative">
                                    <div className="absolute top-6 right-6 text-zinc-600 group-hover:text-[#ccff00] transition-colors">
                                        {/* Rocket SVG */}
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41a14.98 14.98 0 00-3.47 5.96m12.16-2.58H14.4A14.98 14.98 0 009.63 8.412m0 0a14.98 14.98 0 01-3.47 5.96M3.243 19.346a1.2 1.2 0 001.077 1.077l3.758.375a1.2 1.2 0 001.127-.604l.758-1.516a1.2 1.2 0 00-.127-1.32l-3.235-3.235a1.2 1.2 0 00-1.32-.127l-1.516.758a1.2 1.2 0 00-.604 1.127l.375 3.758z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider mb-2">[ VALUE_LOCKED ]</div>
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Small / MVP Build</h3>
                                        <p className="text-zinc-500 text-xs font-light leading-relaxed mb-8">
                                            Perfect prototype execution for proof-of-concepts, simple startups, and hyper-targeted tool landing pages.
                                        </p>
                                        
                                        <div className="mb-8">
                                            <span className="text-4xl font-black text-white">$100 - $150</span>
                                            <span className="text-zinc-500 font-mono text-xs ml-1">/ hr</span>
                                        </div>

                                        <ul className="space-y-4 mb-10">
                                            {[
                                                'Single page or focused application scope',
                                                'Pre-optimized performance & fully interactive UI',
                                                'Standard Firestore database integrations',
                                                'Deployment to premium serverless node architecture',
                                                'Completion trajectory of 5 to 10 days'
                                            ].map((bullet, idx) => (
                                                <li key={idx} className="flex gap-3 items-start text-xs text-zinc-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0"></span>
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <a
                                        href="https://wa.me/923233260859?text=Hello!%20I'm%20interested%20in%20consulting%20for%20a%20Small/MVP%20Build."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full text-center bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs py-4 px-6 rounded-2xl group-hover:bg-white group-hover:text-black transition-all"
                                        id="cta-mvp"
                                    >
                                        Consult MVP
                                    </a>
                                </div>

                                {/* Card 2: Mid-Range (MOST POPULAR) */}
                                <div className="rounded-[2.4rem] bg-[#141418] border-2 border-[#ccff00] p-8 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(204,255,0,0.1)] transition-all relative">
                                    
                                    {/* Dynamic floating badge */}
                                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ccff00] text-black font-black uppercase text-[9px] tracking-[0.25em] px-4 py-1.5 rounded-full shadow-[0_4px_15px_rgba(204,255,0,0.3)] animate-pulse">
                                        ★ MOST POPULAR ★
                                    </span>

                                    <div className="absolute top-8 right-8 text-[#ccff00]">
                                        {/* Layers SVG */}
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m11.142 0L21.75 12l-4.179-2.25M12 5.75L6.429 8.75m0 0L12 11.75l5.571-3m-11.142 0L12 5.75m0 0a14.28 14.28 0 005.571 3M12 11.75v6m11.142-6v6L12 21.75l-4.171-2.25v-6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-mono uppercase text-[#ccff00] tracking-wider mb-2">[ HIGH_VALUE_IMPACT ]</div>
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Mid-Range Systems</h3>
                                        <p className="text-zinc-400 text-xs font-light leading-relaxed mb-8">
                                            Complete product development including state managers, authentication models, database architecture, and custom AI agents.
                                        </p>
                                        
                                        <div className="mb-8">
                                            <span className="text-4xl font-black text-white">$100 - $150</span>
                                            <span className="text-zinc-500 font-mono text-xs ml-1">/ hr</span>
                                        </div>

                                        <ul className="space-y-4 mb-10">
                                            {[
                                                'All-inclusive multi-page structures & custom modules',
                                                'Secure Cloud database integration (Firebase Firestore)',
                                                'Custom LLM Agents, API integrations & RAG systems',
                                                'Dynamic interactive features and user access control',
                                                'Full deployment trajectory of 10 to 20 days'
                                            ].map((bullet, idx) => (
                                                <li key={idx} className="flex gap-3 items-start text-xs text-zinc-300">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] mt-1.5 shrink-0"></span>
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <a
                                        href="https://wa.me/923233260859?text=Hello!%20I'm%20interested%20in%20a%20Mid-Range%20System%20build."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full text-center bg-[#ccff00] text-black font-black uppercase tracking-widest text-xs py-4 px-6 rounded-2xl hover:bg-white transition-all shadow-[0_4px_15px_rgba(204,255,0,0.15)]"
                                        id="cta-midrange"
                                    >
                                        Initiate Discovery
                                    </a>
                                </div>

                                {/* Card 3: Enterprise */}
                                <div className="rounded-[2rem] bg-[#111113] border border-white/5 p-8 flex flex-col justify-between hover:border-white/10 transition-all group relative">
                                    <div className="absolute top-6 right-6 text-zinc-600 group-hover:text-[#ccff00] transition-colors">
                                        {/* Server Stack SVG */}
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 3h13.5m-13.5-6h13.5m-13.5-3h13.5m-16.5 12h19.5a1.5 1.5 0 001.5-1.5V4.5a1.5 1.5 0 00-1.5-1.5H3a1.5 1.5 0 00-1.5 1.5v13.5a1.5 1.5 0 001.5 1.5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider mb-2">[ BESPOKE_CORE ]</div>
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Enterprise Solutions</h3>
                                        <p className="text-zinc-500 text-xs font-light leading-relaxed mb-8">
                                            Tailored, secure digital ecosystems built to meet high enterprise compliance, scale, and performance standards.
                                        </p>
                                        
                                        <div className="mb-8">
                                            <span className="text-4xl font-black text-white">$150 - $250+</span>
                                            <span className="text-zinc-500 font-mono text-xs ml-1">/ hr</span>
                                        </div>

                                        <ul className="space-y-4 mb-10">
                                            {[
                                                'Production-grade relational cloud databases (Cloud SQL)',
                                                'Enterprise SSO, high-spec authentication workflows',
                                                'Proprietary custom APIs, microservices & complex pipelines',
                                                'Detailed compliance audits, scalability profiling & QA',
                                                'Flexible enterprise deployment trajectory limits'
                                            ].map((bullet, idx) => (
                                                <li key={idx} className="flex gap-3 items-start text-xs text-zinc-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0"></span>
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <a
                                        href="https://wa.me/923233260859?text=Hello!%20I'm%20interested%20in%20Enterprise%20Solutions."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full text-center bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs py-4 px-6 rounded-2xl group-hover:bg-white group-hover:text-black transition-all"
                                        id="cta-enterprise"
                                    >
                                        Consult Enterprise
                                    </a>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="hourly-view"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
                            >
                                {/* Left: Hourly rate specification card sheet */}
                                <div className="lg:col-span-7 bg-[#111113] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                                            <div>
                                                <span className="text-[9px] font-mono uppercase text-zinc-500 block">[ ENGAGEMENT_SPECS ]</span>
                                                <h3 className="text-xl font-bold uppercase tracking-tight text-white mt-1">Resource Cards</h3>
                                            </div>
                                            <span className="text-[10px] font-mono text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/20 rounded px-2.5 py-1">
                                                [ LOCAL_US_ENGINEER_RATES ]
                                            </span>
                                        </div>

                                        <p className="text-zinc-500 text-xs font-light leading-relaxed mb-8">
                                            For long-term, custom, or iterative projects, we charge straightforward hourly billing relative to the engineering depth deployed.
                                        </p>

                                        {/* Interactive Sheet List */}
                                        <div className="space-y-4">
                                            {[
                                                { role: 'Junior Engineer', rate: '$70 - $100 / hr', desc: 'Front-end CSS tuning, asset layouts, content formatting' },
                                                { role: 'UI / UX Designer', rate: '$80 - $140 / hr', desc: 'Custom mockups, bento typography grid architecture, tactile maps design' },
                                                { role: 'Mid-Level Engineer', rate: '$100 - $150 / hr', desc: 'React, state workflows, standard API bridges, database setup' },
                                                { role: 'Senior Consultant / Architect', rate: '$150 - $250+ / hr', desc: 'Custom AI agent, RAG architectures, relational cloud DBs, heavy scalability design' },
                                            ].map((item, idx) => (
                                                <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/[0.03] hover:border-white/10 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                                    <div>
                                                        <span className="text-xs font-black text-white block uppercase tracking-tight">{item.role}</span>
                                                        <span className="text-[10px] text-zinc-500 leading-normal block mt-0.5">{item.desc}</span>
                                                    </div>
                                                    <span className="text-xs font-mono font-bold text-[#ccff00] bg-[#ccff00]/5 border border-[#ccff00]/10 px-3 py-1.5 rounded-full shrink-0 self-start sm:self-auto">
                                                        {item.rate}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                                        <span className="text-[10px] text-zinc-500 font-mono tracking-wide">
                                            // INVOICES ISSUED BI-WEEKLY PRECISELY ON HOUR TIMESTAMPS
                                        </span>
                                        <a
                                            href="https://wa.me/923233260859?text=Hello!%20I'd%20like%20to%20discuss%20hourly%20consultancies."
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-xs font-black uppercase text-[#ccff00] hover:text-white transition-colors"
                                            id="hourly-whatsapp-button"
                                        >
                                            Inquire Hourly Consultation →
                                        </a>
                                    </div>
                                </div>

                                {/* Right: Annual maintenance expectation sheet */}
                                <div className="lg:col-span-5 bg-gradient-to-br from-[#120e03] to-[#0d0702] border-2 border-amber-500/30 rounded-[2rem] p-8 flex flex-col justify-between hover:border-amber-500/50 transition-all relative">
                                    <div className="absolute top-6 right-6 text-amber-500">
                                        <HelpCircle size={24} />
                                    </div>

                                    <div>
                                        <div className="mb-6">
                                            <span className="text-[9px] font-mono uppercase text-amber-500 block">[ MAINTENANCE_EXPECTATIONS ]</span>
                                            <h3 className="text-xl font-bold uppercase tracking-tight text-white mt-1">Lifecycle Cost</h3>
                                        </div>

                                        <p className="text-zinc-300 text-xs font-light leading-relaxed mb-6">
                                            All production software requires continuous post-launch security patching, server scaling, package updates, and data cleanups.
                                        </p>

                                        {/* Highlight Box */}
                                        <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-center mb-6">
                                            <span className="text-3xl font-black text-[#f5c842] block">15% to 20%</span>
                                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest block mt-2">Of Initial Build Cost / Year</span>
                                        </div>

                                        <ul className="space-y-4">
                                            {[
                                                'Periodic serverless/container scaling limits adjustment',
                                                'Database index reorganizing & cache optimization logs',
                                                'Immediate security patches & package upgrades',
                                                'Strategic periodic backups & backup restore dry-runs'
                                            ].map((bullet, idx) => (
                                                <li key={idx} className="flex gap-3 items-start text-xs text-zinc-300">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-8 pt-4 border-t border-amber-500/10">
                                        <span className="text-[9px] text-zinc-500 font-mono tracking-wide uppercase block">
                                            * Ensures high security & performance years post-launch.
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};

export default InteractivePricing;

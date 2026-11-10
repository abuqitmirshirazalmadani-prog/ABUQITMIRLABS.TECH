import React from 'react';
import { Link } from 'react-router-dom';

const TrustSection = () => {
    return (
        <section className="bg-[#0a0a0a] py-16 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left: Verified Entity & Directory Presence */}
                        <div className="border border-white/10 rounded-2xl bg-zinc-950 p-7 flex flex-col justify-between space-y-6">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-black/60 rounded-xl p-3 border border-white/10">
                                    <p className="text-xl font-black text-white">5+ Years.</p>
                                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Founded in 2021.</p>
                                </div>
                                <div className="bg-black/60 rounded-xl p-3 border border-white/10">
                                    <p className="text-xl font-black text-white">100% IP.</p>
                                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Code Ownership.</p>
                                </div>
                                <div className="bg-black/60 rounded-xl p-3 border border-white/10">
                                    <p className="text-xl font-black text-white">Clutch.co.</p>
                                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Verified Profile.</p>
                                </div>
                                <div className="bg-black/60 rounded-xl p-3 border border-white/10">
                                    <p className="text-xl font-black text-white">GoodFirms.</p>
                                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Listed Studio.</p>
                                </div>
                            </div>

                            <div className="bg-black/60 rounded-xl p-4 border border-white/10 space-y-2">
                                <p className="text-xs font-mono text-[#ccff00] uppercase tracking-wider font-bold">
                                    Project Governance.
                                </p>
                                <p className="text-xs text-neutral-300 leading-relaxed">
                                    Every project starts with a written scope of work, clear milestone checks, and full GitHub code ownership from day one.
                                </p>
                            </div>
                        </div>

                        {/* Middle: 5 Benefit-Led Trust Signals */}
                        <div className="p-7 bg-white/5 border border-white/10 rounded-2xl flex flex-col">
                            <p className="text-xs text-neutral-400 font-bold tracking-widest uppercase mb-2">
                                Our Core Commitments.
                            </p>
                            <h2 className="text-2xl md:text-3xl font-serif italic text-white leading-tight">
                                Built for Long-Term Ownership &amp; Scale
                            </h2>

                            <div className="mt-5 space-y-3 text-xs sm:text-sm text-neutral-300">
                                <p><strong className="text-white">1. 100% IP &amp; Code Ownership:</strong> You get full GitHub repos, cloud setup scripts, and docs at every milestone.</p>
                                <p><strong className="text-white">2. Clear 5-Step Process:</strong> We run steady two-week sprints from planning to launch. <Link to="/about/our-process" className="text-[#ccff00] underline hover:text-white">See our 5-step plan</Link>.</p>
                                <p><strong className="text-white">3. Senior Engineers Only:</strong> You talk directly with lead software architects. There are no middle managers slowing you down.</p>
                                <p><strong className="text-white">4. Daily Timezone Overlap:</strong> We overlap work hours with US, UK, Europe, and Gulf teams and share weekly live demos.</p>
                                <p><strong className="text-white">5. Safe &amp; Tested Code:</strong> We use strict access rules, encrypted data flows, and automated quality checks.</p>
                            </div>
                        </div>

                        {/* Right: Trust indicators & Production Proof */}
                        <div className="grid grid-rows-2 gap-6">
                            <div className="p-7 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center">
                                <h3 className="text-lg font-bold text-white mb-2">Live Production Case Studies</h3>
                                <p className="text-xs text-neutral-300 leading-relaxed max-w-[260px]">
                                    See live platforms we built, including{' '}
                                    <Link to="/case-studies/tajweedpage" className="text-[#ccff00] underline hover:text-white">
                                        TajweedPage.com
                                    </Link>{' '}
                                    which serves students in over 20 countries.
                                </p>
                            </div>

                            <div className="p-7 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between">
                                <ul className="space-y-3 text-sm text-neutral-300">
                                    <li className="flex justify-between"><span>Custom Software &amp; Web.</span><strong className="text-[#ccff00]">Core Practice.</strong></li>
                                    <li className="flex justify-between"><span>AI Agents &amp; RAG Tools.</span><strong className="text-[#ccff00]">Core Practice.</strong></li>
                                    <li className="flex justify-between"><span>Technical &amp; Local SEO.</span><strong className="text-[#ccff00]">Core Practice.</strong></li>
                                </ul>
                                <p className="mt-4 pt-3 border-t border-white/10 text-[11px] text-neutral-300 font-mono">
                                    ✓ Verified on Clutch, GoodFirms &amp; Google Business Profile.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;

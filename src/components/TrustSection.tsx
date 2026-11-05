import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Check, Lock, Award, Code2, Globe2, GitBranch } from 'lucide-react';
import { AnimatedShinyText } from './ui/animated-shiny-text';
import { AnimatedBreathingText } from './ui/animated-breathing-text';

const TrustSection = () => {
    const fadeInSlide = {
        hidden: { opacity: 0, y: 30 },
        visible: (delay: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: delay,
                duration: 0.6,
                ease: "easeOut"
            }
        })
    } as any;

    return (
        <section className="bg-[#0a0a0a] py-20 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0}
                    variants={fadeInSlide}
                    className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* Left: Verified Entity & Directory Presence */}
                        <motion.div 
                            custom={0.1}
                            variants={fadeInSlide}
                            className="overflow-hidden bg-center border border-white/10 rounded-2xl relative min-h-[440px] sm:h-[520px]"
                            style={{ 
                                backgroundImage: 'url(https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200&fm=webp)',
                                backgroundSize: 'cover'
                            }}
                            role="img"
                            aria-label="Enterprise cloud and software architecture environment at AbuQitmirLabs"
                        >
                            <div className="absolute inset-0 bg-black/65"></div>
                            <div className="relative h-full p-8 flex flex-col justify-between">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/10">
                                        <div className="text-xl font-black text-white">5+ Years</div>
                                        <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-black">Founded in 2021</div>
                                    </div>
                                    <div className="bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/10">
                                        <div className="text-xl font-black text-white">100% IP</div>
                                        <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-black">Code Ownership</div>
                                    </div>
                                    <div className="bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/10">
                                        <div className="text-xl font-black text-white">Clutch</div>
                                        <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-black">Listed on Clutch</div>
                                    </div>
                                    <div className="bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/10">
                                        <div className="text-xl font-black text-white">GoodFirms</div>
                                        <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-black">Listed Agency</div>
                                    </div>
                                </div>

                                <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10 space-y-2">
                                    <div className="text-xs font-mono text-[#ccff00] uppercase tracking-wider font-bold">
                                        Engineering Governance
                                    </div>
                                    <p className="text-xs text-neutral-300 leading-relaxed">
                                        Every engagement is governed by written Statements of Work, milestone acceptance criteria, and full GitHub repository ownership from day one.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Middle: 5 Benefit-Led Trust Signals */}
                        <motion.div 
                            custom={0.2}
                            variants={fadeInSlide}
                            className="p-8 bg-white/5 border border-white/10 rounded-2xl relative flex flex-col"
                        >
                            <span className="text-sm text-neutral-400 font-bold tracking-widest uppercase mb-2 block">
                                Engineering Commitments
                            </span>
                            <AnimatedShinyText 
                                text="Built for Long-Term Ownership & Scale" 
                                textClassName="text-3xl md:text-4xl leading-tight"
                                className="mt-2"
                            />

                            <div className="mt-6 space-y-4">
                                <div className="flex items-start gap-3 text-sm text-neutral-200">
                                    <Code2 className="h-5 w-5 text-[#ccff00] shrink-0 mt-0.5" />
                                    <div>
                                        <AnimatedBreathingText text="100% IP & Source Code Ownership" className="font-bold text-white block" />
                                        <p className="text-neutral-400 text-xs mt-0.5">Complete GitHub repositories, infrastructure-as-code, and documentation transferred upon milestone completion.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-neutral-200">
                                    <GitBranch className="h-5 w-5 text-[#ccff00] shrink-0 mt-0.5" />
                                    <div>
                                        <AnimatedBreathingText text="Structured 5-Step Delivery Process" className="font-bold text-white block" />
                                        <p className="text-neutral-400 text-xs mt-0.5">
                                            Predictable 2-week sprints from scoping to launch.{' '}
                                            <Link to="/about/our-process" className="text-[#ccff00] underline hover:text-white">
                                                Review our 5-step process
                                            </Link>.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-neutral-200">
                                    <Award className="h-5 w-5 text-[#ccff00] shrink-0 mt-0.5" />
                                    <div>
                                        <AnimatedBreathingText text="Senior-Led Engineering" className="font-bold text-white block" />
                                        <p className="text-neutral-400 text-xs mt-0.5">Direct communication with lead software architects and senior engineers—no account-manager bottlenecks.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-neutral-200">
                                    <Globe2 className="h-5 w-5 text-[#ccff00] shrink-0 mt-0.5" />
                                    <div>
                                        <AnimatedBreathingText text="Global Remote Delivery" className="font-bold text-white block" />
                                        <p className="text-neutral-400 text-xs mt-0.5">Dedicated timezone overlap across the US, UK, Europe, and GCC with weekly staging demos.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-neutral-200">
                                    <Lock className="h-5 w-5 text-[#ccff00] shrink-0 mt-0.5" />
                                    <div>
                                        <AnimatedBreathingText text="Security-First Architecture" className="font-bold text-white block" />
                                        <p className="text-neutral-400 text-xs mt-0.5">Least-privilege access controls, encrypted data pipelines, and automated CI/CD quality gates.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Trust indicators & Production Proof */}
                        <div className="grid grid-rows-2 gap-6">
                            <motion.div 
                                custom={0.3}
                                variants={fadeInSlide}
                                className="p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center"
                            >
                                <div className="relative h-20 w-20">
                                    <div className="absolute inset-0 rounded-full bg-[#ccff00] animate-pulse opacity-10"></div>
                                    <div className="absolute inset-[6px] rounded-full bg-[#ccff00]/10 border border-[#ccff00]/40 flex items-center justify-center">
                                        <ShieldCheck className="h-9 w-9 text-[#ccff00]" />
                                    </div>
                                </div>
                                <div className="mt-5 flex flex-col items-center">
                                    <AnimatedBreathingText text="Production Case Studies" className="text-lg font-bold text-white mb-2" />
                                    <p className="text-xs text-neutral-400 leading-relaxed max-w-[240px]">
                                        Explore live architectures including{' '}
                                        <Link to="/case-studies/tajweedpage" className="text-[#ccff00] underline hover:text-white">
                                            TajweedPage.com
                                        </Link>{' '}
                                        and our B2B growth engineering systems.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div 
                                custom={0.4}
                                variants={fadeInSlide}
                                className="p-8 bg-white/5 border border-white/10 rounded-2xl"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-neutral-300">Custom Software &amp; Web</span>
                                        <span className="text-[#ccff00] font-bold">Core Practice</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-neutral-300">AI Agents &amp; RAG Systems</span>
                                        <span className="text-[#ccff00] font-bold">Core Practice</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-neutral-300">Technical &amp; Semantic SEO</span>
                                        <span className="text-[#ccff00] font-bold">Core Practice</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-2 text-[10px] text-neutral-300 uppercase tracking-widest font-bold">
                                        <Check className="h-3 w-3 text-[#ccff00]" />
                                        Listed on Clutch, GoodFirms &amp; Google Business
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TrustSection;

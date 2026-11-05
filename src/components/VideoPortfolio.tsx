"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { MagicText } from './ui/magic-text';
import { AnimatedBreathingText } from './ui/animated-breathing-text';
import { YouTubeFacade } from './ui/youtube-facade';

export const portfolioVideos = [
    {
        id: "v1",
        title: "Enterprise Digital Architecture",
        desc: "Watch our lead architect at AbuQitmirLabs break down complex digital ecosystems and scalable B2B software architecture.",
        videoId: "Sh9SqMCx9I4",
        uploadDate: "2026-01-15T08:00:00+05:00"
    },
    {
        id: "v2",
        title: "Advanced Engineering Solutions",
        desc: "Deep dive into high-performance web architecture, sub-second Core Web Vitals, and scalable cloud backend systems.",
        videoId: "B31EXmt5LrQ",
        uploadDate: "2026-01-22T08:00:00+05:00"
    },
    {
        id: "v3",
        title: "AI-Driven Business Growth",
        desc: "How we implement autonomous LLM and RAG agents to automate multi-step enterprise workflows and customer operations.",
        videoId: "KAhcBqKN_ks",
        uploadDate: "2026-02-01T08:00:00+05:00"
    },
    {
        id: "v4",
        title: "Strategic Consulting Session",
        desc: "A look at our detailed technical discovery and architecture roadmap building for US, UK, and GCC enterprise clients.",
        videoId: "M4m1rplTxDk",
        uploadDate: "2026-02-10T08:00:00+05:00"
    },
    {
        id: "v5",
        title: "Modern Tech Explained",
        desc: "Quick insights into modern Next.js, Flutter, and semantic search optimization for Google and AI answer engines.",
        videoId: "KowPMteJA-E",
        uploadDate: "2026-02-18T08:00:00+05:00"
    },
    {
        id: "v6",
        title: "Future of Digital Assets",
        desc: "A vision for secure, fast, and intelligent digital transformation combining custom software, AI, and SEO.",
        videoId: "FgtXLw-GNKk",
        uploadDate: "2026-03-01T08:00:00+05:00"
    }
];

const VideoPortfolio = () => {
    return (
        <section id="video-portfolio" className="bg-[#0a0a0a] py-20 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8EB5F] block mb-3">
                        Engineering &amp; AI Video Briefings
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                        Technical Architecture &amp; AI Demonstrations
                    </h2>
                    <p className="text-sm sm:text-base text-gray-400 font-light">
                        Watch walkthroughs of our enterprise software architecture, autonomous AI workflows, and cinematic AI video production.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioVideos.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group flex flex-col bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all shadow-xl backdrop-blur-sm"
                        >
                            {/* Video Container with Facade */}
                            <div className="aspect-video relative overflow-hidden bg-black/60">
                                <YouTubeFacade videoId={item.videoId} title={item.title} />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
                                    <AnimatedBreathingText text={item.title} className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors block" />
                                </h3>
                                <MagicText text={item.desc} className="text-sm text-gray-400 font-light" />
                                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Video Briefing</span>
                                    <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Link
                        to="/ai-video-creation"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider font-bold text-[#C8EB5F] hover:underline"
                    >
                        <span>Explore AI Video Production Services</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default VideoPortfolio;


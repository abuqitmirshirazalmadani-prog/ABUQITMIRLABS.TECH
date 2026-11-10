"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { YouTubeFacade } from './ui/youtube-facade';

export const portfolioVideos = [
    {
        id: "v1",
        title: "Enterprise Digital Architecture",
        desc: "Watch our lead architect explain how we build fast, safe software systems for growing B2B companies.",
        videoId: "Sh9SqMCx9I4",
        uploadDate: "2026-01-15T08:00:00+05:00"
    },
    {
        id: "v2",
        title: "High-Speed Web Engineering",
        desc: "See how we build Next.js websites that load in under one second and pass Google Core Web Vitals.",
        videoId: "B31EXmt5LrQ",
        uploadDate: "2026-01-22T08:00:00+05:00"
    },
    {
        id: "v3",
        title: "AI Agents for Business Growth",
        desc: "Learn how custom AI agents and private RAG search tools automate daily customer support and sales tasks.",
        videoId: "KAhcBqKN_ks",
        uploadDate: "2026-02-01T08:00:00+05:00"
    },
    {
        id: "v4",
        title: "Technical Discovery Walkthrough",
        desc: "A look inside our 30-minute discovery call and how we map out your project scope and budget.",
        videoId: "M4m1rplTxDk",
        uploadDate: "2026-02-10T08:00:00+05:00"
    },
    {
        id: "v5",
        title: "Modern Web & Mobile Stacks",
        desc: "Simple tips on choosing Next.js, Flutter, and structured data so your brand wins in search.",
        videoId: "KowPMteJA-E",
        uploadDate: "2026-02-18T08:00:00+05:00"
    },
    {
        id: "v6",
        title: "Building Connected Revenue Systems",
        desc: "How custom software, smart AI tools, and technical SEO work together to grow your sales pipeline.",
        videoId: "FgtXLw-GNKk",
        uploadDate: "2026-03-01T08:00:00+05:00"
    }
];

const VideoPortfolio = () => {
    return (
        <section id="video-portfolio" className="bg-[#0a0a0a] py-20 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8EB5F] mb-3 font-bold">
                        Video Briefings.
                    </p>
                    <h2 className="text-3xl sm:text-5xl font-serif italic text-white tracking-tight mb-4">
                        Technical Architecture &amp; AI Demonstrations
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-300 font-light">
                        Watch short videos showing how we build custom software, AI agents, and search systems.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolioVideos.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden"
                        >
                            <div className="aspect-video relative overflow-hidden bg-black">
                                <YouTubeFacade videoId={item.videoId} title={item.title} />
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-neutral-300 font-light leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <Link
                        to="/ai-video-creation"
                        className="inline-flex items-center text-xs sm:text-sm font-mono uppercase tracking-wider font-bold text-[#C8EB5F] hover:underline"
                    >
                        Explore AI Video Production Services →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default VideoPortfolio;

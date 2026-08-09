"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Mail, 
  SendHorizonal, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Server,
  Code2,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IconCloud } from './interactive-icon-cloud';
import { MagicText } from './magic-text';

const techSlugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

const NexusHero = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
            setTimeout(() => {
                window.open(`https://wa.me/923233260859?text=${encodeURIComponent(`Hello AbuQitmirLabs team, I would like a consultation for my project. My email/details: ${email}`)}`, '_blank');
            }, 300);
        }
    };

    return (
        <section id="nexus-hero" className="relative overflow-hidden bg-[#09090b] text-white py-20 lg:py-28 border-b border-dashed border-white/10 selection:bg-[#ccff00]/30 selection:text-white">
            {/* Background Ambient Glows & Grid */}
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-[#ccff00]/[0.05] via-blue-500/[0.02] to-transparent blur-3xl pointer-events-none" />
            <div aria-hidden className="absolute -top-40 -right-40 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-[120px] pointer-events-none" />
            <div aria-hidden className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
                <div className="lg:flex lg:items-center lg:gap-12">
                    
                    {/* Left Side: Content Block */}
                    <div className="relative z-10 mx-auto max-w-2xl text-center lg:ml-0 lg:w-1/2 lg:text-left">
                        
                        {/* New Pill Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link
                                to="/contact"
                                className="rounded-xl mx-auto flex w-fit items-center gap-2 border border-white/10 bg-white/[0.03] backdrop-blur-md p-1 pr-3 hover:border-[#ccff00]/40 transition-all group mb-8 shadow-lg shadow-black/50 lg:ml-0"
                            >
                                <span className="bg-[#ccff00] text-black font-extrabold rounded-lg px-2.5 py-1 text-xs uppercase tracking-wider">
                                    New
                                </span>
                                <span className="text-xs md:text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                                    AbuQitmirLabs.tech Digital Excellence v2.0
                                </span>
                                <span className="bg-white/15 block h-4 w-px"></span>
                                <ArrowRight className="size-4 text-[#ccff00] group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl leading-[1.12]"
                        >
                            Full-Service Digital Agency &amp; <br className="hidden sm:inline" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ccff00] to-emerald-400">
                                Custom Software Studio
                            </span>
                        </motion.h1>

                        {/* Description Quote */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-6 text-gray-300 text-base md:text-lg leading-relaxed font-normal"
                        >
                            <MagicText 
                                text="AbuQitmirLabs is a premier custom software development company delivering AI app development services, custom website development services and enterprise software solutions to clients across the United States, United Kingdom, and Europe."
                                className="leading-relaxed"
                                wordClassName="text-sm sm:text-base md:text-lg text-gray-300 font-normal"
                            />
                        </motion.div>

                        {/* Email / Consultation Input Form */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-8"
                        >
                            <form onSubmit={handleSubmit} className="mx-auto max-w-md lg:ml-0 lg:mr-auto">
                                <div className="bg-zinc-950/90 has-[input:focus]:ring-[#ccff00]/40 relative grid grid-cols-[1fr_auto] items-center rounded-2xl border border-white/15 pr-1.5 shadow-2xl shadow-black/80 has-[input:focus]:ring-2 transition-all">
                                    <div className="relative flex items-center">
                                        <Mail className="text-gray-400 pointer-events-none absolute left-4 size-5" />
                                        <input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter mail or project idea..."
                                            className="h-14 w-full bg-transparent pl-12 pr-3 text-sm text-white placeholder:text-gray-500 focus:outline-none"
                                            type="text"
                                            required
                                        />
                                    </div>

                                    <div className="md:pr-1 lg:pr-0">
                                        <Button
                                            type="submit"
                                            aria-label="submit"
                                            className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold h-11 px-5 rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-2"
                                        >
                                            <span className="hidden md:block text-xs uppercase tracking-wider font-extrabold">
                                                {submitted ? "Redirecting..." : "Get Started"}
                                            </span>
                                            <SendHorizonal
                                                className="relative size-4 md:hidden"
                                                strokeWidth={2.5}
                                            />
                                        </Button>
                                    </div>
                                </div>
                            </form>

                            {/* Bullet Highlights matching Tailark list style */}
                            <ul className="mt-8 space-y-2.5 text-left text-sm font-medium text-gray-300 list-inside list-disc marker:text-[#ccff00]">
                                <li className="hover:text-white transition-colors">
                                    <strong className="text-white">Faster AI Deployment</strong> &mdash; Production-grade AI agent architectures
                                </li>
                                <li className="hover:text-white transition-colors">
                                    <strong className="text-white">Modern &amp; Bespoke Engineering</strong> &mdash; Tailored to your exact business workflow
                                </li>
                                <li className="hover:text-white transition-colors">
                                    <strong className="text-white">100% Scalable &amp; Secure</strong> &mdash; Cloud-native infrastructure built for enterprise growth
                                </li>
                            </ul>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                            <a 
                                href="https://wa.me/923233260859" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="group w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-gray-950 font-bold text-sm hover:bg-[#ccff00] transition-all shadow-[0_0_25px_rgba(204,255,0,0.25)] active:scale-95 flex items-center justify-center gap-2"
                            >
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                Build Your AI App
                            </a>
                            <Link 
                                to="/contact" 
                                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-zinc-900/80 border border-white/10 text-white font-bold text-sm hover:bg-zinc-800 transition-all backdrop-blur-md flex items-center justify-center gap-2 active:scale-95"
                            >
                                Get Free Consultation
                            </Link>
                        </motion.div>

                    </div>

                    {/* Right Side: Interactive 3D Tech Icon Cloud Display */}
                    <div className="mt-12 lg:mt-0 lg:w-1/2 relative flex items-center justify-center">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-950/80 p-6 shadow-2xl backdrop-blur-2xl overflow-hidden group hover:border-[#ccff00]/40 transition-all duration-500"
                        >
                            {/* Glowing Background Radial */}
                            <div aria-hidden className="absolute -top-24 -right-24 w-60 h-60 bg-[#ccff00]/15 rounded-full blur-[80px] pointer-events-none" />
                            <div aria-hidden className="absolute -bottom-24 -left-24 w-60 h-60 bg-blue-600/15 rounded-full blur-[80px] pointer-events-none" />

                            {/* Top System Header */}
                            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="size-3 rounded-full bg-red-500/80" />
                                    <div className="size-3 rounded-full bg-yellow-500/80" />
                                    <div className="size-3 rounded-full bg-green-500/80" />
                                    <span className="ml-2 font-mono text-xs text-gray-400">tech_stack_ecosystem.3d</span>
                                </div>
                                <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#ccff00] bg-[#ccff00]/10 px-2.5 py-1 rounded-full border border-[#ccff00]/20">
                                    <span className="size-1.5 rounded-full bg-[#ccff00] animate-pulse" />
                                    INTERACTIVE 3D
                                </span>
                            </div>

                            {/* 3D Icon Cloud Core */}
                            <div className="relative z-10 py-2 flex items-center justify-center min-h-[320px]">
                                <IconCloud iconSlugs={techSlugs} />
                            </div>

                            {/* Bottom Tech Status Footnote */}
                            <div className="relative z-10 mt-2 bg-zinc-900/90 border border-white/10 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5">
                                    <Sparkles className="size-5 text-[#ccff00] shrink-0" />
                                    <div>
                                        <p className="text-xs font-bold text-white leading-none">Modern Tech Stack Mastery</p>
                                        <p className="text-[11px] text-gray-400 mt-0.5">30+ Languages, Frameworks &amp; Cloud Platforms</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 shrink-0">
                                    FULL STACK
                                </span>
                            </div>

                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default NexusHero;

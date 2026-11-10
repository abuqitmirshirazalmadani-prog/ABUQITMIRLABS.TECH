"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { AnimatedShinyText } from './ui/animated-shiny-text';

interface Service {
    number: string;
    title: string;
    fullTitle: string;
    tagline: string;
    description: string;
    tags: string[];
    href: string;
}

const services: Service[] = [
    {
        number: "00",
        title: "Growth Engineering",
        fullTitle: "Software, AI, and SEO as One System.",
        tagline: "Build software, automate tasks, and grow search demand.",
        description: "We combine custom software, AI agents, and search marketing into one connected B2B system. You do not need separate dev shops and ad agencies.",
        tags: ["Software + AI.", "Search Growth.", "Revenue System."],
        href: "/growth-engineering"
    },
    {
        number: "01",
        title: "Custom Software",
        fullTitle: "Custom Software Development.",
        tagline: "Cloud apps built around your business rules.",
        description: "We turn your product ideas into fast, secure cloud software. We build MVPs for startups and core systems for growing companies. You own 100% of the code.",
        tags: ["Cloud Apps.", "MVP Build.", "SaaS."],
        href: "/custom-software"
    },
    {
        number: "02",
        title: "Web Development",
        fullTitle: "Web Development Services.",
        tagline: "Fast Next.js websites built to convert visitors.",
        description: "We build modern React and Next.js websites that load in under two seconds. Fast pages rank higher on Google and turn more visitors into buyers.",
        tags: ["Next.js.", "Headless CMS.", "Fast Load."],
        href: "/web-development"
    },
    {
        number: "03",
        title: "AI Agents",
        fullTitle: "AI Agent Development Services.",
        tagline: "Smart AI agents that answer questions and run tasks.",
        description: "We build custom AI agents and private RAG tools that connect to your data. They handle support, qualify leads, and save your team hours every day.",
        tags: ["Custom LLM.", "Private RAG.", "Workflows."],
        href: "/ai-agent-development"
    },
    {
        number: "04",
        title: "Mobile Apps",
        fullTitle: "Mobile App Development.",
        tagline: "iOS and Android apps from one clean codebase.",
        description: "We build smooth mobile apps using Flutter and React Native. Your app works on both iPhone and Android with secure login and offline support.",
        tags: ["Flutter.", "React Native.", "iOS & Android."],
        href: "/mobile-app-development"
    },
    {
        number: "05",
        title: "SEO Mastery",
        fullTitle: "SEO and Local Search Services.",
        tagline: "Rank on Google Search, Maps, and AI answers.",
        description: "We fix technical site issues, add clean Schema data, and build local authority. Your brand shows up when buyers search on Google or ask AI tools.",
        tags: ["Technical SEO.", "Google Maps.", "Schema Data."],
        href: "/seo-mastery"
    },
    {
        number: "06",
        title: "Design",
        fullTitle: "Brand Identity and UI/UX Design.",
        tagline: "Clear, modern design that builds instant buyer trust.",
        description: "We design clean logos, brand guides, and product screens in Figma. Good design makes your product easy to use and helps close more sales.",
        tags: ["UI/UX.", "Brand Guide.", "Figma."],
        href: "/graphics-design"
    },
    {
        number: "07",
        title: "Content",
        fullTitle: "Technical Content Writing.",
        tagline: "Expert guides and articles written by real engineers.",
        description: "We write clear, helpful guides and case studies backed by real project data. Our content builds buyer trust and ranks well in search results.",
        tags: ["E-E-A-T.", "Case Studies.", "Tech Guides."],
        href: "/content-writing"
    }
];

const ServicesSection = () => {
    return (
        <section id="services" className="bg-[#0a0a0a] py-20 px-6 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto mb-16 text-center"
            >
                <span className="inline-block mb-6 text-xs font-bold uppercase tracking-widest text-violet-400 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full">
                    Core Engineering Services.
                </span>
                <AnimatedShinyText 
                    text="Custom Software Development, Web & AI Agent Services" 
                    textClassName="text-2xl sm:text-4xl md:text-6xl"
                    className="mb-6"
                />
                <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                    Generic agency work wastes your budget. We build fast software, smart AI tools, and clear search systems that help your business grow every month.
                </p>
            </motion.div>

            <div className="w-full max-w-7xl mx-auto border-white/10 border rounded-[32px] overflow-hidden bg-[#050508]">
                {services.map((service, idx) => (
                    <motion.div
                        key={service.number}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: idx * 0.05 }}
                        className="group w-full border-white/10 border-b last:border-b-0 px-6 lg:px-12 py-12 flex flex-col lg:flex-row lg:items-center gap-8 hover:bg-[#ccff00]/[0.03] transition-all duration-500"
                    >
                        <span className="text-lg text-[#ccff00] font-mono font-bold w-12 shrink-0 group-hover:translate-x-1 transition-transform duration-300">
                            {service.number}.
                        </span>
                        <div className="lg:w-[380px] shrink-0">
                            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                                <Link to={service.href} className="hover:text-[#ccff00] group-hover:text-[#ccff00] transition-colors">
                                    {service.title}
                                </Link>
                            </h3>
                            <p className="text-sm text-zinc-400 font-mono mt-2">
                                {service.tagline}
                            </p>
                        </div>
                        <div className="flex-1 max-w-xl">
                            <p className="text-sm font-bold text-white mb-1 uppercase tracking-wider">
                                {service.fullTitle}
                            </p>
                            <p className="text-sm text-zinc-300 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                        <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
                            {service.tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 rounded-full text-[10px] font-bold text-white/80 bg-white/5 border border-white/10 group-hover:border-[#ccff00]/30 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="lg:ml-auto">
                            <Link to={service.href} aria-label={`Explore ${service.title} services`} className="inline-flex items-center justify-center px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-black bg-[#ccff00] hover:bg-white group-hover:scale-105 transition-all">
                                Explore →
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ServicesSection;


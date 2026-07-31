"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { AnimatedShinyText } from './ui/animated-shiny-text';
import { MagicText } from './ui/magic-text';
import { AnimatedBreathingText } from './ui/animated-breathing-text';

const techGroups = [
    {
        category: "Frontend & Web",
        items: [
            { name: "React.js", url: "https://react.dev" },
            { name: "Next.js", url: "https://nextjs.org" },
            { name: "Tailwind CSS", url: "https://tailwindcss.com" }
        ],
        icon: "⚛️"
    },
    {
        category: "Mobile App Development",
        items: [
            { name: "Flutter", url: "https://flutter.dev" },
            { name: "React Native", url: "https://reactnative.dev" }
        ],
        icon: "📱"
    },
    {
        category: "Backend & APIs",
        items: [
            { name: "Node.js", url: "https://nodejs.org" },
            { name: "Express", url: "https://expressjs.com" }
        ],
        icon: "🟢"
    },
    {
        category: "AI & Data Integration",
        items: [
            { name: "Python", url: "https://www.python.org" },
            { name: "LangChain", url: "https://www.langchain.com" },
            { name: "OpenAI Platform", url: "https://platform.openai.com/docs" }
        ],
        icon: "🐍"
    },
    {
        category: "Cloud & Database",
        items: [
            { name: "AWS Cloud", url: "https://aws.amazon.com/architecture" },
            { name: "Firebase", url: "https://firebase.google.com" },
            { name: "PostgreSQL", url: "https://www.postgresql.org" }
        ],
        icon: "☁️"
    }
];

const TechStackSection = () => {
    return (
        <section id="tech-stack" className="bg-[#0a0a0a] py-32 px-6 overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                {/* Header based on user-provided snippet style */}
                <div className="max-w-4xl flex flex-col gap-6 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400 mb-4 block">
                            Tech Stack
                        </span>
                        <AnimatedShinyText 
                            text="Modern Technologies We Use" 
                            textClassName="leading-tight md:text-8xl sm:text-5xl text-3xl text-white mb-2 font-bold tracking-tighter"
                            className="mb-8"
                        />
                    </motion.div>
                    
                    <MagicText 
                        text="We refuse to rely on outdated frameworks. We utilize a modern, battle-tested tech stack renowned for its speed, infinite scalability, and military-grade security."
                        className="md:text-3xl text-xl font-normal text-white/50 tracking-tight leading-snug max-w-2xl"
                    />
                </div>

                {/* Tech Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {techGroups.map((group, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * idx }}
                            className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all group"
                        >
                            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform origin-left">
                                {group.icon}
                            </div>
                            <AnimatedBreathingText text={group.category} className="text-xl font-bold text-white mb-4 uppercase tracking-wider block" />
                            <div className="flex flex-wrap gap-2">
                                {group.items.map((item, i) => (
                                    <a 
                                        key={i} 
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 transition-all"
                                    >
                                        <span>{item.name}</span>
                                        <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            
            {/* Ambient Background Decoration */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        </section>
    );
};

export default TechStackSection;

"use client";

import React from 'react';

const steps = [
    {
        num: "01",
        title: "Discovery & Planning",
        desc: "We meet with your team to learn your business goals, map out user needs, and write a clear technical plan.",
        label: "Step 1: Scope & Architecture."
    },
    {
        num: "02",
        title: "UI/UX Design Prototyping",
        desc: "We design clean Figma wireframes and clickable screens so you can see and test your product before we write code.",
        label: "Step 2: Interactive Wireframes."
    },
    {
        num: "03",
        title: "Clean Sprint Development",
        desc: "Our senior engineers write fast, modular code in two-week sprints. You get live staging links every week.",
        label: "Step 3: Agile Coding Sprints."
    },
    {
        num: "04",
        title: "Testing & Security QA",
        desc: "We test speed, mobile layout, and data safety across real devices so your launch goes smoothly.",
        label: "Step 4: Full Quality Checks."
    },
    {
        num: "05",
        title: "Launch & Code Handover",
        desc: "We deploy your live app, hand over 100% of your GitHub code, and stay ready to help you scale.",
        label: "Step 5: 99.9% Uptime & Handover."
    }
];

const ProcessSection = () => {
    return (
        <section id="development-process" className="bg-[#0a0a0c] py-24 px-6 border-y border-zinc-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-3 font-mono">
                        The Development Process.
                    </p>
                    <h2 className="text-3xl sm:text-5xl font-serif italic text-white mb-4">
                        Our 5-Step Agile Software &amp; Web Development Process
                    </h2>
                    <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-light">
                        We follow a simple five-step plan so you always know what we are building, when it ships, and what it costs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {steps.map((step) => (
                        <div key={step.num} className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 flex flex-col justify-between space-y-4">
                            <div className="space-y-3">
                                <span className="text-xs font-mono font-bold text-[#ccff00] block">{step.num} / 05.</span>
                                <h3 className="text-lg font-bold text-white tracking-tight">{step.title}</h3>
                                <p className="text-sm text-zinc-300 leading-relaxed font-light">{step.desc}</p>
                            </div>
                            <p className="text-[11px] font-mono text-zinc-400 pt-3 border-t border-white/10">{step.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;

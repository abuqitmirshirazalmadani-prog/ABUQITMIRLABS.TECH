"use client";

import React, { useState } from 'react';

export const faqItems = [
    {
        question: "What industries does AbuQitmirLabs specialize in?",
        answer: "We specialize in Fintech, E-commerce, Healthcare platforms, EdTech solutions, and SaaS applications. Our engineering team provides high-performance, secure, and scalable digital solutions tailor-made for high-stakes industries where data integrity and user trust are paramount."
    },
    {
        question: "How long does it take to develop a custom Minimum Viable Product (MVP)?",
        answer: "A standard startup MVP typically takes 8 to 12 weeks from scoping to production launch. Larger enterprise platforms with complex third-party integrations and compliance requirements generally span 3 to 6 months using iterative Agile sprints."
    },
    {
        question: "Why should businesses choose Jamstack and headless architectures over monolithic systems?",
        answer: "Decoupling the frontend presentation layer from the backend database provides sub-second load times, superior Core Web Vitals, enterprise-grade security against common attack vectors, and effortless traffic scaling without infrastructure bloat."
    },
    {
        question: "What makes autonomous AI agents different from traditional chatbots?",
        answer: "Traditional chatbots rely on static decision trees and pre-scripted answers. Autonomous AI agents utilize Large Language Models, Retrieval-Augmented Generation (RAG), and multi-tool execution pipelines to understand context, reason over private data, and execute complex multi-step workflows autonomously."
    },
    {
        question: "How does semantic entity SEO differ from standard keyword stuffing?",
        answer: "Semantic SEO focuses on entity relationships, schema graphs, topical authority, and search intent rather than repetitive keyword density. This ensures content ranks sustainably across Google AI Overviews, generative search engines, and traditional SERPs."
    },
    {
        question: "Does AbuQitmirLabs provide full IP ownership and source code handover?",
        answer: "Yes. Every client retains 100% intellectual property ownership, complete source code repositories, architectural blueprints, and deployment credentials upon milestone completion with zero vendor lock-in."
    },
    {
        question: "How much does custom software development cost in Pakistan?",
        answer: "Custom software development in Pakistan typically ranges between $5,000 and $25,000 for production-ready platforms, delivering 60% to 75% cost savings compared to US ($50,000–$150,000+) and UK agency equivalents. At AbuQitmirLabs, we uphold international engineering standards, zero-debt architecture, and strict code review protocols. For a granular breakdown tailored to your scope, explore our interactive Project Cost Estimator tool to calculate instant estimates."
    },
    {
        question: "Do you work with clients in the US and UK remotely?",
        answer: "Yes. Over 80% of our clients operate across the United States, United Kingdom, Canada, and Australia. We operate with dedicated timezone overlap (4–6 hours daily with EST/PST and full afternoon overlap with GMT/BST). Our distributed delivery workflow leverages Slack, GitHub, Jira, Loom asynchronous video walkthroughs, and weekly video strategy calls to maintain 100% transparency, rapid iteration sprints, and seamless communication across borders."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="bg-[#0a0a0a] py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-14 px-4">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif italic text-white mb-4">
                        Frequently Asked Questions About Custom Software &amp; AI Development
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-neutral-400 leading-relaxed font-light">
                        Clear answers to common questions regarding timelines, technologies, pricing, and project governance.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqItems.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        const id = `item-${idx}`;
                        return (
                            <div
                                key={idx}
                                className={`rounded-2xl border transition-all duration-300 ${
                                    isOpen
                                        ? 'border-[#ccff00]/40 bg-zinc-900/60'
                                        : 'border-white/10 bg-neutral-900/40 hover:bg-white/5'
                                }`}
                            >
                                <button
                                    id={`faq-btn-${id}`}
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-content-${id}`}
                                    className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
                                >
                                    <h3 className={`text-base sm:text-lg font-bold tracking-tight m-0 ${isOpen ? 'text-white' : 'text-neutral-200'}`}>
                                        {item.question}
                                    </h3>
                                    <span className="inline-flex items-center justify-center rounded-full bg-white/10 text-[#ccff00] h-7 w-7 shrink-0 font-mono text-sm font-bold">
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </button>
                                <div
                                    id={`faq-content-${id}`}
                                    role="region"
                                    aria-labelledby={`faq-btn-${id}`}
                                    className="px-6 pb-6 pt-0"
                                >
                                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;

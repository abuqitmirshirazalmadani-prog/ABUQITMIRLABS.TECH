"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { AnimatedShinyText } from './ui/animated-shiny-text';
import { MagicText } from './ui/magic-text';
import { AnimatedBreathingText } from './ui/animated-breathing-text';

export const faqItems = [
    {
        question: "What is AbuQitmirLabs and what do they do?",
        answer: "AbuQitmirLabs is a Karachi-based growth engineering firm and custom software development studio founded in 2021 by Abu Qitmir Mohammad Shiraz Al-Madani. We engineer connected B2B revenue systems by combining bespoke web and mobile software, autonomous RAG AI agents, and semantic technical SEO under one roof with 100% client IP ownership."
    },
    {
        question: "How much does custom software development cost in Pakistan?",
        answer: "Custom software development in Pakistan typically ranges between $5,000 and $25,000 for production-ready platforms, delivering 60% to 75% cost savings compared to US ($50,000–$150,000+) and UK agency equivalents. At AbuQitmirLabs, we uphold international engineering standards, zero-debt architecture, strict code reviews, and full source code transfer."
    },
    {
        question: "How long does it take to build a custom MVP?",
        answer: "A standard production-ready MVP (Minimum Viable Product) typically takes 4 to 8 weeks to architect, build, and deploy using agile sprint delivery, while complex enterprise platforms take 3 to 5 months. Focused AI platforms like TajweedPage.com were engineered and launched globally in just 10 days."
    },
    {
        question: "Do you work with international clients remotely?",
        answer: "Yes, over 80% of our clients operate across the United States, United Kingdom, Saudi Arabia, UAE, Canada, and Australia. Our Karachi engineering squads work with dedicated timezone overlap (4–6 hours daily with US EST/PST and full overlap with UK GMT and GCC AST) via Slack, GitHub, Jira, and weekly video demos."
    },
    {
        question: "What industries does AbuQitmirLabs specialize in?",
        answer: "AbuQitmirLabs specializes in Fintech, Healthcare, E-commerce, EdTech, Logistics, and B2B SaaS platforms. Our senior engineering team architects high-performance, compliance-ready digital systems aligned with HIPAA, SOC 2, GDPR, PCI-DSS, and Saudi PDPL standards where data integrity, low latency, and security are paramount."
    },
    {
        question: "Why should my business upgrade to Jamstack and Headless CMS?",
        answer: "Upgrading to Jamstack and headless CMS architecture decouples your frontend user experience from your backend database, eliminating slow monolithic bottlenecks and plugin vulnerabilities. This delivers sub-second page loads that pass Google Core Web Vitals, lowers bounce rates, and converts high-intent B2B visitors into qualified pipeline."
    },
    {
        question: "What is the exact difference between a standard chatbot and a Custom LLM AI Agent?",
        answer: "A standard chatbot follows rigid, rule-based decision trees and fails when users ask complex questions. A Custom LLM AI Agent uses Retrieval-Augmented Generation (RAG) and secure API tool-calling to reason over your proprietary databases, resolve 24/7 customer support, qualify CRM leads, and automate multi-step enterprise workflows autonomously."
    },
    {
        question: "How does Semantic Entity SEO differ from traditional keyword SEO?",
        answer: "Traditional SEO focuses on repeating exact-match keywords on isolated pages. Semantic Entity SEO structures your entire domain around verified Schema.org JSON-LD entity graphs, topical authority clusters, and Google Business Profile signals so Google Search, AI Overviews, ChatGPT, and Perplexity cite your brand as a trusted authority."
    },
    {
        question: "Does a conversion-focused brand identity actually improve ROI?",
        answer: "Yes, a conversion-focused brand identity directly improves B2B ROI by aligning visual hierarchy, accessible UI/UX systems, and technical copywriting around buyer trust. By removing friction across your landing pages, pitch decks, and product interfaces, a cohesive brand system increases qualified demo requests and lowers customer acquisition costs."
    },
    {
        question: "What is E-E-A-T compliant content, and why do I need it to rank?",
        answer: "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness—the core quality framework Google and AI answer engines use to evaluate content. We engineer E-E-A-T compliant technical articles, case studies, and service pages backed by real architectural benchmarks and senior engineer attribution so your site ranks durably."
    }
];

const FAQItem = ({ 
    question, 
    answer, 
    isOpen, 
    onClick,
    id
}: { 
    question: string, 
    answer: string, 
    isOpen: boolean, 
    onClick: () => void,
    id: string
}) => {
    return (
        <div 
            className={`rounded-3xl border transition-all duration-500 overflow-hidden ${
                isOpen 
                ? 'border-violet-500/30 bg-gradient-to-b from-violet-500/15 via-violet-500/10 to-transparent ring-1 ring-white/5' 
                : 'border-white/10 bg-neutral-900/40 hover:bg-white/5 ring-1 ring-white/5'
            }`}
        >
            <button 
                id={`faq-btn-${id}`}
                onClick={onClick}
                aria-expanded={isOpen}
                aria-controls={`faq-content-${id}`}
                className="w-full text-left px-6 sm:px-8 py-5 sm:py-6 flex items-start justify-between gap-6 transition-colors"
            >
                <h3 className={`text-lg sm:text-xl font-bold tracking-tight m-0 ${isOpen ? 'text-white' : 'text-neutral-300'}`}>
                    <AnimatedBreathingText text={question} className={isOpen ? 'text-white' : 'text-neutral-300'} />
                </h3>
                <span className="inline-flex items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10 text-white h-8 w-8 shrink-0 relative">
                    <motion.div
                        initial={false}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </motion.div>
                </span>
            </button>
            <div 
                id={`faq-content-${id}`}
                role="region"
                aria-labelledby={`faq-btn-${id}`}
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-3xl font-light">
                            {answer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="bg-[#0a0a0a] py-32 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <AnimatedShinyText 
                            text="Frequently Asked Questions: Software, AI & Web Development" 
                            textClassName="text-2xl sm:text-4xl md:text-5xl lg:text-6xl"
                            className="px-2 mb-8"
                        />
                        <MagicText 
                            text="Get instant answers to the most common questions about our high-performance technical solutions and strategic operations."
                            className="mt-6 max-w-2xl mx-auto text-lg text-neutral-400 leading-relaxed font-light"
                        />
                    </motion.div>
                </div>

                {/* FAQ List */}
                <div className="space-y-6">
                    {faqItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <FAQItem 
                                id={`item-${idx}`}
                                question={item.question}
                                answer={item.answer}
                                isOpen={openIndex === idx}
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;

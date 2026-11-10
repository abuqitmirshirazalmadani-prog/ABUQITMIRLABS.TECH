"use client";

import React, { useState } from 'react';

export const faqItems = [
    {
        question: "What is AbuQitmirLabs and what do they do?",
        answer: "AbuQitmirLabs is a custom software and growth engineering studio in Karachi, Pakistan. Abu Qitmir Mohammad Shiraz Al-Madani founded the firm in 2021. We build custom web apps, mobile apps, smart AI agents, and search growth systems. You get 100% ownership of your code from day one."
    },
    {
        question: "How much does custom software development cost in Pakistan?",
        answer: "Custom software in Pakistan usually costs between $5,000 and $25,000 for a full product. That saves you 60% to 75% compared to US or UK agencies that charge $50,000 to $150,000. We deliver clean code, strict testing, and full GitHub source handover."
    },
    {
        question: "How long does it take to build a custom MVP?",
        answer: "A standard MVP takes 4 to 8 weeks to design, code, test, and launch. Larger enterprise platforms take 3 to 5 months. Focused AI tools like TajweedPage.com were built and launched worldwide in just 10 days."
    },
    {
        question: "Do you work with international clients remotely?",
        answer: "Yes. Over 80% of our clients are in the US, UK, Saudi Arabia, UAE, Canada, and Australia. Our Karachi team works with 4 to 6 hours of daily overlap for US time zones and full overlap for UK and Gulf teams. We use Slack, GitHub, Jira, and weekly video calls."
    },
    {
        question: "What industries does AbuQitmirLabs specialize in?",
        answer: "We build software for Fintech, Healthcare, E-commerce, EdTech, Logistics, and B2B SaaS teams. Our senior engineers follow strict security standards like HIPAA, SOC 2, GDPR, PCI-DSS, and Saudi PDPL to keep your user data safe."
    },
    {
        question: "Why should my business upgrade to Jamstack and Headless CMS?",
        answer: "Jamstack and headless CMS setups separate your fast front-end website from your back-end database. Pages load in under one second and pass Google Core Web Vitals. Fast pages keep visitors on your site longer and turn more clicks into sales leads."
    },
    {
        question: "What is the exact difference between a standard chatbot and a Custom LLM AI Agent?",
        answer: "A basic chatbot follows fixed rules and gets stuck when buyers ask new questions. A custom AI agent uses private RAG search and secure API tools to read your company data. It answers complex support tickets, scores CRM leads, and runs workflows 24/7."
    },
    {
        question: "How does Semantic Entity SEO differ from traditional keyword SEO?",
        answer: "Old SEO just repeats keywords on single pages. Semantic SEO connects your whole website with clear Schema.org data graphs, topic hubs, and local business proof. That helps Google Search, AI Overviews, ChatGPT, and Perplexity cite your brand first."
    },
    {
        question: "Does a conversion-focused brand identity actually improve ROI?",
        answer: "Yes. A clear brand identity builds instant trust with B2B buyers. When your website, pitch deck, and product screens look sharp and read clearly, more visitors book sales calls and your cost per lead drops."
    },
    {
        question: "What is E-E-A-T compliant content, and why do I need it to rank?",
        answer: "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness. Google and AI search tools use these four signals to judge content quality. We write clear guides and case studies backed by real project data and senior engineer reviews so your pages rank higher."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="bg-[#0a0a0a] py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-14 px-4">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif italic text-white mb-4">
                        Frequently Asked Questions: Software, AI &amp; Web Development
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-neutral-400 leading-relaxed font-light">
                        Get clear answers to common questions about our software builds, pricing, timelines, and code ownership.
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

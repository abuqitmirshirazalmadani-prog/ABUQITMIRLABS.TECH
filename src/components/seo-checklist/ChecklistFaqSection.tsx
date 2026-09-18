import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ChecklistFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is SEO and why does it matter for my business?',
      a: 'SEO (Search Engine Optimization) is the practice of optimizing your website to earn high organic rankings in search engines like Google and Bing. It matters because over 53% of all trackable web traffic originates from organic search, generating high-intent visitors and qualified inbound leads without recurring ad spend.'
    },
    {
      q: 'How long does SEO take to generate measurable rankings and traffic?',
      a: 'SEO is a compounding growth strategy. Early indexation improvements and low-hanging keyword rankings typically appear within 60 to 90 days. Sustainable page 1 rankings, domain authority growth, and significant inbound lead volume generally mature within 4 to 9 months of consistent execution.'
    },
    {
      q: 'Is this SEO Checklist Generator truly 100% free?',
      a: 'Yes, completely free. There are no paywalls, hidden fees, or mandatory signup forms. You can generate unlimited personalized checklists across multiple business models and industries.'
    },
    {
      q: 'Do I need expensive paid SEO tools to execute this checklist?',
      a: 'No. Every task in the checklist includes recommended free alternatives such as Google Search Console, Google Analytics 4, Bing Webmaster Tools, PageSpeed Insights, and the AbuQitmirLabs Website Audit Tool.'
    },
    {
      q: 'Can agencies or freelancers use this checklist for client onboarding?',
      a: 'Absolutely. Many digital agencies and independent consultants use this generator to quickly audit new client websites, outline deliverable scopes, and download branded PDF roadmaps for stakeholder alignment.'
    },
    {
      q: 'What is the difference between SEO, GEO, AIO, AEO, and SXO?',
      a: 'SEO focuses on traditional search engine rankings. GEO (Generative Engine Optimization) and AIO (AI Optimization) optimize brand mentions and citations inside LLMs like Perplexity and ChatGPT. AEO (Answer Engine Optimization) targets featured snippets and voice search. SXO (Search Experience Optimization) blends SEO with UX and conversion optimization to turn visitors into paying customers.'
    },
    {
      q: 'How often should I review and update my SEO strategy?',
      a: 'We recommend reviewing keyword performance and Core Web Vitals monthly, while conducting comprehensive technical audits and topical content refreshes every quarter to adapt to Google algorithm updates.'
    },
    {
      q: 'Can I download the completed or in-progress checklist as a PDF?',
      a: 'Yes. Simply click the "Download PDF Checklist" button. The system generates a formatted, multi-page PDF document including your progress stats, strategic priorities, and complete phase breakdowns with checkboxes.'
    },
    {
      q: 'Is this checklist genuinely tailored to my specific industry?',
      a: 'Yes. The engine dynamically personalizes recommendations based on your business type (e-commerce, SaaS, local clinic, service agency) and industry vertical (healthcare, fintech, retail, legal) to ensure you only focus on the ranking factors that matter for your niche.'
    },
    {
      q: 'How does AbuQitmirLabs assist with technical SEO execution?',
      a: 'AbuQitmirLabs provides full-lifecycle engineering services, from enterprise Core Web Vitals optimization and Schema.org architecture to local citation networks, Generative Engine Optimization, and custom software development.'
    }
  ];

  return (
    <section className="py-16 border-t border-white/5 bg-neutral-950/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[#ccff00] text-xs font-bold uppercase tracking-widest mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto mt-2">
            Everything you need to know about search ranking factors, timeline expectations, and tool execution.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-neutral-900/60 border border-white/10 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <h3 className="text-sm sm:text-base font-bold text-white pr-2">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#ccff00]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-neutral-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 pt-8 border-t border-white/5 text-xs text-neutral-400">
          <span>Still have questions about your website's search performance? </span>
          <Link to="/contact" className="text-[#ccff00] font-bold hover:underline">
            Speak with an AbuQitmirLabs SEO Engineer →
          </Link>
        </div>
      </div>
    </section>
  );
};

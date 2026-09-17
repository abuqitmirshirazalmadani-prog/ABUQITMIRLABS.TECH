import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    q: 'Is this website audit tool really free?',
    a: 'Yes, 100% free. No credit card, no registration, and no hidden subscriptions. You can audit your website and your clients’ or competitors’ websites with unlimited scans.'
  },
  {
    q: 'Do I need to sign up or create an account?',
    a: 'No signup is required whatsoever. Enter any public website URL, and the live audit begins immediately.'
  },
  {
    q: 'How accurate is the audit report?',
    a: 'Our auditing engine integrates the Google PageSpeed Insights API combined with our proprietary DOM & Network Inspector. Metrics follow the latest 2026 Google Lighthouse standards and official Core Web Vitals specifications.'
  },
  {
    q: 'How long does a full website audit take?',
    a: 'Audits typically complete in 15 to 35 seconds. For complex enterprise portals with heavy dynamic scripts, it may take up to 45 seconds while all network and security headers are validated.'
  },
  {
    q: 'Can I audit a competitor’s website?',
    a: 'Yes. You can test any publicly accessible URL on the internet. This is one of the most effective strategies to benchmark your speed, Core Web Vitals, and technical SEO against market competitors.'
  },
  {
    q: 'What is considered a good website audit score?',
    a: 'A score above 90 is considered exceptional (Grade A+ / A) and meets Google’s top ranking tier. Scores between 75 and 89 are good with room for quick optimization gains. Scores below 70 indicate critical bottlenecks that actively harm conversion rates and search rankings.'
  },
  {
    q: 'Do you store or track my website data?',
    a: 'No. We respect privacy and follow a strict zero-retention policy. Audit reports are generated on-demand in real-time and discarded after your session completes.'
  },
  {
    q: 'Can I download the audit report as an executive PDF?',
    a: 'Yes! After your audit completes, click "Download PDF Report" to receive a clean, professionally formatted executive PDF summary including all scores, Core Web Vitals, and actionable fixes.'
  },
  {
    q: 'What are Google Core Web Vitals?',
    a: 'Core Web Vitals are Google’s official user experience signals that directly influence organic rankings. They measure Largest Contentful Paint (LCP for loading speed), Cumulative Layout Shift (CLS for visual stability), and Interaction to Next Paint (INP for responsiveness).'
  },
  {
    q: 'How do I fix the technical issues identified in my audit?',
    a: 'You can implement the engineering fixes yourself using the step-by-step AI recommendations. Alternatively, AbuQitmirLabs offers turnkey speed optimization, Core Web Vitals remediation, and full custom software engineering retainers with guaranteed 90+ Lighthouse score benchmarks.'
  }
];

export const AuditFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181818] border border-[#333] text-gray-400 text-xs font-mono mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-[#ccff00]" /> Common Questions
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Everything you need to know about our free website audit tool and Google Core Web Vitals.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="bg-[#0e0e0e] border border-[#222] hover:border-[#333] rounded-xl overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-white text-sm md:text-base select-none hover:text-[#ccff00] transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-gray-500 shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-[#ccff00]" /> : <ChevronDown className="w-5 h-5" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs md:text-sm text-gray-400 leading-relaxed border-t border-[#1a1a1a] pt-3">
                  {faq.a}
                  {idx === 9 && (
                    <div className="mt-3">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1 text-[#ccff00] hover:underline font-mono text-xs font-semibold"
                      >
                        Request professional remediation quote from AbuQitmirLabs →
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

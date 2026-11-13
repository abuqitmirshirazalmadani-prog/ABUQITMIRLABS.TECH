import React, { useState } from 'react';
import {
  ChevronDown,
  BookOpen,
  ShieldCheck,
  HelpCircle,
  Cpu,
  UserCheck,
  Activity,
  Smartphone,
  Calculator,
  Lock,
  AlertTriangle,
  Scale,
} from 'lucide-react';

interface MethodologyTopic {
  id: string;
  title: string;
  summary: string;
  details: string;
  icon: React.ComponentType<{ className?: string }>;
}

const METHODOLOGY_TOPICS: MethodologyTopic[] = [
  {
    id: 'automated-checks',
    title: 'Automated checks',
    summary: '38 deterministic HTTP, HTML DOM, security header, and structured data checks.',
    details:
      'Our engine fetches the target URL over a guarded server connection (with SSRF DNS validation, max 5 redirect hops, 8-second timeout, and 1.5 MB response stream limit). It deterministically inspects HTTP status codes, TLS encryption, HSTS/CSP/X-Frame/X-Content-Type/Referrer-Policy headers, title and meta description tags, canonical URLs, H1–H3 hierarchy, image alt attributes and dimensions, JSON-LD schema blocks, and above-the-fold conversion architecture.',
    icon: Cpu,
  },
  {
    id: 'manual-checks',
    title: 'Manual checks',
    summary: 'Items flagged as "Manual review required" where human verification is necessary.',
    details:
      'Certain criteria cannot be 100% confirmed by static HTML parsing alone—such as WCAG color contrast across dynamic CSS states, full keyboard focus-trap behavior inside custom modals, end-to-end multi-step checkout/lead form submission, or subjective copy clarity. Whenever a check requires human inspection, our tool explicitly sets Confidence to "Manual review required" rather than guessing.',
    icon: UserCheck,
  },
  {
    id: 'lab-vs-field',
    title: 'Lab data versus real-user field data',
    summary: 'Clear separation between Chrome User Experience Report (CrUX) and Lighthouse lab runs.',
    details:
      'Real-user field data comes from Google’s Chrome User Experience Report (CrUX) 28-day rolling 75th percentile of actual Chrome visitors. Lighthouse lab data is collected in a controlled, simulated environment. Low-traffic or newly launched pages often do not have public CrUX field data; in those cases, we explicitly report field data as "Data unavailable" and display lab or live HTTP response timing separately.',
    icon: Activity,
  },
  {
    id: 'device-network-profile',
    title: 'Test device and network profile',
    summary: 'Configurable Mobile, Desktop, or Dual-Device evaluation.',
    details:
      'When Google PageSpeed Insights telemetry is reachable, Mobile lab runs simulate a mid-tier Moto G Power device on a throttled 4G connection, while Desktop runs simulate a wired broadband desktop viewport. Simultaneously, our deterministic DOM & HTTP inspector measures live unthrottled server TTFB and response headers directly.',
    icon: Smartphone,
  },
  {
    id: 'score-methodology',
    title: 'Score methodology',
    summary: 'Six transparent dimension scores (0–100) weighted by severity.',
    details:
      'Instead of an opaque single number, every audit computes six transparent scores: Crawlability, SEO, Performance, Accessibility, Security and Trust, and Conversion Readiness. Within each dimension, confirmed checks are weighted by severity (Critical = 3x, High = 2x, Medium = 1.25x, Low = 0.75x). Checks marked "Data unavailable" are excluded from the denominator so missing external telemetry never unfairly penalizes your score.',
    icon: Calculator,
  },
  {
    id: 'data-retention',
    title: 'Data retention',
    summary: 'Ephemeral in-memory processing—no silent URL or email storage.',
    details:
      'Submitted URLs are processed ephemerally in memory to generate your diagnostic report. We do not persist or sell your audited URLs, HTML payloads, or contact details in a marketing database without your explicit consent when submitting a consultation request.',
    icon: Lock,
  },
  {
    id: 'limitations',
    title: 'Limitations',
    summary: 'Single-page or sampled mini-site scope, WAF blocks, and client-side SPA hydration.',
    details:
      'Quick Page Audit inspects the exact URL entered; Mini Site Audit additionally samples /robots.txt, /sitemap.xml, and up to 2 internal pages. Sites protected by aggressive Cloudflare/WAF bot challenges or heavy client-only JavaScript rendering may restrict raw HTML extraction—when that happens, affected checks explicitly state: "Not enough data to confirm this issue. Manual review recommended."',
    icon: AlertTriangle,
  },
  {
    id: 'no-ranking-guarantee',
    title: 'No Google ranking guarantee',
    summary: 'Technical health and Core Web Vitals support visibility but never guarantee #1 rankings.',
    details:
      'Core Web Vitals are important user-experience signals used by Google’s ranking systems. They are not a ranking guarantee. Search rankings depend on hundreds of signals including query intent, content originality, topical authority, backlinks, and competitor quality. Similarly, automated accessibility checks identify potential barriers but do not replace manual testing or legal advice.',
    icon: Scale,
  },
];

const FAQS = [
  {
    question: 'How does this website audit program work for founders and small businesses?',
    answer:
      'Our website audit program runs a live URL audit across 6 pillars: Crawlability, Technical SEO, Core Web Vitals performance, Accessibility, Security headers, and B2B Conversion Readiness. You get an instant prioritized Fix Today and Fix This Week engineering roadmap with PDF and CSV exports.',
  },
  {
    question: 'What does the live URL audit check during a technical SEO audit?',
    answer:
      'The live URL audit inspects HTTP 200 status codes, redirect chains, canonical tags, title and meta description length, H1 to H3 heading structure, JSON-LD schema markup, CrUX field metrics, Lighthouse lab speed, and TLS security headers.',
  },
  {
    question: 'Do you offer a hands-on website auditing service and engineering implementation?',
    answer:
      'Yes. After running this automated diagnostic, founders can share the exported PDF or CSV report with the AbuQitmirLabs engineering team for a comprehensive website auditing service and direct code implementation.',
  },
  {
    question: 'Does passing Core Web Vitals guarantee higher Google rankings?',
    answer:
      'No. Core Web Vitals are important user-experience signals used by Google’s ranking systems. They are not a ranking guarantee. Fixing slow LCP, INP, or CLS reduces visitor bounce rates and supports technical eligibility, but sustainable search growth also requires strong search-intent alignment, original proof, and clean information architecture.',
  },
  {
    question: 'Does this automated accessibility audit certify ADA or WCAG legal compliance?',
    answer:
      'No. Automated accessibility checks identify potential barriers but do not replace manual testing or legal advice. Automated parsers can deterministically catch missing image alt text, missing form labels, missing HTML lang attributes, and missing semantic landmarks, but full WCAG 2.1 AA conformance requires manual keyboard navigation and screen-reader testing.',
  },
  {
    question: 'How many audit checks are actually executed?',
    answer:
      'Every audit executes and reports the exact number of deterministic checks run (36 checks in Quick Page mode, and 38 checks in Mini Site or Complete Growth mode when robots.txt and sitemap.xml are inspected). You can see the exact count and data source breakdown at the top of your report.',
  },
  {
    question: 'Does the AI invent issues or guess metrics when data is missing?',
    answer:
      'Never. All findings are produced by deterministic HTTP, HTML DOM, CrUX field, and Lighthouse lab checks first. If a metric cannot be verified, the tool outputs "Not enough data to confirm this issue. Manual review recommended." AI is strictly restricted to summarizing confirmed evidence.',
  },
];

export const AuditFaqSection: React.FC = () => {
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(true);
  const [openTopicId, setOpenTopicId] = useState<string | null>('automated-checks');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="how-this-audit-works-heading"
      className="py-12 space-y-10"
    >
      {/* Expandable "How this audit works" Accordion (Requirement 20) */}
      <div className="bg-[#0d0d0d] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <button
          type="button"
          onClick={() => setIsMethodologyOpen((prev) => !prev)}
          aria-expanded={isMethodologyOpen}
          aria-controls="how-audit-works-panel"
          className="w-full p-6 md:p-8 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
        >
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#CCFF00]">
              <BookOpen className="w-4 h-4" />
              Transparent Engineering Methodology
            </div>
            <h2
              id="how-this-audit-works-heading"
              className="text-2xl md:text-3xl font-bold text-white"
            >
              How this audit works
            </h2>
            <p className="text-xs md:text-sm text-gray-400">
              Inspect our automated checks, manual review boundaries, field vs. lab data separation, scoring weights, privacy policy, and limitations.
            </p>
          </div>
          <ChevronDown
            className={`w-6 h-6 text-[#CCFF00] shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
              isMethodologyOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isMethodologyOpen && (
          <div
            id="how-audit-works-panel"
            className="px-6 pb-8 md:px-8 border-t border-white/10 pt-6 space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {METHODOLOGY_TOPICS.map((topic) => {
                const Icon = topic.icon;
                const isOpen = openTopicId === topic.id;
                return (
                  <div
                    key={topic.id}
                    className="rounded-2xl bg-black/60 border border-white/10 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenTopicId((prev) => (prev === topic.id ? null : topic.id))
                      }
                      aria-expanded={isOpen}
                      className="w-full p-4 flex items-start justify-between gap-3 text-left hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-[#2667FF]/15 border border-[#2667FF]/30 text-[#CCFF00] mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white">{topic.title}</h3>
                          <p className="text-xs text-gray-400 mt-0.5">{topic.summary}</p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 shrink-0 mt-1 transition-transform ${
                          isOpen ? 'rotate-180 text-[#CCFF00]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-2 border-t border-white/5 text-xs text-gray-300 leading-relaxed">
                        {topic.details}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#CCFF00]">
            <HelpCircle className="w-4 h-4" />
            Audit Accuracy &amp; Governance FAQs
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white">
            Common Questions About Website Growth Audits
          </h3>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-black/50 border border-white/10 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full p-4 md:p-5 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
                >
                  <span className="text-sm md:text-base font-bold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#CCFF00] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 md:px-5 pt-1 text-xs md:text-sm text-gray-300 leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs font-mono text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            SSRF-protected auditor • Blocks localhost, private IPv4/IPv6 ranges, and cloud metadata endpoints.
          </span>
        </div>
      </div>
    </section>
  );
};

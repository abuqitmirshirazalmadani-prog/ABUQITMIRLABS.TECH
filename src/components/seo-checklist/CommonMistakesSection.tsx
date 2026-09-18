import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const CommonMistakesSection: React.FC = () => {
  const mistakes = [
    {
      title: 'Keyword Stuffing in Meta & Headings',
      desc: 'Repeating identical search queries creates spam flags in Google helpful content classifiers.',
      fix: 'Use semantic variations, synonyms, and natural conversational phrasing.'
    },
    {
      title: 'Duplicate Content & Missing Canonical Tags',
      desc: 'Trailing slashes, HTTP vs HTTPS, and URL parameters cause internal page cannibalization.',
      fix: 'Enforce self-referencing rel="canonical" tags on all indexable URLs.'
    },
    {
      title: 'Missing or Generic Meta Descriptions',
      desc: 'Search engines display arbitrary body text, causing poor CTR and lost rankings.',
      fix: 'Craft tailored descriptions between 130 and 155 characters with a compelling call-to-action.'
    },
    {
      title: 'Ignoring Core Web Vitals & Mobile TTFB',
      desc: 'Slow Largest Contentful Paint (LCP > 2.5s) directly reduces mobile ranking positions.',
      fix: 'Serve WebP imagery, enable edge caching, and defer third-party analytics tags.'
    },
    {
      title: 'Isolated Content Without Internal Linking',
      desc: 'Publishing blog articles without links to money pages wastes crawl budget and PageRank.',
      fix: 'Link every educational piece to at least 2 relevant commercial service pages.'
    },
    {
      title: 'Forgetting Mobile-First Viewport Optimization',
      desc: 'Google crawls and evaluates websites using mobile smartphone user agents exclusively.',
      fix: 'Ensure minimum 44px touch targets and responsive typography scaling.'
    },
    {
      title: 'Skipping E-E-A-T Author & Publisher Proof',
      desc: 'Anonymous content is systematically downranked in health, finance, tech, and legal verticals.',
      fix: 'Include author bios, verified LinkedIn profiles, and Organization schema markup.'
    }
  ];

  return (
    <section className="py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-rose-400 text-xs font-bold uppercase tracking-widest block mb-2">
            Avoid Costly Errors
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Top 7 Common SEO Mistakes to Avoid
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto mt-2">
            These structural errors drain crawl budget and suppress rankings even on well-designed sites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mistakes.map((m, idx) => (
            <div key={idx} className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <h3 className="text-sm font-bold text-white">{m.title}</h3>
              </div>
              <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                {m.desc}
              </p>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-xs text-emerald-300 flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong>How to fix:</strong> {m.fix}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

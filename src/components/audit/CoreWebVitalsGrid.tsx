import React from 'react';
import { CoreWebVitals } from '../../types/audit';
import { getCwvStatus, getCwvLabel } from '../../utils/auditEngine';

interface CoreWebVitalsGridProps {
  cwv: CoreWebVitals;
}

export const CoreWebVitalsGrid: React.FC<CoreWebVitalsGridProps> = ({ cwv }) => {
  const metrics: Array<{
    key: keyof CoreWebVitals;
    acronym: string;
    name: string;
    value: string;
    target: string;
    description: string;
  }> = [
    {
      key: 'lcp',
      acronym: 'LCP',
      name: 'Largest Contentful Paint',
      value: `${cwv.lcp}s`,
      target: '≤ 2.5s',
      description: 'Measures perceived loading speed. Marks point when main content has loaded.'
    },
    {
      key: 'cls',
      acronym: 'CLS',
      name: 'Cumulative Layout Shift',
      value: `${cwv.cls}`,
      target: '≤ 0.10',
      description: 'Measures visual stability. Prevents annoying unexpected layout jumps.'
    },
    {
      key: 'inp',
      acronym: 'INP',
      name: 'Interaction to Next Paint',
      value: `${cwv.inp}ms`,
      target: '≤ 200ms',
      description: 'Google’s primary interactivity metric measuring UI response latency to user taps.'
    },
    {
      key: 'fcp',
      acronym: 'FCP',
      name: 'First Contentful Paint',
      value: `${cwv.fcp}s`,
      target: '≤ 1.8s',
      description: 'Time until browser renders first DOM piece (text, image, or non-white canvas).'
    },
    {
      key: 'ttfb',
      acronym: 'TTFB',
      name: 'Time to First Byte',
      value: `${cwv.ttfb}ms`,
      target: '≤ 800ms',
      description: 'Server responsiveness & network speed before initial byte reaches client.'
    },
    {
      key: 'speedIndex',
      acronym: 'SI',
      name: 'Speed Index',
      value: `${cwv.speedIndex}s`,
      target: '≤ 3.4s',
      description: 'Shows how quickly the contents of a page are visibly populated.'
    }
  ];

  return (
    <div className="bg-[#0c0c0c] border border-[#222] rounded-2xl p-6 md:p-8 space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1f1f1f] pb-4">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Google Core Web Vitals (2026 Standards)</span>
          </h3>
          <p className="text-xs md:text-sm text-gray-400">
            Real-world UX ranking metrics used directly by Google Search algorithm.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Good
          </span>
          <span className="flex items-center gap-1 text-amber-400 ml-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span> Needs Work
          </span>
          <span className="flex items-center gap-1 text-rose-400 ml-2">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span> Poor
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        {metrics.map((m) => {
          const numVal = typeof cwv[m.key] === 'number' ? cwv[m.key] : parseFloat(String(cwv[m.key]));
          const status = getCwvStatus(m.key, numVal);
          const label = getCwvLabel(m.key, numVal);

          const badgeClasses = {
            'good': 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40',
            'needs-improvement': 'bg-amber-950/40 text-amber-400 border-amber-500/40',
            'poor': 'bg-rose-950/40 text-rose-400 border-rose-500/40'
          }[status];

          const valueClasses = {
            'good': 'text-emerald-400',
            'needs-improvement': 'text-amber-400',
            'poor': 'text-rose-400'
          }[status];

          return (
            <div
              key={m.acronym}
              className="bg-[#121212] border border-[#262626] rounded-xl p-4 flex flex-col justify-between hover:border-[#383838] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-base text-white">{m.acronym}</span>
                  <span className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded-md border ${badgeClasses}`}>
                    {label}
                  </span>
                </div>

                <div className="text-xs font-medium text-gray-300 mb-2">{m.name}</div>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-4">{m.description}</p>
              </div>

              <div className="pt-2 border-t border-[#202020] flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-mono">Value: </span>
                  <span className={`text-xl font-mono font-bold ${valueClasses}`}>{m.value}</span>
                </div>
                <div className="text-[11px] text-gray-400 font-mono">
                  Target: {m.target}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { SeoChecklist } from '../../types/seoChecklist';
import { INDUSTRY_LABELS } from '../../utils/seoChecklistGenerator';
import { Target, TrendingUp, AlertTriangle, Zap, Bot } from 'lucide-react';

interface AIInsightsProps {
  checklist: SeoChecklist;
}

export const AIInsights: React.FC<AIInsightsProps> = ({ checklist }) => {
  const indLabel = INDUSTRY_LABELS[checklist.industry]?.label || checklist.industry;

  return (
    <div className="bg-neutral-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl mb-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00]">
          <Bot className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">
            AI Strategic Insights for Your Business
          </h3>
          <p className="text-xs text-neutral-400">
            Algorithmic priority signals computed for {indLabel}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top 3 Priorities */}
        <div className="bg-black/50 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-[#ccff00]" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Top 3 Strategic Priorities
            </h4>
          </div>
          <ol className="space-y-3 text-xs text-neutral-300">
            {checklist.topPriorities.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#ccff00]/10 text-[#ccff00] font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <strong className="text-white block">{item.title}</strong>
                  <span className="text-neutral-400 leading-relaxed">{item.reason}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Expected Impact */}
        <div className="bg-black/50 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Expected Ranking & Revenue Impact
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
            {checklist.expectedImpact}
          </p>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-xs text-emerald-300">
            💡 <strong>Pro Tip:</strong> Businesses that execute foundational Core Web Vitals and Schema structured data within the first 30 days see 2.4x faster indexing compared to baseline.
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="bg-black/50 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Common {indLabel} SEO Pitfalls
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-neutral-300">
            {checklist.commonMistakes.map((mistake, idx) => (
              <li key={idx} className="flex items-start gap-2 text-neutral-400">
                <span className="text-rose-400 font-bold shrink-0">✕</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Wins */}
        <div className="bg-black/50 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-[#ccff00]" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              High-Velocity Quick Wins (Do Today)
            </h4>
          </div>
          <ul className="space-y-2.5 text-xs text-neutral-300">
            {checklist.quickWins.map((win, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#ccff00] font-bold shrink-0">⚡</span>
                <span className="text-neutral-200">{win}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

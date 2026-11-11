import React from 'react';
import { Sparkles, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { AiRecommendation } from '../../types/audit';

interface AiRecommendationsSectionProps {
  recommendations: AiRecommendation[];
}

export const AiRecommendationsSection: React.FC<AiRecommendationsSectionProps> = ({
  recommendations,
}) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="deterministic-recommendations-heading"
      className="bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#CCFF00] mb-1">
            <Sparkles className="w-4 h-4" />
            Grounded Remediation Synthesis
          </div>
          <h3
            id="deterministic-recommendations-heading"
            className="text-xl font-bold text-white"
          >
            Highest-Leverage Engineering &amp; CRO Synthesis
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Every recommendation below explains structured evidence returned by deterministic checks only. AI is strictly prevented from inventing unverified issues.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-300 self-start md:self-auto">
          <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
          100% Evidence-Bound
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, index) => (
          <div
            key={`${rec.title}-${index}`}
            className="p-5 rounded-2xl bg-black/60 border border-white/10 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#2667FF]/20 border border-[#2667FF]/40 text-xs font-mono text-[#CCFF00]">
                  {rec.category || 'Growth Remediation'}
                </span>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" />+{rec.scoreGain} pts potential
                  </span>
                  <span className="text-gray-400">• {rec.difficulty}</span>
                </div>
              </div>

              <h4 className="text-base font-bold text-white">{rec.title}</h4>
              <p className="text-xs text-gray-300 leading-relaxed">{rec.description}</p>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-gray-400">
              <span className="inline-flex items-center gap-1.5 text-gray-300">
                <Clock className="w-3.5 h-3.5 text-[#CCFF00]" />
                Estimated window: {rec.timeToFix}
              </span>
              {rec.basedOnCheckIds && rec.basedOnCheckIds.length > 0 && (
                <span className="text-[11px] text-gray-500">
                  Source checks: {rec.basedOnCheckIds.join(', ')}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

import React from 'react';
import { Sparkles, Clock, Target, TrendingUp } from 'lucide-react';
import { AiRecommendation } from '../../types/audit';

interface AiRecommendationsSectionProps {
  recommendations: AiRecommendation[];
}

export const AiRecommendationsSection: React.FC<AiRecommendationsSectionProps> = ({ recommendations }) => {
  return (
    <div className="bg-gradient-to-b from-[#11180a] to-[#0a0a0a] border border-[#ccff00]/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#243314] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ccff00]/15 border border-[#ccff00]/40 text-[#ccff00] text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> AI Executive Roadmap
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Top 5 Highest-Impact Engineering Fixes
          </h3>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Executing these five optimizations will drive the fastest Lighthouse score recovery and search ranking gains.
          </p>
        </div>

        <div className="text-xs font-mono text-[#ccff00] bg-[#162208] px-3 py-1.5 rounded-lg border border-[#ccff00]/30 self-start sm:self-auto">
          Cumulative Potential: +{recommendations.reduce((acc, r) => acc + (r.scoreGain || 0), 0)} Points
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {recommendations.map((rec, idx) => {
          const difficultyColor = {
            'Easy': 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20',
            'Moderate': 'text-amber-400 border-amber-500/30 bg-amber-950/20',
            'Advanced': 'text-rose-400 border-rose-500/30 bg-rose-950/20'
          }[rec.difficulty] || 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20';

          return (
            <div
              key={idx}
              className="bg-[#12160d] border border-[#233116] hover:border-[#ccff00]/50 rounded-xl p-5 transition-all group relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#ccff00] text-black font-extrabold text-sm flex items-center justify-center font-mono shrink-0 shadow-md">
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-bold text-white group-hover:text-[#ccff00] transition-colors">
                      {rec.title}
                    </h4>
                    {rec.category && (
                      <span className="text-[11px] font-mono text-gray-400 uppercase">
                        {rec.category} Architecture
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] font-mono font-bold text-xs">
                    <TrendingUp className="w-3.5 h-3.5" /> +{rec.scoreGain} Pts Gain
                  </span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-gray-300 leading-relaxed pl-0 sm:pl-11 mb-3">
                {rec.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pl-0 sm:pl-11 text-xs font-mono text-gray-400 pt-2 border-t border-[#1e2b13]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  Estimated Time: <strong className="text-gray-200">{rec.timeToFix}</strong>
                </span>
                <span className="text-gray-600">•</span>
                <span className="flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-gray-400" />
                  Complexity:
                  <span className={`px-2 py-0.5 rounded text-[10px] border ${difficultyColor}`}>
                    {rec.difficulty}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { CheckCircle2, AlertCircle, HelpCircle, SlidersHorizontal } from 'lucide-react';
import {
  AuditResult,
  FilterCategory,
  ScoreDimensionDetail,
} from '../../types/audit';

interface CategoryScoresGridProps {
  result: AuditResult;
  activeCategory: FilterCategory;
  onSelectCategory: (category: FilterCategory) => void;
}

const mapDimensionToFilterCategory = (
  id: ScoreDimensionDetail['id']
): FilterCategory => {
  switch (id) {
    case 'crawlability':
    case 'seo':
      return 'SEO';
    case 'performance':
      return 'Performance';
    case 'accessibility':
      return 'Accessibility';
    case 'securityAndTrust':
      return 'Security';
    case 'conversionReadiness':
      return 'Conversion';
    default:
      return 'all';
  }
};

export const CategoryScoresGrid: React.FC<CategoryScoresGridProps> = ({
  result,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section aria-label="Score methodology and category filter breakdown" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#CCFF00]" />
            Click Any Growth Dimension to Filter Findings
          </h3>
          <p className="text-xs text-gray-400">
            Showing transparent scoring formulas and exact check counts per dimension.
          </p>
        </div>
        {activeCategory !== 'all' && (
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className="self-start sm:self-auto text-xs font-mono text-[#CCFF00] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] rounded px-2 py-1"
          >
            Reset category filter ({activeCategory})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {result.scoreDetails.map((dim) => {
          const targetCategory = mapDimensionToFilterCategory(dim.id);
          const isSelected = activeCategory === targetCategory;

          return (
            <button
              key={dim.id}
              type="button"
              onClick={() =>
                onSelectCategory(isSelected ? 'all' : targetCategory)
              }
              aria-pressed={isSelected}
              className={`text-left p-4 rounded-2xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] ${
                isSelected
                  ? 'bg-[#2667FF]/20 border-[#CCFF00] shadow-lg shadow-[#CCFF00]/10'
                  : 'bg-[#0d0d0d] border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-bold text-white truncate">
                  {dim.label}
                </span>
                <span className="text-lg font-black text-[#CCFF00]">
                  {dim.score}
                </span>
              </div>
              <div className="text-[10px] font-mono text-gray-400 mb-2 truncate" title={dim.weightFormula}>
                {dim.weightFormula}
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-white/10">
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" /> {dim.passedChecks}
                </span>
                <span className="inline-flex items-center gap-1 text-rose-400">
                  <AlertCircle className="w-3 h-3" /> {dim.failedChecks}
                </span>
                <span className="inline-flex items-center gap-1 text-gray-400">
                  <HelpCircle className="w-3 h-3" /> {dim.manualOrUnavailableChecks}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

import React from 'react';
import { SeoChecklist } from '../../types/seoChecklist';
import {
  BUSINESS_TYPE_LABELS,
  INDUSTRY_LABELS,
  STAGE_LABELS,
  GOAL_LABELS
} from '../../utils/seoChecklistGenerator';
import { Edit2, Calendar, Target, CheckCircle2 } from 'lucide-react';

interface SummaryCardProps {
  checklist: SeoChecklist;
  onEdit: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ checklist, onEdit }) => {
  const bLabel = BUSINESS_TYPE_LABELS[checklist.businessType]?.label || checklist.businessType;
  const iLabel = INDUSTRY_LABELS[checklist.industry]?.label || checklist.industry;
  const sLabel = STAGE_LABELS[checklist.stage]?.label || checklist.stage;
  const gLabel = GOAL_LABELS[checklist.goal]?.label || checklist.goal;

  return (
    <div className="bg-neutral-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[#ccff00] text-xs font-bold uppercase tracking-wider block mb-1">
            Active Strategy Roadmap
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Your Personalized SEO Checklist
          </h3>
        </div>
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-lg border border-white/10 transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>Edit Answers</span>
        </button>
      </div>

      {/* Meta Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-white/10 text-xs">
        <div>
          <span className="text-neutral-400 block mb-1">Business Model</span>
          <span className="font-bold text-white text-sm">{bLabel}</span>
        </div>
        <div>
          <span className="text-neutral-400 block mb-1">Target Industry</span>
          <span className="font-bold text-white text-sm">{iLabel}</span>
        </div>
        <div>
          <span className="text-neutral-400 block mb-1">Growth Stage</span>
          <span className="font-bold text-white text-sm">{sLabel}</span>
        </div>
        <div>
          <span className="text-neutral-400 block mb-1">Primary Goal</span>
          <span className="font-bold text-[#ccff00] text-sm">{gLabel}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
        <div className="bg-black/50 border border-white/10 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{checklist.totalTasks}</div>
            <div className="text-xs text-neutral-400">Total Actionable Tasks</div>
          </div>
        </div>

        <div className="bg-black/50 border border-white/10 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{checklist.estimatedWeeks} Weeks</div>
            <div className="text-xs text-neutral-400">Estimated Roadmap Duration</div>
          </div>
        </div>

        <div className="bg-black/50 border border-white/10 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{checklist.priorityTasks}</div>
            <div className="text-xs text-neutral-400">Critical High-Priority Tasks</div>
          </div>
        </div>
      </div>
    </div>
  );
};

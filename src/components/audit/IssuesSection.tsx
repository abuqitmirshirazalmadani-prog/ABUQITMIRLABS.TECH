import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { AuditIssue, IssuePriority } from '../../types/audit';

interface IssuesSectionProps {
  issues: AuditIssue[];
}

export const IssuesSection: React.FC<IssuesSectionProps> = ({ issues }) => {
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const priorities: Array<{ id: IssuePriority; label: string; icon: any; color: string; bg: string }> = [
    { id: 'critical', label: 'Critical (Fix Now)', icon: AlertCircle, color: '#ef4444', bg: 'bg-rose-950/30 border-rose-500/30 text-rose-400' },
    { id: 'high', label: 'High (Fix This Week)', icon: AlertTriangle, color: '#f97316', bg: 'bg-orange-950/30 border-orange-500/30 text-orange-400' },
    { id: 'medium', label: 'Medium (Fix This Month)', icon: Info, color: '#eab308', bg: 'bg-amber-950/30 border-amber-500/30 text-amber-400' },
    { id: 'low', label: 'Low (Nice To Have)', icon: CheckCircle2, color: '#22c55e', bg: 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400' }
  ];

  const filteredIssues = filterPriority === 'all'
    ? issues
    : issues.filter(i => i.priority === filterPriority);

  return (
    <div className="bg-[#0d0d0d] border border-[#222] rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1f1f1f] pb-4">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Detected Issues & Warnings</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#222] text-[#ccff00] font-mono">
              {issues.length}
            </span>
          </h3>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Prioritized engineering audit items ordered by immediate revenue and SEO impact.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 bg-[#141414] p-1 rounded-xl border border-[#262626]">
          <button
            type="button"
            onClick={() => setFilterPriority('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              filterPriority === 'all'
                ? 'bg-[#2a2a2a] text-[#ccff00] font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All ({issues.length})
          </button>
          {priorities.map((p) => {
            const count = issues.filter(i => i.priority === p.id).length;
            if (count === 0) return null;

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setFilterPriority(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1 ${
                  filterPriority === p.id
                    ? 'bg-[#2a2a2a] text-white font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></span>
                <span className="capitalize">{p.id}</span>
                <span className="text-[10px] text-gray-500">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Issues List */}
      {filteredIssues.length === 0 ? (
        <div className="text-center py-10 bg-[#121212] rounded-xl border border-[#222]">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
          <div className="text-base font-semibold text-white">No Issues in this Category!</div>
          <div className="text-xs text-gray-400 mt-1">This website passes all automated checks in this priority tier.</div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredIssues.map((issue, idx) => {
            const isExpanded = expandedIndex === idx;
            const priorityMeta = priorities.find(p => p.id === issue.priority) || priorities[2];
            const Icon = priorityMeta.icon;

            return (
              <div
                key={idx}
                className="bg-[#121212] border border-[#222] hover:border-[#333] rounded-xl p-4 transition-all"
              >
                <div
                  className="flex items-start justify-between gap-3 cursor-pointer select-none"
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      <Icon className="w-4 h-4" style={{ color: priorityMeta.color }} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${priorityMeta.bg}`}>
                          {issue.priority}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c1c] text-gray-300 border border-[#2b2b2b]">
                          {issue.category}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          Impact: <strong className="text-gray-300">{issue.impact}</strong>
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          Effort: <strong className="text-gray-300">{issue.effort}</strong>
                        </span>
                      </div>

                      <h4 className="text-sm md:text-base font-semibold text-white">
                        {issue.title}
                      </h4>
                    </div>
                  </div>

                  <button className="text-gray-500 hover:text-gray-300 p-1 shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[#1f1f1f] space-y-2 text-xs md:text-sm text-gray-300 pl-7">
                    <p className="leading-relaxed text-gray-400">
                      {issue.description}
                    </p>

                    {issue.suggestedFix && (
                      <div className="bg-[#181818] border border-[#2a2a2a] p-3 rounded-lg mt-2 text-xs">
                        <span className="font-mono text-[#ccff00] font-semibold block mb-1">💡 Recommended Solution:</span>
                        <span className="text-gray-200">{issue.suggestedFix}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

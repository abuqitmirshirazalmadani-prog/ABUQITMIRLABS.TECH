import React from 'react';
import { ChecklistPhase as PhaseType } from '../../types/seoChecklist';
import { ChevronDown, Clock, BarChart2, Wrench, Check } from 'lucide-react';

interface ChecklistPhaseProps {
  phase: PhaseType;
  isOpen: boolean;
  onToggle: () => void;
  completedTasks: Record<string, boolean>;
  onToggleTask: (taskId: string) => void;
}

export const ChecklistPhase: React.FC<ChecklistPhaseProps> = ({
  phase,
  isOpen,
  onToggle,
  completedTasks,
  onToggleTask
}) => {
  const completedCount = phase.tasks.filter((t) => completedTasks[t.id]).length;
  const isAllDone = completedCount === phase.tasks.length && phase.tasks.length > 0;

  return (
    <div className="bg-neutral-900/80 border border-white/10 rounded-2xl overflow-hidden mb-4 transition-all duration-200">
      {/* Header Button */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors cursor-pointer"
      >
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl shrink-0">
            {phase.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-white">{phase.title}</h3>
              <span className="text-[11px] font-semibold text-[#ccff00] bg-[#ccff00]/10 px-2 py-0.5 rounded-md">
                {phase.timeframe}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1 max-w-2xl">{phase.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                isAllDone
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-white/5 text-neutral-300 border border-white/10'
              }`}
            >
              {completedCount} / {phase.tasks.length}
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-white' : ''
            }`}
          />
        </div>
      </button>

      {/* Expanded Content */}
      {isOpen && (
        <div className="px-5 pb-6 sm:px-6 divide-y divide-white/5 border-t border-white/5">
          {phase.tasks.map((task) => {
            const isCompleted = completedTasks[task.id] || false;
            return (
              <div
                key={task.id}
                className={`py-4 sm:py-5 flex items-start gap-4 transition-all duration-150 ${
                  isCompleted ? 'opacity-65' : ''
                }`}
              >
                {/* Custom Checkbox */}
                <button
                  type="button"
                  onClick={() => onToggleTask(task.id)}
                  aria-label={`Mark task ${task.title} as ${isCompleted ? 'incomplete' : 'completed'}`}
                  className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-[#ccff00] border-[#ccff00] text-black shadow-sm'
                      : 'bg-black/40 border-white/20 hover:border-[#ccff00] text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </button>

                {/* Task Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                    <h4
                      className={`text-sm sm:text-base font-bold text-white transition-all ${
                        isCompleted ? 'line-through text-neutral-400' : ''
                      }`}
                    >
                      {task.title}
                    </h4>

                    {/* Priority Badge */}
                    <div className="shrink-0">
                      {task.priority === 'high' && (
                        <span className="inline-flex items-center text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">
                          🔴 High Priority
                        </span>
                      )}
                      {task.priority === 'medium' && (
                        <span className="inline-flex items-center text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                          🟠 Medium Priority
                        </span>
                      )}
                      {task.priority === 'low' && (
                        <span className="inline-flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                          🟢 Low Priority
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-3">
                    {task.description}
                  </p>

                  {/* Task Meta */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                      <span>{task.estimatedTime}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <BarChart2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>Impact: <strong>{task.impact}</strong></span>
                    </span>
                  </div>

                  {/* How to Guide details */}
                  <details className="group text-xs bg-black/40 border border-white/5 rounded-xl p-3.5 transition-colors open:border-white/15">
                    <summary className="font-semibold text-[#ccff00] cursor-pointer hover:underline list-none flex items-center justify-between">
                      <span>How to execute this task →</span>
                      <span className="text-neutral-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="pt-3 text-neutral-300 space-y-2 border-t border-white/5 mt-2.5">
                      <p className="leading-relaxed">{task.howTo}</p>
                      {task.tools && task.tools.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[11px] text-neutral-400">
                          <Wrench className="w-3 h-3 text-[#ccff00]" />
                          <strong className="text-neutral-300">Recommended Tools:</strong>
                          {task.tools.map((tool, idx) => (
                            <span
                              key={idx}
                              className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-neutral-200"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

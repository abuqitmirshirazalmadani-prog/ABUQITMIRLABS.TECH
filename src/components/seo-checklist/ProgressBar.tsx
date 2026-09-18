import React from 'react';
import { CheckCheck, Save, RotateCcw } from 'lucide-react';

interface ProgressBarProps {
  completedCount: number;
  totalTasks: number;
  onResetProgress: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  completedCount,
  totalTasks,
  onResetProgress
}) => {
  const percent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="bg-neutral-900/90 border border-white/10 rounded-2xl p-6 backdrop-blur-xl mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CheckCheck className="w-5 h-5 text-[#ccff00]" />
          <h4 className="text-base font-bold text-white">Your Execution Progress</h4>
        </div>
        <div className="flex items-center gap-3">
          {completedCount > 0 && (
            <button
              onClick={onResetProgress}
              title="Reset progress"
              className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
          <span className="text-lg font-black text-[#ccff00]">{percent}%</span>
        </div>
      </div>

      {/* Large progress bar */}
      <div className="w-full bg-black/60 rounded-full h-4 p-0.5 overflow-hidden border border-white/10 relative">
        <div
          className="bg-gradient-to-r from-[#ccff00] via-emerald-400 to-[#ccff00] h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.max(percent, 2)}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-neutral-400 mt-3">
        <span>
          <strong>{completedCount}</strong> of <strong>{totalTasks}</strong> tasks completed
        </span>
        <span className="flex items-center gap-1 text-neutral-400">
          <Save className="w-3 h-3 text-[#ccff00]" />
          <span>Auto-saved to browser</span>
        </span>
      </div>
    </div>
  );
};

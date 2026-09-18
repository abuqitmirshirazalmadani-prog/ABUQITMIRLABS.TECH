import React, { useEffect, useState } from 'react';
import { Sparkles, Check } from 'lucide-react';
import { Industry } from '../../types/seoChecklist';
import { INDUSTRY_LABELS } from '../../utils/seoChecklistGenerator';

interface LoadingStateProps {
  industry: Industry;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ industry }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(15);

  const steps = [
    'Analyzing business model and competitive landscape',
    `Building specialized SEO strategy for ${INDUSTRY_LABELS[industry]?.label || industry}`,
    'Structuring 45+ actionable phase tasks',
    'Adding AI insights, Core Web Vitals & E-E-A-T recommendations',
    'Finalizing roadmap & interactive action plan'
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => { setStep(1); setProgress(35); }, 600);
    const timer2 = setTimeout(() => { setStep(2); setProgress(60); }, 1300);
    const timer3 = setTimeout(() => { setStep(3); setProgress(85); }, 2100);
    const timer4 = setTimeout(() => { setStep(4); setProgress(98); }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="py-16 px-4">
      <div className="max-w-lg mx-auto bg-neutral-900 border border-white/10 rounded-2xl p-8 text-center shadow-2xl backdrop-blur-xl">
        <div className="w-12 h-12 rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center mx-auto mb-6 text-[#ccff00] animate-bounce">
          <Sparkles className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2">
          Generating Your Custom SEO Action Plan
        </h3>
        <p className="text-xs text-neutral-400 mb-6">
          Synthesizing search ranking signals for {INDUSTRY_LABELS[industry]?.label || industry}...
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-black/60 rounded-full h-2.5 mb-6 overflow-hidden border border-white/10">
          <div
            className="bg-gradient-to-r from-[#ccff00] to-emerald-400 h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Sequential Steps */}
        <div className="space-y-3 text-left">
          {steps.map((text, idx) => {
            const isDone = step > idx;
            const isCurrent = step === idx;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3 text-xs transition-opacity duration-300 ${
                  isDone
                    ? 'text-white font-medium'
                    : isCurrent
                    ? 'text-[#ccff00] font-bold'
                    : 'text-neutral-500 opacity-50'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                    isDone
                      ? 'bg-emerald-500 text-black'
                      : isCurrent
                      ? 'border border-[#ccff00] text-[#ccff00] animate-spin'
                      : 'border border-neutral-700 text-neutral-600'
                  }`}
                >
                  {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : '•'}
                </div>
                <span className="truncate">{text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

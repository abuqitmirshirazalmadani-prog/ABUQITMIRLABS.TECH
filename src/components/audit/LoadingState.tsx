import React, { useEffect, useState } from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface LoadingStateProps {
  url: string;
}

const STEPS = [
  'Resolving domain & establishing TLS connection...',
  'Fetching HTML DOM & calculating Server Response (TTFB)...',
  'Executing Google Lighthouse Core Web Vitals checks...',
  'Evaluating SEO tags, canonical URLs & heading structure...',
  'Scanning image alt attributes & WCAG accessibility standards...',
  'Inspecting security headers (HSTS, CSP, X-Frame-Options)...',
  'Synthesizing AI engineering recommendations...'
];

export const LoadingState: React.FC<LoadingStateProps> = ({ url }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 2800);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 92) return 92;
        return prev + Math.floor(Math.random() * 5) + 3;
      });
    }, 450);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="w-full bg-[#0d0d0d] border border-[#222] rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Radar Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#ccff00]/30 animate-ping"></div>
          <div className="absolute inset-2 rounded-full border border-[#ccff00]/50 animate-pulse"></div>
          <div className="w-12 h-12 rounded-full bg-[#162208] border border-[#ccff00] flex items-center justify-center text-[#ccff00]">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
          Deep Auditing <span className="text-[#ccff00] font-mono break-all">{url}</span>
        </h3>
        <p className="text-gray-400 text-sm mb-6">
          Gathering live telemetry, Core Web Vitals, and security headers. This takes ~15–30 seconds.
        </p>

        {/* Progress bar */}
        <div className="w-full bg-[#1f1f1f] rounded-full h-3 mb-8 overflow-hidden p-0.5 border border-[#333]">
          <div
            className="bg-gradient-to-r from-[#99cc00] to-[#ccff00] h-full rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(204,255,0,0.5)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Dynamic step ticker */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-5 text-left space-y-3">
          {STEPS.map((step, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={step}
                className={`flex items-center gap-3 text-xs md:text-sm transition-opacity duration-300 ${
                  isDone
                    ? 'text-gray-400'
                    : isCurrent
                    ? 'text-[#ccff00] font-medium'
                    : 'text-gray-600'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-[#ccff00] animate-spin shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-700 shrink-0" />
                )}
                <span className="truncate">{step}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

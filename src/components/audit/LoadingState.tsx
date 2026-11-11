import React, { useEffect, useState } from 'react';
import {
  Globe,
  FileCode2,
  Heading,
  Gauge,
  Accessibility,
  ShieldCheck,
  MousePointerClick,
  Sparkles,
  CheckCircle2,
  Loader2,
  Circle,
} from 'lucide-react';
import { AuditMode, AuditObjective, DeviceSelection } from '../../types/audit';

interface LoadingStateProps {
  url: string;
  mode?: AuditMode;
  objective?: AuditObjective;
  deviceSelection?: DeviceSelection;
}

interface ProgressStep {
  id: string;
  label: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PROGRESS_STEPS: ProgressStep[] = [
  {
    id: 'url-accessibility',
    label: 'URL accessibility',
    detail: 'Validating public IP/DNS safety, HTTPS TLS status, and HTTP redirect hops.',
    icon: Globe,
  },
  {
    id: 'html-extraction',
    label: 'HTML extraction',
    detail: 'Streaming document payload (max 1.5 MB) and measuring raw TTFB & compression.',
    icon: FileCode2,
  },
  {
    id: 'metadata-headings',
    label: 'Metadata and heading checks',
    detail: 'Inspecting title, meta description, canonical tag, H1–H3 hierarchy, and JSON-LD.',
    icon: Heading,
  },
  {
    id: 'core-web-vitals',
    label: 'Core Web Vitals',
    detail: 'Querying CrUX real-user field telemetry and Google Lighthouse lab metrics.',
    icon: Gauge,
  },
  {
    id: 'accessibility-checks',
    label: 'Accessibility checks',
    detail: 'Evaluating HTML lang, semantic landmarks, image alt attributes, and form labels.',
    icon: Accessibility,
  },
  {
    id: 'security-headers',
    label: 'Security headers',
    detail: 'Checking HSTS, Content-Security-Policy, X-Frame-Options, and mixed content.',
    icon: ShieldCheck,
  },
  {
    id: 'conversion-architecture',
    label: 'Conversion architecture',
    detail: 'Detecting primary CTAs, friction in lead forms, direct contact paths, and trust proof.',
    icon: MousePointerClick,
  },
  {
    id: 'recommendation-generation',
    label: 'Recommendation generation',
    detail: 'Compiling deterministic evidence into prioritized Fix Today / Fix This Week actions.',
    icon: Sparkles,
  },
];

export const LoadingState: React.FC<LoadingStateProps> = ({
  url,
  mode = 'complete',
  objective = 'complete',
  deviceSelection = 'both',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev < PROGRESS_STEPS.length - 1 ? prev + 1 : prev));
    }, 950);
    return () => window.clearInterval(interval);
  }, []);

  const progressPercentage = Math.min(
    96,
    Math.round(((activeIndex + 1) / PROGRESS_STEPS.length) * 100)
  );

  return (
    <section
      aria-live="polite"
      aria-busy="true"
      className="py-10 px-4 max-w-4xl mx-auto"
    >
      <div className="bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
        {/* Top status header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#CCFF00] mb-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin motion-reduce:animate-none" />
              Running Deterministic Website Growth Audit
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white break-all">
              Inspecting <span className="text-[#CCFF00] font-mono">{url}</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-300">
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
              Mode: {mode}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
              Focus: {objective}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
              Device: {deviceSelection}
            </span>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
            <span>
              Step {activeIndex + 1} of {PROGRESS_STEPS.length}:{' '}
              <strong className="text-white">{PROGRESS_STEPS[activeIndex].label}</strong>
            </span>
            <span className="text-[#CCFF00] font-bold">{progressPercentage}%</span>
          </div>
          <div
            className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10"
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Audit execution progress"
          >
            <div
              className="h-full bg-gradient-to-r from-[#2667FF] to-[#CCFF00] transition-all duration-500 motion-reduce:transition-none"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* 8-Step Animated Audit Progress Stepper */}
        <ol className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3" aria-label="Audit progress steps">
          {PROGRESS_STEPS.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = index < activeIndex;
            const isCurrent = index === activeIndex;

            return (
              <li
                key={step.id}
                className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all duration-300 motion-reduce:transition-none ${
                  isCurrent
                    ? 'bg-[#2667FF]/15 border-[#2667FF] shadow-lg shadow-[#2667FF]/10'
                    : isCompleted
                    ? 'bg-emerald-500/5 border-emerald-500/30'
                    : 'bg-black/40 border-white/10 opacity-60'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2
                      className="w-5 h-5 text-emerald-400"
                      aria-label="Completed"
                    />
                  ) : isCurrent ? (
                    <Loader2
                      className="w-5 h-5 text-[#CCFF00] animate-spin motion-reduce:animate-none"
                      aria-label="In progress"
                    />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-600" aria-label="Pending" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-sm font-bold ${
                        isCurrent
                          ? 'text-white'
                          : isCompleted
                          ? 'text-emerald-300'
                          : 'text-gray-400'
                      }`}
                    >
                      {index + 1}. {step.label}
                    </span>
                    <StepIcon
                      className={`w-4 h-4 shrink-0 ${
                        isCurrent
                          ? 'text-[#CCFF00]'
                          : isCompleted
                          ? 'text-emerald-400/80'
                          : 'text-gray-600'
                      }`}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-6 text-center text-xs text-gray-400 font-mono">
          Every finding is verified against live HTTP headers, HTML DOM nodes, or Google PageSpeed telemetry. Zero fabricated findings.
        </p>
      </div>
    </section>
  );
};

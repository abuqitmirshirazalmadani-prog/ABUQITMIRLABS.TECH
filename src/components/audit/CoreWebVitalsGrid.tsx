import React, { useState } from 'react';
import {
  Gauge,
  Users,
  FlaskConical,
  Info,
  Smartphone,
  Monitor,
  AlertCircle,
} from 'lucide-react';
import { CoreWebVitals, FieldDataSummary, LabDataSummary } from '../../types/audit';

interface CoreWebVitalsGridProps {
  cwv: CoreWebVitals;
  fieldData?: FieldDataSummary;
  labData?: LabDataSummary;
}

interface MetricThreshold {
  key: keyof CoreWebVitals;
  label: string;
  acronym: string;
  unit: string;
  goodMax: number;
  needsImprovementMax: number;
  description: string;
}

const METRIC_THRESHOLDS: MetricThreshold[] = [
  {
    key: 'lcp',
    label: 'Largest Contentful Paint',
    acronym: 'LCP',
    unit: 's',
    goodMax: 2.5,
    needsImprovementMax: 4.0,
    description: 'Measures loading speed of the largest visible hero element in the viewport.',
  },
  {
    key: 'inp',
    label: 'Interaction to Next Paint',
    acronym: 'INP',
    unit: 'ms',
    goodMax: 200,
    needsImprovementMax: 500,
    description: 'Measures main-thread responsiveness when visitors click, tap, or type.',
  },
  {
    key: 'cls',
    label: 'Cumulative Layout Shift',
    acronym: 'CLS',
    unit: '',
    goodMax: 0.1,
    needsImprovementMax: 0.25,
    description: 'Measures unexpected visual layout shifts that cause mis-clicks during page load.',
  },
  {
    key: 'fcp',
    label: 'First Contentful Paint',
    acronym: 'FCP',
    unit: 's',
    goodMax: 1.8,
    needsImprovementMax: 3.0,
    description: 'Time until the browser renders the first piece of DOM content.',
  },
  {
    key: 'ttfb',
    label: 'Time to First Byte',
    acronym: 'TTFB',
    unit: 'ms',
    goodMax: 800,
    needsImprovementMax: 1800,
    description: 'Server responsiveness and network latency before HTML streaming begins.',
  },
  {
    key: 'speedIndex',
    label: 'Speed Index',
    acronym: 'SI',
    unit: 's',
    goodMax: 3.4,
    needsImprovementMax: 5.8,
    description: 'How quickly visible content populates the viewport during page load.',
  },
];

const evaluateMetricStatus = (
  val: number | null | undefined,
  goodMax: number,
  needsImprovementMax: number
) => {
  if (val === null || val === undefined || Number.isNaN(val)) {
    return {
      label: 'Data unavailable',
      color: 'text-gray-400',
      badge: 'bg-white/5 text-gray-400 border-white/10',
    };
  }
  if (val <= goodMax) {
    return {
      label: 'Good',
      color: 'text-emerald-400',
      badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    };
  }
  if (val <= needsImprovementMax) {
    return {
      label: 'Needs Improvement',
      color: 'text-amber-400',
      badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    };
  }
  return {
    label: 'Poor',
    color: 'text-rose-400',
    badge: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
  };
};

export const CoreWebVitalsGrid: React.FC<CoreWebVitalsGridProps> = ({
  cwv,
  fieldData,
  labData,
}) => {
  const [activeTab, setActiveTab] = useState<'field' | 'lab-mobile' | 'lab-desktop'>(
    fieldData?.available ? 'field' : 'lab-mobile'
  );

  const activeLabVitals: CoreWebVitals =
    activeTab === 'lab-desktop' && labData?.desktop
      ? labData.desktop
      : labData?.mobile || cwv;

  return (
    <section
      aria-labelledby="cwv-heading"
      className="bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6"
    >
      {/* Header + Data Source Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#CCFF00] mb-1">
            <Gauge className="w-4 h-4" />
            Separated Field Telemetry vs. Lab Simulation
          </div>
          <h3 id="cwv-heading" className="text-xl font-bold text-white">
            Core Web Vitals & Performance Telemetry
          </h3>
        </div>

        {/* Toggle between Real-User Field Data (CrUX) and Lighthouse Lab Data */}
        <div
          role="tablist"
          aria-label="Core Web Vitals data source"
          className="inline-flex flex-wrap gap-2 bg-black p-1.5 rounded-2xl border border-white/10"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'field'}
            onClick={() => setActiveTab('field')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] ${
              activeTab === 'field'
                ? 'bg-[#2667FF] text-white font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Real-User Field Data (CrUX)
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'lab-mobile'}
            onClick={() => setActiveTab('lab-mobile')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] ${
              activeTab === 'lab-mobile'
                ? 'bg-[#2667FF] text-white font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Lighthouse Lab (Mobile)
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'lab-desktop'}
            onClick={() => setActiveTab('lab-desktop')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] ${
              activeTab === 'lab-desktop'
                ? 'bg-[#2667FF] text-white font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Lighthouse Lab (Desktop)
          </button>
        </div>
      </div>

      {/* Active Data Source Panel */}
      {activeTab === 'field' ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-2xl bg-black/50 border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
              <Users className="w-4 h-4 text-[#CCFF00]" />
              <span>Source: {fieldData?.sourceLabel || 'Chrome User Experience Report (CrUX)'}</span>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#CCFF00]">
              Status: {fieldData?.overallCategory || 'UNAVAILABLE'}
            </span>
          </div>

          {!fieldData?.available ? (
            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/25 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">
                  Not enough data to confirm this issue. Manual review recommended.
                </p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {fieldData?.note ||
                    'Chrome User Experience Report (CrUX) real-user field telemetry is unavailable for this URL because it has not yet accumulated sufficient public Chrome traffic volume. Switch to the Lighthouse Lab tab to inspect simulated or live HTTP timing.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: 'LCP (75th %)', val: fieldData.lcpSeconds, unit: 's', good: 2.5, warn: 4.0 },
                { label: 'INP (75th %)', val: fieldData.inpMs, unit: 'ms', good: 200, warn: 500 },
                { label: 'CLS (75th %)', val: fieldData.clsScore, unit: '', good: 0.1, warn: 0.25 },
                { label: 'FCP (75th %)', val: fieldData.fcpSeconds, unit: 's', good: 1.8, warn: 3.0 },
                { label: 'TTFB (75th %)', val: fieldData.ttfbMs, unit: 'ms', good: 800, warn: 1800 },
              ].map((item) => {
                const status = evaluateMetricStatus(item.val, item.good, item.warn);
                return (
                  <div
                    key={item.label}
                    className="p-4 rounded-2xl bg-black/50 border border-white/10 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono text-gray-400">{item.label}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-mono rounded border ${status.badge}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className={`text-2xl font-black ${status.color}`}>
                      {item.val !== null && item.val !== undefined
                        ? `${item.val}${item.unit}`
                        : 'Unavailable'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-2xl bg-black/50 border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
              <FlaskConical className="w-4 h-4 text-[#CCFF00]" />
              <span>
                {labData?.sourceLabel || 'Lighthouse Lab Data'} (
                {activeTab === 'lab-desktop' ? 'Desktop Profile' : 'Mobile Profile'})
              </span>
            </div>
            <span className="text-xs text-gray-400 font-mono">
              {labData?.note}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {METRIC_THRESHOLDS.map((m) => {
              const rawVal = activeLabVitals?.[m.key] ?? null;
              const status = evaluateMetricStatus(rawVal, m.goodMax, m.needsImprovementMax);

              return (
                <div
                  key={m.key}
                  className="p-5 rounded-2xl bg-black/50 border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-[#CCFF00]">
                        {m.acronym} • {m.label}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-mono rounded border ${status.badge}`}>
                        {status.label}
                      </span>
                    </div>

                    {rawVal !== null && rawVal !== undefined ? (
                      <div className={`text-3xl font-black my-2 ${status.color}`}>
                        {rawVal}
                        <span className="text-sm font-mono text-gray-400 ml-1">{m.unit}</span>
                      </div>
                    ) : (
                      <div className="my-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-300">
                        Not enough data to confirm this issue. Manual review recommended.
                      </div>
                    )}

                    <p className="text-xs text-gray-400 leading-relaxed">
                      {m.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
                    <span>Good: ≤ {m.goodMax}{m.unit}</span>
                    <span>Poor: &gt; {m.needsImprovementMax}{m.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Required Truthful Core Web Vitals Notice (Requirement 21) */}
      <div className="p-4 rounded-2xl bg-[#2667FF]/10 border border-[#2667FF]/30 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
        <p className="text-xs text-gray-200 leading-relaxed">
          Core Web Vitals are important user-experience signals used by Google’s ranking systems. They are not a ranking guarantee.
        </p>
      </div>
    </section>
  );
};

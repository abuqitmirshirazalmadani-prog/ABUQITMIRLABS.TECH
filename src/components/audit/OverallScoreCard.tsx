import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Database,
  Globe,
  Clock,
  FileSearch,
} from 'lucide-react';
import { AuditResult } from '../../types/audit';

interface OverallScoreCardProps {
  result: AuditResult;
}

const getScoreBadgeStyle = (score: number) => {
  if (score >= 90) {
    return {
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      bar: 'bg-emerald-400',
      status: 'Healthy',
    };
  }
  if (score >= 70) {
    return {
      text: 'text-[#CCFF00]',
      border: 'border-[#CCFF00]/30',
      bg: 'bg-[#CCFF00]/10',
      bar: 'bg-[#CCFF00]',
      status: 'Needs Optimization',
    };
  }
  if (score >= 50) {
    return {
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      bar: 'bg-amber-400',
      status: 'High Friction',
    };
  }
  return {
    text: 'text-rose-400',
    border: 'border-rose-500/30',
    bg: 'bg-rose-500/10',
    bar: 'bg-rose-500',
    status: 'Critical Blockers',
  };
};

export const OverallScoreCard: React.FC<OverallScoreCardProps> = ({ result }) => {
  const isUrdu = result.advanced?.reportLanguage === 'ur';
  const m = result.inspectedMetrics;
  const checks = result.checksSummary;

  return (
    <div className="bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-8">
      {/* Header row with audited URL, timestamp, mode, and transparent check count */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2667FF]/15 border border-[#2667FF]/40 text-xs font-mono text-[#CCFF00]">
              <ShieldCheck className="w-3.5 h-3.5" />
              {checks.totalExecuted} Deterministic Checks Executed
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
              Mode: {result.mode === 'quick' ? 'Quick Page Audit' : result.mode === 'mini-site' ? 'Mini Site Audit' : 'Complete Growth Audit'}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
              Device: {result.deviceSelection.toUpperCase()}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-white break-all">
            {isUrdu ? 'آڈٹ شدہ ویب سائٹ:' : 'Audited Target:'}{' '}
            <a
              href={result.finalUrl || result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#CCFF00] hover:underline font-mono"
            >
              {result.finalUrl || result.url}
            </a>
          </h2>
          <p className="text-xs text-gray-400 font-mono">
            Engine: {result.engine} • Analyzed at {new Date(result.analyzedAt).toLocaleString()}
          </p>
        </div>

        {/* Summary pill counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-center">
            <div className="text-lg font-black text-emerald-400">{checks.confirmedPassed}</div>
            <div className="text-[11px] font-mono text-emerald-200/80">Passed Checks</div>
          </div>
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-center">
            <div className="text-lg font-black text-rose-400">{checks.confirmedOrLikelyIssues}</div>
            <div className="text-[11px] font-mono text-rose-200/80">Confirmed/Likely Issues</div>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-center">
            <div className="text-lg font-black text-amber-400">{checks.manualReviewRequired}</div>
            <div className="text-[11px] font-mono text-amber-200/80">Manual Review</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="text-lg font-black text-gray-300">{checks.dataUnavailable}</div>
            <div className="text-[11px] font-mono text-gray-400">Data Unavailable</div>
          </div>
        </div>
      </div>

      {/* Six Transparent Dimension Scores Grid (Never show an unexplained single score only) */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#CCFF00]">
              {isUrdu
                ? 'چھ شفاف آڈٹ اسکورز (Six Transparent Growth Scores)'
                : 'Six Transparent Growth Scores (Weighted by Verified Checks)'}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Each dimension is scored independently (0–100) from deterministic checks. Checks with unavailable data are excluded from penalty calculations.
            </p>
          </div>
          <div className="text-xs font-mono text-gray-400">
            Composite Reference Index: <strong className="text-white">{result.overallScore}/100 ({result.grade})</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.scoreDetails.map((dim) => {
            const style = getScoreBadgeStyle(dim.score);
            return (
              <div
                key={dim.id}
                className={`rounded-2xl p-5 border ${style.border} ${style.bg} flex flex-col justify-between transition-all`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {isUrdu ? `${dim.label} (${dim.labelUr})` : dim.label}
                      </h4>
                      <span className="text-[11px] font-mono text-gray-300">
                        {style.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className={`text-3xl font-black tracking-tight ${style.text}`}>
                        {dim.score}
                      </span>
                      <span className="text-xs font-mono text-gray-400">/100</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden my-3">
                    <div
                      className={`h-full ${style.bar}`}
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed mb-3">
                    {dim.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-gray-300">
                  <span className="inline-flex items-center gap-1 text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {dim.passedChecks} passed
                  </span>
                  <span className="inline-flex items-center gap-1 text-rose-300">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {dim.failedChecks} issues
                  </span>
                  {dim.manualOrUnavailableChecks > 0 && (
                    <span className="inline-flex items-center gap-1 text-gray-400">
                      <HelpCircle className="w-3.5 h-3.5" />
                      {dim.manualOrUnavailableChecks} unverified
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Separated Data Source Breakdown + Live HTTP/DOM Telemetry Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
        {/* Data Types Separation Card */}
        <div className="rounded-2xl bg-black/50 border border-white/10 p-5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#CCFF00] mb-3">
            <Database className="w-4 h-4" />
            Separated Audit Data Sources ({checks.totalExecuted} Total Checks)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {(
              [
                ['Real-user field data', checks.byDataType['Real-user field data'] || 0, 'CrUX 28-day field p75'],
                ['Lighthouse lab data', checks.byDataType['Lighthouse lab data'] || 0, 'Simulated throttling'],
                ['HTML/static checks', checks.byDataType['HTML/static checks'] || 0, 'Live HTTP & DOM parser'],
                ['Heuristic conversion checks', checks.byDataType['Heuristic conversion checks'] || 0, 'CTA, form & trust patterns'],
                ['Manual review items', checks.byDataType['Manual review items'] || 0, 'Human verification needed'],
              ] as const
            ).map(([label, count, desc]) => (
              <div
                key={label}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5"
              >
                <div>
                  <div className="font-semibold text-white">{label}</div>
                  <div className="text-[11px] text-gray-400">{desc}</div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-[#2667FF]/20 border border-[#2667FF]/40 font-mono font-bold text-[#CCFF00]">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live HTTP & Mini-Site Crawl Summary */}
        <div className="rounded-2xl bg-black/50 border border-white/10 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#CCFF00] mb-3">
              <FileSearch className="w-4 h-4" />
              Live HTTP & Document Telemetry
            </div>
            {m ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-gray-400 block text-[10px]">HTTP Status</span>
                  <strong className="text-white">{m.statusCode || 'N/A'} ({m.redirectCount} redirects)</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-gray-400 block text-[10px]">Response TTFB</span>
                  <strong className="text-white">{m.responseTimeMs} ms</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-gray-400 block text-[10px]">HTML Size</span>
                  <strong className="text-white">{(m.htmlBytes / 1024).toFixed(1)} KB</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-gray-400 block text-[10px]">Headings</span>
                  <strong className="text-white">H1: {m.h1Count} • H2: {m.h2Count}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-gray-400 block text-[10px]">Images Missing Alt</span>
                  <strong className="text-white">{m.imagesMissingAlt} of {m.imagesCount}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-gray-400 block text-[10px]">Structured Data</span>
                  <strong className="text-white">{m.jsonLdCount} JSON-LD blocks</strong>
                </div>
              </div>
            ) : (
              <p className="text-xs text-amber-300 font-mono">
                Not enough data to confirm live DOM metrics. Manual review recommended.
              </p>
            )}
          </div>

          {result.miniSiteSummary && (
            <div className="mt-3 pt-3 border-t border-white/10 text-xs font-mono text-gray-300 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 text-[#CCFF00]">
                <Globe className="w-3.5 h-3.5" />
                Mini-Site Crawl:
              </span>
              <span>
                robots.txt: <strong>{result.miniSiteSummary.robotsTxtStatus ?? 'N/A'}</strong>
              </span>
              <span>
                sitemap.xml: <strong>{result.miniSiteSummary.sitemapXmlStatus ?? 'N/A'}</strong>
                {result.miniSiteSummary.sitemapUrlCount !== null
                  ? ` (${result.miniSiteSummary.sitemapUrlCount} URLs)`
                  : ''}
              </span>
              <span>
                Sampled internal pages: <strong>{result.miniSiteSummary.sampledInternalPages.length}</strong>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Executive Summary grounded strictly in deterministic evidence */}
      {(result.aiExecutiveSummary || result.aiExecutiveSummaryUr) && (
        <div
          dir={isUrdu ? 'rtl' : 'ltr'}
          className="rounded-2xl bg-[#2667FF]/10 border border-[#2667FF]/30 p-5"
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#CCFF00]">
              {isUrdu
                ? 'تصدیق شدہ آڈٹ خلاصہ (Deterministic Evidence Summary)'
                : 'Evidence-Based Executive Summary (Zero AI Hallucinations)'}
            </span>
            <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Grounded in {checks.totalExecuted} checks
            </span>
          </div>
          <p className="text-sm text-gray-200 leading-relaxed">
            {isUrdu && result.aiExecutiveSummaryUr
              ? result.aiExecutiveSummaryUr
              : result.aiExecutiveSummary}
          </p>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { ExternalLink, ShieldCheck, Cpu } from 'lucide-react';
import { AuditResult } from '../../types/audit';
import { getScoreColor } from '../../utils/auditEngine';

interface OverallScoreCardProps {
  result: AuditResult;
}

export const OverallScoreCard: React.FC<OverallScoreCardProps> = ({ result }) => {
  const score = result.overallScore;
  const scoreColor = getScoreColor(score);
  
  // Circumference for r=45 is 2 * PI * 45 = 282.74
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-[#0d0d0d] border border-[#222] rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        
        {/* SVG Circular Score Gauge */}
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#222"
              strokeWidth="7"
              fill="transparent"
            />
            {/* Animated progress circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke={scoreColor}
              strokeWidth="7"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={circumference}
              style={{
                strokeDashoffset,
                transition: 'stroke-dashoffset 1.2s ease-out'
              }}
            />
          </svg>

          {/* Centered Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-extrabold tracking-tight font-sans" style={{ color: scoreColor }}>
              {score}
            </span>
            <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">
              out of 100
            </span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="px-3 py-1 rounded-full bg-[#181818] border border-[#333] text-xs font-mono text-gray-300">
              Grade: <strong className="text-white text-sm" style={{ color: scoreColor }}>{result.grade}</strong>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#181818] border border-[#333] text-xs font-mono text-gray-300 capitalize">
              Device: <strong className="text-white">{result.device}</strong>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#181818] border border-[#333] text-xs font-mono text-gray-400 flex items-center gap-1">
              <Cpu className="w-3 h-3 text-[#ccff00]" /> {result.engine}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Audit Health Score: <span style={{ color: scoreColor }}>{result.overallScore}/100</span>
          </h3>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Identified <span className="text-white font-semibold">{result.issueCount} total optimization points</span> across performance, Core Web Vitals, SEO, accessibility, and security headers.
          </p>

          <div className="pt-1 flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-gray-400">
            <span>Target:</span>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ccff00] hover:underline flex items-center gap-1 break-all"
            >
              {result.url}
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          </div>
        </div>

        {/* Quick CTA or Health Indicator */}
        <div className="shrink-0 text-center bg-[#141414] border border-[#262626] rounded-xl p-4 w-full md:w-48">
          <div className="text-xs font-mono text-gray-400 mb-1 uppercase tracking-wider">Health Status</div>
          <div className="text-base font-bold mb-1" style={{ color: scoreColor }}>
            {score >= 90 ? '🌟 Production Ready' : score >= 75 ? '⚡ Minor Tweaks Needed' : score >= 50 ? '⚠️ Optimization Urgent' : '🚨 Critical Overhaul'}
          </div>
          <div className="text-[11px] text-gray-500">
            {score >= 90 ? 'Exceeds top 5% web benchmarks' : 'Score potential up to 98+'}
          </div>
        </div>

      </div>
    </div>
  );
};

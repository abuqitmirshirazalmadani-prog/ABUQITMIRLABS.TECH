import React from 'react';
import { Zap, Search, Eye, CheckCircle, ShieldCheck } from 'lucide-react';
import { AuditResult } from '../../types/audit';
import { getScoreColor } from '../../utils/auditEngine';

interface CategoryScoresGridProps {
  result: AuditResult;
}

export const CategoryScoresGrid: React.FC<CategoryScoresGridProps> = ({ result }) => {
  const categories = [
    {
      id: 'performance',
      name: 'Performance',
      icon: Zap,
      score: result.performance,
      desc: 'Speed, Core Web Vitals, and payload size'
    },
    {
      id: 'seo',
      name: 'Search Engine Optimization',
      icon: Search,
      score: result.seo,
      desc: 'Meta tags, crawlability, canonicals & headings'
    },
    {
      id: 'accessibility',
      name: 'Accessibility (WCAG)',
      icon: Eye,
      score: result.accessibility,
      desc: 'Screen-reader labels, color contrast & alt text'
    },
    {
      id: 'bestPractices',
      name: 'Best Practices',
      icon: CheckCircle,
      score: result.bestPractices,
      desc: 'Modern web standards, console logs & assets'
    },
    {
      id: 'security',
      name: 'Security & Privacy',
      icon: ShieldCheck,
      score: result.security,
      desc: 'HTTPS, HSTS, CSP, and clickjacking protection'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
        <span>Category Score Breakdown</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const color = getScoreColor(cat.score);
          const status = cat.score >= 90 ? 'Optimal' : cat.score >= 70 ? 'Moderate' : 'Needs Fix';

          return (
            <div
              key={cat.id}
              className="bg-[#0e0e0e] border border-[#222] hover:border-[#333] rounded-xl p-5 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#181818] flex items-center justify-center text-gray-300 group-hover:text-[#ccff00] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded-full border"
                    style={{
                      borderColor: `${color}40`,
                      backgroundColor: `${color}15`,
                      color: color
                    }}
                  >
                    {status}
                  </span>
                </div>

                <div className="text-sm font-semibold text-white mb-1">{cat.name}</div>
                <div className="text-xs text-gray-500 line-clamp-2 mb-4">{cat.desc}</div>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-2xl font-bold font-mono" style={{ color }}>
                    {cat.score}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">/100</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#1c1c1c] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${cat.score}%`,
                      backgroundColor: color
                    }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

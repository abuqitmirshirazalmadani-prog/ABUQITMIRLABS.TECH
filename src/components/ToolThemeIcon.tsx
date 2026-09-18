import React from 'react';
import { 
  Calculator, 
  Gauge, 
  ListChecks, 
  Bot, 
  Cpu, 
  Globe, 
  Coins, 
  Rocket, 
  ShieldCheck, 
  Layers,
  Sparkles,
  LucideIcon
} from 'lucide-react';

export type ToolIdentifier = 
  | 'project-cost-estimator'
  | 'website-audit'
  | 'seo-checklist'
  | 'ai-readiness-score'
  | 'tech-stack-recommender'
  | 'website-authority-analyzer'
  | 'ai-agent-service'
  | string;

export interface ToolThemeConfig {
  icon: LucideIcon;
  color: string;
  glowColor: string;
  borderColor: string;
  bgColor: string;
}

export const TOOL_THEMES: Record<string, ToolThemeConfig> = {
  'project-cost-estimator': {
    icon: Calculator,
    color: '#ccff00',
    glowColor: 'rgba(204, 255, 0, 0.25)',
    borderColor: 'rgba(204, 255, 0, 0.3)',
    bgColor: 'rgba(204, 255, 0, 0.08)',
  },
  'website-audit': {
    icon: Gauge,
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.25)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    bgColor: 'rgba(56, 189, 248, 0.08)',
  },
  'seo-checklist': {
    icon: ListChecks,
    color: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.25)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
    bgColor: 'rgba(34, 197, 94, 0.08)',
  },
  'ai-readiness-score': {
    icon: Bot,
    color: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.3)',
    borderColor: 'rgba(192, 132, 252, 0.35)',
    bgColor: 'rgba(192, 132, 252, 0.08)',
  },
  'tech-stack-recommender': {
    icon: Cpu,
    color: '#fb923c',
    glowColor: 'rgba(251, 146, 60, 0.25)',
    borderColor: 'rgba(251, 146, 60, 0.3)',
    bgColor: 'rgba(251, 146, 60, 0.08)',
  },
  'website-authority-analyzer': {
    icon: Globe,
    color: '#818cf8',
    glowColor: 'rgba(129, 140, 248, 0.25)',
    borderColor: 'rgba(129, 140, 248, 0.3)',
    bgColor: 'rgba(129, 140, 248, 0.08)',
  },
  'ai-agent-service': {
    icon: Sparkles,
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    borderColor: 'rgba(168, 85, 247, 0.3)',
    bgColor: 'rgba(168, 85, 247, 0.08)',
  }
};

const DEFAULT_THEME: ToolThemeConfig = {
  icon: Sparkles,
  color: '#ccff00',
  glowColor: 'rgba(204, 255, 0, 0.2)',
  borderColor: 'rgba(255, 255, 255, 0.1)',
  bgColor: 'rgba(255, 255, 255, 0.05)',
};

interface ToolThemeIconProps {
  tool: ToolIdentifier;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  glowOnHover?: boolean;
}

export const ToolThemeIcon: React.FC<ToolThemeIconProps> = ({
  tool,
  size = 'md',
  className = '',
  glowOnHover = true,
}) => {
  // Normalize slug / id: handle `/tools/project-cost-estimator` or `project-cost-estimator`
  const cleanKey = tool.replace(/^\/tools\//, '').replace(/^\//, '');
  const config = TOOL_THEMES[cleanKey] || DEFAULT_THEME;
  const IconComponent = config.icon;

  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
    xl: 'w-16 h-16',
  };

  const iconSizes = {
    xs: 14,
    sm: 18,
    md: 22,
    lg: 26,
    xl: 30,
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-[#121215] border border-white/10 transition-all duration-300 group-hover:border-white/20 shrink-0 ${sizeClasses[size]} ${className}`}
      style={{
        boxShadow: glowOnHover
          ? `inset 0 0 12px ${config.bgColor}`
          : undefined,
      }}
    >
      {/* Subtle inner circular tint */}
      <div 
        className="absolute inset-1 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: config.bgColor }}
      />

      {/* Vector Icon */}
      <IconComponent 
        size={iconSizes[size]} 
        color={config.color}
        strokeWidth={2}
        className="relative z-10 transition-transform duration-300 group-hover:scale-110"
      />
    </div>
  );
};

export default ToolThemeIcon;

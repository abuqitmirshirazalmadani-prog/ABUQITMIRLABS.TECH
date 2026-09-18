export interface DomainAuthorityData {
  value: number;
  description: string;
  rank?: number | string;
}

export interface DomainAgeData {
  display: string;
  firstSeen: string;
  ageYears: number;
  ageMonths?: number;
}

export interface SiteQualityData {
  overall: number;
  performance: number;
  seo?: number;
  accessibility?: number;
  bestPractices?: number;
}

export interface TrustSignalsData {
  score?: number;
  level: string;
  summary: string;
  details?: {
    hasHttps?: boolean;
    hasHSTS?: boolean;
    hasCSP?: boolean;
    hasXFrame?: boolean;
    hasXContentType?: boolean;
    hasReferrerPolicy?: boolean;
    hasPermissionsPolicy?: boolean;
  };
}

export interface AIAnalysisData {
  benchmark: string;
  strengths: string[];
  improvements: string[];
}

export interface RoadmapPhase {
  title: string;
  duration: string;
  actions: string[];
}

export interface PriorityActionItem {
  title: string;
  description: string;
}

export interface OutreachTemplate {
  title: string;
  useCase: string;
  content: string;
}

export interface FullReportData {
  roadmap: RoadmapPhase[];
  priorityActions: PriorityActionItem[];
  templates: OutreachTemplate[];
}

export interface AuthorityAnalyzerResult {
  domain: string;
  url: string;
  overallScore: number;
  authorityLevel: string;
  percentile: string;
  industryRank: string;
  scoreSummary: string;
  domainAuthority: DomainAuthorityData;
  domainAge: DomainAgeData;
  siteQuality: SiteQualityData;
  trustSignals: TrustSignalsData;
  aiAnalysis: AIAnalysisData;
  fullReport: FullReportData;
  generatedAt?: string;
  fallback?: boolean;
  source?: 'ai' | 'algorithmic';
}

export type DeviceStrategy = 'mobile' | 'desktop';

export type IssuePriority = 'critical' | 'high' | 'medium' | 'low';
export type IssueImpact = 'High' | 'Medium' | 'Low';

export interface AuditIssue {
  title: string;
  description: string;
  category: string;
  priority: IssuePriority;
  impact: IssueImpact;
  effort: string;
  suggestedFix?: string;
}

export interface AiRecommendation {
  title: string;
  description: string;
  scoreGain: number;
  timeToFix: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  category?: string;
}

export interface CoreWebVitals {
  lcp: number;       // seconds
  cls: number;       // unitless
  inp: number;       // milliseconds
  fcp: number;       // seconds
  ttfb: number;      // milliseconds
  speedIndex: number;// seconds
}

export interface InspectedMetrics {
  statusCode: number;
  responseTimeMs: number;
  htmlBytes: number;
  isCompressed?: boolean;
  hasHttps: boolean;
  hasHsts: boolean;
  hasCsp: boolean;
  hasXFrame: boolean;
  hasContentTypeOptions: boolean;
  hasReferrerPolicy: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  hasViewport: boolean;
  h1Count: number;
  h2Count: number;
  imagesCount: number;
  imagesMissingAlt: number;
  scriptsCount: number;
  stylesheetsCount: number;
  langAttribute: string | null;
}

export interface AuditResult {
  url: string;
  device: DeviceStrategy;
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  categoryCount: number;
  issueCount: number;
  
  // Category scores (0-100)
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
  security: number;
  
  // Core Web Vitals
  cwv: CoreWebVitals;
  
  // Detailed findings
  issues: AuditIssue[];
  recommendations: AiRecommendation[];
  
  // Technical live inspection metadata
  inspectedMetrics?: InspectedMetrics;
  analyzedAt: string;
  engine: 'Google Lighthouse (PSI)' | 'AbuQitmirLabs Deep DOM & Network Inspector';
}

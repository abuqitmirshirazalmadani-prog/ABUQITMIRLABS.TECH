export type DeviceStrategy = 'mobile' | 'desktop';
export type DeviceSelection = 'mobile' | 'desktop' | 'both';

export type AuditMode = 'quick' | 'mini-site' | 'complete';

export type AuditObjective =
  | 'seo'
  | 'speed'
  | 'accessibility'
  | 'security'
  | 'conversion'
  | 'complete';

export type ReportLanguage = 'en' | 'ur';

export interface AuditAdvancedOptions {
  industry: string;
  businessGoal: string;
  targetMarket: string;
  reportLanguage: ReportLanguage;
}

export interface AuditRequestPayload {
  url: string;
  mode: AuditMode;
  objective: AuditObjective;
  device: DeviceSelection;
  advanced?: AuditAdvancedOptions;
  categories?: string[];
}

export type IssuePriority = 'critical' | 'high' | 'medium' | 'low' | 'passed';
export type IssueImpact = 'High' | 'Medium' | 'Low';

export type ConfidenceLevel =
  | 'Confirmed'
  | 'Likely'
  | 'Manual review required'
  | 'Data unavailable';

export type DataSourceType =
  | 'Real-user field data'
  | 'Lighthouse lab data'
  | 'HTML/static checks'
  | 'Heuristic conversion checks'
  | 'Manual review items';

export type AuditCategoryName =
  | 'Crawlability'
  | 'SEO'
  | 'Performance'
  | 'Accessibility'
  | 'Security'
  | 'Conversion';

export type FilterCategory =
  | 'all'
  | 'SEO'
  | 'Performance'
  | 'Accessibility'
  | 'Security'
  | 'Conversion';

export type FilterSeverity =
  | 'all'
  | 'critical'
  | 'high'
  | 'medium'
  | 'passed';

export type ActionHorizon = 'Fix Today' | 'Fix This Week' | 'Monitor';

export type FixOwnerRole =
  | 'Frontend Engineer'
  | 'Backend / DevOps'
  | 'SEO Specialist'
  | 'CRO / Product Designer'
  | 'Content / Legal';

export interface AuditIssue {
  id: string;
  checkId: string;
  title: string;
  titleUr?: string;
  description: string;
  category: AuditCategoryName;
  priority: IssuePriority;
  passed: boolean;
  impact: IssueImpact;
  effort: string;
  suggestedFix: string;
  evidence: string;
  affectedTarget: string;
  whyItMatters: string;
  businessImpact: string;
  fixOwner: FixOwnerRole;
  confidence: ConfidenceLevel;
  verificationStep: string;
  dataType: DataSourceType;
  actionHorizon: ActionHorizon;
}

export interface AiRecommendation {
  title: string;
  description: string;
  scoreGain: number;
  timeToFix: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  category?: string;
  basedOnCheckIds?: string[];
}

export interface CoreWebVitals {
  lcp: number | null;        // seconds
  cls: number | null;        // unitless
  inp: number | null;        // milliseconds
  fcp: number | null;        // seconds
  ttfb: number | null;       // milliseconds
  speedIndex: number | null; // seconds
}

export interface FieldDataSummary {
  available: boolean;
  sourceLabel: string;
  overallCategory: 'FAST' | 'AVERAGE' | 'SLOW' | 'UNAVAILABLE';
  lcpSeconds: number | null;
  clsScore: number | null;
  inpMs: number | null;
  fcpSeconds: number | null;
  ttfbMs: number | null;
  note: string;
}

export interface LabDataSummary {
  available: boolean;
  sourceLabel: string;
  mobile: CoreWebVitals | null;
  desktop: CoreWebVitals | null;
  note: string;
}

export interface SampledInternalPage {
  url: string;
  statusCode: number | null;
  responseTimeMs: number;
  title: string | null;
  h1Count: number;
  hasCanonical: boolean;
}

export interface MiniSiteAuditSummary {
  robotsTxtChecked: boolean;
  robotsTxtUrl: string;
  robotsTxtStatus: number | null;
  robotsTxtAllowsCrawl: boolean | null;
  robotsTxtHasSitemapDirective: boolean;
  sitemapXmlChecked: boolean;
  sitemapXmlUrl: string;
  sitemapXmlStatus: number | null;
  sitemapUrlCount: number | null;
  sampledInternalPages: SampledInternalPage[];
}

export interface InspectedMetrics {
  finalUrl: string;
  redirectCount: number;
  statusCode: number;
  responseTimeMs: number;
  htmlBytes: number;
  truncatedBySizeLimit?: boolean;
  isCompressed?: boolean;
  compressionType?: string | null;
  hasHttps: boolean;
  hasHsts: boolean;
  hstsValue?: string | null;
  hasCsp: boolean;
  cspValue?: string | null;
  hasXFrame: boolean;
  xFrameValue?: string | null;
  hasContentTypeOptions: boolean;
  hasReferrerPolicy: boolean;
  referrerPolicyValue?: string | null;
  robotsMeta?: string | null;
  xRobotsTag?: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  hasViewport: boolean;
  viewportContent?: string | null;
  disablesZoom?: boolean;
  h1Count: number;
  h1Texts?: string[];
  h2Count: number;
  h3Count: number;
  imagesCount: number;
  imagesMissingAlt: number;
  imagesMissingDimensions: number;
  legacyFormatImagesCount: number;
  scriptsCount: number;
  renderBlockingScriptsCount: number;
  stylesheetsCount: number;
  langAttribute: string | null;
  jsonLdCount: number;
  jsonLdTypes: string[];
  hasOgTitle: boolean;
  hasOgDescription: boolean;
  hasOgImage: boolean;
  hasTwitterCard: boolean;
  internalLinksCount: number;
  externalLinksCount: number;
  unsafeBlankLinksCount: number;
  mixedContentCount: number;
  landmarks: {
    main: boolean;
    nav: boolean;
    header: boolean;
    footer: boolean;
  };
  formsCount: number;
  maxFormInputsCount: number;
  unlabeledInputsCount: number;
  unlabeledButtonsCount: number;
  ctaElementsCount: number;
  detectedCtaSamples: string[];
  hasDirectContactLink: boolean;
  contactMethodsDetected: string[];
  trustSignalsDetected: string[];
}

export interface SixTransparentScores {
  crawlability: number;
  seo: number;
  performance: number;
  accessibility: number;
  securityAndTrust: number;
  conversionReadiness: number;
}

export interface ScoreDimensionDetail {
  id: keyof SixTransparentScores;
  label: string;
  labelUr: string;
  score: number;
  passedChecks: number;
  failedChecks: number;
  manualOrUnavailableChecks: number;
  totalChecks: number;
  summary: string;
  weightFormula: string;
}

export interface ChecksCountSummary {
  totalExecuted: number;
  confirmedPassed: number;
  confirmedOrLikelyIssues: number;
  manualReviewRequired: number;
  dataUnavailable: number;
  byDataType: Record<DataSourceType, number>;
}

export interface AuditResult {
  url: string;
  finalUrl?: string;
  mode: AuditMode;
  objective: AuditObjective;
  device: DeviceStrategy;
  deviceSelection: DeviceSelection;
  advanced: AuditAdvancedOptions;
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  categoryCount: number;
  issueCount: number;

  // Six transparent scores (0-100)
  scores: SixTransparentScores;
  scoreDetails: ScoreDimensionDetail[];

  // Legacy fields preserved for compatibility
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
  security: number;

  // Actual check counts
  checksSummary: ChecksCountSummary;

  // Separated data sources
  fieldData: FieldDataSummary;
  labData: LabDataSummary;
  cwv: CoreWebVitals;
  miniSiteSummary?: MiniSiteAuditSummary;

  // Evidence-based findings (both issues and passed checks)
  issues: AuditIssue[];
  allChecks: AuditIssue[];
  recommendations: AiRecommendation[];
  aiExecutiveSummary?: string;
  aiExecutiveSummaryUr?: string;

  // Technical live inspection metadata
  inspectedMetrics?: InspectedMetrics;
  analyzedAt: string;
  engine: 'Google Lighthouse (PSI) + Deterministic DOM/HTTP Inspector' | 'Deterministic HTTP, DOM & Conversion Inspector';
}

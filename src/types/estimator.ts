export interface EstimatePhase {
  name: string;
  hoursMin: number;
  hoursMax: number;
  costMin: number;
  costMax: number;
  description?: string;
}

export interface EstimateFeature {
  name: string;
  costMin: number;
  costMax: number;
  hoursMin?: number;
  hoursMax?: number;
  complexity?: 'Low' | 'Medium' | 'High';
}

export interface CountryComparison {
  country: string;
  countryCode: string;
  flag: string;
  multiplier: number;
  currency: string;
  hourlyRateUSD: string;
  costMinPKR: number;
  costMaxPKR: number;
  costMinUSD: number;
  costMaxUSD: number;
  savingsVsUSA?: string;
}

export interface HourlyRateBenchmark {
  region: string;
  countryCode: string;
  flag: string;
  hourlyRateUSD: string;
  hourlyRateLocal: string;
  typicalAgencyTier: string;
  source: string;
}

export interface EstimateResult {
  projectType: string;
  detectedSummary: string;
  complexity: 'Low' | 'Medium' | 'High' | 'Enterprise';
  confidence: number;
  timelineWeeks: {
    min: number;
    max: number;
  };
  totalEngineeringHours: {
    min: number;
    max: number;
  };
  developerRateUSD: {
    min: number;
    max: number;
  };
  developerRateLocal: {
    min: number;
    max: number;
    unit: string;
  };
  pricingFormula: string;
  marketVerificationNote: string;
  totalCostPKR: {
    min: number;
    max: number;
  };
  totalCostUSD: {
    min: number;
    max: number;
  };
  targetCountry: {
    code: string;
    name: string;
    flag: string;
    multiplier: number;
    currency: string;
    hourlyRateUSD: string;
    localCostMin: number;
    localCostMax: number;
  };
  phases: EstimatePhase[];
  features: EstimateFeature[];
  countryComparison: CountryComparison[];
  hourlyRateBenchmarks: HourlyRateBenchmark[];
  suggestions: string[];
  recommendedTechStack: string[];
  teamComposition: { role: string; count: number; hours: number }[];
  source?: 'ai' | 'algorithmic';
  aiAgentSearch?: AiAgentSearchReport;
}

export interface AiAgentSearchReport {
  agentStatus: string;
  agentModel: string;
  latencyMs: number;
  timestamp: string;
  scopeDetected: string;
  pageCount?: number;
  verifiedSources: {
    name: string;
    query: string;
    verifiedRate: string;
    confidence: number;
  }[];
  stepLogs: string[];
  effortFormulaExplanation: string;
}

export interface EstimateRequestPayload {
  idea: string;
  country: string;
  projectType?: string;
  budget?: string;
}


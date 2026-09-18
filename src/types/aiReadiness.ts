export interface QuestionOption {
  value: number;
  label: string;
}

export interface Question {
  id: string;
  label: string;
  options: QuestionOption[];
}

export interface Category {
  id: string;
  icon: string;
  title: string;
  description: string;
  weight: number;
  questions: Question[];
}

export interface CategoryScoreResult {
  id: string;
  icon: string;
  title: string;
  score: number;
  weight: number;
  feedback: string;
}

export interface RoadmapPhase {
  title: string;
  duration: string;
  goal: string;
  actions: string[];
  metrics: string;
}

export interface RecommendedToolGroup {
  icon: string;
  category: string;
  tools: string[];
}

export interface NextStep {
  title: string;
  description: string;
}

export interface AiReadinessResult {
  overallScore: number;
  readinessLevel: string;
  scoreSummary: string;
  categoryScores: CategoryScoreResult[];
  strengths: string[];
  gaps: string[];
  roadmap: RoadmapPhase[];
  recommendedTools: RecommendedToolGroup[];
  nextSteps: NextStep[];
  generatedAt?: string;
  source?: 'ai' | 'algorithmic';
}

export interface BusinessFormState {
  companyName: string;
  industry: string;
  teamSize: string;
  currentAiUsage: string;
}

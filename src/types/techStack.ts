export interface ProjectOption {
  value: string;
  label: string;
  desc: string;
}

export interface ComponentAlternative {
  name: string;
  reason: string;
}

export interface StackComponent {
  icon: string;
  category: string;
  name: string;
  reason: string;
  learningCurve: 'low' | 'medium' | 'high' | string;
  community: string;
  costTier: string;
  alternatives?: ComponentAlternative[];
}

export interface WhyThisStackReason {
  icon: string;
  title: string;
  description: string;
}

export interface SetupStep {
  title: string;
  description: string;
  resources?: string[];
}

export interface LearningResourceGroup {
  icon: string;
  category: string;
  resources: string[];
}

export interface CostBreakdownItem {
  icon: string;
  category: string;
  range: string;
  note: string;
}

export interface NextStepItem {
  title: string;
  description: string;
}

export interface TechStackResult {
  stackName: string;
  summary: string;
  estimatedSetupTime: string;
  difficultyLevel: string;
  monthlyCostEstimate: string;
  totalMonthlyCost: string;
  components: StackComponent[];
  whyThisStack: WhyThisStackReason[];
  pros: string[];
  cons: string[];
  setupSteps: SetupStep[];
  learningResources: LearningResourceGroup[];
  costBreakdown: CostBreakdownItem[];
  nextSteps: NextStepItem[];
  generatedAt?: string;
  source?: 'ai' | 'algorithmic';
}

export interface TechStackFormData {
  projectType: string;
  teamSize: string;
  experience: string;
  timeline: string;
  budget: string;
  scale: string;
  features: string[];
  preferences: string[];
}

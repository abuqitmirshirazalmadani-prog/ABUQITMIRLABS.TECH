export type BusinessType =
  | 'ecommerce'
  | 'saas'
  | 'local'
  | 'service'
  | 'blog'
  | 'portfolio'
  | 'marketplace'
  | 'nonprofit';

export type Industry =
  | 'healthcare'
  | 'fintech'
  | 'retail'
  | 'realestate'
  | 'education'
  | 'hospitality'
  | 'tech'
  | 'legal'
  | 'other';

export type WebsiteStage =
  | 'prelaunch'
  | 'new'
  | 'growing'
  | 'established'
  | 'redesign';

export type PrimaryGoal =
  | 'local'
  | 'national'
  | 'leads'
  | 'ecommerce'
  | 'awareness'
  | 'traffic';

export type TeamSize = 'solo' | 'small' | 'medium' | 'enterprise';
export type TimeInvestment = 'minimal' | 'moderate' | 'aggressive';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface ChecklistTask {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  estimatedTime: string;
  impact: string;
  howTo: string;
  tools?: string[];
  completed?: boolean;
}

export interface ChecklistPhase {
  id: string;
  icon: string;
  title: string;
  description: string;
  timeframe: string;
  tasks: ChecklistTask[];
}

export interface TopPriorityItem {
  title: string;
  reason: string;
}

export interface SeoChecklist {
  id?: string;
  businessType: BusinessType | string;
  industry: Industry | string;
  stage: WebsiteStage | string;
  goal: PrimaryGoal | string;
  teamSize?: TeamSize | string;
  time?: TimeInvestment | string;
  totalTasks: number;
  estimatedWeeks: number;
  priorityTasks: number;
  phases: ChecklistPhase[];
  topPriorities: TopPriorityItem[];
  expectedImpact: string;
  commonMistakes: string[];
  quickWins: string[];
  generatedAt: string;
  source?: 'ai' | 'algorithmic';
}

export interface ChecklistFormData {
  businessType: BusinessType;
  industry: Industry;
  stage: WebsiteStage;
  goal: PrimaryGoal;
  teamSize?: TeamSize | '';
  time?: TimeInvestment | '';
}

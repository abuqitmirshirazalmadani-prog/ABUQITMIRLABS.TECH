import {
  Category,
  AiReadinessResult,
  CategoryScoreResult,
  RoadmapPhase,
  RecommendedToolGroup,
  NextStep,
  BusinessFormState
} from '../types/aiReadiness';

export const CATEGORIES: Category[] = [
  {
    id: 'data',
    icon: '📊',
    title: 'Data Infrastructure',
    description: 'How well is your business data organized, clean, and accessible?',
    weight: 25,
    questions: [
      {
        id: 'data_centralized',
        label: 'Is your business data centralized in a single system or database?',
        options: [
          { value: 0, label: 'No — data is scattered across spreadsheets and disparate tools' },
          { value: 25, label: 'Partially — some core systems integrated, but silos remain' },
          { value: 50, label: 'Mostly — key customer and operational data in central databases' },
          { value: 75, label: 'Yes — unified data warehouse / lakehouse architecture in place' },
          { value: 100, label: 'Yes — unified warehouse plus real-time streaming data pipelines' },
        ],
      },
      {
        id: 'data_quality',
        label: 'How would you rate your data quality (accuracy, completeness, validation)?',
        options: [
          { value: 0, label: 'Poor — frequent duplicates, missing fields, and inconsistencies' },
          { value: 33, label: 'Fair — usable for basic reporting but requires manual cleaning' },
          { value: 66, label: 'Good — structured, validated, and reliable for automation' },
          { value: 100, label: 'Excellent — enterprise data governance, audited schemas & lineage' },
        ],
      },
      {
        id: 'data_volume',
        label: 'Do you have enough historical structured data to train or ground AI models?',
        options: [
          { value: 0, label: 'No — under 6 months of historical data' },
          { value: 33, label: 'Some — 1 to 2 years of clean operational logs' },
          { value: 66, label: 'Yes — 3+ years of structured, domain-specific records' },
          { value: 100, label: 'Extensive — 5+ years of rich multi-modal data with metadata' },
        ],
      },
    ],
  },
  {
    id: 'technology',
    icon: '⚙️',
    title: 'Technology Stack',
    description: 'How modern, API-driven, and cloud-native is your existing software architecture?',
    weight: 20,
    questions: [
      {
        id: 'tech_cloud',
        label: 'Is your application infrastructure cloud-based (AWS, GCP, Azure, Cloudflare)?',
        options: [
          { value: 0, label: 'No — legacy on-premise hardware or unmanaged shared hosting' },
          { value: 50, label: 'Partially — hybrid setup with some services containerized in cloud' },
          { value: 100, label: 'Yes — 100% serverless / cloud-native with automated CI/CD' },
        ],
      },
      {
        id: 'tech_apis',
        label: 'Do your core business systems provide well-documented REST or GraphQL APIs?',
        options: [
          { value: 0, label: 'No programmatic APIs available' },
          { value: 33, label: 'Limited private APIs with poor documentation and high latency' },
          { value: 66, label: 'Well-structured APIs covering primary workflows and webhooks' },
          { value: 100, label: 'Comprehensive OpenAPI/Swagger specs, OAuth2, and rate-limited endpoints' },
        ],
      },
      {
        id: 'tech_modern',
        label: 'How modern and modular is your primary tech stack?',
        options: [
          { value: 0, label: 'Monolithic legacy — 10+ year old systems with tight coupling' },
          { value: 33, label: 'Mixed — modern frontends layered over legacy backend code' },
          { value: 66, label: 'Modern — modern frameworks (Node/TS, Python, Next.js, FastAPI)' },
          { value: 100, label: 'Cutting-edge — microservices, event-driven queues, vector DB ready' },
        ],
      },
    ],
  },
  {
    id: 'team',
    icon: '👥',
    title: 'Team & Skills',
    description: 'Does your team possess the technical fluency and AI literacy to deploy models?',
    weight: 20,
    questions: [
      {
        id: 'team_ai_experience',
        label: 'Does anyone on your internal team have practical AI/ML engineering experience?',
        options: [
          { value: 0, label: 'No one has AI engineering or prompting experience' },
          { value: 33, label: '1 person with foundational knowledge using ChatGPT or APIs' },
          { value: 66, label: 'Multiple engineers with hands-on prompt engineering & RAG experience' },
          { value: 100, label: 'Dedicated AI/ML team or specialized AI solutions partner' },
        ],
      },
      {
        id: 'team_data_literacy',
        label: 'How data-literate is your general workforce and management?',
        options: [
          { value: 0, label: 'Low — decisions are predominantly based on gut feeling' },
          { value: 33, label: 'Moderate — basic spreadsheets and month-end reporting' },
          { value: 66, label: 'High — active dashboards, SQL querying, data-informed sprints' },
          { value: 100, label: 'Expert — organization-wide quantitative hypothesis testing & A/B runs' },
        ],
      },
      {
        id: 'team_learning',
        label: 'Is there a formal culture and budget for continuous engineering upskilling?',
        options: [
          { value: 0, label: 'No dedicated learning budgets or training time' },
          { value: 50, label: 'Ad-hoc online courses and occasional workshops' },
          { value: 100, label: 'Structured R&D allocation, hackathons, and certifications budget' },
        ],
      },
    ],
  },
  {
    id: 'processes',
    icon: '🔄',
    title: 'Processes & Workflows',
    description: 'Are your internal workflows documented, standardized, and primed for autonomous automation?',
    weight: 15,
    questions: [
      {
        id: 'proc_documented',
        label: 'Are your core standard operating procedures (SOPs) documented in detail?',
        options: [
          { value: 0, label: 'No — procedures live purely as tribal knowledge in heads' },
          { value: 50, label: 'Partially documented in Notion, Confluence, or Google Docs' },
          { value: 100, label: 'Yes — standardized flowchart SOPs with clear inputs and outputs' },
        ],
      },
      {
        id: 'proc_automation',
        label: 'How much of your routine manual workflow is currently automated?',
        options: [
          { value: 0, label: 'Near zero — almost everything is manual human repetition' },
          { value: 33, label: 'Basic automation — Zapier, email rules, scheduled exports' },
          { value: 66, label: 'Significant automation — webhooks, automated CRM pipelines' },
          { value: 100, label: 'Highly automated — background workers, queues, self-healing bots' },
        ],
      },
      {
        id: 'proc_measurement',
        label: 'Do you rigorously track cycle times, error rates, and unit economics on tasks?',
        options: [
          { value: 0, label: 'No process KPIs or benchmarks recorded' },
          { value: 50, label: 'Some departmental KPIs tracked on monthly reviews' },
          { value: 100, label: 'Real-time telemetry, error tracking, and SLA dashboards' },
        ],
      },
    ],
  },
  {
    id: 'strategy',
    icon: '🎯',
    title: 'Strategy & Leadership',
    description: 'Does executive leadership have an actionable AI investment strategy and clear ROI targets?',
    weight: 10,
    questions: [
      {
        id: 'strat_vision',
        label: 'Does leadership have an executive roadmap for AI adoption over the next 12-24 months?',
        options: [
          { value: 0, label: 'No — AI is rarely discussed at executive level' },
          { value: 50, label: 'Emerging — leadership is curious but lacks a concrete tactical roadmap' },
          { value: 100, label: 'Yes — prioritized use-case matrix with executive buy-in and ROI targets' },
        ],
      },
      {
        id: 'strat_budget',
        label: 'Is there capital specifically allocated for AI tool licenses and engineering?',
        options: [
          { value: 0, label: 'Zero dedicated AI budget allocated' },
          { value: 50, label: 'Small discretionary budget for SaaS subscriptions and pilots' },
          { value: 100, label: 'Dedicated annual capital for custom AI development and compute' },
        ],
      },
    ],
  },
  {
    id: 'culture',
    icon: '🧠',
    title: 'Culture & Innovation',
    description: 'Is your organization culturally receptive to experimenting, iterating, and adopting new technology?',
    weight: 10,
    questions: [
      {
        id: 'cult_innovation',
        label: "How would you describe your company's willingness to experiment with emerging tools?",
        options: [
          { value: 0, label: 'Resistant — highly conservative, prefers familiar legacy processes' },
          { value: 33, label: 'Cautious — waits for competitors to prove new technology first' },
          { value: 66, label: 'Open — team members eagerly trial new productivity tools' },
          { value: 100, label: 'Innovative — proactive early adopters driving tech-first advantages' },
        ],
      },
      {
        id: 'cult_failure',
        label: 'Is it culturally safe within your company to rapidly prototype, test, and fail?',
        options: [
          { value: 0, label: 'No — failed experiments are penalized or discouraged' },
          { value: 50, label: 'Somewhat safe — tolerated if financial downside is negligible' },
          { value: 100, label: 'Yes — blameless post-mortems and rapid hypothesis iteration are celebrated' },
        ],
      },
    ],
  },
];

export const QUESTION_CATEGORY_MAP: Record<string, string> = {
  data_centralized: 'data',
  data_quality: 'data',
  data_volume: 'data',
  tech_cloud: 'technology',
  tech_apis: 'technology',
  tech_modern: 'technology',
  team_ai_experience: 'team',
  team_data_literacy: 'team',
  team_learning: 'team',
  proc_documented: 'processes',
  proc_automation: 'processes',
  proc_measurement: 'processes',
  strat_vision: 'strategy',
  strat_budget: 'strategy',
  cult_innovation: 'culture',
  cult_failure: 'culture',
};

export function calculateScores(answers: Record<string, number>): {
  categoryResults: CategoryScoreResult[];
  overallScore: number;
} {
  const categoryScores: Record<string, number[]> = {
    data: [],
    technology: [],
    team: [],
    processes: [],
    strategy: [],
    culture: []
  };

  Object.entries(answers).forEach(([questionId, score]) => {
    const categoryId = QUESTION_CATEGORY_MAP[questionId];
    if (categoryId && typeof score === 'number') {
      categoryScores[categoryId].push(score);
    }
  });

  const categoryResults: CategoryScoreResult[] = CATEGORIES.map((cat) => {
    const scores = categoryScores[cat.id] || [];
    const avg = scores.length
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

    return {
      id: cat.id,
      icon: cat.icon,
      title: cat.title,
      score: avg,
      weight: cat.weight,
      feedback: getCategoryFeedback(cat.id, avg)
    };
  });

  const overallScore = Math.round(
    categoryResults.reduce((sum, cat) => sum + cat.score * (cat.weight / 100), 0)
  );

  return { categoryResults, overallScore };
}

export function getReadinessLevel(score: number): string {
  if (score >= 80) return 'AI-Ready Leader';
  if (score >= 70) return 'Advanced';
  if (score >= 50) return 'Intermediate';
  if (score >= 30) return 'Developing';
  return 'Beginner';
}

export function getScoreColor(score: number): string {
  if (score >= 80) return '#ccff00'; // Brand neon lime (High/Leader)
  if (score >= 70) return '#10B981'; // Emerald (Advanced)
  if (score >= 50) return '#F59E0B'; // Amber (Moderate)
  if (score >= 30) return '#F97316'; // Orange (Developing)
  return '#EF4444'; // Red (Beginner)
}

export function getCategoryFeedback(catId: string, score: number): string {
  const feedbackMap: Record<string, { high: string; medium: string; low: string }> = {
    data: {
      high: 'Your centralized, structured data represents a high-leverage asset ready for RAG and fine-tuning.',
      medium: 'Your data is usable for targeted pilot workflows, but requires systematic schema cleaning.',
      low: 'Fragmented or manual data is your single greatest bottleneck preventing reliable AI automation.',
    },
    technology: {
      high: 'Cloud-native infrastructure and modern REST/GraphQL APIs enable near-instant AI agent integration.',
      medium: 'Solid technical stack, though webhook pipelines and API latency need refinement.',
      low: 'Legacy code or on-premise constraints will require modern proxy bridges before scaling AI agents.',
    },
    team: {
      high: 'Exceptional engineering talent and data literacy to build, operate, and iterate custom AI agents.',
      medium: 'Core competency exists; focused upskilling in prompt chaining and vector systems will unlock scale.',
      low: 'Significant skill gap in LLM architecture; partnering with specialized AI engineers is strongly advised.',
    },
    processes: {
      high: 'Excellently documented SOPs provide flawless deterministic blueprints for autonomous agent workflows.',
      medium: 'Key workflows are understood, but edge-case documentation is needed before handing off to AI.',
      low: 'Informal tribal knowledge makes AI execution prone to errors; standardize step-by-step SOPs first.',
    },
    strategy: {
      high: 'Executive leadership possesses a clear quantitative vision with dedicated capital allocated for AI.',
      medium: 'Strong executive enthusiasm exists, but lacks a formal milestone-driven ROI roadmap.',
      low: 'Absence of dedicated AI budget and strategic sponsor risks stalled initiatives and pilot fatigue.',
    },
    culture: {
      high: 'High psychological safety and rapid experimentation culture accelerate competitive AI adoption.',
      medium: 'Receptive to proven productivity wins, but cautious about disruption to legacy routines.',
      low: 'Cultural resistance or fear of failure could delay organizational adoption of generative workflows.',
    },
  };

  const tier = score >= 70 ? 'high' : score >= 50 ? 'medium' : 'low';
  return feedbackMap[catId]?.[tier] || 'Assessment pending analysis.';
}

export function generateFallbackRoadmap(overallScore: number): RoadmapPhase[] {
  if (overallScore >= 70) {
    return [
      {
        title: 'Phase 1: Autonomous Workflow Pilot',
        duration: 'Weeks 1–4',
        goal: 'Deploy an end-to-end autonomous agent for one high-friction, multi-step business workflow.',
        actions: [
          'Select a high-ROI workflow (e.g. intelligent customer support triage or automated document processing)',
          'Implement LangChain / LlamaIndex pipeline grounded in private vector storage',
          'Deploy human-in-the-loop validation dashboards for edge cases',
          'Instrument token telemetry, latency tracking, and accuracy benchmarks',
        ],
        metrics: 'Pilot deployed to production, ≥90% accuracy, >60% reduction in cycle time',
      },
      {
        title: 'Phase 2: Enterprise Scaling & Data Moats',
        duration: 'Months 2–4',
        goal: 'Expand agent orchestration across secondary workflows with strict enterprise governance.',
        actions: [
          'Implement centralized guardrails for PII scrubbing, prompt injection defense, and hallucinations',
          'Automate internal data pipelines for nightly vector index re-indexing',
          'Train internal department champions to build and maintain domain-specific agents',
          'Integrate agent triggers into Slack, email, and internal CRM webhooks',
        ],
        metrics: '3+ autonomous agents live, audited SOC2/GDPR compliance, 85%+ user adoption',
      },
      {
        title: 'Phase 3: Multi-Agent Autonomous Operations',
        duration: 'Months 5–8',
        goal: 'Deploy interconnected multi-agent swarms capable of complex reasoning and real-time execution.',
        actions: [
          'Architect multi-agent supervisor networks (planning agent, execution agent, auditor agent)',
          'Fine-tune small open-source models (Llama 3 / Mistral) on proprietary historical data for cost efficiency',
          'Establish continuous automated regression test suites for model drift',
          'Document verifiable organizational ROI and revenue expansion',
        ],
        metrics: 'Swarm architecture operational, 4x ROI documented, proprietary model weights secured',
      },
    ];
  }

  if (overallScore >= 50) {
    return [
      {
        title: 'Phase 1: Data Structuring & Knowledge Foundation',
        duration: 'Weeks 1–6',
        goal: 'Establish the clean data warehouse and unified document repository required for dependable AI.',
        actions: [
          'Audit current customer and operational data silos across spreadsheets and databases',
          'Consolidate historical documentation, product guides, and SOPs into structured markdown/JSON',
          'Clean dirty datasets and remove duplicate, unverified, or outdated historical records',
          'Set up automated cloud backups and structured API access controls',
        ],
        metrics: 'Unified knowledge repository assembled, 85%+ data clean score verified',
      },
      {
        title: 'Phase 2: Team Literacy & Targeted AI Pilots',
        duration: 'Weeks 7–14',
        goal: 'Equip internal teams with prompt engineering skills and launch your first API integration.',
        actions: [
          'Conduct hands-on internal workshops on effective contextual prompting and AI workflows',
          'Identify top 3 routine time-consuming tasks across customer care and sales operations',
          'Implement a lightweight pre-built LLM integration (Gemini Flash / OpenAI API) with structured output',
          'Measure employee time saved and gather qualitative feedback weekly',
        ],
        metrics: '2+ team leads certified in prompt design, first working AI automation deployed',
      },
      {
        title: 'Phase 3: Production RAG & Workflow Automation',
        duration: 'Months 4–6',
        goal: 'Deploy a custom Retrieval-Augmented Generation (RAG) assistant for internal or customer use.',
        actions: [
          'Connect your knowledge base to vector embeddings (Pinecone, pgvector, or Supabase)',
          'Deploy an intuitive chat or semantic search interface for employees or clients',
          'Implement basic response telemetry and feedback thumbs-up/down mechanisms',
          'Formulate the FY2026 AI expansion budget based on measured efficiency gains',
        ],
        metrics: 'Production RAG assistant live, response times <1.5s, 50%+ reduction in lookup time',
      },
    ];
  }

  return [
    {
      title: 'Phase 1: Process Standardization & Documentation',
      duration: 'Weeks 1–6',
      goal: 'Prepare your business fundamentals before introducing AI algorithms.',
      actions: [
        'Document your top 5 repetitive standard operating procedures (SOPs) with detailed flowcharts',
        'Eliminate disconnected manual spreadsheets in favor of a modern central database or CRM',
        'Audit where team members spend >10 hours per week on copy-paste or data re-entry tasks',
        'Establish basic baseline metrics for task duration and error rates',
      ],
      metrics: '5 core SOPs fully documented, single source of truth established for customer data',
    },
    {
      title: 'Phase 2: Off-the-Shelf AI Adoption & Training',
      duration: 'Weeks 7–12',
      goal: 'Build team familiarity and digital dexterity using accessible generative tools.',
      actions: [
        'Roll out enterprise licenses for tools like ChatGPT Plus, Gemini Workspace, or Claude',
        'Host weekly lunch-and-learns sharing specific time-saving prompt templates for daily tasks',
        'Replace manual draft copywriting and meeting minutes with generative summaries',
        'Identify one specific manual bottleneck suitable for custom development later',
      ],
      metrics: '100% of core team using AI daily, 3–5 hours saved per employee each week',
    },
    {
      title: 'Phase 3: Cloud Modernization & First Custom Integration',
      duration: 'Months 3–6',
      goal: 'Upgrade foundational technology to prepare for custom AI agents and automated pipelines.',
      actions: [
        'Migrate legacy on-premise components to reliable cloud environments (GCP/AWS)',
        'Ensure key software tools expose documented REST APIs or webhooks',
        'Partner with AbuQitmirLabs to scope a low-risk, high-impact custom AI agent pilot',
        'Compute anticipated ROI before committing capital expenditures',
      ],
      metrics: 'Cloud infrastructure modernized, custom AI scope finalized with technical architect',
    },
  ];
}

export function getRecommendedTools(overallScore: number): RecommendedToolGroup[] {
  if (overallScore >= 70) {
    return [
      {
        icon: '🤖',
        category: 'Advanced Agent Frameworks',
        tools: ['LangChain / LangGraph', 'LlamaIndex Workflows', 'CrewAI Agent Swarms', 'Anthropic Computer Use API'],
      },
      {
        icon: '⚡',
        category: 'Vector Databases & Retrieval',
        tools: ['Pinecone Serverless', 'pgvector (PostgreSQL)', 'Qdrant', 'Weaviate Cloud'],
      },
      {
        icon: '📊',
        category: 'Enterprise MLOps & Observability',
        tools: ['LangSmith / Langfuse', 'Weights & Biases', 'Arize Phoenix', 'Helicone'],
      },
    ];
  }

  if (overallScore >= 50) {
    return [
      {
        icon: '💡',
        category: 'LLM Foundations & APIs',
        tools: ['Google Gemini 3.8 / 1.5 Flash', 'OpenAI GPT-4o / Realtime', 'Claude 3.5 Sonnet', 'Groq LPU Inference'],
      },
      {
        icon: '🗄️',
        category: 'Modern Data & Storage',
        tools: ['Supabase / Firebase Firestore', 'PostgreSQL 16', 'Google BigQuery', 'Metabase Dashboards'],
      },
      {
        icon: '⚙️',
        category: 'Workflow & Integration Automation',
        tools: ['n8n Self-Hosted', 'Make.com', 'Zapier Enterprise', 'Retool Internal Tools'],
      },
    ];
  }

  return [
    {
      icon: '🎓',
      category: 'Foundational AI Learning',
      tools: ['DeepLearning.AI Short Courses', 'Andrew Ng AI for Everyone', 'Prompt Engineering Guides', 'OpenAI Cookbook'],
    },
    {
      icon: '🧪',
      category: 'Productivity & Co-Pilots',
      tools: ['ChatGPT Enterprise', 'Google Gemini Advanced', 'Anthropic Claude Projects', 'Notion AI'],
    },
    {
      icon: '📊',
      category: 'Modern Data Organizers',
      tools: ['Airtable Cloud Databases', 'Notion Team Wikis', 'Google Workspace Sheets', 'HubSpot Free CRM'],
    },
  ];
}

export function getNextSteps(overallScore: number, categories: CategoryScoreResult[]): NextStep[] {
  const lowest = [...categories].sort((a, b) => a.score - b.score)[0] || categories[0];

  if (overallScore >= 70) {
    return [
      {
        title: 'Formalize 1 High-ROI Agent Specification',
        description: 'Define the exact input schema, tools, and success criteria for your primary agent pilot this quarter.',
      },
      {
        title: 'Implement Vector Knowledge Retrieval (RAG)',
        description: 'Index proprietary internal documentation so AI models provide zero-hallucination answers grounded in your data.',
      },
      {
        title: 'Establish Enterprise Security & Guardrails',
        description: 'Deploy prompt firewall rules, rate-limiting, and PII masking before deploying client-facing agents.',
      },
      {
        title: 'Build Continuous Evaluation (Evals)',
        description: 'Set up automated evaluation datasets to score agent accuracy and latency after every prompt modification.',
      },
      {
        title: 'Book an Engineering Architecture Review',
        description: 'Partner with AbuQitmirLabs AI engineers to review scalability, vector latency, and multi-agent topology.',
      },
    ];
  }

  if (overallScore >= 50) {
    return [
      {
        title: `Address ${lowest.title} Bottlenecks`,
        description: `This was your lowest-scoring dimension (${lowest.score}/100). Investing here provides the highest immediate leverage.`,
      },
      {
        title: 'Centralize Key Operational Datasets',
        description: 'Eliminate disconnected spreadsheets and ensure customer records live in an accessible cloud database with APIs.',
      },
      {
        title: 'Designate an Internal AI Champion',
        description: 'Give a technical team member dedicated time each sprint to evaluate tools and prototype workflow automations.',
      },
      {
        title: 'Standardize Core SOP Documentation',
        description: 'Convert informal procedures into step-by-step markdown guides ready to serve as context for LLM agents.',
      },
      {
        title: 'Calculate Potential Automation ROI',
        description: 'Quantify current weekly hours spent on manual reporting to establish clear budget justification for custom AI.',
      },
    ];
  }

  return [
    {
      title: 'Document Your Top 3 Manual Bottlenecks',
      description: 'Identify repetitive workflows where your team spends significant hours performing copy-paste or data cleanup.',
    },
    {
      title: 'Roll Out Daily AI Productivity Tools',
      description: 'Have team members use ChatGPT, Gemini, or Claude for drafting, summarizing, and customer inquiry research.',
    },
    {
      title: 'Complete Foundational AI Literacy Training',
      description: 'Have department leaders take Andrew Ng’s free "AI for Everyone" course to build realistic capability awareness.',
    },
    {
      title: 'Audit System APIs and Cloud Readiness',
      description: 'Verify whether your current software providers offer modern REST APIs for future integration with automated agents.',
    },
    {
      title: 'Consult With AbuQitmirLabs Specialists',
      description: 'Get an executive advisory session on low-friction initial AI use cases tailored to your exact industry vertical.',
    },
  ];
}

export function getFallbackResult(
  answers: Record<string, number>,
  form: BusinessFormState
): AiReadinessResult {
  const { categoryResults, overallScore } = calculateScores(answers);
  const readinessLevel = getReadinessLevel(overallScore);

  const strengths: string[] = [];
  const gaps: string[] = [];

  categoryResults.forEach((cat) => {
    if (cat.score >= 70) {
      strengths.push(
        `Strong ${cat.title.toLowerCase()} (${cat.score}/100) — this represents a solid foundation for automation.`
      );
    } else if (cat.score < 50) {
      gaps.push(
        `${cat.title} (${cat.score}/100) requires foundational upgrades before reliable AI adoption can scale.`
      );
    }
  });

  if (strengths.length === 0) {
    strengths.push(
      'Taking this quantitative audit demonstrates strong initiative and awareness of digital transformation priorities.'
    );
  }

  if (gaps.length === 0) {
    gaps.push(
      'Continuous evaluation and model drift monitoring must be maintained as models evolve.'
    );
  }

  const industryLabel = form.industry ? form.industry.toUpperCase() : 'your business';

  return {
    overallScore,
    readinessLevel,
    scoreSummary: `Your business achieved an AI Readiness Score of ${overallScore}/100, positioning you at the "${readinessLevel}" tier for ${industryLabel}. With strategic investments across your core categories, you can rapidly build proprietary digital moats and deploy autonomous agents.`,
    categoryScores: categoryResults,
    strengths: strengths.slice(0, 4),
    gaps: gaps.slice(0, 4),
    roadmap: generateFallbackRoadmap(overallScore),
    recommendedTools: getRecommendedTools(overallScore),
    nextSteps: getNextSteps(overallScore, categoryResults),
    generatedAt: new Date().toISOString(),
    source: 'algorithmic'
  };
}

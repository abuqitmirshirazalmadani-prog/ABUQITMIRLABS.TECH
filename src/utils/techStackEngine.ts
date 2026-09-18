import {
  ProjectOption,
  TechStackFormData,
  TechStackResult,
  StackComponent,
  WhyThisStackReason,
  SetupStep,
  LearningResourceGroup,
  CostBreakdownItem,
  NextStepItem
} from '../types/techStack';

export const PROJECT_TYPES: ProjectOption[] = [
  { value: 'saas', label: '💻 SaaS Platform', desc: 'Subscription software & multi-tenant apps' },
  { value: 'ecommerce', label: '🛒 E-commerce', desc: 'Online store, inventory & checkout' },
  { value: 'marketplace', label: '🏪 Two-Sided Marketplace', desc: 'Multi-vendor buyers & sellers' },
  { value: 'social', label: '💬 Social & Community', desc: 'Feed, messaging & user profiles' },
  { value: 'fintech', label: '💰 Fintech & Banking', desc: 'Payments, wallets, security & compliance' },
  { value: 'healthcare', label: '🏥 Healthcare & HealthTech', desc: 'HIPAA, patient portals & tele-health' },
  { value: 'edtech', label: '🎓 EdTech & LMS', desc: 'Courses, quizzes & student analytics' },
  { value: 'content', label: '📝 High-SEO Content / Media', desc: 'Editorial blogs, news & publishers' },
  { value: 'dashboard', label: '📊 Analytics & Admin Dashboard', desc: 'B2B telemetry, charts & BI tools' },
  { value: 'mobile', label: '📱 Cross-Platform Mobile App', desc: 'iOS & Android native feel' },
  { value: 'aiagent', label: '🤖 Autonomous AI Agent', desc: 'RAG, vector retrieval & agent swarms' },
  { value: 'internal', label: '🏢 Internal Operations Tool', desc: 'Staff workflows, CRM & inventory' },
];

export const TEAM_SIZES: ProjectOption[] = [
  { value: 'solo', label: '🧑 Solo Developer', desc: '1 engineer building end-to-end' },
  { value: 'small', label: '👥 Small Team', desc: '2–5 engineers collaborating' },
  { value: 'medium', label: '👥 Growing Scaleup', desc: '6–15 developers & squads' },
  { value: 'large', label: '🏢 Enterprise Department', desc: '15+ developers across divisions' },
];

export const EXPERIENCE_LEVELS: ProjectOption[] = [
  { value: 'beginner', label: '🌱 Beginner / Junior', desc: 'Getting started with full-stack' },
  { value: 'intermediate', label: '📚 Intermediate', desc: '1–3 years hands-on production code' },
  { value: 'advanced', label: '🎓 Senior / Advanced', desc: '3–7 years architecture experience' },
  { value: 'expert', label: '🏆 Principal / Architect', desc: '7+ years distributed systems mastery' },
];

export const TIMELINE_OPTIONS: ProjectOption[] = [
  { value: 'mvp', label: '⚡ Rapid MVP (4–8 Weeks)', desc: 'Fastest speed to production launch' },
  { value: 'standard', label: '📅 Standard (3–6 Months)', desc: 'Balanced architecture and testing' },
  { value: 'longterm', label: '🏗️ Enterprise (6–12 Months)', desc: 'Comprehensive compliance and scale' },
  { value: 'evolving', label: '🔄 Continuous Evolution', desc: 'Evergreen modular product build' },
];

export const BUDGET_RANGES: ProjectOption[] = [
  { value: 'minimal', label: '💵 Under $5,000', desc: 'Lean bootstrap budget' },
  { value: 'low', label: '💵 $5,000 – $20,000', desc: 'Early seed / prototype stage' },
  { value: 'medium', label: '💰 $20,000 – $100,000', desc: 'Funded startup or agency launch' },
  { value: 'high', label: '💰💰 $100,000+', desc: 'High-growth / enterprise capital' },
];

export const SCALE_OPTIONS: ProjectOption[] = [
  { value: 'prototype', label: '🧪 Prototype / Validation', desc: '<500 early adopters' },
  { value: 'startup', label: '🚀 Seed Startup', desc: '1,000 – 25,000 active users' },
  { value: 'growth', label: '📈 Growth Stage', desc: '25,000 – 500,000 active users' },
  { value: 'enterprise', label: '🏢 High Enterprise Scale', desc: '1,000,000+ global queries' },
];

export const FEATURES: ProjectOption[] = [
  { value: 'auth', label: '🔐 Auth & RBAC', desc: 'Multi-tenant logins, OAuth & roles' },
  { value: 'payments', label: '💳 Global Payments', desc: 'Subscriptions, Stripe & invoices' },
  { value: 'realtime', label: '⚡ Real-time Sockets', desc: 'Live notifications, chat & canvas' },
  { value: 'ai', label: '🤖 AI & Vector RAG', desc: 'LLM agents, embeddings & grounding' },
  { value: 'search', label: '🔍 Semantic Search', desc: 'Full-text & vector hybrid search' },
  { value: 'analytics', label: '📊 Business Analytics', desc: 'Metrics, retention & telemetry' },
  { value: 'video', label: '🎥 Media & Streaming', desc: 'Transcoding, S3 storage & CDN' },
  { value: 'notifications', label: '🔔 Multi-Channel Alerts', desc: 'Email, push, SMS & Slack hooks' },
  { value: 'multi_lang', label: '🌍 Global i18n', desc: 'Multi-lingual localizations' },
  { value: 'admin', label: '⚙️ Internal Admin CRUD', desc: 'Customer support control center' },
  { value: 'api', label: '🔌 Public Developer API', desc: 'REST / GraphQL & rate-limits' },
  { value: 'mobile', label: '📱 Mobile Native App', desc: 'iOS & Android app store builds' },
];

export const PREFERENCES: ProjectOption[] = [
  { value: 'fast', label: '🚀 Maximum Shipping Speed', desc: 'Fastest time to first paying customer' },
  { value: 'scalable', label: '📈 Infinite Scalability', desc: 'Handle spikes with serverless or K8s' },
  { value: 'cheap', label: '💰 Lowest Operating Cost', desc: 'Maximize free tiers and lean compute' },
  { value: 'modern', label: '✨ Modern & Type-Safe', desc: 'TypeScript, Next.js, modern DX' },
  { value: 'maintainable', label: '🔧 Low Maintenance Overhead', desc: 'Managed PaaS over DIY servers' },
  { value: 'hiring', label: '👥 Easiest Developer Hiring', desc: 'Massive talent pool worldwide' },
];

export function getFallbackRecommendation(form: TechStackFormData): TechStackResult {
  const isBeginner = form.experience === 'beginner';
  const isSmallTeam = form.teamSize === 'solo' || form.teamSize === 'small';
  const isFastTimeline = form.timeline === 'mvp';
  const hasAi = form.projectType === 'aiagent' || form.features?.includes('ai');
  const hasRealtime = form.features?.includes('realtime');
  const isMobile = form.projectType === 'mobile' || form.features?.includes('mobile');
  const isEnterprise = form.scale === 'enterprise' || form.teamSize === 'large';

  let stackName = 'Modern Type-Safe Full-Stack';
  let frontend = 'Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS';
  let backend = 'Next.js Server Actions & Route Handlers (Node.js runtime)';
  let database = 'PostgreSQL (Supabase Serverless or Neon)';
  let hosting = 'Vercel Edge Network + Cloudflare DNS';

  if (isMobile) {
    stackName = 'Modern Cross-Platform Web & Mobile Stack';
    frontend = 'Next.js 15 (Web) + React Native / Expo 52 (iOS & Android)';
    backend = 'TypeScript Node.js (NestJS or Express) + Supabase Edge';
    database = 'PostgreSQL (Supabase or Neon)';
    hosting = 'Vercel (Web) + Expo EAS (App Stores)';
  } else if (hasAi) {
    stackName = 'AI Agent & Vector Intelligence Stack';
    frontend = 'Next.js 15 + TypeScript + Tailwind CSS + Framer Motion';
    backend = 'Python 3.12 (FastAPI / LangGraph) + TypeScript Next.js API gateway';
    database = 'PostgreSQL with pgvector + Supabase / Pinecone Serverless';
    hosting = 'Cloud Run / Modal (Python AI) + Vercel (Frontend & Edge)';
  } else if (isEnterprise) {
    stackName = 'Enterprise Distributed Microservices Stack';
    frontend = 'Next.js 15 Enterprise + TypeScript + Tailwind CSS';
    backend = 'Go (Fiber) & Node.js (NestJS) containerized microservices';
    database = 'AWS Aurora PostgreSQL (Multi-AZ) + Redis Cluster';
    hosting = 'Google Cloud Run / AWS ECS Fargate + Cloudflare Enterprise';
  } else if (isBeginner && isSmallTeam) {
    stackName = 'Lean High-Velocity Solo Founder Stack';
    frontend = 'Next.js 15 + React + Tailwind CSS + shadcn/ui';
    backend = 'Next.js Server Actions (Unified Full-Stack)';
    database = 'Supabase (Managed PostgreSQL, Auth & Realtime)';
    hosting = 'Vercel Free/Pro Tier';
  }

  const components: StackComponent[] = [
    {
      icon: '⚛️',
      category: 'Frontend & UI',
      name: frontend.split(' + ')[0],
      reason: isBeginner
        ? 'Next.js eliminates boilerplate routing, provides automatic image optimization, and delivers industry-standard developer ergonomics.'
        : 'Next.js 15 App Router provides lightning-fast server components (RSC), seamless streaming, and outstanding SEO benchmarks for 2026.',
      learningCurve: isBeginner ? 'medium' : 'low',
      community: 'Massive (#1 React framework)',
      costTier: 'Free (Open Source)',
      alternatives: [
        { name: 'Remix / React Router v7', reason: 'Fine-grained standard Web fetch APIs and nested loaders' },
        { name: 'SvelteKit', reason: 'Ultra-lean bundle sizes with reactive primitives' },
        { name: 'Vite + React SPA', reason: 'Client-only dashboards that require zero SSR complexity' },
      ],
    },
    {
      icon: '🎨',
      category: 'Styling & Design System',
      name: 'Tailwind CSS v4 + Lucide Icons',
      reason: 'Utility-first styling avoids bloated CSS stylesheets, speeds up visual iteration, and guarantees zero CSS specificity conflicts.',
      learningCurve: 'low',
      community: 'Massive',
      costTier: 'Free',
      alternatives: [
        { name: 'CSS Modules', reason: 'Scoped vanilla CSS without learning custom utility classes' },
        { name: 'shadcn/ui', reason: 'Copy-paste accessible Radix UI components pre-styled in Tailwind' },
      ],
    },
    {
      icon: '🟨',
      category: 'Primary Language',
      name: 'TypeScript 5.x',
      reason: 'End-to-end type safety catches 85% of runtime data errors at compile time and makes database schema changes safe.',
      learningCurve: isBeginner ? 'medium' : 'low',
      community: 'Universal Industry Standard',
      costTier: 'Free',
      alternatives: [
        { name: 'Pure JavaScript', reason: 'Faster scratchpad prototyping but prone to runtime type crashes' },
      ],
    },
    {
      icon: '⚙️',
      category: 'Backend & APIs',
      name: backend.split(' + ')[0],
      reason: hasAi
        ? 'FastAPI in Python delivers native async AI agent execution, while TypeScript Node handles rapid web requests and auth.'
        : 'Unified full-stack architecture eliminates context switching between languages and allows sharing types between client and server.',
      learningCurve: isBeginner ? 'low' : 'medium',
      community: 'Massive',
      costTier: 'Free',
      alternatives: [
        { name: 'FastAPI (Python)', reason: 'Premier framework for LangChain, PyTorch, and machine learning pipelines' },
        { name: 'Go (Fiber / Gin)', reason: 'Sub-millisecond latency and ultra-low RAM footprint for high-concurrency APIs' },
        { name: 'NestJS (Node.js)', reason: 'Strict Angular-like modular architecture for large corporate engineering squads' },
      ],
    },
    {
      icon: '🗄️',
      category: 'Primary Database',
      name: database.split(' (')[0],
      reason: 'PostgreSQL is the undisputed database workhorse in 2026. It handles structured relational schemas, JSON documents, and vector embeddings (via pgvector).',
      learningCurve: 'medium',
      community: 'Massive',
      costTier: 'Free tier ($0–$25/mo)',
      alternatives: [
        { name: 'MongoDB Atlas', reason: 'Document store if data schema is completely unpredictable' },
        { name: 'Supabase Serverless', reason: 'Instant auto-generated REST/GraphQL APIs, Auth, and Storage' },
        { name: 'Cloud SQL / Neon', reason: 'Branchable serverless Postgres with instant point-in-time recovery' },
      ],
    },
    {
      icon: '🔐',
      category: 'Authentication & RBAC',
      name: form.features?.includes('auth') ? 'Supabase Auth or Clerk' : 'Built-in Session Auth',
      reason: 'Handles OAuth2 (Google, GitHub, Apple), passwordless magic links, session tokens, and security audits without rolling custom crypto.',
      learningCurve: 'low',
      community: 'Very Large',
      costTier: 'Generous Free Tier (10k MAUs)',
      alternatives: [
        { name: 'Auth0 / Okta', reason: 'Enterprise SSO, SAML, and directory synchronization' },
        { name: 'NextAuth.js / Auth.js', reason: 'Self-hosted open source authentication without vendor lock-in' },
      ],
    },
    {
      icon: '🚀',
      category: 'Hosting & Deployment',
      name: hosting.split(' + ')[0],
      reason: 'Automated CI/CD git pushes, global edge CDN, preview branch URLs for every pull request, and automatic SSL certification.',
      learningCurve: 'low',
      community: 'Industry Leader',
      costTier: 'Free tier ($0–$20/mo)',
      alternatives: [
        { name: 'Google Cloud Run', reason: 'Deploy containerized Docker services with scale-to-zero economics' },
        { name: 'AWS Amplify / ECS', reason: 'Deep integration if company infrastructure is tied to AWS IAM' },
        { name: 'Cloudflare Pages / Workers', reason: 'Cheapest global edge execution with zero cold-starts' },
      ],
    },
    {
      icon: '💳',
      category: 'Payments & Subscriptions',
      name: form.features?.includes('payments') ? 'Stripe Checkout & Billing' : 'Not Required for MVP',
      reason: form.features?.includes('payments')
        ? 'The global standard for payment gateways, webhook idempotency, customer portals, and PCI-DSS compliance.'
        : 'Payment modules are not required based on your selected features.',
      learningCurve: 'medium',
      community: 'Universal',
      costTier: form.features?.includes('payments') ? 'Pay as you go (2.9% + 30¢)' : 'N/A',
      alternatives: form.features?.includes('payments')
        ? [
            { name: 'Lemon Squeezy', reason: 'Merchant of Record (handles global VAT/tax compliance automatically)' },
            { name: 'Paddle', reason: 'Turnkey SaaS merchant of record with multi-currency checkout' },
          ]
        : [],
    },
    {
      icon: '🤖',
      category: 'AI & Machine Learning',
      name: hasAi ? 'Gemini 3.8 / 1.5 Flash + LangChain' : 'Not Required Initially',
      reason: hasAi
        ? 'Ultra-fast sub-second token generation, multimodal reasoning, and low token cost with native structured JSON mode.'
        : 'No AI features requested in current scope.',
      learningCurve: 'medium',
      community: 'Fastest growing',
      costTier: hasAi ? 'Free tier + Pay-per-token' : 'N/A',
      alternatives: hasAi
        ? [
            { name: 'OpenAI GPT-4o / Realtime', reason: 'Broad developer familiarity and function-calling ecosystem' },
            { name: 'Anthropic Claude 3.5 Sonnet', reason: 'Top-tier code generation and nuanced long-document analysis' },
            { name: 'Ollama / DeepSeek R1', reason: 'Self-hosted open-weights on private hardware for total data privacy' },
          ]
        : [],
    },
  ];

  if (hasRealtime) {
    components.push({
      icon: '⚡',
      category: 'Real-time & WebSockets',
      name: 'Supabase Realtime or Pusher Channels',
      reason: 'Instant bi-directional data subscriptions over WebSockets with zero server cluster maintenance.',
      learningCurve: 'low',
      community: 'Large',
      costTier: 'Free tier ($0–$49/mo)',
      alternatives: [
        { name: 'Socket.io on Node.js', reason: 'Self-hosted WebSocket server with custom clustering' },
        { name: 'Ably', reason: 'Guaranteed message ordering and enterprise SLA delivery' },
      ],
    });
  }

  const whyThisStack: WhyThisStackReason[] = [
    {
      icon: '⚡',
      title: 'Accelerated Time-to-Market',
      description: `This configuration prioritizes zero-friction shipping. With ${isSmallTeam ? 'a lean team' : 'your engineering structure'}, sharing TypeScript between client and database lets you ship in weeks rather than quarters.`,
    },
    {
      icon: '📈',
      title: 'Proven Scalability to 1M+ Users',
      description: 'PostgreSQL combined with edge caching and serverless API routing easily scales from your first 100 users to millions of monthly queries without painful database rewrites.',
    },
    {
      icon: '👥',
      title: 'Highest Global Hiring Liquidity',
      description: 'React, TypeScript, and Node/PostgreSQL represent the largest talent pool on GitHub and LinkedIn. You will never be locked out of finding capable engineers.',
    },
    {
      icon: '💰',
      title: 'Near-Zero Startup Infrastructure Cost',
      description: 'Everything in this recommended stack features generous free tiers (Vercel, Supabase, Cloudflare). You incur zero major fixed server bills until you have active users.',
    },
  ];

  const pros: string[] = [
    'Massive open-source ecosystem: 99% of libraries and edge cases have verified GitHub solutions',
    'Full-stack TypeScript guarantees zero data serialization bugs across client, server, and database',
    'Instant preview deployment URLs for every Git branch accelerate stakeholder reviews',
    'PostgreSQL handles relational queries, JSON documents, and pgvector embeddings under one roof',
    'Zero devops headaches: Automated serverless infrastructure with built-in DDoS and CDN protection',
  ];

  const cons: string[] = [
    'Heavy background computation or long-running video processing requires dedicated worker queues',
    'TypeScript requires strict linting and interface maintenance to prevent loose "any" types',
    'Serverless database connections require connection poolers (e.g. PgBouncer or Supabase Pooler)',
    'Next.js App Router caching mechanisms have a slight learning curve for engineers used to legacy Express',
  ];

  const setupSteps: SetupStep[] = [
    {
      title: 'Install Node.js 20+ and pnpm',
      description: 'Set up your local runtime environment. Using pnpm ensures deterministic lockfiles and speeds up dependency installation by 3x.',
      resources: ['nodejs.org', 'pnpm.io'],
    },
    {
      title: 'Scaffold Next.js 15 Application Skeleton',
      description: 'Initialize with App Router, TypeScript, Tailwind CSS, and strict ESLint rules enabled.',
      resources: ['nextjs.org/docs', 'ui.shadcn.com'],
    },
    {
      title: 'Provision Cloud PostgreSQL & Authentication',
      description: 'Create a managed database project, run your initial schema migration, and test OAuth credentials.',
      resources: ['supabase.com/docs', 'orm.drizzle.team'],
    },
    {
      title: 'Construct Primary Vertical Slice',
      description: 'Build your primary user flow end-to-end (Auth → Database Record Creation → Dashboard View) before adding edge features.',
      resources: ['nextjs.org/learn'],
    },
    {
      title: 'Connect Continuous Deployment Pipeline',
      description: 'Link your GitHub repository to Vercel or Cloud Run with production environment variables and custom domain DNS.',
      resources: ['vercel.com/docs', 'cloudflare.com'],
    },
  ];

  const learningResources: LearningResourceGroup[] = [
    {
      icon: '📺',
      category: 'Interactive Guides & Video',
      resources: [
        'Official Next.js Learn (Free Interactive Course)',
        'Fireship 100-Second Tech Architecture Overviews',
        'Jack Herrington & Theo (Full-Stack Architecture YouTube)',
      ],
    },
    {
      icon: '📚',
      category: 'Documentation & Blueprints',
      resources: [
        'Official Next.js 15 App Router Docs',
        'TypeScript Official Handbook & Cheat Sheets',
        'Prisma & Drizzle Schema Modeling Tutorials',
      ],
    },
    {
      icon: '👥',
      category: 'Developer Communities',
      resources: [
        'Reactiflux Discord (#nextjs, #typescript)',
        'Supabase Community Slack & GitHub Discussions',
        'r/webdev and r/nextjs on Reddit',
      ],
    },
  ];

  const costBreakdown: CostBreakdownItem[] = [
    {
      icon: '🌐',
      category: 'Web Hosting & Edge CDN',
      range: '$0 – $20/mo',
      note: 'Vercel or Cloudflare free tier handles initial MVP traffic. Pro tier is $20/mo.',
    },
    {
      icon: '🗄️',
      category: 'Managed PostgreSQL Database',
      range: '$0 – $25/mo',
      note: 'Supabase or Neon free tier gives up to 500MB storage. Scale tier starts at $25/mo.',
    },
    {
      icon: '🤖',
      category: 'AI & Inference APIs',
      range: hasAi ? '$10 – $75/mo' : '$0/mo',
      note: hasAi ? 'Gemini 1.5 Flash provides high efficiency at cents per 1M tokens.' : 'Not needed for initial build.',
    },
    {
      icon: '💳',
      category: 'Payment Processing',
      range: form.features?.includes('payments') ? '2.9% + 30¢' : '$0/mo',
      note: form.features?.includes('payments') ? 'Strictly per-transaction fee with zero upfront monthly minimums.' : 'N/A',
    },
    {
      icon: '📧',
      category: 'Transactional Email (Resend)',
      range: '$0 – $20/mo',
      note: 'Resend free tier supports 3,000 emails/month. Pro is $20/mo for 50,000 emails.',
    },
    {
      icon: '🛡️',
      category: 'Monitoring & Error Logging',
      range: '$0/mo',
      note: 'Sentry free tier handles up to 5,000 monthly errors with full stack traces.',
    },
  ];

  const nextSteps: NextStepItem[] = [
    {
      title: 'Freeze Technical Scope & Data Schema',
      description: 'Draft an ERD diagram of your core tables (Users, Projects, Billing) to lock down relationships.',
    },
    {
      title: 'Run a 3-Day Proof-of-Concept',
      description: 'Clone a starter template and test the single riskiest feature (e.g. AI prompt chaining or Stripe checkout).',
    },
    {
      title: 'Establish Secrets & CI/CD Guardrails',
      description: 'Store API keys in environment secrets and enable automated linting before team code reviews.',
    },
    {
      title: 'Ship a Production Alpha in 30 Days',
      description: 'Deploy to a live staging URL and put the real application in front of 5 target users for qualitative feedback.',
    },
    {
      title: 'Schedule Architectural Review with AbuQitmirLabs',
      description: 'Partner with senior full-stack and AI engineers to audit vector latency, database indexes, and cloud costs.',
    },
  ];

  const projectLabel = PROJECT_TYPES.find((p) => p.value === form.projectType)?.label || form.projectType || 'Project';

  return {
    stackName,
    summary: `Tailored for your ${projectLabel} with a ${form.teamSize || 'lean'} team and ${form.timeline || 'MVP'} timeline. This architecture balances high developer velocity with low operating costs, allowing you to launch without incurring technical debt.`,
    estimatedSetupTime: isFastTimeline ? '1–2 weeks' : '2–4 weeks',
    difficultyLevel: isBeginner ? 'Beginner-Friendly' : 'Intermediate',
    monthlyCostEstimate: '$0 – $50/mo',
    totalMonthlyCost: '$0 – $50',
    components,
    whyThisStack,
    pros,
    cons,
    setupSteps,
    learningResources,
    costBreakdown,
    nextSteps,
    generatedAt: new Date().toISOString(),
    source: 'algorithmic',
  };
}

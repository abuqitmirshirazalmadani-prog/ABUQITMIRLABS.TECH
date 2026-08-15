import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { YouTubeFacade } from '../components/ui/youtube-facade';
import { 
  Brain, 
  Cpu, 
  Bot, 
  Search, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  Terminal, 
  ShieldCheck, 
  Database, 
  ArrowUpRight, 
  Plus, 
  Layers, 
  Lock, 
  Globe, 
  DollarSign, 
  Heart, 
  Truck, 
  Home, 
  HeartPulse, 
  Scale, 
  Calendar, 
  GraduationCap, 
  Activity, 
  Code2, 
  Smartphone, 
  Palette, 
  PenTool, 
  ExternalLink,
  Workflow,
  TrendingUp,
  FileSearch,
  Users,
  Building2,
  Rocket,
  ShieldAlert,
  Server,
  Network,
  Check,
  HelpCircle,
  X,
  FileText,
  Sliders
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import AIAgentPricing from '../components/AIAgentPricing';

export default function AIAgentDevelopmentPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeComponentId, setActiveComponentId] = useState<string>('brain');

  const faqData = [
    {
      q: "What is AI agent development?",
      a: "AI agent development is the software engineering practice of designing, programming, and deploying autonomous systems powered by large language models (LLMs). Unlike scripted chatbots that match predefined keywords, an AI agent perceives high-level goals, formulates sequential action plans, queries databases, calls external software APIs, and executes multi-step workflows with human oversight."
    },
    {
      q: "How much does AI agent development cost?",
      a: "The cost of developing an AI agent typically ranges from $5,000 to $15,000 for focused, single-purpose workflow automation agents, and $15,000 to $40,000+ for enterprise multi-agent networks with proprietary RAG architectures, custom API middleware, and zero-trust security integrations. Final investment depends on system complexity, tool calling depth, and compliance standards."
    },
    {
      q: "What is the difference between an AI agent and a chatbot?",
      a: "A traditional chatbot is primarily conversational and text-bound—it matches user prompts to static scripts or basic language models. An AI agent is operational and goal-oriented: it maintains context across multi-turn interactions, reasons through sub-tasks, interacts directly with external tools (such as updating CRMs or querying databases), and coordinates complex business workflows."
    },
    {
      q: "Can AI agents connect to CRM and business APIs?",
      a: "Yes. Our AI agents are engineered to connect directly with existing enterprise software via REST APIs, GraphQL, webhooks, SQL/NoSQL databases, and enterprise OAuth protocols. We routinely build integrations for Salesforce, HubSpot, Zendesk, Slack, Microsoft Teams, PostgreSQL, ERP systems, and custom internal software."
    },
    {
      q: "Can you build RAG-powered AI agents?",
      a: "Yes. We engineer enterprise-grade Retrieval-Augmented Generation (RAG) systems that connect agents to your proprietary documents, knowledge bases, SOPs, and vector stores (such as Pinecone, Qdrant, or pgvector). This grounds the agent's reasoning in verified company facts to eliminate hallucinations and provide verifiable source citations."
    },
    {
      q: "Are AI agents suitable for small businesses?",
      a: "Yes. Small businesses often achieve the fastest return on investment by deploying focused agents for repetitive tasks such as 24/7 inbound lead qualification, customer support ticket triage, appointment scheduling, and automated invoice processing. This allows lean teams to handle the operational capacity of much larger organizations without increasing overhead."
    },
    {
      q: "How secure are AI agents?",
      a: "We implement defense-in-depth security principles including least-privilege tool execution, encrypted credential vaults, strict role-based access control (RBAC), prompt injection filtering, and human-in-the-loop approval gates for destructive or financial actions. Your proprietary data is never used to train public foundation models."
    },
    {
      q: "How long does it take to build an AI agent?",
      a: "A focused workflow agent or prototype typically takes 4 to 6 weeks to architect, build, and test. Comprehensive enterprise deployments with deep legacy software integrations, multi-agent coordination swarms, and custom compliance audits generally take 8 to 12 weeks."
    }
  ];

  // 10 Distinct Services matching exact specifications
  const agentServices = [
    {
      id: "custom-agents",
      title: "1. Custom AI Agents",
      icon: <Cpu className="w-6 h-6 text-[#ccff00]" />,
      desc: "Tailored autonomous software agents engineered around your proprietary business logic, operational policies, and custom system rules.",
      outcome: "Eliminates repetitive manual workflows while ensuring 100% adherence to company guidelines."
    },
    {
      id: "workflow-automation",
      title: "2. AI Workflow Automation",
      icon: <Workflow className="w-6 h-6 text-blue-400" />,
      desc: "End-to-end multi-step task execution that connects CRMs, internal databases, ERPs, and cloud SaaS platforms without human bottlenecks.",
      outcome: "Accelerates operational cycle times from days to seconds with zero manual data re-entry."
    },
    {
      id: "llm-powered-agents",
      title: "3. LLM-Powered Agents",
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      desc: "Cognitive reasoning engines built on frontier foundation models (Gemini, Claude, GPT-4, Llama) with structured prompt scaffolding.",
      outcome: "Enables dynamic decision-making, contextual text analysis, and self-evaluating execution logic."
    },
    {
      id: "customer-support-agents",
      title: "4. AI Customer Support Agents",
      icon: <MessageSquare className="w-6 h-6 text-emerald-400" />,
      desc: "24/7 resolution-oriented support agents that verify customer accounts, diagnose issues, query order databases, and process ticket resolutions.",
      outcome: "Resolves 60–80% of common customer inquiries instantly while cleanly escalating edge cases."
    },
    {
      id: "sales-agents",
      title: "5. AI Sales Agents",
      icon: <TrendingUp className="w-6 h-6 text-amber-400" />,
      desc: "Automated inbound lead qualification, prospect background research, personalized follow-ups, and calendar booking integrated with your CRM.",
      outcome: "Shortens lead response times to under two minutes and increases discovery call booking rates."
    },
    {
      id: "research-agents",
      title: "6. AI Research Agents",
      icon: <FileSearch className="w-6 h-6 text-cyan-400" />,
      desc: "Autonomous multi-source intelligence gathering, web data extraction, competitive analysis, and structured report synthesis.",
      outcome: "Compiles deep market and competitive intelligence dossiers in minutes rather than days of manual browsing."
    },
    {
      id: "internal-copilots",
      title: "7. Internal AI Copilots",
      icon: <Users className="w-6 h-6 text-rose-400" />,
      desc: "Employee productivity assistants embedded into Slack or Microsoft Teams to search company wikis, draft briefs, and trigger internal tasks.",
      outcome: "Empowers team members to instantly find operational knowledge and automate routine internal requests."
    },
    {
      id: "rag-knowledge-agents",
      title: "8. RAG-Powered Knowledge Agents",
      icon: <Database className="w-6 h-6 text-teal-400" />,
      desc: "Retrieval-Augmented Generation architectures indexing unstructured PDFs, contracts, and technical manuals into high-speed vector stores.",
      outcome: "Delivers factual, hallucination-free answers backed by verifiable source citations."
    },
    {
      id: "api-crm-integrations",
      title: "9. API & CRM Integrations",
      icon: <Layers className="w-6 h-6 text-indigo-400" />,
      desc: "Secure middleware and webhook connectors linking autonomous agents directly to Salesforce, HubSpot, Stripe, PostgreSQL, and custom databases.",
      outcome: "Creates real-time bidirectional synchronization between cognitive agents and core business records."
    },
    {
      id: "multi-agent-systems",
      title: "10. Multi-Agent Systems",
      icon: <Network className="w-6 h-6 text-[#ccff00]" />,
      desc: "Collaborative networks of specialized agents communicating via supervisor-worker protocols to execute complex, multi-department enterprise workflows.",
      outcome: "Enables distributed problem-solving where specialized agents review, validate, and execute complex workflows."
    }
  ];

  // Practical Automation Workflows
  const automationWorkflows = [
    {
      title: "Customer Support Resolution",
      desc: "Verifying user identity, querying order status in PostgreSQL, issuing refund authorizations within predefined limits, and updating helpdesk tickets in Zendesk.",
      example: "Inbound ticket received → User authenticated via API → Order status retrieved → Refund processed → Confirmation email sent."
    },
    {
      title: "Inbound Lead Qualification",
      desc: "Evaluating incoming form submissions against ideal customer profile (ICP) criteria, querying LinkedIn/Clearbit for firmographic data, and booking discovery meetings.",
      example: "Website inquiry → Company revenue verified → Match score calculated → Personalized email drafted → Calendar invite booked."
    },
    {
      title: "Automated Sales Follow-Up",
      desc: "Monitoring prospect interaction signals, drafting contextually tailored follow-up sequences based on previous call notes, and updating CRM deal stages in HubSpot.",
      example: "No response after 48h → Call transcript analyzed → Tailored case study linked → CRM activity logged."
    },
    {
      title: "Document Processing & Extraction",
      desc: "Parsing unstructured PDFs, invoices, shipping manifests, and legal agreements to extract key metadata, validate line-item totals, and populate ERP systems.",
      example: "Vendor invoice uploaded → Line items extracted via OCR/LLM → PO match validated → ERP ledger updated."
    },
    {
      title: "Internal Knowledge Retrieval (RAG)",
      desc: "Empowering employees to query complex engineering documentation, HR policies, and standard operating procedures with direct page-level citations.",
      example: "Employee asks compliance question → Vector database queried → Top 3 policy excerpts retrieved → Cited answer generated."
    },
    {
      title: "CRM Updates & Data Sync",
      desc: "Extracting action items, key milestones, and sentiment from sales call recordings or client email threads, and synchronizing records across Salesforce and Slack.",
      example: "Client email thread received → Action items extracted → Deal stage updated in CRM → Slack notification sent to team."
    },
    {
      title: "Database Synchronization",
      desc: "Comparing records across fragmented legacy systems, detecting formatting discrepancies, standardizing data formats, and reconciling discrepancies automatically.",
      example: "Inventory updated in warehouse database → Discrepancy flagged → Reconciled against Shopify store → Ledger synced."
    },
    {
      title: "Autonomous Market Research",
      desc: "Crawling public industry filings, competitor pricing pages, and product changelogs, synthesizing trends into structured markdown executive summaries.",
      example: "Weekly competitor crawl initiated → Pricing changes detected → Comparative matrix compiled → Brief sent to leadership."
    },
    {
      title: "Automated Business Analytics & Reporting",
      desc: "Aggregating metrics across Google Analytics, Stripe billing data, and SQL data warehouses to generate automated weekly executive KPI performance reports.",
      example: "End of week trigger → SQL metrics queried → Anomalies identified → Executive report rendered in PDF."
    },
    {
      title: "Administrative Email Triage",
      desc: "Categorizing high-volume inbox communications, identifying urgent client escalations, auto-drafting responses for team review, and assigning tasks in Asana.",
      example: "Inbound email received → Intent classified → Urgent task created in Asana → Draft response queued for approval."
    }
  ];

  // 8-Step Lifecycle
  const processSteps = [
    {
      step: "01",
      title: "Discovery & Scope",
      desc: "We analyze your existing business operations to identify high-ROI bottlenecks where autonomous agents deliver measurable efficiency gains."
    },
    {
      step: "02",
      title: "Workflow Analysis",
      desc: "We map system inputs, decision branching logic, required data schemas, API endpoints, and human-in-the-loop approval thresholds."
    },
    {
      step: "03",
      title: "Architecture Design",
      desc: "We select the optimal foundation LLMs, design short/long-term memory layers, structure tool calling schemas, and establish strict security guardrails."
    },
    {
      step: "04",
      title: "Agent Development",
      desc: "Our engineers program cognitive execution loops, structured output validators, reasoning planners, and custom context retrieval pipelines."
    },
    {
      step: "05",
      title: "API & System Integration",
      desc: "We connect the agent directly to your existing tech stack—CRMs, SQL databases, cloud storage, webhooks, and communication tools."
    },
    {
      step: "06",
      title: "Testing & Evaluation",
      desc: "We perform automated benchmark testing for reasoning accuracy, latency optimization, prompt injection resilience, and edge-case recovery."
    },
    {
      step: "07",
      title: "Secure Deployment",
      desc: "We deploy the agent to secure cloud infrastructure (AWS, Azure, GCP, or private VPCs) with enterprise role-based access control."
    },
    {
      step: "08",
      title: "Monitoring & Optimization",
      desc: "We track execution telemetry, audit multi-step reasoning traces, and continually optimize prompt schemas to lower token costs and latency."
    }
  ];

  // Comparison Matrix Data
  const comparisonMatrix = [
    {
      feature: "Goal Orientation",
      chatbot: "Follows rigid, pre-scripted conversational decision trees.",
      agent: "Breaks complex, high-level objectives into sequential execution sub-tasks."
    },
    {
      feature: "Tool & API Execution",
      chatbot: "Limited to returning pre-written text answers or static links.",
      agent: "Actively calls external REST APIs, executes database queries, and triggers workflows."
    },
    {
      feature: "Workflow Execution",
      chatbot: "Single-turn conversational question-and-answer exchanges.",
      agent: "Coordinates multi-step actions across disparate third-party enterprise platforms."
    },
    {
      feature: "Context & Memory",
      chatbot: "Short-term conversational buffer; forgets context after session.",
      agent: "Maintains working state plus persistent semantic memory via vector databases."
    },
    {
      feature: "Multi-Step Coordination",
      chatbot: "Fails when customer requests cross-department actions.",
      agent: "Can delegate sub-tasks across specialized agent swarms with supervisor oversight."
    },
    {
      feature: "Human Escalation & Approval",
      chatbot: "Abrupt fallback: 'I didn't understand that, let me connect you.'",
      agent: "Gathers full operational context, performs initial work, and requests approval only for sensitive actions."
    },
    {
      feature: "Error Handling & Recovery",
      chatbot: "Stops completely or repeats default error response.",
      agent: "Evaluates intermediate tool outputs, self-corrects invalid parameters, and tries alternative paths."
    }
  ];

  // Business Tiers
  const businessTiers = [
    {
      segment: "Startups",
      headline: "Lean Automation & Rapid Scaling",
      desc: "Deploy focused AI agents to handle 24/7 customer onboarding, initial lead qualification, and user support without expanding operational headcount.",
      points: ["Rapid time-to-market (3–4 weeks)", "API-first modular architecture", "Affordable expansion as revenue scales"]
    },
    {
      segment: "Small Businesses",
      headline: "Operational Efficiency & Time Recovery",
      desc: "Automate repetitive customer inquiries, appointment bookings, quote generation, and routine invoice reconciliation to recover hundreds of employee hours monthly.",
      points: ["24/7 instant customer responsiveness", "Reduced administrative burden", "Direct CRM & QuickBooks synchronization"]
    },
    {
      segment: "Growing Companies",
      headline: "Cross-Department System Orchestration",
      desc: "Unify fragmented software silos with multi-step workflow agents coordinating tasks between sales, customer success, finance, and engineering.",
      points: ["Eliminates manual data re-entry", "Custom RAG knowledge search across company wikis", "Multi-tool autonomous execution"]
    },
    {
      segment: "Enterprise Teams",
      headline: "Secure Multi-Agent Infrastructure",
      desc: "Architect enterprise-grade collaborative agent networks with zero-trust security, strict data isolation, role-based access control, and full audit logging.",
      points: ["Private VPC & on-prem deployment options", "Zero-data retention for model training", "SOC2 / GDPR compliance-ready architecture"]
    }
  ];

  // Core Technical Components
  const coreComponents = [
    {
      id: 'brain',
      icon: <Brain className="w-8 h-8 text-[#ccff00]" />,
      title: "Foundation Model & Reasoning Engine",
      subtitle: "COGNITIVE FOUNDATION LAYER",
      desc: "The large language model (LLM) provides natural language comprehension, logical reasoning, and task decomposition. We select and tune models from Google Gemini, Anthropic Claude, OpenAI, and open-source models like Llama.",
      included: [
        "Model Selection: Choosing optimal LLMs based on latency, token costs, and reasoning requirements",
        "API Integration: Configuring resilient endpoints, managing rate limits, and handling retries",
        "System Prompt Scaffolding: Structuring deterministic instructions, role definitions, and output schemas",
        "Fine-Tuning & Quantization: Custom domain tuning for high accuracy in specialized industries"
      ],
      required: "Model API keys, parameter optimization (temperature, top_p), and cost control monitoring."
    },
    {
      id: 'orchestrator',
      icon: <Cpu className="w-8 h-8 text-[#ccff00]" />,
      title: "Planning & Execution Orchestrator",
      subtitle: "BEHAVIOR & FLOW COORDINATOR",
      desc: "The central orchestration engine manages agent behavior, formulates multi-step execution plans, determines when to invoke tools, and verifies task completion.",
      included: [
        "Task Planning Module: Breaks high-level objectives into ordered execution sequences",
        "State Management: Tracks execution progress, intermediate variables, and tool responses",
        "Self-Reflection & Evaluation: Audits tool outputs before finalizing actions",
        "Supervisor Delegation: Routes sub-tasks to specialized domain agents in multi-agent swarms"
      ],
      required: "Orchestration frameworks (LangChain, LlamaIndex, CrewAI, AutoGen) and stateful execution engines."
    },
    {
      id: 'actions',
      icon: <Zap className="w-8 h-8 text-[#ccff00]" />,
      title: "Tools, Plugins & API Connectors",
      subtitle: "SYSTEM EXECUTION LAYER",
      desc: "Tools enable the agent to interact with the real world—querying databases, updating CRMs, triggering webhooks, sending transactional emails, and calling external APIs.",
      included: [
        "Structured Tool Schemas: JSON-schema definitions for deterministic function calling",
        "Middleware Connectors: Secure interfaces to Salesforce, HubSpot, Stripe, Slack, and PostgreSQL",
        "Webhook Listeners: Real-time event triggers for incoming web events and asynchronous updates"
      ],
      required: "REST APIs, GraphQL endpoints, SQL connectors, OAuth 2.0 authentication, and token vaults."
    },
    {
      id: 'memory',
      icon: <Database className="w-8 h-8 text-[#ccff00]" />,
      title: "Retrieval & Memory Infrastructure (RAG)",
      subtitle: "REAL-TIME GROUNDING LAYER",
      desc: "The memory layer supplies the agent with short-term working context and long-term historical knowledge. This provides the single source of truth for all decisions.",
      included: [
        "Vector Databases: High-speed semantic search using Pinecone, Qdrant, Milvus, or pgvector",
        "Retrieval-Augmented Generation (RAG): Semantic chunking and retrieval of internal documents",
        "Session State: Short-term conversation history and working memory cache"
      ],
      required: "Document parsing pipelines, embedding models, vector indexing, and data freshness pipelines."
    },
    {
      id: 'security',
      icon: <ShieldCheck className="w-8 h-8 text-[#ccff00]" />,
      title: "Security, Guardrails & Governance",
      subtitle: "ENTERPRISE DEFENSE LAYER",
      desc: "Critical safety controls to protect sensitive business data, prevent prompt injection attacks, enforce role-based access, and maintain regulatory compliance.",
      included: [
        "Least-Privilege Tool Access: Restricts agent capabilities to strictly authorized actions",
        "Prompt Injection Defense: Sanitizes user inputs and verifies instructions before execution",
        "Human-in-the-Loop Gates: Requires manual approval for destructive or financial operations",
        "Audit Logging: Comprehensive logging of every prompt, tool call, and decision trace"
      ],
      required: "IAM roles, encrypted credential vaults, PII masking middleware, and compliance monitoring."
    },
    {
      id: 'observability',
      icon: <Server className="w-8 h-8 text-[#ccff00]" />,
      title: "Observability & Scalable Cloud Hosting",
      subtitle: "PRODUCTION INFRASTRUCTURE",
      desc: "The deployment environment and monitoring stack that ensures low latency, 99.9% uptime, and complete visibility into agent operations under enterprise workloads.",
      included: [
        "Cloud Hosting: Containerized microservices on AWS, Azure, GCP, or private VPCs",
        "Distributed Tracing: Real-time monitoring of LLM latency, token consumption, and errors",
        "Automated CI/CD: Testing pipelines for prompt regression and system resilience"
      ],
      required: "Docker containerization, Prometheus/OpenTelemetry tracking, and scalable serverless compute."
    }
  ];

  return (
    <div id="ai-agent-development-root" className="bg-[#000000] text-slate-100 font-sans antialiased overflow-x-hidden min-h-screen relative selection:bg-[#ccff00]/30 selection:text-white">
      {/* Skip to Content Accessible Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#ccff00] focus:text-black focus:font-bold focus:rounded-md focus:shadow-lg"
      >
        Skip to content
      </a>

      <Helmet>
        <title>AI Agent Development Company | AbuQitmirLabs</title>
        <meta name="description" content="AbuQitmirLabs builds bespoke autonomous AI agents, multi-agent workflows, and secure LLM integrations for intelligent, end-to-end business automation." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/ai-agent-development" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Agent Development Company | AbuQitmirLabs" />
        <meta property="og:description" content="AbuQitmirLabs builds bespoke autonomous AI agents, multi-agent workflows, and secure LLM integrations for intelligent, end-to-end business automation." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/ai-agent-development" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Agent Development Company | AbuQitmirLabs" />
        <meta name="twitter:description" content="AbuQitmirLabs builds bespoke autonomous AI agents, multi-agent workflows, and secure LLM integrations for intelligent, end-to-end business automation." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />
        
        {/* JSON-LD Schema @graph */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.abuqitmirlabs.tech/#organization",
                  "name": "AbuQitmirLabs",
                  "url": "https://www.abuqitmirlabs.tech",
                  "logo": {
                    "@type": "ImageObject",
                    "@id": "https://www.abuqitmirlabs.tech/#logo",
                    "url": "https://www.abuqitmirlabs.tech/logo.png",
                    "caption": "AbuQitmirLabs Logo"
                  },
                  "telephone": "+923233260859",
                  "email": "hello@abuqitmirlabs.tech",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "8/15, 3 37A Rd, Shah Khalid Colony, Sector 37A",
                    "addressLocality": "Landhi Town, Karachi",
                    "postalCode": "75160",
                    "addressCountry": "PK"
                  },
                  "sameAs": [
                    "https://www.facebook.com/profile.php?id=61583768706452",
                    "https://www.instagram.com/abuqitmirshirazalmadani/",
                    "https://www.youtube.com/@AbuQitmir",
                    "https://www.linkedin.com/in/abu-qitmir-697423390/",
                    "https://x.com/AbuQitmir",
                    "https://www.pinterest.com/abuqitmir",
                    "https://www.quora.com/profile/Abu-Qitmir-Mohammad-Shiraz-Al-Madani",
                    "https://www.goodfirms.co/company/abuqitmirlabs-tech",
                    "https://clutch.co/profile/abuqitmirlabstech"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+923233260859",
                    "contactType": "customer service",
                    "email": "hello@abuqitmirlabs.tech",
                    "availableLanguage": ["English", "Urdu"]
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.abuqitmirlabs.tech/#website",
                  "url": "https://www.abuqitmirlabs.tech",
                  "name": "AbuQitmirLabs",
                  "publisher": {
                    "@id": "https://www.abuqitmirlabs.tech/#organization"
                  }
                },
                {
                  "@type": "WebPage",
                  "@id": "https://www.abuqitmirlabs.tech/ai-agent-development#webpage",
                  "url": "https://www.abuqitmirlabs.tech/ai-agent-development",
                  "name": "AI Agent Development Company | AbuQitmirLabs",
                  "description": "AbuQitmirLabs builds bespoke autonomous AI agents, multi-agent workflows, and secure LLM integrations for intelligent, end-to-end business automation.",
                  "isPartOf": {
                    "@id": "https://www.abuqitmirlabs.tech/#website"
                  },
                  "about": {
                    "@id": "https://www.abuqitmirlabs.tech/ai-agent-development#service"
                  },
                  "breadcrumb": {
                    "@id": "https://www.abuqitmirlabs.tech/ai-agent-development#breadcrumb"
                  }
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.abuqitmirlabs.tech/ai-agent-development#breadcrumb",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://www.abuqitmirlabs.tech"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "AI Agent Development",
                      "item": "https://www.abuqitmirlabs.tech/ai-agent-development"
                    }
                  ]
                },
                {
                  "@type": "Service",
                  "@id": "https://www.abuqitmirlabs.tech/ai-agent-development#service",
                  "name": "AI Agent Development Services",
                  "serviceType": "AI Agent Development and Workflow Automation",
                  "provider": {
                    "@id": "https://www.abuqitmirlabs.tech/#organization"
                  },
                  "description": "Custom AI agent engineering services covering autonomous workflow automation, multi-agent systems, RAG implementation, and enterprise LLM integrations.",
                  "areaServed": ["US", "UK", "CA", "AU", "PL", "PK"],
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "AI Agent Engineering Offerings",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Custom AI Agents",
                          "description": "Tailored autonomous systems engineered around proprietary operational logic and business policies."
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "AI Workflow Automation",
                          "description": "End-to-end multi-step task execution connecting CRMs, databases, and third-party SaaS platforms."
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Multi-Agent Systems",
                          "description": "Collaborative networks of specialized agents communicating and delegating tasks to execute complex enterprise workflows."
                        }
                      }
                    ]
                  }
                },
                {
                  "@type": "HowTo",
                  "@id": "https://www.abuqitmirlabs.tech/ai-agent-development#process",
                  "name": "How We Build AI Agents",
                  "description": "An 8-step engineering lifecycle for designing, building, integrating, and optimizing autonomous AI agents.",
                  "step": processSteps.map((step, index) => ({
                    "@type": "HowToStep",
                    "position": index + 1,
                    "name": step.title,
                    "text": step.desc
                  }))
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://www.abuqitmirlabs.tech/ai-agent-development#faq",
                  "mainEntity": faqData.map(item => ({
                    "@type": "Question",
                    "name": item.q,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": item.a
                    }
                  }))
                }
              ]
            })
          }}
        />
      </Helmet>

      {/* Decorative Ambient Backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <div className="absolute top-[15%] left-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] bg-[#ccff00]/5 rounded-full blur-[180px]" />
      </div>

      <Header />
      <Breadcrumbs />

      {/* Main Landmark */}
      <main id="main-content" className="relative z-10">

        {/* Hero Section */}
        <section id="ai-agent-hero" className="relative pt-20 md:pt-28 pb-20 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="text-center relative z-10 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#ccff00] font-mono tracking-widest uppercase mb-8"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" /> 
                Autonomous Systems & Cognitive Engineering
              </motion.div>

              {/* Exact H1 required */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-tight text-white mb-8 leading-[1.1]"
              >
                AI Agent Development Company <br className="hidden sm:inline" />
                <span className="italic font-serif text-[#ccff00] font-normal">for Smarter Automation</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="mx-auto mt-6 max-w-3xl text-base md:text-xl leading-relaxed text-slate-300 font-light font-sans"
              >
                AbuQitmirLabs engineers custom autonomous AI agents, multi-agent swarms, and intelligent workflows that execute real business operations. We build goal-oriented software that connects directly to your databases, APIs, and business systems to eliminate operational friction.
              </motion.p>

              {/* Core Deliverables Quick-Bar */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mx-auto mt-10 max-w-3xl border-y border-white/10 py-6 px-4 bg-white/[0.01]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
                  {[
                    "Custom RAG & Memory Architectures",
                    "Multi-Step Tool & API Orchestration",
                    "Direct CRM & Database Connectors",
                    "Deterministic Security & Guardrails",
                    "Private VPC & Cloud Deployments",
                    "100% Client Code & Data Ownership"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#ccff00] shrink-0" />
                      <span className="text-xs font-sans text-slate-300 font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Hero Call-to-Actions */}
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-slate-200 text-black font-bold uppercase rounded-xl tracking-wider text-xs transition duration-200 shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                >
                  <span>Discuss Your AI Agent</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <a 
                  href="#what-is-ai-agent-development"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold uppercase rounded-xl tracking-wider text-xs border border-white/10 transition duration-200"
                >
                  <span>Explore Capabilities</span>
                  <ArrowUpRight className="w-4 h-4 text-[#ccff00]" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Global Markets Marquee */}
        <CountryMarquee />

        {/* Section 1: What Is AI Agent Development? */}
        <section 
          id="what-is-ai-agent-development" 
          aria-labelledby="heading-what-is-ai-agent-development"
          className="py-28 md:py-36 bg-black px-6 border-t border-white/10"
        >
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-bold block mb-4">
                [ CORE DEFINITION & CONCEPTS ]
              </span>
              <h2 
                id="heading-what-is-ai-agent-development"
                className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight mb-8"
              >
                What Is AI Agent Development?
              </h2>

              {/* Answer-First Box for AEO / GEO / Google Featured Snippets */}
              <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-[#ccff00]/40 shadow-[0_0_30px_rgba(204,255,0,0.04)] mb-8">
                <p className="text-lg md:text-xl text-white font-sans font-normal leading-relaxed">
                  <strong>AI agent development</strong> is the engineering process of building software systems that understand goals, make decisions, execute tools, and complete multi-step business workflows autonomously with human oversight where necessary.
                </p>
              </div>

              <p className="text-slate-300 font-light text-base md:text-lg leading-relaxed font-sans mb-6">
                An AI agent breaks a high-level goal into logical steps, uses connected tools (such as software APIs, SQL queries, and webhooks), and executes a complete workflow while maintaining operational context. Unlike a traditional chatbot that simply matches pre-written conversational scripts or generates basic textual replies, an autonomous AI agent acts on real-world systems to perform work.
              </p>

              <p className="text-slate-400 font-light text-base leading-relaxed font-sans mb-6">
                AI agents integrate large language models (LLMs) with custom tool definitions, memory layers, and deterministic security guardrails. When connected with <Link to="/custom-software" className="text-[#ccff00] hover:underline font-medium">custom software development</Link> or scalable <Link to="/web-development" className="text-[#ccff00] hover:underline font-medium">web development services</Link>, agents transform manual operational bottlenecks into continuous, automated pipelines.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "1. Goal-Oriented Reasoning",
                  desc: "Decomposes complex objectives into structured execution plans, evaluating intermediate outcomes to achieve the final goal.",
                  icon: <Brain className="w-6 h-6 text-[#ccff00]" />
                },
                {
                  title: "2. Tool & API Execution",
                  desc: "Calls REST APIs, runs database queries, reads files, and updates CRMs autonomously without manual intervention.",
                  icon: <Zap className="w-6 h-6 text-blue-400" />
                },
                {
                  title: "3. Context & Persistent Memory",
                  desc: "Maintains working state across multi-turn interactions and retrieves factual records using vector knowledge stores (RAG).",
                  icon: <Database className="w-6 h-6 text-purple-400" />
                },
                {
                  title: "4. Human-in-the-Loop Gates",
                  desc: "Enforces deterministic boundaries, role permissions, and requires explicit human sign-off for financial or destructive actions.",
                  icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />
                }
              ].map((pillar, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      {pillar.icon}
                    </div>
                    <h3 className="text-base font-bold text-white uppercase tracking-tight mb-3 font-sans">{pillar.title}</h3>
                    <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed font-sans">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: AI Agent Development Services (10 Services) */}
        <section 
          id="ai-agent-development-services" 
          aria-labelledby="heading-agent-services"
          className="py-28 md:py-36 bg-[#050505] px-6 border-t border-white/10"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-[0.3em] font-bold block mb-4">
                [ FULL-SPECTRUM CAPABILITIES ]
              </span>
              <h2 
                id="heading-agent-services"
                className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight mb-6"
              >
                AI Agent Development Services
              </h2>
              <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed font-sans">
                We engineer intelligent software agents tailored to your business operations. Every agent is developed as production-grade custom software with clean code and complete client ownership.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agentServices.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:border-[#ccff00]/40 transition-colors duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-3 font-sans group-hover:text-[#ccff00] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-300 font-light leading-relaxed font-sans mb-6">
                      {service.desc}
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">Business Outcome //</span>
                    <p className="text-xs text-[#ccff00] font-sans font-light leading-relaxed">{service.outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: What Can AI Agents Automate? */}
        <section 
          id="what-ai-agents-automate" 
          aria-labelledby="heading-automation-workflows"
          className="py-28 md:py-36 bg-black px-6 border-t border-white/10"
        >
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-bold block mb-4">
                [ PRACTICAL BUSINESS APPLICATIONS ]
              </span>
              <h2 
                id="heading-automation-workflows"
                className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight mb-6"
              >
                What Can AI Agents Automate?
              </h2>
              <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed font-sans">
                Modern AI agents deliver tangible commercial value by automating multi-step operational tasks that typically consume substantial employee time. Here are real-world workflows we engineer:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {automationWorkflows.map((workflow, idx) => (
                <div 
                  key={idx}
                  className="bg-white/[0.015] border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-white/20 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-[#ccff00] font-bold">WORKFLOW // 0{idx + 1}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-3 font-sans">
                      {workflow.title}
                    </h3>
                    <p className="text-sm text-slate-300 font-light leading-relaxed font-sans mb-6">
                      {workflow.desc}
                    </p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider block mb-1">Execution Trace //</span>
                    <p className="text-xs text-slate-300 font-mono font-light leading-relaxed">{workflow.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: AI Agents vs Traditional Chatbots (Comparison Table) */}
        <section 
          id="ai-agents-vs-chatbots" 
          aria-labelledby="heading-comparison"
          className="py-28 md:py-36 bg-[#040404] px-6 border-t border-white/10"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-[0.3em] font-bold block mb-4">
                [ ARCHITECTURAL COMPARISON ]
              </span>
              <h2 
                id="heading-comparison"
                className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight mb-6"
              >
                AI Agents vs Traditional Chatbots
              </h2>
              <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed font-sans">
                Understanding the architectural distinction between passive conversational chatbots and goal-oriented autonomous software agents.
              </p>
            </div>

            {/* Responsive Comparison Table */}
            <div className="border border-white/10 rounded-3xl overflow-hidden bg-white/[0.015]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03]">
                      <th className="py-5 px-6 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold w-1/4">
                        Capability
                      </th>
                      <th className="py-5 px-6 text-xs font-mono uppercase tracking-wider text-rose-400 font-bold w-3/8">
                        Traditional Chatbot
                      </th>
                      <th className="py-5 px-6 text-xs font-mono uppercase tracking-wider text-[#ccff00] font-bold w-3/8">
                        Autonomous AI Agent
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm font-sans">
                    {comparisonMatrix.map((row, index) => (
                      <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-5 px-6 font-bold text-white font-sans text-sm">
                          {row.feature}
                        </td>
                        <td className="py-5 px-6 text-slate-400 font-light leading-relaxed">
                          <div className="flex items-start gap-2">
                            <X className="w-4 h-4 text-rose-500/80 shrink-0 mt-0.5" />
                            <span>{row.chatbot}</span>
                          </div>
                        </td>
                        <td className="py-5 px-6 text-slate-200 font-light leading-relaxed bg-[#ccff00]/[0.01]">
                          <div className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                            <span>{row.agent}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center max-w-3xl mx-auto">
              <p className="text-xs md:text-sm text-slate-400 font-light font-sans leading-relaxed">
                <strong className="text-white">Engineering Note:</strong> Autonomous AI agents are not magic or infallible; they are disciplined software architectures. By implementing deterministic tool schemas, parameter validation, and human approval checkpoints, we ensure agents operate safely and reliably in production environments.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Demonstration / Video Section */}
        <section className="py-24 bg-zinc-950 px-6 border-t border-white/10" id="case-study-demo">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-bold block mb-3">
                [ PRODUCTION ARCHITECTURE DEMO ]
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-white tracking-tight leading-tight">
                AI Agent Architecture in Action
              </h2>
              <p className="mt-3 text-slate-400 font-light text-sm max-w-xl mx-auto font-sans">
                A video walkthrough showcasing multi-step task decomposition, external tool invocation, and deterministic guardrails.
              </p>
            </div>
            
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-[0_0_40px_rgba(204,255,0,0.03)]">
              <YouTubeFacade videoId="B31EXmt5LrQ" title="AbuQitmirLabs AI Agent Engineering Walkthrough" />
            </div>
          </div>
        </section>

        {/* Section 4: How We Build AI Agents (8-Step Engineering Lifecycle) */}
        <section 
          id="how-we-build-ai-agents" 
          aria-labelledby="heading-agent-process"
          className="py-28 md:py-36 bg-black px-6 border-t border-white/10"
        >
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-bold block mb-4">
                [ 8-STEP LIFECYCLE ]
              </span>
              <h2 
                id="heading-agent-process"
                className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight mb-6"
              >
                How We Build AI Agents
              </h2>
              <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed font-sans">
                We follow a rigorous, eight-step software engineering process to ensure every AI agent delivers measurable ROI, adheres to enterprise security standards, and integrates cleanly with your existing software stack.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, idx) => (
                <div 
                  key={idx}
                  className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative flex flex-col justify-between hover:border-[#ccff00]/40 transition-colors"
                >
                  <div>
                    <span className="text-3xl font-mono font-bold text-white/10 block mb-4">
                      {step.step}
                    </span>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-3 font-sans">
                      {step.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: AI Agent Architecture Deep Dive */}
        <section id="ai-agent-architecture" className="py-28 md:py-36 bg-[#040404] relative z-10 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-20 text-center">
              <span className="text-xs font-mono text-blue-400 mb-4 uppercase tracking-[0.3em] font-bold block">
                [ MODULAR SYSTEM ARCHITECTURE ]
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight uppercase leading-tight mb-6">
                AI Agent <span className="font-serif italic text-[#ccff00]">Architecture</span>
              </h2>
              <p className="text-base text-slate-400 max-w-2xl mx-auto font-light leading-relaxed font-sans">
                Every AI agent we deploy is composed of modular layers designed for high reliability, low latency, and enterprise data security.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreComponents.map((comp) => (
                <div 
                  key={comp.id}
                  onClick={() => setActiveComponentId(comp.id)}
                  className={`border rounded-3xl p-8 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    activeComponentId === comp.id 
                      ? 'bg-white/[0.04] border-[#ccff00]/50 shadow-[0_0_30px_rgba(204,255,0,0.05)]' 
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="mb-6 w-14 h-14 bg-black border border-white/10 rounded-xl flex items-center justify-center">
                      {comp.icon}
                    </div>
                    
                    <span className="text-[10px] font-mono text-[#ccff00] mb-2 uppercase tracking-widest font-bold block">
                      {comp.subtitle}
                    </span>
                    <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-3 font-sans">
                      {comp.title}
                    </h3>
                    <p className="text-slate-400 text-xs md:text-sm font-light font-sans leading-relaxed mb-6">
                      {comp.desc}
                    </p>

                    <div className="border-t border-white/10 pt-4 mb-4">
                      <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-wider mb-2 font-bold">Capabilities //</span>
                      <ul className="space-y-2">
                        {comp.included.map((inc, i) => (
                          <li key={i} className="text-xs text-slate-300 font-sans font-light flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#ccff00] shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 mt-4">
                    <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-wider mb-1 font-bold">Technical Requirements //</span>
                    <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
                      {comp.required}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: AI Agents for Different Business Sizes */}
        <section 
          id="ai-agents-for-business-sizes" 
          aria-labelledby="heading-business-sizes"
          className="py-28 md:py-36 bg-black px-6 border-t border-white/10"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-bold block mb-4">
                [ BUSINESS FIT & SCALING ]
              </span>
              <h2 
                id="heading-business-sizes"
                className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight mb-6"
              >
                AI Agents for Different Business Sizes
              </h2>
              <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed font-sans">
                From high-growth startups to distributed enterprises, our agent architectures match the specific operational complexity of your organization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {businessTiers.map((tier, idx) => (
                <div 
                  key={idx}
                  className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col justify-between hover:border-white/20 transition-colors"
                >
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#ccff00] uppercase tracking-widest mb-4">
                      {tier.segment}
                    </div>
                    <h3 className="text-2xl font-serif font-light text-white mb-4">
                      {tier.headline}
                    </h3>
                    <p className="text-slate-300 font-light text-sm leading-relaxed font-sans mb-6">
                      {tier.desc}
                    </p>
                    <div className="space-y-2.5 border-t border-white/10 pt-4">
                      {tier.points.map((pt, pi) => (
                        <div key={pi} className="flex items-center gap-2.5">
                          <Check className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
                          <span className="text-xs text-slate-400 font-sans">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Security & Reliability in AI Agent Engineering */}
        <section 
          id="security-and-reliability" 
          aria-labelledby="heading-security"
          className="py-28 md:py-36 bg-[#050505] px-6 border-t border-white/10"
        >
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-[0.3em] font-bold block mb-4">
                [ DEFENSE-IN-DEPTH GOVERNANCE ]
              </span>
              <h2 
                id="heading-security"
                className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight mb-6"
              >
                Security & Reliability in AI Agent Engineering
              </h2>
              <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed font-sans">
                Deploying autonomous software into production requires strict security engineering. We implement pragmatic, zero-trust controls across every layer of the stack:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Least-Privilege Tool Access",
                  desc: "Agents are provisioned with granular, scoped permissions. An agent reading support tickets cannot modify underlying customer billing records.",
                  icon: <Lock className="w-5 h-5 text-emerald-400" />
                },
                {
                  title: "Prompt Injection Mitigation",
                  desc: "Rigorous input sanitization, delimiter isolation, and multi-stage evaluation loops protect against malicious prompt overrides.",
                  icon: <ShieldAlert className="w-5 h-5 text-amber-400" />
                },
                {
                  title: "Data Isolation & Privacy",
                  desc: "Zero-data retention agreements with model providers ensure your proprietary company records are never used to train public LLMs.",
                  icon: <Database className="w-5 h-5 text-blue-400" />
                },
                {
                  title: "Human-in-the-Loop Validation",
                  desc: "Configurable approval checkpoints require human sign-off before the agent executes destructive actions or financial transactions.",
                  icon: <Users className="w-5 h-5 text-purple-400" />
                },
                {
                  title: "Comprehensive Audit Logging",
                  desc: "Full execution traces, prompt snapshots, API payloads, and reasoning chains are immutably logged for compliance and debugging.",
                  icon: <FileText className="w-5 h-5 text-cyan-400" />
                },
                {
                  title: "Rate Limiting & Cost Ceilings",
                  desc: "Deterministic rate limiters, token budget caps, and recursion timeouts prevent infinite loops and runaway compute expenses.",
                  icon: <Sliders className="w-5 h-5 text-rose-400" />
                }
              ].map((sec, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                      {sec.icon}
                    </div>
                    <h3 className="text-base font-bold text-white uppercase tracking-tight mb-2 font-sans">{sec.title}</h3>
                    <p className="text-xs text-slate-400 font-light leading-relaxed font-sans">{sec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Why Build AI Agents with AbuQitmirLabs? */}
        <section 
          id="why-build-with-abuqitmirlabs" 
          aria-labelledby="heading-why-choose"
          className="py-28 md:py-36 bg-black px-6 border-t border-white/10"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-bold block mb-4">
                  [ ENGINEERING EXPERTISE ]
                </span>
                <h2 
                  id="heading-why-choose"
                  className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight mb-8"
                >
                  Why Build AI Agents with <span className="font-serif italic text-[#ccff00]">AbuQitmirLabs</span>?
                </h2>
                <p className="text-base text-slate-300 font-light leading-relaxed mb-6 font-sans">
                  The difference between an AI prototype and an enterprise agent that delivers continuous ROI comes down to software engineering discipline. We build resilient, maintainable architectures that solve real operational bottlenecks.
                </p>
                <p className="text-sm text-slate-400 font-light leading-relaxed font-sans mb-8">
                  From our technical team in Karachi, Pakistan, we serve international clients across the United States, United Kingdom, Canada, Australia, and Europe. Our engineering capabilities span <Link to="/custom-software" className="text-[#ccff00] hover:underline">custom software development</Link>, <Link to="/mobile-app-development" className="text-[#ccff00] hover:underline">mobile app development</Link>, and <Link to="/seo-mastery" className="text-[#ccff00] hover:underline">technical SEO services</Link>, as well as specialized <Link to="/solutions/fintech" className="text-[#ccff00] hover:underline">fintech solutions</Link> and <Link to="/solutions/healthcare" className="text-[#ccff00] hover:underline">healthcare platforms</Link>.
                </p>
                
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                  <h3 className="text-base font-bold text-white uppercase tracking-tight mb-2 font-sans">
                    100% Source Code & Data Ownership
                  </h3>
                  <p className="text-xs text-slate-400 font-light font-sans leading-relaxed">
                    Upon project delivery, all source code, API middleware, prompt schemas, database connectors, and intellectual property transfer completely to you. No recurring platform lock-in or proprietary licensing barriers.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Bespoke Codebase Architecture",
                    desc: "Every agent is custom-engineered in TypeScript/Python using modern frameworks (LangChain, LlamaIndex, CrewAI) and deployed to your own cloud infrastructure."
                  },
                  {
                    title: "Direct API & CRM Integrations",
                    desc: "Native bidirectional connectors to Salesforce, HubSpot, Zendesk, PostgreSQL, Stripe, Slack, and custom enterprise databases."
                  },
                  {
                    title: "Domain-Specific RAG Pipelines",
                    desc: "Tailored vector indexing and embedding pipelines that eliminate hallucinations and provide verifiable document citations."
                  },
                  {
                    title: "Enterprise Security & Governance",
                    desc: "Role-based access control, zero-trust token vaults, and prompt injection defense ensuring your proprietary data remains private."
                  },
                  {
                    title: "Transparent & Cost-Effective Delivery",
                    desc: "High-caliber engineering talent delivering complex autonomous systems at competitive, predictable milestone pricing."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/[0.015] border border-white/5 hover:border-white/10 transition-colors">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-sans flex items-center gap-2">
                      <span className="text-[#ccff00] font-mono">[ 0{idx + 1} ]</span>
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-light leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Investment & Pricing Component */}
        <AIAgentPricing />

        {/* Section 7: Frequently Asked Questions (8 Useful FAQs) */}
        <section 
          id="ai-agent-development-faqs" 
          aria-labelledby="heading-agent-faqs"
          className="py-28 md:py-36 px-6 bg-black relative border-t border-white/10"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-mono text-[#ccff00] mb-4 uppercase tracking-[0.3em] font-bold block">
                [ FREQUENTLY ASKED QUESTIONS ]
              </span>
              <h2 
                id="heading-agent-faqs"
                className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight uppercase"
              >
                Frequently Asked <span className="font-serif italic text-blue-400">Questions</span>
              </h2>
              <p className="mt-4 text-slate-400 font-light text-sm md:text-base font-sans">
                Clear, factual answers to common technical and business questions about AI agent development.
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div 
                    key={index} 
                    className="border border-white/10 rounded-2xl bg-white/[0.01] overflow-hidden transition-colors hover:border-white/20"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      id={`faq-question-${index}`}
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left transition-colors focus:outline-none focus:ring-1 focus:ring-[#ccff00]"
                    >
                      <span className="text-base md:text-lg font-bold text-white tracking-tight font-sans pr-4">{faq.q}</span>
                      <span className={`text-[#ccff00] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-45' : ''}`}>
                        <Plus className="w-5 h-5 pointer-events-none" />
                      </span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${index}`}
                          role="region"
                          aria-labelledby={`faq-question-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 border-t border-white/5 pt-4 text-slate-300 text-sm md:text-base leading-relaxed font-light font-sans">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 8: Final Conversion Call to Action */}
        <section id="cta-agent-consultation" className="bg-[#020202] py-32 border-t border-white/10 relative overflow-hidden text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ccff00]/5 blur-[140px] rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#ccff00] font-bold block mb-6">
              [ AUTOMATE WITH CONFIDENCE ]
            </span>
            
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight mb-6">
              Have a workflow that should run <br />
              <span className="font-serif italic text-[#ccff00]">without constant manual work?</span>
            </h2>
            
            <p className="text-base md:text-lg text-slate-300 font-light max-w-2xl mx-auto mb-12 leading-relaxed font-sans">
              Schedule a technical discovery session with AbuQitmirLabs. We will review your current business processes, identify high-impact automation opportunities, and architect a custom AI agent roadmap.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center max-w-lg mx-auto mb-10">
              <Link
                to="/contact"
                className="flex-1 inline-flex items-center justify-center gap-2 h-14 bg-white hover:bg-slate-200 text-black font-bold uppercase rounded-xl tracking-wider text-xs transition duration-200 shadow-[0_0_25px_rgba(255,255,255,0.15)]"
              >
                <span>Discuss Your AI Agent</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/custom-software"
                className="flex-1 inline-flex items-center justify-center gap-2 h-14 bg-white/5 hover:bg-white/10 text-white font-bold uppercase rounded-xl tracking-wider text-xs border border-white/10 transition duration-200"
              >
                <span>Explore Custom Software</span>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-mono text-slate-400">
              <span>Direct: <a href="mailto:hello@abuqitmirlabs.tech" className="text-white hover:underline">hello@abuqitmirlabs.tech</a></span>
              <span>·</span>
              <span><Link to="/about" className="hover:underline text-slate-300">About Our Company</Link></span>
              <span>·</span>
              <span>Karachi, Pakistan · Serving Global Clients</span>
            </div>
          </div>
        </section>

        {/* Related Systems / Internal Links Siloing */}
        <section className="py-20 bg-black border-t border-white/10 px-6">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-xs font-mono text-slate-500 mb-8 uppercase tracking-[0.3em] font-bold">
              [ RELATED ENGINEERING DISCIPLINES ]
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: "Custom Software Development", desc: "Private enterprise software, backend services & APIs", path: "/custom-software", icon: <Code2 className="w-5 h-5" /> },
                { title: "Web Development Services", desc: "High-performance React/Next.js web applications", path: "/web-development", icon: <Globe className="w-5 h-5" /> },
                { title: "Mobile App Development", desc: "Cross-platform iOS & Android mobile software", path: "/mobile-app-development", icon: <Smartphone className="w-5 h-5" /> },
                { title: "Fintech Solutions", desc: "Secure financial workflows & payment engines", path: "/solutions/fintech", icon: <TrendingUp className="w-5 h-5" /> },
                { title: "Healthcare Platforms", desc: "HIPAA-aligned clinical & patient systems", path: "/solutions/healthcare", icon: <HeartPulse className="w-5 h-5" /> },
                { title: "SEO Services & Mastery", desc: "Technical search, AEO & semantic optimization", path: "/seo-mastery", icon: <Cpu className="w-5 h-5" /> }
              ].map((link, i) => (
                <Link 
                  key={i} 
                  to={link.path} 
                  className="group flex items-center justify-between p-6 bg-white/[0.015] border border-white/5 rounded-2xl transition-all hover:bg-white/[0.04] hover:border-[#ccff00]/40"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="text-[#ccff00] bg-white/5 border border-white/10 p-2.5 rounded-lg group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                      {link.icon}
                    </div>
                    <div>
                      <span className="font-bold uppercase tracking-tight text-white text-sm block">{link.title}</span>
                      <span className="text-xs text-slate-400 font-light">{link.desc}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="text-slate-500 group-hover:text-[#ccff00] transition-colors" size={18} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Cpu, 
  Database, 
  TrendingUp, 
  ArrowRight, 
  Plus, 
  ChevronRight, 
  Sparkles, 
  BrainCircuit, 
  Workflow,
  BarChart3,
  FileText
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountryMarquee from '../../components/CountryMarquee';
import { aiAutomationSchema } from '../../utils/aiAutomationStaticHtml';

const AIAutomationPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is AI automation in business?",
      a: "AI automation in business is the strategic integration of artificial intelligence models, machine learning algorithms, and workflow orchestration software to execute complex, multi-step commercial processes autonomously. It enables organizations to streamline data processing, customer communication, sales qualification, and back-office operations while reducing operational cycle times, eliminating manual data entry bottlenecks, and maintaining strict human oversight."
    },
    {
      q: "What are AI automation solutions?",
      a: "AI automation solutions are software systems that combine artificial intelligence models, workflow orchestration logic, and application APIs to automate multi-step business operations autonomously. Unlike basic rule-based scripts, AI automation systems comprehend unstructured documents, reason through dynamic business conditions, retrieve proprietary company knowledge using RAG, and execute secure actions across CRMs, ERPs, and cloud databases with human oversight."
    },
    {
      q: "How does AI workflow automation work?",
      a: "AI workflow automation works by capturing an operational trigger (such as an incoming email, webhook, form submission, or scheduled event), passing unstructured data to an AI model for comprehension and classification, querying verified internal knowledge via RAG, executing defined business logic, calling external software APIs to perform actions, and logging every step for auditability."
    },
    {
      q: "What is the difference between AI automation and RPA?",
      a: "Robotic Process Automation (RPA) executes rigid, hardcoded rules on fixed user interfaces and breaks whenever data layouts or button positions change. AI automation utilizes Large Language Models and cognitive reasoning layers to comprehend messy unstructured text, adapt to changing document layouts, perform semantic knowledge lookups, and dynamically choose appropriate API tools while maintaining deterministic safety guardrails."
    },
    {
      q: "What is RAG in AI automation?",
      a: "RAG in AI automation (Retrieval-Augmented Generation) connects AI language models to an organization's private databases and documents. When a task requires specific proprietary context, the system semantically searches a vector database (such as Pinecone, Qdrant, or pgvector), retrieves relevant verified excerpts, and injects them into the model prompt to generate grounded, factually accurate outputs with source citations."
    },
    {
      q: "How do AI automation systems integrate with existing software?",
      a: "AI automation systems integrate with existing software platforms using secure REST APIs, GraphQL endpoints, event-driven webhooks, database connectors, and OAuth middleware. Rather than replacing legacy infrastructure, AI automation operates as an intelligent coordination layer connecting CRMs (Salesforce, HubSpot), ERPs (SAP, NetSuite), accounting tools (QuickBooks), and cloud storage (AWS, Google Cloud) without disruptions."
    },
    {
      q: "How much does AI automation development cost?",
      a: "AI automation development costs typically range from $5,000 to $12,000 for focused single-workflow automations (such as lead qualification or invoice extraction), $12,000 to $30,000 for multi-system workflows with custom RAG knowledge bases, and $30,000+ for enterprise-grade autonomous multi-agent platforms with dedicated infrastructure, custom UI dashboards, and zero-trust security controls."
    },
    {
      q: "How long does AI automation development take?",
      a: "AI automation development typically takes between 2 to 14 weeks depending on architectural scope. A focused single-workflow prototype takes 2 to 4 weeks, an integrated multi-step business workflow takes 4 to 8 weeks, and an enterprise-scale multi-agent platform with custom RAG pipelines and legacy ERP connectors takes 8 to 14 weeks from discovery to deployment."
    },
    {
      q: "What security standards are needed for AI automation?",
      a: "Production AI automation systems require defense-in-depth security architectures designed to support applicable privacy and compliance requirements. Essential standards include TLS 1.3 encryption in transit, AES-256 encryption at rest, role-based access control (RBAC), prompt injection sanitization layers, least-privilege API scopes, immutable audit logging, and zero-data retention agreements ensuring business data is never used to train public foundation models."
    },
    {
      q: "How do businesses choose an AI automation development company?",
      a: "Businesses should choose an AI automation development company based on proven full-stack software engineering capabilities, experience building custom RAG architectures with vector databases, expertise in API and ERP integration, robust security guardrails with prompt-injection defense, flexible Human-in-the-Loop governance models, and transparent 100% source code and intellectual property ownership."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <Helmet>
        <title>AI Automation Solutions for Smarter Business | AbuQitmirLabs</title>
        <meta name="description" content="Build AI automation systems for workflows, customer support, sales, operations and knowledge management with AbuQitmirLabs." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/solutions/ai-automation" />

        {/* Open Graph */}
        <meta property="og:title" content="AI Automation Solutions for Smarter Business | AbuQitmirLabs" />
        <meta property="og:description" content="Build AI automation systems for workflows, customer support, sales, operations and knowledge management with AbuQitmirLabs." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/solutions/ai-automation" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Automation Solutions for Smarter Business | AbuQitmirLabs" />
        <meta name="twitter:description" content="Build AI automation systems for workflows, customer support, sales, operations and knowledge management with AbuQitmirLabs." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">{JSON.stringify(aiAutomationSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'Solutions', path: '/#services' },
            { label: 'AI Automation Solutions', path: '/solutions/ai-automation' }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00] text-xs font-mono mb-6 uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span>Autonomous Business Intelligence &amp; Intelligent Workflows</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-5xl leading-[1.08]">
              AI Automation Solutions for Smarter Business Workflows
            </h1>

            {/* Direct Answer Box (AEO Direct Answer 01) */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-xl max-w-4xl mb-8">
              <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                <strong className="text-[#ccff00]">AI automation solutions</strong> are software systems that combine artificial intelligence models, workflow orchestration logic, and application APIs to automate multi-step business operations autonomously. Unlike basic rule-based scripts, AI automation systems comprehend unstructured documents, reason through dynamic business conditions, retrieve proprietary company knowledge using RAG, and execute secure actions across CRMs, ERPs, and cloud databases with human oversight.
              </p>
            </div>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed mb-10 font-light">
              Eliminate manual operational bottlenecks. We engineer custom AI automation systems, autonomous AI agents, and RAG-powered workflows that integrate with your software stack to accelerate throughput, cut data processing latency, and reduce operational overhead.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-[#ccff00] text-black font-bold rounded-xl text-sm hover:bg-[#b8e600] transition-colors inline-flex items-center gap-2 uppercase tracking-wider"
              >
                <span>Discuss Your Automation Workflow</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/custom-software"
                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl text-sm transition-colors uppercase tracking-wider"
              >
                Custom Software Development
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-12 border-t border-white/5">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl md:text-3xl font-extrabold text-[#ccff00] font-mono">100%</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Source Code &amp; IP Ownership</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl md:text-3xl font-extrabold text-[#ccff00] font-mono">2–4 Wks</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Pilot Deployment Speed</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl md:text-3xl font-extrabold text-[#ccff00] font-mono">Zero</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Public Model Data Retention</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl md:text-3xl font-extrabold text-[#ccff00] font-mono">HITL</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Human-in-the-Loop Governance</div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Market Footprint */}
        <CountryMarquee />

        {/* SECTION 1: What Are AI Automation Solutions? */}
        <section id="what-are-ai-automation-solutions" className="py-20 max-w-7xl mx-auto px-6 border-b border-white/10">
          <div className="max-w-4xl">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">[ DEFINITION &amp; CORE ARCHITECTURE ]</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8">What Are AI Automation Solutions?</h2>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-[#ccff00]/30 mb-8">
              <p className="text-base text-gray-200 leading-relaxed font-normal">
                <strong>AI automation solutions</strong> unite foundational machine learning models with deterministic software architecture, enabling systems to interpret natural language, parse messy unstructured documents, query internal vector databases via RAG, make informed decisions, and trigger actions across corporate APIs without continuous manual input.
              </p>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6 font-light text-base md:text-lg">
              For decades, business automation relied on rigid Robotic Process Automation (RPA) scripts that followed strict if-then rules. When an invoice format changed, a customer used unfamiliar phrasing, or a document contained scanned text, traditional scripts broke down. AI automation solves this vulnerability by using Large Language Models (LLMs) and cognitive reasoning layers that adapt to real-world ambiguity while preserving strict deterministic guardrails.
            </p>

            <p className="text-gray-300 leading-relaxed mb-8 font-light text-base md:text-lg">
              Modern enterprise AI automation operates across three critical pillars: <strong>Comprehension</strong> (understanding emails, contracts, and transcripts), <strong>Context Grounding</strong> (retrieving accurate institutional knowledge through RAG), and <strong>Execution</strong> (calling authorized REST/GraphQL APIs, updating database records, and alerting team members). This architecture turns slow, repetitive back-office bottlenecks into continuous, scalable operational advantage.
            </p>

            {/* Direct Answer Blocks 02 & 03 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 rounded-xl bg-zinc-900/40 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-2">What is AI Workflow Automation?</h3>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  <strong>AI workflow automation is</strong> an orchestration architecture where artificial intelligence coordinates multi-stage business pipelines by ingesting unstructured events, categorizing records, querying vector knowledge stores, and invoking external software APIs to complete tasks reliably with audit trails.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-zinc-900/40 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-2">What Does an AI Automation Company Do?</h3>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  <strong>An AI automation company is</strong> a specialized engineering firm that assesses corporate operational bottlenecks, designs custom AI agent architectures, builds secure RAG knowledge retrieval pipelines, and integrates resilient API middleware to automate manual repetitive work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: AI Automation Services */}
        <section id="ai-automation-services" className="py-20 max-w-7xl mx-auto px-6 border-b border-white/10">
          <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">[ CORE SERVICE PILLARS ]</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">AI Automation Services</h2>
          <p className="text-gray-400 max-w-3xl mb-12 font-light">
            We architect and deploy specialized AI automation systems tailored to distinct operational workflows across your entire software ecosystem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Service 1 */}
            <div className="p-8 rounded-2xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between hover:border-[#ccff00]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00] mb-6">
                  <Workflow className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">AI Workflow Automation</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  End-to-end multi-step workflow pipelines that capture operational triggers, process unstructured data with LLMs, execute business validation rules, and trigger actions across distributed software tools.
                </p>
                <div className="space-y-2 text-xs font-mono text-gray-400 border-t border-white/5 pt-4 mb-6">
                  <div><strong className="text-white">Target Users:</strong> Operations directors, supply chain teams, scaling startups.</div>
                  <div><strong className="text-white">Typical Workflow:</strong> Webhook trigger &rarr; document OCR &rarr; AI validation &rarr; ERP update &rarr; Slack alert.</div>
                  <div><strong className="text-white">Integrations:</strong> REST/GraphQL APIs, webhooks, PostgreSQL, Zapier/n8n, AWS/GCP.</div>
                  <div><strong className="text-white">Benefit:</strong> 75%+ reduction in cycle times; eliminates manual data entry errors.</div>
                  <div><strong className="text-white">Governance:</strong> RBAC, encrypted payload pipelines, and anomaly escalation gates.</div>
                </div>
              </div>
              <Link to="/custom-software" className="text-xs font-mono uppercase text-[#ccff00] hover:underline inline-flex items-center gap-1">
                <span>Explore custom software development</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="p-8 rounded-2xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between hover:border-[#ccff00]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00] mb-6">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">AI Agent Automation</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Goal-oriented autonomous software agents with reasoning loops, long-term memory, and tool-calling capabilities that break high-level business objectives into sequential steps to achieve defined outcomes.
                </p>
                <div className="space-y-2 text-xs font-mono text-gray-400 border-t border-white/5 pt-4 mb-6">
                  <div><strong className="text-white">Target Users:</strong> Operations teams, digital agencies, e-commerce managers.</div>
                  <div><strong className="text-white">Typical Workflow:</strong> Objective prompt &rarr; task decomposition &rarr; API tool calls &rarr; result evaluation &rarr; final output.</div>
                  <div><strong className="text-white">Integrations:</strong> OpenAI, Anthropic Claude, Gemini, LangGraph, CrewAI, AutoGen.</div>
                  <div><strong className="text-white">Benefit:</strong> Continuous 24/7 autonomous task execution without extra headcount.</div>
                  <div><strong className="text-white">Governance:</strong> Strict tool execution sandboxes and deterministic termination criteria.</div>
                </div>
              </div>
              <Link to="/ai-agent-development" className="text-xs font-mono uppercase text-[#ccff00] hover:underline inline-flex items-center gap-1">
                <span>Learn about AI agent development</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="p-8 rounded-2xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between hover:border-[#ccff00]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00] mb-6">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">RAG-Powered Business Automation</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Retrieval-Augmented Generation architectures indexing private corporate documents, manuals, and databases to deliver context-grounded answers and automated tasks backed by source citations.
                </p>
                <div className="space-y-2 text-xs font-mono text-gray-400 border-t border-white/5 pt-4 mb-6">
                  <div><strong className="text-white">Target Users:</strong> Legal counsel, compliance managers, technical support, executive teams.</div>
                  <div><strong className="text-white">Typical Workflow:</strong> User query &rarr; vector similarity search &rarr; chunk retrieval &rarr; grounded LLM answer &rarr; cited source.</div>
                  <div><strong className="text-white">Integrations:</strong> Pinecone, Qdrant, pgvector, AWS S3, Google Cloud Storage, Notion.</div>
                  <div><strong className="text-white">Benefit:</strong> Rapid retrieval of institutional knowledge; prevents AI hallucinations.</div>
                  <div><strong className="text-white">Governance:</strong> Document-level access permissions and zero data retention agreements.</div>
                </div>
              </div>
              <Link to="/web-development" className="text-xs font-mono uppercase text-[#ccff00] hover:underline inline-flex items-center gap-1">
                <span>Discover high-performance web applications</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Service 4 */}
            <div className="p-8 rounded-2xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between hover:border-[#ccff00]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00] mb-6">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Customer Support Automation</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Intelligent 24/7 conversational agents that resolve customer inquiries, triage urgent tickets, synchronize CRM history, and seamlessly escalate edge cases to human representatives.
                </p>
                <div className="space-y-2 text-xs font-mono text-gray-400 border-t border-white/5 pt-4 mb-6">
                  <div><strong className="text-white">Target Users:</strong> B2B SaaS companies, e-commerce retailers, customer success teams.</div>
                  <div><strong className="text-white">Typical Workflow:</strong> Customer message &rarr; intent classification &rarr; RAG knowledge retrieval &rarr; ticket sync &rarr; escalation.</div>
                  <div><strong className="text-white">Integrations:</strong> Zendesk, Freshdesk, Intercom, Salesforce Service Cloud, WhatsApp API.</div>
                  <div><strong className="text-white">Benefit:</strong> Sub-5-second initial response times with higher first-contact resolution.</div>
                  <div><strong className="text-white">Governance:</strong> PII scrubbing in conversation transcripts and brand safety guardrails.</div>
                </div>
              </div>
              <Link to="/content-writing" className="text-xs font-mono uppercase text-[#ccff00] hover:underline inline-flex items-center gap-1">
                <span>Learn about technical content writing</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Service 5 */}
            <div className="p-8 rounded-2xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between hover:border-[#ccff00]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00] mb-6">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Sales and Lead Automation</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Automated inbound lead qualification, firmographic data enrichment, personalized outreach drafting, and seamless calendar synchronization for high-performing sales organizations.
                </p>
                <div className="space-y-2 text-xs font-mono text-gray-400 border-t border-white/5 pt-4 mb-6">
                  <div><strong className="text-white">Target Users:</strong> B2B sales reps, growth marketing teams, agency founders.</div>
                  <div><strong className="text-white">Typical Workflow:</strong> Form submission &rarr; firmographic enrichment &rarr; AI ICP scoring &rarr; email draft &rarr; calendar booking.</div>
                  <div><strong className="text-white">Integrations:</strong> HubSpot, Salesforce, Apollo, Clearbit, Calendly, Gmail/Outlook.</div>
                  <div><strong className="text-white">Benefit:</strong> 3x faster lead response times; higher qualified demo conversion.</div>
                  <div><strong className="text-white">Governance:</strong> Anti-spam compliance filters and manual review gates for enterprise accounts.</div>
                </div>
              </div>
              <Link to="/seo-mastery" className="text-xs font-mono uppercase text-[#ccff00] hover:underline inline-flex items-center gap-1">
                <span>Explore SEO and AEO services</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Service 6 */}
            <div className="p-8 rounded-2xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between hover:border-[#ccff00]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00] mb-6">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Finance and Operations Automation</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Automated accounts payable matching, invoice line-item extraction, expense categorization, financial summary reports, and budget anomaly detection pipelines.
                </p>
                <div className="space-y-2 text-xs font-mono text-gray-400 border-t border-white/5 pt-4 mb-6">
                  <div><strong className="text-white">Target Users:</strong> CFOs, accounting controllers, finance teams, operations leads.</div>
                  <div><strong className="text-white">Typical Workflow:</strong> PDF invoice receipt &rarr; OCR extraction &rarr; PO matching &rarr; ledger entry creation &rarr; approval alert.</div>
                  <div><strong className="text-white">Integrations:</strong> QuickBooks, Xero, NetSuite, Stripe, Plaid, PostgreSQL.</div>
                  <div><strong className="text-white">Benefit:</strong> Cuts month-end close time in half; eliminates duplicate invoice payments.</div>
                  <div><strong className="text-white">Governance:</strong> Dual-approval controls for disbursements and immutable ledger audit trails.</div>
                </div>
              </div>
              <Link to="/solutions/fintech" className="text-xs font-mono uppercase text-[#ccff00] hover:underline inline-flex items-center gap-1">
                <span>Review FinTech software solutions</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Service 7 */}
            <div className="p-8 rounded-2xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between hover:border-[#ccff00]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00] mb-6">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Document and Data Automation</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Intelligent document processing (IDP) systems that parse complex PDFs, scanned forms, contracts, and receipts into validated, structured JSON datasets ready for database ingestion.
                </p>
                <div className="space-y-2 text-xs font-mono text-gray-400 border-t border-white/5 pt-4 mb-6">
                  <div><strong className="text-white">Target Users:</strong> Legal teams, logistics operators, procurement departments.</div>
                  <div><strong className="text-white">Typical Workflow:</strong> File upload &rarr; computer vision OCR &rarr; entity extraction &rarr; schema validation &rarr; database commit.</div>
                  <div><strong className="text-white">Integrations:</strong> AWS Textract, Azure Document Intelligence, Google Cloud Vision, MongoDB.</div>
                  <div><strong className="text-white">Benefit:</strong> 90%+ time savings on manual typing; processes hundreds of pages per minute.</div>
                  <div><strong className="text-white">Governance:</strong> In-memory data sanitization with cryptographic checksum verification.</div>
                </div>
              </div>
              <Link to="/solutions/healthcare" className="text-xs font-mono uppercase text-[#ccff00] hover:underline inline-flex items-center gap-1">
                <span>Explore healthcare software solutions</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Service 8 */}
            <div className="p-8 rounded-2xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between hover:border-[#ccff00]/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00] mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Internal AI Copilots</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Custom internal AI assistants integrated directly into Slack, Microsoft Teams, or custom web portals to query internal metrics, draft status reports, and summarize operational documentation.
                </p>
                <div className="space-y-2 text-xs font-mono text-gray-400 border-t border-white/5 pt-4 mb-6">
                  <div><strong className="text-white">Target Users:</strong> Cross-functional enterprise teams, software squads, HR personnel.</div>
                  <div><strong className="text-white">Typical Workflow:</strong> Slack command &rarr; internal database query &rarr; metric synthesis &rarr; formatted summary &rarr; export action.</div>
                  <div><strong className="text-white">Integrations:</strong> Slack, Microsoft Teams, Jira, GitHub, Confluence, BigQuery.</div>
                  <div><strong className="text-white">Benefit:</strong> Saves 5–10 hours per employee weekly on status chasing and data lookups.</div>
                  <div><strong className="text-white">Governance:</strong> SSO SAML/OAuth2 authentication and granular role-based query permissions.</div>
                </div>
              </div>
              <Link to="/mobile-app-development" className="text-xs font-mono uppercase text-[#ccff00] hover:underline inline-flex items-center gap-1">
                <span>See AI-powered mobile applications</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 3: AI Automation by Department */}
        <section id="ai-automation-by-department" className="py-20 max-w-7xl mx-auto px-6 border-b border-white/10">
          <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">[ DEPARTMENTAL IMPACT ]</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">AI Automation by Department</h2>
          <p className="text-gray-400 max-w-3xl mb-12 font-light">
            Every business unit operates with unique operational triggers, validation requirements, and risk thresholds. Here is how our AI automation systems execute across 9 key business functions:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Department 1: Operations */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Operations</h3>
              <p className="text-xs text-gray-400 mb-4 font-light">Automates stock tracking, supplier dispatch, and inventory reorders.</p>
              <div className="text-xs font-mono text-gray-300 space-y-2 border-t border-white/5 pt-4">
                <div><strong className="text-gray-500">Input:</strong> Warehouse inventory threshold alert.</div>
                <div><strong className="text-teal-400">AI:</strong> Analyzes historical velocity &amp; vendor lead times.</div>
                <div><strong className="text-[#ccff00]">Action:</strong> Generates purchase order draft in ERP.</div>
                <div><strong className="text-amber-400">Human Review:</strong> Operations manager signs off on bulk reorders.</div>
                <div><strong className="text-white">Outcome:</strong> Zero stockouts with optimized working capital.</div>
              </div>
            </div>

            {/* Department 2: Customer Support */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Customer Support</h3>
              <p className="text-xs text-gray-400 mb-4 font-light">Resolves routine inquiries and routes complex cases 24/7.</p>
              <div className="text-xs font-mono text-gray-300 space-y-2 border-t border-white/5 pt-4">
                <div><strong className="text-gray-500">Input:</strong> Inbound support ticket or chat message.</div>
                <div><strong className="text-teal-400">AI:</strong> Detects intent, sentiment &amp; retrieves RAG context.</div>
                <div><strong className="text-[#ccff00]">Action:</strong> Delivers instant verified solution or routes ticket.</div>
                <div><strong className="text-amber-400">Human Review:</strong> Edge cases and negative sentiment escalate.</div>
                <div><strong className="text-white">Outcome:</strong> 60%+ first-contact resolution with faster replies.</div>
              </div>
            </div>

            {/* Department 3: Sales */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Sales</h3>
              <p className="text-xs text-gray-400 mb-4 font-light">Scores leads, enriches CRM records, and drafts outreach.</p>
              <div className="text-xs font-mono text-gray-300 space-y-2 border-t border-white/5 pt-4">
                <div><strong className="text-gray-500">Input:</strong> Web demo form submission.</div>
                <div><strong className="text-teal-400">AI:</strong> Enriches firmographics and scores ICP fit tier.</div>
                <div><strong className="text-[#ccff00]">Action:</strong> Logs contact to CRM &amp; drafts customized email.</div>
                <div><strong className="text-amber-400">Human Review:</strong> Account executive approves high-tier emails.</div>
                <div><strong className="text-white">Outcome:</strong> 3x faster response times to inbound leads.</div>
              </div>
            </div>

            {/* Department 4: Marketing */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Marketing</h3>
              <p className="text-xs text-gray-400 mb-4 font-light">Aggregates campaign analytics and drafts content variants.</p>
              <div className="text-xs font-mono text-gray-300 space-y-2 border-t border-white/5 pt-4">
                <div><strong className="text-gray-500">Input:</strong> Multi-channel ad performance logs.</div>
                <div><strong className="text-teal-400">AI:</strong> Pinpoints winning copy patterns and CAC shifts.</div>
                <div><strong className="text-[#ccff00]">Action:</strong> Compiles weekly executive growth briefing.</div>
                <div><strong className="text-amber-400">Human Review:</strong> Growth lead adjusts budget allocation.</div>
                <div><strong className="text-white">Outcome:</strong> Rapid iteration of top-converting ad creatives.</div>
              </div>
            </div>

            {/* Department 5: Finance */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Finance</h3>
              <p className="text-xs text-gray-400 mb-4 font-light">Extracts invoice line items and performs ledger reconciliation.</p>
              <div className="text-xs font-mono text-gray-300 space-y-2 border-t border-white/5 pt-4">
                <div><strong className="text-gray-500">Input:</strong> Vendor invoice PDF attachment.</div>
                <div><strong className="text-teal-400">AI:</strong> Extracts line items, taxes &amp; matches Purchase Orders.</div>
                <div><strong className="text-[#ccff00]">Action:</strong> Creates pending bill in accounting software.</div>
                <div><strong className="text-amber-400">Human Review:</strong> Controller verifies invoices over $5,000.</div>
                <div><strong className="text-white">Outcome:</strong> 50% faster month-end closing cycles.</div>
              </div>
            </div>

            {/* Department 6: Human Resources */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Human Resources</h3>
              <p className="text-xs text-gray-400 mb-4 font-light">Screens candidate resumes and streamlines onboarding tasks.</p>
              <div className="text-xs font-mono text-gray-300 space-y-2 border-t border-white/5 pt-4">
                <div><strong className="text-gray-500">Input:</strong> Candidate application and resume upload.</div>
                <div><strong className="text-teal-400">AI:</strong> Parses technical skills against job requirements.</div>
                <div><strong className="text-[#ccff00]">Action:</strong> Schedules interview &amp; queues onboarding tasks.</div>
                <div><strong className="text-amber-400">Human Review:</strong> Recruiter reviews shortlist before booking.</div>
                <div><strong className="text-white">Outcome:</strong> Eliminates manual resume sorting friction.</div>
              </div>
            </div>

            {/* Department 7: Administration */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Administration</h3>
              <p className="text-xs text-gray-400 mb-4 font-light">Triages executive inboxes and tracks meeting action items.</p>
              <div className="text-xs font-mono text-gray-300 space-y-2 border-t border-white/5 pt-4">
                <div><strong className="text-gray-500">Input:</strong> Recorded meeting audio or incoming email stream.</div>
                <div><strong className="text-teal-400">AI:</strong> Synthesizes decisions and categorizes action tasks.</div>
                <div><strong className="text-[#ccff00]">Action:</strong> Creates Jira/Linear tickets and draft replies.</div>
                <div><strong className="text-amber-400">Human Review:</strong> Host reviews action items before dispatch.</div>
                <div><strong className="text-white">Outcome:</strong> Complete alignment across cross-functional teams.</div>
              </div>
            </div>

            {/* Department 8: Data Processing */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Data Processing</h3>
              <p className="text-xs text-gray-400 mb-4 font-light">Transforms unstructured files into validated JSON schemas.</p>
              <div className="text-xs font-mono text-gray-300 space-y-2 border-t border-white/5 pt-4">
                <div><strong className="text-gray-500">Input:</strong> Raw multi-format CSV, XML, and PDF dumps.</div>
                <div><strong className="text-teal-400">AI:</strong> Normalizes schema discrepancies &amp; flags anomalies.</div>
                <div><strong className="text-[#ccff00]">Action:</strong> Ingests cleaned records into data warehouse.</div>
                <div><strong className="text-amber-400">Human Review:</strong> Data engineers inspect quarantined anomalies.</div>
                <div><strong className="text-white">Outcome:</strong> Continuous, clean analytics pipelines.</div>
              </div>
            </div>

            {/* Department 9: Knowledge Management */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Knowledge Management</h3>
              <p className="text-xs text-gray-400 mb-4 font-light">Indexes internal handbooks and code wikis for fast retrieval.</p>
              <div className="text-xs font-mono text-gray-300 space-y-2 border-t border-white/5 pt-4">
                <div><strong className="text-gray-500">Input:</strong> Natural language query in internal search.</div>
                <div><strong className="text-teal-400">AI:</strong> Queries vector store and retrieves cited snippets.</div>
                <div><strong className="text-[#ccff00]">Action:</strong> Delivers grounded answer with documentation links.</div>
                <div><strong className="text-amber-400">Human Review:</strong> Users flag outdated documentation entries.</div>
                <div><strong className="text-white">Outcome:</strong> Immediate access to institutional knowledge.</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World AI Automation Use Cases */}
        <section id="real-world-ai-automation-use-cases" className="py-20 max-w-7xl mx-auto px-6 border-b border-white/10">
          <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">[ PRACTICAL IMPLEMENTATIONS ]</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Real-World AI Automation Use Cases</h2>
          <p className="text-gray-400 max-w-3xl mb-12 font-light">
            Real enterprise automation requires knowing exactly when an AI system can act autonomously and where human sign-off protects business integrity:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#ccff00]">USE CASE 01</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">Autonomous</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Lead Qualification &amp; CRM Synchronization</h3>
              <p className="text-xs text-gray-300 mb-3 font-light leading-relaxed">
                Captures website form submissions, enriches company size via Clearbit/Apollo, computes an Ideal Customer Profile (ICP) tier, logs the contact to HubSpot, and schedules an account manager meeting.
              </p>
              <div className="text-[11px] font-mono text-amber-400/90 border-t border-white/5 pt-2">
                <strong>Human approval:</strong> Enterprise tier leads route to executive account managers for personalized review.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#ccff00]">USE CASE 02</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">Autonomous</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Customer Support Ticket Routing &amp; Auto-Resolution</h3>
              <p className="text-xs text-gray-300 mb-3 font-light leading-relaxed">
                Classifies incoming support emails by sentiment and technical topic, resolves common how-to questions using RAG documentation with source links, and assigns complex tickets to specialized engineering queues.
              </p>
              <div className="text-[11px] font-mono text-amber-400/90 border-t border-white/5 pt-2">
                <strong>Human approval:</strong> Negative sentiment or billing disputes immediately trigger human intervention.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#ccff00]">USE CASE 03</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">HITL Gate</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Document Extraction &amp; Contract Parsing</h3>
              <p className="text-xs text-gray-300 mb-3 font-light leading-relaxed">
                Parses unstructured 50-page legal contracts, extracts key termination dates, payment obligations, liability clauses, and converts them into structured database records.
              </p>
              <div className="text-[11px] font-mono text-amber-400/90 border-t border-white/5 pt-2">
                <strong>Human approval:</strong> In-house legal counsel reviews non-standard liability clauses before final agreement signing.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#ccff00]">USE CASE 04</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">HITL Gate</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Invoice Processing &amp; PO Matching</h3>
              <p className="text-xs text-gray-300 mb-3 font-light leading-relaxed">
                Reads incoming vendor PDF invoices via computer vision OCR, extracts line items, validates tax calculations, and matches against internal purchase orders in NetSuite.
              </p>
              <div className="text-[11px] font-mono text-amber-400/90 border-t border-white/5 pt-2">
                <strong>Human approval:</strong> Finance controller approves disbursements exceeding $5,000 threshold prior to payment release.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#ccff00]">USE CASE 05</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">Autonomous</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Meeting Summarization &amp; Action Item Tracking</h3>
              <p className="text-xs text-gray-300 mb-3 font-light leading-relaxed">
                Ingests recorded client call audio transcripts, synthesizes key commercial agreements, categorizes action items by stakeholder, and generates task tickets in Jira.
              </p>
              <div className="text-[11px] font-mono text-amber-400/90 border-t border-white/5 pt-2">
                <strong>Human approval:</strong> Meeting host reviews assigned action items before automated ticket creation completes.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#ccff00]">USE CASE 06</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">Autonomous</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Internal Knowledge Search &amp; Citations</h3>
              <p className="text-xs text-gray-300 mb-3 font-light leading-relaxed">
                Performs hybrid vector search across company handbooks, SOPs, and engineering wikis to provide employees with instant, context-grounded answers with direct page citations.
              </p>
              <div className="text-[11px] font-mono text-amber-400/90 border-t border-white/5 pt-2">
                <strong>Human approval:</strong> Employees provide feedback ratings to fine-tune retrieval weights continuously.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#ccff00]">USE CASE 07</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">Autonomous</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">CRM Data Enrichment &amp; Hygiene</h3>
              <p className="text-xs text-gray-300 mb-3 font-light leading-relaxed">
                Monitors executive career changes, email bounces, and company acquisitions, automatically updating CRM fields and archiving obsolete contact records.
              </p>
              <div className="text-[11px] font-mono text-amber-400/90 border-t border-white/5 pt-2">
                <strong>Human approval:</strong> RevOps administrator reviews bulk modification logs weekly.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#ccff00]">USE CASE 08</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">HITL Gate</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Executive Email Classification &amp; Drafting</h3>
              <p className="text-xs text-gray-300 mb-3 font-light leading-relaxed">
                Categorizes high-volume executive inboxes by priority, extracts urgent action requests, and prepares context-aware response drafts for one-click review.
              </p>
              <div className="text-[11px] font-mono text-amber-400/90 border-t border-white/5 pt-2">
                <strong>Human approval:</strong> Executive reviews and authorizes the email draft before sending.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#ccff00]">USE CASE 09</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">HITL Gate</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Sales Follow-Up Automation</h3>
              <p className="text-xs text-gray-300 mb-3 font-light leading-relaxed">
                Detects post-demo engagement signals, analyzes transcript notes, and drafts tailored follow-up emails highlighting specific customer pain points.
              </p>
              <div className="text-[11px] font-mono text-amber-400/90 border-t border-white/5 pt-2">
                <strong>Human approval:</strong> Sales rep reviews the draft and adds custom pricing terms before dispatch.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#ccff00]">USE CASE 10</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">HITL Gate</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">HR Document Workflows &amp; Compliance Verification</h3>
              <p className="text-xs text-gray-300 mb-3 font-light leading-relaxed">
                Verifies new hire identification, tax forms, and signed agreements, flagging missing signatures and provisioning initial software accounts.
              </p>
              <div className="text-[11px] font-mono text-amber-400/90 border-t border-white/5 pt-2">
                <strong>Human approval:</strong> HR manager approves identity verification before security credentials activate.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#ccff00]">USE CASE 11</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">HITL Gate</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Financial Reporting Workflows &amp; Briefings</h3>
              <p className="text-xs text-gray-300 mb-3 font-light leading-relaxed">
                Aggregates monthly data feeds from Stripe, bank APIs, and accounting ledgers to compute MRR growth, churn rates, and generate narrative executive summaries.
              </p>
              <div className="text-[11px] font-mono text-amber-400/90 border-t border-white/5 pt-2">
                <strong>Human approval:</strong> Chief Financial Officer inspects the generated report before board distribution.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-[#ccff00]">USE CASE 12</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">Autonomous</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Knowledge-Base Question Answering &amp; SOP Assistant</h3>
              <p className="text-xs text-gray-300 mb-3 font-light leading-relaxed">
                Acts as an always-on internal help desk for employees asking questions about IT policies, health insurance coverage, or travel expense rules.
              </p>
              <div className="text-[11px] font-mono text-amber-400/90 border-t border-white/5 pt-2">
                <strong>Human approval:</strong> Complex policy exceptions route to HR directors for definitive rulings.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: AI Automation vs Traditional Automation */}
        <section id="ai-automation-vs-traditional-automation" className="py-20 max-w-7xl mx-auto px-6 border-b border-white/10">
          <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">[ COMPARATIVE ANALYSIS ]</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">AI Automation vs Traditional Automation</h2>
          <p className="text-gray-400 max-w-3xl mb-12 font-light">
            Evaluate how cognitive AI systems compare with older procedural automation tools across critical technical dimensions:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900/40">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-[#ccff00] font-mono uppercase">
                  <th className="p-4 md:p-5">Capability Dimension</th>
                  <th className="p-4 md:p-5">Rule-Based Automation</th>
                  <th className="p-4 md:p-5">RPA (Robotic Process)</th>
                  <th className="p-4 md:p-5">AI-Assisted Workflows</th>
                  <th className="p-4 md:p-5">AI Agent Systems</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300 font-light">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 md:p-5 font-bold text-white font-mono">Reasoning</td>
                  <td className="p-4 md:p-5">None (deterministic boolean)</td>
                  <td className="p-4 md:p-5">None (click &amp; keystroke macros)</td>
                  <td className="p-4 md:p-5">Single-step prompt reasoning</td>
                  <td className="p-4 md:p-5 font-semibold text-white">Multi-step cognitive reasoning &amp; planning</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 md:p-5 font-bold text-white font-mono">Flexibility</td>
                  <td className="p-4 md:p-5">Zero; breaks on new conditions</td>
                  <td className="p-4 md:p-5">Low; breaks on UI/layout shifts</td>
                  <td className="p-4 md:p-5">Moderate; adapts to text variation</td>
                  <td className="p-4 md:p-5 font-semibold text-white">High; handles novel inputs &amp; edge cases</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 md:p-5 font-bold text-white font-mono">Data Types</td>
                  <td className="p-4 md:p-5">Structured tables only (CSV/SQL)</td>
                  <td className="p-4 md:p-5">Structured fields &amp; fixed forms</td>
                  <td className="p-4 md:p-5">Text prompts and snippets</td>
                  <td className="p-4 md:p-5 font-semibold text-white">Unstructured PDFs, audio, contracts, emails &amp; images</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 md:p-5 font-bold text-white font-mono">Decision Making</td>
                  <td className="p-4 md:p-5">Static if/else logic trees</td>
                  <td className="p-4 md:p-5">Rigid procedural scripts</td>
                  <td className="p-4 md:p-5">Suggests option for human choice</td>
                  <td className="p-4 md:p-5 font-semibold text-white">Contextual, policy-grounded autonomous decisions</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 md:p-5 font-bold text-white font-mono">Tool Use</td>
                  <td className="p-4 md:p-5">Hardcoded function calls</td>
                  <td className="p-4 md:p-5">GUI selectors &amp; screen coordinates</td>
                  <td className="p-4 md:p-5">Manual tool selection by user</td>
                  <td className="p-4 md:p-5 font-semibold text-white">Dynamic tool-calling &amp; API orchestration at runtime</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 md:p-5 font-bold text-white font-mono">API Integrations</td>
                  <td className="p-4 md:p-5">Fixed point-to-point endpoints</td>
                  <td className="p-4 md:p-5">Relies heavily on UI surface scraping</td>
                  <td className="p-4 md:p-5">Static webhook connectors</td>
                  <td className="p-4 md:p-5 font-semibold text-white">Direct REST/GraphQL, event streams &amp; OAuth</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 md:p-5 font-bold text-white font-mono">RAG (Knowledge Retrieval)</td>
                  <td className="p-4 md:p-5">Not supported</td>
                  <td className="p-4 md:p-5">Exact-match database queries</td>
                  <td className="p-4 md:p-5">Keyword search in prompt</td>
                  <td className="p-4 md:p-5 font-semibold text-white">Hybrid semantic vector search with verifiable citations</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 md:p-5 font-bold text-white font-mono">Human Oversight</td>
                  <td className="p-4 md:p-5">Manual error recovery</td>
                  <td className="p-4 md:p-5">Exception ticketing queues</td>
                  <td className="p-4 md:p-5">Human validates every step</td>
                  <td className="p-4 md:p-5 font-semibold text-white">Risk-calibrated HITL approval gates &amp; audit trails</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 md:p-5 font-bold text-white font-mono">Workflow Adaptation</td>
                  <td className="p-4 md:p-5">Requires manual re-coding</td>
                  <td className="p-4 md:p-5">Requires script re-recording</td>
                  <td className="p-4 md:p-5">Prompt engineering adjustments</td>
                  <td className="p-4 md:p-5 font-semibold text-white">Self-correcting execution loops &amp; dynamic routing</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 md:p-5 font-bold text-white font-mono">Maintenance</td>
                  <td className="p-4 md:p-5">Moderate (code refactoring)</td>
                  <td className="p-4 md:p-5">Extremely high (breaks frequently)</td>
                  <td className="p-4 md:p-5">Low to moderate</td>
                  <td className="p-4 md:p-5 font-semibold text-white">Low; resilient API contracts &amp; cognitive robustness</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 6: How AI Automation Works */}
        <section id="how-ai-automation-works" className="py-20 max-w-7xl mx-auto px-6 border-b border-white/10">
          <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">[ SYSTEM TOPOLOGY ]</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">How AI Automation Works</h2>
          <p className="text-gray-400 max-w-3xl mb-12 font-light">
            A resilient enterprise AI automation architecture coordinates ten distinct layers to ensure accuracy, auditability, and deterministic performance. While architecture varies according to specific business use cases, the standard execution flow follows this sequence:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-5 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-[#ccff00] font-bold">1. User or System Input:</span>
              <p className="text-gray-300 mt-1 font-sans text-sm">Captures incoming event (webhook, email, database insert, or manual user prompt).</p>
            </div>
            <div className="p-5 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-[#ccff00] font-bold">2. Authentication:</span>
              <p className="text-gray-300 mt-1 font-sans text-sm">Validates caller credentials, OAuth scopes, and HMAC webhook cryptographic signatures.</p>
            </div>
            <div className="p-5 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-[#ccff00] font-bold">3. Workflow Orchestration:</span>
              <p className="text-gray-300 mt-1 font-sans text-sm">State engine initiates task decomposition, execution graphs, and rate-limiting queues.</p>
            </div>
            <div className="p-5 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-[#ccff00] font-bold">4. AI Reasoning:</span>
              <p className="text-gray-300 mt-1 font-sans text-sm">Large Language Model analyzes unstructured data, intent, and formulates sub-tasks.</p>
            </div>
            <div className="p-5 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-[#ccff00] font-bold">5. Knowledge Retrieval / RAG:</span>
              <p className="text-gray-300 mt-1 font-sans text-sm">Queries vector database to extract authoritative company context and verified guidelines.</p>
            </div>
            <div className="p-5 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-[#ccff00] font-bold">6. Tool and API Execution:</span>
              <p className="text-gray-300 mt-1 font-sans text-sm">Executes deterministic API tool-calls (SQL queries, CRM updates, ERP writes).</p>
            </div>
            <div className="p-5 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-[#ccff00] font-bold">7. Validation:</span>
              <p className="text-gray-300 mt-1 font-sans text-sm">Runs schema checks, JSON validators, and business logic guardrails on model outputs.</p>
            </div>
            <div className="p-5 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-[#ccff00] font-bold">8. Human Approval Where Required:</span>
              <p className="text-gray-300 mt-1 font-sans text-sm">Suspends high-impact operations for human sign-off via Slack, email, or dashboard.</p>
            </div>
            <div className="p-5 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-[#ccff00] font-bold">9. Action:</span>
              <p className="text-gray-300 mt-1 font-sans text-sm">Commits finalized transactions, updates ledger balances, and transmits client responses.</p>
            </div>
            <div className="p-5 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-[#ccff00] font-bold">10. Logging &amp; Monitoring:</span>
              <p className="text-gray-300 mt-1 font-sans text-sm">Records immutable audit trails, tracks token latency, cost metrics, and error rates.</p>
            </div>
          </div>
        </section>

        {/* SECTION 7: RAG-Powered Business Automation */}
        <section id="rag-powered-business-automation" className="py-20 max-w-7xl mx-auto px-6 border-b border-white/10">
          <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">[ RETRIEVAL-AUGMENTED GENERATION ]</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">RAG-Powered Business Automation</h2>

          {/* AEO Direct Answer 05 */}
          <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-xl max-w-4xl mb-8">
            <p className="text-gray-200 text-sm md:text-base leading-relaxed">
              <strong className="text-[#ccff00]">RAG in AI automation (Retrieval-Augmented Generation) is</strong> an architectural pattern that connects foundational AI language models to private corporate data stores, retrieving verified context from vector databases before generating responses to guarantee factual grounding and eliminate hallucinations.
            </p>
          </div>

          <p className="text-gray-300 leading-relaxed mb-8 font-light text-base md:text-lg max-w-4xl">
            Without RAG, AI models rely solely on their public pre-training data, which is static and oblivious to private company manuals, pricing tiers, and real-time inventory. Our RAG implementations build a continuous ingestion pipeline:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Document Ingestion &amp; Vector Search</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light mb-4">
                Documents (PDFs, Notion, Confluence, SOPs) undergo text cleaning, semantic chunking (500–1000 tokens with overlap), and embedding generation using models like <code>text-embedding-3-large</code>. Vectors are indexed in high-performance stores such as <strong>pgvector</strong>, <strong>Pinecone</strong>, or <strong>Qdrant</strong> with metadata filtering for fast semantic retrieval.
              </p>
              <div className="text-[11px] font-mono text-[#ccff00]">
                Vector DBs: pgvector &bull; Pinecone &bull; Qdrant
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Grounded Generation &amp; Verified Citations</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light mb-4">
                When a workflow triggers a query, hybrid vector-keyword search retrieves relevant excerpts, injecting them into the model's system prompt. The model synthesizes answers restricted strictly to provided context, outputting verifiable citations and source links while respecting role-based document access controls.
              </p>
              <div className="text-[11px] font-mono text-[#ccff00]">
                Access Control: RBAC &bull; Dynamic metadata filtering &bull; Token gating
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: AI Automation Integrations */}
        <section id="ai-automation-integrations" className="py-20 max-w-7xl mx-auto px-6 border-b border-white/10">
          <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">[ ECOSYSTEM CONNECTIVITY ]</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">AI Automation Integrations</h2>

          {/* AEO Direct Answer 06 */}
          <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-xl max-w-4xl mb-8">
            <p className="text-gray-200 text-sm md:text-base leading-relaxed">
              <strong className="text-[#ccff00]">AI automation integrates with existing systems by</strong> utilizing secure REST and GraphQL APIs, event-driven webhooks, database connectors, and secure middleware. Rather than replacing existing software, AI automation acts as an intelligent orchestration layer connecting CRMs, ERPs, databases, and communication channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2">CRMs &amp; Sales Systems</h3>
              <p className="text-gray-400 font-light font-sans mb-3 text-xs">HubSpot, Salesforce, Pipedrive, Apollo, Clearbit.</p>
              <span className="text-[#ccff00]">Two-way contact enrichment, lead scoring, and automated sync.</span>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2">ERPs &amp; Accounting</h3>
              <p className="text-gray-400 font-light font-sans mb-3 text-xs">SAP, NetSuite, QuickBooks, Xero, Stripe, Plaid.</p>
              <span className="text-[#ccff00]">Invoice matching, reconciliation, and automated ledger postings.</span>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2">Databases &amp; Cloud Storage</h3>
              <p className="text-gray-400 font-light font-sans mb-3 text-xs">PostgreSQL, MongoDB, BigQuery, AWS S3, Google Cloud.</p>
              <span className="text-[#ccff00]">Encrypted event streaming and real-time data ingestion.</span>
            </div>
          </div>
        </section>

        {/* SECTION 9: AI Automation Security */}
        <section id="ai-automation-security" className="py-20 max-w-7xl mx-auto px-6 border-b border-white/10">
          <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">[ DATA PROTECTION &amp; GOVERNANCE ]</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">AI Automation Security</h2>

          <p className="text-gray-300 leading-relaxed mb-8 font-light text-base md:text-lg max-w-4xl">
            Enterprise AI automation must be engineered with defense-in-depth security principles. Our architectures are <strong>designed to support applicable security and privacy requirements</strong> across every operational layer:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-300">
            <div className="p-6 bg-zinc-900/40 rounded-2xl border border-white/10 space-y-3">
              <h3 className="text-lg font-bold text-white mb-2">Data Protection &amp; Access Controls</h3>
              <p><strong className="text-[#ccff00]">Encryption in Transit &amp; at Rest:</strong> TLS 1.3 for all API payloads and AES-256 for persistent database storage.</p>
              <p><strong className="text-[#ccff00]">Role-Based Access Control (RBAC):</strong> Granular permissions ensuring users only access authorized organizational data.</p>
              <p><strong className="text-[#ccff00]">Zero Data Retention:</strong> Strict API agreements ensuring business data is never used to train public foundation models.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-2xl border border-white/10 space-y-3">
              <h3 className="text-lg font-bold text-white mb-2">AI Guardrails &amp; Auditability</h3>
              <p><strong className="text-[#ccff00]">Prompt Injection Defense:</strong> Input sanitization layers stripping malicious delimiters and adversarial system prompts.</p>
              <p><strong className="text-[#ccff00]">Least-Privilege Tool Execution:</strong> Scoped API tokens limiting agent capabilities strictly to necessary endpoints.</p>
              <p><strong className="text-[#ccff00]">Immutable Audit Logs:</strong> Cryptographic logging of every input, model output, tool call, and human approval decision.</p>
            </div>
          </div>
        </section>

        {/* SECTION 10: Human-in-the-Loop AI Automation */}
        <section id="human-in-the-loop-ai-automation" className="py-20 max-w-7xl mx-auto px-6 border-b border-white/10">
          <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">[ RESPONSIBLE AI GOVERNANCE ]</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">Human-in-the-Loop AI Automation</h2>

          <p className="text-gray-300 leading-relaxed mb-8 font-light text-base md:text-lg max-w-4xl">
            Total autonomy is neither responsible nor necessary for high-stakes business operations. Human-in-the-Loop (HITL) architecture provides the optimal balance between high automated throughput and executive control. Our systems automatically pause and request human verification for:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-300">
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2">Financial Disbursements</h3>
              <p className="font-light leading-relaxed">Invoices, refunds, or payment transfers exceeding predefined dollar thresholds require authorized managerial sign-off.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2">Sensitive Communications</h3>
              <p className="font-light leading-relaxed">High-value enterprise sales outreach, customer dispute resolutions, and legal correspondence queue for human editing.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2">Irreversible System Changes</h3>
              <p className="font-light leading-relaxed">Database record deletions, access credential modifications, and contract execution require human authorization.</p>
            </div>
          </div>
        </section>

        {/* SECTION 11: AI Automation Development Process */}
        <section id="ai-automation-development-process" className="py-20 max-w-7xl mx-auto px-6 border-b border-white/10">
          <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">[ 8-STAGE METHODOLOGY ]</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8">AI Automation Development Process</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-xs font-mono text-[#ccff00] block mb-1">STAGE 01</span>
              <h3 className="text-base font-bold text-white mb-2">Discovery &amp; Workflow Analysis</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Analyze existing manual workflows, pinpoint operational bottlenecks, quantify time expenditure, and define specific measurable automation objectives.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-xs font-mono text-[#ccff00] block mb-1">STAGE 02</span>
              <h3 className="text-base font-bold text-white mb-2">Data &amp; Knowledge Assessment</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Audit enterprise knowledge assets (SOPs, documentation, databases, PDFs) and evaluate data hygiene, chunking requirements, and vectorization strategies.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-xs font-mono text-[#ccff00] block mb-1">STAGE 03</span>
              <h3 className="text-base font-bold text-white mb-2">AI Architecture Design</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Design the end-to-end technical blueprint, selecting foundational models, vector stores, orchestration frameworks, and security boundary controls.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-xs font-mono text-[#ccff00] block mb-1">STAGE 04</span>
              <h3 className="text-base font-bold text-white mb-2">Integration &amp; API Planning</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Map authentication mechanisms, REST/GraphQL endpoints, webhook listeners, rate limits, and failure fallback protocols across enterprise platforms.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-xs font-mono text-[#ccff00] block mb-1">STAGE 05</span>
              <h3 className="text-base font-bold text-white mb-2">RAG / Knowledge Layer Development</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Build document parsing pipelines, semantic chunking algorithms, vector embeddings, and high-performance similarity search with metadata filtering.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-xs font-mono text-[#ccff00] block mb-1">STAGE 06</span>
              <h3 className="text-base font-bold text-white mb-2">Agent &amp; Workflow Development</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Program autonomous agents, configure tool-calling protocols, establish state machines, and implement deterministic validation guardrails.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-xs font-mono text-[#ccff00] block mb-1">STAGE 07</span>
              <h3 className="text-base font-bold text-white mb-2">Security, Testing &amp; Human Oversight</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Conduct adversarial prompt injection testing, enforce role-based access control (RBAC), implement audit logging, and calibrate human approval thresholds.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-xs font-mono text-[#ccff00] block mb-1">STAGE 08</span>
              <h3 className="text-base font-bold text-white mb-2">Deployment, Monitoring &amp; Continuous Improvement</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Deploy to secure cloud infrastructure, monitor LLM latency and token economics, track execution accuracy telemetry, and continuously refine agents.</p>
            </div>
          </div>
        </section>

        {/* SECTION 12: How Much Does AI Automation Development Cost? */}
        <section id="how-much-does-ai-automation-development-cost" className="py-20 max-w-7xl mx-auto px-6 border-b border-white/10">
          <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">[ PRICING TRANSPARENCY ]</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">How Much Does AI Automation Development Cost?</h2>

          {/* AEO Direct Answer 07 */}
          <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-xl max-w-4xl mb-8">
            <p className="text-gray-200 text-sm md:text-base leading-relaxed">
              <strong className="text-[#ccff00]">AI automation development costs typically range from $5,000 to $12,000</strong> for focused single-workflow automations, $12,000 to $30,000 for integrated multi-system workflows with custom RAG pipelines, and $30,000+ for enterprise-grade autonomous multi-agent platforms with zero-trust security and custom UI dashboards.
            </p>
          </div>

          <p className="text-gray-300 leading-relaxed mb-8 font-light text-base md:text-lg max-w-4xl">
            Final investment is determined by workflow complexity, the number of software integrations, data volume, foundational AI model selection, RAG vector database requirements, and compliance governance parameters.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-gray-500 font-mono">TIER 1</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">Single Workflow Pilot</h3>
              <div className="text-2xl font-bold text-[#ccff00] mb-3 font-mono">$5,000 – $12,000</div>
              <p className="text-gray-400 leading-relaxed font-light">Focused automation targeting one core bottleneck (e.g. invoice extraction or lead scoring) with standard API connectors.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-[#ccff00]/40">
              <span className="text-[#ccff00] font-mono">TIER 2</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">Multi-System Automation</h3>
              <div className="text-2xl font-bold text-[#ccff00] mb-3 font-mono">$12,000 – $30,000</div>
              <p className="text-gray-400 leading-relaxed font-light">Cross-department workflows with custom RAG knowledge bases, CRM/ERP integration, and Slack/email human approval gates.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-gray-500 font-mono">TIER 3</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">Enterprise Multi-Agent Platform</h3>
              <div className="text-2xl font-bold text-[#ccff00] mb-3 font-mono">$30,000+</div>
              <p className="text-gray-400 leading-relaxed font-light">Autonomous agent network, dedicated cloud infrastructure, custom UI dashboards, advanced RBAC, and SLA monitoring.</p>
            </div>
          </div>
        </section>

        {/* SECTION 13: How Long Does AI Automation Development Take? */}
        <section id="how-long-does-ai-automation-development-take" className="py-20 max-w-7xl mx-auto px-6 border-b border-white/10">
          <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">[ DELIVERY TIMELINES ]</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">How Long Does AI Automation Development Take?</h2>

          {/* AEO Direct Answer 08 */}
          <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-xl max-w-4xl mb-8">
            <p className="text-gray-200 text-sm md:text-base leading-relaxed">
              <strong className="text-[#ccff00]">AI automation development typically takes between 2 to 14 weeks</strong>, depending on system complexity. A focused single-workflow prototype takes 2 to 4 weeks, an integrated business workflow takes 4 to 8 weeks, and an enterprise-scale multi-agent platform with custom RAG takes 8 to 14 weeks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-[#ccff00] font-mono">2–4 WEEKS</span>
              <h3 className="text-sm font-bold text-white mt-1 mb-2">Prototype / Single Workflow</h3>
              <p className="text-gray-400 font-light leading-relaxed">Quick-turnaround automation solving a single acute data or communication bottleneck.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-[#ccff00] font-mono">4–8 WEEKS</span>
              <h3 className="text-sm font-bold text-white mt-1 mb-2">Integrated Business Automation</h3>
              <p className="text-gray-400 font-light leading-relaxed">Multi-step automation integrated with core CRM, databases, and communication channels.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-[#ccff00] font-mono">8–12 WEEKS</span>
              <h3 className="text-sm font-bold text-white mt-1 mb-2">Multi-System Automation</h3>
              <p className="text-gray-400 font-light leading-relaxed">RAG-powered knowledge engines spanning multiple departmental software stacks.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <span className="text-[#ccff00] font-mono">12–16+ WEEKS</span>
              <h3 className="text-sm font-bold text-white mt-1 mb-2">Enterprise Automation</h3>
              <p className="text-gray-400 font-light leading-relaxed">Full autonomous agent ecosystem with high-concurrency security, custom UI, and audits.</p>
            </div>
          </div>
        </section>

        {/* SECTION 14: AI Automation for Startups and Growing Businesses */}
        <section id="ai-automation-for-startups-and-growing-businesses" className="py-20 max-w-7xl mx-auto px-6 border-b border-white/10">
          <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">[ SCALABLE GROWTH ]</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8">AI Automation for Startups and Growing Businesses</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-300">
            <div className="p-8 bg-zinc-900/40 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Startups &amp; SMBs</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light mb-6">
                Early-stage teams operate with constrained headcount. AI automation enables startups to maintain 24/7 client response times, qualify inbound leads instantly, and process documents without hiring large administrative teams.
              </p>
              <ul className="text-xs text-[#ccff00] space-y-2 font-mono">
                <li>&bull; 24/7 instant lead capture &amp; scoring</li>
                <li>&bull; Zero-headcount customer support coverage</li>
                <li>&bull; Automated invoice and expense tracking</li>
              </ul>
            </div>
            <div className="p-8 bg-zinc-900/40 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Growing Companies &amp; Enterprise Teams</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light mb-6">
                Scaling organizations encounter inter-departmental data silos and repetitive reconciliation tasks. AI automation connects fragmented software tools, accelerates throughput, and enforces consistent operational quality.
              </p>
              <ul className="text-xs text-[#ccff00] space-y-2 font-mono">
                <li>&bull; Cross-system ERP &amp; CRM data hygiene</li>
                <li>&bull; Unified RAG search across corporate wikis</li>
                <li>&bull; Strict compliance &amp; financial review gates</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 15: Why Choose AbuQitmirLabs for AI Automation? */}
        <section id="why-choose-abuqitmirlabs-for-ai-automation" className="py-20 max-w-7xl mx-auto px-6 border-b border-white/10">
          <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">[ ENGINEERING ADVANTAGE ]</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8">Why Choose AbuQitmirLabs for AI Automation?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-300">
            <div className="p-6 bg-zinc-900/40 rounded-2xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2">Full-Stack Software Expertise</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                We are not just prompt engineers. We build robust <Link to="/custom-software" className="text-[#ccff00] underline">custom software</Link>, <Link to="/web-development" className="text-[#ccff00] underline">web applications</Link>, and <Link to="/mobile-app-development" className="text-[#ccff00] underline">mobile apps</Link> with resilient backends and clean APIs.
              </p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-2xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2">Dedicated AI Agent Systems</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Our deep experience in <Link to="/ai-agent-development" className="text-[#ccff00] underline">AI agent development</Link> guarantees robust reasoning loops, stateful tool execution, and reliable RAG retrieval without hallucinations.
              </p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-2xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2">Complete Code &amp; IP Ownership</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                You retain 100% intellectual property and source code ownership. We deploy directly to your cloud infrastructure with zero vendor lock-in.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 16: Frequently Asked Questions */}
        <section id="frequently-asked-questions" className="py-20 max-w-7xl mx-auto px-6 border-b border-white/10">
          <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">[ KNOWLEDGE BASE ]</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 max-w-3xl mb-12 font-light">
            Targeted answers regarding enterprise AI automation, system integrations, RAG architecture, and security protocols:
          </p>

          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="rounded-xl bg-zinc-900/40 border border-white/10 overflow-hidden transition-colors hover:border-white/20"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={activeFaq === index}
                >
                  <span className="text-base md:text-lg font-bold text-white">{index + 1}. {faq.q}</span>
                  <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#ccff00] shrink-0 transition-transform duration-200 ${activeFaq === index ? 'rotate-45 bg-[#ccff00]/10' : ''}`}>
                    <Plus className="w-4 h-4" />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-6 pt-0 text-sm text-gray-300 font-light leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="py-24 max-w-7xl mx-auto px-6 text-center">
          <div className="p-12 md:p-16 rounded-3xl bg-gradient-to-b from-zinc-900/80 to-black border border-white/10 relative overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Ready to Automate Your Business Operations?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 font-light text-base md:text-lg">
              Schedule a technical discovery session with our engineering team to assess your workflows and design custom AI automation systems.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 bg-[#ccff00] text-black font-bold rounded-xl text-sm hover:bg-[#b8e600] transition-colors inline-flex items-center gap-2 uppercase tracking-wider"
              >
                <span>Schedule Discovery Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about/our-company"
                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl text-sm transition-colors uppercase tracking-wider"
              >
                About AbuQitmirLabs
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AIAutomationPage;

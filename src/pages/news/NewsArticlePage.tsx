import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { db, collection, getDocs, query, where } from '../../lib/firebase';
import { 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  ArrowLeft, 
  Share2, 
  Twitter, 
  Linkedin, 
  Copy, 
  Check, 
  Newspaper, 
  ChevronRight,
  BookOpen,
  Send,
  Building2
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface NewsArticle {
  id?: string;
  title: string;
  type?: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  location?: string;
  contact?: string;
  slug?: string;
}

export const staticNewsArticles: NewsArticle[] = [
  {
    id: "ai-rag-framework-launch",
    slug: "ai-rag-framework-launch",
    title: "AbuQitmirLabs Releases Autonomous Multi-Agent RAG Framework for Enterprise Clients",
    type: "latest",
    category: "Product Launch",
    date: "July 18, 2026",
    author: "Abu Qitmir Mohammad Shiraz Al-Madani",
    readTime: "6 min read",
    location: "Karachi, Pakistan",
    contact: "hello@abuqitmirlabs.tech",
    excerpt: "Our engineering studio in Karachi has announced a new open-spec RAG framework that cuts LLM vector search latency to under 180ms while guaranteeing zero data hallucination.",
    content: `# AbuQitmirLabs Releases Autonomous Multi-Agent RAG Framework for Enterprise Clients

Our engineering studio in Karachi has announced a new open-spec Retrieval-Augmented Generation (RAG) framework that cuts LLM vector search latency to under 180ms while guaranteeing zero data hallucination across enterprise document repositories.

## Key Breakthroughs in Multi-Agent RAG Architecture

Conventional RAG architectures suffer from slow vector embedding lookups, chunking noise, and Context Window saturation. Our new proprietary framework addresses these bottlenecks through three structural innovations:

1. **Hierarchical Document Parsing & Adaptive Chunking**: Instead of rigid fixed-token slicing, our engine parses document structural trees (headers, tables, footnotes) to preserve semantic cohesion.
2. **Hybrid Vector-Keyword Re-ranking**: Combines Pinecone vector cosine similarity with BM25 keyword matching and cross-encoder re-ranking, elevating retrieval accuracy to 99.2%.
3. **Sub-200ms Prompt Caching & Parallel Agentic Verification**: Multi-agent consensus verify retrieved context against factual constraints before generating the response.

> "Enterprise clients cannot tolerate AI hallucinations when operating in finance, law, or healthcare. This framework guarantees strict attribution and lineage for every sentence produced." — **Abu Qitmir Mohammad Shiraz Al-Madani, Lead Architect**

## Performance Benchmarks & Enterprise Rollout

Across 50+ enterprise benchmarks conducted in Q2 2026, the framework achieved:
- **Latency**: 174ms average end-to-end lookup.
- **Relevance Score**: 98.6% precision at Top-3 retrieved documents.
- **Memory Efficiency**: 40% reduction in token consumption via compressed context windows.

For deployment inquiries or custom integration with your private infrastructure, contact our engineering team at hello@abuqitmirlabs.tech.`
    },
    {
      id: "us-uk-expansion-q3",
      slug: "us-uk-expansion-q3",
      title: "AbuQitmirLabs Expands Dedicated Engineering Squads for US & UK Fintech Markets",
      type: "latest",
      category: "Company News",
      date: "June 28, 2026",
      author: "Engineering Studio Team",
      readTime: "5 min read",
      location: "Karachi, Pakistan",
      contact: "hello@abuqitmirlabs.tech",
      excerpt: "Following a 45% growth in international client contracts, AbuQitmirLabs expands its in-house developer squads in Karachi to support round-the-clock US EST and UK GMT shift deployments.",
      content: `# AbuQitmirLabs Expands Dedicated Engineering Squads for US & UK Fintech Markets

Following a 45% growth in international client contracts, AbuQitmirLabs expands its in-house developer squads in Karachi to support round-the-clock US EST and UK GMT shift deployments.

## Meeting Global Demand for Scalable Fintech Systems

As European and American financial institutions modernize legacy core systems, demand for specialized software engineering teams has reached an all-time high. AbuQitmirLabs has scaled its Karachi engineering hub to provide:

- **24/7 Dedicated Squad Coverage**: Real-time overlapping hours for US Eastern and UK GMT development cycles.
- **Bank-Grade Compliance**: Full adherence to PCI-DSS Level 1, GDPR, and ISO 27001 information security standards.
- **Bespoke Full-Stack Stack**: Low-latency Go microservices, React/Vite frontends, and hardened PostgreSQL databases.

## Geopolitical Engineering Advantage

By leveraging high-caliber engineering talent in Pakistan, international clients achieve 60% higher capital efficiency while retaining direct IP ownership and senior architectural oversight.`
    },
    {
      id: "generative-engine-optimization-geo-strategy",
      slug: "generative-engine-optimization-geo-strategy",
      title: "Generative Engine Optimization (GEO): The Complete 2026 Strategy for Technical Leaders",
      type: "industry-insights",
      category: "SEO & GEO",
      date: "May 14, 2026",
      author: "Abu Qitmir Mohammad Shiraz Al-Madani",
      readTime: "9 min read",
      location: "Karachi, Pakistan",
      contact: "hello@abuqitmirlabs.tech",
      excerpt: "Why traditional keyword stuffing fails in ChatGPT and Google AI Overviews. How to structure JSON-LD Schema entity graphs and direct answer blocks for maximum AI citation rates.",
      content: `# Generative Engine Optimization (GEO): The Complete 2026 Strategy for Technical Leaders

Why traditional keyword stuffing fails in ChatGPT and Google AI Overviews. How to structure JSON-LD Schema entity graphs and direct answer blocks for maximum AI citation rates.

## The Shift from Traditional SEO to GEO

In 2026, search engine result pages (SERPs) are dominated by AI Overviews and conversational agents. Traditional keyword-density metrics no longer dictate ranking. Instead, Large Language Models evaluate content based on **Entity Relationships, Factual Precision, and Direct Answer Nodes**.

### 4 Pillars of Generative Engine Optimization

1. **Direct Answer Block Priming**: Placing concise, authoritative 40-60 word summaries directly below section headers.
2. **Comprehensive Schema Graphing**: Linking \`@type: Organization\`, \`WebSite\`, \`Article\`, and \`FAQPage\` with unambiguous \`@id\` URI references.
3. **High Citation Source Attribution**: Referencing empirical data, primary statistics, and official certifications.
4. **Low Latency & Clean SSR DOM**: Ensuring search bots and LLM scrapers can parse complete textual content without client-side rendering bottlenecks.

## Empirical Benchmarks & Citation Lift

In a study of 120 client web properties engineered by AbuQitmirLabs, implementing structured GEO graph architectures yielded a **3.4x increase in Google AI Overview citation frequency** within 45 days.`
    },
    {
      id: "hipaa-cloud-certification",
      slug: "hipaa-cloud-certification",
      title: "AbuQitmirLabs Achieves Full HIPAA & ISO 27001 Cloud Security Validation",
      type: "press-releases",
      category: "Press Release",
      date: "April 02, 2026",
      author: "Media Relations Team",
      readTime: "4 min read",
      location: "Karachi, Pakistan",
      contact: "hello@abuqitmirlabs.tech",
      excerpt: "Official security audit confirms that all custom medical software platforms engineered by AbuQitmirLabs meet strict HIPAA, HITECH, and ISO 27001 data protection protocols.",
      content: `# AbuQitmirLabs Achieves Full HIPAA & ISO 27001 Cloud Security Validation

Official security audit confirms that all custom medical software platforms engineered by AbuQitmirLabs meet strict HIPAA, HITECH, and ISO 27001 data protection protocols.

## Rigorous Third-Party Compliance Validation

Following an exhaustive 6-month independent security audit, AbuQitmirLabs .TECH has officially earned full HIPAA & ISO 27001 security compliance validation.

### Audit Scope & Security Measures

- **Data Encryption at Rest & In Transit**: Mandatory AES-256 encryption for database stores and TLS 1.3 for all client API endpoints.
- **Zero PHI Exposure Architecture**: Automated data masking and isolated cloud tenancy for protected health information.
- **Immutable Audit Logging**: Real-time security event tracking and automated anomaly detection.

Healthcare organizations seeking custom EHR, telehealth, or diagnostic software can contact our compliance engineers at hello@abuqitmirlabs.tech.`
    },
    {
      id: "sub-200ms-rag-pipelines",
      slug: "sub-200ms-rag-pipelines",
      title: "Engineering Sub-200ms RAG Pipelines with Pinecone Vector Indexing and LlamaIndex",
      type: "industry-insights",
      category: "AI Architecture",
      date: "June 08, 2026",
      author: "Abu Huraira",
      readTime: "11 min read",
      location: "Karachi, Pakistan",
      contact: "hello@abuqitmirlabs.tech",
      excerpt: "A deep dive into chunking strategies, hybrid keyword-semantic search, and LLM prompt caching that cut enterprise AI query latency in half.",
      content: `# Engineering Sub-200ms RAG Pipelines with Pinecone Vector Indexing and LlamaIndex

A deep dive into chunking strategies, hybrid keyword-semantic search, and LLM prompt caching that cut enterprise AI query latency in half.

## Technical Blueprint for High-Speed Vector Search

Building production-ready Retrieval-Augmented Generation (RAG) systems requires strict performance budgeting. Here is how our team optimizes each stage of the pipeline:

### 1. Vector Database Optimization
- Utilize Pinecone serverless indexes with HNSW graph configurations.
- Store metadata keys as sparse vectors for parallel filtering.

### 2. Semantic Caching
- Cache high-frequency embedding queries in Redis with a 0.92 cosine similarity threshold.
- Bypasses vector index lookups for recurring user inquiries, reducing latency to < 15ms.

### 3. Prompt Compression
- Strip redundant stop words and structural filler before forwarding context to LLM endpoints.`
    },
    {
      id: "hipaa-compliant-telehealth-platforms",
      slug: "hipaa-compliant-telehealth-platforms",
      title: "Building HIPAA-Compliant Telehealth Platforms: Encryption, Audit Logs, and WebRTC Safety",
      type: "industry-insights",
      category: "Healthcare Tech",
      date: "March 22, 2026",
      author: "Engineering Studio Team",
      readTime: "8 min read",
      location: "Karachi, Pakistan",
      contact: "hello@abuqitmirlabs.tech",
      excerpt: "Architectural guidelines for medical software engineers ensuring zero PHI leaks, AES-256 data at rest, and secure real-time WebRTC video consultation streams.",
      content: `# Building HIPAA-Compliant Telehealth Platforms: Encryption, Audit Logs, and WebRTC Safety

Architectural guidelines for medical software engineers ensuring zero PHI leaks, AES-256 data at rest, and secure real-time WebRTC video consultation streams.

## Core Requirements for Telehealth Architecture

When engineering medical consultation platforms for US healthcare providers, security cannot be an afterthought:

- **End-to-End Encrypted WebRTC**: Peer-to-peer media streams encrypted with SRTP and DTLS.
- **PHI Separation**: Storing patient identification metadata separate from clinical notes and video recordings.
- **Strict Access Control**: Role-based access control (RBAC) enforced via JWT tokens and multi-factor authentication.`
    },
    {
      id: "microservices-vs-monoliths-fintech",
      slug: "microservices-vs-monoliths-fintech",
      title: "Microservices vs. Monoliths for Modern Fintech Platforms: Lessons from 50+ Financial Builds",
      type: "industry-insights",
      category: "Fintech Engineering",
      date: "February 17, 2026",
      author: "Abu Qitmir Mohammad Shiraz Al-Madani",
      readTime: "10 min read",
      location: "Karachi, Pakistan",
      contact: "hello@abuqitmirlabs.tech",
      excerpt: "When to decompose monolithic code into Go microservices to handle high transaction throughput, automated ledger reconciliation, and PCI-DSS compliance.",
      content: `# Microservices vs. Monoliths for Modern Fintech Platforms: Lessons from 50+ Financial Builds

When to decompose monolithic code into Go microservices to handle high transaction throughput, automated ledger reconciliation, and PCI-DSS compliance.

## The Modular Monolith First Approach

Many startups prematurely split applications into complex microservice architectures, introducing severe distributed tracing overhead. Our recommended roadmap:

1. **Phase 1: Modular Monolith**: Build with strict domain boundary isolation inside a single repository.
2. **Phase 2: Targeted Microservice Extraction**: Extract only bottleneck services (e.g., payment gateway adapters, ledger settlement workers) into independent Go services.
3. **Phase 3: Event-Driven Bus**: Use Apache Kafka or NATS for asynchronous transaction processing.`
    },
    {
      id: "milestone-410-projects-350-clients",
      slug: "milestone-410-projects-350-clients",
      title: "AbuQitmirLabs Crosses Milestone 410+ Projects and 350+ Global Enterprise Clients",
      type: "press-releases",
      category: "Press Release",
      date: "January 10, 2026",
      author: "Media Relations Team",
      readTime: "3 min read",
      location: "Karachi, Pakistan",
      contact: "hello@abuqitmirlabs.tech",
    excerpt: "Marking 5 years of operation since founding in 2021, AbuQitmirLabs celebrates over 410 successful software engineering deployments across the United States, United Kingdom, Australia, and European Union.",
    content: `# AbuQitmirLabs Crosses Milestone 410+ Projects and 350+ Global Enterprise Clients

Marking 5 years of operation since founding in 2021, AbuQitmirLabs celebrates over 410 successful software engineering deployments across the United States, United Kingdom, Australia, and European Union.

## A Record of Technical Excellence

From custom AI agents to high-volume e-commerce platforms and medical SaaS, AbuQitmirLabs continues to empower global businesses with custom software solutions.`
  }
];

export const generateSlug = (text: string) => {
  if (!text) return 'news-article';
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const NewsArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [allArticles, setAllArticles] = useState<NewsArticle[]>(staticNewsArticles);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchArticleAndList = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, 'news_items'));
        const dbItems: NewsArticle[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as NewsArticle));

        const merged = dbItems.length > 0 ? dbItems : staticNewsArticles;
        setAllArticles(merged);

        // Match requested article by id, slug, or title slug
        const targetId = id ? id.toLowerCase().trim() : '';
        let found = merged.find(a => 
          (a.id && a.id.toLowerCase() === targetId) ||
          (a.slug && (a.slug.toLowerCase() === targetId || a.slug.toLowerCase().endsWith('/' + targetId))) ||
          generateSlug(a.title) === targetId
        );

        // Fallback search in static list if not found in dbItems
        if (!found && dbItems.length > 0) {
          found = staticNewsArticles.find(a => 
            (a.id && a.id.toLowerCase() === targetId) ||
            (a.slug && (a.slug.toLowerCase() === targetId || a.slug.toLowerCase().endsWith('/' + targetId))) ||
            generateSlug(a.title) === targetId
          );
        }

        if (found) {
          setArticle(found);
        } else {
          // Default to first article if not matched
          setArticle(merged[0] || staticNewsArticles[0]);
        }
      } catch (e) {
        console.error("Error fetching news article:", e);
        // Fallback to static
        const targetId = id ? id.toLowerCase().trim() : '';
        const found = staticNewsArticles.find(a => 
          (a.id && a.id.toLowerCase() === targetId) ||
          (a.slug && (a.slug.toLowerCase() === targetId || a.slug.toLowerCase().endsWith('/' + targetId))) ||
          generateSlug(a.title) === targetId
        );
        setArticle(found || staticNewsArticles[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleAndList();
    window.scrollTo(0, 0);
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#ccff00]/20 border-t-[#ccff00] rounded-full animate-spin"></div>
          <p className="text-xs font-mono text-gray-400">Loading Article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-sans">
        <Header />
        <main className="pt-32 pb-20 text-center max-w-xl mx-auto px-6">
          <h1 className="text-3xl font-extrabold mb-4">Article Not Found</h1>
          <p className="text-gray-400 text-sm mb-8">The requested news publication could not be located.</p>
          <Link to="/news/all" className="px-6 py-3 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl">
            Return to News Archive
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const currentUrl = window.location.href;
  const related = allArticles.filter(a => a.title !== article.title).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": article.date,
    "author": {
      "@type": "Person",
      "name": article.author || "Abu Qitmir Mohammad Shiraz Al-Madani"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AbuQitmirLabs .TECH",
      "logo": "https://abuqitmirlabs.tech/logo.png"
    },
    "mainEntityOfPage": currentUrl
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <Helmet>
        <title>{article.title} — AbuQitmirLabs .TECH Newsroom</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:title" content={`${article.title} | AbuQitmirLabs`} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-4xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'News Archive', path: '/news/all' },
            { label: article.category, path: `/news/${article.type || 'latest'}` },
            { label: 'Article', path: window.location.pathname }
          ]} />
        </div>

        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase text-gray-400 hover:text-[#ccff00] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Newsroom
          </button>
        </div>

        {/* Article Header & Metadata */}
        <article className="max-w-4xl mx-auto px-6">
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xs font-mono font-bold text-[#ccff00] px-3.5 py-1.5 bg-[#ccff00]/10 rounded-full border border-[#ccff00]/20 uppercase tracking-wider">
                {article.category}
              </span>
              <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#ccff00]" /> {article.date}
              </span>
              <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#ccff00]" /> {article.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-8 text-white">
              {article.title}
            </h1>

            {/* Author & Location Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] font-bold text-sm">
                  {article.author ? article.author.charAt(0) : 'A'}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{article.author || "Abu Qitmir Mohammad Shiraz Al-Madani"}</div>
                  <div className="text-xs font-mono text-gray-400">{article.location || "Karachi, Pakistan"}</div>
                </div>
              </div>

              {/* Share & Contact buttons */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleCopyLink}
                  className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white transition-all border border-white/5"
                  title="Copy Article Link"
                >
                  {copied ? <Check className="w-4 h-4 text-[#ccff00]" /> : <Copy className="w-4 h-4" />}
                </button>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white transition-all border border-white/5"
                  title="Share on Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white transition-all border border-white/5"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </header>

          {/* Direct Answer Summary Block */}
          {article.excerpt && (
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl mb-10 shadow-2xl backdrop-blur-md">
              <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] font-bold block mb-2">
                Executive Summary
              </span>
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-sans font-normal">
                {article.excerpt}
              </p>
            </div>
          )}

          {/* Main Article Body */}
          <div className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-white 
            prose-h1:text-3xl prose-h2:text-2xl prose-h2:text-[#ccff00] prose-h2:mt-10 prose-h2:mb-4 
            prose-h3:text-xl prose-h3:text-gray-100 prose-h3:mt-8 prose-h3:mb-3 
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:font-light 
            prose-li:text-gray-300 prose-li:leading-relaxed 
            prose-blockquote:border-l-4 prose-blockquote:border-[#ccff00] prose-blockquote:bg-zinc-900/50 prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:text-gray-200 prose-blockquote:not-italic 
            prose-strong:text-white prose-strong:font-bold 
            prose-code:text-[#ccff00] prose-code:bg-zinc-900 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-xs"
          >
            <Markdown remarkPlugins={[remarkGfm]}>
              {article.content || article.excerpt}
            </Markdown>
          </div>

          {/* Media Contact Footer Box if present */}
          {article.contact && (
            <div className="mt-14 p-8 rounded-2xl bg-zinc-900/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#ccff00]" /> Editorial & Press Inquiries
                </h3>
                <p className="text-xs font-mono text-gray-400">
                  Contact media team regarding this story: <span className="text-white font-bold">{article.contact}</span>
                </p>
              </div>
              <a 
                href={`mailto:${article.contact}?subject=Inquiry regarding: ${encodeURIComponent(article.title)}`}
                className="px-6 py-3 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:scale-105 transition-all shrink-0"
              >
                Contact Press Office
              </a>
            </div>
          )}

          {/* Related Articles Section */}
          {related.length > 0 && (
            <section className="mt-20 pt-16 border-t border-white/10">
              <h2 className="text-2xl font-extrabold mb-8 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-[#ccff00]" /> Related News Publications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((rel, idx) => {
                  const relSlug = rel.id || generateSlug(rel.title);
                  return (
                    <Link 
                      key={idx} 
                      to={`/news/article/${relSlug}`} 
                      className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00] transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <span className="text-[10px] font-mono text-[#ccff00] px-2.5 py-0.5 bg-[#ccff00]/10 rounded-full border border-[#ccff00]/20 mb-3 inline-block">
                          {rel.category}
                        </span>
                        <h3 className="text-base font-bold text-white group-hover:text-[#ccff00] transition-colors leading-snug mb-3">
                          {rel.title}
                        </h3>
                        <p className="text-gray-400 text-xs line-clamp-2 mb-4 font-light">
                          {rel.excerpt}
                        </p>
                      </div>
                      <div className="text-[11px] font-mono text-[#ccff00] uppercase font-bold flex items-center gap-1 pt-3 border-t border-white/5">
                        Read Story <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default NewsArticlePage;

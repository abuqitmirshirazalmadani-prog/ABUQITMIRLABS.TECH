import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { db, collection, getDocs } from '../../lib/firebase';
import { 
  Sparkles, 
  Calendar, 
  Tag, 
  ArrowRight, 
  Plus, 
  ChevronRight, 
  BookOpen, 
  BrainCircuit, 
  ShieldCheck, 
  Code2,
  TrendingUp
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountryMarquee from '../../components/CountryMarquee';

import { generateSlug } from './NewsArticlePage';

const IndustryInsightsPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [dynamicInsights, setDynamicInsights] = useState<any[]>([]);

  const defaultInsights = [
    {
      id: "google-ai-dogfooding-enterprise-results",
      title: "Google's AI 'Dogfooding' Playbook: What 83% Sales Adoption and 20% Higher Win Rates Mean for Enterprise AI",
      author: "Abu Qitmir Mohammad Shiraz Al-Madani",
      date: "July 25, 2026",
      topic: "Industry Insights",
      excerpt: "Google's internal AI metrics reveal 83% sales adoption, 20% higher win rates, and 75% autonomous support resolution. What enterprise leaders can learn from a decade of AI dogfooding.",
      readTime: "7 min read"
    },
    {
      id: "generative-engine-optimization-geo-strategy",
      title: "Generative Engine Optimization (GEO): The Complete 2026 Strategy for Technical Leaders",
      author: "Abu Qitmir Mohammad Shiraz Al-Madani",
      date: "May 14, 2026",
      topic: "SEO & GEO",
      excerpt: "Why traditional keyword stuffing fails in ChatGPT and Google AI Overviews. How to structure JSON-LD Schema entity graphs and direct answer blocks for maximum AI citation rates.",
      readTime: "9 min read"
    },
    {
      id: "sub-200ms-rag-pipelines",
      title: "Engineering Sub-200ms RAG Pipelines with Pinecone Vector Indexing and LlamaIndex",
      author: "Abu Huraira",
      date: "June 08, 2026",
      topic: "AI Architecture",
      excerpt: "A deep dive into chunking strategies, hybrid keyword-semantic search, and LLM prompt caching that cut enterprise AI query latency in half.",
      readTime: "11 min read"
    },
    {
      id: "hipaa-compliant-telehealth-platforms",
      title: "Building HIPAA-Compliant Telehealth Platforms: Encryption, Audit Logs, and WebRTC Safety",
      author: "Engineering Studio Team",
      date: "March 22, 2026",
      topic: "Healthcare Tech",
      excerpt: "Architectural guidelines for medical software engineers ensuring zero PHI leaks, AES-256 data at rest, and secure real-time WebRTC video consultation streams.",
      readTime: "8 min read"
    },
    {
      id: "microservices-vs-monoliths-fintech",
      title: "Microservices vs. Monoliths for Modern Fintech Platforms: Lessons from 50+ Financial Builds",
      author: "Abu Qitmir Mohammad Shiraz Al-Madani",
      date: "February 17, 2026",
      topic: "Fintech Engineering",
      excerpt: "When to decompose monolithic code into Go microservices to handle high transaction throughput, automated ledger reconciliation, and PCI-DSS compliance.",
      readTime: "10 min read"
    }
  ];

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'news_items'));
        const items = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter((item: any) => item.type === 'industry-insights' || item.type === 'all')
          .map((item: any) => ({
            id: item.id,
            slug: item.slug,
            title: item.title,
            author: item.author || "Abu Qitmir Mohammad Shiraz Al-Madani",
            date: item.date,
            topic: item.category || "Industry Insights",
            excerpt: item.excerpt || item.content,
            readTime: item.readTime || "5 min read"
          }));
        if (items.length > 0) {
          setDynamicInsights(items);
        }
      } catch (e) {
        console.error("Error fetching industry insights from Firestore:", e);
      }
    };
    fetchInsights();
  }, []);

  const insights = dynamicInsights.length > 0 ? dynamicInsights : defaultInsights;

  const faqs = [
    {
      q: "Who writes the Industry Insights articles at AbuQitmirLabs?",
      a: "All insights are authored directly by our Founder & Lead Architect Abu Qitmir, senior systems engineers, and technical SEO leads based on real project deployments."
    },
    {
      q: "Are your technical benchmarks open source?",
      a: "Yes. Code snippets, benchmark methodologies, and schema examples cited in our insights articles are free for developers to reference and adapt."
    },
    {
      q: "Can I request a topic for a future industry insight paper?",
      a: "Absolutely. Send your architectural questions or topic suggestions to info@abuqitmirlabs.tech."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <Helmet>
        <title>Industry Insights — Technical Thought Leadership | AbuQitmirLabs</title>
        <meta name="description" content="In-depth technical insights, AI architecture research, GEO search strategies, and software engineering benchmarks from AbuQitmirLabs .TECH." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/news/industry-insights" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'News', path: '/news/all' },
            { label: 'Industry Insights', path: '/news/industry-insights' }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(204,255,0,0.06),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-8">
              <BrainCircuit className="w-4 h-4" /> Architectural Thought Leadership
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl">
              Industry Insights — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-[#88a800]">Engineering & Search Benchmarks</span>
            </h1>

            {/* Direct Answer Block */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl max-w-4xl mb-12 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Direct Answer:</strong> Industry Insights by AbuQitmirLabs .TECH provides technical breakdowns on AI RAG architecture, Generative Engine Optimization (GEO), HIPAA compliance engineering, and low-latency full-stack system design written by senior software architects.
              </p>
            </div>

            {/* Category Navigation Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
              <Link to="/news/latest" className="px-5 py-2.5 bg-zinc-900 border border-white/10 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-full hover:border-[#ccff00] transition-all">
                Latest News
              </Link>
              <Link to="/news/press-releases" className="px-5 py-2.5 bg-zinc-900 border border-white/10 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-full hover:border-[#ccff00] transition-all">
                Press Releases
              </Link>
              <Link to="/news/industry-insights" className="px-5 py-2.5 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider rounded-full">
                Industry Insights
              </Link>
              <Link to="/news/all" className="px-5 py-2.5 bg-zinc-900 border border-white/10 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-full hover:border-[#ccff00] transition-all">
                All News Archive
              </Link>
            </div>
          </div>
        </section>

        <CountryMarquee />

        {/* Insights Grid */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {insights.map((item, idx) => (
              <article key={idx} className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00] transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-mono text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 rounded-full border border-[#ccff00]/20">
                      {item.topic}
                    </span>
                    <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#ccff00]" /> {item.date}
                    </span>
                  </div>

                  <h2 className="text-2xl font-extrabold mb-4 group-hover:text-[#ccff00] transition-colors leading-tight">
                    {item.title}
                  </h2>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-500">By {item.author} ({item.readTime})</span>
                  <Link to={`/news/article/${item.id || item.slug || generateSlug(item.title)}`} className="text-xs font-mono uppercase text-[#ccff00] font-bold hover:underline flex items-center gap-1">
                    Read Article <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-28 bg-zinc-950/90 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Direct Answers</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-white/10 rounded-2xl bg-zinc-900/50 overflow-hidden">
                  <button 
                    className="w-full p-6 text-left font-bold text-lg flex items-center justify-between gap-4 hover:text-[#ccff00] transition-colors"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  >
                    <span>{faq.q}</span>
                    <Plus className={`w-5 h-5 text-[#ccff00] shrink-0 transition-transform ${activeFaq === idx ? 'rotate-45' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-6 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 font-mono"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default IndustryInsightsPage;

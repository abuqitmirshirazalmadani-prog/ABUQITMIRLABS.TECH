import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { db, collection, getDocs } from '../../lib/firebase';
import { 
  Newspaper, 
  Calendar, 
  Tag, 
  ArrowRight, 
  Plus, 
  ChevronRight, 
  Send, 
  Sparkles, 
  Globe, 
  Building2, 
  Search,
  Rss
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountryMarquee from '../../components/CountryMarquee';

import { generateSlug } from './NewsArticlePage';

const getArticleSlug = (item: any) => {
  if (item.slug && typeof item.slug === 'string' && item.slug.trim()) {
    let s = item.slug.trim();
    if (s.includes('/')) {
      const parts = s.split('/');
      s = parts[parts.length - 1];
    }
    if (s && s !== 'latest' && s !== 'press-releases' && s !== 'industry-insights' && s !== 'all') {
      return s;
    }
  }
  if (item.title && typeof item.title === 'string' && item.title.trim()) {
    return generateSlug(item.title);
  }
  return item.id || 'article';
};

const LatestNewsPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [dynamicNews, setDynamicNews] = useState<any[]>([]);

  const defaultNewsItems = [
    {
      id: "ai-rag-framework-launch",
      title: "AbuQitmirLabs Releases Autonomous Multi-Agent RAG Framework for Enterprise Clients",
      date: "July 18, 2026",
      category: "Product Launch",
      excerpt: "Our engineering studio in Karachi has announced a new open-spec RAG framework that cuts LLM vector search latency to under 180ms while guaranteeing zero data hallucination.",
      readTime: "4 min read",
      slug: "/news/article/ai-rag-framework-launch"
    },
    {
      id: "us-uk-expansion-q3",
      title: "AbuQitmirLabs Expands Dedicated Engineering Squads for US & UK Fintech Markets",
      date: "June 28, 2026",
      category: "Company News",
      excerpt: "Following a 45% growth in international client contracts, AbuQitmirLabs expands its in-house developer squads in Karachi to support round-the-clock US EST and UK GMT shift deployments.",
      readTime: "5 min read",
      slug: "/news/article/us-uk-expansion-q3"
    },
    {
      id: "generative-engine-optimization-geo-strategy",
      title: "Technical Benchmark: How Generative Engine Optimization (GEO) Outperforms Traditional SEO in 2026",
      date: "May 14, 2026",
      category: "Industry Insights",
      excerpt: "An empirical study by Lead Architect Abu Qitmir revealing how structured entity graphs and direct answer blocks gain 3.4x higher citation rates in Google AI Overviews.",
      readTime: "8 min read",
      slug: "/news/article/generative-engine-optimization-geo-strategy"
    },
    {
      id: "hipaa-cloud-certification",
      title: "AbuQitmirLabs Achieves Full HIPAA & ISO 27001 Cloud Security Validation",
      date: "April 02, 2026",
      category: "Press Release",
      excerpt: "Official security audit confirms that all custom medical software platforms engineered by AbuQitmirLabs meet strict HIPAA, HITECH, and ISO 27001 data protection protocols.",
      readTime: "3 min read",
      slug: "/news/article/hipaa-cloud-certification"
    }
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'news_items'));
        const items = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter((item: any) => item.type === 'latest' || item.type === 'all');
        if (items.length > 0) {
          setDynamicNews(items);
        }
      } catch (e) {
        console.error("Error fetching news from Firestore:", e);
      }
    };
    fetchNews();
  }, []);

  const newsItems = dynamicNews.length > 0 ? dynamicNews : defaultNewsItems;

  const faqs = [
    {
      q: "How often is the AbuQitmirLabs news section updated?",
      a: "Our newsroom is updated weekly with company press announcements, technical framework benchmarks, client case study reveals, and AI/SEO industry insights."
    },
    {
      q: "Can I subscribe to receive technical updates and news in my inbox?",
      a: "Yes. Enter your email in the subscription box below to receive our monthly engineering bulletin, featuring deep-dive articles on AI, low-latency web design, and search optimization."
    },
    {
      q: "How can journalists or media representatives submit inquiries?",
      a: "Media inquiries, interview requests with Founder Abu Qitmir, and press kit downloads are handled directly via info@abuqitmirlabs.tech."
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
        <title>Latest News — AbuQitmirLabs .TECH | Company & Tech Announcements</title>
        <meta name="description" content="Stay updated with the latest news, product launches, AI research, and industry insights from AbuQitmirLabs .TECH." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/news/latest" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'News', path: '/news/all' },
            { label: 'Latest News', path: '/news/latest' }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(204,255,0,0.06),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-8">
              <Newspaper className="w-4 h-4" /> AbuQitmirLabs Newsroom
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl">
              Latest News — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-[#88a800]">Company Updates & Breakthroughs</span>
            </h1>

            {/* Direct Answer Block */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl max-w-4xl mb-12 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Direct Answer:</strong> The Latest News hub at AbuQitmirLabs .TECH publishes real-time updates regarding our custom software launches, AI agent frameworks, corporate press releases, and technical search insights from our engineering studio in Karachi.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-10 font-light">
              Explore recent project releases, architectural research, and company milestones.
            </p>

            {/* Category Navigation Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
              <Link to="/news/latest" className="px-5 py-2.5 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider rounded-full">
                Latest News
              </Link>
              <Link to="/news/press-releases" className="px-5 py-2.5 bg-zinc-900 border border-white/10 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-full hover:border-[#ccff00] transition-all">
                Press Releases
              </Link>
              <Link to="/news/industry-insights" className="px-5 py-2.5 bg-zinc-900 border border-white/10 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-full hover:border-[#ccff00] transition-all">
                Industry Insights
              </Link>
              <Link to="/news/all" className="px-5 py-2.5 bg-zinc-900 border border-white/10 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-full hover:border-[#ccff00] transition-all">
                All News Archive
              </Link>
            </div>
          </div>
        </section>

        <CountryMarquee />

        {/* News Feed Grid */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsItems.map((item, idx) => (
              <article key={idx} className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00] transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-mono text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 rounded-full border border-[#ccff00]/20">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {item.date}
                    </span>
                  </div>

                  <h2 className="text-2xl font-extrabold mb-4 group-hover:text-[#ccff00] transition-colors leading-tight">
                    {item.title}
                  </h2>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                    {item.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <span className="text-xs font-mono text-gray-500">{item.readTime}</span>
                  <Link to={`/news/article/${getArticleSlug(item)}`} className="text-xs font-mono uppercase text-[#ccff00] font-bold hover:underline flex items-center gap-1">
                    Read Story <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Email Newsletter Subscription */}
        <section className="py-16 bg-zinc-950 border-y border-white/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Rss className="w-10 h-10 text-[#ccff00] mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold mb-3">Subscribe to Technical Updates</h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8 font-light">
              Get monthly architectural insights, AI agent engineering notes, and search optimization breakdowns straight to your inbox. Zero spam.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing to AbuQitmirLabs news!"); }} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                required 
                placeholder="Enter your business email..." 
                className="w-full px-5 py-3.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#ccff00]"
              />
              <button 
                type="submit" 
                className="w-full sm:w-auto px-8 py-3.5 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:scale-105 transition-all shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-28 bg-zinc-950/90">
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

export default LatestNewsPage;

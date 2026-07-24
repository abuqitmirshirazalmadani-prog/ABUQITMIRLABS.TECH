import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { db, collection, getDocs } from '../../lib/firebase';
import { 
  Newspaper, 
  Calendar, 
  Search, 
  ArrowRight, 
  Plus, 
  ChevronRight, 
  Tag, 
  Filter
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountryMarquee from '../../components/CountryMarquee';
import { generateSlug } from './NewsArticlePage';

const AllNewsPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dynamicArticles, setDynamicArticles] = useState<any[]>([]);

  const defaultArticles = [
    {
      id: "ai-rag-framework-launch",
      title: "AbuQitmirLabs Releases Autonomous Multi-Agent RAG Framework for Enterprise Clients",
      date: "July 18, 2026",
      category: "Product Launch",
      excerpt: "Our engineering studio in Karachi has announced a new open-spec RAG framework that cuts LLM vector search latency to under 180ms.",
      link: "/news/article/ai-rag-framework-launch"
    },
    {
      id: "us-uk-expansion-q3",
      title: "AbuQitmirLabs Expands Dedicated Engineering Squads for US & UK Fintech Markets",
      date: "June 28, 2026",
      category: "Company News",
      excerpt: "Expanding our in-house developer squads in Karachi to support round-the-clock US EST and UK GMT shift deployments.",
      link: "/news/article/us-uk-expansion-q3"
    },
    {
      id: "generative-engine-optimization-geo-strategy",
      title: "Generative Engine Optimization (GEO): The Complete 2026 Strategy for Technical Leaders",
      date: "May 14, 2026",
      category: "Industry Insights",
      excerpt: "How to structure JSON-LD Schema entity graphs and direct answer blocks for maximum AI citation rates in ChatGPT and Gemini.",
      link: "/news/article/generative-engine-optimization-geo-strategy"
    },
    {
      id: "hipaa-cloud-certification",
      title: "AbuQitmirLabs Achieves Full HIPAA & ISO 27001 Cloud Security Validation",
      date: "April 02, 2026",
      category: "Press Release",
      excerpt: "Official security audit confirms that all custom medical software platforms engineered by AbuQitmirLabs meet strict HIPAA data protection protocols.",
      link: "/news/article/hipaa-cloud-certification"
    },
    {
      id: "sub-200ms-rag-pipelines",
      title: "Engineering Sub-200ms RAG Pipelines with Pinecone Vector Indexing and LlamaIndex",
      date: "June 08, 2026",
      category: "Industry Insights",
      excerpt: "A deep dive into chunking strategies and LLM prompt caching that cut enterprise AI query latency in half.",
      link: "/news/article/sub-200ms-rag-pipelines"
    },
    {
      id: "milestone-410-projects-350-clients",
      title: "AbuQitmirLabs Crosses Milestone 410+ Projects and 350+ Global Enterprise Clients",
      date: "January 10, 2026",
      category: "Press Release",
      excerpt: "Celebrating 5 years of operation since founding in 2021 with over 410 successful software engineering deployments worldwide.",
      link: "/news/article/milestone-410-projects-350-clients"
    }
  ];

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'news_items'));
        const items = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .map((item: any) => ({
            id: item.id,
            slug: item.slug,
            title: item.title,
            date: item.date,
            category: item.category || "General News",
            excerpt: item.excerpt || item.content,
            link: `/news/article/${item.id || item.slug || generateSlug(item.title)}`
          }));
        if (items.length > 0) {
          setDynamicArticles(items);
        }
      } catch (e) {
        console.error("Error fetching all news from Firestore:", e);
      }
    };
    fetchAllNews();
  }, []);

  const allArticles = dynamicArticles.length > 0 ? dynamicArticles : defaultArticles;

  const filteredArticles = allArticles.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const faqs = [
    {
      q: "How can I search the AbuQitmirLabs news archive?",
      a: "Use the real-time search input and category filter buttons on this page to instantly filter through all published news items, press releases, and technical papers."
    },
    {
      q: "Can I reproduce or publish articles from AbuQitmirLabs?",
      a: "Yes. All articles published in our news archive may be shared or cited with proper attribution and canonical backlink to AbuQitmirLabs .TECH."
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
        <title>All News — Comprehensive News & Article Archive | AbuQitmirLabs</title>
        <meta name="description" content="Explore the full archive of news articles, press releases, technical insights, and company milestones from AbuQitmirLabs .TECH." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/news/all" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'News', path: '/news/all' },
            { label: 'All News Archive', path: '/news/all' }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(204,255,0,0.06),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-8">
              <Newspaper className="w-4 h-4" /> Full News Archive
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl">
              All News — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-[#88a800]">Chronological Media Archive</span>
            </h1>

            {/* Direct Answer Block */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl max-w-4xl mb-12 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Direct Answer:</strong> The All News archive of AbuQitmirLabs .TECH provides an indexed catalog of all company announcements, official press releases, product launches, and technical engineering insights published since 2021.
              </p>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row items-center gap-4 bg-zinc-900/80 p-4 rounded-2xl border border-white/10 max-w-4xl">
              <div className="relative w-full">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title, framework, or keyword..." 
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#ccff00]"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto shrink-0 overflow-x-auto pb-2 md:pb-0">
                {['All', 'Product Launch', 'Company News', 'Industry Insights', 'Press Release'].map((cat, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono uppercase transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-[#ccff00] text-black font-extrabold' : 'bg-black/50 border border-white/10 text-gray-400 hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CountryMarquee />

        {/* Article Grid */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art, idx) => (
              <article key={idx} className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00] transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-[10px] font-mono text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 rounded-full border border-[#ccff00]/20">
                      {art.category}
                    </span>
                    <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {art.date}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold mb-3 group-hover:text-[#ccff00] transition-colors leading-snug">
                    {art.title}
                  </h2>

                  <p className="text-gray-400 text-xs leading-relaxed mb-6 font-light">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <Link to={art.link} className="text-xs font-mono uppercase text-[#ccff00] font-bold hover:underline flex items-center gap-1">
                    View Publication <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20 text-gray-400 font-mono">
              No news items matching "{searchQuery}" in category "{selectedCategory}".
            </div>
          )}
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

export default AllNewsPage;

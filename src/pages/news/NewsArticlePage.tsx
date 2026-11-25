import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
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
import MarkdownRenderer from '../../components/MarkdownRenderer';
import remarkGfm from 'remark-gfm';

import { STATIC_NEWS_ARTICLES, generateNewsSlug, StaticNewsArticle } from '../../../lib/static-news-data';

export type NewsArticle = StaticNewsArticle;
export const staticNewsArticles: NewsArticle[] = STATIC_NEWS_ARTICLES;
export const generateSlug = generateNewsSlug;

const getSsrInjectedNews = (targetId: string): { article: NewsArticle | null; allArticles: NewsArticle[] } => {
  if (typeof document === 'undefined') return { article: null, allArticles: [] };
  try {
    const el = document.getElementById('__SSR_NEWS_ARTICLE__');
    if (!el || !el.textContent) return { article: null, allArticles: [] };
    const raw = el.textContent.trim();
    let jsonStr = raw;
    if (el.getAttribute('data-encoding') === 'base64' && typeof window !== 'undefined' && typeof window.atob === 'function') {
      const binString = window.atob(raw);
      const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0) || 0);
      jsonStr = new TextDecoder('utf-8').decode(bytes);
    }
    const parsed = JSON.parse(jsonStr);
    const a = parsed?.article as NewsArticle | undefined;
    const list = Array.isArray(parsed?.allArticles) ? (parsed.allArticles as NewsArticle[]) : [];
    const matchesTarget = a && targetId && (
      String(a.id || '').toLowerCase() === targetId ||
      String(a.slug || '').toLowerCase() === targetId ||
      generateSlug(a.title || '') === targetId
    );
    return { article: matchesTarget ? a! : null, allArticles: list };
  } catch {
    return { article: null, allArticles: [] };
  }
};

const mergeNewsCollections = (primary: NewsArticle[], fallback: NewsArticle[]): NewsArticle[] => {
  const bySlug = new Map<string, NewsArticle>();
  for (const item of [...primary, ...fallback]) {
    if ((item as any).published === false) continue;
    const key = String(item.slug || item.id || generateSlug(item.title || '')).toLowerCase().trim();
    if (key && !bySlug.has(key)) {
      bySlug.set(key, item);
    }
  }
  return Array.from(bySlug.values());
};

const NewsArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const targetId = typeof id === 'string' ? id.toLowerCase().trim() : '';
  const ssrData = getSsrInjectedNews(targetId);
  const initialPool = mergeNewsCollections(ssrData.allArticles, staticNewsArticles);
  const initialArticle = ssrData.article || initialPool.find(a => {
    const aId = typeof a.id === 'string' ? a.id.toLowerCase() : '';
    const aSlug = typeof a.slug === 'string' ? a.slug.toLowerCase() : '';
    return (aId && aId === targetId) ||
      (aSlug && (aSlug === targetId || aSlug.endsWith('/' + targetId))) ||
      (a.title && generateSlug(a.title) === targetId);
  }) || null;

  const [article, setArticle] = useState<NewsArticle | null>(initialArticle);
  const [allArticles, setAllArticles] = useState<NewsArticle[]>(initialPool);
  const [loading, setLoading] = useState(!initialArticle);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchArticleAndList = async () => {
      if (!initialArticle) {
        setLoading(true);
      }
      try {
        const snapshot = await getDocs(collection(db, 'news_items'));
        const dbItems: NewsArticle[] = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as NewsArticle))
          .filter(item => (item as any).published !== false);

        const merged = mergeNewsCollections(dbItems, staticNewsArticles);
        setAllArticles(merged);

        const reqId = typeof id === 'string' ? id.toLowerCase().trim() : '';
        const found = merged.find(a => {
          const aId = typeof a.id === 'string' ? a.id.toLowerCase() : '';
          const aSlug = typeof a.slug === 'string' ? a.slug.toLowerCase() : '';
          return (aId && aId === reqId) ||
            (aSlug && (aSlug === reqId || aSlug.endsWith('/' + reqId))) ||
            (a.title && generateSlug(a.title) === reqId);
        });

        setArticle(found || null);
      } catch (e) {
        console.error("Error fetching news article:", e);
        const reqId = typeof id === 'string' ? id.toLowerCase().trim() : '';
        const found = staticNewsArticles.find(a => {
          const aId = typeof a.id === 'string' ? a.id.toLowerCase() : '';
          const aSlug = typeof a.slug === 'string' ? a.slug.toLowerCase() : '';
          return (aId && aId === reqId) ||
            (aSlug && (aSlug === reqId || aSlug.endsWith('/' + reqId))) ||
            (a.title && generateSlug(a.title) === reqId);
        });
        setArticle(found || null);
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

  const getSlugFromArticle = (art: NewsArticle) => {
    if (art.slug && typeof art.slug === 'string' && art.slug.trim()) {
      let s = art.slug.trim();
      if (s.includes('/')) {
        const parts = s.split('/');
        s = parts[parts.length - 1];
      }
      if (s && s !== 'latest' && s !== 'press-releases' && s !== 'industry-insights' && s !== 'all') {
        return s;
      }
    }
    if (art.title) return generateSlug(art.title);
    return art.id || 'article';
  };

  const articleSlug = getSlugFromArticle(article);
  const isGoogleDogfooding = (article.id === 'google-ai-dogfooding-enterprise-results' || id === 'google-ai-dogfooding-enterprise-results' || articleSlug === 'google-ai-dogfooding-enterprise-results');
  const currentUrl = isGoogleDogfooding 
    ? 'https://www.abuqitmirlabs.tech/news/industry-insights/google-ai-dogfooding-enterprise-results'
    : `https://www.abuqitmirlabs.tech/news/article/${articleSlug}`;
  const related = allArticles.filter(a => a.title !== article.title).slice(0, 3);

  const articleSchema = isGoogleDogfooding ? {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Google's AI 'Dogfooding' Playbook: What 83% Sales Adoption and 20% Higher Win Rates Mean for Enterprise AI",
    "description": "Google's internal AI metrics reveal 83% sales adoption, 20% higher win rates, and 75% autonomous support resolution. What enterprise leaders can learn from a decade of AI dogfooding.",
    "image": "https://www.abuqitmirlabs.tech/images/news/google-ai-dogfooding.jpg",
    "datePublished": "2026-07-25T10:00:00+05:00",
    "dateModified": "2026-07-25T10:00:00+05:00",
    "author": {
      "@type": "Person",
      "name": "Abu Qitmir Mohammad Shiraz Al-Madani",
      "url": "https://www.abuqitmirlabs.tech/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AbuQitmirLabs .TECH",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.abuqitmirlabs.tech/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.abuqitmirlabs.tech/news/industry-insights/google-ai-dogfooding-enterprise-results"
    },
    "keywords": "Google AI, Gemini, AI Adoption, Dogfooding, Enterprise AI, Agentic AI",
    "articleSection": "Industry Insights",
    "wordCount": "850"
  } : {
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
      "logo": "https://www.abuqitmirlabs.tech/logo.png"
    },
    "mainEntityOfPage": currentUrl
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        "name": article.title,
        "item": currentUrl
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <SEO
        title={`${article.title} | AbuQitmirLabs`}
        description={article.excerpt}
        canonical={currentUrl}
        ogTitle={`${article.title} | AbuQitmirLabs`}
        ogDescription={article.excerpt}
        ogType="article"
        schema={articleSchema}
      />

      <Header />

      <main className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-4xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'News Archive', path: '/news/all' },
            { label: article.category, path: `/news/${article.type || 'latest'}` },
            { label: 'Article', path: typeof window !== 'undefined' ? window.location.pathname : `/news/article/${id || ''}` }
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
        <article className="max-w-4xl mx-auto px-6 animate-enter">
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

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-8 text-white animate-enter-delay-1">
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
            <MarkdownRenderer 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h2 className="text-2xl font-extrabold text-[#ccff00] mt-10 mb-4" {...props} />
              }}
            >
              {article.content || article.excerpt}
            </MarkdownRenderer>
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
                  const relSlug = getSlugFromArticle(rel);
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

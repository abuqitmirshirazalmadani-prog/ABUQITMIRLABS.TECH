import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { db, collection, getDocs, query, where } from '../lib/firebase';
import { Calendar, User, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { getStaticBlogList } from '../data/staticBlogPosts';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  coverImageAlt?: string;
  category?: string;
  createdAt: any;
  slug: string;
  author: string;
  tags?: string[];
  published?: boolean | string;
}

const parseDateToMillis = (timestamp: any): number => {
    if (!timestamp) return 0;
    try {
        if (typeof timestamp === 'number') return timestamp;
        if (timestamp && typeof timestamp.toDate === 'function') {
            return timestamp.toDate().getTime();
        }
        if (timestamp && typeof timestamp.seconds === 'number') {
            return timestamp.seconds * 1000;
        }
        const parsed = new Date(timestamp).getTime();
        return isNaN(parsed) ? 0 : parsed;
    } catch {
        return 0;
    }
};

const formatDateShort = (timestamp: any) => {
    if (!timestamp) return 'Recent';
    try {
        let date: Date;
        if (timestamp && typeof timestamp.toDate === 'function') {
            date = timestamp.toDate();
        } else if (timestamp && typeof timestamp.seconds === 'number') {
            date = new Date(timestamp.seconds * 1000);
        } else if (timestamp instanceof Date) {
            date = timestamp;
        } else {
            date = new Date(timestamp);
        }
        if (isNaN(date.getTime())) return 'Recent';
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    } catch {
        return 'Recent';
    }
};

const formatCoverImage = (url?: string, width = 800) => {
    if (!url || typeof url !== 'string' || url.trim() === '') {
        return 'https://www.abuqitmirlabs.tech/logo.png';
    }
    const cleanUrl = url.trim();
    if (cleanUrl.startsWith('/') || cleanUrl.endsWith('.svg') || cleanUrl.endsWith('.png') || cleanUrl.includes('.tech/blog/')) {
        return cleanUrl;
    }
    if (cleanUrl.includes('unsplash.com')) {
        return `${cleanUrl}&w=${width}&fm=webp`;
    }
    return cleanUrl;
};

const BlogPage = () => {
    const staticInitialPosts = getStaticBlogList() as unknown as Post[];
    const [posts, setPosts] = useState<Post[]>(() => {
        const initial = [...staticInitialPosts];
        initial.sort((a, b) => parseDateToMillis(b.createdAt) - parseDateToMillis(a.createdAt));
        return initial;
    });
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const CATEGORIES = ["All", "AI", "Software", "Business", "App", "Development"];

    useEffect(() => {
        let isMounted = true;
        const fetchPosts = async () => {
            try {
                setLoading(true);
                let rawDocs: any[] = [];

                // Strategy 1: Fetch published posts without compound index requirement
                try {
                    const postsQuery = query(
                        collection(db, 'posts'),
                        where('published', '==', true)
                    );
                    const snapshot = await getDocs(postsQuery);
                    if (!snapshot.empty) {
                        rawDocs = snapshot.docs;
                    }
                } catch (queryErr) {
                    console.warn('[BlogPage] Primary published query notice:', queryErr);
                }

                // Strategy 2: Fallback to collection query with in-memory filtering
                if (rawDocs.length === 0) {
                    try {
                        const fallbackSnapshot = await getDocs(collection(db, 'posts'));
                        if (!fallbackSnapshot.empty) {
                            rawDocs = fallbackSnapshot.docs.filter(doc => {
                                const d = doc.data();
                                return d.published === true || d.published === 'true' || d.published === undefined;
                            });
                        }
                    } catch (fallbackErr) {
                        console.warn('[BlogPage] Collection fallback query notice:', fallbackErr);
                    }
                }

                if (rawDocs.length > 0 && isMounted) {
                    const fetchedPosts = rawDocs.map(doc => {
                        const data = doc.data();
                        let excerpt = data.excerpt || '';
                        if (!excerpt && data.content) {
                            const clean = data.content
                                .replace(/^#+ .*/gm, '')
                                .replace(/> .*/gm, '')
                                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                                .replace(/[*_~`]/g, '')
                                .trim();
                            excerpt = clean.slice(0, 180).trim() + '...';
                        }

                        const rawSlug = data.slug || doc.id;
                        const cleanSlug = String(rawSlug).replace(/^\/+/, '').replace(/^blog\//, '');

                        return {
                            id: doc.id,
                            slug: cleanSlug,
                            title: data.title || 'Untitled Article',
                            excerpt,
                            content: data.content || '',
                            coverImage: data.coverImage || data.featuredImage || data.imageUrl || data.image || 'https://www.abuqitmirlabs.tech/logo.png',
                            coverImageAlt: data.coverImageAlt || `${data.title || 'Article'} | AbuQitmirLabs`,
                            category: data.category || 'AI',
                            createdAt: data.createdAt || data.date || new Date().toISOString(),
                            author: data.author || 'AbuQitmirLabs',
                            tags: Array.isArray(data.tags) ? data.tags : (typeof data.tags === 'string' ? data.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []),
                            published: data.published
                        };
                    }) as Post[];

                    // Merge Firestore posts with static fallback posts (Firestore takes precedence on slug matches)
                    const firestoreSlugs = new Set(fetchedPosts.map(p => p.slug));
                    const staticPosts = getStaticBlogList() as unknown as Post[];
                    const combined = [
                        ...fetchedPosts,
                        ...staticPosts.filter(p => !firestoreSlugs.has(p.slug))
                    ];

                    combined.sort((a, b) => parseDateToMillis(b.createdAt) - parseDateToMillis(a.createdAt));
                    setPosts(combined);
                } else if (isMounted) {
                    const staticPosts = getStaticBlogList() as unknown as Post[];
                    staticPosts.sort((a, b) => parseDateToMillis(b.createdAt) - parseDateToMillis(a.createdAt));
                    setPosts(staticPosts);
                }
            } catch (error) {
                console.warn('[BlogPage] Using static fallback articles:', error);
                if (isMounted) {
                    const staticPosts = getStaticBlogList() as unknown as Post[];
                    staticPosts.sort((a, b) => parseDateToMillis(b.createdAt) - parseDateToMillis(a.createdAt));
                    setPosts(staticPosts);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchPosts();
        return () => {
            isMounted = false;
        };
    }, []);

    const filteredPosts = selectedCategory === 'All' 
        ? posts 
        : posts.filter(p => {
            const cat = typeof p.category === 'string' ? p.category.toLowerCase() : '';
            const filter = typeof selectedCategory === 'string' ? selectedCategory.toLowerCase() : '';
            const tags = Array.isArray(p.tags) ? p.tags.map((t: any) => String(t || '').toLowerCase()) : [];
            const title = typeof p.title === 'string' ? p.title.toLowerCase() : '';
            return (filter && cat.includes(filter)) || tags.some((t: string) => filter && t.includes(filter)) || (filter && title.includes(filter));
        });

    const featuredPost = filteredPosts[0] || posts[0];

    return (
        <div className="min-h-screen bg-[#050505]">
            <Helmet>
                <title>Tech Blog & AI Insights | AbuQitmirLabs</title>
                <meta name="description" content="AbuQitmirLabs tech journal covers AI agents, custom software, web & mobile development, SEO, and digital transformation. Read expert insights, guides, and case studies." />
                <link rel="canonical" href="https://www.abuqitmirlabs.tech/blog" />
                
                {/* OG Tags */}
                <meta property="og:title" content="Tech Blog & AI Insights | AbuQitmirLabs" />
                <meta property="og:description" content="AbuQitmirLabs tech journal covers AI agents, custom software, web & mobile development, SEO, and digital transformation. Read expert insights, guides, and case studies." />
                <meta property="og:url" content="https://www.abuqitmirlabs.tech/blog" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

                {/* Twitter Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Tech Blog & AI Insights | AbuQitmirLabs" />
                <meta name="twitter:description" content="AbuQitmirLabs tech journal covers AI agents, custom software, web & mobile development, SEO, and digital transformation. Read expert insights, guides, and case studies." />
                <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

                {/* Schema Markup */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "name": "Tech Blog & AI Insights",
                        "url": "https://www.abuqitmirlabs.tech/blog",
                        "description": "AbuQitmirLabs tech journal covers AI agents, custom software, web & mobile development, SEO, and digital transformation. Read expert insights, guides, and case studies.",
                        "publisher": {
                            "@type": "Organization",
                            "name": "AbuQitmirLabs",
                            "url": "https://www.abuqitmirlabs.tech",
                            "logo": "https://www.abuqitmirlabs.tech/logo.png"
                        }
                    })}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify({
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
                                "name": "Blog",
                                "item": "https://www.abuqitmirlabs.tech/blog"
                            }
                        ]
                    })}
                </script>
            </Helmet>
            <Header />
            <Breadcrumbs />
            <div className="pt-32 pb-20 px-4 md:px-8 max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Latest
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-6">Discover our Insights</h1>
                    <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-8">
                        Stay up-to-date with engineering deep-dives, AI automation strategies, SEO mastery guides, and software architecture trends.
                    </p>

                    {/* Authoritative External Industry References */}
                    <div className="inline-flex flex-wrap items-center justify-center gap-4 py-3 px-6 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 max-w-4xl mx-auto">
                        <span className="text-zinc-500 uppercase tracking-widest font-bold text-[11px]">Recommended Tech Standards:</span>
                        <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors">
                            Google Search Central <ExternalLink className="w-3 h-3" />
                        </a>
                        <span className="text-zinc-700">•</span>
                        <a href="https://techcrunch.com/category/artificial-intelligence/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors">
                            TechCrunch AI <ExternalLink className="w-3 h-3" />
                        </a>
                        <span className="text-zinc-700">•</span>
                        <a href="https://www.technologyreview.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors">
                            MIT Tech Review <ExternalLink className="w-3 h-3" />
                        </a>
                        <span className="text-zinc-700">•</span>
                        <a href="https://www.searchenginejournal.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors">
                            Search Engine Journal <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>

                {loading && posts.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : posts.length > 0 ? (
                    <div className="space-y-24">
                        {/* FEATURED POST - New Design */}
                        {featuredPost && (
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 group shadow-2xl"
                            >
                                <div className="flex flex-col">
                                    {/* Image Section - ALWAYS TOP */}
                                    <div className="aspect-video w-full overflow-hidden p-6 md:p-10">
                                        <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative border border-white/5 shadow-2xl">
                                            <img 
                                                src={formatCoverImage(featuredPost.coverImage, 1200)} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                                alt={featuredPost.coverImageAlt || `futuristic ${featuredPost.title} featured article cover image`}
                                                width="1200"
                                                height="675"
                                                decoding="async"
                                                fetchPriority="high"
                                                referrerPolicy="no-referrer"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    if (!target.src.includes('logo.png')) {
                                                        target.src = 'https://www.abuqitmirlabs.tech/logo.png';
                                                    }
                                                }}
                                            />
                                            <div className="absolute top-6 left-6">
                                                <span className="px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">Featured Story</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Content Section - ALWAYS BELOW */}
                                    <div className="px-8 pb-12 md:px-16 md:pb-20 flex flex-col items-center text-center">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-black uppercase tracking-widest">{featuredPost.category || 'All'}</span>
                                        </div>
                                        <h2 className="text-3xl md:text-6xl lg:text-7xl font-black text-white uppercase leading-[0.9] tracking-tighter mb-8 group-hover:text-blue-400 transition-colors max-w-4xl">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-zinc-400 text-base md:text-xl font-medium leading-relaxed mb-10 max-w-2xl">
                                            {featuredPost.excerpt}
                                        </p>
                                        
                                        <div className="flex flex-wrap items-center justify-center gap-10 mb-10 w-full pt-8 border-t border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-white/5 p-0.5 border border-white/10 ring-4 ring-blue-500/10">
                                                    <img 
                                                        src="https://i.postimg.cc/hjLzDQHK/abuqitmir222.png" 
                                                        alt="AbuQitmirLabs Shiraz Almadani" 
                                                        className="w-full h-full rounded-full object-cover object-top" 
                                                        width="48"
                                                        height="48"
                                                        loading="lazy"
                                                        decoding="async"
                                                        referrerPolicy="no-referrer"
                                                    />
                                                </div>
                                                <div className="text-left">
                                                    <div className="text-white text-xs font-black uppercase tracking-tight">AbuQitmirLabs | Shiraz Almadani</div>
                                                    <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{formatDateShort(featuredPost.createdAt)}</div>
                                                </div>
                                            </div>
                                            <div className="hidden md:flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                                                <Clock size={14} className="text-blue-500" />
                                                <span>5 min read</span>
                                            </div>
                                            <Link to={`/blog/${featuredPost.slug}`} className="px-8 py-4 rounded-full bg-white text-black font-black uppercase tracking-tight text-xs transition-all flex items-center gap-3 active:scale-95 hover:bg-blue-500 hover:text-white">
                                                Read Story <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ALL BLOG POSTS SECTION */}
                        <div className="space-y-12">
                            <div className="flex items-end justify-between border-b border-white/5 pb-8">
                                <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">The journal</h3>
                                <div className="text-zinc-600 text-xs font-black uppercase tracking-widest">{filteredPosts.length} Articles Found</div>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-12">
                                {/* Left Category Sidebar */}
                                <aside className="lg:w-64 shrink-0 space-y-8">
                                <div>
                                    <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-6 pl-2">Filter by Category</h4>
                                    <div className="flex lg:flex-col flex-wrap gap-2">
                                        {CATEGORIES.map(cat => (
                                            <button 
                                                key={cat}
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                                    selectedCategory === cat 
                                                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20 scale-105 ml-2' 
                                                    : 'text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent'
                                                }`}
                                            >
                                                {cat === 'All' ? 'All Insights' : cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="hidden lg:block p-8 rounded-[2.5rem] bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/5">
                                    <h5 className="text-white text-xs font-black uppercase tracking-tight mb-4">Stay Informed</h5>
                                    <p className="text-zinc-500 text-[10px] leading-relaxed mb-6 font-medium">Join our community of engineers and innovators. No spam, just pure technical insights.</p>
                                    <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors">Subscribe</button>
                                </div>
                            </aside>

                            {/* Right Posts Grid */}
                            <div className="flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                                    {filteredPosts.map((post, idx) => (
                                        <motion.article 
                                            key={post.id || post.slug || idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: Math.min(idx * 0.05, 0.4) }}
                                            className="group"
                                        >
                                            <Link to={`/blog/${post.slug}`} className="block h-full">
                                                <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 border border-white/5 bg-zinc-900 group-hover:border-white/10 transition-colors shadow-lg">
                                                    <img 
                                                        src={formatCoverImage(post.coverImage, 800)} 
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                                        alt={post.coverImageAlt || `futuristic ${post.title} blog post thumbnail`}
                                                        width="800"
                                                        height="500"
                                                        loading="lazy"
                                                        decoding="async"
                                                        referrerPolicy="no-referrer"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            if (!target.src.includes('logo.png')) {
                                                                target.src = 'https://www.abuqitmirlabs.tech/logo.png';
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 px-2">
                                                    <span className="text-blue-500">{post.category || 'All'}</span>
                                                    <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                                                    <span>{formatDateShort(post.createdAt)}</span>
                                                </div>
                                                <h4 className="text-2xl md:text-3xl font-black text-white uppercase leading-[1.1] tracking-tighter group-hover:text-blue-400 transition-colors px-2 mb-3">
                                                    {post.title}
                                                </h4>
                                                {post.excerpt && (
                                                    <p className="text-zinc-400 text-sm font-medium leading-relaxed px-2 line-clamp-2 mb-4">
                                                        {post.excerpt}
                                                    </p>
                                                )}
                                                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-400 px-2 group-hover:translate-x-1 transition-transform">
                                                    Read Article <ArrowRight size={14} />
                                                </div>
                                            </Link>
                                        </motion.article>
                                    ))}
                                </div>

                                {filteredPosts.length === 0 && (
                                    <div className="text-center py-32 bg-white/5 rounded-[3rem] border border-white/5">
                                        <p className="text-zinc-500 text-xl font-black uppercase tracking-widest">No articles in this category</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                ) : (
                    <div className="text-center py-32 bg-white/5 rounded-[4rem] border border-white/10">
                        <p className="text-zinc-500 text-2xl font-black uppercase tracking-[0.2em]">The journal is currently empty</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default BlogPage;

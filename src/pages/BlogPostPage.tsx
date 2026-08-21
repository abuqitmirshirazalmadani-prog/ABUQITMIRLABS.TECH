import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { db, collection, getDocs, query, where, handleFirestoreError, OperationType } from '../lib/firebase';
import { ArrowLeft, Calendar, User, Clock, Share2, Twitter, Linkedin, Facebook, Link as LinkIcon } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import MarkdownRenderer from '../components/MarkdownRenderer';
import remarkGfm from 'remark-gfm';
import { ragAiBlogContent } from '../utils/ragAiBlogStaticData';

interface Post {
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  coverImageAlt?: string;
  category?: string;
  createdAt: any;
  updatedAt?: any;
  author: string;
  tags?: string[];
  helperImages?: Array<{ url: string; caption: string }>;
}

const STATIC_POSTS_MAP: Record<string, Partial<Post>> = {
  'the-complete-guide-to-rag-ai-integration-for-startups': {
    title: 'The Complete Guide to RAG AI Integration for Startups',
    content: ragAiBlogContent,
    excerpt: 'How startups use RAG to ground AI in real data — architecture, cost, RAG vs fine-tuning, and build vs hire, with a real RAG case study.',
    coverImage: 'https://i.postimg.cc/Pr2j0Kgr/The-Complete-Guide-to-RAG-AI-Integration-for-Startups.jpg',
    coverImageAlt: 'The Complete Guide to RAG AI Integration for Startups Cover Artwork',
    category: 'AI & Automation',
    author: 'AbuQitmirLabs Engineering',
    createdAt: '2026-08-18',
    tags: ['RAG', 'AI Agents', 'Startups', 'Machine Learning', 'EdTech']
  },
  'rag-ai-integration-for-startups': {
    title: 'The Complete Guide to RAG AI Integration for Startups',
    content: ragAiBlogContent,
    excerpt: 'How startups use RAG to ground AI in real data — architecture, cost, RAG vs fine-tuning, and build vs hire, with a real RAG case study.',
    coverImage: 'https://i.postimg.cc/Pr2j0Kgr/The-Complete-Guide-to-RAG-AI-Integration-for-Startups.jpg',
    coverImageAlt: 'The Complete Guide to RAG AI Integration for Startups Cover Artwork',
    category: 'AI & Automation',
    author: 'AbuQitmirLabs Engineering',
    createdAt: '2026-08-18',
    tags: ['RAG', 'AI Agents', 'Startups', 'Machine Learning', 'EdTech']
  }
};

interface BlogPostPageProps {
  overrideSlug?: string;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ overrideSlug }) => {
    const { slug: paramSlug } = useParams<{ slug: string }>();
    const slug = overrideSlug || paramSlug;
    const staticFallback = slug && STATIC_POSTS_MAP[slug] ? (STATIC_POSTS_MAP[slug] as Post) : null;
    const [post, setPost] = useState<Post | null>(staticFallback);
    const [loading, setLoading] = useState(!staticFallback);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) {
                setLoading(false);
                return;
            }

            try {
                const q = query(
                    collection(db, 'posts'), 
                    where('slug', '==', slug), 
                    where('published', '==', true)
                );
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    setPost(snapshot.docs[0].data() as Post);
                } else if (STATIC_POSTS_MAP[slug]) {
                    setPost(STATIC_POSTS_MAP[slug] as Post);
                } else {
                    setPost(null);
                }
            } catch (error) {
                if (STATIC_POSTS_MAP[slug]) {
                    setPost(STATIC_POSTS_MAP[slug] as Post);
                } else {
                    handleFirestoreError(error, OperationType.GET, `posts/${slug}`);
                    setPost(null);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
    }, [slug]);

    const getInjectedContent = () => {
        if (!post || !post.content) return '';
        
        // Find images that are not already present in the content
        const imagesToInject = (post.helperImages || []).filter(
            (img: any) => img && img.url && img.url.trim() !== '' && !post.content.includes(img.url)
        );

        if (imagesToInject.length === 0) {
            return post.content;
        }

        // Parse markdown content into logical blocks (e.g. paragraphs, lists, code blocks)
        const rawLines = post.content.split(/\r?\n/);
        
        interface Block {
            text: string;
            isSafeForImage: boolean;
            isHeader?: boolean;
        }
        
        const blocks: Block[] = [];
        let currentParagraph: string[] = [];
        let inCodeBlock = false;

        const flushParagraph = () => {
            if (currentParagraph.length > 0) {
                const combinedText = currentParagraph.join('\n');
                const trimmed = combinedText.trim();
                
                if (trimmed) {
                    const isHeader = trimmed.startsWith('#');
                    const isList = trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('+ ') || /^\d+\.\s/.test(trimmed);
                    const isQuote = trimmed.startsWith('>');
                    const isCode = trimmed.startsWith('```');

                    blocks.push({
                        text: combinedText,
                        isSafeForImage: !inCodeBlock && !isHeader && !isList && !isQuote && !isCode,
                        isHeader: isHeader
                    });
                }
                currentParagraph = [];
            }
        };

        for (let i = 0; i < rawLines.length; i++) {
            const line = rawLines[i];
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('```')) {
                // Entering/exiting code block
                flushParagraph();
                inCodeBlock = !inCodeBlock;
                blocks.push({
                    text: line,
                    isSafeForImage: false
                });
                continue;
            }

            if (inCodeBlock) {
                blocks.push({
                    text: line,
                    isSafeForImage: false
                });
                continue;
            }

            if (trimmedLine === '') {
                flushParagraph();
            } else {
                const isSpecial = trimmedLine.startsWith('#') || 
                                  trimmedLine.startsWith('- ') || 
                                  trimmedLine.startsWith('* ') || 
                                  trimmedLine.startsWith('+ ') || 
                                  trimmedLine.startsWith('>') || 
                                  /^\d+\.\s/.test(trimmedLine);
                
                if (isSpecial) {
                    flushParagraph();
                    currentParagraph.push(line);
                    flushParagraph();
                } else {
                    currentParagraph.push(line);
                }
            }
        }
        flushParagraph();

        const N = imagesToInject.length;
        let targetIndices = blocks
            .map((b, idx) => b.isSafeForImage ? idx : -1)
            .filter(idx => idx !== -1);

        // If we have more images than safe paragraphs, split long safe paragraphs into sentence blocks
        if (targetIndices.length < N && targetIndices.length > 0) {
            const expandedBlocks: Block[] = [];
            
            blocks.forEach((b) => {
                if (b.isSafeForImage && b.text.length > 100) {
                    const sentenceRegex = /([^.!?]+[.!?]+(?:\s+|$))/g;
                    const matches = b.text.match(sentenceRegex);
                    
                    if (matches && matches.length > 1) {
                        matches.forEach((sentence) => {
                            if (sentence.trim()) {
                                expandedBlocks.push({
                                    text: sentence.trim(),
                                    isSafeForImage: true
                                });
                            }
                        });
                        return;
                    }
                }
                expandedBlocks.push(b);
            });
            
            const newTargetIndices = expandedBlocks
                .map((b, idx) => b.isSafeForImage ? idx : -1)
                .filter(idx => idx !== -1);
                
            if (newTargetIndices.length > targetIndices.length) {
                blocks.length = 0;
                blocks.push(...expandedBlocks);
                targetIndices = newTargetIndices;
            }
        }

        let M = targetIndices.length;

        if (M === 0) {
            // Target all non-empty blocks as safe fallback
            targetIndices = blocks
                .map((b, idx) => b.text.trim() !== '' ? idx : -1)
                .filter(idx => idx !== -1);
            M = targetIndices.length;
        }

        if (M === 0) {
            // Absolute fallback: append images to the end of raw content
            const imagesMarkdown = imagesToInject
                .map((img: any) => `\n\n![${img.caption || 'Article photo'}](${img.url})`)
                .join('');
            return post.content + imagesMarkdown;
        }

        // Map of block index -> images to append after it
        const insertions: { [key: number]: any[] } = {};

        if (N >= M) {
            // More images than safe blocks: distribute them as evenly as possible
            imagesToInject.forEach((img: any, i: number) => {
                const targetIdx = i % M;
                const blockIdx = targetIndices[targetIdx];
                if (!insertions[blockIdx]) {
                    insertions[blockIdx] = [];
                }
                insertions[blockIdx].push(img);
            });
        } else {
            // Better spacing: space them out across available blocks
            const step = M / (N + 1);
            imagesToInject.forEach((img: any, i: number) => {
                const targetIdx = Math.min(M - 1, Math.floor((i + 1) * step));
                const blockIdx = targetIndices[targetIdx];
                if (!insertions[blockIdx]) {
                    insertions[blockIdx] = [];
                }
                insertions[blockIdx].push(img);
            });
        }

        const result: string[] = [];
        blocks.forEach((b, idx) => {
            result.push(b.text);
            if (insertions[idx]) {
                insertions[idx].forEach((img: any) => {
                    result.push(`![${img.caption || 'Article photo'}](${img.url})`);
                });
            }
        });

        return result.join('\n\n');
    };

    const getCategoryDetails = (categoryVal?: string) => {
        let name = 'Web Development';
        let to = '/web-development';

        if (!categoryVal) {
            const postTitle = post?.title?.toLowerCase() || '';
            const allTagsLower = post?.tags?.map(t => String(t).toLowerCase()) || [];
            
            if (
                postTitle.includes('next.js') || 
                postTitle.includes('speed') || 
                postTitle.includes('performance') || 
                postTitle.includes('seo') || 
                postTitle.includes('web') || 
                postTitle.includes('google') ||
                allTagsLower.includes('web') || 
                allTagsLower.includes('seo') || 
                allTagsLower.includes('development')
            ) {
                return { name: 'Web Development', to: '/web-development' };
            }
            if (postTitle.includes('ai') || postTitle.includes('agent') || allTagsLower.includes('ai') || allTagsLower.includes('agents')) {
                return { name: 'AI Agent Development', to: '/ai-agent-development' };
            }
            if (postTitle.includes('software') || postTitle.includes('enterprise') || allTagsLower.includes('software')) {
                return { name: 'Custom Software', to: '/custom-software' };
            }
            if (postTitle.includes('app') || postTitle.includes('mobile') || allTagsLower.includes('app') || allTagsLower.includes('mobile')) {
                return { name: 'Mobile App Development', to: '/mobile-app-development' };
            }
            if (postTitle.includes('marketing') || allTagsLower.includes('marketing') || allTagsLower.includes('optimization')) {
                return { name: 'SEO Mastery', to: '/seo-mastery' };
            }
            if (postTitle.includes('graphics') || postTitle.includes('design') || allTagsLower.includes('design') || allTagsLower.includes('graphics')) {
                return { name: 'Graphics Design', to: '/graphics-design' };
            }
            if (postTitle.includes('content') || postTitle.includes('copywriting') || allTagsLower.includes('content') || allTagsLower.includes('writing')) {
                return { name: 'Content Writing', to: '/content-writing' };
            }
            return { name: 'Web Development', to: '/web-development' };
        }

        const catLower = categoryVal.toLowerCase();
        if (catLower.includes('web') || catLower.includes('dev')) {
            name = 'Web Development';
            to = '/web-development';
        } else if (catLower.includes('software')) {
            name = 'Custom Software';
            to = '/custom-software';
        } else if (catLower.includes('app') || catLower.includes('mobile')) {
            name = 'Mobile App Development';
            to = '/mobile-app-development';
        } else if (catLower.includes('ai') || catLower.includes('agent')) {
            name = 'AI Agent Development';
            to = '/ai-agent-development';
        } else if (catLower.includes('seo') || catLower.includes('mastery') || catLower.includes('search')) {
            name = 'SEO Mastery';
            to = '/seo-mastery';
        } else if (catLower.includes('graphics') || catLower.includes('design')) {
            name = 'Graphics Design';
            to = '/graphics-design';
        } else if (catLower.includes('content') || catLower.includes('writing')) {
            name = 'Content Writing';
            to = '/content-writing';
        } else {
            name = categoryVal;
            to = '/blog';
        }

        return { name, to };
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return '';
        try {
            const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
            if (isNaN(date.getTime())) return '';
            return date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (e) {
            return '';
        }
    };

    const formatISODate = (timestamp: any) => {
        if (!timestamp) return new Date().toISOString();
        try {
            const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
            if (isNaN(date.getTime())) return new Date().toISOString();
            return date.toISOString();
        } catch (e) {
            return new Date().toISOString();
        }
    };

    const handleShare = (platform: string) => {
        const url = window.location.href;
        const title = post?.title || 'Check out this post from AbuQitmirLabs Collective';
        
        const shareLinks: Record<string, string> = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        };

        if (platform === 'copy') {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
            return;
        }

        if (shareLinks[platform]) {
            window.open(shareLinks[platform], '_blank', 'width=600,height=400');
        }
    };

    // Generic loading skeleton
    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col">
                <Header />
                <div className="pt-36 md:pt-44 pb-20 px-6 max-w-4xl mx-auto w-full flex-grow">
                    <div className="animate-pulse space-y-8">
                        <div className="h-6 w-32 bg-white/10 rounded-full"></div>
                        <div className="h-12 w-3/4 bg-white/10 rounded-2xl"></div>
                        <div className="h-6 w-1/2 bg-white/5 rounded-xl"></div>
                        <div className="aspect-video w-full bg-white/5 rounded-[2.5rem] border border-white/5"></div>
                        <div className="space-y-4 pt-6">
                            <div className="h-4 bg-white/5 rounded w-full"></div>
                            <div className="h-4 bg-white/5 rounded w-5/6"></div>
                            <div className="h-4 bg-white/5 rounded w-4/6"></div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Generic Article Not Found state
    if (!post) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col">
                <Helmet>
                    <title>Article Not Found | AbuQitmirLabs</title>
                    <meta name="robots" content="noindex, follow" />
                </Helmet>
                <Header />
                <div className="flex-grow flex flex-col items-center justify-center p-6 text-center pt-32 pb-20">
                    <div className="max-w-md w-full bg-[#0b0b0e] border border-zinc-800/80 rounded-[2.5rem] p-10 md:p-12 shadow-2xl">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 text-zinc-500 mb-6 font-mono text-xl font-bold">
                            404
                        </div>
                        <h1 className="text-3xl font-black uppercase mb-4 tracking-tight font-serif text-white">
                            Article Not Found
                        </h1>
                        <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                            The requested publication could not be found or has moved to a new permanent location.
                        </p>
                        <Link 
                            to="/blog" 
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#ccff00] text-black font-bold uppercase tracking-widest text-xs hover:bg-[#b8e600] transition-colors shadow-lg shadow-[#ccff00]/10"
                        >
                            <ArrowLeft size={16} /> Return to Journal
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const categoryDetails = getCategoryDetails(post.category);
    const breadcrumbItems = [
        { name: 'Home', to: '/' },
        { name: 'Blog', to: '/blog' },
        { name: categoryDetails.name, to: categoryDetails.to },
        { name: post.title || 'Journal' }
    ];

    const currentUrl = `https://www.abuqitmirlabs.tech/blog/${slug}`;
    const coverImageUrl = post.coverImage || 'https://www.abuqitmirlabs.tech/logo.png';
    const postExcerpt = post.excerpt || post.content?.slice(0, 160).replace(/[#*`_]/g, '') || post.title;
    const publishedIsoDate = formatISODate(post.createdAt);
    const modifiedIsoDate = formatISODate(post.updatedAt || post.createdAt);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00]/30 selection:text-white">
            <Helmet>
                <html lang="en" />
                <title>{post.title} | AbuQitmirLabs</title>
                <meta name="description" content={postExcerpt} />
                {post.tags && post.tags.length > 0 && (
                    <meta name="keywords" content={post.tags.join(', ')} />
                )}
                <link rel="canonical" href={currentUrl} />

                {/* Open Graph */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:title" content={`${post.title} | AbuQitmirLabs`} />
                <meta property="og:description" content={postExcerpt} />
                <meta property="og:image" content={coverImageUrl} />
                <meta property="og:site_name" content="AbuQitmirLabs" />
                <meta property="article:published_time" content={publishedIsoDate} />
                <meta property="article:modified_time" content={modifiedIsoDate} />
                <meta property="article:author" content={post.author || 'AbuQitmirLabs'} />
                {post.category && <meta property="article:section" content={post.category} />}

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${post.title} | AbuQitmirLabs`} />
                <meta name="twitter:description" content={postExcerpt} />
                <meta name="twitter:image" content={coverImageUrl} />

                {/* Dynamic Schema.org Graph */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "Organization",
                                "@id": "https://www.abuqitmirlabs.tech/#organization",
                                "name": "AbuQitmirLabs .TECH",
                                "alternateName": "AbuQitmirLabs",
                                "url": "https://www.abuqitmirlabs.tech/",
                                "logo": "https://www.abuqitmirlabs.tech/logo.png",
                                "description": "AbuQitmirLabs .TECH is a custom software, mobile app, AI agent, web development, SEO, graphics, and content writing studio serving startups, SMEs, and enterprises in the US, UK, Pakistan, Canada, Poland, and Australia.",
                                "sameAs": [
                                    "https://www.linkedin.com/in/abu-qitmir-697423390/",
                                    "https://x.com/AbuQitmir",
                                    "https://www.facebook.com/profile.php?id=61583768706452",
                                    "https://www.instagram.com/abuqitmirshirazalmadani/",
                                    "https://www.youtube.com/@AbuQitmir"
                                ],
                                "contactPoint": {
                                    "@type": "ContactPoint",
                                    "contactType": "sales",
                                    "url": "https://www.abuqitmirlabs.tech/contact"
                                }
                            },
                            {
                                "@type": "WebSite",
                                "@id": "https://www.abuqitmirlabs.tech/#website",
                                "url": "https://www.abuqitmirlabs.tech/",
                                "name": "AbuQitmirLabs .TECH",
                                "publisher": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
                                "inLanguage": "en-US"
                            },
                            {
                                "@type": "WebPage",
                                "@id": `${currentUrl}#webpage`,
                                "url": currentUrl,
                                "name": post.title,
                                "isPartOf": { "@id": "https://www.abuqitmirlabs.tech/#website" },
                                "primaryImageOfPage": coverImageUrl,
                                "datePublished": publishedIsoDate,
                                "dateModified": modifiedIsoDate,
                                "description": postExcerpt,
                                "breadcrumb": { "@id": `${currentUrl}#breadcrumb` },
                                "inLanguage": "en-US"
                            },
                            {
                                "@type": "BreadcrumbList",
                                "@id": `${currentUrl}#breadcrumb`,
                                "itemListElement": [
                                    {
                                        "@type": "ListItem",
                                        "position": 1,
                                        "name": "Home",
                                        "item": "https://www.abuqitmirlabs.tech/"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 2,
                                        "name": "Blog",
                                        "item": "https://www.abuqitmirlabs.tech/blog"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 3,
                                        "name": post.title,
                                        "item": currentUrl
                                    }
                                ]
                            },
                            {
                                "@type": "Article",
                                "@id": `${currentUrl}#article`,
                                "headline": post.title,
                                "description": postExcerpt,
                                "image": coverImageUrl,
                                "author": {
                                    "@type": "Organization",
                                    "name": "AbuQitmirLabs .TECH",
                                    "url": "https://www.abuqitmirlabs.tech/"
                                },
                                "publisher": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
                                "datePublished": publishedIsoDate,
                                "dateModified": modifiedIsoDate,
                                "mainEntityOfPage": { "@id": `${currentUrl}#webpage` },
                                "articleSection": categoryDetails.name,
                                "keywords": post.tags && post.tags.length > 0 ? post.tags : [
                                    "custom software development",
                                    "AI agent development",
                                    "web development",
                                    "mobile app development"
                                ],
                                "inLanguage": "en-US"
                            },
                            ...(slug.includes('rag-ai-integration') ? [{
                                "@type": "FAQPage",
                                "@id": `${currentUrl}#faq`,
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": "How long does RAG integration take?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "A focused, single-use-case RAG integration can go live in as little as six to eight weeks, while broader deployments spanning multiple data sources or departments typically take several months. The timeline depends almost entirely on data readiness."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Is RAG better than fine-tuning for startups?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "For most startups, RAG is the better first move because it keeps your data separate from the model, so updates are instant and don't require retraining. Fine-tuning still has a place for very specific writing styles or output formats."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "What problem does RAG AI integration solve?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "RAG solves the core reliability problem with generative AI: language models answer confidently even when they don't know the answer, and RAG stops that by grounding every response in retrieved, real data."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Why does my RAG chatbot still hallucinate?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "RAG reduces hallucination but doesn't eliminate it, because the model can still misread or extend retrieved context incorrectly, especially when too much irrelevant information gets retrieved alongside the right answer."
                                        }
                                    }
                                ]
                            }] : [])
                        ]
                    })}
                </script>
            </Helmet>
            
            <Header />
            <Breadcrumbs customItems={breadcrumbItems} />
            
            <main className="pt-36 md:pt-44 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <Link to="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#ccff00] transition-colors uppercase tracking-widest text-xs font-bold mb-10 group">
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to The Journal
                        </Link>
                        
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.1] mb-8 font-serif">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 md:gap-8 text-xs text-zinc-400 uppercase tracking-widest font-mono border-y border-zinc-800/80 py-6 mb-12">
                            <span className="flex items-center gap-2 text-zinc-300"><Calendar size={14} className="text-[#ccff00]" /> {formatDate(post.createdAt)}</span>
                            <span className="flex items-center gap-2 text-white font-bold">{post.author}</span>
                            <div className="flex items-center gap-4 ml-auto">
                                <span className="hidden md:inline-block text-zinc-400">Share:</span>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => handleShare('twitter')}
                                        className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-all shadow-md"
                                        title="Share on Twitter"
                                        aria-label="Share this blog post on Twitter"
                                    >
                                        <Twitter size={14} />
                                    </button>
                                    <button 
                                        onClick={() => handleShare('linkedin')}
                                        className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-all shadow-md"
                                        title="Share on LinkedIn"
                                        aria-label="Share this blog post on LinkedIn"
                                    >
                                        <Linkedin size={14} />
                                    </button>
                                    <button 
                                        onClick={() => handleShare('facebook')}
                                        className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-all shadow-md"
                                        title="Share on Facebook"
                                        aria-label="Share this blog post on Facebook"
                                    >
                                        <Facebook size={14} />
                                    </button>
                                    <button 
                                        onClick={() => handleShare('copy')}
                                        className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-all shadow-md"
                                        title="Copy Link"
                                        aria-label="Copy blog post link to clipboard"
                                    >
                                        <LinkIcon size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {post.coverImage && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-video w-full rounded-[2.5rem] overflow-hidden mb-16 border border-zinc-800/80 shadow-2xl group bg-[#090a0f] flex items-center justify-center"
                        >
                            <img 
                                src={post.coverImage} 
                                alt={post.coverImageAlt || `futuristic ${post.title} feature illustration`} 
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    if (!target.src.includes('logo.png')) {
                                        target.src = 'https://www.abuqitmirlabs.tech/logo.png';
                                    }
                                }}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                            />
                        </motion.div>
                    )}

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#0b0b0e] rounded-[2.5rem] p-8 md:p-16 border border-zinc-800/80 shadow-2xl text-zinc-200 leading-relaxed font-sans space-y-6"
                    >
                        <MarkdownRenderer 
                            remarkPlugins={[remarkGfm]}
                            components={{
                                p: ({node, ...props}) => <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6 font-sans" {...props} />,
                                h1: ({node, ...props}) => <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mt-12 mb-6 font-serif border-b border-zinc-800/80 pb-4" {...props} />,
                                h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-black text-[#ccff00] uppercase tracking-tight mt-10 mb-4 font-serif border-b border-zinc-800/60 pb-3" {...props} />,
                                h3: ({node, ...props}) => <h3 className="text-xl md:text-2xl font-bold text-white mt-8 mb-3 uppercase tracking-tight font-serif" {...props} />,
                                h4: ({node, ...props}) => <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2 font-serif" {...props} />,
                                a: ({node, href, children, ...props}) => {
                                    if (href && href.startsWith('/')) {
                                        return (
                                            <Link 
                                                to={href} 
                                                className="text-[#ccff00] font-bold underline underline-offset-4 hover:text-lime-300 transition-colors cursor-pointer"
                                            >
                                                {children}
                                            </Link>
                                        );
                                    }
                                    return (
                                        <a 
                                            href={href} 
                                            className="text-[#ccff00] font-bold underline underline-offset-4 hover:text-lime-300 transition-colors cursor-pointer" 
                                            {...props}
                                        >
                                            {children}
                                        </a>
                                    );
                                },
                                strong: ({node, ...props}) => <strong className="text-white font-black" {...props} />,
                                code: ({node, ...props}) => <code className="bg-[#161619] text-[#ccff00] px-2 py-0.5 rounded-md font-mono text-sm border border-zinc-800" {...props} />,
                                pre: ({node, ...props}) => <pre className="bg-[#050507] border border-zinc-800 rounded-2xl p-6 overflow-x-auto text-zinc-200 font-mono text-sm my-8 shadow-inner" {...props} />,
                                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#ccff00] pl-6 py-3 my-6 text-zinc-300 italic bg-[#141418] rounded-r-2xl border-y border-r border-zinc-800/50" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 text-zinc-300 my-6 pl-2" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-2 text-zinc-300 my-6 pl-2" {...props} />,
                                li: ({node, ...props}) => <li className="text-zinc-300 leading-relaxed mb-1" {...props} />,
                                hr: ({node, ...props}) => <hr className="border-zinc-800 my-10" {...props} />,
                                table: ({node, ...props}) => <div className="overflow-x-auto my-8"><table className="w-full text-left border-collapse border border-zinc-800 rounded-xl overflow-hidden" {...props} /></div>,
                                th: ({node, ...props}) => <th className="bg-zinc-900 text-white font-bold uppercase text-xs p-4 border border-zinc-800" {...props} />,
                                td: ({node, ...props}) => <td className="p-4 border border-zinc-800/80 text-zinc-300 text-sm bg-zinc-950/50" {...props} />,
                                img: ({node, ...props}) => {
                                    return (
                                        <span className="block my-12 text-center overflow-hidden">
                                            <img 
                                                {...props} 
                                                referrerPolicy="no-referrer"
                                                className="mx-auto rounded-[2rem] shadow-2xl border border-zinc-800 max-h-[600px] w-full object-cover select-none hover:scale-[1.01] transition-transform duration-700" 
                                            />
                                            {props.alt && (
                                                <span className="block mt-4 text-center text-[10px] text-zinc-400 uppercase tracking-[0.25em] font-mono">
                                                    {props.alt}
                                                </span>
                                            )}
                                        </span>
                                    );
                                }
                            }}
                        >
                            {getInjectedContent()}
                        </MarkdownRenderer>
                    </motion.div>

                    {/* Hashtags at the Bottom */}
                    {post.tags && (
                        <div className="mt-16">
                            <div className="bg-[#0b0b0e] border border-zinc-800/80 rounded-[2.5rem] p-8 md:p-10 flex flex-wrap gap-x-4 gap-y-3 overflow-hidden shadow-xl">
                                {(() => {
                                    const allTags = Array.isArray(post.tags) 
                                        ? post.tags.flatMap(t => String(t).split(/[\s,#]+/).filter(Boolean))
                                        : String(post.tags).split(/[\s,#]+/).filter(Boolean);
                                    
                                    return allTags.map((tag, idx) => {
                                        const cleanTag = tag.trim().toUpperCase();
                                        if (!cleanTag) return null;
                                        return (
                                            <span 
                                                key={`${tag}-${idx}`} 
                                                className="inline-block text-xs font-mono font-bold text-[#ccff00] bg-[#16161a] px-4 py-2 rounded-full border border-zinc-800 uppercase tracking-wider hover:bg-[#ccff00] hover:text-black transition-all cursor-pointer"
                                            >
                                                #{cleanTag}
                                            </span>
                                        );
                                    });
                                })()}
                            </div>
                        </div>
                    )}

                    <div className="mt-16 pt-10 border-t border-zinc-800/80">
                        <div className="bg-[#0b0b0e] border border-zinc-800/80 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-10 shadow-xl">
                            <div className="h-24 w-24 bg-zinc-900 rounded-3xl overflow-hidden shrink-0 shadow-lg border-2 border-[#ccff00]/40">
                                <img 
                                    src="https://i.postimg.cc/hjLzDQHK/abuqitmir222.png" 
                                    alt="Shiraz Almadani - Lead Architect at AbuQitmirLabs" 
                                    className="w-full h-full object-cover object-top" 
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight font-serif">AbuQitmirLabs | Shiraz Almadani</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">Lead Architect & Engineering Consultant. Specializing in high-performance digital ecosystems, AI-driven architectures, and building the future of software development.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Elegant Copy Notification Toast */}
            {copied && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-zinc-950 text-white border border-white/15 px-6 py-4 rounded-full flex items-center justify-center gap-3 shadow-2xl animate-enter">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00]"></span>
                    <span className="text-xs uppercase tracking-widest font-mono">Link Copied to Clipboard</span>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default BlogPostPage;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { db, collection, getDocs, query, where, handleFirestoreError, OperationType } from '../lib/firebase';
import { ArrowLeft, Calendar, User, Clock, Share2, Twitter, Linkedin, Facebook, Link as LinkIcon } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Post {
  title: string;
  content: string;
  coverImage?: string;
  coverImageAlt?: string;
  category?: string;
  createdAt: any;
  author: string;
  tags?: string[];
  helperImages?: Array<{ url: string; caption: string }>;
}

const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return;
            try {
                const q = query(collection(db, 'posts'), where('slug', '==', slug), where('published', '==', true));
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    setPost(snapshot.docs[0].data() as Post);
                }
            } catch (error) {
                handleFirestoreError(error, OperationType.GET, `posts/${slug}`);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
        window.scrollTo(0, 0);
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

        // If we have more images than safe paragraphs, split long safe paragraphs into sentence blocks to create natural placements
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

    if (loading) return (
        <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (!post) return (
        <div className="min-h-screen bg-[#f8f9fa] text-black flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-black uppercase mb-4">Post Not Found</h1>
            <Link to="/blog" className="text-blue-500 font-bold uppercase tracking-widest flex items-center gap-2">
                <ArrowLeft size={18} /> Back to Blog
            </Link>
        </div>
    );

    const formatDate = (timestamp: any) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleShare = (platform: string) => {
        const url = window.location.href;
        const title = post?.title || 'Check out this post from ABUQITMIRLABS.TECH Collective';
        
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

    const categoryDetails = getCategoryDetails(post?.category);
    const breadcrumbItems = [
        { name: 'Home', to: '/' },
        { name: 'Blog', to: '/blog' },
        { name: categoryDetails.name, to: categoryDetails.to },
        { name: post?.title || 'Journal' }
    ];

    return (
        <div className="min-h-screen bg-[#f3f4f7]">
            <Helmet>
                <title>{post.title} | ABUQITMIRLABS Journal</title>
                <meta name="description" content={post.content.substring(0, 160).replace(/[#*`]/g, '') + " | ABUQITMIRLABS .TECH"} />
                <link rel="canonical" href={`https://abuqitmirlabs.tech/blog/${slug}`} />
                
                {/* OG Tags */}
                <meta property="og:title" content={`${post.title} | ABUQITMIRLABS Journal`} />
                <meta property="og:description" content={`${post.content.substring(0, 160).replace(/[#*`]/g, '')} | Technical Blog by ABUQITMIRLABS .TECH`} />
                <meta property="og:image" content={post.coverImage || "https://abuqitmirlabs.tech/logo.png"} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://abuqitmirlabs.tech/blog/${slug}`} />

                {/* Twitter Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${post.title} | ABUQITMIRLABS Journal`} />
                <meta name="twitter:description" content={`${post.content.substring(0, 160).replace(/[#*`]/g, '')} | Technical Insights by ABUQITMIRLABS .TECH`} />
                <meta name="twitter:image" content={post.coverImage || "https://abuqitmirlabs.tech/logo.png"} />
                
                {/* Article Schema */}
                <script 
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            "headline": post.title,
                            "image": post.coverImage || "https://abuqitmirlabs.tech/logo.png",
                            "author": {
                                "@type": "Person",
                                "name": post.author,
                                "url": "https://abuqitmirlabs.tech/about"
                            },
                            "publisher": {
                                "@type": "Organization",
                                "name": "ABUQITMIRLABS .TECH",
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": "https://abuqitmirlabs.tech/logo.svg"
                                }
                            },
                            "datePublished": post.createdAt?.toDate ? post.createdAt.toDate().toISOString() : new Date(post.createdAt).toISOString(),
                            "description": post.content.substring(0, 160).replace(/[#*`]/g, '')
                        })
                    }}
                ></script>

                {/* Breadcrumb Schema */}
                <script 
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://abuqitmirlabs.tech"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Blog",
                                    "item": "https://abuqitmirlabs.tech/blog"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": categoryDetails.name,
                                    "item": `https://abuqitmirlabs.tech${categoryDetails.to}`
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": post.title,
                                    "item": `https://abuqitmirlabs.tech/blog/${slug}`
                                }
                            ]
                        })
                    }}
                ></script>
            </Helmet>
            
            <Header />
            <Breadcrumbs customItems={breadcrumbItems} />
            
            <main className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <Link to="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-black transition-colors uppercase tracking-widest text-xs font-black mb-12 group">
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to The Journal
                        </Link>
                        
                        <h1 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-[0.9] mb-12">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-8 text-[10px] text-zinc-500 uppercase tracking-widest font-black border-y border-black/5 py-8">
                            <span className="flex items-center gap-2"><Calendar size={14} className="text-blue-500" /> {formatDate(post.createdAt)}</span>
                            <span className="flex items-center gap-2 text-black">{post.author}</span>
                            <div className="flex items-center gap-4 ml-auto">
                                <span className="hidden md:inline-block">Share:</span>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => handleShare('twitter')}
                                        className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center hover:bg-zinc-950 hover:text-white transition-all shadow-sm"
                                        title="Share on Twitter"
                                        aria-label="Share this blog post on Twitter"
                                    >
                                        <Twitter size={14} />
                                    </button>
                                    <button 
                                        onClick={() => handleShare('linkedin')}
                                        className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center hover:bg-zinc-950 hover:text-white transition-all shadow-sm"
                                        title="Share on LinkedIn"
                                        aria-label="Share this blog post on LinkedIn"
                                    >
                                        <Linkedin size={14} />
                                    </button>
                                    <button 
                                        onClick={() => handleShare('facebook')}
                                        className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center hover:bg-zinc-950 hover:text-white transition-all shadow-sm"
                                        title="Share on Facebook"
                                        aria-label="Share this blog post on Facebook"
                                    >
                                        <Facebook size={14} />
                                    </button>
                                    <button 
                                        onClick={() => handleShare('copy')}
                                        className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center hover:bg-zinc-950 hover:text-white transition-all shadow-sm"
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
                            className="aspect-video w-full rounded-[3rem] overflow-hidden mb-16 shadow-2xl shadow-blue-500/5 group"
                        >
                            <img src={post.coverImage} alt={post.coverImageAlt || `futuristic ${post.title} feature illustration`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                        </motion.div>
                    )}

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-[3rem] p-8 md:p-20 shadow-xl shadow-black/5 border border-black/5 prose prose-blue max-w-none prose-headings:text-black prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-zinc-600 prose-p:leading-relaxed prose-lg prose-img:rounded-3xl prose-img:shadow-lg prose-pre:bg-zinc-950 prose-pre:rounded-2xl prose-strong:text-black prose-strong:font-black prose-a:text-blue-600 prose-a:font-bold hover:prose-a:text-blue-700"
                    >
                        <Markdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                                img: ({node, ...props}) => {
                                    return (
                                        <span className="block my-12 text-center overflow-hidden">
                                            <img 
                                                {...props} 
                                                referrerPolicy="no-referrer"
                                                className="mx-auto rounded-[2rem] shadow-2xl border border-black/5 max-h-[600px] w-full object-cover select-none hover:scale-[1.01] transition-transform duration-700" 
                                            />
                                            {props.alt && (
                                                <span className="block mt-4 text-center text-[10px] text-zinc-400 uppercase tracking-[0.25em] font-black">
                                                    {props.alt}
                                                </span>
                                            )}
                                        </span>
                                    );
                                }
                            }}
                        >
                            {getInjectedContent()}
                        </Markdown>
                    </motion.div>

                    {/* Hashtags at the Bottom */}
                    {post.tags && (
                        <div className="mt-20">
                            <div className="bg-[#eff6ff]/60 border border-blue-400/10 rounded-[2.5rem] p-8 md:p-10 flex flex-wrap gap-x-6 gap-y-4 overflow-hidden">
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
                                                className="inline-block text-[11px] md:text-xs font-black text-blue-600 uppercase tracking-[0.2em] break-all whitespace-normal hover:text-blue-700 transition-colors"
                                            >
                                                #{cleanTag}
                                            </span>
                                        );
                                    });
                                })()}
                            </div>
                        </div>
                    )}

                    <div className="mt-20 pt-10 border-t border-black/5">
                        <div className="bg-white border border-black/5 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-10 shadow-sm">
                            <div className="h-24 w-24 bg-zinc-950 rounded-3xl overflow-hidden shrink-0 shadow-lg border-2 border-white">
                                <img 
                                    src="https://i.postimg.cc/hjLzDQHK/abuqitmir222.png" 
                                    alt="Shiraz Almadani - Lead Architect at ABUQITMIRLABS.TECH" 
                                    className="w-full h-full object-cover object-top" 
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-black mb-3 uppercase tracking-tight">ABUQITMIRLABS .TECH Shiraz Almadani</h3>
                                <p className="text-zinc-500 leading-relaxed max-w-xl">Lead Architect & Engineering Consultant. Specializing in high-performance digital ecosystems, AI-driven architectures, and building the future of software development.</p>
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

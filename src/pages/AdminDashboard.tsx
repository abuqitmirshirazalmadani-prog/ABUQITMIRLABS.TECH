import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
    auth, googleProvider, signInWithPopup, signOut, 
    db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp 
} from '../lib/firebase';
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { 
    LayoutDashboard, FileText, Plus, LogOut, Shield, 
    CheckCircle, AlertCircle, Loader2, ArrowLeft, 
    Globe, Clock, Edit, Trash2, ExternalLink,
    Newspaper, Rss, Megaphone, Lightbulb, Sparkles, Filter 
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const ADMIN_EMAIL = "abuqitmirshirazalmadani@gmail.com";
const ADMIN_UID = "cRAf1wZFRRXMVadj7RDaC8WM4152";

const DEFAULT_NEWS_SEED = [
    {
      title: "AbuQitmirLabs Releases Autonomous Multi-Agent RAG Framework for Enterprise Clients",
      type: "latest",
      date: "July 18, 2026",
      category: "Product Launch",
      excerpt: "Our engineering studio in Karachi has announced a new open-spec RAG framework that cuts LLM vector search latency to under 180ms while guaranteeing zero data hallucination.",
      content: "Full announcement detailing the autonomous multi-agent RAG framework deployed across enterprise environments.",
      location: "Karachi, Pakistan",
      contact: "info@abuqitmirlabs.tech",
      author: "Abu Qitmir Mohammad Shiraz Al-Madani",
      readTime: "4 min read",
      slug: "/news/latest/ai-rag-framework-launch",
      published: true
    },
    {
      title: "AbuQitmirLabs Expands Dedicated Engineering Squads for US & UK Fintech Markets",
      type: "latest",
      date: "June 28, 2026",
      category: "Company News",
      excerpt: "Following a 45% growth in international client contracts, AbuQitmirLabs expands its in-house developer squads in Karachi to support round-the-clock US EST and UK GMT shift deployments.",
      content: "Full story on expansion of dedicated developer squads for US & UK clients.",
      location: "Karachi, Pakistan",
      contact: "info@abuqitmirlabs.tech",
      author: "Abu Qitmir Mohammad Shiraz Al-Madani",
      readTime: "5 min read",
      slug: "/news/latest/us-uk-expansion-q3",
      published: true
    },
    {
      title: "Technical Benchmark: How Generative Engine Optimization (GEO) Outperforms Traditional SEO in 2026",
      type: "industry-insights",
      date: "May 14, 2026",
      category: "Industry Insights",
      excerpt: "An empirical study by Lead Architect Abu Qitmir revealing how structured entity graphs and direct answer blocks gain 3.4x higher citation rates in Google AI Overviews.",
      content: "Deep technical breakdown of Generative Engine Optimization strategies.",
      location: "Karachi, Pakistan",
      contact: "info@abuqitmirlabs.tech",
      author: "Abu Qitmir Mohammad Shiraz Al-Madani",
      readTime: "8 min read",
      slug: "/news/industry-insights",
      published: true
    },
    {
      title: "AbuQitmirLabs Achieves Full HIPAA & ISO 27001 Cloud Security Validation",
      type: "press-releases",
      date: "April 02, 2026",
      category: "Press Release",
      excerpt: "Official security audit confirms that all custom medical software platforms engineered by AbuQitmirLabs meet strict HIPAA, HITECH, and ISO 27001 data protection protocols.",
      content: "Official press release regarding HIPAA and ISO 27001 cloud security audit validation.",
      location: "Karachi, Pakistan",
      contact: "info@abuqitmirlabs.tech",
      author: "AbuQitmirLabs Press Office",
      readTime: "3 min read",
      slug: "/news/press-releases",
      published: true
    },
    {
      title: "Engineering Sub-200ms RAG Pipelines with Pinecone Vector Indexing and LlamaIndex",
      type: "industry-insights",
      date: "June 08, 2026",
      category: "AI Architecture",
      excerpt: "A deep dive into chunking strategies, hybrid keyword-semantic search, and LLM prompt caching that cut enterprise AI query latency in half.",
      content: "Comprehensive guide to building sub-200ms RAG pipelines.",
      location: "Karachi, Pakistan",
      contact: "info@abuqitmirlabs.tech",
      author: "Abu Huraira",
      readTime: "11 min read",
      slug: "/news/industry-insights",
      published: true
    },
    {
      title: "AbuQitmirLabs Crosses Milestone 410+ Projects and 350+ Global Enterprise Clients",
      type: "press-releases",
      date: "January 10, 2026",
      category: "Press Release",
      excerpt: "Celebrating 5 years of operation since founding in 2021 with over 410 successful software engineering deployments across US, UK, Australia, and EU.",
      content: "Official milestone announcement for 410+ projects completed.",
      location: "Karachi, Pakistan",
      contact: "info@abuqitmirlabs.tech",
      author: "AbuQitmirLabs Press Office",
      readTime: "4 min read",
      slug: "/news/press-releases",
      published: true
    }
];

const AdminDashboard = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isInIframe, setIsInIframe] = useState(false);
    
    // Blog State
    const [posts, setPosts] = useState<any[]>([]);
    const [fetchingPosts, setFetchingPosts] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');

    // Section Switcher: 'blog' | 'news'
    const [activeSection, setActiveSection] = useState<'blog' | 'news'>('blog');

    // News Section State
    const [newsSubTab, setNewsSubTab] = useState<'all' | 'latest' | 'press-releases' | 'industry-insights'>('all');
    const [newsActiveTab, setNewsActiveTab] = useState<'list' | 'create'>('list');
    const [newsItems, setNewsItems] = useState<any[]>([]);
    const [fetchingNews, setFetchingNews] = useState(false);
    const [editingNewsId, setEditingNewsId] = useState<string | null>(null);

    const [newsFormData, setNewsFormData] = useState({
        title: '',
        type: 'latest', // 'latest' | 'press-releases' | 'industry-insights' | 'all'
        category: 'Product Launch',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
        excerpt: '',
        content: '',
        location: 'Karachi, Pakistan',
        contact: 'info@abuqitmirlabs.tech',
        author: 'Abu Qitmir Mohammad Shiraz Al-Madani',
        readTime: '4 min read',
        slug: '/news/latest',
        published: true
    });

    const CATEGORIES = ["AI", "Software", "Business", "App", "Development"];

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isConverting, setIsConverting] = useState<boolean[]>([false, false, false, false, false, false]);
    const [helperImages, setHelperImages] = useState<Array<{url: string, caption: string}>>([
        { url: '', caption: '' },
        { url: '', caption: '' },
        { url: '', caption: '' },
        { url: '', caption: '' },
        { url: '', caption: '' },
        { url: '', caption: '' }
    ]);

    const getEstimatedSizeKB = (url: string) => {
        if (!url) return 0;
        if (url.startsWith('data:')) {
            return Math.round(url.length * 0.75 / 1024);
        }
        return 0; // External images take 0 bytes of Firestore document space
    };

    const totalPayloadSizeKB = helperImages.reduce((sum, img) => sum + getEstimatedSizeKB(img.url), 0);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: 'ABUQITMIRLABS .TECH Shiraz Almadani',
        category: 'AI',
        published: true,
        coverImage: '',
        coverImageAlt: '',
        tags: '' 
    });

    const fetchPosts = async () => {
        setFetchingPosts(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'posts'));
            const p = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPosts(p);
        } catch (error) {
            console.error("Fetch Posts Error:", error);
        } finally {
            setFetchingPosts(false);
        }
    };

    const fetchNewsItems = async () => {
        setFetchingNews(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'news_items'));
            const n = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setNewsItems(n);
        } catch (error) {
            console.error("Fetch News Error:", error);
        } finally {
            setFetchingNews(false);
        }
    };

    useEffect(() => {
        if (user && (user.email === ADMIN_EMAIL || user.uid === ADMIN_UID)) {
            fetchPosts();
            fetchNewsItems();
        }
    }, [user]);

    const handleEdit = (post: any) => {
        setEditingId(post.id);
        setFormData({
            title: post.title || '',
            slug: post.slug || '',
            excerpt: post.excerpt || '',
            content: post.content || '',
            author: post.author || 'ABUQITMIRLABS .TECH Shiraz Almadani',
            category: post.category || 'AI',
            published: post.published ?? true,
            coverImage: post.coverImage || '',
            coverImageAlt: post.coverImageAlt || '',
            tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || '')
        });

        // Auto-extract or load from saved helperImages field
        if (post.helperImages && Array.isArray(post.helperImages) && post.helperImages.length > 0) {
            setHelperImages(prev => {
                const updated = [...prev].map(() => ({ url: '', caption: '' }));
                for (let i = 0; i < 6; i++) {
                    if (post.helperImages[i]) {
                        updated[i] = post.helperImages[i];
                    }
                }
                return updated;
            });
        } else {
            try {
                const extracted: Array<{url: string, caption: string}> = [];
                const regex = /!\[([^\]]*)\]\(([^)]+)\)/g;
                let match;
                while ((match = regex.exec(post.content || '')) !== null) {
                    extracted.push({ caption: match[1] || '', url: match[2] || '' });
                }
                
                setHelperImages(prev => {
                    const updated = [...prev].map(() => ({ url: '', caption: '' }));
                    for (let i = 0; i < 6; i++) {
                        if (extracted[i]) {
                            updated[i] = extracted[i];
                        }
                    }
                    return updated;
                });
            } catch (e) {
                console.error("Error extracting help images:", e);
            }
        }

        setActiveTab('create');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this post forever?')) return;
        try {
            await deleteDoc(doc(db, 'posts', id));
            setPosts(posts.filter(p => p.id !== id));
            setStatus({ type: 'success', message: 'Post deleted' });
        } catch (err) {
            setStatus({ type: 'error', message: 'Delete failed' });
        }
    };

    // News Handlers
    const handleNewsEdit = (item: any) => {
        setEditingNewsId(item.id);
        setNewsFormData({
            title: item.title || '',
            type: item.type || 'latest',
            category: item.category || 'Product Launch',
            date: item.date || new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
            excerpt: item.excerpt || '',
            content: item.content || '',
            location: item.location || 'Karachi, Pakistan',
            contact: item.contact || 'info@abuqitmirlabs.tech',
            author: item.author || 'Abu Qitmir Mohammad Shiraz Al-Madani',
            readTime: item.readTime || '4 min read',
            slug: item.slug || '/news/latest',
            published: item.published ?? true
        });
        setActiveSection('news');
        setNewsActiveTab('create');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNewsDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this news item?")) return;
        try {
            await deleteDoc(doc(db, 'news_items', id));
            setNewsItems(prev => prev.filter(item => item.id !== id));
            setStatus({ type: 'success', message: 'News item deleted successfully.' });
        } catch (err: any) {
            setStatus({ type: 'error', message: 'Delete failed: ' + err.message });
        }
    };

    const handleNewsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isAuthorized = user && (user.email === ADMIN_EMAIL || user.uid === ADMIN_UID);
        if (!isAuthorized || !user.emailVerified) {
            setStatus({ type: 'error', message: 'Unauthorized action' });
            return;
        }
        setIsSubmitting(true);
        setStatus(null);
        try {
            if (editingNewsId) {
                await updateDoc(doc(db, 'news_items', editingNewsId), {
                    ...newsFormData,
                    updatedAt: serverTimestamp()
                });
                setStatus({ type: 'success', message: 'News item updated successfully!' });
            } else {
                const docRef = await addDoc(collection(db, 'news_items'), {
                    ...newsFormData,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
                setStatus({ type: 'success', message: `News item published! ID: ${docRef.id}` });
            }
            setEditingNewsId(null);
            setNewsFormData({
                title: '',
                type: 'latest',
                category: 'Product Launch',
                date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
                excerpt: '',
                content: '',
                location: 'Karachi, Pakistan',
                contact: 'info@abuqitmirlabs.tech',
                author: 'Abu Qitmir Mohammad Shiraz Al-Madani',
                readTime: '4 min read',
                slug: '/news/latest',
                published: true
            });
            fetchNewsItems();
            setNewsActiveTab('list');
        } catch (err: any) {
            console.error(err);
            setStatus({ type: 'error', message: err.message || 'Failed to save news item' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSeedNews = async () => {
        if (!window.confirm("Import initial default news items into database?")) return;
        setIsSubmitting(true);
        setStatus(null);
        try {
            for (const item of DEFAULT_NEWS_SEED) {
                await addDoc(collection(db, 'news_items'), {
                    ...item,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
            }
            setStatus({ type: 'success', message: 'Default news items imported to database!' });
            fetchNewsItems();
        } catch (err: any) {
            setStatus({ type: 'error', message: 'Import failed: ' + err.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const insertImageAtCursor = (imageUrl: string, caption: string) => {
        const textarea = textareaRef.current;
        if (!textarea) {
            setFormData(prev => ({
                ...prev,
                content: prev.content + `\n\n![${caption}](${imageUrl})\n\n`
            }));
            return;
        }
        
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const beforeText = formData.content.substring(0, startPos);
        const afterText = formData.content.substring(endPos);
        
        const imageMarkdown = `\n\n![${caption || 'Blog Illustration'}](${imageUrl})\n\n`;
        const newContent = beforeText + imageMarkdown + afterText;
        
        setFormData(prev => ({
            ...prev,
            content: newContent
        }));
        
        setTimeout(() => {
            textarea.focus();
            const newCursorPos = startPos + imageMarkdown.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 50);
    };

    const handleImageUpload = (file: File, idx: number) => {
        if (!file) return;
        
        // Mark slot as converting
        setIsConverting(prev => {
            const next = [...prev];
            next[idx] = true;
            return next;
        });

        // Human-friendly title conversion from file name for SEO Alt Tag
        const cleanName = file.name
            .split('.')[0]
            .replace(/[-_]+/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());

        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                // Highly-optimized blog-friendly max presentation width
                const targetWidth = 750;
                let width = img.width;
                let height = img.height;

                if (width > targetWidth) {
                    height = Math.round((height * targetWidth) / width);
                    width = targetWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    // Compress to highly optimized WebP format
                    const webpDataUrl = canvas.toDataURL('image/webp', 0.45);

                    // Convert to binary Blob and upload to Anonymous Permanent Cloud Hosting (takes 0KB in Firestore database!)
                    canvas.toBlob(async (blob) => {
                        if (!blob) {
                            // Fallback to local Base64 webp url if blob generation failed
                            setHelperImages(prev => {
                                const copy = [...prev];
                                copy[idx] = {
                                    url: webpDataUrl,
                                    caption: copy[idx].caption || cleanName || 'Optimized WebP Illustration'
                                };
                                return copy;
                            });
                            setIsConverting(prev => {
                                const next = [...prev];
                                next[idx] = false;
                                return next;
                            });
                            return;
                        }

                        const webpFile = new File([blob], `${cleanName.toLowerCase().replace(/\s+/g, '_') || 'image'}.webp`, { type: 'image/webp' });
                        let uploadedUrl = '';

                        // Attempt 1: Pixeldrain.com (High-speed, Developer-friendly, Permanent CORS-supporting direct storage)
                        try {
                            const pData = new FormData();
                            pData.append('file', webpFile);
                            const pRes = await fetch('https://pixeldrain.com/api/file', {
                                method: 'POST',
                                body: pData
                            });
                            if (pRes.ok) {
                                const json = await pRes.ok ? await pRes.json() : null;
                                if (json && json.success && json.id) {
                                    uploadedUrl = `https://pixeldrain.com/api/file/${json.id}`;
                                }
                            }
                        } catch (err) {
                            console.warn("Pixeldrain upload failed, trying TmpFiles as fallback...", err);
                        }

                        // Attempt 2: TmpFiles.org (Alternative hosting fallback if Pixeldrain is down/blocked)
                        if (!uploadedUrl) {
                            try {
                                const tData = new FormData();
                                tData.append('file', webpFile);
                                const tRes = await fetch('https://tmpfiles.org/api/v1/upload', {
                                    method: 'POST',
                                    body: tData
                                });
                                if (tRes.ok) {
                                    const json = await tRes.json();
                                    if (json.status === 'success' && json.data?.url) {
                                        uploadedUrl = json.data.url.replace('https://tmpfiles.org/', 'https://tmpfiles.org/dl/');
                                    }
                                }
                            } catch (err) {
                                console.warn("TmpFiles upload failed, using local Base64 fallback.", err);
                            }
                        }

                        // Use cloud-hosted URL if successful, otherwise utilize local optimized base64
                        const finalUrl = uploadedUrl || webpDataUrl;

                        setHelperImages(prev => {
                            const copy = [...prev];
                            copy[idx] = {
                                url: finalUrl,
                                caption: copy[idx].caption || cleanName || 'Optimized WebP Illustration'
                            };
                            return copy;
                        });

                        setIsConverting(prev => {
                            const next = [...prev];
                            next[idx] = false;
                            return next;
                        });
                    }, 'image/webp', 0.45);
                } else {
                    setIsConverting(prev => {
                        const next = [...prev];
                        next[idx] = false;
                        return next;
                    });
                }
            };
            img.onerror = () => {
                setIsConverting(prev => {
                    const next = [...prev];
                    next[idx] = false;
                    return next;
                });
            };
            img.src = dataUrl;
        };
        reader.onerror = () => {
            setIsConverting(prev => {
                const next = [...prev];
                next[idx] = false;
                return next;
            });
        };
        reader.readAsDataURL(file);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const slug = generateSlug(title);
        setFormData({ ...formData, title, slug });
    };

    useEffect(() => {
        // Detect iframe
        setIsInIframe(window.self !== window.top);

        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
            if (user) {
                setLoginError(null);
            }
        });

        // Handle redirect result
        getRedirectResult(auth).catch((error) => {
            console.error("Redirect Error:", error);
            setLoginError(`Redirect login failed: ${error.message}`);
        });

        return () => unsubscribe();
    }, []);

    const handleOpenInNewTab = () => {
        window.open(window.location.href, '_blank');
    };

    const handleLogin = async () => {
        setIsLoginLoading(true);
        setLoginError(null);
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error: any) {
            console.error("Login Error:", error);
            let message = `Sign-in failed (${error.code || 'unknown error'}).`;
            
            if (error.code === 'auth/popup-blocked') {
                message = "Sign-in popup was blocked. Please allow popups or try the Redirect method below.";
            } else if (error.code === 'auth/popup-closed-by-user') {
                message = "Sign-in window was closed. If popups aren't working, try the Redirect method below.";
            } else if (error.code === 'auth/cancelled-closure-interaction') {
                message = "Sign-in was cancelled.";
            } else if (error.code === 'auth/operation-not-allowed') {
                message = "Google Sign-In is not enabled in your Firebase Project.";
            } else if (error.code === 'auth/unauthorized-domain') {
                message = "This domain is not authorized for Firebase Auth.";
            }
            
            setLoginError(message);
        } finally {
            setIsLoginLoading(false);
        }
    };

    const handleRedirectLogin = async () => {
        setIsLoginLoading(true);
        try {
            await signInWithRedirect(auth, googleProvider);
        } catch (error: any) {
            setLoginError(`Redirect failed: ${error.message}`);
            setIsLoginLoading(false);
        }
    };

    const handleLogout = () => signOut(auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isAuthorized = user && (user.email === ADMIN_EMAIL || user.uid === ADMIN_UID);
        
        if (!isAuthorized || !user.emailVerified) {
            setStatus({ type: 'error', message: 'Unauthorized action or unverified email' });
            return;
        }

        setIsSubmitting(true);
        setStatus(null);

        // Calculate and validate image storage payload before writing to Firestore
        const cleanHelperImages = helperImages.filter(img => img.url && img.url.trim() !== '');
        let payloadSizeKB = 0;
        cleanHelperImages.forEach(img => {
            if (img.url && img.url.startsWith('data:')) {
                payloadSizeKB += Math.round(img.url.length * 0.75 / 1024);
            }
        });

        if (payloadSizeKB > 800) {
            setStatus({
                type: 'error',
                message: `Publish blocked: Total upload size (${payloadSizeKB} KB) exceeds the 800 KB safe limit. Please clean your slots, use direct image links rather than raw files, or compress images further!`
            });
            setIsSubmitting(false);
            return;
        }

        try {
            const tagsArray = formData.tags.split(',').map(tag => tag.trim().replace(/^#/, '')).filter(tag => tag !== '');
            
            if (editingId) {
                await updateDoc(doc(db, 'posts', editingId), {
                    ...formData,
                    helperImages: cleanHelperImages,
                    tags: tagsArray,
                    updatedAt: serverTimestamp()
                });
                setStatus({ type: 'success', message: 'Post updated successfully!' });
            } else {
                const docRef = await addDoc(collection(db, 'posts'), {
                    ...formData,
                    helperImages: cleanHelperImages,
                    tags: tagsArray,
                    authorId: user.uid,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
                setStatus({ type: 'success', message: `Post published successfully! ID: ${docRef.id}` });
            }

                setFormData({
                    title: '',
                    slug: '',
                    excerpt: '',
                    content: '',
                    author: 'ABUQITMIRLABS .TECH Shiraz Almadani',
                    category: 'AI',
                    published: true,
                    coverImage: '',
                    coverImageAlt: '',
                    tags: ''
                });
                setHelperImages([
                    { url: '', caption: '' },
                    { url: '', caption: '' },
                    { url: '', caption: '' },
                    { url: '', caption: '' },
                    { url: '', caption: '' },
                    { url: '', caption: '' }
                ]);
            setEditingId(null);
            fetchPosts();
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Failed to create post' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <Loader2 className="text-blue-500 animate-spin" size={48} />
        </div>
    );

    const renderContent = () => {
        console.log("AdminDashboard: Rendering content, user:", user?.email);
        
        if (!user) {
            return (
                <div className="flex items-center justify-center min-h-[60vh] p-6">
                    <div className="max-w-md w-full bg-[#111] border-4 border-white/20 p-10 rounded-3xl text-center shadow-[20px_20px_0px_0px_rgba(255,255,255,0.1)]">
                        <Shield className="mx-auto text-blue-500 mb-6" size={80} />
                        <h1 className="text-4xl font-black text-white uppercase mb-4 tracking-tighter">Admin Portal</h1>
                        <p className="text-gray-400 mb-6 text-lg leading-relaxed">Identity verification required. Please sign in with your authorized technical administrator account.</p>
                        
                        <AnimatePresence>
                            {loginError && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-bold text-left overflow-hidden"
                                >
                                    <AlertCircle className="shrink-0" size={20} />
                                    <div className="break-words w-full">{loginError}</div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-4">
                            {isInIframe ? (
                                <>
                                    <button 
                                        onClick={handleOpenInNewTab}
                                        className="w-full bg-white text-black font-black py-5 rounded-2xl transition-all uppercase tracking-widest text-base shadow-lg active:scale-95 flex items-center justify-center gap-3 mb-2"
                                    >
                                        <Globe size={20} /> Launch in New Tab
                                    </button>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">
                                        Required for secure authentication
                                    </p>
                                    <div className="relative">
                                        <hr className="border-white/10" />
                                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111] px-4 text-[10px] font-black text-white/20">OR TRY ANYWAY</span>
                                    </div>
                                </>
                            ) : null}

                            <button 
                                onClick={handleLogin}
                                disabled={isLoginLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-black py-5 rounded-2xl transition-all uppercase tracking-widest text-base shadow-lg shadow-blue-600/30 active:scale-95 flex items-center justify-center gap-3"
                            >
                                {isLoginLoading ? <Loader2 className="animate-spin" /> : null}
                                {isLoginLoading ? 'Connecting...' : 'Sign in with Google'}
                            </button>

                            <button 
                                onClick={handleRedirectLogin}
                                disabled={isLoginLoading}
                                className="w-full bg-white/5 hover:bg-white/10 text-gray-400 font-bold py-3 rounded-xl border border-white/10 transition-colors uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                            >
                                <Globe size={14} /> Redirect Login Method
                            </button>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                            <div className="text-left bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10">
                                <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <AlertCircle size={12} /> Troubleshoot Network Error
                                </h4>
                                <ul className="text-[10px] text-gray-500 font-bold uppercase tracking-tight leading-relaxed list-disc ml-4 space-y-1">
                                    <li>Open this app in a <span className="text-blue-500">New Tab</span> (Required)</li>
                                    <li>Disable Ad-Blockers / Brave Shields</li>
                                    <li>Enable "Allow Popups" in browser settings</li>
                                    <li>Ensure you are using a Private/Incognito window if problems persist</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        const isAuthorized = user && (user.email === ADMIN_EMAIL || user.uid === ADMIN_UID);

        if (!isAuthorized || (user.email === ADMIN_EMAIL && !user.emailVerified)) {
            return (
                <div className="flex items-center justify-center min-h-[60vh] p-6">
                    <div className="max-w-md w-full bg-[#0a0a0a] border border-red-500/30 p-8 rounded-3xl text-center brutalist-shadow border-4 border-red-500/10">
                        <AlertCircle className="mx-auto text-red-500 mb-6" size={64} />
                        <h1 className="text-3xl font-black text-white uppercase mb-4 tracking-tighter">Access Denied</h1>
                        <p className="text-gray-400 mb-8 font-medium">
                            Administrative access is strictly restricted.
                            {!isAuthorized ? ` Your account (${user.email || user.uid}) is not authorized.` : " Please verify your email to continue."}
                        </p>
                        <button 
                            onClick={handleLogout}
                            className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl border border-white/10 transition-colors uppercase tracking-widest text-sm"
                        >
                            Log Out & Try Admin Account
                        </button>
                    </div>
                </div>
            );
        }

        const filteredNewsItems = newsItems.filter(item => {
            if (newsSubTab === 'all') return true;
            return item.type === newsSubTab || item.type === 'all';
        });

        return (
            <div className="max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar: Desktop Only */}
                    <aside className="hidden md:flex flex-col gap-4 w-64 shrink-0">
                        {/* Section Selector */}
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-2 flex flex-col gap-1.5 shadow-xl">
                            <button
                                onClick={() => setActiveSection('blog')}
                                className={`w-full font-bold py-3 px-4 rounded-xl flex items-center justify-between text-xs tracking-wider transition-all uppercase ${activeSection === 'blog' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30 font-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <span className="flex items-center gap-2">
                                    <FileText size={16} /> Blog Posts
                                </span>
                                <span className="bg-black/40 text-[9px] px-2 py-0.5 rounded-full">{posts.length}</span>
                            </button>
                            <button
                                onClick={() => setActiveSection('news')}
                                className={`w-full font-bold py-3 px-4 rounded-xl flex items-center justify-between text-xs tracking-wider transition-all uppercase ${activeSection === 'news' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30 font-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <span className="flex items-center gap-2">
                                    <Newspaper size={16} /> News Section ▼
                                </span>
                                <span className="bg-black/40 text-[9px] px-2 py-0.5 rounded-full">{newsItems.length}</span>
                            </button>
                        </div>

                        {activeSection === 'blog' ? (
                            <>
                                <button 
                                    onClick={() => {
                                        setActiveTab('create');
                                        setEditingId(null);
                                        setFormData({
                                            title: '', slug: '', excerpt: '', content: '', 
                                            author: 'ABUQITMIRLABS .TECH Shiraz Almadani', category: 'AI', 
                                            published: true, coverImage: '', coverImageAlt: '', tags: ''
                                        });
                                        setHelperImages([
                                            { url: '', caption: '' },
                                            { url: '', caption: '' },
                                            { url: '', caption: '' },
                                            { url: '', caption: '' },
                                            { url: '', caption: '' },
                                            { url: '', caption: '' }
                                        ]);
                                    }}
                                    className={`w-full font-bold py-4 px-6 rounded-xl flex items-center gap-3 transition-all active:scale-95 shadow-lg ${activeTab === 'create' ? 'bg-blue-600 text-white shadow-blue-900/20' : 'bg-zinc-900 text-gray-400 border border-white/5'}`}
                                >
                                    <Plus size={20} />
                                    <span className="uppercase tracking-widest text-xs font-black">{editingId ? 'EDITING POST' : 'NEW BLOG POST'}</span>
                                </button>
                                <button 
                                    onClick={() => setActiveTab('list')}
                                    className={`w-full font-bold py-4 px-6 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'list' ? 'bg-zinc-800 text-white border-blue-500/50 border' : 'bg-zinc-950 text-gray-400 border border-white/5'}`}
                                >
                                    <FileText size={20} />
                                    <span className="uppercase tracking-widest text-xs font-black">ALL POSTS ({posts.length})</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button 
                                    onClick={() => {
                                        setNewsActiveTab('create');
                                        setEditingNewsId(null);
                                        setNewsFormData({
                                            title: '',
                                            type: 'latest',
                                            category: 'Product Launch',
                                            date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
                                            excerpt: '',
                                            content: '',
                                            location: 'Karachi, Pakistan',
                                            contact: 'info@abuqitmirlabs.tech',
                                            author: 'Abu Qitmir Mohammad Shiraz Al-Madani',
                                            readTime: '4 min read',
                                            slug: '/news/latest',
                                            published: true
                                        });
                                    }}
                                    className={`w-full font-bold py-4 px-6 rounded-xl flex items-center gap-3 transition-all active:scale-95 shadow-lg ${newsActiveTab === 'create' ? 'bg-blue-600 text-white shadow-blue-900/20' : 'bg-zinc-900 text-gray-400 border border-white/5'}`}
                                >
                                    <Plus size={20} />
                                    <span className="uppercase tracking-widest text-xs font-black">{editingNewsId ? 'EDITING NEWS' : 'NEW NEWS ARTICLE'}</span>
                                </button>
                                <button 
                                    onClick={() => setNewsActiveTab('list')}
                                    className={`w-full font-bold py-4 px-6 rounded-xl flex items-center gap-3 transition-all ${newsActiveTab === 'list' ? 'bg-zinc-800 text-white border-blue-500/50 border' : 'bg-zinc-950 text-gray-400 border border-white/5'}`}
                                >
                                    <Newspaper size={20} />
                                    <span className="uppercase tracking-widest text-xs font-black">ALL NEWS ({newsItems.length})</span>
                                </button>

                                {/* News Pages Quick Sub-Filters */}
                                <div className="p-3 bg-zinc-950 border border-white/5 rounded-2xl space-y-1.5 mt-2">
                                    <div className="text-[9px] font-black uppercase text-gray-500 tracking-widest px-2 pb-1">Filter by Page</div>
                                    {[
                                        { id: 'all', label: 'All News', icon: Sparkles },
                                        { id: 'latest', label: 'Latest News', icon: Rss },
                                        { id: 'press-releases', label: 'Press Releases', icon: Megaphone },
                                        { id: 'industry-insights', label: 'Industry Insights', icon: Lightbulb }
                                    ].map(sub => {
                                        const Icon = sub.icon;
                                        const count = sub.id === 'all' 
                                            ? newsItems.length 
                                            : newsItems.filter(i => i.type === sub.id || i.type === 'all').length;
                                        return (
                                            <button
                                                key={sub.id}
                                                onClick={() => {
                                                    setNewsSubTab(sub.id as any);
                                                    setNewsActiveTab('list');
                                                }}
                                                className={`w-full py-2 px-3 rounded-lg flex items-center justify-between text-[11px] font-bold transition-all ${newsSubTab === sub.id ? 'bg-white/10 text-white border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <Icon size={13} className="text-blue-400" /> {sub.label}
                                                </span>
                                                <span className="text-[9px] bg-black/40 px-1.5 py-0.5 rounded-md text-gray-400">{count}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </>
                        )}

                        <div className="mt-auto pt-10">
                             <button 
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-400 transition-colors font-black uppercase tracking-widest text-[10px] py-4 border border-red-500/10 rounded-xl bg-red-500/5 shadow-sm"
                            >
                                <LogOut size={14} /> Log Out Account
                            </button>
                        </div>
                    </aside>

                    {/* Editor Container */}
                    <section className="flex-grow w-full">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#0d0d0d] border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 p-8">
                                <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em]">Build v2.4</div>
                            </div>

                            {/* Section Title */}
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="text-blue-500 font-light text-4xl leading-none">
                                        {activeSection === 'blog' ? (editingId ? '✎' : '+') : (editingNewsId ? '✎' : '+')}
                                    </div>
                                    <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase">
                                        {activeSection === 'blog' 
                                          ? (activeTab === 'create' ? (editingId ? 'Update Blog Post' : 'Create New Blog Post') : 'Manage Contents')
                                          : (newsActiveTab === 'create' ? (editingNewsId ? 'Update News Article' : 'Create News Article') : `Manage News (${newsSubTab.toUpperCase()})`)
                                        }
                                    </h2>
                                </div>
                                {activeSection === 'blog' && editingId && (
                                    <button 
                                        onClick={() => {
                                            setEditingId(null);
                                             setFormData({
                                                title: '', slug: '', excerpt: '', content: '', 
                                                author: 'ABUQITMIRLABS .TECH Shiraz Almadani', category: 'AI', 
                                                published: true, coverImage: '', coverImageAlt: '', tags: ''
                                            });
                                            setHelperImages([
                                                { url: '', caption: '' },
                                                { url: '', caption: '' },
                                                { url: '', caption: '' },
                                                { url: '', caption: '' },
                                                { url: '', caption: '' },
                                                { url: '', caption: '' }
                                            ]);
                                        }}
                                        className="text-[10px] font-black text-red-500 uppercase tracking-widest bg-red-500/10 px-4 py-2 rounded-lg"
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                                {activeSection === 'news' && editingNewsId && (
                                    <button 
                                        onClick={() => {
                                            setEditingNewsId(null);
                                            setNewsActiveTab('list');
                                        }}
                                        className="text-[10px] font-black text-red-500 uppercase tracking-widest bg-red-500/10 px-4 py-2 rounded-lg"
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                            </div>

                            {activeSection === 'blog' ? (
                                <AnimatePresence mode="wait">
                                    {activeTab === 'create' ? (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                        >
                                            <AnimatePresence>
                                                {status && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        className={`p-5 rounded-2xl mb-8 flex items-center gap-3 font-bold uppercase tracking-widest text-[10px] ${
                                                            status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_20px_rgba(239,44,44,0.1)]'
                                                        }`}
                                                    >
                                                        {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                                                        {status.message}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                        {/* Create Form */}
                                        <form onSubmit={handleSubmit} className="space-y-8">
                                            {/* Category & Title */}
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                                <div className="md:col-span-4 space-y-3">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Post Category</label>
                                                    <select 
                                                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-white font-bold appearance-none cursor-pointer"
                                                        value={formData.category}
                                                        onChange={e => setFormData({...formData, category: e.target.value})}
                                                    >
                                                        {CATEGORIES.map(cat => (
                                                            <option key={cat} value={cat}>{cat}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="md:col-span-8 space-y-3">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 flex justify-between">
                                                        Post Title
                                                        <span className="text-blue-500/50">Required</span>
                                                    </label>
                                                    <input 
                                                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-700 text-white font-medium" 
                                                        placeholder="Future-Proofing with AI" 
                                                        type="text"
                                                        required
                                                        value={formData.title}
                                                        onChange={handleTitleChange}
                                                    />
                                                </div>
                                            </div>

                                            {/* Slug */}
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Slug (URL Friendly)</label>
                                                <input 
                                                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-700 text-gray-400 font-mono text-sm" 
                                                    placeholder="future-proofing-with-ai" 
                                                    type="text"
                                                    required
                                                    value={formData.slug}
                                                    onChange={e => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                                                />
                                            </div>

                                            {/* Cover Image */}
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 flex justify-between items-center">
                                                    Cover Image URL
                                                    {formData.coverImage && <span className="text-green-500 animate-pulse">● LIVE PREVIEW</span>}
                                                </label>
                                                <input 
                                                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-700 text-white" 
                                                    placeholder="https://images.unsplash.com/..." 
                                                    type="url"
                                                    value={formData.coverImage}
                                                    onChange={e => setFormData({...formData, coverImage: e.target.value})}
                                                />
                                                <div className="pt-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                                                    Cover Image Alt Tag (SEO & Accessibility)
                                                </div>
                                                <input 
                                                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-650 text-white" 
                                                    placeholder="e.g. business owner analyzing slow website performance and customer drop-offs" 
                                                    type="text"
                                                    value={formData.coverImageAlt || ''}
                                                    onChange={e => setFormData({...formData, coverImageAlt: e.target.value})}
                                                />
                                                
                                                {/* Dynamic Image Preview */}
                                                <AnimatePresence>
                                                    {formData.coverImage && (
                                                        <motion.div 
                                                            initial={{ opacity: 0, y: 10, height: 0 }}
                                                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                                                            exit={{ opacity: 0, y: 10, height: 0 }}
                                                            className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-[#151515] group"
                                                        >
                                                            <img 
                                                                src={formData.coverImage} 
                                                                alt={formData.coverImageAlt || "futuristic blog post cover preview"} 
                                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                                onError={(e) => {
                                                                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/1a1a1a/3b82f6?text=Invalid+Image+URL';
                                                                }}
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                                                <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Visual Preview Verified</p>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Excerpt */}
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Excerpt (Brief Summary)</label>
                                                <textarea 
                                                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-700 resize-none text-white leading-relaxed" 
                                                    placeholder="Enter a short catchy summary for the card view..." 
                                                    rows={3}
                                                    required
                                                    value={formData.excerpt}
                                                    onChange={e => setFormData({...formData, excerpt: e.target.value})}
                                                ></textarea>
                                            </div>

                                            {/* Full Content */}
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 flex justify-between">
                                                    Full Content (Markdown Supported)
                                                    <span className="text-zinc-600 lowercase cursor-help hover:text-blue-500 transition-colors">Supports H1 (#), H2 (##), etc.</span>
                                                </label>
                                                <textarea 
                                                    ref={textareaRef}
                                                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-[2rem] px-8 py-8 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-700 text-white min-h-[400px] font-mono text-base leading-relaxed" 
                                                    placeholder="Write your article content here..." 
                                                    required
                                                    value={formData.content}
                                                    onChange={e => setFormData({...formData, content: e.target.value})}
                                                ></textarea>
                                            </div>

                                            {/* Premium In-Article 4-6 Photos Asset Manager */}
                                            <div className="bg-[#111111] border border-white/5 rounded-[2.5rem] p-6 md:p-8 space-y-6">
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-green-400 font-bold text-lg">⚡</span>
                                                        <h3 className="text-sm font-black text-white uppercase tracking-widest"><span className="text-[#ccff00]">Auto-Flow</span> Photo Assistant (4 to 6 Photos)</h3>
                                                    </div>
                                                    <p className="text-[10px] text-gray-300 uppercase tracking-wider leading-relaxed">
                                                        <strong>Automatic Distribution Active:</strong> Simply upload your photos or enter URLs below and they will automatically & beautifully distribute evenly throughout the blog paragraphs when published! None of that messy, long Base64 code inside your editor. 
                                                        <span className="text-blue-400 font-bold block mt-1">If you want exact manual placement, you can still click Insert 📍 to copy it.</span>
                                                    </p>

                                                    {/* Firestore Payload Meter */}
                                                    <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-black/40 border border-white/5 text-[10px] font-black tracking-wider uppercase">
                                                        <span className="text-zinc-400 flex items-center gap-1.5">
                                                            🗄️ Firestore Payload Meter:
                                                            {totalPayloadSizeKB > 700 && <span className="text-red-500 animate-pulse text-[8px]">(CRITICAL - REDUCE IMAGE SIZE)</span>}
                                                        </span>
                                                        <div className="flex items-center gap-3">
                                                            <span className={totalPayloadSizeKB > 700 ? "text-red-500 font-black animate-pulse" : totalPayloadSizeKB > 400 ? "text-yellow-400 font-black" : "text-[#ccff00] font-black"}>
                                                                {totalPayloadSizeKB} KB / 800 KB Limit
                                                            </span>
                                                            <div className="w-24 bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-white/5">
                                                                <div 
                                                                    className={`h-full transition-all duration-500 ${totalPayloadSizeKB > 700 ? 'bg-red-500' : totalPayloadSizeKB > 400 ? 'bg-yellow-400' : 'bg-[#ccff00]'}`}
                                                                    style={{ width: `${Math.min(100, (totalPayloadSizeKB / 800) * 100)}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Photo Cards Grid */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {helperImages.map((img, idx) => {
                                                        const isFilled = img.url.trim() !== '';
                                                        return (
                                                            <div key={idx} className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col justify-between space-y-4 hover:border-white/10 transition-colors">
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-[9px] font-black tracking-widest text-zinc-500 uppercase">
                                                                        Photo Slot #{idx + 1}
                                                                    </span>
                                                                    {isFilled && (
                                                                        <div className="flex gap-1.5">
                                                                            {img.url.startsWith('data:') ? (
                                                                                <span className="text-[8px] font-black tracking-widest text-[#ccff00] bg-[#ccff00]/10 px-2 py-0.5 rounded">
                                                                                    {getEstimatedSizeKB(img.url)} KB
                                                                                </span>
                                                                            ) : (
                                                                                <span className="text-[8px] font-black tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                                                                                    0 KB (LINK)
                                                                                </span>
                                                                            )}
                                                                            <span className="text-[8px] font-black tracking-widest text-[#ccff00] bg-[#ccff00]/15 px-2 py-0.5 rounded">
                                                                                ACTIVE
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Thumbnail Preview Area & Drag Area */}
                                                                <div className="aspect-video w-full rounded-xl overflow-hidden bg-white/5 border border-white/5 flex items-center justify-center relative group">
                                                                    {isConverting[idx] ? (
                                                                        <div className="text-center p-4 animate-pulse">
                                                                            <Loader2 className="w-6 h-6 animate-spin text-[#ccff00] mx-auto mb-2" />
                                                                            <div className="text-[8px] font-black text-[#ccff00] uppercase tracking-widest">
                                                                                Optimizing & Uploading to CDN...
                                                                            </div>
                                                                        </div>
                                                                    ) : isFilled ? (
                                                                        <>
                                                                            <img 
                                                                                src={img.url} 
                                                                                alt={img.caption || `In-article visual #${idx+1}`}
                                                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                                                onError={(e) => {
                                                                                    (e.target as HTMLImageElement).src = 'https://placehold.co/400x250/1a1a1a/333?text=Broken+Image+Link';
                                                                                }}
                                                                            />
                                                                            {img.url.startsWith('data:image/webp') && (
                                                                                <div className="absolute top-2 right-2 bg-blue-600 text-white text-[7px] font-black tracking-widest uppercase px-2 py-0.5 rounded border border-white/10 shadow-lg">
                                                                                    ⚡ WEBP OPTIMIZED
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <div className="text-center p-4">
                                                                            <div className="text-zinc-600 text-lg mb-1">📷</div>
                                                                            <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Empty Slot</div>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* WebP Direct File Converter Action */}
                                                                <div>
                                                                    <label className="flex items-center justify-center gap-2 border border-dashed border-white/10 hover:border-[#ccff00]/50 bg-white/5 hover:bg-white/10 rounded-xl px-3 py-2.5 cursor-pointer text-center group transition-all">
                                                                        <span className="text-sm">⚡</span>
                                                                        <span className="text-[9px] font-black tracking-wider uppercase text-gray-300 group-hover:text-white">
                                                                            {isConverting[idx] ? 'Processing...' : 'Upload & Auto-Convert WebP'}
                                                                        </span>
                                                                        <input 
                                                                            type="file" 
                                                                            accept="image/*" 
                                                                            className="hidden" 
                                                                            onChange={(e) => {
                                                                                const file = e.target.files?.[0];
                                                                                if (file) handleImageUpload(file, idx);
                                                                            }} 
                                                                        />
                                                                    </label>
                                                                </div>

                                                                {/* Inputs */}
                                                                <div className="space-y-3">
                                                                    <div className="space-y-1">
                                                                        <span className="text-[8px] font-black text-zinc-500 uppercase tracking-wider">Image / Data URL Source:</span>
                                                                        <input 
                                                                            type="text"
                                                                            placeholder="Image URL or Base64 data..."
                                                                            className="w-full bg-[#161616] border border-white/5 rounded-lg px-3 py-2 text-[10px] text-white font-mono placeholder:text-zinc-700 truncate"
                                                                            value={img.url}
                                                                            onChange={(e) => {
                                                                                const newImages = [...helperImages];
                                                                                newImages[idx].url = e.target.value;
                                                                                setHelperImages(newImages);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <span className="text-[8px] font-black text-zinc-500 uppercase tracking-wider">Alt Tag (SEO & Accessibility):</span>
                                                                        <input 
                                                                            type="text"
                                                                            placeholder="Brief descriptive Alt label..."
                                                                            className="w-full bg-[#161616] border border-white/5 rounded-lg px-3 py-2 text-[10px] text-white font-bold placeholder:text-zinc-700"
                                                                            value={img.caption}
                                                                            onChange={(e) => {
                                                                                const newImages = [...helperImages];
                                                                                newImages[idx].caption = e.target.value;
                                                                                setHelperImages(newImages);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                {/* Action Buttons */}
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <button
                                                                        type="button"
                                                                        disabled={!isFilled}
                                                                        onClick={() => insertImageAtCursor(img.url, img.caption)}
                                                                        className="py-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 bg-zinc-900 border border-white/5 hover:bg-blue-600 hover:text-white hover:border-transparent disabled:opacity-30 disabled:hover:bg-zinc-900 disabled:hover:text-zinc-500 disabled:pointer-events-none text-zinc-400"
                                                                    >
                                                                        Insert 📍
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        disabled={!isFilled && !isConverting[idx]}
                                                                        onClick={() => {
                                                                            const newImages = [...helperImages];
                                                                            newImages[idx] = { url: '', caption: '' };
                                                                            setHelperImages(newImages);
                                                                        }}
                                                                        className="py-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 bg-zinc-900 border border-white/5 hover:bg-red-600/90 hover:text-white hover:border-transparent disabled:opacity-30 disabled:hover:bg-zinc-900 disabled:hover:text-zinc-500 disabled:pointer-events-none text-zinc-400"
                                                                    >
                                                                        Remove 🗑️
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                {/* Presets Grid */}
                                                <div className="pt-4 border-t border-white/5 space-y-3">
                                                    <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                                                        ✨ ABUQITMIRLABS Premium Curated Editorial Presets
                                                     </div>
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                                                        {[
                                                            { name: "Cybernetics", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80", caption: "High-End Cybernetic Abstract Visual" },
                                                            { name: "Architect", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", caption: "Timeless Minimalist Brutalist Concrete Structure" },
                                                            { name: "Timepiece", url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80", caption: "Precision Engineered High-End Chronometer Detail" },
                                                            { name: "Molten Gold", url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80", caption: "Premium Abstract Molten Golden Liquid Canvas" },
                                                            { name: "Workspace", url: "https://images.unsplash.com/photo-1555538995-7ccc83f60f40?auto=format&fit=crop&w=1200&q=80", caption: "Vaporwave Developer Console and Ergonomic Tech Station" },
                                                            { name: "Studio", url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80", caption: "Modern Open-Plan High-Contrast Architectural Studio" }
                                                        ].map((pre, pIdx) => (
                                                            <button
                                                                key={pIdx}
                                                                type="button"
                                                                onClick={() => {
                                                                    const newImages = [...helperImages];
                                                                    const emptyIndex = newImages.findIndex(i => i.url.trim() === '');
                                                                    const targetIdx = emptyIndex !== -1 ? emptyIndex : 0;
                                                                    
                                                                    newImages[targetIdx] = { url: pre.url, caption: pre.caption };
                                                                    setHelperImages(newImages);
                                                                }}
                                                                className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/50 hover:bg-white/10 text-left transition-all group"
                                                            >
                                                                <div className="aspect-video rounded-lg overflow-hidden mb-1">
                                                                    <img src={pre.url} alt={pre.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                                                </div>
                                                                <div className="text-[8px] font-black text-gray-400 uppercase truncate tracking-wider">{pre.name}</div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Hashtags - Bottom of Form */}
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Hashtags (Comma separated)</label>
                                                <input 
                                                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-700 text-blue-400 font-bold" 
                                                    placeholder="#AI, #Tech, #Innovation" 
                                                    type="text"
                                                    value={formData.tags}
                                                    onChange={e => setFormData({...formData, tags: e.target.value})}
                                                />
                                            </div>

                                            {/* Form Actions */}
                                            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row gap-6 items-center justify-between">
                                                <div className="flex items-center gap-3 text-zinc-600">
                                                    <Clock size={14} />
                                                    <p className="text-[10px] font-black uppercase tracking-widest">Autosave enabled</p>
                                                </div>
                                                <div className="flex gap-4 w-full md:w-auto">
                                                    <button 
                                                        type="button"
                                                        className="flex-1 md:flex-none px-10 py-5 rounded-2xl border border-white/10 hover:bg-white/5 font-black uppercase tracking-widest text-[10px] transition-all"
                                                    >
                                                        Save Draft
                                                    </button>
                                                    <button 
                                                        type="submit" 
                                                        disabled={isSubmitting}
                                                        className="flex-1 md:flex-none px-16 py-5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900/50 text-white font-black uppercase tracking-widest text-xs transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] active:scale-95 flex items-center justify-center gap-3"
                                                    >
                                                        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : null}
                                                        {isSubmitting ? 'Saving...' : (editingId ? 'Update Changes' : 'Publish Post Now')}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </motion.div>
                    ) : (
                        /* Post Listing */
                        <motion.div 
                            key="list"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {fetchingPosts ? (
                                <div className="text-center py-20 bg-white/5 rounded-3xl">
                                    <Loader2 className="animate-spin mx-auto text-blue-500 mb-4" size={32} />
                                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Synchronizing Post Database...</p>
                                </div>
                            ) : posts.length === 0 ? (
                                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
                                     <p className="text-[10px] font-black uppercase text-gray-600 tracking-[0.2em]">No Posts found in the system</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {posts.map(post => (
                                        <div key={post.id} className="bg-zinc-950/50 border border-white/5 hover:border-white/10 rounded-3xl p-6 transition-all group flex flex-col md:flex-row items-center gap-6">
                                            <div className="w-24 h-16 rounded-xl overflow-hidden shrink-0 bg-zinc-900 border border-white/5">
                                                <img src={post.coverImage} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" alt={`thumbnail for ${post.title}`} />
                                            </div>
                                            <div className="flex-1 text-center md:text-left">
                                                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                                    <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 uppercase tracking-widest">{post.category}</span>
                                                    <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{post.slug}</span>
                                                </div>
                                                <h3 className="text-lg font-black text-white uppercase tracking-tight line-clamp-1">{post.title}</h3>
                                            </div>
                                            <div className="flex gap-3">
                                                <Link 
                                                    to={`/blog/${post.slug}`} 
                                                    target="_blank"
                                                    className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 flex items-center justify-center transition-all"
                                                >
                                                    <ExternalLink size={18} />
                                                </Link>
                                                <button 
                                                    onClick={() => handleEdit(post)}
                                                    className="w-12 h-12 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white flex items-center justify-center transition-all"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(post.id)}
                                                    className="w-12 h-12 rounded-xl bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white flex items-center justify-center transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            ) : (
                    <AnimatePresence mode="wait">
                        {newsActiveTab === 'create' ? (
                                <motion.div
                                    key="news-form"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <AnimatePresence>
                                        {status && (
                                            <motion.div 
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className={`p-5 rounded-2xl mb-8 flex items-center gap-3 font-bold uppercase tracking-widest text-[10px] ${
                                                    status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_20px_rgba(239,44,44,0.1)]'
                                                }`}
                                            >
                                                {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                                                {status.message}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <form onSubmit={handleNewsSubmit} className="space-y-8">
                                        {/* News Type & Category */}
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                            <div className="md:col-span-6 space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">News Type / Page Target</label>
                                                <select 
                                                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-white font-bold appearance-none cursor-pointer"
                                                    value={newsFormData.type}
                                                    onChange={e => {
                                                        const val = e.target.value;
                                                        setNewsFormData({
                                                            ...newsFormData, 
                                                            type: val,
                                                            slug: val === 'latest' ? '/news/latest' : val === 'press-releases' ? '/news/press-releases' : val === 'industry-insights' ? '/news/industry-insights' : '/news/all'
                                                        });
                                                    }}
                                                >
                                                    <option value="latest">Latest News (├── Latest News)</option>
                                                    <option value="press-releases">Press Releases (├── Press Releases)</option>
                                                    <option value="industry-insights">Industry Insights (├── Industry Insights)</option>
                                                    <option value="all">All News (├── All News)</option>
                                                </select>
                                            </div>
                                            <div className="md:col-span-6 space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Category Tag</label>
                                                <input 
                                                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-700 text-white font-bold"
                                                    placeholder="Product Launch, AI Benchmark, Company News, etc."
                                                    type="text"
                                                    required
                                                    value={newsFormData.category}
                                                    onChange={e => setNewsFormData({...newsFormData, category: e.target.value})}
                                                />
                                            </div>
                                        </div>

                                        {/* Article Title */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 flex justify-between">
                                                News Headline / Title
                                                <span className="text-blue-500/50">Required</span>
                                            </label>
                                            <input 
                                                className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-700 text-white font-bold" 
                                                placeholder="AbuQitmirLabs Announces New AI Framework..." 
                                                type="text"
                                                required
                                                value={newsFormData.title}
                                                onChange={e => {
                                                    const newTitle = e.target.value;
                                                    setNewsFormData(prev => ({
                                                        ...prev,
                                                        title: newTitle,
                                                        slug: prev.slug.split('#')[0] + (newTitle ? `#${generateSlug(newTitle)}` : '')
                                                    }));
                                                }}
                                            />
                                        </div>

                                        {/* Meta Fields: Date, Location, Read Time, Author */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Date</label>
                                                <input 
                                                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-5 py-4 text-xs font-mono text-white" 
                                                    type="text"
                                                    value={newsFormData.date}
                                                    onChange={e => setNewsFormData({...newsFormData, date: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Location</label>
                                                <input 
                                                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-5 py-4 text-xs font-mono text-white" 
                                                    type="text"
                                                    value={newsFormData.location}
                                                    onChange={e => setNewsFormData({...newsFormData, location: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Read Time</label>
                                                <input 
                                                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-5 py-4 text-xs font-mono text-white" 
                                                    type="text"
                                                    value={newsFormData.readTime}
                                                    onChange={e => setNewsFormData({...newsFormData, readTime: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Author</label>
                                                <input 
                                                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-5 py-4 text-xs font-mono text-white" 
                                                    type="text"
                                                    value={newsFormData.author}
                                                    onChange={e => setNewsFormData({...newsFormData, author: e.target.value})}
                                                />
                                            </div>
                                        </div>

                                        {/* Excerpt */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Excerpt / Brief Summary</label>
                                            <textarea 
                                                className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-700 resize-none text-white leading-relaxed" 
                                                placeholder="Enter a concise summary of this news release or insight..." 
                                                rows={3}
                                                required
                                                value={newsFormData.excerpt}
                                                onChange={e => setNewsFormData({...newsFormData, excerpt: e.target.value})}
                                            ></textarea>
                                        </div>

                                        {/* Full Article Content */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 flex justify-between">
                                                Full Article Content
                                                <span className="text-gray-600 font-mono">Supports Markdown & HTML</span>
                                            </label>
                                            <textarea 
                                                className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-700 font-mono text-sm resize-y min-h-[220px] text-white leading-relaxed" 
                                                placeholder="Full detailed story, press statements, technical metrics, and analysis..." 
                                                rows={10}
                                                required
                                                value={newsFormData.content}
                                                onChange={e => setNewsFormData({...newsFormData, content: e.target.value})}
                                            ></textarea>
                                        </div>

                                        {/* Form Actions */}
                                        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row gap-6 items-center justify-between">
                                            <button 
                                                type="button"
                                                onClick={() => {
                                                    setEditingNewsId(null);
                                                    setNewsActiveTab('list');
                                                }}
                                                className="px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/5 font-black uppercase tracking-widest text-[10px] transition-all text-gray-400"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                type="submit" 
                                                disabled={isSubmitting}
                                                className="w-full md:w-auto px-16 py-5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900/50 text-white font-black uppercase tracking-widest text-xs transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] active:scale-95 flex items-center justify-center gap-3"
                                            >
                                                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : null}
                                                {isSubmitting ? 'Saving...' : (editingNewsId ? 'Update News Article' : 'Publish News Article')}
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            ) : (
                                /* News Listing */
                                <motion.div 
                                    key="news-list"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    {/* Header Filter Bar */}
                                    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-zinc-950/80 border border-white/5 rounded-2xl mb-6">
                                        <div className="flex items-center gap-2">
                                            <Filter className="w-4 h-4 text-blue-400" />
                                            <span className="text-xs font-mono uppercase text-gray-400">Filtering:</span>
                                            <span className="text-xs font-mono font-bold text-white uppercase bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
                                                {newsSubTab.replace('-', ' ')} ({filteredNewsItems.length})
                                            </span>
                                        </div>

                                        <button
                                            onClick={handleSeedNews}
                                            disabled={isSubmitting}
                                            className="px-4 py-2 rounded-xl bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600 hover:text-white text-blue-300 text-xs font-mono font-bold uppercase transition-all flex items-center gap-2"
                                        >
                                            <Sparkles className="w-3.5 h-3.5" />
                                            {isSubmitting ? 'Importing...' : 'Seed / Import Default News'}
                                        </button>
                                    </div>

                                    {fetchingNews ? (
                                        <div className="text-center py-20 bg-white/5 rounded-3xl">
                                            <Loader2 className="animate-spin mx-auto text-blue-500 mb-4" size={32} />
                                            <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Synchronizing News Database...</p>
                                        </div>
                                    ) : filteredNewsItems.length === 0 ? (
                                        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                                            <p className="text-xs font-mono uppercase text-gray-400 tracking-widest">No News Articles Found in "{newsSubTab}"</p>
                                            <p className="text-xs text-gray-500 max-w-md mx-auto">
                                                Click "New News Article" above or seed the database with default press releases and industry insights.
                                            </p>
                                            <button
                                                onClick={handleSeedNews}
                                                disabled={isSubmitting}
                                                className="px-6 py-3 rounded-xl bg-blue-600 text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-blue-500 transition-all shadow-lg inline-flex items-center gap-2"
                                            >
                                                <Sparkles size={14} /> Import Default News Articles
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-4">
                                            {filteredNewsItems.map(item => (
                                                <div key={item.id} className="bg-zinc-950/50 border border-white/5 hover:border-blue-500/30 rounded-3xl p-6 transition-all group flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <span className={`text-[9px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                                                                item.type === 'latest' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                                                                item.type === 'press-releases' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                                                                item.type === 'industry-insights' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                                                                'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                            }`}>
                                                                {item.type || 'latest'}
                                                            </span>
                                                            <span className="text-[9px] font-mono text-gray-400">{item.category}</span>
                                                            <span className="text-[9px] font-mono text-gray-500">• {item.date}</span>
                                                        </div>
                                                        <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">{item.title}</h3>
                                                        <p className="text-gray-400 text-xs line-clamp-2 font-light">{item.excerpt}</p>
                                                    </div>
                                                    <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                                                        <Link 
                                                            to={item.type === 'latest' ? '/news/latest' : item.type === 'press-releases' ? '/news/press-releases' : item.type === 'industry-insights' ? '/news/industry-insights' : '/news/all'} 
                                                            target="_blank"
                                                            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all"
                                                            title="View Live Page"
                                                        >
                                                            <ExternalLink size={16} />
                                                        </Link>
                                                        <button 
                                                            onClick={() => handleNewsEdit(item)}
                                                            className="w-10 h-10 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white flex items-center justify-center transition-all"
                                                            title="Edit Article"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleNewsDelete(item.id)}
                                                            className="w-10 h-10 rounded-xl bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white flex items-center justify-center transition-all"
                                                            title="Delete Article"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                        </motion.div>
                    </section>
                </div>

                {/* Mobile Navigation Bar */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 px-8 py-4 flex justify-around items-center z-50">
                    <button className="flex flex-col items-center gap-1.5 text-blue-500">
                        <Plus size={24} />
                        <span className="text-[8px] font-black uppercase tracking-[0.2em]">New</span>
                    </button>
                    <button className="flex flex-col items-center gap-1.5 text-zinc-600">
                        <FileText size={24} />
                        <span className="text-[8px] font-black uppercase tracking-[0.2em]">Posts</span>
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="flex flex-col items-center gap-1.5 text-red-500/50"
                    >
                        <LogOut size={24} />
                        <span className="text-[8px] font-black uppercase tracking-[0.2em]">Exit</span>
                    </button>
                </nav>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-black">
            <Header />
            <div className="pt-32 pb-20 px-6">
                {renderContent()}
            </div>
            <Footer />
        </div>
    );
};

export default AdminDashboard;

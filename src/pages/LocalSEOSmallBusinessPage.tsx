import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
    CheckCircle2, 
    XCircle, 
    ShieldAlert, 
    ChevronDown, 
    ArrowRight, 
    MapPin, 
    Search, 
    Target, 
    Sparkles, 
    Clock, 
    DollarSign, 
    TrendingUp, 
    FileText, 
    Award,
    Star,
    Check,
    Zap,
    AlertTriangle,
    Layers,
    UserCheck,
    Wrench,
    Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function LocalSEOSmallBusinessPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            q: "Is local SEO worth it for a small business?",
            a: "Yes. Local SEO is typically the highest-ROI marketing channel available to a small business because it captures customers at the exact moment they're searching for a nearby solution. Unlike paid ads, the visibility you build compounds over time instead of disappearing when the budget runs out."
        },
        {
            q: "Can a small business do local SEO themselves?",
            a: "Small business owners can handle the basics themselves — claiming and completing a Google Business Profile, requesting reviews, and keeping name, address, and phone number consistent across directories. However, technical on-page work, structured citation building at scale, and schema markup implementation usually require professional support to execute correctly and consistently."
        },
        {
            q: "How much does affordable local SEO cost for a small business?",
            a: "Affordable local SEO for a single-location small business typically runs $500 to $1,000 per month, covering Google Business Profile optimisation, foundational citation building, and basic on-page localisation. This is the entry tier of the broader local SEO pricing spectrum, which can reach $3,000 to $5,000+ per month for multi-location enterprise campaigns."
        },
        {
            q: "What's the difference between cheap local SEO and affordable local SEO?",
            a: "Cheap local SEO usually means low-effort, templated work — spun citations, no measurement, no real strategy — sold at a rock-bottom price and prone to producing spammy citations that can actively harm rankings. Affordable local SEO means the same rigorous fundamentals used in larger campaigns, scoped down to fit a smaller budget and a single location, without cutting corners on quality."
        }
    ];

    const breadcrumbs = [
        { name: 'AbuQitmirLabs', to: '/' },
        { name: 'Local SEO Services', to: '/seo-mastery' },
        { name: 'Local SEO for Small Business', to: '/local-seo-for-small-business' }
    ];

    return (
        <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#ccff00] selection:text-black">
            {/* SEO Helmet */}
            <Helmet>
                <title>Local SEO for Small Business | Affordable Plans | AbuQitmirLabs</title>
                <meta 
                    name="description" 
                    content="Local SEO for small business owners who need real results on a real budget. Affordable local SEO packages, a step-by-step action plan, and honest DIY-vs-hire guidance." 
                />
                <link rel="canonical" href="https://www.abuqitmirlabs.tech/local-seo-for-small-business" />
                <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.abuqitmirlabs.tech/local-seo-for-small-business" />
                <meta property="og:title" content="Local SEO for Small Business | AbuQitmirLabs" />
                <meta property="og:description" content="Local SEO for small business owners who need real results on a real budget. Affordable local SEO packages, a step-by-step action plan, and honest DIY-vs-hire guidance." />
                <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />
                <meta property="og:site_name" content="AbuQitmirLabs" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@AbuQitmir" />
                <meta name="twitter:title" content="Local SEO for Small Business | AbuQitmirLabs" />
                <meta name="twitter:description" content="Local SEO for small business owners who need real results on a real budget. Affordable local SEO packages, a step-by-step action plan, and honest DIY-vs-hire guidance." />
                <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

                {/* JSON-LD Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "Organization",
                                "@id": "https://www.abuqitmirlabs.tech/#organization",
                                "name": "AbuQitmirLabs .TECH",
                                "description": "Empowering businesses through advanced digital engineering — custom software, AI agents, web development, and local SEO services.",
                                "url": "https://www.abuqitmirlabs.tech",
                                "logo": "https://www.abuqitmirlabs.tech/logo.png",
                                "foundingDate": "2020",
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": "Karachi",
                                    "addressCountry": "PK"
                                },
                                "contactPoint": {
                                    "@type": "ContactPoint",
                                    "telephone": "+92-323-3260859",
                                    "contactType": "sales",
                                    "availableLanguage": ["English", "Urdu"]
                                },
                                "sameAs": [
                                    "https://twitter.com/AbuQitmir",
                                    "https://www.linkedin.com/company/abuqitmirlabs",
                                    "https://www.facebook.com/abuqitmirlabs"
                                ]
                            },
                            {
                                "@type": "WebPage",
                                "@id": "https://www.abuqitmirlabs.tech/local-seo-for-small-business#webpage",
                                "url": "https://www.abuqitmirlabs.tech/local-seo-for-small-business",
                                "name": "Local SEO for Small Business | Affordable Plans | AbuQitmirLabs",
                                "description": "Local SEO for small business owners who need real results on a real budget. Affordable local SEO packages, a step-by-step action plan, and honest DIY-vs-hire guidance.",
                                "inLanguage": "en-US",
                                "isPartOf": {
                                    "@id": "https://www.abuqitmirlabs.tech/#website"
                                },
                                "about": {
                                    "@id": "https://www.abuqitmirlabs.tech/local-seo-for-small-business#service"
                                },
                                "primaryImageOfPage": {
                                    "@type": "ImageObject",
                                    "url": "https://www.abuqitmirlabs.tech/logo.png",
                                    "width": "1200",
                                    "height": "630"
                                },
                                "breadcrumb": {
                                    "@id": "https://www.abuqitmirlabs.tech/local-seo-for-small-business#breadcrumb"
                                },
                                "potentialAction": [
                                    {
                                        "@type": "ReadAction",
                                        "target": "https://www.abuqitmirlabs.tech/local-seo-for-small-business"
                                    }
                                ]
                            },
                            {
                                "@type": "Service",
                                "@id": "https://www.abuqitmirlabs.tech/local-seo-for-small-business#service",
                                "name": "Local SEO for Small Business",
                                "description": "Affordable local SEO services built specifically for small business budgets — Google Business Profile setup, foundational citations, and starter keyword targeting without enterprise-level retainers.",
                                "provider": {
                                    "@id": "https://www.abuqitmirlabs.tech/#organization"
                                },
                                "areaServed": ["US", "GB", "PK", "CA", "PL", "AU"],
                                "serviceType": "Local Search Engine Optimisation for Small Business",
                                "offers": {
                                    "@type": "Offer",
                                    "name": "Small Business Local SEO Starter Package",
                                    "description": "Entry-level local SEO package for single-location small businesses — GBP optimisation, foundational citations, NAP audit, and monthly reporting.",
                                    "priceSpecification": {
                                        "@type": "PriceSpecification",
                                        "minPrice": "500",
                                        "maxPrice": "1000",
                                        "priceCurrency": "USD",
                                        "unitText": "MONTH"
                                    }
                                },
                                "audience": {
                                    "@type": "BusinessAudience",
                                    "name": "Small Business Owners"
                                },
                                "serviceAudience": {
                                    "@type": "Audience",
                                    "name": "Single-location small businesses"
                                }
                            },
                            {
                                "@type": "FAQPage",
                                "@id": "https://www.abuqitmirlabs.tech/local-seo-for-small-business#faq",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": "Is local SEO worth it for a small business?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes. Local SEO is typically the highest-ROI marketing channel available to a small business because it captures customers at the exact moment they're searching for a nearby solution. Unlike paid ads, the visibility you build compounds over time instead of disappearing when the budget runs out."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Can a small business do local SEO themselves?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Small business owners can handle the basics themselves — claiming and completing a Google Business Profile, requesting reviews, and keeping name, address, and phone number consistent across directories. However, technical on-page work, structured citation building at scale, and schema markup implementation usually require professional support to execute correctly and consistently."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "How much does affordable local SEO cost for a small business?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Affordable local SEO for a single-location small business typically runs $500 to $1,000 per month, covering Google Business Profile optimisation, foundational citation building, and basic on-page localisation. This is the entry tier of the broader local SEO pricing spectrum, which can reach $3,000 to $5,000+ per month for multi-location enterprise campaigns."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "What's the difference between cheap local SEO and affordable local SEO?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Cheap local SEO usually means low-effort, templated work — spun citations, no measurement, no real strategy — sold at a rock-bottom price and prone to producing spammy citations that can actively harm rankings. Affordable local SEO means the same rigorous fundamentals used in larger campaigns, scoped down to fit a smaller budget and a single location, without cutting corners on quality."
                                        }
                                    }
                                ]
                            },
                            {
                                "@type": "BreadcrumbList",
                                "@id": "https://www.abuqitmirlabs.tech/local-seo-for-small-business#breadcrumb",
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
                                        "name": "Local SEO Services",
                                        "item": "https://www.abuqitmirlabs.tech/local-seo-services"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 3,
                                        "name": "Local SEO for Small Business",
                                        "item": "https://www.abuqitmirlabs.tech/local-seo-for-small-business"
                                    }
                                ]
                            },
                            {
                                "@type": "WebSite",
                                "@id": "https://www.abuqitmirlabs.tech/#website",
                                "url": "https://www.abuqitmirlabs.tech",
                                "name": "AbuQitmirLabs .TECH",
                                "description": "Custom software, AI agents, web development, and local SEO services. 410+ projects completed. 350+ clients. 3x faster ROI.",
                                "inLanguage": "en-US",
                                "publisher": {
                                    "@id": "https://www.abuqitmirlabs.tech/#organization"
                                },
                                "potentialAction": {
                                    "@type": "SearchAction",
                                    "target": "https://www.abuqitmirlabs.tech/search?q={search_term_string}",
                                    "query-input": "required name=search_term_string"
                                }
                            }
                        ]
                    })}
                </script>
            </Helmet>

            <Header />

            {/* Breadcrumbs */}
            <div className="pt-28 md:pt-32">
                <Breadcrumbs customItems={breadcrumbs} />
            </div>

            {/* HERO SECTION */}
            <section className="relative pt-12 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden">
                {/* Background Ambient Glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#ccff00]/10 blur-[140px] pointer-events-none rounded-full" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ccff00]/30 bg-[#ccff00]/5 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
                        ABUQITMIRLABS .TECH — LOCAL SEO FOR SMALL BUSINESS
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight text-white leading-[1.1] mb-8"
                    >
                        Local SEO for the Business That Can't Afford to <em className="text-[#ccff00] not-italic underline decoration-[#ccff00]/40 underline-offset-8">Waste a Dollar</em>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10"
                    >
                        No enterprise retainers. No 12-month lock-ins. Just the fundamentals that get a single-location business found by the customers already searching nearby.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        <Link
                            to="/contact"
                            className="w-full sm:w-auto px-8 py-4 bg-[#ccff00] text-black font-semibold rounded-xl hover:bg-[#b8e600] transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.2)] group"
                        >
                            Get Your Starter Plan
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/seo-mastery"
                            className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-white/10 text-white font-medium rounded-xl hover:bg-zinc-800 hover:border-white/20 transition-all flex items-center justify-center gap-2"
                        >
                            See All Local SEO Services
                        </Link>
                    </motion.div>

                    {/* Quick Metric Ticker Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md"
                    >
                        <div className="p-3 border-r border-white/5 last:border-0">
                            <div className="text-[#ccff00] font-mono text-xl md:text-2xl font-bold">100%</div>
                            <div className="text-zinc-400 text-xs mt-1 uppercase tracking-wider font-mono">Single Location Focus</div>
                        </div>
                        <div className="p-3 border-r border-white/5 last:border-0">
                            <div className="text-white font-mono text-xl md:text-2xl font-bold">$500 - $1,000</div>
                            <div className="text-zinc-400 text-xs mt-1 uppercase tracking-wider font-mono">Monthly Starter Tier</div>
                        </div>
                        <div className="p-3 border-r border-white/5 last:border-0">
                            <div className="text-[#ccff00] font-mono text-xl md:text-2xl font-bold">Zero</div>
                            <div className="text-zinc-400 text-xs mt-1 uppercase tracking-wider font-mono">Lock-in Retainers</div>
                        </div>
                        <div className="p-3">
                            <div className="text-white font-mono text-xl md:text-2xl font-bold">Google Maps</div>
                            <div className="text-zinc-400 text-xs mt-1 uppercase tracking-wider font-mono">Pack Dominance</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* NEO-BRUTALIST LOCAL SEO MARQUEE */}
            <div className="overflow-hidden transform z-20 bg-[#B9FF66] w-full border-y-4 border-black py-4 relative shadow-[0_8px_0_0_rgba(0,0,0,1)] -rotate-1 my-10">
                <div className="flex whitespace-nowrap w-max animate-marquee">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex gap-10 text-2xl md:text-4xl font-black tracking-tighter uppercase items-center text-black px-10">
                            {[
                                "Google Maps Pack Optimization",
                                "Local Search Visibility & Rankings",
                                "GBP Profile Audit & Setup",
                                "Strict NAP Citation Uniformity",
                                "Localized On-Page Keywords",
                                "Systematized Customer Reviews",
                                "High-Intent Local Customer Calls"
                            ].map((item, idx) => (
                                <React.Fragment key={idx}>
                                    <span>{item}</span>
                                    <Star className="fill-current text-black shrink-0" size={28} />
                                </React.Fragment>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* SECTION 1: THE SMALL BUSINESS REALITY */}
            <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">THE SMALL BUSINESS REALITY</span>
                        <h2 className="text-3xl md:text-5xl font-display font-medium text-white mt-3">
                            Why Small Business SEO Needs a Different Playbook
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="mb-6 w-14 h-14 bg-[#ccff00]/30 border-4 border-black rounded-xl flex items-center justify-center text-black shadow-[4px_4px_0px_#000]">
                                    <Target className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">
                                    No Enterprise Bloat
                                </h3>
                                <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-4 font-bold">
                                    FOCUSED & EFFICIENT SEO
                                </span>
                                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                    Most local SEO advice online is written for agencies pitching six-figure enterprise contracts. That advice doesn't fit a business with one location, one phone number, and a budget measured in hundreds of dollars — not thousands. Local business SEO at this scale is a sharper, more focused discipline.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="mb-6 w-14 h-14 bg-[#ccff00]/30 border-4 border-black rounded-xl flex items-center justify-center text-black shadow-[4px_4px_0px_#000]">
                                    <Award className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">
                                    Outsmart Franchises
                                </h3>
                                <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-4 font-bold">
                                    LOCAL RELEVANCE WINS
                                </span>
                                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                    A small, well-run business often out-competes a franchise in local search because Google rewards consistency, real reviews, and genuine local relevance over sheer marketing spend. A single-location bakery with an accurate Google Business Profile and 40 honest reviews frequently outranks a national chain.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="mb-6 w-14 h-14 bg-[#ccff00]/30 border-4 border-black rounded-xl flex items-center justify-center text-black shadow-[4px_4px_0px_#000]">
                                    <TrendingUp className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">
                                    Direct Revenue Focus
                                </h3>
                                <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-4 font-bold">
                                    MEASURABLE FOOT TRAFFIC
                                </span>
                                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                    At AbuQitmirLabs, our approach to SEO for local business strips away anything that doesn't directly move a small operator toward more calls, more bookings, or more foot traffic — and we say so plainly when a tactic isn't worth your budget yet.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: DIY VS PROFESSIONAL COMPARISON MATRIX */}
            <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/10 bg-zinc-950/50">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">DO IT YOURSELF OR HIRE?</span>
                        <h2 className="text-3xl md:text-5xl font-display font-medium text-white mt-3 mb-4">
                            What You Can Handle Alone — and What Needs a Professional
                        </h2>
                        <p className="text-zinc-400 text-base max-w-2xl mx-auto">
                            Not every small business needs to hire a local SEO company on day one. Some fundamentals are well within reach for an owner with an hour a week. Others require technical depth that's genuinely hard to DIY correctly.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* DIY Column */}
                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b-4 border-black">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-100 border-4 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_#000]">
                                        <UserCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black uppercase tracking-tight text-black">You Can Do This Yourself</h3>
                                        <p className="text-[10px] text-[#ff0099] font-mono uppercase font-bold">Estimated time: ~1 hour / week</p>
                                    </div>
                                </div>

                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 font-bold" />
                                        <span className="text-xs md:text-sm text-zinc-900 font-bold">Claiming and filling out your Google Business Profile completely.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 font-bold" />
                                        <span className="text-xs md:text-sm text-zinc-900 font-bold">Asking happy customers for reviews after every job or visit.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 font-bold" />
                                        <span className="text-xs md:text-sm text-zinc-900 font-bold">Posting photos and updates to your GBP listing monthly.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 font-bold" />
                                        <span className="text-xs md:text-sm text-zinc-900 font-bold">Responding to every review, good or bad, within a few days.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* PRO Column */}
                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b-4 border-black">
                                    <div className="w-12 h-12 rounded-xl bg-[#ccff00] border-4 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_#000]">
                                        <Wrench className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black uppercase tracking-tight text-black">Usually Needs a Professional</h3>
                                        <p className="text-[10px] text-[#ff0099] font-mono uppercase font-bold">AbuQitmirLabs Core Speciality</p>
                                    </div>
                                </div>

                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <Zap className="w-5 h-5 text-black shrink-0 mt-0.5 font-bold fill-black" />
                                        <span className="text-xs md:text-sm text-zinc-900 font-bold">Structured citation building across dozens of directories with strict NAP consistency.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Zap className="w-5 h-5 text-black shrink-0 mt-0.5 font-bold fill-black" />
                                        <span className="text-xs md:text-sm text-zinc-900 font-bold">Schema markup (<code className="bg-zinc-200 text-black px-1.5 py-0.5 rounded font-mono text-xs font-black">LocalBusiness</code>, <code className="bg-zinc-200 text-black px-1.5 py-0.5 rounded font-mono text-xs font-black">FAQPage</code>) implemented in site code.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Zap className="w-5 h-5 text-black shrink-0 mt-0.5 font-bold fill-black" />
                                        <span className="text-xs md:text-sm text-zinc-900 font-bold">On-page technical fixes — page speed, mobile usability, crawl errors & CWV.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Zap className="w-5 h-5 text-black shrink-0 mt-0.5 font-bold fill-black" />
                                        <span className="text-xs md:text-sm text-zinc-900 font-bold">Ongoing local keyword research and content aligned to real buyer search demand.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 p-6 rounded-2xl bg-white border-4 border-black shadow-[6px_6px_0px_#000] text-center">
                        <p className="text-xs md:text-sm font-bold text-black">
                            If your business is entirely in the left column and you're still not showing up in the map pack, that's usually a sign the right column is the missing piece — not a sign to spend more time on tasks you've already covered.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 3: THE BUDGET-AWARE ACTION PLAN */}
            <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">THE BUDGET-AWARE ACTION PLAN</span>
                        <h2 className="text-3xl md:text-5xl font-display font-medium text-white mt-3 mb-4">
                            A Realistic First 90 Days on a Small Business Budget
                        </h2>
                        <p className="text-zinc-400 text-base max-w-2xl mx-auto">
                            This is the order we'd actually tackle things in if we were starting from zero with a single location and a modest monthly budget — not a wish list, a sequence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl font-black font-mono text-black">01</span>
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#ccff00] text-black border-2 border-black">$0 — DIY</span>
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">Fix your Google Business Profile completely</h3>
                                <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-3 font-bold">STEP 01 — ZERO COST ACTION</span>
                                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                    Correct category selection, complete service list, accurate hours, and real photos. This single step recovers more visibility than almost anything else on this list — and it costs nothing but time.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl font-black font-mono text-black">02</span>
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-200 text-black border-2 border-black">$0–$150 one-time</span>
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">Audit and fix your NAP consistency</h3>
                                <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-3 font-bold">STEP 02 — AUDIT & CORRECT</span>
                                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                    Search your business name and check that your name, address, and phone number match exactly across your website, Facebook, and directory listings. Inconsistencies actively confuse Google's local ranking algorithm.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl font-black font-mono text-black">03</span>
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-200 text-black border-2 border-black">$150–$400 one-time</span>
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">Build foundational citations</h3>
                                <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-3 font-bold">STEP 03 — CITATION BUILDING</span>
                                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                    Get listed accurately on the directories that matter most for your industry and country, not all two hundred that exist. Quality over volume prevents the "spammy citation" problem that cheap SEO providers create.
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl font-black font-mono text-black">04</span>
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-200 text-black border-2 border-black">$300–$600 one-time</span>
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">Localise your website's on-page content</h3>
                                <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-3 font-bold">STEP 04 — ON-PAGE OPTIMISATION</span>
                                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                    Update title tags, meta descriptions, and your homepage copy to include your city and service area naturally — not stuffed, just accurately reflecting where you actually work.
                                </p>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl font-black font-mono text-black">05</span>
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#ccff00] text-black border-2 border-black">$0 — DIY</span>
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">Systematise review requests</h3>
                                <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-3 font-bold">STEP 05 — REVIEW VELOCITY</span>
                                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                    Build a simple habit — a text template, a QR code on the receipt, a follow-up email — that asks satisfied customers for a review every single time. Review velocity is a compounding ranking signal.
                                </p>
                            </div>
                        </div>

                        {/* Step 6 */}
                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl font-black font-mono text-black">06</span>
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#ff0099] text-white border-2 border-black">$300–$700/mo ongoing</span>
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">Monitor and adjust monthly</h3>
                                <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-3 font-bold">STEP 06 — CONTINUOUS GROWTH</span>
                                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                    Once the fundamentals are in place, a lightweight monthly check on rankings, new review sentiment, and citation health keeps things from quietly drifting backward.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: THE MISTAKES THAT WASTE BUDGET */}
            <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/10 bg-zinc-950/40">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-xs font-mono uppercase tracking-widest text-red-400">AVOID THESE</span>
                        <h2 className="text-3xl md:text-5xl font-display font-medium text-white mt-3 mb-4">
                            The Mistakes That Waste a Small Business's SEO Budget
                        </h2>
                        <p className="text-zinc-400 text-base max-w-2xl mx-auto">
                            We've inherited enough small business accounts from previous providers to recognise the same handful of mistakes repeatedly. Avoiding these alone often outperforms hiring anyone at all.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 relative">
                            <span className="inline-block px-3 py-1 rounded bg-red-100 text-red-700 border-2 border-black text-[10px] font-mono uppercase tracking-widest font-black mb-4">
                                COST TRAP
                            </span>
                            <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">Chasing the cheapest possible SEO</h3>
                            <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-3 font-bold">MISTAKE #1 — CHEAP CITATION SPAM</span>
                            <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                Rock-bottom "cheap local seo" offers often rely on mass-produced, low-quality citations that can trigger spam flags rather than rankings — undoing months of legitimate progress.
                            </p>
                        </div>

                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 relative">
                            <span className="inline-block px-3 py-1 rounded bg-red-100 text-red-700 border-2 border-black text-[10px] font-mono uppercase tracking-widest font-black mb-4">
                                CATEGORY ERROR
                            </span>
                            <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">Wrong or too-broad GBP category</h3>
                            <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-3 font-bold">MISTAKE #2 — WRONG CATEGORY</span>
                            <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                Choosing "Business Services" instead of your specific trade category is one of the most common — and easiest to fix — reasons a small business fails to appear in relevant local searches.
                            </p>
                        </div>

                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 relative">
                            <span className="inline-block px-3 py-1 rounded bg-red-100 text-red-700 border-2 border-black text-[10px] font-mono uppercase tracking-widest font-black mb-4">
                                NEGLECT
                            </span>
                            <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">Setting up a GBP listing and abandoning it</h3>
                            <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-3 font-bold">MISTAKE #3 — INACTIVE PROFILE</span>
                            <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                A profile with no updates, no new photos, and no responses to reviews for a year signals inactivity to both customers and Google's ranking systems.
                            </p>
                        </div>

                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 relative">
                            <span className="inline-block px-3 py-1 rounded bg-red-100 text-red-700 border-2 border-black text-[10px] font-mono uppercase tracking-widest font-black mb-4">
                                INCONSISTENCY
                            </span>
                            <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">Letting NAP details drift over time</h3>
                            <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-3 font-bold">MISTAKE #4 — UNMATCHED NAP DETAILS</span>
                            <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                A phone number change or an office move that isn't updated everywhere creates conflicting signals that quietly erode rankings months later.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: HONEST PRICING */}
            <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/10">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">HONEST PRICING</span>
                    <h2 className="text-3xl md:text-5xl font-display font-medium text-white mt-3 mb-6">
                        What Affordable Actually Means Here
                    </h2>
                    <p className="text-zinc-300 text-base leading-relaxed max-w-3xl mx-auto mb-12">
                        "Affordable" gets used loosely in this industry. For a single-location small business, a properly scoped <strong className="text-white">local SEO package</strong> — covering GBP optimisation, foundational citations, NAP correction, and monthly reporting — realistically costs between $500 and $1,000 per month. That's the entry tier of local SEO pricing broadly, well below the $1,000–$2,500 mid-range campaigns built for multi-service businesses in competitive metro markets.
                    </p>

                    {/* Featured Price Card */}
                    <div className="p-8 md:p-12 bg-white border-4 border-black rounded-2xl shadow-[10px_10px_0px_#000] text-left relative overflow-hidden max-w-2xl mx-auto">
                        <div className="absolute top-0 right-0 bg-[#ccff00] text-black text-[10px] font-mono font-bold uppercase tracking-widest px-4 py-1.5 border-b-4 border-l-4 border-black">
                            STARTER PACKAGE
                        </div>

                        <div className="text-xs font-mono uppercase tracking-widest text-[#ff0099] font-bold mb-2">SMALL BUSINESS STARTER</div>
                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-4xl md:text-5xl font-black text-black font-mono">$500 – $1,000</span>
                            <span className="text-zinc-700 text-sm font-mono font-bold">/ month</span>
                        </div>

                        <p className="text-zinc-800 text-xs md:text-sm font-bold mb-8 leading-relaxed">
                            Google Business Profile optimisation, foundational citation building, NAP consistency audit, basic on-page localisation, and a monthly ranking snapshot — scoped for one location.
                        </p>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3 text-xs md:text-sm text-zinc-900 font-bold">
                                <CheckCircle2 className="w-5 h-5 text-black shrink-0 fill-[#ccff00]" />
                                <span>Complete Google Business Profile Setup & Audit</span>
                            </li>
                            <li className="flex items-center gap-3 text-xs md:text-sm text-zinc-900 font-bold">
                                <CheckCircle2 className="w-5 h-5 text-black shrink-0 fill-[#ccff00]" />
                                <span>Foundational Local Citation Building (Top Industry Directories)</span>
                            </li>
                            <li className="flex items-center gap-3 text-xs md:text-sm text-zinc-900 font-bold">
                                <CheckCircle2 className="w-5 h-5 text-black shrink-0 fill-[#ccff00]" />
                                <span>NAP (Name, Address, Phone) Uniformity Audit</span>
                            </li>
                            <li className="flex items-center gap-3 text-xs md:text-sm text-zinc-900 font-bold">
                                <CheckCircle2 className="w-5 h-5 text-black shrink-0 fill-[#ccff00]" />
                                <span>On-Page Local Keyword & Geo-Tagging Optimization</span>
                            </li>
                            <li className="flex items-center gap-3 text-xs md:text-sm text-zinc-900 font-bold">
                                <CheckCircle2 className="w-5 h-5 text-black shrink-0 fill-[#ccff00]" />
                                <span>Monthly Map Pack & Local Keyword Ranking Snapshot</span>
                            </li>
                        </ul>

                        <Link
                            to="/contact"
                            className="block w-full text-center py-4 bg-[#ccff00] text-black font-black uppercase tracking-wider rounded-xl border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                        >
                            Get a Tailored Quote
                        </Link>
                    </div>

                    <p className="mt-8 text-xs text-zinc-400">
                        Need more than one location, or operating in a genuinely competitive metro market? See the full breakdown of tiers on our{' '}
                        <Link to="/seo-mastery" className="text-[#ccff00] underline hover:text-white transition-colors font-bold">
                            Local SEO Services
                        </Link>{' '}
                        page, including mid-range and enterprise pricing.
                    </p>
                </div>
            </section>

            {/* SECTION 6: FAQS */}
            <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/10 bg-zinc-950/50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">COMMON QUESTIONS</span>
                        <h2 className="text-3xl md:text-5xl font-display font-medium text-white mt-3">
                            Local SEO for Small Business — FAQ
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className="rounded-2xl bg-zinc-900/80 border border-white/10 overflow-hidden transition-colors"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                                >
                                    <span className="text-base md:text-lg font-medium text-white">{faq.q}</span>
                                    <ChevronDown 
                                        className={`w-5 h-5 text-[#ccff00] shrink-0 transition-transform duration-300 ${
                                            openFaq === index ? 'rotate-180' : ''
                                        }`} 
                                    />
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 pt-0 text-sm md:text-base text-zinc-400 leading-relaxed border-t border-white/5 mt-2 pt-4">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 7: BOTTOM CTA */}
            <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto text-center border-t border-white/10 bg-gradient-to-b from-zinc-900 to-[#080808]">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white mb-6">
                        Let's Find Your Next Customer's Search
                    </h2>
                    <p className="text-zinc-400 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                        Tell us your location and your budget. We'll tell you honestly whether the starter package fits — or whether you don't need us yet.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-[#ccff00] text-black font-bold text-lg rounded-xl hover:bg-[#b8e600] transition-all shadow-[0_0_40px_rgba(204,255,0,0.25)] group"
                    >
                        Start the Conversation
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}

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
    Globe,
    Layers3,
    Database,
    ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function LocalSEOCitationBuildingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            q: "What is a local SEO citation?",
            a: "A local SEO citation is any online mention of a business's name, address, and phone number (NAP) — whether on a directory like Yelp or Google Business Profile, a local chamber of commerce page, or an industry-specific listing site. Citations help search engines verify that a business exists at a specific location, and consistent NAP data across multiple citations strengthens local ranking signals."
        },
        {
            q: "How many citations does a small business need?",
            a: "Quality matters more than quantity. A small business typically needs accurate listings on 20 to 40 high-authority directories — covering general platforms (Google, Bing Places, Apple Maps, Yelp) and industry-specific directories relevant to their niche. More citations with inconsistent NAP data actively hurts rankings."
        },
        {
            q: "How long does citation building take to affect local rankings?",
            a: "Citation data takes time to propagate across the web and be indexed by search engines. Most businesses see measurable local map-pack improvement 4 to 8 weeks after a thorough citation build and cleanup campaign, with the full effect building over 3 to 4 months as search engines process and validate the consistent signals."
        },
        {
            q: "Should I fix existing incorrect citations or just build new ones?",
            a: "Fix first, build second — always. Adding new correct citations on top of existing incorrect ones creates a split signal: some sources say one address, some say another. Search engines don't automatically resolve this in your favour. A proper citation audit and cleanup phase comes before any new listing work in our process."
        }
    ];

    return (
        <div className="min-h-screen bg-[#080808] text-white selection:bg-[#ccff00] selection:text-black font-sans antialiased">
            <Helmet>
                {/* ═══ Primary Meta Tags ═══ */}
                <title>Local SEO Citation Building Service | NAP Consistency | AbuQitmirLabs</title>
                <meta name="description" content="Professional local SEO citation building — NAP-consistent listings across tier-1 and niche directories, citation audits, duplicate removal, and ongoing citation management." />
                <link rel="canonical" href="https://www.abuqitmirlabs.tech/local-seo-citation-building" />
                <meta name="keywords" content="local SEO citation building, NAP consistency, citation management, local citations, citation cleanup, local directory listings, small business citations" />
                <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
                
                {/* ═══ Open Graph (Facebook / LinkedIn) ═══ */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.abuqitmirlabs.tech/local-seo-citation-building" />
                <meta property="og:title" content="Local SEO Citation Building | AbuQitmirLabs" />
                <meta property="og:description" content="Structured local citation building and NAP management — the foundational off-page signal that powers local map-pack rankings." />
                <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="AbuQitmirLabs" />

                {/* ═══ Twitter Card ═══ */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@AbuQitmir" />
                <meta name="twitter:title" content="Local SEO Citation Building | AbuQitmirLabs" />
                <meta name="twitter:description" content="Structured local citation building and NAP management — the foundation of local map-pack rankings." />
                <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

                {/* ═══ Structured Data / JSON-LD ═══ */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "Organization",
                                "@id": "https://www.abuqitmirlabs.tech/#organization",
                                "name": "AbuQitmirLabs .TECH",
                                "url": "https://www.abuqitmirlabs.tech",
                                "logo": "https://www.abuqitmirlabs.tech/logo.png"
                            },
                            {
                                "@type": "WebPage",
                                "@id": "https://www.abuqitmirlabs.tech/local-seo-citation-building#webpage",
                                "url": "https://www.abuqitmirlabs.tech/local-seo-citation-building",
                                "name": "Local SEO Citation Building Service | NAP Consistency | AbuQitmirLabs",
                                "description": "Professional local SEO citation building — NAP-consistent listings across tier-1 and niche directories, citation audits, duplicate removal, and ongoing citation management.",
                                "inLanguage": "en-US",
                                "isPartOf": {
                                    "@id": "https://www.abuqitmirlabs.tech/#website"
                                },
                                "about": {
                                    "@id": "https://www.abuqitmirlabs.tech/local-seo-citation-building#service"
                                },
                                "breadcrumb": {
                                    "@id": "https://www.abuqitmirlabs.tech/local-seo-citation-building#breadcrumb"
                                }
                            },
                            {
                                "@type": "Service",
                                "@id": "https://www.abuqitmirlabs.tech/local-seo-citation-building#service",
                                "name": "Local SEO Citation Building",
                                "description": "Structured local citation building and NAP consistency management — tier-1 directory submissions, duplicate detection, citation audits, and ongoing citation health monitoring.",
                                "provider": {
                                    "@id": "https://www.abuqitmirlabs.tech/#organization"
                                },
                                "areaServed": ["US", "GB", "PK", "CA", "PL", "AU"],
                                "serviceType": "Local SEO Citation Building",
                                "offers": {
                                    "@type": "Offer",
                                    "name": "Local Citation Building Package",
                                    "description": "One-time or ongoing citation building — NAP-consistent listings across high-authority local directories with a full citation audit and duplicate removal.",
                                    "priceSpecification": {
                                        "@type": "PriceSpecification",
                                        "minPrice": "150",
                                        "maxPrice": "600",
                                        "priceCurrency": "USD",
                                        "unitText": "UNIT"
                                    }
                                }
                            },
                            {
                                "@type": "FAQPage",
                                "mainEntity": faqs.map(faq => ({
                                    "@type": "Question",
                                    "name": faq.q,
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": faq.a
                                    }
                                }))
                            },
                            {
                                "@type": "BreadcrumbList",
                                "@id": "https://www.abuqitmirlabs.tech/local-seo-citation-building#breadcrumb",
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
                                        "name": "Local SEO Citation Building",
                                        "item": "https://www.abuqitmirlabs.tech/local-seo-citation-building"
                                    }
                                ]
                            },
                            {
                                "@type": "WebSite",
                                "@id": "https://www.abuqitmirlabs.tech/#website",
                                "url": "https://www.abuqitmirlabs.tech",
                                "name": "AbuQitmirLabs .TECH",
                                "inLanguage": "en-US",
                                "publisher": {
                                    "@id": "https://www.abuqitmirlabs.tech/#organization"
                                }
                            }
                        ]
                    })}
                </script>
            </Helmet>

            <Header />

            <main className="pt-28 md:pt-36 relative">
                <Breadcrumbs customItems={[
                    { name: 'HQ', to: '/' },
                    { name: 'LOCAL SEO FOR SMALL BUSINESS', to: '/local-seo-for-small-business' },
                    { name: 'CITATION BUILDING' }
                ]} />

                {/* Hero Section */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto py-16 md:py-24 border-b border-white/10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-mono font-bold tracking-widest uppercase mb-6">
                            <Sparkles className="w-3.5 h-3.5" />
                            AbuQitmirLabs .TECH — Local SEO Citation Building
                        </div>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-medium tracking-tight text-white leading-[1.1] mb-8">
                            Citations Are the Foundation. <br />
                            <em className="text-[#ccff00] italic font-normal">Bad Ones Are the Problem.</em>
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-300 font-sans leading-relaxed mb-10 max-w-3xl">
                            NAP-consistent local citations across the directories that actually matter — no bulk spam, no duplicate chaos, no inconsistencies that quietly destroy map-pack rankings.
                        </p>
                        <div className="flex flex-wrap gap-4 items-center">
                            <Link 
                                to="/contact" 
                                className="px-8 py-4 bg-[#ccff00] text-black font-bold text-sm rounded-xl hover:bg-white transition-all brutalist-shadow flex items-center gap-2 uppercase tracking-wider"
                            >
                                Start a Citation Campaign
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link 
                                to="/local-seo-audit" 
                                className="px-8 py-4 bg-zinc-900 text-white font-bold text-sm border border-white/20 rounded-xl hover:bg-zinc-800 transition-all flex items-center gap-2 uppercase tracking-wider"
                            >
                                Get a Free Citation Audit First
                            </Link>
                        </div>
                    </div>
                </section>

                {/* NEO-BRUTALIST MARQUEE BANNER */}
                <div className="overflow-hidden transform z-20 bg-[#B9FF66] w-full border-y-4 border-black py-4 relative shadow-[0_8px_0_0_rgba(0,0,0,1)] -rotate-1 my-12">
                    <div className="flex whitespace-nowrap w-max animate-marquee">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex gap-10 text-3xl md:text-5xl font-black tracking-tighter uppercase items-center text-black px-10">
                                {[
                                    "NAP Consistency",
                                    "Tier-1 Directory Submissions",
                                    "Citation Audit & Cleanup",
                                    "Duplicate Listing Removal",
                                    "Google Business Profile Sync",
                                    "Local Authority Signals",
                                    "Continuous Citation Monitoring"
                                ].map((item, idx) => (
                                    <React.Fragment key={idx}>
                                        <span>{item}</span>
                                        <Star className="fill-current text-black" size={32} />
                                    </React.Fragment>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Neo-Brutalist Feature Cards Section */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto py-16">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="text-[#ccff00] text-xs font-mono font-bold tracking-widest uppercase block mb-2">
                            Core Citation Pillars
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif font-medium text-white">
                            Engineered Citation Framework
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "NAP CONSISTENCY AUDIT",
                                tagline: "ACCURATE NAME, ADDRESS & PHONE MATCHING",
                                icon: <Database className="w-8 h-8 text-[#ff0099]" />,
                                description: "Every single listing across Yelp, Bing, Apple Maps, and local registries must match your official business credentials to the letter. Inconsistencies destroy local pack trust."
                            },
                            {
                                title: "TIER-1 DIRECTORY SUBMISSIONS",
                                tagline: "HIGH-AUTHORITY TRUST SIGNALS",
                                icon: <Layers className="w-8 h-8 text-black" />,
                                description: "We manually claim and build citations on the top-tier directories with high domain authority, feeding search engine aggregators clean and authoritative location signals."
                            },
                            {
                                title: "DUPLICATE & DRIFT CLEANUP",
                                tagline: "ELIMINATE CONFUSING MAP SIGNALS",
                                icon: <ShieldCheck className="w-8 h-8 text-[#ff0099]" />,
                                description: "Old addresses, outdated phone numbers, and duplicate listings confuse Google's algorithms. We track down and permanently purge outdated listings."
                            }
                        ].map((card, idx) => (
                            <div
                                key={idx}
                                className="bg-white border-4 border-black p-8 rounded-2xl brutalist-shadow hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="mb-6 w-14 h-14 bg-[#ccff00]/20 border-4 border-black rounded-xl flex items-center justify-center">
                                        {card.icon}
                                    </div>
                                    <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">
                                        {card.title}
                                    </h3>
                                    <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-4 font-bold">
                                        {card.tagline}
                                    </span>
                                    <p className="text-xs leading-relaxed text-zinc-700 font-bold font-sans">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Citations Matter */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto py-20 border-b border-white/10">
                    <div className="grid md:grid-cols-12 gap-12 items-start">
                        <div className="md:col-span-5">
                            <span className="text-[#ccff00] text-xs font-mono font-bold tracking-widest uppercase block mb-3">
                                Why Citations Matter
                            </span>
                            <h2 className="text-3xl md:text-5xl font-serif font-medium text-white leading-tight mb-6">
                                What a Local SEO Citation Is — and Why Consistency Is Everything
                            </h2>
                        </div>
                        <div className="md:col-span-7 space-y-6 text-zinc-300 text-base md:text-lg leading-relaxed font-sans">
                            <p>
                                A <strong className="text-white font-semibold">local SEO citation</strong> is any online mention of your business's name, address, and phone number — collectively known as NAP. Every time a directory, mapping service, industry database, or local website lists your business's details, that's a citation. Google and other search engines treat a wide pattern of consistent NAP mentions as a trust signal that your business genuinely operates where it claims to.
                            </p>
                            <p>
                                The critical word is <em className="text-[#ccff00] not-italic font-medium">consistent</em>. A business listed as "AbuQitmirLabs Ltd" on one platform and "AbuQitmirLabs" on another, with a different phone number on a third, creates conflicting signals. Search engines resolve conflicting signals by reducing confidence in all of them — which often means the business drops in local ranking or fails to appear in the map pack at all.
                            </p>
                            <p>
                                Our <strong className="text-white font-semibold">local SEO citation building</strong> service starts from the premise that forty clean, verified, consistent citations outperform two hundred messy, duplicated, or partially incorrect ones. We don't use bulk submission tools that generate noise. Every listing is manually verified against a master NAP record before submission.
                            </p>
                        </div>
                    </div>

                    {/* Directory Tiers Table */}
                    <div className="mt-16 bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-10">
                        <h3 className="text-2xl font-serif font-medium text-white mb-6 flex items-center gap-3">
                            <Layers className="text-[#ccff00] w-6 h-6" />
                            Which Citations Actually Move Rankings
                        </h3>
                        <p className="text-zinc-400 text-sm md:text-base mb-8">
                            Not all directories carry equal weight. A listing on Google Business Profile, Apple Maps, Bing Places, and Yelp is worth more than twenty listings on low-authority aggregator sites nobody visits. Our citation strategy is built in tiers:
                        </p>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-zinc-900/80 border border-white/10 p-6 rounded-xl">
                                <div className="md:col-span-3 flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#ccff00]"></span>
                                    <span className="font-bold text-white uppercase text-xs tracking-wider">Tier 1 — Core</span>
                                </div>
                                <div className="md:col-span-4 text-zinc-200 text-sm font-medium">
                                    Google Business Profile, Apple Maps, Bing Places, Yelp, Facebook
                                </div>
                                <div className="md:col-span-5 text-zinc-400 text-sm">
                                    Direct ranking signals; indexed and weighted heavily by all major search engines
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-zinc-900/80 border border-white/10 p-6 rounded-xl">
                                <div className="md:col-span-3 flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
                                    <span className="font-bold text-white uppercase text-xs tracking-wider">Tier 2 — Authority</span>
                                </div>
                                <div className="md:col-span-4 text-zinc-200 text-sm font-medium">
                                    Yellow Pages, Foursquare, TripAdvisor, Trustpilot, industry-specific directories
                                </div>
                                <div className="md:col-span-5 text-zinc-400 text-sm">
                                    High-authority sites that feed data to aggregators and reinforce core signals
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-zinc-900/80 border border-white/10 p-6 rounded-xl">
                                <div className="md:col-span-3 flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-purple-400"></span>
                                    <span className="font-bold text-white uppercase text-xs tracking-wider">Tier 3 — Niche</span>
                                </div>
                                <div className="md:col-span-4 text-zinc-200 text-sm font-medium">
                                    Industry associations, local chambers of commerce, country-specific directories
                                </div>
                                <div className="md:col-span-5 text-zinc-400 text-sm">
                                    Category and geographic relevance signals; often the differentiator in competitive markets
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Process Section */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto py-20 border-b border-white/10">
                    <span className="text-[#ccff00] text-xs font-mono font-bold tracking-widest uppercase block mb-3">
                        Our Process
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-white leading-tight mb-12">
                        How We Build and Manage Your Citation Profile
                    </h2>

                    <div className="grid gap-6 md:grid-cols-1">
                        {[
                            { num: "1", title: "Master NAP record — the single source of truth", desc: "We establish your exact, correct NAP data at the start of every campaign — legal business name, precise address format, primary phone number, website URL. Every citation we build or correct references this master record exclusively." },
                            { num: "2", title: "Full citation audit — find every existing listing", desc: "We crawl major citation platforms and aggregators to locate every existing mention of your business. Each is categorised: correct, incorrect NAP, duplicate, or erroneous listing requiring removal. This audit is the baseline for all cleanup work." },
                            { num: "3", title: "Cleanup before build — fix before adding", desc: "Adding new citations on top of a dirty existing profile amplifies the confusion rather than resolving it. We correct and remove before we build — a step most volume-focused citation services skip entirely." },
                            { num: "4", title: "Structured build across all three tiers", desc: "New listings are created manually, one by one, with correct NAP data and complete profiles — business hours, categories, website URL, and photos where supported. We document every submission with a live verification link." },
                            { num: "5", title: "Ongoing monitoring and maintenance", desc: "Citations drift. Address changes, phone updates, and user-suggested edits on platforms like Google can corrupt a clean profile over time. Ongoing citation management catches and corrects these before they compound into a ranking problem." }
                        ].map((step, idx) => (
                            <div key={idx} className="flex gap-6 items-start bg-zinc-950 border border-white/10 p-6 md:p-8 rounded-2xl hover:border-[#ccff00]/40 transition-all">
                                <div className="w-12 h-12 rounded-full bg-[#ccff00] text-black font-serif font-bold text-xl flex items-center justify-center shrink-0">
                                    {step.num}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Warning Box */}
                    <div className="mt-12 bg-red-950/40 border border-red-500/30 rounded-2xl p-6 md:p-8 flex gap-5 items-start">
                        <AlertTriangle className="w-8 h-8 text-red-400 shrink-0 mt-1" />
                        <div>
                            <h3 className="text-lg font-bold text-red-200 mb-2">Why bulk citation tools create more problems than they solve</h3>
                            <p className="text-red-300/80 text-sm md:text-base leading-relaxed">
                                Automated mass-submission tools generate citations at scale — but without verifying that each directory accepted the data correctly, without checking for pre-existing duplicates, and without adjusting for platform-specific formatting requirements. The result is often dozens of partially correct or duplicate listings that take more effort to clean up than building correctly from scratch would have.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto py-20 border-b border-white/10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[#ccff00] text-xs font-mono font-bold tracking-widest uppercase block mb-3">
                            Pricing
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-6">
                            Citation Building — What It Costs
                        </h2>
                        <p className="text-zinc-400 text-base md:text-lg">
                            Citation work is priced as a one-time project (audit + build) or ongoing monthly management. Both options include a full citation audit report delivered at the start of every engagement.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-zinc-950 border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-bold font-mono text-zinc-500 uppercase tracking-widest block mb-4">Citation Audit</span>
                                <div className="text-4xl font-serif font-bold text-white mb-4">$150</div>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                    Full scan of existing citations, NAP inconsistencies identified, priority fix list delivered — no build included.
                                </p>
                            </div>
                            <Link to="/contact" className="w-full py-3 bg-zinc-900 border border-white/20 text-white font-bold text-xs uppercase text-center rounded-xl hover:bg-zinc-800 transition-all">
                                Order Audit
                            </Link>
                        </div>

                        <div className="bg-zinc-950 border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-bold font-mono text-[#ccff00] uppercase tracking-widest block mb-4">Starter Build</span>
                                <div className="text-4xl font-serif font-bold text-white mb-4">$300 – $450</div>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                    Audit + cleanup + 30–40 NAP-consistent listings across core and authority directories. Full verification report included.
                                </p>
                            </div>
                            <Link to="/contact" className="w-full py-3 bg-zinc-900 border border-white/20 text-white font-bold text-xs uppercase text-center rounded-xl hover:bg-zinc-800 transition-all">
                                Get Started
                            </Link>
                        </div>

                        <div className="bg-zinc-950 border-2 border-[#ccff00] p-8 rounded-2xl flex flex-col justify-between relative shadow-[0_0_30px_rgba(204,255,0,0.1)]">
                            <div className="absolute -top-3 right-6 bg-[#ccff00] text-black font-mono font-bold text-[10px] uppercase px-3 py-1 rounded-full">
                                Most Popular
                            </div>
                            <div>
                                <span className="text-xs font-bold font-mono text-[#ccff00] uppercase tracking-widest block mb-4">Full Build</span>
                                <div className="text-4xl font-serif font-bold text-white mb-4">$450 – $600</div>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                    Audit + cleanup + 50–70 listings across all three tiers including niche and country-specific directories.
                                </p>
                            </div>
                            <Link to="/contact" className="w-full py-3 bg-[#ccff00] text-black font-bold text-xs uppercase text-center rounded-xl hover:bg-white transition-all">
                                Select Full Build
                            </Link>
                        </div>

                        <div className="bg-zinc-950 border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-bold font-mono text-zinc-500 uppercase tracking-widest block mb-4">Ongoing Management</span>
                                <div className="text-4xl font-serif font-bold text-white mb-4">$150 – $250<span className="text-xs text-zinc-500 font-sans">/mo</span></div>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                    Monthly monitoring, correction of drifted citations, new platform submissions as relevant, and quarterly citation health report.
                                </p>
                            </div>
                            <Link to="/contact" className="w-full py-3 bg-zinc-900 border border-white/20 text-white font-bold text-xs uppercase text-center rounded-xl hover:bg-zinc-800 transition-all">
                                Subscribe Monthly
                            </Link>
                        </div>
                    </div>

                    <p className="text-zinc-400 text-center text-sm mt-10">
                        Citation building is typically bundled with a broader <Link to="/local-seo-for-small-business" className="text-[#ccff00] hover:underline">local SEO services</Link> engagement — it's included in every mid-range and enterprise local SEO package we run. Standalone citation projects are available for businesses that want to handle other SEO elements themselves.
                    </p>
                </section>

                {/* FAQ Section */}
                <section className="px-6 md:px-12 max-w-5xl mx-auto py-20 border-b border-white/10">
                    <span className="text-[#ccff00] text-xs font-mono font-bold tracking-widest uppercase block mb-3 text-center">
                        Common Questions
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-12 text-center">
                        Local SEO Citations — FAQ
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div 
                                key={idx} 
                                className="bg-zinc-950 border border-white/10 rounded-xl overflow-hidden transition-all"
                            >
                                <button 
                                    onClick={() => toggleFaq(idx)} 
                                    className="w-full text-left p-6 font-bold text-lg text-white flex justify-between items-center gap-4 hover:text-[#ccff00] transition-colors"
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-[#ccff00] transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {openFaq === idx && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-6 text-zinc-400 text-base leading-relaxed border-t border-white/5 pt-4"
                                        >
                                            {faq.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <section className="px-6 md:px-12 max-w-5xl mx-auto py-24 text-center">
                    <div className="bg-gradient-to-b from-zinc-900 to-black border-2 border-[#ccff00]/40 rounded-3xl p-10 md:p-16 relative overflow-hidden brutalist-shadow">
                        <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-6">
                            Start With a Citation Audit — Then Decide
                        </h2>
                        <p className="text-zinc-300 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                            We'll scan your existing citation profile, identify every inconsistency, and tell you exactly what needs fixing before any build work begins.
                        </p>
                        <Link 
                            to="/contact" 
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#ccff00] text-black font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-white transition-all brutalist-shadow"
                        >
                            Request Your Citation Audit
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

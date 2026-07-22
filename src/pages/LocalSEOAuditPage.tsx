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
    FileSearch,
    BarChart3,
    CheckSquare,
    HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function LocalSEOAuditPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            q: "What does a local SEO audit cover?",
            a: "A local SEO audit covers five core areas: Google Business Profile completeness and accuracy, citation consistency (NAP data across directories), on-page localisation signals (title tags, meta descriptions, schema markup), technical health (Core Web Vitals, mobile usability, crawl errors), and competitor analysis to identify what the top-ranking businesses in your area are doing that you are not."
        },
        {
            q: "Is the local SEO audit really free?",
            a: "The initial local SEO audit — covering GBP health, top citation platforms, and a basic on-page review — is provided free with no obligation. A full technical audit that includes deep citation scanning, schema validation, Core Web Vitals analysis, and a multi-competitor gap report is available as a paid engagement from $150, credited back if you start a campaign with us."
        },
        {
            q: "How long does a local SEO audit take?",
            a: "The initial free audit is typically completed within 2 to 3 business days of receiving your business details. A comprehensive paid audit with full citation scanning and competitor analysis takes 5 to 7 business days and is delivered as a structured PDF report with a prioritised action list."
        },
        {
            q: "Do I need to hire you after the audit?",
            a: "No. The audit report is yours regardless of what you decide next. Many clients use the free audit to understand the problem, then either fix it themselves, pass the report to an in-house team, or return to us for a campaign. There is no obligation attached to requesting an audit."
        }
    ];

    const auditAreas = [
        {
            num: "01",
            title: "Google Business Profile Analysis",
            desc: "Category accuracy, completeness score, service area configuration, attribute completeness, Q&A health, photo count, and posting activity — every GBP signal that influences map-pack eligibility."
        },
        {
            num: "02",
            title: "Citation Profile Review",
            desc: "We scan core directories and aggregators for NAP consistency. Every inconsistency, duplicate, and missing listing is documented with a correction priority rating."
        },
        {
            num: "03",
            title: "On-Page Local Signals",
            desc: "Title tags, meta descriptions, H1 structure, schema markup (LocalBusiness, FAQPage, BreadcrumbList), internal linking, and geographic language — all checked against what the top-ranking pages in your market are doing."
        },
        {
            num: "04",
            title: "Technical Health",
            desc: "Core Web Vitals, mobile usability, crawl errors, redirect chains, and page indexability — the technical factors that prevent even a well-optimised local page from ranking cleanly."
        },
        {
            num: "05",
            title: "Competitor Gap Analysis",
            desc: "We audit the top 3 map-pack positions for your primary keyword and document precisely what those businesses have that you don't — category choices, citation volume, review velocity, content depth."
        }
    ];

    const commonCauses = [
        {
            title: "Wrong primary GBP category",
            desc: "Google's algorithm gives significant weight to the primary category selected on a Google Business Profile. \"Professional Services\" doesn't tell Google you're a law firm. The correct, specific category is often the single highest-impact fix in an audit."
        },
        {
            title: "NAP inconsistency across directories",
            desc: "A business that has moved, changed its trading name, or updated its phone number will often have conflicting data across dozens of directories. Search engines interpret conflicting signals as reduced confidence in the listing's legitimacy."
        },
        {
            title: "No LocalBusiness schema on the website",
            desc: "Without structured data explicitly telling search engines the business's name, address, phone number, opening hours, and geographic coordinates, ranking signals rely entirely on unstructured text — a weaker signal in an increasingly semantic search landscape."
        },
        {
            title: "Stale or incomplete GBP listing",
            desc: "A profile with no posts in six months, stock photos instead of real business images, or missing service descriptions signals inactivity. Google favours actively maintained listings in competitive map-pack positions."
        },
        {
            title: "Review gap vs. competitors",
            desc: "If every business in the map pack has 80+ reviews and you have 12, review velocity is a direct ranking disadvantage — regardless of how good your other signals are. The audit quantifies exactly how large that gap is and what rate of acquisition would close it."
        }
    ];

    return (
        <div className="min-h-screen bg-[#080808] text-white selection:bg-[#ccff00] selection:text-black font-sans antialiased">
            <Helmet>
                {/* ═══ Primary Meta Tags ═══ */}
                <title>Free Local SEO Audit | Find Why You're Not Ranking | AbuQitmirLabs</title>
                <meta name="description" content="Free local SEO audit from AbuQitmirLabs — we analyse your Google Business Profile, citation profile, on-page signals, and map-pack competitors, then tell you exactly what's holding back your rankings." />
                <link rel="canonical" href="https://www.abuqitmirlabs.tech/local-seo-audit" />
                <meta name="keywords" content="local SEO audit, free local SEO audit, local SEO analysis, Google Business Profile audit, citation audit, map pack analysis, local SEO consultant" />
                <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
                
                {/* ═══ Open Graph (Facebook / LinkedIn) ═══ */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.abuqitmirlabs.tech/local-seo-audit" />
                <meta property="og:title" content="Free Local SEO Audit | AbuQitmirLabs" />
                <meta property="og:description" content="Find out exactly why your business isn't ranking in local search — and what to fix first. Free local SEO audit from AbuQitmirLabs." />
                <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="AbuQitmirLabs" />

                {/* ═══ Twitter Card ═══ */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@AbuQitmir" />
                <meta name="twitter:title" content="Free Local SEO Audit | AbuQitmirLabs" />
                <meta name="twitter:description" content="Find out exactly why your business isn't ranking in local search — free audit from AbuQitmirLabs." />
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
                                "@id": "https://www.abuqitmirlabs.tech/local-seo-audit#webpage",
                                "url": "https://www.abuqitmirlabs.tech/local-seo-audit",
                                "name": "Free Local SEO Audit | Find Why You're Not Ranking | AbuQitmirLabs",
                                "description": "Free local SEO audit from AbuQitmirLabs — we analyse your Google Business Profile, citation profile, on-page signals, and map-pack competitors, then tell you exactly what's holding back your rankings.",
                                "inLanguage": "en-US",
                                "isPartOf": {
                                    "@id": "https://www.abuqitmirlabs.tech/#website"
                                },
                                "about": {
                                    "@id": "https://www.abuqitmirlabs.tech/local-seo-audit#service"
                                },
                                "breadcrumb": {
                                    "@id": "https://www.abuqitmirlabs.tech/local-seo-audit#breadcrumb"
                                }
                            },
                            {
                                "@type": "Service",
                                "@id": "https://www.abuqitmirlabs.tech/local-seo-audit#service",
                                "name": "Local SEO Audit",
                                "description": "A comprehensive local SEO audit covering Google Business Profile health, citation consistency, on-page local signals, technical issues, and map-pack competitor analysis — delivered as a priority action report.",
                                "provider": {
                                    "@id": "https://www.abuqitmirlabs.tech/#organization"
                                },
                                "areaServed": ["US", "GB", "PK", "CA", "PL", "AU"],
                                "serviceType": "Local SEO Audit",
                                "offers": {
                                    "@type": "Offer",
                                    "name": "Local SEO Audit Report",
                                    "description": "Comprehensive local SEO audit — GBP analysis, citation profile, on-page signals, competitor gap review, and prioritised fix list.",
                                    "priceSpecification": {
                                        "@type": "PriceSpecification",
                                        "price": "0",
                                        "priceCurrency": "USD",
                                        "description": "Initial audit free; full technical audit from $150"
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
                                "@id": "https://www.abuqitmirlabs.tech/local-seo-audit#breadcrumb",
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
                                        "name": "Local SEO Audit",
                                        "item": "https://www.abuqitmirlabs.tech/local-seo-audit"
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
                    { name: 'LOCAL SEO AUDIT' }
                ]} />

                {/* Hero Section */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto py-16 md:py-24 border-b border-white/10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-mono font-bold tracking-widest uppercase mb-6">
                            <FileSearch className="w-3.5 h-3.5" />
                            AbuQitmirLabs .TECH — Local SEO Audit
                        </div>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-medium tracking-tight text-white leading-[1.1] mb-8">
                            Find Out <em className="text-[#ccff00] italic font-normal">Exactly</em> Why You're Not in the Map Pack
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-300 font-sans leading-relaxed mb-10 max-w-3xl">
                            A forensic local SEO analysis across your Google Business Profile, citation profile, on-page signals, and top competitors — delivered as a prioritised action report, not a jargon-filled slide deck.
                        </p>
                        <div className="flex flex-wrap gap-4 items-center">
                            <Link 
                                to="/contact" 
                                className="px-8 py-4 bg-[#ccff00] text-black font-bold text-sm rounded-xl hover:bg-white transition-all brutalist-shadow flex items-center gap-2 uppercase tracking-wider"
                            >
                                Request Your Free Audit
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link 
                                to="/local-seo-for-small-business" 
                                className="px-8 py-4 bg-zinc-900 text-white font-bold text-sm border border-white/20 rounded-xl hover:bg-zinc-800 transition-all flex items-center gap-2 uppercase tracking-wider"
                            >
                                Explore Full Local SEO Services
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
                                    "Forensic Local SEO Audit",
                                    "Google Business Profile Health",
                                    "NAP Consistency Check",
                                    "On-Page Local Signals",
                                    "Map-Pack Competitor Analysis",
                                    "Prioritised Fix Action Plan"
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
                            Audit Deliverables
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif font-medium text-white">
                            Forensic Audit Breakdown
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "GOOGLE BUSINESS PROFILE AUDIT",
                                tagline: "PRIMARY CATEGORY & COMPLETENESS SCORE",
                                icon: <MapPin className="w-8 h-8 text-[#ff0099]" />,
                                description: "Deep verification of your GBP categories, service areas, attributes, Q&A seeding, and photo engagement. Uncover listing gaps holding you back from top 3 map positions."
                            },
                            {
                                title: "CITATION & NAP DRIFT SCAN",
                                tagline: "IDENTIFY CONFUSING ADDRESS DATA",
                                icon: <Search className="w-8 h-8 text-black" />,
                                description: "Full crawl of tier-1 directories and aggregators to detect duplicate listings, phone number variations, and outdated business addresses weakening your authority."
                            },
                            {
                                title: "MAP-PACK COMPETITOR GAP",
                                tagline: "ANALYSIS OF TOP 3 LOCAL RIVALS",
                                icon: <BarChart3 className="w-8 h-8 text-[#ff0099]" />,
                                description: "Reverse engineer the exact local signals driving your top 3 competitors in local search — review acquisition rate, citation volume, and local landing page depth."
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

                {/* What the Audit Covers - 5 Areas */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto py-20 border-b border-white/10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[#ccff00] text-xs font-mono font-bold tracking-widest uppercase block mb-3">
                            What the Audit Covers
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-6">
                            Five Areas That Determine Whether You Rank Locally
                        </h2>
                        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                            A <strong className="text-white">local SEO audit</strong> is a diagnostic, not a sales pitch. Its job is to surface the specific, fixable reasons your business isn't appearing where it should — whether that's a misconfigured Google Business Profile, a pattern of inconsistent citations, missing schema markup, or a competitor advantage you haven't identified yet. Our audit report tells you what's wrong, why it matters, and which fixes to prioritise first based on the effort-to-impact ratio.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {auditAreas.map((area, idx) => (
                            <div key={idx} className="bg-zinc-950 border border-white/10 p-8 rounded-2xl hover:border-[#ccff00]/40 transition-all flex flex-col justify-between">
                                <div>
                                    <div className="text-3xl font-serif font-bold text-[#ccff00] mb-4">{area.num}</div>
                                    <h3 className="text-xl font-bold text-white mb-3">{area.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{area.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Common Causes / Patterns */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto py-20 border-b border-white/10">
                    <span className="text-[#ccff00] text-xs font-mono font-bold tracking-widest uppercase block mb-3">
                        The Most Common Findings
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-white leading-tight mb-6">
                        Why Most Local Businesses Aren't Ranking — The Patterns We See
                    </h2>
                    <p className="text-zinc-400 text-base md:text-lg mb-12 max-w-3xl leading-relaxed">
                        After running local SEO audits across dozens of businesses in the US, UK, Pakistan, Canada, Poland, and Australia, the same root causes appear with notable regularity. This list isn't exhaustive — but if your business is invisible in local search, the culprit is almost always one of these.
                    </p>

                    <div className="space-y-4">
                        {commonCauses.map((cause, idx) => (
                            <div key={idx} className="bg-zinc-950 border border-white/10 p-6 md:p-8 rounded-2xl flex gap-5 items-start hover:border-red-500/30 transition-all">
                                <div className="w-8 h-8 rounded-full bg-red-950 border border-red-500/40 text-red-400 font-bold flex items-center justify-center shrink-0 mt-0.5 text-sm">
                                    ⚠
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{cause.title}</h3>
                                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">{cause.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Free vs Paid Comparison */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto py-20 border-b border-white/10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[#ccff00] text-xs font-mono font-bold tracking-widest uppercase block mb-3">
                            Audit Options
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-6">
                            Free Initial Audit vs. Full Technical Audit
                        </h2>
                        <p className="text-zinc-400 text-base md:text-lg">
                            The initial audit is free with no obligation — it gives you a real, actionable picture of the highest-priority issues. The full technical audit goes deeper into every signal category and is the right starting point for a comprehensive campaign.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-zinc-950 border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-bold font-mono text-zinc-500 uppercase tracking-widest block mb-4">Free Initial Audit</span>
                                <div className="text-4xl font-serif font-bold text-white mb-6">$0 <span className="text-sm font-sans font-normal text-zinc-500">— no obligation</span></div>
                                <ul className="space-y-3.5 text-zinc-300 text-sm mb-8 border-t border-white/10 pt-6">
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> GBP completeness and category check</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Top 5 citation platforms reviewed</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Basic on-page signal review</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Top competitor comparison (1 competitor)</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Priority issues summary — top 5 fixes</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Delivered within 2–3 business days</li>
                                </ul>
                            </div>
                            <Link to="/contact" className="w-full py-3.5 bg-zinc-900 border border-white/20 text-white font-bold text-xs uppercase text-center rounded-xl hover:bg-zinc-800 transition-all">
                                Request Free Audit
                            </Link>
                        </div>

                        <div className="bg-zinc-950 border-2 border-[#ccff00] p-8 rounded-2xl flex flex-col justify-between relative shadow-[0_0_30px_rgba(204,255,0,0.1)]">
                            <div className="absolute -top-3 right-6 bg-[#ccff00] text-black font-mono font-bold text-[10px] uppercase px-3 py-1 rounded-full">
                                Recommended for Campaigns
                            </div>
                            <div>
                                <span className="text-xs font-bold font-mono text-[#ccff00] uppercase tracking-widest block mb-4">Full Technical Audit</span>
                                <div className="text-4xl font-serif font-bold text-white mb-6">From $150</div>
                                <ul className="space-y-3.5 text-zinc-300 text-sm mb-8 border-t border-white/10 pt-6">
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Everything in the free audit, plus:</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Deep citation scan — 50+ platforms</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Full schema markup validation</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Core Web Vitals and mobile usability analysis</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> 3-competitor gap analysis with ranking breakdown</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Review velocity and sentiment analysis</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Structured PDF report with full priority action list</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Delivered within 5–7 business days</li>
                                </ul>
                            </div>
                            <Link to="/contact" className="w-full py-3.5 bg-[#ccff00] text-black font-bold text-xs uppercase text-center rounded-xl hover:bg-white transition-all">
                                Order Full Technical Audit
                            </Link>
                        </div>
                    </div>

                    <p className="text-zinc-400 text-center text-sm mt-10 max-w-2xl mx-auto">
                        The full technical audit is included at no additional cost in our <Link to="/local-seo-for-small-business" className="text-[#ccff00] hover:underline">mid-range and enterprise local SEO packages</Link>. If you engage us for an ongoing campaign after the paid audit, the $150 audit fee is credited against your first month's retainer.
                    </p>
                </section>

                {/* FAQ Section */}
                <section className="px-6 md:px-12 max-w-5xl mx-auto py-20 border-b border-white/10">
                    <span className="text-[#ccff00] text-xs font-mono font-bold tracking-widest uppercase block mb-3 text-center">
                        Common Questions
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-12 text-center">
                        Local SEO Audit — FAQ
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
                            Request Your Free Local SEO Audit
                        </h2>
                        <p className="text-zinc-300 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                            Tell us your business name, location, and the keyword you most want to rank for. We'll have your initial audit back within 3 business days.
                        </p>
                        <Link 
                            to="/contact" 
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#ccff00] text-black font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-white transition-all brutalist-shadow"
                        >
                            Request the Free Audit
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

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
    ExternalLink,
    Smartphone,
    Compass,
    ShieldCheck,
    HelpCircle
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
            a: "Yes. Local SEO is typically the highest-ROI digital marketing channel available to a small business because it captures local customers at the exact moment they are actively searching for a nearby service or business. Unlike paid advertisements that stop generating leads the moment your ad spend ends, the local search visibility, Google Maps rankings, and review authority you build compound over time, providing a sustained stream of direct phone calls, website traffic, and walk-in leads."
        },
        {
            q: "Can a small business do local SEO themselves?",
            a: "Small business owners can handle foundational tasks in-house — such as claiming and completing their Google Business Profile, uploading real workspace photos, responding to customer reviews, and ensuring basic NAP (Name, Address, Phone) consistency across major directories. However, technical on-page optimization, structured citation cleanup, schema markup implementation (LocalBusiness and FAQPage), competitive gap analysis, and ongoing local rank tracking usually require professional technical expertise to execute properly."
        },
        {
            q: "How much does affordable local SEO cost for a small business?",
            a: "Affordable local SEO for a single-location small business typically ranges between $500 and $1,000 per month. This scope covers primary Google Business Profile optimization, foundational local citation building, NAP consistency auditing, localized on-page keyword targeting, and monthly rank tracking. Mid-range campaigns for competitive metro markets or multi-service companies typically range from $1,000 to $2,500 per month."
        },
        {
            q: "What's the difference between cheap local SEO and affordable local SEO?",
            a: "Cheap local SEO ($100–$300/mo) usually relies on low-effort automated software that creates hundreds of low-quality, spammy directory listings. These automated spam citations often contain inaccurate NAP data and can trigger Google penalty flags. In contrast, affordable local SEO ($500–$1,000/mo) applies the exact same high-quality manual optimization processes used in enterprise campaigns, carefully scoped to a single location without cutting corners on citation quality, technical auditing, or strategy."
        },
        {
            q: "How does Google decide which local businesses rank in Google Maps?",
            a: "Google's local search algorithm evaluates three primary pillars to rank businesses in Google Maps and the Local 3-Pack: Relevance (how well your Google Business Profile and website match the user's search query), Distance (how close your physical location or service area is to the searcher), and Prominence (how well-known and trusted your business is, measured through authentic customer reviews, local citations, structured data, and high-quality backlinks)."
        },
        {
            q: "What are local citations and why is NAP consistency important?",
            a: "Local citations are online mentions of your business Name, Address, and Phone number (NAP) on online directories, map platforms, and social channels (such as Yelp, YellowPages, Apple Maps, and Bing Places). Search engines compare NAP data across these platforms to verify your business identity. Inconsistent details — like subtle name variations or conflicting phone numbers — confuse search algorithms and directly erode your local map pack rankings."
        },
        {
            q: "How does Google Business Profile optimization help my business?",
            a: "Google Business Profile (GBP) is the cornerstone of local search visibility. Proper optimization involves selecting the correct primary business category, adding comprehensive service lists, configuring accurate business hours and service areas, uploading high-resolution photos, and maintaining an active stream of customer reviews and updates. A complete, optimized GBP signals active business operations to Google and dramatically improves your chances of appearing in the coveted Local 3-Pack."
        },
        {
            q: "Does local SEO work for service-area businesses without a storefront?",
            a: "Yes. Service-area businesses (SABs) — such as plumbers, electricians, locksmiths, and mobile detailers who travel to their clients — can rank prominently in Google Maps. In Google Business Profile, SABs can hide their physical home address while defining explicit service areas by city, county, or zip code. Coupled with localized service-area web pages and targeted local citations, service-area businesses can dominate local search results across their entire service territory."
        },
        {
            q: "How long does local SEO take to produce measurable results?",
            a: "Local SEO timelines depend on market competitiveness, existing domain history, and current GBP health. Most single-location small businesses begin seeing initial improvements in Google Business Profile views, map impressions, and phone inquiries within 60 to 90 days. Achieving top 3 map-pack positions in highly competitive industries or large metro areas typically requires 4 to 6 months of consistent citation building, review generation, and technical on-page optimization."
        },
        {
            q: "What should a small business look for when hiring a local SEO provider?",
            a: "Look for a local SEO partner that provides transparent monthly pricing, manual citation submission (avoiding automated citation spam bots), clear lead-tracking metrics (phone calls and map rankings rather than vanity metrics), and flexible month-to-month terms without long-term lock-in contracts. A reputable provider should begin with a comprehensive local audit and focus directly on strategies that drive qualified calls and revenue."
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
                <title>Local SEO for Small Businesses | Services & Plans | AbuQitmirLabs</title>
                <meta 
                    name="description" 
                    content="Custom local SEO for small businesses. Rank in Google Maps with Google Business Profile optimization, local citations, NAP consistency, and localized content." 
                />
                <link rel="canonical" href="https://www.abuqitmirlabs.tech/local-seo-for-small-business" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.abuqitmirlabs.tech/local-seo-for-small-business" />
                <meta property="og:title" content="Local SEO for Small Businesses | Services & Plans | AbuQitmirLabs" />
                <meta property="og:description" content="Custom local SEO for small businesses. Rank in Google Maps with Google Business Profile optimization, local citations, NAP consistency, and localized content." />
                <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />
                <meta property="og:site_name" content="AbuQitmirLabs" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@AbuQitmir" />
                <meta name="twitter:title" content="Local SEO for Small Businesses | Services & Plans | AbuQitmirLabs" />
                <meta name="twitter:description" content="Custom local SEO for small businesses. Rank in Google Maps with Google Business Profile optimization, local citations, NAP consistency, and localized content." />
                <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

                {/* JSON-LD Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "Organization",
                                "@id": "https://www.abuqitmirlabs.tech/#organization",
                                "name": "AbuQitmirLabs",
                                "alternateName": "AbuQitmirLabs .TECH",
                                "description": "Empowering businesses through advanced digital engineering — custom software, AI agents, web development, and local SEO services.",
                                "url": "https://www.abuqitmirlabs.tech",
                                "logo": "https://www.abuqitmirlabs.tech/logo.png",
                                "image": "https://www.abuqitmirlabs.tech/logo.png",
                                "foundingDate": "2020",
                                "address": {
                                    "@type": "PostalAddress",
                                    "streetAddress": "8/15, 3 37A Rd, Shah Khalid Colony",
                                    "addressLocality": "Landhi Town, Karachi",
                                    "addressRegion": "Sindh",
                                    "postalCode": "75160",
                                    "addressCountry": "PK"
                                },
                                "geo": {
                                    "@type": "GeoCoordinates",
                                    "latitude": "24.842691448838718",
                                    "longitude": "67.1862014846566"
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
                                    "https://www.facebook.com/abuqitmirlabs",
                                    "https://github.com/abuqitmir"
                                ]
                            },
                            {
                                "@type": "WebPage",
                                "@id": "https://www.abuqitmirlabs.tech/local-seo-for-small-business#webpage",
                                "url": "https://www.abuqitmirlabs.tech/local-seo-for-small-business",
                                "name": "Local SEO for Small Businesses | Services & Plans | AbuQitmirLabs",
                                "description": "Custom local SEO for small businesses. Rank in Google Maps with Google Business Profile optimization, local citations, NAP consistency, and localized content.",
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
                                "name": "Local SEO for Small Businesses",
                                "serviceType": "Local Search Engine Optimization for Small Businesses",
                                "description": "Affordable local SEO services built specifically for small business budgets — Google Business Profile setup, foundational citations, NAP audit, and localized keyword targeting without enterprise-level retainers.",
                                "url": "https://www.abuqitmirlabs.tech/local-seo-for-small-business",
                                "provider": {
                                    "@id": "https://www.abuqitmirlabs.tech/#organization"
                                },
                                "areaServed": ["US", "GB", "PK", "CA", "PL", "AU"],
                                "offers": {
                                    "@type": "Offer",
                                    "name": "Small Business Local SEO Starter Package",
                                    "description": "Entry-level local SEO package for single-location small businesses — GBP optimization, foundational citations, NAP audit, and monthly reporting.",
                                    "url": "https://www.abuqitmirlabs.tech/local-seo-for-small-business",
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
                                    "name": "Single-location small businesses and service-area operators"
                                }
                            },
                            {
                                "@type": "FAQPage",
                                "@id": "https://www.abuqitmirlabs.tech/local-seo-for-small-business#faq",
                                "mainEntity": faqs.map((f) => ({
                                    "@type": "Question",
                                    "name": f.q,
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": f.a
                                    }
                                }))
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
                                        "item": "https://www.abuqitmirlabs.tech/seo-mastery"
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
                        Local SEO for <em className="text-[#ccff00] not-italic underline decoration-[#ccff00]/40 underline-offset-8">Small Businesses</em>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-base md:text-lg text-zinc-300 max-w-4xl mx-auto leading-relaxed font-light mb-10 font-sans"
                    >
                        Local SEO helps single-location operators and service-area companies capture high-intent customers searching nearby. When a customer searches for a local trade, clinic, or storefront in Google Maps, ranking in the top 3 map results directly drives direct phone calls, map directions, and qualified leads. Our focused local SEO framework eliminates enterprise retainer bloat, prioritizing Google Business Profile optimization, foundational citation building, strict NAP consistency, and localized on-page signals. Explore our full <Link to="/seo-mastery" className="text-[#ccff00] hover:underline font-medium">SEO strategy and optimization</Link> framework, or integrate your local web presence with high-performance <Link to="/web-development" className="text-[#ccff00] hover:underline font-medium">web development</Link> and tailored <Link to="/content-writing" className="text-[#ccff00] hover:underline font-medium">content writing</Link> services.
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

            {/* Specialized Sub-Services Cards */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto py-12">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <span className="text-[#ccff00] text-xs font-mono font-bold tracking-widest uppercase block mb-2">
                        Specialized Local SEO Solutions
                    </span>
                    <h2 className="text-2xl md:text-4xl font-serif font-medium text-white">
                        Specialized Local SEO Programs & Audits
                    </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    <Link to="/local-seo-citation-building" className="bg-zinc-950 border border-white/10 p-6 rounded-2xl hover:border-[#ccff00] transition-all group flex flex-col justify-between">
                        <div>
                            <div className="w-10 h-10 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] font-bold mb-4">
                                <Layers size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ccff00] transition-colors">Local Citation Building</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                Structured NAP-consistent directory submissions across tier-1, authority, and niche listings to establish rock-solid local authority through our specialized <strong className="text-white">local citation building</strong> service.
                            </p>
                        </div>
                        <span className="text-[#ccff00] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                            View Citation Services <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>

                    <Link to="/white-label-local-seo" className="bg-zinc-950 border border-white/10 p-6 rounded-2xl hover:border-[#ccff00] transition-all group flex flex-col justify-between">
                        <div>
                            <div className="w-10 h-10 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] font-bold mb-4">
                                <Globe size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ccff00] transition-colors">White Label Agency SEO</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                Fully branded local SEO fulfilment for digital agencies needing agency-grade execution — wholesale rates, brandable PDF audits, and fulfillment support via our <strong className="text-white">white-label local SEO services</strong>.
                            </p>
                        </div>
                        <span className="text-[#ccff00] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                            Explore Agency Reselling <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>

                    <Link to="/local-seo-audit" className="bg-zinc-950 border border-white/10 p-6 rounded-2xl hover:border-[#ccff00] transition-all group flex flex-col justify-between">
                        <div>
                            <div className="w-10 h-10 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] font-bold mb-4">
                                <Search size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ccff00] transition-colors">Free Local SEO Audit</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                Forensic technical analysis of your Google Business Profile, citation consistency, on-page signals, competitor gap, and map pack rank performance with a thorough <strong className="text-white">local SEO audit</strong>.
                            </p>
                        </div>
                        <span className="text-[#ccff00] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                            Request Free Audit <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
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

            {/* SECTION 1: LOCAL SEO VS TRADITIONAL SEO */}
            <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">STRATEGIC COMPARISON</span>
                        <h2 className="text-3xl md:text-5xl font-display font-medium text-white mt-3">
                            Local SEO vs Traditional SEO
                        </h2>
                        <p className="text-zinc-400 text-base max-w-2xl mx-auto mt-4">
                            Understanding how localized search intent differs from broader national search engine optimization is crucial for investing your marketing dollars effectively.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] flex flex-col justify-between">
                            <div>
                                <div className="mb-6 w-14 h-14 bg-[#ccff00]/30 border-4 border-black rounded-xl flex items-center justify-center text-black shadow-[4px_4px_0px_#000]">
                                    <MapPin className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-black mb-1">
                                    Local Search Optimization
                                </h3>
                                <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-4 font-bold">
                                    GEOGRAPHIC INTENT & MAP PACK
                                </span>
                                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold mb-4">
                                    Targeted specifically at searchers looking for services within a defined physical location or service area (e.g. "emergency plumber in Denver").
                                </p>
                                <ul className="space-y-2 text-xs text-zinc-900 font-bold">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                                        <span>Google Business Profile & Map Pack 3-Pack rankings</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                                        <span>Local citations & directory NAP consistency</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                                        <span>Geo-targeted service pages & local customer reviews</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] flex flex-col justify-between">
                            <div>
                                <div className="mb-6 w-14 h-14 bg-zinc-200 border-4 border-black rounded-xl flex items-center justify-center text-black shadow-[4px_4px_0px_#000]">
                                    <Globe className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-black mb-1">
                                    Traditional Organic SEO
                                </h3>
                                <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-4 font-bold">
                                    NATIONAL & GLOBAL SCOPE
                                </span>
                                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold mb-4">
                                    Focused on non-geographic informational and commercial keywords across regional, national, or global search audiences.
                                </p>
                                <ul className="space-y-2 text-xs text-zinc-900 font-bold">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                                        <span>Organic standard web search page rankings</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                                        <span>National domain authority & editorial link building</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                                        <span>Broad informational content marketing & blogs</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-6 rounded-2xl bg-zinc-900 border border-white/10 text-center">
                        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
                            While national businesses rely purely on organic search, a small brick-and-mortar or service-area business needs both map pack optimization and localized organic authority. Read our overarching <Link to="/seo-mastery" className="text-[#ccff00] hover:underline font-bold">SEO strategy and optimization</Link> guide to learn how local and organic channels reinforce one another.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 2: HOW GOOGLE MAPS RANKING WORKS (RELEVANCE, DISTANCE, PROMINENCE) */}
            <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/10 bg-zinc-950/40">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">RANKING ALGORITHM PILLARS</span>
                        <h2 className="text-3xl md:text-5xl font-display font-medium text-white mt-3 mb-4">
                            How Google Maps Ranking Works
                        </h2>
                        <p className="text-zinc-400 text-base max-w-2xl mx-auto">
                            Google's local search results are influenced by factors including relevance, distance, and prominence. Understanding these three core pillars helps small businesses focus on signals that genuinely impact the Local 3-Pack.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] flex flex-col justify-between">
                            <div>
                                <div className="mb-6 w-14 h-14 bg-[#ccff00] border-4 border-black rounded-xl flex items-center justify-center text-black font-black text-xl shadow-[4px_4px_0px_#000]">
                                    01
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">
                                    Relevance
                                </h3>
                                <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-3 font-bold">
                                    PROFILE & CONTENT MATCH
                                </span>
                                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                    How well your Google Business Profile and website content match what a user is searching for. Selecting accurate primary and secondary GBP categories, detailing specific services, and optimizing local website copy ensures Google understands your exact offerings.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] flex flex-col justify-between">
                            <div>
                                <div className="mb-6 w-14 h-14 bg-[#ccff00] border-4 border-black rounded-xl flex items-center justify-center text-black font-black text-xl shadow-[4px_4px_0px_#000]">
                                    02
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">
                                    Distance
                                </h3>
                                <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-3 font-bold">
                                    PHYSICAL & SERVICE PROXIMITY
                                </span>
                                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                    How close your physical business address or defined service area is to the user's mobile device or specified search location. While physical distance cannot be artificialized, clearly defining service areas helps maximize proximity reach.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] flex flex-col justify-between">
                            <div>
                                <div className="mb-6 w-14 h-14 bg-[#ccff00] border-4 border-black rounded-xl flex items-center justify-center text-black font-black text-xl shadow-[4px_4px_0px_#000]">
                                    03
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">
                                    Prominence
                                </h3>
                                <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-3 font-bold">
                                    TRUST, REVIEWS & CITATIONS
                                </span>
                                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                    How well-known and authoritative your business is in its market. Prominence is driven by authentic customer review volume, high star ratings, consistent directory citations, local news mentions, and authoritative backlinks.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: THE SMALL BUSINESS REALITY */}
            <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">THE SMALL BUSINESS REALITY</span>
                        <h2 className="text-3xl md:text-5xl font-display font-medium text-white mt-3">
                            Why Local SEO for Small Business Requires a Dedicated Strategy
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="mb-6 w-14 h-14 bg-[#ccff00]/30 border-4 border-black rounded-xl flex items-center justify-center text-black shadow-[4px_4px_0px_#000]">
                                    <Target className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">
                                    No Enterprise Overhead or Bloat
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
                                    Competing Against National Franchises
                                </h3>
                                <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-4 font-bold">
                                    LOCAL RELEVANCE WINS
                                </span>
                                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                    A small, well-run business often out-competes a franchise in local search because Google rewards consistency, real reviews, and genuine local relevance over sheer marketing spend. A single-location business with an accurate Google Business Profile and 40 honest reviews frequently outranks a national chain.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="mb-6 w-14 h-14 bg-[#ccff00]/30 border-4 border-black rounded-xl flex items-center justify-center text-black shadow-[4px_4px_0px_#000]">
                                    <TrendingUp className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">
                                    Direct Phone Call & Foot Traffic Focus
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

            {/* SECTION 4: GOOGLE BUSINESS PROFILE, CITATIONS & NAP DEEP DIVE */}
            <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/10 bg-zinc-950/50">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">CORE TECHNICAL FOUNDATION</span>
                        <h2 className="text-3xl md:text-5xl font-display font-medium text-white mt-3 mb-4">
                            Google Business Profile, NAP Consistency & Citations
                        </h2>
                        <p className="text-zinc-400 text-base max-w-2xl mx-auto">
                            The backbone of local search visibility relies on accurate business entity signals across Google, directory listings, and customer feedback loops.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {/* GBP Card */}
                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-[#ccff00] border-2 border-black rounded-lg flex items-center justify-center text-black font-bold">
                                        <MapPin size={20} />
                                    </div>
                                    <h3 className="text-xl font-black uppercase text-black">Google Business Profile (GBP)</h3>
                                </div>
                                <p className="text-xs md:text-sm text-zinc-800 font-bold leading-relaxed mb-4">
                                    Claiming and optimizing your GBP profile is the single highest-impact action in local SEO. Primary category selection is a paramount ranking factor. Additional steps include:
                                </p>
                                <ul className="space-y-2 text-xs text-zinc-900 font-bold">
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>Adding complete service lists and accurate operating hours.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>Configuring explicit service areas for Service Area Businesses (SABs).</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>Uploading high-resolution photos of real work, staff, and locations.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>Suppressing duplicate listings and guarding against spam competitor edits.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* NAP & Citations Card */}
                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-[#ccff00] border-2 border-black rounded-lg flex items-center justify-center text-black font-bold">
                                        <Layers size={20} />
                                    </div>
                                    <h3 className="text-xl font-black uppercase text-black">NAP Consistency & Local Citations</h3>
                                </div>
                                <p className="text-xs md:text-sm text-zinc-800 font-bold leading-relaxed mb-4">
                                    NAP stands for <strong className="text-black">Name, Address, and Phone Number</strong>. Search engines cross-reference directory mentions to verify identity. Inconsistencies erode trust:
                                </p>
                                <div className="p-3 bg-zinc-100 border-2 border-black rounded-lg mb-4 text-xs font-mono">
                                    <div className="text-emerald-700 font-bold">✓ Consistent: "AbuQitmirLabs" | 123 Main St | (555) 019-2831</div>
                                    <div className="text-red-600 font-bold mt-1">✗ Inconsistent: "Abu Qitmir Labs Inc" | 123 Main Street | (555) 019-9999</div>
                                </div>
                                <p className="text-xs text-zinc-800 font-bold">
                                    Learn how our structured <Link to="/local-seo-citation-building" className="text-[#ff0099] underline font-black">local citation building</Link> suppresses duplicate records and submits your NAP to tier-1 authority platforms manually.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Search & Reviews Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 bg-zinc-900 border border-white/10 rounded-2xl">
                            <div className="flex items-center gap-3 mb-3">
                                <Smartphone className="text-[#ccff00] w-6 h-6" />
                                <h4 className="text-lg font-bold text-white">Mobile Search Experience & Click-to-Call</h4>
                            </div>
                            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-sans">
                                Over 60% of local search queries occur on mobile devices. Ensuring tap-to-call phone buttons, instant directions integration, fast Core Web Vitals, and mobile-responsive forms directly converts search traffic into direct bookings.
                            </p>
                        </div>

                        <div className="p-6 bg-zinc-900 border border-white/10 rounded-2xl">
                            <div className="flex items-center gap-3 mb-3">
                                <Star className="text-[#ccff00] w-6 h-6 fill-[#ccff00]" />
                                <h4 className="text-lg font-bold text-white">Ethical Reviews & Reputation Management</h4>
                            </div>
                            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-sans">
                                Review velocity, ratings, and customer comments are critical ranking signals. We help businesses build automated, ethical review request workflows. We strictly prohibit fake or incentivized reviews, focusing on genuine customer trust.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: DIY VS PROFESSIONAL COMPARISON MATRIX */}
            <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">DO IT YOURSELF OR HIRE?</span>
                        <h2 className="text-3xl md:text-5xl font-display font-medium text-white mt-3 mb-4">
                            DIY Local SEO vs Professional Management
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
                                        <h3 className="text-lg font-black uppercase tracking-tight text-black">Tasks Small Businesses Can Handle In-House</h3>
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
                                        <h3 className="text-lg font-black uppercase tracking-tight text-black">Complex Technical Local SEO Requiring Specialists</h3>
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

            {/* SECTION 6: THE 90-DAY LOCAL SEO ROADMAP */}
            <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/10 bg-zinc-950/40">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">THE BUDGET-AWARE ACTION PLAN</span>
                        <h2 className="text-3xl md:text-5xl font-display font-medium text-white mt-3 mb-4">
                            90-Day Local SEO Roadmap for Small Businesses
                        </h2>
                        <p className="text-zinc-400 text-base max-w-2xl mx-auto">
                            This is the sequential strategy we execute for single-location operators starting from zero or recovering lost visibility. Timelines vary depending on competitive density, market size, and current domain health.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {/* Phase 1 */}
                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xl font-black font-mono text-black">DAYS 1–30</span>
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#ccff00] text-black border-2 border-black">PHASE 1</span>
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-black mb-2">Foundation & Audit</h3>
                                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold mb-4">
                                    Audit Google Business Profile, identify incorrect primary categories, perform deep NAP consistency checks across directory databases, and resolve critical on-page technical errors.
                                </p>
                                <ul className="space-y-2 text-xs text-zinc-900 font-bold border-t-2 border-black pt-3">
                                    <li className="flex items-center gap-1.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                                        <span>GBP category & category alignment</span>
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                                        <span>Full site & NAP audit</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Phase 2 */}
                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xl font-black font-mono text-black">DAYS 31–60</span>
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#ccff00] text-black border-2 border-black">PHASE 2</span>
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-black mb-2">Authority & Citations</h3>
                                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold mb-4">
                                    Build high-authority tier-1 local citations manually, suppress duplicate listings, build geo-targeted service area pages, and establish a systematized review generation process.
                                </p>
                                <ul className="space-y-2 text-xs text-zinc-900 font-bold border-t-2 border-black pt-3">
                                    <li className="flex items-center gap-1.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                                        <span>Manual citation submissions</span>
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                                        <span>Review velocity workflow</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Phase 3 */}
                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xl font-black font-mono text-black">DAYS 61–90</span>
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#ccff00] text-black border-2 border-black">PHASE 3</span>
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-black mb-2">Optimization & Scaling</h3>
                                <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold mb-4">
                                    Track map pack grid ranks, monitor phone call conversions, publish geotagged updates, refine localized meta data, and analyze competitor movement to secure top 3 positions.
                                </p>
                                <ul className="space-y-2 text-xs text-zinc-900 font-bold border-t-2 border-black pt-3">
                                    <li className="flex items-center gap-1.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                                        <span>Local rank & call tracking</span>
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                                        <span>Continuous conversion tweaks</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_#000]">
                            <h4 className="text-base font-black uppercase text-black mb-1">Step 1: Complete GBP Setup</h4>
                            <p className="text-xs font-bold text-zinc-800">Correct category selection, full service list, accurate hours, real photos. Recovers immediate baseline visibility.</p>
                        </div>
                        <div className="bg-white border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_#000]">
                            <h4 className="text-base font-black uppercase text-black mb-1">Step 2: Correct Directory NAP</h4>
                            <p className="text-xs font-bold text-zinc-800">Eliminate conflicting address or phone entries across directories that actively confuse Google's indexing bots.</p>
                        </div>
                        <div className="bg-white border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_#000]">
                            <h4 className="text-base font-black uppercase text-black mb-1">Step 3: Build Authority Citations</h4>
                            <p className="text-xs font-bold text-zinc-800">Manual submissions to top industry directories and local platforms. Quality over volume prevents spam penalties.</p>
                        </div>
                        <div className="bg-white border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_#000]">
                            <h4 className="text-base font-black uppercase text-black mb-1">Step 4: On-Page Local Targeting</h4>
                            <p className="text-xs font-bold text-zinc-800">Update title tags, headers, and localized service content to naturally reflect where you actually operate.</p>
                        </div>
                        <div className="bg-white border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_#000]">
                            <h4 className="text-base font-black uppercase text-black mb-1">Step 5: Systematize Reviews</h4>
                            <p className="text-xs font-bold text-zinc-800">Implement a simple habit — text, QR code, or email follow-up — to collect authentic customer reviews consistently.</p>
                        </div>
                        <div className="bg-white border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_#000]">
                            <h4 className="text-base font-black uppercase text-black mb-1">Step 6: Rank & Lead Tracking</h4>
                            <p className="text-xs font-bold text-zinc-800">Monthly reporting on Google Maps grid ranks, phone calls, and direction clicks to measure true revenue growth.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 7: THE MISTAKES THAT WASTE BUDGET */}
            <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-xs font-mono uppercase tracking-widest text-red-400">AVOID THESE</span>
                        <h2 className="text-3xl md:text-5xl font-display font-medium text-white mt-3 mb-4">
                            Common Local SEO Budget Traps & Pitfalls
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
                            <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">Trap 1: Purchasing Cheap Automated Citation Spam</h3>
                            <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-3 font-bold">MISTAKE #1 — CHEAP CITATION SPAM</span>
                            <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                Rock-bottom "cheap local seo" offers often rely on mass-produced, low-quality citations that can trigger spam flags rather than rankings — undoing months of legitimate progress.
                            </p>
                        </div>

                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 relative">
                            <span className="inline-block px-3 py-1 rounded bg-red-100 text-red-700 border-2 border-black text-[10px] font-mono uppercase tracking-widest font-black mb-4">
                                CATEGORY ERROR
                            </span>
                            <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">Trap 2: Selecting Incorrect GBP Primary Categories</h3>
                            <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-3 font-bold">MISTAKE #2 — WRONG CATEGORY</span>
                            <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                Choosing "Business Services" instead of your specific trade category is one of the most common — and easiest to fix — reasons a small business fails to appear in relevant local searches.
                            </p>
                        </div>

                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 relative">
                            <span className="inline-block px-3 py-1 rounded bg-red-100 text-red-700 border-2 border-black text-[10px] font-mono uppercase tracking-widest font-black mb-4">
                                NEGLECT
                            </span>
                            <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">Trap 3: Neglecting Google Business Profile Updates</h3>
                            <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-3 font-bold">MISTAKE #3 — INACTIVE PROFILE</span>
                            <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                A profile with no updates, no new photos, and no responses to reviews for a year signals inactivity to both customers and Google's ranking systems.
                            </p>
                        </div>

                        <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all duration-300 relative">
                            <span className="inline-block px-3 py-1 rounded bg-red-100 text-red-700 border-2 border-black text-[10px] font-mono uppercase tracking-widest font-black mb-4">
                                INCONSISTENCY
                            </span>
                            <h3 className="text-lg font-black uppercase tracking-tight text-black mb-1">Trap 4: Allowing NAP Information Drift</h3>
                            <span className="text-[10px] font-mono text-[#ff0099] uppercase tracking-wider block mb-3 font-bold">MISTAKE #4 — UNMATCHED NAP DETAILS</span>
                            <p className="text-xs md:text-sm leading-relaxed text-zinc-800 font-bold">
                                A phone number change or an office move that isn't updated everywhere creates conflicting signals that quietly erode rankings months later.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 8: HONEST PRICING */}
            <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/10 bg-zinc-950/50">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">HONEST PRICING</span>
                    <h2 className="text-3xl md:text-5xl font-display font-medium text-white mt-3 mb-6">
                        Transparent Local SEO Pricing for Single-Location Businesses
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

                    {/* Authoritative External Local SEO Resources */}
                    <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-400">
                        <span className="text-zinc-500 uppercase tracking-widest font-bold">Official Local Search Resources:</span>
                        <a href="https://support.google.com/business/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#ccff00] transition-colors">
                            Google Business Profile Help <ExternalLink className="w-3 h-3" />
                        </a>
                        <span className="text-zinc-700">•</span>
                        <a href="https://developers.google.com/search/docs/appearance/structured-data/local-business" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#ccff00] transition-colors">
                            Google Local Schema Docs <ExternalLink className="w-3 h-3" />
                        </a>
                        <span className="text-zinc-700">•</span>
                        <a href="https://www.brightlocal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#ccff00] transition-colors">
                            BrightLocal Industry Benchmark <ExternalLink className="w-3 h-3" />
                        </a>
                        <span className="text-zinc-700">•</span>
                        <a href="https://moz.com/learn/seo/local" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#ccff00] transition-colors">
                            Moz Local Learning Center <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </section>

            {/* SECTION 9: FAQS */}
            <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">COMMON QUESTIONS</span>
                        <h2 className="text-3xl md:text-5xl font-display font-medium text-white mt-3">
                            Local SEO for Small Business FAQ
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

            {/* SECTION 10: BOTTOM CTA */}
            <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto text-center border-t border-white/10 bg-gradient-to-b from-zinc-900 to-[#080808]">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white mb-6">
                        Schedule a Local Search Strategy Consultation
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

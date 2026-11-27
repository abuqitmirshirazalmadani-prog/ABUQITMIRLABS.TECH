import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
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
    Building2,
    Briefcase,
    FileSpreadsheet,
    PieChart,
    PenTool,
    Link2,
    ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function WhiteLabelLocalSEOPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            q: "What is white label local SEO?",
            a: "White label local SEO is a service arrangement where one agency (the fulfilment partner) delivers local SEO work — citations, GBP optimisation, reporting — under the branding of another agency (the reseller). The end client never sees the fulfilment partner; they see only the reselling agency's brand."
        },
        {
            q: "How does white label local SEO pricing work for agencies?",
            a: "White label local SEO is typically priced at a wholesale rate — 35 to 50 percent below what the reselling agency charges its own clients — leaving clear room for agency margin. AbuQitmirLabs' white label plans start at $350 per location per month at agency wholesale pricing."
        },
        {
            q: "Do you use our brand name on reports?",
            a: "Yes. Every client-facing deliverable—including PDF local SEO audits, citation build spreadsheets, GBP optimization checklists, and monthly map-pack ranking reports—carries your agency's name, logo, and color palette with zero AbuQitmirLabs mentions, watermarks, or document metadata."
        },
        {
            q: "Can I resell local SEO for clients in multiple countries?",
            a: "Yes. AbuQitmirLabs manages active local SEO campaigns in Pakistan, the US, UK, UAE, Saudi Arabia, Canada, and Australia. Each market has its own citation ecosystem and ranking dynamics, which our team handles natively under your agency's brand."
        }
    ];

    const deliverables = [
        {
            icon: <FileSpreadsheet className="w-8 h-8 text-[#ccff00]" />,
            title: "White-Label Audit Report",
            desc: "A professional local SEO audit covering GBP completeness, citation consistency, on-page signals, and competitor gap analysis — formatted as a ready-to-present PDF."
        },
        {
            icon: <Layers className="w-8 h-8 text-[#ccff00]" />,
            title: "Citation Build & Cleanup",
            desc: "NAP-consistent citation creation and correction across tier-1 and niche-relevant directories. Every citation verified, logged, and delivered in a structured summary sheet."
        },
        {
            icon: <MapPin className="w-8 h-8 text-[#ccff00]" />,
            title: "GBP Optimisation",
            desc: "Full Google Business Profile setup or overhaul — categories, service areas, attributes, Q&A seeding, and photo strategy — with a documented before/after state."
        },
        {
            icon: <PieChart className="w-8 h-8 text-[#ccff00]" />,
            title: "Monthly Ranking Reports",
            desc: "Map-pack and organic position tracking for agreed keyword sets, delivered as a clean PDF or data export. Your agency branding on every page."
        },
        {
            icon: <PenTool className="w-8 h-8 text-[#ccff00]" />,
            title: "Localised Content",
            desc: "On-page localisation — title tags, meta descriptions, H1s, and service area copy — written to match your client's voice and local search intent."
        },
        {
            icon: <Link2 className="w-8 h-8 text-[#ccff00]" />,
            title: "Local Link Building",
            desc: "Community citations, local sponsorship mentions, and editorial outreach to build the off-page signals that sustain map-pack rankings over time."
        }
    ];

    const pageTitle = "White Label Local SEO Services for Agencies | AbuQitmirLabs";
    const pageDescription = "White label local SEO services for agencies. Unbranded GBP optimization, NAP citation building, and branded PDF reports at wholesale rates from $350/month.";
    const canonicalUrl = "https://www.abuqitmirlabs.tech/white-label-local-seo";
    const ogImageUrl = "https://www.abuqitmirlabs.tech/images/hero-abuqitmirlabs.webp";

    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://www.abuqitmirlabs.tech/#organization",
                "name": "AbuQitmirLabs",
                "alternateName": "AbuQitmirLabs .TECH",
                "url": "https://www.abuqitmirlabs.tech",
                "logo": "https://www.abuqitmirlabs.tech/logo.png",
                "image": ogImageUrl,
                "telephone": "+923233260859",
                "email": "hello@abuqitmirlabs.tech",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "8/15, 37-A/3, Shah Khalid Colony, Sector 37-A, Landhi Town",
                    "addressLocality": "Karachi",
                    "addressRegion": "Sindh",
                    "postalCode": "75160",
                    "addressCountry": "PK"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 24.842691448838718,
                    "longitude": 67.1862014846566
                },
                "sameAs": [
                    "https://www.facebook.com/profile.php?id=61583768706452",
                    "https://www.instagram.com/abuqitmirshirazalmadani/",
                    "https://www.youtube.com/@AbuQitmir",
                    "https://www.linkedin.com/in/abu-qitmir-697423390/",
                    "https://x.com/AbuQitmir",
                    "https://github.com/abuqitmir"
                ]
            },
            {
                "@type": "LocalBusiness",
                "@id": "https://www.abuqitmirlabs.tech/#localbusiness",
                "name": "AbuQitmirLabs",
                "url": "https://www.abuqitmirlabs.tech",
                "image": ogImageUrl,
                "telephone": "+923233260859",
                "email": "hello@abuqitmirlabs.tech",
                "priceRange": "$$",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "8/15, 37-A/3, Shah Khalid Colony, Sector 37-A, Landhi Town",
                    "addressLocality": "Karachi",
                    "addressRegion": "Sindh",
                    "postalCode": "75160",
                    "addressCountry": "PK"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 24.842691448838718,
                    "longitude": 67.1862014846566
                }
            },
            {
                "@type": "WebSite",
                "@id": "https://www.abuqitmirlabs.tech/#website",
                "url": "https://www.abuqitmirlabs.tech",
                "name": "AbuQitmirLabs",
                "inLanguage": "en-US",
                "publisher": {
                    "@id": "https://www.abuqitmirlabs.tech/#organization"
                }
            },
            {
                "@type": "WebPage",
                "@id": "https://www.abuqitmirlabs.tech/white-label-local-seo#webpage",
                "url": canonicalUrl,
                "name": pageTitle,
                "description": pageDescription,
                "inLanguage": "en-US",
                "isPartOf": {
                    "@id": "https://www.abuqitmirlabs.tech/#website"
                },
                "about": {
                    "@id": "https://www.abuqitmirlabs.tech/white-label-local-seo#service"
                },
                "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": ogImageUrl,
                    "width": 1200,
                    "height": 630
                },
                "breadcrumb": {
                    "@id": "https://www.abuqitmirlabs.tech/white-label-local-seo#breadcrumb"
                }
            },
            {
                "@type": "Service",
                "@id": "https://www.abuqitmirlabs.tech/white-label-local-seo#service",
                "name": "White Label Local SEO Services for Agencies",
                "description": pageDescription,
                "url": canonicalUrl,
                "provider": {
                    "@id": "https://www.abuqitmirlabs.tech/#organization"
                },
                "areaServed": [
                    { "@type": "Country", "name": "Pakistan" },
                    { "@type": "Country", "name": "United States" },
                    { "@type": "Country", "name": "United Kingdom" },
                    { "@type": "Country", "name": "United Arab Emirates" },
                    { "@type": "Country", "name": "Saudi Arabia" }
                ],
                "serviceType": "White Label Local SEO",
                "offers": {
                    "@type": "Offer",
                    "name": "White Label Local SEO Agency Plan",
                    "description": "Brandable local SEO delivery for agencies — audits, citation management, GBP optimisation, and PDF reports under your brand starting at $350 USD/month.",
                    "priceSpecification": {
                        "@type": "PriceSpecification",
                        "minPrice": "350",
                        "maxPrice": "900",
                        "priceCurrency": "USD",
                        "unitText": "MONTH"
                    }
                }
            },
            {
                "@type": "FAQPage",
                "@id": "https://www.abuqitmirlabs.tech/white-label-local-seo#faq",
                "isPartOf": {
                    "@id": "https://www.abuqitmirlabs.tech/white-label-local-seo#webpage"
                },
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
                "@id": "https://www.abuqitmirlabs.tech/white-label-local-seo#breadcrumb",
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
                        "name": "Local SEO for Small Business",
                        "item": "https://www.abuqitmirlabs.tech/local-seo-for-small-business"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "White Label Local SEO",
                        "item": canonicalUrl
                    }
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[#080808] text-white selection:bg-[#ccff00] selection:text-black font-sans antialiased">
            <SEO
                title={pageTitle}
                description={pageDescription}
                canonical={canonicalUrl}
                keywords="white label local SEO services for agencies, white label local SEO, local SEO reseller, agency white label SEO, white label citation building, white label GBP optimization"
                ogImage={ogImageUrl}
                ogImageAlt="White Label Local SEO Services for Agencies - AbuQitmirLabs"
                twitterImage={ogImageUrl}
                schema={jsonLdData}
            />

            <Header />

            <main className="pt-28 md:pt-36 relative">
                <Breadcrumbs disableSchema={true} customItems={[
                    { name: 'HQ', to: '/' },
                    { name: 'LOCAL SEO FOR SMALL BUSINESS', to: '/local-seo-for-small-business' },
                    { name: 'WHITE LABEL LOCAL SEO' }
                ]} />

                {/* Hero Section */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto py-16 md:py-24 border-b border-white/10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-mono font-bold tracking-widest uppercase mb-6">
                            <Building2 className="w-3.5 h-3.5" />
                            AGENCY PARTNER PROGRAMME • WHOLESALE FROM $350/MO
                        </div>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-medium tracking-tight text-white leading-[1.1] mb-8">
                            White Label Local SEO Services <em className="text-[#ccff00] italic font-normal">for Agencies</em>
                        </h1>

                        {/* GEO Direct Answer Callout */}
                        <div className="my-8 p-6 md:p-8 rounded-2xl bg-zinc-900/90 border-2 border-[#ccff00]/40 text-left shadow-[0_0_30px_rgba(204,255,0,0.08)]">
                            <h2 className="text-xs font-mono uppercase tracking-widest text-[#ccff00] mb-2 font-bold">
                                Direct Answer: What Are White Label Local SEO Services for Agencies?
                            </h2>
                            <p className="text-base md:text-lg text-zinc-200 leading-relaxed font-normal">
                                <strong>White label local SEO services for agencies</strong> let digital marketing firms outsource Google Business Profile optimization, NAP citation cleanup, and monthly map-pack reporting under their own agency logo and brand name at 35–50% wholesale margins starting at $350/month per location.
                            </p>
                        </div>

                        <p className="text-lg md:text-xl text-zinc-300 font-sans leading-relaxed mb-10 max-w-4xl">
                            Fully brandable local SEO fulfillment — citations, GBP optimization, and client-ready PDF reports — under NDA and strictly behind the scenes. Read our guide on <Link to="/blog/white-label-local-seo-how-agencies-evaluate-partners" className="text-[#ccff00] hover:underline font-medium">how agencies evaluate white label local SEO partners</Link> or review our <Link to="/seo-mastery" className="text-[#ccff00] hover:underline font-medium">full technical SEO capabilities</Link>.
                        </p>
                        <div className="flex flex-wrap gap-4 items-center">
                            <Link 
                                to="/contact" 
                                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold text-sm rounded-xl hover:bg-[#b0d600] hover:text-black transition-all brutalist-shadow flex items-center gap-2 uppercase tracking-wider"
                                style={{ color: '#000000' }}
                            >
                                <span className="text-black font-black" style={{ color: '#000000' }}>Request Reseller Rate Card</span>
                                <ArrowRight className="w-4 h-4 text-black" style={{ color: '#000000' }} />
                            </Link>
                            <Link 
                                to="/local-seo-for-small-business" 
                                className="px-8 py-4 bg-zinc-900 text-white font-bold text-sm border border-white/20 rounded-xl hover:bg-zinc-800 transition-all flex items-center gap-2 uppercase tracking-wider"
                            >
                                View Direct Local SEO Services
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
                                    "White Label Local SEO",
                                    "Fully Brandable PDF Audits",
                                    "Reseller Agency Margins",
                                    "Multi-Market Fulfilment",
                                    "Zero Visibility Conflict",
                                    "Scalable Local SEO Execution"
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
                            Agency Reseller Framework
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif font-medium text-white">
                            White Label Fulfilment Built for Scale
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "BRANDABLE AUDIT REPORTS",
                                tagline: "YOUR LOGO, YOUR COLORS, OUR DATA",
                                icon: <FileSpreadsheet className="w-8 h-8 text-[#ff0099]" />,
                                description: "Deliver white-labeled PDF audits directly to your clients. Detailed NAP analysis, map pack competitor gap analysis, and GBP health checks ready to send under your agency banner."
                            },
                            {
                                title: "WHOLESALE AGENCY MARGINS",
                                tagline: "35% TO 50% BELOW RETAIL PRICING",
                                icon: <DollarSign className="w-8 h-8 text-black" />,
                                description: "Our reseller packages are priced at wholesale rates, giving your agency generous profit margins while providing clients with elite local SEO execution."
                            },
                            {
                                title: "STRICT NDAS & ZERO CONFLICT",
                                tagline: "YOUR CLIENT RELATIONSHIP IS SACRED",
                                icon: <Building2 className="w-8 h-8 text-[#ff0099]" />,
                                description: "We operate completely behind the curtain. We sign binding non-disclosure agreements and never contact or market to your agency's end clients."
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

                {/* What White Label Means Here */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto py-20 border-b border-white/10">
                    <div className="grid md:grid-cols-12 gap-12 items-start">
                        <div className="md:col-span-5">
                            <span className="text-[#ccff00] text-xs font-mono font-bold tracking-widest uppercase block mb-3">
                                What White Label Means Here
                            </span>
                            <h2 className="text-3xl md:text-5xl font-serif font-medium text-white leading-tight mb-6">
                                Your Brand. Our Execution. Zero Visibility Conflict.
                            </h2>
                        </div>
                        <div className="md:col-span-7 space-y-6 text-zinc-300 text-base md:text-lg leading-relaxed font-sans">
                            <p>
                                <strong className="text-white font-semibold">White label local SEO</strong> is a fulfilment arrangement where AbuQitmirLabs delivers the actual campaign work — keyword research, citation building, Google Business Profile management, on-page localisation — while every client-facing document carries your agency's name, logo, and colours. The end client sees a professional, coherent service from you. They have no reason to know who builds it.
                            </p>
                            <p>
                                Our white label local SEO solutions seamlessly complement our direct <Link to="/local-seo-for-small-business" className="text-[#ccff00] hover:underline font-medium">Local SEO for Small Businesses</Link>, high-authority <Link to="/guest-post-service" className="text-[#ccff00] hover:underline font-medium">Guest Post Service</Link>, manual <Link to="/local-seo-citation-building" className="text-[#ccff00] hover:underline font-medium">Citation Building</Link>, forensic <Link to="/local-seo-audit" className="text-[#ccff00] hover:underline font-medium">Local SEO Audits</Link>, and holistic <Link to="/seo-mastery" className="text-[#ccff00] hover:underline font-medium">SEO Mastery</Link> services. Agencies can also white-label our <Link to="/custom-software" className="text-[#ccff00] hover:underline font-medium">Custom Software</Link>, high-performance <Link to="/web-development" className="text-[#ccff00] hover:underline font-medium">Web Development</Link>, native <Link to="/mobile-app-development" className="text-[#ccff00] hover:underline font-medium">Mobile Apps</Link>, autonomous <Link to="/ai-agent-development" className="text-[#ccff00] hover:underline font-medium">AI Agents</Link>, and localized <Link to="/content-writing" className="text-[#ccff00] hover:underline font-medium">Content Writing</Link>. Review client success stories in our <Link to="/case-studies" className="text-[#ccff00] hover:underline font-medium">Case Studies</Link> and <Link to="/blog" className="text-[#ccff00] hover:underline font-medium">Blog</Link>, read more <Link to="/about" className="text-[#ccff00] hover:underline font-medium">about us</Link>, or <Link to="/contact" className="text-[#ccff00] hover:underline font-medium">contact us</Link> to start your reseller agreement.
                            </p>
                            <p>
                                AbuQitmirLabs runs active local SEO campaigns across the US, UK, Pakistan, Canada, Poland, and Australia — meaning your agency can accept clients in multiple markets without needing geographic expertise in every territory. Our team handles the citation ecosystem, directory hierarchy, and ranking factors specific to each country natively.
                            </p>
                            <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 mt-6">
                                <h3 className="text-xl font-serif font-medium text-white mb-3">What "Fully Branded" Actually Covers</h3>
                                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                                    When we say <strong className="text-white">white label local SEO services</strong>, we mean every client-facing output: the onboarding audit document, the citation build summary, the monthly ranking report, the GBP optimisation checklist. All of it arrives as an unbranded file your team drops your logo onto — or, if you supply brand assets upfront, pre-branded and ready to send. No AbuQitmirLabs mentions, footers, watermarks, or metadata.
                                </p>
                            </div>

                            {/* Authoritative External Agency & SEO Standards */}
                            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                                <span className="text-zinc-500 uppercase tracking-widest font-bold">Authoritative Agency Resources:</span>
                                <a href="https://support.google.com/business/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#ccff00] transition-colors">
                                    Google Business Profile Guidelines <ExternalLink className="w-3 h-3" />
                                </a>
                                <span className="text-zinc-700">•</span>
                                <a href="https://www.searchenginejournal.com/category/local-seo/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#ccff00] transition-colors">
                                    Search Engine Journal Local SEO <ExternalLink className="w-3 h-3" />
                                </a>
                                <span className="text-zinc-700">•</span>
                                <a href="https://moz.com/blog/category/local-seo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#ccff00] transition-colors">
                                    Moz Local Research <ExternalLink className="w-3 h-3" />
                                </a>
                                <span className="text-zinc-700">•</span>
                                <a href="https://www.brightlocal.com/research/local-search-ranking-factors/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#ccff00] transition-colors">
                                    BrightLocal Ranking Factors <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Every Deliverable, Fully Brandable Grid */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto py-20 border-b border-white/10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[#ccff00] text-xs font-mono font-bold tracking-widest uppercase block mb-3">
                            What We Deliver
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-6">
                            Every Deliverable, Fully Brandable
                        </h2>
                        <p className="text-zinc-400 text-base md:text-lg">
                            We equip your agency with high-margin, high-value local SEO assets that make your team look like absolute experts to your end clients.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {deliverables.map((item, idx) => (
                            <div key={idx} className="bg-zinc-950 border border-white/10 p-8 rounded-2xl hover:border-[#ccff00]/40 transition-all flex flex-col justify-between">
                                <div>
                                    <div className="mb-6">{item.icon}</div>
                                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How It Works - 4 Steps */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto py-20 border-b border-white/10">
                    <span className="text-[#ccff00] text-xs font-mono font-bold tracking-widest uppercase block mb-3">
                        How It Works
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-white leading-tight mb-12">
                        From Agency Onboarding to First Client Report — 4 Steps
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        {[
                            { num: "1", title: "Agency onboarding call", desc: "We align on your pricing model, client markets, report format preferences, and turnaround expectations. You supply brand assets once; we template everything from that point forward." },
                            { num: "2", title: "Client brief arrives", desc: "You pass us the client's business name, location, target service area, primary keywords, and competitor URLs. We handle the research and execution from there — no back-and-forth between your client and our team." },
                            { num: "3", title: "We build and optimise", desc: "Citation campaign, GBP updates, on-page localisation, and schema implementation are executed to our standard — the same work we do for direct clients, at the same quality level." },
                            { num: "4", title: "You receive and deliver", desc: "White-labeled deliverables land in your inbox on the agreed schedule. You review, forward to your client, and maintain the relationship. AbuQitmirLabs stays completely in the background." }
                        ].map((step, idx) => (
                            <div key={idx} className="bg-zinc-950 border border-white/10 p-8 rounded-2xl flex gap-6 items-start hover:border-[#ccff00]/40 transition-all">
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
                </section>

                {/* Pricing / Wholesale Rates */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto py-20 border-b border-white/10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[#ccff00] text-xs font-mono font-bold tracking-widest uppercase block mb-3">
                            Agency Pricing
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-6">
                            Wholesale Rates Built for Agency Margins
                        </h2>
                        <p className="text-zinc-400 text-base md:text-lg">
                            White label pricing is set 35–50% below our direct-client rates, leaving clear room for your agency to apply its own margin. Per-location pricing makes scaling predictable.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-zinc-950 border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-bold font-mono text-zinc-500 uppercase tracking-widest block mb-4">Starter — per location</span>
                                <div className="text-4xl font-serif font-bold text-white mb-6">$350 <span className="text-sm font-sans font-normal text-zinc-500">/ mo</span></div>
                                <ul className="space-y-3 text-zinc-300 text-sm mb-8 border-t border-white/10 pt-6">
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> GBP audit and optimisation</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Foundational citation build (30 directories)</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> NAP consistency check</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> White-label monthly ranking report</li>
                                </ul>
                            </div>
                            <Link to="/contact" className="w-full py-3 bg-zinc-900 border border-white/20 text-white font-bold text-xs uppercase text-center rounded-xl hover:bg-zinc-800 transition-all">
                                Partner at Starter
                            </Link>
                        </div>

                        <div className="bg-zinc-950 border-2 border-[#ccff00] p-8 rounded-2xl flex flex-col justify-between relative shadow-[0_0_30px_rgba(204,255,0,0.1)]">
                            <div className="absolute -top-3 right-6 bg-[#ccff00] text-black font-mono font-bold text-[10px] uppercase px-3 py-1 rounded-full">
                                Most Popular
                            </div>
                            <div>
                                <span className="text-xs font-bold font-mono text-[#ccff00] uppercase tracking-widest block mb-4">Most Popular — per location</span>
                                <div className="text-4xl font-serif font-bold text-white mb-6">$650 <span className="text-sm font-sans font-normal text-zinc-500">/ mo</span></div>
                                <ul className="space-y-3 text-zinc-300 text-sm mb-8 border-t border-white/10 pt-6">
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Everything in Starter, plus:</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Deep citation management (60+ directories)</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Localised on-page content updates</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Review strategy and response templates</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Branded audit PDF for client presentation</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Monthly strategy notes for account managers</li>
                                </ul>
                            </div>
                            <Link 
                                to="/contact" 
                                className="w-full py-3 bg-[#ccff00] text-black font-extrabold text-xs uppercase text-center rounded-xl hover:bg-[#b0d600] transition-all flex items-center justify-center gap-2"
                                style={{ color: '#000000' }}
                            >
                                <span className="text-black font-black" style={{ color: '#000000' }}>Select Most Popular</span>
                            </Link>
                        </div>

                        <div className="bg-zinc-950 border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-bold font-mono text-zinc-500 uppercase tracking-widest block mb-4">Agency Enterprise</span>
                                <div className="text-4xl font-serif font-bold text-white mb-6">Custom</div>
                                <ul className="space-y-3 text-zinc-300 text-sm mb-8 border-t border-white/10 pt-6">
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> 10+ locations under management</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Multi-market (UK, US, AU, PK) campaigns</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Dedicated fulfilment contact</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Custom reporting cadence and format</li>
                                    <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[#ccff00]" /> Volume pricing and SLA agreement</li>
                                </ul>
                            </div>
                            <Link to="/contact" className="w-full py-3 bg-zinc-900 border border-white/20 text-white font-bold text-xs uppercase text-center rounded-xl hover:bg-zinc-800 transition-all">
                                Request Enterprise SLA
                            </Link>
                        </div>
                    </div>

                    <p className="text-zinc-400 text-center text-sm mt-10 max-w-2xl mx-auto">
                        Prices above are agency wholesale rates. Your agency sets its own end-client pricing. Minimum engagement is one location for three months to allow ranking data to accumulate meaningfully.
                    </p>
                </section>

                {/* FAQ Section */}
                <section className="px-6 md:px-12 max-w-5xl mx-auto py-20 border-b border-white/10">
                    <span className="text-[#ccff00] text-xs font-mono font-bold tracking-widest uppercase block mb-3 text-center">
                        Common Questions
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-12 text-center">
                        White Label Local SEO — FAQ
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
                            Ready to Add Local SEO to Your Agency's Service Menu?
                        </h2>
                        <p className="text-zinc-300 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                            Tell us your client volume, target markets, and margin expectations — we'll scope a reseller arrangement that works for both sides.
                        </p>
                        <Link 
                            to="/contact" 
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:bg-[#b0d600] transition-all brutalist-shadow"
                            style={{ color: '#000000' }}
                        >
                            <span className="text-black font-black" style={{ color: '#000000' }}>Start the Partnership Conversation</span>
                            <ArrowRight className="w-5 h-5 text-black" style={{ color: '#000000' }} />
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

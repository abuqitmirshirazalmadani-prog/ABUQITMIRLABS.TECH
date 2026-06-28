"use client";

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  BarChart3, 
  SearchCode, 
  Workflow, 
  Target, 
  ShieldCheck, 
  ArrowUpRight,
  Plus,
  Monitor,
  LayoutGrid,
  FileSearch,
  Globe,
  Star,
  Zap,
  TrendingUp,
  Code2,
  Smartphone,
  Cpu,
  Settings,
  HelpCircle,
  Clock,
  CheckCircle2,
  Sliders,
  Database
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import HeroText from '../components/ui/hero-shutter-text';
import SEOPricing from '../components/SEOPricing';

const SEOPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqData = [
    {
      q: "What is search engine optimization (SEO), and why is it important?",
      a: "Search engine optimization is the practice of improving your website's visibility in organic (non-paid) search results. When users search for products or services you offer, you want your website to appear at the top. Professional SEO services ensure your website is optimized to rank for relevant search terms, driving targeted traffic and generating leads."
    },
    {
      q: "How long does SEO take to show results?",
      a: "SEO is a long-term strategy. While you may see some improvements within 1–3 months, meaningful results typically take 4–6 months. Sustainable rankings and authority often develop over 6–12 months of consistent effort. We provide regular progress updates and manage expectations throughout the process."
    },
    {
      q: "How much do professional SEO services cost?",
      a: "Our professional SEO services start at $250/month for local SEO and $1,000+/month for comprehensive organic growth. We provide transparent pricing with clear deliverables and no hidden fees."
    },
    {
      q: "Do you guarantee #1 rankings?",
      a: "No legitimate SEO company can guarantee #1 rankings. Search engines use complex algorithms that are constantly evolving. We guarantee transparent work, data-driven strategies, and continuous improvement—but we cannot guarantee specific rankings due to external market factors."
    },
    {
      q: "How do you measure SEO success?",
      a: "We measure success through a combination of: organic traffic growth, keyword ranking improvements, lead and conversion increases, revenue attribution from organic search, and competitive positioning improvements."
    },
    {
      q: "Can you help a small business with SEO?",
      a: "Yes! We have specific strategies and packages designed for small businesses and startups. Our SEO services scale to meet any budget and business size, with a focus on delivering maximum ROI from your investment."
    }
  ];

  const techStack = [
    { category: "Keyword Research", tools: "SEMrush, Ahrefs, Google Keyword Planner, AnswerThePublic", purpose: "Discover and analyze target keywords" },
    { category: "Technical SEO", tools: "Screaming Frog, Google Search Console, Sitebulb", purpose: "Crawl and audit website infrastructure" },
    { category: "Rank Tracking", tools: "SEMrush Position Tracking, AccuRanker, Ahrefs Rank Tracker", purpose: "Monitor keyword rankings" },
    { category: "Backlink Analysis", tools: "Ahrefs, Majestic, Moz Link Explorer", purpose: "Analyze and build link authority" },
    { category: "Content Optimization", tools: "Surfer SEO, Clearscope, Frase", purpose: "Optimize content for relevance and SEO" },
    { category: "Analytics", tools: "Google Analytics 4, Google Tag Manager, Hotjar", purpose: "Track user behavior and conversions" },
    { category: "Schema Markup", tools: "Google Structured Data Testing Tool, Schema Markup Generator", purpose: "Implement and validate schema" },
    { category: "Monitoring", tools: "Google Search Console, Bing Webmaster Tools", purpose: "Track crawling, indexing, and performance" }
  ];

  return (
    <div className="bg-[#f4f4f5] text-black font-sans antialiased overflow-x-hidden min-h-screen relative selection:bg-[#ccff00]">
      <Helmet>
        <title>SEO Services | Professional Search Engine Optimization Company | AbuQitmirLabs</title>
        <meta name="description" content="AbuQitmirLabs is a premier search engine optimization company delivering pro SEO services, organic growth, technical SEO audits, and map dominance globally." />
        <link rel="canonical" href="https://abuqitmirlabs.tech/seo-mastery" />
        
        {/* Open Graph */}
        <meta property="og:title" content="SEO Services | Professional Search Engine Optimization Company | AbuQitmirLabs" />
        <meta property="og:description" content="AbuQitmirLabs is a premier search engine optimization company delivering pro SEO services, organic growth, technical SEO audits, and map dominance globally." />
        <meta property="og:url" content="https://abuqitmirlabs.tech/seo-mastery" />
        <meta property="og:type" content="website" />

        {/* Schema Markup */}
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
                  "name": "SEO Mastery",
                  "item": "https://abuqitmirlabs.tech/seo-mastery"
                }
              ]
            })
          }}
        ></script>
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Professional SEO Services",
              "description": "Expert data-driven Search Engine Optimization, Technical Audits, and Organic Authority building with transparent reporting.",
              "provider": {
                "@type": "Organization",
                "name": "AbuQitmirLabs",
                "url": "https://abuqitmirlabs.tech"
              },
              "serviceType": "Search Engine Optimization",
              "areaServed": ["US", "GB", "Europe", "Global"]
            })
          }}
        ></script>
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqData.map(item => ({
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.a
                }
              }))
            })
          }}
        ></script>
      </Helmet>

      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-24 md:pt-32 pb-20 px-6 z-10">
        <motion.div 
          initial={{ opacity: 0, rotate: -2 }}
          animate={{ opacity: 1, rotate: -2 }}
          className="inline-block bg-white border-4 border-black px-6 py-2 rounded-full font-black mb-8 brutalist-shadow lowercase text-xl"
        >
          We build digital empires
        </motion.div>

        <div className="mb-4">
          <HeroText text="MASTERY" />
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-black text-center mb-10 leading-[0.95] max-w-6xl uppercase"
        >
          SEO Mastery: <br />
          <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Data-Driven Search</span> <br />
          <span className="text-[#ccff00]">| Engine Optimization</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-zinc-800 text-center max-w-4xl mb-12 leading-relaxed font-bold"
        >
          Ranking isn't about stuffing keywords — it's about technical health plus content that actually answers search intent. We run full technical audits, fix crawl/indexing issues, and build content structures that Google can understand and trust.
        </motion.p>

        {/* Core Capabilities Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mx-auto mb-12 max-w-4xl border-y border-black/10 py-8 px-6 bg-white/50 backdrop-blur-sm rounded-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-left">
            {[
              "Technical SEO Audits & Crawl Error Fixes",
              "On-Page & Semantic Entity Optimization",
              "XML Sitemap & Schema Markup Implementation",
              "Local SEO & Google Business Profile Optimization",
              "Content Strategy Aligned with Search Intent"
            ].map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-3 group">
                <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0 group-hover:bg-[#ff0099] transition-colors duration-300" />
                <span className="text-sm font-sans font-bold text-zinc-800 tracking-tight leading-relaxed group-hover:text-black transition-colors duration-300">{bullet}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a 
            href="https://wa.me/923233260859"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-8 bg-black text-[#ccff00] text-xl font-black border-4 border-black rounded-3xl brutalist-shadow hover:scale-105 transition-transform flex flex-col items-center justify-center gap-2 uppercase"
          >
            <Zap size={24} />
            Request a Free SEO Audit
          </a>
          <button 
            onClick={() => {
              const el = document.getElementById('seo-pricing');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-12 py-8 bg-white text-black text-xl font-black border-4 border-black rounded-3xl brutalist-shadow hover:scale-105 transition-transform flex flex-col items-center justify-center gap-2 uppercase"
          >
            <Star size={24} />
            See SEO Pricing &amp; Packages
          </button>
        </motion.div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden transform z-20 bg-[#ccff00] w-full border-y-[6px] border-black py-6 relative shadow-[0_12px_0_0_rgba(0,0,0,1)] -rotate-1">
        <div className="flex whitespace-nowrap w-max animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 text-3xl md:text-5xl font-black tracking-tighter uppercase items-center text-black px-12 font-sans font-black">
              <span>professional seo services</span> <Star className="fill-current" size={36} />
              <span>search engine optimization company</span> <Star className="fill-current" size={36} />
              <span>organic traffic growth specialists</span> <Star className="fill-current" size={36} />
              <span>technical seo audits</span> <Star className="fill-current" size={36} />
              <span>hyper-localized google maps ranking</span> <Star className="fill-current" size={36} />
              <span>json-ld structured schema schema</span> <Star className="fill-current" size={36} />
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: The Problem / Opportunity */}
      <section className="py-32 border-b-[8px] border-black bg-white relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-16">
            <div>
              <div className="inline-block bg-[#ff0099] text-white font-black px-6 py-2 border-4 border-black rounded-lg mb-8 transform -rotate-3 brutalist-shadow uppercase text-xl">
                The Dilemma
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter leading-[0.9] uppercase mb-4">
                Is your website invisible to your ideal customers?
              </h2>
            </div>
            
            <div className="bg-[#ccff00]/10 border-4 border-black p-10 rounded-[40px] brutalist-shadow">
              <p className="text-lg md:text-xl font-bold leading-relaxed text-black font-sans">
                Many businesses invest heavily in <a href="/web-development" className="text-blue-600 hover:underline">Web Development</a> or <a href="/custom-software" className="text-blue-600 hover:underline">Custom Software Solutions</a> but neglect the critical optimization needed to be found. Without a strategic approach to search engine optimization, even the most beautifully designed website remains undiscovered—buried beneath competitors who understand the importance of visibility. Our team is based in Karachi, Pakistan, offering global-grade SEO audits with high-ROI execution.
              </p>
            </div>
          </div>

          <div className="border-t-4 border-black pt-16">
            <h3 className="text-2xl md:text-3xl font-black text-black uppercase mb-10 tracking-tight">
              The AbuQitmirLabs Difference:
            </h3>
            <p className="text-lg text-zinc-700 font-medium mb-10 max-w-4xl">
              Our <strong className="text-black font-extrabold">technical SEO services</strong> start with a comprehensive audit that uncovers every opportunity for improvement. We analyze:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "On-page factors", desc: "Content quality, keyword targeting, and meta-optimization strategies" },
                { title: "Technical infrastructure", desc: "Site speed optimization, mobile responsiveness, and crawlability diagnostics" },
                { title: "Backlink profile", desc: "Authority evaluation, topical relevance, and premium brand growth opportunities" },
                { title: "User experience", desc: "Engagement metrics, bounce rates, and high-converting pathway optimization" }
              ].map((factor, i) => (
                <div key={i} className="bg-[#f4f4f5] border-4 border-black p-8 rounded-2xl brutalist-shadow">
                  <span className="text-xs font-mono text-[#ff0099] font-bold block mb-2">// 0{i+1}</span>
                  <h4 className="text-lg font-black text-black uppercase tracking-tight mb-2">{factor.title}</h4>
                  <p className="text-sm font-bold leading-relaxed text-zinc-700">{factor.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-black text-[#ccff00] p-8 border-4 border-black rounded-3xl brutalist-shadow text-center max-w-3xl mx-auto">
              <p className="text-lg font-bold">
                Our <strong className="text-white font-extrabold">SEO audit services</strong> provide a clear roadmap for improvement, prioritizing actions that deliver the highest ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Our SEO Framework */}
      <section className="py-32 bg-[#ccff00] relative z-10 px-6 border-b-[8px] border-black shadow-[inset_0_20px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block bg-black text-[#ccff00] font-black px-6 py-2 border-4 border-black rounded-lg mb-8 transform rotate-2 brutalist-shadow uppercase text-xl">
            Our SEO Framework
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-8 uppercase leading-[0.95]">
            We follow a proven methodology <br />
            <span className="text-white">combining technical rigor with strategy.</span>
          </h2>

          <div className="grid grid-cols-1 gap-8 mt-16 text-black">
            {[
              {
                step: "01",
                icon: <Search className="w-10 h-10" />,
                title: "🔍 Discovery & Audit",
                quote: "Understand before you act.",
                desc: "We begin with a comprehensive analysis of your website, competitors, and market landscape. This phase includes:",
                items: [
                  "Technical SEO audit: Crawlability, indexing, site speed, mobile usability, and Core Web Vitals",
                  "Content analysis: Assessing quality, relevance, keyword coverage, and gap identification",
                  "Competitor benchmarking: Analyzing your competition's SEO strengths and weaknesses",
                  "Backlink analysis: Evaluating your current authority and link building opportunities",
                  "Conversion pathway analysis: Understanding how users interact with your site"
                ],
                deliverable: "Detailed SEO audit report with prioritized recommendations."
              },
              {
                step: "02",
                icon: <Target className="w-10 h-10" />,
                title: "🎯 Keyword Strategy & Content Optimization",
                quote: "The right words for the right audience.",
                desc: "We develop a comprehensive keyword strategy that aligns with your business goals and audience intent:",
                items: [
                  "Keyword mapping: Assigning target keywords to specific pages",
                  "Content optimization: Enhancing existing content for relevance and rankings",
                  "Content gap analysis: Identifying opportunities for new content creation",
                  "On-page optimization: Title tags, meta descriptions, headers, alt text, and internal linking",
                  "Schema markup: Implementing structured data for enhanced search results"
                ],
                deliverable: "Keyword strategy document and optimized content briefs."
              },
              {
                step: "03",
                icon: <Code2 className="w-10 h-10" />,
                title: "⚙️ Technical SEO Implementation",
                quote: "The foundation of visibility.",
                desc: "We optimize the technical architecture of your website to ensure search engines can crawl, index, and rank your content effectively:",
                items: [
                  "Core Web Vitals optimization: Improving loading speed, interactivity, and visual stability",
                  "Mobile optimization: Ensuring seamless mobile experience",
                  "Site architecture: Improving structure and navigation for better crawling",
                  "XML sitemaps & robots.txt: Ensuring proper indexing",
                  "Security enhancements: HTTPS migration and security best practices"
                ],
                deliverable: "Fully optimized technical infrastructure."
              },
              {
                step: "04",
                icon: <Workflow className="w-10 h-10" />,
                title: "🧠 Off-Page SEO & Authority Building",
                quote: "Building trust through quality connections.",
                desc: "We build your authority through strategic link acquisition and brand visibility:",
                items: [
                  "Link acquisition strategy: Earning high-quality backlinks from authoritative sources",
                  "Digital PR: Securing media coverage and mentions",
                  "Content distribution: Syndicating content across relevant platforms",
                  "Directory submissions: Building citations and local signals",
                  "Social signals: Leveraging social media for brand visibility"
                ],
                deliverable: "Monthly link acquisition reports and authority growth tracking."
              },
              {
                step: "05",
                icon: <BarChart3 className="w-10 h-10" />,
                title: "📊 Performance Monitoring & Optimization",
                quote: "Measure, refine, repeat.",
                desc: "We continuously monitor performance and refine our approach to maximize results:",
                items: [
                  "Rank tracking: Monitoring keyword positions across search engines",
                  "Traffic analytics: Analyzing user behavior and engagement",
                  "Conversion tracking: Measuring leads, sales, and revenue impact",
                  "Competitor monitoring: Tracking competitive landscape and market share",
                  "Algorithm updates: Staying ahead of search engine changes"
                ],
                deliverable: "Monthly performance reports with actionable insights."
              }
            ].map((p, idx) => (
              <div key={idx} className="bg-white border-4 border-black p-10 rounded-3xl brutalist-shadow">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-4 mb-6">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] tracking-widest bg-black text-white px-3 py-1.5 rounded uppercase font-bold">PHASE {p.step}</span>
                    <h3 className="text-xl md:text-2xl font-black">{p.title}</h3>
                  </div>
                  <em className="text-zinc-500 font-serif font-black">"{p.quote}"</em>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5">
                    <p className="text-base font-bold text-zinc-800 font-sans mb-4 leading-relaxed">{p.desc}</p>
                    <div className="p-4 bg-zinc-100 border-2 border-black rounded-xl">
                      <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#ff0099] block mb-1">Deliverable Output //</span>
                      <p className="text-xs font-mono font-extrabold text-black uppercase">{p.deliverable}</p>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <ul className="space-y-2">
                      {p.items.map((item, i) => (
                        <li key={i} className="flex gap-3 text-xs md:text-sm font-bold text-black font-sans leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Technology & Tools */}
      <section className="py-32 bg-white relative z-10 px-6 border-b-[8px] border-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-mono text-zinc-500 block mb-2 font-black">// SECTION 4: SEO TOOLING</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-black uppercase mb-4">
              Technology &amp; Tools We Command
            </h2>
            <p className="text-base md:text-lg text-zinc-700 max-w-2xl font-bold font-sans lead-relaxed">
              We leverage the most sophisticated tools in the industry to optimize, analyze, and measure your SEO performance.
            </p>
          </div>

          <div className="border-4 border-black rounded-3xl overflow-hidden brutalist-shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white font-mono text-xs uppercase tracking-widest border-b-4 border-black">
                    <th className="p-6">Category</th>
                    <th className="p-6">Tools</th>
                    <th className="p-6">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black text-xs md:text-sm font-bold text-zinc-800">
                  {techStack.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#ccff00]/10 transition-colors bg-white">
                      <td className="p-6 bg-zinc-100/50 font-mono text-xs uppercase tracking-wider text-black font-black border-r-2 border-black">{row.category}</td>
                      <td className="p-6 border-r-2 border-black font-sans font-black text-black">{row.tools}</td>
                      <td className="p-6 font-sans font-medium text-zinc-600">{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Why AbuQitmirLabs */}
      <section className="py-32 bg-[#f4f4f5] relative z-10 px-6 border-b-[8px] border-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <span className="text-xs font-mono text-[#ff0099] mb-4 uppercase tracking-[0.4em] font-bold block">[ SECTION 5: INSTITUTIONAL REASON ]</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-black uppercase tracking-tight">
              Why Choose AbuQitmirLabs
            </h2>
            <p className="mt-4 max-w-4xl mx-auto text-base md:text-lg text-zinc-700 font-bold leading-relaxed font-sans">
              As a premier software development company headquartered in Karachi, Pakistan, AbuQitmirLabs brings a unique perspective to search engine optimization—one that combines technical development expertise with strategic SEO knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Developer-Led SEO",
                desc: "Unlike pure-play SEO agencies, our approach is built on a foundation of technical development. We understand the code behind your website, enabling us to implement technical optimizations that many agencies cannot."
              },
              {
                title: "Holistic Digital Strategy",
                desc: "We don't optimize your website in isolation. Our SEO services integrate with your entire digital strategy—aligning with web development, content creation, and marketing initiatives."
              },
              {
                title: "Proven Results Across Industries",
                desc: "From SaaS startups to established brands, we have delivered measurable results for clients across fintech, healthcare, retail, and logistics."
              },
              {
                title: "Transparent Reporting",
                desc: "Weekly progress updates, monthly performance reports, and clear communication—you always know exactly what we're doing and what results we're achieving."
              }
            ].map((strength, idx) => (
              <div key={idx} className="bg-white border-4 border-black p-10 rounded-2xl brutalist-shadow relative overflow-hidden transition-transform hover:-translate-y-1">
                <span className="text-[#ff0099] font-mono text-xs block mb-4 font-black">[ 0{idx + 1} // STRENGTH ]</span>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white bg-black px-4 py-2 rounded mb-6 inline-block leading-none">
                  {strength.title}
                </h3>
                <p className="text-zinc-800 text-sm font-bold leading-relaxed font-sans">{strength.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Pricing & Packages */}
      <div id="seo-pricing">
        <SEOPricing />
      </div>

      {/* Which Package Is Right For You - requested content in Section 6 */}
      <section className="py-24 bg-black text-white relative z-10 px-6 border-b-[8px] border-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-black block mb-4">// SELECT YOUR BLUEPRINT</span>
            <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight uppercase">Which Package Is Right for You?</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Choose Local SEO Starter if:",
                items: [
                  "You're a small business or startup",
                  "You need to establish local visibility",
                  "You want to verify and optimize your Google Business Profile",
                  "Your budget is under $500/month"
                ],
                customStyle: "border-l-4 border-cyan-400 pl-6"
              },
              {
                title: "Choose Healthy Small Biz if:",
                items: [
                  "You're a growing business with existing local presence",
                  "You want to dominate local search results",
                  "You need ongoing review management and citation building",
                  "Your budget is $1,000–$2,000/month"
                ],
                customStyle: "border-l-4 border-purple-400 pl-6"
              },
              {
                title: "Choose Enterprise Agency if:",
                items: [
                  "You're an established brand in a competitive market",
                  "You need full-scale technical SEO and authority building",
                  "You require advanced schema markup and PR backlinks",
                  "Your budget is $1,500+/month"
                ],
                customStyle: "border-l-4 border-fuchsia-400 pl-6"
              },
              {
                title: "Choose DIY if:",
                items: [
                  "You have internal SEO resources",
                  "You prefer to manage tools and platforms yourself",
                  "You have a limited budget but technical capability"
                ],
                customStyle: "border-l-4 border-zinc-500 pl-6"
              }
            ].map((choice, i) => (
              <div key={i} className={`bg-zinc-900 border border-white/5 p-8 rounded-2xl ${choice.customStyle}`}>
                <h4 className="text-lg font-black text-white mb-4 uppercase tracking-tight">{choice.title}</h4>
                <ul className="space-y-2">
                  {choice.items.map((it, idx) => (
                    <li key={idx} className="flex gap-2.5 text-xs md:text-sm text-neutral-350 font-sans font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shrink-0 mt-2" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Country Marquee Component */}
      <CountryMarquee />

      {/* Section 7: Frequently Asked Questions */}
      <section className="py-32 bg-[#f4f4f5] border-b-[8px] border-black relative z-10 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-[#ff0099] mb-4 uppercase tracking-[0.5em] font-bold block">// SECTION 7: FAQ</span>
            <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter uppercase leading-none">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, idx) => (
              <details key={idx} className="group bg-white border-4 border-black rounded-2xl brutalist-shadow open:bg-white transition-all duration-300">
                <summary className="flex justify-between items-center p-6 md:p-8 cursor-pointer select-none group-open:bg-gray-100 rounded-t-xl transition-colors">
                  <span className="text-base md:text-xl font-bold font-display uppercase tracking-tighter">{faq.q}</span>
                  <div className="w-10 h-10 border-4 border-black rounded-full flex items-center justify-center transition-transform duration-300 group-open:rotate-45 bg-[#ccff00]">
                    <Plus className="w-6 h-6" />
                  </div>
                </summary>
                <div className="p-6 md:p-8 pt-0 border-t-4 border-black mt-4 font-sans font-bold">
                  <p className="text-sm md:text-base leading-relaxed pt-6 text-zinc-700">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Call to Action */}
      <section className="bg-[#ccff00] py-40 relative z-10 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-mono text-black block mb-4 font-black uppercase tracking-[0.3em]">// SECTION 8: LAUNCH PROJECT</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-black tracking-tighter mb-8 lowercase leading-[0.85] uppercase">
            Ready to Master <span className="text-transparent" style={{ WebkitTextStroke: '3px black' }}>Search Engine Rankings?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-zinc-900 font-bold max-w-2xl mx-auto mb-16 leading-relaxed">
            Stop competing in the shadows. Partner with AbuQitmirLabs to implement strategic SEO services that drive sustainable organic growth and establish your digital authority.
          </p>

          <div className="bg-white border-4 border-black p-8 md:p-10 rounded-3xl brutalist-shadow max-w-2xl mx-auto mb-16 text-left">
            <h3 className="text-xl md:text-2xl font-black uppercase text-black mb-2">Request a Free SEO Audit</h3>
            <p className="text-sm text-zinc-700 font-bold mb-6 font-sans">
              Our team will analyze your website's current performance and provide a comprehensive assessment of opportunities for improvement—at no cost.
            </p>
            <div className="flex border-t-2 border-black pt-4 justify-between items-center text-xs font-mono text-black font-extrabold tracking-widest uppercase">
              <span>Avg. Discovery Phase: 2 Weeks</span>
              <span>·</span>
              <span>Current Lead Time: 4 Weeks</span>
            </div>
          </div>

          <p className="text-base text-zinc-800 font-bold max-w-xl mx-auto mb-10 leading-relaxed">
            Let's discuss your SEO strategy. Our initial technical consultation and SEO audit are completely free.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-xl mx-auto">
            <a 
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-black text-[#ccff00] text-xl font-black px-12 py-6 border-4 border-black rounded-full brutalist-shadow hover:scale-105 transition-transform duration-300 uppercase shrink-0"
            >
              Request an SEO Strategy Plan
            </a>
            
            <div className="text-black font-black text-xs uppercase tracking-widest max-w-[200px] text-left border-l-4 border-black pl-6 pt-2 pb-2">
               ESTABLISHED COGNITIVE SYSTEMS CO.
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Services / Internal Siloing */}
      <section className="py-24 bg-[#f4f4f5] border-t-8 border-black relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xs font-mono text-black/40 mb-12 uppercase tracking-[0.4em] font-bold">[ RELATED_SYSTEMS ]</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Custom Software", path: "/custom-software", icon: <Code2 className="w-5 h-5" /> },
              { title: "Web Development", path: "/web-development", icon: <Globe className="w-5 h-5" /> },
              { title: "Mobile Apps", path: "/mobile-app-development", icon: <Smartphone className="w-5 h-5" /> },
              { title: "AI Agents", path: "/ai-agent-development", icon: <Cpu className="w-5 h-5" /> }
            ].map((link, i) => (
              <Link 
                key={i} 
                to={link.path} 
                className="group flex items-center justify-between p-8 bg-white border-4 border-black rounded-2xl brutalist-shadow transition-all hover:-translate-y-1 hover:bg-[#ccff00]"
              >
                <div className="flex items-center gap-4">
                  <div className="text-black bg-[#f4f4f5] border-2 border-black p-3 rounded-lg group-hover:bg-black group-hover:text-white transition-all">
                    {link.icon}
                  </div>
                  <span className="font-bold uppercase tracking-tight text-black">{link.title}</span>
                </div>
                <ArrowUpRight className="text-black/30 group-hover:text-black transition-colors" size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SEOPage;

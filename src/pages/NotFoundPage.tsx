import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Compass, Code2, Cpu, Globe, Smartphone, ShieldCheck, Mail } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const QUICK_DESTINATIONS = [
  {
    title: 'Custom Software Development',
    description: 'Bespoke B2B web platforms, ERPs, SaaS products, and cloud architectures with 100% IP ownership.',
    href: '/custom-software',
    category: 'Build Software',
  },
  {
    title: 'AI Agent & RAG Development',
    description: 'Production-ready autonomous AI agents, private RAG pipelines, and workflow automation.',
    href: '/ai-agent-development',
    category: 'Automate with AI',
  },
  {
    title: 'Web Application Development',
    description: 'High-performance Next.js and React web applications integrated with payments, CRMs, and APIs.',
    href: '/web-development',
    category: 'Build Software',
  },
  {
    title: 'Mobile App Development',
    description: 'Cross-platform Flutter, React Native, and native iOS/Android apps engineered for scale.',
    href: '/mobile-app-development',
    category: 'Build Software',
  },
  {
    title: 'Technical SEO & Search Authority',
    description: 'Crawl optimization, Schema.org entity graphs, Core Web Vitals, and AI search (GEO/AEO) visibility.',
    href: '/seo-mastery',
    category: 'Grow Demand',
  },
  {
    title: 'Growth Engineering Systems',
    description: 'Unified software engineering, AI automation, and demand generation built as one revenue system.',
    href: '/growth-engineering',
    category: 'Grow Demand',
  },
  {
    title: 'TajweedPage.com Case Study',
    description: 'How we engineered an AI-powered Quran learning platform and multi-country SEO architecture in 10 days.',
    href: '/case-studies/tajweedpage',
    category: 'Proof & Case Studies',
  },
  {
    title: 'Interactive Project Cost Estimator',
    description: 'Calculate realistic software, AI, and web development budgets with instant milestone breakdowns.',
    href: '/tools/project-cost-estimator',
    category: 'Free Tools',
  },
  {
    title: 'Our 5-Step Engineering Process',
    description: 'Explore how we scope, architect, test, and hand over production software with zero vendor lock-in.',
    href: '/about/our-process',
    category: 'Company',
  },
];

export default function NotFoundPage() {
  const [query, setQuery] = useState('');

  const filteredLinks = QUICK_DESTINATIONS.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#ccff00] selection:text-black flex flex-col">
      <SEO
        title="404 Page Not Found | AbuQitmirLabs"
        description="The page you requested could not be found. Search our engineering services, case studies, and technical guides or return to the AbuQitmirLabs homepage."
        robots="noindex, follow"
      />

      <Header />

      <main id="main-content" className="flex-1 pt-32 pb-24 px-6 max-w-6xl mx-auto w-full space-y-16">
        {/* Hero 404 Message */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] font-mono text-xs uppercase tracking-widest">
            <Compass className="w-4 h-4" aria-hidden="true" />
            <span>HTTP 404 — Resource Not Found</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif italic font-light text-white tracking-tight">
            Page Not Found
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-light">
            The URL you visited does not exist, may have been moved, or is no longer available. Use the search bar below to find the right service, tool, or technical guide, or head back to our homepage.
          </p>

          {/* Primary Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/"
              className="px-7 py-3.5 bg-[#ccff00] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors inline-flex items-center gap-2"
            >
              <span>Return to Homepage</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3.5 border border-white/20 hover:border-[#ccff00] text-white hover:text-[#ccff00] font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>Book a Technical Discovery Call</span>
            </Link>
          </div>
        </section>

        {/* Search & Quick Directory */}
        <section className="space-y-8" aria-labelledby="directory-heading">
          <div className="max-w-xl mx-auto">
            <label htmlFor="not-found-search" className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2 text-center">
              Search Services, Case Studies &amp; Tools
            </label>
            <div className="relative">
              <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
              <input
                id="not-found-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search e.g. Custom Software, AI Agents, SEO, Cost Estimator..."
                className="w-full bg-zinc-900/90 border border-white/15 focus:border-[#ccff00] rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none font-sans"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 id="directory-heading" className="text-2xl font-serif italic text-white text-center">
              Explore Core Services &amp; Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              {filteredLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-[#ccff00]/50 transition-all group flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] block">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#ccff00] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 group-hover:text-[#ccff00] uppercase tracking-wider">
                    <span>Visit Page</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

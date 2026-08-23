import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { ShieldCheck, FileCheck2, Bot, Sparkles, Scale, RefreshCw } from 'lucide-react';

const EditorialPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 selection:text-white">
      <Helmet>
        <title>Editorial Policy &amp; Content Standards | AbuQitmirLabs</title>
        <meta 
          name="description" 
          content="Learn about AbuQitmirLabs editorial guidelines, engineering review process, AI assistance disclosure, and technical accuracy standards." 
        />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/editorial-policy" />
        <meta property="og:title" content="Editorial Policy &amp; Content Standards | AbuQitmirLabs" />
        <meta property="og:description" content="Learn about AbuQitmirLabs editorial guidelines, engineering review process, and technical accuracy standards." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/editorial-policy" />
        <meta property="og:type" content="article" />
      </Helmet>

      <Header />
      <Breadcrumbs customItems={[{ label: 'Editorial Policy', path: '/editorial-policy' }]} />

      <main className="pt-32 md:pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Banner */}
          <div className="mb-12 border-b border-zinc-800 pb-8">
            <span className="text-xs font-mono text-[#ccff00] uppercase tracking-widest font-bold block mb-3">
              [ TRUST &amp; TRANSPARENCY PROTOCOL ]
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white font-serif mb-4">
              Editorial Policy &amp; Engineering Content Standards
            </h1>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
              <span>Published: February 2026</span>
              <span>•</span>
              <span>Last Reviewed: August 2026</span>
              <span>•</span>
              <span>Author: AbuQitmirLabs Editorial Board</span>
            </div>
          </div>

          {/* Core Content Body */}
          <div className="space-y-10 text-zinc-300 leading-relaxed font-sans">
            <section className="bg-zinc-950/60 border border-zinc-800/80 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-[#ccff00]" />
                <h2 className="text-xl font-bold uppercase tracking-wide text-white font-serif">
                  1. Technical Accuracy &amp; Peer Engineering Review
                </h2>
              </div>
              <p className="text-sm md:text-base text-zinc-300 mb-4">
                Every technical guide, architecture breakdown, case study, and software engineering analysis published on AbuQitmirLabs is authored or reviewed by certified software engineers and systems architects.
              </p>
              <p className="text-sm md:text-base text-zinc-400">
                Code examples, schema models, and cloud configuration scripts are tested against production Node.js, Python, TypeScript, and cloud-native runtimes prior to publication to prevent outdated or non-executable patterns from entering our technical documentation.
              </p>
            </section>

            <section className="bg-zinc-950/60 border border-zinc-800/80 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Bot className="w-6 h-6 text-[#ccff00]" />
                <h2 className="text-xl font-bold uppercase tracking-wide text-white font-serif">
                  2. AI Usage &amp; Generative Disclosure
                </h2>
              </div>
              <p className="text-sm md:text-base text-zinc-300 mb-4">
                We believe in rigorous transparency regarding AI integration. While our engineering team leverages LLM-assisted coding and research tools to gather data and verify syntax, <strong>100% of published insights, architectural recommendations, and strategic conclusions undergo human editorial validation</strong>.
              </p>
              <p className="text-sm md:text-base text-zinc-400">
                We strictly ban unverified automated content publishing. Every piece of published content is edited for clarity, factual accuracy, and alignment with modern industry standards.
              </p>
            </section>

            <section className="bg-zinc-950/60 border border-zinc-800/80 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-[#ccff00]" />
                <h2 className="text-xl font-bold uppercase tracking-wide text-white font-serif">
                  3. Case Study &amp; Benchmark Integrity
                </h2>
              </div>
              <p className="text-sm md:text-base text-zinc-300 mb-4">
                Quantitative metrics, capacity benchmarks, and speed improvements cited across our case studies are derived from measured technical telemetry, database schema modeling, load testing, or explicit project delivery scopes.
              </p>
              <p className="text-sm md:text-base text-zinc-400">
                Where outcomes represent architectural modeling rather than longitudinal multi-year client cohorts, this distinction is explicitly stated via standard contextual disclaimers.
              </p>
            </section>

            <section className="bg-zinc-950/60 border border-zinc-800/80 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="w-6 h-6 text-[#ccff00]" />
                <h2 className="text-xl font-bold uppercase tracking-wide text-white font-serif">
                  4. Content Updates &amp; Corrections
                </h2>
              </div>
              <p className="text-sm md:text-base text-zinc-300 mb-4">
                The software and AI landscape evolves rapidly. We continuously audit our published materials to update deprecation warnings, API version changes, and evolving security best practices.
              </p>
              <p className="text-sm md:text-base text-zinc-400">
                If you identify an inaccuracy or outdated code sample in any article, please contact our editorial desk directly at <a href="mailto:hello@abuqitmirlabs.tech" className="text-[#ccff00] hover:underline font-mono">hello@abuqitmirlabs.tech</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditorialPolicyPage;

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { db, collection, getDocs } from '../../lib/firebase';
import { 
  Building2, 
  Calendar, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Plus, 
  ChevronRight, 
  FileText, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountryMarquee from '../../components/CountryMarquee';

import { generateSlug } from './NewsArticlePage';

const PressReleasesPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [dynamicReleases, setDynamicReleases] = useState<any[]>([]);

  const defaultPressReleases = [
    {
      id: "hipaa-cloud-certification",
      title: "AbuQitmirLabs Achieves Full HIPAA & ISO 27001 Security Audit Validation for HealthTech Software",
      date: "April 02, 2026",
      location: "Karachi, Pakistan",
      summary: "AbuQitmirLabs .TECH confirms successful independent security auditing across its medical software and cloud infrastructure pipelines, establishing full compliance with US HIPAA regulations and ISO 27001 standard data encryption protocols.",
      contact: "hello@abuqitmirlabs.tech"
    },
    {
      id: "ai-rag-framework-launch",
      title: "AbuQitmirLabs Unveils Autonomous Multi-Agent AI Framework for Enterprise Automation",
      date: "July 18, 2026",
      location: "Karachi, Pakistan",
      summary: "Founder & Lead Architect Abu Qitmir announces the release of a proprietary multi-agent RAG pipeline designed to automate document parsing, fraud detection, and customer support with sub-200ms API response latency.",
      contact: "hello@abuqitmirlabs.tech"
    },
    {
      id: "milestone-410-projects-350-clients",
      title: "AbuQitmirLabs Crosses Milestone 410+ Projects and 350+ Global Enterprise Clients",
      date: "January 10, 2026",
      location: "Karachi, Pakistan",
      summary: "Marking 5 years of operation since founding in 2021, AbuQitmirLabs celebrates over 410 successful software engineering deployments across the United States, United Kingdom, Australia, and European Union.",
      contact: "hello@abuqitmirlabs.tech"
    }
  ];

  useEffect(() => {
    const fetchPressReleases = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'news_items'));
        const items = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter((item: any) => item.type === 'press-releases' || item.type === 'all')
          .map((item: any) => ({
            id: item.id,
            slug: item.slug,
            title: item.title,
            date: item.date,
            location: item.location || 'Karachi, Pakistan',
            summary: item.excerpt || item.summary || item.content,
            contact: item.contact || 'info@abuqitmirlabs.tech'
          }));
        if (items.length > 0) {
          setDynamicReleases(items);
        }
      } catch (e) {
        console.error("Error fetching press releases from Firestore:", e);
      }
    };
    fetchPressReleases();
  }, []);

  const pressReleases = dynamicReleases.length > 0 ? dynamicReleases : defaultPressReleases;

  const faqs = [
    {
      q: "Where can I download the official AbuQitmirLabs media kit?",
      a: "Our press media kit containing vector logos, brand guidelines, founder headshots, and company fact sheets is available for direct download on this page or via email request to info@abuqitmirlabs.tech."
    },
    {
      q: "Who is the primary media contact at AbuQitmirLabs?",
      a: "For press inquiries, founder interviews, or comment requests, please contact our media relations team at info@abuqitmirlabs.tech or call +92 323 3260859."
    },
    {
      q: "Can I quote AbuQitmirLabs technical research in industry publications?",
      a: "Yes. All technical research, benchmarks, and press quotes published by AbuQitmirLabs .TECH may be cited with appropriate attribution to 'AbuQitmirLabs .TECH' and a canonical link."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <Helmet>
        <title>Press Releases — Official Media Announcements | AbuQitmirLabs</title>
        <meta name="description" content="Official press releases, media announcements, corporate milestones, and press kit resources from AbuQitmirLabs .TECH." />
        <link rel="canonical" href="https://abuqitmirlabs.tech/news/press-releases" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'News', path: '/news/all' },
            { label: 'Press Releases', path: '/news/press-releases' }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(204,255,0,0.06),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-8">
              <Building2 className="w-4 h-4" /> Media Relations & Press
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl">
              Press Releases — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-[#88a800]">Official Corporate Announcements</span>
            </h1>

            {/* Direct Answer Block */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl max-w-4xl mb-12 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Direct Answer:</strong> The Press Releases portal of AbuQitmirLabs .TECH contains official corporate statements, security compliance audits, international milestone announcements, and media contact resources regarding our software studio in Karachi.
              </p>
            </div>

            {/* Category Navigation Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
              <Link to="/news/latest" className="px-5 py-2.5 bg-zinc-900 border border-white/10 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-full hover:border-[#ccff00] transition-all">
                Latest News
              </Link>
              <Link to="/news/press-releases" className="px-5 py-2.5 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider rounded-full">
                Press Releases
              </Link>
              <Link to="/news/industry-insights" className="px-5 py-2.5 bg-zinc-900 border border-white/10 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-full hover:border-[#ccff00] transition-all">
                Industry Insights
              </Link>
              <Link to="/news/all" className="px-5 py-2.5 bg-zinc-900 border border-white/10 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-full hover:border-[#ccff00] transition-all">
                All News Archive
              </Link>
            </div>
          </div>
        </section>

        <CountryMarquee />

        {/* Press Releases Feed */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="space-y-8">
            {pressReleases.map((pr, idx) => (
              <article key={idx} className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00] transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-mono text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 rounded-full border border-[#ccff00]/20 self-start">
                    FOR IMMEDIATE RELEASE
                  </span>
                  <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#ccff00]" /> {pr.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#ccff00]" /> {pr.location}</span>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
                  {pr.title}
                </h2>

                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  {pr.summary}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                  <span className="text-xs font-mono text-gray-500">Media Contact: {pr.contact}</span>
                  <div className="flex items-center gap-4">
                    <Link to={`/news/article/${pr.id || pr.slug || generateSlug(pr.title)}`} className="text-xs font-mono uppercase text-[#ccff00] font-bold hover:underline flex items-center gap-1">
                      Read Full Release <ChevronRight className="w-4 h-4" />
                    </Link>
                    <a href={`mailto:${pr.contact}?subject=Press Inquiry: ${encodeURIComponent(pr.title)}`} className="text-xs font-mono uppercase text-gray-400 hover:text-white flex items-center gap-1">
                      Contact Media
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Media Kit Download Box */}
        <section className="py-16 bg-zinc-950 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Media Resources</span>
                <h2 className="text-3xl font-extrabold mt-2 mb-4">Download Brand Assets & Media Kit</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                  Access high-resolution vector logos, brand color palettes, studio photography, executive headshots, and company background fact sheets.
                </p>
                <a 
                  href="mailto:info@abuqitmirlabs.tech?subject=Media Kit Request"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:scale-105 transition-all"
                >
                  Request Press Kit (ZIP) <Download className="w-4 h-4" />
                </a>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-4">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#ccff00]" /> Media Relations Office
                </h3>
                <p className="text-xs font-mono text-gray-300">
                  <strong>Email:</strong> info@abuqitmirlabs.tech
                </p>
                <p className="text-xs font-mono text-gray-300">
                  <strong>Phone / WhatsApp:</strong> +92 323 3260859
                </p>
                <p className="text-xs font-mono text-gray-300">
                  <strong>Studio Address:</strong> R-10, Block 16, F.B. Area, Karachi, Pakistan (75950)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-28 bg-zinc-950/90">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Direct Answers</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-white/10 rounded-2xl bg-zinc-900/50 overflow-hidden">
                  <button 
                    className="w-full p-6 text-left font-bold text-lg flex items-center justify-between gap-4 hover:text-[#ccff00] transition-colors"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  >
                    <span>{faq.q}</span>
                    <Plus className={`w-5 h-5 text-[#ccff00] shrink-0 transition-transform ${activeFaq === idx ? 'rotate-45' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-6 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 font-mono"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PressReleasesPage;

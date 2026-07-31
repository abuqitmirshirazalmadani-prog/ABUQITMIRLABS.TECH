import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Smartphone, 
  Zap, 
  Globe, 
  CreditCard, 
  Boxes, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  ChevronRight, 
  Store, 
  Layers, 
  TrendingUp, 
  Repeat,
  ShieldCheck
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountryMarquee from '../../components/CountryMarquee';

const ECommerceDevelopmentPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is custom e-commerce development?",
      a: "Custom e-commerce development is the tailored engineering of online shopping storefronts, headless API commerce systems, multi-vendor marketplaces, and subscription platforms designed specifically around your unique product catalog, checkout flows, and operational backend."
    },
    {
      q: "What is Headless Commerce and why is it better than standard templates?",
      a: "Headless Commerce decouples the frontend user interface (built with sub-second Next.js / React frameworks) from the backend commerce engine. This results in 3x faster page speed, superior SEO scores, limitless design freedom, and seamless omnichannel delivery to web and mobile apps."
    },
    {
      q: "How long does it take to build a custom e-commerce website or marketplace?",
      a: "A bespoke custom e-commerce web application or headless Shopify store takes 6 to 10 weeks. Complex multi-vendor marketplaces or custom subscription platforms take 10 to 16 weeks."
    },
    {
      q: "How much does custom e-commerce development cost?",
      a: "Custom e-commerce platforms range from $12,000 for high-performance single-brand stores to $35,000+ for enterprise multi-vendor or headless commerce platforms."
    },
    {
      q: "Can you integrate custom e-commerce with our ERP and inventory software?",
      a: "Yes. We engineer two-way sync integrations with ERPs (SAP, NetSuite, Odoo), CRMs (HubSpot, Salesforce), warehouse management systems (WMS), and payment gateways (Stripe, PayPal, Adyen)."
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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "E-Commerce Development | Custom Online Stores & Headless Commerce | AbuQitmirLabs",
    "provider": {
      "@type": "Organization",
      "name": "AbuQitmirLabs .TECH",
      "url": "https://abuqitmirlabs.tech"
    },
    "description": "AbuQitmirLabs builds custom e-commerce stores, headless commerce platforms, multi-vendor marketplaces, and subscription systems. Fast, scalable, and conversion-optimized.",
    "serviceType": "E-Commerce Software Engineering"
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <Helmet>
        <title>E-Commerce Development | Custom Online Stores & Headless Commerce | AbuQitmirLabs</title>
        <meta name="description" content="AbuQitmirLabs builds custom e-commerce stores, headless commerce platforms, multi-vendor marketplaces, and subscription systems. Fast, scalable, and conversion-optimized." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/solutions/e-commerce" />

        {/* Open Graph */}
        <meta property="og:title" content="E-Commerce Development | Custom Online Stores & Headless Commerce | AbuQitmirLabs" />
        <meta property="og:description" content="AbuQitmirLabs builds custom e-commerce stores, headless commerce platforms, multi-vendor marketplaces, and subscription systems. Fast, scalable, and conversion-optimized." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/solutions/e-commerce" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="E-Commerce Development | Custom Online Stores & Headless Commerce | AbuQitmirLabs" />
        <meta name="twitter:description" content="AbuQitmirLabs builds custom e-commerce stores, headless commerce platforms, multi-vendor marketplaces, and subscription systems. Fast, scalable, and conversion-optimized." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'Solutions', path: '/#services' },
            { label: 'E-Commerce Development', path: '/solutions/e-commerce' }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(204,255,0,0.06),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-8">
              <ShoppingBag className="w-4 h-4 text-[#ccff00]" /> High-Conversion Digital Retail
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl">
              E-Commerce Development — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-[#88a800]">Custom Online Stores That Convert</span>
            </h1>

            {/* Direct Answer Block for AEO/GEO */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl max-w-4xl mb-12 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Direct Answer:</strong> Custom e-commerce development creates high-speed digital storefronts, headless commerce architectures, multi-vendor marketplaces, and subscription systems tailored to your unique catalog logic. AbuQitmirLabs builds sub-second loading online stores engineered for maximum conversion rate optimization (CRO) and zero platform bloat.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-10 font-light">
              Off-the-shelf templates limit your growth, bloat page load speeds, and trap you in high transaction plugin fees. We engineer bespoke, high-performance e-commerce engines that scale smoothly past millions in annual revenue.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Request Store Audit <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/mobile-app-development" 
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider"
              >
                Mobile commerce solutions
              </Link>
            </div>
          </div>
        </section>

        <CountryMarquee />

        {/* E-Commerce Challenge */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                The Retail Technology Bottleneck
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Standard monolithic e-commerce platforms struggle with slow mobile loading speeds, rigid checkout customization, and heavy plugin overhead.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Slow Page Speed",
                  desc: "Every 1-second delay in page load drops conversion rates by 7%. Heavy template scripts destroy mobile speed.",
                  icon: Zap
                },
                {
                  title: "Platform Limits",
                  desc: "Inability to implement complex custom pricing models, B2B wholesale portals, or multi-currency logic.",
                  icon: Layers
                },
                {
                  title: "High Cart Abandonment",
                  desc: "Clunky, multi-step checkout processes that frustrate mobile buyers and cause high drop-off rates.",
                  icon: ShoppingBag
                },
                {
                  title: "Siloed Inventory",
                  desc: "Disconnected inventory between physical stores, warehouse ERPs, Amazon, and online storefronts.",
                  icon: Boxes
                }
              ].map((c, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-500 hover:-translate-y-1.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.25)] mb-6">
                    <c.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">{c.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* E-Commerce Solutions */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Growth Engines</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Our Custom E-Commerce Solutions
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Engineered with sub-second page performance, API-first flexibility, and seamless checkout pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Custom E-Commerce Storefronts",
                desc: "Bespoke online stores tailored to your brand identity, built with Next.js for sub-second page loads and zero template constraints.",
                tag: "Custom Web Store",
                icon: Store
              },
              {
                title: "Multi-Vendor Marketplaces",
                desc: "Scalable marketplace platforms supporting seller onboarding, automated commission splitting, vendor portals, and split shipments.",
                tag: "Marketplace Tech",
                icon: Globe
              },
              {
                title: "Headless Commerce Architecture",
                desc: "Decoupling frontends from Shopify, BigCommerce, or custom backends for maximum speed, SEO domination, and mobile flexibility.",
                tag: "API Commerce",
                icon: Layers
              },
              {
                title: "Subscription & Recurring Billing",
                desc: "Automated recurring order platforms with customer self-service portals, swap/pause capabilities, and churn prevention flows.",
                tag: "Recurring Commerce",
                icon: Repeat
              },
              {
                title: "Mobile Commerce Applications",
                desc: "Native iOS and Android shopping apps with push notifications, Apple Pay/Google Pay integration, and instant reordering.",
                tag: "Mobile Retail",
                icon: Smartphone,
                linkText: "Mobile commerce solutions",
                linkPath: "/mobile-app-development"
              },
              {
                title: "ERP & Payment Gateway Integration",
                desc: "Seamless synchronization with Stripe, PayPal, Klarna, SAP, NetSuite, QuickBooks, and automated WMS inventory tools.",
                tag: "Integrations",
                icon: CreditCard
              }
            ].map((sol, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                      {sol.tag}
                    </span>
                    <sol.icon className="w-8 h-8 text-gray-400 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors">{sol.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">{sol.desc}</p>
                </div>
                {sol.linkPath ? (
                  <Link to={sol.linkPath} className="text-xs font-mono uppercase text-[#ccff00] hover:underline flex items-center gap-1 mt-4 font-semibold">
                    {sol.linkText} <ChevronRight className="w-3 h-3" />
                  </Link>
                ) : (
                  <Link to="/mobile-app-development" className="text-xs font-mono uppercase text-blue-400 hover:text-white flex items-center gap-1 mt-4 transition-colors font-semibold">
                    Mobile commerce solutions <ChevronRight className="w-3 h-3" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 md:py-28 bg-zinc-950/80 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">High-Speed Stack</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3">E-Commerce Technology Stack</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { category: "Storefront Tech", techs: "Next.js, React, Tailwind CSS, Remix" },
                { category: "Headless Engines", techs: "Shopify Storefront API, Medusa.js, Commerce Layer" },
                { category: "Payments & Fraud", techs: "Stripe, PayPal, Adyen, Apple Pay, Sift Fraud" },
                { category: "Hosting & CDN", techs: "Vercel, AWS CloudFront, Cloudflare Enterprise" }
              ].map((stack, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-zinc-900/50 border border-white/10">
                  <span className="text-[#ccff00] text-xs font-mono uppercase block mb-2">{stack.category}</span>
                  <p className="text-white font-bold text-sm">{stack.techs}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Revenue Growth</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3">E-Commerce Success Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Direct-to-Consumer Headless Storefront",
                metric: "$5M+ Annual Sales",
                detail: "Migrated a D2C brand to a headless Next.js storefront, cutting mobile page load from 4.2s to 0.8s and boosting conversion rate by 38%."
              },
              {
                title: "Niche Multi-Vendor Marketplace",
                metric: "1,000+ Active Vendors",
                detail: "Engineered a custom multi-vendor portal with automated commission payouts, vendor dashboards, and split checkout handling."
              },
              {
                title: "Subscription Commerce Platform",
                metric: "50,000+ Active Subscribers",
                detail: "Built a custom recurring subscription platform with one-click upsells, reducing churn by 24% and increasing LTV by 42%."
              }
            ].map((cs, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[#ccff00] font-mono text-2xl font-extrabold block mb-3">{cs.metric}</span>
                  <h3 className="text-xl font-bold mb-3">{cs.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{cs.detail}</p>
                </div>
                <Link to="/case-studies" className="mt-6 text-xs font-mono uppercase text-[#ccff00] hover:underline flex items-center gap-1">
                  Read Case Study <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-28 bg-zinc-950/90 border-t border-white/10">
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

        {/* CTA */}
        <section className="py-20 md:py-28 text-center bg-gradient-to-b from-zinc-900 to-black border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Ready to Build Your Online Store?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Schedule a technical consultation with our e-commerce architects to plan your custom storefront or marketplace build.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(204,255,0,0.4)]"
            >
              Book Free E-Commerce Consultation <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ECommerceDevelopmentPage;

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  ShieldCheck, 
  Activity, 
  Video, 
  Database, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  ChevronRight, 
  Stethoscope, 
  Hospital, 
  Clock, 
  Lock, 
  Users,
  Award
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountryMarquee from '../../components/CountryMarquee';

const HealthcarePlatformsPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is healthcare software development?",
      a: "Healthcare software development involves designing and building compliant, secure medical platforms including Electronic Health Records (EHR/EMR), telemedicine video portals, remote patient monitoring systems, clinical trial software, and healthcare analytics engines."
    },
    {
      q: "Is your custom software HIPAA and GDPR compliant?",
      a: "Yes, 100%. All healthcare applications engineered by AbuQitmirLabs incorporate Business Associate Agreements (BAA) readiness, end-to-end AES-256 encryption at rest and in transit, TLS 1.3 protocols, role-based access controls (RBAC), and full HIPAA/GDPR audit trails."
    },
    {
      q: "Can you integrate with existing EHR systems like Epic and Cerner?",
      a: "Yes. We engineer seamless integrations using HL7 v2/v3, FHIR (Fast Healthcare Interoperability Resources) APIs, and custom middleware to sync data securely across Epic, Cerner, AthenaHealth, and Allscripts."
    },
    {
      q: "How long does it take to build a custom healthcare platform?",
      a: "A HIPAA-compliant telemedicine platform or patient portal MVP takes approximately 8 to 14 weeks. Comprehensive hospital management suites or EHR platforms typically take 16 to 24 weeks."
    },
    {
      q: "How much does healthcare software development cost?",
      a: "Custom healthcare modules start from $15,000 for specialized patient appointment engines or video consultation APIs, while full-scale clinical trial or EHR suites range from $35,000 to $75,000+."
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
    "name": "Healthcare Software Development Services",
    "provider": {
      "@type": "Organization",
      "name": "AbuQitmirLabs .TECH",
      "url": "https://abuqitmirlabs.tech"
    },
    "description": "HIPAA-compliant custom healthcare software development including EHR systems, telemedicine platforms, patient portals, and FHIR API integrations.",
    "serviceType": "Healthcare Platform Engineering"
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <Helmet>
        <title>Healthcare Software Development | HIPAA-Ready EHR & Telemedicine | AbuQitmirLabs</title>
        <meta name="description" content="AbuQitmirLabs builds HIPAA-compliant healthcare software — EHR/EMR systems, telemedicine platforms, AI diagnostics, and patient portals. Secure, scalable, and FHIR-ready." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/solutions/healthcare" />

        {/* Open Graph */}
        <meta property="og:title" content="Healthcare Software Development | HIPAA-Ready EHR & Telemedicine | AbuQitmirLabs" />
        <meta property="og:description" content="AbuQitmirLabs builds HIPAA-compliant healthcare software — EHR/EMR systems, telemedicine platforms, AI diagnostics, and patient portals. Secure, scalable, and FHIR-ready." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/solutions/healthcare" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Healthcare Software Development | HIPAA-Ready EHR & Telemedicine | AbuQitmirLabs" />
        <meta name="twitter:description" content="AbuQitmirLabs builds HIPAA-compliant healthcare software — EHR/EMR systems, telemedicine platforms, AI diagnostics, and patient portals. Secure, scalable, and FHIR-ready." />
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
            { label: 'Healthcare Platforms', path: '/solutions/healthcare' }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,255,204,0.06),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-8">
              <HeartPulse className="w-4 h-4 text-emerald-400" /> Digital Health Engineering
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl">
              Healthcare Software Development — <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-[#ccff00]">HIPAA-Compliant Solutions for Modern Medicine</span>
            </h1>

            {/* Direct Answer Block for AEO/GEO */}
            <div className="bg-zinc-900/90 border-l-4 border-emerald-400 p-6 rounded-r-2xl max-w-4xl mb-12 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-emerald-400">Direct Answer:</strong> Healthcare software development builds HIPAA, GDPR, and FDA compliant digital medical platforms. AbuQitmirLabs engineers interoperable Electronic Health Records (EHR/EMR), real-time telemedicine streaming apps, clinical trial software, and patient portals utilizing FHIR/HL7 standards for clinics, hospitals, and healthtech startups.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-10 font-light">
              Modern medical care is fragmented by legacy systems and strict compliance barriers. We engineer clean, human-centered medical software that protects patient privacy while streamlining clinical workflows.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Schedule Healthcare Briefing <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/web-development" 
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider"
              >
                HIPAA-compliant web solutions
              </Link>
            </div>
          </div>
        </section>

        <CountryMarquee />

        {/* The Healthcare Challenge */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                The Digital Healthcare Barrier
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Medical providers face severe operational friction when trying to integrate modern digital patient experiences into rigid legacy hospital architectures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Regulatory Compliance",
                  desc: "Meeting strict HIPAA Privacy & Security rules, GDPR, HITECH, and FDA software standards across all customer touchpoints.",
                  icon: ShieldCheck
                },
                {
                  title: "Data Interoperability",
                  desc: "Unifying siloed patient data across disparate EHR systems using HL7 v2/v3 and modern HL7 FHIR standards.",
                  icon: Database
                },
                {
                  title: "Data Security",
                  desc: "Protecting sensitive Protected Health Information (PHI) against ransomware, unauthorized access, and breach vectors.",
                  icon: Lock
                },
                {
                  title: "Patient Experience",
                  desc: "Replacing slow, confusing phone booking systems with instant web portals, video triage, and digital prescription tracking.",
                  icon: Users
                }
              ].map((c, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] transition-all duration-500 hover:-translate-y-1.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.25)] mb-6">
                    <c.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-300 transition-colors">{c.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Healthcare Solutions */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Medical Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Our Custom Healthcare Platforms
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Engineered for hospitals, telehealth startups, medical device companies, and private practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Electronic Health Records (EHR / EMR)",
                desc: "Custom, intuitive EHR solutions that eliminate administrative bloat, streamline charting, and sync seamlessly via FHIR APIs.",
                tag: "Clinical Systems",
                icon: FileText
              },
              {
                title: "Telemedicine & Video Consultation",
                desc: "WebRTC-powered HIPAA video streaming apps with online waiting rooms, digital prescriptions, and instant session notes.",
                tag: "Virtual Care",
                icon: Video
              },
              {
                title: "Patient Portals & Scheduling",
                desc: "Self-service portals for appointment booking, medical history viewing, secure provider messaging, and automated bill pay.",
                tag: "Patient Engagement",
                icon: Users
              },
              {
                title: "Clinical Trial Management",
                desc: "Participant recruitment portals, remote consent collection, structured eCOA data capture, and protocol compliance tools.",
                tag: "Life Sciences",
                icon: Stethoscope
              },
              {
                title: "Pharmacy & Inventory Automation",
                desc: "Medication tracking platforms, e-prescribing (eRx) integrations, supply chain alerts, and automated refill notifications.",
                tag: "Pharmacy Tech",
                icon: Hospital
              },
              {
                title: "Healthcare Analytics & Dashboards",
                desc: "Real-time clinical dashboards, population health tracking, predictive bed occupancy forecasting, and HIPAA audit reporting.",
                tag: "Health Analytics",
                icon: Activity
              }
            ].map((sol, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                      {sol.tag}
                    </span>
                    <sol.icon className="w-8 h-8 text-gray-400 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-300 transition-colors">{sol.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">{sol.desc}</p>
                </div>
                <Link to="/web-development" className="text-xs font-mono uppercase text-emerald-400 hover:text-white flex items-center gap-1 mt-4 transition-colors font-semibold">
                  HIPAA-compliant web solutions <ChevronRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 md:py-28 bg-zinc-950/80 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Medical Tech Stack</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Compliant Engineering Stack</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { category: "Interoperability", techs: "HL7 FHIR v4, REST, GraphQL, SMART on FHIR" },
                { category: "Frontend", techs: "React, Next.js, React Native, Tailwind CSS" },
                { category: "Backend Security", techs: "Node.js, Python, PostgreSQL (Encrypted), Redis" },
                { category: "Cloud & BAA", techs: "AWS (HIPAA Eligible), Azure Health, GCP Healthcare API" }
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
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Impact In Practice</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Healthcare Success Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "EHR Platform for 500+ Healthcare Providers",
                metric: "40% Less Administrative Time",
                detail: "Re-engineered a slow legacy EHR system into a modern web portal, cutting clinician documentation time by 40% and syncing with 12 hospital networks."
              },
              {
                title: "National Telemedicine Platform",
                metric: "10,000+ Monthly Consults",
                detail: "Engineered a WebRTC telehealth platform with real-time video, e-prescriptions, and automated insurance verification with 99.99% uptime."
              },
              {
                title: "Clinical Trial Data Management System",
                metric: "Phase 3 Compliance Achieved",
                detail: "Built a secure, FDA-audited clinical trial portal for multi-center Phase 3 trials, managing 50,000+ patient submission entries."
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
              Ready to Transform Healthcare Delivery?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Schedule a confidential compliance & architecture consultation with our lead healthcare engineering team.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(204,255,0,0.4)]"
            >
              Book Free Technical Consultation <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HealthcarePlatformsPage;

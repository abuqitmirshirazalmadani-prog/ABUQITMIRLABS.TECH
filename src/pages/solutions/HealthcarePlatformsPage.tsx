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
  Server,
  Zap,
  Smartphone,
  Layers,
  Sparkles,
  BarChart3,
  KeyRound,
  FileCheck,
  Cpu,
  Workflow,
  ShieldAlert,
  Radio,
  Eye,
  Bot,
  Globe,
  DollarSign,
  CalendarCheck,
  Bell
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountryMarquee from '../../components/CountryMarquee';

const HealthcarePlatformsPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "1. What is healthcare software development?",
      a: "Healthcare software development is the engineering of custom digital platforms and integrated applications—including Electronic Health Records (EHR/EMR), clinic management systems, telemedicine software, and patient portals—built to streamline medical workflows, safeguard sensitive health information, and improve clinical care coordination across clinics, hospitals, and healthtech enterprises."
    },
    {
      q: "2. What does a healthcare software development company do?",
      a: "A healthcare software development company designs, architects, codes, tests, and maintains custom digital health platforms for medical practices, hospitals, and healthtech startups. This includes developing custom EHR/EMR systems, clinic operations software, telemedicine portals, patient-facing mobile apps, and FHIR/HL7 interoperability bridges engineered with rigorous encryption and access controls."
    },
    {
      q: "3. How much does custom healthcare software cost?",
      a: "Custom healthcare software development typically ranges from $15,000 for focused telemedicine modules or patient intake MVPs to $28,000–$55,000 for full clinic management platforms, and $55,000 to $95,000+ for enterprise hospital EHR suites. Total investment depends on user roles, third-party integrations, compliance auditing scope, and mobile platform support."
    },
    {
      q: "4. How long does healthcare software development take?",
      a: "Developing a custom healthcare software MVP or telehealth portal generally takes 8 to 12 weeks. Mid-sized clinic management platforms take 12 to 18 weeks, while comprehensive multi-facility hospital suites and enterprise EHR platforms with complex FHIR/HL7 integrations typically require 18 to 26+ weeks depending on feature complexity and security validation."
    },
    {
      q: "5. Can you build clinic management software?",
      a: "Yes. We engineer bespoke clinic management software tailored to outpatient and specialty medical practices. Our systems automate patient registration, multi-practitioner appointment scheduling, digital room allocation, clinical encounter documentation, electronic prescription generation, and integrated billing workflows to eliminate front-desk administrative bottlenecks."
    },
    {
      q: "6. Can healthcare software integrate with EHR and EMR systems?",
      a: "Yes. We build secure integration layers and API middleware utilizing HL7 FHIR v4 standards and HL7 v2/v3 protocols. This enables seamless bidirectional data exchange between custom software, hospital EHR systems, laboratory information systems (LIS), diagnostic imaging archives (PACS), and pharmacy networks without proprietary vendor lock-in."
    },
    {
      q: "7. Can you build telemedicine software?",
      a: "Yes. We build custom telemedicine software featuring ultra-low latency WebRTC audio-video consultations, digital waiting rooms, real-time doctor charting interfaces, patient intake questionnaires, and e-prescription generation. All virtual care features are engineered with end-to-end encryption and responsive support across desktop and mobile devices."
    },
    {
      q: "8. What is FHIR interoperability?",
      a: "FHIR (Fast Healthcare Interoperability Resources) interoperability is a modern healthcare data standard developed by HL7. It utilizes RESTful APIs and standardized JSON structures to enable disparate medical applications, hospital EHR networks, patient portals, and health exchanges to exchange clinical resources (such as Patient, Encounter, and Condition records) securely and reliably."
    },
    {
      q: "9. Can you develop healthcare mobile apps?",
      a: "Yes. We develop cross-platform iOS and Android healthcare mobile applications using Flutter and React Native. Our mobile solutions include patient companion apps with appointment booking and vital sign logging, as well as clinician companion tools for mobile chart lookups, encounter dictation, and real-time clinical alerts."
    },
    {
      q: "10. Can healthcare software include AI features?",
      a: "Yes. We integrate responsible AI capabilities to automate administrative documentation, structure unstructured clinical notes, triage incoming patient appointment requests, and power institutional knowledge assistants. All AI modules are strictly assistive and are never designed to replace certified medical professionals, diagnosis, or clinical judgment."
    }
  ];

  const unifiedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.abuqitmirlabs.tech/#organization",
        "name": "AbuQitmirLabs",
        "url": "https://www.abuqitmirlabs.tech",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://www.abuqitmirlabs.tech/#logo",
          "url": "https://www.abuqitmirlabs.tech/logo.png",
          "caption": "AbuQitmirLabs Logo"
        },
        "telephone": "+923233260859",
        "email": "hello@abuqitmirlabs.tech",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8/15, 3 37A Rd, Shah Khalid Colony, Sector 37A",
          "addressLocality": "Landhi Town, Karachi",
          "postalCode": "75160",
          "addressCountry": "PK"
        },
        "sameAs": [
          "https://www.facebook.com/profile.php?id=61583768706452",
          "https://www.instagram.com/abuqitmirshirazalmadani/",
          "https://www.youtube.com/@AbuQitmir",
          "https://www.linkedin.com/in/abu-qitmir-697423390/",
          "https://x.com/AbuQitmir",
          "https://www.pinterest.com/abuqitmir",
          "https://www.quora.com/profile/Abu-Qitmir-Mohammad-Shiraz-Al-Madani",
          "https://www.goodfirms.co/company/abuqitmirlabs-tech",
          "https://clutch.co/profile/abuqitmirlabstech"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+923233260859",
          "contactType": "customer service",
          "email": "hello@abuqitmirlabs.tech",
          "availableLanguage": ["English", "Urdu"]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.abuqitmirlabs.tech/#website",
        "url": "https://www.abuqitmirlabs.tech",
        "name": "AbuQitmirLabs",
        "publisher": {
          "@id": "https://www.abuqitmirlabs.tech/#organization"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://www.abuqitmirlabs.tech/solutions/healthcare#webpage",
        "url": "https://www.abuqitmirlabs.tech/solutions/healthcare",
        "name": "Healthcare Software Solutions | AbuQitmirLabs",
        "description": "Build secure healthcare software, patient portals, telemedicine platforms and clinical systems with AbuQitmirLabs for modern healthcare businesses.",
        "isPartOf": {
          "@id": "https://www.abuqitmirlabs.tech/#website"
        },
        "breadcrumb": {
          "@id": "https://www.abuqitmirlabs.tech/solutions/healthcare#breadcrumb"
        },
        "inLanguage": "en-US",
        "about": [
          { "@type": "Thing", "name": "Healthcare Software Development" },
          { "@type": "Thing", "name": "Healthcare Software Solutions" },
          { "@type": "Thing", "name": "Electronic Health Records" },
          { "@type": "Thing", "name": "Telemedicine Software Development" },
          { "@type": "Thing", "name": "Patient Portals" },
          { "@type": "Thing", "name": "Remote Patient Monitoring" },
          { "@type": "Thing", "name": "FHIR and HL7 Integration" }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.abuqitmirlabs.tech/solutions/healthcare#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.abuqitmirlabs.tech"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Solutions",
            "item": "https://www.abuqitmirlabs.tech/#services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Healthcare Software Solutions",
            "item": "https://www.abuqitmirlabs.tech/solutions/healthcare"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://www.abuqitmirlabs.tech/solutions/healthcare#service",
        "name": "Healthcare Software Development & Healthcare Technology Solutions",
        "provider": {
          "@id": "https://www.abuqitmirlabs.tech/#organization"
        },
        "url": "https://www.abuqitmirlabs.tech/solutions/healthcare",
        "description": "Custom healthcare software development services including Electronic Health Records (EHR/EMR), clinic management software, telemedicine platforms, patient portals, remote patient monitoring (RPM), and healthcare API integrations.",
        "serviceType": "Healthcare Software Engineering",
        "areaServed": ["US", "GB", "CA", "AU", "PK", "PL"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Healthcare Software Development Offerings",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom Healthcare Software Development",
                "description": "Custom healthcare platforms, clinic management systems, hospital workflows, and operational automation."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Healthcare Web Development Services",
                "description": "Secure, responsive healthcare websites, clinical web applications, and patient-facing portals."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "EHR & EMR Software Development",
                "description": "Custom Electronic Health Record and Electronic Medical Record systems with structured charting."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Telemedicine Platform Development",
                "description": "Encrypted WebRTC video consultation platforms, virtual waiting rooms, and in-session charting."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Patient Portal Web Development",
                "description": "Self-service patient portals for appointment scheduling, medical records access, and messaging."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Healthcare Mobile App Development",
                "description": "Cross-platform iOS and Android healthcare applications for patients and medical providers."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Remote Patient Monitoring Software",
                "description": "Vital signs telemetry ingestion, automated clinical alerts, and clinician cohort dashboards."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Healthcare AI & Automation",
                "description": "Responsible administrative AI automation, document extraction, and RAG knowledge assistants."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Healthcare Analytics & Clinical Dashboards",
                "description": "Department throughput telemetry, bed occupancy tracking, and executive healthcare analytics."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Healthcare API Integration & Interoperability",
                "description": "FHIR v4, HL7 v2/v3, LIS lab interfaces, PACS imaging connectors, and payment bridges."
              }
            }
          ]
        }
      },
      {
        "@type": "HowTo",
        "@id": "https://www.abuqitmirlabs.tech/solutions/healthcare#process",
        "name": "8-Step Healthcare Software Development Process",
        "description": "AbuQitmirLabs' structured engineering methodology for designing, developing, integrating, and deploying secure healthcare software platforms.",
        "step": [
          { "@type": "HowToStep", "position": 1, "name": "Discovery & Requirements", "text": "Identify clinical workflows, user personas (doctors, nurses, administrators, patients), data governance standards, and operational objectives." },
          { "@type": "HowToStep", "position": 2, "name": "Healthcare Workflow Mapping", "text": "Map comprehensive patient journeys, consultation lifecycles, clinical documentation touchpoints, and billing triggers." },
          { "@type": "HowToStep", "position": 3, "name": "Architecture & Data Modeling", "text": "Design secure cloud architecture, zero-trust RBAC permissions, AES-256 encryption at rest, TLS 1.3 in transit, and immutable audit logs." },
          { "@type": "HowToStep", "position": 4, "name": "UX/UI Design", "text": "Create low-cognitive-load, accessible user interfaces in Figma tailored for fast clinician charting and intuitive patient engagement." },
          { "@type": "HowToStep", "position": 5, "name": "Application Development", "text": "Engineer responsive web frontends, cross-platform mobile apps, and robust microservices backends using modern TypeScript stacks." },
          { "@type": "HowToStep", "position": 6, "name": "Integrations & Security", "text": "Connect FHIR/HL7 APIs, diagnostic laboratory feeds, payment gateways, and third-party healthcare service endpoints." },
          { "@type": "HowToStep", "position": 7, "name": "Testing & Validation", "text": "Perform vulnerability scanning, penetration assessments, data isolation checks, and end-to-end clinical workflow testing." },
          { "@type": "HowToStep", "position": 8, "name": "Deployment & Continuous Improvement", "text": "Deploy to cloud infrastructure with automated monitoring, backup redundancy, staff training, and continuous support SLAs." }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.abuqitmirlabs.tech/solutions/healthcare#faq",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <Helmet>
        <title>Healthcare Software Solutions | AbuQitmirLabs</title>
        <meta name="description" content="Build secure healthcare software, patient portals, telemedicine platforms and clinical systems with AbuQitmirLabs for modern healthcare businesses." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/solutions/healthcare" />

        {/* Open Graph */}
        <meta property="og:title" content="Healthcare Software Solutions | AbuQitmirLabs" />
        <meta property="og:description" content="Build secure healthcare software, patient portals, telemedicine platforms and clinical systems with AbuQitmirLabs for modern healthcare businesses." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/solutions/healthcare" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Healthcare Software Solutions | AbuQitmirLabs" />
        <meta name="twitter:description" content="Build secure healthcare software, patient portals, telemedicine platforms and clinical systems with AbuQitmirLabs for modern healthcare businesses." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        <script type="application/ld+json">{JSON.stringify(unifiedSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'Solutions', path: '/#services' },
            { label: 'Healthcare Software Solutions', path: '/solutions/healthcare' }
          ]} />
        </div>

        {/* Hero Section with Single Semantic H1 */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10" aria-labelledby="hero-heading">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-8">
              <HeartPulse className="w-4 h-4 text-emerald-400" /> Healthcare Technology Solutions &amp; Software Engineering
            </div>

            <h1 id="hero-heading" className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-8 max-w-5xl">
              Healthcare Software Solutions for Modern Healthcare
            </h1>

            {/* Direct Answer Block for AEO/GEO */}
            <div className="bg-zinc-900/90 border-l-4 border-emerald-400 p-6 md:p-8 rounded-r-2xl max-w-4xl mb-10 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-emerald-400">Direct Answer:</strong> Healthcare software development is the engineering of custom digital applications, including Electronic Health Records (EHR/EMR), telemedicine platforms, patient portals, and clinic management systems designed to streamline medical workflows, safeguard sensitive health information, and improve patient care coordination across clinics, hospitals, and healthtech enterprises.
              </p>
            </div>

            <p className="text-lg md:text-2xl text-gray-300 max-w-3xl leading-relaxed mb-10 font-light">
              Modern healthcare delivery demands intuitive software that simplifies clinical workflows while upholding strict data privacy standards. AbuQitmirLabs is a specialized healthcare software development company building bespoke medical platforms that eliminate administrative bottlenecks, connect fragmented health records, and empower doctors and patients with dependable digital experiences.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Schedule Healthcare Technical Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/custom-software" 
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider"
              >
                Explore Custom Software Solutions
              </Link>
            </div>
          </div>
        </section>

        <CountryMarquee />

        {/* SECTION 1: What Are Healthcare Software Solutions? (H2 + Direct Answer) */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="what-are-solutions-heading">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mb-12">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Industry Definition</span>
              <h2 id="what-are-solutions-heading" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
                What Are Healthcare Software Solutions?
              </h2>

              {/* AEO Direct Answer Block */}
              <div className="bg-zinc-900/90 border-l-4 border-emerald-400 p-6 md:p-8 rounded-r-2xl mb-8 shadow-xl">
                <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                  <strong className="text-emerald-400">Direct Answer:</strong> Healthcare software solutions are specialized digital platforms and integrated software applications that medical providers, clinics, hospitals, and healthtech organizations use to manage clinical workflows, maintain electronic patient records, facilitate virtual consultations, automate administrative billing, and enable secure communication between medical practitioners and patients.
                </p>
              </div>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                In modern medical practice, healthcare software solutions serve as the operational backbone for outpatient practices, multi-specialty medical centers, ambulatory clinics, and digital health startups. Rather than relying on generic business applications or fragmented spreadsheets, healthcare organizations deploy purpose-built healthcare IT solutions designed to navigate complex medical terminology, multi-tier user permissions, and strict data security protocols.
              </p>

              <p className="text-gray-400 text-base leading-relaxed">
                By unifying appointment scheduling, electronic medical records, clinical documentation, and diagnostic communications into cohesive digital ecosystems, modern healthcare software reduces operational overhead, minimizes clinical charting fatigue, and accelerates time-to-treatment for patients across diverse healthcare environments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
              {[
                { title: "Clinical Workflow Coordination", desc: "Standardizes patient intake, doctor triage, consultation notes, and discharge instructions into an intuitive, error-resistant sequence.", icon: Workflow },
                { title: "Longitudinal Record Management", desc: "Maintains secure, chronologically organized histories of patient diagnoses, prescription regimens, laboratory results, and imaging studies.", icon: Database },
                { title: "Interoperable Data Exchange", desc: "Enables real-time communication between internal clinical software, external hospital EHRs, regional health exchanges, and diagnostic labs.", icon: Layers },
                { title: "Patient Engagement & Access", desc: "Empowers individuals to review medical summaries, schedule appointments online, message providers, and join virtual telehealth visits.", icon: Users }
              ].map((c, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                    <c.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{c.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: Custom Healthcare Software Development (H2) */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="custom-software-heading">
          <div className="max-w-3xl mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Core Capabilities</span>
            <h2 id="custom-software-heading" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Custom Healthcare Software Development
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              As a dedicated healthcare software development company, AbuQitmirLabs builds bespoke digital platforms tailored to your specific clinical specialties, operational models, and user roles. We engineer end-to-end custom healthcare software that eliminates administrative friction and enhances care delivery:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4 inline-block">
                  Outpatient &amp; Specialty Practices
                </span>
                <h3 className="text-2xl font-bold mb-4 text-white">Clinic Management Systems</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  We engineer custom clinic management software designed to automate daily practice operations. Features include online patient registration, intelligent doctor scheduling calendars, room allocation management, multi-practitioner time tracking, electronic prescription generation, and automated billing workflows tailored to outpatient and specialty clinics.
                </p>
              </div>
              <Link to="/custom-software" className="text-xs font-mono uppercase text-emerald-400 hover:text-white flex items-center gap-1 font-semibold">
                Explore Custom Software Architecture &rarr;
              </Link>
            </article>

            <article className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4 inline-block">
                  Enterprise Hospital Suites
                </span>
                <h3 className="text-2xl font-bold mb-4 text-white">Hospital Information Systems (HIS)</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Our enterprise hospital management software coordinates multi-department healthcare facilities. We build comprehensive systems for inpatient admissions, bed occupancy telemetry, emergency department triage, pharmacy inventory management, operating room scheduling, and centralized hospital billing modules.
                </p>
              </div>
              <Link to="/solutions/fintech" className="text-xs font-mono uppercase text-emerald-400 hover:text-white flex items-center gap-1 font-semibold">
                Explore Financial &amp; Billing Systems &rarr;
              </Link>
            </article>

            <article className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4 inline-block">
                  Operational Infrastructure
                </span>
                <h3 className="text-2xl font-bold mb-4 text-white">Healthcare Operations Platforms</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  We design specialized healthcare operations platforms that unify administrative communications, clinical equipment maintenance tracking, staff credentialing records, and multi-location medical inventory. These platforms provide executive visibility across all organizational touchpoints.
                </p>
              </div>
              <Link to="/web-development" className="text-xs font-mono uppercase text-emerald-400 hover:text-white flex items-center gap-1 font-semibold">
                Explore Web Development Services &rarr;
              </Link>
            </article>

            <article className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4 inline-block">
                  Intelligent Efficiency
                </span>
                <h3 className="text-2xl font-bold mb-4 text-white">Administrative &amp; Scheduling Automation</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Eliminate repetitive manual data entry through custom healthcare workflow automation. We build event-driven pipelines that automate insurance claim pre-validation, patient appointment reminders, prescription refill notifications, and clinical discharge summaries.
                </p>
              </div>
              <Link to="/ai-agent-development" className="text-xs font-mono uppercase text-emerald-400 hover:text-white flex items-center gap-1 font-semibold">
                Explore AI Automation Solutions &rarr;
              </Link>
            </article>
          </div>
        </section>

        {/* SECTION 3: Healthcare Web Development Services (H2 + Direct Answer) */}
        <section className="py-20 md:py-28 bg-zinc-950/80 border-b border-white/10" aria-labelledby="web-dev-heading">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mb-12">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Web Architecture</span>
              <h2 id="web-dev-heading" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
                Healthcare Web Development Services
              </h2>

              {/* AEO Direct Answer Block for Healthcare Web Dev */}
              <div className="bg-zinc-900/90 border-l-4 border-emerald-400 p-6 md:p-8 rounded-r-2xl mb-8 shadow-xl">
                <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                  <strong className="text-emerald-400">Direct Answer:</strong> Healthcare web development is the engineering of secure, responsive, and accessible web-based medical applications and patient-facing portals. These web platforms enable patients to schedule appointments, access diagnostic results, communicate with care teams, and complete digital intake forms across any standard web browser while adhering to strict healthcare data protection standards.
                </p>
              </div>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                Modern healthcare web applications must combine uncompromising security with consumer-grade usability. Our healthcare web development services focus on building fast, mobile-optimized medical websites, provider directories, patient-facing portals, and clinical management interfaces that perform seamlessly across all devices and screen sizes.
              </p>

              <p className="text-gray-400 text-base leading-relaxed">
                We leverage modern web technologies including TypeScript, React, Next.js, and serverless cloud architectures to deliver lightweight, accessible web interfaces that meet WCAG AA accessibility criteria, ensuring that patients of all ages and abilities can navigate care services easily.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <Globe className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Healthcare Web Applications</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Single-page and server-rendered web applications engineered for low latency, secure session handling, and granular role-based access for doctors, staff, and patients.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <FileText className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Digital Intake &amp; Onboarding</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Responsive electronic medical questionnaires, insurance card upload modules, and digital signature capture interfaces that eliminate waiting room paperwork.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <Users className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Provider Search &amp; Scheduling</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Interactive doctor directories with specialty filtering, clinic location mapping, real-time appointment availability, and automated calendar synchronization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: EHR & EMR Software Development (H2 + Direct Answer) */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="ehr-emr-heading">
          <div className="max-w-3xl mb-12">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Medical Record Systems</span>
            <h2 id="ehr-emr-heading" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              EHR &amp; EMR Software Development
            </h2>

            {/* AEO Direct Answer Block for EHR */}
            <div className="bg-zinc-900/90 border-l-4 border-emerald-400 p-6 md:p-8 rounded-r-2xl mb-8 shadow-xl">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-emerald-400">Direct Answer:</strong> EHR software development is the process of building digital Electronic Health Record systems that securely store, organize, and exchange longitudinal patient medical histories, clinical notes, lab results, and prescriptions. Custom EHR platforms enable streamlined charting, granular access controls, and standardized FHIR and HL7 interoperability with external hospital systems.
              </p>
            </div>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
              Off-the-shelf Electronic Medical Records (EMR) and Electronic Health Records (EHR) often burden medical staff with excessive drop-down menus, rigid documentation templates, and slow search performance. Our EHR software development services focus on creating clean, intuitive medical record systems tailored specifically to your practitioners&apos; clinical workflows.
            </p>

            <p className="text-gray-400 text-base leading-relaxed">
              We architect longitudinal patient record schemas that capture medical history, allergies, vital signs, diagnostic imaging, and clinical encounter notes with microsecond query performance. Every record interaction is protected by immutable access audit trails and strict role-based access control (RBAC).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-2">Modern Standard</span>
              <h3 className="text-2xl font-bold text-white mb-4">FHIR Integration</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                We build secure integration layers using modern HL7 FHIR (Fast Healthcare Interoperability Resources) v4 specifications. By implementing RESTful FHIR JSON endpoints, our platforms enable standardized data exchange for Patient, Encounter, Observation, Condition, and MedicationRequest resources.
              </p>
              <p className="text-gray-400 text-xs leading-relaxed font-mono">
                Enables seamless interoperability with third-party digital health applications, patient portals, and regional healthcare networks without proprietary vendor lock-in.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-2">Legacy &amp; Hospital Messaging</span>
              <h3 className="text-2xl font-bold text-white mb-4">HL7 Integration</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Many hospital systems and laboratory networks rely on HL7 v2 and v3 messaging protocols (such as ADT, ORU, and MDM messages). We engineer resilient HL7 parsing and translation bridges that convert legacy message streams into modern structured JSON objects.
              </p>
              <p className="text-gray-400 text-xs leading-relaxed font-mono">
                Ensures uninterrupted synchronization with hospital laboratory information systems (LIS), radiology PACS archives, and pharmacy clearinghouses.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Telemedicine Platform Development (H2 + Direct Answer) */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="telemedicine-heading">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-12">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Virtual Healthcare Platforms</span>
              <h2 id="telemedicine-heading" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
                Telemedicine Platform Development
              </h2>

              {/* AEO Direct Answer Block for Telemedicine */}
              <div className="bg-zinc-900/90 border-l-4 border-emerald-400 p-6 md:p-8 rounded-r-2xl mb-8 shadow-xl">
                <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                  <strong className="text-emerald-400">Direct Answer:</strong> Telemedicine platform development is the engineering of secure virtual healthcare software enabling real-time WebRTC audio-video consultations, digital waiting rooms, online appointment scheduling, e-prescriptions, and remote doctor-patient communication. These platforms provide accessible healthcare delivery across web and mobile devices while safeguarding clinical data through multi-layered encryption and access controls.
                </p>
              </div>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                Virtual consultations have evolved from temporary alternatives into permanent pillars of modern healthcare delivery. Our telemedicine software development services empower clinics, specialty practices, and healthtech startups to launch custom virtual care platforms that deliver crystal-clear audiovisual communication across desktop browsers, tablets, and smartphones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <Video className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">WebRTC Video Consultation</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Ultra-low latency, adaptive bitrate video streaming with secure peer-to-peer and SFU infrastructure, screen sharing for diagnostic images, and in-call encrypted clinician chat.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <Clock className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Virtual Waiting Rooms &amp; Triage</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Automated patient queue management with real-time status indicators, digital pre-consultation intake forms, and automated doctor notification alerts.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <FileCheck className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">In-Session Charting &amp; e-Prescriptions</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Side-by-side clinical documentation interface allowing doctors to review medical history, chart notes, and issue digital prescriptions during the active video call.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Patient Portal Web Development (H2 + Direct Answer) */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="patient-portal-heading">
          <div className="max-w-4xl mb-12">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Self-Service Experience</span>
            <h2 id="patient-portal-heading" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Patient Portal Web Development
            </h2>

            {/* AEO Direct Answer Block for Patient Portal */}
            <div className="bg-zinc-900/90 border-l-4 border-emerald-400 p-6 md:p-8 rounded-r-2xl mb-8 shadow-xl">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-emerald-400">Direct Answer:</strong> Patient portal web development is the creation of secure, self-service online applications that allow patients to interact with their healthcare providers. Key capabilities include viewing electronic medical records, downloading diagnostic lab reports, scheduling in-person or virtual appointments, completing digital intake questionnaires, processing payments, and exchanging encrypted messages with their clinical care teams.
              </p>
            </div>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
              Modern patient portal web development transforms how patients interact with healthcare providers. By providing transparent, 24/7 access to medical records, scheduling, and billing, patient portals improve adherence to treatment plans and dramatically reduce administrative phone calls for front-desk staff.
            </p>

            <p className="text-gray-400 text-base leading-relaxed">
              We engineer custom patient portals with responsive layouts, multi-language support, automated appointment reminders via SMS and email, and direct integration into your practice EHR and billing clearinghouses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <CalendarCheck className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Self-Service Booking</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Real-time slot availability, specialty selection, automated calendar sync, and instant SMS/email booking confirmations.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <FileText className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Lab Results &amp; Records</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Instant access to diagnostic lab reports, imaging results, vaccination histories, and downloadable medical summary PDFs.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <Lock className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Encrypted Messaging</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Asynchronous messaging channels between patients and care teams for prescription refill inquiries and follow-up questions.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <DollarSign className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Billing &amp; Payments</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Transparent statement review, digital copay collection, itemized invoices, and flexible payment plan management.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: Healthcare Mobile App Development (H2 + Direct Answer) */}
        <section className="py-20 md:py-28 bg-zinc-950/80 border-b border-white/10" aria-labelledby="mobile-app-heading">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mb-12">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Mobile Health (mHealth)</span>
              <h2 id="mobile-app-heading" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
                Healthcare Mobile App Development
              </h2>

              {/* AEO Direct Answer Block for Mobile */}
              <div className="bg-zinc-900/90 border-l-4 border-emerald-400 p-6 md:p-8 rounded-r-2xl mb-8 shadow-xl">
                <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                  <strong className="text-emerald-400">Direct Answer:</strong> Healthcare mobile app development is the creation of specialized native or cross-platform iOS and Android applications for patients and medical providers. These mobile apps facilitate remote health tracking, appointment reminders, secure clinical messaging, telehealth video visits, medication adherence alerts, and remote vital sign telemetry with seamless synchronization to backend EHR systems.
                </p>
              </div>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                Mobile applications provide patients and healthcare providers with immediate access to critical health services wherever they are. As part of our healthcare mobile app development services, we build intuitive, cross-platform mobile apps for iOS and Android using Flutter and React Native.
              </p>

              <p className="text-gray-400 text-base leading-relaxed">
                Whether creating patient-facing wellness and appointment apps or physician companion apps for hospital rounds, our mobile engineering ensures biometric security (FaceID/Fingerprint), offline data caching, push notifications, and encrypted synchronization with central clinical databases.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <Smartphone className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Patient Companion Apps</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Dedicated patient app development featuring medication intake schedules, vital sign logging, virtual visit check-ins, and direct care team messaging.
                </p>
                <Link to="/mobile-app-development" className="text-xs font-mono uppercase text-emerald-400 hover:text-white flex items-center gap-1 font-semibold">
                  Mobile App Development &rarr;
                </Link>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <Stethoscope className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Clinician &amp; Provider Apps</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Mobile tools for on-call doctors and nurses providing rapid patient chart lookups, encounter dictation, lab alert reviews, and e-prescription approvals.
                </p>
                <Link to="/custom-software" className="text-xs font-mono uppercase text-emerald-400 hover:text-white flex items-center gap-1 font-semibold">
                  Custom Software Solutions &rarr;
                </Link>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <Bell className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Adherence &amp; Push Alerts</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Automated notifications for prescription refills, pre-procedure preparation guidelines, follow-up scheduling, and critical vital sign alerts.
                </p>
                <Link to="/ai-agent-development" className="text-xs font-mono uppercase text-emerald-400 hover:text-white flex items-center gap-1 font-semibold">
                  Automated Notification Systems &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Remote Patient Monitoring Software (H2) */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="rpm-heading">
          <div className="max-w-3xl mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Connected Health</span>
            <h2 id="rpm-heading" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Remote Patient Monitoring Software
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              Remote Patient Monitoring (RPM) software enables healthcare teams to observe patient health metrics outside traditional clinical settings. We engineer scalable RPM platforms that aggregate continuous device telemetry, visualize trend lines, and alert medical teams when vital indicators exceed customized thresholds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <Radio className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Vital Signs Telemetry Ingestion</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Secure data ingestion pipelines processing time-series metrics from blood pressure monitors, pulse oximeters, continuous glucose monitors, and digital scales.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <ShieldAlert className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Clinical Alerting &amp; Thresholds</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Configurable rule engines that notify on-call nurses and doctors when patient vital trends deviate from safe baseline parameters.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <Eye className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Clinician Review Dashboards</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                High-density cohort dashboards allowing clinical staff to prioritize patient follow-ups based on real-time risk indicators.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/80 border border-emerald-500/20 text-xs text-gray-400 font-mono leading-relaxed">
            <strong className="text-emerald-400">Clinical Responsibility Note:</strong> Our RPM software architectures are engineered to support clinical observation, data logging, and communication. They do not replace certified medical diagnostic equipment or independent physician clinical evaluations.
          </div>
        </section>

        {/* SECTION 9: Healthcare AI & Automation (H2) */}
        <section className="py-20 md:py-28 bg-zinc-950/80 border-b border-white/10" aria-labelledby="ai-automation-heading">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Intelligent Healthcare Workflows</span>
              <h2 id="ai-automation-heading" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
                Healthcare AI &amp; Automation
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                Artificial intelligence and workflow automation can dramatically reduce administrative burden, accelerate medical document processing, and improve operational throughput when implemented with strict privacy guardrails. As part of our healthcare AI automation solutions, we build specialized AI agents and automation pipelines designed for medical organizations.
              </p>
              
              <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-mono leading-relaxed mb-8">
                <strong>Important Clinical Disclaimer:</strong> All AI modules and automation pipelines developed by AbuQitmirLabs are designed exclusively to assist administrative workflows, structure documentation, and optimize operational scheduling. They do NOT replace qualified medical professionals, clinical judgment, diagnostic decision-making, or patient treatment planning.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <Bot className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Clinical Knowledge Assistants</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  RAG-based AI knowledge retrieval systems allowing medical staff to query institutional clinical guidelines, drug formulary databases, and standard operating procedures instantly.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <FileText className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Document Extraction &amp; OCR</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Automated extraction of structured clinical data from scanned referral letters, lab results, insurance cards, and medical histories into standardized JSON records.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <Workflow className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Scheduling &amp; Triage Automation</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Conversational intake agents that collect preliminary patient symptoms and match individuals with the appropriate specialty and appointment time slots.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <Sparkles className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Discharge Summary Drafting</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Automated generation of draft discharge instructions and patient visit summaries for physician review, reducing end-of-day charting fatigue.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-right">
              <Link to="/ai-agent-development" className="text-xs font-mono uppercase text-emerald-400 hover:text-white inline-flex items-center gap-1 font-semibold">
                Learn More About Our AI Agent Development &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 10: Healthcare Analytics & Clinical Dashboards (H2) */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="analytics-heading">
          <div className="max-w-3xl mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Operational Intelligence</span>
            <h2 id="analytics-heading" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Healthcare Analytics &amp; Clinical Dashboards
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              Data-driven healthcare organizations require actionable operational intelligence to optimize department capacity, manage clinical staffing, and track key performance indicators. We design high-performance healthcare data visualization systems that convert complex medical event streams into clear executive insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <Activity className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Department Throughput</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Real-time monitoring of emergency room wait times, patient intake velocity, consultation durations, and discharge turnaround times.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <Hospital className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Bed Occupancy Telemetry</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Visual bed-mapping interfaces showing available, occupied, and sanitizing beds across hospital wards and intensive care units.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <Users className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Staffing Optimization</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Predictive shift scheduling models aligned with historic patient admission trends to prevent clinician burnout.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <BarChart3 className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Financial Dashboards</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Consolidated reporting on insurance claim acceptance rates, copay collections, operational expenses, and clinical volume trends.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 11: Healthcare API Integration & Interoperability (H2) */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="integrations-heading">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">System Connectivity</span>
              <h2 id="integrations-heading" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
                Healthcare API Integration &amp; Interoperability
              </h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                No medical application exists in total isolation. We engineer secure API bridges and middleware connectors that integrate your custom healthcare software with existing medical ecosystem platforms, identity providers, and financial networks:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { category: "Clinical Interoperability", title: "FHIR & HL7 v2/v3 APIs", desc: "Bidirectional patient record syncing with external hospital EHR networks and regional health databases." },
                { category: "Diagnostics & Labs", title: "LIS & Imaging Connectors", desc: "Automated order entry and structured result ingestion from laboratory information systems and PACS DICOM archives." },
                { category: "Identity & Auth", title: "OAuth 2.0, OIDC & SAML", desc: "Enterprise single sign-on (SSO) connecting hospital Active Directory and federated healthcare identity providers." },
                { category: "Billing & Payments", title: "Payment Rails & Claims", desc: "Secure copay collection, digital invoicing, and EDI 837/835 insurance claim transmission bridges." }
              ].map((stack, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-zinc-900/50 border border-white/10">
                  <span className="text-[#ccff00] text-xs font-mono uppercase block mb-2">{stack.category}</span>
                  <h3 className="text-white font-bold text-base mb-2">{stack.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{stack.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 12: Healthcare Security & Data Protection (H2) */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="security-heading">
          <div className="max-w-4xl mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Engineering-Level Security</span>
            <h2 id="security-heading" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Healthcare Security &amp; Data Protection
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
              Data protection in healthcare is an essential engineering discipline. We build multi-layered security architectures designed to support healthcare-oriented privacy requirements, including HIPAA-aligned security rules in the United States, GDPR standards in Europe, and PIPEDA in Canada.
            </p>
            <p className="text-gray-400 text-base leading-relaxed">
              We implement defense-in-depth engineering practices that safeguard sensitive protected health information (PHI) across every architectural tier:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Role-Based Access Control (RBAC)", desc: "Granular permission matrices ensuring doctors, nurses, billing administrators, and patients only access their authorized data scopes.", icon: KeyRound },
              { title: "Immutable Audit Logging", desc: "Cryptographically verified event logs recording every patient record view, update, export, and deletion with precise UTC timestamps and user identifiers.", icon: ShieldCheck },
              { title: "End-to-End Data Encryption", desc: "All sensitive health data is encrypted using AES-256 at rest and TLS 1.3 across all network transmission channels and API endpoints.", icon: Lock },
              { title: "Multi-Factor Authentication (MFA)", desc: "Mandatory time-based one-time password (TOTP) and biometric multi-factor authentication for all clinical and administrative staff logins.", icon: KeyRound },
              { title: "Multi-Tenant Data Isolation", desc: "Logical and physical database isolation ensuring clinic client data is strictly segregated within multi-tenant cloud architectures.", icon: Database },
              { title: "Automated Backups & Recovery", desc: "Continuous point-in-time database snapshots with automated cross-region replication for rapid disaster recovery.", icon: Server }
            ].map((feat, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <feat.icon className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 13: Healthcare Software Development Process (H2 - 8 Steps) */}
        <section className="py-20 md:py-28 bg-zinc-950/80 border-b border-white/10" aria-labelledby="process-heading">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Engineering Lifecycle</span>
              <h2 id="process-heading" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
                Healthcare Software Development Process
              </h2>
              <p className="text-gray-400 text-base md:text-lg">
                A disciplined 8-step software engineering methodology designed for predictable delivery, security auditing, and clinical usability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Discovery & Requirements", desc: "Identify clinical workflows, user personas (doctors, nurses, administrators, patients), data governance standards, and operational objectives." },
                { step: "02", title: "Healthcare Workflow Mapping", desc: "Map comprehensive patient journeys, consultation lifecycles, clinical documentation touchpoints, and billing triggers." },
                { step: "03", title: "Architecture & Data Modeling", desc: "Design secure cloud architecture, zero-trust RBAC permissions, AES-256 encryption at rest, TLS 1.3 in transit, and immutable audit logs." },
                { step: "04", title: "UX/UI Design", desc: "Create low-cognitive-load, accessible user interfaces in Figma tailored for fast clinician charting and intuitive patient engagement." },
                { step: "05", title: "Application Development", desc: "Engineer responsive web frontends, cross-platform mobile apps, and robust microservices backends using modern TypeScript stacks." },
                { step: "06", title: "Integrations & Security", desc: "Connect FHIR/HL7 APIs, diagnostic laboratory feeds, payment gateways, and third-party healthcare service endpoints." },
                { step: "07", title: "Testing & Validation", desc: "Perform vulnerability scanning, penetration assessments, data isolation checks, and end-to-end clinical workflow testing." },
                { step: "08", title: "Deployment & Continuous Improvement", desc: "Deploy to cloud infrastructure with automated monitoring, backup redundancy, staff training, and continuous support SLAs." }
              ].map((p, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10">
                  <span className="text-2xl font-mono font-bold text-[#ccff00] block mb-3">{p.step}</span>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 14: Healthcare Software Development Cost (H2 + Direct Answer) */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="cost-heading">
          <div className="max-w-3xl mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Investment Scope</span>
            <h2 id="cost-heading" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Healthcare Software Development Cost
            </h2>
            
            {/* Direct Answer Block for Cost */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl mb-8 shadow-xl">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Direct Answer:</strong> Custom healthcare software development typically ranges from $15,000 for focused telemedicine modules or patient intake MVPs to $28,000–$55,000 for full clinic management platforms, and $55,000 to $95,000+ for enterprise hospital EHR suites. Total investment depends on user roles, third-party integrations, compliance auditing scope, and mobile platform support.
              </p>
            </div>

            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              Rather than offering generic flat fees, we scope healthcare software projects based on technical complexity drivers. Key factors influencing development investment include:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>&bull; Number of distinct user roles (doctors, nurses, receptionists, billing officers, patients)</li>
              <li>&bull; Third-party interoperability requirements (FHIR, HL7, LIS labs, eRx pharmacy networks)</li>
              <li>&bull; Real-time video conferencing infrastructure and WebRTC scaling needs</li>
              <li>&bull; Cross-platform mobile application requirements (iOS and Android)</li>
              <li>&bull; Security auditing, penetration testing, and data isolation depth</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <span className="text-emerald-400 font-mono text-2xl font-bold block mb-2">$15,000 &ndash; $28,000</span>
              <h3 className="text-xl font-bold text-white mb-3">Focused Telehealth / Patient MVP</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Targeted digital health application such as a WebRTC video consultation tool, digital intake form portal, or patient scheduling system.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-emerald-500/40">
              <span className="text-[#ccff00] font-mono text-2xl font-bold block mb-2">$28,000 &ndash; $55,000</span>
              <h3 className="text-xl font-bold text-white mb-3">Clinic Management Suite</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Full-featured practice portal with doctor scheduling, patient medical records, electronic prescription generation, automated billing, and secure messaging.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <span className="text-emerald-400 font-mono text-2xl font-bold block mb-2">$55,000 &ndash; $95,000+</span>
              <h3 className="text-xl font-bold text-white mb-3">Enterprise Hospital &amp; Custom EHR Suite</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Multi-facility hospital platform with deep FHIR/HL7 interoperability, clinical telemetry dashboards, inpatient bed tracking, and custom billing clearinghouses.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 15: How Long Does Healthcare Software Development Take? (H2 + Direct Answer) */}
        <section className="py-20 md:py-28 bg-zinc-950/80 border-b border-white/10" aria-labelledby="timeline-heading">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Delivery Timeline</span>
              <h2 id="timeline-heading" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
                How Long Does Healthcare Software Development Take?
              </h2>

              {/* Direct Answer Block for Timeline */}
              <div className="bg-zinc-900/90 border-l-4 border-emerald-400 p-6 rounded-r-2xl mb-8 shadow-xl">
                <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                  <strong className="text-emerald-400">Direct Answer:</strong> Developing a custom healthcare software MVP or telehealth portal generally takes 8 to 12 weeks. Mid-sized clinic management platforms take 12 to 18 weeks, while comprehensive multi-facility hospital suites and enterprise EHR platforms with complex FHIR/HL7 integrations typically require 18 to 26+ weeks depending on feature complexity and security validation.
                </p>
              </div>

              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                We structure our engineering timelines into agile two-week development sprints with interactive staging demonstrations at every milestone:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <span className="text-[#ccff00] font-mono text-xl font-bold block mb-2">8 &ndash; 12 Weeks</span>
                <h3 className="text-xl font-bold text-white mb-2">Telehealth / MVP Release</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Rapid deployment of patient booking, video calls, intake forms, and essential profile administration.</p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <span className="text-[#ccff00] font-mono text-xl font-bold block mb-2">12 &ndash; 18 Weeks</span>
                <h3 className="text-xl font-bold text-white mb-2">Clinic Management System</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Multi-practitioner scheduling, customized EHR charting, electronic prescriptions, and billing workflows.</p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <span className="text-[#ccff00] font-mono text-xl font-bold block mb-2">18 &ndash; 26+ Weeks</span>
                <h3 className="text-xl font-bold text-white mb-2">Enterprise Hospital Suite</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Multi-department hospital orchestration, deep FHIR/HL7 message bridges, lab LIS sync, and analytics dashboards.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 16: Why Choose AbuQitmirLabs for Healthcare Software Development? (H2) */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="why-choose-heading">
          <div className="max-w-3xl mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Engineering Partner</span>
            <h2 id="why-choose-heading" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Why Choose AbuQitmirLabs for Healthcare Software Development?
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              We combine rigorous full-stack software engineering discipline with medical domain awareness to deliver digital health platforms that perform reliably under demanding clinical environments:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">100% Client Code &amp; IP Ownership</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                You retain complete, unencumbered intellectual property ownership of all custom source code, database architectures, and API endpoints with zero vendor lock-in.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Cross-Disciplinary Team</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Full-stack TypeScript engineers, UI/UX designers, mobile app developers, and API integration specialists collaborating seamlessly in-house.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Agile Milestone Delivery</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Transparent two-week sprint reviews with interactive staging demonstrations allowing your clinical stakeholders to test and refine features early.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Direct Architect Access</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Communicate directly with senior technical architects and software engineers rather than layers of non-technical account managers.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 17: Frequently Asked Questions (H2 + 10 FAQs) */}
        <section className="py-20 md:py-28 max-w-4xl mx-auto px-6 border-b border-white/10" aria-labelledby="faq-heading">
          <div className="text-center mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Clear Answers</span>
            <h2 id="faq-heading" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Answers to common technical, financial, and architectural questions regarding custom healthcare software development.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-white/10 rounded-2xl bg-zinc-900/50 overflow-hidden">
                <button 
                  className="w-full p-6 text-left font-bold text-lg flex items-center justify-between gap-4 hover:text-[#ccff00] transition-colors"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  aria-expanded={activeFaq === idx}
                >
                  <span>{faq.q}</span>
                  <Plus className={`w-5 h-5 text-[#ccff00] shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-45' : ''}`} />
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
        </section>

        {/* SECTION 18: Healthcare Technical Architecture Guides & Publications */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="resources-heading">
          <div className="max-w-3xl mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Engineering Insights</span>
            <h2 id="resources-heading" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Healthcare Engineering &amp; Architecture Guides
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              Explore in-depth technical blueprints, compliance protocols, and system designs written by our principal software architects:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between hover:border-[#ccff00]/40 transition-colors group">
              <div>
                <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">2026 Complete Guide</span>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ccff00] transition-colors">
                  What Are Healthcare AI Agents? Complete 2026 Guide
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Autonomous cognitive architectures, EHR integration via FHIR APIs, RAG clinical triage, HIPAA-aligned security, and engineering workflows.
                </p>
              </div>
              <Link 
                to="/blog/what-are-healthcare-ai-agents-complete-guide-2026"
                className="text-xs font-mono text-[#ccff00] hover:underline inline-flex items-center gap-2 uppercase tracking-wider font-bold"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between hover:border-[#ccff00]/40 transition-colors group">
              <div>
                <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">Industry Solutions</span>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ccff00] transition-colors">
                  Healthcare Software Development Solutions (2026 Guide)
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  EHR platforms, telemedicine systems, clinical workflow software, and compliance &amp; interoperability requirements.
                </p>
              </div>
              <Link 
                to="/blog/healthcare-software-development-solutions-2026"
                className="text-xs font-mono text-[#ccff00] hover:underline inline-flex items-center gap-2 uppercase tracking-wider font-bold"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between hover:border-[#ccff00]/40 transition-colors group">
              <div>
                <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3 font-bold">AI Engineering</span>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ccff00] transition-colors">
                  Healthcare AI Agent Development Services
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Autonomous agents for clinical triage, EHR FHIR integrations, patient support, and human-in-the-loop medical workflows.
                </p>
              </div>
              <Link 
                to="/ai-agent-development"
                className="text-xs font-mono text-[#ccff00] hover:underline inline-flex items-center gap-2 uppercase tracking-wider font-bold"
              >
                <span>Explore AI Agent Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-28 text-center bg-gradient-to-b from-zinc-900 to-black" aria-labelledby="cta-heading">
          <div className="max-w-4xl mx-auto px-6">
            <h2 id="cta-heading" className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Ready to Build Your Healthcare Software Platform?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Schedule a confidential technical discovery session with our senior software engineering team to discuss your clinical requirements, architecture, and timeline.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-5">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(204,255,0,0.4)]"
              >
                Schedule Healthcare Technical Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/about/our-company" 
                className="px-8 py-5 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider"
              >
                About AbuQitmirLabs
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HealthcarePlatformsPage;

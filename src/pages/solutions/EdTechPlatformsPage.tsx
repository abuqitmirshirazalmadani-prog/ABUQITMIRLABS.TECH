import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  Video, 
  Award, 
  Users, 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  TrendingUp,
  BrainCircuit,
  MessageSquare,
  ShieldCheck,
  Cpu,
  Clock,
  DollarSign,
  FileCheck,
  Lock,
  Globe,
  Code2
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountryMarquee from '../../components/CountryMarquee';
import { edTechSchema } from '../../utils/edTechStaticHtml';

const EdTechPlatformsPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is EdTech software development?",
      a: "EdTech software development is the process of engineering digital educational systems, including custom learning management systems (LMS), WebRTC virtual classrooms, AI adaptive tutoring engines, student and teacher portals, examination platforms, and learning analytics software designed to streamline teaching and improve learning outcomes."
    },
    {
      q: "What is custom LMS development?",
      a: "Custom LMS development involves building a tailored learning management system designed around your specific curriculum, user roles, branding, and workflows. Unlike rigid off-the-shelf software, a bespoke LMS offers full source code ownership, zero per-seat licensing fees, custom testing modules, and seamless integration with your existing administrative tools."
    },
    {
      q: "How much does it cost to build an EdTech platform?",
      a: "The cost to build an EdTech platform depends on platform complexity, user concurrency, custom workflows, integrations, and AI capabilities. A streamlined course portal or MVP LMS typically ranges from $10,000 to $20,000, while a comprehensive enterprise LMS with live WebRTC video, adaptive AI tutoring, and multi-tenant school management ranges from $25,000 to $50,000+."
    },
    {
      q: "How long does it take to build an LMS?",
      a: "A standard custom LMS or online course MVP typically takes 6 to 10 weeks to develop and launch. Large-scale educational platforms with live WebRTC streaming, multi-tier school hierarchies, automated proctoring, and mobile applications generally require 10 to 16 weeks depending on the technical scope."
    },
    {
      q: "Can you build virtual classroom software?",
      a: "Yes. We engineer real-time virtual classroom software utilizing low-latency WebRTC streaming, interactive multi-user whiteboards, screen sharing, in-session chat, breakout rooms, automated cloud recording, and instructor moderation controls."
    },
    {
      q: "Can AI be integrated into an EdTech platform?",
      a: "Yes. We integrate AI capabilities including conversational 24/7 AI tutoring assistants, adaptive difficulty adjustments based on learner performance, automated quiz generation from lesson transcripts, homework grading assistance, and predictive retention analytics."
    },
    {
      q: "Can EdTech platforms support schools and universities?",
      a: "Yes. We architect scalable platforms specifically designed for schools, colleges, and universities, featuring multi-campus management, role-based access control for faculty, students, and parents, gradebook synchronization, transcript generation, and student information system (SIS) integrations."
    },
    {
      q: "What technologies are used for EdTech development?",
      a: "Our modern EdTech stack typically utilizes React, Next.js, and TypeScript on the frontend for sub-second UI interactions; Node.js, Python, PostgreSQL, and Redis for high-concurrency backend services; WebRTC and WebSockets for real-time video and collaboration; and secure cloud hosting on AWS or Google Cloud."
    },
    {
      q: "Can an EdTech platform include mobile apps?",
      a: "Yes. We develop cross-platform mobile learning applications for iOS and Android using Flutter and React Native. These apps feature offline lesson downloads, push notifications for assignment deadlines, responsive video playback, and biometric authentication."
    },
    {
      q: "How do you secure EdTech platforms?",
      a: "We implement defense-in-depth security including TLS 1.3 encryption in transit, AES-256 encryption at rest, strict role-based access control (RBAC), multi-factor authentication (MFA), automated audit logging, secure tokenized payment processing, and rigorous adherence to WCAG 2.1 AA accessibility standards."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <Helmet>
        <title>EdTech Software Development | LMS &amp; Learning Platforms</title>
        <meta name="description" content="Build scalable EdTech software with custom LMS platforms, virtual classrooms, AI tutoring, student portals, assessments, and learning analytics." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/solutions/edtech" />

        {/* Open Graph */}
        <meta property="og:title" content="EdTech Software Development | LMS &amp; Learning Platforms" />
        <meta property="og:description" content="Build scalable EdTech software with custom LMS platforms, virtual classrooms, AI tutoring, student portals, assessments, and learning analytics." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/solutions/edtech" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EdTech Software Development | LMS &amp; Learning Platforms" />
        <meta name="twitter:description" content="Build scalable EdTech software with custom LMS platforms, virtual classrooms, AI tutoring, student portals, assessments, and learning analytics." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Unified 7-Node JSON-LD Schema */}
        <script type="application/ld+json">{JSON.stringify(edTechSchema)}</script>
      </Helmet>

      {/* Accessible Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#ccff00] focus:text-black focus:font-bold focus:rounded-lg"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'Solutions', path: '/#services' },
            { label: 'EdTech Software Development', path: '/solutions/edtech' }
          ]} />
        </div>

        {/* Hero Section with EXACT Single H1 */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10" aria-labelledby="edtech-hero-title">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(204,255,0,0.06),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-8">
              <GraduationCap className="w-4 h-4 text-[#ccff00]" /> Next-Gen Educational Engineering
            </div>

            <h1 id="edtech-hero-title" className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl text-white">
              EdTech Software Development for Modern Learning
            </h1>

            {/* Direct Answer Block for AEO/GEO */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl max-w-4xl mb-12 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Direct Answer:</strong> EdTech software development is the process of building digital education platforms such as learning management systems, virtual classrooms, student portals, assessment tools, AI tutoring systems, and learning analytics platforms. Custom EdTech software connects teaching, learning, administration, and engagement workflows in one scalable digital environment.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-10 font-light">
              Generic off-the-shelf course plugins fail to engage students or handle concurrent live exams. We build custom, gamified, AI-enhanced learning software tailored for universities, academies, and forward-thinking EdTech startups with full source code ownership.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Discuss Your EdTech Platform <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/custom-software" 
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider"
              >
                Custom Software Engineering
              </Link>
            </div>
          </div>
        </section>

        <CountryMarquee />

        {/* Section 1: What Is EdTech Software Development? */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="what-is-edtech-h2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Architectural Foundation</span>
              <h2 id="what-is-edtech-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
                What Is EdTech Software Development?
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                <strong className="text-white font-medium">EdTech software development</strong> encompasses the comprehensive architectural planning, user interface engineering, database design, and cloud deployment of digital education systems. Modern education technology transforms traditional classrooms into interactive, data-informed digital ecosystems where learners acquire skills at their own pace, instructors assess comprehension in real time, and administrators oversee multi-campus operations with complete clarity.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                Unlike generic course plugins that impose recurring per-seat fees or crash during concurrent exam submissions, purpose-built educational platforms deliver complete intellectual property ownership, zero licensing limits, and granular data privacy. From integrating <Link to="/web-development" className="text-[#ccff00] hover:underline font-medium">high-performance web development</Link> for sub-second course delivery to implementing <Link to="/ai-agent-development" className="text-[#ccff00] hover:underline font-medium">AI agent development</Link> for 24/7 student tutoring, custom EdTech software provides the foundation for sustainable institutional growth.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Custom EdTech Software Solutions We Build */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="solutions-we-build-h2">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Platform Capabilities</span>
            <h2 id="solutions-we-build-h2" className="text-3xl md:text-5xl font-extrabold mt-3 mb-6 text-white">
              Custom EdTech Software Solutions We Build
            </h2>
            <p className="text-gray-400 text-base md:text-lg font-light">
              Engineered with adaptive AI, WebRTC video streaming, high-concurrency exam processing, and real-time student analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Learning Management System Development",
                desc: "Bespoke LMS platforms engineered for modular course authoring, multi-format media delivery (video, audio, code exercises), hierarchical syllabus builders, prerequisite unlocking, and automated gradebook tracking.",
                tag: "LMS Systems",
                icon: GraduationCap,
                link: "/web-development",
                linkText: "High-performance web development"
              },
              {
                title: "Virtual Classroom Development",
                desc: "Ultra-low-latency real-time video classrooms built with WebRTC. Includes collaborative interactive whiteboards, screen sharing, multi-track audio, breakout rooms, automated cloud recording, and instructor moderation.",
                tag: "Live Video",
                icon: Video,
                link: "/custom-software",
                linkText: "Custom software engineering"
              },
              {
                title: "Online Learning Platform Development",
                desc: "Scalable course selling marketplaces and cohort-based learning hubs with integrated payment gateways, subscription tiers, affiliate referral tracking, and automated access provisioning.",
                tag: "Course Marketplaces",
                icon: Award,
                link: "/web-development",
                linkText: "Explore web architectures"
              },
              {
                title: "Student and Teacher Portals",
                desc: "Role-tailored dashboards providing students with homework hubs, progress charts, and peer discussions, while equipping educators with rapid assignment grading, lesson schedule managers, and attendance tools.",
                tag: "User Portals",
                icon: Users,
                link: "/mobile-app-development",
                linkText: "EdTech mobile app development"
              },
              {
                title: "Assessment and Examination Platforms",
                desc: "High-concurrency testing engines engineered to process thousands of simultaneous submissions with randomized question banks, timed test locks, rich question formats, and automated scoring.",
                tag: "Testing Engines",
                icon: FileCheck,
                link: "/custom-software",
                linkText: "High-concurrency systems"
              },
              {
                title: "Certification and Credential Platforms",
                desc: "Automated PDF certificate generation, verifiable cryptographic credential URLs, digital badge integrations for LinkedIn, and verifiable transcript repositories that prevent educational credential fraud.",
                tag: "Digital Badges",
                icon: ShieldCheck,
                link: "/solutions/ai-automation",
                linkText: "AI workflow automation"
              },
              {
                title: "AI-Powered Tutoring and Learning Assistants",
                desc: "Adaptive 24/7 AI tutoring agents powered by large language models that guide students through challenging STEM and humanities concepts using step-by-step Socratic hints without directly revealing test answers.",
                tag: "AI Education",
                icon: Bot,
                link: "/ai-agent-development",
                linkText: "Custom AI tutor development"
              },
              {
                title: "Learning Analytics and Reporting",
                desc: "Executive learning telemetry dashboards that track student retention rates, drop-off hotspots within video modules, subject mastery distributions, and real-time intervention indicators for at-risk learners.",
                tag: "Analytics",
                icon: TrendingUp,
                link: "/custom-software",
                linkText: "Analytics pipelines"
              },
              {
                title: "Gamification and Student Engagement",
                desc: "Interactive learning loops featuring daily streak counters, achievement badges, leaderboards, interactive quiz challenges, and reward systems proven to boost course completion rates.",
                tag: "Gamification",
                icon: Sparkles,
                link: "/mobile-app-development",
                linkText: "Engaging mobile experiences"
              },
              {
                title: "Education Workflow Automation",
                desc: "End-to-end automation of administrative overhead, including student onboarding emails, automated grading sync with SIS records, invoice generation, attendance alerts to parents, and course renewal reminders.",
                tag: "Automation",
                icon: BrainCircuit,
                link: "/solutions/ai-automation",
                linkText: "Educational workflow automation"
              }
            ].map((sol, idx) => (
              <motion.article 
                key={idx} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-[#ccff00]/50 hover:shadow-[0_0_30px_rgba(204,255,0,0.2)] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between ${idx === 9 ? 'md:col-span-2 lg:col-span-3' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ccff00]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full">
                      {sol.tag}
                    </span>
                    <sol.icon className="w-8 h-8 text-gray-400 group-hover:text-[#ccff00] group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#ccff00] transition-colors">{sol.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">{sol.desc}</p>
                </div>
                <Link to={sol.link} className="text-xs font-mono uppercase text-[#ccff00] hover:text-white flex items-center gap-1 mt-4 transition-colors font-semibold">
                  {sol.linkText} <ChevronRight className="w-3 h-3" />
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Section 3: EdTech Solutions by Business Need / Who Is This For? */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="business-needs-h2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Market Segmentation</span>
              <h2 id="business-needs-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
                EdTech Solutions by Business Need
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                Different education providers face distinct operational and technological hurdles. Here is how our tailored software engineering solves specific sector challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "EdTech Startups",
                  desc: "Startups require rapid MVP engineering to validate novel pedagogical ideas without accumulating technical debt. We build lightweight, extensible platforms featuring modular APIs and full IP ownership."
                },
                {
                  title: "Schools and Academies",
                  desc: "K-12 schools and private academies need intuitive parent-teacher communication, attendance tracking, secure student data management, and child-safe digital testing environments."
                },
                {
                  title: "Universities and Higher Education",
                  desc: "Colleges and universities demand high-concurrency exam infrastructure, multi-department course catalogs, research repository access, and seamless integration with legacy ERP systems."
                },
                {
                  title: "Corporate Training Platforms",
                  desc: "Enterprises require compliance tracking, employee onboarding paths, SCORM/xAPI compatibility, role-based skill certification, and executive HR telemetry dashboards."
                },
                {
                  title: "Online Course Businesses",
                  desc: "Creators and cohort coaches outgrowing commercial course platforms need custom checkout funnels, automated community spaces, digital upsells, and zero platform transaction cuts."
                },
                {
                  title: "Enterprise Education Platforms",
                  desc: "Global credentialing organizations require multi-tenant architectures, localized multi-language course content, localized tax handling, and enterprise SLA-backed reliability."
                }
              ].map((need, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-colors">
                  <h3 className="text-xl font-bold mb-3 text-white">{need.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed font-light">{need.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Key Features of Modern EdTech Platforms */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="key-features-h2">
          <div className="max-w-3xl mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Core Modules</span>
            <h2 id="key-features-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
              Key Features of Modern EdTech Platforms
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Every platform we engineer is equipped with robust, production-grade features built for scalability, intuitive administration, and high learner retention.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm">
            {[
              { name: "Course Management", desc: "Modular curriculum builders with video, audio, text, and rich downloadable files." },
              { name: "Student Dashboards", desc: "Personalized learning paths, upcoming deadlines, and progress telemetry." },
              { name: "Teacher Dashboards", desc: "Rapid gradebook grading, assignment reviews, and class performance overviews." },
              { name: "Assignments & Quizzes", desc: "Timed submissions, rubric evaluations, automated grading, and rich file attachments." },
              { name: "Exams & Testing", desc: "Randomized question banks, anti-cheating browser locks, and auto-submit timers." },
              { name: "Progress Tracking", desc: "Real-time attendance logging, completion badges, and milestone tracking." },
              { name: "Certificates", desc: "Automated PDF generation with verifiable QR codes and LinkedIn sharing." },
              { name: "Payment Processing", desc: "Stripe, PayPal, Apple Pay, multi-currency pricing, and subscription billing." },
              { name: "Smart Notifications", desc: "Automated email, SMS, and in-app alerts for deadlines and class updates." },
              { name: "Video Learning", desc: "Adaptive bitrate video streaming with playback speed control and captions." },
              { name: "Live WebRTC Classes", desc: "Low-latency video streaming, whiteboards, breakout rooms, and session records." },
              { name: "Discussion & Community", desc: "Threaded discussions, peer upvoting, teacher endorsements, and chat rooms." },
              { name: "Learning Analytics", desc: "Student drop-off identification, comprehension graphs, and cohort comparisons." },
              { name: "Role-Based Access", desc: "Granular permissions for Super Admins, Instructors, TAs, Students, and Parents." },
              { name: "Mobile Responsiveness", desc: "Flawless touch experiences on iOS and Android phones, tablets, and desktops." },
              { name: "Accessibility (WCAG)", desc: "Screen reader compatibility, keyboard navigation, and high contrast styling." }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-all">
                <strong className="text-white block mb-1 text-base">{feature.name}</strong>
                <p className="text-gray-400 font-light text-xs leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: AI in EdTech */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="ai-edtech-h2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Artificial Intelligence</span>
              <h2 id="ai-edtech-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
                AI in EdTech
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                Artificial intelligence is transforming passive education into dynamic, adaptive learning. We build safe, hallucination-resistant AI systems tailored specifically for educational contexts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Tutors",
                  desc: "Context-aware AI tutors capable of guiding learners through complex equations, writing revisions, and code debugging with personalized Socratic questioning."
                },
                {
                  title: "AI Learning Assistants",
                  desc: "In-course assistants that summarize lengthy lecture transcripts, generate practice flashcards, and answer student questions directly from validated course notes."
                },
                {
                  title: "Personalized Learning",
                  desc: "Adaptive learning algorithms that measure quiz performance in real time and automatically recalibrate exercise difficulty to fill specific knowledge gaps."
                },
                {
                  title: "AI Assessment Support",
                  desc: "Automated evaluation tools that assist educators with essay feedback, rubric alignment, grammar scoring, and plagiarism detection."
                },
                {
                  title: "Education AI Agents",
                  desc: "Autonomous agents that conduct proactive student check-ins, send study reminders when engagement drops, and escalate difficulties to instructors."
                },
                {
                  title: "Automated Administrative Workflows",
                  desc: "Intelligent document parsers that extract enrollment records, match transcripts against graduation requirements, and auto-generate compliance reports."
                }
              ].map((aiItem, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00]/40 transition-all">
                  <h3 className="text-xl font-bold mb-3 text-white">{aiItem.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed font-light">{aiItem.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Virtual Classroom and Live Learning Technology */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="live-learning-h2">
          <div className="max-w-4xl">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Real-Time Video Systems</span>
            <h2 id="live-learning-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
              Virtual Classroom and Live Learning Technology
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
              High-quality remote learning requires resilient, sub-second video infrastructure that remains crystal clear across varying network conditions. We engineer custom virtual classroom platforms using <strong className="text-white font-medium">WebRTC</strong>, WebSocket event streaming, and Selective Forwarding Units (SFUs) to deliver low-latency interactive video broadcasts.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
              Our live classrooms include collaborative vector whiteboards where instructors and students solve problems simultaneously, selective screen sharing, moderated real-time chat with emoji reactions, automated attendance logs, instant hand-raising queues, and breakout rooms where students collaborate in small pods before returning to the main session. Automated server-side recording archives classes directly to secure cloud storage for on-demand review.
            </p>
          </div>
        </section>

        {/* Section 7: EdTech Technology Stack */}
        <section className="py-20 md:py-28 bg-zinc-950/80 border-b border-white/10" aria-labelledby="tech-stack-h2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Modern Architecture</span>
              <h2 id="tech-stack-h2" className="text-3xl md:text-5xl font-extrabold mt-3 text-white">EdTech Technology Stack</h2>
              <p className="text-gray-400 text-lg font-light mt-4">
                We select battle-tested, modern engineering tools configured specifically for performance, sub-second rendering, and high-concurrency reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { category: "Frontend Architecture", title: "React, Next.js & TypeScript", desc: "Fast, accessible interfaces with server-side rendering, instant search filters, and smooth mobile transitions." },
                { category: "Backend & APIs", title: "Node.js, Python & REST/GraphQL", desc: "Scalable microservices for exam processing, automated grading logic, and secure user permission gates." },
                { category: "Real-Time & Video", title: "WebRTC, WebSockets & LiveKit", desc: "Sub-200ms latency video classrooms, interactive whiteboards, and real-time live polling infrastructure." },
                { category: "Database & Cloud", title: "PostgreSQL, Redis & AWS/GCP", desc: "ACID-compliant student databases, high-speed Redis caching, and automated CDN edge video delivery." }
              ].map((stack, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-zinc-900/50 border border-white/10 hover:border-[#ccff00]/40 transition-all">
                  <span className="text-[#ccff00] text-xs font-mono uppercase block mb-2">{stack.category}</span>
                  <strong className="text-white block mb-2 text-base">{stack.title}</strong>
                  <p className="text-gray-400 text-xs font-light leading-relaxed">{stack.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 8: EdTech Security and Accessibility */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="security-h2">
          <div className="max-w-4xl">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Trust &amp; Inclusion</span>
            <h2 id="security-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
              EdTech Security and Accessibility
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
              Educational platforms store sensitive student data, academic records, and payment credentials. We implement enterprise-grade security protocols across all layers: <strong className="text-white font-medium">TLS 1.3</strong> for all data in transit, <strong className="text-white font-medium">AES-256 encryption</strong> for stored databases, strict role-based access control (RBAC), multi-factor authentication (MFA), and immutable audit logs that record all administrative grade modifications.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
              Inclusivity is an integral engineering requirement. All user interfaces are developed adhering to <strong className="text-white font-medium">WCAG 2.1 AA</strong> accessibility benchmarks, ensuring comprehensive screen-reader support, full keyboard navigation for motor-impaired learners, clear visual focus states, and high contrast ratios across all educational modules.
            </p>
          </div>
        </section>

        {/* Section 9: How We Build EdTech Software (8 Steps) */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="how-we-build-h2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Methodology</span>
              <h2 id="how-we-build-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
                How We Build EdTech Software
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                Our disciplined 8-stage software engineering process ensures that your education platform is delivered on time, within scope, and engineered for high learner engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Discovery", desc: "Evaluating pedagogical objectives, learner demographics, licensing requirements, and curriculum structures." },
                { step: "02", title: "Learning Workflow Analysis", desc: "Mapping student paths, assignment review pipelines, automated grading rubrics, and reporting protocols." },
                { step: "03", title: "UX/UI Architecture", desc: "Designing clean, WCAG-compliant dashboards and focus-driven interfaces in Figma for rapid stakeholder validation." },
                { step: "04", title: "Platform Architecture", desc: "Designing scalable relational schemas in PostgreSQL, caching topologies in Redis, and secure API microservices." },
                { step: "05", title: "Core Development", desc: "Developing course modules, live video rooms, interactive student quizzes, teacher gradebooks, and payment integrations." },
                { step: "06", title: "Integrations and AI", desc: "Connecting LLM AI tutoring agents, automated quiz generators, third-party SIS databases, and communication APIs." },
                { step: "07", title: "Security & QA Testing", desc: "Running high-concurrency exam load tests, vulnerability scanning, WCAG accessibility reviews, and end-to-end tests." },
                { step: "08", title: "Deployment & Improvement", desc: "Executing zero-downtime cloud deployments, real-time performance telemetry monitoring, and data-driven updates." }
              ].map((st, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-zinc-900/40 border border-white/10 hover:border-[#ccff00]/40 transition-all">
                  <span className="text-[#ccff00] font-mono text-xl font-bold block mb-2">{st.step}</span>
                  <h3 className="text-lg font-bold text-white mb-2">{st.title}</h3>
                  <p className="text-gray-400 text-xs font-light leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 10: How Much Does EdTech Software Development Cost? */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="cost-h2">
          <div className="max-w-4xl">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Investment Transparency</span>
            <h2 id="cost-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
              How Much Does EdTech Software Development Cost?
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
              The investment required to build custom EdTech software is directly influenced by technical complexity, concurrent user scale, custom integration depth, and advanced features such as AI tutoring or live WebRTC video streaming.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="p-6 rounded-xl bg-zinc-900/60 border border-white/10">
                <span className="text-[#ccff00] text-xs font-mono uppercase block mb-1">Course Portal MVP</span>
                <strong className="text-2xl font-bold text-white block mb-2">$10,000 – $20,000</strong>
                <p className="text-gray-400 text-xs font-light leading-relaxed">Custom LMS storefront, video course authoring, Stripe payment checkout, progress tracking, and student discussion areas.</p>
              </div>
              <div className="p-6 rounded-xl bg-zinc-900/60 border border-[#ccff00]/40">
                <span className="text-[#ccff00] text-xs font-mono uppercase block mb-1">Full-Featured Platform</span>
                <strong className="text-2xl font-bold text-white block mb-2">$20,000 – $35,000</strong>
                <p className="text-gray-400 text-xs font-light leading-relaxed">Interactive quizzes, teacher gradebook portals, automated certificates, WebRTC live video rooms, and mobile responsive apps.</p>
              </div>
              <div className="p-6 rounded-xl bg-zinc-900/60 border border-white/10">
                <span className="text-[#ccff00] text-xs font-mono uppercase block mb-1">Enterprise LMS &amp; AI</span>
                <strong className="text-2xl font-bold text-white block mb-2">$35,000 – $50,000+</strong>
                <p className="text-gray-400 text-xs font-light leading-relaxed">Multi-tenant university hierarchy, 24/7 AI tutoring assistants, high-concurrency exam systems, SIS synchronization, and custom mobile apps.</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Unlike SaaS platforms that extract monthly per-user licensing fees, our bespoke software builds provide complete source code and intellectual property ownership upon milestone completion.
            </p>
          </div>
        </section>

        {/* Section 11: How Long Does It Take to Build an EdTech Platform? */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="timeline-h2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Project Scheduling</span>
              <h2 id="timeline-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
                How Long Does It Take to Build an EdTech Platform?
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                Development timelines vary depending on architectural scope:
              </p>
              <ul className="space-y-4 text-gray-300 font-light text-base mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-[#ccff00] font-bold">•</span>
                  <span><strong className="text-white">6 to 10 Weeks:</strong> A focused online course MVP or single-organization learning management system.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ccff00] font-bold">•</span>
                  <span><strong className="text-white">10 to 14 Weeks:</strong> A comprehensive platform featuring interactive quizzes, WebRTC live video classrooms, teacher grading dashboards, and payment portals.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ccff00] font-bold">•</span>
                  <span><strong className="text-white">14 to 18+ Weeks:</strong> Multi-tenant university systems, high-concurrency examination engines, AI tutoring agents, and native iOS/Android mobile applications.</span>
                </li>
              </ul>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                We utilize two-week agile development sprints, providing working software builds at the conclusion of each milestone for transparent progress tracking.
              </p>
            </div>
          </div>
        </section>

        {/* Section 12: Why Choose AbuQitmirLabs for EdTech Development? */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" aria-labelledby="why-choose-h2">
          <div className="max-w-4xl">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Engineering Studio</span>
            <h2 id="why-choose-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
              Why Choose AbuQitmirLabs for EdTech Development?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
                <h3 className="text-xl font-bold mb-3 text-white">100% Code &amp; IP Ownership</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  You retain complete legal ownership of all source code, design files, database architectures, and intellectual property. No vendor lock-in or recurring per-seat penalties.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
                <h3 className="text-xl font-bold mb-3 text-white">High-Concurrency Performance</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  Our systems are engineered to pass Google's Core Web Vitals with sub-second page loads and withstand sudden traffic surges during live examinations and streaming broadcasts.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
                <h3 className="text-xl font-bold mb-3 text-white">Integrated AI Capabilities</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  We natively build LLM-powered tutoring agents and adaptive assessment algorithms directly into course workflows rather than relying on brittle third-party iframe embeds.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
                <h3 className="text-xl font-bold mb-3 text-white">WCAG 2.1 AA Accessibility</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  Every user interface is structured with semantic HTML, keyboard focus management, and screen-reader optimizations to guarantee an inclusive experience for all learners.
                </p>
              </div>
            </div>

            {/* E-E-A-T Team Signal */}
            <div className="p-8 rounded-2xl bg-zinc-900/70 border border-[#ccff00]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Built by Experienced Software Engineers</h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  AbuQitmirLabs is an elite software engineering studio based in Karachi, Pakistan, serving educational innovators across the US, UK, Canada, Australia, and the EU. Explore our <Link to="/blog" className="text-[#ccff00] hover:underline">technical engineering blog</Link> or learn more <Link to="/about/our-company" className="text-[#ccff00] hover:underline">about AbuQitmirLabs</Link>.
                </p>
              </div>
              <Link to="/about/our-company" className="px-6 py-3 bg-white/10 hover:bg-[#ccff00] hover:text-black transition-all rounded-xl text-xs font-mono uppercase tracking-wider text-white font-bold whitespace-nowrap">
                About AbuQitmirLabs &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Section 13: Frequently Asked Questions (All 10 Interactive FAQs) */}
        <section className="py-20 md:py-28 bg-zinc-950/90 border-t border-white/10" aria-labelledby="faq-section-h2">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Direct Answers</span>
              <h2 id="faq-section-h2" className="text-3xl md:text-5xl font-extrabold mt-3 text-white">Frequently Asked Questions</h2>
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
                    <Plus className={`w-5 h-5 text-[#ccff00] shrink-0 transition-transform ${activeFaq === idx ? 'rotate-45' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-6 pt-0 text-gray-300 text-sm leading-relaxed border-t border-white/5 font-light"
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
        <section className="py-20 md:py-28 text-center bg-gradient-to-b from-zinc-900 to-black border-t border-white/10" aria-labelledby="cta-section-h2">
          <div className="max-w-4xl mx-auto px-6">
            <h2 id="cta-section-h2" className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
              Ready to Transform Education?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Schedule a technical consultation with our lead EdTech software architects to plan your custom learning platform build.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(204,255,0,0.4)]"
            >
              Discuss Your EdTech Platform <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EdTechPlatformsPage;

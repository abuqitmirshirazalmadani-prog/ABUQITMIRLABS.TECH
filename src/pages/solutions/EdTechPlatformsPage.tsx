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
  MessageSquare
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountryMarquee from '../../components/CountryMarquee';

const EdTechPlatformsPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is EdTech software development?",
      a: "EdTech software development is the engineering of educational applications, including Learning Management Systems (LMS), interactive virtual classrooms, AI adaptive tutoring engines, student progress analytics, and online certification marketplaces."
    },
    {
      q: "Can you incorporate AI adaptive learning into custom LMS platforms?",
      a: "Yes. We build intelligent assessment algorithms and AI agents that evaluate student performance in real time, adapting lesson difficulty, generating custom practice quizzes, and providing instant feedback."
    },
    {
      q: "How long does it take to build a custom EdTech or LMS platform?",
      a: "A custom online course platform or corporate LMS MVP takes approximately 8 to 12 weeks. Large-scale university portals or virtual classroom suites with live WebRTC video take 12 to 18 weeks."
    },
    {
      q: "How much does custom EdTech platform development cost?",
      a: "Custom EdTech solutions range from $12,000 for specialized course portals to $40,000+ for enterprise learning management systems with AI grading and WebRTC streaming."
    },
    {
      q: "Are your educational platforms WCAG and accessibility compliant?",
      a: "Yes. All our EdTech applications are engineered to comply with WCAG 2.1 AA accessibility guidelines, ensuring screen reader compatibility, keyboard navigation, and inclusive color contrast."
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
    "name": "Custom EdTech & LMS Software Development",
    "provider": {
      "@type": "Organization",
      "name": "AbuQitmirLabs .TECH",
      "url": "https://abuqitmirlabs.tech"
    },
    "description": "Custom educational technology development including Learning Management Systems (LMS), AI tutoring engines, virtual classrooms, and certification portals.",
    "serviceType": "EdTech Software Engineering"
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <Helmet>
        <title>EdTech Development — Custom Learning Platforms & LMS | AbuQitmirLabs</title>
        <meta name="description" content="Custom EdTech development services by AbuQitmirLabs. We build custom Learning Management Systems (LMS), AI tutoring engines, virtual classrooms, and course portals." />
        <link rel="canonical" href="https://abuqitmirlabs.tech/solutions/edtech" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'Solutions', path: '/#services' },
            { label: 'EdTech & Learning Platforms', path: '/solutions/edtech' }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(204,255,0,0.06),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-8">
              <GraduationCap className="w-4 h-4 text-[#ccff00]" /> Next-Gen Educational Engineering
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl">
              EdTech Development — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-[#88a800]">Custom Learning Platforms for Modern Education</span>
            </h1>

            {/* Direct Answer Block for AEO/GEO */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl max-w-4xl mb-12 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Direct Answer:</strong> EdTech development involves building custom Learning Management Systems (LMS), AI-driven adaptive tutoring platforms, WebRTC virtual classrooms, and digital certification portals. AbuQitmirLabs builds accessible, highly interactive educational platforms engineered to maximize student retention and learning outcomes.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-10 font-light">
              Generic off-the-shelf course plugins fail to engage students or handle concurrent live exams. We build custom, gamified, AI-enhanced learning software tailored for universities, bootcamps, and edtech innovators.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Schedule EdTech Briefing <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/custom-software" 
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider"
              >
                Custom learning platforms
              </Link>
            </div>
          </div>
        </section>

        <CountryMarquee />

        {/* EdTech Challenge */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                The Learning Platform Challenge
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Traditional education platforms suffer from passive content delivery, high student drop-out rates, and server crashes during high-concurrency exams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Low Engagement",
                  desc: "Passive video lectures fail to keep modern learners engaged without interactive quizzes and gamification.",
                  icon: BookOpen
                },
                {
                  title: "Concurrency Crashes",
                  desc: "Legacy systems crash when thousands of students submit online exams or join live streams simultaneously.",
                  icon: TrendingUp
                },
                {
                  title: "One-Size-Fits-All",
                  desc: "Static course materials fail to adapt to varying student learning speeds or specific comprehension gaps.",
                  icon: BrainCircuit
                },
                {
                  title: "Accessibility Barriers",
                  desc: "Failing WCAG compliance standards limits access for disabled students and invites legal risk.",
                  icon: Users
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

        {/* EdTech Solutions */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Interactive Engineering</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Our Custom EdTech Solutions
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Engineered with adaptive AI, WebRTC video streaming, and real-time student analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Custom Learning Management Systems (LMS)",
                desc: "Tailored LMS platforms featuring course builders, automated assignment grading, discussion forums, and progress tracking.",
                tag: "LMS Systems",
                icon: GraduationCap
              },
              {
                title: "AI-Powered Adaptive Tutoring",
                desc: "AI engines that evaluate individual student responses, adapt course difficulty in real time, and offer instant feedback.",
                tag: "AI Education",
                icon: Bot
              },
              {
                title: "Virtual Classroom & WebRTC Streaming",
                desc: "Low-latency live video classrooms with interactive whiteboards, screen sharing, breakout rooms, and live polling.",
                tag: "Live Video",
                icon: Video
              },
              {
                title: "Online Certification & Marketplaces",
                desc: "Course selling portals with automated certificate generation, verification badges, and secure payment processing.",
                tag: "Course Portals",
                icon: Award
              },
              {
                title: "Student Information Systems (SIS)",
                desc: "Centralized administrative portals for student enrollment, attendance management, transcripts, and parent communication.",
                tag: "Admin SIS",
                icon: Users
              },
              {
                title: "Gamification & Interactive Learning",
                desc: "Badges, streaks, leaderboards, interactive code execution playgrounds, and flashcard engines that boost retention.",
                tag: "Gamification",
                icon: Sparkles
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
                <Link to="/custom-software" className="text-xs font-mono uppercase text-blue-400 hover:text-white flex items-center gap-1 mt-4 transition-colors font-semibold">
                  Custom learning platforms <ChevronRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 md:py-28 bg-zinc-950/80 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">EdTech Stack</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Educational Technology Stack</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { category: "Interactive Web", techs: "Next.js, React, WebSockets, Canvas API" },
                { category: "Live Video", techs: "WebRTC, Agora, Twilio Video, LiveKit" },
                { category: "AI & Assessment", techs: "Python, OpenAI GPT-4o, LangChain, PGVector" },
                { category: "Backend Infrastructure", techs: "Node.js, PostgreSQL, Redis, AWS S3/CloudFront" }
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
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Student Outcomes</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3">EdTech Success Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Scalable LMS for 100,000+ Students",
                metric: "100,000+ Active Learners",
                detail: "Engineered an enterprise LMS handling 100,000 concurrent students during exam week with zero server degradation and sub-300ms page responses."
              },
              {
                title: "AI Math & Coding Tutor Assistant",
                metric: "95% Student Satisfaction",
                detail: "Built an AI-driven adaptive tutor bot that guides students through complex STEM problems with step-by-step interactive hints."
              },
              {
                title: "Professional Certification Marketplace",
                metric: "50+ University Partners",
                detail: "Engineered a course marketplace with automated certificate issuance, LinkedIn digital badges, and multi-currency payment handling."
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
              Ready to Transform Education?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Schedule a technical consultation with our lead EdTech software architects to plan your custom learning platform build.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(204,255,0,0.4)]"
            >
              Book Free EdTech Consultation <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EdTechPlatformsPage;

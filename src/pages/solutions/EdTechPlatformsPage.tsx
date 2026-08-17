import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
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
      a: "EdTech software development means building digital education tools. This includes custom learning management systems (LMS), live video classrooms, AI tutoring engines, student portals, and grading software. These tools help schools and academies teach better online."
    },
    {
      q: "What is custom LMS development?",
      a: "Custom LMS development builds a learning platform tailored to your curriculum and brand. You get 100% source code ownership, zero monthly user fees, custom tests, and seamless data integrations."
    },
    {
      q: "How much does it cost to build an EdTech platform?",
      a: "A course portal MVP typically costs $10,000 to $20,000. A full enterprise platform with WebRTC live video, AI tutors, and school portals ranges from $25,000 to $50,000+ depending on features."
    },
    {
      q: "How long does it take to build an LMS?",
      a: "A standard online course MVP takes 6 to 10 weeks to build. Large-scale platforms with live video, automated testing, and mobile apps take 10 to 16 weeks."
    },
    {
      q: "Can you build virtual classroom software?",
      a: "Yes. We build low-latency virtual classrooms with WebRTC. Features include interactive whiteboards, screen sharing, live chat, breakout rooms, and automatic recording."
    },
    {
      q: "Can AI be integrated into an EdTech platform?",
      a: "Yes. We add 24/7 AI tutoring assistants, adaptive quiz difficulty, automated quiz generation from lesson transcripts, and retention analytics."
    },
    {
      q: "Can EdTech platforms support schools and universities?",
      a: "Yes. We build systems for schools and universities with multi-campus management, role-based logins for teachers and parents, gradebooks, and student information system (SIS) sync."
    },
    {
      q: "What technologies are used for EdTech development?",
      a: "We use React, Next.js, and TypeScript on the frontend. We use Node.js, Python, PostgreSQL, and Redis for fast backends, with WebRTC for live video on AWS and Google Cloud."
    },
    {
      q: "Can an EdTech platform include mobile apps?",
      a: "Yes. We build mobile learning apps for iOS and Android using Flutter and React Native. They include offline lesson downloads, push alerts, and video playback."
    },
    {
      q: "How do you secure EdTech platforms?",
      a: "We use TLS 1.3 encryption, AES-256 database protection, multi-factor logins, audit logs, and WCAG 2.1 AA accessibility standards."
    }
  ];

  const solutions = [
    {
      title: "Learning Management System Development",
      desc: "Custom LMS platforms built for modular courses, video streaming, syllabus builders, and automated gradebook tracking.",
      tag: "LMS Systems",
      iconId: "icon-graduation-cap",
      link: "/web-development",
      linkText: "Explore custom LMS web development"
    },
    {
      title: "Virtual Classroom Development",
      desc: "Low-latency real-time video classrooms built with WebRTC. Includes interactive whiteboards, screen sharing, and breakout rooms.",
      tag: "Live Video",
      iconId: "icon-video",
      link: "/custom-software",
      linkText: "Explore live video software engineering"
    },
    {
      title: "Online Learning Platform Development",
      desc: "Course selling hubs and cohort communities with payment gateways, memberships, and automated student enrollment.",
      tag: "Course Hubs",
      iconId: "icon-award",
      link: "/web-development",
      linkText: "Explore learning platform web architecture"
    },
    {
      title: "Student and Teacher Portals",
      desc: "Role-based dashboards for homework tracking, gradebooks, lesson scheduling, and parent notifications.",
      tag: "User Portals",
      iconId: "icon-users",
      link: "/mobile-app-development",
      linkText: "Explore mobile student portal engineering"
    },
    {
      title: "Assessment and Examination Platforms",
      desc: "High-concurrency testing engines built to handle thousands of concurrent test takers with auto-scoring and timers.",
      tag: "Testing Engines",
      iconId: "icon-file-check",
      link: "/custom-software",
      linkText: "Explore online examination systems"
    },
    {
      title: "Certification and Credential Platforms",
      desc: "Automated PDF certificates, digital badges for LinkedIn, and verifiable transcript links that prevent credential fraud.",
      tag: "Digital Badges",
      iconId: "icon-shield-check",
      link: "/solutions/ai-automation",
      linkText: "Explore credential workflow automation"
    },
    {
      title: "AI-Powered Tutoring and Learning Assistants",
      desc: "24/7 AI tutoring agents that guide students through tough concepts using step-by-step Socratic hints without spoiling answers.",
      tag: "AI Education",
      iconId: "icon-bot",
      link: "/ai-agent-development",
      linkText: "Explore custom AI tutor development"
    },
    {
      title: "Learning Analytics and Reporting",
      desc: "Actionable dashboards tracking course completion, video drop-off points, and early warnings for struggling learners.",
      tag: "Analytics",
      iconId: "icon-trending-up",
      link: "/custom-software",
      linkText: "Explore student analytics pipelines"
    },
    {
      title: "Gamification and Student Engagement",
      desc: "Daily streak counters, achievement badges, leaderboards, and interactive quiz challenges that boost course completion.",
      tag: "Gamification",
      iconId: "icon-sparkles",
      link: "/mobile-app-development",
      linkText: "Explore gamified learning experiences"
    },
    {
      title: "Education Workflow Automation",
      desc: "Automate student onboarding emails, SIS grade syncing, billing invoices, and parent attendance alerts.",
      tag: "Automation",
      iconId: "icon-brain-circuit",
      link: "/solutions/ai-automation",
      linkText: "Explore educational workflow automation"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-6">
              <svg className="w-4 h-4 text-[#ccff00]" aria-hidden="true"><use href="/sprite.svg#icon-graduation-cap" /></svg>
              Next-Gen Educational Engineering
            </div>

            <h1 id="edtech-hero-title" className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl text-white">
              EdTech Software Development for Modern Learning
            </h1>

            {/* Direct Answer Block for AEO/GEO */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl max-w-4xl mb-8 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Direct Answer:</strong> EdTech software development builds digital learning systems. This includes learning management systems, live video classrooms, student portals, online exams, AI tutors, and learning analytics. Custom software unifies teaching, testing, and administration in one reliable digital hub.
              </p>
            </div>

            {/* E-E-A-T Inline Trust Signal Bar */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-300 py-3 px-4 bg-zinc-900/80 border border-[#ccff00]/30 rounded-xl mb-8 max-w-3xl">
              <span className="text-[#ccff00] font-bold">🎓 TajweedPage.com — Delivered</span>
              <span className="text-zinc-600">•</span>
              <span>✅ WCAG 2.1 AA Compliant Builds</span>
              <span className="text-zinc-600">•</span>
              <span>🔒 100% IP &amp; Source Code Ownership</span>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-10 font-light">
              Generic course plugins often crash during live exams and charge heavy monthly fees. We build custom, AI-enhanced learning software tailored for universities, academies, and fast-growing EdTech startups.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link 
                to="/contact" 
                aria-label="Contact AbuQitmirLabs to start your EdTech platform project"
                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Start your EdTech platform project
                <svg className="w-5 h-5" aria-hidden="true"><use href="/sprite.svg#icon-arrow-right" /></svg>
              </Link>
              <Link 
                to="/custom-software" 
                aria-label="Learn more about our custom software engineering services"
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider"
              >
                View Custom Software Services
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
                <strong className="text-white font-medium">EdTech software development</strong> is the engineering of digital learning systems. Modern education technology turns traditional classrooms into interactive online platforms. Students learn at their own pace, teachers review progress in real time, and administrators manage multiple campuses with ease.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                Generic plugins charge monthly user fees and struggle under high traffic. Purpose-built platforms give you full code ownership and zero licensing limits. We combine <Link to="/web-development" className="text-[#ccff00] hover:underline font-medium" aria-label="Explore our high-performance web development services">high-performance web development</Link> with <Link to="/ai-agent-development" className="text-[#ccff00] hover:underline font-medium" aria-label="Explore our AI agent development services">custom AI agents</Link> to help educational institutions grow sustainably.
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
              Built with AI tutoring, WebRTC video streaming, high-speed testing engines, and live student analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((sol, idx) => (
              <motion.article 
                key={idx} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                className={`group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-[#ccff00]/50 hover:shadow-[0_0_30px_rgba(204,255,0,0.2)] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between ${idx === 9 ? 'md:col-span-2 lg:col-span-3' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ccff00]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full">
                      {sol.tag}
                    </span>
                    <svg className="w-7 h-7 text-gray-400 group-hover:text-[#ccff00] group-hover:scale-110 transition-all duration-300" aria-hidden="true">
                      <use href={`/sprite.svg#${sol.iconId}`} />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#ccff00] transition-colors">{sol.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">{sol.desc}</p>
                </div>
                <Link 
                  to={sol.link} 
                  aria-label={`${sol.linkText} - AbuQitmirLabs`}
                  className="text-xs font-mono uppercase text-[#ccff00] hover:text-white flex items-center gap-1 mt-4 transition-colors font-semibold"
                >
                  {sol.linkText}
                  <svg className="w-3 h-3" aria-hidden="true"><use href="/sprite.svg#icon-chevron-right" /></svg>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Section 3: EdTech Solutions by Business Need */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" aria-labelledby="business-needs-h2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">Market Focus</span>
              <h2 id="business-needs-h2" className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
                EdTech Solutions by Business Need
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                Different organizations have unique teaching needs. Here is how our custom software solves specific sector challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "EdTech Startups",
                  desc: "Startups need fast MVP builds to validate their teaching models. We build clean, extensible platforms with full code ownership."
                },
                {
                  title: "Schools and Academies",
                  desc: "K-12 schools need parent-teacher messaging, attendance tracking, secure student records, and child-safe testing tools."
                },
                {
                  title: "Universities & Colleges",
                  desc: "Universities need scalable exam tools, multi-department course catalogs, research libraries, and SIS database connections."
                },
                {
                  title: "Corporate Training Teams",
                  desc: "Companies need compliance tracking, employee onboarding paths, skill certification badges, and HR progress reports."
                },
                {
                  title: "Online Course Creators",
                  desc: "Coaches and course creators need custom checkout funnels, community chat rooms, digital upsells, and zero platform transaction cuts."
                },
                {
                  title: "Enterprise Education Providers",
                  desc: "Global academies need multi-tenant setups, multi-language course materials, local tax compliance, and 99.9% uptime."
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
              Every platform we build comes equipped with reliable features designed for high student engagement and simple administration.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm">
            {[
              { name: "Course Management", desc: "Curriculum builders with video, audio, code exercises, and rich downloads." },
              { name: "Student Dashboards", desc: "Personalized lesson paths, upcoming assignment deadlines, and progress charts." },
              { name: "Teacher Dashboards", desc: "Fast grading tools, student assignment reviews, and class performance overviews." },
              { name: "Assignments & Quizzes", desc: "Timed submissions, automated grading rubrics, and rich file attachments." },
              { name: "Exams & Testing", desc: "Randomized question banks, anti-cheating browser locks, and auto-submit timers." },
              { name: "Progress Tracking", desc: "Real-time attendance logging, completion badges, and milestone alerts." },
              { name: "Certificates", desc: "Automated PDF certificates with verifiable QR codes and LinkedIn sharing." },
              { name: "Payment Processing", desc: "Stripe, PayPal, Apple Pay, multi-currency support, and recurring subscriptions." },
              { name: "Smart Notifications", desc: "Automated email, SMS, and in-app alerts for deadlines and class updates." },
              { name: "Video Learning", desc: "Adaptive bitrate video streaming with playback speed control and subtitles." },
              { name: "Live WebRTC Classes", desc: "Low-latency video classrooms, interactive whiteboards, and breakout rooms." },
              { name: "Discussion Forums", desc: "Threaded discussions, peer upvoting, teacher badges, and chat rooms." },
              { name: "Learning Analytics", desc: "Student drop-off tracking, quiz score distributions, and progress trends." },
              { name: "Role-Based Access", desc: "Granular permissions for Admins, Instructors, TAs, Students, and Parents." },
              { name: "Mobile Responsive", desc: "Fast mobile experiences on iOS and Android phones, tablets, and desktops." },
              { name: "Accessibility (WCAG)", desc: "Full screen reader compatibility, keyboard controls, and high contrast." }
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
                Artificial intelligence turns passive video watching into active, personalized learning. We build reliable, safe AI tools designed for education.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Tutors",
                  desc: "Context-aware AI tutors that guide students through tough equations and code with step-by-step hints."
                },
                {
                  title: "AI Study Assistants",
                  desc: "In-course assistants that summarize lecture videos, generate flashcards, and answer lesson questions."
                },
                {
                  title: "Adaptive Learning",
                  desc: "Smart algorithms that track quiz scores in real time and adjust question difficulty automatically."
                },
                {
                  title: "AI Assessment Tools",
                  desc: "Automated tools that help teachers grade essays, evaluate rubrics, and spot plagiarism."
                },
                {
                  title: "Student Support Agents",
                  desc: "Automated agents that send study reminders when activity drops and alert teachers to struggling students."
                },
                {
                  title: "Admin Automation",
                  desc: "Smart document tools that parse student applications, match transcripts, and generate school reports."
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
              High-quality remote classes need fast, low-latency video. We build custom virtual classrooms using <strong className="text-white font-medium">WebRTC</strong> and WebSockets. Video stays clear even on slower internet connections.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
              Our classrooms include shared whiteboards, screen sharing, live chat, attendance logging, and small breakout rooms. Classes record automatically to secure cloud storage for instant student replay.
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
                We select fast, modern tools designed for high performance and sub-second page loads.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { category: "Frontend", title: "React, Next.js & TypeScript", desc: "Fast user interfaces with instant search filters and smooth mobile transitions." },
                { category: "Backend", title: "Node.js, Python & REST APIs", desc: "Scalable backend services for exam grading, user roles, and database queries." },
                { category: "Live Video", title: "WebRTC, WebSockets & LiveKit", desc: "Sub-second video streaming, shared whiteboards, and live classroom polling." },
                { category: "Database & Cloud", title: "PostgreSQL, Redis & AWS/GCP", desc: "Secure databases, fast caching, and global CDN video delivery." }
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
              Learning platforms store student records, tests, and billing data. We implement strong security: <strong className="text-white font-medium">TLS 1.3</strong> encryption in transit, <strong className="text-white font-medium">AES-256</strong> database encryption, role-based logins, and audit logs for all grade modifications.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
              Inclusivity is an essential requirement. All interfaces follow <strong className="text-white font-medium">WCAG 2.1 AA</strong> standards. We test for full screen-reader support, keyboard navigation, and high color contrast.
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
                Our 8-step engineering process ensures your learning platform is delivered on schedule and built to scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Discovery", desc: "Understanding course goals, student demographics, and curriculum requirements." },
                { step: "02", title: "Workflow Mapping", desc: "Planning student learning paths, teacher reviews, and grading rules." },
                { step: "03", title: "UX/UI Design", desc: "Creating clean, WCAG-compliant interface designs in Figma for fast review." },
                { step: "04", title: "System Architecture", desc: "Designing fast PostgreSQL databases, Redis cache layers, and secure APIs." },
                { step: "05", title: "Core Engineering", desc: "Building course hubs, live video rooms, quizzes, gradebooks, and payments." },
                { step: "06", title: "AI & Integrations", desc: "Connecting AI tutoring agents, quiz generators, and school databases." },
                { step: "07", title: "Testing & QA", desc: "Running heavy exam traffic tests, security scans, and accessibility checks." },
                { step: "08", title: "Launch & Support", desc: "Deploying to cloud hosting with continuous monitoring and regular updates." }
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
              Development costs depend on platform size, student traffic volume, integrations, and AI features.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="p-6 rounded-xl bg-zinc-900/60 border border-white/10">
                <span className="text-[#ccff00] text-xs font-mono uppercase block mb-1">Course Portal MVP</span>
                <strong className="text-2xl font-bold text-white block mb-2">$10,000 – $20,000</strong>
                <p className="text-gray-400 text-xs font-light leading-relaxed">Custom LMS portal, video lesson authoring, Stripe checkout, progress tracking, and student forums.</p>
              </div>
              <div className="p-6 rounded-xl bg-zinc-900/60 border border-[#ccff00]/40">
                <span className="text-[#ccff00] text-xs font-mono uppercase block mb-1">Full-Featured Platform</span>
                <strong className="text-2xl font-bold text-white block mb-2">$20,000 – $35,000</strong>
                <p className="text-gray-400 text-xs font-light leading-relaxed">Interactive quizzes, teacher gradebook dashboards, certificates, WebRTC live video rooms, and mobile apps.</p>
              </div>
              <div className="p-6 rounded-xl bg-zinc-900/60 border border-white/10">
                <span className="text-[#ccff00] text-xs font-mono uppercase block mb-1">Enterprise LMS &amp; AI</span>
                <strong className="text-2xl font-bold text-white block mb-2">$35,000 – $50,000+</strong>
                <p className="text-gray-400 text-xs font-light leading-relaxed">Multi-tenant university systems, 24/7 AI tutoring assistants, high-traffic testing engines, and custom mobile apps.</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Unlike SaaS services that charge monthly user fees, our custom builds give you 100% intellectual property ownership upon completion.
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
                Timelines depend on the technical scope of your platform:
              </p>
              <ul className="space-y-4 text-gray-300 font-light text-base mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-[#ccff00] font-bold">•</span>
                  <span><strong className="text-white">6 to 10 Weeks:</strong> A focused course portal MVP or single-organization learning management system.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ccff00] font-bold">•</span>
                  <span><strong className="text-white">10 to 14 Weeks:</strong> A comprehensive platform with interactive quizzes, WebRTC live video rooms, teacher gradebooks, and payments.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ccff00] font-bold">•</span>
                  <span><strong className="text-white">14 to 18+ Weeks:</strong> Multi-tenant university platforms, high-concurrency exam engines, AI tutoring agents, and mobile apps.</span>
                </li>
              </ul>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                We work in two-week agile sprints and provide testable builds at the end of each milestone.
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
                  You own all source code, database architectures, and design files with zero vendor lock-in or recurring user fees.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
                <h3 className="text-xl font-bold mb-3 text-white">High-Concurrency Performance</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  Our systems pass Google Core Web Vitals with sub-second page loads and handle sudden traffic spikes during live exams.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
                <h3 className="text-xl font-bold mb-3 text-white">Integrated AI Capabilities</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  We build custom AI tutors and adaptive testing algorithms directly into course workflows.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
                <h3 className="text-xl font-bold mb-3 text-white">WCAG 2.1 AA Accessibility</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  Every interface uses semantic HTML and keyboard navigation to guarantee accessibility for all learners.
                </p>
              </div>
            </div>

            {/* E-E-A-T Team Signal */}
            <div className="p-8 rounded-2xl bg-zinc-900/70 border border-[#ccff00]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Built by Experienced Software Engineers</h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  AbuQitmirLabs is a custom software studio based in Karachi, Pakistan, serving clients worldwide. Read our <Link to="/blog" className="text-[#ccff00] hover:underline" aria-label="Read technical articles on our engineering blog">technical engineering blog</Link> or learn more about our team on our <Link to="/about/our-team" className="text-[#ccff00] hover:underline" aria-label="Learn more about the engineering team at AbuQitmirLabs">engineering team page</Link>.
                </p>
              </div>
              <Link 
                to="/about/our-company" 
                aria-label="Learn more about AbuQitmirLabs software engineering studio"
                className="px-6 py-3 bg-white/10 hover:bg-[#ccff00] hover:text-black transition-all rounded-xl text-xs font-mono uppercase tracking-wider text-white font-bold whitespace-nowrap"
              >
                About AbuQitmirLabs Studio
              </Link>
            </div>
          </div>
        </section>

        {/* Section 13: Frequently Asked Questions */}
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
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-question-${idx}`}
                  >
                    <span>{faq.q}</span>
                    <svg 
                      className={`w-5 h-5 text-[#ccff00] shrink-0 transition-transform ${activeFaq === idx ? 'rotate-45' : ''}`}
                      aria-hidden="true"
                    >
                      <use href="/sprite.svg#icon-plus" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div 
                        id={`faq-answer-${idx}`}
                        role="region"
                        aria-labelledby={`faq-question-${idx}`}
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
              aria-label="Contact AbuQitmirLabs to start your EdTech platform project"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(204,255,0,0.4)]"
            >
              Start your EdTech platform project
              <svg className="w-5 h-5" aria-hidden="true"><use href="/sprite.svg#icon-arrow-right" /></svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EdTechPlatformsPage;

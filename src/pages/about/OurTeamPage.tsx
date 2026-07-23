import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Sparkles, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  ChevronRight, 
  Briefcase,
  Terminal,
  Palette
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountryMarquee from '../../components/CountryMarquee';

const OurTeamPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const teamMembers = [
    {
      name: "Abu Qitmir Mohammad Shiraz Al-Madani",
      title: "Founder & Lead Systems Architect",
      credentials: "M.B.A. Commerce (University of Karachi, 2010)",
      bio: "Over 15 years of digital commerce and systems engineering expertise. Abu Qitmir oversees all technical architecture, AI agent pipelines, low-latency web platforms, and international technical SEO strategies across our 410+ client deployments.",
      icon: Terminal,
      skills: ["Systems Architecture", "AI Agent Pipelines", "Technical SEO", "Low-Latency Web"]
    },
    {
      name: "Abu Huraira",
      title: "Senior Systems Engineer & Backend Lead",
      credentials: "B.S. Software Engineering & Cloud Infrastructure",
      bio: "Specializing in high-concurrency backend rails, distributed microservices, cloud security, and database indexing. Abu Huraira leads technical backend development across Node.js, Go, Python, and PostgreSQL systems.",
      icon: Cpu,
      skills: ["Cloud Infrastructure", "Node.js & Go", "PostgreSQL", "DevOps & Security"]
    },
    {
      name: "Hasan",
      title: "UI/UX Creator & Lead Visual Architect",
      credentials: "B.S. Computer Science & Human-Computer Interaction",
      bio: "Crafting distinct, high-contrast digital identities, brutalist visual layouts, and responsive motion interfaces. Hasan ensures every client application delivers mathematical layout precision and engaging user experiences.",
      icon: Palette,
      skills: ["UI/UX Engineering", "Tailwind & Motion", "Design Systems", "Prototyping"]
    }
  ];

  const faqs = [
    {
      q: "How big is the AbuQitmirLabs team?",
      a: "AbuQitmirLabs operates as an elite collective of 12+ specialized professionals in Karachi including lead architects, systems engineers, UI/UX creators, technical SEO strategists, and QA automation specialists."
    },
    {
      q: "Where is the engineering team located?",
      a: "Our entire development team is physically co-located in our central engineering studio in Karachi, Pakistan (F.B. Area), ensuring tight real-time collaboration and zero communication gaps."
    },
    {
      q: "Do you outsource any part of client projects?",
      a: "No. We never outsource work to third-party freelancers or offshore agencies. 100% of code, design, and SEO execution is completed by our internal team."
    },
    {
      q: "Who will manage my project day-to-day?",
      a: "Your project is directly supervised by Founder & Lead Architect Abu Qitmir, giving you direct access to technical leadership without account manager overhead."
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

  const teamSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Our Team — AbuQitmirLabs .TECH",
    "mainEntity": teamMembers.map(m => ({
      "@type": "Person",
      "name": m.name,
      "jobTitle": m.title,
      "description": m.bio,
      "worksFor": {
        "@type": "Organization",
        "name": "AbuQitmirLabs .TECH"
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <Helmet>
        <title>Our Team — Elite Software Engineers & Architects | AbuQitmirLabs</title>
        <meta name="description" content="Meet the elite collective behind AbuQitmirLabs .TECH. Led by Founder & Lead Architect Abu Qitmir Mohammad Shiraz Al-Madani, senior systems engineers, and UI/UX creators." />
        <link rel="canonical" href="https://abuqitmirlabs.tech/about/our-team" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(teamSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'About Us', path: '/about' },
            { label: 'Our Team', path: '/about/our-team' }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(204,255,0,0.06),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-8">
              <Users className="w-4 h-4" /> In-House Studio Collective
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl">
              Our Team — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-[#88a800]">The Elite Collective Behind AbuQitmirLabs</span>
            </h1>

            {/* Direct Answer Block */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl max-w-4xl mb-12 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Direct Answer:</strong> AbuQitmirLabs .TECH is an elite collective of 12+ specialized software architects, systems engineers, UI/UX creators, and technical SEO experts based in Karachi, Pakistan. Led by Founder & Lead Architect Abu Qitmir Mohammad Shiraz Al-Madani (M.B.A. Commerce), our 100% in-house studio has completed 410+ digital builds for international clients.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-10 font-light">
              We operate not as a bloated agency, but as a agile software studio where centralized architect oversight guarantees technical discipline and sub-second performance.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Work With Our Team <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/about/careers" 
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider"
              >
                Join Our Collective
              </Link>
            </div>
          </div>
        </section>

        <CountryMarquee />

        {/* Leadership Team Bios */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Architect Oversight</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Leadership & Senior Engineers
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Experienced minds driving system architecture, backend security, and visual design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.25)] mb-6">
                    <member.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-blue-300 transition-colors">{member.name}</h3>
                  <p className="text-blue-400 text-xs font-mono uppercase tracking-wider mb-2">{member.title}</p>
                  <p className="text-gray-400 text-xs font-mono mb-4">{member.credentials}</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">{member.bio}</p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {member.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[10px] font-mono text-gray-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Studio Model Philosophy */}
        <section className="py-20 md:py-28 bg-zinc-950/80 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Studio Philosophy</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
                Why Work With Our In-House Collective?
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                By maintaining a concentrated team of senior talent in Karachi, we deliver enterprise-grade quality at a fraction of Western agency cost.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "100% Internal Talent",
                  desc: "Zero offshore outsourcing or unvetted freelancers. Every line of code is produced in our studio."
                },
                {
                  title: "Direct Architect Access",
                  desc: "Communicate directly with lead architects and developers on Slack/WhatsApp without account manager telephone games."
                },
                {
                  title: "Agile Sprint Velocity",
                  desc: "Weekly demo builds and continuous deployment pipelines mean you see real working software every 7 days."
                },
                {
                  title: "Multi-Timezone Sync",
                  desc: "Dedicated shift coverage matching US, UK, European, and Australian business hours."
                }
              ].map((p, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
                  <CheckCircle2 className="w-8 h-8 text-[#ccff00] mb-4" />
                  <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
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

        {/* CTA */}
        <section className="py-20 md:py-28 text-center bg-gradient-to-b from-zinc-900 to-black border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Ready to Work With Our Team?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Schedule a technical intro call directly with Founder & Lead Architect Abu Qitmir.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(204,255,0,0.4)]"
            >
              Book Intro Call <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OurTeamPage;

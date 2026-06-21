"use client";

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Award, 
  Code2, 
  Cpu, 
  Target, 
  Zap, 
  Globe, 
  ArrowRight,
  ShieldCheck,
  MousePointer2,
  Layers,
  Search,
  PenTool,
  Smartphone,
  Palette,
  MapPin,
  MessageCircle,
  Users,
  Calendar,
  Building,
  Sparkles
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

const AboutPage = () => {
  const stats = [
    { label: "Founded in Karachi", value: "2021", icon: <Calendar className="w-5 h-5 text-blue-400" /> },
    { label: "Elite Team Members", value: "12+", icon: <Users className="w-5 h-5 text-purple-400" /> },
    { label: "Client retention rate", value: "98%", icon: <ShieldCheck className="w-5 h-5 text-[#ccff00]" /> },
  ];

  const services = [
    { 
      title: "Custom Software", 
      desc: "Architecting scale-ready, bespoke platforms tailored precisely to complex operational and relational requirements.", 
      icon: <Layers className="w-5 h-5 text-blue-400" /> 
    },
    { 
      title: "Mobile App Dev", 
      desc: "Building high-fidelity iOS and Android native architectures designed for maximum fluidity and conversion.", 
      icon: <Smartphone className="w-5 h-5 text-purple-400" /> 
    },
    { 
      title: "Web Development", 
      desc: "Creating lightning-fast web applications, modern corporate websites, and enterprise e-commerce systems.", 
      icon: <Code2 className="w-5 h-5 text-emerald-400" /> 
    },
    { 
      title: "AI Integration", 
      desc: "Injecting custom deep-learning pipelines, LLMs, and automated agents into existing business workflows safely.", 
      icon: <Cpu className="w-5 h-5 text-amber-400" /> 
    },
    { 
      title: "SEO & Growth", 
      desc: "Optimizing code pathways and visual indexers to guarantee top placements across primary global search rankings.", 
      icon: <Search className="w-5 h-5 text-rose-400" /> 
    },
    { 
      title: "Graphics Design", 
      desc: "Crafting beautiful branding elements, UI/UX interaction vectors, guidelines and corporate layouts.", 
      icon: <Palette className="w-5 h-5 text-indigo-400" /> 
    },
    { 
      title: "Content Writing", 
      desc: "Producing highly specialized technical, brand, and search-optimized copy that converts traffic to loyalty.", 
      icon: <PenTool className="w-5 h-5 text-teal-400" /> 
    },
  ];

  const certifications = [
    { title: "Digital Marketing", issuer: "IDM Pakistan", year: "2021", icon: <Globe className="w-5 h-5" /> },
    { title: "Web Development", issuer: "DigiSkills.pk", year: "2021", icon: <Code2 className="w-5 h-5" /> },
    { title: "Mobile App Development", issuer: "DigiSkills.pk", year: "2022", icon: <Smartphone className="w-5 h-5" /> },
    { title: "UI/UX Design", issuer: "DigiSkills.pk", year: "2022", icon: <Palette className="w-5 h-5" /> },
    { title: "SEO & Local SEO", issuer: "DigiSkills.pk", year: "2023", icon: <Search className="w-5 h-5" /> },
    { title: "Graphics Design", issuer: "DIP", year: "2023", icon: <Palette className="w-5 h-5" /> },
    { title: "Content Writing", issuer: "DigiSkills.pk", year: "2023", icon: <PenTool className="w-5 h-5" /> },
    { title: "Custom Software Development", issuer: "DigiSkills.pk", year: "2024", icon: <Layers className="w-5 h-5" /> },
    { title: "Technology Solutions & AI", issuer: "DigiSkills.pk", year: "2025", icon: <Cpu className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-[#050505] text-zinc-400 font-sans antialiased overflow-x-hidden min-h-screen relative selection:bg-[#ccff00]/10 selection:text-white">
      <Helmet>
        <title>About Us | Professional Software Studio — Karachi, Pakistan</title>
        <meta name="description" content="Meet Abu Qitmir Mohammad Shiraz Al- Madani, founder of ABUQITMIRLABS.TECH based in Karachi. We are a premier software engineering studio specialized in high-performance web systems, custom mobile apps, and robust AI implementations." />
        <link rel="canonical" href="https://abuqitmirlabs.tech/about" />
        
        {/* OG Tags */}
        <meta property="og:title" content="About Us | Professional Software Studio — Karachi, Pakistan" />
        <meta property="og:description" content="Meet Abu Qitmir Mohammad Shiraz Al- Madani, founder of ABUQITMIRLABS.TECH. Based in Karachi, we engineer premium digital solutions worldwide." />
        <meta property="og:url" content="https://abuqitmirlabs.tech/about" />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content="https://abuqitmirlabs.tech/logo.png" />

        {/* Dynamic JSON-LD Schema for 100% Technical SEO compliance */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "AboutPage",
                "@id": "https://abuqitmirlabs.tech/about#webpage",
                "url": "https://abuqitmirlabs.tech/about",
                "name": "About AbuQitmirLabs and Founder Mohammad Shiraz Almadani",
                "description": "Meet Abu Qitmir Mohammad Shiraz Al- Madani, founder of AbuQitmirLabs .TECH based in Karachi. We are a premier high-performance web, mobile app, and AI development agency.",
                "isPartOf": {
                  "@type": "WebSite",
                  "@id": "https://abuqitmirlabs.tech/#website",
                  "url": "https://abuqitmirlabs.tech/",
                  "name": "AbuQitmirLabs .TECH"
                }
              },
              {
                "@type": "ProfessionalService",
                "@id": "https://abuqitmirlabs.tech/#organization",
                "name": "AbuQitmirLabs .TECH",
                "url": "https://abuqitmirlabs.tech",
                "logo": "https://abuqitmirlabs.tech/logo.png",
                "image": "https://abuqitmirlabs.tech/logo.png",
                "priceRange": "$$$",
                "telephone": "+923233260859",
                "email": "hello@abuqitmirlabs.tech",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "8/15, 3 37A Rd, Shah Khalid Colony",
                  "addressLocality": "Landhi Town, Karachi",
                  "addressRegion": "Sindh",
                  "postalCode": "75160",
                  "addressCountry": "PK"
                },
                "sameAs": [
                  "https://www.facebook.com/profile.php?id=61583768706452",
                  "https://twitter.com/YourProfile",
                  "https://www.linkedin.com/in/abu-qitmir-697423390/",
                  "https://www.instagram.com/abuqitmirshirazalmadani/",
                  "https://www.youtube.com/@AbuQitmir"
                ]
              }
            ]
          })}
        </script>
      </Helmet>
      
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-32 md:pt-40 pb-20 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-[100vh] bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.04)_0%,transparent_70%)] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          <div className="lg:col-span-12 mb-12">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.2em] text-[#ccff00] mb-8 font-mono"
             >
                <div className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></div>
                KARACHI STUDIO — ACTIVE GLOBALLY
             </motion.div>
             
             <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-serif font-light text-white tracking-tighter leading-[0.95] mb-8 uppercase"
             >
                Redefining <br />
                <span className="text-zinc-600 font-serif italic">Digital Craft.</span>
             </motion.h1>
             
             <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl font-light text-zinc-400 max-w-3xl leading-relaxed"
              >
                ABUQITMIRLABS.TECH is a premium software boutique founded by <span className="text-white font-medium">Abu Qitmir Mohammad Shiraz Al- Madani</span> in Karachi, Pakistan. Since our founding in <span className="text-white font-semibold">2021</span>, we've dedicated ourselves to engineering lightning-fast digital solutions with unparalleled visual depth.
              </motion.p>
          </div>

          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="p-8 rounded-[2.5rem] border border-white/5 bg-[#0a0a0c]/60 backdrop-blur-xl group hover:border-[#ccff00]/20 transition-all duration-300"
                  >
                      <div className="mb-4 bg-white/5 w-10 h-10 rounded-xl flex items-center justify-center">{stat.icon}</div>
                      <div className="text-4xl font-serif font-light text-white mb-2">{stat.value}</div>
                      <div className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-mono">{stat.label}</div>
                  </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Founder & Mission Statement */}
      <section className="py-24 md:py-40 bg-black border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Image & Credentials */}
            <div className="lg:col-span-5 flex flex-col items-center">
                <motion.div
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="relative w-full max-w-sm aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 bg-zinc-950 p-2 shadow-2xl"
                >
                    <img 
                        src="https://i.postimg.cc/hjLzDQHK/abuqitmir222.png" 
                        alt="Abu Qitmir Mohammad Shiraz Al- Madani - Founder & Architect at ABUQITMIRLABS" 
                        className="w-full h-full object-cover rounded-[2.8rem] transition-transform duration-1000 hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                    />
                </motion.div>

                {/* Founder tag */}
                <span className="text-white font-serif italic text-lg mt-6 block">Abu Qitmir Mohammad Shiraz Al- Madani</span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] mt-1">Founder & Lead Engineer</span>
            </div>
            
            {/* Right Column: Mission and Purpose */}
            <div className="lg:col-span-7 space-y-10">
                <motion.div
                   initial={{ opacity: 0, x: 30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-[9px] font-mono uppercase tracking-wider text-slate-400">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      THE COGNITIVE BLUEPRINT
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight">
                        Our Mission: <br />
                        <span className="text-zinc-600 font-serif font-light italic">Refined, High-Converting Architecture.</span>
                    </h2>
                </motion.div>
 
                <div className="space-y-6 text-zinc-400 text-lg font-light leading-relaxed">
                    <p className="border-l border-[#ccff00]/40 pl-6 italic text-zinc-300">
                       "At ABUQITMIRLABS.TECH, generic templates are forbidden. We design bespoke, lightning-fast digital pipelines configured to convert international leads into permanent digital loyalty."
                    </p>
                    <p>
                        Under Abu Qitmir Mohammad Shiraz Al- Madani’s precise technical direction, our Karachi studio has scaled to accommodate the digital demands of complex global platforms. Combining a comprehensive <span className="text-white font-medium">M.B.A. in Commerce from Karachi University (Graduated 2010)</span> with extensive hands-on expertise, Abu Qitmir Mohammad Shiraz Al- Madani blends deep business strategy with cutting-edge engineering.
                    </p>
                    <p>
                        Whether deploying secure AI processing pipelines, compiling low-latency mobile platforms, or optimizing e-commerce structures and SEO parameters, our mission remains absolute: delivering pristine code written to accelerate corporate growth.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Services Grid (What we build) */}
      <section className="py-24 md:py-40 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-20">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] font-bold block mb-4">[ COMPLETE_SERVICE_CATALOGUE ]</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-white uppercase tracking-tight">
                Our Specialized <span className="italic text-zinc-600 font-serif font-light">Ecosystem.</span>
              </h2>
              <p className="text-sm md:text-base text-zinc-500 font-light mt-4">
                We design and maintain all technical pipelines with extreme rigor, avoiding fragmented legacy integrations.
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6 }}
                    className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300"
                  >
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                          {service.icon}
                      </div>
                      <h3 className="text-xl font-serif text-white uppercase tracking-tight mb-3">
                          {service.title}
                      </h3>
                      <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed">
                          {service.desc}
                      </p>
                  </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Team Description Block */}
      <section className="py-24 md:py-40 bg-black border-y border-white/5 relative overflow-hidden">
        <div className="absolute left-1/3 top-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-8 z-10">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] font-bold block">[ HUMAN_COMPUTATION_COLLECTIVE ]</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-white uppercase">
                The Elite <span className="font-serif italic text-zinc-600 font-light">Collective.</span>
              </h2>
              
              <div className="space-y-6 text-zinc-400 font-light leading-relaxed">
                <p>
                  ABUQITMIRLABS.TECH isn’t a solo developer workshop. Under the direct architect oversight of Abu Qitmir Mohammad Shiraz Al- Madani, we have built a collaborative studio consisting of elite specialized professionals. 
                </p>
                <p>
                  Our internal collective houses senior full-stack software architects, certified systems engineers, dedicated UI/UX designers, experienced SEO specialists, content curators, and QA protocols.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                  <div className="p-5 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:border-[#ccff00]/10 transition-all">
                    <h4 className="text-white font-serif text-sm uppercase leading-tight">Abu Qitmir Mohammad Shiraz Al- Madani</h4>
                    <p className="text-[9px] text-[#ccff00] font-mono mt-2 tracking-wider">Founder & Lead Architect</p>
                  </div>
                  <div className="p-5 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:border-purple-500/20 transition-all">
                    <h4 className="text-white font-serif text-sm uppercase">Abu Huraira</h4>
                    <p className="text-[9px] text-purple-400 font-mono mt-2 tracking-wider">Senior Systems Engineer & Developer</p>
                  </div>
                  <div className="p-5 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all">
                    <h4 className="text-white font-serif text-sm uppercase">Hasan</h4>
                    <p className="text-[9px] text-blue-400 font-mono mt-2 tracking-wider">UI/UX Creator & Designer</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono uppercase text-slate-400">100% Internal Talents</span>
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono uppercase text-slate-400">Centralized Architect Controls</span>
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono uppercase text-slate-400">Agile Sprint Delivery</span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-zinc-950/40 border border-white/5 rounded-[3rem] p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
              
              <div className="relative space-y-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Building className="w-6 h-6" />
                </div>
                
                <h3 className="text-2xl font-serif text-white uppercase tracking-tight">Studio Headquarters</h3>
                <p className="text-sm font-light text-zinc-400 leading-relaxed">
                  Our core primary research, engineering laboratory, and executive operations are established in Karachi, Pakistan.
                </p>
                
                <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#ccff00] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-mono uppercase text-zinc-500">OFFICE ADDRESS</h4>
                      <p className="text-sm text-zinc-300 font-sans mt-0.5 font-light leading-relaxed">
                        8/15, 3 37A Rd, Shah Khalid Colony Sector 37 A Landhi Town, Karachi, 75160
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-mono uppercase text-[#ccff00]">FAST DIRECT CHANNEL</h4>
                      <a 
                        href="https://wa.me/923233260859" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm text-white hover:text-emerald-400 transition-colors inline-block mt-0.5 font-medium underline underline-offset-4"
                      >
                        +923233260859 (WhatsApp)
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Shiraz Academics / Certifications Track */}
      <section className="py-24 md:py-40 bg-[#050505] relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              {/* Education block */}
              <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-24">
                      <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] font-bold block mb-4">[ ACADEMIC_CORE ]</span>
                      <h3 className="text-3xl font-serif font-light text-white uppercase tracking-tighter mb-8">Executive Foundational Track</h3>
                      <div className="p-10 rounded-[3rem] border border-white/5 bg-[#0a0a0c]">
                          <GraduationCap className="text-[#ccff00] mb-6" size={40} strokeWidth={1} />
                          <h4 className="text-2xl font-serif font-light text-white mb-2 uppercase tracking-tighter">M.B.A. — Commerce</h4>
                          <p className="text-sm text-zinc-500 font-light mb-8">University of Karachi, Pakistan</p>
                          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest border-t border-white/5 pt-6 inline-block">Graduated 2010</div>
                      </div>
                  </div>
              </div>

              {/* Certifications Grid */}
              <div className="lg:col-span-8">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] font-bold block mb-4">[ ACCREDITED_PATHWAYS ]</span>
                  <h3 className="text-3xl font-serif font-light text-white uppercase tracking-tighter mb-8">Validated Industry Credentials</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {certifications.map((cert, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.04 }}
                            className="bg-white/[0.02] border border-white/5 p-6 rounded-[1.8rem] flex items-center justify-between group hover:border-[#ccff00]/20 transition-all duration-300"
                          >
                              <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-white transition-colors">
                                      {cert.icon}
                                  </div>
                                  <div>
                                      <h5 className="text-white font-serif font-light uppercase tracking-tight text-sm mb-1">{cert.title}</h5>
                                      <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono">{cert.issuer}</p>
                                  </div>
                              </div>
                              <div className="text-[9px] font-mono text-zinc-600 group-hover:text-white transition-colors">
                                  {cert.year}
                              </div>
                          </motion.div>
                      ))}
                  </div>
              </div>
          </div>
        </div>
      </section>

      {/* Call to Action Statement */}
      <section className="py-32 md:py-52 relative overflow-hidden bg-black text-center border-t border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="max-w-5xl mx-auto px-6 relative z-10">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.4em] block mb-8">[ STRATEGIC_DEPLOYMENT ]</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white tracking-tighter uppercase leading-[0.95] mb-12">
                 Your brand deserves <br />
                 <span className="text-transparent font-serif italic" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>precision-built tech.</span>
              </h2>
              <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto mb-16">
                 Skip the templates. Deploy fully customized mobile applications, AI core configurations, or enterprise systems engineered to perform globally under central studio controls.
              </p>
              
              <a 
                  href="https://wa.me/923233260859"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-12 py-5 bg-[#ccff00] hover:bg-[#b5e000] text-black text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_35px_rgba(204,255,0,0.3)] duration-300 inline-flex items-center gap-3"
              >
                  Let's Launch Your Architecture 
                  <ArrowRight size={16} />
              </a>
          </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
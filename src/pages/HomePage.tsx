import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Star } from 'lucide-react';
import NexusHero from '@/components/ui/nexus-hero';
import TrustSection from '../components/TrustSection';
import ApproachSection from '../components/ApproachSection';
import DifferentiatorsSection from '../components/DifferentiatorsSection';
import ImpactSection from '../components/ImpactSection';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import CountryMarquee from '../components/CountryMarquee';
import TechStackSection from '../components/TechStackSection';
import PortfolioSection from '../components/PortfolioSection';
import VideoPortfolio from '../components/VideoPortfolio';
import InteractivePortfolio from '../components/InteractivePortfolio';
import WebDevelopmentPricing from '../components/WebDevelopmentPricing';
import HomeCaseStudiesSection from '../components/HomeCaseStudiesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-white/20 selection:text-white">
      <Helmet>
        <title>Custom Software Development & AI App Development Company | AbuQitmirLabs</title>
        <meta name="description" content="AbuQitmirLabs is a premier custom software development company delivering AI app development services, custom website development services and enterprise software solutions to clients across the United States, United Kingdom, and Europe." />
        <link rel="canonical" href="https://abuqitmirlabs.tech" />
        
        <meta property="og:title" content="Custom Software Development & AI App Development Company | AbuQitmirLabs" />
        <meta property="og:description" content="AbuQitmirLabs is a premier custom software development company delivering AI app development services, custom website development services and enterprise software solutions to clients across the United States, United Kingdom, and Europe." />
        <meta property="og:url" content="https://abuqitmirlabs.tech" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://abuqitmirlabs.tech/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Custom Software Development & AI App Development Company | AbuQitmirLabs" />
        <meta name="twitter:description" content="AbuQitmirLabs is a premier custom software development company delivering AI app development services, custom website development services and enterprise software solutions to clients across the United States, United Kingdom, and Europe." />
        <meta name="twitter:image" content="https://abuqitmirlabs.tech/logo.png" />

        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://abuqitmirlabs.tech/",
              "name": "AbuQitmirLabs",
              "description": "AbuQitmirLabs is a premier custom software development company delivering AI app development services, custom website development services and enterprise software solutions to clients across the United States, United Kingdom, and Europe."
            })
          }}
        ></script>

        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
              "name": "AbuQitmirLabs .TECH",
              "url": "https://abuqitmirlabs.tech",
              "logo": "https://abuqitmirlabs.tech/logo.png",
              "image": "https://abuqitmirlabs.tech/logo.png",
              "description": "AbuQitmirLabs is a premier custom software development company delivering AI app development services, custom website development services and enterprise software solutions to clients across the United States, United Kingdom, and Europe. Headquartered in Karachi Pakistan, serving clients globally.",
              "priceRange": "$$",
              "email": "hello@abuqitmirlabs.tech",
              "telephone": "+923233260859",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "8/15, 3 37A Rd, Shah Khalid Colony",
                "addressLocality": "Landhi Town, Karachi",
                "addressRegion": "Sindh",
                "postalCode": "75160",
                "addressCountry": "PK"
              },
              "hasMap": "https://www.google.com/search?q=AbuQitmirLabs.Tech&stick=H4sIAAAAAAAA_-NgU1I1qEg0SUwyMkw2MzIySUkyTba0MqhITUtOMUgztzRLTTM2TjI3XMQq5JhUGphZkptZ5JOYVKwXkpqcAQAWzgp1PgAAAA&hl=en&mat=CZLYxD3dn4-XElYBTVDHnmXmYtE_z1-ukd4W15_4xSOvjTxlQ1o8WZE3DhyScxz25ZkTwHN99aYAJPksPmWrBMFOl-sP_YDLnxLlKt51TeOkcb_wt2bWebGPkDFcieVKmA&authuser=0",
              "openingHours": "Mo,Tu,We,Th,Fr,Sa 09:00-21:00",
              "sameAs": [
                "https://x.com/AbuQitmir",
                "https://www.linkedin.com/in/abu-qitmir-697423390/",
                "https://www.facebook.com/profile.php?id=61583768706452",
                "https://www.instagram.com/abuqitmirshirazalmadani/",
                "https://www.youtube.com/@AbuQitmir",
                "https://www.tiktok.com/@abuqitmirmohammadshiraz"
              ],
              "knowsAbout": [
                "Custom Software Development Company",
                "AI App Development Services",
                "Software Development Company Karachi Pakistan",
                "Hire Software Developers",
                "Enterprise Software Solutions",
                "Digital Transformation",
                "Custom Website Development Company",
                "Native Mobile Development Company",
                "Flutter Mobile App Development Company"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "54"
              },
              "serviceType": [
                 "Custom Software Development Company",
                 "AI App Development Services",
                 "Custom Website Development Company",
                 "Native Mobile Development Company",
                 "Flutter Mobile App Development Company",
                 "Enterprise Software Solutions"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+923233260859",
                "contactType": "customer service",
                "areaServed": ["US", "UK", "CA", "PK", "PL"],
                "availableLanguage": ["en", "pl", "ur"]
              },
              "founder": {
                "@type": "Person",
                "name": "Shiraz Almadani",
                "jobTitle": "CEO & Lead Engineer",
                "sameAs": "https://www.linkedin.com/in/abu-qitmir-697423390/"
              },
              "video": [
                {
                  "@type": "VideoObject",
                  "name": "Enterprise Digital Architecture",
                  "description": "Watch our lead architect ABUQITMIRLABS.TECH breakdown complex digital ecosystems.",
                  "thumbnailUrl": "https://img.youtube.com/vi/Sh9SqMCx9I4/maxresdefault.jpg",
                  "uploadDate": "2024-05-18",
                  "embedUrl": "https://www.youtube.com/embed/Sh9SqMCx9I4"
                },
                {
                  "@type": "VideoObject",
                  "name": "Advanced Engineering Solutions",
                  "description": "Deep dive into High-Performance Web Tech and scalable backend systems.",
                  "thumbnailUrl": "https://img.youtube.com/vi/B31EXmt5LrQ/maxresdefault.jpg",
                  "uploadDate": "2024-05-18",
                  "embedUrl": "https://www.youtube.com/embed/B31EXmt5LrQ"
                }
              ]
            })
          }}
        ></script>

        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://abuqitmirlabs.tech"
                }
              ]
            })
          }}
        ></script>
      </Helmet>

      <Header />
      <NexusHero />
      
      <div className="overflow-hidden transform z-20 bg-[#B9FF66] w-full border-y-4 pt-4 pb-4 relative shadow-[0_8px_0_0_rgba(0,0,0,1)] -rotate-1">
        <div className="flex whitespace-nowrap w-max animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-10 text-3xl md:text-5xl font-black tracking-tighter uppercase items-center text-black px-10">
              <span>Comprehensive digital strategy</span> <Star className="fill-current" size={32} />
              <span>End-to-end software engineering</span> <Star className="fill-current" size={32} />
              <span>Performance-focused web development</span> <Star className="fill-current" size={32} />
              <span>Strategic SEO and content growth</span> <Star className="fill-current" size={32} />
              <span>Custom AI-powered automation</span> <Star className="fill-current" size={32} />
              <span>Conversion-driven UI/UX design</span> <Star className="fill-current" size={32} />
              <span>Scalable mobile app solutions</span> <Star className="fill-current" size={32} />
            </div>
          ))}
        </div>
      </div>

      <TrustSection />
      
      {/* Strategic SEO Editorial Narrative Block - Modern E-E-A-T Criteria */}
      <section className="py-24 md:py-32 bg-[#060606] border-y border-white/5 relative overflow-hidden" id="authority-narrative">
        <div className="absolute inset-0 bg-[#ccff00]/[0.01] blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center md:text-left mb-20 max-w-4xl">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#ccff00] font-bold block mb-4">
              Scientific Engineering & Technical Authority
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic text-white font-light tracking-tight leading-tight">
              Bespoke Systems, <br />
              <span className="text-neutral-400 font-sans not-italic font-extralight tracking-tighter">Absolute Digital Sovereignty.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            
            {/* Column 1: Core Custom Software & Web Engineering */}
            <div className="space-y-8">
              <div className="border-b border-white/5 pb-4">
                <span className="text-xs font-mono text-[#ccff00]/60 font-bold">I_ CORE SYSTEMS ARCHITECTURE</span>
              </div>
              <p className="text-neutral-200 font-sans leading-relaxed text-sm md:text-base font-normal text-justify">
                <strong>AbuQitmirLabs</strong> is a premier custom software development company delivering AI app development services, custom website development services and enterprise software solutions to clients across the United States, United Kingdom, and Europe.
              </p>
              <p className="text-neutral-400 font-sans leading-relaxed text-sm md:text-base font-light text-justify">
                When you collaborate with our specialized studio, you bypass the severe architectural limitations of standard off-the-shelf software. At AbuQitmirLabs, we are a master-grade <strong className="text-white font-medium">custom software development company</strong> focused on engineering secure, fault-tolerant, and high-performance <strong className="text-[#ccff00] font-medium">scalable applications</strong> that serve as proprietary business assets. Our focus as a specialized <strong className="text-white font-medium">custom software development company</strong> is to build sustainable infrastructures that guarantee absolute intellectual property ownership, crafting robust <strong className="text-white font-medium">scalable applications</strong> that adapt beautifully as your traffic metrics increase.
              </p>
              <p className="text-neutral-400 font-sans leading-relaxed text-sm md:text-base font-light text-justify">
                As a leading <strong className="text-white font-medium">custom website development company</strong>, we construct tailored, speed-oriented frontends that captivate visitors from the first millisecond. Our technical standard as a luxury <strong className="text-white font-medium">custom website development company</strong> forces us to prioritize rich typography, fluid layouts, and deep search visibility. Partnering with our specialized <strong className="text-white font-medium">custom website development company</strong> guarantees that your web presence has zero passive license fees, zero locked proprietary modules, and infinite freedom to scale.
              </p>
            </div>

            {/* Column 2: High-Fidelity Native & Flutter Mobile Ecosystems */}
            <div className="space-y-8">
              <div className="border-b border-white/5 pb-4">
                <span className="text-xs font-mono text-[#ccff00]/60 font-bold">II_ IMMERSIVE MOBILE ENVIRONMENTS</span>
              </div>
              <p className="text-neutral-400 font-sans leading-relaxed text-sm md:text-base font-light text-justify">
                Establishing a dynamic multi-device ecosystem requires an expert and disciplined <strong className="text-white font-medium">custom mobile app development company</strong>. AbuQitmirLabs is configured as an elite <strong className="text-white font-medium">custom mobile app development company</strong> that bridges complex server infrastructure with fluid handheld views. Our primary approach as a tactical <strong className="text-white font-medium">custom mobile app development company</strong> utilizes rigorous native architectures. By implementing custom <strong className="text-[#ccff00] font-medium">Native Mobile app development</strong> pipelines, we craft bespoke Swift and Kotlin experiences that access on-chip GPU power for lightning-fast responsiveness.
              </p>
              <p className="text-neutral-400 font-sans leading-relaxed text-sm md:text-base font-light text-justify">
                For rapid worldwide delivery, partnering with a premier <strong className="text-white font-medium">Flutter mobile app development company</strong> yields absolute cross-device parity. As a highly capable <strong className="text-white font-medium">Flutter mobile app development company</strong>, we deliver identical animations, security parameters, and layouts across iOS and Android with single-codebase velocity. Utilizing our expertise as an authorized <strong className="text-white font-medium">Flutter mobile app development company</strong> enables you to capture dual marketplaces instantly without sacrificing operational efficiency. We consistently pair clean, robust <strong className="text-white font-medium">Native Mobile app development</strong> frameworks with hybrid tools to render gorgeous custom layouts and fluid multi-touch interactions.
              </p>
            </div>

            {/* Column 3: Intelligent AI Systems & Digital Transformation */}
            <div className="space-y-8">
              <div className="border-b border-white/5 pb-4">
                <span className="text-xs font-mono text-[#ccff00]/60 font-bold">III_ ENTERPRISE INTELLIGENCE & EVOLUTION</span>
              </div>
              <p className="text-neutral-400 font-sans leading-relaxed text-sm md:text-base font-light text-justify">
                Our advanced artificial intelligence division leads the industry in deployment-ready <strong className="text-white font-medium">AI app development</strong> solutions. We integrate custom-trained Large Language Models, cognitive agent workflows, and highly advanced mathematical models into everyday enterprise pipelines. Standard <strong className="text-white font-medium">AI app development</strong> services often rely on simple third-party wrappers, but our complete <strong className="text-white font-medium">AI app development</strong> packages deliver standalone, self-hosted networks. These solutions seamlessly drive massive, fundamental <strong className="text-[#ccff00] font-medium">digital transformation</strong>, restructuring legacy databases, fragmented manual pipelines, and outdated systems into automated, highly responsive intellectual assets.
              </p>
              <p className="text-neutral-400 font-sans leading-relaxed text-sm md:text-base font-light text-justify">
                We orchestrate robust <strong className="text-white font-medium">digital transformation</strong> strategies and construct resilient <strong className="text-white font-medium">enterprise software solutions</strong> that act as immediate force-multipliers. If you need to manage immense multi-market systems, our powerful <strong className="text-white font-medium">enterprise software solutions</strong> streamline real-time transactions with complete safety. These secure and <strong className="text-white font-medium">scalable applications</strong> ensure your organization remains resilient, enabling you to confidently proceed with necessary <strong className="text-white font-medium">digital transformation</strong> processes across all administrative divisions.
              </p>
            </div>

          </div>

          {/* Local Geographic Authority & Trust Banner */}
          <div className="mt-20 pt-12 border-t border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <p className="text-neutral-400 font-sans leading-relaxed text-sm md:text-base font-light text-justify">
                Operating proudly as a premium <strong className="text-white font-medium">software development company Karachi Pakistan</strong>, we cater to a sophisticated global clientele. As a <strong className="text-white font-semibold">leading software development company in Karachi, Pakistan</strong>, we bring old-school engineering ethics to modern computing problems. This unique geopolitical advantage enables organizations to <strong className="text-white font-medium">hire software developers</strong> of global caliber while maintaining reasonable, highly optimized capital allocation. If you are seeking a reliable, authoritative, and battle-tested <strong className="text-white font-medium">software development company Karachi Pakistan</strong> to spearhead your firm’s next major initiatives and deploy robust <strong className="text-white font-medium">enterprise software solutions</strong>, AbuQitmirLabs stands ready to design, deploy, and preserve your complete computational assets.
              </p>
              <p className="text-neutral-400 font-sans leading-relaxed text-sm md:text-base font-light text-justify mt-4">
                We are recognized as the <strong className="text-[#ccff00] font-bold">leading software development company in Karachi, Pakistan</strong> because we provide high-grade <strong className="text-white font-medium">Native Mobile app development</strong> frameworks alongside web applications. When leadership teams want to <strong className="text-white font-medium">hire software developers</strong> from a proven, expert <strong className="text-white font-medium">software development company Karachi Pakistan</strong>, they work with AbuQitmirLabs to ensure their enterprise apps remain secure, optimized, and fast. To <strong className="text-white font-medium">hire software developers</strong> who truly understand digital systems, partner with our specialized labs.
              </p>
            </div>
            <div className="lg:col-span-4 bg-[#0a0a09] border border-white/5 rounded-2xl p-6 text-center lg:text-left">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ccff00] font-bold block mb-2">LOCAL HUB METRICS</span>
              <h4 className="text-lg font-serif italic text-white mb-2">Karachi, Pakistan</h4>
              <p className="text-xs text-neutral-500 font-mono leading-relaxed uppercase">
                ACTIVE ENGINEERING LAB • SECURE CLOUD NODES • CUSTOM LLM REPO CONTROL
              </p>
            </div>
          </div>

        </div>
      </section>
      
      <ApproachSection />
      
      <DifferentiatorsSection />
      
      <ImpactSection />

      <ServicesSection />
      
      <CountryMarquee />
      
      <ProcessSection />

      <TechStackSection />
      
      <PortfolioSection />
      <VideoPortfolio />
      <InteractivePortfolio />
      <WebDevelopmentPricing />
      
      <HomeCaseStudiesSection />

      <TestimonialsSection />

      <FAQSection />

      <ContactSection />

      {/* CTA Section */}
      <section id="cta-section" className="bg-[#090908] border-t border-zinc-900 py-24 px-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(204,255,0,0.03)_0%,_transparent_65%)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 italic tracking-tight">
            Start your project.
          </h2>
          <p className="text-zinc-400 mb-12 text-sm md:text-base font-sans tracking-wide">
            Free consultation available — Contact today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <a
              id="cta-whatsapp-link"
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25d366]/10 text-[#25d366] hover:bg-[#25d366]/20 font-sans text-xs tracking-[0.14em] uppercase border border-[#25d366]/20 px-8 py-4 rounded-full transition-all duration-300 h-14"
            >
              💬 <span className="normal-case">Message me on WhatsApp</span>
            </a>
            <div className="flex flex-col gap-2">
              <a
                id="cta-email-link-corporate"
                href="mailto:hello@abuqitmirlabs.tech"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 text-zinc-200 hover:bg-white/10 font-sans text-xs tracking-[0.14em] uppercase border border-white/20 px-8 py-3.5 rounded-full transition-all duration-300"
              >
                📧 <span className="normal-case font-mono font-medium tracking-tight">hello@abuqitmirlabs.tech</span>
              </a>
              <a
                id="cta-email-link-personal"
                href="mailto:abuqitmirshirazalmadani@gmail.com"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 text-zinc-400 hover:bg-white/10 font-sans text-[10px] tracking-[0.14em] uppercase border border-white/10 px-8 py-2 rounded-full transition-all duration-300"
              >
                📧 <span className="normal-case font-mono font-medium tracking-tight">abuqitmirshirazalmadani@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

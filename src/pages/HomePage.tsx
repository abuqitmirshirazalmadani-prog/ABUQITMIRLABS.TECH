import React from 'react';
import { Helmet } from 'react-helmet-async';
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
import HomeCaseStudiesSection from '../components/HomeCaseStudiesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-white/20 selection:text-white">
      <Helmet>
        <title>Expert Custom Software & AI App Development Studio | AbuQitmirLabs</title>
        <meta name="description" content="AbuQitmirLabs .TECH is an elite software engineering studio. We build bespoke custom enterprise software, scalable SaaS platforms, and intelligent AI agent models." />
        <link rel="canonical" href="https://abuqitmirlabs.tech" />
        
        <meta property="og:title" content="Expert Custom Software & AI App Development Studio | AbuQitmirLabs" />
        <meta property="og:description" content="Elite custom software development and AI engineering studio. We build robust ERP systems, native mobile applications, and custom AI chatbots." />
        <meta property="og:url" content="https://abuqitmirlabs.tech" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://abuqitmirlabs.tech/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Expert Custom Software & AI App Development Studio | AbuQitmirLabs" />
        <meta name="twitter:description" content="Elite custom software development and AI engineering studio. We build robust ERP systems, native mobile applications, and custom AI chatbots." />
        <meta name="twitter:image" content="https://abuqitmirlabs.tech/logo.png" />

        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://abuqitmirlabs.tech/",
              "name": "AbuQitmirLabs",
              "description": "Bespoke custom software and intelligent AI agent solutions."
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
              "description": "Expert custom software development and AI engineering firm. We build scalable SaaS platforms and high-performance applications for global enterprises.",
              "priceRange": "$$",
              "email": "shiraz@abuqitmirlabs.tech",
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
                "Custom Software Development",
                "AI Agent Development",
                "Mobile App Development",
                "LLM Integration",
                "Flutter Development",
                "React Engineering",
                "Cloud Architecture",
                "Semantic SEO"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "54"
              },
              "serviceType": [
                 "Custom Software Development",
                 "Mobile App Development",
                 "AI Agent Development",
                 "Web Engineering"
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
      
      <ApproachSection />
      
      <DifferentiatorsSection />
      
      <ImpactSection />

      <ServicesSection />
      
      <CountryMarquee />
      
      <ProcessSection />

      <TechStackSection />
      
      <PortfolioSection />
      <VideoPortfolio />
      
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              id="cta-whatsapp-link"
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25d366]/10 text-[#25d366] hover:bg-[#25d366]/20 font-sans text-xs tracking-[0.14em] uppercase border border-[#25d366]/20 px-8 py-4 rounded-full transition-all duration-300"
            >
              💬 <span className="normal-case">Message me on WhatsApp</span>
            </a>
            <a
              id="cta-email-link"
              href="mailto:abuqitmirshirazalmadani@gmail.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 text-zinc-300 hover:bg-white/10 font-sans text-xs tracking-[0.14em] uppercase border border-white/10 px-8 py-4 rounded-full transition-all duration-300"
            >
              📧 <span className="normal-case font-mono font-medium tracking-tight">abuqitmirshirazalmadani@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

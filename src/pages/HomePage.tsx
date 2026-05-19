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
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-white/20 selection:text-white">
      <Helmet>
        <title>Full-Service Digital Agency & Custom Software Solutions | AbuQitmirLabs</title>
        <meta name="description" content="AbuQitmirLabs .TECH is a global digital agency specializing in custom software engineering, AI automation, and strategic digital growth for modern enterprises." />
        <link rel="canonical" href="https://abuqitmirlabs.tech" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Full-Service Digital Agency & Custom Software Solutions | AbuQitmirLabs" />
        <meta property="og:description" content="Premium custom software engineering and strategic digital growth for global enterprises." />
        <meta property="og:url" content="https://abuqitmirlabs.tech" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.postimg.cc/hjLzDQHK/abuqitmir222.png" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Affordable App Development Company | AbuQitmirLabs" />
        <meta name="twitter:description" content="AbuQitmirLabs .TECH provides premium custom software development and AI-powered mobile app solutions." />
        <meta name="twitter:image" content="https://i.postimg.cc/hjLzDQHK/abuqitmir222.png" />

        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
            "name": "AbuQitmirLabs .TECH",
            "url": "https://abuqitmirlabs.tech",
            "logo": "https://i.postimg.cc/FRZNKBLZ/abuqitmir222.png",
            "image": "https://i.postimg.cc/FRZNKBLZ/abuqitmir222.png",
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
            "hasMap": "https://www.google.com/search?q=ABUQITMIRLABS.TECH",
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
                "thumbnailUrl": "https://img.youtube.com/vi/v25Fo6O3iy4/maxresdefault.jpg",
                "uploadDate": "2024-05-18",
                "embedUrl": "https://www.youtube.com/embed/v25Fo6O3iy4"
              },
              {
                "@type": "VideoObject",
                "name": "Advanced Engineering Solutions",
                "description": "Deep dive into High-Performance Web Tech and scalable backend systems.",
                "thumbnailUrl": "https://img.youtube.com/vi/110zeH-eEEk/maxresdefault.jpg",
                "uploadDate": "2024-05-18",
                "embedUrl": "https://www.youtube.com/embed/110zeH-eEEk"
              }
            ]
          })}
        </script>

        {/* Breadcrumb Schema (Home) */}
        <script type="application/ld+json">
          {JSON.stringify({
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
          })}
        </script>
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

      <TestimonialsSection />

      <FAQSection />

      <Footer />
    </main>
  );
}

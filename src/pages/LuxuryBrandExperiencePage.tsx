import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import { Sparkles, ArrowDown, ChevronRight, ShieldCheck, Compass, Droplet, Clock, Check } from 'lucide-react';
import { LuxuryHeader } from '../components/luxury/LuxuryHeader';
import { LuxuryTinVisual, TinDetails } from '../components/luxury/LuxuryTinVisual';
import { ParallaxParticles } from '../components/luxury/ParallaxParticles';
import { AllocationDrawer } from '../components/luxury/AllocationDrawer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 5 Ultra-Prestige Bespoke Product Tins with High-Contrast Multi-Color Photography
const LUXURY_TINS: TinDetails[] = [
  {
    id: 'tin-01-nocturne',
    editionNumber: 'ÉDITION N° 01',
    name: 'Imperial Nocturne',
    subtitle: 'High-Peak Ceylon Silver Tips & Night-Blooming Osmanthus',
    vintage: 'Solstice Harvest 2026',
    allocationTotal: 380,
    allocationRemaining: 84,
    price: '$340 USD',
    themeColor: '#f59e0b', // Radiant Amber Gold
    accentGlow: 'rgba(245, 158, 11, 0.4)',
    haloGradient: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.08) 50%, rgba(0,0,0,0) 75%)',
    elevation: '2,100m High Altitude',
    origin: 'Nuwara Eliya, Ceylon',
    harvest: 'Hand-picked pre-dawn under waning moon',
    steepProfile: '82°C · 3.5 Minutes · 4 Infusions',
    tastingNotes: ['Raw Honeycomb', 'Apricot Blossom', 'Roasted Chestnut', 'Wild Vanilla Bean'],
    vesselSpec: 'Heavyweight obsidian tin, 24K guilloché brass lid, numbered intaglio seal',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1200&auto=format&fit=crop',
    stampSymbol: 'I',
    description: 'An ethereal nocturnal pluck of unopened bud tips sun-withered alongside fresh osmanthus flowers. The resulting infusion possesses an extraordinary amber liquor with deep floral resonance.',
  },
  {
    id: 'tin-02-kyoto',
    editionNumber: 'ÉDITION N° 02',
    name: 'Kyoto Celestial',
    subtitle: 'Ceremonial Grade Uji Matcha & Single-Estate Shirakawa',
    vintage: 'Spring Flush 2026',
    allocationTotal: 250,
    allocationRemaining: 39,
    price: '$420 USD',
    themeColor: '#10b981', // Vivid Emerald Green
    accentGlow: 'rgba(16, 185, 129, 0.4)',
    haloGradient: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.08) 50%, rgba(0,0,0,0) 75%)',
    elevation: 'Ancient Clay Terraces',
    origin: 'Shirakawa, Uji, Japan',
    harvest: 'Shaded 28 days under woven straw mats',
    steepProfile: '75°C · 80 Whisk Strokes · Jade Froth',
    tastingNotes: ['Velvety Umami', 'Young Bamboo Shoot', 'Toasted Pistachio', 'Mineral Dew'],
    vesselSpec: 'Granite-turned matte carbon cylinder, hand-applied gold leaf kanji stamp',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop',
    stampSymbol: 'II',
    description: 'Stone-ground on ancient granite millstones at a rate of just 30 grams per hour. Kyoto Celestial represents the absolute pinnacle of Japanese tea ceremony craftsmanship.',
  },
  {
    id: 'tin-03-kashmir',
    editionNumber: 'ÉDITION N° 03',
    name: 'Crimson Kashmir',
    subtitle: 'Kishtwar Red Gold Saffron Stigmas & Damascus Rosebuds',
    vintage: 'Autumn Solitary Bloom 2026',
    allocationTotal: 180,
    allocationRemaining: 22,
    price: '$680 USD',
    themeColor: '#ef4444', // Royal Ruby Crimson
    accentGlow: 'rgba(239, 68, 68, 0.4)',
    haloGradient: 'radial-gradient(circle, rgba(239, 68, 68, 0.28) 0%, rgba(185, 28, 28, 0.08) 50%, rgba(0,0,0,0) 75%)',
    elevation: '1,650m Glacial Terraces',
    origin: 'Kishtwar Valley, Kashmir',
    harvest: 'Over 150,000 purple crocus blossoms per single tin',
    steepProfile: '88°C · 7 Minutes Slow Steep · Crimson Halo',
    tastingNotes: ['Sun-Baked Hay', 'Damascus Rose Otto', 'Cardamom Smoke', 'Warm Pomegranate'],
    vesselSpec: 'Octagonal hammered copper with diamond knurled cap & velvet presentation pouch',
    imageUrl: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1200&auto=format&fit=crop',
    stampSymbol: 'III',
    description: 'The world’s most precious spice harvested in the secluded high terraces of Kishtwar. Each stigma is hand-graded for intense crocin potency and blended with heirloom wild Damascus rose petals.',
  },
  {
    id: 'tin-04-voyage',
    editionNumber: 'ÉDITION N° 04',
    name: 'Midnight Voyage',
    subtitle: 'Wild Smoked Wuyi Lapsang & Maritime Bergamot Zest',
    vintage: 'Winter Reserve 2026',
    allocationTotal: 300,
    allocationRemaining: 67,
    price: '$290 USD',
    themeColor: '#3b82f6', // Royal Cobalt Blue
    accentGlow: 'rgba(59, 130, 246, 0.4)',
    haloGradient: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(29, 78, 216, 0.08) 50%, rgba(0,0,0,0) 75%)',
    elevation: '1,200m Mist Forest',
    origin: 'Tongmu Village, Wuyi Mountains',
    harvest: 'Smoked over century-old pinewood embers',
    steepProfile: '95°C · 4 Minutes · Robust Infusion',
    tastingNotes: ['Cedar Hearth Smoke', 'Sun-Dried Bergamot', 'Dark Molasses', 'Pine Needle Resin'],
    vesselSpec: 'Deep cobalt enameled steel, nautical brass rivet rim, maritime longitude engraving',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop',
    stampSymbol: 'IV',
    description: 'A historical homage to the trans-oceanic spice routes of the 18th century. Rare wild tea leaves gently cured over ancient pinewood, yielding a dark, brooding, and aromatic liqueur.',
  },
  {
    id: 'tin-05-lotus',
    editionNumber: 'ÉDITION N° 05',
    name: 'White Jade Lotus',
    subtitle: 'High Mountain Yabukita & Alpine Wild Orchid Buds',
    vintage: 'First Pre-Qingming Pluck 2026',
    allocationTotal: 150,
    allocationRemaining: 18,
    price: '$510 USD',
    themeColor: '#e0e7ff', // Liquid Platinum / White Jade
    accentGlow: 'rgba(224, 231, 255, 0.4)',
    haloGradient: 'radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(203, 213, 225, 0.08) 50%, rgba(0,0,0,0) 75%)',
    elevation: '1,800m Cloud Peak',
    origin: 'Taimu Mountains, Fujian',
    harvest: 'Single needle plucks coated in silver down',
    steepProfile: '78°C · 5 Minutes Slow Release · Silken Clear',
    tastingNotes: ['Dewy Honeysuckle', 'White Peach Flesh', 'Cold Mountain Spring', 'Orchid Mist'],
    vesselSpec: 'Porcelain-finish fluted platinum vessel with silk cord & jade wax closure',
    imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1200&auto=format&fit=crop',
    stampSymbol: 'V',
    description: 'Gathered only during a two-day window in early spring before the buds open. The tender needles retain their silvery down, producing a liqueur of pristine, contemplative clarity.',
  },
];

export default function LuxuryBrandExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [currentEditionIndex, setCurrentEditionIndex] = useState(0);
  const [selectedTinForDrawer, setSelectedTinForDrawer] = useState<TinDetails | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const locomotiveScrollRef = useRef<any>(null);

  // Initialize Locomotive Scroll for ultra-smooth inertial momentum
  useEffect(() => {
    let scrollInstance: any = null;

    try {
      scrollInstance = new LocomotiveScroll({
        lenisOptions: {
          lerp: 0.08,
          duration: 1.4,
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.5,
        },
      });
      locomotiveScrollRef.current = scrollInstance;
    } catch (e) {
      console.warn('Locomotive scroll fallback:', e);
    }

    return () => {
      if (scrollInstance) {
        scrollInstance.destroy();
      }
    };
  }, []);

  // GSAP ScrollTrigger Animations for cinematic reveal & parallax depth
  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;

        const tinElement = section.querySelector('.tin-element');
        const textElements = section.querySelectorAll('.cinematic-text');
        const specsElement = section.querySelector('.cinematic-specs');
        const watermark = section.querySelector('.cinematic-watermark');

        // Update active index in header based on scroll position
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setCurrentEditionIndex(index),
          onEnterBack: () => setCurrentEditionIndex(index),
        });

        // Parallax floating entrance for product tin
        if (tinElement) {
          gsap.fromTo(
            tinElement,
            {
              y: 140,
              scale: 0.88,
              opacity: 0.3,
            },
            {
              y: -40,
              scale: 1,
              opacity: 1,
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );

          // Subtle natural breathing float
          gsap.to(tinElement, {
            y: '-=12',
            rotationZ: 0.8,
            duration: 3.8 + index * 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        // Parallax background watermark
        if (watermark) {
          gsap.fromTo(
            watermark,
            { y: 80, opacity: 0.04 },
            {
              y: -120,
              opacity: 0.12,
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2,
              },
            }
          );
        }

        // Text reveal animations
        if (textElements.length > 0) {
          gsap.fromTo(
            textElements,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 65%',
              },
            }
          );
        }

        if (specsElement) {
          gsap.fromTo(
            specsElement,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.3,
              scrollTrigger: {
                trigger: section,
                start: 'top 60%',
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToEdition = (index: number) => {
    const targetSection = sectionRefs.current[index];
    if (targetSection) {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.scrollTo(targetSection, { duration: 1.5 });
      } else {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenAllocation = (tin: TinDetails) => {
    setSelectedTinForDrawer(tin);
    setIsDrawerOpen(true);
  };

  return (
    <div
      ref={containerRef}
      className="bg-black text-[#f4f4f5] min-h-screen selection:bg-amber-400/30 selection:text-amber-200 overflow-x-hidden font-sans"
    >
      <Helmet>
        <title>L&apos;Atelier De Réserve | Luxury Artisanal Tin Collection | AbuQitmirLabs</title>
        <meta
          name="description"
          content="Experience the pinnacle of old-money luxury branding. Five single-estate numbered tins unveiled with Locomotive Scroll, GSAP parallax depth, and cinematic reveals."
        />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/luxury-brand-experience" />
        <meta property="og:title" content="L'Atelier De Réserve — Bespoke Luxury Brand Experience" />
        <meta
          property="og:description"
          content="Ultra-smooth Locomotive Scroll and GSAP parallax reveals. One product per scroll section designed to make your product feel like it costs 10x more."
        />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/luxury-brand-experience" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Luxury Minimalist Header */}
      <LuxuryHeader
        currentEditionIndex={currentEditionIndex}
        totalEditions={LUXURY_TINS.length}
        onSelectEdition={scrollToEdition}
        onOpenConcierge={() => handleOpenAllocation(LUXURY_TINS[currentEditionIndex] || LUXURY_TINS[0])}
      />

      {/* Allocation Concierge Drawer */}
      <AllocationDrawer
        tin={selectedTinForDrawer}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO OVERTURE (Vast Old-Money White/Negative Space) */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen flex flex-col items-center justify-between px-6 sm:px-12 py-32 text-center overflow-hidden border-b border-white/5">
        {/* Subtle atmospheric radial spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(245,158,11,0.08)_0%,_transparent_70%)] pointer-events-none -z-10" />

        {/* Top quiet kicker */}
        <div className="pt-8">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.45em] text-neutral-400">
            L’Atelier De Réserve · Sovereign Reserve
          </span>
        </div>

        {/* Grand Cormorant Garamond Monolithic Headline */}
        <div className="max-w-4xl mx-auto space-y-6 my-auto">
          <p className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-amber-400/80">
            Private Cellar Release · Harvest 2026
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-white tracking-tight font-normal leading-[0.95]">
            Where Scarcity <br />
            <span className="italic font-light text-neutral-300">Becomes Sovereign</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base font-serif italic text-neutral-400 leading-relaxed font-light pt-2">
            Luxury brands never crowd their canvas. Five single-estate botanical harvests, encased in hand-turned heavy gauge tins, unveiled one single masterpiece at a time.
          </p>
        </div>

        {/* Scroll Invocation */}
        <div className="flex flex-col items-center gap-3 pb-8">
          <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-neutral-400">
            Scroll to Enter the Vault
          </span>
          <button
            onClick={() => scrollToEdition(0)}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/40 transition-all animate-bounce"
            aria-label="Scroll to First Product Tin"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FIVE FULL-SCREEN CINEMATIC PRODUCT REVEALS (ONE PRODUCT PER SECTION) */}
      {/* ========================================================================= */}
      {LUXURY_TINS.map((tin, index) => {
        const isEven = index % 2 === 0;

        return (
          <section
            key={tin.id}
            ref={(el) => { sectionRefs.current[index] = el; }}
            id={tin.id}
            className="relative min-h-screen w-full flex items-center justify-center py-24 sm:py-32 px-6 sm:px-12 md:px-20 border-b border-white/5 overflow-hidden"
            style={{ backgroundColor: '#020202' }}
          >
            {/* Parallax Floating Botanical Elements */}
            <ParallaxParticles
              color={tin.themeColor}
              theme={
                tin.id.includes('kashmir')
                  ? 'crimson'
                  : tin.id.includes('kyoto')
                  ? 'emerald'
                  : tin.id.includes('voyage')
                  ? 'sapphire'
                  : tin.id.includes('lotus')
                  ? 'platinum'
                  : 'gold'
              }
            />

            {/* Huge Background Roman Numeral Watermark */}
            <div
              className="cinematic-watermark absolute right-6 sm:right-24 top-1/2 -translate-y-1/2 font-serif text-[18vw] font-bold text-white select-none pointer-events-none -z-0 leading-none"
              style={{ opacity: 0.03 }}
            >
              {tin.stampSymbol}
            </div>

            {/* Layout Grid: Vast Negative Space with High Perceived Value */}
            <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-20">
              
              {/* Column 1: Cinematic Narrative (Left on Even, Right on Odd) */}
              <div
                className={`lg:col-span-6 space-y-8 ${
                  isEven ? 'lg:order-1 text-left' : 'lg:order-2 text-left'
                }`}
              >
                {/* Chapter & Allocation Badge */}
                <div className="cinematic-text flex items-center gap-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full shadow-lg"
                    style={{ backgroundColor: tin.themeColor, boxShadow: `0 0 12px ${tin.themeColor}` }}
                  />
                  <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-400">
                    {tin.editionNumber} · {tin.vintage}
                  </span>
                </div>

                {/* Monumental Product Title in Cormorant Garamond */}
                <div className="cinematic-text space-y-3">
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight leading-[1.02] font-normal">
                    {tin.name}
                  </h2>
                  <p
                    className="text-lg sm:text-xl font-serif italic tracking-wide"
                    style={{ color: tin.themeColor }}
                  >
                    {tin.subtitle}
                  </p>
                </div>

                {/* Literary Description */}
                <p className="cinematic-text text-sm sm:text-base font-serif text-neutral-300 font-light leading-relaxed max-w-xl">
                  {tin.description}
                </p>

                {/* Sensory Botanical Notes (Aroma Wheel Elements) */}
                <div className="cinematic-text space-y-2 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 block">
                    Botanical Sensory Profile
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {tin.tastingNotes.map((note) => (
                      <span
                        key={note}
                        className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-xs font-serif text-neutral-200 tracking-wide"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Provenance & Technical Dossier */}
                <div className="cinematic-specs grid grid-cols-2 gap-4 py-4 border-y border-white/10 max-w-lg text-xs font-mono">
                  <div>
                    <span className="text-neutral-400 text-[10px] uppercase tracking-wider block">
                      Single Origin:
                    </span>
                    <span className="text-white font-medium">{tin.origin}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-[10px] uppercase tracking-wider block">
                      Altitude:
                    </span>
                    <span className="text-white font-medium">{tin.elevation}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-[10px] uppercase tracking-wider block">
                      Infusion Protocol:
                    </span>
                    <span className="text-white font-medium">{tin.steepProfile}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-[10px] uppercase tracking-wider block">
                      Cellar Scarcity:
                    </span>
                    <span className="text-amber-400 font-bold">
                      {tin.allocationRemaining} of {tin.allocationTotal} Left
                    </span>
                  </div>
                </div>

                {/* Call to Action Button */}
                <div className="cinematic-text pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    onClick={() => handleOpenAllocation(tin)}
                    className="group relative px-8 py-4 rounded-full bg-white text-black font-serif text-base tracking-wider hover:bg-neutral-200 transition-all flex items-center gap-3 font-medium active:scale-95 shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
                  >
                    <span>Request Allocation · {tin.price}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                    Complimentary Monogramming
                  </span>
                </div>
              </div>

              {/* Column 2: Photorealistic Floating Product Tin Stage */}
              <div
                className={`lg:col-span-6 flex items-center justify-center ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <LuxuryTinVisual tin={tin} />
              </div>
            </div>
          </section>
        );
      })}

      {/* ========================================================================= */}
      {/* 3. OLD-MONEY ARCHITECTURE OF DESIRE (Why Products Feel 10x More) */}
      {/* ========================================================================= */}
      <section className="py-32 px-6 sm:px-12 md:px-24 bg-[#040404] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.35em] text-amber-400">
              The Architecture of Desire
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight leading-tight">
              How Luxury Engineering Makes a Product Feel <br />
              <span className="italic text-neutral-300 font-light">Ten Times More Valuable</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left pt-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-black/60 space-y-4">
              <div className="w-10 h-10 rounded-full border border-amber-400/30 flex items-center justify-center font-serif text-amber-300">
                01
              </div>
              <h3 className="text-xl font-serif text-white">Negative Space as Currency</h3>
              <p className="text-sm font-serif text-neutral-300 leading-relaxed font-light">
                Cheap e-commerce packs forty discount banners onto a screen. Old-money luxury surrenders ninety percent of the viewport to silence, commanding reverent contemplation.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-black/60 space-y-4">
              <div className="w-10 h-10 rounded-full border-emerald-400/30 flex items-center justify-center font-serif text-emerald-300 border">
                02
              </div>
              <h3 className="text-xl font-serif text-white">Single-Product Pacing</h3>
              <p className="text-sm font-serif text-neutral-300 leading-relaxed font-light">
                Forcing one product per scroll section eliminates choice fatigue. Customers do not compare prices — they become captivated by singular provenance and scarcity.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-black/60 space-y-4">
              <div className="w-10 h-10 rounded-full border-blue-400/30 flex items-center justify-center font-serif text-blue-300 border">
                03
              </div>
              <h3 className="text-xl font-serif text-white">GSAP Inertial Tactility</h3>
              <p className="text-sm font-serif text-neutral-300 leading-relaxed font-light">
                Inertial physics with Locomotive Scroll and responsive 3D specular tilt make digital metal feel heavy, cool, and tangible beneath the visitor&apos;s fingertips.
              </p>
            </div>
          </div>

          {/* Agency Signature */}
          <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div>
              <p className="text-lg font-serif text-white">
                Want to build an ultra-prestige digital flagship for your brand?
              </p>
              <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest mt-1">
                AbuQitmirLabs Private Growth Engineering & Digital Atelier
              </p>
            </div>

            <a
              href="https://wa.me/923233260859?text=Hello%20AbuQitmirLabs,%20I%20want%20to%20build%20a%20luxury%20brand%20site%20like%20L'Atelier%20De%20Reserve"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full border border-amber-400/60 bg-amber-400/10 hover:bg-amber-400 hover:text-black text-amber-300 font-serif text-sm tracking-wider transition-all duration-300 shrink-0"
            >
              Commission Bespoke Atelier Experience →
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HERITAGE FOOTER */}
      {/* ========================================================================= */}
      <footer className="py-16 px-6 sm:px-12 border-t border-white/5 bg-black text-center text-xs font-mono text-neutral-400 uppercase tracking-[0.25em]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>L’Atelier De Réserve · Est. 2026</span>
          <span>Crafted by AbuQitmirLabs</span>
          <span>All Allocations Vault-Guaranteed</span>
        </div>
      </footer>
    </div>
  );
}

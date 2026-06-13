import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Smartphone, 
  Layers, 
  Globe, 
  Sparkles, 
  Briefcase, 
  Zap, 
  ShoppingBag, 
  Users, 
  GraduationCap,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Flame
} from 'lucide-react';

interface CategoryItem {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  badge: { text: string; color: string };
  metrics: { label: string; value: string }[];
  breakdown: {
    title: string;
    items: { label: string; details: string | string[] }[];
  }[];
  advantages?: string[];
  disadvantages?: string[];
  bestFor: string[];
  examples?: string[];
}

const categories: CategoryItem[] = [
  {
    id: "native",
    num: "01",
    title: "Native Mobile App Development",
    tagline: "Uncompromised performance. Elite capabilities.",
    description: "Built for one system at a time to leverage full processor capabilities, precise background cycles, and direct device hardware access.",
    icon: <Cpu className="w-5 h-5 text-blue-500" />,
    badge: { text: "Highest Performance", color: "indigo" },
    metrics: [
      { label: "Performance", value: "100/100" },
      { label: "Hardware Access", value: "Direct" },
      { label: "Cost Level", value: "Premium" }
    ],
    breakdown: [
      {
        title: "Platform Technologies",
        items: [
          { label: "Android", details: "Kotlin, Java — Delivering absolute system optimization & hardware threading." },
          { label: "iOS", details: "Swift, Objective-C — Tailored with Apple's low-overhead SwiftUI layout engines." }
        ]
      }
    ],
    bestFor: [
      "High-security banking & fin-tech systems",
      "FDA-compliant healthcare diagnostics & tracking",
      "Rich media, low-latency applications",
      "Dense enterprise hardware integrations"
    ],
    examples: ["Instagram (Core Feeds)", "Uber Realtime Driver", "WhatsApp VoIP & Chat Core"]
  },
  {
    id: "cross-platform",
    num: "02",
    title: "Cross-Platform App Development",
    tagline: "Unify dual ecosystems under a single clean build.",
    description: "Write one clean high-fidelity codebase that compile natively across Apple iOS and Google Android. Drastically reduces turnaround time and engineering overhead.",
    icon: <Smartphone className="w-5 h-5 text-[#ccff00]" />,
    badge: { text: "Best Market Value", color: "lime" },
    metrics: [
      { label: "Time-to-Market", value: "-45% Faster" },
      { label: "Code Sharing", value: "90% - 95%" },
      { label: "Performance", value: "120 FPS Native" }
    ],
    breakdown: [
      {
        title: "Framework Technologies",
        items: [
          { label: "Flutter", details: "Google's high-speed Skia/Impeller renderer. Ideal for sub-second visual renders." },
          { label: "React Native", details: "Meta's framework. Direct bridge to platform native widgets." },
          { label: "Other Toolsets", details: ".NET MAUI, custom shared C++ binaries." }
        ]
      }
    ],
    advantages: [
      "Significantly compressed dual-platform launch times",
      "Vastly lower deployment and maintenance budget",
      "Synchronized system updates & unified branding logic"
    ],
    disadvantages: [
      "Can require deep custom bridges for highly complex, non-standard lowlevel hardware registers."
    ],
    bestFor: [
      "Hyper-active tech startups aiming to capture cross ecosystems",
      "Slick Minimum Viable Products (MVPs)",
      "High-engagement e-commerce applications",
      "Standard client-server business apps"
    ],
    examples: ["Google Ads Dashboard Mobile", "Alibaba Global Purchasing Portal", "Refined custom MVP apps"]
  },
  {
    id: "hybrid",
    num: "03",
    title: "Hybrid App Development",
    tagline: "Web technologies natively framed inside a shell.",
    description: "Built using web paradigms and securely packaged inside a lightweight, sandboxed web-view container optimized for immediate deployment.",
    icon: <Layers className="w-5 h-5 text-indigo-400" />,
    badge: { text: "Rapid Delivery", color: "violet" },
    metrics: [
      { label: "Cost Level", value: "Very Low" },
      { label: "Development Speed", value: "Instant" },
      { label: "Updates", value: "Over the Air" }
    ],
    breakdown: [
      {
        title: "Sandboxed Frameworks",
        items: [
          { label: "Core Web Stack", details: "Capacitor, Ionic, Apache Cordova — Bridging local DOM to device shells." }
        ]
      }
    ],
    advantages: [
      "Lowest potential development cost structure",
      "Fastest initial deployment parameters",
      "Developer pool requires standard web engineering skills"
    ],
    disadvantages: [
      "Heavier runtime footprint relative to fully native compilation",
      "Highly restricted access to exclusive physical hardware resources"
    ],
    bestFor: [
      "Private internal company workflows",
      "Static content-heavy catalogues",
      "Rapid interactive proof of concepts"
    ]
  },
  {
    id: "pwa",
    num: "04",
    title: "Progressive Web Apps (PWA)",
    tagline: "Bypass the App Store entirely with advanced service workers.",
    description: "Fully responsive websites packaged with specialized offline storage service workers. Installs directly onto any smart device straight from the browser.",
    icon: <Globe className="w-5 h-5 text-sky-400" />,
    badge: { text: "No Store Approval Needed", color: "sky" },
    metrics: [
      { label: "Download Burden", value: "< 1MB" },
      { label: "Store Dependency", value: "Zero" },
      { label: "Search Indexability", value: "100%" }
    ],
    breakdown: [
      {
        title: "Web Standards Used",
        items: [
          { label: "Service Workers", details: "Background file caching, immediate assets load, and local notification queues." },
          { label: "Manifest JSON", details: "Permits custom splash screen, home icon, and standalone full-screen view." }
        ]
      }
    ],
    advantages: [
      "Extremely affordable layout budget",
      "Instant updates bypass App Store reviews",
      "Perfect unified device compatibility"
    ],
    disadvantages: [
      "No Apple App Store placement by default",
      "Restricted push registration on older iOS operating systems"
    ],
    bestFor: [
      "Realtime news portals & publication networks",
      "Community content portals",
      "Small business menus and client scheduling apps"
    ]
  },
  {
    id: "ai-powered",
    num: "05",
    title: "AI-Powered Mobile Apps",
    tagline: "Cognitive capabilities directly inside your pocket.",
    description: "Inject artificial intelligence protocols into the user flow. We combine intelligent models with local client performance for autonomous action.",
    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    badge: { text: "Next Generation Tech", color: "amber" },
    metrics: [
      { label: "Model Latency", value: "<150ms via API" },
      { label: "Local Models", value: "ONNX / CoreML compatible" },
      { label: "User Retention", value: "+80% Higher" }
    ],
    breakdown: [
      {
        title: "Intelligent Operations",
        items: [
          { label: "Key Integrations", details: "Intelligent conversational chatbots, ambient voice interfaces, and predictive user behavior workflows." },
          { label: "Media Vision", details: "On-the-fly local image classification, document scanning, and semantic searching." }
        ]
      }
    ],
    bestFor: [
      "SaaS startups deploying cutting-edge AI",
      "Smart adaptive teaching & language apps",
      "Interactive health diagnostics programs",
      "Contextual client-relations platforms"
    ],
    examples: ["ChatGPT Mobile Client", "Grammarly Writing Companion API", "Duolingo Speech Companion"]
  },
  {
    id: "enterprise",
    num: "06",
    title: "Enterprise Mobile Apps",
    tagline: "Operational command, security, and internal orchestration.",
    description: "Designed strictly for mid-to-large institutions. Integrates secure enterprise resource pipelines with absolute encryption metrics.",
    icon: <Briefcase className="w-5 h-5 text-red-400" />,
    badge: { text: "High Security", color: "rose" },
    metrics: [
      { label: "Authentication", value: "SAML / OAuth2" },
      { label: "Data Security", value: "AES-256 Cache" },
      { label: "Target", value: "Productivity" }
    ],
    breakdown: [
      {
        title: "Secure Enterprise Rails",
        items: [
          { label: "Active Directory", details: "Direct sync with internal Active Directory, Okta, or custom employee logins." },
          { label: "Private Delivery", details: "Safe deployment via private MDM server profiles, skipping public stores." }
        ]
      }
    ],
    bestFor: [
      "Large-scale corporate field auditing & reporting",
      "Secure banking customer relation lines",
      "Government logistical coordinate systems",
      "Clinical records management environments"
    ]
  },
  {
    id: "on-demand",
    num: "07",
    title: "On-Demand Mobile Apps",
    tagline: "Connect services to end-users with real-time accuracy.",
    description: "High-concurrency systems featuring advanced localized GPS tracking, real-time push events, and automated driver/merchant assignment rules.",
    icon: <Zap className="w-5 h-5 text-[#ccff00]" />,
    badge: { text: "Real-time Tracking", color: "lime" },
    metrics: [
      { label: "Websocket Latency", value: "<50ms" },
      { label: "GPS Precision", value: "High (High Accuracy)" },
      { label: "Payment Checkout", value: "Subsecond" }
    ],
    breakdown: [
      {
        title: "Realtime Mechanics",
        items: [
          { label: "Location Services", details: "Real-time coordinate stream tracking with battery-optimized background pings." },
          { label: "Instant Sync", details: "State engines triggered via WebSockets or Firebase Realtime Databases." }
        ]
      }
    ],
    bestFor: [
      "On-demand food delivery networks",
      "Global or local ride-sharing programs",
      "Home maintenance service dispatch systems",
      "Freelance job marketplaces with immediate payouts"
    ],
    examples: ["Uber Cab Network", "Careem Super-App", "DoorDash Logistics Engine"]
  },
  {
    id: "ecommerce",
    num: "08",
    title: "E-Commerce Mobile Apps",
    tagline: "Maximize checkout conversion with optimized shopping funnels.",
    description: "Designed specifically to minimize checkout friction. Retain valuable traffic with elegant product layouts, instant checkouts, and adaptive notifications.",
    icon: <ShoppingBag className="w-5 h-5 text-fuchsia-400" />,
    badge: { text: "Ultra Fast Funnels", color: "fuchsia" },
    metrics: [
      { label: "Conversion Lift", value: "+34% vs Web" },
      { label: "Cart Loading", value: "Immediate" },
      { label: "Payment Systems", value: "Stripe, Apple Pay" }
    ],
    breakdown: [
      {
        title: "Retail Ecosystems",
        items: [
          { label: "Product Catalogues", details: "Responsive, offline-cached directories optimized for speedy product search." },
          { label: "Security Gateway", details: "Compliant PCI-DSS payment gateways keeping purchases entirely protected." }
        ]
      }
    ],
    bestFor: [
      "Direct-to-Consumer retail brands",
      "Multi-vendor digital marketplaces",
      "Omni-channel store systems"
    ],
    examples: ["Amazon Shopping Network", "Daraz Core Retail", "eBay Live Auctioning Hub"]
  },
  {
    id: "social",
    num: "09",
    title: "Social Networking Apps",
    tagline: "Facilitate communication and build global communities.",
    description: "Optimized for extreme daily retention. Features instant group chatting, content indexing, real-time feeds, and live media sharing capabilities.",
    icon: <Users className="w-5 h-5 text-teal-400" />,
    badge: { text: "Highest Retention", color: "teal" },
    metrics: [
      { label: "Average Session", value: "+28 mins" },
      { label: "Video Render", value: "Realtime CDN" },
      { label: "Chat Transport", value: "MQTT / WebSockets" }
    ],
    breakdown: [
      {
        title: "Interactive Systems",
        items: [
          { label: "Custom Feed Rules", details: "Localized chronological or algorithmic social feeds designed for rapid scroll." },
          { label: "Media Handling", details: "Automatic image compression on upload with ultra-high quality CDN storage." }
        ]
      }
    ],
    bestFor: [
      "Interactive communication and brand communities",
      "Vertical micro-social circles",
      "Global text, voice, and streaming portals"
    ],
    examples: ["Facebook", "Instagram", "TikTok Media Stream"]
  },
  {
    id: "educational",
    num: "10",
    title: "Educational & Learning Apps",
    tagline: "Deploy structured training, quizzes, and instant certification.",
    description: "Designed to host media-rich instructional lessons, automated certification workflows, quiz scoreboards, and offline course reading pools.",
    icon: <GraduationCap className="w-5 h-5 text-orange-400" />,
    badge: { text: "Skill Certification Ready", color: "orange" },
    metrics: [
      { label: "Video Cache", value: "Offline Allowed" },
      { label: "Analytics Panel", value: "Student Gradebook" },
      { label: "Asset Storage", value: "Cloud S3 Integrated" }
    ],
    breakdown: [
      {
        title: "Educational Ecosystem",
        items: [
          { label: "Classrooms & Video", details: "Adaptive video quality pipelines matching local cellular bandwidth." },
          { label: "Engagement", details: "Personalized progress bars, interactive multi-choice quizzes, and PDF generation." }
        ]
      }
    ],
    bestFor: [
      "Private corporate training schemes",
      "Quranic, spiritual & theological institutions",
      "Global digital courses portals",
      "Language development systems"
    ],
    examples: ["Coursera Professional Lectures", "Udemy Technical Courses", "Quran Holy Recitation Programs"]
  }
];

export default function MobileAppCategoriesShowcase() {
  const [selectedId, setSelectedId] = useState<string>("native");
  
  const currentCategory = categories.find(c => c.id === selectedId) || categories[0];

  return (
    <section className="py-36 bg-black relative border-t border-neutral-900 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header - Old Money aesthetic pairing (Cormorant Garamond italic + thin monospaced header) */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
          <div>
            <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-bold block mb-4">
              [ SYSTEMS ARCHETYPE: 10 TOPOLOGIES ]
            </span>
            <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tight">
              Classification <span className="font-serif italic text-neutral-400">of App Architectures</span>
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 text-base md:text-lg leading-relaxed font-light font-sans">
            Luxury brands trust us to select the appropriate platform structure. Explore our classifications mapping performance boundaries, operational expenses, and exact deployment use cases.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Navigation Sidebar List (Left Side - Occupies 5 columns) */}
          <div className="lg:col-span-5 space-y-2 max-h-[700px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800">
            {categories.map((cat) => {
              const isActive = cat.id === selectedId;
              return (
                <button
                  key={cat.id}
                  id={`tab-btn-${cat.id}`}
                  onClick={() => setSelectedId(cat.id)}
                  className={`w-full text-left p-5 rounded-2xl transition-all flex items-center justify-between border ${
                    isActive 
                      ? 'bg-white/[0.04] border-white/20 text-white shadow-xl' 
                      : 'bg-transparent border-transparent text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-serif italic text-base font-semibold text-neutral-600 block w-6">
                      {cat.num}
                    </span>
                    <span className="font-bold text-sm tracking-wide uppercase">
                      {cat.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                      isActive ? 'bg-[#ccff00]/10 text-[#ccff00]' : 'bg-neutral-900 text-neutral-600'
                    }`}>
                      {cat.id === 'native' || cat.id === 'ai-powered' || cat.id === 'on-demand' || cat.id === 'enterprise' ? 'Core' : 'Standard'}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-1 text-[#ccff00]' : 'text-neutral-700'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Showcase Frame (Right Side - Occupies 7 columns) */}
          <div className="lg:col-span-7 bg-[#0b0b0b] rounded-[2rem] border border-white/10 p-8 md:p-12 relative min-h-[640px] flex flex-col justify-between overflow-hidden shadow-3xl">
            
            {/* Giant Number Indicator */}
            <div className="absolute top-4 right-8 font-serif italic text-[12rem] text-white/[0.015] leading-none pointer-events-none select-none font-extrabold">
              {currentCategory.num}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategory.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-8 flex-grow flex flex-col justify-between"
              >
                <div>
                  {/* Category Status & Icon */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/5 rounded-2xl border border-white/10 shadow-lg">
                        {currentCategory.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ccff00]">
                          Topology {currentCategory.num}
                        </span>
                        <h3 className="text-2xl font-bold uppercase tracking-tight text-white mt-0.5">
                          {currentCategory.title}
                        </h3>
                      </div>
                    </div>
                    
                    <span className={`text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full border border-white/10 ${
                      currentCategory.badge.color === 'indigo' ? 'bg-indigo-950/40 text-indigo-400' :
                      currentCategory.badge.color === 'lime' ? 'bg-lime-950/40 text-[#ccff00]' :
                      currentCategory.badge.color === 'sky' ? 'bg-sky-950/40 text-sky-400' :
                      currentCategory.badge.color === 'amber' ? 'bg-amber-950/40 text-amber-400' :
                      currentCategory.badge.color === 'fuchsia' ? 'bg-fuchsia-950/40 text-fuchsia-400' :
                      currentCategory.badge.color === 'teal' ? 'bg-teal-950/40 text-teal-400' :
                      currentCategory.badge.color === 'orange' ? 'bg-orange-950/40 text-orange-400' :
                      currentCategory.badge.color === 'rose' ? 'bg-rose-950/40 text-rose-400' :
                      'bg-white/5 text-neutral-300'
                    }`}>
                      {currentCategory.badge.text}
                    </span>
                  </div>

                  {/* Tagline & Core description */}
                  <div className="space-y-4">
                    <p className="font-serif italic text-xl md:text-2xl text-neutral-200 leading-relaxed font-semibold">
                      "{currentCategory.tagline}"
                    </p>
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">
                      {currentCategory.description}
                    </p>
                  </div>

                  {/* Dynamic Metrics Badge Bar */}
                  <div className="grid grid-cols-3 gap-3 my-8 border-y border-white/10 py-5">
                    {currentCategory.metrics.map((met, mi) => (
                      <div key={mi} className="text-center md:text-left">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                          {met.label}
                        </span>
                        <span className="text-white font-bold text-sm tracking-tight mt-1 block">
                          {met.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Technology breakdown mapping */}
                  <div className="space-y-6">
                    {currentCategory.breakdown.map((sec, si) => (
                      <div key={si} className="space-y-3">
                        <h4 className="text-[10px] font-mono text-neutral-500 block uppercase tracking-[0.25em] font-black">
                          [ {sec.title.toUpperCase()} ]
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {sec.items.map((it, iti) => (
                            <div key={iti} className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                              <span className="text-xs font-bold text-white uppercase block mb-1">
                                {it.label}
                              </span>
                              <span className="text-xs text-neutral-400 leading-relaxed font-light block">
                                {it.details}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Advantages & Disadvantages */}
                  {(currentCategory.advantages || currentCategory.disadvantages) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      {currentCategory.advantages && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono text-[#ccff00] uppercase tracking-wider block font-bold">
                            ▲ Key Advantages
                          </span>
                          <ul className="space-y-1.5">
                            {currentCategory.advantages.map((adv, ai) => (
                              <li key={ai} className="text-xs text-neutral-300 flex items-start gap-2 font-light">
                                <span className="text-[#ccff00] shrink-0 mt-0.5">✓</span>
                                <span>{adv}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {currentCategory.disadvantages && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block font-bold">
                            ▼ Core Tradeoffs
                          </span>
                          <ul className="space-y-1.5">
                            {currentCategory.disadvantages.map((dis, di) => (
                              <li key={di} className="text-xs text-neutral-400 flex items-start gap-2 font-light">
                                <AlertTriangle className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
                                <span>{dis}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Target Market Deployment suitability info */}
                  <div className="mt-6 space-y-2">
                    <span className="text-[10px] font-mono text-neutral-500 block uppercase tracking-[0.25em] font-black">
                      [ DESIGNATED FOR USE CASES ]
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentCategory.bestFor.map((use, ui) => (
                        <span key={ui} className="text-[11px] bg-white/[0.04] text-neutral-300 px-3 py-1.5 rounded-lg border border-white/5 font-sans tracking-wide">
                          • {use}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footnote Realworld Examples - Luxury status style bar */}
                {currentCategory.examples && (
                  <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-[#ccff00]" />
                      <span className="text-[10px] font-mono text-[#ccff00] uppercase tracking-widest font-black">
                        PROMINENT INDUSTRY EXAMPLES
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentCategory.examples.map((ex, exi) => (
                        <span key={exi} className="text-[11px] font-mono text-neutral-400 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}

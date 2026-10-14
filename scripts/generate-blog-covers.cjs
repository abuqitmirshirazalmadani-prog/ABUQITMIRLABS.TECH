const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const BLOG_COVERS = [
  {
    files: [
      'public/images/blog/performance-vs-brand-marketing-cover.jpg',
      'dist/images/blog/performance-vs-brand-marketing-cover.jpg'
    ],
    category: 'DIGITAL MARKETING',
    title: 'Performance Marketing vs Brand Marketing',
    subtitle: 'A tested 60/40 capital allocation model for early-stage and growth startups.',
    accent: '#ccff00',
    stat1: { label: 'PERFORMANCE SPLIT', val: '60%', desc: 'Immediate CAC validation & quick pipeline revenue' },
    stat2: { label: 'BRAND EQUITY SPLIT', val: '40%', desc: 'Compounding organic moat & long-term pricing power' }
  },
  {
    files: [
      'public/images/blog/measure-marketing-roi-without-tracking-cover.jpg',
      'dist/images/blog/measure-marketing-roi-without-tracking-cover.jpg'
    ],
    category: 'MARKETING ANALYTICS',
    title: 'Measuring Marketing ROI Without Tracking',
    subtitle: 'How to calculate true incrementality and causal ROI in a post-cookie landscape.',
    accent: '#06b6d4',
    stat1: { label: 'INCREMENTALITY TESTING', val: 'Causal ROI', desc: 'Holdout control groups reveal true lift' },
    stat2: { label: 'MARKETING MIX MODELING', val: 'Macro MMM', desc: 'Privacy-first statistical regression' }
  },
  {
    files: [
      'public/images/blog/guest-posting-strategy-2026-cover.jpg',
      'dist/images/blog/guest-posting-strategy-2026-cover.jpg'
    ],
    category: 'SEO STRATEGY',
    title: 'Guest Posting in 2026: What Actually Works',
    subtitle: 'Editorial placements on genuine DR 60+ domains with organic search traffic.',
    accent: '#ccff00',
    stat1: { label: 'MANUAL OUTREACH', val: '100% Real', desc: 'Zero PBNs, zero syndicated farm networks' },
    stat2: { label: 'ORGANIC CITATIONS', val: 'Dofollow', desc: 'Contextual anchor links inside indexed editorial copy' }
  },
  {
    files: [
      'public/assets/blog/digital-marketing-stack-2026-cover.png',
      'dist/assets/blog/digital-marketing-stack-2026-cover.png'
    ],
    category: 'TECH STACK',
    title: 'The Digital Marketing Stack for 2026',
    subtitle: 'First-party data infrastructure, AI automation agents, and modern attribution.',
    accent: '#3b82f6',
    stat1: { label: 'DATA INFRASTRUCTURE', val: '1st Party', desc: 'Server-side tracking & clean customer data platforms' },
    stat2: { label: 'AI AUTOMATION', val: 'Agentic', desc: 'Autonomous ad management & creative generation' }
  },
  {
    files: [
      'public/images/blog/2026-static-site-comeback-og.jpg',
      'dist/images/blog/2026-static-site-comeback-og.jpg'
    ],
    category: 'WEB ENGINEERING',
    title: 'The 2026 Static Site Comeback',
    subtitle: 'Why Jamstack won after all: sub-second latency, zero maintenance, and edge delivery.',
    accent: '#ccff00',
    stat1: { label: 'EDGE TTFB', val: '< 30ms', desc: 'Global CDN distribution without origin server load' },
    stat2: { label: 'SECURITY MOAT', val: 'Zero DB', desc: 'Immune to standard server-side injection vulnerabilities' }
  },
  {
    files: [
      'public/images/blog/cheap-hosting-performance-impact-2026-og.jpg',
      'dist/images/blog/cheap-hosting-performance-impact-2026-og.jpg'
    ],
    category: 'INFRASTRUCTURE',
    title: 'The Hidden Cost of Cheap Hosting',
    subtitle: 'How 300ms server latency quietly destroys your Core Web Vitals and organic rankings.',
    accent: '#ef4444',
    stat1: { label: 'CONVERSION LOSS', val: '-7% / sec', desc: 'Direct revenue decay per second of TTFB delay' },
    stat2: { label: 'SEO CRAWL BUDGET', val: 'Throttled', desc: 'Google bot reduces crawl frequency on slow hosts' }
  },
  {
    files: [
      'public/assets/blog/url-fragmentation-headless-spa-cover.png',
      'dist/assets/blog/url-fragmentation-headless-spa-cover.png'
    ],
    category: 'HEADLESS ARCHITECTURE',
    title: 'Fixing URL Fragmentation in Headless SPAs',
    subtitle: 'Preserving link equity, clean routing, and crawlability across single-page applications.',
    accent: '#06b6d4',
    stat1: { label: 'ROUTING INTEGRITY', val: 'Canonical', desc: 'Zero hashtag routing and clean pushState management' },
    stat2: { label: 'CRAWL FIDELITY', val: 'Pre-rendered', desc: '100% server-side HTML delivered to bot user-agents' }
  },
  {
    files: [
      'public/images/blog/saas-pricing-page-optimization-2026-og.jpg',
      'dist/images/blog/saas-pricing-page-optimization-2026-og.jpg'
    ],
    category: 'GROWTH ENGINEERING',
    title: 'SaaS Pricing Page Optimization',
    subtitle: '7 structural design and copywriting decisions backed by conversion data.',
    accent: '#ccff00',
    stat1: { label: 'TIER CLARITY', val: '3 Tiers', desc: 'Anchor pricing with recommended plan highlighted' },
    stat2: { label: 'ANNUAL DISCOUNT', val: '20% Opt-in', desc: 'Upfront cash collection accelerates reinvestment' }
  },
  {
    files: [
      'public/images/blog/pakistan-offshore-development-2026-og.jpg',
      'dist/images/blog/pakistan-offshore-development-2026-og.jpg'
    ],
    category: 'GLOBAL ENGINEERING',
    title: 'The Pakistan Advantage in Offshore Engineering',
    subtitle: 'Why top US and European startups are partnering with elite Pakistani software boutique studios.',
    accent: '#ccff00',
    stat1: { label: 'ANNUAL SAVINGS', val: '65–75%', desc: 'Senior Silicon-Valley tier architects at offshore rates' },
    stat2: { label: 'TALENT POOL', val: 'Top 1%', desc: 'Fluent English, zero lock-in, direct founder communication' }
  },
  {
    files: [
      'public/images/blog/local-seo-audit-2026-og.jpg',
      'dist/images/blog/local-seo-audit-2026-og.jpg'
    ],
    category: 'LOCAL SEO',
    title: 'What a Local SEO Audit Actually Checks in 2026',
    subtitle: 'Beyond basic NAP: Forensic GBP auditing, proximity geo-grids, and AI search presence.',
    accent: '#ccff00',
    stat1: { label: 'GEO-GRID ANALYSIS', val: 'Proximity', desc: 'Pinpoint ranking distribution across target ZIP codes' },
    stat2: { label: 'AI SEARCH READY', val: 'Perplexity & AEO', desc: 'Structured entity data for generative AI answers' }
  },
  {
    files: [
      'public/images/blog/programmatic-seo-tajweedpage-2026-og.jpg',
      'dist/images/blog/programmatic-seo-tajweedpage-2026-og.jpg'
    ],
    category: 'PROGRAMMATIC SEO',
    title: 'Scaling TajweedPage.com via Programmatic SEO',
    subtitle: 'Case study: Growing an AI Quran learning platform across 20+ countries in 10 days.',
    accent: '#10b981',
    stat1: { label: 'GLOBAL SCALE', val: '20+ Countries', desc: 'Automated semantic landing pages targeting search intent' },
    stat2: { label: 'TIME TO LAUNCH', val: '10 Days', desc: 'High-speed Next.js + RAG AI recitation teacher' }
  },
  {
    files: [
      'public/assets/images/agentic-ai-og-image.jpg',
      'dist/assets/images/agentic-ai-og-image.jpg'
    ],
    category: 'ARTIFICIAL INTELLIGENCE',
    title: 'Agentic AI: Avoiding Production Failures',
    subtitle: 'Architectural guardrails for deterministic autonomous workflows in enterprise software.',
    accent: '#a855f7',
    stat1: { label: 'LOOP CONTROL', val: 'Deterministic', desc: 'Strict state machines preventing infinite agent loops' },
    stat2: { label: 'RAG GROUNDING', val: 'Zero Hallucination', desc: 'Strict citation-backed truth verification' }
  },
  {
    files: [
      'public/blog/custom-web-development-cover.jpg',
      'dist/blog/custom-web-development-cover.jpg'
    ],
    category: 'WEB DEVELOPMENT',
    title: 'Custom Web Development: Architecture & Moats',
    subtitle: 'Why bespoke web platforms outperform generic templates in speed, security, and SEO.',
    accent: '#ccff00',
    stat1: { label: 'LIGHTHOUSE SCORE', val: '99/100', desc: 'Pure clean code without heavy CMS plugin bloat' },
    stat2: { label: 'IP OWNERSHIP', val: '100% Yours', desc: 'Zero licensing fees and full repository ownership' }
  },
  {
    files: [
      'public/images/5-layer-local-visibility-system.jpg',
      'dist/images/5-layer-local-visibility-system.jpg'
    ],
    category: 'LOCAL VISIBILITY',
    title: 'The 5-Layer Local Visibility System',
    subtitle: 'The unified playbook covering SEO, GEO, AIO, AEO, and SXO for local businesses.',
    accent: '#ccff00',
    stat1: { label: '5-LAYER STACK', val: 'Complete', desc: 'Maps, Local Organic, Voice, AI Citations & UX' },
    stat2: { label: 'MAP PACK DOMINANCE', val: '#1 Rankings', desc: 'Consistent top 3 placement in local search pack' }
  },
  {
    files: [
      'public/images/seo-services-2026-guide.jpg',
      'dist/images/seo-services-2026-guide.jpg'
    ],
    category: 'SEARCH ENGINE OPTIMIZATION',
    title: 'What SEO Services Actually Mean in 2026',
    subtitle: 'A transparent guide to technical architecture, semantic content, and authority building.',
    accent: '#ccff00',
    stat1: { label: 'TECHNICAL SEO', val: 'Core Vitals', desc: 'Clean schema markup, crawl efficiency & speed' },
    stat2: { label: 'SEARCH INTENT', val: 'Semantic', desc: 'Answers engineered for humans and AI search bots' }
  },
  {
    files: [
      'public/images/mobile-app-development-company-2026.jpg',
      'dist/images/mobile-app-development-company-2026.jpg'
    ],
    category: 'MOBILE ENGINEERING',
    title: 'Choosing a Mobile App Development Partner',
    subtitle: 'Flutter vs Native iOS/Android: What founders must know before signing a contract.',
    accent: '#3b82f6',
    stat1: { label: 'CROSS-PLATFORM', val: 'Flutter', desc: 'Single codebase delivering 60 FPS on iOS and Android' },
    stat2: { label: 'TIME TO MARKET', val: '50% Faster', desc: 'Ship to App Store & Google Play simultaneously' }
  },
  {
    files: [
      'public/blog/ai-agent-agency-vs-inhouse-cover.jpg',
      'dist/blog/ai-agent-agency-vs-inhouse-cover.jpg'
    ],
    category: 'ENTERPRISE AI',
    title: 'AI Agent Development: Agency vs In-House',
    subtitle: 'The real cost-benefit breakdown of building custom LLM agents in-house versus hiring specialists.',
    accent: '#a855f7',
    stat1: { label: 'TIME TO SHIP', val: '3x Faster', desc: 'Pre-built RAG pipelines and vector database integrations' },
    stat2: { label: 'CAPITAL EFFICIENCY', val: '-60% Cost', desc: 'Avoid expensive $300k+ in-house AI research salaries' }
  },
  {
    files: [
      'public/blog/fintech-software-development-compliance-first-architecture/cover.jpg',
      'dist/blog/fintech-software-development-compliance-first-architecture/cover.jpg'
    ],
    category: 'FINTECH ENGINEERING',
    title: 'Fintech Software Development: Compliance-First',
    subtitle: 'Architecting PCI-DSS, SOC2, and AML-ready financial platforms with zero transaction downtime.',
    accent: '#06b6d4',
    stat1: { label: 'SECURITY STANDARDS', val: 'PCI-DSS', desc: 'End-to-end tokenization and cryptographic audit trails' },
    stat2: { label: 'UPTIME SLA', val: '99.99%', desc: 'Multi-region failover and distributed ledger resilience' }
  },
  {
    files: [
      'public/images/blog/flutter-vs-native-2026-og.jpg',
      'dist/images/blog/flutter-vs-native-2026-og.jpg'
    ],
    category: 'APP ARCHITECTURE',
    title: 'Flutter vs Native: Mobile Stack Selection',
    subtitle: 'Deep performance benchmark: CPU load, frame drops, compile times, and engineering costs.',
    accent: '#3b82f6',
    stat1: { label: 'PERFORMANCE', val: '60–120 FPS', desc: 'Skia and Impeller hardware-accelerated rendering' },
    stat2: { label: 'BUDGET EFFICIENCY', val: 'Save 40%', desc: 'One engineering team maintains both mobile platforms' }
  },
  {
    files: [
      'public/images/high-performance-web-apps-cover.jpg',
      'dist/images/high-performance-web-apps-cover.jpg'
    ],
    category: 'PERFORMANCE ENGINEERING',
    title: 'High-Performance Web Apps: 12 Decisions',
    subtitle: 'The architectural blueprint behind sub-second load times and flawless Core Web Vitals.',
    accent: '#ccff00',
    stat1: { label: 'LCP BENCHMARK', val: '< 0.8s', desc: 'Instant paint times on mobile 4G networks' },
    stat2: { label: 'CLS SCORE', val: '0.000', desc: 'Zero visual layout shift with reserved aspect ratios' }
  }
];

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function generateBannerSvg(c) {
  const width = 1200;
  const height = 675;
  const accent = c.accent || '#ccff00';

  const category = escapeXml(c.category);
  const title = escapeXml(c.title);
  const subtitle = escapeXml(c.subtitle);
  const stat1Label = escapeXml(c.stat1.label);
  const stat1Val = escapeXml(c.stat1.val);
  const stat1Desc = escapeXml(c.stat1.desc);
  const stat2Label = escapeXml(c.stat2.label);
  const stat2Val = escapeXml(c.stat2.val);
  const stat2Desc = escapeXml(c.stat2.desc);

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#050507"/>
        <stop offset="50%" stop-color="#0a0d14"/>
        <stop offset="100%" stop-color="#020305"/>
      </linearGradient>

      <radialGradient id="accentGlow" cx="50%" cy="30%" r="55%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.14"/>
        <stop offset="60%" stop-color="${accent}" stop-opacity="0.02"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>

      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#18181b" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#09090b" stop-opacity="0.95"/>
      </linearGradient>

      <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${accent}"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.2"/>
      </linearGradient>

      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272a" stroke-width="0.75" stroke-opacity="0.3" />
      </pattern>
    </defs>

    <!-- Canvas Background -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
    <rect width="${width}" height="${height}" fill="url(#grid)"/>
    <rect width="${width}" height="${height}" fill="url(#accentGlow)"/>

    <!-- Top Accent Bar -->
    <rect x="0" y="0" width="${width}" height="4" fill="url(#accentLine)"/>

    <!-- Category Pill Badge -->
    <g transform="translate(80, 75)">
      <rect x="0" y="0" width="180" height="28" rx="14" fill="${accent}" fill-opacity="0.12" stroke="${accent}" stroke-width="1.2"/>
      <circle cx="16" cy="14" r="4.5" fill="${accent}"/>
      <text x="30" y="19" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="11" font-weight="800" fill="${accent}" letter-spacing="1.5">${category}</text>
      <text x="200" y="19" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#71717a" letter-spacing="1.5">ABUQITMIRLABS KNOWLEDGE BASE</text>
    </g>

    <!-- Main Title -->
    <text x="80" y="170" font-family="'Space Grotesk', sans-serif" font-size="42" font-weight="800" fill="#ffffff" letter-spacing="-0.5">
      ${title}
    </text>

    <!-- Subtitle -->
    <text x="80" y="225" font-family="'Inter', sans-serif" font-size="18" font-weight="400" fill="#a1a1aa" letter-spacing="0.2">
      ${subtitle}
    </text>

    <!-- Metric Dashboard Cards -->
    <g transform="translate(80, 275)">
      <!-- Left Card -->
      <g>
        <rect x="0" y="0" width="500" height="270" rx="20" fill="url(#cardGrad)" stroke="#27272a" stroke-width="1.5"/>
        <text x="30" y="45" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="800" fill="#71717a" letter-spacing="1.5">${stat1Label}</text>
        <text x="30" y="105" font-family="'Space Grotesk', sans-serif" font-size="42" font-weight="800" fill="${accent}" letter-spacing="-1">${stat1Val}</text>
        <text x="30" y="150" font-family="'Inter', sans-serif" font-size="14" fill="#a1a1aa">${stat1Desc}</text>
        
        <rect x="30" y="195" width="440" height="6" rx="3" fill="#27272a"/>
        <rect x="30" y="195" width="370" height="6" rx="3" fill="${accent}"/>
        <text x="30" y="235" font-family="'Inter', sans-serif" font-size="11" font-weight="500" fill="#71717a">Verified Industry Production Standard</text>
      </g>

      <!-- Right Card -->
      <g transform="translate(540, 0)">
        <rect x="0" y="0" width="500" height="270" rx="20" fill="url(#cardGrad)" stroke="#27272a" stroke-width="1.5"/>
        <text x="30" y="45" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="800" fill="#71717a" letter-spacing="1.5">${stat2Label}</text>
        <text x="30" y="105" font-family="'Space Grotesk', sans-serif" font-size="42" font-weight="800" fill="#ffffff" letter-spacing="-1">${stat2Val}</text>
        <text x="30" y="150" font-family="'Inter', sans-serif" font-size="14" fill="#a1a1aa">${stat2Desc}</text>

        <rect x="30" y="195" width="440" height="6" rx="3" fill="#27272a"/>
        <rect x="30" y="195" width="390" height="6" rx="3" fill="#ffffff" fill-opacity="0.8"/>
        <text x="30" y="235" font-family="'Inter', sans-serif" font-size="11" font-weight="500" fill="#71717a">Architectural Moat &amp; Long-Term Leverage</text>
      </g>
    </g>

    <!-- Bottom Watermark Branding -->
    <g transform="translate(80, 620)">
      <circle cx="6" cy="6" r="3" fill="${accent}"/>
      <text x="16" y="10" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="800" fill="${accent}" letter-spacing="1">ABUQITMIRLABS.TECH</text>
      <text x="180" y="10" font-family="'Inter', sans-serif" font-size="11" font-weight="500" fill="#52525b">| High-Performance Software &amp; AI Engineering Studio</text>
    </g>
  </svg>
  `;
}

async function generateAllCovers() {
  for (const item of BLOG_COVERS) {
    const svg = generateBannerSvg(item);
    const buffer = await sharp(Buffer.from(svg))
      .jpeg({ quality: 95, mozjpeg: true })
      .toBuffer();

    for (const filePath of item.files) {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, buffer);
      console.log(`✓ Saved ${filePath} (${buffer.length} bytes)`);
    }
  }
  console.log(`\n🎉 Successfully generated ${BLOG_COVERS.length} high-res blog cover assets!`);
}

generateAllCovers().catch(err => {
  console.error('Failed to generate covers:', err);
  process.exit(1);
});

import {
  BusinessType,
  Industry,
  WebsiteStage,
  PrimaryGoal,
  TeamSize,
  TimeInvestment,
  SeoChecklist,
  ChecklistPhase,
  ChecklistTask,
  TopPriorityItem
} from '../types/seoChecklist';

export const BUSINESS_TYPE_LABELS: Record<string, { label: string; desc: string; icon: string }> = {
  ecommerce: { label: 'E-commerce', desc: 'Online store, shop catalog', icon: '🛒' },
  saas: { label: 'SaaS Platform', desc: 'Software subscription, B2B tool', icon: '💻' },
  local: { label: 'Local Business', desc: 'Physical storefront or local service area', icon: '📍' },
  service: { label: 'Service Agency', desc: 'Consulting, B2B agency, professional', icon: '🔧' },
  blog: { label: 'Blog & Media', desc: 'Publishing, content site, affiliate', icon: '📝' },
  portfolio: { label: 'Portfolio & Creator', desc: 'Freelancer, personal branding', icon: '🎨' },
  marketplace: { label: 'Marketplace', desc: 'Multi-vendor buyers & sellers', icon: '🏪' },
  nonprofit: { label: 'Non-Profit / NGO', desc: 'Charity, community mission', icon: '❤️' }
};

export const INDUSTRY_LABELS: Record<string, { label: string; icon: string }> = {
  healthcare: { label: 'Healthcare & Medical', icon: '🏥' },
  fintech: { label: 'Fintech & Financial', icon: '💰' },
  retail: { label: 'Retail & Consumer Goods', icon: '🛍️' },
  realestate: { label: 'Real Estate & Property', icon: '🏠' },
  education: { label: 'Education & EdTech', icon: '🎓' },
  hospitality: { label: 'Hospitality & Dining', icon: '🍽️' },
  tech: { label: 'Technology & IT', icon: '⚙️' },
  legal: { label: 'Legal & Law Firm', icon: '⚖️' },
  other: { label: 'General / Other', icon: '📦' }
};

export const STAGE_LABELS: Record<string, { label: string; desc: string; icon: string }> = {
  prelaunch: { label: 'Pre-Launch', desc: 'Not live yet, building architecture', icon: '🚀' },
  new: { label: 'Just Launched', desc: '0 - 6 months live', icon: '🌱' },
  growing: { label: 'Growing', desc: '6 - 18 months established traffic', icon: '📈' },
  established: { label: 'Established', desc: '18+ months mature domain', icon: '🌳' },
  redesign: { label: 'Redesign / Migration', desc: 'Relaunching or changing CMS', icon: '🔄' }
};

export const GOAL_LABELS: Record<string, { label: string; icon: string }> = {
  local: { label: 'Local Visibility', icon: '📍' },
  national: { label: 'National Rankings', icon: '🇺🇸' },
  leads: { label: 'High-Intent Lead Generation', icon: '📞' },
  ecommerce: { label: 'Direct E-Commerce Sales', icon: '🛒' },
  awareness: { label: 'Brand Authority & PR', icon: '📢' },
  traffic: { label: 'Organic Traffic Volume', icon: '📈' }
};

/**
 * High-Precision Algorithmic SEO Checklist Engine
 * Generates an exhaustive 40-55 task roadmap organized into 6 phases.
 */
export function generateAlgorithmicChecklist(
  businessType: BusinessType | string,
  industry: Industry | string,
  stage: WebsiteStage | string,
  goal: PrimaryGoal | string,
  teamSize?: TeamSize | string,
  time?: TimeInvestment | string
): SeoChecklist {
  const bType = (businessType || 'service') as BusinessType;
  const ind = (industry || 'tech') as Industry;
  const stg = (stage || 'growing') as WebsiteStage;
  const gl = (goal || 'leads') as PrimaryGoal;

  const isLocal = bType === 'local' || gl === 'local';
  const isEcommerce = bType === 'ecommerce' || bType === 'marketplace' || gl === 'ecommerce';
  const isSaas = bType === 'saas';
  const isPrelaunch = stg === 'prelaunch' || stg === 'new';
  const isYMYL = ind === 'healthcare' || ind === 'fintech' || ind === 'legal';

  // --- Phase 1: Foundation (Weeks 1-2) ---
  const phase1Tasks: ChecklistTask[] = [
    {
      id: 'f-gsc',
      title: 'Setup & Verify Google Search Console & Bing Webmaster Tools',
      description: 'Establish direct telemetry with Google to monitor indexing, mobile usability, and search queries.',
      priority: 'high',
      estimatedTime: '30 mins',
      impact: 'Critical',
      howTo: '1. Navigate to search.google.com/search-console. 2. Verify domain ownership via DNS TXT record or HTML tag. 3. Configure email alerts for critical crawl anomalies.',
      tools: ['Google Search Console', 'DNS Provider', 'Bing Webmaster Tools']
    },
    {
      id: 'f-ga4',
      title: 'Deploy GA4 Analytics with Conversion & Event Funnels',
      description: 'Accurately track organic visitor acquisition, engagement rate, key conversion actions, and bounce signals.',
      priority: 'high',
      estimatedTime: '45 mins',
      impact: 'Critical',
      howTo: 'Install Google Tag Manager. Define custom events for contact form submits, phone clicks, signups, or product purchases.',
      tools: ['Google Analytics 4', 'Google Tag Manager']
    },
    {
      id: 'f-sitemap',
      title: 'Generate Dynamic XML Sitemap & Validate Robots.txt',
      description: 'Ensure clean crawler access while preventing crawl waste on admin, checkout, and private search parameter URLs.',
      priority: 'high',
      estimatedTime: '30 mins',
      impact: 'High',
      howTo: 'Create sitemap.xml listing all canonical pages. Submit to GSC. In robots.txt, declare Sitemap: https://yourdomain.com/sitemap.xml and block non-public directories.',
      tools: ['XML Sitemap Generator', 'Google Robots Testing Tool']
    },
    {
      id: 'f-ssl',
      title: 'Enforce HTTPS & HTTP/2 or HTTP/3 Protocol with TLS 1.3',
      description: 'Ensure secure transport layer security across all site routes with automatic 301 redirection from HTTP to HTTPS.',
      priority: 'high',
      estimatedTime: '20 mins',
      impact: 'Critical',
      howTo: 'Deploy free automated SSL certificate via Cloudflare, Let\'s Encrypt, or host provider. Enable HTTP Strict Transport Security (HSTS).',
      tools: ['Cloudflare', 'SSL Shopper', 'SSL Labs']
    },
    {
      id: 'f-keywords',
      title: `${ind.toUpperCase()} Core Seed Keyword & Competitor Gap Analysis`,
      description: `Identify 30-50 commercial and informational keywords targeting ${ind} buyers with realistic keyword difficulty (KD).`,
      priority: 'high',
      estimatedTime: '2-3 hours',
      impact: 'High',
      howTo: `Analyze top 3 direct competitors in the ${ind} space. Map seed terms into awareness, evaluation, and transactional purchase intent categories.`,
      tools: ['Ahrefs / Semrush', 'Google Keyword Planner', 'AnswerThePublic']
    }
  ];

  if (isPrelaunch) {
    phase1Tasks.push({
      id: 'f-prelaunch-noindex',
      title: 'Audit robots meta tags (remove noindex prior to public launch)',
      description: 'Ensure test environments do not get accidentally indexed, and production tags are ready for live indexing.',
      priority: 'high',
      estimatedTime: '15 mins',
      impact: 'Critical',
      howTo: 'Check <meta name="robots" content="index, follow"> in your layout template. Remove any lingering noindex tags right before launch.',
      tools: ['Chrome DevTools', 'Screaming Frog']
    });
  }

  // --- Phase 2: On-Page Optimization (Weeks 3-4) ---
  const phase2Tasks: ChecklistTask[] = [
    {
      id: 'o-meta',
      title: 'Craft Unique Title Tags & Click-Optimized Meta Descriptions',
      description: 'Optimize page titles (under 60 characters) and meta descriptions (120-155 characters) for maximum SERP click-through rate.',
      priority: 'high',
      estimatedTime: '2-3 hours',
      impact: 'High',
      howTo: 'Format: Primary Keyword - Secondary Descriptor | Brand Name. Include strong benefit verbs (e.g. "Instant", "Verified", "Guide", "Get Quote").',
      tools: ['SERP Simulator', 'Screaming Frog', 'Yoast / RankMath']
    },
    {
      id: 'o-hierarchy',
      title: 'Enforce Semantic Heading Hierarchy (H1, H2, H3)',
      description: 'Each indexable page must contain exactly one informative H1 tag followed by logical H2 and H3 subsections.',
      priority: 'medium',
      estimatedTime: '1 hour',
      impact: 'Medium',
      howTo: 'Never use multiple H1 tags. Ensure headings include semantic variations of target queries and topical sub-entities.',
      tools: ['HTML Validator', 'Heading Tree Viewer']
    },
    {
      id: 'o-images',
      title: 'Compress Images to WebP/AVIF & Add Contextual Alt Attributes',
      description: 'Improve page load speed and rank in Google Image Search by providing descriptive alt tags on all meaningful imagery.',
      priority: 'medium',
      estimatedTime: '1.5 hours',
      impact: 'Medium',
      howTo: 'Use Squoosh or build plugins to convert PNG/JPG to WebP. Keep image files under 150KB. Write alt tags that accurately describe image content.',
      tools: ['Squoosh.app', 'TinyPNG', 'Cloudinary']
    },
    {
      id: 'o-internal-links',
      title: 'Establish Strategic Internal Linking Architecture',
      description: 'Connect high-authority landing pages to secondary conversion pages using descriptive, non-generic anchor text.',
      priority: 'high',
      estimatedTime: '2 hours',
      impact: 'High',
      howTo: 'Link from high-traffic blog posts to commercial service or product pages. Avoid "click here" or "read more" anchors in favor of keyword-rich anchors.',
      tools: ['Ahrefs Internal Link Audit', 'Sitebulb']
    },
    {
      id: 'o-cwv',
      title: 'Optimize Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms)',
      description: 'Pass Google\'s page experience signals by eliminating render-blocking stylesheets and layout shifts.',
      priority: 'high',
      estimatedTime: '3-5 hours',
      impact: 'High',
      howTo: 'Preload hero banners using fetchpriority="high", reserve layout dimensions with CSS aspect-ratio, and defer third-party scripts.',
      tools: ['AbuQitmirLabs Website Audit Tool', 'PageSpeed Insights']
    }
  ];

  if (isEcommerce) {
    phase2Tasks.push({
      id: 'o-ecom-cat',
      title: 'Optimize Category & Product Listing Pages (PLP)',
      description: 'Include 150-250 words of contextual copy above or below the product grid to establish topical authority.',
      priority: 'high',
      estimatedTime: '3 hours',
      impact: 'High',
      howTo: 'Add buying guides, FAQ sections, and structured faceted navigation with canonicalization for filter parameters.',
      tools: ['Shopify SEO / WooCommerce SEO', 'Screaming Frog']
    });
  }

  // --- Phase 3: Content & Semantic Strategy (Weeks 5-8) ---
  const phase3Tasks: ChecklistTask[] = [
    {
      id: 'c-pillar',
      title: 'Design Pillar-Cluster Content Architecture',
      description: `Create one comprehensive master pillar page covering the core topic of ${ind}, surrounded by 5-8 hyper-focused cluster articles.`,
      priority: 'high',
      estimatedTime: '4-6 hours',
      impact: 'Critical',
      howTo: 'Map user search intent across informational queries. Link all cluster posts back to the central pillar page to build domain authority.',
      tools: ['Notion / Miro', 'MarketMuse', 'Frase.io']
    },
    {
      id: 'c-schema',
      title: `Deploy Rich Schema.org Structured Data (${isLocal ? 'LocalBusiness' : isEcommerce ? 'Product & Review' : 'Organization & FAQPage'})`,
      description: 'Help search engines and AI models accurately parse your entities, business details, reviews, and answers.',
      priority: 'high',
      estimatedTime: '2 hours',
      impact: 'High',
      howTo: 'Inject JSON-LD structured data into the <head> of key pages. Test with Google Rich Results Test to ensure zero warnings.',
      tools: ['Google Rich Results Test', 'Schema Markup Generator by Merkle']
    },
    {
      id: 'c-faq',
      title: 'Add Conversational FAQ Sections to High-Value Pages',
      description: 'Target zero-click featured snippets, voice search, and AI answer engines (Perplexity, ChatGPT, Google SGE).',
      priority: 'medium',
      estimatedTime: '2 hours',
      impact: 'Medium',
      howTo: 'Identify 5-8 real customer questions. Write direct, factual answers in 40-50 words immediately following each question header.',
      tools: ['AlsoAsked.com', 'Google People Also Ask']
    }
  ];

  if (isYMYL) {
    phase3Tasks.push({
      id: 'c-eeat',
      title: `Strict E-E-A-T Author Profiles & Medical/Legal/Financial Editorial Standards`,
      description: `Google requires demonstrable Experience, Expertise, Authoritativeness, and Trustworthiness for ${ind} websites.`,
      priority: 'high',
      estimatedTime: '3 hours',
      impact: 'Critical',
      howTo: 'Add dedicated author bio pages detailing professional credentials, verified certifications, LinkedIn profiles, and peer review notices.',
      tools: ['Google Quality Rater Guidelines', 'Author Schema']
    });
  } else {
    phase3Tasks.push({
      id: 'c-eeat-gen',
      title: 'Showcase Demonstrable First-Hand Proof & Case Studies',
      description: 'Differentiate your content from generic AI generation by featuring original photos, proprietary data, and real client results.',
      priority: 'medium',
      estimatedTime: '2.5 hours',
      impact: 'High',
      howTo: 'Incorporate client testimonials, live benchmarks, before/after metrics, and verified customer case studies.',
      tools: ['AbuQitmirLabs Case Study Builder']
    });
  }

  // --- Phase 4: Off-Page & Authority Building (Weeks 9-12) ---
  const phase4Tasks: ChecklistTask[] = [
    {
      id: 'off-citations',
      title: 'Audit & Build High-Authority Industry Citations',
      description: 'Secure foundational directory and platform listings with matching Name, Address, Phone, and Website URL (NAPW).',
      priority: 'high',
      estimatedTime: '3-4 hours',
      impact: 'High',
      howTo: `Register in Yelp, Crunchbase, Trustpilot, Better Business Bureau, and top ${ind} specialized association directories.`,
      tools: ['BrightLocal', 'Whitespark', 'AbuQitmirLabs Citation Builder']
    },
    {
      id: 'off-pr',
      title: 'Digital PR & Expert Commentary Outreach (Connectively / HARO)',
      description: 'Earn editorial backlinks from mainstream publications by providing expert quotes on breaking industry news.',
      priority: 'medium',
      estimatedTime: '1-2 hrs/week',
      impact: 'High',
      howTo: 'Sign up for Connectively, Qwoted, and Featured. Respond with concise, jargon-free expert insights within 2 hours of inquiry broadcast.',
      tools: ['Connectively', 'Qwoted', 'Featured.com']
    },
    {
      id: 'off-unlinked',
      title: 'Reclaim Brand Unlinked Mentions & Lost Backlinks',
      description: 'Turn existing internet brand mentions into high-value follow backlinks.',
      priority: 'low',
      estimatedTime: '1 hour',
      impact: 'Medium',
      howTo: 'Use Ahrefs Content Explorer or Google Alerts for your brand name. Reach out cordially thanking the author and requesting a clickable link.',
      tools: ['Google Alerts', 'Ahrefs Content Explorer']
    },
    {
      id: 'off-partners',
      title: 'Co-Marketing & Guest Insights with Non-Competing Industry Allies',
      description: 'Exchange educational thought leadership pieces with complementary businesses.',
      priority: 'medium',
      estimatedTime: '3 hours',
      impact: 'Medium',
      howTo: 'Draft a data-backed research summary or unique case study to pitch to reputable niche blogs in your vertical.',
      tools: ['Hunter.io', 'LinkedIn Sales Navigator']
    }
  ];

  // --- Phase 5: Local SEO / Vertical Specific (Weeks 10-14) ---
  const phase5Tasks: ChecklistTask[] = [];

  if (isLocal) {
    phase5Tasks.push(
      {
        id: 'loc-gbp',
        title: 'Claim, Verify & 100% Optimize Google Business Profile (GBP)',
        description: 'Your primary local ranking engine for Google 3-Pack map visibility in your metropolitan service area.',
        priority: 'high',
        estimatedTime: '1.5 hours',
        impact: 'Critical',
        howTo: 'Select accurate primary category. Add high-res storefront photos, exact business hours, geo-tagged product photos, and weekly GBP updates.',
        tools: ['Google Business Profile Manager', 'GeoImgr']
      },
      {
        id: 'loc-reviews',
        title: 'Implement Automated Review Generation Workflow',
        description: 'Systematically earn steady 5-star customer reviews with natural keyword mentions in review responses.',
        priority: 'high',
        estimatedTime: '2 hours',
        impact: 'Critical',
        howTo: 'Create direct shortlink to Google review dialog (e.g. g.page/r/your-id/review). Send via automated SMS/email 24 hours after service completion.',
        tools: ['Google Review Link Generator', 'Podium / Birdeye']
      },
      {
        id: 'loc-pages',
        title: 'Develop Hyper-Local City & Neighborhood Landing Pages',
        description: 'Target specific surrounding suburbs or service corridors without creating thin duplicate content.',
        priority: 'high',
        estimatedTime: '4 hours',
        impact: 'High',
        howTo: 'Include local case studies, customer photos from that municipality, embedded Google Map, and specific regional landmark references.',
        tools: ['Google Maps API', 'Local Schema Generator']
      }
    );
  } else if (isEcommerce) {
    phase5Tasks.push(
      {
        id: 'ecom-feed',
        title: 'Sync Google Merchant Center & Free Product Listings Feed',
        description: 'Appear in Google Shopping tabs and rich product carousel snippets across search results.',
        priority: 'high',
        estimatedTime: '2 hours',
        impact: 'Critical',
        howTo: 'Connect XML or automated API product feed to Google Merchant Center. Ensure GTIN, MPN, brand, price, and in-stock status are valid.',
        tools: ['Google Merchant Center', 'Shopify Google Channel']
      },
      {
        id: 'ecom-reviews-schema',
        title: 'Deploy AggregateRating & Product Review Stars Schema',
        description: 'Display golden review stars and live stock availability in organic Google search listings.',
        priority: 'high',
        estimatedTime: '2 hours',
        impact: 'High',
        howTo: 'Integrate reviews provider (Judge.me, Yotpo, stamped.io) with valid JSON-LD Product & AggregateRating structured microdata.',
        tools: ['Judge.me', 'Rich Results Test']
      }
    );
  } else if (isSaas) {
    phase5Tasks.push(
      {
        id: 'saas-versus',
        title: 'Build High-Intent Comparison Pages ("Your Brand vs Competitor")',
        description: 'Capture prospective buyers at the bottom of the funnel actively evaluating software alternatives.',
        priority: 'high',
        estimatedTime: '4 hours',
        impact: 'Critical',
        howTo: 'Create objective feature breakdown tables, migration guides, real user reviews, and transparent pricing comparisons.',
        tools: ['G2', 'Capterra', 'TrustRadius']
      },
      {
        id: 'saas-integration',
        title: 'Launch Integrations & Ecosystem Directory Pages',
        description: 'Rank for high-volume queries like "how to connect [Your SaaS] with Zapier / Slack / Salesforce".',
        priority: 'medium',
        estimatedTime: '3-5 hours',
        impact: 'High',
        howTo: 'Publish individual integration landing pages with step-by-step API setup instructions and video walkthroughs.',
        tools: ['Zapier App Directory', 'Postman']
      }
    );
  } else {
    phase5Tasks.push(
      {
        id: 'srv-case-studies',
        title: 'Publish In-Depth Technical Case Studies & Deliverable Breakdowns',
        description: 'Prove real engineering and consulting competence to earn executive B2B client trust.',
        priority: 'high',
        estimatedTime: '3 hours',
        impact: 'High',
        howTo: 'Follow Problem -> Technical Solution -> Quantified Business Metrics framework with code samples or architecture diagrams.',
        tools: ['AbuQitmirLabs Case Studies']
      }
    );
  }

  // --- Phase 6: Monitoring, AI Engine Optimization (GEO/AIO) & SXO (Ongoing) ---
  const phase6Tasks: ChecklistTask[] = [
    {
      id: 'm-geo',
      title: 'GEO & AIO: Optimize for AI Answer Engines (ChatGPT, Perplexity, Google SGE)',
      description: 'Ensure your brand is retrieved, cited, and recommended in AI-synthesized responses.',
      priority: 'high',
      estimatedTime: '2 hours/month',
      impact: 'Critical',
      howTo: 'Publish structured entity facts, clear definitions, comparison charts, and claim brand citations in authoritative community forums (Reddit, Quora, GitHub).',
      tools: ['Perplexity AI', 'ChatGPT Search', 'Google AI Overviews']
    },
    {
      id: 'm-sxo',
      title: 'Search Experience Optimization (SXO): Conversion Rate & User Journeys',
      description: 'Ensure organic traffic converts into paying customers through clear CTAs and sticky engagement.',
      priority: 'high',
      estimatedTime: '3 hours',
      impact: 'High',
      howTo: 'Install Hotjar/Clarity to identify where organic visitors drop off. Test prominent mobile contact buttons and simplified lead forms.',
      tools: ['Microsoft Clarity', 'Hotjar', 'Google Optimize alternatives']
    },
    {
      id: 'm-queries',
      title: 'Monthly Search Console Query & Striking Distance Keyword Audit',
      description: 'Find keywords ranking in positions 8-20 and optimize content to push them into the top 3.',
      priority: 'medium',
      estimatedTime: '2 hours/month',
      impact: 'High',
      howTo: 'Filter GSC for pages with high impressions but low CTR. Update headings, add targeted sub-sections, and refresh publication dates.',
      tools: ['Google Search Console', 'Ahrefs Rank Tracker']
    },
    {
      id: 'm-decay',
      title: 'Quarterly Content Refresh & Technical Link Rot Audit',
      description: 'Prevent ranking decay by updating outdated statistics, broken outbound links, and expired dates.',
      priority: 'medium',
      estimatedTime: '2-3 hours/quarter',
      impact: 'Medium',
      howTo: 'Run automated crawl to catch 404 broken links. Update "2025" mentions to "2026" and add new research citations.',
      tools: ['Screaming Frog', 'Broken Link Checker']
    }
  ];

  const phases: ChecklistPhase[] = [
    {
      id: 'phase-1',
      icon: '📋',
      title: 'Phase 1: Foundation & Technical Setup',
      description: 'Establish search engine tracking, indexing protocols, and site speed benchmarks.',
      timeframe: 'Weeks 1-2',
      tasks: phase1Tasks
    },
    {
      id: 'phase-2',
      icon: '⚡',
      title: 'Phase 2: On-Page Optimization & Core Web Vitals',
      description: 'Optimize metadata, keyword placement, semantic structure, and mobile UX.',
      timeframe: 'Weeks 3-4',
      tasks: phase2Tasks
    },
    {
      id: 'phase-3',
      icon: '📝',
      title: 'Phase 3: Content Architecture & E-E-A-T Signals',
      description: 'Build topic clusters, authoritative pillar content, and rich schema microdata.',
      timeframe: 'Weeks 5-8',
      tasks: phase3Tasks
    },
    {
      id: 'phase-4',
      icon: '🔗',
      title: 'Phase 4: Off-Page Authority & Digital PR',
      description: 'Acquire high-quality backlinks, directory trust signals, and editorial brand citations.',
      timeframe: 'Weeks 9-12',
      tasks: phase4Tasks
    },
    {
      id: 'phase-5',
      icon: isLocal ? '📍' : isEcommerce ? '🛒' : '🎯',
      title: isLocal ? 'Phase 5: Local SEO & Google Maps Mastery' : isEcommerce ? 'Phase 5: E-commerce Product & Merchant SEO' : 'Phase 5: High-Intent Conversion & Niche Optimization',
      description: isLocal
        ? 'Dominate local 3-pack rankings, review acceleration, and geo-targeted service corridors.'
        : isEcommerce
        ? 'Optimize product catalog feeds, merchant center listings, and aggregate review stars.'
        : 'Target bottom-of-funnel decision makers and technical comparison queries.',
      timeframe: 'Weeks 10-14',
      tasks: phase5Tasks
    },
    {
      id: 'phase-6',
      icon: '🤖',
      title: 'Phase 6: Monitoring, AI Engine Optimization (GEO/AIO) & SXO',
      description: 'Continuously track rankings, rank for AI answer engines, and maximize visitor conversion.',
      timeframe: 'Ongoing',
      tasks: phase6Tasks
    }
  ];

  const totalTasks = phases.reduce((acc, p) => acc + p.tasks.length, 0);
  const priorityTasks = phases.reduce(
    (acc, p) => acc + p.tasks.filter(t => t.priority === 'high').length,
    0
  );

  // Top 3 Priorities
  const topPriorities: TopPriorityItem[] = [
    {
      title: isLocal
        ? 'Google Business Profile & NAP Consistency'
        : 'Technical Architecture & Core Web Vitals (LCP < 2.5s)',
      reason: isLocal
        ? 'Local pack rankings generate over 44% of local service clicks; without GBP optimization, your business is invisible locally.'
        : 'Google uses Core Web Vitals as a direct mobile ranking signal; slow sites lose rank and convert 50% fewer visitors.'
    },
    {
      title: isEcommerce
        ? 'Product Schema Markup & Merchant Center Free Listings'
        : `Topical Cluster Content Strategy for ${ind.toUpperCase()}`,
      reason: isEcommerce
        ? 'Product schema enables instant golden review stars and rich price badges in organic SERPs, multiplying click-through rate.'
        : `Search engines favor deep, topical authority. Publishing isolated blog posts will not rank against established ${ind} incumbents.`
    },
    {
      title: isYMYL
        ? 'Demonstrable E-E-A-T Author Credentials & Verified Citations'
        : 'Conversion-Focused Search Experience Optimization (SXO)',
      reason: isYMYL
        ? `In ${ind}, Google applies heightened algorithmic scrutiny. Anonymous or generic AI copy is systematically de-indexed.`
        : 'Ranking without conversion generates vanity traffic; aligning pages with direct lead funnels turns visitors into actual revenue.'
    }
  ];

  // Expected Impact
  const expectedImpact = `Following this structured roadmap is estimated to yield a 45%–90% lift in qualified organic search traffic within 4 to 6 months. For ${bType} businesses in ${ind}, ranking on page 1 for transactional keywords typically cuts customer acquisition costs (CAC) by 60% compared to paid Google Ads.`;

  // Common Mistakes
  const commonMistakes: string[] = [
    `Targeting ultra-broad head terms (e.g. "${ind}") instead of high-intent long-tail keywords where buying decisions happen.`,
    'Relying on low-quality raw AI-generated content that lacks first-hand proof, proprietary case studies, or verifiable author bios.',
    'Ignoring mobile layout shifts and server response times (TTFB > 1200ms) that penalize mobile indexing.',
    'Publishing content without internal linking bridges back to high-converting service or product checkout pages.',
    isLocal
      ? 'Having mismatched business names, phone numbers, or addresses across online directories.'
      : 'Failing to implement self-referencing canonical tags, leading to duplicate content penalties.'
  ];

  // Quick Wins (Do Today)
  const quickWins: string[] = [
    'Claim and submit your XML sitemap to Google Search Console and Bing Webmaster Tools.',
    'Add compelling, benefit-driven meta descriptions to your top 10 most visited pages to immediately boost CTR.',
    'Compress your homepage hero banner into WebP/AVIF format with explicit aspect-ratio attributes to fix LCP.',
    isLocal
      ? 'Add your complete business hours, services, and 5 high-resolution photos to your Google Business Profile.'
      : 'Inject valid Organization & WebSite JSON-LD schema into your website header.'
  ];

  return {
    businessType: bType,
    industry: ind,
    stage: stg,
    goal: gl,
    teamSize: teamSize || 'small',
    time: time || 'moderate',
    totalTasks,
    estimatedWeeks: isPrelaunch ? 14 : 12,
    priorityTasks,
    phases,
    topPriorities,
    expectedImpact,
    commonMistakes,
    quickWins,
    generatedAt: new Date().toISOString(),
    source: 'algorithmic'
  };
}

/**
 * Pre-configured curated sample checklists for immediate 1-click preview
 */
export const SAMPLE_CHECKLISTS: Record<string, SeoChecklist> = {
  ecommerce: generateAlgorithmicChecklist('ecommerce', 'retail', 'growing', 'ecommerce', 'small', 'moderate'),
  localHealthcare: generateAlgorithmicChecklist('local', 'healthcare', 'new', 'local', 'small', 'moderate'),
  saasTech: generateAlgorithmicChecklist('saas', 'tech', 'growing', 'leads', 'medium', 'aggressive')
};

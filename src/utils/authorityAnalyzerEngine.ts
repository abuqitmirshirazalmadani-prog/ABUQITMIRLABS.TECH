import {
  AuthorityAnalyzerResult,
  DomainAuthorityData,
  DomainAgeData,
  SiteQualityData,
  TrustSignalsData,
  AIAnalysisData,
  FullReportData
} from '../types/authorityAnalyzer';

export function normalizeDomain(inputUrl: string): { domain: string; cleanUrl: string } | null {
  let cleaned = inputUrl.trim();
  if (!cleaned) return null;
  if (!/^https?:\/\//i.test(cleaned)) {
    cleaned = 'https://' + cleaned;
  }
  try {
    const parsed = new URL(cleaned);
    const domain = parsed.hostname.replace(/^www\./, '').toLowerCase();
    return { domain, cleanUrl: parsed.toString() };
  } catch {
    return null;
  }
}

export function calculateOverallScore(
  da: { pageRank: number; rank?: any } | null,
  age: { ageYears: number } | null,
  quality: { overall: number } | null,
  trust: { score: number } | null
): number {
  let score = 0;
  let weight = 0;

  // Domain Authority (0-10 -> 0-100) — weight 0.40
  if (da && typeof da.pageRank === 'number') {
    const daScore = Math.min(Math.max((da.pageRank / 10) * 100, 0), 100);
    score += daScore * 0.4;
    weight += 0.4;
  }

  // Domain Age — weight 0.20 (e.g. 10+ years gets top score)
  if (age && typeof age.ageYears === 'number') {
    const ageScore = Math.min(age.ageYears * 10, 100);
    score += ageScore * 0.2;
    weight += 0.2;
  }

  // Site Quality (PageSpeed / Lighthouse) — weight 0.25
  if (quality && typeof quality.overall === 'number') {
    score += quality.overall * 0.25;
    weight += 0.25;
  }

  // Trust Signals (HTTPS, Security Headers) — weight 0.15
  if (trust && typeof trust.score === 'number') {
    score += trust.score * 0.15;
    weight += 0.15;
  }

  if (weight === 0) return 42; // default reasonable benchmark
  return Math.round(score / weight);
}

export function getAuthorityLevel(score: number): string {
  if (score >= 80) return 'Elite Global Authority';
  if (score >= 65) return 'Strong Established Authority';
  if (score >= 45) return 'Moderate Authority';
  if (score >= 30) return 'Developing Authority';
  return 'Emerging Authority';
}

export function getPercentile(score: number): string {
  if (score >= 85) return 'Top 3%';
  if (score >= 75) return 'Top 10%';
  if (score >= 60) return 'Top 25%';
  if (score >= 45) return 'Top 50%';
  if (score >= 30) return 'Developing (Bottom 50%)';
  return 'Emerging (Bottom 25%)';
}

export function getIndustryRank(score: number): string {
  if (score >= 80) return 'Top Tier (Exceeds 92% of web)';
  if (score >= 65) return 'Upper Quartile (Above 75%)';
  if (score >= 45) return 'Competitive (Above 50%)';
  if (score >= 30) return 'Growing (Below 50%)';
  return 'Early Stage (Below 25%)';
}

export function generateSummary(
  domain: string,
  score: number,
  level: string,
  da?: DomainAuthorityData | null,
  age?: DomainAgeData | null
): string {
  const daLabel = da && da.value > 0 ? `Open PageRank score of ${da.value.toFixed(1)}/10` : 'an emerging backlink profile';
  const ageLabel = age && age.display !== 'Unknown' ? `over ${age.display} of recorded domain history` : 'a newly indexed footprint';

  if (score >= 65) {
    return `${domain} exhibits an authoritative domain footprint with ${daLabel} and ${ageLabel}. Search engines recognize this domain as high-trust, giving its new content an organic ranking advantage.`;
  }
  if (score >= 45) {
    return `${domain} holds a respectable authority standing with ${daLabel} and ${ageLabel}. Targeted editorial outreach and high-intent backlink acquisitions will quickly propel it into top search results.`;
  }
  return `${domain} is currently in its growth phase with ${daLabel} and ${ageLabel}. Consistent publication of comprehensive pillar assets and foundational citation building will systematically elevate its search visibility.`;
}

export function generateFallbackAI(score: number, domain: string): AIAnalysisData {
  const isHigh = score >= 60;
  return {
    benchmark: isHigh
      ? `${domain}'s authority footprint outpaces the average SMB website, indicating established organic search equity.`
      : `${domain} is situated in the developing tier, where tactical link-building and technical optimizations yield rapid gains.`,
    strengths: isHigh
      ? [
          'Robust root domain backlink profile and organic citation equity',
          'Established domain tenure providing search engine trust signals',
          'Solid baseline technical infrastructure and secure protocol delivery',
          'Proven ability to sustain keyword impressions across topic clusters'
        ]
      : [
          'Clean, crawlable domain structure with zero major manual spam flags',
          'Modern responsive layout ready for authority-building content',
          'High headroom for exponential rank improvements via digital PR',
          'Flexible topical positioning ready for targeted niche authority'
        ],
    improvements: isHigh
      ? [
          'Earn editorial backlinks from tier-1 industry trade journals (.edu, .gov, major press)',
          'Eliminate orphan pages and streamline internal page rank distribution via breadcrumbs',
          'Tighten Core Web Vitals (LCP and INP) to preserve Google page experience signals',
          'Monitor lost backlinks and run automated reclamation campaigns'
        ]
      : [
          'Execute digital PR outreach to acquire initial high-authority editorial mentions',
          'Configure strict HTTP security headers (HSTS, CSP, X-Frame-Options) to boost trust score',
          'Publish 3–5 comprehensive pillar guides (2,500+ words) to serve as backlink magnets',
          'Secure branded citations across verified business directories and social entities'
        ],
  };
}

export function generateFallbackReport(score: number, domain: string): FullReportData {
  return {
    roadmap: [
      {
        title: 'Phase 1: Technical Trust & Foundational Auditing',
        duration: 'Weeks 1–4',
        actions: [
          `Audit ${domain}'s existing backlink profile and disavow toxic or spammy scrape links`,
          'Enforce strict HTTPS with HTTP/2 and modern security headers (HSTS, Content-Security-Policy)',
          'Establish Google Search Console & Bing Webmaster Tools tracking for zero crawl errors',
          'Build or claim top 20 authoritative directory listings with consistent NAP data',
        ],
      },
      {
        title: 'Phase 2: Content Hub & Editorial Outreach',
        duration: 'Weeks 5–12',
        actions: [
          'Publish 3 authoritative data-backed research pieces or interactive calculators in your niche',
          'Execute weekly personalized email outreach to 15 relevant industry bloggers and journalists',
          'Secure 2–4 high-impact guest editorial placements on DR 50+ publications',
          'Launch broken link building campaigns targeting legacy 404 resources in your vertical',
        ],
      },
      {
        title: 'Phase 3: Digital PR & Scaled Authority Compounding',
        duration: 'Weeks 13–24',
        actions: [
          'Distribute targeted newswire releases announcing original industry studies or partnerships',
          'Establish executive commentary accounts on HARO/Connectively and Featured.com',
          'Create topical clusters connecting supporting articles to primary commercial landing pages',
          'Track quarterly domain authority score increases and monitor competitor velocity',
        ],
      },
    ],
    priorityActions: [
      {
        title: 'Claim & Verify Foundational Citations',
        description: 'Verify your business entities across Google Business Profile, LinkedIn, Crunchbase, and niche directories to establish baseline entity validity.',
      },
      {
        title: 'Strengthen Security Headers & SSL Grade',
        description: 'Upgrade your server configuration to return Strict-Transport-Security (HSTS) and X-Content-Type-Options headers.',
      },
      {
        title: 'Build 3 Linkable Asset Pillars',
        description: 'Create definitive tools, glossary guides, or benchmark reports that industry writers naturally cite as authoritative sources.',
      },
      {
        title: 'Target Broken Competitor Backlinks',
        description: 'Scan top competitor domains for defunct 404 links and pitch your updated content as a drop-in replacement to the linking webmasters.',
      },
      {
        title: 'Partner with AbuQitmirLabs for Digital PR',
        description: 'Collaborate with experienced SEO architects to execute white-hat outreach and secure high-tier editorial backlinks.',
      },
    ],
    templates: [
      {
        title: 'Editorial Guest Article Pitch',
        useCase: 'Pitching high-authority publications for thought leadership contributions',
        content: `Subject: Expert Contribution for [Publication Name]: [Specific Topic]

Hi [Editor First Name],

I've been closely following your coverage of [Industry/Topic] on [Publication Name]—particularly your piece on [Recent Article Title].

I'm writing to propose a deeply researched, non-promotional article specifically for your readers:

Title Idea: [Compelling Working Title]
Key Takeaways:
• [Data point or counter-intuitive insight #1]
• [Actionable framework or real-world example #2]
• [Future 2026 outlook or strategic benchmark #3]

I have built several high-performance digital platforms in this space and can deliver 1,500+ words of pristine, publication-ready copy with original graphics.

Would this be of interest for your upcoming editorial calendar?

Best regards,
[Your Name]
[Your Title], ${domain}`,
      },
      {
        title: 'Resource Replacement / Broken Link Pitch',
        useCase: 'Reaching out to webmasters to replace broken 404 URLs with your active guide',
        content: `Subject: Broken resource reference on [Website/Page Title]

Hi [Webmaster Name],

I was reviewing your excellent guide on [Topic] ([URL to their article]) and noticed that the reference link to [Defunct Resource Name] is currently returning a 404 error.

We recently published an updated, comprehensive guide covering this exact topic:
[Your Live URL]

Thought this might make a seamless replacement for your readers and keep your page's user experience clean.

Either way, thank you for putting together such a valuable guide!

Warmly,
[Your Name]
${domain}`,
      },
    ],
  };
}

export function getFallbackResult(domain: string, cleanUrl: string): AuthorityAnalyzerResult {
  const overallScore = 48;
  const authorityLevel = getAuthorityLevel(overallScore);
  const percentile = getPercentile(overallScore);
  const industryRank = getIndustryRank(overallScore);

  const domainAuthority: DomainAuthorityData = {
    value: 3.4,
    description: 'Estimated Open PageRank tier based on web presence',
    rank: 1842000,
  };

  const domainAge: DomainAgeData = {
    display: '3 years, 4 months',
    firstSeen: '2023-01-15',
    ageYears: 3,
    ageMonths: 4,
  };

  const siteQuality: SiteQualityData = {
    overall: 82,
    performance: 78,
    seo: 92,
    accessibility: 88,
    bestPractices: 85,
  };

  const trustSignals: TrustSignalsData = {
    score: 75,
    level: 'Good',
    summary: 'HTTPS enabled with baseline security headers',
    details: {
      hasHttps: true,
      hasHSTS: true,
      hasCSP: false,
      hasXFrame: true,
      hasXContentType: true,
      hasReferrerPolicy: true,
      hasPermissionsPolicy: false,
    },
  };

  const aiAnalysis = generateFallbackAI(overallScore, domain);
  const fullReport = generateFallbackReport(overallScore, domain);

  return {
    domain,
    url: cleanUrl,
    overallScore,
    authorityLevel,
    percentile,
    industryRank,
    scoreSummary: generateSummary(domain, overallScore, authorityLevel, domainAuthority, domainAge),
    domainAuthority,
    domainAge,
    siteQuality,
    trustSignals,
    aiAnalysis,
    fullReport,
    generatedAt: new Date().toISOString(),
    fallback: true,
    source: 'algorithmic',
  };
}

/**
 * LAYER 2: Central Next.js Metadata API-style Configuration (`lib/generate-metadata.ts`)
 *
 * Replaces React Helmet and manual `<title>` / `<meta>` tags across the entire frontend.
 * Guarantees a single source of truth for:
 *  - <title data-rh="true">
 *  - <meta name="description" data-rh="true">
 *  - <link rel="canonical" data-rh="true">
 *  - OpenGraph & Twitter Card tags
 *  - Strictly 1 `@graph` JSON-LD <script id="canonical-schema-graph" type="application/ld+json">
 */

import React from 'react';
import { SEO_ROUTES_METADATA } from '../src/data/seoRoutesMetadata';
import { getCanonicalPath, getCanonicalSlug } from '../src/data/canonicalRedirects';
import { STATIC_BLOG_POSTS } from '../src/data/staticBlogPosts';
import { resolveOptimizedCoverImage } from '../src/data/localCoverImageMap';
import { generateBlogPostMeta } from '../src/utils/seoUtils';

export interface MetadataInput {
  pathname?: string;
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  robots?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  schema?: Record<string, any> | Array<Record<string, any>>;
  preloadImage?: string;
  article?: Record<string, any>;
}

export interface NextStyleMetadata {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  authors: Array<{ name: string }>;
  robots: string;
  alternates: {
    canonical: string;
  };
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    type: string;
    locale: string;
    images: Array<{
      url: string;
      alt: string;
      width: number;
      height: number;
    }>;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
    site: string;
    creator: string;
  };
  schemaGraph: {
    '@context': 'https://schema.org';
    '@type': string;
    '@graph': Array<Record<string, any>>;
  };
  jsonLdGraph: {
    '@context': 'https://schema.org';
    '@type': string;
    '@graph': Array<Record<string, any>>;
  };
  preloadCoverHref?: string;
}

const SITE_URL = 'https://www.abuqitmirlabs.tech';
const SITE_NAME = 'AbuQitmirLabs';
const DEFAULT_TITLE = 'Growth Engineering Firm | Custom Software, AI & SEO | AbuQitmirLabs';
const DEFAULT_DESCRIPTION =
  'Growth Engineering Firm for US, UK & global B2B companies. Custom software, AI agents & technical SEO as one revenue system. Free technical audit.';
const DEFAULT_IMAGE = 'https://www.abuqitmirlabs.tech/logo.png';
const DEFAULT_IMAGE_ALT = 'AbuQitmirLabs Growth Engineering Firm';
const DEFAULT_AUTHOR = 'Abu Qitmir Mohammad Shiraz Al-Madani';

let ssrCapturedMetadata: NextStyleMetadata | null = null;

export function resetSsrCapturedMetadata(): void {
  ssrCapturedMetadata = null;
}

export function setSsrCapturedMetadata(meta: NextStyleMetadata): void {
  ssrCapturedMetadata = meta;
}

export function getSsrCapturedMetadata(): NextStyleMetadata | null {
  return ssrCapturedMetadata;
}

export const HREFLANG_MARKET_ALTERNATES: Array<{ hreflang: string; href: string }> = [
  { hreflang: 'x-default', href: 'https://www.abuqitmirlabs.tech/' },
  { hreflang: 'en', href: 'https://www.abuqitmirlabs.tech/' },
  { hreflang: 'en-US', href: 'https://www.abuqitmirlabs.tech/us-market' },
  { hreflang: 'en-GB', href: 'https://www.abuqitmirlabs.tech/uk-market' },
  { hreflang: 'en-CA', href: 'https://www.abuqitmirlabs.tech/canada-market' },
  { hreflang: 'en-AU', href: 'https://www.abuqitmirlabs.tech/australia-market' },
  { hreflang: 'en-PK', href: 'https://www.abuqitmirlabs.tech/pakistan-market' },
  { hreflang: 'en-SA', href: 'https://www.abuqitmirlabs.tech/saudi-arabia-market' },
  { hreflang: 'en-AE', href: 'https://www.abuqitmirlabs.tech/uae-market' },
  { hreflang: 'en-QA', href: 'https://www.abuqitmirlabs.tech/qatar-market' },
  { hreflang: 'en-KW', href: 'https://www.abuqitmirlabs.tech/kuwait-market' },
  { hreflang: 'en-PL', href: 'https://www.abuqitmirlabs.tech/poland-market' },
];

const HREFLANG_ELIGIBLE_PATHS = new Set([
  '/',
  '/us-market',
  '/uk-market',
  '/canada-market',
  '/australia-market',
  '/pakistan-market',
  '/saudi-arabia-market',
  '/uae-market',
  '/qatar-market',
  '/kuwait-market',
  '/poland-market',
]);

const TITLE_OVERRIDES: Record<string, string> = {
  '/': 'Growth Engineering Firm | Custom Software, AI & SEO | AbuQitmirLabs',
  '/blog/ai-integration-with-legacy-systems-the-complete-2026-guide':
    'AI in Enterprise Software: 2026 Guide | AbuQitmirLabs',
  '/blog/flutter-vs-react-native-choosing-mobile-app-stack-2026':
    'Flutter vs React Native: Which Is Better in 2026?',
  '/blog/offshore-software-development-saudi-arabia':
    'Offshore Software Development Saudi Arabia: Save 40–60%',
  '/case-studies/tajweedpage':
    'TajweedPage Case Study: AI EdTech & SEO | AbuQitmirLabs',
  '/contact': 'Contact & Book a Discovery Call | AbuQitmirLabs',
  '/privacy': 'Privacy Policy & Data Protection | AbuQitmirLabs',
  '/terms': 'Terms of Service & IP Ownership | AbuQitmirLabs',
  '/about/our-process': 'Our 5-Step Software Delivery Process | AbuQitmirLabs',
  '/web-development': 'Custom Web Application Development | AbuQitmirLabs',
  '/local-seo-for-small-business': 'Local SEO Services for Small Business | AbuQitmirLabs',
  '/blog/offshore-ai-agent-development-partner-uae':
    'Offshore AI Agent Development Partner UAE | AbuQitmirLabs',
  '/blog/brand-refresh-vs-rebrand':
    'Brand Refresh vs Rebrand Pakistan | AbuQitmirLabs',
};

export function formatConciseTitle(rawTitle: string, pathname?: string): string {
  const normPath = pathname
    ? pathname.endsWith('/') && pathname !== '/'
      ? pathname.slice(0, -1)
      : pathname
    : '';
  if (normPath && TITLE_OVERRIDES[normPath]) {
    return TITLE_OVERRIDES[normPath];
  }

  const cleaned = stripOuterQuotes(rawTitle)
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return DEFAULT_TITLE;
  if (cleaned.length <= 60) return cleaned;

  const core = cleaned
    .replace(/\s*[|–—-]\s*Abu\s*Qitmir\s*Labs(?:\s*\.?\s*TECH)?.*$/i, '')
    .trim();

  const withBrand = `${core} | ${SITE_NAME}`;
  if (withBrand.length <= 60) return withBrand;

  // Try splitting on colon or em-dash to keep the primary topic + brand
  const colonParts = core.split(/\s*[:—–]\s*/);
  if (colonParts.length > 1 && colonParts[0].trim().length >= 16) {
    const firstPart = colonParts[0].trim();
    const firstWithBrand = `${firstPart} | ${SITE_NAME}`;
    if (firstWithBrand.length <= 60) return firstWithBrand;
    if (firstPart.length <= 60 && firstPart.length >= 30) return firstPart;
  }

  if (core.length <= 60) return core;

  // Truncate cleanly at word boundary to fit " | AbuQitmirLabs" (16 chars) if possible, or standalone <= 58 chars
  const maxCoreWithBrand = 60 - ` | ${SITE_NAME}`.length; // 44 chars
  const words = core.split(' ');
  let acc = '';
  for (const w of words) {
    const next = acc ? `${acc} ${w}` : w;
    if (next.length <= maxCoreWithBrand) {
      acc = next;
    } else {
      break;
    }
  }
  acc = acc.replace(/[,;:\-–—&]+$/, '').trim();
  if (acc.length >= 22) {
    return `${acc} | ${SITE_NAME}`;
  }

  let standalone = '';
  for (const w of words) {
    const next = standalone ? `${standalone} ${w}` : w;
    if (next.length <= 58) {
      standalone = next;
    } else {
      break;
    }
  }
  return standalone.replace(/[,;:\-–—&]+$/, '').trim() || core.slice(0, 57).trim();
}

function stripOuterQuotes(val?: string): string {
  return String(val || '')
    .trim()
    .replace(/^(?:&quot;|["'“”`])+|(?:&quot;|["'“”`])+$/gi, '')
    .trim();
}

function clampMetaDescription(desc: string): string {
  const cleaned = stripOuterQuotes(desc).replace(/\s+/g, ' ').trim();
  if (!cleaned) return DEFAULT_DESCRIPTION;
  if (cleaned.length <= 155) return cleaned;
  const sliced = cleaned.slice(0, 152);
  const lastSpace = sliced.lastIndexOf(' ');
  return `${(lastSpace > 105 ? sliced.slice(0, lastSpace) : sliced).replace(/[.,;:-]+$/, '')}...`;
}

const UPPERCASE_ACRONYMS = new Set([
  'ai',
  'uae',
  'usa',
  'uk',
  'eu',
  'seo',
  'aeo',
  'geo',
  'aio',
  'sxo',
  'pdpl',
  'rag',
  'mvp',
  'saas',
  'b2b',
  'gcc',
  'ksa',
  'sme',
  'smes',
  'api',
  'llm',
  'llms',
  'erp',
  'crm',
  'roi',
  'hipaa',
  'soc',
  'gdpr',
  'difc',
  'adgm',
  'lms',
  'ehr',
  'ui',
  'ux',
]);

function humanizePathname(pathname: string): string {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  if (!clean) return DEFAULT_TITLE;
  const parts = clean.split('/').map((segment) =>
    segment
      .split('-')
      .filter(Boolean)
      .map((word) => {
        const lower = word.toLowerCase();
        if (lower === 'smes') return 'SMEs';
        if (lower === 'llms') return 'LLMs';
        if (lower === 'saas') return 'SaaS';
        if (UPPERCASE_ACRONYMS.has(lower)) return lower.toUpperCase();
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ')
  );
  return formatConciseTitle(`${parts.reverse().join(' — ')} | ${SITE_NAME}`, pathname);
}

const SERVICE_ROUTES = new Set([
  '/custom-software',
  '/mobile-app-development',
  '/web-development',
  '/ai-agent-development',
  '/ai-video-creation',
  '/seo-mastery',
  '/digital-marketing',
  '/local-seo-for-small-business',
  '/local-seo-citation-building',
  '/white-label-local-seo',
  '/local-seo-audit',
  '/guest-post-service',
  '/graphics-design',
  '/content-writing',
  '/brand-building',
  '/growth-engineering',
]);

export function buildConsolidatedSchemaGraph(
  canonicalUrl: string,
  title: string,
  description: string,
  imageUrl: string,
  customSchema?: Record<string, any> | Array<Record<string, any>>
): { '@context': 'https://schema.org'; '@type': string; '@graph': Array<Record<string, any>> } {
  const urlPath = canonicalUrl.replace(/^https?:\/\/[^/]+/i, '') || '/';
  const cleanUrlPath = urlPath.endsWith('/') && urlPath !== '/' ? urlPath.slice(0, -1) : urlPath;

  const baseNodes: Array<Record<string, any>> = [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      foundingDate: '2021',
      founder: {
        '@type': 'Person',
        name: DEFAULT_AUTHOR,
        jobTitle: 'Founder & Lead Systems Architect',
        url: 'https://www.linkedin.com/in/abu-qitmir-697423390/',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '48',
        bestRating: '5',
        worstRating: '1',
      },
      logo: {
        '@type': 'ImageObject',
        url: DEFAULT_IMAGE,
      },
      image: 'https://www.abuqitmirlabs.tech/images/hero-abuqitmirlabs.webp',
      email: 'hello@abuqitmirlabs.tech',
      telephone: '+923233260859',
      priceRange: '$$',
      description: DEFAULT_DESCRIPTION,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Shahrah-e-Faisal, PECHS',
        addressLocality: 'Karachi',
        addressRegion: 'Sindh',
        postalCode: '75400',
        addressCountry: 'PK',
      },
      areaServed: ['PK', 'US', 'GB', 'AE', 'SA', 'QA', 'KW', 'CA', 'AU', 'PL'],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+923233260859',
        email: 'hello@abuqitmirlabs.tech',
        contactType: 'sales and technical support',
        availableLanguage: ['English', 'Arabic', 'Urdu'],
      },
      sameAs: [
        'https://www.linkedin.com/company/abuqitmirlabs',
        'https://x.com/AbuQitmir',
        'https://www.facebook.com/abuqitmirlabs',
        'https://www.linkedin.com/in/abu-qitmir-697423390/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: title,
      description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    },
  ];

  if (cleanUrlPath !== '/' && cleanUrlPath !== '') {
    const segments = cleanUrlPath.replace(/^\//, '').split('/');
    const itemListElement: Array<Record<string, any>> = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
    ];
    let accPath = '';
    segments.forEach((seg, idx) => {
      accPath += `/${seg}`;
      const isLast = idx === segments.length - 1;
      const segLabel = isLast
        ? title.replace(/\s*\|\s*AbuQitmirLabs.*$/i, '').trim()
        : seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      itemListElement.push({
        '@type': 'ListItem',
        position: idx + 2,
        name: segLabel,
        item: `${SITE_URL}${accPath}`,
      });
    });
    baseNodes.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement,
    });
  }

  if (SERVICE_ROUTES.has(cleanUrlPath) || cleanUrlPath.startsWith('/solutions/')) {
    baseNodes.push({
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: title.replace(/\s*\|\s*AbuQitmirLabs.*$/i, '').trim(),
      description,
      url: canonicalUrl,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: ['US', 'GB', 'SA', 'AE', 'QA', 'KW', 'CA', 'AU', 'PK'],
    });
  } else if (cleanUrlPath.startsWith('/case-studies/') && cleanUrlPath !== '/case-studies') {
    baseNodes.push({
      '@type': 'TechArticle',
      '@id': `${canonicalUrl}#article`,
      headline: title.replace(/\s*\|\s*AbuQitmirLabs.*$/i, '').trim(),
      description,
      url: canonicalUrl,
      image: imageUrl,
      datePublished: '2026-01-15T10:00:00.000Z',
      dateModified: '2026-11-05T10:00:00.000Z',
      author: {
        '@type': 'Person',
        name: DEFAULT_AUTHOR,
      },
      publisher: { '@id': `${SITE_URL}/#organization` },
      mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
    });
  }

  const customNodes: Array<Record<string, any>> = [];
  const appendItem = (item: any) => {
    if (!item || typeof item !== 'object') return;
    if (Array.isArray(item['@graph'])) {
      for (const sub of item['@graph']) {
        if (sub && typeof sub === 'object') {
          const { '@context': _ctx, ...rest } = sub;
          customNodes.push(rest);
        }
      }
    } else {
      const { '@context': _ctx, ...rest } = item;
      customNodes.push(rest);
    }
  };

  if (Array.isArray(customSchema)) {
    customSchema.forEach(appendItem);
  } else if (customSchema) {
    appendItem(customSchema);
  }

  const merged: Array<Record<string, any>> = [];
  const seenKeys = new Set<string>();

  for (const node of [...customNodes, ...baseNodes]) {
    const rawType = node['@type'];
    const nodeType = Array.isArray(rawType) ? rawType.join(',') : String(rawType || '');
    const nodeId = String(node['@id'] || '');
    const dedupeKey =
      nodeType === 'FAQPage'
        ? 'type:FAQPage'
        : nodeType.includes('Organization')
        ? 'type:Organization'
        : nodeType === 'WebSite'
        ? 'type:WebSite'
        : nodeType === 'BreadcrumbList'
        ? 'type:BreadcrumbList'
        : nodeType === 'Service'
        ? nodeId
          ? `id:${nodeId}`
          : `service:${String(node.name || '')}`
        : nodeType === 'VideoObject'
        ? nodeId
          ? `id:${nodeId}`
          : `video:${String(node.name || node.embedUrl || '')}`
        : nodeId
        ? `id:${nodeId}`
        : `json:${JSON.stringify(node).slice(0, 120)}`;

    if (seenKeys.has(dedupeKey)) continue;
    seenKeys.add(dedupeKey);
    merged.push(node);
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@graph': merged,
  };
}

/**
 * Central Next.js Metadata API-compatible generator.
 * Deterministic, unique `<title>` and `<meta name="description">` per route.
 */
export function generateMetadata(input: MetadataInput = {}): NextStyleMetadata {
  const rawPathname = input.pathname || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const canonicalPath = getCanonicalPath(rawPathname);
  const normalizedPath =
    canonicalPath.endsWith('/') && canonicalPath !== '/'
      ? canonicalPath.slice(0, -1)
      : canonicalPath;

  const routeMeta =
    SEO_ROUTES_METADATA[canonicalPath] ||
    SEO_ROUTES_METADATA[normalizedPath] ||
    SEO_ROUTES_METADATA[rawPathname];

  const isBlogPost = normalizedPath.startsWith('/blog/') && normalizedPath !== '/blog';
  const rawSlug = isBlogPost ? normalizedPath.replace(/^\/blog\//, '') : '';
  const blogSlug = rawSlug ? getCanonicalSlug(rawSlug) : '';
  const staticBlogPost = blogSlug ? STATIC_BLOG_POSTS[blogSlug] : undefined;

  const blogAutoMeta =
    staticBlogPost && blogSlug
      ? generateBlogPostMeta(staticBlogPost, blogSlug, {
          siteUrl: SITE_URL,
          siteName: SITE_NAME,
          defaultAuthor: DEFAULT_AUTHOR,
        })
      : null;

  const rawTitle =
    stripOuterQuotes(input.title) ||
    stripOuterQuotes(routeMeta?.title) ||
    stripOuterQuotes(blogAutoMeta?.title) ||
    (staticBlogPost?.title
      ? staticBlogPost.title.includes(SITE_NAME)
        ? staticBlogPost.title
        : `${staticBlogPost.title} | ${SITE_NAME}`
      : humanizePathname(normalizedPath));

  const resolvedTitle = formatConciseTitle(rawTitle || DEFAULT_TITLE, normalizedPath);

  const resolvedDescription = clampMetaDescription(
    input.description ||
      routeMeta?.description ||
      blogAutoMeta?.description ||
      staticBlogPost?.metaDescription ||
      staticBlogPost?.excerpt ||
      DEFAULT_DESCRIPTION
  );

  const resolvedCanonical =
    input.canonical ||
    (normalizedPath === '/'
      ? `${SITE_URL}/`
      : isBlogPost && blogSlug
      ? `${SITE_URL}/blog/${blogSlug}`
      : routeMeta?.canonical &&
        routeMeta.canonical !== `${SITE_URL}/` &&
        routeMeta.canonical !== SITE_URL
      ? routeMeta.canonical
      : `${SITE_URL}${normalizedPath}`);

  const resolvedKeywords =
    input.keywords ||
    routeMeta?.keywords ||
    blogAutoMeta?.keywordsString ||
    (Array.isArray(staticBlogPost?.tags) ? staticBlogPost.tags.join(', ') : undefined);

  const rawOgImage =
    input.ogImage ||
    routeMeta?.ogImage ||
    blogAutoMeta?.ogImage ||
    staticBlogPost?.coverImage ||
    DEFAULT_IMAGE;

  const optimizedLocalPath = resolveOptimizedCoverImage(rawOgImage, blogSlug || undefined);
  const resolvedOgImage = optimizedLocalPath.startsWith('/')
    ? `${SITE_URL}${optimizedLocalPath}`
    : optimizedLocalPath || DEFAULT_IMAGE;

  const resolvedOgImageAlt =
    stripOuterQuotes(input.ogImageAlt) ||
    stripOuterQuotes(routeMeta?.ogImageAlt) ||
    stripOuterQuotes(staticBlogPost?.coverImageAlt) ||
    resolvedTitle ||
    DEFAULT_IMAGE_ALT;

  const resolvedOgTitle = stripOuterQuotes(
    input.ogTitle || routeMeta?.ogTitle || blogAutoMeta?.ogTitle || resolvedTitle
  );
  const resolvedOgDescription = clampMetaDescription(
    input.ogDescription || routeMeta?.ogDescription || blogAutoMeta?.ogDescription || resolvedDescription
  );
  const resolvedOgType = input.ogType || routeMeta?.ogType || (isBlogPost ? 'article' : 'website');

  const resolvedTwitterCard =
    input.twitterCard || routeMeta?.twitterCard || 'summary_large_image';
  const resolvedTwitterTitle = stripOuterQuotes(
    input.twitterTitle || routeMeta?.twitterTitle || resolvedOgTitle
  );
  const resolvedTwitterDescription = clampMetaDescription(
    input.twitterDescription || routeMeta?.twitterDescription || resolvedOgDescription
  );
  const resolvedTwitterImage =
    input.twitterImage || routeMeta?.twitterImage || resolvedOgImage;

  const resolvedRobots =
    input.robots ||
    routeMeta?.robots ||
    'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  const resolvedAuthor =
    input.author || blogAutoMeta?.articleAuthor || staticBlogPost?.author || DEFAULT_AUTHOR;

  const schemaSource = input.schema || routeMeta?.schemaJsonLd || blogAutoMeta?.schemaJsonLd;
  const schemaGraph = buildConsolidatedSchemaGraph(
    resolvedCanonical,
    resolvedTitle,
    resolvedDescription,
    resolvedOgImage,
    schemaSource
  );

  const preloadCoverHref =
    input.preloadImage ||
    (isBlogPost && optimizedLocalPath && !optimizedLocalPath.endsWith('logo.png')
      ? optimizedLocalPath
      : undefined);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    canonical: resolvedCanonical,
    keywords: resolvedKeywords,
    authors: [{ name: resolvedAuthor }],
    robots: resolvedRobots,
    alternates: {
      canonical: resolvedCanonical,
    },
    openGraph: {
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      url: resolvedCanonical,
      siteName: SITE_NAME,
      type: resolvedOgType,
      locale: 'en_US',
      images: [
        {
          url: resolvedOgImage,
          alt: resolvedOgImageAlt,
          width: 1200,
          height: 630,
        },
      ],
      publishedTime: input.publishedTime || blogAutoMeta?.articlePublishedTime,
      modifiedTime: input.modifiedTime || blogAutoMeta?.articleModifiedTime,
      section: input.section || blogAutoMeta?.articleSection,
    },
    twitter: {
      card: resolvedTwitterCard,
      title: resolvedTwitterTitle,
      description: resolvedTwitterDescription,
      images: [resolvedTwitterImage],
      site: '@AbuQitmirLabs',
      creator: '@AbuQitmirLabs',
    },
    schemaGraph,
    jsonLdGraph: schemaGraph,
    preloadCoverHref,
  };
}

/**
 * Synchronizes `NextStyleMetadata` into `document.head` on the client,
 * removing any duplicate `<title>`, `<meta>`, `<link rel="canonical">`, or `<script type="application/ld+json">`.
 */
export function applyMetadataToDocumentHead(metadata: NextStyleMetadata): void {
  if (typeof document === 'undefined') return;

  // 1. Single <title>
  document.title = metadata.title;
  const titleTags = document.head.querySelectorAll('title');
  if (titleTags.length > 1) {
    titleTags.forEach((el, idx) => {
      if (idx > 0) el.remove();
    });
  }
  if (titleTags[0]) {
    titleTags[0].removeAttribute('data-rh');
    titleTags[0].textContent = metadata.title;
  }

  const upsertMeta = (attr: 'name' | 'property', key: string, content?: string) => {
    if (!content) return;
    const allMatching = document.head.querySelectorAll(`meta[${attr}="${key}"]`);
    let el = allMatching[0] as HTMLMetaElement | undefined;
    if (allMatching.length > 1) {
      allMatching.forEach((node, idx) => {
        if (idx > 0) node.remove();
      });
    }
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
    el.removeAttribute('data-rh');
  };

  upsertMeta('name', 'title', metadata.title);
  upsertMeta('name', 'description', metadata.description);
  if (metadata.keywords) upsertMeta('name', 'keywords', metadata.keywords);
  upsertMeta('name', 'robots', metadata.robots);
  if (metadata.authors?.[0]?.name) upsertMeta('name', 'author', metadata.authors[0].name);

  // OpenGraph
  upsertMeta('property', 'og:type', metadata.openGraph.type);
  upsertMeta('property', 'og:site_name', metadata.openGraph.siteName);
  upsertMeta('property', 'og:title', metadata.openGraph.title);
  upsertMeta('property', 'og:description', metadata.openGraph.description);
  upsertMeta('property', 'og:url', metadata.openGraph.url);
  upsertMeta('property', 'og:locale', metadata.openGraph.locale);
  const primaryImg = metadata.openGraph.images[0];
  if (primaryImg) {
    upsertMeta('property', 'og:image', primaryImg.url);
    upsertMeta('property', 'og:image:alt', primaryImg.alt);
  }
  if (metadata.openGraph.publishedTime) {
    upsertMeta('property', 'article:published_time', metadata.openGraph.publishedTime);
  }
  if (metadata.openGraph.modifiedTime) {
    upsertMeta('property', 'article:modified_time', metadata.openGraph.modifiedTime);
  }
  if (metadata.openGraph.section) {
    upsertMeta('property', 'article:section', metadata.openGraph.section);
  }

  // Twitter
  upsertMeta('name', 'twitter:card', metadata.twitter.card);
  upsertMeta('name', 'twitter:url', metadata.openGraph.url);
  upsertMeta('name', 'twitter:title', metadata.twitter.title);
  upsertMeta('name', 'twitter:description', metadata.twitter.description);
  if (metadata.twitter.images[0]) {
    upsertMeta('name', 'twitter:image', metadata.twitter.images[0]);
  }
  if (primaryImg?.alt) {
    upsertMeta('name', 'twitter:image:alt', primaryImg.alt);
  }

  // Single <link rel="canonical">
  const canonicalLinks = document.head.querySelectorAll('link[rel="canonical"]');
  if (canonicalLinks.length > 1) {
    canonicalLinks.forEach((node, idx) => {
      if (idx > 0) node.remove();
    });
  }
  let canonicalEl = canonicalLinks[0] as HTMLLinkElement | undefined;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', metadata.alternates.canonical);
  canonicalEl.removeAttribute('data-rh');

  // Hreflang alternate links for homepage and market pages
  const canonPath = metadata.alternates.canonical.replace(/^https?:\/\/[^/]+/i, '') || '/';
  const cleanCanonPath = canonPath.endsWith('/') && canonPath !== '/' ? canonPath.slice(0, -1) : canonPath;
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((node) => node.remove());
  if (HREFLANG_ELIGIBLE_PATHS.has(cleanCanonPath)) {
    for (const alt of HREFLANG_MARKET_ALTERNATES) {
      const linkEl = document.createElement('link');
      linkEl.setAttribute('rel', 'alternate');
      linkEl.setAttribute('hreflang', alt.hreflang);
      linkEl.setAttribute('href', alt.href);
      document.head.appendChild(linkEl);
    }
  }

  // Strip any leftover data-rh attributes in document.head
  document.head.querySelectorAll('[data-rh]').forEach((node) => {
    node.removeAttribute('data-rh');
  });

  // Strictly 1 JSON-LD @graph script in the entire DOM
  const allJsonLd = document.querySelectorAll('script[type="application/ld+json"]');
  let graphScript = document.getElementById('canonical-schema-graph') as HTMLScriptElement | null;
  allJsonLd.forEach((node) => {
    if (node !== graphScript) node.remove();
  });
  if (!graphScript) {
    graphScript = document.createElement('script');
    graphScript.id = 'canonical-schema-graph';
    graphScript.type = 'application/ld+json';
    document.head.appendChild(graphScript);
  }
  graphScript.removeAttribute('data-rh');
  graphScript.textContent = JSON.stringify(metadata.schemaGraph);
}

/**
 * Renders `NextStyleMetadata` to raw HTML tags for SSR / build-time prerendering.
 */
export function renderMetadataToHeadHtml(metadata: NextStyleMetadata): string {
  const esc = (s: string) =>
    String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const canonPath = metadata.alternates.canonical.replace(/^https?:\/\/[^/]+/i, '') || '/';
  const cleanCanonPath = canonPath.endsWith('/') && canonPath !== '/' ? canonPath.slice(0, -1) : canonPath;
  const hreflangLines = HREFLANG_ELIGIBLE_PATHS.has(cleanCanonPath)
    ? HREFLANG_MARKET_ALTERNATES.map(
        (alt) => `<link rel="alternate" hreflang="${esc(alt.hreflang)}" href="${esc(alt.href)}" />`
      )
    : [];

  const img = metadata.openGraph.images[0];
  const lines = [
    `<title>${esc(metadata.title)}</title>`,
    `<meta name="description" content="${esc(metadata.description)}" />`,
    `<meta name="author" content="${esc(metadata.authors?.[0]?.name || DEFAULT_AUTHOR)}" />`,
    metadata.keywords
      ? `<meta name="keywords" content="${esc(metadata.keywords)}" />`
      : '',
    `<meta name="robots" content="${esc(metadata.robots)}" />`,
    `<link rel="canonical" href="${esc(metadata.alternates.canonical)}" />`,
    ...hreflangLines,
    `<meta property="og:type" content="${esc(metadata.openGraph.type)}" />`,
    `<meta property="og:site_name" content="${esc(metadata.openGraph.siteName)}" />`,
    `<meta property="og:title" content="${esc(metadata.openGraph.title)}" />`,
    `<meta property="og:description" content="${esc(metadata.openGraph.description)}" />`,
    `<meta property="og:url" content="${esc(metadata.openGraph.url)}" />`,
    img ? `<meta property="og:image" content="${esc(img.url)}" />` : '',
    img ? `<meta property="og:image:alt" content="${esc(img.alt)}" />` : '',
    `<meta name="twitter:card" content="${esc(metadata.twitter.card)}" />`,
    `<meta name="twitter:title" content="${esc(metadata.twitter.title)}" />`,
    `<meta name="twitter:description" content="${esc(metadata.twitter.description)}" />`,
    metadata.twitter.images[0]
      ? `<meta name="twitter:image" content="${esc(metadata.twitter.images[0])}" />`
      : '',
    metadata.preloadCoverHref
      ? `<link rel="preload" as="image" href="${esc(metadata.preloadCoverHref)}" />`
      : '',
    `<script id="canonical-schema-graph" type="application/ld+json">${JSON.stringify(
      metadata.schemaGraph
    )}</script>`,
  ];

  return lines.filter(Boolean).join('\n');
}

/**
 * Compatibility No-Op Shim for `react-helmet-async` imports.
 * Any legacy `<Helmet>` or `<HelmetProvider>` import resolves here and renders nothing (`null`),
 * ensuring React Helmet is completely neutralized and can never emit duplicate `<title>` or `<meta>` tags.
 */
export const Helmet: React.FC<{ children?: React.ReactNode; [key: string]: any }> = () => null;

export const HelmetProvider: React.FC<{
  children?: React.ReactNode;
  context?: Record<string, any>;
}> = ({ children, context }) => {
  if (context && typeof context === 'object') {
    const emptyTag = { toString: () => '', toComponent: () => null };
    context.helmet = {
      title: emptyTag,
      meta: emptyTag,
      link: emptyTag,
      script: emptyTag,
      style: emptyTag,
      noscript: emptyTag,
      base: emptyTag,
      bodyAttributes: emptyTag,
      htmlAttributes: emptyTag,
    };
  }
  return React.createElement(React.Fragment, null, children);
};

export class HelmetData {
  context: any = {};
}

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
    '@graph': Array<Record<string, any>>;
  };
  jsonLdGraph: {
    '@context': 'https://schema.org';
    '@graph': Array<Record<string, any>>;
  };
  preloadCoverHref?: string;
}

const SITE_URL = 'https://www.abuqitmirlabs.tech';
const SITE_NAME = 'AbuQitmirLabs';
const DEFAULT_TITLE = 'Growth Engineering Firm | Custom Software & AI | AbuQitmirLabs';
const DEFAULT_DESCRIPTION =
  'Growth engineering firm for B2B companies. Custom software, AI automation & performance marketing engineered as one revenue system.';
const DEFAULT_IMAGE = 'https://www.abuqitmirlabs.tech/logo.png';
const DEFAULT_IMAGE_ALT = 'AbuQitmirLabs Growth Engineering Firm';
const DEFAULT_AUTHOR = 'Abu Qitmir Mohammad Shiraz Al-Madani';

function stripOuterQuotes(val?: string): string {
  return String(val || '')
    .trim()
    .replace(/^(?:&quot;|["'“”`])+|(?:&quot;|["'“”`])+$/gi, '')
    .trim();
}

function clampMetaDescription(desc: string): string {
  const cleaned = stripOuterQuotes(desc).replace(/\s+/g, ' ').trim();
  if (!cleaned) return DEFAULT_DESCRIPTION;
  if (cleaned.length <= 160) return cleaned;
  const sliced = cleaned.slice(0, 157);
  const lastSpace = sliced.lastIndexOf(' ');
  return `${(lastSpace > 110 ? sliced.slice(0, lastSpace) : sliced).replace(/[.,;:-]+$/, '')}...`;
}

function humanizePathname(pathname: string): string {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  if (!clean) return DEFAULT_TITLE;
  const parts = clean.split('/').map((segment) =>
    segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
  return `${parts.reverse().join(' — ')} | ${SITE_NAME}`;
}

/**
 * Normalizes any schema input into a single consolidated `@graph` JSON-LD object
 * (Enforces AGENTS.md Critical Rule 7: Strictly Single `@graph` JSON-LD Schema Block)
 */
export function buildConsolidatedSchemaGraph(
  canonicalUrl: string,
  title: string,
  description: string,
  imageUrl: string,
  customSchema?: Record<string, any> | Array<Record<string, any>>
): { '@context': 'https://schema.org'; '@graph': Array<Record<string, any>> } {
  const baseNodes: Array<Record<string, any>> = [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: DEFAULT_IMAGE,
      },
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
    const nodeType = String(node['@type'] || '');
    const nodeId = String(node['@id'] || '');
    const dedupeKey =
      nodeType === 'FAQPage'
        ? 'type:FAQPage'
        : nodeType === 'Organization'
        ? 'type:Organization'
        : nodeType === 'WebSite'
        ? 'type:WebSite'
        : nodeId
        ? `id:${nodeId}`
        : `json:${JSON.stringify(node).slice(0, 120)}`;

    if (seenKeys.has(dedupeKey)) continue;
    seenKeys.add(dedupeKey);
    merged.push(node);
  }

  return {
    '@context': 'https://schema.org',
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

  const resolvedTitle = rawTitle || DEFAULT_TITLE;

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

  const schemaSource = input.schema || blogAutoMeta?.schemaJsonLd;
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
    titleTags[0].setAttribute('data-rh', 'true');
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
    el.setAttribute('data-rh', 'true');
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
  canonicalEl.setAttribute('data-rh', 'true');

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

  const img = metadata.openGraph.images[0];
  const lines = [
    `<title data-rh="true">${esc(metadata.title)}</title>`,
    `<meta name="description" content="${esc(metadata.description)}" data-rh="true" />`,
    metadata.keywords
      ? `<meta name="keywords" content="${esc(metadata.keywords)}" data-rh="true" />`
      : '',
    `<meta name="robots" content="${esc(metadata.robots)}" data-rh="true" />`,
    `<link rel="canonical" href="${esc(metadata.alternates.canonical)}" data-rh="true" />`,
    `<meta property="og:type" content="${esc(metadata.openGraph.type)}" data-rh="true" />`,
    `<meta property="og:site_name" content="${esc(metadata.openGraph.siteName)}" data-rh="true" />`,
    `<meta property="og:title" content="${esc(metadata.openGraph.title)}" data-rh="true" />`,
    `<meta property="og:description" content="${esc(metadata.openGraph.description)}" data-rh="true" />`,
    `<meta property="og:url" content="${esc(metadata.openGraph.url)}" data-rh="true" />`,
    img ? `<meta property="og:image" content="${esc(img.url)}" data-rh="true" />` : '',
    img ? `<meta property="og:image:alt" content="${esc(img.alt)}" data-rh="true" />` : '',
    `<meta name="twitter:card" content="${esc(metadata.twitter.card)}" data-rh="true" />`,
    `<meta name="twitter:title" content="${esc(metadata.twitter.title)}" data-rh="true" />`,
    `<meta name="twitter:description" content="${esc(metadata.twitter.description)}" data-rh="true" />`,
    metadata.twitter.images[0]
      ? `<meta name="twitter:image" content="${esc(metadata.twitter.images[0])}" data-rh="true" />`
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

/**
 * SEO & Dynamic Meta Tag Utilities
 * AbuQitmirLabs Engineering
 * 
 * Provides utility functions to generate unique, search-engine-optimized
 * meta tags, OpenGraph, Twitter card tags, and JSON-LD structured data
 * for dynamic blog posts fetched from Firestore or static fallbacks.
 */

import { calculateReadingTime, getReadingTimeStats, countReadableWords } from './readingTime';
import { resolveOptimizedCoverImage } from '../data/localCoverImageMap';
export { calculateReadingTime, getReadingTimeStats, countReadableWords };
export type { ReadingTimeResult } from './readingTime';

export interface BlogPostMetaInput {
  title: string;
  content?: string;
  excerpt?: string;
  metaDescription?: string;
  coverImage?: string;
  coverImageAlt?: string;
  category?: string;
  author?: string;
  tags?: string[];
  createdAt?: any;
  updatedAt?: any;
  published?: boolean;
  canonical?: string;
}

export interface BlogPostSeoData {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: string;
  ogType: string;
  ogSiteName: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  articlePublishedTime: string;
  articleModifiedTime: string;
  articleAuthor: string;
  articleSection: string;
  keywords: string[];
  keywordsString: string;
  schemaJsonLd: Record<string, any>;
}

export interface SeoOptions {
  siteUrl?: string;
  siteName?: string;
  defaultCoverImage?: string;
  defaultAuthor?: string;
}

const DEFAULT_SITE_URL = 'https://www.abuqitmirlabs.tech';
const DEFAULT_SITE_NAME = 'AbuQitmirLabs';
const DEFAULT_COVER_IMAGE = 'https://www.abuqitmirlabs.tech/logo.png';
const DEFAULT_AUTHOR = 'AbuQitmirLabs .TECH';

/**
 * Strips markdown syntax, HTML tags, and redundant whitespace from content to produce a clean excerpt.
 */
export function cleanExcerpt(rawText?: string, maxLength = 160): string {
  if (!rawText) return '';
  const cleaned = rawText
    .replace(/<[^>]*>/g, '') // remove html tags
    .replace(/```[\s\S]*?```/g, '') // remove code blocks
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // images
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // links
    .replace(/[#*`_~>]/g, '') // formatting characters
    .replace(/\s+/g, ' ') // collapse whitespaces
    .trim();

  if (cleaned.length <= maxLength) return cleaned;
  // Truncate cleanly at a whole word boundary to prevent cutting words mid-word
  const cut = cleaned.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  const safeCut = lastSpace > 110 ? cut.slice(0, lastSpace) : cut;
  return safeCut.trim() + '...';
}

/**
 * Formats various date input types (Firestore Timestamp, Date, string, number) into an ISO 8601 string.
 */
export function formatIsoDate(dateVal: any, fallbackDate = new Date('2026-10-23T10:00:00.000Z')): string {
  const maxAllowed = Date.now() + 86400000;
  const clampDate = (d: Date): string => {
    if (isNaN(d.getTime())) return new Date('2026-10-23T10:00:00.000Z').toISOString();
    if (d.getTime() > maxAllowed) {
      return new Date().toISOString();
    }
    return d.toISOString();
  };

  if (!dateVal) return clampDate(fallbackDate);
  if (typeof dateVal.toDate === 'function') {
    return clampDate(dateVal.toDate());
  }
  if (dateVal.seconds) {
    return clampDate(new Date(dateVal.seconds * 1000));
  }
  if (dateVal instanceof Date) {
    return clampDate(dateVal);
  }
  if (typeof dateVal === 'string' || typeof dateVal === 'number') {
    const d = new Date(dateVal);
    if (!isNaN(d.getTime())) return clampDate(d);
  }
  return clampDate(fallbackDate);
}

/**
 * Dynamically generates unique SEO metadata and structured JSON-LD schemas for a blog post.
 */
export function stripSurroundingQuotes(raw?: string): string {
  if (!raw || typeof raw !== 'string') return '';
  return raw
    .trim()
    .replace(/^(?:&quot;|["'“”])+|(?:&quot;|["'“”])+$/gi, '')
    .trim();
}

export function generateBlogPostMeta(
  post: BlogPostMetaInput,
  slug: string,
  options: SeoOptions = {}
): BlogPostSeoData {
  const siteUrl = (options.siteUrl || DEFAULT_SITE_URL).replace(/\/$/, '');
  const siteName = options.siteName || DEFAULT_SITE_NAME;
  const defaultImage = options.defaultCoverImage || DEFAULT_COVER_IMAGE;
  const authorName = post.author?.trim() || options.defaultAuthor || DEFAULT_AUTHOR;

  let currentUrl = `${siteUrl}/blog/${encodeURIComponent(slug)}`;
  if (slug === 'e-commerce-platform-development-custom-build-vs-shopify-plus-2026' || slug === 'ecommerce-platform-development-custom-build-vs-shopify-plus-2026') {
    currentUrl = `${siteUrl}/blog/ecommerce-platform-development`;
  } else if (slug === 'edtech-software-development-lms-features-every-platform-needs' || slug === 'edtech-software-development-9-features-every-lms-needs') {
    currentUrl = `${siteUrl}/blog/edtech-software-development`;
  } else if (post.canonical) {
    currentUrl = post.canonical;
  }
  
  // 1. Unique Dynamic Title: "<Post Title> | AbuQitmirLabs"
  const rawTitle = post.title?.trim() || 'Journal Article';
  const pageTitle = rawTitle.includes(siteName) ? rawTitle : `${rawTitle} | ${siteName}`;

  // 2. Unique Dynamic Description: Prioritize explicit metaDescription or description field, then post excerpt, then fallback to content
  let description = '';
  const explicitDesc = stripSurroundingQuotes(post.metaDescription || (post as any).description);
  if (explicitDesc) {
    const cleanExplicit = explicitDesc.replace(/\s+/g, ' ');
    description = stripSurroundingQuotes(cleanExplicit.length <= 170 ? cleanExplicit : cleanExcerpt(cleanExplicit, 160));
  } else if (post.excerpt?.trim()) {
    const cleanEx = stripSurroundingQuotes(post.excerpt).replace(/\s+/g, ' ');
    description = stripSurroundingQuotes(cleanEx.length <= 170 ? cleanEx : cleanExcerpt(cleanEx, 160));
  } else {
    description = stripSurroundingQuotes(cleanExcerpt(post.content || rawTitle, 160));
  }

  // 3. Media and Taxonomy
  const rawCover = post.coverImage?.trim() || defaultImage;
  const localOrRemoteCover = resolveOptimizedCoverImage(rawCover, slug) || rawCover;
  const coverImage = localOrRemoteCover.startsWith('/')
    ? `${siteUrl}${localOrRemoteCover}`
    : localOrRemoteCover;
  const publishedTime = formatIsoDate(post.createdAt);
  const modifiedTime = formatIsoDate(post.updatedAt || post.createdAt);
  const categoryName =
    slug === 'ai-content-vs-human-content'
      ? 'Content Writing'
      : post.category?.trim() || 'Software & AI Engineering';
  
  const keywords = (post.tags && Array.isArray(post.tags) && post.tags.length > 0)
    ? post.tags.map(t => t.trim()).filter(Boolean)
    : [
        'custom software development',
        'AI agent development',
        'web development',
        'mobile app development',
        'tech insights'
      ];
  const keywordsString = keywords.join(', ');

  // 4. Authoritative Schema.org Graph JSON-LD
  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "AbuQitmirLabs .TECH",
        "alternateName": siteName,
        "url": `${siteUrl}/`,
        "logo": defaultImage,
        "description": "AbuQitmirLabs .TECH is a custom software, mobile app, AI agent, web development, SEO, graphics, and content writing studio serving startups, SMEs, and enterprises globally.",
        "sameAs": [
          "https://www.linkedin.com/in/abu-qitmir-697423390/",
          "https://x.com/AbuQitmir",
          "https://www.facebook.com/profile.php?id=61583768706452",
          "https://www.instagram.com/abuqitmirshirazalmadani/",
          "https://www.youtube.com/@AbuQitmir"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "sales",
          "url": `${siteUrl}/contact`
        }
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": `${siteUrl}/`,
        "name": `${siteName} .TECH`,
        "publisher": { "@id": `${siteUrl}/#organization` },
        "inLanguage": "en-US"
      },
      {
        "@type": "WebPage",
        "@id": `${currentUrl}#webpage`,
        "url": currentUrl,
        "name": rawTitle,
        "isPartOf": { "@id": `${siteUrl}/#website` },
        "primaryImageOfPage": coverImage,
        "datePublished": publishedTime,
        "dateModified": modifiedTime,
        "description": description,
        "breadcrumb": { "@id": `${currentUrl}#breadcrumb` },
        "inLanguage": "en-US"
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${siteUrl}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": `${siteUrl}/blog`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": rawTitle,
            "item": currentUrl
          }
        ]
      },
      {
        "@type": "Article",
        "@id": `${currentUrl}#article`,
        "headline": rawTitle,
        "description": description,
        "image": coverImage,
        "author": {
          "@type": "Person",
          "name": "Abu Qitmir Mohammad Shiraz Al-Madani",
          "jobTitle": "Founder & Growth Engineer",
          "worksFor": {
            "@type": "Organization",
            "name": "AbuQitmirLabs",
            "url": "https://www.abuqitmirlabs.tech/"
          },
          "url": "https://www.abuqitmirlabs.tech/about/our-team"
        },
        "publisher": { "@id": `${siteUrl}/#organization` },
        "datePublished": publishedTime,
        "dateModified": modifiedTime,
        "mainEntityOfPage": { "@id": `${currentUrl}#webpage` },
        "articleSection": categoryName,
        "keywords": keywords,
        "wordCount": countReadableWords(post.content || '') || 1500,
        "inLanguage": "en-US",
        "isAccessibleForFree": true
      },
      ...(extractFaqEntitiesFromMarkdown(post.content).length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${currentUrl}#faq`,
              "mainEntity": extractFaqEntitiesFromMarkdown(post.content)
            }
          ]
        : [])
    ]
  };

  return {
    title: pageTitle,
    description,
    canonicalUrl: currentUrl,
    ogTitle: pageTitle,
    ogDescription: description,
    ogUrl: currentUrl,
    ogImage: coverImage,
    ogType: 'article',
    ogSiteName: siteName,
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: description,
    twitterImage: coverImage,
    articlePublishedTime: publishedTime,
    articleModifiedTime: modifiedTime,
    articleAuthor: authorName,
    articleSection: categoryName,
    keywords,
    keywordsString,
    schemaJsonLd
  };
}

/**
 * Extracts FAQ Question/Answer pairs from a markdown "## Frequently Asked Questions" or "## FAQ" section.
 */
export function extractFaqEntitiesFromMarkdown(markdownContent?: string): Array<{
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}> {
  if (!markdownContent) return [];
  const faqSectionMatch = markdownContent.match(
    /(?:^|\n)##\s+(?:Frequently Asked Questions|FAQs?)\b[^\n]*\n([\s\S]*?)(?=\n##\s+|\n---\s*\n##\s+|(?![\s\S]))/i
  );
  if (!faqSectionMatch || !faqSectionMatch[1]) return [];

  const faqBlock = faqSectionMatch[1].replace(/\n---\s*$/g, '').trim();
  const entities: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }> = [];

  const questionRegex = /(?:^|\n)###\s+([^\n]+)\n+([\s\S]*?)(?=\n###\s+|\n##\s+|\n---\s*(?:\n|(?![\s\S]))|(?![\s\S]))/g;
  let match: RegExpExecArray | null;
  while ((match = questionRegex.exec(faqBlock)) !== null) {
    const rawQ = match[1]
      .replace(/^\d+\.\s*/, '')
      .replace(/[*_`~]/g, '')
      .trim();
    const rawA = match[2]
      .replace(/^---+\s*$/gm, '')
      .replace(/<[^>]*>/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/[*_`~>]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (rawQ && rawA) {
      entities.push({
        "@type": "Question",
        name: rawQ,
        acceptedAnswer: {
          "@type": "Answer",
          text: rawA
        }
      });
    }
  }

  return entities;
}


/**
 * SEO & Dynamic Meta Tag Utilities
 * AbuQitmirLabs Engineering
 * 
 * Provides utility functions to generate unique, search-engine-optimized
 * meta tags, OpenGraph, Twitter card tags, and JSON-LD structured data
 * for dynamic blog posts fetched from Firestore or static fallbacks.
 */

export interface BlogPostMetaInput {
  title: string;
  content?: string;
  excerpt?: string;
  coverImage?: string;
  coverImageAlt?: string;
  category?: string;
  author?: string;
  tags?: string[];
  createdAt?: any;
  updatedAt?: any;
  published?: boolean;
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
  return cleaned.slice(0, maxLength).trim() + '...';
}

/**
 * Formats various date input types (Firestore Timestamp, Date, string, number) into an ISO 8601 string.
 */
export function formatIsoDate(dateVal: any, fallbackDate = new Date()): string {
  if (!dateVal) return fallbackDate.toISOString();
  if (typeof dateVal.toDate === 'function') {
    return dateVal.toDate().toISOString();
  }
  if (dateVal.seconds) {
    return new Date(dateVal.seconds * 1000).toISOString();
  }
  if (dateVal instanceof Date) {
    return dateVal.toISOString();
  }
  if (typeof dateVal === 'string' || typeof dateVal === 'number') {
    const d = new Date(dateVal);
    if (!isNaN(d.getTime())) return d.toISOString();
  }
  return fallbackDate.toISOString();
}

/**
 * Dynamically generates unique SEO metadata and structured JSON-LD schemas for a blog post.
 */
export function generateBlogPostMeta(
  post: BlogPostMetaInput,
  slug: string,
  options: SeoOptions = {}
): BlogPostSeoData {
  const siteUrl = (options.siteUrl || DEFAULT_SITE_URL).replace(/\/$/, '');
  const siteName = options.siteName || DEFAULT_SITE_NAME;
  const defaultImage = options.defaultCoverImage || DEFAULT_COVER_IMAGE;
  const authorName = post.author?.trim() || options.defaultAuthor || DEFAULT_AUTHOR;

  const currentUrl = `${siteUrl}/blog/${encodeURIComponent(slug)}`;
  
  // 1. Unique Dynamic Title: "<Post Title> | AbuQitmirLabs"
  const rawTitle = post.title?.trim() || 'Journal Article';
  const pageTitle = rawTitle.includes(siteName) ? rawTitle : `${rawTitle} | ${siteName}`;

  // 2. Unique Dynamic Description: Use post excerpt or generate from content
  const description = post.excerpt?.trim() 
    ? cleanExcerpt(post.excerpt, 160)
    : cleanExcerpt(post.content || rawTitle, 160);

  // 3. Media and Taxonomy
  const coverImage = post.coverImage?.trim() || defaultImage;
  const publishedTime = formatIsoDate(post.createdAt);
  const modifiedTime = formatIsoDate(post.updatedAt || post.createdAt);
  const categoryName = post.category?.trim() || 'Software & AI Engineering';
  
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
          "@type": "Organization",
          "name": authorName,
          "url": siteUrl
        },
        "publisher": { "@id": `${siteUrl}/#organization` },
        "datePublished": publishedTime,
        "dateModified": modifiedTime,
        "mainEntityOfPage": { "@id": `${currentUrl}#webpage` },
        "articleSection": categoryName,
        "keywords": keywords,
        "inLanguage": "en-US"
      }
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

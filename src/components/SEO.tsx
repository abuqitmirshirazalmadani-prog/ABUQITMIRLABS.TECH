import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SEO_ROUTES_METADATA } from '../data/seoRoutesMetadata';
import { getCanonicalPath } from '../data/canonicalRedirects';
import { STATIC_BLOG_POSTS } from '../data/staticBlogPosts';

export interface SEOProps {
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
}

const SITE_URL = 'https://www.abuqitmirlabs.tech';
const DEFAULT_TITLE = 'Growth Engineering Agency | AbuQitmirLabs';
const DEFAULT_DESCRIPTION =
  'Growth engineering agency building revenue systems for B2B companies. Connect marketing, sales, and product data into one measurable engine.';
const DEFAULT_IMAGE = 'https://www.abuqitmirlabs.tech/logo.png';
const DEFAULT_IMAGE_ALT = 'AbuQitmirLabs Growth Engineering Agency';

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogImageAlt,
  ogType,
  twitterCard,
  twitterTitle,
  twitterDescription,
  twitterImage,
  robots,
}) => {
  const { pathname } = useLocation();
  const canonicalPath = getCanonicalPath(pathname);
  const normalizedPath =
    canonicalPath.endsWith('/') && canonicalPath !== '/'
      ? canonicalPath.slice(0, -1)
      : canonicalPath;

  const routeMeta =
    SEO_ROUTES_METADATA[canonicalPath] ||
    SEO_ROUTES_METADATA[normalizedPath] ||
    SEO_ROUTES_METADATA[pathname];

  // Fallback for dynamic blog routes (/blog/:slug) not explicitly listed in SEO_ROUTES_METADATA
  const isBlogPost = normalizedPath.startsWith('/blog/') && normalizedPath !== '/blog';
  const blogSlug = isBlogPost ? normalizedPath.replace(/^\/blog\//, '') : '';
  const staticBlogPost = blogSlug ? STATIC_BLOG_POSTS[blogSlug] : undefined;

  const resolvedTitle =
    title ||
    routeMeta?.title ||
    (staticBlogPost?.title
      ? staticBlogPost.title.includes('AbuQitmirLabs')
        ? staticBlogPost.title
        : `${staticBlogPost.title} | AbuQitmirLabs`
      : DEFAULT_TITLE);

  const resolvedDescription =
    description ||
    routeMeta?.description ||
    staticBlogPost?.metaDescription ||
    staticBlogPost?.excerpt ||
    DEFAULT_DESCRIPTION;

  const resolvedCanonical =
    canonical ||
    (normalizedPath === '/'
      ? `${SITE_URL}/`
      : routeMeta?.canonical &&
        routeMeta.canonical !== `${SITE_URL}/` &&
        routeMeta.canonical !== SITE_URL
      ? routeMeta.canonical
      : `${SITE_URL}${normalizedPath}`);

  const resolvedKeywords =
    keywords ||
    routeMeta?.keywords ||
    (Array.isArray(staticBlogPost?.tags) ? staticBlogPost.tags.join(', ') : undefined);

  const resolvedOgTitle = ogTitle || routeMeta?.ogTitle || resolvedTitle;
  const resolvedOgDescription =
    ogDescription || routeMeta?.ogDescription || resolvedDescription;
  const resolvedOgImage =
    ogImage || routeMeta?.ogImage || staticBlogPost?.coverImage || DEFAULT_IMAGE;
  const resolvedOgImageAlt =
    ogImageAlt ||
    routeMeta?.ogImageAlt ||
    staticBlogPost?.coverImageAlt ||
    DEFAULT_IMAGE_ALT;
  const resolvedOgType =
    ogType || routeMeta?.ogType || (isBlogPost ? 'article' : 'website');

  const resolvedTwitterCard =
    twitterCard || routeMeta?.twitterCard || 'summary_large_image';
  const resolvedTwitterTitle =
    twitterTitle || routeMeta?.twitterTitle || resolvedOgTitle;
  const resolvedTwitterDescription =
    twitterDescription || routeMeta?.twitterDescription || resolvedOgDescription;
  const resolvedTwitterImage =
    twitterImage || routeMeta?.twitterImage || resolvedOgImage;
  const resolvedRobots =
    robots ||
    routeMeta?.robots ||
    'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  // Ensure client-side DOM head never retains duplicate canonical or description tags across SPA route transitions
  useEffect(() => {
    const syncHeadCanonical = () => {
      const canonicalLinks = Array.from(
        document.head.querySelectorAll('link[rel="canonical"]')
      ) as HTMLLinkElement[];

      if (canonicalLinks.length > 1) {
        canonicalLinks.forEach((link, idx) => {
          if (idx === 0) {
            link.setAttribute('href', resolvedCanonical);
          } else {
            link.remove();
          }
        });
      } else if (canonicalLinks.length === 1) {
        canonicalLinks[0].setAttribute('href', resolvedCanonical);
      }

      const ogUrlMetas = Array.from(
        document.head.querySelectorAll('meta[property="og:url"]')
      ) as HTMLMetaElement[];
      if (ogUrlMetas.length > 1) {
        ogUrlMetas.forEach((meta, idx) => {
          if (idx === 0) {
            meta.setAttribute('content', resolvedCanonical);
          } else {
            meta.remove();
          }
        });
      }
    };

    const timer = setTimeout(syncHeadCanonical, 50);
    return () => clearTimeout(timer);
  }, [resolvedCanonical]);

  return (
    <Helmet prioritizeSeoTags>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      {resolvedKeywords && <meta name="keywords" content={resolvedKeywords} />}
      <meta name="robots" content={resolvedRobots} />
      <link rel="canonical" href={resolvedCanonical} />

      {/* Open Graph Metadata */}
      <meta property="og:site_name" content="AbuQitmirLabs" />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:type" content={resolvedOgType} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:alt" content={resolvedOgImageAlt} />

      {/* Twitter Card Metadata */}
      <meta name="twitter:card" content={resolvedTwitterCard} />
      <meta name="twitter:title" content={resolvedTwitterTitle} />
      <meta name="twitter:description" content={resolvedTwitterDescription} />
      <meta name="twitter:image" content={resolvedTwitterImage} />
    </Helmet>
  );
};

export default SEO;

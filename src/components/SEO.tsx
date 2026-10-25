import React, { useEffect } from 'react';
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

  // Synchronize head attributes in-place WITHOUT removing React 19 / Helmet fiber DOM nodes
  useEffect(() => {
    const syncHeadInPlace = () => {
      if (resolvedTitle) {
        const titleNodes = document.head.querySelectorAll('title');
        if (titleNodes.length === 1) {
          if (titleNodes[0].textContent !== resolvedTitle) {
            titleNodes[0].textContent = resolvedTitle;
          }
        } else if (titleNodes.length > 1) {
          // Keep the last <title> (hoisted by React 19 / Helmet) and remove any earlier orphan <title>
          for (let i = 0; i < titleNodes.length - 1; i++) {
            titleNodes[i].remove();
          }
          const activeTitle = titleNodes[titleNodes.length - 1];
          if (activeTitle && activeTitle.textContent !== resolvedTitle) {
            activeTitle.textContent = resolvedTitle;
          }
        }
      }

      const updateMetaByName = (name: string, content?: string) => {
        if (!content) return;
        const nodes = document.head.querySelectorAll(`meta[name="${name}"]`);
        nodes.forEach((node) => node.setAttribute('content', content));
      };

      const updateMetaByProperty = (prop: string, content?: string) => {
        if (!content) return;
        const nodes = document.head.querySelectorAll(`meta[property="${prop}"]`);
        nodes.forEach((node) => node.setAttribute('content', content));
      };

      const canonicalLinks = document.head.querySelectorAll('link[rel="canonical"]');
      canonicalLinks.forEach((link) => {
        link.setAttribute('href', resolvedCanonical);
      });

      updateMetaByName('description', resolvedDescription);
      if (resolvedKeywords) updateMetaByName('keywords', resolvedKeywords);
      updateMetaByName('robots', resolvedRobots);
      updateMetaByProperty('og:title', resolvedOgTitle);
      updateMetaByProperty('og:description', resolvedOgDescription);
      updateMetaByProperty('og:url', resolvedCanonical);
      updateMetaByProperty('og:type', resolvedOgType);
      updateMetaByProperty('og:image', resolvedOgImage);
      updateMetaByProperty('og:image:alt', resolvedOgImageAlt);
      updateMetaByName('twitter:card', resolvedTwitterCard);
      updateMetaByName('twitter:title', resolvedTwitterTitle);
      updateMetaByName('twitter:description', resolvedTwitterDescription);
      updateMetaByName('twitter:image', resolvedTwitterImage);
    };

    syncHeadInPlace();
    const timer = setTimeout(syncHeadInPlace, 30);
    return () => clearTimeout(timer);
  }, [
    pathname,
    resolvedTitle,
    resolvedDescription,
    resolvedCanonical,
    resolvedKeywords,
    resolvedRobots,
    resolvedOgTitle,
    resolvedOgDescription,
    resolvedOgType,
    resolvedOgImage,
    resolvedOgImageAlt,
    resolvedTwitterCard,
    resolvedTwitterTitle,
    resolvedTwitterDescription,
    resolvedTwitterImage,
  ]);

  return null;
};

export default SEO;

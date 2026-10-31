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
  schema?: Record<string, any> | Array<Record<string, any>>;
}

const SITE_URL = 'https://www.abuqitmirlabs.tech';
const DEFAULT_TITLE = 'Growth Engineering Firm | Custom Software & AI | AbuQitmirLabs';
const DEFAULT_DESCRIPTION =
  'Growth engineering firm for B2B companies. Custom software, AI automation & performance marketing engineered as one revenue system.';
const DEFAULT_IMAGE = 'https://www.abuqitmirlabs.tech/logo.png';
const DEFAULT_IMAGE_ALT = 'AbuQitmirLabs Growth Engineering Firm';

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
  schema,
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

  const stripOuterQuotes = (val?: string) =>
    (val || '')
      .trim()
      .replace(/^(?:&quot;|["'“”])+|(?:&quot;|["'“”])+$/gi, '')
      .trim();

  const resolvedDescription = stripOuterQuotes(
    description ||
      routeMeta?.description ||
      staticBlogPost?.metaDescription ||
      staticBlogPost?.excerpt ||
      DEFAULT_DESCRIPTION
  );

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
  const resolvedOgDescription = stripOuterQuotes(
    ogDescription || routeMeta?.ogDescription || resolvedDescription
  );
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
  const resolvedTwitterDescription = stripOuterQuotes(
    twitterDescription || routeMeta?.twitterDescription || resolvedOgDescription
  );
  const resolvedTwitterImage =
    twitterImage || routeMeta?.twitterImage || resolvedOgImage;
  const resolvedRobots =
    robots ||
    routeMeta?.robots ||
    'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  // Safely update and deduplicate <head> tags so strictly ONE <title>, ONE <meta name="description">, ONE <link rel="canonical">, and ONE JSON-LD block exist
  useEffect(() => {
    const pickSingleNode = <T extends Element>(nodes: NodeListOf<T>): T | null => {
      if (nodes.length === 0) return null;
      if (nodes.length === 1) {
        nodes[0].setAttribute('data-rh', 'true');
        return nodes[0];
      }
      const arr = Array.from(nodes);
      const rhNodes = arr.filter((n) => n.hasAttribute('data-rh'));
      const keep = rhNodes.length > 0 ? rhNodes[rhNodes.length - 1] : arr[arr.length - 1];
      keep.setAttribute('data-rh', 'true');
      arr.forEach((n) => {
        if (n !== keep && !n.hasAttribute('data-rh')) {
          n.remove();
        } else if (n !== keep && rhNodes.length > 1) {
          n.remove();
        }
      });
      return keep;
    };

    const syncHeadInPlace = () => {
      if (resolvedTitle) {
        if (document.title !== resolvedTitle) {
          document.title = resolvedTitle;
        }
        const titleNodes = document.head.querySelectorAll('title');
        const keptTitle = pickSingleNode(titleNodes);
        if (!keptTitle) {
          const newTitle = document.createElement('title');
          newTitle.setAttribute('data-rh', 'true');
          newTitle.textContent = resolvedTitle;
          document.head.appendChild(newTitle);
        } else if (keptTitle.textContent !== resolvedTitle) {
          keptTitle.textContent = resolvedTitle;
        }
      }

      const updateMetaByName = (name: string, content?: string) => {
        if (!content) return;
        const nodes = document.head.querySelectorAll(`meta[name="${name}"]`);
        const kept = pickSingleNode(nodes);
        if (kept) {
          if (kept.getAttribute('content') !== content) {
            kept.setAttribute('content', content);
          }
        } else {
          const meta = document.createElement('meta');
          meta.setAttribute('data-rh', 'true');
          meta.setAttribute('name', name);
          meta.setAttribute('content', content);
          document.head.appendChild(meta);
        }
      };

      const updateMetaByProperty = (prop: string, content?: string) => {
        if (!content) return;
        const nodes = document.head.querySelectorAll(`meta[property="${prop}"]`);
        const kept = pickSingleNode(nodes);
        if (kept) {
          if (kept.getAttribute('content') !== content) {
            kept.setAttribute('content', content);
          }
        } else {
          const meta = document.createElement('meta');
          meta.setAttribute('data-rh', 'true');
          meta.setAttribute('property', prop);
          meta.setAttribute('content', content);
          document.head.appendChild(meta);
        }
      };

      const canonicalLinks = document.head.querySelectorAll('link[rel="canonical"]');
      const keptCanon = pickSingleNode(canonicalLinks);
      if (keptCanon) {
        if (keptCanon.getAttribute('href') !== resolvedCanonical) {
          keptCanon.setAttribute('href', resolvedCanonical);
        }
      } else {
        const link = document.createElement('link');
        link.setAttribute('data-rh', 'true');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', resolvedCanonical);
        document.head.appendChild(link);
      }

      if (schema) {
        const schemaJson = JSON.stringify(schema);
        const ldNodes = document.head.querySelectorAll('script[type="application/ld+json"]');
        const keptLd = pickSingleNode(ldNodes);
        if (keptLd) {
          if (keptLd.textContent !== schemaJson) {
            keptLd.textContent = schemaJson;
          }
        } else {
          const script = document.createElement('script');
          script.setAttribute('data-rh', 'true');
          script.setAttribute('type', 'application/ld+json');
          script.textContent = schemaJson;
          document.head.appendChild(script);
        }
      }

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
    const timer = setTimeout(syncHeadInPlace, 40);

    return () => {
      clearTimeout(timer);
    };
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
    schema,
  ]);

  return null;
};

export default SEO;

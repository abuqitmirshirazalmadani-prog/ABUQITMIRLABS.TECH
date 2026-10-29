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

  // Synchronize head attributes in-place and guarantee strictly ONE <title> and ONE <script type="application/ld+json"> tag in <head>
  useEffect(() => {
    const isReactManagedNode = (node: Element) =>
      node.getAttribute('data-rh') === 'true' ||
      Object.keys(node).some(
        (k) => k.startsWith('__reactFiber$') || k.startsWith('__reactProps$')
      );

    const deduplicateTitleTags = () => {
      const titleNodes = Array.from(document.head.querySelectorAll('title'));
      if (titleNodes.length > 1) {
        const reactTitles = titleNodes.filter(isReactManagedNode);
        if (reactTitles.length > 0) {
          // Remove all non-React static/orphan <title> tags and keep only the latest React Helmet <title>
          const keepNode = reactTitles[reactTitles.length - 1];
          titleNodes.forEach((node) => {
            if (node !== keepNode) {
              node.remove();
            }
          });
        } else {
          // Keep only the last <title> tag
          for (let i = 0; i < titleNodes.length - 1; i++) {
            titleNodes[i].remove();
          }
        }
      }
    };

    const deduplicateJsonLdScripts = () => {
      const ldNodes = Array.from(
        document.head.querySelectorAll('script[type="application/ld+json"]')
      );
      if (ldNodes.length > 1) {
        const reactLdNodes = ldNodes.filter(
          (node) => isReactManagedNode(node) || node.getAttribute('data-rh') === 'true'
        );
        // Prefer the script that matches the current canonical URL or is the latest React Helmet script
        const matchingCanonicalNode =
          ldNodes
            .slice()
            .reverse()
            .find((node) => (node.textContent || '').includes(resolvedCanonical)) ||
          (reactLdNodes.length > 0
            ? reactLdNodes[reactLdNodes.length - 1]
            : ldNodes[ldNodes.length - 1]);

        ldNodes.forEach((node) => {
          if (node !== matchingCanonicalNode) {
            node.remove();
          }
        });
      }
    };

    const syncHeadInPlace = () => {
      deduplicateTitleTags();
      deduplicateJsonLdScripts();

      if (resolvedTitle) {
        if (document.title !== resolvedTitle) {
          document.title = resolvedTitle;
        }
        const titleNodes = document.head.querySelectorAll('title');
        if (titleNodes.length === 0) {
          const newTitle = document.createElement('title');
          newTitle.setAttribute('data-rh', 'true');
          newTitle.textContent = resolvedTitle;
          document.head.appendChild(newTitle);
        } else {
          if (titleNodes[0].textContent !== resolvedTitle) {
            titleNodes[0].textContent = resolvedTitle;
          }
        }
      }

      const updateMetaByName = (name: string, content?: string) => {
        if (!content) return;
        const nodes = Array.from(document.head.querySelectorAll(`meta[name="${name}"]`));
        if (nodes.length > 1) {
          const reactNodes = nodes.filter(isReactManagedNode);
          const keepNode = reactNodes.length > 0 ? reactNodes[reactNodes.length - 1] : nodes[nodes.length - 1];
          nodes.forEach((node) => {
            if (node !== keepNode) node.remove();
          });
          keepNode.setAttribute('content', content);
        } else if (nodes.length === 1) {
          nodes[0].setAttribute('content', content);
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
        const nodes = Array.from(document.head.querySelectorAll(`meta[property="${prop}"]`));
        if (nodes.length > 1) {
          const reactNodes = nodes.filter(isReactManagedNode);
          const keepNode = reactNodes.length > 0 ? reactNodes[reactNodes.length - 1] : nodes[nodes.length - 1];
          nodes.forEach((node) => {
            if (node !== keepNode) node.remove();
          });
          keepNode.setAttribute('content', content);
        } else if (nodes.length === 1) {
          nodes[0].setAttribute('content', content);
        } else {
          const meta = document.createElement('meta');
          meta.setAttribute('data-rh', 'true');
          meta.setAttribute('property', prop);
          meta.setAttribute('content', content);
          document.head.appendChild(meta);
        }
      };

      const canonicalLinks = Array.from(document.head.querySelectorAll('link[rel="canonical"]'));
      if (canonicalLinks.length > 1) {
        const reactLinks = canonicalLinks.filter(isReactManagedNode);
        const keepLink = reactLinks.length > 0 ? reactLinks[reactLinks.length - 1] : canonicalLinks[canonicalLinks.length - 1];
        canonicalLinks.forEach((link) => {
          if (link !== keepLink) link.remove();
        });
        keepLink.setAttribute('href', resolvedCanonical);
      } else if (canonicalLinks.length === 1) {
        canonicalLinks[0].setAttribute('href', resolvedCanonical);
      } else {
        const link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('data-rh', 'true');
        link.setAttribute('href', resolvedCanonical);
        document.head.appendChild(link);
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
    const timer = setTimeout(syncHeadInPlace, 30);

    const observer = new MutationObserver(() => {
      if (document.head.querySelectorAll('title').length > 1) {
        deduplicateTitleTags();
      }
      if (document.head.querySelectorAll('script[type="application/ld+json"]').length > 1) {
        deduplicateJsonLdScripts();
      }
    });
    observer.observe(document.head, { childList: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
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
  ]);

  return null;
};

export default SEO;

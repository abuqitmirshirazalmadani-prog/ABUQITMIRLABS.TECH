import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  applyMetadataToDocumentHead,
  generateMetadata,
} from '../../lib/generate-metadata';

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
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  schema?: Record<string, any> | Array<Record<string, any>>;
  preloadImage?: string;
  article?: Record<string, any>;
}

/**
 * Central SEO component powered by Layer 2 (`lib/generate-metadata.ts`).
 * Replaces React Helmet and manual `<title>` / `<meta>` tags across all routes.
 */
export const SEO: React.FC<SEOProps> = (props) => {
  const { pathname } = useLocation();

  const metadata = generateMetadata({
    pathname,
    ...props,
  });

  useEffect(() => {
    applyMetadataToDocumentHead(metadata);
  }, [
    pathname,
    metadata.title,
    metadata.description,
    metadata.alternates.canonical,
    metadata.keywords,
    metadata.openGraph.title,
    metadata.openGraph.description,
    metadata.openGraph.url,
    metadata.openGraph.type,
    metadata.openGraph.images[0]?.url,
    metadata.openGraph.images[0]?.alt,
    metadata.twitter.card,
    metadata.twitter.title,
    metadata.twitter.description,
    metadata.twitter.images[0],
    metadata.robots,
    metadata.schemaGraph,
  ]);

  return null;
};

export default SEO;

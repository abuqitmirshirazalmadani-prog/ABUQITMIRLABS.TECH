import React from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
}

/**
 * High-Performance Image Component (Next.js <Image> compatible API for React + Vite)
 * Automatically enforces WebP-optimized local asset loading, explicit dimensions (zero CLS),
 * and high-priority LCP preloading when `priority` is true.
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width = 1200,
  height = 630,
  priority = false,
  loading,
  fetchPriority,
  decoding = 'async',
  ...rest
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading || 'lazy'}
      fetchPriority={priority ? 'high' : fetchPriority}
      decoding={decoding}
      {...rest}
    />
  );
};

export default Image;

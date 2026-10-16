export interface CachedPost {
  id?: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  coverImageAlt?: string;
  category?: string;
  createdAt: any;
  updatedAt?: any;
  author: string;
  tags?: string[];
  helperImages?: Array<{ url: string; caption: string }>;
  published?: boolean;
}

const memoryCache = new Map<string, CachedPost>();
const CACHE_STORAGE_KEY = 'abq_blog_cache_v2';

export const normalizeSlug = (slug: string): string => {
  if (!slug) return '';
  return String(slug).trim().toLowerCase().replace(/^\/+/, '').replace(/^blog\//, '').replace(/\/+$/, '');
};

export const getCachedPost = (slug: string): CachedPost | null => {
  if (!slug) return null;
  const clean = normalizeSlug(slug);
  if (memoryCache.has(clean)) {
    return memoryCache.get(clean)!;
  }
  if (typeof window !== 'undefined') {
    try {
      const stored = sessionStorage.getItem(`${CACHE_STORAGE_KEY}_${clean}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        memoryCache.set(clean, parsed);
        return parsed;
      }
    } catch {
      // storage quota or private browsing
    }
  }
  return null;
};

export const setCachedPost = (slug: string, post: CachedPost) => {
  if (!slug || !post) return;
  const clean = normalizeSlug(slug);
  memoryCache.set(clean, post);
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(`${CACHE_STORAGE_KEY}_${clean}`, JSON.stringify(post));
    } catch {
      // ignore
    }
  }
};

export const setCachedPosts = (posts: CachedPost[]) => {
  if (!Array.isArray(posts)) return;
  posts.forEach(p => {
    if (p && p.slug) {
      setCachedPost(p.slug, p);
    }
  });
};

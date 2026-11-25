import fs from 'fs';
import path from 'path';
import { BLOG_SLUG_REDIRECTS, getCanonicalSlug as canonicalizeBlogSlug } from '../src/data/canonicalRedirects.js';
import { REMOTE_TO_LOCAL_COVER_MAP, SLUG_TO_LOCAL_COVER_MAP } from '../src/data/localCoverImageMap.js';
import {
  STATIC_NEWS_ARTICLES,
  StaticNewsArticle,
  generateNewsSlug,
  getNewsArticleSlug,
} from './static-news-data.js';

const SITE_URL = 'https://www.abuqitmirlabs.tech';
const DEFAULT_AUTHOR = 'Abu Qitmir Mohammad Shiraz Al-Madani';

const KNOWN_COVER_MAP: Record<string, string> = {
  'https://i.postimg.cc/9QdHdDB2/Logo-Design-Pricing-in-Pakistan-Explained.png': '/images/blog-covers/rebranding-cost-pakistan-6b1f5c4e.webp',
  'https://i.postimg.cc/qqsFC1CD/Kuwait-Cybersecurity-Partner-Evaluation.png': '/images/blog-covers/kuwait-cybersecurity-partner-evaluation.webp',
  'https://i.postimg.cc/vBhWpH0q/Lead-Generation-Content-Strategy-That-Works.jpg': '/images/blog-covers/lead-generation-content-strategy-google-meta-v2.webp',
  'https://i.postimg.cc/vBhWpH0q/Lead-Generation-Content-Strategy-That_Works.jpg': '/images/blog-covers/lead-generation-content-strategy-google-meta-v2.webp',
  'https://i.postimg.cc/7YZRZy9q/Rebranding-Checklist-Pakistan-Before-During-and-After.jpg': '/images/blog-covers/rebranding-checklist-pakistan-v2.webp',
  'https://i.postimg.cc/L5RsMkbN/Qatar-Custom-Software-Development-Guide.png': '/images/blog-covers/custom-software-development-qatar-06910d97.webp',
  'https://i.postimg.cc/TYhzLzmz/Five-Blues-One-Brand-Guideline.png': '/images/blog-covers/brand-guidelines-small-business-pakistan-147e663e.webp',
  'https://i.postimg.cc/MGJ7kWH0/Pakistan-IT-Exports-Readiness-Report.png': '/images/blog-covers/pakistan-offshore-development-gcc-8b86e137.webp',
  'https://i.postimg.cc/C56BHBKN/Free-Website-AI-Tools-for-Founders.jpg': '/images/blog-covers/free-tools-website-seo-ai-readiness.webp',
  'https://i.postimg.cc/yxvzVCDX/RTL-UX-From-Broken-to-Brilliant.png': '/images/blog-covers/arabic-ux-design-rtl.webp',
  'https://i.postimg.cc/bJWttf7h/AI-Readiness-Fix-Broken-Data.png': '/images/blog-covers/ai-readiness-uae-gcc.webp',
  'https://i.postimg.cc/Xqhs0Zq5/Three-Versions-One-Brand-Confusion.png': '/images/blog-covers/brand-consistency-checklist.webp',
  'https://i.postimg.cc/tCL7q4px/Build-Arabic-Apps-for-the-GCC.png': '/images/blog-covers/mobile-app-development-arabic-rtl.webp',
  'https://i.postimg.cc/NGkCBDtZ/social-media-brand-kit.png': '/images/blog-covers/social-media-brand-kit-a2d5c63e.webp',
  'https://i.postimg.cc/mgJqDkFt/ZATCA-ERP-Integration-Saudi-Arabia-Guide.png': '/images/blog-covers/zatca-erp-integration-saudi-arabia.webp',
  'https://i.postimg.cc/MKZDD2QK/Abu-Qitmir-Labs.png': '/images/blog-covers/raast-payment-integration-pakistan.webp',
  'https://i.postimg.cc/FFYJByXS/Brand-Your-Whats-App-Business-in-Pakistan.jpg': '/images/blog-covers/whatsapp-business-branding-pakistan.webp',
};

const EXTRA_BLOG_REDIRECTS: Record<string, string> = {
  'rag-ai-integration-for-startups': 'the-complete-guide-to-rag-ai-integration-for-startups',
};

export interface BlogRecord {
  slug: string;
  title: string;
  seoTitle?: string;
  heroSubtitle?: string;
  excerpt: string;
  metaDescription: string;
  content: string;
  coverImage: string;
  coverImageAlt: string;
  author: string;
  category: string;
  tags: string[];
  helperImages?: Array<{ url: string; caption: string }>;
  published: boolean;
  createdAt: string;
  updatedAtMs: number;
  cmsUpdatedAtMs: number;
  source: 'markdown' | 'firestore';
}

export interface NewsRecord {
  id: string;
  slug: string;
  title: string;
  type: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  location: string;
  contact: string;
  published: boolean;
  updatedAtMs: number;
}

export interface SsrRenderResult {
  status: number;
  html?: string;
  redirectLocation?: string;
  cacheControl?: string;
}

const CACHE_TTL_MS = 12_000;
const firestorePostCache = new Map<string, { expiresAt: number; value: BlogRecord | null }>();
let allFirestorePostsCache: { expiresAt: number; value: BlogRecord[] } | null = null;
let allFirestoreNewsCache: { expiresAt: number; value: NewsRecord[] } | null = null;
const markdownBlogCache = new Map<string, { mtimeMs: number; value: BlogRecord }>();

export function invalidateSsrCache(slug?: string): void {
  if (slug) {
    const clean = resolveCanonicalBlogSlug(slug);
    firestorePostCache.delete(clean);
    firestorePostCache.delete(slug);
    markdownBlogCache.delete(clean);
    markdownBlogCache.delete(slug);
  } else {
    firestorePostCache.clear();
    markdownBlogCache.clear();
  }
  allFirestorePostsCache = null;
  allFirestoreNewsCache = null;
}

export function resolveCanonicalBlogSlug(rawSlug: string): string {
  const clean = String(rawSlug || '')
    .trim()
    .replace(/^\/+/, '')
    .replace(/^blog\/+/, '')
    .replace(/\/+$/, '');
  if (!clean) return '';
  const mapped = canonicalizeBlogSlug(clean);
  if (mapped && mapped !== clean) return mapped;
  return BLOG_SLUG_REDIRECTS[clean] || EXTRA_BLOG_REDIRECTS[clean] || clean;
}

export function escapeHtml(unsafe: string): string {
  return String(unsafe || '').replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&#39;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

function slugifyId(txt: string): string {
  return String(txt || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function clampCleanDesc(str: string, maxLen = 155): string {
  const clean = String(str || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  const within = clean.slice(0, maxLen);
  const lastPeriod = Math.max(within.lastIndexOf('. '), within.endsWith('.') ? within.length - 1 : -1);
  if (lastPeriod >= 85) {
    return within.slice(0, lastPeriod + 1).trim();
  }
  const cut = clean.slice(0, maxLen - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:!?—–-]+$/, '')}.`;
}

function getFirebaseConfig(): { projectId: string; databaseId: string; apiKey: string } {
  let projectId = 'angular-oxide-tcf5x';
  let databaseId = 'ai-studio-675d15b3-f001-4d2e-a88b-bbcb33443014';
  let apiKey = '';
  try {
    const candidates = [
      path.join(process.cwd(), 'firebase-applet-config.json'),
      ...(typeof __dirname !== 'undefined' ? [path.join(__dirname, '..', 'firebase-applet-config.json')] : []),
    ];
    for (const cfgPath of candidates) {
      if (fs.existsSync(cfgPath)) {
        const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf-8'));
        if (cfg.projectId) projectId = cfg.projectId;
        if (cfg.firestoreDatabaseId) databaseId = cfg.firestoreDatabaseId;
        if (cfg.apiKey) apiKey = cfg.apiKey;
        break;
      }
    }
  } catch {}
  return { projectId, databaseId, apiKey };
}

function extractFirestoreString(field: any): string {
  if (!field) return '';
  if (typeof field.stringValue === 'string') return field.stringValue;
  if (typeof field.timestampValue === 'string') return field.timestampValue;
  if (typeof field.integerValue === 'string' || typeof field.integerValue === 'number') {
    return String(field.integerValue);
  }
  return '';
}

function extractFirestoreMillis(field: any, fallbackIso?: string): number {
  if (field?.timestampValue) {
    const ms = Date.parse(field.timestampValue);
    if (!Number.isNaN(ms)) return ms;
  }
  if (field?.stringValue) {
    const s = field.stringValue.trim();
    if (/^\d+$/.test(s)) return Number(s);
    const ms = Date.parse(s);
    if (!Number.isNaN(ms)) return ms;
  }
  if (field?.integerValue !== undefined) {
    const n = Number(field.integerValue);
    if (!Number.isNaN(n)) return n > 1e12 ? n : n * 1000;
  }
  const sec = field?.mapValue?.fields?.seconds?.integerValue || field?.mapValue?.fields?.seconds?.stringValue;
  if (sec !== undefined) {
    const n = Number(sec);
    if (!Number.isNaN(n)) return n * 1000;
  }
  if (fallbackIso) {
    const ms = Date.parse(fallbackIso);
    if (!Number.isNaN(ms)) return ms;
  }
  return 0;
}

function extractFirestoreDateStr(f: any): string {
  const pub = extractFirestoreString(f.publishedAt);
  if (pub && pub.length >= 10) return pub.slice(0, 10);
  const created = extractFirestoreString(f.createdAt);
  if (created && created.length >= 10) return created.slice(0, 10);
  const ms = extractFirestoreMillis(f.createdAt);
  if (ms > 0) return new Date(ms).toISOString().slice(0, 10);
  return new Date().toISOString().slice(0, 10);
}

function extractFirestoreStringArray(field: any): string[] {
  if (Array.isArray(field?.arrayValue?.values)) {
    return field.arrayValue.values
      .map((v: any) => extractFirestoreString(v).trim())
      .filter(Boolean);
  }
  const str = extractFirestoreString(field);
  if (str) {
    return str
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function extractFirestoreHelperImages(field: any): Array<{ url: string; caption: string }> {
  const vals = field?.arrayValue?.values;
  if (!Array.isArray(vals)) return [];
  const out: Array<{ url: string; caption: string }> = [];
  for (const item of vals) {
    const mf = item?.mapValue?.fields;
    if (!mf) continue;
    const url = extractFirestoreString(mf.url).trim();
    const caption = extractFirestoreString(mf.caption).trim();
    if (url) out.push({ url, caption });
  }
  return out;
}

function parseFirestorePostDoc(doc: any, fallbackSlug?: string): BlogRecord | null {
  const f = doc?.fields;
  if (!f) return null;
  const rawSlug = extractFirestoreString(f.slug) || fallbackSlug || '';
  const slug = resolveCanonicalBlogSlug(rawSlug);
  if (!slug) return null;
  const published = f.published?.booleanValue !== undefined
    ? f.published.booleanValue
    : extractFirestoreString(f.published).toLowerCase() !== 'false';
  const docUpdateMs = doc.updateTime ? Date.parse(doc.updateTime) || 0 : 0;
  const updatedAtMs = Math.max(
    extractFirestoreMillis(f.updatedAt),
    extractFirestoreMillis(f.cmsUpdatedAt),
    docUpdateMs
  );
  const cmsUpdatedAtMs = extractFirestoreMillis(f.cmsUpdatedAt);
  const title = extractFirestoreString(f.title) || slug;
  const excerpt = extractFirestoreString(f.excerpt) || '';
  const metaDescription = extractFirestoreString(f.metaDescription) || excerpt;
  const content = extractFirestoreString(f.content) || '';

  return {
    slug,
    title,
    seoTitle: extractFirestoreString(f.seoTitle) || undefined,
    heroSubtitle: extractFirestoreString(f.heroSubtitle) || undefined,
    excerpt,
    metaDescription,
    content,
    coverImage: extractFirestoreString(f.coverImage) || '/logo.png',
    coverImageAlt: extractFirestoreString(f.coverImageAlt) || '',
    author: extractFirestoreString(f.author) || DEFAULT_AUTHOR,
    category: extractFirestoreString(f.category) || 'Business',
    tags: extractFirestoreStringArray(f.tags),
    helperImages: extractFirestoreHelperImages(f.helperImages),
    published,
    createdAt: extractFirestoreDateStr(f),
    updatedAtMs,
    cmsUpdatedAtMs,
    source: 'firestore',
  };
}

function parseFirestoreNewsDoc(doc: any): NewsRecord | null {
  const f = doc?.fields;
  if (!f) return null;
  const docId = String(doc.name || '').split('/').pop() || '';
  const title = extractFirestoreString(f.title);
  if (!title) return null;
  const rawSlug = extractFirestoreString(f.slug);
  const slug = getNewsArticleSlug({ slug: rawSlug, title, id: docId });
  const published = f.published?.booleanValue !== undefined
    ? f.published.booleanValue
    : extractFirestoreString(f.published).toLowerCase() !== 'false';
  const updatedAtMs = Math.max(
    extractFirestoreMillis(f.updatedAt),
    extractFirestoreMillis(f.createdAt),
    doc.updateTime ? Date.parse(doc.updateTime) || 0 : 0
  );
  return {
    id: docId || slug,
    slug,
    title,
    type: extractFirestoreString(f.type) || 'latest',
    category: extractFirestoreString(f.category) || 'Product Launch',
    date: extractFirestoreString(f.date) || new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
    excerpt: extractFirestoreString(f.excerpt) || extractFirestoreString(f.summary) || '',
    content: extractFirestoreString(f.content) || '',
    author: extractFirestoreString(f.author) || DEFAULT_AUTHOR,
    readTime: extractFirestoreString(f.readTime) || '4 min read',
    location: extractFirestoreString(f.location) || 'Karachi, Pakistan',
    contact: extractFirestoreString(f.contact) || 'hello@abuqitmirlabs.tech',
    published,
    updatedAtMs,
  };
}

export async function fetchFirestorePostBySlug(rawSlug: string, bypassCache = false): Promise<BlogRecord | null> {
  const canonicalSlug = resolveCanonicalBlogSlug(rawSlug);
  if (!canonicalSlug) return null;

  if (!bypassCache) {
    const cached = firestorePostCache.get(canonicalSlug);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.value;
    }
  }

  const { projectId, databaseId, apiKey } = getFirebaseConfig();
  const slugsToQuery = Array.from(new Set([canonicalSlug, rawSlug.trim()].filter(Boolean)));

  let found: BlogRecord | null = null;
  try {
    const queryUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents:runQuery${apiKey ? `?key=${encodeURIComponent(apiKey)}` : ''}`;
    for (const candidateSlug of slugsToQuery) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3500);
      try {
        const res = await fetch(queryUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            structuredQuery: {
              from: [{ collectionId: 'posts' }],
              where: {
                fieldFilter: {
                  field: { fieldPath: 'slug' },
                  op: 'EQUAL',
                  value: { stringValue: candidateSlug },
                },
              },
              limit: 2,
            },
          }),
          signal: controller.signal,
        });
        if (res.ok) {
          const rows: any = await res.json();
          const docRow = Array.isArray(rows) ? rows.find((r: any) => r?.document?.fields) : null;
          if (docRow) {
            found = parseFirestorePostDoc(docRow.document, canonicalSlug);
            if (found) break;
          }
        }
      } finally {
        clearTimeout(timer);
      }
    }
  } catch {
    // Graceful timeout/network fallback
  }

  firestorePostCache.set(canonicalSlug, {
    expiresAt: Date.now() + CACHE_TTL_MS,
    value: found,
  });
  return found;
}

export async function fetchAllFirestorePosts(bypassCache = false): Promise<BlogRecord[]> {
  if (!bypassCache && allFirestorePostsCache && allFirestorePostsCache.expiresAt > Date.now()) {
    return allFirestorePostsCache.value;
  }

  const { projectId, databaseId, apiKey } = getFirebaseConfig();
  const items: BlogRecord[] = [];
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    try {
      const listUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents/posts?pageSize=250${apiKey ? `&key=${encodeURIComponent(apiKey)}` : ''}`;
      let docs: any[] = [];
      const res = await fetch(listUrl, { signal: controller.signal });
      if (res.ok) {
        const data: any = await res.json();
        docs = Array.isArray(data.documents) ? data.documents : [];
      } else {
        const runQueryUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents:runQuery${apiKey ? `?key=${encodeURIComponent(apiKey)}` : ''}`;
        const rqRes = await fetch(runQueryUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            structuredQuery: { from: [{ collectionId: 'posts' }], limit: 250 },
          }),
          signal: controller.signal,
        });
        if (rqRes.ok) {
          const rows: any = await rqRes.json();
          docs = Array.isArray(rows) ? rows.map((r: any) => r?.document).filter(Boolean) : [];
        }
      }
      for (const doc of docs) {
        const parsed = parseFirestorePostDoc(doc);
        if (parsed && parsed.published !== false) {
          items.push(parsed);
        }
      }
    } finally {
      clearTimeout(timer);
    }
  } catch {
    // Graceful fallback
  }

  if (items.length > 0 || !allFirestorePostsCache) {
    allFirestorePostsCache = {
      expiresAt: Date.now() + CACHE_TTL_MS,
      value: items,
    };
  }
  return items;
}

export async function fetchAllFirestoreNews(bypassCache = false): Promise<NewsRecord[]> {
  if (!bypassCache && allFirestoreNewsCache && allFirestoreNewsCache.expiresAt > Date.now()) {
    return allFirestoreNewsCache.value;
  }

  const { projectId, databaseId, apiKey } = getFirebaseConfig();
  const items: NewsRecord[] = [];
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    try {
      const listUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents/news_items?pageSize=200${apiKey ? `&key=${encodeURIComponent(apiKey)}` : ''}`;
      const res = await fetch(listUrl, { signal: controller.signal });
      if (res.ok) {
        const data: any = await res.json();
        const docs = Array.isArray(data.documents) ? data.documents : [];
        for (const doc of docs) {
          const parsed = parseFirestoreNewsDoc(doc);
          if (parsed && parsed.published !== false) {
            items.push(parsed);
          }
        }
      }
    } finally {
      clearTimeout(timer);
    }
  } catch {
    // Graceful fallback
  }

  if (items.length > 0 || !allFirestoreNewsCache) {
    allFirestoreNewsCache = {
      expiresAt: Date.now() + CACHE_TTL_MS,
      value: items,
    };
  }
  return items;
}

export function readMarkdownPostBySlug(canonicalSlug: string): BlogRecord | null {
  if (!canonicalSlug || canonicalSlug === 'layer-1-auto-fix-verification') return null;
  const mdFilePath = path.join(process.cwd(), 'content', 'blog', `${canonicalSlug}.md`);
  if (!fs.existsSync(mdFilePath)) return null;

  try {
    const stat = fs.statSync(mdFilePath);
    const cached = markdownBlogCache.get(canonicalSlug);
    if (cached && cached.mtimeMs === stat.mtimeMs) {
      return cached.value;
    }

    const rawMd = fs.readFileSync(mdFilePath, 'utf-8');
    let bodyMd = rawMd;
    let meta: Record<string, any> = {};

    const jsonFmMatch = rawMd.match(/^---\s*\r?\n(\{[\s\S]*?\})\r?\n---\s*/);
    if (jsonFmMatch) {
      bodyMd = rawMd.slice(jsonFmMatch[0].length);
      meta = JSON.parse(jsonFmMatch[1]);
    } else {
      const yamlMatch = rawMd.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*/);
      if (yamlMatch) {
        bodyMd = rawMd.slice(yamlMatch[0].length);
        for (const line of yamlMatch[1].split(/\r?\n/)) {
          const kv = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.+)$/);
          if (kv) {
            meta[kv[1].trim()] = kv[2].trim().replace(/^["']|["']$/g, '');
          }
        }
      }
    }

    const syncedMs = meta.syncedAt ? Date.parse(String(meta.syncedAt)) || stat.mtimeMs : stat.mtimeMs;
    const cmsMs = meta.cmsUpdatedAt ? Date.parse(String(meta.cmsUpdatedAt)) || syncedMs : 0;

    const record: BlogRecord = {
      slug: canonicalSlug,
      title: String(meta.title || canonicalSlug).trim(),
      seoTitle: meta.seoTitle ? String(meta.seoTitle).trim() : undefined,
      heroSubtitle: meta.heroSubtitle ? String(meta.heroSubtitle).trim() : undefined,
      excerpt: String(meta.excerpt || '').trim(),
      metaDescription: String(meta.metaDescription || meta.excerpt || '').trim(),
      content: bodyMd.trim(),
      coverImage: String(meta.coverImage || '/logo.png').trim(),
      coverImageAlt: String(meta.coverImageAlt || '').trim(),
      author: String(meta.author || DEFAULT_AUTHOR).trim(),
      category: String(meta.category || 'Business').trim(),
      tags: Array.isArray(meta.tags) ? meta.tags.map(String) : [],
      published: meta.published !== false && String(meta.published).toLowerCase() !== 'false',
      createdAt: String(meta.publishedAt || meta.createdAt || '2026-11-01').slice(0, 10),
      updatedAtMs: Math.max(stat.mtimeMs, syncedMs),
      cmsUpdatedAtMs: cmsMs,
      source: 'markdown',
    };

    markdownBlogCache.set(canonicalSlug, { mtimeMs: stat.mtimeMs, value: record });
    return record;
  } catch {
    return null;
  }
}

export function readAllMarkdownPosts(): BlogRecord[] {
  const dir = path.join(process.cwd(), 'content', 'blog');
  if (!fs.existsSync(dir)) return [];
  const results: BlogRecord[] = [];
  const seen = new Set<string>();
  try {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
    for (const file of files) {
      const rawSlug = file.replace(/\.md$/, '');
      if (rawSlug === 'layer-1-auto-fix-verification') continue;
      const canonical = resolveCanonicalBlogSlug(rawSlug);
      if (!canonical || seen.has(canonical)) continue;
      const rec = readMarkdownPostBySlug(canonical) || readMarkdownPostBySlug(rawSlug);
      if (rec && rec.published !== false) {
        rec.slug = canonical;
        seen.add(canonical);
        results.push(rec);
      }
    }
  } catch {}
  return results;
}

export function resolveLocalBlogCover(inputUrl: string, slug: string): string {
  const trimmed = String(inputUrl || '').trim();
  if (trimmed && KNOWN_COVER_MAP[trimmed]) {
    return KNOWN_COVER_MAP[trimmed];
  }
  if (trimmed && REMOTE_TO_LOCAL_COVER_MAP[trimmed]) {
    return REMOTE_TO_LOCAL_COVER_MAP[trimmed];
  }
  const coverDirs = [
    path.join(process.cwd(), 'dist', 'images', 'blog-covers'),
    path.join(process.cwd(), 'public', 'images', 'blog-covers'),
  ];
  const hasAnyCoverDir = coverDirs.some((d) => fs.existsSync(d));
  const safePrefix = slug.replace(/[^a-z0-9-_]/gi, '-').slice(0, 60);
  for (const dir of coverDirs) {
    try {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        const exact = files.find((f) => f === `${slug}.webp` || f === `${safePrefix}.webp`);
        if (exact) return `/images/blog-covers/${exact}`;
        const hashed = files.find((f) => f.startsWith(`${safePrefix}-`) && f.endsWith('.webp'));
        if (hashed) return `/images/blog-covers/${hashed}`;
      }
    } catch {}
  }
  if (SLUG_TO_LOCAL_COVER_MAP[slug]) {
    return SLUG_TO_LOCAL_COVER_MAP[slug];
  }
  if (trimmed.startsWith('/images/blog-covers/')) {
    if (!hasAnyCoverDir) {
      return trimmed;
    }
    const relPath = trimmed.replace(/^\/+/, '');
    if (
      fs.existsSync(path.join(process.cwd(), 'dist', relPath)) ||
      fs.existsSync(path.join(process.cwd(), 'public', relPath))
    ) {
      return trimmed;
    }
    return '/images/hero-abuqitmirlabs.webp';
  }
  if (trimmed && !trimmed.includes('postimg.cc') && !trimmed.includes('logo.png')) {
    return trimmed;
  }
  if (trimmed.startsWith('/images/')) return trimmed;
  return fs.existsSync(path.join(process.cwd(), 'public', 'images', 'blog-covers', `${slug}.webp`))
    ? `/images/blog-covers/${slug}.webp`
    : '/images/hero-abuqitmirlabs.webp';
}

function formatInlineHtml(rawStr: string): string {
  const parts: string[] = [];
  let lastIdx = 0;
  const tokenRe = /!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*\n]+)\*/g;
  let m: RegExpExecArray | null;
  while ((m = tokenRe.exec(rawStr)) !== null) {
    if (m.index > lastIdx) {
      parts.push(escapeHtml(rawStr.slice(lastIdx, m.index)));
    }
    if (m[1] !== undefined && m[2] !== undefined) {
      let cleanSrc = m[2].trim();
      if (cleanSrc.startsWith(SITE_URL)) cleanSrc = cleanSrc.replace(SITE_URL, '') || '/';
      parts.push(`<img src="${escapeHtml(cleanSrc)}" alt="${escapeHtml(m[1].trim() || 'Illustration')}" loading="lazy" class="rounded-2xl my-6 max-w-full h-auto border border-zinc-800" />`);
    } else if (m[3] !== undefined && m[4] !== undefined) {
      const cleanLabel = m[3].replace(/\*\*/g, '').trim();
      let cleanHref = m[4].trim();
      if (cleanHref.startsWith(SITE_URL)) {
        cleanHref = cleanHref.replace(SITE_URL, '') || '/';
      }
      const isExternal = /^https?:\/\//i.test(cleanHref);
      const relAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      parts.push(`<a href="${escapeHtml(cleanHref)}"${relAttr} class="text-[#ccff00] underline">${escapeHtml(cleanLabel)}</a>`);
    } else if (m[5] !== undefined) {
      parts.push(`<code class="bg-zinc-900 text-[#ccff00] px-1.5 py-0.5 rounded font-mono text-sm">${escapeHtml(m[5])}</code>`);
    } else if (m[6] !== undefined) {
      parts.push(`<strong>${escapeHtml(m[6].trim())}</strong>`);
    } else if (m[7] !== undefined) {
      parts.push(`<em>${escapeHtml(m[7].trim())}</em>`);
    }
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < rawStr.length) {
    parts.push(escapeHtml(rawStr.slice(lastIdx)));
  }
  return parts.join('');
}

export function renderMarkdownToSemanticHtml(
  rawMarkdown: string,
  options?: { cleanH1?: string; slug?: string }
): { htmlBlocks: string[]; extractedFaqs: Array<{ question: string; answer: string }> } {
  const cleanH1 = options?.cleanH1 || '';
  const slug = options?.slug || '';

  let raw = String(rawMarkdown || '')
    .replace(/^---\s*\r?\n\{[\s\S]*?\}\r?\n---\s*/, '')
    .replace(/^---\s*\r?\n[A-Za-z0-9_]+\s*:[\s\S]*?\r?\n---\s*/, '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '');

  const normalizedRawContent = raw
    .replace(/\bit and product leaders\b/g, 'IT and product leaders')
    .replace(/\bcontent and seo teams\b/gi, (m) => (m.startsWith('C') ? 'Content and SEO teams' : 'content and SEO teams'))
    .replace(/\bconsidering ai agents\b/gi, 'considering AI agents')
    .replace(/\bsearch and ai engines\b/gi, 'search and AI engines')
    .replace(/\bseo and web development\b/g, 'SEO and web development')
    .replace(/\bseo content writing\b/g, 'SEO content writing')
    .replace(/requirements—not on whether/g, 'requirements, not on whether')
    .replace(/\s+—\s+/g, ' - ')
    .replace(/([A-Za-z0-9'"])—([A-Za-z0-9'"])/g, '$1, $2');

  let lines = normalizedRawContent.trim().split(/\r?\n/);
  const isMetaOrDivider = (l: string) => {
    const t = (l || '').trim();
    return t === '' || t === '---' || /^(?:\*\*)?by\s+abu\s*qitmir/i.test(t) || /^\*by\s+abu\s*qitmir/i.test(t);
  };
  while (lines.length > 0 && isMetaOrDivider(lines[0])) {
    lines.shift();
  }

  if (lines.length > 0) {
    const first = lines[0].trim();
    if (/^#\s+/.test(first)) {
      let lookahead = 1;
      while (lookahead < lines.length && isMetaOrDivider(lines[lookahead])) {
        lookahead++;
      }
      if (lookahead < lines.length && /^#{2,3}\s+/.test(lines[lookahead].trim())) {
        lines = lines.slice(lookahead);
      } else {
        const stripped = first.replace(/^#\s+/, '').replace(/\s*\|\s*AbuQitmirLabs.*$/i, '').trim();
        if (cleanH1 && stripped.toLowerCase() === cleanH1.toLowerCase()) {
          lines.shift();
        } else {
          lines[0] = `## ${stripped || cleanH1 || 'Overview'}`;
        }
      }
    }
    if (lines.length > 0 && /^###\s+/.test(lines[0].trim())) {
      lines[0] = `## ${lines[0].trim().replace(/^###\s+/, '').replace(/\s*\|\s*AbuQitmirLabs.*$/i, '').trim()}`;
    } else if (lines.length > 0 && /^##\s+/.test(lines[0].trim())) {
      lines[0] = `## ${lines[0].trim().replace(/^##\s+/, '').replace(/\s*\|\s*AbuQitmirLabs.*$/i, '').trim()}`;
    } else if (lines.length > 0 && cleanH1 && !lines.some((l) => /^#{2,6}\s+/.test(l.trim()))) {
      lines.unshift(`## ${cleanH1}`, '');
    }
  }

  let h2BeforeFaq = 0;
  let h3BeforeFaq = 0;
  let inPreCheck = false;
  let reachedFaqCheck = false;
  for (const l of lines) {
    const t = l.trim();
    if (t.startsWith('```')) {
      inPreCheck = !inPreCheck;
      continue;
    }
    if (inPreCheck) continue;
    if (/^#{2,3}\s+(?:frequently asked questions|\bfaq\b)/i.test(t)) {
      reachedFaqCheck = true;
      continue;
    }
    if (!reachedFaqCheck) {
      if (/^##\s+/.test(t)) h2BeforeFaq++;
      else if (/^###\s+/.test(t)) h3BeforeFaq++;
    }
  }
  const promoteOrphanH3 = h2BeforeFaq <= 1 && h3BeforeFaq >= 3;

  const htmlBlocks: string[] = [];
  const extractedFaqs: Array<{ question: string; answer: string }> = [];
  const seenHeadings = new Set<string>();
  if (cleanH1) seenHeadings.add(cleanH1.toLowerCase().trim());

  let inFaqSection = false;
  let currentFaqQuestion = '';
  let currentFaqAnswerParts: string[] = [];
  let tableRows: string[][] = [];
  let ulItems: string[] = [];
  let olItems: Array<{ text: string; subItems: string[] }> = [];
  let blockquoteLines: string[] = [];
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];

  const flushBlockquote = () => {
    if (blockquoteLines.length === 0) return;
    htmlBlocks.push(
      `<blockquote class="border-l-4 border-[#ccff00] bg-zinc-900/60 px-6 py-4 my-6 rounded-r-xl text-neutral-200 italic">${blockquoteLines
        .map((q) => `<p class="mb-2 last:mb-0">${formatInlineHtml(q)}</p>`)
        .join('')}</blockquote>`
    );
    blockquoteLines = [];
  };

  const flushLists = () => {
    if (ulItems.length > 0) {
      htmlBlocks.push(
        `<ul class="list-disc pl-6 my-4 space-y-2 text-neutral-300">${ulItems
          .map((item) => `<li>${formatInlineHtml(item)}</li>`)
          .join('')}</ul>`
      );
      ulItems = [];
    }
    if (olItems.length > 0) {
      htmlBlocks.push(
        `<ol class="list-decimal pl-6 my-4 space-y-2 text-neutral-300">${olItems
          .map((item) => {
            const subHtml =
              item.subItems.length > 0
                ? `<ul class="list-disc pl-6 mt-2 space-y-1 text-neutral-300">${item.subItems
                    .map((sub) => `<li>${formatInlineHtml(sub)}</li>`)
                    .join('')}</ul>`
                : '';
            return `<li>${formatInlineHtml(item.text)}${subHtml}</li>`;
          })
          .join('')}</ol>`
      );
      olItems = [];
    }
  };

  const flushTable = () => {
    if (tableRows.length === 0) return;
    const headerRow = tableRows[0];
    const bodyRows = tableRows.slice(1);
    const thead = `<thead><tr>${headerRow
      .map((c) => `<th class="border border-zinc-800 p-3 text-left font-bold">${formatInlineHtml(c)}</th>`)
      .join('')}</tr></thead>`;
    const tbody =
      bodyRows.length > 0
        ? `<tbody>${bodyRows
            .map(
              (r) =>
                `<tr>${r
                  .map((c) => `<td class="border border-zinc-800 p-3">${formatInlineHtml(c)}</td>`)
                  .join('')}</tr>`
            )
            .join('')}</tbody>`
        : '';
    htmlBlocks.push(
      `<div class="overflow-x-auto my-6"><table class="w-full border-collapse border border-zinc-800">${thead}${tbody}</table></div>`
    );
    tableRows = [];
  };

  const flushFaq = () => {
    if (currentFaqQuestion && currentFaqAnswerParts.length > 0) {
      const cleanQ = currentFaqQuestion.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      const cleanA = currentFaqAnswerParts.join(' ').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      if (cleanQ && cleanA) {
        extractedFaqs.push({ question: cleanQ, answer: cleanA });
      }
    }
    currentFaqQuestion = '';
    currentFaqAnswerParts = [];
  };

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    const trimmed = line.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();

    if (trimmed.startsWith('```')) {
      flushLists();
      flushTable();
      flushBlockquote();
      if (inCodeBlock) {
        htmlBlocks.push(
          `<pre class="bg-zinc-950 border border-zinc-800 rounded-xl p-4 overflow-x-auto my-6 font-mono text-sm text-zinc-200"><code>${escapeHtml(
            codeBlockLines.join('\n')
          )}</code></pre>`
        );
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }
    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    if (!trimmed) {
      flushBlockquote();
      let nextNonEmpty = '';
      let nextNonEmptyRaw = '';
      for (let k = lineIdx + 1; k < lines.length; k++) {
        const candRaw = lines[k].replace(/[\u200B-\u200D\uFEFF]/g, '');
        const cand = candRaw.trim();
        if (cand) {
          nextNonEmpty = cand;
          nextNonEmptyRaw = candRaw;
          break;
        }
      }
      const continuesUl = ulItems.length > 0 && /^[-*+]\s+/.test(nextNonEmpty);
      const continuesOl =
        olItems.length > 0 &&
        (/^\d+[\.\)]\s+/.test(nextNonEmpty) || /^[ \t]{2,}[-*+]\s+/.test(nextNonEmptyRaw));
      if (!continuesUl && !continuesOl) {
        flushLists();
      }
      flushTable();
      continue;
    }

    if (trimmed === '---' || /^\*?(\*\*)?By\s+Abu\s*Qitmir/i.test(trimmed)) {
      flushLists();
      flushTable();
      flushBlockquote();
      continue;
    }

    if (trimmed.startsWith('>')) {
      flushLists();
      flushTable();
      const qLine = trimmed.replace(/^>\s?/, '').trim();
      if (qLine) blockquoteLines.push(qLine);
      continue;
    } else {
      flushBlockquote();
    }

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushLists();
      const cells = trimmed
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim());
      if (cells.every((c) => /^:?-{2,}:?$/.test(c))) {
        continue;
      }
      tableRows.push(cells);
      continue;
    } else {
      flushTable();
    }

    const rawHeadingMatch = trimmed.match(/^(?:\*\*)?(#{1,6})[\s\u00A0]+(.+?)(?:\*\*)?\s*#*$/);
    if (rawHeadingMatch) {
      flushLists();
      flushFaq();
      let level = rawHeadingMatch[1].length;
      if (level === 1) level = 2;
      let hText = rawHeadingMatch[2]
        .replace(/\{#[a-z0-9_-]+\}\s*$/i, '')
        .replace(/\*\*/g, '')
        .replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '')
        .replace(/\s*\(Frequently Asked Questions\)\s*$/i, '')
        .trim();
      if (/^[a-z]/.test(hText)) {
        hText = hText.charAt(0).toUpperCase() + hText.slice(1);
      }
      if (/^introduction$/i.test(hText) && slug === 'how-to-build-personal-brand-online') {
        hText = 'Introduction: Why Positioning Beats Volume';
      }
      const isFaqSectionHeader = /^(?:frequently asked questions|faqs?)(?:\s*[:—–-].*)?$/i.test(hText);
      if (level === 3 && isFaqSectionHeader) {
        level = 2;
      } else if (level === 3 && promoteOrphanH3 && !inFaqSection) {
        level = 2;
      } else if (level === 2 && inFaqSection && !isFaqSectionHeader && hText.endsWith('?')) {
        level = 3;
      }

      const normKey = `${level}:${hText.toLowerCase().trim()}`;
      if (cleanH1 && hText.toLowerCase().trim() === cleanH1.toLowerCase().trim() && level === 2) {
        continue;
      }
      if (seenHeadings.has(normKey)) {
        continue;
      }
      seenHeadings.add(normKey);

      if (level === 2) {
        inFaqSection = isFaqSectionHeader;
        htmlBlocks.push(`<h2 id="${slugifyId(hText)}" class="text-2xl font-bold mt-10 mb-4">${escapeHtml(hText)}</h2>`);
      } else if (level === 3) {
        if (inFaqSection || hText.endsWith('?')) {
          currentFaqQuestion = hText.replace(/^\d+[\.\)]\s*/, '').trim();
        }
        htmlBlocks.push(`<h3 id="${slugifyId(hText)}" class="text-xl font-bold mt-6 mb-3">${escapeHtml(hText)}</h3>`);
      } else {
        htmlBlocks.push(`<h4 id="${slugifyId(hText)}" class="text-lg font-bold mt-5 mb-2">${escapeHtml(hText)}</h4>`);
      }
    } else if (/^[-*+]\s+/.test(trimmed)) {
      const liRaw = trimmed.replace(/^[-*+]\s+/, '').replace(/^\[[ xX]\]\s+/, '');
      if (olItems.length > 0 && /^[ \t]{2,}[-*+]\s+/.test(line.replace(/[\u200B-\u200D\uFEFF]/g, ''))) {
        olItems[olItems.length - 1].subItems.push(liRaw);
      } else {
        if (olItems.length > 0) flushLists();
        ulItems.push(liRaw);
      }
    } else if (/^\d+[\.\)]\s+/.test(trimmed)) {
      if (ulItems.length > 0) flushLists();
      olItems.push({ text: trimmed.replace(/^\d+[\.\)]\s+/, ''), subItems: [] });
    } else if (/^!\[([^\]]*)\]\(([^)]+)\)$/.test(trimmed)) {
      flushLists();
      const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imgMatch) {
        let src = imgMatch[2].trim();
        if (src.startsWith(SITE_URL)) src = src.replace(SITE_URL, '') || '/';
        const alt = imgMatch[1].trim() || cleanH1 || 'Illustration';
        htmlBlocks.push(
          `<figure class="my-8"><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" class="rounded-2xl w-full h-auto border border-zinc-800" />${
            imgMatch[1].trim()
              ? `<figcaption class="text-xs text-zinc-400 mt-2 font-mono">${escapeHtml(imgMatch[1].trim())}</figcaption>`
              : ''
          }</figure>`
        );
      }
    } else {
      flushLists();
      const cleanTxt = trimmed
        .replace(/<[^>]*>/g, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
        .trim();
      if (currentFaqQuestion && cleanTxt) currentFaqAnswerParts.push(cleanTxt);
      htmlBlocks.push(`<p class="text-neutral-300 mb-4 leading-relaxed">${formatInlineHtml(trimmed)}</p>`);
    }
  }
  flushBlockquote();
  flushLists();
  flushTable();
  flushFaq();

  return { htmlBlocks, extractedFaqs };
}

export function renderStaticHeader(): string {
  return `<header class="fixed top-0 left-0 w-full z-[100] transition-all duration-300 h-20 md:h-24 flex items-center bg-transparent">
  <div class="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex items-center justify-between">
    <a href="/" class="flex flex-col no-underline group transition-all duration-300" aria-label="AbuQitmirLabs Home">
      <div class="flex flex-col leading-[0.8]">
        <span class="text-[#0066ff] font-black text-xl md:text-2xl tracking-tighter uppercase group-hover:text-white transition-colors">ABUQITMIR</span>
        <div class="bg-[#ccff00] text-black text-[10px] md:text-[11px] font-black px-2 py-0.5 rounded-sm tracking-[0.1em] uppercase self-start mt-1">LABS.TECH</div>
      </div>
    </a>
    <nav role="navigation" aria-label="Main Navigation" class="hidden xl:flex items-center gap-4 2xl:gap-7">
      <a href="/" class="text-xs xl:text-sm font-semibold text-gray-300 hover:text-white">Home</a>
      <a href="/custom-software" class="text-xs xl:text-sm font-semibold text-gray-300 hover:text-white">Services</a>
      <a href="/solutions/fintech" class="text-xs xl:text-sm font-semibold text-gray-300 hover:text-white">Solutions</a>
      <a href="/about/our-company" class="text-xs xl:text-sm font-semibold text-gray-300 hover:text-white">About</a>
      <a href="/blog" class="text-xs xl:text-sm font-semibold text-[#ccff00]">Resources</a>
    </nav>
    <div class="flex items-center gap-3 shrink-0">
      <a href="/contact" class="inline-flex items-center justify-center px-5 py-2.5 bg-[#ccff00] !text-black font-black text-xs uppercase tracking-wider rounded-full">Contact Now</a>
    </div>
  </div>
</header>`;
}

export function renderStaticFooter(): string {
  return `<footer class="border-t border-white/10 bg-[#050505] text-zinc-400 py-14 mt-16">
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
    <div>
      <p class="text-white font-black uppercase tracking-wider mb-3">AbuQitmirLabs</p>
      <p class="leading-relaxed">Karachi-based growth engineering studio delivering custom software, AI agents, and technical SEO for global B2B teams.</p>
    </div>
    <div>
      <p class="text-white font-bold uppercase tracking-wider mb-3">Services</p>
      <ul class="space-y-2 list-none p-0 m-0">
        <li><a href="/custom-software" class="hover:text-[#ccff00]">Custom Software</a></li>
        <li><a href="/web-development" class="hover:text-[#ccff00]">Web Development</a></li>
        <li><a href="/ai-agent-development" class="hover:text-[#ccff00]">AI Agent Development</a></li>
        <li><a href="/seo-mastery" class="hover:text-[#ccff00]">SEO &amp; GEO Engineering</a></li>
      </ul>
    </div>
    <div>
      <p class="text-white font-bold uppercase tracking-wider mb-3">Resources</p>
      <ul class="space-y-2 list-none p-0 m-0">
        <li><a href="/blog" class="hover:text-[#ccff00]">Engineering Blog</a></li>
        <li><a href="/news/latest" class="hover:text-[#ccff00]">News &amp; Releases</a></li>
        <li><a href="/case-studies/tajweedpage" class="hover:text-[#ccff00]">Case Studies</a></li>
        <li><a href="/tools" class="hover:text-[#ccff00]">Free Tools</a></li>
      </ul>
    </div>
    <div>
      <p class="text-white font-bold uppercase tracking-wider mb-3">Company</p>
      <ul class="space-y-2 list-none p-0 m-0">
        <li><a href="/about/our-company" class="hover:text-[#ccff00]">Our Company</a></li>
        <li><a href="/about/our-team" class="hover:text-[#ccff00]">Our Team</a></li>
        <li><a href="/editorial-policy" class="hover:text-[#ccff00]">Editorial Policy</a></li>
        <li><a href="/contact" class="hover:text-[#ccff00]">Contact Us</a></li>
      </ul>
    </div>
  </div>
</footer>`;
}

export function replaceRootElement(htmlSource: string, newInnerHtml: string, renderedRouteAttr?: string): string {
  const startMatch = htmlSource.match(/<div\s+id=["']root["'][^>]*>/i);
  if (!startMatch || startMatch.index === undefined) {
    return htmlSource;
  }
  const startIdx = startMatch.index;
  const scriptOrBodyMatch = htmlSource.slice(startIdx).match(/(<script\b|<\/body>)/i);
  if (scriptOrBodyMatch && scriptOrBodyMatch.index !== undefined) {
    const segment = htmlSource.slice(startIdx, startIdx + scriptOrBodyMatch.index);
    const lastCloseDivIdx = segment.lastIndexOf('</div>');
    if (lastCloseDivIdx !== -1) {
      const endIdx = startIdx + lastCloseDivIdx + '</div>'.length;
      const attrStr = renderedRouteAttr ? ` data-rendered-route="${renderedRouteAttr}"` : '';
      const newRoot = `<div id="root"${attrStr}>${newInnerHtml}</div>`;
      return htmlSource.slice(0, startIdx) + newRoot + htmlSource.slice(endIdx);
    }
  }
  const attrStr = renderedRouteAttr ? ` data-rendered-route="${renderedRouteAttr}"` : '';
  return htmlSource.replace(/<div id="root"[^>]*>[\s\S]*?<\/div>/i, () => `<div id="root"${attrStr}>${newInnerHtml}</div>`);
}

export function loadHtmlShell(customShellHtml?: string, forViteDev = false): string {
  let shellHtml = customShellHtml || '';
  if (!shellHtml) {
    const candidates = forViteDev
      ? [
          path.join(process.cwd(), 'index.html'),
          path.join(process.cwd(), 'dist', 'spa-shell.html'),
          path.join(process.cwd(), 'dist', 'index.html'),
        ]
      : [
          path.join(process.cwd(), 'dist', 'spa-shell.html'),
          path.join(process.cwd(), 'dist', 'index.html'),
          path.join(process.cwd(), 'index.html'),
        ];
    for (const sc of candidates) {
      if (fs.existsSync(sc)) {
        shellHtml = fs.readFileSync(sc, 'utf-8');
        break;
      }
    }
  }
  if (shellHtml && forViteDev) {
    shellHtml = shellHtml.replace(/<script\b[^>]*src=["']\/assets\/[^"']+\.js["'][^>]*><\/script>/gi, '');
    if (!shellHtml.includes('/src/main.tsx')) {
      shellHtml = shellHtml.replace('</body>', '  <script type="module" src="/src/main.tsx"></script>\n  </body>');
    }
  }
  return shellHtml;
}

export function syncDistAssetHashes(html: string): string {
  const candidates = [
    path.join(process.cwd(), 'dist', 'spa-shell.html'),
    path.join(process.cwd(), 'dist', 'index.html'),
  ];
  for (const sc of candidates) {
    if (fs.existsSync(sc)) {
      const shellContent = fs.readFileSync(sc, 'utf-8');
      const currentCss = shellContent.match(/\/assets\/index-[^"'>]+\.css/i)?.[0];
      const currentJs = shellContent.match(/\/assets\/index-[^"'>]+\.js/i)?.[0];
      if (currentCss) {
        html = html.replace(/\/assets\/index-[^"'>]+\.css/gi, () => currentCss);
      }
      if (currentJs) {
        html = html.replace(/\/assets\/index-[^"'>]+\.js/gi, () => currentJs);
      }
      break;
    }
  }
  return html;
}

export function injectHeadRootAndState(options: {
  shellHtml: string;
  routeUrl: string;
  seoHeadBlock: string;
  innerRootHtml: string;
  stateScripts?: string;
}): string {
  const { shellHtml, routeUrl, seoHeadBlock, innerRootHtml, stateScripts = '' } = options;
  if (!shellHtml) {
    return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n${seoHeadBlock}\n</head>\n<body>\n  <div id="root" data-rendered-route="${escapeHtml(routeUrl)}">${innerRootHtml}</div>\n  ${stateScripts}\n</body>\n</html>`;
  }

  let cleanedShell = shellHtml
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b[^>]*name=["']description["'][^>]*\/?>/gi, '')
    .replace(/<meta\b[^>]*name=["']author["'][^>]*\/?>/gi, '')
    .replace(/<meta\b[^>]*name=["']robots["'][^>]*\/?>/gi, '')
    .replace(/<meta\b[^>]*name=["']keywords["'][^>]*\/?>/gi, '')
    .replace(/<meta\b[^>]*property=["']og:[^"']+["'][^>]*\/?>/gi, '')
    .replace(/<meta\b[^>]*name=["']twitter:[^"']+["'][^>]*\/?>/gi, '')
    .replace(/<meta\b[^>]*property=["']article:[^"']+["'][^>]*\/?>/gi, '')
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*\/?>/gi, '')
    .replace(/<link\b[^>]*rel=["']llms["'][^>]*\/?>/gi, '')
    .replace(/<link\b[^>]*rel=["']alternate["'][^>]*hreflang=["'][^"']+["'][^>]*\/?>/gi, '')
    .replace(/<link\b[^>]*href=["']\/images\/hero-abuqitmirlabs\.webp["'][^>]*\/?>/gi, '')
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gis, '')
    .replace(/<script\b[^>]*id=["']__SSR_[^"']+["'][^>]*>[\s\S]*?<\/script>/gis, '')
    .replace(/(\r?\n[ \t]*){2,}/g, '\n');

  if (/<meta\s+name=["']viewport["'][^>]*>/i.test(cleanedShell)) {
    cleanedShell = cleanedShell.replace(/(<meta\s+name=["']viewport["'][^>]*>)/i, (match) => `${match}\n${seoHeadBlock}`);
  } else {
    cleanedShell = cleanedShell.replace('</head>', () => `${seoHeadBlock}\n</head>`);
  }

  let finalHtml = replaceRootElement(cleanedShell, innerRootHtml, routeUrl);
  if (stateScripts) {
    finalHtml = finalHtml.replace('</body>', () => `  ${stateScripts}\n</body>`);
  }
  return finalHtml;
}

function render404HtmlPage(titleText: string, bodyHeading: string, returnHref: string, returnLabel: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${escapeHtml(
    titleText
  )} | AbuQitmirLabs</title><meta name="robots" content="noindex, follow" /></head><body style="background:#050505;color:#fff;font-family:sans-serif;padding:4rem;text-align:center"><main><h1>${escapeHtml(
    bodyHeading
  )}</h1><p style="margin-top:1rem;"><a href="${escapeHtml(returnHref)}" style="color:#ccff00">${escapeHtml(
    returnLabel
  )}</a></p></main></body></html>`;
}

function buildOrgLocalWebsiteNodes() {
  return [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'AbuQitmirLabs',
      alternateName: 'AbuQitmirLabs',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.png`,
      foundingDate: '2021',
      sameAs: [
        'https://www.linkedin.com/in/abu-qitmir-697423390/',
        'https://www.facebook.com/profile.php?id=61583768706452',
        'https://www.instagram.com/abuqitmirshirazalmadani/',
        'https://x.com/AbuQitmir',
        'https://www.youtube.com/@AbuQitmir',
        'https://clutch.co/profile/abuqitmirlabstech',
        'https://www.goodfirms.co/company/abuqitmirlabs-tech',
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#localbusiness`,
      name: 'AbuQitmirLabs',
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/logo.png`,
      telephone: '+923233260859',
      email: 'hello@abuqitmirlabs.tech',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Shahrah-e-Faisal, PECHS',
        addressLocality: 'Karachi',
        addressRegion: 'Sindh',
        postalCode: '75400',
        addressCountry: 'PK',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 24.8607,
        longitude: 67.0642,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '10:00',
          closes: '20:00',
        },
      ],
      areaServed: {
        '@type': 'Country',
        name: 'Pakistan',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'AbuQitmirLabs',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ];
}

export async function resolveBestBlogPost(
  canonicalSlug: string,
  bypassCache = false
): Promise<{ post: BlogRecord | null; hasUnpublishedDraft: boolean; mdMtimeMs: number }> {
  const mdPost = readMarkdownPostBySlug(canonicalSlug);
  const fsPost = await fetchFirestorePostBySlug(canonicalSlug, bypassCache);

  const mdMtimeMs = mdPost?.updatedAtMs || 0;

  if (fsPost && fsPost.published === false && (!mdPost || fsPost.updatedAtMs >= mdMtimeMs)) {
    return { post: null, hasUnpublishedDraft: true, mdMtimeMs };
  }
  if (mdPost && mdPost.published === false && (!fsPost || mdMtimeMs >= fsPost.updatedAtMs)) {
    return { post: null, hasUnpublishedDraft: true, mdMtimeMs };
  }

  if (!mdPost && fsPost && fsPost.published !== false) {
    return { post: fsPost, hasUnpublishedDraft: false, mdMtimeMs: 0 };
  }
  if (mdPost && mdPost.published !== false && !fsPost) {
    return { post: mdPost, hasUnpublishedDraft: false, mdMtimeMs };
  }
  if (mdPost && fsPost && fsPost.published !== false) {
    // Respect AGENTS_md Rule 9: curated markdown is preferred over legacy Firestore docs,
    // UNLESS Firestore carries an explicit post-curation CMS edit timestamp strictly newer than markdown.
    const fsIsNewerCmsEdit =
      fsPost.cmsUpdatedAtMs > 0 &&
      fsPost.cmsUpdatedAtMs > mdMtimeMs + 2000 &&
      fsPost.content.trim().length >= 200;

    if (fsIsNewerCmsEdit) {
      return { post: fsPost, hasUnpublishedDraft: false, mdMtimeMs };
    }
    return { post: mdPost, hasUnpublishedDraft: false, mdMtimeMs };
  }

  return { post: null, hasUnpublishedDraft: false, mdMtimeMs: 0 };
}

export async function renderBlogPostSsrHtml(options: {
  rawSlug: string;
  shellHtml?: string;
  forViteDev?: boolean;
  forceLive?: boolean;
}): Promise<SsrRenderResult> {
  const cleanInputSlug = String(options.rawSlug || '')
    .replace(/^\/+/, '')
    .replace(/^blog\/+/, '')
    .replace(/\/+$/, '')
    .trim();

  if (!cleanInputSlug) {
    return { status: 301, redirectLocation: '/blog' };
  }

  const canonicalSlug = resolveCanonicalBlogSlug(cleanInputSlug);
  if (canonicalSlug !== cleanInputSlug) {
    return { status: 301, redirectLocation: `/blog/${canonicalSlug}` };
  }

  const staticCandidates = [
    path.join(process.cwd(), 'dist', 'blog', canonicalSlug, 'index.html'),
    path.join(process.cwd(), 'public', 'blog', canonicalSlug, 'index.html'),
  ];
  let bestStaticPath: string | null = null;
  let staticMtimeMs = 0;
  for (const candidate of staticCandidates) {
    if (fs.existsSync(candidate)) {
      bestStaticPath = candidate;
      try {
        staticMtimeMs = fs.statSync(candidate).mtimeMs;
      } catch {}
      break;
    }
  }

  const { post: resolvedPost, hasUnpublishedDraft, mdMtimeMs } = await resolveBestBlogPost(
    canonicalSlug,
    Boolean(options.forceLive)
  );

  if (hasUnpublishedDraft) {
    return {
      status: 404,
      html: render404HtmlPage('404 Not Found', 'Article Not Found', '/blog', 'Return to AbuQitmirLabs Blog'),
    };
  }

  // Decide if static file on disk is still fresh enough or if live dynamic SSR is needed
  const sourceUpdatedMs = resolvedPost
    ? Math.max(mdMtimeMs, resolvedPost.cmsUpdatedAtMs || 0, !bestStaticPath ? Date.now() : 0)
    : 0;
  const staticIsStale =
    Boolean(options.forceLive) ||
    !bestStaticPath ||
    (resolvedPost !== null && sourceUpdatedMs > staticMtimeMs + 2000);

  if (bestStaticPath && !staticIsStale) {
    let html = fs.readFileSync(bestStaticPath, 'utf-8');
    if (options.forViteDev) {
      html = html.replace(/<script\b[^>]*src=["']\/assets\/[^"']+\.js["'][^>]*><\/script>/gi, '');
      if (!html.includes('/src/main.tsx')) {
        html = html.replace('</body>', '  <script type="module" src="/src/main.tsx"></script>\n  </body>');
      }
    } else {
      html = syncDistAssetHashes(html);
    }
    return {
      status: 200,
      html,
      cacheControl: 'public, max-age=0, s-maxage=15, must-revalidate',
    };
  }

  if (!resolvedPost) {
    return {
      status: 404,
      html: render404HtmlPage('404 Not Found', 'Article Not Found', '/blog', 'Return to AbuQitmirLabs Blog'),
    };
  }

  const routeUrl = `/blog/${canonicalSlug}`;
  const fullCanonical = `${SITE_URL}${routeUrl}`;

  const cleanH1 =
    canonicalSlug === 'raast-payment-integration-pakistan'
      ? 'Raast Payment Integration in Pakistan: Merchant Guide'
      : canonicalSlug === 'whatsapp-business-branding-pakistan'
      ? 'WhatsApp Business Branding for Small Businesses in Pakistan'
      : String(resolvedPost.title || canonicalSlug)
          .replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '')
          .replace(/\s*\|\s*The\s*9-Step.*$/i, '')
          .trim();

  const pageTitle =
    canonicalSlug === 'arabic-ux-design-rtl'
      ? 'Arabic UX Design RTL: Why Western Agencies Get It Wrong'
      : canonicalSlug === 'ai-readiness-uae-gcc'
      ? 'GCC AI Readiness Gap: Why 64% of UAE IT Leaders Worry'
      : canonicalSlug === 'brand-consistency-checklist'
      ? 'Brand Consistency Checklist: Find Gaps First'
      : canonicalSlug === 'mobile-app-development-arabic-rtl'
      ? 'Mobile App Development for GCC Markets: Arabic RTL Guide'
      : canonicalSlug === 'zatca-erp-integration-saudi-arabia'
      ? 'ZATCA ERP Integration Saudi Arabia: Practical Guide'
      : canonicalSlug === 'social-media-brand-kit'
      ? 'Social Media Brand Kit: The 5-Step Guide to Consistency'
      : canonicalSlug === 'raast-payment-integration-pakistan'
      ? 'Raast Payment Integration in Pakistan: Merchant Guide'
      : canonicalSlug === 'whatsapp-business-branding-pakistan'
      ? 'WhatsApp Business Branding Pakistan | AbuQitmirLabs'
      : resolvedPost.seoTitle ||
        (/Abu\s*Qitmir\s*Labs/i.test(cleanH1)
          ? cleanH1
          : cleanH1.length <= 44
          ? `${cleanH1} | AbuQitmirLabs`
          : cleanH1.length <= 60
          ? cleanH1
          : `${cleanH1.split(/[:|]/)[0].trim()} | AbuQitmirLabs`);

  const rawDesc = (
    canonicalSlug === 'brand-guidelines-small-business-pakistan'
      ? 'A practical guide for Pakistani SMEs on creating a 1-page brand style guide. Keep your logo, colors, and voice consistent across print and web.'
      : canonicalSlug === 'raast-payment-integration-pakistan'
      ? 'Learn how Pakistani businesses can accept Raast P2M payments through QR, RTP, merchant aliases or IBAN, and connect confirmations to orders and accounting.'
      : resolvedPost.metaDescription || resolvedPost.excerpt || `${cleanH1}: in-depth guide by AbuQitmirLabs.`
  ).trim();
  const metaDesc = clampCleanDesc(rawDesc, 155);

  const rawCover = resolveLocalBlogCover(resolvedPost.coverImage || '', canonicalSlug);
  const ogImageUrl = rawCover.startsWith('/') ? `${SITE_URL}${rawCover}` : rawCover;
  const ogImageAlt =
    resolvedPost.coverImageAlt ||
    (canonicalSlug === 'raast-payment-integration-pakistan'
      ? 'Raast Payment Integration in Pakistan for Merchants'
      : canonicalSlug === 'whatsapp-business-branding-pakistan'
      ? 'Branded WhatsApp Business profile showing logo, description and product catalogue for a Pakistani small business'
      : cleanH1);

  const { htmlBlocks, extractedFaqs } = renderMarkdownToSemanticHtml(resolvedPost.content, {
    cleanH1,
    slug: canonicalSlug,
  });

  const graphNodes: any[] = [
    ...buildOrgLocalWebsiteNodes(),
    {
      '@type': 'WebPage',
      '@id': `${fullCanonical}#webpage`,
      url: fullCanonical,
      name: pageTitle,
      description: metaDesc,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${fullCanonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: cleanH1, item: fullCanonical },
      ],
    },
    {
      '@type': 'Article',
      '@id': `${fullCanonical}#article`,
      isPartOf: { '@id': `${fullCanonical}#webpage` },
      headline: cleanH1,
      description: metaDesc,
      image: ogImageUrl,
      author: {
        '@type': 'Person',
        name: resolvedPost.author || DEFAULT_AUTHOR,
        jobTitle: 'Founder & Lead Systems Architect',
        description:
          'Founder of AbuQitmirLabs (established 2021 in Karachi); M.B.A. Commerce, University of Karachi; 410+ systems and brand builds delivered across 350+ clients.',
        url: `${SITE_URL}/about/our-team`,
        sameAs: ['https://www.linkedin.com/in/abu-qitmir-697423390/', 'https://x.com/AbuQitmir'],
      },
      publisher: { '@id': `${SITE_URL}/#organization` },
      mainEntityOfPage: { '@id': `${fullCanonical}#webpage` },
      datePublished: `${String(resolvedPost.createdAt || '2026-11-01').slice(0, 10)}T00:00:00+00:00`,
      dateModified: `${String(resolvedPost.createdAt || '2026-11-01').slice(0, 10)}T00:00:00+00:00`,
    },
  ];

  if (extractedFaqs.length > 0) {
    graphNodes.push({
      '@type': 'FAQPage',
      '@id': `${fullCanonical}#faq`,
      mainEntity: extractedFaqs.slice(0, 12).map((f) => ({
        '@type': 'Question',
        name: f.question.replace(/<[^>]*>/g, '').trim(),
        acceptedAnswer: { '@type': 'Answer', text: f.answer.replace(/<[^>]*>/g, '').trim() },
      })),
    });
  }

  const ssrPostPayload = JSON.stringify({
    slug: canonicalSlug,
    title: cleanH1,
    seoTitle: pageTitle,
    heroSubtitle: resolvedPost.heroSubtitle || '',
    excerpt: resolvedPost.excerpt || metaDesc,
    metaDescription: metaDesc,
    content: resolvedPost.content || '',
    coverImage: rawCover,
    coverImageAlt: ogImageAlt,
    helperImages: resolvedPost.helperImages || [],
    tags: resolvedPost.tags || [],
    author: resolvedPost.author || DEFAULT_AUTHOR,
    category: resolvedPost.category || 'Business',
    createdAt: String(resolvedPost.createdAt || '2026-11-01').slice(0, 10),
    updatedAtMs: resolvedPost.cmsUpdatedAtMs || resolvedPost.updatedAtMs || Date.now(),
    cmsUpdatedAtMs: resolvedPost.cmsUpdatedAtMs || 0,
  });
  const ssrPostBase64 = Buffer.from(ssrPostPayload, 'utf-8').toString('base64');
  const ssrStateScript = `<script id="__SSR_BLOG_POST__" type="application/json" data-encoding="base64">${ssrPostBase64}</script>`;
  const schemaBlock = `<script id="canonical-schema-graph" type="application/ld+json">\n${JSON.stringify(
    { '@context': 'https://schema.org', '@graph': graphNodes },
    null,
    2
  )}\n</script>`;

  const bylineDate = escapeHtml(String(resolvedPost.createdAt || '2026-11-08').slice(0, 10));
  const bylineAuthor = escapeHtml(resolvedPost.author || DEFAULT_AUTHOR);
  const categoryLabel = escapeHtml(resolvedPost.category || 'Engineering');

  const ssrRelatedCandidates = (
    canonicalSlug === 'whatsapp-business-branding-pakistan'
      ? [
          {
            slug: 'brand-guidelines-small-business-pakistan',
            title: 'Brand Guidelines for Small Business in Pakistan (2026)',
            category: 'Branding',
            excerpt: 'A practical guide for Pakistani SMEs on building a 1-page brand style guide to align logo, colors, typography, and messaging.',
          },
          {
            slug: 'brand-consistency-checklist',
            title: 'Brand Consistency Checklist: Find Gaps First',
            category: 'Branding',
            excerpt: 'Audit social profiles, WhatsApp channels, websites, and sales collateral so customers see one consistent brand everywhere.',
          },
          {
            slug: 'brand-audit-checklist-pakistan',
            title: 'Brand Audit Checklist for Pakistani Businesses',
            category: 'Branding',
            excerpt: '25 practical checks to uncover identity, messaging, and digital channel gaps holding back Pakistani small businesses.',
          },
        ]
      : [
          {
            slug: 'fintech-software-development-compliance-first-architecture',
            title: 'Fintech Software Development: Compliance-First Architecture',
            category: 'Software',
            excerpt: 'Why fintech systems require audit-ready ledgers, deterministic transaction states, role-based access control, and compliance-first software architecture.',
          },
          {
            slug: 'custom-software-for-fintech-2026-financial-technology-development-guide',
            title: 'Custom Software for Fintech in 2026: Financial Technology Development Guide',
            category: 'Software',
            excerpt: 'A complete engineering guide to building custom financial technology, payment workflows, automated reconciliation, and secure banking integrations.',
          },
          {
            slug: 'custom-software-development-company-karachi-pakistan',
            title: 'Custom Software Development Company in Karachi, Pakistan',
            category: 'Development',
            excerpt: 'How AbuQitmirLabs scopes, architects, and delivers production-grade custom business software, ERP integrations, and payment systems from Karachi.',
          },
          {
            slug: 'custom-retail-logistics-software-development-2026-enterprise',
            title: 'Custom Retail & Logistics Software Development Guide (2026)',
            category: 'Software',
            excerpt: 'How growing retailers and logistics operators connect multi-branch POS, inventory, delivery fleets, and automated payment confirmations.',
          },
        ]
  )
    .filter((item) => item.slug !== canonicalSlug)
    .slice(0, 3);

  const ssrRelatedHtml = `<section aria-label="Related Articles" data-testid="related-articles-section" class="mt-16 pt-10 border-t border-zinc-800/80"><h2 class="mb-8 text-2xl md:text-3xl font-black text-white uppercase tracking-tight font-serif">Related Articles</h2><ul class="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0 m-0">${ssrRelatedCandidates
    .map(
      (rel) =>
        `<li class="group bg-[#0b0b0e] border border-zinc-800/80 rounded-[2rem] p-7 flex flex-col justify-between"><div><div class="flex items-center justify-between gap-2 mb-4"><span class="inline-block px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-[10px] font-mono font-bold uppercase tracking-wider">${escapeHtml(
          rel.category
        )}</span></div><h3 class="text-lg font-black text-white leading-snug mb-3 font-serif uppercase tracking-tight"><a href="/blog/${escapeHtml(
          rel.slug
        )}" data-testid="related-article-link" class="hover:text-[#ccff00] transition-colors">${escapeHtml(
          rel.title
        )}</a></h3><p class="text-zinc-400 text-xs leading-relaxed mb-6 font-sans">${escapeHtml(
          rel.excerpt
        )}</p></div><div class="pt-4 border-t border-zinc-800/60"><a href="/blog/${escapeHtml(
          rel.slug
        )}" class="inline-flex items-center justify-between w-full text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 hover:text-[#ccff00]"><span>Read Article</span></a></div></li>`
    )
    .join('')}</ul></section>`;

  const ssrWhatsappCta =
    canonicalSlug === 'whatsapp-business-branding-pakistan'
      ? `<div class="mt-10 rounded-[2rem] border border-[#ccff00]/30 bg-zinc-950 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"><div><h2 class="text-2xl font-black text-white uppercase font-serif">Need Help Setting Up Your WhatsApp Business Brand?</h2><p class="text-zinc-300 text-sm mt-2">Message our Karachi team directly on WhatsApp for profile audits, bilingual templates, and catalogue setup.</p></div><a href="https://wa.me/923233260859?text=Assalamu%20Alaikum%2C%20I%20read%20your%20WhatsApp%20Business%20branding%20guide%20and%20would%20like%20help%20with%20my%20business%20setup." target="_blank" rel="noopener noreferrer" class="px-6 py-3 bg-[#ccff00] text-black font-black text-xs uppercase rounded-xl">WhatsApp par baat karein</a></div>`
      : '';

  const breadcrumbNav = `<nav aria-label="Breadcrumb" class="mb-6 text-xs font-mono text-zinc-400 flex flex-wrap items-center gap-2"><a href="/" class="hover:text-[#ccff00]">Home</a><span>/</span><a href="/blog" class="hover:text-[#ccff00]">Blog</a><span>/</span><span class="text-zinc-200">${escapeHtml(
    cleanH1
  )}</span></nav>`;

  const coverFigure =
    rawCover && !rawCover.includes('logo.png')
      ? `<figure class="mb-10 overflow-hidden rounded-3xl border border-zinc-800"><img src="${escapeHtml(
          rawCover
        )}" alt="${escapeHtml(ogImageAlt)}" class="w-full h-auto max-h-[520px] object-cover" /></figure>`
      : '';

  const innerRootHtml = `<div class="min-h-screen bg-[#050505] text-white">${renderStaticHeader()}<main id="main-content" class="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-16">${breadcrumbNav}<header class="mb-6"><span class="inline-block px-3 py-1 mb-4 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-[10px] font-mono font-bold uppercase tracking-wider">${categoryLabel}</span><h1 itemProp="headline" class="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">${escapeHtml(
    cleanH1
  )}</h1></header><div aria-label="Article metadata" class="mb-8 flex flex-wrap gap-4 text-xs text-zinc-400 font-mono"><p>${bylineDate}</p><p>By <a href="/about/our-team" class="text-white underline">${bylineAuthor}</a> (<a href="https://www.linkedin.com/in/abu-qitmir-697423390/" target="_blank" rel="noopener noreferrer" class="text-[#ccff00] underline">LinkedIn</a>)</p></div>${coverFigure}<article itemProp="articleBody" data-article-content="true" class="prose prose-invert max-w-none text-neutral-300">${htmlBlocks.join(
    '\n'
  )}</article>${ssrWhatsappCta}${ssrRelatedHtml}</main>${renderStaticFooter()}</div>`;

  const seoHeadBlock = [
    `  <title>${escapeHtml(pageTitle)}</title>`,
    `  <meta name="description" content="${escapeHtml(metaDesc)}" />`,
    `  <meta name="author" content="${bylineAuthor}" />`,
    `  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `  <link rel="canonical" href="${fullCanonical}" />`,
    `  <link rel="alternate" hreflang="en" href="${fullCanonical}" />`,
    `  <link rel="alternate" hreflang="x-default" href="${fullCanonical}" />`,
    `  <meta property="og:type" content="article" />`,
    `  <meta property="og:site_name" content="AbuQitmirLabs" />`,
    `  <meta property="og:title" content="${escapeHtml(pageTitle)}" />`,
    `  <meta property="og:description" content="${escapeHtml(metaDesc)}" />`,
    `  <meta property="og:url" content="${fullCanonical}" />`,
    `  <meta property="og:image" content="${escapeHtml(ogImageUrl)}" />`,
    `  <meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}" />`,
    `  <meta name="twitter:card" content="summary_large_image" />`,
    `  <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />`,
    `  <meta name="twitter:description" content="${escapeHtml(metaDesc)}" />`,
    `  <meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />`,
    `  <meta name="twitter:image:alt" content="${escapeHtml(ogImageAlt)}" />`,
    `  ${schemaBlock}`,
  ].join('\n');

  const shellHtml = loadHtmlShell(options.shellHtml, Boolean(options.forViteDev));
  const finalHtml = injectHeadRootAndState({
    shellHtml,
    routeUrl,
    seoHeadBlock,
    innerRootHtml,
    stateScripts: ssrStateScript,
  });

  return {
    status: 200,
    html: finalHtml,
    cacheControl: 'public, max-age=0, s-maxage=30, stale-while-revalidate=300',
  };
}

export async function getMergedBlogList(bypassCache = false): Promise<BlogRecord[]> {
  const mdPosts = readAllMarkdownPosts();
  const fsPosts = await fetchAllFirestorePosts(bypassCache);

  const bySlug = new Map<string, BlogRecord>();
  for (const mp of mdPosts) {
    bySlug.set(mp.slug, mp);
  }
  for (const fp of fsPosts) {
    const existing = bySlug.get(fp.slug);
    if (!existing) {
      bySlug.set(fp.slug, fp);
    } else if (fp.cmsUpdatedAtMs > 0 && fp.cmsUpdatedAtMs > existing.updatedAtMs + 2000) {
      bySlug.set(fp.slug, fp);
    }
  }

  const list = Array.from(bySlug.values()).filter((p) => p.published !== false);
  list.sort((a, b) => {
    const da = Date.parse(a.createdAt) || a.updatedAtMs || 0;
    const db = Date.parse(b.createdAt) || b.updatedAtMs || 0;
    return db - da;
  });
  return list;
}

export async function renderBlogIndexSsrHtml(options?: {
  shellHtml?: string;
  forViteDev?: boolean;
}): Promise<SsrRenderResult> {
  const posts = await getMergedBlogList();
  const pageTitle = 'Software, AI & SEO Engineering Blog | AbuQitmirLabs';
  const metaDesc =
    'Practical guides on custom software development, autonomous AI agents, technical SEO, brand systems, and scaling digital businesses worldwide.';
  const fullCanonical = `${SITE_URL}/blog`;

  const graphNodes = [
    ...buildOrgLocalWebsiteNodes(),
    {
      '@type': 'CollectionPage',
      '@id': `${fullCanonical}#webpage`,
      url: fullCanonical,
      name: pageTitle,
      description: metaDesc,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${fullCanonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: fullCanonical },
      ],
    },
  ];
  const schemaBlock = `<script id="canonical-schema-graph" type="application/ld+json">\n${JSON.stringify(
    { '@context': 'https://schema.org', '@graph': graphNodes },
    null,
    2
  )}\n</script>`;

  const cardsHtml = posts
    .map((p) => {
      const cleanTitle = p.title.replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '').trim();
      const excerpt = clampCleanDesc(p.excerpt || p.metaDescription || cleanTitle, 175);
      const cover = resolveLocalBlogCover(p.coverImage, p.slug);
      return `<article class="bg-[#0b0b0e] border border-zinc-800/80 rounded-[2rem] overflow-hidden flex flex-col justify-between p-6"><div>${
        cover && !cover.includes('logo.png')
          ? `<a href="/blog/${escapeHtml(p.slug)}" class="block mb-4 overflow-hidden rounded-2xl"><img src="${escapeHtml(
              cover
            )}" alt="${escapeHtml(p.coverImageAlt || cleanTitle)}" loading="lazy" class="w-full h-44 object-cover" /></a>`
          : ''
      }<div class="flex items-center justify-between gap-2 mb-3 text-[11px] font-mono text-zinc-400"><span class="px-2.5 py-0.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] uppercase font-bold">${escapeHtml(
        p.category || 'Engineering'
      )}</span><span>${escapeHtml(p.createdAt)}</span></div><h2 class="text-xl font-bold text-white leading-snug mb-3"><a href="/blog/${escapeHtml(
        p.slug
      )}" class="hover:text-[#ccff00]">${escapeHtml(cleanTitle)}</a></h2><p class="text-zinc-400 text-sm leading-relaxed mb-5">${escapeHtml(
        excerpt
      )}</p></div><div class="pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-400"><span>${escapeHtml(
        p.author
      )}</span><a href="/blog/${escapeHtml(p.slug)}" class="text-[#ccff00] font-bold uppercase">Read Article →</a></div></article>`;
    })
    .join('\n');

  const innerRootHtml = `<div class="min-h-screen bg-[#050505] text-white">${renderStaticHeader()}<main id="main-content" class="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-16"><nav aria-label="Breadcrumb" class="mb-6 text-xs font-mono text-zinc-400 flex items-center gap-2"><a href="/" class="hover:text-[#ccff00]">Home</a><span>/</span><span class="text-zinc-200">Blog</span></nav><header class="mb-12"><span class="inline-block px-3 py-1 mb-4 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-[10px] font-mono font-bold uppercase tracking-wider">Engineering Journal</span><h1 class="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4">AbuQitmirLabs Engineering &amp; Growth Blog</h1><p class="text-zinc-300 text-lg max-w-3xl">${escapeHtml(
    metaDesc
  )}</p></header><section aria-label="Published Articles" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${cardsHtml}</section></main>${renderStaticFooter()}</div>`;

  const seoHeadBlock = [
    `  <title>${escapeHtml(pageTitle)}</title>`,
    `  <meta name="description" content="${escapeHtml(metaDesc)}" />`,
    `  <meta name="author" content="${escapeHtml(DEFAULT_AUTHOR)}" />`,
    `  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `  <link rel="canonical" href="${fullCanonical}" />`,
    `  <meta property="og:type" content="website" />`,
    `  <meta property="og:site_name" content="AbuQitmirLabs" />`,
    `  <meta property="og:title" content="${escapeHtml(pageTitle)}" />`,
    `  <meta property="og:description" content="${escapeHtml(metaDesc)}" />`,
    `  <meta property="og:url" content="${fullCanonical}" />`,
    `  <meta property="og:image" content="${SITE_URL}/images/hero-abuqitmirlabs.webp" />`,
    `  <meta name="twitter:card" content="summary_large_image" />`,
    `  <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />`,
    `  <meta name="twitter:description" content="${escapeHtml(metaDesc)}" />`,
    `  <meta name="twitter:image" content="${SITE_URL}/images/hero-abuqitmirlabs.webp" />`,
    `  ${schemaBlock}`,
  ].join('\n');

  const compactPostsPayload = JSON.stringify(
    posts.map((p) => ({
      id: p.slug,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      metaDescription: p.metaDescription,
      coverImage: resolveLocalBlogCover(p.coverImage, p.slug),
      coverImageAlt: p.coverImageAlt || p.title,
      category: p.category,
      createdAt: p.createdAt,
      author: p.author,
      tags: p.tags,
      published: p.published,
    }))
  );
  const ssrListScript = `<script id="__SSR_BLOG_LIST__" type="application/json" data-encoding="base64">${Buffer.from(
    compactPostsPayload,
    'utf-8'
  ).toString('base64')}</script>`;

  const shellHtml = loadHtmlShell(options?.shellHtml, Boolean(options?.forViteDev));
  const html = injectHeadRootAndState({
    shellHtml,
    routeUrl: '/blog',
    seoHeadBlock,
    innerRootHtml,
    stateScripts: ssrListScript,
  });

  return {
    status: 200,
    html,
    cacheControl: 'public, max-age=0, s-maxage=30, stale-while-revalidate=300',
  };
}

function staticToNewsRecord(a: StaticNewsArticle): NewsRecord {
  const slug = getNewsArticleSlug(a);
  return {
    id: a.id || slug,
    slug,
    title: a.title,
    type: a.type || 'latest',
    category: a.category || 'Product Launch',
    date: a.date,
    excerpt: a.excerpt,
    content: a.content,
    author: a.author || DEFAULT_AUTHOR,
    readTime: a.readTime || '4 min read',
    location: a.location || 'Karachi, Pakistan',
    contact: a.contact || 'hello@abuqitmirlabs.tech',
    published: a.published !== false,
    updatedAtMs: Date.parse(a.date) || 0,
  };
}

export async function getMergedNewsList(bypassCache = false): Promise<NewsRecord[]> {
  const fsNews = await fetchAllFirestoreNews(bypassCache);
  const bySlug = new Map<string, NewsRecord>();

  for (const item of fsNews) {
    bySlug.set(item.slug.toLowerCase(), item);
  }
  for (const st of STATIC_NEWS_ARTICLES) {
    const rec = staticToNewsRecord(st);
    const key = rec.slug.toLowerCase();
    if (!bySlug.has(key)) {
      bySlug.set(key, rec);
    }
  }

  const list = Array.from(bySlug.values()).filter((n) => n.published !== false);
  list.sort((a, b) => {
    const da = Date.parse(a.date) || a.updatedAtMs || 0;
    const db = Date.parse(b.date) || b.updatedAtMs || 0;
    return db - da;
  });
  return list;
}

export async function renderNewsArticleSsrHtml(options: {
  idOrSlug: string;
  reqPath?: string;
  shellHtml?: string;
  forViteDev?: boolean;
}): Promise<SsrRenderResult> {
  const target = String(options.idOrSlug || '').toLowerCase().trim().replace(/\/+$/, '');
  if (!target) {
    return { status: 301, redirectLocation: '/news/latest' };
  }

  const allNews = await getMergedNewsList();
  const article = allNews.find(
    (a) =>
      a.id.toLowerCase() === target ||
      a.slug.toLowerCase() === target ||
      generateNewsSlug(a.title) === target
  );

  if (!article) {
    return {
      status: 404,
      html: render404HtmlPage('404 News Article Not Found', 'News Article Not Found', '/news/all', 'Return to News Archive'),
    };
  }

  const routePath =
    article.slug === 'google-ai-dogfooding-enterprise-results' &&
    options.reqPath?.startsWith('/news/industry-insights/')
      ? `/news/industry-insights/${article.slug}`
      : article.slug === 'google-ai-dogfooding-enterprise-results'
      ? `/news/industry-insights/${article.slug}`
      : `/news/article/${article.slug}`;
  const fullCanonical = `${SITE_URL}${routePath}`;
  const pageTitle = `${article.title} | AbuQitmirLabs`;
  const metaDesc = clampCleanDesc(article.excerpt || article.title, 155);

  const { htmlBlocks } = renderMarkdownToSemanticHtml(article.content || article.excerpt, {
    cleanH1: article.title,
    slug: article.slug,
  });

  const graphNodes = [
    ...buildOrgLocalWebsiteNodes(),
    {
      '@type': 'WebPage',
      '@id': `${fullCanonical}#webpage`,
      url: fullCanonical,
      name: pageTitle,
      description: metaDesc,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${fullCanonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'News Archive', item: `${SITE_URL}/news/all` },
        { '@type': 'ListItem', position: 3, name: article.title, item: fullCanonical },
      ],
    },
    {
      '@type': 'NewsArticle',
      '@id': `${fullCanonical}#newsarticle`,
      isPartOf: { '@id': `${fullCanonical}#webpage` },
      headline: article.title,
      description: metaDesc,
      image: `${SITE_URL}/logo.png`,
      datePublished: article.date,
      dateModified: article.date,
      author: {
        '@type': 'Person',
        name: article.author || DEFAULT_AUTHOR,
        url: `${SITE_URL}/about/our-team`,
      },
      publisher: { '@id': `${SITE_URL}/#organization` },
      mainEntityOfPage: { '@id': `${fullCanonical}#webpage` },
    },
  ];
  const schemaBlock = `<script id="canonical-schema-graph" type="application/ld+json">\n${JSON.stringify(
    { '@context': 'https://schema.org', '@graph': graphNodes },
    null,
    2
  )}\n</script>`;

  const related = allNews.filter((a) => a.slug !== article.slug).slice(0, 3);
  const relatedHtml =
    related.length > 0
      ? `<section class="mt-16 pt-12 border-t border-white/10"><h2 class="text-2xl font-extrabold mb-8 text-white">Related News Publications</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-6">${related
          .map(
            (r) =>
              `<a href="/news/article/${escapeHtml(
                r.slug
              )}" class="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between"><span class="text-[10px] font-mono text-[#ccff00] mb-2">${escapeHtml(
                r.category
              )}</span><h3 class="text-base font-bold text-white mb-2">${escapeHtml(
                r.title
              )}</h3><p class="text-zinc-400 text-xs">${escapeHtml(clampCleanDesc(r.excerpt, 120))}</p></a>`
          )
          .join('')}</div></section>`
      : '';

  const innerRootHtml = `<div class="min-h-screen bg-[#050505] text-white">${renderStaticHeader()}<main id="main-content" class="max-w-4xl mx-auto px-6 pt-24 md:pt-32 pb-16"><nav aria-label="Breadcrumb" class="mb-6 text-xs font-mono text-zinc-400 flex items-center gap-2"><a href="/" class="hover:text-[#ccff00]">Home</a><span>/</span><a href="/news/all" class="hover:text-[#ccff00]">News Archive</a><span>/</span><span class="text-zinc-200">${escapeHtml(
    article.category
  )}</span></nav><article><header class="mb-10"><div class="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono text-zinc-400"><span class="px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00] font-bold uppercase">${escapeHtml(
    article.category
  )}</span><span>${escapeHtml(article.date)}</span><span>${escapeHtml(
    article.readTime
  )}</span></div><h1 class="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">${escapeHtml(
    article.title
  )}</h1><p class="text-xs font-mono text-zinc-400">By ${escapeHtml(article.author)} • ${escapeHtml(
    article.location
  )}</p></header>${
    article.excerpt
      ? `<div class="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl mb-10"><span class="text-xs font-mono uppercase tracking-widest text-[#ccff00] font-bold block mb-2">Executive Summary</span><p class="text-sm md:text-base text-gray-200 leading-relaxed">${escapeHtml(
          article.excerpt
        )}</p></div>`
      : ''
  }<div data-article-content="true" class="prose prose-invert max-w-none text-neutral-300">${htmlBlocks.join(
    '\n'
  )}</div>${relatedHtml}</article></main>${renderStaticFooter()}</div>`;

  const seoHeadBlock = [
    `  <title>${escapeHtml(pageTitle)}</title>`,
    `  <meta name="description" content="${escapeHtml(metaDesc)}" />`,
    `  <meta name="author" content="${escapeHtml(article.author || DEFAULT_AUTHOR)}" />`,
    `  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `  <link rel="canonical" href="${fullCanonical}" />`,
    `  <meta property="og:type" content="article" />`,
    `  <meta property="og:site_name" content="AbuQitmirLabs" />`,
    `  <meta property="og:title" content="${escapeHtml(pageTitle)}" />`,
    `  <meta property="og:description" content="${escapeHtml(metaDesc)}" />`,
    `  <meta property="og:url" content="${fullCanonical}" />`,
    `  <meta property="og:image" content="${SITE_URL}/logo.png" />`,
    `  <meta name="twitter:card" content="summary_large_image" />`,
    `  <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />`,
    `  <meta name="twitter:description" content="${escapeHtml(metaDesc)}" />`,
    `  <meta name="twitter:image" content="${SITE_URL}/logo.png" />`,
    `  ${schemaBlock}`,
  ].join('\n');

  const ssrNewsScript = `<script id="__SSR_NEWS_ARTICLE__" type="application/json" data-encoding="base64">${Buffer.from(
    JSON.stringify({ article, allArticles: allNews }),
    'utf-8'
  ).toString('base64')}</script>`;

  const shellHtml = loadHtmlShell(options.shellHtml, Boolean(options.forViteDev));
  const html = injectHeadRootAndState({
    shellHtml,
    routeUrl: routePath,
    seoHeadBlock,
    innerRootHtml,
    stateScripts: ssrNewsScript,
  });

  return {
    status: 200,
    html,
    cacheControl: 'public, max-age=0, s-maxage=30, stale-while-revalidate=300',
  };
}

export async function renderNewsIndexSsrHtml(options: {
  routePath: string;
  shellHtml?: string;
  forViteDev?: boolean;
}): Promise<SsrRenderResult> {
  const cleanRoute = options.routePath.replace(/\/+$/, '') || '/news/latest';
  if (cleanRoute === '/news') {
    return { status: 301, redirectLocation: '/news/latest' };
  }

  const allNews = await getMergedNewsList();
  let filterType = 'all';
  let heading = 'All News & Engineering Publications';
  let pageTitle = 'News Archive & Announcements | AbuQitmirLabs';
  let metaDesc =
    'Explore the complete archive of AbuQitmirLabs press releases, AI engineering insights, company updates, and research.';

  if (cleanRoute === '/news/latest') {
    filterType = 'latest';
    heading = 'Latest Engineering News & Releases';
    pageTitle = 'Latest Tech News & Product Releases | AbuQitmirLabs';
    metaDesc =
      'Stay updated with the latest software releases, AI framework benchmarks, and agency news from AbuQitmirLabs.';
  } else if (cleanRoute === '/news/press-releases') {
    filterType = 'press-releases';
    heading = 'Official Press Releases';
    pageTitle = 'Official Press Releases & Media Kit | AbuQitmirLabs';
    metaDesc =
      'Official company announcements, security compliance validations, partnerships, and milestones from AbuQitmirLabs.';
  } else if (cleanRoute === '/news/industry-insights') {
    filterType = 'industry-insights';
    heading = 'Industry Insights & Technical Research';
    pageTitle = 'AI, Software & SEO Industry Insights | AbuQitmirLabs';
    metaDesc =
      'In-depth engineering research, RAG architecture patterns, fintech insights, and generative search studies by AbuQitmirLabs.';
  }

  const filtered =
    filterType === 'all'
      ? allNews
      : allNews.filter((n) => n.type === filterType || n.type === 'all');
  const displayItems = filtered.length > 0 ? filtered : allNews;

  const fullCanonical = `${SITE_URL}${cleanRoute}`;
  const graphNodes = [
    ...buildOrgLocalWebsiteNodes(),
    {
      '@type': 'CollectionPage',
      '@id': `${fullCanonical}#webpage`,
      url: fullCanonical,
      name: pageTitle,
      description: metaDesc,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${fullCanonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: heading, item: fullCanonical },
      ],
    },
  ];
  const schemaBlock = `<script id="canonical-schema-graph" type="application/ld+json">\n${JSON.stringify(
    { '@context': 'https://schema.org', '@graph': graphNodes },
    null,
    2
  )}\n</script>`;

  const cardsHtml = displayItems
    .map(
      (item) =>
        `<article class="bg-[#0b0b0e] border border-zinc-800/80 rounded-[2rem] p-7 flex flex-col justify-between"><div><div class="flex items-center justify-between gap-2 mb-3 text-xs font-mono text-zinc-400"><span class="px-2.5 py-0.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] uppercase font-bold">${escapeHtml(
          item.category
        )}</span><span>${escapeHtml(item.date)}</span></div><h2 class="text-xl font-bold text-white mb-3"><a href="/news/article/${escapeHtml(
          item.slug
        )}" class="hover:text-[#ccff00]">${escapeHtml(item.title)}</a></h2><p class="text-zinc-400 text-sm mb-5 leading-relaxed">${escapeHtml(
          clampCleanDesc(item.excerpt || item.content, 180)
        )}</p></div><div class="pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-400"><span>${escapeHtml(
          item.author
        )}</span><a href="/news/article/${escapeHtml(
          item.slug
        )}" class="text-[#ccff00] font-bold uppercase">Read Story →</a></div></article>`
    )
    .join('\n');

  const innerRootHtml = `<div class="min-h-screen bg-[#050505] text-white">${renderStaticHeader()}<main id="main-content" class="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-16"><nav aria-label="Breadcrumb" class="mb-6 text-xs font-mono text-zinc-400 flex items-center gap-2"><a href="/" class="hover:text-[#ccff00]">Home</a><span>/</span><span class="text-zinc-200">${escapeHtml(
    heading
  )}</span></nav><header class="mb-12"><span class="inline-block px-3 py-1 mb-4 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-[10px] font-mono font-bold uppercase tracking-wider">Newsroom</span><h1 class="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4">${escapeHtml(
    heading
  )}</h1><p class="text-zinc-300 text-lg max-w-3xl">${escapeHtml(
    metaDesc
  )}</p></header><section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${cardsHtml}</section></main>${renderStaticFooter()}</div>`;

  const seoHeadBlock = [
    `  <title>${escapeHtml(pageTitle)}</title>`,
    `  <meta name="description" content="${escapeHtml(metaDesc)}" />`,
    `  <meta name="author" content="${escapeHtml(DEFAULT_AUTHOR)}" />`,
    `  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `  <link rel="canonical" href="${fullCanonical}" />`,
    `  <meta property="og:type" content="website" />`,
    `  <meta property="og:site_name" content="AbuQitmirLabs" />`,
    `  <meta property="og:title" content="${escapeHtml(pageTitle)}" />`,
    `  <meta property="og:description" content="${escapeHtml(metaDesc)}" />`,
    `  <meta property="og:url" content="${fullCanonical}" />`,
    `  <meta property="og:image" content="${SITE_URL}/logo.png" />`,
    `  <meta name="twitter:card" content="summary_large_image" />`,
    `  <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />`,
    `  <meta name="twitter:description" content="${escapeHtml(metaDesc)}" />`,
    `  <meta name="twitter:image" content="${SITE_URL}/logo.png" />`,
    `  ${schemaBlock}`,
  ].join('\n');

  const ssrNewsListScript = `<script id="__SSR_NEWS_LIST__" type="application/json" data-encoding="base64">${Buffer.from(
    JSON.stringify(displayItems),
    'utf-8'
  ).toString('base64')}</script>`;

  const shellHtml = loadHtmlShell(options.shellHtml, Boolean(options.forViteDev));
  const html = injectHeadRootAndState({
    shellHtml,
    routeUrl: cleanRoute,
    seoHeadBlock,
    innerRootHtml,
    stateScripts: ssrNewsListScript,
  });

  return {
    status: 200,
    html,
    cacheControl: 'public, max-age=0, s-maxage=30, stale-while-revalidate=300',
  };
}

export async function writeBlogPostStaticHtml(rawSlug: string): Promise<boolean> {
  try {
    const canonicalSlug = resolveCanonicalBlogSlug(rawSlug);
    if (!canonicalSlug) return false;
    invalidateSsrCache(canonicalSlug);
    const hasDistShell =
      fs.existsSync(path.join(process.cwd(), 'dist', 'spa-shell.html')) ||
      fs.existsSync(path.join(process.cwd(), 'dist', 'index.html'));
    if (!hasDistShell) return false;

    const rendered = await renderBlogPostSsrHtml({
      rawSlug: canonicalSlug,
      forViteDev: false,
      forceLive: true,
    });
    if (rendered.status !== 200 || !rendered.html) return false;

    const targets = [
      path.join(process.cwd(), 'dist', 'blog', canonicalSlug, 'index.html'),
      path.join(process.cwd(), 'dist', 'blog', `${canonicalSlug}.html`),
      path.join(process.cwd(), 'public', 'blog', canonicalSlug, 'index.html'),
    ];
    for (const filePath of targets) {
      const parent = path.dirname(filePath);
      if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
      fs.writeFileSync(filePath, rendered.html, 'utf-8');
    }
    return true;
  } catch {
    return false;
  }
}

export async function buildDynamicSitemapXml(baseXml: string): Promise<string> {
  const today = new Date().toISOString().split('T')[0];
  let content =
    baseXml ||
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_URL}/</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>\n  <url><loc>${SITE_URL}/blog</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>\n</urlset>`;

  try {
    const [posts, news] = await Promise.all([getMergedBlogList(), getMergedNewsList()]);
    for (const post of posts) {
      if (post.published === false) continue;
      const postUrl = `${SITE_URL}/blog/${post.slug}`;
      if (!content.includes(`<loc>${postUrl}</loc>`)) {
        const pubDate = String(post.createdAt || today).slice(0, 10);
        const entry = `  <url>\n    <loc>${postUrl}</loc>\n    <lastmod>${pubDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n</urlset>`;
        content = content.replace('</urlset>', entry);
      }
    }
    for (const item of news) {
      if (item.published === false) continue;
      const itemPath =
        item.slug === 'google-ai-dogfooding-enterprise-results'
          ? `/news/industry-insights/${item.slug}`
          : `/news/article/${item.slug}`;
      const newsUrl = `${SITE_URL}${itemPath}`;
      if (!content.includes(`<loc>${newsUrl}</loc>`)) {
        const parsedMs = Date.parse(item.date);
        const pubDate = !Number.isNaN(parsedMs) ? new Date(parsedMs).toISOString().slice(0, 10) : today;
        const entry = `  <url>\n    <loc>${newsUrl}</loc>\n    <lastmod>${pubDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>`;
        content = content.replace('</urlset>', entry);
      }
    }
  } catch {}

  return (
    content
      .replace(/^\uFEFF/, '')
      .trim()
      .replace(/<loc>https:\/\/www\.abuqitmirlabs\.tech<\/loc>/g, `<loc>${SITE_URL}/</loc>`)
      .replace(
        /^\s*<url>[\s\S]*?<loc>https:\/\/www\.abuqitmirlabs\.tech\/(?:admin(?:\/[^<]*)?|login(?:\/[^<]*)?|spa-shell|404)<\/loc>[\s\S]*?<\/url>\n?/gm,
        ''
      ) + '\n'
  );
}

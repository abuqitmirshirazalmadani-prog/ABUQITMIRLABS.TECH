import fs from 'fs';
import path from 'path';
import {
  ArticleInput,
  AutoFixResult,
  SeoFixQueueItem,
  SeoFixWarningType,
  autoFixArticle,
  convertContentH1ToH2,
  generateMetaFromH1AndContent,
  injectContextualInternalLinks,
  parsePublishDateAndClampFuture,
  sanitizeArticleTags,
} from './auto-fix-article';
import { resolveOptimizedCoverImage } from '../src/data/localCoverImageMap';
import { STATIC_BLOG_POSTS } from '../src/data/staticBlogPosts';
import { getCanonicalSlug } from '../src/data/canonicalRedirects';

const FIX_QUEUE_FILE = path.join(process.cwd(), 'content', '.fix-queue.json');
const SEO_REPORT_FILE = path.join(process.cwd(), 'content', '.seo-report.json');
const CONTENT_BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function normalizeQueueItem(raw: any): SeoFixQueueItem | null {
  if (!raw || typeof raw !== 'object') return null;
  const type: SeoFixWarningType = raw.type || raw.issueType || 'missing_internal_links';
  const slug = getCanonicalSlug(String(raw.slug || '').trim());
  if (!slug) return null;
  const id = String(raw.id || `${type}-${slug}`).trim();
  const proposedValue = raw.proposedValue ?? raw.suggestedValue ?? '';
  return {
    id,
    slug,
    title: String(raw.title || slug).replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '').trim(),
    type,
    issueType: type,
    severity: raw.severity === 'info' ? 'info' : 'warning',
    message: String(raw.message || `SEO issue (${type}) detected on ${slug}`),
    suggestedFix: String(raw.suggestedFix || proposedValue || `Auto-fix ${type}`),
    field: raw.field || 'content',
    currentValue: raw.currentValue ?? '',
    proposedValue,
    suggestedValue: proposedValue,
    autoFixable: raw.autoFixable !== false,
    createdAt: raw.createdAt || new Date().toISOString(),
    resolved: !!raw.resolved,
    resolvedAt: raw.resolvedAt,
  };
}

export function readFixQueue(): SeoFixQueueItem[] {
  try {
    if (!fs.existsSync(FIX_QUEUE_FILE)) return [];
    const data = JSON.parse(fs.readFileSync(FIX_QUEUE_FILE, 'utf-8'));
    if (!Array.isArray(data)) return [];
    const map = new Map<string, SeoFixQueueItem>();
    for (const raw of data) {
      const item = normalizeQueueItem(raw);
      if (item && !item.resolved) {
        // Deduplicate by (slug + type) so legacy `<slug>::<type>` and `<type>-<slug>` never duplicate
        const dedupKey = `${item.slug}::${item.type}`;
        if (!map.has(dedupKey) || !item.id.includes('::')) {
          map.set(dedupKey, item);
        }
      }
    }
    return Array.from(map.values());
  } catch {
    return [];
  }
}

export function writeFixQueue(items: SeoFixQueueItem[]): void {
  try {
    const dir = path.dirname(FIX_QUEUE_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(FIX_QUEUE_FILE, JSON.stringify(items, null, 2), 'utf-8');

    // Keep content/.seo-report.json synchronized with the updated queue
    if (fs.existsSync(SEO_REPORT_FILE)) {
      try {
        const report = JSON.parse(fs.readFileSync(SEO_REPORT_FILE, 'utf-8'));
        if (report && typeof report === 'object') {
          report.warnings = items;
          report.summary = {
            duplicateTitles: items.filter((i) => i.type === 'duplicate_title').length,
            duplicateMetas: items.filter((i) => i.type === 'duplicate_meta').length,
            missingTitles: items.filter((i) => i.type === 'missing_title').length,
            missingMetas: items.filter((i) => i.type === 'missing_meta').length,
            futurePublishDates: items.filter((i) => i.type === 'future_publish_date').length,
            missingInternalLinks: items.filter((i) => i.type === 'missing_internal_links').length,
            leadingH1InContent: items.filter((i) => i.type === 'leading_h1_in_content').length,
            externalImages: items.filter((i) => i.type === 'external_image').length,
            totalWarnings: items.length,
          };
          fs.writeFileSync(SEO_REPORT_FILE, JSON.stringify(report, null, 2), 'utf-8');
        }
      } catch {
        // ignore report sync error
      }
    }
  } catch (err) {
    console.warn('[SEO Fix Engine] Could not write .fix-queue.json:', err);
  }
}

export function appendWarningsToFixQueue(newWarnings: SeoFixQueueItem[]): SeoFixQueueItem[] {
  const existing = readFixQueue();
  const map = new Map<string, SeoFixQueueItem>();
  for (const item of existing) {
    if (item && item.id) map.set(`${item.slug}::${item.type}`, item);
  }
  for (const raw of newWarnings) {
    const w = normalizeQueueItem(raw);
    if (w && w.id) map.set(`${w.slug}::${w.type}`, w);
  }
  const merged = Array.from(map.values());
  writeFixQueue(merged);
  return merged;
}

export function readSeoReportSummary(): Record<string, any> | null {
  try {
    if (!fs.existsSync(SEO_REPORT_FILE)) return null;
    return JSON.parse(fs.readFileSync(SEO_REPORT_FILE, 'utf-8'));
  } catch {
    return null;
  }
}

/**
 * Loads existing article data for a slug by merging `STATIC_BLOG_POSTS[slug]`
 * with `content/blog/<slug>.md` so no metadata or content is ever lost.
 */
function loadArticleForSlug(slug: string, fallbackTitle?: string): {
  frontmatter: Record<string, any>;
  body: string;
} {
  const canonicalSlug = getCanonicalSlug(slug);
  const staticPost =
    (STATIC_BLOG_POSTS as Record<string, any>)[canonicalSlug] ||
    (STATIC_BLOG_POSTS as Record<string, any>)[slug] ||
    {};

  const frontmatter: Record<string, any> = {
    title: String(staticPost.title || fallbackTitle || canonicalSlug)
      .replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '')
      .trim(),
    slug: canonicalSlug,
    excerpt: String(staticPost.excerpt || staticPost.metaDescription || '').trim(),
    metaDescription: String(staticPost.metaDescription || staticPost.excerpt || '').trim(),
    coverImage: String(staticPost.coverImage || '').trim(),
    coverImageAlt: String(staticPost.coverImageAlt || staticPost.title || canonicalSlug).trim(),
    category: String(staticPost.category || 'AI').trim(),
    author: String(staticPost.author || 'Abu Qitmir Mohammad Shiraz Al-Madani').trim(),
    publishedAt: String(staticPost.publishedAt || staticPost.date || '2026-05-15').trim(),
    tags: sanitizeArticleTags(staticPost.tags, String(staticPost.category || 'AI')),
  };

  let body = String(staticPost.content || '').trim();

  const mdPath = path.join(CONTENT_BLOG_DIR, `${canonicalSlug}.md`);
  if (fs.existsSync(mdPath)) {
    const raw = fs.readFileSync(mdPath, 'utf-8');
    const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (fmMatch) {
      const fmRaw = fmMatch[1].trim();
      const mdBody = fmMatch[2].trim();
      if (mdBody) body = mdBody;
      try {
        if (fmRaw.startsWith('{')) {
          const parsed = JSON.parse(fmRaw);
          for (const [k, v] of Object.entries(parsed)) {
            if (v !== undefined && v !== null && String(v).trim() !== '') {
              frontmatter[k] = v;
            }
          }
        } else {
          for (const line of fmRaw.split(/\r?\n/)) {
            const idx = line.indexOf(':');
            if (idx > 0) {
              const key = line.slice(0, idx).trim();
              const val = line
                .slice(idx + 1)
                .trim()
                .replace(/^["']|["']$/g, '');
              if (val) frontmatter[key] = val;
            }
          }
        }
      } catch {
        // keep staticPost fallback frontmatter
      }
    } else if (raw.trim()) {
      body = raw.trim();
    }
  }

  return { frontmatter, body };
}

/**
 * Runs Layer 1 `autoFixArticle` on save and persists any un-fixed warnings into `content/.fix-queue.json`
 * and updates `content/blog/<slug>.md` locally.
 */
export function runAutoFixAndPersistOnSave(
  input: ArticleInput,
  options: { persist?: boolean } = { persist: true }
): AutoFixResult {
  const result = autoFixArticle(input);
  if (options.persist === false) {
    return result;
  }

  const { article, warnings } = result;

  // Save/update markdown file in content/blog/<slug>.md
  try {
    if (!fs.existsSync(CONTENT_BLOG_DIR)) {
      fs.mkdirSync(CONTENT_BLOG_DIR, { recursive: true });
    }
    const mdFilePath = path.join(CONTENT_BLOG_DIR, `${article.slug}.md`);
    const frontmatter = {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      metaDescription: article.metaDescription,
      coverImage: article.coverImage,
      coverImageAlt: article.coverImageAlt,
      category: article.category,
      author: article.author,
      publishedAt: article.publishedAt,
      tags: article.tags,
    };
    const mdContent = `---\n${JSON.stringify(frontmatter, null, 2)}\n---\n\n${article.content.trim()}\n`;
    fs.writeFileSync(mdFilePath, mdContent, 'utf-8');
  } catch (err) {
    console.warn('[SEO Fix Engine] Could not write local markdown file:', err);
  }

  // Update .fix-queue.json: remove resolved warnings for this slug and append any new warnings
  const currentQueue = readFixQueue().filter((item) => item.slug !== article.slug);
  const updatedQueue = [...currentQueue, ...warnings];
  writeFixQueue(updatedQueue);

  return result;
}

export type OneClickFixInput =
  | string
  | {
      id?: string;
      slug?: string;
      issueType?: string;
      type?: string;
      fixAll?: boolean;
    };

/**
 * LAYER 4 One-Click Auto-Fix Executor:
 * Fixes a single warning ID (or all warnings when `id === 'ALL'` or `fixAll === true`)
 * in `content/blog/<slug>.md` and removes it from `content/.fix-queue.json`.
 */
export function applyOneClickFix(targetInput: OneClickFixInput): {
  fixedCount: number;
  fixedIds: string[];
  appliedLogs: string[];
  remainingQueue: SeoFixQueueItem[];
} {
  const queue = readFixQueue();

  let targetId = '';
  let targetSlug = '';
  let targetType = '';
  let isFixAll = false;

  if (typeof targetInput === 'string') {
    targetId = targetInput.trim();
    isFixAll = targetId === 'ALL';
  } else if (targetInput && typeof targetInput === 'object') {
    targetId = String(targetInput.id || '').trim();
    targetSlug = String(targetInput.slug || '').trim();
    targetType = String(targetInput.issueType || targetInput.type || '').trim();
    isFixAll = !!targetInput.fixAll || targetId === 'ALL';
  }

  const targets = isFixAll
    ? queue.filter((item) => !item.resolved)
    : queue.filter((item) => {
        if (item.resolved) return false;
        if (targetId && item.id === targetId) return true;
        if (targetSlug && targetType && item.slug === targetSlug && item.type === targetType) {
          return true;
        }
        if (targetSlug && !targetType && !targetId && item.slug === targetSlug) {
          return true;
        }
        return false;
      });

  const fixedIds: string[] = [];
  const appliedLogs: string[] = [];

  if (!fs.existsSync(CONTENT_BLOG_DIR)) {
    try {
      fs.mkdirSync(CONTENT_BLOG_DIR, { recursive: true });
    } catch {}
  }

  for (const item of targets) {
    const canonicalSlug = getCanonicalSlug(item.slug);
    const mdPath = path.join(CONTENT_BLOG_DIR, `${canonicalSlug}.md`);
    const loaded = loadArticleForSlug(canonicalSlug, item.title);
    let { frontmatter, body } = loaded;
    const issueType = item.type || (item as any).issueType;

    switch (issueType) {
      case 'missing_title':
      case 'duplicate_title': {
        frontmatter.title = String(item.proposedValue || item.title || canonicalSlug)
          .replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '')
          .trim();
        appliedLogs.push(`[${canonicalSlug}] Set title -> "${frontmatter.title}"`);
        break;
      }
      case 'missing_meta':
      case 'duplicate_meta': {
        const newMeta =
          item.proposedValue ||
          generateMetaFromH1AndContent(String(frontmatter.title || canonicalSlug), body);
        frontmatter.metaDescription = newMeta;
        if (!frontmatter.excerpt || String(frontmatter.excerpt).length < 40) {
          frontmatter.excerpt = newMeta;
        }
        appliedLogs.push(
          `[${canonicalSlug}] Generated unique meta description (${newMeta.length} chars)`
        );
        break;
      }
      case 'future_publish_date': {
        const clamped = parsePublishDateAndClampFuture(frontmatter.publishedAt);
        frontmatter.publishedAt = clamped.dateIso;
        appliedLogs.push(`[${canonicalSlug}] Clamped publish date to ${clamped.dateIso}`);
        break;
      }
      case 'leading_h1_in_content': {
        const converted = convertContentH1ToH2(body, String(frontmatter.title || item.title));
        body = converted.content;
        appliedLogs.push(`[${canonicalSlug}] Converted leading "# H1" to "## H2" in markdown body`);
        break;
      }
      case 'missing_internal_links': {
        const injected = injectContextualInternalLinks(
          body,
          String(frontmatter.title || item.title),
          String(frontmatter.category || 'AI'),
          canonicalSlug
        );
        body = injected.content;
        appliedLogs.push(
          `[${canonicalSlug}] Auto-injected ${injected.addedCount} contextual internal link(s)`
        );
        break;
      }
      case 'external_image': {
        const localOptimized = resolveOptimizedCoverImage(frontmatter.coverImage, canonicalSlug);
        const targetCover =
          localOptimized && localOptimized.startsWith('/images/blog-covers/')
            ? localOptimized
            : '/images/blog-covers/the-5-minute-technical-audit-what-every-founder-should-check-459758ec.webp';
        frontmatter.coverImage = targetCover;
        appliedLogs.push(
          `[${canonicalSlug}] Shifted external cover image to local WebP (${targetCover})`
        );
        break;
      }
      default: {
        const fullAuto = autoFixArticle({ ...frontmatter, content: body, slug: canonicalSlug });
        frontmatter = {
          title: fullAuto.article.title,
          slug: fullAuto.article.slug,
          excerpt: fullAuto.article.excerpt,
          metaDescription: fullAuto.article.metaDescription,
          coverImage: fullAuto.article.coverImage,
          coverImageAlt: fullAuto.article.coverImageAlt,
          category: fullAuto.article.category,
          author: fullAuto.article.author,
          publishedAt: fullAuto.article.publishedAt,
          tags: fullAuto.article.tags,
        };
        body = fullAuto.article.content;
        appliedLogs.push(`[${canonicalSlug}] Applied full Layer 1 auto-fix`);
      }
    }

    // Ensure metaDescription & coverImage on the saved markdown file are always valid so no secondary warning appears on rescan
    if (!frontmatter.metaDescription || String(frontmatter.metaDescription).trim().length < 40) {
      const generatedMeta = generateMetaFromH1AndContent(
        String(frontmatter.title || canonicalSlug),
        body
      );
      frontmatter.metaDescription = generatedMeta;
      frontmatter.excerpt = frontmatter.excerpt || generatedMeta;
    }
    const resolvedLocalCover = resolveOptimizedCoverImage(frontmatter.coverImage, canonicalSlug);
    if (resolvedLocalCover && resolvedLocalCover.startsWith('/images/blog-covers/')) {
      frontmatter.coverImage = resolvedLocalCover;
    }

    try {
      const updatedMd = `---\n${JSON.stringify(frontmatter, null, 2)}\n---\n\n${body.trim()}\n`;
      fs.writeFileSync(mdPath, updatedMd, 'utf-8');
    } catch (writeErr) {
      console.warn(`[SEO Fix Engine] Failed writing ${mdPath}:`, writeErr);
    }

    fixedIds.push(item.id);
  }

  const fixedSet = new Set(fixedIds);
  const remainingQueue = queue.filter((item) => !fixedSet.has(item.id));
  writeFixQueue(remainingQueue);

  return {
    fixedCount: fixedIds.length,
    fixedIds,
    appliedLogs,
    remainingQueue,
  };
}

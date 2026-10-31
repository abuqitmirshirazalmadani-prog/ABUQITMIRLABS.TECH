import fs from 'fs';
import path from 'path';
import {
  ArticleInput,
  AutoFixResult,
  SeoFixQueueItem,
  autoFixArticle,
  convertContentH1ToH2,
  generateMetaFromH1AndContent,
  injectContextualInternalLinks,
  parsePublishDateAndClampFuture,
} from './auto-fix-article';
import { resolveOptimizedCoverImage } from '../src/data/localCoverImageMap';

const FIX_QUEUE_FILE = path.join(process.cwd(), 'content', '.fix-queue.json');
const SEO_REPORT_FILE = path.join(process.cwd(), 'content', '.seo-report.json');
const CONTENT_BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function readFixQueue(): SeoFixQueueItem[] {
  try {
    if (!fs.existsSync(FIX_QUEUE_FILE)) return [];
    const data = JSON.parse(fs.readFileSync(FIX_QUEUE_FILE, 'utf-8'));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function writeFixQueue(items: SeoFixQueueItem[]): void {
  try {
    const dir = path.dirname(FIX_QUEUE_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(FIX_QUEUE_FILE, JSON.stringify(items, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[SEO Fix Engine] Could not write .fix-queue.json:', err);
  }
}

export function appendWarningsToFixQueue(newWarnings: SeoFixQueueItem[]): SeoFixQueueItem[] {
  const existing = readFixQueue();
  const map = new Map<string, SeoFixQueueItem>();
  for (const item of existing) {
    if (item && item.id) map.set(item.id, item);
  }
  for (const w of newWarnings) {
    if (w && w.id) map.set(w.id, w);
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
 * Runs Layer 1 `autoFixArticle` on save and persists any un-fixed warnings into `content/.fix-queue.json`
 * and updates `content/blog/<slug>.md` locally.
 */
export function runAutoFixAndPersistOnSave(input: ArticleInput): AutoFixResult {
  const result = autoFixArticle(input);
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

/**
 * LAYER 4 One-Click Auto-Fix Executor:
 * Fixes a single warning ID (or all warnings when `id === 'ALL'`) in `content/blog/<slug>.md`
 * and removes/marks it resolved in `content/.fix-queue.json`.
 */
export function applyOneClickFix(warningId: string): {
  fixedCount: number;
  fixedIds: string[];
  appliedLogs: string[];
  remainingQueue: SeoFixQueueItem[];
} {
  const queue = readFixQueue();
  const targets =
    warningId === 'ALL'
      ? queue.filter((item) => !item.resolved)
      : queue.filter((item) => item.id === warningId && !item.resolved);

  const fixedIds: string[] = [];
  const appliedLogs: string[] = [];

  for (const item of targets) {
    const mdPath = path.join(CONTENT_BLOG_DIR, `${item.slug}.md`);
    let frontmatter: Record<string, any> = {
      title: item.title || item.slug,
      slug: item.slug,
    };
    let body = '';

    if (fs.existsSync(mdPath)) {
      const raw = fs.readFileSync(mdPath, 'utf-8');
      const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
      if (fmMatch) {
        try {
          frontmatter = JSON.parse(fmMatch[1].trim());
          body = fmMatch[2].trim();
        } catch {
          body = fmMatch[2].trim();
        }
      } else {
        body = raw.trim();
      }
    }

    switch (item.type) {
      case 'missing_title':
      case 'duplicate_title': {
        frontmatter.title = item.proposedValue || item.title || item.slug;
        appliedLogs.push(`[${item.slug}] Set title -> "${frontmatter.title}"`);
        break;
      }
      case 'missing_meta':
      case 'duplicate_meta': {
        const newMeta =
          item.proposedValue ||
          generateMetaFromH1AndContent(String(frontmatter.title || item.slug), body);
        frontmatter.metaDescription = newMeta;
        frontmatter.excerpt = frontmatter.excerpt || newMeta;
        appliedLogs.push(`[${item.slug}] Generated unique meta description (${newMeta.length} chars)`);
        break;
      }
      case 'future_publish_date': {
        const clamped = parsePublishDateAndClampFuture(frontmatter.publishedAt);
        frontmatter.publishedAt = clamped.dateIso;
        appliedLogs.push(`[${item.slug}] Clamped publish date to ${clamped.dateIso}`);
        break;
      }
      case 'leading_h1_in_content': {
        const converted = convertContentH1ToH2(body, String(frontmatter.title || item.title));
        body = converted.content;
        appliedLogs.push(`[${item.slug}] Converted leading "# H1" to "## H2" in markdown body`);
        break;
      }
      case 'missing_internal_links': {
        const injected = injectContextualInternalLinks(
          body,
          String(frontmatter.title || item.title),
          String(frontmatter.category || 'AI'),
          item.slug
        );
        body = injected.content;
        appliedLogs.push(`[${item.slug}] Auto-injected ${injected.addedCount} contextual internal link(s)`);
        break;
      }
      case 'external_image': {
        const localOptimized = resolveOptimizedCoverImage(frontmatter.coverImage, item.slug);
        const targetCover =
          localOptimized && localOptimized.startsWith('/images/')
            ? `https://www.abuqitmirlabs.tech${localOptimized}`
            : 'https://www.abuqitmirlabs.tech/logo.png';
        frontmatter.coverImage = targetCover;
        appliedLogs.push(`[${item.slug}] Shifted external cover image to local asset (${targetCover})`);
        break;
      }
      default: {
        const fullAuto = autoFixArticle({ ...frontmatter, content: body, slug: item.slug });
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
        appliedLogs.push(`[${item.slug}] Applied full Layer 1 auto-fix`);
      }
    }

    if (fs.existsSync(CONTENT_BLOG_DIR)) {
      const updatedMd = `---\n${JSON.stringify(frontmatter, null, 2)}\n---\n\n${body.trim()}\n`;
      fs.writeFileSync(mdPath, updatedMd, 'utf-8');
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

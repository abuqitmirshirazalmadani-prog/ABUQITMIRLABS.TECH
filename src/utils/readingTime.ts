/**
 * Calculates the estimated reading time for a markdown or plain-text article
 * using a standard 200 words-per-minute (WPM) reading speed.
 */

export interface ReadingTimeResult {
  /** Formatted reading time string, e.g. "6 min read" */
  text: string;
  /** Rounded reading time in minutes (minimum 1) */
  minutes: number;
  /** Total cleaned word count */
  words: number;
}

const WORDS_PER_MINUTE = 200;

/**
 * Strips markdown formatting, code fences, HTML tags, and URLs to count actual readable words.
 */
export function countReadableWords(content?: string | null): number {
  if (!content || typeof content !== 'string') return 0;

  const cleaned = content
    // Remove YAML/JSON frontmatter if present
    .replace(/^---[\s\S]*?---/m, ' ')
    // Remove HTML tags
    .replace(/<[^>]*>/g, ' ')
    // Remove markdown image syntax ![alt](url)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    // Replace markdown links [text](url) with just the link text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    // Remove markdown headings, blockquotes, emphasis, code ticks, table pipes
    .replace(/[#>*_`~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned) return 0;
  return cleaned.split(/\s+/).filter(Boolean).length;
}

/**
 * Returns the full reading time breakdown ({ text, minutes, words }) at 200 WPM.
 */
export function getReadingTimeStats(
  content?: string | null,
  wordsPerMinute: number = WORDS_PER_MINUTE
): ReadingTimeResult {
  const words = countReadableWords(content);
  const wpm = wordsPerMinute > 0 ? wordsPerMinute : WORDS_PER_MINUTE;
  const minutes = Math.max(1, Math.ceil(words / wpm));

  return {
    text: `${minutes} min read`,
    minutes,
    words,
  };
}

/**
 * Returns a formatted reading time label (e.g., "5 min read") based on a 200 WPM metric.
 */
export function calculateReadingTime(
  content?: string | null,
  wordsPerMinute: number = WORDS_PER_MINUTE
): string {
  return getReadingTimeStats(content, wordsPerMinute).text;
}

export default calculateReadingTime;

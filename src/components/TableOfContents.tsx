import React, { useEffect, useMemo, useState } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

export interface TocHeadingItem {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  content?: string;
  containerSelector?: string;
  className?: string;
}

export function slugifyHeading(rawText: string): string {
  return rawText
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function stripMarkdownInline(raw: string): string {
  return raw
    .replace(/<[^>]*>/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .trim();
}

export function parseMarkdownH2Headings(markdown?: string): TocHeadingItem[] {
  if (!markdown) return [];
  const lines = markdown.split(/\r?\n/);
  const items: TocHeadingItem[] = [];
  const seenIds = new Set<string>();
  let inCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = trimmed.match(/^##\s+(.+)$/);
    if (match && match[1]) {
      const cleanText = stripMarkdownInline(match[1]);
      if (!cleanText) continue;
      if (cleanText.toLowerCase() === 'table of contents') continue;

      const id = slugifyHeading(cleanText);
      if (id && !seenIds.has(id)) {
        seenIds.add(id);
        items.push({ id, text: cleanText });
      }
    }
  }

  return items;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  content,
  containerSelector = '[data-article-content]',
  className = '',
}) => {
  const initialHeadings = useMemo(() => parseMarkdownH2Headings(content), [content]);
  const [headings, setHeadings] = useState<TocHeadingItem[]>(initialHeadings);
  const [activeId, setActiveId] = useState<string>(initialHeadings[0]?.id || '');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync with actual rendered <h2> elements inside the article container
  useEffect(() => {
    setHeadings(initialHeadings);
    if (initialHeadings.length > 0 && !activeId) {
      setActiveId(initialHeadings[0].id);
    }

    if (typeof document === 'undefined') return;

    const syncFromDom = () => {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      const h2Nodes = Array.from(container.querySelectorAll('h2'));
      const domItems: TocHeadingItem[] = [];
      const seen = new Set<string>();

      h2Nodes.forEach((node) => {
        const text = (node.textContent || '').trim();
        if (!text || text.toLowerCase() === 'table of contents') return;

        let id = node.getAttribute('id') || '';
        if (!id) {
          id = slugifyHeading(text);
          if (id) {
            node.setAttribute('id', id);
          }
        }

        if (id && !seen.has(id)) {
          seen.add(id);
          domItems.push({ id, text });
        }
      });

      if (domItems.length > 0) {
        setHeadings(domItems);
        setActiveId((prev) => (prev && domItems.some((d) => d.id === prev) ? prev : domItems[0].id));
      }
    };

    const timer = window.setTimeout(syncFromDom, 60);
    return () => window.clearTimeout(timer);
  }, [content, containerSelector, initialHeadings]);

  // Track active <h2> on scroll
  useEffect(() => {
    if (typeof window === 'undefined' || headings.length === 0) return;

    const handleScroll = () => {
      const scrollOffset = 160;
      let currentId = headings[0]?.id || '';

      for (const item of headings) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= scrollOffset) {
            currentId = item.id;
          } else {
            break;
          }
        }
      }

      if (currentId) {
        setActiveId(currentId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  // Strip any #hash fragment from the browser address bar so blog URLs remain 100% canonical
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const cleanUrlHash = () => {
      if (window.location.hash && window.history && window.history.replaceState) {
        const hashId = window.location.hash.replace(/^#/, '');
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
        if (hashId) {
          const target = document.getElementById(hashId);
          if (target) {
            const headerOffset = 128;
            const elementPosition = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: Math.max(0, elementPosition - headerOffset),
              behavior: 'smooth',
            });
          }
        }
      }
    };
    cleanUrlHash();
    window.addEventListener('hashchange', cleanUrlHash);
    return () => window.removeEventListener('hashchange', cleanUrlHash);
  }, []);

  const handleSelectHeading = (id: string) => {
    setActiveId(id);
    setMobileOpen(false);

    if (typeof document !== 'undefined') {
      const target = document.getElementById(id);
      if (target) {
        const headerOffset = 128;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = Math.max(0, elementPosition - headerOffset);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        // Keep URL strictly clean without #hash fragments
        if (window.location.hash && window.history && window.history.replaceState) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      }
    }
  };

  if (headings.length < 2) {
    return null;
  }

  return (
    <nav
      aria-label="Table of Contents"
      data-testid="table-of-contents"
      className={className}
    >
      {/* Mobile / Tablet Collapsible Navigation */}
      <div className="xl:hidden mb-8 bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-semibold text-white hover:text-[#ccff00] transition-colors"
        >
          <span className="flex items-center gap-2.5">
            <List size={16} className="text-[#ccff00]" />
            <span>On This Page ({headings.length} sections)</span>
          </span>
          {mobileOpen ? (
            <ChevronUp size={16} className="text-zinc-400" />
          ) : (
            <ChevronDown size={16} className="text-zinc-400" />
          )}
        </button>

        {mobileOpen && (
          <ol className="px-6 pb-5 pt-2 border-t border-zinc-800/70 space-y-2.5 text-sm">
            {headings.map((item, idx) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectHeading(item.id)}
                    className={`w-full text-left flex items-baseline gap-2.5 py-1 transition-colors leading-snug cursor-pointer ${
                      isActive
                        ? 'text-[#ccff00] font-semibold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="font-mono text-xs text-zinc-500 tabular-nums shrink-0">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <span>{item.text}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        )}
      </div>

      {/* Desktop Sticky Side Navigation */}
      <div className="hidden xl:block bg-[#0b0b0e] border border-zinc-800/80 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-zinc-800/80">
          <List size={15} className="text-[#ccff00] shrink-0" />
          <span className="text-xs font-mono font-bold tracking-wider text-zinc-200">
            On This Page
          </span>
        </div>

        <ol className="space-y-2 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
          {headings.map((item, idx) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleSelectHeading(item.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`w-full text-left group flex items-baseline gap-2.5 py-1.5 px-2.5 rounded-lg text-xs leading-relaxed transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#ccff00]/10 text-[#ccff00] font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.03]'
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] tabular-nums shrink-0 transition-colors ${
                      isActive ? 'text-[#ccff00]' : 'text-zinc-600 group-hover:text-zinc-400'
                    }`}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="line-clamp-2">{item.text}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default TableOfContents;

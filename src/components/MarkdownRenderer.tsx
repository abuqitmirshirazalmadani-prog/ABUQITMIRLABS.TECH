import React from 'react';

interface MarkdownRendererProps {
  children: string;
  components?: Record<string, React.ComponentType<any> | string>;
  remarkPlugins?: any[];
}

function renderInlineNodes(
  text: string,
  components: Record<string, any>,
  keyPrefix = 'inl'
): React.ReactNode[] {
  if (!text) return [];

  const nodes: React.ReactNode[] = [];
  // Matches:
  // 1. Inline image: ![alt](src)
  // 2. Link: [label](href)
  // 3. Inline code: `code`
  // 4. Bold+Italic: ***text***
  // 5. Bold: **text**
  // 6. Italic: *text* (non-space boundary)
  const tokenRegex =
    /!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*\*([\s\S]+?)\*\*\*|\*\*([\s\S]+?)\*\*|\*([^\s*][^*]*?)\*/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let tokenIdx = 0;

  const AnchorComp = components.a || 'a';
  const CodeComp = components.code || 'code';
  const StrongComp = components.strong || 'strong';
  const EmComp = components.em || 'em';
  const ImgComp = components.img || 'img';

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const currentKey = `${keyPrefix}-${tokenIdx++}`;

    if (match[1] !== undefined && match[2] !== undefined) {
      // ![alt](src)
      const alt = match[1].trim();
      const src = match[2].trim();
      nodes.push(<ImgComp key={currentKey} src={src} alt={alt} />);
    } else if (match[3] !== undefined && match[4] !== undefined) {
      // [label](href)
      const label = match[3];
      const href = match[4].trim();
      const innerChildren = renderInlineNodes(label, components, `${currentKey}-a`);
      nodes.push(
        <AnchorComp key={currentKey} href={href}>
          {innerChildren.length === 1 ? innerChildren[0] : innerChildren}
        </AnchorComp>
      );
    } else if (match[5] !== undefined) {
      // `code`
      nodes.push(
        <CodeComp key={currentKey} className="inline-code">
          {match[5]}
        </CodeComp>
      );
    } else if (match[6] !== undefined) {
      // ***bold+italic***
      const inner = renderInlineNodes(match[6], components, `${currentKey}-bi`);
      nodes.push(
        <StrongComp key={currentKey}>
          <EmComp>{inner}</EmComp>
        </StrongComp>
      );
    } else if (match[7] !== undefined) {
      // **bold**
      const inner = renderInlineNodes(match[7], components, `${currentKey}-b`);
      nodes.push(<StrongComp key={currentKey}>{inner}</StrongComp>);
    } else if (match[8] !== undefined) {
      // *italic*
      const inner = renderInlineNodes(match[8], components, `${currentKey}-i`);
      nodes.push(<EmComp key={currentKey}>{inner}</EmComp>);
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

function parseTableCells(rowLine: string): string[] {
  const trimmed = rowLine.trim().replace(/^\|/, '').replace(/\|$/, '');
  return trimmed.split('|').map((c) => c.trim());
}

function isTableSeparatorLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.includes('|') || !trimmed.includes('-')) return false;
  const cells = parseTableCells(trimmed);
  return cells.length > 0 && cells.every((c) => /^:?-{2,}:?$/.test(c));
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  children,
  components = {},
}) => {
  const raw = typeof children === 'string' ? children : String(children || '');
  if (!raw.trim()) return null;

  const cleanedRaw = raw
    .replace(/\r\n/g, '\n')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/^---\s*\n[\s\S]*?\n---\s*\n+/, '')
    .replace(/^([ \t]*#{1,6})[\u00A0]+/gm, '$1 ')
    .replace(/^[ \t]*\*\*(#{1,6})\s+(.+?)\*\*[ \t]*$/gm, '$1 $2')
    .replace(/^([ \t]*#{1,6})([A-Za-z0-9])/gm, '$1 $2');

  const lines = cleanedRaw.split('\n');
  const elements: React.ReactNode[] = [];

  const H1Comp = components.h1 || 'h1';
  const H2Comp = components.h2 || 'h2';
  const H3Comp = components.h3 || 'h3';
  const H4Comp = components.h4 || 'h4';
  const H5Comp = components.h5 || 'h5';
  const H6Comp = components.h6 || 'h6';
  const PComp = components.p || 'p';
  const UlComp = components.ul || 'ul';
  const OlComp = components.ol || 'ol';
  const LiComp = components.li || 'li';
  const BlockquoteComp = components.blockquote || 'blockquote';
  const PreComp = components.pre || 'pre';
  const CodeComp = components.code || 'code';
  const HrComp = components.hr || 'hr';
  const ImgComp = components.img || 'img';
  const TableComp = components.table || 'table';
  const TheadComp = components.thead || 'thead';
  const TbodyComp = components.tbody || 'tbody';
  const TrComp = components.tr || 'tr';
  const ThComp = components.th || 'th';
  const TdComp = components.td || 'td';

  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Blank line
    if (!trimmed) {
      i++;
      continue;
    }

    // 2. Fenced code block ```
    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // skip closing ```
      const codeContent = codeLines.join('\n');
      const codeClassName = lang ? `language-${lang}` : undefined;
      elements.push(
        <PreComp key={`code-${blockKey++}`}>
          <CodeComp className={codeClassName}>{codeContent}</CodeComp>
        </PreComp>
      );
      continue;
    }

    // 3. Horizontal rule --- or ***
    if (/^(?:-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      elements.push(<HrComp key={`hr-${blockKey++}`} />);
      i++;
      continue;
    }

    // 4. Headings (# through ######)
    const headingMatch = trimmed.match(/^(?:\*\*)?(#{1,6})[\s\u00A0]+(.+?)(?:\s*\{#[^}]+\})?(?:\*\*)?\s*#*$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const rawHeadingText = headingMatch[2]
        .replace(/^\*\*([\s\S]+)\*\*$/, '$1')
        .replace(/\s*\{#[^}]+\}\s*$/, '')
        .trim();
      const headingChildren = renderInlineNodes(
        rawHeadingText,
        components,
        `h-${blockKey}`
      );
      const HeadingTag =
        level === 1
          ? H1Comp
          : level === 2
          ? H2Comp
          : level === 3
          ? H3Comp
          : level === 4
          ? H4Comp
          : level === 5
          ? H5Comp
          : H6Comp;

      elements.push(
        <HeadingTag key={`h-${blockKey++}`}>
          {headingChildren.length === 1 ? headingChildren[0] : headingChildren}
        </HeadingTag>
      );
      i++;
      continue;
    }

    // 5. Standalone image line ![alt](src)
    const standaloneImgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (standaloneImgMatch) {
      elements.push(
        <ImgComp
          key={`img-${blockKey++}`}
          alt={standaloneImgMatch[1].trim()}
          src={standaloneImgMatch[2].trim()}
        />
      );
      i++;
      continue;
    }

    // 6. GFM Table
    if (
      trimmed.includes('|') &&
      i + 1 < lines.length &&
      isTableSeparatorLine(lines[i + 1])
    ) {
      const headerCells = parseTableCells(trimmed);
      i += 2; // skip header and separator
      const bodyRows: string[][] = [];
      while (
        i < lines.length &&
        lines[i].trim().includes('|') &&
        lines[i].trim() !== ''
      ) {
        if (!isTableSeparatorLine(lines[i])) {
          bodyRows.push(parseTableCells(lines[i]));
        }
        i++;
      }

      const currentTableKey = blockKey++;
      elements.push(
        <TableComp key={`tbl-${currentTableKey}`}>
          <TheadComp>
            <TrComp>
              {headerCells.map((cell, cIdx) => (
                <ThComp key={`th-${currentTableKey}-${cIdx}`}>
                  {renderInlineNodes(
                    cell,
                    components,
                    `th-${currentTableKey}-${cIdx}`
                  )}
                </ThComp>
              ))}
            </TrComp>
          </TheadComp>
          <TbodyComp>
            {bodyRows.map((row, rIdx) => (
              <TrComp key={`tr-${currentTableKey}-${rIdx}`}>
                {row.map((cell, cIdx) => (
                  <TdComp key={`td-${currentTableKey}-${rIdx}-${cIdx}`}>
                    {renderInlineNodes(
                      cell,
                      components,
                      `td-${currentTableKey}-${rIdx}-${cIdx}`
                    )}
                  </TdComp>
                ))}
              </TrComp>
            ))}
          </TbodyComp>
        </TableComp>
      );
      continue;
    }

    // 7. Blockquote (> ...)
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      const currentQuoteKey = blockKey++;
      const quoteText = quoteLines.join(' ');
      elements.push(
        <BlockquoteComp key={`bq-${currentQuoteKey}`}>
          <PComp>
            {renderInlineNodes(quoteText, components, `bq-${currentQuoteKey}`)}
          </PComp>
        </BlockquoteComp>
      );
      continue;
    }

    // 8. Unordered list (- , * , + )
    if (/^[-*+]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*+]\s+/.test(lines[i].trim())) {
        items.push(
          lines[i]
            .trim()
            .replace(/^[-*+]\s+/, '')
            .replace(/^\[[ xX]\]\s+/, '')
        );
        i++;
      }
      const currentListKey = blockKey++;
      elements.push(
        <UlComp key={`ul-${currentListKey}`}>
          {items.map((item, idx) => (
            <LiComp key={`uli-${currentListKey}-${idx}`}>
              {renderInlineNodes(
                item,
                components,
                `uli-${currentListKey}-${idx}`
              )}
            </LiComp>
          ))}
        </UlComp>
      );
      continue;
    }

    // 9. Ordered list (1. , 2. )
    if (/^\d+[\.\)]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+[\.\)]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+[\.\)]\s+/, ''));
        i++;
      }
      const currentListKey = blockKey++;
      elements.push(
        <OlComp key={`ol-${currentListKey}`}>
          {items.map((item, idx) => (
            <LiComp key={`oli-${currentListKey}-${idx}`}>
              {renderInlineNodes(
                item,
                components,
                `oli-${currentListKey}-${idx}`
              )}
            </LiComp>
          ))}
        </OlComp>
      );
      continue;
    }

    // 10. Standard Paragraph (collect consecutive non-special lines)
    const paraLines: string[] = [];
    while (i < lines.length) {
      const l = lines[i].trim();
      if (
        !l ||
        l.startsWith('```') ||
        /^(?:-{3,}|\*{3,}|_{3,})$/.test(l) ||
        /^(?:\*\*)?#{1,6}[\s\u00A0]+/.test(l) ||
        /^!\[([^\]]*)\]\(([^)]+)\)$/.test(l) ||
        l.startsWith('>') ||
        /^[-*+]\s+/.test(l) ||
        /^\d+[\.\)]\s+/.test(l) ||
        (l.includes('|') &&
          i + 1 < lines.length &&
          isTableSeparatorLine(lines[i + 1]))
      ) {
        break;
      }
      paraLines.push(l);
      i++;
    }

    if (paraLines.length > 0) {
      const currentParaKey = blockKey++;
      const paraText = paraLines.join(' ');
      elements.push(
        <PComp key={`p-${currentParaKey}`}>
          {renderInlineNodes(paraText, components, `p-${currentParaKey}`)}
        </PComp>
      );
    } else {
      i++;
    }
  }

  return <>{elements}</>;
};

export default MarkdownRenderer;

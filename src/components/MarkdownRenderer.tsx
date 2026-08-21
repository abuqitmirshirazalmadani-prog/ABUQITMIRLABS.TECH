import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function unwrapModule(mod: any) {
  let res = mod;
  while (res && typeof res === 'object' && typeof res.default !== 'undefined') {
    res = res.default;
  }
  return res;
}

export interface MarkdownRendererProps {
  children: string;
  remarkPlugins?: any[];
  components?: Record<string, React.ComponentType<any>>;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  children,
  remarkPlugins,
  components = {}
}) => {
  const Component: any = unwrapModule(Markdown);
  const rawPlugins = remarkPlugins || [remarkGfm];
  const resolvedPlugins = Array.isArray(rawPlugins)
    ? rawPlugins.map(unwrapModule).filter((p: any) => typeof p === 'function' || (p && typeof p === 'object' && (p.plugins || p.settings)))
    : [];

  if (!Component || (typeof Component !== 'function' && typeof Component !== 'string')) {
    return <div className="whitespace-pre-wrap">{children}</div>;
  }

  return (
    <Component remarkPlugins={resolvedPlugins} components={components}>
      {children}
    </Component>
  );
};

export default MarkdownRenderer;

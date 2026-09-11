'use client';

import { useState } from 'react';
import { highlight } from '@/lib/highlight';
import { CopyButton } from './copy-button';

export interface CodeTab {
  label: string;
  code: string;
  language?: string;
}

interface CodeTabsProps {
  tabs: CodeTab[];
  filename?: string;
}

export function CodeTabs({ tabs, filename }: CodeTabsProps) {
  const [active, setActive] = useState(0);
  const current = tabs[active];
  if (!current) return null;

  const lang = current.language || current.label.toLowerCase();
  const highlighted = highlight(current.code, lang);

  return (
    <div className="code-surface rounded-lg overflow-hidden my-4">
      <div className="code-header-surface flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
          </div>
          {filename && (
            <span className="ml-1 text-xs text-muted-foreground font-mono">{filename}</span>
          )}
        </div>
        <CopyButton text={current.code} />
      </div>
      <div className="flex gap-1 px-3 pt-2" role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              i === active
                ? 'bg-primary/15 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}

'use client';

import { highlight } from '@/lib/highlight';
import { CopyButton } from './copy-button';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showHeader?: boolean;
}

export function CodeBlock({ code, language = 'typescript', filename, showHeader = true }: CodeBlockProps) {
  const highlighted = highlight(code, language);

  return (
    <div className="code-surface rounded-lg overflow-hidden my-4">
      {showHeader && (
        <div className="code-header-surface flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
            </div>
            {filename && (
              <span className="ml-2 text-xs text-muted-foreground font-mono">{filename}</span>
            )}
          </div>
          <CopyButton text={code} />
        </div>
      )}
      {!showHeader && (
        <div className="flex justify-end px-3 pt-2">
          <CopyButton text={code} />
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}

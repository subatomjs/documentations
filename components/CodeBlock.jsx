"use client";

import { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import { Check, Copy } from "lucide-react";

if (typeof window !== "undefined") {
  Prism.manual = true;
}

export default function CodeBlock({ code, language = "typescript", filename = null }) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current && code) {
      codeRef.current.className = `language-${language}`;
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code snippet", err);
    }
  };

  return (
    <div className="group relative my-4 rounded-xl bg-(--bg-code) overflow-hidden transition-colors duration-200">
      {filename && (
        <div className="flex items-center justify-between border-b border-(--border-code) bg-(--bg-code-header) px-4 py-2 text-xs font-mono text-(--text-secondary) transition-colors duration-200">
          <span className="flex items-center gap-2 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {filename}
          </span>
          <span className="uppercase text-[10px] text-(--text-muted) font-semibold">
            {language}
          </span>
        </div>
      )}

      {/* Uplifted/positioned cleanly relative to the code content area */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code snippet"
        className="cursor-pointer absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-lg border border-(--border-code) bg-(--bg-code-header) text-(--text-secondary) opacity-85 transition hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:opacity-100 shadow-md backdrop-blur-sm"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <Copy className="h-4 w-4 cursor-pointer" />
        )}
      </button>

      <div className="p-4 overflow-x-auto text-sm leading-relaxed text-(--text-code-plain)">
        <pre className={`language-${language} m-0 bg-transparent p-0`} suppressHydrationWarning>
          <code ref={codeRef} className={`language-${language}`}>
            {code.trim()}
          </code>
        </pre>
      </div>
    </div>
  );
}

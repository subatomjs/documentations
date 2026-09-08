"use client";

import { useState } from "react";
import { Check, Copy, FileCode } from "lucide-react";
import { useDevPreferences } from "./Providers";
import { tokenizeCode } from "../lib/syntax-highlighter";

export function CodeBlock({
  filename = "code",
  tsCode,
  jsCode,
  singleCode,
  language = "javascript",
}) {
  const { codeLang, setCodeLang } = useDevPreferences();
  const [copied, setCopied] = useState(false);

  const hasVariants = Boolean(tsCode && jsCode);
  const activeCode = hasVariants
    ? codeLang === "ts"
      ? tsCode
      : jsCode
    : singleCode || tsCode || jsCode || "";

  const tokenizedLines = tokenizeCode(activeCode, language);
  const lineKeyCounts = new Map();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  return (
    <div className="my-6 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-950 overflow-hidden shadow-xs transition">
      <div className="px-4 py-2.5 bg-surface-100/80 dark:bg-surface-900/90 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <FileCode className="w-3.5 h-3.5 text-leaf-600 dark:text-leaf-400" />
          <span className="text-xs font-mono font-medium text-surface-700 dark:text-surface-300">
            {filename}
            {hasVariants ? (codeLang === "ts" ? ".ts" : ".js") : ""}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {hasVariants && (
            <div className="flex items-center bg-surface-200 dark:bg-surface-850 p-0.5 rounded-md text-[11px] font-mono font-semibold">
              <button
                type="button"
                onClick={() => setCodeLang("js")}
                className={`px-2 py-0.5 rounded transition ${
                  codeLang === "js"
                    ? "bg-white dark:bg-surface-700 text-leaf-600 dark:text-leaf-400 shadow-xs"
                    : "text-surface-500 hover:text-surface-900 dark:hover:text-white"
                }`}
              >
                JS
              </button>
              <button
                type="button"
                onClick={() => setCodeLang("ts")}
                className={`px-2 py-0.5 rounded transition ${
                  codeLang === "ts"
                    ? "bg-white dark:bg-surface-700 text-leaf-600 dark:text-leaf-400 shadow-xs"
                    : "text-surface-500 hover:text-surface-900 dark:hover:text-white"
                }`}
              >
                TS
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy code block"
            className="flex items-center space-x-1 text-[11px] font-mono px-2.5 py-1 rounded bg-surface-200 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-700 hover:text-surface-900 dark:hover:text-white transition"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-leaf-600 dark:text-leaf-400" />
                <span className="text-leaf-600 dark:text-leaf-400 font-semibold">
                  Copied
                </span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <pre className="p-4 font-mono text-xs overflow-x-auto leading-relaxed text-surface-800 dark:text-slate-300">
        {tokenizedLines.map((tokens) => {
          const lineContent = tokens.map((tok) => tok.content).join("");
          const lineOccurrence = lineKeyCounts.get(lineContent) || 0;
          lineKeyCounts.set(lineContent, lineOccurrence + 1);

          const tokenKeyCounts = new Map();

          return (
            <div
              key={`line-${lineContent}-${lineOccurrence}`}
              className="table-row"
            >
              <span className="table-cell pr-4 select-none text-surface-400 dark:text-surface-600 text-right w-8 text-[11px]">
                {lineOccurrence + 1}
              </span>
              <span className="table-cell">
                {tokens.map((tok) => {
                  const tokenKey = `${tok.type}-${tok.content}`;
                  const tokenOccurrence = tokenKeyCounts.get(tokenKey) || 0;
                  tokenKeyCounts.set(tokenKey, tokenOccurrence + 1);
                  let colorClass = "text-surface-800 dark:text-slate-200";
                  if (tok.type === "keyword")
                    colorClass =
                      "text-rose-600 dark:text-rose-400 font-semibold";
                  if (tok.type === "string")
                    colorClass = "text-leaf-700 dark:text-leaf-400";
                  if (tok.type === "type")
                    colorClass = "text-amber-600 dark:text-amber-400";
                  if (tok.type === "function")
                    colorClass = "text-sky-600 dark:text-sky-400";
                  if (tok.type === "comment")
                    colorClass = "text-surface-400 dark:text-slate-500 italic";
                  if (tok.type === "number")
                    colorClass = "text-purple-600 dark:text-purple-400";
                  if (tok.type === "operator")
                    colorClass = "text-pink-600 dark:text-pink-400";

                  return (
                    <span
                      key={`tok-${tokenKey}-${tokenOccurrence}`}
                      className={colorClass}
                    >
                      {tok.content}
                    </span>
                  );
                })}
              </span>
            </div>
          );
        })}
      </pre>
    </div>
  );
}

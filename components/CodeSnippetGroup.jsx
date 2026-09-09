"use client";

import { SiTypescript, SiJavascript } from "react-icons/si";
import { usePreferences } from "../context/PreferencesContext";
import CodeBlock from "./CodeBlock";

export default function CodeSnippetGroup({ js, ts, filename = null }) {
  const { lang, setLang } = usePreferences();
  const activeCode = lang === "js" ? js || ts : ts || js;
  const activeLang = lang === "js" ? "javascript" : "typescript";

  // Derive dynamic filename extension if a base filename is supplied without/with extension
  const getDisplayFilename = () => {
    if (!filename) {
      return (
        <span className="text-[11px] font-semibold tracking-wider uppercase text-(--text-muted)">
          Schema Definition
        </span>
      );
    }
    const baseName = filename.includes(".")
      ? filename.substring(0, filename.lastIndexOf("."))
      : filename;
    const extension = lang === "js" ? "js" : "ts";
    return `${baseName}.${extension}`;
  };

  return (
    <div className="my-5 rounded-xl border border-(--border-code) bg-(--bg-code) shadow-md overflow-hidden transition-colors duration-200">
      <div className="flex items-center justify-between border-b border-(--border-code) bg-(--bg-code-header) px-4 py-2 transition-colors duration-200">
        <div className="flex items-center gap-2 text-xs font-mono text-(--text-secondary) font-medium">
          <span>{getDisplayFilename()}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg bg-(--bg-primary) p-0.5 border border-(--border-code) shadow-inner">
            <button
              type="button"
              onClick={() => setLang("ts")}
              title="Switch to TypeScript"
              className={`cursor-pointer flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                lang === "ts"
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/30 shadow-sm"
                  : "text-(--text-secondary) hover:text-(--text-primary)"
              }`}
            >
              <SiTypescript className="w-3.5 h-3.5 text-blue-500" />
              <span>TS</span>
            </button>
            <button
              type="button"
              onClick={() => setLang("js")}
              title="Switch to JavaScript"
              className={`cursor-pointer flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                lang === "js"
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/30 shadow-sm"
                  : "text-(--text-secondary) hover:text-(--text-primary)"
              }`}
            >
              <SiJavascript className="w-3.5 h-3.5 text-amber-500" />
              <span>JS</span>
            </button>
          </div>
        </div>
      </div>

      <CodeBlock code={activeCode} language={activeLang} />
    </div>
  );
}

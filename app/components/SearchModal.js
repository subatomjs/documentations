"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { SEARCH_INDEX } from "../lib/docs-config";

export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === "Escape" && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = !query.trim()
    ? SEARCH_INDEX.slice(0, 6)
    : SEARCH_INDEX.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.keywords.some((k) => k.toLowerCase().includes(q))
        );
      });

  const handleSelect = (href) => {
    onClose(false);
    setQuery("");
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-surface-950/60 backdrop-blur-sm transition-opacity duration-150">
      <div className="w-full max-w-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-2xl shadow-2xl overflow-hidden transition-transform duration-150 scale-100">
        <div className="p-3.5 border-b border-surface-200 dark:border-surface-800 flex items-center space-x-3">
          <Search className="w-4 h-4 text-leaf-500" />
          <input
            type="text"
            placeholder="Search subatom-pulse documentation, APIs, wire protocol..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-surface-900 dark:text-white placeholder-surface-400 focus:outline-none font-sans"
          />
          <button
            type="button"
            onClick={() => onClose(false)}
            className="p-1 text-surface-400 hover:text-surface-600 dark:hover:text-surface-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-surface-100 dark:divide-surface-800/50">
          {results.length === 0 ? (
            <div className="p-6 text-center text-xs text-surface-400">
              No documentation pages found matching &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((res) => (
              <button
                key={res.href}
                type="button"
                onClick={() => handleSelect(res.href)}
                className="w-full text-left p-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-leaf-600 dark:text-leaf-400 block mb-0.5">
                    {res.category}
                  </span>
                  <div className="text-xs font-semibold text-surface-900 dark:text-surface-100">
                    {res.title}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-surface-400 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition" />
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 bg-surface-50 dark:bg-surface-950 border-t border-surface-200 dark:border-surface-800 text-[11px] text-surface-400 flex justify-between font-mono">
          <span>Navigate with ↵ Enter</span>
          <span>ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { searchIndex } from "../lib/searchIndex";
import { Search, Hash, ArrowRight, X } from "lucide-react";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef(null);

  const filtered = query.trim()
    ? searchIndex
        .filter((item) => {
          const q = query.toLowerCase();
          return (
            item.title.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            item.keywords.some((k) => k.toLowerCase().includes(q)) ||
            item.description.toLowerCase().includes(q)
          );
        })
        .slice(0, 8)
    : searchIndex.slice(0, 6);

  const navigateTo = useCallback(
    (href) => {
      onClose();
      router.push(href);
    },
    [onClose, router]
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        navigateTo(filtered[selectedIndex].href);
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, navigateTo, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-2xl border border-(--border-color) bg-(--bg-card) shadow-2xl overflow-hidden">
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-(--border-color) px-4 py-3 bg-(--bg-primary)">
          <Search className="h-5 w-5 text-(--text-muted)" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search schemas, methods, guides..."
            className="w-full bg-transparent text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded p-1 text-(--text-muted) hover:text-(--text-primary)"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2 bg-(--bg-card)">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-(--text-secondary)">
              No results found for &ldquo;
              <span className="text-(--brand-primary) font-semibold">{query}</span>
              &rdquo;
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((item, idx) => (
                <button
                  key={item.href + item.title}
                  tabIndex={0}
                  type="button"
                  onClick={() => navigateTo(item.href)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  aria-label={`${item.title}: ${item.description}`}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 cursor-pointer transition w-full text-left ${
                    idx === selectedIndex
                      ? "bg-(--brand-glow) border border-(--brand-primary)/40 text-(--text-primary)"
                      : "text-(--text-secondary) hover:bg-(--bg-tertiary)"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--bg-tertiary) text-(--text-muted)">
                      <Hash className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs uppercase font-bold text-(--text-muted) tracking-wider">
                        {item.category}
                      </div>
                      <div className="text-sm font-semibold text-(--text-primary)">
                        {item.title}
                      </div>
                      <div className="text-xs text-(--text-secondary) line-clamp-1">
                        {item.description}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-(--text-muted)" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-(--border-color) bg-(--bg-secondary) px-4 py-2 text-[11px] text-(--text-secondary) font-mono">
          <div className="flex items-center gap-2">
            <span>
              Navigate{" "}
              <kbd className="rounded bg-(--bg-tertiary) border border-(--border-color) px-1 py-0.5">
                ↓
              </kbd>{" "}
              <kbd className="rounded bg-(--bg-tertiary) border border-(--border-color) px-1 py-0.5">
                ↑
              </kbd>
            </span>
            <span>
              Select{" "}
              <kbd className="rounded bg-(--bg-tertiary) border border-(--border-color) px-1 py-0.5">
                ↵
              </kbd>
            </span>
          </div>
          <span>
            Close{" "}
            <kbd className="rounded bg-(--bg-tertiary) border border-(--border-color) px-1 py-0.5">
              ESC
            </kbd>
          </span>
        </div>
      </div>
    </div>
  );
}

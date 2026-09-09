"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { SubatomLogo, GithubIcon, NpmIcon } from "./Icons";
import ThemeToggle from "./ThemeToggle";
import SearchModal from "./SearchModal";
import { Search, Menu, X, BookOpen, Layers } from "lucide-react";
import { docsNavigation } from "../lib/docsData";

export default function Navbar({ onToggleMobileSidebar = null }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-(--border-color) bg-(--bg-primary)/90 backdrop-blur-md transition-colors duration-200">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3.5">
            {onToggleMobileSidebar && (
              <button
                type="button"
                onClick={onToggleMobileSidebar}
                className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-(--border-color) text-(--text-secondary)"
                aria-label="Toggle sidebar drawer"
              >
                <Menu className="h-5 w-5 cursor-pointer" />
              </button>
            )}

            <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-90">
              <SubatomLogo className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-(--text-primary)">
                  Subatom{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                    Infer
                  </span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-(--text-muted) font-medium hidden sm:inline-block">
                  Runtime Validator
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-500/25">
              v1.4.0
            </span>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="cursor-pointer flex w-full items-center justify-between rounded-xl border border-(--border-color) bg-(--bg-secondary) px-3 py-1.5 text-xs text-(--text-secondary) transition hover:border-emerald-500 hover:text-(--text-primary) shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5 text-(--text-muted)" />
                <span>Search documentation, APIs, types...</span>
              </div>
              <kbd className="rounded border border-(--border-color) bg-(--bg-tertiary) px-1.5 py-0.5 text-[10px] font-mono text-(--text-secondary) font-semibold">
                ⌘K
              </kbd>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="cursor-pointer md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-(--border-color) text-(--text-secondary)"
              aria-label="Open search"
            >
              <Search className="h-4 w-4" />
            </button>

            <Link
              href="/docs"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-(--text-secondary) hover:text-emerald-600 dark:hover:text-emerald-400 transition px-2 py-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Docs
            </Link>

            <Link
              href="/docs/api-reference"
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-(--text-secondary) hover:text-emerald-600 dark:hover:text-emerald-400 transition px-2 py-1"
            >
              <Layers className="w-3.5 h-3.5" />
              API
            </Link>

            <div className="h-4 w-px bg-(--border-color) hidden sm:block" />

            <a
              href="https://github.com/subatomjs/subatom-infer"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hidden sm:flex h-9 w-9 items-center justify-center rounded-lg border border-(--border-color) bg-(--bg-card) text-(--text-secondary) hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
              aria-label="GitHub repository"
            >
              <GithubIcon className="w-4 h-4 cursor-pointer" />
            </a>

            <a
              href="https://www.npmjs.com/package/subatom-infer"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hidden sm:flex h-9 w-9 items-center justify-center rounded-lg border border-(--border-color) bg-(--bg-card) text-(--text-secondary) hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
              aria-label="npm package"
            >
              <NpmIcon className="w-4 h-4 cursor-pointer" />
            </a>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-(--border-color) bg-(--bg-card) text-(--text-secondary)"
              aria-label="Toggle main menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 z-50 bg-(--bg-primary) border-b border-(--border-color) px-6 py-6 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto transition-colors">
          <div className="mb-6">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center justify-between bg-(--bg-secondary) border border-(--border-color) rounded-xl p-3 text-xs text-(--text-secondary) font-mono"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-500" />
                <span>Search documentation...</span>
              </div>
              <kbd className="bg-(--bg-tertiary) px-1.5 py-0.5 rounded text-[10px]">⌘K</kbd>
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-(--border-color)">
            <a
              href="https://github.com/subatomjs/subatom-infer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-(--border-color) bg-(--bg-card) text-xs font-semibold text-(--text-secondary)"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/subatom-infer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-(--border-color) bg-(--bg-card) text-xs font-semibold text-(--text-secondary)"
            >
              <NpmIcon className="w-4 h-4" />
              NPM
            </a>
          </div>

          <div className="space-y-6 text-xs">
            <div>
              <div className="font-bold text-(--text-primary) uppercase tracking-wider text-[11px] mb-3 font-mono">
                Quick Links
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/docs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg bg-(--bg-secondary) border border-(--border-color) text-(--text-secondary) hover:text-emerald-500 font-medium"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Documentation
                </Link>
                <Link
                  href="/docs/api-reference"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg bg-(--bg-secondary) border border-(--border-color) text-(--text-secondary) hover:text-emerald-500 font-medium"
                >
                  <Layers className="w-3.5 h-3.5" />
                  API Reference
                </Link>
              </div>
            </div>

            {docsNavigation?.map((group) => (
              <div key={group.title}>
                <div className="font-bold text-(--text-primary) uppercase tracking-wider text-[11px] mb-2 font-mono">
                  {group.title}
                </div>
                <ul className="space-y-2 border-l border-(--border-color) pl-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-(--text-secondary) hover:text-emerald-600 dark:hover:text-emerald-400 py-1"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

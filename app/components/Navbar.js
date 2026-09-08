"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { SITE_METADATA, DOCS_NAVIGATION } from "../lib/docs-config";
import { ThemeToggle } from "./ThemeToggle";
import { SearchModal } from "./SearchModal";
import { BrandLogo } from "./BrandLogo";

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-surface-950/80 border-b border-surface-200 dark:border-surface-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="flex items-center"
              aria-label="subatom-pulse home"
            >
              <BrandLogo size="navbar" priority />
            </Link>
            <span className="text-[10px] bg-leaf-100 dark:bg-leaf-950/80 text-leaf-800 dark:text-leaf-300 font-mono px-2 py-0.5 rounded-full border border-leaf-500/20 font-semibold">
              {SITE_METADATA.version}
            </span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="relative hidden md:flex items-center w-64 bg-surface-100 dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-lg px-3 py-1.5 text-xs text-surface-400 hover:border-leaf-500/50 transition font-mono"
            >
              <Search className="w-3.5 h-3.5 mr-2 text-leaf-500" />
              <span>Search docs...</span>
              <kbd className="absolute right-2 text-[10px] bg-surface-200 dark:bg-surface-800 text-surface-500 px-1.5 py-0.5 rounded">
                ⌘K
              </kbd>
            </button>

            <nav className="hidden lg:flex items-center space-x-6 text-xs font-medium text-surface-600 dark:text-surface-300">
              <Link
                href="/docs"
                className="hover:text-leaf-600 dark:hover:text-leaf-400 transition"
              >
                Docs
              </Link>
              <Link
                href="/docs/quickstart"
                className="hover:text-leaf-600 dark:hover:text-leaf-400 transition"
              >
                Quickstart
              </Link>
              <Link
                href="/docs/api/server"
                className="hover:text-leaf-600 dark:hover:text-leaf-400 transition"
              >
                API Reference
              </Link>
              <Link
                href="/docs/deployment"
                className="hover:text-leaf-600 dark:hover:text-leaf-400 transition"
              >
                Deployment
              </Link>
            </nav>

            <div className="h-4 w-px bg-surface-200 dark:bg-surface-800 hidden sm:block" />

            <a
              href={SITE_METADATA.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 text-surface-700 dark:text-surface-300 hover:text-leaf-600 dark:hover:text-leaf-400 transition"
              aria-label="GitHub Repository"
            >
              <FaGithub className="w-4 h-4" />
            </a>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 text-surface-700 dark:text-surface-300"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 top-16 bg-white dark:bg-surface-950 px-6 py-6 overflow-y-auto border-b border-surface-200 dark:border-surface-800">
          <div className="mb-6">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              className="w-full flex items-center bg-surface-100 dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-lg p-3 text-xs text-surface-400 font-mono"
            >
              <Search className="w-4 h-4 mr-2 text-leaf-500" />
              <span>Search documentation...</span>
            </button>
          </div>

          <div className="space-y-6 text-xs">
            {DOCS_NAVIGATION.map((section) => (
              <div key={section.title}>
                <div className="font-bold text-surface-900 dark:text-surface-100 uppercase tracking-wider text-[11px] mb-2 font-mono">
                  {section.title}
                </div>
                <ul className="space-y-2 border-l border-surface-200 dark:border-surface-800 pl-3">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-surface-600 dark:text-surface-400 hover:text-leaf-600 dark:hover:text-leaf-400 py-1"
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

      <SearchModal isOpen={searchOpen} onClose={setSearchOpen} />
    </>
  );
}
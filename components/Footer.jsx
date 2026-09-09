import Link from "next/link";
import { SubatomLogo, GithubIcon, NpmIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t border-(--border-color) bg-(--bg-secondary) py-12 text-xs transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <SubatomLogo className="w-6 h-6" />
              <span className="text-sm font-bold text-(--text-primary)">
                Subatom{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">Infer</span>
              </span>
            </Link>
            <p className="max-w-sm text-(--text-secondary) leading-relaxed text-xs sm:text-sm">
              Production-grade runtime data validation, dual sync/async parsing, prototype defense,
              and static type inference engine for modern JavaScript and TypeScript runtimes[cite:
              3].
            </p>
            <div className="flex items-center gap-3 pt-2 text-(--text-secondary)">
              <a
                href="https://github.com/subatomjs/subatom-infer"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition"
              >
                <GithubIcon className="w-4 h-4 cursor-pointer" />
              </a>
              <a
                href="https://www.npmjs.com/package/subatom-infer"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition"
              >
                <NpmIcon className="w-4 h-4 cursor-pointer" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold font-mono uppercase tracking-wider text-(--text-primary) mb-3">
              Documentation
            </h4>
            <ul className="space-y-2 text-(--text-secondary)">
              <li>
                <Link
                  href="/docs"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                >
                  Introduction
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/installation"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                >
                  Installation
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/quick-start"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                >
                  Quick Start
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/primitives"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                >
                  Primitives
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/objects"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                >
                  Objects & Structs
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/api-reference"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                >
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-mono uppercase tracking-wider text-(--text-primary) mb-3">
              Ecosystem & Legal
            </h4>
            <ul className="space-y-2 text-(--text-secondary)">
              <li>
                <a
                  href="https://infer.subatomjs.dev"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                >
                  Subatom Framework
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/subatomjs/subatom-infer/blob/main/LICENSE"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                >
                  MIT License
                </a>
                [cite: 3]
              </li>
              <li>
                <a
                  href="mailto:kunal@subatomjs.dev"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                >
                  Maintainer Contact
                </a>
                [cite: 3]
              </li>
              <li>
                <a
                  href="https://github.com/subatomjs/subatom-infer/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                >
                  Issue Tracker
                </a>
                [cite: 1]
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-(--border-color) pt-6 flex flex-col sm:flex-row items-center justify-between text-(--text-muted) gap-4">
          <p>
            © {new Date().getFullYear()} Subatom Framework. Created by Kunal Chandra Das[cite: 1,
            3].
          </p>
          <p className="font-mono text-[11px]">Domain: https://infer.subatomjs.dev</p>
        </div>
      </div>
    </footer>
  );
}

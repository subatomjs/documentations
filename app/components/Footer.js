import { SITE_METADATA } from "../lib/docs-config";

export function Footer() {
  return (
    <footer className="border-t border-surface-200 dark:border-surface-800/80 bg-white dark:bg-surface-950 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-surface-500 font-mono space-y-2">
        <p>
          subatom-pulse {SITE_METADATA.version} • Maintained by{" "}
          <a
            href="mailto:kunal@subatomjs.dev"
            className="text-leaf-600 dark:text-leaf-400 hover:underline font-semibold"
          >
            {SITE_METADATA.maintainer}
          </a>{" "}
          • Released under the {SITE_METADATA.license} License
        </p>
        <p className="text-[11px] text-surface-400">
          Engineered for high-throughput Node.js 24+ runtimes. Native WebSockets
          with zero HTTP fallback bloat.
        </p>
      </div>
    </footer>
  );
}

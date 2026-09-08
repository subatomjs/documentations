import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function Pagination({ prev, next }) {
  return (
    <div className="mt-16 pt-8 border-t border-surface-200 dark:border-surface-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={prev.href}
          className="p-4 rounded-xl border border-surface-200 dark:border-surface-800 hover:border-leaf-500/50 bg-surface-50/50 dark:bg-surface-900/40 transition group"
        >
          <div className="text-[11px] font-mono text-surface-400 flex items-center space-x-1.5 mb-1">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition" />
            <span>Previous</span>
          </div>
          <div className="text-xs font-semibold text-surface-900 dark:text-white">
            {prev.title}
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="p-4 rounded-xl border border-surface-200 dark:border-surface-800 hover:border-leaf-500/50 bg-surface-50/50 dark:bg-surface-900/40 transition text-right group"
        >
          <div className="text-[11px] font-mono text-surface-400 flex items-center justify-end space-x-1.5 mb-1">
            <span>Next</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
          </div>
          <div className="text-xs font-semibold text-surface-900 dark:text-white">
            {next.title}
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}

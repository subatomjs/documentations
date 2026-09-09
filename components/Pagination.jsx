import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Pagination({ prev = null, next = null }) {
  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-(--border-color) pt-6">
      {prev ? (
        <Link
          href={prev.href}
          className="cursor-pointer flex w-full sm:w-auto items-center gap-3 rounded-xl border border-(--border-color) bg-(--bg-card) p-3 text-left transition hover:border-emerald-500 group shadow-sm"
        >
          <ArrowLeft className="h-4 w-4 text-(--text-muted) group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition" />
          <div>
            <div className="text-[10px] uppercase font-mono text-(--text-muted) font-semibold">
              Previous
            </div>
            <div className="text-xs font-bold text-(--text-primary) group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
              {prev.title}
            </div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="cursor-pointer flex w-full sm:w-auto items-center justify-end gap-3 rounded-xl border border-(--border-color) bg-(--bg-card) p-3 text-right transition hover:border-emerald-500 group shadow-sm ml-auto"
        >
          <div>
            <div className="text-[10px] uppercase font-mono text-(--text-muted) font-semibold">
              Next
            </div>
            <div className="text-xs font-bold text-(--text-primary) group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
              {next.title}
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-(--text-muted) group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}

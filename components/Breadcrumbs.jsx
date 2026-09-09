import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ category, title }) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className="mb-4 flex items-center gap-1.5 text-xs text-(--text-secondary) font-mono"
    >
      <Link href="/docs" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
        Docs
      </Link>
      <ChevronRight className="h-3 w-3 text-(--text-muted)" />
      <span className="text-(--text-secondary) font-medium">{category}</span>
      <ChevronRight className="h-3 w-3 text-(--text-muted)" />
      <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{title}</span>
    </nav>
  );
}

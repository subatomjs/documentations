import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs({ items = [] }) {
  return (
    <nav
      className="flex items-center space-x-2 text-xs font-mono text-surface-500 mb-6"
      aria-label="Breadcrumb"
    >
      <Link href="/" className="hover:text-leaf-500 transition">
        <Home className="w-3.5 h-3.5" />
      </Link>
      <ChevronRight className="w-3 h-3 text-surface-400" />
      <Link href="/docs" className="hover:text-leaf-500 transition">
        docs
      </Link>
      {items.map((item, idx) => (
        <div key={item.label} className="flex items-center space-x-2">
          <ChevronRight className="w-3 h-3 text-surface-400" />
          {idx === items.length - 1 ? (
            <span className="text-leaf-600 dark:text-leaf-400 font-semibold">
              {item.label}
            </span>
          ) : (
            <Link href={item.href} className="hover:text-leaf-500 transition">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

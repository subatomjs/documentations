"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNavigation } from "../lib/docsData";

export default function Sidebar({ onItemClick = null }) {
  const pathname = usePathname();

  return (
    <aside className="h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto py-6 pr-4 border-r border-(--border-color)">
      <nav className="space-y-6">
        {docsNavigation?.map((group) => (
          <div key={group.title} className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-(--text-primary) opacity-85 font-mono px-3">
              {group.title}
            </h3>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onItemClick}
                      className={`cursor-pointer flex items-center justify-between rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                        isActive
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold border-l-2 border-emerald-600 dark:border-emerald-400 shadow-sm"
                          : "text-(--text-secondary) hover:bg-(--bg-tertiary) hover:text-(--text-primary)"
                      }`}
                    >
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="rounded bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 text-[9px] font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

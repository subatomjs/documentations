"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_NAVIGATION } from "../lib/docs-config";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-surface-200 dark:border-surface-800/80 pr-4 py-8">
      <nav className="space-y-8 text-xs font-medium">
        {DOCS_NAVIGATION.map((section, idx) => (
          <div key={section.title}>
            <div className="uppercase text-[11px] font-bold tracking-wider text-surface-500 dark:text-surface-400 mb-3 flex items-center space-x-1.5 font-mono">
              <span className="text-leaf-600 dark:text-leaf-400">{`0${idx + 1}`}</span>
              <span>{section.title.split(". ")[1] || section.title}</span>
            </div>
            <ul className="space-y-1.5 border-l border-surface-200 dark:border-surface-800 pl-3">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block py-1 px-2 rounded-md transition ${
                        isActive
                          ? "bg-leaf-50 dark:bg-leaf-950/60 text-leaf-700 dark:text-leaf-400 font-semibold border-l-2 border-leaf-500 -ml-3.75 pl-3.25"
                          : "text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white"
                      }`}
                    >
                      {item.title}
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

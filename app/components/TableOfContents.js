"use client";

import { useEffect, useState } from "react";

export function TableOfContents({ items = [] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -60% 0%" },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <aside className="w-56 flex-shrink-0 hidden xl:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto pl-6 py-8">
      <h6 className="text-[11px] font-bold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-3 font-mono">
        On This Page
      </h6>
      <ul className="space-y-2 text-xs font-mono text-surface-500 dark:text-surface-400">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block transition ${
                activeId === item.id
                  ? "text-leaf-600 dark:text-leaf-400 font-semibold translate-x-1"
                  : "hover:text-surface-900 dark:hover:text-white"
              }`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

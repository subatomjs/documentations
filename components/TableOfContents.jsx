"use client";

import { useEffect, useState } from "react";
import { AlignLeft } from "lucide-react";

export default function TableOfContents({ headings = [] }) {
  const [activeId, setActiveId] = useState(headings[0]?.id || "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0% 0% -60% 0%" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <div className="hidden xl:block w-56 shrink-0 py-6 pl-4 border-l border-(--border-color)">
      <div className="sticky top-20 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase font-mono tracking-wider text-(--text-primary) opacity-85">
          <AlignLeft className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          On this page
        </div>
        <ul className="space-y-1 text-xs">
          {headings.map((h) => {
            const isMatch = activeId === h.id;
            return (
              <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 12}px` }}>
                <a
                  href={`#${h.id}`}
                  className={`block py-1 transition leading-snug cursor-pointer ${
                    isMatch
                      ? "text-emerald-700 dark:text-emerald-400 font-bold"
                      : "text-(--text-secondary) hover:text-(--text-primary)"
                  }`}
                >
                  {h.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

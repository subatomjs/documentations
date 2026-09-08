"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-lg bg-surface-200 dark:bg-surface-800" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle visual theme"
      className="p-2 rounded-lg border border-surface-300 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 text-surface-700 dark:text-surface-300 hover:text-leaf-600 dark:hover:text-leaf-400 hover:border-leaf-500/50 transition duration-150 focus:outline-none focus:ring-2 focus:ring-leaf-500"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-leaf-400" />
      ) : (
        <Moon className="w-4 h-4 text-surface-700" />
      )}
    </button>
  );
}

"use client";

import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Laptop } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Toggle display theme"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-(--border-color) bg-(--bg-card) text-(--text-secondary) transition hover:border-emerald-500 hover:text-emerald-500"
      >
        {theme === "dark" && <Moon className="h-4 w-4" />}
        {theme === "light" && <Sun className="h-4 w-4" />}
        {theme === "system" && <Laptop className="h-4 w-4" />}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 rounded-xl border border-(--border-color) bg-(--bg-card) p-1 shadow-xl z-50 text-xs">
          <button
            type="button"
            onClick={() => {
              setTheme("light");
              setOpen(false);
            }}
            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 transition ${
              theme === "light"
                ? "bg-emerald-500/10 text-emerald-500 font-semibold"
                : "text-(--text-secondary) hover:bg-(--bg-tertiary)"
            }`}
          >
            <Sun className="h-3.5 w-3.5" /> Light
          </button>
          <button
            type="button"
            onClick={() => {
              setTheme("dark");
              setOpen(false);
            }}
            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 transition ${
              theme === "dark"
                ? "bg-emerald-500/10 text-emerald-500 font-semibold"
                : "text-(--text-secondary) hover:bg-(--bg-tertiary)"
            }`}
          >
            <Moon className="h-3.5 w-3.5" /> Dark
          </button>
          <button
            type="button"
            onClick={() => {
              setTheme("system");
              setOpen(false);
            }}
            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 transition ${
              theme === "system"
                ? "bg-emerald-500/10 text-emerald-500 font-semibold"
                : "text-(--text-secondary) hover:bg-(--bg-tertiary)"
            }`}
          >
            <Laptop className="h-3.5 w-3.5" /> System
          </button>
        </div>
      )}
    </div>
  );
}

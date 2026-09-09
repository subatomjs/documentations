"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "system",
  resolvedTheme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("system");
  const [resolvedTheme, setResolvedTheme] = useState("dark");

  useEffect(() => {
    const stored = localStorage.getItem("subatom_theme") || "system";
    setThemeState(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const computeResolved = () => {
      if (theme === "system") {
        return mediaQuery.matches ? "dark" : "light";
      }
      return theme;
    };

    const apply = () => {
      const active = computeResolved();
      setResolvedTheme(active);
      if (active === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    apply();
    const listener = () => {
      if (theme === "system") apply();
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [theme]);

  const setTheme = (nextTheme) => {
    setThemeState(nextTheme);
    localStorage.setItem("subatom_theme", nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

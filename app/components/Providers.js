"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

const DevPreferencesContext = createContext({
  codeLang: "ts",
  setCodeLang: () => {},
  pkgManager: "npm",
  setPkgManager: () => {},
});

export function useDevPreferences() {
  return useContext(DevPreferencesContext);
}

export function Providers({ children }) {
  const [codeLang, setCodeLangState] = useState("ts");
  const [pkgManager, setPkgManagerState] = useState("npm");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("subatom_code_lang");
      if (savedLang === "js" || savedLang === "ts") setCodeLangState(savedLang);

      const savedPkg = localStorage.getItem("subatom_pkg_manager");
      if (["npm", "pnpm", "yarn", "bun"].includes(savedPkg)) {
        setPkgManagerState(savedPkg);
      }
    } catch {
      // Graceful fallback if localStorage is unavailable
    }
  }, []);

  const setCodeLang = (lang) => {
    setCodeLangState(lang);
    try {
      localStorage.setItem("subatom_code_lang", lang);
    } catch {}
  };

  const setPkgManager = (pkg) => {
    setPkgManagerState(pkg);
    try {
      localStorage.setItem("subatom_pkg_manager", pkg);
    } catch {}
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <DevPreferencesContext.Provider
        value={{ codeLang, setCodeLang, pkgManager, setPkgManager }}
      >
        {children}
      </DevPreferencesContext.Provider>
    </ThemeProvider>
  );
}

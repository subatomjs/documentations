"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PreferencesContext = createContext({
  lang: "ts",
  setLang: () => {},
  packageManager: "npm",
  setPackageManager: () => {},
});

export function PreferencesProvider({ children }) {
  const [lang, setLangState] = useState("ts");
  const [packageManager, setPackageManagerState] = useState("npm");

  useEffect(() => {
    const storedLang = localStorage.getItem("subatom_lang");
    if (storedLang === "js" || storedLang === "ts") setLangState(storedLang);

    const storedPM = localStorage.getItem("subatom_pm");
    if (["npm", "pnpm", "yarn", "bun"].includes(storedPM)) setPackageManagerState(storedPM);
  }, []);

  const setLang = (nextLang) => {
    setLangState(nextLang);
    localStorage.setItem("subatom_lang", nextLang);
  };

  const setPackageManager = (nextPM) => {
    setPackageManagerState(nextPM);
    localStorage.setItem("subatom_pm", nextPM);
  };

  return (
    <PreferencesContext.Provider value={{ lang, setLang, packageManager, setPackageManager }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  return useContext(PreferencesContext);
}

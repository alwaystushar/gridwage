"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import en from "./en.json";
import ar from "./ar.json";
import es from "./es.json";

const languages = { en, ar, es };

const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
  t: en,
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  // Load language from localStorage (safe for SSR)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("lang");
      if (saved && languages[saved]) setLang(saved);
    }
  }, []);

  // Save language when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lang", lang);
    }
  }, [lang]);

  const t = useMemo(() => languages[lang] || languages.en, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return context;
}

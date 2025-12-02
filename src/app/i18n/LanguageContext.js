"use client";

import { createContext, useContext, useEffect, useState } from "react";
import en from "./en.json";
import ar from "./ar.json";
import es from "./es.json";

const languages = { en, ar, es };
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // 1) Read language from localStorage OR default to "en"
  const [lang, setLang] = useState("en");

  // 2) Sync state with localStorage on first mount
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (saved && languages[saved]) {
      setLang(saved);
    }
  }, []);

  // 3) Whenever language changes, store it
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
    }
  }, [lang]);

  const t = languages[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

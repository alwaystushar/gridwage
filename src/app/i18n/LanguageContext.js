"use client";

import { createContext, useContext, useState, useEffect } from "react";

const SUPPORTED_LANGS = ["en", "ar", "es"];

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Just track the current language; each page/component loads its own i18n
  const [lang, setLang] = useState("en");

  // Initialise from localStorage if available
  useEffect(() => {
    const storedLang = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (storedLang && SUPPORTED_LANGS.includes(storedLang)) {
      setLang(storedLang);
    }
  }, []);

  // Persist language choice
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

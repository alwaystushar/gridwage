"use client";

import { createContext, useContext, useState, useEffect } from "react";
import en from "./en.json";
import ar from "./ar.json";
import es from "./es.json";

const languages = { en, ar, es };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // 1. Initialize lang from storage OR fallback to "en"
  const [lang, setLang] = useState("en");

  // 2. Read from localStorage on first mount (safe client side)
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang && languages[storedLang]) {
      setLang(storedLang);
    }
  }, []);

  // 3. Save to localStorage whenever language updates
  useEffect(() => {
    localStorage.setItem("lang", lang);
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

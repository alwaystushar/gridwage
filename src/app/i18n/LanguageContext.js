"use client";

import { createContext, useContext, useState, useEffect } from "react";
import en from "./en.json";
import ar from "./ar.json";
import es from "./es.json";

const languages = { en, ar, es };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  // load saved language on client mount
  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored) setLang(stored);
  }, []);

  const changeLang = (lng) => {
    setLang(lng);
    localStorage.setItem("lang", lng);
  };

  const t = languages[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

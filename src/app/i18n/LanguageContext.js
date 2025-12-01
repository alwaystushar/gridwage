"use client";

import { createContext, useContext, useState } from "react";
import en from "./en.json";
import ar from "./ar.json";
import es from "./es.json";

const languages = { en, ar, es };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

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

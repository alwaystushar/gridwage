"use client";

import { useLang } from "./i18n/LanguageContext";

export default function DirectionWrapper({ children }) {
  const { lang } = useLang();
  return <div dir={lang === "ar" ? "rtl" : "ltr"}>{children}</div>;
}

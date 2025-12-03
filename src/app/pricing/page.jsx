"use client";

import { useLang } from "../i18n/LanguageContext";
import en from "./i18n/en.json";
import ar from "./i18n/ar.json";
import es from "./i18n/es.json";

const dictByLang = { en, ar, es };

function PricingContent() {
  const { lang } = useLang();
  const t = dictByLang[lang] || dictByLang.en;

  return (
    <div className="p-10" dir={lang === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <p className="mt-4">{t.body}</p>
    </div>
  );
}

export default function PricingPage() {
  return <PricingContent />;
}

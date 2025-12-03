"use client";

import { useLang } from "../../i18n/LanguageContext";
import en from "../i18n/en.json";
import ar from "../i18n/ar.json";
import es from "../i18n/es.json";

const dictByLang = { en, ar, es };

export default function HeroSection() {
  const { lang } = useLang();
  const t = dictByLang[lang] || dictByLang.en;

  return (
    <section className="pt-20 pb-16 px-6 md:px-20 bg-gray-50" dir={lang === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-4xl md:text-6xl font-bold max-w-4xl">
        {t.hero_title}
      </h1>
      <p className="mt-6 text-xl text-gray-600 max-w-2xl">
        {t.hero_sub}
      </p>
      <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        {t.hero_cta}
      </button>
    </section>
  );
}

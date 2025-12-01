"use client";

import { useLang } from "../i18n/LanguageContext";

function AboutContent() {
  const { t, lang } = useLang();

  return (
    <div className="p-10" dir={lang === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold">About Us</h1>
      <p className="mt-4">{t.hero_sub}</p>
    </div>
  );
}

export default function AboutPage() {
  return <AboutContent />;
}

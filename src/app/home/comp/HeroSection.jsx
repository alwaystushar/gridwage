"use client";

import { useLang } from "../../i18n/LanguageContext";

export default function HeroSection() {
  const { t } = useLang();

  return (
    <section className="pt-20 pb-16 px-6 md:px-20 bg-gray-50">
      <h1 className="text-4xl md:text-6xl font-bold max-w-4xl">
        {t.hero_title}
      </h1>
      <p className="mt-6 text-xl text-gray-600 max-w-2xl">
        {t.hero_sub}
      </p>
      <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Get Started
      </button>
    </section>
  );
}

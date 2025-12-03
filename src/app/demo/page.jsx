"use client";

import Link from "next/link";
import DirectionWrapper from "../DirectionWrapper";
import { useLang } from "../i18n/LanguageContext";
import en from "./i18n/en.json";
import ar from "./i18n/ar.json";
import es from "./i18n/es.json";

const dictByLang = { en, ar, es };

export default function DemoPage() {
  const { lang } = useLang();
  const t = dictByLang[lang] || dictByLang.en;

  return (
    <DirectionWrapper>
      <main className="pt-[8vw] pb-[6vw] px-[4vw] md:px-[12vw] bg-white text-[#111] min-h-screen">
        <section className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-[#7b46ff]">
            Preview
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t.body}{" "}
            <Link href="/product/eor" className="text-[#7b46ff] underline">
              product pages
            </Link>{" "}
            or{" "}
            <a
              href="mailto:hello@gridwage.com"
              className="text-[#7b46ff] underline"
            >
              contact us
            </a>
            .
          </p>
        </section>
      </main>
    </DirectionWrapper>
  );
}


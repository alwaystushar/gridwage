"use client";

import Link from "next/link";
import DirectionWrapper from "../DirectionWrapper";
import { useLang } from "../i18n/LanguageContext";
import solutions from "./data";

export default function SolutionsPage() {
  const { lang } = useLang();

  return (
    <DirectionWrapper>
      <main className="pt-[8vw] pb-[6vw] px-[4vw] md:px-[12vw] bg-white min-h-screen">
        <section className="max-w-5xl mx-auto space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-[#7b46ff]">
              Solutions
            </p>
            <h1 className="text-5xl font-bold">How we help you grow</h1>
            <p className="text-lg text-gray-600 mt-4">
              Tailored solutions to support your global expansion strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutions.map((solution) => (
              <Link
                key={solution.slug}
                href={`/solution/${solution.slug}`}
                className="group"
              >
                <div
                  className="border rounded-2xl p-6 flex flex-col gap-4 bg-gray-50/60 group-hover:bg-gray-100 transition-colors h-full cursor-pointer"
                  style={{ borderColor: "#ece7ff" }}
                >
                  <h2 className="text-xl font-semibold group-hover:text-[#7b46ff] transition-colors">
                    {solution.title[lang] || solution.title.en}
                  </h2>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {solution.summary[lang] || solution.summary.en}
                  </p>
                  <span className="text-[#7b46ff] font-medium text-sm uppercase tracking-wide mt-auto">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </DirectionWrapper>
  );
}

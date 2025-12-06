"use client";

import { useMemo } from "react";
import { useLang } from "../../i18n/LanguageContext";
import DirectionWrapper from "../../DirectionWrapper";
import Link from "next/link";
import solutions from "../data";

export default function SolutionClient({ params }) {
  const { lang } = useLang();

  // FIXED lookup
  const current = useMemo(() => {
    if (!params?.slug) {
      console.warn("No slug in params:", params);
      return null;
    }
    
    if (!Array.isArray(solutions)) {
      console.error("solutions is not an array:", solutions, "type:", typeof solutions);
      return null;
    }
    
    const found = solutions.find(s => s.slug === params.slug);
    if (!found) {
      console.warn(`Solution with slug "${params.slug}" not found. Available slugs:`, solutions.map(s => s.slug));
    }
    return found ?? null;
  }, [params?.slug]);

  if (!current) return (
    <DirectionWrapper>
      <main className="min-h-screen flex items-center justify-center pt-[8vw]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Solution not found</h1>
          <p className="mt-2 text-gray-600">Slug: {params?.slug}</p>
          <Link href="/solution" className="text-[#7b46ff] mt-4 inline-block">
            Back to Solutions
          </Link>
        </div>
      </main>
    </DirectionWrapper>
  );

  const title = current.title?.[lang] ?? current.title.en;
  const summary = current.summary?.[lang] ?? current.summary.en;
  const content = current.content?.[lang] ?? current.content.en;
  const features = current.features || [];

  return (
    <DirectionWrapper>
      <main className="pt-[8vw] pb-[6vw] px-[4vw] md:px-[12vw] bg-white min-h-screen">
        <section className="max-w-4xl mx-auto space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-[#7b46ff]">
              Solution
            </p>

            <h1 className="mt-2 text-4xl font-semibold md:text-5xl">
              {title}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              {summary}
            </p>
          </div>

          <div className="prose prose-lg text-gray-700 max-w-none">
            {content && typeof content === 'string' && content.split("\n").map((line, i) => {
              const trimmed = line.trim();
              if (trimmed.startsWith("## "))
                return (
                  <h2 key={i} className="mt-8 mb-4 text-2xl font-semibold">
                    {trimmed.replace("## ", "")}
                  </h2>
                );

              if (trimmed.startsWith("### "))
                return (
                  <h3 key={i} className="mt-6 mb-3 text-xl font-semibold">
                    {trimmed.replace("### ", "")}
                  </h3>
                );

              if (trimmed.startsWith("- "))
                return (
                  <li key={i} className="my-2 ml-4 list-disc">
                    {trimmed.replace("- ", "")}
                  </li>
                );

              if (trimmed === "") return null;

              return (
                <p key={i} className="my-3 leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {features.length > 0 && (
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              {features.map((f, i) => (
                <div key={i} className="p-6 border rounded-lg" style={{ borderColor: "#ece7ff" }}>
                  <h3 className="mb-2 text-lg font-semibold">
                    {f.title[lang] ?? f.title.en}
                  </h3>
                  <p className="text-gray-600">
                    {f.description[lang] ?? f.description.en}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/demo"
              className="rounded-full border px-6 py-3 text-[#7b46ff] font-medium hover:bg-purple-50 transition"
            >
              Try demo
            </Link>

            <a
              href="mailto:hello@gridwage.com"
              className="px-6 py-3 font-medium text-gray-900 transition border rounded-full hover:bg-gray-50"
            >
              Talk to sales
            </a>
          </div>
        </section>
      </main>
    </DirectionWrapper>
  );
}

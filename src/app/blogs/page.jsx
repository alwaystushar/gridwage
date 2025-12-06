"use client";

import Link from "next/link";
import DirectionWrapper from "../DirectionWrapper";
import { useLang } from "../i18n/LanguageContext";
import blogs from "./data/blogs";

export default function BlogsPage() {
  const { lang } = useLang();

  return (
    <DirectionWrapper>
      <main className="pt-[8vw] pb-[6vw] px-[4vw] md:px-[12vw] bg-white min-h-screen">
        <section className="max-w-5xl mx-auto space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-[#7b46ff]">
              Resources
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold">
              People ops insights
            </h1>
            <p className="text-lg text-gray-600">
              Explore our collection of articles covering global payroll, team management, and HR best practices.
            </p>
          </div>

          <div className="space-y-4">
            {blogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="block"
              >
                <article
                  className="border rounded-2xl p-6 flex flex-col gap-4 bg-gray-50/60 hover:bg-gray-100 transition-colors cursor-pointer"
                  style={{ borderColor: "#ece7ff" }}
                >
                  <h2 className="text-xl font-semibold">
                    {blog.title[lang] || blog.title.en}
                  </h2>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {blog.excerpt[lang] || blog.excerpt.en}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#7b46ff] font-medium text-sm uppercase tracking-wide">
                      Read more
                    </span>
                    <span className="text-gray-500 text-sm">
                      {blog.date[lang] || blog.date.en}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </DirectionWrapper>
  );
}

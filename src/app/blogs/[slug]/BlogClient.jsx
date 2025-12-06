"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useLang } from "../../i18n/LanguageContext";
import DirectionWrapper from "../../DirectionWrapper";
import blogs from "../data/blogs";

export default function BlogClient({ params }) {
  const { lang } = useLang();

  const blog = useMemo(() => {
    if (!params?.slug) {
      console.warn("No slug in params:", params);
      return null;
    }
    
    if (!Array.isArray(blogs)) {
      console.error("blogs is not an array:", blogs, "type:", typeof blogs);
      return null;
    }
    
    const found = blogs.find((b) => b.slug === params.slug);
    if (!found) {
      console.warn(`Blog with slug "${params.slug}" not found. Available slugs:`, blogs.map(b => b.slug));
    }
    return found ?? null;
  }, [params?.slug]);

  if (!blog) {
    return (
      <DirectionWrapper>
        <main className="min-h-screen flex items-center justify-center pt-[8vw]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Blog not found</h1>
            <p className="text-gray-600 mt-2">Slug: {params?.slug}</p>
            <Link href="/blogs" className="text-[#7b46ff] mt-4 inline-block">
              Back to Blogs
            </Link>
          </div>
        </main>
      </DirectionWrapper>
    );
  }

  const title = blog.title[lang] || blog.title.en;
  const content = blog.content[lang] || blog.content.en;
  const date = blog.date[lang] || blog.date.en;

  return (
    <DirectionWrapper>
      <main className="pt-[8vw] pb-[6vw] px-[4vw] md:px-[12vw] bg-white min-h-screen">
        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link href="/blogs" className="text-[#7b46ff] hover:text-purple-700 text-sm font-semibold mb-4 inline-block">
              ← Back to Blogs
            </Link>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-[#7b46ff] mb-2">
                Article
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
              <div className="flex gap-4 text-sm text-gray-600">
                <span>{blog.author}</span>
                <span>•</span>
                <span>{date}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              {content.split("\n").map((paragraph, idx) => {
                if (paragraph.startsWith("##")) {
                  return (
                    <h2 key={idx} className="text-2xl font-semibold mt-8 mb-4">
                      {paragraph.replace("##", "").trim()}
                    </h2>
                  );
                }
                if (paragraph.startsWith("###")) {
                  return (
                    <h3 key={idx} className="text-xl font-semibold mt-6 mb-3">
                      {paragraph.replace("###", "").trim()}
                    </h3>
                  );
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <li key={idx} className="ml-4 my-2">
                      {paragraph.replace("- ", "")}
                    </li>
                  );
                }
                if (paragraph.trim() === "") {
                  return null;
                }
                return (
                  <p key={idx} className="text-gray-700 leading-relaxed my-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            <div className="mt-12 pt-6 border-t">
              <Link
                href="/blogs"
                className="text-[#7b46ff] hover:text-purple-700 font-semibold"
              >
                ← Back to all articles
              </Link>
            </div>
          </div>
        </article>
      </main>
    </DirectionWrapper>
  );
}

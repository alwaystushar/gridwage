"use client";

import DirectionWrapper from "../DirectionWrapper";

const featuredPosts = [
  {
    title: "Global payroll trends to watch in 2025",
    excerpt:
      "From instant payouts to AI-assisted compliance checks, here is what finance leaders are prioritising this year.",
  },
  {
    title: "How to launch in 5 new markets without local entities",
    excerpt:
      "A practical checklist for people teams that want to experiment in new countries without long legal lead times.",
  },
  {
    title: "Managing bilingual teams with confidence",
    excerpt:
      "Tips for keeping documentation, onboarding, and cultural rituals inclusive across English, Arabic, and Spanish speakers.",
  },
];

export default function BlogsPage() {
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
              Full articles are coming soon. Until then, here is a preview of
              the topics we are preparing for the blog.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <article
                key={post.title}
                className="border rounded-2xl p-6 flex flex-col gap-4 bg-gray-50/60"
                style={{ borderColor: "#ece7ff" }}
              >
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  {post.excerpt}
                </p>
                <span className="text-[#7b46ff] font-medium text-sm uppercase tracking-wide">
                  Coming soon
                </span>
              </article>
            ))}
          </div>
        </section>
      </main>
    </DirectionWrapper>
  );
}


import blogs from "../data/blogs";
import BlogClient from "./BlogClient";

export async function generateStaticParams() {
  if (!Array.isArray(blogs)) {
    console.error("blogs is not an array:", blogs);
    return [];
  }
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export const metadata = {
  title: "Blog Article",
  description: "Read our latest insights and best practices",
};

export default async function BlogPage({ params }) {
  const resolvedParams = await Promise.resolve(params);
  return <BlogClient params={resolvedParams} />;
}

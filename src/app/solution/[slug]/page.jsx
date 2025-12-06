import solutions from "../data";
import SolutionClient from "./SolutionClient";

export async function generateStaticParams() {
  if (!Array.isArray(solutions)) {
    console.error("solutions is not an array:", solutions);
    return [];
  }
  return solutions.map(s => ({ slug: s.slug }));
}

export default async function SolutionPage({ params }) {
  const resolvedParams = await Promise.resolve(params);
  return <SolutionClient params={resolvedParams} />;
}

import products from "../data/products";
import ProductClient from "./ProductClient";

// REQUIRED ❗ Next.js static generation
export async function generateStaticParams() {
  if (!Array.isArray(products)) {
    console.error("products is not an array:", products);
    return [];
  }
  return products.map(p => ({ slug: p.slug }));
}

export default async function ProductPage({ params }) {
  const resolvedParams = await Promise.resolve(params);
  return <ProductClient params={resolvedParams} />;
}

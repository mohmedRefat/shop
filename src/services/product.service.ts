import { Product } from "@/types/products";

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products", { next: { revalidate: 20 } });
  const data = await res.json();
  // Deduplicate products by id
  const seen = new Set();
  const uniqueProducts = data.products.filter((product: Product) => {
    if (seen.has(product.id)) return false;
    seen.add(product.id);
    return true;
  });
  return uniqueProducts;
}

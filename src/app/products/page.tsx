import { Suspense } from "react";
import ProductFilters from "@/components/Filter";
import ProductsList from "@/components/ProductsList";
import { getAllProducts } from "@/services/product.service";
import { Product } from "@/types/products";

export const revalidate = 20;

export default async function ProductsPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const rawCategory = searchParams?.category;
  const category = typeof rawCategory === "string" ? rawCategory : "all";

  let products: Product[] = await getAllProducts();

  if (category !== "all") {
    products = products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  return (
    <main className="min-h-[70vh] bg-gradient-to-b from-[#232b36] to-[#181a1b] text-white pb-10">
      <section className="text-center py-10">
        <h1 className="text-4xl font-extrabold mb-2 drop-shadow-lg">Browse Our Products</h1>
        <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
          Explore our wide range of products. Use the filters to find exactly what you need!
        </p>
      </section>
      <section className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <ProductFilters products={products} />
        </div>
        <Suspense fallback={<p className="text-center">Loading products...</p>}>
          <ProductsList products={products} />
        </Suspense>
      </section>
    </main>
  );
}

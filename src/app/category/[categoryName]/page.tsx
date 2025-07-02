import { notFound } from "next/navigation";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export default async function CategoryPage({
  params,
}: {
  params: { categoryName: string };
}) {
  const { categoryName } = params;

  let productsToDisplay: Product[] = [];

  try {
    const res = await fetch(
      `https://dummyjson.com/products/category/${categoryName}`,
      {
        cache: "no-store"
      }
    );

    if (!res.ok) {
      return notFound();
    }

    const data: { products?: Product[] } = await res.json();

    if (data.products && Array.isArray(data.products)) {
        productsToDisplay = data.products;
    } else {
        return notFound();
    }

    if (productsToDisplay.length === 0) {
        return notFound();
    }

  } catch {
    return notFound();
  }

  return (
    <main className="min-h-[70vh] bg-gradient-to-b from-[#232b36] to-[#181a1b] text-white flex flex-col items-center justify-center py-12 px-2">
      <section className="w-full max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg text-center capitalize">
          Category: {categoryName}
        </h1>
        <Link href="/category" className="block text-blue-400 hover:underline text-center mb-8">&larr; Back to Categories</Link>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productsToDisplay.map((product) => (
            <div
              key={product.id}
              className="bg-[#232b36] rounded-xl p-6 shadow hover:shadow-lg transition flex flex-col items-center"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover rounded mb-2"
                loading="lazy"
              />
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              <p className="text-blue-400 font-bold text-lg mb-2">${product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
import Link from "next/link";

const categories = ["smartphones", "laptops"];

export default function CategoryPage() {
  return (
    <main className="min-h-[70vh] bg-gradient-to-b from-[#232b36] to-[#181a1b] text-white flex flex-col items-center justify-center py-12 px-2">
      <section className="text-center mb-10">
        <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Shop by Category</h2>
        <p className="text-lg text-gray-300 mb-6 max-w-xl mx-auto">
          Choose a category to explore our curated selection of products.
        </p>
      </section>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        {categories.map((cat) => (
          <li key={cat} className="bg-[#232b36] rounded-xl shadow p-8 text-center hover:bg-[#2d3642] transition">
            <Link className="text-2xl font-semibold text-blue-400 hover:underline" href={`/category/${cat}`}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

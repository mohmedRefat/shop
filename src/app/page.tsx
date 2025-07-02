import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#232b36] to-[#181a1b] text-white">
      <section className="text-center py-16">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Welcome to Modern Shop</h1>
        <p className="text-lg mb-8 max-w-xl mx-auto text-gray-300">
          Discover the best products, amazing deals, and a seamless shopping experience. Browse our categories and find what you love!
        </p>
        <Link href="/products">
          <button className="bg-[#6c47ff] hover:bg-[#5936c7] text-white font-semibold px-8 py-3 rounded-full text-lg shadow transition">
            Shop Now
          </button>
        </Link>
      </section>
      <section className="w-full max-w-5xl px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#232b36] rounded-xl p-6 shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-400">Get your products delivered quickly and reliably to your doorstep.</p>
          </div>
          <div className="bg-[#232b36] rounded-xl p-6 shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
            <p className="text-gray-400">Enjoy competitive prices and exclusive deals on top products.</p>
          </div>
          <div className="bg-[#232b36] rounded-xl p-6 shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
            <p className="text-gray-400">Shop with confidence with our secure payment and privacy protection.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from 'next/link';

async function getProduct(productId: string) {
  const res = await fetch(`https://dummyjson.com/products/${productId}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailsPage({ params }: { params: { productId: string } }) {
  const product = await getProduct(params.productId);

  if (!product) return <div className="text-center text-2xl text-red-400 mt-20">Product not found</div>;

  return (
    <main className="min-h-[70vh] bg-gradient-to-b from-[#232b36] to-[#181a1b] text-white flex flex-col items-center justify-center py-12 px-2">
      <div className="w-full max-w-3xl bg-[#232b36] rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">{product.title}</h1>
            <p className="text-gray-300 mb-4">{product.description}</p>
            <p className="text-2xl text-blue-400 font-bold mb-2">${product.price}</p>
            <p className="text-sm text-gray-400 mb-6">Category: {product.category}</p>
          </div>
          {/* You can add Add to Cart logic here as a client component if needed */}
          <Link href="/products" className="mt-4 text-blue-400 hover:underline">&larr; Back to Products</Link>
        </div>
      </div>
    </main>
  );
}

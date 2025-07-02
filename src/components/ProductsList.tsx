"use client";
/* eslint-disable @next/next/no-img-element */
// src/components/ProductsList.tsx
import Link from 'next/link';
import type { Product } from '@/types/products';
import { useState } from 'react';
import { useAuth, SignInButton } from '@clerk/nextjs';

export default function ProductList({ products }: { products: Product[] }) {
  const [expanded, setExpanded] = useState<{ [id: number]: boolean }>({});
  const { isSignedIn } = useAuth();

  const handleAddToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  const toggleDescription = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-xl p-4 shadow hover:shadow-lg transition block"
        >
          <Link href={`/products/${product.id}`}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
          </Link>
          <p>
            {expanded[product.id]
              ? (typeof product.description === 'string' ? product.description : '')
              : (typeof product.description === 'string'
                  ? product.description.slice(0, 60) + (product.description.length > 60 ? '...' : '')
                  : '')}
            {typeof product.description === 'string' && product.description.length > 60 && (
              <button
                className="ml-2 text-blue-500 underline"
                onClick={() => toggleDescription(product.id)}
              >
                {expanded[product.id] ? 'See less' : 'See more'}
              </button>
            )}
          </p>
          {isSignedIn ? (
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
                Sign in to Add to Cart
              </button>
            </SignInButton>
          )}
        </div>
      ))}
    </div>
  );
}

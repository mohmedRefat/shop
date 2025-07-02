"use client";

import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

const getCart = () => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem('cart');
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

const setCart = (cart: any[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export default function CartPage() {
  const queryClient = useQueryClient();
  const { data: cart = [], refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  const updateQuantity = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      const updated = cart.map((item: any) =>
        item.id === id ? { ...item, quantity } : item
      );
      setCart(updated);
      return updated;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const removeItem = useMutation({
    mutationFn: async (id: number) => {
      const updated = cart.filter((item: any) => item.id !== id);
      setCart(updated);
      return updated;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  useEffect(() => {
    refetch();
  }, []);

  let total = 0;
  try {
    total = cart.reduce((sum: number, item: any) => {
      const price = typeof item.price === 'number' ? item.price : 0;
      const quantity = typeof item.quantity === 'number' ? item.quantity : 1;
      return sum + price * quantity;
    }, 0);
  } catch {
    total = 0;
  }

  return (
    <main className="min-h-[70vh] bg-gradient-to-b from-[#232b36] to-[#181a1b] flex flex-col items-center justify-center py-12 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold mb-8 drop-shadow-lg text-center text-[#232b36]">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center text-lg text-gray-700">
            Your cart is empty.<br />
            <Link href="/products" className="inline-block mt-4 bg-[#6c47ff] hover:bg-[#5936c7] text-white font-semibold px-6 py-2 rounded-full shadow transition">Continue Shopping</Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-300">
            {cart.map((item: any, index: number) => (
              <li key={item.id ?? `cart-item-${index}`} className="flex items-center justify-between py-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-lg text-[#232b36]">{item.title || 'Unknown Product'}</span>
                  <span className="text-gray-500 text-sm">${typeof item.price === 'number' ? item.price : 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={typeof item.quantity === 'number' ? item.quantity : 1}
                    onChange={e => updateQuantity.mutate({ id: item.id, quantity: Number(e.target.value) })}
                    className="w-16 px-2 py-1 border rounded text-black"
                  />
                  <button onClick={() => removeItem.mutate(item.id)} className="ml-2 text-red-500 hover:text-red-700 font-bold">Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8 text-2xl font-bold text-right text-[#232b36]">Total: ${total.toFixed(2)}</div>
      </div>
    </main>
  );
}

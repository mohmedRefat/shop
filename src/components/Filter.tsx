'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import ProductList from './ProductsList';
import type { Product } from '@/types/products';
const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'fragrances', label: 'Fragrances' },
  { value: 'groceries', label: 'Groceries' },
];

export default function ProductFilters({ products }: { products: Product[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentParam = searchParams.get('category') || 'all';

  const filtered = useMemo(() => {
    const category = searchParams.get('category') || 'all';
    return products.filter((p) =>
      category === 'all' ? true : p.category.toLowerCase() === category
    );
  }, [products, searchParams]);

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');
    if (value !== 'all') {
      params.set('category', value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="flex gap-4 mb-4 flex-wrap">
        <select
          value={currentParam}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="bg-blue-100 text-blue-800 font-semibold border border-blue-500 p-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <ProductList products={filtered} />
    </>
  );
}
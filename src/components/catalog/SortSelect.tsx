'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function SortSelect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const currentSort = searchParams.get('sort') || 'recommended';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`/catalog/search?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-charcoal/70">
        Sort by:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="px-3 py-2 border border-light-border rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-teal"
      >
        <option value="recommended">Recommended</option>
        <option value="title-asc">Alphabetical A-Z</option>
        <option value="title-desc">Alphabetical Z-A</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProducts } from '@/lib/shopify/products';
import { extractMetafields, shouldHideProduct, formatPrice } from '@/lib/catalog/helpers';
import type { ShopifyProduct } from '@/lib/shopify/types';
import ProductCard from '@/components/catalog/ProductCard';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function performSearch() {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await getProducts(50, undefined, query);
        
        // Filter out hidden products
        const visibleProducts = result.products.filter(product => {
          const metafields = extractMetafields(product.metafields.nodes);
          return !shouldHideProduct(metafields);
        });

        setSearchResults(visibleProducts);
      } catch (err) {
        setError('Failed to search products. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    performSearch();
  }, [query]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('q') as string;
    
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    router.push(`/catalog/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Search Header */}
      <section className="bg-gradient-to-br from-teal to-dark-teal text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/catalog"
            className="inline-block text-white/80 hover:text-white mb-4 text-sm"
          >
            ← Back to Catalog
          </Link>
          <h1 className="text-3xl font-bold mb-6">Search Products</h1>
          
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search by product name, SKU, type, or vendor..."
                className="flex-1 px-4 py-3 rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-orange"
              />
              <button
                type="submit"
                className="bg-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange/90 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Search Results */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        {loading && (
          <div className="text-center py-12">
            <p className="text-charcoal/70">Searching...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!loading && !error && query && (
          <div className="mb-6">
            <p className="text-charcoal/70">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{query}"
            </p>
          </div>
        )}

        {!loading && !error && searchResults.length === 0 && query && (
          <div className="text-center py-12">
            <p className="text-charcoal/70 mb-4">No products found matching your search.</p>
            <Link
              href="/catalog"
              className="text-teal hover:underline"
            >
              Browse all collections
            </Link>
          </div>
        )}

        {!loading && !error && !query && (
          <div className="text-center py-12">
            <p className="text-charcoal/70 mb-4">Enter a search term to find products.</p>
            <p className="text-sm text-charcoal/50">
              You can search by product name, SKU, product type, vendor, or tags.
            </p>
          </div>
        )}

        {!loading && !error && searchResults.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-soft-white flex items-center justify-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}

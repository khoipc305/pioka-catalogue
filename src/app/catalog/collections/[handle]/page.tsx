import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCollectionByHandle } from '@/lib/shopify/collections';
import { getCatalogConfig } from '@/lib/catalog/config';
import { extractMetafields, shouldHideProduct, formatPrice } from '@/lib/catalog/helpers';
import Image from 'next/image';
import ProductCard from '@/components/catalog/ProductCard';

export const dynamic = 'force-dynamic';

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);
  const config = getCatalogConfig(handle);

  if (!collection) {
    notFound();
  }

  // Filter out hidden products
  const visibleProducts = collection.products.nodes.filter(product => {
    const metafields = extractMetafields(product.metafields.nodes);
    return !shouldHideProduct(metafields);
  });

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Collection Header */}
      <section className="bg-gradient-to-br from-teal to-dark-teal text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/catalog"
            className="inline-block text-white/80 hover:text-white mb-4 text-sm"
          >
            ← Back to Catalog
          </Link>
          <h1 className="text-4xl font-bold mb-2">
            {config?.displayName || collection.title}
          </h1>
          {collection.description && (
            <p className="text-lg opacity-90 mb-4">{collection.description}</p>
          )}
          <p className="text-sm opacity-75">
            {visibleProducts.length} products
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        {visibleProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-charcoal/70">No products available in this collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

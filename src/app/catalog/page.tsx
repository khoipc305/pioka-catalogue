import Link from 'next/link';
import { getAllCollectionsPaginated } from '@/lib/shopify/collections';
import { getVisibleCatalogCollections } from '@/lib/catalog/config';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function CatalogPage() {
  const shopifyCollections = await getAllCollectionsPaginated();
  const catalogConfig = getVisibleCatalogCollections();

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal to-dark-teal text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">PIOKA USA</h1>
          <p className="text-2xl mb-2">2026 Wholesale Product Catalog</p>
          <p className="text-lg opacity-90 mb-8">Beverage Ingredients • Food-Service Packaging • Custom Printing</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/catalog/collections"
              className="bg-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange/90 transition-colors"
            >
              Browse Collections
            </Link>
            <Link
              href="/catalog/print"
              className="bg-white text-teal px-8 py-3 rounded-lg font-semibold hover:bg-warm-cream transition-colors"
            >
              Print Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-charcoal mb-8">Product Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogConfig.map((config) => {
            const collection = shopifyCollections.find(c => c.handle === config.collectionHandle);
            return (
              <Link
                key={config.collectionHandle}
                href={`/catalog/collections/${config.collectionHandle}`}
                className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-warm-cream relative">
                  {collection?.image ? (
                    <Image
                      src={collection.image.url}
                      alt={collection.image.altText || config.displayName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-teal">
                      <span className="text-4xl">📦</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-charcoal mb-2 group-hover:text-teal transition-colors">
                    {config.displayName}
                  </h3>
                  {config.shortDescription && (
                    <p className="text-charcoal/70 text-sm">{config.shortDescription}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-warm-cream py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/catalog/search"
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-semibold text-charcoal mb-2">Search Products</h3>
              <p className="text-sm text-charcoal/70">Find specific products by name, SKU, or type</p>
            </Link>
            <Link
              href="/catalog/about"
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">ℹ️</div>
              <h3 className="font-semibold text-charcoal mb-2">About & Contact</h3>
              <p className="text-sm text-charcoal/70">Learn about ordering and contact information</p>
            </Link>
            <a
              href="https://piokausa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">🛒</div>
              <h3 className="font-semibold text-charcoal mb-2">Shop Online</h3>
              <p className="text-sm text-charcoal/70">Visit our Shopify store to place orders</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

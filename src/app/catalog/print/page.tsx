'use client';

import { useEffect, useState } from 'react';
import { getAllCollectionsPaginated } from '@/lib/shopify/collections';
import { getVisibleCatalogCollections } from '@/lib/catalog/config';
import { extractMetafields, shouldHideProduct } from '@/lib/catalog/helpers';
import QRCode from 'react-qr-code';
import Image from 'next/image';
import Link from 'next/link';
import type { ShopifyCollection } from '@/lib/shopify/types';
import './print.css';

export const dynamic = 'force-dynamic';

export default function PrintCatalogPage() {
  const [shopifyCollections, setShopifyCollections] = useState<ShopifyCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const catalogConfig = getVisibleCatalogCollections();
  const shopUrl = process.env.NEXT_PUBLIC_SHOP_URL || 'https://piokausa.com';

  useEffect(() => {
    async function loadData() {
      try {
        const collections = await getAllCollectionsPaginated();
        setShopifyCollections(collections);
      } catch (error) {
        console.error('Error loading collections:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    // Auto-trigger print dialog when page loads
    if (!loading) {
      window.print();
    }
  }, [loading]);

  if (loading) {
    return <div className="p-8 text-center">Loading catalog...</div>;
  }

  return (
    <div className="print-container">
      {/* Cover Page */}
      <div className="print-page cover-page">
        <div className="h-full flex flex-col justify-center items-center bg-gradient-to-br from-teal to-dark-teal text-white p-12">
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold tracking-tight">PIOKA USA</h1>
            <div className="w-32 h-1 bg-orange mx-auto" />
            <h2 className="text-4xl font-light tracking-wide">2026 WHOLESALE</h2>
            <h2 className="text-4xl font-light tracking-wide">PRODUCT CATALOG</h2>
            
            <div className="pt-8 space-y-2 text-lg opacity-90">
              <p>Beverage Ingredients</p>
              <p>Food-Service Packaging</p>
              <p>Custom Printing</p>
            </div>

            <div className="pt-12">
              <div className="bg-white p-4 rounded-lg inline-block">
                <QRCode value={shopUrl} size={120} />
              </div>
              <p className="mt-4 text-xl font-semibold">PIOKAUSA.COM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="print-page">
        <div className="h-full p-12 bg-soft-white">
          <h1 className="text-4xl font-bold text-charcoal mb-8 border-b-4 border-teal pb-4">
            Table of Contents
          </h1>
          
          <div className="space-y-4">
            {catalogConfig.map((config, index) => {
              const collection = shopifyCollections.find(c => c.handle === config.collectionHandle);
              const productCount = collection?.products.nodes.filter(p => {
                const metafields = extractMetafields(p.metafields.nodes);
                return !shouldHideProduct(metafields);
              }).length || 0;

              return (
                <div key={config.collectionHandle} className="flex items-center justify-between text-lg">
                  <Link
                    href={`/catalog/collections/${config.collectionHandle}`}
                    className="text-charcoal hover:text-teal flex items-center gap-3"
                  >
                    <span className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span>{config.displayName}</span>
                  </Link>
                  <span className="text-charcoal/60">({productCount} products)</span>
                </div>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-light-border">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-charcoal font-semibold">Contact Information</p>
                <p className="text-charcoal/70 text-sm mt-1">Visit piokausa.com for ordering and inquiries</p>
              </div>
              <div className="bg-white p-2 rounded">
                <QRCode value={shopUrl} size={60} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Dividers and Products */}
      {catalogConfig.map((config) => {
        const collection = shopifyCollections.find(c => c.handle === config.collectionHandle);
        if (!collection) return null;

        const visibleProducts = collection.products.nodes.filter(product => {
          const metafields = extractMetafields(product.metafields.nodes);
          return !shouldHideProduct(metafields);
        });

        if (visibleProducts.length === 0) return null;

        return (
          <div key={config.collectionHandle}>
            {/* Category Divider */}
            <div className="print-page category-divider">
              <div className="h-full p-12" style={{ backgroundColor: config.accentColor || '#528387' }}>
                <div className="text-white">
                  <h1 className="text-5xl font-bold mb-4">{config.displayName}</h1>
                  {config.shortDescription && (
                    <p className="text-2xl opacity-90 mb-6">{config.shortDescription}</p>
                  )}
                  <p className="text-lg opacity-75">{visibleProducts.length} Products</p>
                  
                  <div className="mt-8">
                    <div className="bg-white p-4 rounded-lg inline-block">
                      <QRCode value={`${shopUrl}/collections/${config.collectionHandle}`} size={100} />
                    </div>
                    <p className="mt-4 text-sm opacity-75">Scan to view on website</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            {visibleProducts.map((product, productIndex) => {
              const metafields = extractMetafields(product.metafields.nodes);
              const firstVariant = product.variants.nodes[0];
              const productUrl = product.onlineStoreUrl || `${shopUrl}/products/${product.handle}`;

              // Page break every 6 products
              if (productIndex > 0 && productIndex % 6 === 0) {
                return (
                  <div key={product.id} className="print-page-break" />
                );
              }

              return (
                <div key={product.id} className="print-product-item p-6 border-b border-light-border">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="w-32 h-32 flex-shrink-0 bg-warm-cream rounded relative">
                      {product.featuredImage ? (
                        <Image
                          src={product.featuredImage.url}
                          alt={product.featuredImage.altText || product.title}
                          fill
                          className="object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-teal">
                          <span className="text-3xl">📦</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-charcoal mb-2">{product.title}</h3>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm text-charcoal/70 mb-3">
                        {firstVariant?.sku && (
                          <p><span className="font-medium">SKU:</span> {firstVariant.sku}</p>
                        )}
                        {metafields.unitSize && (
                          <p><span className="font-medium">Size:</span> {metafields.unitSize}</p>
                        )}
                        {metafields.casePack && (
                          <p><span className="font-medium">Case Pack:</span> {metafields.casePack}</p>
                        )}
                        {product.productType && (
                          <p><span className="font-medium">Type:</span> {product.productType}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-teal">
                          ${firstVariant?.price.amount}
                        </p>
                        <div className="bg-white p-2 rounded">
                          <QRCode value={productUrl} size={50} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Contact Page */}
      <div className="print-page">
        <div className="h-full p-12 bg-soft-white">
          <h1 className="text-4xl font-bold text-charcoal mb-8 border-b-4 border-teal pb-4">
            Contact & Ordering
          </h1>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-teal mb-4">PIOKA USA</h2>
                <p className="text-charcoal/70">
                  Your trusted partner for beverage ingredients, food-service packaging, and custom printing solutions.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-charcoal">Contact Information</h3>
                <p className="text-charcoal/70">Email: info@piokausa.com</p>
                <p className="text-charcoal/70">Phone: (555) 123-4567</p>
                <p className="text-charcoal/70">Warehouse: 123 Warehouse Way, San Diego, CA 92101</p>
                <p className="text-charcoal/70">Hours: Monday - Friday, 8:00 AM - 5:00 PM PST</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-charcoal">Shipping</h3>
                <p className="text-charcoal/70">Local delivery available in San Diego area</p>
                <p className="text-charcoal/70">Nationwide shipping across the United States</p>
                <p className="text-charcoal/70">Free shipping on pallet orders</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <QRCode value={shopUrl} size={150} />
                <p className="mt-4 text-charcoal font-semibold">Scan to Shop Online</p>
                <p className="text-sm text-charcoal/70">piokausa.com</p>
              </div>

              <div className="text-center space-y-2">
                <p className="text-charcoal/70">Join our distributor program</p>
                <a href={`${shopUrl}/pages/distributor`} className="text-teal hover:underline">
                  Learn More →
                </a>
              </div>

              <div className="text-center space-y-2">
                <p className="text-charcoal/70">Custom printing services</p>
                <a href={`${shopUrl}/pages/custom-printing`} className="text-teal hover:underline">
                  Get Started →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

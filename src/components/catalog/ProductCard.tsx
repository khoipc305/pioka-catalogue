import Link from 'next/link';
import Image from 'next/image';
import type { ShopifyProduct } from '@/lib/shopify/types';
import { extractMetafields, getShortDescription, getUnitSize, formatPrice, getProductUrl } from '@/lib/catalog/helpers';

interface ProductCardProps {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const metafields = extractMetafields(product.metafields.nodes);
  const shortDescription = getShortDescription(product, metafields);
  const unitSize = getUnitSize(product, metafields);
  const shopUrl = process.env.NEXT_PUBLIC_SHOP_URL || 'https://piokausa.com';
  const productUrl = getProductUrl(product, shopUrl);

  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  );

  const hasMultiplePrices = 
    product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount;

  const displayPrice = hasMultiplePrices
    ? `${formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)} - ${formatPrice(product.priceRange.maxVariantPrice.amount, product.priceRange.maxVariantPrice.currencyCode)}`
    : price;

  const firstVariant = product.variants.nodes[0];
  const sku = firstVariant?.sku || metafields.casePack || '';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      {/* Product Image */}
      <Link
        href={`/catalog/products/${product.handle}`}
        className="relative aspect-square bg-warm-cream block"
      >
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-teal">
            <span className="text-4xl">📦</span>
          </div>
        )}
        {metafields.catalogBadge && (
          <div className="absolute top-2 right-2 bg-orange text-white text-xs font-semibold px-2 py-1 rounded">
            {metafields.catalogBadge}
          </div>
        )}
        {!product.availableForSale && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <Link
          href={`/catalog/products/${product.handle}`}
          className="block mb-2"
        >
          <h3 className="font-semibold text-charcoal mb-1 line-clamp-2 hover:text-teal transition-colors">
            {product.title}
          </h3>
        </Link>

        {shortDescription && (
          <p className="text-sm text-charcoal/70 mb-3 line-clamp-2 flex-grow">
            {shortDescription}
          </p>
        )}

        {/* Product Details */}
        <div className="space-y-1 text-sm text-charcoal/60 mb-4">
          {sku && <p><span className="font-medium">SKU:</span> {sku}</p>}
          {unitSize && <p><span className="font-medium">Size:</span> {unitSize}</p>}
          {metafields.casePack && <p><span className="font-medium">Case Pack:</span> {metafields.casePack}</p>}
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-lg font-bold text-teal">{displayPrice}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/catalog/products/${product.handle}`}
            className="flex-1 bg-teal text-white text-center py-2 px-4 rounded font-medium hover:bg-dark-teal transition-colors text-sm"
          >
            View Details
          </Link>
          <a
            href={productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-orange text-white text-center py-2 px-4 rounded font-medium hover:bg-orange/90 transition-colors text-sm"
          >
            Shop on Shopify
          </a>
        </div>
      </div>
    </div>
  );
}

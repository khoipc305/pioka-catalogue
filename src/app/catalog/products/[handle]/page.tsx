import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductByHandle } from '@/lib/shopify/products';
import { extractMetafields, formatPrice, getProductUrl } from '@/lib/catalog/helpers';
import Image from 'next/image';
import QRCode from 'react-qr-code';

export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const metafields = extractMetafields(product.metafields.nodes);
  const shopUrl = process.env.NEXT_PUBLIC_SHOP_URL || 'https://piokausa.com';
  const productUrl = getProductUrl(product, shopUrl);

  const firstVariant = product.variants.nodes[0];
  const price = formatPrice(
    firstVariant.price.amount,
    firstVariant.price.currencyCode
  );

  const compareAtPrice = firstVariant.compareAtPrice
    ? formatPrice(firstVariant.compareAtPrice.amount, firstVariant.compareAtPrice.currencyCode)
    : null;

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Breadcrumb */}
      <nav className="bg-warm-cream py-3 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/catalog" className="text-charcoal/70 hover:text-teal text-sm">
            Catalog
          </Link>
          <span className="text-charcoal/50 mx-2">/</span>
          <span className="text-charcoal text-sm">{product.title}</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg shadow-md overflow-hidden relative">
              {product.featuredImage ? (
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-teal">
                  <span className="text-6xl">📦</span>
                </div>
              )}
            </div>
            
            {product.images.nodes.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.nodes.slice(1, 5).map((image) => (
                  <div key={image.url} className="aspect-square bg-white rounded shadow-sm overflow-hidden relative">
                    <Image
                      src={image.url}
                      alt={image.altText || product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-charcoal mb-2">{product.title}</h1>
              {product.vendor && (
                <p className="text-charcoal/70 mb-4">By {product.vendor}</p>
              )}
              
              <div className="flex items-baseline gap-3 mb-4">
                <p className="text-2xl font-bold text-teal">{price}</p>
                {compareAtPrice && (
                  <p className="text-lg text-charcoal/50 line-through">{compareAtPrice}</p>
                )}
              </div>

              <div className="flex items-center gap-2 mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.availableForSale
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.availableForSale ? 'In Stock' : 'Out of Stock'}
                </span>
                {metafields.catalogBadge && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange text-white">
                    {metafields.catalogBadge}
                  </span>
                )}
              </div>
            </div>

            {/* Short Description */}
            {metafields.catalogShortDescription && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-charcoal">{metafields.catalogShortDescription}</p>
              </div>
            )}

            {/* Product Details */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-3">
              <h3 className="font-semibold text-charcoal mb-4">Product Details</h3>
              
              {firstVariant.sku && (
                <div className="flex justify-between py-2 border-b border-light-border">
                  <span className="text-charcoal/70">SKU</span>
                  <span className="text-charcoal font-medium">{firstVariant.sku}</span>
                </div>
              )}
              
              {metafields.unitSize && (
                <div className="flex justify-between py-2 border-b border-light-border">
                  <span className="text-charcoal/70">Unit Size</span>
                  <span className="text-charcoal font-medium">{metafields.unitSize}</span>
                </div>
              )}
              
              {metafields.casePack && (
                <div className="flex justify-between py-2 border-b border-light-border">
                  <span className="text-charcoal/70">Case Pack</span>
                  <span className="text-charcoal font-medium">{metafields.casePack}</span>
                </div>
              )}
              
              {metafields.caseQuantity && (
                <div className="flex justify-between py-2 border-b border-light-border">
                  <span className="text-charcoal/70">Case Quantity</span>
                  <span className="text-charcoal font-medium">{metafields.caseQuantity}</span>
                </div>
              )}
              
              {metafields.caseWeight && (
                <div className="flex justify-between py-2 border-b border-light-border">
                  <span className="text-charcoal/70">Case Weight</span>
                  <span className="text-charcoal font-medium">{metafields.caseWeight}</span>
                </div>
              )}
              
              {product.productType && (
                <div className="flex justify-between py-2 border-b border-light-border">
                  <span className="text-charcoal/70">Product Type</span>
                  <span className="text-charcoal font-medium">{product.productType}</span>
                </div>
              )}
              
              {metafields.material && (
                <div className="flex justify-between py-2 border-b border-light-border">
                  <span className="text-charcoal/70">Material</span>
                  <span className="text-charcoal font-medium">{metafields.material}</span>
                </div>
              )}
              
              {metafields.dimensions && (
                <div className="flex justify-between py-2 border-b border-light-border">
                  <span className="text-charcoal/70">Dimensions</span>
                  <span className="text-charcoal font-medium">{metafields.dimensions}</span>
                </div>
              )}
              
              {metafields.compatibleLid && (
                <div className="flex justify-between py-2 border-b border-light-border">
                  <span className="text-charcoal/70">Compatible Lid</span>
                  <span className="text-charcoal font-medium">{metafields.compatibleLid}</span>
                </div>
              )}
              
              {metafields.productOrigin && (
                <div className="flex justify-between py-2 border-b border-light-border">
                  <span className="text-charcoal/70">Origin</span>
                  <span className="text-charcoal font-medium">{metafields.productOrigin}</span>
                </div>
              )}
            </div>

            {/* Variants */}
            {product.variants.nodes.length > 1 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-charcoal mb-4">Variants</h3>
                <div className="space-y-2">
                  {product.variants.nodes.map((variant) => (
                    <div
                      key={variant.id}
                      className="flex justify-between items-center py-2 border-b border-light-border last:border-0"
                    >
                      <div>
                        <p className="text-charcoal font-medium">{variant.title}</p>
                        {variant.sku && (
                          <p className="text-sm text-charcoal/70">SKU: {variant.sku}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-charcoal font-medium">
                          {formatPrice(variant.price.amount, variant.price.currencyCode)}
                        </p>
                        {!variant.availableForSale && (
                          <p className="text-sm text-red-600">Out of Stock</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Information */}
            {metafields.ingredients && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-charcoal mb-3">Ingredients</h3>
                <p className="text-charcoal/80">{metafields.ingredients}</p>
              </div>
            )}

            {metafields.preparationGuide && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-charcoal mb-3">Preparation Guide</h3>
                <p className="text-charcoal/80 whitespace-pre-line">{metafields.preparationGuide}</p>
              </div>
            )}

            {metafields.storageInstruction && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-charcoal mb-3">Storage Instructions</h3>
                <p className="text-charcoal/80">{metafields.storageInstruction}</p>
              </div>
            )}

            {/* Full Description */}
            {product.descriptionHtml && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-charcoal mb-3">Description</h3>
                <div
                  className="text-charcoal/80 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              </div>
            )}

            {/* QR Code */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-4">
              <div className="bg-white p-2 rounded">
                <QRCode value={productUrl} size={80} />
              </div>
              <div>
                <p className="font-semibold text-charcoal mb-1">Scan to Shop</p>
                <p className="text-sm text-charcoal/70">Scan this QR code to view this product on our Shopify store</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <a
                href={productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-teal text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-dark-teal transition-colors"
              >
                Shop on Shopify
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

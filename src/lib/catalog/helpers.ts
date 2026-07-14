import type { ShopifyProduct, ShopifyMetafield } from '../shopify/types';

export interface ProductMetafields {
  unitSize?: string;
  casePack?: string;
  caseQuantity?: string;
  caseWeight?: string;
  productOrigin?: string;
  preparationGuide?: string;
  ingredients?: string;
  storageInstruction?: string;
  catalogShortDescription?: string;
  catalogBadge?: string;
  catalogSortOrder?: number;
  catalogHidden?: boolean;
  compatibleLid?: string;
  material?: string;
  dimensions?: string;
}

export function extractMetafields(metafields: ShopifyMetafield[]): ProductMetafields {
  const metafieldMap = new Map(metafields.map(m => [m.key, m.value]));

  return {
    unitSize: metafieldMap.get('unit_size'),
    casePack: metafieldMap.get('case_pack'),
    caseQuantity: metafieldMap.get('case_quantity'),
    caseWeight: metafieldMap.get('case_weight'),
    productOrigin: metafieldMap.get('product_origin'),
    preparationGuide: metafieldMap.get('preparation_guide'),
    ingredients: metafieldMap.get('ingredients'),
    storageInstruction: metafieldMap.get('storage_instruction'),
    catalogShortDescription: metafieldMap.get('catalog_short_description'),
    catalogBadge: metafieldMap.get('catalog_badge'),
    catalogSortOrder: metafieldMap.get('catalog_sort_order') ? 
      parseInt(metafieldMap.get('catalog_sort_order')!, 10) : undefined,
    catalogHidden: metafieldMap.get('catalog_hidden') === 'true',
    compatibleLid: metafieldMap.get('compatible_lid'),
    material: metafieldMap.get('material'),
    dimensions: metafieldMap.get('dimensions'),
  };
}

export function getProductUrl(product: ShopifyProduct, shopUrl: string): string {
  if (product.onlineStoreUrl) {
    return product.onlineStoreUrl;
  }
  return `${shopUrl}/products/${product.handle}`;
}

export function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export function getShortDescription(product: ShopifyProduct, metafields: ProductMetafields): string {
  if (metafields.catalogShortDescription) {
    return metafields.catalogShortDescription;
  }
  // Strip HTML and truncate description
  const plainText = product.descriptionHtml.replace(/<[^>]*>/g, '');
  return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
}

export function getUnitSize(product: ShopifyProduct, metafields: ProductMetafields): string {
  if (metafields.unitSize) {
    return metafields.unitSize;
  }
  // Fallback to variant title if available
  if (product.variants.nodes.length > 0) {
    return product.variants.nodes[0].title;
  }
  return '';
}

export function shouldHideProduct(metafields: ProductMetafields): boolean {
  return metafields.catalogHidden === true;
}

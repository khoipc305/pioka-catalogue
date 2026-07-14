export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyPriceRange {
  minVariantPrice: ShopifyMoney;
  maxVariantPrice: ShopifyMoney;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  selectedOptions: ShopifySelectedOption[];
  image: ShopifyImage | null;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  quantityAvailable: number | null;
}

export interface ShopifyProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ShopifyMetafield {
  key: string;
  value: string;
  type: string;
  reference?: {
    __typename: string;
  };
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  productType: string;
  description: string;
  descriptionHtml: string;
  featuredImage: ShopifyImage | null;
  images: {
    nodes: ShopifyImage[];
  };
  tags: string[];
  availableForSale: boolean;
  onlineStoreUrl: string | null;
  priceRange: ShopifyPriceRange;
  compareAtPriceRange: ShopifyPriceRange | null;
  options: ShopifyProductOption[];
  variants: {
    nodes: ShopifyProductVariant[];
  };
  metafields: {
    nodes: ShopifyMetafield[];
  };
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string | null;
  image: ShopifyImage | null;
  descriptionHtml: string | null;
  seo: {
    title: string | null;
    description: string | null;
  };
  products: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    nodes: ShopifyProduct[];
  };
}

export interface ShopifyCollectionEdge {
  node: ShopifyCollection;
}

export interface ShopifyCollectionsConnection {
  edges: ShopifyCollectionEdge[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}

export interface ShopifySearchResult {
  product: ShopifyProduct;
}

export interface ShopifySearchResponse {
  search: {
    nodes: ShopifySearchResult[];
  };
}

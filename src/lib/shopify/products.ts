import { shopifyFetch } from './client';
import { GET_PRODUCT_BY_HANDLE_QUERY, GET_PRODUCTS_QUERY } from './queries';
import type { ShopifyProduct } from './types';

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  try {
    const response = await shopifyFetch<{ product: ShopifyProduct | null }>(
      GET_PRODUCT_BY_HANDLE_QUERY,
      { handle }
    );

    return response.data?.product || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getProducts(
  first: number = 20,
  after?: string,
  query?: string
): Promise<{ products: ShopifyProduct[]; hasNextPage: boolean; endCursor: string | null }> {
  try {
    const response = await shopifyFetch<{
      products: {
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
        nodes: ShopifyProduct[];
      };
    }>(GET_PRODUCTS_QUERY, { first, after, query });

    const data = response.data?.products;
    
    return {
      products: data?.nodes || [],
      hasNextPage: data?.pageInfo.hasNextPage || false,
      endCursor: data?.pageInfo.endCursor || null,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], hasNextPage: false, endCursor: null };
  }
}

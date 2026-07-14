import { shopifyFetch } from './client';
import { GET_ALL_COLLECTIONS_QUERY, GET_COLLECTION_BY_HANDLE_QUERY } from './queries';
import type { ShopifyCollection, ShopifyCollectionsConnection } from './types';

export async function getAllCollections(
  first: number = 50,
  after?: string
): Promise<{ collections: ShopifyCollection[]; hasNextPage: boolean; endCursor: string | null }> {
  try {
    const response = await shopifyFetch<{ collections: ShopifyCollectionsConnection }>(
      GET_ALL_COLLECTIONS_QUERY,
      { first, after }
    );

    const data = response.data?.collections;
    
    return {
      collections: data?.edges.map(edge => edge.node) || [],
      hasNextPage: data?.pageInfo.hasNextPage || false,
      endCursor: data?.pageInfo.endCursor || null,
    };
  } catch (error) {
    console.error('Error fetching collections:', error);
    return { collections: [], hasNextPage: false, endCursor: null };
  }
}

export async function getCollectionByHandle(
  handle: string,
  after?: string
): Promise<ShopifyCollection | null> {
  try {
    const response = await shopifyFetch<{ collection: ShopifyCollection | null }>(
      GET_COLLECTION_BY_HANDLE_QUERY,
      { handle, after }
    );

    return response.data?.collection || null;
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
}

export async function getAllCollectionsPaginated(): Promise<ShopifyCollection[]> {
  let allCollections: ShopifyCollection[] = [];
  let hasNextPage = true;
  let after: string | null = null;

  while (hasNextPage) {
    const result = await getAllCollections(50, after || undefined);
    allCollections = [...allCollections, ...result.collections];
    hasNextPage = result.hasNextPage;
    after = result.endCursor;
  }

  return allCollections;
}

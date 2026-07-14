import {
  COLLECTION_FRAGMENT,
  PRODUCT_FRAGMENT,
} from './fragments';
import type { ShopifyCollection, ShopifyProduct, ShopifyCollectionsConnection } from './types';

export const GET_ALL_COLLECTIONS_QUERY = `
  query GetAllCollections($first: Int!, $after: String) {
    collections(first: $first, after: $after) {
      edges {
        node {
          id
          handle
          title
          description
          image {
            url
            altText
            width
            height
          }
          descriptionHtml
          seo {
            title
            description
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_COLLECTION_BY_HANDLE_QUERY = `
  ${COLLECTION_FRAGMENT}
  query GetCollectionByHandle($handle: String!, $after: String) {
    collection(handle: $handle) {
      ...CollectionFragment
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
`;

export const SEARCH_PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query SearchProducts($query: String!, $first: Int!) {
    search(query: $query, first: $first, productTypes: ["PRODUCT", "VARIANT"]) {
      nodes {
        ... on Product {
          ...ProductFragment
        }
      }
    }
  }
`;

export const GET_PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetProducts($first: Int!, $after: String, $query: String) {
    products(first: $first, after: $after, query: $query) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...ProductFragment
      }
    }
  }
`;

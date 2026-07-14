const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2025-01';

if (!DOMAIN || !ACCESS_TOKEN) {
  console.warn('Missing Shopify credentials. Some features may not work.');
}

export interface ShopifyResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: Array<string | number>;
  }>;
}

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<ShopifyResponse<T>> {
  if (!DOMAIN || !ACCESS_TOKEN) {
    throw new Error('Shopify credentials are not configured');
  }

  const endpoint = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      next: {
        revalidate: 300, // 5 minutes default cache
      },
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    
    if (json.errors) {
      console.error('Shopify GraphQL errors:', json.errors);
    }

    return json;
  } catch (error) {
    console.error('Shopify fetch error:', error);
    throw error;
  }
}

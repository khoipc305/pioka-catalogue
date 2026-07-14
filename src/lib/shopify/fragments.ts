export const IMAGE_FRAGMENT = `
  fragment ImageFragment on Image {
    url
    altText
    width
    height
  }
`;

export const MONEY_FRAGMENT = `
  fragment MoneyFragment on MoneyV2 {
    amount
    currencyCode
  }
`;

export const PRICE_RANGE_FRAGMENT = `
  fragment PriceRangeFragment on ProductPriceRange {
    minVariantPrice {
      ...MoneyFragment
    }
    maxVariantPrice {
      ...MoneyFragment
    }
  }
  ${MONEY_FRAGMENT}
`;

export const SELECTED_OPTION_FRAGMENT = `
  fragment SelectedOptionFragment on SelectedOption {
    name
    value
  }
`;

export const VARIANT_FRAGMENT = `
  fragment VariantFragment on ProductVariant {
    id
    title
    sku
    availableForSale
    selectedOptions {
      ...SelectedOptionFragment
    }
    image {
      ...ImageFragment
    }
    price {
      ...MoneyFragment
    }
    compareAtPrice {
      ...MoneyFragment
    }
    quantityAvailable
  }
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
  ${SELECTED_OPTION_FRAGMENT}
`;

export const PRODUCT_OPTION_FRAGMENT = `
  fragment ProductOptionFragment on ProductOption {
    id
    name
    values
  }
`;

export const METAFIELD_FRAGMENT = `
  fragment MetafieldFragment on Metafield {
    key
    value
    type
    reference {
      __typename
    }
  }
`;

export const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    vendor
    productType
    description
    descriptionHtml
    featuredImage {
      ...ImageFragment
    }
    images(first: 10) {
      nodes {
        ...ImageFragment
      }
    }
    tags
    availableForSale
    onlineStoreUrl
    priceRange {
      ...PriceRangeFragment
    }
    compareAtPriceRange {
      ...PriceRangeFragment
    }
    options {
      ...ProductOptionFragment
    }
    variants(first: 20) {
      nodes {
        ...VariantFragment
      }
    }
    metafields(namespace: "custom", first: 20) {
      nodes {
        ...MetafieldFragment
      }
    }
  }
  ${IMAGE_FRAGMENT}
  ${PRICE_RANGE_FRAGMENT}
  ${SELECTED_OPTION_FRAGMENT}
  ${VARIANT_FRAGMENT}
  ${PRODUCT_OPTION_FRAGMENT}
  ${METAFIELD_FRAGMENT}
`;

export const COLLECTION_FRAGMENT = `
  fragment CollectionFragment on Collection {
    id
    handle
    title
    description
    image {
      ...ImageFragment
    }
    descriptionHtml
    seo {
      title
      description
    }
    products(first: 20, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...ProductFragment
      }
    }
  }
  ${IMAGE_FRAGMENT}
  ${PRODUCT_FRAGMENT}
`;

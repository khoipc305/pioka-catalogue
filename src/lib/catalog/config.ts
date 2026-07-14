export interface CatalogCollectionConfig {
  collectionHandle: string;
  displayName: string;
  order: number;
  visible: boolean;
  shortDescription?: string;
  accentColor?: string;
}

export const CATALOG_COLLECTIONS: CatalogCollectionConfig[] = [
  {
    collectionHandle: 'ceremonial-japan-matcha',
    displayName: 'Ceremonial Japanese Matcha',
    order: 1,
    visible: true,
    shortDescription: 'Premium ceremonial grade matcha from Japan',
    accentColor: '#528387',
  },
  {
    collectionHandle: 'vietnamese-coffee-beans',
    displayName: 'Coffee Bean & Ground',
    order: 2,
    visible: true,
    shortDescription: 'Authentic Vietnamese coffee beans and grounds',
    accentColor: '#245F63',
  },
  {
    collectionHandle: 'black-tea',
    displayName: 'Premium Tea Leaves',
    order: 3,
    visible: true,
    shortDescription: 'High-quality tea leaves from around the world',
    accentColor: '#528387',
  },
  {
    collectionHandle: 'original-boba-classic-tapioca-pearl',
    displayName: 'Boba / Tapioca Pearls',
    order: 4,
    visible: true,
    shortDescription: 'Classic and specialty boba pearls',
    accentColor: '#E68A3F',
  },
  {
    collectionHandle: 'jellies',
    displayName: 'Jellies',
    order: 5,
    visible: true,
    shortDescription: 'Ready-to-serve and DIY jelly toppings',
    accentColor: '#E68A3F',
  },
  {
    collectionHandle: 'cream-foam-mix-powder-for-milk-tea-coffee',
    displayName: 'Powders',
    order: 6,
    visible: true,
    shortDescription: 'Foam, flavored, pudding, and bakery powders',
    accentColor: '#528387',
  },
  {
    collectionHandle: 'fruit-syrup',
    displayName: 'Syrups',
    order: 7,
    visible: true,
    shortDescription: 'Fruit, flavored, and signature syrups',
    accentColor: '#E68A3F',
  },
  {
    collectionHandle: 'sugar-sweetener',
    displayName: 'Sugar & Sweetener',
    order: 8,
    visible: true,
    shortDescription: 'Premium sugars and sweeteners',
    accentColor: '#245F63',
  },
  {
    collectionHandle: 'canned-toppings',
    displayName: 'Canned Products',
    order: 9,
    visible: true,
    shortDescription: 'Canned toppings and ingredients',
    accentColor: '#528387',
  },
  {
    collectionHandle: 'cups-lids',
    displayName: 'Cups & Containers',
    order: 10,
    visible: true,
    shortDescription: 'Plastic and paper cups and containers',
    accentColor: '#245F63',
  },
  {
    collectionHandle: 'lid',
    displayName: 'Lids & Seals',
    order: 11,
    visible: true,
    shortDescription: 'Cup lids and sealing solutions',
    accentColor: '#528387',
  },
  {
    collectionHandle: 'straw',
    displayName: 'Straws & Accessories',
    order: 12,
    visible: true,
    shortDescription: 'Straws and beverage accessories',
    accentColor: '#E68A3F',
  },
  {
    collectionHandle: 'plastic-bag',
    displayName: 'Cup Holders & Carriers',
    order: 13,
    visible: true,
    shortDescription: 'Cup carriers and drink holders',
    accentColor: '#245F63',
  },
  {
    collectionHandle: 'paper-food-containers-bowls',
    displayName: 'Food Packaging & Containers',
    order: 14,
    visible: true,
    shortDescription: 'Food containers and packaging solutions',
    accentColor: '#528387',
  },
  {
    collectionHandle: 'plastic-cutlery',
    displayName: 'Disposable Utensils & Cutlery',
    order: 15,
    visible: true,
    shortDescription: 'Plastic, wooden, and eco-friendly cutlery',
    accentColor: '#245F63',
  },
  {
    collectionHandle: 'general-supplies',
    displayName: 'Paper Napkins & Tissues',
    order: 16,
    visible: true,
    shortDescription: 'Paper napkins and tissue products',
    accentColor: '#F7F3E8',
  },
  {
    collectionHandle: 'custom-printing',
    displayName: 'Custom Printing',
    order: 17,
    visible: true,
    shortDescription: 'Custom printing services for your brand',
    accentColor: '#E68A3F',
  },
];

export function getCatalogConfig(handle: string): CatalogCollectionConfig | undefined {
  return CATALOG_COLLECTIONS.find(config => config.collectionHandle === handle);
}

export function getVisibleCatalogCollections(): CatalogCollectionConfig[] {
  return CATALOG_COLLECTIONS.filter(config => config.visible).sort((a, b) => a.order - b.order);
}

export function getAllCatalogCollections(): CatalogCollectionConfig[] {
  return CATALOG_COLLECTIONS.sort((a, b) => a.order - b.order);
}

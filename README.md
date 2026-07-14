# PIOKA USA Digital Product Catalog

A production-ready digital wholesale catalog for PIOKA USA that connects directly to Shopify. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Dynamic Shopify Integration**: Automatically displays published Shopify products and collections
- **Real-time Updates**: Catalog updates when product information changes in Shopify
- **Search & Filtering**: Advanced search with filters for collection, type, availability, vendor, price, and tags
- **Print-Ready Catalog**: Dedicated print view optimized for US Letter with QR codes
- **Responsive Design**: Mobile-first design that works on all devices
- **Metafield Support**: Optional Shopify metafields for enhanced product information
- **SEO Optimized**: Dynamic metadata, structured data, and sitemap
- **Brand Matching**: Visual design matches the PIOKA USA brand identity

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Shopify Storefront GraphQL API
- **QR Codes**: react-qr-code
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Shopify Storefront API credentials
- Git

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd pioka-catalog
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your credentials:
```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
SHOPIFY_API_VERSION=2025-01
NEXT_PUBLIC_SHOP_URL=https://piokausa.com
NEXT_PUBLIC_CATALOG_URL=http://localhost:3000
```

### Running Locally

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the catalog.

## Shopify Setup

### Creating Storefront API Credentials

1. Go to your Shopify Admin
2. Navigate to **Settings** > **Apps and sales channels**
3. Click **Develop apps** > **Create an app**
4. Name your app (e.g., "Digital Catalog")
5. Configure **Storefront API access** with these permissions:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_types`
   - `unauthenticated_read_product_tags`
6. Click **Install app**
7. Copy the **Storefront API access token**

### Required Permissions

The catalog requires these unauthenticated Storefront API permissions:
- `unauthenticated_read_product_listings` - Read products
- `unauthenticated_read_product_types` - Read product types
- `unauthenticated_read_product_tags` - Read product tags

## Catalog Configuration

### Collection Configuration

Edit `src/lib/catalog/config.ts` to configure:
- Collection display names
- Display order
- Visibility
- Accent colors
- Short descriptions

### Company Information

Edit `src/config/company.ts` to configure:
- Company name and contact details
- Business hours
- Shipping information
- Social media links

### Shopify Metafields

Optional metafields enhance the catalog. See [METAFIELDS.md](./METAFIELDS.md) for details on:
- Product dimensions and specifications
- Preparation guides
- Storage instructions
- Catalog display options

## Project Structure

```
src/
├── app/
│   ├── catalog/
│   │   ├── page.tsx              # Catalog homepage
│   │   ├── collections/
│   │   │   └── [handle]/page.tsx # Collection pages
│   │   ├── products/
│   │   │   └── [handle]/page.tsx # Product detail pages
│   │   ├── search/page.tsx       # Search page
│   │   ├── print/page.tsx        # Print-ready catalog
│   │   └── about/page.tsx        # About/contact page
│   ├── globals.css               # Global styles with brand colors
│   └── layout.tsx                # Root layout
├── components/
│   ├── catalog/
│   │   ├── ProductCard.tsx       # Product card component
│   │   ├── FilterPanel.tsx        # Filter panel
│   │   └── SortSelect.tsx        # Sort options
│   └── navigation/
│       └── Header.tsx            # Navigation header
├── lib/
│   ├── shopify/
│   │   ├── client.ts             # Shopify GraphQL client
│   │   ├── queries.ts            # GraphQL queries
│   │   ├── fragments.ts          # GraphQL fragments
│   │   ├── types.ts              # TypeScript types
│   │   ├── products.ts           # Product API functions
│   │   └── collections.ts        # Collection API functions
│   └── catalog/
│       ├── config.ts             # Catalog configuration
│       └── helpers.ts            # Helper functions
└── config/
    └── company.ts               # Company configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript check

## Print Catalog

To generate a print-ready PDF:

1. Navigate to `/catalog/print`
2. Use your browser's print function (Cmd/Ctrl + P)
3. Select "Save as PDF" as the destination
4. The print view is optimized for US Letter size

## Changing Brand Colors

Edit `src/app/globals.css` to modify brand colors:

```css
:root {
  --primary-teal: #528387;
  --dark-teal: #245F63;
  --warm-cream: #F7F3E8;
  --soft-white: #FFFDF8;
  --orange-accent: #E68A3F;
  --charcoal-text: #263638;
  --light-border: #DDD8CA;
}
```

## Cache Revalidation

The catalog uses Next.js ISR with a 5-minute revalidation period. To change this:

Edit `src/lib/shopify/client.ts`:
```typescript
next: {
  revalidate: 300, // Change this value (in seconds)
}
```

## Optional Features

### Cart Feature

Enable the cart feature by setting:
```bash
NEXT_PUBLIC_ENABLE_CART=true
```

Note: Cart feature is currently in development.

### Webhook Cache Revalidation

For automatic cache revalidation when products change in Shopify, implement the webhook endpoint at `src/app/api/webhooks/shopify/route.ts`.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to Vercel.

### Quick Deploy to Vercel

1. Push code to Git repository
2. Import project in Vercel
3. Add environment variables
4. Deploy

## Troubleshooting

### Products Not Loading

1. Verify environment variables are set correctly
2. Check Shopify Storefront API token is valid
3. Ensure products are published to Online Store sales channel
4. Check browser console for GraphQL errors

### Build Errors

```bash
# Check TypeScript errors
npm run type-check

# Check linting errors
npm run lint

# Clean build
rm -rf .next
npm run build
```

### Missing Metafields

The catalog works without metafields. Missing metafields will:
- Use fallback values (e.g., variant title instead of unit size)
- Hide empty sections
- Not break the layout

## Documentation

- [METAFIELDS.md](./METAFIELDS.md) - Shopify metafields configuration
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide

## Support

For issues related to:
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **Shopify API**: [Shopify Documentation](https://shopify.dev/docs)
- **Vercel**: [Vercel Documentation](https://vercel.com/docs)

## License

This project is proprietary to PIOKA USA.

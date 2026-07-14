# Deployment Guide

This guide explains how to deploy the PIOKA USA digital catalog to Vercel.

## Prerequisites

- A Vercel account
- Shopify Storefront API credentials
- Git repository (GitHub, GitLab, or Bitbucket)

## Environment Variables

Before deploying, ensure you have the following environment variables configured:

### Required Variables

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
SHOPIFY_API_VERSION=2025-01
NEXT_PUBLIC_SHOP_URL=https://piokausa.com
NEXT_PUBLIC_CATALOG_URL=https://your-catalog-url.vercel.app
```

### Optional Variables

```bash
NEXT_PUBLIC_ENABLE_CART=false
```

## Deployment Steps

### 1. Push Code to Git Repository

```bash
git add .
git commit -m "Initial catalog deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and log in
2. Click "Add New Project"
3. Import your Git repository
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (or leave as is if in root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add environment variables in the "Environment Variables" section
6. Click "Deploy"

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

Follow the prompts to configure your project and add environment variables.

### 3. Configure Environment Variables in Vercel

After creating the project, add your environment variables:

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add each variable from the `.env.example` file
4. Make sure to include both server-side and client-side variables (those prefixed with `NEXT_PUBLIC_`)

### 4. Production Deployment

For production deployment:

```bash
vercel --prod
```

Or use the Vercel dashboard to promote your deployment to production.

## Shopify Storefront API Setup

### Creating Storefront API Credentials

1. Go to your Shopify Admin
2. Navigate to **Settings** > **Apps and sales channels**
3. Click **Develop apps**
4. Click **Create an app**
5. Name your app (e.g., "Digital Catalog")
6. Configure **Admin API access** if needed (not required for catalog)
7. Configure **Storefront API access**:
   - Select the following permissions:
     - `unauthenticated_read_product_listings`
     - `unauthenticated_read_product_types`
     - `unauthenticated_read_product_tags`
8. Click **Install app**
9. Copy the **Storefront API access token**
10. Note your **Store URL** (e.g., `your-store.myshopify.com`)

### Required Shopify Permissions

The catalog requires the following unauthenticated Storefront API permissions:

- `unauthenticated_read_product_listings` - Read products
- `unauthenticated_read_product_types` - Read product types
- `unauthenticated_read_product_tags` - Read product tags

## Custom Domain Configuration

### Adding a Custom Domain

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain (e.g., `catalog.piokausa.com`)
4. Follow the DNS configuration instructions provided by Vercel

### DNS Configuration

Update your DNS records:

```
Type: CNAME
Name: catalog (or your subdomain)
Value: cname.vercel-dns.com
```

## Post-Deployment Checklist

After deployment, verify:

- [ ] Catalog homepage loads correctly
- [ ] Collections are displayed
- [ ] Products load from Shopify
- [ ] Product images display
- [ ] Search functionality works
- [ ] Print view renders correctly
- [ ] QR codes are generated
- [ ] Links to Shopify store work
- [ ] Mobile layout is responsive
- [ ] Environment variables are configured

## Troubleshooting

### Products Not Loading

1. Check environment variables are set correctly
2. Verify Shopify Storefront API token is valid
3. Check Shopify API permissions
4. Check browser console for GraphQL errors
5. Verify products are published to the Online Store sales channel

### Build Errors

1. Run `npm run build` locally to reproduce
2. Check TypeScript errors: `npm run type-check`
3. Check linting errors: `npm run lint`
4. Ensure all dependencies are installed: `npm install`

### Environment Variables Not Working

1. Ensure variables are set in Vercel project settings
2. Variables prefixed with `NEXT_PUBLIC_` are available in browser
3. Server-side variables are only available on the server
4. Redeploy after adding/changing environment variables

### Print View Issues

1. Check browser print preview
2. Verify print CSS is loaded
3. Ensure @page rules are supported by browser
4. Check for JavaScript errors in console

## Cache Revalidation

The catalog uses Next.js ISR (Incremental Static Regeneration) with a 5-minute revalidation period.

### Manual Cache Revalidation

To manually revalidate the cache:

1. Trigger a new deployment in Vercel
2. Or implement the webhook endpoint (optional)

### Webhook Cache Revalidation (Optional)

For automatic cache revalidation when products change in Shopify:

1. Create a Shopify webhook for `products/update` and `products/create`
2. Point it to your Vercel deployment: `https://your-domain.vercel.app/api/webhooks/shopify`
3. Implement webhook verification (see webhook implementation guide)

## Monitoring

### Vercel Analytics

Enable Vercel Analytics for performance monitoring:

1. Go to project settings
2. Navigate to "Analytics"
3. Enable analytics

### Error Tracking

Consider integrating error tracking:

- Sentry
- LogRocket
- Vercel Log Drains

## Scaling Considerations

### High Traffic

- Vercel automatically scales
- Consider upgrading to Pro plan for:
  - Higher bandwidth limits
  - Faster build times
  - Priority support
  - Advanced analytics

### Rate Limiting

Shopify Storefront API has rate limits. If you encounter rate limiting:

1. Implement caching strategies
2. Reduce revalidation frequency
3. Consider Shopify Plus for higher limits

## Security Best Practices

1. Never commit `.env.local` files
2. Use environment variables for all sensitive data
3. Rotate API tokens regularly
4. Monitor Shopify API usage
5. Keep dependencies updated
6. Enable security headers in Vercel

## Support

For issues related to:
- **Vercel Deployment**: [Vercel Documentation](https://vercel.com/docs)
- **Shopify API**: [Shopify Documentation](https://shopify.dev/docs)
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)

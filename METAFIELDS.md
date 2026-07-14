# Shopify Metafields Configuration

This document describes the recommended Shopify metafields for the PIOKA USA digital catalog.

## Metafield Namespace

All catalog metafields should use the namespace: `custom`

## Product Metafields

### Basic Product Information

| Key | Type | Description | Example |
|-----|------|-------------|---------|
| `unit_size` | Single-line text | Unit size or weight of the product | "500g", "1kg", "12oz" |
| `case_pack` | Single-line text | Number of units per case | "12 units", "24 units" |
| `case_quantity` | Single-line text | Total quantity in a case | "12", "24", "48" |
| `case_weight` | Single-line text | Weight of the case | "5kg", "10lbs" |

### Product Origin & Details

| Key | Type | Description | Example |
|-----|------|-------------|---------|
| `product_origin` | Single-line text | Country or region of origin | "Japan", "Vietnam", "USA" |
| `material` | Single-line text | Material for packaging products | "PLA", "Paper", "PP" |
| `dimensions` | Single-line text | Product dimensions | "90mm x 90mm x 110mm" |
| `compatible_lid` | Single-line text | Compatible lid for cups/containers | "90mm Dome Lid", "Flat Lid" |

### Product Instructions

| Key | Type | Description | Example |
|-----|------|-------------|---------|
| `preparation_guide` | Multi-line text | Instructions for preparing the product | "Mix 1 scoop with 200ml hot water..." |
| `ingredients` | Multi-line text | Full ingredient list | "Green tea leaves, sugar, flavoring" |
| `storage_instruction` | Single-line text | Storage requirements | "Store in cool, dry place" |

### Catalog Display

| Key | Type | Description | Example |
|-----|------|-------------|---------|
| `catalog_short_description` | Multi-line text | Short description for catalog cards | "Premium ceremonial grade matcha from Kyoto" |
| `catalog_badge` | Single-line text | Badge to display on product card | "New", "Best Seller", "Sale" |
| `catalog_sort_order` | Number | Sort order within collections | `1`, `2`, `3` |
| `catalog_hidden` | Checkbox | Hide product from catalog | `true`/`false` |

## How to Create Metafields in Shopify

1. Go to your Shopify Admin
2. Navigate to **Settings** > **Custom data**
3. Click **Products**
4. Click **Add definition**
5. Enter the namespace: `custom`
6. Enter the key (e.g., `unit_size`)
7. Select the appropriate type
8. Check "Allow multiple values" if needed
9. Click **Save**

## Example Metafield Values

### Matcha Product
- `unit_size`: "500g"
- `case_pack`: "12 units"
- `case_quantity`: "12"
- `product_origin`: "Japan"
- `preparation_guide`: "Sift 2g matcha into bowl. Add 60ml hot water (175°F). Whisk in W motion for 20 seconds."
- `ingredients`: "Ceremonial grade matcha powder"
- `storage_instruction`: "Store in airtight container away from light and moisture"
- `catalog_short_description`: "Premium ceremonial grade matcha from Kyoto, perfect for traditional tea ceremony"
- `catalog_badge`: "Best Seller"

### Cup Product
- `unit_size`: "16oz"
- `case_pack`: "500 units"
- `case_quantity`: "500"
- `material`: "PLA Compostable"
- `dimensions`: "90mm top diameter x 95mm height"
- `compatible_lid`: "90mm Dome Lid or Flat Lid"
- `catalog_short_description`: "Eco-friendly PLA cups perfect for cold beverages"
- `catalog_badge`: "Eco-Friendly"

## Important Notes

- All metafields are **optional**. The catalog will work without them.
- The application uses graceful fallbacks when metafields are missing.
- Set `catalog_hidden` to `true` to exclude products from the catalog.
- Use `catalog_sort_order` to control product display order within collections.
- HTML descriptions are supported for `preparation_guide` and `ingredients`.

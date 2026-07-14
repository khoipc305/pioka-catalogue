# Danh Mục Sản Phẩm Kỹ Thuật Số PIOKA USA

Danh mục bán sỉ kỹ thuật số sản xuất sẵn cho PIOKA USA kết nối trực tiếp với Shopify. Được xây dựng với Next.js, TypeScript và Tailwind CSS.

## Tính Năng

- **Tích Hợp Shopify Động**: Tự động hiển thị sản phẩm và bộ sưu tập Shopify đã xuất bản
- **Cập Nhật Thời Gian Thực**: Danh mục cập nhật khi thông tin sản phẩm thay đổi trong Shopify
- **Tìm Kiếm & Lọc**: Tìm kiếm nâng cao với bộ lọc cho bộ sưu tập, loại, tình trạng sẵn có, nhà cung cấp, giá và thẻ
- **Danh Mục In Sẵn Sàng**: Chế độ xem in tối ưu cho US Letter với mã QR
- **Thiết Kế Đáp Ứng**: Thiết kế ưu tiên di động hoạt động trên mọi thiết bị
- **Hỗ Trợ Metafield**: Metafield Shopify tùy chọn để nâng cao thông tin sản phẩm
- **Tối Ưu Hóa SEO**: Metadata động, dữ liệu có cấu trúc và sitemap
- **Phù Hợp Thương Hiệu**: Thiết kế trực quan phù hợp với thương hiệu PIOKA USA

## Công Nghệ

- **Framework**: Next.js 15 với App Router
- **Ngôn Ngữ**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Shopify Storefront GraphQL API
- **Mã QR**: react-qr-code
- **Biểu Tượng**: Lucide React
- **Triển Khai**: Vercel

## Bắt Đầu

### Điều Kiện Tiên Quyết

- Node.js 18+ đã cài đặt
- Thông tin xác thực API Storefront Shopify
- Git

### Cài Đặt

1. Clone repository:
```bash
git clone <url-repository-cua-ban>
cd pioka-catalog
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Cấu hình biến môi trường:
```bash
cp .env.example .env.local
```

4. Cập nhật `.env.local` với thông tin xác thực của bạn:
```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
SHOPIFY_API_VERSION=2025-01
NEXT_PUBLIC_SHOP_URL=https://piokausa.com
NEXT_PUBLIC_CATALOG_URL=http://localhost:3000
```

### Chạy Địa Phương

Khởi động server phát triển:
```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem danh mục.

## Cài Đặt Shopify

### Tạo Thông Tin Xác Thực API Storefront

1. Đi đến Shopify Admin của bạn
2. Điều hướng đến **Settings** > **Apps and sales channels**
3. Nhấp vào **Develop apps** > **Create an app**
4. Đặt tên cho ứng dụng của bạn (ví dụ: "Digital Catalog")
5. Cấu hình **Storefront API access** với các quyền sau:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_types`
   - `unauthenticated_read_product_tags`
6. Nhấp vào **Install app**
7. Sao chép **Storefront API access token**

### Quyền Cần Thiết

Danh mục yêu cầu các quyền API Storefront chưa xác thực sau:
- `unauthenticated_read_product_listings` - Đọc sản phẩm
- `unauthenticated_read_product_types` - Đọc loại sản phẩm
- `unauthenticated_read_product_tags` - Đọc thẻ sản phẩm

## Cấu Hình Danh Mục

### Cấu Hình Bộ Sưu Tập

Chỉnh sửa `src/lib/catalog/config.ts` để cấu hình:
- Tên hiển thị bộ sưu tập
- Thứ tự hiển thị
- Khả năng hiển thị
- Màu nhấn
- Mô tả ngắn

### Thông Tin Công Ty

Chỉnh sửa `src/config/company.ts` để cấu hình:
- Tên công ty và chi tiết liên hệ
- Giờ làm việc
- Thông tin vận chuyển
- Liên kết mạng xã hội

### Metafield Shopify

Metafield tùy chọn nâng cao danh mục. Xem [METAFIELDS.md](./METAFIELDS.md) để biết chi tiết về:
- Kích thước và thông số kỹ thuật sản phẩm
- Hướng dẫn chuẩn bị
- Hướng dẫn lưu trữ
- Tùy chọn hiển thị danh mục

## Cấu Trúc Dự Án

```
src/
├── app/
│   ├── catalog/
│   │   ├── page.tsx              # Trang chủ danh mục
│   │   ├── collections/
│   │   │   └── [handle]/page.tsx # Trang bộ sưu tập
│   │   ├── products/
│   │   │   └── [handle]/page.tsx # Trang chi tiết sản phẩm
│   │   ├── search/page.tsx       # Trang tìm kiếm
│   │   ├── print/page.tsx        # Danh mục in sẵn sàng
│   │   └── about/page.tsx        # Trang về/liên hệ
│   ├── globals.css               # Styles toàn cầu với màu thương hiệu
│   └── layout.tsx                # Layout gốc
├── components/
│   ├── catalog/
│   │   ├── ProductCard.tsx       # Thành phần thẻ sản phẩm
│   │   ├── FilterPanel.tsx        # Bảng lọc
│   │   └── SortSelect.tsx        # Tùy chọn sắp xếp
│   └── navigation/
│       └── Header.tsx            # Header điều hướng
├── lib/
│   ├── shopify/
│   │   ├── client.ts             # Client GraphQL Shopify
│   │   ├── queries.ts            # Truy vấn GraphQL
│   │   ├── fragments.ts          # Fragment GraphQL
│   │   ├── types.ts              # Types TypeScript
│   │   ├── products.ts           # Hàm API sản phẩm
│   │   └── collections.ts        # Hàm API bộ sưu tập
│   └── catalog/
│       ├── config.ts             # Cấu hình danh mục
│       └── helpers.ts            # Hàm trợ giúp
└── config/
    └── company.ts               # Cấu hình công ty
```

## Scripts Có Sẵn

- `npm run dev` - Khởi động server phát triển
- `npm run build` - Build cho sản xuất
- `npm run start` - Khởi động server sản xuất
- `npm run lint` - Chạy ESLint
- `npm run type-check` - Chạy kiểm tra TypeScript

## Danh Mục In

Để tạo PDF sẵn sàng in:

1. Điều hướng đến `/catalog/print`
2. Sử dụng chức năng in của trình duyệt (Cmd/Ctrl + P)
3. Chọn "Save as PDF" làm đích đến
4. Chế độ xem in được tối ưu cho kích thước US Letter

## Thay Đổi Màu Thương Hiệu

Chỉnh sửa `src/app/globals.css` để sửa đổi màu thương hiệu:

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

## Xác Thực Lại Cache

Danh mục sử dụng Next.js ISR với thời gian xác thực lại 5 phút. Để thay đổi điều này:

Chỉnh sửa `src/lib/shopify/client.ts`:
```typescript
next: {
  revalidate: 300, // Thay đổi giá trị này (tính bằng giây)
}
```

## Tính Năng Tùy Chọn

### Tính Năng Giỏ Hàng

Bật tính năng giỏ hàng bằng cách đặt:
```bash
NEXT_PUBLIC_ENABLE_CART=true
```

Lưu ý: Tính năng giỏ hàng hiện đang trong phát triển.

### Xác Thực Lại Cache Webhook

Để xác thực lại cache tự động khi sản phẩm thay đổi trong Shopify, triển khai endpoint webhook tại `src/app/api/webhooks/shopify/route.ts`.

## Triển Khai

Xem [DEPLOYMENT.md](./DEPLOYMENT.md) để biết hướng dẫn triển khai chi tiết đến Vercel.

### Triển Khai Nhanh Đến Vercel

1. Đẩy code đến repository Git
2. Nhập dự án trong Vercel
3. Thêm biến môi trường
4. Triển khai

## Khắc Phục Sự Cố

### Sản Phẩm Không Tải

1. Xác minh biến môi trường được đặt đúng
2. Kiểm tra token API Storefront Shopify có hợp lệ
3. Đảm bảo sản phẩm được xuất bản đến kênh bán hàng Online Store
4. Kiểm tra console trình duyệt để tìm lỗi GraphQL

### Lỗi Build

```bash
# Kiểm tra lỗi TypeScript
npm run type-check

# Kiểm tra lỗi linting
npm run lint

# Build sạch
rm -rf .next
npm run build
```

### Metafield Thiếu

Danh mục hoạt động mà không cần metafield. Metafield thiếu sẽ:
- Sử dụng giá trị dự phòng (ví dụ: tiêu đề biến thể thay vì kích thước đơn vị)
- Ẩn các phần trống
- Không phá vỡ layout

## Tài Liệu

- [METAFIELDS.md](./METAFIELDS.md) - Cấu hình metafield Shopify
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Hướng dẫn triển khai

## Hỗ Trợ

Đối với các vấn đề liên quan đến:
- **Next.js**: [Tài Liệu Next.js](https://nextjs.org/docs)
- **Shopify API**: [Tài Liệu Shopify](https://shopify.dev/docs)
- **Vercel**: [Tài Liệu Vercel](https://vercel.com/docs)

## Giấy Phép

Dự án này là tài sản độc quyền của PIOKA USA.

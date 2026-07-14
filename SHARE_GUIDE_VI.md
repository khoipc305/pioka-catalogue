# Hướng Dẫn Chia Sẻ Danh Mục Cho Khách Hàng

## Cách Đơn Giản Nhất

Sau khi deploy lên Vercel, bạn sẽ có **một URL duy nhất** để chia sẻ.

## URL Cần Chia Sẻ

### Link Danh Mục Chính
```
https://pioka-catalog.vercel.app/catalog
```

### Link In Danh Mục (Tự động mở dialog in)
```
https://pioka-catalog.vercel.app/catalog/print
```

## Cách Chia Sẻ

### 1. Chia Sẻ Link Trực Tiếp

**Qua Email:**
```
Chào quý khách,

Mời quý khách xem danh mục sản phẩm mới nhất của chúng tôi tại:
https://pioka-catalog.vercel.app/catalog

Trân trọng,
PIOKA USA
```

**Qua Tin Nhắn/Zalo:**
```
Xem danh sách sản phẩm mới tại: https://pioka-catalog.vercel.app/catalog
```

**Đặt Trên Website:**
```html
<a href="https://pioka-catalog.vercel.app/catalog" target="_blank">
  Xem Danh Mục Sản Phẩm
</a>
```

### 2. Tạo Mã QR Code

**Cách 1: Sử dụng website miễn phí**
1. Truy cập: https://www.qr-code-generator.com
2. Dán URL: `https://pioka-catalog.vercel.app/catalog`
3. Nhấn "Generate QR Code"
4. Tải về hình ảnh

**Cách 2: Dùng công cụ dòng lệnh**
```bash
# Cài đặt qrcode
npm install -g qrcode-terminal

# Tạo mã QR
qrcode https://pioka-catalog.vercel.app/catalog
```

### 3. In Mã QR Code

**In trên tài liệu marketing:**
- Brochure
- Flyer
- Menu
- Card danh thiếp
- Bao bì sản phẩm

**Ví dụ nội dung:**
```
Quét mã QR để xem danh mục sản phẩm đầy đủ
```

## Cách Sử Dụng Cho Khách Hàng

### Khách Hàng Cần Làm Gì?

1. **Quét mã QR** hoặc **nhấp vào link**
2. Xem danh mục sản phẩm trên điện thoại/máy tính
3. Tìm kiếm sản phẩm theo tên, SKU, loại
4. Lọc theo danh mục, giá, tình trạng
5. Nhấp "Shop on Shopify" để đặt hàng

### Không Cần Tài Khoản

Khách hàng **không cần**:
- Đăng ký tài khoản
- Đăng nhập
- Tải ứng dụng

Chỉ cần trình duyệt web!

## Tùy Chọn Domain Riêng

Nếu muốn URL chuyên nghiệp hơn:

### Kết nối domain
```
catalog.piokausa.com
```

Thay vì:
```
https://pioka-catalog.vercel.app/catalog
```

### Cách thiết lập trong Vercel:
1. Vào project settings → Domains
2. Thêm domain: `catalog.piokausa.com`
3. Cập nhật DNS theo hướng dẫn của Vercel

## Ví dụ Thực Tế

### Kịch Bản 1: Chia Sẻ Qua Email

```
Subject: Danh Mục Sản Phẩm Mới 2026 - PIOKA USA

Chào [Tên Khách Hàng],

Chúng tôi xin gửi danh mục sản phẩm mới nhất của PIOKA USA.

🔗 Link xem trực tiếp: https://pioka-catalog.vercel.app/catalog

📱 Hoặc quét mã QR bên dưới:

[QR CODE IMAGE]

Trong danh mục này, quý khách có thể:
- Xem tất cả sản phẩm với hình ảnh chi tiết
- Tìm kiếm theo tên, SKU, loại sản phẩm
- Lọc theo danh mục và giá
- Xem thông tin kỹ thuật đầy đủ
- Đặt hàng trực tiếp qua Shopify

Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ:
📧 info@piokausa.com
📞 (555) 123-4567

Trân trọng,
Đội ngũ PIOKA USA
```

### Kịch Bản 2: In Mã QR Trên Menu

```
┌─────────────────────────────┐
│                             │
│      [Mã QR Code]           │
│                             │
│  Quét để xem danh mục       │
│  sản phẩm đầy đủ            │
│                             │
│  catalog.piokausa.com       │
│                             │
└─────────────────────────────┘
```

## Theo Dõi

Bạn có thể theo dõi xem bao nhiêu người đã truy cập:
- Sử dụng Vercel Analytics (miễn phí)
- Hoặc Google Analytics

## Cập Nhật

Khi bạn cập nhật sản phẩm trong Shopify, danh mục sẽ **tự động cập nhật** sau 5 phút. Khách hàng sẽ luôn thấy thông tin mới nhất!

## Hỗ Trợ

Nếu khách hàng gặp vấn đề khi truy cập:
- Kiểm tra kết nối internet
- Thử trình duyệt khác (Chrome, Safari, Firefox)
- Liên hệ: info@piokausa.com

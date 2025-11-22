# 🏨 Link Hotel VR360 - Virtual Hotel Experience

Ứng dụng web VR360 hiện đại cho khách sạn Link Hotel Vũng Tàu, cho phép khách hàng trải nghiệm khách sạn với công nghệ xem 360 độ, đặt phòng trực tuyến và sử dụng voucher ưu đãi.

## ✨ Tính Năng Chính

### 🎯 VR360 Experience
- **Xem 360°** các phòng nghỉ với công nghệ Pannellum
- **Điều hướng VR** mượt mà, zoom in/out, xoay tự do
- **Fullscreen mode** để trải nghiệm tốt nhất
- **Toggle controls** ẩn/hiện các nút điều khiển

### 🏠 Giới Thiệu Khách Sạn
- Hero banner ấn tượng với thông tin khách sạn
- Thống kê trực quan: 21 tầng, 124 phòng, 5 sao
- Giới thiệu chi tiết về khách sạn
- Timeline lịch sử phát triển
- Thành tựu và giải thưởng
- Danh sách các phòng ban

### 🛏️ Phòng Nghỉ
- Grid layout hiển thị tất cả loại phòng
- Thông tin chi tiết: giá, diện tích, sức chứa
- Filter và search phòng theo tags
- Click để xem VR360 và thông tin chi tiết
- Nút "Đặt phòng" trực tiếp trên mỗi card

### 🎫 Ưu Đãi & Voucher
- Hiển thị các chương trình khuyến mãi
- 4 loại voucher: Early booking, Spa package, Family offer, Flash sale
- Countdown timer cho từng voucher
- **Copy mã voucher** một cú click
- Badge phân loại ưu đãi (giảm %, tặng kèm, flash sale)

### 🏊 Tiện Ích
- Grid layout hiển thị các tiện ích khách sạn
- Icons và mô tả chi tiết từng tiện ích
- Bao gồm: Hồ bơi, Gym, Spa, Nhà hàng, Bar, v.v.

### 📋 Chính Sách
- Grid layout 3 cột responsive
- 6 chính sách chính: Check-in/out, Hủy phòng, Trẻ em, Vật nuôi, Hút thuốc, Quy định chung
- Icon và mô tả chi tiết
- Thông báo lưu ý quan trọng

### 📞 Liên Hệ
- Form liên hệ với validation
- Thông tin liên hệ: Địa chỉ, Phone, Email, Website
- Giờ làm việc
- Google Maps integration

### 💳 Đặt Phòng
- **Modal đặt phòng hiện đại** với 2 cột (form + summary)
- **Calendar picker** chọn ngày check-in/out với date range
- **Guest counter** tăng/giảm số lượng khách
- **Nhập thông tin** khách hàng (tên, SĐT)
- **Voucher input** với validation và áp dụng giảm giá tự động
- **Price breakdown** chi tiết (giá phòng x đêm, phí dịch vụ, giảm giá)
- **Phương thức thanh toán**: Cash hoặc VNPay

### 💰 Thanh Toán
- **QR Payment Modal** cho VNPay
- Hiển thị QR code và thông tin đơn hàng
- Countdown timer 14:59 phút
- Auto-redirect sau 3 giây (demo)

### ✅ Xác Nhận Đặt Phòng
- **Booking Success Modal** với voucher chi tiết
- Thông tin booking: Check-in/out, số đêm, số khách
- Chi tiết thanh toán với discount (nếu có)
- QR code check-in
- Nút "Về trang chủ"

### 🌐 Đa Ngôn Ngữ
- Chuyển đổi Tiếng Việt ↔️ English
- Tất cả nội dung được dịch
- Toggle language button

### 🔍 Tìm Kiếm
- Search bar với autocomplete
- Tìm kiếm phòng theo tên
- Hiển thị kết quả real-time

## 📁 Cấu Trúc Project

```
hotel-app/
│
├── index.html                 # File HTML chính
│
├── css/
│   ├── style.css             # CSS chính (4400+ lines)
│   └── toggle-btn.css        # CSS cho language toggle
│
├── js/
│   ├── main.js               # Logic chính (2200+ lines)
│   ├── api-service.js        # API service & voucher validation
│   ├── config.js             # Configuration
│   └── hotel-app.js          # App initialization
│
├── data/
│   ├── hotels.json           # Dữ liệu khách sạn, phòng, tiện ích
│   ├── tags.json             # Tags cho filter
│   └── vouchers.json         # Dữ liệu voucher & promotions
│
├── assets/
│   ├── panoramas/            # Ảnh VR360
│   └── icon/                 # Icons
│
└── trang mẫu/                # Reference designs
    ├── dat-phong-khach-san.html
    ├── QR-thanh-toan.html
    ├── thanh-toan-thanh-cong.html
    ├── chinh-sach.html
    └── voucher.html
```

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling, Flexbox, Grid, Animations
- **Vanilla JavaScript (ES6+)** - No framework, pure JS

### Libraries
- **[Pannellum](https://pannellum.org/)** - VR360 viewer
- **[Font Awesome](https://fontawesome.com/)** - Icons
- **Google Fonts** - Typography

### Design System
- **Primary Color**: `#137fec` (Blue)
- **Background**: `#f8fafc`, `#f9fafb`
- **Text**: `#0d141b`, `#6b7280`
- **Border Radius**: 8px, 12px
- **Font**: System fonts + Plus Jakarta Sans

## 🚀 Cách Sử Dụng

### 1. Clone Repository
```bash
git clone https://github.com/Tmy-andy/hotel-vr-demo.git
cd hotel-vr-demo
```

### 2. Mở Bằng Live Server
```bash
# Nếu dùng VS Code với Live Server extension
# Click chuột phải vào index.html → "Open with Live Server"
```

### 3. Hoặc Mở Trực Tiếp
```bash
# Mở file index.html bằng trình duyệt
# Recommended: Chrome, Firefox, Edge
```

## 📱 Responsive Design

- **Desktop**: Full features, sidebar + content panel
- **Tablet**: Optimized layout, touch-friendly
- **Mobile**: Hamburger menu, optimized UI

## 🎨 Tùy Chỉnh

### Thay Đổi Màu Sắc
```css
/* Trong file css/style.css */
:root {
    --primary: #137fec;
    --primary-dark: #0d6edb;
    /* ... các biến màu khác */
}
```

### Thêm Phòng Mới
```json
// Trong file data/hotels.json
{
    "id": "room-new",
    "name": "Tên Phòng",
    "price": 3500000,
    "area": 45,
    "capacity": 2,
    "image": "url-image",
    "panorama": "url-panorama-360",
    "description": {...},
    "amenities": [...],
    "tags": [...]
}
```

### Thêm Voucher Mới
```json
// Trong file data/vouchers.json
{
    "id": "CODE123",
    "code": "CODE123",
    "discount": 20,
    "discountType": "percent",
    "minNights": 2,
    "active": true,
    // ... các field khác
}
```

## 🔧 Các Tính Năng Kỹ Thuật

### State Management
```javascript
const state = {
    currentPage: 'rooms',
    currentLanguage: 'vi',
    vrViewer: null,
    hotelData: null,
    selectedRoom: null,
    vouchers: null
};
```

### Booking Flow
```
1. Click "Đặt phòng" → Open booking modal
2. Select dates from calendar
3. Enter guest info
4. (Optional) Enter voucher code → Validate & apply discount
5. Choose payment method
6. Submit → Show QR (VNPay) or Success modal
```

### Voucher Validation
```javascript
// Kiểm tra:
- Mã hợp lệ & active
- Số đêm >= minNights
- Tính discount (percent hoặc fixed)
- Update price summary
```

## 📊 Dữ Liệu JSON

### hotels.json
- `hotelInfo`: Thông tin khách sạn
- `rooms`: Danh sách phòng
- `facilities`: Tiện ích
- `policies`: Chính sách
- `contact`: Thông tin liên hệ

### vouchers.json
- `vouchers[]`: Mảng các voucher
  - `code`: Mã voucher
  - `discount`: Số tiền/% giảm
  - `discountType`: "percent" | "fixed" | "gift"
  - `minNights`: Số đêm tối thiểu
  - `expiryDays/Hours/Minutes`: Thời gian còn lại
  - `features[]`: Điều kiện áp dụng

## 🌟 Highlights

- ✅ **No dependencies** - Pure vanilla JavaScript
- ✅ **Mobile-first** - Responsive design
- ✅ **Performance** - Optimized loading, lazy load images
- ✅ **UX/UI** - Smooth animations, intuitive navigation
- ✅ **Accessibility** - Semantic HTML, keyboard navigation
- ✅ **Maintainable** - Clean code structure, separated concerns

## 🐛 Known Issues

- Calendar chỉ hiển thị 1 tháng hiện tại (có thể mở rộng)
- VR360 cần internet để load panorama images
- Payment integration chỉ là demo UI

## 🚧 Future Enhancements

- [ ] Backend integration (Node.js/PHP)
- [ ] Real payment gateway (VNPay, Momo)
- [ ] User authentication
- [ ] Booking history
- [ ] Email confirmation
- [ ] Admin panel
- [ ] More VR360 panoramas
- [ ] Multi-month calendar picker
- [ ] Reviews & ratings system

## 📄 License

This project is for demonstration purposes.

## 👨‍💻 Author

**Tmy-andy**
- GitHub: [@Tmy-andy](https://github.com/Tmy-andy)

## 🙏 Credits

- **Pannellum** - VR360 viewer library
- **Font Awesome** - Icons
- **Unsplash** - Sample images
- **Google Fonts** - Typography

---

Made with ❤️ for Link Hotel Vũng Tàu
```

### 2. Với Local Server (Khuyến nghị)
```bash
# Python 3
python -m http.server 8000

# Node.js với http-server
npx http-server -p 8000

# Sau đó truy cập: http://localhost:8000
```

## 🎮 Hướng Dẫn Sử Dụng

### Menu Bên Trái (Sidebar)
- **Click icon** để mở panel tương ứng
- Icon active có màu xanh và hiệu ứng
- Hover để xem tooltip

### Content Panel
- Tự động mở khi click vào category
- **Đóng panel**: Click nút X hoặc nhấn ESC
- **Tìm kiếm**: Gõ từ khóa vào ô search
- **Click card**: Xem chi tiết / Navigate to VR view

### Action Buttons (Bên Phải)
- Home, Info, Video, Photos, Fullscreen
- Có thể tùy chỉnh chức năng

### Đổi Ngôn Ngữ
- Click **VN** hoặc **EN** ở góc trên bên phải
- Nội dung tự động chuyển đổi

## 🔧 Tùy Chỉnh

### Thêm / Sửa Dữ Liệu
Edit file `data/hotels.json`:

```json
{
  "hotels": [
    {
      "id": "hotel-xxx",
      "name": {
        "vi": "Tên khách sạn",
        "en": "Hotel name"
      },
      "description": {
        "vi": "Mô tả...",
        "en": "Description..."
      },
      "image": "URL_to_image",
      "rating": 4.5,
      "price": 2000000,
      "coordinates": { "lat": 10.9333, "lng": 108.1000 }
    }
  ]
}
```

### Thay Đổi Màu Sắc
Edit file `css/style.css`:

```css
:root {
    --primary-color: #2196F3;      /* Màu chính */
    --secondary-color: #1976D2;    /* Màu phụ */
    --accent-color: #FFC107;       /* Màu nhấn */
    /* ... */
}
```

### Thêm Category Mới
1. Thêm button trong HTML:
```html
<button class="nav-item" data-category="restaurants" title="Nhà hàng">
    <svg>...</svg>
</button>
```

2. Thêm dữ liệu trong JSON:
```json
{
  "restaurants": [...]
}
```

3. Thêm title trong JS:
```javascript
const categoryTitles = {
    vi: {
        restaurants: 'Nhà Hàng',
        // ...
    }
}
```

## 📱 Responsive Breakpoints

- **Desktop**: > 768px (Full features)
- **Tablet**: 481px - 768px (Optimized layout)
- **Mobile**: < 480px (Compact UI)

## 🎯 Integration với Backend

### API Endpoints (Gợi ý)
```javascript
// Trong file js/main.js, thay đổi loadData():

async function loadData() {
    try {
        // Thay vì load từ file JSON local
        const response = await fetch('/api/locations');
        state.data = await response.json();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}
```

### VR Navigation
```javascript
// Trong handleCardClick(), thêm logic navigate to VR:

function handleCardClick(id) {
    const item = state.filteredData.find(item => item.id === id);
    if (item && item.coordinates) {
        // Navigate to VR view
        window.location.href = `/vr360?lat=${item.coordinates.lat}&lng=${item.coordinates.lng}`;
        
        // Hoặc dùng history API
        // history.pushState({}, '', `/vr360/${item.id}`);
        // loadVRView(item);
    }
}
```

## 🎨 Tùy Chỉnh Nâng Cao

### Custom Animations
Edit `css/style.css` để thay đổi timing và easing:

```css
:root {
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Dark Mode
Thêm vào CSS:

```css
@media (prefers-color-scheme: dark) {
    :root {
        --panel-bg: rgba(30, 30, 30, 0.98);
        --text-primary: #e0e0e0;
        /* ... */
    }
}
```

### Loading States
Function `showLoading()` trong `js/main.js` đã có sẵn.
Customize spinner trong `css/style.css`.

## 🐛 Troubleshooting

### Panel không hiển thị đúng
- Check console errors
- Đảm bảo đã load đúng file JSON
- Kiểm tra network requests

### Search không hoạt động
- Kiểm tra cấu trúc data trong JSON
- Đảm bảo có cả field `vi` và `en`

### Responsive không đúng
- Test trên nhiều devices
- Sử dụng Chrome DevTools
- Kiểm tra viewport meta tag

## 📝 Notes cho Dev Team

1. **File structure**: Đã tách riêng HTML/CSS/JS để dễ maintain
2. **Data separation**: Tất cả data trong JSON, không hardcode
3. **Modular code**: Functions tách biệt, dễ customize
4. **Event delegation**: Efficient event handling
5. **Accessibility**: Keyboard navigation (ESC, Tab, Enter)
6. **Performance**: Debounced search, lazy loading ready

## 🔄 Next Steps

### Suggestions cho phiên bản production:
1. ✅ Integrate với backend API
2. ✅ Add loading skeleton screens
3. ✅ Implement lazy loading cho images
4. ✅ Add error boundaries
5. ✅ Optimize bundle size
6. ✅ Add analytics tracking
7. ✅ Implement caching strategy
8. ✅ Add offline support (PWA)

## 📞 Support

Nếu có thắc mắc hoặc cần support:
- Check documentation trong code comments
- Review console.log outputs
- Contact: [your-email@example.com]

---

**Version**: 1.0.0  
**Last Updated**: November 2025  
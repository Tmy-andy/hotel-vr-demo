# 🏨 Link Hotel VR360 - Virtual Hotel Experience

Ứng dụng web VR360 hiện đại cho khách sạn Link Hotel Vũng Tàu, cho phép khách hàng trải nghiệm khách sạn với công nghệ xem 360 độ, đặt phòng trực tuyến với hệ thống giỏ hàng và sử dụng voucher ưu đãi.

## ✨ Tính Năng Chính

### 🎯 VR360 Experience
- **Xem 360°** các phòng nghỉ với công nghệ Pannellum
- **Điều hướng VR** mượt mà, zoom in/out, xoay tự do
- **Fullscreen mode** để trải nghiệm tốt nhất
- **Toggle controls** ẩn/hiện các nút điều khiển
- **VR Overview** - Nút xem tổng quan khách sạn từ action buttons

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
- **Nút "Đặt phòng"** mở modal cart để chọn nhiều phòng

### 🛒 Hệ Thống Giỏ Hàng (Cart Booking)
- **Đặt nhiều phòng** cùng lúc với số lượng khác nhau
- **Giỏ hàng scrollable** hiển thị danh sách phòng đã chọn
- **Thêm/Xóa/Sửa** phòng trong giỏ hàng
- **Tính toán tự động** tổng tiền theo đêm nghỉ
- **Nhập thông tin đặt phòng**: Tên, Email, SĐT
- **Áp dụng voucher** giảm giá tự động
- **Responsive design**: Single column trên mobile
- **Price breakdown** chi tiết (giá phòng x đêm, phí dịch vụ, giảm giá)

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

### 🍽️ Ẩm Thực
- Giới thiệu các nhà hàng và quầy bar
- Menu và đặc sản
- Giờ phục vụ

### �️ Thư Viện Ảnh & Video
- **Gallery panel** hiển thị ảnh và video khách sạn
- **2 tabs**: Video và Hình ảnh
- **Grid layout responsive** (1-4 cột tùy màn hình)
- **Video cards** với play button hover effect
- **Glassmorphism design** với Tailwind CSS
- **Aspect ratio 3:4** cho cards

### �📋 Chính Sách & Nội Quy
- Grid layout 3 cột responsive
- Chính sách: Check-in/out, Hủy phòng, Trẻ em, Vật nuôi, Hút thuốc
- Nội quy chi tiết cho khách lưu trú
- Icon và mô tả chi tiết

### 📞 Liên Hệ
- **Form liên hệ responsive** cho mobile
- Thông tin liên hệ: Địa chỉ, Phone, Email, Website
- Giờ làm việc
- Google Maps integration

### 💳 Thanh Toán
- **QR Payment Modal** cho VNPay
- Hiển thị QR code và thông tin đơn hàng
- Countdown timer 14:59 phút
- Auto-redirect sau khi thanh toán

### ✅ Xác Nhận Đặt Phòng
- **Booking Success Modal** với voucher chi tiết
- Thông tin booking: Check-in/out, số đêm, số khách
- Chi tiết thanh toán với discount (nếu có)
- QR code check-in
- Nút "Về trang chủ"

### 🎨 UI/UX Features
- **Sidebar tooltips** với glassmorphism effect (15% opacity, blur 20px)
- **Action buttons**: Toggle UI, Fullscreen, Overview, Gallery
- **Content panel** mở rộng với animation smooth
- **Room info panel** hiển thị chi tiết phòng
- **Glassmorphism design** xuyên suốt UI
- **Responsive design** tối ưu cho mobile

### 🌐 Đa Ngôn Ngữ
- Chuyển đổi Tiếng Việt ↔️ English
- Tất cả nội dung được dịch
- Toggle language button

### 🔍 Tìm Kiếm
- Search bar có thể ẩn/hiện
- Tìm kiếm theo tên phòng
- Hiển thị kết quả real-time

## 📁 Cấu Trúc Project

```
hotel-app/
│
├── index.html                 # File HTML chính
│
├── css/
│   ├── style-new.css         # CSS modular (imports)
│   ├── base.css              # Base styles & variables
│   ├── layout.css            # Sidebar, panels, layout
│   ├── components.css        # Components (cards, buttons, gallery)
│   ├── room-info.css         # Room info panel styles
│   ├── pages.css             # Page-specific styles
│   ├── responsive.css        # Media queries
│   ├── toggle-btn.css        # Language toggle button
│   └── booking-cart.css      # Cart booking system
│
├── js/
│   ├── main-new.js           # Entry point (ES6 modules)
│   ├── state.js              # Global state management
│   ├── vr-viewer.js          # VR viewer logic
│   ├── navigation.js         # Navigation & event handlers
│   ├── rooms.js              # Rooms page logic
│   ├── pages.js              # Static pages (intro, vouchers, etc)
│   ├── facilities.js         # Facilities page
│   ├── dining.js             # Dining page
│   ├── utils.js              # Utility functions
│   ├── booking-cart.js       # Cart booking system (729 lines)
│   ├── gallery.js            # Gallery module
│   ├── api-service.js        # API service (voucher validation)
│   └── config.js             # Configuration
│
├── data/
│   ├── hotels.json           # Dữ liệu khách sạn, phòng, tiện ích
│   └── vouchers.json         # Dữ liệu voucher & promotions
│
├── assets/
│   ├── panoramas/            # Ảnh VR360
│   └── icon/                 # Icons
│
├── sample-pages/             # Reference designs (Tailwind)
│   ├── dat-phong-khach-san.html
│   ├── QR-thanh-toan.html
│   ├── thanh-toan-thanh-cong.html
│   ├── chinh-sach.html
│   ├── voucher.html
│   └── thu-vien.html
│
└── replace_*.py              # Python scripts for global replacements
```

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling, Flexbox, Grid, Animations, Glassmorphism
- **Vanilla JavaScript (ES6+)** - Modules, async/await, modern syntax
- **Tailwind CSS** - Utility-first CSS (used in gallery)

### Libraries & Frameworks
- **[Pannellum 2.5.6](https://pannellum.org/)** - VR360 viewer với hotspots
- **[Font Awesome 6.6.0](https://fontawesome.com/)** - 2000+ icons
- **[Tailwind CSS](https://tailwindcss.com/)** - CDN cho gallery components
- **Google Fonts** - Typography (Plus Jakarta Sans)

### Architecture
- **ES6 Modules** - Modular JavaScript architecture
- **CSS Modules** - Separated concerns (base, layout, components)
- **State Management** - Centralized state object
- **Event-driven** - Event delegation và custom events

### Design System
- **Primary Color**: `#137fec` (Blue)
- **Accent Color**: `#C0A47C` (Gold) 
- **Background**: `#f8fafc`, `#f9fafb`
- **Text**: `#0d141b`, `#6b7280`
- **Glassmorphism**: `rgba(255,255,255,0.15)` + `blur(20px)`
- **Border Radius**: 8px, 12px, 16px
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
# Recommended: Chrome, Firefox, Edge (latest versions)
```

### 4. Python Scripts (Optional)
```bash
# Replace colors globally
python replace_colors.py

# Replace hotel name (Nha Trang → Vũng Tàu)
python replace_hotel_name.py
```

## 📱 Responsive Design

- **Desktop (1920px+)**: Full features, sidebar + dual panels
- **Laptop (1366px)**: Optimized layout, full sidebar
- **Tablet (768px)**: Touch-friendly, responsive grid
- **Mobile (375px)**: Single column, hamburger menu, bottom navigation

## 🎨 Tùy Chỉnh

### Thay Đổi Màu Sắc
```css
/* Trong file css/base.css */
:root {
    --primary-color: #137fec;
    --accent-color: #C0A47C;
    --background-color: #f8fafc;
    /* ... các biến màu khác */
}
```

### Thêm Phòng Mới
```json
// Trong file data/hotels.json → rooms array
{
    "id": "room-new",
    "name": {
        "vi": "Phòng Mới",
        "en": "New Room"
    },
    "price": 3500000,
    "area": 45,
    "capacity": 2,
    "image": "url-image",
    "panoramaUrl": "url-panorama-360",
    "description": {...},
    "amenities": [...],
    "tags": [...]
}
```

### Thêm Voucher Mới
```json
// Trong file data/vouchers.json → vouchers array
{
    "id": "NEW2025",
    "code": "NEW2025",
    "title": {
        "vi": "Ưu đãi mới",
        "en": "New Offer"
    },
    "discount": 20,
    "discountType": "percent",
    "minNights": 2,
    "active": true,
    "expiryDays": 30,
    "expiryHours": 12,
    "expiryMinutes": 0,
    "badge": {
        "text": {"vi": "Giảm 20%", "en": "20% OFF"},
        "color": "blue"
    }
}
```

## 🔧 Các Tính Năng Kỹ Thuật

### State Management
```javascript
// Global state in state.js
const state = {
    currentPage: 'rooms',
    currentLanguage: 'vi',
    vrViewer: null,
    hotelData: null,
    selectedRoom: null,
    vouchers: null
};
```

### Cart Booking Flow
```
1. Click "Đặt phòng" → Open cart modal
2. Add multiple rooms with quantity
3. Select dates from calendar picker
4. Enter customer info (Name, Email, Phone)
5. (Optional) Enter voucher code → Validate & apply discount
6. Review cart summary with price breakdown
7. Choose payment method (Cash/VNPay)
8. Submit → Show QR payment or Success modal
```

### Voucher Validation Logic
```javascript
// In api-service.js
1. Check voucher exists and is active
2. Validate minimum nights requirement
3. Calculate discount (percent or fixed)
4. Apply to total price
5. Update cart summary display
```

### Gallery System
```javascript
// In gallery.js
- Data structure: videos[] & images[] with multilang titles
- Tabs switching: videos ↔ images
- Grid layout: Tailwind classes (responsive 1-4 columns)
- Hover effects: Play button overlay for videos
```

## 📊 Dữ Liệu JSON

### hotels.json Structure
```javascript
{
  "hotelInfo": {
    "name": {"vi": "...", "en": "..."},
    "description": {...},
    "defaultPanorama": "url...",
    "stats": {...}
  },
  "rooms": [
    {
      "id": "deluxe-room",
      "name": {"vi": "...", "en": "..."},
      "price": 2500000,
      "panoramaUrl": "...",
      "amenities": [...],
      "tags": [...]
    }
  ],
  "facilities": [...],
  "dining": [...],
  "policies": [...],
  "rules": [...],
  "contact": {...}
}
```

### vouchers.json Structure
```javascript
{
  "vouchers": [
    {
      "id": "EARLYBOOK25",
      "code": "EARLYBOOK25",
      "title": {"vi": "...", "en": "..."},
      "discount": 25,
      "discountType": "percent",
      "minNights": 3,
      "active": true,
      "expiryDays": 45,
      "features": [
        {"icon": "calendar", "text": {...}}
      ],
      "badge": {
        "text": {"vi": "Giảm 25%", "en": "25% OFF"},
        "color": "blue"
      }
    }
  ]
}
```

## 🌟 Highlights

- ✅ **ES6+ Modules** - Modern JavaScript architecture
- ✅ **No jQuery** - Pure vanilla JavaScript
- ✅ **Mobile-first** - Responsive design from 375px to 4K
- ✅ **Performance** - Optimized loading, modular CSS
- ✅ **UX/UI** - Glassmorphism, smooth animations, intuitive navigation
- ✅ **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation
- ✅ **Maintainable** - Separated concerns, modular structure
- ✅ **Multi-language** - Complete i18n support (VI/EN)

## 🐛 Known Issues & Limitations

- ⚠️ Calendar picker chỉ hiển thị tháng hiện tại
- ⚠️ VR360 panoramas cần internet connection
- ⚠️ Payment integration là demo UI (no real transactions)
- ⚠️ No backend - data stored in JSON files
- ⚠️ Voucher validation chỉ là client-side

## 🚧 Future Enhancements

### Backend & Integration
- [ ] Node.js/Express backend API
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Real payment gateway (VNPay API, Momo)
- [ ] Email notification system
- [ ] SMS confirmation (OTP)

### Features
- [ ] User authentication & profiles
- [ ] Booking history & management
- [ ] Reviews & ratings system
- [ ] Wishlist/favorites
- [ ] Advanced search & filters
- [ ] Real-time availability checking
- [ ] Multi-month calendar picker
- [ ] More VR360 panoramas with hotspots

### Admin Panel
- [ ] Dashboard with analytics
- [ ] Manage rooms & bookings
- [ ] Voucher management
- [ ] Content management system
- [ ] Customer management

### Optimization
- [ ] Progressive Web App (PWA)
- [ ] Service Worker caching
- [ ] Image optimization (WebP, lazy loading)
- [ ] Code splitting
- [ ] SEO optimization

## 📄 License

This project is for demonstration and educational purposes.

## 👨‍💻 Author

**Tmy-andy**
- GitHub: [@Tmy-andy](https://github.com/Tmy-andy)
- Repository: [hotel-vr-demo](https://github.com/Tmy-andy/hotel-vr-demo)

## 🙏 Credits & Acknowledgments

- **[Pannellum](https://pannellum.org/)** by Matthew Petroff - VR360 viewer library
- **[Font Awesome](https://fontawesome.com/)** - Icon library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility CSS framework
- **[Google Fonts](https://fonts.google.com/)** - Plus Jakarta Sans typography
- **[Unsplash](https://unsplash.com/)** - Sample images
- **Link Hotel Vũng Tàu** - Inspiration and branding

## 📞 Support & Contact

For questions, suggestions, or issues, please:
- Open an issue on GitHub
- Contact: [Your email]

---

**Made with ❤️ for Link Hotel Vũng Tàu**

*Last updated: January 2025*# Sau đó truy cập: http://localhost:8000
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
- Contact: [tmy300803@gmail.com]

---

**Version**: 1.0.0  
**Last Updated**: November 2025  
# VR360 Du Lịch Phan Thiết - Demo UI

Demo giao diện tối ưu cho ứng dụng VR360 Du Lịch Phan Thiết với menu sidebar hiện đại và panel nội dung slide-in.

## 🎯 Tính Năng

### ✅ Đã Hoàn Thành
- **Sidebar Menu** với icon hiện đại, thay thế menu cũ
- **Content Panel** slide-in từ bên trái với hiệu ứng mượt mà
- **Responsive Design** hoạt động tốt trên mọi thiết bị
- **Tìm kiếm** nội dung theo tiếng Việt và tiếng Anh
- **Đa ngôn ngữ** (Tiếng Việt / English)
- **Dữ liệu JSON** tách riêng, dễ dàng cập nhật
- **Action Buttons** bên phải cho các chức năng phụ
- **Animation** mượt mà, UX/UI tối ưu

### 🎨 Thiết Kế
- UI tối giản, hiện đại
- Color scheme nhất quán
- Icons SVG sắc nét
- Backdrop blur effects
- Smooth transitions
- Mobile-first approach

## 📁 Cấu Trúc Thư Mục

```
vr360-demo/
│
├── index.html              # File HTML chính
│
├── css/
│   └── style.css           # CSS chính (responsive, animations)
│
├── js/
│   └── main.js             # JavaScript logic
│
├── data/
│   └── hotels.json         # Dữ liệu khách sạn, điểm du lịch
│
└── assets/
    └── icons/              # Icons & images (nếu cần)
```

## 🚀 Cách Sử Dụng

### 1. Mở Trực Tiếp
```bash
# Mở file index.html bằng trình duyệt
# Hoặc dùng Live Server trong VS Code
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
**Created by**: Claude (Anthropic)
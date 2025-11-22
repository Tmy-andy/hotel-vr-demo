// ===== Pages Module =====
// Handles rendering of static content pages: intro, vouchers, policies, contact, rules

import { state, elements, pageTitles } from './state.js';
import { formatPrice } from './utils.js';

// ===== Render Introduction =====
export function renderIntroduction() {
    const lang = state.currentLanguage;
    const info = state.hotelData.hotelInfo;
    
    const html = `
        <div class="intro-content">
            <!-- Hero Banner -->
            <section class="intro-hero-banner">
                <div class="hero-overlay"></div>
                <div class="hero-text">
                    <h1 class="hero-title">BOUTIQUE RESORT IN THE<br>HEART OF VŨNG TÀU</h1>
                    <div class="hero-stats">
                        <div class="stat-item">
                            <div class="stat-number">21</div>
                            <div class="stat-label">TẦNG</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">124</div>
                            <div class="stat-label">PHÒNG</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">5</div>
                            <div class="stat-label">SAO</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- About Section -->
            <section class="intro-about">
                <p class="about-text">
                    Link nằm trong trung tâm thành phố Vũng Tàu là một kiệt tác kiến trúc 
                    cung cấp chỗ ở đương đại với dịch vụ spa và đường đi bộ leo núi tuyệt vời.
                </p>
            </section>

            <!-- Image Gallery Grid -->
            <section class="intro-gallery">
                <div class="gallery-grid">
                    <div class="gallery-item large">
                        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200" alt="Resort">
                    </div>
                    <div class="gallery-item">
                        <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600" alt="Pool">
                    </div>
                    <div class="gallery-item">
                        <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600" alt="Beach">
                    </div>
                </div>
            </section>

            <!-- Holiday Paradise Section -->
            <section class="intro-paradise">
                <h2 class="section-title">THIÊN ĐƯỜNG NGHỈ DƯỠNG CỦA BẠN</h2>
                <div class="paradise-grid">
                    <div class="paradise-card">
                        <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600" alt="Activities">
                        <div class="paradise-overlay">
                            <h3>Hoạt động & Trải nghiệm</h3>
                        </div>
                    </div>
                    <div class="paradise-card">
                        <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600" alt="Adventure">
                        <div class="paradise-overlay">
                            <h3>Phiêu lưu & Thể thao</h3>
                        </div>
                    </div>
                    <div class="paradise-card">
                        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600" alt="Golf">
                        <h3 class="paradise-title-simple">Golf Course</h3>
                        <p class="paradise-subtitle">Sân golf</p>
                    </div>
                    <div class="paradise-card">
                        <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=600" alt="Snowboarding">
                        <div class="paradise-overlay">
                            <h3>Trượt tuyết</h3>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Essentials Section -->
            <section class="intro-essentials">
                <h2 class="section-title">TIỆN NGHI THIẾT YẾU</h2>
                <div class="essentials-wrapper">
                    <div class="essentials-list">
                        <div class="essential-item">
                            <i class="fas fa-wifi"></i>
                            <div>
                                <h4>Wifi tốc độ cao</h4>
                                <p>Kết nối internet tốc độ cao miễn phí trong toàn bộ khu nghỉ dưỡng</p>
                            </div>
                        </div>
                        <div class="essential-item">
                            <i class="fas fa-concierge-bell"></i>
                            <div>
                                <h4>Dịch vụ lễ tân</h4>
                                <p>Đội ngũ lễ tân chuyên nghiệp phục vụ 24/7</p>
                            </div>
                        </div>
                        <div class="essential-item">
                            <i class="fas fa-utensils"></i>
                            <div>
                                <h4>Nhà hàng & Quầy bar</h4>
                                <p>Trải nghiệm ẩm thực đa dạng với các món Âu - Á</p>
                            </div>
                        </div>
                        <div class="essential-item">
                            <i class="fas fa-mug-hot"></i>
                            <div>
                                <h4>Dịch vụ phòng</h4>
                                <p>Đồ ăn và thức uống được phục vụ tận phòng</p>
                            </div>
                        </div>
                        <div class="essential-item">
                            <i class="fas fa-bed"></i>
                            <div>
                                <h4>Giường & Chăn ga</h4>
                                <p>Ga trải giường cao cấp được thay hàng ngày</p>
                            </div>
                        </div>
                        <div class="essential-item">
                            <i class="fas fa-wine-glass"></i>
                            <div>
                                <h4>Đồ uống chào đón</h4>
                                <p>Cocktail chào mừng khi check-in</p>
                            </div>
                        </div>
                    </div>
                    <div class="essentials-images">
                        <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400" alt="Room amenities" class="essentials-img">
                        <img src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400" alt="Tea set" class="essentials-img">
                    </div>
                </div>
            </section>

            <!-- Location Section -->
            <section class="intro-location">
                <div class="location-content">
                    <h2 class="section-title">VỊ TRÍ ĐẮC ĐỊA</h2>
                    <p class="location-desc">Nằm ngay vị trí trung tâm thành phố, cách biển chỉ chưa đầy 2 phút đi bộ.</p>
                    <div class="location-grid">
                        <div class="location-item"><span>Quảng trường 2/4</span><strong>750m</strong></div>
                        <div class="location-item"><span>Nhà thờ đá</span><strong>3 km</strong></div>
                        <div class="location-item"><span>Chùa Long Sơn</span><strong>3.2 km</strong></div>
                        <div class="location-item"><span>Vinpearl</span><strong>4 km</strong></div>
                        <div class="location-item"><span>Tháp Bà Ponagar</span><strong>4.8 km</strong></div>
                        <div class="location-item"><span>Hòn chồng</span><strong>5.5 km</strong></div>
                    </div>
                </div>
            </section>

            <!-- CTA Footer -->
            <section class="intro-cta">
                <div class="cta-overlay"></div>
                <div class="cta-content">
                    <h2>Trải nghiệm vẻ đẹp núi non nơi giấc mơ trở thành hiện thực.</h2>
                    <p>Đắm chìm trong chất lượng khôi phục của thiên nhiên, xa rời sự ồn ào của cuộc sống hàng ngày.</p>
                    <button class="cta-button">Đặt phòng ngay</button>
                </div>
            </section>
        </div>
    `;
    
    elements.panelContent.innerHTML = html;
    
    // Attach event listeners for booking buttons
    import('./rooms.js').then(({ attachBookingButtonListeners }) => {
        attachBookingButtonListeners();
    });
}

// ===== Render Vouchers =====
export function renderVouchers() {
    const lang = state.currentLanguage;
    const vouchers = state.vouchers || [];
    
    const getBadgeColor = (color) => {
        const colors = {
            'primary': '#137fec',
            'blue': '#137fec',
            'sky': '#137fec',
            'rose': '#F43F5E'
        };
        return colors[color] || colors.primary;
    };
    
    const html = `
        <div class="vouchers-page-content">
            <!-- Header Section -->
            <div class="vouchers-header">
                <h1 class="vouchers-main-title">${lang === 'vi' ? 'Ưu Đãi Đặc Biệt & Voucher' : 'Special Offers & Vouchers'}</h1>
                <p class="vouchers-subtitle">
                    ${lang === 'vi' ? 'Khám phá các chương trình khuyến mãi độc quyền và voucher hấp dẫn để tận hưởng kỳ nghỉ của bạn tại khách sạn với chi phí tốt nhất.' : 'Discover exclusive promotions and attractive vouchers to enjoy your stay at our hotel with the best prices.'}
                </p>
            </div>

            <!-- Vouchers Grid -->
            <div class="vouchers-grid">
                ${vouchers.map(voucher => `
                    <div class="voucher-card">
                        <div class="voucher-card-image">
                            <img src="${voucher.image}" alt="${voucher.title[lang]}">
                            <div class="voucher-badge" style="background-color: ${getBadgeColor(voucher.badge.color)}">
                                ${voucher.badge.text[lang]}
                            </div>
                        </div>
                        <div class="voucher-card-content">
                            <h3 class="voucher-card-title">${voucher.title[lang]}</h3>
                            <p class="voucher-card-description">${voucher.description[lang]}</p>
                            
                            <div class="voucher-features">
                                ${voucher.features.map(feature => `
                                    <div class="voucher-feature-item">
                                        <i class="fas fa-${feature.icon}"></i>
                                        <span>${feature.text[lang]}</span>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <div class="voucher-countdown">
                                <p class="countdown-label">${lang === 'vi' ? 'Kết thúc trong' : 'Ends in'}</p>
                                <div class="countdown-timer">
                                    <div class="countdown-item">
                                        <span class="countdown-value">${String(voucher.expiryDays).padStart(2, '0')}</span>
                                        <span class="countdown-unit">${lang === 'vi' ? 'Ngày' : 'Days'}</span>
                                    </div>
                                    <div class="countdown-separator">:</div>
                                    <div class="countdown-item">
                                        <span class="countdown-value">${String(voucher.expiryHours).padStart(2, '0')}</span>
                                        <span class="countdown-unit">${lang === 'vi' ? 'Giờ' : 'Hours'}</span>
                                    </div>
                                    <div class="countdown-separator">:</div>
                                    <div class="countdown-item">
                                        <span class="countdown-value">${String(voucher.expiryMinutes).padStart(2, '0')}</span>
                                        <span class="countdown-unit">${lang === 'vi' ? 'Phút' : 'Minutes'}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <button class="voucher-claim-btn" data-code="${voucher.code}">
                                <i class="fa-solid fa-ticket"></i>
                                ${lang === 'vi' ? 'Lấy Mã Voucher' : 'Get Voucher Code'}
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    elements.panelContent.innerHTML = html;
    
    // Attach click handlers for voucher buttons
    document.querySelectorAll('.voucher-claim-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const code = e.currentTarget.dataset.code;
            copyVoucherCode(code);
        });
    });
}

// Copy voucher code to clipboard
function copyVoucherCode(code) {
    const lang = state.currentLanguage;
    
    // Copy to clipboard
    navigator.clipboard.writeText(code).then(() => {
        // Show success message
        showNotification(
            lang === 'vi' ? `Đã sao chép mã: ${code}` : `Copied code: ${code}`,
            'success'
        );
    }).catch(err => {
        console.error('Failed to copy:', err);
        showNotification(
            lang === 'vi' ? 'Không thể sao chép mã' : 'Failed to copy code',
            'error'
        );
    });
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification-toast notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Render Policies =====
export function renderPolicies() {
    const lang = state.currentLanguage;
    
    const html = `
        <div class="policies-page-content">
            <!-- Header Section -->
            <div class="policies-header">
                <h1 class="policies-main-title">${lang === 'vi' ? 'Chính Sách Của Khách Sạn' : 'Hotel Policies'}</h1>
                <p class="policies-subtitle">
                    ${lang === 'vi' ? 'Để đảm bảo trải nghiệm tốt nhất cho quý khách, vui lòng tham khảo các chính sách và quy định của chúng tôi dưới đây.' : 'To ensure the best experience for our guests, please review our policies and regulations below.'}
                </p>
            </div>

            <!-- Policy Cards Grid -->
            <div class="policies-grid-new">
                <!-- Check-in/Check-out -->
                <div class="policy-card-new">
                    <div class="policy-card-header">
                        <div class="policy-icon-circle">
                            <i class="fas fa-sign-in-alt"></i>
                        </div>
                        <h2 class="policy-card-title">${lang === 'vi' ? 'Nhận / Trả phòng' : 'Check-in / Check-out'}</h2>
                    </div>
                    <div class="policy-card-body">
                        <p><strong>${lang === 'vi' ? 'Giờ nhận phòng:' : 'Check-in time:'}</strong> ${lang === 'vi' ? 'sau 14:00' : 'after 2:00 PM'}</p>
                        <p><strong>${lang === 'vi' ? 'Giờ trả phòng:' : 'Check-out time:'}</strong> ${lang === 'vi' ? 'trước 12:00' : 'before 12:00 PM'}</p>
                        <p>${lang === 'vi' ? 'Nhận phòng sớm hoặc trả phòng muộn có thể được áp dụng phụ phí tùy theo tình trạng phòng trống.' : 'Early check-in or late check-out may incur additional charges depending on room availability.'}</p>
                    </div>
                </div>

                <!-- Cancellation -->
                <div class="policy-card-new">
                    <div class="policy-card-header">
                        <div class="policy-icon-circle">
                            <i class="fas fa-ban"></i>
                        </div>
                        <h2 class="policy-card-title">${lang === 'vi' ? 'Hủy phòng' : 'Cancellation'}</h2>
                    </div>
                    <div class="policy-card-body">
                        <p>${lang === 'vi' ? 'Miễn phí hủy nếu yêu cầu được thực hiện trước 7 ngày so với ngày nhận phòng.' : 'Free cancellation if requested 7 days before check-in date.'}</p>
                        <p>${lang === 'vi' ? 'Phí hủy phòng bằng 50% giá trị đặt phòng sẽ được áp dụng nếu hủy trong vòng 3-7 ngày.' : '50% cancellation fee applies if cancelled within 3-7 days.'}</p>
                        <p>${lang === 'vi' ? 'Không hoàn tiền nếu hủy trong vòng 72 giờ trước giờ nhận phòng.' : 'No refund if cancelled within 72 hours before check-in.'}</p>
                    </div>
                </div>

                <!-- Children -->
                <div class="policy-card-new">
                    <div class="policy-card-header">
                        <div class="policy-icon-circle">
                            <i class="fas fa-child"></i>
                        </div>
                        <h2 class="policy-card-title">${lang === 'vi' ? 'Trẻ em' : 'Children'}</h2>
                    </div>
                    <div class="policy-card-body">
                        <p>${lang === 'vi' ? 'Miễn phí cho tối đa 2 trẻ em dưới 6 tuổi ở chung phòng với bố mẹ và sử dụng giường sẵn có.' : 'Free for up to 2 children under 6 years old sharing room with parents using existing beds.'}</p>
                        <p>${lang === 'vi' ? 'Trẻ em từ 6 đến 11 tuổi sẽ được tính phụ phí ăn sáng.' : 'Children aged 6-11 will be charged breakfast supplement.'}</p>
                        <p>${lang === 'vi' ? 'Trẻ em từ 12 tuổi trở lên được tính như người lớn.' : 'Children 12 years and older are considered adults.'}</p>
                    </div>
                </div>

                <!-- Pets -->
                <div class="policy-card-new">
                    <div class="policy-card-header">
                        <div class="policy-icon-circle">
                            <i class="fas fa-paw"></i>
                        </div>
                        <h2 class="policy-card-title">${lang === 'vi' ? 'Vật nuôi' : 'Pets'}</h2>
                    </div>
                    <div class="policy-card-body">
                        <p>${lang === 'vi' ? 'Chúng tôi rất tiếc không thể tiếp nhận vật nuôi trong khuôn viên khách sạn để đảm bảo sự thoải mái và an toàn cho tất cả khách hàng.' : 'We regret that we cannot accommodate pets in the hotel premises to ensure comfort and safety for all guests.'}</p>
                    </div>
                </div>

                <!-- Smoking -->
                <div class="policy-card-new">
                    <div class="policy-card-header">
                        <div class="policy-icon-circle">
                            <i class="fas fa-smoking-ban"></i>
                        </div>
                        <h2 class="policy-card-title">${lang === 'vi' ? 'Hút thuốc' : 'Smoking'}</h2>
                    </div>
                    <div class="policy-card-body">
                        <p>${lang === 'vi' ? 'Tất cả các phòng và khu vực công cộng trong nhà đều là khu vực không hút thuốc. Quý khách có thể hút thuốc tại các khu vực ngoài trời được chỉ định.' : 'All rooms and indoor public areas are non-smoking. Guests may smoke in designated outdoor areas.'}</p>
                    </div>
                </div>

                <!-- General Rules -->
                <div class="policy-card-new">
                    <div class="policy-card-header">
                        <div class="policy-icon-circle">
                            <i class="fas fa-gavel"></i>
                        </div>
                        <h2 class="policy-card-title">${lang === 'vi' ? 'Quy định chung' : 'General Rules'}</h2>
                    </div>
                    <div class="policy-card-body">
                        <p>${lang === 'vi' ? 'Vui lòng xuất trình giấy tờ tùy thân hợp lệ (CMND/CCCD hoặc Hộ chiếu) khi làm thủ tục nhận phòng.' : 'Please present valid identification (ID card or passport) at check-in.'}</p>
                        <p>${lang === 'vi' ? 'Giữ im lặng và tôn trọng không gian chung, đặc biệt sau 22:00.' : 'Keep quiet and respect common spaces, especially after 10:00 PM.'}</p>
                    </div>
                </div>
            </div>

            <!-- Important Notice -->
            <div class="policies-notice-new">
                <div class="notice-icon-wrapper">
                    <i class="fas fa-info-circle"></i>
                </div>
                <div class="notice-content">
                    <h3 class="notice-title">${lang === 'vi' ? 'Lưu ý quan trọng' : 'Important Notice'}</h3>
                    <p class="notice-text">${lang === 'vi' ? 'Các chính sách trên có thể thay đổi mà không cần báo trước. Vui lòng liên hệ với lễ tân để biết thông tin chi tiết.' : 'The above policies are subject to change without prior notice. Please contact the reception for detailed information.'}</p>
                </div>
            </div>
        </div>
    `;
    
    elements.panelContent.innerHTML = html;
}

// ===== Render Contact =====
export function renderContact() {
    const lang = state.currentLanguage;
    const info = state.hotelData.hotelInfo;
    
    const html = `
        <div class="contact-page-content">
            <!-- Hero Section -->
            <div class="contact-header">
                <h1 class="contact-main-title">${lang === 'vi' ? 'Liên Hệ Với Chúng Tôi' : 'Contact Us'}</h1>
                <p class="contact-subtitle">
                    ${lang === 'vi' ? 'Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7' : 'We are always ready to assist you 24/7'}
                </p>
            </div>

            <!-- Contact Main Content -->
            <section class="contact-main">
                <div class="contact-layout">
                    <!-- Left: Contact Form -->
                    <div class="contact-form-wrapper">
                        <h2 class="contact-section-title">${lang === 'vi' ? 'Gửi tin nhắn' : 'Send us a message'}</h2>
                        <form class="contact-form" id="contactForm">
                            <div class="form-row">
                                <div class="form-group">
                                    <input type="text" placeholder="${lang === 'vi' ? 'Họ và tên' : 'Full Name'}" required>
                                </div>
                                <div class="form-group">
                                    <input type="email" placeholder="Email" required>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <input type="tel" placeholder="${lang === 'vi' ? 'Số điện thoại' : 'Phone Number'}" required>
                                </div>
                                <div class="form-group">
                                    <input type="text" placeholder="${lang === 'vi' ? 'Chủ đề' : 'Subject'}" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <textarea style="margin-bottom: 20px;" rows="6" placeholder="${lang === 'vi' ? 'Tin nhắn của bạn...' : 'Your message...'}" required></textarea>
                            </div>
                            <button type="submit" class="contact-submit-btn">
                                <i class="fas fa-paper-plane"></i>
                                ${lang === 'vi' ? 'Gửi tin nhắn' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    <!-- Right: Contact Info -->
                    <div class="contact-info-wrapper">
                        <h2 class="contact-section-title">${lang === 'vi' ? 'Thông tin liên hệ' : 'Contact Information'}</h2>
                        
                        <div class="contact-info-list">
                            <div class="contact-info-item">
                                <div class="contact-info-icon">
                                    <i class="fas fa-map-marker-alt"></i>
                                </div>
                                <div>
                                    <h4>${lang === 'vi' ? 'Địa chỉ' : 'Address'}</h4>
                                    <p>${info.address[lang]}</p>
                                </div>
                            </div>

                            <div class="contact-info-item">
                                <div class="contact-info-icon">
                                    <i class="fas fa-phone"></i>
                                </div>
                                <div>
                                    <h4>${lang === 'vi' ? 'Điện thoại' : 'Phone'}</h4>
                                    <p><a href="tel:${info.phone}">${info.phone}</a></p>
                                </div>
                            </div>

                            <div class="contact-info-item">
                                <div class="contact-info-icon">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <div>
                                    <h4>Email</h4>
                                    <p><a href="mailto:${info.email}">${info.email}</a></p>
                                </div>
                            </div>

                            <div class="contact-info-item">
                                <div class="contact-info-icon">
                                    <i class="fas fa-globe"></i>
                                </div>
                                <div>
                                    <h4>Website</h4>
                                    <p><a href="${info.website}" target="_blank">${info.website}</a></p>
                                </div>
                            </div>

                            <div class="contact-info-item">
                                <div class="contact-info-icon">
                                    <i class="fas fa-clock"></i>
                                </div>
                                <div>
                                    <h4>${lang === 'vi' ? 'Giờ làm việc' : 'Working Hours'}</h4>
                                    <p>${lang === 'vi' ? 'Lễ tân: 24/7' : 'Reception: 24/7'}</p>
                                    <p>${lang === 'vi' ? 'Check-in: ' + info.checkIn : 'Check-in: ' + info.checkIn}</p>
                                    <p>${lang === 'vi' ? 'Check-out: ' + info.checkOut : 'Check-out: ' + info.checkOut}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Social Media -->
                        <div class="contact-social">
                            <h4>${lang === 'vi' ? 'Kết nối với chúng tôi' : 'Connect with us'}</h4>
                            <div class="social-links">
                                <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                                <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Map Section -->
                <div class="contact-map-section">
                    <h2 class="contact-section-title center">${lang === 'vi' ? 'Vị trí của chúng tôi' : 'Our Location'}</h2>
                    <div class="contact-map">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.7472444638254!2d109.19445931533287!3d12.244606491406784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3170677811cc886f%3A0x5c4bbc0aa81edcb9!2zVHLhuqduIFBow7osIE5oYSBUcmFuZywgS2jDoW5oIEjDsmE!5e0!3m2!1svi!2s!4v1234567890123"
                            width="100%" 
                            height="450" 
                            style="border:0;" 
                            allowfullscreen="" 
                            loading="lazy">
                        </iframe>
                    </div>
                </div>
            </section>
        </div>
    `;
    
    elements.panelContent.innerHTML = html;
    
    // Add form submit handler
    setTimeout(() => {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert(lang === 'vi' ? 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.' : 'Thank you for contacting us! We will respond as soon as possible.');
                form.reset();
            });
        }
    }, 100);
}

// ===== Render Rules (Nội Quy) =====
export function renderRules() {
    const lang = state.currentLanguage;
    
    const rulesData = [
        {
            id: 'general',
            icon: 'fa-clock',
            title: { vi: 'Quy định chung', en: 'General Rules' },
            content: {
                vi: ['Giờ nhận phòng (check-in) là từ 14:00.', 'Giờ trả phòng (check-out) là trước 12:00 trưa.', 'Vui lòng xuất trình giấy tờ tùy thân hợp lệ khi làm thủ tục nhận phòng.'],
                en: ['Check-in time is from 2:00 PM.', 'Check-out time is before 12:00 PM.', 'Please present valid identification when checking in.']
            }
        },
        {
            id: 'security',
            icon: 'fa-shield',
            title: { vi: 'An ninh và An toàn', en: 'Security & Safety' },
            content: {
                vi: ['Khách tham quan phải được đăng ký tại quầy lễ tân.', 'Luôn khóa cửa phòng khi ra ngoài để đảm bảo an toàn cho tài sản cá nhân.', 'Hút thuốc chỉ được phép tại các khu vực quy định.'],
                en: ['Guests must register at the reception.', 'Always lock your room door when going out to ensure safety of personal belongings.', 'Smoking is only allowed in designated areas.']
            }
        },
        {
            id: 'noise',
            icon: 'fa-volume-mute',
            title: { vi: 'Tiếng ồn và Trật tự', en: 'Noise & Order' },
            content: {
                vi: ['Vui lòng giữ im lặng trong khoảng thời gian từ 22:00 đến 07:00 sáng.', 'Hạn chế gây ồn ào tại các khu vực chung như hành lang và sảnh.'],
                en: ['Please keep quiet between 10:00 PM and 7:00 AM.', 'Avoid making noise in common areas such as hallways and lobbies.']
            }
        },
        {
            id: 'facilities',
            icon: 'fa-swimming-pool',
            title: { vi: 'Sử dụng Tiện ích', en: 'Facilities Usage' },
            content: {
                vi: ['Hồ bơi và phòng gym hoạt động trong khung giờ quy định.', 'Vui lòng tuân thủ các hướng dẫn an toàn tại khu vực tiện ích.'],
                en: ['Pool and gym operate during designated hours.', 'Please follow safety guidelines in amenity areas.']
            }
        },
        {
            id: 'responsibility',
            icon: 'fa-user-shield',
            title: { vi: 'Trách nhiệm của Khách hàng', en: 'Guest Responsibility' },
            content: {
                vi: ['Khách hàng chịu trách nhiệm bồi thường cho bất kỳ thiệt hại nào đối với tài sản của khách sạn.', 'Khách sạn không chịu trách nhiệm đối với việc mất mát tài sản cá nhân.'],
                en: ['Guests are responsible for compensating any damage to hotel property.', 'The hotel is not responsible for loss of personal belongings.']
            }
        },
        {
            id: 'pets',
            icon: 'fa-paw',
            title: { vi: 'Chính sách Vật nuôi', en: 'Pet Policy' },
            content: {
                vi: ['Khách sạn chúng tôi không cho phép mang theo vật nuôi. Xin chân thành cảm ơn sự hợp tác của quý khách.'],
                en: ['Our hotel does not allow pets. Thank you for your understanding.']
            }
        }
    ];
    
    const html = `
        <div class="rules-page-content">
            <!-- Header Section -->
            <div class="rules-header">
                <h1 class="rules-main-title">${lang === 'vi' ? 'Nội Quy & Quy Định Khách Sạn' : 'Hotel Rules & Regulations'}</h1>
                <p class="rules-subtitle">
                    ${lang === 'vi' 
                        ? 'Để đảm bảo trải nghiệm tốt nhất cho tất cả khách hàng, chúng tôi rất mong quý khách vui lòng tuân thủ các quy định dưới đây.' 
                        : 'To ensure the best experience for all guests, we kindly ask you to follow the regulations below.'}
                </p>
            </div>

            <!-- Rules Accordion Grid -->
            <div class="rules-accordion-container">
                ${rulesData.map((rule, index) => `
                    <details class="rules-accordion-item" data-index="${index}">
                        <summary class="rules-accordion-summary">
                            <div class="rules-accordion-icon">
                                <i class="fas ${rule.icon}"></i>
                            </div>
                            <h3 class="rules-accordion-title">${rule.title[lang]}</h3>
                            <span class="rules-accordion-indicator">
                                <i class="fas fa-chevron-down"></i>
                            </span>
                        </summary>
                        <div class="rules-accordion-content">
                            <ul class="rules-accordion-list">
                                ${rule.content[lang].map(item => `
                                    <li class="rules-list-item">
                                        <span class="rules-list-icon"><i class="fas fa-check"></i></span>
                                        <span>${item}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </details>
                `).join('')}
            </div>

            <!-- Contact Section -->
            <div class="rules-contact-section">
                <h3 class="rules-contact-title">${lang === 'vi' ? 'Thông tin liên hệ' : 'Contact Information'}</h3>
                <p class="rules-contact-text">
                    ${lang === 'vi' 
                        ? 'Nếu có bất kỳ câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ quầy lễ tân bất cứ lúc nào. Chúng tôi luôn sẵn sàng phục vụ 24/7.' 
                        : 'If you have any questions or need assistance, please contact the reception at any time. We are always ready to serve 24/7.'}
                </p>
            </div>
        </div>
    `;
    
    elements.panelContent.innerHTML = html;
    
    // Add accordion animation handlers
    setTimeout(() => {
        addRulesAnimations();
    }, 100);
}

// Add animations to rules accordion
function addRulesAnimations() {
    const accordions = document.querySelectorAll('.rules-accordion-item');
    
    accordions.forEach(accordion => {
        const summary = accordion.querySelector('.rules-accordion-summary');
        const content = accordion.querySelector('.rules-accordion-content');
        const indicator = accordion.querySelector('.rules-accordion-indicator i');
        
        // Track open state
        let isOpen = false;
        
        summary.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (!isOpen) {
                // OPEN
                isOpen = true;
                accordion.setAttribute('open', '');
                
                // Calculate height
                const scrollHeight = content.scrollHeight;
                
                // Set to measured height
                content.style.maxHeight = scrollHeight + 'px';
                content.style.opacity = '1';
                indicator.style.transform = 'rotate(180deg)';
            } else {
                // CLOSE
                isOpen = false;
                
                // Collapse to 0
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
                indicator.style.transform = 'rotate(0deg)';
                
                // Remove open attribute after transition
                setTimeout(() => {
                    accordion.removeAttribute('open');
                }, 300);
            }
        });
    });
}

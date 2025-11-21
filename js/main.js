// ===== LINK HOTEL - VR360 SYSTEM =====

// ===== Global State =====
const state = {
    currentPage: 'rooms',
    currentLanguage: 'vi',
    vrViewer: null,
    hotelData: null,
    selectedRoom: null,
    vouchers: null
};

// ===== DOM Elements =====
const elements = {
    // Panels
    contentPanel: document.getElementById('contentPanel'),
    roomInfoPanel: document.getElementById('roomInfoPanel'),
    closePanel: document.getElementById('closePanel'),
    toggleRoomInfo: document.getElementById('toggleRoomInfo'),
    panelTitle: document.getElementById('panelTitle'),
    panelContent: document.getElementById('panelContent'),
    roomInfoTitle: document.getElementById('roomInfoTitle'),
    roomInfoContent: document.getElementById('roomInfoContent'),
    
    // Navigation
    navItems: document.querySelectorAll('.nav-item[data-page]'),
    
    // Search
    searchSection: document.getElementById('searchSection'),
    searchInput: document.getElementById('searchInput'),
    searchClearBtn: document.getElementById('searchClearBtn'),
    
    // Buttons
    btnBookRoom: document.getElementById('btnBookRoom'),
    fullscreenBtn: document.getElementById('fullscreenBtn'),
    toggleButtonsBtn: document.getElementById('toggleButtonsBtn'),
    
    // Language
    langBtns: document.querySelectorAll('.lang-btn'),
    
    // Modals
    bookingModal: document.getElementById('bookingModal'),
    successModal: document.getElementById('successModal'),
    closeBookingModal: document.getElementById('closeBookingModal'),
    closeSuccessModal: document.getElementById('closeSuccessModal'),
    cancelBooking: document.getElementById('cancelBooking'),
    
    // Booking Form
    bookingForm: document.getElementById('bookingForm'),
    bookingRoomImage: document.getElementById('bookingRoomImage'),
    bookingRoomName: document.getElementById('bookingRoomName'),
    bookingRoomPrice: document.getElementById('bookingRoomPrice'),
    checkInDate: document.getElementById('checkInDate'),
    checkOutDate: document.getElementById('checkOutDate'),
    numNights: document.getElementById('numNights'),
    roomTotal: document.getElementById('roomTotal'),
    taxFee: document.getElementById('taxFee'),
    grandTotal: document.getElementById('grandTotal')
};

// ===== Page Titles =====
const pageTitles = {
    vi: {
        introduction: 'GIỚI THIỆU LINK HOTEL',
        rooms: 'PHÒNG NGHỈ',
        dining: 'ẨM THỰC',
        facilities: 'TIỆN NGHI',
        policies: 'CHÍNH SÁCH',
        rules: 'NỘI QUY',
        contact: 'LIÊN HỆ'
    },
    en: {
        introduction: 'ABOUT LINK HOTEL',
        rooms: 'ROOMS',
        dining: 'DINING',
        facilities: 'FACILITIES',
        policies: 'POLICIES',
        rules: 'RULES',
        contact: 'CONTACT'
    }
};

// ===== VR360 Viewer Initialization =====
function initVRViewer() {
    try {
        console.log('🎬 Creating VR360 viewer...');
        
        // Ensure panorama div exists and is visible
        const panoramaDiv = document.getElementById('panorama');
        if (!panoramaDiv) {
            console.error('✖ #panorama element not found!');
            return;
        }
        
        console.log('✓ #panorama element found');
        console.log('📏 Panorama div size:', panoramaDiv.offsetWidth, 'x', panoramaDiv.offsetHeight);
        
        // Make sure panorama is visible
        panoramaDiv.style.display = 'block';
        panoramaDiv.style.visibility = 'visible';
        panoramaDiv.style.opacity = '1';
        
        state.vrViewer = pannellum.viewer('panorama', {
            type: 'equirectangular',
            panorama: 'https://pannellum.org/images/alma.jpg', // Default test panorama
            autoLoad: true,
            autoRotate: -2,
            showControls: false,
            showFullscreenCtrl: false,
            showZoomCtrl: false,
            mouseZoom: true,
            compass: true,
            hfov: 100,
            pitch: 0,
            yaw: 0,
            minHfov: 50,
            maxHfov: 120
        });
        
        console.log('✓ VR360 viewer initialized successfully!');
        console.log('🎯 You should see a test panorama now');
        
        // Check if viewer is working after 1 second
        setTimeout(() => {
            if (state.vrViewer) {
                console.log('✓ VR Viewer still alive after 1s');
            } else {
                console.error('✖ VR Viewer destroyed!');
            }
        }, 1000);
        
    } catch (error) {
        console.error('✖ Error initializing VR viewer:', error);
        console.log('🧐 Check if Pannellum library is loaded');
        console.log('🧐 Open Console to see full error stack');
    }
}

// ===== Load Hotel Data =====
async function loadHotelData() {
    try {
        showLoading();
        const response = await fetch('data/hotels.json');
        if (!response.ok) throw new Error('Failed to load hotel data');
        state.hotelData = await response.json();
        console.log('✓ Hotel data loaded:', state.hotelData);
        
        // Load vouchers data
        const vouchersResponse = await fetch('data/vouchers.json');
        if (vouchersResponse.ok) {
            const vouchersData = await vouchersResponse.json();
            state.vouchers = vouchersData.vouchers;
            console.log('✓ Vouchers data loaded:', state.vouchers);
        } else {
            console.warn('⚠ Vouchers data not found');
            state.vouchers = [];
        }
    } catch (error) {
        console.error('✖ Error loading hotel data:', error);
        showError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
        throw error;
    }
}

// ===== Initialize App =====
async function init() {
    try {
        // IMPORTANT: Init VR Viewer FIRST (không đợi data)
        console.log('🎬 Initializing VR Viewer...');
        initVRViewer();
        
        // Setup event listeners first
        setupEventListeners();
        
        // Then load hotel data
        try {
            console.log('Loading hotel data...');
            await loadHotelData();
            
            // Load default page
            loadPage('rooms');
            
            // NOTE: Don't auto-load panorama on init
            // Let user click on room to load panorama
            console.log('App initialized successfully!');
            console.log('Click on a room to view its VR panorama');
            
        } catch (error) {
            console.error('Warning: Could not load hotel data:', error);
            console.log('Tip: Make sure data/hotels.json exists');
            
            // Show error in panel but VR still works
            showError('Không thể tải dữ liệu khách sạn. Vui lòng kiểm tra file data/hotels.json');
        }
    } catch (error) {
        console.error('Critical error initializing app:', error);
    }
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Navigation
    elements.navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const page = e.currentTarget.dataset.page;
            handleNavClick(page);
        });
    });
    
    // Close panels
    elements.closePanel.addEventListener('click', closeContentPanel);
    
    // Toggle room info panel
    if (elements.toggleRoomInfo) {
        elements.toggleRoomInfo.addEventListener('click', toggleRoomInfoPanel);
    }
    
    // Search
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', handleSearch);
    }
    
    if (elements.searchClearBtn) {
        elements.searchClearBtn.addEventListener('click', clearSearch);
    }
    
    // Book room button in room-info-panel
    if (elements.btnBookRoom) {
        elements.btnBookRoom.addEventListener('click', () => {
            if (state.selectedRoom) {
                openNewBookingModal(state.selectedRoom);
            }
        });
    }
    
    // Fullscreen
    if (elements.fullscreenBtn) {
        elements.fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    // Toggle UI
    if (elements.toggleButtonsBtn) {
        elements.toggleButtonsBtn.addEventListener('click', toggleUI);
    }
    
    // Language
    elements.langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.currentTarget.dataset.lang;
            changeLanguage(lang);
        });
    });
    
    // Modal close buttons
    if (elements.closeBookingModal) {
        elements.closeBookingModal.addEventListener('click', closeBookingModal);
    }
    
    if (elements.closeSuccessModal) {
        elements.closeSuccessModal.addEventListener('click', closeSuccessModal);
    }
    
    if (elements.cancelBooking) {
        elements.cancelBooking.addEventListener('click', closeBookingModal);
    }
    
    // Booking form
    if (elements.bookingForm) {
        elements.bookingForm.addEventListener('submit', handleBookingSubmit);
    }
    
    // Date change for price calculation
    if (elements.checkInDate && elements.checkOutDate) {
        elements.checkInDate.addEventListener('change', calculateBookingPrice);
        elements.checkOutDate.addEventListener('change', calculateBookingPrice);
    }
    
    // Click outside to close panels
    document.addEventListener('click', (e) => {
        if (elements.contentPanel.classList.contains('active')) {
            const clickedOutside = !elements.contentPanel.contains(e.target) &&
                                 !e.target.closest('.nav-item[data-page]') &&
                                 !e.target.closest('.action-btn');
            if (clickedOutside) {
                // Uncomment to enable click-outside-to-close
                // closeContentPanel();
            }
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (elements.bookingModal.classList.contains('active')) {
                closeBookingModal();
            } else if (elements.successModal.classList.contains('active')) {
                closeSuccessModal();
            } else if (elements.roomInfoPanel.classList.contains('active')) {
                closeRoomInfoPanel();
            } else if (elements.contentPanel.classList.contains('active')) {
                closeContentPanel();
            }
        }
    });
}

// ===== Navigation Handler =====
function handleNavClick(page) {
    const clickedButton = Array.from(elements.navItems).find(
        item => item.dataset.page === page
    );
    
    // Đóng room-info-panel nếu đang mở (không tự động mở lại content panel)
    if (elements.roomInfoPanel.classList.contains('active')) {
        elements.roomInfoPanel.classList.remove('active');
        elements.roomInfoPanel.classList.remove('collapsed');
    }
    
    // Toggle if already active
    if (clickedButton && clickedButton.classList.contains('active') &&
        elements.contentPanel.classList.contains('active')) {
        closeContentPanel();
        clickedButton.classList.remove('active');
        return;
    }
    
    // Update active state
    elements.navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === page) {
            item.classList.add('active');
        }
    });
    
    loadPage(page);
    openContentPanel();
}

// ===== Load Page =====
function loadPage(page) {
    state.currentPage = page;
    
    // Update title
    elements.panelTitle.textContent = pageTitles[state.currentLanguage][page] || page;
    
    // Show/hide search based on page
    if (elements.searchSection) {
        elements.searchSection.style.display = (page === 'rooms' || page === 'dining') ? 'block' : 'none';
    }
    
    // Add/remove trang-duc class for introduction page
    if (page === 'introduction') {
        elements.contentPanel.classList.add('trang-duc');
    } else {
        elements.contentPanel.classList.remove('trang-duc');
    }
    
    // Render content based on page
    switch (page) {
        case 'introduction':
            renderIntroduction();
            break;
        case 'rooms':
            renderRooms();
            break;
        case 'dining':
            renderDining();
            break;
        case 'vouchers':
            renderVouchers();
            break;
        case 'facilities':
            renderFacilities();
            break;
        case 'policies':
            renderPolicies();
            break;
        case 'rules':
            renderRules();
            break;
        case 'contact':
            renderContact();
            break;
        default:
            showEmptyState();
    }
}

// ===== Render Introduction =====
function renderIntroduction() {
    const lang = state.currentLanguage;
    const info = state.hotelData.hotelInfo;
    
    const html = `
        <div class="intro-content">
            <!-- Hero Banner -->
            <section class="intro-hero-banner">
                <div class="hero-overlay"></div>
                <div class="hero-text">
                    <h1 class="hero-title">BOUTIQUE RESORT IN THE<br>HEART OF NHA TRANG</h1>
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
                    Link nằm trong trung tâm thành phố Nha Trang là một kiệt tác kiến trúc 
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
    attachBookingButtonListeners();
}

// ===== Render Rooms =====
function renderRooms(filteredRooms = null) {
    const rooms = filteredRooms || state.hotelData.rooms;
    
    if (!rooms || rooms.length === 0) {
        showEmptyState();
        return;
    }
    
    const html = `
        <div class="content-grid">
            ${rooms.map(room => createRoomCard(room)).join('')}
        </div>
    `;
    
    elements.panelContent.innerHTML = html;
    attachRoomCardListeners();
}

// ===== Create Room Card =====
function createRoomCard(room) {
    const lang = state.currentLanguage;
    const name = room.name[lang];
    const description = room.description[lang];
    const price = formatPrice(room.price, room.currency, lang);
    
    return `
        <div class="content-card" data-room-id="${room.id}">
            <div class="card-image">
                ${room.image ? 
                    `<img src="${room.image}" alt="${name}" 
                        onerror="this.parentElement.innerHTML='<span class=\\'card-placeholder\\'><i class=\\'fas fa-bed\\'></i></span>'">` 
                    : `<span class="card-placeholder"><i class="fas fa-bed"></i></span>`
                }
            </div>
            <div class="card-content">
                <h3 class="card-title">${name}</h3>
                <p class="card-description">${description}</p>
                
                <div class="card-meta">
                    <div class="card-meta-item">
                        <i class="fas fa-users"></i>
                        <span>${room.capacity} ${lang === 'vi' ? 'người' : 'guests'}</span>
                    </div>
                    <div class="card-meta-item">
                        <i class="fas fa-ruler-combined"></i>
                        <span>${room.size}</span>
                    </div>
                    <div class="card-meta-item">
                        <i class="fas fa-bed"></i>
                        <span>${room.bedType[lang]}</span>
                    </div>
                </div>
                
                <div class="card-footer">
                    <div class="card-price">
                        ${price}
                        <small>/${lang === 'vi' ? 'đêm' : 'night'}</small>
                    </div>
                    <button class="book-room-btn" data-room-id="${room.id}">
                        <i class="fas fa-calendar-check"></i>
                        ${lang === 'vi' ? 'Đặt phòng' : 'Book Now'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ===== Attach Room Card Listeners =====
function attachRoomCardListeners() {
    const cards = document.querySelectorAll('.content-card[data-room-id]');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open VR if clicking book button
            if (e.target.closest('.book-room-btn')) {
                return;
            }
            const roomId = e.currentTarget.dataset.roomId;
            handleRoomClick(roomId);
        });
    });
    
    // Attach booking button listeners
    const bookButtons = document.querySelectorAll('.book-room-btn');
    bookButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const roomId = e.currentTarget.dataset.roomId;
            const room = state.hotelData.rooms.find(r => r.id === roomId);
            if (room) {
                openNewBookingModal(room);
            }
        });
    });
}

// ===== Attach Booking Button Listeners =====
function attachBookingButtonListeners() {
    // Tìm tất cả các nút đặt phòng
    setTimeout(() => {
        const bookingButtons = document.querySelectorAll('.cta-button, .facilities-cta-button');
        
        bookingButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🎯 Booking button clicked - navigating to rooms');
                // Chuyển đến trang rooms
                handleNavClick('rooms');
            });
        });
    }, 100);
}

// ===== Handle Room Click =====
function handleRoomClick(roomId) {
    const room = state.hotelData.rooms.find(r => r.id === roomId);
    if (!room) return;
    
    state.selectedRoom = room;
    
    console.log('🏨 Room clicked:', room.name.vi);
    
    // Show VR title overlay
    const lang = state.currentLanguage;
    const roomName = room.name && typeof room.name === 'object' 
        ? room.name[lang] || room.name.vi 
        : room.name || '-';
    showVRTitleOverlay(roomName);
    
    // 1. Load VR panorama FIRST
    if (room.panoramaUrl) {
        loadVRPanorama(room);
    }
    
    // 2. Close content panel - FORCE
    console.log('🚪 Closing content panel...');
    closeContentPanel();
    
    // 3. Show room info panel with delay
    setTimeout(() => {
        console.log('📱 Opening room info panel...');
        renderRoomInfo(room);
        openRoomInfoPanel();
    }, 150);
}

// ===== Render Room Info =====
function renderRoomInfo(room) {
    const lang = state.currentLanguage;
    const amenitiesData = state.hotelData.amenities;
    
    elements.roomInfoTitle.textContent = room.name[lang];
    
    const html = `
        <div class="room-detail-section">
            <h4><i class="fas fa-info-circle"></i> ${lang === 'vi' ? 'Thông tin' : 'Information'}</h4>
            <p>${room.description[lang]}</p>
            
            <div class="room-specs">
                <div class="spec-item">
                    <i class="fas fa-users"></i>
                    <span>${room.capacity} ${lang === 'vi' ? 'người' : 'guests'}</span>
                </div>
                <div class="spec-item">
                    <i class="fas fa-ruler-combined"></i>
                    <span>${room.size}</span>
                </div>
                <div class="spec-item">
                    <i class="fas fa-bed"></i>
                    <span>${room.bedType[lang]}</span>
                </div>
                <div class="spec-item">
                    <i class="fas fa-mountain"></i>
                    <span>${room.view[lang]}</span>
                </div>
            </div>
        </div>
        
        <div class="room-detail-section">
            <h4><i class="fas fa-concierge-bell"></i> ${lang === 'vi' ? 'Tiện nghi' : 'Amenities'}</h4>
            <div class="amenities-grid">
                ${room.amenities.map(amenityId => {
                    const amenity = amenitiesData[amenityId];
                    if (!amenity) return '';
                    return `
                        <div class="amenity-item">
                            <i class="fas ${amenity.icon}"></i>
                            <span>${amenity.name[lang]}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
        
        <div class="room-detail-section">
            <h4><i class="fas fa-dollar-sign"></i> ${lang === 'vi' ? 'Giá phòng' : 'Price'}</h4>
            <div class="price-display">
                <span class="price-amount">${formatPrice(room.price, room.currency, lang)}</span>
                <span class="price-unit">/${lang === 'vi' ? 'đêm' : 'night'}</span>
            </div>
        </div>
    `;
    
    elements.roomInfoContent.innerHTML = html;
    addRoomInfoStyles();
}

// ===== Render Vouchers =====
function renderVouchers() {
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

// ===== Render Facilities =====
function renderFacilities() {
    const lang = state.currentLanguage;
    const facilities = state.hotelData.facilities;
    
    const html = `
        <div class="facilities-page-content">
            <!-- Hero Section -->
            <section class="facilities-hero">
                <div class="facilities-hero-overlay"></div>
                <div class="facilities-hero-text">
                    <h1>${lang === 'vi' ? 'TIỆN NGHI & DỊCH VỤ' : 'FACILITIES & SERVICES'}</h1>
                    <p>${lang === 'vi' ? 'Trải nghiệm các tiện nghi đẳng cấp 5 sao cho kỳ nghỉ hoàn hảo' : 'Experience world-class 5-star amenities for a perfect stay'}</p>
                </div>
            </section>

            <!-- Main Facilities Section -->
            <section class="facilities-main-section">
                <div class="facilities-intro">
                    <h2 class="facilities-section-title">${lang === 'vi' ? 'Tận hưởng trọn vẹn' : 'Enjoy the Full Experience'}</h2>
                    <p class="facilities-intro-text">
                        ${lang === 'vi' 
                            ? 'Link Hotel Nha Trang mang đến đầy đủ tiện nghi cao cấp và dịch vụ chuyên nghiệp, đảm bảo mọi khoảnh khắc lưu trú của bạn đều là những trải nghiệm đáng nhớ.' 
                            : 'Link Hotel Nha Trang offers premium amenities and professional services, ensuring every moment of your stay is a memorable experience.'}
                    </p>
                </div>

                <!-- Facilities Grid with Images -->
                <div class="facilities-showcase">
                    ${facilities.map((facility, index) => {
                        const images = [
                            'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800',
                            'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
                            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
                            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
                            'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
                            'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=800'
                        ];
                        const isEven = index % 2 === 0;
                        
                        return `
                        <div class="facility-showcase-item ${isEven ? 'reverse' : ''}">
                            <div class="facility-showcase-image">
                                <img src="${images[index] || images[0]}" alt="${facility.name[lang]}">
                                <div class="facility-image-overlay"></div>
                            </div>
                            <div class="facility-showcase-content">
                                <div class="facility-icon-large">
                                    <i class="fas ${facility.icon}"></i>
                                </div>
                                <h3 class="facility-showcase-title">${facility.name[lang]}</h3>
                                <p class="facility-showcase-desc">${facility.description[lang]}</p>
                                <div class="facility-features">
                                    <span class="facility-feature">
                                        <i class="fas fa-check-circle"></i>
                                        ${lang === 'vi' ? 'Mở cửa 24/7' : 'Open 24/7'}
                                    </span>
                                    <span class="facility-feature">
                                        <i class="fas fa-check-circle"></i>
                                        ${lang === 'vi' ? 'Miễn phí' : 'Free Access'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
            </section>

            <!-- Additional Services Section -->
            <section class="additional-services">
                <h2 class="facilities-section-title center">${lang === 'vi' ? 'Dịch vụ bổ sung' : 'Additional Services'}</h2>
                <div class="services-grid">
                    <div class="service-card">
                        <i class="fas fa-concierge-bell"></i>
                        <h4>${lang === 'vi' ? 'Dịch vụ phòng' : 'Room Service'}</h4>
                        <p>${lang === 'vi' ? 'Phục vụ 24/7' : 'Available 24/7'}</p>
                    </div>
                    <div class="service-card">
                        <i class="fas fa-car"></i>
                        <h4>${lang === 'vi' ? 'Đưa đón sân bay' : 'Airport Transfer'}</h4>
                        <p>${lang === 'vi' ? 'Xe sang trọng' : 'Luxury vehicles'}</p>
                    </div>
                    <div class="service-card">
                        <i class="fas fa-tshirt"></i>
                        <h4>${lang === 'vi' ? 'Giặt ủi' : 'Laundry'}</h4>
                        <p>${lang === 'vi' ? 'Dịch vụ cao cấp' : 'Premium service'}</p>
                    </div>
                    <div class="service-card">
                        <i class="fas fa-baby"></i>
                        <h4>${lang === 'vi' ? 'Dịch vụ trông trẻ' : 'Babysitting'}</h4>
                        <p>${lang === 'vi' ? 'Chuyên nghiệp' : 'Professional care'}</p>
                    </div>
                    <div class="service-card">
                        <i class="fas fa-briefcase"></i>
                        <h4>${lang === 'vi' ? 'Trung tâm kinh doanh' : 'Business Center'}</h4>
                        <p>${lang === 'vi' ? 'Tiện nghi đầy đủ' : 'Fully equipped'}</p>
                    </div>
                    <div class="service-card">
                        <i class="fas fa-wifi"></i>
                        <h4>WiFi</h4>
                        <p>${lang === 'vi' ? 'Tốc độ cao, miễn phí' : 'High-speed, free'}</p>
                    </div>
                </div>
            </section>

            <!-- CTA Section -->
            <section class="facilities-cta">
                <div class="facilities-cta-overlay"></div>
                <div class="facilities-cta-content">
                    <h2>${lang === 'vi' ? 'Sẵn sàng trải nghiệm?' : 'Ready to Experience?'}</h2>
                    <p>${lang === 'vi' ? 'Đặt phòng ngay hôm nay để tận hưởng những tiện nghi tuyệt vời của chúng tôi' : 'Book now to enjoy our amazing facilities'}</p>
                    <button class="facilities-cta-button">
                        <i class="fas fa-calendar-check"></i>
                        ${lang === 'vi' ? 'Đặt phòng ngay' : 'Book Now'}
                    </button>
                </div>
            </section>
        </div>
    `;
    
    elements.panelContent.innerHTML = html;
    
    // Attach event listeners for booking buttons
    attachBookingButtonListeners();
}

// ===== Render Policies =====
function renderPolicies() {
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
function renderContact() {
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
function renderRules() {
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
                }, 350);
            }
        });
    });
}

// ===== Search Handler =====
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    // Show/hide clear button
    if (elements.searchClearBtn) {
        elements.searchClearBtn.style.display = query ? 'flex' : 'none';
    }
    
    if (state.currentPage === 'rooms') {
        const allRooms = state.hotelData.rooms;
        
        if (!query) {
            renderRooms(allRooms);
            return;
        }
        
        const filteredRooms = allRooms.filter(room => {
            const nameVi = room.name.vi.toLowerCase();
            const nameEn = room.name.en.toLowerCase();
            const descVi = room.description.vi.toLowerCase();
            const descEn = room.description.en.toLowerCase();
            
            return nameVi.includes(query) || nameEn.includes(query) ||
                   descVi.includes(query) || descEn.includes(query);
        });
        
        renderRooms(filteredRooms);
    } else if (state.currentPage === 'dining') {
        const allRestaurants = state.hotelData.restaurants;
        
        if (!query) {
            renderDining(allRestaurants);
            return;
        }
        
        const filteredRestaurants = allRestaurants.filter(restaurant => {
            const nameVi = restaurant.name.vi.toLowerCase();
            const nameEn = restaurant.name.en.toLowerCase();
            const descVi = restaurant.description.vi.toLowerCase();
            const descEn = restaurant.description.en.toLowerCase();
            const cuisineVi = restaurant.cuisine.vi.toLowerCase();
            const cuisineEn = restaurant.cuisine.en.toLowerCase();
            
            return nameVi.includes(query) || nameEn.includes(query) ||
                   descVi.includes(query) || descEn.includes(query) ||
                   cuisineVi.includes(query) || cuisineEn.includes(query);
        });
        
        renderDining(filteredRestaurants);
    }
}

// ===== Show VR Title Overlay =====
function showVRTitleOverlay(title) {
    const overlay = document.getElementById('vrTitleOverlay');
    const titleText = document.getElementById('vrTitleText');
    
    if (overlay && titleText) {
        titleText.textContent = title;
        overlay.style.display = 'flex';
    }
}

// ===== Hide VR Title Overlay =====
function hideVRTitleOverlay() {
    const overlay = document.getElementById('vrTitleOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// ===== Clear Search =====
function clearSearch() {
    if (elements.searchInput) {
        elements.searchInput.value = '';
        elements.searchClearBtn.style.display = 'none';
        handleSearch({ target: elements.searchInput });
    }
}

// ===== Load VR Panorama =====
function loadVRPanorama(item) {
    try {
        if (!item || !item.panoramaUrl) {
            console.warn('No panorama URL provided');
            return;
        }
        
        console.log(`Loading panorama: ${item.name ? item.name.vi : item.panoramaUrl}`);
        
        // IMPORTANT: Don't use loadScene() - it has bugs
        // Instead, destroy and recreate viewer
        
        // Destroy old viewer
        if (state.vrViewer) {
            console.log('Destroying old viewer...');
            try {
                state.vrViewer.destroy();
            } catch (e) {
                console.warn('Warning destroying viewer:', e);
            }
            state.vrViewer = null;
        }
        
        // Small delay to ensure cleanup
        setTimeout(() => {
            try {
                // Create new viewer with new panorama
                console.log('Creating new viewer with panorama...');
                state.vrViewer = pannellum.viewer('panorama', {
                    type: 'equirectangular',
                    panorama: item.panoramaUrl,
                    autoLoad: true,
                    autoRotate: -2,
                    showControls: false,
                    showFullscreenCtrl: false,
                    showZoomCtrl: false,
                    mouseZoom: true,
                    compass: true,
                    hfov: item.hfov || 100,
                    pitch: item.pitch || 0,
                    yaw: item.yaw || 0,
                    minHfov: 50,
                    maxHfov: 120
                });
                
                console.log(`✓ Loaded panorama successfully!`);
            } catch (error) {
                console.error('✖ Error creating new viewer:', error);
            }
        }, 100);
        
    } catch (error) {
        console.error('✖ Error loading panorama:', error);
    }
}

// ===== Booking Modal =====
function openBookingModal() {
    if (!state.selectedRoom) return;
    
    const lang = state.currentLanguage;
    const room = state.selectedRoom;
    
    // Fill booking summary
    elements.bookingRoomImage.src = room.image || '';
    elements.bookingRoomName.textContent = room.name[lang];
    elements.bookingRoomPrice.textContent = formatPrice(room.price, room.currency, lang);
    
    // Set default dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    elements.checkInDate.value = formatDateInput(today);
    elements.checkOutDate.value = formatDateInput(tomorrow);
    elements.checkInDate.min = formatDateInput(today);
    
    calculateBookingPrice();
    
    elements.bookingModal.classList.add('active');
}

function closeBookingModal() {
    elements.bookingModal.classList.remove('active');
    elements.bookingForm.reset();
}

function closeSuccessModal() {
    elements.successModal.classList.remove('active');
}

// ===== Calculate Booking Price =====
function calculateBookingPrice() {
    if (!state.selectedRoom) return;
    
    const checkIn = new Date(elements.checkInDate.value);
    const checkOut = new Date(elements.checkOutDate.value);
    
    if (checkIn >= checkOut) {
        elements.checkOutDate.value = '';
        return;
    }
    
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const roomPrice = state.selectedRoom.price;
    const roomTotal = roomPrice * nights;
    const tax = roomTotal * 0.1; // 10% tax
    const total = roomTotal + tax;
    
    const lang = state.currentLanguage;
    const currency = state.selectedRoom.currency;
    
    elements.numNights.textContent = nights;
    elements.roomTotal.textContent = formatPrice(roomTotal, currency, lang);
    elements.taxFee.textContent = formatPrice(tax, currency, lang);
    elements.grandTotal.textContent = formatPrice(total, currency, lang);
}

// ===== Handle Booking Submit =====
function handleBookingSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(elements.bookingForm);
    const bookingData = Object.fromEntries(formData.entries());
    
    console.log('📝 Booking data:', bookingData);
    
    // Close booking modal
    closeBookingModal();
    
    // Show success modal
    setTimeout(() => {
        elements.successModal.classList.add('active');
    }, 300);
}

// ===== Format Price =====
function formatPrice(price, currency, lang) {
    if (currency === 'VND' || lang === 'vi') {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0
        }).format(price);
    } else {
        const usdPrice = price / 24000;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(usdPrice);
    }
}

// ===== Format Date for Input =====
function formatDateInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// ===== Language Change =====
function changeLanguage(lang) {
    state.currentLanguage = lang;
    
    elements.langBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update title
    elements.panelTitle.textContent = pageTitles[lang][state.currentPage];
    
    // Reload current page
    loadPage(state.currentPage);
    
    // Update room info if open
    if (state.selectedRoom && elements.roomInfoPanel.classList.contains('active')) {
        renderRoomInfo(state.selectedRoom);
    }
}

// ===== Panel Controls =====
function openContentPanel() {
    elements.contentPanel.classList.add('active');
}

function closeContentPanel() {
    elements.contentPanel.classList.remove('active');
    hideVRTitleOverlay();
    console.log('✓ Content panel closed');
}

function openRoomInfoPanel() {
    elements.roomInfoPanel.classList.add('active');
    elements.roomInfoPanel.classList.remove('collapsed');
    console.log('✓ Room info panel opened');
}

function closeRoomInfoPanel() {
    elements.roomInfoPanel.classList.remove('active');
    elements.roomInfoPanel.classList.remove('collapsed');
    console.log('✓ Room info panel closed');
    
    // Show content panel again when closing room info (if on rooms page)
    if (state.currentPage === 'rooms') {
        setTimeout(() => {
            openContentPanel();
        }, 300);
    }
}

function toggleRoomInfoPanel() {
    elements.roomInfoPanel.classList.toggle('collapsed');
    const icon = elements.toggleRoomInfo.querySelector('i');
    
    if (elements.roomInfoPanel.classList.contains('collapsed')) {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    } else {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    }
}

// ===== Fullscreen =====
function toggleFullscreen() {
    const elem = document.documentElement;
    
    if (!document.fullscreenElement && !document.webkitFullscreenElement &&
        !document.mozFullScreenElement && !document.msFullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

function handleFullscreenChange() {
    const isFullscreen = !!(document.fullscreenElement ||
                           document.webkitFullscreenElement ||
                           document.mozFullScreenElement ||
                           document.msFullscreenElement);
    
    const icon = elements.fullscreenBtn.querySelector('i');
    if (icon) {
        icon.className = isFullscreen ? 'fa-solid fa-compress' : 'fa-solid fa-expand';
    }
}

// ===== Toggle UI =====
function toggleUI() {
    document.body.classList.toggle('ui-hidden');
    
    const icon = elements.toggleButtonsBtn.querySelector('i');
    if (icon) {
        icon.className = document.body.classList.contains('ui-hidden') ? 
            'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
    }
    
    // Hide room info panel when toggling UI
    if (elements.roomInfoPanel) {
        elements.roomInfoPanel.classList.remove('active');
        elements.roomInfoPanel.classList.remove('collapsed');
    }
}

// ===== UI States =====
function showLoading() {
    elements.panelContent.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Đang tải dữ liệu...</p>
        </div>
    `;
}

function showEmptyState() {
    const lang = state.currentLanguage;
    const messages = {
        vi: {
            title: 'Không có dữ liệu',
            description: 'Không tìm thấy kết quả nào phù hợp.'
        },
        en: {
            title: 'No Data',
            description: 'No matching results found.'
        }
    };
    
    elements.panelContent.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-inbox"></i>
            <h3>${messages[lang].title}</h3>
            <p>${messages[lang].description}</p>
        </div>
    `;
}

function showError(message) {
    elements.panelContent.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Error</h3>
            <p>${message}</p>
        </div>
    `;
}

// ===== Add Inline Styles =====
function addIntroStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .intro-content { padding: 20px; }
        .intro-header { text-align: center; margin-bottom: 30px; }
        .intro-logo { max-width: 200px; margin-bottom: 20px; }
        .intro-header h1 { font-size: 28px; font-weight: 700; color: white; margin-bottom: 10px; }
        .intro-description { margin-bottom: 30px; }
        .intro-description p { font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.9); }
        .intro-details { display: grid; gap: 20px; }
        .detail-item { display: flex; gap: 15px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 12px; }
        .detail-item i { font-size: 24px; color: var(--accent-color); margin-top: 5px; }
        .detail-item strong { display: block; color: white; margin-bottom: 5px; }
        .detail-item p { color: rgba(255,255,255,0.8); margin: 0; }
        .detail-item a { color: var(--accent-color); text-decoration: none; }
        .detail-item a:hover { text-decoration: underline; }
    `;
    document.head.appendChild(style);
}

function addRoomInfoStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .room-specs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 15px; }
        .spec-item { display: flex; align-items: center; gap: 8px; padding: 10px; background: rgba(33,150,243,0.05); border-radius: 8px; font-size: 14px; }
        .spec-item i { color: var(--primary-color); }
        .price-display { display: flex; align-items: baseline; gap: 5px; }
        .price-amount { font-size: 24px; font-weight: 700; color: var(--primary-color); }
        .price-unit { font-size: 14px; color: white; }
    `;
    document.head.appendChild(style);
}

// ===== Render Dining (Ẩm Thực) =====
function renderDining(filteredRestaurants = null) {
    const restaurants = filteredRestaurants || state.hotelData.restaurants;
    
    if (!restaurants || restaurants.length === 0) {
        showEmptyState();
        return;
    }
    
    const html = `
        <div class="content-grid">
            ${restaurants.map(restaurant => createRestaurantCard(restaurant)).join('')}
        </div>
    `;
    
    elements.panelContent.innerHTML = html;
    attachRestaurantCardListeners();
}

// ===== Create Restaurant Card =====
function createRestaurantCard(restaurant) {
    const lang = state.currentLanguage;
    const name = restaurant.name[lang];
    const description = restaurant.description[lang];
    const location = restaurant.location[lang];
    const cuisine = restaurant.cuisine[lang];
    
    return `
        <div class="content-card" data-restaurant-id="${restaurant.id}">
            <div class="card-image">
                ${restaurant.image ? 
                    `<img src="${restaurant.image}" alt="${name}" 
                        onerror="this.parentElement.innerHTML='<span class=\\'card-placeholder\\'><i class=\\'fas fa-utensils\\'></i></span>'">` 
                    : `<span class="card-placeholder"><i class="fas fa-utensils"></i></span>`
                }
            </div>
            <div class="card-content">
                <h3 class="card-title">${name}</h3>
                <p class="card-description">${description}</p>
                
                <div class="card-meta">
                    <div class="card-meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${location}</span>
                    </div>
                    <div class="card-meta-item">
                        <i class="fas fa-utensils"></i>
                        <span>${cuisine}</span>
                    </div>
                    <div class="card-meta-item">
                        <i class="fas fa-users"></i>
                        <span>${restaurant.capacity} ${lang === 'vi' ? 'chỗ ngồi' : 'seats'}</span>
                    </div>
                </div>
                
                <div class="card-footer dining-footer">
                    <div class="dining-hours">
                        <i class="fas fa-clock"></i>
                        <small>${restaurant.openingHours[lang]}</small>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===== Attach Restaurant Card Listeners =====
function attachRestaurantCardListeners() {
    const cards = document.querySelectorAll('.content-card[data-restaurant-id]');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            const restaurantId = e.currentTarget.dataset.restaurantId;
            handleRestaurantClick(restaurantId);
        });
    });
}

// ===== Handle Restaurant Click =====
function handleRestaurantClick(restaurantId) {
    const restaurant = state.hotelData.restaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;
    
    state.selectedRoom = restaurant; // Reuse selectedRoom state for restaurant
    
    console.log('🍽️ Restaurant clicked:', restaurant.name.vi);
    
    // Show VR title overlay
    const lang = state.currentLanguage;
    const restaurantName = restaurant.name && typeof restaurant.name === 'object' 
        ? restaurant.name[lang] || restaurant.name.vi 
        : restaurant.name || '-';
    showVRTitleOverlay(restaurantName);
    
    // 1. Load VR panorama FIRST
    if (restaurant.panoramaUrl) {
        loadVRPanorama(restaurant);
    }
    
    // 2. Close content panel - FORCE
    console.log('🚪 Closing content panel...');
    closeContentPanel();
    
    // 3. Show restaurant info panel with delay
    setTimeout(() => {
        console.log('📱 Opening restaurant info panel...');
        renderRestaurantInfo(restaurant);
        openRoomInfoPanel();
    }, 150);
}

// ===== Render Restaurant Info =====
function renderRestaurantInfo(restaurant) {
    const lang = state.currentLanguage;
    
    elements.roomInfoTitle.textContent = restaurant.name[lang];
    
    const html = `
        <div class="room-detail-section">
            <h4><i class="fas fa-info-circle"></i> ${lang === 'vi' ? 'Giới thiệu' : 'Introduction'}</h4>
            <p>${restaurant.description[lang]}</p>
            
            <div class="room-specs">
                <div class="spec-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${restaurant.location[lang]}</span>
                </div>
                <div class="spec-item">
                    <i class="fas fa-utensils"></i>
                    <span>${restaurant.cuisine[lang]}</span>
                </div>
                <div class="spec-item">
                    <i class="fas fa-users"></i>
                    <span>${restaurant.capacity} ${lang === 'vi' ? 'chỗ ngồi' : 'seats'}</span>
                </div>
                <div class="spec-item">
                    <i class="fas fa-clock"></i>
                    <span>${restaurant.openingHours[lang]}</span>
                </div>
            </div>
        </div>
        
        <div class="room-detail-section">
            <h4><i class="fas fa-concierge-bell"></i> ${lang === 'vi' ? 'Dịch vụ' : 'Services'}</h4>
            <p>${restaurant.services[lang]}</p>
        </div>
    `;
    
    elements.roomInfoContent.innerHTML = html;
    addRoomInfoStyles();
}

function addFacilitiesStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .facilities-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; padding: 20px; }
        .facility-card { background: rgba(255,255,255,0.95); padding: 25px; border-radius: 16px; text-align: center; transition: var(--transition); }
        .facility-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.2); }
        .facility-icon { width: 60px; height: 60px; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; }
        .facility-icon i { font-size: 28px; color: white; }
        .facility-card h3 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin-bottom: 10px; }
        .facility-card p { font-size: 14px; color: var(--text-secondary); line-height: 1.6; }
    `;
    document.head.appendChild(style);
}

function addPoliciesStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .policies-list { display: grid; gap: 20px; padding: 20px; }
        .policy-item { display: flex; gap: 20px; padding: 20px; background: rgba(255,255,255,0.95); border-radius: 16px; transition: var(--transition); }
        .policy-item:hover { transform: translateX(5px); box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .policy-icon { width: 50px; height: 50px; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .policy-icon i { font-size: 24px; color: white; }
        .policy-content h3 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin-bottom: 10px; }
        .policy-content p { font-size: 14px; color: var(--text-secondary); line-height: 1.6; }
    `;
    document.head.appendChild(style);
}

function addContactStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .contact-content { display: grid; gap: 20px; padding: 20px; }
        .contact-info { padding: 20px; background: rgba(255,255,255,0.95); border-radius: 16px; }
        .contact-info h3 { font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
        .contact-info h3 i { color: var(--primary-color); }
        .contact-info p { font-size: 15px; color: var(--text-secondary); margin: 0; }
        .contact-info a { color: var(--primary-color); text-decoration: none; }
        .contact-info a:hover { text-decoration: underline; }
        .contact-map { padding: 20px; background: rgba(255,255,255,0.95); border-radius: 16px; }
        .map-placeholder { height: 300px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; }
        .map-placeholder i { font-size: 64px; margin-bottom: 15px; opacity: 0.8; }
        .map-placeholder p { font-size: 18px; font-weight: 600; }
    `;
    document.head.appendChild(style);
}

// ===== Start Application =====
document.addEventListener('DOMContentLoaded', init);

// ===== NEW BOOKING MODAL SYSTEM =====
const newBookingState = {
    selectedRoom: null,
    guestCount: 2,
    startDate: null,
    endDate: null,
    nightsCount: 0,
    paymentMethod: 'cash',
    roomPrice: 0,
    serviceFee: 100000,
    voucherCode: null,
    discount: 0
};

// Initialize new booking modal
function initNewBookingModal() {
    const newBookingModal = document.getElementById('newBookingModal');
    const closeBtn = document.getElementById('closeNewBookingModal');
    const decreaseBtn = document.getElementById('decreaseGuests');
    const increaseBtn = document.getElementById('increaseGuests');
    const submitBtn = document.getElementById('newBookingSubmit');
    const applyVoucherBtn = document.getElementById('applyVoucherBtn');
    const qrModal = document.getElementById('qrPaymentModal');
    const successModal = document.getElementById('bookingSuccessModal');
    const closeSuccessBtn = document.getElementById('closeSuccessVoucher');
    const backToHomeBtn = document.getElementById('backToHome');
    
    // Close modal handlers
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            newBookingModal.style.display = 'none';
        });
    }
    
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', () => {
            successModal.style.display = 'none';
        });
    }
    
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', () => {
            successModal.style.display = 'none';
            closeContentPanel();
        });
    }
    
    // Guest counter
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            if (newBookingState.guestCount > 1) {
                newBookingState.guestCount--;
                document.getElementById('guestCount').textContent = newBookingState.guestCount;
            }
        });
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            if (newBookingState.guestCount < 10) {
                newBookingState.guestCount++;
                document.getElementById('guestCount').textContent = newBookingState.guestCount;
            }
        });
    }
    
    // Payment method selection
    document.querySelectorAll('.new-payment-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.new-payment-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            newBookingState.paymentMethod = radio.value;
        });
    });
    
    // Apply voucher
    if (applyVoucherBtn) {
        applyVoucherBtn.addEventListener('click', handleApplyVoucher);
    }
    
    // Submit booking
    if (submitBtn) {
        submitBtn.addEventListener('click', handleNewBookingSubmit);
    }
    
    // Initialize calendar
    generateCalendar();
}

// Handle apply voucher
async function handleApplyVoucher() {
    const voucherInput = document.getElementById('voucherInput');
    const voucherMessage = document.getElementById('voucherMessage');
    const code = voucherInput.value.trim().toUpperCase();
    
    if (!code) {
        voucherMessage.textContent = 'Vui lòng nhập mã voucher';
        voucherMessage.className = 'voucher-message error';
        return;
    }
    
    // Find voucher in state
    const voucher = state.vouchers.find(v => v.code.toUpperCase() === code && v.active);
    
    if (!voucher) {
        voucherMessage.textContent = 'Mã voucher không hợp lệ';
        voucherMessage.className = 'voucher-message error';
        newBookingState.voucherCode = null;
        newBookingState.discount = 0;
        updatePriceSummary();
        return;
    }
    
    // Check minimum nights
    if (newBookingState.nightsCount < voucher.minNights) {
        voucherMessage.textContent = `Voucher này yêu cầu đặt tối thiểu ${voucher.minNights} đêm`;
        voucherMessage.className = 'voucher-message error';
        newBookingState.voucherCode = null;
        newBookingState.discount = 0;
        updatePriceSummary();
        return;
    }
    
    // Calculate discount
    const totalBeforeDiscount = newBookingState.roomPrice * newBookingState.nightsCount + newBookingState.serviceFee;
    let discountAmount = 0;
    
    if (voucher.discountType === 'percent') {
        discountAmount = (totalBeforeDiscount * voucher.discount) / 100;
    } else if (voucher.discountType === 'fixed') {
        discountAmount = voucher.discount;
    }
    
    // Apply voucher
    newBookingState.voucherCode = code;
    newBookingState.discount = discountAmount;
    
    const lang = state.currentLanguage;
    voucherMessage.textContent = `✓ Áp dụng thành công! Giảm ${formatCurrency(discountAmount)}`;
    voucherMessage.className = 'voucher-message success';
    
    updatePriceSummary();
}

// Generate calendar
function generateCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    if (!calendarDays) return;
    
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    // Get first day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    // Generate calendar HTML
    let html = '';
    
    // Add previous month days
    for (let i = 0; i < startDayOfWeek; i++) {
        html += '<div class="cal-day disabled">-</div>';
    }
    
    // Add current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(year, month, day);
        const isPast = dateObj < today.setHours(0, 0, 0, 0);
        const dayClass = isPast ? 'cal-day disabled' : 'cal-day';
        html += `<div class="${dayClass}" data-date="${year}-${month + 1}-${day}">${day}</div>`;
    }
    
    calendarDays.innerHTML = html;
    
    // Add click handlers for calendar days
    document.querySelectorAll('.cal-day:not(.disabled)').forEach(day => {
        day.addEventListener('click', function() {
            handleDateSelection(this);
        });
    });
}

// Handle date selection
function handleDateSelection(dayElement) {
    const dateStr = dayElement.getAttribute('data-date');
    const [year, month, day] = dateStr.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);
    
    if (!newBookingState.startDate || (newBookingState.startDate && newBookingState.endDate)) {
        // Start new selection
        newBookingState.startDate = selectedDate;
        newBookingState.endDate = null;
        updateCalendarDisplay();
    } else if (selectedDate > newBookingState.startDate) {
        // Set end date
        newBookingState.endDate = selectedDate;
        updateCalendarDisplay();
        calculateNights();
        updatePriceSummary();
    } else {
        // Reset if selected date is before start date
        newBookingState.startDate = selectedDate;
        newBookingState.endDate = null;
        updateCalendarDisplay();
    }
}

// Update calendar display
function updateCalendarDisplay() {
    document.querySelectorAll('.cal-day').forEach(day => {
        day.classList.remove('in-range', 'start-date', 'end-date', 'single');
    });
    
    if (!newBookingState.startDate) return;
    
    const startDateStr = `${newBookingState.startDate.getFullYear()}-${newBookingState.startDate.getMonth() + 1}-${newBookingState.startDate.getDate()}`;
    const startElement = document.querySelector(`.cal-day[data-date="${startDateStr}"]`);
    
    if (startElement) {
        if (newBookingState.endDate) {
            startElement.classList.add('start-date');
            const endDateStr = `${newBookingState.endDate.getFullYear()}-${newBookingState.endDate.getMonth() + 1}-${newBookingState.endDate.getDate()}`;
            const endElement = document.querySelector(`.cal-day[data-date="${endDateStr}"]`);
            
            if (endElement) {
                endElement.classList.add('end-date');
                
                // Highlight dates in between
                document.querySelectorAll('.cal-day:not(.disabled)').forEach(day => {
                    const dateStr = day.getAttribute('data-date');
                    if (dateStr) {
                        const [y, m, d] = dateStr.split('-').map(Number);
                        const date = new Date(y, m - 1, d);
                        
                        if (date > newBookingState.startDate && date < newBookingState.endDate) {
                            day.classList.add('in-range');
                        }
                    }
                });
            }
        } else {
            startElement.classList.add('start-date', 'single');
        }
    }
}

// Calculate nights
function calculateNights() {
    if (newBookingState.startDate && newBookingState.endDate) {
        const timeDiff = newBookingState.endDate - newBookingState.startDate;
        newBookingState.nightsCount = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    } else {
        newBookingState.nightsCount = 0;
    }
}

// Update price summary
function updatePriceSummary() {
    const nights = newBookingState.nightsCount;
    const roomPrice = newBookingState.roomPrice;
    const serviceFee = newBookingState.serviceFee;
    const discount = newBookingState.discount || 0;
    
    const roomTotal = roomPrice * nights;
    const subtotal = roomTotal + serviceFee;
    const grandTotal = subtotal - discount;
    
    document.getElementById('summaryNights').textContent = nights;
    document.getElementById('summaryRoomPrice').textContent = formatCurrency(roomTotal);
    document.getElementById('summaryServiceFee').textContent = formatCurrency(serviceFee);
    
    // Show/hide discount row
    const discountRow = document.getElementById('voucherDiscountRow');
    if (discount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('summaryDiscount').textContent = '-' + formatCurrency(discount);
    } else {
        discountRow.style.display = 'none';
    }
    
    document.getElementById('summaryTotal').textContent = formatCurrency(grandTotal);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
    }).format(amount);
}

// Open new booking modal
function openNewBookingModal(room) {
    const modal = document.getElementById('newBookingModal');
    if (!modal) return;
    
    // Store room data
    newBookingState.selectedRoom = room;
    newBookingState.roomPrice = room.price || 3500000;
    
    // Get room name based on language
    const lang = state.currentLanguage;
    const roomName = room.name && typeof room.name === 'object' 
        ? room.name[lang] || room.name.vi 
        : room.name || room.title || '-';
    
    // Update summary info
    document.getElementById('summaryRoomName').textContent = roomName;
    document.getElementById('summaryRoomType').textContent = roomName;
    
    // Reset form
    newBookingState.guestCount = 2;
    newBookingState.startDate = null;
    newBookingState.endDate = null;
    newBookingState.nightsCount = 0;
    newBookingState.paymentMethod = 'cash';
    newBookingState.voucherCode = null;
    newBookingState.discount = 0;
    
    document.getElementById('guestCount').textContent = '2';
    document.getElementById('newFullName').value = '';
    document.getElementById('newPhone').value = '';
    document.getElementById('voucherInput').value = '';
    
    const voucherMessage = document.getElementById('voucherMessage');
    if (voucherMessage) {
        voucherMessage.textContent = '';
        voucherMessage.className = 'voucher-message';
    }
    
    document.querySelectorAll('.new-payment-option')[0].classList.add('active');
    document.querySelector('input[name="paymentMethod"][value="cash"]').checked = true;
    
    updatePriceSummary();
    generateCalendar();
    
    modal.style.display = 'flex';
}

// Handle booking submit
function handleNewBookingSubmit() {
    const fullName = document.getElementById('newFullName').value.trim();
    const phone = document.getElementById('newPhone').value.trim();
    
    if (!fullName || !phone) {
        alert('Vui lòng điền đầy đủ thông tin liên hệ!');
        return;
    }
    
    if (!newBookingState.startDate || !newBookingState.endDate) {
        alert('Vui lòng chọn ngày nhận và trả phòng!');
        return;
    }
    
    if (newBookingState.nightsCount === 0) {
        alert('Vui lòng chọn ít nhất 1 đêm!');
        return;
    }
    
    // Close booking modal
    document.getElementById('newBookingModal').style.display = 'none';
    
    // Calculate total with discount
    const subtotal = (newBookingState.roomPrice * newBookingState.nightsCount) + newBookingState.serviceFee;
    const discount = newBookingState.discount || 0;
    const total = subtotal - discount;
    
    // Store booking data
    const bookingData = {
        fullName,
        phone,
        guests: newBookingState.guestCount,
        checkIn: newBookingState.startDate,
        checkOut: newBookingState.endDate,
        nights: newBookingState.nightsCount,
        room: newBookingState.selectedRoom,
        roomPrice: newBookingState.roomPrice,
        serviceFee: newBookingState.serviceFee,
        voucherCode: newBookingState.voucherCode,
        discount: discount,
        total: total,
        paymentMethod: newBookingState.paymentMethod
    };
    
    if (newBookingState.paymentMethod === 'vnpay') {
        // Show QR payment modal
        showQRPaymentModal(bookingData);
    } else {
        // Show success modal directly
        showBookingSuccessModal(bookingData);
    }
}

// Show QR payment modal
function showQRPaymentModal(bookingData) {
    const qrModal = document.getElementById('qrPaymentModal');
    if (!qrModal) return;
    
    // Update QR details
    document.getElementById('qrAmount').textContent = formatCurrency(bookingData.total);
    document.getElementById('qrOrderCode').textContent = generateOrderCode();
    
    qrModal.style.display = 'flex';
    
    // Start countdown timer (14:59)
    let minutes = 14;
    let seconds = 59;
    
    const timerInterval = setInterval(() => {
        document.getElementById('qrMinutes').textContent = minutes;
        document.getElementById('qrSeconds').textContent = seconds < 10 ? '0' + seconds : seconds;
        
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }
        
        if (minutes < 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
    
    // Auto redirect after 3 seconds
    let countdown = 3;
    document.getElementById('qrRedirectSeconds').textContent = countdown;
    
    const redirectInterval = setInterval(() => {
        countdown--;
        document.getElementById('qrRedirectSeconds').textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(redirectInterval);
            clearInterval(timerInterval);
            qrModal.style.display = 'none';
            showBookingSuccessModal(bookingData);
        }
    }, 1000);
}

// Show booking success modal
function showBookingSuccessModal(bookingData) {
    const successModal = document.getElementById('bookingSuccessModal');
    if (!successModal) return;
    
    // Format dates
    const formatDate = (date) => {
        return date.toLocaleDateString('vi-VN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };
    
    // Update voucher details
    const room = bookingData.room;
    const lang = state.currentLanguage;
    
    document.getElementById('voucherHotelImg').src = room.image || room.panorama || '';
    document.getElementById('voucherHotelName').textContent = 'Link Hotel Nha Trang';
    document.getElementById('voucherLocation').textContent = '123 Trần Phú, Nha Trang, Khánh Hòa';
    
    document.getElementById('voucherCheckin').textContent = formatDate(bookingData.checkIn);
    document.getElementById('voucherCheckout').textContent = formatDate(bookingData.checkOut);
    document.getElementById('voucherNights').textContent = `${bookingData.nights} đêm`;
    document.getElementById('voucherGuests').textContent = `${bookingData.guests} người`;
    
    // Fix: Get room name based on language
    const roomName = room.name && typeof room.name === 'object' 
        ? room.name[lang] || room.name.vi 
        : room.name || room.title || '-';
    document.getElementById('voucherRoomType').textContent = roomName;
    
    document.getElementById('voucherCustomerName').textContent = bookingData.fullName;
    
    // Payment details
    document.getElementById('voucherPaymentNights').textContent = bookingData.nights;
    document.getElementById('voucherPaymentRoom').textContent = formatCurrency(bookingData.roomPrice * bookingData.nights);
    document.getElementById('voucherPaymentService').textContent = formatCurrency(bookingData.serviceFee);
    
    // Show/hide discount row
    const discountRow = document.getElementById('voucherPaymentDiscountRow');
    if (bookingData.discount && bookingData.discount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('voucherPaymentCode').textContent = bookingData.voucherCode;
        document.getElementById('voucherPaymentDiscount').textContent = '-' + formatCurrency(bookingData.discount);
    } else {
        discountRow.style.display = 'none';
    }
    
    document.getElementById('voucherPaymentTotal').textContent = formatCurrency(bookingData.total);
    document.getElementById('voucherPaymentMethod').textContent = bookingData.paymentMethod === 'cash' ? 'Thanh toán khi nhận phòng' : 'VNPay - Đã thanh toán';
    
    successModal.style.display = 'flex';
}

// Generate order code
function generateOrderCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'BK-';
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Generate order code
function generateOrderCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'BK-';
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initNewBookingModal();
    });
} else {
    initNewBookingModal();
}

// ===== Export for potential use =====
window.LinkHotel = {
    state,
    loadPage,
    openContentPanel,
    closeContentPanel,
    changeLanguage,
    openNewBookingModal
};
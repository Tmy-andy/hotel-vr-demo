// ===== GLOBAL STATE =====
const state = {
    currentPage: 'rooms',
    currentLanguage: 'vi',
    hotelData: null,
    selectedRoom: null,
    vrViewer: null,
    isUIHidden: false
};

// ===== DOM ELEMENTS =====
const elements = {
    // Panels
    contentPanel: document.getElementById('contentPanel'),
    panelTitle: document.getElementById('panelTitle'),
    panelContent: document.getElementById('panelContent'),
    closePanel: document.getElementById('closePanel'),
    roomInfoPanel: document.getElementById('roomInfoPanel'),
    closeRoomInfo: document.getElementById('closeRoomInfo'),
    
    // Search
    searchSection: document.getElementById('searchSection'),
    searchInput: document.getElementById('searchInput'),
    searchClearBtn: document.getElementById('searchClearBtn'),
    
    // Navigation
    navItems: document.querySelectorAll('.nav-item[data-page]'),
    langBtns: document.querySelectorAll('.lang-btn'),
    
    // Action buttons
    fullscreenBtn: document.getElementById('fullscreenBtn'),
    toggleUIBtn: document.getElementById('toggleUIBtn'),
    
    // Booking
    btnBookRoom: document.getElementById('btnBookRoom'),
    bookingModal: document.getElementById('bookingModal'),
    closeBookingModal: document.getElementById('closeBookingModal'),
    cancelBooking: document.getElementById('cancelBooking'),
    bookingForm: document.getElementById('bookingForm'),
    successModal: document.getElementById('successModal'),
    closeSuccessModal: document.getElementById('closeSuccessModal')
};

// ===== PAGE TITLES =====
const pageTitles = {
    vi: {
        introduction: 'GIỚI THIỆU KHÁCH SẠN',
        rooms: 'PHÒNG NGHỈ',
        facilities: 'TIỆN ÍCH',
        policies: 'CHÍNH SÁCH',
        contact: 'LIÊN HỆ'
    },
    en: {
        introduction: 'HOTEL INTRODUCTION',
        rooms: 'ROOMS',
        facilities: 'FACILITIES',
        policies: 'POLICIES',
        contact: 'CONTACT'
    }
};

// ===== INITIALIZATION =====
async function init() {
    try {
        showLoading();
        await loadData();
        initVRViewer();
        setupEventListeners();
        loadPage('rooms');
    } catch (error) {
        console.error('Error initializing app:', error);
        showError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
    }
}

// ===== LOAD DATA =====
async function loadData() {
    try {
        const response = await fetch('data/hotels.json');
        if (!response.ok) throw new Error('Failed to load data');
        state.hotelData = await response.json();
        console.log('Hotel data loaded:', state.hotelData);
    } catch (error) {
        console.error('Error loading data:', error);
        throw error;
    }
}

// ===== VR360 VIEWER =====
function initVRViewer() {
    try {
        const defaultPanorama = state.hotelData?.hotelInfo?.defaultPanorama || 
                               'https://pannellum.org/images/alma.jpg';
        
        state.vrViewer = pannellum.viewer('panorama', {
            type: 'equirectangular',
            panorama: defaultPanorama,
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
        
        console.log('VR360 viewer initialized');
    } catch (error) {
        console.error('Error initializing VR viewer:', error);
    }
}

function loadVRPanorama(room) {
    try {
        if (!state.vrViewer || !room.panoramaUrl) return;
        
        state.vrViewer.loadScene(room.id, {
            type: 'equirectangular',
            panorama: room.panoramaUrl,
            pitch: room.pitch || 0,
            yaw: room.yaw || 0,
            hfov: room.hfov || 100
        });
        
        console.log(`Loaded panorama for: ${room.name.vi}`);
    } catch (error) {
        console.error('Error loading panorama:', error);
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Navigation
    elements.navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const page = e.currentTarget.dataset.page;
            handleNavClick(page);
        });
    });
    
    // Panel controls
    elements.closePanel.addEventListener('click', closeContentPanel);
    elements.closeRoomInfo.addEventListener('click', closeRoomInfo);
    
    // Language
    elements.langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.currentTarget.dataset.lang;
            changeLanguage(lang);
        });
    });
    
    // Fullscreen
    elements.fullscreenBtn.addEventListener('click', toggleFullscreen);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    
    // Toggle UI
    elements.toggleUIBtn.addEventListener('click', toggleUI);
    
    // Search
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', handleSearch);
        elements.searchInput.addEventListener('input', (e) => {
            elements.searchClearBtn.style.display = e.target.value ? 'flex' : 'none';
        });
    }
    
    if (elements.searchClearBtn) {
        elements.searchClearBtn.addEventListener('click', clearSearch);
    }
    
    // Booking
    elements.btnBookRoom.addEventListener('click', openBookingModal);
    elements.closeBookingModal.addEventListener('click', closeBookingModal);
    elements.cancelBooking.addEventListener('click', closeBookingModal);
    elements.bookingForm.addEventListener('submit', handleBookingSubmit);
    elements.closeSuccessModal.addEventListener('click', closeSuccessModal);
    
    // Date inputs for booking form
    const checkInDate = document.getElementById('checkInDate');
    const checkOutDate = document.getElementById('checkOutDate');
    
    if (checkInDate && checkOutDate) {
        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        checkInDate.min = today;
        checkOutDate.min = today;
        
        checkInDate.addEventListener('change', () => {
            checkOutDate.min = checkInDate.value;
            calculatePrice();
        });
        
        checkOutDate.addEventListener('change', calculatePrice);
    }
    
    // Close modal on outside click
    elements.bookingModal.addEventListener('click', (e) => {
        if (e.target === elements.bookingModal) {
            closeBookingModal();
        }
    });
    
    elements.successModal.addEventListener('click', (e) => {
        if (e.target === elements.successModal) {
            closeSuccessModal();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (elements.successModal.classList.contains('active')) {
                closeSuccessModal();
            } else if (elements.bookingModal.classList.contains('active')) {
                closeBookingModal();
            } else if (elements.roomInfoPanel.classList.contains('active')) {
                closeRoomInfo();
            } else if (elements.contentPanel.classList.contains('active')) {
                closeContentPanel();
            }
        }
    });
}

// ===== NAVIGATION =====
function handleNavClick(page) {
    // Update active nav item
    elements.navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === page) {
            item.classList.add('active');
        }
    });
    
    loadPage(page);
    openContentPanel();
    closeRoomInfo();
}

function loadPage(page) {
    state.currentPage = page;
    const lang = state.currentLanguage;
    
    // Update title
    elements.panelTitle.textContent = pageTitles[lang][page] || page;
    
    // Show/hide search based on page
    if (page === 'rooms') {
        elements.searchSection.style.display = 'block';
    } else {
        elements.searchSection.style.display = 'none';
    }
    
    // Clear search
    if (elements.searchInput) {
        elements.searchInput.value = '';
        elements.searchClearBtn.style.display = 'none';
    }
    
    // Render content
    switch(page) {
        case 'introduction':
            renderIntroduction();
            break;
        case 'rooms':
            renderRooms();
            break;
        case 'facilities':
            renderFacilities();
            break;
        case 'policies':
            renderPolicies();
            break;
        case 'contact':
            renderContact();
            break;
        default:
            renderRooms();
    }
}

// ===== RENDER FUNCTIONS =====
function renderIntroduction() {
    const lang = state.currentLanguage;
    const info = state.hotelData.hotelInfo;
    
    const html = `
        <div class="info-section">
            <h3>
                <i class="fas fa-hotel"></i>
                ${info.name[lang]}
            </h3>
            <p>${info.description[lang]}</p>
        </div>
        
        <div class="info-section">
            <h3>
                <i class="fas fa-map-marker-alt"></i>
                ${lang === 'vi' ? 'Địa chỉ' : 'Address'}
            </h3>
            <p>${info.address[lang]}</p>
        </div>
        
        <div class="info-section">
            <h3>
                <i class="fas fa-clock"></i>
                ${lang === 'vi' ? 'Giờ nhận/trả phòng' : 'Check-in/Check-out'}
            </h3>
            <p>
                ${lang === 'vi' ? 'Nhận phòng' : 'Check-in'}: ${info.checkIn}<br>
                ${lang === 'vi' ? 'Trả phòng' : 'Check-out'}: ${info.checkOut}
            </p>
        </div>
    `;
    
    elements.panelContent.innerHTML = html;
}

function renderRooms(filteredRooms = null) {
    const lang = state.currentLanguage;
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
    attachRoomListeners();
}

function createRoomCard(room) {
    const lang = state.currentLanguage;
    const amenities = state.hotelData.amenities;
    
    return `
        <div class="content-card" data-room-id="${room.id}">
            <div class="card-image">
                <img src="${room.image}" alt="${room.name[lang]}" 
                     onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${room.name[lang]}</h3>
                    <span class="card-badge">${room.size}</span>
                </div>
                <p class="card-description">${room.description[lang]}</p>
                <div class="card-footer">
                    <div class="card-price">${formatPrice(room.price, lang)}</div>
                    <div class="card-capacity">
                        <i class="fas fa-user"></i>
                        <span>×${room.capacity}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function attachRoomListeners() {
    const cards = document.querySelectorAll('.content-card');
    console.log('🔗 Attaching listeners to', cards.length, 'room cards');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            console.log('🖱️ Room card clicked!');
            const roomId = e.currentTarget.dataset.roomId;
            console.log('🆔 Room ID:', roomId);
            handleRoomSelect(roomId);
        });
    });
}

function handleRoomSelect(roomId) {
    const room = state.hotelData.rooms.find(r => r.id === roomId);
    if (!room) return;
    
    state.selectedRoom = room;
    
    console.log('🏨 Selecting room:', room.name.vi);
    
    // 1. Chuyển VR sang phòng đó
    loadVRPanorama(room);
    
    // 2. Đóng content panel - FORCE ẨN LUÔN
    console.log('🚪 Closing content panel...');
    elements.contentPanel.classList.remove('active');
    // Force hide bằng cách set display none
    elements.contentPanel.style.display = 'none';
    console.log('✓ Content panel hidden');
    
    // 3. Mở room info panel với delay nhỏ để animation mượt
    setTimeout(() => {
        console.log('📱 Opening room info panel...');
        showRoomInfo(room);
    }, 100);
}

function showRoomInfo(room) {
    const lang = state.currentLanguage;
    const amenities = state.hotelData.amenities;
    
    // Update title
    document.getElementById('roomInfoTitle').textContent = room.name[lang];
    
    // Build amenities HTML
    const amenitiesHTML = room.amenities.map(amenityId => {
        const amenity = amenities[amenityId];
        if (!amenity) return '';
        return `
            <span class="amenity-tag">
                <i class="fas ${amenity.icon}"></i>
                ${amenity.name[lang]}
            </span>
        `;
    }).join('');
    
    // Build content
    const content = `
        <div class="room-detail-item">
            <h4><i class="fas fa-align-left"></i> ${lang === 'vi' ? 'Mô tả' : 'Description'}</h4>
            <p>${room.description[lang]}</p>
        </div>
        
        <div class="room-detail-item">
            <h4><i class="fas fa-ruler"></i> ${lang === 'vi' ? 'Diện tích' : 'Size'}</h4>
            <p>${room.size}</p>
        </div>
        
        <div class="room-detail-item">
            <h4><i class="fas fa-bed"></i> ${lang === 'vi' ? 'Loại giường' : 'Bed Type'}</h4>
            <p>${room.bedType[lang]}</p>
        </div>
        
        <div class="room-detail-item">
            <h4><i class="fas fa-eye"></i> ${lang === 'vi' ? 'View' : 'View'}</h4>
            <p>${room.view[lang]}</p>
        </div>
        
        <div class="room-detail-item">
            <h4><i class="fas fa-users"></i> ${lang === 'vi' ? 'Sức chứa' : 'Capacity'}</h4>
            <p>${room.capacity} ${lang === 'vi' ? 'người' : 'guests'}</p>
        </div>
        
        <div class="room-detail-item">
            <h4><i class="fas fa-tag"></i> ${lang === 'vi' ? 'Giá' : 'Price'}</h4>
            <p style="font-size: 20px; font-weight: 700; color: #FFC107;">${formatPrice(room.price, lang)}</p>
        </div>
        
        <div class="room-detail-item">
            <h4><i class="fas fa-list"></i> ${lang === 'vi' ? 'Tiện nghi' : 'Amenities'}</h4>
            <div class="room-amenities">
                ${amenitiesHTML}
            </div>
        </div>
    `;
    
    document.getElementById('roomInfoContent').innerHTML = content;
    
    // Show room info panel
    elements.roomInfoPanel.classList.add('active');
}

function renderFacilities() {
    const lang = state.currentLanguage;
    const facilities = state.hotelData.facilities;
    
    const html = `
        <div class="facilities-grid">
            ${facilities.map(facility => `
                <div class="facility-card">
                    <i class="fas ${facility.icon}"></i>
                    <h4>${facility.name[lang]}</h4>
                    <p>${facility.description[lang]}</p>
                </div>
            `).join('')}
        </div>
    `;
    
    elements.panelContent.innerHTML = html;
}

function renderPolicies() {
    const lang = state.currentLanguage;
    const policies = state.hotelData.policies;
    
    const html = `
        <div class="policies-list">
            ${policies.map(policy => `
                <div class="policy-item">
                    <h4>
                        <i class="fas ${policy.icon}"></i>
                        ${policy.title[lang]}
                    </h4>
                    <p>${policy.content[lang]}</p>
                </div>
            `).join('')}
        </div>
    `;
    
    elements.panelContent.innerHTML = html;
}

function renderContact() {
    const lang = state.currentLanguage;
    const info = state.hotelData.hotelInfo;
    
    const html = `
        <div class="contact-grid">
            <div class="contact-item">
                <i class="fas fa-phone"></i>
                <h4>${lang === 'vi' ? 'Điện thoại' : 'Phone'}</h4>
                <p><a href="tel:${info.phone}">${info.phone}</a></p>
            </div>
            
            <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <h4>Email</h4>
                <p><a href="mailto:${info.email}">${info.email}</a></p>
            </div>
            
            <div class="contact-item">
                <i class="fas fa-globe"></i>
                <h4>Website</h4>
                <p><a href="${info.website}" target="_blank">${info.website}</a></p>
            </div>
            
            <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <h4>${lang === 'vi' ? 'Địa chỉ' : 'Address'}</h4>
                <p>${info.address[lang]}</p>
            </div>
        </div>
    `;
    
    elements.panelContent.innerHTML = html;
}

// ===== SEARCH =====
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (!query) {
        renderRooms();
        return;
    }
    
    const filtered = state.hotelData.rooms.filter(room => {
        const nameVi = room.name.vi.toLowerCase();
        const nameEn = room.name.en.toLowerCase();
        const descVi = room.description.vi.toLowerCase();
        const descEn = room.description.en.toLowerCase();
        
        return nameVi.includes(query) || 
               nameEn.includes(query) || 
               descVi.includes(query) || 
               descEn.includes(query);
    });
    
    renderRooms(filtered);
}

function clearSearch() {
    elements.searchInput.value = '';
    elements.searchClearBtn.style.display = 'none';
    renderRooms();
}

// ===== LANGUAGE =====
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
    if (elements.roomInfoPanel.classList.contains('active') && state.selectedRoom) {
        showRoomInfo(state.selectedRoom);
    }
}

// ===== BOOKING =====
function openBookingModal() {
    if (!state.selectedRoom) return;
    
    const lang = state.currentLanguage;
    const room = state.selectedRoom;
    
    // Set room info in modal
    document.getElementById('bookingRoomImage').src = room.image;
    document.getElementById('bookingRoomName').textContent = room.name[lang];
    document.getElementById('bookingRoomPrice').textContent = formatPrice(room.price, lang);
    
    // Set default dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    document.getElementById('checkInDate').value = today.toISOString().split('T')[0];
    document.getElementById('checkOutDate').value = tomorrow.toISOString().split('T')[0];
    
    // Calculate initial price
    calculatePrice();
    
    // Show modal
    elements.bookingModal.classList.add('active');
}

function closeBookingModal() {
    elements.bookingModal.classList.remove('active');
    elements.bookingForm.reset();
}

function calculatePrice() {
    if (!state.selectedRoom) return;
    
    const checkIn = new Date(document.getElementById('checkInDate').value);
    const checkOut = new Date(document.getElementById('checkOutDate').value);
    
    if (!checkIn || !checkOut || checkOut <= checkIn) return;
    
    // Calculate nights
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    // Calculate totals
    const roomPrice = state.selectedRoom.price;
    const roomTotal = roomPrice * nights;
    const taxFee = roomTotal * 0.1;
    const grandTotal = roomTotal + taxFee;
    
    // Update UI
    document.getElementById('numNights').textContent = nights;
    document.getElementById('roomTotal').textContent = formatPrice(roomTotal, state.currentLanguage);
    document.getElementById('taxFee').textContent = formatPrice(taxFee, state.currentLanguage);
    document.getElementById('grandTotal').textContent = formatPrice(grandTotal, state.currentLanguage);
}

function handleBookingSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(elements.bookingForm);
    const bookingData = {
        room: state.selectedRoom,
        guest: {
            name: formData.get('guestName'),
            phone: formData.get('guestPhone'),
            email: formData.get('guestEmail')
        },
        dates: {
            checkIn: formData.get('checkInDate'),
            checkOut: formData.get('checkOutDate')
        },
        guests: {
            adults: formData.get('adults'),
            children: formData.get('children')
        },
        specialRequest: formData.get('specialRequest'),
        paymentMethod: formData.get('paymentMethod')
    };
    
    console.log('Booking data:', bookingData);
    
    // In real app, send to backend here
    // For now, just show success
    
    closeBookingModal();
    showSuccessModal();
}

function showSuccessModal() {
    elements.successModal.classList.add('active');
}

function closeSuccessModal() {
    elements.successModal.classList.remove('active');
}

// ===== PANEL CONTROLS =====
function openContentPanel() {
    elements.contentPanel.style.display = 'flex'; // Restore display
    elements.contentPanel.classList.add('active');
}

function closeContentPanel() {
    elements.contentPanel.classList.remove('active');
    elements.navItems.forEach(item => item.classList.remove('active'));
}

function closeRoomInfo() {
    elements.roomInfoPanel.classList.remove('active');
    
    // Show content panel again when closing room info
    if (state.currentPage === 'rooms') {
        elements.contentPanel.style.display = 'flex'; // Restore display
        elements.contentPanel.classList.add('active');
    }
}

// ===== FULLSCREEN =====
function toggleFullscreen() {
    const elem = document.documentElement;
    
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
    }
}

function handleFullscreenChange() {
    const isFullscreen = !!document.fullscreenElement;
    const icon = elements.fullscreenBtn.querySelector('i');
    
    if (isFullscreen) {
        icon.classList.remove('fa-expand');
        icon.classList.add('fa-compress');
    } else {
        icon.classList.remove('fa-compress');
        icon.classList.add('fa-expand');
    }
}

// ===== TOGGLE UI =====
function toggleUI() {
    state.isUIHidden = !state.isUIHidden;
    document.body.classList.toggle('ui-hidden');
    
    const icon = elements.toggleUIBtn.querySelector('i');
    if (state.isUIHidden) {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ===== UTILITIES =====
function formatPrice(price, lang) {
    if (lang === 'vi') {
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
    const message = lang === 'vi' ? 
        'Không tìm thấy kết quả phù hợp' : 
        'No matching results found';
    
    elements.panelContent.innerHTML = `
        <div class="loading">
            <i class="fas fa-inbox" style="font-size: 60px; opacity: 0.3; margin-bottom: 20px;"></i>
            <p>${message}</p>
        </div>
    `;
}

function showError(message) {
    elements.panelContent.innerHTML = `
        <div class="loading">
            <i class="fas fa-exclamation-triangle" style="font-size: 60px; color: #F44336; margin-bottom: 20px;"></i>
            <p>${message}</p>
        </div>
    `;
}

// ===== START APPLICATION =====
document.addEventListener('DOMContentLoaded', init);

// ===== EXPORT =====
window.HotelVR = {
    state,
    loadPage,
    changeLanguage
};
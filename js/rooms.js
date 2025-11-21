// ===== Rooms Module =====

import { state, elements } from './state.js';
import { loadVRPanorama, showVRTitleOverlay } from './vr-viewer.js';
import { formatPrice, showEmptyState, closeContentPanel, openRoomInfoPanel, addRoomInfoStyles } from './utils.js';

// ===== Render Rooms =====
export function renderRooms(filteredRooms = null) {
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
                // Import cart system dynamically
                import('./booking-cart.js').then(({ openBookingModalCart }) => {
                    openBookingModalCart(room);
                });
            }
        });
    });
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

// ===== Attach Booking Button Listeners =====
export function attachBookingButtonListeners() {
    // Tìm tất cả các nút đặt phòng
    setTimeout(() => {
        const bookingButtons = document.querySelectorAll('.cta-button, .facilities-cta-button');
        
        bookingButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🎯 Booking button clicked - navigating to rooms');
                // Import dynamically to avoid circular dependency
                import('./navigation.js').then(({ handleNavClick }) => {
                    handleNavClick('rooms');
                });
            });
        });
    }, 100);
}

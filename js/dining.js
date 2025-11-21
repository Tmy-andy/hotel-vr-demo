// ===== Dining Module =====

import { state, elements } from './state.js';
import { loadVRPanorama, showVRTitleOverlay } from './vr-viewer.js';
import { showEmptyState, closeContentPanel, openRoomInfoPanel } from './utils.js';

// ===== Render Dining (Ẩm Thực) =====
export function renderDining(filteredRestaurants = null) {
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
            // Prevent card click if clicking on book button
            if (e.target.closest('.btn-book-room')) return;
            
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
}

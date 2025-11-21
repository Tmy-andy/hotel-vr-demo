// ===== Facilities Module =====

import { state, elements } from './state.js';
import { loadVRPanorama, showVRTitleOverlay } from './vr-viewer.js';
import { showEmptyState, closeContentPanel, openRoomInfoPanel, addRoomInfoStyles } from './utils.js';

// ===== Render Facilities =====
export function renderFacilities() {
    const lang = state.currentLanguage;
    const facilities = state.hotelData.facilities || [];
    
    const html = `
        <div class="content-grid">
            ${facilities.map(facility => createFacilityCard(facility, lang)).join('')}
        </div>
    `;
    
    elements.panelContent.innerHTML = html;
    
    // Attach event listeners for facility cards
    attachFacilityCardListeners();
}

// ===== Create Facility Card =====
function createFacilityCard(facility, lang) {
    return `
        <div class="content-card" data-facility-id="${facility.id}">
            <div class="card-image">
                ${facility.image ? 
                    `<img src="${facility.image}" alt="${facility.name[lang]}" loading="lazy" 
                        onerror="this.parentElement.innerHTML='<span class=\\'card-placeholder\\'><i class=\\'fas fa-building\\'></i></span>'">` 
                    : `<span class="card-placeholder"><i class="fas fa-building"></i></span>`
                }
            </div>
            <div class="card-content">
                <h3 class="card-title">${facility.name[lang]}</h3>
                <p class="card-description">${facility.description[lang]}</p>
                
                <div class="card-meta">
                    <div class="card-meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${facility.location[lang]}</span>
                    </div>
                    ${facility.services && facility.services.length > 0 ? `
                    <div class="card-meta-item">
                        <i class="fas fa-concierge-bell"></i>
                        <span>${facility.services.length} ${lang === 'vi' ? 'dịch vụ' : 'services'}</span>
                    </div>
                    ` : ''}
                    <div class="card-meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${facility.openingHours[lang]}</span>
                    </div>
                </div>
                
                <div class="card-footer dining-footer">
                    <div class="dining-hours">
                        <i class="fas fa-clock"></i>
                        <small>${facility.openingHours[lang]}</small>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===== Attach Facility Card Listeners =====
function attachFacilityCardListeners() {
    const cards = document.querySelectorAll('.content-card[data-facility-id]');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const facilityId = card.dataset.facilityId;
            handleFacilityClick(facilityId);
        });
    });
}

// ===== Handle Facility Click =====
function handleFacilityClick(facilityId) {
    const facility = state.hotelData.facilities.find(f => f.id === facilityId);
    if (!facility) return;
    
    state.selectedRoom = facility; // Reuse selectedRoom state for facility
    
    console.log('🏊 Facility clicked:', facility.name.vi);
    
    // Show VR title overlay
    const lang = state.currentLanguage;
    const facilityName = facility.name && typeof facility.name === 'object' 
        ? facility.name[lang] || facility.name.vi 
        : facility.name || '-';
    showVRTitleOverlay(facilityName);
    
    // 1. Load VR panorama FIRST
    if (facility.panoramaUrl) {
        loadVRPanorama(facility);
    }
    
    // 2. Close content panel - FORCE
    console.log('🚪 Closing content panel...');
    closeContentPanel();
    
    // 3. Show facility info panel with delay
    setTimeout(() => {
        console.log('📱 Opening facility info panel...');
        renderFacilityInfo(facility);
        openRoomInfoPanel();
    }, 150);
}

// ===== Render Facility Info =====
function renderFacilityInfo(facility) {
    const lang = state.currentLanguage;
    
    elements.roomInfoTitle.textContent = facility.name[lang];
    
    const html = `
        <div class="room-detail-section">
            <h4><i class="fas fa-info-circle"></i> ${lang === 'vi' ? 'Giới thiệu' : 'Introduction'}</h4>
            <p>${facility.description[lang]}</p>
            
            <div class="room-specs">
                <div class="spec-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${facility.location[lang]}</span>
                </div>
                ${facility.services && facility.services.length > 0 ? `
                <div class="spec-item">
                    <i class="fas fa-concierge-bell"></i>
                    <span>${facility.services.length} ${lang === 'vi' ? 'dịch vụ' : 'services'}</span>
                </div>
                ` : ''}
                <div class="spec-item">
                    <i class="fas fa-clock"></i>
                    <span>${facility.openingHours[lang]}</span>
                </div>
            </div>
        </div>
        
        ${facility.services && facility.services.length > 0 ? `
        <div class="room-detail-section">
            <h4><i class="fas fa-concierge-bell"></i> ${lang === 'vi' ? 'Dịch vụ' : 'Services'}</h4>
            <ul class="amenities-list">
                ${facility.services.map(service => `
                    <li><i class="fas fa-check"></i> ${service[lang] || service.vi}</li>
                `).join('')}
            </ul>
        </div>
        ` : ''}
        
        ${facility.pricing ? `
        <div class="room-detail-section">
            <h4><i class="fas fa-tags"></i> ${lang === 'vi' ? 'Giá & Gói dịch vụ' : 'Pricing & Packages'}</h4>
            <ul class="amenities-list">
                ${Object.entries(facility.pricing).map(([key, value]) => `
                    <li><i class="fas fa-money-bill-wave"></i> ${value[lang] || value.vi}</li>
                `).join('')}
            </ul>
        </div>
        ` : ''}
    `;
    
    elements.roomInfoContent.innerHTML = html;
    addRoomInfoStyles();
}

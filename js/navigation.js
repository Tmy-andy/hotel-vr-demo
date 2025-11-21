// ===== Navigation Module =====

import { state, elements, pageTitles } from './state.js';
import { hideVRTitleOverlay } from './vr-viewer.js';
import { 
    openContentPanel, 
    closeContentPanel, 
    closeRoomInfoPanel,
    toggleRoomInfoPanel,
    clearSearch,
    handleSearch,
    toggleFullscreen,
    handleFullscreenChange,
    toggleUI
} from './utils.js';
import { renderRooms } from './rooms.js';
import { renderDining } from './dining.js';
import { renderFacilities } from './facilities.js';
import { renderIntroduction, renderVouchers, renderPolicies, renderContact, renderRules } from './pages.js';
import { 
    closeBookingModal, 
    closeSuccessModal, 
    calculateBookingPrice,
    openNewBookingModal
} from './booking.js';

// ===== Change Language =====
export function changeLanguage(lang) {
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
    
    // Update room info if open (dynamic import to avoid circular dependency)
    if (state.selectedRoom && elements.roomInfoPanel.classList.contains('active')) {
        if (state.currentPage === 'rooms') {
            import('./rooms.js').then(({ renderRoomInfo }) => {
                if (typeof renderRoomInfo === 'function') {
                    renderRoomInfo(state.selectedRoom);
                }
            });
        } else if (state.currentPage === 'dining') {
            import('./dining.js').then(({ renderRestaurantInfo }) => {
                if (typeof renderRestaurantInfo === 'function') {
                    renderRestaurantInfo(state.selectedRoom);
                }
            });
        } else if (state.currentPage === 'facilities') {
            import('./facilities.js').then(({ renderFacilityInfo }) => {
                if (typeof renderFacilityInfo === 'function') {
                    renderFacilityInfo(state.selectedRoom);
                }
            });
        }
    }
}

// ===== Event Listeners =====
export function setupEventListeners() {
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
        elements.bookingForm.addEventListener('submit', (e) => {
            import('./booking.js').then(({ handleBookingSubmit }) => {
                handleBookingSubmit(e);
            });
        });
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
            if (elements.bookingModal && elements.bookingModal.classList.contains('active')) {
                closeBookingModal();
            } else if (elements.successModal && elements.successModal.classList.contains('active')) {
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
export function handleNavClick(page) {
    const clickedButton = Array.from(elements.navItems).find(
        item => item.dataset.page === page
    );
    
    // Hide VR title overlay when switching pages
    hideVRTitleOverlay();
    
    // Close room-info-panel if open
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
export function loadPage(page) {
    state.currentPage = page;
    
    // Update title
    elements.panelTitle.textContent = pageTitles[state.currentLanguage][page] || page;
    
    // Show/hide search based on page
    if (elements.searchSection) {
        elements.searchSection.style.display = (page === 'rooms' || page === 'dining' || page === 'facilities') ? 'block' : 'none';
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
            import('./utils.js').then(({ showEmptyState }) => {
                showEmptyState();
            });
    }
}

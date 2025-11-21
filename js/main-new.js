// ===== Main Application Entry Point =====
// Refactored to use ES6 modules

import { state } from './state.js';
import { initVRViewer } from './vr-viewer.js';
import { setupEventListeners, loadPage } from './navigation.js';
import { showLoading, showError } from './utils.js';
import { initNewBookingModal } from './booking.js';

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
async function initializeApp() {
    try {
        // IMPORTANT: Init VR Viewer FIRST (không đợi data)
        console.log('🎬 Initializing VR Viewer...');
        initVRViewer();
        
        // Setup event listeners first
        setupEventListeners();
        
        // Initialize new booking modal
        initNewBookingModal();
        
        // Then load hotel data
        try {
            console.log('📥 Loading hotel data...');
            await loadHotelData();
            
            // Load default page
            loadPage('rooms');
            
            // NOTE: Don't auto-load panorama on init
            // Let user click on room to load panorama
            console.log('✅ App initialized successfully!');
            console.log('💡 Click on a room to view its VR panorama');
            
        } catch (error) {
            console.error('⚠️ Warning: Could not load hotel data:', error);
            console.log('💡 Tip: Make sure data/hotels.json exists');
            
            // Show error in panel but VR still works
            showError('Không thể tải dữ liệu khách sạn. Vui lòng kiểm tra file data/hotels.json');
        }
    } catch (error) {
        console.error('❌ Critical error initializing app:', error);
    }
}

// ===== Start Application =====
document.addEventListener('DOMContentLoaded', initializeApp);

console.log('🚀 Hotel VR App - ES6 Modules Version');
console.log('📦 Modules: state, vr-viewer, rooms, dining, facilities, pages, booking, utils, navigation');

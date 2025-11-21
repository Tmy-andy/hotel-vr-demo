// ===== LINK HOTEL - VR360 SYSTEM =====
// State Management Module

// ===== Global State =====
export const state = {
    currentPage: 'rooms',
    currentLanguage: 'vi',
    vrViewer: null,
    hotelData: null,
    selectedRoom: null,
    vouchers: null
};

// ===== DOM Elements =====
export const elements = {
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
export const pageTitles = {
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

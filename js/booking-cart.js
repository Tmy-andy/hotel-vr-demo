// ===== BOOKING CART SYSTEM =====
// Advanced booking system with shopping cart functionality

import { state, elements } from './state.js';
import { formatPrice, formatDateInput } from './utils.js';

// Cart State
const cartState = {
    items: [], // Array of {room, quantity}
    startDate: null,
    endDate: null,
    nightsCount: 0,
    serviceFee: 100000,
    discount: 0,
    voucherCode: null,
    paymentMethod: 'cash',
    currentMonth: null,
    currentYear: null
};

// ===== Initialize Cart System =====
export function initBookingCart() {
    const btnSelectMore = document.getElementById('btnSelectMoreRooms');
    const btnCloseSelection = document.getElementById('btnCloseRoomSelection');
    const btnDoneSelection = document.getElementById('btnDoneRoomSelection');
    const btnCloseModal = document.getElementById('closeNewBookingModal');
    const btnSubmit = document.getElementById('newBookingSubmit');
    const btnApplyVoucher = document.getElementById('applyVoucherBtn');
    const calendarTrigger = document.getElementById('miniCalendarTrigger');
    const btnConfirmDates = document.getElementById('btnConfirmDates');

    if (btnSelectMore) {
        btnSelectMore.addEventListener('click', openRoomSelection);
    }

    if (btnCloseSelection) {
        btnCloseSelection.addEventListener('click', closeRoomSelection);
    }

    if (btnDoneSelection) {
        btnDoneSelection.addEventListener('click', closeRoomSelection);
    }

    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', closeBookingModal);
    }

    if (btnSubmit) {
        btnSubmit.addEventListener('click', handleCartBookingSubmit);
    }

    if (btnApplyVoucher) {
        btnApplyVoucher.addEventListener('click', handleApplyCartVoucher);
    }

    if (calendarTrigger) {
        calendarTrigger.addEventListener('click', toggleCalendarPopup);
    }

    if (btnConfirmDates) {
        btnConfirmDates.addEventListener('click', confirmDates);
    }

    // Calendar navigation
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            cartState.currentMonth = (cartState.currentMonth || new Date().getMonth()) - 1;
            if (cartState.currentMonth < 0) {
                cartState.currentMonth = 11;
                cartState.currentYear = (cartState.currentYear || new Date().getFullYear()) - 1;
            }
            generateCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            cartState.currentMonth = (cartState.currentMonth || new Date().getMonth()) + 1;
            if (cartState.currentMonth > 11) {
                cartState.currentMonth = 0;
                cartState.currentYear = (cartState.currentYear || new Date().getFullYear()) + 1;
            }
            generateCalendar();
        });
    }

    // Payment method selection
    document.querySelectorAll('.new-payment-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.new-payment-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            cartState.paymentMethod = radio.value;
        });
    });

    generateCalendar();
}

// ===== Open Booking Modal with Cart =====
export function openBookingModalCart(room = null) {
    const modal = document.getElementById('newBookingModal');
    if (!modal) return;

    // Reset cart
    cartState.items = [];
    cartState.startDate = null;
    cartState.endDate = null;
    cartState.nightsCount = 0;
    cartState.discount = 0;
    cartState.voucherCode = null;
    cartState.paymentMethod = 'cash';

    // If room provided, add to cart
    if (room) {
        addToCart(room);
    }

    // Load available rooms for selection
    loadAvailableRooms();

    // Reset form
    document.getElementById('newFullName').value = '';
    document.getElementById('newPhone').value = '';
    const emailInput = document.getElementById('newEmail');
    if (emailInput) emailInput.value = '';
    document.getElementById('voucherInput').value = '';
    
    const voucherMessage = document.getElementById('voucherMessage');
    if (voucherMessage) {
        voucherMessage.textContent = '';
        voucherMessage.className = 'voucher-message';
    }

    updateCartDisplay();
    updateSummary();
    generateCalendar();

    modal.style.display = 'flex';
}

// ===== Close Booking Modal =====
function closeBookingModal() {
    const modal = document.getElementById('newBookingModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ===== Cart Operations =====
function addToCart(room) {
    const existingItem = cartState.items.find(item => item.room.id === room.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartState.items.push({
            room: room,
            quantity: 1
        });
    }

    updateCartDisplay();
    updateSummary();
}

function removeFromCart(roomId) {
    cartState.items = cartState.items.filter(item => item.room.id !== roomId);
    updateCartDisplay();
    updateSummary();
}

function updateQuantity(roomId, change) {
    const item = cartState.items.find(item => item.room.id === roomId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(roomId);
    } else {
        updateCartDisplay();
        updateSummary();
    }
}

// ===== Update Cart Display =====
function updateCartDisplay() {
    const container = document.getElementById('cartItemsContainer');
    if (!container) return;

    if (cartState.items.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-bed"></i>
                <p>Chưa có phòng nào được chọn. Vui lòng chọn phòng nghỉ để tiếp tục.</p>
            </div>
        `;
        return;
    }

    const lang = state.currentLanguage || 'vi';
    const html = cartState.items.map(item => {
        const room = item.room;
        const roomName = room.name && typeof room.name === 'object' 
            ? room.name[lang] || room.name.vi 
            : room.name || '-';
        
        const roomDetail = room.bedType && typeof room.bedType === 'object'
            ? room.bedType[lang] || room.bedType.vi
            : room.size || '';

        const price = room.price || 0;
        const total = price * item.quantity;

        return `
            <div class="cart-item" data-room-id="${room.id}">
                <div class="cart-item-header">
                    <div class="cart-item-info">
                        <h4>${roomName}</h4>
                        <p>${roomDetail}</p>
                    </div>
                    <button class="cart-item-remove" onclick="window.removeFromCart('${room.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="cart-item-footer">
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="window.updateCartQuantity('${room.id}', -1)">−</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="window.updateCartQuantity('${room.id}', 1)">+</button>
                    </div>
                    <span class="cart-item-price">${formatCurrency(total)}</span>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = html;
}

// ===== Room Selection Overlay =====
function openRoomSelection() {
    const overlay = document.getElementById('roomSelectionOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
}

function closeRoomSelection() {
    const overlay = document.getElementById('roomSelectionOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function loadAvailableRooms() {
    const container = document.getElementById('roomSelectionContent');
    if (!container || !state.hotelData || !state.hotelData.rooms) return;

    const lang = state.currentLanguage || 'vi';
    const rooms = state.hotelData.rooms;

    const html = rooms.map(room => {
        const roomName = room.name && typeof room.name === 'object' 
            ? room.name[lang] || room.name.vi 
            : room.name || '-';
        
        const description = room.description && typeof room.description === 'object'
            ? room.description[lang] || room.description.vi
            : room.description || '';

        const bedType = room.bedType && typeof room.bedType === 'object'
            ? room.bedType[lang] || room.bedType.vi
            : room.bedType || '';

        const price = room.price || 0;
        const hasStock = true; // Could add stock checking logic

        return `
            <div class="room-option-card">
                <img src="${room.image || 'https://via.placeholder.com/192x160'}" 
                     alt="${roomName}" 
                     class="room-option-image"
                     onerror="this.src='https://via.placeholder.com/192x160'">
                
                <div class="room-option-content">
                    <div class="room-option-header">
                        <div>
                            <h4 class="room-option-title">${roomName}</h4>
                            ${!hasStock ? '<p class="room-option-badge">Chỉ còn 3 phòng!</p>' : ''}
                        </div>
                        <div class="room-option-price">
                            <p class="room-option-price-amount">${formatCurrency(price)}</p>
                            <p class="room-option-price-unit">/đêm</p>
                        </div>
                    </div>
                    
                    <div class="room-option-divider"></div>
                    
                    <div class="room-option-features">
                        <span class="room-option-feature">
                            <i class="fas fa-ruler-combined"></i> ${room.size || '25 m²'}
                        </span>
                        <span class="room-option-feature">
                            <i class="fas fa-bed"></i> ${bedType}
                        </span>
                        <span class="room-option-feature">
                            <i class="fas fa-users"></i> ${room.capacity || 2} ${lang === 'vi' ? 'khách' : 'guests'}
                        </span>
                    </div>
                    
                    <p class="room-option-description">${description}</p>
                    
                    <div class="room-option-footer">
                        <button class="btn-add-to-cart" onclick="window.addRoomToCart('${room.id}')" ${!hasStock ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart"></i>
                            <span>${hasStock ? 'Thêm' : 'Hết phòng'}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = html;
}

// ===== Calendar Functions =====
function toggleCalendarPopup() {
    const popup = document.getElementById('calendarPopup');
    if (popup) {
        const isHidden = popup.style.display === 'none' || !popup.style.display;
        popup.style.display = isHidden ? 'block' : 'none';
    }
}

function confirmDates() {
    const popup = document.getElementById('calendarPopup');
    if (popup) {
        popup.style.display = 'none';
    }
    updateSummary();
}

function generateCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    if (!calendarDays) return;

    const today = new Date();
    
    // Use cartState month/year or default to current
    if (cartState.currentMonth === null) {
        cartState.currentMonth = today.getMonth();
    }
    if (cartState.currentYear === null) {
        cartState.currentYear = today.getFullYear();
    }
    
    const year = cartState.currentYear;
    const month = cartState.currentMonth;

    // Update month/year display
    const monthYearDisplay = document.getElementById('currentMonthYear');
    if (monthYearDisplay) {
        const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                           'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
        monthYearDisplay.textContent = `${monthNames[month]}, ${year}`;
    }

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    let html = '';

    // Add previous month days
    for (let i = 0; i < startDayOfWeek; i++) {
        html += '<div class="cal-day disabled">-</div>';
    }

    // Add current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(year, month, day);
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const isPast = dateObj < todayStart;
        const dayClass = isPast ? 'cal-day disabled' : 'cal-day';
        html += `<div class="${dayClass}" data-date="${year}-${month + 1}-${day}" onclick="window.selectCartDate(this)">${day}</div>`;
    }

    calendarDays.innerHTML = html;
    
    // Update calendar display to show selected dates
    updateCalendarDisplay();
}

function selectCartDate(dayElement) {
    if (dayElement.classList.contains('disabled')) return;

    const dateStr = dayElement.getAttribute('data-date');
    const [year, month, day] = dateStr.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);

    if (!cartState.startDate || (cartState.startDate && cartState.endDate)) {
        // Start new selection
        cartState.startDate = selectedDate;
        cartState.endDate = null;
        updateCalendarDisplay();
    } else if (selectedDate > cartState.startDate) {
        // Set end date
        cartState.endDate = selectedDate;
        calculateNights();
        updateCalendarDisplay();
        updateSummary();
    } else {
        // Reset if selected date is before start date
        cartState.startDate = selectedDate;
        cartState.endDate = null;
        updateCalendarDisplay();
    }
}

function updateCalendarDisplay() {
    document.querySelectorAll('.cal-day').forEach(day => {
        day.classList.remove('in-range', 'start-date', 'end-date', 'single');
    });

    if (!cartState.startDate) return;

    const startDateStr = `${cartState.startDate.getFullYear()}-${cartState.startDate.getMonth() + 1}-${cartState.startDate.getDate()}`;
    const startElement = document.querySelector(`.cal-day[data-date="${startDateStr}"]`);

    if (startElement) {
        if (cartState.endDate) {
            startElement.classList.add('start-date');
            const endDateStr = `${cartState.endDate.getFullYear()}-${cartState.endDate.getMonth() + 1}-${cartState.endDate.getDate()}`;
            const endElement = document.querySelector(`.cal-day[data-date="${endDateStr}"]`);

            if (endElement) {
                endElement.classList.add('end-date');

                // Highlight dates in between
                document.querySelectorAll('.cal-day:not(.disabled)').forEach(day => {
                    const dateStr = day.getAttribute('data-date');
                    if (dateStr) {
                        const [y, m, d] = dateStr.split('-').map(Number);
                        const date = new Date(y, m - 1, d);

                        if (date > cartState.startDate && date < cartState.endDate) {
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

function calculateNights() {
    if (cartState.startDate && cartState.endDate) {
        const timeDiff = cartState.endDate - cartState.startDate;
        cartState.nightsCount = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    } else {
        cartState.nightsCount = 0;
    }
}

// ===== Update Summary =====
function updateSummary() {
    // Update dates display
    const checkInEl = document.getElementById('summaryCheckIn');
    const checkOutEl = document.getElementById('summaryCheckOut');
    const nightsEl = document.getElementById('summaryNights');
    const nightsCountEl = document.getElementById('summaryNightsCount');

    if (checkInEl && cartState.startDate) {
        checkInEl.textContent = formatDate(cartState.startDate);
    }

    if (checkOutEl && cartState.endDate) {
        checkOutEl.textContent = formatDate(cartState.endDate);
    }

    if (nightsEl) {
        nightsEl.textContent = cartState.nightsCount;
    }

    if (nightsCountEl) {
        nightsCountEl.textContent = cartState.nightsCount;
    }

    // Update rooms summary
    const roomsSummaryEl = document.getElementById('roomsSummary');
    if (roomsSummaryEl) {
        if (cartState.items.length === 0) {
            roomsSummaryEl.innerHTML = '<p style="color: #9ca3af; text-align: center; padding: 20px;">Chưa có phòng nào</p>';
        } else {
            const lang = state.currentLanguage || 'vi';
            const html = cartState.items.map(item => {
                const room = item.room;
                const roomName = room.name && typeof room.name === 'object' 
                    ? room.name[lang] || room.name.vi 
                    : room.name || '-';
                
                const price = room.price || 0;
                const total = price * item.quantity * cartState.nightsCount;

                return `
                    <div class="room-summary-item">
                        <div class="room-summary-info">
                            <p class="room-summary-name">${item.quantity} x ${roomName}</p>
                            <p class="room-summary-detail">(${formatCurrency(price)} / đêm)</p>
                        </div>
                        <span class="room-summary-price">${formatCurrency(total)}</span>
                    </div>
                `;
            }).join('');
            roomsSummaryEl.innerHTML = html;
        }
    }

    // Calculate totals
    const totalRooms = cartState.items.reduce((sum, item) => sum + item.quantity, 0);
    const roomTotal = cartState.items.reduce((sum, item) => {
        return sum + (item.room.price * item.quantity * cartState.nightsCount);
    }, 0);

    const serviceFee = cartState.serviceFee;
    const discount = cartState.discount || 0;
    const grandTotal = roomTotal + serviceFee - discount;

    // Update price breakdown
    document.getElementById('totalRoomsCount').textContent = totalRooms;
    document.getElementById('summaryRoomPrice').textContent = formatCurrency(roomTotal);
    document.getElementById('summaryServiceFee').textContent = formatCurrency(serviceFee);

    const discountRow = document.getElementById('voucherDiscountRow');
    if (discount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('summaryDiscount').textContent = '-' + formatCurrency(discount);
    } else {
        discountRow.style.display = 'none';
    }

    document.getElementById('summaryTotal').textContent = formatCurrency(grandTotal);
}

// ===== Voucher Handler =====
function handleApplyCartVoucher() {
    const voucherInput = document.getElementById('voucherInput');
    const voucherMessage = document.getElementById('voucherMessage');
    const code = voucherInput.value.trim().toUpperCase();

    if (!code) {
        voucherMessage.textContent = 'Vui lòng nhập mã voucher';
        voucherMessage.className = 'voucher-message error';
        return;
    }

    if (cartState.nightsCount === 0) {
        voucherMessage.textContent = 'Vui lòng chọn ngày nhận và trả phòng trước';
        voucherMessage.className = 'voucher-message error';
        return;
    }

    // Find voucher
    const voucher = state.vouchers.find(v => v.code.toUpperCase() === code && v.active);

    if (!voucher) {
        voucherMessage.textContent = 'Mã voucher không hợp lệ';
        voucherMessage.className = 'voucher-message error';
        cartState.voucherCode = null;
        cartState.discount = 0;
        updateSummary();
        return;
    }

    // Check minimum nights
    if (cartState.nightsCount < (voucher.minNights || 0)) {
        voucherMessage.textContent = `Voucher này yêu cầu đặt tối thiểu ${voucher.minNights} đêm`;
        voucherMessage.className = 'voucher-message error';
        cartState.voucherCode = null;
        cartState.discount = 0;
        updateSummary();
        return;
    }

    // Calculate discount
    const roomTotal = cartState.items.reduce((sum, item) => {
        return sum + (item.room.price * item.quantity * cartState.nightsCount);
    }, 0);
    const totalBeforeDiscount = roomTotal + cartState.serviceFee;
    let discountAmount = 0;

    if (voucher.discountType === 'percent') {
        discountAmount = (totalBeforeDiscount * voucher.discount) / 100;
    } else if (voucher.discountType === 'fixed') {
        discountAmount = voucher.discount;
    }

    // Apply voucher
    cartState.voucherCode = code;
    cartState.discount = discountAmount;

    voucherMessage.textContent = `✓ Áp dụng thành công! Giảm ${formatCurrency(discountAmount)}`;
    voucherMessage.className = 'voucher-message success';

    updateSummary();
}

// ===== Submit Booking =====
function handleCartBookingSubmit() {
    const fullName = document.getElementById('newFullName').value.trim();
    const phone = document.getElementById('newPhone').value.trim();
    const email = document.getElementById('newEmail') ? document.getElementById('newEmail').value.trim() : '';

    if (!fullName || !phone) {
        alert('Vui lòng điền đầy đủ thông tin liên hệ!');
        return;
    }

    if (email && !validateEmail(email)) {
        alert('Email không hợp lệ!');
        return;
    }

    if (cartState.items.length === 0) {
        alert('Vui lòng chọn ít nhất 1 phòng!');
        return;
    }

    if (!cartState.startDate || !cartState.endDate) {
        alert('Vui lòng chọn ngày nhận và trả phòng!');
        return;
    }

    if (cartState.nightsCount === 0) {
        alert('Vui lòng chọn ít nhất 1 đêm!');
        return;
    }

    // Calculate total
    const roomTotal = cartState.items.reduce((sum, item) => {
        return sum + (item.room.price * item.quantity * cartState.nightsCount);
    }, 0);
    const total = roomTotal + cartState.serviceFee - cartState.discount;

    const bookingData = {
        fullName,
        phone,
        email,
        items: cartState.items,
        checkIn: cartState.startDate,
        checkOut: cartState.endDate,
        nights: cartState.nightsCount,
        roomTotal: roomTotal,
        serviceFee: cartState.serviceFee,
        voucherCode: cartState.voucherCode,
        discount: cartState.discount,
        total: total,
        paymentMethod: cartState.paymentMethod
    };

    console.log('📦 Cart Booking Data:', bookingData);

    closeBookingModal();

    // Show success or QR payment
    if (cartState.paymentMethod === 'vnpay') {
        // Show QR modal
        import('./booking.js').then(({ showQRPaymentModal }) => {
            showQRPaymentModal(bookingData);
        });
    } else {
        // Show success modal
        import('./booking.js').then(({ showBookingSuccessModal }) => {
            showBookingSuccessModal(bookingData);
        });
    }
}

// ===== Helper Functions =====
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

function formatDate(date) {
    if (!date) return '--/--/----';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== Expose Functions to Window =====// ===== Expose Functions to Window =====
window.addRoomToCart = function(roomId) {
    const room = state.hotelData.rooms.find(r => r.id === roomId);
    if (room) {
        addToCart(room);
    }
};

window.removeFromCart = function(roomId) {
    removeFromCart(roomId);
};

window.updateCartQuantity = function(roomId, change) {
    updateQuantity(roomId, change);
};

window.selectCartDate = function(element) {
    selectCartDate(element);
};

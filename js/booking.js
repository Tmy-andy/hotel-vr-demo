// ===== Booking Module =====

import { state, elements } from './state.js';
import { formatPrice, formatDateInput } from './utils.js';

// ===== Booking Modal =====
export function openBookingModal() {
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

export function closeBookingModal() {
    elements.bookingModal.classList.remove('active');
    elements.bookingForm.reset();
}

export function closeSuccessModal() {
    elements.successModal.classList.remove('active');
}

// ===== Calculate Booking Price =====
export function calculateBookingPrice() {
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
export function handleBookingSubmit(e) {
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
export function initNewBookingModal() {
    const newBookingModal = document.getElementById('newBookingModal');
    const closeBtn = document.getElementById('closeNewBookingModal');
    const decreaseBtn = document.getElementById('decreaseGuests');
    const increaseBtn = document.getElementById('increaseGuests');
    const submitBtn = document.getElementById('newBookingSubmit');
    const applyVoucherBtn = document.getElementById('applyVoucherBtn');
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
            const successModal = document.getElementById('bookingSuccessModal');
            successModal.style.display = 'none';
        });
    }
    
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', () => {
            const successModal = document.getElementById('bookingSuccessModal');
            successModal.style.display = 'none';
            import('./utils.js').then(({ closeContentPanel }) => {
                closeContentPanel();
            });
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
        const isPast = dateObj < today.setHours(0, 0, 0, 0);
        const dayClass = isPast ? 'cal-day disabled' : 'cal-day';
        html += `<div class="${dayClass}" data-date="${year}-${month + 1}-${day}">${day}</div>`;
    }
    
    calendarDays.innerHTML = html;
    
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
        newBookingState.startDate = selectedDate;
        newBookingState.endDate = null;
        updateCalendarDisplay();
    } else if (selectedDate > newBookingState.startDate) {
        newBookingState.endDate = selectedDate;
        updateCalendarDisplay();
        calculateNights();
        updatePriceSummary();
    } else {
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
export function openNewBookingModal(room) {
    const modal = document.getElementById('newBookingModal');
    if (!modal) return;
    
    newBookingState.selectedRoom = room;
    newBookingState.roomPrice = room.price || 3500000;
    
    const lang = state.currentLanguage;
    const roomName = room.name && typeof room.name === 'object' 
        ? room.name[lang] || room.name.vi 
        : room.name || room.title || '-';
    
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
    
    document.getElementById('newBookingModal').style.display = 'none';
    
    const subtotal = (newBookingState.roomPrice * newBookingState.nightsCount) + newBookingState.serviceFee;
    const discount = newBookingState.discount || 0;
    const total = subtotal - discount;
    
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
        showQRPaymentModal(bookingData);
    } else {
        showBookingSuccessModal(bookingData);
    }
}

// Show QR payment modal
function showQRPaymentModal(bookingData) {
    const qrModal = document.getElementById('qrPaymentModal');
    if (!qrModal) return;
    
    document.getElementById('qrAmount').textContent = formatCurrency(bookingData.total);
    document.getElementById('qrOrderCode').textContent = generateOrderCode();
    
    qrModal.style.display = 'flex';
    
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
    
    const formatDate = (date) => {
        return date.toLocaleDateString('vi-VN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };
    
    const room = bookingData.room;
    const lang = state.currentLanguage;
    
    document.getElementById('voucherHotelImg').src = room.image || room.panorama || '';
    document.getElementById('voucherHotelName').textContent = 'Link Hotel Nha Trang';
    document.getElementById('voucherLocation').textContent = '123 Trần Phú, Nha Trang, Khánh Hòa';
    
    document.getElementById('voucherCheckin').textContent = formatDate(bookingData.checkIn);
    document.getElementById('voucherCheckout').textContent = formatDate(bookingData.checkOut);
    document.getElementById('voucherNights').textContent = `${bookingData.nights} đêm`;
    document.getElementById('voucherGuests').textContent = `${bookingData.guests} người`;
    
    const roomName = room.name && typeof room.name === 'object' 
        ? room.name[lang] || room.name.vi 
        : room.name || room.title || '-';
    document.getElementById('voucherRoomType').textContent = roomName;
    
    document.getElementById('voucherTotal').textContent = formatCurrency(bookingData.total);
    document.getElementById('voucherBookingCode').textContent = generateOrderCode();
    
    successModal.style.display = 'flex';
}

// Generate order code
function generateOrderCode() {
    return 'BK' + Date.now().toString().slice(-8);
}

// ===== Utility Functions Module =====

import { state, elements, pageTitles } from './state.js';

// ===== Clear Search =====
export function clearSearch() {
    if (elements.searchInput) {
        elements.searchInput.value = '';
        elements.searchClearBtn.style.display = 'none';
        handleSearch({ target: elements.searchInput });
    }
}

// ===== Format Price =====
export function formatPrice(price, currency, lang) {
    if (lang === 'vi') {
        return price.toLocaleString('vi-VN') + ' ' + currency;
    } else {
        if (currency === 'VNĐ') {
            return currency + ' ' + price.toLocaleString('en-US');
        }
        return currency + ' ' + price.toLocaleString('en-US');
    }
}

// ===== Format Date for Input =====
export function formatDateInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// ===== Panel Controls =====
export function openContentPanel() {
    elements.contentPanel.classList.add('active');
}

export function closeContentPanel() {
    elements.contentPanel.classList.remove('active');
}

export function openRoomInfoPanel() {
    if (elements.roomInfoPanel) {
        elements.roomInfoPanel.classList.add('active');
        elements.roomInfoPanel.classList.remove('collapsed');
    }
}

export function closeRoomInfoPanel() {
    if (elements.roomInfoPanel) {
        elements.roomInfoPanel.classList.remove('active');
        setTimeout(() => {
            elements.roomInfoPanel.classList.add('collapsed');
        }, 300);
    }
}

export function toggleRoomInfoPanel() {
    if (elements.roomInfoPanel) {
        const isCollapsed = elements.roomInfoPanel.classList.contains('collapsed');
        
        if (isCollapsed) {
            elements.roomInfoPanel.classList.remove('collapsed');
        } else {
            elements.roomInfoPanel.classList.add('collapsed');
        }
    }
}

// ===== Fullscreen =====
export function toggleFullscreen() {
    const elem = document.documentElement;
    
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
        // Enter fullscreen
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
        // Exit fullscreen
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

export function handleFullscreenChange() {
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    
    if (isFullscreen) {
        console.log('Entered fullscreen mode');
    } else {
        console.log('Exited fullscreen mode');
    }
}

// ===== Toggle UI =====
export function toggleUI() {
    const body = document.body;
    const isHidden = body.classList.contains('ui-hidden');
    
    if (isHidden) {
        body.classList.remove('ui-hidden');
        console.log('UI shown');
    } else {
        body.classList.add('ui-hidden');
        console.log('UI hidden');
    }
}

// ===== UI States =====
export function showLoading() {
    elements.panelContent.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Đang tải dữ liệu...</p>
        </div>
    `;
}

export function showEmptyState() {
    const lang = state.currentLanguage;
    elements.panelContent.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-inbox"></i>
            <h3>${lang === 'vi' ? 'Không tìm thấy kết quả' : 'No results found'}</h3>
            <p>${lang === 'vi' ? 'Vui lòng thử tìm kiếm với từ khóa khác' : 'Please try searching with different keywords'}</p>
        </div>
    `;
}

export function showError(message) {
    elements.panelContent.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Lỗi</h3>
            <p>${message}</p>
        </div>
    `;
}

// ===== Add Room Info Styles =====
export function addRoomInfoStyles() {
    // Room info panel styles are now in CSS files
    // This function kept for backward compatibility
}

// ===== Search Handler (placeholder - will be implemented in specific modules) =====
export function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    const currentPage = state.currentPage;
    
    // Update clear button visibility
    if (elements.searchClearBtn) {
        elements.searchClearBtn.style.display = query ? 'flex' : 'none';
    }
    
    // Search logic will be handled by specific page modules
    console.log(`Search: "${query}" on page: ${currentPage}`);
}

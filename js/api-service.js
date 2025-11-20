// ===== API Service =====
// File này cung cấp các functions để gọi API backend
// Uncomment và customize cho production environment

class APIService {
    constructor(baseURL = '') {
        this.baseURL = baseURL || (typeof CONFIG !== 'undefined' ? CONFIG.api.baseURL : '');
        this.cache = new Map();
        this.cacheTimeout = 3600000; // 1 hour
    }

    // ===== Generic Request Method =====
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options
        };

        try {
            const response = await fetch(url, defaultOptions);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('API Request Error:', error);
            return { success: false, error: error.message };
        }
    }

    // ===== GET Request with Caching =====
    async get(endpoint, useCache = true) {
        // Check cache first
        if (useCache && this.cache.has(endpoint)) {
            const cached = this.cache.get(endpoint);
            const now = Date.now();
            
            if (now - cached.timestamp < this.cacheTimeout) {
                console.log('Returning cached data for:', endpoint);
                return { success: true, data: cached.data, fromCache: true };
            } else {
                this.cache.delete(endpoint);
            }
        }

        // Make request
        const result = await this.request(endpoint, { method: 'GET' });
        
        // Cache successful result
        if (result.success && useCache) {
            this.cache.set(endpoint, {
                data: result.data,
                timestamp: Date.now()
            });
        }
        
        return result;
    }

    // ===== POST Request =====
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // ===== PUT Request =====
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    // ===== DELETE Request =====
    async delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE'
        });
    }

    // ===== Clear Cache =====
    clearCache(endpoint = null) {
        if (endpoint) {
            this.cache.delete(endpoint);
        } else {
            this.cache.clear();
        }
    }

    // ===== Specific API Endpoints =====
    
    // Get all locations by category
    async getLocations(category = 'hotels') {
        return this.get(`/locations?category=${category}`);
    }

    // Get single location by ID
    async getLocation(id) {
        return this.get(`/locations/${id}`);
    }

    // Search locations
    async searchLocations(query, category = null) {
        const categoryParam = category ? `&category=${category}` : '';
        return this.get(`/locations/search?q=${encodeURIComponent(query)}${categoryParam}`);
    }

    // Get featured locations
    async getFeaturedLocations() {
        return this.get('/locations/featured');
    }

    // Get nearby locations
    async getNearbyLocations(lat, lng, radius = 10) {
        return this.get(`/locations/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
    }

    // Submit review
    async submitReview(locationId, review) {
        return this.post(`/locations/${locationId}/reviews`, review);
    }

    // Get reviews
    async getReviews(locationId) {
        return this.get(`/locations/${locationId}/reviews`);
    }

    // Track analytics event
    async trackEvent(eventName, eventData) {
        if (!CONFIG.features.enableAnalytics) return;
        
        return this.post('/analytics/event', {
            event: eventName,
            data: eventData,
            timestamp: new Date().toISOString()
        });
    }

    // ===== Vouchers API =====
    // Get all vouchers
    async getVouchers() {
        return this.get('/data/vouchers.json');
    }

    // Get active vouchers
    async getActiveVouchers() {
        const result = await this.getVouchers();
        if (result.success) {
            const activeVouchers = result.data.vouchers.filter(v => v.active);
            return { success: true, data: { vouchers: activeVouchers } };
        }
        return result;
    }

    // Validate voucher code
    async validateVoucher(code, totalAmount, nightsCount) {
        const result = await this.getVouchers();
        if (result.success) {
            const voucher = result.data.vouchers.find(v => 
                v.code.toUpperCase() === code.toUpperCase() && v.active
            );
            
            if (!voucher) {
                return { success: false, error: 'Mã voucher không hợp lệ' };
            }

            // Check minimum nights requirement
            if (nightsCount < voucher.minNights) {
                return { 
                    success: false, 
                    error: `Voucher này yêu cầu đặt tối thiểu ${voucher.minNights} đêm` 
                };
            }

            // Calculate discount
            let discountAmount = 0;
            if (voucher.discountType === 'percent') {
                discountAmount = (totalAmount * voucher.discount) / 100;
            } else if (voucher.discountType === 'fixed') {
                discountAmount = voucher.discount;
            }

            return { 
                success: true, 
                data: {
                    voucher,
                    discountAmount,
                    finalAmount: totalAmount - discountAmount
                }
            };
        }
        return result;
    }
}

// ===== Usage Examples =====

/*
// Initialize API Service
const api = new APIService('https://your-api.com/api');

// Example 1: Get hotels
async function loadHotels() {
    const result = await api.getLocations('hotels');
    if (result.success) {
        console.log('Hotels:', result.data);
        return result.data;
    } else {
        console.error('Error loading hotels:', result.error);
        return [];
    }
}

// Example 2: Search
async function searchHotels(query) {
    const result = await api.searchLocations(query, 'hotels');
    if (result.success) {
        return result.data;
    }
    return [];
}

// Example 3: Get single location
async function getHotelDetails(id) {
    const result = await api.getLocation(id);
    if (result.success) {
        return result.data;
    }
    return null;
}

// Example 4: Submit review
async function submitHotelReview(hotelId, rating, comment) {
    const result = await api.submitReview(hotelId, {
        rating,
        comment,
        userName: 'Anonymous',
        date: new Date().toISOString()
    });
    
    if (result.success) {
        alert('Review submitted successfully!');
    } else {
        alert('Failed to submit review');
    }
}

// Example 5: Track page view
async function trackPageView(pageName) {
    await api.trackEvent('page_view', {
        page: pageName,
        userAgent: navigator.userAgent,
        timestamp: Date.now()
    });
}
*/

// ===== Mock API for Development =====
class MockAPIService {
    constructor() {
        this.mockData = null;
    }

    async loadMockData() {
        if (!this.mockData) {
            const response = await fetch('data/hotels.json');
            this.mockData = await response.json();
        }
        return this.mockData;
    }

    async getLocations(category = 'hotels') {
        const data = await this.loadMockData();
        return {
            success: true,
            data: data[category] || []
        };
    }

    async getLocation(id) {
        const data = await this.loadMockData();
        let location = null;
        
        for (const category in data) {
            location = data[category].find(item => item.id === id);
            if (location) break;
        }
        
        return {
            success: !!location,
            data: location
        };
    }

    async searchLocations(query, category = null) {
        const data = await this.loadMockData();
        const searchQuery = query.toLowerCase();
        let results = [];
        
        const categoriesToSearch = category ? [category] : Object.keys(data);
        
        for (const cat of categoriesToSearch) {
            const items = data[cat] || [];
            const filtered = items.filter(item => {
                const nameVi = item.name.vi.toLowerCase();
                const nameEn = item.name.en.toLowerCase();
                return nameVi.includes(searchQuery) || nameEn.includes(searchQuery);
            });
            results = results.concat(filtered);
        }
        
        return {
            success: true,
            data: results
        };
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { APIService, MockAPIService };
}

// ===== Auto-initialize based on config =====
// Uncomment to use in production
/*
const api = CONFIG.dev.mockAPI ? 
    new MockAPIService() : 
    new APIService(CONFIG.api.baseURL);

window.api = api;
*/
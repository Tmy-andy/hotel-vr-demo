// ===== Configuration File =====
// File này chứa các cấu hình có thể tùy chỉnh dễ dàng

const CONFIG = {
    // API Configuration
    api: {
        baseURL: '/api',
        endpoints: {
            locations: '/api/locations',
            hotels: '/api/hotels',
            attractions: '/api/attractions'
        },
        timeout: 10000
    },

    // UI Configuration
    ui: {
        // Animation durations (ms)
        animationDuration: 300,
        
        // Panel configuration
        panel: {
            width: 420,
            maxWidth: '90vw',
            autoClose: false // Close panel when clicking outside
        },
        
        // Search configuration
        search: {
            debounceDelay: 300,
            minCharacters: 1
        },
        
        // Card configuration
        card: {
            imageHeight: 200,
            defaultImage: 'assets/images/placeholder.jpg'
        }
    },

    // Feature Flags
    features: {
        enableSearch: true,
        enableLanguageToggle: true,
        enableRating: true,
        enablePricing: true,
        enableCoordinates: true,
        enableOfflineMode: false,
        enableAnalytics: false
    },

    // Language Configuration
    languages: {
        default: 'vi',
        available: ['vi', 'en'],
        fallback: 'en'
    },

    // Map Configuration (for future integration)
    map: {
        center: {
            lat: 10.9333,
            lng: 108.1000
        },
        zoom: 13,
        provider: 'google' // 'google', 'mapbox', 'osm'
    },

    // VR Configuration
    vr: {
        autoRotate: true,
        rotateSpeed: 1,
        enableGyroscope: true,
        enableVRMode: true
    },

    // Categories Configuration
    categories: {
        hotels: {
            icon: 'hotel',
            color: '#2196F3',
            enabled: true
        },
        attractions: {
            icon: 'map-pin',
            color: '#4CAF50',
            enabled: true
        },
        heritage: {
            icon: 'monument',
            color: '#FF9800',
            enabled: true
        },
        scenery: {
            icon: 'image',
            color: '#9C27B0',
            enabled: true
        },
        info: {
            icon: 'info',
            color: '#607D8B',
            enabled: true
        }
    },

    // Performance Configuration
    performance: {
        lazyLoadImages: true,
        imagePlaceholder: true,
        maxImageSize: 1920,
        cacheEnabled: true,
        cacheDuration: 3600000 // 1 hour in ms
    },

    // Analytics Configuration
    analytics: {
        trackPageViews: true,
        trackEvents: true,
        trackErrors: true,
        provider: 'google-analytics', // 'google-analytics', 'mixpanel', 'custom'
        trackingId: 'UA-XXXXXXXXX-X'
    },

    // Error Messages
    messages: {
        vi: {
            loading: 'Đang tải dữ liệu...',
            error: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
            noResults: 'Không tìm thấy kết quả nào.',
            networkError: 'Không thể kết nối đến máy chủ.',
            offline: 'Bạn đang ở chế độ offline.'
        },
        en: {
            loading: 'Loading data...',
            error: 'An error occurred. Please try again later.',
            noResults: 'No results found.',
            networkError: 'Cannot connect to server.',
            offline: 'You are currently offline.'
        }
    },

    // Development Configuration
    dev: {
        enableDebug: true, // Set to false in production
        enableConsoleLog: true,
        mockAPI: false, // Use mock data instead of API
        showPerformanceMetrics: false
    }
};

// Utility function to get nested config values
CONFIG.get = function(path, defaultValue = null) {
    const keys = path.split('.');
    let value = this;
    
    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            return defaultValue;
        }
    }
    
    return value;
};

// Utility function to update config values
CONFIG.set = function(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    let target = this;
    
    for (const key of keys) {
        if (!(key in target)) {
            target[key] = {};
        }
        target = target[key];
    }
    
    target[lastKey] = value;
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
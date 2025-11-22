// ===== GALLERY MODULE =====

const galleryData = {
    videos: [
        {
            id: 'video-1',
            title: {
                vi: 'Tour tham quan khách sạn',
                en: 'Hotel Tour'
            },
            thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDE5BFwtasyhGYrvHfJxqRbFQxpvnn0HwnbLoOP3Iyu90sdFtAKhHnjlL1pUH01Fr6V6C1Vz2fPREks2F1kA-9retw4wwdR2wndmhsvLUMWMi4WKuLMM54gkDrUmLs-GipfXM6NgCOi337BASHWdhzNoNzeDuoJvNKnjR9jZdVkdWL_Y3vqR9MQpokNeqOAKI91g1BMNI8eH20CQYq7j8-P26lAIZ85nJ_PHGgl03dcw1JFt14kHjnufffX6Uj6iznR_nxgPBN_ZRI',
            videoUrl: '#'
        },
        {
            id: 'video-2',
            title: {
                vi: 'Giới thiệu Phòng Deluxe',
                en: 'Deluxe Room Introduction'
            },
            thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-dn6_M9soM2fY9IWFUmTmUT1VsKSMl8G1bVZyX3KUmSqFCqYCgfqyAZDHlBJ-ug6WK38XMyLm-9EgoVhVWdiwOMPuTzf_oomVOA4x2E16nF0cMX2TRxSt_Tlmq7YKDCX27uWi2l6aSs7hf_4Gr0y0vH-VYZVY6-7Ia0YG3pYegNU3J-OiPv7W-Oiu4vja8Csa-j6UkhKs8lSx_VSxpouRbZKMT-vbeAB5CU8dyhbjZoqgUf_ElnSXqn_YDzwpbQW5NUzfabbZHTc',
            videoUrl: '#'
        },
        {
            id: 'video-3',
            title: {
                vi: 'Nhà hàng & Quầy bar',
                en: 'Restaurant & Bar'
            },
            thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsZ2_2036ZvP_Owtfw5Fz9ox9gDX14zT_npY-MQCvkDnjRTdO5E8a8_7xixrpgByVS9pwAgM1ppQK5FDWkwbd7oAaNt_tO9KU36bhtLwNtjBPxTzm3DpHlVkmldBR-cW55DyfhpV79C53C8qj59j49KbDEl_vwJ5GvIUVlwwBj3OZ8ZU3FaN0KYVD7WozAbvdLuG1blnadi1_cR5S4QOCHc2n9GK3id7pynrwlKaaWfu2vem-QKkMhOydPMywG3gOYmc0wH39kAUU',
            videoUrl: '#'
        },
        {
            id: 'video-4',
            title: {
                vi: 'Đánh giá từ khách hàng',
                en: 'Guest Reviews'
            },
            thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ3IdwXQw_AOVAC3ZvMf_vLdX7oZqx8Wfgz6ZbhAqA6-4kI141P5yMuTm7GGJEMOG85lP7gSfjwW2xrtVNhpCxNgUrxFvigqxL34bdPAnNXAZPiEf32Ovef2l38Rv3mg1FOhK-ag6l9DqX7cgvzaJKQske43Kv4DG0nRAddXt55Y8EakVFmvKDu8Iph6_7ttODtfmXTMrTuQbuCM9b2T31lL5Bh2NM_xZbz2bpw4w_nThR2fiKuT77NrBTPve6B5YGRt4-Wyvo4EM',
            videoUrl: '#'
        },
        {
            id: 'video-5',
            title: {
                vi: 'Toàn cảnh hồ bơi',
                en: 'Pool Overview'
            },
            thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd21_tDcJLiZ2Xs5N-Wu8IwPebjpzOf7pEtEVuhDwJ3ad_0d7XxUaRVVs1e9D_jTsqLt4gbPNiN6Q3zzI_CFcG_dSUCUEw1jyyFbCUCspC_RgEhyTN0zAv9kQKH2VZcMqNQ1wSove0LkUatyRlawrGCuzpMlNy7PTucPcLATA_TKATFgV4Fmf5EAlLE0f0Lx8_Jq1XAL4s4y6lc1tx-fP3HoblNQUIS1M-0BX1gaidHaaIxenb28gSKgRO4Bdu90KWNuM2fyQ_1zs',
            videoUrl: '#'
        },
        {
            id: 'video-6',
            title: {
                vi: 'Trải nghiệm Spa',
                en: 'Spa Experience'
            },
            thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWFbQiVB8rx2ilZiwxhBLaWFrcrMmJEJ2vGPpNO3ZJlauDTX5aPOdnW9ACvxKTsYh6IKVSHPnGpI5AMxYJ2RecSXSCBHzeDhIpwETVf9lzIoGAtPAS3VQAw13luoNi5H3VptjF3VbYDcbr3Rv6r4RIab_0Iw3muoVkyzAavkmQGFaeuN4nNZx6MOvTrDpWr9tij1T0IOmo98gzUDj1OMs_ek5rHFDX6xkFy5HfZL9hmNwknQMMPBNNYx5xsbCnRfIJNNSA1cqbkVA',
            videoUrl: '#'
        },
        {
            id: 'video-7',
            title: {
                vi: 'Khám phá sảnh chính',
                en: 'Lobby Exploration'
            },
            thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2dPCJZ4AEaqJ_b4jpXvwnOekpLbbimM4t1EngsX3MNpXMkC3tug_KvKPB0NN5j7Yczg52C9JDUMcdpGRHS-jAhoQr0N5df5YrBQDF0AOf3uL0pw2h6N3kOgDuGFp3Cq5PEfP5aPbOwTpar0hjFZre6kNpDahESsjTw_zrm0nX6lAQ8qghoQSaj2pgxorlIKsxW0zuX1iYCiRiMenY6zThFUyvf9SGrZQP5bLxMpN34NCPENuRlqQj3ylVrLQP5KboJebEo3qGuHY',
            videoUrl: '#'
        },
        {
            id: 'video-8',
            title: {
                vi: 'Điểm nhấn sự kiện',
                en: 'Event Highlights'
            },
            thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7IWgzAbcSRTNtky93tFu4uBiHT5_X7VxfcnYztHisTLHKvsG37CaxnHIW_XLOSJ6LtfgkLXQ6TMsY1ENKmxFFcwBBUTdk4uFHT8Xwr398VwyCEgNUQ6WXvVwzfv1F05XbY4MZcwwHS5emBaL4bZ3C8jqSX5qgdk5jlLwT-kg-3QphA6h3gZawaxr6OZAtaWec4-DRlJbea_AtP7Ukx0AeAdoI5YS1EmtUPhCYOxIJpFrOyqkQgxhxtrPmyR1KprW6dVsiOwNwkds',
            videoUrl: '#'
        }
    ],
    images: [
        {
            id: 'img-1',
            title: {
                vi: 'Phòng Deluxe',
                en: 'Deluxe Room'
            },
            imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop',
            category: 'rooms'
        },
        {
            id: 'img-2',
            title: {
                vi: 'Hồ bơi vô cực',
                en: 'Infinity Pool'
            },
            imageUrl: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&auto=format&fit=crop',
            category: 'facilities'
        },
        {
            id: 'img-3',
            title: {
                vi: 'Nhà hàng',
                en: 'Restaurant'
            },
            imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
            category: 'dining'
        },
        {
            id: 'img-4',
            title: {
                vi: 'Spa & Wellness',
                en: 'Spa & Wellness'
            },
            imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop',
            category: 'facilities'
        },
        {
            id: 'img-5',
            title: {
                vi: 'Phòng Suite',
                en: 'Suite Room'
            },
            imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop',
            category: 'rooms'
        },
        {
            id: 'img-6',
            title: {
                vi: 'Bar rooftop',
                en: 'Rooftop Bar'
            },
            imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&auto=format&fit=crop',
            category: 'dining'
        },
        {
            id: 'img-7',
            title: {
                vi: 'Sảnh chính',
                en: 'Main Lobby'
            },
            imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&auto=format&fit=crop',
            category: 'facilities'
        },
        {
            id: 'img-8',
            title: {
                vi: 'Phòng tập gym',
                en: 'Gym'
            },
            imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop',
            category: 'facilities'
        }
    ]
};

// Current tab state
let currentGalleryTab = 'videos';

// Open gallery panel
function openGalleryPanel() {
    console.log('🖼️ Opening gallery panel');
    
    const contentPanel = document.getElementById('contentPanel');
    const panelTitle = document.getElementById('panelTitle');
    const panelContent = document.getElementById('panelContent');
    
    if (!contentPanel || !panelTitle || !panelContent) {
        console.error('❌ Gallery panel elements not found');
        return;
    }
    
    // Get current language from global state
    const lang = (typeof state !== 'undefined' && state.currentLanguage) ? state.currentLanguage : 'vi';
    
    // Set title
    panelTitle.textContent = lang === 'vi' ? 'THƯ VIỆN ẢNH & VIDEO' : 'PHOTO & VIDEO GALLERY';
    
    // Render gallery content
    renderGalleryContent();
    
    // Show panel
    contentPanel.classList.add('active');
    
    // Close room info panel if open
    const roomInfoPanel = document.getElementById('roomInfoPanel');
    if (roomInfoPanel) {
        roomInfoPanel.classList.remove('active');
    }
}

// Render gallery content - EXACT HTML FROM thu-vien.html
function renderGalleryContent() {
    const panelContent = document.getElementById('panelContent');
    const lang = (typeof state !== 'undefined' && state.currentLanguage) ? state.currentLanguage : 'vi';
    
    const html = `
        <!-- PageHeading -->
        <div class="flex flex-wrap justify-between gap-3 p-4 text-center">
            <div class="flex w-full flex-col gap-3 items-center">
                <p class="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                    ${lang === 'vi' ? 'Thư Viện Ảnh & Video' : 'Photo & Video Gallery'}
                </p>
                <p class="text-white/80 text-base md:text-lg font-normal leading-normal max-w-xl">
                    ${lang === 'vi' ? 'Trải nghiệm không gian và vẻ đẹp của chúng tôi qua từng khoảnh khắc.' : 'Experience our space and beauty through every moment.'}
                </p>
            </div>
        </div>
        
        <!-- Tabs -->
        <div class="pt-8 pb-3">
            <div class="flex justify-center border-b border-gray-300/20 px-4 gap-8">
                <a class="gallery-tab-link flex flex-col items-center justify-center border-b-[3px] ${currentGalleryTab === 'videos' ? 'border-b-[var(--accent-color)] text-white' : 'border-b-transparent text-white/50 hover:border-b-[var(--accent-color)]/50 hover:text-white'} pb-3 pt-4 cursor-pointer transition-colors" data-tab="videos">
                    <p class="text-sm font-bold leading-normal tracking-[0.015em]">Video</p>
                </a>
                <a class="gallery-tab-link flex flex-col items-center justify-center border-b-[3px] ${currentGalleryTab === 'images' ? 'border-b-[var(--accent-color)] text-white' : 'border-b-transparent text-white/50 hover:border-b-[var(--accent-color)]/50 hover:text-white'} pb-3 pt-4 cursor-pointer transition-colors" data-tab="images">
                    <p class="text-sm font-bold leading-normal tracking-[0.015em]">${lang === 'vi' ? 'Hình ảnh' : 'Images'}</p>
                </a>
            </div>
        </div>
        
        <!-- ImageGrid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 p-4">
            ${currentGalleryTab === 'videos' ? renderVideoGrid(lang) : renderImageGrid(lang)}
        </div>
    `;
    
    panelContent.innerHTML = html;
    
    // Add event listeners for tabs
    const tabLinks = panelContent.querySelectorAll('.gallery-tab-link');
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentGalleryTab = link.dataset.tab;
            renderGalleryContent();
        });
    });
}

// Render video grid - EXACT HTML FROM thu-vien.html
function renderVideoGrid(lang) {
    return galleryData.videos.map(video => `
        <a class="group relative bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-4 aspect-[3/4] overflow-hidden cursor-pointer"
            data-alt="${video.title[lang]}" href="#"
            style='background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url("${video.thumbnail}");'>
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div class="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                    <i class="fa-solid fa-play text-white text-3xl ml-1"></i>
                </div>
            </div>
            <p class="text-white text-base font-bold leading-tight w-4/5 line-clamp-3 z-10">${video.title[lang]}</p>
        </a>
    `).join('');
}

// Render image grid - EXACT HTML FROM thu-vien.html
function renderImageGrid(lang) {
    return galleryData.images.map(image => `
        <a class="group relative bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-4 aspect-[3/4] overflow-hidden cursor-pointer"
            data-alt="${image.title[lang]}" href="#"
            style='background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 40%), url("${image.imageUrl}");'>
            <p class="text-white text-base font-bold leading-tight w-4/5 line-clamp-3 z-10">${image.title[lang]}</p>
        </a>
    `).join('');
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openGalleryPanel,
        renderGalleryContent,
        galleryData
    };
}

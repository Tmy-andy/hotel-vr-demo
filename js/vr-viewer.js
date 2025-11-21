// ===== VR Viewer Module =====
// Pannellum VR360 Integration

import { state } from './state.js';

// ===== VR360 Viewer Initialization =====
export function initVRViewer() {
    try {
        console.log('🎬 Creating VR360 viewer...');
        
        // Ensure panorama div exists and is visible
        const panoramaDiv = document.getElementById('panorama');
        if (!panoramaDiv) {
            console.error('✖ #panorama element not found!');
            return;
        }
        
        console.log('✓ #panorama element found');
        console.log('📏 Panorama div size:', panoramaDiv.offsetWidth, 'x', panoramaDiv.offsetHeight);
        
        // Make sure panorama is visible
        panoramaDiv.style.display = 'block';
        panoramaDiv.style.visibility = 'visible';
        panoramaDiv.style.opacity = '1';
        
        state.vrViewer = pannellum.viewer('panorama', {
            type: 'equirectangular',
            panorama: 'https://pannellum.org/images/alma.jpg', // Default test panorama
            autoLoad: true,
            autoRotate: -2,
            showControls: false,
            showFullscreenCtrl: false,
            showZoomCtrl: false,
            mouseZoom: true,
            compass: true,
            hfov: 100,
            pitch: 0,
            yaw: 0,
            minHfov: 50,
            maxHfov: 120
        });
        
        console.log('✓ VR360 viewer initialized successfully!');
        console.log('🎯 You should see a test panorama now');
        
        // Check if viewer is working after 1 second
        setTimeout(() => {
            if (state.vrViewer) {
                console.log('✓ VR Viewer still alive after 1s');
            } else {
                console.error('✖ VR Viewer destroyed!');
            }
        }, 1000);
        
    } catch (error) {
        console.error('✖ Error initializing VR viewer:', error);
        console.log('🧐 Check if Pannellum library is loaded');
        console.log('🧐 Open Console to see full error stack');
    }
}

// ===== Load VR Panorama =====
export function loadVRPanorama(item) {
    try {
        if (!item || !item.panoramaUrl) {
            console.warn('No panorama URL provided');
            return;
        }
        
        console.log(`Loading panorama: ${item.name ? item.name.vi : item.panoramaUrl}`);
        
        // IMPORTANT: Don't use loadScene() - it has bugs
        // Instead, destroy and recreate viewer
        
        // Destroy old viewer
        if (state.vrViewer) {
            console.log('Destroying old viewer...');
            try {
                state.vrViewer.destroy();
            } catch (e) {
                console.warn('Warning destroying viewer:', e);
            }
            state.vrViewer = null;
        }
        
        // Small delay to ensure cleanup
        setTimeout(() => {
            try {
                // Create new viewer with new panorama
                console.log('Creating new viewer with panorama...');
                state.vrViewer = pannellum.viewer('panorama', {
                    type: 'equirectangular',
                    panorama: item.panoramaUrl,
                    autoLoad: true,
                    autoRotate: -2,
                    showControls: false,
                    showFullscreenCtrl: false,
                    showZoomCtrl: false,
                    mouseZoom: true,
                    compass: true,
                    hfov: item.hfov || 100,
                    pitch: item.pitch || 0,
                    yaw: item.yaw || 0,
                    minHfov: 50,
                    maxHfov: 120
                });
                
                console.log(`✓ Loaded panorama successfully!`);
            } catch (error) {
                console.error('✖ Error creating new viewer:', error);
            }
        }, 100);
        
    } catch (error) {
        console.error('✖ Error loading panorama:', error);
    }
}

// ===== Show VR Title Overlay =====
export function showVRTitleOverlay(title) {
    const overlay = document.getElementById('vrTitleOverlay');
    const titleText = document.getElementById('vrTitleText');
    
    if (overlay && titleText) {
        titleText.textContent = title;
        overlay.style.display = 'flex';
    }
}

// ===== Hide VR Title Overlay =====
export function hideVRTitleOverlay() {
    const overlay = document.getElementById('vrTitleOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

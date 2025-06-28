'use client';

import { useEffect } from 'react';

export function CacheBuster() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Clear browser cache for profile image
    const clearImageCache = () => {
      try {
        // Clear service worker cache
        if ('caches' in window) {
          caches.keys().then((cacheNames) => {
            cacheNames.forEach((cacheName) => {
              if (cacheName.includes('rz-porto')) {
                caches.delete(cacheName);
                console.log('Cleared cache:', cacheName);
              }
            });
          });
        }

        // Force reload service worker
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then((registrations) => {
            registrations.forEach((registration) => {
              registration.unregister().then(() => {
                console.log('Service worker unregistered');
                // Re-register with new version
                navigator.serviceWorker.register('/sw.js');
              });
            });
          });
        }

        // Clear browser image cache by forcing reload
        const profileImages = document.querySelectorAll('img[src*="profile"]');
        profileImages.forEach((img) => {
          const element = img as HTMLImageElement;
          const originalSrc = element.src;
          const cacheBuster = `?v=${Date.now()}`;
          
          if (!originalSrc.includes('?v=')) {
            element.src = originalSrc + cacheBuster;
          }
        });

        console.log('Cache clearing completed');
      } catch (error) {
        console.error('Error clearing cache:', error);
      }
    };

    // Run cache clearing on component mount
    clearImageCache();

    // Optional: Clear cache when tab becomes visible (user switches back)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        clearImageCache();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null; // This component doesn't render anything
}

export default CacheBuster;

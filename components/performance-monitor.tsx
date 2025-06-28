'use client';

import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Preload critical resources with cache busting
    const CACHE_BUSTER = Date.now();
    const preloadLinks = [
      { href: `/images/profile.webp?v=${CACHE_BUSTER}`, as: 'image' },
      { href: '/_next/static/css/', as: 'style' },
    ];

    preloadLinks.forEach(({ href, as }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      document.head.appendChild(link);
    });

    // Memory optimization - clean up preload links after load
    const cleanupPreloadLinks = () => {
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach((link) => {
        const linkElement = link as HTMLLinkElement;
        if (linkElement.href.includes('/_next/static/css/')) {
          // Remove CSS preload links after they're loaded
          setTimeout(() => {
            if (link.parentNode) {
              link.parentNode.removeChild(link);
            }
          }, 5000);
        }
      });
    };

    // Run cleanup after initial load
    setTimeout(cleanupPreloadLinks, 3000);

    // Web Vitals tracking with better error handling
    if (process.env.NODE_ENV === 'production') {
      import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
        // Log vitals with better formatting
        const logVital = (metric: any) => {
          console.log(`🚀 ${metric.name}: ${metric.value}ms (${metric.rating})`);
          
          // Optional: Send to analytics service
          // gtag('event', metric.name, {
          //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          //   metric_id: metric.id,
          //   metric_value: metric.value,
          //   metric_delta: metric.delta,
          // });
        };

        onCLS(logVital);
        onFID(logVital);
        onFCP(logVital);
        onLCP(logVital);
        onTTFB(logVital);
      }).catch((error) => {
        console.warn('Web Vitals loading failed:', error);
      });
    }

    // Performance Observer for paint metrics with cleanup
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            console.log('🎨 FCP:', `${entry.startTime.toFixed(2)}ms`);
          }
          if (entry.name === 'largest-contentful-paint') {
            console.log('🖼️ LCP:', `${entry.startTime.toFixed(2)}ms`);
          }
        }
      });
      
      try {
        observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
        
        // Cleanup observer after a reasonable time
        setTimeout(() => {
          observer.disconnect();
        }, 10000);
      } catch (error) {
        console.warn('Performance Observer failed:', error);
      }
    }

    // Resource hint for external domains
    const dnsPrefetchDomains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
    ];

    dnsPrefetchDomains.forEach((domain) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    });

  }, []);

  return null;
}

export default PerformanceMonitor;

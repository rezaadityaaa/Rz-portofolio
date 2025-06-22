import { useEffect, useState } from 'react';

interface PerformanceData {
  loadTime: number;
  renderTime: number;
  isVisible: boolean;
}

export function usePerformanceOptimization(threshold = 0.1) {
  const [perfData, setPerfData] = useState<PerformanceData>({
    loadTime: 0,
    renderTime: 0,
    isVisible: false,
  });

  useEffect(() => {
    const startTime = performance.now();

    // Track initial load time
    const loadEndTime = performance.now();
    setPerfData(prev => ({
      ...prev,
      loadTime: loadEndTime - startTime,
    }));

    // Track render time
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          setPerfData(prev => ({
            ...prev,
            renderTime: entry.startTime,
          }));
        }
      }
    });

    if ('PerformanceObserver' in window) {
      observer.observe({ entryTypes: ['paint'] });
    }

    return () => {
      if ('PerformanceObserver' in window) {
        observer.disconnect();
      }
    };
  }, []);

  return perfData;
}

export function useIntersectionObserver(ref: React.RefObject<Element>, options?: IntersectionObserverInit) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      options
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options]);

  return isIntersecting;
}

// Preload critical resources
export function preloadResource(href: string, as: string, type?: string) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  document.head.appendChild(link);
}

// Image optimization utilities
export function getOptimizedImageSrc(src: string, width: number, quality = 85) {
  if (src.startsWith('/')) {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
  }
  return src;
}

export function generateImageSizes(breakpoints: number[] = [640, 768, 1024, 1280, 1536]) {
  return breakpoints.map((bp, index) => {
    if (index === breakpoints.length - 1) {
      return `${bp}px`;
    }
    return `(max-width: ${breakpoints[index + 1]}px) ${bp}px`;
  }).join(', ');
}

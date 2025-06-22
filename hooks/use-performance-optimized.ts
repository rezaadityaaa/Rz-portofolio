'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

export interface PerformanceMetrics {
  loadTime: number;
  firstPaint: number;
  firstContentfulPaint: number;
  isLoading: boolean;
}

export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    firstPaint: 0,
    firstContentfulPaint: 0,
    isLoading: true,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const startTime = performance.now();
    let observer: PerformanceObserver | null = null;

    const updateMetric = (key: keyof PerformanceMetrics, value: number) => {
      setMetrics(prev => ({ ...prev, [key]: value }));
    };

    const handleLoad = () => {
      updateMetric('loadTime', performance.now() - startTime);
      setMetrics(prev => ({ ...prev, isLoading: false }));
    };

    // Performance Observer for paint metrics
    if ('PerformanceObserver' in window) {
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-paint') {
            updateMetric('firstPaint', entry.startTime);
          } else if (entry.name === 'first-contentful-paint') {
            updateMetric('firstContentfulPaint', entry.startTime);
          }
        }
      });

      try {
        observer.observe({ entryTypes: ['paint'] });
      } catch (error) {
        console.warn('Performance Observer failed:', error);
      }
    }

    window.addEventListener('load', handleLoad);
    
    return () => {
      window.removeEventListener('load', handleLoad);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return metrics;
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = { threshold: 0.1 }
) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      options
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options, hasBeenVisible]);

  return { isVisible, hasBeenVisible };
}

export function useImagePreloader(imageSrcs: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    if (imageSrcs.length === 0) {
      setAllImagesLoaded(true);
      return;
    }

    const imagePromises = imageSrcs.map((src) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, src]));
          resolve(src);
        };
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
      });
    });

    Promise.allSettled(imagePromises).then(() => {
      setAllImagesLoaded(true);
    });
  }, [imageSrcs]);

  return {
    loadedImages,
    allImagesLoaded,
    loadedCount: loadedImages.size,
    totalCount: imageSrcs.length,
    progress: imageSrcs.length === 0 ? 100 : (loadedImages.size / imageSrcs.length) * 100
  };
}

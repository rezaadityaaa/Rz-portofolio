'use client';

import { useEffect, useState, useCallback } from 'react';

export interface PerformanceMetrics {
  loadTime: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  isLoading: boolean;
}

export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    firstPaint: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    isLoading: true,
  });

  const updateMetric = useCallback((key: keyof PerformanceMetrics, value: number) => {
    setMetrics(prev => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const startTime = performance.now();
    let observer: PerformanceObserver | null = null;

    // Track basic load time
    const handleLoad = () => {
      updateMetric('loadTime', performance.now() - startTime);
      setMetrics(prev => ({ ...prev, isLoading: false }));
    };

    // Performance Observer for paint metrics
    if ('PerformanceObserver' in window) {
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          switch (entry.name) {
            case 'first-paint':
              updateMetric('firstPaint', entry.startTime);
              break;
            case 'first-contentful-paint':
              updateMetric('firstContentfulPaint', entry.startTime);
              break;
            case 'largest-contentful-paint':
              updateMetric('largestContentfulPaint', entry.startTime);
              break;
          }
        }
      });

      try {
        observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
      } catch (error) {
        console.warn('Performance Observer failed:', error);
      }
    }

    // Add load event listener
    window.addEventListener('load', handleLoad);
    
    return () => {
      window.removeEventListener('load', handleLoad);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [updateMetric]);

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

  useEffect(() => {
    if (loadedImages.size === imageSrcs.length && imageSrcs.length > 0) {
      setAllImagesLoaded(true);
    }
  }, [loadedImages.size, imageSrcs.length]);

  return {
    loadedImages,
    allImagesLoaded,
    loadedCount: loadedImages.size,
    totalCount: imageSrcs.length,
    progress: imageSrcs.length === 0 ? 100 : (loadedImages.size / imageSrcs.length) * 100
  };
}

export function useOptimizedLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState<'initial' | 'assets' | 'complete'>('initial');

  useEffect(() => {
    // Initial load
    setLoadingStage('assets');
    
    // Simulate asset loading time
    const timer = setTimeout(() => {
      setLoadingStage('complete');
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const setLoading = useCallback((loading: boolean, stage?: typeof loadingStage) => {
    setIsLoading(loading);
    if (stage) setLoadingStage(stage);
  }, []);

  return {
    isLoading,
    loadingStage,
    setLoading
  };
}

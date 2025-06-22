import dynamic from 'next/dynamic';
import React from 'react';

// Lazy load icons to reduce initial bundle size
export const LazyArrowUpRight = dynamic(() => import('lucide-react').then(mod => ({ default: mod.ArrowUpRight })), {
  ssr: false,
  loading: () => React.createElement('div', { className: 'w-6 h-6 bg-gray-200 rounded animate-pulse' })
});

export const LazyGithub = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Github })), {
  ssr: false,
  loading: () => React.createElement('div', { className: 'w-5 h-5 bg-gray-200 rounded animate-pulse' })
});

export const LazyLinkedin = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Linkedin })), {
  ssr: false,
  loading: () => React.createElement('div', { className: 'w-5 h-5 bg-gray-200 rounded animate-pulse' })
});

export const LazyMail = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Mail })), {
  ssr: false,
  loading: () => React.createElement('div', { className: 'w-5 h-5 bg-gray-200 rounded animate-pulse' })
});

export const LazyMapPin = dynamic(() => import('lucide-react').then(mod => ({ default: mod.MapPin })), {
  ssr: false,
  loading: () => React.createElement('div', { className: 'w-4 h-4 bg-gray-200 rounded animate-pulse' })
});

export const LazyExternalLink = dynamic(() => import('lucide-react').then(mod => ({ default: mod.ExternalLink })), {
  ssr: false,
  loading: () => React.createElement('div', { className: 'w-4 h-4 bg-gray-200 rounded animate-pulse' })
});

export const LazyChevronDown = dynamic(() => import('lucide-react').then(mod => ({ default: mod.ChevronDown })), {
  ssr: false,
  loading: () => React.createElement('div', { className: 'w-4 h-4 bg-gray-200 rounded animate-pulse' })
});

export const LazyMenu = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Menu })), {
  ssr: false,
  loading: () => React.createElement('div', { className: 'w-6 h-6 bg-gray-200 rounded animate-pulse' })
});

export const LazyX = dynamic(() => import('lucide-react').then(mod => ({ default: mod.X })), {
  ssr: false,
  loading: () => React.createElement('div', { className: 'w-6 h-6 bg-gray-200 rounded animate-pulse' })
});

export const LazySun = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Sun })), {
  ssr: false,
  loading: () => React.createElement('div', { className: 'w-4 h-4 bg-gray-200 rounded animate-pulse' })
});

export const LazyMoon = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Moon })), {
  ssr: false,
  loading: () => React.createElement('div', { className: 'w-4 h-4 bg-gray-200 rounded animate-pulse' })
});

// Critical icons that should load immediately (keep small set)
export { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

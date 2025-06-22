import dynamic from 'next/dynamic';
import React from 'react';

// Lazy load heavy components
export const LazyProjectCard = dynamic(() => import('@/components/ui/project-card').then(mod => ({ default: mod.ProjectCard })), {
  ssr: false,
  loading: () => React.createElement('div', {
    className: 'bg-gray-100 dark:bg-gray-800 rounded-lg h-96 animate-pulse'
  }, [
    React.createElement('div', {
      key: 'img',
      className: 'h-56 bg-gray-200 dark:bg-gray-700 rounded-t-lg'
    }),
    React.createElement('div', {
      key: 'content',
      className: 'p-6 space-y-3'
    }, [
      React.createElement('div', {
        key: 'line1',
        className: 'h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4'
      }),
      React.createElement('div', {
        key: 'line2',
        className: 'h-3 bg-gray-200 dark:bg-gray-700 rounded w-full'
      }),
      React.createElement('div', {
        key: 'line3',
        className: 'h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3'
      })
    ])
  ])
});

export const LazySkillCard = dynamic(() => import('@/components/ui/skill-card').then(mod => ({ default: mod.SkillCard })), {
  ssr: false,
  loading: () => React.createElement('div', {
    className: 'bg-gray-100 dark:bg-gray-800 rounded-lg h-32 animate-pulse'
  }, React.createElement('div', {
    className: 'p-4 space-y-2'
  }, [
    React.createElement('div', {
      key: 'line1',
      className: 'h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3'
    }),
    React.createElement('div', {
      key: 'line2',
      className: 'h-3 bg-gray-200 dark:bg-gray-700 rounded w-full'
    })
  ]))
});

export const LazyContactButton = dynamic(() => import('@/components/ui/contact-button').then(mod => ({ default: mod.ContactButton })), {
  ssr: false,
  loading: () => React.createElement('div', {
    className: 'h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'
  })
});

// Lazy load specific chart components (if using recharts)
export const LazyLineChart = dynamic(() => import('recharts').then(mod => ({ default: mod.LineChart })), {
  ssr: false,
  loading: () => React.createElement('div', {
    className: 'h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse flex items-center justify-center'
  }, React.createElement('div', {
    className: 'text-gray-500'
  }, 'Loading chart...'))
});

export const LazyBarChart = dynamic(() => import('recharts').then(mod => ({ default: mod.BarChart })), {
  ssr: false,
  loading: () => React.createElement('div', {
    className: 'h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse flex items-center justify-center'
  }, React.createElement('div', {
    className: 'text-gray-500'
  }, 'Loading chart...'))
});

import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import PerformanceMonitor from '@/components/performance-monitor'
import StructuredData from '@/components/structured-data'

export const metadata: Metadata = {
  metadataBase: new URL('https://rezaditya.me'),
  title: {
    default: 'Reza Aditya - Full Stack Developer | Portfolio',
    template: '%s | Reza Aditya'
  },
  description: 'Reza Aditya adalah Full Stack Developer yang berpengalaman dalam Laravel, Next.js, dan Vue.js. Lihat portfolio dan proyek-proyek terbaik saya.',
  keywords: [
    'Reza Aditya',
    'Reza',
    'Full Stack Developer',
    'Web Developer',
    'Laravel Developer',
    'Next.js Developer',
    'Vue.js Developer',
    'Frontend Developer',
    'Backend Developer',
    'Portfolio Reza',
    'Developer Indonesia',
    'Programmer Indonesia'
  ],
  authors: [{ name: 'Reza Aditya', url: 'https://rezaditya.me' }],
  creator: 'Reza Aditya',
  publisher: 'Reza Aditya',
  generator: 'Next.js',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://rezaditya.me',
    title: 'Reza Aditya - Full Stack Developer Portfolio',
    description: 'Portfolio profesional Reza Aditya sebagai Full Stack Developer. Spesialisasi dalam Laravel, Next.js, Vue.js, dan teknologi web modern.',
    siteName: 'Reza Aditya Portfolio',
    images: [
      {
        url: '/images/profile.jpeg',
        width: 1200,
        height: 630,
        alt: 'Reza Aditya - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reza Aditya - Full Stack Developer',
    description: 'Portfolio profesional Reza Aditya sebagai Full Stack Developer',
    images: ['/images/profile.jpeg'],
    creator: '@rezaaditya',
  },
  verification: {
    google: 'your-google-verification-code', // Ganti dengan kode verifikasi Google Search Console
  },
  other: {
    'google-site-verification': 'your-verification-code', // Backup verification method
  },
  alternates: {
    canonical: 'https://rezaditya.me',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className='overscroll-none'>
        
        <StructuredData />
        <PerformanceMonitor />
        {children}
      </body>
    </html>
  )
}

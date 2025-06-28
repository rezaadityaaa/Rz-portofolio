import type { Metadata } from 'next'
import './globals.css'

const CACHE_BUSTER = Date.now()

export const metadata: Metadata = {
  metadataBase: new URL('https://rezaditya.me'),
  title: {
    default: 'Reza Aditya - Web Developer | Portfolio',
    template: '%s | Reza Aditya'
  },
  description: 'Portfolio profesional Reza Aditya sebagai Web Developer. Spesialisasi dalam Laravel, Next.js, Vue.js, dan teknologi web modern.',
  keywords: [
    'Reza Aditya',
    'Web Developer',
    'Laravel Developer',
    'Next.js Developer',
    'Vue.js Developer',
    'Portfolio',
    'Developer Indonesia'
  ],
  authors: [{ name: 'Reza Aditya', url: 'https://rezaditya.me' }],
  creator: 'Reza Aditya',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://rezaditya.me',
    title: 'Reza Aditya - Web Developer Portfolio',
    description: 'Portfolio profesional Reza Aditya sebagai Web Developer',
    siteName: 'Reza Aditya Portfolio',
    images: [
      {
        url: '/images/profile.webp',
        width: 1200,
        height: 630,
        alt: 'Reza Aditya - Web Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reza Aditya - Web Developer',
    description: 'Portfolio profesional Reza Aditya sebagai Web Developer',
    images: ['/images/profile.webp'],
  },
  alternates: {
    canonical: 'https://rezaditya.me',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="overscroll-none min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

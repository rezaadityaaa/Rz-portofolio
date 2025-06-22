import type { Metadata } from 'next'
import './globals.css'
import PerformanceMonitor from '@/components/performance-monitor'

export const metadata: Metadata = {
  title: 'Rz.',
  description: 'Created with Love',
  generator: 'reza',

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <PerformanceMonitor />
        {children}
      </body>
    </html>
  )
}

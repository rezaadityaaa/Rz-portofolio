import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}

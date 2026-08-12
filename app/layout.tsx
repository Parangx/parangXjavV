import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MissAV Downloader',
  description: 'Download video dari MissAV dengan mudah',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-dark text-gray-200">
        {children}
      </body>
    </html>
  )
}

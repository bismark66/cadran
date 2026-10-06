import type { Metadata } from 'next'
import { Fraunces, Archivo, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-fraunces', display: 'swap' })
const archivo  = Archivo({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-archivo', display: 'swap' })
const plex     = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://affordablewatchesgh.com'),
  title: 'Affordable Watches Ghana | Curated Luxury & Mechanical Timepieces',
  description: 'Discover Affordable Watches Ghana: accessible luxury and mechanical watches, curated collector catalog, and private ordering from Accra.',
  openGraph: {
    title: 'Affordable Watches Ghana | Curated Luxury & Mechanical Timepieces',
    description: 'Accessible luxury and mechanical watches, curated collector catalog, and private ordering from Accra.',
    url: 'https://affordablewatchesgh.com',
    siteName: 'Affordable Watches Ghana',
    locale: 'en_GH',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Affordable Watches Ghana showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Affordable Watches Ghana | Curated Luxury & Mechanical Timepieces',
    description: 'Accessible luxury and mechanical watches, curated collector catalog, and private ordering from Accra.',
    images: ['/twitter-image'],
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${archivo.variable} ${plex.variable}`}>
      <body>{children}</body>
    </html>
  )
}

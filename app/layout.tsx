import type { Metadata } from 'next'
import { Fraunces, Archivo, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-fraunces', display: 'swap' })
const archivo  = Archivo({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-archivo', display: 'swap' })
const plex     = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://cadrangh.com'),
  title: 'Cadran Ghana | Luxury Mechanical Watches',
  description: 'Discover Cadran Ghana: high-end mechanical watches, curated collector catalog, and private ordering from Accra.',
  openGraph: {
    title: 'Cadran Ghana | Luxury Mechanical Watches',
    description: 'High-end mechanical watches, curated collector catalog, and private ordering from Accra.',
    url: 'https://cadrangh.com',
    siteName: 'Cadran Ghana',
    locale: 'en_GH',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Cadran Ghana luxury watch showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cadran Ghana | Luxury Mechanical Watches',
    description: 'High-end mechanical watches, curated collector catalog, and private ordering from Accra.',
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

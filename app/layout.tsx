import type { Metadata } from 'next'
import { Fraunces, Archivo, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-fraunces', display: 'swap' })
const archivo  = Archivo({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-archivo', display: 'swap' })
const plex     = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex', display: 'swap' })

export const metadata: Metadata = {
  title: 'Cadran — Mechanical watches, made one at a time',
  description: 'Maison Cadran — independent watchmaking in Geneva. Four years to make one watch.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${archivo.variable} ${plex.variable}`}>
      <body>{children}</body>
    </html>
  )
}

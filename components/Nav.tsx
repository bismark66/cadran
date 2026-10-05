'use client'

import type { RefObject } from 'react'
import { useEnquiry } from './EnquiryProvider'

export default function Nav({ navRef }: { navRef: RefObject<HTMLElement | null> }) {
  const { open } = useEnquiry()
  return (
    <nav className="nav" ref={navRef}>
      <a className="brand" href="#top">CADRAN</a>
      <div className="nav-links">
        <a href="#maison">Maison</a>
        <a href="#collector">Collector desk</a>
        <a href="#catalog">Catalog</a>
        <a href="#collection">Collection</a>
        <a href="#calibre">Calibre</a>
        <a href="#contact">Contact</a>
      </div>
      <button className="nav-cta" onClick={() => open({ goal: 'Book private viewing', timeframe: 'Within 30 days' })}>Book a viewing</button>
    </nav>
  )
}

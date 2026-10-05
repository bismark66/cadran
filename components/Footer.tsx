'use client'

import { useEnquiry } from './EnquiryProvider'

export default function Footer() {
  const { open } = useEnquiry()
  return (
    <footer className="footer" id="contact">
      <div className="foot-cta">
        <h2 className="reveal">See it in Accra,<br /><em>or order worldwide.</em></h2>
        <button className="view-link reveal" onClick={() => open({ goal: 'Book private viewing', timeframe: 'Within 30 days' })}>
          Book a private viewing in Accra <span className="arr">→</span>
        </button>
      </div>
      <div className="foot-grid reveal">
        <div><p className="col-label">Atelier</p><p>Airport Residential Area<br />Accra, Ghana</p></div>
        <div><p className="col-label">Email</p>
          <p><a href="mailto:atelier@cadrangh.com">atelier@cadrangh.com</a><br /><a href="mailto:concierge@cadrangh.com">concierge@cadrangh.com</a></p></div>
        <div><p className="col-label">Hours</p><p>Monday – Saturday, 10:00 – 19:00<br />Private visits by appointment</p></div>
      </div>
      <div className="foot-mark-wrap" aria-hidden="true"><div className="foot-mark">CADRAN</div></div>
      <div className="foot-legal">
        <span>© 2026 Cadran Ghana — Crafted in Accra.</span>
        <button onClick={() => scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}>
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}

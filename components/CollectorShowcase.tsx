'use client'

import { useEnquiry } from './EnquiryProvider'

const CURATED = [
  {
    brand: 'Rolex',
    model: 'Day-Date',
    era: '1956',
    line: 'The archetype of formal power dressing in precious metal.',
    photo: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1200&h=1400&fit=crop&auto=format',
  },
  {
    brand: 'Omega',
    model: 'Speedmaster',
    era: '1957',
    line: 'Tool-watch DNA with motorsport geometry and moon-bound credibility.',
    photo: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?q=80&w=1200&h=1400&fit=crop&auto=format',
  },
  {
    brand: 'Cartier',
    model: 'Tank',
    era: '1917',
    line: 'Pure line, Roman numerals, and one of design’s most enduring rectangles.',
    photo: 'https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=1200&h=1400&fit=crop&auto=format',
  },
  {
    brand: 'Patek Philippe',
    model: 'Calatrava',
    era: '1932',
    line: 'Discipline in proportions; the dress-watch standard for collectors.',
    photo: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=1200&h=1400&fit=crop&auto=format',
  },
]

export default function CollectorShowcase() {
  const { open } = useEnquiry()

  return (
    <section className="collector" id="collector">
      <header className="collector-head reveal">
        <p className="sec-label">02 — Collector desk</p>
        <h2>
          Icons that shaped
          <br />
          <em>how time looks on the wrist.</em>
        </h2>
        <p className="collector-note">
          A curated board inspired by classic horology references shared by collectors in Accra, Kumasi, and
          London. Cadran can source comparable pieces and advise on provenance before you order.
        </p>
      </header>

      <div className="collector-grid">
        {CURATED.map((item) => (
          <article className="collector-card reveal" key={item.brand + item.model}>
            <div className="collector-image" style={{ backgroundImage: `url(${item.photo})` }} aria-hidden="true" />
            <div className="collector-body">
              <p className="collector-meta">
                <span>{item.brand}</span>
                <span>{item.era}</span>
              </p>
              <h3>{item.model}</h3>
              <p>{item.line}</p>
              <button
                className="collector-cta"
                onClick={() =>
                  open({
                    model: 'General enquiry',
                    goal: 'Source a classic reference',
                    budget: 'GHS 250k–500k',
                    timeframe: '3–6 months',
                    condition: 'Certified pre-owned',
                  })
                }
              >
                Source one for me <span>→</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <p className="collector-legal">
        Brand names are used for editorial inspiration and reference only. Availability depends on market inventory.
      </p>
    </section>
  )
}

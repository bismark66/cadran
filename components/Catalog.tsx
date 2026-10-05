'use client'

import { useEnquiry } from './EnquiryProvider'

const CATALOG = [
  {
    title: 'Kente Gold Dress',
    subtitle: 'Yellow-gold case · sunburst ivory dial',
    source: 'Inspired by classic Ghanaian collectors’ boards',
    photo: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1800&h=2400&fit=crop&auto=format',
  },
  {
    title: 'Accra Midnight Diver',
    subtitle: 'Black ceramic bezel · 300m rated',
    source: 'Weekend marine line for Labadi and Ada runs',
    photo: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1800&h=2400&fit=crop&auto=format',
  },
  {
    title: 'Volta Green Automatic',
    subtitle: 'Lacquer green dial · brushed steel',
    source: 'Colour study from tropical-light wrist shots',
    photo: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1800&h=2400&fit=crop&auto=format',
  },
  {
    title: 'Cocoa Chronograph',
    subtitle: 'Warm-brown dial · hand-wound movement',
    source: 'Inspired by heritage chronographs in private collections',
    photo: 'https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=1800&h=2400&fit=crop&auto=format',
  },
  {
    title: 'Independence Blue GMT',
    subtitle: 'Dual-time chapter ring · sapphire crystal',
    source: 'Built for cross-Atlantic travel between Accra and London',
    photo: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?q=80&w=1800&h=2400&fit=crop&auto=format',
  },
  {
    title: 'Osu Skeleton Reserve',
    subtitle: 'Open-work bridges · 72-hour reserve',
    source: 'Showpiece references from modern haute-horology feeds',
    photo: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1800&h=2400&fit=crop&auto=format',
  },
]

export default function Catalog() {
  const { open } = useEnquiry()

  return (
    <section className="catalog" id="catalog">
      <header className="catalog-head reveal">
        <p className="sec-label">03 — High-resolution catalog</p>
        <h2>
          Zoom in on finishing.
          <br />
          <em>Every dial, every edge.</em>
        </h2>
        <p>
          Built for collectors in Ghana. Study each watch in high resolution, shortlist your favourites, and request
          private pricing with one click.
        </p>
      </header>

      <div className="catalog-grid">
        {CATALOG.map((item) => (
          <article className="catalog-card reveal" key={item.title}>
            <div className="catalog-image" style={{ backgroundImage: `url(${item.photo})` }} aria-hidden="true" />
            <div className="catalog-copy">
              <h3>{item.title}</h3>
              <p className="catalog-sub">{item.subtitle}</p>
              <p className="catalog-source">{item.source}</p>
              <button
                className="catalog-cta"
                onClick={() =>
                  open({
                    model: 'General enquiry',
                    goal: 'Order a current model',
                    budget: 'GHS 100k–250k',
                    timeframe: '1–3 months',
                    condition: 'Factory new',
                  })
                }
              >
                Add to shortlist <span>→</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

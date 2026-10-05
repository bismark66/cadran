'use client'

import { useEnquiry } from './EnquiryProvider'

export default function OrderRail() {
  const { open } = useEnquiry()

  return (
    <aside className="order-rail" aria-label="Quick order actions">
      <p className="order-rail-label">Accra concierge</p>
      <button
        className="order-pill"
        onClick={() =>
          open({
            goal: 'Order a current model',
            budget: 'GHS 100k–250k',
            timeframe: '1–3 months',
            condition: 'Factory new',
          })
        }
      >
        Order now <span>↗</span>
      </button>
      <button
        className="order-pill"
        onClick={() =>
          open({
            goal: 'Source a classic reference',
            budget: 'GHS 250k–500k',
            timeframe: '3–6 months',
            condition: 'Certified pre-owned',
          })
        }
      >
        Source vintage <span>↗</span>
      </button>
      <button
        className="order-pill"
        onClick={() =>
          open({
            goal: 'Book private viewing',
            timeframe: 'Within 30 days',
          })
        }
      >
        Book salon visit <span>↗</span>
      </button>
    </aside>
  )
}

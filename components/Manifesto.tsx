'use client'

import { Fragment } from 'react'
import type { RefObject } from 'react'
import { useEnquiry } from './EnquiryProvider'

const RAW = 'Affordable Watches is built for Ghana’s next generation of collectors: humid mornings, boardroom afternoons, long nights in Accra. Each watch is assembled *once* — case, calibre, dial — then regulated for daily wear with no compromise. That is our *standard.*'
const WORDS = RAW.split(/\s+/).map((t) => ({ t: t.replace(/\*/g, ''), acc: t.includes('*') }))

export default function Manifesto({ textRef }: { textRef: RefObject<HTMLParagraphElement | null> }) {
  const { open } = useEnquiry()
  return (
    <section className="manifesto" id="maison">
      <p className="sec-label reveal">01 — The House</p>
      <p className="mani-text" ref={textRef}>
        {WORDS.map((w, i) => (
          <Fragment key={i}>
            <span className={'w' + (w.acc ? ' acc' : '')}>{w.t}</span>{' '}
          </Fragment>
        ))}
      </p>
      <div className="mani-foot reveal">
        <p className="dim">Independence Avenue, Accra</p>
        <button className="text-link" onClick={() => open({ goal: 'Book private viewing', timeframe: 'Within 30 days' })}>Plan an Accra visit <span>→</span></button>
      </div>
    </section>
  )
}

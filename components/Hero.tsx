'use client'

import type { RefObject } from 'react'
import WatchPhoto from './WatchPhoto'
import { HERO_WATCH } from '@/lib/watches'

export type IntroPhase = 'pre' | 'in' | 'done'

type Props = {
  phase: IntroPhase
  heroWrapRef: RefObject<HTMLDivElement | null>
  ghostRef: RefObject<HTMLDivElement | null>
  watch3dRef: RefObject<HTMLDivElement | null>
}

export default function Hero({ phase, heroWrapRef, ghostRef, watch3dRef }: Props) {
  const pre = phase === 'pre'
  const fade = ' anim' + (pre ? ' pre-fade' : '')
  const drop = ' anim' + (pre ? ' pre-line' : '')

  return (
    <div className="hero-wrap" ref={heroWrapRef}>
      <section className="hero">
        <div className="ghost" ref={ghostRef} aria-hidden="true">CADRAN</div>
        <p className="watch-tag" aria-hidden="true">Cal. C-232 · 41 mm — drag the watch to inspect</p>

        <p className={'eyebrow' + fade}>Cadran Ghana — Accra · Est. 2016</p>

        <h1 aria-label="Crafted in Accra for collectors worldwide.">
          <span className="mask" aria-hidden="true">
            <span className={'line' + drop} style={{ transitionDelay: '.12s' }}>Crafted in Accra</span>
          </span>
          <span className="mask" aria-hidden="true">
            <span className={'line' + drop} style={{ transitionDelay: '.24s' }}>for collectors</span>
          </span>
          <span className="mask" aria-hidden="true">
            <span className={'line' + drop} style={{ transitionDelay: '.36s' }}><em>worldwide.</em></span>
          </span>
        </h1>

        <div className={'watch-zone' + fade} style={{ transitionDelay: '.5s' }}>
          <div className="watch-persp">
            <div className="watch3d" ref={watch3dRef}>
              <div className="hero-watch">
                <WatchPhoto
                  src={HERO_WATCH.photo}
                  alt={HERO_WATCH.alt}
                  fallback={HERO_WATCH.fallback}
                  frame="blend"
                  priority
                  sizes="(max-width:700px) 80vw, 40vh"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={'cue-wrap' + fade} style={{ transitionDelay: '.85s' }}>
          <div className="cue"><span className="cue-line" /><span>Scroll</span></div>
        </div>

        <div className="hero-foot">
          <p className={'hero-sub' + fade} style={{ transitionDelay: '.65s' }}>
            Cadran builds mechanical watches in Accra with Swiss-tested tolerances, tropical-wear durability,
            and finishing meant to be seen up close in high resolution.
          </p>
          <div className={'hero-links' + fade} style={{ transitionDelay: '.75s' }}>
            <a href="#catalog">Open the high-res catalog ↓</a>
            <a href="#collection">Shop the collection ↓</a>
          </div>
        </div>
      </section>
    </div>
  )
}

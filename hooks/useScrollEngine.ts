'use client'

import { useEffect, type RefObject } from 'react'
import { subscribe } from '@/lib/ticker'

const $ = (s: string, c: ParentNode) => c.querySelector(s) as HTMLElement | null
const $$ = (s: string, c: ParentNode) => [...c.querySelectorAll(s)] as HTMLElement[]
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

type El = RefObject<HTMLElement | null>

export type EngineRefs = {
  root: El; heroWrap: El; ghost: El; watch3d: El
  collWrap: El; collSticky: El; track: El
  nav: El; maniText: El; collIdx: El
}

export function useScrollEngine(
  refs: EngineRefs,
  opts: { introDone: RefObject<boolean>; finishIntro: () => void },
) {
  useEffect(() => {
    const rootEl = refs.root.current
    const heroWrapEl = refs.heroWrap.current
    const ghostEl = refs.ghost.current
    const watch3dEl = refs.watch3d.current
    const collWrapEl = refs.collWrap.current
    const collStickyEl = refs.collSticky.current
    const trackEl = refs.track.current
    const navEl = refs.nav.current
    const maniEl = refs.maniText.current
    const idxEl = refs.collIdx.current

    const missing: string[] = []
    if (!rootEl) missing.push('root')
    if (!heroWrapEl) missing.push('heroWrap')
    if (!ghostEl) missing.push('ghost')
    if (!watch3dEl) missing.push('watch3d')

    if (!rootEl || !heroWrapEl || !ghostEl || !watch3dEl) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Cadran] scroll engine disabled — refs not attached: ${missing.join(', ')}`)
      }
      return
    }

    const heroWatch = $('.hero-watch', rootEl)
    if (!heroWatch) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Cadran] scroll engine disabled — refs not attached: heroWatch (selector .hero-watch)`)
      }
      return
    }

    const lines = $$('.hero .line', rootEl)
    const heroMeta = ['.eyebrow', '.hero-sub', '.hero-links']
      .map((s) => $(s, rootEl))
      .filter((el): el is HTMLElement => !!el)
    const cueWrap = $('.cue-wrap', rootEl)
    const words = maniEl ? $$('.w', maniEl) : []

    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches
    const mqMobile = matchMedia('(max-width:900px)')
    let vh = innerHeight, collMax = 0
    let heroP = 0, heroC = 0, collP = 0, collC = 0
    let mx = 0, my = 0, mxT = 0, myT = 0
    let dragT = 0, dragC = 0, dragging = false, lastX = 0
    let t0 = -1, lastY = scrollY, lastLit = 0

    const measure = () => {
      vh = innerHeight
      if (!trackEl || !collStickyEl || mqMobile.matches) {
        collMax = 0
        return
      }
      collMax = Math.max(0, trackEl.offsetWidth - collStickyEl.clientWidth)
    }
    measure()
    addEventListener('resize', measure)
    const ro = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => measure())
      : null
    if (ro && trackEl && collStickyEl) {
      ro.observe(trackEl)
      ro.observe(collStickyEl)
    }

    const onMove = (e: PointerEvent) => {
      mxT = e.clientX / innerWidth - 0.5
      myT = e.clientY / innerHeight - 0.5
      if (dragging) { const d = e.clientX - lastX; lastX = e.clientX; dragT += d * 0.4 }
    }
    const onDown = (e: PointerEvent) => {
      dragging = true; lastX = e.clientX
      heroWatch.setPointerCapture(e.pointerId)
      heroWatch.classList.add('grabbing')
    }
    const onUp = () => { dragging = false; heroWatch.classList.remove('grabbing') }
    addEventListener('pointermove', onMove, { passive: true })
    heroWatch.addEventListener('pointerdown', onDown)
    addEventListener('pointerup', onUp)

    const applyHero = (p: number, t: number) => {
      /* 1 — staggered masked-line exit (scroll-scrubbed, only after intro) */
      if (opts.introDone.current) {
        for (let i = 0; i < lines.length; i++) {
          const lp = clamp((p * 1.5 - i * 0.09) / 0.55, 0, 1)
          lines[i].style.opacity = (1 - lp).toFixed(3)
          lines[i].style.transform = `translate3d(0,${(-lp * 130).toFixed(2)}%,0) rotate(${(-lp * 4).toFixed(2)}deg)`
        }
        const me = clamp(p / 0.25, 0, 1)
        for (const el of heroMeta) {
          el.style.opacity = (1 - me).toFixed(3)
          el.style.transform = `translate3d(0,${(-me * 36).toFixed(1)}px,0)`
        }
        if (cueWrap) cueWrap.style.opacity = (1 - clamp(p / 0.06, 0, 1)).toFixed(3)
      }

      /* 2 — ghost word */
      const gi = RM ? 1 : easeOut(clamp((t - t0) / 1500, 0, 1))
      const gx = lerp(innerWidth * 0.05, -innerWidth * 0.22, p) + mx * 26
      ghostEl.style.transform = `translate3d(${gx.toFixed(1)}px,-52%,0)`
      ghostEl.style.opacity = (gi * (1 - clamp((p - 0.5) / 0.4, 0, 1))).toFixed(3)

      /* 3 — the watch: scroll turn + pointer tilt + idle float + drag spin */
      const t1 = easeOut(clamp(p / 0.55, 0, 1))
      if (!dragging) dragT *= 0.95
      dragC += (dragT - dragC) * 0.16
      const ry = lerp(-26, 0, t1) + mx * 7 + dragC
      const rx = lerp(10, 0, t1) - my * 5
      const sc = lerp(0.95, 1.06, easeOut(p))
      const fl = RM ? 0 : Math.sin(t / 1300) * 5
      watch3dEl.style.transform =
        `translate3d(0,${fl.toFixed(1)}px,0) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${sc.toFixed(3)})`
    }

    const frame = (t: number) => {
      if (t0 < 0) t0 = t

      /* READ */
      const hr = heroWrapEl.getBoundingClientRect()
      heroP = clamp(-hr.top / Math.max(1, hr.height - vh), 0, 1)
      if (collWrapEl) {
        const cr = collWrapEl.getBoundingClientRect()
        collP = clamp(-cr.top / Math.max(1, cr.height - vh), 0, 1)
      } else {
        collP = 0
      }
      const maniR = maniEl ? maniEl.getBoundingClientRect() : null

      if (!opts.introDone.current && (scrollY > 40 || heroP > 0.02)) opts.finishIntro()

      /* LERP */
      heroC += (heroP - heroC) * (RM ? 1 : 0.09)
      collC += (collP - collC) * (RM ? 1 : 0.10)
      mx += (mxT - mx) * 0.06
      my += (myT - my) * 0.06

      /* WRITE */
      applyHero(heroC, t)

      if (!mqMobile.matches && collMax > 0 && trackEl) {
        trackEl.style.transform = `translate3d(${(-collC * collMax).toFixed(1)}px,0,0)`
        if (idxEl) {
          const s = String(clamp(Math.round(collC * 3) + 1, 1, 4)).padStart(2, '0')
          if (idxEl.textContent !== s) idxEl.textContent = s
        }
      }

      if (maniR && maniR.bottom > -60 && maniR.top < vh + 60) {
        const p = clamp((vh * 0.85 - maniR.top) / (maniR.height + vh * 0.35), 0, 1)
        const lit = Math.round(p * words.length)
        if (lit !== lastLit) {
          words.forEach((w, i) => w.classList.toggle('on', i < lit))
          lastLit = lit
        }
      }

      if (navEl && Math.abs(scrollY - lastY) > 4) {
        navEl.classList.toggle('hidden', scrollY > lastY && scrollY > 160)
        lastY = scrollY
      }
    }

    const unsub = subscribe(frame)
    return () => {
      unsub()
      removeEventListener('resize', measure)
      ro?.disconnect()
      removeEventListener('pointermove', onMove)
      removeEventListener('pointerup', onUp)
      heroWatch.removeEventListener('pointerdown', onDown)
    }
  }, [refs, opts])
}

'use client'

import { useEffect, useId, useRef, type ReactNode } from 'react'
import { subscribe } from '@/lib/ticker'

type Palette = {
  dialHi: string; dialLo: string; index: string; hand: string; second: string
  text: string; track: string; strapHi: string; strapLo: string; stitch: string; bezel: string
}

const PAL = {
  onyx:   { dialHi:'#242017', dialLo:'#0a0906', index:'#c8a566', hand:'#c8a566', second:'#b04430', text:'#d8cdb4', track:'#cfc4a8', strapHi:'#251e14', strapLo:'#15100a', stitch:'#8f7645', bezel:'#3f382a' },
  ivoire: { dialHi:'#f3ecdb', dialLo:'#dcd0b3', index:'#2b2620', hand:'#2b2620', second:'#a63b28', text:'#2b2620', track:'#4a4234', strapHi:'#7a5c39', strapLo:'#5c4327', stitch:'#e4d5b2', bezel:'#9a8f78' },
  foret:  { dialHi:'#1e2c22', dialLo:'#0a100b', index:'#c8a566', hand:'#d6d2c4', second:'#c8a566', text:'#d3cebd', track:'#cfc9b8', strapHi:'#20261f', strapLo:'#10140f', stitch:'#8f7645', bezel:'#2e3a30' },
  fumee:  { dialHi:'#413d37', dialLo:'#1c1a17', index:'#e6ddc9', hand:'#e6ddc9', second:'#c8a566', text:'#e6ddc9', track:'#e6ddc9', strapHi:'#1b1712', strapLo:'#0f0d0a', stitch:'#7d6a4d', bezel:'#514b41' },
} satisfies Record<string, Palette>

export type WatchVariant = keyof typeof PAL

const SERIF = { fontFamily: 'var(--serif)' }
const MONO  = { fontFamily: 'var(--mono)' }

export default function Watch({ variant }: { variant: WatchVariant }) {
  const v = PAL[variant]
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')

  const hour = useRef<SVGGElement>(null)
  const minute = useRef<SVGGElement>(null)
  const second = useRef<SVGGElement>(null)

  /* sweeping mechanical seconds — this instance's hands only */
  useEffect(() => subscribe(() => {
    const n = new Date()
    const s = n.getSeconds() + n.getMilliseconds() / 1000
    const m = n.getMinutes() + s / 60
    const h = n.getHours() % 12 + m / 60
    if (second.current) second.current.style.transform = `rotate(${(s * 6).toFixed(2)}deg)`
    if (minute.current) minute.current.style.transform = `rotate(${(m * 6).toFixed(2)}deg)`
    if (hour.current)   hour.current.style.transform   = `rotate(${(h * 30).toFixed(2)}deg)`
  }), [])

  const ticks: ReactNode[] = []
  for (let i = 0; i < 60; i++) {
    if (i % 5 === 0) continue
    ticks.push(<line key={i} x1="180" y1="151.5" x2="180" y2="158" transform={`rotate(${i * 6} 180 280)`} />)
  }
  const bats: ReactNode[] = []
  for (let i = 1; i <= 12; i++) {
    if (i === 12) {
      bats.push(
        <g key={i}>
          <rect x="-7.4" y="-124" width="5.1" height="21" rx="1" />
          <rect x="2.3" y="-124" width="5.1" height="21" rx="1" />
        </g>,
      )
    } else {
      bats.push(<rect key={i} x="-2.55" y="-124" width="5.1" height="21" rx="1" transform={`rotate(${i * 30})`} />)
    }
  }

  return (
    <svg className="watch-svg" viewBox="0 0 360 560" role="img"
         aria-label="Affordable Watches wristwatch showing the current time">
      <defs>
        <linearGradient id={`m${uid}`} x1="40" y1="120" x2="320" y2="440" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#57503c" /><stop offset="0.5" stopColor="#211d14" /><stop offset="1" stopColor="#4b4432" />
        </linearGradient>
        <radialGradient id={`d${uid}`} cx="38%" cy="30%" r="90%">
          <stop offset="0" stopColor={v.dialHi} /><stop offset="1" stopColor={v.dialLo} />
        </radialGradient>
        <linearGradient id={`s${uid}`} x1="0" y1="0" x2="0" y2="560" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={v.strapHi} /><stop offset="1" stopColor={v.strapLo} />
        </linearGradient>
        <filter id={`f${uid}`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.6" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* straps */}
      <path d="M150 0 L210 0 L219 152 L141 152 Z" fill={`url(#s${uid})`} />
      <path d="M157 8 L164 148" stroke={v.stitch} strokeWidth="1.1" strokeDasharray="3.5 4" opacity=".55" fill="none" />
      <path d="M203 8 L196 148" stroke={v.stitch} strokeWidth="1.1" strokeDasharray="3.5 4" opacity=".55" fill="none" />
      <path d="M143 406 L217 406 L227 560 L133 560 Z" fill={`url(#s${uid})`} />
      <path d="M150 414 L159 556" stroke={v.stitch} strokeWidth="1.1" strokeDasharray="3.5 4" opacity=".55" fill="none" />
      <path d="M210 414 L201 556" stroke={v.stitch} strokeWidth="1.1" strokeDasharray="3.5 4" opacity=".55" fill="none" />
      <g fill="rgba(0,0,0,.55)" stroke={v.stitch} strokeOpacity=".35">
        <circle cx="180" cy="472" r="3.2" /><circle cx="180" cy="500" r="3.2" /><circle cx="180" cy="528" r="3.2" />
      </g>

      {/* crown */}
      <rect x="327" y="265" width="21" height="30" rx="7" fill={`url(#m${uid})`} stroke="rgba(0,0,0,.45)" />
      <path d="M334 269v22M340 267v26M346 269v22" stroke="rgba(0,0,0,.4)" strokeWidth="1.4" />

      {/* case, bezel, dial */}
      <circle cx="180" cy="280" r="152" fill={`url(#m${uid})`} />
      <circle cx="180" cy="280" r="152" fill="none" stroke="rgba(0,0,0,.5)" />
      <circle cx="180" cy="280" r="145" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1.4" />
      <circle cx="180" cy="280" r="139" fill={v.bezel} />
      <circle cx="180" cy="280" r="133.5" fill={`url(#d${uid})`} stroke="rgba(0,0,0,.55)" />

      {/* minute track + applied indices */}
      <g stroke={v.track} strokeWidth="1" opacity=".5">{ticks}</g>
      <g transform="translate(180 280)" fill={v.index}>{bats}</g>

      {/* dial text */}
      <text x="181" y="224" textAnchor="middle" fontSize="8.2" letterSpacing="2" fill={v.text} style={SERIF}>AFFORDABLE WATCHES</text>
      <text x="180.5" y="241" textAnchor="middle" fontSize="6.4" letterSpacing="3.2" fill={v.text} opacity=".72" style={MONO}>AUTOMATIQUE</text>
      <text x="180.5" y="352" textAnchor="middle" fontSize="6.4" letterSpacing="2.6" fill={v.text} opacity=".5" style={MONO}>GENEVE · 72H</text>

      {/* glass */}
      <ellipse cx="147" cy="216" rx="62" ry="40" fill="#ffffff" opacity=".05" transform="rotate(-27 147 216)" />

      {/* hands — rotated live via refs */}
      <g filter={`url(#f${uid})`}>
        <g className="hand-h" ref={hour}>
          <path d="M180 210 L186.6 271 L180 295 L173.4 271 Z" fill={v.hand} />
          <path d="M180 215 L180 289" stroke="rgba(0,0,0,.35)" strokeWidth="1.1" />
        </g>
        <g className="hand-m" ref={minute}>
          <path d="M180 163 L185.2 273 L180 296 L174.8 273 Z" fill={v.hand} />
          <path d="M180 170 L180 290" stroke="rgba(0,0,0,.35)" strokeWidth="1" />
        </g>
        <g className="hand-s" ref={second}>
          <line x1="180" y1="310" x2="180" y2="159" stroke={v.second} strokeWidth="2.2" />
          <circle cx="180" cy="299" r="4.2" fill={v.second} />
        </g>
      </g>
      <circle cx="180" cy="280" r="5.4" fill={v.hand} stroke="rgba(0,0,0,.4)" />
      <circle cx="180" cy="280" r="2" fill="#0d0b08" />
    </svg>
  )
}

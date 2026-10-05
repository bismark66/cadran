'use client'

import Image from 'next/image'
import { useState } from 'react'
import Watch, { type WatchVariant } from './Watch'

type Props = {
  src?: string
  alt: string
  fallback: WatchVariant
  frame?: 'blend' | 'arch'
  sizes?: string
  priority?: boolean
}

export default function WatchPhoto({ src, alt, fallback, frame = 'blend', sizes, priority }: Props) {
  const [dead, setDead] = useState(false)

  /* photo missing or dead URL → silently hand back the hand-drawn watch */
  if (!src || dead) return <Watch variant={fallback} />

  return (
    <div className={`watch-photo ${frame}`}>
      <Image
        src={src}
        alt={alt}
        fill
        onError={() => setDead(true)}
        sizes={sizes ?? '(max-width:900px) 88vw, 38vw'}
        priority={priority}
      />
    </div>
  )
}

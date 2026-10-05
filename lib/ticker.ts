type Cb = (t: number) => void

const subs = new Set<Cb>()
let rafId = 0

function loop(t: number) {
  subs.forEach((cb) => cb(t))
  rafId = requestAnimationFrame(loop)
}

export function subscribe(cb: Cb): () => void {
  subs.add(cb)
  if (subs.size === 1) rafId = requestAnimationFrame(loop)
  return () => {
    subs.delete(cb)
    if (subs.size === 0) cancelAnimationFrame(rafId)
  }
}

import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 64px',
          background:
            'radial-gradient(circle at 78% 22%, rgba(194,161,94,.28), transparent 44%), linear-gradient(140deg, #100d09 0%, #1b160f 56%, #0d0b08 100%)',
          color: '#efe8d9',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: 8, textTransform: 'uppercase', opacity: 0.86 }}>
          CADRAN GHANA
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 880 }}>
          <div style={{ fontSize: 88, lineHeight: 1.02 }}>Luxury Mechanical Watches</div>
          <div style={{ fontSize: 34, lineHeight: 1.25, opacity: 0.9 }}>
            High-res catalog • Collector concierge • Private ordering from Accra
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 24, letterSpacing: 4, textTransform: 'uppercase', opacity: 0.76 }}>
          Crafted in Accra
        </div>
      </div>
    ),
    size,
  )
}

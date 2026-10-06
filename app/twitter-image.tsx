import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 600 }
export const contentType = 'image/png'

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '52px 60px',
          background:
            'radial-gradient(circle at 84% 16%, rgba(194,161,94,.24), transparent 42%), linear-gradient(145deg, #0e0c09 0%, #19150f 58%, #0b0a08 100%)',
          color: '#efe8d9',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 22, letterSpacing: 5, textTransform: 'uppercase', opacity: 0.86 }}>
          Affordable Watches Ghana
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 860 }}>
          <div style={{ fontSize: 74, lineHeight: 1.05 }}>Luxury Mechanical Watches</div>
          <div style={{ fontSize: 30, lineHeight: 1.22, opacity: 0.9 }}>
            High-res catalog and private ordering experience
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 22, letterSpacing: 3, textTransform: 'uppercase', opacity: 0.76 }}>
          Accra • Ghana
        </div>
      </div>
    ),
    size,
  )
}

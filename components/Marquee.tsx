const ITEMS = ['Accra assembly', 'Hand-bevelled bridges', '72-hour reserve', 'In-house calibre C-232',
  '100m water resistance', 'Double-domed sapphire', 'Collector concierge']

export default function Marquee() {
  const half = (k: string) => (
    <div className="m-half" key={k}>
      {ITEMS.map((t) => <span className="m-item" key={t}>{t}</span>)}
    </div>
  )
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-inner">{half('a')}{half('b')}</div>
    </div>
  )
}

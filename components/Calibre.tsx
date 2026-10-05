const ROWS = [
  { n: 232, prefix: '', unit: '', desc: 'Components in each calibre, hand-checked before final casing in Accra.' },
  { n: 72, prefix: '', unit: 'hrs', desc: 'Power reserve tuned for long weekends without losing beat stability.' },
  { n: 28800, prefix: '', unit: 'vph', desc: '4Hz frequency for clean sweep motion and dependable daily timekeeping.' },
  { n: 2, prefix: '±', unit: 'sec', desc: 'Daily deviation target after six-position regulation and burn-in testing.' },
]

export default function Calibre() {
  return (
    <section className="craft" id="calibre">
      <header className="craft-head reveal">
        <div>
          <p className="sec-label">05 — The Calibre</p>
          <h2>The movement,<br /><em>measured honestly.</em></h2>
        </div>
        <p className="craft-note">Calibre C-232 is assembled in Accra, then pressure-tested and regulated for West African climate and daily city wear.</p>
      </header>
      <div className="craft-rows">
        {ROWS.map((r, i) => (
          <div className="row reveal" key={i}>
            <span className="num" data-count={r.n} data-prefix={r.prefix}>0</span>
            {r.unit && <span className="unit">{r.unit}</span>}
            <p className="desc">{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

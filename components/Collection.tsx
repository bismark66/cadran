"use client";

import type { RefObject } from "react";
import WatchPhoto from "./WatchPhoto";
import { MODELS } from "@/lib/watches";
import { useEnquiry } from "./EnquiryProvider";

const SPECS = [
  "Cal. C-232 · manual wind",
  "39 mm · 316L steel",
  "72 h reserve",
  "100 m water resistance",
];

export default function Collection({
  wrapRef,
  stickyRef,
  trackRef,
  idxRef,
}: {
  wrapRef: RefObject<HTMLDivElement | null>;
  stickyRef: RefObject<HTMLElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  idxRef: RefObject<HTMLSpanElement | null>;
}) {
  const { open } = useEnquiry();
  return (
    <div className="coll-wrap" id="collection" ref={wrapRef}>
      <section className="coll" ref={stickyRef}>
        <header className="coll-head">
          <div>
            <p className="sec-label">04 — The Collection</p>
            <p className="coll-tag">Four signatures, one Ghana-built calibre.</p>
          </div>
          <p className="coll-count">
            <span ref={idxRef}>01</span>
            <span className="dim"> / 04</span>
          </p>
        </header>

        <div className="coll-track" ref={trackRef}>
          {MODELS.map((m) => (
            <article className="panel" key={m.name}>
              <div className="panel-edge" aria-hidden="true">
                Edition {m.idx}
              </div>

              <div className="panel-main">
                <div className="panel-watch">
                  <div className="panel-viewport">
                    <WatchPhoto
                      src={m.photo}
                      alt={m.alt}
                      fallback={m.fallback}
                      frame="arch"
                    />
                  </div>
                </div>

                <div className="panel-copy">
                  <p className="panel-tagline">Accra atelier release</p>
                  <h3>
                    Cadran <em>{m.name}</em>
                  </h3>
                  <p className="panel-desc">{m.blurb}</p>
                  <ul className="specs">
                    {SPECS.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <div className="panel-foot">
                    <span className="price">{m.price}</span>
                    <button className="enquire" onClick={() => open({ model: m.name, goal: 'Order a current model' })}>
                      Enquire <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

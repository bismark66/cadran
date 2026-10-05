"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Nav from "./Nav";
import Hero, { type IntroPhase } from "./Hero";
import CollectorShowcase from "./CollectorShowcase";
import Catalog from "./Catalog";
import OrderRail from "./OrderRail";
import Manifesto from "./Manifesto";
import Marquee from "./Marquee";
import Collection from "./Collection";
import Calibre from "./Calibre";
import Footer from "./Footer";
import EnquiryProvider from "./EnquiryProvider";
import { useScrollEngine } from "@/hooks/useScrollEngine";

export default function Site() {
  const mainRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const heroWrapRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const watch3dRef = useRef<HTMLDivElement>(null);
  const maniTextRef = useRef<HTMLParagraphElement>(null);
  const collWrapRef = useRef<HTMLDivElement>(null);
  // const collStickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const collIdxRef = useRef<HTMLSpanElement>(null);
  const introDoneRef = useRef(false);
  const collStickyRef = useRef<HTMLElement>(null);

  const [phase, setPhase] = useState<IntroPhase>("pre");

  const finishIntro = useCallback(() => {
    if (introDoneRef.current) return;
    introDoneRef.current = true;
    document.body.classList.add("intro-done");
    setPhase("done");
  }, []);

  /* entrance: start when fonts are ready (800ms fallback) */
  useEffect(() => {
    let alive = true;
    const begin = () =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (alive) setPhase((p) => (p === "pre" ? "in" : p));
        }),
      );
    document.fonts?.ready.then(begin);
    const t = window.setTimeout(begin, 800);
    return () => {
      alive = false;
      window.clearTimeout(t);
    };
  }, []);

  /* entrance: hard-stop fallback so scrub never fights the transitions */
  useEffect(() => {
    if (phase !== "in") return;
    const t = window.setTimeout(finishIntro, 2200);
    return () => window.clearTimeout(t);
  }, [phase, finishIntro]);

  /* scroll engine — memoized so its effect runs exactly once */
  const refs = useMemo(
    () => ({
      root: mainRef,
      heroWrap: heroWrapRef,
      ghost: ghostRef,
      watch3d: watch3dRef,
      collWrap: collWrapRef,
      collSticky: collStickyRef,
      track: trackRef,
      nav: navRef,
      maniText: maniTextRef,
      collIdx: collIdxRef,
    }),
    [],
  );
  const opts = useMemo(
    () => ({ introDone: introDoneRef, finishIntro }),
    [finishIntro],
  );
  useScrollEngine(refs, opts);

  /* reveals + count-ups — one observer pair for the whole page */
  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    root.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    const fmt = (v: number) =>
      String(v).replace(/\B(?=(\d{3})+(?!\d))/g, "\u2009");
    const io2 = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = +(el.dataset.count ?? 0);
          const prefix = el.dataset.prefix ?? "";
          const t0 = performance.now();
          const step = (t: number) => {
            const k = Math.min(1, (t - t0) / 1600);
            el.textContent =
              prefix + fmt(Math.round(target * (1 - Math.pow(1 - k, 4))));
            if (k < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io2.unobserve(el);
        }),
      { threshold: 0.6 },
    );
    root
      .querySelectorAll<HTMLElement>(".num[data-count]")
      .forEach((el) => io2.observe(el));

    return () => {
      io.disconnect();
      io2.disconnect();
    };
  }, []);

  return (
    <EnquiryProvider>
      <div className="grain" aria-hidden="true" />
      <OrderRail />
      <main id="top" ref={mainRef}>
        <Nav navRef={navRef} />
        <Hero
          phase={phase}
          heroWrapRef={heroWrapRef}
          ghostRef={ghostRef}
          watch3dRef={watch3dRef}
        />
        <CollectorShowcase />
        <Catalog />
        <Manifesto textRef={maniTextRef} />
        <Marquee />
        {/* <Collection trackRef={trackRef} idxRef={collIdxRef} /> */}
        <Collection
          wrapRef={collWrapRef}
          stickyRef={collStickyRef}
          trackRef={trackRef}
          idxRef={collIdxRef}
        />
        <Calibre />
        <Footer />
      </main>
    </EnquiryProvider>
  );
}

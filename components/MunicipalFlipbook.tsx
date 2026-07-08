"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  type ReactNode,
} from "react";
import HTMLFlipBook from "react-pageflip";
import {
  MUNI_TOTAL_PAGES,
  MUNI_CHAPTERS,
} from "@/app/municipalities/content";
import { MUNI_PAGE_COMPONENTS } from "@/components/municipal/MunicipalPages";

/* Letter ratio: 8.5 × 11 — sheets are authored at 816 × 1056 px */
const SHEET_W = 816;
const SHEET_H = 1056;
const RATIO = SHEET_W / SHEET_H;

/* ---------- icons (shared look with the main flipbook) ---------- */
const Icon = {
  prev: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
  ),
  next: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
  ),
  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></svg>
  ),
  expand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M16 3h3a2 2 0 0 1 2 2v3" /><path d="M8 21H5a2 2 0 0 1-2-2v-3" /><path d="M16 21h3a2 2 0 0 0 2-2v-3" /></svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
  ),
};

/* ---------- a single page: a live sheet scaled to fit the book ---------- */
const Page = forwardRef<
  HTMLDivElement,
  { side: "left" | "right"; scale: number; hard?: boolean; children: ReactNode }
>(({ side, scale, hard = false, children }, ref) => (
  <div
    className={`page page--${side}`}
    ref={ref}
    data-density={hard ? "hard" : "soft"}
    style={{ position: "relative" }}
  >
    <div className="muni-scale" style={{ transform: `scale(${scale})` }}>
      {children}
    </div>
  </div>
));
Page.displayName = "Page";

type FlipApi = {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    flip: (page: number) => void;
    turnToPage: (page: number) => void;
    getCurrentPageIndex: () => number;
  };
};

export default function MunicipalFlipbook() {
  const bookRef = useRef<FlipApi | null>(null);
  const [size, setSize] = useState<{ w: number; h: number; portrait: boolean } | null>(null);
  const [current, setCurrent] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [showHint, setShowHint] = useState(true);

  /* compute page pixel size from viewport (letter ratio, not square) */
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const chrome = 60;
      const toolbar = vw <= 720 ? 64 : 76;
      const availH = vh - chrome - toolbar - 28;
      const portrait = vw <= 820;

      let h: number;
      if (portrait) {
        h = Math.min(availH, (vw * 0.94) / RATIO, 860);
      } else {
        h = Math.min(availH, (vw * 0.92) / 2 / RATIO, 820);
      }
      h = Math.max(320, Math.floor(h));
      const w = Math.floor(h * RATIO);
      setSize({ w, h, portrait });
    };
    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("orientationchange", compute);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("orientationchange", compute);
    };
  }, []);

  const goNext = useCallback(() => bookRef.current?.pageFlip()?.flipNext(), []);
  const goPrev = useCallback(() => bookRef.current?.pageFlip()?.flipPrev(), []);
  const goTo = useCallback((page1: number) => {
    // flip() stalls when jumping from a hard cover across soft pages — jump directly
    bookRef.current?.pageFlip()?.turnToPage(page1 - 1);
    setDrawerOpen(false);
  }, []);

  /* keyboard nav */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") goNext();
      else if (e.key === "ArrowLeft" || e.key === "PageUp") goPrev();
      else if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  /* open to a page from URL hash (#page=N) */
  useEffect(() => {
    if (!ready) return;
    const m = window.location.hash.match(/page=(\d+)/);
    if (m) {
      const p = Math.min(MUNI_TOTAL_PAGES, Math.max(1, parseInt(m[1], 10)));
      if (p > 1) setTimeout(() => goTo(p), 150);
    }
  }, [ready, goTo]);

  /* hide the swipe hint after a moment */
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4200);
    return () => clearTimeout(t);
  }, []);

  /* reveal the book once it has mounted with a computed size */
  useEffect(() => {
    if (!size) return;
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, [size]);

  const onFlip = useCallback((e: { data: number }) => {
    setCurrent(e.data);
    setShowHint(false);
    const page1 = e.data + 1;
    history.replaceState(null, "", page1 > 1 ? `#page=${page1}` : " ");
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = document.documentElement;
    if (!document.fullscreenElement) el.requestFullscreen?.();
    else document.exitFullscreen?.();
  }, []);

  const activeChapter = useMemo(() => {
    const page1 = current + 1;
    let best = MUNI_CHAPTERS[0];
    for (const c of MUNI_CHAPTERS) if (c.page <= page1) best = c;
    return best.label;
  }, [current]);

  const counterLabel = useMemo(() => {
    if (size?.portrait) return `${current + 1}`;
    if (current === 0) return "1";
    if (current >= MUNI_TOTAL_PAGES - 1) return `${MUNI_TOTAL_PAGES}`;
    const right = Math.min(current + 1, MUNI_TOTAL_PAGES);
    return `${current}–${right}`;
  }, [current, size]);

  const scale = size ? size.w / SHEET_W : 1;
  const thumbScale = 168 / SHEET_W;

  return (
    <div className="app">
      {/* Top bar */}
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" style={{ width: "auto" }} aria-hidden>
            <BrandMark />
          </span>
          <span className="brand-name">
            <b>Nationwide Haul</b>
            <span>Government Fleet Solutions</span>
          </span>
        </div>
        <div className="topbar-actions">
          <a className="btn" href="/nh-municipal-catalog.pdf" download>
            {Icon.download}
            <span className="label-sm">Download PDF</span>
          </a>
          <button className="btn icon" onClick={toggleFullscreen} aria-label="Fullscreen" title="Fullscreen">
            {Icon.expand}
          </button>
        </div>
      </header>

      {/* Stage */}
      <div className="stage">
        {!ready && (
          <div className="loader">
            <div className="spinner" />
          </div>
        )}

        {size && (
          <>
            <button
              className="nav-arrow left"
              onClick={goPrev}
              disabled={current === 0}
              aria-label="Previous page"
            >
              {Icon.prev}
            </button>

            <div className="book-wrap" style={{ opacity: ready ? 1 : 0 }}>
              {/* @ts-expect-error react-pageflip types lag behind React 19 */}
              <HTMLFlipBook
                ref={bookRef}
                width={size.w}
                height={size.h}
                size="fixed"
                minWidth={240}
                maxWidth={1000}
                minHeight={310}
                maxHeight={1300}
                showCover
                usePortrait={size.portrait}
                mobileScrollSupport
                maxShadowOpacity={0.35}
                flippingTime={900}
                drawShadow
                showPageCorners
                disableFlipByClick
                startPage={0}
                onFlip={onFlip}
                onInit={() => setReady(true)}
                className="nh-book"
                style={{}}
              >
                {MUNI_PAGE_COMPONENTS.map((p, i) => (
                  <Page key={p.n} side={i % 2 === 0 ? "right" : "left"} scale={scale}>
                    <p.Component />
                  </Page>
                ))}
              </HTMLFlipBook>
            </div>

            <button
              className="nav-arrow right"
              onClick={goNext}
              disabled={current >= MUNI_TOTAL_PAGES - 1}
              aria-label="Next page"
            >
              {Icon.next}
            </button>

            {showHint && ready && (
              <div className="hint">
                {size.portrait ? "Swipe or tap edges to turn pages" : "Click page edges or use ← → to navigate"}
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom toolbar */}
      <footer className="toolbar">
        <div className="chapters">
          {MUNI_CHAPTERS.map((c) => (
            <button
              key={c.label}
              className={`chip ${activeChapter === c.label ? "active" : ""}`}
              onClick={() => goTo(c.page)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="counter">
          <button className="btn icon" onClick={goPrev} disabled={current === 0} aria-label="Previous">
            {Icon.prev}
          </button>
          <span className="num">
            {counterLabel} <small>/ {MUNI_TOTAL_PAGES}</small>
          </span>
          <button className="btn icon" onClick={goNext} disabled={current >= MUNI_TOTAL_PAGES - 1} aria-label="Next">
            {Icon.next}
          </button>
          <button className="btn icon" onClick={() => setDrawerOpen(true)} aria-label="All pages" title="All pages">
            {Icon.grid}
          </button>
        </div>
      </footer>

      {/* Thumbnail drawer — live mini renders of each sheet */}
      <div
        className={`drawer-backdrop ${drawerOpen ? "open" : ""}`}
        onClick={() => setDrawerOpen(false)}
      />
      <aside className={`drawer ${drawerOpen ? "open" : ""}`} aria-hidden={!drawerOpen}>
        <div className="drawer-head">
          <h3>All Pages</h3>
          <button className="btn icon" onClick={() => setDrawerOpen(false)} aria-label="Close">
            {Icon.close}
          </button>
        </div>
        <div className="thumb-grid">
          {MUNI_PAGE_COMPONENTS.map((p) => {
            const isActive = p.n === current + 1 || p.n === current + 2;
            return (
              <button
                key={p.n}
                className={`thumb muni-thumb ${isActive ? "active" : ""}`}
                onClick={() => goTo(p.n)}
                title={p.title}
              >
                <span className="muni-thumb-scale" style={{ transform: `scale(${thumbScale})` }}>
                  <p.Component />
                </span>
                <span className="badge">{p.n}</span>
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}

function BrandMark() {
  return (
    <img
      src="/municipal/nh-white.png"
      alt="Nationwide Haul"
      style={{ height: 26, width: "auto", display: "block" }}
    />
  );
}

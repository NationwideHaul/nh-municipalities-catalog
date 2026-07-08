"use client";

/**
 * NH Municipal Fleet Catalog — one component per catalog page.
 * Every sheet is a fixed 816 × 1056 px canvas (8.5" × 11" @ 96dpi) so the
 * flipbook (scaled) and the print/PDF route (1:1) render identically.
 * All copy comes from app/municipalities/content.ts.
 */

import type { ReactNode, SyntheticEvent } from "react";
import {
  COVER,
  WHY,
  EQUIPMENT,
  OEM_LOGOS,
  PROGRAMS,
  BENEFITS,
  PURCHASE,
  TRUSTED,
  BACK,
  type EquipmentUnit,
} from "@/app/municipalities/content";

/* ---------- shared bits ---------- */

/** Keep clicks on interactive elements from reaching the page-flip engine. */
const stopFlip = {
  onMouseDown: (e: SyntheticEvent) => e.stopPropagation(),
  onMouseUp: (e: SyntheticEvent) => e.stopPropagation(),
  onTouchStart: (e: SyntheticEvent) => e.stopPropagation(),
  onTouchEnd: (e: SyntheticEvent) => e.stopPropagation(),
  onClick: (e: SyntheticEvent) => e.stopPropagation(),
};

/** Renders copy: [bracketed placeholders] get a visible highlight,
 *  **double-starred phrases** render bold. */
function Copy({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]*\]|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("[") && p.endsWith("]")) {
          return (
            <mark className="muni-todo" key={i}>
              {p}
            </mark>
          );
        }
        if (p.startsWith("**") && p.endsWith("**")) {
          return (
            <strong className="muni-bold" key={i}>
              {p.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

/** Block-level placeholder (photo slots, unconfirmed sections). */
function TodoBlock({ text, tall = false }: { text: string; tall?: boolean }) {
  return (
    <div className={`muni-todo-block ${tall ? "tall" : ""}`}>
      <span>{text}</span>
    </div>
  );
}

/** Real Nationwide Haul logo. light = white version for dark pages. */
function NHLogo({ light = false }: { light?: boolean }) {
  return (
    <img
      className="muni-nh-logo"
      src={light ? "/municipal/nh-white.png" : "/municipal/nh-black.png"}
      alt="Nationwide Haul"
    />
  );
}

/** Fixed-size letter sheet. dark = cover pages. */
function Sheet({ dark = false, children }: { dark?: boolean; children: ReactNode }) {
  return <div className={`muni-sheet ${dark ? "muni-dark" : "muni-light"}`}>{children}</div>;
}

/** Wine-red footer band on every interior page: NH logo + page number only. */
function PageFooter({ n }: { n: number }) {
  return (
    <footer className="muni-footer">
      <span className="muni-footer-mark">
        <NHLogo light />
      </span>
      <span className="muni-footer-num">{n}</span>
    </footer>
  );
}

function PageHead({ eyebrow, headline }: { eyebrow: string; headline: string }) {
  return (
    <header className="muni-head">
      <span className="muni-eyebrow">{eyebrow}</span>
      <h2 className="muni-headline">{headline}</h2>
    </header>
  );
}

/* ---------- Page 1 — Cover (dark) ---------- */

export function CoverPage() {
  return (
    <Sheet dark>
      <div className="muni-cover">
        <div className="muni-cover-top">
          <span className="muni-cover-logo">
            <NHLogo light />
          </span>
          <span className="muni-cover-eyebrow">{COVER.eyebrow}</span>
        </div>

        <h1 className="muni-cover-display" aria-label={COVER.titleLines.join(" ")}>
          <span className="muni-display-outline">{COVER.titleLines[0]}</span>
          <span className="muni-display-solid">{COVER.titleLines[1]}</span>
          <span className="muni-display-red">{COVER.titleLines[2]}</span>
        </h1>

        <div className="muni-cover-photo">
          <img src={COVER.photo} alt="Tipper trailer" />
        </div>

        <p className="muni-cover-tagline">{COVER.tagline}</p>
      </div>
      <div className="muni-cover-slash" aria-hidden />
      <div className="muni-cover-foot">{COVER.foot}</div>
    </Sheet>
  );
}

/* ---------- Page 2 — Why Nationwide Haul ---------- */

export function WhyPage() {
  return (
    <Sheet>
      <div className="muni-content">
        <PageHead eyebrow={WHY.eyebrow} headline={WHY.headline} />
        <div className="muni-body">
          {WHY.body.map((p, i) => (
            <p key={i}>
              <Copy text={p} />
            </p>
          ))}
        </div>

        {/* Miami-Dade custom chassis video — playable in the flipbook, static in print */}
        <div className="muni-video">
          <div className="muni-video-embed">
            <iframe
              src={WHY.video.embed}
              title={WHY.video.caption}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <a className="muni-video-print" href={WHY.video.url}>
            <img src={WHY.video.thumb} alt={WHY.video.caption} />
            <span className="muni-video-play" aria-hidden>
              ▶
            </span>
          </a>
          <p className="muni-video-caption">
            {WHY.video.caption} <span className="muni-video-url">{WHY.video.url}</span>
          </p>
        </div>

        <div className="muni-why-band">
          <div className="muni-flagfa">
            <img src={WHY.flagfa.logo} alt="FLAGFA" />
            <p>{WHY.flagfa.text}</p>
          </div>
          <div className="muni-big-stat">
            <span className="muni-stat-value">{WHY.stat.value}</span>
            <span className="muni-stat-label">{WHY.stat.label}</span>
          </div>
        </div>
      </div>
      <PageFooter n={2} />
    </Sheet>
  );
}

/* ---------- Page 3 — Trusted By ---------- */

export function TrustedPage() {
  return (
    <Sheet>
      <div className="muni-content">
        <PageHead eyebrow={TRUSTED.eyebrow} headline={TRUSTED.headline} />

        <div className="muni-trusted-featured">
          {TRUSTED.featured.map((a) => (
            <div className="muni-agency featured" key={a.name}>
              <img src={a.logo} alt={a.name} />
              <span>{a.name}</span>
            </div>
          ))}
        </div>

        <div className="muni-trusted-grid">
          {TRUSTED.agencies.map((a) => (
            <div className="muni-agency" key={a.name}>
              <img src={a.logo} alt={a.name} />
              <span>{a.name}</span>
            </div>
          ))}
        </div>
      </div>
      <PageFooter n={3} />
    </Sheet>
  );
}

/* ---------- Pages 4–10 — Equipment Lineup (one unit per page) ---------- */

function EquipmentSheet({ unit, n }: { unit: EquipmentUnit; n: number }) {
  const oem = unit.brand ? OEM_LOGOS[unit.brand] : null;
  return (
    <Sheet>
      <div className="muni-content muni-eq">
        <header className="muni-head muni-eq-head">
          <div className="muni-eq-title">
            <span className="muni-eyebrow">{EQUIPMENT.eyebrow}</span>
            <h2 className="muni-headline">
              <Copy text={unit.category} />
            </h2>
          </div>
          {oem && <img className="muni-eq-oem" src={oem.src} alt={oem.alt} />}
        </header>

        {unit.photo ? (
          /* no specs list → let the photo take the extra room */
          <div className={`muni-eq-photo ${unit.specs ? "" : "muni-eq-photo-tall"}`}>
            <img
              src={unit.photo}
              alt={unit.category}
              style={unit.photoPos ? { objectPosition: unit.photoPos } : undefined}
            />
          </div>
        ) : (
          <TodoBlock text={unit.photoSlot ?? "[photo]"} tall />
        )}

        <div className="muni-eq-info">
          <p className="muni-eq-copy">
            <Copy text={unit.copy} />
          </p>
          <div className="muni-eq-row">
            {unit.specs && (
              <div className="muni-eq-specs">
                <h4>Spec Highlights</h4>
                <ul className="muni-specs">
                  {unit.specs.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {unit.video && (
              <div className="muni-eq-video" {...stopFlip}>
                <div className="muni-video-embed">
                  <iframe
                    src={unit.video.embed}
                    title={`${unit.category} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <a className="muni-video-print" href={unit.video.url}>
                  <img src={unit.video.thumb} alt={`${unit.category} video`} />
                  <span className="muni-video-play" aria-hidden>
                    ▶
                  </span>
                </a>
                <span className="muni-eq-video-caption">See it work</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <PageFooter n={n} />
    </Sheet>
  );
}

const EQUIPMENT_FIRST_PAGE = 4;

export const EQUIPMENT_PAGE_COMPONENTS = EQUIPMENT.units.map((unit, i) => {
  const n = EQUIPMENT_FIRST_PAGE + i;
  return function EquipmentPage() {
    return <EquipmentSheet unit={unit} n={n} />;
  };
});

/* ---------- Page 11 — Our Government Purchasing Programs ---------- */

export function ProgramsPage() {
  return (
    <Sheet>
      <div className="muni-content">
        <PageHead eyebrow={PROGRAMS.eyebrow} headline={PROGRAMS.headline} />
        <div className="muni-body">
          <p>{PROGRAMS.intro}</p>
        </div>

        <div className="muni-prog-cards">
          {PROGRAMS.cards.map((c) => (
            <div className="muni-prog-card" key={c.name}>
              <div className="muni-prog-logo-box">
                <img className="muni-prog-logo" src={c.logo} alt={c.name} />
              </div>
              <div className="muni-prog-body">
                <div className="muni-prog-name">
                  <h3>{c.name}</h3>
                  <span className="muni-prog-badge">{c.badge}</span>
                </div>
                <span className="muni-prog-sub">{c.sub}</span>
                <p>{c.copy}</p>
                <ul className="muni-prog-bullets">
                  {c.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <a className="muni-prog-link" href={c.link} target="_blank" rel="noreferrer" {...stopFlip}>
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="muni-timesave">
          <h4>{PROGRAMS.timeSave.heading}</h4>
          <div className="muni-timesave-row">
            <div className="muni-timesave-cell slow">
              <span className="muni-timesave-label">{PROGRAMS.timeSave.bid.label}</span>
              <span>{PROGRAMS.timeSave.bid.value}</span>
            </div>
            <div className="muni-timesave-cell fast">
              <span className="muni-timesave-label">{PROGRAMS.timeSave.coop.label}</span>
              <span>{PROGRAMS.timeSave.coop.value}</span>
            </div>
          </div>
        </div>
      </div>
      <PageFooter n={11} />
    </Sheet>
  );
}

/* ---------- Page 12 — Exclusive Benefits ---------- */

export function BenefitsPage() {
  return (
    <Sheet>
      <div className="muni-content">
        <PageHead eyebrow={BENEFITS.eyebrow} headline={BENEFITS.headline} />
        <div className="muni-body">
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="muni-benefits">
          {BENEFITS.items.map((b) => (
            <div className="muni-benefit" key={b.title}>
              <h3>{b.title}</h3>
              <p>{b.copy}</p>
            </div>
          ))}
        </div>
      </div>
      <PageFooter n={12} />
    </Sheet>
  );
}

/* ---------- Page 13 — How to Purchase ---------- */

export function PurchasePage() {
  return (
    <Sheet>
      <div className="muni-content">
        <PageHead eyebrow={PURCHASE.eyebrow} headline={PURCHASE.headline} />
        <ol className="muni-steps">
          {PURCHASE.steps.map((s, i) => (
            <li className="muni-step" key={i}>
              <span className="muni-step-num">{i + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>
                  <Copy text={s.copy} />
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="muni-reassure">
          <p>{PURCHASE.reassurance}</p>
        </div>
      </div>
      <PageFooter n={13} />
    </Sheet>
  );
}

/* ---------- Page 14 — Back Cover (dark) ---------- */

export function BackCoverPage() {
  return (
    <Sheet dark>
      <div className="muni-backcover">
        <span className="muni-backcover-logo">
          <NHLogo light />
        </span>
        <h1>{BACK.headline}</h1>
        <p className="muni-backcover-sub">{BACK.sub}</p>

        <div className="muni-backcover-contacts">
          {BACK.contacts.map((c) => (
            <div className="muni-backcover-contact" key={c.label}>
              <span className="muni-backcover-label">{c.label}</span>
              <span className="muni-backcover-value">{c.value}</span>
            </div>
          ))}
        </div>

        <p className="muni-backcover-note">{BACK.note}</p>
      </div>
      <div className="muni-cover-slash" aria-hidden />
    </Sheet>
  );
}

/* ---------- ordered export used by flipbook + print route ---------- */

export const MUNI_PAGE_COMPONENTS: {
  n: number;
  title: string;
  Component: () => ReactNode;
}[] = [
  { n: 1, title: "Cover", Component: CoverPage },
  { n: 2, title: "Why Nationwide Haul", Component: WhyPage },
  { n: 3, title: "Trusted By", Component: TrustedPage },
  ...EQUIPMENT_PAGE_COMPONENTS.map((Component, i) => ({
    n: 4 + i,
    title: EQUIPMENT.units[i].category,
    Component,
  })),
  { n: 11, title: "Purchasing Programs", Component: ProgramsPage },
  { n: 12, title: "Government Benefits", Component: BenefitsPage },
  { n: 13, title: "How to Purchase", Component: PurchasePage },
  { n: 14, title: "Back Cover", Component: BackCoverPage },
];

/** Client-side sheet stack for the print route — server components can render
 *  this but can no longer .map over MUNI_PAGE_COMPONENTS (this file is "use client"). */
export function MunicipalPrintSheets() {
  return (
    <>
      {MUNI_PAGE_COMPONENTS.map(({ n, Component }) => (
        <section className="print-sheet" key={n}>
          <Component />
        </section>
      ))}
    </>
  );
}

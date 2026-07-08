"use client";

/**
 * NH Municipal Fleet Catalog — one component per catalog page.
 * Every sheet is a fixed 816 × 1056 px canvas (8.5" × 11" @ 96dpi) so the
 * flipbook (scaled) and the print/PDF route (1:1) render identically.
 * All copy comes from app/municipalities/content.ts.
 */

import type { ReactNode, SyntheticEvent } from "react";
import {
  BRAND,
  FOOTER,
  COVER,
  WHY,
  COOP,
  EQUIPMENT,
  PROGRAMS,
  SERVICE,
  PURCHASE,
  TRUSTED,
  BACK,
  MUNI_TOTAL_PAGES,
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

/** Renders copy, wrapping any [bracketed placeholder] in a visible highlight. */
function Copy({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]*\])/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[") && p.endsWith("]") ? (
          <mark className="muni-todo" key={i}>
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
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

/** Footer on every interior content page. */
function PageFooter({ n }: { n: number }) {
  return (
    <footer className="muni-footer">
      <span className="muni-footer-mark">
        <NHLogo />
      </span>
      <span className="muni-footer-vendor">{FOOTER.vendorLine}</span>
      <span className="muni-footer-phone">{FOOTER.contact}</span>
      <span className="muni-footer-num">
        {n} / {MUNI_TOTAL_PAGES}
      </span>
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

        <div className="muni-cover-title">
          <h1>{COVER.title}</h1>
          <p className="muni-cover-sub">{COVER.subtitle}</p>
        </div>

        <div className="muni-cover-photo">
          <img src={COVER.photo} alt="Tipper trailer" />
        </div>

        <p className="muni-cover-tagline">{COVER.tagline}</p>

        <div className="muni-cover-band">
          {BRAND.contracts.map((c) => (
            <span key={c} className="muni-contract-chip">
              {c}
            </span>
          ))}
        </div>

        <div className="muni-cover-foot">
          <span>{BRAND.site}</span>
        </div>
      </div>
      <div className="muni-cover-slash" aria-hidden />
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

/* ---------- Page 3 — Cooperative Purchasing ---------- */

export function CoopPage() {
  return (
    <Sheet>
      <div className="muni-content">
        <PageHead eyebrow={COOP.eyebrow} headline={COOP.headline} />
        <div className="muni-body">
          <p>{COOP.body}</p>
          <p className="muni-strong">{COOP.vendorIntro}</p>
        </div>

        <div className="muni-programs">
          {COOP.programs.map((p) => (
            <div className="muni-program" key={p.name}>
              <h3>
                {p.name}
                {p.full && <span> — {p.full}</span>}
              </h3>
              <p>
                <Copy text={p.detail} />
              </p>
            </div>
          ))}
        </div>

        <div className="muni-timesave">
          <h4>{COOP.timeSave.heading}</h4>
          <div className="muni-timesave-row">
            <div className="muni-timesave-cell slow">
              <span className="muni-timesave-label">{COOP.timeSave.bid.label}</span>
              <span>{COOP.timeSave.bid.value}</span>
            </div>
            <div className="muni-timesave-cell fast">
              <span className="muni-timesave-label">{COOP.timeSave.coop.label}</span>
              <span>{COOP.timeSave.coop.value}</span>
            </div>
          </div>
        </div>

        <aside className="muni-sidebar">
          <p>{COOP.sidebar}</p>
        </aside>
      </div>
      <PageFooter n={3} />
    </Sheet>
  );
}

/* ---------- Pages 4–7 — Equipment Lineup spread ---------- */

function UnitCard({ unit, single = false }: { unit: EquipmentUnit; single?: boolean }) {
  return (
    <div className={`muni-unit ${single ? "muni-unit-single" : ""}`}>
      {unit.photo ? (
        <div className="muni-unit-photo">
          <img src={unit.photo} alt={unit.category} />
        </div>
      ) : (
        <TodoBlock text={unit.photoSlot ?? "[photo]"} />
      )}
      <div className="muni-unit-body">
        <h3>
          <Copy text={unit.category} />
          {unit.brand === "mac" && (
            <img className="muni-unit-brand" src="/municipal/mac-trailer-logo.svg" alt="MAC Trailer" />
          )}
        </h3>
        <p>
          <Copy text={unit.copy} />
        </p>
        {unit.specs && (
          <div className="muni-specs-wrap" {...stopFlip}>
            {/* checkbox nested in the label — pages render twice (book + thumbs), so no ids */}
            <label className="muni-specs-toggle">
              <input type="checkbox" className="muni-specs-check" />
              Specs
            </label>
            <ul className="muni-specs">
              {unit.specs.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        {unit.video && (
          <a className="muni-unit-video" href={unit.video} target="_blank" rel="noreferrer" {...stopFlip}>
            ▶ See it work
          </a>
        )}
      </div>
    </div>
  );
}

function EquipmentSheet({ units, n, showHead }: { units: EquipmentUnit[]; n: number; showHead: boolean }) {
  const single = units.length === 1;
  return (
    <Sheet>
      <div className="muni-content">
        {showHead ? (
          <PageHead eyebrow={EQUIPMENT.eyebrow} headline={EQUIPMENT.headline} />
        ) : (
          <header className="muni-head muni-head-cont">
            <span className="muni-eyebrow">{EQUIPMENT.eyebrow} — continued</span>
          </header>
        )}
        <div className="muni-units">
          {units.map((u) => (
            <UnitCard unit={u} single={single} key={u.category} />
          ))}
        </div>
      </div>
      <PageFooter n={n} />
    </Sheet>
  );
}

const EQUIPMENT_FIRST_PAGE = 4;

export const EQUIPMENT_PAGE_COMPONENTS = EQUIPMENT.pages.map((units, i) => {
  const n = EQUIPMENT_FIRST_PAGE + i;
  return function EquipmentPage() {
    return <EquipmentSheet units={units} n={n} showHead={i === 0} />;
  };
});

/* ---------- Page 8 — Our Government Purchasing Programs ---------- */

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
              <div className="muni-prog-head">
                <img className="muni-prog-logo" src={c.logo} alt={c.name} />
                <span className="muni-prog-badge">{c.badge}</span>
              </div>
              <h3>{c.name}</h3>
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
          ))}
        </div>
      </div>
      <PageFooter n={8} />
    </Sheet>
  );
}

/* ---------- Page 9 — Service & Parts ---------- */

export function ServicePage() {
  return (
    <Sheet>
      <div className="muni-content">
        <PageHead eyebrow={SERVICE.eyebrow} headline={SERVICE.headline} />
        <div className="muni-body">
          <p>
            <Copy text={SERVICE.body} />
          </p>
        </div>
        <ul className="muni-list">
          {SERVICE.bullets.map((b, i) => (
            <li key={i}>
              <Copy text={b} />
            </li>
          ))}
        </ul>
        <TodoBlock text={SERVICE.photoSlot} tall />
      </div>
      <PageFooter n={9} />
    </Sheet>
  );
}

/* ---------- Page 10 — How to Purchase ---------- */

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
      <PageFooter n={10} />
    </Sheet>
  );
}

/* ---------- Page 11 — Trusted By ---------- */

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
      <PageFooter n={11} />
    </Sheet>
  );
}

/* ---------- Page 12 — Back Cover (dark) ---------- */

export function BackCoverPage() {
  return (
    <Sheet dark>
      <div className="muni-cover muni-back">
        <div className="muni-cover-top">
          <span className="muni-cover-logo">
            <NHLogo light />
          </span>
        </div>

        <div className="muni-cover-title">
          <h1>{BACK.title}</h1>
          <p className="muni-cover-sub">{BACK.subtitle}</p>
        </div>

        <div className="muni-back-contact">
          {BACK.contact.map((line, i) => (
            <p key={i}>
              <Copy text={line} />
            </p>
          ))}
        </div>

        <div className="muni-cover-band muni-back-band">
          <span className="muni-back-vendor">{BACK.vendorLabel}</span>
          <div>
            {BRAND.contracts.map((c) => (
              <span key={c} className="muni-contract-chip">
                {c}
              </span>
            ))}
          </div>
        </div>
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
  { n: 3, title: "Cooperative Purchasing", Component: CoopPage },
  ...EQUIPMENT_PAGE_COMPONENTS.map((Component, i) => ({
    n: 4 + i,
    title: i === 0 ? "Equipment Lineup" : "Equipment Lineup (cont.)",
    Component,
  })),
  { n: 8, title: "Purchasing Programs", Component: ProgramsPage },
  { n: 9, title: "Service & Parts", Component: ServicePage },
  { n: 10, title: "How to Purchase", Component: PurchasePage },
  { n: 11, title: "Trusted By", Component: TrustedPage },
  { n: 12, title: "Back Cover", Component: BackCoverPage },
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

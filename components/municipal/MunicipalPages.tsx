/**
 * NH Municipal Fleet Catalog — one component per catalog page.
 * Every sheet is a fixed 816 × 1056 px canvas (8.5" × 11" @ 96dpi) so the
 * flipbook (scaled) and the print/PDF route (1:1) render identically.
 * All copy comes from app/municipalities/content.ts.
 */

import type { ReactNode } from "react";
import {
  BRAND,
  FOOTER,
  COVER,
  WHY,
  COOP,
  EQUIPMENT,
  FINANCING,
  SERVICE,
  PURCHASE,
  BACK,
  MUNI_TOTAL_PAGES,
  type EquipmentUnit,
} from "@/app/municipalities/content";

/* ---------- shared bits ---------- */

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

function MuniMark({ light = false }: { light?: boolean }) {
  const ink = light ? "#FAFAFA" : "#1A1A1A";
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M24 2 L34 12 L24 22 L14 12 Z" fill="#BE1E23" />
      <path d="M24 26 L34 36 L24 46 L14 36 Z" fill={ink} stroke={light ? "#1A1A1A" : "#fff"} strokeWidth="1.5" />
      <path d="M2 24 L12 14 L12 34 Z" fill="#BE1E23" />
      <path d="M46 24 L36 14 L36 34 Z" fill={ink} stroke={light ? "#1A1A1A" : "#fff"} strokeWidth="1.5" />
    </svg>
  );
}

/** Fixed-size letter sheet. dark = cover pages. */
function Sheet({ dark = false, children }: { dark?: boolean; children: ReactNode }) {
  return <div className={`muni-sheet ${dark ? "muni-dark" : "muni-light"}`}>{children}</div>;
}

/** Footer on every interior content page (brief requirement). */
function PageFooter({ n }: { n: number }) {
  return (
    <footer className="muni-footer">
      <span className="muni-footer-mark">
        <MuniMark light />
      </span>
      <span className="muni-footer-vendor">{FOOTER.vendorLine}</span>
      <span className="muni-footer-phone">
        <Copy text={FOOTER.phone} />
      </span>
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
          <span className="muni-cover-mark">
            <MuniMark />
          </span>
          <span className="muni-cover-eyebrow">{COVER.eyebrow}</span>
        </div>

        <div className="muni-cover-title">
          <h1>{COVER.title}</h1>
          <p className="muni-cover-sub">{COVER.subtitle}</p>
        </div>

        <TodoBlock text={COVER.photoSlot} tall />

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

        <TodoBlock text={WHY.photoSlot} />

        <div className="muni-stats">
          {WHY.stats.map((s, i) => (
            <div className="muni-stat" key={i}>
              <span className="muni-stat-value">
                <Copy text={s.value} />
              </span>
              <span className="muni-stat-label">{s.label}</span>
              {s.note && (
                <span className="muni-stat-note">
                  <Copy text={s.note} />
                </span>
              )}
            </div>
          ))}
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

/* ---------- Pages 4–5 — Equipment Lineup spread ---------- */

function UnitCard({ unit }: { unit: EquipmentUnit }) {
  return (
    <div className="muni-unit">
      <TodoBlock text={unit.photoSlot} />
      <div className="muni-unit-body">
        <h3>
          <Copy text={unit.category} />
        </h3>
        <p>
          <Copy text={unit.copy} />
        </p>
        <span className="muni-unit-tag">
          <Copy text={unit.availableUnder} />
        </span>
      </div>
    </div>
  );
}

function EquipmentSheet({ units, n, showHead }: { units: EquipmentUnit[]; n: number; showHead: boolean }) {
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
            <UnitCard unit={u} key={u.category} />
          ))}
        </div>
      </div>
      <PageFooter n={n} />
    </Sheet>
  );
}

export function EquipmentPageA() {
  return <EquipmentSheet units={EQUIPMENT.pageA} n={4} showHead />;
}

export function EquipmentPageB() {
  return <EquipmentSheet units={EQUIPMENT.pageB} n={5} showHead={false} />;
}

/* ---------- Page 6 — Financing & Municipal Leasing ---------- */

export function FinancingPage() {
  return (
    <Sheet>
      <div className="muni-content">
        <PageHead eyebrow={FINANCING.eyebrow} headline={FINANCING.headline} />
        <div className="muni-body">
          <p>{FINANCING.body}</p>
        </div>
        <TodoBlock text={FINANCING.pending} tall />
      </div>
      <PageFooter n={6} />
    </Sheet>
  );
}

/* ---------- Page 7 — Service & Parts ---------- */

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
      <PageFooter n={7} />
    </Sheet>
  );
}

/* ---------- Page 8 — How to Purchase ---------- */

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
      <PageFooter n={8} />
    </Sheet>
  );
}

/* ---------- Page 9 — Back Cover (dark) ---------- */

export function BackCoverPage() {
  return (
    <Sheet dark>
      <div className="muni-cover muni-back">
        <div className="muni-cover-top">
          <span className="muni-cover-mark">
            <MuniMark />
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
  { n: 4, title: "Equipment Lineup", Component: EquipmentPageA },
  { n: 5, title: "Equipment Lineup (cont.)", Component: EquipmentPageB },
  { n: 6, title: "Financing & Leasing", Component: FinancingPage },
  { n: 7, title: "Service & Parts", Component: ServicePage },
  { n: 8, title: "How to Purchase", Component: PurchasePage },
  { n: 9, title: "Back Cover", Component: BackCoverPage },
];

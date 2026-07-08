# NH Municipal Fleet Catalog — Build Brief
**Project:** Government/Municipal PDF catalog + digital flipbook version
**Brand:** Nationwide Haul
**Formats:** Print-ready PDF (8.5" × 11") + flipbook page (same design system as flipbook.nationwidehaul.com)
**Audience:** Municipal procurement officers, public works directors, government fleet directors (FL/GA primary)

---

## Strategy Notes

- Primary selling point: **cooperative purchasing contracts (FSA, Sourcewell, FLAGFA)** — municipalities can purchase without running a formal bid process. This is the #1 pain reliever for this audience. Lead with it early and repeat it on the "How to Purchase" page.
- Tone: NH voice (direct, human, no dealer fluff) but slightly more institutional than fleet-manager content. No urgency tactics, no "call before Friday" — government buyers move on fiscal-year cycles, not FOMO.
- This audience fears: audit findings, non-compliant purchases, vendors who don't understand government paperwork. Everything in the copy should signal *we know how government purchasing works*.
- Do NOT use "truckers" anywhere. Audience terms here: "your fleet", "your department", "public works teams".

## Design Specs

- **Page size:** 8.5" × 11" portrait (816 × 1056 px @ 96dpi, or use CSS `@page { size: letter; }`)
- **Colors:** Red #BE1E23, Dark Red #8C0F14, Black #1A1A1A, White #FAFAFA
- **Layout system:** Cover + section dividers on dark (#1A1A1A) matching the flipbook aesthetic. Content pages on light (#FAFAFA) with red accents — print-friendly, photocopy-safe.
- **Typography:** match the flipbook microsite fonts (pull from that repo).
- **Photography:** real NH yard/equipment photos only, no stock. [ADRIANA: select photos — dump trailers and Pitts units priority]
- **Footer on every content page:** NH logo mark + "Cooperative Contract Vendor — FSA | Sourcewell | FLAGFA" + phone

---

## Page-by-Page Copy (English, draft v1)

### PAGE 1 — Cover (dark)
**NATIONWIDE HAUL**
Government Fleet Solutions

Trailers and equipment for municipalities, counties, and public agencies — available through cooperative purchasing contracts.

FSA · Sourcewell · FLAGFA
[Year] Municipal Catalog

---

### PAGE 2 — Why Nationwide Haul (light)
**Headline:** Equipment in the yard. Paperwork we actually understand.

**Body:**
Buying equipment for a public agency shouldn't mean chasing dealers who've never seen a purchase order requisition, or waiting months for units that were "on order" when you signed.

Nationwide Haul keeps real inventory on the ground at our Florida and Georgia locations. When your department needs a dump trailer or a lowboy, it's sitting in our yard — not on a production schedule.

And because we're an approved cooperative contract vendor, your purchase runs through contracts that have already been competitively bid. That means compliant procurement without the RFP timeline.

**Stat band (fill with real numbers):**
- [X] units in stock across FL & GA — [ADRIANA: confirm]
- [X] years serving the Southeast — [ADRIANA: confirm]
- Locations: Lakeland FL · Pompano FL · Macon GA — [ADRIANA: confirm list]
- Full-service repair centers (NHTTR)

---

### PAGE 3 — Cooperative Purchasing (light, this is the money page)
**Headline:** Skip the bid process. Stay compliant.

**Body:**
Cooperative purchasing contracts let public agencies buy equipment through contracts that have already gone through a competitive solicitation. The bidding is done. The pricing is set. Your purchase is audit-ready from day one.

Nationwide Haul is an approved vendor under:

**FSA — Florida Sheriffs Association Cooperative Purchasing Program**
[ADRIANA: contract number + approved line items — MAC Trailer and Pitts Trailers items]

**Sourcewell**
[ADRIANA: confirm status + contract number]

**FLAGFA — Florida Association of Governmental Fleet Administrators**
[ADRIANA: confirm status + details]

**How it saves your department time:**
Typical bid process: 3–6 months from spec writing to award.
Cooperative contract purchase: request a quote, issue a PO against the contract, take delivery.

*[Sidebar box]* Not sure if your agency can purchase through these contracts? Most Florida and Georgia municipalities, counties, school districts, and special districts are eligible. Call us — we'll check with you.

---

### PAGE 4–5 — Equipment Lineup (light, spread)
**Headline:** Built for public works.

Organize by category with photo + short spec block + "Available under: FSA" tag per unit:

- **Dump Trailers** — MAC FL Spec lightweight [ADRIANA: specs from Meta Ads campaign copy]
- **Pitts Trailers** — [approved FSA line items]
- **Lowboys / Equipment Trailers** — for hauling excavators, loaders, mowers
- **[Additional categories]** — [ADRIANA: pull from inventory — flatbeds? tag trailers?]

Copy style per unit: honest and specific, like the walkarounds. Example:
"The MAC FL Spec runs lighter than standard dump trailers, which means more payload per trip on county material runs. Aluminum construction, Florida-spec build."

---

### PAGE 6 — Financing & Municipal Leasing (light)
**Headline:** Financing that fits a government budget cycle.

**Body:**
Through NEF, our in-house equipment finance division, we offer municipal leasing and financing structured around fiscal-year budgets — not standard commercial terms forced onto a government timeline.

[ADRIANA: confirm with Derek/NEF what municipal products actually exist — tax-exempt lease-purchase? Straight municipal lease? Don't publish until confirmed.]

---

### PAGE 7 — Service & Parts (light)
**Headline:** Support after the sale.

**Body:**
Public works equipment can't sit in a repair queue. Our NHTTR service centers in [locations] handle trailer repair, DOT inspections, and parts — so your units stay on the road and your maintenance records stay clean.

- Trailer repair & refurbishment
- DOT inspections
- Parts department
- [Mobile service? — ADRIANA: confirm]

---

### PAGE 8 — How to Purchase (light)
**Headline:** Four steps from quote to delivery.

1. **Tell us what you need.** Call or email with your equipment requirements. We'll confirm availability and which cooperative contract applies.
2. **Receive your quote.** Contract-referenced pricing, ready for your procurement file.
3. **Issue your PO.** Reference the cooperative contract number on your purchase order.
4. **Take delivery.** From our yard to yours. [Delivery capability details — ADRIANA: confirm]

*[Repeat compliance reassurance]:* Every cooperative purchase includes the documentation your finance department and auditors need.

---

### PAGE 9 — Back Cover (dark)
**NATIONWIDE HAUL**
Government Fleet Solutions

[Phone — dedicated line or main?]
[Email — government@ or sales@?]
nationwidehaul.com
Locations: [list]

Cooperative Contract Vendor
FSA · Sourcewell · FLAGFA

---

## Items Adriana Must Confirm Before Publishing
1. FSA contract number + exact approved line items (MAC, Pitts)
2. Sourcewell and FLAGFA status — approved, pending, or aspirational? Remove any that aren't signed.
3. Real achievement numbers (years, inventory count, locations list)
4. NEF municipal financing products (check with Derek)
5. Delivery capability for government buyers
6. Contact info for government inquiries (dedicated email?)
7. Photo selection

---

## Claude Code Build Instructions

**Repo:** NH flipbook microsite repo (flipbook.nationwidehaul.com)

**Approach:**
1. Create a new route `/municipalities` (or `/government`) reusing the flipbook page-flip component and design tokens.
2. Build each catalog page as an HTML/JSX page component sized to letter ratio (8.5:11). Content lives in a single data file (JSON or TSX constants) so PDF and flipbook render from the same source.
3. PDF export: add a print stylesheet (`@page { size: letter; margin: 0; }`) and a script that renders each page route with Playwright/Puppeteer → `pdf({ format: 'Letter', printBackground: true })` → merge into one PDF. Output: `nh-municipal-catalog.pdf`.
4. Dark pages: cover + back cover only. All interior pages light background for print.
5. Keep the `/municipalities` route out of the main nav for now; direct-link only until Derek approves.
6. Add OG tags mirroring the main flipbook's meta pattern (og:title "Nationwide Haul — Government Fleet Solutions").

**Suggested prompt to paste into Claude Code:**
> Read nh-municipal-catalog-brief.md in the project root. Build the municipal catalog as described: new /municipalities route in this flipbook microsite reusing the existing flip component and design tokens, one page component per catalog page, shared content data file, and a Playwright script that exports all pages as a single print-ready letter-size PDF with printBackground enabled. Cover and back cover dark (#1A1A1A), interior pages light (#FAFAFA), brand red #BE1E23 accents. Leave all [ADRIANA] placeholders visible in the rendered output so I can spot what's missing.

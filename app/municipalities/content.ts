/**
 * NH Municipal Fleet Catalog — single source of truth for all copy.
 * Both the /municipalities flipbook and the print/PDF route render from this file.
 *
 * Anything wrapped in [square brackets] is an open item for Adriana and is
 * rendered as a visible highlighted placeholder in the flipbook AND the PDF.
 */

export const MUNI_TOTAL_PAGES = 11;

export const BRAND = {
  name: "Nationwide Haul",
  wordmark: "NATIONWIDE HAUL",
  program: "Government Fleet Solutions",
  site: "nationwidehaul.com",
  contracts: ["FSA", "Sourcewell", "FLAGFA"],
  contractsDot: "FSA · Sourcewell · FLAGFA",
};

/** Footer strip repeated on every interior (light) page. */
export const FOOTER = {
  vendorLine: "Cooperative Contract Vendor — FSA | Sourcewell | FLAGFA",
  phone: "[ADRIANA: phone — dedicated line or main?]",
};

/* ---------------- Page 1 — Cover (dark) ---------------- */
export const COVER = {
  eyebrow: "2026 Municipal Catalog",
  title: BRAND.wordmark,
  subtitle: BRAND.program,
  tagline:
    "Trailers and equipment for municipalities, counties, and public agencies — available through cooperative purchasing contracts.",
  contracts: BRAND.contractsDot,
  photoSlot: "[ADRIANA: cover photo — dump trailer or Pitts unit, real NH yard photo only]",
};

/* ---------------- Page 2 — Why Nationwide Haul (light) ---------------- */
export const WHY = {
  eyebrow: "Why Nationwide Haul",
  headline: "Equipment in the yard. Paperwork we actually understand.",
  body: [
    "Buying equipment for a public agency shouldn't mean chasing dealers who've never seen a purchase order requisition, or waiting months for units that were “on order” when you signed.",
    "Nationwide Haul keeps real inventory on the ground at our Florida and Georgia locations. When your department needs a dump trailer or a lowboy, it's sitting in our yard — not on a production schedule.",
    "And because we're an approved cooperative contract vendor, your purchase runs through contracts that have already been competitively bid. That means compliant procurement without the RFP timeline.",
  ],
  stats: [
    { value: "[X]", label: "units in stock across FL & GA", note: "[ADRIANA: confirm]" },
    { value: "[X]", label: "years serving the Southeast", note: "[ADRIANA: confirm]" },
    { value: "3", label: "Lakeland FL · Pompano FL · Macon GA", note: "[ADRIANA: confirm list]" },
    { value: "NHTTR", label: "full-service repair centers", note: "" },
  ],
  photoSlot: "[ADRIANA: yard photo — inventory rows]",
};

/* ---------------- Page 3 — Cooperative Purchasing (light) ---------------- */
export const COOP = {
  eyebrow: "Cooperative Purchasing",
  headline: "Skip the bid process. Stay compliant.",
  body: "Cooperative purchasing contracts let public agencies buy equipment through contracts that have already gone through a competitive solicitation. The bidding is done. The pricing is set. Your purchase is audit-ready from day one.",
  vendorIntro: "Nationwide Haul is an approved vendor under:",
  programs: [
    {
      name: "FSA",
      full: "Florida Sheriffs Association Cooperative Purchasing Program",
      detail: "[ADRIANA: contract number + approved line items — MAC Trailer and Pitts Trailers items]",
    },
    {
      name: "Sourcewell",
      full: "",
      detail: "[ADRIANA: confirm status + contract number]",
    },
    {
      name: "FLAGFA",
      full: "Florida Association of Governmental Fleet Administrators",
      detail: "[ADRIANA: confirm status + details]",
    },
  ],
  timeSave: {
    heading: "How it saves your department time",
    bid: { label: "Typical bid process", value: "3–6 months from spec writing to award." },
    coop: {
      label: "Cooperative contract purchase",
      value: "Request a quote, issue a PO against the contract, take delivery.",
    },
  },
  sidebar:
    "Not sure if your agency can purchase through these contracts? Most Florida and Georgia municipalities, counties, school districts, and special districts are eligible. Call us — we'll check with you.",
};

/* ---------------- Pages 4–7 — Equipment Lineup (light spread) ---------------- */
export interface EquipmentUnit {
  category: string;
  copy: string;
  availableUnder: string;
  /** Real photo in /public/municipal. When absent, photoSlot renders as a placeholder. */
  photo?: string;
  photoSlot?: string;
  /** Short spec highlights rendered as chips. */
  specs?: string[];
  /** Manufacturer badge (currently only MAC Trailer). */
  brand?: "mac";
  video?: string;
}

export const EQUIPMENT = {
  eyebrow: "Equipment Lineup",
  headline: "Built for public works.",
  pages: [
    [
      {
        category: "Moving Floor Trailers",
        copy: "Self-unloading walking-floor trailers for transfer stations, yard waste, and bulky debris — no tipping, no overhead clearance issues. Built by MAC Trailer in lightweight extruded aluminum.",
        availableUnder: "Available under: FSA",
        photo: "/municipal/moving-floor.webp",
        specs: [
          "6005A extruded aluminum",
          "Keith Walking Floor standard — Hallco / Cargo Floor optional",
          ".190 sidewall standard",
          "Jost H451 galvanized landing gear",
          "MAC spring ride or Hendrickson air ride",
        ],
        brand: "mac",
        video: "https://www.youtube.com/watch?v=TAm5vIAFrCw",
      },
      {
        category: "Tippers",
        copy: "Transfer trailers built for tipper operation — back in, lift, and gone. 6061 extruded aluminum construction keeps tare weight down and payload up.",
        availableUnder: "Available under: FSA",
        photo: "/municipal/tipper.webp",
        specs: [
          "6061 extruded aluminum",
          "¼” floor standard — ⅜” & ½” optional",
          "Overslung hollow-core gate with greaseless hinge",
          "Jost H451 galvanized landing gear",
          "MAC spring ride or Hendrickson air ride",
        ],
        brand: "mac",
        video: "https://youtu.be/SEsLV4uLlkY",
      },
    ],
    [
      {
        category: "Leachate Tanks",
        copy: "Purpose-built tanks for hauling landfill leachate. [ADRIANA: versions + capacities from screenshot — pending]",
        availableUnder: "Available under: [ADRIANA: confirm contract]",
        photo: "/municipal/leachate-tank.webp",
      },
      {
        category: "Sludge Dumps",
        copy: "[ADRIANA: sludge dump copy + specs]",
        availableUnder: "Available under: [ADRIANA: confirm contract]",
        photoSlot: "[ADRIANA: sludge dump photo]",
      },
    ],
    [
      {
        category: "Rail Chassis — Waste",
        copy: "[ADRIANA: rail chassis copy + specs]",
        availableUnder: "Available under: [ADRIANA: confirm contract]",
        photoSlot: "[ADRIANA: rail chassis photo]",
      },
      {
        category: "Gooseneck Low Boys",
        copy: "Hydraulic detachable gooseneck lowboys rated at 55 tons in 12' — for moving excavators, dozers, and loaders between job sites. Level Apitong deck with a front approach ramp and traction cleats, and 4-position ride-height control for separate deck and fifth-wheel height.",
        availableUnder: "Available under: [ADRIANA: confirm contract]",
        photoSlot: "[ADRIANA: gooseneck lowboy photo]",
        specs: [
          "55-ton capacity in 12' (GAWR/tires set legal payload)",
          "8'6” × 52'8” overall · 25' clear level deck",
          "22” loaded deck height · 6” ground clearance",
          "Non-ground-bearing hydraulic gooseneck · wet-line ready",
          "(3) 25,000 lb axles · 54½” spread · 3rd-axle air lift",
          "25K unitized air-ride · flip-axle option",
          "~20,100 lb tare (±3%) · 16 D-rings · sealed LED harness",
        ],
      },
    ],
    [
      {
        category: "Tag Along Trailers",
        copy: "Tag-along equipment trailers with a 21' deck and 60” lay-flat dovetail — spring-assisted ramps and 40,000 lb of equally distributed capacity. FOB Pittsview, AL; transport to other locations subject to additional charge.",
        availableUnder: "Available under: [ADRIANA: confirm contract]",
        photo: "/municipal/tag-along.webp",
        specs: [
          "47,350 lb GVWR",
          "32' × 102” — Apitong deck flooring",
          "21' deck + 60” lay-flat dovetail",
          "(2) 22,500 lb axles · 49” spacing · ABS",
          "Hutchens 3-point, 4-spring suspension",
          "Spring-assisted ramps · gooseneck toolbox",
          "215/75R17.5 tires · drop-leg two-speed landing gear",
        ],
      },
    ],
  ] as EquipmentUnit[][],
};

/* ---------------- Page 6 — Financing & Municipal Leasing (light) ---------------- */
export const FINANCING = {
  eyebrow: "Financing & Municipal Leasing",
  headline: "Financing that fits a government budget cycle.",
  body: "Through NEF, our in-house equipment finance division, we offer municipal leasing and financing structured around fiscal-year budgets — not standard commercial terms forced onto a government timeline.",
  pending:
    "[ADRIANA: confirm with Derek/NEF what municipal products actually exist — tax-exempt lease-purchase? Straight municipal lease? Don't publish until confirmed.]",
};

/* ---------------- Page 7 — Service & Parts (light) ---------------- */
export const SERVICE = {
  eyebrow: "Service & Parts",
  headline: "Support after the sale.",
  body: "Public works equipment can't sit in a repair queue. Our NHTTR service centers in [ADRIANA: locations] handle trailer repair, DOT inspections, and parts — so your units stay on the road and your maintenance records stay clean.",
  bullets: [
    "Trailer repair & refurbishment",
    "DOT inspections",
    "Parts department",
    "[Mobile service? — ADRIANA: confirm]",
  ],
  photoSlot: "[ADRIANA: NHTTR service bay photo]",
};

/* ---------------- Page 8 — How to Purchase (light) ---------------- */
export const PURCHASE = {
  eyebrow: "How to Purchase",
  headline: "Four steps from quote to delivery.",
  steps: [
    {
      title: "Tell us what you need.",
      copy: "Call or email with your equipment requirements. We'll confirm availability and which cooperative contract applies.",
    },
    {
      title: "Receive your quote.",
      copy: "Contract-referenced pricing, ready for your procurement file.",
    },
    {
      title: "Issue your PO.",
      copy: "Reference the cooperative contract number on your purchase order.",
    },
    {
      title: "Take delivery.",
      copy: "From our yard to yours. [ADRIANA: confirm delivery capability details]",
    },
  ],
  reassurance:
    "Every cooperative purchase includes the documentation your finance department and auditors need.",
};

/* ---------------- Page 9 — Back Cover (dark) ---------------- */
export const BACK = {
  title: BRAND.wordmark,
  subtitle: BRAND.program,
  contact: [
    "[ADRIANA: phone — dedicated line or main?]",
    "[ADRIANA: email — government@ or sales@?]",
    BRAND.site,
    "Locations: [ADRIANA: confirm list — Lakeland FL · Pompano FL · Macon GA]",
  ],
  vendorLabel: "Cooperative Contract Vendor",
  contracts: BRAND.contractsDot,
};

/** Titles for thumbnails / chapter chips. Index = page number - 1. */
export const MUNI_PAGES: { n: number; title: string; dark: boolean }[] = [
  { n: 1, title: "Cover", dark: true },
  { n: 2, title: "Why Nationwide Haul", dark: false },
  { n: 3, title: "Cooperative Purchasing", dark: false },
  { n: 4, title: "Equipment Lineup", dark: false },
  { n: 5, title: "Equipment Lineup", dark: false },
  { n: 6, title: "Equipment Lineup", dark: false },
  { n: 7, title: "Equipment Lineup", dark: false },
  { n: 8, title: "Financing & Leasing", dark: false },
  { n: 9, title: "Service & Parts", dark: false },
  { n: 10, title: "How to Purchase", dark: false },
  { n: 11, title: "Back Cover", dark: true },
];

export const MUNI_CHAPTERS: { label: string; page: number }[] = [
  { label: "Cover", page: 1 },
  { label: "Why NH", page: 2 },
  { label: "Cooperative", page: 3 },
  { label: "Equipment", page: 4 },
  { label: "Financing", page: 8 },
  { label: "Service", page: 9 },
  { label: "How to Buy", page: 10 },
  { label: "Contact", page: 11 },
];

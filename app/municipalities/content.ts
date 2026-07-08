/**
 * NH Municipal Fleet Catalog — single source of truth for all copy.
 * Both the /municipalities flipbook and the print/PDF route render from this file.
 *
 * Anything wrapped in [square brackets] is an open item for Adriana and is
 * rendered as a visible highlighted placeholder in the flipbook AND the PDF.
 * Text wrapped in **double asterisks** renders bold.
 */

export const MUNI_TOTAL_PAGES = 14;

export const BRAND = {
  name: "Nationwide Haul",
  wordmark: "NATIONWIDE HAUL",
  program: "Government Fleet Solutions",
  site: "nationwidehaul.com",
  email: "govbid@nationwidehaul.com",
  contracts: ["FSA", "Sourcewell", "FLAGFA"],
  contractsDot: "FSA · Sourcewell · FLAGFA",
};

/* ---------------- Page 1 — Cover (dark) ---------------- */
export const COVER = {
  eyebrow: "2026 Municipalities Solutions",
  /** Stacked display title — one word per line, styled individually. */
  titleLines: ["Government", "Fleet", "Solutions"],
  tagline:
    "Trailers and equipment for municipalities, counties, and public agencies — available through cooperative purchasing contracts.",
  photo: "/municipal/tipper-2.webp",
  foot: `${BRAND.site}   ·   ${BRAND.email}`,
};

/* ---------------- Page 2 — Why Nationwide Haul (light) ---------------- */
export const WHY = {
  eyebrow: "Why Nationwide Haul",
  headline: "Government fleets are our lane.",
  body: [
    "We keep **real inventory on the ground in Florida and Georgia**. When your department needs a trailer, **it's in our yard** — not on a production schedule.",
    "And because we're an **approved cooperative contract vendor**, your purchase runs through contracts that were **already competitively bid**. Compliant procurement, **without the RFP timeline**.",
  ],
  flagfa: {
    logo: "/municipal/flagfa-logo.webp",
    text: "As a FLAGFA member, we are committed to serving state and local agencies with top-tier government fleet solutions.",
  },
  video: {
    url: "https://youtu.be/8MZ-08eTd0A",
    embed: "https://www.youtube-nocookie.com/embed/8MZ-08eTd0A",
    thumb: "/municipal/miami-dade-video-thumb.webp",
    caption: "Custom chassis built for Miami-Dade County — watch the delivery.",
  },
  stat: { value: "15+", label: "years serving municipalities" },
};

/* ---------------- Page 3 — Trusted By (light) ---------------- */
export const TRUSTED = {
  eyebrow: "Track Record",
  headline: "Trusted by leading government agencies.",
  featured: [
    { logo: "/municipal/agencies/miami-dade.webp", name: "Miami-Dade County" },
    { logo: "/municipal/agencies/nasa.webp", name: "NASA" },
  ],
  agencies: [
    { logo: "/municipal/agencies/broward.webp", name: "Broward County" },
    { logo: "/municipal/agencies/orange-county.webp", name: "Orange County Government" },
    { logo: "/municipal/agencies/hillsborough.webp", name: "Hillsborough County" },
    { logo: "/municipal/agencies/charlotte.webp", name: "Charlotte County" },
    { logo: "/municipal/agencies/orlando.webp", name: "City of Orlando" },
    { logo: "/municipal/agencies/st-cloud.webp", name: "City of St. Cloud" },
    { logo: "/municipal/agencies/toho-water.webp", name: "Toho Water Authority" },
  ],
};

/* ---------------- Pages 4–10 — Equipment Lineup (one unit per page) ---------------- */
export interface EquipmentUnit {
  category: string;
  copy: string;
  /** Real photo in /public/municipal. When absent, photoSlot renders as a placeholder. */
  photo?: string;
  photoSlot?: string;
  /** CSS object-position for the photo crop (defaults to center). */
  photoPos?: string;
  /** Spec highlights, always visible. */
  specs?: string[];
  /** Manufacturer badge shown large next to the page headline. */
  brand?: "mac" | "pitts";
  /** Small inline video preview — embed plays in the flipbook, thumb+url in print. */
  video?: { url: string; embed: string; thumb: string };
}

export const OEM_LOGOS: Record<string, { src: string; alt: string }> = {
  mac: { src: "/municipal/mac-trailer-logo.svg", alt: "MAC Trailer" },
  pitts: { src: "/municipal/pitts-logo.webp", alt: "Pitts Trailers" },
};

export const EQUIPMENT = {
  eyebrow: "Equipment Lineup",
  units: [
    {
      category: "Moving Floor Trailers",
      copy: "Self-unloading walking-floor trailers for transfer stations, yard waste, and bulky debris. No tipping, no overhead clearance issues. Built by MAC Trailer in lightweight extruded aluminum.",
      photo: "/municipal/moving-floor.webp",
      photoPos: "center top",
      specs: [
        "6005A extruded aluminum",
        "Keith Walking Floor standard — Hallco / Cargo Floor optional",
        ".190 sidewall standard",
        "Jost H451 galvanized landing gear",
        "MAC spring ride or Hendrickson air ride",
      ],
      brand: "mac",
      video: {
        url: "https://www.youtube.com/watch?v=TAm5vIAFrCw",
        embed: "https://www.youtube-nocookie.com/embed/TAm5vIAFrCw",
        thumb: "/municipal/moving-floor-video-thumb.webp",
      },
    },
    {
      category: "Tippers",
      copy: "Transfer trailers built for tipper operation — back in, lift, and gone. 6061 extruded aluminum keeps tare weight down and payload up.",
      photo: "/municipal/tipper.webp",
      photoPos: "center top",
      specs: [
        "6061 extruded aluminum",
        "¼” floor standard — ⅜” & ½” optional",
        "Overslung hollow-core gate with greaseless hinge",
        "Jost H451 galvanized landing gear",
        "MAC spring ride or Hendrickson air ride",
      ],
      brand: "mac",
      video: {
        url: "https://youtu.be/SEsLV4uLlkY",
        embed: "https://www.youtube-nocookie.com/embed/SEsLV4uLlkY",
        thumb: "/municipal/tipper-video-thumb.webp",
      },
    },
    {
      category: "Leachate Tanks",
      copy: "Purpose-built tanks for hauling landfill leachate. [Info needed]",
      photo: "/municipal/leachate-tank.webp",
    },
    {
      category: "Sludge Dumps",
      copy: "[Info needed]",
      photoSlot: "[Info needed]",
    },
    {
      category: "Rail Chassis — Waste",
      copy: "[Info needed]",
      photoSlot: "[Info needed]",
    },
    {
      category: "Gooseneck Lowboy",
      copy: "Hydraulic detachable gooseneck lowboy rated at 55 tons in 12' — for moving excavators, dozers, and loaders between job sites. Level Apitong deck, front approach ramp with traction cleats, 4-position ride-height control.",
      photo: "/municipal/lowboy.webp",
      brand: "pitts",
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
    {
      category: "Tag Along Trailers",
      copy: "Tag-along equipment trailers with a 21' deck and 60” lay-flat dovetail. Spring-assisted ramps and 40,000 lb of equally distributed capacity. FOB Pittsview, AL; transport to other locations subject to additional charge.",
      photo: "/municipal/tag-along.webp",
      brand: "pitts",
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
  ] as EquipmentUnit[],
};

/* ---------------- Page 11 — Our Government Purchasing Programs (light) ---------------- */
export const PROGRAMS = {
  eyebrow: "Our Government Purchasing Programs",
  headline: "Pre-negotiated. Pre-approved. Ready to buy.",
  intro:
    "Pre-negotiated cooperative contracts that simplify procurement for public agencies — no lengthy bid process required.",
  cards: [
    {
      logo: "/municipal/fsa-logo.webp",
      name: "Florida Sheriffs Association Cooperative",
      badge: "Primary Vendor",
      sub: "Walking Floors, Tippers, Low-Boys & More",
      copy: "Streamlined procurement for municipalities, police agencies, and state colleges since 1993.",
      bullets: [
        "Pre-negotiated purchasing contracts",
        "Serving cities, counties & public safety",
      ],
      link: "https://www.fsasheriffs.org",
    },
    {
      logo: "/municipal/sourcewell-logo.webp",
      name: "Sourcewell",
      badge: "Authorized Dealer",
      sub: "Municipal Equipment via MAC Trailer",
      copy: "Cooperative purchasing for education, nonprofits, and government agencies.",
      bullets: [
        "Easy cooperative purchasing",
        "MAC Trailer equipment at contract pricing",
      ],
      link: "https://www.sourcewell-mn.gov",
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
};

/* ---------------- Page 12 — Exclusive Benefits (light) ---------------- */
export const BENEFITS = {
  eyebrow: "Working With Nationwide Haul",
  headline: "Exclusive benefits for government clients.",
  intro: "Designed to meet public procurement requirements and tight budget cycles.",
  items: [
    {
      title: "Dedicated Account Manager",
      copy: "A single point of contact for all procurement needs, bid documentation, and fleet orders.",
    },
    {
      title: "Government Pricing Tiers",
      copy: "Volume-based pricing aligned with GSA and state cooperative purchasing agreements.",
    },
    {
      title: "Fleet-Ready Inventory",
      copy: "Pre-inspected, DOT-compliant units available for immediate deployment across your agency.",
    },
    {
      title: "Compliance Documentation",
      copy: "Full records package: title, inspection reports, maintenance history, and warranty docs.",
    },
    {
      title: "Flexible Financing Options",
      copy: "Municipal lease programs and deferred payment options designed for fiscal year cycles.",
    },
    {
      title: "Priority Service Access",
      copy: "Preferred scheduling at our certified service centers for all municipal fleet vehicles.",
    },
  ],
};

/* ---------------- Page 13 — How to Purchase (light) ---------------- */
export const PURCHASE = {
  eyebrow: "How to Purchase",
  headline: "Four steps from quote to delivery.",
  steps: [
    {
      title: "Contact your sales rep.",
      copy: "Tell us what you need. We'll confirm availability and which cooperative contract applies.",
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
      copy: "From our yard to yours.",
    },
  ],
  reassurance:
    "Every cooperative purchase includes the documentation your finance department and auditors need.",
};

/* ---------------- Page 14 — Back Cover (dark) ---------------- */
export const BACK = {
  headline: "Let's put your fleet to work.",
  sub: `${BRAND.program} · 2026`,
  contacts: [
    { label: "Email", value: BRAND.email },
    { label: "Web", value: BRAND.site },
  ],
  note: "Contact your sales rep for quotes, contract numbers, and delivery timelines.",
};

/** Titles for thumbnails / chapter chips. Index = page number - 1. */
export const MUNI_PAGES: { n: number; title: string; dark: boolean }[] = [
  { n: 1, title: "Cover", dark: true },
  { n: 2, title: "Why Nationwide Haul", dark: false },
  { n: 3, title: "Trusted By", dark: false },
  ...EQUIPMENT.units.map((u, i) => ({ n: 4 + i, title: u.category, dark: false })),
  { n: 11, title: "Purchasing Programs", dark: false },
  { n: 12, title: "Government Benefits", dark: false },
  { n: 13, title: "How to Purchase", dark: false },
  { n: 14, title: "Back Cover", dark: true },
];

export const MUNI_CHAPTERS: { label: string; page: number }[] = [
  { label: "Cover", page: 1 },
  { label: "Why NH", page: 2 },
  { label: "Trusted By", page: 3 },
  { label: "Equipment", page: 4 },
  { label: "Programs", page: 11 },
  { label: "Benefits", page: 12 },
  { label: "How to Buy", page: 13 },
  { label: "Contact", page: 14 },
];

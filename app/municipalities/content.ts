/**
 * NH Municipal Fleet Catalog — single source of truth for all copy.
 * Both the /municipalities flipbook and the print/PDF route render from this file.
 *
 * Anything wrapped in [square brackets] is an open item for Adriana and is
 * rendered as a visible highlighted placeholder in the flipbook AND the PDF.
 */

export const MUNI_TOTAL_PAGES = 12;

export const BRAND = {
  name: "Nationwide Haul",
  wordmark: "NATIONWIDE HAUL",
  program: "Government Fleet Solutions",
  site: "nationwidehaul.com",
  email: "govbid@nationwidehaul.com",
  contracts: ["FSA", "Sourcewell", "FLAGFA"],
  contractsDot: "FSA · Sourcewell · FLAGFA",
};

/** Footer strip repeated on every interior (light) page. */
export const FOOTER = {
  vendorLine: "Cooperative Contract Vendor — FSA | Sourcewell | FLAGFA",
  contact: BRAND.email,
};

/* ---------------- Page 1 — Cover (dark) ---------------- */
export const COVER = {
  eyebrow: "2026 Municipal Catalog",
  title: BRAND.wordmark,
  subtitle: BRAND.program,
  tagline:
    "Trailers and equipment for municipalities, counties, and public agencies — available through cooperative purchasing contracts.",
  contracts: BRAND.contractsDot,
  photo: "/municipal/tipper-2.webp",
};

/* ---------------- Page 2 — Why Nationwide Haul (light) ---------------- */
export const WHY = {
  eyebrow: "Why Nationwide Haul",
  headline: "Government fleets are our lane.",
  body: [
    "We keep real inventory on the ground in Florida and Georgia. When your department needs a trailer, it's in our yard — not on a production schedule.",
    "And because we're an approved cooperative contract vendor, your purchase runs through contracts that were already competitively bid. Compliant procurement, without the RFP timeline.",
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

/* ---------------- Page 3 — Cooperative Purchasing (light) ---------------- */
export const COOP = {
  eyebrow: "Cooperative Purchasing",
  headline: "Skip the bid process. Stay compliant.",
  body: "Cooperative contracts have already gone through competitive solicitation. The bidding is done, the pricing is set, and your purchase is audit-ready from day one.",
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
    "Not sure if your agency qualifies? Most Florida and Georgia municipalities, counties, school districts, and special districts do. Call us — we'll check with you.",
};

/* ---------------- Pages 4–7 — Equipment Lineup (light spread) ---------------- */
export interface EquipmentUnit {
  category: string;
  copy: string;
  /** Real photo in /public/municipal. When absent, photoSlot renders as a placeholder. */
  photo?: string;
  photoSlot?: string;
  /** Spec highlights, collapsed behind a "Specs" toggle in the flipbook. */
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
        copy: "Self-unloading walking-floor trailers for transfer stations, yard waste, and bulky debris. No tipping, no overhead clearance issues. Built by MAC Trailer in lightweight extruded aluminum.",
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
        copy: "Transfer trailers built for tipper operation — back in, lift, and gone. 6061 extruded aluminum keeps tare weight down and payload up.",
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
        photo: "/municipal/leachate-tank.webp",
      },
      {
        category: "Sludge Dumps",
        copy: "[ADRIANA: sludge dump copy + specs]",
        photoSlot: "[ADRIANA: sludge dump photo]",
      },
    ],
    [
      {
        category: "Rail Chassis — Waste",
        copy: "[ADRIANA: rail chassis copy + specs]",
        photoSlot: "[ADRIANA: rail chassis photo]",
      },
      {
        category: "Gooseneck Lowboy",
        copy: "Hydraulic detachable gooseneck lowboy rated at 55 tons in 12' — for moving excavators, dozers, and loaders between job sites. Level Apitong deck, front approach ramp with traction cleats, 4-position ride-height control.",
        photo: "/municipal/lowboy.webp",
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
        copy: "Tag-along equipment trailers with a 21' deck and 60” lay-flat dovetail. Spring-assisted ramps and 40,000 lb of equally distributed capacity. FOB Pittsview, AL; transport to other locations subject to additional charge.",
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

/* ---------------- Page 8 — Our Government Purchasing Programs (light) ---------------- */
export const PROGRAMS = {
  eyebrow: "Our Government Purchasing Programs",
  headline: "Pre-negotiated. Pre-approved. Ready to buy.",
  intro:
    "Pre-negotiated cooperative contracts that simplify procurement for public agencies — no lengthy bid process required.",
  cards: [
    {
      logo: "/municipal/sourcewell-logo.webp",
      name: "Sourcewell",
      badge: "Authorized Dealer",
      sub: "Municipal Equipment via MAC Trailer",
      copy: "Sourcewell simplifies government procurement for education, nonprofits, and agencies. We work via MAC Trailer to provide high-quality municipal trailers at competitive pricing.",
      bullets: [
        "Easy cooperative purchasing for municipalities",
        "Exclusive access to MAC Trailer equipment",
      ],
      link: "https://www.sourcewell-mn.gov",
    },
    {
      logo: "/municipal/fsa-logo.webp",
      name: "Florida Sheriffs Association Cooperative",
      badge: "Primary Vendor",
      sub: "Walking Floors, Tippers, Low-Boys & More",
      copy: "The FSA Cooperative has provided streamlined procurement to municipalities, police agencies, and state colleges since 1993.",
      bullets: [
        "Pre-negotiated purchasing contracts",
        "Serving cities, counties & public safety agencies",
      ],
      link: "https://www.fsasheriffs.org",
    },
  ],
};

/* ---------------- Page 9 — Service & Parts (light) ---------------- */
export const SERVICE = {
  eyebrow: "Service & Parts",
  headline: "Support after the sale.",
  body: "Public works equipment can't sit in a repair queue. Our NHTTR service centers handle trailer repair, DOT inspections, and parts — so your units stay on the road and your maintenance records stay clean.",
  bullets: [
    "Trailer repair & refurbishment",
    "DOT inspections",
    "Parts department",
    "[Mobile service? — ADRIANA: confirm]",
  ],
  photoSlot: "[ADRIANA: NHTTR service bay photo]",
};

/* ---------------- Page 10 — How to Purchase (light) ---------------- */
export const PURCHASE = {
  eyebrow: "How to Purchase",
  headline: "Four steps from quote to delivery.",
  steps: [
    {
      title: "Tell us what you need.",
      copy: "Email your equipment requirements. We'll confirm availability and which cooperative contract applies.",
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

/* ---------------- Page 11 — Trusted By (light) ---------------- */
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

/* ---------------- Page 12 — Back Cover (dark) ---------------- */
export const BACK = {
  title: BRAND.wordmark,
  subtitle: BRAND.program,
  contact: [
    "Contact your sales rep for more info.",
    BRAND.email,
    BRAND.site,
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
  { n: 8, title: "Purchasing Programs", dark: false },
  { n: 9, title: "Service & Parts", dark: false },
  { n: 10, title: "How to Purchase", dark: false },
  { n: 11, title: "Trusted By", dark: false },
  { n: 12, title: "Back Cover", dark: true },
];

export const MUNI_CHAPTERS: { label: string; page: number }[] = [
  { label: "Cover", page: 1 },
  { label: "Why NH", page: 2 },
  { label: "Cooperative", page: 3 },
  { label: "Equipment", page: 4 },
  { label: "Programs", page: 8 },
  { label: "Service", page: 9 },
  { label: "How to Buy", page: 10 },
  { label: "Trusted By", page: 11 },
  { label: "Contact", page: 12 },
];

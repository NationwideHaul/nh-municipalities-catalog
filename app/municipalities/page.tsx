import type { Metadata } from "next";
import MunicipalClient from "./MunicipalClient";
import "./municipal.css";

const SITE_URL = "https://catalog.nationwidehaul.com";

// Direct-link only for now — intentionally absent from the main nav and sitemap.
export const metadata: Metadata = {
  title: "Nationwide Haul — Government Fleet Solutions",
  description:
    "Trailers and equipment for municipalities, counties, and public agencies — available through cooperative purchasing contracts. FSA · Sourcewell · FLAGFA.",
  alternates: { canonical: `${SITE_URL}/municipalities` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/municipalities`,
    siteName: "Nationwide Haul",
    title: "Nationwide Haul — Government Fleet Solutions",
    description:
      "Trailers and equipment for municipalities, counties, and public agencies — available through cooperative purchasing contracts.",
    images: [
      { url: "/og/cover.jpg", width: 1200, height: 630, alt: "Nationwide Haul — Government Fleet Solutions" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nationwide Haul — Government Fleet Solutions",
    description:
      "Municipal trailers and equipment through cooperative purchasing contracts — FSA · Sourcewell · FLAGFA.",
    images: ["/og/cover.jpg"],
  },
};

export default function MunicipalitiesPage() {
  return <MunicipalClient />;
}

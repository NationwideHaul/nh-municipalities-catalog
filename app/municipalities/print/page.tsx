import type { Metadata } from "next";
import { MunicipalPrintSheets } from "@/components/municipal/MunicipalPages";
import "../municipal.css";

// Render target for the PDF export script — not meant for humans or crawlers.
export const metadata: Metadata = {
  title: "NH Municipal Catalog — Print",
  robots: { index: false, follow: false },
};

export default function MunicipalPrintPage() {
  return (
    <main className="muni-print">
      <MunicipalPrintSheets />
    </main>
  );
}

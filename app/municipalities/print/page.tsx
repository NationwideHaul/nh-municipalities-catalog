import type { Metadata } from "next";
import { MUNI_PAGE_COMPONENTS } from "@/components/municipal/MunicipalPages";
import "../municipal.css";

// Render target for the PDF export script — not meant for humans or crawlers.
export const metadata: Metadata = {
  title: "NH Municipal Catalog — Print",
  robots: { index: false, follow: false },
};

export default function MunicipalPrintPage() {
  return (
    <main className="muni-print">
      {MUNI_PAGE_COMPONENTS.map(({ n, Component }) => (
        <section className="print-sheet" key={n}>
          <Component />
        </section>
      ))}
    </main>
  );
}

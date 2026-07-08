"use client";

import dynamic from "next/dynamic";

const MunicipalFlipbook = dynamic(() => import("@/components/MunicipalFlipbook"), {
  ssr: false,
  loading: () => (
    <div className="app">
      <div className="loader">
        <div className="spinner" />
      </div>
    </div>
  ),
});

export default function MunicipalClient() {
  return <MunicipalFlipbook />;
}

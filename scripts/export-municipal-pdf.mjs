/**
 * Export the NH Municipal Fleet Catalog as a single print-ready PDF.
 *
 * Renders /municipalities/print (all 9 letter-size sheets stacked with
 * page breaks) in headless Chromium and saves:
 *   - ./nh-municipal-catalog.pdf            (deliverable)
 *   - ./public/nh-municipal-catalog.pdf     (served by the flipbook's Download button)
 *
 * Usage:
 *   node scripts/export-municipal-pdf.mjs
 *   BASE_URL=http://localhost:3000 node scripts/export-municipal-pdf.mjs   # reuse a running server
 */

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = process.env.PORT || 4319;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const PRINT_URL = `${BASE_URL}/municipalities/print`;
const OUT = join(ROOT, "nh-municipal-catalog.pdf");
const OUT_PUBLIC = join(ROOT, "public", "nh-municipal-catalog.pdf");

async function serverUp(url) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    return res.ok;
  } catch {
    return false;
  }
}

async function waitForServer(url, timeoutMs = 180_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await serverUp(url)) return;
    await new Promise((r) => setTimeout(r, 1500));
  }
  throw new Error(`Server did not respond at ${url} within ${timeoutMs / 1000}s`);
}

async function main() {
  let server = null;

  if (await serverUp(PRINT_URL)) {
    console.log(`Using running server at ${BASE_URL}`);
  } else {
    console.log(`Starting Next dev server on port ${PORT}…`);
    server = spawn("npx", ["next", "dev", "-p", String(PORT)], {
      cwd: ROOT,
      stdio: "ignore",
      detached: false,
    });
    await waitForServer(PRINT_URL);
    console.log("Server is up.");
  }

  try {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 816, height: 1056 } });

    console.log(`Rendering ${PRINT_URL}…`);
    await page.goto(PRINT_URL, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });
    // settle fonts/layout before capture
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);

    await page.pdf({
      path: OUT,
      format: "Letter",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await browser.close();

    mkdirSync(dirname(OUT_PUBLIC), { recursive: true });
    copyFileSync(OUT, OUT_PUBLIC);

    console.log(`\n✔ PDF written to:\n  ${OUT}\n  ${OUT_PUBLIC}`);
  } finally {
    if (server) {
      server.kill("SIGTERM");
      console.log("Dev server stopped.");
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

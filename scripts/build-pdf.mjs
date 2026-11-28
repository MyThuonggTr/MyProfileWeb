// Print /en/print/ and /vi/print/ from the built site (dist/client) into public/downloads/*.pdf
// (override the output folder with PDF_OUT_DIR).
// Uses the installed Google Chrome through playwright-core; fails if any slide overflows its 16:9 frame.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, "dist/client");
const outDir = path.resolve(process.env.PDF_OUT_DIR ?? path.join(root, "public/downloads"));
if (!fs.existsSync(path.join(dist, "en/print/index.html"))) throw new Error("run npm run build first");
fs.mkdirSync(outDir, { recursive: true });

const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".woff": "font/woff" };
const server = http.createServer((req, res) => {
  let p = path.join(dist, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (!p.startsWith(dist)) return res.writeHead(403).end();
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, "index.html");
  if (!fs.existsSync(p)) return res.writeHead(404).end();
  res.writeHead(200, { "content-type": types[path.extname(p)] ?? "application/octet-stream" });
  fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch({ channel: "chrome" });
let failed = false;
try {
  for (const lang of ["en", "vi"]) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    await page.goto(`${base}/${lang}/print/`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready); // slides are measured only after the fonts are loaded
    const overflow = await page.$$eval(".slide", (els) =>
      els.map((el, i) => ({ i: i + 1, over: el.scrollHeight - el.clientHeight })).filter((x) => x.over > 0),
    );
    if (overflow.length) {
      failed = true;
      console.error(`${lang}: slides overflow`, overflow);
    }
    // page numbers in the footers ("n/total") must match the real number of slides
    const footers = await page.$$eval(".slide footer", (els) => els.map((el) => el.textContent.trim()));
    const bad = footers.filter((f, i) => !f.endsWith(`${i + 1}/${footers.length}`));
    if (bad.length) {
      failed = true;
      console.error(`${lang}: footer page numbers do not match ${footers.length} slides`, bad.slice(0, 2));
    }
    const out = path.join(outDir, `trinh-thi-my-thuong-real-estate-valuation-portfolio-${lang}.pdf`);
    await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true });
    console.log(`${lang}: ${out}`);
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}
if (failed) process.exit(1);

// Print /en/print/ and /vi/print/ from the built site (dist/) into public/downloads/*.pdf.
// Uses the installed Google Chrome through playwright-core; fails if any slide overflows its 16:9 frame.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, "dist");
if (!fs.existsSync(path.join(dist, "en/print/index.html"))) throw new Error("run astro build first");

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
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.$$eval(".slide", (els) =>
      els.map((el, i) => ({ i: i + 1, over: el.scrollHeight - el.clientHeight })).filter((x) => x.over > 0),
    );
    if (overflow.length) {
      failed = true;
      console.error(`${lang}: slides overflow`, overflow);
    }
    const out = path.join(root, `public/downloads/trinh-thi-my-thuong-real-estate-valuation-portfolio-${lang}.pdf`);
    await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true });
    console.log(`${lang}: ${out}`);
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}
if (failed) process.exit(1);

// Scan everything the public can download for real names and personal data, and check that
// every confirmed figure shown on the site appears in its page.
//   node scripts/leak-check.mjs --alias ../portfolio/content/alias-map.csv [--dir dist/client]
// The alias map stays outside this repo; only counts are printed, never the matched names.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import ExcelJS from "exceljs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const arg = (name, dflt) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 ? process.argv[i + 1] : dflt;
};
const aliasPath = arg("alias");
if (!aliasPath || !fs.existsSync(aliasPath)) throw new Error("pass --alias <path to alias-map.csv outside the repo>");
const dir = path.resolve(arg("dir", path.join(root, "dist/client")));

// --- terms that must never appear
const parseCsvLine = (l) => (l.match(/("([^"]|"")*"|[^,]*)(,|$)/g) ?? []).map((c) => c.replace(/,$/, "").replace(/^"|"$/g, "").replace(/""/g, '"'));
const reals = fs.readFileSync(aliasPath, "utf8").trim().split("\n").slice(1).map((l) => parseCsvLine(l)[0]).filter(Boolean);
const fixed = ["/Users/", "file:///", "+84", "18/05/2003", "Bình Đông", "1.100", "1,100", "07/2034", "596bn", "596 tỷ", "596,05", "596.05"];
const norm = (s) => s.normalize("NFC");
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const patterns = [...reals, ...fixed].map((term) =>
  term.length < 6 ? new RegExp(`(?<![\\p{L}\\d])${esc(norm(term))}(?![\\p{L}\\d])`, "u") : new RegExp(esc(norm(term)), "iu"),
);

// --- collect public text
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const files = walk(dir);
const rel = (f) => path.relative(dir, f).split(path.sep).join("/"); // same names on Windows and POSIX
const htmlText = (s) => s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ");
const sources = [];
for (const f of files.filter((f) => f.endsWith(".html"))) sources.push({ name: rel(f), text: norm(htmlText(fs.readFileSync(f, "utf8"))) });
for (const f of files.filter((f) => f.endsWith(".pdf"))) sources.push({ name: rel(f), text: norm(execFileSync("pdftotext", ["-enc", "UTF-8", f, "-"]).toString()) });
for (const f of files.filter((f) => f.endsWith(".docx"))) {
  // body, headers, footers, comments and document properties
  const parts = execFileSync("unzip", ["-Z1", f]).toString().split("\n").filter((p) => /^(word\/.*\.xml|docProps\/.*\.xml)$/.test(p));
  const xml = parts.map((p) => execFileSync("unzip", ["-p", f, p]).toString()).join(" ");
  sources.push({ name: rel(f), text: norm(htmlText(xml)) });
}
// JS and CSS bundles are public too: scan them as raw text (content is embedded in the route chunks)
for (const f of files.filter((f) => /\.(R|csv|txt|js|css)$/.test(f))) sources.push({ name: rel(f), text: norm(fs.readFileSync(f, "utf8")) });

let crosscheckSheet = false;
for (const f of files.filter((f) => f.endsWith(".xlsx"))) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(f);
  const parts = [wb.creator, wb.lastModifiedBy, wb.company, wb.manager, wb.title, wb.subject, wb.keywords, wb.description];
  wb.eachSheet((ws) => {
    if (/cross.?check/i.test(ws.name)) crosscheckSheet = true;
    parts.push(ws.name);
    ws.eachRow({ includeEmpty: false }, (row) =>
      row.eachCell({ includeEmpty: false }, (c) => {
        try { parts.push(c.text); } catch { parts.push(String(c.result ?? c.formula ?? "")); } // merged cells with an empty master
      }),
    );
  });
  // raw package parts too: Excel stores the save folder (absPath) and other metadata outside the cells
  const raw = execFileSync("unzip", ["-p", f], { maxBuffer: 256 * 1024 * 1024 }).toString("latin1").match(/(?:\/Users\/|file:\/\/\/|[A-Z]:\\\\)[^"<]*/g) ?? [];
  sources.push({ name: rel(f), text: norm([...parts.filter(Boolean), ...raw].join("\n")) });
}

let leaks = 0;
for (const s of sources) {
  const hits = patterns.filter((p) => p.test(s.text)).length;
  if (hits) console.error(`leak: ${s.name} matches ${hits} protected term(s)`);
  leaks += hits;
}

// --- confirmed figures must appear on their page, formatted per language
const figures = JSON.parse(fs.readFileSync(path.join(root, "src/data/figures.json"), "utf8"));
const pageOf = { case3: "cases/grade-b-office/index.html", case2: "cases/riverside-residences/index.html", case4: "cases/acquisition-checklist/index.html", about: "index.html" };
const fmt = (n, lang, d) => n.toLocaleString(lang === "vi" ? "vi-VN" : "en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
const decimals = (v) => (String(v).split(".")[1] ?? "").length;
function expected(f, lang) {
  const v = Number(f.value);
  if (Number.isNaN(v)) return lang === "vi" ? f.value : null; // text figure, written in Vietnamese
  if (f.unit === "VND") return fmt(Math.round(v / 1e9), lang, 0);
  if (f.unit.startsWith("%")) return `${fmt(v, lang, decimals(f.value))}%`;
  if (f.unit === "VND bn") return fmt(v, lang, v >= 100 ? 0 : decimals(f.value)); // large amounts are shown rounded
  return f.value;
}
const missing = [];
for (const f of figures) {
  if (f.value === "[CẦN XÁC NHẬN]" || !pageOf[f.case] || !f.on_page) continue; // model-only and chart-only figures are not shown
  for (const lang of ["en", "vi"]) {
    const want = expected(f, lang);
    if (want === null) continue;
    const page = sources.find((s) => s.name === `${lang}/${pageOf[f.case]}`);
    if (!page || !page.text.includes(norm(want))) missing.push(`${lang}:${f.case}.${f.key}=${want}`);
  }
}

const count = (ext) => files.filter((f) => f.endsWith(ext)).length;
console.log(`sources=${sources.length} (html=${count(".html")}, pdf=${count(".pdf")}, xlsx=${count(".xlsx")}, js=${count(".js")}, css=${count(".css")})`);
console.log(`leaks=${leaks} missing=${JSON.stringify(missing)} crosscheck_sheet=${crosscheckSheet ? "True" : "False"}`);
process.exit(leaks || missing.length || crosscheckSheet ? 1 : 0);

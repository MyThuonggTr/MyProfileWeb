// Copy the public parts of the single content source into this repo.
// Private rows (web: false), local-only figures and source file paths never leave ../portfolio.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const src = path.resolve(root, "../portfolio");
const must = (p) => {
  if (!fs.existsSync(p)) throw new Error(`missing source: ${p}`);
  return p;
};

const content = JSON.parse(fs.readFileSync(must(path.join(src, "content/content.json")), "utf8"));
const publicContent = {
  blocks: content.blocks.map((b) => ({
    name: b.name,
    key: b.key,
    rows: b.rows.filter((r) => r.web !== false).map(({ web, ...r }) => r),
  })),
};
fs.writeFileSync(path.join(root, "src/data/content.json"), JSON.stringify(publicContent, null, 2) + "\n");

// figures.csv: keep case,key,value,unit,on_page; drop the local-only cross-check rows and the source column.
const parseCsvLine = (l) => (l.match(/("([^"]|"")*"|[^,]*)(,|$)/g) ?? []).map((c) => c.replace(/,$/, "").replace(/^"|"$/g, "").replace(/""/g, '"'));
const lines = fs.readFileSync(must(path.join(src, "content/figures.csv")), "utf8").trim().split(/\r?\n/).slice(1);
const figures = lines
  .map(parseCsvLine)
  .map(([c, key, value, unit, , onPage]) => ({ case: c, key, value, unit, on_page: onPage !== "no" }))
  .filter((f) => !f.key.startsWith("crosscheck"));
fs.writeFileSync(path.join(root, "src/data/figures.json"), JSON.stringify(figures, null, 2) + "\n");

const copies = [
  ["charts/case3-sensitivity-heatmap-en.png", "public/images/case3-sensitivity-heatmap-en.png"],
  ["charts/case3-sensitivity-heatmap-vi.png", "public/images/case3-sensitivity-heatmap-vi.png"],
  ...["model-map", "funding-and-sensitivity"].flatMap((n) =>
    ["en", "vi"].map((l) => [`charts/case2-${n}-${l}.png`, `public/images/case2-${n}-${l}.png`]),
  ),
  ["excel/Grade-B Office HCMC - DCF Valuation.xlsx", "public/downloads/grade-b-office-hcmc-dcf-valuation.xlsx"],
];
for (const [from, to] of copies) fs.copyFileSync(must(path.join(src, from)), path.join(root, to));
console.log(`synced: ${publicContent.blocks.length} blocks, ${figures.length} figures, ${copies.length} files`);

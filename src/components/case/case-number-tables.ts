// Data behind the "Show the numbers" tables, read from figures.json (synced from figures.csv)
// and content.json so the tables always match the charts' source numbers.
import figures from "../../data/figures.json";
import { rich, type Lang } from "../../lib/content";
import { num, ui } from "../../lib/ui";
import { caseLabels } from "../../lib/ui-case-labels";
import type { NumbersTableData } from "./case-numbers-table";

type Figure = { case: string; key: string; value: string };
const FIGURES: Figure[] = figures;

/** Numeric value of a figure; a missing or non-numeric figure fails the build. */
export function figure(caseKey: string, key: string): number {
  const f = FIGURES.find((x) => x.case === caseKey && x.key === key);
  const n = Number(f?.value);
  if (!f || !Number.isFinite(n)) throw new Error(`figure missing or not numeric: ${caseKey}.${key}`);
  return n;
}

/** Grid cells whose key matches `pattern` (two numeric capture groups: row, column). */
function grid(caseKey: string, pattern: RegExp) {
  const cells = FIGURES.filter((f) => f.case === caseKey && pattern.test(f.key)).map((f) => {
    const m = f.key.match(pattern);
    if (!m) throw new Error(`figure key does not match its grid: ${f.key}`);
    return { row: Number(m[1]), col: Number(m[2]), key: f.key };
  });
  const sorted = (xs: number[]) => [...new Set(xs)].sort((a, b) => a - b);
  /** Value at (row, col); a hole in the grid fails the build. */
  const at = (row: number, col: number) => {
    const c = cells.find((x) => x.row === row && x.col === col);
    if (!c) throw new Error(`figure grid ${caseKey} has no cell at ${row}, ${col}`);
    return figure(caseKey, c.key);
  };
  return { rows: sorted(cells.map((c) => c.row)), cols: sorted(cells.map((c) => c.col)), at };
}

/** Percentage with as many decimals as the source value has (3 → "3%", 7.78 → "7.78%"). */
const pct = (x: number, lang: Lang) => `${num(x, lang, String(x).split(".")[1]?.length ?? 0)}%`;

/** Signed change vs base: "+5%", "-10%", "0". */
const change = (x: number) => (x > 0 ? `+${x}%` : x < 0 ? `${x}%` : "0");

/** Grade-B office: market value (VND bn) by terminal growth g (rows) × discount rate r (columns). */
export function dcfSensitivityTable(lang: Lang): NumbersTableData {
  const g = grid("case3", /^sens_g([\d.]+)_r([\d.]+)$/);
  const base = { g: figure("case3", "terminal_growth"), r: figure("case3", "discount_rate") };
  return {
    caption: ui(lang).sensCaption,
    corner: caseLabels(lang).sensCorner,
    columns: g.cols.map((r) => pct(r, lang)),
    rows: g.rows.map((gv) => ({ head: pct(gv, lang), cells: g.cols.map((r) => num(g.at(gv, r), lang)) })),
    base: { row: g.rows.indexOf(base.g), col: g.cols.indexOf(base.r) },
  };
}

/** Riverside: project IRR by construction cost (rows, % of base) × sale price change (columns). */
export function irrGridTable(lang: Lang): NumbersTableData {
  const g = grid("case2", /^irr_c(\d+)_p(-?\d+)$/);
  return {
    caption: caseLabels(lang).irrGridCaption,
    corner: "",
    columns: g.cols.map(change),
    rows: g.rows.map((c) => ({ head: change(c - 100), cells: g.cols.map((p) => `${num(g.at(c, p), lang, 1)}%`) })),
    base: { row: g.rows.indexOf(100), col: g.cols.indexOf(0) },
  };
}

/** One sales-delay scenario of the legal study's worked example (content.json case4.example items). */
export type Scenario = { scenario: string; irr: string; npv: string; peak: string };
export const scenarios = (lang: Lang) => rich<Scenario>("case4", "example", lang);

/** Legal study: IRR, NPV and peak funding per sales-delay scenario. */
export function scenarioTable(lang: Lang): NumbersTableData {
  const t = ui(lang);
  return {
    caption: t.irrByScenario,
    corner: t.exScenario,
    columns: [t.exIrr, t.exNpv, t.exPeak],
    rows: scenarios(lang).map((s) => ({ head: s.scenario, cells: [s.irr, s.npv, s.peak] })),
  };
}

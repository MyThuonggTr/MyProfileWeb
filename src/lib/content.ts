// Reads the synced single content source (src/data/content.json) and turns its
// "Label: text" rows into the pieces the pages need. Text is never retyped here.
import data from "../data/content.json";

export type Lang = "en" | "vi";
export const LANGS: Lang[] = ["en", "vi"];
const TODO = "[CHƯA VIẾT]";

type Item = { value: string; label: string };
type Row = { id: string; en: string; vi: string; items?: Record<Lang, Item[]> };
type Block = { key: string; rows: Row[] };

const blocks = data.blocks as Block[];

function row(block: string, id: string): Row {
  const r = blocks.find((b) => b.key === block)?.rows.find((x) => x.id === id);
  if (!r) throw new Error(`content row not found: ${block}.${id}`);
  return r;
}

/** Full row text with unfinished markers removed. */
export function raw(block: string, id: string, lang: Lang): string {
  return row(block, id)[lang].replace(TODO, "").trim();
}

/** Splits "Label: body" when the label is short; otherwise the whole text is body. */
export function labelled(block: string, id: string, lang: Lang): { label: string; body: string } {
  const text = raw(block, id, lang);
  const i = text.indexOf(": ");
  if (i > 0 && i <= 45 && !text.slice(0, i).replace(/^\d+\. /, "").includes(". ")) return { label: text.slice(0, i), body: text.slice(i + 2) };
  return { label: "", body: text };
}

/** Body text without its label. */
export const text = (block: string, id: string, lang: Lang) => labelled(block, id, lang).body;

/** "a | b | c" lists. */
export const pipes = (s: string) => s.split(" | ").map((x) => x.trim()).filter(Boolean);

/** "(1) a (2) b" lists. */
export function numbered(s: string): string[] {
  return s.split(/\s*\(\d+\)\s*/).map((x) => x.trim()).filter(Boolean);
}

/** "a; b; c" lists, each item starting with a capital letter and ending with a full stop. */
export function clauses(s: string): string[] {
  return s
    .replace(/\.$/, "")
    .split("; ")
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1) + ".");
}

/** Pulls "Basis: …" / "Căn cứ: …" off the end of a checklist item. */
export function basis(s: string): { body: string; basis: string } {
  const m = s.match(/^(.*?)\s*(?:Basis|Căn cứ): (.*)$/);
  return m ? { body: m[1], basis: m[2] } : { body: s, basis: "" };
}

/** "Title (meta). Body" research entries. */
export function titled(s: string): { title: string; meta: string; body: string } {
  const m = s.match(/^(.*?) \(([^()]*)\)\. (.*)$/);
  return m ? { title: m[1], meta: m[2], body: m[3] } : { title: "", meta: "", body: s };
}

export const items = (block: string, id: string, lang: Lang): Item[] => row(block, id).items?.[lang] ?? [];

// Everything one selected-work row shows for a case, read from content.json.
// The tag line "Kind | Subject | Context. Role: X" feeds the eyebrow and the meta line.
import { card, pipes, text, type Lang } from "../../lib/content";
import { CASES, FILES, caseHref } from "../../lib/ui";
import type { FileKey } from "./home-file-link";

export type CaseKey = (typeof CASES)[number]["key"];

const ROLE_LABEL = /^(?:Role|Vai trò):\s*/i;

/** Case files (model, report) are those listed in FILES under the case key or "<key>Report". */
const isFileKey = (key: string): key is FileKey => FILES.some((f) => f.key === key);

export function workCase(key: CaseKey, lang: Lang) {
  const c = card(key, lang);
  const tags = pipes(text(key, "tagline", lang));
  // First tag loses its "(…)" aside, as on the old project card; the last tag is context + role.
  const kinds = [tags[0].replace(/\s*\(.*\)$/, ""), ...tags.slice(1, -1)];
  const tail = (tags.at(-1) ?? "").split(". ");
  const role = tail.find((x) => ROLE_LABEL.test(x))?.replace(ROLE_LABEL, "");
  const context = tail.filter((x) => !ROLE_LABEL.test(x)).join(". ");
  const files = [key, `${key}Report`].filter(isFileKey);

  return {
    href: caseHref(lang, key),
    kind: kinds.join(" · "),
    title: text(key, "headline", lang),
    purpose: text(key, "question", lang),
    value: c.value,
    valueLabel: c.label,
    meta: [role, c.tools, context].filter((x): x is string => Boolean(x)),
    chart: `/images/${c.chart}-${lang}.png`,
    files,
  };
}

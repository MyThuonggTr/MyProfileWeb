// Names and URLs the case pages use to point at each other and back to the home page project list.
import { pipes, text, type Lang } from "../../lib/content";
import { caseHref, ui, type CASES } from "../../lib/ui";

export type CaseKey = (typeof CASES)[number]["key"];

/** One end of the pager or breadcrumb: where it goes and what it says. */
export type CaseLink = { href: string; label: string };

/** The project list on the home page (its section id is "work", see lib/home-sections.ts). */
export const projectsHref = (lang: Lang) => `/${lang}/#work`;

/** Tagline items: "Kind | Name | Context. Role: …". */
export const taglineParts = (block: CaseKey, lang: Lang) => pipes(text(block, "tagline", lang));

/** Tag chips. A last item "Group coursework, UEH, 03/2025. Role: Team lead" becomes two chips. */
export function caseChips(block: CaseKey, lang: Lang): string[] {
  const tags = taglineParts(block, lang);
  return [...tags.slice(0, -1), ...(tags.at(-1) ?? "").split(". ")];
}

/** Short case name shown in pager links, worded exactly as on the previous site. */
export function caseName(block: CaseKey, lang: Lang): string {
  const parts = taglineParts(block, lang);
  // The legal study is named by its kind ("Applied research"); the two models by their subject.
  return block === "case4" ? parts[0].replace(/\s*\(.*\)$/, "") : parts[1];
}

/** Link to another case page, labelled with its short name. */
export const caseLink = (block: CaseKey, lang: Lang): CaseLink => ({ href: caseHref(lang, block), label: caseName(block, lang) });

/** Forward link to the following case: "Next: <case name>". */
export function nextCaseLink(block: CaseKey, lang: Lang): CaseLink {
  const { href, label } = caseLink(block, lang);
  return { href, label: `${ui(lang).next}: ${label}` };
}

/** Link back to the project list on the home page. */
export const projectsLink = (lang: Lang): CaseLink => ({ href: projectsHref(lang), label: ui(lang).allProjects });

// Everything the 16:9 print slides read from the content source, derived once per language.
import { type Lang, raw, text, labelled, pipes, titled, rich, rowIds } from "../../lib/content";
import { ui } from "../../lib/ui";

type Step = { phase: number; title: string; review: string; risk: string; basis: string };
type Process = { phase: number; title: string; work: string; output: string; who: string; legal: number[] };

export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function printModel(lang: Lang) {
  const tagsOf = (b: string) => pipes(text(b, "tagline", lang));
  const chipsOf = (b: string) => {
    const tg = tagsOf(b);
    return [...tg.slice(0, -1), ...tg.at(-1)!.split(". ")];
  };
  const proc = rich<Process>("case4", "process", lang).map((x, k) => ({ ...x, n: k + 1 }));
  const edu = raw("education", "summary", lang).split(" | ");
  return {
    lang,
    t: ui(lang),
    site: import.meta.env.PUBLIC_SITE_URL as string | undefined,
    title: text("hero", "title", lang),
    target: text("hero", "target", lang),
    edu,
    eduPoints: edu[2].split(/(?<=\.) (?=[A-ZĐÀ-Ỹ])/u),
    creds: ["valuation", "english", "chinese", "ic3"].map((id) => raw("credentials", id, lang)),
    skills: rowIds("skills_map").filter((id) => id !== "headline").map((id) => raw("skills_map", id, lang).split(" | ")),
    tagsOf,
    chipsOf,
    steps: rich<Step>("case4", "steps", lang).map((x, k) => ({ ...x, n: k + 1 })),
    phaseNames: pipes(text("case4", "phases", lang)),
    proc,
    ownerOf: Object.fromEntries(proc.flatMap((x) => x.legal.map((k) => [k, x.n]))) as Record<number, number>,
    lenses: rich<{ role: string; points: string[] }>("case4", "lenses", lang),
    scenarios: rich<{ scenario: string; irr: string; npv: string; peak: string }>("case4", "example", lang),
    chatbot: text("research", "chatbot_body", lang),
    dow: titled(raw("research", "dowjones", lang)),
    ebib: titled(raw("research", "ebib", lang)),
    principles: ["p1", "p2", "p3"].map((id) => labelled("principles", id, lang)),
    L: (b: string, id: string) => labelled(b, id, lang),
  };
}

export type PrintModel = ReturnType<typeof printModel>;
/** Footer text of slide number `page`: "name · target · Page n/total". Pure, so server and client renders agree. */
export type Foot = (page: number) => string;

// Section anchors on the home page, in page order. The header nav links to these ids,
// so the home route must render a section with each id in both languages.
import type { Lang } from "./content";
import { ui } from "./ui";

type NavKey = keyof ReturnType<typeof ui>["nav"];

export const HOME_SECTIONS = [
  { id: "work", label: "projects" },
  { id: "experience", label: "experience" },
  { id: "skills", label: "skills" },
  { id: "education", label: "education" },
  { id: "research", label: "research" },
  { id: "documents", label: "downloads" },
] as const satisfies readonly { id: string; label: NavKey }[];

export type HomeSectionId = (typeof HOME_SECTIONS)[number]["id"];

/** Link to a home section: a bare hash on the home page, otherwise the full home URL. */
export const sectionHref = (lang: Lang, id: HomeSectionId, onHome: boolean) => (onHome ? `#${id}` : `/${lang}/#${id}`);

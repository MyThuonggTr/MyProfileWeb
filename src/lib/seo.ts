// Per-route <head> helpers: title, description and en/vi hreflang alternates,
// plus the viewport/robots override that root.tsx reads from a route's `handle`.
import type { MetaDescriptor } from "react-router";
import { LANGS, type Lang } from "./content";
import { otherLangPath } from "./ui";
import { parseLang, withTrailingSlash } from "./route-lang";

export type PageHead = { title: string; description: string };

/** Meta tags for one page: title, description and one hreflang alternate per language. */
export function pageMeta(path: string, { title, description }: PageHead): MetaDescriptor[] {
  const p = withTrailingSlash(path);
  return [
    { title },
    { name: "description", content: description },
    ...LANGS.map((l): MetaDescriptor => ({ tagName: "link", rel: "alternate", hrefLang: l, href: otherLangPath(p, l) })),
  ];
}

/** Minimal shape of React Router's MetaArgs that the helper needs. */
type MetaInput = { params: { lang?: string }; location: { pathname: string } };

/**
 * `meta` export body for a `/:lang/...` route. Builds the head from the page's own
 * content for that language; returns no tags for an unknown language (the page 404s).
 */
export function langMeta({ params, location }: MetaInput, head: (lang: Lang) => PageHead): MetaDescriptor[] {
  const lang = parseLang(params.lang);
  return lang ? pageMeta(location.pathname, head(lang)) : [];
}

/** Optional head overrides a route can export as `handle = { head: {...} }`. */
export type HeadHandle = { head: { viewport?: string; robots?: string } };

export const DEFAULT_VIEWPORT = "width=device-width, initial-scale=1";
export const DEFAULT_ROBOTS = "index, follow";

const isHeadHandle = (h: unknown): h is HeadHandle =>
  typeof h === "object" && h !== null && "head" in h && typeof h.head === "object" && h.head !== null;

/** Viewport and robots values for the deepest matched route that overrides them. */
export function headOverrides(handles: unknown[]): { viewport: string; robots: string } {
  let viewport = DEFAULT_VIEWPORT;
  let robots = DEFAULT_ROBOTS;
  for (const h of handles) {
    if (!isHeadHandle(h)) continue;
    viewport = h.head.viewport ?? viewport;
    robots = h.head.robots ?? robots;
  }
  return { viewport, robots };
}

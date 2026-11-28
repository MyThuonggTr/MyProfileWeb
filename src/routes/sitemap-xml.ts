// /sitemap.xml, prerendered at build: every indexable page with its en/vi alternates.
import { LANGS } from "../lib/content";
import { INDEXABLE_PATHS, absoluteUrl } from "../lib/site-pages";
import { otherLangPath } from "../lib/ui";

const entry = (path: string) =>
  [
    "  <url>",
    `    <loc>${absoluteUrl(path)}</loc>`,
    ...LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absoluteUrl(otherLangPath(path, l))}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(otherLangPath(path, "en"))}"/>`,
    "  </url>",
  ].join("\n");

export function loader() {
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...INDEXABLE_PATHS.map(entry),
    "</urlset>",
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}

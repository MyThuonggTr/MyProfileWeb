// 16:9 print version /:lang/print/ (stub), outside the site layout so it loads none of the site CSS.
// scripts/build-pdf.mjs turns it into the downloadable PDFs. The print phase replaces the body.
import type { Route } from "./+types/print";
import { text } from "../lib/content";
import { parseLang, useLang } from "../lib/route-lang";
import type { HeadHandle } from "../lib/seo";
import { ui } from "../lib/ui";

/** Fixed 1280px layout and kept out of search results, as before. */
export const handle: HeadHandle = { head: { viewport: "width=1280", robots: "noindex" } };

export const meta: Route.MetaFunction = ({ params }) => {
  const lang = parseLang(params.lang);
  return lang ? [{ title: `${text("hero", "title", lang)} – ${ui(lang).name} (PDF)` }] : [];
};

export default function Print() {
  const lang = useLang();
  return <h1>{ui(lang).name}</h1>;
}

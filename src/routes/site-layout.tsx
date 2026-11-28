// Pathless layout for the home and case pages: site fonts and CSS,
// skip link, sticky header and contact footer. The print route is outside this layout.
import "../styles/site-web-fonts.css";
import "../styles/font-fallbacks.css";
import "../styles/tokens.css";
import "../styles/base.css";
// Exact (hashed) URLs of the subset files site-web-fonts.css references, for preloading.
import serifLatin from "@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2?url";
import serifVietnamese from "@fontsource-variable/source-serif-4/files/source-serif-4-vietnamese-wght-normal.woff2?url";
import interLatin from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";
import interVietnamese from "@fontsource-variable/inter/files/inter-vietnamese-wght-normal.woff2?url";
import { preload } from "react-dom";
import { Outlet } from "react-router";
import type { Route } from "./+types/site-layout";
import { SiteFooter } from "../components/layout/site-footer";
import { SiteHeader } from "../components/layout/site-header";
import type { Lang } from "../lib/content";
import { useLang } from "../lib/route-lang";
import { ui } from "../lib/ui";

const FONT_PRELOAD = { as: "font", type: "font/woff2", crossOrigin: "anonymous" } as const;

/** Latin subsets: every page (en and vi) renders its first screen with these two files. */
export const links: Route.LinksFunction = () => [
  { rel: "preload", href: serifLatin, ...FONT_PRELOAD },
  { rel: "preload", href: interLatin, ...FONT_PRELOAD },
];

/**
 * Extra subset a language needs above the fold. Vietnamese text renders from latin plus the
 * vietnamese subset only (site-web-fonts.css makes that subset win over
 * latin-ext), so these two small files are all vi pages add. `links` cannot see the URL
 * language, so they go through React's preload(), which prerendering writes into <head>.
 */
const LANG_FONT_PRELOADS: Record<Lang, readonly string[]> = {
  en: [],
  vi: [serifVietnamese, interVietnamese],
};

export default function SiteLayout() {
  const lang = useLang();
  for (const href of LANG_FONT_PRELOADS[lang]) preload(href, FONT_PRELOAD);
  return (
    <>
      <a className="skip" href="#main">
        {ui(lang).skip}
      </a>
      <SiteHeader lang={lang} />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}

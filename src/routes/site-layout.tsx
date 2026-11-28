// Pathless layout for the home and case pages: Editorial Finance fonts and CSS,
// skip link, sticky header and contact footer. The print route is outside this layout.
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/inter";
import "../styles/font-fallbacks.css";
import "../styles/tokens.css";
import "../styles/base.css";
// Exact (hashed) URLs of the subset files the Fontsource CSS above references, for preloading.
import frauncesLatin from "@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2?url";
import frauncesLatinExt from "@fontsource-variable/fraunces/files/fraunces-latin-ext-opsz-normal.woff2?url";
import frauncesVietnamese from "@fontsource-variable/fraunces/files/fraunces-vietnamese-opsz-normal.woff2?url";
import interLatin from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";
import interLatinExt from "@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2?url";
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
  { rel: "preload", href: frauncesLatin, ...FONT_PRELOAD },
  { rel: "preload", href: interLatin, ...FONT_PRELOAD },
];

/**
 * Extra subsets a language needs above the fold. Vietnamese text needs both the vietnamese
 * and the latin-ext files: Fontsource declares latin-ext after vietnamese with overlapping
 * ranges (Ă Đ Ơ Ư ...), and the last matching @font-face wins. `links` cannot see the URL
 * language, so these go through React's preload(), which prerendering writes into <head>.
 */
const LANG_FONT_PRELOADS: Record<Lang, readonly string[]> = {
  en: [],
  vi: [frauncesLatinExt, frauncesVietnamese, interLatinExt, interVietnamese],
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

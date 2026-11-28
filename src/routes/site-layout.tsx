// Pathless layout for the home and case pages: Editorial Finance fonts and CSS,
// skip link, sticky header and contact footer. The print route is outside this layout.
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/inter";
import "../styles/tokens.css";
import "../styles/base.css";
import { Outlet } from "react-router";
import { SiteFooter } from "../components/layout/site-footer";
import { SiteHeader } from "../components/layout/site-header";
import { useLang } from "../lib/route-lang";
import { ui } from "../lib/ui";

export default function SiteLayout() {
  const lang = useLang();
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

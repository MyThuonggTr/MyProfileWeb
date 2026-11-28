// Sticky paper header: name mark, section nav, EN/VI switch (same page) and the PDF download.
// At 820px and below the nav is hidden and the CTA switches to its short label, on one line.
import { Link, useLocation } from "react-router";
import { LANGS, type Lang } from "../../lib/content";
import { HOME_SECTIONS, sectionHref } from "../../lib/home-sections";
import { withTrailingSlash } from "../../lib/route-lang";
import { DOWNLOADS, otherLangPath, ui } from "../../lib/ui";
import { DownloadLink } from "../ui/download-link";
import s from "./site-header.module.css";

export function SiteHeader({ lang }: { lang: Lang }) {
  const t = ui(lang);
  const path = withTrailingSlash(useLocation().pathname);
  const home = `/${lang}/`;
  const onHome = path === home;

  return (
    <header className={s.header}>
      <div className={`wrap ${s.inner}`}>
        <Link to={home} className={s.mark}>
          {t.shortName}
        </Link>

        <nav aria-label={t.mainNav} className={s.nav}>
          <ul>
            {HOME_SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <a href={sectionHref(lang, id, onHome)}>{t.nav[label]}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div role="group" aria-label={t.langLabel} className={s.lang}>
          {LANGS.map((l) => (
            <Link key={l} to={otherLangPath(path, l)} lang={l} hrefLang={l} aria-current={l === lang ? "true" : undefined}>
              {l.toUpperCase()}
            </Link>
          ))}
        </div>

        <DownloadLink file={DOWNLOADS.pdf[lang]} variant="solid" className={s.cta}>
          <span className={s.full}>{t.downloadPdf}</span>
          <span className={s.short}>{t.downloadPdfShort}</span>
        </DownloadLink>
      </div>
    </header>
  );
}

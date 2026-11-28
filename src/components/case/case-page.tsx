// Frame shared by the three case pages: breadcrumb, chips and h1 on top; then the main
// column beside a sticky "at a glance" aside (the aside comes first in the DOM, so on
// narrow screens it follows the headline); then the pager to the neighbouring pages.
import type { ReactNode } from "react";
import type { Lang } from "../../lib/content";
import { ui } from "../../lib/ui";
import { projectsHref, type CaseKey, type CaseLink } from "./case-links";
import { CasePager } from "./case-pager";
import { CaseSummaryAside } from "./case-summary-aside";
import s from "./case-page.module.css";

type CasePageProps = {
  lang: Lang;
  block: CaseKey;
  /** Current page name in the breadcrumb. */
  crumb: string;
  /** Tag chips; the first one is the key chip. */
  chips: string[];
  headline: string;
  back: CaseLink;
  forward: CaseLink;
  /** True when the back link goes to the previous case (it then gets a hidden "Previous" prefix). */
  backIsPrevious?: boolean;
  children: ReactNode;
};

export function CasePage({ lang, block, crumb, chips, headline, back, forward, backIsPrevious, children }: CasePageProps) {
  const t = ui(lang);
  return (
    <>
      <header className={`wrap ${s.head}`}>
        <nav aria-label={t.breadcrumb}>
          <ol className={s.crumbs}>
            <li>
              <a href={projectsHref(lang)}>{t.nav.projects}</a>
            </li>
            <li aria-current="page">{crumb}</li>
          </ol>
        </nav>
        <ul className={s.chips}>
          {chips.map((c, i) => (
            <li key={c} className={i === 0 ? s.chipKey : undefined}>
              {c}
            </li>
          ))}
        </ul>
        <h1 className={s.h1}>{headline}</h1>
      </header>

      <div className={`wrap ${s.body}`}>
        <CaseSummaryAside lang={lang} block={block} className={s.aside} />
        <div className={s.main}>{children}</div>
      </div>

      <CasePager lang={lang} back={back} forward={forward} backIsPrevious={backIsPrevious} />
    </>
  );
}

// Bottom navigation of a case page: back (previous case or project list) and forward.
import type { Lang } from "../../lib/content";
import { caseLabels } from "../../lib/ui-case-labels";
import { Icon } from "../ui/icon";
import type { CaseLink } from "./case-links";
import s from "./case-pager.module.css";

type CasePagerProps = { lang: Lang; back: CaseLink; forward: CaseLink; backIsPrevious?: boolean };

export function CasePager({ lang, back, forward, backIsPrevious }: CasePagerProps) {
  const l = caseLabels(lang);
  return (
    <nav className={s.pager} aria-label={l.caseNav}>
      <div className={`wrap ${s.inner}`}>
        <a className={s.link} href={back.href}>
          <Icon name="arrow-left" size={16} />
          {backIsPrevious && <span className="visually-hidden">{l.previous}: </span>}
          {back.label}
        </a>
        <a className={`${s.link} ${s.forward}`} href={forward.href}>
          {forward.label}
          <Icon name="arrow-right" size={16} />
        </a>
      </div>
    </nav>
  );
}

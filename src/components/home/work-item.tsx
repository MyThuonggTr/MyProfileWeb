// One row of the selected work list: index, kind, linked title, purpose, key number,
// role · tools · context, links (case page and any files) and the chart on the right.
import type { Lang } from "../../lib/content";
import { ui } from "../../lib/ui";
import { Icon } from "../ui/icon";
import c from "./home-common.module.css";
import { HomeFileLink } from "./home-file-link";
import { workCase, type CaseKey } from "./work-case-data";
import s from "./selected-work.module.css";

type WorkItemProps = { caseKey: CaseKey; index: number; lang: Lang };

export function WorkItem({ caseKey, index, lang }: WorkItemProps) {
  const t = ui(lang);
  const w = workCase(caseKey, lang);

  return (
    <li className={s.item}>
      <div className={`num ${s.index}`} aria-hidden="true">
        {String(index).padStart(2, "0")}
      </div>
      <div className={s.body}>
        <p className={c.eyebrow}>{w.kind}</p>
        <h3 className={s.title}>
          <a href={w.href}>{w.title}</a>
        </h3>
        <p className={s.purpose}>{w.purpose}</p>
        <p className={s.kpi}>
          <span className={`num ${s.kpiValue}`}>{w.value}</span> <span className={s.kpiLabel}>{w.valueLabel}</span>
        </p>
        <p className={`${c.meta} ${s.meta}`}>{w.meta.join(" · ")}</p>
        <div className={c.links}>
          <a className={c.link} href={w.href}>
            {t.readCase}
            <Icon name="arrow-right" size={16} />
          </a>
          {w.files.map((key) => (
            <HomeFileLink key={key} fileKey={key} lang={lang} />
          ))}
        </div>
      </div>
      <a className={s.media} href={w.href} tabIndex={-1} aria-hidden="true">
        <img src={w.chart} alt="" width={1600} height={900} loading="lazy" decoding="async" />
      </a>
    </li>
  );
}

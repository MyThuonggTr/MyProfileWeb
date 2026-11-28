// Overview strip of the ten steps by phase; each step links to its detail card in the roadmap.
import type { Lang } from "../../lib/content";
import { ui } from "../../lib/ui";
import { pad2, type ProcessPhase } from "./acquisition-process-data";
import s from "./acquisition-process.module.css";

export function AcquisitionProcessOverview({ lang, phases }: { lang: Lang; phases: ProcessPhase[] }) {
  const t = ui(lang);
  return (
    <div className={s.overview}>
      <div className={s.strip}>
        {phases.map((p) => (
          <div key={p.n} className={s.stripPhase} data-phase={p.n}>
            <p className={s.stripName}>
              {pad2(p.n)} · {p.name}
            </p>
            <ol className={s.stripSteps} start={p.steps[0]?.n}>
              {p.steps.map((st) => (
                <li key={st.n}>
                  <a href={`#step-${st.n}`}>
                    <b className="num" aria-hidden="true">
                      {st.n}
                    </b>
                    <span>{st.title}</span>
                    {st.legal.length > 0 && (
                      <i>
                        <span aria-hidden="true">◆ </span>
                        {t.legalTag}
                      </i>
                    )}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <p className={s.legend}>
        <span aria-hidden="true">◆</span> {t.legend}
      </p>
    </div>
  );
}

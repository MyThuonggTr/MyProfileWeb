// Vertical roadmap: phase headings, one card per step (work, output, who takes part) and,
// right after a step, the legal checks it carries (what to check, warning signs, legal basis).
import type { Lang } from "../../lib/content";
import { ui } from "../../lib/ui";
import { caseLabels } from "../../lib/ui-case-labels";
import type { LegalCheck, ProcessPhase, ProcessStep } from "./acquisition-process-data";
import s from "./acquisition-process.module.css";

type T = ReturnType<typeof ui>;

function StepCard({ step, t }: { step: ProcessStep; t: T }) {
  return (
    <article className={s.step} id={`step-${step.n}`}>
      <div className={`${s.stepNum} num`} aria-hidden="true">
        {step.n}
      </div>
      <div className={s.stepBody}>
        <h4>
          <span className="visually-hidden">
            {t.stepWord} {step.n}:{" "}
          </span>
          {step.title}
        </h4>
        <dl>
          <div>
            <dt>{t.work}</dt>
            <dd>{step.work}</dd>
          </div>
          <div>
            <dt>{t.output}</dt>
            <dd>{step.output}</dd>
          </div>
          <div>
            <dt>{t.who}</dt>
            <dd>{step.who}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

function CheckCard({ k, at, check, lang }: { k: number; at: number; check: LegalCheck; lang: Lang }) {
  const t = ui(lang);
  return (
    <div className={s.check} id={`check-${k}`}>
      <div className={s.checkMark} aria-hidden="true">
        ◆
      </div>
      <div className={s.checkBody}>
        <p className={s.checkLabel}>
          {t.legalCheck} {caseLabels(lang).checkPrefix}
          {k} · {t.atStep} {at}
        </p>
        <h5>{check.title}</h5>
        <div className={s.checkCols}>
          <div>
            <p className={s.colHead}>{t.review}</p>
            <p>{check.review}</p>
          </div>
          <div className={s.risk}>
            <p className={s.colHead}>{t.risk}</p>
            <p>{check.risk}</p>
          </div>
        </div>
        <p className={s.basis}>
          {t.basis}: {check.basis}
        </p>
      </div>
    </div>
  );
}

export function AcquisitionProcessRoadmap({ lang, phases, checks }: { lang: Lang; phases: ProcessPhase[]; checks: LegalCheck[] }) {
  const t = ui(lang);
  return (
    <div className={s.road}>
      {phases.map((p) => (
        <div key={p.n} className={s.roadPhase} data-phase={p.n}>
          <div className={s.phaseHead}>
            <span>
              {t.phaseWord} {p.n}
            </span>
            <h3>{p.name}</h3>
          </div>
          {p.steps.map((st) => (
            <div key={st.n} className={s.stepGroup}>
              <StepCard step={st} t={t} />
              {st.legal.map((k) => (
                <CheckCard key={k} k={k} at={st.n} check={checks[k - 1]} lang={lang} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

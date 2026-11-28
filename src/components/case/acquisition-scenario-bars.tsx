// Worked example chart: project IRR per sales-delay scenario as horizontal bars against the
// WACC line, with NPV and peak funding beside each bar; the same rows as a table on demand.
import type { Lang } from "../../lib/content";
import { num, ui } from "../../lib/ui";
import { caseLabels } from "../../lib/ui-case-labels";
import { CaseChartFigure } from "./case-chart-figure";
import { figure, scenarioTable, scenarios } from "./case-number-tables";
import { CaseNumbersTable } from "./case-numbers-table";
import s from "./acquisition-scenarios.module.css";

/** Right end of the IRR axis, in percent. Every scenario IRR sits below it. */
const AXIS_MAX = 24;

/** "21.0%" / "21,0%" → 21. A value that does not parse fails the build. */
function percent(value: string): number {
  const n = Number(value.replace("%", "").replace(",", ".").trim());
  if (!Number.isFinite(n)) throw new Error(`scenario IRR is not a percentage: ${value}`);
  return n;
}

const share = (x: number) => `${Math.min(100, Math.max(0, (x / AXIS_MAX) * 100))}%`;

export function AcquisitionScenarioBars({ lang }: { lang: Lang }) {
  const t = ui(lang);
  const wacc = figure("case2", "wacc");
  const waccLabel = `${caseLabels(lang).wacc} ${num(wacc, lang, 2)}%`;

  return (
    <CaseChartFigure lang={lang} numbers={<CaseNumbersTable {...scenarioTable(lang)} />}>
      <figcaption className={s.title}>{t.irrByScenario}</figcaption>
      <div className={s.bars}>
        {scenarios(lang).map((sc, i) => {
          const irr = percent(sc.irr);
          const fill = [s.fill, i === 0 && s.isBase, irr < wacc && s.isLow].filter(Boolean).join(" ");
          return (
            <div key={sc.scenario} className={s.row}>
              <span className={s.label}>{sc.scenario}</span>
              <div className={s.track}>
                <div className={fill} style={{ width: share(irr) }}>
                  <b className="num">{sc.irr}</b>
                </div>
                <div className={s.wacc} style={{ left: share(wacc) }}>
                  {i === 0 && <span>{waccLabel}</span>}
                </div>
              </div>
              <span className={`${s.note} num`}>
                {t.npvShort} {sc.npv} {t.bn} · {t.peakShort} {sc.peak} {t.bn}
              </span>
            </div>
          );
        })}
      </div>
    </CaseChartFigure>
  );
}

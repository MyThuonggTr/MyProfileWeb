// Case page /:lang/cases/grade-b-office/: 20-year DCF valuation of a Grade-B office building.
import type { Route } from "./+types/case-grade-b-office";
import { numbered, text } from "../lib/content";
import { useLang } from "../lib/route-lang";
import { langMeta } from "../lib/seo";
import { ui } from "../lib/ui";
import { CaseChartFigure, CaseChartImage } from "../components/case/case-chart-figure";
import { CaseKeyFigures } from "../components/case/case-key-figures";
import { caseChips, caseName, nextCaseLink, projectsLink } from "../components/case/case-links";
import { CaseMethodSteps } from "../components/case/case-method-steps";
import { dcfSensitivityTable } from "../components/case/case-number-tables";
import { CaseNumbersTable } from "../components/case/case-numbers-table";
import { CasePage } from "../components/case/case-page";
import { CaseRoleLessons } from "../components/case/case-role-lessons";
import { CaseSection } from "../components/case/case-section";

const BLOCK = "case3";

export const meta: Route.MetaFunction = (args) =>
  langMeta(args, (lang) => ({
    title: `${caseName(BLOCK, lang)} – ${ui(lang).name}`,
    description: text(BLOCK, "headline", lang),
  }));

export default function GradeBOffice() {
  const lang = useLang();
  const t = ui(lang);

  return (
    <CasePage
      lang={lang}
      block={BLOCK}
      crumb={caseName(BLOCK, lang)}
      chips={caseChips(BLOCK, lang)}
      headline={text(BLOCK, "headline", lang)}
      back={projectsLink(lang)}
      forward={nextCaseLink("case2", lang)}
    >
      <CaseKeyFigures lang={lang} block={BLOCK} />

      <CaseSection id="approach-h" title={text(BLOCK, "approach_headline", lang)}>
        <CaseMethodSteps steps={numbered(text(BLOCK, "approach", lang))} />
      </CaseSection>

      <CaseSection id="sens-h" kicker={t.sensitivity} title={text(BLOCK, "sensitivity_headline", lang)}>
        <CaseChartFigure lang={lang} numbers={<CaseNumbersTable {...dcfSensitivityTable(lang)} />}>
          <CaseChartImage name="case3-sensitivity-heatmap" lang={lang} alt={t.sensCaption} />
        </CaseChartFigure>
      </CaseSection>

      <CaseRoleLessons lang={lang} block={BLOCK} />
    </CasePage>
  );
}

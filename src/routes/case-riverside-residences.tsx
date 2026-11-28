// Case page /:lang/cases/riverside-residences/: quarterly feasibility model of a residential and retail project.
import type { Route } from "./+types/case-riverside-residences";
import { labelled, numbered, text } from "../lib/content";
import { useLang } from "../lib/route-lang";
import { langMeta } from "../lib/seo";
import { ui } from "../lib/ui";
import { CaseChartFigure, CaseChartImage } from "../components/case/case-chart-figure";
import { CaseKeyFigures } from "../components/case/case-key-figures";
import { caseChips, caseLink, caseName, nextCaseLink } from "../components/case/case-links";
import { CaseMethodSteps } from "../components/case/case-method-steps";
import { irrGridTable } from "../components/case/case-number-tables";
import { CaseNumbersTable } from "../components/case/case-numbers-table";
import { CasePage } from "../components/case/case-page";
import { CaseRoleLessons } from "../components/case/case-role-lessons";
import { CaseSection } from "../components/case/case-section";

const BLOCK = "case2";

export const meta: Route.MetaFunction = (args) =>
  langMeta(args, (lang) => ({
    title: `${caseName(BLOCK, lang)} – ${ui(lang).name}`,
    description: text(BLOCK, "headline", lang),
  }));

export default function RiversideResidences() {
  const lang = useLang();
  const t = ui(lang);
  const approach = numbered(text(BLOCK, "approach", lang));
  const fundingHeadline = text(BLOCK, "funding_headline", lang);
  const sens = labelled(BLOCK, "sensitivity", lang);

  return (
    <CasePage
      lang={lang}
      block={BLOCK}
      crumb={caseName(BLOCK, lang)}
      chips={caseChips(BLOCK, lang)}
      headline={text(BLOCK, "headline", lang)}
      back={caseLink("case3", lang)}
      backIsPrevious
      forward={nextCaseLink("case4", lang)}
    >
      <CaseKeyFigures lang={lang} block={BLOCK} />

      <CaseSection id="approach-h" title={t.approach}>
        <CaseMethodSteps steps={approach} />
        <CaseChartFigure lang={lang}>
          <CaseChartImage name="case2-model-map" lang={lang} alt={approach[0] ?? t.modelMap} />
        </CaseChartFigure>
      </CaseSection>

      <CaseSection id="fund-h" kicker={t.funding} title={fundingHeadline}>
        <CaseChartFigure lang={lang} numbers={<CaseNumbersTable {...irrGridTable(lang)} />}>
          <CaseChartImage name="case2-funding-and-sensitivity" lang={lang} alt={`${fundingHeadline}. ${sens.body}`} />
          <p>
            <strong>{sens.label}:</strong> {sens.body}
          </p>
        </CaseChartFigure>
      </CaseSection>

      <CaseRoleLessons lang={lang} block={BLOCK} />
    </CasePage>
  );
}

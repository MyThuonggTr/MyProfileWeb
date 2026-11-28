// Case page /:lang/cases/acquisition-checklist/: the sequence of a real estate investment
// project, where its legal checks sit, and what a late sales launch does to the Riverside model.
import type { Route } from "./+types/case-acquisition-checklist";
import { labelled, text } from "../lib/content";
import { useLang } from "../lib/route-lang";
import { langMeta } from "../lib/seo";
import { ui } from "../lib/ui";
import { acquisitionProcess } from "../components/case/acquisition-process-data";
import { AcquisitionProcessOverview } from "../components/case/acquisition-process-overview";
import { AcquisitionProcessRoadmap } from "../components/case/acquisition-process-roadmap";
import { AcquisitionReadingLenses } from "../components/case/acquisition-reading-lenses";
import { AcquisitionScenarioBars } from "../components/case/acquisition-scenario-bars";
import { caseChips, caseLink, projectsLink } from "../components/case/case-links";
import { CasePage } from "../components/case/case-page";
import { Callout, CaseSection, Lead } from "../components/case/case-section";

const BLOCK = "case4";

export const meta: Route.MetaFunction = (args) =>
  langMeta(args, (lang) => ({
    title: `${ui(lang).checklist} – ${ui(lang).name}`,
    description: text(BLOCK, "headline", lang),
  }));

export default function AcquisitionChecklist() {
  const lang = useLang();
  const t = ui(lang);
  const thesis = labelled(BLOCK, "thesis", lang);
  const { phases, checks } = acquisitionProcess(lang);

  return (
    <CasePage
      lang={lang}
      block={BLOCK}
      crumb={t.checklist}
      chips={caseChips(BLOCK, lang)}
      headline={text(BLOCK, "headline", lang)}
      back={caseLink("case2", lang)}
      backIsPrevious
      forward={projectsLink(lang)}
    >
      <Callout label={thesis.label} body={thesis.body} />

      <CaseSection id="process-h" title={t.part1}>
        <Lead>{text(BLOCK, "how_to_read", lang)}</Lead>
        <AcquisitionProcessOverview lang={lang} phases={phases} />
        <AcquisitionProcessRoadmap lang={lang} phases={phases} checks={checks} />
      </CaseSection>

      <CaseSection id="example-h" title={text(BLOCK, "example_headline", lang)}>
        <Lead>{text(BLOCK, "example", lang)}</Lead>
        <AcquisitionScenarioBars lang={lang} />
      </CaseSection>

      <CaseSection id="lenses-h" title={text(BLOCK, "lenses_headline", lang)}>
        <AcquisitionReadingLenses lang={lang} />
      </CaseSection>
    </CasePage>
  );
}

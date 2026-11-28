// "Selected work": numbered list of the published cases in CASES order, with the
// anonymisation disclaimer as a small note under the list.
import { raw, type Lang } from "../../lib/content";
import { CASES, ui } from "../../lib/ui";
import { SectionHeading } from "../ui/section-heading";
import c from "./home-common.module.css";
import s from "./selected-work.module.css";
import { WorkItem } from "./work-item";

export function SelectedWork({ lang, n }: { lang: Lang; n: number }) {
  return (
    <>
      {/* Old links to /{lang}/#projects land here, right where the section starts. */}
      <span id="projects" aria-hidden="true" />
      <section id="work" className="sec sec--surface" aria-labelledby="work-title">
        <div className="wrap">
          <SectionHeading n={n} id="work-title" title={ui(lang).selectedWork} />
          <ol className={s.list}>
            {CASES.map((cs, i) => (
              <WorkItem key={cs.key} caseKey={cs.key} index={i + 1} lang={lang} />
            ))}
          </ol>
          <p className={c.note}>{raw("disclaimer", "text", lang)}</p>
        </div>
      </section>
    </>
  );
}

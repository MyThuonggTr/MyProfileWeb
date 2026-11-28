// Research: the award-winning chatbot study as the feature, then the Dow Jones and
// EB-IB coursework entries with their dataset / model / report downloads.
import { raw, text, titled, type Lang } from "../../lib/content";
import { SectionHeading } from "../ui/section-heading";
import c from "./home-common.module.css";
import { HomeFileLink, type FileKey } from "./home-file-link";
import s from "./research-section.module.css";

const ENTRIES: { id: string; files: FileKey[] }[] = [
  { id: "dowjones", files: ["djData", "djR"] },
  { id: "ebib", files: ["ebibReport", "ebibExcel"] },
];

/** Splits the award sentence ("Second Prize, …") off the front of the chatbot study text. */
function chatbotStudy(lang: Lang) {
  const body = text("research", "chatbot_body", lang);
  const award = body.split(". ").find((x) => /Prize|Giải/.test(x)) ?? "";
  return { award, body: award ? body.replace(`${award}. `, "") : body };
}

export function ResearchSection({ lang, n }: { lang: Lang; n: number }) {
  const study = chatbotStudy(lang);

  return (
    <section id="research" className="sec" aria-labelledby="research-title">
      <div className="wrap">
        <SectionHeading n={n} id="research-title" title={text("research", "headline", lang)} />
        <div className={s.cols}>
          <article className={s.feature}>
            {study.award && <p className={s.award}>{study.award}</p>}
            <h3>{text("research", "chatbot_title", lang)}</h3>
            <p className={s.body}>{study.body}</p>
          </article>
          <div>
            {ENTRIES.map(({ id, files }) => {
              const r = titled(raw("research", id, lang));
              return (
                <article key={id} className={s.entry}>
                  <p className={c.meta}>{r.meta}</p>
                  <h3 className={s.entryTitle}>{r.title}</h3>
                  <p className={s.body}>{r.body}</p>
                  <div className={c.links}>
                    {files.map((key) => (
                      <HomeFileLink key={key} fileKey={key} lang={lang} />
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

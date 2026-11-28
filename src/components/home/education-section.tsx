// Education: degree with its points and the transcript / scholarship downloads, then credentials.
import { raw, type Lang } from "../../lib/content";
import { ui } from "../../lib/ui";
import { SectionHeading } from "../ui/section-heading";
import c from "./home-common.module.css";
import { HomeFileLink } from "./home-file-link";
import s from "./skills-and-education.module.css";

const CREDENTIALS = ["valuation", "english", "chinese", "ic3"] as const;

export function EducationSection({ lang, n }: { lang: Lang; n: number }) {
  const t = ui(lang);
  // "School | period | sentence. sentence." — one bullet per sentence.
  const [school, period, body = ""] = raw("education", "summary", lang).split(" | ");
  const points = body.split(/(?<=\.) (?=[A-ZĐÀ-Ỹ])/u);

  return (
    <section id="education" aria-labelledby="education-title">
      <SectionHeading n={n} id="education-title" title={t.education} />
      <div className={s.row}>
        <h3 className={s.rowTitle}>{school}</h3>
        <p className={`num ${c.meta}`}>{period}</p>
        <ul className={c.bullets}>
          {points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <div className={c.links}>
          <HomeFileLink fileKey={lang === "vi" ? "transcriptVi" : "transcriptEn"} lang={lang}>
            {t.transcript}
          </HomeFileLink>
          <HomeFileLink fileKey="scholarship" lang={lang}>
            {t.scholarshipDoc}
          </HomeFileLink>
        </div>
      </div>
      <div className={s.row}>
        <h3 className={s.rowTitle}>{t.credentials}</h3>
        <ul className={c.bullets}>
          {CREDENTIALS.map((id) => (
            <li key={id}>{raw("credentials", id, lang)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

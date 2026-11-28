// Work experience timeline (DKRA, EM, SKL), then extracurricular activities in the same
// compact style under a sub-heading. Every bullet point of each entry is shown.
import { job, text, type Lang } from "../../lib/content";
import { SectionHeading } from "../ui/section-heading";
import c from "./home-common.module.css";
import s from "./experience-section.module.css";

const JOBS = ["dkra", "em", "skl"] as const;
const ACTIVITIES = ["margroup"] as const;

type Entry = ReturnType<typeof job>;

/** Timeline rows; `level` keeps the heading outline correct (h3 under h2, h4 under the sub-heading). */
function Timeline({ entries, level }: { entries: Entry[]; level: "h3" | "h4" }) {
  const Heading = level;
  return (
    <ol className={s.timeline}>
      {entries.map((e) => (
        <li key={`${e.org}-${e.period}`} className={s.entry}>
          <p className={`num ${s.when}`}>{e.period}</p>
          <div>
            <Heading className={s.role}>{e.role}</Heading>
            <p className={s.org}>{e.org}</p>
            <ul className={c.bullets}>
              {e.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ExperienceSection({ lang, n }: { lang: Lang; n: number }) {
  const jobs = JOBS.map((id) => job("experience", id, lang));
  const activities = ACTIVITIES.map((id) => job("activities", id, lang));

  return (
    <section id="experience" className="sec" aria-labelledby="experience-title">
      <div className="wrap">
        <SectionHeading n={n} id="experience-title" title={text("experience", "headline", lang)} />
        <Timeline entries={jobs} level="h3" />
        <h3 className={s.sub}>{text("activities", "headline", lang)}</h3>
        <Timeline entries={activities} level="h4" />
      </div>
    </section>
  );
}

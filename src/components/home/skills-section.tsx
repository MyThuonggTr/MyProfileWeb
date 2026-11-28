// Core competencies as ruled rows (competency -> evidence link), then the tool chips.
import { attr, pipes, raw, rowIds, text, type Lang } from "../../lib/content";
import { caseHref, ui } from "../../lib/ui";
import { Icon } from "../ui/icon";
import { SectionHeading } from "../ui/section-heading";
import s from "./skills-and-education.module.css";

/** Skills map rows: "Competency | Evidence" with a link target (a case key, or "research"). */
function skillRows(lang: Lang) {
  return rowIds("skills_map")
    .filter((id) => id !== "headline")
    .map((id) => {
      const [skill, evidence] = raw("skills_map", id, lang).split(" | ");
      const link = attr<string>("skills_map", id, "link");
      if (!link) throw new Error(`skills_map.${id} has no link`);
      return { id, skill, evidence, href: link === "research" ? "#research" : caseHref(lang, link) };
    });
}

export function SkillsSection({ lang, n }: { lang: Lang; n: number }) {
  const t = ui(lang);
  return (
    <section id="skills" aria-labelledby="skills-title">
      <SectionHeading n={n} id="skills-title" title={text("skills_map", "headline", lang)} />
      <dl className={s.rows}>
        {skillRows(lang).map((r) => (
          <div key={r.id} className={s.row}>
            <dt className={s.rowTitle}>{r.skill}</dt>
            <dd className={s.rowBody}>
              <a className={s.evidence} href={r.href}>
                <Icon name="arrow-right" size={16} />
                <span>{r.evidence}</span>
              </a>
            </dd>
          </div>
        ))}
      </dl>
      <h3 className={s.minor}>{t.tools}</h3>
      <ul className={s.chips}>
        {pipes(raw("skills", "summary", lang)).map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
    </section>
  );
}

// "Role and contribution" and "Lessons and improvements", side by side on wide columns.
import { clauses, labelled, type Lang } from "../../lib/content";
import type { CaseKey } from "./case-links";
import s from "./case-blocks.module.css";

const capitalise = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);

export function CaseRoleLessons({ lang, block }: { lang: Lang; block: CaseKey }) {
  const role = labelled(block, "role", lang);
  const lessons = labelled(block, "lessons", lang);
  return (
    <div className={s.roleLessons}>
      <section aria-labelledby="role-h">
        <h2 id="role-h" className={s.h3}>
          {role.label}
        </h2>
        <p>{capitalise(role.body)}</p>
      </section>
      <section aria-labelledby="lessons-h">
        <h2 id="lessons-h" className={s.h3}>
          {lessons.label}
        </h2>
        <ul>
          {clauses(lessons.body).map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

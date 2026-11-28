// One surface band holding the skills and education sections side by side.
import type { Lang } from "../../lib/content";
import { EducationSection } from "./education-section";
import { SkillsSection } from "./skills-section";
import s from "./skills-and-education.module.css";

export function SkillsAndEducationBand({ lang, n }: { lang: Lang; n: number }) {
  return (
    <div className="sec sec--surface">
      <div className={`wrap ${s.cols}`}>
        <SkillsSection lang={lang} n={n} />
        <EducationSection lang={lang} n={n + 1} />
      </div>
    </div>
  );
}

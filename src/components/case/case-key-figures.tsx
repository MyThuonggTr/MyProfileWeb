// Ruled row of the case's headline numbers (content.json "key_figures" items), first one emphasised.
import { items, type Lang } from "../../lib/content";
import { ui } from "../../lib/ui";
import type { CaseKey } from "./case-links";
import s from "./case-blocks.module.css";

export function CaseKeyFigures({ lang, block }: { lang: Lang; block: CaseKey }) {
  const stats = items(block, "key_figures", lang);
  if (stats.length === 0) return null;
  return (
    <section aria-label={ui(lang).keyFigures}>
      <ul className={s.figures}>
        {stats.map((f, i) => (
          <li key={f.label} className={i === 0 ? s.figureKey : undefined}>
            <p className={`${s.figureValue} num`}>{f.value}</p>
            <p className={s.figureLabel}>{f.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Chart block: the chart itself, optional text, and the same numbers as a table behind
// a "Show the numbers" disclosure, so the chart never is the only way to read the data.
import type { ReactNode } from "react";
import type { Lang } from "../../lib/content";
import { ui } from "../../lib/ui";
import s from "./case-blocks.module.css";

/** Chart images are exported at 1600 × 900 (16:9); fixed attributes reserve the space before load. */
const CHART_W = 1600;
const CHART_H = 900;

type ChartFigureProps = { lang: Lang; children: ReactNode; numbers?: ReactNode };

export function CaseChartFigure({ lang, children, numbers }: ChartFigureProps) {
  return (
    <figure className={s.figure}>
      {children}
      {numbers && (
        <details className={s.details}>
          <summary>{ui(lang).showNumbers}</summary>
          {numbers}
        </details>
      )}
    </figure>
  );
}

/** Language-specific chart from public/images: /images/{name}-{lang}.png. */
export function CaseChartImage({ name, lang, alt }: { name: string; lang: Lang; alt: string }) {
  return (
    <img
      className={s.chart}
      src={`/images/${name}-${lang}.png`}
      width={CHART_W}
      height={CHART_H}
      loading="lazy"
      decoding="async"
      alt={alt}
    />
  );
}

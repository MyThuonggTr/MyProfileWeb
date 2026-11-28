// How the legal review is used in valuation, investment analysis and M&A: a scope note and one card per lens.
import { labelled, rich, type Lang } from "../../lib/content";
import { Callout } from "./case-section";
import s from "./acquisition-scenarios.module.css";

type Lens = { role: string; points: string[] };

export function AcquisitionReadingLenses({ lang }: { lang: Lang }) {
  const note = labelled("case4", "lenses_note", lang);
  return (
    <>
      <Callout label={note.label} body={note.body} tone="note" />
      <div className={s.lenses}>
        {rich<Lens>("case4", "lenses", lang).map((l) => (
          <div key={l.role} className={s.lens}>
            <h3>{l.role}</h3>
            <ul>
              {l.points.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

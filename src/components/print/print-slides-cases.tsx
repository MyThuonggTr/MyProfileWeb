// Print slides for the two valuation cases (Grade-B office, Riverside Residences).
import { clauses, items, numbered, text } from "../../lib/content";
import { cap, type Foot, type PrintModel } from "./print-model";

type Props = { m: PrintModel; foot: Foot; page: number };

/** Chips, headline, question, key figures and the author's role: the first slide of a case. */
function CaseOpening({ m, foot, page, block, role }: Props & { block: "case3" | "case2"; role: (body: string) => string }) {
  const { lang, t, chipsOf, L } = m;
  const r = L(block, "role");
  return (
    <section className="slide">
      <ul className="chips">{chipsOf(block).map((c, i) => <li className={i === 0 ? "chip chip--key" : "chip"} key={c}>{c}</li>)}</ul>
      <h2>{text(block, "headline", lang)}</h2>
      <p className="lead"><strong>{`${t.question}:`}</strong>{` ${text(block, "question", lang)}`}</p>
      <div className="row4">
        {items(block, "key_figures", lang).map((s, i) => (
          <div className={i === 0 ? "stat stat--solid" : "stat"} key={s.label}><div className="stat__value num">{s.value}</div><div className="stat__label">{s.label}</div></div>
        ))}
      </div>
      <p className="body"><strong>{`${r.label}:`}</strong>{` ${role(r.body)}`}</p>
      <footer>{foot(page)}</footer>
    </section>
  );
}

export function GradeBSlides({ m, foot, page }: Props) {
  const { lang, t, L } = m;
  const lessons = L("case3", "lessons");
  return (
    <>
      <CaseOpening m={m} foot={foot} page={page} block="case3" role={(b) => b} />
      <section className="slide">
        <div className="eyebrow">{t.approach}</div>
        <h2>{text("case3", "approach_headline", lang)}</h2>
        <ol className="row3 numbered">
          {numbered(text("case3", "approach", lang)).map((a, i) => (
            <li className="box" key={a}><span className="n num">{String(i + 1).padStart(2, "0")}</span><p>{a}</p></li>
          ))}
        </ol>
        <footer>{foot(page + 1)}</footer>
      </section>
      <section className="slide">
        <div className="eyebrow">{t.sensitivity}</div>
        <h2>{text("case3", "sensitivity_headline", lang)}</h2>
        <div className="row-chart">
          <img src={`/images/case3-sensitivity-heatmap-${lang}.png`} alt={t.sensCaption} />
          <div className="box"><h3>{lessons.label}</h3><ul className="list">{clauses(lessons.body).map((l) => <li key={l}>{l}</li>)}</ul></div>
        </div>
        <footer>{foot(page + 2)}</footer>
      </section>
    </>
  );
}

export function RiversideSlides({ m, foot, page }: Props) {
  const { lang, t, L } = m;
  const sens = L("case2", "sensitivity");
  const lessons = L("case2", "lessons");
  return (
    <>
      <CaseOpening m={m} foot={foot} page={page} block="case2" role={cap} />
      <section className="slide dense">
        <div className="eyebrow">{t.approach}</div>
        <div className="row-model">
          <img src={`/images/case2-model-map-${lang}.png`} alt={t.modelMap} />
          <ol className="steps-v">
            {numbered(text("case2", "approach", lang)).map((a, i) => (
              <li key={a}><span className="n num">{String(i + 1).padStart(2, "0")}</span>{` ${a}`}</li>
            ))}
          </ol>
        </div>
        <footer>{foot(page + 1)}</footer>
      </section>
      <section className="slide">
        <div className="eyebrow">{t.funding}</div>
        <div className="row-chart wide">
          <img src={`/images/case2-funding-and-sensitivity-${lang}.png`} alt={text("case2", "funding_headline", lang)} />
          <div className="box">
            <p><strong>{`${sens.label}:`}</strong>{` ${sens.body}`}</p>
            <h3 style={{ marginTop: 12 }}>{lessons.label}</h3>
            <ul className="list">{clauses(lessons.body).map((l) => <li key={l}>{l}</li>)}</ul>
          </div>
        </div>
        <footer>{foot(page + 2)}</footer>
      </section>
    </>
  );
}

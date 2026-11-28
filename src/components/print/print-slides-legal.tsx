// Print slides for the legal-review case (project sequence, step tables, lenses) and the research slide.
import { text } from "../../lib/content";
import type { Foot, PrintModel } from "./print-model";

type Props = { m: PrintModel; foot: Foot; page: number };

export function LegalSlides({ m, foot, page }: Props) {
  const { lang, t, tagsOf, L, phaseNames, proc, steps, ownerOf, scenarios, lenses } = m;
  const thesis = L("case4", "thesis");
  const how = L("case4", "how_to_read");
  const lensesNote = L("case4", "lenses_note");
  return (
    <>
      <section className="slide dense">
        <ul className="chips">{tagsOf("case4").map((c, i) => <li className={i === 0 ? "chip chip--key" : "chip"} key={c}>{c}</li>)}</ul>
        <h2>{text("case4", "headline", lang)}</h2>
        <p className="lead"><strong>{`${t.question}:`}</strong>{` ${text("case4", "question", lang)}`}</p>
        <div className="box box--line"><p><strong>{`${thesis.label}:`}</strong>{` ${thesis.body}`}</p></div>
        <div className="pflow">
          {phaseNames.map((name, k) => (
            <div className="pflow__phase" key={name}>
              <p className="pflow__name">{`${String(k + 1).padStart(2, "0")} · ${name}`}</p>
              <ol className="pflow__steps">
                {proc.filter((x) => x.phase === k + 1).map((x) => (
                  <li key={x.n}><span className="pflow__dot">{x.n}</span>{x.title}{x.legal.length > 0 && <em className="pflow__tag">{`◆ ${t.legalTag}`}</em>}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p className="small muted"><strong>{`${how.label}:`}</strong>{` ${how.body}`}</p>
        <footer>{foot(page)}</footer>
      </section>
      {[[0, 5], [5, 10]].map(([a, b], k) => (
        <section className="slide dense" key={a}>
          <h2>{t.part1}</h2>
          <table className="ctable">
            <thead><tr><th>#</th><th>{t.stepWord}</th><th>{t.work}</th><th>{t.output}</th></tr></thead>
            <tbody>
              {proc.slice(a, b).map((x) => (
                <tr key={x.n}>
                  <td className="n num">{String(x.n).padStart(2, "0")}</td>
                  <th>{x.title}{x.legal.length > 0 && <p className="small">{`◆ ${t.legalCheck} ${x.legal.map((k) => `P${k}`).join(", ")}`}</p>}</th>
                  <td className="body">{x.work}<p className="small">{`${t.who}: ${x.who}`}</p></td>
                  <td className="risk">{x.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <footer>{foot(page + 1 + k)}</footer>
        </section>
      ))}
      {[[0, 3], [3, 6], [6, 7], [7, 9]].map(([a, b], k, all) => (
        <section className="slide dense" key={a}>
          <h2>{`${t.legalCheck} P1–P9`}</h2>
          <table className="ctable">
            <thead><tr><th>#</th><th>{t.legalCheck}</th><th>{t.review}</th><th>{t.risk}</th></tr></thead>
            <tbody>
              {steps.slice(a, b).map((x) => (
                <tr key={x.n}>
                  <td className="n num">{String(x.n).padStart(2, "0")}</td>
                  <th>{x.title}<p className="small">{`P${x.n} · ${t.atStep} ${ownerOf[x.n]}`}</p></th>
                  <td className="body">{x.review}<p className="small">{`${t.basis}: ${x.basis}`}</p></td>
                  <td className="risk">{x.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {k === all.length - 1 && (
            <div className="ex">
              <h3>{text("case4", "example_headline", lang)}</h3>
              <table className="ctable etable">
                <thead><tr><th>{t.exScenario}</th><th>{t.exIrr}</th><th>{t.exNpv}</th><th>{t.exPeak}</th></tr></thead>
                <tbody>
                  {scenarios.map((x) => (
                    <tr key={x.scenario}><th>{x.scenario}</th><td className="num">{x.irr}</td><td className="num">{x.npv}</td><td className="num">{x.peak}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <footer>{foot(page + 3 + k)}</footer>
        </section>
      ))}
      <section className="slide dense">
        <h2>{text("case4", "lenses_headline", lang)}</h2>
        <p className="small muted"><strong>{`${lensesNote.label}:`}</strong>{` ${lensesNote.body}`}</p>
        <div className="row3">
          {lenses.map((l) => (
            <div className="box" key={l.role}><h3>{l.role}</h3><ul className="list small">{l.points.map((x) => <li key={x}>{x}</li>)}</ul></div>
          ))}
        </div>
        <footer>{foot(page + 7)}</footer>
      </section>
    </>
  );
}

export function ResearchSlide({ m, foot, page }: Props) {
  const { lang, t, chatbot, dow, ebib } = m;
  return (
    <section className="slide dense">
      <div className="eyebrow">{t.research}</div>
      <h2>{text("research", "headline", lang)}</h2>
      <div className="box"><h3>{text("research", "chatbot_title", lang)}</h3><p>{chatbot}</p></div>
      <div className="row2">
        {[dow, ebib].map((r) => (
          <div className="box" key={r.title}><p className="muted">{r.meta}</p><h3>{r.title}</h3><p>{r.body}</p></div>
        ))}
      </div>
      <footer>{foot(page)}</footer>
    </section>
  );
}

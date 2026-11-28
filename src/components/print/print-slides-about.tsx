// Print slides about the author: experience/education and the "how I check a model" principles.
import { job, text } from "../../lib/content";
import { cap, type Foot, type PrintModel } from "./print-model";

type Props = { m: PrintModel; foot: Foot; page: number };

export function ExperienceSlide({ m, foot, page }: Props) {
  const { lang, t, edu, eduPoints, creds } = m;
  const jobs = ["dkra", "em", "skl"].map((id) => job("experience", id, lang));
  const acts = ["margroup"].map((id) => job("activities", id, lang));
  return (
    <section className="slide dense">
      <div className="row-exp">
        <div>
          <h3>{text("experience", "headline", lang)}</h3>
          {jobs.map((j) => (
            <div className="job" key={j.role + j.org}>
              <p><strong>{j.role}</strong>{` · ${j.org} `}<span className="muted num">{`· ${j.period}`}</span></p>
              <ul className="list small">{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          ))}
        </div>
        <div>
          <h3>{t.education}</h3>
          <p><strong>{edu[0]}</strong>{" "}<span className="muted num">{`· ${edu[1]}`}</span></p>
          <ul className="list small">{eduPoints.map((p) => <li key={p}>{p}</li>)}</ul>
          <h3 style={{ marginTop: 8 }}>{t.credentials}</h3>
          <ul className="list small">{creds.map((c) => <li key={c}>{c}</li>)}</ul>
          <h3 style={{ marginTop: 8 }}>{text("activities", "headline", lang)}</h3>
          {acts.map((j) => <p key={j.role + j.org}><strong>{j.role}</strong>{` · ${j.org} `}<span className="muted num">{`· ${j.period}`}</span></p>)}
        </div>
      </div>
      <footer>{foot(page)}</footer>
    </section>
  );
}

export function PrinciplesSlide({ m, foot, page }: Props) {
  const { lang, principles, L } = m;
  const next = L("principles", "next");
  return (
    <section className="slide">
      <h2>{text("principles", "headline", lang)}</h2>
      <ol className="row3 numbered">{principles.map((p) => <li className="box" key={p.label}><h3>{p.label}</h3><p>{cap(p.body)}</p></li>)}</ol>
      <div className="box box--line"><p><strong>{`${next.label}:`}</strong>{` ${cap(next.body)}`}</p></div>
      <footer>{foot(page)}</footer>
    </section>
  );
}

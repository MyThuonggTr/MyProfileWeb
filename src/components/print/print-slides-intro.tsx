// Print slides 1-3 (cover, profile, project overview) plus the closing downloads and contact slides.
import { items, raw, text, card } from "../../lib/content";
import { CASES, EMAIL, FILES, PHONE, fileOf } from "../../lib/ui";
import type { Foot, PrintModel } from "./print-model";

type Props = { m: PrintModel; foot: Foot; page: number };

export function CoverSlide({ m, foot, page }: Props) {
  const { lang, t, title, target, site } = m;
  return (
    <section className="slide cover">
      <div className="eyebrow eyebrow--line" style={{ color: "var(--accent-decor)" }}>{`${title} · ${t.printDate}`}</div>
      <h1>{t.name}</h1>
      <p className="cover__target">{target}</p>
      <p className="cover__mail">{`${EMAIL} · ${PHONE.display}${site ? ` · ${site.replace(/^https?:\/\//, "")}` : ""}`}</p>
      <p className="cover__note">{raw("disclaimer", "text", lang)}</p>
      <footer>{foot(page)}</footer>
    </section>
  );
}

export function ProfileSlide({ m, foot, page }: Props) {
  const { lang, t, skills } = m;
  return (
    <section className="slide dense">
      <div className="eyebrow">{t.profile}</div>
      <p className="lead">{text("hero", "positioning", lang)}</p>
      <div className="row4">
        {items("about", "key_figures", lang).map((s) => (
          <div className="stat" key={s.label}><div className="stat__value num">{s.value}</div><div className="stat__label">{s.label}</div></div>
        ))}
      </div>
      <h3>{text("skills_map", "headline", lang)}</h3>
      <table className="ptable">
        <thead><tr><th>{t.skill}</th><th>{t.evidence}</th></tr></thead>
        <tbody>{skills.map(([s, e]) => <tr key={s}><th>{s}</th><td>{e}</td></tr>)}</tbody>
      </table>
      <footer>{foot(page)}</footer>
    </section>
  );
}

export function OverviewSlide({ m, foot, page }: Props) {
  const { lang, t, tagsOf } = m;
  return (
    <section className="slide">
      <div className="eyebrow">{t.projects}</div>
      <h2>{t.selectedWork}</h2>
      <div className="row3">
        {CASES.map((c) => {
          const k = card(c.key, lang);
          return (
            <div className="box pcard" key={c.key}>
              <p className="kind">{tagsOf(c.key)[0].replace(/\s*\(.*\)$/, "")}</p>
              <h3>{text(c.key, "headline", lang)}</h3>
              <p className="muted">{text(c.key, "question", lang)}</p>
              <p className="big num">{k.value}</p>
              <p className="muted">{k.label}</p>
              <p className="muted">{`${t.tools}: ${k.tools}`}</p>
            </div>
          );
        })}
      </div>
      <p className="muted">{`${t.research}: ${text("research", "headline", lang)}.`}</p>
      <footer>{foot(page)}</footer>
    </section>
  );
}

export function DownloadsSlide({ m, foot, page }: Props) {
  const { lang, t, site } = m;
  return (
    <section className="slide dense">
      <h2>{t.downloads}</h2>
      <p className="muted">{t.personalNote}</p>
      <table className="ptable ftable">
        <colgroup><col style={{ width: "44%" }} /><col style={{ width: "10%" }} /><col style={{ width: "46%" }} /></colgroup>
        <thead><tr><th>{t.file}</th><th>{t.fileType}</th><th>{t.fileName}</th></tr></thead>
        <tbody>
          {FILES.map((f) => (
            <tr key={f.key}>
              <th>{f[lang]}</th>
              <td>{f.type}</td>
              <td className="small">{fileOf(f.key).name}{site && <><br />{site.replace(/\/$/, "") + fileOf(f.key).href}</>}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer>{foot(page)}</footer>
    </section>
  );
}

export function ContactSlide({ m, foot, page }: Props) {
  const { lang, t, site } = m;
  return (
    <section className="slide cover">
      <h2 style={{ color: "#fff" }}>{t.contact}</h2>
      <p className="cover__target" style={{ color: "#fff" }}>{EMAIL}</p>
      <p className="cover__target" style={{ color: "#fff" }}>{PHONE.display}</p>
      {site && <p className="cover__mail">{site}</p>}
      <p className="cover__note">{raw("disclaimer", "text", lang)}</p>
      <footer>{foot(page)}</footer>
    </section>
  );
}

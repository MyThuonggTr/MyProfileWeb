// Hero: role kicker, name, target role, four key figures, the three calls to action,
// then the positioning paragraph. The portrait column only exists when a photo file does.
import { items, text, type Lang } from "../../lib/content";
import { DOWNLOADS, EMAIL, ui } from "../../lib/ui";
import { homeLabels } from "../../lib/ui-home-labels";
import { ButtonLink } from "../ui/button-link";
import { DownloadLink } from "../ui/download-link";
import { Icon } from "../ui/icon";
import { HeroPortrait, portraitUrl } from "./hero-portrait";
import s from "./home-hero.module.css";

export function HomeHero({ lang }: { lang: Lang }) {
  const t = ui(lang);
  const h = homeLabels(lang);
  const figures = items("about", "key_figures", lang);

  return (
    <section className={`wrap ${s.hero}`} aria-labelledby="hero-name">
      <div className={portraitUrl ? s.top : undefined}>
        <div>
          <p className="kicker">{t.role}</p>
          <h1 id="hero-name" className={s.name}>
            {t.name}
          </h1>
          <p className={s.target}>{text("hero", "target", lang)}</p>
        </div>
        {portraitUrl && <HeroPortrait src={portraitUrl} alt={t.portraitAlt} className={s.photo} />}
      </div>

      <ul className={s.facts}>
        {figures.map((f) => (
          <li key={f.value} className={s.fact}>
            <span className={`num ${s.value}`}>{f.value}</span>
            <span className={s.label}>{f.label}</span>
          </li>
        ))}
      </ul>

      <div className={`btn-row ${s.cta}`}>
        <DownloadLink file={DOWNLOADS.pdf[lang]} variant="solid">
          {t.downloadPdf}
        </DownloadLink>
        <ButtonLink href={`mailto:${EMAIL}`} variant="line">
          {h.sendEmail}
        </ButtonLink>
        <a className={`btn btn--text ${s.toWork}`} href="#work">
          {h.viewWork}
          <Icon name="arrow-right" size={16} />
        </a>
      </div>

      <p className={s.lead}>{text("hero", "positioning", lang)}</p>
    </section>
  );
}

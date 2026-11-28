// Navy contact band closing every site page (anchor #contact), with both PDF versions.
import { raw, type Lang } from "../../lib/content";
import { DOWNLOADS, EMAIL, PHONE, ui } from "../../lib/ui";
import { DownloadLink } from "../ui/download-link";
import s from "./site-footer.module.css";

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = ui(lang);
  // The visitor's own language comes first and gets the solid button.
  const pdfs = lang === "vi"
    ? [{ file: DOWNLOADS.pdf.vi, label: t.pdfVi }, { file: DOWNLOADS.pdf.en, label: t.pdfEn }]
    : [{ file: DOWNLOADS.pdf.en, label: t.pdfEn }, { file: DOWNLOADS.pdf.vi, label: t.pdfVi }];

  return (
    <footer id="contact" className={s.footer} aria-labelledby="contact-title">
      <div className={`wrap ${s.inner}`}>
        <div>
          <h2 id="contact-title" className={s.title}>
            {t.contact}
          </h2>
          <dl className={s.list}>
            <div>
              <dt>{t.emailLabel}</dt>
              <dd>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt>{t.phoneLabel}</dt>
              <dd>
                <a href={PHONE.href} className="num">
                  {PHONE.display}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className={`btn-row ${s.actions}`}>
          {pdfs.map(({ file, label }, i) => (
            <DownloadLink key={file.href} file={file} variant={i === 0 ? "solid" : "line"}>
              {label}
            </DownloadLink>
          ))}
        </div>
      </div>
      <div className="wrap">
        <p className={s.note}>{raw("disclaimer", "text", lang)}</p>
      </div>
    </footer>
  );
}

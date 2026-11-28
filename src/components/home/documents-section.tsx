// All downloadable documents in four native <details> groups (portfolio PDFs open by default).
// Each row: document name, format, download link. Every row stays in the HTML when a group is closed.
import type { Lang } from "../../lib/content";
import { fileOf, ui } from "../../lib/ui";
import { homeLabels } from "../../lib/ui-home-labels";
import { DownloadLink } from "../ui/download-link";
import { SectionHeading } from "../ui/section-heading";
import c from "./home-common.module.css";
import { fileEntry, type FileKey } from "./home-file-link";
import s from "./documents-section.module.css";

type GroupTitle = "portfolio" | "projects" | "research" | "education";

const GROUPS: { title: GroupTitle; files: FileKey[] }[] = [
  { title: "portfolio", files: ["pdfVi", "pdfEn"] },
  { title: "projects", files: ["case3", "case3Report", "case2", "case2Report"] },
  { title: "research", files: ["ebibReport", "ebibExcel", "djData", "djR"] },
  { title: "education", files: ["transcriptEn", "transcriptVi", "scholarship"] },
];

export function DocumentsSection({ lang, n }: { lang: Lang; n: number }) {
  const t = ui(lang);
  const h = homeLabels(lang);
  const groupTitle = (g: GroupTitle) => (g === "portfolio" ? h.portfolioFiles : t[g]);

  return (
    <section id="documents" className="sec sec--surface" aria-labelledby="documents-title">
      <div className="wrap">
        <SectionHeading n={n} id="documents-title" title={t.downloads} />
        {GROUPS.map((g, i) => (
          <details key={g.title} className={s.group} open={i === 0}>
            <summary className={s.summary}>
              <span className={s.groupTitle}>{groupTitle(g.title)}</span>
              <span className={`num ${s.count}`}>
                {g.files.length} {h.filesWord}
              </span>
            </summary>
            <ul className={s.rows}>
              {g.files.map((key) => {
                const f = fileEntry(key);
                return (
                  <li key={key} className={s.row}>
                    <span className={s.label}>{f[lang]}</span>
                    <span className={s.type}>
                      <span className="visually-hidden">{t.fileType}: </span>
                      {f.type}
                    </span>
                    <DownloadLink file={fileOf(key)} className={c.link}>
                      {h.download}
                      <span className="visually-hidden"> – {f[lang]}</span>
                    </DownloadLink>
                  </li>
                );
              })}
            </ul>
          </details>
        ))}
        <p className={c.note}>{t.personalNote}</p>
      </div>
    </section>
  );
}

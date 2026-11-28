// "At a glance" aside on every case page: purpose, result, role, tools, date, the project's
// own files (model and report) and the anonymisation note. Sticky beside the main column on wide screens.
import { card, raw, text, type Lang } from "../../lib/content";
import { DOWNLOADS, ui } from "../../lib/ui";
import { DownloadLink, type DownloadFile } from "../ui/download-link";
import { taglineParts, type CaseKey } from "./case-links";
import s from "./case-summary-aside.module.css";

type SummaryRow = [label: string, value: string];

/** Role and date sit in the last tagline item: "Group coursework, UEH, 03/2025. Role: Team lead". */
function roleAndDate(block: CaseKey, lang: Lang): { role?: string; when: string } {
  const last = (taglineParts(block, lang).at(-1) ?? "").split(". ");
  const role = last.find((x) => /role|Vai trò/i.test(x))?.replace(/^(My role|Role|Vai trò): /, "");
  const when = last[0].match(/(\d{2}\/\d{4})/)?.[1] ?? last[0];
  return { role, when };
}

/** Excel model and PDF report of a case, when the case publishes them. */
function caseFiles(block: CaseKey): { excel?: DownloadFile; report?: DownloadFile } {
  if (block === "case4") return {};
  return { excel: DOWNLOADS[block], report: DOWNLOADS[`${block}Report` as const] };
}

export function CaseSummaryAside({ lang, block, className }: { lang: Lang; block: CaseKey; className?: string }) {
  const t = ui(lang);
  const c = card(block, lang);
  const { role, when } = roleAndDate(block, lang);
  const { excel, report } = caseFiles(block);
  const rows: SummaryRow[] = [
    [t.question, text(block, "question", lang)],
    [t.result, `${c.value} ${c.label}`],
    ...(role ? [[t.role2, role] satisfies SummaryRow] : []),
    [t.tools, c.tools],
    [t.date, when],
  ];

  return (
    <aside className={[s.aside, className].filter(Boolean).join(" ")} aria-labelledby="case-summary-h">
      <h2 id="case-summary-h" className={s.title}>
        {t.summary}
      </h2>
      <dl className={s.list}>
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      {(excel || report) && (
        <div className={s.actions}>
          {excel && (
            <DownloadLink file={excel} variant="solid">
              {t.downloadExcel}
            </DownloadLink>
          )}
          {report && block !== "case4" && (
            <DownloadLink file={report} variant="line">
              {t.reportLabel[block]}
            </DownloadLink>
          )}
        </div>
      )}
      <p className={s.note}>{raw("disclaimer", "text", lang)}</p>
    </aside>
  );
}

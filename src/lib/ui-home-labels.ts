// Interface labels used only by the home page that ui.ts does not already provide.
// Portfolio text stays in content.json; shared labels stay in ui.ts.
import type { Lang } from "./content";

export const homeLabelsEn = {
  /** Outline hero button that opens the visitor's mail app. */
  sendEmail: "Email me",
  /** Text link from the hero down to the selected work list. */
  viewWork: "View projects",
  /** Visible text of each row link in the documents list. */
  download: "Download",
  /** Heading of the documents group holding the two portfolio PDFs. */
  portfolioFiles: "Portfolio",
  /** Count shown next to each documents group heading ("4 files"). */
  filesWord: "files",
} as const;

export const homeLabelsVi = {
  sendEmail: "Gửi email",
  viewWork: "Xem dự án",
  download: "Tải về",
  portfolioFiles: "Hồ sơ năng lực",
  filesWord: "tệp",
} as const satisfies Record<keyof typeof homeLabelsEn, string>;

export type HomeLabels = Record<keyof typeof homeLabelsEn, string>;

export const homeLabels = (lang: Lang): HomeLabels => (lang === "vi" ? homeLabelsVi : homeLabelsEn);

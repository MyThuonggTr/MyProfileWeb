// Interface labels used only by the case pages and missing from ui.ts (en and vi together).
// Portfolio text still comes from content.json; these are captions and navigation names.
import type { Lang } from "./content";

const labels = {
  en: {
    caseNav: "Case navigation",
    previous: "Previous",
    irrGridCaption: "Project IRR (TIPV). Rows: construction cost vs base; columns: apartment sale price vs base.",
    sensCorner: "g \\ r",
    wacc: "WACC",
    checkPrefix: "P",
  },
  vi: {
    caseNav: "Điều hướng dự án",
    previous: "Trước",
    irrGridCaption: "IRR dự án (TIPV). Hàng: chi phí xây dựng so với cơ sở; cột: giá bán căn hộ so với cơ sở.",
    sensCorner: "g \\ r",
    wacc: "WACC",
    checkPrefix: "P",
  },
} as const;

export const caseLabels = (lang: Lang) => labels[lang];

// Interface labels (navigation, buttons, section names). Portfolio text lives in content.json.
import type { Lang } from "./content";

export const EMAIL = "trinhmythuong.work@gmail.com";
export const NAME = "Trinh Thi My Thuong";

export const DOWNLOADS = {
  pdf: {
    en: { href: "/downloads/trinh-thi-my-thuong-real-estate-valuation-portfolio-en.pdf", name: "Trinh Thi My Thuong - Real Estate Valuation Portfolio (EN).pdf" },
    vi: { href: "/downloads/trinh-thi-my-thuong-real-estate-valuation-portfolio-vi.pdf", name: "Trinh Thi My Thuong - Real Estate Valuation Portfolio (VI).pdf" },
  },
  excel: { href: "/downloads/grade-b-office-hcmc-dcf-valuation.xlsx", name: "Grade-B Office HCMC - DCF Valuation.xlsx" },
};

const strings = {
  en: {
    name: "Trinh Thi My Thuong",
    role: "Real estate valuation & investment analysis",
    nav: { projects: "Projects", research: "Research", skills: "Skills", contact: "Contact" },
    langLabel: "Language",
    skip: "Skip to content",
    portfolio: "Portfolio",
    viewProjects: "View projects",
    downloadPdf: "Download PDF",
    downloadExcel: "Download model (Excel)",
    portraitAlt: "Portrait placeholder",
    about: "About",
    map: "Portfolio map",
    stepsLabel: "Investment steps",
    readCase: "Read the case",
    readChecklist: "Read the checklist",
    research: "Research",
    skills: "Skills",
    education: "Education",
    contact: "Contact",
    pdfEn: "PDF EN",
    pdfVi: "PDF VI",
    approach: "Approach",
    sensitivity: "Sensitivity",
    showNumbers: "Show the numbers",
    sensCaption: "Market value, VND bn. Rows: terminal growth g; columns: discount rate r.",
    allProjects: "All projects",
    next: "Next",
    breadcrumb: "Breadcrumb",
    question: "Question",
    checklist: "Checklist",
    redFlags: "Red flags",
    basis: "Basis",
    keyFigures: "Key figures",
    fileFormats: "PDF, 16:9",
  },
  vi: {
    name: "Trịnh Thị Mỹ Thương",
    role: "Thẩm định giá và phân tích đầu tư bất động sản",
    nav: { projects: "Dự án", research: "Nghiên cứu", skills: "Kỹ năng", contact: "Liên hệ" },
    langLabel: "Ngôn ngữ",
    skip: "Đến nội dung chính",
    portfolio: "Portfolio",
    viewProjects: "Xem dự án",
    downloadPdf: "Tải PDF",
    downloadExcel: "Tải mô hình (Excel)",
    portraitAlt: "Khung ảnh chân dung",
    about: "Giới thiệu",
    map: "Bản đồ portfolio",
    stepsLabel: "Các bước đầu tư",
    readCase: "Xem bài",
    readChecklist: "Xem checklist",
    research: "Nghiên cứu",
    skills: "Kỹ năng",
    education: "Học vấn",
    contact: "Liên hệ",
    pdfEn: "PDF EN",
    pdfVi: "PDF VI",
    approach: "Cách làm",
    sensitivity: "Độ nhạy",
    showNumbers: "Xem bảng số",
    sensCaption: "Giá trị thị trường, tỷ đồng. Hàng: tăng trưởng dài hạn g; cột: tỷ suất chiết khấu r.",
    allProjects: "Tất cả dự án",
    next: "Tiếp theo",
    breadcrumb: "Đường dẫn",
    question: "Câu hỏi",
    checklist: "Checklist",
    redFlags: "Cờ đỏ",
    basis: "Căn cứ",
    keyFigures: "Số chính",
    fileFormats: "PDF, 16:9",
  },
} as const;

export const ui = (lang: Lang) => strings[lang];

/** Same page in the other language. */
export const otherLangPath = (path: string, to: Lang) => path.replace(/^\/(en|vi)\//, `/${to}/`);

/** Number formatting per language (VI uses comma decimals and dot thousands). */
export function num(n: number, lang: Lang, decimals = 0): string {
  return n.toLocaleString(lang === "vi" ? "vi-VN" : "en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

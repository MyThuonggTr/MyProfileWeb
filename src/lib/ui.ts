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
    selectedWork: "Selected work",
    skillsMap: "Skills map",
    skill: "Skill",
    evidence: "Where it is shown",
    experience: "Experience",
    summary: "At a glance",
    result: "Result",
    role2: "My role",
    tools: "Tools",
    date: "Date",
    files: "Files",
    noExcel: "The model file is not shared; the model structure is shown below.",
    modelMap: "Model structure",
    funding: "Funding and sensitivity",
    readCase3: "Read the case",
    contactMe: "Contact me",
    checks: "Checks",
    redFlag: "Red flag",
    details: "Full checklist and legal basis",
    profile: "Profile",
    projects: "Projects",
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
    selectedWork: "Dự án tiêu biểu",
    skillsMap: "Kỹ năng và bằng chứng",
    skill: "Kỹ năng",
    evidence: "Thể hiện ở đâu",
    experience: "Kinh nghiệm",
    summary: "Tóm tắt",
    result: "Kết quả",
    role2: "Vai trò",
    tools: "Công cụ",
    date: "Thời gian",
    files: "Tài liệu",
    noExcel: "File mô hình không chia sẻ; cấu trúc mô hình ở bên dưới.",
    modelMap: "Cấu trúc mô hình",
    funding: "Nguồn vốn và độ nhạy",
    readCase3: "Xem bài",
    contactMe: "Liên hệ",
    checks: "Các nhóm kiểm tra",
    redFlag: "Cờ đỏ",
    details: "Checklist đầy đủ và căn cứ pháp lý",
    profile: "Hồ sơ",
    projects: "Dự án",
  },
} as const;

export const ui = (lang: Lang) => strings[lang];

/** Same page in the other language. */
export const otherLangPath = (path: string, to: Lang) => path.replace(/^\/(en|vi)\//, `/${to}/`);

/** Number formatting per language (VI uses comma decimals and dot thousands). */
export function num(n: number, lang: Lang, decimals = 0): string {
  return n.toLocaleString(lang === "vi" ? "vi-VN" : "en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/** Published cases, in reading order. */
export const CASES = [
  { key: "case3", slug: "grade-b-office", excel: true },
  { key: "case2", slug: "riverside-residences", excel: false },
  { key: "case4", slug: "acquisition-checklist", excel: false },
] as const;
export const caseHref = (lang: Lang, key: string) => `/${lang}/cases/${CASES.find((c) => c.key === key)!.slug}/`;

// 16:9 print version /:lang/print/, outside the site layout so it loads none of the site CSS.
// scripts/build-pdf.mjs turns it into the downloadable PDFs. Slide order matches the website:
// profile, project overview, cases, research, contact.
import "@fontsource-variable/inter";
import "@fontsource-variable/source-serif-4";
import type { Route } from "./+types/print";
import printCss from "../styles/print-legacy.css?url";
import { ContactSlide, CoverSlide, DownloadsSlide, OverviewSlide, ProfileSlide } from "../components/print/print-slides-intro";
import { GradeBSlides, RiversideSlides } from "../components/print/print-slides-cases";
import { LegalSlides, ResearchSlide } from "../components/print/print-slides-legal";
import { ExperienceSlide, PrinciplesSlide } from "../components/print/print-slides-about";
import { printModel } from "../components/print/print-model";
import { text } from "../lib/content";
import { parseLang, useLang } from "../lib/route-lang";
import type { HeadHandle } from "../lib/seo";
import { ui } from "../lib/ui";

/** Fixed 1280px layout and kept out of search results, as before. */
export const handle: HeadHandle = { head: { viewport: "width=1280", robots: "noindex" } };

export const links: Route.LinksFunction = () => [{ rel: "stylesheet", href: printCss }];

export const meta: Route.MetaFunction = ({ params }) => {
  const lang = parseLang(params.lang);
  return lang ? [{ title: `${text("hero", "title", lang)} – ${ui(lang).name} (PDF)` }] : [];
};

const SLIDES = 22;

export default function Print() {
  const lang = useLang();
  const m = printModel(lang);
  const foot = (page: number) => `${m.t.name} · ${m.target} · ${m.t.pageWord} ${page}/${SLIDES}`;
  return (
    <>
      <CoverSlide m={m} foot={foot} page={1} />
      <ProfileSlide m={m} foot={foot} page={2} />
      <OverviewSlide m={m} foot={foot} page={3} />
      <GradeBSlides m={m} foot={foot} page={4} />
      <RiversideSlides m={m} foot={foot} page={7} />
      <LegalSlides m={m} foot={foot} page={10} />
      <ResearchSlide m={m} foot={foot} page={18} />
      <ExperienceSlide m={m} foot={foot} page={19} />
      <PrinciplesSlide m={m} foot={foot} page={20} />
      <DownloadsSlide m={m} foot={foot} page={21} />
      <ContactSlide m={m} foot={foot} page={22} />
    </>
  );
}

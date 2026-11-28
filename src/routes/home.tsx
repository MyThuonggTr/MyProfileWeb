// Home page: hero, then the numbered sections in HOME_SECTIONS order
// (work, experience, skills + education, research, documents). Contact is the site footer.
import type { Route } from "./+types/home";
import { DocumentsSection } from "../components/home/documents-section";
import { ExperienceSection } from "../components/home/experience-section";
import { HomeHero } from "../components/home/home-hero";
import { ResearchSection } from "../components/home/research-section";
import { SelectedWork } from "../components/home/selected-work";
import { SkillsAndEducationBand } from "../components/home/skills-and-education-band";
import { text } from "../lib/content";
import { useLang } from "../lib/route-lang";
import { langMeta } from "../lib/seo";
import { ui } from "../lib/ui";

export const meta: Route.MetaFunction = (args) =>
  langMeta(args, (lang) => ({
    title: `${ui(lang).name} – ${text("hero", "target", lang)}`,
    description: text("hero", "positioning", lang),
  }));

export default function Home() {
  const lang = useLang();
  return (
    <>
      <HomeHero lang={lang} />
      <SelectedWork lang={lang} n={1} />
      <ExperienceSection lang={lang} n={2} />
      <SkillsAndEducationBand lang={lang} n={3} />
      <ResearchSection lang={lang} n={5} />
      <DocumentsSection lang={lang} n={6} />
    </>
  );
}

// Case page /:lang/cases/acquisition-checklist/ (stub). The case phase replaces the body; keep the meta export contract.
import type { Route } from "./+types/case-acquisition-checklist";
import { text } from "../lib/content";
import { useLang } from "../lib/route-lang";
import { langMeta } from "../lib/seo";
import { ui } from "../lib/ui";

export const meta: Route.MetaFunction = (args) =>
  langMeta(args, (lang) => ({
    title: `${ui(lang).checklist} – ${ui(lang).name}`,
    description: text("case4", "headline", lang),
  }));

export default function AcquisitionChecklist() {
  const lang = useLang();
  return (
    <section className="wrap sec">
      <h1>{text("case4", "headline", lang)}</h1>
    </section>
  );
}

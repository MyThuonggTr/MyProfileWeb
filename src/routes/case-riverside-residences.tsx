// Case page /:lang/cases/riverside-residences/ (stub). The case phase replaces the body; keep the meta export contract.
import type { Route } from "./+types/case-riverside-residences";
import { pipes, text, type Lang } from "../lib/content";
import { useLang } from "../lib/route-lang";
import { langMeta } from "../lib/seo";
import { ui } from "../lib/ui";

/** Case name: second item of the tagline ("Kind | Name | ..."). */
const caseName = (lang: Lang) => pipes(text("case2", "tagline", lang))[1];

export const meta: Route.MetaFunction = (args) =>
  langMeta(args, (lang) => ({
    title: `${caseName(lang)} – ${ui(lang).name}`,
    description: text("case2", "headline", lang),
  }));

export default function RiversideResidences() {
  const lang = useLang();
  return (
    <section className="wrap sec">
      <h1>{text("case2", "headline", lang)}</h1>
    </section>
  );
}

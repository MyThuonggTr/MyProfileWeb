// Home page (stub). The home phase replaces the body; keep the meta export contract.
import type { Route } from "./+types/home";
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
    <section className="wrap sec">
      <h1>{ui(lang).name}</h1>
    </section>
  );
}

// "/" has no content of its own: a static page that sends visitors to /en/ without JavaScript,
// with a visible link per language in case the refresh is blocked.
import type { Route } from "./+types/root-redirect";
import { LANGS } from "../lib/content";
import type { HeadHandle } from "../lib/seo";
import { ui } from "../lib/ui";

const TARGET = "/en/";

export const handle: HeadHandle = { head: { robots: "noindex" } };

export const meta: Route.MetaFunction = () => [
  { title: ui("en").name },
  { httpEquiv: "refresh", content: `0;url=${TARGET}` },
  { tagName: "link", rel: "canonical", href: TARGET },
];

export default function RootRedirect() {
  return (
    <main>
      {LANGS.map((l) => (
        <p key={l}>
          <a href={`/${l}/`} lang={l} hrefLang={l}>
            {ui(l).openPortfolio}
          </a>
        </p>
      ))}
    </main>
  );
}

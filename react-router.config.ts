import type { Config } from "@react-router/dev/config";
import { LANGS } from "./src/lib/content";
import { CASES } from "./src/lib/ui";

/** Every public URL, with the trailing slash the site has always used. */
const pagePaths = LANGS.flatMap((lang) => [
  `/${lang}/`,
  ...CASES.map((c) => `/${lang}/cases/${c.slug}/`),
  `/${lang}/print/`,
]);

export default {
  appDirectory: "src",
  buildDirectory: "dist",
  // Static site: no runtime server. Each URL below is rendered to dist/client/<url>/index.html.
  ssr: false,
  prerender: ["/", ...pagePaths],
} satisfies Config;

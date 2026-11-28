// URL map. Paths match the previous Astro site; every URL is prerendered (react-router.config.ts).
import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  // "/" is a static meta-refresh page pointing to /en/.
  index("routes/root-redirect.tsx"),

  // Site pages share the site header, footer and stylesheets.
  layout("routes/site-layout.tsx", [
    route(":lang", "routes/home.tsx"),
    route(":lang/cases/grade-b-office", "routes/case-grade-b-office.tsx"),
    route(":lang/cases/riverside-residences", "routes/case-riverside-residences.tsx"),
    route(":lang/cases/acquisition-checklist", "routes/case-acquisition-checklist.tsx"),
  ]),

  // The 16:9 print version stays outside the site layout so its CSS is isolated.
  route(":lang/print", "routes/print.tsx"),

  // Crawl files, prerendered as static text/XML.
  route("robots.txt", "routes/robots-txt.ts"),
  route("sitemap.xml", "routes/sitemap-xml.ts"),
] satisfies RouteConfig;

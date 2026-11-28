// /robots.txt, prerendered at build: allow crawling and point to the sitemap.
import { absoluteUrl } from "../lib/site-pages";

export function loader() {
  const body = ["User-agent: *", "Allow: /", "", `Sitemap: ${absoluteUrl("/sitemap.xml")}`, ""].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

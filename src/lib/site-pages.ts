// Public URLs of the site and its absolute origin. Shared by the prerender list
// (react-router.config.ts), hreflang links (seo.ts), robots.txt and sitemap.xml.
import { LANGS } from "./content";
import { CASES } from "./ui";

/**
 * Absolute origin for hreflang, sitemap and robots links. Set PUBLIC_SITE_URL at build time
 * to override (e.g. a custom domain); defaults to the production Vercel domain.
 */
export const SITE_URL = String(import.meta.env?.PUBLIC_SITE_URL || "https://mythuongtrinh.vercel.app").replace(/\/+$/, "");

/** Absolute URL for a site path such as "/en/". */
export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;

/** Indexable pages (home + cases per language), with the trailing slash the site has always used. */
export const INDEXABLE_PATHS = LANGS.flatMap((lang) => [`/${lang}/`, ...CASES.map((c) => `/${lang}/cases/${c.slug}/`)]);

/** Print versions: prerendered for the PDF build, kept out of search (noindex, not in the sitemap). */
export const PRINT_PATHS = LANGS.map((lang) => `/${lang}/print/`);

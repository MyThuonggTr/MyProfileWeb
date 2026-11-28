// Language taken from the `:lang` URL segment. Every page lives under /en/ or /vi/.
import { useParams } from "react-router";
import { LANGS, type Lang } from "./content";

/** The language for a raw route param, or null when the segment is not a site language. */
export const parseLang = (value: string | undefined): Lang | null => LANGS.find((l) => l === value) ?? null;

/**
 * Current page language. An unknown segment (e.g. /fr/) throws a 404 Response,
 * which the root ErrorBoundary renders as "page not found".
 */
export function useLang(): Lang {
  const lang = parseLang(useParams().lang);
  if (!lang) throw new Response("Not Found", { status: 404 });
  return lang;
}

/** Path with a guaranteed trailing slash (all site URLs end in "/"). */
export const withTrailingSlash = (path: string): string => (path.endsWith("/") ? path : `${path}/`);

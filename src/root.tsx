// HTML shell shared by every route. Deliberately loads no stylesheet: the site
// layout route brings the site CSS, the print route its own legacy CSS.
import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useMatches, useParams } from "react-router";
import type { Route } from "./+types/root";
import { parseLang } from "./lib/route-lang";
import { headOverrides } from "./lib/seo";
import { ui } from "./lib/ui";

export const links: Route.LinksFunction = () => [{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }];

export function Layout({ children }: { children: ReactNode }) {
  const lang = parseLang(useParams().lang) ?? "en";
  const { viewport, robots } = headOverrides(useMatches().map((m) => m.handle));
  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content={viewport} />
        <meta name="robots" content={robots} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

/** Last-resort page for unknown languages and unexpected render errors. */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const lang = parseLang(useParams().lang) ?? "en";
  const t = ui(lang);
  const notFound = (isRouteErrorResponse(error) || error instanceof Response) && error.status === 404;
  if (!notFound) console.error(error);
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 640, margin: "64px auto", padding: "0 24px" }}>
      <title>{notFound ? t.notFound : t.errorTitle}</title>
      <h1>{notFound ? t.notFound : t.errorTitle}</h1>
      <p>
        <a href={`/${lang}/`}>{t.backHome}</a>
      </p>
    </main>
  );
}

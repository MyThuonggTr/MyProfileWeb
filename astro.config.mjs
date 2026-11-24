import { defineConfig } from "astro/config";

export default defineConfig({
  trailingSlash: "always",
  build: { format: "directory" },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "vi"],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: true },
  },
  redirects: { "/": "/en/" },
});

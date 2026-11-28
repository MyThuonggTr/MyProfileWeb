import type { Config } from "@react-router/dev/config";
import { INDEXABLE_PATHS, PRINT_PATHS } from "./src/lib/site-pages";

export default {
  appDirectory: "src",
  buildDirectory: "dist",
  // Static site: no runtime server. Each URL below is rendered to dist/client/<url>/index.html;
  // robots.txt and sitemap.xml are prerendered resource routes.
  ssr: false,
  prerender: ["/", ...INDEXABLE_PATHS, ...PRINT_PATHS, "/robots.txt", "/sitemap.xml"],
} satisfies Config;

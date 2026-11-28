import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  // PUBLIC_SITE_URL (absolute site origin, used by the print route) stays readable via import.meta.env.
  envPrefix: ["VITE_", "PUBLIC_"],
});

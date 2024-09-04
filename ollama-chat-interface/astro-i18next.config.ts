import type { AstroI18nextConfig } from "astro-i18next";

const config: AstroI18nextConfig = {
  defaultLocale: "en",
  locales: ["en", "es"],
  i18nextServer: {
    debug: true,
    initImmediate: false,
    backend: {
      loadPath: "./public/locales/{{lng}}/{{ns}}.json",
     },
  },
  i18nextServerPlugins: { fsBackend: "i18next-fs-backend" },
};

export default config;
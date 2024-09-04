import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import astroI18next from "astro-i18next";

export default defineConfig({
  integrations: [ astroI18next(), tailwind(), react()],
});
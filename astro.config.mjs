import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/': '/home'
  },
  output: 'server',
  integrations: [tailwind()]
});
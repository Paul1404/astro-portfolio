import { defineConfig } from 'astro/config';
import { Application } from '@splinetool/runtime';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare()
});
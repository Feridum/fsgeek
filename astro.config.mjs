import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import { astroImageTools } from 'astro-imagetools';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com/', trailingSlash: 'always',
  experimental: {
    integrations: true
  },
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'monokai'
    }
  },
  integrations: [react(), tailwind({}), sitemap({
      serialize(item) {
      item.priority = 0.5;

      if (/post/.test(item.url)) {
        item.priority = 0.8;
      }

      item.changefreq = 'daily';
      item.lastmod = new Date();
      return item;
    },}), robotsTxt(), astroImageTools, mdx()]
});
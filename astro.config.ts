import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config/site';

export default defineConfig({
  site: site.url,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  // Old routes from the first version. Cloudflare also has public/_redirects.
  redirects: {
    '/gallery': '/',
    '/about': '/info',
    '/events': '/info#events',
  },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});

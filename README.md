# gogofigo-web

Portfolio site for gogofigo. Built with Astro, deployed on Cloudflare Pages.

## Run locally

Requires Node 22+.

```sh
npm install
npm run dev      # http://localhost:4321
```

Production build and preview:

```sh
npm run build
npm run preview
```

## Deploy to Cloudflare Pages

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, pick this repo.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION` = `22`
4. Save and deploy. Every push to `main` redeploys; pull requests get preview URLs.

### Custom domain

Pages project → **Custom domains → Set up a domain**. Then update `url` in `src/config/site.ts` and the sitemap line in `public/robots.txt`.

### Analytics

Cloudflare dashboard → **Web Analytics → Add a site** and copy the token into `analyticsToken` in `src/config/site.ts`.

## Editing content

- Works: `src/content/works/<slug>/` (see CLAUDE.md for the frontmatter)
- Events: `src/content/events/`
- Links, email, commission status and prices: `src/config/site.ts`

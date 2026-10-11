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

## Deploy to Cloudflare

The site deploys as a static Cloudflare Worker (config: `wrangler.jsonc`, assets only, no adapter).

1. Cloudflare dashboard: **Workers & Pages → Create → Import a repository**, pick this repo.
2. Build command: `npm run build`. Deploy command: `npx wrangler deploy`.
3. Every push to `main` (including Pages CMS saves) redeploys.

Redirects live only in `public/_redirects`. Do not also add `redirects` to `astro.config.ts`: Cloudflare rejects duplicate rules.

### Custom domain

The site runs on `hellogogofigo.com` (bought at Cloudflare Registrar). Worker → **Settings → Domains & Routes** lists it. If the domain ever changes, update `url` in `src/config/site.ts` and the sitemap line in `public/robots.txt`.

### Analytics

Cloudflare dashboard → **Web Analytics → Add a site** and copy the token into `analyticsToken` in `src/config/site.ts`.

## Editing content (Pages CMS)

Works, events, commission status and prices, bio, email and socials are edited in [Pages CMS](https://pagescms.org), a free editor that saves straight to this GitHub repo. No code needed.

1. Go to <https://app.pagescms.org> and sign in with GitHub.
2. Install the Pages CMS GitHub app when asked, for `hansfigo/gogofigo-web` only.
3. Open the repo, branch `main`. The sidebar shows **Works**, **Events**, **Settings** and **Media**.
4. Edit and press **Save**. Each save is a commit, and Cloudflare Pages rebuilds the site (about a minute).

Adding a work: **Works → Add an entry**, upload the image (JPG or PNG, long edge around 2500px; the site makes the small versions), fill in title, alt text, year and medium, save. The title becomes the URL (`/work/<title>`).

Removing the sample art: delete the six works marked **Placeholder** and their images under **Media**.

Events move from upcoming to past only when the site rebuilds, so after an event ends, save anything (or redeploy in Cloudflare).

The CMS config is `.pages.yml`. Where things live in the code:

- Works: `src/content/works/<slug>.md`, images in `src/assets/works/`
- Events: `src/content/events/<slug>.md`
- Settings (commission, bio, email, socials, tagline): `src/data/settings.json`
- Domain, analytics token, site description: `src/config/site.ts`

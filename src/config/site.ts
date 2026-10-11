// Code-side settings. Things Figo edits often (bio, email, socials, commission)
// live in src/data/settings.json, which Pages CMS edits. Values marked TODO are placeholders.
import settings from '../data/settings.json';

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export type CommissionTier = {
  name: string;
  priceFrom: string;
};

// Short bio for the Info page. Keep it this short.
export const bio: string[] = settings.bio.filter(Boolean);

export const site = {
  name: 'gogofigo',
  tagline: settings.tagline,
  description:
    'gogofigo is the art name of Figo, an illustrator and acrylic painter. Anime-proportioned figures, painterly flat-brush strokes, blues and indigos.',
  // TODO: replace with the real domain once it exists.
  url: 'https://gogofigo-web.pages.dev',
  locale: 'en',
  email: settings.email, // TODO in settings.json
  // Cloudflare Web Analytics beacon token. Leave empty to disable.
  analyticsToken: '', // TODO
} as const;

export const nav = [
  { label: 'Work', href: '/' },
  { label: 'Info', href: '/info' },
  { label: 'Commission', href: '/commission' },
] as const;

export const socials: SocialLink[] = settings.socials.filter((s) => s.label && s.href);

export const commission = {
  open: settings.commission.open,
  vgenUrl: settings.commission.vgenUrl, // TODO in settings.json
  tiers: settings.commission.tiers.filter((t) => t.name) satisfies CommissionTier[],
};

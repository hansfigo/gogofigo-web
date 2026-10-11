// Single place for everything that changes often: links, contact, commission info.
// Values marked TODO are placeholders until Figo fills them in.

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export type CommissionTier = {
  name: string;
  priceFrom: string;
};

// Short bio for the Info page. Keep it to two or three sentences.
export const bio = [
  'gogofigo is Figo, an illustrator and acrylic painter.', // TODO: Figo to rewrite
  'Fragile, intimate moments and quiet rooms, in blue and indigo.', // TODO
];

export const site = {
  name: 'gogofigo',
  tagline: 'Illustration & acrylic painting',
  description:
    'gogofigo is the art name of Figo, an illustrator and acrylic painter. Anime-proportioned figures, painterly flat-brush strokes, blues and indigos.',
  // TODO: replace with the real domain once it exists.
  url: 'https://gogofigo-web.pages.dev',
  locale: 'en',
  email: 'hello@example.com', // TODO
  // Cloudflare Web Analytics beacon token. Leave empty to disable.
  analyticsToken: '', // TODO
} as const;

export const nav = [
  { label: 'Work', href: '/' },
  { label: 'Info', href: '/info' },
  { label: 'Commission', href: '/commission' },
] as const;

export const socials: SocialLink[] = [
  { label: 'Instagram', handle: '@gogofigo', href: 'https://instagram.com/gogofigo' }, // TODO
  { label: 'X', handle: '@gogofigo', href: 'https://x.com/gogofigo' }, // TODO
  { label: 'VGen', handle: 'gogofigo', href: 'https://vgen.co/gogofigo' }, // TODO
];

export const commission = {
  open: true,
  vgenUrl: 'https://vgen.co/gogofigo', // TODO
  tiers: [
    { name: 'Bust', priceFrom: 'from $XX' }, // TODO
    { name: 'Half body', priceFrom: 'from $XX' }, // TODO
    { name: 'Full illustration', priceFrom: 'from $XX' }, // TODO
  ] satisfies CommissionTier[],
};

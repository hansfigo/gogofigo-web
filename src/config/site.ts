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

// Short bio for the Info page. Keep it this short.
export const bio = [
  'Hi, I’m Figo. I like to draw.',
  'I draw digitally in Clip Studio Paint and Procreate, and paint with acrylic on canvas.',
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
  { label: 'Instagram', handle: '@hellogogofigo', href: 'https://instagram.com/hellogogofigo' },
  { label: 'X', handle: '@hellogogofigo', href: 'https://x.com/hellogogofigo' },
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

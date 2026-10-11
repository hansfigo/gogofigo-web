// Single place for everything that changes often: links, contact, commission info.
// Values marked TODO are placeholders until Figo fills them in.

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export type CommissionTier = {
  name: string;
  description: string;
  priceFrom: string;
};

export const site = {
  name: 'gogofigo',
  tagline: 'Quiet rooms, fragile moments, painted in flat strokes.', // TODO: confirm wording
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
  { label: 'Gallery', href: '/gallery' },
  { label: 'Commission', href: '/commission' },
  { label: 'Events', href: '/events' },
  { label: 'About', href: '/about' },
] as const;

export const socials: SocialLink[] = [
  { label: 'Instagram', handle: '@gogofigo', href: 'https://instagram.com/gogofigo' }, // TODO
  { label: 'X', handle: '@gogofigo', href: 'https://x.com/gogofigo' }, // TODO
  { label: 'VGen', handle: 'gogofigo', href: 'https://vgen.co/gogofigo' }, // TODO
];

export const commission = {
  open: true,
  // Shown next to the status badge, e.g. "3 of 5 slots left".
  note: 'Limited slots each month.', // TODO
  vgenUrl: 'https://vgen.co/gogofigo', // TODO
  tiers: [
    { name: 'Bust', description: 'Head and shoulders, simple background.', priceFrom: 'from $XX' }, // TODO
    { name: 'Half body', description: 'Waist up, simple background.', priceFrom: 'from $XX' }, // TODO
    { name: 'Full illustration', description: 'Full body with a painted scene.', priceFrom: 'from $XX' }, // TODO
  ] satisfies CommissionTier[],
  steps: [
    'Send a request through VGen with references and a short brief.',
    'I confirm the scope, price and timeline.',
    'Payment through VGen, then a rough sketch for approval.',
    'Painting, with one round of small revisions.',
    'Final files delivered through VGen.',
  ],
};

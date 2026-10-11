import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Pages CMS may save an emptied optional field as "" or null. Treat both as "not set".
const blank = (v: unknown) => (v === '' || v === null ? undefined : v);
const optional = <T extends z.ZodType>(schema: T) => z.preprocess(blank, schema.optional());

const works = defineCollection({
  // One file per work: src/content/works/<slug>.md. The file name is the URL slug.
  // Images live in src/assets/works/ (the Pages CMS media folder).
  loader: glob({ pattern: '*.md', base: './src/content/works' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.coerce.number().int(),
      medium: z.enum(['digital', 'acrylic']),
      size: optional(z.string()),
      featured: z.boolean().default(false),
      order: optional(z.coerce.number()),
      description: optional(z.string()),
      alt: z.string().min(1, 'Alt text is required'),
      image: image(),
      placeholder: z.boolean().default(false),
    }),
});

const events = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    endDate: optional(z.coerce.date()),
    location: z.string(),
    booth: optional(z.string()),
    description: optional(z.string()),
    link: optional(z.url()),
  }),
});

export const collections = { works, events };

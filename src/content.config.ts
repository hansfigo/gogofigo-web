import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const works = defineCollection({
  // One folder per work: src/content/works/<slug>/index.md + image file.
  loader: glob({ pattern: '*/index.md', base: './src/content/works' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string().regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers and dashes'),
      year: z.number().int(),
      medium: z.enum(['digital', 'acrylic']),
      size: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number().optional(),
      description: z.string().optional(),
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
    endDate: z.coerce.date().optional(),
    location: z.string(),
    booth: z.string().optional(),
    description: z.string().optional(),
    link: z.url().optional(),
  }),
});

export const collections = { works, events };

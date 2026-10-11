import { getCollection, type CollectionEntry } from 'astro:content';

export type Work = CollectionEntry<'works'>;

export const mediumLabel: Record<Work['data']['medium'], string> = {
  digital: 'Digital',
  acrylic: 'Acrylic on canvas',
};

/** All works: explicit `order` first, then newest year, then title. */
export async function getWorks(): Promise<Work[]> {
  const works = await getCollection('works');
  return works.sort((a, b) => {
    const ao = a.data.order ?? Number.POSITIVE_INFINITY;
    const bo = b.data.order ?? Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    if (a.data.year !== b.data.year) return b.data.year - a.data.year;
    return a.data.title.localeCompare(b.data.title);
  });
}

export async function getFeaturedWorks(limit = 6): Promise<Work[]> {
  return (await getWorks()).filter((w) => w.data.featured).slice(0, limit);
}

export const workUrl = (work: Work) => `/work/${work.id}`;

import { getCollection, type CollectionEntry } from 'astro:content';

export type Event = CollectionEntry<'events'>;

// Upcoming vs past is decided at build time; redeploy after an event ends.
export async function getEvents() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const events = await getCollection('events');
  const ends = (e: Event) => e.data.endDate ?? e.data.date;
  const upcoming = events.filter((e) => ends(e) >= now).sort((a, b) => +a.data.date - +b.data.date);
  const past = events.filter((e) => ends(e) < now).sort((a, b) => +b.data.date - +a.data.date);
  return { upcoming, past };
}

const fmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
const fmtShort = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });

export function formatEventDate(e: Event) {
  const { date, endDate } = e.data;
  if (!endDate || +endDate === +date) return fmt.format(date);
  if (date.getUTCFullYear() === endDate.getUTCFullYear()) return `${fmtShort.format(date)} – ${fmt.format(endDate)}`;
  return `${fmt.format(date)} – ${fmt.format(endDate)}`;
}

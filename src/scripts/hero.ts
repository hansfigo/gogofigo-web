import { gsap, EASE, reducedMotion } from './motion';

function splitInto(el: HTMLElement, unit: 'char' | 'word') {
  const text = el.textContent ?? '';
  el.setAttribute('aria-label', text);
  const parts = unit === 'char' ? [...text] : text.split(/(\s+)/);
  el.innerHTML = '';
  const pieces: HTMLElement[] = [];
  for (const part of parts) {
    if (/^\s+$/.test(part)) {
      el.append(part);
      continue;
    }
    const span = document.createElement('span');
    span.textContent = part;
    span.setAttribute('aria-hidden', 'true');
    span.style.display = 'inline-block';
    el.append(span);
    pieces.push(span);
  }
  return pieces;
}

function initHero() {
  const title = document.querySelector<HTMLElement>('[data-hero-title]');
  const line = document.querySelector<HTMLElement>('[data-hero-line]');
  if (!title || title.dataset.animated) return;
  title.dataset.animated = 'true';

  if (reducedMotion()) return;

  const chars = splitInto(title, 'char');
  const words = line ? splitInto(line, 'word') : [];

  // CSS keeps these hidden until now (see index.astro); hand over to GSAP.
  gsap.set([title, line].filter(Boolean), { opacity: 1 });
  title.classList.add('is-ready');
  line?.classList.add('is-ready');

  const tl = gsap.timeline({ defaults: { ease: EASE } });
  tl.from(chars, { yPercent: 40, opacity: 0, duration: 0.9, stagger: 0.035 })
    .from(words, { y: 8, opacity: 0, duration: 0.7, stagger: 0.03 }, 0.2);
}

document.addEventListener('astro:page-load', initHero);

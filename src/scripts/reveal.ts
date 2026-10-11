import { gsap, ScrollTrigger, reducedMotion } from './motion';

// Opens an image in a few horizontal bands, each sweeping left to right like a flat brush.
const BANDS = 4;
const STAGGER = 0.14; // fraction of the timeline between bands
const DURATION = 0.75;
const ease = gsap.parseEase('power3.out');

function clipFor(progress: number[]) {
  const points: string[] = ['0% 0%'];
  progress.forEach((p, i) => {
    const top = (i / BANDS) * 100;
    const bottom = ((i + 1) / BANDS) * 100;
    points.push(`${p}% ${top}%`, `${p}% ${bottom}%`);
  });
  points.push('0% 100%');
  return `polygon(${points.join(', ')})`;
}

function reveal(img: HTMLImageElement) {
  const state = { t: 0 };
  const span = 1 + STAGGER * (BANDS - 1);
  gsap.to(state, {
    t: 1,
    duration: DURATION,
    ease: 'none',
    onUpdate() {
      const progress = Array.from({ length: BANDS }, (_, i) => {
        const local = Math.min(1, Math.max(0, (state.t * span - i * STAGGER) / 1));
        return ease(local) * 100;
      });
      img.style.clipPath = clipFor(progress);
    },
    onComplete() {
      img.style.clipPath = '';
    },
  });
}

function initReveal() {
  if (reducedMotion()) return;
  const images = document.querySelectorAll<HTMLImageElement>('img[data-reveal]:not([data-revealed])');
  for (const img of images) {
    img.dataset.revealed = 'true';
    // Anything already on screen (or eager, like the hero) is shown as is: art never waits.
    const rect = img.getBoundingClientRect();
    if (img.loading === 'eager' || rect.top < window.innerHeight) continue;
    img.style.clipPath = clipFor(Array(BANDS).fill(0));
    ScrollTrigger.create({
      trigger: img,
      start: 'top 92%',
      once: true,
      onEnter: () => reveal(img),
    });
  }
}

document.addEventListener('astro:page-load', initReveal);

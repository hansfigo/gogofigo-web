import { gsap, ScrollTrigger, reducedMotion } from './motion';

// Images arrive behind a grid of background-coloured squares that shrink away
// corner to corner, like blocks clearing (NieR) or a square flat brush lifting.
const COLS = 6;
const DURATION = 0.45;
const SPREAD = 0.55; // seconds between the first and last tile starting

function cover(frame: HTMLElement, img: HTMLImageElement) {
  const ratio = img.height && img.width ? img.height / img.width : 1.25;
  const rows = Math.max(2, Math.round(COLS * ratio));
  const grid = document.createElement('div');
  grid.className = 'tile-cover';
  grid.setAttribute('aria-hidden', 'true');
  grid.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  for (let i = 0; i < COLS * rows; i++) grid.append(document.createElement('i'));
  frame.append(grid);
  return { grid, rows };
}

function initReveal() {
  if (reducedMotion()) return;
  const images = document.querySelectorAll<HTMLImageElement>('img[data-reveal]:not([data-revealed])');
  for (const img of images) {
    img.dataset.revealed = 'true';
    const frame = img.closest<HTMLElement>('[data-reveal-frame]');
    // Anything already on screen (or eager) is shown as is: art never waits.
    if (!frame || img.loading === 'eager' || img.getBoundingClientRect().top < window.innerHeight) continue;

    const { grid, rows } = cover(frame, img);
    const tiles = grid.children;
    ScrollTrigger.create({
      trigger: frame,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(tiles, {
          scale: 0,
          duration: DURATION,
          ease: 'power2.inOut',
          stagger: { grid: [rows, COLS], from: 'start', amount: SPREAD },
          onComplete: () => grid.remove(),
        }),
    });
  }
}

document.addEventListener('astro:page-load', initReveal);

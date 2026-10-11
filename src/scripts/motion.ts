import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Soft, Apple-like deceleration. Never bouncy.
export const EASE = 'expo.out';
export const EASE_SOFT = 'power3.out';

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The client router swaps the DOM; drop triggers that point at the old page.
document.addEventListener('astro:before-swap', () => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
});

export { gsap, ScrollTrigger };

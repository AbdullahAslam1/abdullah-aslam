// Shared GSAP setup for all React islands.
// In Astro each island is an isolated JS module — we need to ensure
// ScrollTrigger is registered in every island that uses it.
// gsap.registerPlugin is idempotent so calling it multiple times is safe.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

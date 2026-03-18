// ── RAF throttle ─────────────────────────────────────────────
export function throttleRAF(fn) {
  let rafId = null;
  return function (...args) {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      fn.apply(this, args);
      rafId = null;
    });
  };
}

// ── Debounce ──────────────────────────────────────────────────
export function debounce(fn, ms = 100) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

// ── Clamp ─────────────────────────────────────────────────────
export const clamp = (min, val, max) => Math.min(Math.max(val, min), max);

// ── Map range ─────────────────────────────────────────────────
export const mapRange = (in_min, in_max, out_min, out_max, val) =>
  ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

// ── Lerp ──────────────────────────────────────────────────────
export const lerp = (a, b, t) => a + (b - a) * t;

// ── Get mouse position normalised to -1 .. +1 ─────────────────
export function getNormalisedMouse(e) {
  return {
    x: (e.clientX / window.innerWidth)  * 2 - 1,
    y: (e.clientY / window.innerHeight) * 2 - 1,
  };
}

// ── Intersection Observer factory ─────────────────────────────
export function createRevealObserver(options = {}) {
  const config = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.12,
    ...options,
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, config);

  return io;
}

// ── Prefers reduced motion ─────────────────────────────────────
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Split text into spans for GSAP ────────────────────────────
export function splitWords(el) {
  const text = el.textContent.trim();
  el.textContent = '';
  el.style.overflow = 'hidden';
  return text.split(' ').map((word) => {
    const span = document.createElement('span');
    span.textContent = word + '\u00A0';
    span.style.display = 'inline-block';
    span.style.overflow = 'hidden';
    el.appendChild(span);
    return span;
  });
}

// ── Format number with leading zero ───────────────────────────
export const padNumber = (n) => String(n).padStart(2, '0');

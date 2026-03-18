// In Astro, Lenis is initialised once in index.astro <script>
// and stored on window.__lenis so all React islands can access it.
// This hook is kept for API compatibility — it is a no-op here.

export function getLenis() {
  if (typeof window === 'undefined') return null;
  return window.__lenis ?? null;
}

export default function useLenis() {
  // No-op — Lenis is managed by the Astro page script
}

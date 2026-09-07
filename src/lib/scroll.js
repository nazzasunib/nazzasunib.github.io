/* Single place that knows how to move the page.
   App registers the Lenis instance here on mount; every in-page anchor
   goes through scrollToId so we never run two scroll animations at once.
   Lenis drives window scroll itself, so `overflow: hidden` alone does not
   stop it — anything that locks the page must call pauseScroll too. */
let lenis = null;

export function registerLenis(instance) {
  lenis = instance;
}

export function scrollToId(id, offset = -72) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function pauseScroll() {
  lenis?.stop();
}

export function resumeScroll() {
  lenis?.start();
}

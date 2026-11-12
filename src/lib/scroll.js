/* Single place that knows how to move the page.
   App registers the Lenis instance here on mount; every in-page anchor
   goes through scrollToId so we never run two scroll animations at once.
   Lenis drives window scroll itself, so `overflow: hidden` alone does not
   stop it — anything that locks the page must call pauseScroll too. */
let lenis = null;

export function registerLenis(instance) {
  lenis = instance;
}

/* sections can live behind a door that has not been opened yet; the door
   hall registers a handler that opens the right door and then scrolls */
let doorOpener = null;
export function registerDoorOpener(fn) {
  doorOpener = fn;
}

export function scrollToId(id, offset = -72) {
  const el = document.getElementById(id);
  if (!el) {
    if (doorOpener) doorOpener(id);
    return;
  }
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

/* jump without animating — used behind a full-screen transition */
export function jumpToId(id, offset = -72) {
  const el = document.getElementById(id);
  if (!el) {
    if (doorOpener) doorOpener(id);
    return;
  }
  if (lenis) lenis.scrollTo(el, { offset, immediate: true, force: true });
  else window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + offset);
}

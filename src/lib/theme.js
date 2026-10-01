import { useEffect, useState } from 'react';

/* Theme lives on <html data-mode="light">; no attribute means dark.
   index.html applies the saved choice before first paint. */
const KEY = 'nis-mode';
const root = () => document.documentElement;

export const isLight = () => root().getAttribute('data-mode') === 'light';

export function setMode(mode) {
  if (mode === 'light') root().setAttribute('data-mode', 'light');
  else root().removeAttribute('data-mode');
  try {
    localStorage.setItem(KEY, mode);
  } catch {
    /* private window — the choice just won't persist */
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', mode === 'light' ? '#F5F4F0' : '#06070A');
}

/* Calls `cb` whenever the mode attribute flips. Returns an unsubscribe. */
export function onThemeChange(cb) {
  const mo = new MutationObserver(cb);
  mo.observe(root(), { attributes: true, attributeFilter: ['data-mode'] });
  return () => mo.disconnect();
}

/* Read a token from :root — canvases use this to pick up theme colours. */
export const token = (name) => getComputedStyle(root()).getPropertyValue(name).trim();

export function useTheme() {
  const [light, setLight] = useState(() => typeof document !== 'undefined' && isLight());
  useEffect(() => onThemeChange(() => setLight(isLight())), []);
  const toggle = () => setMode(isLight() ? 'dark' : 'light');
  return { light, toggle };
}

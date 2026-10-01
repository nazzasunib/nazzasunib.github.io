import { useEffect, useRef } from 'react';
import { onThemeChange, token } from '../../lib/theme';

/* Shared canvas driver for every animated figure on the page.

   - sizes the backing store to the element × devicePixelRatio (capped at 2)
   - runs the frame loop only while the canvas is on screen
   - draws a single still frame for visitors who prefer reduced motion
   - re-reads theme colours whenever light/dark flips

   `setup({ W, H, colors })` runs on every resize and returns per-size state.
   `frame(ctx, { W, H, t, dt, state, colors, running })` paints one frame. */
export default function useCanvas({ colors: colorTokens = [], setup, frame }) {
  const ref = useRef(null);
  const api = useRef({ setup, frame });
  api.current = { setup, frame };

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return undefined;
    const ctx = cv.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0;
    let H = 0;
    let state = null;
    let raf = 0;
    let running = false;
    let last = performance.now();
    const t0 = last;

    const readColors = () =>
      Object.fromEntries(colorTokens.map((n) => [n, token(n)]));
    let colors = readColors();

    const paint = (now) => {
      const dt = Math.min(64, now - last);
      last = now;
      ctx.clearRect(0, 0, W, H);
      api.current.frame(ctx, { W, H, t: (now - t0) / 1000, dt, state, colors, running });
    };

    const loop = (now) => {
      paint(now);
      if (running) raf = requestAnimationFrame(loop);
    };

    const size = () => {
      const r = cv.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      const d = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * d);
      cv.height = Math.round(H * d);
      ctx.setTransform(d, 0, 0, d, 0, 0);
      state = api.current.setup ? api.current.setup({ W, H, colors }) : null;
      if (!running) paint(performance.now());
    };

    const ro = new ResizeObserver(size);
    ro.observe(cv);
    size();

    const io = new IntersectionObserver(
      (es) => {
        const on = es.some((e) => e.isIntersecting);
        if (on && !running && !reduced) {
          running = true;
          last = performance.now();
          raf = requestAnimationFrame(loop);
        } else if (!on && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(cv);

    const offTheme = onThemeChange(() => {
      colors = readColors();
      if (state && state.onTheme) state.onTheme(colors);
      if (!running) paint(performance.now());
    });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      offTheme();
    };
    // colour tokens are a static list per figure
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/* Points spread evenly over a unit sphere (Fibonacci lattice). */
export function fibSphere(n) {
  const pts = [];
  const g = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i += 1) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = g * i;
    pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
  }
  return pts;
}

/* Each point linked to its `k` nearest neighbours, de-duplicated. */
export function nearPairs(pts, k) {
  const seen = new Set();
  const out = [];
  pts.forEach((p, i) => {
    pts
      .map((q, j) => [j, (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2])
      .filter(([j]) => j !== i)
      .sort((a, b) => a[1] - b[1])
      .slice(0, k)
      .forEach(([j]) => {
        const key = i < j ? `${i}_${j}` : `${j}_${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          out.push([i, j]);
        }
      });
  });
  return out;
}

/* Rotate a point by yaw (ry) then pitch (rx). */
export function rot(p, cy, sy, cx, sx) {
  const x1 = p[0] * cy + p[2] * sy;
  const z1 = -p[0] * sy + p[2] * cy;
  const y1 = p[1] * cx - z1 * sx;
  const z2 = p[1] * sx + z1 * cx;
  return [x1, y1, z2];
}

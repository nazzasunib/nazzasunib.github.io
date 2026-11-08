import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks';
import './story.css';

/* =========================================================
   ChapterCut — the hand-off between two chapters.

   A basket-weave of tiles flips in diagonally as the band
   scrolls up, holds the chapter title, then flips away again
   so the next chapter is "uncovered" rather than cut to.
   Driven by one CSS variable (--p) per frame.
   ========================================================= */

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export default function ChapterCut({ n, title, kicker }) {
  const ref = useRef(null);
  const [grid, setGrid] = useState({ c: 14, r: 6 });
  const reduced = useReducedMotion();

  useEffect(() => {
    const on = () => setGrid(window.innerWidth < 720 ? { c: 6, r: 7 } : { c: 14, r: 6 });
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (reduced) {
      el.style.setProperty('--p', 0.42);
      return undefined;
    }
    let raf = 0;
    let cur = -1;
    const loop = () => {
      const r = el.getBoundingClientRect();
      if (r.bottom > -100 && r.top < window.innerHeight + 100) {
        const goal = clamp((window.innerHeight - r.top) / (window.innerHeight + r.height));
        cur = cur < 0 ? goal : cur + (goal - cur) * 0.18;
        el.style.setProperty('--p', cur.toFixed(4));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const tiles = [];
  for (let y = 0; y < grid.r; y += 1) {
    for (let x = 0; x < grid.c; x += 1) {
      const d = (x / grid.c) * 0.6 + (y / grid.r) * 0.4;
      tiles.push(
        <i key={`${x}-${y}`} className={(x + y) % 2 ? 'cc-w' : 'cc-h'} style={{ '--d': d.toFixed(3) }} />
      );
    }
  }

  return (
    <div className="cc" ref={ref} aria-label={`Chapter ${n}: ${title}`} role="separator">
      <div className="cc-tiles" style={{ gridTemplateColumns: `repeat(${grid.c}, 1fr)` }} aria-hidden="true">
        {tiles}
      </div>
      <div className="cc-label">
        <span className="cc-n mono" data-thread="center">
          Chapter {n}
        </span>
        <span className="cc-t" data-text={title}>
          {title}
        </span>
        {kicker && <span className="cc-k">{kicker}</span>}
      </div>
    </div>
  );
}

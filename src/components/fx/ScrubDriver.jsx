import { useEffect } from 'react';
import { useReducedMotion } from '../../hooks';

/* =========================================================
   ScrubDriver — every card group assembles with the scroll.

   Instead of fading in on a timer, the cards of each section
   are physically brought into place by the scroll, so moving
   down the page always transforms something:

     deal    cards start stacked in the middle of their group,
             fanned like a hand of cards, and are dealt out
     weave   rows slide in from alternate sides, like weft
             threads crossing the warp
     scatter cards start loose and tilted and settle into place
     split   two columns close in from opposite sides
     rise    a strip lifts up and straightens

   Scrolling back up plays it in reverse. Uses the individual
   translate / rotate / scale properties so it stacks on top
   of any transform the components already animate.
   ========================================================= */

const RULES = [
  ['.projects-grid:not(.projects-grid-sm)', 'deal'],
  ['.projects-grid-sm', 'scatter'],
  ['.events-grid', 'deal'],
  ['.ach-grid', 'deal'],
  ['.fp-scope', 'deal'],
  ['.feature-grid', 'weave'],
  ['.sk-rows', 'weave'],
  ['.social-grid', 'scatter'],
  ['.gh-panel', 'scatter'],
  ['.statstrip', 'rise'],
  ['.about-grid', 'split'],
  ['.contact-grid', 'split'],
  ['.cs-list', 'rise'],
  ['.now-list', 'weave'],
];

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => 1 - Math.pow(1 - t, 3);
/* stable pseudo-random per index */
const rnd = (i, k) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function absOffset(el) {
  let x = 0;
  let y = 0;
  let n = el;
  while (n) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent;
  }
  return { x, y };
}

export default function ScrubDriver() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    let groups = [];

    const collect = () => {
      groups = [];
      RULES.forEach(([sel, mode]) => {
        document.querySelectorAll(sel).forEach((box) => {
          const kids = [...box.children].filter((k) => k.offsetWidth);
          if (!kids.length) return;
          const bo = absOffset(box);
          const cx = bo.x + box.offsetWidth / 2;
          const cy = bo.y + box.offsetHeight / 2;
          const items = kids.map((el, i) => {
            const o = absOffset(el);
            return {
              el,
              i,
              dx: cx - (o.x + el.offsetWidth / 2),
              dy: cy - (o.y + el.offsetHeight / 2),
              r1: rnd(i, 1),
              r2: rnd(i, 2),
              r3: rnd(i, 3),
              last: -1,
            };
          });
          groups.push({ box, mode, items, n: items.length });
        });
      });
    };

    const apply = (g, p) => {
      const vw = window.innerWidth;
      const narrow = vw < 760;
      g.items.forEach((it) => {
        const lag = g.mode === 'deal' ? (g.n - 1 - it.i) * 0.07 : it.i * 0.06;
        const e = ease(clamp(p * 1.35 - lag));
        const k = Math.round(e * 1000) / 1000;
        if (k === it.last) return;
        it.last = k;
        const u = 1 - e;
        let tx = 0;
        let ty = 0;
        let rot = 0;
        let sc = 1;
        if (g.mode === 'deal') {
          const fan = (it.i - (g.n - 1) / 2) * 5;
          tx = it.dx * u;
          ty = it.dy * u + it.i * -6 * u;
          rot = fan * u;
          sc = 1 - 0.08 * u;
        } else if (g.mode === 'weave') {
          tx = (it.i % 2 ? 1 : -1) * (narrow ? 60 : 140) * u;
          rot = (it.i % 2 ? 1 : -1) * 2 * u;
        } else if (g.mode === 'scatter') {
          tx = (it.r1 - 0.5) * (narrow ? 120 : 260) * u;
          ty = (60 + it.r2 * 120) * u;
          rot = (it.r3 - 0.5) * 24 * u;
          sc = 1 - 0.12 * u;
        } else if (g.mode === 'split') {
          tx = (it.i % 2 ? 1 : -1) * (narrow ? 50 : 120) * u;
          ty = 30 * u;
        } else if (g.mode === 'rise') {
          ty = 80 * u;
          rot = (it.i % 2 ? 1 : -1) * 3 * u;
          sc = 1 - 0.06 * u;
        }
        it.el.style.translate = u < 0.001 ? '' : `${tx.toFixed(1)}px ${ty.toFixed(1)}px`;
        it.el.style.rotate = u < 0.001 ? '' : `${rot.toFixed(2)}deg`;
        it.el.style.scale = u < 0.001 ? '' : sc.toFixed(3);
      });
    };

    let raf = 0;
    const loop = () => {
      const vh = window.innerHeight;
      groups.forEach((g) => {
        const r = g.box.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        /* 0 when the group's top enters the bottom edge, 1 at 30% of the screen */
        apply(g, clamp((vh - r.top) / (vh * 0.7)));
      });
      raf = requestAnimationFrame(loop);
    };

    let t = 0;
    const recollect = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        groups.forEach((g) => g.items.forEach((it) => {
          it.el.style.translate = '';
          it.el.style.rotate = '';
          it.el.style.scale = '';
        }));
        collect();
      }, 150);
    };
    collect();
    raf = requestAnimationFrame(loop);
    window.addEventListener('resize', recollect);
    window.addEventListener('load', recollect);
    const ro = new ResizeObserver(recollect);
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener('resize', recollect);
      window.removeEventListener('load', recollect);
    };
  }, [reduced]);

  return null;
}

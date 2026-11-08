import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks';
import { onThemeChange, token } from '../lib/theme';
import './fx/story.css';

/* =========================================================
   FabricJourney — the textile process as one scroll scene.

   One object tells the whole story, in production order:
     fibre → spinning (yarn) → knitting (fabric) → dyeing →
     garment. The stage is pinned while the scroll scrubs the
     timeline, and scrolling back plays it in reverse.
   ========================================================= */

const STAGES = [
  { n: '01', k: 'Fibre', t: 'It starts as loose fibre.', d: 'Raw cotton: short, soft and going in every direction.' },
  { n: '02', k: 'Spinning', t: 'Spinning makes it yarn.', d: 'The fibres are drawn out and twisted into one strong, continuous strand.' },
  { n: '03', k: 'Knitting', t: 'Knitting makes it fabric.', d: 'Row by row, the yarn is looped into a stretchy knit structure.' },
  { n: '04', k: 'Dyeing', t: 'Dyeing gives it colour.', d: 'Dye and finishing set the shade and the hand-feel of the fabric.' },
  { n: '05', k: 'Garment', t: 'And it becomes a garment.', d: 'Cut, sewn and checked. This is the chain I trained in, end to end.' },
];
const EDGES = [0, 0.15, 0.36, 0.6, 0.79, 1];

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const span = (p, a, b) => clamp((p - a) / (b - a));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/* rect and tee outlines, same vertex count, in units of the fabric box */
const RECT = [[0.32, 0], [0.5, 0], [0.68, 0], [1, 0], [1, 0.15], [1, 0.3], [1, 0.4], [1, 1], [0, 1], [0, 0.4], [0, 0.3], [0, 0.15], [0, 0]];
const TEE = [[0.34, 0], [0.5, 0.09], [0.66, 0], [0.97, 0.05], [1.3, 0.27], [1.13, 0.43], [0.97, 0.33], [0.97, 1], [0.03, 1], [0.03, 0.33], [-0.13, 0.43], [-0.3, 0.27], [0.03, 0.05]];

function rgb(hex, fallback) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const mix = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const css = (c, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

export default function FabricJourney() {
  const sec = useRef(null);
  const canvas = useRef(null);
  const bar = useRef(null);
  const [stage, setStage] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const cv = canvas.current;
    const host = sec.current;
    if (!cv || !host) return undefined;
    const ctx = cv.getContext('2d');
    let W = 0;
    let H = 0;
    let dpr = 1;
    let colors = {};
    const readColors = () => {
      colors = {
        yarn: rgb(token('--ink2'), [200, 200, 200]),
        dim: rgb(token('--ink4'), [130, 130, 130]),
        a: rgb(token('--lg1'), [19, 239, 147]),
        b: rgb(token('--lg2'), [91, 140, 255]),
        c: rgb(token('--violet'), [150, 84, 255]),
      };
    };
    readColors();
    const off = onThemeChange(readColors);

    const size = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(cv);

    /* loose fibres, seeded once */
    const N = 240;
    const fib = Array.from({ length: N }, (_, i) => ({
      rx: Math.random() * 2 - 1,
      ry: Math.random() * 2 - 1,
      a: Math.random() * Math.PI,
      l: 0.5 + Math.random(),
      s: Math.random() * Math.PI * 2,
      i,
    }));

    const draw = (p, time) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const narrow = W < 860;
      const cx = narrow ? W * 0.5 : W * 0.66;
      const cy = narrow ? H * 0.36 : H * 0.5;
      const fw = Math.min(narrow ? W * 0.46 : W * 0.24, H * 0.42);
      const fh = fw * 1.18;
      const bx = cx - fw / 2;
      const by = cy - fh / 2;

      const spin = ease(span(p, 0.12, 0.33));
      const knit = span(p, 0.36, 0.58);
      const dye = ease(span(p, 0.6, 0.77));
      const tee = ease(span(p, 0.8, 0.95));
      const lift = ease(span(p, 0.95, 1));

      /* soft dye glow behind the cloth */
      if (dye > 0) {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, fw * 1.6);
        g.addColorStop(0, css(colors.a, 0.16 * dye));
        g.addColorStop(1, css(colors.b, 0));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      /* 1–2 · fibres drift, then get drawn into one yarn */
      const yarnFade = 1 - span(p, 0.4, 0.5);
      const yx0 = cx - fw * 0.95;
      const yx1 = cx + fw * 0.95;
      const yY = lerp(cy, by, ease(knit));
      if (yarnFade > 0) {
        ctx.lineCap = 'round';
        for (const f of fib) {
          const dx = Math.sin(time * 0.6 + f.s) * 6;
          const dy = Math.cos(time * 0.5 + f.s) * 6;
          const fx = cx + f.rx * fw * 1.15 + dx;
          const fy = cy + f.ry * fw * 0.95 + dy;
          const tx = lerp(yx0, yx1, f.i / (N - 1));
          const ty = yY + Math.sin(f.i * 0.9 + time * 4) * 3 * (1 - knit);
          const x = lerp(fx, tx, spin);
          const y = lerp(fy, ty, spin);
          const a = lerp(f.a + time * 0.2, 0.95, spin);
          const l = lerp(f.l * 12, 9, spin);
          ctx.strokeStyle = css(colors.yarn, (0.35 + 0.45 * spin) * yarnFade);
          ctx.lineWidth = lerp(1, 1.6, spin);
          ctx.beginPath();
          ctx.moveTo(x - Math.cos(a) * l * 0.5, y - Math.sin(a) * l * 0.5);
          ctx.quadraticCurveTo(x + Math.sin(f.s) * 3, y, x + Math.cos(a) * l * 0.5, y + Math.sin(a) * l * 0.5);
          ctx.stroke();
        }
        /* the spun yarn: a twisted cord with moving twist marks */
        const core = span(spin, 0.6, 1) * yarnFade;
        if (core > 0) {
          ctx.strokeStyle = css(colors.yarn, 0.9 * core);
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(yx0, yY);
          ctx.lineTo(yx1, yY);
          ctx.stroke();
          ctx.strokeStyle = css(colors.a, 0.85 * core);
          ctx.lineWidth = 1.4;
          const shift = (time * 26) % 9;
          for (let x = yx0 + shift; x < yx1; x += 9) {
            ctx.beginPath();
            ctx.moveTo(x - 2.5, yY - 3);
            ctx.lineTo(x + 2.5, yY + 3);
            ctx.stroke();
          }
        }
      }

      /* 3–5 · knit fabric, dyed, then shaped into a tee */
      if (knit > 0) {
        const poly = RECT.map((r, i) => [bx + lerp(r[0], TEE[i][0], tee) * fw, by + lerp(r[1], TEE[i][1], tee) * fh]);
        const float = Math.sin(time * 1.4) * 4 * tee;
        const sc = 1 + 0.06 * tee - 0.08 * lift;
        ctx.save();
        ctx.translate(cx, cy + float);
        ctx.scale(sc, sc);
        ctx.translate(-cx, -cy);

        ctx.save();
        ctx.beginPath();
        poly.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.closePath();
        ctx.clip();

        const R = 18;
        const sh = fh / R;
        const sw = sh * 1.05;
        const xs = bx - fw * 0.32;
        const xe = bx + fw * 1.32;
        const cols = Math.ceil((xe - xs) / sw);
        const rows = knit * R;
        const front = bx - 40 + (fw + 80) * dye;
        ctx.lineCap = 'round';
        ctx.lineWidth = Math.max(1.2, sw * 0.2);
        for (let r = 0; r < R; r += 1) {
          const rowDone = clamp(rows - r, 0, 1);
          if (rowDone <= 0) break;
          const y = by + r * sh;
          const colsShown = Math.ceil(cols * rowDone);
          for (let c = 0; c < colsShown; c += 1) {
            const x = xs + c * sw;
            const wob = Math.sin(r * 1.7 + time * 2) * 10;
            const dyed = clamp((front + wob - x) / 50, 0, 1) * (dye > 0 ? 1 : 0);
            const shade = mix(mix(colors.a, colors.b, r / R), colors.c, clamp((c / cols) * 0.6));
            const col = mix(colors.yarn, shade, dyed);
            ctx.strokeStyle = css(col, 0.95);
            ctx.beginPath();
            ctx.moveTo(x + sw * 0.08, y + sh * 0.05);
            ctx.quadraticCurveTo(x + sw * 0.22, y + sh * 1.0, x + sw * 0.5, y + sh * 0.95);
            ctx.quadraticCurveTo(x + sw * 0.78, y + sh * 1.0, x + sw * 0.92, y + sh * 0.05);
            ctx.stroke();
          }
        }
        ctx.restore();

        /* outline, then seams once it is a garment */
        ctx.strokeStyle = css(mix(colors.dim, colors.a, dye), 0.4 + 0.5 * tee);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        poly.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.closePath();
        ctx.stroke();
        if (tee > 0.4) {
          const s = span(tee, 0.4, 1);
          ctx.setLineDash([5, 5]);
          ctx.strokeStyle = css([255, 255, 255], 0.55 * s);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(poly[9][0] + 6, poly[9][1]);
          ctx.lineTo(poly[9][0] + 6, poly[8][1] - 6);
          ctx.moveTo(poly[6][0] - 6, poly[6][1]);
          ctx.lineTo(poly[6][0] - 6, poly[7][1] - 6);
          ctx.moveTo(poly[8][0] + 6, poly[8][1] - 9);
          ctx.lineTo(poly[7][0] - 6, poly[7][1] - 9);
          ctx.stroke();
          ctx.setLineDash([]);
          /* little care label */
          ctx.fillStyle = css([255, 255, 255], 0.85 * s);
          ctx.fillRect(poly[1][0] - 7, poly[1][1] + 6, 14, 9);
        }
        ctx.restore();
      }
    };

    let cur = 0;
    let raf = 0;
    let last = performance.now();
    let shown = -1;
    const target = () => {
      const r = host.getBoundingClientRect();
      return clamp(-r.top / Math.max(1, r.height - window.innerHeight));
    };
    const loop = (now) => {
      const dt = Math.min(0.064, (now - last) / 1000);
      last = now;
      const r = host.getBoundingClientRect();
      if (r.bottom > -50 && r.top < window.innerHeight + 50) {
        const goal = reduced ? 1 : target();
        cur += (goal - cur) * (reduced ? 1 : 1 - Math.exp(-dt / 0.12));
        draw(cur, now / 1000);
        if (bar.current) bar.current.style.transform = `scaleX(${cur.toFixed(4)})`;
        let st = 0;
        for (let i = 0; i < STAGES.length; i += 1) if (cur >= EDGES[i] - 0.001) st = i;
        if (st !== shown) {
          shown = st;
          setStage(st);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      off();
    };
  }, [reduced]);

  const s = STAGES[stage];
  return (
    <section className={`fj ${reduced ? 'fj-still' : ''}`} ref={sec} id="journey" aria-label="From fibre to garment">
      <div className="fj-stage">
        <canvas className="fj-canvas" ref={canvas} aria-hidden="true" />
        <div className="container fj-copy">
          <span className="eyebrow" data-thread>
            The craft · fibre to garment
          </span>
          <div className="fj-now" key={stage}>
            <span className="fj-n mono">{s.n} / 05</span>
            <h3 className="fj-t">{s.t}</h3>
            <p className="fj-d">{s.d}</p>
          </div>
          <ol className="fj-steps">
            {STAGES.map((x, i) => (
              <li key={x.k} className={i === stage ? 'is-on' : i < stage ? 'is-done' : ''}>
                <span className="mono">{x.n}</span>
                {x.k}
              </li>
            ))}
          </ol>
          <span className="fj-bar" aria-hidden="true">
            <i ref={bar} />
          </span>
        </div>
      </div>
    </section>
  );
}

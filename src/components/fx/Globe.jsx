import { useEffect, useRef, useState } from 'react';
import './fx.css';
import useCanvas, { fibSphere, nearPairs, rot } from './useCanvas';

const PTS = fibSphere(230);
const LINKS = nearPairs(PTS, 3);

/* Wireframe globe: 230 points on a sphere, each wired to its three nearest
   neighbours. It turns slowly, leans toward the pointer, and every ~0.9s a
   pulse ripples out from a random point, lighting nodes as it passes. */
export default function Globe({ stages = [], caption, className = '' }) {
  const wrap = useRef(null);
  const lean = useRef({ tx: 0, ty: 0 });
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (stages.length < 2) return undefined;
    const id = setInterval(() => setStage((s) => (s + 1) % stages.length), 2400);
    return () => clearInterval(id);
  }, [stages.length]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return undefined;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      lean.current.tx = (e.clientX - r.left) / r.width - 0.5;
      lean.current.ty = (e.clientY - r.top) / r.height - 0.5;
    };
    const leave = () => {
      lean.current.tx = 0;
      lean.current.ty = 0;
    };
    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, []);

  const ref = useCanvas({
    colors: ['--fx-globe'],
    setup: () => ({ ry: 0, rx: 0.32, pulses: [], phase: 0 }),
    frame: (ctx, { W, H, t, dt, state: s, colors, running }) => {
      const c = colors['--fx-globe'] || '19,239,147';
      const now = t * 1000;
      if (running) {
        const k = dt / 16.7;
        s.ry += 0.0045 * k + lean.current.tx * 0.004 * k;
        s.rx += (0.32 + lean.current.ty * 0.5 - s.rx) * 0.05;
        if (now - s.phase > 900) {
          s.phase = now;
          s.pulses.push({ i: Math.floor(Math.random() * PTS.length), t: 0 });
          if (s.pulses.length > 4) s.pulses.shift();
        }
        s.pulses.forEach((p) => {
          p.t += 0.022 * k;
        });
      }
      const cy = Math.cos(s.ry);
      const sy = Math.sin(s.ry);
      const cx = Math.cos(s.rx);
      const sx = Math.sin(s.rx);
      const ox = W / 2;
      const oy = H / 2;
      const R = Math.min(W, H) * 0.36 * (1 + 0.03 * Math.sin(t * 2.1));

      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, R * 1.5);
      g.addColorStop(0, `rgba(${c},.2)`);
      g.addColorStop(1, `rgba(${c},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      const Q = PTS.map((p) => rot(p, cy, sy, cx, sx));
      const hot = PTS.map((p) => {
        let h = 0;
        s.pulses.forEach((pl) => {
          const o = PTS[pl.i];
          const a = Math.acos(Math.max(-1, Math.min(1, p[0] * o[0] + p[1] * o[1] + p[2] * o[2])));
          const d = Math.abs(a - pl.t * 2.4);
          if (d < 0.22) h = Math.max(h, 1 - d / 0.22);
        });
        return h;
      });
      const sc = (z) => 1 / (1 - z * 0.3);

      ctx.lineWidth = 1;
      LINKS.forEach(([i, j]) => {
        const a = Q[i];
        const b = Q[j];
        const z = (a[2] + b[2]) / 2;
        const al = 0.05 + (0.3 * (z + 1)) / 2 + Math.max(hot[i], hot[j]) * 0.5;
        ctx.strokeStyle = `rgba(${c},${al.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(ox + a[0] * R * sc(a[2]), oy + a[1] * R * sc(a[2]));
        ctx.lineTo(ox + b[0] * R * sc(b[2]), oy + b[1] * R * sc(b[2]));
        ctx.stroke();
      });

      Q.forEach((q, i) => {
        const z = q[2];
        const x = ox + q[0] * R * sc(z);
        const y = oy + q[1] * R * sc(z);
        const r = (0.9 + (z + 1) * 0.9) * (1 + hot[i] * 0.9);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 6.283);
        ctx.fillStyle = hot[i] > 0.35 ? `rgba(255,255,255,${(0.5 + hot[i] * 0.5).toFixed(3)})` : `rgba(${c},${(0.25 + (z + 1) * 0.35).toFixed(3)})`;
        ctx.fill();
      });
    },
  });

  return (
    <div className={`fx-panel fx-globe ${className}`} ref={wrap}>
      <canvas ref={ref} aria-hidden="true" />
      <div className="fx-cap">
        {stages.length > 0 && (
          <span className="fx-stage mono" key={stage}>
            {stages[stage]}
          </span>
        )}
        {caption && <span className="fx-note">{caption}</span>}
      </div>
    </div>
  );
}

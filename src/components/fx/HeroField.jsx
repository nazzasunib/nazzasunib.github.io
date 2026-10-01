import { useEffect, useRef } from 'react';
import useCanvas from './useCanvas';

/* Hero background: a slow drifting particle network.
   Nearby particles join with faint lines; every particle within 160px of
   the pointer draws a brighter line to it, so the field "reaches" for the
   cursor. The host section also gets --hx/--hy for the spotlight glow. */
const LINK = 110 * 110;
const REACH = 160 * 160;

export default function HeroField({ hostRef }) {
  const mouse = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const move = (e) => {
      const r = host.getBoundingClientRect();
      mouse.current.x = e.clientX - r.left;
      mouse.current.y = e.clientY - r.top;
      host.style.setProperty('--hx', `${mouse.current.x}px`);
      host.style.setProperty('--hy', `${mouse.current.y}px`);
    };
    const leave = () => {
      mouse.current.x = -999;
      mouse.current.y = -999;
    };
    host.addEventListener('pointermove', move, { passive: true });
    host.addEventListener('pointerleave', leave);
    return () => {
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerleave', leave);
    };
  }, [hostRef]);

  const ref = useCanvas({
    colors: ['--fx-dot', '--fx-cursor'],
    setup: ({ W, H }) => {
      const n = Math.round(Math.max(22, Math.min(74, W / 17)));
      return {
        P: Array.from({ length: n }, () => ({
          x: Math.random() * W,
          y: Math.random() * H * 0.92,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: 0.7 + Math.random() * 1.4,
        })),
      };
    },
    frame: (ctx, { W, H, dt, state, colors, running }) => {
      const P = state.P;
      const c = colors['--fx-dot'] || '19,239,147';
      const cb = colors['--fx-cursor'] || '91,140,255';
      const { x: mx, y: my } = mouse.current;
      const k = dt / 16.7;
      ctx.lineWidth = 1;
      for (let i = 0; i < P.length; i += 1) {
        const p = P[i];
        if (running) {
          p.x += p.vx * k;
          p.y += p.vy * k;
          if (p.x < 0) p.x = W;
          if (p.x > W) p.x = 0;
          if (p.y < 0) p.y = H * 0.92;
          if (p.y > H * 0.92) p.y = 0;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fillStyle = `rgba(${c},.55)`;
        ctx.fill();
        for (let j = i + 1; j < P.length; j += 1) {
          const q = P[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK) {
            ctx.strokeStyle = `rgba(${c},${(0.16 * (1 - d2 / LINK)).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        const mdx = p.x - mx;
        const mdy = p.y - my;
        const md = mdx * mdx + mdy * mdy;
        if (md < REACH) {
          ctx.strokeStyle = `rgba(${cb},${(0.55 * (1 - md / REACH)).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }
    },
  });

  return <canvas className="hx-cv" ref={ref} aria-hidden="true" />;
}

import { useEffect, useRef, useState } from 'react';
import './fx.css';
import useCanvas from './useCanvas';

/* Voice orb: a lit sphere standing inside two rings of light bars laid on
   a tilted floor. The rings turn in opposite directions and the bars rise
   and fall like a voice level. The figure alternates between two speakers;
   while "they" speak the outer ring swells, while "I" speak the inner one. */
const OUTER = 64;
const INNER = 44;

export default function VoiceOrb({ speakers = ['Visitor', 'Nazzas'], states = ['Listening', 'Replying'], note }) {
  const [turn, setTurn] = useState(0);
  const turnRef = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      turnRef.current = (turnRef.current + 1) % 2;
      setTurn(turnRef.current);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const ref = useCanvas({
    colors: ['--fx-bar', '--acc', '--fx-orb-a', '--fx-orb-b'],
    setup: () => ({ a: 0, b: 0, amp: [0, 0] }),
    frame: (ctx, { W, H, t, dt, state: s, colors, running }) => {
      const bar = colors['--fx-bar'] || '235,240,248';
      const acc = colors['--acc'] || '#13ef93';
      const k = dt / 16.7;
      if (running) {
        s.a += 0.0035 * k;
        s.b -= 0.005 * k;
      }
      const target = turnRef.current;
      s.amp[0] += ((target === 0 ? 1 : 0.35) - s.amp[0]) * 0.06;
      s.amp[1] += ((target === 1 ? 1 : 0.35) - s.amp[1]) * 0.06;

      const ox = W / 2;
      const oy = H * 0.56;
      const R1 = Math.min(W * 0.36, H * 0.8);
      const R2 = R1 * 0.66;
      const tilt = 0.34;
      const maxH = H * 0.26;

      /* floor glow */
      ctx.save();
      ctx.translate(ox, oy);
      ctx.scale(1, tilt);
      const fg = ctx.createRadialGradient(0, 0, R1 * 0.2, 0, 0, R1 * 1.08);
      fg.addColorStop(0, 'rgba(0,0,0,0)');
      fg.addColorStop(0.75, hexA(acc, 0.1));
      fg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = fg;
      ctx.beginPath();
      ctx.arc(0, 0, R1 * 1.08, 0, 6.283);
      ctx.fill();
      ctx.strokeStyle = hexA(acc, 0.35);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, R1 * 1.02, 0, 6.283);
      ctx.stroke();
      ctx.restore();

      const bars = [];
      const ring = (n, R, phase, amp, seed) => {
        for (let i = 0; i < n; i += 1) {
          const a = (i / n) * 6.283 + phase;
          const depth = Math.sin(a);
          const wave =
            0.5 + 0.5 * Math.sin(t * 3.1 + i * 0.9 + seed) * Math.sin(t * 1.7 + i * 0.37 + seed * 2);
          const h = maxH * (0.18 + 0.82 * Math.abs(wave) * amp) * (0.75 + 0.25 * (depth + 1) * 0.5);
          bars.push({ x: ox + Math.cos(a) * R, y: oy + depth * R * tilt, h, depth });
        }
      };
      ring(OUTER, R1, s.a, s.amp[0], 0);
      ring(INNER, R2, s.b, s.amp[1], 3);
      bars.sort((p, q) => p.depth - q.depth);

      const drawBar = (b) => {
        const al = 0.25 + 0.6 * ((b.depth + 1) / 2);
        const g = ctx.createLinearGradient(b.x, b.y - b.h, b.x, b.y);
        g.addColorStop(0, `rgba(${bar},${al.toFixed(3)})`);
        g.addColorStop(1, `rgba(${bar},${(al * 0.15).toFixed(3)})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 2.6 + (b.depth + 1);
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x, b.y - b.h);
        ctx.stroke();
      };

      bars.filter((b) => b.depth < 0).forEach(drawBar);

      /* sphere */
      const SR = R2 * 0.44 * (1 + 0.02 * Math.sin(t * 2.4));
      const sx = ox;
      const sy = oy - SR * 0.8;
      ctx.save();
      ctx.translate(sx, sy + SR * 0.95);
      ctx.scale(1, 0.25);
      const sh = ctx.createRadialGradient(0, 0, 0, 0, 0, SR);
      sh.addColorStop(0, 'rgba(0,0,0,.35)');
      sh.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sh;
      ctx.beginPath();
      ctx.arc(0, 0, SR, 0, 6.283);
      ctx.fill();
      ctx.restore();
      const sg = ctx.createRadialGradient(sx - SR * 0.35, sy - SR * 0.4, SR * 0.05, sx, sy, SR);
      sg.addColorStop(0, colors['--fx-orb-a'] || '#fff');
      sg.addColorStop(1, colors['--fx-orb-b'] || '#6f7684');
      ctx.fillStyle = sg;
      ctx.beginPath();
      ctx.arc(sx, sy, SR, 0, 6.283);
      ctx.fill();

      bars.filter((b) => b.depth >= 0).forEach(drawBar);
    },
  });

  return (
    <div className="fx-panel fx-orb">
      <canvas ref={ref} aria-hidden="true" />
      <div className="fx-cap">
        <span className="fx-stage mono">
          {speakers[turn]} speaking · <b>{states[turn]}</b>
        </span>
        {note && <span className="fx-note">{note}</span>}
      </div>
    </div>
  );
}

/* '#13ef93' + alpha → rgba() */
function hexA(hex, a) {
  const h = String(hex).replace('#', '');
  if (h.length !== 6) return `rgba(19,239,147,${a})`;
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

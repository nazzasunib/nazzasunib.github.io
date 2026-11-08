import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks';
import './story.css';

/* =========================================================
   StoryThread — one thread stitched through the whole page.

   Every element marked [data-thread] is a stop. The thread runs
   from stop to stop as a smooth curve and is drawn in step with
   the scroll: the tip (a glowing needle) always sits at the
   middle of the screen, and every knot the needle has passed
   lights up. Stops marked data-thread="center" pull the thread
   into the middle of the page, which is how the chapter cuts
   catch it.
   ========================================================= */

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* layout position relative to the host, ignoring CSS transforms, so
   reveal animations in flight do not bend the thread */
function offsetIn(el, host) {
  let x = 0;
  let y = 0;
  let n = el;
  while (n && n !== host) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent;
  }
  return n === host ? { x, y } : null;
}

function buildPath(points) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    const dy = (b.y - a.y) * 0.5;
    d += ` C ${a.x} ${a.y + dy}, ${b.x} ${b.y - dy}, ${b.x} ${b.y}`;
  }
  return d;
}

export default function StoryThread({ hostRef }) {
  const pathRef = useRef(null);
  const glowRef = useRef(null);
  const needleRef = useRef(null);
  const knotRefs = useRef([]);
  const [geo, setGeo] = useState({ w: 0, h: 0, d: '', knots: [] });
  const reduced = useReducedMotion();

  /* measure the stops and rebuild the curve whenever the page reflows */
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = host.offsetWidth;
        const narrow = w < 720;
        const gutter = narrow ? 7 : 26;
        /* every side stop sits in one lane just left of the content column,
           so the thread never runs across text */
        const box = host.querySelector('.sec .container');
        const lane = Math.max(gutter, (box ? offsetIn(box, host)?.x ?? 0 : 0) - (narrow ? 9 : 24));
        const stops = [...host.querySelectorAll('[data-thread]')]
          .map((el) => {
            if (!el.offsetHeight) return null;
            const o = offsetIn(el, host);
            if (!o) return null;
            const y = o.y + el.offsetHeight / 2;
            const center = el.dataset.thread === 'center';
            const x = center ? w / 2 : lane;
            return { x, y, center };
          })
          .filter(Boolean)
          .sort((a, b) => a.y - b.y);
        if (stops.length < 2) return;
        const start = { x: lane, y: Math.max(0, stops[0].y - 260) };
        const end = { x: lane, y: host.offsetHeight - 40 };
        /* stay in the lane until just before a chapter, swing back right after */
        const raw = [start, ...stops, end];
        const pts = [raw[0]];
        for (let i = 1; i < raw.length; i += 1) {
          const a = raw[i - 1];
          const b = raw[i];
          if (!a.center && b.center && b.y - a.y > 520) pts.push({ x: a.x, y: b.y - 300, way: true });
          if (a.center && !b.center && b.y - a.y > 700) pts.push({ x: b.x, y: a.y + 300, way: true });
          pts.push(b);
        }
        setGeo({ w, h: host.offsetHeight, d: buildPath(pts), knots: stops });
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    window.addEventListener('load', measure);
    document.fonts?.ready?.then(measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('load', measure);
    };
  }, [hostRef]);

  /* draw the thread with the scroll */
  useEffect(() => {
    const path = pathRef.current;
    const host = hostRef.current;
    if (!path || !host || !geo.d) return undefined;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len} ${len}`;
    glowRef.current.style.strokeDasharray = `${len} ${len}`;

    /* length along the path for each knot, sampled once */
    const samples = [];
    const step = Math.max(8, len / 1600);
    for (let s = 0; s <= len; s += step) samples.push([s, path.getPointAtLength(s).y]);
    const lenAtY = (y) => {
      let lo = 0;
      let hi = samples.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (samples[mid][1] < y) lo = mid + 1;
        else hi = mid;
      }
      return samples[lo][0];
    };
    const knotLen = geo.knots.map((k) => lenAtY(k.y));

    let cur = -1;
    let raf = 0;
    const render = () => {
      const hr = host.getBoundingClientRect();
      const target = reduced ? len : lenAtY(window.innerHeight * 0.55 - hr.top);
      cur = cur < 0 || reduced ? target : cur + (target - cur) * 0.16;
      const off = len - cur;
      path.style.strokeDashoffset = off;
      glowRef.current.style.strokeDashoffset = off;
      const pt = path.getPointAtLength(clamp(cur, 0, len));
      needleRef.current.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
      needleRef.current.style.opacity = cur > 4 && cur < len - 4 ? 1 : 0;
      knotLen.forEach((kl, i) => {
        const el = knotRefs.current[i];
        if (el) el.classList.toggle('is-on', cur >= kl - 2);
      });
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [geo, hostRef, reduced]);

  if (!geo.d) return null;
  return (
    <svg
      className="thread"
      width={geo.w}
      height={geo.h}
      viewBox={`0 0 ${geo.w} ${geo.h}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="thread-g" x1="0" y1="0" x2="0" y2={geo.h} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--lg1)" />
          <stop offset="0.5" stopColor="var(--lg2)" />
          <stop offset="1" stopColor="var(--violet)" />
        </linearGradient>
      </defs>
      <path className="thread-ghost" d={geo.d} />
      <path ref={glowRef} className="thread-glow" d={geo.d} />
      <path ref={pathRef} className="thread-line" d={geo.d} />
      {geo.knots.map((k, i) => (
        <g
          key={`${Math.round(k.y)}-${i}`}
          className={`thread-knot ${k.center ? 'is-big' : ''}`}
          transform={`translate(${k.x} ${k.y})`}
          ref={(n) => {
            knotRefs.current[i] = n;
          }}
        >
          <circle className="tk-ring" r={k.center ? 11 : 7} />
          <circle className="tk-dot" r={k.center ? 4 : 3} />
        </g>
      ))}
      <g ref={needleRef} className="thread-needle">
        <circle r="14" className="tn-halo" />
        <circle r="4.5" className="tn-core" />
      </g>
    </svg>
  );
}

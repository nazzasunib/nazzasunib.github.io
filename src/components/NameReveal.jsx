import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PROFILE } from '../data/content';
import { useReducedMotion } from '../hooks';
import './namereveal.css';

/* =========================================================
   NameReveal — the opening scene, modelled on a scrubbed
   GSAP hero (sticky stage + one continuous scroll timeline).

     load    → the portrait fills the screen and a welcome
               headline slides up word by word. No name yet.
     scroll  → something moves on every tick, so it never
               feels stuck:
               (progress = share of the pinned distance)
               0.00–0.12  welcome text sinks and fades
               0.05–0.30  the name's outline draws itself in
               0.27–0.38  the photo leaves everywhere except
                          the letters: the photo becomes the name
               0.36–0.46  tagline rises under the name
               0.55–1.00  the hero slides up over the stage
               0.00–1.00  the photo keeps pushing in and drifting
     leave   → the section ends with a −100vh overlap, so the
               hero slides up over the last screen instead of
               the page waiting on an empty stage.

   Progress is smoothed with a 0.1 s catch-up (like scrub: 0.1),
   so the scene follows the scrollbar tightly. Scrolling back
   plays it in reverse.
   ========================================================= */

const IMG_W = 525;
const IMG_H = 700;
/* where the face sits in the photo (fraction of width / height) */
const FACE = { x: 0.5, y: 0.3 };

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const span = (p, a, b) => clamp((p - a) / (b - a));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

const WELCOME = ['Welcome', 'to', 'my', 'portfolio'];

function linesFor(width) {
  const words = PROFILE.name.toUpperCase().split(' ');
  if (width < 640) return [words[0], `${words[1]} ${words[2]}`, words.slice(3).join(' ')];
  return [`${words[0]} ${words[1]}`, words.slice(2).join(' ')];
}

export default function NameReveal() {
  const sec = useRef(null);
  const stage = useRef(null);
  const img = useRef(null);
  const frameMask = useRef(null);
  const veil = useRef(null);
  const textMask = useRef(null);
  const outline = useRef(null);
  const welcome = useRef(null);
  const tag = useRef(null);
  const cue = useRef(null);
  const fog = useRef(null);
  const measure = useRef([]);
  const reduced = useReducedMotion();

  const [box, setBox] = useState({ W: 1200, H: 800 });
  const [fs, setFs] = useState(100);
  const lines = linesFor(box.W);

  /* track the stage size */
  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return undefined;
    const on = () => {
      const r = el.getBoundingClientRect();
      setBox({ W: Math.round(r.width), H: Math.round(r.height) });
    };
    on();
    const ro = new ResizeObserver(on);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* fit the name: measure each line at 100px, then scale so the widest
     line spans ~90% of the stage and the block fits ~60% of its height */
  useLayoutEffect(() => {
    const fit = () => {
      const widths = measure.current.filter(Boolean).map((t) => t.getComputedTextLength());
      const widest = Math.max(1, ...widths);
      const byW = (100 * box.W * 0.9) / widest;
      const byH = (box.H * 0.6) / lines.length / 0.94;
      setFs(Math.max(24, Math.min(byW, byH)));
    };
    fit();
    if (document.fonts?.ready) document.fonts.ready.then(fit);
  }, [box.W, box.H, lines.length]);

  /* scroll timeline */
  useEffect(() => {
    const { W, H } = box;
    const cx = W / 2;
    const cy = H * 0.47;

    /* portrait covering the stage, face kept near the centre */
    const s = Math.max(W / IMG_W, H / IMG_H) * 1.06;
    const w1 = IMG_W * s;
    const h1 = IMG_H * s;
    const x1 = clamp(cx - FACE.x * w1, W - w1, 0);
    const y1 = clamp(cy - FACE.y * h1, H - h1, 0);

    frameMask.current?.setAttribute('width', W);
    frameMask.current?.setAttribute('height', H);
    veil.current?.setAttribute('width', W);
    veil.current?.setAttribute('height', H);

    /* each glyph's outline is roughly 4× the font size long */
    const dash = Math.round(fs * 4.2);
    outline.current?.setAttribute('stroke-dasharray', `${dash} ${dash}`);

    const render = (p) => {
      /* the photo never stops moving: slow push-in and lift */
      const zoom = lerp(1, 1.22, p);
      const lift = lerp(0, -0.08, p) * H;
      const iw = w1 * zoom;
      const ih = h1 * zoom;
      img.current?.setAttribute('x', x1 - (iw - w1) * FACE.x);
      img.current?.setAttribute('y', y1 - (ih - h1) * FACE.y + lift);
      img.current?.setAttribute('width', iw);
      img.current?.setAttribute('height', ih);

      /* welcome sinks and fades */
      const w = span(p, 0, 0.12);
      if (welcome.current) {
        welcome.current.style.opacity = (1 - w).toFixed(3);
        welcome.current.style.transform = `translateY(${(w * H * 0.16).toFixed(1)}px)`;
      }
      if (cue.current) cue.current.style.opacity = (1 - span(p, 0, 0.06)).toFixed(3);

      /* the name's outline draws itself in */
      const draw = easeOut(span(p, 0.05, 0.3));
      outline.current?.setAttribute('stroke-dashoffset', (dash * (1 - draw)).toFixed(1));
      outline.current?.setAttribute('opacity', (span(p, 0.04, 0.08) * lerp(1, 0.45, span(p, 0.32, 0.44))).toFixed(3));

      /* the photo condenses into the letters */
      const k = span(p, 0.27, 0.38);
      frameMask.current?.setAttribute('opacity', (1 - k).toFixed(3));
      textMask.current?.setAttribute('opacity', k.toFixed(3));
      veil.current?.setAttribute('opacity', (lerp(0.5, 0.62, span(p, 0.05, 0.27)) * (1 - k)).toFixed(3));

      /* the name block breathes very slightly as you scroll */
      const sc = lerp(1.03, 1, span(p, 0.05, 0.38)) * lerp(1, 0.95, span(p, 0.45, 1));
      const tf = `translate(${cx} ${cy}) scale(${sc.toFixed(4)}) translate(${-cx} ${-cy})`;
      textMask.current?.setAttribute('transform', tf);
      outline.current?.setAttribute('transform', tf);

      const t = span(p, 0.36, 0.46);
      if (tag.current) {
        tag.current.style.opacity = t.toFixed(3);
        tag.current.style.transform = `translateY(${lerp(22, 0, t).toFixed(1)}px)`;
      }
      if (fog.current) fog.current.style.opacity = (0.25 + 0.75 * span(p, 0.5, 0.9)).toFixed(3);
    };

    if (reduced) {
      render(0.5);
      return undefined;
    }

    /* progress across the whole section (start top → end top), smoothed
       with a 0.1 s exponential catch-up like GSAP's scrub: 0.1 */
    const target = () => {
      const el = sec.current;
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return clamp(-r.top / Math.max(1, r.height - window.innerHeight));
    };
    let cur = target();
    let raf = 0;
    let last = performance.now();
    render(cur);
    const loop = (now) => {
      const dt = Math.min(0.064, (now - last) / 1000);
      last = now;
      const goal = target();
      cur += (goal - cur) * (1 - Math.exp(-dt / 0.1));
      if (Math.abs(goal - cur) < 0.0002) cur = goal;
      render(cur);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [box, fs, lines.length, reduced]);

  const { W, H } = box;
  const lineH = fs * 0.94;
  const top = H * 0.47 - (lineH * lines.length) / 2;
  const baseline = (i) => top + lineH * i + fs * 0.78;

  const textNodes = (mode) =>
    lines.map((l, i) => (
      <text key={`${mode}-${l}`} x={W / 2} y={baseline(i)} fontSize={fs} className="nr-text" textAnchor="middle">
        {l}
      </text>
    ));

  return (
    <section className={`nr ${reduced ? 'nr-still' : ''}`} ref={sec} id="intro" aria-label={`Welcome — ${PROFILE.name}`}>
      <div className="nr-stage" ref={stage}>
        <span className="nr-wash" aria-hidden="true" />

        <svg className="nr-svg" viewBox={`0 0 ${W} ${H}`} width={W} height={H} aria-hidden="true">
          <defs>
            <mask id="nr-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
              <rect x="0" y="0" width={W} height={H} fill="black" />
              <rect ref={frameMask} x="0" y="0" fill="white" />
              <g ref={textMask} fill="white" opacity="0">
                {textNodes('mask')}
              </g>
            </mask>
          </defs>

          <image ref={img} href={PROFILE.portrait} preserveAspectRatio="xMidYMid slice" mask="url(#nr-mask)" />
          {/* soft wash over the full photo so the welcome and the outline read */}
          <rect ref={veil} className="nr-veil" x="0" y="0" />
          <g ref={outline} className="nr-outline" opacity="0">
            {textNodes('outline')}
          </g>
        </svg>

        {/* hidden copy at 100px used only to measure line widths */}
        <svg className="nr-measure" aria-hidden="true">
          {lines.map((l, i) => (
            <text
              key={`m-${l}`}
              ref={(n) => {
                measure.current[i] = n;
              }}
              fontSize="100"
              className="nr-text"
            >
              {l}
            </text>
          ))}
        </svg>

        {/* welcome — the first thing anyone sees */}
        <div className="nr-welcome" ref={welcome}>
          <h2 className="nr-title">
            {WELCOME.map((w, i) => (
              <span className="nr-clip" key={w}>
                <span className="nr-word" style={{ animationDelay: `${0.12 + i * 0.07}s` }}>
                  {w}
                </span>
              </span>
            ))}
          </h2>
          <p className="nr-sub">{PROFILE.tagline}</p>
        </div>

        <div className="nr-tag" ref={tag}>
          <span className="eyebrow">{PROFILE.badge.title}</span>
          <p className="mono">{PROFILE.tagline}</p>
        </div>

        <div className="nr-cue" ref={cue} aria-hidden="true">
          <span className="livedot">
            <i />
            Scroll
          </span>
          <span className="nr-cue-rail">
            <i />
          </span>
        </div>

        <span className="nr-fog" ref={fog} aria-hidden="true" />
      </div>
    </section>
  );
}

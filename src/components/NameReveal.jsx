import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useScroll } from 'framer-motion';
import { PROFILE } from '../data/content';
import { useReducedMotion } from '../hooks';
import './namereveal.css';

/* =========================================================
   NameReveal — a pinned, scroll-driven opener.

   The section is several screens tall and its stage sticks to the
   viewport. One SVG holds the portrait and a mask made of the name:

     start   → the portrait sits in a tall rounded frame
     scroll  → the frame grows to cover the screen while the mask
               crossfades from "frame" to "letters of the name", so
               the photo condenses into the name itself
     hold    → photo-filled name, an outline traces the letters, the
               tagline rises in
     leave   → the stage softens and a fog fades it into the hero

   Every value is derived from scroll progress, so scrolling back
   plays it in reverse.
   ========================================================= */

const IMG_W = 525;
const IMG_H = 700;
/* where the face sits in the photo (fraction of width / height) */
const FACE = { x: 0.5, y: 0.3 };

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const span = (p, a, b) => clamp((p - a) / (b - a));

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
  const frameEdge = useRef(null);
  const textMask = useRef(null);
  const outline = useRef(null);
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
     line spans ~90% of the stage and the block fits ~62% of its height */
  useLayoutEffect(() => {
    const fit = () => {
      const widths = measure.current.filter(Boolean).map((t) => t.getComputedTextLength());
      const widest = Math.max(1, ...widths);
      const byW = (100 * box.W * 0.9) / widest;
      const byH = (box.H * 0.6) / lines.length / 0.9;
      setFs(Math.max(24, Math.min(byW, byH)));
    };
    fit();
    if (document.fonts?.ready) document.fonts.ready.then(fit);
  }, [box.W, box.H, lines.length]);

  const { scrollYProgress } = useScroll({ target: sec, offset: ['start start', 'end end'] });

  /* drive every layer from progress */
  useEffect(() => {
    const { W, H } = box;
    const lineH = fs * 0.94;
    const blockH = lineH * lines.length;
    const cx = W / 2;
    const cy = H * 0.47;

    /* framed portrait */
    let h0 = H * 0.7;
    let w0 = h0 * (IMG_W / IMG_H);
    if (w0 > W * 0.78) {
      w0 = W * 0.78;
      h0 = w0 / (IMG_W / IMG_H);
    }
    const x0 = (W - w0) / 2;
    const y0 = (H - h0) / 2;

    /* portrait covering the stage, face kept near the centre */
    const s = Math.max(W / IMG_W, H / IMG_H) * 1.08;
    const w1 = IMG_W * s;
    const h1 = IMG_H * s;
    const x1 = clamp(cx - FACE.x * w1, W - w1, 0);
    const y1 = clamp(cy - FACE.y * h1, H - h1, 0);

    const render = (pRaw) => {
      const p = reduced ? 0.7 : pRaw;
      const k = ease(span(p, 0.08, 0.5)); // frame → letters
      const hold = span(p, 0.52, 0.66); // outline + tagline
      const out = ease(span(p, 0.82, 1)); // hand-off to the hero

      const ix = lerp(x0, x1, k);
      const iy = lerp(y0, y1, k);
      const iw = lerp(w0, w1, k);
      const ih = lerp(h0, h1, k);
      img.current?.setAttribute('x', ix);
      img.current?.setAttribute('y', iy);
      img.current?.setAttribute('width', iw);
      img.current?.setAttribute('height', ih);

      /* the frame mask grows with the photo and fades as the letters take over */
      for (const r of [frameMask.current, frameEdge.current]) {
        if (!r) continue;
        r.setAttribute('x', ix);
        r.setAttribute('y', iy);
        r.setAttribute('width', iw);
        r.setAttribute('height', ih);
        r.setAttribute('rx', lerp(28, 0, k));
      }
      frameMask.current?.setAttribute('opacity', (1 - k).toFixed(3));
      frameEdge.current?.setAttribute('opacity', (0.9 * (1 - k * 1.6)).toFixed(3));

      /* letters zoom down from 1.6× while they fade in */
      const sc = lerp(1.6, 1, k) * lerp(1, 0.92, out);
      const tf = `translate(${cx} ${cy}) scale(${sc.toFixed(4)}) translate(${-cx} ${-cy})`;
      textMask.current?.setAttribute('transform', tf);
      textMask.current?.setAttribute('opacity', k.toFixed(3));
      outline.current?.setAttribute('transform', tf);
      outline.current?.setAttribute('opacity', (0.06 + 0.94 * hold).toFixed(3));

      if (tag.current) {
        tag.current.style.opacity = (hold * (1 - out)).toFixed(3);
        tag.current.style.transform = `translateY(${lerp(24, 0, hold)}px)`;
      }
      if (cue.current) cue.current.style.opacity = (1 - span(p, 0, 0.08)).toFixed(3);
      if (stage.current) {
        stage.current.style.setProperty('--out', out.toFixed(3));
      }
      if (fog.current) fog.current.style.opacity = (0.35 + 0.65 * out).toFixed(3);
    };

    render(scrollYProgress.get());
    return scrollYProgress.on('change', render);
  }, [box, fs, lines.length, scrollYProgress, reduced]);

  const { W, H } = box;
  const lineH = fs * 0.94;
  const top = H * 0.47 - (lineH * lines.length) / 2;
  const baseline = (i) => top + lineH * i + fs * 0.78;

  const textNodes = (mode) =>
    lines.map((l, i) => (
      <text
        key={`${mode}-${l}`}
        x={W / 2}
        y={baseline(i)}
        fontSize={fs}
        className="nr-text"
        textAnchor="middle"
      >
        {l}
      </text>
    ));

  return (
    <section className={`nr ${reduced ? 'nr-still' : ''}`} ref={sec} id="intro" aria-label={PROFILE.name}>
      <div className="nr-stage" ref={stage}>
        <span className="nr-wash" aria-hidden="true" />

        <svg className="nr-svg" viewBox={`0 0 ${W} ${H}`} width={W} height={H} aria-hidden="true">
          <defs>
            <mask id="nr-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
              <rect x="0" y="0" width={W} height={H} fill="black" />
              <rect ref={frameMask} fill="white" />
              <g ref={textMask} fill="white">
                {textNodes('mask')}
              </g>
            </mask>
          </defs>

          <image
            ref={img}
            href={PROFILE.portrait}
            preserveAspectRatio="xMidYMid slice"
            mask="url(#nr-mask)"
          />
          <rect ref={frameEdge} className="nr-edge" fill="none" />
          <g ref={outline} className="nr-outline">
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

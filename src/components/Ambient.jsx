import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring } from 'framer-motion';
import { useMedia, useReducedMotion } from '../hooks';
import { ICON_PATHS } from './ui/Icon';
import { scrollToTop } from '../lib/scroll';
import './ambient.css';

/* =========================================================
   ScrollProgress — dyed thread that fills across the top.
   ========================================================= */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 130, damping: 26, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX: width }} aria-hidden="true" />;
}

/* =========================================================
   Cursor — needle-eye ring that grows over interactives.
   ========================================================= */
export function Cursor() {
  const fine = useMedia('(pointer: fine)');
  const reduced = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 400, damping: 30, mass: 0.28 });
  const ry = useSpring(y, { stiffness: 400, damping: 30, mass: 0.28 });
  const [mode, setMode] = useState('idle');

  useEffect(() => {
    if (!fine || reduced) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target;
      if (t.closest('a, button, [role="button"], input, textarea, .cur-grow')) setMode('grow');
      else if (t.closest('.cur-drag')) setMode('drag');
      else setMode('idle');
    };
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
    };
  }, [fine, reduced, x, y]);

  /* Only suppress the native cursor while the custom one is actually
     mounted — otherwise reduced-motion or coarse-pointer visitors get a
     page with no pointer at all. */
  useEffect(() => {
    const on = fine && !reduced;
    document.documentElement.classList.toggle('has-custom-cursor', on);
    return () => document.documentElement.classList.remove('has-custom-cursor');
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  const size = mode === 'grow' ? 54 : mode === 'drag' ? 66 : 22;

  return (
    <>
      <motion.div
        className={`cursor-ring cursor-${mode}`}
        style={{ x: rx, y: ry }}
        animate={{ width: size, height: size }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        aria-hidden="true"
      >
        {mode === 'drag' && <span className="cursor-label mono">DRAG</span>}
      </motion.div>
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden="true" />
    </>
  );
}

/* =========================================================
   FloatingGlyphs — textile / business / tech marks drifting
   behind the content, parallaxed to the pointer.
   ========================================================= */
const GLYPH_SETS = [
  { tone: 'saffron', keys: ['shirt', 'roll', 'spool', 'needle', 'grid', 'cotton', 'weave', 'drop'] },
  { tone: 'vermilion', keys: ['trend', 'bars', 'compass', 'pulse'] },
  { tone: 'jade', keys: ['db', 'laptop', 'chip'] },
  { tone: 'iris', keys: ['spark', 'globe', 'code'] },
];

const FLAT = GLYPH_SETS.flatMap((set) => set.keys.map((k) => ({ key: k, tone: set.tone })));

function scatter(n) {
  const pts = [];
  for (let i = 0; i < n; i += 1) {
    const a = i * 137.508;
    const x = 4 + ((Math.sin(a * 0.017) + 1) / 2) * 92;
    const y = 3 + ((Math.cos(a * 0.023) + 1) / 2) * 94;
    pts.push([x, y]);
  }
  return pts;
}

export function FloatingGlyphs({ count = 28 }) {
  const layerRef = useRef(null);
  const reduced = useReducedMotion();
  const fine = useMedia('(pointer: fine)');
  const pts = useRef(scatter(count)).current;

  useEffect(() => {
    if (!fine || reduced) return;
    let raf;
    const state = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      state.tx = (e.clientX / window.innerWidth - 0.5) * 26;
      state.ty = (e.clientY / window.innerHeight - 0.5) * 26;
    };
    const loop = () => {
      state.x += (state.tx - state.x) * 0.055;
      state.y += (state.ty - state.y) * 0.055;
      if (layerRef.current) {
        layerRef.current.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    loop();
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced]);

  return (
    <div className="glyph-layer" ref={layerRef} aria-hidden="true">
      {pts.map((p, i) => {
        const g = FLAT[i % FLAT.length];
        const size = 20 + (i % 5) * 8;
        const float = 11 + (i % 7) * 2.4;
        const spin = 34 + (i % 6) * 15;
        const base = 0.07 + (i % 5) * 0.026;
        return (
          <span
            className={`glyph tone-${g.tone}`}
            key={i}
            style={{
              left: `${p[0]}%`,
              top: `${p[1]}%`,
              '--op-min': (base * 0.45).toFixed(3),
              '--op-max': (base * 2.2).toFixed(3),
              animationDuration: `${float}s, ${6 + (i % 4) * 1.7}s`,
              animationDelay: `${(i * 0.34) % 8}s, ${(i * 0.21) % 3}s`,
            }}
          >
            <span className="glyph-spin" style={{ animationDuration: `${spin}s` }}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                <path d={ICON_PATHS[g.key]} />
              </svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}

/* =========================================================
   BackToTop — appears past the hero.
   ========================================================= */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.9);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <motion.button
      className="to-top"
      onClick={scrollToTop}
      aria-label="Back to top"
      initial={false}
      animate={show ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 18 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      style={{ pointerEvents: show ? 'auto' : 'none' }}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </motion.button>
  );
}

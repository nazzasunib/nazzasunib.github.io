import { useEffect, useMemo, useRef, useState } from 'react';
import { pauseScroll, resumeScroll } from '../lib/scroll';

/* ---------- prefers-reduced-motion ---------- */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = (e) => setReduced(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/* ---------- typewriter cycling through phrases ---------- */
export function useTypewriter(words, { type = 62, erase = 32, hold = 1700 } = {}) {
  const [text, setText] = useState('');
  const state = useRef({ w: 0, c: 0, del: false });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return;
    }
    let timer;
    const tick = () => {
      const s = state.current;
      const current = words[s.w];
      if (!s.del) {
        s.c += 1;
        setText(current.slice(0, s.c));
        if (s.c >= current.length) {
          s.del = true;
          timer = setTimeout(tick, hold);
          return;
        }
      } else {
        s.c -= 1;
        setText(current.slice(0, s.c));
        if (s.c <= 0) {
          s.del = false;
          s.w = (s.w + 1) % words.length;
        }
      }
      timer = setTimeout(tick, s.del ? erase : type);
    };
    timer = setTimeout(tick, 420);
    return () => clearTimeout(timer);
  }, [words, type, erase, hold, reduced]);

  return text;
}

/* ---------- count-up when element enters view ---------- */
export function useCountUp(target, { duration = 1500, start = 0 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(start);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || done.current) return;
          done.current = true;
          const t0 = performance.now();
          const step = (now) => {
            const p = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(start + (target - start) * eased));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration, start]);

  return [ref, value];
}

/* ---------- which section is in view (nav highlighting) ---------- */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.6, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/* ---------- pointer position normalised to an element, for 3D tilt ---------- */
export function useTilt({ max = 9 } = {}) {
  const ref = useRef(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });
  const reduced = useReducedMotion();

  const handlers = useMemo(
    () => ({
      onMouseMove: (e) => {
        if (reduced || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        setT({
          rx: (0.5 - py) * max * 2,
          ry: (px - 0.5) * max * 2,
          gx: px * 100,
          gy: py * 100,
          on: true,
        });
      },
      onMouseLeave: () => setT({ rx: 0, ry: 0, gx: 50, gy: 50, on: false }),
    }),
    [max, reduced]
  );

  return [ref, t, handlers];
}

/* ---------- lock body scroll (modal, preloader) ---------- */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('no-scroll');
    pauseScroll();
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove('no-scroll');
      resumeScroll();
    };
  }, [locked]);
}

/* ---------- media query ---------- */
export function useMedia(query) {
  const [match, setMatch] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = (e) => setMatch(e.matches);
    setMatch(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

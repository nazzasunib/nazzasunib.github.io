import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { EVENTS } from '../data/content';
import { useReducedMotion, useScrollLock } from '../hooks';
import { Section, SectionHead, Stagger, staggerItem } from './ui/Primitives';
import Icon from './ui/Icon';
import './events.css';

const AUTOPLAY_MS = 3000;
const EASE = [0.22, 1, 0.36, 1];

/* Progressive image: the 20px inline preview paints immediately and the real
   file cross-fades over it once decoded, so a slot is never blank. A missing
   file falls back to a woven placeholder instead of a broken icon. */
function Shot({ shot, className = '', sizes, eager = false }) {
  const [state, setState] = useState('loading');
  const img = useRef(null);

  /* a cached image can finish decoding before React attaches onLoad */
  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth > 0) setState('ready');
  }, []);

  if (state === 'failed') {
    return (
      <div className={`shot-fallback ${className}`} role="img" aria-label={shot.alt}>
        <Icon name="grid" size={30} stroke={1} />
        <span className="mono">{shot.alt}</span>
      </div>
    );
  }

  return (
    <div className={`shot ${className}`}>
      {shot.blur && <img className="shot-blur" src={shot.blur} alt="" aria-hidden="true" />}
      <img
        ref={img}
        className={`shot-full ${state === 'ready' ? 'shot-in' : ''}`}
        src={encodeURI(shot.src)}
        srcSet={shot.srcSet}
        sizes={sizes}
        alt={shot.alt}
        decoding="async"
        fetchpriority={eager ? 'high' : 'auto'}
        loading={eager ? 'eager' : 'lazy'}
        onLoad={() => setState('ready')}
        onError={() => setState('failed')}
      />
    </div>
  );
}

/* Warm neighbouring frames so a slide change never waits on the network. */
function usePreload(photos, i) {
  useEffect(() => {
    const n = photos.length;
    [i + 1, i + 2, i - 1].forEach((k) => {
      const shot = photos[((k % n) + n) % n];
      const im = new Image();
      if (shot.srcSet) im.srcset = shot.srcSet;
      im.src = encodeURI(shot.src);
    });
  }, [photos, i]);
}

function Block({ block }) {
  if (block.t === 'h3') return <h3>{block.v}</h3>;
  if (block.t === 'ul') {
    return (
      <ul className="story-list">
        {block.v.map((li, i) => (
          <li key={i}>
            <Icon name="check" size={14} />
            <span dangerouslySetInnerHTML={{ __html: li }} />
          </li>
        ))}
      </ul>
    );
  }
  return <p dangerouslySetInnerHTML={{ __html: block.v }} />;
}

/* ---------------------------------------------------------------------------
   Filmstrip — one continuous pan rather than swapped-out pictures.

   All frames sit side by side on a single track translated by `-pos * 100%`,
   where `pos` is fractional: a wheel gesture or drag moves the strip in real
   time and a spring settles it onto a whole frame. `pos` is unbounded and
   counts upward forever; the frame rendered at slot k is chosen modulo the
   photo count, so the strip loops without ever jumping back to the start.
--------------------------------------------------------------------------- */

/* how many frames to keep mounted either side of the visible one */
const WINDOW = 2;

function Filmstrip({ photos, smooth }) {
  const n = photos.length;
  const [center, setCenter] = useState(0);

  /* re-render only when the nearest whole frame changes, not every pixel */
  useEffect(() => {
    const stop = smooth.on('change', (v) => {
      const c = Math.round(v);
      setCenter((prev) => (prev === c ? prev : c));
    });
    return stop;
  }, [smooth]);

  const x = useTransform(smooth, (v) => `${-v * 100}%`);

  const slots = [];
  for (let s = center - WINDOW; s <= center + WINDOW; s++) slots.push(s);

  return (
    <motion.div className="strip" style={{ x }}>
      {slots.map((slot) => {
        const shot = photos[((slot % n) + n) % n];
        return (
          <div
            className="frame"
            key={slot}
            style={{ left: `${slot * 100}%` }}
            aria-hidden={slot !== center}
          >
            <Shot
              shot={shot}
              sizes="(max-width: 620px) 100vw, min(880px, 92vw)"
              eager={slot === 0}
            />
          </div>
        );
      })}
    </motion.div>
  );
}

function EventModal({ event, onClose }) {
  const photos = event.photos;
  const n = photos.length;
  const reduced = useReducedMotion();
  const viewport = useRef(null);

  /* `pos` counts upward without bound; `i` is the wrapped index for the UI */
  const pos = useMotionValue(0);
  const smooth = useSpring(pos, { stiffness: 200, damping: 30, mass: 0.5 });
  const [slot, setSlot] = useState(0);
  const i = ((slot % n) + n) % n;

  const dragging = useRef(false);
  const interacted = useRef(0);

  const goToSlot = useCallback(
    (next) => {
      setSlot(next);
      if (reduced) {
        pos.jump(next);
        smooth.jump(next);
      } else {
        pos.set(next);
      }
    },
    [pos, smooth, reduced]
  );

  /* dots pick an absolute photo: travel the short way around the loop */
  const goToPhoto = useCallback(
    (target) => {
      const delta = ((target - i + n) % n);
      goToSlot(slot + (delta <= n / 2 ? delta : delta - n));
    },
    [i, n, slot, goToSlot]
  );

  const nudge = useCallback(
    (by) => {
      interacted.current = Date.now();
      goToSlot(slot + by);
    },
    [slot, goToSlot]
  );

  usePreload(photos, i);

  /* ---- autoplay every 3s, paused briefly after any manual interaction ---- */
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (reduced || paused) return;
    const t = setInterval(() => {
      /* let a fresh gesture breathe before the timer takes over again */
      if (Date.now() - interacted.current < AUTOPLAY_MS) return;
      setSlot((s) => {
        const next = s + 1;
        pos.set(next);
        return next;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [reduced, paused, pos]);

  /* ---- wheel / trackpad: scroll through the strip without clicking ---- */
  const accum = useRef(0);
  const idle = useRef(null);
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;

    const onWheel = (e) => {
      /* horizontal intent wins; a vertical wheel also drives the strip */
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!delta) return;
      e.preventDefault();
      e.stopPropagation();
      interacted.current = Date.now();

      accum.current += delta;
      const width = el.clientWidth || 1;
      const fraction = accum.current / (width * 0.85);
      /* the strip tracks the wheel live, then snaps when the gesture stops */
      pos.set(slot + fraction);

      clearTimeout(idle.current);
      idle.current = setTimeout(() => {
        const moved = Math.round(accum.current / (width * 0.85));
        accum.current = 0;
        if (moved !== 0) goToSlot(slot + moved);
        else pos.set(slot);
      }, 110);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      clearTimeout(idle.current);
    };
  }, [pos, slot, goToSlot]);

  /* ---- touch drag: same continuous feel on phones ---- */
  const touch = useRef({ x: 0, t: 0, active: false });
  const onTouchStart = (e) => {
    touch.current = { x: e.touches[0].clientX, t: Date.now(), active: true };
    dragging.current = true;
    interacted.current = Date.now();
  };
  const onTouchMove = (e) => {
    if (!touch.current.active) return;
    const width = viewport.current?.clientWidth || 1;
    const dx = e.touches[0].clientX - touch.current.x;
    pos.set(slot - dx / width);
  };
  const onTouchEnd = (e) => {
    if (!touch.current.active) return;
    touch.current.active = false;
    dragging.current = false;
    const width = viewport.current?.clientWidth || 1;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dt = Math.max(1, Date.now() - touch.current.t);
    const velocity = dx / dt; // px per ms
    /* a quick flick counts even when the finger barely travelled */
    const moved = Math.round(-dx / width - velocity * 0.35);
    interacted.current = Date.now();
    if (moved !== 0) goToSlot(slot + moved);
    else animate(pos, slot, { duration: 0.35, ease: EASE });
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nudge(1);
      if (e.key === 'ArrowLeft') nudge(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nudge, onClose]);

  useScrollLock(true);

  return (
    <motion.div
      className="modal-scrim"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="modal glass"
        role="dialog"
        aria-modal="true"
        aria-label={event.article.title}
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close event details">
          <Icon name="close" size={18} stroke={2.2} />
        </button>

        <div
          className="slideshow"
          ref={viewport}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Filmstrip photos={photos} smooth={smooth} />

          <div className="slide-nav">
            <button onClick={() => nudge(-1)} aria-label="Previous photo">
              <Icon name="chevLeft" size={18} stroke={2.2} />
            </button>
            <button onClick={() => nudge(1)} aria-label="Next photo">
              <Icon name="chevRight" size={18} stroke={2.2} />
            </button>
          </div>

          <span className="slide-count mono">
            {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </span>

          <span className="slide-scroll-hint mono" aria-hidden="true">
            <Icon name="chevLeft" size={12} stroke={2.4} />
            scroll or drag
            <Icon name="chevRight" size={12} stroke={2.4} />
          </span>
        </div>

        <div className="dots" aria-label="Choose event photo">
          {photos.map((p, k) => (
            <button
              key={p.src}
              className={`dot ${k === i ? 'dot-on' : ''}`}
              onClick={() => {
                interacted.current = Date.now();
                goToPhoto(k);
              }}
              aria-label={`Show photo ${k + 1}`}
              aria-current={k === i}
            >
              {k === i && !reduced && !paused && (
                <span className="dot-fill" style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />
              )}
            </button>
          ))}
        </div>

        <article className="story">
          <span className="eyebrow">{event.meta}</span>
          <h2>{event.article.title}</h2>
          {event.article.blocks.map((b, k) => (
            <Block block={b} key={k} />
          ))}
        </article>
      </motion.div>
    </motion.div>
  );
}

export default function Events() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <Section id="events" bloom="rose" bloomAt="left">
        <SectionHead
          index={8}
          eyebrow="Events"
          title="Moments from"
          accent="my events."
          sub="Seminars, fairs and campus programmes — open a card to read the full story."
        />

        <Stagger className="events-grid" stagger={0.1}>
          {EVENTS.map((ev) => (
            <motion.article className="event glass" key={ev.id} variants={staggerItem}>
              <button
                className="event-btn"
                onClick={() => setOpen(ev)}
                aria-label={`Open story: ${ev.name}`}
              >
                <div className="event-thumb">
                  <Shot
                    shot={{
                      src: ev.cover,
                      srcSet: ev.coverSrcSet,
                      blur: ev.coverBlur,
                      alt: `${ev.name} cover`,
                    }}
                    sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 400px"
                  />
                  <span className="event-thumb-veil" aria-hidden="true" />
                  <span className="event-badge mono">Story</span>
                </div>
                <div className="event-body">
                  <h4>{ev.name}</h4>
                  <span className="event-meta mono">{ev.meta}</span>
                  <p>{ev.blurb}</p>
                  <span className="event-hint">
                    Read the full story
                    <Icon name="arrowRight" size={15} />
                  </span>
                </div>
              </button>
            </motion.article>
          ))}

          <motion.div className="event event-slot" variants={staggerItem}>
            <Icon name="spark" size={26} stroke={1.3} />
            <h4>Next event goes here</h4>
            <p>
              Drop photos into <code>public/assets/</code>, run{' '}
              <code>node scripts/optimize-images.mjs</code> and add an entry to{' '}
              <code>src/data/content.js</code> — it renders with the same story layout.
            </p>
          </motion.div>
        </Stagger>
      </Section>

      <AnimatePresence>
        {open && <EventModal event={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  );
}

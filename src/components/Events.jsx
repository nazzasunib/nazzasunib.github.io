import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EVENTS } from '../data/content';
import { useScrollLock } from '../hooks';
import { Section, SectionHead, Stagger, staggerItem } from './ui/Primitives';
import Icon from './ui/Icon';
import './events.css';

/* Images live outside the bundle (public/GUB 2026/…). If one is missing
   the tile falls back to a woven placeholder instead of a broken icon. */
function Shot({ src, alt, className }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`shot-fallback ${className || ''}`} role="img" aria-label={alt}>
        <Icon name="grid" size={30} stroke={1} />
        <span className="mono">{alt}</span>
      </div>
    );
  }
  return (
    <img
      src={encodeURI(src)}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
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

function EventModal({ event, onClose }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const timer = useRef(null);
  const touch = useRef(0);
  const n = event.photos.length;

  const goTo = useCallback(
    (next, direction) => {
      setDir(direction ?? (next > i ? 1 : -1));
      setI(((next % n) + n) % n);
    },
    [i, n]
  );

  /* autoplay, reset whenever the slide changes by any route */
  useEffect(() => {
    timer.current = setInterval(() => {
      setDir(1);
      setI((v) => (v + 1) % n);
    }, 6500);
    return () => clearInterval(timer.current);
  }, [i, n]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goTo(i + 1, 1);
      if (e.key === 'ArrowLeft') goTo(i - 1, -1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [i, goTo, onClose]);

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
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close event details">
          <Icon name="close" size={18} stroke={2.2} />
        </button>

        <div
          className="slideshow"
          onTouchStart={(e) => {
            touch.current = e.changedTouches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const d = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(d) < 45) return;
            goTo(i + (d < 0 ? 1 : -1), d < 0 ? 1 : -1);
          }}
        >
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              className="slide"
              key={i}
              custom={dir}
              initial={{ opacity: 0, x: dir * 70, scale: 1.04 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: dir * -70, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Shot src={event.photos[i].src} alt={event.photos[i].alt} />
            </motion.div>
          </AnimatePresence>

          <div className="slide-nav">
            <button onClick={() => goTo(i - 1, -1)} aria-label="Previous photo">
              <Icon name="chevLeft" size={18} stroke={2.2} />
            </button>
            <button onClick={() => goTo(i + 1, 1)} aria-label="Next photo">
              <Icon name="chevRight" size={18} stroke={2.2} />
            </button>
          </div>

          <span className="slide-count mono">
            {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </span>
        </div>

        <div className="dots" aria-label="Choose event photo">
          {event.photos.map((p, k) => (
            <button
              key={p.src}
              className={`dot ${k === i ? 'dot-on' : ''}`}
              onClick={() => goTo(k)}
              aria-label={`Show photo ${k + 1}`}
              aria-current={k === i}
            />
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
                  <Shot src={ev.cover} alt={`${ev.name} cover`} />
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
              Drop photos into <code>public/&lt;Event Name&gt;/</code> and add an entry to{' '}
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

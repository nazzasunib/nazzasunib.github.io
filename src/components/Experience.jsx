import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { EXPERIENCE } from '../data/content';
import { useMedia, useReducedMotion, useScrollLock } from '../hooks';
import { scrollToId } from '../lib/scroll';
import { Section, SectionHead } from './ui/Primitives';
import Icon from './ui/Icon';
import './experience.css';

const TAG_ICON = {
  Work: 'trend',
  Industry: 'shirt',
  Leadership: 'users',
  Volunteer: 'spark',
  Events: 'chat',
  Academic: 'cap',
};

/* distinct tags, in the order they first appear */
const PIPE = [...new Set(EXPERIENCE.map((x) => x.tag))];

const TAG_CLASS = {
  Work: 'chip-acc',
  Industry: 'chip-acc',
  Leadership: 'chip-ok',
  Volunteer: 'chip-wait',
  Events: 'chip-stop',
  Academic: '',
};

function ExperienceModal({ item, onClose }) {
  useScrollLock(true);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const jump = (id) => {
    onClose();
    setTimeout(() => scrollToId(id), 350);
  };

  return createPortal(
    <motion.div
      className="pm-scrim"
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="pm glass"
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 26, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="pm-close" onClick={onClose} aria-label="Close details">
          <Icon name="close" size={18} stroke={2.2} />
        </button>
        <header className="pm-head">
          <span className="pm-logo">
            <Icon name={TAG_ICON[item.tag] || 'spark'} size={26} />
          </span>
          <div>
            <h3>{item.title}</h3>
            <p className="pm-tagline">{item.org}</p>
            <div className="proj-tags">
              <span className={`chip ${TAG_CLASS[item.tag] || ''}`}>{item.tag}</span>
            </div>
          </div>
        </header>
        <div className="pm-body">
          <section>
            <h4 className="pm-h mono">Overview</h4>
            <p className="pm-p">{item.desc}</p>
          </section>
          {item.points && (
            <section>
              <h4 className="pm-h mono">What I did</h4>
              <ul className="pm-feats">
                {item.points.map((t) => (
                  <li key={t}>
                    <span className="pm-tick">
                      <Icon name="check" size={13} stroke={2.2} />
                    </span>
                    <div>
                      <span>{t}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {item.related && (
            <section>
              <h4 className="pm-h mono">Related</h4>
              <div className="pm-rel">
                {item.related.map((r) => (
                  <button key={r.id} className="btn btn-ghost" onClick={() => jump(r.id)}>
                    {r.label}
                    <Icon name="arrowRight" size={14} />
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function XpCard({ item, onOpen }) {
  return (
    <div
      className="xp-card glass card"
      role="button"
      tabIndex={0}
      aria-label={`${item.title}: view details`}
      onClick={() => onOpen(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(item);
        }
      }}
    >
      <span className={`xp-tag chip ${TAG_CLASS[item.tag] || ''}`}>{item.tag}</span>
      <h4>{item.title}</h4>
      <span className="xp-org mono">{item.org}</span>
      <p>{item.desc}</p>
      <span className="xp-more">
        Details
        <Icon name="arrowRight" size={13} />
      </span>
      <span className="xp-edge" aria-hidden="true" />
    </div>
  );
}

/* =========================================================
   XpRail — desktop: the section pins and the scroll turns
   into a sideways journey along one timeline. The thread
   becomes the rail; each role hangs above or below it.
   ========================================================= */
function XpRail({ onOpen }) {
  const host = useRef(null);
  const track = useRef(null);
  const fillRef = useRef(null);
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const t = track.current;
    if (!t) return undefined;
    const on = () => setDist(Math.max(0, t.scrollWidth - window.innerWidth + 80));
    on();
    const ro = new ResizeObserver(on);
    ro.observe(t);
    window.addEventListener('resize', on);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', on);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    let cur = 0;
    const loop = () => {
      const h = host.current;
      if (h) {
        const r = h.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          const goal = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
          cur += (goal - cur) * 0.14;
          track.current.style.transform = `translate3d(${(-cur * dist).toFixed(1)}px,0,0)`;
          fillRef.current.style.transform = `scaleX(${cur.toFixed(4)})`;
          const items = track.current.querySelectorAll('.xr-item');
          const mid = window.innerWidth * 0.62;
          items.forEach((el) => {
            const b = el.getBoundingClientRect();
            el.classList.toggle('is-past', b.left + 40 < mid);
          });
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [dist]);

  return (
    <div className="xr" ref={host} style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="xr-stage">
        <div className="xr-track" ref={track}>
          <span className="xr-line" aria-hidden="true">
            <i ref={fillRef} />
          </span>
          {EXPERIENCE.map((item, i) => (
            <div className={`xr-item ${i % 2 ? 'xr-down' : 'xr-up'}`} key={item.title}>
              <span className="xr-node" aria-hidden="true">
                <Icon name={TAG_ICON[item.tag] || 'spark'} size={13} stroke={2} />
              </span>
              <span className="xr-stem" aria-hidden="true" />
              <span className="xr-idx mono" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <XpCard item={item} onOpen={onOpen} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [open, setOpen] = useState(null);
  const trackRef = useRef(null);
  const reduced = useReducedMotion();
  const narrow = useMedia('(max-width: 860px)');
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 72%', 'end 55%'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <Section id="experience" bloom="vermilion" bloomAt="right">
      <SectionHead
        eyebrow="Experience"
        title="Where I've"
        accent="put in the work."
        sub="From the mill floor to a tech company, with club leadership roles along the way. Tap any card for the details."
      />

      {/* pipeline strip — each kind of work lights up in turn */}
      <div className="xp-pipe glass" style={{ '--n': PIPE.length }}>
        {PIPE.map((tag, i) => (
          <div className="xp-step" key={tag} style={{ '--i': i }}>
            <span className="xp-step-ic">
              <Icon name={TAG_ICON[tag] || 'spark'} size={15} />
            </span>
            <span className="xp-step-l">{tag}</span>
            {i < PIPE.length - 1 && <span className="xp-step-wire" aria-hidden="true" />}
          </div>
        ))}
      </div>

      {narrow || reduced ? (
      <div className={`xp ${narrow ? 'xp-narrow' : ''}`} ref={trackRef}>
        <span className="xp-track" aria-hidden="true" />
        <motion.span
          className="xp-fill"
          style={reduced ? { scaleY: 1 } : { scaleY: fill }}
          aria-hidden="true"
        />

        {EXPERIENCE.map((item, i) => {
          const side = narrow ? 'right' : i % 2 === 0 ? 'left' : 'right';
          return (
            <motion.article
              className={`xp-row xp-${side}`}
              key={item.title}
              initial={{ opacity: 0, x: side === 'left' ? -46 : 46, filter: 'blur(7px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-14% 0px' }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="xp-node"
                aria-hidden="true"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-14% 0px' }}
                transition={{ duration: 0.5, delay: 0.15, type: 'spring', stiffness: 300 }}
              >
                <Icon name={TAG_ICON[item.tag] || 'spark'} size={13} stroke={2} />
              </motion.span>

              <XpCard item={item} onOpen={setOpen} />
            </motion.article>
          );
        })}
      </div>
      ) : (
        <XpRail onOpen={setOpen} />
      )}
      <AnimatePresence>{open && <ExperienceModal item={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </Section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { PROFILE } from '../data/content';
import { useReducedMotion } from '../hooks';
import { isLight, setMode } from '../lib/theme';
import { scrollToId } from '../lib/scroll';
import Icon from './ui/Icon';
import './hero.css';

/* the notebook page flips through these */
const ROLES = ['Business Development Executive at NidusLab', 'Textile Engineer'];

/* switch theme with a circular wipe that grows from the cord */
function switchTheme(x, y) {
  const next = isLight() ? 'dark' : 'light';
  const doc = document;
  if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setMode(next);
    return;
  }
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const t = doc.startViewTransition(() => setMode(next));
  t.ready.then(() => {
    doc.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 750, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' }
    );
  });
}

/* ---------- pull cord: drag it down (or click) to flip the lights ---------- */
function PullCord() {
  const [pull, setPull] = useState(0);
  const [snap, setSnap] = useState(false);
  const knob = useRef(null);
  const drag = useRef(null);

  const fire = () => {
    const r = knob.current.getBoundingClientRect();
    switchTheme(r.left + r.width / 2, r.top + r.height / 2);
  };

  const down = (e) => {
    drag.current = { y: e.clientY, moved: false };
    setSnap(false);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e) => {
    if (!drag.current) return;
    const d = Math.max(0, Math.min(90, e.clientY - drag.current.y));
    if (d > 4) drag.current.moved = true;
    setPull(d);
  };
  const up = () => {
    if (!drag.current) return;
    const { moved } = drag.current;
    drag.current = null;
    if (!moved || pull > 36) {
      if (!moved) {
        setPull(56);
        setTimeout(() => {
          setSnap(true);
          setPull(0);
        }, 140);
      } else {
        setSnap(true);
        setPull(0);
      }
      fire();
    } else {
      setSnap(true);
      setPull(0);
    }
  };

  return (
    <div className="cord" style={{ '--pull': `${pull}px` }}>
      <span className="cord-line" />
      <button
        ref={knob}
        type="button"
        className={`cord-knob ${snap ? 'is-snap' : ''}`}
        aria-label="Pull to switch light and dark mode"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fire();
          }
        }}
      >
        <i />
      </button>
      <span className="cord-hint mono">pull me</span>
    </div>
  );
}

/* ---------- notebook page that flips to the next role ---------- */
function Notebook() {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => {
      setI((v) => {
        setPrev(v);
        return (v + 1) % ROLES.length;
      });
    }, 3200);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="nb" aria-live="polite">
      <span className="nb-rings" aria-hidden="true">
        {Array.from({ length: 13 }, (_, k) => (
          <i key={k} />
        ))}
      </span>
      <div className="nb-stack">
        <div className="nb-page nb-under" aria-hidden="true" />
        <div className="nb-page nb-cur">
          <span>{ROLES[i]}</span>
        </div>
        {prev !== null && (
          <div className="nb-page nb-flip" key={`f-${i}`} aria-hidden="true" onAnimationEnd={() => setPrev(null)}>
            <span>{ROLES[prev]}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  const go = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section className="hx" id="home">
      <span className="hx-grid" aria-hidden="true" />
      <span className="hx-glow" aria-hidden="true" />
      <PullCord />

      <div className="container hx-wrap">
        <div className="hx-copy">
          <h1 className="hx-hi">
            <span className="hx-l1 rise">This is {PROFILE.name}.</span>
            <span className="hx-l2 rise" style={{ animationDelay: '.1s' }}>
              I am a
            </span>
          </h1>
          <div className="rise" style={{ animationDelay: '.2s' }}>
            <Notebook />
          </div>

          <p className="hx-intro rise" style={{ animationDelay: '.3s' }}>
            {PROFILE.intro}
          </p>

          <div className="hx-ctas rise" style={{ animationDelay: '.38s' }}>
            <a href="#doors" className="btn btn-primary" onClick={go('doors')}>
              Open the doors
              <Icon name="arrowRight" size={15} />
            </a>
            <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Icon name="doc" size={15} />
              View resume
            </a>
            <a href="#contact" className="btn btn-ghost" onClick={go('contact')}>
              Contact me
            </a>
          </div>
        </div>

        <div className="hx-photo rise" style={{ animationDelay: '.15s' }}>
          <div className="hx-arch">
            <img src={PROFILE.portrait} alt={`Portrait of ${PROFILE.name}`} loading="eager" />
          </div>
          <span className="hx-tag">
            <b>{PROFILE.location.split(', ').slice(0, 2).join(', ')}</b>
            <span className="mono">{PROFILE.tagline}</span>
          </span>
        </div>
      </div>

      <button className="hx-cue mono" onClick={() => scrollToId('doors')} aria-label="Scroll to the doors">
        Scroll
        <i />
      </button>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EDUCATION, EXPERIENCE, PROFILE, SKILL_GROUPS } from '../data/content';
import { useReducedMotion } from '../hooks';
import HeroField from './fx/HeroField';
import Icon from './ui/Icon';
import { scrollToId } from '../lib/scroll';
import './hero.css';

/* the gradient word under the name cycles through these */
const ROTATE = [
  'textile engineering',
  'business development',
  'AI & emerging tech',
  'merchandising',
  'web technologies',
];

/* ---------- rotating gradient word ---------- */
function useRotator(list, ms = 2600) {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => setI((v) => (v + 1) % list.length), ms);
    return () => clearInterval(id);
  }, [list.length, ms, reduced]);
  return [list[i], i];
}

export default function Hero() {
  const ref = useRef(null);
  const rig = useRef(null);
  const reduced = useReducedMotion();
  const [word, wi] = useRotator(ROTATE);
  /* card rig leans toward the pointer: ±12° yaw, ±9° pitch */
  useEffect(() => {
    const host = ref.current;
    const el = rig.current;
    if (!host || !el || reduced) return undefined;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--rx', (x * 12).toFixed(2));
      el.style.setProperty('--ry', (-y * 9).toFixed(2));
    };
    const leave = () => {
      el.style.setProperty('--rx', 0);
      el.style.setProperty('--ry', 0);
    };
    host.addEventListener('pointermove', move, { passive: true });
    host.addEventListener('pointerleave', leave);
    return () => {
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerleave', leave);
    };
  }, [reduced]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  const go = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section className="hx" id="home" ref={ref}>
      <HeroField hostRef={ref} />
      <div className="hx-spot" aria-hidden="true" />
      <span className="hx-arc" aria-hidden="true" />

      {/* slowly turning wireframe cubes */}
      <span className="hx-cube hx-cube-a" aria-hidden="true">
        {['f', 'b', 'l', 'r', 't', 'd'].map((f) => <i key={f} className={`cf cf-${f}`} />)}
      </span>
      <span className="hx-cube hx-cube-b" aria-hidden="true">
        {['f', 'b', 'l', 'r', 't', 'd'].map((f) => <i key={f} className={`cf cf-${f}`} />)}
      </span>

      <motion.div className="container hx-top" style={reduced ? undefined : { opacity: fade, y: lift }}>
        {/* ---------- copy ---------- */}
        <div className="hx-l">
          <a className="pill rise" href="#experience" onClick={go('experience')}>
            <b>New</b>
            {PROFILE.badge.title} {PROFILE.badge.sub.replace(' Ecosystem', '')}
            <Icon name="arrowRight" size={13} />
          </a>

          <h1 className="hx-h">
            <span className="hx-big rise" style={{ animationDelay: '.08s' }}>
              Engineering meets <span className="hx-last">business.</span>
            </span>
            <span className="hx-mid rise" style={{ animationDelay: '.16s' }}>
              working across
            </span>
            <span className="hx-rot rise" style={{ animationDelay: '.22s' }}>
              <span className="hx-word grad-text" key={wi}>
                {word}
              </span>
            </span>
          </h1>

          <p className="hx-intro rise" style={{ animationDelay: '.3s' }}>
            {PROFILE.intro}
          </p>

          <div className="hx-ctas rise" style={{ animationDelay: '.38s' }}>
            <a href="#projects" className="btn btn-primary" onClick={go('projects')}>
              View Projects
              <Icon name="arrowRight" size={15} />
            </a>
            <a href={PROFILE.resume} download="Nazzas-Ibn-Shams-Unib-Resume.pdf" className="btn btn-ghost">
              <Icon name="download" size={15} />
              Download Resume
            </a>
            <a href="#contact" className="btn btn-ghost" onClick={go('contact')}>
              Contact Me
            </a>
          </div>

          <ul className="hx-chan rise mono" style={{ animationDelay: '.46s' }}>
            {SKILL_GROUPS.map((g) => (
              <li key={g.id}>{g.short}</li>
            ))}
            <li>AI</li>
          </ul>
        </div>

        {/* ---------- tilting card rig ---------- */}
        <div className="hx-r">
          <div className="hx-rig" ref={rig}>
            {/* snapshot — real facts only */}
            <div className="hvc hv-snap">
              <div className="hv-row">
                <span className="chip chip-ok">Open to opportunities</span>
                <span className="hv-sub">{PROFILE.location.split(', ').slice(0, 2).join(', ')}</span>
              </div>
              <ul className="hv-facts">
                <li>
                  <span className="mono">Now</span>
                  <b>{PROFILE.badge.title}</b>
                  <span>{PROFILE.badge.sub}</span>
                </li>
                <li>
                  <span className="mono">Studying</span>
                  <b>{EDUCATION[0].title}</b>
                  <span>{EDUCATION[0].org.split(' · ')[0]}</span>
                </li>
                <li>
                  <span className="mono">Industry</span>
                  <b>Merchandising internship</b>
                  <span>Rising Knit Textiles Ltd</span>
                </li>
              </ul>
              <p className="hv-cap">{PROFILE.tagline}</p>
            </div>

            {/* quick links */}
            <div className="hvc hv-links">
              <div className="hv-btns">
                <a href="#contact" className="hv-btn hv-btn-1" onClick={go('contact')}>
                  Say hello
                </a>
                <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="hv-btn">
                  View resume
                </a>
                <a href="#projects" className="hv-btn" onClick={go('projects')}>
                  Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ---------- live ticker ---------- */}
      <div className="hx-foot">
        <div className="tick">
          <div className="tk">
            {[...EXPERIENCE, ...EXPERIENCE].map((x, i) => (
              <span className={`it t-${x.tag.toLowerCase()}`} key={i}>
                <i />
                <b>{x.org}</b> · {x.title}
              </span>
            ))}
          </div>
        </div>
        <button className="scroll-cue" onClick={() => scrollToId('about')} aria-label="Scroll to about">
          <span className="livedot">
            <i />
            Scroll
          </span>
        </button>
      </div>
    </section>
  );
}

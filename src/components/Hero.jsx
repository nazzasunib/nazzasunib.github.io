import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { PROFILE } from '../data/content';
import { useTypewriter, useReducedMotion } from '../hooks';
import { Magnetic, Marquee, SplitChars } from './ui/Primitives';
import Icon from './ui/Icon';
import { scrollToId } from '../lib/scroll';
import './hero.css';

const HERO_TICKER = [
  'Textile Engineering',
  'Business Development',
  'AI & Emerging Tech',
  'Merchandising',
  'Web Technologies',
];

export default function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const role = useTypewriter(PROFILE.roles);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '38%']);
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.94]), {
    stiffness: 120,
    damping: 24,
  });

  return (
    <section className="hero" id="home" ref={ref}>
      {/* dyed corner blooms */}
      <span className="hero-bloom hero-bloom-a" aria-hidden="true" />
      <span className="hero-bloom hero-bloom-b" aria-hidden="true" />
      <span className="hero-bloom hero-bloom-c" aria-hidden="true" />

      <motion.div
        className="container hero-grid"
        style={reduced ? undefined : { opacity: fade, scale }}
      >
        <motion.div className="hero-copy" style={reduced ? undefined : { y: copyY }}>
          <motion.div
            className="hero-tag"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <span className="live-dot" />
            <span className="mono">{PROFILE.status}</span>
          </motion.div>

          <h1 className="hero-name">
            <SplitChars text={PROFILE.first} delay={0.45} />
            {/* the gradient sits on the element holding the text itself —
                background-clip:text has nothing to clip to if the glyphs
                live in descendant spans, so this line is not char-split */}
            <motion.span
              className="grad-text hero-last"
              initial={reduced ? false : { y: '42%', opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
              transition={{
                duration: 1,
                delay: 0.45 + PROFILE.first.length * 0.028,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {PROFILE.last}
            </motion.span>
          </h1>

          <motion.div
            className="hero-role"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.95 }}
          >
            <span className="hero-role-bar" />
            <span className="hero-role-text">{role}</span>
            <span className="hero-caret" />
          </motion.div>

          <motion.p
            className="hero-intro"
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {PROFILE.intro}
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Magnetic strength={0.22}>
              <a
                href="#projects"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId('projects');
                }}
              >
                View Projects
                <Icon name="arrowRight" size={16} />
              </a>
            </Magnetic>
            <Magnetic strength={0.18}>
              <a href={PROFILE.resume} download="Nazzas-Ibn-Shams-Unib-Resume.pdf" className="btn btn-ghost">
                <Icon name="download" size={16} />
                Download Resume
              </a>
            </Magnetic>
            <Magnetic strength={0.18}>
              <a
                href="#contact"
                className="btn btn-ghost"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId('contact');
                }}
              >
                Contact Me
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* ---------- portrait ---------- */}
        <motion.div
          className="hero-portrait"
          style={reduced ? undefined : { y: portraitY }}
          initial={{ opacity: 0, scale: 0.88, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.15, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="portrait-stack">
            <span className="portrait-conic" aria-hidden="true" />
            <span className="portrait-orbit" aria-hidden="true">
              <i />
            </span>
            <svg className="portrait-arc" viewBox="0 0 300 300" aria-hidden="true">
              <motion.circle
                cx="150"
                cy="150"
                r="140"
                fill="none"
                stroke="url(#heroArc)"
                strokeWidth="1.2"
                strokeDasharray="6 10"
                initial={{ pathLength: 0, rotate: 0 }}
                animate={{ pathLength: 1, rotate: 360 }}
                transition={{
                  pathLength: { duration: 1.6, delay: 0.8 },
                  rotate: { duration: 46, repeat: Infinity, ease: 'linear' },
                }}
                style={{ originX: '50%', originY: '50%' }}
              />
              <defs>
                <linearGradient id="heroArc" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#23d3b0" />
                  <stop offset="50%" stopColor="#ffb020" />
                  <stop offset="100%" stopColor="#8a6bff" />
                </linearGradient>
              </defs>
            </svg>

            <div className="portrait-frame">
              <img src={PROFILE.portrait} alt={`Portrait of ${PROFILE.name}`} loading="eager" />
              <span className="portrait-sheen" aria-hidden="true" />
            </div>

            <motion.div
              className="portrait-badge glass"
              initial={{ opacity: 0, y: 26, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="portrait-badge-icon">
                <Icon name="star" size={17} />
              </span>
              <div>
                <div className="pb-title">{PROFILE.badge.title}</div>
                <div className="pb-sub">{PROFILE.badge.sub}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* ---------- ticker + scroll cue ---------- */}
      <motion.div
        className="hero-foot"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <Marquee items={HERO_TICKER} speed={30} className="hero-marquee" />
        <button
          className="scroll-cue"
          onClick={() => scrollToId('about')}
          aria-label="Scroll to about"
        >
          <span className="mono">Scroll</span>
          <span className="cue-rail">
            <motion.i
              animate={reduced ? {} : { y: [0, 26, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </button>
      </motion.div>
    </section>
  );
}

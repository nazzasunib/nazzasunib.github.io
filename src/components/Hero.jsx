import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EDUCATION, EXPERIENCE, PROFILE, SKILL_GROUPS } from '../data/content';
import { useReducedMotion } from '../hooks';
import HeroField from './fx/HeroField';
import Icon from './ui/Icon';
import { scrollToId } from '../lib/scroll';
import './hero.css';

export default function Hero() {
  const ref = useRef(null);
  const rig = useRef(null);
  const reduced = useReducedMotion();
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
              About <span className="hx-last">Me</span>
            </span>
          </h1>

          <p className="hx-intro rise" style={{ animationDelay: '.3s' }}>
            {PROFILE.intro}
          </p>

          <ul className="hv-facts hx-facts rise" style={{ animationDelay: '.34s' }}>
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
            <li>
              <span className="mono">Based in</span>
              <b>{PROFILE.location.split(', ').slice(0, 2).join(', ')}</b>
              <span>{PROFILE.tagline}</span>
            </li>
          </ul>

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
            <div className="hvc hv-photo">
              <img src={PROFILE.portrait} alt={`Portrait of ${PROFILE.name}`} loading="eager" />
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

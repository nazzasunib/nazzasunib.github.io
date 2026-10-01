import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ABOUT_PARAGRAPHS, ABOUT_STATS, EDUCATION, SKILL_GROUPS } from '../data/content';
import { useCountUp, useReducedMotion } from '../hooks';
import { Reveal, Section, SectionHead } from './ui/Primitives';
import Globe from './fx/Globe';
import Icon from './ui/Icon';
import './about.css';

function Stat({ stat, index }) {
  const [ref, value] = useCountUp(stat.value, { duration: 1400 + index * 200 });
  const shown = stat.plain ? stat.value : value;
  return (
    <div className="stt" ref={ref}>
      <span className="stt-n">
        {shown}
        {stat.suffix}
      </span>
      <span className="stt-l">{stat.label}</span>
    </div>
  );
}

export default function About() {
  const railRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 85%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 30 });

  return (
    <Section id="about" bloom="iris" bloomAt="right">
      <SectionHead
        eyebrow="About"
        title="Two disciplines,"
        accent="one thread."
        sub="Bridging business strategy, technology and innovation to create impactful digital solutions and meaningful business opportunities."
      />

      <div className="about-grid">
        <div className="about-text">
          {ABOUT_PARAGRAPHS.map((p, i) => (
            <Reveal key={i} delay={i * 0.06} y={18}>
              <p className={i === 0 ? 'about-lede' : ''}>{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="about-visual">
          <Globe
            stages={SKILL_GROUPS.map((g) => g.label)}
            caption="Every domain wires back to the same profile."
          />
        </Reveal>
      </div>

      <Reveal>
        <div className="statstrip">
          {ABOUT_STATS.map((s, i) => (
            <Stat stat={s} index={i} key={s.label} />
          ))}
          <div className="stt">
            <span className="stt-n">{EDUCATION.length}</span>
            <span className="stt-l">Education milestones</span>
          </div>
        </div>
      </Reveal>

      {/* ---------- education as numbered steps ---------- */}
      <div className="edu" ref={railRef}>
        <div className="edu-head">
          <span className="eyebrow">
            <Icon name="cap" size={14} /> Education
          </span>
        </div>
        <div className="edu-rail" aria-hidden="true">
          <motion.span style={reduced ? { scaleX: 1 } : { scaleX: fill }} />
        </div>
        <div className="edu-steps">
          {EDUCATION.map((item, i) => (
            <motion.article
              className="edu-card glass card"
              key={item.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <span className="edu-n mono">{String(i + 1).padStart(2, '0')}</span>
              <h4>{item.title}</h4>
              <span className="edu-org mono">{item.org}</span>
              <p>{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}

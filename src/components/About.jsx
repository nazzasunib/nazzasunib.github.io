import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ABOUT_PARAGRAPHS, ABOUT_STATS, EDUCATION } from '../data/content';
import { useCountUp, useReducedMotion } from '../hooks';
import { Reveal, Section, SectionHead } from './ui/Primitives';
import Icon from './ui/Icon';
import './about.css';

function StatBox({ stat, index }) {
  const [ref, value] = useCountUp(stat.value, { duration: 1400 + index * 200 });
  const shown = stat.plain ? stat.value : value;
  return (
    <motion.div
      className="stat-box glass"
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <span className="stat-n">
        {shown}
        {stat.suffix}
      </span>
      <span className="stat-l">{stat.label}</span>
      <span className="stat-thread" />
    </motion.div>
  );
}

export default function About() {
  const railRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 78%', 'end 42%'],
  });
  const railScale = useSpring(scrollYProgress, { stiffness: 110, damping: 30 });
  const glyphY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <Section id="about" bloom="iris" bloomAt="right">
      <SectionHead
        index={1}
        eyebrow="About"
        title="Two disciplines,"
        accent="one thread."
        sub="Bridging business strategy, technology and innovation to create impactful digital solutions and meaningful business opportunities."
      />

      <div className="about-grid">
        {/* ---------- narrative ---------- */}
        <div className="about-text">
          {ABOUT_PARAGRAPHS.map((p, i) => (
            <Reveal key={i} delay={i * 0.08} y={22}>
              <p className={i === 0 ? 'about-lede' : ''}>{p}</p>
            </Reveal>
          ))}

          <div className="about-stats">
            {ABOUT_STATS.map((s, i) => (
              <StatBox stat={s} index={i} key={s.label} />
            ))}
          </div>
        </div>

        {/* ---------- education rail ---------- */}
        <div className="about-edu" ref={railRef}>
          <Reveal>
            <div className="edu-head">
              <span className="edu-head-icon">
                <Icon name="cap" size={17} />
              </span>
              <span className="mono">Education</span>
            </div>
          </Reveal>

          <div className="rail">
            <span className="rail-track" aria-hidden="true" />
            <motion.span
              className="rail-fill"
              style={reduced ? { scaleY: 1 } : { scaleY: railScale }}
              aria-hidden="true"
            />

            {EDUCATION.map((item, i) => (
              <motion.article
                className="rail-item"
                key={item.title}
                initial={{ opacity: 0, x: 34 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-12% 0px' }}
                transition={{ duration: 0.75, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="rail-node" aria-hidden="true">
                  <i />
                </span>
                <div className="rail-card glass">
                  <h4>{item.title}</h4>
                  <span className="rail-org mono">{item.org}</span>
                  <p>{item.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.span
            className="about-glyph"
            style={reduced ? undefined : { y: glyphY }}
            aria-hidden="true"
          >
            <Icon name="weave" size={230} stroke={0.4} />
          </motion.span>
        </div>
      </div>
    </Section>
  );
}

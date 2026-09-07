import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { EXPERIENCE } from '../data/content';
import { useMedia, useReducedMotion } from '../hooks';
import { Section, SectionHead } from './ui/Primitives';
import Icon from './ui/Icon';
import './experience.css';

const TAG_ICON = {
  Industry: 'shirt',
  Leadership: 'users',
  Volunteer: 'spark',
  Events: 'chat',
  Academic: 'cap',
};

export default function Experience() {
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
        index={3}
        eyebrow="Experience"
        title="Where I've"
        accent="put in the work."
        sub="Industry placement, four club leadership roles and the academic project that connected them."
      />

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

              <div className="xp-card glass">
                <span className="xp-tag chip">{item.tag}</span>
                <h4>{item.title}</h4>
                <span className="xp-org mono">{item.org}</span>
                <p>{item.desc}</p>
                <span className="xp-edge" aria-hidden="true" />
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}

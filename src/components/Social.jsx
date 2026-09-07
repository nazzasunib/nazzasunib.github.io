import { motion } from 'framer-motion';
import { SOCIALS } from '../data/content';
import { Section, SectionHead, Stagger, staggerItem } from './ui/Primitives';
import Icon from './ui/Icon';
import './social.css';

export default function Social() {
  return (
    <Section id="social" bloom="jade" bloomAt="center">
      <SectionHead
        index={10}
        eyebrow="Social Media"
        title="Find me"
        accent="around the web."
        sub="Every platform I'm active on — code, content and everything in between."
      />

      <Stagger className="social-grid" stagger={0.06}>
        {SOCIALS.map((s, i) => (
          <motion.a
            className="social glass"
            key={`${s.name}-${i}`}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={staggerItem}
            whileHover={{ y: -6 }}
            style={{ '--tone': s.tone }}
          >
            <span className="social-icon">
              <Icon name={s.icon} size={22} />
            </span>
            <span className="social-body">
              <span className="social-name">{s.name}</span>
              <span className="social-handle mono">{s.handle}</span>
            </span>
            <Icon name="arrowUpRight" size={17} className="social-go" />
            <span className="social-glow" aria-hidden="true" />
          </motion.a>
        ))}
      </Stagger>
    </Section>
  );
}

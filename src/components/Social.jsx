import { motion } from 'framer-motion';
import { SOCIALS } from '../data/content';
import { Reveal, Section, SectionHead, Stagger, staggerItem } from './ui/Primitives';
import Icon from './ui/Icon';
import { Ring3D } from './fx/Stack3D';

/* the near-white GitHub tone disappears on the light theme — follow the ink instead */
export const toneOf = (t) => (t === '#f5f2ea' ? 'var(--ink)' : t);
import './social.css';

export default function Social() {
  return (
    <Section id="social" bloom="jade" bloomAt="center">
      <SectionHead
        eyebrow="Social Media"
        title="Find me"
        accent="around the web."
        sub="Every platform I'm active on — code, content and everything in between."
      />

      <Reveal>
        <Ring3D
          items={SOCIALS.map((s) => ({ kind: s.name, title: s.handle, tone: 'var(--acc)' }))}
          caption="Every platform turns around the same person."
        />
      </Reveal>

      <Stagger className="social-grid" stagger={0.06}>
        {SOCIALS.map((s, i) => (
          <motion.a
            className="social glass card"
            key={`${s.name}-${i}`}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={staggerItem}
            whileHover={{ y: -6 }}
            style={{ '--tone': toneOf(s.tone) }}
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

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ACHIEVEMENTS } from '../data/content';
import { Section, SectionHead, Stagger, staggerItem } from './ui/Primitives';
import { Shot, StoryModal } from './ui/Gallery';
import Icon from './ui/Icon';
import './achievements.css';

/* Same card-opens-a-story model as Events, but the photo shape varies per
   entry: certificate scans are portrait and must be letterboxed rather than
   cropped, while programme photographs are landscape and fill the frame. Each
   entry carries its own `fit`, defaulting to 'cover'. */
export default function Achievements() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <Section id="achievements" bloom="saffron" bloomAt="right">
        <SectionHead
          index={9}
          eyebrow="Achievements"
          title="Recognition"
          accent="earned."
          sub="Certificates, organizing roles and awards — open a card to see the certificate and the story behind it."
        />

        <Stagger className="ach-grid" stagger={0.1}>
          {ACHIEVEMENTS.map((a) => (
            <motion.article className="ach glass" key={a.id} variants={staggerItem}>
              <button
                className="ach-btn"
                onClick={() => setOpen(a)}
                aria-label={`Open achievement: ${a.name}`}
              >
                <div className="ach-thumb" data-fit={a.fit}>
                  <Shot
                    shot={{
                      src: a.cover,
                      srcSet: a.coverSrcSet,
                      blur: a.coverBlur,
                      alt: `${a.name} cover`,
                    }}
                    sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 400px"
                  />
                  <span className="ach-thumb-veil" aria-hidden="true" />
                  <span className="ach-seal" aria-hidden="true">
                    <Icon name="award" size={17} />
                  </span>
                </div>
                <div className="ach-body">
                  <h4>{a.name}</h4>
                  <span className="ach-role mono">{a.role}</span>
                  <span className="ach-date mono">{a.date}</span>
                  <p>{a.blurb}</p>
                  <span className="ach-hint">
                    {a.fit === 'contain' ? 'View certificate' : 'View the story'}
                    <Icon name="arrowRight" size={15} />
                  </span>
                </div>
              </button>
            </motion.article>
          ))}

          <motion.div className="ach ach-slot" variants={staggerItem}>
            <Icon name="spark" size={26} stroke={1.3} />
            <h4>Next achievement goes here</h4>
            <p>
              Drop the certificate into <code>source-photos/</code>, add a group to{' '}
              <code>scripts/optimize-gallery.mjs</code>, run the script and append an entry to{' '}
              <code>ACHIEVEMENTS</code> in <code>src/data/content.js</code>.
            </p>
          </motion.div>
        </Stagger>
      </Section>

      <AnimatePresence>
        {open && (
          <StoryModal
            entry={open}
            onClose={() => setOpen(null)}
            fit={open.fit ?? 'cover'}
            tall={open.fit === 'contain'}
          />
        )}
      </AnimatePresence>
    </>
  );
}

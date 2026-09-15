import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EVENTS } from '../data/content';
import { Section, SectionHead, Stagger, staggerItem } from './ui/Primitives';
import { Shot, StoryModal } from './ui/Gallery';
import Icon from './ui/Icon';
import './events.css';

export default function Events() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <Section id="events" bloom="rose" bloomAt="left">
        <SectionHead
          index={8}
          eyebrow="Events"
          title="Moments from"
          accent="my events."
          sub="Seminars, fairs and campus programmes — open a card to read the full story."
        />

        <Stagger className="events-grid" stagger={0.1}>
          {EVENTS.map((ev) => (
            <motion.article className="event glass" key={ev.id} variants={staggerItem}>
              <button
                className="event-btn"
                onClick={() => setOpen(ev)}
                aria-label={`Open story: ${ev.name}`}
              >
                <div className="event-thumb">
                  <Shot
                    shot={{
                      src: ev.cover,
                      srcSet: ev.coverSrcSet,
                      blur: ev.coverBlur,
                      alt: `${ev.name} cover`,
                    }}
                    sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 400px"
                  />
                  <span className="event-thumb-veil" aria-hidden="true" />
                  <span className="event-badge mono">Story</span>
                </div>
                <div className="event-body">
                  <h4>{ev.name}</h4>
                  <span className="event-meta mono">{ev.meta}</span>
                  <p>{ev.blurb}</p>
                  <span className="event-hint">
                    Read the full story
                    <Icon name="arrowRight" size={15} />
                  </span>
                </div>
              </button>
            </motion.article>
          ))}

          <motion.div className="event event-slot" variants={staggerItem}>
            <Icon name="spark" size={26} stroke={1.3} />
            <h4>Next event goes here</h4>
            <p>
              Drop photos into <code>public/assets/</code>, run{' '}
              <code>node scripts/optimize-images.mjs</code> and add an entry to{' '}
              <code>src/data/content.js</code> — it renders with the same story layout.
            </p>
          </motion.div>
        </Stagger>
      </Section>

      <AnimatePresence>
        {open && <StoryModal entry={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  );
}

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CASE_STUDIES, EVENTS, FABRIC_PROJECT, NOW } from '../data/content';
import { Reveal, Section, SectionHead, Stagger, staggerItem } from './ui/Primitives';
import { Shot, StoryModal } from './ui/Gallery';
import Icon from './ui/Icon';
import './recruiter.css';

/* Sections for recruiters and clients. All data lives in content.js. */

/* =========================================================
   Now — a short "what I'm doing at the moment" panel
   ========================================================= */
export function Now() {
  return (
    <Section id="now" bloom="jade" bloomAt="right" className="sec-tight">
      <Reveal>
        <div className="now glass">
          <div className="now-head">
            <span className="livedot">
              <i />
              Now
            </span>
            <span className="now-upd mono">Updated {NOW.updated}</span>
          </div>
          <ul className="now-list">
            {NOW.items.map((it) => (
              <li key={it.label}>
                <span className="now-k mono">{it.label}</span>
                <span className="now-v">{it.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}

/* =========================================================
   Case study — business development work, with outcomes
   ========================================================= */
function CaseCard({ cs, onOpen }) {
  const facts = cs.facts || [];
  return (
    <article className="cs glass">
      <div className="cs-media">
        <Shot
          shot={{ src: cs.cover, srcSet: cs.coverSrcSet, blur: cs.coverBlur, alt: cs.title }}
          sizes="(max-width: 900px) 92vw, 520px"
        />
        <div className="cs-chips">
          <span className="chip chip-acc">{cs.type}</span>
          <span className="chip">{cs.date}</span>
        </div>
      </div>

      <div className="cs-body">
        <span className="cs-client mono">{cs.client}</span>
        <h3>{cs.title}</h3>
        <span className="cs-role">{cs.role}</span>

        <div className="cs-block">
          <h4 className="mono">The brief</h4>
          <p>{cs.challenge}</p>
        </div>

        <div className="cs-block">
          <h4 className="mono">What I did</h4>
          <ol className="cs-steps">
            {cs.approach.map((a, i) => (
              <li key={i}>
                <span className="cs-n mono">{String(i + 1).padStart(2, '0')}</span>
                {a}
              </li>
            ))}
          </ol>
        </div>

        {facts.length > 0 && (
          <div className="statstrip cs-facts">
            {facts.map((f) => (
              <div className="stt" key={f.label}>
                <span className="stt-n">{f.value}</span>
                <span className="stt-l">{f.label}</span>
              </div>
            ))}
          </div>
        )}

        {cs.eventId && (
          <button className="btn btn-ghost cs-open" onClick={onOpen}>
            Read the full story
            <Icon name="arrowRight" size={15} />
          </button>
        )}
      </div>
    </article>
  );
}

export function CaseStudies() {
  const [open, setOpen] = useState(null);
  const list = CASE_STUDIES;
  if (!list.length) return null;
  return (
    <>
      <Section id="casestudy" bloom="iris" bloomAt="left">
        <SectionHead
          eyebrow="Case study"
          title="Business development,"
          accent="in practice."
          sub="What the work actually looked like: the brief, the steps, and what came out of it."
        />
        <div className="cs-list">
          {list.map((cs) => (
            <Reveal key={cs.id}>
              <CaseCard cs={cs} onOpen={() => setOpen(EVENTS.find((e) => e.id === cs.eventId))} />
            </Reveal>
          ))}
        </div>
      </Section>
      <AnimatePresence>{open && <StoryModal entry={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  );
}

/* =========================================================
   Project deep dive — Textile Fabric Analysis
   ========================================================= */
export function FabricProject() {
  const p = FABRIC_PROJECT;
  return (
    <Section id="fabric" bloom="saffron" bloomAt="right">
      <SectionHead eyebrow="Project deep dive" title={p.title.split(' ').slice(0, -1).join(' ')} accent={`${p.title.split(' ').slice(-1)}.`} sub={p.summary} />

      <span className="fp-org mono">{p.org}</span>

      <Stagger className="fp-scope" stagger={0.08}>
        {p.scope.map((s, i) => (
          <motion.div className="fp-step glass card" key={s.title} variants={staggerItem}>
            <span className="fp-ic">
              <Icon name={s.icon} size={18} />
            </span>
            <span className="fp-n mono">{String(i + 1).padStart(2, '0')}</span>
            <h4>{s.title}</h4>
            <p>{s.text}</p>
          </motion.div>
        ))}
      </Stagger>

    </Section>
  );
}

/* Removed sections. Kept as empty exports so an older App.jsx that still
   imports them keeps building; they render nothing. */
export function Testimonials() {
  return null;
}
export function Certificates() {
  return null;
}

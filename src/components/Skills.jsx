import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { SKILLS, SKILL_GROUPS } from '../data/content';
import { useReducedMotion } from '../hooks';
import { Reveal, Section, SectionHead } from './ui/Primitives';
import Icon from './ui/Icon';
import './skills.css';

const CX = 160;
const CY = 160;
const R_NODE = 112;
const R_ARC = 142;

const TONE_HEX = {
  saffron: '#ffb020',
  vermilion: '#ff5c39',
  jade: '#23d3b0',
  iris: '#8a6bff',
};

const groupOf = (id) => SKILL_GROUPS.find((g) => g.id === id);
const toneOf = (id) => groupOf(id)?.tone || 'saffron';

/* Skills ordered so each domain occupies one contiguous arc. */
const ORDERED = SKILL_GROUPS.flatMap((g) => SKILLS.filter((s) => s.group === g.id));

const polar = (angleDeg, radius) => {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [CX + Math.cos(a) * radius, CY + Math.sin(a) * radius];
};

const nodeAngle = (i) => (i / ORDERED.length) * 360;

/* SVG arc spanning one domain's slice of the ring. */
function arcPath(fromDeg, toDeg, radius) {
  const [x1, y1] = polar(fromDeg, radius);
  const [x2, y2] = polar(toDeg, radius);
  const large = toDeg - fromDeg > 180 ? 1 : 0;
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${radius} ${radius} 0 ${large} 1 ${x2.toFixed(
    1
  )} ${y2.toFixed(1)}`;
}

const DOMAIN_ARCS = SKILL_GROUPS.map((g) => {
  const idx = ORDERED.reduce((acc, s, i) => (s.group === g.id ? [...acc, i] : acc), []);
  const pad = 360 / ORDERED.length / 2 - 3;
  return {
    ...g,
    from: nodeAngle(idx[0]) - pad,
    to: nodeAngle(idx[idx.length - 1]) + pad,
    count: idx.length,
  };
});

/* =========================================================
   SkillConstellation — every skill is one node on a ring,
   grouped into domain arcs and wired back to a central hub.

   Nodes are deliberately identical in size: this maps the
   shape of the skill set, and makes no claim about level.
   ========================================================= */
function SkillConstellation({ activeName, dimmed, onPick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduced = useReducedMotion();
  const play = inView || reduced;

  return (
    <div className="cons" ref={ref}>
      <svg viewBox="0 0 320 320" role="img" aria-label="Skills grouped by domain">
        <defs>
          <radialGradient id="consHub" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffb020" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffb020" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* spokes from the hub */}
        {ORDERED.map((s, i) => {
          const [x, y] = polar(nodeAngle(i), R_NODE);
          const on = activeName === s.name;
          const faded = dimmed && !dimmed.has(s.name);
          return (
            <motion.line
              key={`sp-${s.name}`}
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              className={`cons-spoke ${on ? 'is-on' : ''} ${faded ? 'is-faded' : ''}`}
              style={{ '--tone': TONE_HEX[toneOf(s.group)] }}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={play ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.045, ease: 'easeOut' }}
            />
          );
        })}

        {/* domain arcs */}
        {DOMAIN_ARCS.map((g, gi) => {
          const faded = dimmed && !ORDERED.some((s) => s.group === g.id && dimmed.has(s.name));
          return (
            <motion.path
              key={g.id}
              d={arcPath(g.from, g.to, R_ARC)}
              className={`cons-arc ${faded ? 'is-faded' : ''}`}
              style={{ '--tone': TONE_HEX[g.tone] }}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={play ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.35 + gi * 0.12, ease: [0.22, 1, 0.36, 1] }}
            />
          );
        })}

        {/* central hub */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={play ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: '160px', originY: '160px' }}
        >
          <circle cx={CX} cy={CY} r="46" fill="url(#consHub)" />
          <circle cx={CX} cy={CY} r="27" className="cons-hub" />
          <text x={CX} y={CY - 3} className="cons-hub-a">
            NIS
          </text>
          <text x={CX} y={CY + 9} className="cons-hub-b">
            Unib
          </text>
        </motion.g>

        {/* skill nodes */}
        {ORDERED.map((s, i) => {
          const [x, y] = polar(nodeAngle(i), R_NODE);
          const on = activeName === s.name;
          const faded = dimmed && !dimmed.has(s.name);
          return (
            <motion.g
              key={`n-${s.name}`}
              className={`cons-node ${on ? 'is-on' : ''} ${faded ? 'is-faded' : ''}`}
              style={{ '--tone': TONE_HEX[toneOf(s.group)] }}
              initial={{ scale: 0, opacity: 0 }}
              animate={play ? { scale: 1, opacity: 1 } : {}}
              transition={{
                delay: 0.55 + i * 0.05,
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              onMouseEnter={() => onPick(s.name)}
              onFocus={() => onPick(s.name)}
              onClick={() => onPick(s.name)}
              tabIndex={0}
              role="button"
              aria-label={`${s.name} — ${groupOf(s.group)?.label}`}
            >
              {on && <circle cx={x} cy={y} r="15" className="cons-halo" />}
              <circle cx={x} cy={y} r="9" className="cons-node-hit" />
              <circle cx={x} cy={y} r={on ? 6.5 : 4.5} className="cons-node-dot" />
            </motion.g>
          );
        })}
      </svg>

      {/* legend doubles as the key for the arc colours */}
      <ul className="cons-legend">
        {SKILL_GROUPS.map((g) => (
          <li key={g.id} style={{ '--tone': TONE_HEX[g.tone] }}>
            <i />
            {g.short}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  const [filter, setFilter] = useState('all');
  const [activeName, setActiveName] = useState(ORDERED[0].name);

  const visible = useMemo(
    () => (filter === 'all' ? ORDERED : ORDERED.filter((s) => s.group === filter)),
    [filter]
  );

  const dimmed = useMemo(
    () => (filter === 'all' ? null : new Set(visible.map((s) => s.name))),
    [filter, visible]
  );

  const active = ORDERED.find((s) => s.name === activeName) || ORDERED[0];
  const activeGroup = groupOf(active.group);
  const activeTone = TONE_HEX[toneOf(active.group)];

  const pickFilter = (id) => {
    setFilter(id);
    const first = id === 'all' ? ORDERED[0] : ORDERED.find((s) => s.group === id);
    if (first) setActiveName(first.name);
  };

  return (
    <Section id="skills" bloom="jade" bloomAt="left">
      <SectionHead
        index={2}
        eyebrow="Skills"
        title="What I bring to"
        accent="the table."
        sub="Mill-floor technical grounding, commercial instinct and a growing technology toolkit. Pick a domain, or hover any skill to see the work behind it."
      />

      <div className="sk">
        {/* ---------- left: constellation + readout ---------- */}
        <div className="sk-visual">
          <Reveal>
            <div className="sk-panel glass">
              <SkillConstellation
                activeName={activeName}
                dimmed={dimmed}
                onPick={setActiveName}
              />

              <div className="sk-readout" style={{ '--tone': activeTone }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="sk-readout-group mono">
                      <i className="sk-readout-swatch" />
                      {activeGroup?.label}
                    </span>
                    <h4>
                      <span className="sk-readout-icon">
                        <Icon name={active.icon} size={17} />
                      </span>
                      {active.name}
                    </h4>
                    <p>{active.note}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------- right: filters + skill list ---------- */}
        <div className="sk-list">
          <Reveal delay={0.08}>
            <div className="sk-filters" role="group" aria-label="Filter skills by domain">
              {[{ id: 'all', short: 'All', tone: 'saffron' }, ...SKILL_GROUPS].map((g) => {
                const on = filter === g.id;
                return (
                  <button
                    key={g.id}
                    className={`sk-chip ${on ? 'is-on' : ''}`}
                    style={{ '--tone': TONE_HEX[g.tone] }}
                    onClick={() => pickFilter(g.id)}
                    aria-pressed={on}
                  >
                    {on && (
                      <motion.span
                        layoutId="sk-chip-pill"
                        className="sk-chip-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="sk-chip-label">{g.short}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <ul className="sk-rows">
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((s) => {
                const on = s.name === activeName;
                return (
                  <motion.li
                    key={s.name}
                    layout
                    initial={{ opacity: 0, y: 18, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{ '--tone': TONE_HEX[toneOf(s.group)] }}
                  >
                    <button
                      className={`sk-row ${on ? 'is-on' : ''}`}
                      onMouseEnter={() => setActiveName(s.name)}
                      onFocus={() => setActiveName(s.name)}
                      onClick={() => setActiveName(s.name)}
                      aria-pressed={on}
                    >
                      <span className="sk-row-icon">
                        <Icon name={s.icon} size={17} />
                      </span>

                      <span className="sk-row-main">
                        <span className="sk-row-name">{s.name}</span>
                        <span className="sk-row-domain mono">{groupOf(s.group)?.short}</span>
                      </span>

                      <span className="sk-row-go">
                        <Icon name="arrowRight" size={15} />
                      </span>
                      <span className="sk-row-edge" aria-hidden="true" />
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </Section>
  );
}

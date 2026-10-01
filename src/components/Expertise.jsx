import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks';
import { GradientLine, Reveal, Section, SplitWords, Stagger, staggerItem } from './ui/Primitives';
import Icon from './ui/Icon';
import { LayerStack, TileFlow } from './fx/Stack3D';
import './expertise.css';

/* A visual "swatch" panel: a stack of dye bands + a huge line glyph
   that drifts against the scroll. Reads as the discipline's mood. */
function SwatchVisual({ glyph, tone }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['12%', '-12%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <div className={`swatch swatch-${tone}`} ref={ref}>
      <div className="swatch-bands" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-14% 0px' }}
            transition={{ duration: 0.9, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>

      <motion.span
        className="swatch-glyph"
        style={reduced ? undefined : { y, rotate }}
        aria-hidden="true"
      >
        <Icon name={glyph} size={200} stroke={0.7} />
      </motion.span>

      <svg className="swatch-stitch" viewBox="0 0 200 200" aria-hidden="true">
        <motion.path
          d="M10 150 C 50 90, 90 190, 130 110 S 180 40, 195 70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeDasharray="5 8"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}

/* Business reads as a pipeline (research → partnership, with the deal
   itself as the human gate); textile reads as layers checked one by one. */
const FLOW_KINDS = ['Research', 'Plan', 'Reach', 'Negotiate', 'Close'];
const FLOW_ORDER = ['Market Research', 'Sales Strategy', 'Client Acquisition', 'Negotiation', 'Business Growth & Partnerships'];

function Visual({ kind, data, glyph, tone }) {
  if (kind === 'flow') {
    const steps = FLOW_ORDER.map((t) => data.items.find((x) => x.title === t))
      .filter(Boolean)
      .map((x, i) => ({ kind: FLOW_KINDS[i], label: x.title.replace('Business Growth & ', '') }));
    return <TileFlow steps={steps} caption="From first research to a partnership that lasts." />;
  }
  if (kind === 'layers') {
    return (
      <LayerStack
        checks={data.items.slice(0, 4).map((x) => x.title)}
        caption="Fibre, fabric, colour, garment — each layer checked before it moves on."
      />
    );
  }
  return <SwatchVisual glyph={glyph} tone={tone} />;
}

export default function Expertise({
  id,
  data,
  tone = 'saffron',
  visual,
  flip = false,
}) {
  return (
    <Section id={id} bloom={tone} bloomAt={flip ? 'left' : 'right'}>
      <div className={`xpert ${flip ? 'xpert-flip' : ''}`}>
        <div className="xpert-copy">
          <Reveal>
            <span className="eyebrow">{data.eyebrow}</span>
          </Reveal>

          <h2 className="section-title">
            <SplitWords text={data.titleA} />{' '}
            <GradientLine delay={0.055 * data.titleA.trim().split(/\s+/).length + 0.05}>
              {data.titleB}
            </GradientLine>
          </h2>

          <Reveal delay={0.16}>
            <p className="section-sub xpert-sub">{data.sub}</p>
          </Reveal>

          <Stagger className="feature-grid" stagger={0.075} delay={0.1}>
            {data.items.map((item) => (
              <motion.div className="feat glass card" key={item.title} variants={staggerItem}>
                <span className={`feat-icon feat-icon-${tone}`}>
                  <Icon name={item.icon} size={19} />
                </span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
                <span className="feat-sheen" aria-hidden="true" />
              </motion.div>
            ))}
          </Stagger>
        </div>

        <div className="xpert-visual">
          <Reveal>
            <Visual kind={visual} data={data} glyph={data.glyph} tone={tone} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

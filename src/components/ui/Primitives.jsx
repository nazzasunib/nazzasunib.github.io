import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '../../hooks';
import './primitives.css';

/* =========================================================
   Section — scroll-linked shell every section shares.
   Handles the id anchor, the top hairline sweep, and the
   subtle parallax "dye bloom" that colours each section.
   ========================================================= */
export function Section({ id, bloom = 'saffron', bloomAt = 'left', children, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-14%', '14%']);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 0.5, 0.5, 0]);

  return (
    <section id={id} ref={ref} className={`sec ${className}`}>
      <motion.span
        aria-hidden="true"
        className={`sec-bloom bloom-${bloom} bloom-${bloomAt}`}
        style={{ y, opacity }}
      />
      <span aria-hidden="true" className="sec-hairline" />
      <div className="container sec-inner">{children}</div>
    </section>
  );
}

/* =========================================================
   SectionHead — eyebrow + title + sub, with word reveal.
   ========================================================= */
export function SectionHead({ index, eyebrow, title, accent, sub, align = 'left' }) {
  const words = String(title).trim().split(/\s+/).length;
  return (
    <div className={`sec-head sec-head-${align}`}>
      <Reveal>
        <span className="eyebrow">
          {index != null && <span className="idx">{String(index).padStart(2, '0')} /</span>}
          {eyebrow}
        </span>
      </Reveal>
      <h2 className="section-title">
        <SplitWords text={title} />{' '}
        {accent && (
          <GradientLine delay={0.055 * words + 0.05}>{accent}</GradientLine>
        )}
      </h2>
      {sub && (
        <Reveal delay={0.18}>
          <p className="section-sub">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

/* =========================================================
   GradientLine — gradient text that actually paints.

   `background-clip: text` clips a box's background to the glyphs
   of that box's OWN inline content. If the text is split into
   descendant inline-blocks (as SplitWords does) the gradient box
   has no text of its own and the clip region comes out empty, so
   nothing renders. So the gradient stays on the element holding
   the text node, and the reveal is a transform/opacity/blur move
   rather than an overflow mask — which also lets long accents
   wrap normally across lines.
   ========================================================= */
export function GradientLine({ children, delay = 0, duration = 0.95, className = '' }) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={`grad-text ${className}`}>{children}</span>;
  return (
    <motion.span
      className={`grad-text grad-line ${className}`}
      initial={{ y: '38%', opacity: 0, filter: 'blur(9px)' }}
      whileInView={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  );
}

/* =========================================================
   SplitWords — per-word mask-up reveal on scroll into view.

   Each word waits inside an `overflow: hidden` mask, so the word
   itself is clipped to zero area before it plays. An
   IntersectionObserver on the WORD would therefore never report it
   visible and the text would stay hidden forever. The observer goes
   on the unclipped wrapper instead, and the words animate through
   variant propagation rather than their own whileInView.
   ========================================================= */
const WORD_VARIANT = {
  hidden: { y: '108%', rotate: 4 },
  show: { y: '0%', rotate: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

export function SplitWords({ text, delay = 0, stagger = 0.055 }) {
  const reduced = useReducedMotion();
  const words = String(text).trim().split(/\s+/);
  if (reduced) return <>{text}</>;
  return (
    <motion.span
      className="split"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span className="word-mask">
            <motion.span className="word" variants={WORD_VARIANT}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </motion.span>
  );
}

/* =========================================================
   SplitChars — per-character reveal, used for the hero name.
   ========================================================= */
export function SplitChars({ text, delay = 0, stagger = 0.028, className = '' }) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;
  let n = -1;
  return (
    <span className={className}>
      {text.split(' ').map((word, wi) => (
        <span className="char-word" key={`w${wi}`}>
          {word.split('').map((ch, ci) => {
            n += 1;
            const at = n;
            return (
              <span className="char-mask" key={`c${wi}-${ci}`}>
                <motion.span
                  className="char"
                  initial={{ y: '110%', opacity: 0, rotate: 6 }}
                  animate={{ y: '0%', opacity: 1, rotate: 0 }}
                  transition={{
                    duration: 0.95,
                    delay: delay + at * stagger,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {ch}
                </motion.span>
              </span>
            );
          })}
          {wi < text.split(' ').length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

/* =========================================================
   Reveal — generic fade/slide on scroll into view.
   ========================================================= */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  x = 0,
  duration = 0.8,
  once = true,
  className = '',
  as = 'div',
}) {
  const reduced = useReducedMotion();
  const M = motion[as] || motion.div;
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, x, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-8% 0px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

/* =========================================================
   Stagger — parent/child list stagger helper.
   ========================================================= */
export function Stagger({ children, delay = 0, stagger = 0.08, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-8% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 30, scale: 0.97, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

/* =========================================================
   Magnetic — element leans toward the cursor.
   ========================================================= */
export function Magnetic({ children, strength = 0.28, className = '', as = 'div', ...rest }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });
  const reduced = useReducedMotion();
  const M = motion[as] || motion.div;

  const move = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <M
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      onMouseMove={move}
      onMouseLeave={reset}
      {...rest}
    >
      {children}
    </M>
  );
}

/* =========================================================
   Marquee — infinite horizontal ticker.
   ========================================================= */
export function Marquee({ items, speed = 26, className = '' }) {
  const reduced = useReducedMotion();
  const row = [...items, ...items];
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <motion.div
        className="marquee-row"
        animate={reduced ? {} : { x: ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {row.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
            <i className="marquee-dot" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './preloader.css';

const WORDS = ['Warping', 'Threading', 'Weaving', 'Finishing'];

export default function Preloader({ onDone }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const started = performance.now();
    const DURATION = 1750;
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - started) / DURATION);
      const eased = 1 - Math.pow(1 - p, 2.2);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 260);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const wordIndex = Math.min(WORDS.length - 1, Math.floor((pct / 100) * WORDS.length));

  return (
    <motion.div
      className="pre"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* loom warp threads drawing downward */}
      <svg className="pre-loom" viewBox="0 0 400 240" preserveAspectRatio="none" aria-hidden="true">
        {Array.from({ length: 13 }).map((_, i) => (
          <motion.line
            key={i}
            x1={14 + i * 31}
            y1="0"
            x2={14 + i * 31}
            y2="240"
            stroke="url(#preGrad)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.55 }}
            transition={{ duration: 1.1, delay: i * 0.045, ease: 'easeInOut' }}
          />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.path
            key={`weft-${i}`}
            d={`M0 ${34 + i * 46} C 100 ${14 + i * 46}, 300 ${58 + i * 46}, 400 ${30 + i * 46}`}
            stroke="url(#preGrad)"
            strokeWidth="1.4"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 1.35, delay: 0.25 + i * 0.13, ease: 'easeInOut' }}
          />
        ))}
        <defs>
          <linearGradient id="preGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#23d3b0" />
            <stop offset="45%" stopColor="#ffb020" />
            <stop offset="100%" stopColor="#8a6bff" />
          </linearGradient>
        </defs>
      </svg>

      <div className="pre-center">
        <motion.div
          className="pre-mark"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          NIS<span>Unib.</span>
        </motion.div>

        <div className="pre-bar">
          <motion.div className="pre-fill" style={{ width: `${pct}%` }} />
        </div>

        <div className="pre-meta mono">
          <motion.span
            key={wordIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {WORDS[wordIndex]}…
          </motion.span>
          <span className="pre-pct">{String(pct).padStart(3, '0')}</span>
        </div>
      </div>
    </motion.div>
  );
}

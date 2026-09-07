import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATES } from '../data/content';
import { Section, SectionHead } from './ui/Primitives';
import Icon from './ui/Icon';
import './certificates.css';

/* One scroll model only: the viewport scrolls natively (so snap points,
   trackpads, touch and keyboard all behave), and pointer drag maps onto
   scrollLeft rather than a transform. Mixing framer's `drag` with
   `overflow: auto` here would give two competing offsets. */
export default function Certificates() {
  const viewportRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 });
  const [edge, setEdge] = useState({ start: true, end: false });

  const readEdges = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const max = vp.scrollWidth - vp.clientWidth;
    setEdge({ start: vp.scrollLeft <= 2, end: vp.scrollLeft >= max - 2 });
  }, []);

  useEffect(() => {
    readEdges();
    const vp = viewportRef.current;
    vp?.addEventListener('scroll', readEdges, { passive: true });
    window.addEventListener('resize', readEdges);
    return () => {
      vp?.removeEventListener('scroll', readEdges);
      window.removeEventListener('resize', readEdges);
    };
  }, [readEdges]);

  const step = (dir) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const card = vp.querySelector('.cert');
    const amount = card ? card.offsetWidth + 16 : vp.clientWidth * 0.8;
    vp.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  const onPointerDown = (e) => {
    const vp = viewportRef.current;
    if (!vp || e.pointerType === 'touch') return; // native touch scrolling is better
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: vp.scrollLeft,
      moved: 0,
    };
    vp.setPointerCapture(e.pointerId);
    vp.classList.add('is-dragging');
  };

  const onPointerMove = (e) => {
    const vp = viewportRef.current;
    if (!vp || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(dx);
    vp.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = (e) => {
    const vp = viewportRef.current;
    if (!vp || !drag.current.active) return;
    drag.current.active = false;
    if (e?.pointerId != null && vp.hasPointerCapture(e.pointerId)) {
      vp.releasePointerCapture(e.pointerId);
    }
    vp.classList.remove('is-dragging');
  };

  return (
    <Section id="certificates" bloom="saffron" bloomAt="right">
      <div className="cert-head">
        <SectionHead
          index={9}
          eyebrow="Certificates"
          title="Credentials"
          accent="on file."
          sub="Drag the row or use the arrows. Swap these placeholders for your own certificates in src/data/content.js."
        />
        <div className="cert-nav">
          <button onClick={() => step(-1)} disabled={edge.start} aria-label="Previous certificates">
            <Icon name="chevLeft" size={18} stroke={2.2} />
          </button>
          <button onClick={() => step(1)} disabled={edge.end} aria-label="Next certificates">
            <Icon name="chevRight" size={18} stroke={2.2} />
          </button>
        </div>
      </div>

      <div
        className={`cert-viewport cur-drag ${edge.start ? 'at-start' : ''} ${
          edge.end ? 'at-end' : ''
        }`}
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="cert-track">
          {CERTIFICATES.map((c, i) => (
            <motion.article
              className="cert glass"
              key={i}
              initial={{ opacity: 0, y: 30, rotate: i % 2 ? 1.4 : -1.4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="cert-seal">
                <Icon name="award" size={19} />
              </span>
              <span className="cert-index mono">{String(i + 1).padStart(2, '0')}</span>
              <h4>{c.title}</h4>
              <span className="cert-org mono">{c.org}</span>
              <p>{c.note}</p>
              <span className="cert-perf" aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}

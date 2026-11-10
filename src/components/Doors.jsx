import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Section, SectionHead } from './ui/Primitives';
import { jumpToId, pauseScroll, resumeScroll } from '../lib/scroll';
import { useReducedMotion } from '../hooks';
import './doors.css';

/* =========================================================
   Doors — "Magic happens behind the doors".

   Each side of my work is a room. Hover a door and it opens
   a crack; click it and the camera walks you through: the
   door swings open, the frame grows to fill the screen, and
   you land inside that section of the page.
   ========================================================= */

const DOORS = [
  {
    id: 'craft',
    target: 'journey',
    room: 'The craft',
    label: 'Textile',
    color: '#2fb886',
    items: ['Spinning', 'Knitting', 'Dyeing', 'Garments'],
  },
  {
    id: 'business',
    target: 'business',
    room: 'Business',
    label: 'Business',
    color: '#3f6cf0',
    items: ['Partnerships', 'Sales strategy', 'Market research'],
  },
  {
    id: 'build',
    target: 'projects',
    room: 'What I build',
    label: 'Apps & Tech',
    color: '#e5a03a',
    items: ['Task Management', 'Money Keeper', 'MealMate'],
  },
  {
    id: 'desk',
    target: 'events',
    room: 'Off the desk',
    label: 'Events',
    color: '#e05d3d',
    items: ['Seminars', 'Club leadership', 'Refereeing'],
  },
];

function DoorArt({ color, label }) {
  return (
    <span className="door-frame" style={{ '--door': color }}>
      <span className="door-inside" />
      <span className="door-leaf">
        <span className="door-panel door-panel-a" />
        <span className="door-panel door-panel-b" />
        <span className="door-plate">{label}</span>
        <span className="door-knob" />
      </span>
    </span>
  );
}

export default function Doors() {
  const [busy, setBusy] = useState(false);
  const [walk, setWalk] = useState(null);
  const overlay = useRef(null);
  const reduced = useReducedMotion();

  const enter = (door, e) => {
    if (busy) return;
    if (reduced) {
      jumpToId(door.target);
      return;
    }
    const r = e.currentTarget.querySelector('.door-frame').getBoundingClientRect();
    setBusy(true);
    pauseScroll();
    setWalk({ door, r });

    /* run once the overlay has painted */
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const ov = overlay.current;
        if (!ov) return;
        const frame = ov.querySelector('.walk-frame');
        const leaf = ov.querySelector('.door-leaf');
        const title = ov.querySelector('.walk-title');
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const s = Math.max(vw / r.width, vh / r.height) * 1.25;
        const dx = vw / 2 - (r.left + r.width / 2);
        const dy = vh / 2 - (r.top + r.height / 2);

        ov.animate([{ background: 'rgba(0,0,0,0)' }, { background: 'rgba(0,0,0,0.55)' }], {
          duration: 500,
          fill: 'forwards',
        });
        leaf.animate([{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(-108deg)' }], {
          duration: 750,
          easing: 'cubic-bezier(.6,0,.3,1)',
          fill: 'forwards',
        });
        title.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: 350, fill: 'forwards' });
        const zoom = frame.animate(
          [
            { transform: 'translate(0,0) scale(1)' },
            { transform: `translate(${dx}px, ${dy}px) scale(${s})` },
          ],
          { duration: 950, delay: 450, easing: 'cubic-bezier(.7,0,.25,1)', fill: 'forwards' }
        );
        zoom.finished.then(() => {
          jumpToId(door.target);
          const out = ov.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 550, easing: 'ease-out', fill: 'forwards' });
          out.finished.then(() => {
            setWalk(null);
            setBusy(false);
            resumeScroll();
          });
        });
      })
    );
  };

  return (
    <Section id="doors" bloom="iris" bloomAt="center">
      <SectionHead
        eyebrow="Behind the doors"
        title="Magic happens"
        accent="behind the doors."
        sub="Four rooms, four sides of my work. Pick a door and step inside."
      />

      <div className="doors-row">
        {DOORS.map((d) => (
          <button
            type="button"
            className="door"
            key={d.id}
            onClick={(e) => enter(d, e)}
            aria-label={`Open the ${d.label} door: go to ${d.room}`}
          >
            <DoorArt color={d.color} label={d.label} />
            <span className="door-room">{d.room}</span>
            <span className="door-items mono">{d.items.join(' · ')}</span>
          </button>
        ))}
      </div>

      {walk &&
        createPortal(
        <div className="walk" ref={overlay} aria-hidden="true">
          <div
            className="walk-frame"
            style={{ left: walk.r.left, top: walk.r.top, width: walk.r.width, height: walk.r.height }}
          >
            <span className="door-frame" style={{ '--door': walk.door.color }}>
              <span className="door-inside">
                <span className="walk-title">{walk.door.room}</span>
              </span>
              <span className="door-leaf">
                <span className="door-panel door-panel-a" />
                <span className="door-panel door-panel-b" />
                <span className="door-plate">{walk.door.label}</span>
                <span className="door-knob" />
              </span>
            </span>
          </div>
        </div>,
        document.body
      )}
    </Section>
  );
}

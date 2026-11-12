import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Section, SectionHead } from './ui/Primitives';
import { jumpToId, pauseScroll, registerDoorOpener, resumeScroll, scrollToId } from '../lib/scroll';
import { useReducedMotion } from '../hooks';
import { BUSINESS, TEXTILE } from '../data/content';
import Experience from './Experience';
import Skills from './Skills';
import FabricJourney from './FabricJourney';
import Expertise from './Expertise';
import Projects from './Projects';
import GitHubPanel from './GitHubPanel';
import Events from './Events';
import Achievements from './Achievements';
import Social from './Social';
import Contact from './Contact';
import { CaseStudies, FabricProject, Now } from './Recruiter';
import './doors.css';

/* =========================================================
   DoorHall — everything after About lives behind a door.

   · Scroll down to a row of doors and the first closed door
     swings open by itself; its room (sections) unfolds below.
   · Under every room comes a new row with only the doors you
     have not opened yet, and the scroll opens the next one.
   · Click any door instead and you walk straight into that
     room; the row under it then holds every other unopened
     door, in their usual order.
   · Links to a section inside a closed door (navbar, footer)
     open that door first, then scroll to it.
   ========================================================= */

const DOORS = [
  {
    id: 'work',
    label: 'Experience',
    room: 'The work',
    color: '#7b5cf0',
    ids: ['experience', 'skills'],
    render: () => (
      <>
        <Experience />
        <Skills />
      </>
    ),
  },
  {
    id: 'craft',
    label: 'Textile',
    room: 'The craft',
    color: '#2fb886',
    ids: ['journey', 'textile', 'fabric'],
    render: () => (
      <>
        <FabricJourney />
        <Expertise id="textile" data={TEXTILE} tone="jade" visual="layers" flip />
        <FabricProject />
      </>
    ),
  },
  {
    id: 'business',
    label: 'Business',
    room: 'Business',
    color: '#3f6cf0',
    ids: ['business', 'casestudy', 'now'],
    render: () => (
      <>
        <Expertise id="business" data={BUSINESS} tone="saffron" visual="flow" />
        <CaseStudies />
        <Now />
      </>
    ),
  },
  {
    id: 'build',
    label: 'Apps & Tech',
    room: 'What I build',
    color: '#e5a03a',
    ids: ['projects', 'github'],
    render: (gh) => (
      <>
        <Projects gh={gh} />
        <GitHubPanel gh={gh} />
      </>
    ),
  },
  {
    id: 'desk',
    label: 'Events',
    room: 'Off the desk',
    color: '#e05d3d',
    ids: ['events', 'achievements', 'social'],
    render: () => (
      <>
        <Events />
        <Achievements />
        <Social />
      </>
    ),
  },
  {
    id: 'talk',
    label: 'Contact',
    room: "Let's talk",
    color: '#3a4152',
    ids: ['contact'],
    render: () => <Contact />,
  },
];
const byId = Object.fromEntries(DOORS.map((d) => [d.id, d]));

function Door({ door, state, onPick }) {
  return (
    <button
      type="button"
      className={`door ${state ? `is-${state}` : ''}`}
      onClick={(e) => onPick(door, e)}
      aria-label={state === 'open' ? `${door.label}: room is open` : `Open the ${door.label} door`}
    >
      <span className="door-frame" style={{ '--door': door.color }}>
        <span className="door-inside" />
        <span className="door-leaf">
          <span className="door-panel door-panel-a" />
          <span className="door-panel door-panel-b" />
          <span className="door-plate">{door.label}</span>
          <span className="door-knob" />
        </span>
      </span>
    </button>
  );
}

function DoorRow({ doors, openId, visited, onPick, rowRef, first }) {
  const grid = (
    <div className="doors-row" ref={rowRef} style={{ '--n': doors.length }}>
      {doors.map((d) => (
        <Door
          key={d.id}
          door={d}
          onPick={onPick}
          state={d.id === openId ? 'open' : openId ? (visited.includes(d.id) ? 'seen' : 'idle') : ''}
        />
      ))}
    </div>
  );
  if (first) {
    return (
      <Section id="doors" bloom="iris" bloomAt="center" className="doors-sec">
        <SectionHead
          eyebrow="Behind the doors"
          title="Magic happens"
          accent="behind the doors."
          sub="Scroll and the doors open one by one, or pick any door to step straight in."
        />
        {grid}
      </Section>
    );
  }
  return (
    <div className="doors-next">
      <div className="container">
        <span className="eyebrow" data-thread>
          Next door
        </span>
        {grid}
      </div>
    </div>
  );
}

export default function Doors({ gh }) {
  const [order, setOrder] = useState([]);
  const [fresh, setFresh] = useState(null);
  const [walk, setWalk] = useState(null);
  const orderRef = useRef(order);
  orderRef.current = order;
  const pendingRow = useRef(null);
  const overlay = useRef(null);
  const busy = useRef(false);
  const reduced = useReducedMotion();

  const open = useCallback((id) => {
    if (orderRef.current.includes(id)) return false;
    setOrder((o) => (o.includes(id) ? o : [...o, id]));
    setFresh(id);
    return true;
  }, []);

  /* links to a section inside a closed door: open it, then scroll there */
  useEffect(() => {
    registerDoorOpener((target) => {
      const door = DOORS.find((d) => d.ids.includes(target) || `room-${d.id}` === target);
      if (!door) return;
      open(door.id);
      setTimeout(() => scrollToId(target), 160);
    });
    return () => registerDoorOpener(null);
  }, [open]);

  /* scrolling down to the waiting row opens its first door */
  const remaining = DOORS.filter((d) => !order.includes(d.id));
  useEffect(() => {
    if (!remaining.length) return undefined;
    let armed = false;
    let raf = 0;
    const loop = () => {
      const el = pendingRow.current;
      if (el && !busy.current) {
        const top = el.getBoundingClientRect().top;
        const vh = window.innerHeight;
        if (top > vh * 0.62) armed = true;
        else if (armed && top < vh * 0.42) {
          armed = false;
          open(remaining[0].id);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [order, open]); // eslint-disable-line react-hooks/exhaustive-deps

  /* click: the door swings open and the camera walks you into the room */
  const pick = (door, e) => {
    if (busy.current) return;
    if (order.includes(door.id)) {
      scrollToId(`room-${door.id}`);
      return;
    }
    open(door.id);
    if (reduced) {
      setTimeout(() => jumpToId(`room-${door.id}`), 60);
      return;
    }
    const r = e.currentTarget.querySelector('.door-frame').getBoundingClientRect();
    busy.current = true;
    pauseScroll();
    setWalk({ door, r });
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
        ov.animate([{ background: 'rgba(0,0,0,0)' }, { background: 'rgba(0,0,0,0.55)' }], { duration: 500, fill: 'forwards' });
        leaf.animate([{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(-108deg)' }], {
          duration: 750,
          easing: 'cubic-bezier(.6,0,.3,1)',
          fill: 'forwards',
        });
        title.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: 350, fill: 'forwards' });
        frame
          .animate([{ transform: 'translate(0,0) scale(1)' }, { transform: `translate(${dx}px, ${dy}px) scale(${s})` }], {
            duration: 950,
            delay: 450,
            easing: 'cubic-bezier(.7,0,.25,1)',
            fill: 'forwards',
          })
          .finished.then(() => {
            resumeScroll();
            jumpToId(`room-${door.id}`, 0);
            ov.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 550, easing: 'ease-out', fill: 'forwards' }).finished.then(() => {
              setWalk(null);
              busy.current = false;
            });
          });
      })
    );
  };

  /* the doors each row showed = everything not yet opened before it */
  const rowDoors = (k) => DOORS.filter((d) => !order.slice(0, k).includes(d.id));

  return (
    <>
      {order.map((id, k) => (
        <Fragment key={id}>
          <DoorRow doors={rowDoors(k)} openId={id} visited={order} onPick={pick} first={k === 0} />
          <div
            className={`room ${fresh === id ? 'room-in' : ''}`}
            id={`room-${id}`}
            style={{ '--door': byId[id].color }}
            onAnimationEnd={(e) => e.target === e.currentTarget && setFresh(null)}
          >
            {byId[id].render(gh)}
          </div>
        </Fragment>
      ))}

      {remaining.length > 0 && (
        <DoorRow doors={remaining} visited={order} onPick={pick} rowRef={pendingRow} first={order.length === 0} />
      )}

      {walk &&
        createPortal(
          <div className="walk" ref={overlay} aria-hidden="true">
            <div className="walk-frame" style={{ left: walk.r.left, top: walk.r.top, width: walk.r.width, height: walk.r.height }}>
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
    </>
  );
}

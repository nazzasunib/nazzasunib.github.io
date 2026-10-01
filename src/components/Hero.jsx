import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EDUCATION, EXPERIENCE, PROFILE, SKILL_GROUPS } from '../data/content';
import { useReducedMotion, useTypewriter } from '../hooks';
import HeroField from './fx/HeroField';
import Icon from './ui/Icon';
import { scrollToId } from '../lib/scroll';
import './hero.css';

/* the gradient word under the name cycles through these */
const ROTATE = [
  'textile engineering',
  'business development',
  'AI & emerging tech',
  'merchandising',
  'web technologies',
];

/* the hero chat card answers from the portfolio's own data */
const CHAT = [
  { q: 'What do you do right now?', a: `${PROFILE.badge.title} ${PROFILE.badge.sub}.` },
  { q: 'Where did you study?', a: `${EDUCATION[0].title} — ${EDUCATION[0].org.split(' · ')[0]}.` },
  { q: 'Any industry experience?', a: `${EXPERIENCE[0].title.split(' — ')[0]} at ${EXPERIENCE[0].org}: ${EXPERIENCE[0].desc.split(';')[0].toLowerCase()}.` },
  { q: 'How can I reach you?', a: `Email ${PROFILE.email} — or use the contact form below.` },
];


/* ---------- rotating gradient word ---------- */
function useRotator(list, ms = 2600) {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => setI((v) => (v + 1) % list.length), ms);
    return () => clearInterval(id);
  }, [list.length, ms, reduced]);
  return [list[i], i];
}

/* ---------- chat demo: question appears, agent "types" the answer ---------- */
function useChatLoop(pairs) {
  const [log, setLog] = useState([]);
  const [typing, setTyping] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setLog([{ who: 'q', text: pairs[0].q }, { who: 'a', text: pairs[0].a }]);
      return undefined;
    }
    let dead = false;
    const timers = [];
    const wait = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)));

    (async () => {
      await wait(1400);
      for (let k = 0; !dead; k = (k + 1) % pairs.length) {
        const { q, a } = pairs[k];
        setLog((l) => [...l.slice(-2), { who: 'q', text: q }]);
        await wait(650);
        if (dead) return;
        setTyping(true);
        await wait(900);
        if (dead) return;
        setTyping(false);
        setLog((l) => [...l, { who: 'a', text: '' }]);
        for (let n = 0; n <= a.length && !dead; n += 2) {
          setLog((l) => {
            const c = l.slice();
            c[c.length - 1] = { who: 'a', text: a.slice(0, n) };
            return c;
          });
          await wait(22);
        }
        setLog((l) => {
          const c = l.slice();
          c[c.length - 1] = { who: 'a', text: a };
          return c;
        });
        await wait(2300);
      }
    })();

    return () => {
      dead = true;
      timers.forEach(clearTimeout);
    };
  }, [pairs, reduced]);

  return { log, typing };
}

/* ---------- voice-note timer ---------- */
function useClock() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setS((v) => (v + 1) % 60), 1000);
    return () => clearInterval(id);
  }, []);
  return `00:${String(s).padStart(2, '0')}`;
}

const WAVE = Array.from({ length: 22 }, (_, i) => 0.35 + ((Math.sin(i * 1.7) + 1) / 2) * 0.65);

export default function Hero() {
  const ref = useRef(null);
  const rig = useRef(null);
  const reduced = useReducedMotion();
  const [word, wi] = useRotator(ROTATE);
  const { log, typing } = useChatLoop(CHAT);
  const clock = useClock();
  const role = useTypewriter(PROFILE.roles, { type: 48, erase: 22, hold: 1500 });
  const [open, setOpen] = useState(false);

  /* approval card flips between "waiting on you" and "available" */
  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => setOpen((v) => !v), 3600);
    return () => clearInterval(id);
  }, [reduced]);

  /* card rig leans toward the pointer: ±12° yaw, ±9° pitch */
  useEffect(() => {
    const host = ref.current;
    const el = rig.current;
    if (!host || !el || reduced) return undefined;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--rx', (x * 12).toFixed(2));
      el.style.setProperty('--ry', (-y * 9).toFixed(2));
    };
    const leave = () => {
      el.style.setProperty('--rx', 0);
      el.style.setProperty('--ry', 0);
    };
    host.addEventListener('pointermove', move, { passive: true });
    host.addEventListener('pointerleave', leave);
    return () => {
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerleave', leave);
    };
  }, [reduced]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  const go = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section className="hx" id="home" ref={ref}>
      <HeroField hostRef={ref} />
      <div className="hx-spot" aria-hidden="true" />
      <span className="hx-arc" aria-hidden="true" />

      {/* slowly turning wireframe cubes */}
      <span className="hx-cube hx-cube-a" aria-hidden="true">
        {['f', 'b', 'l', 'r', 't', 'd'].map((f) => <i key={f} className={`cf cf-${f}`} />)}
      </span>
      <span className="hx-cube hx-cube-b" aria-hidden="true">
        {['f', 'b', 'l', 'r', 't', 'd'].map((f) => <i key={f} className={`cf cf-${f}`} />)}
      </span>

      <motion.div className="container hx-top" style={reduced ? undefined : { opacity: fade, y: lift }}>
        {/* ---------- copy ---------- */}
        <div className="hx-l">
          <a className="pill rise" href="#experience" onClick={go('experience')}>
            <b>New</b>
            {PROFILE.badge.title} {PROFILE.badge.sub.replace(' Ecosystem', '')}
            <Icon name="arrowRight" size={13} />
          </a>

          <h1 className="hx-h">
            <span className="hx-big rise" style={{ animationDelay: '.08s' }}>
              {PROFILE.first} <span className="hx-last">{PROFILE.last}</span>
            </span>
            <span className="hx-mid rise" style={{ animationDelay: '.16s' }}>
              working across
            </span>
            <span className="hx-rot rise" style={{ animationDelay: '.22s' }}>
              <span className="hx-word grad-text" key={wi}>
                {word}
              </span>
            </span>
          </h1>

          <p className="hx-intro rise" style={{ animationDelay: '.3s' }}>
            {PROFILE.intro}
          </p>

          <div className="hx-ctas rise" style={{ animationDelay: '.38s' }}>
            <a href="#projects" className="btn btn-primary" onClick={go('projects')}>
              View Projects
              <Icon name="arrowRight" size={15} />
            </a>
            <a href={PROFILE.resume} download="Nazzas-Ibn-Shams-Unib-Resume.pdf" className="btn btn-ghost">
              <Icon name="download" size={15} />
              Download Resume
            </a>
            <a href="#contact" className="btn btn-ghost" onClick={go('contact')}>
              Contact Me
            </a>
          </div>

          <ul className="hx-chan rise mono" style={{ animationDelay: '.46s' }}>
            {SKILL_GROUPS.map((g) => (
              <li key={g.id}>{g.short}</li>
            ))}
            <li>AI</li>
          </ul>
        </div>

        {/* ---------- tilting card rig ---------- */}
        <div className="hx-r">
          <div className="hx-rig" ref={rig}>
            {/* chat */}
            <div className="hvc hv-chat">
              <div className="hv-head">
                <span className="hv-av">NU</span>
                <b>Ask {PROFILE.first.split(' ')[0]}</b>
                <span className="chip">Chat</span>
              </div>
              <div className="hv-log">
                {log.map((m, i) => (
                  <p className={`hv-msg hv-${m.who}`} key={`${i}-${m.who}-${log.length}`}>
                    {m.text}
                  </p>
                ))}
                {typing && (
                  <p className="hv-msg hv-a hv-typing" aria-label="typing">
                    <i />
                    <i />
                    <i />
                  </p>
                )}
              </div>
              <div className="hv-compose">
                <span>Type a message…</span>
                <i>
                  <Icon name="arrowUp" size={12} stroke={2.4} />
                </i>
              </div>
            </div>

            {/* voice note */}
            <div className="hvc hv-voice">
              <div className="hv-row">
                <span className="chip">Voice note</span>
                <span className="mono hv-time">{clock}</span>
              </div>
              <div className="hv-wave" aria-hidden="true">
                {WAVE.map((h, i) => (
                  <i key={i} style={{ '--s': h, animationDelay: `${(i % 7) * -0.13}s` }} />
                ))}
              </div>
              <p className="hv-trans">
                <span className="mono">Role</span> {role}
                <span className="hv-caret" />
              </p>
            </div>

            {/* profile */}
            <div className="hvc hv-doc">
              <div className="hv-row">
                <span className="chip">Profile</span>
                <span className="hv-sub">{PROFILE.location.split(', ').slice(-2).join(', ')}</span>
              </div>
              <div className="hv-port">
                <img src={PROFILE.portrait} alt={`Portrait of ${PROFILE.name}`} loading="eager" />
                <span className="hv-scan" aria-hidden="true" />
              </div>
              <p className="hv-cap">{PROFILE.tagline}</p>
            </div>

            {/* approval */}
            <div className={`hvc hv-ap ${open ? 'is-ok' : ''}`}>
              <div className="hv-row">
                <span className={`chip ${open ? 'chip-ok' : 'chip-wait'}`}>
                  {open ? 'Available now' : 'Waiting on you'}
                </span>
                <span className="mono hv-sub">Recruiters &amp; partners</span>
              </div>
              <p className="hv-ask">{PROFILE.status}</p>
              <div className="hv-btns">
                <a href="#contact" className="hv-btn hv-btn-1" onClick={go('contact')}>
                  {open ? 'Say hello' : 'Approve'}
                </a>
                <a href={PROFILE.resume} download className="hv-btn">
                  Resume
                </a>
                <a href="#projects" className="hv-btn" onClick={go('projects')}>
                  Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ---------- live ticker ---------- */}
      <div className="hx-foot">
        <div className="tick">
          <div className="tk">
            {[...EXPERIENCE, ...EXPERIENCE].map((x, i) => (
              <span className={`it t-${x.tag.toLowerCase()}`} key={i}>
                <i />
                <b>{x.org}</b> · {x.title}
              </span>
            ))}
          </div>
        </div>
        <button className="scroll-cue" onClick={() => scrollToId('about')} aria-label="Scroll to about">
          <span className="livedot">
            <i />
            Scroll
          </span>
        </button>
      </div>
    </section>
  );
}

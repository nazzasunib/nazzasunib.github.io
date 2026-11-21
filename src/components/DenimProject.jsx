import { motion } from 'framer-motion';
import { DENIM_PROJECT as P } from '../data/content';
import { Reveal, Section, SectionHead } from './ui/Primitives';
import Icon from './ui/Icon';
import Share from './ui/Share';
import './denim.css';

/* =========================================================
   DenimProject — the B.Sc. thesis on denting order.
   Direct link: https://nazzasunib.github.io/#denting
   ========================================================= */

const EASE = [0.22, 1, 0.36, 1];

/* one reed row: dents as slots, warp ends as indigo threads */
function Reed({ pattern }) {
  return (
    <span className="dp-reed" aria-hidden="true">
      {pattern.map((n, i) => (
        <span className={`dp-dent ${n === 0 ? 'is-empty' : ''}`} key={i}>
          {Array.from({ length: n }, (_, k) => (
            <i key={k} />
          ))}
        </span>
      ))}
    </span>
  );
}

function Bars({ title, unit, rows, max }) {
  return (
    <div className="dp-chart glass">
      <div className="dp-chart-head">
        <h4>{title}</h4>
        <span className="dp-legend mono">
          <i className="is-warp" /> Warp <i className="is-weft" /> Weft
        </span>
      </div>
      <ul>
        {rows.map((r, i) => (
          <li key={r.name}>
            <span className="dp-bar-name">{r.name}</span>
            {['warp', 'weft'].map((k) => (
              <span className="dp-bar-row" key={k}>
                <span className="dp-bar-track">
                  <motion.span
                    className={`dp-bar is-${k}`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: r[k] / max }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.1, delay: 0.08 * i, ease: EASE }}
                  />
                </span>
                <b className="mono">
                  {r[k]} {unit}
                </b>
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DenimProject() {
  return (
    <Section id="denting" bloom="iris" bloomAt="right" className="dp">
      <SectionHead
        eyebrow={`${P.kind} · BUFT`}
        title="Denting order"
        accent="vs. denim quality."
        sub={P.title}
      />

      <Reveal>
        <div className="dp-actions">
          <a className="btn btn-primary" href={P.pdf} target="_blank" rel="noopener noreferrer">
            <Icon name="doc" size={15} />
            Read the full report
          </a>
          <a className="btn btn-ghost" href={P.pdf} download="Denting-Order-Denim-Thesis-BUFT.pdf">
            <Icon name="download" size={15} />
            Download PDF
          </a>
          <span className="dp-meta mono">
            {P.date} · {P.org}
          </span>
        </div>
      </Reveal>

      <div className="dp-grid">
        <Reveal className="dp-about glass">
          <h4 className="dp-h mono">The question</h4>
          <p>{P.summary}</p>
          <dl className="dp-setup">
            {P.setup.map((x) => (
              <div key={x.k}>
                <dt className="mono">{x.k}</dt>
                <dd>{x.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="dp-orders glass" delay={0.08}>
          <h4 className="dp-h mono">Four denting orders</h4>
          <ul>
            {P.orders.map((o) => (
              <li key={o.name}>
                <span className="dp-order-name">
                  <b>{o.name}</b>
                  <span>{o.note}</span>
                </span>
                <Reed pattern={o.pattern} />
              </li>
            ))}
          </ul>
          <p className="dp-note">Empty dents let the white weft show through as vertical stripes.</p>
        </Reveal>
      </div>

      <div className="dp-charts">
        <Reveal>
          <Bars title="Tear strength" unit="N" rows={P.tear} max={80} />
        </Reveal>
        <Reveal delay={0.08}>
          <Bars title="Tensile strength" unit="N" rows={P.tensile} max={820} />
        </Reveal>
      </div>

      <div className="dp-finds">
        {P.findings.map((f, i) => (
          <Reveal key={f.label} delay={0.06 * i}>
            <div className="dp-find glass">
              <span className="dp-find-v">{f.value}</span>
              <span className="dp-find-l">{f.label}</span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="dp-end glass">
          <p className="dp-conclusion">{P.conclusion}</p>
          <p className="dp-team">
            <span className="mono">Team</span> {P.team.join(' · ')}
          </p>
          <p className="dp-team">
            <span className="mono">Supervisor</span> {P.supervisor}
          </p>
          <Share title={P.title} hash={P.id} text={`B.Sc. thesis: ${P.title}`} />
        </div>
      </Reveal>
    </Section>
  );
}

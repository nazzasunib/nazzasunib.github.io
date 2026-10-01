/* Three CSS-3D figures used beside section copy.
   All are pure CSS transforms + keyframes, so they cost nothing when idle
   and freeze cleanly under prefers-reduced-motion. Styles live in fx.css. */
import './fx.css';

/* LayerStack — glass sheets stacked on a tilted plane, read top to bottom.
   Check tags pop in one after another, like each layer being verified. */
export function LayerStack({ checks = [], caption }) {
  return (
    <div className="fx-panel fx-layers">
      <div className="ls-scene" aria-hidden="true">
        <div className="ls-plane">
          {[0, 1, 2, 3].map((i) => (
            <div className={`ls-sheet ls-${i}`} key={i} style={{ '--i': i }}>
              <span className="ls-line" style={{ width: '62%' }} />
              <span className="ls-line" style={{ width: '78%' }} />
              <span className="ls-line" style={{ width: '44%' }} />
              {i === 0 && <span className="ls-scan" />}
            </div>
          ))}
        </div>
      </div>
      <ul className="ls-tags">
        {checks.map((c, i) => (
          <li key={c} style={{ '--d': `${i * 0.9}s` }}>
            <span className="ls-tick">✓</span>
            {c}
          </li>
        ))}
      </ul>
      {caption && (
        <div className="fx-cap">
          <span className="fx-note">{caption}</span>
        </div>
      )}
    </div>
  );
}

/* TileFlow — a row of tiles on a 3D floor. A light packet travels from the
   first tile to the last; each tile lights as it arrives. The final tile is
   the human decision, so it glows amber instead of the signal colour. */
export function TileFlow({ steps = [], caption }) {
  const n = steps.length;
  return (
    <div className="fx-panel fx-tiles" style={{ '--n': n }}>
      <div className="tf-scene">
        <div className="tf-floor">
          <span className="tf-wire" aria-hidden="true" />
          <span className="tf-packet" aria-hidden="true" />
          {steps.map((s, i) => (
            <div
              className={`tf-tile ${i === n - 1 ? 'tf-last' : ''}`}
              key={s.label}
              style={{ '--i': i }}
            >
              <span className="tf-face" />
              <span className="tf-lbl">
                <small className="mono">{s.kind}</small>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      {caption && (
        <div className="fx-cap">
          <span className="fx-note">{caption}</span>
        </div>
      )}
    </div>
  );
}

/* Ring3D — cards standing on a turning ring (a CSS carousel). */
export function Ring3D({ items = [], caption }) {
  const n = items.length;
  return (
    <div className="fx-panel fx-ring" style={{ '--n': n }}>
      <div className="rg-scene" aria-hidden="true">
        <div className="rg-spin">
          {items.map((it, i) => (
            <div className="rg-card" key={`${it.title}-${i}`} style={{ '--i': i, '--tone': it.tone }}>
              <span className="rg-kind mono">{it.kind}</span>
              <b>{it.title}</b>
            </div>
          ))}
        </div>
      </div>
      {caption && (
        <div className="fx-cap">
          <span className="fx-note">{caption}</span>
        </div>
      )}
    </div>
  );
}

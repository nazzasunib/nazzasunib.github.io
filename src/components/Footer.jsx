import { NAV, PROFILE, SOCIALS } from '../data/content';
import { Marquee, Reveal } from './ui/Primitives';
import Icon from './ui/Icon';
import { scrollToId } from '../lib/scroll';
import './footer.css';

const TICKER = ['Textile', 'Business', 'Technology', 'Innovation', 'Growth'];

export default function Footer() {
  const go = (e, id) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <footer className="foot">
      <svg className="foot-wave" viewBox="0 0 1200 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,0 C300,88 900,2 1200,58 L1200,0 L0,0 Z" fill="#08070f" />
      </svg>

      <div className="foot-marquee">
        <Marquee items={TICKER} speed={34} />
      </div>

      <div className="container foot-inner">
        <div className="foot-grid">
          <Reveal className="foot-brand">
            <a href="#home" className="foot-logo" onClick={(e) => go(e, 'home')}>
              {PROFILE.logo.mark}
              <span>{PROFILE.logo.tail}</span>
            </a>
            <p>{PROFILE.intro.split('.')[0]}.</p>
            <a className="foot-mail" href={`mailto:${PROFILE.email}`}>
              {PROFILE.email}
              <Icon name="arrowUpRight" size={15} />
            </a>
          </Reveal>

          <Reveal delay={0.08} className="foot-col">
            <h5 className="mono">Sections</h5>
            <ul>
              {NAV.slice(0, 5).map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} onClick={(e) => go(e, n.id)}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.14} className="foot-col">
            <h5 className="mono">More</h5>
            <ul>
              {NAV.slice(5).map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} onClick={(e) => go(e, n.id)}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="foot-col">
            <h5 className="mono">Elsewhere</h5>
            <div className="foot-socials">
              {SOCIALS.slice(0, 6).map((s, i) => (
                <a
                  key={`${s.name}-${i}`}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  style={{ '--tone': s.tone }}
                >
                  <Icon name={s.icon} size={17} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="foot-bottom">
          <span>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </span>
          <span className="mono foot-tagline">{PROFILE.tagline}</span>
        </div>
      </div>
    </footer>
  );
}

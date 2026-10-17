import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useScrollLock, useTilt } from '../hooks';
import { Reveal, Section, SectionHead, Stagger, staggerItem } from './ui/Primitives';
import { FEATURED_PROJECTS, PINNED_REPOS, projectImage } from '../data/content';
import Icon from './ui/Icon';
import Share from './ui/Share';
import './projects.css';

const EASE = [0.22, 1, 0.36, 1];
const LINK_ICON = { web: 'globe', android: 'download', apk: 'download', code: 'code' };

/* =========================================================
   FeaturedCard — tilts toward the pointer (unchanged motion),
   and the whole card opens the project's details.
   ========================================================= */
function FeaturedCard({ p, index, onOpen }) {
  const [ref, tilt, handlers] = useTilt({ max: 7 });
  const web = p.links.find((l) => l.kind === 'web');

  const open = () => onOpen(p);
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  };

  return (
    <motion.article className="proj proj-featured" variants={staggerItem}>
      <div
        ref={ref}
        className="proj-inner glass card"
        {...handlers}
        role="button"
        tabIndex={0}
        aria-label={`${p.name}: view details`}
        onClick={open}
        onKeyDown={onKey}
        style={{
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
          '--gx': `${tilt.gx}%`,
          '--gy': `${tilt.gy}%`,
        }}
      >
        <span className="proj-spot" aria-hidden="true" />
        <span className="proj-index mono">{String(index + 1).padStart(2, '0')}</span>

        <div className="proj-thumb has-cover">
          <img className="proj-cover" src={encodeURI(p.logo)} alt={`${p.name} logo`} loading="lazy" decoding="async" />
          <span className="proj-thumb-grid" aria-hidden="true" />
        </div>

        <div className="proj-body">
          <h4>{p.name}</h4>
          <p>{p.tagline}</p>

          <div className="proj-tags">
            {p.tags.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>

          <div className="proj-links">
            <span className="proj-more">
              View details
              <Icon name="arrowRight" size={14} />
            </span>
            {web && (
              <a
                href={web.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <Icon name="globe" size={14} />
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   RepoCard — other GitHub repositories (links only)
   ========================================================= */
function RepoCard({ repo }) {
  const [ref, tilt, handlers] = useTilt({ max: 7 });
  const cover = projectImage(repo.name);
  const topics =
    repo.topics && repo.topics.length ? repo.topics.slice(0, 4) : repo.language ? [repo.language] : [];

  return (
    <motion.article className="proj" variants={staggerItem}>
      <div
        ref={ref}
        className="proj-inner glass card"
        {...handlers}
        style={{
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
          '--gx': `${tilt.gx}%`,
          '--gy': `${tilt.gy}%`,
        }}
      >
        <span className="proj-spot" aria-hidden="true" />
        <div className={`proj-thumb proj-thumb-sm${cover ? ' has-cover' : ''}`}>
          {cover ? (
            <img className="proj-cover" src={encodeURI(cover)} alt={`${repo.name} preview`} loading="lazy" decoding="async" />
          ) : (
            <Icon name="code" size={26} stroke={1.4} />
          )}
          <span className="proj-thumb-grid" aria-hidden="true" />
        </div>
        <div className="proj-body">
          <h4>{repo.name.replace(/[-_]/g, ' ')}</h4>
          {repo.description && <p>{repo.description}</p>}
          {topics.length > 0 && (
            <div className="proj-tags">
              {topics.map((t) => (
                <span className="chip" key={t}>
                  {t}
                </span>
              ))}
            </div>
          )}
          <div className="proj-links">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <Icon name="link" size={14} />
              Repository
            </a>
            {repo.homepage && (
              <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                <Icon name="globe" size={14} />
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   ProjectModal — the full write-up for one app
   ========================================================= */
function ProjectModal({ p, onClose }) {
  useScrollLock(true);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <motion.div
      className="pm-scrim"
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="pm glass"
        role="dialog"
        aria-modal="true"
        aria-label={p.name}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 26, scale: 0.98 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <button className="pm-close" onClick={onClose} aria-label="Close details">
          <Icon name="close" size={18} stroke={2.2} />
        </button>

        <header className="pm-head">
          <span className="pm-logo">
            <img src={encodeURI(p.logo)} alt="" />
          </span>
          <div>
            <h3>{p.name}</h3>
            <p className="pm-tagline">{p.tagline}</p>
            <div className="proj-tags">
              {p.tags.map((t) => (
                <span className="chip" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className="pm-links">
          {p.links.map((l, i) => (
            <a
              key={l.url}
              className={`btn ${i === 0 ? 'btn-primary' : 'btn-ghost'}`}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name={LINK_ICON[l.kind] || 'arrowUpRight'} size={15} />
              {l.label}
            </a>
          ))}
        </div>

        <div className="pm-body">
          <section>
            <h4 className="pm-h mono">About</h4>
            {p.about.map((t, i) => (
              <p className="pm-p" key={i}>
                {t}
              </p>
            ))}
          </section>

          <section>
            <h4 className="pm-h mono">Features</h4>
            <ul className="pm-feats">
              {p.features.map((f) => (
                <li key={f.t}>
                  <span className="pm-tick">
                    <Icon name="check" size={13} stroke={2.2} />
                  </span>
                  <div>
                    <b>{f.t}</b>
                    <span>{f.d}</span>
                    {f.sub && (
                      <ul className="pm-sub">
                        {f.sub.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {p.roles && (
            <section>
              <h4 className="pm-h mono">Roles</h4>
              <div className="pm-roles">
                {p.roles.map((r) => (
                  <div className="pm-role" key={r.t}>
                    <b>{r.t}</b>
                    <span>{r.d}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {p.audience && (
            <section>
              <h4 className="pm-h mono">Who is it for</h4>
              <p className="pm-p">{p.audience}</p>
            </section>
          )}

          {p.install && (
            <section className="pm-install">
              <h4 className="pm-h mono">How to install</h4>
              <p className="pm-p">{p.install}</p>
            </section>
          )}

          <Share title={`${p.name} by Nazzas Unib`} hash="projects" text={`${p.name}: ${p.tagline}`} />
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function Projects({ gh }) {
  const [open, setOpen] = useState(null);
  const featuredNames = new Set(FEATURED_PROJECTS.map((p) => p.repoName));
  /* skip the featured apps and this website's own repositories */
  const isSite = (n) => n === 'nazzasunib.github.io' || n.includes('portfolio');
  const others = gh.repos
    .filter((r) => {
      const n = String(r.name).toLowerCase();
      if (featuredNames.has(n) || isSite(n)) return false;
      if (PINNED_REPOS.length) return PINNED_REPOS.includes(n);
      return !r.fork && Boolean(r.description);
    })
    .slice(0, 6);

  return (
    <>
      <Section id="projects" bloom="saffron" bloomAt="left">
        <SectionHead
          eyebrow="Projects"
          title="Things I've"
          accent="built and shipped."
          sub="Apps I designed and released for everyday users in Bangladesh. Tap any card for the full rundown."
        />

        <Stagger className="projects-grid" stagger={0.09}>
          {FEATURED_PROJECTS.map((p, i) => (
            <FeaturedCard p={p} index={i} key={p.id} onOpen={setOpen} />
          ))}
        </Stagger>

        {others.length > 0 && (
          <>
            <Reveal>
              <h4 className="proj-more-head mono">More on GitHub</h4>
            </Reveal>
            <Stagger className="projects-grid projects-grid-sm" stagger={0.07}>
              {others.map((repo, i) => (
                <RepoCard repo={repo} key={`${repo.name}-${i}`} />
              ))}
            </Stagger>
          </>
        )}
      </Section>

      <AnimatePresence>{open && <ProjectModal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  );
}

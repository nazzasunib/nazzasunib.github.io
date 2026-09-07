import { motion } from 'framer-motion';
import { PROFILE } from '../data/content';
import { useCountUp } from '../hooks';
import { Reveal, Section, SectionHead, Stagger, staggerItem } from './ui/Primitives';
import Icon from './ui/Icon';
import './github.css';

const LANG_TONES = ['#ffb020', '#ff5c39', '#23d3b0', '#8a6bff', '#ff7db0', '#f5f2ea'];

function GhStat({ label, value, icon }) {
  const [ref, shown] = useCountUp(value ?? 0, { duration: 1500 });
  return (
    <motion.div className="gh-stat glass" variants={staggerItem} whileHover={{ y: -6 }} ref={ref}>
      <span className="gh-stat-icon">
        <Icon name={icon} size={16} />
      </span>
      <span className="gh-stat-n">{value == null ? '—' : shown}</span>
      <span className="gh-stat-l">{label}</span>
    </motion.div>
  );
}

export default function GitHubPanel({ gh }) {
  const { stats, langs, status, error } = gh;

  return (
    <Section id="github" bloom="iris" bloomAt="center">
      <SectionHead
        index={5}
        eyebrow="GitHub"
        title="Activity &"
        accent="tech stack."
        sub={
          <>
            Live stats pulled from{' '}
            <a
              className="gh-link"
              href={`https://github.com/${PROFILE.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/{PROFILE.github}
            </a>
            .
          </>
        }
      />

      <Stagger className="gh-panel" stagger={0.08}>
        <GhStat label="Public Repos" value={stats.repos} icon="code" />
        <GhStat label="Followers" value={stats.followers} icon="users" />
        <GhStat label="Following" value={stats.following} icon="spark" />
        <GhStat label="Total Stars" value={stats.stars} icon="star" />
      </Stagger>

      <Reveal delay={0.12}>
        <div className="gh-langs glass">
          <div className="gh-langs-head">
            <h4>Language breakdown</h4>
            <span className={`gh-pill mono gh-pill-${status}`}>
              {status === 'loading' ? 'Syncing' : status === 'error' ? 'Offline' : 'Live'}
            </span>
          </div>

          {status === 'loading' && (
            <div className="lang-rows">
              {[0, 1, 2].map((i) => (
                <div className="lang-row lang-skeleton" key={i}>
                  <span className="lang-name shimmer" />
                  <span className="lang-track">
                    <span className="lang-fill shimmer" style={{ width: `${60 - i * 14}%` }} />
                  </span>
                  <span className="lang-pct shimmer" />
                </div>
              ))}
            </div>
          )}

          {status === 'error' && (
            <p className="gh-note">
              Couldn&rsquo;t reach the GitHub API right now (offline or rate-limited). This fills in
              automatically on the next successful load.
              {error ? <span className="gh-err mono"> {error}</span> : null}
            </p>
          )}

          {status === 'ready' && langs.length === 0 && (
            <p className="gh-note">
              No language data available yet — add some repositories to see this fill in.
            </p>
          )}

          {status === 'ready' && langs.length > 0 && (
            <div className="lang-rows">
              {langs.map((l, i) => (
                <motion.div
                  className="lang-row"
                  key={l.name}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                >
                  <span className="lang-name">{l.name}</span>
                  <span className="lang-track">
                    <motion.span
                      className="lang-fill"
                      style={{ background: LANG_TONES[i % LANG_TONES.length] }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.pct}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.05,
                        delay: 0.15 + i * 0.09,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </span>
                  <span className="lang-pct mono">{l.pct}%</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  );
}

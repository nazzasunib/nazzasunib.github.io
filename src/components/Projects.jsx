import { motion } from 'framer-motion';
import { useTilt } from '../hooks';
import { Section, SectionHead, Stagger, staggerItem } from './ui/Primitives';
import Icon from './ui/Icon';
import './projects.css';

function ProjectCard({ repo, index }) {
  const [ref, tilt, handlers] = useTilt({ max: 7 });
  const topics =
    repo.topics && repo.topics.length
      ? repo.topics.slice(0, 4)
      : repo.language
        ? [repo.language]
        : ['code'];

  return (
    <motion.article className="proj" variants={staggerItem}>
      <div
        ref={ref}
        className="proj-inner glass"
        {...handlers}
        style={{
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
          '--gx': `${tilt.gx}%`,
          '--gy': `${tilt.gy}%`,
        }}
      >
        <span className="proj-spot" aria-hidden="true" />
        <span className="proj-index mono">{String(index + 1).padStart(2, '0')}</span>

        <div className="proj-thumb">
          <Icon name="code" size={30} stroke={1.4} />
          <span className="proj-thumb-grid" aria-hidden="true" />
        </div>

        <div className="proj-body">
          <h4>{repo.name}</h4>
          <p>
            {repo.description ||
              'No description provided yet — add one on GitHub to display it here.'}
          </p>

          <div className="proj-tags">
            {topics.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>

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
            {repo.stargazers_count > 0 && (
              <span className="proj-stars">
                <Icon name="star" size={13} />
                {repo.stargazers_count}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ gh }) {
  return (
    <Section id="projects" bloom="saffron" bloomAt="left">
      <SectionHead
        index={4}
        eyebrow="Projects"
        title="Things I've"
        accent="built & explored."
        sub={
          gh.live
            ? 'Pulled live from GitHub — top repositories by stars and recent activity.'
            : 'A working set of projects; the live GitHub feed fills this in automatically when reachable.'
        }
      />

      <Stagger className="projects-grid" stagger={0.09}>
        {gh.repos.map((repo, i) => (
          <ProjectCard repo={repo} index={i} key={`${repo.name}-${i}`} />
        ))}
      </Stagger>
    </Section>
  );
}

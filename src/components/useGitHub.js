import { useEffect, useState } from 'react';
import { FALLBACK_PROJECTS, PROFILE } from '../data/content';

const API = 'https://api.github.com';

/* Single fetch shared by Projects + GitHub sections: profile counts,
   top repos and a language breakdown. Falls back to the static list
   when the API is offline or rate-limited. */
export default function useGitHub() {
  const [state, setState] = useState({
    status: 'loading',
    repos: FALLBACK_PROJECTS,
    live: false,
    stats: { repos: null, followers: null, following: null, stars: null },
    langs: [],
    error: null,
  });

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const [userRes, repoRes] = await Promise.all([
          fetch(`${API}/users/${PROFILE.github}`),
          fetch(`${API}/users/${PROFILE.github}/repos?per_page=100&sort=updated`),
        ]);
        if (!userRes.ok) throw new Error(`profile request failed (${userRes.status})`);
        if (!repoRes.ok) throw new Error(`repos request failed (${repoRes.status})`);

        const user = await userRes.json();
        const repos = await repoRes.json();
        if (!alive) return;

        const list = Array.isArray(repos) ? repos : [];
        const stars = list.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

        const top = [...list]
          .filter((r) => !r.fork)
          .sort(
            (a, b) =>
              (b.stargazers_count || 0) - (a.stargazers_count || 0) ||
              new Date(b.updated_at) - new Date(a.updated_at)
          )
          .slice(0, 6);

        const counts = {};
        list.forEach((r) => {
          if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
        });
        const entries = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6);
        const total = entries.reduce((s, [, c]) => s + c, 0) || 1;

        setState({
          status: 'ready',
          repos: top.length ? top : FALLBACK_PROJECTS,
          live: top.length > 0,
          stats: {
            repos: user.public_repos ?? null,
            followers: user.followers ?? null,
            following: user.following ?? null,
            stars,
          },
          langs: entries.map(([name, count]) => ({
            name,
            pct: Math.round((count / total) * 100),
          })),
          error: null,
        });
      } catch (err) {
        if (!alive) return;
        setState((prev) => ({
          ...prev,
          status: 'error',
          repos: FALLBACK_PROJECTS,
          live: false,
          error: err.message,
        }));
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return state;
}

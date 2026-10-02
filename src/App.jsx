import { useEffect } from 'react';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NameReveal from './components/NameReveal';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import GitHubPanel from './components/GitHubPanel';
import Expertise from './components/Expertise';
import Events from './components/Events';
import Achievements from './components/Achievements';
import Social from './components/Social';
import { CaseStudies, FabricProject, Now } from './components/Recruiter';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { BackToTop, CardGlow, ScrollProgress } from './components/Ambient';

import useGitHub from './components/useGitHub';
import { useReducedMotion } from './hooks';
import { registerLenis } from './lib/scroll';
import { BUSINESS, TEXTILE } from './data/content';

export default function App() {
  const gh = useGitHub();
  const reduced = useReducedMotion();

  /* Lenis inertial scrolling, driven by rAF. Skipped when the visitor
     prefers reduced motion so native scrolling stays untouched. */
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      /* Lenis defaults, the same feel as the reference site */
      lerp: 0.1,
      smoothWheel: true,
    });
    registerLenis(lenis);

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      registerLenis(null);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduced]);


  return (
    <>

      {/* ambient layers */}
      <span className="tex-grid" aria-hidden="true" />
      <span className="tex-noise" aria-hidden="true" />

      <ScrollProgress />
      <CardGlow />
      <Navbar />

      <main>
        <NameReveal />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Expertise id="textile" data={TEXTILE} tone="jade" visual="layers" flip />
        <Now />
        <CaseStudies />
        <Projects gh={gh} />
        <FabricProject />
        <GitHubPanel gh={gh} />
        <Expertise id="business" data={BUSINESS} tone="saffron" visual="flow" />
        <Events />
        <Achievements />
        <Social />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}

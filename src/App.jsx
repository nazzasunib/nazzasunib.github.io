import { useEffect, useRef } from 'react';
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
import FabricJourney from './components/FabricJourney';
import ChapterCut from './components/fx/ChapterCut';
import StoryThread from './components/fx/StoryThread';
import { BackToTop, CardGlow, ScrollProgress } from './components/Ambient';

import useGitHub from './components/useGitHub';
import { useReducedMotion } from './hooks';
import { registerLenis } from './lib/scroll';
import { BUSINESS, TEXTILE } from './data/content';

export default function App() {
  const gh = useGitHub();
  const mainRef = useRef(null);
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

      <main ref={mainRef}>
        <StoryThread hostRef={mainRef} />
        <NameReveal />
        <Hero />
        <About />
        <ChapterCut n="01" title="The work" kicker="Where I have put in the hours, and what I learned there." />
        <Experience />
        <Skills />
        <ChapterCut n="02" title="The craft" kicker="Textile engineering, told the way a mill sees it." />
        <FabricJourney />
        <Expertise id="textile" data={TEXTILE} tone="jade" visual="layers" flip />
        <Now />
        <CaseStudies />
        <ChapterCut n="03" title="What I build" kicker="Apps, projects and the code behind them." />
        <Projects gh={gh} />
        <FabricProject />
        <GitHubPanel gh={gh} />
        <Expertise id="business" data={BUSINESS} tone="saffron" visual="flow" />
        <ChapterCut n="04" title="Off the desk" kicker="Events, recognition and the people I met along the way." />
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

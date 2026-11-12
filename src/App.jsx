import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Doors from './components/Doors';
import About from './components/About';
import Footer from './components/Footer';
import StoryThread from './components/fx/StoryThread';
import ScrubDriver from './components/fx/ScrubDriver';
import { BackToTop, CardGlow, ScrollProgress } from './components/Ambient';

import useGitHub from './components/useGitHub';
import { useReducedMotion } from './hooks';
import { registerLenis } from './lib/scroll';

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
        <ScrubDriver />
        <Hero />
        <About />
        <Doors gh={gh} />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}

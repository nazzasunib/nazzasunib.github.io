import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import GitHubPanel from './components/GitHubPanel';
import Expertise from './components/Expertise';
import Events from './components/Events';
import Certificates from './components/Certificates';
import Social from './components/Social';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { BackToTop, Cursor, FloatingGlyphs, ScrollProgress } from './components/Ambient';

import useGitHub from './components/useGitHub';
import { useReducedMotion, useScrollLock } from './hooks';
import { registerLenis } from './lib/scroll';
import { BUSINESS, TEXTILE } from './data/content';

export default function App() {
  const [loading, setLoading] = useState(true);
  const gh = useGitHub();
  const reduced = useReducedMotion();

  /* Lenis inertial scrolling, driven by rAF. Skipped when the visitor
     prefers reduced motion so native scrolling stays untouched. */
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
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

  /* hold the page at the top while the preloader is up */
  useScrollLock(loading);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {/* ambient layers */}
      <FloatingGlyphs count={28} />
      <span className="tex-weave" aria-hidden="true" />
      <span className="tex-noise" aria-hidden="true" />

      <ScrollProgress />
      <Cursor />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects gh={gh} />
        <GitHubPanel gh={gh} />
        <Expertise id="business" index={6} data={BUSINESS} tone="saffron" />
        <Expertise id="textile" index={7} data={TEXTILE} tone="jade" flip />
        <Events />
        <Certificates />
        <Social />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}

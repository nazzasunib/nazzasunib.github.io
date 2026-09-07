import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV, PROFILE } from '../data/content';
import { useActiveSection, useScrollLock } from '../hooks';
import { Magnetic } from './ui/Primitives';
import { scrollToId } from '../lib/scroll';
import Icon from './ui/Icon';
import './navbar.css';

const IDS = ['home', ...NAV.map((n) => n.id)];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(IDS);
  useScrollLock(open);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 26);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'nav-scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container nav-inner">
          <a href="#home" className="nav-logo" onClick={(e) => go(e, 'home')}>
            <span className="nav-logo-mark">{PROFILE.logo.mark}</span>
            <span className="nav-logo-tail">{PROFILE.logo.tail}</span>
            <span className="nav-logo-thread" />
          </a>

          <nav className="nav-links" aria-label="Sections">
            {NAV.slice(0, 8).map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => go(e, item.id)}
                className={active === item.id ? 'is-active' : ''}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="nav-label">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="nav-right">
            <Magnetic strength={0.2}>
              <a href="#contact" className="btn btn-primary nav-cta" onClick={(e) => go(e, 'contact')}>
                Let&rsquo;s Talk
                <Icon name="arrowRight" size={15} />
              </a>
            </Magnetic>

            <button
              className={`burger ${open ? 'burger-open' : ''}`}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(155% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="menu-inner">
              <span className="eyebrow">Navigate</span>
              <ul className="menu-list">
                {NAV.map((item, i) => (
                  <li key={item.id}>
                    <motion.a
                      href={`#${item.id}`}
                      onClick={(e) => go(e, item.id)}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.18 + i * 0.045, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="menu-num mono">{String(i + 1).padStart(2, '0')}</span>
                      <span className="menu-text">{item.label}</span>
                      <Icon name="arrowUpRight" size={20} className="menu-go" />
                    </motion.a>
                  </li>
                ))}
              </ul>
              <motion.div
                className="menu-foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                <span className="mono">{PROFILE.tagline}</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { getLenis } from '../../hooks/useLenis';
import './Header.css';


const NAV_LINKS = [
  { label: 'Home',     href: '#hero'     },
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
];

export default function Header() {
  const [scrolled,      setScrolled]  = useState(false);
  const [menuOpen,      setMenuOpen]  = useState(false);
  const [activeSection, setActive]    = useState('hero');
  const headerRef = useRef(null);

  // ── Entrance Animation ──────────────────────────────────
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      
      tl.to(header, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'expo.out',
        force3D: true
      });

      // Subtle stagger for internal items
      tl.from('.logo, .nav-item, .header-cta', {
        y: -10,
        opacity: 0,
        stagger: 0.05,
        duration: 1.0,
        ease: 'power3.out',
        clearProps: 'all'
      }, 0.2);
    });

    return () => ctx.revert();
  }, []);

  // ── Scroll detection ────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Active section via IntersectionObserver ───────────────
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-40% 0px -40% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  function handleNavClick(e, href) {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target, { 
        offset: -68, 
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Liquid Expo curve
      });
    } else {
      // Fallback if lenis not ready
      const offset = 68;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset });
    }
  }

  return (
    <header 
      ref={headerRef}
      className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}
    >
      <div className="container">
        <nav className="header-nav">
          <a href="#hero" className="logo" onClick={(e) => handleNavClick(e, '#hero')} aria-label="Abdullah Aslam — Go to top">
            <span className="logo-name">Abdullah Aslam</span>
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href} className="nav-item">
                <a
                  href={href}
                  className={`nav-link ${activeSection === href.slice(1) ? 'nav-link--active' : ''}`}
                  onClick={(e) => handleNavClick(e, href)}
                  data-cursor="magnetic"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a href="/Resume.pdf" className="header-cta" download target="_blank" rel="noopener noreferrer">
            Resume
          </a>

          <button
            className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            {NAV_LINKS.map(({ label, href }, i) => (
              <li key={href} style={{ animationDelay: `${i * 40}ms` }}>
                <a
                  href={href}
                  className={activeSection === href.slice(1) ? 'active' : ''}
                  onClick={(e) => handleNavClick(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

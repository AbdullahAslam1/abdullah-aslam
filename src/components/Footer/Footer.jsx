import { useRef, useEffect } from 'react';
import { getLenis } from '../../hooks/useLenis';
import './Footer.css';

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const SOCIAL_LINKS = [
  {
    id: 'github', href: 'https://github.com/AbdullahAslam1', label: 'GitHub',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    id: 'linkedin', href: 'https://www.linkedin.com/in/abdullahaslam1', label: 'LinkedIn',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 014 0v4M12 13v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'email', href: 'mailto:h.m.abdullah709@gmail.com', label: 'Email',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const MARQUEE_ITEMS = [
  'Flutter Developer', 'Mobile Apps', 'Clean Code', 'Scalable UI',
  'Dart & React', 'Open to Work', 'Flutter Developer', 'Mobile Apps',
  'Clean Code', 'Scalable UI', 'Dart & React', 'Open to Work',
];

export default function Footer() {
  const footerRef = useRef(null);
  const year = new Date().getFullYear();

  function handleFooterNavClick(e, href) {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target, {
        offset: -68,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const offset = 68;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
      });
    }
  }

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          footer.classList.add('footer--visible');
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="footer">

      {/* Scrolling marquee strip */}
      <div className="footer-marquee-wrap" aria-hidden="true">
        <div className="footer-marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="footer-marquee-item">{item}</span>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="footer-inner">

          {/* TOP: big wordmark left + social pills right */}
          <div className="footer-top">
            <div className="footer-logotype">
              <p className="footer-wordmark" aria-label="Abdullah Aslam Portfolio">
                Abdullah Aslam
              </p>
              <p className="footer-descriptor">Flutter · React · Mobile</p>
            </div>

            <div className="footer-social-col">
              <p className="footer-social-label">Find me on</p>
              <div className="footer-social-row">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    className="social-pill"
                    target={s.id !== 'email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                  >
                    {s.icon}
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-rule" aria-hidden="true" />

          {/* MID: nav index + tagline */}
          <div className="footer-nav-strip">
            <nav className="footer-nav-index" aria-label="Footer navigation">
              {NAV_LINKS.map((link, i) => (
                <span key={link.href} className="footer-nav-item">
                  {i > 0 && <span className="footer-nav-sep" aria-hidden="true">/</span>}
                  <a
                    href={link.href}
                    className="footer-nav-link"
                    onClick={(e) => handleFooterNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </nav>
            <p className="footer-nav-tagline">crafting apps with care</p>
          </div>

          {/* BOTTOM: copyright + status + built-with */}
          <div className="footer-bottom">
            <p className="footer-copy">© {year} Abdullah Aslam. All rights reserved.</p>

            <div className="footer-status" aria-label="Available for work">
              <span className="status-dot" aria-hidden="true" />
              Available for work
            </div>

            <p className="footer-built">
              <span className="built-mono">// built with</span>{' '}Flutter love{' '}
              <span className="built-mono">+ React</span>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
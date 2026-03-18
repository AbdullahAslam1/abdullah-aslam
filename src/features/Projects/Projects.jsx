import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { gsap, ScrollTrigger } from '../../utils/gsap-setup.js';
import { PROJECTS, PROJECT_ART } from './projects.data.jsx';
import './Projects.css';


// ── CaseSection ──────────────────────────────────────────────
function CaseSection({ section }) {
  const { title, icon, type, items } = section;
  return (
    <div className="case-section">
      <h4 className="case-section-title">
        <span className="case-icon" aria-hidden="true">{icon}</span>
        {title}
      </h4>
      {type === 'checklist' && (
        <ul className="case-checklist">
          {items.map((item, i) => (
            <li key={i}><span className="check-dot" aria-hidden="true" />{item}</li>
          ))}
        </ul>
      )}
      {type === 'layers' && (
        <div className="case-layers">
          {items.map((item, i) => (
            <div key={i} className="case-layer">
              <span className="layer-name">{item.label}</span>
              <span className="layer-desc">{item.desc}</span>
            </div>
          ))}
        </div>
      )}
      {type === 'grid' && (
        <div className="case-grid">
          {items.map((item, i) => (
            <div key={i} className="case-grid-item">
              <span className="cgi-label">{item.label}</span>
              <span className="cgi-value">{item.value}</span>
            </div>
          ))}
        </div>
      )}
      {type === 'code' && (
        <div className="case-code-list">
          {items.map((item, i) => (
            <div key={i} className="case-code-item">
              <code>{item.label}</code>
              <span>{item.desc}</span>
            </div>
          ))}
        </div>
      )}
      {type === 'sync' && (
        <div className="case-sync">
          {items.map((item, i) => (
            <div key={i} className="sync-row">
              <span className="sync-dot" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}
      {type === 'challenges' && (
        <div className="case-challenges">
          {items.map((item, i) => (
            <div key={i} className="challenge-row">
              <span className="challenge-label">{item.label}</span>
              <span className="challenge-desc">{item.desc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// ── ProjectCard ──────────────────────────────────────────────
function ProjectCard({ project, isFeatured, isActive, onSelect }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.set(card, { transformPerspective: 1000, force3D: true });

    let rafPending = false;
    let latestE = null;
    let rect = null;
    let rafId = 0;

    const onEnter = () => {
      rect = card.getBoundingClientRect();
      gsap.killTweensOf(card);
      card.classList.add('card--tilting');
    };

    const onMove = (e) => {
      latestE = e;
      if (rafPending) return;
      rafPending = true;
      rafId = requestAnimationFrame(() => {
        if (!latestE) { rafPending = false; return; }
        if (!rect) rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        gsap.to(card, {
          rotateX: ((latestE.clientY - cy) / rect.height) * -7,
          rotateY: ((latestE.clientX - cx) / rect.width) * 7,
          duration: 0.3,
          ease: 'power3.out',
          overwrite: 'auto',
        });
        rafPending = false;
        latestE = null;
      });
    };

    const onLeave = () => {
      gsap.killTweensOf(card);
      gsap.to(card, {
        rotateX: 0, rotateY: 0,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
        onComplete: () => card.classList.remove('card--tilting'),
      });
      rect = null;
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mousemove', onMove, { passive: true });
    card.addEventListener('mouseleave', onLeave);

    return () => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
      gsap.killTweensOf(card);
      card.classList.remove('card--tilting');
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className={`project-card ${isFeatured ? 'project-card--featured' : ''} ${isActive ? 'project-card--active' : ''}`}
    >
      <div className="card-art">{PROJECT_ART[project.id]}</div>
      <div className="card-badges">
        {project.badges.map((b) => <span key={b} className="card-badge">{b}</span>)}
      </div>
      <div className="card-body">
        <div className="card-header">
          <p className="card-tagline">{project.tagline}</p>
          <h3 className="card-title">{project.title}</h3>
        </div>
        <p className="card-desc">{project.description}</p>
        <div className="card-tech">
          {project.tech.slice(0, isFeatured ? 7 : 4).map((t) => (
            <span key={t} className="tech-pill">{t}</span>
          ))}
        </div>
        <div className="card-actions">
          <button
            className={`btn-case-study ${isActive ? 'btn-case-study--active' : ''}`}
            onClick={() => onSelect(project.id)}
            data-cursor="magnetic"
          >
            <span>Case Study</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" stroke="currentColor" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <a
            href={project.links.github}
            className="btn-gh"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="magnetic"
            aria-label={`GitHub — ${project.title}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}


// ── CaseStudyModal ───────────────────────────────────────────
//
// Fix summary:
// 1. VIEWPORT CENTRING — modal-wrap uses position:fixed + inset:0 +
//    flex centering. Modal always appears at the current viewport centre,
//    never at the page top. No scrollTop math needed.
//
// 2. NO LAYOUT SHIFT ON OPEN — instead of toggling body overflow (which
//    causes a scrollbar-width jump), we measure the scrollbar width before
//    opening and add that as padding-right to <body> for the duration.
//
// 3. SCROLL CONTAINMENT — modal-right has overflow-y:auto + the wheel
//    event is stopped from propagating when the panel can still scroll.
//    Outside the modal, page scroll works normally through the backdrop.
//
// 4. LEFT COLUMN — no art, just clean data. Fits the available height
//    without overflow. Scrollable itself if content is taller than viewport.
//
// 5. ANIMATION — single GSAP timeline, no overlapping fromTo calls.
//    Only opacity + scale + translateY. No layout properties touched.

function CaseStudyModal({ project, isOpen, onClose }) {
  const backdropRef  = useRef(null);
  const modalRef     = useRef(null);
  const rightColRef  = useRef(null);
  const tlRef        = useRef(null);          // active GSAP timeline ref

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    return () => {
      if (tlRef.current) tlRef.current.kill();
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  // ── mount on open ──────────────────────────────────────────
  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  // ── animate on isOpen / mounted change ────────────────────
  useEffect(() => {
    const backdrop = backdropRef.current;
    const modal    = modalRef.current;
    if (!backdrop || !modal || !mounted) return;

    // Kill any in-progress animation first — prevents stutter on rapid
    // open/close toggling
    if (tlRef.current) tlRef.current.kill();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isOpen) {
      // ── Lock scroll without layout shift ──────────────────
      // Measure scrollbar width BEFORE hiding overflow so we can
      // compensate with padding-right and prevent the content jump.
      const sbWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow    = 'hidden';
      document.body.style.paddingRight = sbWidth + 'px';

      if (reduced) {
        gsap.set(backdrop, { opacity: 1 });
        gsap.set(modal,    { opacity: 1, scale: 1, y: 0 });
        return;
      }

      const contentTargets = modal.querySelectorAll('.modal-left > *, .modal-right-meta, .case-section');

      // Single timeline — everything sequenced with soft overlaps
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tlRef.current = tl;

      // Start from known state
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(modal, { opacity: 0, scale: 0.965, y: 28, transformOrigin: '50% 40%' });
      gsap.set(contentTargets, { opacity: 0, y: 16 });

      tl.to(backdrop, { opacity: 1, duration: 0.4, ease: 'sine.out' })
        .to(modal, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.62,
          ease: 'power4.out',
        }, 0.02)
        .to(contentTargets, {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.48,
          ease: 'power3.out',
          clearProps: 'transform',
        }, 0.2);

    } else {
      if (reduced) {
        gsap.set(backdrop, { opacity: 0 });
        gsap.set(modal,    { opacity: 0 });
        document.body.style.overflow    = '';
        document.body.style.paddingRight = '';
        setMounted(false);
        return;
      }

      const contentTargets = modal.querySelectorAll('.modal-left > *, .modal-right-meta, .case-section');
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow    = '';
          document.body.style.paddingRight = '';
          setMounted(false);
        },
      });
      tlRef.current = tl;

      tl.to(contentTargets, {
        opacity: 0,
        y: 10,
        stagger: 0.03,
        duration: 0.26,
        ease: 'sine.inOut',
      })
        .to(modal, {
          opacity: 0,
          scale: 0.982,
          y: 14,
          duration: 0.42,
          ease: 'power3.inOut',
        }, 0.06)
        .to(backdrop, { opacity: 0, duration: 0.44, ease: 'sine.inOut' }, 0.08);
    }
  }, [isOpen, mounted]);

  // ── Escape key ─────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // ── Contain wheel scroll inside the right column ───────────
  // When the mouse is over the right column and it can scroll,
  // stop the wheel event propagating to the page.
  // When it's fully scrolled (top or bottom), let the page scroll.
  useEffect(() => {
    const el = rightColRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop    = scrollTop === 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;
      if (!atTop && !atBottom) {
        e.stopPropagation();
      }
    };

    el.addEventListener('wheel', onWheel, { passive: true });
    return () => el.removeEventListener('wheel', onWheel);
  }, [mounted]);

  if (!mounted || !project || typeof document === 'undefined') return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="modal-backdrop"
        style={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/*
        modal-wrap: position:fixed + inset:0 + flex centering.
        This guarantees the modal is always centred in the CURRENT
        viewport, regardless of how far the page is scrolled.
        pointer-events:none on wrap, auto on modal-box — so clicks
        on the exposed backdrop area still reach the backdrop div.
      */}
      <div className="modal-wrap" aria-hidden="true">
        <div
          ref={modalRef}
          className="modal-box"
          style={{ opacity: 0, transform: 'scale(0.94) translateY(20px)' }}
          role="dialog"
          aria-modal="true"
          aria-label={`Case study: ${project.title}`}
        >
          {/* Close */}
          <button className="modal-close" onClick={onClose} aria-label="Close case study">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" />
            </svg>
          </button>

          {/* Two-column layout — height:100% lets columns fill the fixed modal height */}
          <div className="modal-body" style={{ height: "100%" }}>

            {/* LEFT — project identity only, no art */}
            <div className="modal-left">
              <p className="modal-label">// case study</p>
              <h2 className="modal-title">{project.title}</h2>
              <p className="modal-tagline">{project.tagline}</p>

              <div className="modal-divider" aria-hidden="true" />

              <p className="modal-desc">{project.description}</p>

              <div className="modal-left-spacer" />

              <a
                href={project.links.github}
                className="modal-gh-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View on GitHub
              </a>
            </div>

            {/* RIGHT — scrollable case study sections */}
            <div ref={rightColRef} className="modal-right">
              <div className="modal-right-meta">
                <div className="modal-meta-block">
                  <p className="modal-meta-label">Stack</p>
                  <div className="modal-tech">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {project.caseStudy.sections.map((section, i) => (
                <CaseSection key={i} section={section} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
    , document.body
  );
}


// ── Projects section ─────────────────────────────────────────
export default function Projects() {
  const [activeId, setActiveId] = useState(null);

  const lastProjectRef = useRef(null);
  if (activeId) {
    lastProjectRef.current = PROJECTS.find((p) => p.id === activeId) ?? null;
  }

  const sectionRef  = useRef(null);
  const labelRef    = useRef(null);
  const headingRef  = useRef(null);
  const featuredRef = useRef(null);
  const gridRef     = useRef(null);

  const featured = PROJECTS[0];
  const grid     = PROJECTS.slice(1);

  const handleSelect = useCallback((id) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  const handleClose = useCallback(() => {
    setActiveId(null);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from([labelRef.current, headingRef.current].filter(Boolean), {
        y: 28, opacity: 0, stagger: 0.12, duration: 1.0, ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 74%',
          toggleActions: 'play none none none',
        },
      });
      gsap.from(featuredRef.current, {
        y: 32, opacity: 0, duration: 1.2, ease: 'expo.out',
        scrollTrigger: {
          trigger: featuredRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          y: 24, opacity: 0, stagger: 0.08, duration: 1.0, ease: 'expo.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const isOpen       = activeId !== null;
  const modalProject = activeId
    ? PROJECTS.find((p) => p.id === activeId)
    : lastProjectRef.current;

  return (
    <section id="projects" ref={sectionRef} className="projects section">
      <div className="container">

        <p ref={labelRef} className="section-label">Selected Work</p>
        <h2 ref={headingRef} className="section-heading projects-heading">
          Projects that<br />
          <span className="heading-dim">shipped.</span>
        </h2>

        <div ref={featuredRef} className="featured-wrap">
          <ProjectCard
            project={featured}
            isFeatured
            isActive={activeId === featured.id}
            onSelect={handleSelect}
          />
        </div>

        <div ref={gridRef} className="projects-grid">
          {grid.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={activeId === project.id}
              onSelect={handleSelect}
            />
          ))}
        </div>

      </div>

      <CaseStudyModal
        project={modalProject}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </section>
  );
}
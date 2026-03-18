import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsap-setup.js';
import './About.css';


const TECH_STACK = [
  { label: 'Flutter',            icon: '◆' },
  { label: 'Dart',               icon: '◉' },
  { label: 'Firebase',           icon: '▲' },
  { label: 'Riverpod',           icon: '⬡' },
  { label: 'Supabase',           icon: '◈' },
  { label: 'GetX',               icon: '◎' },
  { label: 'Clean Architecture', icon: '⬢' },
  { label: 'REST APIs',          icon: '◇' },
  { label: 'BLoC',               icon: '◑' },
  { label: 'SQLite',             icon: '◐' },
  { label: 'Hive',               icon: '⬟' },
  { label: 'CI/CD',              icon: '⟳' },
];

const STATS = [
  { value: 5, suffix: '+', label: 'Apps Shipped'        },
  { value: 1,  suffix: '+', label: 'Year with Flutter'  },
  { value: 90, suffix: '%', label: 'Client Satisfaction' },
  { value: 30, suffix: '+', label: 'Features Delivered' },
];

const TRAITS = [
  'Clean Architecture',
  'Design-system minded',
];

export default function About() {
  const sectionRef = useRef(null);
  const labelRef   = useRef(null);
  const headingRef = useRef(null);
  const textRef    = useRef(null);
  const traitsRef  = useRef(null);
  const ctaRef     = useRef(null);
  const cardRef    = useRef(null);
  const statsRef   = useRef(null);
  const techRef    = useRef(null);
  const countRefs  = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card    = cardRef.current;
    const tech    = techRef.current;
    let tiltResetCall = null;

    if (!section || !card || !tech) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(['.about-left', card, tech], { opacity: 1, x: 0, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // ── Unified Entrance & Trigger ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        defaults: { ease: 'expo.out', force3D: true }
      });

      // use fromTo for reliability
      tl.fromTo('.about-left', 
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.5 }
      )
      .fromTo([card, tech], 
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.12, duration: 1.5 },
        "<" // start together
      );

      // Integrated Stats count-up (starts slightly after card entrance)
      countRefs.current.forEach((el, i) => {
        if (!el) return;
        const obj = { val: 0 };
        tl.to(obj, {
          val: STATS[i].value,
          duration: 2.5,
          ease: 'power4.out',
          onUpdate: () => { el.textContent = Math.round(obj.val); },
        }, 0.4); // overlap with main entrance
      });

      // Tech badges - smoother stagger
      const badges = tech.querySelectorAll('.tech-badge');
      if (badges?.length) {
        tl.fromTo(badges, 
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.025,
            duration: 1.0,
            clearProps: 'transform'
          },
          0.6 // overlap
        );
      }

      // ── High Performance Parallax ──
      gsap.to(card, {
        y: -40, // Reduced travel for more weight
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.0, // Switched to 1.0 for snappier but smooth feel
          force3D: true
        },
      });

    }, section);

    // ── Optimized Mouse Influence (quickTo) ──
    const xTo = gsap.quickTo(card, "rotateY", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(card, "rotateX", { duration: 0.7, ease: "power3.out" });
    let rect = null;

    const onMouseMove = (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      
      // Normalized percentage from center
      const xPercent = (e.clientX - cx) / (rect.width / 2);
      const yPercent = (e.clientY - cy) / (rect.height / 2);

      xTo(xPercent * 7); // Max 7deg
      yTo(yPercent * -7);
    };

    const onMouseEnter = () => {
      tiltResetCall?.kill();
      rect = card.getBoundingClientRect();
      card.classList.add('profile-card--tilting');
    };
    const onMouseLeave = () => {
      xTo(0);
      yTo(0);
      tiltResetCall?.kill();
      tiltResetCall = gsap.delayedCall(0.7, () => {
        card.classList.remove('profile-card--tilting');
      });
      rect = null;
    };

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove',  onMouseMove, { passive: true });
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      tiltResetCall?.kill();
      ctx.revert();
      card.removeEventListener('mouseenter', onMouseEnter);
      card.removeEventListener('mousemove',  onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about section">
      <div className="container about-container">

        {/* Left Column */}
        <div className="about-left">
          <p ref={labelRef} className="section-label">About Me</p>

          <h2 ref={headingRef} className="section-heading about-heading">
            Flutter Developer
          </h2>

          <div ref={textRef} className="about-body">
            <p>
              I build high-performance, pixel-perfect Flutter applications
              with clean, maintainable architecture at their core. Specialising
              in <em>Riverpod</em>, and <em>Clean Architecture</em>,
              I design systems that scale without accumulating technical debt.
            </p>
            <p>
              My workflow spans the full mobile stack from crafting smooth
              animations to wiring up Firebase, Supabase, and custom REST
              APIs. I work with clients globally
              and am open to remote opportunities worldwide.
            </p>
          </div>

          <ul ref={traitsRef} className="about-traits">
            {TRAITS.map((trait) => (
              <li key={trait} className="trait-item">
                <span className="trait-dot" aria-hidden="true" />
                {trait}
              </li>
            ))}
          </ul>

          <div ref={ctaRef} className="about-ctas">
            <a href="#projects" className="btn-primary" data-cursor="magnetic">
              <span>See My Work</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="mailto:h.m.abdullah709@gmail.com" className="btn-ghost" data-cursor="magnetic">
              Get in touch
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="about-right">
          <div ref={cardRef} className="profile-card glass--md">

            <div className="avatar-wrap avatar-float">
              <div className="avatar-ring" aria-hidden="true" />
              <img src="/About.png" alt="Profile photo" className="avatar-img" />
              <div className="status-badge" aria-label="Available for work">
                <span className="status-dot" aria-hidden="true" />
                Available for work
              </div>
            </div>

            <div ref={statsRef} className="stats-grid">
              {STATS.map(({ suffix, label }, i) => (
                <div key={label} className="stat-cell">
                  <div className="stat-number">
                    <span ref={(el) => (countRefs.current[i] = el)}>0</span>
                    <span className="stat-suffix">{suffix}</span>
                  </div>
                  <div className="stat-desc">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div ref={techRef} className="tech-stack">
            <p className="tech-label">// tech stack</p>
            <div className="tech-badges">
              {TECH_STACK.map(({ label, icon }) => (
                <span key={label} className="tech-badge" data-cursor="magnetic">
                  <span className="badge-icon" aria-hidden="true">{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

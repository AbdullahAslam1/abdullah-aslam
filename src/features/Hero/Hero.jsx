import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsap-setup.js';
import './Hero.css';


const ROLES = [
  'Flutter App Developer',
  'Clean Architecture',
  'Firebase & Supabase',
  'Cross-Platform Expert',
  'UI/UX Craftsman',
];

export default function Hero() {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const subtitleRef = useRef(null);
  const rolesRef    = useRef(null);
  const ctaRef      = useRef(null);
  const scrollRef   = useRef(null);
  const blob1Ref    = useRef(null);
  const blob2Ref    = useRef(null);
  const gridRef     = useRef(null);
  const typeRef     = useRef(null);

  // ── Typewriter ────────────────────────────────────────────
  useEffect(() => {
    const el = typeRef.current;
    if (!el) return;
    let roleIdx = 0, charIdx = 0, deleting = false, timer;

    function tick() {
      const current = ROLES[roleIdx];
      if (!deleting) {
        el.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) { deleting = true; timer = setTimeout(tick, 1800); return; }
        timer = setTimeout(tick, 60);
      } else {
        el.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % ROLES.length; timer = setTimeout(tick, 350); return; }
        timer = setTimeout(tick, 32);
      }
    }
    timer = setTimeout(tick, 1600);
    return () => clearTimeout(timer);
  }, []);

  // ── GSAP entrance + scroll parallax ───────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([sectionRef.current], { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const words = headingRef.current?.querySelectorAll('.word');
      let tiltResetCall = null;
      
      const tl = gsap.timeline({ 
        defaults: { ease: 'expo.out' },
        delay: 0.2 
      });

      // Background elements fade in gracefully
      tl.to([blob1Ref.current, blob2Ref.current], {
        opacity: 1, duration: 2.5, stagger: 0.3, force3D: true
      }, 0);

      tl.to(gridRef.current, { 
        opacity: 1, duration: 1.5 
      }, 0.3);

      // Heading words - buttery cascade
      if (words?.length) {
        tl.to(words, {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 1.2,
          ease: 'expo.out',
          force3D: true
        }, 0.4);
      }

      // Remaining elements
      tl.to(subtitleRef.current, { 
        y: 0, opacity: 1, duration: 1.0 
      }, 0.8);

      tl.to(rolesRef.current, { 
        y: 0, opacity: 1, duration: 1.0 
      }, 0.9);

      tl.to(ctaRef.current, { 
        y: 0, opacity: 1, duration: 1.0 
      }, 1.0);

      tl.fromTo(scrollRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 
        1.5
      );

      // ── Scroll Parallax — Optimized for fluid motion ──
      gsap.to(blob1Ref.current, {
        y: 120,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5, // slightly faster scrub for responsiveness
          force3D: true
        },
      });

      gsap.to(blob2Ref.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          force3D: true
        },
      });

      gsap.to(headingRef.current, {
        y: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          force3D: true
        },
      });

      // Ambient drift on x-axis only, so it does not fight with y-axis scroll parallax.
      gsap.to(blob1Ref.current, {
        x: 24,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(blob2Ref.current, {
        x: -20,
        duration: 22,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // ── Mouse Influence — Buttery Tilt ──
      const xTo = gsap.quickTo(headingRef.current, "rotateY", { duration: 1.2, ease: "power3.out" });
      const yTo = gsap.quickTo(headingRef.current, "rotateX", { duration: 1.2, ease: "power3.out" });

      const onMouseMove = (e) => {
        const { clientX, clientY } = e;
        const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        const xPercent = (clientX - cx) / cx;
        const yPercent = (clientY - cy) / cy;

        xTo(xPercent * -3.5);
        yTo(yPercent * 3.5);
      };

      const onMouseEnter = () => {
        tiltResetCall?.kill();
        headingRef.current?.classList.add('hero-heading--tilt');
      };
      const onMouseLeave = () => {
        xTo(0);
        yTo(0);
        tiltResetCall?.kill();
        tiltResetCall = gsap.delayedCall(0.8, () => {
          headingRef.current?.classList.remove('hero-heading--tilt');
        });
      };

      section.addEventListener('mouseenter', onMouseEnter);
      section.addEventListener('mousemove', onMouseMove, { passive: true });
      section.addEventListener('mouseleave', onMouseLeave);

      return () => {
        tiltResetCall?.kill();
        section.removeEventListener('mouseenter', onMouseEnter);
        section.removeEventListener('mousemove', onMouseMove);
        section.removeEventListener('mouseleave', onMouseLeave);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div ref={blob1Ref} className="blob blob--1" />
        <div ref={blob2Ref} className="blob blob--2" />
        <div ref={gridRef}  className="hero-grid"   />
      </div>

      <div className="container hero-inner">
        <p className="section-label hero-label">Available for work</p>

        <h1 ref={headingRef} className="hero-heading">
          <span className="word">Crafting</span>{' '}
          <span className="word">Beautiful</span>{' '}
          <span className="word word--accent">Flutter</span>{' '}
          <span className="word">Apps</span>
        </h1>

        <p ref={subtitleRef} className="hero-subtitle">
          Building pixel-perfect, high-performance mobile experiences with
        </p>

        <div ref={rolesRef} className="hero-roles">
          <span className="roles-static">// </span>
          <span ref={typeRef} className="roles-type" aria-live="polite" />
          <span className="roles-cursor">|</span>
        </div>

        <div ref={ctaRef} className="hero-ctas">
          <a href="#projects" className="btn-primary" data-cursor="magnetic">
            <span>View Projects</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#contact" className="btn-ghost" data-cursor="magnetic">Let's Talk</a>
        </div>
      </div>

      <div ref={scrollRef} className="scroll-indicator" aria-hidden="true">
        <div className="scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  );
}

import { useState, useEffect, useRef, memo } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsap-setup.js';
import './Skills.css';

const CATEGORIES = [
  {
    id: 'flutter',
    label: 'Flutter & Dart',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 14.5L8.5 9 14 3h4L10.5 10.5 18 18h-4l-4-4-3 3H3v-2.5z"
          stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
    description: 'Building pixel-perfect cross-platform apps with Flutter — from custom painters to complex animation systems.',
    skills: [
      'Flutter UI & Custom Widgets',
      'Dart & Null Safety',
      'Custom Animations & Custom Painter',
      'Responsive & Adaptive UI',
      'Platform Channels & Native Integration',
    ],
    tags: ['Material 3', 'flutter_animate', 'Rive'],
  },
  {
    id: 'architecture',
    label: 'Architecture',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="12" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="7" y="12" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5 8v2.5a2 2 0 002 2h1M15 8v2.5a2 2 0 01-2 2h-1"
          stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    description: 'Designing systems that scale — clean separation of concerns, testable code, and zero technical debt.',
    skills: [
      'Clean Architecture',
      'Riverpod & GetX State Management',
      'SOLID Principles',
      'Test-Driven Development',
      'Feature-First Project Structure',
    ],
    tags: ['GetX', 'Riverpod', 'Repository Pattern'],
  },
  {
    id: 'backend',
    label: 'Backend & Cloud',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 7h12M4 13h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <rect x="2" y="4" width="16" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="2" y="11" width="16" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="15" cy="6.5" r="1" fill="currentColor"/>
        <circle cx="15" cy="13.5" r="1" fill="currentColor"/>
      </svg>
    ),
    description: 'Full-stack mobile development — Firebase, Supabase, REST APIs, and real-time data sync.',
    skills: [
      'Firebase — Auth, Firestore, Storage',
      'Supabase & PostgreSQL',
      'REST API Integration',
      'Real-time & Offline Sync',
      'Push Notifications & FCM',
    ],
    tags: ['Cloud Functions', 'Dio', 'Hive', 'SQLite'],
  },
  {
    id: 'automation',
    label: 'Automation & AI',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M10 3v2M10 15v2M3 10h2M15 10h2M5.05 5.05l1.41 1.41M13.54 13.54l1.41 1.41M5.05 14.95l1.41-1.41M13.54 6.46l1.41-1.41"
          stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    description: 'Building intelligent automation workflows — connecting apps, APIs, and AI models without boilerplate.',
    skills: [
      'n8n Workflow Automation',
      'API Webhooks & Triggers',
      'CI/CD Pipelines',
      'Git & Version Control',
    ],
    tags: ['n8n', 'GitHub Actions', 'OpenAI API'],
  },
];

// ── Skill chip — clean and minimal ──
const SkillChip = memo(function SkillChip({ name }) {
  return (
    <div className="skill-chip">
      <span className="chip-dot" aria-hidden="true" />
      <span className="chip-name">{name}</span>
    </div>
  );
});

export default function Skills() {
  const [activeId,  setActiveId]  = useState('flutter');
  const [animating, setAnimating] = useState(false);

  const sectionRef = useRef(null);
  const labelRef   = useRef(null);
  const headingRef = useRef(null);
  const tabsRef    = useRef(null);
  const panelRef   = useRef(null);
  const orbsRef    = useRef(null);

  const active = CATEGORIES.find((c) => c.id === activeId);

  // ── Unified Entrance Animation ────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([orbsRef.current, labelRef.current, headingRef.current, tabsRef.current, panelRef.current], { opacity: 1, x: 0, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true 
        },
        defaults: { ease: 'expo.out', force3D: true }
      });

      // use fromTo so we don't depend on CSS initial states (safer for React)
      tl.fromTo([orbsRef.current, labelRef.current, headingRef.current], 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1.2 }
      );

      tl.fromTo(tabsRef.current, 
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0 }, 
        0.3
      );

      tl.fromTo(panelRef.current, 
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2 }, 
        0.4
      );

      tl.fromTo('.skill-chip', 
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, duration: 0.8, ease: 'power3.out' }, 
        0.6
      );

    }, section);

    return () => ctx.revert();
  }, []);

  function switchTab(id) {
    if (id === activeId || animating) return;
    const panel = panelRef.current;
    if (!panel) {
      setActiveId(id);
      return;
    }

    setAnimating(true);

    gsap.killTweensOf(panel);
    gsap.killTweensOf(panel.querySelectorAll('.skill-chip'));

    // "Liquid" slide transition
    gsap.to(panel, {
      opacity: 0,
      x: -12,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setActiveId(id);
        
        requestAnimationFrame(() => {
          gsap.fromTo(panel, 
            { opacity: 0, x: 12 },
            { 
              opacity: 1, 
              x: 0, 
              duration: 0.55, 
              ease: 'expo.out',
              onComplete: () => setAnimating(false)
            }
          );
          
          gsap.fromTo(panel.querySelectorAll('.skill-chip'), 
            { opacity: 0, y: 8 },
            { 
              opacity: 1, 
              y: 0, 
              stagger: 0.015, 
              duration: 0.6, 
              ease: 'expo.out', // consistent liquid curve
            }
          );
        });
      }
    });
  }

  return (
    <section id="skills" ref={sectionRef} className="skills section">
      <div className="container">

        <div ref={orbsRef} className="skills-orbs" aria-hidden="true">
          {['Flutter', 'Dart', 'Firebase', 'Riverpod', 'n8n', 'BLoC', 'Supabase', 'Git'].map((label, i) => (
            <span key={label} className={`skill-orb ${i < 4 ? 'orb-float' : ''}`}
              style={{ animationDelay: `${i * 0.4}s`, animationDuration: `${3 + i * 0.4}s` }}>
              {label}
            </span>
          ))}
        </div>

        <p ref={labelRef} className="section-label">Skills & Expertise</p>
        <h2 ref={headingRef} className="section-heading skills-heading">
          What I work<br />
          <span className="heading-dim">with daily.</span>
        </h2>

        <div className="skills-body">
          <nav ref={tabsRef} className="skills-tabs" role="tablist">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={cat.id === activeId}
                aria-controls={`panel-${cat.id}`}
                className={`skills-tab ${cat.id === activeId ? 'skills-tab--active' : ''}`}
                onClick={() => switchTab(cat.id)}
                data-cursor="magnetic"
              >
                <span className="tab-icon">{cat.icon}</span>
                <span className="tab-label">{cat.label}</span>
                {cat.id === activeId && <span className="tab-indicator" aria-hidden="true" />}
              </button>
            ))}
          </nav>

          <div ref={panelRef} id={`panel-${activeId}`} role="tabpanel" className="skills-panel glass--md">
            <div className="panel-header">
              <div className="panel-icon">{active.icon}</div>
              <div>
                <h3 className="panel-title">{active.label}</h3>
                <p className="panel-desc">{active.description}</p>
              </div>
            </div>

            <div className="panel-chips">
              {active.skills.map((skill) => (
                <SkillChip key={`${activeId}-${skill}`} name={skill} />
              ))}
            </div>

            <div className="panel-tags">
              {active.tags.map((tag) => (
                <span key={tag} className="panel-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

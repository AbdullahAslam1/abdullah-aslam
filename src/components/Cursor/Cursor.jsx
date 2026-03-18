import { useEffect, useRef } from 'react';
import './Cursor.css';

/**
 * Cursor — zero GSAP overhead version.
 * Uses CSS custom properties + CSS transitions for the ring lerp.
 * Only the dot snaps immediately via transform. Ring follows via CSS lerp.
 * No rAF loop with gsap.set() — that was firing every frame even on stillness.
 */
export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mx = 0, my = 0;          // target mouse
    let dx = 0, dy = 0;          // dot lerped position
    let rx = 0, ry = 0;          // ring lerped position
    let rafId = null;
    let visible = false;
    let isHovering = false;

    // Use CSS transform directly — fastest possible path
    function setDot(x, y, scale = 1) {
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
    }

    function setRing(x, y, w = 36, h = 36) {
      ring.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      ring.style.width  = `${w}px`;
      ring.style.height = `${h}px`;
    }

    // Lerp loop — only runs when mouse has moved (cancelled on stillness)
    let needsUpdate = false;

    function tick() {
      // Lerp dot toward pointer for a smooth trail
      dx += (mx - dx) * 0.18;
      dy += (my - dy) * 0.18;
      setDot(dx, dy, isHovering ? 0.4 : 1);

      // Lerp ring toward mouse
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;

      setRing(rx, ry);

      // Stop if settled (both dot & ring)
      const ringSettled = Math.abs(mx - rx) < 0.05 && Math.abs(my - ry) < 0.05;
      const dotSettled  = Math.abs(mx - dx) < 0.05 && Math.abs(my - dy) < 0.05;
      if (ringSettled && dotSettled) {
        needsUpdate = false;
        rafId = null;
        return;
      }
      rafId = requestAnimationFrame(tick);
    }

    function startTick() {
      if (!needsUpdate) {
        needsUpdate = true;
        rafId = requestAnimationFrame(tick);
      }
    }

    function onMove(e) {
      mx = e.clientX;
      my = e.clientY;

      // When first becoming visible, snap the dot to avoid a jump
      if (!visible) {
        dx = mx;
        dy = my;
        setDot(dx, dy, isHovering ? 0.4 : 1);
      }

      startTick();

      if (!visible) {
        visible = true;
        dot.style.opacity  = '1';
        ring.style.opacity = isHovering ? '0.35' : '0.5';
      }
    }

    function onLeave() {
      visible = false;
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    }

    function onEnter() {
      visible = true;
      dot.style.opacity  = '1';
      ring.style.opacity = isHovering ? '0.35' : '0.5';
    }

    function onHoverIn(e) {
      isHovering = true;
      const el   = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const w    = Math.max(rect.width  * 1.25, 52);
      const h    = Math.max(rect.height * 1.25, 52);

      // Jump ring & dot to element center
      mx = cx; my = cy;
      dx = cx; dy = cy;
      setRing(cx, cy, w, h);
      setDot(dx, dy, 0.4);
      rx = cx; ry = cy;

      ring.style.opacity = '0.3';
      dot.style.opacity  = '0.4';
    }

    function onHoverOut() {
      isHovering = false;
      ring.style.width  = '36px';
      ring.style.height = '36px';
      ring.style.opacity = visible ? '0.5' : '0';
      dot.style.opacity = visible ? '1' : '0';
      setDot(mx, my, 1);
      startTick();
    }

    function onClick() {
      // CSS class-based ripple — no GSAP
      ring.classList.remove('cursor-ring--click');
      // force reflow
      void ring.offsetWidth;
      ring.classList.add('cursor-ring--click');
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    window.addEventListener('click', onClick, { passive: true });

    const targets = document.querySelectorAll('a, button, [data-cursor="magnetic"]');
    targets.forEach((el) => {
      el.addEventListener('mouseenter', onHoverIn);
      el.addEventListener('mouseleave', onHoverOut);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('click', onClick);
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" style={{ opacity: 0 }} />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" style={{ opacity: 0 }} />
    </>
  );
}

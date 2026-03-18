import { useState, useRef, useEffect } from 'react';
import { gsap } from '../../utils/gsap-setup.js';
import './Contact.css';

function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

function validateFields({ name, email, message }) {
  const errors = {};
  if (!name.trim())                    errors.name    = 'Name is required';
  if (!email.trim())                   errors.email   = 'Email is required';
  else if (!validateEmail(email))      errors.email   = 'Enter a valid email address';
  if (!message.trim())                 errors.message = 'Message is required';
  else if (message.trim().length < 20) errors.message = 'Message too short — at least 20 characters';
  return errors;
}

function Field({ id, label, error, touched, children }) {
  return (
    <div className={`form-field ${touched && error ? 'form-field--error' : ''}`}>
      <label htmlFor={id} className="field-label">{label}</label>
      {children}
      <span className="field-error" aria-live="polite">{touched && error ? error : ''}</span>
    </div>
  );
}

export default function Contact() {
  const [fields,  setFields]  = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({});
  const [status,  setStatus]  = useState('idle');
  const resetTimerRef = useRef(null);
  const requestAbortRef = useRef(null);

  const errors  = validateFields(fields);
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      requestAbortRef.current?.abort();
    };
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }
  function handleBlur(e) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;
    setStatus('submitting');

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
    requestAbortRef.current?.abort();
    const abortController = new AbortController();
    requestAbortRef.current = abortController;

    fetch('https://formsubmit.co/ajax/h.m.abdullah709@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: fields.name,
        email: fields.email,
        message: fields.message,
        _subject: 'New portfolio contact message',
        _captcha: 'false',
        _template: 'table',
      }),
      signal: abortController.signal,
    })
      .then(async (res) => {
        requestAbortRef.current = null;
        const data = await res.json().catch(() => ({}));

        if (res.ok && data?.success !== 'false') {
          setStatus('success');
          resetTimerRef.current = setTimeout(() => {
            setStatus('idle');
            setFields({ name: '', email: '', message: '' });
            setTouched({});
            resetTimerRef.current = null;
          }, 4000);
        } else {
          setStatus('idle');
          alert('Message could not be sent. Please try again or email me directly.');
        }
      })
      .catch((err) => {
        requestAbortRef.current = null;
        if (err?.name === 'AbortError') return;
        setStatus('idle');
        alert('Could not send message. Please email me directly.');
      });
  }

  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);

  // ── Unified Performance Entrance ──────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(['.contact-left', '.contact-form'], { opacity: 1, x: 0, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true // Pro standard: kill trigger on finish
        },
        defaults: { ease: 'expo.out', force3D: true }
      });

      tl.to('.contact-left', {
        y: 0,
        opacity: 1,
        duration: 1.4
      });

      tl.to('.contact-form', {
        x: 0,
        opacity: 1,
        duration: 1.4
      }, 0.2); // slight overlap

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="contact section">
      <div className="container">
        <div className="contact-body">

          {/* ── LEFT: label + heading + desc + badge ── */}
          <div ref={leftRef} className="contact-left">
            <p className="section-label">Get in Touch</p>

            <h2 className="section-heading contact-heading">
              Let's build something<br />
              <span className="heading-dim">together.</span>
            </h2>

            <p className="contact-desc">
              Have a project in mind or want to discuss opportunities?
              I'm currently open to new work — drop a message and I'll get back within 24 hours.
            </p>

            <div className="availability-badge glass--md">
              <span className="avail-dot" aria-hidden="true" />
              <div>
                <p className="avail-title">Available for work</p>
                <p className="avail-sub">Open to freelance &amp; full-time roles</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <div ref={rightRef} className="contact-right">
            <form className="contact-form glass--md" onSubmit={handleSubmit} noValidate>
              <Field id="name" label="Full Name" error={errors.name} touched={touched.name}>
                <input id="name" name="name" type="text" className="field-input"
                  placeholder="Your name" value={fields.name}
                  onChange={handleChange} onBlur={handleBlur}
                  disabled={status !== 'idle'} autoComplete="name" />
              </Field>

              <Field id="email" label="Email Address" error={errors.email} touched={touched.email}>
                <input id="email" name="email" type="email" className="field-input"
                  placeholder="you@example.com" value={fields.email}
                  onChange={handleChange} onBlur={handleBlur}
                  disabled={status !== 'idle'} autoComplete="email" />
              </Field>

              <Field id="message" label="Message" error={errors.message} touched={touched.message}>
                <textarea id="message" name="message" className="field-input field-input--textarea"
                  placeholder="Tell me about your project..." rows={5}
                  value={fields.message} onChange={handleChange} onBlur={handleBlur}
                  disabled={status !== 'idle'} />
              </Field>

              {status === 'success' ? (
                <div className="form-success" role="alert">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Message sent — I'll reply within 24 hours.
                </div>
              ) : (
                <button type="submit" className="form-submit" disabled={status === 'submitting'} data-cursor="magnetic">
                  {status === 'submitting' ? (
                    <span className="submit-loader" aria-label="Sending...">
                      <span className="loader-dot" />
                      <span className="loader-dot" />
                      <span className="loader-dot" />
                    </span>
                  ) : (
                    <>
                      Send Message
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
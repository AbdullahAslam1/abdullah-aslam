# Abdullah Aslam Portfolio (Astro + React)

Personal portfolio for Abdullah Aslam, focused on Flutter and mobile app development.

## Stack

- Astro (static output)
- React islands
- GSAP + ScrollTrigger
- Lenis smooth scrolling
- Tailwind integration + custom CSS system
- Self-hosted fonts in public/fonts

## Run locally

```bash
npm install
npm run dev
npm run build
npm run preview
```

Default dev URL: http://localhost:4321

## Current profile links

- GitHub: https://github.com/AbdullahAslam1
- LinkedIn: https://www.linkedin.com/in/abdullahaslam1
- Email: h.m.abdullah709@gmail.com

## Contact form

The contact form is wired to FormSubmit AJAX:

- Endpoint: https://formsubmit.co/ajax/h.m.abdullah709@gmail.com
- File: src/features/Contact/Contact.jsx

Important: first time setup may require confirming the FormSubmit activation email.

## Pre-deploy checklist (remaining)

1. Set real production domain everywhere:
   - astro.config.mjs (site)
   - src/pages/index.astro (canonical, OG URL/image URLs, JSON-LD IDs)
2. Add resume file at public/resume.pdf (header button currently points there)
3. Replace About avatar placeholder with a real image in src/features/About/About.jsx
4. Replace project repo links with per-project GitHub URLs in src/features/Projects/projects.data.jsx (currently all point to profile)
5. Replace public/og-image.svg with final social preview asset (1200x630 recommended)
6. Ensure robots/sitemap domain matches final production domain

## Deployment (Vercel)

1. Push repository to GitHub
2. Import project into Vercel
3. Add custom domain in Vercel settings
4. Deploy
5. Submit sitemap URL in Google Search Console

## Project structure

```text
src/
  pages/
    index.astro
    404.astro
  components/
    Cursor/
    Header/
    Footer/
  features/
    Hero/
    About/
    Skills/
    Projects/
    Contact/
  hooks/
    useLenis.js
  utils/
    gsap-setup.js
  styles/
    variables.css
    reset.css
    layout.css
    animations.css
public/
  fonts/
  favicon.svg
  og-image.svg
  robots.txt
```

## Hydration notes

Current page mounts all main sections with client:load in src/pages/index.astro.
That gives immediate interactivity and consistent motion behavior across sections.

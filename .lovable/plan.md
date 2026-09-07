## Doctor Portfolio Website

A premium, responsive medical-doctor portfolio with a soft blue/white palette, glassmorphism cards, subtle gradients, and light animations.

**Note on stack:** this project runs on TanStack Start (React + TypeScript + Tailwind), not Next.js. It gives you the same things you asked for — SSR, file-based routing, SEO metadata, code splitting, image optimization — so I'll build there instead of scaffolding Next.js. No backend, no database: all content lives in editable data files, as you asked.

### Content model
One central content file (`src/content/site.ts`) holding: doctor profile, stats, education/certifications, career timeline, services, hospital info, gallery, testimonials, FAQ, social links, working hours. Left blank/placeholder for now, so you fill in one file and the whole site updates. Swappable for a database later without touching the UI.

### Pages (own URL + own SEO metadata each)
- `/` — Home: hero + condensed highlights of every section
- `/about` — bio, education, certifications, license, specialties, career timeline
- `/services` — service cards with icons and hover motion
- `/hospital` — name, logo, address, department, hours, contact, website, embedded Google Map, "Open in Maps" + "Get directions" buttons
- `/gallery` — professional photo grid with lightbox
- `/reviews` — testimonials carousel
- `/faq` — accordion
- `/contact` — validated contact form, WhatsApp, phone, email, socials, hours

Navigation: Home, About, Services, Hospital, Gallery, Reviews, FAQ, Contact + prominent "Book Appointment" button. Sticky glass header, mobile drawer menu, minimal footer.

### Hero
Doctor portrait, name, specialization, short intro, WhatsApp + Book Appointment CTAs, and four animated count-up stat cards (years of experience, patients treated, satisfaction, hospital affiliation).

### Design
- Soft blue + white tokens, glass surfaces, rounded cards, gentle gradients
- Poppins headings / Inter body, generous whitespace
- Fade-in on scroll, floating cards, hover lifts, smooth scrolling — restrained so performance stays high

### Technical
- Design tokens in `src/styles.css`; reusable UI components; no hardcoded colors
- Contact form validated with zod; submissions logged and ready to wire to email/DB later
- SEO: per-page title/description/OG, canonical, JSON-LD `Physician` + `Hospital` schema, `robots.txt`, `sitemap.xml`
- Accessibility: semantic landmarks, keyboard-navigable menus/accordion/carousel, alt text, focus states
- Generated placeholder imagery (portrait, hospital, gallery) until you supply real photos

### Not included
- English only for now (i18n/language switcher can be added later)
- No admin dashboard yet — the content-file structure keeps that path open

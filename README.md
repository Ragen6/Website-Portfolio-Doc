# Doctor's Digital Sanctuary

A premium, modern, and fully responsive portfolio website for a single medical
doctor. Built with a soft blue + white glassmorphism design language, dark-mode
navy theme, and lightweight animations.

## Stack

- **Framework:** TanStack Start (React 19) + TypeScript strict
- **Styling:** Tailwind CSS v4 (OKLch tokens, CSS-first config)
- **Routing:** TanStack Router (file-based), SSR via Nitro
- **UI:** light shadcn/ui primitives (Button, Input, Textarea, Label, Carousel, Sonner)
- **Contact:** react-hook-form + zod, Cloudflare Turnstile (anti-spam), delivered
  by email via Resend
- **Deploy target:** Cloudflare Pages (Advanced/SSR — `dist/_worker.js`)

## Pages

- `/` — hero, animated stats, hospital carousel
- `/about` — bio, education, certifications
- `/services` — services, hospital cards + embedded maps
- `/contact` — validated contact form (Turnstile + email delivery)

All site content lives in one place: `src/content/site.ts`.

## Development

Requires Node.js + npm.

```sh
npm i
npm run dev      # http://localhost:8080
```

## Production build (Cloudflare Pages)

```sh
npm run build
```

The `cloudflare-pages` Nitro preset emits static assets plus a single SSR Worker
under `dist/` (`dist/_worker.js`). Cloudflare Pages auto-detects it as an
Advanced/SSR Worker. Publish **`dist`** as the build output directory.

## Environment variables

See `.env.example`. Required for the contact form to work:

| Variable                | Purpose                                          |
| ----------------------- | ------------------------------------------------ |
| `VITE_TURNSTILE_SITE_KEY` | Public Turnstile site key (browser)            |
| `TURNSTILE_SECRET_KEY`    | Private Turnstile key (server)                 |
| `RESEND_API_KEY`        | Resend API key for email delivery               |
| `RESEND_FROM_EMAIL`     | Verified Resend sender address                   |
| `RESEND_FROM_NAME`      | Sender display name (optional)                   |
| `RESEND_TO_EMAIL`       | Delivery inbox (defaults to the doctor's email)  |

## Deploying

1. Push this repo to GitHub.
2. In Cloudflare Pages, create a project connected to the repo.
3. Set **Build command** `npm run build`, **Build output directory** `dist`.
4. Add the environment variables above in the Pages dashboard.
5. After first deploy, replace `your-domain.pages.dev` in `public/sitemap.xml`
   and `public/robots.txt` with your real domain.

---

This project was built with [Lovable](https://lovable.dev).
# Ed & Russ — marketing site

A multi-page marketing site built with **Next.js 16 (App Router) + TypeScript**,
converted from the original single-file HTML page
(kept for reference in [`reference/`](reference/original-landing-page.html)).

The design is unchanged where it was already working. What's new: a real contact
form that emails enquiries, an "Our approach" section, and a larger services lede.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the values you need
npm run dev                  # http://localhost:3000
```

Without any mail configuration the contact form still works end to end — in
development the enquiry is printed to your terminal instead of being emailed, so
you can build and test without credentials.

| Script            | What it does                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Dev server with hot reload            |
| `npm run build`   | Production build                      |
| `npm start`       | Serve the production build            |
| `npm run lint`    | ESLint                                |
| `npm run typecheck` | TypeScript, no emit                 |

---

## Where the contact form goes

`ContactForm` → `POST /api/contact` → validation → spam checks → `sendMail()`.

**The recipient address is one environment variable.** Set `CONTACT_TO_EMAIL` to
whichever inbox should receive enquiries and nothing else needs touching. Until
it is set, enquiries go to the address published on the site
(`info@edandruss.com`).

### Choose a mail provider

The route picks a provider from the environment, so you can switch without
touching code.

**Option A — Resend** (recommended on Vercel, no SMTP credentials in your env):

1. Sign up at [resend.com](https://resend.com) and verify your sending domain.
2. Create an API key, set `RESEND_API_KEY`.
3. Set `CONTACT_FROM_EMAIL` to an address on the verified domain, e.g.
   `"Ed & Russ Website <website@edandruss.com>"`.

While testing you can leave `CONTACT_FROM_EMAIL` unset — Resend's sandbox sender
is used, which only delivers to the account owner's address.

**Option B — an existing mailbox over SMTP** (Zoho, Google Workspace, Microsoft 365):

Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`. Use an app-specific
password, never the account password. Port 465 implies TLS; 587 uses STARTTLS.

`RESEND_API_KEY` wins if both are set.

### Optional acknowledgement email

Set `CONTACT_AUTOREPLY="true"` and the person who submitted the form also
receives a branded confirmation. Off by default.

### Deliverability

Send from a domain you control and have verified with your provider, and keep
SPF/DKIM records in place. Sending as, say, a `@gmail.com` address you do not own
will land enquiries in spam.

---

## Deploying to Vercel

1. Push this folder to a Git repository.
2. In Vercel, **Add New → Project** and import it. Framework preset, build
   command and output directory are all detected automatically — no `vercel.json`
   needed.
3. Add your environment variables under **Settings → Environment Variables**
   (at minimum `CONTACT_TO_EMAIL` plus one provider's credentials, and
   `NEXT_PUBLIC_SITE_URL` once the domain is live).
4. Deploy.

`/api/contact` runs as a serverless function on the Node runtime; the page itself
is static, so it is served from the edge cache.

After adding or changing an environment variable, redeploy — running functions do
not pick up new values.

---

## Project structure

```
app/
  layout.tsx            Fonts, metadata, header/footer shell
  page.tsx              Home
  services/page.tsx     Services
  approach/page.tsx     Our approach
  about/page.tsx        About + story
  contact/page.tsx      Contact + enquiry form
  globals.css           Imports every stylesheet in cascade order
  api/contact/route.ts  Enquiry endpoint
  sitemap.ts robots.ts not-found.tsx

components/
  layout/     SiteHeader, SiteFooter, BrandMark, PageHero, SkipLink,
              StructuredData
  sections/   Hero, FeatureCards, BlackBox, Approach, Services,
              About, Story, ContactSection, ContactForm, CtaBand
  ui/         Reveal, Icons

hooks/useReveal.ts      Shared IntersectionObserver for scroll reveals
lib/
  site.ts               Name, contact details, navigation routes
  content.ts            All marketing copy, section data and page headings
  validation.ts         Form rules, shared by browser and server
  mail.ts               Provider-agnostic sending
  email-templates.ts    Enquiry + acknowledgement emails
  rate-limit.ts         Per-IP submission throttle

styles/                 One stylesheet per section
```

### Pages

| Route | Contents |
| ----- | -------- |
| `/` | Hero, feature mosaic, the "black box" pitch, closing CTA |
| `/services` | The four service cards |
| `/approach` | Four-stage process and operating principles |
| `/about` | Who we are, plus the founding story |
| `/contact` | Direct contact details and the enquiry form |

Each page owns its `<h1>`, `<title>`, meta description and canonical URL, so
they rank for their own terms rather than competing with each other.

Adding a page: create `app/<name>/page.tsx`, export `metadata`, add copy to
`pages` in `lib/content.ts`, then add the route to `navLinks` in `lib/site.ts`
and to `app/sitemap.ts`.

**Editing copy** — almost all text lives in `lib/content.ts`, and contact details
and navigation in `lib/site.ts`. You rarely need to open a component to change
wording.

**Server vs client** — sections render on the server. Only `SiteHeader`,
`HeroVisual`, `ContactForm` and `Reveal` are client components, which keeps the
JavaScript bundle small.

---

## What changed from the original HTML

- **Services lede is larger.** `.sv-lede` went from `clamp(1rem, 1.1vw, 1.1rem)`
  to `clamp(1.16rem, 1.7vw, 1.52rem)`, with a slightly darker colour so it holds
  up at that size.
- **A contact form replaces the `mailto:` links.** The CTA is now a two-column
  panel: direct contact details on the left, the form on the right. Every "Get in
  touch" button scrolls to it.
- **New "Our approach" section** (`#approach`) — the four stages (Diagnose,
  Architect, Execute, Compound) plus three operating principles. This is where
  "Explore our approach" now goes.
- Added a trust strip under the hero, an "Approach" nav item, and JSON-LD
  structured data describing the business and its services.

> The approach copy and the budget ranges in the form are written to fit the
> site's existing voice, but they are **placeholders you should confirm**. They
> describe how the business works and what it charges — only you can verify those
> are accurate.

---

## Spam handling

The endpoint drops obvious bots without telling them: a hidden honeypot field, a
minimum fill time, and a per-IP limit of 5 submissions per 10 minutes. The limit
is in-memory, so it is best-effort across serverless instances — if you need a
hard guarantee, swap `lib/rate-limit.ts` for Vercel KV or Upstash.

# InStyle Hair Salon

One-page website for InStyle Hair Salon — 18558 Gale Ave #180, City of Industry, CA 91748 (Seasons Place). Open every day, 10:30 AM – 7:00 PM.

**Live:** https://instyle-salon.vercel.app

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- GSAP (ScrollTrigger, SplitText) via `@gsap/react` — animations gated behind `prefers-reduced-motion`
- Resend for booking email alerts (`app/api/book/route.ts`)
- Deployed on Vercel; pushes to `main` auto-deploy

## Booking flow

The form at `#book` POSTs to `/api/book`, which validates input (honeypot spam check, length limits, HTML escaping) and emails the owner via Resend.

Environment variables (set in Vercel → Settings → Environment Variables, or `.env.local` for dev):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `BOOKING_EMAIL` | Recipient for booking alerts (free Resend tier: must be the Resend account owner's email until a domain is verified) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for Open Graph metadata |

## Development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
```

Content lives in `lib/site.ts` (address, hours, services, booking options) and the section components in `components/sections/`.

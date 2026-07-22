# Journalist Portfolio — Next.js

A production-ready Next.js 14 portfolio site for an Investigative Reporter, Journalist & TV Producer.

## Brand Colors
- **Deep Navy** `#0F172A` — Headers & Buttons
- **Editorial Gold** `#C8A96A` — Accents
- **Soft Paper** `#F8F7F4` — Backgrounds
- **Rich Black** `#111111` — Article Text
- **Soft Gray** `#6B7280` — Metadata & Captions

## Sections (matches wireframe)
1. **Navbar** — Logo + Nav Links + CTA
2. **Hero** — Full-screen with Headline, Tagline, Stats
3. **About** — Bio + Skills Tags ("Say Hi")
4. **Work** — Services/Products with slider (mobile)
5. **CTA Banner** — Featured story / Bonus call-to-action
6. **Stories** — Blog posts / Published articles grid
7. **Press** — Testimonials / Proof Points carousel
8. **Hire Me** — Pricing tiers / Ask for the Sale
9. **Contact** — Contact form + Lead gen freebie
10. **Footer** — Social, Newsletter, Imprint, Privacy, T&Cs

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (ready to use)
- **React Icons**
- **Google Fonts** — Playfair Display, Lora, DM Sans

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
npm start
```

## Customisation Checklist
- [ ] Replace `Jane Doe` with your real name throughout
- [ ] Update metadata in `app/layout.tsx` (title, description, keywords)
- [ ] Add your profile photo in `/public/` and update Hero + About components
- [ ] Update story articles in `components/Stories.tsx`
- [ ] Update testimonials in `components/Press.tsx`
- [ ] Set your real email in `components/Contact.tsx`
- [ ] Connect the contact form to an API route or service (Resend, Formspree, etc.)
- [ ] Update social links in `components/Footer.tsx`
- [ ] Add your real pricing in `components/HireMe.tsx`

## Deployment (Vercel — recommended)

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deploys.

## SEO
- Per-page metadata via Next.js `generateMetadata`
- Open Graph tags configured in `layout.tsx`
- Twitter card configured
- `scroll-smooth` enabled
- Semantic HTML throughout

# 01 Studios website (Next.js 14, TypeScript, Tailwind)
## Run locally
1. Install Node 18+  2. `npm install`  3. `npm run dev`, then open http://localhost:3000
## Replace content
- Studio details, prices, FAQ, photos: `lib/data.ts` (put images in `public/photos`, set `src`, write real `alt` text)
- Films: `app/films/page.tsx` (YouTube/Vimeo embed URLs)
- Hero video: `app/page.tsx` (comment marks the spot)
- About and Google Maps: `app/about`, `app/contact`
## Booking inquiries
1. Create a Supabase project and run `supabase/schema.sql`.  2. Copy `.env.example` to `.env.local` and fill in the keys.
Inquiries then appear in Supabase Table Editor > inquiries. Email alerts: add Resend or SendGrid at the marked line in `app/api/inquiry/route.ts`.
Without Supabase keys, inquiries are only logged to the server console.
## Deploy
Push to GitHub, import the repo in Vercel, add the two env vars, deploy.
## Not built yet
Admin dashboard (login, uploads, editing), privacy page, analytics, cookie banner, page transitions. Use the Supabase dashboard meanwhile.
This scaffold was written without running `npm install`. Run `npm run build` once and report any errors.

## Admin dashboard (added)
1. `npm install @supabase/supabase-js`
2. Supabase SQL Editor: run `supabase/schema.sql`, then `supabase/admin.sql`.
3. Supabase > Authentication: turn OFF new-user sign-ups, then add the owner (Users > Add user).
4. Copy `.env.example` to `.env.local` and fill it in. Restart `npm run dev`.
5. Open http://localhost:3000/admin and sign in. Upload photos and read inquiries there.
Protection comes from the database rules (RLS) in admin.sql, not from hiding the page.

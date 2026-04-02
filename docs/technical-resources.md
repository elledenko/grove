# Grove — Technical Resources

## Tech Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Frontend | Next.js (App Router) | 15.x | SSR, file-based routing, React Server Components |
| Styling | Tailwind CSS | 4.x | Utility-first, fast iteration, easy theming |
| Backend | Supabase | - | Auth, Postgres, RLS, real-time capable |
| Language | TypeScript | 5.x | Type safety across full stack |
| Deployment | Vercel | - | Native Next.js support, preview deployments |

## Third-Party Services

| Service | Purpose | Auth Method |
|---------|---------|-------------|
| Supabase | Database + Auth | API keys (anon + service role) |
| Vercel | Hosting + CDN | CLI auth |

## Environment Variables

| Variable | Purpose | Where |
|----------|---------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `.env.local` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `.env.local` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) | `.env.local` |

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `@supabase/supabase-js` | Supabase client |
| `@supabase/ssr` | Supabase SSR helpers for Next.js |
| `recharts` | Mood history chart |
| `lucide-react` | Icons |

## Development Setup

```bash
git clone <repo>
cd grove
npm install
cp .env.example .env.local  # Fill in real Supabase keys
npm run dev
```

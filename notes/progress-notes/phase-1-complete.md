# Phase 1: Auth & Shell — Complete

## What was built
- Supabase project provisioned (fiire org, axjfaffqzluqzgydbskn)
- Database migration: profiles, goals, goal_completions, mood_entries tables with RLS
- Signup trigger: auto-creates profile + 6 preset goals on user registration
- XP recalculation function in Postgres
- Supabase client setup (browser + server)
- Auth middleware (session refresh + route protection)
- Landing page with plant SVG illustration
- Login and signup pages
- Auth callback route
- Dashboard layout with nav and sign-out

## What works
- Full auth flow: signup → login → dashboard → sign out
- Route protection: unauthenticated users redirected to /login
- Authenticated users redirected from login/signup to /dashboard

## Issues
- Middleware deprecation warning (middleware → proxy in Next.js 16.2)
- Email confirmation must be disabled manually in Supabase dashboard

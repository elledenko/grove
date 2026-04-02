# Grove — System Architecture

## High-Level Architecture

```
Browser → Next.js (Vercel) → Supabase (Postgres + Auth)
```

Server Components fetch data via Supabase server client. Client Components handle interactivity (goal toggling, mood selection). Auth uses Supabase's PKCE flow with middleware for session management.

## Database Schema

### users (extends Supabase auth.users)
```sql
profiles
- id: uuid (FK → auth.users.id, PK)
- display_name: text
- plant_stage: int (1-5, default 1)
- total_xp: int (default 0)
- current_streak: int (default 0)
- longest_streak: int (default 0)
- last_active_date: date
- timezone: text (default 'America/New_York')
- created_at: timestamptz
- updated_at: timestamptz
```

### goals
```sql
goals
- id: uuid (PK)
- user_id: uuid (FK → profiles.id)
- title: text
- category: text ('hydration' | 'movement' | 'mindfulness' | 'social' | 'nutrition' | 'rest' | 'custom')
- xp_value: int (default 10)
- is_preset: boolean
- is_active: boolean (default true)
- sort_order: int
- created_at: timestamptz
```

### goal_completions
```sql
goal_completions
- id: uuid (PK)
- user_id: uuid (FK → profiles.id)
- goal_id: uuid (FK → goals.id)
- completed_date: date
- xp_earned: int
- created_at: timestamptz
UNIQUE(goal_id, completed_date)
```

### mood_entries
```sql
mood_entries
- id: uuid (PK)
- user_id: uuid (FK → profiles.id)
- mood: int (1-5: awful, bad, okay, good, great)
- note: text (nullable)
- entry_date: date
- created_at: timestamptz
UNIQUE(user_id, entry_date)
```

## Plant Growth Stages

| Stage | Name | XP Required | Visual |
|-------|------|------------|--------|
| 1 | Seed | 0 | Small seed in soil |
| 2 | Sprout | 100 | Small green sprout |
| 3 | Sapling | 300 | Small plant with leaves |
| 4 | Bloom | 600 | Flowering plant |
| 5 | Tree | 1000 | Full grown tree |

## API Routes

All data access through Supabase client — no custom API routes needed for V0.1.

Server actions for:
- `toggleGoal(goalId, date)` — complete/uncomplete a goal, update XP
- `addGoal(title, category)` — create custom goal
- `removeGoal(goalId)` — deactivate a goal
- `submitMood(mood, note, date)` — record mood entry
- `getPlantStage(totalXp)` — pure function, calculates stage from XP

## Auth Flow

1. Supabase PKCE auth with email/password
2. Middleware checks session on every request
3. Unauthenticated users → /login
4. Authenticated users → /dashboard
5. Auth callback route handles email confirmation redirects

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts, metadata
│   ├── page.tsx                # Landing page (redirect to /dashboard if authed)
│   ├── login/page.tsx          # Login form
│   ├── signup/page.tsx         # Signup form
│   ├── auth/callback/route.ts  # Auth callback handler
│   └── dashboard/
│       ├── layout.tsx          # Dashboard shell (sidebar/nav)
│       ├── page.tsx            # Main dashboard
│       └── actions.ts          # Server actions
├── components/
│   ├── plant/
│   │   └── PlantDisplay.tsx    # SVG plant at current stage
│   ├── goals/
│   │   ├── GoalList.tsx        # Daily goal checklist
│   │   └── AddGoalModal.tsx    # Add custom goal
│   ├── mood/
│   │   ├── MoodSelector.tsx    # Mood check-in
│   │   └── MoodChart.tsx       # Mood history chart
│   ├── dashboard/
│   │   └── StreakCounter.tsx    # Streak display
│   └── ui/                     # Shared UI primitives
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser client
│   │   ├── server.ts           # Server client
│   │   └── middleware.ts       # Auth middleware helper
│   ├── xp.ts                   # XP calculation, plant stage logic
│   └── types.ts                # TypeScript types
└── middleware.ts                # Next.js middleware (auth guard)
```

## RLS Policies

All tables use Row Level Security:
- Users can only SELECT/INSERT/UPDATE/DELETE their own rows
- Filter: `auth.uid() = user_id` (or `auth.uid() = id` for profiles)

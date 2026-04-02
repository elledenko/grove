# Grove — Build Plan

## Phase 1: Auth & Shell
**Goal:** Working auth flow and app shell.
**Tasks:**
1. Scaffold Next.js with Tailwind
2. Install Supabase packages
3. Set up Supabase client (browser + server)
4. Create auth middleware
5. Build login and signup pages
6. Create auth callback route
7. Build dashboard layout shell (nav, sidebar)
8. Create landing page
**Milestone:** User can sign up, log in, see empty dashboard.
**Status:** Pending

## Phase 2: Database & Plant Companion
**Goal:** Database schema + plant companion system.
**Tasks:**
1. Write Supabase migration (profiles, goals, goal_completions, mood_entries)
2. Set up RLS policies
3. Create profile on signup (DB trigger)
4. Build plant SVG components (5 stages)
5. Build PlantDisplay component with XP progress bar
6. Create seed goals on profile creation (DB trigger)
**Milestone:** User sees their plant on dashboard with correct stage.
**Status:** Pending

## Phase 3: Goals System
**Goal:** Daily goal checklist with XP rewards.
**Tasks:**
1. Build GoalList component
2. Create toggleGoal server action (complete/uncomplete)
3. XP calculation on goal toggle
4. Build AddGoalModal for custom goals
5. Goal removal (deactivate)
6. Daily completion tracking (by date)
**Milestone:** User can check off goals, earn XP, see plant grow.
**Status:** Pending

## Phase 4: Mood Tracking & Polish
**Goal:** Mood check-in, charts, streaks, final polish.
**Tasks:**
1. Build MoodSelector component
2. Create submitMood server action
3. Build MoodChart with recharts (last 14 days)
4. Implement streak calculation logic
5. Build StreakCounter component
6. Responsive layout polish
7. Empty states and loading states
8. Write README.md
**Milestone:** Complete V0.1 — all features working, deployed, tested.
**Status:** Pending

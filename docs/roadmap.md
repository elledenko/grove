# Grove — Roadmap

## Milestone 1: Foundation (S)
Scaffold app, auth flow, database schema, basic layout shell.
**Deliverables:** Working login/signup, authenticated layout, DB tables created.

## Milestone 2: Companion System (M)
Plant companion with growth stages, XP calculation, visual representation.
**Deliverables:** Plant renders on dashboard, grows based on accumulated XP.

## Milestone 3: Goals & Habits (M)
Daily goal system — preset goals, custom goals, check-off flow, XP rewards.
**Deliverables:** Goal list on dashboard, completing goals awards XP, daily reset.

## Milestone 4: Mood Tracking (S)
Mood check-in with emoji selection and optional note. History chart.
**Deliverables:** Mood selector, mood history stored, visual chart on dashboard.

## Milestone 5: Polish & Ship (M)
Streak tracking, dashboard layout, empty states, responsive design, README.
**Deliverables:** Complete V0.1 experience, deployed and tested.

## Risks
- Plant visual representation — using CSS/SVG illustrations, not complex art assets
- Supabase RLS policies — need careful setup for user data isolation
- Daily reset logic — timezone handling for goal resets

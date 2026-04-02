# Grove — Wireframes

## Color Palette
- Background: #FAFAF5 (warm off-white)
- Surface: #FFFFFF
- Primary: #4A7C59 (forest green)
- Secondary: #8B7355 (warm brown)
- Accent: #D4A574 (warm sand)
- Text: #2D3436 (near-black)
- Muted: #95A5A6 (gray)
- Mood colors: #E74C3C (awful), #E67E22 (bad), #F1C40F (okay), #2ECC71 (good), #27AE60 (great)

## Landing Page (unauthenticated)

```
┌─────────────────────────────────────────┐
│  🌿 Grove                    Log in     │
├─────────────────────────────────────────┤
│                                         │
│         [SVG: gentle plant]             │
│                                         │
│      Grow a plant. Grow yourself.       │
│                                         │
│   Your self-care companion for the web. │
│   Complete daily goals. Track moods.    │
│   Watch your plant thrive.              │
│                                         │
│        [ Get Started — it's free ]      │
│                                         │
└─────────────────────────────────────────┘
```

## Login / Signup Pages

```
┌─────────────────────────────────────────┐
│  🌿 Grove                               │
├─────────────────────────────────────────┤
│                                         │
│           Welcome back                  │
│                                         │
│   Email    [________________]           │
│   Password [________________]           │
│                                         │
│          [ Log in ]                     │
│                                         │
│   Don't have an account? Sign up        │
│                                         │
└─────────────────────────────────────────┘
```

## Dashboard (main view)

```
┌─────────────────────────────────────────────────────┐
│  🌿 Grove          Dashboard    Mood    [user] [↪]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │                  │  │  Today's Goals            │ │
│  │   [SVG PLANT]    │  │                          │ │
│  │   Stage: Bloom   │  │  ☑ Drink 8 glasses water │ │
│  │                  │  │  ☐ 15 min walk           │ │
│  │   XP: 650/1000  │  │  ☐ 5 min meditation      │ │
│  │   ▓▓▓▓▓▓▓░░░    │  │  ☑ Eat a vegetable       │ │
│  │                  │  │  ☐ Text a friend          │ │
│  │  🔥 12 day       │  │  ☐ 7+ hours sleep        │ │
│  │     streak       │  │                          │ │
│  │                  │  │  + Add custom goal        │ │
│  └──────────────────┘  └──────────────────────────┘ │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │  How are you feeling today?                  │   │
│  │                                              │   │
│  │  😫  😔  😐  🙂  😊                         │   │
│  │  awful bad okay good great                   │   │
│  │                                              │   │
│  │  [optional note field]          [Save]       │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │  Mood History (last 14 days)                 │   │
│  │  5 ·    ·         ·  ·                       │   │
│  │  4 ·  ·   · ·  ·      · ·                   │   │
│  │  3 ·         ·           ·                   │   │
│  │  2 ·                                         │   │
│  │  1 ·                                         │   │
│  │    ├──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┤    │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

## Add Goal Modal

```
┌───────────────────────────┐
│  Add a goal          [✕]  │
│                           │
│  What do you want to do?  │
│  [____________________]   │
│                           │
│  Category:                │
│  [hydration ▾]            │
│                           │
│        [ Add Goal ]       │
└───────────────────────────┘
```

## Responsive: Mobile Layout

On mobile (<768px), the dashboard stacks vertically:
1. Plant + streak (full width)
2. Today's goals (full width)
3. Mood check-in (full width)
4. Mood chart (full width)

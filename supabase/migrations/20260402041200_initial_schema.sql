-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  plant_stage int not null default 1 check (plant_stage between 1 and 5),
  total_xp int not null default 0,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  last_active_date date,
  timezone text not null default 'America/New_York',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Goals table
create table public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  category text not null default 'custom' check (category in ('hydration', 'movement', 'mindfulness', 'social', 'nutrition', 'rest', 'custom')),
  xp_value int not null default 10,
  is_preset boolean not null default false,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.goals enable row level security;

create policy "Users can view own goals"
  on public.goals for select
  using (auth.uid() = user_id);

create policy "Users can insert own goals"
  on public.goals for insert
  with check (auth.uid() = user_id);

create policy "Users can update own goals"
  on public.goals for update
  using (auth.uid() = user_id);

create policy "Users can delete own goals"
  on public.goals for delete
  using (auth.uid() = user_id);

-- Goal completions table
create table public.goal_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  goal_id uuid not null references public.goals(id) on delete cascade,
  completed_date date not null,
  xp_earned int not null default 10,
  created_at timestamptz not null default now(),
  unique(goal_id, completed_date)
);

alter table public.goal_completions enable row level security;

create policy "Users can view own completions"
  on public.goal_completions for select
  using (auth.uid() = user_id);

create policy "Users can insert own completions"
  on public.goal_completions for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own completions"
  on public.goal_completions for delete
  using (auth.uid() = user_id);

-- Mood entries table
create table public.mood_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  mood int not null check (mood between 1 and 5),
  note text,
  entry_date date not null,
  created_at timestamptz not null default now(),
  unique(user_id, entry_date)
);

alter table public.mood_entries enable row level security;

create policy "Users can view own moods"
  on public.mood_entries for select
  using (auth.uid() = user_id);

create policy "Users can insert own moods"
  on public.mood_entries for insert
  with check (auth.uid() = user_id);

create policy "Users can update own moods"
  on public.mood_entries for update
  using (auth.uid() = user_id);

-- Trigger: create profile + seed goals on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));

  insert into public.goals (user_id, title, category, xp_value, is_preset, sort_order) values
    (new.id, 'Drink 8 glasses of water', 'hydration', 10, true, 1),
    (new.id, '15 minute walk', 'movement', 15, true, 2),
    (new.id, '5 minute meditation', 'mindfulness', 15, true, 3),
    (new.id, 'Eat a vegetable', 'nutrition', 10, true, 4),
    (new.id, 'Text a friend', 'social', 10, true, 5),
    (new.id, 'Get 7+ hours sleep', 'rest', 15, true, 6);

  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to recalculate XP and plant stage
create or replace function public.recalculate_xp(p_user_id uuid)
returns void as $$
declare
  v_total_xp int;
  v_plant_stage int;
begin
  select coalesce(sum(xp_earned), 0) into v_total_xp
  from public.goal_completions
  where user_id = p_user_id;

  v_plant_stage := case
    when v_total_xp >= 1000 then 5
    when v_total_xp >= 600 then 4
    when v_total_xp >= 300 then 3
    when v_total_xp >= 100 then 2
    else 1
  end;

  update public.profiles
  set total_xp = v_total_xp, plant_stage = v_plant_stage, updated_at = now()
  where id = p_user_id;
end;
$$ language plpgsql security definer;

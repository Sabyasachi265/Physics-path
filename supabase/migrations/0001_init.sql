-- Physics Path — initial schema
-- Run this once in your Supabase project's SQL Editor (see README "Set up
-- the database" section). It creates every table the app needs and locks
-- them down with Row Level Security, so each student can only ever read or
-- write their OWN progress, notes, and saved resources.

-- 1. Profiles ---------------------------------------------------------
-- One row per user, created automatically when they sign up (see trigger
-- below). Extend this table later with avatar_url, streak_goal, etc.
create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- Automatically create a profile row whenever a new user signs up.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'display_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Topic progress ----------------------------------------------------
-- One row per (user, topic) marking whether that roadmap topic is done.
-- topic_id matches the `id` field in src/lib/data/topics.ts — it is NOT
-- a foreign key because roadmap content lives in code, not the database.
create table if not exists topic_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  topic_id text not null,
  completed boolean not null default true,
  completed_at timestamptz default now(),
  unique (user_id, topic_id)
);

alter table topic_progress enable row level security;

create policy "Users can manage their own topic progress"
  on topic_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 3. Saved resources -----------------------------------------------------
-- Bookmarked textbooks / videos / problem sets from the Resource Library.
create table if not exists saved_resources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  resource_id text not null,
  saved_at timestamptz not null default now(),
  unique (user_id, resource_id)
);

alter table saved_resources enable row level security;

create policy "Users can manage their own saved resources"
  on saved_resources for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 4. Notes ---------------------------------------------------------------
-- Free-text notes. topic_id is nullable: null means a general/global note,
-- otherwise it's a note attached to one specific topic page.
create table if not exists topic_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  topic_id text,
  content text not null default '',
  updated_at timestamptz not null default now()
);

alter table topic_notes enable row level security;

create policy "Users can manage their own notes"
  on topic_notes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 5. Study activity --------------------------------------------------
-- One row per day a user does something (completes a topic, saves a
-- resource, edits notes). Powers the streak grid on the dashboard.
create table if not exists study_activity (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  activity_date date not null default current_date,
  unique (user_id, activity_date)
);

alter table study_activity enable row level security;

create policy "Users can manage their own study activity"
  on study_activity for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

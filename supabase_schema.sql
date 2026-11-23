-- CupidYoon - Supabase Database Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- 1. Create gifts table
create table if not exists public.gifts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  recipient_name text not null,
  sender_name text not null,
  event_type text not null default 'birthday',
  passcode text not null,
  teaser_enabled boolean default true,
  teaser_headline text,
  teaser_note text,
  love_start_date timestamptz,
  letter_content text,
  voice_note_url text,
  background_music_url text,
  video_url text,
  photos jsonb default '[]'::jsonb,
  quiz_questions jsonb default '[]'::jsonb,
  scratch_secret text,
  bottle_message text,
  lantern_wishes jsonb default '[]'::jsonb,
  tools_config jsonb default '{
    "loveCounter": true,
    "cake": true,
    "scratch": true,
    "cassette": true,
    "quiz": false,
    "bottle": true,
    "letter": true,
    "memories": true,
    "video": false,
    "skyLanterns": true
  }'::jsonb,
  theme_config jsonb default '{
    "preset": "romantic-rose"
  }'::jsonb,
  is_active boolean default true,
  views_count integer default 0,
  expires_at timestamptz not null default (now() + interval '10 days'),
  created_at timestamptz default now(),
  created_by text default 'yoon'
);

-- 2. Create agents table
create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  role text not null default 'agent', -- 'admin' or 'agent'
  quota integer default 15,
  created_gifts_count integer default 0,
  allowed_tools jsonb default '["cake", "scratch", "letter", "memories"]'::jsonb,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 3. Storage buckets (Create in Supabase Storage UI or via SQL)
insert into storage.buckets (id, name, public) 
values ('cupidyoon-media', 'cupidyoon-media', true)
on conflict (id) do nothing;

-- 4. Enable Public Read Access for Media Bucket
create policy "Public Access" 
on storage.objects for select 
using (bucket_id = 'cupidyoon-media');

-- 5. Enable Row Level Security (RLS) & Policies
alter table public.gifts enable row level security;
alter table public.agents enable row level security;

-- Public can read active non-expired gifts by slug
create policy "Allow public read of active gifts"
on public.gifts for select
using (is_active = true);

-- Allow all actions for anon in development or authenticated users
create policy "Allow insert gifts"
on public.gifts for insert
with check (true);

create policy "Allow update gifts"
on public.gifts for update
using (true);

create policy "Allow delete gifts"
on public.gifts for delete
using (true);

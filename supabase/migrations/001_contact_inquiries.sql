-- Run in Supabase SQL Editor if you want to persist contact form submissions.
create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text,
  service text,
  message text not null
);

alter table public.contact_inquiries enable row level security;

-- No public policies: inserts happen only via service role from your API route.

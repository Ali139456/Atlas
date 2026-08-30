-- Create public storage bucket for CMS media uploads.
-- Run in Supabase SQL editor or Storage UI.

insert into storage.buckets (id, name, public)
values ('cms-media', 'cms-media', true)
on conflict (id) do update set public = excluded.public;

-- Allow public read of cms-media objects
create policy if not exists "Public read cms-media"
on storage.objects for select
using (bucket_id = 'cms-media');

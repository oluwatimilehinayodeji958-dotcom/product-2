-- =========================================================================
-- PUBLICATIONS TABLE: SCHEMA + POLICIES
-- =========================================================================
-- Paste and run this ENTIRE script in: Supabase Dashboard → SQL Editor → New Query

-- -------------------------------------------------------------------------
-- PART 1: Create the publications table (if it doesn't exist yet)
-- -------------------------------------------------------------------------

create table if not exists publications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text,
  publication_type text not null default 'journal',
  authors text[] not null default '{}',
  research_area text,
  abstract text,
  content text,
  journal text,
  doi text,
  keywords text[] default '{}',
  category text,
  volume text,
  issue text,
  pages text,
  citations integer default 0,
  "impactFactor" numeric,
  image text,
  pdf_url text,
  supplementary_url text,
  data_url text,
  code_url text,
  featured boolean default false,
  status text default 'draft',
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- -------------------------------------------------------------------------
-- PART 2: Add missing columns if the table already exists but lacks them
-- -------------------------------------------------------------------------

-- Add pdf_url column if it doesn't exist
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_name = 'publications' and column_name = 'pdf_url'
  ) then
    alter table publications add column pdf_url text;
  end if;
end $$;

-- Add image column if it doesn't exist
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_name = 'publications' and column_name = 'image'
  ) then
    alter table publications add column image text;
  end if;
end $$;

-- Add content column if it doesn't exist
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_name = 'publications' and column_name = 'content'
  ) then
    alter table publications add column content text;
  end if;
end $$;

-- Add abstract column if it doesn't exist
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_name = 'publications' and column_name = 'abstract'
  ) then
    alter table publications add column abstract text;
  end if;
end $$;

-- Add category column if it doesn't exist
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_name = 'publications' and column_name = 'category'
  ) then
    alter table publications add column category text;
  end if;
end $$;

-- Add featured column if it doesn't exist
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_name = 'publications' and column_name = 'featured'
  ) then
    alter table publications add column featured boolean default false;
  end if;
end $$;

-- -------------------------------------------------------------------------
-- PART 3: Database Table Policies for `publications`
-- -------------------------------------------------------------------------

-- Drop old RLS policies for publications
drop policy if exists "Allow authenticated insert/update/delete on publications" on publications;
drop policy if exists "Allow public select on published publications" on publications;
drop policy if exists "Anon can insert publications" on publications;
drop policy if exists "Anon can update publications" on publications;
drop policy if exists "Anon can delete publications" on publications;
drop policy if exists "Anon can read all publications" on publications;
drop policy if exists "Public can read published publications" on publications;
drop policy if exists "Authenticated full access to publications" on publications;

-- Re-enable RLS on the table
alter table publications enable row level security;

-- Read policies
create policy "Public can read published publications"
  on publications for select
  to public
  using (status = 'published');

create policy "Anon can read all publications"
  on publications for select
  to anon
  using (true);

-- Write policies (allows the Editorial portal to create, edit, delete publications)
create policy "Anon can insert publications"
  on publications for insert
  to anon
  with check (true);

create policy "Anon can update publications"
  on publications for update
  to anon
  using (true)
  with check (true);

create policy "Anon can delete publications"
  on publications for delete
  to anon
  using (true);

create policy "Authenticated full access to publications"
  on publications for all
  to authenticated
  using (true)
  with check (true);


-- -------------------------------------------------------------------------
-- PART 4: Storage Bucket & Object Policies for `publications`
-- -------------------------------------------------------------------------

-- Create the 'publications' storage bucket if it doesn't already exist
insert into storage.buckets (id, name, public)
values ('publications', 'publications', true)
on conflict (id) do update
set public = true;

-- Drop existing storage policies on storage.objects to avoid duplicates
drop policy if exists "Allow anon inserts on publications bucket" on storage.objects;
drop policy if exists "Allow anon selects on publications bucket" on storage.objects;
drop policy if exists "Allow anon updates on publications bucket" on storage.objects;
drop policy if exists "Allow anon deletes on publications bucket" on storage.objects;

-- 1. Allow any anon (unauthenticated) client to upload files to 'publications' bucket
create policy "Allow anon inserts on publications bucket"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'publications');

-- 2. Allow any user to read/download public files from the 'publications' bucket
create policy "Allow anon selects on publications bucket"
  on storage.objects for select
  to anon
  using (bucket_id = 'publications');

-- 3. Allow anon clients to replace/update files in the 'publications' bucket
create policy "Allow anon updates on publications bucket"
  on storage.objects for update
  to anon
  using (bucket_id = 'publications')
  with check (bucket_id = 'publications');

-- 4. Allow anon clients to delete files in the 'publications' bucket
create policy "Allow anon deletes on publications bucket"
  on storage.objects for delete
  to anon
  using (bucket_id = 'publications');

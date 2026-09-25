-- Events schema for Supabase

create table if not exists events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  category text,
  short_description text,
  description text,
  banner_image_url text,
  venue text,
  organizer text,
  registration_link text,
  registration_deadline timestamptz,
  start_date date,
  end_date date,
  start_time time,
  end_time time,
  status text,
  featured boolean default false,
  published boolean default true,
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists event_speakers (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid references events(id) on delete cascade,
  name text not null,
  title text,
  institution text,
  profile_image_url text,
  bio text,
  display_order integer default 0
);

create table if not exists event_gallery (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid references events(id) on delete cascade,
  image_url text not null,
  caption text,
  display_order integer default 0
);

-- optional files/attachments table
create table if not exists event_attachments (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid references events(id) on delete cascade,
  file_url text not null,
  file_name text,
  file_size bigint,
  content_type text,
  display_order integer default 0
);

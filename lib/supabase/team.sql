-- Team members database schema
-- Storage buckets:
--  - team-images
--  - team-cvs

create table if not exists team_members (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  slug text not null unique,
  profile_image text,
  academic_title text,
  position text,
  department text,
  biography text,
  research_interests text[],
  qualifications text[],
  email text,
  phone text,
  office_location text,
  orcid_url text,
  google_scholar_url text,
  researchgate_url text,
  linkedin_url text,
  cv_url text,
  category text,
  featured boolean default false,
  display_order integer default 0,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

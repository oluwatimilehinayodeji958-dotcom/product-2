-- Create views that map Supabase snake_case columns to camelCase frontend fields
-- Run these in Supabase SQL editor (SQL -> New Query)

-- Team members view
create or replace view public.editorial_team_members as
select
  id,
  slug,
  full_name as name,
  academic_title as title,
  position as role,
  biography as bio,
  profile_image as "profileImage",
  email,
  linkedin_url as "linkedinUrl",
  research_interests as "researchInterests",
  active,
  display_order as "displayOrder",
  created_at as "joinDate",
  NULL::int as publications,
  NULL::int as "hIndex",
  NULL::text[] as awards,
  office_location as "officeLocation",
  orcid_url as "orcid_url",
  google_scholar_url as "googleScholar_url",
  researchgate_url as "researchgate_url",
  cv_url as "cv_url",
  category
from public.team_members;

-- Events view
create or replace view public.editorial_events as
select
  id,
  slug,
  title,
  category,
  short_description as "shortDescription",
  description,
  banner_image_url as "bannerImage",
  venue,
  organizer,
  registration_link as "registrationLink",
  registration_deadline as "registrationDeadline",
  start_date as "startDate",
  end_date as "endDate",
  start_time as "startTime",
  end_time as "endTime",
  status,
  featured,
  published,
  display_order,
  created_at as "createdAt"
from public.events;

-- Gallery images view
create or replace view public.editorial_gallery_images as
select
  id,
  title,
  caption,
  category,
  image_url as "imageUrl",
  featured,
  display_order,
  event_date as "eventDate",
  created_at as "createdAt"
from public.gallery_images;

-- Gallery videos view
create or replace view public.editorial_gallery_videos as
select
  id,
  title,
  caption,
  category,
  video_type as "videoType",
  video_url as "videoUrl",
  thumbnail_url as "thumbnailUrl",
  featured,
  display_order,
  event_date as "eventDate",
  created_at as "createdAt"
from public.gallery_videos;

-- Notes:
-- 1) These views provide stable camelCase fields for the frontend without altering your tables.
-- 2) If your table or column names differ, adjust the target table or selected columns.
-- 3) To remove a view later: drop view if exists public.editorial_team_members;

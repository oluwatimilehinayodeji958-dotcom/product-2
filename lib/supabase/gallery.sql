-- ─────────────────────────────────────────────────────────────
-- EAGLE'S LAB: GALLERY SYSTEM SQL SCHEMA MIGRATION
-- Paste this script directly into Supabase SQL Editor to create tables.
-- ─────────────────────────────────────────────────────────────

-- 1. Create table for Gallery Images
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  caption TEXT,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL,
  event_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS (Row Level Security) on gallery_images
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- 2. Create table for Gallery Videos
CREATE TABLE IF NOT EXISTS public.gallery_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  caption TEXT,
  category TEXT NOT NULL,
  video_type TEXT CHECK (video_type IN ('youtube', 'vimeo', 'uploaded')) NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  featured BOOLEAN DEFAULT FALSE NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL,
  event_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS (Row Level Security) on gallery_videos
ALTER TABLE public.gallery_videos ENABLE ROW LEVEL SECURITY;

-- 3. Storage buckets (Must be created manually in Supabase Dashboard -> Storage)
-- Suggested Storage Buckets:
-- - gallery-images
-- - gallery-videos

-- 4. Enable Read Access Policies for Anonymous Users (Public)
CREATE POLICY "Allow public read access on gallery_images"
  ON public.gallery_images
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on gallery_videos"
  ON public.gallery_videos
  FOR SELECT
  TO public
  USING (true);

-- 5. Enable Write Access Policies for Authenticated Staff / Admins
CREATE POLICY "Allow admin write access on gallery_images"
  ON public.gallery_images
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow admin write access on gallery_videos"
  ON public.gallery_videos
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

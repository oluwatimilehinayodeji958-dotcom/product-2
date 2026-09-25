-- Fix RLS policies for team table
-- Run this in your Supabase SQL Editor

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "team_insert_policy" ON public.team;
DROP POLICY IF EXISTS "team_select_policy" ON public.team;
DROP POLICY IF EXISTS "team_update_policy" ON public.team;
DROP POLICY IF EXISTS "team_delete_policy" ON public.team;

-- Create policies that allow authenticated users to manage team members
CREATE POLICY "team_insert_policy" ON public.team
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "team_select_policy" ON public.team
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "team_update_policy" ON public.team
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "team_delete_policy" ON public.team
  FOR DELETE
  TO authenticated
  USING (true);

-- Enable RLS on the team table if not already enabled
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;

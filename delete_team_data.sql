-- Delete all team members from the database
-- Run this in your Supabase SQL Editor

-- Option 1: Delete all team members
DELETE FROM public.team;

-- Option 2: Delete specific team member by ID (uncomment and use if needed)
-- DELETE FROM public.team WHERE id = 'your-team-member-id-here';

-- Option 3: Delete team members by name (uncomment and use if needed)
-- DELETE FROM public.team WHERE full_name = 'Dr. Mrs. Olufunto Adeleye';

-- Verify deletion
SELECT COUNT(*) as remaining_team_members FROM public.team;

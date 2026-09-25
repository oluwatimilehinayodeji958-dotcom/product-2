-- Add social media columns to team_members table
ALTER TABLE team_members 
ADD COLUMN IF NOT EXISTS x_url TEXT,
ADD COLUMN IF NOT EXISTS instagram_url TEXT,
ADD COLUMN IF NOT EXISTS facebook_url TEXT;

-- Note: linkedin_url already exists in the table

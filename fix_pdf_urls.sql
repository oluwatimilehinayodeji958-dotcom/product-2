-- Fix PDF URLs that were uploaded to wrong path (/image/upload/ instead of /raw/upload/)
-- This updates all PDF URLs in multiple tables

-- Fix publications table
UPDATE publications 
SET pdf_url = REPLACE(pdf_url, '/image/upload/', '/raw/upload/')
WHERE pdf_url LIKE '%/image/upload/%.pdf';

-- Fix team table (CV URLs)
UPDATE team 
SET cv_url = REPLACE(cv_url, '/image/upload/', '/raw/upload/')
WHERE cv_url LIKE '%/image/upload/%.pdf';

-- Verify the changes in publications
SELECT 'publications' as table_name, id, title, pdf_url 
FROM publications 
WHERE pdf_url IS NOT NULL 
ORDER BY updated_at DESC 
LIMIT 10;

-- Verify the changes in team
SELECT 'team' as table_name, id, full_name, cv_url 
FROM team 
WHERE cv_url IS NOT NULL 
ORDER BY updated_at DESC 
LIMIT 10;

-- Research Philosophy Table
CREATE TABLE IF NOT EXISTS research_philosophy (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Research Areas Table
CREATE TABLE IF NOT EXISTS research_areas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Research Methodology Table
CREATE TABLE IF NOT EXISTS research_methodology (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Research Collaborations Table
CREATE TABLE IF NOT EXISTS research_collaborations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  website_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE research_philosophy ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_methodology ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_collaborations ENABLE ROW LEVEL SECURITY;

-- Create policies for research_philosophy
CREATE POLICY "Allow public read access to research_philosophy"
  ON research_philosophy FOR SELECT
  TO public, anon
  USING (true);

CREATE POLICY "Allow authenticated users to insert research_philosophy"
  ON research_philosophy FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update research_philosophy"
  ON research_philosophy FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete research_philosophy"
  ON research_philosophy FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for research_areas
CREATE POLICY "Allow public read access to research_areas"
  ON research_areas FOR SELECT
  TO public, anon
  USING (true);

CREATE POLICY "Allow authenticated users to insert research_areas"
  ON research_areas FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update research_areas"
  ON research_areas FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete research_areas"
  ON research_areas FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for research_methodology
CREATE POLICY "Allow public read access to research_methodology"
  ON research_methodology FOR SELECT
  TO public, anon
  USING (true);

CREATE POLICY "Allow authenticated users to insert research_methodology"
  ON research_methodology FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update research_methodology"
  ON research_methodology FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete research_methodology"
  ON research_methodology FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for research_collaborations
CREATE POLICY "Allow public read access to research_collaborations"
  ON research_collaborations FOR SELECT
  TO public, anon
  USING (true);

CREATE POLICY "Allow authenticated users to insert research_collaborations"
  ON research_collaborations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update research_collaborations"
  ON research_collaborations FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete research_collaborations"
  ON research_collaborations FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_research_philosophy_updated_at
  BEFORE UPDATE ON research_philosophy
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_research_areas_updated_at
  BEFORE UPDATE ON research_areas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_research_methodology_updated_at
  BEFORE UPDATE ON research_methodology
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_research_collaborations_updated_at
  BEFORE UPDATE ON research_collaborations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

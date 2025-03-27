-- Create missing_persons table if it doesn't exist
CREATE TABLE IF NOT EXISTS missing_persons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  age INTEGER,
  gender TEXT,
  last_seen_date DATE,
  last_seen_time TIME,
  last_seen_location TEXT,
  description TEXT,
  contact_info TEXT,
  photo_url TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sightings table if it doesn't exist
CREATE TABLE IF NOT EXISTS sightings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  person_name TEXT,
  missing_person_id UUID REFERENCES missing_persons(id),
  sighting_date DATE NOT NULL,
  sighting_time TIME,
  location TEXT NOT NULL,
  description TEXT,
  contact_info TEXT,
  photo_url TEXT,
  confidence_level TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable realtime for both tables
ALTER PUBLICATION supabase_realtime ADD TABLE missing_persons;
ALTER PUBLICATION supabase_realtime ADD TABLE sightings;

-- This migration fixes the issue with tables already being members of supabase_realtime publication

DO $$
BEGIN
    -- Check if missing_persons table exists in the publication
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'missing_persons'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE missing_persons;
    END IF;
    
    -- Check if sightings table exists in the publication
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'sightings'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE sightings;
    END IF;
    
    -- Users table will be handled in a separate migration
END;
$$;
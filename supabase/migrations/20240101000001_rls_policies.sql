-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_artists ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user's profile
CREATE OR REPLACE FUNCTION get_user_profile()
RETURNS profiles AS $$
  SELECT * FROM profiles WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Helper function to check if user is gallery owner
CREATE OR REPLACE FUNCTION is_gallery_owner()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND role = 'gallery_owner'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Helper function to check if user is artist
CREATE OR REPLACE FUNCTION is_artist()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND role = 'artist'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Profiles Policies
-- Users can read all profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Admins can update any profile
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (is_admin());

-- Galleries Policies
-- Everyone can view galleries
CREATE POLICY "Galleries are viewable by everyone"
  ON galleries FOR SELECT
  USING (true);

-- Gallery owners can create galleries
CREATE POLICY "Gallery owners can create galleries"
  ON galleries FOR INSERT
  WITH CHECK (
    is_gallery_owner() AND
    owner_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

-- Gallery owners can update their own galleries
CREATE POLICY "Gallery owners can update their own galleries"
  ON galleries FOR UPDATE
  USING (
    owner_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

-- Gallery owners can delete their own galleries
CREATE POLICY "Gallery owners can delete their own galleries"
  ON galleries FOR DELETE
  USING (
    owner_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

-- Admins can do everything with galleries
CREATE POLICY "Admins can manage all galleries"
  ON galleries FOR ALL
  USING (is_admin());

-- Artists Policies
-- Everyone can view artist profiles
CREATE POLICY "Artist profiles are viewable by everyone"
  ON artists FOR SELECT
  USING (true);

-- Artists can create their own profile
CREATE POLICY "Artists can create their own profile"
  ON artists FOR INSERT
  WITH CHECK (
    is_artist() AND
    user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

-- Artists can update their own profile
CREATE POLICY "Artists can update their own profile"
  ON artists FOR UPDATE
  USING (
    user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

-- Artworks Policies
-- Everyone can view available artworks
CREATE POLICY "Artworks are viewable by everyone"
  ON artworks FOR SELECT
  USING (true);

-- Artists can create their own artworks
CREATE POLICY "Artists can create their own artworks"
  ON artworks FOR INSERT
  WITH CHECK (
    artist_id IN (SELECT id FROM artists WHERE user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()))
  );

-- Artists can update their own artworks
CREATE POLICY "Artists can update their own artworks"
  ON artworks FOR UPDATE
  USING (
    artist_id IN (SELECT id FROM artists WHERE user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()))
  );

-- Artists can delete their own artworks
CREATE POLICY "Artists can delete their own artworks"
  ON artworks FOR DELETE
  USING (
    artist_id IN (SELECT id FROM artists WHERE user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()))
  );

-- Events Policies
-- Everyone can view public events
CREATE POLICY "Public events are viewable by everyone"
  ON events FOR SELECT
  USING (is_public = true OR is_admin() OR gallery_id IN (
    SELECT id FROM galleries WHERE owner_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  ));

-- Gallery owners can create events for their galleries
CREATE POLICY "Gallery owners can create events for their galleries"
  ON events FOR INSERT
  WITH CHECK (
    gallery_id IN (SELECT id FROM galleries WHERE owner_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()))
  );

-- Gallery owners can update events for their galleries
CREATE POLICY "Gallery owners can update their events"
  ON events FOR UPDATE
  USING (
    gallery_id IN (SELECT id FROM galleries WHERE owner_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()))
  );

-- Gallery owners can delete events for their galleries
CREATE POLICY "Gallery owners can delete their events"
  ON events FOR DELETE
  USING (
    gallery_id IN (SELECT id FROM galleries WHERE owner_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()))
  );

-- Event Artists Policies
-- Everyone can view event-artist relationships for public events
CREATE POLICY "Event artists are viewable for public events"
  ON event_artists FOR SELECT
  USING (
    event_id IN (SELECT id FROM events WHERE is_public = true) OR
    is_admin() OR
    event_id IN (
      SELECT e.id FROM events e
      JOIN galleries g ON e.gallery_id = g.id
      WHERE g.owner_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    )
  );

-- Gallery owners can add artists to their events
CREATE POLICY "Gallery owners can add artists to their events"
  ON event_artists FOR INSERT
  WITH CHECK (
    event_id IN (
      SELECT e.id FROM events e
      JOIN galleries g ON e.gallery_id = g.id
      WHERE g.owner_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    )
  );

-- Gallery owners can remove artists from their events
CREATE POLICY "Gallery owners can remove artists from their events"
  ON event_artists FOR DELETE
  USING (
    event_id IN (
      SELECT e.id FROM events e
      JOIN galleries g ON e.gallery_id = g.id
      WHERE g.owner_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    )
  );

-- Admins have full access to everything
CREATE POLICY "Admins can manage all event artists"
  ON event_artists FOR ALL
  USING (is_admin());

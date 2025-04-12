/*
  # Blog and Authentication Setup

  1. Tables
    - Recreate blog_posts table with proper structure
    - Add blog_reactions table with proper relations
  
  2. Security
    - Enable RLS
    - Set up proper policies for public and admin access
*/

-- Recreate tables with proper structure
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  reaction_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_reactions ENABLE ROW LEVEL SECURITY;

-- Blog posts policies
CREATE POLICY "Allow public read access on posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin write access on posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Blog reactions policies
CREATE POLICY "Allow public read access on reactions"
  ON blog_reactions
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public to add reactions"
  ON blog_reactions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert sample blog post for testing
INSERT INTO blog_posts (title, slug, content, excerpt)
VALUES (
  'Welcome to Our Blog',
  'welcome-to-our-blog',
  E'We are excited to launch our new blog!\n\nHere we will share insights about behavior therapy, NDIS updates, and helpful resources for participants and their families.',
  'Welcome to the official blog of Heart-Centered Behaviour Therapy.'
);
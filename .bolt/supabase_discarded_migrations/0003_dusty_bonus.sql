-- Drop existing tables if they exist to ensure clean state
DROP TABLE IF EXISTS blog_reactions;
DROP TABLE IF EXISTS blog_posts;

-- Create tables with proper structure
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE blog_reactions (
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

-- Insert sample blog post
INSERT INTO blog_posts (title, slug, content, excerpt, image_url)
VALUES (
  'Welcome to Our Blog',
  'welcome-to-our-blog',
  E'We are excited to launch our new blog!\n\nHere at Heart-Centered Behaviour Therapy, we believe in sharing knowledge and insights that can help our NDIS participants and their families. Through this blog, we will share:\n\n- Tips and strategies for behavior management\n- Updates about NDIS policies and changes\n- Success stories and case studies\n- Resources for families and carers\n\nStay tuned for regular updates!',
  'Welcome to the official blog of Heart-Centered Behaviour Therapy. Here we share insights, updates, and resources for NDIS participants and their families.',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
);
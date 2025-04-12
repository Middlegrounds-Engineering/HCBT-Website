/*
  # Simplified Access Policies
  
  1. Changes
    - Allow any authenticated user to manage blog posts and images
    - Remove admin role requirements
    - Maintain public read access
    
  2. Security
    - Enable RLS on all tables
    - Authenticated users can manage content
    - Public read access where appropriate
*/

-- Reset existing policies
DROP POLICY IF EXISTS "storage_public_read" ON storage.objects;
DROP POLICY IF EXISTS "storage_admin_all" ON storage.objects;
DROP POLICY IF EXISTS "posts_public_read" ON blog_posts;
DROP POLICY IF EXISTS "posts_admin_all" ON blog_posts;

-- Configure storage bucket
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('blog_images', 'blog_images', true)
  ON CONFLICT (id) DO UPDATE
  SET public = true;
END $$;

-- Storage policies
CREATE POLICY "storage_public_read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog_images');

CREATE POLICY "storage_auth_all"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'blog_images')
WITH CHECK (bucket_id = 'blog_images');

-- Blog posts policies
CREATE POLICY "posts_public_read"
ON blog_posts FOR SELECT
TO public
USING (true);

CREATE POLICY "posts_auth_all"
ON blog_posts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Blog reactions policies (unchanged)
CREATE POLICY "reactions_public_read"
ON blog_reactions FOR SELECT
TO public
USING (true);

CREATE POLICY "reactions_public_insert"
ON blog_reactions FOR INSERT
TO public
WITH CHECK (true);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_reactions ENABLE ROW LEVEL SECURITY;
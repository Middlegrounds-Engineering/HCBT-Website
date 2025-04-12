/*
  # Final Policy Fix
  
  1. Changes
    - Simplify and consolidate all policies
    - Fix storage bucket configuration
    - Ensure proper admin role checks
    - Add proper cascading permissions
    
  2. Security
    - Enable RLS on all tables
    - Proper role-based access control
    - Public read access where appropriate
*/

-- Reset all existing policies
DROP POLICY IF EXISTS "allow_public_read_blog_images" ON storage.objects;
DROP POLICY IF EXISTS "allow_admin_manage_blog_images" ON storage.objects;
DROP POLICY IF EXISTS "blog_posts_read_policy" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_admin_policy" ON blog_posts;

-- Configure storage bucket
DO $$
BEGIN
  -- Ensure the bucket exists and is public
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

CREATE POLICY "storage_admin_all"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'blog_images' 
  AND auth.role() = 'authenticated' 
  AND auth.jwt()->>'role' = 'admin'
)
WITH CHECK (
  bucket_id = 'blog_images' 
  AND auth.role() = 'authenticated' 
  AND auth.jwt()->>'role' = 'admin'
);

-- Blog posts policies
CREATE POLICY "posts_public_read"
ON blog_posts FOR SELECT
TO public
USING (true);

CREATE POLICY "posts_admin_all"
ON blog_posts FOR ALL
TO authenticated
USING (
  auth.role() = 'authenticated' 
  AND auth.jwt()->>'role' = 'admin'
)
WITH CHECK (
  auth.role() = 'authenticated' 
  AND auth.jwt()->>'role' = 'admin'
);

-- Blog reactions policies
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
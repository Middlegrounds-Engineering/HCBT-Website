/*
  # Final RLS Policy Configuration
  
  1. Changes
    - Simplify and consolidate policies
    - Fix storage access for admins
    - Ensure proper role checks
    
  2. Security
    - Public read access for posts and reactions
    - Admin-only write access for posts
    - Public write access for reactions
*/

-- Drop existing policies
DO $$ 
BEGIN
  -- Storage policies
  DROP POLICY IF EXISTS "storage_public_read" ON storage.objects;
  DROP POLICY IF EXISTS "storage_auth_all" ON storage.objects;
  
  -- Blog posts policies
  DROP POLICY IF EXISTS "allow_public_read" ON blog_posts;
  DROP POLICY IF EXISTS "allow_admin_all" ON blog_posts;
END $$;

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

CREATE POLICY "storage_admin_write"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'blog_images' 
  AND auth.jwt()->>'role' = 'admin'
);

-- Blog posts policies
CREATE POLICY "posts_public_read"
ON blog_posts FOR SELECT
TO public
USING (true);

CREATE POLICY "posts_admin_write"
ON blog_posts FOR INSERT
TO authenticated
WITH CHECK (auth.jwt()->>'role' = 'admin');

CREATE POLICY "posts_admin_update"
ON blog_posts FOR UPDATE
TO authenticated
USING (auth.jwt()->>'role' = 'admin')
WITH CHECK (auth.jwt()->>'role' = 'admin');

CREATE POLICY "posts_admin_delete"
ON blog_posts FOR DELETE
TO authenticated
USING (auth.jwt()->>'role' = 'admin');

-- Ensure RLS is enabled
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_reactions ENABLE ROW LEVEL SECURITY;
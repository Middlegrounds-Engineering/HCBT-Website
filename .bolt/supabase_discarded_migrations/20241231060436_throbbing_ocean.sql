/*
  # Fix Duplicate Policies
  
  1. Changes
    - Drop all existing policies before recreating them
    - Ensure clean policy setup
    
  2. Security
    - Maintain existing security model
    - Fix policy duplication issues
*/

-- First drop all existing policies to avoid conflicts
DO $$ 
BEGIN
  -- Drop storage policies
  DROP POLICY IF EXISTS "storage_public_read" ON storage.objects;
  DROP POLICY IF EXISTS "storage_auth_all" ON storage.objects;
  DROP POLICY IF EXISTS "storage_admin_all" ON storage.objects;
  
  -- Drop blog posts policies
  DROP POLICY IF EXISTS "posts_public_read" ON blog_posts;
  DROP POLICY IF EXISTS "posts_auth_all" ON blog_posts;
  DROP POLICY IF EXISTS "posts_admin_all" ON blog_posts;
  
  -- Drop blog reactions policies
  DROP POLICY IF EXISTS "reactions_public_read" ON blog_reactions;
  DROP POLICY IF EXISTS "reactions_public_insert" ON blog_reactions;
END $$;

-- Configure storage bucket
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('blog_images', 'blog_images', true)
  ON CONFLICT (id) DO UPDATE
  SET public = true;
END $$;

-- Recreate storage policies
CREATE POLICY "storage_public_read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog_images');

CREATE POLICY "storage_auth_all"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'blog_images')
WITH CHECK (bucket_id = 'blog_images');

-- Recreate blog posts policies
CREATE POLICY "posts_public_read"
ON blog_posts FOR SELECT
TO public
USING (true);

CREATE POLICY "posts_auth_all"
ON blog_posts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Recreate blog reactions policies
CREATE POLICY "reactions_public_read"
ON blog_reactions FOR SELECT
TO public
USING (true);

CREATE POLICY "reactions_public_insert"
ON blog_reactions FOR INSERT
TO public
WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_reactions ENABLE ROW LEVEL SECURITY;
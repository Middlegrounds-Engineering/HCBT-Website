/*
  # Final Fix for Storage and Blog Policies

  1. Changes
    - Fix storage policies with proper role checks
    - Update blog post policies with correct JWT checks
    - Add proper bucket configuration
    
  2. Security
    - Enable RLS on all tables
    - Add proper admin role checks
    - Allow public read access where appropriate
*/

-- Drop existing storage policies
DROP POLICY IF EXISTS "allow_public_read_blog_images" ON storage.objects;
DROP POLICY IF EXISTS "allow_admin_manage_blog_images" ON storage.objects;

-- Create storage policies with correct auth checks
CREATE POLICY "allow_public_read_blog_images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog_images');

-- Allow admin to upload and manage images
CREATE POLICY "allow_admin_manage_blog_images"
ON storage.objects 
FOR ALL
TO authenticated
USING (
  bucket_id = 'blog_images' 
  AND auth.jwt()->>'role' = 'admin'
)
WITH CHECK (
  bucket_id = 'blog_images' 
  AND auth.jwt()->>'role' = 'admin'
);

-- Ensure blog_images bucket exists and is public
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('blog_images', 'blog_images', true)
  ON CONFLICT (id) DO UPDATE
  SET public = true;
END $$;

-- Update blog posts policies
DROP POLICY IF EXISTS "blog_posts_insert_policy" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_update_policy" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_delete_policy" ON blog_posts;

-- Allow public to read posts
CREATE POLICY "blog_posts_read_policy"
ON blog_posts FOR SELECT
TO public
USING (true);

-- Allow admin to manage posts
CREATE POLICY "blog_posts_admin_policy"
ON blog_posts
FOR ALL
TO authenticated
USING (auth.jwt()->>'role' = 'admin')
WITH CHECK (auth.jwt()->>'role' = 'admin');

-- Ensure RLS is enabled
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_reactions ENABLE ROW LEVEL SECURITY;
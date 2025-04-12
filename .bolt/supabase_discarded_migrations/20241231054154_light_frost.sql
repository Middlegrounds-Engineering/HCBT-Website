/*
  # Fix Storage and Blog Policies

  1. Changes
    - Fix storage policies to use correct auth checks
    - Update blog post policies to properly check admin role
    - Ensure proper bucket configuration
    
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

CREATE POLICY "allow_admin_manage_blog_images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'blog_images' 
  AND auth.jwt()->>'role' = 'admin'
);

-- Ensure blog_images bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog_images', 'blog_images', true)
ON CONFLICT (id) DO NOTHING;

-- Update blog posts policies
DROP POLICY IF EXISTS "blog_posts_insert_policy" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_update_policy" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_delete_policy" ON blog_posts;

CREATE POLICY "blog_posts_insert_policy"
ON blog_posts FOR INSERT
TO authenticated
WITH CHECK (auth.jwt()->>'role' = 'admin');

CREATE POLICY "blog_posts_update_policy"
ON blog_posts FOR UPDATE
TO authenticated
USING (auth.jwt()->>'role' = 'admin')
WITH CHECK (auth.jwt()->>'role' = 'admin');

CREATE POLICY "blog_posts_delete_policy"
ON blog_posts FOR DELETE
TO authenticated
USING (auth.jwt()->>'role' = 'admin');

-- Ensure RLS is enabled
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_reactions ENABLE ROW LEVEL SECURITY;
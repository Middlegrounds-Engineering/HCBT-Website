/*
  # Fix RLS policies for blog posts

  1. Changes
    - Drop existing policies
    - Create new policies with proper role checks
    - Add explicit policies for INSERT, UPDATE, DELETE
    - Ensure RLS is enabled
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow admin write access" ON blog_posts;
DROP POLICY IF EXISTS "Allow public read access" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin write access on posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow public read access on posts" ON blog_posts;

-- Recreate policies with explicit operations
CREATE POLICY "blog_posts_read_policy"
  ON blog_posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "blog_posts_insert_policy"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "blog_posts_update_policy"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "blog_posts_delete_policy"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Ensure RLS is enabled
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
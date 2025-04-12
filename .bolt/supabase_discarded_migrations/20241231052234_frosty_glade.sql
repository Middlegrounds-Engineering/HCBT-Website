/*
  # Update blog post policies

  1. Changes
    - Fix admin write access policy to properly check user role
    - Add better error handling for non-admin users
    - Ensure proper role checking in RLS policies

  2. Security
    - Maintain strict RLS enforcement
    - Only allow admin users to create/edit posts
*/

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Allow admin write access" ON blog_posts;
DROP POLICY IF EXISTS "Allow public read access" ON blog_posts;

-- Recreate policies with proper role checking
CREATE POLICY "Allow public read access"
  ON blog_posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin write access"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Ensure RLS is enabled
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
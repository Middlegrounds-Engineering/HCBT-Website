/*
  # Fix RLS Policies for Blog Management
  
  1. Changes
    - Drop existing policies
    - Create new policies for blog management
    - Ensure proper admin role checks
    
  2. Security
    - Public read access for all users
    - Admin-only write access
    - Proper role validation
*/

-- Drop existing policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "posts_public_read" ON blog_posts;
  DROP POLICY IF EXISTS "posts_auth_all" ON blog_posts;
END $$;

-- Create new policies
CREATE POLICY "allow_public_read"
ON blog_posts FOR SELECT
TO public
USING (true);

CREATE POLICY "allow_admin_all"
ON blog_posts FOR ALL
TO authenticated
USING (auth.jwt()->>'role' = 'admin')
WITH CHECK (auth.jwt()->>'role' = 'admin');

-- Ensure RLS is enabled
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
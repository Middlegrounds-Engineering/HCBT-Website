/*
  # Update blog permissions for authenticated users

  1. Changes
    - Allow any authenticated user to manage blog posts
    - Keep public read access for blog posts
    - Update storage policies to match

  2. Security
    - Maintains public read access
    - Requires authentication for write operations
    - Removes admin-only restriction
*/

-- Reset existing policies
DROP POLICY IF EXISTS "posts_public_read" ON blog_posts;
DROP POLICY IF EXISTS "posts_auth_all" ON blog_posts;
DROP POLICY IF EXISTS "storage_public_read" ON storage.objects;
DROP POLICY IF EXISTS "storage_auth_all" ON storage.objects;

-- Blog posts policies
CREATE POLICY "allow_public_read"
ON blog_posts FOR SELECT
TO public
USING (true);

CREATE POLICY "allow_auth_write"
ON blog_posts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Storage policies
CREATE POLICY "allow_public_read_storage"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog_images');

CREATE POLICY "allow_auth_write_storage"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'blog_images')
WITH CHECK (bucket_id = 'blog_images');

-- Ensure RLS is enabled
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
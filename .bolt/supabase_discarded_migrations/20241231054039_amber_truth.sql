-- Drop existing storage policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Access" ON storage.objects;

-- Create more specific storage policies
CREATE POLICY "allow_public_read_blog_images"
ON storage.objects FOR SELECT
TO public
USING (
  bucket_id = 'blog_images'
);

CREATE POLICY "allow_admin_manage_blog_images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'blog_images' 
  AND auth.role() = 'authenticated' 
  AND (auth.jwt()->>'role' = 'admin')
);

-- Ensure blog_images bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog_images', 'blog_images', true)
ON CONFLICT (id) DO NOTHING;

-- Update blog_reactions policies
DROP POLICY IF EXISTS "Allow public read access on reactions" ON blog_reactions;
DROP POLICY IF EXISTS "Allow public to add reactions" ON blog_reactions;

CREATE POLICY "allow_public_read_reactions"
ON blog_reactions FOR SELECT
TO public
USING (true);

CREATE POLICY "allow_public_add_reactions"
ON blog_reactions FOR INSERT
TO public
WITH CHECK (true);

-- Enable RLS
ALTER TABLE blog_reactions ENABLE ROW LEVEL SECURITY;
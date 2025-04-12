/*
  # Add storage for blog images

  1. Changes
    - Create storage bucket for blog images
    - Update blog_posts table to use storage references
    - Add policies for storage access

  2. Security
    - Enable RLS on storage bucket
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create a storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog_images', 'blog_images', true);

-- Enable RLS on the bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog_images');

-- Allow authenticated users with admin role to manage images
CREATE POLICY "Admin Access"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'blog_images' AND auth.jwt() ->> 'role' = 'admin')
WITH CHECK (bucket_id = 'blog_images' AND auth.jwt() ->> 'role' = 'admin');

-- Add storage_path column to blog_posts
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS storage_path text;
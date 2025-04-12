/*
  # Add blog reactions table

  1. New Tables
    - `blog_reactions`
      - `id` (uuid, primary key)
      - `post_id` (uuid, foreign key to blog_posts)
      - `reaction_type` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `blog_reactions` table
    - Add policies for public read and create access
*/

CREATE TABLE IF NOT EXISTS blog_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  reaction_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to read reactions"
  ON blog_reactions
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public to create reactions"
  ON blog_reactions
  FOR INSERT
  TO public
  WITH CHECK (true);
/*
  # Create referrals table and storage

  1. New Tables
    - `referrals`
      - `id` (uuid, primary key)
      - `participant_name` (text, required)
      - `date_of_birth` (date)
      - `ndis_number` (text)
      - `address` (text)
      - `guardian_name` (text)
      - `guardian_phone` (text)
      - `guardian_email` (text)
      - `services` (text[], required)
      - `contact_name` (text, required)
      - `contact_email` (text, required)
      - `funding_type` (text, required)
      - `plan_manager` (text)
      - `service_agreement_email` (text)
      - `plan_start_date` (date)
      - `plan_end_date` (date)
      - `hours_available` (text)
      - `referrer_name` (text, required)
      - `referrer_relationship` (text, required)
      - `referrer_email` (text, required)
      - `referrer_phone` (text, required)
      - `ndis_document_path` (text)
      - `created_at` (timestamptz)
      - `status` (text)

  2. Storage
    - Create bucket for NDIS documents
    
  3. Security
    - Enable RLS
    - Add policies for inserting referrals
    - Add policies for document storage
*/

-- Create referrals table
CREATE TABLE referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_name text NOT NULL,
  date_of_birth date,
  ndis_number text,
  address text,
  guardian_name text,
  guardian_phone text,
  guardian_email text,
  services text[] NOT NULL,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  funding_type text NOT NULL,
  plan_manager text,
  service_agreement_email text,
  plan_start_date date,
  plan_end_date date,
  hours_available text,
  referrer_name text NOT NULL,
  referrer_relationship text NOT NULL,
  referrer_email text NOT NULL,
  referrer_phone text NOT NULL,
  ndis_document_path text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

-- Enable RLS
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting referrals
CREATE POLICY "Allow public to create referrals"
ON referrals FOR INSERT
TO public
WITH CHECK (true);

-- Create policy for reading referrals (admin only)
CREATE POLICY "Allow authenticated to read referrals"
ON referrals FOR SELECT
TO authenticated
USING (auth.jwt()->>'role' = 'admin');

-- Create storage bucket for NDIS documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('ndis_documents', 'ndis_documents', false)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Allow public to upload NDIS documents"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'ndis_documents');

CREATE POLICY "Allow admin to read NDIS documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'ndis_documents' AND auth.jwt()->>'role' = 'admin');
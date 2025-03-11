
-- This file contains SQL to be executed in your Supabase project
-- You'll need to run this in the Supabase SQL editor

-- Create storage bucket for ad images
INSERT INTO storage.buckets (id, name, public)
VALUES ('ad-verifications', 'ad-verifications', true);

-- Set up storage policies to allow authenticated users to upload and view images
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'ad-verifications');

CREATE POLICY "Allow public to view ad-verifications images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'ad-verifications');

-- Create ad verifications table
CREATE TABLE public.ad_verifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  is_scam boolean NOT NULL,
  confidence integer NOT NULL,
  warnings text[] DEFAULT '{}',
  details jsonb NOT NULL,
  image_url text,
  created_at timestamp with time zone DEFAULT now(),
  url text
);

-- Set up RLS (Row Level Security) for ad_verifications table
ALTER TABLE public.ad_verifications ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to view only their own verifications
CREATE POLICY "Users can view their own verifications"
ON public.ad_verifications
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Policy to allow users to insert their own verifications
CREATE POLICY "Users can insert their own verifications"
ON public.ad_verifications
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Create user profiles table with additional user info
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to view their own profile
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Policy to allow users to update their own profile
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid());

-- Create trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


# InstaAdVerifier - Backend Integration Guide

This guide explains how to set up and integrate the Supabase backend for the InstaAdVerifier application.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. A new Supabase project

## Setup Steps

### 1. Configure Supabase

1. Create a new Supabase project from the dashboard
2. Note your project URL and anon key from the project settings
3. Run the SQL script in `supabase/schema.sql` in the Supabase SQL editor to set up your database schema

### 2. Update Environment Variables

1. Create a `.env` file in the root of the project with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. Update the Supabase client configuration in `src/lib/supabase.ts` with your project URL and anon key or configure it to use environment variables:
   ```typescript
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
   ```

### 3. Start the App

```bash
npm install
npm run dev
```

## Features Implemented

- **User Authentication**: Sign up, login, and user profile management
- **Ad Verification**: Verify Instagram ads with URL or image upload
- **Verification History**: Store and retrieve verification results
- **Analytics**: View statistics about verified ads

## Next Steps

- Implement real ad verification logic (replacing the current simulation)
- Add more detailed user profiles
- Enhance analytics with charts and trends

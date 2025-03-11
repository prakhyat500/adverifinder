
# InstaAdVerifier - Backend Integration Guide

This guide explains how to set up and integrate the Supabase backend for the InstaAdVerifier application.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. A new Supabase project

## Setup Steps

### 1. Configure Supabase

1. Create a new Supabase project from the dashboard
2. Go to Project Settings > API to find your project URL and anon key
3. Run the SQL script in `supabase/schema.sql` in the Supabase SQL editor to set up your database schema

### 2. Update Environment Variables

1. Create a `.env` file in the root of the project by copying from `.env.example`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your actual Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
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

## Troubleshooting

- **Authentication Errors**: Make sure your `.env` file contains the correct Supabase URL and anon key
- **Database Errors**: Ensure you've run the schema SQL in the Supabase SQL editor
- **API Errors**: Check that your API endpoints are properly configured in the services

## Next Steps

- Implement real ad verification logic (replacing the current simulation)
- Add more detailed user profiles
- Enhance analytics with charts and trends

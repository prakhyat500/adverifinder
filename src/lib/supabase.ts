
import { createClient } from '@supabase/supabase-js';

// Fail with a helpful error message if environment variables are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Supabase URL and Anon Key are required. Please create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY variables.'
  );
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

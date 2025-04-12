import { Database } from './types';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

// Validate environment variables at runtime
export function getSupabaseConfig(): SupabaseConfig {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please check your .env file.'
    );
  }

  return { url, anonKey };
}